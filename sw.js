/* IAS — lucrătorul care ține aplicația pornită și fără internet.
   La fiecare versiune nouă se schimbă numele depozitului de mai jos, vechiul
   depozit se șterge, iar telefonul preia noua versiune la următoarea pornire. */
const CACHE = 'ias-v2.17.9';
const ASSETS = ['./', './index.html', './manifest.json', './icon.png', './icon-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Fișierul de licențe se ia mereu proaspăt din rețea, niciodată din memorie —
  // altfel o prelungire făcută de proprietar n-ar ajunge la telefon. Dacă nu e
  // semnal, cererea eșuează și aplicația se descurcă cu ce știe salvat.
  if (new URL(req.url).pathname.endsWith('licente.json')) {
    e.respondWith(fetch(req));
    return;
  }

  // Pagina în sine: încercăm întâi internetul, ca o versiune nouă urcată de tine
  // să fie preluată imediat; fără semnal, servim ce avem salvat.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Restul (iconițe, manifest): din memorie, rapid, cu împrospătare în fundal.
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
