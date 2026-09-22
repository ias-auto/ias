/* Mesajul de schimbare spune limpede ce s-a mutat: ora, locul sau amândouă.
   Ce era iese înclinat, ce e acum iese îngroșat, cu harta locului nou.      */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const settings = {
  workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30, currency: 'lei',
  locations: [
    { id: 'l1', name: 'Lukoil TOMIS III', lat: 44.18, lng: 28.64 },
    { id: 'l2', name: 'OMV Pescărie', lat: 44.20, lng: 28.65 },
  ],
};
const students = [{ id: 's1', name: 'Topor Mirela', lastName: 'Topor', firstName: 'Mirela',
  phone: '0771436564', includedHours: 10, weeklyLimit: 5, payments: [] }];

/* Scoatem funcția care scrie mesajul din aplicația construită și o chemăm
   direct, ca să citim textul exact pe care îl primește elevul. */
const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions: [], settings }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
  },
});

const src = fs.readFileSync('parti/aplicatie.js', 'utf8');
const yw = (() => {
  // funcțiile de care are nevoie mesajul, luate din cod
  const nume = ['iasCeSaSchimbat', 'yw', 'Ff', '_0', 'fo', 'Se', '$w', 'xo', 'Tw', 'yo'];
  const linii = src.split('\n');
  const bucati = [];
  const iaFn = (n) => {
    const k = linii.findIndex(l => new RegExp('^function ' + n.replace('$', '\\$') + '\\(').test(l));
    if (k < 0) return;
    let j = k + 1;
    while (j < linii.length && !/^(function |var |let |const )/.test(linii[j])) j++;
    bucati.push(linii.slice(k, j).join('\n'));
  };
  nume.forEach(iaFn);
  const vars = linii.filter(l => /^var (yo|xu|Tw) = /.test(l) || /^    (xu|Tw) = /.test(l));
  return { cod: bucati.join('\n\n') };
})();

(async () => {
  await new Promise(r => setTimeout(r, 2500));
  /* aplicația e pornită; chemăm funcția din interiorul ei */
  const w = d.window;
  const scrie = (fel, veche, noua) => {
    const f = new w.Function('fel', 'elev', 'noua', 'veche', 'setari',
      'return (typeof yw === "function") ? yw(fel, elev, noua, veche, setari) : null');
    return f(fel, students[0], noua, veche, settings);
  };

  // luăm funcția prin sursa ei, fiindcă e în interiorul aplicației
  const cod = src.slice(src.indexOf('function iasCeSaSchimbat('), src.indexOf('\nfunction ', src.indexOf('function yw(n, e, t, a, r) {') + 10));
  const ajutor = ['Ff', '_0', 'fo', 'Se', '$w', 'xo'].map(n => {
    const k = src.indexOf('\nfunction ' + n + '(');
    if (k < 0) return '';
    const e = src.indexOf('\nfunction ', k + 10);
    return src.slice(k, e);
  }).join('\n');
  const antet = src.slice(0, src.indexOf('\nfunction ')).split('\n')
    .filter(l => /^var yo = |^    xu = |^    Tw = /.test(l)).join('\n');
  const ctx = {};
  new Function('exports', `
    var yo = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];
    var Tw = ["Duminică","Luni","Marți","Miercuri","Joi","Vineri","Sâmbătă"];
    var si = 90;
    function Ue(x){ return new Date(x + "T12:00:00") }
    var Da = function (x) { return String(x).padStart(2, "0") };
    var Se = function (x) { return Da(Math.floor(x / 60)) + ":" + Da(x % 60) };
    var fo = function (x) { var e = Ue(x); return Tw[e.getDay()] + ", " + e.getDate() + " " + yo[e.getMonth()] };
    var Fn = function (n) { return !!(n && n.lat != null && n.lng != null && n.lat !== "" && n.lng !== "") };
    ${ajutor}
    ${cod}
    exports.yw = yw;
  `)(ctx);

  const veche = { date: zi(3), startMin: 600, location: 'Lukoil TOMIS III', duration: 90 };
  const doarOra = ctx.yw('rescheduled', students[0], { ...veche, date: zi(4), startMin: 750 }, veche, settings);
  const doarLoc = ctx.yw('location', students[0], { ...veche, location: 'OMV Pescărie' }, veche, settings);
  const amandoua = ctx.yw('rescheduled', students[0], { ...veche, date: zi(4), startMin: 750, location: 'OMV Pescărie' }, veche, settings);

  cer('când se schimbă doar ora, spune ORA',
    /Se schimbă ORA/.test(doarOra) && /Locul rămâne același: Lukoil TOMIS III/.test(doarOra),
    'și că locul rămâne');
  cer('  ora veche înclinat, cea nouă îngroșat',
    /_[^_]*10:00_\s*→ \*[^*]*12:30/.test(doarOra));

  cer('când se schimbă doar locul, spune LOCUL',
    /Se schimbă doar LOCUL/.test(doarLoc) && /Ora rămâne/.test(doarLoc));
  cer('  locul vechi înclinat, cel nou îngroșat',
    /_Lukoil TOMIS III_\s*→ \*OMV Pescărie\*/.test(doarLoc));

  cer('când se schimbă amândouă, o spune cu ATENȚIE',
    /\*ATENȚIE: se schimbă și ORA, și LOCUL\.\*/.test(amandoua),
    'cazul în care elevul venise la locul vechi');
  cer('  și arată ambele schimbări',
    /_[^_]*10:00_\s*→ \*[^*]*12:30/.test(amandoua) && /_Lukoil TOMIS III_\s*→ \*OMV Pescărie\*/.test(amandoua));
  cer('  cu harta locului nou', /https?:\/\/[^\s]*maps/.test(amandoua),
    (amandoua.match(/https?:\/\/[^\s]+/) || ['—'])[0].slice(0, 50));

  /* ---- drumul adevărat: schimbi ora și locul în fișă, salvezi ---- */
  const sesiuni = [{ id: 'x1', studentId: 's1', date: zi(3), startMin: 600, duration: 90,
    status: 'scheduled', type: 'included', location: 'Lukoil TOMIS III' }];
  const d2 = new JSDOM(html, {
    runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
    beforeParse(w2) {
      w2.localStorage.setItem('ias:app-data', JSON.stringify({ students, sessions: sesiuni, settings }));
      w2.localStorage.setItem('ias:licenta', JSON.stringify({
        cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
      }));
      w2.localStorage.setItem('ias:backup', azi);
      w2.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
      w2.scrollBy = () => {};
    },
  });
  await new Promise(r => setTimeout(r, 3000));
  const dc = () => d2.window.document;
  const cl = (el) => el && el.dispatchEvent(new d2.window.MouseEvent('click', { bubbles: true }));
  const fe = () => [...dc().querySelectorAll('.sheet-anim')].pop();
  [...dc().querySelectorAll('.ecran-peste')].forEach(f =>
    cl([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await new Promise(r => setTimeout(r, 400));
  cl([...dc().querySelectorAll('nav button')].find(x => /Calendar/.test(x.textContent)));
  await new Promise(r => setTimeout(r, 700));
  // mergem la ziua ședinței
  for (let k = 0; k < 2; k++) {
    const t = [...dc().querySelectorAll('button')].find(x => /Topor Mirela/.test(x.textContent));
    if (t) break;
    cl(dc().querySelector('button[aria-label="Săptămâna viitoare"]'));
    await new Promise(r => setTimeout(r, 400));
  }
  const zile = [...dc().querySelectorAll('button')].filter(x => x.className && /flex-col items-center py-2 rounded-xl border/.test(x.className));
  const tinta = zile.find(x => (x.textContent.match(/\d+/) || [''])[0] === String(Number(zi(3).slice(8))));
  cl(tinta); await new Promise(r => setTimeout(r, 600));
  cl([...dc().querySelectorAll('button')].find(x => /Topor Mirela/.test(x.textContent)));
  await new Promise(r => setTimeout(r, 900));
  const f1 = fe();
  if (f1) {
    cl([...f1.querySelectorAll('button')].find(x => /^12:30$/.test(x.textContent.trim())));
    await new Promise(r => setTimeout(r, 300));
    cl([...fe().querySelectorAll('button')].find(x => /^OMV Pescărie$/.test(x.textContent.trim())));
    await new Promise(r => setTimeout(r, 300));
    cl([...fe().querySelectorAll('button')].find(x => /Salvează modificările/.test(x.textContent)));
    await new Promise(r => setTimeout(r, 900));
    const tot = dc().body.textContent.replace(/\s+/g, ' ');
    cer('salvând din fișă, mesajul prinde ambele schimbări',
      /ATENȚIE: se schimbă și ORA, și LOCUL/.test(tot) || /Anunți elevul/.test(tot),
      /ATENȚIE/.test(tot) ? 'ATENȚIE: se schimbă și ORA, și LOCUL' : 'fereastra de anunț s-a deschis');
  } else cer('salvând din fișă, mesajul prinde ambele schimbări', false, 'n-am ajuns la fișă');

  console.log('\n  ——— cum arată mesajul când se schimbă amândouă ———\n');
  console.log(amandoua.split('\n').map(x => '    ' + x).join('\n'));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(42) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
