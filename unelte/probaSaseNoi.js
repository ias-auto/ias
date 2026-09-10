/* Cele șase de acum: cutia scoasă din fișa elevului, statusul care nu mai
   dispare, rearanjarea ștearsă, meniul browserului oprit, cardul din Finanțe
   schimbat, și notița pe cardul ședinței.                                   */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const src = fs.readFileSync('parti/aplicatie.js', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

cer('rearanjarea a fost ștearsă din cod',
  !/IasRearanjare|iasTinutApasat|IasAnunturi/.test(src)
  && !/Rearanjeaz\\u0103 ziua/.test(src),
  'nici componentă, nici buton');
cer('selecția e oprită pe pagina întreagă',
  /html, body, \[data-skin\] \{[^}]*user-select: none/.test(html)
  && /\[data-skin\] \* \{[^}]*touch-callout: none/.test(html));
cer('  dar câmpurile rămân scriibile',
  /input, textarea, select,[\s\S]{0,300}-webkit-user-select: text/.test(html),
  'input, textarea, select și tot ce e editabil');
cer('cutia de viteze a ieșit din fișa elevului',
  !/label: "Cutie de viteze"/.test(src), 'o dă mașina');
cer('căutarea se închide la fiecare deschidere de fișă',
  /iasCauta\(!1\), iasPuneInit\("\?"\)/.test(src),
  'statusul nu mai dispare');

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }],
  employer: { baseRate: 60, overtimeRate: 70, hoursPerDay: 8, hoursPerSession: 2 },
};
const luna = azi.slice(0, 7);
const students = [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
  includedHours: 20, weeklyLimit: 9, payments: [] }];
const sessions = [
  { id: 'x1', studentId: 's1', date: azi, startMin: 600, duration: 90, status: 'scheduled',
    type: 'included', location: 'Gara', notes: 'de repetat parcarea laterală' },
  ...Array(8).fill(0).map((_, k) => ({
    id: 'y' + k, studentId: 's1', date: luna + '-0' + (k + 1), startMin: 480, duration: 90,
    status: 'completed', type: 'included',
  })),
];

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
const patrate = () => [...(fata() || doc()).querySelectorAll('button')]
  .filter(x => x.getAttribute('aria-pressed') !== null);

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  /* Finanțe: cardul nou */
  clic([...doc().querySelectorAll('nav button')].find(x => /Finanțe/.test(x.textContent)));
  await pauza(800);
  cer('cardul arată munca lunii, nu banii pe suplimentare',
    /Ședințe luna asta/.test(text()) && !/Ore suplimentare\s*\d+\s*lei de încasat/.test(text()),
    (text().match(/Ședințe luna asta\s*[\d /]+/) || ['—'])[0].trim());
  cer('  și cât mai ai până la prag',
    /până la prag|prag atins/.test(text()),
    (text().match(/încă \d+ până la prag|prag atins/) || ['—'])[0]);

  /* Calendar: butonul de rearanjare nu mai există, notița se vede */
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);
  cer('butonul de rearanjare a dispărut', !/Rearanjează ziua/.test(text()));
  cer('notița se vede pe cardul ședinței',
    /de repetat parcarea laterală/.test(text()), 'între nume și status');

  /* Statusul nu mai dispare după ce ai umblat prin căutare */
  clic([...doc().querySelectorAll('button')].find(x => /Test Elev/.test(x.textContent)));
  await pauza(900);
  cer('statusul se vede la prima deschidere', patrate().length === 4,
    patrate().map(x => x.textContent.trim()).join(' · '));
  clic([...fata().querySelectorAll('button')].find(x => /Caută după nume|Test Elev/.test(x.textContent)));
  await pauza(500);
  clic(fata().querySelector('button[aria-label="Închide"]'));
  await pauza(700);
  clic([...doc().querySelectorAll('button')].find(x => /Test Elev/.test(x.textContent)));
  await pauza(900);
  cer('  și la a doua, după ce ai umblat prin căutare', patrate().length === 4,
    patrate().length + ' butoane de status');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(44) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
