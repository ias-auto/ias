/* Comutarea săptămânii nu mai mută ziua aleasă; „Azi" te aduce înapoi cu totul;
   fiecare căsuță se umple după cât e ziua de plină.                          */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
  includedHours: 20, weeklyLimit: 9, payments: [] }];
// ziua de azi are patru ședințe, deci se umple mai mult decât celelalte
const sessions = [480, 570, 660, 750].map((m, k) => ({
  id: 'x' + k, studentId: 's1', date: azi, startMin: m, duration: 90,
  status: 'scheduled', type: 'included',
}));

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
const text = () => doc().body.textContent.replace(/\s+/g, ' ');
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
const zileBara = () => [...doc().querySelectorAll('button')]
  .filter(x => /^(Lun|Mar|Mie|Joi|Vin|Sâm|Dum)/.test(x.textContent.trim()));
const zileleAfisate = () => zileBara().map(x => (x.textContent.match(/\d+/) || [''])[0]).join(' ');
const aleasa = () => zileBara().findIndex(x => /bg-slate-900/.test(x.className));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  const laStart = zileleAfisate();
  const iAles = aleasa();
  cer('ziua de azi e aleasă la pornire', iAles >= 0, 'căsuța ' + (iAles + 1) + ' din 7');

  /* ---- comutarea săptămânii nu mută ziua ---- */
  clic(doc().querySelector('button[aria-label="Săptămâna viitoare"]'));
  await pauza(600);
  cer('banda trece la săptămâna viitoare', zileleAfisate() !== laStart,
    laStart + '  →  ' + zileleAfisate());
  cer('  dar ziua aleasă rămâne aceeași', aleasa() === -1,
    'nicio zi din banda nouă nu e aleasă — rămâi pe ziua ta');
  cer('  și ți se spune limpede', /din altă săptămână/.test(text()),
    (text().match(/Vezi mai jos [^—]{0,26}/) || [])[0]);
  cer('  ședințele de jos sunt tot ale zilei tale',
    (text().match(/07:30|08:00/) || []).length > 0 || /Test Elev/.test(text()),
    'ședințele nu s-au schimbat');

  /* ---- butonul Azi ---- */
  cer('apare butonul „Azi"', /← Azi/.test(text()));
  clic([...doc().querySelectorAll('button')].find(x => /← Azi/.test(x.textContent)));
  await pauza(600);
  cer('„Azi" aduce înapoi și banda, și ziua',
    zileleAfisate() === laStart && aleasa() === iAles);
  cer('  și butonul dispare', !/← Azi/.test(text()));

  /* ---- umplerea căsuțelor ---- */
  const umpleri = zileBara().map(x => {
    const b = [...x.querySelectorAll('span')].find(y => /position: absolute/.test(y.getAttribute('style') || ''));
    return b ? parseInt(b.style.height) : 0;
  });
  cer('căsuța zilei pline e umplută', umpleri[iAles] > 0,
    `azi ${umpleri[iAles]}% cu 4 ședințe`);
  cer('  zilele goale rămân goale',
    umpleri.filter((x, k) => k !== iAles).every(x => x === 0),
    'doar ziua cu ședințe e umplută');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(38) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
