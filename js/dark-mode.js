/**
 * Dark Mode Manager for NeuroThrive PWA
 * Handles theme switching with system preference detection
 *
 * Features:
 * - System preference detection
 * - Manual toggle
 * - Persistent storage
 * - Smooth transitions
 *
 * @author Abby Luggery / Claude Code Assistant
 * @date 2025-11-14
 */

class DarkModeManager {
    constructor() {
        this.STORAGE_KEY = 'neurothrive-theme';
        this.THEME_ATTRIBUTE = 'data-theme';
        this.init();
    }

    /**
     * Initialize dark mode
     */
    init() {
        // Load saved preference or detect system preference
        const savedTheme = this.getSavedTheme();
        const theme = savedTheme || this.getSystemTheme();

        this.setTheme(theme, false); // false = don't save (already saved or system)

        // Listen for system theme changes
        this.watchSystemTheme();

        console.log('✅ Dark mode initialized:', theme);
    }

    /**
     * Get saved theme from localStorage
     */
    getSavedTheme() {
        try {
            return localStorage.getItem(this.STORAGE_KEY);
        } catch (e) {
            console.error('Error reading theme preference:', e);
            return null;
        }
    }

    /**
     * Detect system theme preference
     */
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Watch for system theme changes
     */
    watchSystemTheme() {
        if (!window.matchMedia) return;

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Modern browsers
        if (darkModeQuery.addEventListener) {
            darkModeQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't set a manual preference
                if (!this.getSavedTheme()) {
                    this.setTheme(e.matches ? 'dark' : 'light', false);
                }
            });
        }
        // Fallback for older browsers
        else if (darkModeQuery.addListener) {
            darkModeQuery.addListener((e) => {
                if (!this.getSavedTheme()) {
                    this.setTheme(e.matches ? 'dark' : 'light', false);
                }
            });
        }
    }

    /**
     * Set theme
     * @param {string} theme - 'light' or 'dark'
     * @param {boolean} save - Whether to save preference
     */
    setTheme(theme, save = true) {
        const validTheme = theme === 'dark' ? 'dark' : 'light';

        // Set data attribute on html element
        document.documentElement.setAttribute(this.THEME_ATTRIBUTE, validTheme);

        // Update meta theme-color for mobile browsers
        this.updateThemeColor(validTheme);

        // Save preference
        if (save) {
            try {
                localStorage.setItem(this.STORAGE_KEY, validTheme);
            } catch (e) {
                console.error('Error saving theme preference:', e);
            }
        }

        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: validTheme }
        }));

        // Update toggle button UI
        this.updateToggleButton(validTheme);
    }

    /**
     * Update mobile browser theme color
     */
    updateThemeColor(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#1E1E1E' : '#6B46C1');
        }
    }

    /**
     * Update dark mode toggle button
     */
    updateToggleButton(theme) {
        const toggleButton = document.getElementById('darkModeToggle');
        if (toggleButton) {
            toggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
            toggleButton.setAttribute('aria-label',
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
            toggleButton.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
        }
    }

    /**
     * Toggle between light and dark mode
     */
    toggle() {
        const currentTheme = document.documentElement.getAttribute(this.THEME_ATTRIBUTE) || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme, true);

        // Announce to screen readers
        this.announceThemeChange(newTheme);
    }

    /**
     * Announce theme change to screen readers
     */
    announceThemeChange(theme) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `${theme === 'dark' ? 'Dark' : 'Light'} mode activated`;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    /**
     * Get current theme
     */
    getCurrentTheme() {
        return document.documentElement.getAttribute(this.THEME_ATTRIBUTE) || 'light';
    }

    /**
     * Check if dark mode is active
     */
    isDark() {
        return this.getCurrentTheme() === 'dark';
    }

    /**
     * Clear saved preference (revert to system default)
     */
    clearPreference() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            this.setTheme(this.getSystemTheme(), false);
        } catch (e) {
            console.error('Error clearing theme preference:', e);
        }
    }
}

// Only initialize in browser environment (not in test/Node.js)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Create singleton instance
    const darkModeManager = new DarkModeManager();

    // Make available globally
    window.darkModeManager = darkModeManager;

    // Initialize toggle button when DOM is ready
    function initDarkModeToggle() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                darkModeManager.toggle();
            });

            // Set initial state
            darkModeManager.updateToggleButton(darkModeManager.getCurrentTheme());
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDarkModeToggle);
    } else {
        initDarkModeToggle();
    }
}

// Export for testing (CommonJS for Node.js/Jest)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DarkModeManager };
}
