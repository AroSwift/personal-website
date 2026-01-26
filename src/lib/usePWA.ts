import { useState, useEffect } from 'react'

interface PWAState {
  isOnline: boolean
  isInstalled: boolean
  canInstall: boolean
  hasUpdate: boolean
  isStandalone: boolean
}

export function usePWA() {
  // Check if we're in the browser environment
  const isBrowser =
    typeof window !== 'undefined' && typeof navigator !== 'undefined'

  const [pwaState, setPwaState] = useState<PWAState>({
    isOnline: isBrowser ? navigator.onLine : true,
    isInstalled: isBrowser
      ? window.matchMedia('(display-mode: standalone)').matches
      : false,
    canInstall: false,
    hasUpdate: false,
    isStandalone: isBrowser
      ? window.matchMedia('(display-mode: standalone)').matches
      : false,
  })

  useEffect(() => {
    // Only run in browser environment
    if (!isBrowser) return

    // Online/offline status
    const handleOnline = () =>
      setPwaState(prev => ({ ...prev, isOnline: true }))
    const handleOffline = () =>
      setPwaState(prev => ({ ...prev, isOnline: false }))

    // Event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Service worker update detection
    if ('serviceWorker' in navigator) {
      // Check if service worker is already registered to prevent duplicates
      navigator.serviceWorker.getRegistration().then(existingRegistration => {
        if (!existingRegistration) {
          navigator.serviceWorker
            .register('/service-worker.js')
            .then(registration => {
              // Check for updates periodically
              const checkForUpdates = () => {
                registration.update()
              }

              // Check immediately on mount
              checkForUpdates()

              // Then check every 5 minutes (reduced from 10 seconds)
              const updateInterval = setInterval(checkForUpdates, 5 * 60 * 1000)

              registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing
                if (newWorker) {
                  newWorker.addEventListener('statechange', () => {
                    if (
                      newWorker.state === 'installed' &&
                      navigator.serviceWorker.controller
                    ) {
                      setPwaState(prev => ({ ...prev, hasUpdate: true }))
                    }
                  })
                }
              })

              return () => clearInterval(updateInterval)
            })
        } else {
          // Service worker already registered, just set up update checking
          const checkForUpdates = () => {
            existingRegistration.update()
          }

          // Check immediately on mount
          checkForUpdates()

          // Then check every 5 minutes
          const updateInterval = setInterval(checkForUpdates, 5 * 60 * 1000)

          existingRegistration.addEventListener('updatefound', () => {
            const newWorker = existingRegistration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  setPwaState(prev => ({ ...prev, hasUpdate: true }))
                }
              })
            }
          })

          return () => clearInterval(updateInterval)
        }
      })

      // Remove automatic reload - let user choose when to update
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setPwaState(prev => ({ ...prev, hasUpdate: false }))
        // Don't automatically reload - let the user decide when to update
      })
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [isBrowser])

  const updateServiceWorker = async () => {
    if (!isBrowser || !('serviceWorker' in navigator)) return

    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        // If there's an installing service worker, send it the skip waiting message
        if (registration.installing) {
          registration.installing.postMessage({ type: 'SKIP_WAITING' })
        }
        // Also check if there's an available update
        await registration.update()

        // Listen for controller change and reload when user explicitly updates
        navigator.serviceWorker.addEventListener(
          'controllerchange',
          () => {
            window.location.reload()
          },
          { once: true }
        )
      }
    } catch (error) {
      console.error('Error updating service worker:', error)
    }
  }

  const checkForUpdates = () => {
    if (isBrowser && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.update()
        }
      })
    }
  }

  return {
    ...pwaState,
    updateServiceWorker,
    checkForUpdates,
  }
}
