// Advocacy Letter Builder Module
const AdvocacyModule = {
    letters: [],
    
    load() {
        this.letters = storage.get('advocacy_letters') || [];
        this.render();
    },
    
    saveLetters() {
        storage.set('advocacy_letters', this.letters);
    },
    
    render() {
        const section = document.getElementById('advocacy');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>✍️ Advocacy Letter Builder</h2>
                <p class="intro">Create professional advocacy letters for council and policy makers.</p>
                
                <div class="card">
                    <h3>Start New Letter</h3>
                    <form id="advocacy-form">
                        <div class="form-group">
                            <label for="letter-template" class="required">Template</label>
                            <select id="letter-template" required>
                                <option value="">Select a template</option>
                                <option value="housing">Housing Rights</option>
                                <option value="services">Community Services</option>
                                <option value="discrimination">Discrimination</option>
                                <option value="safety">Public Safety</option>
                                <option value="custom">Custom Letter</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="letter-recipient" class="required">Recipient</label>
                            <select id="letter-recipient" required>
                                <option value="">Select recipient</option>
                                <option value="council">City Council</option>
                                <option value="mayor">Mayor's Office</option>
                                <option value="ohrc">Ontario Human Rights Commission</option>
                                <option value="mpp">MPP Office</option>
                                <option value="mp">MP Office</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="letter-subject" class="required">Subject</label>
                            <input type="text" id="letter-subject" required placeholder="Brief subject of your letter">
                        </div>
                        <div class="form-group">
                            <label for="letter-content" class="required">Your Message</label>
                            <textarea id="letter-content" required style="min-height: 200px;" placeholder="Describe your concern and what action you're requesting..."></textarea>
                        </div>
                        <div class="form-group">
                            <label for="sender-name">Your Name (optional)</label>
                            <input type="text" id="sender-name" placeholder="Leave blank for anonymous">
                        </div>
                        <button type="submit" class="btn btn-primary">Generate Letter</button>
                    </form>
                </div>
                
                <div id="generated-letter" class="card hidden mt-3">
                    <h3>Generated Letter</h3>
                    <div id="letter-preview" style="padding: 1.5rem; background: white; color: black; border: 1px solid #ccc; border-radius: var(--border-radius); white-space: pre-wrap; font-family: 'Times New Roman', serif;"></div>
                    <div class="mt-2">
                        <button class="btn btn-success" onclick="AdvocacyModule.saveLetter()">💾 Save Letter</button>
                        <button class="btn btn-primary" onclick="AdvocacyModule.downloadLetter()">⬇️ Download as Text</button>
                        <button class="btn btn-secondary" onclick="AdvocacyModule.copyLetter()">📋 Copy to Clipboard</button>
                    </div>
                </div>
                
                <div class="mt-3">
                    <h3>Your Saved Letters</h3>
                    <div id="letters-list"></div>
                </div>
            </div>
        `;
        
        this.initializeControls();
        this.renderLettersList();
    },
    
    initializeControls() {
        const form = document.getElementById('advocacy-form');
        form?.addEventListener('submit', (e) => this.handleGenerateLetter(e));
    },
    
    handleGenerateLetter(e) {
        e.preventDefault();
        
        const template = document.getElementById('letter-template').value;
        const recipient = document.getElementById('letter-recipient').value;
        const subject = document.getElementById('letter-subject').value;
        const content = document.getElementById('letter-content').value;
        const senderName = document.getElementById('sender-name').value || 'A Concerned Citizen';
        
        const letter = this.buildLetter(template, recipient, subject, content, senderName);
        
        this.currentLetter = {
            template,
            recipient,
            subject,
            content,
            senderName,
            generatedText: letter,
            timestamp: new Date().toISOString()
        };
        
        const preview = document.getElementById('letter-preview');
        const section = document.getElementById('generated-letter');
        
        preview.textContent = letter;
        section.classList.remove('hidden');
        
        // Scroll to the generated letter
        section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    
    buildLetter(template, recipient, subject, content, senderName) {
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        const recipientAddresses = {
            council: 'Cobourg City Council\nCity Hall\n55 King Street West\nCobourg, ON K9A 2M2',
            mayor: 'Office of the Mayor\nCity Hall\n55 King Street West\nCobourg, ON K9A 2M2',
            ohrc: 'Ontario Human Rights Commission\n180 Dundas Street West, 9th Floor\nToronto, ON M7A 2R9',
            mpp: 'Member of Provincial Parliament\nProvincial Parliament Building\nQueen\'s Park\nToronto, ON M7A 1A1',
            mp: 'Member of Parliament\nHouse of Commons\nOttawa, ON K1A 0A6'
        };
        
        const templates = {
            housing: 'I am writing to you regarding the urgent need for improved housing rights and protections in our community.',
            services: 'I am writing to advocate for enhanced community services that better serve all residents.',
            discrimination: 'I am writing to bring to your attention concerns regarding discrimination and the need for stronger human rights protections.',
            safety: 'I am writing regarding public safety concerns that affect our community members.',
            custom: ''
        };
        
        const introduction = template !== 'custom' ? templates[template] + '\n\n' : '';
        
        return `${date}

${recipientAddresses[recipient]}

Dear Sir/Madam,

RE: ${subject}

${introduction}${content}

I urge you to take action on this matter and work towards positive change for all community members. Your leadership and commitment to addressing this issue would make a significant difference.

Thank you for your attention to this important matter. I look forward to your response and to seeing positive action taken.

Sincerely,

${senderName}`;
    },
    
    saveLetter() {
        if (!this.currentLetter) return;
        
        this.currentLetter.id = storage.generateId();
        this.letters.unshift(this.currentLetter);
        this.saveLetters();
        
        alert('Letter saved successfully!');
        this.renderLettersList();
    },
    
    downloadLetter() {
        if (!this.currentLetter) return;
        
        const blob = new Blob([this.currentLetter.generatedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `advocacy-letter-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    },
    
    copyLetter() {
        if (!this.currentLetter) return;
        
        navigator.clipboard.writeText(this.currentLetter.generatedText).then(() => {
            alert('Letter copied to clipboard!');
        });
    },
    
    renderLettersList() {
        const list = document.getElementById('letters-list');
        if (!list) return;
        
        if (this.letters.length === 0) {
            list.innerHTML = '<p class="text-center">No saved letters yet.</p>';
            return;
        }
        
        list.innerHTML = this.letters.map(letter => {
            const date = new Date(letter.timestamp);
            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">${letter.subject}</h4>
                            <div class="card-meta">To: ${letter.recipient} • ${date.toLocaleDateString()}</div>
                        </div>
                        <span class="badge badge-primary">${letter.template}</span>
                    </div>
                    <p>${letter.content.substring(0, 150)}${letter.content.length > 150 ? '...' : ''}</p>
                    <div class="mt-2">
                        <button class="btn btn-secondary" onclick="AdvocacyModule.viewLetter('${letter.id}')">👁️ View Full Letter</button>
                        <button class="btn btn-secondary" onclick="AdvocacyModule.downloadSaved('${letter.id}')">⬇️ Download</button>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    viewLetter(letterId) {
        const letter = this.letters.find(l => l.id === letterId);
        if (!letter) return;
        
        const preview = document.getElementById('letter-preview');
        const section = document.getElementById('generated-letter');
        
        preview.textContent = letter.generatedText;
        section.classList.remove('hidden');
        this.currentLetter = letter;
        
        section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    
    downloadSaved(letterId) {
        const letter = this.letters.find(l => l.id === letterId);
        if (!letter) return;
        
        const blob = new Blob([letter.generatedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `advocacy-letter-${letter.subject.replace(/\s+/g, '-').toLowerCase()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
};
