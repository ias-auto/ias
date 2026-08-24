/* Elevul plecat o perioadă: nu apare la programare cât lipsește, reapare exact
   în ziua întoarcerii, iar planul îl sare.
   Scenariul lui: „pleacă mâine pentru 4 zile" → reapare sâmbătă.            */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');

const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const azi = zi(0), maine = zi(1), ultimaLipsa = zi(4), revine = zi(5);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [
  { id: 's1', name: 'Prezent Ana', lastName: 'Prezent', firstName: 'Ana', includedHours: 8, weeklyLimit: 7, payments: [] },
  { id: 's2', name: 'Plecat Barbu', lastName: 'Plecat', firstName: 'Barbu', includedHours: 8, weeklyLimit: 7,
    plecatDin: maine, plecatPana: ultimaLipsa, payments: [] },
  // plecat chiar de azi: fișa ședinței se deschide pe ziua de azi, deci pe el
  // îl putem verifica fără să umblăm la calendar
  { id: 's3', name: 'Lipsa Cezar', lastName: 'Lipsa', firstName: 'Cezar', includedHours: 8, weeklyLimit: 7,
    plecatDin: azi, plecatPana: ultimaLipsa, payments: [] },
  // s-a întors ieri: azi trebuie să fie din nou în listă
  { id: 's4', name: 'Intors Dan', lastName: 'Intors', firstName: 'Dan', includedHours: 8, weeklyLimit: 7,
    plecatDin: zi(-5), plecatPana: zi(-1), payments: [] },
];

/* ---- 1. planificatorul, pe codul din sursă ---- */
const src = fs.readFileSync('parti/aplicatie.js', 'utf8');
const linii = src.split('\n');
const start = linii.findIndex(l => /^function uk\(/.test(l));
let adanc = 0, stop = start;
for (let i = start; i < linii.length; i++) {
  for (const ch of linii[i]) { if (ch === '{') adanc++; else if (ch === '}') adanc--; }
  if (adanc === 0 && i > start) { stop = i; break; }
}
const cod = linii.slice(0, 140).join('\n') + '\n' + linii.slice(200, start).join('\n') + '\n'
  + linii.slice(start, stop + 1).join('\n');
const mediu = {};
new Function('exports', cod + '\n;exports.uk = uk;')(mediu);

const plan = mediu.uk({
  students: students.map(s => ({
    id: s.id, name: s.name, remaining: 8, weeklyLimit: 7, includeRezerva: true,
    plecatDin: s.plecatDin, plecatPana: s.plecatPana,
  })),
  existingSessions: [],
  settings: { workDays: [0, 1, 2, 3, 4, 5, 6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, examStudents: [], horizonDays: 10, locations: [] },
  fromDateISO: azi,
});
const alePlecatului = plan.proposals.filter(p => p.studentId === 's2');
const inLipsa = alePlecatului.filter(p => p.date >= maine && p.date <= ultimaLipsa);
cer('planul nu-l programează cât lipsește', inLipsa.length === 0,
  inLipsa.length ? inLipsa.map(p => p.date).join(', ') : `${maine} … ${ultimaLipsa} — nicio ședință`);
cer('planul îl programează după întoarcere', alePlecatului.some(p => p.date >= revine),
  (alePlecatului.filter(p => p.date >= revine)[0] || {}).date || 'niciuna');
cer('celălalt elev nu e afectat', plan.proposals.some(p => p.studentId === 's1' && p.date >= maine && p.date <= ultimaLipsa));

/* ---- 2. lista de la programare, în aplicația pornită ---- */
const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [],
      settings: { workDays: [0, 1, 2, 3, 4, 5, 6], startMin: 480, endMin: 1200, currency: 'lei' },
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
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

async function listaDeAzi() {
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(600);
  clic([...doc().querySelectorAll('button')].find(x => /Liber/.test(x.textContent)));
  await pauza(600);
  const foaie = doc().querySelector('.sheet-anim');
  if (!foaie) return null;
  const camp = foaie.querySelector('input[type=date]');
  const ziua = camp ? camp.value : '?';
  clic([...foaie.querySelectorAll('button')].find(b => /Alege elevul|Prezent|Plecat|Lipsa|Intors/.test(b.textContent)));
  await pauza(500);
  const nume = [...doc().querySelectorAll('.sheet-anim button')].map(b => b.textContent.trim())
    .filter(t => /Prezent Ana|Plecat Barbu|Lipsa Cezar|Intors Dan/.test(t));
  return { ziua, nume };
}

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  const r = await listaDeAzi();
  cer('lista se deschide pe ziua de azi', !!r && r.ziua === azi, r ? r.ziua : '—');
  cer('cel plecat azi nu apare',
    !!r && !r.nume.some(t => /Lipsa Cezar/.test(t)),
    r ? (r.nume.join(' | ') || 'listă goală') : '—');
  cer('cel întors ieri apare din nou',
    !!r && r.nume.some(t => /Intors Dan/.test(t)));
  cer('cel care pleacă mâine apare azi',
    !!r && r.nume.some(t => /Plecat Barbu/.test(t)));

  console.log('');
  console.log(`  scenariul: pleacă ${maine}, ultima zi lipsă ${ultimaLipsa}, revine ${revine}`);
  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
