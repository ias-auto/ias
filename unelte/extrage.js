/* Scoate o singură mașină dintr-un set mare și o salvează ca fișier mic.

   Seturile descărcate de pe internet vin cu toate mașinile într-un fișier, plus
   texturi de zeci de megaocteți. Pentru antet nu ne trebuie nimic din toate
   astea: luăm doar forma — caroseria, geamurile, farurile și cele patru roți —
   și îi dăm culoarea din aplicație. Rezultatul e de o sută de ori mai mic.

   Rulare:  node extrage.js <set.glb> "Hatchback Body" hatchback            */

const fs = require('fs');
const { citesteGLB, citesteAccesor } = require('./citestGLB.js');

/* ------------------------- matrice și transformări ----------------------- */

const unitate = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

function inmulteste(a, b) {   // a·b, ambele pe coloane, ca în format
  const r = new Array(16).fill(0);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k];
      r[i * 4 + j] = s;
    }
  }
  return r;
}

function matriceaNodului(nod) {
  if (nod.matrix) return nod.matrix.slice();
  const m = unitate();
  const s = nod.scale || [1, 1, 1];
  const t = nod.translation || [0, 0, 0];
  if (nod.rotation) {
    const [x, y, z, w] = nod.rotation;
    const r = [
      1 - 2 * (y * y + z * z), 2 * (x * y + z * w), 2 * (x * z - y * w), 0,
      2 * (x * y - z * w), 1 - 2 * (x * x + z * z), 2 * (y * z + x * w), 0,
      2 * (x * z + y * w), 2 * (y * z - x * w), 1 - 2 * (x * x + y * y), 0,
      0, 0, 0, 1,
    ];
    for (let i = 0; i < 12; i++) m[i] = r[i];
  }
  for (let c = 0; c < 3; c++) for (let f = 0; f < 3; f++) m[c * 4 + f] *= s[c];
  m[12] = t[0]; m[13] = t[1]; m[14] = t[2];
  return m;
}

function inverseaza(m) {
  const inv = new Array(16);
  const a = m;
  inv[0] = a[5]*a[10]*a[15] - a[5]*a[11]*a[14] - a[9]*a[6]*a[15] + a[9]*a[7]*a[14] + a[13]*a[6]*a[11] - a[13]*a[7]*a[10];
  inv[4] = -a[4]*a[10]*a[15] + a[4]*a[11]*a[14] + a[8]*a[6]*a[15] - a[8]*a[7]*a[14] - a[12]*a[6]*a[11] + a[12]*a[7]*a[10];
  inv[8] = a[4]*a[9]*a[15] - a[4]*a[11]*a[13] - a[8]*a[5]*a[15] + a[8]*a[7]*a[13] + a[12]*a[5]*a[11] - a[12]*a[7]*a[9];
  inv[12] = -a[4]*a[9]*a[14] + a[4]*a[10]*a[13] + a[8]*a[5]*a[14] - a[8]*a[6]*a[13] - a[12]*a[5]*a[10] + a[12]*a[6]*a[9];
  inv[1] = -a[1]*a[10]*a[15] + a[1]*a[11]*a[14] + a[9]*a[2]*a[15] - a[9]*a[3]*a[14] - a[13]*a[2]*a[11] + a[13]*a[3]*a[10];
  inv[5] = a[0]*a[10]*a[15] - a[0]*a[11]*a[14] - a[8]*a[2]*a[15] + a[8]*a[3]*a[14] + a[12]*a[2]*a[11] - a[12]*a[3]*a[10];
  inv[9] = -a[0]*a[9]*a[15] + a[0]*a[11]*a[13] + a[8]*a[1]*a[15] - a[8]*a[3]*a[13] - a[12]*a[1]*a[11] + a[12]*a[3]*a[9];
  inv[13] = a[0]*a[9]*a[14] - a[0]*a[10]*a[13] - a[8]*a[1]*a[14] + a[8]*a[2]*a[13] + a[12]*a[1]*a[10] - a[12]*a[2]*a[9];
  inv[2] = a[1]*a[6]*a[15] - a[1]*a[7]*a[14] - a[5]*a[2]*a[15] + a[5]*a[3]*a[14] + a[13]*a[2]*a[7] - a[13]*a[3]*a[6];
  inv[6] = -a[0]*a[6]*a[15] + a[0]*a[7]*a[14] + a[4]*a[2]*a[15] - a[4]*a[3]*a[14] - a[12]*a[2]*a[7] + a[12]*a[3]*a[6];
  inv[10] = a[0]*a[5]*a[15] - a[0]*a[7]*a[13] - a[4]*a[1]*a[15] + a[4]*a[3]*a[13] + a[12]*a[1]*a[7] - a[12]*a[3]*a[5];
  inv[14] = -a[0]*a[5]*a[14] + a[0]*a[6]*a[13] + a[4]*a[1]*a[14] - a[4]*a[2]*a[13] - a[12]*a[1]*a[6] + a[12]*a[2]*a[5];
  inv[3] = -a[1]*a[6]*a[11] + a[1]*a[7]*a[10] + a[5]*a[2]*a[11] - a[5]*a[3]*a[10] - a[9]*a[2]*a[7] + a[9]*a[3]*a[6];
  inv[7] = a[0]*a[6]*a[11] - a[0]*a[7]*a[10] - a[4]*a[2]*a[11] + a[4]*a[3]*a[10] + a[8]*a[2]*a[7] - a[8]*a[3]*a[6];
  inv[11] = -a[0]*a[5]*a[11] + a[0]*a[7]*a[9] + a[4]*a[1]*a[11] - a[4]*a[3]*a[9] - a[8]*a[1]*a[7] + a[8]*a[3]*a[5];
  inv[15] = a[0]*a[5]*a[10] - a[0]*a[6]*a[9] - a[4]*a[1]*a[10] + a[4]*a[2]*a[9] + a[8]*a[1]*a[6] - a[8]*a[2]*a[5];
  let det = a[0]*inv[0] + a[1]*inv[4] + a[2]*inv[8] + a[3]*inv[12];
  if (!det) return unitate();
  det = 1 / det;
  return inv.map(x => x * det);
}

const aplica = (m, p) => [
  m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12],
  m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
  m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14],
];
const aplicaDirectie = (m, p) => [
  m[0] * p[0] + m[4] * p[1] + m[8] * p[2],
  m[1] * p[0] + m[5] * p[1] + m[9] * p[2],
  m[2] * p[0] + m[6] * p[1] + m[10] * p[2],
];

/* --------------------------- scrierea unui .glb -------------------------- */

function scrieGLB(bucati, cale) {
  const accesori = []; const vederi = []; const meshe = []; const noduri = [];
  const parti = []; let deplasare = 0;

  const adauga = (tablou, tip, felComponenta, min, max) => {
    const octeti = Buffer.from(tablou.buffer, tablou.byteOffset, tablou.byteLength);
    const aliniat = octeti.length % 4 ? Buffer.concat([octeti, Buffer.alloc(4 - octeti.length % 4)]) : octeti;
    vederi.push({ buffer: 0, byteOffset: deplasare, byteLength: octeti.length });
    parti.push(aliniat); deplasare += aliniat.length;
    const acc = { bufferView: vederi.length - 1, componentType: felComponenta, count: tablou.length / ({ SCALAR: 1, VEC2: 2, VEC3: 3 })[tip], type: tip };
    if (min) { acc.min = min; acc.max = max; }
    accesori.push(acc);
    return accesori.length - 1;
  };

  bucati.forEach((b) => {
    const min = [1e9, 1e9, 1e9]; const max = [-1e9, -1e9, -1e9];
    for (let i = 0; i < b.pozitii.length; i += 3) {
      for (let k = 0; k < 3; k++) {
        const v = b.pozitii[i + k];
        if (v < min[k]) min[k] = v;
        if (v > max[k]) max[k] = v;
      }
    }
    const aPoz = adauga(b.pozitii, 'VEC3', 5126, min, max);
    const aNor = adauga(b.normale, 'VEC3', 5126);
    const aInd = adauga(b.indici, 'SCALAR', 5125);
    meshe.push({ primitives: [{ attributes: { POSITION: aPoz, NORMAL: aNor }, indices: aInd }] });
    noduri.push({ mesh: meshe.length - 1, name: b.nume, translation: b.centru || [0, 0, 0] });
  });

  const bin = Buffer.concat(parti);
  const json = {
    asset: { version: '2.0', generator: 'IAS extrage.js' },
    scene: 0,
    scenes: [{ nodes: noduri.map((_, i) => i) }],
    nodes: noduri,
    meshes: meshe,
    accessors: accesori,
    bufferViews: vederi,
    buffers: [{ byteLength: bin.length }],
  };
  let textJson = Buffer.from(JSON.stringify(json), 'utf8');
  if (textJson.length % 4) textJson = Buffer.concat([textJson, Buffer.alloc(4 - textJson.length % 4, 0x20)]);

  const antet = Buffer.alloc(12);
  antet.writeUInt32LE(0x46546c67, 0);
  antet.writeUInt32LE(2, 4);
  antet.writeUInt32LE(12 + 8 + textJson.length + 8 + bin.length, 8);
  const capJson = Buffer.alloc(8); capJson.writeUInt32LE(textJson.length, 0); capJson.writeUInt32LE(0x4e4f534a, 4);
  const capBin = Buffer.alloc(8); capBin.writeUInt32LE(bin.length, 0); capBin.writeUInt32LE(0x004e4942, 4);

  fs.writeFileSync(cale, Buffer.concat([antet, capJson, textJson, capBin, bin]));
  return 12 + 8 + textJson.length + 8 + bin.length;
}

/* ------------------------------- extragerea ------------------------------ */

function extrage(setCale, numeCaroserie, iesire, lungimeTinta, intoarceManual) {
  const b = fs.readFileSync(setCale);
  const { json, bin } = citesteGLB(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));

  // matricea fiecărui nod, cu tot cu părinți
  const parinte = {};
  json.nodes.forEach((n, i) => (n.children || []).forEach(c => { parinte[c] = i; }));
  const lume = (i) => {
    let m = matriceaNodului(json.nodes[i]);
    let p = parinte[i];
    while (p != null) { m = inmulteste(matriceaNodului(json.nodes[p]), m); p = parinte[p]; }
    return m;
  };
  const centru = (i) => { const m = lume(i); return [m[12], m[13], m[14]]; };

  const iCaroserie = json.nodes.findIndex(n => n.name === numeCaroserie);
  if (iCaroserie < 0) throw new Error('nu găsesc "' + numeCaroserie + '"');
  const cCaroserie = centru(iCaroserie);

  // cele patru roți cele mai apropiate de caroseria asta
  const roti = json.nodes
    .map((n, i) => ({ i, n }))
    .filter(x => /^Wheel/i.test(x.n.name || '') && x.n.children)
    .map(x => {
      const c = centru(x.i);
      const d = Math.hypot(c[0] - cCaroserie[0], c[1] - cCaroserie[1], c[2] - cCaroserie[2]);
      return { ...x, c, d };
    })
    .sort((a, b2) => a.d - b2.d)
    .slice(0, 4);

  /* Aducem totul în axele proprii ale mașinii: în set, mașinile stau rotite și
     împrăștiate, iar dacă păstrăm rotația, gabaritul iese umflat și lungimea
     cade pe o axă strâmbă. Înmulțind cu inversa matricei caroseriei, mașina
     ajunge dreaptă, cu centrul în origine. */
  const inversa = inverseaza(lume(iCaroserie));
  const bucati = [];

  const strange = (iNod, numeBaza, centruLocal) => {
    const copii = json.nodes[iNod].children || [iNod];
    copii.forEach((ic) => {
      const nod = json.nodes[ic];
      if (nod.mesh == null) return;
      const catreLocal = inmulteste(inversa, lume(ic));
      json.meshes[nod.mesh].primitives.forEach((p) => {
        const poz = citesteAccesor(json, bin, p.attributes.POSITION);
        const nor = p.attributes.NORMAL != null ? citesteAccesor(json, bin, p.attributes.NORMAL) : null;
        const idx = citesteAccesor(json, bin, p.indices);
        const pozL = new Float32Array(poz.length);
        const norL = new Float32Array(poz.length);
        for (let i = 0; i < poz.length; i += 3) {
          const v = aplica(catreLocal, [poz[i], poz[i + 1], poz[i + 2]]);
          pozL[i] = v[0] - centruLocal[0];
          pozL[i + 1] = v[1] - centruLocal[1];
          pozL[i + 2] = v[2] - centruLocal[2];
          if (nor) {
            const d = aplicaDirectie(catreLocal, [nor[i], nor[i + 1], nor[i + 2]]);
            const L = Math.hypot(d[0], d[1], d[2]) || 1;
            norL[i] = d[0] / L; norL[i + 1] = d[1] / L; norL[i + 2] = d[2] / L;
          }
        }
        const felul = /glass/i.test(nod.name || '') ? 'glass' : /optic/i.test(nod.name || '') ? 'optics' : 'body';
        bucati.push({
          nume: numeBaza === 'body' ? felul : numeBaza,
          pozitii: pozL, normale: norL, indici: new Uint32Array(idx),
          centru: centruLocal.slice(),
          eRoata: numeBaza !== 'body',
        });
      });
    });
  };

  strange(iCaroserie, 'body', [0, 0, 0]);
  // Roțile își păstrează centrul separat, ca să se poată învârti în jurul lui.
  roti.forEach((r, k) => {
    const m = inmulteste(inversa, lume(r.i));
    strange(r.i, 'wheel-' + k, [m[12], m[13], m[14]]);
  });

  /* Măsurăm mașina întreagă, o punem cu roțile pe asfalt și o aducem la
     lungimea cerută, cu lungimea pe axa X. */
  const min = [1e9, 1e9, 1e9]; const max = [-1e9, -1e9, -1e9];
  bucati.forEach((b2) => {
    for (let i = 0; i < b2.pozitii.length; i += 3) {
      for (let k = 0; k < 3; k++) {
        const v = b2.pozitii[i + k] + b2.centru[k];
        if (v < min[k]) min[k] = v;
        if (v > max[k]) max[k] = v;
      }
    }
  });
  const dim = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];

  /* Fiecare set vine cu altă convenție de axe. Le deducem din chiar forma
     mașinii: cea mai mare întindere e lungimea, cea mai mică e înălțimea, iar
     ce rămâne e lățimea. Așa merge orice model, indiferent de unde vine. */
  const ordine = [0, 1, 2].sort((a, b) => dim[b] - dim[a]);
  const axaL = ordine[0];      // lungimea → X
  const axaLat = ordine[1];    // lățimea  → Z
  const axaH = ordine[2];      // înălțimea → Y
  const scara = lungimeTinta / dim[axaL];
  const jos = min[axaH];

  /* Care capăt e botul? La orice mașină de serie, capota e mai lungă decât
     portbagajul, deci habitaclul stă spre spate. Măsurăm unde cade centrul
     geamurilor: dacă e în față, mașina e întoarsă și o rotim o jumătate de tură.
     Așa merge orice model, fără să ne uităm la poze. */
  let semn = 1;
  const geamuri = bucati.filter((b2) => b2.nume === 'glass');
  if (geamuri.length) {
    let suma = 0; let cate = 0;
    geamuri.forEach((b2) => {
      for (let i = 0; i < b2.pozitii.length; i += 3) {
        suma += b2.pozitii[i + axaL] + b2.centru[axaL];
        cate++;
      }
    });
    const mijloc = (min[axaL] + max[axaL]) / 2;
    if (suma / cate > mijloc) semn = -1;   // cabina e spre +X → botul e în spate
  }
  /* Regula de mai sus e doar o bănuială bună: la unele modele cabina stă aproape
     de mijloc și atunci nu decide nimic. De aceea orientarea se poate impune de
     afară, după ce mașina a fost văzută o dată în aplicație. */
  if (intoarceManual === true) semn = 1;
  if (intoarceManual === false) semn = -1;

  const roteste = (v) => [semn * v[axaL] * scara, (v[axaH] - jos) * scara, semn * v[axaLat] * scara];
  const rotesteDirectie = (v) => [semn * v[axaL], v[axaH], semn * v[axaLat]];

  bucati.forEach((b2) => {
    const c = roteste(b2.centru);
    for (let i = 0; i < b2.pozitii.length; i += 3) {
      const absolut = [
        b2.pozitii[i] + b2.centru[0],
        b2.pozitii[i + 1] + b2.centru[1],
        b2.pozitii[i + 2] + b2.centru[2],
      ];
      const v = roteste(absolut);
      // vârfurile rămân față de centrul propriu, ca roata să se învârtă pe loc
      b2.pozitii[i] = v[0] - c[0];
      b2.pozitii[i + 1] = v[1] - c[1];
      b2.pozitii[i + 2] = v[2] - c[2];
      const n = rotesteDirectie([b2.normale[i], b2.normale[i + 1], b2.normale[i + 2]]);
      b2.normale[i] = n[0]; b2.normale[i + 1] = n[1]; b2.normale[i + 2] = n[2];
    }
    b2.centru = c;
  });

  const marime = scrieGLB(bucati, iesire);
  return { bucati: bucati.length, roti: roti.length, marime, intoarsa: semn === -1, dim: [dim[axaL], dim[axaLat], dim[axaH]].map(d => (d * scara).toFixed(2)) };
}

if (require.main === module) {
  const argumente = process.argv.slice(2);
  const botLaPlus = argumente.includes('--bot-plus') ? true
    : argumente.includes('--bot-minus') ? false : undefined;
  const [set, nume, iesire, lung] = argumente.filter(a => !a.startsWith('--'));
  const r = extrage(set, nume, iesire, Number(lung) || 3.9, botLaPlus);
  console.log(`  ${nume} → ${iesire}`);
  console.log(`     ${r.bucati} bucăți, ${r.roti} roți, ${Math.round(r.marime / 1024)} KB, ${r.dim.join(' × ')} unități`);
  console.log(`     orientare: ${r.intoarsa ? 'rotită o jumătate de tură' : 'lăsată cum era'}${botLaPlus === undefined ? ' (după forma mașinii)' : ' (cerută de mine)'}`);
}

module.exports = { extrage };
