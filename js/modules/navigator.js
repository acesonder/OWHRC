// Navigator: Peer Support Module
const NavigatorModule = {
    mentors: [],
    connections: [],
    
    load() {
        this.mentors = storage.get('peer_mentors') || this.getDefaultMentors();
        this.connections = storage.get('peer_connections') || [];
        this.render();
    },
    
    getDefaultMentors() {
        return [
            { 
                id: '1', 
                name: 'Alex', 
                experience: '5 years navigating community services', 
                specialties: ['Housing', 'Resources', 'Navigation'], 
                available: true,
                bio: 'Experienced in finding housing and accessing community resources. Happy to share what I\'ve learned.',
                languages: ['English']
            },
            { 
                id: '2', 
                name: 'Jordan', 
                experience: '3 years in advocacy', 
                specialties: ['Advocacy', 'Rights', 'Support'], 
                available: true,
                bio: 'Passionate about helping others understand their rights and advocate for themselves.',
                languages: ['English', 'French']
            },
            { 
                id: '3', 
                name: 'Sam', 
                experience: '4 years recovery support', 
                specialties: ['Recovery', 'Health', 'Wellbeing'], 
                available: true,
                bio: 'Been through recovery and can offer support and guidance to others on their journey.',
                languages: ['English']
            },
            { 
                id: '4', 
                name: 'Casey', 
                experience: '2 years peer support', 
                specialties: ['Employment', 'Life Skills', 'Resources'], 
                available: false,
                bio: 'Focused on helping others find employment and develop practical life skills.',
                languages: ['English']
            }
        ];
    },
    
    saveMentors() {
        storage.set('peer_mentors', this.mentors);
    },
    
    saveConnections() {
        storage.set('peer_connections', this.connections);
    },
    
    render() {
        const section = document.getElementById('navigator');
        if (!section) return;
        section.innerHTML = `
            <div class="container">
                <h2>🧭 Navigator: Peer Support</h2>
                <p class="intro">Connect with experienced community members who can guide and support you.</p>
                
                <div class="card">
                    <h3>About Peer Support</h3>
                    <p>Our peer navigators are community members with lived experience who can offer guidance, support, and practical advice. They understand the challenges you face and can help you navigate services, find resources, and advocate for yourself.</p>
                    <p><strong>All conversations are confidential and judgment-free.</strong></p>
                </div>
                
                <div class="card">
                    <h3>Filter Mentors</h3>
                    <div class="form-group">
                        <label for="specialty-filter">Specialty Area:</label>
                        <select id="specialty-filter">
                            <option value="all">All Specialties</option>
                            <option value="Housing">Housing</option>
                            <option value="Resources">Resources</option>
                            <option value="Advocacy">Advocacy</option>
                            <option value="Rights">Rights</option>
                            <option value="Recovery">Recovery</option>
                            <option value="Health">Health</option>
                            <option value="Employment">Employment</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="availability-filter">Availability:</label>
                        <select id="availability-filter">
                            <option value="all">All</option>
                            <option value="available">Available Now</option>
                            <option value="unavailable">Currently Unavailable</option>
                        </select>
                    </div>
                </div>

                <div class="mt-3">
                    <h3>Available Peer Navigators</h3>
                    <div id="mentors-list"></div>
                </div>
                
                <div class="mt-3">
                    <h3>Your Connections</h3>
                    <div id="connections-list"></div>
                </div>
            </div>
        `;
        
        this.initializeControls();
        this.renderMentorsList();
        this.renderConnectionsList();
    },
    
    initializeControls() {
        const specialtyFilter = document.getElementById('specialty-filter');
        const availabilityFilter = document.getElementById('availability-filter');
        
        specialtyFilter?.addEventListener('change', () => this.renderMentorsList());
        availabilityFilter?.addEventListener('change', () => this.renderMentorsList());
    },
    
    renderMentorsList() {
        const list = document.getElementById('mentors-list');
        if (!list) return;
        
        const specialtyFilter = document.getElementById('specialty-filter')?.value || 'all';
        const availabilityFilter = document.getElementById('availability-filter')?.value || 'all';
        
        let filtered = this.mentors;
        
        if (specialtyFilter !== 'all') {
            filtered = filtered.filter(m => m.specialties.includes(specialtyFilter));
        }
        
        if (availabilityFilter === 'available') {
            filtered = filtered.filter(m => m.available);
        } else if (availabilityFilter === 'unavailable') {
            filtered = filtered.filter(m => !m.available);
        }
        
        if (filtered.length === 0) {
            list.innerHTML = '<p class="text-center">No mentors match your criteria.</p>';
            return;
        }
        
        list.innerHTML = filtered.map(mentor => {
            const isConnected = this.connections.some(c => c.mentorId === mentor.id);
            
            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">👤 ${mentor.name}</h4>
                            <div class="card-meta">${mentor.experience}</div>
                        </div>
                        <span class="badge ${mentor.available ? 'badge-success' : 'badge-secondary'}">
                            ${mentor.available ? '✅ Available' : '⏸️ Unavailable'}
                        </span>
                    </div>
                    <p>${mentor.bio}</p>
                    <p><strong>Specialties:</strong> ${mentor.specialties.join(', ')}</p>
                    <p><strong>Languages:</strong> ${mentor.languages.join(', ')}</p>
                    <div class="mt-2">
                        ${mentor.available ? `
                            ${isConnected ? 
                                '<span class="badge badge-success">Connected</span>' : 
                                `<button class="btn btn-primary" onclick="NavigatorModule.connectWithMentor('${mentor.id}')">🤝 Request Connection</button>`
                            }
                        ` : '<p class="text-secondary">This mentor is currently unavailable.</p>'}
                    </div>
                </div>
            `;
        }).join('');
    },
    
    renderConnectionsList() {
        const list = document.getElementById('connections-list');
        if (!list) return;
        
        if (this.connections.length === 0) {
            list.innerHTML = '<p class="text-center">You haven\'t connected with any mentors yet.</p>';
            return;
        }
        
        list.innerHTML = this.connections.map(connection => {
            const mentor = this.mentors.find(m => m.id === connection.mentorId);
            if (!mentor) return '';
            
            const date = new Date(connection.timestamp);
            
            return `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <h4 class="card-title">👤 ${mentor.name}</h4>
                            <div class="card-meta">Connected ${date.toLocaleDateString()}</div>
                        </div>
                        <span class="badge badge-success">${connection.status}</span>
                    </div>
                    <p>${mentor.specialties.join(', ')}</p>
                    <div class="mt-2">
                        <button class="btn btn-primary" onclick="NavigatorModule.sendMessage('${connection.id}')">
                            💬 Send Message
                        </button>
                        <button class="btn btn-secondary" onclick="NavigatorModule.viewProfile('${mentor.id}')">
                            👁️ View Profile
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    connectWithMentor(mentorId) {
        const mentor = this.mentors.find(m => m.id === mentorId);
        if (!mentor) return;
        
        const reason = prompt(`Why would you like to connect with ${mentor.name}?\n\nBriefly describe what kind of support you're looking for:`);
        if (!reason) return;
        
        const connection = {
            id: storage.generateId(),
            mentorId: mentorId,
            reason: reason,
            status: 'pending',
            timestamp: new Date().toISOString()
        };
        
        this.connections.unshift(connection);
        this.saveConnections();
        
        this.renderMentorsList();
        this.renderConnectionsList();
        
        alert(`Connection request sent to ${mentor.name}!\n\nYou will be notified when they respond. In a production environment, this would trigger notifications and messaging.`);
    },
    
    sendMessage(connectionId) {
        const connection = this.connections.find(c => c.id === connectionId);
        if (!connection) return;
        
        const mentor = this.mentors.find(m => m.id === connection.mentorId);
        if (!mentor) return;
        
        alert(`Message feature coming soon!\n\nIn production, you would be able to send secure, private messages to ${mentor.name} here.`);
    },
    
    viewProfile(mentorId) {
        const mentor = this.mentors.find(m => m.id === mentorId);
        if (!mentor) return;
        
        alert(`Profile: ${mentor.name}\n\nExperience: ${mentor.experience}\nSpecialties: ${mentor.specialties.join(', ')}\nLanguages: ${mentor.languages.join(', ')}\n\n${mentor.bio}`);
    }
};
