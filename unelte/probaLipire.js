/* Numărul de telefon al elevului se poate lipi pe iPhone: câmpul nu mai e luat
   drept câmpul tău de contact.                                              */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({
      students: [], sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei' },
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
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
    clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(500);
  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(800);
  /* Elevul nou se adaugă de la butonul rotund din colț, cu semnul plus. */
  const plus = [...doc().querySelectorAll('button')].find(x => /fixed/.test(x.className) && !x.textContent.trim())
    || [...doc().querySelectorAll('button[aria-label]')].find(x => /Elev nou|Adaug/.test(x.getAttribute('aria-label')));
  clic(plus);
  await pauza(1100);

  const camp = [...doc().querySelectorAll('input')].find(x => x.placeholder === '07xx xxx xxx');
  cer('câmpul de telefon e pe fișa elevului nou', !!camp,
    camp ? 'îl găsesc după cum arată gol' : 'nu-l găsesc');
  if (!camp) { gata(); return }

  cer('  nu mai cere completare automată din agendă',
    (camp.getAttribute('autocomplete') || '').toLowerCase() === 'off',
    'autocomplete="' + (camp.getAttribute('autocomplete') || '—') + '"');
  cer('  nu mai e declarat „telefonul tău"',
    (camp.getAttribute('type') || 'text').toLowerCase() !== 'tel',
    'type="' + (camp.getAttribute('type') || 'text') + '"');
  cer('  nici după nume nu se mai ghicește',
    !/tel|phone/i.test(camp.getAttribute('name') || ''),
    'name="' + (camp.getAttribute('name') || '—') + '"');
  cer('  dar tastatura rămâne cu cifre',
    (camp.getAttribute('inputmode') || '').toLowerCase() === 'tel',
    'inputmode="tel" — nu pierzi nimic la scris');

  /* Meniul lung al telefonului trebuie să rămână liber în câmpuri, ca „Lipire"
     să aibă unde apărea. */
  let oprit = false;
  const ev = new d.window.Event('contextmenu', { bubbles: true, cancelable: true });
  camp.dispatchEvent(ev);
  oprit = ev.defaultPrevented;
  cer('  iar apăsarea lungă nu e oprită în câmp', !oprit,
    'acolo apare „Lipire"');

  /* În afara câmpurilor rămâne oprită, ca până acum. */
  const ev2 = new d.window.Event('contextmenu', { bubbles: true, cancelable: true });
  (doc().querySelector('nav button') || doc().body).dispatchEvent(ev2);
  cer('  dar rămâne oprită în rest', ev2.defaultPrevented,
    'ținutul apăsat pe butoane e al aplicației');

  /* Lipirea propriu-zisă ajunge în câmp. */
  const pune = Object.getOwnPropertyDescriptor(d.window.HTMLInputElement.prototype, 'value').set;
  pune.call(camp, '0740123456');
  camp.dispatchEvent(new d.window.Event('input', { bubbles: true }));
  await pauza(400);
  const camp2 = [...doc().querySelectorAll('input')].find(x => x.placeholder === '07xx xxx xxx');
  cer('numărul lipit rămâne în câmp', camp2 && camp2.value === '0740123456',
    camp2 ? camp2.value : '—');

  /* ---- nicio completare automată, pe niciun câmp ---- */
  const toate = () => [...doc().querySelectorAll('input, textarea')];
  const rele = () => toate().filter(x =>
    (x.getAttribute('autocomplete') || '').toLowerCase() !== 'off'
    || /tel|phone|name|nume|mail|address|adres|card|cod|pass|parol|cvv/i.test(x.getAttribute('name') || ''));

  const ecrane = ['Acasă', 'Calendar', 'Elevi', 'Plan', 'Finanțe', 'Setări'];
  let cate = 0, rau = [];
  for (const e of ecrane) {
    clic([...doc().querySelectorAll('nav button')].find(x => new RegExp(e).test(x.textContent)));
    await pauza(800);
    cate += toate().length;
    rele().forEach(x => rau.push(e + ': ' + (x.placeholder || x.type || 'câmp')));
  }
  cer('pe toate ecranele, niciun câmp nu cere completare automată',
    rau.length === 0, `${cate} câmpuri cercetate` + (rau.length ? ' — ' + rau.slice(0, 3).join(', ') : ''));

  /* Și cele care apar abia când deschizi o fereastră. */
  clic([...doc().querySelectorAll('nav button')].find(x => /Setări/.test(x.textContent)));
  await pauza(800);
  const sect = [...doc().querySelectorAll('button')].find(x => /Locații|Program/.test(x.textContent));
  clic(sect); await pauza(800);
  const dupa = toate().length;
  cer('  nici cele apărute după deschiderea unei secțiuni',
    rele().length === 0, `${dupa} câmpuri acum pe ecran`);

  /* Un câmp pus de-a dreptul în pagină trebuie prins și el. */
  const nou2 = doc().createElement('input');
  nou2.type = 'text';
  doc().body.appendChild(nou2);
  await pauza(400);
  cer('  și unul apărut chiar acum',
    (nou2.getAttribute('autocomplete') || '').toLowerCase() === 'off',
    'regula prinde și ce se adaugă mai târziu');

  gata();
  function gata() {
    console.log('');
    rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(44) + (dt || '')));
    const cazute = rez.filter(r => r[0] === '✕').length;
    console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
    process.exit(0);
  }
})();
