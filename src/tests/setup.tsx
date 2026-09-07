// Test setup for React components
// Provides global test utilities and mocks

import { vi } from 'vitest'
import '@testing-library/jest-dom'
import React from 'react'

const MOTION_PROP_KEYS = new Set([
  'whileHover',
  'whileTap',
  'whileDrag',
  'whileFocus',
  'whileInView',
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'layout',
  'layoutId',
  'onAnimationStart',
  'onAnimationComplete',
])

// Helper to strip framer-motion specific props before passing to native DOM elements
// to prevent React 19 warnings about unrecognized DOM attributes
const filterMotionProps = (props: Record<string, any>) => {
  const result: Record<string, any> = {}
  for (const [key, value] of Object.entries(props)) {
    if (!MOTION_PROP_KEYS.has(key)) {
      result[key] = value
    }
  }
  return result
}

// Mock framer-motion to avoid animation complexity in tests
// Use React.forwardRef to properly handle refs and eliminate warnings
const motionDiv = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...filterMotionProps(props)}>
    {children}
  </div>
))
motionDiv.displayName = 'motion.div'

const motionH1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, ...props }, ref) => (
  <h1 ref={ref} {...filterMotionProps(props)}>
    {children}
  </h1>
))
motionH1.displayName = 'motion.h1'

const motionH2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, ...props }, ref) => (
  <h2 ref={ref} {...filterMotionProps(props)}>
    {children}
  </h2>
))
motionH2.displayName = 'motion.h2'

const motionP = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => (
  <p ref={ref} {...filterMotionProps(props)}>
    {children}
  </p>
))
motionP.displayName = 'motion.p'

const motionSpan = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, ...props }, ref) => (
  <span ref={ref} {...filterMotionProps(props)}>
    {children}
  </span>
))
motionSpan.displayName = 'motion.span'

const motionImg = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>((props, ref) => <img ref={ref} {...filterMotionProps(props)} />)
motionImg.displayName = 'motion.img'

const motionButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...filterMotionProps(props)}>
    {children}
  </button>
))
motionButton.displayName = 'motion.button'

const motionA = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref) => (
  <a ref={ref} {...filterMotionProps(props)}>
    {children}
  </a>
))
motionA.displayName = 'motion.a'

const motionPath = React.forwardRef<
  SVGPathElement,
  React.SVGProps<SVGPathElement>
>(({ d, fill, ...props }, ref) => (
  <path ref={ref} d={d} fill={fill} {...filterMotionProps(props)} />
))
motionPath.displayName = 'motion.path'

// Mock framer-motion with proper display names
vi.mock('framer-motion', () => ({
  motion: {
    div: motionDiv,
    h1: motionH1,
    h2: motionH2,
    p: motionP,
    span: motionSpan,
    img: motionImg,
    button: motionButton,
    a: motionA,
    path: motionPath,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  MotionConfig: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
  useAnimationControls: () => ({
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
