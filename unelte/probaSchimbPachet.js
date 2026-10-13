/* Schimbarea pachetului de școlarizare înlocuiește, nu adună.               */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30,
  currency: 'lei', defaultWeeklyLimit: 3,
  rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }],
  /* Pachetele stau în „feeTypes", nu în „rateTypes" — acolo le caută fișa. */
  feeTypes: [
    { id: 'p15', name: 'Școlarizare 15', price: 2800, hours: 15, oreTip: 'included' },
    { id: 'p17', name: 'Școlarizare integral', price: 3100, hours: 17, oreTip: 'included' },
    { id: 'pscoala', name: 'Pachet la școală', price: 3000, hours: 15, oreTip: 'included', laScoala: true },
  ],
};

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students: [{ id: 's1', name: 'Pachet Ana', lastName: 'Pachet', firstName: 'Ana',
        includedHours: 15, extraHours: 0, weeklyLimit: 3, payments: [],
        pachet: 'p15', fees: { p15: 1 },
        feeLog: [{ feeId: 'p15', date: '2026-09-01' }] }],
      sessions: [], settings,
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
const fata = () => [...doc().querySelectorAll('.sheet-anim')].pop();
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
const elevul = () => JSON.parse(d.window.localStorage.getItem('ias:app-data')).students[0];

const schimbaLa = async (numePachet) => {
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(700);
  const n = [...doc().querySelectorAll('span')].find(x => /Pachet Ana/.test(x.textContent) && x.textContent.length < 60);
  clic(n && n.closest('button, [role=button]'));
  await pauza(900);
  clic([...fata().querySelectorAll('button')].find(x => /Editeaz/.test(x.textContent)));
  await pauza(900);
  /* Capul secțiunii poartă și rezumatul: „Școlarizare15 ședințe". */
  clic([...fata().querySelectorAll('button')].find(x => /^Școlarizare\d/.test(x.textContent.trim())));
  await pauza(600);
  const f = fata();
  const cardul = [...f.querySelectorAll('button')].find(x => new RegExp(numePachet).test(x.textContent));
  if (!cardul) throw new Error('n-am găsit pachetul ' + numePachet + ' — butoane: '
    + [...f.querySelectorAll('button')].map(x => x.textContent.trim().slice(0, 30)).join(' | '));
  clic(cardul);
  await pauza(400);
  clic([...fata().querySelectorAll('button')].find(x => /Salveaz/.test(x.textContent)));
  await pauza(1000);
  [...doc().querySelectorAll('.ecran-peste')].forEach(ff =>
    clic([...ff.querySelectorAll('button')].find(x => /Închide/.test(x.textContent))
      || ff.querySelector('button[aria-label="Închide"]')));
  await pauza(500);
};

(async () => {
  await pauza(3000);
  [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
    clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(500);

  cer('elevul pornește cu pachetul de 15', elevul().includedHours === 15,
    elevul().includedHours + ' ședințe');

  await schimbaLa('Școlarizare integral');
  const dupa = elevul();
  cer('după schimbarea pe 17, are 17 — nu 32', dupa.includedHours === 17,
    dupa.includedHours + ' ședințe');
  cer('  taxa veche s-a retras', !(dupa.fees || {}).p15 && (dupa.fees || {}).p17 === 1,
    JSON.stringify(dupa.fees));
  cer('  și ziua ei din jurnal', (dupa.feeLog || []).filter(x => x.feeId === 'p15').length === 0
    && (dupa.feeLog || []).filter(x => x.feeId === 'p17').length === 1,
    (dupa.feeLog || []).map(x => x.feeId).join(', '));

  await schimbaLa('Pachet la școală');
  const dupa2 = elevul();
  cer('schimbat iar, pe unul de 15 plătit la școală', dupa2.includedHours === 15,
    dupa2.includedHours + ' ședințe');
  cer('  plata la școală s-a adăugat o dată',
    (dupa2.payments || []).filter(x => x.collector === 'school').length === 1,
    (dupa2.payments || []).length + ' plăți');

  await schimbaLa('Școlarizare integral');
  const dupa3 = elevul();
  cer('întors la 17, tot 17', dupa3.includedHours === 17, dupa3.includedHours + ' ședințe');
  cer('  iar plata la școală s-a retras odată cu pachetul',
    (dupa3.payments || []).filter(x => x.collector === 'school').length === 0,
    'nu rămâne o plată pentru un pachet pe care nu-l mai are');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(42) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
