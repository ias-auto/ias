/* Formularul elevului, reașezat pe secțiuni: fiecare grup se pliază, iar
   explicațiile stau într-un „i" încercuit, nu la vedere.                    */
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
      students: [{ id: 's1', name: 'Test Elev', lastName: 'Test', firstName: 'Elev',
        regNumber: '124', group: '12', includedHours: 15, extraHours: 2, weeklyLimit: 3, payments: [] }],
      sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei',
        masini: [{ id: 'm1', nume: 'CT 01 IAS', cutie: 'manuala' }],
        // fără un pachet definit, câmpul „Școlarizare" nu are ce arăta
        feeTypes: [{ id: 'sc', name: 'Școlarizare', price: 3100, hours: 17, oreTip: 'included', laScoala: true }] },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const inchide = () => [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
  clic([...f.querySelectorAll('button')].find(b => /Am înțeles|Închide/.test(b.textContent))
    || f.querySelector('button[aria-label="Închide"]')));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

const GRUPURI = ['Persoana', 'Dosar', 'Ore și plată', 'Cum îl programezi', 'Când poate veni', 'Examene', 'Mementouri'];

(async () => {
  await pauza(3000);
  inchide(); await pauza(400);

  clic([...doc().querySelectorAll('nav button')].find(x => /Elevi/.test(x.textContent)));
  await pauza(700);
  // deschidem fișa elevului, apoi formularul lui
  const numeEl = [...doc().querySelectorAll('span')]
    .find(x => /Test Elev/.test(x.textContent) && x.textContent.length < 80);
  clic(numeEl && numeEl.closest('button, [role=button]'));
  await pauza(800);
  const fisa = doc().querySelector('.sheet-anim');
  clic(fisa && [...fisa.querySelectorAll('button')].find(b => /Editeaz/.test(b.textContent)));
  await pauza(800);

  const foi = () => [...doc().querySelectorAll('.sheet-anim')];
  const foaie = foi()[foi().length - 1];
  cer('formularul se deschide', !!foaie && /Editeaz\u0103 elev/.test(foaie.textContent));

  const titluri = [...foaie.querySelectorAll('button')].map(b => b.textContent.trim());
  const gasite = GRUPURI.filter(g => titluri.some(t => t.startsWith(g)));
  cer('toate grupurile există', gasite.length === GRUPURI.length, gasite.join(' · '));

  // „Persoana" e deschis din pornire, restul strânse
  const campuriLaStart = foaie.querySelectorAll('input, select, textarea').length;
  cer('formularul pornește strâns', campuriLaStart < 12, `${campuriLaStart} câmpuri la vedere`);
  cer('„Persoana" e deschis din pornire',
    !!foaie.querySelector('input[value="Test"]') || /Nume de familie/.test(foaie.textContent));

  // deschidem fiecare grup și numărăm câmpurile
  /* „Persoana" e deja deschis, deci îl sărim — altfel l-am închide. Pentru
     restul verificăm după fiecare atingere că numărul de câmpuri a crescut. */
  for (const g of GRUPURI.slice(1)) {
    const inainte = foi()[foi().length - 1].querySelectorAll('input, select, textarea').length;
    const b = [...foi()[foi().length - 1].querySelectorAll('button')]
      .find(x => x.textContent.trim().startsWith(g));
    if (b) { clic(b); await pauza(300); }
    const dupa = foi()[foi().length - 1].querySelectorAll('input, select, textarea').length;
    if (dupa < inainte) { clic(b); await pauza(300); }
  }
  /* Nu numărăm câmpuri — verificăm pe nume că fiecare a ajuns în grupul lui și
     că nu s-a pierdut nimic la reașezare. */
  const tot = foi()[foi().length - 1].textContent;
  const trebuie = ['Nume de familie', 'Prenume', 'Sex', 'Telefon', 'Data nașterii', 'Județ',
    'Zona de domiciliu', 'Nr. înregistrare', 'Grupa', 'OS', 'Categoria de permis',
    'Data înscrierii', 'Situație', 'Școlarizare', 'Ore incluse', 'Ore suplimentare',
    'Cutie de viteze', 'Mașina lui', 'Locație de start', 'Limba ședințelor',
    'Limită ședințe', 'Tură de lucru', 'Indisponibil o perioadă', 'Notițe'];
  const lipsa = trebuie.filter(x => !tot.includes(x));
  cer('niciun câmp nu s-a pierdut', lipsa.length === 0,
    lipsa.length ? 'lipsesc: ' + lipsa.join(', ') : `${trebuie.length} câmpuri verificate pe nume`);

  // butoanele de ajutor
  const ajutor = [...foi()[foi().length - 1].querySelectorAll('button')]
    .filter(b => b.getAttribute('aria-label') === 'Explicație');
  cer('explicațiile stau în butoane „i"', ajutor.length >= 4, `${ajutor.length} butoane de ajutor`);
  const inainte = foi()[foi().length - 1].textContent.length;
  clic(ajutor[0]); await pauza(250);
  const dupa = foi()[foi().length - 1].textContent;
  cer('explicația se deschide la atingere', dupa.length > inainte && /închide/.test(dupa));
  clic([...foi()[foi().length - 1].querySelectorAll('button')].find(b => /închide/.test(b.textContent)));
  await pauza(250);
  cer('explicația se închide', foi()[foi().length - 1].textContent.length <= inainte + 2);

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(36) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
