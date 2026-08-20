const fs = require('fs');
const src = fs.readFileSync('/home/claude/app.jsx', 'utf8');
const stub = ['Sunrise','Sun','Sunset','Moon'].map(n => `const ${n} = null;`).join('');
// pornim de la constante, nu de la unelte: fmtShort are nevoie de listele de zile
const cod = stub + src.slice(src.indexOf('const RO_MONTHS ='), src.indexOf('function Car3D('));
const f = new Function(cod + 'return { buildSessionMessage, mesajBunVenit, greetName, adresare, studentAccruedDebt, studentOutstanding, sessionPaymentMap, DEFAULT_SETTINGS };')();

const setari = { ...f.DEFAULT_SETTINGS, locations: [{ id: 'l1', name: 'Piața Gării', lat: 44.159812, lng: 28.634765 }] };
const ses = { date: '2026-08-21', startMin: 600, duration: 90, location: 'Piața Gării' };
const baiat = { firstName: 'Andrei Ion', lastName: 'Popescu', name: 'Popescu Andrei Ion', sex: 'm' };
const fata = { firstName: 'Ana Maria', lastName: 'Ionescu', name: 'Ionescu Ana Maria', sex: 'f' };
const neutru = { firstName: 'Alex', lastName: 'Marin', name: 'Marin Alex' };

console.log('MESAJE:');
[['băiat', baiat], ['fată', fata], ['netrecut', neutru]].forEach(([et, st]) => {
  const m = f.buildSessionMessage('created', st, ses, null, setari);
  console.log('  ' + et.padEnd(9) + '→ ' + m.split('\n')[0].slice(0, 52) + '…');
});
console.log('  harta   → ' + f.buildSessionMessage('created', baiat, ses, null, setari).split('\n')[2]);
const anul = f.buildSessionMessage('cancelled', fata, ses, null, setari);
console.log('  anulare → …' + anul.slice(anul.indexOf('Scrie-mi')));

console.log('\nBUN VENIT:');
console.log('  ' + f.mesajBunVenit(fata, { numeleTau: 'Adrian', numeScoala: 'Auto Pontus' }).slice(0, 118) + '…');

console.log('\nBANI — școlarizare 3100 cu 17 ore incluse (achitată la școală) + pachet 950 cu 5 ore:');
const feeTypes = [
  { id: 'scol', name: 'Școlarizare', price: 3100, hours: 17, oreTip: 'included', laScoala: true },
  { id: 'pack', name: 'Pachet 5', price: 950, hours: 5, oreTip: 'extra' },
];
const s2 = { ...setari, feeTypes };
const luna = '2026-08';
const elev = {
  id: 'e1', name: 'Test', includedHours: 17, extraHours: 5, fees: { scol: 1, pack: 1 },
  payments: [{ id: 'p', date: luna + '-01', amount: 3100, collector: 'school' }],
};
// 8 sedinte suplimentare: pachetul acopera 5, restul 3 se taxeaza la 120
const sesiuni = Array.from({ length: 8 }, (_, i) => ({
  id: 'x' + i, studentId: 'e1', date: `${luna}-0${i + 1}`, startMin: 480, status: 'completed', type: 'extra',
}));
const acumulat = f.studentAccruedDebt(elev, sesiuni, s2);
console.log('  acumulat:', acumulat, '(aștept 3100 + 950 + 3×120 = 4410)', acumulat === 4410 ? '✓' : '✕');
console.log('  de plată :', f.studentOutstanding(elev, sesiuni, s2), '(aștept 1310, după plata de 3100)',
  f.studentOutstanding(elev, sesiuni, s2) === 1310 ? '✓' : '✕');
const map = f.sessionPaymentMap(elev, sesiuni, s2);
const din = Object.values(map).filter(v => v === 'package').length;
console.log('  ședințe din pachet:', din, din === 5 ? '✓' : '✕');
