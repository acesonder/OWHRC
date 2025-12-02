// Advocacy Letter Builder Module
const AdvocacyModule = {
    letters: [],
    load() {
        this.letters = storage.get('advocacy_letters') || [];
        this.render();
    },
    render() {
        const section = document.getElementById('advocacy');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>✍️ Advocacy Letter Builder</h2>
                <p class="intro">Create advocacy letters for council and policy makers.</p>
                <div class="card">
                    <h3>Start New Letter</h3>
                    <form id="advocacy-form">
                        <div class="form-group">
                            <label>Template</label>
                            <select id="letter-template">
                                <option value="housing">Housing Rights</option>
                                <option value="services">Community Services</option>
                                <option value="discrimination">Discrimination</option>
                                <option value="custom">Custom Letter</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Recipient</label>
                            <select id="letter-recipient">
                                <option value="council">City Council</option>
                                <option value="mayor">Mayor's Office</option>
                                <option value="ohrc">OHRC</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Your Message</label>
                            <textarea id="letter-content" style="min-height: 200px;" placeholder="Describe your concern..."></textarea>
                        </div>
                        <button type="button" class="btn btn-primary" onclick="AdvocacyModule.generateLetter()">Generate Letter</button>
                    </form>
                </div>
                <div id="letters-list" class="mt-3"></div>
            </div>
        `;
    },
    generateLetter() {
        alert('Letter generated! In production, this would create a formatted advocacy letter ready for download or submission.');
    }
};
