/* Elevul marcat plecat după ce planul fusese deja făcut: propunerile din zilele
   lui de lipsă nu mai rămân pe ecran.                                        */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const peste = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10) };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students: [
        { id: 'p', name: 'Plecat Vlad', lastName: 'Plecat', firstName: 'Vlad',
          includedHours: 10, weeklyLimit: 3, payments: [] },
        { id: 'a', name: 'Acasa Ana', lastName: 'Acasa', firstName: 'Ana',
          includedHours: 10, weeklyLimit: 3, payments: [] },
      ],
      sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 510, endMin: 1200, sessionMin: 90,
        stepMin: 30, currency: 'lei', defaultWeeklyLimit: 3,
        rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }] },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.scrollBy = () => {};
    w.HTMLElement.prototype.scrollIntoView = function () {};
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const tab = (re) => [...doc().querySelectorAll('nav button')].find(x => re.test(x.textContent));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));
const date = () => JSON.parse(d.window.localStorage.getItem('ias:app-data'));
const propuneri = (id) => date().sessions.filter(x => x.studentId === id && x.auto && x.status === 'pending');

(async () => {
  await pauza(3400);
  [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
    clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(600);

  /* 1. Fac planul cât amândoi sunt acasă. */
  clic(tab(/Plan/)); await pauza(900);
  clic([...doc().querySelectorAll('button')].find(x => /Generează plan/.test(x.textContent)));
  await pauza(2400);
  clic([...doc().querySelectorAll('button')].find(x => /Aplică planul/.test(x.textContent)));
  await pauza(1400);
  const inainte = propuneri('p');
  cer('planul i-a dat propuneri cât era acasă', inainte.length > 0,
    inainte.length + ' ședințe în așteptare');

  /* 2. Abia acum mă anunță că lipsește două săptămâni. */
  const pana = peste(19);
  clic(tab(/Elevi/)); await pauza(800);
  clic([...doc().querySelectorAll('[role=button]')].find(x => /Plecat Vlad/.test(x.textContent)));
  await pauza(1000);
  clic([...doc().querySelectorAll('button')].find(x => /Editeaz/.test(x.textContent)));
  await pauza(1100);
  /* Bifa stă în secțiunea „Disponibilitate", care e strânsă. */
  clic([...doc().querySelectorAll('button')].find(x => /^Disponibilitate/.test(x.textContent.trim())));
  await pauza(700);
  /* Plecarea se pune dintr-o bifă pe fișă, nu dintr-un câmp de dată. */
  const bifa = [...doc().querySelectorAll('button')].find(x => /^Indisponibil o perioadă/.test(x.textContent.trim()));
  cer('  bifa de plecare există pe fișă', !!bifa,
    bifa ? bifa.textContent.trim().slice(0, 40) : 'nu o găsesc');
  clic(bifa); await pauza(700);
  /* Bifa pune o săptămână; o ducem până pe data cerută. */
  const camp = [...doc().querySelectorAll('input[type=date]')].pop();
  const pune = Object.getOwnPropertyDescriptor(d.window.HTMLInputElement.prototype, 'value').set;
  if (camp) {
    pune.call(camp, pana);
    camp.dispatchEvent(new d.window.Event('input', { bubbles: true }));
    camp.dispatchEvent(new d.window.Event('change', { bubbles: true }));
  }
  await pauza(500);
  clic([...doc().querySelectorAll('button')].find(x => /Salveaz/.test(x.textContent)));
  await pauza(1300);

  const dupa = propuneri('p');
  const inauntru = dupa.filter(x => x.date <= pana && x.date >= azi);
  cer('propunerile din zilele lui de lipsă s-au dus', inauntru.length === 0,
    inauntru.length ? inauntru.map(x => x.date).join(', ') : 'niciuna până pe ' + pana);
  cer('  iar cele de după întoarcere rămân',
    dupa.filter(x => x.date > pana).length > 0 || inainte.every(x => x.date <= pana),
    dupa.length + ' rămase din ' + inainte.length);
  cer('  celălalt elev nu e atins',
    propuneri('a').length > 0, propuneri('a').length + ' ședințe, neatinse');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(44) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
