/* Cazul Beatricei, pas cu pas, cu cifrele cerute de el.                      */
const fs = require('fs');
const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const l = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const buc = (n) => { const k = l.findIndex(x => new RegExp('^function ' + n + '\\(').test(x));
  if (k < 0) throw new Error('nu găsesc ' + n);
  let j = k + 1; while (j < l.length && !/^(function |var |let |const )/.test(l[j])) j++;
  return l.slice(k, j).join('\n') };
const m = {};
new Function('exports', `
  var si = 90;
  var Da = x => String(x).padStart(2, "0");
  var Se = n => Da(Math.floor(n/60)) + ":" + Da(n%60);
  var ii = s => s.feeTypes || [];
  var ur = n => (n && n.oreTip) === "included" ? "included" : "extra";
  ${buc('Df')}${buc('_f')}${buc('M0')}${buc('Af')}${buc('iasPacheteleLui')}${buc('iasImpartire')}
  exports.imp = iasImpartire; exports.Af = Af; exports.M0 = M0;
`)(m);

const setari = {
  rateTypes: [{ id: 'included', price: 0 }, { id: 'extra', price: 200 }],
  feeTypes: [
    { id: 'p5', name: 'Pachet 5', price: 950, hours: 5, oreTip: 'extra' },
    { id: 'reex', name: 'Reexaminare + 3', price: 850, hours: 3, oreTip: 'extra' },
  ],
};
const ses = [];
const pune = (zile, tip) => zile.forEach(z => ses.push({
  id: tip + z, studentId: 's1', date: z, startMin: 540, status: 'completed', type: tip }));
pune(['2026-07-24', '2026-07-25', '2026-07-27'], 'included');
pune(['2026-07-28', '2026-07-29', '2026-07-30', '2026-07-31', '2026-08-01'], 'extra');
pune(['2026-08-03', '2026-08-04', '2026-08-05'], 'extra');

const plati = [{ id: 'a', date: '2026-07-30', amount: 950 }, { id: 'b', date: '2026-08-01', amount: 600 }];
const vezi = (el, s2) => {
  const t = m.imp(el, s2, setari);
  return { facute: m.Af(s2, el.id), total: t.total, datorie: t.deIncasat - m.M0(el), stare: t.stare };
};

/* 1. acum: 3 incluse, pachet de 5, 3 la bucată — toate plătite */
const e0 = { id: 's1', includedHours: 3, extraHours: 5, fees: { p5: 1 },
  feeLog: [{ feeId: 'p5', date: '2026-07-28' }], payments: plati };
let r = vezi(e0, ses);
cer('acum: 11 din 11, la zi', r.facute === 11 && r.total === 11 && r.datorie === 0,
  `${r.facute} din ${r.total}, datorie ${r.datorie}`);
cer('  cele 3 de la bucată apar plătite',
  ['2026-08-03', '2026-08-04', '2026-08-05'].every(z => r.stare['extra' + z] === 'paid'),
  'nu „de plată"');

/* 2. îi pune pachetul de reexaminare */
const e1 = { ...e0, extraHours: 8, fees: { p5: 1, reex: 1 },
  feeLog: [...e0.feeLog, { feeId: 'reex', date: '2026-10-15' }] };
r = vezi(e1, ses);
cer('+ reexaminare: 11 din 14, datorie 850',
  r.facute === 11 && r.total === 14 && r.datorie === 850,
  `${r.facute} din ${r.total}, datorie ${r.datorie}`);
cer('  cele din august rămân plătite',
  ['2026-08-03', '2026-08-04', '2026-08-05'].every(z => r.stare['extra' + z] === 'paid'),
  'pachetul nou nu le atinge');

/* 3. mai face 10 ședințe — 3 intră în pachet, 7 la bucată */
const ses2 = ses.concat(Array.from({ length: 10 }, (_, k) => ({
  id: 'n' + k, studentId: 's1', date: '2026-10-' + (20 + k), startMin: 540,
  status: 'completed', type: 'extra' })));
r = vezi(e1, ses2);
cer('+ 10 ședințe: 21 din 21, datorie 2.250',
  r.facute === 21 && r.total === 21 && r.datorie === 2250,
  `${r.facute} din ${r.total}, datorie ${r.datorie}`);
cer('  trei dintre ele intră în pachetul de reexaminare',
  Object.keys(r.stare).filter(k => /^n\d/.test(k) && r.stare[k] === 'package').length === 3);

/* 4. îi pune un pachet de 5 peste ședințe deja făcute și neplătite */
const e2 = { ...e1, extraHours: 13, fees: { p5: 2, reex: 1 },
  feeLog: [...e1.feeLog, { feeId: 'p5', date: '2026-10-31' }] };
r = vezi(e2, ses2);
cer('+ pachet de 5 peste ședințe nedecontate: datorie 2.200',
  r.datorie === 2200, `${r.facute} din ${r.total}, datorie ${r.datorie}`);
cer('  cinci dintre cele nedecontate intră în el',
  Object.keys(r.stare).filter(k => /^n\d/.test(k) && r.stare[k] === 'package').length === 8,
  '3 din reexaminare + 5 din pachetul nou');

/* 5. elevul care vine direct pe reexaminare */
const nou = { id: 's1', includedHours: 0, extraHours: 3, fees: { reex: 1 },
  feeLog: [{ feeId: 'reex', date: '2026-10-01' }], payments: [] };
r = vezi(nou, []);
cer('elevul venit direct pe reexaminare: 0 din 3, datorie 850',
  r.facute === 0 && r.total === 3 && r.datorie === 850,
  `${r.facute} din ${r.total}, datorie ${r.datorie}`);

console.log('');
rez.forEach(([s, n, d]) => console.log('  ' + s + ' ' + n.padEnd(48) + (d || '')));
const cazute = rez.filter(x => x[0] === '✕').length;
console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
