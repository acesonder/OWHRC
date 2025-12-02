// Incident Logger Module
const IncidentLoggerModule = {
    incidents: [],
    load() {
        this.incidents = storage.get('incidents') || [];
        this.render();
    },
    saveIncidents() {
        storage.set('incidents', this.incidents);
    },
    render() {
        const section = document.getElementById('incident-logger');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>📝 Incident Logger</h2>
                <p class="intro">Document rights violations and incidents for your records.</p>
                <div class="card">
                    <h3>Log an Incident</h3>
                    <form id="incident-form">
                        <div class="form-group">
                            <label class="required">Type of Incident</label>
                            <select id="incident-type" required>
                                <option value="">Select type</option>
                                <option value="sleep-deprivation">Sleep Deprivation</option>
                                <option value="denied-service">Denied Service</option>
                                <option value="discrimination">Discrimination</option>
                                <option value="harassment">Harassment</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="required">Description</label>
                            <textarea id="incident-description" required placeholder="What happened? Include date, time, location, and people involved..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Location</label>
                            <input type="text" id="incident-location" placeholder="Where did this happen?">
                        </div>
                        <button type="submit" class="btn btn-primary">📝 Log Incident</button>
                    </form>
                </div>
                <div class="mt-3">
                    <h3>Your Incident Log</h3>
                    <div id="incidents-list"></div>
                </div>
            </div>
        `;
        this.initializeControls();
        this.renderIncidents();
    },
    initializeControls() {
        const form = document.getElementById('incident-form');
        form?.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    handleSubmit(e) {
        e.preventDefault();
        const incident = {
            id: storage.generateId(),
            type: document.getElementById('incident-type').value,
            description: document.getElementById('incident-description').value,
            location: document.getElementById('incident-location').value,
            status: 'logged',
            timestamp: new Date().toISOString()
        };
        this.incidents.unshift(incident);
        this.saveIncidents();
        e.target.reset();
        this.renderIncidents();
        accessibility.announceChange('Incident logged');
    },
    renderIncidents() {
        const list = document.getElementById('incidents-list');
        if (!list) return;
        if (this.incidents.length === 0) {
            list.innerHTML = '<p class="text-center">No incidents logged yet.</p>';
            return;
        }
        list.innerHTML = this.incidents.map(inc => {
            const date = new Date(inc.timestamp);
            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">${inc.type}</h4>
                            <div class="card-meta">${date.toLocaleDateString()} ${date.toLocaleTimeString()}</div>
                        </div>
                        <span class="badge badge-warning">${inc.status}</span>
                    </div>
                    <p>${inc.description}</p>
                    ${inc.location ? `<p>📍 ${inc.location}</p>` : ''}
                </div>
            `;
        }).join('');
    }
};
