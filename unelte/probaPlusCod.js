/* Plus Code la locații, chenarul mov pentru zilele cu examen, și ferestrele
   care se deschid din punctul atins.                                        */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- decodorul, pe curat ---- */
const src = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const a = src.findIndex(l => /^var IAS_PLUS_ALFABET/.test(l));
const b = src.findIndex(l => /^function QA\(/.test(l));
const m = {};
new Function('exports', src.slice(a, b).join('\n') + '\n;exports.p = iasPlusCod; exports.s = iasPlusScrie; exports.x = Xw;')(m);

cer('vectorul documentat', (() => {
  const r = m.p('8FVC2222+22');
  return r && Math.abs(r.lat - 47) < 0.001 && Math.abs(r.lng - 8) < 0.001;
})(), '8FVC2222+22 → 47.00, 8.00');

const dusIntors = [[44.1598, 28.6347], [44.3167, 28.6167], [-33.8568, 151.2153], [64.1466, -21.9426]]
  .map(([la, ln]) => {
    const c = m.s(la, ln, 10);
    const r = m.p(c.slice(0, 8) + '+' + c.slice(8));
    return Math.hypot(r.lat - la, r.lng - ln) * 111000;
  });
cer('dus-întors pe patru puncte', dusIntors.every(x => x < 15),
  'abatere maximă ' + Math.round(Math.max(...dusIntors)) + ' m');

const scurt = (() => {
  const c = m.s(44.1598, 28.6347, 10);
  const r = m.p(c.slice(4, 8) + '+' + c.slice(8), 44.2, 28.6);
  return r && Math.hypot(r.lat - 44.1598, r.lng - 28.6347) * 111000 < 15;
})();
cer('codul scurt, cu reper apropiat', scurt, 'primele patru semne se completează din Setări');

cer('coordonatele simple merg în continuare', (() => {
  const r = m.x('44.1598, 28.6347');
  return r && Math.abs(r.lat - 44.1598) < 1e-6;
})());
cer('un text oarecare nu trece', m.x('nu e nimic aici') === null);

/* ---- în aplicație ---- */
cer('ferestrele pornesc din punctul atins',
  /transformOrigin: `\$\{IAS_ATINS\.x\}% \$\{IAS_ATINS\.y\}%`/.test(html)
  && /scale\(\.8\) translateY/.test(html));

const students = [
  { id: 's1', name: 'Examen Ana', lastName: 'Examen', firstName: 'Ana',
    includedHours: 5, weeklyLimit: 3, examDate: azi, examPeriod: 'am', payments: [] },
];
const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei',
        locations: [{ id: 'l1', name: 'Gara', lat: 44.1598, lng: 28.6347 }] },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  const zile = [...doc().querySelectorAll('button[title]')]
    .filter(x => /Examen practic/.test(x.getAttribute('title')));
  cer('ziua cu examen are chenar mov', zile.length === 1
    && /violet/.test(zile[0].style.borderColor), zile.length ? zile[0].style.borderColor + ', gros ' + zile[0].style.borderWidth : '—');
  const altele = [...doc().querySelectorAll('.flex.px-3 button')].filter(x => !x.getAttribute('title'));
  cer('  celelalte zile rămân cum erau', altele.every(x => !/violet/.test(x.style.borderColor || '')));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
