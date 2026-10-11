/* Planul lasă o zi de pauză între ședințele aceluiași elev, cât se poate.    */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);
const ZILE = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'];

const porneste = (students, settings) => new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: [],
      settings: {
        workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90,
        stepMin: 30, currency: 'lei', defaultWeeklyLimit: 3,
        rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }],
        ...settings,
      },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.scrollBy = () => {};
  },
});

/* Citim zilele propuse pentru fiecare elev, ca date adevărate. */
const genereaza = async (d) => {
  await new Promise(r => setTimeout(r, 3000));
  const doc = d.window.document;
  const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
  [...doc.querySelectorAll('.ecran-peste')].forEach(f =>
    clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await new Promise(r => setTimeout(r, 500));
  clic([...doc.querySelectorAll('nav button')].find(x => /Plan/.test(x.textContent)));
  await new Promise(r => setTimeout(r, 800));
  clic([...doc.querySelectorAll('button')].find(x => /Generează plan/.test(x.textContent)));
  await new Promise(r => setTimeout(r, 2000));
  const t = doc.body.textContent.replace(/\s+/g, ' ');
  return [...t.matchAll(/(Lun|Mar|Mie|Joi|Vin|Sâm|Dum) (\d+) · (\d\d:\d\d)([A-ZȘȚ][^·\d]{2,24}?)(?=Lun |Mar |Mie |Joi |Vin |Sâm |Dum |$)/g)]
    .map(x => ({ zi: x[1], nr: Number(x[2]), cine: x[4].trim() }));
};
/* Două ședințe lipite = în zile una după alta. */
const lipite = (zile) => {
  const nr = [...new Set(zile)].sort((a, b) => a - b);
  let k = 0;
  for (let i = 1; i < nr.length; i++) if (nr[i] - nr[i - 1] === 1) k++;
  return k;
};

(async () => {
  /* ---- 1. elev liber toată săptămâna, trei ședințe ---- */
  const d1 = porneste([{ id: 's1', name: 'Liber Toata', lastName: 'Liber', firstName: 'Toata',
    includedHours: 12, weeklyLimit: 3, payments: [] }], {});
  const p1 = await genereaza(d1);
  const prima = p1.slice(0, 3).map(x => x.nr);
  cer('elevul liber toată săptămâna nu mai prinde zile la rând',
    lipite(prima) === 0,
    p1.slice(0, 3).map(x => `${x.zi} ${x.nr}`).join(', '));

  /* ---- 2. elev liber doar trei zile la rând ---- */
  const d2 = porneste([{ id: 's1', name: 'Doar Trei', lastName: 'Doar', firstName: 'Trei',
    includedHours: 12, weeklyLimit: 3, payments: [],
    availDays: [1, 2, 3] }], {});
  const p2 = await genereaza(d2);
  cer('dar dacă poate doar trei zile la rând, le primește pe toate',
    p2.length >= 3 && p2.slice(0, 3).every(x => /Lun|Mar|Mie/.test(x.zi)),
    p2.slice(0, 3).map(x => `${x.zi} ${x.nr}`).join(', ') || 'niciuna');

  /* ---- 3. pauza cerută pe fișă e lege ---- */
  const d3 = porneste([{ id: 's1', name: 'Pauza Mare', lastName: 'Pauza', firstName: 'Mare',
    includedHours: 12, weeklyLimit: 3, payments: [], minGapDays: 3 }], {});
  const p3 = await genereaza(d3);
  const nr3 = p3.slice(0, 3).map(x => x.nr).sort((a, b) => a - b);
  cer('pauza cerută pe fișă se respectă întocmai',
    nr3.length >= 2 && nr3.every((v, k) => k === 0 || v - nr3[k - 1] >= 3),
    p3.slice(0, 3).map(x => `${x.zi} ${x.nr}`).join(', '));

  /* ---- 4. pauza pusă în Setări, pentru toți ---- */
  const d4 = porneste([{ id: 's1', name: 'Fara Reglaj', lastName: 'Fara', firstName: 'Reglaj',
    includedHours: 12, weeklyLimit: 3, payments: [] }], { ritmImplicit: 3 });
  const p4 = await genereaza(d4);
  const nr4 = p4.slice(0, 3).map(x => x.nr).sort((a, b) => a - b);
  cer('pauza din Setări se aplică celor fără reglaj propriu',
    nr4.length >= 2 && nr4.every((v, k) => k === 0 || v - nr4[k - 1] >= 3),
    p4.slice(0, 3).map(x => `${x.zi} ${x.nr}`).join(', '));

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(48) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
