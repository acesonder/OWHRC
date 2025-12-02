// Outreach Scheduler Module
const OutreachModule = {
    events: [],
    load() {
        this.events = storage.get('outreach_events') || this.getDefaultEvents();
        this.render();
    },
    getDefaultEvents() {
        return [
            { id: '1', name: 'Mobile Health Clinic', location: 'Main St Park', date: '2025-12-05', time: '10:00 AM', type: 'medical' },
            { id: '2', name: 'Outreach Van', location: 'Downtown', date: '2025-12-06', time: '2:00 PM', type: 'support' }
        ];
    },
    render() {
        const section = document.getElementById('outreach');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>📅 Outreach Scheduler</h2>
                <p class="intro">View upcoming outreach visits and support services.</p>
                <div class="card">
                    <h3>Upcoming Outreach</h3>
                    <div id="outreach-list">
                        ${this.events.map(e => `
                            <div class="list-item">
                                <h4>${e.name}</h4>
                                <p>📍 ${e.location}</p>
                                <p>�� ${e.date} • 🕐 ${e.time}</p>
                                <span class="badge badge-primary">${e.type}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
};
