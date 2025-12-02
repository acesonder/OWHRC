// Resource Radar: Location-based resource mapping

const ResourceRadarModule = {
    resources: [],

    load() {
        this.loadResources();
        this.render();
    },

    loadResources() {
        this.resources = storage.get('resources') || this.getDefaultResources();
        if (this.resources.length === 0) {
            this.resources = this.getDefaultResources();
            this.saveResources();
        }
    },

    getDefaultResources() {
        return [
            {
                id: '1',
                name: 'Cobourg Community Center',
                category: 'shelter',
                address: '123 Main St, Cobourg',
                phone: '555-0100',
                hours: 'Mon-Fri 9am-5pm',
                description: 'Emergency shelter and support services',
                status: 'open'
            },
            {
                id: '2',
                name: 'St. Mary\'s Food Bank',
                category: 'food',
                address: '456 Church St, Cobourg',
                phone: '555-0200',
                hours: 'Tue, Thu 2pm-4pm',
                description: 'Free food distribution',
                status: 'open'
            },
            {
                id: '3',
                name: 'Health Clinic',
                category: 'medical',
                address: '789 Hospital Rd, Cobourg',
                phone: '555-0300',
                hours: '24/7',
                description: 'Free healthcare services',
                status: 'open'
            }
        ];
    },

    saveResources() {
        storage.set('resources', this.resources);
    },

    render() {
        const section = document.getElementById('resource-radar');
        if (!section) return;

        section.innerHTML = `
            <div class="container">
                <h2>🗺️ Resource Radar</h2>
                <p class="intro">Find essential services, shelters, meal sites, and support.</p>

                <div class="card">
                    <h3>Search Resources</h3>
                    <div class="form-group">
                        <input type="text" id="resource-search" placeholder="Search by name, address, or service..." style="width: 100%;">
                    </div>
                    <div class="form-group">
                        <label for="category-filter">Filter by Category:</label>
                        <select id="category-filter">
                            <option value="all">All Services</option>
                            <option value="shelter">🏠 Shelter</option>
                            <option value="food">🍽️ Food</option>
                            <option value="medical">💊 Medical</option>
                            <option value="hygiene">🧼 Hygiene</option>
                            <option value="support">🤝 Support Services</option>
                            <option value="other">📦 Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="status-filter">Status:</label>
                        <select id="status-filter">
                            <option value="all">All</option>
                            <option value="open">Open Now</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>

                <div class="card">
                    <h3>📍 Resource Map</h3>
                    <div id="resource-map" style="width: 100%; height: 400px; background: var(--bg-tertiary); border-radius: var(--border-radius); display: flex; align-items: center; justify-content: center;">
                        <p style="text-align: center;">
                            🗺️ Interactive map placeholder<br>
                            <small>In a production environment, integrate Leaflet or Mapbox here</small>
                        </p>
                    </div>
                </div>

                <div class="mt-3">
                    <div class="flex" style="justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h3>Available Resources</h3>
                        <button class="btn btn-primary" onclick="ResourceRadarModule.showAddResourceForm()">
                            ➕ Add Resource
                        </button>
                    </div>
                    <div id="resources-list"></div>
                </div>
            </div>
        `;

        this.initializeControls();
        this.renderList();
    },

    initializeControls() {
        const searchInput = document.getElementById('resource-search');
        const categoryFilter = document.getElementById('category-filter');
        const statusFilter = document.getElementById('status-filter');

        searchInput?.addEventListener('input', () => this.renderList());
        categoryFilter?.addEventListener('change', () => this.renderList());
        statusFilter?.addEventListener('change', () => this.renderList());
    },

    renderList() {
        const list = document.getElementById('resources-list');
        if (!list) return;

        const searchTerm = document.getElementById('resource-search')?.value.toLowerCase() || '';
        const categoryFilter = document.getElementById('category-filter')?.value || 'all';
        const statusFilter = document.getElementById('status-filter')?.value || 'all';

        let filtered = this.resources;

        if (searchTerm) {
            filtered = filtered.filter(r => 
                r.name.toLowerCase().includes(searchTerm) ||
                r.address.toLowerCase().includes(searchTerm) ||
                r.description.toLowerCase().includes(searchTerm)
            );
        }

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(r => r.category === categoryFilter);
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(r => r.status === statusFilter);
        }

        if (filtered.length === 0) {
            list.innerHTML = '<p class="text-center">No resources found matching your criteria.</p>';
            return;
        }

        list.innerHTML = filtered.map(resource => {
            const statusBadge = resource.status === 'open' 
                ? '<span class="badge badge-success">Open</span>' 
                : '<span class="badge badge-danger">Closed</span>';

            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">${resource.name}</h4>
                            <div class="card-meta">${this.getCategoryLabel(resource.category)}</div>
                        </div>
                        ${statusBadge}
                    </div>
                    <div class="resource-details">
                        ${resource.description ? `<p>${resource.description}</p>` : ''}
                        <p><strong>📍 Address:</strong> ${resource.address}</p>
                        ${resource.phone ? `<p><strong>📞 Phone:</strong> ${resource.phone}</p>` : ''}
                        ${resource.hours ? `<p><strong>🕐 Hours:</strong> ${resource.hours}</p>` : ''}
                    </div>
                    <div class="mt-2">
                        <button class="btn btn-primary" onclick="ResourceRadarModule.showDirections('${resource.id}')">
                            🧭 Get Directions
                        </button>
                        <button class="btn btn-secondary" onclick="ResourceRadarModule.shareResource('${resource.id}')">
                            📤 Share
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    getCategoryLabel(category) {
        const labels = {
            shelter: '🏠 Shelter',
            food: '🍽️ Food',
            medical: '💊 Medical',
            hygiene: '🧼 Hygiene',
            support: '🤝 Support Services',
            other: '📦 Other'
        };
        return labels[category] || category;
    },

    showAddResourceForm() {
        alert('Add Resource feature coming soon! Community members and agencies can suggest new resources.');
    },

    showDirections(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;

        // In a real app, integrate with mapping service
        alert(`Directions to: ${resource.name}\n${resource.address}\n\nIn production, this would open your preferred map app.`);
    },

    shareResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;

        const shareText = `${resource.name}\n${resource.address}\n${resource.description}`;
        
        if (navigator.share) {
            navigator.share({
                title: resource.name,
                text: shareText
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Resource details copied to clipboard!');
            });
        }
    }
};
