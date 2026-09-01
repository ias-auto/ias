/* Rearanjarea zilei: cele confirmate stau pe loc, cele în așteptare se mută
   între ele și sar peste cele fixe.                                         */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* ---- regula de așezare, verificată pe curat ---- */
const src = fs.readFileSync('parti/aplicatie.js', 'utf8');
const linii = src.split('\n');
const i0 = linii.findIndex(l => /^function iasOrdineNoua\(/.test(l));
let adanc = 0, i1 = i0;
for (let i = i0; i < linii.length; i++) {
  for (const ch of linii[i]) { if (ch === '{') adanc++; else if (ch === '}') adanc--; }
  if (adanc === 0 && i > i0) { i1 = i; break; }
}
const mediu = {};
new Function('exports', linii.slice(i0, i1 + 1).join('\n') + '\n;exports.f = iasOrdineNoua;')(mediu);
const ordoneaza = mediu.f;

cer('mutarea de pe 3 pe 4 le schimbă între ele',
  JSON.stringify(ordoneaza(['a','b','c','d'], 2, 3)) === JSON.stringify(['a','b','d','c']),
  ordoneaza(['a','b','c','d'], 2, 3).join(''));
cer('mutarea de pe 7 pe 2 le împinge în jos',
  JSON.stringify(ordoneaza(['1','2','3','4','5','6','7'], 6, 1)) === JSON.stringify(['1','7','2','3','4','5','6']),
  ordoneaza(['1','2','3','4','5','6','7'], 6, 1).join(''));

/* ---- în aplicație ---- */
const students = [
  { id: 's1', name: 'Unu Ana', lastName: 'Unu', firstName: 'Ana', phone: '0722111001', includedHours: 9, weeklyLimit: 9, payments: [] },
  { id: 's2', name: 'Doi Barbu', lastName: 'Doi', firstName: 'Barbu', phone: '0722111002', includedHours: 9, weeklyLimit: 9, payments: [] },
  { id: 's3', name: 'Trei Cezar', lastName: 'Trei', firstName: 'Cezar', phone: '0722111003', includedHours: 9, weeklyLimit: 9, payments: [] },
  { id: 's4', name: 'Patru Dan', lastName: 'Patru', firstName: 'Dan', phone: '0722111004', includedHours: 9, weeklyLimit: 9, payments: [] },
];
// 08:00 în așteptare · 09:30 CONFIRMATĂ · 11:00 în așteptare · 12:30 în așteptare
const sessions = [
  { id: 'x1', studentId: 's1', date: azi, startMin: 480, duration: 90, status: 'pending', type: 'included' },
  { id: 'x2', studentId: 's2', date: azi, startMin: 570, duration: 90, status: 'scheduled', type: 'included' },
  { id: 'x3', studentId: 's3', date: azi, startMin: 660, duration: 90, status: 'pending', type: 'included' },
  { id: 'x4', studentId: 's4', date: azi, startMin: 750, duration: 90, status: 'pending', type: 'included' },
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

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(800);

  const buton = [...doc().querySelectorAll('button')].find(x => /Rearanjează ziua/.test(x.textContent));
  cer('butonul de rearanjare apare', !!buton);
  clic(buton); await pauza(900);

  const f = fata();
  cer('fereastra se deschide', !!f && /Rearanjează ziua/.test(f.textContent));
  cer('  cele confirmate sunt marcate fixe', !!f && /fixă/.test(f.textContent),
    (f.textContent.match(/Doi Barbu\s*fixă/) || [])[0] || '');
  cer('  spune cum se mută', !!f && /Cele confirmate stau pe loc și sunt sărite/.test(f.textContent));

  // tragem ultima ședință în așteptare peste prima
  /* Se văd acum și orele libere ale zilei, nu doar ședințele: acolo se pot muta. */
  const randuri = [...f.querySelectorAll('div')].filter(x => /^\d\d:\d\d/.test(x.textContent.trim()));
  const cuElev = randuri.filter(x => /Unu|Doi|Trei|Patru/.test(x.textContent));
  const goale = randuri.length - cuElev.length;
  cer('  se văd ședințele și orele libere', cuElev.length === 4 && goale > 0,
    `${cuElev.length} ședințe, ${goale} ore libere`);
  // tragem ultima ședință în așteptare peste prima
  const ultima = cuElev[cuElev.length - 1];
  const P = (tip, y) => new d.window.PointerEvent(tip, { bubbles: true, clientY: y, pointerId: 1 });
  const pasi = randuri.indexOf(ultima);
  ultima.dispatchEvent(P('pointerdown', 600));
  await pauza(120);
  ultima.dispatchEvent(P('pointermove', 600 - 58 * pasi));
  await pauza(200);
  ultima.dispatchEvent(P('pointerup', 600 - 58 * pasi));
  await pauza(300);

  const dupa = [...fata().querySelectorAll('div')].filter(x => /^\d\d:\d\d/.test(x.textContent.trim()))
    .map(x => x.textContent.trim().slice(0, 5) + ' ' + (x.textContent.match(/(Unu|Doi|Trei|Patru) \w+/) || [''])[0])
    .filter(x => x.trim().length > 6);
  cer('ordinea s-a schimbat sub deget', /Patru/.test(dupa[0]), dupa.join(' | '));
  cer('  confirmata a rămas la ora ei', dupa.some(x => /^09:30 Doi/.test(x)));

  const salv = [...fata().querySelectorAll('button')].find(b => /Păstrează/.test(b.textContent));
  clic(salv); await pauza(800);
  cer('se salvează', /rearanjată/.test(doc().body.textContent));

  /* ---- înștiințările pentru cei mutați ---- */
  const anunt = fata();
  cer('se deschid mesajele pentru cei mutați',
    !!anunt && /Anunță elevii mutați/.test(anunt.textContent));
  cer('  arată ora veche și pe cea nouă',
    !!anunt && /12:30\s*→\s*08:00/.test(anunt.textContent.replace(/\s+/g, ' ')),
    (anunt.textContent.replace(/\s+/g,' ').match(/\d\d:\d\d\s*→\s*\d\d:\d\d/g) || []).join(', '));
  const wa = [...anunt.querySelectorAll('a')].filter(a2 => /wa\.me/.test(a2.href));
  cer('  fiecare are mesajul lui gata scris', wa.length >= 1,
    wa.length + ' mesaje pe WhatsApp');
  cer('  mesajul spune că s-a mutat',
    wa.length > 0 && /mutat/.test(decodeURIComponent(wa[0].href)),
    (decodeURIComponent(wa[0].href).match(/text=(.{0,52})/) || [])[1]);
  cer('  ține socoteala celor anunțați', /0 din \d+ anunțați/.test(anunt.textContent));
  clic(wa[0]); await pauza(300);
  cer('  bifează cine a fost anunțat', /1 din \d+ anunțați/.test(fata().textContent));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
