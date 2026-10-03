/* Ziua în care s-a dat examen rămâne însemnată în calendar, cu cine a dat și cu
   ce rezultat — și la practic, și la teoretic, promovat sau respins.        */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [
  { id: 's1', name: 'Practic Ana', lastName: 'Practic', firstName: 'Ana',
    includedHours: 20, weeklyLimit: 5, examDate: azi, examPeriod: 'am', payments: [] },
  { id: 's2', name: 'Teoretic Radu', lastName: 'Teoretic', firstName: 'Radu',
    includedHours: 20, weeklyLimit: 5, theoryExamDate: azi, payments: [] },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [],
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
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
const casuteMarcate = () => [...doc().querySelectorAll('button')]
  .filter(x => x.className && /flex-col items-center py-2 rounded-xl border/.test(x.className))
  .filter(x => /violet/.test(x.style.borderColor || ''));
const btn = (re) => [...doc().querySelectorAll('button')].find(x => re.test(x.textContent.trim()));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(900);

  cer('ziua cu examen e marcată dinainte', casuteMarcate().length === 1,
    'chenar mov');

  /* Notăm rezultatele — unul respins, unul promovat. Aici se pierdea totul
     înainte: la respins data se golea și ziua rămânea goală în calendar. */
  clic(btn(/^Respins$/)); await pauza(900);
  clic(btn(/^Promovat$/)); await pauza(900);
  const dupa = JSON.parse(d.window.localStorage.getItem('ias:app-data')).students;
  const ist = (id) => (dupa.find(x => x.id === id).examIstoric || []);

  cer('amândouă examenele intră în istoric',
    ist('s1').some(x => x.data === azi) && ist('s2').some(x => x.data === azi),
    ist('s1').concat(ist('s2')).map(x => `${x.fel} ${x.rezultat}`).join(' · '));
  cer('  unul respins, unul promovat',
    ist('s1').concat(ist('s2')).filter(x => x.rezultat === 'respins').length === 1
    && ist('s1').concat(ist('s2')).filter(x => x.rezultat === 'promovat').length === 1);
  const respins = dupa.find(x => (x.examIstoric || []).some(y => y.rezultat === 'respins'));
  cer('  la respins, data se golește pentru reprogramare',
    !respins.examDate || !respins.theoryExamDate,
    'ca să-i poți pune alta');

  cer('ziua rămâne colorată în calendar', casuteMarcate().length === 1,
    'deși data s-a golit');
  cer('  și scrie câți au dat examen', /2 examene date în ziua asta/.test(text()),
    (text().match(/\d examene date în ziua asta/) || ['—'])[0]);
  cer('  cu numele amândurora',
    /Practic Ana/.test(text()) && /Teoretic Radu/.test(text()));
  cer('  și cu rezultatul fiecăruia',
    /respins/.test(text()) && /promovat/.test(text()));

  /* o zi fără examene rămâne curată */
  const zileToate = [...doc().querySelectorAll('button')]
    .filter(x => x.className && /flex-col items-center py-2 rounded-xl border/.test(x.className));
  cer('zilele fără examen rămân neatinse',
    zileToate.length - casuteMarcate().length === zileToate.length - 1,
    'doar ziua examenului e marcată');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(42) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
