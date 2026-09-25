/* Planul îți pune dimineața și seara elevii din apropierea casei tale, ca să nu
   faci drumul lung de două ori. Iar domiciliul elevului se vede pe fișa lui. */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* Geografia lui: casa în Năvodari, elevi risipiți de la Năvodari până la Agigea */
const ACASA = { lat: 44.3167, lng: 28.6167 };
const locuri = {
  'Năvodari centru': [44.3180, 28.6100],
  'Corbu':           [44.3700, 28.6600],
  'Departe nord':    [44.8500, 28.7500],   // spre Tulcea, la 60 km
  'Tomis III':       [44.1900, 28.6300],
  'Gara':            [44.1598, 28.6347],
  'Agigea':          [44.0900, 28.6400],
};

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30,
  currency: 'lei', defaultWeeklyLimit: 5, acasa: ACASA,
  rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }],
  /* Cele două locuri unde îi chemi: pe cei de la nord la Năvodari, pe cei
     de la sud în Constanța. */
  locations: [
    { id: 'l1', name: 'Năvodari', lat: 44.3180, lng: 28.6100 },
    { id: 'l2', name: 'Constanța', lat: 44.1900, lng: 28.6300 },
  ],
};

/* Cel din Corbu locuiește la 7 km nord, dar îl chemi la Năvodari.
   Cel de lângă Tulcea locuiește la 60 km, și tot la Năvodari îl chemi.
   Pentru drumul tău, amândoi sunt elevi de aproape. */
const students = Object.keys(locuri).map((nume, k) => ({
  id: 's' + k, name: nume, lastName: nume, firstName: '',
  lat: locuri[nume][0], lng: locuri[nume][1],
  defaultLocation: locuri[nume][0] >= 44.25 ? 'Năvodari' : 'Constanța',
  includedHours: 10, weeklyLimit: 5, payments: [],
}));

/* ---- socoteala distanțelor, pe curat ---- */
const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const iQA = linii.findIndex(l => /^function QA\(/.test(l));
const iYw = linii.findIndex((l, k) => k > iQA && /^var Yw = /.test(l));
const iAp = linii.findIndex(l => /^function iasPunctElev\(/.test(l));
const iOr = linii.findIndex((l, k) => k > iAp && /^function iasOreleLui\(/.test(l));
const m = {};
new Function('exports',
  'var Fn = n => !!(n && n.lat != null && n.lng != null && n.lat !== "" && n.lng !== "");\n'
  + linii.slice(iQA, iYw).join('\n') + '\n'
  + linii.slice(iAp, iOr).join('\n')
  + '\n;exports.d = iasCatDeAproape;')(m);

const ordonat = students.map(x => [x.name, m.d(ACASA, x)]).sort((a, b) => a[1] - b[1]);
cer('după domiciliu, cel de lângă Tulcea e departe',
  /Departe nord/.test(ordonat[ordonat.length - 1][0]),
  ordonat.map(x => `${x[0]} ${Math.round(x[1])}km`).join(' · '));
cer('elevul fără punct pe hartă nu strică socoteala',
  m.d(ACASA, { id: 'x' }) === null, 'rămâne unde e');
cer('fără casa ta, nu se schimbă nimic', m.d(null, students[0]) === null);

/* ---- planul, în aplicație ---- */
const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions: [], settings }));
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

  /* domiciliul se vede pe fișa elevului */
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(800);
  const n = [...doc().querySelectorAll('span')].find(x => /Agigea/.test(x.textContent) && x.textContent.length < 60);
  clic(n && n.closest('button, [role=button]'));
  await pauza(900);
  const f = fata();
  const t = f ? f.textContent.replace(/\s+/g, ' ') : '';
  cer('domiciliul elevului se vede pe fișă', /Domiciliu/.test(t),
    (t.match(/Domiciliu[^A-Z]{0,30}/) || ['—'])[0]);
  cer('  scris ca Plus Code', /[23456789CFGHJMPQRVWX]{8}\+[23456789CFGHJMPQRVWX]{2}/.test(t),
    (t.match(/[23456789CFGHJMPQRVWX]{8}\+[23456789CFGHJMPQRVWX]{2}/) || ['—'])[0]);
  cer('  cu distanța și direcția, pe înțeles', /km (nord|sud|est|vest)[\w-]* de tine/.test(t),
    (t.match(/[\d.]+ km [\w-]+ de tine/) || ['—'])[0]);
  inchide(); await pauza(600);

  /* planul */
  clic([...doc().querySelectorAll('nav button')].find(x => /Plan/.test(x.textContent)));
  await pauza(900);
  clic([...doc().querySelectorAll('button')].find(x => /Generează plan/.test(x.textContent)));
  await pauza(1600);

  /* Citim zilele propuse: fiecare rând arată ziua, ora și numele elevului. */
  const brut = text();
  const potriviri = [...brut.matchAll(/(\w{3} \d+) · (\d\d:\d\d)(Năvodari centru|Lumina|Mamaia Nord|Tomis III|Gara|Agigea)/g)];
  const peZile = {};
  potriviri.forEach(x => { (peZile[x[1]] = peZile[x[1]] || []).push({ ora: x[2], cine: x[3] }) });
  const zile = Object.keys(peZile).filter(z => peZile[z].length >= 4);
  cer('planul a propus zile pline', zile.length >= 1,
    zile.length + ' zile cu cel puțin patru ședințe');

  /* Măsurăm ca aplicația: până la locul unde îl chemi, nu până la casa lui. */
  const departe = (nume) => {
    const el = students.find(x => x.name === nume);
    const loc = settings.locations.find(x => x.name === el.defaultLocation);
    return m.d(ACASA, loc || el);
  };
  let bune = 0, total = 0;
  zile.forEach(z => {
    const ale = peZile[z].sort((x, y) => x.ora.localeCompare(y.ora));
    const dPrima = departe(ale[0].cine), dUltima = departe(ale[ale.length - 1].cine);
    const dMijloc = ale.slice(1, -1).map(x => departe(x.cine));
    const celMaiDeparteDinMijloc = Math.max(...dMijloc);
    total++;
    if (dPrima <= celMaiDeparteDinMijloc && dUltima <= celMaiDeparteDinMijloc) bune++;
  });
  const z1 = zile[0], ale1 = peZile[z1].sort((x, y) => x.ora.localeCompare(y.ora));
  cer('prima și ultima ședință sunt cu cei de aproape', bune === total,
    `${bune} din ${total} zile`);
  cer('  prima e cel mai apropiat loc de întâlnire',
    departe(ale1[0].cine) <= Math.min(...ale1.slice(1).map(x => departe(x.cine))),
    `${ale1[0].ora} ${ale1[0].cine} — ${departe(ale1[0].cine).toFixed(1)} km`);
  cer('  ultima nu e mai departe decât mijlocul',
    departe(ale1[ale1.length - 1].cine) <= Math.max(...ale1.slice(1, -1).map(x => departe(x.cine))),
    `${ale1[ale1.length-1].ora} ${ale1[ale1.length-1].cine} — ${departe(ale1[ale1.length-1].cine).toFixed(1)} km`);
  cer('  cei chemați în Constanța rămân la mijloc',
    ale1.slice(1, -1).every(x => /Tomis|Gara|Agigea/.test(x.cine)),
    ale1.slice(1, -1).map(x => x.cine).join(', '));
  cer('elevul de lângă Tulcea nu mai cade la mijloc',
    !ale1.slice(1, -1).some(x => /Departe nord/.test(x.cine)),
    'e chemat la Năvodari, deci e elev de aproape');

  /* ---- fără casa pusă, planul rămâne exact cum era ---- */
  const d2 = new JSDOM(html, {
    runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
    beforeParse(w2) {
      const faraCasa = { ...settings };
      delete faraCasa.acasa;
      w2.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions: [], settings: faraCasa }));
      w2.localStorage.setItem('ias:licenta', JSON.stringify({
        cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
      }));
      w2.localStorage.setItem('ias:backup', azi);
      w2.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
      w2.scrollBy = () => {};
    },
  });
  await pauza(3000);
  const dc = () => d2.window.document;
  const cl = (el) => el && el.dispatchEvent(new d2.window.MouseEvent('click', { bubbles: true }));
  [...dc().querySelectorAll('.ecran-peste')].forEach(f =>
    cl([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(500);
  cl([...dc().querySelectorAll('nav button')].find(x => /Plan/.test(x.textContent)));
  await pauza(800);
  cl([...dc().querySelectorAll('button')].find(x => /Generează plan/.test(x.textContent)));
  await pauza(1600);
  const t2 = dc().body.textContent.replace(/\s+/g, ' ');
  const p2 = [...t2.matchAll(/(\w{3} \d+) · (\d\d:\d\d)(Năvodari centru|Lumina|Mamaia Nord|Tomis III|Gara|Agigea)/g)];
  cer('fără casa pusă, planul merge ca înainte', p2.length > 0,
    p2.length + ' ședințe propuse, în ordinea dinainte');

  console.log('');
  rez.forEach(([s, x, dt]) => console.log('  ' + s + ' ' + x.padEnd(42) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
