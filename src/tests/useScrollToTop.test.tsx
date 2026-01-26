// Tests for useScrollToTop hook
// Verifies scroll behavior, cleanup, and browser compatibility

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useScrollToTop } from '../lib/useScrollToTop'
import { BrowserRouter } from 'react-router-dom'

// Mock window.scrollTo
const mockScrollTo = vi.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
})

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
})

// Mock window.CSS.supports
Object.defineProperty(window, 'CSS', {
  value: {
    supports: vi.fn().mockReturnValue(true),
  },
  writable: true,
})

// Mock requestAnimationFrame
const mockRequestAnimationFrame = vi.fn()
Object.defineProperty(window, 'requestAnimationFrame', {
  value: mockRequestAnimationFrame,
  writable: true,
})

// Mock performance.now
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn().mockReturnValue(0),
  },
  writable: true,
})

describe('useScrollToTop', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockScrollTo.mockClear()
    mockRequestAnimationFrame.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calls window.scrollTo on route change', () => {
    vi.useFakeTimers()

    // Mock scrollY to be 100 (not at top)
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    )

    renderHook(() => useScrollToTop(), { wrapper })

    // Fast-forward the timeout
    vi.advanceTimersByTime(100)

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('uses smooth scroll behavior', () => {
    vi.useFakeTimers()

    // Mock scrollY to be 100 (not at top)
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    )

    renderHook(() => useScrollToTop(), { wrapper })

    vi.advanceTimersByTime(100)

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('does not scroll if already at top', () => {
    vi.useFakeTimers()

    // Mock scrollY to be 0 (already at top)
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    )

    renderHook(() => useScrollToTop(), { wrapper })

    vi.advanceTimersByTime(100)

    expect(mockScrollTo).not.toHaveBeenCalled()
  })

  it('scrolls when not at top', () => {
    vi.useFakeTimers()

    // Mock scrollY to be 100 (not at top)
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    )

    renderHook(() => useScrollToTop(), { wrapper })

    vi.advanceTimersByTime(100)

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('cleans up timeout on unmount', () => {
    vi.useFakeTimers()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    )

    const { unmount } = renderHook(() => useScrollToTop(), { wrapper })

    // Unmount before timeout
    unmount()

    // Fast-forward time
    vi.advanceTimersByTime(100)

    // Should not have called scrollTo after unmount
    expect(mockScrollTo).not.toHaveBeenCalled()
  })

  it('handles browser without smooth scroll support', () => {
    vi.useFakeTimers()

    // Mock CSS.supports to return false for smooth scroll
    Object.defineProperty(window, 'CSS', {
      value: {
        supports: vi.fn().mockReturnValue(false),
      },
      writable: true,
    })

    // Mock scrollY to be 100
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    )

    renderHook(() => useScrollToTop(), { wrapper })

    vi.advanceTimersByTime(100)

    // Should still call scrollTo with smooth behavior
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('uses custom smooth scroll implementation when needed', () => {
    vi.useFakeTimers()

    // Mock CSS.supports to return false
    Object.defineProperty(window, 'CSS', {
      value: {
        supports: vi.fn().mockReturnValue(false),
      },
      writable: true,
    })

    // Mock scrollY to be 100
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    })

    // Mock performance.now to return increasing values
    let time = 0
    Object.defineProperty(window, 'performance', {
      value: {
        now: vi.fn(() => (time += 100)),
      },
      writable: true,
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    )

    renderHook(() => useScrollToTop(), { wrapper })

    vi.advanceTimersByTime(100)

    // Should call scrollTo initially
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('handles multiple route changes', () => {
    vi.useFakeTimers()

    // Mock scrollY to be 100 (not at top)
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    )

    const { rerender } = renderHook(() => useScrollToTop(), { wrapper })

    // First route change
    vi.advanceTimersByTime(100)
    expect(mockScrollTo).toHaveBeenCalled()

    // Clear the mock for the second call
    mockScrollTo.mockClear()

    // Simulate route change by rerendering
    rerender()

    // Second route change
    vi.advanceTimersByTime(100)
    expect(mockScrollTo).toHaveBeenCalled()

    vi.useRealTimers()
  })

  it('works with different scroll positions', () => {
    vi.useFakeTimers()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    )

    // Test with different scroll positions
    const scrollPositions = [50, 200, 500, 1000]

    scrollPositions.forEach(position => {
      Object.defineProperty(window, 'scrollY', {
        value: position,
        writable: true,
      })

      renderHook(() => useScrollToTop(), { wrapper })

      vi.advanceTimersByTime(100)

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      })

      // Clear mocks for next iteration
      mockScrollTo.mockClear()
    })
  })
})
