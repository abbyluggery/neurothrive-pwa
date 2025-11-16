/**
 * Jest Test Setup
 * Configures JSDOM environment for testing browser-based JavaScript
 */

// Mock localStorage with proper Jest mocks
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(() => {}),
  removeItem: jest.fn(() => {}),
  clear: jest.fn(() => {}),
};

global.localStorage = localStorageMock;

// Ensure window.localStorage (JSDOM) uses the same reference
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

// Mock sessionStorage with proper Jest mocks
global.sessionStorage = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(() => {}),
  removeItem: jest.fn(() => {}),
  clear: jest.fn(() => {}),
};

// Mock fetch
global.fetch = jest.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock window.matchMedia for dark mode tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IndexedDB
const indexedDBMock = {
  open: jest.fn(),
  deleteDatabase: jest.fn(),
};
global.indexedDB = indexedDBMock;

// Note: Individual test files should reset mocks in their own beforeEach blocks as needed
