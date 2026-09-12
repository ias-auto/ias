/* Notițele se văd pe carduri, și în calendar și pe Acasă, inclusiv pe ecran
   îngust. Meniul contextual al browserului nu se mai deschide.              */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

cer('notița nu mai e ascunsă pe telefon',
  !/hidden sm:block flex-1 min-w-0 px-3 self-center/.test(html),
  'regula „sm:" a fost scoasă');
cer('meniul contextual e refuzat pe față',
  /addEventListener\("contextmenu"/.test(html) && /ev\.preventDefault\(\)/.test(html));
cer('  dar nu în câmpurile în care scrii',
  /closest\('input, textarea, select, \[contenteditable="true"\], \.ias-selectabil'\)/.test(html),
  'ca să poți lipi un număr sau un link');

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
};
const students = [
  // primul are notiță pe ședință
  { id: 's1', name: 'Dincă Ionuț Marian', lastName: 'Dincă', firstName: 'Ionuț',
    includedHours: 10, weeklyLimit: 5, payments: [] },
  // al doilea n-are pe ședință, dar are în agenda lui
  { id: 's2', name: 'Zoga Emilia Steluța', lastName: 'Zoga', firstName: 'Emilia',
    includedHours: 10, weeklyLimit: 5, payments: [],
    notite: [{ id: 'n1', text: 'Școlarizare în rate', data: '2026-08-15' },
             { id: 'n2', text: 'Vine cu mașina proprie', data: '2026-09-01' }] },
  // al treilea n-are nicio notiță
  { id: 's3', name: 'Fără Notiță', lastName: 'Fără', firstName: 'Notiță',
    includedHours: 10, weeklyLimit: 5, payments: [] },
];
const sessions = [
  { id: 'x1', studentId: 's1', date: azi, startMin: 540, duration: 90, status: 'scheduled',
    type: 'included', location: 'Celsy', notes: 'de repetat parcarea laterală' },
  { id: 'x2', studentId: 's2', date: azi, startMin: 720, duration: 90, status: 'scheduled',
    type: 'included', location: 'Petrom City' },
  { id: 'x3', studentId: 's3', date: azi, startMin: 900, duration: 90, status: 'scheduled',
    type: 'included', location: 'Lukoil TOMIS III' },
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
    // telefon îngust, 390 de puncte
    Object.defineProperty(w, 'innerWidth', { value: 390, configurable: true });
  },
});
const doc = () => d.window.document;
const text = () => doc().body.textContent.replace(/\s+/g, ' ');
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
const notite = () => [...doc().querySelectorAll('span')]
  .filter(x => /italic/.test(x.getAttribute('style') || '')).map(x => x.textContent.trim());

(async () => {
  await pauza(3000);
  inchide(); await pauza(500);

  cer('notița se vede pe cardul de pe Acasă',
    notite().some(x => /de repetat parcarea laterală/.test(x)),
    notite().join(' | ') || 'niciuna');
  cer('  se vede și notița din agenda elevului',
    notite().some(x => /Vine cu mașina proprie/.test(x)),
    'cea mai nouă din agendă, când ședința n-are a ei');
  cer('  ședința fără nicio notiță rămâne curată', notite().length === 2,
    notite().length + ' notițe pe trei ședințe');

  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);
  cer('notița se vede și în calendar',
    notite().some(x => /de repetat parcarea laterală/.test(x)),
    notite().join(' | ') || 'niciuna');

  /* apăsarea lungă nu mai cheamă meniul browserului */
  const card = [...doc().querySelectorAll('button')].find(x => /Dincă Ionuț/.test(x.textContent));
  const ev = new d.window.Event('contextmenu', { bubbles: true, cancelable: true });
  card.dispatchEvent(ev);
  cer('apăsarea lungă nu mai cheamă meniul', ev.defaultPrevented, 'refuzat');

  const camp = doc().querySelector('input');
  if (camp) {
    const ev2 = new d.window.Event('contextmenu', { bubbles: true, cancelable: true });
    camp.dispatchEvent(ev2);
    cer('  dar în câmpuri poți lipi ca înainte', !ev2.defaultPrevented);
  }

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(40) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
