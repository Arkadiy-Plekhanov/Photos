
const CACHE_NAME = 'arcadia-photography-v2.1.0';
const STATIC_CACHE = 'static-cache-v2.1.0';
const DYNAMIC_CACHE = 'dynamic-cache-v2.1.0';
const IMAGE_CACHE = 'image-cache-v2.1.0';

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/fonts/css/all.min.css',
  '/fonts/webfonts/fa-solid-900.woff2',
  '/fonts/webfonts/fa-regular-400.woff2',
  '/fonts/webfonts/fa-brands-400.woff2'
];

// Route patterns and their strategies
const ROUTE_STRATEGIES = [
  {
    pattern: /\.(js|css)$/,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cache: STATIC_CACHE
  },
  {
    pattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cache: IMAGE_CACHE
  },
  {
    pattern: /\/api\//,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cache: DYNAMIC_CACHE
  },
  {
    pattern: /\/fonts\//,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cache: STATIC_CACHE
  }
];

// Install event
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old caches
              return cacheName.startsWith('arcadia-photography-') && 
                     cacheName !== CACHE_NAME &&
                     cacheName !== STATIC_CACHE &&
                     cacheName !== DYNAMIC_CACHE &&
                     cacheName !== IMAGE_CACHE;
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Cache cleanup completed');
        return self.clients.claim();
      })
  );
});

// Fetch event with advanced caching strategies
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;
  
  // Find matching strategy
  const matchedStrategy = ROUTE_STRATEGIES.find(route => 
    route.pattern.test(url.pathname)
  );
  
  if (matchedStrategy) {
    event.respondWith(
      handleRequest(event.request, matchedStrategy.strategy, matchedStrategy.cache)
    );
  } else {
    // Default strategy for HTML pages
    event.respondWith(
      handleRequest(event.request, CACHE_STRATEGIES.NETWORK_FIRST, DYNAMIC_CACHE)
    );
  }
});

// Request handling with different strategies
async function handleRequest(request, strategy, cacheName) {
  const cache = await caches.open(cacheName);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cache);
    
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cache);
    
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, cache);
    
    case CACHE_STRATEGIES.NETWORK_ONLY:
      return fetch(request);
    
    case CACHE_STRATEGIES.CACHE_ONLY:
      return cache.match(request);
    
    default:
      return networkFirst(request, cache);
  }
}

// Cache first strategy
async function cacheFirst(request, cache) {
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Offline content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network first strategy
async function networkFirst(request, cache) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return cache.match('/offline.html') || new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    }
    
    throw error;
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request, cache) {
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((error) => {
    console.log('[SW] Network update failed:', error);
  });
  
  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      handleBackgroundSync()
    );
  }
});

async function handleBackgroundSync() {
  console.log('[SW] Background sync triggered');
  // Handle offline form submissions, analytics, etc.
}

// Push notifications (if needed)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        data: data.data
      })
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('[SW] Error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});

console.log('[SW] Service Worker loaded successfully');
