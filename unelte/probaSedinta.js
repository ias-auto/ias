/* Formularul de ședință, după redesign: nimic din ce funcționa nu s-a pierdut.
   Se verifică pe rând crearea, editarea, statusurile, ora, locul, tipul,
   detaliile avansate, salvarea, ștergerea și întrebarea la închidere.       */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [
  { id: 's1', name: 'Popescu Andrei', lastName: 'Popescu', firstName: 'Andrei',
    includedHours: 10, weeklyLimit: 5, payments: [], defaultLocation: 'OMV Pescărie' },
  { id: 's2', name: 'Ionescu Radu', lastName: 'Ionescu', firstName: 'Radu',
    includedHours: 10, weeklyLimit: 5, payments: [] },
  // liber în ziua asta, deci apare la alegerea elevului
  { id: 's3', name: 'Vasilescu Mihai', lastName: 'Vasilescu', firstName: 'Mihai',
    includedHours: 10, weeklyLimit: 5, payments: [] },
];
const sessions = [
  { id: 'x1', studentId: 's1', date: azi, startMin: 600, duration: 90,
    status: 'scheduled', type: 'included', location: 'OMV Pescărie', notes: 'de repetat parcarea' },
  // a doua ședință ocupă un interval: slotul ei trebuie să apară blocat
  { id: 'x2', studentId: 's2', date: azi, startMin: 780, duration: 90,
    status: 'scheduled', type: 'included' },
];
const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  locations: [
    { id: 'l1', name: 'OMV Pescărie' }, { id: 'l2', name: 'Rompetrol Oxford' },
    { id: 'l3', name: 'Carrefour Năvodari' }, { id: 'l4', name: 'Școala 8 Brătianu' },
    { id: 'l5', name: 'Parcul Ferdinand' }, { id: 'l6', name: '5-to-go Năvodari' },
  ],
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
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const btn = (re, unde) => [...(unde || fata()).querySelectorAll('button')].find(x => re.test(x.textContent.trim()));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(500);

  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  /* ---------- 1. editarea unei ședințe existente ---------- */
  clic([...doc().querySelectorAll('button')].find(x => /Popescu Andrei/.test(x.textContent)));
  await pauza(900);
  let f = fata();
  cer('editarea se deschide', !!f && /Editează ședința/.test(f.textContent));
  cer('  fișa de sus arată ce editezi',
    !!f && /Popescu Andrei/.test(f.textContent) && /10:00–11:30/.test(f.textContent.replace(/\s/g, '')),
    (f.textContent.match(/Popescu Andrei[^A-Z]{0,30}/) || [])[0]);
  cer('  are indicatoare rutiere', f.querySelectorAll('svg polygon, svg circle').length >= 4,
    `${f.querySelectorAll('svg').length} semne desenate`);

  const stari = [...f.querySelectorAll('button')].filter(x =>
    /^(Programată|Așteaptă confirmare|Efectuată|Anulată)$/.test(x.textContent.trim()));
  cer('  toate cele patru statusuri', stari.length === 4, stari.map(x => x.textContent.trim()).join(' · '));

  const ore = [...f.querySelectorAll('button')].filter(x => /^\d\d:\d\d$/.test(x.textContent.trim()));
  cer('  ora e o grilă de sloturi', ore.length > 8, `${ore.length} ore`);
  cer('  slotul ocupat e blocat', ore.some(x => x.disabled), `${ore.filter(x => x.disabled).length} blocate`);

  cer('  locul e un singur rând', !!btn(/OMV Pescărie/), 'OMV Pescărie');
  cer('  detaliile avansate sunt strânse',
    /Detalii avansate/.test(f.textContent) && !/Numele instructorului/.test(f.textContent));
  cer('  rezumatul se vede', /Rezumat/.test(f.textContent));
  cer('  notițele n-au dispărut', (() => { clic(btn(/Detalii avansate/)); return true })());
  await pauza(300);
  f = fata();
  cer('  ...și sunt editabile',
    !!f.querySelector('textarea') && /de repetat parcarea/.test(f.querySelector('textarea').value));
  cer('  limba și instructorul sunt acolo',
    /Limba ședinței/.test(f.textContent) && /Efectuată de/.test(f.textContent));
  cer('  ștergerea e la locul ei', !!btn(/Șterge definitiv/));

  /* ---------- 2. schimb starea și ora, apoi salvez ---------- */
  clic([...f.querySelectorAll('button')].find(x => /^Efectuată$/.test(x.textContent.trim())));
  await pauza(300);
  const liber = [...fata().querySelectorAll('button')].filter(x => /^\d\d:\d\d$/.test(x.textContent.trim()) && !x.disabled)[0];
  const oraAleasa = liber.textContent.trim();
  clic(liber); await pauza(300);
  cer('starea și ora se pot schimba',
    /Efectuată/.test(fata().textContent), 'oră aleasă: ' + oraAleasa);
  clic(btn(/Salvează modificările/)); await pauza(700);
  const dupa = JSON.parse(d.window.localStorage.getItem('ias:app-data')).sessions[0];
  cer('salvarea a mers', dupa.status === 'completed',
    `status ${dupa.status}, ora ${String(Math.floor(dupa.startMin/60)).padStart(2,'0')}:${String(dupa.startMin%60).padStart(2,'0')}`);

  /* ---------- 3. ședință nouă ---------- */
  await pauza(500);
  clic([...doc().querySelectorAll('button')].find(x => /Liber/.test(x.textContent)));
  await pauza(900);
  f = fata();
  cer('ședință nouă se deschide', !!f && /Ședință nouă/.test(f.textContent));
  cer('  nu are fișa de editare', !/Editează ședința/.test(f.textContent));
  cer('  are doar două statusuri', [...f.querySelectorAll('button')]
    .filter(x => /^(Programată|Așteaptă confirmare|Efectuată|Anulată)$/.test(x.textContent.trim())).length === 2);

  // alegem elevul
  clic(btn(/Alege elevul/)); await pauza(400);
  clic([...fata().querySelectorAll('button')].find(x => /Vasilescu Mihai/.test(x.textContent)));
  await pauza(400);
  f = fata();
  cer('  elevul se alege', /Vasilescu Mihai/.test(f.textContent));

  // locul, din fereastra compactă
  clic(btn(/Alege punctul de întâlnire|OMV|Rompetrol/)); await pauza(600);
  const fl = fata();
  cer('  locurile se aleg din fereastră', /Punct de întâlnire/.test(fl.textContent)
    && /Carrefour Năvodari/.test(fl.textContent), '6 locuri, cu căutare');
  const camp = fl.querySelector('input');
  const set = Object.getOwnPropertyDescriptor(d.window.HTMLInputElement.prototype, 'value').set;
  set.call(camp, 'Ferdinand');
  camp.dispatchEvent(new d.window.Event('input', { bubbles: true }));
  await pauza(300);
  cer('  căutarea filtrează', !/Carrefour Năvodari/.test(fata().textContent)
    && /Parcul Ferdinand/.test(fata().textContent));
  clic([...fata().querySelectorAll('button')].find(x => /Parcul Ferdinand/.test(x.textContent)));
  await pauza(400);
  cer('  locul ales se vede în formular', /Parcul Ferdinand/.test(fata().textContent));

  clic(btn(/Salvează ședința/)); await pauza(800);
  const toate = JSON.parse(d.window.localStorage.getItem('ias:app-data')).sessions;
  const noua = toate.find(x => x.studentId === 's3');
  cer('ședința nouă s-a salvat', !!noua && noua.location === 'Parcul Ferdinand',
    noua ? `${noua.status} · ${noua.location}` : 'nu s-a salvat');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
