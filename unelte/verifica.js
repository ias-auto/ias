/* Verifică un index.html gata construit: pornește aplicația într-un browser
   simulat și se uită dacă totul e la locul lui. De rulat înainte de fiecare
   urcare pe GitHub.
   Rulare:  node verifica.js [index.html]                                    */

const fs = require('fs');
const { JSDOM } = require('jsdom');

const fisier = process.argv[2] || 'index.html';
const html = fs.readFileSync(fisier, 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const maine = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

const rez = [];
const cer = (nume, ok, detaliu) => rez.push([ok ? '✓' : '✕', nume, detaliu || '']);

// --- 1. verificări asupra fișierului, fără să-l pornim ---
cer('fișierul e întreg', html.startsWith('<!DOCTYPE html>') && html.trim().endsWith('</html>'),
  Math.round(html.length / 1024) + ' KB');
cer('stilul complet', html.includes('--violet:') && html.includes('glow-cadru'));
cer('paleta de culori', ['--ok:', '--bad:', '--info:', '--sky:', '--accent:']
  .every(v => html.includes(v)));
cer('nu cere fișiere din afară',
  !/src=["']https?:\/\/(?!fonts\.googleapis|fonts\.gstatic)/.test(html));

/* Aplicația nu trebuie să se reîncarce singură. O făcea la fiecare versiune
   nouă, iar pe telefon se vedea ca și cum s-ar închide și s-ar redeschide. */
cer('nu se reîncarcă singură', !/location\.reload/.test(html));
cer('lucrătorul de fundal se înregistrează', /serviceWorker\.register/.test(html));

// --- 2. pornim aplicația cu date reale ---
const students = [
  { id: 's1', name: 'Râmbu Ștefan', lastName: 'Râmbu', firstName: 'Ștefan', group: '12', county: 'CT',
    includedHours: 10, extraHours: 2, weeklyLimit: 3, payments: [], birthDate: '2000-05-10' },
  { id: 's2', name: 'Popescu Ana', lastName: 'Popescu', firstName: 'Ana', group: '9', county: 'CT',
    includedHours: 15, extraHours: 0, weeklyLimit: 2, payments: [] },
];
const sessions = [
  { id: 'x1', studentId: 's1', date: azi, startMin: 540, duration: 90, status: 'completed', type: 'included' },
  { id: 'x2', studentId: 's1', date: azi, startMin: 660, duration: 90, status: 'pending', type: 'extra' },
  { id: 'x3', studentId: 's2', date: maine, startMin: 540, duration: 90, status: 'scheduled', type: 'extra' },
];

const erori = [];
const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions,
      settings: { workDays: [0, 1, 2, 3, 4, 5, 6], startMin: 480, endMin: 1200, currency: 'lei' },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31',
      verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.console.error = (...a) => erori.push(a.map(String).join(' ').slice(0, 160));
    w.addEventListener('error', e => erori.push('eroare: ' + e.message));
  },
});

const doc = () => d.window.document;
const text = () => doc().body.textContent.replace(/\s+/g, ' ');
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const tab = (re) => [...doc().querySelectorAll('nav button')].find(x => re.test(x.textContent));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  cer('aplicația pornește', /Bun venit în/.test(text()));

  /* La prima pornire se deschide prezentarea. Cât timp e deschisă, filele nu se
     schimbă — e o măsură voită a aplicației — așa că o închidem întâi. */
  const inchideFerestre = () => {
    [...doc().querySelectorAll('.ecran-peste')].forEach(f => {
      const x = f.querySelector('button[aria-label="Închide"]')
        || [...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent));
      clic(x);
    });
  };
  inchideFerestre();
  await pauza(500);
  cer('prezentarea se închide', !doc().querySelector('.ecran-peste'));
  cer('versiunea', /IAS v[0-9.]+/.test(text()), (text().match(/IAS v[0-9.]+/) || [])[0]);
  cer('cele șase file', ['Acasă', 'Calendar', 'Elevi', 'Plan', 'Finanțe', 'Setări']
    .every(f => new RegExp(f).test(text())));
  cer('elevii se văd', /Râmbu Ștefan/.test(text()));

  for (const [nume, re] of [['Calendar', /Liber|Traseul/], ['Elevi', /În curs/],
    ['Plan', /Generează plan/], ['Finanțe', /Salariu/], ['Setări', /Backup/]]) {
    clic(tab(new RegExp(nume)));
    await pauza(600);
    inchideFerestre();
    cer('fila ' + nume, re.test(text()));
  }

  console.log('');
  rez.forEach(([s, n, dtl]) => console.log('  ' + s + ' ' + n.padEnd(26) + (dtl || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  const reale = [...new Set(erori)].filter(e => !/Not implemented|WebGL|serviceWorker|Could not parse/.test(e));
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  if (reale.length) { console.log('  erori:'); reale.slice(0, 4).forEach(e => console.log('    ' + e)); }
  else console.log('  nicio eroare în consolă');
  process.exit(cazute || reale.length ? 1 : 0);
})();
