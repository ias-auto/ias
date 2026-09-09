/* Ținutul apăsat nu mai ridică meniul telefonului, dar câmpurile în care scrii
   rămân neatinse. Și cifra din Finanțe își spune numele adevărat.            */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

cer('textul nu se mai selectează în aplicație',
  /\[data-skin\] \{[^}]*user-select: none/.test(html)
  && /-webkit-touch-callout: none/.test(html));
cer('  dar în câmpuri se scrie și se selectează normal',
  /\[data-skin\] input,[\s\S]{0,200}user-select: text/.test(html),
  'input, textarea, select și tot ce e editabil');

/* ---- cifra din Finanțe ---- */
const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 },
              { id: 'extra', name: 'Ore suplimentare', price: 100 }],
};
const luna = azi.slice(0, 7);
// zece ședințe incluse și două suplimentare: suplimentarele fac 200
const sessions = [
  ...Array(10).fill('included'), ...Array(2).fill('extra'),
].map((tip, k) => ({
  id: 'x' + k, studentId: 's1', date: luna + '-0' + (k % 9 + 1), startMin: 480,
  duration: 90, status: 'completed', type: tip,
}));
const students = [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
  includedHours: 20, weeklyLimit: 9,
  // a plătit 1150 lei luna asta
  payments: [{ id: 'p1', date: azi, amount: 1150, collector: 'me' }] }];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions, settings }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
  },
});
const doc = () => d.window.document;
const text = () => doc().body.textContent.replace(/\s+/g, ' ');
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Finanțe/.test(x.textContent)));
  await pauza(800);

  const t = text();
  cer('cifra își spune numele adevărat', /Ore suplimentare\s*200\s*lei de încasat/.test(t),
    (t.match(/Ore suplimentare\s*[\d.]+\s*lei de încasat/) || ['—'])[0]);
  cer('  nu se mai numește „de la elevi"', !/De la elevi 200/.test(t));
  cer('încasările lunii se văd separat', /încasat 1.150 lei/.test(t),
    (t.match(/Detalii de la elevi\s*încasat [\d.]+ lei/) || ['—'])[0]);

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(44) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
