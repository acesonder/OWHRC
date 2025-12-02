// RightsBot: Automated Rights Support

const RightsBotModule = {
    chatHistory: [],
    knowledgeBase: {
        'sleep': 'According to the Ontario Human Rights Code, everyone has the right to adequate rest. Disrupting sleep without proper cause may violate your rights.',
        'shelter': 'You have the right to seek shelter. Shelters must not discriminate based on protected grounds under the OHRC.',
        'food': 'Access to food is a basic human right. Many community resources offer free meals.',
        'discrimination': 'The Ontario Human Rights Code protects against discrimination based on race, ancestry, place of origin, colour, ethnic origin, citizenship, creed, sex, sexual orientation, gender identity, gender expression, age, marital status, family status or disability.',
        'police': 'You have rights when interacting with police, including the right to remain silent and the right to speak with a lawyer.',
        'eviction': 'Landlords must follow proper legal procedures for eviction. Illegal evictions are prohibited under the Residential Tenancies Act.'
    },

    load() {
        this.loadChatHistory();
        this.render();
    },

    loadChatHistory() {
        this.chatHistory = storage.get('rightsbot_chat') || [];
    },

    saveChatHistory() {
        storage.set('rightsbot_chat', this.chatHistory);
    },

    render() {
        const section = document.getElementById('rightsbot');
        if (!section) return;

        section.innerHTML = `
            <div class="container">
                <h2>⚖️ RightsBot: Automated Rights Support</h2>
                <p class="intro">Get instant guidance on your rights and how to address violations.</p>

                <div class="card">
                    <h3>Common Rights Questions</h3>
                    <div class="rights-topics">
                        <button class="btn btn-secondary" onclick="RightsBotModule.askAbout('sleep')">Sleep Disruption</button>
                        <button class="btn btn-secondary" onclick="RightsBotModule.askAbout('shelter')">Shelter Access</button>
                        <button class="btn btn-secondary" onclick="RightsBotModule.askAbout('food')">Food Access</button>
                        <button class="btn btn-secondary" onclick="RightsBotModule.askAbout('discrimination')">Discrimination</button>
                        <button class="btn btn-secondary" onclick="RightsBotModule.askAbout('police')">Police Interactions</button>
                        <button class="btn btn-secondary" onclick="RightsBotModule.askAbout('eviction')">Eviction</button>
                    </div>
                </div>

                <div class="card">
                    <h3>Chat with RightsBot</h3>
                    <div id="chat-container" style="max-height: 400px; overflow-y: auto; padding: 1rem; background: var(--bg-secondary); border-radius: var(--border-radius); margin-bottom: 1rem;">
                        ${this.renderChatHistory()}
                    </div>
                    <form id="chat-form" class="flex gap-1">
                        <input type="text" id="chat-input" placeholder="Ask about your rights..." style="flex: 1;" required>
                        <button type="submit" class="btn btn-primary">Send</button>
                    </form>
                </div>

                <div class="card">
                    <h3>How to Escalate</h3>
                    <p>If your rights have been violated:</p>
                    <ol>
                        <li>Document the incident (date, time, location, people involved)</li>
                        <li>Use the Incident Logger to create a record</li>
                        <li>File a complaint with the Ontario Human Rights Tribunal</li>
                        <li>Contact a legal aid service for assistance</li>
                    </ol>
                    <button class="btn btn-primary" onclick="router.navigate('incident-logger')">
                        📝 Go to Incident Logger
                    </button>
                </div>
            </div>
        `;

        this.initializeControls();
    },

    initializeControls() {
        const form = document.getElementById('chat-form');
        form?.addEventListener('submit', (e) => this.handleChatSubmit(e));
    },

    renderChatHistory() {
        if (this.chatHistory.length === 0) {
            return '<p style="text-align: center; color: var(--text-secondary);">Start a conversation by asking a question or selecting a topic above.</p>';
        }

        return this.chatHistory.map(msg => `
            <div style="margin-bottom: 1rem; ${msg.type === 'user' ? 'text-align: right;' : ''}">
                <div style="display: inline-block; padding: 0.75rem; border-radius: var(--border-radius); background: ${msg.type === 'user' ? 'var(--primary-color)' : 'var(--bg-tertiary)'}; color: ${msg.type === 'user' ? 'white' : 'var(--text-primary)'}; max-width: 80%;">
                    ${msg.message}
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">
                    ${new Date(msg.timestamp).toLocaleTimeString()}
                </div>
            </div>
        `).join('');
    },

    handleChatSubmit(e) {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const question = input.value.trim();
        
        if (!question) return;

        this.addMessage('user', question);
        input.value = '';

        // Simple keyword-based response
        setTimeout(() => {
            const response = this.generateResponse(question);
            this.addMessage('bot', response);
        }, 500);
    },

    addMessage(type, message) {
        this.chatHistory.push({
            type,
            message,
            timestamp: new Date().toISOString()
        });
        this.saveChatHistory();
        
        const container = document.getElementById('chat-container');
        if (container) {
            container.innerHTML = this.renderChatHistory();
            container.scrollTop = container.scrollHeight;
        }
    },

    generateResponse(question) {
        const lowerQuestion = question.toLowerCase();
        
        for (const [keyword, response] of Object.entries(this.knowledgeBase)) {
            if (lowerQuestion.includes(keyword)) {
                return response + '\n\nFor more specific guidance, consider using the Incident Logger or Ask a Lawyer feature.';
            }
        }

        return 'I understand you have a question about your rights. While I have limited knowledge, you can:\n\n' +
               '1. Browse the common topics above\n' +
               '2. Use the Incident Logger to document violations\n' +
               '3. Ask a lawyer for specific legal advice\n' +
               '4. Contact the Ontario Human Rights Commission';
    },

    askAbout(topic) {
        const response = this.knowledgeBase[topic];
        if (response) {
            this.addMessage('user', `Tell me about ${topic}`);
            setTimeout(() => {
                this.addMessage('bot', response);
            }, 300);
        }
    }
};
