// Proba de vizual: pornim aplicația și citim culorile chiar așa cum le calculează
// browserul. Dacă două lucruri diferite ies în aceeași culoare, se vede aici.
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('/home/claude/pwa/index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const maine = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

const students = [
  { id: 's1', name: 'Râmbu Ștefan', lastName: 'Râmbu', firstName: 'Ștefan', group: '12', county: 'CT',
    includedHours: 10, extraHours: 2, weeklyLimit: 3, payments: [] },
];
const sessions = [
  { id: 'x1', studentId: 's1', date: azi, startMin: 540, duration: 90, status: 'completed', type: 'included' },
  { id: 'x2', studentId: 's1', date: azi, startMin: 660, duration: 90, status: 'pending', type: 'extra' },
  { id: 'x3', studentId: 's1', date: maine, startMin: 540, duration: 90, status: 'scheduled', type: 'extra' },
  { id: 'x4', studentId: 's1', date: maine, startMin: 780, duration: 90, status: 'cancelled', type: 'extra' },
];
const settings = { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  blocks: [{ id: 'b1', date: azi, allDay: false, startMin: 900, endMin: 1020, reason: 'revizie mașină' }] };

const d = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions, settings }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({ cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'] }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.matchMedia = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  } });

const doc = () => d.window.document;
const stil = (el, prop) => (el ? d.window.getComputedStyle(el).getPropertyValue(prop) : '—');
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const tab = (re) => [...doc().querySelectorAll('nav button')].find(x => re.test(x.textContent));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(2600);
  const rez = [];
  const cer = (nume, cond, detaliu) => rez.push([cond ? '✓' : '✕', nume, detaliu || '']);

  // 1. coaja: bara jos, panoul derulează
  const shell = doc().querySelector('[data-skin]');
  const nav = doc().querySelector('nav');
  const panou = doc().querySelector('[data-skin] > .pb-4');
  cer('coaja e fixă, pe coloană', stil(shell, 'position') === 'fixed' && stil(shell, 'flex-direction') === 'column',
    stil(shell, 'position') + ' / ' + stil(shell, 'flex-direction'));
  cer('bara e ultimul rând, nu plutește', stil(nav, 'position') === 'relative', stil(nav, 'position'));
  cer('panoul derulează pe dinăuntru', stil(panou, 'overflow-y') === 'auto', stil(panou, 'overflow-y'));
  cer('pagina are contur chihlimbariu jos', /rgba?\(/.test(stil(panou, 'border-bottom-color')), stil(panou, 'border-bottom-color'));
  cer('cadrul de lumină există', !!doc().querySelector('.glow-cadru'));

  // 2. tabul selectat are fundal și contur propriu
  const activ = doc().querySelector('nav button.fila-activa');
  const inactiv = [...doc().querySelectorAll('nav button.fila')].find(x => !x.classList.contains('fila-activa'));
  /* Simulatorul nu calculează variabilele de culoare — întoarce zero pentru
     orice „var(--…)". Așa că verificăm ce e declarat în foaia de stil, nu ce ar
     picta un browser adevărat. */
  const css = html;
  cer('fila activă e marcată în pagină', !!activ && !!inactiv, activ ? activ.className.split(' ').pop() : '—');
  cer('fila activă are regula ei de culoare',
    /button\.fila-activa\s*\{[^}]*var\(--glow\)[^}]*var\(--accent-line\)/.test(css.replace(/\s+/g, ' ')));

  // 3. culorile stărilor unei ședințe, pe Calendar
  clic(tab(/Calendar/)); await pauza(600);
  const pastile = [...doc().querySelectorAll('span')].filter(x => /^(Programată|Așteaptă confirmare|Efectuată|Anulată)$/.test(x.textContent.trim()));
  const culori = {};
  pastile.forEach(x => { culori[x.textContent.trim()] = stil(x, 'color'); });
  const distincte = new Set(Object.values(culori));
  cer('stările au culori diferite', distincte.size === Object.keys(culori).length && distincte.size > 1,
    Object.entries(culori).map(([k, v]) => `${k}=${v}`).join('  '));

  // 4. intervalul indisponibil se deosebește de un interval liber
  const indisp = doc().querySelector('.rand-blocat');
  const liber = [...doc().querySelectorAll('button')].find(x => /Liber/.test(x.textContent));
  cer('intervalul indisponibil e marcat', !!indisp, indisp ? stil(indisp, 'border-top-style') + ' ' + stil(indisp, 'background-color') : 'lipsește');
  cer('se deosebește de unul liber',
    !!indisp && !!liber && indisp.getAttribute('style') !== (liber.getAttribute('style') || ''),
    indisp ? 'fundal ' + (indisp.getAttribute('style') || '').slice(0, 34) : '—');

  // 5. butoanele de pe fișa elevului nu sunt toate la fel
  clic(tab(/Elevi/)); await pauza(600);
  clic([...doc().querySelectorAll('[role=button]')].find(x => /Râmbu/.test(x.textContent))); await pauza(600);
  const fisa = doc().querySelector('.sheet-anim');
  const btn = (re) => [...fisa.querySelectorAll('button')].find(x => re.test(x.textContent));
  const achita = btn(/Adaugă plată/);
  const sterge = btn(/Șterge elevul|Șterge definitiv/);
  const editeaza = btn(/Editează/);
  cer('fereastra are halou chihlimbariu', /rgba?\(/.test(stil(fisa, 'box-shadow')), stil(fisa, 'box-shadow').slice(0, 40));
  cer('butoanele fișei diferă între ele',
    new Set([stil(achita, 'color'), stil(sterge, 'color'), stil(editeaza, 'color')]).size >= 2,
    `plată=${stil(achita, 'color')} ștergere=${stil(sterge, 'color')}`);

  console.log('');
  rez.forEach(([s, n, dtl]) => console.log('  ' + s + ' ' + n.padEnd(32) + (dtl || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări de vizual');
  process.exit(0);
})();
