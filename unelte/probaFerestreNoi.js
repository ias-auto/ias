/* „Publică acum" și „Generează plan" se deschid ca ferestre adevărate, cu
   aceleași reguli ca toate: fundal propriu, „×", fundalul nu închide.
   Și deschiderile s-au domolit.                                             */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const dur = (nume) => {
  const m = html.match(new RegExp('animation: ' + nume + ' ([0-9.]+)s'));
  return m ? Number(m[1]) : null;
};
cer('ferestrele se deschid domol', dur('slideUp') >= 0.9, dur('slideUp') + 's');
cer('listele se deschid domol', dur('iasDerulare') >= 0.9, dur('iasDerulare') + 's');
cer('fundalul intră lin', dur('fadeIn') >= 0.4, dur('fadeIn') + 's');

const students = [
  { id: 's1', name: 'Elev Unu', lastName: 'Elev', firstName: 'Unu', includedHours: 6, weeklyLimit: 3, payments: [] },
];
const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei' },
      licente: [{ id: 'l1', nume: 'Coleg', prenume: 'Ion', cod: 'IAS-AAAA-BBBB', eticheta: 'CI-CT-XXXX', tip: 'vip', pana: '2099-12-31' }],
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
const buton = (re) => [...doc().querySelectorAll('button')].find(x => re.test(x.textContent.trim()));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  // planul
  clic([...doc().querySelectorAll('nav button')].find(x => /Plan/.test(x.textContent)));
  await pauza(700);
  const inainte = foi().length;
  clic(buton(/Generează plan/)); await pauza(900);
  const f = fata();
  cer('planul se deschide ca fereastră', foi().length > inainte && !!f && /Plan propus/.test(f.textContent),
    f ? (f.textContent.match(/Plan propus[^A-Z]{0,24}/) || [])[0] : 'nu s-a deschis');
  cer('  are „×" de închidere', !!f && !!f.querySelector('button[aria-label="Închide"]'));
  const strat = [...doc().querySelectorAll('.ecran-peste')].pop();
  clic(strat && strat.querySelector('.absolute.inset-0'));
  const aprins = strat && strat.classList.contains('cere-inchidere');
  await pauza(300);
  cer('  fundalul nu o închide, doar semnalează', aprins && foi().length > inainte);
  inchide(); await pauza(600);

  // licențele
  clic([...doc().querySelectorAll('nav button')].find(x => /Setări/.test(x.textContent)));
  await pauza(700);
  clic(buton(/^Licențe/)); await pauza(800);
  const nrLic = foi().length;
  clic(buton(/Publică (acum|fișierul)/)); await pauza(900);
  const g = fata();
  cer('publicarea se deschide ca fereastră', foi().length > nrLic && !!g && /Publică fișierul/.test(g.textContent));
  cer('  arată fișierul de copiat', !!g && /licente\.json/.test(g.textContent) && !!g.querySelector('textarea'));
  cer('  are „×" de închidere', !!g && !!g.querySelector('button[aria-label="Închide"]'));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
