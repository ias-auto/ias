/* Balta de lumină ține pasul cu mașina: alunecă lateral cât alunecă botul, se
   rotește cu el, dar rămâne lipită de asfalt.                                */
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

cer('lumina alunecă odată cu mașina',
  /Ee\.position\.z = we\.position\.z/.test(html) && /ae\.position\.z = we\.position\.z/.test(html));
cer('  și se rotește cu botul',
  /Ee\.rotation\.y = -we\.rotation\.y/.test(html));
cer('  dar nu urcă de pe asfalt',
  !/Ee\.position\.y = we\.position\.y/.test(html), 'înălțimea rămâne fixă');
cer('pâlpâie în ritmul legănării',
  /iasLumina \* \(\.9 \+ Math\.sin\(Ie \* 8\.5\) \* \.07\)/.test(html));
cer('  în jurul tăriei date de perioada zilei',
  /iasLumina = Lt \* \.9/.test(html));

/* ---- mărimea, socotită pe cele două mașini ---- */
const cam = require('three');
const C = new cam.PerspectiveCamera(30, 360 / 142, 0.1, 120);
C.position.set(4.6, 1.85, 4.2); C.lookAt(0, 0.82, 0); C.updateMatrixWorld(true);

[['Hatchback', 3.9, 1.72], ['Berlină', 4.3, 1.92]].forEach(([nume, L, lat]) => {
  const lungF = L * 0.33, latF = lat * 2.6, cx = L / 2 + lungF / 2 - 0.15;
  // legănarea laterală a mașinii e de ±0,09; lumina o urmează
  let inCadru = 0, tot = 0;
  [-0.09, 0, 0.09].forEach(dz => {
    const m = new cam.Mesh(new cam.PlaneGeometry(latF, lungF));
    m.rotation.x = -Math.PI / 2; m.rotation.z = -Math.PI / 2;
    m.position.set(cx, 0.02, dz); m.updateMatrixWorld(true);
    for (let a = -1; a <= 1; a += 0.2) for (let b = -1; b <= 1; b += 0.2) {
      const p = new cam.Vector3(a * latF / 2, b * lungF / 2, 0).applyMatrix4(m.matrixWorld).project(C);
      const sx = (p.x + 1) / 2 * 100, sy = (1 - p.y) / 2 * 100;
      tot++; if (sx > 0 && sx < 100 && sy > 0 && sy < 100) inCadru++;
    }
  });
  cer(`${nume}: lumina rămâne în cadru cât se leagănă`,
    inCadru / tot > 0.45, `${Math.round(inCadru / tot * 100)}% vizibil, la ±9 cm legănare`);
});

console.log('');
rez.forEach(([s, n, d]) => console.log('  ' + s + ' ' + n.padEnd(44) + (d || '')));
const cazute = rez.filter(r => r[0] === '✕').length;
console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
