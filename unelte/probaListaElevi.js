/* Lista de elevi la programare: cei care au deja o ședință în ziua aleasă nu
   trebuie să mai apară. Cel deja ales rămâne, ca să nu-ți dispară de sub deget
   când editezi o ședință.                                                    */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [
  { id: 's1', name: 'Liber Ana', lastName: 'Liber', firstName: 'Ana', includedHours: 5, weeklyLimit: 3, payments: [] },
  { id: 's2', name: 'Ocupat Barbu', lastName: 'Ocupat', firstName: 'Barbu', includedHours: 5, weeklyLimit: 3, payments: [] },
  { id: 's3', name: 'Ocupat Cezar', lastName: 'Ocupat', firstName: 'Cezar', includedHours: 5, weeklyLimit: 3, payments: [] },
];
const sessions = [
  { id: 'x1', studentId: 's2', date: azi, startMin: 540, duration: 90, status: 'scheduled', type: 'included' },
  { id: 'x2', studentId: 's3', date: azi, startMin: 720, duration: 90, status: 'scheduled', type: 'included' },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions,
      settings: { workDays: [0, 1, 2, 3, 4, 5, 6], startMin: 480, endMin: 1200, currency: 'lei' },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
  },
});

const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const buton = (re) => [...doc().querySelectorAll('button')].find(x => re.test(x.textContent.trim()));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(700);
  clic(buton(/^Liber$/) || [...doc().querySelectorAll('button')].find(x => /Liber/.test(x.textContent)));
  await pauza(700);

  const foaie = doc().querySelector('.sheet-anim');
  cer('fișa ședinței se deschide', !!foaie && /edin/.test(foaie.textContent));

  clic([...foaie.querySelectorAll('button')].find(b => /Alege elevul|Liber Ana|Ocupat/.test(b.textContent)));
  await pauza(600);

  const lista = [...doc().querySelectorAll('.sheet-anim button')]
    .map(b => b.textContent.trim())
    .filter(t => /Liber Ana|Ocupat Barbu|Ocupat Cezar/.test(t));

  cer('elevul liber apare', lista.some(t => /Liber Ana/.test(t)), lista.join(' | ') || 'listă goală');
  cer('cei cu ședință în ziua asta nu apar',
    !lista.some(t => /Ocupat Barbu/.test(t)) && !lista.some(t => /Ocupat Cezar/.test(t)));
  const nota = doc().querySelector('.sheet-anim').textContent;
  cer('scrie de ce lipsesc', /nu apar în listă/.test(nota),
    (nota.match(/\d+ elevi nu apar în listă[^.]*\./) || nota.match(/Un elev nu apare[^.]*\./) || [])[0] || 'fără notă');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(34) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
