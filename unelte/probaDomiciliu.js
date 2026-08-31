/* Punctul de domiciliu al elevului primește iar toate cele trei feluri:
   coordonate, link de hartă și Plus Code — lung sau scurt.                  */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei',
  // reperul pentru codurile scurte: prima locație cu punct pe hartă
  locations: [{ id: 'l1', name: 'Gara', lat: 44.1598, lng: 28.6347 }],
};
const students = [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
  includedHours: 5, weeklyLimit: 3, payments: [] }];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions: [], settings }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.console.error = () => {};
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const foi = () => [...doc().querySelectorAll('.sheet-anim')];
const fata = () => foi()[foi().length - 1];
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const scrie = (camp, val) => {
  const set = Object.getOwnPropertyDescriptor(d.window.HTMLInputElement.prototype, 'value').set;
  set.call(camp, val);
  camp.dispatchEvent(new d.window.Event('input', { bubbles: true }));
};
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
const campPunct = () => [...fata().querySelectorAll('input')]
  .find(x => /Plus Code/.test(x.placeholder || ''));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(700);
  const n = [...doc().querySelectorAll('span')].find(x => /Test Elev/.test(x.textContent) && x.textContent.length < 80);
  clic(n && n.closest('button, [role=button]')); await pauza(800);
  clic([...fata().querySelectorAll('button')].find(x => /Editeaz/.test(x.textContent)));
  await pauza(900);

  cer('câmpul de punct există', !!campPunct(),
    campPunct() ? campPunct().placeholder : 'lipsește');

  const incearca = async (ce, text, lat, lng) => {
    const c = campPunct();
    if (!c) return cer(ce, false, 'nu găsesc câmpul');
    scrie(c, text);
    await pauza(400);
    // comparăm numerele, nu textul: punctul citit poate avea alte zecimale
    const scris = fata().textContent;
    const m = scris.match(/(4[0-9]\.\d+), (2[0-9]\.\d+)/);
    const aproape = m && Math.hypot(Number(m[1]) - lat, Number(m[2]) - lng) < 0.002;
    cer(ce, !!aproape, m ? `${m[1]}, ${m[2]}` : 'nimic recunoscut');
  };

  await incearca('primește coordonate', '44.1598, 28.6347', 44.1598, 28.6347);
  await incearca('primește link de hartă',
    'https://www.google.com/maps/@44.3167,28.6167,17z', 44.3167, 28.6167);
  await incearca('primește Plus Code lung', '8GPC5J5M+WV', 44.159, 28.634);
  await incearca('primește Plus Code scurt', '5J5M+WV Constanța', 44.159, 28.634);

  console.log('');
  rez.forEach(([s, x, dt]) => console.log('  ' + s + ' ' + x.padEnd(30) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
