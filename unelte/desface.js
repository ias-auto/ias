/* Desface index.html în bucăți, ca să se poată lucra pe el fără să fie rescris.
   Din tot fișierul, o singură bucată e a noastră — codul aplicației. Restul
   (bibliotecile, stilul, capul paginii) se păstrează octet cu octet și se pune
   la loc neatins, așa că nimic din ce arată bine acum nu se poate strica.

   Rulare:  node desface.js index.html          */

const fs = require('fs');

const sursa = process.argv[2] || 'index.html';
const h = fs.readFileSync(sursa, 'utf8');
fs.mkdirSync('parti', { recursive: true });

const scripturi = [...h.matchAll(/<script>/g)].map(m => m.index);
if (scripturi.length < 2) { console.error('Nu recunosc fișierul: nu are scripturile așteptate.'); process.exit(1); }

// Scriptul mare are bibliotecile lipite de codul aplicației. Le despărțim la
// prima linie scrisă de noi: lista lunilor, care nu apare în nicio bibliotecă.
const inceput = scripturi[1] + '<script>'.length;
const sfarsit = h.indexOf('</script>', inceput);
const bloc = h.slice(inceput, sfarsit);

const ANCORA = 'var yo=["ianuarie"';
const taietura = bloc.indexOf(ANCORA);
if (taietura < 0) { console.error('Nu găsesc începutul codului aplicației.'); process.exit(1); }

const parti = {
  'cap.html': h.slice(0, inceput),                 // <head>, stilul, primul script
  'biblioteci.js': bloc.slice(0, taietura),        // React, three.js, iconițe
  'aplicatie.js': bloc.slice(taietura),            // ← singura bucată pe care o edităm
  'coada.html': h.slice(sfarsit),                  // închiderea și înregistrarea sw
};
Object.entries(parti).forEach(([nume, continut]) => {
  fs.writeFileSync(`parti/${nume}`, continut);
  console.log(`  parti/${nume.padEnd(16)} ${Math.round(continut.length / 1024)} KB`);
});

// Amprenta fișierului original: la reasamblare verificăm că bucățile pe care nu
// le atingem au rămas identice.
const crypto = require('crypto');
const amprenta = {
  original: crypto.createHash('sha256').update(h).digest('hex'),
  neatinse: crypto.createHash('sha256')
    .update(parti['cap.html'] + parti['biblioteci.js'] + parti['coada.html']).digest('hex'),
  versiune: (h.match(/IAS v[0-9.]+/) || ['?'])[0],
  // Numărăm etichetele în fișierul bun: la reasamblare trebuie să iasă la fel.
  // Nu contează cât fac — contează să nu se schimbe.
  etichete: {
    deschise: (h.match(/<script>/g) || []).length,
    inchise: (h.match(/<\/script>/g) || []).length,
  },
};
fs.writeFileSync('parti/amprenta.json', JSON.stringify(amprenta, null, 2));
console.log('\n  versiune:', amprenta.versiune);
console.log('  amprentă salvată — reasamblarea o verifică.');
