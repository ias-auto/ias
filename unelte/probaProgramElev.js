/* Programul spus chiar de elev: pagina lui, linkul înapoi, punerea pe fișă.
   Exemplul e cel adevărat: luni nu poate, marți între 12 și 15, miercuri nu
   poate între 10 și 13, joi liber toată ziua, vineri de la 16:30, sâmbătă până
   la 11, duminică oricând.
   Rulare:  node probaProgramElev.js   (lângă index.html și disponibilitate.html) */
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
/* Doar ce se vede: fără textul scripturilor, care conține și el aceleași cuvinte. */
const vizibil = (doc) => [...doc.body.children].filter(e => e.tagName !== 'SCRIPT' && e.tagName !== 'STYLE').map(e => e.textContent).join(' ');
const html = fs.readFileSync('index.html', 'utf8');
const pagina = fs.readFileSync('disponibilitate.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const ziCu = (dow) => { const d = new Date(); d.setDate(d.getDate() + ((dow - d.getDay() + 7) % 7 || 7)); return d.toISOString().slice(0, 10); };

const setari = {
  workDays: [0, 1, 2, 3, 4, 5, 6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  defaultWeeklyLimit: 3, rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }],
  programZile: { 1: { startMin: 510, endMin: 1200 }, 2: { startMin: 510, endMin: 1200 }, 3: { startMin: 510, endMin: 1200 },
    4: { startMin: 510, endMin: 1200 }, 5: { startMin: 510, endMin: 1200 }, 6: { startMin: 420, endMin: 1200 }, 0: { startMin: 420, endMin: 1200 } },
  numeleTau: 'Ion Test', numeScoala: 'Școala de Probă', telefonulTau: '0700 111 222', programElevi: true,
};
const elevi = [
  { id: 'stu_proba_1', name: 'Popescu Andrei', lastName: 'Popescu', firstName: 'Andrei', sex: 'm', phone: '0711 222 333',
    includedHours: 20, weeklyLimit: 3, payments: [], availFrom: 840, availTo: 1200,
    tura: '12-24', turaData: '2026-10-20', turaOra: 420, availParity: 'even' },
  { id: 'stu_proba_2', name: 'Ionescu Maria', lastName: 'Ionescu', firstName: 'Maria', sex: 'f',
    includedHours: 20, weeklyLimit: 3, payments: [] },
];

function porneste(url, cuDate, setariAlt) {
  const vc = new VirtualConsole();
  const erori = [];
  vc.on('jsdomError', e => { if (!/navigation|Could not parse CSS|getContext|WebGL/i.test(e.message)) erori.push(e.message); });
  const d = new JSDOM(html, {
    runScripts: 'dangerously', pretendToBeVisual: true, url, virtualConsole: vc,
    beforeParse(w) {
      if (cuDate !== false) w.localStorage.setItem('ias:app-data', JSON.stringify({ students: elevi, sessions: [], settings: setariAlt || setari }));
      w.localStorage.setItem('ias:licenta', JSON.stringify({ cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'] }));
      w.localStorage.setItem('ias:backup', azi);
      w.localStorage.setItem('ias:vazut', JSON.stringify({ versiune: 'v9.0.0' }));
      w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
      w.scrollBy = () => {}; w.scrollTo = () => {};
      w.console.error = (...a) => { const t = a.map(String).join(' '); if (!/WebGL|getContext/.test(t)) erori.push(t.slice(0, 160)); };
    },
  });
  return { d, erori };
}

/* Funcțiile, scoase din codul aplicației și rulate pe curat. */
const linii = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
const bucata = (de, pana) => {
  const i0 = linii.findIndex(l => de.test(l)), i1 = linii.findIndex((l, k) => k > i0 && pana.test(l));
  if (i0 < 0 || i1 < 0) throw new Error('nu găsesc ' + de);
  return linii.slice(i0, i1).join('\n');
};
const w = {};
new Function('exports', 'window', [
  'var si = 90, yo = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];',
  'var Da = n => String(n).padStart(2, "0"), ft = n => `${n.getFullYear()}-${Da(n.getMonth()+1)}-${Da(n.getDate())}`;',
  'var Ue = n => { let [e, t, a] = n.split("-").map(Number); return new Date(e, t - 1, a) }, Se = n => `${Da(Math.floor(n/60))}:${Da(n%60)}`, Be = () => ft(new Date);',
  bucata(/^function qw\(/, /^var Fn = /),
  bucata(/^var Zw = \{/, /^function L0\(/),
  bucata(/^var IAS_FEL_DISP/, /^function bw\(/),
  'Object.assign(exports, { iasLinkCerereProgram, iasDinB64, iasInB64, iasProgramSaptamana, iasDispCiteste, iasProgramElevNou, iasProgramElevCampuri, iasFolosesteProgram, iasRevinoLaProgram, iasPoateAtunci });',
].join('\n'))(w, { location: { href: 'https://ias-auto.github.io/ias/' } });

(async () => {
  /* ---------- 1. linkul cerut din aplicație ---------- */
  const cerere = w.iasLinkCerereProgram(elevi[0], setari);
  cer('linkul pleacă spre pagina elevului', cerere.startsWith('https://ias-auto.github.io/ias/disponibilitate.html#c='), cerere.slice(0, 60) + '…');
  const continut = w.iasDinB64(cerere.split('#c=')[1]);
  cer('  duce doar ce trebuie', continut.e === 'stu_proba_1' && continut.w === '40700111222' && continut.d === 90
    && !JSON.stringify(continut).includes('Popescu') && !JSON.stringify(continut).includes('0711'),
  'cod fișă, numărul tău, durata — fără numele sau telefonul elevului');
  cer('  orele tale pe fiecare zi', JSON.stringify(continut.z[1]) === '[510,1200]' && JSON.stringify(continut.z[6]) === '[420,1200]',
    'luni de la 08:30, sâmbătă de la 07:00');
  const faraDuminica = w.iasProgramSaptamana({ ...setari, workDays: [1, 2, 3, 4, 5, 6] });
  cer('  ziua liberă nu se cere', faraDuminica[0] === 0 && Array.isArray(faraDuminica[1]));

  /* ---------- 2. pagina elevului, cu exemplul adevărat ---------- */
  let copiat = '';
  const P = new JSDOM(pagina, {
    runScripts: 'dangerously', pretendToBeVisual: true, url: cerere,
    beforeParse(pw) {
      Object.defineProperty(pw.navigator, 'clipboard', { value: { writeText: (t) => { copiat = t; return Promise.resolve(); } } });
      pw.HTMLElement.prototype.scrollIntoView = function () {};
    },
  });
  await pauza(300);
  const pd = P.window.document;
  const pclic = (sel) => { const el = pd.querySelector(sel); el && el.dispatchEvent(new P.window.MouseEvent('click', { bubbles: true })); return !!el; };
  const deschide = (z) => { if (!pd.querySelector('#corp-' + z)) pclic(`[data-act="deschide"][data-zi="${z}"]`); };
  cer('pagina arată numele îndrumătorului', /Ion Test/.test(pd.getElementById('intro').textContent) && /Școala de Probă/.test(pd.getElementById('intro').textContent));
  cer('  și cât durează o ședință', /1 oră și 30 de minute/.test(pd.getElementById('sedinta').textContent));
  cer('  luni e deschisă din prima', !!pd.querySelector('#corp-1'));
  cer('  are cele șase feluri din aplicație', pd.querySelectorAll('#corp-1 [data-act="fel"]').length === 6);
  const alte = pd.getElementById('alte').textContent;
  cer('„Altceva de știut”: fără ture și fără zilele lunii', !/ture|Zilele lunii|pare/i.test(alte) && /Lipsesc o perioadă/.test(alte) && /Mai vrei să-i spui ceva/.test(alte));

  // luni: nu pot
  deschide(1); pclic('[data-zi="1"][data-fel="nu"]');
  cer('„Nu pot” trece singur la ziua următoare', !!pd.querySelector('#corp-2'));
  // marți: între 12 și 15
  deschide(2); pclic('[data-zi="2"][data-fel="intre"]');
  const deLaMarti = [...pd.querySelectorAll('[data-zi="2"][data-cap="lo"]')].map(b => +b.dataset.min);
  cer('  orele încep la 08:30 marțea', deLaMarti[0] === 510 && deLaMarti[deLaMarti.length - 1] === 1110, '08:30 … 18:30 (să încapă 1:30 până la 20:00)');
  pclic('[data-zi="2"][data-cap="lo"][data-min="720"]');
  const panaLaMarti = [...pd.querySelectorAll('[data-zi="2"][data-cap="hi"]')].map(b => +b.dataset.min);
  cer('  după 12:00, sfârșitul începe de la 13:30', panaLaMarti[0] === 810, 'ca să încapă o ședință întreagă');
  pclic('[data-zi="2"][data-cap="hi"][data-min="900"]');
  // miercuri: nu pot între 10 și 13
  deschide(3); pclic('[data-zi="3"][data-fel="afara"]');
  pclic('[data-zi="3"][data-cap="lo"][data-min="600"]'); pclic('[data-zi="3"][data-cap="hi"][data-min="780"]');
  // joi: oricând
  deschide(4); pclic('[data-zi="4"][data-fel="oricand"]');
  // vineri: de la 16:30
  deschide(5); pclic('[data-zi="5"][data-fel="dupa"]'); pclic('[data-zi="5"][data-cap="lo"][data-min="990"]');
  // sâmbătă: până la 11
  deschide(6); pclic('[data-zi="6"][data-fel="pana"]');
  const panaSambata = [...pd.querySelectorAll('[data-zi="6"][data-cap="hi"]')].map(b => +b.dataset.min);
  cer('  sâmbăta „până la” începe de la 08:30', panaSambata[0] === 510, 'de la 07:00 + 1:30');
  pclic('[data-zi="6"][data-cap="hi"][data-min="660"]');
  cer('  rămâne o singură zi de ales', /o zi: duminică/.test(pd.getElementById('stare').textContent), pd.getElementById('stare').textContent);
  // duminică: oricând
  deschide(0); pclic('[data-zi="0"][data-fel="oricand"]');
  cer('  toate zilele completate', /Totul e completat/.test(pd.getElementById('stare').textContent));

  const rez7 = [1, 2, 3, 4, 5, 6, 0].map(z => pd.querySelector(`#zi-${z} .zi-rez`).textContent);
  cer('rezumatul de pe pagină', rez7.join(' | ') === 'Nu pot | Între 12:00 și 15:00 | Nu pot între 10:00 și 13:00 | Oricând | De la 16:30 | Până la 11:00 | Oricând', rez7.join(' | '));
  const tronsoane = pd.querySelectorAll('#zi-3 .tronson').length;
  cer('  banda de miercuri are două bucăți', tronsoane === 2, 'înainte de 10 și după 13');

  pclic('#copiaza'); await pauza(50);
  cer('mesajul pentru WhatsApp', /\*Miercuri:\* oricând, mai puțin între 10:00 și 13:00/.test(copiat) && /\*Sâmbătă:\* până la 11:00/.test(copiat));
  const linkInapoi = (copiat.match(/https:\/\/\S+#disp=\S+/) || [''])[0];
  cer('  fără rânduri de ture sau zile pare', !/\*Ture:\*|\*Zilele lunii:\*/.test(copiat));
  const trimis = w.iasDispCiteste(copiat);
  cer('  răspunsul nu atinge tura și zilele de pe fișă', trimis && trimis.tura === null && trimis.par === 'all');
  cer('  se încheie cu linkul spre aplicație', linkInapoi.startsWith('https://ias-auto.github.io/ias/#disp='), linkInapoi.slice(0, 50) + '…');

  /* „Nu pot între” care nu mai lasă loc de ședință e oprit. */
  pclic('[data-act="deschide"][data-zi="4"]'); pclic('[data-zi="4"][data-fel="afara"]');
  pclic('[data-zi="4"][data-cap="lo"][data-min="540"]'); pclic('[data-zi="4"][data-cap="hi"][data-min="1140"]');
  cer('„Nu pot între” fără loc de ședință e semnalat', /nu mai rămâne loc/.test(pd.querySelector('#corp-4').textContent));
  pclic('[data-zi="4"][data-fel="oricand"]');

  /* ---------- 3. răspunsul citit de aplicație ---------- */
  const r = w.iasDispCiteste(copiat);
  const asteptat = { 1: { fel: 'nu' }, 2: { fel: 'intre', lo: 720, hi: 900 }, 3: { fel: 'afara', lo: 600, hi: 780 },
    4: { fel: 'oricand' }, 5: { fel: 'dupa', lo: 990 }, 6: { fel: 'pana', hi: 660 }, 0: { fel: 'oricand' } };
  cer('aplicația înțelege mesajul întreg, lipit', !!r && r.elev === 'stu_proba_1' && JSON.stringify(r.zile) === JSON.stringify(asteptat));
  const pastrat = { ...elevi[0], programElev: w.iasProgramElevNou(r) };
  cer('păstrat deoparte, nu schimbă nimic', pastrat.availFrom === 840 && !pastrat.dispZile && pastrat.programElev.folosit === null);
  const pe = w.iasFolosesteProgram(pastrat);
  const p = (dow, ora) => w.iasPoateAtunci(pe, ziCu(dow), ora, 90);
  cer('folosit în plan: luni nu', !p(1, 600) && !p(1, 1050));
  cer('  marți la 12:00 da, la 13:30 da, la 14:00 nu', p(2, 720) && p(2, 810) && !p(2, 840), 'se termină până la 15:00');
  cer('  miercuri la 08:30 da, la 09:00 nu, la 13:00 da', p(3, 510) && !p(3, 540) && p(3, 780), 'felia 10–13 rămâne liberă');
  cer('  joi oricând', p(4, 510) && p(4, 1110));
  cer('  vineri de la 16:30', !p(5, 960) && p(5, 990));
  cer('  sâmbătă până la 11:00', p(6, 570) && !p(6, 600), '09:30 da, 10:00 nu');
  cer('  regula generală veche (14–20) nu mai încurcă', p(4, 510) && pe.availFrom === '' && pe.availTo === '');
  cer('ce n-a spus elevul rămâne al tău', pe.tura === '12-24' && pe.turaData === '2026-10-20' && pe.availParity === 'even',
    'tura 12 cu 24 și zilele pare, trecute de tine');
  const faraDum = { v: 1, z: Object.fromEntries(Object.entries(r.zile).filter(([z]) => z !== '0').map(([z, x]) => [z, x.fel === 'dupa' ? ['dupa', x.lo] : x.fel === 'pana' ? ['pana', x.hi] : x.lo != null ? [x.fel, x.lo, x.hi] : [x.fel]])) };
  const r2 = w.iasDispCiteste('#disp=' + w.iasInB64(faraDum));
  const pe2 = w.iasFolosesteProgram({ ...elevi[0], programElev: w.iasProgramElevNou(r2) });
  cer('ziua neîntrebată își păstrează regula veche', !w.iasPoateAtunci(pe2, ziCu(0), 600, 90) && w.iasPoateAtunci(pe2, ziCu(0), 900, 90),
    'duminica: tot 14–20');
  const inapoi = w.iasRevinoLaProgram(pe);
  cer('„Revino la ce era” aduce totul înapoi', inapoi.availFrom === 840 && inapoi.availTo === 1200 && !('dispZile' in inapoi)
    && !inapoi.programElevInainte && inapoi.programElev && inapoi.programElev.folosit === null && inapoi.tura === '12-24');
  cer('linkul stricat nu trece', w.iasDispCiteste('#disp=' + w.iasInB64({ v: 1, z: { 1: ['xx'] } })) === null
    && w.iasDispCiteste('#disp=' + w.iasInB64({ v: 1, z: { 9: ['nu'] } })) === null
    && w.iasDispCiteste('#disp=abc!!') === null);

  /* ---------- 4. linkul atins: „Program primit” ---------- */
  const hashRasp = linkInapoi.slice(linkInapoi.indexOf('#'));
  const B = porneste('https://x/' + hashRasp);
  await pauza(3000);
  const bw = B.d.window, bd = bw.document;
  const bclic = (el) => el && el.dispatchEvent(new bw.MouseEvent('click', { bubbles: true }));
  const salvat = () => JSON.parse(bw.localStorage.getItem('ias:app-data')).students;
  let fereastra = [...bd.querySelectorAll('.ecran-peste')].find(f => /Program primit/.test(f.textContent));
  cer('linkul deschide „Program primit”', !!fereastra);
  cer('  adresa se curăță', bw.location.hash === '', bw.location.href);
  cer('  elevul e ales singur, după fișă', fereastra && fereastra.querySelector('select').value === 'stu_proba_1' && /Ales singur/.test(fereastra.textContent));
  cer('  arată ce a trimis și ce s-ar schimba', fereastra && /Ce a trimis/.test(fereastra.textContent)
    && /oricând, mai puțin 10:00–13:00/.test(fereastra.textContent) && /Dacă îl folosești în plan/.test(fereastra.textContent));
  cer('  nimic nu se scrie până nu alegi', !salvat()[0].programElev && !salvat()[0].dispZile);
  bclic(fereastra && [...fereastra.querySelectorAll('button')].find(x => /Doar îl păstrez/.test(x.textContent)));
  await pauza(500);
  let el = salvat()[0];
  cer('„Doar îl păstrez”: stă pe fișă, deoparte', !!el.programElev && el.programElev.folosit === null && JSON.stringify(el.programElev.zile) === JSON.stringify(asteptat));
  cer('  disponibilitatea ta rămâne neatinsă', !el.dispZile && el.availFrom === 840 && el.tura === '12-24');
  bw.location.hash = hashRasp; await pauza(600);
  fereastra = [...bd.querySelectorAll('.ecran-peste')].find(f => /Program primit/.test(f.textContent));
  cer('același link, atins din nou, reapare', !!fereastra);
  bclic(fereastra && [...fereastra.querySelectorAll('button')].find(x => /Folosește-l în plan/.test(x.textContent)));
  await pauza(500);
  el = salvat()[0];
  cer('„Folosește-l în plan”: zilele lui intră în plan', JSON.stringify(el.dispZile) === JSON.stringify(asteptat) && el.availFrom === '' && el.programElev.folosit === azi);
  cer('  tura și zilele pare trecute de tine rămân', el.tura === '12-24' && el.availParity === 'even');
  cer('  ce era înainte e ținut minte', el.programElevInainte && el.programElevInainte.availFrom === 840);
  cer('  celălalt elev rămâne neatins', !salvat()[1].dispZile && !salvat()[1].programElev);
  cer('  fără erori', B.erori.length === 0, B.erori.slice(0, 2).join(' / '));

  /* ---------- 5. în fișă: căsuța ---------- */
  const C = porneste('https://ias-auto.github.io/ias/');
  await pauza(3000);
  const cw = C.d.window, cd = cw.document;
  const cclic = (el) => el && el.dispatchEvent(new cw.MouseEvent('click', { bubbles: true }));
  const butonCu = (re, radacina) => [...(radacina || cd).querySelectorAll('button')].find(x => re.test(x.textContent.trim()));
  const zileFisa = () => [...cd.querySelectorAll('select')].filter(s => [...s.options].some(o => o.value === 'afara')).map(s => s.value).join(',');
  const deschideFisa = async () => {
    cclic([...cd.querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent))); await pauza(700);
    const nume = [...cd.querySelectorAll('span')].find(x => /Popescu Andrei/.test(x.textContent) && x.textContent.length < 60);
    cclic(nume && nume.closest('button, [role=button]')); await pauza(800);
    cclic(butonCu(/Editeaz/)); await pauza(800);
    cclic([...cd.querySelectorAll('button')].find(x => /^Disponibilitate/.test(x.textContent.trim()))); await pauza(400);
  };
  await deschideFisa();
  cer('fișa are căsuța „Programul trimis de elev”', /Programul trimis de elev/.test(vizibil(cd)));
  const zileInitial = zileFisa();
  cclic(butonCu(/^Cere-i programul$/)); await pauza(400);
  const cerereF = [...cd.querySelectorAll('.ecran-peste')].find(f => /Cere-i programul/.test(f.querySelector('h2') ? f.querySelector('h2').textContent : ''));
  const wa = cerereF && [...cerereF.querySelectorAll('a')].find(a => /WhatsApp/.test(a.textContent));
  const textWa = wa ? decodeURIComponent((wa.getAttribute('href') || '').split('text=')[1] || '') : '';
  cer('  cererea pleacă pe WhatsApp-ul elevului', wa && /wa\.me\/40711222333\?/.test(wa.getAttribute('href')));
  cer('  cu salut acordat și cu linkul', /^Salut, Andrei!/.test(textWa) && /disponibilitate\.html#c=/.test(textWa), textWa.slice(0, 40) + '…');
  cclic(cerereF && cerereF.querySelector('button[aria-label="Închide"]')); await pauza(300);

  cclic(butonCu(/Lipește răspunsul/)); await pauza(200);
  const zona = [...cd.querySelectorAll('textarea')].find(t => /mesajul primit de la elev/.test(t.placeholder));
  const pune = Object.getOwnPropertyDescriptor(cw.HTMLTextAreaElement.prototype, 'value').set;
  pune.call(zona, 'ceva fără link'); zona.dispatchEvent(new cw.Event('input', { bubbles: true })); await pauza(150);
  cer('  textul fără link primește o explicație', /Nu găsesc în text/.test(vizibil(cd)));
  pune.call(zona, copiat); zona.dispatchEvent(new cw.Event('input', { bubbles: true })); await pauza(200);
  cclic(butonCu(/Păstrează-l pe fișă/)); await pauza(300);
  cer('  lipit, stă în căsuță, nefolosit', /nefolosit încă/.test(vizibil(cd)) && zileFisa() === zileInitial, zileFisa());
  cclic(butonCu(/^Folosește-l în plan$/)); await pauza(200);
  cer('  înainte de folosire îți arată ce se schimbă', /se schimbă doar ce a spus elevul/.test(vizibil(cd)));
  cclic(butonCu(/Da, folosește-l/)); await pauza(300);
  cer('  folosit: zilele lui apar în fișă', zileFisa() === 'nu,intre,afara,oricand,dupa,pana,oricand', zileFisa());
  cclic(butonCu(/Revino la ce era/)); await pauza(300);
  cer('  „Revino la ce era” le scoate la loc', zileFisa() === zileInitial && /nefolosit încă/.test(vizibil(cd)), zileFisa());
  cclic(butonCu(/^Folosește-l în plan$/)); await pauza(200); cclic(butonCu(/Da, folosește-l/)); await pauza(300);
  cer('  nimic nu se păstrează până la salvare', !JSON.parse(cw.localStorage.getItem('ias:app-data')).students[0].programElev);
  cclic(butonCu(/Salvează modificările/)); await pauza(500);
  const dupaSalvare = JSON.parse(cw.localStorage.getItem('ias:app-data')).students[0];
  cer('  după salvare: folosit, cu ce era înainte ținut minte', JSON.stringify(dupaSalvare.dispZile) === JSON.stringify(asteptat)
    && dupaSalvare.programElev && dupaSalvare.programElevInainte && dupaSalvare.tura === '12-24');
  cer('  fără erori', C.erori.length === 0, C.erori.slice(0, 2).join(' / '));

  /* ---------- 8. întrerupătorul oprit ---------- */
  const oprit = { ...setari, programElevi: false };
  const D = porneste('https://x/' + hashRasp, true, oprit);
  const dw = D.d.window, dd = dw.document;
  let deCe = false;
  for (let i = 0; i < 12 && !deCe; i++) { await pauza(250); deCe = /funcția e oprită/.test(vizibil(dd)); }
  await pauza(1500);
  const dclic = (el) => el && el.dispatchEvent(new dw.MouseEvent('click', { bubbles: true }));
  cer('oprit: linkul nu deschide nimic', ![...dd.querySelectorAll('.ecran-peste')].some(f => /Program primit/.test(f.textContent)));
  cer('  dar spune de ce', deCe);
  cer('  și nu scrie nimic', !JSON.parse(dw.localStorage.getItem('ias:app-data')).students[0].programElev);
  dclic([...dd.querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent))); await pauza(700);
  const numeD = [...dd.querySelectorAll('span')].find(x => /Popescu Andrei/.test(x.textContent) && x.textContent.length < 60);
  dclic(numeD && numeD.closest('button, [role=button]')); await pauza(800);
  dclic([...dd.querySelectorAll('button')].find(x => /Editeaz/.test(x.textContent))); await pauza(800);
  dclic([...dd.querySelectorAll('button')].find(x => /^Disponibilitate/.test(x.textContent.trim()))); await pauza(400);
  cer('  fișa arată ca înainte, fără căsuță', /Regula generală|Zile care ies din tipar|De la/.test(vizibil(dd)) && !/Programul trimis de elev/.test(vizibil(dd)));
  cer('  fără erori', D.erori.length === 0, D.erori.slice(0, 2).join(' / '));

  /* ---------- 6. pagina deschisă fără link ---------- */
  const G = new JSDOM(pagina, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://ias-auto.github.io/ias/disponibilitate.html',
    beforeParse(pw) { pw.HTMLElement.prototype.scrollIntoView = function () {}; } });
  await pauza(200);
  const gd = G.window.document;
  cer('fără link, pagina tot merge și spune de ce', !gd.getElementById('aviz').hidden && gd.querySelectorAll('.zi:not(.inchisa)').length === 7);

  /* ---------- 7. lucrătorul de fundal ---------- */
  const sw = fs.readFileSync('sw.js', 'utf8');
  const asc = {}; const memorat = [];
  const self = { location: { origin: 'https://ias-auto.github.io' }, addEventListener: (t, f) => { asc[t] = f; }, skipWaiting() {}, clients: { claim() {} } };
  const caches = { open: async () => ({ put: (k) => memorat.push(k), addAll: async () => {} }), match: async () => null, keys: async () => [] };
  new Function('self', 'caches', 'fetch', sw)(self, caches, async () => ({ clone() { return this; } }));
  let raspunsuri = 0;
  const navigheaza = (url) => asc.fetch({ request: { method: 'GET', url, mode: 'navigate' }, respondWith: (p) => { raspunsuri++; return p; } });
  navigheaza('https://ias-auto.github.io/ias/disponibilitate.html#c=x');
  cer('pagina elevului nu se mai salvează peste aplicație', raspunsuri === 0);
  navigheaza('https://ias-auto.github.io/ias/'); navigheaza('https://ias-auto.github.io/ias/index.html');
  cer('  aplicația se ține minte ca înainte', raspunsuri === 2);

  console.log('');
  rez.forEach(([s, n, d]) => console.log(`  ${s} ${n.padEnd(48)}${d}`));
  const bune = rez.filter(x => x[0] === '✓').length;
  console.log(`\n  ${bune} din ${rez.length} verificări`);
  process.exit(bune === rez.length ? 0 : 1);
})();
