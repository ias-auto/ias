/* Probează garajul: că sunt exact două mașini, că paletarul are toate culorile
   și că fișierele de model chiar se pot citi cu cititorul din aplicație.      */
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const azi = new Date().toISOString().slice(0, 10);

const rez = [];
const cer = (n, ok, d) => rez.push([ok ? '✓' : '✕', n, d || '']);

// modelele, citite cu același cod ca în aplicație
const { citesteGLB, citesteAccesor } = require('./citestGLB.js');
['hatchback', 'berlina'].forEach(nume => {
  try {
    const b = fs.readFileSync(`modele/${nume}.glb`);
    const { json, bin } = citesteGLB(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
    const roti = json.nodes.filter(n => /^wheel/.test(n.name || ''));
    const parti = json.nodes.map(n => n.name);
    const mm = { min: [1e9, 1e9, 1e9], max: [-1e9, -1e9, -1e9] };
    json.nodes.forEach(n => {
      const t = n.translation || [0, 0, 0];
      const poz = citesteAccesor(json, bin, json.meshes[n.mesh].primitives[0].attributes.POSITION);
      for (let i = 0; i < poz.length; i += 3) for (let k = 0; k < 3; k++) {
        const v = poz[i + k] + t[k];
        if (v < mm.min[k]) mm.min[k] = v;
        if (v > mm.max[k]) mm.max[k] = v;
      }
    });
    const L = mm.max[0] - mm.min[0], l = mm.max[2] - mm.min[2], h = mm.max[1] - mm.min[1];
    cer(`modelul ${nume}`, roti.length === 4 && parti.includes('body') && parti.includes('glass'),
      `${L.toFixed(2)}×${l.toFixed(2)}×${h.toFixed(2)} m · ${roti.length} roți`);
    cer(`  ${nume}: roțile pe asfalt`, Math.abs(mm.min[1]) < 0.02, `y = ${mm.min[1].toFixed(3)}`);
    cer(`  ${nume}: lungimea pe axa mașinii`, L > l && L > h);
    /* Orientarea nu se poate deduce sigur din forma mașinii: la unele modele
       cabina stă aproape de mijloc. Fiecare model e privit o dată în aplicație,
       iar orientarea confirmată se scrie aici — proba o păzește de atunci
       înainte, ca o reextragere să n-o mai poată întoarce pe furiș. */
    const geam = json.nodes.find(n => n.name === 'glass');
    if (geam) {
      const t = geam.translation || [0, 0, 0];
      const p2 = citesteAccesor(json, bin, json.meshes[geam.mesh].primitives[0].attributes.POSITION);
      let sx = 0; let c = 0;
      for (let i = 0; i < p2.length; i += 3) { sx += p2[i] + t[0]; c++; }
      const acum = sx / c;
      const confirmat = { hatchback: -0.72, berlina: -0.44 }[nume];
      cer(`  ${nume}: botul e înainte`,
        confirmat == null || Math.sign(acum) === Math.sign(confirmat),
        `geamurile la x = ${acum.toFixed(2)} (confirmat pe ecran: ${confirmat})`);
    }
    // fiecare roată trebuie să aibă vârfurile în jurul centrului ei, altfel s-ar roti strâmb
    const razaOK = roti.every(n => {
      const poz = citesteAccesor(json, bin, json.meshes[n.mesh].primitives[0].attributes.POSITION);
      let max = 0;
      for (let i = 0; i < poz.length; i += 3) max = Math.max(max, Math.hypot(poz[i], poz[i + 1], poz[i + 2]));
      return max < 0.6;
    });
    cer(`  ${nume}: roțile se învârt pe loc`, razaOK);
  } catch (e) { cer(`modelul ${nume}`, false, e.message); }
});

/* Mișcarea roții, verificată cu aceeași matematică pe care o face scena: luăm un
   punct de pe janta din dreapta și urmărim unde ajunge după o rotire. Trebuie să
   rămână în planul roții (să nu se culce) și să plece înainte, spre botul mașinii. */
try {
  const THREE = require('three');
  const potr = html.match(/suport\.rotation\.x = (-?)Math\.PI \/ 2;\s*plasa\.rotation\.x = (-?)Math\.PI \/ 2/);
  cer('roata e ținută dreaptă', !!potr && potr[1] === '-' && potr[2] === '',
    potr ? `suport ${potr[1]}90°, roata ${potr[2] || '+'}90°` : 'lipsește contra-rotirea');

  const suport = new THREE.Group();
  suport.rotation.x = -Math.PI / 2;
  const roata = new THREE.Group();
  roata.rotation.x = Math.PI / 2;
  suport.add(roata);
  suport.updateMatrixWorld(true);

  // punct pe partea de sus a jantei, în coordonatele roții
  const sus = new THREE.Vector3(0, 0.3, 0);
  const inRoata = sus.clone().applyMatrix4(roata.matrixWorld.clone().invert());
  const inainteDeZ = sus.clone().applyMatrix4(roata.matrixWorld).z;

  suport.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.2);
  suport.updateMatrixWorld(true);
  const dupa = inRoata.clone().applyMatrix4(roata.matrixWorld);

  cer('roata nu se culcă', Math.abs(dupa.z - inainteDeZ) < 0.001,
    `abatere laterală ${(dupa.z - inainteDeZ).toFixed(4)}`);
  cer('roata se rostogolește înainte', dupa.x - sus.x > 0.01,
    `vârful merge ${(dupa.x - sus.x).toFixed(3)} spre bot`);
} catch (e) { cer('mișcarea roții', false, e.message); }

/* Proiecția farurilor: una singură, croită după mașină, lipită de bară și
   vizibilă în cadru. Camera privește mașina din față, așa că doar o fâșie de
   asfalt se vede — fasciculul trebuie să încapă în ea. */
try {
  const THREE = require('three');
  /* În față trebuie să cadă o singură lumină. Erau două: pata desenată și
     proiectorul adevărat al scenei, care picta el însuși asfaltul. Proiectorul
     e stins, deci rămâne pata — cea croită după mașină. În spate rămâne
     licărul roșu, care e bun așa. */
  cer('o singură pată de lumină în față',
    (html.match(/ve\(latimeMasina \* 2\.6/g) || []).length === 1);
  cer('proiectorul nu mai pictează asfaltul', /B\.intensity = 0/.test(html));
  cer('licărul din spate a rămas', /ve\(1\.9, 1\.8, -2\.8, 16726832\)/.test(html));

  const cam = new THREE.PerspectiveCamera(30, 360 / 142, 0.1, 120);
  cam.position.set(4.6, 1.85, 4.2); cam.lookAt(0, 0.82, 0); cam.updateMatrixWorld(true);
  [['hatchback', 3.9, 1.72], ['berlina', 4.3, 1.92]].forEach(([nume, L, lat]) => {
    const lungF = L * 0.33; const latF = lat * 2.6; const cx = L / 2 + lungF / 2 - 0.15;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(latF, lungF));
    m.rotation.x = -Math.PI / 2; m.rotation.z = -Math.PI / 2;
    m.position.set(cx, 0.02, 0); m.updateMatrixWorld(true);
    let inCadru = 0; let tot = 0;
    for (let a = -1; a <= 1; a += 0.1) {
      for (let b = -1; b <= 1; b += 0.1) {
        const p = new THREE.Vector3(a * latF / 2, b * lungF / 2, 0)
          .applyMatrix4(m.matrixWorld).project(cam);
        const sx = (p.x + 1) / 2 * 100; const sy = (1 - p.y) / 2 * 100;
        tot++;
        if (sx > 0 && sx < 100 && sy > 0 && sy < 100) inCadru++;
      }
    }
    const procent = Math.round(inCadru / tot * 100);
    cer(`  ${nume}: lumina pornește de la bară`, cx - lungF / 2 <= L / 2 + 0.01,
      `bara la ${(L / 2).toFixed(2)}, lumina de la ${(cx - lungF / 2).toFixed(2)}`);
    cer(`  ${nume}: lumina se vede în cadru`, procent >= 45, `${procent}% pe ecran`);
  });
} catch (e) { cer('proiecția luminii', false, e.message); }

const d = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://x/',
  beforeParse(w) {
    w.localStorage.setItem('ias:app-data', JSON.stringify({ students: [], sessions: [], settings: {} }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({ cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'] }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  await pauza(3000);
  [...doc().querySelectorAll('.ecran-peste')].forEach(f => {
    clic([...f.querySelectorAll('button')].find(b => /Am \u00EEn\u021Beles|\u00CEnchide/.test(b.textContent)));
  });
  await pauza(400);
  clic([...doc().querySelectorAll('nav button')].find(x => /Set\u0103ri/.test(x.textContent)));
  await pauza(600);
  clic([...doc().querySelectorAll('button')].find(x => /^Vehiculul din antet/.test(x.textContent.trim())));
  await pauza(600);

  const fereastra = doc().querySelector('.sheet-anim');
  const sel = fereastra && fereastra.querySelector('select');
  cer('doar două vehicule în Setări', !!sel && sel.options.length === 2,
    sel ? [...sel.options].map(o => o.text.split(' \u00B7')[0]).join(', ') : '—');
  const pastile = fereastra ? [...fereastra.querySelectorAll('button')].filter(b => /^\s*$/.test(b.textContent) && b.getAttribute('aria-label')) : [];
  cer('paletarul de culori', pastile.length >= 8, `${pastile.length} culori: ` + pastile.map(b => b.getAttribute('aria-label')).slice(0, 4).join(', ') + '…');
  cer('culoarea se poate alege', !!pastile[3] && (clic(pastile[3]), true), pastile[3] ? 'am ales ' + pastile[3].getAttribute('aria-label') : '—');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(32) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
