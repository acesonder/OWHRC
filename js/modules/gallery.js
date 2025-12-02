// StreetGallery: Art & Photography Module
const GalleryModule = {
    artworks: [],
    
    load() {
        this.artworks = storage.get('gallery_artworks') || [];
        this.render();
    },
    
    saveArtworks() {
        storage.set('gallery_artworks', this.artworks);
    },
    
    render() {
        const section = document.getElementById('gallery');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>🎨 StreetGallery</h2>
                <p class="intro">Share your art, photography, and poetry with the community.</p>
                
                <div class="card">
                    <h3>Share Your Creative Work</h3>
                    <form id="gallery-form">
                        <div class="form-group">
                            <label for="artwork-type" class="required">Type of Work</label>
                            <select id="artwork-type" required>
                                <option value="">Select type</option>
                                <option value="art">🎨 Visual Art</option>
                                <option value="photo">📷 Photography</option>
                                <option value="poetry">📝 Poetry/Writing</option>
                                <option value="craft">✂️ Craft</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="artwork-title" class="required">Title</label>
                            <input type="text" id="artwork-title" required placeholder="Give your work a title">
                        </div>
                        <div class="form-group">
                            <label for="artwork-description">Description</label>
                            <textarea id="artwork-description" placeholder="Tell us about your work..."></textarea>
                        </div>
                        <div class="form-group" id="text-work-field" class="hidden">
                            <label for="artwork-text">Your Text (for poetry/writing)</label>
                            <textarea id="artwork-text" style="min-height: 200px;" placeholder="Enter your poem or text..."></textarea>
                        </div>
                        <div class="form-group" id="image-upload-field">
                            <label for="artwork-image">Upload Image (optional for poetry)</label>
                            <input type="file" id="artwork-image" accept="image/*">
                            <small>Maximum file size: 5MB</small>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="artwork-anonymous"> Post Anonymously
                            </label>
                        </div>
                        <div class="form-group">
                            <label for="artist-name">Artist Name (optional if not anonymous)</label>
                            <input type="text" id="artist-name" placeholder="Your name or pseudonym">
                        </div>
                        <button type="submit" class="btn btn-primary">📤 Share Artwork</button>
                    </form>
                </div>
                
                <div class="mt-3">
                    <div class="flex" style="justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h3>Community Gallery</h3>
                        <div class="filter-controls">
                            <select id="gallery-filter">
                                <option value="all">All Works</option>
                                <option value="art">Visual Art</option>
                                <option value="photo">Photography</option>
                                <option value="poetry">Poetry/Writing</option>
                                <option value="craft">Crafts</option>
                            </select>
                        </div>
                    </div>
                    <div id="gallery-grid" class="gallery-grid"></div>
                </div>
            </div>
        `;
        
        this.initializeControls();
        this.renderGallery();
    },
    
    initializeControls() {
        const form = document.getElementById('gallery-form');
        const typeSelect = document.getElementById('artwork-type');
        const filter = document.getElementById('gallery-filter');
        
        typeSelect?.addEventListener('change', (e) => {
            const textField = document.getElementById('text-work-field');
            if (e.target.value === 'poetry') {
                textField.classList.remove('hidden');
            } else {
                textField.classList.add('hidden');
            }
        });
        
        form?.addEventListener('submit', (e) => this.handleSubmit(e));
        filter?.addEventListener('change', () => this.renderGallery());
    },
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const type = document.getElementById('artwork-type').value;
        const title = document.getElementById('artwork-title').value;
        const description = document.getElementById('artwork-description').value;
        const text = document.getElementById('artwork-text').value;
        const anonymous = document.getElementById('artwork-anonymous').checked;
        const artistName = document.getElementById('artist-name').value || (anonymous ? 'Anonymous' : 'Community Artist');
        const imageInput = document.getElementById('artwork-image');
        
        let imageData = null;
        if (imageInput.files && imageInput.files[0]) {
            const file = imageInput.files[0];
            
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds 5MB limit. Please choose a smaller image.');
                return;
            }
            
            // Convert to base64
            imageData = await this.fileToBase64(file);
        }
        
        const artwork = {
            id: storage.generateId(),
            type,
            title,
            description,
            text: text || null,
            image: imageData,
            artistName,
            anonymous,
            timestamp: new Date().toISOString(),
            likes: 0
        };
        
        this.artworks.unshift(artwork);
        this.saveArtworks();
        
        e.target.reset();
        document.getElementById('text-work-field').classList.add('hidden');
        this.renderGallery();
        
        accessibility.announceChange('Artwork shared successfully');
        alert('Your artwork has been shared with the community!');
    },
    
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },
    
    renderGallery() {
        const grid = document.getElementById('gallery-grid');
        if (!grid) return;
        
        const filter = document.getElementById('gallery-filter')?.value || 'all';
        
        let filtered = this.artworks;
        if (filter !== 'all') {
            filtered = filtered.filter(a => a.type === filter);
        }
        
        if (filtered.length === 0) {
            grid.innerHTML = '<p class="text-center">No artworks shared yet. Be the first to share your creativity!</p>';
            return;
        }
        
        grid.innerHTML = filtered.map(artwork => {
            const date = new Date(artwork.timestamp);
            const typeIcons = {
                art: '🎨',
                photo: '📷',
                poetry: '📝',
                craft: '✂️'
            };
            
            return `
                <div class="card">
                    ${artwork.image ? `
                        <img src="${artwork.image}" alt="${artwork.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: var(--border-radius);">
                    ` : ''}
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">${typeIcons[artwork.type]} ${artwork.title}</h4>
                            <div class="card-meta">By ${artwork.artistName} • ${date.toLocaleDateString()}</div>
                        </div>
                        <span class="badge badge-primary">${artwork.type}</span>
                    </div>
                    ${artwork.description ? `<p>${artwork.description}</p>` : ''}
                    ${artwork.text ? `<div style="padding: 1rem; background: var(--bg-secondary); border-radius: var(--border-radius); white-space: pre-wrap; font-style: italic; margin-top: 0.5rem;">${artwork.text}</div>` : ''}
                    <div class="mt-2 flex gap-1">
                        <button class="btn btn-secondary" onclick="GalleryModule.likeArtwork('${artwork.id}')">
                            ❤️ Like (${artwork.likes})
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    likeArtwork(artworkId) {
        const artwork = this.artworks.find(a => a.id === artworkId);
        if (!artwork) return;
        
        artwork.likes++;
        this.saveArtworks();
        this.renderGallery();
        
        accessibility.announceChange('Artwork liked');
    }
};
