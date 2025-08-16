// Test setup for React components
// Provides global test utilities and mocks

import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, animate, initial, transition, exit, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, whileHover, whileTap, animate, initial, transition, exit, ...props }: any) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, whileHover, whileTap, animate, initial, transition, exit, ...props }: any) => (
      <p {...props}>{children}</p>
    ),
    span: ({ children, whileHover, whileTap, animate, initial, transition, exit, ...props }: any) => (
      <span {...props}>{children}</span>
    ),
    img: ({ fetchPriority, ...props }: any) => <img {...props} />,
    button: ({ children, whileHover, whileTap, animate, initial, transition, exit, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    path: ({ d, fill, initial, animate, transition, ...props }: any) => (
      <path d={d} fill={fill} {...props} />
    ),
  },
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
}))

// Mock localStorage for consistent testing
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Mock window.matchMedia for responsive design testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock window.scrollTo for smooth scrolling functionality
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
})
