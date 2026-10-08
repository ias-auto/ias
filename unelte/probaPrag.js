/* Pragul de la care elevul e „gata de teoretic" se schimbă din Setări.       */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- socoteala, pe curat ---- */
const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const i0 = linii.findIndex(l => /^var IAS_PRAG_TEORETIC/.test(l));
const i1 = linii.findIndex((l, k) => k > i0 && /^function Lf\(/.test(l));
const m = {};
new Function('exports', linii.slice(i0, i1).join('\n')
  + '\n;exports.p = iasPragSala; exports.s = iasAsteaptaSala;')(m);

const fals = (cate) => Array.from({ length: cate }, () => ({ studentId: 's1', status: 'completed' }));
cer('din pornire, pragul e zece', m.p({}) === 10 && m.p(null) === 10, 'cât cere legea');
cer('  se poate pune mai jos', m.p({ pragTeoretic: 8 }) === 8);
cer('  și mai sus', m.p({ pragTeoretic: 14 }) === 14);
cer('  dar nu sub unu, nici peste patruzeci',
  m.p({ pragTeoretic: 0 }) === 10 && m.p({ pragTeoretic: 99 }) === 40);

const el = { id: 's1' };
cer('cu pragul la 8, elevul cu 9 ședințe e gata',
  m.s(el, fals(9), { pragTeoretic: 8 }) === 9, 'iar cu zece n-ar fi fost');
cer('  cu pragul la 10, nu încă', m.s(el, fals(9), {}) === 0);
cer('  cu pragul la 14, nici cu douăsprezece',
  m.s(el, fals(12), { pragTeoretic: 14 }) === 0);
cer('data pusă stinge semnul oricât ar fi pragul',
  m.s({ id: 's1', theoryExamDate: zi(5) }, fals(30), { pragTeoretic: 1 }) === 0);

/* ---- în aplicație ---- */
const students = [
  { id: 's1', name: 'Noua Ana', lastName: 'Noua', firstName: 'Ana',
    includedHours: 20, weeklyLimit: 7, payments: [] },
];
const sessions = [];
for (let k = 0; k < 8; k++) sessions.push({ id: 'x' + k, studentId: 's1', date: zi(-k - 2),
  startMin: 600, duration: 90, status: 'completed', type: 'included' });

const porneste = (prag) => new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    const set = { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90,
      stepMin: 30, currency: 'lei' };
    if (prag != null) set.pragTeoretic = prag;
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions, settings: set }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.scrollBy = () => {};
  },
});

(async () => {
  /* Ne uităm la butonul blocului, nu la textul paginii: „gata de teoretic"
     apare și în istoricul de versiuni din cod. */
  const blocul = (dd) => [...dd.window.document.querySelectorAll('button')]
    .find(x => /gata de teoretic/i.test(x.textContent));
  const d1 = porneste(null);
  await new Promise(r => setTimeout(r, 3000));
  cer('cu pragul obișnuit, cel cu opt ședințe nu apare',
    !blocul(d1), 'opt din zece');

  const d2 = porneste(7);
  await new Promise(r => setTimeout(r, 3000));
  cer('cu pragul pus la șapte, apare', !!blocul(d2),
    blocul(d2) ? blocul(d2).textContent.trim() : '—');
  const doc2 = d2.window.document;
  const clic = (el2) => el2 && el2.dispatchEvent(new d2.window.MouseEvent('click', { bubbles: true }));
  clic([...doc2.querySelectorAll('button')].find(x => /gata de teoretic/i.test(x.textContent)));
  await new Promise(r => setTimeout(r, 500));
  const t2b = doc2.body.textContent.replace(/\s+/g, ' ');
  cer('  cu numărul lui adevărat de ședințe', /8 ședințe efectuate/.test(t2b), 'opt, nu șapte');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(44) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
