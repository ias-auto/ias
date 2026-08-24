/* Reînnoiește amprenta părților care nu se ating de obicei.

   `asambleaza.js` refuză să scrie fișierul dacă `cap.html`, `biblioteci.js` sau
   `coada.html` s-au schimbat — tocmai ca o modificare din greșeală să nu treacă
   nevăzută. Când schimbarea e voită, cum a fost scoaterea reîncărcării forțate
   din `coada.html`, amprenta se reînnoiește de aici, cu mâna, ca actul să fie
   unul conștient.

   Rulare:  node reamprenta.js                                              */

const fs = require('fs');
const crypto = require('crypto');

const cap = fs.readFileSync('parti/cap.html', 'utf8');
const biblioteci = fs.readFileSync('parti/biblioteci.js', 'utf8');
const coada = fs.readFileSync('parti/coada.html', 'utf8');
const amprenta = JSON.parse(fs.readFileSync('parti/amprenta.json', 'utf8'));

const noua = crypto.createHash('sha256').update(cap + biblioteci + coada).digest('hex');

if (noua === amprenta.neatinse) {
  console.log('  Nimic de reînnoit: părțile sunt exact cele din amprentă.');
  process.exit(0);
}

console.log('  amprenta veche: ' + amprenta.neatinse.slice(0, 16) + '…');
console.log('  amprenta nouă : ' + noua.slice(0, 16) + '…');

amprenta.neatinse = noua;
amprenta.etichete = {
  deschise: (cap.match(/<script>/g) || []).length + (coada.match(/<script>/g) || []).length,
  inchise: (cap.match(/<\/script>/g) || []).length + (coada.match(/<\/script>/g) || []).length,
};
fs.writeFileSync('parti/amprenta.json', JSON.stringify(amprenta, null, 2));
console.log('\n  Amprentă reînnoită. De acum, asamblarea o compară cu asta.');
