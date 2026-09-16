/* Pauzele de masă, examenul teoretic în calendar, și mașina care încape pe
   ecran îngust.                                                              */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const three = require('three');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- mașina încape? ---- */
const incape = (lat, inalt) => { const a = lat / inalt; return Math.max(1.1, a >= 2.4 ? 1 : Math.min(1.6, 2.4 / Math.max(.9, a))) };
[['ecran îngust', 360, 220], ['telefon obișnuit', 390, 200], ['ecran lat', 760, 240]].forEach(([nume, L, H]) => {
  const D = 1 * incape(L, H);
  const C = new three.PerspectiveCamera(30, L / H, .1, 120);
  C.position.set(4.6 * D, 1.85 * Math.pow(D, .75), 4.2 * D);
  C.lookAt(-.5 * (D - 1), .82 * Math.pow(D, .55), 0);
  C.updateMatrixWorld(true);
  // colțurile unei berline: 4,3 m lungime, 1,9 lățime, 1,45 înălțime
  let inCadru = 0, tot = 0;
  [-2.15, 2.15].forEach(x => [-0.95, 0.95].forEach(z => [0, 1.45].forEach(y => {
    const p = new three.Vector3(x, y, z).project(C);
    tot++;
    if (Math.abs(p.x) <= 1 && Math.abs(p.y) <= 1) inCadru++;
  })));
  cer(`mașina încape pe ${nume}`, inCadru === tot,
    `${inCadru} din ${tot} colțuri în cadru, camera la ${(D).toFixed(2)}×`);
});

/* ---- pauzele, pe curat ---- */
const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const i0 = linii.findIndex(l => /^function iasPauze\(/.test(l));
const i1 = linii.findIndex((l, k) => k > i0 && /^function bf\(/.test(l));
const m = {};
new Function('exports', 'Ue', linii.slice(i0, i1).join('\n') + '\n;exports.p = iasPauze; exports.b = b0;')(m, (x) => new Date(x + 'T12:00:00'));

const setari = {
  workDays: [1,2,3,4,5,6,0],
  pauze: [{ id: 'p1', nume: 'Mic dejun', startMin: 600, durata: 20 },
          { id: 'p2', nume: 'Prânz', startMin: 780, durata: 45 },
          { id: 'p3', nume: 'Cafea', startMin: 1020, durata: 15 }],
  blocks: [{ id: 'b1', date: azi, startMin: 900, endMin: 960, note: 'Grădiniță' }],
};
const toate = m.b(setari, azi);
cer('cele trei pauze apar în fiecare zi', toate.filter(x => x.pauza).length === 3,
  toate.filter(x => x.pauza).map(x => x.note).join(', '));
cer('  cu durata pe care le-ai dat-o',
  toate.filter(x => x.pauza).map(x => x.end - x.start).join(',') === '20,45,15',
  '20, 45 și 15 minute');
cer('  și stau lângă blocajele scrise de mână', toate.filter(x => !x.pauza).length === 1,
  'Grădiniță a rămas');
cer('fără pauze stabilite, nimic nu se schimbă',
  m.b({ workDays: [1], blocks: [] }, azi).length === 0);

/* ---- în aplicație ---- */
const students = [{ id: 's1', name: 'Teoretic Ana', lastName: 'Teoretic', firstName: 'Ana',
  includedHours: 8, weeklyLimit: 5, theoryExamDate: azi, payments: [] }];
const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [],
      settings: { ...setari, startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei', blocks: [] },
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
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  cer('pauzele apar barate în calendar',
    /Prânz/.test(text()) && /Mic dejun/.test(text()),
    'hașurate ca orice interval indisponibil');
  cer('examenul teoretic e anunțat în ziua lui',
    /Examen teoretic azi/.test(text()) && /Teoretic Ana/.test(text()));
  cer('  și ziua e marcată în bandă',
    [...doc().querySelectorAll('button[title]')].some(x => /Examen teoretic/.test(x.getAttribute('title'))),
    'chenar mov punctat');

  /* ---- teoreticul se notează din calendar ---- */
  const btn = (re) => [...doc().querySelectorAll('button')].find(x => re.test(x.textContent.trim()));
  cer('teoreticul are butoane de rezultat', !!btn(/^Promovat$/) && !!btn(/^Respins$/),
    'promovat sau respins, din calendar');
  clic(btn(/^Promovat$/));
  await pauza(700);
  const dupa = JSON.parse(d.window.localStorage.getItem('ias:app-data')).students[0];
  cer('  rezultatul se scrie pe elev', dupa.theoryExamResult === 'promovat',
    `teoretic: ${dupa.theoryExamResult}`);
  cer('  și se numără susținerea', Number(dupa.theoryExamAttempts) === 1,
    dupa.theoryExamAttempts + ' susținere');
  cer('  iar în calendar apare izbânda', /teoretic promovat/.test(text()),
    'Teoretic Ana · teoretic promovat');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(38) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
