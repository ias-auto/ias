/* Probează funcțiile adăugate în v2.34.39, pornind aplicația construită cu date
   reale: mașinile din Setări, cutia și mașina pe fișa elevului, gruparea din
   plan, butonul de avans și fereastra cu proveniența banilor.                */

const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const masini = [
  { id: 'm1', nume: 'CT 01 IAS', cutie: 'manuala', combustibil: 'benzină' },
  { id: 'm2', nume: 'CT 02 IAS', cutie: 'manuala', combustibil: 'motorină' },
  { id: 'm3', nume: 'CT 03 IAS', cutie: 'automata', combustibil: '' },
];
const students = [
  { id: 's1', name: 'Achitat Ion', lastName: 'Achitat', firstName: 'Ion', includedHours: 5, extraHours: 0,
    weeklyLimit: 2, cutie: 'manuala', masina: 'm1',
    payments: [{ id: 'p1', date: azi, amount: 5000, collector: 'me' }] },
  { id: 's2', name: 'Datornic Vasile', lastName: 'Datornic', firstName: 'Vasile', includedHours: 0, extraHours: 6,
    weeklyLimit: 2, cutie: 'automata', masina: 'm3', payments: [] },
];
const settings = {
  workDays: [0, 1, 2, 3, 4, 5, 6], startMin: 480, endMin: 1200, currency: 'lei',
  masini, locations: [],
};

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [], settings,
      varsaminte: [{ id: 'v1', date: azi, amount: 1200, note: 'chitanța 44' }],
    }));
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
const tab = (re) => [...doc().querySelectorAll('nav button')].find(x => re.test(x.textContent));
const buton = (re) => [...doc().querySelectorAll('button')].find(x => re.test(x.textContent.trim()));
const foaie = () => doc().querySelector('.sheet-anim');
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f => {
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]'));
});
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  // 1. butonul de plată se schimbă când elevul e la zi
  clic(tab(/Elevi/)); await pauza(700);
  clic([...doc().querySelectorAll('[role=button], button')].find(x => /Achitat Ion/.test(x.textContent)));
  await pauza(700);
  const cardAchitat = [...doc().querySelectorAll('div')].find(x => /Achitat Ion/.test(x.textContent) && /Achitat la zi/.test(x.textContent));
  cer('elevul la zi: buton de avans',
    !!cardAchitat && /Plătește în avans/.test(cardAchitat.textContent),
    cardAchitat ? (cardAchitat.textContent.match(/Plătește în avans|Achită/) || [])[0] : 'nu găsesc cardul');
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('[role=button], button')].find(x => /Datornic Vasile/.test(x.textContent)));
  await pauza(700);
  const cardDator = [...doc().querySelectorAll('div')].find(x => /Datorie ore/.test(x.textContent));
  cer('elevul dator: buton de achitare',
    !!cardDator && /Achită/.test(cardDator.textContent));
  inchide(); await pauza(400);

  // 2. mașinile din Setări
  clic(tab(/Setări/)); await pauza(700);
  cer('rândul „Mașinile mele"', /Mașinile mele/.test(text()));
  clic(buton(/^Mașinile mele/)); await pauza(600);
  const f1 = foaie();
  cer('mașinile se văd', !!f1 && /CT 01 IAS/.test(f1.textContent) && /CT 03 IAS/.test(f1.textContent),
    f1 ? (f1.textContent.match(/CT \d+ IAS/g) || []).join(', ') : '—');
  cer('se vede cutia fiecăreia', !!f1 && /cutie manuală/.test(f1.textContent) && /cutie automată/.test(f1.textContent));
  cer('se poate adăuga una nouă', !!f1 && !!([...f1.querySelectorAll('button')].find(b => /Mașină nouă/.test(b.textContent))));
  inchide(); await pauza(400);

  // 3. planul: opțiunile strânse sub un titlu, cu gruparea pe mașini
  clic(tab(/Plan/)); await pauza(700);
  cer('opțiunile sunt sub un titlu', /Opțiuni de planificare/.test(text()));
  const titlu = buton(/Opțiuni de planificare/);
  clic(titlu); await pauza(400);
  const selecte = [...doc().querySelectorAll('select')];
  const grupare = selecte.find(s2 => [...s2.options].some(o2 => /mașina fiecărui elev/.test(o2.text)));
  cer('se poate grupa pe mașini', !!grupare,
    grupare ? [...grupare.options].map(o2 => o2.text.split(' —')[0]).join(' / ') : 'lipsește opțiunea');

  // 4. proveniența banilor
  clic(tab(/Finanțe/)); await pauza(700);
  clic(buton(/^Bani duși la școală/)); await pauza(600);
  const cardBani = [...doc().querySelectorAll('[role=button]')].find(x => /de dus la școală|Ai dus tot/.test(x.textContent));
  cer('cardul se poate apăsa', !!cardBani);
  clic(cardBani); await pauza(600);
  const f2 = [...doc().querySelectorAll('.sheet-anim')].find(x => /De unde vin banii/.test(x.textContent));
  cer('fereastra cu proveniența', !!f2, f2 ? 'deschisă' : 'nu s-a deschis');
  cer('  arată încasările de la elevi', !!f2 && /Achitat Ion/.test(f2.textContent));
  cer('  arată ce ai dus la școală', !!f2 && /chitanța 44/.test(f2.textContent));

  console.log('');
  rez.forEach(([s2, n, dt]) => console.log('  ' + s2 + ' ' + n.padEnd(32) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
