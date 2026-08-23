/* Cititor de modele .glb, scris de mână.
   Formatul e simplu: un antet, o bucată de text care descrie modelul și o
   bucată de date brute. Nu avem nevoie de nicio bibliotecă în plus — citim
   exact ce ne trebuie: vârfurile, normalele, culoarea din paletă și roțile.

   Modelele Kenney iau culoarea dintr-o singură imagine-paletă. În loc s-o
   încărcăm ca textură, citim culoarea o dată, la fiecare vârf, și o punem
   direct pe geometrie. Așa scăpăm de imagine cu totul, iar vopsirea în altă
   culoare devine o simplă înmulțire.                                        */

function citesteGLB(bufer) {
  const dv = new DataView(bufer);
  if (dv.getUint32(0, true) !== 0x46546c67) throw new Error('Nu e un fișier .glb');

  let poz = 12;
  let json = null;
  let bin = null;
  while (poz < dv.byteLength) {
    const lung = dv.getUint32(poz, true);
    const fel = dv.getUint32(poz + 4, true);
    const start = poz + 8;
    if (fel === 0x4e4f534a) json = JSON.parse(new TextDecoder().decode(new Uint8Array(bufer, start, lung)));
    else if (fel === 0x004e4942) bin = new Uint8Array(bufer, start, lung);
    poz = start + lung + (lung % 4 ? 4 - (lung % 4) : 0);
  }
  if (!json || !bin) throw new Error('Fișierul .glb e incomplet');
  return { json, bin };
}

// Citește un accesor: lista de numere din spatele unui atribut (poziții, normale…).
function citesteAccesor(json, bin, index) {
  const acc = json.accessors[index];
  const bv = json.bufferViews[acc.bufferView];
  const marimi = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
  const buc = marimi[acc.type];
  const start = (bv.byteOffset || 0) + (acc.byteOffset || 0);

  const feluri = {
    5126: [Float32Array, 4],
    5125: [Uint32Array, 4],
    5123: [Uint16Array, 2],
    5121: [Uint8Array, 1],
  };
  const [Tip, octeti] = feluri[acc.componentType];
  const pas = bv.byteStride || buc * octeti;

  // Cu pas propriu, datele sunt întrețesute: le luăm vârf cu vârf.
  const iesire = new Tip(acc.count * buc);
  for (let i = 0; i < acc.count; i++) {
    const o = bin.byteOffset + start + i * pas;
    const bucata = new Tip(bin.buffer, o, buc);
    for (let k = 0; k < buc; k++) iesire[i * buc + k] = bucata[k];
  }
  return iesire;
}

module.exports = { citesteGLB, citesteAccesor };

/* ------------------------------- proba ---------------------------------- */
if (require.main === module) {
  const fs = require('fs');
  const cale = process.argv[2] || '/tmp/kit2/Models/GLB format';
  const fisiere = fs.readdirSync(cale).filter(f => f.endsWith('.glb'));

  console.log('CITITORUL, probat pe toate modelele:\n');
  let bune = 0;
  fisiere.forEach(f => {
    try {
      const b = fs.readFileSync(`${cale}/${f}`);
      const ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
      const { json, bin } = citesteGLB(ab);

      let varfuri = 0; let triunghiuri = 0;
      const cutie = { min: [1e9, 1e9, 1e9], max: [-1e9, -1e9, -1e9] };
      json.nodes.forEach(nod => {
        if (nod.mesh == null) return;
        const t = nod.translation || [0, 0, 0];
        json.meshes[nod.mesh].primitives.forEach(p => {
          const poz = citesteAccesor(json, bin, p.attributes.POSITION);
          const idx = citesteAccesor(json, bin, p.indices);
          varfuri += poz.length / 3;
          triunghiuri += idx.length / 3;
          for (let i = 0; i < poz.length; i += 3) {
            for (let k = 0; k < 3; k++) {
              const v = poz[i + k] + t[k];
              if (v < cutie.min[k]) cutie.min[k] = v;
              if (v > cutie.max[k]) cutie.max[k] = v;
            }
          }
        });
      });
      const L = (cutie.max[2] - cutie.min[2]).toFixed(2);
      const l = (cutie.max[0] - cutie.min[0]).toFixed(2);
      const h = (cutie.max[1] - cutie.min[1]).toFixed(2);
      const roti = json.nodes.filter(n => /wheel/.test(n.name || '')).length;
      console.log(`  ✓ ${f.replace('.glb', '').padEnd(20)} ${String(varfuri).padStart(5)} vârfuri  ${L}×${l}×${h} m  ${roti} roți`);
      bune++;
    } catch (e) {
      console.log(`  ✕ ${f}: ${e.message}`);
    }
  });
  console.log(`\n  ${bune} din ${fisiere.length} modele citite corect`);
}
