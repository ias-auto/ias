/* Soarele urcă pe cer după ora zilei, luna răsare seara, iar butonul de
   perioadă nu mai stă peste niciunul.                                        */
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
      students: [], sessions: [],
      settings: { workDays: [0,1,2,3,4,5,6], startMin: 480, endMin: 1200, currency: 'lei' },
    }));
    w.localStorage.setItem('ias:licenta', JSON.stringify({
      cod: 'IAS9F3K7QX2', stare: 'ok', rol: 'proprietar', pana: '2099-12-31', verificatLa: azi, drepturi: ['*'],
    }));
    w.localStorage.setItem('ias:backup', azi);
    w.ResizeObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
    w.scrollBy = () => {};
  },
});
const doc = () => d.window.document;
const clic = (el) => el && el.dispatchEvent(new d.window.MouseEvent('click', { bubbles: true }));
const pauza = (ms) => new Promise(r => setTimeout(r, ms));

const butonul = () => [...doc().querySelectorAll('button')]
  .find(x => /Zori|^Zi$|Apus|Noapte/.test(x.textContent.trim()) && /rounded-full/.test(x.className || ''));
/* Soarele e un cerc colorat, pus cu poziție absolută. */
const soarele = () => [...doc().querySelectorAll('span')]
  .find(x => {
    const st = x.getAttribute('style') || '';
    return /position: absolute/.test(st) && /border-radius: 99px/.test(st)
      && /(255, *240, *168|255, *208, *161|251, *146, *60|#fff0a8|#ffd0a1|#fb923c)/i.test(st);
  });
const luna = () => [...doc().querySelectorAll('svg')]
  .find(x => /position: absolute/.test(x.getAttribute('style') || '')
    && /drop-shadow/.test(x.getAttribute('style') || ''));
const sus = (el) => { const m = (el.getAttribute('style') || '').match(/top: *(-?[\d.]+)px/); return m ? Number(m[1]) : null };
const stanga = (el) => { const m = (el.getAttribute('style') || '').match(/left: *([\d.]+)%/); return m ? Number(m[1]) : null };

(async () => {
  await pauza(3000);
  [...doc().querySelectorAll('.ecran-peste')].forEach(f =>
    clic([...f.querySelectorAll('button')].find(x => /Am înțeles|Închide/.test(x.textContent))));
  await pauza(600);

  cer('butonul de perioadă e în antet', !!butonul(), butonul() ? butonul().textContent.trim() : '—');
  cer('  și a coborât la piciorul lui',
    !!butonul() && /bottom: *14px/.test(butonul().getAttribute('style') || ''),
    'nu mai stă în colțul de sus, peste cer');

  /* ocolim cele patru perioade */
  const vazut = {};
  for (let k = 0; k < 5; k++) {
    const b = butonul();
    const et = b ? b.textContent.trim().replace(/^.*·\s*/, '') : '';
    const sr = soarele(), ln = luna();
    vazut[et] = {
      soare: sr ? { sus: sus(sr), stanga: stanga(sr) } : null,
      luna: ln ? { sus: sus(ln), stanga: stanga(ln) } : null,
    };
    clic(b); await pauza(500);
  }

  const z = vazut['Zori'], zi = vazut['Zi'], ap = vazut['Apus'], no = vazut['Noapte'];
  cer('la zori, soarele e jos, la răsărit',
    !!z && !!z.soare && z.soare.sus > 100 && z.soare.stanga < 30,
    z && z.soare ? `${z.soare.stanga}% de la stânga, ${z.soare.sus}px de sus` : '—');
  cer('la amiază, sus pe cer, la mijloc',
    !!zi && !!zi.soare && zi.soare.sus < 60 && zi.soare.stanga === 50,
    zi && zi.soare ? `${zi.soare.stanga}%, ${zi.soare.sus}px` : '—');
  cer('la apus, jos în partea cealaltă',
    !!ap && !!ap.soare && ap.soare.sus > 100 && ap.soare.stanga > 70,
    ap && ap.soare ? `${ap.soare.stanga}%, ${ap.soare.sus}px` : '—');
  cer('  iar luna răsare în partea opusă',
    !!ap && !!ap.luna && !!ap.soare && ap.luna.stanga < ap.soare.stanga,
    ap && ap.luna ? `luna la ${ap.luna.stanga}%, soarele la ${ap.soare.stanga}%` : '—');
  cer('noaptea rămâne doar luna, sus',
    !!no && !no.soare && !!no.luna && no.luna.sus < 60,
    no && no.luna ? `luna la ${no.luna.stanga}%, ${no.luna.sus}px; niciun soare` : '—');

  console.log('');
  rez.forEach(([s, n, dt]) => console.log('  ' + s + ' ' + n.padEnd(38) + (dt || '')));
  const cazute = rez.filter(r => r[0] === '✕').length;
  console.log('\n  ' + (rez.length - cazute) + ' din ' + rez.length + ' verificări');
  process.exit(0);
})();
