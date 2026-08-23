/* Pune bucățile la loc și scoate un index.html gata de urcat.
   Verifică întâi că părțile pe care nu le atingem au rămas neschimbate, apoi că
   fișierul ieșit e valid și complet. Dacă ceva nu e în regulă, nu scrie nimic —
   mai bine niciun fișier decât unul stricat.

   Rulare:  node asambleaza.js [versiune-nouă]   */

const fs = require('fs');
const crypto = require('crypto');

let cap = fs.readFileSync('parti/cap.html', 'utf8');
const biblioteci = fs.readFileSync('parti/biblioteci.js', 'utf8');
let aplicatie = fs.readFileSync('parti/aplicatie.js', 'utf8');
const coada = fs.readFileSync('parti/coada.html', 'utf8');
const amprenta = JSON.parse(fs.readFileSync('parti/amprenta.json', 'utf8'));

// 1. Părțile neatinse trebuie să fie exact cele de la desfacere.
const acum = crypto.createHash('sha256').update(cap + biblioteci + coada).digest('hex');
if (acum !== amprenta.neatinse) {
  console.error('✕ Bibliotecile sau stilul s-au modificat. Nu asamblez.');
  console.error('  Repară-le sau desfă din nou fișierul bun.');
  process.exit(1);
}

// 2. Versiunea nouă, dacă e cerută, se schimbă peste tot deodată.
const versiuneNoua = process.argv[2];
if (versiuneNoua) {
  const vechea = (amprenta.versiune || '').replace('IAS ', '');
  if (!vechea) { console.error('✕ Nu știu versiunea veche.'); process.exit(1); }
  const inainte = aplicatie;
  aplicatie = aplicatie.split(vechea).join(versiuneNoua);
  if (aplicatie === inainte) { console.error('✕ Nu am găsit versiunea', vechea, 'în cod.'); process.exit(1); }
  // Titlul paginii și mesajul de pornire poartă și ele numărul; le schimbăm doar
  // în copia din memorie, ca amprenta părților neatinse să rămână valabilă.
  cap = cap.split(vechea).join(versiuneNoua);
  console.log('  versiune:', vechea, '→', versiuneNoua);
}

const html = cap + biblioteci + aplicatie + coada;

// 3. Verificări asupra fișierului ieșit, înainte să atingem discul.
const probe = [
  ['începe cu doctype', html.startsWith('<!DOCTYPE html>')],
  ['se termină cu </html>', html.trim().endsWith('</html>')],
  ['are stilul complet', html.includes('--violet:') && html.includes('glow-cadru')],
  ['are aplicația', html.includes('Instructor Auto Sistem')],
  ['are garajul', html.includes('Hatchback') && html.includes('iasVehiculDinFisier')],
  ['are licențierea', html.includes('9F3K')],
  ['scripturile au rămas la fel',
    (html.match(/<script>/g) || []).length === amprenta.etichete.deschise
    && (html.match(/<\/script>/g) || []).length === amprenta.etichete.inchise],
];
let bune = 0;
probe.forEach(([nume, ok]) => { console.log((ok ? '  ✓ ' : '  ✕ ') + nume); if (ok) bune++; });
if (bune !== probe.length) { console.error('\n✕ Fișierul nu e bun. Nu l-am scris.'); process.exit(1); }

fs.writeFileSync('index.html', html);
console.log('\n  index.html scris:', Math.round(html.length / 1024), 'KB');

// 4. Service workerul poartă numărul versiunii, ca telefoanele să ia fișierul nou.
if (versiuneNoua) {
  const sw = fs.readFileSync('sw.js', 'utf8');
  const nou = sw.replace(/ias-v[0-9.]+/, 'ias-' + versiuneNoua);   // oricare ar fi fost înainte
  if (nou === sw) console.log('  ! atenție: n-am putut schimba versiunea în sw.js');
  else { fs.writeFileSync('sw.js', nou); console.log('  sw.js actualizat.'); }
}
