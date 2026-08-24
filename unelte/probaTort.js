/* Tortul lângă nume, oriunde apare elevul; traseul zilei scos; elevii plecați
   să nu mai fie propuși în calendar.                                        */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');

const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const azi = zi(0);
const nastere = (() => { const d = new Date(); d.setFullYear(d.getFullYear() - 21); return d.toISOString().slice(0, 10); })();

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [
  { id: 's1', name: 'Sarbatorit Ana', lastName: 'Sarbatorit', firstName: 'Ana',
    birthDate: nastere, includedHours: 6, weeklyLimit: 7, payments: [], defaultLocation: 'Piața Gării' },
  { id: 's2', name: 'Plecat Barbu', lastName: 'Plecat', firstName: 'Barbu',
    includedHours: 6, weeklyLimit: 7, plecatDin: azi, plecatPana: zi(3), payments: [] },
];
const sessions = [
  { id: 'x1', studentId: 's1', date: azi, startMin: 600, duration: 90, status: 'scheduled', type: 'included', location: 'Piața Gării' },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions,
      settings: { workDays: [0, 1, 2, 3, 4, 5, 6], startMin: 480, endMin: 1200, currency: 'lei',
        locations: [{ id: 'l1', name: 'Piața Gării', lat: 44.16, lng: 28.63 }] },
    }));
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
const tab = (re) => [...doc().querySelectorAll('nav button')].find(x => re.test(x.textContent));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

// tortul e recunoscut după titlul lui
const torturi = (radacina) => [...(radacina || doc()).querySelectorAll('span[title]')]
  .filter(x => /Azi (împlinește|e ziua)/.test(x.getAttribute('title')));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  cer('Acasă: tort lângă nume', torturi().length > 0, `${torturi().length} torturi`);

  clic(tab(/Calendar/)); await pauza(700);
  const inCalendar = torturi().length;
  cer('Calendar: tort la ședința ei', inCalendar > 0, `${inCalendar} torturi`);
  cer('traseul zilei a dispărut',
    ![...doc().querySelectorAll('a')].some(a => /Traseul zilei/.test(a.textContent)));
  cer('butonul „Următoarea" a rămas', /Următoarea/.test(text()));
  cer('cel plecat nu e propus la adăugare rapidă',
    !/\+ Plecat Barbu/.test(text()),
    (text().match(/Adaugă rapid:[^·]{0,40}/) || ['fără sugestii'])[0]);
  cer('cea disponibilă e propusă', /\+ Sarbatorit Ana/.test(text()) || /Sarbatorit Ana/.test(text()));

  clic(tab(/Elevi/)); await pauza(700);
  cer('Elevi: tort în listă', torturi().length > 0, `${torturi().length} torturi`);

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(38) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
