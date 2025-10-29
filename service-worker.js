self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('neocalc-v1').then(c =>
      c.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/index.js'
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
