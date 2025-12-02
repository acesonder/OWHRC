// StreetGallery: Art & Photography Module
const GalleryModule = {
    artworks: [],
    load() {
        this.artworks = storage.get('gallery_artworks') || [];
        this.render();
    },
    render() {
        const section = document.getElementById('gallery');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>🎨 StreetGallery</h2>
                <p class="intro">Share your art, photography, and poetry with the community.</p>
                <div class="card">
                    <h3>Upload Your Art</h3>
                    <p>Feature coming soon! Share your creative work with the community.</p>
                    <button class="btn btn-primary">📤 Upload Artwork</button>
                </div>
                <div class="mt-3">
                    <h3>Community Gallery</h3>
                    <div class="gallery-grid">
                        ${this.artworks.length === 0 ? '<p class="text-center">No artworks shared yet. Be the first!</p>' : ''}
                    </div>
                </div>
            </div>
        `;
    }
};
