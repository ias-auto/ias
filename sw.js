/* Service worker: ține aplicația în telefon, ca să pornească fără internet.
   Fișierul de licențe se cere însă mereu de pe rețea — altfel prelungirile
   n-ar ajunge niciodată la om. */
const CACHE = 'ias-v2.35.0';
const FISIERE = ['./', './index.html', './manifest.json', './icon.png', './icon-192.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FISIERE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (chei) {
    return Promise.all(chei.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  if (e.request.url.indexOf('licente.json') !== -1) {
    e.respondWith(fetch(e.request).catch(function () { return new Response('{}', { headers: { 'Content-Type': 'application/json' } }); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function (r) {
    return r || fetch(e.request).then(function (resp) {
      if (resp && resp.status === 200 && resp.type === 'basic') {
        var copie = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copie); });
      }
      return resp;
    }).catch(function () { return caches.match('./index.html'); });
  }));
});
