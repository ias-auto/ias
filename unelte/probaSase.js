/* Cele șase din poze: socoteala pachetului, meniul browserului, retragerea,
   căutarea, rezerva de examen și mașina implicită.                          */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const maine = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

cer('ținutul apăsat nu cheamă meniul browserului',
  /\.ias-fara-meniu \{[^}]*-webkit-touch-callout: none/.test(html)
  && /ias-fara-meniu/.test(html));
cer('examenul elevului retras iese din calendar',
  /filter\(t => !t\.withdrawn && t\.examDate === e/.test(html));

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei',
  feeTypes: [{ id: 'f1', name: 'Pachet integral', price: 3100, hours: 17, oreTip: 'included', laScoala: true }],
  masini: [{ id: 'm1', nume: 'CT 01 IAS', cutie: 'manuala' }, { id: 'm2', nume: 'CT 02 IAS', cutie: 'automata' }],
  masinaImplicita: 'm2',
  rezervaExamen: 5,
};
const students = [
  { id: 's1', name: 'Pachet Ana', lastName: 'Pachet', firstName: 'Ana',
    includedHours: 17, extraHours: 0, weeklyLimit: 3, pachet: 'f1', enrollDate: azi, payments: [] },
  { id: 's2', name: 'Retras Barbu', lastName: 'Retras', firstName: 'Barbu',
    includedHours: 8, weeklyLimit: 3, payments: [] },
  { id: 's3', name: 'Promovat Cezar', lastName: 'Promovat', firstName: 'Cezar',
    includedHours: 8, weeklyLimit: 3, examResult: 'promovat', payments: [] },
];
const sessions = [
  { id: 'x1', studentId: 's2', date: maine, startMin: 600, duration: 90, status: 'scheduled', type: 'included' },
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
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const btn = (re) => [...fata().querySelectorAll('button')].find(x => re.test(x.textContent.trim()));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const scrie = (camp, val) => {
  const set = Object.getOwnPropertyDescriptor(d.window.HTMLInputElement.prototype, 'value').set;
  set.call(camp, val);
  camp.dispatchEvent(new d.window.Event('input', { bubbles: true }));
};
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
const deschideElev = async (nume) => {
  const n = [...doc().querySelectorAll('span')].find(x => new RegExp(nume).test(x.textContent) && x.textContent.length < 80);
  clic(n && n.closest('button, [role=button]'));
  await pauza(800);
  return fata();
};

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(700);

  /* 1. socoteala pachetului la editare */
  await deschideElev('Pachet Ana');
  clic([...fata().querySelectorAll('button')].find(x => /Editeaz/.test(x.textContent)));
  await pauza(900);
  const t1 = fata().textContent.replace(/\s+/g, ' ');
  cer('pachetul nu se mai adună de două ori', /Total\s*17 ședințe/.test(t1),
    (t1.match(/Total\s*\d+ ședințe/) || [])[0]);
  inchide(); await pauza(300); inchide(); await pauza(500);

  /* 2. căutarea găsește și în grupurile strânse */
  const camp = [...doc().querySelectorAll('input')].find(x => /Caută nume/.test(x.placeholder || ''));
  scrie(camp, 'Promovat'); await pauza(500);
  cer('căutarea găsește elevul promovat',
    /Promovat Cezar/.test(doc().body.textContent), 'grupul strâns s-a deschis singur');
  scrie(camp, ''); await pauza(400);

  /* 3. retragerea anulează ședințele */
  await deschideElev('Retras Barbu');
  clic([...fata().querySelectorAll('button')].find(x => /Editeaz/.test(x.textContent)));
  await pauza(900);
  clic([...fata().querySelectorAll('button')].find(x => /^Dosar/.test(x.textContent.trim())));
  await pauza(400);
  const sel = [...fata().querySelectorAll('select')].find(x =>
    [...x.options].some(o2 => /Retras/.test(o2.text)));
  sel.value = 'withdrawn';
  sel.dispatchEvent(new d.window.Event('change', { bubbles: true }));
  await pauza(300);
  clic(btn(/Salvează modificările/)); await pauza(900);
  const dupa = JSON.parse(d.window.localStorage.getItem('ias:app-data'));
  cer('retragerea anulează ședințele viitoare',
    dupa.sessions[0].status === 'cancelled',
    `ședința de mâine: ${dupa.sessions[0].status}`);
  cer('  și se spune ce s-a întâmplat', /Ședințele viitoare au fost anulate/.test(doc().body.textContent));

  /* 4 și 5. setările: rezerva și mașina implicită */
  inchide(); await pauza(500);
  clic([...doc().querySelectorAll('nav button')].find(x => /Setări/.test(x.textContent)));
  await pauza(900);
  const randSetari = (re) => [...doc().querySelectorAll('button')]
    .find(x => re.test(x.textContent.trim()) && !x.closest('.sheet-anim'));

  clic(randSetari(/^Elevi noi/)); await pauza(800);
  const f1 = fata();
  cer('rezerva de examen se poate schimba',
    !!f1 && /Ședințe păstrate pentru examen/.test(f1.textContent)
    && [...f1.querySelectorAll('input')].some(x => x.value === '5'),
    f1 ? 'acum e 5, nu 3 fix' : 'n-am ajuns la fereastră');
  inchide(); await pauza(700);

  clic(randSetari(/^Mașinile mele/)); await pauza(800);
  const f2 = fata();
  cer('mașina implicită se alege lângă mașini',
    !!f2 && /Mașina implicită pentru elevii noi/.test(f2.textContent)
    && [...f2.querySelectorAll('select')].some(x => x.value === 'm2'),
    f2 ? 'CT 02 IAS · automată' : 'n-am ajuns la fereastră');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(38) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
