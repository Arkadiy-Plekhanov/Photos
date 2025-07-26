// High-performance service worker for aggressive caching
const CACHE_NAME = 'arcadia-photography-v2';
const STATIC_CACHE = 'static-v2';
const IMAGE_CACHE = 'images-v2';

// Critical assets to cache immediately
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
  '/images/services/wedding.jpg',
  '/images/services/real-estate.jpg',
  '/images/services/family.jpg'
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== STATIC_CACHE && 
              cacheName !== IMAGE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache strategy for images
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(request).then((networkResponse) => {
            // Only cache successful responses
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Cache strategy for static assets
  if (url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/)) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
    return;
  }

  // Network first for HTML and API
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});