import { useState, useEffect, useRef } from 'react'

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

  // Guard to prevent concurrent updateServiceWorker calls
  const isUpdatingRef = useRef(false)
  const updateCleanupRef = useRef<{
    listener: (() => void) | null
    timeout: ReturnType<typeof setTimeout> | null
  }>({ listener: null, timeout: null })

  // Store interval IDs and event listeners for cleanup
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const controllerChangeListenerRef = useRef<(() => void) | null>(null)

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
      // Clean up any existing interval
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      // Clean up any existing controllerchange listener
      if (controllerChangeListenerRef.current !== null) {
        navigator.serviceWorker.removeEventListener(
          'controllerchange',
          controllerChangeListenerRef.current
        )
        controllerChangeListenerRef.current = null
      }

      // Handler for controllerchange events
      const handleControllerChange = () => {
        setPwaState(prev => ({ ...prev, hasUpdate: false }))
        // Don't automatically reload - let the user decide when to update
      }

      // Store listener reference
      controllerChangeListenerRef.current = handleControllerChange
      navigator.serviceWorker.addEventListener(
        'controllerchange',
        handleControllerChange
      )

      const swVersion =
        import.meta.env.VITE_BUILD_VERSION || Date.now().toString()
      const swUrl = `/service-worker.js?v=${swVersion}`

      navigator.serviceWorker
        .register(swUrl, { updateViaCache: 'none' })
        .then(registration => {
          // Check for updates periodically
          const checkForUpdates = () => {
            registration.update()
          }

          // Check immediately on mount
          checkForUpdates()

          // Then check every 1 minute
          // Store interval ID in ref for cleanup
          intervalRef.current = setInterval(checkForUpdates, 60 * 1000)

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

          // Check if there's already a waiting worker (page loaded after update was detected)
          if (registration.waiting && navigator.serviceWorker.controller) {
            setPwaState(prev => ({ ...prev, hasUpdate: true }))
          }
        })
        .catch(() => {
          // Registration failed, clean up interval if set
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        })
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)

      // Clean up interval
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      // Clean up controllerchange listener
      if (
        controllerChangeListenerRef.current !== null &&
        'serviceWorker' in navigator
      ) {
        navigator.serviceWorker.removeEventListener(
          'controllerchange',
          controllerChangeListenerRef.current
        )
        controllerChangeListenerRef.current = null
      }
    }
  }, [isBrowser])

  const updateServiceWorker = async () => {
    if (!isBrowser || !('serviceWorker' in navigator)) return

    // Prevent concurrent executions
    if (isUpdatingRef.current) {
      return
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        // Check waiting FIRST (this is the state when update is available)
        // Then fall back to installing
        const waitingWorker = registration.waiting || registration.installing

        if (waitingWorker) {
          // Set updating flag
          isUpdatingRef.current = true

          // Clean up any existing listeners/timeouts from previous calls
          if (updateCleanupRef.current.listener) {
            navigator.serviceWorker.removeEventListener(
              'controllerchange',
              updateCleanupRef.current.listener
            )
            updateCleanupRef.current.listener = null
          }
          if (updateCleanupRef.current.timeout) {
            clearTimeout(updateCleanupRef.current.timeout)
            updateCleanupRef.current.timeout = null
          }

          // Hide the notification immediately
          setPwaState(prev => ({ ...prev, hasUpdate: false }))

          // Set up reload listener BEFORE sending message (avoid race condition)
          let reloaded = false
          const reload = () => {
            if (!reloaded) {
              reloaded = true
              // Reset flag before reload (though reload will clear state anyway)
              isUpdatingRef.current = false
              updateCleanupRef.current.listener = null
              updateCleanupRef.current.timeout = null
              window.location.reload()
            }
          }

          // Store listener reference for cleanup
          updateCleanupRef.current.listener = reload

          navigator.serviceWorker.addEventListener('controllerchange', reload, {
            once: true,
          })

          // Send skip waiting message
          waitingWorker.postMessage({ type: 'SKIP_WAITING' })

          // Fallback: reload after 2 seconds if controllerchange doesn't fire
          updateCleanupRef.current.timeout = setTimeout(() => {
            updateCleanupRef.current.timeout = null
            reload()
          }, 2000)
        } else {
          // No waiting worker, reset flag
          isUpdatingRef.current = false
        }
      } else {
        // No registration, reset flag
        isUpdatingRef.current = false
      }
    } catch (error) {
      console.error('Error updating service worker:', error)
      // Reset flag on error
      isUpdatingRef.current = false
      // Clean up on error
      if (updateCleanupRef.current.listener) {
        navigator.serviceWorker.removeEventListener(
          'controllerchange',
          updateCleanupRef.current.listener
        )
        updateCleanupRef.current.listener = null
      }
      if (updateCleanupRef.current.timeout) {
        clearTimeout(updateCleanupRef.current.timeout)
        updateCleanupRef.current.timeout = null
      }
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
