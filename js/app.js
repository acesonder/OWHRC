// Main application initialization

class HopeVoiceApp {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        console.log('🏠 HopeVoice Hub initializing...');

        // Initialize mobile menu
        this.initMobileMenu();

        // Initialize privacy consent
        this.checkPrivacyConsent();

        // Initialize all modules
        this.initializeModules();

        this.initialized = true;
        console.log('✅ HopeVoice Hub initialized successfully');
    }

    initMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.toggle('open');
                menuToggle.setAttribute('aria-expanded', isOpen);
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-container')) {
                    navMenu.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Close menu when navigating
            navMenu.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navMenu.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    checkPrivacyConsent() {
        const consent = storage.get('privacy_consent');
        if (!consent) {
            this.showPrivacyConsent();
        }
    }

    showPrivacyConsent() {
        // Create consent modal
        const modal = document.createElement('div');
        modal.className = 'privacy-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'privacy-title');
        modal.setAttribute('aria-modal', 'true');
        
        modal.innerHTML = `
            <div class="privacy-modal-content">
                <h2 id="privacy-title">🔒 Privacy & Data Notice</h2>
                <p>HopeVoice Hub respects your privacy. Here's what you need to know:</p>
                <ul>
                    <li>✅ All data is stored locally on your device</li>
                    <li>✅ No data is sent to external servers</li>
                    <li>✅ You can post anonymously</li>
                    <li>✅ You can delete your data anytime</li>
                    <li>✅ No tracking or analytics</li>
                </ul>
                <p>By using this platform, you consent to local data storage on your device.</p>
                <div class="privacy-actions">
                    <button id="accept-privacy" class="btn btn-primary">I Understand & Accept</button>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .privacy-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                padding: 1rem;
            }
            .privacy-modal-content {
                background: var(--bg-primary);
                padding: 2rem;
                border-radius: var(--border-radius);
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
            }
            .privacy-modal-content ul {
                margin: 1rem 0;
                padding-left: 1.5rem;
            }
            .privacy-modal-content li {
                margin: 0.5rem 0;
            }
            .privacy-actions {
                margin-top: 1.5rem;
                text-align: center;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Handle acceptance
        document.getElementById('accept-privacy').addEventListener('click', () => {
            storage.set('privacy_consent', {
                accepted: true,
                timestamp: new Date().toISOString()
            });
            modal.remove();
            accessibility.announceChange('Privacy consent accepted');
        });

        // Focus first button
        accessibility.setFocus(document.getElementById('accept-privacy'));
    }

    initializeModules() {
        // Register routes for each module
        if (typeof VoiceUpModule !== 'undefined') {
            router.register('voiceup', () => VoiceUpModule.load());
        }
        if (typeof NeedsBoardModule !== 'undefined') {
            router.register('needs-board', () => NeedsBoardModule.load());
        }
        if (typeof ResourceRadarModule !== 'undefined') {
            router.register('resource-radar', () => ResourceRadarModule.load());
        }
        if (typeof RightsBotModule !== 'undefined') {
            router.register('rightsbot', () => RightsBotModule.load());
        }
        if (typeof CivicStoriesModule !== 'undefined') {
            router.register('civic-stories', () => CivicStoriesModule.load());
        }
        if (typeof AskLawyerModule !== 'undefined') {
            router.register('ask-lawyer', () => AskLawyerModule.load());
        }
        if (typeof FoodFinderModule !== 'undefined') {
            router.register('food-finder', () => FoodFinderModule.load());
        }
        if (typeof OutreachModule !== 'undefined') {
            router.register('outreach', () => OutreachModule.load());
        }
        if (typeof AdvocacyModule !== 'undefined') {
            router.register('advocacy', () => AdvocacyModule.load());
        }
        if (typeof IncidentLoggerModule !== 'undefined') {
            router.register('incident-logger', () => IncidentLoggerModule.load());
        }
        if (typeof NewsModule !== 'undefined') {
            router.register('news', () => NewsModule.load());
        }
        if (typeof RespectPointModule !== 'undefined') {
            router.register('respect-point', () => RespectPointModule.load());
        }
        if (typeof GalleryModule !== 'undefined') {
            router.register('gallery', () => GalleryModule.load());
        }
        if (typeof NavigatorModule !== 'undefined') {
            router.register('navigator', () => NavigatorModule.load());
        }
        if (typeof HealthLogModule !== 'undefined') {
            router.register('health-log', () => HealthLogModule.load());
        }
        if (typeof HopeMapModule !== 'undefined') {
            router.register('hope-map', () => HopeMapModule.load());
        }
        if (typeof AdminModule !== 'undefined') {
            router.register('admin', () => AdminModule.load());
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new HopeVoiceApp();
        app.init();
    });
} else {
    const app = new HopeVoiceApp();
    app.init();
}
