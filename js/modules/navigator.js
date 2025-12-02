// Navigator: Peer Support Module
const NavigatorModule = {
    mentors: [],
    load() {
        this.mentors = storage.get('peer_mentors') || this.getDefaultMentors();
        this.render();
    },
    getDefaultMentors() {
        return [
            { id: '1', name: 'Community Mentor', experience: '5 years', specialties: ['Housing', 'Resources'], available: true },
            { id: '2', name: 'Street Navigator', experience: '3 years', specialties: ['Support', 'Advocacy'], available: true }
        ];
    },
    render() {
        const section = document.getElementById('navigator');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>🧭 Navigator: Peer Support</h2>
                <p class="intro">Connect with experienced community members who can guide and support you.</p>
                <div class="card">
                    <h3>Available Mentors</h3>
                    <div id="mentors-list">
                        ${this.mentors.map(m => `
                            <div class="list-item">
                                <h4>👤 ${m.name}</h4>
                                <p>Experience: ${m.experience}</p>
                                <p>Specialties: ${m.specialties.join(', ')}</p>
                                ${m.available ? '<button class="btn btn-primary">Connect</button>' : '<span class="badge badge-secondary">Unavailable</span>'}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
};
