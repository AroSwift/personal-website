import { useState, useEffect } from 'react';

interface PWAState {
  isOnline: boolean;
  isInstalled: boolean;
  canInstall: boolean;
  hasUpdate: boolean;
  isStandalone: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePWA() {
  const [pwaState, setPwaState] = useState<PWAState>({
    isOnline: navigator.onLine,
    isInstalled: window.matchMedia('(display-mode: standalone)').matches,
    canInstall: false,
    hasUpdate: false,
    isStandalone: window.matchMedia('(display-mode: standalone)').matches,
  });

  useEffect(() => {
    // Online/offline status
    const handleOnline = () =>
      setPwaState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () =>
      setPwaState(prev => ({ ...prev, isOnline: false }));

    // Service worker updates
    const handleServiceWorkerUpdate = () => {
      setPwaState(prev => ({ ...prev, hasUpdate: true }));
    };

    // Event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Service worker update detection
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Service worker updated
        setPwaState(prev => ({ ...prev, hasUpdate: false }));
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateServiceWorker = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  const checkForUpdates = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.update();
        }
      });
    }
  };

  return {
    ...pwaState,
    updateServiceWorker,
    checkForUpdates,
  };
}
