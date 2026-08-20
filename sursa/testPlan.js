// Planificatorul e inima aplicației: îl verificăm separat, pe reguli clare.
const fs = require('fs');
const src = fs.readFileSync('/home/claude/app.jsx', 'utf8');
// iconițele vin din bibliotecă; la test le înlocuim cu nimicuri
const stub = ['Sunrise','Sun','Sunset','Moon'].map(n => `const ${n} = null;`).join('');
// pornim de la constante, nu de la unelte: fmtShort are nevoie de listele de zile
const cod = stub + src.slice(src.indexOf('const RO_MONTHS ='), src.indexOf('function Car3D('));
const f = new Function(cod + `
  return { generatePlan, studentAllowsDay, studentTimeWindow, inTura, DEFAULT_SETTINGS };
`)();

const azi = new Date();
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const maine = iso(new Date(Date.now() + 86400000));

const setari = { ...f.DEFAULT_SETTINGS, workDays: [1,2,3,4,5,6], startMin: 480, endMin: 1200, examStudents: [] };

// 1. prioritatea: cine are examenul mai aproape intra primul
const elevi = [
  { id: 'a', name: 'Fără examen', remaining: 6, weeklyLimit: 7 },
  { id: 'b', name: 'Examen curând', remaining: 6, weeklyLimit: 7, examDate: iso(new Date(Date.now() + 20*86400000)) },
];
let r = f.generatePlan({ students: elevi, existingSessions: [], settings: setari, fromDateISO: maine });
const primul = r.proposals[0];
console.log('1. primul programat:', primul.studentId === 'b' ? 'cel cu examen ✓' : 'GREȘIT');

// 2. limita saptamanala si o singura sedinta pe zi
const unul = [{ id: 'x', name: 'X', remaining: 20, weeklyLimit: 2 }];
r = f.generatePlan({ students: unul, existingSessions: [], settings: setari, fromDateISO: maine });
const peZile = {};
r.proposals.forEach(p => { peZile[p.date] = (peZile[p.date] || 0) + 1; });
const maxPeZi = Math.max(...Object.values(peZile));
const saptamani = {};
r.proposals.forEach(p => {
  const d = new Date(p.date); const zi = (d.getDay()+6)%7; d.setDate(d.getDate()-zi);
  const k = iso(d); saptamani[k] = (saptamani[k]||0)+1;
});
console.log('2. cel mult 1 pe zi:', maxPeZi === 1 ? '✓' : '✕ ('+maxPeZi+')',
  '| cel mult 2 pe săptămână:', Math.max(...Object.values(saptamani)) <= 2 ? '✓' : '✕');

// 3. rezerva de dinaintea examenului: din 5 ore ramase, 3 raman
const rez = [{ id: 'r', name: 'R', remaining: 5, weeklyLimit: 7 }];
r = f.generatePlan({ students: rez, existingSessions: [], settings: setari, fromDateISO: maine });
console.log('3. rezervă păstrată:', r.proposals.length === 2 ? '✓ (2 din 5)' : '✕ ('+r.proposals.length+')');
const rez2 = [{ id: 'r', name: 'R', remaining: 5, weeklyLimit: 7, includeRezerva: true }];
r = f.generatePlan({ students: rez2, existingSessions: [], settings: setari, fromDateISO: maine });
console.log('   cu rezerva cerută:', r.proposals.length === 5 ? '✓ (5 din 5)' : '✕ ('+r.proposals.length+')');

// 4. zilele in care nu poate veni
const marti = [{ id: 'm', name: 'M', remaining: 8, weeklyLimit: 7, availDays: [2] }];
r = f.generatePlan({ students: marti, existingSessions: [], settings: setari, fromDateISO: maine });
const zileGresite = r.proposals.filter(p => new Date(p.date).getDay() !== 2).length;
console.log('4. doar marțea:', zileGresite === 0 ? '✓' : '✕ ('+zileGresite+' greșite)');

// 5. fereastra orara scrisa pe fisa
const dupa = [{ id: 'd', name: 'D', remaining: 8, weeklyLimit: 7, window: { lo: 960, hi: 1050, stated: true } }];
r = f.generatePlan({ students: dupa, existingSessions: [], settings: setari, fromDateISO: maine });
const oreRele = r.proposals.filter(p => p.startMin < 960 || p.startMin > 1050).length;
console.log('5. doar în fereastra 16:00–17:30:', oreRele === 0 ? '✓' : '✕ ('+oreRele+')');

// 6. tura de serviciu
const tura = [{ id: 't', name: 'T', remaining: 8, weeklyLimit: 7, tura: '12-24', turaData: maine, turaOra: 420 }];
r = f.generatePlan({ students: tura, existingSessions: [], settings: setari, fromDateISO: maine });
const inTura = r.proposals.filter(p => f.inTura(tura[0], p.date, p.startMin, 90)).length;
console.log('6. nicio ședință în tură:', inTura === 0 ? '✓' : '✕ ('+inTura+')');

// 7. nu calca peste ce e deja in calendar
const ocupat = [{ id: 'o1', studentId: 'zzz', date: maine, startMin: 480, duration: 90, status: 'scheduled' }];
r = f.generatePlan({ students: [{ id: 'n', name: 'N', remaining: 4, weeklyLimit: 7 }], existingSessions: ocupat, settings: setari, fromDateISO: maine });
const calca = r.proposals.filter(p => p.date === maine && p.startMin < 570 && p.startMin + 90 > 480).length;
console.log('7. nu calcă peste ședințele existente:', calca === 0 ? '✓' : '✕');
