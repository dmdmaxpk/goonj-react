var CACHE_NAME = 'Goonj';
var urlsToCache = [
  '/'
//   '/home',
//   '/live-tv'
];

// Install a service worker
self.addEventListener('install', event => {
  // activate a worker without waiting
  // self.skipWaiting();

  // Turn off cache
  // event.waitUntil(
  //   caches.keys().then(function(cacheNames) {
  //     return Promise.all(
  //       cacheNames.filter(function(cacheName) {
  //         // Return true if you want to remove this cache,
  //         // but remember that caches are shared across
  //         // the whole origin
  //         return true
  //       }).map(function(cacheName) {
  //         return caches.delete(cacheName);
  //       })
  //     );
  //   })
  // );
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['Goonj'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});