/* Zilele cu indisponibilitate se văd din bandă, fără să intri în ele.
   Și căutarea după numărul de înregistrare al dosarului.                    */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const luniSapt = (k) => {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + k);
  return d.toISOString().slice(0, 10);
};

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [
  { id: 's1', name: 'Abdula Sevil', lastName: 'Abdula', firstName: 'Sevil',
    regNumber: '5071183', group: '70', includedHours: 10, weeklyLimit: 5, payments: [] },
  { id: 's2', name: 'Barbu Bianca', lastName: 'Barbu', firstName: 'Bianca',
    regNumber: '4982017', group: '66', includedHours: 10, weeklyLimit: 5, payments: [] },
];
const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  /* Blocajele trebuie puse în săptămâna afișată, altfel n-au cum să apară în
     bandă. Luăm lunea și marțea săptămânii curente. */
  blocks: [
    { id: 'b1', date: luniSapt(0), startMin: 630, endMin: 750, note: 'Grădiniță' },
    { id: 'b2', date: luniSapt(1), allDay: true, note: 'Revizie mașină' },
  ],
  pauze: [{ id: 'p1', nume: 'Prânz', startMin: 780, durata: 45 }],
};

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
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const scrie = (camp, val) => {
  const set = Object.getOwnPropertyDescriptor(d.window.HTMLInputElement.prototype, 'value').set;
  set.call(camp, val); camp.dispatchEvent(new d.window.Event('input', { bubbles: true }));
};
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
/* Semnul „!" stă înaintea numelui zilei, deci filtrul după prima literă rata
   chiar căsuțele marcate. Le luăm după forma lor. */
const casute = () => [...doc().querySelectorAll('button')]
  .filter(x => x.className && /flex-col items-center py-2 rounded-xl border/.test(x.className));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  const c = casute();
  const cuSemn = c.filter(x => /!/.test(x.textContent));
  cer('zilele cu indisponibilitate poartă semn', cuSemn.length === 2,
    `${cuSemn.length} din ${c.length} zile, fără să intri în ele`);
  const titluri = c.map(x => x.getAttribute('title')).filter(Boolean);
  cer('  ziua barată toată se deosebește de un interval',
    titluri.some(x => /zi indisponibilă/.test(x)) && titluri.some(x => /interval indisponibil/.test(x)),
    titluri.join(' | '));
  cer('  pauzele de masă nu marchează toate zilele',
    cuSemn.length < c.length, 'prânzul e în fiecare zi, deci n-ar deosebi nimic');
  const hasurate = c.filter(x => [...x.querySelectorAll('span')]
    .some(y => /repeating-linear-gradient/.test(y.getAttribute('style') || '')));
  cer('  ziua barată toată e hașurată', hasurate.length === 1);

  /* ---- căutarea după numărul dosarului ---- */
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(800);
  const camp = [...doc().querySelectorAll('input')].find(x => /Caută nume/.test(x.placeholder || ''));
  scrie(camp, '5071183'); await pauza(500);
  cer('găsește după numărul dosarului',
    /Abdula Sevil/.test(text()) && !/Barbu Bianca/.test(text()), '5071183 → Abdula Sevil');
  scrie(camp, '4982'); await pauza(500);
  cer('  și după o bucată din el',
    /Barbu Bianca/.test(text()) && !/Abdula Sevil/.test(text()), '4982 → Barbu Bianca');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(42) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
