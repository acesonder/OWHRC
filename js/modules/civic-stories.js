// Civic Stories: Council Submission Module

const CivicStoriesModule = {
    submissions: [],

    load() {
        this.loadSubmissions();
        this.render();
    },

    loadSubmissions() {
        this.submissions = storage.get('civic_submissions') || [];
    },

    saveSubmissions() {
        storage.set('civic_submissions', this.submissions);
    },

    render() {
        const section = document.getElementById('civic-stories');
        if (!section) return;

        section.innerHTML = `
            <div class="container">
                <h2>🏛️ Civic Stories: Council Submission</h2>
                <p class="intro">Share your story with city council. Your voice matters in civic decisions.</p>

                <div class="card">
                    <h3>Prepare Your Message</h3>
                    <form id="civic-form">
                        <div class="form-group">
                            <label for="civic-title" class="required">Subject</label>
                            <input type="text" id="civic-title" required placeholder="What's your message about?">
                        </div>
                        <div class="form-group">
                            <label for="civic-message" class="required">Your Message (max 500 words)</label>
                            <textarea id="civic-message" required style="min-height: 200px;" placeholder="Share your story or concern..."></textarea>
                        </div>
                        <div class="form-group">
                            <label for="civic-category">Category</label>
                            <select id="civic-category">
                                <option value="housing">Housing</option>
                                <option value="services">Community Services</option>
                                <option value="safety">Public Safety</option>
                                <option value="health">Health Services</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="civic-anonymous"> Submit Anonymously
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary">📤 Queue for Council</button>
                    </form>
                </div>

                <div class="mt-3">
                    <h3>Your Submissions</h3>
                    <div id="civic-submissions-list"></div>
                </div>
            </div>
        `;

        this.initializeControls();
        this.renderSubmissions();
    },

    initializeControls() {
        const form = document.getElementById('civic-form');
        form?.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(e) {
        e.preventDefault();

        const submission = {
            id: storage.generateId(),
            title: document.getElementById('civic-title').value,
            message: document.getElementById('civic-message').value,
            category: document.getElementById('civic-category').value,
            anonymous: document.getElementById('civic-anonymous').checked,
            status: 'queued',
            timestamp: new Date().toISOString()
        };

        this.submissions.unshift(submission);
        this.saveSubmissions();
        e.target.reset();
        this.renderSubmissions();
        accessibility.announceChange('Message queued for council');
    },

    renderSubmissions() {
        const list = document.getElementById('civic-submissions-list');
        if (!list) return;

        if (this.submissions.length === 0) {
            list.innerHTML = '<p class="text-center">No submissions yet.</p>';
            return;
        }

        list.innerHTML = this.submissions.map(sub => {
            const date = new Date(sub.timestamp);
            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">${sub.title}</h4>
                            <div class="card-meta">
                                ${date.toLocaleDateString()} • ${sub.category}
                            </div>
                        </div>
                        <span class="badge badge-primary">${sub.status}</span>
                    </div>
                    <p>${sub.message.substring(0, 200)}${sub.message.length > 200 ? '...' : ''}</p>
                </div>
            `;
        }).join('');
    }
};
