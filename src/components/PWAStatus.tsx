import React from 'react';
import { usePWA } from '../hooks/usePWA';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function PWAStatus() {
  const { isOnline, hasUpdate, isStandalone, updateServiceWorker } = usePWA();

  if (isStandalone) {
    return null; // Don't show PWA status when running as standalone app
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {/* Offline Status */}
      {!isOnline && (
        <div className="bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-lg">
          <Badge variant="secondary" className="bg-yellow-600">
            Offline Mode
          </Badge>
        </div>
      )}

      {/* Update Available */}
      {hasUpdate && (
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <h3 className="font-semibold mb-2">Update Available</h3>
          <p className="text-sm mb-3">
            A new version is available. Update to get the latest features.
          </p>
          <Button
            onClick={updateServiceWorker}
            size="sm"
            className="bg-white text-green-500 hover:bg-gray-100"
          >
            Update Now
          </Button>
        </div>
      )}
    </div>
  );
}
