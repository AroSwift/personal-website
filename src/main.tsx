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
        console.log('Service Worker registered with scope:', registration.scope)
        
        // Check for updates periodically
        setInterval(() => {
          registration.update()
        }, 2 * 60 * 1000) // Check every 2 minutes
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error)
      })
  })
}
