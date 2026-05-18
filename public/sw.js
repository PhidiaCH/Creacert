// ── CreaCert Service Worker ──────────────────
// 策略：
//   HTML          → Network First（確保永遠拿最新 index.html）
//   JS / CSS      → Cache First（Vite 的 hash 檔名保證新版本不衝突）
//   圖片 / 外部   → Network Only（Pexels CDN 不快取）
// ─────────────────────────────────────────────

// ⚠️ 每次部署自動帶入 BUILD_TIME，強制舊 SW 失效
const BUILD_TIME = '__BUILD_TIME__';
const CACHE = `creacert-${BUILD_TIME}`;

self.addEventListener('install', e => {
  // 立刻接管，不等舊 SW 關閉
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll(['/', '/index.html'])
    )
  );
});

self.addEventListener('activate', e => {
  // 清除所有舊版 cache
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // 外部資源（Pexels、CDN）→ 直接 Network，不快取
  if (!url.origin.startsWith(self.location.origin.split(':').slice(0,2).join(':'))) return;
  if (url.hostname.includes('pexels.com')) return;

  // HTML → Network First（確保每次拿最新版本）
  if (e.request.headers.get('accept')?.includes('text/html') || url.pathname === '/' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // JS / CSS（Vite hash 檔名）→ Cache First
  if (url.pathname.includes('/assets/')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // 其他（manifest、icons 等）→ Network First
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request) || caches.match('/index.html'))
  );
});
