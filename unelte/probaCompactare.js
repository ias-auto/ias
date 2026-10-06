/* Planul închide golurile în care n-ar încăpea altă ședință: pilda lui — elev
   liber 8–11, o ședință deja pusă manual la 10.                             */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);
const H = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');

/* Mâine: unul poate doar 08:00–11:00, altul are deja ședință la 10:00. */
const MAINE = zi(1);
const students = [
  { id: 's1', name: 'Dimineata Ana', lastName: 'Dimineata', firstName: 'Ana',
    includedHours: 10, weeklyLimit: 7, payments: [],
    availFrom: 480, availTo: 660 },
  { id: 's2', name: 'Fix Barbu', lastName: 'Fix', firstName: 'Barbu',
    includedHours: 10, weeklyLimit: 7, payments: [] },
];
const sessions = [
  { id: 'manual', studentId: 's2', date: MAINE, startMin: 600, duration: 90,
    status: 'scheduled', type: 'included' },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions,
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
  const ziNr = String(Number(MAINE.slice(8)));
  const randuri = [...t.matchAll(/(\w{3}) (\d+) · (\d\d):(\d\d)(Dimineata Ana|Fix Barbu)/g)]
    .filter(x => x[2] === ziNr)
    .map(x => ({ min: Number(x[3]) * 60 + Number(x[4]), cine: x[5] }));
  const ana = randuri.find(x => x.cine === 'Dimineata Ana');

  cer('planul i-a dat o ședință', !!ana, ana ? H(ana.min) : 'niciuna');
  cer('se lipește de ședința pusă de tine', !!ana && ana.min === 510,
    ana ? `${H(ana.min)}–${H(ana.min + 90)}, iar a ta începe la 10:00` : '—');
  cer('  și rămâne în fereastra lui, 08:00–11:00',
    !!ana && ana.min >= 480 && ana.min + 90 <= 660);
  cer('  fără gol irosit între ele',
    !!ana && 600 - (ana.min + 90) === 0, 'zero minute');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(40) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
