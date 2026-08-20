// Proba finală: pornim index.html-ul construit, cu date reale, și umblăm prin
// toate filele — exact ce ar face utilizatorul în primele minute.
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('/home/claude/pwa/index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const maine = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
const luna = azi.slice(0, 7);
const an = new Date().getFullYear();
const zi = azi.slice(4);

const students = [
  { id: 's1', name: 'Râmbu Ștefan', lastName: 'Râmbu', firstName: 'Ștefan', sex: 'm', phone: '0722111222',
    group: '12', county: 'CT', includedHours: 17, extraHours: 5, weeklyLimit: 3, birthDate: (an - 20) + zi,
    examDate: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10), examPeriod: 'am',
    defaultLocation: 'Piața Gării', notes: 'Are emoții la parcare.',
    payments: [{ id: 'p1', date: luna + '-02', amount: 3100, collector: 'school' }] },
  { id: 's2', name: 'Popescu Ana', lastName: 'Popescu', firstName: 'Ana Maria', sex: 'f', phone: '0733444555',
    group: '9', county: 'CT', includedHours: 15, extraHours: 0, weeklyLimit: 2, payments: [] },
  { id: 's3', name: 'Ionescu Radu', lastName: 'Ionescu', firstName: 'Radu', group: 'OS', county: 'CT',
    includedHours: 0, extraHours: 10, weeklyLimit: 2, asteptare: true, asteptareDin: '2026-08-05', payments: [] },
];
const sessions = [
  { id: 'x1', studentId: 's1', date: azi, startMin: 540, duration: 90, status: 'completed', type: 'included', location: 'Piața Gării' },
  { id: 'x2', studentId: 's2', date: azi, startMin: 660, duration: 90, status: 'pending', type: 'included', location: 'Lidl Tomis' },
  { id: 'x3', studentId: 's1', date: maine, startMin: 540, duration: 90, status: 'scheduled', type: 'extra', location: 'Piața Gării' },
];
const settings = {
  workDays: [1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30,
  currency: 'lei', defaultCounty: 'CT', numeleTau: 'Adrian', numeScoala: 'Auto Pontus',
  locations: [{ id: 'l1', name: 'Piața Gării', lat: 44.159812, lng: 28.634765 }, { id: 'l2', name: 'Lidl Tomis' }],
  feeTypes: [
    { id: 'scol', name: 'Școlarizare integrală', price: 3100, hours: 17, oreTip: 'included', laScoala: true },
    { id: 'pack', name: 'Pachet 5 ședințe', price: 950, hours: 5, oreTip: 'extra' },
  ],
  rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }, { id: 'extra', name: 'Ore suplimentare', price: 120 }],
};

const erori = [];
const d = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions, settings, varsaminte: [{ id: 'v1', date: luna + '-10', amount: 1500, note: 'chitanța 12' }] }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({ cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'] }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.matchMedia = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
    w.console.error = (...a) => erori.push(a.map(String).join(' ').slice(0, 200));
    w.addEventListener('error', e => erori.push('eroare: ' + e.message));
  } });

const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const tab = (re) => [...doc().querySelectorAll('nav button')].find(x => re.test(x.textContent));
const buton = (re) => [...doc().querySelectorAll('button')].find(x => re.test(x.textContent.trim()));
const text = () => doc().body.textContent.replace(/\s+/g, ' ');
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(2600);
  const rez = [];
  const verifica = (nume, cond, detaliu) => { rez.push([cond ? '✓' : '✕', nume, detaliu || '']); };

  // ACASĂ
  verifica('Acasă pornește', /Bun venit în/.test(text()));
  verifica('numără elevii', /3 elevi|3elevi/.test(text().replace(/\s/g, ' ')), (text().match(/(\d+) elevi/) || [])[0]);
  verifica('arată ce cere atenție', /Necesită atenție/.test(text()));
  verifica('examen apropiat semnalat', /examen în|examen mâine|examen azi/.test(text()));
  verifica('ziua de naștere semnalată', /Azi e ziua lui Ștefan/.test(text()));
  verifica('ședințele de azi', /Astăzi/.test(text()) && /Râmbu Ștefan/.test(text()));

  // CALENDAR
  clic(tab(/Calendar/)); await pauza(500);
  verifica('Calendar se deschide', /Traseul zilei|Liber/.test(text()));
  clic(buton(/Râmbu Ștefan/)); await pauza(450);
  verifica('fișa ședinței se deschide', /Ședință/.test(text()) && !!doc().querySelector('.sheet-anim'));
  const inchide = () => { const f = doc().querySelector('.sheet-anim'); if (f) clic(f.parentElement.querySelector('.absolute')); };
  inchide(); await pauza(350);

  // ELEVI
  clic(tab(/Elevi/)); await pauza(500);
  verifica('grupurile de elevi', /În curs · 2/.test(text()) && /În așteptare · 1/.test(text()));
  clic([...doc().querySelectorAll('[role=button]')].find(x => /Râmbu/.test(x.textContent))); await pauza(500);
  const fisa = doc().querySelector('.sheet-anim');
  verifica('fișa elevului', !!fisa && /din 22 ore efectuate/.test(fisa.textContent));
  verifica('notițele apar pe fișă', /Are emoții la parcare/.test(fisa.textContent));
  verifica('datoria calculată', /Achitat la zi|Datorie ore/.test(fisa.textContent),
    (fisa.textContent.match(/Acumulat: [\d.]+ · Plătit: [\d.]+/) || [])[0]);
  inchide(); await pauza(350);

  // PLAN
  clic(tab(/Plan/)); await pauza(500);
  verifica('Plan se deschide', /Generează plan/.test(text()));
  verifica('cardul „Mai ai de lucru"', /Mai ai de lucru/.test(text()),
    (text().match(/până la \d+ \w+ \d+: \d+ din \d+ ședințe/) || ['(încape tot în lună)'])[0]);
  clic(buton(/Generează plan/)); await pauza(700);
  verifica('planul propune ședințe', /Plan propus/.test(text()), (text().match(/Plan propus · (\d+) ședințe/) || [])[0]);

  // FINANȚE
  clic(tab(/Finanțe/)); await pauza(500);
  verifica('Finanțe se deschide', /De la elevi/.test(text()) && /Salariu/.test(text()));
  verifica('banii duși la școală', /Bani duși la școală/.test(text()));

  // SETĂRI
  clic(tab(/Setări/)); await pauza(500);
  verifica('Setări se deschide', /Vehiculul din antet/.test(text()));
  verifica('rândul de licențe (proprietar)', /Licențe/.test(text()));
  clic(buton(/^Vehiculul din antet/)); await pauza(450);
  const sel = doc().querySelector('.sheet-anim select');
  verifica('garajul are 9 vehicule', sel && sel.options.length === 9, sel ? sel.options.length + ' modele' : '—');
  verifica('SUV-ul e în listă', sel && [...sel.options].some(o => /SUV/.test(o.text)));

  console.log('');
  rez.forEach(([s, n, dtl]) => console.log('  ' + s + ' ' + n.padEnd(34) + (dtl || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări trecute');
  const reale = [...new Set(erori)].filter(e => !/Not implemented|WebGL|serviceWorker|act\(/.test(e));
  if (reale.length) { console.log('\n  erori în consolă:'); reale.slice(0, 5).forEach(e => console.log('    ' + e)); }
  else console.log('  nicio eroare în consolă');
  process.exit(0);
})();
