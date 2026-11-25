import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor, cleanup } from '@testing-library/react'
import { usePWA } from '../lib/usePWA'

describe('usePWA', () => {
  const originalServiceWorker = navigator.serviceWorker

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
    Object.defineProperty(navigator, 'serviceWorker', {
      value: originalServiceWorker,
      configurable: true,
      writable: true,
    })
  })

  it('tracks online and offline window events', () => {
    const { result } = renderHook(() => usePWA())

    act(() => {
      window.dispatchEvent(new Event('offline'))
    })
    expect(result.current.isOnline).toBe(false)

    act(() => {
      window.dispatchEvent(new Event('online'))
    })
    expect(result.current.isOnline).toBe(true)
  })

  it('detects a waiting service worker and triggers SKIP_WAITING on update', async () => {
    const postMessage = vi.fn()
    const update = vi.fn()
    const reloadMock = vi.fn()
    const listeners: Record<string, Array<() => void>> = {}

    const waitingWorker = { postMessage }
    const registration = {
      waiting: waitingWorker,
      installing: null,
      update,
      addEventListener: vi.fn(),
    }

    Object.defineProperty(window, 'location', {
      value: { ...window.location, reload: reloadMock },
      writable: true,
    })

    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        controller: {},
        register: vi.fn().mockResolvedValue(registration),
        getRegistration: vi.fn().mockResolvedValue(registration),
        addEventListener: vi.fn((event: string, cb: () => void) => {
          listeners[event] = listeners[event] || []
          listeners[event].push(cb)
        }),
        removeEventListener: vi.fn(),
      },
      configurable: true,
      writable: true,
    })

    const { result } = renderHook(() => usePWA())

    await waitFor(() => {
      expect(result.current.hasUpdate).toBe(true)
    })

    await act(async () => {
      await result.current.updateServiceWorker()
    })

    expect(postMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' })
    expect(result.current.hasUpdate).toBe(false)

    // Simulate controllerchange firing
    act(() => {
      listeners.controllerchange?.forEach(cb => cb())
    })
    expect(reloadMock).toHaveBeenCalledTimes(1)
  })

  it('calls registration.update via checkForUpdates', async () => {
    const update = vi.fn()
    const registration = {
      waiting: null,
      installing: null,
      update,
      addEventListener: vi.fn(),
    }

    const registerMock = vi.fn().mockResolvedValue(registration)

    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        controller: null,
        register: registerMock,
        getRegistration: vi.fn().mockResolvedValue(registration),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
      configurable: true,
      writable: true,
    })

    const { result } = renderHook(() => usePWA())

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith('/service-worker.js', {
        updateViaCache: 'none',
      })
      expect(update).toHaveBeenCalledTimes(1)
    })

    act(() => {
      result.current.checkForUpdates()
    })

    await waitFor(() => {
      expect(update).toHaveBeenCalledTimes(2)
    })
  })
})
