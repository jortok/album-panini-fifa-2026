const CACHE_NAME = 'panini-tracker-v1';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/sticker-names.js',
  './js/app.js',
  './data/panini-2026-data.json',
  './data/panini-wc-2026-catalog.json',
  './img/World-Cup-2026-Logo.png',
  './img/coca-cola-logo.svg',
  'https://cdn.tailwindcss.com'
];

// Install event - caching core assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate event - cleaning old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - cache first with network fallback
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      
      return fetch(e.request).then((networkResponse) => {
        // Dynamically cache flags or external assets
        if (e.request.url.startsWith('https://flagcdn.com/')) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      }).catch(() => {
        // Offline fallback if fetch fails
      });
    })
  );
});
