const CACHE_NAME = 'tools-lapangan-v1';

// 1. Pastikan SEMUA file penting (termasuk CSS/JS) dimasukkan di sini
const urlsToCache = [
  '/Landing-page/',
  '/Landing-page/index.html',
  '/Landing-page/manifest.json'   // Jika menggunakan PWA manifest
];

// Install Service Worker & Simpan Cache
self.addEventListener('install', event => {
  self.skipWaiting(); // Paksa SW baru langsung aktif
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Membuka cache...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Bersihkan Cache Lama Saat Ada Pembaruan (Activate)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Ambil dari Cache, Fallback ke Network, dan Tangani Error Offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // 1. Jika ditemukan di cache, pakai dari cache
        if (cachedResponse) {
          return cachedResponse;
        }

        // 2. Jika tidak ada di cache, coba ambil via network
        return fetch(event.request)
          .then(networkResponse => {
            // Opsional: Bisa langsung masukkan file baru yang di-fetch ke cache
            return networkResponse;
          })
          .catch(() => {
            // 3. Jika network gagal (Offline) & tidak ada di cache
            // Kamu bisa mengembalikan halaman offline standar jika diperlukan
            if (event.request.mode === 'navigate') {
              return caches.match('/Landing-page/index.html');
            }
          });
      })
  );
});
