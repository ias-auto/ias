/* Sortarea după ore rămase arată aceeași cifră ca pe card, există sortare după
   ore efectuate, iar căutarea prinde și numărul de înregistrare.            */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* Trei elevi aleși anume: fiecare are altă combinație de efectuate și
   programate, ca să iasă la iveală dacă sortarea se uită la altă cifră. */
const students = [
  { id: 's1', name: 'Alfa Ana', lastName: 'Alfa', firstName: 'Ana', regNumber: 'CT 05 ANA',
    includedHours: 17, weeklyLimit: 9, payments: [] },   // 13 făcute → 4 rămase
  { id: 's2', name: 'Beta Barbu', lastName: 'Beta', firstName: 'Barbu', regNumber: 'CT66BET',
    includedHours: 15, weeklyLimit: 9, payments: [] },   // 15 făcute → 0 rămase
  { id: 's3', name: 'Gama Cezar', lastName: 'Gama', firstName: 'Cezar', regNumber: 'B 05 GAM',
    includedHours: 17, weeklyLimit: 9, payments: [] },   // 9 făcute, 4 programate → 8 rămase
];
const sessions = [];
const pune = (sid, cate, stare, dOff) => {
  for (let k = 0; k < cate; k++) sessions.push({
    id: sid + stare + k, studentId: sid, date: zi(dOff - k), startMin: 480,
    duration: 90, status: stare, type: 'included',
  });
};
pune('s1', 13, 'completed', -1);
pune('s2', 15, 'completed', -1);
pune('s3', 9, 'completed', -1);
pune('s3', 4, 'scheduled', 3);

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions,
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei' },
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
const scrie = (camp, val) => {
  const set = Object.getOwnPropertyDescriptor(d.window.HTMLInputElement.prototype, 'value').set;
  set.call(camp, val); camp.dispatchEvent(new d.window.Event('input', { bubbles: true }));
};
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
/* citim de pe fiecare card numele și cifra scrisă lângă „rămase" */
/* Luăm cardul întreg — cel care are și numele, și cifra de „rămase" — și
   citim din el în ordinea în care apar pe ecran. */
const cardurile = () => {
  const toate = [...doc().querySelectorAll('div')]
    .filter(x => /rămase/.test(x.textContent) && /(Alfa|Beta|Gama) \w+/.test(x.textContent));
  // păstrăm doar cardurile de sine stătătoare, nu și părinții lor
  const frunze = toate.filter(x => !toate.some(y => y !== x && x.contains(y)));
  return frunze.map(x => {
    const t = x.textContent.replace(/\s+/g, ' ');
    return {
      nume: (t.match(/(Alfa|Beta|Gama) \w+/) || [''])[0],
      ramase: Number((t.match(/(\d+)\s*rămase/) || [0, -1])[1]),
    };
  });
};
const alegeSortare = async (eticheta) => {
  clic([...doc().querySelectorAll('button')].find(x => /^Sortare$/.test(x.textContent.trim())));
  await pauza(600);
  clic([...fata().querySelectorAll('button')].find(x => new RegExp('^' + eticheta + '✓?$').test(x.textContent.trim())));
  await pauza(600);
};

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(800);

  await alegeSortare('Ore rămase');
  const c = cardurile();
  cer('cifrele de pe carduri sunt cele așteptate',
    c.length === 3 && c.every(x => [0, 4, 8].includes(x.ramase)),
    c.map(x => `${x.nume} ${x.ramase}`).join(' · '));
  /* Prima apăsare le pune de la cele mai multe la cele mai puține. Ce contează
     e că ordinea urmează chiar cifrele scrise pe carduri — asta era stricat. */
  const nr = c.map(x => x.ramase);
  cer('sortarea urmează cifrele de pe carduri',
    nr.every((v, k) => k === 0 || nr[k - 1] >= v),
    nr.join(' → '));

  clic([...doc().querySelectorAll('button')].find(x => /Ore rămase/.test(x.textContent.trim())));
  await pauza(600);
  const inv = cardurile().map(x => x.ramase);
  cer('  și se întoarce la a doua apăsare',
    inv.every((v, k) => k === 0 || inv[k - 1] <= v), inv.join(' → '));

  await alegeSortare('Ore efectuate');
  cer('sortarea după ore efectuate există', /Ore efectuate/.test(text()));
  const ef = cardurile().map(x => x.nume);
  cer('  și ordonează după câte au făcut',
    ef.length === 3 && /Beta/.test(ef[0]) && /Gama/.test(ef[2]),
    'Beta 15 → Alfa 13 → Gama 9');

  /* ---- căutarea după număr ---- */
  const camp = [...doc().querySelectorAll('input')].find(x => /Caută nume/.test(x.placeholder || ''));
  cer('câmpul spune că se caută și după număr', /nr\./.test(camp.placeholder), camp.placeholder);
  scrie(camp, 'ct05ana'); await pauza(500);
  cer('găsește după număr, scris legat',
    /Alfa Ana/.test(text()) && !/Beta Barbu/.test(text()), 'ct05ana → CT 05 ANA');
  scrie(camp, 'CT 66'); await pauza(500);
  cer('  și cu spații', /Beta Barbu/.test(text()) && !/Alfa Ana/.test(text()), 'CT 66 → CT66BET');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(40) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
