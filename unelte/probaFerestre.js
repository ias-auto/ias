/* Ferestrele nu se mai închid din greșeală, câmpul numeric se scrie normal,
   teoreticul se poate nota, iar transferul poartă indicativul instructorului. */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const ieri = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- verificări pe cod, fără browser ---- */
/* Fundalul are acum o atingere, dar una care cere închiderea, nu una care
   închide: nicăieri nu mai cheamă funcția de închidere a ferestrei. */
cer('fundalul nu mai închide ferestrele',
  !/bg-slate-900\/\d+ fade-anim",\s*\n\s*onClick: [a-z]\b/.test(html)
  && /bg-slate-900\/\d+ fade-anim",\s*\n\s*onClick: PA/.test(html));
// în fișierul construit diacriticele sunt scrise cu coduri, nu cu litere
cer('există întrebarea pentru modificări',
  html.includes('Ai modific\\u0103ri nesalvate') && html.includes('Renun\\u021B\\u0103 la modific\\u0103ri'));
cer('listele se derulează la deschidere',
  /@keyframes iasDerulare/.test(html) && /ias-derulare/.test(html));

/* transferul: ședințele plecate poartă indicativul */
const src = fs.readFileSync('parti/aplicatie.js', 'utf8');
const linii = src.split('\n');
const start = linii.findIndex(l => /^function iasIndicativ\(/.test(l));
let adanc = 0, stop = start;
for (let i = start; i < linii.length; i++) {
  for (const ch of linii[i]) { if (ch === '{') adanc++; else if (ch === '}') adanc--; }
  if (adanc === 0 && i > start) { stop = i; break; }
}
const mediu = {};
new Function('exports', linii.slice(start, stop + 1).join('\n') + '\n;exports.f = iasIndicativ; var AA = "IAS";')(mediu);
cer('indicativul din numele tău', mediu.f({ numeleTau: 'Ioan-Adrian Stancu' }) === 'IAS',
  mediu.f({ numeleTau: 'Ioan-Adrian Stancu' }));
cer('  fără nume, marca aplicației', mediu.f({}) === 'IAS');

const students = [
  { id: 's1', name: 'Teoretic Ana', lastName: 'Teoretic', firstName: 'Ana', includedHours: 5, weeklyLimit: 2,
    theoryExamDate: ieri, theoryExamAttempts: 1, payments: [] },
];
const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei',
        numeleTau: 'Ioan-Adrian Stancu', defaultWeeklyLimit: 2 },
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
const inchide = () => foi().forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
const scrie = (camp, val) => {
  const set = Object.getOwnPropertyDescriptor(d.window.HTMLInputElement.prototype, 'value').set;
  set.call(camp, val);
  camp.dispatchEvent(new d.window.Event('input', { bubbles: true }));
};

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  // câmpul de ședințe din Setări: trebuie să se lase golit
  clic([...doc().querySelectorAll('nav button')].find(x => /Setări/.test(x.textContent)));
  await pauza(600);
  clic([...doc().querySelectorAll('button')].find(x => /^Elevi noi/.test(x.textContent.trim())));
  await pauza(600);
  const camp = [...fata().querySelectorAll('input')].find(x => x.value === '2');
  scrie(camp, ''); await pauza(200);
  const golit = camp.value === '';
  scrie(camp, '4'); await pauza(200);
  cer('câmpul se lasă golit și rescris', golit && camp.value === '4',
    `după golire „${golit ? '' : camp.value}", apoi „${camp.value}"`);
  inchide(); await pauza(400);

  // rezultatul la teoretic, pe cardul elevului
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(700);
  const n = [...doc().querySelectorAll('span')].find(x => /Teoretic Ana/.test(x.textContent) && x.textContent.length < 80);
  clic(n && n.closest('button, [role=button]')); await pauza(700);
  const card = fata();
  cer('teoreticul cere rezultatul', !!card && /Examen teoretic ·/.test(card.textContent)
    && /Promovat/.test(card.textContent) && /1 până acum/.test(card.textContent),
    (card.textContent.match(/\d+ până acum/) || [])[0]);
  clic([...card.querySelectorAll('button')].filter(b => /^Promovat$/.test(b.textContent.trim())).pop());
  await pauza(600);
  cer('rezultatul se notează', /promovat/i.test(doc().body.textContent));

  console.log('');
  rez.forEach(([s, x, dt]) => console.log('  ' + s + ' ' + x.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
