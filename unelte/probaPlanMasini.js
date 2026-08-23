/* Gruparea pe mașini, probată pe chiar planificatorul din aplicație: șase elevi,
   trei pe o mașină și trei pe alta, toți disponibili oricând. Dacă gruparea
   merge, ziua nu trebuie să sară de la o mașină la alta mai des decât e nevoie. */
const fs = require('fs');
const src = fs.readFileSync('parti/aplicatie.js', 'utf8');
/* Luăm din sursă doar partea de socoteală — de la constante până înaintea
   pieselor de interfață — sărind peste blocul cu iconițe, care are nevoie de
   biblioteci. */
const linii = src.split('\n');
const inceputPlan = linii.findIndex(l => /^function uk\(/.test(l));
let adanc = 0; let sfarsitPlan = inceputPlan;
for (let i = inceputPlan; i < linii.length; i++) {
  for (const ch of linii[i]) { if (ch === '{') adanc++; else if (ch === '}') adanc--; }
  if (adanc === 0 && i > inceputPlan) { sfarsitPlan = i; break; }
}
const cod = linii.slice(0, 140).join('\n') + '\n'
  + linii.slice(200, inceputPlan).join('\n') + '\n'
  + linii.slice(inceputPlan, sfarsitPlan + 1).join('\n');

const mediu = {};
new Function('exports', cod + '\n;Object.assign(exports, { uk: typeof uk !== "undefined" ? uk : null });')(mediu);
const genereaza = mediu.uk;
if (!genereaza) { console.log('  ✕ nu am putut încărca planificatorul'); process.exit(1); }

const azi = new Date();
const iso = (d) => d.toISOString().slice(0, 10);
const maine = iso(new Date(azi.getTime() + 86400000));

const elevi = [];
for (let i = 1; i <= 6; i++) {
  elevi.push({
    id: 'e' + i, name: 'Elev ' + i, remaining: 3, weeklyLimit: 7,
    // mașinile intercalate dinadins: dacă gruparea n-ar face nimic,
    // ziua ar sări de la o mașină la alta la fiecare ședință
    masina: i % 2 ? 'm1' : 'm2', includeRezerva: true,
  });
}
const setari = {
  workDays: [0, 1, 2, 3, 4, 5, 6], startMin: 480, endMin: 1200, sessionMin: 90, stepMin: 30,
  examStudents: [], horizonDays: 7, locations: [],
};

function schimbariDeMasina(grupare) {
  const plan = genereaza({
    students: elevi, existingSessions: [],
    settings: { ...setari, grupare },
    fromDateISO: maine,
  });
  const peZile = {};
  plan.proposals.forEach(p => { (peZile[p.date] = peZile[p.date] || []).push(p); });
  let schimbari = 0; let total = 0;
  Object.values(peZile).forEach(lista => {
    lista.sort((a, b) => a.startMin - b.startMin);
    for (let i = 1; i < lista.length; i++) {
      const a = elevi.find(e => e.id === lista[i - 1].studentId).masina;
      const b = elevi.find(e => e.id === lista[i].studentId).masina;
      total++;
      if (a !== b) schimbari++;
    }
  });
  return { schimbari, total, sedinte: plan.proposals.length };
}

const fara = schimbariDeMasina('fara');
const cu = schimbariDeMasina('masina');
console.log('');
console.log('  fără grupare : ' + fara.schimbari + ' schimbări de mașină din ' + fara.total + ' treceri (' + fara.sedinte + ' ședințe)');
console.log('  pe mașini    : ' + cu.schimbari + ' schimbări de mașină din ' + cu.total + ' treceri (' + cu.sedinte + ' ședințe)');
console.log('');
const bine = cu.schimbari < fara.schimbari && cu.sedinte === fara.sedinte;
console.log('  ' + (bine ? '✓' : '✕') + ' gruparea pe mașini reduce schimbările, fără să piardă ședințe');
process.exit(bine ? 0 : 1);
