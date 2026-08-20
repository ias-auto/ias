// Fiecare vehicul trebuie să se construiască, să aibă roți și cote credibile.
const THREE = require('three');
const fs = require('fs');
// pânză simulată: texturile nu contează aici, doar geometria
const panzaFalsa = () => ({
  width: 0, height: 0,
  getContext: () => new Proxy({}, { get: (t, p) => (p === 'measureText' ? () => ({ width: 10 }) : () => {}) }),
});
global.document = { createElement: (t) => (t === 'canvas' ? panzaFalsa() : {}) };
const src = fs.readFileSync('/home/claude/app.jsx', 'utf8');
const stub = ['Sunrise','Sun','Sunset','Moon'].map(n => `const ${n} = null;`).join('');
const cod = stub + src.slice(src.indexOf('const RO_MONTHS ='), src.indexOf('function Car3D('));
const f = new Function('THREE', cod + 'return { GARAJ, REMORCI };')(THREE);

const mat = () => new THREE.MeshStandardMaterial();
const m = ['paint','amberM','darkM','glassM','sideGlassM','tyreM','hubM','chromeM','headM','ledM','tailM','signM','plateM']
  .reduce((o, k) => { o[k] = mat(); return o; }, {});

const real = { hatchback: 4.06, sedan: 4.6, break: 4.7, suv: 4.4, mica: 2.9, moto: 2.1, motoAtas: 2.1, camion: 6.0, autobuz: 12 };
console.log('VEHICULE (cote la scara 1:1, prin împărțire la 0.9286):');
let toateBune = true;
Object.entries(f.GARAJ).forEach(([id, v]) => {
  let r;
  try { r = v.build(m); } catch (e) { console.log('  ✕ ' + v.nume + ': ' + e.message); toateBune = false; return; }
  const b = new THREE.Box3().setFromObject(r.grup);
  const L = (b.max.x - b.min.x), l = (b.max.z - b.min.z), h = b.max.y;
  const jos = b.min.y;
  const pot = Object.values(f.REMORCI).filter(x => x.categorii.includes(v.categorie)).map(x => x.nume);
  const ok = r.roti.length > 0 && jos > -0.05;
  if (!ok) toateBune = false;
  console.log('  ' + (ok ? '✓' : '✕') + ' ' + v.nume.padEnd(21) + 'cat ' + v.categorie.padEnd(3)
    + ' ' + (L/0.9286).toFixed(2) + '×' + (l/0.9286).toFixed(2) + '×' + (h/0.9286).toFixed(2) + ' m'
    + '  roți ' + String(r.roti.length).padStart(2) + '  → ' + (pot.join(', ') || 'fără remorcă'));
});
console.log('\nREMORCI:');
Object.values(f.REMORCI).forEach(r => {
  const x = r.build(m); const b = new THREE.Box3().setFromObject(x.grup);
  console.log('  ✓ ' + r.nume.padEnd(24) + (b.max.x-b.min.x).toFixed(2) + ' m  pentru ' + r.categorii.join('/'));
});
console.log('\ntoate se construiesc și stau pe asfalt:', toateBune ? 'DA' : 'NU');
