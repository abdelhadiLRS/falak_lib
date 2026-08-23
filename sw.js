/* FALAK PWA SERVICE WORKER — App Shell & Selective Offline Cache */

const CACHE_NAME = 'falak-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.php',
  './style/default/css/falak-tokens.css',
  './style/default/style.css',
  './style/default/js/falak-theme.js',
  './style/default/js/audio-player.js',
  './style/default/js/command-palette.js',
  './style/default/js/bookmarks.js',
  './style/default/js/memorization.js',
  './style/default/js/adhkar.js',
  './style/default/js/dashboard.js',
  './style/default/js/quran.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Network-First for HTML documents and dynamic API requests
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.php') || url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            return cached || caches.match('./');
          });
        })
    );
    return;
  }

  // Cache-First for static assets (CSS, JS, Fonts, Images)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
