// Service Worker for PWA — 이미지 캐시 우선, 페이지 네트워크 우선
const CACHE_VERSION = 'v5';
const CACHE_NAME = `semophone-${CACHE_VERSION}`;

self.addEventListener('install', () => {
  console.log('[SW] Installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/') || url.pathname.includes('/_next/data/')) return;

  // 이미지/폰트 → 캐시 우선 (빠른 로드)
  const isStaticAsset = /\.(jpg|jpeg|png|webp|avif|gif|svg|ico|woff2?|ttf|eot)$/i.test(url.pathname)
    || url.pathname.startsWith('/_next/image');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 나머지 → 네트워크 우선
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => {
          if (cached) return cached;
          if (request.mode === 'navigate') return caches.match('/offline');
        })
      )
  );
});
