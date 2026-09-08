/* Lista „toate orele programate" e în Statistici, iar programarea peste un
   interval marcat indisponibil avertizează, se lasă făcută și se vede hașurată. */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [
  { id: 's1', name: 'Gata Ana', lastName: 'Gata', firstName: 'Ana', includedHours: 1, weeklyLimit: 3, payments: [] },
  { id: 's2', name: 'Liber Barbu', lastName: 'Liber', firstName: 'Barbu', includedHours: 8, weeklyLimit: 3, payments: [] },
];
const sessions = [
  // Ana și-a făcut singura ședință: intră în lista celor gata programați
  { id: 'x1', studentId: 's1', date: azi, startMin: 480, duration: 90, status: 'completed', type: 'included' },
  // Barbu are o ședință chiar peste intervalul barat
  { id: 'x2', studentId: 's2', date: azi, startMin: 600, duration: 90, status: 'scheduled', type: 'included' },
];
const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  blocks: [{ id: 'b1', date: azi, allDay: false, startMin: 570, endMin: 750, reason: 'revizie mașină' }],
};

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
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  const t = text();
  const p = (x) => t.indexOf(x);
  cer('lista nu mai e la „Necesită atenție"',
    p('Toate orele programate') > p('Statistici') && p('Statistici') > 0);
  cer('  și e la coada Statisticilor',
    p('Toate orele programate') > p('Examene după tip'),
    'după procentul de promovați și examenele după tip');

  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  const hasurate = doc().querySelectorAll('.ias-peste-blocaj').length;
  cer('ședința peste blocaj e hașurată', hasurate === 1, `${hasurate} ședințe hașurate`);
  cer('  dar se citește normal', /Liber Barbu/.test(text()));
  cer('  hașura e transparentă',
    /\.ias-peste-blocaj::after[^}]*opacity: \.5/.test(html)
    && /pointer-events: none/.test(html));

  // programăm peste intervalul barat
  // intervalul barat e 09:30–12:30; alegem o oră chiar din el
  /* Orele barate nu apar ca sloturi libere, deci se ajunge peste ele mutând
     ora din fișa ședinței — exact cum ar face omul. */
  clic([...doc().querySelectorAll('button')].find(x => /Liber/.test(x.textContent)));
  await pauza(800);
  const f = fata();
  if (f) {
    const selecte = [...f.querySelectorAll('select')];
    const elev = selecte[0];
    if (elev && elev.options.length > 1) {
      elev.value = elev.options[1].value;
      elev.dispatchEvent(new d.window.Event('change', { bubbles: true }));
      await pauza(300);
    }
    const ora = [...fata().querySelectorAll('select')].find(x =>
      [...x.options].some(o => /^10:00/.test(o.text)));
    if (ora) {
      ora.value = [...ora.options].find(o => /^10:00/.test(o.text)).value;
      ora.dispatchEvent(new d.window.Event('change', { bubbles: true }));
      await pauza(300);
    }
    clic([...fata().querySelectorAll('button')].find(b2 => /Salveaz/.test(b2.textContent)));
    await pauza(500);
  }
  const mesaj = (text().match(/Aten[^.]{0,80}/) || ['—'])[0];
  cer('avertizează la programare peste blocaj',
    /marcat indisponibil/.test(text()),
    mesaj);
  cer('  și spune cum treci peste', /Apasă din nou/.test(text()));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
