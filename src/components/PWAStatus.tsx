import React from 'react'
import { usePWA } from '../lib/usePWA'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

export function PWAStatus() {
  const { isOnline, hasUpdate, isStandalone, updateServiceWorker } = usePWA()

  if (isStandalone) {
    return null // Don't show PWA status when running as standalone app
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {/* Offline Status */}
      {!isOnline && (
        <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg shadow-lg border border-border">
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            Offline Mode
          </Badge>
        </div>
      )}

      {/* Update Available */}
      {hasUpdate && (
        <div className="bg-card text-card-foreground p-4 rounded-lg shadow-lg max-w-sm border border-border">
          <h3 className="font-semibold mb-2">Update Available</h3>
          <p className="text-sm mb-3 text-muted-foreground">
            A new version is available. Update to get the latest features.
          </p>
          <Button
            onClick={updateServiceWorker}
            size="sm"
            variant="default"
          >
            Update Now
          </Button>
        </div>
      )}
    </div>
  )
}
