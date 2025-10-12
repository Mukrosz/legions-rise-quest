import '@testing-library/jest-dom';

// Mock crypto.subtle for tests
global.crypto = {
  subtle: {
    digest: jest.fn((algorithm, data) => {
      // Simple mock - in real tests, use actual WebCrypto or a polyfill
      return Promise.resolve(new ArrayBuffer(32));
    }),
  },
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

