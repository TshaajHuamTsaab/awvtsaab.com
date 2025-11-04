// Basic offline cache for PWA
const CACHE_NAME = 'awv-qishu-cache-v1';
const urlsToCache = [
  'index.html',
  'css/reader3.css',
  'js/reader3.js',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
