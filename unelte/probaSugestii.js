/* Apăsarea pe lângă fereastră cere închiderea, iar sugestiile din calendar
   respectă aceleași reguli de disponibilitate ca planul.                    */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const azi = zi(0);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [
  { id: 's1', name: 'Liber Ana', lastName: 'Liber', firstName: 'Ana', includedHours: 8, weeklyLimit: 5, payments: [] },
  { id: 's2', name: 'Plecat Barbu', lastName: 'Plecat', firstName: 'Barbu', includedHours: 8, weeklyLimit: 5,
    plecatDin: azi, plecatPana: zi(3), payments: [] },
  // are ședință ieri și cere pauză de 3 zile: azi nu trebuie propus
  { id: 's3', name: 'Ritm Cezar', lastName: 'Ritm', firstName: 'Cezar', includedHours: 8, weeklyLimit: 5,
    minGapDays: 3, payments: [] },
  // vine doar în zilele pare/impare opuse zilei de azi
  { id: 's4', name: 'Paritate Dan', lastName: 'Paritate', firstName: 'Dan', includedHours: 8, weeklyLimit: 5,
    availParity: (new Date().getDate() % 2 === 0) ? 'odd' : 'even', payments: [] },
];
const sessions = [
  { id: 'x1', studentId: 's3', date: zi(-1), startMin: 540, duration: 90, status: 'completed', type: 'included' },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions,
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei' },
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
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  // deschidem o fereastră și apăsăm pe lângă ea
  clic([...doc().querySelectorAll('nav button')].find(x => /Setări/.test(x.textContent)));
  await pauza(600);
  clic([...doc().querySelectorAll('button')].find(x => /^Elevi noi/.test(x.textContent.trim())));
  await pauza(600);
  const strat = doc().querySelector('.ecran-peste');
  cer('fereastra e deschisă', !!strat);
  const fundal = strat && strat.querySelector('.absolute.inset-0');
  clic(fundal);
  // conturul clipește de două ori; îl prindem imediat, cât e aprins
  const aprins = !!strat && strat.classList.contains('cere-inchidere');
  await pauza(300);
  cer('apăsarea pe lângă aprinde conturul', aprins);
  cer('  și spune ce ai de făcut', /Închide mai întâi fereastra/.test(text()));
  cer('  dar nu închide fereastra', foi().length > 0);
  inchide(); await pauza(500);

  // sugestiile din calendar
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);
  const t = text();
  const propus = (nume) => new RegExp('\\+ ' + nume).test(t);
  cer('cel liber e propus', propus('Liber Ana'),
    (t.match(/Adaugă rapid:[^A-ZȘȚ]*(\+ [^+]{0,40})/) || [])[1] || '');
  cer('cel plecat nu e propus', !propus('Plecat Barbu'));
  cer('cel cu ritm minim nu e propus', !propus('Ritm Cezar'));
  cer('cel din zi nepotrivită nu e propus', !propus('Paritate Dan'));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(34) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
