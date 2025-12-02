// Needs Board: Wish Wall Module

const NeedsBoardModule = {
    needs: [],

    load() {
        this.loadNeeds();
        this.render();
    },

    loadNeeds() {
        this.needs = storage.get('needs_board') || [];
    },

    saveNeeds() {
        storage.set('needs_board', this.needs);
    },

    render() {
        const section = document.getElementById('needs-board');
        if (!section) return;

        section.innerHTML = `
            <div class="container">
                <h2>📋 Needs Board: Wish Wall</h2>
                <p class="intro">Post urgent needs and find help from the community.</p>

                <div class="card">
                    <h3>Post a Need</h3>
                    <form id="post-need-form">
                        <div class="form-group">
                            <label for="need-title" class="required">What do you need?</label>
                            <input type="text" id="need-title" required placeholder="e.g., Warm coat, Food, Shelter">
                        </div>
                        <div class="form-group">
                            <label for="need-description">Additional details</label>
                            <textarea id="need-description" placeholder="Add any relevant details..."></textarea>
                        </div>
                        <div class="form-group">
                            <label for="need-category" class="required">Category</label>
                            <select id="need-category" required>
                                <option value="">Select a category</option>
                                <option value="food">🍽️ Food</option>
                                <option value="clothing">👕 Clothing</option>
                                <option value="shelter">🏠 Shelter</option>
                                <option value="hygiene">🧼 Hygiene</option>
                                <option value="medical">💊 Medical</option>
                                <option value="transport">🚌 Transportation</option>
                                <option value="other">📦 Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="need-urgency">Urgency</label>
                            <select id="need-urgency">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="need-location">Location (optional)</label>
                            <input type="text" id="need-location" placeholder="General area, e.g., Downtown">
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="need-anonymous"> Post Anonymously
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary">📤 Post Need</button>
                    </form>
                </div>

                <div class="mt-3">
                    <div class="flex" style="justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h3>Community Needs</h3>
                        <div class="filter-controls">
                            <select id="needs-filter">
                                <option value="all">All Needs</option>
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="addressed">Addressed</option>
                            </select>
                            <select id="category-filter">
                                <option value="all">All Categories</option>
                                <option value="food">Food</option>
                                <option value="clothing">Clothing</option>
                                <option value="shelter">Shelter</option>
                                <option value="hygiene">Hygiene</option>
                                <option value="medical">Medical</option>
                                <option value="transport">Transportation</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div id="needs-feed"></div>
                </div>
            </div>
        `;

        this.initializeControls();
        this.renderFeed();
    },

    initializeControls() {
        const form = document.getElementById('post-need-form');
        const statusFilter = document.getElementById('needs-filter');
        const categoryFilter = document.getElementById('category-filter');

        form?.addEventListener('submit', (e) => this.handlePostNeed(e));
        statusFilter?.addEventListener('change', () => this.renderFeed());
        categoryFilter?.addEventListener('change', () => this.renderFeed());
    },

    handlePostNeed(e) {
        e.preventDefault();

        const need = {
            id: storage.generateId(),
            title: document.getElementById('need-title').value,
            description: document.getElementById('need-description').value,
            category: document.getElementById('need-category').value,
            urgency: document.getElementById('need-urgency').value,
            location: document.getElementById('need-location').value,
            anonymous: document.getElementById('need-anonymous').checked,
            status: 'open',
            timestamp: new Date().toISOString(),
            responses: []
        };

        this.needs.unshift(need);
        this.saveNeeds();

        // Reset form
        e.target.reset();
        
        // Refresh feed
        this.renderFeed();

        accessibility.announceChange('Need posted successfully');
    },

    renderFeed() {
        const feed = document.getElementById('needs-feed');
        if (!feed) return;

        const statusFilter = document.getElementById('needs-filter')?.value || 'all';
        const categoryFilter = document.getElementById('category-filter')?.value || 'all';

        let filteredNeeds = this.needs;
        
        if (statusFilter !== 'all') {
            filteredNeeds = filteredNeeds.filter(n => n.status === statusFilter);
        }
        
        if (categoryFilter !== 'all') {
            filteredNeeds = filteredNeeds.filter(n => n.category === categoryFilter);
        }

        if (filteredNeeds.length === 0) {
            feed.innerHTML = '<p class="text-center">No needs posted yet.</p>';
            return;
        }

        feed.innerHTML = filteredNeeds.map(need => {
            const date = new Date(need.timestamp);
            const urgencyClass = {
                low: 'badge-primary',
                medium: 'badge-warning',
                high: 'badge-danger',
                critical: 'badge-danger'
            }[need.urgency];

            const statusClass = {
                open: 'badge-primary',
                'in-progress': 'badge-warning',
                addressed: 'badge-success'
            }[need.status];

            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">${need.title}</h4>
                            <div class="card-meta">
                                ${need.anonymous ? '👤 Anonymous' : '👤 Community Member'} • 
                                ${date.toLocaleDateString()} ${date.toLocaleTimeString()}
                                ${need.location ? ` • 📍 ${need.location}` : ''}
                            </div>
                        </div>
                        <div>
                            <span class="badge ${urgencyClass}">${need.urgency}</span>
                            <span class="badge ${statusClass}">${need.status}</span>
                        </div>
                    </div>
                    ${need.description ? `<p>${need.description}</p>` : ''}
                    <div class="need-category">Category: <strong>${this.getCategoryLabel(need.category)}</strong></div>
                    <div class="mt-2">
                        ${need.status === 'open' ? `
                            <button class="btn btn-success" onclick="NeedsBoardModule.respondToNeed('${need.id}')">
                                🤝 I Can Help
                            </button>
                        ` : ''}
                        ${need.responses.length > 0 ? `
                            <button class="btn btn-secondary" onclick="NeedsBoardModule.viewResponses('${need.id}')">
                                💬 View Responses (${need.responses.length})
                            </button>
                        ` : ''}
                    </div>
                    <div id="responses-${need.id}" class="responses-section hidden mt-2"></div>
                </div>
            `;
        }).join('');
    },

    getCategoryLabel(category) {
        const labels = {
            food: '🍽️ Food',
            clothing: '👕 Clothing',
            shelter: '🏠 Shelter',
            hygiene: '🧼 Hygiene',
            medical: '💊 Medical',
            transport: '🚌 Transportation',
            other: '📦 Other'
        };
        return labels[category] || category;
    },

    respondToNeed(needId) {
        const need = this.needs.find(n => n.id === needId);
        if (!need) return;

        const message = prompt('How can you help? (Your response will be visible to others)');
        if (!message) return;

        const response = {
            id: storage.generateId(),
            message: message,
            timestamp: new Date().toISOString(),
            responder: 'Community Helper'
        };

        need.responses.push(response);
        need.status = 'in-progress';
        this.saveNeeds();
        this.renderFeed();

        accessibility.announceChange('Response added successfully');
    },

    viewResponses(needId) {
        const need = this.needs.find(n => n.id === needId);
        if (!need) return;

        const responsesDiv = document.getElementById(`responses-${needId}`);
        if (!responsesDiv) return;

        if (responsesDiv.classList.contains('hidden')) {
            responsesDiv.classList.remove('hidden');
            responsesDiv.innerHTML = `
                <h5>Responses:</h5>
                ${need.responses.map(r => {
                    const date = new Date(r.timestamp);
                    return `
                        <div class="response-item" style="padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--border-radius); margin-bottom: 0.5rem;">
                            <div style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
                                ${r.responder} • ${date.toLocaleDateString()} ${date.toLocaleTimeString()}
                            </div>
                            <div>${r.message}</div>
                        </div>
                    `;
                }).join('')}
                <button class="btn btn-success mt-1" onclick="NeedsBoardModule.markAsAddressed('${needId}')">
                    ✅ Mark as Addressed
                </button>
            `;
        } else {
            responsesDiv.classList.add('hidden');
        }
    },

    markAsAddressed(needId) {
        const need = this.needs.find(n => n.id === needId);
        if (!need) return;

        need.status = 'addressed';
        this.saveNeeds();
        this.renderFeed();

        accessibility.announceChange('Need marked as addressed');
    }
};
