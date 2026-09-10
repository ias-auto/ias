/* Fișa elevului, după reașezare: arată altfel, dar nu s-a pierdut nimic.     */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  locations: [{ id: 'l1', name: 'Stație Parcul Gării' }],
  rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }],
  numeleTau: 'Ioan-Adrian Stancu',
};
const students = [{
  id: 's1', name: 'Abdula Sevil', lastName: 'Abdula', firstName: 'Sevil',
  phone: '0771311501', regNumber: 'CT05SEV', group: '70', licenseCategory: 'B',
  includedHours: 3, extraHours: 0, weeklyLimit: 3,
  birthDate: '2004-05-10', enrollDate: '2026-08-15',
  defaultLocation: 'Stație Parcul Gării',
  theoryExamResult: 'promovat', theoryExamAttempts: 1,
  examDate: zi(7), examPeriod: 'am',
  notite: [{ id: 'n1', text: 'Școlarizare în rate', data: '2026-08-15' }],
  payments: [],
}];
const sessions = [
  { id: 'x1', studentId: 's1', date: zi(-20), startMin: 1020, duration: 90, status: 'completed', type: 'included', location: 'City Park' },
  { id: 'x2', studentId: 's1', date: zi(-5), startMin: 1020, duration: 90, status: 'completed', type: 'included', location: 'Kaufland' },
  { id: 'x3', studentId: 's1', date: zi(3), startMin: 630, duration: 90, status: 'scheduled', type: 'included', location: 'Stație Parcul Gării' },
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
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(800);
  const n = [...doc().querySelectorAll('span')].find(x => /Abdula Sevil/.test(x.textContent) && x.textContent.length < 80);
  clic(n && n.closest('button, [role=button]'));
  await pauza(900);
  const f = fata();
  const t = f.textContent.replace(/\s+/g, ' ');

  /* ---- ce e nou ---- */
  cer('antetul are fâșia de drum', !!f.querySelector('svg path[d^="M0 92"]'),
    'desenată, nu o poză');
  cer('cadranul de progres se vede',
    !!f.querySelector('svg circle[stroke-dasharray]'),
    (t.match(/\d+%/) || [])[0] + ' din ' + (t.match(/\d+ \/ \d+/) || [])[0]);
  cer('  arată câte au rămas', /rămase|toate făcute/.test(t),
    (t.match(/\d+ rămase|toate făcute/) || [])[0]);

  /* ---- nimic pierdut ---- */
  const trebuie = [
    ['numele', /Abdula Sevil/], ['numărul de înregistrare', /CT05SEV/],
    ['categoria', /Cat\. B/], ['grupa', /Grupa 70|gr\. 70|70/],
    ['telefonul', /0771311501/],
    ['examenul teoretic', /Examen teoretic/], ['examenul practic', /Examen practic/],
    ['nașterea', /Naștere/], ['înscrierea', /Înscriere/],
    ['locația implicită', /Stație Parcul Gării/],
    ['situația financiară', /Acumulat|Achitat la zi|Datorie/],
    ['notița', /Școlarizare în rate/],
    ['istoricul ședințelor', /Istoric ședințe/],
  ];
  const lipsa = trebuie.filter(([, re2]) => !re2.test(t)).map(([x]) => x);
  cer('nicio informație nu s-a pierdut', lipsa.length === 0,
    lipsa.length ? 'lipsesc: ' + lipsa.join(', ') : `${trebuie.length} verificate`);

  const butoane = [...f.querySelectorAll('button, a')].map(x => x.textContent.trim());
  const actiuni = [
    ['Editează', /Editeaz/], ['Ședință nouă', /Ședință nouă|Ședință/],
    ['Trimite programul', /Trimite programul/],
    ['Transfer instructor', /altui instructor/],
    ['Plătește', /Plătește în avans|Achită/],
  ];
  const fara = actiuni.filter(([, re2]) => !butoane.some(b2 => re2.test(b2))).map(([x]) => x);
  cer('toate acțiunile sunt acolo', fara.length === 0,
    fara.length ? 'lipsesc: ' + fara.join(', ') : actiuni.length + ' butoane');
  cer('  transferul e ultimul, ca acțiune rară',
    butoane.findIndex(x => /altui instructor/.test(x)) > butoane.findIndex(x => /Editeaz/.test(x)));
  cer('  trimiterea programului stă lângă istoric',
    t.indexOf('Trimite programul') > t.indexOf('Istoric ședințe'));

  console.log('');
  rez.forEach(([s, x, dt]) => console.log('  ' + s + ' ' + x.padEnd(38) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
