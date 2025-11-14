/**
 * Dark Mode Manager Unit Tests
 * Tests theme detection, toggling, and persistence
 */

// Load the module
const { DarkModeManager } = require('../js/dark-mode.js');

describe('DarkModeManager', () => {
  let manager;

  beforeAll(() => {
    // Mock DOM methods
    document.documentElement.setAttribute = jest.fn();
    document.documentElement.getAttribute = jest.fn();
    document.querySelector = jest.fn();
    document.createElement = jest.fn(() => ({
      setAttribute: jest.fn(),
      appendChild: jest.fn(),
    }));
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    document.getElementById = jest.fn();
    window.dispatchEvent = jest.fn();
  });

  beforeEach(() => {
    // Reset all mocks
    if (localStorage.getItem.mockClear) {
      localStorage.getItem.mockClear();
      localStorage.setItem.mockClear();
      localStorage.removeItem.mockClear();
    }
    localStorage.getItem.mockReturnValue(null);

    // Setup DOM mocks
    document.documentElement.getAttribute.mockReturnValue('light');
    document.getElementById.mockReturnValue(null);

    // Create manager instance
    manager = new DarkModeManager();
  });

  describe('Theme Detection', () => {
    test('should detect light theme by default', () => {
      expect(manager.getSystemTheme()).toBe('light');
    });

    test('should detect dark theme from system preference', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: jest.fn(),
      }));

      const newManager = new DarkModeManager();
      expect(newManager.getSystemTheme()).toBe('dark');
    });

    test('should load saved theme from localStorage', () => {
      localStorage.getItem.mockReturnValue('dark');
      const newManager = new DarkModeManager();
      expect(newManager.getSavedTheme()).toBe('dark');
    });
  });

  describe('Theme Setting', () => {
    test('should set dark theme', () => {
      manager.setTheme('dark', false);
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });

    test('should set light theme', () => {
      manager.setTheme('light', false);
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'light'
      );
    });

    test('should save theme to localStorage when save=true', () => {
      manager.setTheme('dark', true);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'neurothrive-theme',
        'dark'
      );
    });

    test('should not save theme when save=false', () => {
      manager.setTheme('dark', false);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    test('should default to light theme for invalid values', () => {
      manager.setTheme('invalid', false);
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'light'
      );
    });
  });

  describe('Theme Toggle', () => {
    test('should toggle from light to dark', () => {
      document.documentElement.getAttribute.mockReturnValue('light');
      manager.toggle();
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });

    test('should toggle from dark to light', () => {
      document.documentElement.getAttribute.mockReturnValue('dark');
      manager.toggle();
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'light'
      );
    });

    test('should save preference after toggle', () => {
      document.documentElement.getAttribute.mockReturnValue('light');
      manager.toggle();
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Current Theme', () => {
    test('should return current theme', () => {
      document.documentElement.getAttribute.mockReturnValue('dark');
      expect(manager.getCurrentTheme()).toBe('dark');
    });

    test('should default to light if no theme set', () => {
      document.documentElement.getAttribute.mockReturnValue(null);
      expect(manager.getCurrentTheme()).toBe('light');
    });

    test('isDark should return true for dark theme', () => {
      document.documentElement.getAttribute.mockReturnValue('dark');
      expect(manager.isDark()).toBe(true);
    });

    test('isDark should return false for light theme', () => {
      document.documentElement.getAttribute.mockReturnValue('light');
      expect(manager.isDark()).toBe(false);
    });
  });

  describe('Clear Preference', () => {
    test('should remove saved preference', () => {
      manager.clearPreference();
      expect(localStorage.removeItem).toHaveBeenCalledWith('neurothrive-theme');
    });

    test('should revert to system theme after clearing', () => {
      manager.clearPreference();
      expect(document.documentElement.setAttribute).toHaveBeenCalled();
    });
  });
});
