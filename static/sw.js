// sw.js - Service Worker 实现
const CACHE_NAME = 'awv-reader-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/reader3.css',
  '/js/reader3.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/manifest.json'
];

// 安装Service Worker
self.addEventListener('install', event => {
  console.log('🛠 Service Worker 安装中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 缓存资源:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Service Worker 安装完成');
        return self.skipWaiting();
      })
  );
});

// 激活Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker 激活中...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑 删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker 激活完成');
      return self.clients.claim();
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  // 音频请求直接通过网络获取，不缓存
  if (event.request.url.includes('.mp3') || event.request.url.includes('audio')) {
    return fetch(event.request);
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 返回缓存或网络请求
        return response || fetch(event.request);
      }
    )
  );
});
