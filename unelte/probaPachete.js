/* Un pachet cu ore suplimentare acoperă ședințele de la ziua în care l-ai pus
   încolo — nu pe cele vechi, deja plătite.                                   */
const fs = require('fs');

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* Scoatem socoteala din aplicație și o chemăm cu cifrele din cazul lui. */
const src = fs.readFileSync('parti/aplicatie.js', 'utf8');
const linii = src.split('\n');
const bucata = (nume) => {
  const k = linii.findIndex(l => new RegExp('^function ' + nume + '\\(').test(l));
  if (k < 0) return '';
  let j = k + 1;
  while (j < linii.length && !/^(function |var |let |const )/.test(linii[j])) j++;
  return linii.slice(k, j).join('\n');
};
const ctx = {};
new Function('exports', `
  var si = 90;
  var Da = x => String(x).padStart(2, "0");
  var Se = n => Da(Math.floor(n / 60)) + ":" + Da(n % 60);
  var Be = () => "2026-10-08";
  var ii = s => s.rateTypes || [];
  var ur = n => (n && n.oreTip) === "included" ? "included" : "extra";
  ${bucata('Df')}
  ${bucata('_f')}
  ${bucata('M0')}
  ${bucata('iasPacheteleLui')}
  ${bucata('jA')}
  exports.j = jA;
`)(ctx);

const setari = {
  rateTypes: [
    { id: 'extra', name: 'Ore suplimentare', price: 200, oreTip: 'extra' },
    { id: 'reexam3', name: 'Reexaminare cu 3 ședințe', price: 850, hours: 3, oreTip: 'extra' },
  ],
};

/* Cazul din poză: două pachete de reexaminare. Primul, în august. Al doilea,
   azi. În august a avut patru ședințe suplimentare — trei din pachet, una
   plătită. Acum are cinci programate. */
const sesiuni = [
  ...['2026-08-01', '2026-08-03', '2026-08-05', '2026-08-06']
    .map((d, k) => ({ id: 'v' + k, studentId: 's1', date: d, startMin: 810, status: 'completed', type: 'extra' })),
  ...['2026-10-09', '2026-10-10', '2026-10-12', '2026-10-14', '2026-10-15']
    .map((d, k) => ({ id: 'n' + k, studentId: 's1', date: d, startMin: 900, status: 'pending', type: 'extra' })),
];
const elev = {
  id: 's1',
  fees: { reexam3: 2 },
  feeLog: [{ feeId: 'reexam3', date: '2026-07-28' }, { feeId: 'reexam3', date: '2026-10-08' }],
  payments: [{ id: 'p1', date: '2026-08-06', amount: 1050 }],
};

const harta = ctx.j(elev, sesiuni, setari);
const noi = sesiuni.slice(4).map(x => harta[x.id]);
const vechi = sesiuni.slice(0, 4).map(x => harta[x.id]);

cer('în august: trei din pachet, una plătită',
  vechi.filter(x => x === 'package').length === 3 && vechi.filter(x => x === 'package').length + 1 === 4,
  vechi.join(', '));
cer('acum: trei din pachet, două de plată',
  noi.filter(x => x === 'package').length === 3 && noi.filter(x => x === 'due').length === 2,
  noi.join(', '));
cer('  adică 850 + 2 × 200 = 1.250 lei pentru runda asta',
  noi.filter(x => x === 'due').length * 200 + 850 === 1250,
  '850 + 400');

/* Fără jurnal de zile — elevii de dinainte — nimic nu se schimbă. */
const elevVechi = { id: 's1', fees: { reexam3: 2 }, payments: [{ id: 'p1', date: '2026-08-06', amount: 1050 }] };
const harta2 = ctx.j(elevVechi, sesiuni, setari);
cer('elevii de dinainte se socotesc ca înainte',
  sesiuni.slice(0, 6).every(x => harta2[x.id] === 'package'),
  'primele șase ședințe rămân din pachet');

/* Un pachet pus azi nu acoperă ședințe de ieri. */
const elevUnul = {
  id: 's1', fees: { reexam3: 1 },
  feeLog: [{ feeId: 'reexam3', date: '2026-10-08' }], payments: [],
};
const harta3 = ctx.j(elevUnul, sesiuni, setari);
cer('pachetul de azi nu plătește ședințele din august',
  sesiuni.slice(0, 4).every(x => harta3[x.id] !== 'package'),
  'ele rămân cum erau');
cer('  dar acoperă trei dintre cele de acum',
  sesiuni.slice(4).filter(x => harta3[x.id] === 'package').length === 3);

console.log('');
rez.forEach(([s, n, d]) => console.log('  ' + s + ' ' + n.padEnd(46) + (d || '')));
const cazute = rez.filter(r => r[0] === '✕').length;
console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
