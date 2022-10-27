import { vi } from 'vitest';

const WindowMock = {
  localStorage: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
};

vi.stubGlobal('window', WindowMock);
