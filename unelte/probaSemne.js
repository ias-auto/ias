/* Fiecare stare poartă indicatorul rutier adevărat, cu forma lui adevărată.   */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students: [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
        includedHours: 10, weeklyLimit: 5, payments: [] }],
      sessions: [{ id: 'x1', studentId: 's1', date: azi, startMin: 600, duration: 90,
        status: 'scheduled', type: 'included' }],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90,
        stepMin: 30, currency: 'lei' },
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
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

/* Cum arată fiecare semn în realitate, pe șosea. */
const asteptat = {
  'Programată': { forma: 'polygon', nume: 'romb galben — drum cu prioritate',
    verifica: (svg) => svg.querySelectorAll('polygon').length === 2
      && !svg.querySelector('circle')
      && /20,2 38,20 20,38 2,20/.test(svg.innerHTML) },
  'Așteaptă': { forma: 'polygon', nume: 'triunghi — alte pericole',
    verifica: (svg) => !!svg.querySelector('polygon')
      && /20,3/.test(svg.innerHTML) },
  'Efectuată': { forma: 'circle', nume: 'cerc tăiat oblic — sfârșitul restricțiilor',
    verifica: (svg) => !!svg.querySelector('circle')
      && svg.querySelectorAll('line').length >= 3 },
  'Anulată': { forma: 'circle', nume: 'cerc cu bară — accesul interzis',
    verifica: (svg) => !!svg.querySelector('circle')
      && !svg.querySelector('polygon')
      && !!svg.querySelector('rect') },
};

(async () => {
  await pauza(3000);
  [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
    clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(500);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(900);
  clic([...doc().querySelectorAll('button')].find(x => /Test Elev/.test(x.textContent)));
  await pauza(1000);

  const f = fata();
  const patrate = [...f.querySelectorAll('button')].filter(x => x.getAttribute('aria-pressed') !== null);
  cer('cele patru stări au fiecare semnul ei', patrate.length === 4,
    patrate.map(x => x.textContent.trim()).join(' · '));

  patrate.forEach(b => {
    const nume = b.textContent.trim();
    const cheie = Object.keys(asteptat).find(k => nume.indexOf(k) >= 0);
    const svg = b.querySelector('svg');
    if (!cheie || !svg) { cer(`  ${nume}`, false, 'n-am găsit semnul'); return }
    cer(`  ${cheie}`, asteptat[cheie].verifica(svg), asteptat[cheie].nume);
  });

  /* anume pentru greșeala găsită: octogonul e STOP, nu „interzis" */
  const anulata = patrate.find(x => /Anulat/.test(x.textContent));
  const svgA = anulata && anulata.querySelector('svg');
  cer('anulata nu mai e octogon', !!svgA && !/13,2 27,2 38,13/.test(svgA.innerHTML),
    'octogonul e forma lui STOP, altă poveste');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(34) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
