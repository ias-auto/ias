/* Fișa elevului, după redesign: creare și editare, pachete ca fișe, rezumat
   viu, validare lângă câmp — și nimic pierdut din ce era.                   */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei',
  feeTypes: [
    { id: 'f1', name: 'Școlarizare integrală', price: 3100, hours: 17, oreTip: 'included', laScoala: true },
    { id: 'f2', name: 'Pachet 5 ședințe', price: 950, hours: 5, oreTip: 'extra' },
    { id: 'f3', name: 'Taxă reexaminare', price: 250 },
  ],
  masini: [{ id: 'm1', nume: 'CT 01 IAS', cutie: 'manuala' }],
};
const students = [
  { id: 's1', name: 'Vechi Ana', lastName: 'Vechi', firstName: 'Ana', phone: '0722111222',
    includedHours: 15, extraHours: 2, weeklyLimit: 3, enrollDate: azi, pachet: 'f2',
    birthDate: '2004-05-10', notes: 'notiță veche', payments: [] },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions: [], settings }));
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
const grup = (nume) => [...fata().querySelectorAll('button')].find(x => x.textContent.trim().startsWith(nume));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(700);

  /* ---------- elev nou ---------- */
  /* Elevul nou se adaugă de la butonul rotund din colț, cu semnul plus. */
  const plus = [...doc().querySelectorAll('button')].find(x => /fixed/.test(x.className) && !x.textContent.trim())
    || [...doc().querySelectorAll('button[aria-label]')].find(x => /Elev nou|Adaug/.test(x.getAttribute('aria-label')));
  clic(plus);
  await pauza(900);
  let f = fata();
  cer('se deschide „Adaugă elev"', !!f && /Adaugă elev/.test(f.textContent));
  cer('  are subtitlu', /Creezi fișa unui nou cursant/.test(f.textContent));
  cer('  numele e pe toată lățimea', (() => {
    const inp = [...f.querySelectorAll('input')].find(x => x.placeholder === 'Popescu');
    return inp && parseFloat(inp.style.fontSize) >= 16;
  })(), 'scris mai mare');

  // validare lângă câmp
  clic(btn(/^Adaugă elev$/)); await pauza(400);
  f = fata();
  const eroare = [...f.querySelectorAll('p')].find(x => /obligatorii/.test(x.textContent));
  cer('  eroarea apare lângă nume', !!eroare,
    eroare ? eroare.textContent.slice(0, 40) : 'nu apare');

  scrie([...f.querySelectorAll('input')].find(x => x.placeholder === 'Popescu'), 'Ionescu');
  scrie([...f.querySelectorAll('input')].find(x => x.placeholder === 'Ana Maria'), 'Radu');
  await pauza(300);

  // pachetele, ca fișe
  clic(grup('Școlarizare')); await pauza(400);
  f = fata();
  const carduri = [...f.querySelectorAll('button')].filter(x => /Școlarizare integrală|Pachet 5 ședințe/.test(x.textContent));
  cer('pachetele sunt fișe, nu listă', carduri.length === 2,
    carduri.map(x => x.textContent.replace(/\s+/g, ' ').trim().slice(0, 30)).join(' | '));
  cer('  arată prețul și ședințele',
    /3.100 lei/.test(f.textContent) && /\+17/.test(f.textContent) && /achitat la școală/.test(f.textContent));
  cer('  taxa fără ședințe nu apare ca pachet', !/Taxă reexaminare/.test(f.textContent));

  clic(carduri[0]); await pauza(400);
  f = fata();
  cer('  pachetul ales se vede', /✓ ales/.test(f.textContent));
  cer('rezumatul apare și socotește', /Rezumat curs/.test(f.textContent) && /17 ședințe/.test(f.textContent),
    (f.textContent.match(/Total\s*\d+ ședințe/) || [])[0]);

  clic(btn(/^Adaugă elev$/)); await pauza(800);
  const listaNoua = JSON.parse(d.window.localStorage.getItem('ias:app-data')).students;
  const nou = listaNoua.find(x => x.name === 'Ionescu Radu');
  cer('elevul se salvează cu pachetul',
    !!nou && nou.includedHours === 17 && (nou.payments || []).length === 1,
    nou ? `${nou.includedHours} incluse · ${(nou.payments||[]).length} plată la școală` : 'nu s-a salvat');

  /* ---------- editare ---------- */
  await pauza(500);
  const n = [...doc().querySelectorAll('span')].find(x => /Vechi Ana/.test(x.textContent) && x.textContent.length < 80);
  clic(n && n.closest('button, [role=button]')); await pauza(800);
  clic([...fata().querySelectorAll('button')].find(x => /Editeaz/.test(x.textContent)));
  await pauza(900);
  f = fata();
  cer('editarea se deschide cu datele', /Editează elev/.test(f.textContent)
    && [...f.querySelectorAll('input')].some(x => x.value === 'Vechi'));
  cer('  butonul spune „Salvează modificările"', !!btn(/Salvează modificările/));
  clic(grup('Școlarizare')); await pauza(400);
  cer('  pachetul existent e ales', /✓ ales/.test(fata().textContent));
  cer('  rezumatul arată totalul real', /Rezumat curs/.test(fata().textContent),
    (fata().textContent.match(/Total\s*\d+ ședințe/) || [])[0]);
  clic(grup('Agendă')); await pauza(400);
  cer('  notița veche e acolo', /notiță veche/.test(fata().textContent));

  console.log('');
  rez.forEach(([s, x, dt]) => console.log('  ' + s + ' ' + x.padEnd(38) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
