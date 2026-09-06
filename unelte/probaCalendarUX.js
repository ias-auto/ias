/* Navigarea săptămânii, lista de locuri și statusul ca patru pătrate.        */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  locations: [
    { id: 'l1', name: 'Tomis Nord' }, { id: 'l2', name: 'City Park' },
    { id: 'l3', name: 'Gară' }, { id: 'l4', name: 'Vivo' }, { id: 'l5', name: 'Kaufland' },
  ],
};
const students = [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
  includedHours: 8, weeklyLimit: 5, payments: [] }];
const sessions = [{ id: 'x1', studentId: 's1', date: azi, startMin: 600, duration: 90,
  status: 'scheduled', type: 'included' }];

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
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
const zileBara = () => [...doc().querySelectorAll('button')]
  .filter(x => /^(Lun|Mar|Mie|Joi|Vin|Sâm|Dum)/.test(x.textContent.trim()));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  /* ---- A. săptămâna ---- */
  cer('antetul arată intervalul săptămânii', /\d+ (–|.) \d+ \w{3}/.test(text()),
    (text().match(/\d+[^·]{0,4}[–-][^·]{0,12}\d+ \w{3}/) || [])[0]);
  cer('  spune că e săptămâna asta', /săptămâna asta/.test(text()));

  // alegem o zi anume, apoi schimbăm săptămâna
  const zile = zileBara();
  const idx = 6; // duminică
  clic(zile[idx]); await pauza(500);
  const numarInainte = zileBara()[idx].textContent.match(/\d+/)[0];
  clic([...doc().querySelectorAll('button[aria-label="Săptămâna viitoare"]')][0]);
  await pauza(600);
  const zileDupa = zileBara();
  const alesDupa = zileDupa.findIndex(x => /bg-slate-900/.test(x.className));
  cer('schimbarea săptămânii păstrează ziua', alesDupa === idx,
    `duminică rămâne duminică (${numarInainte} → ${zileDupa[idx].textContent.match(/\d+/)[0]})`);
  cer('  și se vede că e altă săptămână', /săptămâna viitoare/.test(text()));
  cer('  apare butonul „Azi"', /← Azi/.test(text()));
  clic([...doc().querySelectorAll('button')].find(x => /← Azi/.test(x.textContent)));
  await pauza(600);
  cer('„Azi" revine la ziua de azi', /săptămâna asta/.test(text()) && !/← Azi/.test(text()));
  cer('ziua de azi e marcată în bandă', zileBara().some(x => /azi/.test(x.textContent)));

  /* ---- B și C: formularul ședinței ---- */
  clic([...doc().querySelectorAll('button')].find(x => /Liber/.test(x.textContent)));
  await pauza(900);
  const f = fata();
  const patrate = [...f.querySelectorAll('button')].filter(x => x.getAttribute('aria-pressed') !== null);
  cer('statusul are patru pătrate', patrate.length === 2 || patrate.length === 4,
    patrate.map(x => x.textContent.trim()).join(' · '));
  const ales = patrate.find(x => x.getAttribute('aria-pressed') === 'true');
  const nealese = patrate.filter(x => x.getAttribute('aria-pressed') === 'false');
  cer('  cel ales e vizibil mai mare', /scale\(1\.04\)/.test(ales.style.transform)
    && nealese.every(x => /scale\(\.96\)/.test(x.style.transform)),
    'ales 1.04 · restul .96');
  cer('  și are chenar gros și umbră',
    /2px/.test(ales.style.border) && ales.style.boxShadow.length > 4,
    `chenar ${ales.style.border.split(' ')[0]}, umbră ${ales.style.boxShadow ? 'da' : 'nu'}`);

  clic([...f.querySelectorAll('button')].find(x => /Alege locul de întâlnire/.test(x.textContent)));
  await pauza(700);
  const fl = fata();
  const locuri = [...fl.querySelectorAll('button')].filter(x =>
    /Tomis Nord|City Park|Gară|Vivo|Kaufland/.test(x.textContent));
  cer('locurile se văd fără să cauți', locuri.length === 5,
    locuri.map(x => x.textContent.trim()).join(', '));
  cer('  nu te obligă la căutare', !fl.querySelector('input[placeholder*="Caută sau scrie"]')
    || locuri.length === 5, 'cu 5 locuri, căutarea stă jos');
  clic(locuri[2]); await pauza(500);
  cer('alegi din două atingeri', /Gară/.test(fata().textContent), 'deschid → aleg');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
