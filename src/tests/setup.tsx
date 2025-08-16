// Test setup for React components
// Provides global test utilities and mocks

import { vi } from 'vitest'
import '@testing-library/jest-dom'
import React from 'react'

// Mock framer-motion to avoid animation complexity in tests
// Use React.forwardRef to properly handle refs and eliminate warnings
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, any>(({ children, whileHover, whileTap, animate, initial, transition, exit, ...props }, ref) => (
      <div ref={ref} {...props}>{children}</div>
    )),
    h1: React.forwardRef<HTMLHeadingElement, any>(({ children, whileHover, whileTap, animate, initial, transition, exit, ...props }, ref) => (
      <h1 ref={ref} {...props}>{children}</h1>
    )),
    p: React.forwardRef<HTMLParagraphElement, any>(({ children, whileHover, whileTap, animate, initial, transition, exit, ...props }, ref) => (
      <p ref={ref} {...props}>{children}</p>
    )),
    span: React.forwardRef<HTMLSpanElement, any>(({ children, whileHover, whileTap, animate, initial, transition, exit, ...props }, ref) => (
      <span ref={ref} {...props}>{children}</span>
    )),
    img: React.forwardRef<HTMLImageElement, any>(({ fetchPriority, ...props }, ref) => <img ref={ref} {...props} />),
    button: React.forwardRef<HTMLButtonElement, any>(({ children, whileHover, whileTap, animate, initial, transition, exit, ...props }, ref) => (
      <button ref={ref} {...props}>{children}</button>
    )),
    path: React.forwardRef<SVGPathElement, any>(({ d, fill, initial, animate, transition, ...props }, ref) => (
      <path ref={ref} d={d} fill={fill} {...props} />
    )),
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
