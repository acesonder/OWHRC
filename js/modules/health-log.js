// HealthLog: Wellbeing Tracker Module
const HealthLogModule = {
    entries: [],
    load() {
        this.entries = storage.get('health_entries') || [];
        this.render();
    },
    saveEntries() {
        storage.set('health_entries', this.entries);
    },
    render() {
        const section = document.getElementById('health-log');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>💚 HealthLog: Wellbeing Tracker</h2>
                <p class="intro">Track your daily wellbeing, sleep, and health. All data is private.</p>
                <div class="card">
                    <h3>Today's Entry</h3>
                    <form id="health-form">
                        <div class="form-group">
                            <label>Sleep (hours)</label>
                            <input type="number" id="health-sleep" min="0" max="24" step="0.5" placeholder="Hours slept">
                        </div>
                        <div class="form-group">
                            <label>Stress Level (1-10)</label>
                            <input type="range" id="health-stress" min="1" max="10" value="5">
                            <output id="stress-output">5</output>
                        </div>
                        <div class="form-group">
                            <label>Overall Feeling</label>
                            <select id="health-feeling">
                                <option value="great">😄 Great</option>
                                <option value="good">🙂 Good</option>
                                <option value="okay">😐 Okay</option>
                                <option value="poor">😟 Poor</option>
                                <option value="bad">😞 Bad</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Notes</label>
                            <textarea id="health-notes" placeholder="Any notes about today..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Save Entry</button>
                    </form>
                </div>
                <div class="mt-3">
                    <h3>Your Log</h3>
                    <div id="health-entries-list"></div>
                </div>
            </div>
        `;
        this.initializeControls();
        this.renderEntries();
    },
    initializeControls() {
        const form = document.getElementById('health-form');
        const stressInput = document.getElementById('health-stress');
        const stressOutput = document.getElementById('stress-output');
        stressInput?.addEventListener('input', (e) => {
            stressOutput.textContent = e.target.value;
        });
        form?.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    handleSubmit(e) {
        e.preventDefault();
        const entry = {
            id: storage.generateId(),
            sleep: document.getElementById('health-sleep').value,
            stress: document.getElementById('health-stress').value,
            feeling: document.getElementById('health-feeling').value,
            notes: document.getElementById('health-notes').value,
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString()
        };
        this.entries.unshift(entry);
        this.saveEntries();
        e.target.reset();
        this.renderEntries();
        accessibility.announceChange('Health entry saved');
    },
    renderEntries() {
        const list = document.getElementById('health-entries-list');
        if (!list) return;
        if (this.entries.length === 0) {
            list.innerHTML = '<p class="text-center">No entries yet. Start tracking your wellbeing!</p>';
            return;
        }
        list.innerHTML = this.entries.slice(0, 10).map(e => {
            const feelings = { great: '😄', good: '🙂', okay: '😐', poor: '😟', bad: '😞' };
            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">${e.date}</h4>
                        </div>
                        <div>${feelings[e.feeling]}</div>
                    </div>
                    <p>💤 Sleep: ${e.sleep || 'N/A'} hours • 😰 Stress: ${e.stress}/10</p>
                    ${e.notes ? `<p>${e.notes}</p>` : ''}
                </div>
            `;
        }).join('');
    }
};
