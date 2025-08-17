const CACHE_VERSION = 'v2-' + new Date().toISOString().split('T')[0] // Daily cache busting
const CACHE_NAME = `aaron-barlow-${CACHE_VERSION}`
const STATIC_CACHE = `static-cache-${CACHE_VERSION}`
const DYNAMIC_CACHE = `dynamic-cache-${CACHE_VERSION}`
const MAX_CACHE_AGE = 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds

// Files to cache immediately - these will be dynamically populated from manifest
let STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/robots.txt',
  '/profile-aaron-400.webp',
  '/profile-aaron-800.webp',
  '/presentations/cug-2025-hpc-system-management.pdf',
  '/presentations/nlit-2024-devops-hpc.pdf',
  '/icons/favicon.ico',
  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png',
  '/icons/favicon-48x48.png',
  '/icons/apple-touch-icon.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
]

// Install event - cache static files
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      try {
        const response = await fetch('/manifest.json')
        const manifestPWA = await response.json()

        const iconsFromPWA = manifestPWA.icons.map(icon => icon.src)
        STATIC_FILES = STATIC_FILES.filter(file => !file.startsWith('/icons/'))
        STATIC_FILES = [...STATIC_FILES, ...iconsFromPWA]

        const cache = await caches.open(STATIC_CACHE)
        await cache.addAll(STATIC_FILES)
        self.skipWaiting()
      } catch {
        // Service Worker: Error caching static files from manifest
      }
    })()
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete all old caches (not just specific ones)
            if (!cacheName.includes(CACHE_VERSION)) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  // Handle different types of requests
  if (url.pathname === '/' || url.pathname.endsWith('.html')) {
    // HTML files - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE))
  } else if (url.pathname.match(/\.(js|css|tsx|ts)$/)) {
    // Static assets - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE))
  } else if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)) {
    // Images - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE))
  } else if (url.pathname.match(/\.pdf$/)) {
    // PDFs - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE))
  } else if (url.pathname.match(/\.(woff|woff2|ttf|eot)$/)) {
    // Fonts - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE))
  } else {
    // API calls and other requests - network first, then cache
    event.respondWith(networkFirst(request, DYNAMIC_CACHE))
  }
})

// Cache first strategy with age checking
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      // Check cache age
      const cacheTime = cachedResponse.headers.get('sw-cache-time')
      if (cacheTime) {
        const age = Date.now() - parseInt(cacheTime)
        if (age > MAX_CACHE_AGE) {
          // Cache expired, try to fetch fresh content
          try {
            const networkResponse = await fetch(request)
            if (networkResponse.ok) {
              const cache = await caches.open(cacheName)
              const responseClone = networkResponse.clone()
              // Add cache timestamp
              const headers = new Headers(responseClone.headers)
              headers.set('sw-cache-time', Date.now().toString())
              const newResponse = new Response(responseClone.body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: headers,
              })
              cache.put(request, newResponse)
              return networkResponse
            }
          } catch {
            // Network failed, using expired cache
          }
        }
      }
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      const responseClone = networkResponse.clone()
      // Add cache timestamp
      const headers = new Headers(responseClone.headers)
      headers.set('sw-cache-time', Date.now().toString())
      const newResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers,
      })
      cache.put(request, newResponse)
    }
    return networkResponse
  } catch {
    return new Response('Network error', { status: 503 })
  }
}

// Network first strategy with age checking
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      const responseClone = networkResponse.clone()
      // Add cache timestamp
      const headers = new Headers(responseClone.headers)
      headers.set('sw-cache-time', Date.now().toString())
      const newResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers,
      })
      cache.put(request, newResponse)
    }
    return networkResponse
  } catch {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      // Check cache age for fallback
      const cacheTime = cachedResponse.headers.get('sw-cache-time')
      if (cacheTime) {
        const age = Date.now() - parseInt(cacheTime)
        if (age > MAX_CACHE_AGE) {
          // Cache expired, but using it as fallback
        }
      }
      return cachedResponse
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html')
    }

    return new Response('Network error', { status: 503 })
  }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Handle any pending offline actions here
  } catch {
    // Service Worker: Background sync failed
  }
}

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Aaron Barlow',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'View Website',
        icon: '/icons/icon-192x192.png',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-192x192.png',
      },
    ],
  }

  event.waitUntil(self.registration.showNotification('Aaron Barlow', options))
})

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'))
  }
})

// Message handling for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }

  if (event.data && event.data.type === 'CLEANUP_CACHE') {
    cleanupOldCaches()
  }
})

// Periodic cache cleanup (runs every hour)
setInterval(
  () => {
    cleanupOldCaches()
  },
  60 * 60 * 1000
) // 1 hour

// Cleanup function to remove old caches
async function cleanupOldCaches() {
  try {
    const cacheNames = await caches.keys()
    const currentDate = new Date().toISOString().split('T')[0]

    for (const cacheName of cacheNames) {
      // Check if cache is older than 2 days
      if (cacheName.includes('aaron-barlow-')) {
        const cacheDate = cacheName.split('-').slice(-1)[0] // Get date part
        if (cacheDate && cacheDate !== currentDate) {
          const cacheDateObj = new Date(cacheDate)
          const daysDiff =
            (Date.now() - cacheDateObj.getTime()) / (1000 * 60 * 60 * 24)

          if (daysDiff > 2) {
            await caches.delete(cacheName)
          }
        }
      }
    }
  } catch {
    // Cache cleanup failed
  }
}
