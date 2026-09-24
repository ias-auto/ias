/* Bara de căutare rămâne lipită de marginea de sus când derulezi lista de
   elevi, iar semnul de înștiințare stă în colțul din dreapta sus.            */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

cer('bara de căutare e lipită de sus',
  /className: "sticky z-20 px-4 pt-2 pb-3 -mt-2"/.test(html),
  'rămâne la vedere cât derulezi');
cer('  cu fundal plin, ca numele să nu treacă pe sub ea',
  /background: "var\(--bg\)",\s*\n\s*boxShadow: "0 6px 12px -10px/.test(html));
cer('  și sub marginea de sus a telefonului',
  /top: "calc\(env\(safe-area-inset-top, 0px\)\)"/.test(html));
cer('semnul stă în colțul din dreapta sus',
  /position: "absolute", right: -4, top: -3/.test(html)
  && !/position: "absolute", left: -11, top: 0/.test(html));

/* ---- în aplicație ---- */
const students = [];
const sessions = [];
for (let k = 0; k < 24; k++) {
  students.push({ id: 's' + k, name: 'Elev ' + String(k).padStart(2, '0'),
    lastName: 'Elev', firstName: String(k), includedHours: 20, weeklyLimit: 5, payments: [] });
}
// unul are destule ședințe, ca să poarte semnul
for (let k = 0; k < 12; k++) sessions.push({ id: 'x' + k, studentId: 's3', date: zi(-k - 1),
  startMin: 600, duration: 90, status: 'completed', type: 'included' });

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions,
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
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(800);

  const camp = [...doc().querySelectorAll('input')].find(x => /Caută nume/.test(x.placeholder || ''));
  cer('bara există în fila Elevi', !!camp);
  const bloc = camp && camp.closest('div[class*="sticky"]');
  cer('  e într-un bloc care rămâne sus', !!bloc,
    bloc ? bloc.className : 'nu');
  cer('  sortarea merge odată cu ea',
    !!bloc && /Sortare/.test(bloc.textContent),
    'stau în același bloc, nu se despart');

  const semne = [...doc().querySelectorAll('svg')]
    .filter(x => x.querySelectorAll('line[transform^="rotate"]').length === 6);
  cer('semnul apare pe elevul care e gata', semne.length >= 1,
    semne.length + ' semne cu șase brațe');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(44) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
