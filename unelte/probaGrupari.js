/* Blocul „gata de teoretic" se strânge, examenele se grupează pe feluri, iar
   „Elevi promovați" desface lista lor.                                       */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);
const zi = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return d.toISOString().slice(0, 10); };

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const students = [];
/* nouă elevi gata de sală, ca în poza lui */
for (let k = 0; k < 9; k++) students.push({
  id: 'g' + k, name: 'Gata ' + String.fromCharCode(65 + k), lastName: 'Gata', firstName: '',
  includedHours: 20, weeklyLimit: 7, payments: [],
});
/* doi cu examen practic viitor, doi cu teoretic viitor */
students.push({ id: 'p1', name: 'Practic Unu', lastName: 'Practic', firstName: 'Unu',
  includedHours: 20, weeklyLimit: 7, payments: [], examDate: zi(6), examPeriod: 'am' });
students.push({ id: 'p2', name: 'Practic Doi', lastName: 'Practic', firstName: 'Doi',
  includedHours: 20, weeklyLimit: 7, payments: [], examDate: zi(9), examPeriod: 'am' });
students.push({ id: 't1', name: 'Teoretic Unu', lastName: 'Teoretic', firstName: 'Unu',
  includedHours: 20, weeklyLimit: 7, payments: [], theoryExamDate: zi(7) });
students.push({ id: 't2', name: 'Teoretic Doi', lastName: 'Teoretic', firstName: 'Doi',
  includedHours: 20, weeklyLimit: 7, payments: [], theoryExamDate: zi(8) });
/* Trei promovați, cu date anume, ca să se vadă ordinea. Pe nume ar ieși
   Ana, Barbu, Cezar — dar Cezar a luat permisul cel mai recent. */
students.push({ id: 'pr0', name: 'Promovat Ana', lastName: 'Promovat', firstName: 'Ana',
  includedHours: 20, weeklyLimit: 7, payments: [], group: '70',
  examResult: 'promovat', examDate: zi(-30) });
students.push({ id: 'pr1', name: 'Promovat Barbu', lastName: 'Promovat', firstName: 'Barbu',
  includedHours: 20, weeklyLimit: 7, payments: [], group: '70',
  examResult: 'promovat', examDate: zi(-20) });
/* Cezar n-are examDate — a rămas doar în istoric, cum se întâmplă după
   reprogramări — dar e cel mai proaspăt promovat. */
students.push({ id: 'pr2', name: 'Promovat Cezar', lastName: 'Promovat', firstName: 'Cezar',
  includedHours: 20, weeklyLimit: 7, payments: [], group: '70',
  examResult: 'promovat',
  examIstoric: [{ id: 'e1', data: zi(-40), fel: 'practic', rezultat: 'respins' },
                { id: 'e2', data: zi(-5), fel: 'practic', rezultat: 'promovat' }] });

/* fiecăruia dintre cei nouă îi dăm 10+ ședințe efectuate */
const sessions = [];
students.filter(x => x.id.startsWith('g')).forEach((el, j) => {
  for (let k = 0; k < 11; k++) sessions.push({
    id: el.id + '_' + k, studentId: el.id, date: zi(-k - 2 - j), startMin: 600,
    duration: 90, status: 'completed', type: 'included',
  });
});

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students, sessions,
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, sessionMin: 90,
        stepMin: 30, currency: 'lei' },
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
const btn = (re) => [...doc().querySelectorAll('button')].find(x => re.test(x.textContent.trim()));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
    clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(600);

  /* 1. blocul de gata de sală */
  cer('blocul spune câți sunt gata', /9 gata de teoretic/.test(text()),
    (text().match(/\d+ gata de teoretic/) || ['—'])[0]);
  /* Nu trebuie să stea lipit de cardurile cu cifre de deasupra. */
  const bloc = [...doc().querySelectorAll('div')]
    .find(x => /^px-4 /.test(x.className || '') && /gata de teoretic/i.test(x.textContent));
  cer('  și are spațiu față de cardurile de sus',
    !!bloc && /\bmt-\d/.test(bloc.className),
    bloc ? bloc.className : 'nu l-am găsit');
  cer('  dar nu-ți umple ecranul cu toți',
    (text().match(/așteaptă programare la sală/g) || []).length === 0,
    'lista stă strânsă');
  clic(btn(/gata de teoretic/)); await pauza(500);
  cer('  se desface la atingere',
    (text().match(/așteaptă programare la sală/g) || []).length === 9,
    'toți nouă, cu numărul lor de ședințe');
  clic(btn(/gata de teoretic/)); await pauza(400);
  cer('  și se strânge la loc',
    (text().match(/așteaptă programare la sală/g) || []).length === 0);

  /* 2. examenele, pe feluri */
  cer('examenele practice au grupul lor', /Examene practice · 2/.test(text()),
    (text().match(/Examene practice · \d+/) || ['—'])[0]);
  cer('  iar cele teoretice, separat', /Examene teoretice · 2/.test(text()),
    (text().match(/Examene teoretice · \d+/) || ['—'])[0]);
  cer('  și nu sunt amestecate',
    text().indexOf('Examene practice') < text().indexOf('Examene teoretice'),
    'practicul întâi — el îți ocupă ziua');
  clic(btn(/Examene practice/)); await pauza(500);
  cer('  grupul se desface', /Practic Unu/.test(text()) && !/Teoretic Unu/.test(text()),
    'doar practicele, nu și teoreticele');

  /* 3. elevii promovați */
  clic(btn(/Elevi promovați/)); await pauza(500);
  const nume = ['Promovat Ana', 'Promovat Barbu', 'Promovat Cezar'].filter(x => text().includes(x));
  cer('„Elevi promovați" desface lista lor', nume.length === 3, nume.join(', '));
  cer('  cu grupa și data examenului', /gr\. 70/.test(text()));
  /* Ordinea promovării, nu a numelui: Cezar acum cinci zile, Barbu acum
     douăzeci, Ana acum treizeci. */
  const t = text();
  const poz = (x) => t.indexOf(x);
  cer('  în ordinea promovării, nu alfabetic',
    poz('Promovat Cezar') < poz('Promovat Barbu') && poz('Promovat Barbu') < poz('Promovat Ana'),
    'Cezar → Barbu → Ana');
  cer('  iar data luată din istoric, când examDate s-a golit',
    poz('Promovat Cezar') < poz('Promovat Barbu'),
    'Cezar n-are examDate, dar a promovat acum cinci zile');
  clic(btn(/^Promovat Ana/)); await pauza(900);
  cer('  iar de acolo deschizi fișa',
    [...doc().querySelectorAll('.sheet-anim')].some(x => /Promovat Ana/.test(x.textContent)),
    'ca din lista de Elevi');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(40) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
