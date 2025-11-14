/**
 * Jest Test Setup
 * Configures JSDOM environment for testing browser-based JavaScript
 */

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

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

// Reset all mocks before each test
beforeEach(() => {
  // Reset mock call history but keep implementations
  jest.clearAllMocks();

  // Re-setup default return values
  if (localStorage.getItem.mockReturnValue) {
    localStorage.getItem.mockReturnValue(null);
  }
  if (sessionStorage.getItem.mockReturnValue) {
    sessionStorage.getItem.mockReturnValue(null);
  }
  if (fetch.mockResolvedValue) {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
      text: async () => '',
    });
  }
});
