/* Locurile cu o singură apăsare, sortarea strânsă într-o listă, și indicatoarele
   cu lumină pe cardurile de ședință.                                         */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

cer('listele își urcă capul la deschidere',
  /window\.scrollBy\(\{ top: sus - 78, behavior: "smooth" \}\)/.test(html));

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  locations: ['Tomis Nord','City Park','Gară','Vivo','Kaufland','Lukoil','OMV Pescărie','Rompetrol']
    .map((n, k) => ({ id: 'l' + k, name: n })),
};
const students = [
  { id: 's1', name: 'Alfa Ana', lastName: 'Alfa', firstName: 'Ana', includedHours: 8, weeklyLimit: 5, payments: [] },
  { id: 's2', name: 'Beta Radu', lastName: 'Beta', firstName: 'Radu', includedHours: 8, weeklyLimit: 5, payments: [] },
];
const sessions = [
  { id: 'x1', studentId: 's1', date: azi, startMin: 600, duration: 90, status: 'scheduled', type: 'included' },
  { id: 'x2', studentId: 's2', date: azi, startMin: 750, duration: 90, status: 'pending', type: 'included' },
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
    w.scrollBy = () => {};
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

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  /* ---- Acasă: indicatoare cu lumină ---- */
  const semne = [...doc().querySelectorAll('span')].filter(x =>
    /drop-shadow/.test(x.getAttribute('style') || '') && x.querySelector('svg'));
  cer('cardurile au indicatorul rutier', semne.length >= 2, `${semne.length} indicatoare`);
  cer('  lumina urmează conturul, nu un chenar',
    semne.length > 0 && /drop-shadow/.test(semne[0].getAttribute('style'))
    && !/border/.test(semne[0].getAttribute('style')));
  const scris = [...doc().querySelectorAll('span')].find(x => /text-shadow/i.test(x.getAttribute('style') || ''));
  cer('  scrisul e dedesubt și luminat', !!scris,
    scris ? scris.textContent.trim() : 'lipsește');

  /* ---- Elevi: sortarea ---- */
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(800);
  const chipuriSort = [...doc().querySelectorAll('button')].filter(x =>
    /^(Grupă|Ex\. practic|Ex\. teoretic|Zonă|Punct start|Ore rămase|Recent)$/.test(x.textContent.trim()));
  cer('sortarea e un singur buton', /Sortare/.test(text()) && chipuriSort.length === 0,
    'cele nouă criterii nu mai stau înșirate');
  cer('  criteriul ales se vede lângă el', /Nume/.test(text()));
  clic([...doc().querySelectorAll('button')].find(x => /^Sortare$/.test(x.textContent.trim())));
  await pauza(700);
  const fs2 = foi().find(x => /Sortează după/.test(x.textContent)) || fata();
  // căutăm doar în fereastra de sortare, nu și în butonul de lângă „Sortare"
  const crit = [...fs2.querySelectorAll('button')].filter(x =>
    /^(Nume|Grupă|Ex\. practic|Ex\. teoretic|Zonă|Punct start|Ore rămase|Datorie|Recent)✓?$/.test(x.textContent.trim()));
  cer('  lista are toate criteriile', crit.length === 9,
    crit.length + ' criterii: ' + crit.map(x => x.textContent.trim()).join(', '));
  clic(crit.find(x => /Datorie/.test(x.textContent))); await pauza(600);
  cer('  alegerea se vede lângă buton', /Datorie/.test(text()));

  /* ---- ședința: locurile cu o apăsare ---- */
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);
  clic([...doc().querySelectorAll('button')].find(x => /Liber/.test(x.textContent)));
  await pauza(900);
  const f = fata();
  const chipuri = [...f.querySelectorAll('button')].filter(x =>
    /^(Tomis Nord|City Park|Gară|Vivo|Kaufland|Lukoil)$/.test(x.textContent.trim()));
  cer('locurile stau la vedere, ca butoane', chipuri.length === 6,
    `${chipuri.length} locuri pe două rânduri, din ${settings.locations.length}`);
  clic(chipuri[2]); await pauza(400);
  const garaBtn = [...fata().querySelectorAll('button')].find(x => /^Gară$/.test(x.textContent.trim()));
  cer('  o singură apăsare le alege',
    !!garaBtn && /2px/.test(garaBtn.getAttribute('style') || ''),
    garaBtn ? 'Gară, ales din prima' : 'nu găsesc butonul');
  cer('  restul se deschid într-o listă', /Toate locurile \(8\)/.test(fata().textContent));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(38) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
