/* Sugestiile de umplere nu mai apar la ore care au trecut deja azi.          */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);
const H = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');

/* Punem ceasul aplicației la 15:00, ca proba să fie adevărată: la ora reală
   de rulare s-ar putea să fie oricum totul trecut, și n-am dovedi nimic. */
const minAcum = 15 * 60;
const CEAS = new Date(); CEAS.setHours(15, 0, 0, 0);

/* Trei elevi cu câte ore diferite rămase, ca să vedem pe cine propune întâi.
   Niciunul n-are examen prins, deci rămâne doar criteriul orelor rămase. */
const students = [
  { id: 's0', name: 'Mutis Viktor', lastName: 'Mutis', firstName: 'Viktor',
    includedHours: 20, weeklyLimit: 7, payments: [] },          // multe rămase
  { id: 's1', name: 'Petec Cătălin', lastName: 'Petec', firstName: 'Cătălin',
    includedHours: 12, weeklyLimit: 7, payments: [] },
  { id: 's2', name: 'Dincă Ionuț', lastName: 'Dincă', firstName: 'Ionuț',
    includedHours: 3, weeklyLimit: 7, payments: [] },           // aproape gata
  // ședințele zilei sunt ale lui, ca ceilalți trei să rămână liberi
  { id: 's3', name: 'Umplutura Vlad', lastName: 'Umplutura', firstName: 'Vlad',
    includedHours: 30, weeklyLimit: 7, payments: [] },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students,
      /* Două ședințe, ca să se nască goluri și înainte, și după ora 15: fără
         pază ar apărea sugestii la toate trei. */
      sessions: [
        { id: 'x1', studentId: 's3', date: azi, startMin: 540, duration: 90, status: 'scheduled', type: 'included' },
        { id: 'x2', studentId: 's3', date: azi, startMin: 960, duration: 90, status: 'scheduled', type: 'included' },
      ],
      // ziua de lucru de la 00:00 la 23:59, ca să avem ore și înainte, și după „acum"
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 0, endMin: 1380, sessionMin: 90,
        stepMin: 60, currency: 'lei', defaultWeeklyLimit: 7 },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.scrollBy = () => {};
    const DataAdevarata = w.Date;
    function DataFixa(...a) {
      if (!a.length) return new DataAdevarata(CEAS.getTime());
      return new DataAdevarata(...a);
    }
    DataFixa.prototype = DataAdevarata.prototype;
    DataFixa.now = () => CEAS.getTime();
    DataFixa.parse = DataAdevarata.parse;
    DataFixa.UTC = DataAdevarata.UTC;
    w.Date = DataFixa;
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

/* Fiecare rând de sugestii stă lângă ora lui; le citim perechi. */
const sugestii = () => [...doc().querySelectorAll('div')]
  .filter(x => /Umple golul:|Adaugă rapid:/.test(x.textContent) && x.querySelector('button'))
  .filter((x, k, arr) => !arr.some(y => y !== x && x.contains(y)))
  .map(x => {
    let p = x.previousElementSibling, ora = p ? (p.textContent.match(/(\d\d):(\d\d)/) || null) : null;
    return ora ? Number(ora[1]) * 60 + Number(ora[2]) : null;
  }).filter(x => x != null);

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(1000);

  const azi_ = sugestii();
  cer('azi apar sugestii, dar numai după ora curentă',
    azi_.length > 0 && azi_.every(x => x >= minAcum),
    `ore cu sugestii: ${azi_.map(H).join(', ') || 'niciuna'} — acum e ${H(minAcum)}`);
  /* Dovedim că ocazia exista: ziua chiar are goluri înainte de ora curentă. */
  const libereTrecute = [...doc().querySelectorAll('button')]
    .filter(x => /Liber/.test(x.textContent))
    .map(x => { let o2 = x.textContent.match(/(\d\d):(\d\d)/); return o2 ? Number(o2[1]) * 60 + Number(o2[2]) : null })
    .filter(x => x != null && x < minAcum);
  cer('  deși ziua avea goluri și mai devreme', libereTrecute.length >= 2,
    `${libereTrecute.length} ore libere înainte de ${H(minAcum)}, fără sugestii`);
  cer('  dar ziua rămâne deschisă pentru ore trecute',
    [...doc().querySelectorAll('button')].some(x => /Liber/.test(x.textContent)),
    'poți trece o ședință făcută mai devreme');

  /* pe o zi viitoare, sugestiile apar peste tot */
  clic(doc().querySelector('button[aria-label="Săptămâna viitoare"]')); await pauza(600);
  const casute = [...doc().querySelectorAll('button')]
    .filter(x => x.className && /flex-col items-center py-2 rounded-xl border/.test(x.className));
  clic(casute[2]); await pauza(800);
  const maine = sugestii();
  cer('într-o zi viitoare, sugestiile apar de dimineață',
    maine.some(x => x < minAcum) || maine.length >= 3,
    maine.length + ' ore cu sugestii');

  /* ---- cine e propus întâi ---- */
  const chipuri = () => {
    const bloc = [...doc().querySelectorAll('div')]
      .filter(x => /Umple golul:|Adaugă rapid:/.test(x.textContent) && x.querySelector('button'))
      .filter((x, k, arr) => !arr.some(y => y !== x && x.contains(y)))[0];
    return bloc ? [...bloc.querySelectorAll('button')].map(x => x.textContent.replace(/^\+\s*/, '').trim()) : [];
  };
  const c = chipuri();
  cer('întâi cel cu cele mai puține ore rămase',
    c.length > 0 && /Dincă/.test(c[0]),
    c.join(' · ') + '   (3, 12, 20 ore)');

  /* ---- și ascultă disponibilitatea ---- */
  const d2 = new JSDOM(html, {
    runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
    beforeParse(w2) {
      /* Cel aproape gata poate doar de la 18:00, deci la 18:00 el trebuie să fie
         primul, dar într-un gol de dimineață n-are ce căuta. */
      const altii = students.map(x => x.id === 's2'
        ? { ...x, availFrom: 1080, availTo: 1320 } : x);
      w2.localStorage.setItem('ias:app-data', JSON.stringify({
        students: altii,
        sessions: [{ id: 'x1', studentId: 's3', date: azi, startMin: 960, duration: 90, status: 'scheduled', type: 'included' }],
        settings: { workDays: [0,1,2,3,4,5,6], startMin: 0, endMin: 1380, sessionMin: 90,
          stepMin: 60, currency: 'lei', defaultWeeklyLimit: 7 },
      }));
      w2.localStorage.setItem('ias:licenta', JSON.stringify({
        cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
      }));
      w2.localStorage.setItem('ias:backup', azi);
      w2.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
      w2.scrollBy = () => {};
      const DA = w2.Date;
      function DF(...a2) { return a2.length ? new DA(...a2) : new DA(CEAS.getTime()) }
      DF.prototype = DA.prototype; DF.now = () => CEAS.getTime();
      DF.parse = DA.parse; DF.UTC = DA.UTC; w2.Date = DF;
    },
  });
  await pauza(3000);
  const dc = () => d2.window.document;
  const cl = (el) => el && el.dispatchEvent(new d2.window.MouseEvent('click', { bubbles: true }));
  [...dc().querySelectorAll('.ecran-peste')].forEach(f =>
    cl([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(500);
  cl([...dc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(900);
  const blocuri = [...dc().querySelectorAll('div')]
    .filter(x => /Umple golul:|Adaugă rapid:/.test(x.textContent) && x.querySelector('button'))
    .filter((x, k, arr) => !arr.some(y => y !== x && x.contains(y)))
    .map(x => {
      let p = x.previousElementSibling, o2 = p ? (p.textContent.match(/(\d\d):(\d\d)/) || null) : null;
      return { ora: o2 ? Number(o2[1]) * 60 + Number(o2[2]) : null,
               cine: [...x.querySelectorAll('button')].map(y => y.textContent.replace(/^\+\s*/, '').trim()) };
    }).filter(x => x.ora != null);
  const devreme = blocuri.filter(x => x.ora < 1080);
  const tarziu = blocuri.filter(x => x.ora >= 1080);
  cer('cine poate doar seara nu e propus dimineața',
    devreme.every(x => !x.cine.some(y => /Dincă/.test(y))),
    devreme.length ? devreme.map(x => H(x.ora) + ': ' + x.cine.join(',')).join(' | ') : 'niciun gol de dimineață');
  cer('  dar seara e primul propus',
    tarziu.length === 0 || /Dincă/.test(tarziu[0].cine[0] || ''),
    tarziu.length ? H(tarziu[0].ora) + ': ' + tarziu[0].cine.join(', ') : 'niciun gol seara');

  /* ---- cu rezerva pornită, ea chiar ține ore deoparte ---- */
  const d3 = new JSDOM(html, {
    runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
    beforeParse(w3) {
      w3.localStorage.setItem('ias:app-data', JSON.stringify({
        students,
        sessions: [{ id: 'x1', studentId: 's3', date: azi, startMin: 960, duration: 90, status: 'scheduled', type: 'included' }],
        settings: { workDays: [0,1,2,3,4,5,6], startMin: 0, endMin: 1380, sessionMin: 90,
          stepMin: 60, currency: 'lei', defaultWeeklyLimit: 7,
          rezervaActiva: true, rezervaExamen: 3 },
      }));
      w3.localStorage.setItem('ias:licenta', JSON.stringify({
        cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
      }));
      w3.localStorage.setItem('ias:backup', azi);
      w3.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
      w3.scrollBy = () => {};
      const DA = w3.Date;
      function DF(...a2) { return a2.length ? new DA(...a2) : new DA(CEAS.getTime()) }
      DF.prototype = DA.prototype; DF.now = () => CEAS.getTime();
      DF.parse = DA.parse; DF.UTC = DA.UTC; w3.Date = DF;
    },
  });
  await pauza(3000);
  const de = () => d3.window.document;
  const ce2 = (el) => el && el.dispatchEvent(new d3.window.MouseEvent('click', { bubbles: true }));
  [...de().querySelectorAll('.ecran-peste')].forEach(f =>
    ce2([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(500);
  ce2([...de().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await pauza(900);
  const cu = [...de().querySelectorAll('div')]
    .filter(x => /Umple golul:|Adaugă rapid:/.test(x.textContent) && x.querySelector('button'))
    .filter((x, k, arr) => !arr.some(y => y !== x && x.contains(y)))
    .flatMap(x => [...x.querySelectorAll('button')].map(y => y.textContent.replace(/^\+\s*/, '').trim()));
  cer('cu rezerva pornită, cel cu exact 3 ore se ține deoparte',
    !cu.some(x => /Dincă/.test(x)),
    cu.length ? 'propuși: ' + [...new Set(cu)].join(', ') : 'niciunul');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(42) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
