/* Când cauți elevul, butoanele de status se retrag ca lista să aibă loc.
   Butonul de hartă nu se mai suprapune peste cel de „toate locurile".      */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

cer('câmpul de căutare urcă în capul ecranului',
  /scrollIntoView\(\{ block: "start", behavior: "smooth" \}\)/.test(html));
cer('butonul de hartă nu mai e tras peste cel de deasupra',
  /className: "w-full mt-2 mb-3\.5 py-2\.5 rounded-xl border border-slate-200[^"]*"\s*\}, o\.default\.createElement\(dn/.test(html)
  && !/w-full -mt-2 mb-3\.5 py-2\.5 rounded-xl border border-slate-200/.test(html),
  'marginea negativă a fost scoasă');

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  locations: ['Lukoil TOMIS III','OMV Pescărie','Rompetrol Oxford','Carrefour Năvodari','Scoala 8','Gara']
    .map((n, k) => ({ id: 'l' + k, name: n })),
};
const students = ['Abdula Sevil','Badragan Andrada','Barbu Bianca','Topor Mirela','Tug Omer','Tulea Smaranda']
  .map((n, k) => ({ id: 's' + k, name: n, lastName: n.split(' ')[0], firstName: n.split(' ')[1] || '',
    includedHours: 8, weeklyLimit: 5, payments: [] }));

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions: [], settings }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.scrollBy = () => {}; w.scrollTo = () => {};
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
const patrate = () => [...(fata() || doc()).querySelectorAll('button')]
  .filter(x => x.getAttribute('aria-pressed') !== null);

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);
  clic([...doc().querySelectorAll('button')].find(x => /Liber/.test(x.textContent)));
  await pauza(900);

  cer('statusul se vede la deschidere', patrate().length === 2,
    patrate().map(x => x.textContent.trim()).join(' · '));

  clic([...fata().querySelectorAll('button')].find(x => /Alege elevul/.test(x.textContent)));
  await pauza(600);
  cer('cât cauți elevul, statusul se retrage', patrate().length === 0,
    'lista are tot ecranul');
  const nume = [...fata().querySelectorAll('button')].map(x => x.textContent.trim())
    .filter(x => /Abdula|Badragan|Barbu|Topor|Tug|Tulea/.test(x));
  cer('  se văd elevii', nume.length >= 5, `${nume.length} elevi în listă`);

  clic([...fata().querySelectorAll('button')].find(x => /Topor Mirela/.test(x.textContent)));
  await pauza(600);
  cer('după alegere, statusul revine', patrate().length === 2);
  cer('  și elevul e ales', /Topor Mirela/.test(fata().textContent));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(40) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
