/* Fiecare elev o ședință pe săptămână înainte ca altul să ia a doua, iar ziua
   se adună, nu se împrăștie.                                                */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);
const H = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');

const porneste = (students, extra) => new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: (extra && extra.sessions) || [],
      settings: {
        workDays: [0,1,2,3,4,5,6], startMin: 510, endMin: 1200, sessionMin: 90,
        stepMin: 30, currency: 'lei', defaultWeeklyLimit: 3,
        rateTypes: [{ id: 'included', name: 'Ore incluse', price: 100 }],
      },
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

const genereaza = async (d) => {
  await new Promise(r => setTimeout(r, 3200));
  const doc = d.window.document;
  const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
  [...doc.querySelectorAll('.ecran-peste')].forEach(f =>
    clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await new Promise(r => setTimeout(r, 500));
  clic([...doc.querySelectorAll('nav button')].find(x => /Plan/.test(x.textContent)));
  await new Promise(r => setTimeout(r, 800));
  clic([...doc.querySelectorAll('button')].find(x => /Generează plan/.test(x.textContent)));
  await new Promise(r => setTimeout(r, 2400));
  const t = doc.body.textContent.replace(/\s+/g, ' ');
  /* Tăiem textul la fiecare „Zi nr · oră"; numele e ce urmează, până la
     următoarea tăietură. Mai sigur decât o potrivire cu privire înainte. */
  const marca = /(Lun|Mar|Mie|Joi|Vin|Sâm|Dum) (\d+) · (\d\d):(\d\d)/g;
  const gasite = [...t.matchAll(marca)];
  return gasite.map((m, k) => ({
    zi: m[1], nr: Number(m[2]), min: Number(m[3]) * 60 + Number(m[4]),
    cine: t.slice(m.index + m[0].length,
      k + 1 < gasite.length ? gasite[k + 1].index : m.index + m[0].length + 30).trim(),
  }));
};

(async () => {
  /* ---- 1. dreptatea: trei elevi, unul liber oricând ---- */
  const d1 = porneste([
    { id: 'a', name: 'Liber Oricand', lastName: 'Liber', firstName: 'Oricand',
      includedHours: 20, weeklyLimit: 3, payments: [] },
    { id: 'b', name: 'Greu Potrivit', lastName: 'Greu', firstName: 'Potrivit',
      includedHours: 20, weeklyLimit: 3, payments: [], availDays: [6], availFrom: 870 },
    { id: 'c', name: 'Strans Ingust', lastName: 'Strans', firstName: 'Ingust',
      includedHours: 20, weeklyLimit: 3, payments: [], availDays: [2], availFrom: 600, availTo: 720 },
  ]);
  const p1 = await genereaza(d1);
  /* prima săptămână din plan */
  const sapt1 = p1.slice(0, 12);
  const cати = (n) => sapt1.filter(x => x.cine.indexOf(n) === 0).length;
  const primaPt = (n) => { const k = p1.findIndex(x => x.cine.indexOf(n) === 0); return k < 0 ? 999 : k };
  cer('toți trei primesc ședințe', cати('Liber') > 0 && cати('Greu') > 0 && cати('Strans') > 0,
    `Liber ${cати('Liber')}, Greu ${cати('Greu')}, Strâns ${cати('Strans')}`);
  cer('  iar cei greu de potrivit nu rămân la coadă',
    primaPt('Greu') < 6 && primaPt('Strans') < 6,
    'intră în prima săptămână, nu după ce se satură ceilalți');

  /* ---- 2. sâmbăta ta: unul oricând, altul de la 14:30 ---- */
  const d2 = porneste([
    { id: 'x', name: 'Oricand Ana', lastName: 'Oricand', firstName: 'Ana',
      includedHours: 2, weeklyLimit: 1, payments: [], availDays: [6] },
    { id: 'y', name: 'Dupa Barbu', lastName: 'Dupa', firstName: 'Barbu',
      includedHours: 2, weeklyLimit: 1, payments: [], availDays: [6], availFrom: 870 },
  ]);
  const p2 = await genereaza(d2);
  const sambata = p2.filter(x => x.zi === 'Sâm').slice(0, 2).sort((a, b) => a.min - b.min);
  cer('sâmbăta, amândoi sunt programați', sambata.length === 2,
    sambata.map(x => H(x.min) + ' ' + x.cine.split(' ')[0]).join(', '));
  cer('  iar ședințele sunt lipite una de alta',
    sambata.length === 2 && sambata[1].min - (sambata[0].min + 90) === 0,
    sambata.length === 2
      ? `${H(sambata[0].min)}–${H(sambata[0].min + 90)} și ${H(sambata[1].min)} — zero minute între ele`
      : '—');
  cer('  cel care poate doar de la 14:30 e la 14:30',
    sambata.length === 2 && sambata[1].min === 870 && /Dupa/.test(sambata[1].cine),
    sambata.length === 2 ? H(sambata[1].min) + ' ' + sambata[1].cine : '—');
  cer('  iar cel liber s-a mutat lângă el, la 13:00',
    sambata.length === 2 && sambata[0].min === 780 && /Oricand/.test(sambata[0].cine),
    sambata.length === 2 ? H(sambata[0].min) + ' ' + sambata[0].cine : '—');

  console.log('');
  rez.forEach(([s, n, d]) => console.log('  ' + s + ' ' + n.padEnd(44) + (d || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
