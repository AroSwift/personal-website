import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker is available, activate immediately
                newWorker.postMessage({ type: 'SKIP_WAITING' })
                // Reload the page after a short delay
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
              }
            })
          }
        })
        
        // Check for updates periodically
        setInterval(() => {
          registration.update()
        }, 2 * 60 * 1000) // Check every 2 minutes
      })
      .catch(() => {
        // Service Worker registration failed
      })

    // Listen for service worker controller changes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  })
}
