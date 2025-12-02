// Ask a Lawyer: Anonymous Legal Q&A Module

const AskLawyerModule = {
    questions: [],

    load() {
        this.loadQuestions();
        this.render();
    },

    loadQuestions() {
        this.questions = storage.get('legal_questions') || [];
    },

    saveQuestions() {
        storage.set('legal_questions', this.questions);
    },

    render() {
        const section = document.getElementById('ask-lawyer');
        if (!section) return;

        section.innerHTML = `
            <div class="container">
                <h2>👨‍⚖️ Ask a Lawyer</h2>
                <p class="intro">Get anonymous legal guidance on housing, rights, and discrimination issues.</p>

                <div class="alert alert-info">
                    ℹ️ <strong>Note:</strong> This is for general guidance only. For specific legal advice, contact a lawyer directly.
                </div>

                <div class="card">
                    <h3>Submit a Question</h3>
                    <form id="lawyer-form">
                        <div class="form-group">
                            <label for="legal-category">Topic</label>
                            <select id="legal-category" required>
                                <option value="">Select a topic</option>
                                <option value="housing">Housing & Tenancy</option>
                                <option value="discrimination">Discrimination</option>
                                <option value="rights">Human Rights</option>
                                <option value="employment">Employment</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="legal-question" class="required">Your Question</label>
                            <textarea id="legal-question" required placeholder="Describe your legal question..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">📤 Submit Question</button>
                    </form>
                </div>

                <div class="mt-3">
                    <h3>Your Questions</h3>
                    <div id="legal-questions-list"></div>
                </div>
            </div>
        `;

        this.initializeControls();
        this.renderQuestions();
    },

    initializeControls() {
        const form = document.getElementById('lawyer-form');
        form?.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(e) {
        e.preventDefault();

        const question = {
            id: storage.generateId(),
            category: document.getElementById('legal-category').value,
            question: document.getElementById('legal-question').value,
            status: 'pending',
            timestamp: new Date().toISOString(),
            answer: null
        };

        this.questions.unshift(question);
        this.saveQuestions();
        e.target.reset();
        this.renderQuestions();
        accessibility.announceChange('Question submitted');
    },

    renderQuestions() {
        const list = document.getElementById('legal-questions-list');
        if (!list) return;

        if (this.questions.length === 0) {
            list.innerHTML = '<p class="text-center">No questions submitted yet.</p>';
            return;
        }

        list.innerHTML = this.questions.map(q => {
            const date = new Date(q.timestamp);
            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <span class="badge badge-primary">${q.category}</span>
                            <div class="card-meta">${date.toLocaleDateString()}</div>
                        </div>
                        <span class="badge ${q.status === 'answered' ? 'badge-success' : 'badge-warning'}">${q.status}</span>
                    </div>
                    <p><strong>Question:</strong> ${q.question}</p>
                    ${q.answer ? `<p class="mt-2"><strong>Answer:</strong> ${q.answer}</p>` : '<p class="text-secondary">Waiting for response...</p>'}
                </div>
            `;
        }).join('');
    }
};
