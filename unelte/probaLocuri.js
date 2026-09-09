/* Locurile de întâlnire se așază după cât de des le folosești, în amândouă
   formularele. La folosiri egale, rămâne rândul din Setări.                  */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- socoteala, pe curat ---- */
const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const i0 = linii.findIndex(l => /^function iasLocuriDesFolosite\(/.test(l));
const i1 = linii.findIndex((l, k) => k > i0 && /^function /.test(l));
const m = {};
new Function('exports', linii.slice(i0, i1).join('\n') + '\n;exports.f = iasLocuriDesFolosite;')(m);

const locuri = ['Alfa', 'Beta', 'Gama', 'Delta'].map((n, k) => ({ id: 'l' + k, name: n }));
const ses = [
  ...Array(5).fill('Gama'), ...Array(3).fill('Alfa'), 'Delta',
].map((loc, k) => ({ id: 'x' + k, location: loc, status: 'completed' }));

const ordine = m.f(locuri, ses).map(x => x.name);
cer('cel mai folosit urcă în față', ordine[0] === 'Gama',
  ordine.join(' · ') + '   (Gama 5, Alfa 3, Delta 1, Beta 0)');
cer('  cele nefolosite cad la coadă', ordine[3] === 'Beta');
cer('la folosiri egale rămâne rândul din Setări',
  m.f(locuri, []).map(x => x.name).join() === 'Alfa,Beta,Gama,Delta',
  'fără ședințe, ordinea ta');
cer('ședințele anulate nu se pun la socoteală',
  m.f(locuri, [{ location: 'Delta', status: 'cancelled' },
               { location: 'Delta', status: 'cancelled' },
               { location: 'Beta', status: 'completed' }]).map(x => x.name)[0] === 'Beta',
  'Beta, cu o ședință reală, trece de Delta cu două anulate');

/* ---- în aplicație ---- */
const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  locations: locuri,
};
const students = [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
  includedHours: 20, weeklyLimit: 9, payments: [] }];
const sessions = ses.map((x, k) => ({
  ...x, studentId: 's1', date: zi(-30 - k), startMin: 480, duration: 90, type: 'included',
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
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);
  clic([...doc().querySelectorAll('button')].find(x => /Liber/.test(x.textContent)));
  await pauza(900);

  const chipuri = [...fata().querySelectorAll('button')]
    .map(x => x.textContent.trim())
    .filter(x => /^(Alfa|Beta|Gama|Delta)$/.test(x));
  cer('în fișa ședinței, locurile sunt așezate', chipuri[0] === 'Gama',
    chipuri.join(' · '));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(42) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
