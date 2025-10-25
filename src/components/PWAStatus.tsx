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
        <div className="bg-card text-card-foreground p-4 rounded-lg shadow-lg max-w-sm border border-border relative">
          <h3 className="font-semibold mb-2">Update Available</h3>
          <p className="text-sm mb-3 text-muted-foreground">
            Aaron Barlow made some updates!<br />
            Update to get the latest features and information.
          </p>
          <Button onClick={updateServiceWorker} size="sm" variant="default">
            Update Now
          </Button>
        </div>
      )}
    </div>
  )
}
