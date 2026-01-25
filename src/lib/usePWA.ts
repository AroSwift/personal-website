import {
  useState,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
} from 'react'

/* global ServiceWorkerRegistration */

interface PWAState {
  isOnline: boolean
  isInstalled: boolean
  canInstall: boolean
  hasUpdate: boolean
  isStandalone: boolean
}

function setupUpdateChecking(
  registration: ServiceWorkerRegistration,
  setPwaState: Dispatch<SetStateAction<PWAState>>,
  updateIntervalRef: MutableRefObject<ReturnType<typeof setInterval> | null>
) {
  const checkForUpdates = () => registration.update()
  checkForUpdates()
  updateIntervalRef.current = setInterval(checkForUpdates, 5 * 60 * 1000)
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
}

export function usePWA() {
  // Check if we're in the browser environment
  const isBrowser =
    typeof window !== 'undefined' && typeof navigator !== 'undefined'

  const updateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

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
              setupUpdateChecking(registration, setPwaState, updateIntervalRef)
            })
        } else {
          setupUpdateChecking(
            existingRegistration,
            setPwaState,
            updateIntervalRef
          )
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
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current)
        updateIntervalRef.current = null
      }
    }
  }, [isBrowser])

  const updateServiceWorker = async () => {
    if (!isBrowser || !('serviceWorker' in navigator)) return

    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        // Add listener BEFORE skipWaiting so we don't miss the controllerchange event
        navigator.serviceWorker.addEventListener(
          'controllerchange',
          () => {
            window.location.reload()
          },
          { once: true }
        )

        // When "Update Available" is shown, the new worker is in "waiting" state
        // (registration.installing is null by then). Send SKIP_WAITING to the waiting worker.
        const workerToSkip = registration.waiting ?? registration.installing
        if (workerToSkip) {
          workerToSkip.postMessage({ type: 'SKIP_WAITING' })
        } else {
          // No waiting/installing worker; check for updates and reload to be safe
          await registration.update()
          window.location.reload()
        }
      }
    } catch (error) {
      console.error('Error updating service worker:', error)
    }
  }

  return {
    ...pwaState,
    updateServiceWorker,
  }
}
