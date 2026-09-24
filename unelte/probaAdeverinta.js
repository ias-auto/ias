/* Anunțul „ședințe obligatorii după adeverință" apare doar cât elevul chiar
   așteaptă o dată de examen.                                                 */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
};
/* Trei elevi, toți cu adeverință eliberată și nicio ședință făcută de atunci:
   se deosebesc doar prin data de examen. */
const students = [
  { id: 's1', name: 'Fara Data', lastName: 'Fara', firstName: 'Data',
    includedHours: 9, weeklyLimit: 5, adeverintaDin: zi(-10), payments: [] },
  { id: 's2', name: 'Are Data', lastName: 'Are', firstName: 'Data',
    includedHours: 9, weeklyLimit: 5, adeverintaDin: zi(-10), examDate: zi(20), examPeriod: 'am', payments: [] },
  { id: 's3', name: 'Data Trecuta', lastName: 'Data', firstName: 'Trecuta',
    includedHours: 9, weeklyLimit: 5, adeverintaDin: zi(-10), examDate: zi(-3), examPeriod: 'am', payments: [] },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions: [], settings }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.scrollBy = () => {};
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

const deschide = async (nume) => {
  const n = [...doc().querySelectorAll('span')].find(x => new RegExp(nume).test(x.textContent) && x.textContent.length < 70);
  clic(n && n.closest('button, [role=button]'));
  await pauza(900);
  const f = fata();
  const t = f ? f.textContent.replace(/\s+/g, ' ') : '';
  return { are: /Ședințe obligatorii după adeverință/.test(t), gasit: !!f };
};

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(800);

  const a = await deschide('Fara Data');
  cer('fără dată de examen, anunțul apare', a.gasit && a.are,
    'încă așteaptă reprogramarea');
  inchide(); await pauza(600);

  const b = await deschide('Are Data');
  cer('cu dată viitoare, anunțul dispare', b.gasit && !b.are,
    'reprogramarea s-a făcut deja');
  inchide(); await pauza(600);

  const c = await deschide('Data Trecuta');
  cer('cu dată trecută, anunțul revine', c.gasit && c.are,
    'examenul a trecut, iar are nevoie de o dată nouă');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(38) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
