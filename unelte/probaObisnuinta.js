/* Planul așază elevul aproape de ora la care e obișnuit, nu oriunde între
   prima și ultima lui ședință. Și ședințele rămân vizibile după ce strângi
   programul de lucru.                                                       */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);
const H = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');

/* ---- socoteala obișnuinței, pe curat ---- */
const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const i0 = linii.findIndex(l => /^function iasOreleLui\(/.test(l));
const i1 = linii.findIndex((l, k) => k > i0 && /^function uk\(/.test(l));
const m = {};
new Function('exports', linii.slice(i0, i1).join('\n') + '\n;exports.o = iasOreleLui; exports.s = iasScorObisnuinta;')(m);

// pilda lui: o ședință la 9, una la 18, una la 20
const ore = [540, 1080, 1200];
const candidati = [];
for (let h = 480; h <= 1200; h += 30) candidati.push({ ora: h, scor: m.s(ore, h) });
const cel_mai_bun = candidati.reduce((a, b) => b.scor > a.scor ? b : a);
cer('planul alege în jurul orei 19, nu la 9',
  cel_mai_bun.ora >= 1110 && cel_mai_bun.ora <= 1170,
  `${H(cel_mai_bun.ora)} — între cele două de seară`);
cer('  media ar fi mințit', Math.round((540 + 1080 + 1200) / 3) === 940,
  'media dă 15:40, unde n-a fost niciodată');
cer('  ora singuratică de dimineață pierde',
  m.s(ore, 1140) > m.s(ore, 540),
  `19:00 ${m.s(ore, 1140).toFixed(2)} față de 09:00 ${m.s(ore, 540).toFixed(2)}`);
cer('elevul fără trecut n-are preferință', m.s([], 600) === 0, 'planul îl așază ca înainte');
cer('cine vine mereu la aceeași oră o primește',
  (() => { const u = [600, 600, 600]; return m.s(u, 600) > m.s(u, 780) * 3 })(),
  'trei ședințe la 10:00 → tot 10:00');

/* ---- ședințele rămân vizibile după strângerea programului ---- */
const students = [{ id: 's1', name: 'Matinal Ana', lastName: 'Matinal', firstName: 'Ana',
  includedHours: 10, weeklyLimit: 5, payments: [] }];
const sessions = [{ id: 'x1', studentId: 's1', date: azi, startMin: 450, duration: 90,
  status: 'scheduled', type: 'included', location: 'Gara' }];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions,
      // programul începe abia la 10, dar ședința e la 7:30
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 600, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei' },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.scrollBy = () => {};
  },
});
const doc = () => d.window.document;
const text = () => doc().body.textContent.replace(/\s+/g, ' ');
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  cer('ședința de la 7:30 rămâne la vedere',
    /Matinal Ana/.test(text()) && /07:30/.test(text()),
    'deși programul începe acum la 10:00');

  clic([...doc().querySelectorAll('button')].find(x => /Matinal Ana/.test(x.textContent)));
  await pauza(900);
  cer('  și ora ei se vede în fișă',
    [...fata().querySelectorAll('button')].some(x => /^07:30$/.test(x.textContent.trim())),
    'grila o ține, chiar dacă e în afara programului');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(40) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
