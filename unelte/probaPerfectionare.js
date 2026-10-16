/* Elevul venit la perfecționare: are permis, vrea doar ore la volan.        */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10) };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

/* 15 ședințe făcute — destule cât să pornească semnul de sală la un cursant. */
const sesiuni = Array.from({ length: 15 }, (_, k) => ({
  id: 'x' + k, studentId: 'p1', date: zi(-k - 2), startMin: 600, duration: 90,
  status: 'completed', type: 'extra',
}));

const students = [
  { id: 'p1', name: 'Perfect Ana', lastName: 'Perfect', firstName: 'Ana',
    /* 20 de ore scrise de mână, 15 făcute — îi rămân 5 de programat. */
    includedHours: 0, extraHours: 20, weeklyLimit: 3, payments: [],
    perfectionare: true, examResult: 'promovat' },
  { id: 'c1', name: 'Cursant Barbu', lastName: 'Cursant', firstName: 'Barbu',
    includedHours: 10, extraHours: 0, weeklyLimit: 3, payments: [] },
];

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions: sesiuni,
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90,
        stepMin: 30, currency: 'lei', defaultWeeklyLimit: 3,
        rateTypes: [{ id: 'included', name: 'Ore incluse', price: 0 },
                    { id: 'extra', name: 'Ore suplimentare', price: 200 }] },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.scrollBy = () => {};
  },
});
const doc = () => d.window.document;
const text = () => doc().body.textContent.replace(/\s+/g, ' ');
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const tab = (re) => [...doc().querySelectorAll('nav button')].find(x => re.test(x.textContent));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
    clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(600);

  /* 1. Acasă: niciun semn de școală pentru el */
  cer('nu apare la „gata de teoretic"',
    !/Perfect Ana/.test((text().split('gata de teoretic')[1] || '').slice(0, 300)),
    '15 ședințe făcute, dar are permis');
  const blocSala = [...doc().querySelectorAll('button')].find(x => /gata de teoretic/i.test(x.textContent));
  cer('  nici blocul nu-l numără', !blocSala || !/Perfect/.test(blocSala.textContent),
    blocSala ? blocSala.textContent.trim() : 'niciun bloc');

  /* 2. Lista de elevi: semnul lui */
  clic(tab(/Elevi/)); await pauza(800);
  /* Elevul promovat stă într-o grupă strânsă; o desfacem dacă trebuie. */
  if (!/Perfect Ana/.test(text())) {
    clic([...doc().querySelectorAll('button')].find(x => /Promova|Terminat/i.test(x.textContent)));
    await pauza(600);
  }
  const card = [...doc().querySelectorAll('[role=button]')].find(x => /Perfect Ana/.test(x.textContent));
  cer('în listă poartă semnul „perfecționare"',
    !!card && /perfecționare/.test(card.textContent),
    card ? 'se deosebește dintr-o privire' : 'nu găsesc cardul');
  const cardC = [...doc().querySelectorAll('[role=button]')].find(x => /Cursant Barbu/.test(x.textContent));
  cer('  iar cursantul, nu', !!cardC && !/perfecționare/.test(cardC.textContent));

  /* 3. Planul îl ia, deși are permis */
  clic(tab(/Plan/)); await pauza(900);
  const btn = [...doc().querySelectorAll('button')].find(x => /Generează plan/.test(x.textContent));
  cer('planul îl numără printre elevi', !!btn && /2 elevi/.test(btn.textContent),
    btn ? btn.textContent.trim() : 'niciun buton');
  clic(btn); await pauza(1800);
  cer('  și chiar îi dă ședințe', /Perfect Ana/.test(text()),
    'deși e marcat promovat la practic');

  /* 4. Ședința nouă îi iese suplimentară */
  /* 4. Ședința nouă îi iese suplimentară din start. Se vede mai limpede pe
     funcția care alege tipul decât prin trei ecrane: cine n-are ore incluse
     primește „suplimentară" de la prima ședință. */
  const l2 = fs.readFileSync('parti/aplicatie.js', 'utf8').split('\n');
  const buc = (nume) => { const k = l2.findIndex(x => new RegExp('^function ' + nume + '\\(').test(x));
    let j = k + 1; while (j < l2.length && !/^(function |var |let |const )/.test(l2[j])) j++;
    return l2.slice(k, j).join('\n') };
  const mm = {};
  new Function('exports', buc('Fw') + buc('gw') + ';exports.gw = gw;')(mm);
  cer('ședința nouă îi iese suplimentară din start',
    mm.gw(students[0], sesiuni) === 'extra', 'n-are școlarizare din care să iasă');
  cer('  iar cursantului, inclusă', mm.gw(students[1], []) === 'included',
    'are 10 ore de școlarizare');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(42) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
