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

/* ---- socoteala schimbului și a împingerii, verificată pe curat ---- */
{
  const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
  const i0 = linii.findIndex(l => /^function iasSchimbaLocuri\(/.test(l));
  const i1 = linii.findIndex(l => /^function IasZiRearanjata\(/.test(l));
  const m = {};
  new Function('exports', linii.slice(i0, i1).join('\n') + '\n;exports.s = iasSchimbaLocuri; exports.i = iasImpingeLant;')(m);
  const sl = [720, 750, 780, 810, 840, 870];
  const asez = { 720: 'A', 780: 'B', 810: 'C' };
  const sch = m.s(asez, 'A', 780);
  cer('schimbul mută doar cele două', sch[780] === 'A' && sch[720] === 'B' && sch[810] === 'C');
  const imp = m.i(asez, sl, 'A', 780);
  cer('împingerea coboară tot lanțul',
    imp && imp[780] === 'A' && imp[810] === 'B' && imp[840] === 'C',
    'A→12:30, B→13:30, C→14:00');
  cer('  fără loc, refuză întreg', m.i({ 720: 'A', 840: 'B', 870: 'C' }, sl, 'A', 840) === null,
    'nicio mutare pe jumătate');
}

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  /* ---- intrarea, fără fereastră ---- */
  const nrFoiInainte = foi().length;
  clic([...doc().querySelectorAll('button')].find(x => /Rearanjează ziua/.test(x.textContent)));
  await pauza(700);
  cer('rearanjarea se face în calendar', foi().length === nrFoiInainte,
    'nicio fereastră nouă');
  cer('  se vede că ești în rearanjare',
    /REARANJARE/i.test(doc().body.textContent)
    && /Ține de mâner și trage/.test(doc().body.textContent));

  const randuri = () => [...doc().querySelectorAll('[data-slot]')];
  const manere = () => randuri().map(r => r.querySelector('span[style*="grab"]')).filter(Boolean);
  cer('  fiecare ședință are mâner', manere().length === 3, `${manere().length} mânere`);
  cer('  se văd și orele libere', randuri().length > 5,
    `${randuri().length} intervale, din care ${randuri().length - 3} libere`);

  /* ---- tragerea, cu balon ---- */
  const P = (tip, y) => new d.window.PointerEvent(tip, { bubbles: true, cancelable: true, clientY: y, pointerId: 1 });
  const oraDinRand = (r) => r.textContent.trim().slice(0, 5);
  const toate = randuri();
  const iDela = toate.findIndex(r => /Unu Ana/.test(r.textContent));
  const iGol = toate.findIndex((r, k) => /liber/.test(r.textContent) && k > iDela);
  // fiecare rând are înălțimea lui; ne prefacem că sunt așezate una sub alta
  let y = 200;
  toate.forEach((r, k) => {
    r.getBoundingClientRect = () => ({ top: 200 + k * 70, bottom: 200 + k * 70 + 62, left: 0, right: 380 });
  });
  const maner = toate[iDela].querySelector('span[style*="grab"]');
  maner.dispatchEvent(P('pointerdown', 200 + iDela * 70 + 30));
  await pauza(150);
  maner.dispatchEvent(P('pointermove', 200 + iGol * 70 + 30));
  await pauza(250);
  const balon = [...doc().querySelectorAll('div')].find(x => /position: fixed/.test(x.getAttribute('style') || '')
    && /\d\d:\d\d/.test(x.textContent));
  cer('balonul arată ora sub deget', !!balon,
    balon ? balon.textContent.trim() : 'nu apare');
  cer('  ora respectă pasul din setări',
    !!balon && /^\d\d:(00|30)/.test(balon.textContent.trim()),
    balon ? balon.textContent.trim().slice(0, 5) : '');
  maner.dispatchEvent(P('pointerup', 200 + iGol * 70 + 30));
  await pauza(300);

  const dupa = randuri();
  cer('ședința se mută în intervalul liber',
    /Unu Ana/.test(dupa[iGol].textContent), oraDinRand(toate[iDela]) + ' → ' + oraDinRand(dupa[iGol]));
  cer('  se vede ora veche și cea nouă', /→/.test(dupa[iGol].textContent),
    (dupa[iGol].textContent.match(/\d\d:\d\d\s*→\s*\d\d:\d\d/) || [])[0]);
  cer('  bara de jos numără modificările', /o modificare|\d+ modificări/.test(doc().body.textContent),
    (doc().body.textContent.match(/o modificare|\d+ modificări/) || [])[0]);

  /* ---- slot ocupat: te întreabă ---- */
  const acum = randuri();
  const iUnu = acum.findIndex(r => /Unu Ana/.test(r.textContent));
  const iDoi = acum.findIndex(r => /Doi Barbu/.test(r.textContent));
  acum.forEach((r, k) => {
    r.getBoundingClientRect = () => ({ top: 200 + k * 70, bottom: 200 + k * 70 + 62, left: 0, right: 380 });
  });
  const m2 = acum[iUnu].querySelector('span[style*="grab"]');
  m2.dispatchEvent(P('pointerdown', 200 + iUnu * 70 + 30));
  await pauza(120);
  m2.dispatchEvent(P('pointermove', 200 + iDoi * 70 + 30));
  await pauza(200);
  m2.dispatchEvent(P('pointerup', 200 + iDoi * 70 + 30));
  await pauza(400);
  cer('slotul ocupat cere o alegere', /Ora e ocupată/.test(doc().body.textContent),
    'schimbă locurile · împinge · renunță');
  cer('  are ambele soluții',
    /Schimbă locurile/.test(doc().body.textContent) && /Împinge-le mai jos/.test(doc().body.textContent));
  clic([...doc().querySelectorAll('button')].find(x => /Schimbă locurile/.test(x.textContent)));
  await pauza(500);
  const dupaSchimb = randuri();
  cer('  schimbul se face în previzualizare',
    /Doi Barbu/.test(dupaSchimb[iUnu].textContent) && /Unu Ana/.test(dupaSchimb[iDoi].textContent));

  /* ---- nimic nu s-a atins încă ---- */
  const inainteDeConfirm = dateSalvate();
  cer('datele reale sunt neatinse până la confirmare',
    inainteDeConfirm.every(x => sessions.some(y => y.id === x.id && y.startMin === x.startMin)),
    'orele din memorie n-au fost schimbate');

  /* ---- confirmarea ---- */
  clic([...doc().querySelectorAll('button')].find(x => /^Confirmă$/.test(x.textContent.trim())));
  await pauza(800);
  const salvat = dateSalvate();
  const barbu = salvat.find(x => x.studentId === 's2');
  cer('confirmarea aplică mutările',
    salvat.some(x => sessions.some(y => y.id === x.id && y.startMin !== x.startMin)),
    'orele s-au schimbat abia acum');
  cer('  cea programată a trecut în așteptare', barbu.status === 'pending',
    `Barbu: scheduled → ${barbu.status}`);
  const anunt = fata();
  cer('  se deschid mesajele pentru cei mutați',
    !!anunt && /Anunță elevii mutați/.test(anunt.textContent));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
