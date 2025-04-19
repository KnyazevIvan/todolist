/* eslint-env serviceworker */
// Basic service worker

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Optionally, add resources to cache here
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  // Optionally, clean up old caches here
});

self.addEventListener('fetch', (event) => {
  // Basic fetch handler (network first)
  event.respondWith(
    fetch(event.request).catch(() => {
      // Optionally, return a fallback page or resource here
      // For example, if it's an image request:
      // if (event.request.destination === 'image') {
      //   return caches.match('/images/fallback.png');
      // }
    })
  );
});
