/* Cu tastatura ridicată, ferestrele trebuie să stea în zona rămasă vizibilă,
   iar câmpul de căutare să nu ajungă sub taste.                              */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- ce scrie în foaia de stil și în cod ---- */
cer('fereastra ține de zona vizibilă',
  /\.sheet-wrap \{[^}]*height: var\(--ias-vazut, 100%\)/.test(html)
  && /top: var\(--ias-sus, 0px\)/.test(html));
cer('cu tastatura sus, urcă în capul zonei',
  /html\.ias-tastatura \.sheet-wrap \{[^}]*align-items: flex-start/.test(html));
cer('măsoară zona rămasă', /visualViewport/.test(html) && /--ias-vazut/.test(html));
cer('câmpurile de căutare se aduc în vedere',
  /onFocus: iasAdu/.test(html) && /scrollIntoView\(\{ block: "center"/.test(html));
cer('pragul deosebește tastatura de bara browserului',
  /innerHeight - iasVV\.height\) > 120/.test(html), 'peste 120 de puncte');

/* ---- aplicația pornește cu ecran mic de telefon și tastatură ---- */
const students = [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
  includedHours: 5, weeklyLimit: 3, payments: [] }];
const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei',
        locations: [{ id: 'l1', name: 'OMV Pescărie' }, { id: 'l2', name: 'Parcul Ferdinand' }] },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    // telefon de 390×844, cu tastatură care acoperă 336 de puncte
    Object.defineProperty(w, 'innerHeight', { value: 844, configurable: true });
    const asc = {};
    w.visualViewport = {
      height: 844, offsetTop: 0,
      addEventListener: (t, f) => { asc[t] = f },
      __ridicaTastatura: () => { w.visualViewport.height = 508; asc.resize && asc.resize() },
    };
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  const r = doc().documentElement;
  cer('fără tastatură, zona e tot ecranul',
    r.style.getPropertyValue('--ias-vazut') === '844px',
    r.style.getPropertyValue('--ias-vazut'));
  cer('  și nu e marcat ca tastatură', !r.classList.contains('ias-tastatura'));

  d.window.visualViewport.__ridicaTastatura();
  await pauza(200);
  cer('cu tastatura, zona se strânge',
    r.style.getPropertyValue('--ias-vazut') === '508px',
    r.style.getPropertyValue('--ias-vazut') + ' din 844');
  cer('  aplicația știe că e tastatura sus', r.classList.contains('ias-tastatura'));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(38) + (dt || '')));
  const cazute = rez.filter(x => x[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
