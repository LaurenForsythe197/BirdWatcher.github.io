// ========================================
// BirdWatcher Service Worker
// Offline Support & Caching Strategy
// ========================================

const CACHE_NAME = 'birdwatcher-v1';
const urlsToCache = [
  '/BirdWatcher.github.io/',
  '/BirdWatcher.github.io/index.html',
  '/BirdWatcher.github.io/styles.css',
  '/BirdWatcher.github.io/app.js',
  '/BirdWatcher.github.io/screens-identify.js',
  '/BirdWatcher.github.io/screens-other.js',
  '/BirdWatcher.github.io/main-app.js',
  '/BirdWatcher.github.io/manifest.json'
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error('Service Worker: Install error:', err);
      })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and external resources
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if available
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Don't cache non-success responses
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache successful responses (except for external APIs)
          if (event.request.url.includes('/BirdWatcher.github.io/')) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        });
      })
      .catch(() => {
        // Return offline page or cached resource
        console.log('Service Worker: Network request failed for', event.request.url);
        // Could return a cached offline page here
        return new Response('Offline - resource not available', { status: 503 });
      })
  );
});

// Message Event - Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
