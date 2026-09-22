/* Rezerva de examen e oprită din pornire și se pornește doar dacă o ceri.
   Oprită, planul programează toate orele elevului.                          */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- socoteala, pe curat ---- */
const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const i0 = linii.findIndex(l => /^var Nf = 3,/.test(l));
let i1 = i0;
while (!/^\s+ho = n =>/.test(linii[i1])) i1++;
const m = {};
new Function('exports', linii.slice(i0, i1 + 1).join('\n') + '\n;exports.r = iasRezerva;')(m);

cer('din pornire nu se păstrează nimic', m.r({}) === 0,
  'elevul își face toate ședințele — cum cere legea');
cer('  nici dacă are alte setări', m.r({ startMin: 480, rezervaExamen: 3 }) === 0,
  'numărul singur nu o pornește');
cer('pornită, ține câte ai spus', m.r({ rezervaActiva: !0, rezervaExamen: 2 }) === 2);
cer('  pornită fără număr, ține trei', m.r({ rezervaActiva: !0 }) === 3, 'valoarea de pornire');
cer('  nu trece de zece', m.r({ rezervaActiva: !0, rezervaExamen: 99 }) === 10);

/* ---- în aplicație ---- */
const students = [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
  includedHours: 15, weeklyLimit: 5, payments: [] }];
const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei' },
    }));
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

  /* Bifa „include și ședințele rezervate" din Plan apare doar când chiar ai
     ceva rezervat — o verificăm pe cod, fiindcă pe ecran iese abia după ce
     deschizi panoul de limite. */
  const src = fs.readFileSync('parti/aplicatie.js', 'utf8');
  cer('bifa din Plan e legată de rezervă',
    /iasRezerva\(n\.settings\) > 0 && o\.default\.createElement\("div", \{\s*\n\s*className: "flex items-center gap-3 px-3\.5 pb-2\.5"/.test(src),
    'nu apare cât rezerva e oprită');

  clic([...doc().querySelectorAll('nav button')].find(x => /Setări/.test(x.textContent)));
  await pauza(800);
  const rand = (re) => [...doc().querySelectorAll('button')]
    .find(x => re.test(x.textContent.trim()) && !x.closest('.sheet-anim'));
  // comutatorul stă în „Program de lucru", lângă pauze și orele pe zile
  clic(rand(/^Program de lucru/)); await pauza(800);
  const f = fata();
  cer('comutatorul e în Setări', /Păstrează ședințe pentru examen/.test(f.textContent));
  const bifa = [...f.querySelectorAll('input[type=checkbox]')]
    .find(x => /Păstrează ședințe/.test(x.closest('label') ? x.closest('label').textContent : ''));
  cer('  și e nebifat din pornire', !!bifa && !bifa.checked);
  cer('  fără câmpul de număr cât e oprit', !/Câte ședințe păstrezi/.test(f.textContent));

  clic(bifa); await pauza(500);
  const g = fata();
  cer('bifat, apare câte păstrezi', /Câte ședințe păstrezi/.test(g.textContent),
    'cu trei ca valoare de pornire');
  cer('  și explică ce face fiecare stare',
    /toate orele elevului/.test(g.textContent) && /zilele dinaintea examenului/.test(g.textContent));

  cer('și explicația ei se leagă tot de rezervă',
    /iasRezerva\(n\.settings\) > 0 && o\.default\.createElement\("p", \{/.test(src),
    'nici textul nu apare degeaba');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(40) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
