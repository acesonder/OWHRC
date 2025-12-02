// Accessibility utilities and controls

class AccessibilityManager {
    constructor() {
        this.settings = {
            highContrast: false,
            reducedMotion: false,
            fontSize: 'normal' // normal, large, xlarge
        };
        
        this.loadSettings();
        this.applySettings();
        this.initializeControls();
    }

    loadSettings() {
        const saved = storage.get('accessibility_settings');
        if (saved) {
            this.settings = { ...this.settings, ...saved };
        }
    }

    saveSettings() {
        storage.set('accessibility_settings', this.settings);
    }

    applySettings() {
        // Apply high contrast
        if (this.settings.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }

        // Apply reduced motion
        if (this.settings.reducedMotion) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }

        // Apply font size
        document.body.classList.remove('font-large', 'font-xlarge');
        if (this.settings.fontSize === 'large') {
            document.body.classList.add('font-large');
        } else if (this.settings.fontSize === 'xlarge') {
            document.body.classList.add('font-xlarge');
        }
    }

    toggleHighContrast() {
        this.settings.highContrast = !this.settings.highContrast;
        this.applySettings();
        this.saveSettings();
        this.announceChange(`High contrast ${this.settings.highContrast ? 'enabled' : 'disabled'}`);
    }

    toggleReducedMotion() {
        this.settings.reducedMotion = !this.settings.reducedMotion;
        this.applySettings();
        this.saveSettings();
        this.announceChange(`Reduced motion ${this.settings.reducedMotion ? 'enabled' : 'disabled'}`);
    }

    increaseFontSize() {
        if (this.settings.fontSize === 'normal') {
            this.settings.fontSize = 'large';
        } else if (this.settings.fontSize === 'large') {
            this.settings.fontSize = 'xlarge';
        }
        this.applySettings();
        this.saveSettings();
        this.announceChange('Font size increased');
    }

    decreaseFontSize() {
        if (this.settings.fontSize === 'xlarge') {
            this.settings.fontSize = 'large';
        } else if (this.settings.fontSize === 'large') {
            this.settings.fontSize = 'normal';
        }
        this.applySettings();
        this.saveSettings();
        this.announceChange('Font size decreased');
    }

    initializeControls() {
        // High contrast toggle
        const contrastBtn = document.getElementById('toggle-contrast');
        if (contrastBtn) {
            contrastBtn.addEventListener('click', () => this.toggleHighContrast());
        }

        // Reduced motion toggle
        const motionBtn = document.getElementById('toggle-motion');
        if (motionBtn) {
            motionBtn.addEventListener('click', () => this.toggleReducedMotion());
        }

        // Font size controls
        const increaseBtn = document.getElementById('increase-font');
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => this.increaseFontSize());
        }

        const decreaseBtn = document.getElementById('decrease-font');
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => this.decreaseFontSize());
        }
    }

    announceChange(message) {
        // Create or update ARIA live region for announcements
        let announcer = document.getElementById('a11y-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'a11y-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            document.body.appendChild(announcer);
        }
        
        announcer.textContent = message;
        
        // Clear after a delay
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }

    // Focus management
    setFocus(element) {
        if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Trap focus within a modal or dialog
    trapFocus(container) {
        const focusableElements = container.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        };

        container.addEventListener('keydown', handleTabKey);
        
        // Return cleanup function
        return () => {
            container.removeEventListener('keydown', handleTabKey);
        };
    }
}

// Create global instance
const accessibility = new AccessibilityManager();
