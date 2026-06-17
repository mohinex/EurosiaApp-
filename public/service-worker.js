const CACHE_NAME = 'eurosia-pwa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/logo.svg',
  '/site.webmanifest',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Eurosia ServiceWorker] Pre-caching core application shell...');
      // Safe addition of caching resources
      return Promise.all(
        ASSETS_TO_CACHE.map((url) => {
          return fetch(new Request(url, { redirect: 'manual' }))
            .then((response) => {
              if (response.status >= 400) {
                console.warn(`[Eurosia ServiceWorker] Skip caching failed url: ${url}`);
                return;
              }
              return cache.put(url, response);
            })
            .catch((err) => {
              console.warn(`[Eurosia ServiceWorker] Fallback mapping file: ${url}`, err);
            });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate Event (Cleanup Old Caches on system upgrading)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Eurosia ServiceWorker] Discarding outdated cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event Caching Strategies
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Exclude API requests from strict offline-first cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone response and cache if valid response code
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If network is absent, return cached state or state from pull
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return JSON indicating connectivity issue
            return new Response(JSON.stringify({ 
              error: "Offline mode active. Using cached operational data.", 
              offlineFallback: true 
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
    return;
  }

  // Assets / Pages mapping Strategy (Stale-While-Revalidate pattern)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch dynamically in background to refresh cache seamlessly
        fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse);
            });
          }
        }).catch(() => null); // Silent suppress when user goes completely off-grid
        
        return cachedResponse;
      }

      return fetch(request).catch(() => {
        // Offline Fallback to master template
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
