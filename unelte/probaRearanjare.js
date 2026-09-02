/* Rearanjarea zilei: cele confirmate stau pe loc, cele în așteptare se mută
   între ele și sar peste cele fixe.                                         */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- în aplicație ---- */
const students = [
  { id: 's1', name: 'Unu Ana', lastName: 'Unu', firstName: 'Ana', phone: '0722111001', includedHours: 9, weeklyLimit: 9, payments: [] },
  { id: 's2', name: 'Doi Barbu', lastName: 'Doi', firstName: 'Barbu', phone: '0722111002', includedHours: 9, weeklyLimit: 9, payments: [] },
  { id: 's3', name: 'Trei Cezar', lastName: 'Trei', firstName: 'Cezar', phone: '0722111003', includedHours: 9, weeklyLimit: 9, payments: [] },
  { id: 's4', name: 'Patru Dan', lastName: 'Patru', firstName: 'Dan', phone: '0722111004', includedHours: 9, weeklyLimit: 9, payments: [] },
];
/* Scenariul lui: 12:00 în așteptare, 13:30 PROGRAMATĂ, trei ore libere,
   apoi 18:00 în așteptare. Cea de la 12:00 trebuie să poată ajunge oriunde
   între 15:00 și 18:00, iar schimbul între două ședințe să meargă. */
const sessions = [
  { id: 'x1', studentId: 's1', date: azi, startMin: 720, duration: 90, status: 'pending', type: 'included' },
  { id: 'x2', studentId: 's2', date: azi, startMin: 810, duration: 90, status: 'scheduled', type: 'included' },
  { id: 'x3', studentId: 's3', date: azi, startMin: 1080, duration: 90, status: 'pending', type: 'included' },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions,
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei' },
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
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

const P = (tip, y) => new d.window.PointerEvent(tip, { bubbles: true, clientY: y, pointerId: 1 });
const randuri = () => [...fata().querySelectorAll('div')]
  .filter(x => /^\d\d:\d\d/.test(x.textContent.trim()) && x.style.height);
const citeste = () => randuri().map(x => {
  const t = x.textContent.replace(/\s+/g, ' ').trim();
  return t.slice(0, 5) + ' ' + (t.match(/(Unu|Doi|Trei) \w+/) || ['liber'])[0];
});
const trage = async (dela, la) => {
  const r = randuri(), el = r[dela];
  el.dispatchEvent(P('pointerdown', 500));
  await pauza(120);
  el.dispatchEvent(P('pointermove', 500 + 58 * (la - dela)));
  await pauza(180);
  el.dispatchEvent(P('pointerup', 500 + 58 * (la - dela)));
  await pauza(280);
};
const dateSalvate = () => JSON.parse(d.window.localStorage.getItem('ias:app-data')).sessions;

const Se = (m) => String(Math.floor(m/60)).padStart(2,'0') + ':' + String(m%60).padStart(2,'0');

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  /* ---- 1. ținut apăsat pe o ședință intră în rearanjare ---- */
  const rand = [...doc().querySelectorAll('button')].find(x => /Unu Ana/.test(x.textContent));
  rand.dispatchEvent(P('pointerdown', 300));
  await pauza(700);
  cer('ținut apăsat cere confirmarea', /Rearanjezi ziua\?/.test(doc().body.textContent),
    'nimic nu se schimbă până nu confirmi');
  clic([...doc().querySelectorAll('button')].find(x => /^Rearanjează$/.test(x.textContent.trim())));
  await pauza(900);
  cer('  și deschide rearanjarea', /Rearanjează ziua/.test(fata().textContent));

  /* ---- 2. ziua întreagă, cu intervalele libere ---- */
  const laStart = citeste();
  cer('se văd toate intervalele zilei', laStart.length > 5,
    `${laStart.filter(x => !/liber/.test(x)).length} ședințe, ${laStart.filter(x => /liber/.test(x)).length} libere`);
  cer('  butonul apare și cu ședințe programate',
    laStart.some(x => /Doi Barbu/.test(x)), 'cea programată e în listă');

  /* ---- 3. mutare liberă: de la 12:00 într-un interval gol ---- */
  const iDela = laStart.findIndex(x => /Unu Ana/.test(x));
  const iGol = laStart.findIndex((x, k) => /liber/.test(x) && k > iDela + 1);
  await trage(iDela, iGol);
  const dupaMutare = citeste();
  cer('ședința se mută într-un interval liber',
    /Unu Ana/.test(dupaMutare[iGol]) && /liber/.test(dupaMutare[iDela]),
    `${laStart[iDela].slice(0,5)} → ${dupaMutare[iGol].slice(0,5)}`);

  /* ---- 4. schimb între două ședințe ---- */
  const a2 = citeste();
  const iUnu = a2.findIndex(x => /Unu Ana/.test(x));
  const iDoi = a2.findIndex(x => /Doi Barbu/.test(x));
  await trage(iUnu, iDoi);
  const dupaSchimb = citeste();
  cer('două ședințe schimbă locurile',
    /Doi Barbu/.test(dupaSchimb[iUnu]) && /Unu Ana/.test(dupaSchimb[iDoi]),
    `${a2[iUnu].slice(0,5)} ↔ ${a2[iDoi].slice(0,5)}`);
  cer('  cea programată e marcată că trece în așteptare',
    /trece în așteptare/.test(fata().textContent));

  /* ---- 5. confirmarea ---- */
  const inainte = dateSalvate();
  clic([...fata().querySelectorAll('button')].find(x => /Confirmă/.test(x.textContent)));
  await pauza(800);
  const dupa = dateSalvate();
  const barbu = dupa.find(x => x.studentId === 's2');
  const ana = dupa.find(x => x.studentId === 's1');
  cer('modificările se salvează doar la confirmare',
    ana.startMin !== inainte.find(x => x.studentId === 's1').startMin,
    'Ana: ' + Se(inainte.find(x => x.studentId === 's1').startMin) + ' → ' + Se(ana.startMin));
  cer('cea programată a trecut în așteptare',
    barbu.status === 'pending', `Barbu: scheduled → ${barbu.status}`);
  const trei = dupa.find(x => x.studentId === 's3');
  cer('  cea neatinsă și-a păstrat statusul', trei.status === 'pending' && trei.startMin === 1080);

  /* ---- 6. anunțurile ---- */
  const anunt = fata();
  cer('se deschid mesajele pentru cei mutați',
    !!anunt && /Anunță elevii mutați/.test(anunt.textContent),
    (anunt.textContent.replace(/\s+/g,' ').match(/\d\d:\d\d\s*→\s*\d\d:\d\d/g) || []).join(', '));
  const wa = [...anunt.querySelectorAll('a')].filter(x => /wa\.me/.test(x.href));
  cer('  fiecare are mesajul lui', wa.length >= 2, wa.length + ' mesaje');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
