/* Disponibilitatea pe zile, verificată pe mesajele adevărate ale elevilor.   */
const fs = require('fs');
const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);
const H = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');

const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const i0 = linii.findIndex(l => /^var IAS_FEL_DISP/.test(l));
const i1 = linii.findIndex((l, k) => k > i0 && /^function bw\(/.test(l));
const m = {};
new Function('exports',
  'var si = 90; function Ue(x){ return new Date(x + "T12:00:00") }\n'
  + linii.slice(i0, i1).join('\n')
  + '\n;exports.f = iasFereastraZi; exports.p = iasPoateAtunci;')(m);

/* zilele săptămânii viitoare, ca să nu depindem de ziua de azi */
const ziCu = (dow) => { const d = new Date(); d.setDate(d.getDate() + ((dow - d.getDay() + 7) % 7 || 7)); return d.toISOString().slice(0, 10); };
const LUNI = ziCu(1), MARTI = ziCu(2), MIERCURI = ziCu(3), JOI = ziCu(4), SAMBATA = ziCu(6), DUMINICA = ziCu(0);

/* --- Mesajul 1: angajată 08:45–17:15, poate după muncă sau sâmbăta --- */
const angajata = {
  availFrom: 1050, availTo: 1200,                    // după muncă, 17:30–20:00
  dispZile: { 6: { fel: 'oricand' }, 0: { fel: 'oricand' } },
};
cer('angajata nu poate la prânz în timpul săptămânii',
  !m.p(angajata, MARTI, 720, 90), 'la 12:00, nu');
cer('  dar poate după muncă', m.p(angajata, MARTI, 1050, 90), 'la 17:30, da');
cer('  iar sâmbăta, oricând', m.p(angajata, SAMBATA, 540, 90), 'la 09:00, da');

/* --- Mesajul 2: luni/marți/joi până la 13:30, miercuri de la 16:30 --- */
const student = {
  dispZile: {
    1: { fel: 'pana', hi: 810 }, 2: { fel: 'pana', hi: 810 },
    3: { fel: 'dupa', lo: 990 }, 4: { fel: 'pana', hi: 810 },
    6: { fel: 'oricand' }, 0: { fel: 'oricand' },
  },
};
cer('lunea se termină la 13:30', m.p(student, LUNI, 720, 90) && !m.p(student, LUNI, 750, 90),
  'la 12:00 da — se încheie fix la 13:30; la 12:30 nu');
cer('  miercurea începe de la 16:30',
  !m.p(student, MIERCURI, 900, 90) && m.p(student, MIERCURI, 990, 90),
  'la 15:00 nu, la 16:30 da');
cer('  joia e ca lunea', m.p(student, JOI, 660, 90) && !m.p(student, JOI, 780, 90));
cer('  weekendul rămâne liber', m.p(student, DUMINICA, 480, 90) && m.p(student, DUMINICA, 1140, 90));

/* --- Mesajul 3: în fiecare zi între 13 și 15, sâmbătă după 13 --- */
const uniform = { availFrom: 780, availTo: 900, dispZile: { 6: { fel: 'dupa', lo: 780 } } };
cer('între 13 și 15 înseamnă o singură ședință',
  m.p(uniform, MARTI, 780, 90) && !m.p(uniform, MARTI, 840, 90),
  'începe la 13:00, nu la 14:00 — n-ar încăpea până la 15:00');
cer('  sâmbăta ține până seara', m.p(uniform, SAMBATA, 1080, 90), 'la 18:00, da');

/* --- Mesajul 4: medicină marți 14:30–16:30 și miercuri 15–17, în rest după 14 --- */
const liceu = {
  availFrom: 840,
  dispZile: { 2: { fel: 'dupa', lo: 990 }, 3: { fel: 'dupa', lo: 1020 } },
};
cer('marțea, după medicină', !m.p(liceu, MARTI, 870, 90) && m.p(liceu, MARTI, 990, 90),
  'la 14:30 nu, la 16:30 da');
cer('  miercurea, mai târziu', !m.p(liceu, MIERCURI, 960, 90) && m.p(liceu, MIERCURI, 1020, 90),
  'la 16:00 nu, la 17:00 da');
cer('  în rest, după liceu', m.p(liceu, JOI, 840, 90) && !m.p(liceu, JOI, 780, 90),
  'la 14:00 da, la 13:00 nu');

/* --- cine n-a spus nimic nu e îngrădit --- */
cer('elevul fără disponibilitate poate oricând',
  m.p({}, LUNI, 480, 90) && m.p({}, LUNI, 1140, 90), 'nu-l îngrădim degeaba');
cer('ziua pe care n-ai atins-o merge pe regula generală',
  m.f({ availFrom: 840, availTo: 1200 }, JOI, 90).lo === 840, 'de la 14:00');
cer('zilele nebifate în „zile disponibile" rămân interzise',
  m.f({ availDays: [6, 0] }, LUNI, 90).fel === 'nu', 'doar weekendul');

/* ---- planul chiar ascultă, nu doar socoteala ---- */
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const elevi = [
  /* exact mesajul 2: luni/marți/joi până la 13:30, miercuri de la 16:30 */
  { id: 's1', name: 'Facultate Ana', lastName: 'Facultate', firstName: 'Ana',
    includedHours: 20, weeklyLimit: 7, payments: [],
    dispZile: { 1: { fel: 'pana', hi: 810 }, 2: { fel: 'pana', hi: 810 },
                3: { fel: 'dupa', lo: 990 }, 4: { fel: 'pana', hi: 810 },
                6: { fel: 'oricand' }, 0: { fel: 'oricand' } } },
  /* mesajul 1: angajată, poate doar după 17:30 în timpul săptămânii */
  { id: 's2', name: 'Angajata Ioana', lastName: 'Angajata', firstName: 'Ioana',
    includedHours: 20, weeklyLimit: 7, payments: [],
    availFrom: 1050, availTo: 1200,
    dispZile: { 6: { fel: 'oricand' }, 0: { fel: 'oricand' } } },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students: elevi, sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90,
        stepMin: 30, currency: 'lei', defaultWeeklyLimit: 7,
        rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }] },
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
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
    clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(500);
  clic([...doc().querySelectorAll('nav button')].find(x => /Plan/.test(x.textContent)));
  await pauza(800);
  clic([...doc().querySelectorAll('button')].find(x => /Generează plan/.test(x.textContent)));
  await pauza(1800);

  const t = doc().body.textContent.replace(/\s+/g, ' ');
  const randuri = [...t.matchAll(/(Lun|Mar|Mie|Joi|Vin|Sâm|Dum) (\d+) · (\d\d:\d\d)(Facultate Ana|Angajata Ioana)/g)]
    .map(x => ({ zi: x[1], ora: x[3], cine: x[4] }));
  cer('planul a propus ședințe', randuri.length >= 6, randuri.length + ' ședințe');

  const ana = randuri.filter(x => x.cine === 'Facultate Ana');
  const gresiteAna = ana.filter(x => {
    const min = Number(x.ora.slice(0, 2)) * 60 + Number(x.ora.slice(3));
    if (/Lun|Mar|Joi/.test(x.zi)) return min > 720;        // peste 12:00 n-ar încăpea până la 13:30
    if (/Mie/.test(x.zi)) return min < 990;                 // înainte de 16:30
    return false;
  });
  cer('elevei cu facultate nu i se dă nicio oră nepotrivită', gresiteAna.length === 0,
    gresiteAna.length
      ? 'greșite: ' + gresiteAna.map(x => x.zi + ' ' + x.ora).slice(0, 5).join(', ')
      : ana.length + ' ședințe, toate în fereastra ei');

  const ioana = randuri.filter(x => x.cine === 'Angajata Ioana');
  const gresiteIoana = ioana.filter(x => {
    const min = Number(x.ora.slice(0, 2)) * 60 + Number(x.ora.slice(3));
    return /Lun|Mar|Mie|Joi|Vin/.test(x.zi) && min < 1050;  // în timpul săptămânii, înainte de 17:30
  });
  cer('angajatei nu i se dă nicio oră în timpul programului', gresiteIoana.length === 0,
    ioana.map(x => x.zi + ' ' + x.ora).slice(0, 5).join(', ') || 'niciuna');

  console.log('');
  rez.forEach(([s2, n2, d2]) => console.log('  ' + s2 + ' ' + n2.padEnd(46) + (d2 || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
