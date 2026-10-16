/* Situația Beatricei: un pachet pus azi nu mai șterge de la plată ședințe pe
   care le-a achitat deja acum două luni.                                     */
const fs = require('fs');
const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const bucata = (nume) => {
  const k = linii.findIndex(l => new RegExp('^function ' + nume + '\\(').test(l));
  if (k < 0) throw new Error('nu găsesc ' + nume);
  let j = k + 1;
  while (j < linii.length && !/^(function |var |let |const )/.test(linii[j])) j++;
  return linii.slice(k, j).join('\n');
};
const ctx = {};
new Function('exports', `
  var si = 90;
  var Da = x => String(x).padStart(2, "0");
  var Se = n => Da(Math.floor(n / 60)) + ":" + Da(n % 60);
  var ii = s => s.feeTypes || [];
  var ur = n => (n && n.oreTip) === "included" ? "included" : "extra";
  ${bucata('Df')}
  ${bucata('_f')}
  ${bucata('M0')}
  ${bucata('zw')}
  ${bucata('iasPacheteleLui')}
  ${bucata('iasImpartire')}
  ${bucata('Ow')}
  ${bucata('jA')}
  exports.datorie = (el, ses, set) => Ow(el, ses, set) - M0(el);
  exports.acumulat = Ow;
  exports.stare = jA;
`)(ctx);

const setari = {
  rateTypes: [
    { id: 'included', name: 'Ore incluse', price: 0 },
    { id: 'extra', name: 'Ore suplimentare', price: 200 },
  ],
  feeTypes: [
    { id: 'p5', name: 'Pachet 5 ședințe', price: 950, hours: 5, oreTip: 'extra' },
    { id: 'reexam3', name: 'Reexaminare cu 3 ședințe', price: 850, hours: 3, oreTip: 'extra' },
  ],
};

/* Cele trei incluse preluate de la alt instructor, apoi pachetul de 5, apoi
   trei suplimentare plătite separat. */
const ses = [];
const pune = (zile, tip) => zile.forEach((z, k) => ses.push({
  id: tip + k + z, studentId: 's1', date: z, startMin: 540, duration: 90,
  status: 'completed', type: tip,
}));
pune(['2026-07-24', '2026-07-25', '2026-07-27'], 'included');
/* Cinci din pachetul de 950, apoi trei plătite separat cu 600. */
pune(['2026-07-28', '2026-07-30', '2026-07-31', '2026-08-01', '2026-08-02'], 'extra');
pune(['2026-08-03', '2026-08-04', '2026-08-05'], 'extra');

const inaintea = {
  /* Orele suplimentare vin doar din pachete — aplicația nu le umflă singură
     când adaugi o ședință în calendar. */
  id: 's1', includedHours: 3, extraHours: 5,
  pachet: 'p5', fees: { p5: 1 },
  feeLog: [{ feeId: 'p5', date: '2026-07-28' }],
  payments: [
    { id: 'a', date: '2026-07-30', amount: 950 },
    { id: 'b', date: '2026-08-01', amount: 600 },
  ],
};

cer('înainte de pachetul nou, e la zi',
  ctx.datorie(inaintea, ses, setari) === 0,
  `acumulat ${ctx.acumulat(inaintea, ses, setari)}, plătit 1550`);

/* Acum îi pune pachetul de reexaminare, azi. */
const dupa = {
  ...inaintea,
  extraHours: 8,
  fees: { p5: 1, reexam3: 1 },
  feeLog: [...inaintea.feeLog, { feeId: 'reexam3', date: '2026-10-14' }],
};
cer('cu pachetul de reexaminare, datorează 850 — nu 250',
  ctx.datorie(dupa, ses, setari) === 850,
  `${ctx.datorie(dupa, ses, setari)} lei`);
cer('  cele trei ședințe din august rămân plătite',
  ['2026-08-03', '2026-08-04', '2026-08-05']
    .every(z => ctx.stare(dupa, ses, setari)[ses.find(x => x.date === z).id] !== 'package'),
  'pachetul de azi nu se întinde peste ele');
cer('  iar cele din pachetul de 5 rămân din pachet',
  ['2026-07-28', '2026-07-30']
    .every(z => ctx.stare(dupa, ses, setari)[ses.find(x => x.date === z).id] === 'package'));

/* Iar cele trei ședințe noi, făcute după pachet, se acoperă din el. */
const ses2 = ses.concat(['2026-10-20', '2026-10-21', '2026-10-22'].map((z, k) => ({
  id: 'n' + k, studentId: 's1', date: z, startMin: 540, duration: 90,
  status: 'completed', type: 'extra',
})));
cer('ședințele de după pachet se acoperă din el',
  ctx.datorie(dupa, ses2, setari) === 850,
  `tot ${ctx.datorie(dupa, ses2, setari)} lei — cele trei noi intră în pachet`);

/* A patra, peste pachet, se taxează. */
const ses3 = ses2.concat([{ id: 'n4', studentId: 's1', date: '2026-10-23', startMin: 540,
  duration: 90, status: 'completed', type: 'extra' }]);
cer('  a patra, peste pachet, se taxează',
  ctx.datorie(dupa, ses3, setari) === 1050,
  `${ctx.datorie(dupa, ses3, setari)} lei = 850 + 200`);

console.log('');
rez.forEach(([s, n, d]) => console.log('  ' + s + ' ' + n.padEnd(46) + (d || '')));
const cazute = rez.filter(r => r[0] === '✕').length;
console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
