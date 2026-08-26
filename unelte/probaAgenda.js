/* Agenda elevului pe card, anunțul de examen teoretic pe Acasă și „Ce e nou"
   cu detalii ascunse.                                                       */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [
  { id: 's1', name: 'Una Ana', lastName: 'Una', firstName: 'Ana', includedHours: 5, weeklyLimit: 3,
    notite: [{ id: 'n1', text: 'Are emoții la parcare.', data: azi }], payments: [] },
  { id: 's2', name: 'Multe Barbu', lastName: 'Multe', firstName: 'Barbu', includedHours: 5, weeklyLimit: 3,
    notite: [{ id: 'n1', text: 'Prima notiță.', data: azi }, { id: 'n2', text: 'A doua notiță.', data: azi }],
    reminders: [{ id: 'm1', atSession: 5, text: 'De făcut poligonul' }], payments: [] },
  { id: 's3', name: 'Teoretic Cezar', lastName: 'Teoretic', firstName: 'Cezar', includedHours: 5, weeklyLimit: 3,
    theoryExamDate: azi, payments: [] },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei' },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    // ca „Ce e nou" să se deschidă singur, ne prefacem că am văzut o versiune veche
    w.localStorage.setItem('ias:vazut', 'v2.34.40');
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
  },
});
const doc = () => d.window.document;
const text = () => doc().body.textContent.replace(/\s+/g, ' ');
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const inchide = () => foi().forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

async function deschideElev(nume) {
  const n = [...doc().querySelectorAll('span')].find(x => new RegExp(nume).test(x.textContent) && x.textContent.length < 80);
  clic(n && n.closest('button, [role=button]'));
  await pauza(700);
  return fata();
}

(async () => {
  await pauza(3000);

  inchide(); await pauza(400);

  // „Ce e nou" se deschide din Setări → Despre aplicație
  clic([...doc().querySelectorAll('nav button')].find(x => /Setări/.test(x.textContent)));
  await pauza(700);
  clic([...doc().querySelectorAll('button')].find(x => /^Despre aplica/.test(x.textContent.trim())));
  await pauza(600);
  clic([...fata().querySelectorAll('button')].find(b2 => /^Ce e nou$/.test(b2.textContent.trim())));
  await pauza(700);
  const nou = fata();
  cer('„Ce e nou" arată doar titluri',
    !!nou && /Agenda elevului/.test(nou.textContent) && !/la un loc/i.test(nou.textContent),
    'amănuntele sunt strânse');
  const titlu = nou && [...nou.querySelectorAll('button')].find(b2 => /Agenda elevului/.test(b2.textContent));
  clic(titlu); await pauza(300);
  cer('detaliile se deschid la atingere', /la un loc/i.test(fata().textContent));
  inchide(); await pauza(400);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Acasă/.test(x.textContent)));
  await pauza(600);

  cer('anunț de examen teoretic azi',
    /dă azi examenul teoretic/.test(text()),
    (text().match(/[^·]{0,30}dă azi examenul teoretic/) || [])[0]);

  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(700);

  const f1 = await deschideElev('Una Ana');
  cer('o singură notiță apare pe card',
    !!f1 && /Notiță/.test(f1.textContent) && /Are emoții la parcare/.test(f1.textContent));
  inchide(); await pauza(500);

  const f2 = await deschideElev('Multe Barbu');
  cer('mai multe se strâng în listă',
    !!f2 && /Agendă · 3/.test(f2.textContent), (f2.textContent.match(/Agendă · \d/) || [])[0]);
  cer('  se văd și mementourile', !!f2 && /De făcut poligonul/.test(f2.textContent));
  cer('  se văd și notițele', !!f2 && /A doua notiță/.test(f2.textContent));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(34) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
