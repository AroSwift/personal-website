// Test setup for React components
// Provides global test utilities and mocks

import { vi } from 'vitest'
import '@testing-library/jest-dom'
import React from 'react'

// Omit framer-motion props so they don't reach the DOM (avoids React warnings)
const MOTION_PROPS = [
  'whileHover',
  'whileTap',
  'initial',
  'animate',
  'transition',
  'exit',
] as const

function stripMotionProps<T extends Record<string, unknown>>(p: T): T {
  return Object.fromEntries(
    Object.entries(p).filter(([k]) => !MOTION_PROPS.includes(k))
  ) as T
}

// Mock framer-motion to avoid animation complexity in tests
// Use React.forwardRef to properly handle refs and eliminate warnings
const motionDiv = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...stripMotionProps(props)}>
    {children}
  </div>
))
motionDiv.displayName = 'motion.div'

const motionH1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, ...props }, ref) => (
  <h1 ref={ref} {...stripMotionProps(props)}>
    {children}
  </h1>
))
motionH1.displayName = 'motion.h1'

const motionP = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => (
  <p ref={ref} {...stripMotionProps(props)}>
    {children}
  </p>
))
motionP.displayName = 'motion.p'

const motionSpan = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, ...props }, ref) => (
  <span ref={ref} {...stripMotionProps(props)}>
    {children}
  </span>
))
motionSpan.displayName = 'motion.span'

const motionImg = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ alt, ...props }, ref) => (
  <img ref={ref} alt={alt || ''} {...stripMotionProps(props)} />
))
motionImg.displayName = 'motion.img'

const motionButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...stripMotionProps(props)}>
    {children}
  </button>
))
motionButton.displayName = 'motion.button'

const motionPath = React.forwardRef<
  SVGPathElement,
  React.SVGProps<SVGPathElement>
>(({ d, fill, ...props }, ref) => (
  <path ref={ref} d={d} fill={fill} {...stripMotionProps(props)} />
))
motionPath.displayName = 'motion.path'

const motionSection = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, ...props }, ref) => (
  <section ref={ref} {...stripMotionProps(props)}>
    {children}
  </section>
))
motionSection.displayName = 'motion.section'

const motionH2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, ...props }, ref) => (
  <h2 ref={ref} {...stripMotionProps(props)}>
    {children}
  </h2>
))
motionH2.displayName = 'motion.h2'

const motionH3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, ...props }, ref) => (
  <h3 ref={ref} {...stripMotionProps(props)}>
    {children}
  </h3>
))
motionH3.displayName = 'motion.h3'

const motionMain = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, ...props }, ref) => (
  <main ref={ref} {...stripMotionProps(props)}>
    {children}
  </main>
))
motionMain.displayName = 'motion.main'

/* HTMLAnchorElement is a DOM global; eslint no-undef does not include it by default */
/* eslint-disable no-undef */
const motionA = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref) => (
  <a ref={ref} {...stripMotionProps(props)}>
    {children}
  </a>
))
/* eslint-enable no-undef */
motionA.displayName = 'motion.a'

// Mock framer-motion with proper display names
vi.mock('framer-motion', () => ({
  motion: {
    div: motionDiv,
    h1: motionH1,
    p: motionP,
    span: motionSpan,
    img: motionImg,
    button: motionButton,
    path: motionPath,
    section: motionSection,
    h2: motionH2,
    h3: motionH3,
    main: motionMain,
    a: motionA,
  },
  LazyMotion: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  domAnimation: {},
  m: {
    div: motionDiv,
    h1: motionH1,
    p: motionP,
    span: motionSpan,
    img: motionImg,
    button: motionButton,
    path: motionPath,
    section: motionSection,
    h2: motionH2,
    h3: motionH3,
    main: motionMain,
    a: motionA,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
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
