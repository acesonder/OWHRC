// Admin Dashboard Module
const AdminModule = {
    load() {
        this.render();
    },
    render() {
        const section = document.getElementById('admin');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>🔧 Admin Dashboard</h2>
                <p class="intro">Manage content, users, and platform settings.</p>
                
                <div class="alert alert-info">
                    ℹ️ <strong>Note:</strong> This is a demo platform. Admin features would require authentication in a production environment.
                </div>

                <div class="feature-grid">
                    <div class="card">
                        <h3>📊 Overview</h3>
                        <p>Total Users: <strong>${this.getStats().users}</strong></p>
                        <p>VoiceUp Posts: <strong>${this.getStats().voiceups}</strong></p>
                        <p>Needs: <strong>${this.getStats().needs}</strong></p>
                        <p>Incidents: <strong>${this.getStats().incidents}</strong></p>
                    </div>
                    <div class="card">
                        <h3>📝 Content Moderation</h3>
                        <button class="btn btn-secondary">Review Posts</button>
                        <button class="btn btn-secondary">Manage Needs</button>
                        <button class="btn btn-secondary">Review Incidents</button>
                    </div>
                    <div class="card">
                        <h3>📍 Resource Management</h3>
                        <button class="btn btn-secondary">Edit Resources</button>
                        <button class="btn btn-secondary">Review Map Pins</button>
                        <button class="btn btn-secondary">Manage Events</button>
                    </div>
                    <div class="card">
                        <h3>💾 Data Management</h3>
                        <button class="btn btn-primary" onclick="AdminModule.exportData()">Export All Data</button>
                        <button class="btn btn-danger" onclick="AdminModule.clearData()">Clear All Data</button>
                    </div>
                </div>
            </div>
        `;
    },
    getStats() {
        return {
            users: 1,
            voiceups: (storage.get('voiceup_recordings') || []).length,
            needs: (storage.get('needs_board') || []).length,
            incidents: (storage.get('incidents') || []).length
        };
    },
    exportData() {
        const data = storage.exportData();
        if (data) {
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `hopevoice-export-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            alert('Data exported successfully!');
        }
    },
    clearData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            storage.clearAll();
            alert('All data cleared. Please refresh the page.');
            location.reload();
        }
    }
};
