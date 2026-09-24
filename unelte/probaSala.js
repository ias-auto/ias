/* De la a zecea ședință efectuată, elevul e gata de teoretic: steluță pe nume,
   anunț pe Acasă, iar atingerea lui duce drept la Examene. Semnul se stinge
   după ce îi pui data.                                                       */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- pragul, pe curat ---- */
const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const i0 = linii.findIndex(l => /^var IAS_PRAG_TEORETIC/.test(l));
const i1 = linii.findIndex((l, k) => k > i0 && /^function Lf\(/.test(l));
const m = {};
new Function('exports', linii.slice(i0, i1).join('\n') + '\n;exports.f = iasAsteaptaSala;')(m);
const fals = (cate) => Array.from({ length: cate }, () => ({ studentId: 's1', status: 'completed' }));

cer('la nouă ședințe încă nu', m.f({ id: 's1' }, fals(9)) === 0);
cer('la zece, da', m.f({ id: 's1' }, fals(10)) === 10, 'pragul legal');
cer('  contorul urcă mai departe', m.f({ id: 's1' }, fals(14)) === 14, '14 ședințe');
cer('cu data pusă, semnul se stinge',
  m.f({ id: 's1', theoryExamDate: zi(5) }, fals(14)) === 0);
cer('  și dacă l-a luat deja',
  m.f({ id: 's1', theoryExamResult: 'promovat' }, fals(14)) === 0);
cer('elevul retras nu apare', m.f({ id: 's1', withdrawn: !0 }, fals(14)) === 0);
cer('ședințele doar programate nu se pun la socoteală',
  m.f({ id: 's1' }, fals(9).concat([{ studentId: 's1', status: 'scheduled' }])) === 0,
  'contează doar cele efectuate');

/* ---- în aplicație ---- */
const sesiuni = [];
for (let k = 0; k < 12; k++) sesiuni.push({ id: 'x' + k, studentId: 's1', date: zi(-k - 1),
  startMin: 600, duration: 90, status: 'completed', type: 'included' });
sesiuni.push({ id: 'az', studentId: 's1', date: azi, startMin: 600, duration: 90,
  status: 'scheduled', type: 'included', location: 'Gara' });
const students = [
  { id: 's1', name: 'Gata Ana', lastName: 'Gata', firstName: 'Ana', includedHours: 20, weeklyLimit: 5, payments: [] },
  { id: 's2', name: 'Începător Radu', lastName: 'Începător', firstName: 'Radu', includedHours: 20, weeklyLimit: 5, payments: [] },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: sesiuni,
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
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(500);

  cer('anunțul apare pe Acasă', /Gata de teoretic/.test(text()),
    (text().match(/\d+ ședințe efectuate — așteaptă programare la sală/) || ['—'])[0]);
  cer('  scrie câte ședințe are', /12 ședințe efectuate/.test(text()), '12, nu 10');
  cer('  doar cine e gata', !/Începător Radu/.test(text().split('Gata de teoretic')[1] || ''));
  cer('asteriscul e pe numele lui', (text().match(/\*/g) || []).length >= 1,
    'semn de înștiințare, nu stea');

  /* atingi anunțul → fișa, drept la Examene */
  clic([...doc().querySelectorAll('button')].find(x => /așteaptă programare la sală/.test(x.textContent)));
  await pauza(1000);
  const f = fata();
  cer('atingerea deschide fișa elevului', !!f && /Gata Ana/.test(f.textContent));

  /* din fișă, „Editează" duce la formular cu Examene deja desfăcut */
  clic([...fata().querySelectorAll('button')].find(x => /Editeaz/.test(x.textContent)));
  await pauza(1000);
  const g = fata();
  cer('formularul se deschide la Examene',
    !!g && /Practic/.test(g.textContent) && /Teoretic/.test(g.textContent),
    'secțiunea e desfăcută, nu strânsă');
  cer('  rândul Examene poartă asteriscul', !!g && /\* Examene/.test(g.textContent),
    'știi de unde vine semnul');
  cer('  și spune că e gata de teoretic', !!g && /gata de teoretic/.test(g.textContent));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(44) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
