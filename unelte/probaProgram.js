/* Programul de lucru pe zile: de luni până vineri de la 8:30, sâmbăta de la 7.
   Și cifra de pe Acasă arată orele la volan, nu banii pe suplimentare.      */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- socoteala, pe curat ---- */
const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const i0 = linii.findIndex(l => /^function iasProgramZi\(/.test(l));
const i1 = linii.findIndex((l, k) => k > i0 && /^function iasTfCu\(/.test(l));
const brut = linii.slice(i0, i1).join('\n');
const m = {};
new Function('exports', 'Ue', brut + '\n;exports.p = iasProgramZi; exports.t = Tf;')(m, (x) => new Date(x + 'T12:00:00'));

const setari = {
  startMin: 480, endMin: 1200,
  programZile: { 1: { startMin: 510, endMin: 1200 }, 6: { startMin: 420, endMin: 1320 } },
};
const sambata = (() => { const d = new Date(); while (d.getDay() !== 6) d.setDate(d.getDate() + 1); return d.toISOString().slice(0,10) })();
const luni = (() => { const d = new Date(); while (d.getDay() !== 1) d.setDate(d.getDate() + 1); return d.toISOString().slice(0,10) })();
const miercuri = (() => { const d = new Date(); while (d.getDay() !== 3) d.setDate(d.getDate() + 1); return d.toISOString().slice(0,10) })();

const H = (x) => String(Math.floor(x/60)).padStart(2,'0') + ':' + String(x%60).padStart(2,'0');
const pl = m.p(setari, luni), ps = m.p(setari, sambata), pm = m.p(setari, miercuri);
cer('lunea are programul ei', pl.startMin === 510, H(pl.startMin) + '–' + H(pl.endMin));
cer('sâmbăta începe mai devreme și ține mai mult',
  ps.startMin === 420 && ps.endMin === 1320, H(ps.startMin) + '–' + H(ps.endMin));
cer('zilele neatinse merg pe programul de bază',
  pm.startMin === 480 && pm.endMin === 1200, H(pm.startMin) + '–' + H(pm.endMin));
cer('fără program pe zile, nimic nu se schimbă',
  m.p({ startMin: 480, endMin: 1200 }, luni).startMin === 480);

/* ---- în aplicație ---- */
const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  programZile: { 6: { startMin: 420, endMin: 1320 } },
  rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }],
};
const students = [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
  includedHours: 10, weeklyLimit: 5, payments: [] }];
// două ședințe azi: 90 + 90 = 3 ore la volan
const sessions = [480, 600].map((mn, k) => ({
  id: 'x' + k, studentId: 's1', date: azi, startMin: mn, duration: 90,
  status: 'scheduled', type: 'included',
}));

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions, settings }));
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

  cer('pe Acasă apar orele la volan, nu banii',
    /la volan azi/.test(text()) && !/lei elevi/.test(text()),
    (text().match(/\d+h(\d\d)?\s*la volan azi/) || ['—'])[0]);

  clic([...doc().querySelectorAll('nav button')].find(x => /Setări/.test(x.textContent)));
  await pauza(800);
  clic([...doc().querySelectorAll('button')].find(x => /^Program de lucru/.test(x.textContent.trim())));
  await pauza(800);
  const f = fata();
  cer('reglajul pe zile e în Setări', /Ore altfel, pe zile/.test(f.textContent),
    (f.textContent.match(/Ore altfel, pe zile\s*\S+/) || ['—'])[0]);
  clic([...f.querySelectorAll('button')].find(x => /Ore altfel, pe zile/.test(x.textContent)));
  await pauza(500);
  const g = fata();
  cer('  fiecare zi lucrătoare are rândul ei',
    ['Luni','Marți','Miercuri','Joi','Vineri','Sâmbătă','Duminică']
      .filter(x => new RegExp(x).test(g.textContent)).length >= 6,
    'șapte zile');
  cer('  sâmbăta arată orele ei', /07:00/.test(g.textContent) && /22:00/.test(g.textContent),
    '07:00–22:00');
  cer('  restul spun că merg pe programul de bază',
    /ca programul de bază/.test(g.textContent), '08:00–20:00');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(42) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
