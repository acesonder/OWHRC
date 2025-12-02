// Simple router for single-page navigation

class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.init();
    }

    init() {
        // Handle navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-section]');
            if (link) {
                e.preventDefault();
                const section = link.dataset.section;
                this.navigate(section);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.section) {
                this.showSection(e.state.section, false);
            }
        });

        // Handle hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                this.showSection(hash, false);
            }
        });

        // Load initial route
        const hash = window.location.hash.slice(1) || 'home';
        this.navigate(hash, true);
    }

    register(name, loadCallback) {
        this.routes.set(name, loadCallback);
    }

    navigate(sectionName, replace = false) {
        // Update URL
        if (!replace) {
            window.history.pushState({ section: sectionName }, '', `#${sectionName}`);
        }
        
        this.showSection(sectionName, true);
    }

    showSection(sectionName, executeCallback = true) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`a[data-section="${sectionName}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Execute route callback if registered
            if (executeCallback) {
                const callback = this.routes.get(sectionName);
                if (callback) {
                    callback();
                }
            }

            // Scroll to top
            window.scrollTo(0, 0);
            
            // Announce navigation for screen readers
            accessibility.announceChange(`Navigated to ${sectionName.replace(/-/g, ' ')} section`);
            
            this.currentRoute = sectionName;
        } else {
            console.warn(`Section "${sectionName}" not found`);
        }
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}

// Create global router instance
const router = new Router();
