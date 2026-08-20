// Împachetează totul într-un singur index.html: fără fișiere externe, aplicația
// pornește și pe un telefon fără semnal, direct din memoria lui.
const fs = require('fs');
const js = fs.readFileSync('dist.js', 'utf8');
const css = fs.readFileSync('dist.css', 'utf8');
const versiune = (fs.readFileSync('/home/claude/app.jsx', 'utf8').match(/APP_VERSION = '([^']+)'/) || [])[1];

const html = `<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1">
<meta name="theme-color" content="#e9eef6">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="IAS">
<title>IAS · Instructor Auto Sistem</title>
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icon.png">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>${js}</script>
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  });
}
</script>
</body>
</html>`;
fs.writeFileSync('/home/claude/pwa/index.html', html);

const sw = `/* Service worker: ține aplicația în telefon, ca să pornească fără internet.
   Fișierul de licențe se cere însă mereu de pe rețea — altfel prelungirile
   n-ar ajunge niciodată la om. */
const CACHE = 'ias-${versiune}';
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
`;
fs.writeFileSync('/home/claude/pwa/sw.js', sw);
console.log('index.html scris: ' + versiune + ' ' + Math.round(html.length / 1024) + ' KB');
