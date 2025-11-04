// sw.js - 简化的 Service Worker
const CACHE_NAME = 'awv-reader-v1';

// 安装Service Worker
self.addEventListener('install', event => {
  console.log('🛠 Service Worker 安装中...');
  event.waitUntil(self.skipWaiting());
});

// 激活Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker 激活中...');
  event.waitUntil(self.clients.claim());
});

// 拦截网络请求 - 不缓存音频文件
self.addEventListener('fetch', event => {
  // 音频请求直接通过网络获取，不缓存
  if (event.request.url.includes('.mp3') || event.request.url.includes('audio')) {
    return fetch(event.request);
  }
  
  // 其他请求使用缓存优先策略
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      }
    )
  );
});
