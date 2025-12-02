// HopeMap: Asset & Hazard Mapping Module
const HopeMapModule = {
    pins: [],
    load() {
        this.pins = storage.get('map_pins') || [];
        this.render();
    },
    savePins() {
        storage.set('map_pins', this.pins);
    },
    render() {
        const section = document.getElementById('hope-map');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>🗺️ HopeMap: Asset & Hazard Mapping</h2>
                <p class="intro">Crowdsourced map of helpful resources and areas to avoid.</p>
                <div class="card">
                    <h3>Add a Pin</h3>
                    <form id="pin-form">
                        <div class="form-group">
                            <label>Type</label>
                            <select id="pin-type" required>
                                <option value="asset">✅ Asset (helpful resource)</option>
                                <option value="hazard">⚠️ Hazard (area to avoid)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Location</label>
                            <input type="text" id="pin-location" required placeholder="Describe the location">
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea id="pin-description" required placeholder="What should people know?"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Pin</button>
                    </form>
                </div>
                <div class="card mt-3">
                    <h3>Community Map</h3>
                    <div style="width: 100%; height: 400px; background: var(--bg-tertiary); border-radius: var(--border-radius); display: flex; align-items: center; justify-content: center;">
                        <p style="text-align: center;">🗺️ Interactive map placeholder<br><small>Pins would be displayed here</small></p>
                    </div>
                </div>
                <div class="mt-3">
                    <h3>All Pins</h3>
                    <div id="pins-list"></div>
                </div>
            </div>
        `;
        this.initializeControls();
        this.renderPins();
    },
    initializeControls() {
        const form = document.getElementById('pin-form');
        form?.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    handleSubmit(e) {
        e.preventDefault();
        const pin = {
            id: storage.generateId(),
            type: document.getElementById('pin-type').value,
            location: document.getElementById('pin-location').value,
            description: document.getElementById('pin-description').value,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        this.pins.unshift(pin);
        this.savePins();
        e.target.reset();
        this.renderPins();
        accessibility.announceChange('Pin added');
    },
    renderPins() {
        const list = document.getElementById('pins-list');
        if (!list) return;
        if (this.pins.length === 0) {
            list.innerHTML = '<p class="text-center">No pins yet. Add the first one!</p>';
            return;
        }
        list.innerHTML = this.pins.map(pin => {
            const date = new Date(pin.timestamp);
            const typeIcon = pin.type === 'asset' ? '✅' : '⚠️';
            const typeLabel = pin.type === 'asset' ? 'Asset' : 'Hazard';
            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">${typeIcon} ${pin.location}</h4>
                            <div class="card-meta">${date.toLocaleDateString()}</div>
                        </div>
                        <span class="badge ${pin.type === 'asset' ? 'badge-success' : 'badge-warning'}">${typeLabel}</span>
                    </div>
                    <p>${pin.description}</p>
                </div>
            `;
        }).join('');
    }
};
