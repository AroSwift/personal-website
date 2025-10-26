import React from 'react'
import { usePWA } from '../lib/usePWA'
import { Button } from './ui/button'

export function PWAStatus() {
  const { hasUpdate, isStandalone, updateServiceWorker } = usePWA()

  if (isStandalone) {
    return null // Don't show PWA status when running as standalone app
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {/* Update Available - Only show for app updates */}
      {hasUpdate && (
        <div className="bg-card text-card-foreground p-4 rounded-lg shadow-lg max-w-sm border border-border relative animate-in slide-in-from-bottom">
          <h3 className="font-semibold mb-2">Update Available</h3>
          <p className="text-sm mb-3 text-muted-foreground">
            A new version is available! Click below to update.
          </p>
          <Button
            onClick={() => {
              updateServiceWorker()
              // The page will reload automatically when the new service worker activates
            }}
            size="sm"
            variant="default"
          >
            Update & Reload
          </Button>
        </div>
      )}
    </div>
  )
}
