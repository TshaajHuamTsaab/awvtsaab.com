// Service Worker for background audio playback
const CACHE_NAME = 'audiobook-player-v2';
const urlsToCache = [
  '/',
  '/css/reader3.css',
  '/js/reader3.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存资源:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // 音频文件使用网络优先策略
  if (event.request.url.includes('.mp3')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
  } else {
    // 其他资源使用缓存优先策略
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  }
});

// Background Sync for audio playback
self.addEventListener('sync', event => {
  if (event.tag === 'background-audio-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Background sync for audio playback');
  // 这里可以添加播放状态同步逻辑
}