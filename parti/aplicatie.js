/* Unde ai atins ultima oară. Fereastra pornește din punctul acela, nu din
   mijlocul ecranului: se vede din ce ai deschis-o. */
var IAS_ATINS = { x: 50, y: 50 };

/* Meniul „Back, Forward, Reload, Download, Print, Share" al browserului nu e
   meniul de selecție a textului — e meniul contextual, iar el se ridică la
   apăsare lungă chiar și acolo unde n-ai ce selecta. Se oprește doar refuzându-l
   pe față, nu din foaia de stil.

   În câmpurile în care scrii îl lăsăm în pace: acolo îți trebuie ca să lipești
   un număr de telefon sau un link de hartă. */
/* ============ FĂRĂ COMPLETARE AUTOMATĂ, NICĂIERI ============
   În aplicația asta nu există niciun câmp în care să scrii date de-ale tale:
   numele, telefonul, adresa — toate sunt ale elevilor. Deci completarea
   automată a telefonului n-are ce oferi bun, iar pe iPhone chiar strică: la
   ținut apăsat îți pune „Completare automată" peste „Lipire" și nu mai poți
   lipi un număr copiat.

   Mai rău, la câmpurile cu cifre sau cu cuvântul „cod" în preajmă, telefonul și
   programele de parole se oferă să-ți dea cardul sau o parolă salvată. Nimic
   din toate astea nu-și are locul aici.

   Le oprim dintr-o singură mișcare, pe toate câmpurile, și pe cele care apar
   mai târziu — ferestrele se deschid și se închid tot timpul. */
if (typeof document < "u") {
    (function () {
        var SEMNE = [
            ["autocomplete", "off"],
            ["autocorrect", "off"],
            ["spellcheck", "false"],
            /* programele de parole: LastPass, 1Password, Dashlane */
            ["data-lpignore", "true"],
            ["data-1p-ignore", ""],
            ["data-form-type", "other"]
        ];
        function iasTaie(el) {
            if (!el || el.dataset.iasFaraAuto === "1") return;
            /* Câmpul care cere anume completarea automată se marchează cu
               clasa „ias-cu-autofill" și rămâne neatins. Azi nu există
               niciunul, dar regula trebuie să poată face loc unuia. */
            if (el.classList && el.classList.contains("ias-cu-autofill")) return;
            for (var k = 0; k < SEMNE.length; k++)
                if (!el.hasAttribute(SEMNE[k][0])) el.setAttribute(SEMNE[k][0], SEMNE[k][1]);
            /* Safari ghicește și după nume: „tel", „phone", „name", „address",
               „card" îi aprind bănuiala. Un nume neutru o stinge. */
            var n = (el.getAttribute("name") || "");
            if (!n || /tel|phone|name|nume|mail|address|adres|card|cod|pass|parol|cvv|zip|post/i.test(n))
                el.setAttribute("name", "ias-camp");
            el.dataset.iasFaraAuto = "1"
        }
        function iasToate(radacina) {
            var l = (radacina || document).querySelectorAll
                ? (radacina || document).querySelectorAll("input, textarea") : [];
            for (var k = 0; k < l.length; k++) iasTaie(l[k])
        }
        function iasPorneste() {
            iasToate(document);
            if (typeof MutationObserver > "u") return;
            new MutationObserver(function (schimbari) {
                for (var k = 0; k < schimbari.length; k++) {
                    var noi = schimbari[k].addedNodes;
                    for (var j = 0; j < noi.length; j++) {
                        var nod = noi[j];
                        if (!nod || nod.nodeType !== 1) continue;
                        if (nod.tagName === "INPUT" || nod.tagName === "TEXTAREA") iasTaie(nod);
                        iasToate(nod)
                    }
                }
            }).observe(document.documentElement, { childList: !0, subtree: !0 })
        }
        document.readyState === "loading"
            ? document.addEventListener("DOMContentLoaded", iasPorneste)
            : iasPorneste()
    })();

    document.addEventListener("contextmenu", function (ev) {
        var t = ev.target;
        if (t && t.closest && t.closest('input, textarea, select, [contenteditable="true"], .ias-selectabil')) return;
        ev.preventDefault()
    }, { capture: !0 })
}

/* Când se ridică tastatura, ecranul nu se micșorează pe toate telefoanele —
   pe unele rămâne la fel, iar tastatura doar acoperă partea de jos. O fereastră
   așezată pe mijloc ajunge atunci pe jumătate sub taste, iar câmpul de căutare
   nu se mai vede.

   Măsurăm cât a rămas cu adevărat vizibil și legăm fereastra de zona aceea. */
if (typeof window < "u" && window.visualViewport) {
    var iasVV = window.visualViewport;
    var iasMasoara = function () {
        var r = document.documentElement;
        r.style.setProperty("--ias-vazut", iasVV.height + "px");
        r.style.setProperty("--ias-sus", (iasVV.offsetTop || 0) + "px");
        // peste 120 de puncte pierdute înseamnă tastatură, nu bara browserului
        r.classList.toggle("ias-tastatura", (window.innerHeight - iasVV.height) > 120)
    };
    iasVV.addEventListener("resize", iasMasoara);
    iasVV.addEventListener("scroll", iasMasoara);
    iasMasoara()
}
if (typeof document < "u") {
    document.addEventListener("pointerdown", function (ev) {
        var w = window.innerWidth || 1, h = window.innerHeight || 1;
        IAS_ATINS = {
            x: Math.round(Math.max(0, Math.min(100, ev.clientX / w * 100))),
            y: Math.round(Math.max(0, Math.min(100, ev.clientY / h * 100)))
        }
    }, { capture: !0, passive: !0 })
}

var yo = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"],
    xu = ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "S\xE2m"],
    Tw = ["Duminic\u0103", "Luni", "Mar\u021Bi", "Miercuri", "Joi", "Vineri", "S\xE2mb\u0103t\u0103"],
    po = [1, 2, 3, 4, 5, 6, 0],
    si = 90,
    AA = "IAS",
    ri = "v2.34.27",
    ha = {
        am: {
            label: "Diminea\u021B\u0103",
            short: "diminea\u021Ba",
            start: 510,
            end: 750
        },
        pm: {
            label: "Dup\u0103-amiaz\u0103",
            short: "dup\u0103-amiaza",
            start: 780,
            end: 1020
        }
    },
    kA = n => {
        let e = ha[n];
        return e ? `${e.label.toLowerCase()}, ${Se(e.start)}\u2013${Se(e.end)}` : ""
    };

/* Elevii care dau teoreticul în ziua asta. Teoreticul nu ocupă mașina, deci nu
   bară intervale ca practicul — dar tot trebuie să știi de el: îl poți întreba
   cum a fost, iar dacă pică, ședințele lui se așază altfel. */
/* Istoricul examenelor: ce a dat elevul, în ce zi și cu ce rezultat. Fără el,
   ziua unui examen picat dispărea cu totul — data se ștergea ca să-l poți
   reprograma, iar calendarul rămânea gol în ziua aceea, de parcă n-ar fi fost
   nimic. */
function iasAdaugaLaIstoric(elev, intrare) {
    var vechi = Array.isArray(elev.examIstoric) ? elev.examIstoric : [];
    if (!intrare || !intrare.data) return vechi;
    return vechi.concat([{ ...intrare, id: Vt("ex") }])
}

function iasExameneDate(elevi, data) {
    if (!data || !elevi) return [];
    var out = [];
    elevi.forEach(function (el) {
        (Array.isArray(el.examIstoric) ? el.examIstoric : []).forEach(function (x) {
            if (x && x.data === data) out.push({ elev: el, ...x })
        })
    });
    return out.sort(function (a, b) {
        return ((a.elev || {}).name || "").localeCompare(((b.elev || {}).name || ""), "ro")
    })
}

function iasTeoreticeZi(elevi, data) {
    return !data || !elevi ? [] : elevi.filter(function (x) {
        return !x.withdrawn && !x.perfectionare && x.theoryExamDate === data
    }).sort(function (a, b) { return (a.name || "").localeCompare(b.name || "", "ro") })
}

function v0(n, e) {
    /* Elevul retras nu mai ține mașina ocupată: examenul lui iese din calendar
       de îndată ce l-ai retras, ca intervalul să fie iar al tău. */
    return !e || !n ? [] : n.filter(t => !t.withdrawn && t.examDate === e && ha[t.examPeriod])
        // în ordinea numelui: așa îi cauți pe listă, în ziua examenului
        .sort((t, a) => (t.name || "").localeCompare(a.name || "", "ro"))
        .map(t => ({
            student: t,
            period: t.examPeriod,
            ...ha[t.examPeriod]
        }))
}

function y0(n, e, t) {
    if (!n || !n.length) return null;
    let a = e + (t || si);
    return n.find(r => e < r.end && a > r.start) || null
}

/* Pauzele de masă, așa cum le-ai stabilit în Setări: se repetă în fiecare zi
   lucrătoare, fără să le mai marchezi de fiecare dată. Intră în aceeași oală cu
   intervalele barate manual, deci calendarul le hașurează la fel, planul le
   ocolește, iar dacă programezi peste una ești avertizat — ca la orice blocaj.

   Fiecare om își ia câte pauze îi trebuie: unul trei, altul una. */
function iasPauze(setari, data) {
    var lista = ((setari || {}).pauze) || [];
    if (!data || !lista.length) return [];
    var zi = Ue(data).getDay();
    if (((setari || {}).workDays || []).length && !setari.workDays.includes(zi)) return [];
    return lista.filter(function (x) {
        // o pauză poate fi legată de anumite zile; fără zile, e în toate
        return !x.zile || !x.zile.length || x.zile.indexOf(zi) >= 0
    }).map(function (x, k) {
        var start = Number(x.startMin) || 0,
            durata = Math.max(5, Number(x.durata) || 30);
        return {
            id: "pauza_" + (x.id || k),
            pauza: !0,
            date: data,
            note: (x.nume || "").trim() || "Pauz\u0103",
            start: start,
            end: Math.min(1440, start + durata)
        }
    })
}

function b0(n, e) {
    var manuale = !e || !n || !n.blocks ? [] : n.blocks.filter(t => t.date === e).map(t => t.allDay ? {
        ...t,
        start: 0,
        end: 1440
    } : {
        ...t,
        start: Number(t.startMin) || 0,
        end: Number(t.endMin) || 0
    });
    return manuale.concat(iasPauze(n, e))
}

function bf(n, e, t) {
    if (!n || !n.length) return null;
    let a = e + (t || si);
    return n.find(r => e < r.end && a > r.start) || null
}
var mo = `${AA} ${ri}`,
    f0 = 1,
    fn = {
        mark: "IAS",
        expansion: "Instructor Auto Sistem",
        tagline: "Asistentul instructorului de succes!",
        by: "by Ioan-Adrian Stancu",
        owner: "Ioan-Adrian Stancu"
    },
    NA = ["AM", "A1", "A2", "A", "B1", "B", "BE", "C1", "C1E", "C", "CE", "D1", "D1E", "D", "DE", "Tr", "Tb", "Tv"],
    Aw = "B AB AR AG BC BH BN BT BV BR BZ CJ CL CS CT CV DB DJ GJ GL GR HD HR IF IL IS MH MM MS NT OT PH SB SJ SM SV TL TM TR VL VN VS".split(" "),
    Wt = {
        nav: 65,
        sheet: 50,
        form: 60,
        notify: 70,
        dialog: 80,
        toast: 90
    };

function PA() {
    if (typeof document > "u") return !1;
    let n = document.querySelectorAll(".ecran-peste"),
        e = n.length ? n[n.length - 1] : null;
    if (!e) return !1;
    let t = a => {
        if (a <= 0) {
            e.classList.remove("cere-inchidere");
            return
        }
        e.classList.add("cere-inchidere"), setTimeout(() => {
            e.classList.remove("cere-inchidere"), setTimeout(() => t(a - 1), 130)
        }, 200)
    };
    /* Pe lângă conturul roșu, cerem și un cuvânt: altfel omul vede o clipire și
       nu știe ce i se cere. Mesajul îl scrie aplicația, care are toastul. */
    try { window.dispatchEvent(new CustomEvent("ias-cere-inchidere")) } catch (a) {}
    return t(2), !0
}
var sr = {
        workDays: [1, 2, 3, 4, 5, 6],
        startMin: 480,
        endMin: 1200,
        sessionMin: si,
        stepMin: 30,
        defaultWeeklyLimit: 2,
        currency: "lei",
        reexamFee: 250,
        theme: "system",
        rateTypes: [{
            id: "included",
            name: "Ore incluse",
            price: 100
        }, {
            id: "extra",
            name: "Ore suplimentare",
            price: 120
        }],
        employer: {
            baseRate: 60,
            overtimeRate: 70,
            englishBaseRate: 80,
            englishOvertimeRate: 90,
            hoursPerDay: 8,
            hoursPerSession: 2
        },
        workingDaysOverrides: {},
        locations: [],
        // Mașinile tale de școală. Fiecare elev poate fi legat de una, iar planul
        // îi așază grupat, ca să nu schimbi mașina de la o ședință la alta.
        masini: []
    },
    go = {
        scheduled: {
            label: "Programat\u0103",
            c: "blue"
        },
        pending: {
            label: "A\u0219teapt\u0103 confirmare",
            c: "amber"
        },
        completed: {
            label: "Efectuat\u0103",
            c: "emerald"
        },
        cancelled: {
            label: "Anulat\u0103",
            c: "red"
        }
    },
    ie = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white",
    DA = {
        dawn: {
            icon: lu,
            label: "Zori",
            sky: "linear-gradient(180deg,#3b1d6e 0%,#c026a6 34%,#f4713b 70%,#fbc56a 100%)"
        },
        day: {
            icon: Hi,
            label: "Zi",
            sky: "linear-gradient(180deg,#0b4a86 0%,#1183cf 44%,#6fc7f2 100%)"
        },
        dusk: {
            icon: uu,
            label: "Apus",
            sky: "linear-gradient(180deg,#161447 0%,#6b21a8 36%,#e0570f 74%,#f6b93b 100%)"
        },
        night: {
            icon: zi,
            label: "Noapte",
            sky: "linear-gradient(180deg,#03060f 0%,#080f1e 55%,#16233a 100%)"
        }
    },
    hw = {
        dawn: {
            hemiSky: 16767426,
            hemiGround: 3877468,
            hemiI: .9,
            dir: 16760970,
            dirI: 1,
            spot: .5,
            head: .6,
            tail: .5,
            glow: .28,
            road: 3091269,
            fog: 15774302
        },
        day: {
            hemiSky: 14676479,
            hemiGround: 6583435,
            hemiI: 1.05,
            dir: 16777215,
            dirI: 1.55,
            spot: 0,
            head: .55,
            tail: .5,
            glow: .12,
            road: 4016989,
            fog: 7325682
        },
        dusk: {
            hemiSky: 16760986,
            hemiGround: 2760255,
            hemiI: .75,
            dir: 16749640,
            dirI: 1.1,
            spot: .9,
            head: .8,
            tail: .7,
            glow: .42,
            road: 2761527,
            fog: 14322220
        },
        night: {
            hemiSky: 2832981,
            hemiGround: 528158,
            hemiI: .5,
            dir: 8558260,
            dirI: .3,
            spot: 1.7,
            head: 1,
            tail: .9,
            glow: .68,
            road: 1449774,
            fog: 1450810
        }
    },
    FA = n => n >= 5 && n < 8 ? "dawn" : n >= 8 && n < 18 ? "day" : n >= 18 && n < 21 ? "dusk" : "night",
    mw = [
        [12, 6, "0s"],
        [20, 19, ".6s"],
        [9, 33, "1.1s"],
        [28, 45, ".3s"],
        [15, 57, ".9s"],
        [7, 71, ".2s"],
        [24, 83, "1.4s"],
        [36, 12, ".7s"],
        [32, 65, ".1s"],
        [18, 91, "1s"]
    ],
    Da = n => String(n).padStart(2, "0"),
    ft = n => `${n.getFullYear()}-${Da(n.getMonth()+1)}-${Da(n.getDate())}`,
    Ue = n => {
        let [e, t, a] = n.split("-").map(Number);
        return new Date(e, t - 1, a)
    },
    pn = (n, e) => {
        let t = new Date(n);
        return t.setDate(t.getDate() + e), t
    },
    Gi = n => {
        let e = n.getDay(),
            t = (e === 0 ? -6 : 1) - e;
        return pn(n, t)
    },
    Se = n => `${Da(Math.floor(n/60))}:${Da(n%60)}`,
    qe = n => {
        let e = Ue(n);
        return `${e.getDate()} ${yo[e.getMonth()]} ${e.getFullYear()}`
    },
    fo = n => {
        let e = Ue(n);
        return `${Tw[e.getDay()]}, ${e.getDate()} ${yo[e.getMonth()]}`
    },
    Be = () => ft(new Date);

function vu(n) {
    if (!n) return null;
    let e = Ue(n),
        t = new Date,
        a = t.getFullYear() - e.getFullYear(),
        r = t.getMonth() - e.getMonth();
    return (r < 0 || r === 0 && t.getDate() < e.getDate()) && a--, a >= 0 && a < 130 ? a : null
}

function BA(n) {
    let e = n && n.birthDate;
    if (!e) return !1;
    let t = Ue(e),
        a = new Date;
    return t.getDate() === a.getDate() && t.getMonth() === a.getMonth()
}

function xf(n) {
    let e = vu(n);
    if (e == null || e >= 18) return null;
    let t = Ue(n);
    return ft(new Date(t.getFullYear() + 18, t.getMonth(), t.getDate()))
}
var Yn = () => new Date().toISOString(),
    zA = 0,
    Vt = n => `${n}_${Date.now().toString(36)}_${(zA++).toString(36)}_${Math.random().toString(36).slice(2,6)}`,
    pu = n => String(n || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
    yu = n => n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z]/g, "").toUpperCase();

function OA(n) {
    if (!n) return "IAS";
    let e = yu(Ff(n)),
        t = yu(String(n.lastName || n.name || "").trim().split(/\s+/)[0] || "");
    return (e + t || "IAS").padEnd(3, "A").slice(0, 3)
}

function HA(n) {
    let e = String(n && n.group || "").trim(),
        t = e.replace(/[^0-9]/g, "");
    return t ? t.length === 1 ? `0${t}` : t.slice(0, 3) : /os/i.test(e) ? "OS" : "00"
}
var Fa = n => Number(n && n.sessionMin) || si,
    kw = n => Number(n && n.stepMin) || 30,
    or = (n, e) => Number(n && n.duration) || Fa(e);

/* Programul de lucru, pe zile. Ai un program de bază — cel din Setări — iar
   peste el poți pune, pentru fiecare zi a săptămânii, alte ore. De luni până
   vineri începi la 8:30, fiindcă îl duci pe băiat la grădiniță; sâmbăta și
   duminica poți porni de la 7 și merge până mai târziu.

   Zilele fără program propriu îl folosesc pe cel de bază, deci nimic nu se
   schimbă pentru cine nu umblă la reglaj. */
function iasProgramZi(setari, data) {
    var baza = { startMin: (setari || {}).startMin, endMin: (setari || {}).endMin };
    if (!data) return baza;
    var pe = ((setari || {}).programZile || {})[Ue(data).getDay()];
    if (!pe) return baza;
    var s2 = Number(pe.startMin), e2 = Number(pe.endMin);
    return {
        startMin: isNaN(s2) ? baza.startMin : s2,
        endMin: isNaN(e2) ? baza.endMin : e2
    }
}

function Tf(n, iasData) {
    var iasP = iasProgramZi(n, iasData);
    return iasTfCu(n, iasP.startMin, iasP.endMin)
}

function iasTfCu(n, iasStart, iasEnd) {
    let e = [],
        t = Fa(n),
        a = kw(n);
    for (let r = iasStart; r + t <= iasEnd; r += a) e.push(r);
    return e
}

function bu(n, e, t, a) {
    return n < t + a && t < n + e
}

function w0(n, e, t, a, r) {
    let i = Fa(r);
    return n.some(s => s.id !== a && s.date === e && s.status !== "cancelled" && !s.otherInstructor && bu(t, i, s.startMin, or(s, r)))
}

function Nw(n, e, t, a) {
    return n.some(r => r.id !== a && r.studentId === e && r.date === t && r.status !== "cancelled")
}

function Pw(n, e, t, a) {
    let r = ft(Gi(Ue(t)));
    return n.filter(i => i.id !== a && i.studentId === e && i.status !== "cancelled" && ft(Gi(Ue(i.date))) === r).length
}

function Af(n, e) {
    return n.filter(t => t.studentId === e && t.status !== "cancelled").length
}

function S0(n, e) {
    return n.filter(t => t.studentId === e && t.status === "completed").length
}

function bo(n) {
    return (Number(n.includedHours) || 0) + (Number(n.extraHours) || 0)
}

/* Câte ședințe mai are de făcut. Fără setări nu se pot socoti pachetele, așa
   că cine le are la îndemână le dă; ceilalți merg pe socoteala veche. */
function kf(n, e, iasSet) {
    if (iasSet) {
        var t = iasImpartire(n, e, iasSet);
        return Math.max(0, t.total - Af(e, n.id))
    }
    return Math.max(0, bo(n) - Af(e, n.id))
}

/* Câte ședințe se țin deoparte pentru examen. Era o cifră scrisă în cod; acum
   se poate schimba din Setări, fiindcă fiecare instructor lucrează altfel. */
var Nf = 3,
    /* Ședințele ținute deoparte pentru perioada examenului. Pornită, planul nu
       programează de la sine ultimele câteva ore ale unui elev, ca să-i rămână
       pentru zilele dinaintea examenului.

       Din pornire e OPRITĂ, și așa trebuie să fie: legea cere ca elevul să aibă
       toate ședințele efectuate, iar a-i ține ore nefăcute nu e treaba
       aplicației să hotărască în locul instructorului. */
    iasRezerva = (setari) => {
        if (!setari || !setari.rezervaActiva) return 0;
        var n = Number(setari.rezervaExamen);
        return isNaN(n) || n < 0 ? Nf : Math.min(10, n)
    },
    wf = 14,
    vf = 3,
    ho = n => !!(n && n.asteptare);

function Dw(n) {
    if (!n || !n.asteptareDin) return {
        trecute: 0,
        ramase: wf
    };
    let e = Math.max(0, Math.round((Ue(Be()).getTime() - Ue(n.asteptareDin).getTime()) / 864e5));
    return {
        trecute: e,
        ramase: Math.max(0, wf - e)
    }
}

/* Ședințele obligatorii după adeverință. Cine vine la perfecționare n-are
   adeverință și n-are ședințe obligatorii — are permis. */
function UA(n, e) {
    return !n || n.perfectionare || !n.adeverintaDin ? 0 : e.filter(t => t.studentId === n.id && t.status === "completed" && t.date >= n.adeverintaDin).length
}
/* Elevul plecat o perioadă: vacanță, deplasare, orice. Ține două date, ambele
   inclusiv. În ziua în care se întoarce e din nou disponibil. */
/* ============ CÂND EȘTI OCUPAT ============
   Elevul întreabă „când poți?", iar tu n-ai chef să te uiți prin calendar oră
   cu oră. Aici se adună tot ce-ți ține ziua ocupată — ședințe, examene,
   intervale barate, pauza de masă — se lipesc bucățile care se ating și iese un
   text scurt, de trimis pe WhatsApp.

   Se spune ce e ocupat, nu cu cine: elevul n-are treabă cu numele celorlalți. */
function iasOcupatZi(stare, data) {
    var din = [];
    (stare.sessions || []).forEach(function (x) {
        if (x.date !== data || x.status === "cancelled" || x.otherInstructor) return;
        var s2 = Number(x.startMin) || 0;
        din.push({ start: s2, end: s2 + (Number(x.duration) || si) })
    });
    /* Examenul practic ține mașina ocupată toată perioada lui. */
    v0(stare.students, data).forEach(function (x) {
        if (x && x.start != null) din.push({ start: x.start, end: x.end })
    });
    b0(stare.settings, data).forEach(function (x) {
        din.push({ start: Number(x.start) || 0, end: Number(x.end) || 0 })
    });
    din = din.filter(function (x) { return x.end > x.start })
        .sort(function (a, b) { return a.start - b.start });
    // bucățile care se ating sau se suprapun se fac una singură
    var out = [];
    din.forEach(function (x) {
        var ultim = out[out.length - 1];
        if (ultim && x.start <= ultim.end) ultim.end = Math.max(ultim.end, x.end);
        else out.push({ start: x.start, end: x.end })
    });
    return out
}

/* Setările, pe grupe. Rândurile sunt aceleași și deschid aceleași ferestre;
   aici stă doar felul în care sunt strânse și cuvintele după care le găsește
   căutarea. Un rând care n-ar fi trecut în nicio grupă apare la „Altele",
   ca să nu se piardă nimic. */
var IAS_GRUPE_SETARI = [
    { id: "zi", nume: "Ziua de lucru", randuri: ["program", "amintiri"] },
    { id: "elevi", nume: "Elevii", randuri: ["elevi", "programElevi", "euSiScoala"] },
    { id: "drum", nume: "Mașina și drumul", randuri: ["masini", "locatii"] },
    { id: "aspect", nume: "Aspect", randuri: ["tema", "vehicul"] },
    { id: "date", nume: "Date și acces", randuri: ["backup", "acces", "licente", "ajutor", "despre"] }
];
var IAS_CUVINTE_SETARI = {
    program: "zile ore start final pauza masa durata sedinta pas rezerva examen teoretic prag",
    amintiri: "notificari alarma calendar telefon seara dimineata",
    elevi: "limita saptamana judet moneda lei",
    programElevi: "link disponibilitate whatsapp numar",
    euSiScoala: "nume scoala mesaj bun venit prezinti engleza english limbi limba straina ucraineana rusa turca franceza germana italiana spaniola",
    masini: "masina numar cutie automata manuala",
    locatii: "puncte intalnire casa harta start",
    tema: "zi noapte intunecat luminos culori sistem",
    vehicul: "antet masina culoare remorca model",
    backup: "salvare copie import sterge date",
    acces: "cod licenta abonament",
    licente: "coduri colegi utilizatori",
    ajutor: "problema sugestie email contact",
    despre: "versiune ce e nou instalare prezentare"
};
/* Grupa rămasă deschisă se ține minte cât e pornită aplicația. */
var iasSetariTinut = { grup: "zi" };

function iasFaraSemne(t) {
    var x = String(t || "").toLowerCase();
    try { x = x.normalize("NFD").replace(/[̀-ͯ]/g, "") } catch (e) {}
    return x
}

function iasGrupeSetari(randuri) {
    var puse = {},
        grupe = IAS_GRUPE_SETARI.map(function (g) {
            return {
                id: g.id, nume: g.nume,
                randuri: g.randuri.map(function (id) { return randuri.find(function (r) { return r.id === id }) }).filter(Boolean)
            }
        }).filter(function (g) { return g.randuri.length });
    grupe.forEach(function (g) { g.randuri.forEach(function (r) { puse[r.id] = 1 }) });
    var rest = randuri.filter(function (r) { return !puse[r.id] });
    rest.length && grupe.push({ id: "altele", nume: "Altele", randuri: rest });
    return grupe
}

/* Mașina se spală în ajunul examenului practic. De aici vin anunțul de pe
   Acasă și ora propusă în formularul de interval indisponibil. */
var iasSpalat = { cerut: !1, alt: "" };

/* Cum arată ziua în Calendar: „lista" de până acum, rând cu rând, sau „axa",
   unde fiecare ședință e cât de lungă e de fapt. Se ține minte pe telefon;
   dacă nu se poate, pornește cu lista. */
function iasVedereZiCitita() {
    try { return localStorage.getItem("ias:vedere-zi") === "axa" ? "axa" : "lista" } catch (e) { return "lista" }
}

function iasVedereZiScrisa(v) {
    try { localStorage.setItem("ias:vedere-zi", v) } catch (e) {}
}

function iasESpalat(bloc) {
    return /sp[aă]l/i.test((bloc && bloc.note) || "")
}

function iasExamenMaine(stare, azi) {
    var maine = ft(pn(Ue(azi), 1));
    return ((stare && stare.students) || []).filter(function (z) {
        return !z.withdrawn && !z.perfectionare && z.examResult !== "promovat" && z.examDate === maine
    })
}

function iasSpalatPus(stare, azi) {
    return (((stare && stare.settings) || {}).blocks || []).some(function (b) {
        return b.date === azi && iasESpalat(b)
    })
}

/* O oră liberă azi: prima de acum încolo, în programul zilei. Dacă ziua e
   plină, se propune ultima oră din program — o muți tu de acolo. */
function iasOraDeSpalat(stare, azi, acumMin) {
    var pz = iasProgramZi(stare.settings, azi),
        S = Number(pz.startMin) || 480,
        E = Number(pz.endMin) || 1200,
        ocupat = iasOcupatZi(stare, azi),
        gasit = null;
    for (var t = Math.max(S, Math.ceil((acumMin || 0) / 30) * 30); t + 60 <= E; t += 30) {
        if (!ocupat.some(function (x) { return x.start < t + 60 && x.end > t })) { gasit = t; break }
    }
    if (gasit == null) gasit = Math.max(S, E - 60);
    return { allDay: !1, startMin: gasit, endMin: gasit + 60, note: "Spălat mașina" }
}

/* ================= IAS 2027 — MIȘCARE =================
   Stă pe lângă aplicație și nu-i atinge logica:
   1. GSAP, adus prin CDN. Dacă nu vine (fără semnal la prima pornire),
      cascada o face browserul — conținutul nu rămâne niciodată ascuns.
   2. Cascada: la pornire și la schimbarea ecranului, cardurile și rândurile
      urcă puțin și se aprind pe rând, cu un recul scurt. E scurtă, ca ecranul
      să nu stea gol, și se dă la o parte când telefonul e deja ocupat.
   3. O vibrație scurtă la acțiunile care schimbă ceva. iPhone-ul nu lasă
      paginile să vibreze; acolo pur și simplu nu se întâmplă nimic. */
(function iasMiscare() {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    var GSAP = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
        SRI = "sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==";

    function linistit() {
        try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) } catch (e) { return !1 }
    }

    function aduGsap() {
        try {
            if (window.gsap || !document.head || document.getElementById("ias-gsap")) return;
            var s = document.createElement("script");
            s.id = "ias-gsap", s.async = !0, s.crossOrigin = "anonymous", s.integrity = SRI, s.referrerPolicy = "no-referrer", s.src = GSAP;
            document.head.appendChild(s)
        } catch (e) { /* fără GSAP rămâne cascada browserului */ }
    }

    /* Ce urcă în cascadă: blocurile ecranului, de sus în jos — carduri,
       rânduri de listă, titluri. Antetul cu mașina nu intră: rămâne cum e.
       Ce e sub marginea ecranului nu se mișcă, fiindcă oricum nu se vede. */
    function blocuri(panou) {
        var out = [], jos = (window.innerHeight || 800) + 40;
        (function coboara(el, adanc) {
            for (var k = 0; k < el.children.length && out.length < 26; k++) {
                var c = el.children[k], cls = typeof c.className === "string" ? c.className : "";
                if (c.tagName === "STYLE" || c.tagName === "SCRIPT" || c.hasAttribute("data-ias-antet")) continue;
                var r = c.getBoundingClientRect();
                if (!r.width && !r.height) continue;
                if (r.top > jos) return;
                var bloc = c.tagName === "BUTTON" || c.tagName === "P" || /^H[1-6]$/.test(c.tagName) || !c.children.length ||
                    /(^|\s)(border|rounded-lg|rounded-xl|rounded-2xl|rounded-full)(\s|$)/.test(cls) || !!c.style.borderRadius;
                /* O listă întreagă nu urcă dintr-o bucată: se intră în ea, ca
                   fiecare card să vină la rândul lui. Altfel lista stătea
                   goală, apoi apărea toată și se legăna. */
                var lista = !/(^|\s)bg-white(\s|$)/.test(cls) && c.children.length > 1 && !!c.querySelector(".bg-white.border, button.border");
                if ((bloc || adanc >= 3) && !(lista && adanc < 6)) {
                    if (!c.style.opacity && !c.style.translate) out.push(c)
                } else coboara(c, adanc + 1)
            }
        })(panou, 0);
        return out
    }

    function cascada(panou) {
        if (linistit() || !panou) return;
        var el;
        try { el = blocuri(panou) } catch (e) { return }
        if (!el.length) return;
        var g = window.gsap;
        if (g && g.fromTo) {
            try {
                g.killTweensOf(el);
                g.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .26, ease: "power2.out", stagger: { amount: .16 }, clearProps: "opacity" });
                g.fromTo(el, { translate: "0px 16px" }, { translate: "0px 0px", duration: .5, ease: "back.out(1.6)", stagger: { amount: .16 }, clearProps: "translate" });
                return
            } catch (e) { /* cade pe varianta browserului */ }
        }
        if (!el[0].animate) return;
        el.forEach(function (c, k) {
            try {
                c.animate([{ opacity: 0, translate: "0 16px" }, { opacity: 1, translate: "0 0" }], {
                    duration: 420, delay: Math.min(k * 14, 160), easing: "cubic-bezier(.34,1.45,.64,1)", fill: "backwards"
                })
            } catch (e) { /* browser vechi: apare fără mișcare */ }
        })
    }

    function panouActiv(radacina) {
        for (var k = 0; k < radacina.children.length; k++) {
            var c = radacina.children[k];
            if (c.tagName === "DIV" && /(^|\s)(pb-4|pb-6)(\s|$)/.test(typeof c.className === "string" ? c.className : "")) return c
        }
        return null
    }
    var ultim = null,
        atins = 0;

    /* Dacă de la atingerea filei până la ecranul nou a trecut mult, telefonul
       e deja ocupat: ecranul apare direct, fără cascadă, ca să nu întârzie
       și mai mult. */
    try {
        document.addEventListener("click", function () { atins = performance.now() }, !0)
    } catch (e) {}

    function vezi() {
        var r = document.querySelector("[data-skin]"),
            p = r ? panouActiv(r) : null;
        if (p && p !== ultim && !(atins && performance.now() - atins > 140)) cascada(p);
        ultim = p
    }
    var incercari = 0,
        ceas = setInterval(function () {
            var r = document.querySelector("[data-skin]");
            if (!r && ++incercari < 150) return;
            clearInterval(ceas);
            if (!r) return;
            try { typeof MutationObserver !== "undefined" && new MutationObserver(vezi).observe(r, { childList: !0 }) } catch (e) {}
            vezi()
        }, 80);
    aduGsap();

    /* iPhone-ul aplică „apăsat" pe butoane doar dacă pagina ascultă atingerea. */
    try { document.addEventListener("touchstart", function () {}, { passive: !0 }) } catch (e) {}

    /* Vibrația: la salvat, șters, aplicat, marcat, trimis și la schimbarea
       stării unei ședințe. Butoanele de mers dintr-un loc în altul nu vibrează. */
    var IMPORTANT = /^(Salveaz|Adaug|Șterge|Aplic|Confirm|Trimite|Marcheaz|Programat|Programeaz|Efectuat|Anulat|Așteapt|Pune|Public|Genereaz|Gata$|Da,)/;
    document.addEventListener("click", function (ev) {
        try {
            if (!navigator.vibrate) return;
            var b = ev.target && ev.target.closest ? ev.target.closest("button") : null;
            if (!b || b.disabled) return;
            var cls = typeof b.className === "string" ? b.className : "";
            var plin = /(^|\s)(bg-amber-500|bg-emerald-500|bg-emerald-600|bg-red-500|bg-red-600)(\s|$)/.test(cls) ||
                (/(^|\s)bg-slate-900(\s|$)/.test(cls) && !/(^|\s)border-slate-900(\s|$)/.test(cls));
            (plin || IMPORTANT.test((b.textContent || "").trim())) && navigator.vibrate(15)
        } catch (e) { /* telefonul nu vrea — nu-i nimic */ }
    }, !0)
})();

/* Textul pentru elev: zilele în care lucrezi, de la data dată încolo. Zilele în
   care nu lucrezi deloc se spun ca atare; cele fără nimic ocupat se spun
   libere, ca omul să știe că poate cere orice oră. */
function iasTextOcupat(stare, deLa, zile) {
    var set = stare.settings || {}, randuri = [];
    for (var k = 0; k < zile; k++) {
        var zi = ft(pn(Ue(deLa), k)),
            nume = Tw[Ue(zi).getDay()] + " " + Number(zi.slice(8)) + " " + yo[Number(zi.slice(5, 7)) - 1];
        if (!(set.workDays || []).includes(Ue(zi).getDay())) {
            randuri.push(nume + " \u2014 nu lucrez");
            continue
        }
        var pz = iasProgramZi(set, zi),
            ocupat = iasOcupatZi(stare, zi).filter(function (x) {
                return x.end > pz.startMin && x.start < pz.endMin
            }).map(function (x) {
                return { start: Math.max(x.start, pz.startMin), end: Math.min(x.end, pz.endMin) }
            });
        if (!ocupat.length) { randuri.push(nume + " \u2014 liber toat\u0103 ziua"); continue }
        randuri.push(nume + " \u2014 ocupat " + ocupat.map(function (x) {
            return Se(x.start) + "\u2013" + Se(x.end)
        }).join(", "))
    }
    return "Bun\u0103! Uite c\xE2nd sunt ocupat:\n\n" + randuri.join("\n")
        + "\n\n\xCEn rest sunt liber \u2014 spune-mi ce or\u0103 \u021Bi-ar veni bine."
}

function iasLipseste(elev, zi) {
    if (!elev || !elev.plecatPana) return false;
    var de = elev.plecatDin || Be();
    return zi >= de && zi <= elev.plecatPana;
}
// Câte zile mai are de lipsit, socotit de azi. Zero înseamnă că azi se întoarce.
function iasZilePlecat(elev) {
    if (!elev || !elev.plecatPana) return null;
    var azi = Be();
    if (elev.plecatPana < azi) return null;          // s-a întors deja
    return { din: elev.plecatDin || azi, pana: elev.plecatPana, revine: ft(pn(Ue(elev.plecatPana), 1)) };
}

/* Cine intră în plan. Elevul promovat iese — a terminat școala. Cel venit la
   perfecționare are deja permisul, deci „promovat" nu-l scoate: tocmai de-aia
   e aici, să conducă. */
var Pf = n => !!n && !n.withdrawn && !ho(n) && (n.perfectionare || n.examResult !== "promovat"),
    RA = 10,
    Sf = (n, e) => Math.round((Ue(e).getTime() - Ue(n).getTime()) / 864e5),
    Mf = (n, e) => {
        if (!n || !n.examDate) return !1;
        let t = Sf(e, n.examDate);
        return t >= 1 && t <= 5
    };

function GA(n, e, t, iasSet) {
    let a = kf(n, e, iasSet);
    if (a <= 0) return 0;
    /* Rezerva de examen e la alegerea ta și e oprită din pornire. Aici se lua
       oricum trei ore deoparte, fiindcă setările nu ajungeau până la funcția
       asta — așa că elevul cu exact trei ore rămase ieșea cu zero libere și nu
       era propus niciodată. Tocmai cel pe care vrei să-l închei. */
    let r = Math.min(iasRezerva(iasSet || null), iasSet ? iasImpartire(n, e, iasSet).total : bo(n));
    return n.examDate ? t >= n.examDate ? 0 : Mf(n, t) ? a : Math.max(0, a - r) : Math.max(0, a - r)
}

function VA(n, e, t, a) {
    if (!n) return null;
    let r = bo(n),
        i = e.filter(u => u.id !== a && u.studentId === n.id && u.status !== "cancelled").length,
        s = r - i,
        l = Math.min(iasRezerva(t || null), r);
    return s > l ? null : n.examDate ? Mf(n, t) ? null : `Aten\u021Bie: e una dintre ultimele ${l} \u0219edin\u021Be. Ar trebui programat\u0103 cu 1\u20135 zile \xEEnainte de examen (${qe(n.examDate)}). Apas\u0103 din nou \u201ESalveaz\u0103" ca s\u0103 o programezi oricum.` : `Aten\u021Bie: e una dintre ultimele ${l} \u0219edin\u021Be, p\u0103strate pentru preg\u0103tirea de dinaintea examenului. ${n.name} nu are \xEEnc\u0103 dat\u0103 de examen. Apas\u0103 din nou \u201ESalveaz\u0103" ca s\u0103 o programezi oricum.`
}

function Fw(n, e) {
    return n.filter(t => t.studentId === e && t.status !== "cancelled" && t.type === "included").length
}

function WA(n, e) {
    return n.filter(t => t.studentId === e && t.status !== "cancelled" && t.otherInstructor).length
}

function gw(n, e) {
    return Fw(e, n.id) < (Number(n.includedHours) || 0) ? "included" : "extra"
}

function Bw(n, e) {
    return Af(e, n.id) === 0 ? "nou" : "in_curs"
}
var ur = n => (n && n.oreTip) === "included" ? "included" : "extra",
    hu = n => n === "included" ? "ore incluse" : "ore suplimentare";

function zw(n, e) {
    return ii(e).reduce((t, a) => ur(a) === "extra" ? t + Df(n, a.id) * (Number(a.hours) || 0) : t, 0)
}

function Ow(n, e, t) {
    return iasImpartire(n, e, t).deIncasat
}
function iasMasini(setari) {
    return (setari && setari.masini) || [];
}
function iasMasina(setari, id) {
    return iasMasini(setari).filter(function (m) { return m.id === id })[0] || null;
}
/* Mașina cu care pornește un elev nou. Dacă ai una singură, e limpede care.
   Dacă ai mai multe, o alegi tu în Setări; până n-o schimbi, toți elevii noi o
   primesc pe aceea, iar pe fișa fiecăruia poți pune altceva. */
function iasMasinaImplicita(setari) {
    var lista = iasMasini(setari);
    if (!lista.length) return "";
    if (lista.length === 1) return lista[0].id;
    var aleasa = (setari || {}).masinaImplicita;
    return lista.some(function (m) { return m.id === aleasa }) ? aleasa : ""
}

function iasNumeMasina(setari, id) {
    var m = iasMasina(setari, id);
    if (!m) return "";
    return m.nume + (m.cutie ? " \xB7 " + (m.cutie === "automata" ? "automat\u0103" : "manual\u0103") : "");
}

function ii(n) {
    return n.feeTypes ? n.feeTypes : [{
        id: "reexam",
        name: "Tax\u0103 reexaminare",
        price: Number(n.reexamFee) || 250
    }]
}

function Df(n, e) {
    let t = n.fees || {};
    return t[e] != null ? Number(t[e]) || 0 : e === "reexam" && Number(n.reexamCount) || 0
}

function _f(n, e) {
    return ii(e).reduce((t, a) => t + Df(n, a.id) * (Number(a.price) || 0), 0)
}

function qA({
    student: n,
    settings: e,
    onSet: t
}) {
    let a = ii(e);
    return a.length === 0 ? null : o.default.createElement("div", {
        className: "mt-2 pt-2 border-t border-slate-200/60 space-y-2"
    }, a.map(r => {
        let i = Df(n, r.id),
            s = Number(r.price) || 0,
            l = Number(r.hours) || 0;
        return o.default.createElement("div", {
            key: r.id,
            className: "flex items-center justify-between gap-2"
        }, o.default.createElement("span", {
            className: "text-xs text-slate-600 min-w-0"
        }, r.name, " ", o.default.createElement("span", {
            className: "text-slate-400"
        }, "\xB7 ", s.toLocaleString("ro-RO"), " ", e.currency, l > 0 ? ` \xB7 +${l} ${hu(ur(r))}` : ""), i > 0 && o.default.createElement("span", {
            className: "font-mono-time text-amber-700"
        }, " \xD7 ", i, " = ", (i * s).toLocaleString("ro-RO"), " ", e.currency)), o.default.createElement("span", {
            className: "inline-flex items-center gap-1 shrink-0"
        }, o.default.createElement("button", {
            onClick: () => t(n.id, r.id, i - 1),
            disabled: i === 0,
            className: "w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 text-base disabled:opacity-30"
        }, "\u2212"), o.default.createElement("button", {
            onClick: () => t(n.id, r.id, i + 1),
            className: "w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 text-base"
        }, "+")))
    }))
}

function $A({
    feeTypes: n,
    currency: e,
    onChange: t
}) {
    let [a, r] = (0, o.useState)(null);

    function i() {
        let s = (a.name || "").trim();
        if (!s) return;
        let l = Number(a.price) || 0,
            u = Number(a.hours) || 0,
            d = a.oreTip === "included" ? "included" : "extra",
            f = !!a.laScoala;
        a.id ? t(n.map(p => p.id === a.id ? {
            ...p,
            name: s,
            price: l,
            hours: u,
            oreTip: d,
            laScoala: f
        } : p)) : t([...n, {
            id: Vt("fee"),
            name: s,
            price: l,
            hours: u,
            oreTip: d,
            laScoala: f
        }]), r(null)
    }
    return o.default.createElement("div", null, o.default.createElement("div", {
        className: "space-y-1.5 mb-3"
    }, n.map(s => o.default.createElement("div", {
        key: s.id,
        className: "flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200"
    }, o.default.createElement("button", {
        onClick: () => r({
            id: s.id,
            name: s.name,
            price: s.price,
            hours: s.hours || "",
            oreTip: ur(s),
            laScoala: !!s.laScoala
        }),
        className: "text-left flex-1 min-w-0"
    }, o.default.createElement("div", {
        className: "text-sm text-slate-800 truncate"
    }, s.name), o.default.createElement("div", {
        className: "font-mono-time text-xs text-slate-400"
    }, (Number(s.price) || 0).toLocaleString("ro-RO"), " ", e, Number(s.hours) > 0 ? ` \xB7 +${Number(s.hours)} ${hu(ur(s))}` : " / bucat\u0103", s.laScoala ? " \xB7 la \u0219coal\u0103" : "")), o.default.createElement("button", {
        onClick: () => t(n.filter(l => l.id !== s.id)),
        className: "p-1.5 text-slate-400 shrink-0"
    }, o.default.createElement(pa, {
        size: 15
    })))), n.length === 0 && !a && o.default.createElement("div", {
        className: "text-xs text-slate-400 py-1"
    }, "Nicio tax\u0103 definit\u0103.")), a ? o.default.createElement("div", {
        className: "bg-slate-50 rounded-xl p-3.5"
    }, o.default.createElement("input", {
        className: `${ie} mb-2`,
        placeholder: "Denumire (ex: Pachet 5 \u0219edin\u021Be)",
        value: a.name,
        onChange: s => r({
            ...a,
            name: s.target.value
        })
    }), o.default.createElement("input", {
        type: "number",
        min: "0",
        className: `${ie} mb-2`,
        placeholder: "Sum\u0103",
        value: a.price,
        onChange: s => r({
            ...a,
            price: s.target.value
        })
    }), o.default.createElement("input", {
        type: "number",
        min: "0",
        className: `${ie} mb-2`,
        placeholder: "Ore ad\u0103ugate elevului (op\u021Bional)",
        value: a.hours,
        onChange: s => r({
            ...a,
            hours: s.target.value
        })
    }), Number(a.hours) > 0 && o.default.createElement("select", {
        className: `${ie} mb-1.5`,
        value: a.oreTip || "extra",
        onChange: s => r({
            ...a,
            oreTip: s.target.value
        })
    }, o.default.createElement("option", {
        value: "extra"
    }, "Ore suplimentare \xB7 pl\u0103tite prin aceast\u0103 tax\u0103"), o.default.createElement("option", {
        value: "included"
    }, "Ore incluse \xB7 achitate prin \u0219colarizare")), o.default.createElement("button", {
        type: "button",
        onClick: () => r({
            ...a,
            laScoala: !a.laScoala
        }),
        className: "w-full flex items-center gap-2.5 rounded-xl border px-3 py-2 mb-2 text-left",
        style: a.laScoala ? {
            borderColor: "var(--accent-line)",
            background: "var(--accent-soft)"
        } : {
            borderColor: "var(--line)",
            background: "var(--surface)"
        }
    }, o.default.createElement("span", {
        className: "flex items-center justify-center rounded shrink-0",
        style: {
            width: 16,
            height: 16,
            border: `1.5px solid ${a.laScoala?"var(--accent)":"var(--line-2)"}`,
            background: a.laScoala ? "var(--accent)" : "transparent",
            color: "#3a2100",
            fontSize: 11,
            fontWeight: 900,
            lineHeight: 1
        }
    }, a.laScoala ? "\u2713" : ""), o.default.createElement("span", {
        className: "text-xs text-slate-600 flex-1"
    }, "Se achit\u0103 direct la \u0219coal\u0103")), o.default.createElement("p", {
        className: "text-xs text-slate-400 mb-3"
    }, a.laScoala ? "Suma se trece singur\u0103 ca plat\u0103 la \u0219coal\u0103, deci nu r\u0103m\xE2ne datorie la tine. " : "", Number(a.hours) > 0 ? a.oreTip === "included" ? 'Orele intr\u0103 la \u201Eincluse" pe cardul elevului: nu se mai adun\u0103 la datoria lui, ca \u0219colarizarea.' : 'Orele intr\u0103 la \u201Esuplimentare" \u0219i sunt deja pl\u0103tite prin pre\u021Bul taxei \u2014 nu se mai taxeaz\u0103 \xEEnc\u0103 o dat\u0103 la bucat\u0103.' : "Completeaz\u0103 orele doar dac\u0103 e un pachet sau o \u0219colarizare \u2014 atunci bifarea taxei pe cardul elevului i le adaug\u0103 automat."), o.default.createElement("div", {
        className: "flex gap-2"
    }, o.default.createElement("button", {
        onClick: () => r(null),
        className: "flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600"
    }, "Renun\u021B\u0103"), o.default.createElement("button", {
        onClick: i,
        className: "flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm"
    }, "Salveaz\u0103"))) : o.default.createElement("button", {
        onClick: () => r({
            name: "",
            price: "",
            hours: "",
            oreTip: "extra",
            laScoala: !1
        }),
        className: "w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
    }, o.default.createElement(cn, {
        size: 14
    }), "Tax\u0103 nou\u0103"))
}

/* Un câmp numeric care se lasă scris. Cele legate direct de setare săreau
   înapoi la o valoare validă în clipa în care goleai câmpul, așa că nu puteai
   șterge ca să scrii altceva. Aici textul stă pe loc cât scrii, iar limitele se
   pun abia la ieșirea din câmp. */
function IasNumar({ value: iasV, min: iasMin = 0, max: iasMax = 999, onCommit: iasC, className: iasCls }) {
    let [text, pune] = (0, o.useState)(String(iasV));
    (0, o.useEffect)(() => { pune(String(iasV)) }, [iasV]);
    let limita = (n) => Math.max(iasMin, Math.min(iasMax, n));
    return o.default.createElement("input", {
        type: "text", inputMode: "numeric", value: text,
        onFocus: ev => ev.target.select(),
        onChange: ev => {
            let brut = ev.target.value.replace(/[^0-9]/g, "").slice(0, 3);
            pune(brut);
            if (brut !== "") iasC(limita(Number(brut)))
        },
        onBlur: () => {
            let n = limita(Number(text) || iasMin || 1);
            pune(String(n)), iasC(n)
        },
        className: iasCls
    })
}

function xw({
    value: n,
    onCommit: e
}) {
    let [t, a] = (0, o.useState)(String(n));
    return (0, o.useEffect)(() => {
        a(String(n))
    }, [n]), o.default.createElement("input", {
        type: "text",
        inputMode: "numeric",
        value: t,
        onFocus: r => r.target.select(),
        onChange: r => {
            /* Se putea scrie doar ultima cifră tastată, așa că ștergeai un 2 ca
               să pui 4 și rămâneai cu 1. Acum câmpul se scrie normal: îl poți
               goli, poți scrie două cifre, iar limitele se pun la ieșire. */
            let i = r.target.value.replace(/[^0-9]/g, "").slice(0, 2);
            a(i), i !== "" && e(Math.max(1, Math.min(7, Number(i))))
        },
        onBlur: () => {
            let i = Math.max(1, Math.min(7, Number(t) || 1));
            a(String(i)), e(i)
        },
        className: "w-12 text-center text-sm border border-slate-200 rounded-lg py-1 bg-white"
    })
}

function M0(n) {
    return (n.payments || []).reduce((e, t) => e + (Number(t.amount) || 0), 0)
}

function Hw(n, e, t) {
    return Ow(n, e, t) - M0(n)
}

/* Pachetele cu ore suplimentare ale unui elev, fiecare cu ziua în care l-ai
   pus. Cele vechi, puse înainte să ținem minte ziua, se socotesc „dintotdeauna"
   — ca să nu se schimbe nimic la elevii de dinainte. */
function iasPacheteleLui(elev, setari) {
    var jurnal = Array.isArray(elev.feeLog) ? elev.feeLog : [],
        out = [];
    ii(setari).forEach(function (taxa) {
        if (ur(taxa) !== "extra") return;
        var ore = Number(taxa.hours) || 0;
        if (!ore) return;
        var cate = Df(elev, taxa.id),
            zile = jurnal.filter(function (x) { return x && x.feeId === taxa.id })
                .map(function (x) { return x.date || "" }).sort(),
            faraZi = Math.max(0, cate - zile.length);
        for (var k = 0; k < faraZi; k++) out.push({ dela: "", ore: ore });
        zile.slice(0, cate).forEach(function (z) { out.push({ dela: z, ore: ore }) })
    });
    return out.sort(function (x, y) { return (x.dela || "").localeCompare(y.dela || "") })
}

/* ============ ÎMPĂRȚIREA ORELOR ȘI A BANILOR ============
   Una singură, folosită peste tot: și la etichetele de pe ședințe, și la
   datorie, și la contorul de pe fișă. Altfel ajung să spună lucruri diferite,
   cum s-a și întâmplat.

   Cum lucrează, pe înțelesul meseriei:

     · Fiecare ședință suplimentară costă, la bucată.
     · Un pachet aduce doi bani: suma lui de plată și un număr de locuri
       pre-plătite. Locurile merg întâi la ședințele de după pachet; cele
       rămase prind ședințe deja făcute, DAR neachitate — asta e cazul în care
       vinzi pachetul după ce omul a și condus.
     · Banii primiți sting datoriile în ordinea în care s-au născut, nu „întâi
       taxele". Fără asta, o plată veche s-ar muta pe o taxă nouă și ședințe
       achitate de luni de zile ar reveni la „de plată".

   Orele suplimentare scrise de mână pe fișă sunt locuri pe care le dai tu, fără
   preț — ca orele incluse. Dacă vrei să le și încasezi, pui un pachet. */
function iasImpartire(elev, sesiuni, setari) {
    var pret = {};
    (setari.rateTypes || []).forEach(function (x) { pret[x.id] = Number(x.price) || 0 });

    var sup = (sesiuni || []).filter(function (x) {
        return x.studentId === elev.id && x.status !== "cancelled"
            && !x.otherInstructor && x.type !== "included"
    }).sort(function (a, b) {
        return (a.date + Se(a.startMin)).localeCompare(b.date + Se(b.startMin))
    });

    var pach = iasPacheteleLui(elev, setari),
        locuriPachete = pach.reduce(function (c, x) { return c + x.ore }, 0),
        /* ore suplimentare puse cu mâna, peste cele din pachete */
        cuMana = Math.max(0, (Number(elev.extraHours) || 0) - locuriPachete);
    if (cuMana > 0) pach = [{ dela: "", ore: cuMana }].concat(pach);
    var locuri = locuriPachete + cuMana,
        acoperit = {};

    // 1. locurile merg la ședințele de la data pachetului încolo
    pach.forEach(function (pp) {
        sup.forEach(function (u) {
            if (pp.ore > 0 && !acoperit[u.id] && (!pp.dela || pp.dela <= u.date))
                acoperit[u.id] = !0, pp.ore--
        })
    });

    // toate datoriile, în ordinea în care s-au născut
    var datorii = [];
    ii(setari).forEach(function (taxa) {
        var cate = Df(elev, taxa.id),
            zile = (elev.feeLog || []).filter(function (x) { return x && x.feeId === taxa.id })
                .map(function (x) { return x.date || "" }).sort();
        for (var k = 0; k < cate; k++)
            datorii.push({ data: zile[k] == null ? "" : zile[k], suma: Number(taxa.price) || 0, fel: "taxa" })
    });
    sup.forEach(function (u) {
        datorii.push({ data: u.date, suma: pret[u.type] || 0, fel: "sedinta", ses: u })
    });
    datorii.sort(function (a, b) { return (a.data || "").localeCompare(b.data || "") });

    var imparteBanii = function () {
        var bani = M0(elev);
        datorii.forEach(function (d) {
            d.platit = 0;
            if (d.fel === "sedinta" && acoperit[d.ses.id]) return;
            var ia = Math.min(bani, d.suma);
            d.platit = ia, bani -= ia
        })
    };
    imparteBanii();

    // 2. locurile rămase prind ședințe deja făcute, dar neachitate
    pach.forEach(function (pp) {
        datorii.forEach(function (d) {
            if (pp.ore > 0 && d.fel === "sedinta" && !acoperit[d.ses.id] && (d.platit || 0) < d.suma)
                acoperit[d.ses.id] = !0, pp.ore--
        })
    });
    imparteBanii();

    var stare = {}, necoperite = 0, deIncasat = 0;
    datorii.forEach(function (d) {
        if (d.fel !== "sedinta") { deIncasat += d.suma; return }
        if (acoperit[d.ses.id]) { stare[d.ses.id] = "package"; return }
        necoperite++, deIncasat += d.suma;
        stare[d.ses.id] = d.platit >= d.suma ? "paid" : d.platit > 0 ? "partial" : "due"
    });

    return {
        stare: stare,
        deIncasat: deIncasat,
        necoperite: necoperite,
        locuri: locuri,
        /* Câte ședințe are dreptul să facă: incluse + locuri din pachete +
           ședințele la bucată pe care deja i le-ai dat. Cele la bucată nu ies
           din nicio pungă — le vinzi pe loc. */
        total: (Number(elev.includedHours) || 0) + locuri + necoperite
    }
}

function jA(n, e, t) {
    return iasImpartire(n, e, t).stare
}
function Uw(n) {
    let e = n && n.settings || {};
    return {
        students: (Array.isArray(n && n.students) ? n.students : []).map(t => ({
            ...t,
            payments: (Array.isArray(t.payments) ? t.payments : []).map(a => a && a.id ? a : {
                ...a || {},
                id: Vt("pay")
            })
        })),
        sessions: Array.isArray(n && n.sessions) ? n.sessions : [],
        licente: Array.isArray(n && n.licente) ? n.licente : [],
        varsaminte: Array.isArray(n && n.varsaminte) ? n.varsaminte : [],
        settings: {
            ...sr,
            ...e,
            theme: e.theme || sr.theme,
            rateTypes: e.rateTypes || sr.rateTypes,
            employer: {
                ...sr.employer,
                ...e.employer || {}
            },
            workingDaysOverrides: e.workingDaysOverrides || {},
            locations: e.locations || []
        }
    }
}
var Rw = "ias-student";

/* Indicativul tău: inițialele numelui, ca să se știe în aplicația colegului cine
   a ținut ședințele de până acum. Fără nume completat, rămâne marca aplicației. */
function iasIndicativ(setari) {
    let nume = ((setari && setari.numeleTau) || "").trim();
    if (!nume) return AA;
    // și numele legate cu cratimă dau inițiale: „Ioan-Adrian Stancu" → IAS
    let ini = nume.split(/[\s-]+/).filter(Boolean).map(x => x[0]).join("").toUpperCase();
    return ini.slice(0, 4) || AA;
}

function XA(n, e, iasSetari) {
    let semn = iasIndicativ(iasSetari);
    return JSON.stringify({
        kind: Rw,
        schemaVersion: f0,
        appVersion: ri,
        exportedAt: Yn(),
        instructor: semn,
        student: n,
        /* Ședințele plecate cu elevul poartă indicativul tău: la colegul care-l
           primește ele sunt ore făcute cu altcineva, deci se trec ca atare, cu
           numele tău scris în dreptul lor. */
        sessions: e.filter(t => t.studentId === n.id).map(t => t.otherInstructor ? t : {
            ...t,
            otherInstructor: !0,
            instructorName: semn
        })
    }, null, 2)
}

function YA(n, e) {
    let t = e.student || {},
        a = n.students.find(u => u.id === t.id),
        r = a ? Vt("stu") : t.id || Vt("stu"),
        i = {
            ...t,
            id: r,
            transferredFrom: e.exportedAt || Yn(),
            payments: Array.isArray(t.payments) ? t.payments : []
        },
        s = 0,
        l = (e.sessions || []).map(u => {
            let d = u.status !== "cancelled" && !u.otherInstructor && w0(n.sessions, u.date, u.startMin, null, n.settings);
            return d && s++, {
                ...u,
                id: Vt("ses"),
                studentId: r,
                imported: !0,
                clash: d,
                history: [...u.history || [], {
                    at: Yn(),
                    action: "Adus\u0103 prin transfer"
                }]
            }
        });
    return {
        data: {
            ...n,
            students: [...n.students, i],
            sessions: [...n.sessions, ...l]
        },
        name: i.name || "Elev",
        count: l.length,
        clashes: s,
        renamedId: !!a
    }
}

function ZA(n) {
    let e = n.getDay();
    return e >= 1 && e <= 5
}

function Gw(n, e) {
    let t = new Date(n, e + 1, 0).getDate(),
        a = 0;
    for (let r = 1; r <= t; r++) ZA(new Date(n, e, r)) && a++;
    return a
}

function Vw(n, e) {
    let t = n.workingDaysOverrides && n.workingDaysOverrides[e],
        [a, r] = e.split("-").map(Number),
        i = Gw(a, r - 1);
    if (t == null || t === "") return i;
    let s = Number(t);
    return Number.isFinite(s) && s >= 0 ? s : i
}

/* Salariul pe limbi. Engleza își păstrează rândurile de dinainte
   (englishBase / englishOvertime); celelalte limbi primesc „l:<limba>:base"
   și „l:<limba>:overtime". */
function iasCheieSalariu(limba, peste) {
    return !limba ? (peste ? "overtime" : "base") : limba === "en" ? (peste ? "englishOvertime" : "englishBase") : `l:${limba}:${peste ? "overtime" : "base"}`
}

function iasTarifeSalariu(setari) {
    let a = { ...sr.employer, ...(setari && setari.employer || {}) },
        tarife = {
            base: Number(a.baseRate) || 0,
            overtime: Number(a.overtimeRate) || 0,
            englishBase: iasTarifLimba(setari, "en", !1),
            englishOvertime: iasTarifLimba(setari, "en", !0)
        },
        randuri = { base: 0, overtime: 0, englishBase: 0, englishOvertime: 0 };
    iasLimbi(setari).forEach(l => {
        if (l.id === "en") return;
        [!1, !0].forEach(peste => {
            let k = iasCheieSalariu(l.id, peste);
            tarife[k] = Number(peste ? l.tarifPeste : l.tarif) || 0, randuri[k] = 0
        })
    });
    return { tarife, randuri }
}

function vw(n, e, t, a) {
    let r = {
            ...sr.employer,
            ...a.employer || {}
        },
        i = iasTarifeSalariu(a).tarife,
        s = Number(r.hoursPerDay) || 8,
        l = Number(r.hoursPerSession) || 2,
        u = {};
    n.forEach(p => {
        (u[p.date.slice(0, 7)] = u[p.date.slice(0, 7)] || []).push(p)
    });
    let d = [],
        f = 0;
    return Object.keys(u).sort().forEach(p => {
        let c = t.filter(x => x.status !== "cancelled" && !x.otherInstructor && x.date.startsWith(p)).length,
            m = Math.floor(Vw(a, p) * s / Math.max(.5, l)),
            g = u[p].slice().sort((x, h) => (x.date + Se(x.startMin)).localeCompare(h.date + Se(h.startMin))),
            v = 0,
            w = 0;
        g.forEach((x, h) => {
            let y = c + h >= m;
            y && w++;
            let _ = e.find(M => M.id === x.studentId),
                b = iasCheieSalariu(iasLimbaDe(_), y);
            v += i[b] != null ? i[b] : iasTarifLimba(a, iasLimbaDe(_), y)
        }), d.push({
            month: p,
            count: g.length,
            sum: v,
            over: w
        }), f += v
    }), {
        total: f,
        months: d
    }
}

function JA(n, e, t) {
    let a = {
            ...sr.employer,
            ...t.employer || {}
        },
        r = n.filter(m => m.status === "completed" && m.date.startsWith(e) && !m.otherInstructor).sort((m, g) => (m.date + Se(m.startMin)).localeCompare(g.date + Se(g.startMin))),
        i = Vw(t, e),
        s = Number(a.hoursPerDay) || 8,
        l = Number(a.hoursPerSession) || 2,
        u = i * s,
        d = Math.floor(u / Math.max(.5, l)),
        iasTS = iasTarifeSalariu(t),
        f = iasTS.tarife,
        p = iasTS.randuri,
        c = 0;
    return r.forEach((m, g) => {
        let v = g >= d,
            w = iasCheieSalariu(iasLimbaDe(m), v);
        /* O limbă ștearsă din Setări, cu ședințe făcute în ea: rândul ei rămâne,
           cu tariful obișnuit. */
        f[w] == null && (f[w] = iasTarifLimba(t, "", v), p[w] = 0);
        p[w]++, c += f[w]
    }), {
        workingDays: i,
        hoursPerDay: s,
        hoursPerSession: l,
        monthlyHours: u,
        threshold: d,
        totalSessions: r.length,
        rows: p,
        rates: f,
        totalPay: c
    }
}

function Ww(n, e, t) {
    let a = n.filter(l => l.status === "completed" && l.date.startsWith(t) && !l.otherInstructor),
        r = {};
    e.rateTypes.forEach(l => {
        r[l.id] = {
            name: l.name,
            price: l.price,
            count: 0
        }
    }), a.forEach(l => {
        r[l.type] || (r[l.type] = {
            name: "(tip \u0219ters)",
            price: 0,
            count: 0
        }), r[l.type].count++
    });
    let i = Object.entries(r).reduce((l, [u, d]) => u === "included" ? l : l + d.count * d.price, 0),
        s = n.filter(l => l.status === "completed" && l.date.startsWith(t) && l.otherInstructor).length;
    return {
        byType: r,
        total: i,
        otherCount: s
    }
}

function qw(n) {
    if (!n) return "";
    let e = n.replace(/[^\d+]/g, "");
    return e.startsWith("+") && (e = e.slice(1)), e.startsWith("0") ? e = "40" + e.slice(1) : !e.startsWith("40") && e.length === 9 && (e = "40" + e), e
}
var Fn = n => !!(n && n.lat != null && n.lng != null && n.lat !== "" && n.lng !== "");

function xo(n, e) {
    let t = String(e || "").trim();
    return t && (n && n.locations || []).find(a => a.name === t) || null
}

function wu(n, e, t) {
    let a = t === "dir" ? "https://www.google.com/maps/dir/?api=1&destination=" : "https://www.google.com/maps/search/?api=1&query=";
    return Fn(n) ? `${a}${n.lat},${n.lng}` : `${a}${encodeURIComponent(String(e||n&&n.name||""))}`
}

function $w(n, e) {
    if (Fn(n)) return `https://maps.google.com/?q=${Number(Number(n.lat).toFixed(5))},${Number(Number(n.lng).toFixed(5))}`;
    let t = String(e || n && n.name || "").trim();
    if (!t) return "";
    let a = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9 ,.-]/g, "").trim().replace(/\s+/g, "+");
    return a ? `https://maps.google.com/?q=${a}` : ""
}

function jw() {
    return new Promise((n, e) => {
        if (typeof navigator > "u" || !navigator.geolocation) {
            e(new Error("fara"));
            return
        }
        navigator.geolocation.getCurrentPosition(t => n({
            lat: Number(t.coords.latitude.toFixed(6)),
            lng: Number(t.coords.longitude.toFixed(6))
        }), t => e(t), {
            enableHighAccuracy: !0,
            timeout: 15e3,
            maximumAge: 0
        })
    })
}

/* Plus Code — codul scurt pe care ți-l dă Google Maps la orice punct, de pildă
   „8GP7XQR5+8V". E o adresă în sine: fiecare pereche de semne taie pătratul de
   dinainte în douăzeci pe fiecare latură, așa că din cod se scoate direct locul.
   Îl descifrăm aici, fără internet și fără vreo bibliotecă.

   Codul lung se descifrează singur. Cel scurt, cu numele orașului după el —
   „XQR5+8V Constanța" — are primele patru semne lipsă; le completăm de la un
   punct cunoscut din apropiere și alegem pătratul cel mai apropiat de el.     */
var IAS_PLUS_ALFABET = "23456789CFGHJMPQRVWX";

function iasPlusDescifra(cod) {
    var lat = -90, lng = -180, pas = 20;
    for (var i = 0; i + 1 < cod.length; i += 2) {
        var a = IAS_PLUS_ALFABET.indexOf(cod[i]), b = IAS_PLUS_ALFABET.indexOf(cod[i + 1]);
        if (a < 0 || b < 0) return null;
        lat += a * pas; lng += b * pas;
        pas /= 20
    }
    return { lat: lat + pas / 2, lng: lng + pas / 2, pas: pas }
}

function iasPlusScrie(lat, lng, semne) {
    var l = Math.min(89.999999, Math.max(-90, lat)) + 90,
        g = ((lng + 180) % 360 + 360) % 360,
        pas = 20, out = "";
    for (var i = 0; i < semne / 2; i++) {
        var a = Math.floor(l / pas), b = Math.floor(g / pas);
        out += IAS_PLUS_ALFABET[Math.min(19, a)] + IAS_PLUS_ALFABET[Math.min(19, b)];
        l -= a * pas; g -= b * pas; pas /= 20
    }
    return out
}

function iasPlusCod(text, langaLat, langaLng) {
    var brut = String(text || "").trim().toUpperCase(),
        potr = brut.match(/([23456789CFGHJMPQRVWX]{2,8})\+([23456789CFGHJMPQRVWX]{2,3})/);
    if (!potr) return null;
    var inainte = potr[1], dupa = potr[2], cod = inainte + dupa;

    if (inainte.length === 8) {
        var p = iasPlusDescifra(cod);
        return p && Math.abs(p.lat) <= 90 && Math.abs(p.lng) <= 180 ? { lat: p.lat, lng: p.lng } : null
    }

    // cod scurt: îi punem începutul de la punctul cunoscut din apropiere
    if (langaLat == null || langaLng == null) return null;
    var lipsa = 8 - inainte.length,
        intreg = iasPlusScrie(langaLat, langaLng, lipsa) + cod,
        q = iasPlusDescifra(intreg);
    if (!q) return null;
    // pătratul poate cădea alături; îl aducem pe cel mai apropiat de reper
    var lat = q.lat, lng = q.lng, latura = Math.pow(20, 2 - lipsa / 2);
    while (lat - langaLat > latura / 2) lat -= latura;
    while (langaLat - lat > latura / 2) lat += latura;
    while (lng - langaLng > latura / 2) lng -= latura;
    while (langaLng - lng > latura / 2) lng += latura;
    return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat: lat, lng: lng } : null
}

/* Reperul pentru codurile scurte: primul loc cu punct pe hartă din Setări.
   Codul scurt spune „unde, în ultimii patruzeci de kilometri" — restul se ia
   de aici. Fără niciun loc salvat, doar codurile lungi se pot citi. */
/* Punctul, scris înapoi ca Plus Code — cum l-ai introdus. Coordonatele goale nu
   spun nimic omului; codul se poate citi, copia și lipi în hartă. */
function iasPlusDinPunct(p) {
    if (!Fn(p)) return "";
    var c = iasPlusScrie(Number(p.lat), Number(p.lng), 10);
    return c.slice(0, 8) + "+" + c.slice(8)
}

function iasReper(setari) {
    var l = ((setari || {}).locations || []).filter(x => Fn(x))[0];
    return l ? [l.lat, l.lng] : [null, null]
}

function Xw(n, iasLangaLat, iasLangaLng) {
    let e = String(n || ""),
        t = [/@(-?\d{1,3}\.\d+),(-?\d{1,3}\.\d+)/, /[?&]q=(-?\d{1,3}\.\d+),\s*(-?\d{1,3}\.\d+)/, /!3d(-?\d{1,3}\.\d+)!4d(-?\d{1,3}\.\d+)/, /^\s*(-?\d{1,3}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)\s*$/];
    for (let a of t) {
        let r = e.match(a);
        if (r) {
            let i = Number(r[1]),
                s = Number(r[2]);
            if (Math.abs(i) <= 90 && Math.abs(s) <= 180) return {
                lat: i,
                lng: s
            }
        }
    }
    // dacă nu erau coordonate, poate e un Plus Code
    return iasPlusCod(e, iasLangaLat, iasLangaLng)
}

function QA(n, e) {
    if (!Fn(n) || !Fn(e)) return null;
    let t = s => Number(s) * Math.PI / 180,
        a = t(e.lat - n.lat),
        r = t(e.lng - n.lng),
        i = Math.sin(a / 2) ** 2 + Math.cos(t(n.lat)) * Math.cos(t(e.lat)) * Math.sin(r / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.sqrt(i))
}
var Yw = 5;

function KA(n, e) {
    let t = (n || []).filter(l => l.status !== "cancelled" && l.location).sort((l, u) => l.startMin - u.startMin).map(l => {
        let u = xo(e, l.location);
        return Fn(u) ? `${u.lat},${u.lng}` : l.location
    }).filter((l, u, d) => u === 0 || l !== d[u - 1]);
    if (t.length === 0) return null;
    let a = l => encodeURIComponent(l),
        r = t.slice(0, 10),
        i = r.slice(0, -1);
    return {
        href: `https://www.google.com/maps/dir/?api=1&destination=${a(r[r.length-1])}` + (i.length ? `&waypoints=${i.map(a).join("%7C")}` : "") + "&travelmode=driving",
        opriri: r.length
    }
}
var hf = n => String(n).padStart(2, "0");

function du(n, e) {
    let t = Ue(n);
    return t.setHours(0, Math.round(e), 0, 0), `${t.getFullYear()}${hf(t.getMonth()+1)}${hf(t.getDate())}T${hf(t.getHours())}${hf(t.getMinutes())}00`
}

function yf(n) {
    return String(n || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n")
}

function u0(n, e) {
    return ["BEGIN:VALARM", `TRIGGER${n}`, "ACTION:DISPLAY", `DESCRIPTION:${yf(e)}`, "END:VALARM"].join(`\r
`)
}

function ek(n, e) {
    let t = Be(),
        a = Fa(n.settings),
        r = n.sessions.filter(s => s.date >= t && s.status !== "cancelled" && !s.otherInstructor).sort((s, l) => (s.date + Se(s.startMin)).localeCompare(l.date + Se(l.startMin)));
    if (!r.length) return null;
    let i = ["BEGIN:VCALENDAR", "VERSION:2.0", `PRODID:-//${fn.mark}//RO`, "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
    return r.forEach(s => {
        let l = n.students.find(p => p.id === s.studentId),
            u = l ? l.name : "Elev",
            d = or(s, n.settings) || a,
            f = [];
        if (e.seara) {
            let p = Ue(s.date);
            p.setDate(p.getDate() - 1), f.push(u0(`;VALUE=DATE-TIME:${du(ft(p),1200)}`, `M\xE2ine ai \u0219edin\u021B\u0103 cu ${u}`))
        }
        e.dimineata && f.push(u0(`;VALUE=DATE-TIME:${du(s.date,420)}`, `Azi: \u0219edin\u021B\u0103 cu ${u} la ${Se(s.startMin)}`)), e.douaOre && f.push(u0(":-PT2H", `Peste 2 ore: ${u}`)), i.push("BEGIN:VEVENT", `UID:${s.id}@ias-auto`, `DTSTAMP:${du(t,0)}`, `DTSTART:${du(s.date,s.startMin)}`, `DTEND:${du(s.date,s.startMin+d)}`, `SUMMARY:${yf(`\u0218edin\u021B\u0103 \xB7 ${u}`)}`, ...s.location ? [`LOCATION:${yf(s.location)}`] : [], `DESCRIPTION:${yf(`${fn.mark} \xB7 ${(go[s.status]||{}).label||""}${s.notes?` \xB7 ${s.notes}`:""}`)}`, ...f, "END:VEVENT")
    }), i.push("END:VCALENDAR"), {
        text: i.join(`\r
`),
        cate: r.length
    }
}

function tk(n) {
    return `tel:${(n||"").replace(/\s+/g,"")}`
}

function nk(n) {
    return `https://wa.me/${qw(n)}`
}

function ak(n, e) {
    return `https://wa.me/${qw(n)}?text=${encodeURIComponent(e)}`
}

function rk(n, e) {
    return `sms:${(n||"").replace(/\s+/g,"")}?&body=${encodeURIComponent(e)}`
}

function Ff(n) {
    if (!n) return "";
    let e = (n.firstName || "").trim();
    if (e) return e.split(/\s+/)[0];
    let t = (n.name || "").trim();
    if (!t) return "";
    let a = t.split(/\s+/);
    return a[a.length - 1]
}

function _0(n) {
    let e = n && n.sex;
    return e === "m" ? {
        salut: "Salut",
        cand: "c\xE2nd e\u0219ti disponibil"
    } : e === "f" ? {
        salut: "Bun\u0103",
        cand: "c\xE2nd e\u0219ti disponibil\u0103"
    } : {
        salut: "Bun\u0103",
        cand: "c\xE2nd po\u021Bi"
    }
}
var p0 = "{salut}, {prenume}! Numele meu este {eu} \u0219i te contactez din partea \u0219colii {scoala}. Eu voi fi \xEEndrum\u0103torul t\u0103u pentru \u0219edin\u021Bele de conducere pe care le vei face la noi. Spune-mi, te rog, c\xE2nd ai fi {disponibil} pentru o prim\u0103 \xEEnt\xE2lnire!";

/* ============ LIMBILE ȘEDINȚELOR ============
   Un elev face ședințele în română sau într-o limbă străină. Limba străină are
   tariful ei la salariu (în program și peste program) și mesajele ei: bun
   venit, programare, mutare, anulare, lista ședințelor.

   Limbile tale stau în Setări (settings.limbi) și se aleg dintr-un catalog
   care are mesajele deja scrise. Una în afara catalogului se poate adăuga cu
   numele și tariful ei; mesajele pentru ea pleacă în engleză.

   Limba elevului (limba) e cea cu care pornesc ședințele lui; limba ședinței
   hotărăște tariful și mesajele despre ea. Datele vechi aveau doar english:
   true — se citesc ca „en". */
var IAS_LIMBI = {
    en: {
        nume: "Engleză", nativ: "English",
        zile: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        luni: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        data: (z, d, l) => `${z}, ${d} ${l}`,
        salut: "Hi", virgula: "", disponibil: "available", scoala: "our driving school",
        bunVenit: "{salut} {prenume}! My name is {eu} and I'm contacting you on behalf of {scoala}. I'll be your instructor for the driving lessons you'll be taking with us. Please let me know when you'd be {disponibil} for a first meeting!",
        programat: (d, h) => `I've booked your driving lesson for ${d}, ${h}.`,
        loc: "Meeting point:",
        confirma: "Please confirm within the next hour, so I can free up the slot if you can't make it.",
        multumesc: "Thank you!",
        anulat: (d, h) => `As you asked, I've cancelled your driving lesson on ${d} at ${h}. Let me know when you're available, so we can find another time.`,
        cuvinte: { zi: "DAY", ora: "TIME", loc: "PLACE" },
        toate3: "I've changed your driving lesson.\n*PLEASE NOTE: the DAY, the TIME and the PLACE are all changing.*",
        doua: (a, b) => `I've changed your driving lesson.\n*PLEASE NOTE: both the ${a} and the ${b} are changing.*`,
        doarLoc: "Your lesson stays on the same day, at the same time.\n*Only the MEETING PLACE is changing.*",
        doarZi: "I've moved your driving lesson.\n*The DAY is changing.* The time stays the same.",
        doarOra: "I've moved your driving lesson.\n*The TIME is changing.* The day stays the same.",
        nimic: "I'm writing about your driving lesson.",
        eticheta: { zi: "Day:", ora: "Time:", loc: "Place:" },
        nestabilit: "(not set yet)",
        laFelZiOra: (d, h) => `The day and time stay the same: ${d}, ${h}`,
        laFelZi: d => `The day stays the same: ${d}`,
        laFelOra: h => `The time stays the same: ${h}`,
        laFelLoc: l => `The meeting place stays the same: ${l}`,
        lista: "Your upcoming driving lessons:",
        listaFinal: "Please confirm. Thank you!",
        cerere: "To plan your driving lessons, I need to know when you're available: open the link below, choose for each day and tap “Send to instructor”. It only takes a minute."
    },
    uk: {
        nume: "Ucraineană", nativ: "Українська",
        zile: ["неділя", "понеділок", "вівторок", "середа", "четвер", "пʼятниця", "субота"],
        luni: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"],
        data: (z, d, l) => `${z}, ${d} ${l}`,
        salut: "Добрий день", virgula: ",", disponibil: "зручно", scoala: "нашої автошколи",
        bunVenit: "{salut}, {prenume}! Мене звати {eu}, пишу вам від імені {scoala}. Я буду вашим інструктором на заняттях з водіння. Будь ласка, напишіть, коли вам було б {disponibil} зустрітися вперше!",
        programat: (d, h) => `Ваше заняття з водіння заплановано: ${d}, ${h}.`,
        loc: "Місце зустрічі:",
        confirma: "Будь ласка, підтвердьте протягом години, щоб час можна було звільнити, якщо ви не зможете прийти.",
        multumesc: "Дякую!",
        anulat: (d, h) => `Як ви просили, заняття з водіння (${d}, ${h}) скасовано. Напишіть, коли вам зручно, і ми знайдемо інший час.`,
        cuvinte: { zi: "ДЕНЬ", ora: "ЧАС", loc: "МІСЦЕ" },
        toate3: "Ваше заняття з водіння змінено.\n*УВАГА: змінюються ДЕНЬ, ЧАС і МІСЦЕ.*",
        doua: (a, b) => `Ваше заняття з водіння змінено.\n*УВАГА: змінюються ${a} і ${b}.*`,
        doarLoc: "Заняття залишається того ж дня, о тій самій годині.\n*Змінюється лише МІСЦЕ ЗУСТРІЧІ.*",
        doarZi: "Ваше заняття з водіння перенесено.\n*Змінюється ДЕНЬ.* Час залишається той самий.",
        doarOra: "Ваше заняття з водіння перенесено.\n*Змінюється ЧАС.* День залишається той самий.",
        nimic: "Пишу щодо вашого заняття з водіння.",
        eticheta: { zi: "День:", ora: "Час:", loc: "Місце:" },
        nestabilit: "(ще не визначено)",
        laFelZiOra: (d, h) => `День і час залишаються ті самі: ${d}, ${h}`,
        laFelZi: d => `День залишається той самий: ${d}`,
        laFelOra: h => `Час залишається той самий: ${h}`,
        laFelLoc: l => `Місце зустрічі те саме: ${l}`,
        lista: "Ваші заплановані заняття з водіння:",
        listaFinal: "Будь ласка, підтвердьте. Дякую!",
        cerere: "Щоб скласти розклад ваших занять з водіння, мені треба знати, коли вам зручно: відкрийте посилання нижче, оберіть для кожного дня і натисніть «Надіслати інструктору». Це займе хвилину."
    },
    ru: {
        nume: "Rusă", nativ: "Русский",
        zile: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        luni: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
        data: (z, d, l) => `${z}, ${d} ${l}`,
        salut: "Здравствуйте", virgula: ",", disponibil: "удобно", scoala: "нашей автошколы",
        bunVenit: "{salut}, {prenume}! Меня зовут {eu}, пишу вам от имени {scoala}. Я буду вашим инструктором на занятиях по вождению. Пожалуйста, напишите, когда вам было бы {disponibil} встретиться в первый раз!",
        programat: (d, h) => `Ваше занятие по вождению назначено: ${d}, ${h}.`,
        loc: "Место встречи:",
        confirma: "Пожалуйста, подтвердите в течение часа, чтобы время можно было освободить, если вы не сможете прийти.",
        multumesc: "Спасибо!",
        anulat: (d, h) => `Как вы просили, занятие по вождению (${d}, ${h}) отменено. Напишите, когда вам удобно, и мы подберём другое время.`,
        cuvinte: { zi: "ДЕНЬ", ora: "ВРЕМЯ", loc: "МЕСТО" },
        toate3: "Ваше занятие по вождению изменено.\n*ВНИМАНИЕ: меняются ДЕНЬ, ВРЕМЯ и МЕСТО.*",
        doua: (a, b) => `Ваше занятие по вождению изменено.\n*ВНИМАНИЕ: меняются ${a} и ${b}.*`,
        doarLoc: "Занятие остаётся в тот же день, в то же время.\n*Меняется только МЕСТО ВСТРЕЧИ.*",
        doarZi: "Ваше занятие по вождению перенесено.\n*Меняется ДЕНЬ.* Время остаётся прежним.",
        doarOra: "Ваше занятие по вождению перенесено.\n*Меняется ВРЕМЯ.* День остаётся прежним.",
        nimic: "Пишу по поводу вашего занятия по вождению.",
        eticheta: { zi: "День:", ora: "Время:", loc: "Место:" },
        nestabilit: "(пока не указано)",
        laFelZiOra: (d, h) => `День и время остаются прежними: ${d}, ${h}`,
        laFelZi: d => `День остаётся прежним: ${d}`,
        laFelOra: h => `Время остаётся прежним: ${h}`,
        laFelLoc: l => `Место встречи прежнее: ${l}`,
        lista: "Ваши запланированные занятия по вождению:",
        listaFinal: "Пожалуйста, подтвердите. Спасибо!",
        cerere: "Чтобы составить расписание ваших занятий по вождению, мне нужно знать, когда вам удобно: откройте ссылку ниже, выберите для каждого дня и нажмите «Отправить инструктору». Это займёт минуту."
    },
    tr: {
        nume: "Turcă", nativ: "Türkçe",
        zile: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
        luni: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        data: (z, d, l) => `${d} ${l} ${z}`,
        salut: "Merhaba", virgula: "", disponibil: "uygun", scoala: "sürücü kursumuz",
        bunVenit: "{salut} {prenume}! Benim adım {eu}, {scoala} adına yazıyorum. Sürüş derslerinizde eğitmeniniz ben olacağım. İlk görüşme için ne zaman {disponibil} olduğunuzu yazar mısınız?",
        programat: (d, h) => `Sürüş dersiniz planlandı: ${d}, ${h}.`,
        loc: "Buluşma yeri:",
        confirma: "Gelemeyecekseniz saati boşaltabilmem için lütfen bir saat içinde onaylayın.",
        multumesc: "Teşekkürler!",
        anulat: (d, h) => `İsteğiniz üzerine ${d}, ${h} tarihli sürüş dersinizi iptal ettim. Başka bir saat bulmak için ne zaman uygun olduğunuzu yazın.`,
        cuvinte: { zi: "GÜN", ora: "SAAT", loc: "YER" },
        toate3: "Sürüş dersinizde değişiklik var.\n*DİKKAT: GÜN, SAAT ve YER değişiyor.*",
        doua: (a, b) => `Sürüş dersinizde değişiklik var.\n*DİKKAT: ${a} ve ${b} değişiyor.*`,
        doarLoc: "Dersiniz aynı gün, aynı saatte.\n*Sadece BULUŞMA YERİ değişiyor.*",
        doarZi: "Sürüş dersiniz taşındı.\n*GÜN değişiyor.* Saat aynı kalıyor.",
        doarOra: "Sürüş dersiniz taşındı.\n*SAAT değişiyor.* Gün aynı kalıyor.",
        nimic: "Sürüş dersiniz hakkında yazıyorum.",
        eticheta: { zi: "Gün:", ora: "Saat:", loc: "Yer:" },
        nestabilit: "(henüz belli değil)",
        laFelZiOra: (d, h) => `Gün ve saat aynı: ${d}, ${h}`,
        laFelZi: d => `Gün aynı: ${d}`,
        laFelOra: h => `Saat aynı: ${h}`,
        laFelLoc: l => `Buluşma yeri aynı: ${l}`,
        lista: "Planlanmış sürüş dersleriniz:",
        listaFinal: "Lütfen onaylayın. Teşekkürler!",
        cerere: "Sürüş derslerinizi planlayabilmem için ne zaman uygun olduğunuzu bilmem gerekiyor: aşağıdaki bağlantıyı açın, her gün için seçim yapın ve “Eğitmene gönder”e dokunun. Bir dakika sürer."
    },
    fr: {
        nume: "Franceză", nativ: "Français",
        zile: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
        luni: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        data: (z, d, l) => `${z} ${d} ${l}`,
        salut: "Bonjour", virgula: "", disponibil: "disponible", scoala: "notre auto-école",
        bunVenit: "{salut} {prenume} ! Je m'appelle {eu} et je vous contacte de la part de {scoala}. Je serai votre moniteur pour les leçons de conduite. Dites-moi quand vous seriez {disponibil} pour un premier rendez-vous !",
        programat: (d, h) => `Votre leçon de conduite est prévue : ${d}, ${h}.`,
        loc: "Lieu de rendez-vous :",
        confirma: "Merci de confirmer dans l'heure, pour que je puisse libérer le créneau si vous ne pouvez pas venir.",
        multumesc: "Merci !",
        anulat: (d, h) => `Comme vous l'avez demandé, j'ai annulé votre leçon de conduite du ${d} à ${h}. Dites-moi quand vous êtes disponible, pour trouver un autre créneau.`,
        cuvinte: { zi: "le JOUR", ora: "l'HEURE", loc: "le LIEU" },
        toate3: "Votre leçon de conduite a changé.\n*ATTENTION : le JOUR, l'HEURE et le LIEU changent.*",
        doua: (a, b) => `Votre leçon de conduite a changé.\n*ATTENTION : ${a} et ${b} changent.*`,
        doarLoc: "Votre leçon reste le même jour, à la même heure.\n*Seul le LIEU DE RENDEZ-VOUS change.*",
        doarZi: "Votre leçon de conduite est déplacée.\n*Le JOUR change.* L'heure reste la même.",
        doarOra: "Votre leçon de conduite est déplacée.\n*L'HEURE change.* Le jour reste le même.",
        nimic: "Je vous écris au sujet de votre leçon de conduite.",
        eticheta: { zi: "Jour :", ora: "Heure :", loc: "Lieu :" },
        nestabilit: "(pas encore fixé)",
        laFelZiOra: (d, h) => `Le jour et l'heure restent les mêmes : ${d}, ${h}`,
        laFelZi: d => `Le jour reste le même : ${d}`,
        laFelOra: h => `L'heure reste la même : ${h}`,
        laFelLoc: l => `Le lieu de rendez-vous reste le même : ${l}`,
        lista: "Vos prochaines leçons de conduite :",
        listaFinal: "Merci de confirmer !",
        cerere: "Pour organiser vos leçons de conduite, j'ai besoin de savoir quand vous êtes disponible : ouvrez le lien ci-dessous, choisissez pour chaque jour et touchez « Envoyer au moniteur ». Cela prend une minute."
    },
    de: {
        nume: "Germană", nativ: "Deutsch",
        zile: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        luni: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        data: (z, d, l) => `${z}, ${d}. ${l}`,
        salut: "Hallo", virgula: "", disponibil: "Zeit", scoala: "unserer Fahrschule",
        bunVenit: "{salut} {prenume}! Mein Name ist {eu}, ich melde mich im Namen von {scoala}. Ich bin Ihr Fahrlehrer für die Fahrstunden bei uns. Sagen Sie mir bitte, wann Sie {disponibil} für ein erstes Treffen hätten!",
        programat: (d, h) => `Ihre Fahrstunde ist eingetragen: ${d}, ${h}.`,
        loc: "Treffpunkt:",
        confirma: "Bitte bestätigen Sie innerhalb einer Stunde, damit ich den Termin freigeben kann, falls Sie nicht kommen können.",
        multumesc: "Danke!",
        anulat: (d, h) => `Wie gewünscht habe ich Ihre Fahrstunde am ${d} um ${h} abgesagt. Sagen Sie mir Bescheid, wann Sie Zeit haben, damit wir einen neuen Termin finden.`,
        cuvinte: { zi: "der TAG", ora: "die UHRZEIT", loc: "der ORT" },
        toate3: "Ihre Fahrstunde wurde geändert.\n*ACHTUNG: Es ändern sich TAG, UHRZEIT und ORT.*",
        doua: (a, b) => `Ihre Fahrstunde wurde geändert.\n*ACHTUNG: Es ändern sich ${a} und ${b}.*`,
        doarLoc: "Ihre Fahrstunde bleibt am selben Tag zur selben Uhrzeit.\n*Nur der TREFFPUNKT ändert sich.*",
        doarZi: "Ihre Fahrstunde wurde verschoben.\n*Der TAG ändert sich.* Die Uhrzeit bleibt gleich.",
        doarOra: "Ihre Fahrstunde wurde verschoben.\n*Die UHRZEIT ändert sich.* Der Tag bleibt gleich.",
        nimic: "Ich schreibe Ihnen wegen Ihrer Fahrstunde.",
        eticheta: { zi: "Tag:", ora: "Uhrzeit:", loc: "Ort:" },
        nestabilit: "(noch offen)",
        laFelZiOra: (d, h) => `Tag und Uhrzeit bleiben gleich: ${d}, ${h}`,
        laFelZi: d => `Der Tag bleibt gleich: ${d}`,
        laFelOra: h => `Die Uhrzeit bleibt gleich: ${h}`,
        laFelLoc: l => `Der Treffpunkt bleibt gleich: ${l}`,
        lista: "Ihre nächsten Fahrstunden:",
        listaFinal: "Bitte bestätigen Sie. Danke!",
        cerere: "Damit ich Ihre Fahrstunden planen kann, muss ich wissen, wann Sie Zeit haben: Öffnen Sie den Link unten, wählen Sie für jeden Tag aus und tippen Sie auf „An den Fahrlehrer senden“. Das dauert nur eine Minute."
    },
    it: {
        nume: "Italiană", nativ: "Italiano",
        zile: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
        luni: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
        data: (z, d, l) => `${z} ${d} ${l}`,
        salut: "Buongiorno", virgula: "", disponibil: "disponibile", scoala: "questa autoscuola",
        bunVenit: "{salut} {prenume}! Mi chiamo {eu} e la contatto per conto di {scoala}. Sarò il suo istruttore per le lezioni di guida. Mi faccia sapere quando sarebbe {disponibil} per un primo incontro!",
        programat: (d, h) => `La sua lezione di guida è fissata: ${d}, ${h}.`,
        loc: "Luogo d'incontro:",
        confirma: "La prego di confermare entro un'ora, così posso liberare l'orario se non riesce a venire.",
        multumesc: "Grazie!",
        anulat: (d, h) => `Come richiesto, ho annullato la sua lezione di guida di ${d} alle ${h}. Mi faccia sapere quando è disponibile, così troviamo un altro orario.`,
        cuvinte: { zi: "il GIORNO", ora: "l'ORA", loc: "il LUOGO" },
        toate3: "La sua lezione di guida è cambiata.\n*ATTENZIONE: cambiano il GIORNO, l'ORA e il LUOGO.*",
        doua: (a, b) => `La sua lezione di guida è cambiata.\n*ATTENZIONE: cambiano ${a} e ${b}.*`,
        doarLoc: "La lezione resta lo stesso giorno, alla stessa ora.\n*Cambia solo il LUOGO D'INCONTRO.*",
        doarZi: "La sua lezione di guida è stata spostata.\n*Cambia il GIORNO.* L'ora resta la stessa.",
        doarOra: "La sua lezione di guida è stata spostata.\n*Cambia l'ORA.* Il giorno resta lo stesso.",
        nimic: "Le scrivo per la sua lezione di guida.",
        eticheta: { zi: "Giorno:", ora: "Ora:", loc: "Luogo:" },
        nestabilit: "(ancora da stabilire)",
        laFelZiOra: (d, h) => `Giorno e ora restano gli stessi: ${d}, ${h}`,
        laFelZi: d => `Il giorno resta lo stesso: ${d}`,
        laFelOra: h => `L'ora resta la stessa: ${h}`,
        laFelLoc: l => `Il luogo d'incontro resta lo stesso: ${l}`,
        lista: "Le sue prossime lezioni di guida:",
        listaFinal: "La prego di confermare. Grazie!",
        cerere: "Per organizzare le sue lezioni di guida ho bisogno di sapere quando è disponibile: apra il link qui sotto, scelga per ogni giorno e tocchi «Invia all’istruttore». Ci vuole un minuto."
    },
    es: {
        nume: "Spaniolă", nativ: "Español",
        zile: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
        luni: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        data: (z, d, l) => `${z}, ${d} de ${l}`,
        salut: "Hola", virgula: ",", disponibil: "disponible", scoala: "nuestra autoescuela",
        bunVenit: "¡{salut}, {prenume}! Me llamo {eu} y le escribo de parte de {scoala}. Seré su instructor en las clases de conducir. ¡Dígame cuándo estaría {disponibil} para un primer encuentro!",
        programat: (d, h) => `Su clase de conducir está programada: ${d}, ${h}.`,
        loc: "Lugar de encuentro:",
        confirma: "Por favor, confirme en la próxima hora, para que pueda liberar el horario si no puede venir.",
        multumesc: "¡Gracias!",
        anulat: (d, h) => `Como me pidió, he cancelado su clase de conducir del ${d} a las ${h}. Dígame cuándo puede, para buscar otro horario.`,
        cuvinte: { zi: "el DÍA", ora: "la HORA", loc: "el LUGAR" },
        toate3: "Su clase de conducir ha cambiado.\n*ATENCIÓN: cambian el DÍA, la HORA y el LUGAR.*",
        doua: (a, b) => `Su clase de conducir ha cambiado.\n*ATENCIÓN: cambian ${a} y ${b}.*`,
        doarLoc: "Su clase sigue el mismo día, a la misma hora.\n*Solo cambia el LUGAR DE ENCUENTRO.*",
        doarZi: "Su clase de conducir se ha movido.\n*Cambia el DÍA.* La hora sigue igual.",
        doarOra: "Su clase de conducir se ha movido.\n*Cambia la HORA.* El día sigue igual.",
        nimic: "Le escribo por su clase de conducir.",
        eticheta: { zi: "Día:", ora: "Hora:", loc: "Lugar:" },
        nestabilit: "(aún por fijar)",
        laFelZiOra: (d, h) => `El día y la hora siguen igual: ${d}, ${h}`,
        laFelZi: d => `El día sigue igual: ${d}`,
        laFelOra: h => `La hora sigue igual: ${h}`,
        laFelLoc: l => `El lugar de encuentro sigue igual: ${l}`,
        lista: "Sus próximas clases de conducir:",
        listaFinal: "Por favor, confirme. ¡Gracias!",
        cerere: "Para organizar sus clases de conducir necesito saber cuándo está disponible: abra el enlace de abajo, elija para cada día y toque «Enviar al instructor». Solo lleva un minuto."
    }
};

/* Saluturile care încep cu semn întors (spaniola) îl pun și la începutul
   mesajului: „¡Hola, Juan!". */
function iasSalutStrain(T, prenume) {
    let s = `${T.salut}${T.virgula} ${prenume}`;
    return T === IAS_LIMBI.es ? `\xA1${s}!` : T === IAS_LIMBI.fr ? `${s} !` : `${s}!`
}

/* Limbile tale, cu tarifele lor. Până să umbli la ele, e una singură:
   engleza, cu tarifele de engleză puse la angajator. */
function iasLimbi(setari) {
    if (setari && Array.isArray(setari.limbi)) return setari.limbi;
    let a = { ...sr.employer, ...(setari && setari.employer || {}) };
    return [{ id: "en", nume: IAS_LIMBI.en.nume, tarif: Number(a.englishBaseRate) || 0, tarifPeste: Number(a.englishOvertimeRate) || 0 }]
}

/* Limba unui elev sau a unei ședințe: "" e româna. */
function iasLimbaDe(x) {
    return !x ? "" : x.limba != null ? String(x.limba) : x.english ? "en" : ""
}

/* Câmpurile de scris pe elev sau pe ședință, ca să rămână citite și de cine
   știe doar de english. */
function iasCuLimba(x, limba) {
    return { ...x, limba: limba || "", english: limba === "en" }
}

function iasNumeLimba(setari, id) {
    if (!id) return "Rom\xE2nă";
    let l = iasLimbi(setari).find(x => x.id === id);
    return l ? l.nume : IAS_LIMBI[id] ? IAS_LIMBI[id].nume : id
}

/* Prescurtarea de pe fișă: RO, EN, UK… */
function iasCodLimba(id) {
    return !id ? "RO" : String(id).replace(/^x-/, "").slice(0, 2).toUpperCase()
}

/* Textele unei limbi. Limba adăugată în afara catalogului vorbește engleză. */
function iasTexte(id) {
    return IAS_LIMBI[id] || IAS_LIMBI.en
}

function iasFoLimba(id, iso) {
    let T = iasTexte(id), e = Ue(iso);
    return T.data(T.zile[e.getDay()], e.getDate(), T.luni[e.getMonth()])
}

/* Tariful unei ședințe la salariu, după limba ei. */
function iasTarifLimba(setari, id, peste) {
    let a = { ...sr.employer, ...(setari && setari.employer || {}) };
    if (id) {
        let l = iasLimbi(setari).find(x => x.id === id);
        if (l) return Number(peste ? l.tarifPeste : l.tarif) || 0
    }
    return Number(peste ? a.overtimeRate : a.baseRate) || 0
}

/* Mesajul de bun venit al unei limbi: cel scris de tine în Setări, altfel cel
   din catalog. */
function iasBunVenitLimba(setari, id) {
    let t = setari && setari.textBunVenitLimbi || {};
    return t[id] || (id === "en" && setari && setari.textBunVenitEn) || iasTexte(id).bunVenit
}

function iasBunVenitStrain(id, n, e) {
    let T = iasTexte(id);
    return iasBunVenitLimba(e, id).replace(/\{salut\}/g, T.salut).replace(/\{prenume\}/g, Ff(n))
        .replace(/\{eu\}/g, e && e.numeleTau || "").replace(/\{scoala\}/g, e && e.numeScoala || T.scoala)
        .replace(/\{disponibil\}/g, T.disponibil)
}

/* Ședința într-o limbă străină: programare, mutare (ziua, ora, locul) și
   anulare, cu aceleași îngroșări ca în română. */
function iasMesajStrain(id, n, e, t, a, r) {
    let T = iasTexte(id),
        cap = iasSalutStrain(T, Ff(e)),
        u = `${Se(t.startMin)}–${Se(t.startMin+(Number(t.duration)||si))}`,
        d = $w(xo(r, t.location), t.location),
        harta = d ? `\n${d}` : "",
        f = t.location ? `\n${T.loc} *${t.location}*${harta}` : "";
    if (n === "rescheduled" || n === "location") {
        let ce = iasCeSaSchimbat(a, t),
            ziVeche = a ? iasFoLimba(id, a.date) : "",
            ziNoua = iasFoLimba(id, t.date),
            locVechi = (a && a.location || "").trim(),
            locNou = (t.location || "").trim(),
            ceSeMuta = [ce.ziua && T.cuvinte.zi, ce.ora && T.cuvinte.ora, ce.locul && T.cuvinte.loc].filter(Boolean),
            bucati = [];
        let titlu = ceSeMuta.length === 3 ? T.toate3 : ceSeMuta.length === 2 ? T.doua(ceSeMuta[0], ceSeMuta[1])
            : ce.locul ? T.doarLoc : ce.ziua ? T.doarZi : ce.ora ? T.doarOra : T.nimic;
        if (ce.ziua) bucati.push(`\n\n${T.eticheta.zi}\n${ziVeche ? `_${ziVeche}_\n→ ` : ""}*${ziNoua}*`);
        if (ce.ora) bucati.push(`\n\n${T.eticheta.ora}\n${a ? `_${Se(a.startMin)}_\n→ ` : ""}*${u}*`);
        if (ce.locul) bucati.push(`\n\n${T.eticheta.loc}\n${locVechi ? `_${locVechi}_\n→ ` : ""}*${locNou || T.nestabilit}*${harta}`);
        if (!ce.ziua && !ce.ora) bucati.push(`\n\n${T.laFelZiOra(ziNoua, u)}`);
        else if (!ce.ziua) bucati.push(`\n\n${T.laFelZi(ziNoua)}`);
        else if (!ce.ora) bucati.push(`\n\n${T.laFelOra(u)}`);
        if (!ce.locul && locNou) bucati.push(`\n\n${T.laFelLoc(locNou)}${harta}`);
        return `${cap} ${titlu}` + bucati.join("") + `\n\n${T.confirma} ${T.multumesc}`
    }
    return n === "created" ? `${cap} ${T.programat(iasFoLimba(id, t.date), u)}${f}\n${T.confirma} ${T.multumesc}`
        : n === "cancelled" ? `${cap} ${T.anulat(iasFoLimba(id, t.date), Se(t.startMin))} ${T.multumesc}`
        : ""
}

/* Lista ședințelor programate, de pe fișa elevului. */
function iasListaStrain(id, e, N, a, W) {
    let T = iasTexte(id);
    return `${iasSalutStrain(T, Ff(e))} ${T.lista}
${N.map(R=>`• ${iasFoLimba(id, R.date)}, ${Se(R.startMin)}–${Se(R.startMin+or(R,a))}${R.location?` \xB7 ${R.location}`:""}`).join(`
`)}${W.replace(/^\nLocul:/, `\n${T.loc}`)}
${T.listaFinal}`
}

/* Limba elevului trece și pe ședințele lui de azi înainte, încă nefăcute
   (programate sau propuse). Cele efectuate sau anulate rămân cum au fost —
   după ele s-a socotit deja salariul. */
function iasLimbaPeViitoare(sesiuni, idElev, limba) {
    let azi = Be(), n = 0, L = limba || "";
    let out = (sesiuni || []).map(x => x.studentId === idElev && x.date >= azi && (x.status === "scheduled" || x.status === "pending") && iasLimbaDe(x) !== L
        ? (n++, iasCuLimba(x, L)) : x);
    return { sesiuni: out, schimbate: n }
}

/* Alegerea limbii: română, limbile tale (cu tarif) și, la cerere, una nouă.
   Mic: o pastilă pentru capul fișei (RO / EN / UK…), care deschide lista. */
function IasLimbaElev({ limba: iasL, setari: iasS, onAlege: iasAlege, onAdauga: iasAdauga, mic: iasMic }) {
    let lista = iasLimbi(iasS),
        [adaug, puneAdaug] = (0, o.useState)(!1);
    if (iasMic) return o.default.createElement(o.default.Fragment, null, o.default.createElement("label", {
        className: "relative inline-flex items-center rounded-full border text-xs font-medium px-2.5 py-0.5",
        style: iasL ? { color: "var(--accent-ink)", background: "var(--accent-soft)", borderColor: "var(--accent-line)" } : { color: "var(--text)", borderColor: "var(--line)" },
        "data-ias-limba-elev": iasL || "ro",
        title: "Limba ședințelor și a mesajelor"
    }, o.default.createElement("span", { "aria-hidden": "true" }, iasCodLimba(iasL), " ▾"),
        o.default.createElement("select", {
            "aria-label": "Limba ședințelor și a mesajelor",
            value: iasL || "",
            onChange: q => q.target.value === "__nou" ? puneAdaug(!0) : iasAlege(q.target.value),
            style: { position: "absolute", inset: 0, opacity: 0, width: "100%" }
        }, [["", "Rom\xE2n\u0103"]].concat(lista.map(x => [x.id, x.nume]), iasL && !lista.some(x => x.id === iasL) ? [[iasL, iasNumeLimba(iasS, iasL)]] : [], iasAdauga ? [["__nou", "+ Alt\u0103 limb\u0103\u2026"]] : []).map(([v, t]) => o.default.createElement("option", { key: v || "ro", value: v }, t)))),
        adaug && o.default.createElement(oi, { open: !0, onClose: () => puneAdaug(!1), title: "Alt\u0103 limb\u0103", layer: Wt.dialog },
            o.default.createElement(IasLimbaNoua, {
                setari: iasS,
                onRenunta: () => puneAdaug(!1),
                onAdauga: l => { iasAdauga(l), puneAdaug(!1), iasAlege(l.id) }
            })));
    return o.default.createElement("div", { "data-ias-limba-elev": iasL || "ro" },
        o.default.createElement("div", { className: "space-y-1.5" },
            [{ id: "", nume: "Rom\xE2nă", nota: "tarif normal" }].concat(lista.map(x => ({ id: x.id, nume: x.nume, nota: `${x.tarif} / ${x.tarifPeste} pe ședință` }))).map(x => {
                let ales = (iasL || "") === x.id;
                return o.default.createElement("button", {
                    key: x.id || "ro", type: "button", "data-ias-limba": x.id || "ro", "aria-pressed": ales,
                    onClick: () => iasAlege(x.id),
                    className: "w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left",
                    style: { background: ales ? "var(--accent-soft)" : "var(--surface)", border: `${ales ? 2 : 1}px solid ${ales ? "var(--accent)" : "var(--line)"}` }
                }, o.default.createElement("span", { className: "font-mono-time text-xs shrink-0", style: { width: 28, color: ales ? "var(--accent-ink)" : "var(--muted)" } }, iasCodLimba(x.id)),
                    o.default.createElement("span", { className: "text-sm font-medium flex-1", style: { color: ales ? "var(--accent-ink)" : "var(--text)" } }, x.nume),
                    o.default.createElement("span", { className: "text-xs", style: { color: "var(--muted-2)" } }, x.nota))
            })),
        iasAdauga ? adaug ? o.default.createElement(IasLimbaNoua, {
            setari: iasS,
            onRenunta: () => puneAdaug(!1),
            onAdauga: l => { iasAdauga(l), puneAdaug(!1), iasAlege(l.id) }
        }) : o.default.createElement("button", {
            type: "button", "data-ias-limba-noua": "",
            onClick: () => puneAdaug(!0),
            className: "w-full mt-1.5 py-2.5 rounded-xl text-sm font-medium",
            style: { border: "1px dashed var(--accent-line)", color: "var(--accent-ink)", background: "var(--accent-soft)" }
        }, "+ Altă limbă, cu tariful ei") : null)
}

/* O limbă nouă: din catalog (cu mesajele gata scrise) sau alta, cu numele ei;
   tariful în program și peste program. */
function IasLimbaNoua({ setari: iasS, onAdauga: iasAdauga, onRenunta: iasRenunta }) {
    let are = iasLimbi(iasS).map(x => x.id),
        catalog = Object.keys(IAS_LIMBI).filter(k => are.indexOf(k) < 0),
        a = { ...sr.employer, ...(iasS && iasS.employer || {}) },
        [id, puneId] = (0, o.useState)(catalog[0] || "alta"),
        [nume, puneNume] = (0, o.useState)(""),
        [tarif, puneTarif] = (0, o.useState)(String(Number(a.englishBaseRate) || Number(a.baseRate) || "")),
        [peste, punePeste] = (0, o.useState)(String(Number(a.englishOvertimeRate) || Number(a.overtimeRate) || "")),
        alta = id === "alta",
        bun = (alta ? nume.trim() : id) && Number(tarif) > 0;
    return o.default.createElement("div", { className: "rounded-2xl p-3.5 mt-2", "data-ias-limba-formular": "", style: { background: "var(--surface-2)", border: "1px solid var(--line)" } },
        o.default.createElement(xe, { label: "Limba" }, o.default.createElement("select", {
            className: ie, value: id, onChange: q => puneId(q.target.value)
        }, catalog.map(k => o.default.createElement("option", { key: k, value: k }, IAS_LIMBI[k].nume, " \xB7 ", IAS_LIMBI[k].nativ)),
            o.default.createElement("option", { value: "alta" }, "Altă limbă…"))),
        alta ? o.default.createElement(xe, { label: "Numele limbii" }, o.default.createElement("input", {
            className: ie, value: nume, placeholder: "ex. Poloneză", onChange: q => puneNume(q.target.value)
        })) : null,
        alta ? o.default.createElement("p", { className: "text-xs text-slate-400 -mt-2 mb-3" }, "Pentru limbile din afara listei, mesajele către elev pleacă \xEEn engleză.") : null,
        o.default.createElement("div", { className: "grid grid-cols-2 gap-3" },
            o.default.createElement(xe, { label: "Tarif \xEEn program" }, o.default.createElement("input", {
                type: "number", min: "0", inputMode: "numeric", className: ie, value: tarif, onChange: q => puneTarif(q.target.value)
            })),
            o.default.createElement(xe, { label: "Peste program" }, o.default.createElement("input", {
                type: "number", min: "0", inputMode: "numeric", className: ie, value: peste, onChange: q => punePeste(q.target.value)
            }))),
        o.default.createElement("p", { className: "text-xs text-slate-400 -mt-2 mb-3" }, "Tariful e cel pe care \xEEl primești la salariu pentru o ședință \xEEn limba asta."),
        o.default.createElement("div", { className: "flex gap-2" },
            o.default.createElement("button", { type: "button", onClick: iasRenunta, className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600" }, "Renunță"),
            o.default.createElement("button", {
                type: "button", disabled: !bun, "data-ias-limba-adauga": "",
                onClick: () => iasAdauga({
                    id: alta ? "x-" + nume.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : id,
                    nume: alta ? nume.trim() : IAS_LIMBI[id].nume,
                    tarif: Number(tarif) || 0,
                    tarifPeste: Number(peste) || Number(tarif) || 0
                }),
                className: "flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium disabled:opacity-40"
            }, "Adaugă limba")))
}

/* Ce se scrie în Setări când se schimbă limbile: lista și, pentru engleză,
   tarifele de la angajator (le citesc și versiunile mai vechi). */
function iasSetariCuLimbi(setari, limbi) {
    let en = limbi.find(x => x.id === "en"),
        a = { ...sr.employer, ...(setari && setari.employer || {}) };
    return { limbi: limbi, employer: en ? { ...a, englishBaseRate: Number(en.tarif) || 0, englishOvertimeRate: Number(en.tarifPeste) || 0 } : a }
}

/* Limbile tale, în Finanțe → Salariu: tariful fiecăreia, de schimbat sau de
   șters, și una nouă. Ștearsă, limba nu mai apare la alegere; ședințele deja
   făcute în ea rămân la salariu cu tariful obișnuit. */
function IasLimbiTarife({ setari: iasS, onSchimba: iasSchimba }) {
    let lista = iasLimbi(iasS),
        [ed, puneEd] = (0, o.useState)(null),
        [nou, puneNou] = (0, o.useState)(!1),
        bani = x => `${Number(x) || 0} ${iasS && iasS.currency || "lei"}`;
    return o.default.createElement("div", { className: "mt-4", "data-ias-limbi-tarife": "" },
        o.default.createElement("div", { className: "text-xs font-medium text-slate-500 mb-1.5 px-1" }, "Ședințe în alte limbi"),
        o.default.createElement("div", { className: "space-y-1.5" }, lista.map(l => ed && ed.id === l.id ? o.default.createElement("div", {
            key: l.id, className: "rounded-xl p-3", style: { background: "var(--surface-2)", border: "1px solid var(--line)" }
        }, o.default.createElement("div", { className: "text-sm font-medium mb-2" }, l.nume),
            o.default.createElement("div", { className: "grid grid-cols-2 gap-3" },
                o.default.createElement(xe, { label: "În program" }, o.default.createElement("input", {
                    type: "number", min: "0", inputMode: "numeric", className: ie, value: ed.tarif, onChange: q => puneEd({ ...ed, tarif: q.target.value })
                })),
                o.default.createElement(xe, { label: "Peste program" }, o.default.createElement("input", {
                    type: "number", min: "0", inputMode: "numeric", className: ie, value: ed.tarifPeste, onChange: q => puneEd({ ...ed, tarifPeste: q.target.value })
                }))),
            o.default.createElement("div", { className: "flex gap-2" },
                o.default.createElement("button", {
                    type: "button", "data-ias-limba-sterge": l.id,
                    onClick: () => { iasSchimba(lista.filter(x => x.id !== l.id)), puneEd(null) },
                    className: "py-2 px-3 rounded-lg border text-sm",
                    style: { borderColor: "var(--bad)", color: "var(--bad)" }
                }, "Șterge"),
                o.default.createElement("button", { type: "button", onClick: () => puneEd(null), className: "flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600" }, "Renunță"),
                o.default.createElement("button", {
                    type: "button", "data-ias-limba-salveaza": l.id,
                    onClick: () => { iasSchimba(lista.map(x => x.id === l.id ? { ...x, tarif: Number(ed.tarif) || 0, tarifPeste: Number(ed.tarifPeste) || Number(ed.tarif) || 0 } : x)), puneEd(null) },
                    className: "flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm"
                }, "Salvează"))) : o.default.createElement("button", {
            key: l.id, type: "button", "data-ias-limba-rand": l.id,
            onClick: () => puneEd({ id: l.id, tarif: String(l.tarif), tarifPeste: String(l.tarifPeste) }),
            className: "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-left"
        }, o.default.createElement("span", { className: "font-mono-time text-xs text-sky-700", style: { width: 24 } }, iasCodLimba(l.id)),
            o.default.createElement("span", { className: "flex-1 text-sm text-sky-700" }, l.nume),
            o.default.createElement("span", { className: "font-mono-time text-xs text-sky-700" }, bani(l.tarif), " · ", bani(l.tarifPeste)),
            o.default.createElement(ka, { size: 14, className: "text-sky-700", style: { opacity: .5 } })))),
        nou ? o.default.createElement(IasLimbaNoua, {
            setari: iasS,
            onRenunta: () => puneNou(!1),
            onAdauga: l => { iasSchimba(lista.filter(x => x.id !== l.id).concat([l])), puneNou(!1) }
        }) : o.default.createElement("button", {
            type: "button", "data-ias-limba-noua": "",
            onClick: () => puneNou(!0),
            className: "w-full mt-1.5 py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm"
        }, "+ Alt\u0103 limb\u0103"),
        o.default.createElement("p", { className: "text-xs text-slate-400 mt-2 px-1" }, "Tariful în program și cel peste program, pe ședință. Limba o alegi pe fișa elevului; ședințele lui pornesc în ea, iar mesajele către el se scriu în ea."))
}

/* Ce spune aplicația când schimbi limba unui elev. */
function iasMesajLimbaNoua(setari, L) {
    if (!L) return "Ședințele și mesajele lui sunt de acum în română.";
    let n = iasNumeLimba(setari, L).toLowerCase();
    return IAS_LIMBI[L] ? `Ședințele și mesajele lui sunt de acum în ${n}.` : `Ședințele lui sunt de acum în ${n}; mesajele pleacă în engleză.`
}

/* Mesajul de bun venit în celelalte limbi, în Setări → Numele tău și școala.
   Câte unul pentru fiecare limbă a ta care are mesajele scrise; limbile din
   afara catalogului folosesc textul englez. Engleza se ține, ca înainte, în
   textBunVenitEn. */
function IasBunVenitLimbi({ setari: J, onSchimba: e }) {
    let lista = iasLimbi(J).filter(x => IAS_LIMBI[x.id]),
        [ales, puneAles] = (0, o.useState)(lista[0] ? lista[0].id : "");
    if (!lista.length) return null;
    let id = lista.some(x => x.id === ales) ? ales : lista[0].id,
        T = IAS_LIMBI[id],
        scrie = v => id === "en" ? e({ textBunVenitEn: v }) : e({ textBunVenitLimbi: { ...(J.textBunVenitLimbi || {}), [id]: v } });
    return o.default.createElement("div", { className: "mt-4", "data-ias-bun-venit-limbi": "" },
        o.default.createElement("div", { className: "text-xs font-medium text-slate-500 mb-1.5" }, "Mesajul de bun venit în alte limbi"),
        lista.length > 1 ? o.default.createElement("div", { className: "flex flex-wrap gap-1.5 mb-2" }, lista.map(x => o.default.createElement("button", {
            key: x.id, type: "button", "data-ias-bun-venit-limba": x.id, "aria-pressed": x.id === id,
            onClick: () => puneAles(x.id),
            className: "text-xs px-2.5 py-1 rounded-full border " + (x.id === id ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-600")
        }, x.nume))) : null,
        o.default.createElement("textarea", {
            rows: 5,
            className: ie,
            "data-ias-bun-venit-en": id === "en" ? "" : void 0,
            "data-ias-bun-venit-text": id,
            value: iasBunVenitLimba(J, id),
            onChange: H => scrie(H.target.value)
        }),
        o.default.createElement("p", { className: "text-xs text-slate-400 mt-1 mb-2" }, `Pentru elevii cu \u201ELimba \u0219edin\u021Belor: ${IAS_LIMBI[id].nume}\u201D. Acelea\u0219i complet\u0103ri: `, o.default.createElement("span", { className: "font-mono-time" }, "{salut}"), ` devine \u201E${T.salut}\u201D, iar `, o.default.createElement("span", { className: "font-mono-time" }, "{disponibil}"), ` devine \u201E${T.disponibil}\u201D.`),
        o.default.createElement("button", {
            type: "button",
            onClick: () => scrie(T.bunVenit),
            className: "w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm"
        }, `Revino la textul implicit \xEEn ${IAS_LIMBI[id].nume.toLowerCase()}`))
}

/* Numele de dinainte, pentru engleză. */
var IAS_ZILE_EN = IAS_LIMBI.en.zile, IAS_LUNI_EN = IAS_LIMBI.en.luni, iasBunVenitEn = IAS_LIMBI.en.bunVenit;
function iasFoEn(n) { return iasFoLimba("en", n) }
function iasBunVenitEngleza(n, e) { return iasBunVenitStrain("en", n, e) }
function iasMesajEngleza(n, e, t, a, r) { return iasMesajStrain("en", n, e, t, a, r) }
function iasListaEngleza(e, N, a, W) { return iasListaStrain("en", e, N, a, W) }

function ik(n, e) {
    if (iasLimbaDe(n)) return iasBunVenitStrain(iasLimbaDe(n), n, e);
    let {
        salut: t,
        cand: a
    } = _0(n);
    return (e && e.textBunVenit || p0).replace(/\{salut\}/g, t).replace(/\{prenume\}/g, Ff(n)).replace(/\{eu\}/g, e && e.numeleTau || "").replace(/\{scoala\}/g, e && e.numeScoala || "\u0219coala noastr\u0103").replace(/\{disponibil\}/g, a.replace(/^când (ești )?/, "") || "disponibil")
}

/* Ce s-a schimbat la o ședință, spus fără echivoc. În WhatsApp, _asta_ iese
   înclinat și *asta* îngroșat: ce era rămâne înclinat, ce e acum iese gros, ca
   ochiul să prindă întâi noul.

   Regula care a născut funcția: când se schimbă și ora, și locul, trebuie să
   scrie limpede că se schimbă AMÂNDOUĂ. Altfel omul citește ora nouă, se
   liniștește și merge la locul știut. */
function iasCeSaSchimbat(veche, noua) {
    var v = veche || {}, n = noua || {};
    /* Ziua și ora se socotesc separat. Înainte erau una singură, „data sau
       ora", iar mesajul spunea „se schimbă ORA" și când mutai ședința în altă
       zi, la aceeași oră — elevul citea ora știută și venea în ziua veche. */
    var ziua = (v.date || "") !== (n.date || ""),
        ora = Number(v.startMin) !== Number(n.startMin),
        locul = (v.location || "").trim() !== (n.location || "").trim();
    return { ziua: ziua, ora: ora, locul: locul }
}

function yw(n, e, t, a, r) {
    if (iasLimbaDe(t)) return iasMesajStrain(iasLimbaDe(t), n, e, t, a, r);
    let i = Ff(e),
        {
            salut: s,
            cand: l
        } = _0(e),
        u = `${Se(t.startMin)}\u2013${Se(t.startMin+(Number(t.duration)||si))}`,
        d = $w(xo(r, t.location), t.location),
        f = t.location ? `\nNe vedem la: *${t.location}*${d?`\n${d}`:""}` : "",
        p = " Te rog s\u0103 \xEEmi confirmi \xEEn urm\u0103toarea or\u0103, ca s\u0103 pot elibera locul dac\u0103 nu po\u021Bi ajunge.";

    if (n === "rescheduled" || n === "location") {
        let ce = iasCeSaSchimbat(a, t),
            ziVeche = a ? fo(a.date) : "",
            ziNoua = fo(t.date),
            locVechi = (a && a.location || "").trim(),
            locNou = (t.location || "").trim(),
            harta = d ? `\n${d}` : "",
            ceSeMuta = [ce.ziua && "ZIUA", ce.ora && "ORA", ce.locul && "LOCUL"].filter(Boolean),
            schimbate = [],
            neschimbate = [];

        /* Capul spune din prima ce s-a mutat, cu numele lui: ZIUA, ORA, LOCUL.
           Când se mută două sau trei deodată, atenția stă pe rândul ei și
           îngroșată, fiindcă tocmai a doua schimbare scăpa elevilor. */
        let cap = ceSeMuta.length === 3
            ? `${s}, ${i}! Ți-am schimbat ședința de conducere.\n*ATENȚIE: se schimbă ZIUA, ORA și LOCUL.*`
            : ceSeMuta.length === 2
                ? `${s}, ${i}! Ți-am schimbat ședința de conducere.\n*ATENȚIE: se schimbă și ${ceSeMuta[0]}, și ${ceSeMuta[1]}.*`
                : ce.locul
                    ? `${s}, ${i}! Ședința ta rămâne în aceeași zi, la aceeași oră.\n*Se schimbă doar LOCUL de întâlnire.*`
                    : ce.ziua
                        ? `${s}, ${i}! Ți-am mutat ședința de conducere.\n*Se schimbă ZIUA.* Ora rămâne aceeași.`
                        : ce.ora
                            ? `${s}, ${i}! Ți-am mutat ședința de conducere.\n*Se schimbă ORA.* Ziua rămâne aceeași.`
                            : `${s}, ${i}! Îți scriu despre ședința de conducere.`;

        /* Ce s-a schimbat vine întâi, fiecare pe bucata lui, cu un rând gol
           între ele; ce a rămas la fel vine la urmă, pe scurt. */
        if (ce.ziua) schimbate.push(
            `\n\nZiua:\n${ziVeche ? `_${ziVeche}_\n→ ` : ""}*${ziNoua}*`);
        if (ce.ora) schimbate.push(
            `\n\nOra:\n${a ? `_${Se(a.startMin)}_\n→ ` : ""}*${u}*`);
        if (ce.locul) schimbate.push(
            `\n\nLocul:\n${locVechi ? `_${locVechi}_\n→ ` : ""}*${locNou || "(nestabilit)"}*${harta}`);

        if (!ce.ziua && !ce.ora) neschimbate.push(`\n\nZiua și ora rămân: ${ziNoua}, ora ${u}`);
        else if (!ce.ziua) neschimbate.push(`\n\nZiua rămâne: ${ziNoua}`);
        else if (!ce.ora) neschimbate.push(`\n\nOra rămâne: ${u}`);
        if (!ce.locul && locNou) neschimbate.push(
            `\n\nLocul rămâne același: ${locNou}${harta}`);

        return cap + schimbate.join("") + neschimbate.join("") + `\n\n${p.trim()} Mulțumesc!`
    }

    return n === "created" ? `${s}, ${i}! \u021Ai-am programat \u0219edin\u021Ba de conducere ${fo(t.date)}, ora ${u}.${f}\n${p.trim()} Mul\u021Bumesc!` : n === "cancelled" ? `${s}, ${i}! Am anulat \u0219edin\u021Ba de conducere din ${fo(t.date)}, ora ${Se(t.startMin)}, la cererea ta. Scrie-mi ${l} ca s\u0103 g\u0103sim alt\u0103 or\u0103. Mul\u021Bumesc!` : ""
}
function sk(n, e, t) {
    let a = new Date,
        r = ft(a),
        i = a.getHours() * 60 + a.getMinutes(),
        s = Ue(t || r);
    for (let l = 0; l < 60; l++) {
        let u = ft(s);
        if (u >= r && e.workDays.includes(s.getDay())) {
            for (let d of Tf(e, u))
                if (!(u === r && d <= i) && !w0(n, u, d, null, e)) return {
                    date: u,
                    startMin: d
                }
        }
        s = pn(s, 1)
    }
    return {
        date: t || r,
        startMin: e.startMin
    }
}

/* Ritmul minim dintre ședințe, aceeași regulă pe care o ține și planul: dacă
   elevul a cerut o pauză de câteva zile, nu i se propune o ședință prea aproape
   de una pe care o are deja. Fără asta, sugestiile din calendar propuneau
   oameni pe care planul nu i-ar fi programat niciodată în ziua aceea. */
function iasRitmOk(sesiuni, elev, zi) {
    let pauza = Number(elev && elev.minGapDays) || 0;
    if (pauza < 2) return !0;
    let tinta = Ue(zi).getTime();
    return !(sesiuni || []).some(x => x.studentId === elev.id
        && x.status !== "cancelled"
        && Math.abs(Math.round((tinta - Ue(x.date).getTime()) / 864e5)) < pauza)
}

function ok(n, e) {
    return n.students.map(t => ({
        s: t,
        free: GA(t, n.sessions, e, n.settings)
    })).filter(({
        s: t,
        free: a
        // elevul plecat o perioadă nu se propune în ziua în care lipsește
    }) => a > 0 && Pf(t) && !iasLipseste(t, e) && Qw(t, e) && iasRitmOk(n.sessions, t, e) && !Nw(n.sessions, t.id, e, null) && Pw(n.sessions, t.id, e, null) < (Number(t.weeklyLimit) || n.settings.defaultWeeklyLimit)).sort((t, a) => {
        let r = t.s.examDate ? Sf(e, t.s.examDate) : 9999,
            i = a.s.examDate ? Sf(e, a.s.examDate) : 9999,
            s = Mf(t.s, e) ? 0 : 1,
            l = Mf(a.s, e) ? 0 : 1;
        /* Întâi cei grăbiți, apoi cei cu examenul mai aproape — astea nu se
           ating. La urmă, dintre cei rămași, îi propunem pe cei cărora le-au
           mai rămas puține ore: îi închei și rămâi cu mintea liberă pentru cei
           noi. Înainte era pe dos — veneau primii cei cu cele mai multe ore. */
        return s !== l ? s - l : r !== i ? r - i : t.free - a.free
    }).map(t => t.s)
}

/* Golurile zilei: din programul de lucru se scad ședințele, intervalele
   barate (cu pauzele) și examenele practice. La examen ești cu elevul, deci
   acolo nu e gol și nu se propune nimeni. Aceleași goluri pentru listă și axă. */
function iasGoluriZi(setari, data, sesiuni, blocuri, examene) {
    var pz = iasProgramZi(setari, data),
        ocup = (sesiuni || []).map(function (Y) { return [Y.startMin, Y.startMin + or(Y, setari)] })
            .concat((blocuri || []).map(function (N) { return [N.start, N.end] }))
            .concat((examene || []).map(function (Z) { return [Z.start, Z.end] }))
            .filter(function (q) { return q[1] > q[0] })
            .sort(function (q, w) { return q[0] - w[0] }),
        cur = pz.startMin, out = [];
    ocup.forEach(function (q) {
        q[0] > cur && out.push([cur, Math.min(q[0], pz.endMin)]);
        cur = Math.max(cur, q[1])
    });
    cur < pz.endMin && out.push([cur, pz.endMin]);
    return out.filter(function (q) { return q[1] > q[0] })
}

/* Sugestiile „Umple golul” ale unei zile. Fiecare elev propus apare o singură
   dată, la cea mai devreme oră la care poate face o ședință întreagă într-un
   gol: cel care poate oricând, de la începutul golului; cel care poate de la
   15:00, de la 15:00. La o oră stau cel mult doi; următorul trece la
   intervalul de după (cât o ședință mai târziu), dacă poate atunci, așa că un
   gol lung primește sugestii pe mai multe intervale, nu doar la început.
   Orele sunt pe grila zilei, ca în listă; cele trecute nu se propun.
   Întoarce { ora: [elevi] }. */
function iasSugestiiZi(setari, data, candidati, goluri, durata, pas) {
    var pz = iasProgramZi(setari, data), timpi = [], rand = {};
    (goluri || []).forEach(function (g) {
        for (var t = pz.startMin + Math.ceil((g[0] - pz.startMin) / pas) * pas; t + durata <= g[1]; t += pas)
            if (!iasOraTrecuta(data, t)) timpi.push(t)
    });
    if (!timpi.length) return rand;
    (candidati || []).forEach(function (Y) {
        var poate = timpi.filter(function (t) { return !C0(Y, data, t, durata) && iasPoateAtunci(Y, data, t, durata) }),
            t = poate[0];
        while (t != null) {
            if ((rand[t] || []).length < 2) { (rand[t] = rand[t] || []).push(Y); return }
            var urm = t + durata;
            t = poate.find(function (x) { return x >= urm })
        }
    });
    return rand
}
var mu = Array.from({
    length: 48
}, (n, e) => e * 30);

function lk(n, e, t) {
    let a = [];
    return n.forEach(r => {
        let i = r.reminders || [];
        if (!i.length) return;
        let s = e.filter(l => l.studentId === r.id && l.status !== "cancelled").sort((l, u) => (l.date + Se(l.startMin)).localeCompare(u.date + Se(u.startMin)));
        i.forEach(l => {
            let u = s[(Number(l.atSession) || 0) - 1];
            !u || u.status === "completed" || u.date > t || a.push({
                student: r,
                reminder: l,
                session: u
            })
        })
    }), a.sort((r, i) => r.session.date.localeCompare(i.session.date))
}
var Zw = {
    "12-24": {
        nume: "12 cu 24",
        ciclu: 36,
        blocuri: [
            [0, 12]
        ]
    },
    "12-36": {
        nume: "12 cu 36",
        ciclu: 48,
        blocuri: [
            [0, 12]
        ]
    },
    "12-24-12-48": {
        nume: "12 zi / 24 liber / 12 noapte / 48 liber",
        ciclu: 96,
        blocuri: [
            [0, 12],
            [36, 48]
        ]
    },
    "24-24": {
        nume: "24 cu 24",
        ciclu: 48,
        blocuri: [
            [0, 24]
        ]
    },
    "24-48": {
        nume: "24 cu 48",
        ciclu: 72,
        blocuri: [
            [0, 24]
        ]
    },
    "24-72": {
        nume: "24 cu 72",
        ciclu: 96,
        blocuri: [
            [0, 24]
        ]
    },
    alt: {
        nume: "Alt tipar (\xEEl scriu eu)"
    }
};

function L0(n) {
    if (!n || !n.tura || !n.turaData) return null;
    let e, t;
    if (n.tura === "alt") {
        let r = Number(n.turaLucru) || 0,
            i = Number(n.turaLiber) || 0;
        if (r <= 0 || r + i <= 0) return null;
        e = (r + i) * 60, t = [
            [0, r * 60]
        ]
    } else {
        let r = Zw[n.tura];
        if (!r || !r.ciclu) return null;
        e = r.ciclu * 60, t = r.blocuri.map(([i, s]) => [i * 60, s * 60])
    }
    let a = (Number(n.turaOdihna) || 0) * 60;
    return {
        ciclu: e,
        blocuri: t.map(([r, i]) => [r, i + a]),
        ancora: Ue(n.turaData).getTime() + (Number(n.turaOra) || 0) * 6e4
    }
}

function C0(n, e, t, a) {
    let r = L0(n);
    if (!r || !e) return null;
    let i = Ue(e).getTime() + t * 6e4,
        s = i + (a || si) * 6e4,
        l = (i - r.ancora) / 6e4,
        u = (s - r.ancora) / 6e4,
        d = Math.floor(l / r.ciclu) - 1,
        f = Math.floor(u / r.ciclu) + 1;
    for (let p = d; p <= f; p++)
        for (let [c, m] of r.blocuri) {
            let g = c + p * r.ciclu,
                v = m + p * r.ciclu;
            if (l < v && g < u) return {
                de: new Date(r.ancora + g * 6e4),
                pana: new Date(r.ancora + v * 6e4)
            }
        }
    return null
}

function Jw(n, e = 3, t) {
    let a = L0(n);
    if (!a) return [];
    let r = Ue(t || Be()).getTime(),
        i = [],
        s = Math.floor((r - a.ancora) / 6e4 / a.ciclu) - 1;
    for (let l = 0; l < 12 && i.length < e; l++, s++) a.blocuri.forEach(([u, d]) => {
        let f = new Date(a.ancora + (u + s * a.ciclu) * 6e4),
            p = new Date(a.ancora + (d + s * a.ciclu) * 6e4);
        p.getTime() >= r && i.length < e && i.push({
            de: f,
            pana: p
        })
    });
    return i.sort((l, u) => l.de - u.de).slice(0, e)
}
var mf = n => `${Da(n.getHours())}:${Da(n.getMinutes())}`,
    d0 = n => `${n.getDate()} ${yo[n.getMonth()].slice(0,3)}`;

function E0(n) {
    return n ? n.de.toDateString() === n.pana.toDateString() ? `${d0(n.de)}, ${mf(n.de)}\u2013${mf(n.pana)}` : `${d0(n.de)} ${mf(n.de)} \u2013 ${d0(n.pana)} ${mf(n.pana)}` : ""
}

function Qw(n, e) {
    if (!n || !e) return !0;
    /* Ziua cu regulă anume nu mai ține cont de zilele bifate sau de zilele
       pare/impare: elevul a spus exact ce face atunci. */
    let iasA = iasZiuaAnume(n, e);
    if (iasA) return iasA.fel !== "nu";
    let t = Ue(e),
        a = n.availDays;
    return !(Array.isArray(a) && a.length && !a.includes(t.getDay()) || n.availParity === "even" && t.getDate() % 2 !== 0 || n.availParity === "odd" && t.getDate() % 2 !== 1)
}

/* ============ CÂND POATE ELEVUL, PE FIECARE ZI ============
   Elevii nu scriu „disponibil 14:00–20:00". Scriu cum trăiesc:

     „luni până la 13:30, miercuri de la 16:30, weekend oricând"
     „pot după liceu, după 14"
     „în fiecare zi între 13 și 15, sâmbătă după 13"

   De aceea fiecare zi are felul ei, nu un singur interval pentru toată
   săptămâna: oricând, până la o oră, de la o oră, între două ore, sau deloc.
   Ziua pe care n-ai atins-o merge după regula generală de sus, așa că pentru
   cei simpli nu ai de completat nimic în plus. */
var IAS_FEL_DISP = ["ca", "oricand", "dupa", "pana", "intre", "afara", "nu"];

function iasZiuaLui(elev, zi) {
    var t = ((elev || {}).dispZile || {})[zi];
    return t && IAS_FEL_DISP.indexOf(t.fel) >= 0 ? t : null
}

/* Zilele cu o regulă a lor: „vineri 20 noiembrie pot doar de la 16".
   Trec înaintea regulii zilei din săptămână și a zilelor bifate. Cheia e
   data, așa că ziua trecută nu mai încurcă nimic. */
function iasZiuaAnume(elev, dataISO) {
    var t = ((elev || {}).dispDate || {})[dataISO];
    return t && t.fel && t.fel !== "ca" && IAS_FEL_DISP.indexOf(t.fel) >= 0 ? t : null
}

/* O regulă spusă în cuvinte: „de la 16:00", „indisponibil". */
function iasFelText(r) {
    if (!r || !r.fel) return "";
    switch (r.fel) {
        case "nu": return "indisponibil";
        case "oricand": return "oric\xE2nd";
        case "dupa": return "de la " + Se(Number(r.lo));
        case "pana": return "p\xE2n\u0103 la " + Se(Number(r.hi));
        case "intre": return "\xEEntre " + Se(Number(r.lo)) + " \u0219i " + Se(Number(r.hi));
        case "afara": return "oric\xE2nd, mai pu\u021Bin " + Se(Number(r.lo)) + "\u2013" + Se(Number(r.hi))
    }
    return ""
}

/* „Vin 20 noi" — o zi anume, scurt. */
function iasZiScurt(dataISO) {
    var d = Ue(dataISO);
    return xu[d.getDay()] + " " + d.getDate() + " " + yo[d.getMonth()].slice(0, 3)
}

/* Ce regulă are elevul într-o zi anume, cum o vede planul: întâi data, apoi
   ziua din săptămână, apoi regula generală veche. Pentru calendarul de pe fișă. */
function iasRegulaZilei(elev, dataISO) {
    var e = elev || {}, z = Ue(dataISO).getDay(), a = iasZiuaAnume(e, dataISO);
    if (a) return { fel: a.fel, lo: a.lo, hi: a.hi, anume: !0 };
    if (Array.isArray(e.availDays) && e.availDays.length && e.availDays.indexOf(z) < 0) return { fel: "nu" };
    var pe = iasZiuaLui(e, z);
    if (pe && pe.fel !== "ca") return { fel: pe.fel, lo: pe.lo, hi: pe.hi };
    var f = e.availFrom, t = e.availTo, af = f !== "" && f != null, at = t !== "" && t != null;
    if (af && at) return { fel: "intre", lo: Number(f), hi: Number(t) };
    if (af) return { fel: "dupa", lo: Number(f) };
    if (at) return { fel: "pana", hi: Number(t) };
    return { fel: null }
}

/* Ce fereastră are elevul într-o zi anume. Întoarce:
     { fel: "nespus" }            — n-a zis nimic, deci nu-l îngrădim
     { fel: "nu" }                — nu poate în ziua aceea
     { fel: "ok", lo, hi }        — poate începe între lo și hi                */
/* Ora care a trecut deja azi. Sugestiile de umplere n-au ce căuta acolo: nu mai
   poți programa pe cineva la zece dimineața când e trei după-amiaza. Ziua
   rămâne deschisă, ca să poți trece o ședință făcută mai devreme — doar
   propunerile se opresc. */
function iasOraTrecuta(dataISO, ora) {
    if (dataISO !== Be()) return !1;
    var acum = new Date();
    return Number(ora) < acum.getHours() * 60 + acum.getMinutes()
}

function iasFereastraZi(elev, dataISO, durata) {
    var d = durata || si,
        zi = Ue(dataISO).getDay(),
        zile = (elev || {}).availDays,
        anume = iasZiuaAnume(elev, dataISO);
    if (!anume && Array.isArray(zile) && zile.length && zile.indexOf(zi) < 0) return { fel: "nu" };

    var pe = anume || iasZiuaLui(elev, zi),
        lo = null, hi = null;
    if (pe && pe.fel === "nu") return { fel: "nu" };
    if (pe && pe.fel === "oricand") return { fel: "nespus" };
    if (pe && pe.fel === "dupa") lo = Number(pe.lo);
    else if (pe && pe.fel === "pana") hi = Number(pe.hi);
    else if (pe && pe.fel === "intre") lo = Number(pe.lo), hi = Number(pe.hi);
    else if (pe && pe.fel === "afara") {
        /* Poate toată ziua, afară de o felie din mijloc — are cursuri de la 14
           la 18, de pildă. Marginile zilei rămân cele obișnuite; doar felia e
           scoasă, iar ea se verifică la ora propriu-zisă. */
        var gf2 = (elev || {}).availFrom, gt2 = (elev || {}).availTo;
        if (gf2 !== "" && gf2 != null) lo = Number(gf2);
        if (gt2 !== "" && gt2 != null) hi = Number(gt2);
        var iasF = { lo: Number(pe.lo), hi: Number(pe.hi) };
        if (lo == null && hi == null) return { fel: "nespus", fara: iasF };
        var s2 = lo == null ? 0 : lo, g2 = (hi == null ? 1440 : hi) - d;
        return g2 < s2 ? { fel: "nu" } : { fel: "ok", lo: s2, hi: g2, fara: iasF }
    } else {
        // ziua merge după regula generală
        var gf = (elev || {}).availFrom, gt = (elev || {}).availTo;
        if (gf !== "" && gf != null) lo = Number(gf);
        if (gt !== "" && gt != null) hi = Number(gt)
    }
    if (lo == null && hi == null) return { fel: "nespus" };
    var start = lo == null ? 0 : lo,
        gata = (hi == null ? 1440 : hi) - d;
    if (gata < start) return { fel: "nu" };
    return { fel: "ok", lo: start, hi: gata }
}

/* Poate elevul la ora asta, în ziua asta? */
function iasPoateAtunci(elev, dataISO, ora, durata) {
    var f = iasFereastraZi(elev, dataISO, durata);
    if (f.fel === "nu") return !1;
    /* Felia în care nu poate: ședința n-are voie s-o atingă nici cu un capăt. */
    if (f.fara && ora < f.fara.hi && ora + (durata || si) > f.fara.lo) return !1;
    if (f.fel === "nespus") return !0;
    return ora >= f.lo && ora <= f.hi
}

/* ================= Programul spus chiar de elev =================
   Îndrumătorul trimite din fișă un link spre disponibilitate.html. Elevul alege
   pentru fiecare zi cum poate, iar pagina îi deschide WhatsApp cu un mesaj gata
   scris și cu un link înapoi spre aplicație (#disp=…). Totul călătorește în
   linkuri, între ei doi: fără server, fără cont. Felurile zilelor sunt exact
   cele din IAS_FEL_DISP, așa că răspunsul intră direct pe fișă. */
var IAS_PAGINA_PROGRAM = "disponibilitate.html";

function iasInB64(o) {
    var bin = encodeURIComponent(JSON.stringify(o)).replace(/%([0-9A-F]{2})/g, function (m, h) {
        return String.fromCharCode(parseInt(h, 16))
    });
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function iasDinB64(t) {
    t = String(t).replace(/-/g, "+").replace(/_/g, "/");
    while (t.length % 4) t += "=";
    var bin = atob(t), pc = "";
    for (var i = 0; i < bin.length; i++) pc += "%" + bin.charCodeAt(i).toString(16).padStart(2, "0");
    return JSON.parse(decodeURIComponent(pc))
}

/* Orele de lucru pe fiecare zi a săptămânii (duminica = 0), după Programul de
   lucru din Setări. Ziua în care nu lucrezi e 0 — elevul n-o mai completează. */
function iasProgramSaptamana(setari) {
    var s = setari || {},
        lucru = Array.isArray(s.workDays) && s.workDays.length ? s.workDays : [0, 1, 2, 3, 4, 5, 6];
    return [0, 1, 2, 3, 4, 5, 6].map(function (z) {
        if (lucru.indexOf(z) < 0) return 0;
        var pe = (s.programZile || {})[z] || {},
            a = pe.startMin === "" || pe.startMin == null ? NaN : Number(pe.startMin),
            b = pe.endMin === "" || pe.endMin == null ? NaN : Number(pe.endMin),
            lo = isNaN(a) ? Number(s.startMin) : a,
            hi = isNaN(b) ? Number(s.endMin) : b;
        if (isNaN(lo)) lo = 480;
        if (isNaN(hi)) hi = 1200;
        lo = Math.round(lo), hi = Math.round(hi);
        return hi > lo ? [lo, hi] : 0
    })
}

/* Linkul pentru elev. Duce doar codul fișei, durata unei ședințe, numele tău,
   numărul tău de WhatsApp și limba în care se deschide pagina — altceva
   despre elev nu. Orele tale de lucru nu mai pleacă: elevul spune când poate
   el, în toate zilele și la orice oră, iar planul îl pune doar în programul
   tău (cel al săptămânii respective). */
function iasLinkCerereProgram(elev, setari) {
    var s = setari || {},
        o = {
            v: 1,
            e: String((elev || {}).id || ""),
            w: qw(String(s.telefonulTau || "")),
            d: Math.round(Number(s.sessionMin) || si),
            n: String(s.numeleTau || "").trim().slice(0, 60),
            s: String(s.numeScoala || "").trim().slice(0, 80),
            /* Limba paginii: a elevului. Una din afara catalogului merge pe
               engleză, ca mesajele lui. */
            l: (function (L) { return !L ? "" : IAS_LIMBI[L] ? L : "en" })(iasLimbaDe(elev))
        };
    ["e", "w", "n", "s", "l"].forEach(function (k) { o[k] || delete o[k] });
    var baza = IAS_PAGINA_PROGRAM;
    try { baza = new URL(IAS_PAGINA_PROGRAM, window.location.href).href } catch (x) {}
    return baza.split("#")[0].split("?")[0] + "#c=" + iasInB64(o)
}

/* Răspunsul elevului, scos din link sau din mesajul lipit întreg. Vine de la
   altcineva, deci se verifică bucată cu bucată; dacă ceva nu se potrivește,
   nu se folosește nimic din el. */
function iasDispCiteste(text) {
    var m = String(text || "").match(/disp=([A-Za-z0-9_-]{6,6000})/);
    if (!m) return null;
    var o;
    try { o = iasDinB64(m[1]) } catch (x) { return null }
    if (!o || typeof o !== "object" || o.v !== 1 || !o.z || typeof o.z !== "object" || Array.isArray(o.z)) return null;
    var ora = function (x) { return Number.isInteger(x) && x >= 0 && x <= 1440 },
        intreg = function (x, a, b) { return Number.isInteger(x) && x >= a && x <= b },
        data = /^\d{4}-\d{2}-\d{2}$/,
        zile = {}, date = {};
    var felDin = function (r) {
        if (!Array.isArray(r)) return null;
        var fel = r[0];
        if (fel === "oricand" || fel === "nu") return { fel: fel };
        if (fel === "dupa" && ora(r[1])) return { fel: fel, lo: r[1] };
        if (fel === "pana" && ora(r[1])) return { fel: fel, hi: r[1] };
        if ((fel === "intre" || fel === "afara") && ora(r[1]) && ora(r[2]) && r[1] < r[2]) return { fel: fel, lo: r[1], hi: r[2] };
        return null
    };
    for (var k of Object.keys(o.z)) {
        if (!/^[0-6]$/.test(k)) return null;
        var rz = felDin(o.z[k]);
        if (!rz) return null;
        zile[Number(k)] = rz
    }
    /* Zilele anume (pagina cu calendar). Paginile mai vechi nu le trimit. */
    if (o.x != null) {
        if (typeof o.x !== "object" || Array.isArray(o.x) || Object.keys(o.x).length > 120) return null;
        for (var dk of Object.keys(o.x)) {
            var rd = data.test(dk) ? felDin(o.x[dk]) : null;
            if (!rd) return null;
            date[dk] = rd
        }
    }
    var orizont = null;
    if (o.h != null) {
        if (!Array.isArray(o.h) || !data.test(o.h[0]) || !data.test(o.h[1]) || o.h[0] > o.h[1]) return null;
        orizont = { din: o.h[0], pana: o.h[1] }
    }
    var tura = null;
    if (o.t != null) {
        var t = o.t;
        if (!Array.isArray(t) || !Zw[t[0]] || !data.test(t[1]) || !ora(t[2]) || !intreg(t[3], 0, 24)) return null;
        tura = { tip: t[0], data: t[1], ora: t[2], odihna: t[3] };
        if (t[0] === "alt") {
            if (!intreg(t[4], 1, 72) || !intreg(t[5], 0, 240)) return null;
            tura.lucru = t[4], tura.liber = t[5]
        }
    }
    var plecat = null;
    if (o.a != null) {
        if (!Array.isArray(o.a) || !data.test(o.a[0]) || !data.test(o.a[1]) || o.a[0] > o.a[1]) return null;
        plecat = { din: o.a[0], pana: o.a[1] }
    }
    if (o.p != null && o.p !== "even" && o.p !== "odd") return null;
    return {
        elev: typeof o.e === "string" && /^[A-Za-z0-9_.-]{1,80}$/.test(o.e) ? o.e : null,
        zile: zile,
        date: date,
        orizont: orizont,
        tura: tura,
        plecat: plecat,
        par: o.p || "all",
        mesaj: typeof o.m === "string" ? o.m.trim().slice(0, 300) : ""
    }
}

/* Toate câmpurile de disponibilitate de pe fișă. Înainte să folosești
   programul elevului, se ține minte ce era în ele, ca să poți reveni. */
var IAS_CHEI_DISP = ["dispZile", "dispDate", "availFrom", "availTo", "availDays", "availParity", "tura", "turaData",
    "turaOra", "turaLucru", "turaLiber", "turaOdihna", "plecatDin", "plecatPana"];

/* Răspunsul, așa cum stă pe fișă: deoparte, fără să schimbe nimic. Ce n-a
   spus elevul (ture, plecare, zile pare) rămâne gol, nu „nu”. */
function iasProgramElevNou(r) {
    return {
        primit: Be(),
        zile: Object.assign({}, r.zile),
        date: Object.assign({}, r.date || {}),
        orizont: r.orizont || null,
        tura: r.tura || null,
        plecat: r.plecat || null,
        par: r.par === "even" || r.par === "odd" ? r.par : null,
        mesaj: r.mesaj || "",
        folosit: null
    }
}

/* Ce se schimbă pe fișă când folosești programul elevului: doar ce a spus el.
   - Zilele în care lucrezi: le-a spus pe toate, deci iau locul regulii
     generale și al zilelor bifate. Ca zilele pe care nu le-a avut de ales
     (cele în care nu lucrezi) să rămână exact cum erau, regula veche se
     scrie mai întâi pe fiecare dintre ele.
   - Tura, perioada în care lipsește și zilele pare/impare se schimbă doar
     dacă a spus ceva despre ele. Ce trecuseși tu rămâne. */
function iasProgramElevCampuri(elev, p) {
    var e = elev || {}, f = {}, zile = {}, bifate = e.availDays,
        gf = e.availFrom, gt = e.availTo,
        af = gf !== "" && gf != null, at = gt !== "" && gt != null;
    for (var z = 0; z <= 6; z++) {
        if (p.zile && p.zile[z]) { zile[z] = Object.assign({}, p.zile[z]); continue }
        if (Array.isArray(bifate) && bifate.length && bifate.indexOf(z) < 0) { zile[z] = { fel: "nu" }; continue }
        var pe = iasZiuaLui(e, z);
        if (pe && pe.fel !== "ca") { zile[z] = Object.assign({}, pe); continue }
        if (af && at) zile[z] = { fel: "intre", lo: Number(gf), hi: Number(gt) };
        else if (af) zile[z] = { fel: "dupa", lo: Number(gf) };
        else if (at) zile[z] = { fel: "pana", hi: Number(gt) }
    }
    f.dispZile = zile, f.availFrom = "", f.availTo = "", f.availDays = [];
    if (p.tura) {
        f.tura = p.tura.tip, f.turaData = p.tura.data, f.turaOra = p.tura.ora,
        f.turaOdihna = p.tura.odihna ? String(p.tura.odihna) : "";
        if (p.tura.tip === "alt") f.turaLucru = String(p.tura.lucru), f.turaLiber = String(p.tura.liber)
    }
    if (p.plecat) f.plecatDin = p.plecat.din, f.plecatPana = p.plecat.pana;
    if (p.par) f.availParity = p.par;
    /* Zilele anume: în zilele la care s-a uitat elevul acum, contează doar
       ce a spus acum; cele de dinainte, din alte zile, rămân. */
    if ((p.date && Object.keys(p.date).length) || p.orizont) {
        var dd = {}, vechi = e.dispDate || {}, azi = Be();
        Object.keys(vechi).forEach(function (k) {
            if (k >= azi && !(p.orizont && k >= p.orizont.din && k <= p.orizont.pana)) dd[k] = Object.assign({}, vechi[k])
        });
        Object.keys(p.date || {}).forEach(function (k) { dd[k] = Object.assign({}, p.date[k]) });
        f.dispDate = dd
    }
    return f
}

/* Folosește programul păstrat pe fișă. Ce era înainte se ține minte. */
function iasFolosesteProgram(elev) {
    var p = elev && elev.programElev;
    if (!p) return elev;
    var inainte = {};
    IAS_CHEI_DISP.forEach(function (k) { elev[k] !== void 0 && (inainte[k] = elev[k]) });
    return { ...elev, ...iasProgramElevCampuri(elev, p), programElevInainte: inainte, programElev: { ...p, folosit: Be() } }
}

/* „Revino la ce era": disponibilitatea de dinainte, întocmai. Programul
   elevului rămâne pe fișă, nefolosit. */
function iasRevinoLaProgram(elev) {
    var b = elev && elev.programElevInainte;
    if (!b) return elev;
    var n = { ...elev };
    IAS_CHEI_DISP.forEach(function (k) { k in b ? n[k] = b[k] : delete n[k] });
    delete n.programElevInainte;
    n.programElev && (n.programElev = { ...n.programElev, folosit: null });
    return n
}

function iasZiLuna(iso) {
    var d = Ue(iso);
    return d.getDate() + " " + yo[d.getMonth()]
}

/* Cum arată o zi pe fișă, în cuvinte. Pentru „înainte → după". */
function iasDispZiText(elev, z) {
    var e = elev || {}, zile = e.availDays;
    if (Array.isArray(zile) && zile.length && zile.indexOf(z) < 0) return "indisponibil";
    var pe = iasZiuaLui(e, z);
    if (pe) switch (pe.fel) {
        case "nu": return "indisponibil";
        case "oricand": return "oric\xE2nd";
        case "dupa": return "de la " + Se(Number(pe.lo));
        case "pana": return "p\xE2n\u0103 la " + Se(Number(pe.hi));
        case "intre": return "\xEEntre " + Se(Number(pe.lo)) + " \u0219i " + Se(Number(pe.hi));
        case "afara": return "oric\xE2nd, mai pu\u021Bin " + Se(Number(pe.lo)) + "\u2013" + Se(Number(pe.hi))
    }
    var f = e.availFrom, t = e.availTo,
        af = f !== "" && f != null, at = t !== "" && t != null;
    if (af && at) return "\xEEntre " + Se(Number(f)) + " \u0219i " + Se(Number(t));
    if (af) return "de la " + Se(Number(f));
    if (at) return "p\xE2n\u0103 la " + Se(Number(t));
    return "oric\xE2nd"
}

function iasDispTuraText(elev) {
    var e = elev || {};
    if (!e.tura) return "f\u0103r\u0103 ture";
    var t = e.tura === "alt"
        ? (Number(e.turaLucru) || 0) + " h lucru, " + (Number(e.turaLiber) || 0) + " h liber"
        : ((Zw[e.tura] || {}).nume || e.tura);
    if (e.turaData) t += ", din " + iasZiLuna(e.turaData) + " la " + Se(e.turaOra == null ? 420 : Number(e.turaOra));
    if (Number(e.turaOdihna)) t += ", " + Number(e.turaOdihna) + " h odihn\u0103";
    return t
}

function iasDispParText(elev) {
    var p = (elev || {}).availParity;
    return p === "even" ? "doar pare" : p === "odd" ? "doar impare" : "toate"
}

function iasDispPlecatText(elev) {
    var e = elev || {};
    return e.plecatPana ? iasZiLuna(e.plecatDin || Be()) + " \u2013 " + iasZiLuna(e.plecatPana) : ""
}

/* Ce a trimis elevul, rând cu rând, pentru căsuța de pe fișă. */
function iasProgramElevRanduri(p) {
    var r = [];
    if (!p) return r;
    po.forEach(function (z) {
        var x = p.zile && p.zile[z];
        if (x) r.push({ cheie: "z" + z, nume: Tw[z], text: iasDispZiText({ dispZile: { [z]: x } }, z) })
    });
    if (p.tura) r.push({ cheie: "tura", nume: "Ture", text: iasDispTuraText({ tura: p.tura.tip, turaData: p.tura.data,
        turaOra: p.tura.ora, turaOdihna: p.tura.odihna, turaLucru: p.tura.lucru, turaLiber: p.tura.liber }) });
    Object.keys(p.date || {}).sort().forEach(function (k) {
        r.push({ cheie: "d" + k, nume: iasZiScurt(k), text: "doar atunci: " + iasFelText(p.date[k]) })
    });
    if (p.plecat) r.push({ cheie: "plecat", nume: "Lipse\u0219te", text: iasDispPlecatText({ plecatDin: p.plecat.din, plecatPana: p.plecat.pana }) });
    if (p.par) r.push({ cheie: "par", nume: "Zilele lunii", text: iasDispParText({ availParity: p.par }) });
    return r
}


function bw(n, e, t, a) {
    let r = a || si,
        i = t && t.availFrom,
        s = t && t.availTo;
    if (i != null && i !== "" && s != null && s !== "" && Number(s) - Number(i) >= r) return {
        lo: Number(i),
        hi: Number(s) - r,
        stated: !0,
        from: Number(i),
        to: Number(s)
    };
    let l = n.filter(d => d.studentId === e && d.status !== "cancelled").map(d => d.startMin).sort((d, f) => d - f);
    if (l.length < 2) return null;
    let u = l.length >= 5 ? 1 : 0;
    return {
        lo: l[u],
        hi: l[l.length - 1 - u],
        count: l.length
    }
}

/* Ora la care e obișnuit fiecare elev. Nu e media orelor lui — media ar minți:
   cine a venit o dată la 9 și de două ori seara, la 18 și 20, n-are treabă cu
   ora 13, deși acolo cade media. Ceea ce contează e unde se îngrămădesc
   ședințele lui.

   Fiecare ședință trecută luminează orele din jurul ei, tot mai slab cu cât te
   depărtezi. Unde se suprapun mai multe lumini, acolo e obiceiul lui: în pilda
   de sus, în jurul orei 19, între cele două de seară — nu la 9, unde a fost o
   singură dată.

   Nu e o regulă de fier: dacă la ora aceea nu se poate, planul așază elevul
   unde încape, ca până acum. E doar o preferință, ca să nimerească din prima
   ora la care omul chiar poate. */
/* ============ DRUMUL TĂU DE DIMINEAȚĂ ȘI DE SEARĂ ============
   Ziua ta începe de acasă și se termină acasă. Dacă primul elev din zi stă la
   celălalt capăt al orașului, faci drumul acela de două ori degeaba — o dată
   dus dimineața, o dată întors seara.

   De aceea, după ce planul s-a umplut, ziua se așază puțin altfel: cel mai
   apropiat de casa ta prinde prima oră, iar următorul ca apropiere prinde
   ultima. Cine stă departe rămâne la mijloc, unde oricum ești deja pe drum.

   Nu se schimbă CINE lucrează în ziua aceea și nici câte ore face cineva — doar
   ordinea, și numai dacă amândoi elevii pot la ora celuilalt. */
function iasPunctElev(elev) {
    return Fn(elev) ? { lat: Number(elev.lat), lng: Number(elev.lng) } : null
}

function iasCatDeAproape(acasa, elev) {
    var p = iasPunctElev(elev);
    if (!p || !Fn(acasa)) return null;
    return QA(acasa, p)
}

/* Pentru drumul tău nu contează unde locuiește elevul, ci unde îl chemi. Cel din
   Corbu sau de lângă Tulcea vine la Năvodari și conduce de acolo spre Constanța
   — deci pentru tine e un elev de aproape, nu unul de la capătul lumii.

   Așadar socoteala se face după locul de întâlnire de pe fișa lui. Domiciliul
   rămâne doar ca sprijin, pentru cine n-are încă un loc fix stabilit. */
/* De unde îți începe ziua și unde o închei. Locul preferat de început e cel pe
   care ți-l alegi tu în Setări — benzinăria de la care pleci de obicei, școala,
   orice. Dacă n-ai ales niciunul, dimineața se socotește tot de acasă.

   Seara e invers: te întorci acasă, deci ultima ședință se măsoară față de casă;
   iar dacă n-ai pus casa, se ia locul de început. */
function iasLoculDeStart(setari) {
    var nume = ((setari || {}).locStart || "").trim();
    if (!nume) return null;
    var loc = ((setari || {}).locations || []).filter(function (x) {
        return (x.name || "").trim() === nume
    })[0];
    return Fn(loc) ? { lat: Number(loc.lat), lng: Number(loc.lng), nume: nume } : null
}

function iasAncoraDimineata(setari) {
    return iasLoculDeStart(setari) || ((setari || {}).acasa) || null
}

function iasAncoraSeara(setari) {
    return ((setari || {}).acasa) || iasLoculDeStart(setari) || null
}

function iasPunctIntalnire(elev, setari) {
    if (!elev) return null;
    var nume = (elev.defaultLocation || "").trim();
    if (nume) {
        var loc = ((setari || {}).locations || []).filter(function (x) {
            return (x.name || "").trim() === nume
        })[0];
        if (Fn(loc)) return { lat: Number(loc.lat), lng: Number(loc.lng), dinLoc: !0, nume: nume }
    }
    var acasaLui = iasPunctElev(elev);
    return acasaLui ? { lat: acasaLui.lat, lng: acasaLui.lng, dinLoc: !1 } : null
}

/* Încotro și cât de departe, spus pe înțelesul omului: „25 km sud de tine" se
   citește dintr-o privire, un cod de hartă nu. */
var IAS_DIRECTII = ["nord", "nord-est", "est", "sud-est", "sud", "sud-vest", "vest", "nord-vest"];

function iasIncotro(acasa, punct) {
    if (!Fn(acasa) || !Fn(punct)) return "";
    var rad = function (x) { return Number(x) * Math.PI / 180 },
        f1 = rad(acasa.lat), f2 = rad(punct.lat), dl = rad(punct.lng - acasa.lng),
        y = Math.sin(dl) * Math.cos(f2),
        x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl),
        grade = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    return IAS_DIRECTII[Math.round(grade / 45) % 8]
}

function iasCatSiIncotro(acasa, punct) {
    if (!Fn(acasa) || !Fn(punct)) return "";
    var d = QA(acasa, punct);
    if (d == null) return "";
    if (d < 1) return "sub 1 km de tine";
    return `${d < 10 ? d.toFixed(1) : Math.round(d)} km ${iasIncotro(acasa, punct)} de tine`
}

function iasOreleLui(sesiuni, idElev) {
    return (sesiuni || []).filter(function (x) {
        return x.studentId === idElev && x.status !== "cancelled" && !x.otherInstructor
    }).map(function (x) { return Number(x.startMin) || 0 })
}

function iasScorObisnuinta(oreVechi, ora) {
    if (!oreVechi || !oreVechi.length) return 0;
    var scor = 0;
    for (var i = 0; i < oreVechi.length; i++) {
        var d = (oreVechi[i] - ora) / 90;   // o oră și jumătate de răbdare
        scor += Math.exp(-d * d)
    }
    return scor
}

function uk({
    students: n,
    existingSessions: e,
    settings: t,
    fromDateISO: a,
    maxWeeksCap: r = 16
}) {
    let i = [...n].sort((C, W) => {
            let X = C.examDate || "9999-12-31",
                R = W.examDate || "9999-12-31";
            return X !== R ? X < R ? -1 : 1 : W.remaining - C.remaining
        }),
        s = Fa(t),
        l = {};
    i.forEach(C => {
        l[C.id] = C.remaining
    });
    let u = {};
    i.forEach(C => {
        u[C.id] = C.weeklyLimit || 2
    });
    let d = {},
        f = {},
        p = {},
        c = {},
        m = {},
        /* Planul trece de trei ori peste săptămâni:
             1. fiecare elev o singură ședință, cu pauza cerută respectată;
             2. a doua și a treia ședință, tot cu pauza respectată;
             3. la urmă, fără pauză — mai bine lipit decât pierdut.
           Steagul ăsta spune la care treaptă suntem. */
        iasDoarPrima = !1,
        g = (C, W) => Math.abs(Math.round((Ue(C).getTime() - Ue(W).getTime()) / 864e5)),
        /* Zilele în care elevul are deja ceva — și din plan, și din calendarul
           tău. Până acum se uita doar la ce pusese planul în runda asta, deci
           o ședință pe care o aveai deja în calendar nu se punea la socoteală. */
        iasZileleLui = (C) => (c[C.id] || []).concat(
            e.filter(R => R.studentId === C.id && R.status !== "cancelled" && !R.otherInstructor)
             .map(R => R.date)),
        /* Pauza cerută: cea de pe fișa elevului, iar dacă n-are, cea pusă în
           Setări pentru toți. */
        /* Pauza scrisă pe fișa elevului e lege: ai hotărât-o anume pentru el.
           Cea cerută din Plan e o dorință pentru generarea asta — se ține la
           prima trecere și se lasă la a doua, ca elevul care poate doar în zile
           una după alta să nu rămână cu o singură ședință pe săptămână. */
        iasPauzaCeruta = (C) => Number(C.minGapDays) || 0,
        iasPauzaDorita = (C) => {
            let X = Number(C.minGapDays) || 0;
            return X >= 2 ? X : (Number(t.ritmPlan) || 0)
        },
        v = (C, W) => {
            let X = iasPauzaCeruta(C);
            return X < 2 ? !0 : !iasZileleLui(C).some(R => g(R, W) < X)
        },
        /* Odihnit = n-a avut ședință nici ieri, nici azi. E o preferință, nu o
           lege: dacă nimeni altcineva nu poate în ziua aceea, tot el o prinde.
           Altfel un elev liber de luni până vineri primea luni, marți, miercuri
           la rând — ceea ce nu-i face bine nimănui. */
        iasOdihnit = (C, W) => !iasZileleLui(C).some(R => g(R, W) < 2);

    function w(C, W, X) {
        d[C] || (d[C] = []), d[C].push([W, W + (X || s)])
    }

    function x(C, W) {
        let X = d[C];
        return X ? !X.some(([R, K]) => bu(W, s, R, K - R)) : !0
    }
    e.filter(C => C.status !== "cancelled").forEach(C => {
        C.otherInstructor || w(C.date, C.startMin, or(C, t)), f[`${C.studentId}_${C.date}`] = !0, (c[C.studentId] = c[C.studentId] || []).push(C.date);
        let W = ft(Gi(Ue(C.date)));
        p[`${C.studentId}_${W}`] = (p[`${C.studentId}_${W}`] || 0) + 1
    });
    let h = Math.max(0, ...i.map(C => C.remaining)),
        y = i.map(C => C.weeklyLimit || 2).filter(C => C > 0),
        _ = y.length ? Math.min(...y) : 1,
        b = Number(t.horizonDays) || 0,
        M = b ? ft(pn(Ue(a), b - 1)) : null,
        S = b ? Math.ceil((b + 7) / 7) : Math.min(r, Math.max(4, Math.ceil(h / Math.max(1, _)) + 2)),
        k = [],
        E = new Date,
        B = ft(E),
        $ = E.getHours() * 60 + E.getMinutes() + 60,
        G = (C, W) => !C.window || W >= C.window.lo && W <= C.window.hi,
        /* Disponibilitatea spusă de elev, pe ziua aceea, are ultimul cuvânt:
           dacă a zis „miercuri de la 16:30", planul nu-l mai pune la 10.
           Fereastra ghicită din istoricul lui rămâne doar un sprijin, folosită
           când omul n-a spus nimic. */
        A = (C, W, X, iasZi) => {
            if (iasZi) {
                var f = iasFereastraZi(C, iasZi, s);
                if (f.fel === "nu") return !1;
                if (f.fara && W < f.fara.hi && W + s > f.fara.lo) return !1;
                if (f.fel === "ok") return W >= f.lo && W <= f.hi
            }
            return C.window && (C.window.stated || X) ? G(C, W) : !0
        };

    function O(C, W, X) {
        let R = pn(Gi(Ue(a)), W * 7);
        for (let K = W; K < X; K++) {
            let ne = ft(R);
            for (let Y = 0; Y < 7; Y++) {
                let J = pn(R, Y),
                    z = ft(J);
                if (z < a || M && z > M) continue;
                let q = J.getDay();
                if (!t.workDays.includes(q)) continue;
                let de = Tf(t, z),
                    ge = v0(t.examStudents, z),
                    ye = b0(t, z);
                for (let Ne of de) {
                    if (z === B && Ne < $ || !x(z, Ne) || y0(ge, Ne, s) || bf(ye, Ne, s)) continue;
                    let ce = null,
                        ze = t.grupare || "fara",
                        re = ze !== "fara" && m[z] || null,
                        se = fe => {
                            var iasBuni = [];
                            for (let he of i) {
                                // elevul plecat o perioadă nu intră în plan cât lipsește
                                if (l[he.id] <= 0 || f[`${he.id}_${z}`] || iasLipseste(he, z) || !Qw(he, z) || !v(he, z)) continue;
                                /* Dreptate înainte de îndesare: la prima trecere
                                   intră doar cine n-are încă nicio ședință în
                                   săptămâna aceea. Abia la a doua se dau și a
                                   doua, a treia. Altfel un elev liber toată
                                   săptămâna lua trei ședințe, iar altul,
                                   potrivit mai greu, rămânea cu niciuna. */
                                if (iasDoarPrima && (p[`${he.id}_${ne}`] || 0) > 0) continue;
                                if (fe) {
                                    if (ze === "harta") {
                                        /* Gruparea pe hartă măsura până la casa
                                           elevului. Dar doi elevi pe care îi
                                           chemi amândoi la Năvodari sunt, pentru
                                           tine, în același loc — chiar dacă unul
                                           stă în Corbu și altul lângă Tulcea.
                                           Deci măsurăm între locurile de
                                           întâlnire, ca peste tot. */
                                        let T = QA(iasPunctIntalnire(re, t), iasPunctIntalnire(he, t));
                                        if (T == null || T > Yw) continue
                                    } else if (ze === "masina") {
                                        // aceeași mașină la rând, ca să n-o schimbi între ședințe
                                        if ((he.masina || "") !== re) continue
                                    } else if ((he.area || "") !== re) continue
                                }
                                if (C0(he, z, Ne, s)) continue;
                                let H = he.includeRezerva ? 0 : Math.min(iasRezerva(t), Number(he.remaining) || 0);
                                if (l[he.id] <= H) {
                                    if (!he.examDate) continue;
                                    let T = Sf(z, he.examDate);
                                    if (T < 1 || T > 5) continue
                                } else if (he.examDate && z >= he.examDate) continue;
                                if (!((p[`${he.id}_${ne}`] || 0) >= u[he.id]) && A(he, Ne, C, z)) iasBuni.push(he)
                            }
                            if (!iasBuni.length) return null;
                            /* Pauza dintre ședințele aceluiași elev nu se mai
                               ia din oficiu: o ceri tu, fie pe fișa elevului,
                               fie din reglajele Planului. Dacă n-ai cerut-o,
                               planul umple ca înainte.

                               Când e cerută, se ține în două trepte: la prima
                               trecere e lege, la a doua se lasă — cine poate
                               doar în zile una după alta le primește oricum.
                               Mai bine o ședință lipită decât una pierdută. */
                            var iasOdihniti = iasBuni.filter(function (he) {
                                var iasP = iasPauzaDorita(he);
                                if (iasP < 2) return !0;   // n-a cerut nimeni pauză pentru el
                                return !iasZileleLui(he).some(function (R) { return g(R, z) < iasP })
                            });
                            if (iasOdihniti.length) iasBuni = iasOdihniti;
                            else {
                                if (C) return null;
                                /* La treapta largă se admite și o ședință
                                   lipită, dar numai pentru cine n-are nimic în
                                   săptămâna aceea: mai bine lipit decât fără.
                                   Cine are deja una așteaptă pauza cerută. */
                                iasBuni = iasBuni.filter(function (he) {
                                    if ((p[`${he.id}_${ne}`] || 0) === 0) return !0;
                                    /* Are deja una săptămâna asta. Îl lipim doar
                                       dacă nu-i mai rămâne nicio zi odihnită în
                                       săptămână — adică poate chiar numai în
                                       zile una după alta. Altfel așteaptă
                                       pauza, că are unde. */
                                    var iasP2 = iasPauzaDorita(he);
                                    if (iasP2 < 2) return !0;
                                    /* Lipitul e pentru cel îngrădit — cine poate
                                       doar în anumite zile. Elevul liber toată
                                       săptămâna are unde să aștepte pauza. */
                                    var iasIngradit = (Array.isArray(he.availDays) && he.availDays.length
                                        && he.availDays.length < 7)
                                        || (he.dispZile && Object.keys(he.dispZile).length > 0)
                                        || (he.dispDate && Object.keys(he.dispDate).length > 0);
                                    if (!iasIngradit) return !1;
                                    for (var iasK = 1; iasK <= 6; iasK++) {
                                        var iasAlta = ft(pn(Ue(z), iasK));
                                        if (ft(Gi(Ue(iasAlta))) !== ne) break;   // a ieșit din săptămână
                                        if (!t.workDays.includes(Ue(iasAlta).getDay())) continue;
                                        if (iasLipseste(he, iasAlta) || !Qw(he, iasAlta)) continue;
                                        if (!iasZileleLui(he).some(function (R) { return g(R, iasAlta) < iasP2 }))
                                            return !1   // mai are o zi bună, n-are rost să-l lipim
                                    }
                                    return !0
                                });
                                if (!iasBuni.length) return null
                            }
                            /* Dintre cei rămași, îl luăm pe cel obișnuit cu ora
                               asta. Dacă niciunul n-are un obicei aici, rămâne
                               primul — adică cel mai grăbit, după ordinea
                               dinainte. */
                            var iasCelMaiBun = null, iasScorMax = 0;
                            for (var iasJ = 0; iasJ < iasBuni.length; iasJ++) {
                                var iasS2 = iasScorObisnuinta(iasOreleLui(e, iasBuni[iasJ].id), Ne);
                                if (iasS2 > iasScorMax + 1e-9) iasScorMax = iasS2, iasCelMaiBun = iasBuni[iasJ]
                            }
                            return iasScorMax >= .35 ? iasCelMaiBun : iasBuni[0]
                        };
                    ce = (re ? se(!0) : null) || se(!1), ce && (k.push({
                        studentId: ce.id,
                        date: z,
                        startMin: Ne,
                        offWindow: !G(ce, Ne)
                    }), w(z, Ne, s), f[`${ce.id}_${z}`] = !0, (c[ce.id] = c[ce.id] || []).push(z), m[z] = ze === "harta" ? ce : ze === "masina" ? ce.masina || "" : ce.area || "", p[`${ce.id}_${ne}`] = (p[`${ce.id}_${ne}`] || 0) + 1, l[ce.id]--)
                }
            }
            R = pn(R, 7)
        }
    }
    if (iasDoarPrima = !0, O(!0, 0, S), iasDoarPrima = !1, O(!0, 0, S), O(!1, 0, S), !M) {
        let C = S;
        for (; i.some(W => l[W.id] > 0) && C < r;) {
            let W = k.length,
                X = Math.min(r, C + 8);
            if (O(!1, C, X), k.length === W) break;
            C = X
        }
    }
    /* Ziua se așază acum după drumul tău: cel mai apropiat de casă dimineața,
       următorul ca apropiere seara. Nu schimbă cine lucrează, doar ordinea. */
    (function iasAsazaDupaCasa() {
        var dim = iasAncoraDimineata(t), sea = iasAncoraSeara(t),
            locPref = (t.locStart || "").trim();
        if ((!Fn(dim) && !Fn(sea)) || !k.length) return;
        var elevul = function (id) { return i.filter(function (x) { return x.id === id })[0] };
        /* Distanța până la o ancoră — dimineața locul de început, seara casa. */
        var departeDe = function (ancora, prop) {
            if (!Fn(ancora)) return 1e9;
            var p3 = iasPunctIntalnire(elevul(prop.studentId), t);
            var d3 = p3 ? QA(ancora, p3) : null;
            return d3 == null ? 1e9 : d3
        };
        /* Elevul chemat chiar la locul tău de început are întâietate dimineața:
           nu mai ai nimic de condus până la el. */
        var chiarAcolo = function (prop) {
            if (!locPref) return !1;
            var el = elevul(prop.studentId);
            return !!el && (el.defaultLocation || "").trim() === locPref
        };
        var departe = function (prop) {
            /* Distanța se ia până la locul unde îl chemi, nu până la casa lui:
               elevul din Corbu vine la Năvodari, deci pentru drumul tău e un
               elev de aproape. */
            return departeDe(sea, prop)
        };
        /* Schimbul e îngăduit doar dacă amândoi pot la ora celuilalt: fereastra
           lor de disponibilitate și ședințele pe care le au deja. */
        var potSchimba = function (a2, b2, zi) {
            var ea = elevul(a2.studentId), eb = elevul(b2.studentId);
            if (!ea || !eb) return !1;
            /* Ținem cont de orele pe care le-ai stabilit tu pentru elev, dar nu
               și de cele ghicite din istoricul lui — altfel schimbul se refuza
               aproape întotdeauna, iar seara rămânea cu cine se nimerea. */
            if (!A(ea, b2.startMin, !1, zi) || !A(eb, a2.startMin, !1, zi)) return !1;
            if (C0(ea, zi, b2.startMin, s) || C0(eb, zi, a2.startMin, s)) return !1;
            return !0
        };
        /* Dacă ai cerut gruparea pe hartă, ziua e deja un lanț de elevi aflați
           unul lângă altul. Mutarea capetelor n-are voie să rupă lanțul: după
           schimb, vecinii trebuie să rămână la fel de aproape ca înainte.
           Altfel cele două ar trage în direcții diferite. */
        var lantulTine = function (ale, i1, i2) {
            if ((t.grupare || "fara") !== "harta") return !0;
            var copie = ale.slice();
            copie[i1] = ale[i2], copie[i2] = ale[i1];
            var pct = function (x) { return iasPunctIntalnire(elevul(x.studentId), t) };
            for (var k2 = 0; k2 < copie.length - 1; k2++) {
                var d2 = QA(pct(copie[k2]), pct(copie[k2 + 1]));
                if (d2 != null && d2 > Yw) return !1
            }
            return !0
        };
        var schimba = function (a2, b2) {
            var t2 = a2.studentId;
            a2.studentId = b2.studentId, b2.studentId = t2;
            var w2 = a2.offWindow;
            a2.offWindow = b2.offWindow, b2.offWindow = w2
        };
        var peZile = {};
        k.forEach(function (x) { (peZile[x.date] = peZile[x.date] || []).push(x) });
        Object.keys(peZile).forEach(function (zi) {
            var ale = peZile[zi].sort(function (x, y) { return x.startMin - y.startMin });
            if (ale.length < 2) return;
            var ocupate = {};
            /* Dimineața se măsoară de la locul tău de început, seara de acasă.
               Iar dacă ai un loc preferat de pornire, elevul pe care-l chemi
               chiar acolo are întâietate: n-ai nimic de condus până la el. */
            /* Întâi dimineața, apoi seara. Poziția de dimineață rămâne fixată
               după ce am ales-o; restul zilei e liber pentru seară — altfel,
               dacă dimineața lua chiar elevul de la ultima oră, seara rămânea
               fără ce alege și ziua se închidea cu cine se nimerea. */
            var fixate = {};
            [0, ale.length - 1].forEach(function (poz) {
                if (fixate[poz]) return;
                var dimineata = poz === 0,
                    masoara = function (x) { return dimineata ? departeDe(dim, x) : departeDe(sea, x) },
                    celMaiBun = poz,
                    minim = masoara(ale[poz]),
                    amGasitLocul = dimineata && chiarAcolo(ale[poz]);
                for (var j = 0; j < ale.length; j++) {
                    if (j === poz || fixate[j]) continue;
                    if (!potSchimba(ale[poz], ale[j], zi) || !lantulTine(ale, poz, j)) continue;
                    var d2 = masoara(ale[j]), laLoc = dimineata && chiarAcolo(ale[j]);
                    if (amGasitLocul && !laLoc) continue;
                    if ((laLoc && !amGasitLocul) || d2 < minim - .3)
                        minim = d2, celMaiBun = j, amGasitLocul = amGasitLocul || laLoc
                }
                if (celMaiBun !== poz) schimba(ale[poz], ale[celMaiBun]);
                fixate[poz] = !0
            })
        })
    })();

    /* Golurile în care oricum n-ar încăpea altă ședință se închid: ședința se
       împinge mai târziu, lipită de cea care urmează. Un sfert de oră rămas
       singur între două ore nu-ți folosește la nimic — mai bine pleci de acasă
       mai târziu.

       Se mută doar în jos pe ceas și numai dacă elevul poate la ora aceea, dacă
       nu cade pe o pauză sau pe un interval barat, și dacă nu se lipește de cea
       dinainte. Ordinea zilei rămâne întocmai. */
    (function iasStrangeZiua() {
        if (!k.length) return;
        var peZi = {};
        k.forEach(function (p2) { (peZi[p2.date] = peZi[p2.date] || []).push(p2) });
        Object.keys(peZi).forEach(function (zi) {
            var vechi2 = e.filter(function (x) {
                    return x.date === zi && x.status !== "cancelled" && !x.otherInstructor
                }).map(function (x) {
                    return { start: Number(x.startMin) || 0, dur: Number(x.duration) || s, fix: !0 }
                }),
                noi = peZi[zi].map(function (p2) {
                    return { start: p2.startMin, dur: s, fix: !1, prop: p2 }
                }),
                toate = vechi2.concat(noi).sort(function (a2, b2) { return a2.start - b2.start }),
                orele = Tf(t, zi),
                blocaje = b0(t, zi);
            if (toate.length < 2) return;
            // de la coadă spre cap, ca ședințele de la urmă să se așeze întâi
            for (var idx = toate.length - 2; idx >= 0; idx--) {
                var cur = toate[idx];
                if (cur.fix) continue;
                var urm = toate[idx + 1],
                    gol = urm.start - (cur.start + cur.dur);
                if (gol <= 0) continue;
                /* Se strânge orice gol, nu doar cele mici. Sâmbăta cu un elev
                   la 8:30 și altul la 14:30 îți mânca ziua degeaba: cel care
                   poate oricând se mută la 13:00, lipit de cel care poate abia
                   de la 14:30. Ziua se adună la un capăt, iar restul îți rămâne
                   întreg, nu ciopârțit.

                   Mersul e de la coadă spre cap, așa că ședințele se așază una
                   după alta, sprijinite de cea care nu se poate mișca. */
                var limita = urm.start - cur.dur,
                    inainte = idx > 0 ? toate[idx - 1].start + toate[idx - 1].dur : -1e9,
                    elev = i.filter(function (x) { return x.id === cur.prop.studentId })[0],
                    ales = null;
                for (var q = 0; q < orele.length; q++) {
                    var ora = orele[q];
                    if (ora <= cur.start || ora > limita || ora < inainte) continue;
                    if (bf(blocaje, ora, cur.dur)) continue;
                    if (elev && !A(elev, ora, !1, zi)) continue;
                    if (elev && C0(elev, zi, ora, cur.dur)) continue;
                    ales = ora   // ținem cea mai târzie oră care încape
                }
                if (ales != null) cur.start = ales, cur.prop.startMin = ales
            }
        })
    })();

    let N = i.filter(C => l[C.id] > 0).map(C => ({
        id: C.id,
        name: C.name,
        left: l[C.id]
    }));
    return {
        proposals: k,
        unfinished: N,
        horizonWeeks: S
    }
}

function dk({
    s: n
}) {
    return o.default.createElement("svg", {
        width: n,
        height: n,
        viewBox: "0 0 24 24",
        style: {
            display: "block"
        }
    }, Array.from({
        length: 12
    }).map((e, t) => {
        let a = (t * 30 - 90) * Math.PI / 180;
        return o.default.createElement("circle", {
            key: t,
            cx: 12 + 8 * Math.cos(a),
            cy: 12 + 8 * Math.sin(a),
            r: "1.7",
            fill: "#ffcc00"
        })
    }))
}

/* Elevul care a strâns destule ședințe poate fi trimis la sală. Legea cere zece
   ședințe efectuate înainte de examenul teoretic, iar de la a zecea încolo e
   rândul tău să-i prinzi o dată.

   Semnul se stinge de îndată ce i-ai pus o dată de teoretic sau dacă l-a luat
   deja — nu-ți mai amintește de ceva ce ai făcut. */
/* Câte ședințe efectuate înseamnă „gata de sală". Zece e legea, dar fiecare
   instructor lucrează altfel: unul îi trimite la sală abia după douăsprezece,
   altul vrea să știe de la opt, ca să aibă timp să prindă o dată. Pragul se
   schimbă din Setări, ca rezerva de examen. */
var IAS_PRAG_TEORETIC = 10;

function iasPragSala(setari) {
    var n = Number(setari && setari.pragTeoretic);
    return isNaN(n) || n < 1 ? IAS_PRAG_TEORETIC : Math.min(40, n)
}

/* Semnul de înștiințare, desenat: șase brațe pornite din același punct, ca o
   floricică. Nu e litera „*" dintr-un rând de text — e un semn de sine
   stătător, care se vede din colțul cardului fără să se piardă între cuvinte. */
function IasSemnNou({ size: iasS = 14, culoare: iasC = "var(--accent)" }) {
    var brate = [0, 30, 60, 90, 120, 150];
    return o.default.createElement("svg", {
        width: iasS, height: iasS, viewBox: "0 0 24 24",
        style: {
            display: "block",
            filter: `drop-shadow(0 0 4px color-mix(in srgb, ${iasC} 60%, transparent))`
        }
    }, brate.map(function (unghi) {
        return o.default.createElement("line", {
            key: unghi,
            x1: 12, y1: 4, x2: 12, y2: 20,
            stroke: iasC, strokeWidth: 3.2, strokeLinecap: "round",
            transform: `rotate(${unghi} 12 12)`
        })
    }))
}

function iasAsteaptaSala(elev, sesiuni, setari) {
    if (!elev || elev.withdrawn) return 0;
    if (elev.perfectionare) return 0;   // n-are sală, are permis
    if (elev.theoryExamResult === "promovat") return 0;
    if ((elev.theoryExamDate || "").trim()) return 0;
    var facute = (sesiuni || []).filter(function (x) {
        return x.studentId === elev.id && x.status === "completed"
    }).length;
    return facute >= iasPragSala(setari) ? facute : 0
}

function Lf({
    student: n,
    size: e = 14,
    sesiuni: iasSes,
    setari: iasSet
}) {
    var iasSala = iasAsteaptaSala(n, iasSes, iasSet),
        iasZi = BA(n),
        iasProv = iasProvizoriu(n);
    if (!iasZi && !iasSala && !iasProv) return null;
    let t = vu(n.birthDate);
    return o.default.createElement("span", {
        className: "shrink-0 inline-flex items-center gap-1"
    },
        iasZi ? o.default.createElement("span", {
            className: "inline-flex items-center",
            title: t != null ? `Azi \xEEmpline\u0219te ${t} ani` : "Azi e ziua lui"
        }, o.default.createElement(au, {
            size: e,
            style: { color: "var(--accent)" }
        })) : null,
        iasSala ? o.default.createElement("span", {
            title: `${iasSala} \u0219edin\u021Be efectuate \u2014 poate fi programat la teoretic`,
            style: { alignSelf: "flex-start", marginTop: -2 }
        }, o.default.createElement(IasSemnNou, { size: e + 2 })) : null,
        iasProv ? o.default.createElement("span", {
            title: "\u0218colarizare provizorie \u2014 noteaz\u0103 ce a pl\u0103tit la \u0219coal\u0103",
            "data-ias-semn-provizoriu": "",
            className: "inline-flex items-center"
        }, o.default.createElement(IasSemnProvizoriu, { size: e })) : null)
}

function Bf({
    student: n,
    county: e,
    h: t = 22,
    digits: a,
    letters: r
}) {
    let i = e || n && n.county || "B";
    return o.default.createElement("span", {
        className: "inline-flex items-stretch overflow-hidden align-middle shrink-0",
        style: {
            height: t,
            borderRadius: t * .17,
            background: "linear-gradient(180deg,#ffffff 0%,#f1f5f9 65%,#e2e8f0 100%)",
            border: `${Math.max(1.2,t*.05)}px solid #0b1220`,
            boxShadow: "0 1px 4px rgba(2,6,23,0.28)"
        }
    }, o.default.createElement("span", {
        className: "flex flex-col items-center justify-center",
        style: {
            width: t * .4,
            background: "linear-gradient(180deg,#0b3fb0 0%,#00308f 100%)"
        }
    }, o.default.createElement(dk, {
        s: t * .32
    }), o.default.createElement("span", {
        style: {
            color: "#fff",
            fontSize: t * .24,
            fontWeight: 800,
            lineHeight: 1
        }
    }, "RO")), o.default.createElement("span", {
        className: "flex items-center justify-center",
        style: {
            padding: `0 ${t*.24}px`,
            gap: t * .2,
            color: "#0b1220",
            fontFamily: "'Arial Narrow','Helvetica Neue Condensed',Impact,system-ui,sans-serif",
            fontWeight: 800,
            fontSize: t * .58,
            lineHeight: 1
        }
    }, o.default.createElement("span", null, i), o.default.createElement("span", null, a || HA(n)), o.default.createElement("span", null, r || OA(n))))
}
var Ui = {
        lung: 420,
        lat: 380,
        inalt: 120,
        textLung: 300,
        textInalt: 90
    },
    ck = () => {
        let n = document.createElement("canvas");
        n.width = Ui.lung, n.height = Ui.inalt;
        let e = n.getContext("2d");
        e.fillStyle = "#f0a01c", e.fillRect(0, 0, n.width, n.height), e.strokeStyle = "#7a4a05", e.lineWidth = 6, e.strokeRect(3, 3, n.width - 6, n.height - 6);
        let t = Ui.textLung,
            a = Ui.textInalt,
            r = (n.width - t) / 2,
            i = (n.height - a) / 2;
        e.fillStyle = "#12161d", e.textAlign = "center", e.textBaseline = "middle";
        let s = a;
        do {
            if (e.font = `900 ${s}px system-ui, -apple-system, sans-serif`, e.measureText("\u0218COAL\u0102").width <= t) break;
            s -= 2
        } while (s > 20);
        e.fillText("\u0218COAL\u0102", n.width / 2, i + a / 2 + a * .04);
        let l = new Xr(n);
        return l.encoding = Aa, l
    },
    fk = () => {
        let n = document.createElement("canvas");
        n.width = 512, n.height = 112;
        let e = n.getContext("2d");
        e.fillStyle = "#ffffff", e.fillRect(0, 0, 512, 112), e.fillStyle = "#00308f", e.fillRect(0, 0, 76, 112), e.fillStyle = "#ffcc00";
        for (let a = 0; a < 12; a++) {
            let r = (a * 30 - 90) * Math.PI / 180;
            e.beginPath(), e.arc(38 + 21 * Math.cos(r), 40 + 21 * Math.sin(r), 3.4, 0, Math.PI * 2), e.fill()
        }
        e.fillStyle = "#ffffff", e.textAlign = "center", e.textBaseline = "middle", e.font = "800 26px system-ui, sans-serif", e.fillText("RO", 38, 92), e.fillStyle = "#0b1220", e.font = "800 74px 'Arial Narrow', system-ui, sans-serif", e.fillText("B 01 IAS", 300, 58), e.strokeStyle = "#0b1220", e.lineWidth = 9, e.strokeRect(4, 4, 504, 104);
        let t = new Xr(n);
        return t.encoding = Aa, t
    },
    pk = () => {
        let n = document.createElement("canvas");
        n.width = 256, n.height = 256;
        let e = n.getContext("2d"),
            t = e.createLinearGradient(0, 256, 0, 0);
        t.addColorStop(0, "rgba(255,255,255,0.95)"), t.addColorStop(.35, "rgba(255,255,255,0.42)"), t.addColorStop(1, "rgba(255,255,255,0)"), e.fillStyle = t, e.beginPath(), e.moveTo(104, 256), e.lineTo(152, 256), e.lineTo(244, 0), e.lineTo(12, 0), e.closePath(), e.fill();
        let a = new Xr(n);
        return a.encoding = Aa, a
    };

function hk(n, e, t) {
    let a = l => {
            let u = document.createElement("canvas");
            return u.width = 128, u.height = 128, l(u.getContext("2d"), u), u
        },
        r = () => a(l => {
            let u = l.createLinearGradient(0, 0, 0, 128);
            u.addColorStop(0, n), u.addColorStop(.46, e), u.addColorStop(.54, e), u.addColorStop(1, t), l.fillStyle = u, l.fillRect(0, 0, 128, 128), l.fillStyle = "rgba(255,255,255,0.18)", l.fillRect(0, 58, 128, 5)
        }),
        i = l => a(u => {
            u.fillStyle = l, u.fillRect(0, 0, 128, 128)
        }),
        s = new jr([r(), r(), i(n), i(t), r(), r()]);
    return s.needsUpdate = !0, s.encoding = Aa, s
}
var mk = () => {
        let n = document.createElement("canvas");
        n.width = 128, n.height = 128;
        let e = n.getContext("2d"),
            t = e.createRadialGradient(64, 64, 4, 64, 64, 62);
        return t.addColorStop(0, "rgba(0,0,0,0.78)"), t.addColorStop(.55, "rgba(0,0,0,0.34)"), t.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = t, e.fillRect(0, 0, 128, 128), new Xr(n)
    },
    gk = .055;

function xk() {
    let n = new on;
    n.moveTo(-1.76, .28), n.lineTo(1.56, .28), n.quadraticCurveTo(1.78, .3, 1.82, .48), n.quadraticCurveTo(1.84, .68, 1.62, .78), n.lineTo(1.26, .82), n.quadraticCurveTo(.98, .84, .72, .92), n.lineTo(-.98, 1.02), n.quadraticCurveTo(-1.42, 1.02, -1.67, .86), n.quadraticCurveTo(-1.82, .72, -1.84, .48), n.quadraticCurveTo(-1.84, .34, -1.76, .28);
    let e = new Pn(n, {
        depth: 1.42,
        bevelEnabled: !0,
        bevelThickness: .07,
        bevelSize: gk,
        bevelSegments: 6,
        curveSegments: 40,
        steps: 1
    });
    return e.translate(0, 0, -.71), e
}

function vk() {
    let n = new on;
    n.moveTo(-1.18, .91), n.lineTo(-.94, 1.13), n.quadraticCurveTo(-.66, 1.55, -.2, 1.62), n.lineTo(.42, 1.58), n.quadraticCurveTo(.76, 1.53, 1.03, 1.18), n.lineTo(1.22, .91), n.lineTo(-1.18, .91);
    let e = new Pn(n, {
        depth: 1.2,
        bevelEnabled: !0,
        bevelThickness: .035,
        bevelSize: .035,
        bevelSegments: 4,
        curveSegments: 32,
        steps: 1
    });
    return e.translate(0, 0, -.6), e
}

function yk() {
    let n = new on;
    return n.moveTo(-1.03, 0), n.lineTo(-.76, .38), n.quadraticCurveTo(-.58, .58, -.28, .62), n.lineTo(.27, .59), n.quadraticCurveTo(.56, .55, .79, .3), n.lineTo(1.02, 0), n.lineTo(-1.03, 0), new Pn(n, {
        depth: .028,
        bevelEnabled: !0,
        bevelThickness: .012,
        bevelSize: .012,
        bevelSegments: 2,
        curveSegments: 14,
        steps: 1
    })
}

function Kw() {
    let a = new on,
        r = -.92 / 2,
        i = -1 / 2;
    a.moveTo(r + .16, i), a.lineTo(r + .92 - .16, i), a.quadraticCurveTo(r + .92, i, r + .92, i + .16), a.lineTo(r + .92, i + 1 - .16), a.quadraticCurveTo(r + .92, i + 1, r + .92 - .16, i + 1), a.lineTo(r + .16, i + 1), a.quadraticCurveTo(r, i + 1, r, i + 1 - .16), a.lineTo(r, i + .16), a.quadraticCurveTo(r, i, r + .16, i);
    let s = new Pn(a, {
        depth: .05,
        bevelEnabled: !0,
        bevelThickness: .025,
        bevelSize: .025,
        bevelSegments: 3,
        curveSegments: 10,
        steps: 1
    });
    return s.rotateX(-Math.PI / 2), s
}

function ww() {
    let n = new on;
    n.moveTo(0, .115), n.lineTo(.075, 0), n.lineTo(0, -.115), n.lineTo(-.075, 0), n.lineTo(0, .115);
    let e = new Pn(n, {
        depth: .03,
        bevelEnabled: !1,
        steps: 1
    });
    return e.rotateY(Math.PI / 2), e
}

function za(n) {
    let e = (t, a) => new Yr(t, t, a, 24);
    return {
        roata(t, a, r, i, s, l, u) {
            let d = new xt,
                f = new Le(e(l, u), n.tyreM);
            f.rotation.x = Math.PI / 2;
            let p = new Le(e(l * .58, u * 1.04), n.hubM);
            p.rotation.x = Math.PI / 2, d.add(f), d.add(p);
            let c = new Ge(l * .31, l * .15, u * 1.1);
            for (let m = 0; m < 5; m++) {
                let g = new Le(c, n.tyreM),
                    v = m / 5 * Math.PI * 2;
                g.position.set(Math.cos(v) * l * .31, Math.sin(v) * l * .31, 0), g.rotation.z = v, g.rotation.x = Math.PI / 2, d.add(g), a.push(g)
            }
            return d.position.set(r, i, s), t.add(d), a.push(f, p), d
        },
        caseta(t, a, r, i) {
            let l = d => d / 1e3 * .9286;
            [.13, -.13].forEach(d => {
                let f = new Le(new Ge(.26, .04, .05), n.darkM);
                f.position.set(a, r - .02, i + d), t.add(f)
            });
            let u = new Le(new Ge(l(380), l(120), l(420)), [n.signM, n.signM, n.amberM, n.amberM, n.amberM, n.amberM]);
            return u.position.set(a, r + l(120) / 2 + .02, i), t.add(u), u
        },
        placuta(t, a, r, i, s) {
            let l = new Le(new Ge(.035, .115, .52), s ? [n.darkM, n.plateM, n.darkM, n.darkM, n.darkM, n.darkM] : [n.plateM, n.darkM, n.darkM, n.darkM, n.darkM, n.darkM]);
            return l.position.set(a, r, i), t.add(l), l
        },
        cutie(t, a, r, i, s, l, u, d) {
            let f = new Le(new Ge(a, r, i), s);
            return f.position.set(l, u, d), t.add(f), f
        }
    }
}

function bk(n) {
    let e = [],
        t = new xt,
        a = (y, _, b, M, S) => {
            let k = new Le(y, _);
            return k.position.set(b, M, S), t.add(k), k
        };
    t.add(new Le(xk(), n.paint)), t.add(new Le(vk(), n.glassM));
    let r = yk();
    [.648, -.676].forEach(y => a(r, n.sideGlassM, -.02, .99, y)), [.664, -.664].forEach(y => a(new Ge(1.84, .026, .016), n.chromeM, -.04, 1.05, y));
    let i = new Le(Kw(), n.paint);
    i.position.set(.06, 1.632, 0), t.add(i);
    let s = new Js(.45, .055, 8, 20, Math.PI);
    [
        [1.04, 1],
        [1.04, -1],
        [-1.06, 1],
        [-1.06, -1]
    ].forEach(([y, _]) => {
        a(s, n.darkM, y, .37, _ * .772)
    }), a(new Ge(2.6, .05, 1.5), n.amberM, -.06, .79, 0), a(new Ge(2.86, .12, 1.47), n.darkM, -.05, .335, 0), a(new Ge(.05, .15, .8), n.darkM, 1.808, .88, 0), a(new Ge(.05, .1, .62), n.darkM, 1.845, .62, 0), a(new Ge(.06, .045, .8), n.darkM, 1.862, .5, 0), a(ww(), n.chromeM, 1.842, .88, 0), [.44, -.44].forEach(y => {
        a(new Ge(.07, .15, .38), n.darkM, 1.798, .97, y), a(new Ge(.05, .115, .33), n.headM, 1.836, .97, y), a(new Ge(.03, .022, .3), n.ledM, 1.856, 1.028, y), a(new Ge(.03, .075, .024), n.ledM, 1.856, .985, y + (y > 0 ? .146 : -.146)), a(new Ge(.035, .05, .14), n.darkM, 1.858, .6, y + (y > 0 ? .06 : -.06))
    }), [.6, -.6].forEach(y => {
        a(new Ge(.07, .3, .13), n.darkM, -1.775, .86, y), a(new Ge(.045, .26, .1), n.tailM, -1.805, .86, y)
    }), a(new Ge(.05, .05, .34), n.tailM, -1.8, 1.04, 0), a(new Ge(.09, .05, .9), n.darkM, -1.7, 1.1, 0), a(ww(), n.chromeM, -1.812, .72, 0), [.66, -.66].forEach(y => {
        let _ = a(new Ge(.17, .06, .11), n.darkM, .53, 1.17, y);
        _.rotation.x = y > 0 ? .12 : -.12, a(new Ge(.05, .032, .17), n.chromeM, .39, 1.11, y)
    }), [.795, -.795].forEach(y => {
        a(new Ge(.14, .035, .03), n.chromeM, .58, .9, y)
    }), [.672, -.672].forEach(y => {
        a(new Ge(.05, .1, .03), n.chromeM, -.88, 1.22, y)
    });
    let l = .9286,
        u = y => y / 1e3 * l,
        d = u(Ui.lat),
        f = u(Ui.inalt),
        p = u(Ui.lung);
    [.13, -.13].forEach(y => a(new Ge(.26, .04, .05), n.darkM, .06, 1.732, y));
    let c = new Le(new Ge(d, f, p), [n.signM, n.signM, n.amberM, n.amberM, n.amberM, n.amberM]);
    c.position.set(.06, 1.752 + f / 2, 0), t.add(c);
    let m = new Ge(.035, .115, .52),
        g = new Le(m, [n.plateM, n.darkM, n.darkM, n.darkM, n.darkM, n.darkM]);
    g.position.set(1.878, .44, 0), t.add(g);
    let v = new Le(m, [n.darkM, n.plateM, n.darkM, n.darkM, n.darkM, n.darkM]);
    v.position.set(-1.872, .5, 0), t.add(v);
    let w = new Yr(.37, .37, .26, 26),
        x = new Yr(.215, .215, .28, 20),
        h = new Ge(.115, .055, .29);
    return [
        [1.04, .7],
        [1.04, -.7],
        [-1.06, .7],
        [-1.06, -.7]
    ].forEach(([y, _]) => {
        let b = new xt,
            M = new Le(w, n.tyreM);
        M.rotation.x = Math.PI / 2;
        let S = new Le(x, n.hubM);
        S.rotation.x = Math.PI / 2, b.add(M), b.add(S);
        for (let k = 0; k < 5; k++) {
            let E = new Le(h, n.tyreM),
                B = k / 5 * Math.PI * 2;
            E.position.set(Math.cos(B) * .115, Math.sin(B) * .115, 0), E.rotation.z = B, E.rotation.x = Math.PI / 2, b.add(E), e.push(E)
        }
        b.position.set(y, .37, _), t.add(b), e.push(M, S)
    }), {
        grup: t,
        roti: e,
        lungime: 3.9,
        inaltime: 1.9
    }
}

function Ba(n, e, t) {
    let a = new on;
    a.moveTo(n[0][0], n[0][1]);
    for (let s = 1; s < n.length; s++) {
        let l = n[s];
        l.length === 4 ? a.quadraticCurveTo(l[0], l[1], l[2], l[3]) : a.lineTo(l[0], l[1])
    }
    let r = t ?? .05,
        i = new Pn(a, {
            depth: e,
            bevelEnabled: r > 0,
            bevelThickness: r,
            bevelSize: r,
            bevelSegments: 4,
            curveSegments: 20,
            steps: 1
        });
    return i.translate(0, 0, -e / 2), i
}

function wk(n) {
    let e = [],
        t = new xt,
        a = za(n);
    t.add(new Le(Ba([
        [-2.1, .28],
        [1.7, .28],
        [1.94, .3, 1.96, .54],
        [1.96, .74, 1.8, .82],
        [1.4, .9, 1.02, .96],
        [-1.3, 1],
        [-1.92, 1, -2.1, .88],
        [-2.2, .74, -2.2, .5],
        [-2.18, .3, -2.1, .28]
    ], 1.44, .06), n.paint)), t.add(new Le(Ba([
        [-1.12, .94],
        [-.92, 1.2, -.52, 1.3],
        [.28, 1.3],
        [.72, 1.26, .98, .94],
        [-1.12, .94]
    ], 1.24, .03), n.glassM));
    let r = new Le(Kw(), n.paint);
    return r.position.set(-.1, 1.315, 0), t.add(r), [1.14, -1.14].forEach(i => [1, -1].forEach(s => {
        let l = new Le(new Js(.45, .055, 8, 20, Math.PI), n.darkM);
        l.position.set(i, .37, s * .75), t.add(l)
    })), a.cutie(t, 2.7, .05, 1.42, n.amberM, -.06, .79, 0), a.cutie(t, .05, .15, .82, n.darkM, 1.94, .86, 0), [.44, -.44].forEach(i => {
        a.cutie(t, .06, .13, .36, n.darkM, 1.93, .94, i), a.cutie(t, .045, .1, .31, n.headM, 1.962, .94, i), a.cutie(t, .03, .02, .28, n.ledM, 1.975, .995, i)
    }), [.55, -.55].forEach(i => {
        a.cutie(t, .06, .14, .34, n.darkM, -2.14, .86, i), a.cutie(t, .04, .11, .3, n.tailM, -2.17, .86, i)
    }), a.placuta(t, 1.985, .44, 0, !1), a.placuta(t, -2.19, .5, 0, !0), a.caseta(t, -.1, 1.4, 0), [
        [1.14, .72],
        [1.14, -.72],
        [-1.14, .72],
        [-1.14, -.72]
    ].forEach(([i, s]) => a.roata(t, e, i, .37, s, .37, .26)), {
        grup: t,
        roti: e,
        lungime: 4.4,
        categorie: "B"
    }
}

function Sk(n) {
    let e = [],
        t = new xt,
        a = za(n);
    t.add(new Le(Ba([
        [-2.16, .28],
        [1.7, .28],
        [1.94, .3, 1.96, .54],
        [1.96, .74, 1.8, .82],
        [1.4, .9, 1.02, .96],
        [-1.6, 1.02],
        [-2.1, 1.02, -2.22, .9],
        [-2.3, .76, -2.28, .5],
        [-2.26, .3, -2.16, .28]
    ], 1.46, .06), n.paint)), t.add(new Le(Ba([
        [-2.14, .96],
        [-2.16, 1.34, -2.04, 1.4],
        [-.3, 1.44],
        [.34, 1.4, .98, .96],
        [-2.14, .96]
    ], 1.26, .03), n.glassM));
    let r = new Le(new Ge(2.1, .06, 1.08), n.paint);
    return r.position.set(-.9, 1.455, 0), t.add(r), [1.16, -1.24].forEach(i => [1, -1].forEach(s => {
        let l = new Le(new Js(.45, .055, 8, 20, Math.PI), n.darkM);
        l.position.set(i, .37, s * .76), t.add(l)
    })), [.5, -.5].forEach(i => a.cutie(t, 1.9, .05, .06, n.darkM, -.9, 1.51, i)), a.cutie(t, 2.9, .05, 1.44, n.amberM, -.1, .79, 0), a.cutie(t, .05, .15, .82, n.darkM, 1.94, .86, 0), [.44, -.44].forEach(i => {
        a.cutie(t, .06, .13, .36, n.darkM, 1.93, .94, i), a.cutie(t, .045, .1, .31, n.headM, 1.962, .94, i), a.cutie(t, .03, .02, .28, n.ledM, 1.975, .995, i)
    }), [.58, -.58].forEach(i => {
        a.cutie(t, .07, .32, .13, n.darkM, -2.24, .9, i), a.cutie(t, .045, .28, .1, n.tailM, -2.27, .9, i)
    }), a.placuta(t, 1.985, .44, 0, !1), a.placuta(t, -2.28, .52, 0, !0), a.caseta(t, -.3, 1.49, 0), [
        [1.16, .73],
        [1.16, -.73],
        [-1.24, .73],
        [-1.24, -.73]
    ].forEach(([i, s]) => a.roata(t, e, i, .37, s, .37, .26)), {
        grup: t,
        roti: e,
        lungime: 4.6,
        categorie: "B"
    }
}

function Mk(n) {
    let e = [],
        t = new xt,
        a = za(n);
    t.add(new Le(Ba([
        [-1.2, .26],
        [1.06, .26],
        [1.24, .28, 1.26, .48],
        [1.26, .64, 1.1, .72],
        [.72, .78, .44, .82],
        [-.86, .86],
        [-1.2, .86, -1.3, .72],
        [-1.36, .58, -1.34, .38],
        [-1.32, .27, -1.2, .26]
    ], 1.16, .05), n.paint)), t.add(new Le(Ba([
        [-1.02, .8],
        [-.92, 1.16, -.6, 1.24],
        [.1, 1.24],
        [.42, 1.18, .62, .8],
        [-1.02, .8]
    ], 1.02, .03), n.glassM));
    let r = new Le(new Ge(.86, .05, .88), n.paint);
    return r.position.set(-.28, 1.255, 0), t.add(r), a.cutie(t, 1.7, .04, 1.14, n.amberM, -.1, .66, 0), a.cutie(t, .05, .12, .6, n.darkM, 1.24, .6, 0), [.32, -.32].forEach(i => {
        a.cutie(t, .05, .11, .24, n.darkM, 1.22, .66, i), a.cutie(t, .04, .085, .2, n.headM, 1.25, .66, i)
    }), [.4, -.4].forEach(i => a.cutie(t, .045, .16, .1, n.tailM, -1.34, .72, i)), a.placuta(t, 1.27, .36, 0, !1), a.placuta(t, -1.35, .42, 0, !0), a.caseta(t, -.28, 1.29, 0), [
        [.74, .58],
        [.74, -.58],
        [-.78, .58],
        [-.78, -.58]
    ].forEach(([i, s]) => a.roata(t, e, i, .28, s, .28, .2)), {
        grup: t,
        roti: e,
        lungime: 2.7,
        categorie: "B1"
    }
}

function Sw(n, e) {
    let t = [],
        a = new xt,
        r = za(n);
    a.add(new Le(Ba([
        [-.62, .62],
        [-.1, .7],
        [.34, .86, .62, .88],
        [.74, .86, .78, .74],
        [.72, .62, .4, .58],
        [-.2, .54],
        [-.62, .56],
        [-.62, .62]
    ], .3, .04), n.paint)), r.cutie(a, .5, .1, .26, n.darkM, -.46, .74, 0), r.cutie(a, .18, .3, .22, n.darkM, .12, .42, 0), r.cutie(a, .06, .44, .06, n.darkM, .74, .44, 0), r.cutie(a, .05, .34, .06, n.darkM, -.7, .44, 0), r.cutie(a, .07, .05, .6, n.darkM, .7, 1, 0), r.cutie(a, .1, .16, .18, n.headM, .82, .86, 0), r.cutie(a, .06, .09, .14, n.tailM, -.86, .78, 0), r.cutie(a, .3, .05, .34, n.darkM, -.78, .9, 0);
    let i = .9286,
        s = u => u / 1e3 * i,
        l = new Le(new Ge(s(300), s(100), s(340)), [n.signM, n.signM, n.amberM, n.amberM, n.amberM, n.amberM]);
    if (l.position.set(-.78, .98, 0), a.add(l), r.placuta(a, -.9, .62, 0, !0), r.roata(a, t, .76, .34, 0, .34, .14), r.roata(a, t, -.72, .34, 0, .34, .16), e) {
        let u = new xt;
        u.add(new Le(Ba([
            [-.6, .3],
            [.44, .3],
            [.62, .34, .62, .52],
            [.6, .66, .36, .7],
            [-.3, .72],
            [-.6, .7, -.66, .56],
            [-.68, .42, -.6, .3]
        ], .56, .05), n.paint)), r.cutie(u, .5, .06, .5, n.darkM, -.14, .72, 0), r.cutie(u, .05, .08, .12, n.tailM, -.7, .58, 0), r.roata(u, t, -.1, .28, .34, .28, .14), [.34, -.3].forEach(d => r.cutie(u, .06, .05, .44, n.darkM, d, .5, -.42)), u.position.set(.02, 0, -.66), a.add(u)
    }
    return {
        grup: a,
        roti: t,
        lungime: e ? 2.2 : 2,
        categorie: "A"
    }
}

function _k(n) {
    let e = [],
        t = new xt,
        a = za(n);
    return t.add(new Le(Ba([
        [-1, .55],
        [1.42, .55],
        [1.56, .58, 1.58, .78],
        [1.58, 1.2],
        [1.52, 2.28],
        [1.4, 2.46, 1.1, 2.5],
        [-.9, 2.5],
        [-1, 2.44],
        [-1, .55]
    ], 2.3, .07), n.paint)), a.cutie(t, .06, .82, 2.06, n.glassM, 1.53, 1.92, 0), [1.14, -1.14].forEach(r => a.cutie(t, 1.1, .66, .05, n.glassM, .8, 1.86, r)), a.cutie(t, .3, 1.3, 2.36, n.darkM, -1.05, 1.6, 0), a.cutie(t, 1.1, .16, 2.2, n.darkM, .3, .5, 0), a.cutie(t, .6, .1, 1, n.darkM, -1.3, 1.05, 0), a.cutie(t, .12, .3, 2.3, n.darkM, 1.6, .8, 0), a.cutie(t, .08, .34, 1.3, n.darkM, 1.58, 1.3, 0), [.78, -.78].forEach(r => {
        a.cutie(t, .09, .26, .46, n.darkM, 1.575, .92, r), a.cutie(t, .05, .2, .4, n.headM, 1.62, .92, r)
    }), [1.02, -1.02].forEach(r => {
        a.cutie(t, .16, .6, .1, n.darkM, 1.28, 2, r), a.cutie(t, .06, .5, .06, n.darkM, 1.34, 2, r)
    }), a.cutie(t, .24, .9, .24, n.chromeM, -.9, 1.05, 1.14), a.placuta(t, 1.66, .66, 0, !1), a.caseta(t, .2, 2.52, 0), [
        [1.1, 1.02],
        [1.1, -1.02],
        [-.7, 1.02],
        [-.7, -1.02],
        [-1.2, 1.02],
        [-1.2, -1.02]
    ].forEach(([r, i]) => a.roata(t, e, r, .55, i, .55, .34)), {
        grup: t,
        roti: e,
        lungime: 3.4,
        categorie: "C"
    }
}

function eS(n) {
    let e = [],
        t = new xt,
        a = za(n);
    return t.add(new Le(Ba([
        [-4.2, .5],
        [4.1, .5],
        [4.32, .54, 4.34, .78],
        [4.34, 2.7],
        [4.2, 2.92, 3.9, 2.94],
        [-3.9, 2.94],
        [-4.24, 2.9, -4.32, 2.66],
        [-4.34, .8, -4.3, .6],
        [-4.28, .5, -4.2, .5]
    ], 2.44, .08), n.paint)), a.cutie(t, .07, 1.2, 2.24, n.glassM, 4.33, 2.1, 0), a.cutie(t, .07, 1, 2.24, n.glassM, -4.33, 2.1, 0), [1.22, -1.22].forEach(r => a.cutie(t, 7.4, .94, .05, n.glassM, -.1, 2.14, r)), a.cutie(t, 8.6, .1, 2.4, n.amberM, -.05, 1.42, 0), a.cutie(t, 8.7, .24, 2.36, n.darkM, -.05, .6, 0), [.8, -.8].forEach(r => {
        a.cutie(t, .09, .26, .44, n.darkM, 4.34, 1, r), a.cutie(t, .05, .2, .38, n.headM, 4.38, 1, r)
    }), [.86, -.86].forEach(r => a.cutie(t, .06, .3, .24, n.tailM, -4.36, 1.1, r)), a.placuta(t, 4.4, .74, 0, !1), a.caseta(t, .2, 2.96, 0), [
        [2.9, 1.1],
        [2.9, -1.1],
        [-2.4, 1.1],
        [-2.4, -1.1]
    ].forEach(([r, i]) => a.roata(t, e, r, .52, i, .52, .3)), {
        grup: t,
        roti: e,
        lungime: 8.8,
        categorie: "D"
    }
}

function Lk(n) {
    let e = [],
        t = new xt,
        a = za(n);
    return a.cutie(t, 1.7, .1, 1.3, n.darkM, 0, .52, 0), [
        [.86, .34, .06],
        [-.86, .34, .06]
    ].forEach(([r]) => a.cutie(t, .06, .34, 1.3, n.paint, r, .72, 0)), [.65, -.65].forEach(r => a.cutie(t, 1.72, .34, .06, n.paint, 0, .72, r)), [.55, -.55].forEach(r => a.cutie(t, .06, .1, .14, n.tailM, -.9, .62, r)), a.placuta(t, -.92, .42, 0, !0), [.72, -.72].forEach(r => a.roata(t, e, 0, .3, r, .3, .2)), {
        grup: t,
        roti: e,
        lungime: 1.9
    }
}

function Ck(n) {
    let e = [],
        t = new xt,
        a = za(n);
    return a.cutie(t, 2.9, .12, 1.6, n.darkM, 0, .58, 0), [.8, -.8].forEach(r => a.cutie(t, 2.92, .22, .07, n.paint, 0, .74, r)), a.cutie(t, .07, .22, 1.6, n.paint, -1.46, .74, 0), a.cutie(t, 2.6, .16, 1.3, n.amberM, 0, .94, 0), [.68, -.68].forEach(r => a.cutie(t, .07, .12, .16, n.tailM, -1.5, .66, r)), a.placuta(t, -1.52, .46, 0, !0), [
        [.36, .86],
        [.36, -.86],
        [-.42, .86],
        [-.42, -.86]
    ].forEach(([r, i]) => a.roata(t, e, r, .32, i, .32, .22)), {
        grup: t,
        roti: e,
        lungime: 3.1
    }
}

function Ek(n) {
    let e = [],
        t = new xt,
        a = za(n);
    return a.cutie(t, 7.6, 2.2, 2.44, n.paint, 0, 1.9, 0), a.cutie(t, 7.64, .1, 2.46, n.amberM, 0, 1.34, 0), a.cutie(t, .1, 2.1, 2.4, n.darkM, -3.82, 1.9, 0), a.cutie(t, 6.6, .2, 2, n.darkM, .3, .72, 0), a.cutie(t, .9, .34, 1, n.darkM, 3.3, .72, 0), [.9, -.9].forEach(r => a.cutie(t, .08, .3, .26, n.tailM, -3.88, .95, r)), a.placuta(t, -3.9, .66, 0, !0), [
        [-2.1, 1.06],
        [-2.1, -1.06],
        [-2.9, 1.06],
        [-2.9, -1.06]
    ].forEach(([r, i]) => a.roata(t, e, r, .52, i, .52, .32)), {
        grup: t,
        roti: e,
        lungime: 8
    }
}

function Ik(n) {
    let e = [],
        t = new xt,
        a = za(n);
    return a.cutie(t, .7, .08, .56, n.darkM, 0, .42, 0), [.28, -.28].forEach(r => a.cutie(t, .72, .2, .05, n.paint, 0, .55, r)), a.cutie(t, .05, .2, .56, n.paint, -.36, .55, 0), a.cutie(t, .05, .07, .1, n.tailM, -.38, .5, 0), [.36, -.36].forEach(r => a.roata(t, e, 0, .22, r, .22, .12)), {
        grup: t,
        roti: e,
        lungime: .9
    }
}

/* ================= MODELE ADEVĂRATE, CITITE DIN FIȘIER =================
   Vehiculele desenate de mână din cutii arătau ca niște cutii. Modelele
   adevărate stau ca fișiere .glb în dosarul „modele" și se citesc aici, cu un
   cititor scris de mână — fără nicio bibliotecă în plus.

   Fiecare fișier are bucățile denumite: „body" e tabla, „glass" geamurile,
   „optics" farurile, iar „wheel-…" sunt roțile. Roțile își păstrează centrul
   propriu, ca să se poată învârti pe loc, în jurul axei lor.               */

function iasCitesteGLB(bufer) {
    var dv = new DataView(bufer);
    if (dv.getUint32(0, true) !== 1179937895) throw new Error("nu e .glb");
    var poz = 12, json = null, bin = null;
    while (poz < dv.byteLength) {
        var lung = dv.getUint32(poz, true), fel = dv.getUint32(poz + 4, true), start = poz + 8;
        if (fel === 1313821514) json = JSON.parse(new TextDecoder().decode(new Uint8Array(bufer, start, lung)));
        else if (fel === 5130562) bin = new Uint8Array(bufer, start, lung);
        poz = start + lung + (lung % 4 ? 4 - lung % 4 : 0);
    }
    if (!json || !bin) throw new Error("fișier incomplet");
    return { json: json, bin: bin };
}

function iasAccesor(json, bin, index) {
    var acc = json.accessors[index], bv = json.bufferViews[acc.bufferView];
    var buc = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[acc.type];
    var feluri = { 5126: [Float32Array, 4], 5125: [Uint32Array, 4], 5123: [Uint16Array, 2], 5121: [Uint8Array, 1] };
    var Tip = feluri[acc.componentType][0], octeti = feluri[acc.componentType][1];
    var start = (bv.byteOffset || 0) + (acc.byteOffset || 0), pas = bv.byteStride || buc * octeti;
    var iesire = new Tip(acc.count * buc);
    for (var i = 0; i < acc.count; i++) {
        var b = new Tip(bin.buffer, bin.byteOffset + start + i * pas, buc);
        for (var k = 0; k < buc; k++) iesire[i * buc + k] = b[k];
    }
    return iesire;
}

/* Culorile din care se poate alege vopseaua. Prima e cea implicită. */
function iasCod(id) {
    var g = IAS_CULORI.filter(function (c) { return c.id === id; })[0];
    return g ? g.cod : IAS_CULORI[0].cod;
}

var IAS_CULORI = [
    { id: "argintiu", nume: "Argintiu", cod: 0xC2C7CE },
    { id: "alb", nume: "Alb", cod: 0xF2F4F7 },
    { id: "negru", nume: "Negru", cod: 0x22272E },
    { id: "rosu", nume: "Roșu", cod: 0xC0392B },
    { id: "albastru", nume: "Albastru", cod: 0x2C5FA8 },
    { id: "galben", nume: "Galben", cod: 0xE8B21E },
    { id: "verde", nume: "Verde", cod: 0x2E7D5B },
    { id: "mov", nume: "Mov", cod: 0x6B4CA8 },
    { id: "gri", nume: "Gri închis", cod: 0x5A6472 }
];

function iasVehiculDinFisier(fisier, lungime, latime, inaltimeCaseta) {
    return function (mats, culoare) {
        var grup = new xt(), roti = [];
        var Geometrie = Object.getPrototypeOf(Ge.prototype).constructor;
        var Atribut = new Ge(1, 1, 1).attributes.position.constructor;
        var Material = Object.getPrototypeOf($l.prototype).constructor;

        // tabla ia culoarea aleasă; restul rămân ca la orice mașină
        var mTabla = new Material({ color: culoare == null ? 0xC2C7CE : culoare, roughness: .35, metalness: .5 });
        var mGeam = new Material({ color: 0x1A2430, roughness: .1, metalness: .6 });
        var mFar = new Material({ color: 0xFFFFFF, emissive: 0xFFF3B0, emissiveIntensity: .35, roughness: .2 });

        /* Numărul de versiune în adresă: fără el, telefonul poate servi la
           nesfârșit modelul ținut minte de data trecută, oricât l-ai schimba
           în depozit. */
        fetch("modele/" + fisier + ".glb?v=" + ri)
            .then(function (r) { if (!r.ok) throw new Error("lipsește"); return r.arrayBuffer(); })
            .then(function (ab) {
                var citit = iasCitesteGLB(ab), json = citit.json, bin = citit.bin;
                json.nodes.forEach(function (nod) {
                    if (nod.mesh == null) return;
                    var t = nod.translation || [0, 0, 0];
                    var eRoata = /^wheel/.test(nod.name || "");
                    var material = eRoata ? mats.tyreM : /glass/.test(nod.name) ? mGeam : /optics/.test(nod.name) ? mFar : mTabla;

                    json.meshes[nod.mesh].primitives.forEach(function (p) {
                        var geo = new Geometrie();
                        geo.setAttribute("position", new Atribut(iasAccesor(json, bin, p.attributes.POSITION), 3));
                        if (p.attributes.NORMAL != null) geo.setAttribute("normal", new Atribut(iasAccesor(json, bin, p.attributes.NORMAL), 3));
                        geo.setIndex(Array.from(iasAccesor(json, bin, p.indices)));
                        if (p.attributes.NORMAL == null) geo.computeVertexNormals();
                        var plasa = new Le(geo, material);

                        if (eRoata) {
                            /* Roata se rostogolește în jurul butucului ei. Bucla din
                               scenă rotește obiectul pe axa lui Y, iar butucul stă pe axa
                               Z a mașinii — așa că suportul se culcă un sfert de tură pe
                               X, ca Y-ul lui să cadă exact pe butuc.

                               Culcând suportul, se culca și roata din el: de aceea arăta
                               ca o farfurie. O întoarcem înapoi cu același sfert de tură,
                               în sens invers — suportul rămâne culcat, roata rămâne
                               dreaptă, iar rotirea iese rostogolire curată. */
                            var suport = new xt();
                            suport.rotation.x = -Math.PI / 2;
                            plasa.rotation.x = Math.PI / 2;
                            suport.add(plasa);
                            var loc = new xt();
                            loc.position.set(t[0], t[1], t[2]);
                            loc.add(suport);
                            grup.add(loc);
                            roti.push(suport);
                        } else {
                            plasa.position.set(t[0], t[1], t[2]);
                            grup.add(plasa);
                        }
                    });
                });
                za(mats).caseta(grup, 0, inaltimeCaseta, 0);
            })
            .catch(function () { /* fișierul lipsește din depozit */ });

        return { grup: grup, roti: roti, lungime: lungime, latime: latime };
    };
}

var Zn = {
        hatchback: {
            nume: "Hatchback",
            categorie: "B",
            build: iasVehiculDinFisier("hatchback", 3.9, 1.72, 1.38)
        },
        sedan: {
            nume: "Berlină",
            categorie: "B",
            build: iasVehiculDinFisier("berlina", 4.3, 1.92, 1.36)
        }
    },
    h0 = {
        usoara: {
            nume: "Remorc\u0103 u\u0219oar\u0103",
            categorii: ["B", "B1"],
            build: Lk
        },
        platforma: {
            nume: "Platform\u0103",
            categorii: ["B"],
            build: Ck
        },
        semi: {
            nume: "Semiremorc\u0103",
            categorii: ["C"],
            build: Ek
        },
        moto: {
            nume: "Remorc\u0103 de motociclet\u0103",
            categorii: ["A"],
            build: Ik
        }
    };

function Tk({
    phase: n,
    vehicul: e,
    remorca: t,
    culoare: culoareAleasa
}) {
    let a = (0, o.useRef)(null),
        r = (0, o.useRef)(null),
        i = (0, o.useRef)(n),
        s = (0, o.useRef)(e),
        l = (0, o.useRef)(t),
        vopsea = (0, o.useRef)(culoareAleasa);
    s.current = e, l.current = t, vopsea.current = culoareAleasa;
    let [u, d] = (0, o.useState)(!1);
    return i.current = n, (0, o.useEffect)(() => {
        let f = a.current;
        if (!f) return;
        let p = 0,
            c = null,
            m = null,
            g = null;
        try {
            g = new Zs;
            let v = f.clientWidth || 340,
                w = f.clientHeight || 140,
                x = new Ft(30, v / w, .1, 120),
                h = Zn[s.current] || Zn.hatchback,
                y = h0[l.current],
                _ = y && y.categorii.includes(h.categorie),
                b = (h.build === eS ? 8.8 : 4.2) + (_ ? 3.4 : 0),
                M = Math.max(1, b / 4.2);
            /* Pe un ecran îngust unghiul orizontal al camerei se strânge, iar
               mașina — care e lungă — iese din cadru pe la boturi. Dăm camera
               înapoi cât trebuie ca să încapă, proporțional cu cât e de îngust
               ecranul. Pe ecran lat nu se schimbă nimic. */
            let iasIncape = (lat, inalt) => {
                let asp = (lat || 1) / (inalt || 1);
                /* 1,10 e distanța de la care mașina încape întreagă la orice
                   raport de ecran — chiar și pe cel lat, unde înainte îi ieșea
                   un colț. Pe ecranele înguste dăm mai mult înapoi, fiindcă
                   acolo unghiul orizontal e cel care strânge. */
                return Math.max(1.1, asp >= 2.4 ? 1 : Math.min(1.6, 2.4 / Math.max(.9, asp)))
            };
            let iasAsaza = (lat, inalt) => {
                let D = M * iasIncape(lat, inalt);
                x.position.set(4.6 * D, 1.85 * Math.pow(D, .75), 4.2 * D),
                x.lookAt(-.5 * (D - 1), .82 * Math.pow(D, .55), 0)
            };
            iasAsaza(v, w), m = new Qe({
                antialias: !0,
                alpha: !0
            }), m.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)), m.setSize(v, w), m.outputEncoding = Aa, uf !== void 0 && (m.toneMapping = uf, m.toneMappingExposure = 1.05), m.domElement.style.display = "block", f.appendChild(m.domElement), g.fog = new Hl(7325682, 10, 28);
            let S = new Zl(16777215, 3359061, 1);
            g.add(S);
            let k = new io(16777215, 1.5);
            k.position.set(5, 7, 4), g.add(k);
            let E = new io(12572927, .5);
            E.position.set(-6, 3, -4), g.add(E);
            let B = new Ql(16773824, 0, 26, .55, .75, 1.1);
            B.position.set(1.7, .72, 0);
            let $ = new Xe;
            $.position.set(16, -.6, 0), g.add($), B.target = $;
            let G = new bt({
                    color: 4016989,
                    roughness: .82,
                    metalness: .12,
                    envMapIntensity: .35
                }),
                A = new Le(new ki(90, 11), G);
            A.rotation.x = -Math.PI / 2, g.add(A);
            let O = new bt({
                color: 15265526,
                roughness: .85
            });
            [-3.1, 2.4].forEach(ke => {
                let Ie = new Le(new Ge(90, .02, .11), O);
                Ie.position.set(0, .012, ke), g.add(Ie)
            });
            let N = [],
                C = new Ge(1.25, .02, .13),
                W = new bt({
                    color: 16102180,
                    roughness: .75
                });
            for (let ke = 0; ke < 20; ke++) {
                let Ie = new Le(C, W);
                Ie.position.set(-26 + ke * 2.6, .013, -1.65), g.add(Ie), N.push(Ie)
            }
            let X = new bt({
                    color: 16347926,
                    roughness: .6
                }),
                R = new bt({
                    color: 16317180,
                    roughness: .6
                }),
                K = new Yr(.05, .19, .42, 14),
                ne = new Yr(.125, .145, .09, 14);
            for (let ke = 0; ke < 6; ke++) {
                let Ie = new xt,
                    Lt = new Le(K, X);
                Lt.position.y = .21;
                let ut = new Le(ne, R);
                ut.position.y = .24;
                let qt = new Le(new Ge(.34, .04, .34), X);
                qt.position.y = .02, Ie.add(Lt), Ie.add(ut), Ie.add(qt), Ie.position.set(-26 + ke * (52 / 6), 0, 3.1), g.add(Ie), N.push(Ie)
            }
            let Y = hk("#cfe4f7", "#8fb4d6", "#3b4553"),
                J = Y;
            try {
                let ke = new rf(m);
                J = ke.fromCubemap(Y).texture, ke.dispose()
            } catch {}
            g.environment = J;
            let z = new $l({
                    color: 12371409,
                    roughness: .3,
                    metalness: .78,
                    clearcoat: .92,
                    clearcoatRoughness: .05,
                    envMap: J,
                    envMapIntensity: 1.25
                }),
                q = new bt({
                    color: 16096779,
                    roughness: .35,
                    metalness: .3
                }),
                de = new bt({
                    color: 2238511,
                    roughness: .62,
                    metalness: .2,
                    envMap: J,
                    envMapIntensity: .5
                }),
                ge = new bt({
                    color: 1977408,
                    roughness: .06,
                    metalness: .65,
                    envMap: J,
                    envMapIntensity: 1.35
                }),
                ye = new bt({
                    color: 1779520,
                    roughness: .06,
                    metalness: .6,
                    envMap: J,
                    envMapIntensity: 1.3,
                    transparent: !0,
                    opacity: .9
                }),
                Ne = new bt({
                    color: 1316895,
                    roughness: .95
                }),
                ce = new bt({
                    color: 12897494,
                    roughness: .24,
                    metalness: .92,
                    envMap: J,
                    envMapIntensity: 1.1
                }),
                ze = new bt({
                    color: 14673904,
                    roughness: .1,
                    metalness: 1,
                    envMap: J,
                    envMapIntensity: 1.5
                }),
                re = new bt({
                    color: 16775389,
                    emissive: 16774064,
                    emissiveIntensity: .2,
                    roughness: .18
                }),
                se = new bt({
                    color: 16777215,
                    emissive: 16643800,
                    emissiveIntensity: .9,
                    roughness: .08
                }),
                fe = new bt({
                    color: 9378330,
                    emissive: 15680580,
                    emissiveIntensity: .3,
                    roughness: .28
                }),
                he = ck();
            try {
                he.anisotropy = m.capabilities.getMaxAnisotropy()
            } catch {}
            let H = new bt({
                    map: he,
                    emissiveMap: he,
                    emissive: 16777215,
                    emissiveIntensity: 0,
                    roughness: .5
                }),
                L = fk(),
                T = new bt({
                    map: L,
                    roughness: .5
                }),
                j = {
                    paint: z,
                    amberM: q,
                    darkM: de,
                    glassM: ge,
                    sideGlassM: ye,
                    tyreM: Ne,
                    hubM: ce,
                    chromeM: ze,
                    headM: re,
                    ledM: se,
                    tailM: fe,
                    signM: H,
                    plateM: T
                },
                pe = (Zn[s.current] ? Zn[s.current].build : Zn.hatchback.build)(j, iasCod(vopsea.current)),
                we = pe.grup,
                Re = pe.roti,
                Pe = h0[l.current];
            if (Pe && Pe.categorii.includes(Zn[s.current] ? Zn[s.current].categorie : "B")) {
                let ke = Pe.build(j);
                ke.grup.position.x = -(pe.lungime / 2) - ke.lungime / 2 - .35, we.add(ke.grup), ke.roti.forEach(Lt => Re.push(Lt));
                let Ie = new Le(new Ge(.7, .06, .08), de);
                Ie.position.set(-(pe.lungime / 2) - .18, .42, 0), we.add(Ie)
            }
            we.add(B), g.add(we);
            let U = new Le(new ki(4.4 * M, 2.3 * Math.min(M, 1.5)), new $r({
                map: mk(),
                transparent: !0,
                opacity: .55,
                depthWrite: !1
            }));
            U.rotation.x = -Math.PI / 2, U.position.y = .016, g.add(U);
            let me = pk(),
                ve = (ke, Ie, Lt, ut) => {
                    let qt = new Le(new ki(ke, Ie), new $r({
                        map: me,
                        color: ut,
                        transparent: !0,
                        opacity: 0,
                        depthWrite: !1,
                        blending: Cc
                    }));
                    return qt.rotation.x = -Math.PI / 2, qt.position.set(Lt, .02, 0), g.add(qt), qt
                },
                /* O singură baltă de lumină, croită după mașina de pe ecran:
                   lată cât deschiderea farurilor ei, lungă cât fâșia de asfalt
                   care se vede în fața botului, și lipită de bară. */
                latimeMasina = pe.latime || (pe.lungime * 0.44),
                lungimeFascicul = pe.lungime * .33,
                Ee = ve(latimeMasina * 2.6, lungimeFascicul, pe.lungime / 2 + lungimeFascicul / 2 - .15, 16773312),
                ae = ve(1.9, 1.8, -2.8, 16726832);
            /* Tăria luminii, ținută deoparte: perioada zilei o stabilește, iar
               bucla de desenare o pâlpâie ușor în jurul ei. */
            let iasLumina = 0;
            Ee.rotation.z = -Math.PI / 2, ae.rotation.z = Math.PI / 2, r.current = {
                setPhase: ke => {
                    let Ie = hw[ke] || hw.day;
                    S.color.setHex(Ie.hemiSky), S.groundColor.setHex(Ie.hemiGround), S.intensity = Ie.hemiI, k.color.setHex(Ie.dir), k.intensity = Ie.dirI, E.intensity = ke === "night" ? .28 : .5, B.intensity = 0, re.emissiveIntensity = Ie.head, se.emissiveIntensity = .2 + Ie.head * .5, fe.emissiveIntensity = Ie.tail, H.emissiveIntensity = Ie.glow;
                    let Lt = Math.min(1, Ie.spot / 1.7);
                    iasLumina = Lt * .9, Ee.material.opacity = iasLumina, ae.material.opacity = iasLumina * .33, G.color.setHex(Ie.road), g.fog.color.setHex(Ie.fog);
                    let ut = ke === "night" ? .35 : ke === "day" ? 1.15 : .7;
                    z.envMapIntensity = ut, ze.envMapIntensity = ut * 1.3, ge.envMapIntensity = ut * 1.2, ye.envMapIntensity = ut * 1.2, ce.envMapIntensity = ut, de.envMapIntensity = ut * .45
                }
            }, r.current.setPhase(i.current);
            let Oe = new D(0, 1, 0),
                $e = new af,
                st = 7.5,
                hn = () => {
                    p = requestAnimationFrame(hn);
                    let ke = Math.min($e.getDelta(), .05);
                    if (document.hidden) return;
                    let Ie = $e.getElapsedTime();
                    for (let ut = 0; ut < N.length; ut++) {
                        let qt = N[ut];
                        qt.position.x -= st * ke, qt.position.x < -26 && (qt.position.x += 52)
                    }
                    let Lt = st / .37 * ke;
                    for (let ut = 0; ut < Re.length; ut++) Re[ut].rotateOnAxis(Oe, Lt);
                    we.position.y = Math.sin(Ie * 8.5) * .012, we.position.z = Math.sin(Ie * .7) * .09, we.rotation.z = Math.sin(Ie * 3.1) * .011, we.rotation.y = Math.sin(Ie * .9) * .02, U.position.z = we.position.z;

                    /* Balta de lumină ține pasul cu mașina. Farurile sunt prinse
                       de ea, deci când mașina se leagănă pe drum, lumina se
                       leagănă odată cu ea: alunecă în lateral cât alunecă și
                       botul, și se rotește cu cât se întoarce el.

                       Rămâne însă lipită de asfalt — nu urcă și nu coboară cu
                       suspensia, fiindcă lumina cade pe drum, nu plutește. */
                    Ee.position.z = we.position.z, Ee.rotation.y = -we.rotation.y;
                    ae.position.z = we.position.z, ae.rotation.y = -we.rotation.y;
                    /* Și pâlpâie puțin, în ritmul legănării: un fascicul viu, nu
                       o pată desenată pe jos. */
                    Ee.material.opacity = iasLumina * (.9 + Math.sin(Ie * 8.5) * .07);
                    ae.material.opacity = iasLumina * .33 * (.9 + Math.sin(Ie * 8.5) * .07);

                    m.render(g, x)
                };
            hn();
            let tt = () => {
                let ke = f.clientWidth,
                    Ie = f.clientHeight;
                !ke || !Ie || (iasAsaza(ke, Ie), x.aspect = ke / Ie, x.updateProjectionMatrix(), m.setSize(ke, Ie))
            };
            return typeof ResizeObserver < "u" ? (c = new ResizeObserver(tt), c.observe(f)) : window.addEventListener("resize", tt), () => {
                cancelAnimationFrame(p), c ? c.disconnect() : window.removeEventListener("resize", tt), g.traverse(ke => {
                    ke.geometry && ke.geometry.dispose(), ke.material && (Array.isArray(ke.material) ? ke.material : [ke.material]).forEach(Lt => {
                        Lt.map && Lt.map.dispose(), Lt.dispose()
                    })
                }), m.dispose(), m.domElement.parentNode && m.domElement.parentNode.removeChild(m.domElement)
            }
        } catch {
            d(!0), p && cancelAnimationFrame(p)
        }
    }, [e, t, culoareAleasa]), (0, o.useEffect)(() => {
        r.current && r.current.setPhase && r.current.setPhase(n)
    }, [n]), u ? o.default.createElement("div", {
        className: "relative w-full h-full overflow-hidden",
        style: {
            background: "#111827"
        }
    }, o.default.createElement("div", {
        className: "ias-dash"
    }), o.default.createElement("div", {
        className: "ias-car flex flex-col items-center"
    }, o.default.createElement("span", {
        style: {
            fontSize: 7.5,
            fontWeight: 900,
            background: "#fbbf24",
            color: "#111827",
            padding: "1px 4px",
            borderRadius: 2,
            letterSpacing: .6,
            marginBottom: 1
        }
    }, "\u0218COALA"), o.default.createElement(ar, {
        size: 26,
        color: "#fde68a"
    }))) : o.default.createElement("div", {
        ref: a,
        className: "w-full h-full"
    })
}

function Ak({
    vehicul: n,
    remorca: e,
    culoare: vopseaua
}) {
    let [t, a] = (0, o.useState)(new Date), [r, i] = (0, o.useState)(null);
    (0, o.useEffect)(() => {
        let p = setInterval(() => a(new Date), 6e4);
        return () => clearInterval(p)
    }, []);
    let s = r || FA(t.getHours()),
        l = DA[s],
        u = l.icon,
        d = `${Da(t.getHours())}:${Da(t.getMinutes())}`,
        f = () => {
            let p = [null, "dawn", "day", "dusk", "night"];
            i(p[(p.indexOf(r) + 1) % p.length])
        };
    return o.default.createElement("div", {
        className: "relative overflow-hidden",
        "data-ias-antet": "",
        style: {
            borderRadius: 22,
            background: l.sky,
            boxShadow: "var(--shadow-lg)",
            transition: "background .8s ease"
        }
    }, o.default.createElement("div", {
        className: "relative px-5 pt-5 pb-4",
        // Blocul ține toată înălțimea antetului, ca animația așezată peste el
        // să umple tot, nu doar zona scrisului.
        style: {
            minHeight: 300,
            display: "flex",
            flexDirection: "column"
        }
    },
    /* ============ CERUL DIN ANTET ============
       Soarele urmează drumul lui adevărat: răsare din stânga, la orizont, urcă
       sus la amiază și coboară în dreapta la apus. Seara se văd amândoi — el
       apunând într-o parte, luna răsărind în cealaltă —, iar noaptea rămâne
       doar luna, sus.

       Niciunul nu mai stă în colțul din dreapta sus, unde se încurca cu butonul
       de schimbat perioada. Butonul a coborât la piciorul antetului. */
    s === "night" && mw.map((p, c) => o.default.createElement("span", {
        key: c,
        className: "ias-star",
        style: {
            top: `${p[0]}%`,
            left: `${p[1]}%`,
            animationDelay: p[2]
        }
    })), s === "dusk" && mw.slice(0, 5).map((p, c) => o.default.createElement("span", {
        key: c,
        className: "ias-star",
        style: {
            top: `${p[0]}%`,
            left: `${p[1]}%`,
            animationDelay: p[2],
            opacity: .5
        }
    })),
    /* Soarele: la zori jos în stânga, la amiază sus la mijloc, la apus jos în
       dreapta. Noaptea nu se vede deloc. */
    s !== "night" && (() => {
        let iasLoc = {
                dawn: { left: "12%", top: 128, marime: 40, culoare: "#ffd0a1", lumina: "rgba(255,208,161,0.95)" },
                day: { left: "50%", top: 26, marime: 46, culoare: "#fff0a8", lumina: "rgba(255,240,168,0.95)" },
                dusk: { left: "84%", top: 132, marime: 42, culoare: "#fb923c", lumina: "rgba(251,146,60,0.9)" }
            }[s];
        return o.default.createElement("span", {
            "aria-hidden": "true",
            style: {
                position: "absolute",
                width: iasLoc.marime,
                height: iasLoc.marime,
                top: iasLoc.top,
                left: iasLoc.left,
                marginLeft: -iasLoc.marime / 2,
                borderRadius: 99,
                background: iasLoc.culoare,
                boxShadow: `0 0 48px ${iasLoc.lumina}`,
                transition: "top .8s ease, left .8s ease",
                pointerEvents: "none"
            }
        })
    })(),
    /* Luna: seara răsare în stânga, în timp ce soarele apune în dreapta; noaptea
       e sus, singură pe cer. */
    (s === "night" || s === "dusk") && o.default.createElement(zi, {
        size: s === "night" ? 28 : 22,
        color: "#dbe6f5",
        "aria-hidden": "true",
        style: {
            position: "absolute",
            top: s === "night" ? 30 : 86,
            left: s === "night" ? "50%" : "14%",
            marginLeft: s === "night" ? -14 : -11,
            opacity: s === "night" ? 1 : .75,
            filter: "drop-shadow(0 0 10px rgba(219,230,245,0.8))",
            transition: "top .8s ease, left .8s ease",
            pointerEvents: "none"
        }
    }),
    /* Norii de zi, lăsați unde erau — nu se încurcă cu nimic. */
    s === "day" && o.default.createElement(o.default.Fragment, null, o.default.createElement("span", {
        style: {
            position: "absolute",
            width: 70,
            height: 15,
            top: 48,
            left: 16,
            borderRadius: 99,
            background: "rgba(255,255,255,.85)",
            filter: "blur(3px)"
        }
    }), o.default.createElement("span", {
        style: {
            position: "absolute",
            width: 44,
            height: 11,
            top: 22,
            left: 126,
            borderRadius: 99,
            background: "rgba(255,255,255,.7)",
            filter: "blur(3px)"
        }
    })), o.default.createElement("div", {
        className: "absolute inset-0",
        style: {
            zIndex: 0
        }
    }, o.default.createElement(Tk, {
        phase: s,
        vehicul: n,
        remorca: e,
        culoare: vopseaua
    })), o.default.createElement("span", {
        className: "absolute inset-0",
        style: {
            background: "linear-gradient(102deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.2) 52%, transparent 88%)"
        }
    }), o.default.createElement("div", {
        className: "relative flex items-start justify-between gap-2"
    }, o.default.createElement("div", {
        className: "flex items-center gap-1.5 font-semibold uppercase",
        style: {
            fontSize: 10,
            letterSpacing: "0.17em",
            color: "rgba(255,255,255,0.96)"
        }
    }, o.default.createElement(ar, {
        size: 13
    }), " ", fn.expansion)),
    /* Butonul de perioadă a coborât la piciorul antetului, pe stânga, sub
       scris: sus se încurca cu soarele și cu luna, care stau acum pe cer, la
       locul lor. */
    o.default.createElement("button", {
        onClick: f,
        className: "absolute flex items-center gap-1 rounded-full px-2.5 py-1",
        style: {
            left: 20,
            bottom: 14,
            zIndex: 2,
            fontSize: 10,
            fontWeight: 700,
            background: "rgba(3,7,18,0.52)",
            border: "1px solid rgba(255,255,255,0.26)",
            color: "#fff",
            backdropFilter: "blur(2px)"
        }
    }, o.default.createElement(u, {
        size: 12
    }), r ? l.label : `${d} \xB7 ${l.label}`), o.default.createElement("h1", {
        className: "relative font-display uppercase",
        style: {
            marginTop: 12,
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: "#fff",
            textShadow: "0 2px 14px rgba(3,7,18,0.5)"
        }
    }, "Bun venit \xEEn ", o.default.createElement("span", {
        style: {
            color: "#ffd84d"
        }
    }, fn.mark), o.default.createElement("span", {
        style: {
            fontSize: 11,
            verticalAlign: "super",
            color: "rgba(255,255,255,0.7)"
        }
    }, "\u2122")), o.default.createElement("p", {
        className: "relative",
        style: {
            fontSize: 13,
            marginTop: 3,
            color: "rgba(255,255,255,0.94)",
            textShadow: "0 1px 8px rgba(3,7,18,0.5)"
        }
    }, fn.tagline), o.default.createElement("div", {
        className: "relative flex items-center gap-2 flex-wrap",
        style: {
            marginTop: 7
        }
    }, o.default.createElement("span", {
        style: {
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.74)"
        }
    }, fn.by), o.default.createElement("span", {
        className: "font-mono-time rounded-full px-2 py-0.5",
        style: {
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: "0.06em",
            background: "rgba(3,7,18,0.4)",
            border: "1px solid rgba(255,255,255,0.26)",
            color: "#ffd84d"
        }
    }, mo))))
}

function kk({
    toast: n
}) {
    if (!n) return null;
    let e = n.type === "error";
    return o.default.createElement("div", {
        className: `fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full shadow-lg text-sm font-medium text-white fade-anim ${e?"bg-red-600":"bg-slate-900"}`,
        style: {
            zIndex: Wt.toast
        }
    }, n.msg)
}

/* De unde vin banii de dus la școală. „Datoria" către școală nu e o sumă
   scrisă undeva: e diferența dintre tot ce ai încasat tu de la elevi și tot ce
   ai dus. Fereastra asta arată exact din ce se adună — plată cu plată — și ce
   ai dus până acum, ca să nu rămână nimic de crezut pe cuvânt. */
function IasProvenienta({ open: deschis, onClose: inchide, data: dateAp }) {
    if (!deschis) return null;
    let moneda = dateAp.settings.currency,
        bani = (x) => `${Math.round(x || 0).toLocaleString("ro-RO")} ${moneda}`,
        incasari = [];
    (dateAp.students || []).forEach((el) => {
        (el.payments || []).forEach((pl) => {
            if (pl.collector !== "school") incasari.push({ ...pl, elev: el.name, elevId: el.id });
        });
    });
    incasari.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    let totalIncasat = incasari.reduce((s2, x) => s2 + (Number(x.amount) || 0), 0),
        varsaminte = [...(dateAp.varsaminte || [])].sort((a, b) => (b.date || "").localeCompare(a.date || "")),
        totalDus = varsaminte.reduce((s2, x) => s2 + (Number(x.amount) || 0), 0),
        rest = totalIncasat - totalDus;

    return o.default.createElement(oi, {
        open: deschis, onClose: inchide, title: "De unde vin banii", layer: Wt.dialog
    },
        o.default.createElement("div", {
            className: "rounded-xl border px-3.5 py-3 mb-4",
            style: rest > 0
                ? { background: "var(--accent-soft)", borderColor: "var(--accent-line)" }
                : { background: "var(--ok-soft)", borderColor: "var(--ok-line)" }
        },
            o.default.createElement("div", { className: "flex items-center justify-between gap-2" },
                o.default.createElement("span", { className: "text-sm font-medium", style: { color: rest > 0 ? "var(--accent-ink)" : "var(--ok)" } },
                    rest > 0 ? "Mai ai de dus la \u0219coal\u0103" : "Ai dus tot"),
                o.default.createElement("span", { className: "font-mono-time text-lg font-semibold", style: { color: rest > 0 ? "var(--accent-ink)" : "var(--ok)" } },
                    bani(Math.abs(rest)))),
            o.default.createElement("div", { className: "text-xs text-slate-500 mt-1.5" },
                "\xCEncasat de tine ", bani(totalIncasat), " \u2212 dus la \u0219coal\u0103 ", bani(totalDus)),
            o.default.createElement("div", { className: "text-xs text-slate-400 mt-1" },
                "Banii achita\u021Bi direct la casieria \u0219colii nu intr\u0103 aici \u2014 n-au trecut prin m\xE2na ta.")),

        o.default.createElement("div", { className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-2" },
            "\xCEncasate de tine \xB7 ", incasari.length),
        incasari.length === 0
            ? o.default.createElement("div", { className: "text-sm text-slate-400 py-2" }, "Nicio \xEEncasare \xEEnc\u0103.")
            : o.default.createElement("div", { className: "space-y-1.5 mb-4" },
                incasari.map((pl) => o.default.createElement("div", {
                    key: pl.id,
                    className: "flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200"
                },
                    o.default.createElement("span", { className: "min-w-0" },
                        o.default.createElement("span", { className: "block text-sm text-slate-800 truncate" }, pl.elev),
                        o.default.createElement("span", { className: "block text-xs text-slate-400" }, pl.date ? qe(pl.date) : "\u2014")),
                    o.default.createElement("span", { className: "font-mono-time text-sm font-medium text-emerald-700 shrink-0" },
                        bani(Number(pl.amount) || 0))))),

        o.default.createElement("div", { className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-2" },
            "Duse la \u0219coal\u0103 \xB7 ", varsaminte.length),
        varsaminte.length === 0
            ? o.default.createElement("div", { className: "text-sm text-slate-400 py-2" }, "N-ai dus niciun ban \xEEnc\u0103.")
            : o.default.createElement("div", { className: "space-y-1.5" },
                varsaminte.map((v2) => o.default.createElement("div", {
                    key: v2.id,
                    className: "flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200"
                },
                    o.default.createElement("span", { className: "min-w-0" },
                        o.default.createElement("span", { className: "block text-sm text-slate-800" }, v2.date ? qe(v2.date) : "\u2014"),
                        v2.note ? o.default.createElement("span", { className: "block text-xs text-slate-400 truncate" }, v2.note) : null),
                    o.default.createElement("span", { className: "font-mono-time text-sm font-medium text-slate-900 shrink-0" },
                        bani(Number(v2.amount) || 0)))))
    )
}

/* Mașinile școlii. Numele e de obicei numărul de înmatriculare, dar poate fi
   orice te ajută să le deosebești. Cutia contează la planificare: elevii care
   învață pe automată nu pot fi programați pe o mașină manuală. */
function IasMasiniEditor({ masini: lista, onChange: schimba, implicita: iasImp, onImplicita: iasSetImp }) {
    let [ciorna, pune] = (0, o.useState)(null);

    function salveaza() {
        let nume = (ciorna.nume || "").trim();
        if (!nume) return;
        let m = { nume: nume, cutie: ciorna.cutie || "manuala", combustibil: (ciorna.combustibil || "").trim() };
        if (ciorna.id) schimba(lista.map(function (x) { return x.id === ciorna.id ? { ...x, ...m } : x }));
        else schimba([...lista, { id: Vt("masina"), ...m }]);
        pune(null);
    }

    return o.default.createElement(o.default.Fragment, null,
        o.default.createElement("p", { className: "text-xs text-slate-400 mb-2" },
            "Le legi de elevi pe fi\u0219a fiec\u0103ruia. Planul \xEEi a\u0219az\u0103 grupat pe cei cu aceea\u0219i ma\u0219in\u0103, ca s\u0103 n-o schimbi de la o \u0219edin\u021B\u0103 la alta."),

        o.default.createElement("div", { className: "space-y-1.5 mb-3" },
            lista.length === 0 && !ciorna
                ? o.default.createElement("div", { className: "text-sm text-slate-400 py-1" }, "Nicio ma\u0219in\u0103 \xEEnc\u0103.")
                : null,
            lista.map(function (m) {
                return o.default.createElement("div", {
                    key: m.id,
                    className: "flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200"
                },
                    o.default.createElement("button", {
                        onClick: function () { pune({ ...m }) },
                        className: "text-left flex-1 min-w-0"
                    },
                        o.default.createElement("div", { className: "text-sm text-slate-800 truncate" }, m.nume),
                        o.default.createElement("div", { className: "text-xs text-slate-400" },
                            m.cutie === "automata" ? "cutie automat\u0103" : "cutie manual\u0103",
                            m.combustibil ? " \xB7 " + m.combustibil : "")),
                    o.default.createElement("button", {
                        onClick: function () { schimba(lista.filter(function (x) { return x.id !== m.id })) },
                        className: "p-1.5 text-slate-400 shrink-0"
                    }, o.default.createElement(pa, { size: 15 })))
            })),

        ciorna
            ? o.default.createElement("div", { className: "bg-slate-50 rounded-xl p-3.5" },
                o.default.createElement("input", {
                    className: ie + " mb-2",
                    placeholder: "Num\u0103r de \xEEnmatriculare sau nume",
                    value: ciorna.nume || "",
                    onChange: function (ev) { pune({ ...ciorna, nume: ev.target.value }) }
                }),
                o.default.createElement("select", {
                    className: ie + " mb-2",
                    value: ciorna.cutie || "manuala",
                    onChange: function (ev) { pune({ ...ciorna, cutie: ev.target.value }) }
                },
                    o.default.createElement("option", { value: "manuala" }, "Cutie manual\u0103"),
                    o.default.createElement("option", { value: "automata" }, "Cutie automat\u0103")),
                o.default.createElement("input", {
                    className: ie + " mb-3",
                    placeholder: "Combustibil (op\u021Bional): benzin\u0103, motorin\u0103\u2026",
                    value: ciorna.combustibil || "",
                    onChange: function (ev) { pune({ ...ciorna, combustibil: ev.target.value }) }
                }),
                o.default.createElement("div", { className: "flex gap-2" },
                    o.default.createElement("button", {
                        onClick: function () { pune(null) },
                        className: "flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600"
                    }, "Renun\u021B\u0103"),
                    o.default.createElement("button", {
                        onClick: salveaza,
                        className: "flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm"
                    }, "Salveaz\u0103")))
            : o.default.createElement("button", {
                onClick: function () { pune({ nume: "", cutie: "manuala", combustibil: "" }) },
                className: "w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
            }, o.default.createElement(cn, { size: 14 }), "Ma\u0219in\u0103 nou\u0103"),

        lista.length > 1 && !ciorna
            ? o.default.createElement("div", { className: "mt-4" },
                o.default.createElement("span", {
                    className: "block text-xs font-medium text-slate-500 mb-1.5"
                }, "Ma\u0219ina implicit\u0103 pentru elevii noi"),
                o.default.createElement("select", {
                    className: ie,
                    value: iasImp || "",
                    onChange: function (ev) { iasSetImp(ev.target.value) }
                },
                    o.default.createElement("option", { value: "" }, "F\u0103r\u0103 \u2014 o aleg de fiecare dat\u0103"),
                    lista.map(function (m) {
                        return o.default.createElement("option", { key: m.id, value: m.id },
                            m.nume + " \xB7 " + (m.cutie === "automata" ? "automat\u0103" : "manual\u0103"))
                    })),
                o.default.createElement("p", { className: "text-xs text-slate-400 mt-1.5" },
                    "Elevii noi o primesc pe asta. Pe fi\u0219a fiec\u0103ruia po\u021Bi pune oric\xE2nd alta."))
            : lista.length === 1 && !ciorna
                ? o.default.createElement("p", {
                    className: "text-xs mt-3", style: { color: "var(--muted-2)" }
                }, "Fiind singura ma\u0219in\u0103, o primesc to\u021Bi elevii noi.")
                : null)
}

function oi({
    open: n,
    onClose: e,
    title: t,
    children: a,
    footer: r,
    layer: i = Wt.sheet
}) {
    return n ? o.default.createElement("div", {
        className: "fixed inset-0 flex items-center justify-center sheet-wrap ecran-peste",
        style: {
            zIndex: i
        }
    }, o.default.createElement("div", {
        /* Fundalul nu mai închide fereastra. Se închidea din greșeală, cu tot cu
           ce scriseseși în ea. Închiderea se face doar de la „×" sau de la
           butoanele din josul ferestrei. */
        className: "absolute inset-0 bg-slate-900/70 fade-anim",
        onClick: PA
    }), o.default.createElement("div", {
        className: "relative w-full max-w-lg bg-white rounded-2xl flex flex-col sheet-anim",
        style: {
            maxHeight: "100%",
            transformOrigin: `${IAS_ATINS.x}% ${IAS_ATINS.y}%`
        }
    }, o.default.createElement("div", {
        className: "flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0"
    }, o.default.createElement("h2", {
        className: "font-display text-lg font-semibold text-slate-900 uppercase tracking-wide"
    }, t), o.default.createElement("button", {
        onClick: e,
        "aria-label": "\xCEnchide",
        className: "btn-inchide p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
    }, o.default.createElement(ir, {
        size: 20
    }))), o.default.createElement("div", {
        className: "flex-1 min-h-0 overflow-y-auto px-5 pt-4",
        style: {
            paddingBottom: r ? "1rem" : "max(1.25rem, env(safe-area-inset-bottom))"
        }
    }, a), r && o.default.createElement("div", {
        className: "shrink-0 px-5 pt-3 border-t border-slate-100 bg-white",
        style: {
            paddingBottom: "max(0.875rem, env(safe-area-inset-bottom))"
        }
    }, r))) : null
}

/* Întrebarea de la închiderea unei ferestre în care ai scris ceva. Trei ieșiri
   limpezi: păstrezi, arunci, sau te întorci la ce făceai. */
function IasIntrebare({ open: iasO, onSalveaza: iasS, onRenunta: iasR, onInapoi: iasI }) {
    if (!iasO) return null;
    return o.default.createElement("div", {
        className: "fixed inset-0 flex items-center justify-center px-6 ecran-peste",
        style: { zIndex: Wt.dialog }
    }, o.default.createElement("div", {
        className: "absolute inset-0 bg-slate-900/50 fade-anim",
        onClick: PA
    }), o.default.createElement("div", {
        className: "relative bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm fade-anim"
    },
        o.default.createElement("h3", {
            className: "font-semibold text-slate-900 mb-1"
        }, "Ai modific\u0103ri nesalvate"),
        o.default.createElement("p", {
            className: "text-sm text-slate-500 mb-4"
        }, "Ce faci cu ele?"),
        o.default.createElement("button", {
            onClick: iasS,
            className: "w-full py-2.5 mb-2 rounded-xl bg-slate-900 text-white text-sm font-medium"
        }, "P\u0103streaz\u0103 modific\u0103rile"),
        o.default.createElement("button", {
            onClick: iasR,
            className: "w-full py-2.5 mb-2 rounded-xl border text-sm font-medium",
            style: { borderColor: "var(--bad-line)", color: "var(--bad)" }
        }, "Renun\u021B\u0103 la modific\u0103ri"),
        o.default.createElement("button", {
            onClick: iasI,
            className: "w-full py-2 text-sm text-slate-500"
        }, "\xCEnapoi la fi\u0219\u0103")))
}

function Ri({
    open: n,
    title: e,
    message: t,
    confirmLabel: a,
    danger: r,
    onConfirm: i,
    onCancel: s
}) {
    return n ? o.default.createElement("div", {
        className: "fixed inset-0 flex items-center justify-center px-6 ecran-peste",
        style: {
            zIndex: Wt.dialog
        }
    }, o.default.createElement("div", {
        className: "absolute inset-0 bg-slate-900/50 fade-anim",
        onClick: PA
    }), o.default.createElement("div", {
        className: "relative bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm fade-anim"
    }, o.default.createElement("h3", {
        className: "font-semibold text-slate-900 mb-1.5"
    }, e), o.default.createElement("p", {
        className: "text-sm text-slate-600 mb-5"
    }, t), o.default.createElement("div", {
        className: "flex gap-2.5"
    }, o.default.createElement("button", {
        onClick: s,
        className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm"
    }, "Renun\u021B\u0103"), o.default.createElement("button", {
        onClick: i,
        className: `flex-1 py-2.5 rounded-xl text-white font-medium text-sm ${r?"bg-red-600":"bg-slate-900"}`
    }, a || "Confirm\u0103")))) : null
}

function Nk({
    prompt: n,
    onClose: e
}) {
    let [t, a] = (0, o.useState)(""), [r, i] = (0, o.useState)(!1);
    if ((0, o.useEffect)(() => {
            n && (a(n.message), i(!1))
        }, [n]), !n) return null;
    async function s() {
        try {
            await navigator.clipboard.writeText(t), i(!0), n.onTrimis && n.onTrimis(), setTimeout(() => i(!1), 1500)
        } catch {}
    }
    return o.default.createElement("div", {
        className: "fixed inset-0 flex items-center justify-center px-5 ecran-peste",
        style: {
            zIndex: Wt.notify
        }
    }, o.default.createElement("div", {
        className: "absolute inset-0 bg-slate-900/50 fade-anim",
        onClick: PA
    }), o.default.createElement("div", {
        className: "relative bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm fade-anim"
    }, o.default.createElement("h3", {
        className: "font-semibold text-slate-900 mb-0.5"
    }, n.title), o.default.createElement("p", {
        className: "text-xs text-slate-400 mb-3"
    }, "Mesaj pentru ", n.name, " \u2014 po\u021Bi edita textul \xEEnainte de trimitere."), o.default.createElement("textarea", {
        rows: 6,
        className: ie,
        value: t,
        onChange: l => a(l.target.value)
    }), o.default.createElement("div", {
        className: "grid grid-cols-2 gap-2 mt-3"
    }, o.default.createElement("a", {
        href: ak(n.phone, t),
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: () => {
            n.onTrimis && n.onTrimis(), e()
        },
        style: {
            touchAction: "manipulation"
        },
        className: "py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm flex items-center justify-center gap-1.5"
    }, o.default.createElement(ai, {
        size: 15
    }), "WhatsApp"), o.default.createElement("a", {
        href: rk(n.phone, t),
        onClick: () => {
            n.onTrimis && n.onTrimis(), e()
        },
        style: {
            touchAction: "manipulation"
        },
        className: "py-2.5 rounded-xl bg-slate-900 text-white font-medium text-sm flex items-center justify-center gap-1.5"
    }, o.default.createElement(Na, {
        size: 15
    }), "SMS"), o.default.createElement("button", {
        onClick: s,
        className: "py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm flex items-center justify-center gap-1.5"
    }, o.default.createElement(ti, {
        size: 15
    }), r ? "Copiat \u2713" : "Copiaz\u0103"), o.default.createElement("button", {
        onClick: e,
        className: "py-2.5 rounded-xl border border-slate-200 text-slate-500 font-medium text-sm"
    }, "Mai t\xE2rziu"))))
}

function Pk({
    open: n,
    studentName: e,
    outstanding: t,
    currency: a,
    onClose: r,
    onSave: i
}) {
    let [s, l] = (0, o.useState)(""), [u, d] = (0, o.useState)("me");
    if ((0, o.useEffect)(() => {
            n && (l(String(Math.max(0, t))), d("me"))
        }, [n, t]), !n) return null;
    let f = Number(s),
        p = Number.isFinite(f) && f > 0;
    return o.default.createElement("div", {
        className: "fixed inset-0 flex items-center justify-center px-6 ecran-peste",
        style: {
            zIndex: Wt.dialog
        }
    }, o.default.createElement("div", {
        className: "absolute inset-0 bg-slate-900/50 fade-anim",
        onClick: PA
    }), o.default.createElement("div", {
        className: "relative bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm fade-anim"
    }, o.default.createElement("h3", {
        className: "font-semibold text-slate-900 mb-0.5"
    }, "\xCEnregistreaz\u0103 plata"), o.default.createElement("p", {
        className: "text-xs text-slate-400 mb-3"
    }, e, " \xB7 rest de plat\u0103: ", Math.max(0, t).toLocaleString("ro-RO"), " ", a, ". Modific\u0103 suma dac\u0103 plata e par\u021Bial\u0103."), o.default.createElement("div", {
        className: "flex items-center gap-2 mb-3"
    }, o.default.createElement("input", {
        type: "number",
        min: "0",
        inputMode: "decimal",
        className: ie,
        value: s,
        onChange: c => l(c.target.value)
    }), o.default.createElement("span", {
        className: "text-sm text-slate-500 shrink-0"
    }, a)), o.default.createElement("span", {
        className: "block text-xs font-medium text-slate-500 mb-1.5"
    }, "Cine a \xEEncasat"), o.default.createElement("div", {
        className: "flex gap-1.5 mb-1.5"
    }, o.default.createElement("button", {
        onClick: () => d("me"),
        className: `flex-1 py-2.5 rounded-xl text-xs font-medium border ${u==="me"?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200"}`
    }, "Eu"), o.default.createElement("button", {
        onClick: () => d("school"),
        className: `flex-1 py-2.5 rounded-xl text-xs font-medium border ${u==="school"?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200"}`
    }, "\u0218coala")), o.default.createElement("p", {
        className: "text-xs text-slate-400 mb-4"
    }, u === "school" ? "Scade datoria elevului, dar nu intr\u0103 la banii \xEEncasa\u021Bi de tine." : "Scade datoria elevului \u0219i intr\u0103 la \xEEncas\u0103rile tale din luna curent\u0103."), o.default.createElement("div", {
        className: "flex gap-2.5"
    }, o.default.createElement("button", {
        onClick: r,
        className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm"
    }, "Renun\u021B\u0103"), o.default.createElement("button", {
        onClick: () => p && i(f, u),
        disabled: !p,
        className: "flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm disabled:opacity-40"
    }, "Achit\u0103"))))
}

function Dk({
    open: n,
    payment: e,
    studentName: t,
    currency: a,
    onClose: r,
    onSave: i,
    onDelete: s
}) {
    let [l, u] = (0, o.useState)(""), [d, f] = (0, o.useState)(""), [p, c] = (0, o.useState)("me"), [m, g] = (0, o.useState)(!1);
    if ((0, o.useEffect)(() => {
            n && e && (u(String(Number(e.amount) || 0)), f(e.date || Be()), c(e.collector === "school" ? "school" : "me"), g(!1))
        }, [n, e]), !n || !e) return null;
    let v = Number(l),
        w = Number.isFinite(v) && v > 0 && !!d;
    return o.default.createElement("div", {
        className: "fixed inset-0 flex items-center justify-center px-6 ecran-peste",
        style: {
            zIndex: Wt.dialog
        }
    }, o.default.createElement("div", {
        className: "absolute inset-0 bg-slate-900/50 fade-anim",
        onClick: PA
    }), o.default.createElement("div", {
        className: "relative bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm fade-anim"
    }, o.default.createElement("h3", {
        className: "font-semibold text-slate-900 mb-0.5"
    }, "Corecteaz\u0103 plata"), o.default.createElement("p", {
        className: "text-xs text-slate-400 mb-3"
    }, t, " \xB7 \xEEnregistrat\u0103 ", e.date ? qe(e.date) : "\u2014", ", ", (Number(e.amount) || 0).toLocaleString("ro-RO"), " ", a, "."), o.default.createElement("span", {
        className: "block text-xs font-medium text-slate-500 mb-1.5"
    }, "Suma"), o.default.createElement("div", {
        className: "flex items-center gap-2 mb-3"
    }, o.default.createElement("input", {
        type: "number",
        min: "0",
        inputMode: "decimal",
        className: ie,
        value: l,
        onChange: x => u(x.target.value)
    }), o.default.createElement("span", {
        className: "text-sm text-slate-500 shrink-0"
    }, a)), o.default.createElement("span", {
        className: "block text-xs font-medium text-slate-500 mb-1.5"
    }, "Data pl\u0103\u021Bii"), o.default.createElement("input", {
        type: "date",
        className: `${ie} mb-3`,
        value: d,
        onChange: x => f(x.target.value)
    }), o.default.createElement("span", {
        className: "block text-xs font-medium text-slate-500 mb-1.5"
    }, "Cine a \xEEncasat"), o.default.createElement("div", {
        className: "flex gap-1.5 mb-1.5"
    }, o.default.createElement("button", {
        onClick: () => c("me"),
        className: `flex-1 py-2.5 rounded-xl text-xs font-medium border ${p==="me"?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200"}`
    }, "Eu"), o.default.createElement("button", {
        onClick: () => c("school"),
        className: `flex-1 py-2.5 rounded-xl text-xs font-medium border ${p==="school"?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200"}`
    }, "\u0218coala")), o.default.createElement("p", {
        className: "text-xs text-slate-400 mb-4"
    }, p === "school" ? "Scade datoria elevului, dar nu intr\u0103 la banii \xEEncasa\u021Bi de tine." : "Scade datoria elevului \u0219i intr\u0103 la \xEEncas\u0103rile tale din luna pl\u0103\u021Bii."), o.default.createElement("div", {
        className: "flex gap-2.5"
    }, o.default.createElement("button", {
        onClick: r,
        className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm"
    }, "Renun\u021B\u0103"), o.default.createElement("button", {
        onClick: () => w && i({
            amount: v,
            date: d,
            collector: p
        }),
        disabled: !w,
        className: "flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm disabled:opacity-40"
    }, "Salveaz\u0103")), m ? o.default.createElement("div", {
        className: "mt-2.5"
    }, o.default.createElement("p", {
        className: "text-xs text-red-600 mb-1.5 text-center"
    }, "Suma se \xEEntoarce la datoria elevului. Sigur?"), o.default.createElement("button", {
        onClick: s,
        className: "w-full py-2.5 rounded-xl bg-red-600 text-white font-medium text-sm"
    }, "Da, \u0219terge definitiv")) : o.default.createElement("button", {
        onClick: () => g(!0),
        className: "w-full mt-2.5 py-2.5 rounded-xl border border-red-200 text-red-600 font-medium text-sm flex items-center justify-center gap-1.5"
    }, o.default.createElement(pa, {
        size: 15
    }), "\u0218terge plata")))
}

function I0({
    status: n
}) {
    /* Starea ședinței, cu indicatorul rutier deasupra și numele dedesubt. Nu
       mai stă într-o pastilă cu chenar: lumina urmărește chiar conturul
       semnului și al scrisului, așa că se citește dintr-o privire, fără să
       taie cardul cu o cutie în plus. */
    let e = go[n] || go.scheduled,
        cul = IAS_CULOARE_STARE[n] || IAS_CULOARE_STARE.scheduled;
    return o.default.createElement("span", {
        className: "inline-flex flex-col items-center shrink-0",
        style: { gap: 3, width: 62 }
    },
        o.default.createElement("span", {
            style: {
                display: "block",
                filter: `drop-shadow(0 0 5px color-mix(in srgb, ${cul} 60%, transparent))`
            }
        }, o.default.createElement(IasSemn, { fel: n, size: 26 })),
        o.default.createElement("span", {
            style: {
                fontSize: 9.5, lineHeight: 1.1, textAlign: "center", fontWeight: 600,
                color: cul,
                textShadow: `0 0 7px color-mix(in srgb, ${cul} 45%, transparent)`
            }
        }, (IAS_STARI.filter(x => x.id === n)[0] || {}).scurt || e.label))
}

function Mw({
    result: n
}) {
    return n === "promovat" ? o.default.createElement("span", {
        className: "inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
    }, "Promovat") : n === "respins" ? o.default.createElement("span", {
        className: "inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200"
    }, "Respins") : o.default.createElement("span", {
        className: "inline-block text-xs px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 border border-slate-200"
    }, "\xCEn a\u0219teptare")
}

function Cf({
    value: n,
    colorCls: e = "bg-amber-500",
    heightCls: t = "h-1.5"
}) {
    let a = Math.max(0, Math.min(100, n));
    return o.default.createElement("div", {
        className: `${t} rounded-full bg-slate-100 overflow-hidden w-full`
    }, o.default.createElement("div", {
        className: `h-full ${e}`,
        style: {
            width: `${a}%`
        }
    }))
}

function tS({
    phone: n,
    compact: e
}) {
    if (!n) return null;
    let t = a => a.stopPropagation();
    return o.default.createElement("span", {
        className: "inline-flex items-center gap-3",
        onClick: t
    }, o.default.createElement("a", {
        href: tk(n),
        onClick: t,
        onPointerDown: t,
        onTouchStart: t,
        style: {
            touchAction: "manipulation"
        },
        className: `inline-flex items-center gap-1.5 text-slate-500 py-1.5 ${e?"text-xs":"text-sm"}`
    }, o.default.createElement(su, {
        size: e ? 13 : 15
    }), n), o.default.createElement("a", {
        href: nk(n),
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: t,
        onPointerDown: t,
        onTouchStart: t,
        "aria-label": "Mesaj WhatsApp",
        title: "Mesaj WhatsApp",
        style: {
            padding: 5,
            margin: -5,
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent"
        },
        className: "inline-flex items-center justify-center shrink-0"
    }, o.default.createElement("span", {
        className: `inline-flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 active:bg-emerald-100 ${e?"w-10 h-10":"w-11 h-11"}`
    }, o.default.createElement(ai, {
        size: e ? 18 : 21
    }))))
}
var Fk = [{
        l: 4,
        t: 16,
        c: "#f0900b",
        r: 18
    }, {
        l: 12,
        t: 64,
        c: "#00875a",
        r: -24
    }, {
        l: 21,
        t: 28,
        c: "#1f6fd0",
        r: 42
    }, {
        l: 30,
        t: 76,
        c: "#d0342c",
        r: -12
    }, {
        l: 39,
        t: 12,
        c: "#6d3fd4",
        r: 30
    }, {
        l: 48,
        t: 54,
        c: "#f0900b",
        r: -38
    }, {
        l: 57,
        t: 22,
        c: "#00875a",
        r: 14
    }, {
        l: 66,
        t: 70,
        c: "#1f6fd0",
        r: -28
    }, {
        l: 75,
        t: 32,
        c: "#d0342c",
        r: 36
    }, {
        l: 84,
        t: 60,
        c: "#6d3fd4",
        r: -16
    }, {
        l: 92,
        t: 24,
        c: "#f0900b",
        r: 24
    }, {
        l: 70,
        t: 10,
        c: "#00875a",
        r: -40
    }],
    Bk = [{
        l: 7,
        t: 6,
        c: "#d0342c",
        s: 15,
        d: "0s"
    }, {
        l: 87,
        t: 40,
        c: "#1f6fd0",
        s: 12,
        d: "1.1s"
    }, {
        l: 52,
        t: 3,
        c: "#6d3fd4",
        s: 10,
        d: ".6s"
    }];

function T0() {
    return o.default.createElement("span", {
        className: "absolute inset-0 overflow-hidden pointer-events-none",
        "aria-hidden": "true",
        style: {
            borderRadius: "inherit"
        }
    }, o.default.createElement("style", null, "@keyframes iasFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}"), Fk.map((n, e) => o.default.createElement("span", {
        key: `c${e}`,
        style: {
            position: "absolute",
            left: `${n.l}%`,
            top: `${n.t}%`,
            width: 5,
            height: 8,
            background: n.c,
            opacity: .42,
            borderRadius: 1,
            transform: `rotate(${n.r}deg)`
        }
    })), Bk.map((n, e) => o.default.createElement("span", {
        key: `b${e}`,
        style: {
            position: "absolute",
            left: `${n.l}%`,
            top: `${n.t}%`,
            animation: `iasFloat 3.6s ease-in-out ${n.d} infinite`
        }
    }, o.default.createElement("span", {
        style: {
            display: "block",
            width: n.s,
            height: n.s * 1.25,
            borderRadius: "50%",
            background: n.c,
            opacity: .34
        }
    }), o.default.createElement("span", {
        style: {
            display: "block",
            width: 1,
            height: n.s * .9,
            margin: "0 auto",
            background: n.c,
            opacity: .24
        }
    }))))
}

/* Explicațiile de sub câmpuri stăteau mereu la vedere. Acum stau într-un „i"
   încercuit: îl atingi când ai nevoie, îl închizi când te-ai lămurit. */
function IasInfo({ text: iasT }) {
    let [deschis, arata] = (0, o.useState)(!1);
    return o.default.createElement("span", { className: "inline-block" },
        o.default.createElement("button", {
            type: "button", onClick: () => arata(!deschis), "aria-label": "Explica\u021Bie",
            className: "inline-flex items-center justify-center align-middle ml-1.5",
            style: {
                width: 17, height: 17, borderRadius: 99, fontSize: 11, fontWeight: 700,
                lineHeight: 1, fontStyle: "italic",
                border: `1px solid ${deschis ? "var(--accent)" : "var(--line-2)"}`,
                background: deschis ? "var(--accent-soft)" : "transparent",
                color: deschis ? "var(--accent-ink)" : "var(--muted-2)"
            }
        }, "i"),
        deschis ? o.default.createElement("span", {
            className: "block rounded-xl px-3 py-2.5 mb-3.5 mt-1.5",
            style: { background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }
        }, o.default.createElement("span", {
            className: "block text-xs", style: { color: "var(--accent-ink)" }
        }, iasT), o.default.createElement("button", {
            type: "button", onClick: () => arata(!1),
            className: "mt-1.5 text-xs font-medium", style: { color: "var(--accent-ink)" }
        }, "\xD7 \xEEnchide")) : null)
}

/* Două file una lângă alta, din care se vede o singură dată. Folosit la examene:
   deschideai un grup și înăuntru dădeai peste alte două care se pliau, ceea ce
   se citea greu. Acum alegi practicul sau teoreticul, ca la un comutator. */
/* Notițele elevului. Erau una singură, un text lung în care se amestecau toate.
   Acum sunt mai multe, fiecare cu ziua ei, ca la un carnet: le adaugi pe rând,
   le schimbi, le ștergi. Textul vechi se păstrează ca primă notiță. */
function iasNotite(elev) {
    if (!elev) return [];
    if (Array.isArray(elev.notite)) return elev.notite;
    let vechi = (elev.notes || "").trim();
    return vechi ? [{ id: "veche", text: vechi, data: elev.enrollDate || "" }] : [];
}

/* Ce notiță se arată pe cardul unei ședințe. Sunt două feluri de notițe în
   aplicație, și e ușor să le încurci:

     · notița ședinței — scrisă în fișa ei, sub „Detalii avansate", și ține
       doar de ziua aceea („de repetat parcarea");
     · notițele elevului — din agenda lui, și țin de el, la orice ședință
       („școlarizare în rate").

   Pe card o arătăm pe cea a ședinței, fiindcă e cea anume. Dacă ședința n-are
   una, punem cea mai nouă notiță a elevului: tot ce ai scris trebuie să se
   vadă undeva, nu să stea îngropat. */
function iasNotitaDeCard(sesiune, elev) {
    var aSa = ((sesiune || {}).notes || "").trim();
    if (aSa) return { text: aSa, aElevului: !1 };
    var ale = iasNotite(elev);
    var ultima = ale.length ? ale[ale.length - 1] : null;
    var t = ultima ? (ultima.text || "").trim() : "";
    return t ? { text: t, aElevului: !0 } : null
}

function IasNotite({ notite: lista, onChange: schimba }) {
    let [ciorna, pune] = (0, o.useState)(null);
    function salveaza() {
        let t = (ciorna.text || "").trim();
        if (!t) { pune(null); return }
        if (ciorna.id) schimba(lista.map(x => x.id === ciorna.id ? { ...x, text: t } : x));
        else schimba([...lista, { id: Vt("nota"), text: t, data: Be() }]);
        pune(null);
    }
    return o.default.createElement(o.default.Fragment, null,
        o.default.createElement("div", { className: "space-y-1.5 mb-2" },
            lista.length === 0 && !ciorna
                ? o.default.createElement("div", { className: "text-sm text-slate-400 py-1" }, "Nicio noti\u021B\u0103 \xEEnc\u0103.")
                : null,
            lista.map(nt => o.default.createElement("div", {
                key: nt.id,
                className: "flex items-start gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200"
            },
                o.default.createElement("button", {
                    type: "button", onClick: () => pune({ ...nt }),
                    className: "text-left flex-1 min-w-0"
                },
                    o.default.createElement("span", {
                        className: "block text-sm text-slate-800",
                        style: { whiteSpace: "pre-wrap" }
                    }, nt.text),
                    nt.data ? o.default.createElement("span", {
                        className: "block text-xs text-slate-400 mt-0.5"
                    }, qe(nt.data)) : null),
                o.default.createElement("button", {
                    type: "button",
                    onClick: () => schimba(lista.filter(x => x.id !== nt.id)),
                    className: "p-1.5 text-slate-400 shrink-0"
                }, o.default.createElement(pa, { size: 15 }))))),
        ciorna
            ? o.default.createElement("div", { className: "bg-slate-50 rounded-xl p-3" },
                o.default.createElement("textarea", {
                    rows: 3, className: ie, autoFocus: !0,
                    placeholder: "Ce vrei s\u0103 \u021Bii minte despre el",
                    value: ciorna.text || "",
                    onChange: ev => pune({ ...ciorna, text: ev.target.value })
                }),
                o.default.createElement("div", { className: "flex gap-2 mt-2" },
                    o.default.createElement("button", {
                        type: "button", onClick: () => pune(null),
                        className: "flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600"
                    }, "Renun\u021B\u0103"),
                    o.default.createElement("button", {
                        type: "button", onClick: salveaza,
                        className: "flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm"
                    }, "Salveaz\u0103")))
            : o.default.createElement("button", {
                type: "button", onClick: () => pune({ text: "" }),
                className: "w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
            }, o.default.createElement(cn, { size: 14 }), "Noti\u021B\u0103 nou\u0103"))
}

/* O schimbare din „Ce e nou". Pe ecran stă doar titlul; amănuntele se deschid
   dacă le ceri. Altfel lista devine un perete de text pe care nimeni nu-l
   citește, iar ce e important se pierde printre mărunțișuri. */
function IasNoutate({ intrare: iasN, scurt: iasScurt }) {
    let [deschis, arata] = (0, o.useState)(!1);
    /* Pe scurt: titlul și o frază dedesubt, mereu la vedere. E felul în care
       văd „Ce e nou” ceilalți utilizatori: ce s-a schimbat pentru ei, fără
       amănunte de construcție. */
    if (iasScurt) return o.default.createElement("div", { className: "mb-3", "data-ias-noutate-scurt": iasN.v },
        o.default.createElement("div", { className: "flex items-baseline gap-2" },
            o.default.createElement("span", { className: "text-sm font-semibold text-slate-900 flex-1" }, iasN.titlu),
            o.default.createElement("span", { className: "font-mono-time text-xs text-slate-400" }, iasN.eticheta || iasN.v)),
        o.default.createElement("p", { className: "text-xs text-slate-600 mt-0.5" }, iasN.scurt));
    return o.default.createElement("div", { className: "mb-2" },
        o.default.createElement("button", {
            type: "button", onClick: () => arata(!deschis),
            className: "w-full flex items-baseline gap-2 py-1.5 text-left"
        },
            o.default.createElement("span", {
                className: "text-sm font-semibold text-slate-900 flex-1"
            }, iasN.titlu),
            o.default.createElement("span", {
                className: "font-mono-time text-xs text-slate-400"
            }, iasN.eticheta || iasN.v),
            o.default.createElement("span", {
                className: "text-xs shrink-0",
                style: { color: "var(--accent)" }
            }, deschis ? "\u2212" : "+")),
        deschis ? o.default.createElement("ul", { className: "mt-1 mb-2 space-y-1.5" },
            iasN.puncte.map((pct, k) => o.default.createElement("li", {
                key: k, className: "flex gap-2 text-xs text-slate-600"
            }, o.default.createElement("span", {
                className: "shrink-0", style: { color: "var(--accent)" }
            }, "\u2022"), o.default.createElement("span", null, pct)))) : null)
}

/* ============ INDICATOARE RUTIERE PENTRU STAREA ȘEDINȚEI ============
   Patru semne pe care un instructor le citește dintr-o privire, fără să
   descifreze text: STOP pentru anulată, „Alte pericole" pentru cea care
   așteaptă confirmarea, „Drum cu prioritate" pentru cea programată, și
   „Sfârșitul tuturor restricțiilor" pentru cea efectuată. */

function IasSemn({ fel: iasF, size: iasS = 34, stins: iasSt }) {
    var o_ = iasSt ? .32 : 1;
    var comun = { width: iasS, height: iasS, viewBox: "0 0 40 40", style: { opacity: o_, display: "block" } };
    if (iasF === "cancelled") {
        /* ACCESUL INTERZIS: cerc roșu cu bară albă pe mijloc. Era desenat ca un
           octogon — adică forma lui STOP — dar cu bara de la „interzis"
           înăuntru. Două semne diferite amestecate într-unul singur. Cercul e
           cel potrivit aici: ședința nu se mai ține, nu e un semn de oprire. */
        return o.default.createElement("svg", comun,
            o.default.createElement("circle", {
                cx: 20, cy: 20, r: 17.5,
                fill: "#c0392b", stroke: "#fff", strokeWidth: 2.5
            }),
            o.default.createElement("rect", {
                x: 7.5, y: 17.4, width: 25, height: 5.2, rx: 1.2, fill: "#fff"
            }))
    }
    if (iasF === "pending") {
        // ALTE PERICOLE: triunghi cu semnul exclamării
        return o.default.createElement("svg", comun,
            o.default.createElement("polygon", {
                points: "20,3 38,35 2,35", fill: "#fff", stroke: "#c0392b", strokeWidth: 3.4,
                strokeLinejoin: "round"
            }),
            o.default.createElement("rect", { x: 18.4, y: 14, width: 3.2, height: 11, rx: 1.4, fill: "#1a1a1a" }),
            o.default.createElement("circle", { cx: 20, cy: 29.6, r: 2, fill: "#1a1a1a" }))
    }
    if (iasF === "completed") {
        // SFÂRȘITUL TUTUROR RESTRICȚIILOR: cerc alb tăiat oblic
        return o.default.createElement("svg", comun,
            o.default.createElement("circle", { cx: 20, cy: 20, r: 17, fill: "#fff", stroke: "#4a4a4a", strokeWidth: 2.4 }),
            [0, 1, 2, 3, 4].map(k => o.default.createElement("line", {
                key: k, x1: 9 + k * 1.6, y1: 31 - k * 1.6, x2: 31 - k * 1.6, y2: 9 + k * 1.6,
                stroke: "#4a4a4a", strokeWidth: 1.5, strokeLinecap: "round"
            })))
    }
    // DRUM CU PRIORITATE: romb galben cu chenar alb
    return o.default.createElement("svg", comun,
        o.default.createElement("polygon", { points: "20,2 38,20 20,38 2,20", fill: "#fff", stroke: "#2b2b2b", strokeWidth: 1.6 }),
        o.default.createElement("polygon", { points: "20,8 32,20 20,32 8,20", fill: "#f5c518" }))
}

/* Culoarea fiecărei stări, ținută într-un singur loc: o folosesc și pătratele
   din formular, și cardurile de pe Acasă. */
var IAS_CULOARE_STARE = {
    scheduled: "#2b6cb0",
    pending: "#c2810a",
    completed: "#00875a",
    cancelled: "#c0392b"
};

var IAS_STARI = [
    { id: "scheduled", nume: "Programat\u0103", scurt: "Programat\u0103" },
    { id: "pending", nume: "A\u0219teapt\u0103 confirmare", scurt: "A\u0219teapt\u0103" },
    { id: "completed", nume: "Efectuat\u0103", scurt: "Efectuat\u0103", doarEdit: !0 },
    { id: "cancelled", nume: "Anulat\u0103", scurt: "Anulat\u0103", doarEdit: !0 }
];

/* Alegerea stării: patru semne, două pe rând. Selectat nu înseamnă doar
   culoare — semnul rămâne aprins, restul se sting, iar cel ales are chenar
   gros și fundal propriu. */
function IasStare({ value: iasV, onChange: iasC, edit: iasE }) {
    /* Patru pătrate egale: semnul sus, numele dedesubt. Cel ales se aprinde —
       crește, capătă chenar gros și o lumină în jur — iar celelalte se retrag și
       pălesc. Diferența se vede de la o jumătate de metru, nu doar prin culoare,
       ca să se citească și pe soare, și de cine nu deosebește bine culorile. */
    var stari = IAS_STARI.filter(x => !x.doarEdit || iasE);
    return o.default.createElement("div", { className: "mb-3.5" },
        o.default.createElement("span", {
            className: "block text-xs font-medium text-slate-500 mb-1.5"
        }, "Status"),
        o.default.createElement("div", {
            style: { display: "grid", gridTemplateColumns: `repeat(${stari.length}, 1fr)`, gap: 7 }
        }, stari.map(st => {
            var ales = iasV === st.id, cul = IAS_CULOARE_STARE[st.id];
            return o.default.createElement("button", {
                key: st.id, type: "button", onClick: () => iasC(st.id),
                "aria-pressed": ales,
                style: {
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: 6,
                    padding: "11px 3px", borderRadius: 16, minHeight: 84,
                    background: ales ? `color-mix(in srgb, ${cul} 13%, var(--surface))` : "var(--surface)",
                    border: `${ales ? 2 : 1}px solid ${ales ? cul : "var(--line)"}`,
                    boxShadow: ales ? `0 4px 18px -6px ${cul}` : "none",
                    transform: ales ? "scale(1.05)" : "scale(.94)",
                    transition: "transform .18s cubic-bezier(.2,.9,.3,1), box-shadow .18s ease, background .18s ease, border-color .18s ease"
                }
            },
                o.default.createElement("span", {
                    style: {
                        display: "block",
                        transform: ales ? "scale(1.14)" : "scale(1)",
                        filter: ales ? `drop-shadow(0 0 6px color-mix(in srgb, ${cul} 55%, transparent))` : "none",
                        transition: "transform .18s cubic-bezier(.2,.9,.3,1), filter .18s ease"
                    }
                }, o.default.createElement(IasSemn, { fel: st.id, size: 32, stins: !ales })),
                o.default.createElement("span", {
                    style: {
                        fontSize: 10, lineHeight: 1.15, textAlign: "center",
                        fontWeight: ales ? 700 : 400,
                        color: ales ? cul : "var(--muted-2)",
                        textShadow: ales ? `0 0 8px color-mix(in srgb, ${cul} 40%, transparent)` : "none",
                        transition: "color .18s ease"
                    }
                }, st.scurt || st.nume))
        })))
}

/* Locul de întâlnire, într-un singur rând. Lista din Setări poate crește
   oricât — se deschide într-o fereastră cu căutare, deci formularul rămâne la
   fel de scurt și cu cinci locuri, și cu treizeci. */
/* La atingerea unui câmp dintr-o fereastră, îl aducem în dreptul ochiului după
   ce tastatura a apucat să urce. Fără pasul ăsta, câmpul de căutare rămâne sub
   taste chiar dacă fereastra s-a așezat cum trebuie. */
function iasAdu(ev) {
    /* Câmpul atins urcă în capul zonei vizibile, nu în mijlocul ei: sub el se
       deschide de obicei o listă, iar lista are nevoie de tot locul rămas. */
    var camp = ev.currentTarget;
    setTimeout(function () {
        try { camp.scrollIntoView({ block: "start", behavior: "smooth" }) } catch (e) {}
    }, 320)
}

/* Locurile de întâlnire, așezate după cât de des le folosești. Cele la care duci
   elevii în fiecare zi urcă în față, ca să le atingi din prima; cele rare cad
   spre coadă. Se numără din ședințele tale, deci ordinea se așază singură, în
   timp, fără să reglezi nimic.

   Ordinea din Setări rămâne cea de bază: la folosiri egale, locurile își
   păstrează rândul pe care i l-ai dat tu. */
function iasLocuriDesFolosite(locatii, sesiuni) {
    var lista = locatii || [];
    if (!sesiuni || !sesiuni.length) return lista;
    var cate = {};
    sesiuni.forEach(function (x) {
        if (!x || x.status === "cancelled" || !x.location) return;
        cate[x.location] = (cate[x.location] || 0) + 1
    });
    return lista.map(function (loc, k) { return { loc: loc, k: k, n: cate[loc.name] || 0 } })
        .sort(function (a, b) { return b.n - a.n || a.k - b.k })
        .map(function (x) { return x.loc })
}

function IasLoc({ value: iasV, onChange: iasC, locations: iasL, harta: iasH }) {
    /* Locurile obișnuite stau la vedere, ca butoane: o singură apăsare și ai
       ales. Încap două rânduri; dacă ai mai multe, restul se deschid într-o
       listă, ca formularul să nu crească la nesfârșit. */
    var [deschis, arata] = (0, o.useState)(!1), [caut, pune] = (0, o.useState)("");
    var toate = iasL || [];
    var q = pu(caut).trim();
    var lista = q ? toate.filter(x => pu(x.name).includes(q)) : toate;
    var LAVEDERE = 6;
    var alege = function (nume) { iasC(nume), arata(!1), pune("") };
    /* Locul ales stă mereu printre cele la vedere, chiar dacă e mai jos în
       listă — altfel n-ai vedea pe ce ai pus ședința. */
    var primele = toate.slice(0, LAVEDERE);
    if (iasV && iasV.trim() && !primele.some(x => x.name === iasV)) {
        var alesul = toate.filter(x => x.name === iasV)[0];
        primele = (alesul ? [alesul] : [{ id: "scris", name: iasV }]).concat(primele).slice(0, LAVEDERE);
    }

    return o.default.createElement("div", { className: "mb-3.5" },
        o.default.createElement("span", {
            className: "block text-xs font-medium text-slate-500 mb-1.5"
        }, "Loc de \xEEnt\xE2lnire"),

        toate.length || (iasV && iasV.trim())
            ? o.default.createElement("div", {
                style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }
            }, primele.map(function (loc) {
                var ales = iasV === loc.name;
                return o.default.createElement("button", {
                    key: loc.id, type: "button",
                    onClick: function () { iasC(ales ? "" : loc.name) },
                    className: "px-2 py-2.5 rounded-xl text-xs text-center",
                    style: {
                        minHeight: 46, lineHeight: 1.2,
                        background: ales ? "var(--accent-soft)" : "var(--surface)",
                        color: ales ? "var(--accent-ink)" : "var(--muted)",
                        fontWeight: ales ? 600 : 400,
                        border: `${ales ? 2 : 1}px solid ${ales ? "var(--accent)" : "var(--line)"}`
                    }
                }, loc.name)
            }))
            : null,

        o.default.createElement("button", {
            type: "button", onClick: function () { arata(!0), pune("") },
            className: "w-full flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-left",
            style: { background: "var(--surface)", border: "1px dashed var(--line-2)" }
        },
            o.default.createElement(dn, { size: 14, className: "shrink-0", style: { color: "var(--muted-2)" } }),
            o.default.createElement("span", { className: "flex-1 text-xs", style: { color: "var(--muted-2)" } },
                toate.length > LAVEDERE
                    ? `Toate locurile (${toate.length}) sau scrie unul nou`
                    : "Alt loc, scris de tine"),
            o.default.createElement(un, { size: 14, className: "shrink-0 text-slate-300" })),
        iasV && iasV.trim() && iasH ? iasH : null,

        o.default.createElement(oi, {
            open: deschis, onClose: function () { arata(!1) },
            title: "Punct de \xEEnt\xE2lnire", layer: Wt.dialog
        }, deschis ? o.default.createElement("div", null,
            /* Lista întâi, căutarea abia când chiar ai multe locuri. */
            o.default.createElement("div", {
                className: "space-y-1.5",
                style: { maxHeight: "calc(var(--ias-vazut, 100vh) - 250px)", minHeight: 120, overflowY: "auto" }
            },
                lista.length === 0
                    ? o.default.createElement("div", { className: "text-sm text-slate-400 py-2 text-center" },
                        toate.length ? "Niciun loc nu se potrive\u0219te." : "Nicio loca\u021Bie \xEEn Set\u0103ri \u2014 scrie una mai jos.")
                    : null,
                lista.map(function (loc) {
                    var ales = iasV === loc.name;
                    return o.default.createElement("button", {
                        key: loc.id, type: "button",
                        onClick: function () { alege(loc.name) },
                        className: "w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left",
                        style: {
                            minHeight: 48,
                            background: ales ? "var(--accent-soft)" : "var(--surface)",
                            border: `${ales ? 2 : 1}px solid ${ales ? "var(--accent)" : "var(--line)"}`
                        }
                    },
                        o.default.createElement(dn, {
                            size: 14, className: "shrink-0",
                            style: { color: ales ? "var(--accent)" : "var(--muted-2)" }
                        }),
                        o.default.createElement("span", {
                            className: "flex-1 min-w-0 truncate text-sm",
                            style: { color: ales ? "var(--accent-ink)" : "var(--text)", fontWeight: ales ? 600 : 400 }
                        }, loc.name),
                        ales ? o.default.createElement("span", {
                            className: "shrink-0", style: { color: "var(--accent)" }
                        }, "\u2713") : null)
                })),
            o.default.createElement("input", {
                className: ie + " mt-3",
                placeholder: toate.length > 8 ? "Caut\u0103 sau scrie un loc nou" : "Scrie un loc nou",
                onFocus: iasAdu,
                type: "search", inputMode: "search", name: "cauta-loc",
                autoComplete: "off", autoCorrect: "off", spellCheck: !1, enterKeyHint: "search",
                value: caut, onChange: function (ev) { pune(ev.target.value) }
            }),
            q && !toate.some(function (x) { return x.name === caut.trim() })
                ? o.default.createElement("button", {
                    type: "button", onClick: function () { alege(caut.trim()) },
                    className: "w-full mt-2 py-2.5 rounded-xl text-white text-sm font-medium",
                    style: { background: "var(--invert)" }
                }, "Folose\u0219te \u201E", caut.trim(), "\u201D")
                : null,
            iasV && iasV.trim()
                ? o.default.createElement("button", {
                    type: "button", onClick: function () { alege("") },
                    className: "w-full mt-2 py-2.5 rounded-xl text-sm",
                    style: { color: "var(--muted-2)" }
                }, "F\u0103r\u0103 loc de \xEEnt\xE2lnire")
                : null) : null))
}
function IasFile({ etichete: iasEt, copii: iasCp, dela: iasDela = 0 }) {
    /* Fila de pornire: de obicei prima, dar când vii din înștiințarea „gata de
       sală" se deschide drept pe Teoretic, fiindcă acolo ai treabă. */
    let [ales, alege] = (0, o.useState)(iasDela);
    return o.default.createElement("div", null,
        o.default.createElement("div", { className: "flex gap-1.5 mb-3" },
            iasEt.map((e, n) => o.default.createElement("button", {
                key: n, type: "button", onClick: () => alege(n),
                className: `flex-1 py-2 rounded-xl text-xs font-medium border ${n === ales ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200"}`
            }, e))),
        iasCp[ales])
}

function Jn({
    title: n,
    summary: e,
    children: t,
    defaultOpen: a = !1,
    forteaza: iasF,
    faraUrcare: iasFaraUrcare,
    semn: iasSemn
}) {
    let [r, i] = (0, o.useState)(a), iasCap = (0, o.useRef)(null);

    /* Când deschizi o listă, capul ei urcă în susul ecranului. Altfel se
       desfășoară pe sub marginea de jos și trebuie să derulezi ca să vezi ce e
       înăuntru. Se face lin și doar la deschidere, nu la închidere. */
    function iasUrca() {
        /* Fereastra se deschide într-o secundă, cu tot cu animație. Dacă dăm
           comanda de derulare la 90 de milisecunde, elementul e încă în
           mișcare: poziția socotită atunci e greșită, iar cutia lui nici nu e
           încă destul de plină ca să aibă ce derula.

           De aceea încercăm de mai multe ori, până după ce animația s-a
           terminat, și ne oprim când capul secțiunii a ajuns sus. Folosim
           scrollIntoView, care găsește el singur containerul potrivit — fie
           cutia fișei, fie pagina. */
        var incercari = [120, 420, 780, 1150, 1500];
        incercari.forEach(function (cand) {
            setTimeout(function () {
                try {
                    var el = iasCap.current;
                    if (!el) return;
                    var sus = el.getBoundingClientRect().top;
                    if (sus >= 0 && sus <= 120) return;   // deja e la vedere
                    el.scrollIntoView({ block: "start", behavior: "smooth" })
                } catch (x) {}
            }, cand)
        })
    }
    /* Un grup pe care l-ai strâns rămâne strâns — și bine face. Dar la căutare,
       dacă are pe cineva potrivit, se deschide singur: altfel elevul căutat
       stătea ascuns înăuntru și părea că nu există. */
    (0, o.useEffect)(() => {
        if (!iasF) return;
        i(!0);
        /* Deschisă din afară — de pildă din înștiințarea de pe Acasă — secțiunea
           se aduce singură în câmpul vizual, altfel rămâne undeva jos și tot
           trebuie s-o cauți. La căutare însă nu: acolo se deschide pe loc și
           atât. Altfel, la fiecare literă care găsea pe cineva printre
           promovați sau retrași, lista fugea singură în jos, la grupul lor, de
           cinci ori în secundă și jumătate. */
        iasFaraUrcare || iasUrca()
    }, [iasF]);
    return o.default.createElement("div", {
        className: "mb-3"
    }, o.default.createElement("button", {
        type: "button",
        ref: iasCap,
        onClick: () => { r || iasUrca(), i(!r) },
        className: "relative w-full flex items-center gap-2 py-1.5"
    },
    /* Semnul de înștiințare stă în colțul din dreapta sus al rândului, ca
       bulina de pe aplicațiile de mail. */
    iasSemn ? o.default.createElement("span", {
        style: { position: "absolute", right: -4, top: -3 }
    }, iasSemn) : null,
    o.default.createElement("span", {
        className: "text-xs font-medium text-slate-400 uppercase tracking-wide flex-1 text-left"
    }, n), e ? o.default.createElement("span", {
        className: "text-xs text-slate-400 truncate"
    }, e) : null, o.default.createElement(un, {
        size: 14,
        className: "text-slate-400 shrink-0",
        style: {
            transform: r ? "rotate(90deg)" : "none",
            transition: "transform .2s"
        }
    })), r && o.default.createElement("div", {
        className: "mt-1 ias-derulare"
    }, t))
}

function xe({
    label: n,
    children: e,
    required: t
}) {
    return o.default.createElement("label", {
        className: "block mb-3.5"
    }, o.default.createElement("span", {
        className: "block text-xs font-medium text-slate-500 mb-1.5"
    }, n, t && o.default.createElement("span", {
        className: "text-amber-600"
    }, " *")), e)
}

function nS({
    locations: n,
    value: e,
    onPick: t
}) {
    return !n || n.length === 0 ? null : o.default.createElement("div", {
        className: "flex flex-wrap gap-1.5 -mt-2 mb-3.5"
    }, n.map(a => o.default.createElement("button", {
        key: a.id,
        type: "button",
        onClick: () => t(a.name),
        className: `text-xs px-2.5 py-1 rounded-full border ${e===a.name?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-600 border-slate-200"}`
    }, a.name)))
}

function zk({
    data: n,
    onOpenSession: e,
    onAddStudent: t,
    onAddSession: a,
    onGoToPlanner: r,
    onOpenStudent: i,
    onGoToCalendar: s,
    onOpenExamene: iasLaExamene,
    onGoToSettings: iasLaSetari,
    onOpenScolarizare: iasLaScolarizare
}) {
    let [iasSalaDesfacuta, iasDesfaSala] = (0, o.useState)(!1),
        [iasPromovatiDesfacuti, iasDesfaPromovati] = (0, o.useState)(!1),
        [iasActiuni, iasCereActiuni] = (0, o.useState)(!1);
    let l = Be(),
        u = l.slice(0, 7),
        d = n.sessions.filter(z => z.date === l && z.status !== "cancelled").sort((z, q) => z.startMin - q.startMin),
        f = Gi(Ue(l)),
        p = ft(f),
        c = ft(pn(f, 6)),
        m = n.sessions.filter(z => z.date >= p && z.date <= c && z.status !== "cancelled").length,
        g = Ww(n.sessions, n.settings, u),
        v = (z, q) => (z.date + Se(z.startMin)).localeCompare(q.date + Se(q.startMin)),
        w = n.sessions.filter(z => (z.status === "scheduled" || z.status === "pending") && z.date < l).sort(v),
        x = n.sessions.filter(z => z.status === "pending" && z.date >= l).sort(v),
        h = w.length,
        y = x.length,
        _ = w[0],
        b = x[0],
        M = n.students.filter(z => kf(z, n.sessions, n.settings) === 0 && Pf(z)),
        S = [],
        k = ft(pn(Ue(l), 14));
    // cine vine la perfecționare n-are examene de dat
    n.students.filter(z => !z.withdrawn && !z.perfectionare).forEach(z => {
        z.examResult !== "promovat" && z.examDate && (z.examDate <= l ? S.push({
            student: z,
            date: z.examDate,
            kind: "practic",
            due: !0
        }) : z.examDate <= k && S.push({
            student: z,
            date: z.examDate,
            kind: "practic"
        })), z.theoryExamResult !== "promovat" && z.theoryExamDate && z.theoryExamDate >= l && z.theoryExamDate <= k && S.push({
            student: z,
            date: z.theoryExamDate,
            kind: "teoretic"
        })
    }), S.sort((z, q) => {
        /* Practicele sus, teoreticele jos — practicul e cel care-ți umple ziua
           cu ședințe, teoreticul e doar de ținut minte. În fiecare grup,
           ordinea rămâne calendaristică. */
        let iasA = z.kind === "teoretic" ? 1 : 0,
            iasB = q.kind === "teoretic" ? 1 : 0;
        return iasA !== iasB ? iasA - iasB : z.date.localeCompare(q.date)
    });
    let E = n.students.length,
        B = n.students.filter(z => z.examResult === "promovat").length,
        $ = E ? Math.round(B / E * 100) : 0,
        G = n.students.filter(z => z.theoryExamResult === "promovat").length,
        A = n.students.filter(z => z.theoryExamResult === "respins").length,
        O = B,
        N = n.students.filter(z => z.examResult === "respins").length,
        C = n.students.reduce((z, q) => z + (Number(q.theoryExamAttempts) || 0), 0),
        W = n.students.reduce((z, q) => z + (Number(q.examAttempts) || 0), 0),
        X = z => n.students.find(q => q.id === z)?.name || "Elev \u0219ters",
        R = Ue(l),
        K = `${Tw[R.getDay()]}, ${R.getDate()} ${yo[R.getMonth()]} ${R.getFullYear()}`,
        ne = lk(n.students, n.sessions, l),
        Y = h > 0 || y > 0 || M.length > 0 || S.length > 0 || ne.length > 0;

    function J({
        label: z,
        pass: q,
        fail: de,
        attempts: ge
    }) {
        let ye = q + de;
        return o.default.createElement("div", {
            className: "mb-2.5 last:mb-0"
        }, o.default.createElement("div", {
            className: "flex items-center justify-between text-xs mb-1"
        }, o.default.createElement("span", {
            className: "text-slate-500"
        }, z), o.default.createElement("span", {
            className: "text-slate-400"
        }, ge, " sus\u021Bineri \xB7 ", o.default.createElement("span", {
            className: "text-emerald-600"
        }, q, " promovate"), " \xB7 ", o.default.createElement("span", {
            className: "text-red-500"
        }, de, " respinse"))), o.default.createElement("div", {
            className: "h-1.5 rounded-full bg-slate-100 overflow-hidden flex"
        }, ye > 0 && o.default.createElement("div", {
            className: "h-full bg-emerald-500",
            style: {
                width: `${q/ye*100}%`
            }
        }), ye > 0 && o.default.createElement("div", {
            className: "h-full bg-red-400",
            style: {
                width: `${de/ye*100}%`
            }
        })))
    }
    return o.default.createElement("div", {
        className: "pb-4"
    }, o.default.createElement("div", {
        className: "px-4 pt-4"
    }, o.default.createElement(Ak, {
        vehicul: n.settings.vehicul || "hatchback",
        culoare: n.settings.culoareVehicul || "argintiu",
        remorca: n.settings.remorca || ""
    })), o.default.createElement("div", {
        className: "px-4 pt-2 flex items-center justify-between gap-3"
    }, o.default.createElement("p", {
        className: "text-xs text-slate-400 capitalize"
    }, K), o.default.createElement("button", {
        /* Setările nu mai stau în bara de jos: se deschid de aici. */
        onClick: iasLaSetari,
        "aria-label": "Set\u0103ri",
        "data-ias-setari": "",
        className: "shrink-0 flex items-center justify-center bg-white border border-slate-200 text-slate-500",
        style: { width: 44, height: 44, borderRadius: 99 }
    }, o.default.createElement(ou, {
        size: 19
    }))), o.default.createElement("div", {
        className: "grid grid-cols-3 gap-2 px-4 mt-2"
    }, o.default.createElement("div", {
        className: "bg-white rounded-xl border border-slate-200 px-2 py-3 text-center"
    }, o.default.createElement("div", {
        className: "font-mono-time text-lg font-semibold text-slate-900"
    }, n.students.length), o.default.createElement("div", {
        className: "text-xs text-slate-400 mt-0.5"
    }, "elevi")), o.default.createElement("div", {
        className: "bg-white rounded-xl border border-slate-200 px-2 py-3 text-center"
    }, o.default.createElement("div", {
        className: "font-mono-time text-lg font-semibold text-slate-900"
    }, m), o.default.createElement("div", {
        className: "text-xs text-slate-400 mt-0.5"
    }, "s\u0103pt. asta")), (() => {
        /* Aici stăteau banii pe ore suplimentare — o cifră care nu-ți spunea
           nimic dimineața. În locul ei, orele tale de volan de azi: cât stai
           efectiv în mașină, adunat din ședințele zilei. Asta hotărăște cum
           arată ziua, nu o sumă. */
        let iasMin = d.reduce((iasS, iasZ) => iasS + (Number(iasZ.duration) || Fa(n.settings)), 0),
            iasOre = Math.floor(iasMin / 60), iasRest = iasMin % 60;
        return o.default.createElement("div", {
            className: "bg-amber-50 rounded-xl border border-amber-200 px-2 py-3 text-center"
        }, o.default.createElement("div", {
            className: "font-mono-time text-base font-semibold text-amber-700"
        }, iasMin ? (iasRest ? `${iasOre}h${String(iasRest).padStart(2, "0")}` : `${iasOre}h`) : "\u2014"),
            o.default.createElement("div", {
                className: "text-xs text-amber-600 mt-0.5"
            }, "la volan azi"))
    })()),
    /* Elevii care au strâns destule ședințe și n-au încă o dată la sală.
       Atingi rândul și se deschide fișa lui, drept la Examene. Contorul urcă
       pe măsură ce mai faci ședințe cu el. */
    (() => {
        let iasGata = n.students
            .map(z => ({ elev: z, cate: iasAsteaptaSala(z, n.sessions, n.settings) }))
            .filter(z => z.cate > 0)
            .sort((z, q) => q.cate - z.cate);
        if (!iasGata.length) return null;
        /* Cardurile de deasupra n-au margine dedesubt, așa că blocul se lipea
           de ele. Îi dăm aceeași respirație ca între celelalte secțiuni. */
        return o.default.createElement("div", { className: "px-4 mt-3 mb-4" },
            o.default.createElement("div", {
                className: "rounded-2xl overflow-hidden",
                style: { border: "1px solid var(--accent-line)", background: "var(--accent-soft)" }
            },
                /* Titlul e un buton: lista se strânge sub el. Cu nouă elevi gata
                   de sală îți lua tot ecranul și nu mai vedeai nimic altceva. Se
                   deschide strânsă, fiindcă ce contează e numărul — pe cine
                   anume cauți abia când te apuci de telefoane. */
                o.default.createElement("button", {
                    onClick: () => iasDesfaSala(!iasSalaDesfacuta),
                    className: "w-full px-3.5 py-3 text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5",
                    style: { color: "var(--accent-ink)" }
                }, o.default.createElement(IasSemnNou, { size: 15 }),
                    o.default.createElement("span", { className: "flex-1 text-left" },
                        iasGata.length === 1 ? "Gata de teoretic" : `${iasGata.length} gata de teoretic`),
                    o.default.createElement(un, {
                        size: 14, className: "shrink-0",
                        style: {
                            transform: iasSalaDesfacuta ? "rotate(90deg)" : "none",
                            transition: "transform .2s"
                        }
                    })),
                iasSalaDesfacuta && iasGata.map(z => o.default.createElement("button", {
                    key: z.elev.id,
                    /* Fișa se deschide după identificatorul elevului, nu după obiectul lui:
                       aplicația ține minte cine e deschis printr-un id. */
                    onClick: () => iasLaExamene && iasLaExamene(z.elev.id),
                    className: "w-full flex items-center gap-2 px-3.5 py-2.5 text-left active:opacity-70"
                },
                    o.default.createElement("span", { className: "flex-1 min-w-0" },
                        o.default.createElement("span", {
                            className: "block text-sm font-medium truncate text-slate-900"
                        }, z.elev.name),
                        o.default.createElement("span", {
                            className: "block text-xs", style: { color: "var(--accent-ink)" }
                        }, z.cate, " \u0219edin\u021Be efectuate \u2014 a\u0219teapt\u0103 programare la sal\u0103")),
                    o.default.createElement(un, { size: 15, className: "shrink-0", style: { color: "var(--accent)" } })))))
    })(),
    /* Elevii cu școlarizarea provizorie: îți amintește să notezi ce au plătit
       la școală. Atingi rândul și se deschide completarea. */
    (() => {
        let iasProv = n.students.filter(iasProvizoriu);
        if (!iasProv.length) return null;
        return o.default.createElement("div", { className: "px-4 mt-3 mb-4", "data-ias-acasa-provizorii": iasProv.length },
            o.default.createElement("div", {
                className: "rounded-2xl overflow-hidden",
                style: { border: "1px solid var(--line)", background: "var(--surface)" }
            },
                o.default.createElement("div", {
                    className: "px-3.5 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5",
                    style: { color: "var(--muted)" }
                }, o.default.createElement(IasSemnProvizoriu, { size: 16 }),
                    iasProv.length === 1 ? "\u0218colarizare de completat" : `${iasProv.length} \u0219colariz\u0103ri de completat`),
                iasProv.map(z => o.default.createElement("button", {
                    key: z.id,
                    onClick: () => iasLaScolarizare && iasLaScolarizare(z.id),
                    className: "w-full flex items-center gap-2 px-3.5 py-2.5 text-left active:opacity-70"
                },
                    o.default.createElement("span", { className: "flex-1 min-w-0" },
                        o.default.createElement("span", { className: "block text-sm font-medium truncate text-slate-900" }, z.name),
                        o.default.createElement("span", { className: "block text-xs", style: { color: "var(--muted-2)" } },
                            "Ce a pl\u0103tit la \u0219coal\u0103? P\u00E2n\u0103 afli: ", Number(z.scolarizare.ore) || 0, " incluse")),
                    o.default.createElement(un, { size: 15, className: "shrink-0", style: { color: "var(--muted-2)" } })))))
    })(), o.default.createElement("div", {
        className: "px-4 mt-5"
    }, o.default.createElement("div", {
        className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
    }, "Ast\u0103zi"), d.length === 0 ? o.default.createElement("div", {
        className: "bg-white rounded-xl border border-dashed border-slate-200 text-center py-6 text-sm text-slate-400"
    }, "Nicio \u0219edin\u021B\u0103 programat\u0103 ast\u0103zi.") : o.default.createElement("div", {
        className: "space-y-1.5"
    }, d.map(z => o.default.createElement("button", {
        key: z.id,
        onClick: () => e("edit", z),
        className: "w-full flex items-center justify-between bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 text-left active:bg-slate-50"
    }, o.default.createElement("div", {
        className: "flex items-center gap-3 min-w-0"
    }, o.default.createElement("span", {
        className: "font-mono-time text-xs text-slate-400 shrink-0"
    }, Se(z.startMin)), o.default.createElement("span", {
        className: "min-w-0"
    }, o.default.createElement("span", {
        className: "block text-sm font-medium text-slate-900 truncate"
    }, X(z.studentId), o.default.createElement(Lf, {
        student: n.students.find(iasE => iasE.id === z.studentId),
        size: 13,
                sesiuni: n.sessions,
                setari: n.settings
            }), z.otherInstructor && o.default.createElement("span", {
        className: "ml-1.5 text-xs font-normal text-violet-600"
    }, "\xB7 ", z.instructorName || "alt instr.")), z.location && o.default.createElement("span", {
        className: "block text-xs text-slate-400 truncate"
    }, z.location))),
    /* Notița, și pe cardurile de pe Acasă: aici te uiți dimineața, înainte să
       pleci, deci tot ce ai scris despre ședință trebuie să fie la vedere. */
    (() => {
        let iasN = iasNotitaDeCard(z, n.students.find(iasE => iasE.id === z.studentId));
        return iasN ? o.default.createElement("div", {
            className: "flex-1 min-w-0 px-2.5 self-center",
            style: { maxWidth: 240, minWidth: 36 }
        }, o.default.createElement("span", {
            className: "block text-xs truncate",
            style: {
                color: "var(--muted-2)", fontStyle: "italic",
                opacity: iasN.aElevului ? .8 : 1
            }
        }, iasN.text)) : null
    })(),
    o.default.createElement(I0, {
        status: z.status
    }))))), Y && o.default.createElement("div", {
        className: "px-4 mt-5"
    }, o.default.createElement("div", {
        className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
    }, "Necesit\u0103 aten\u021Bie"), o.default.createElement("div", {
        className: "space-y-1.5"
    }, y > 0 && o.default.createElement("button", {
        onClick: () => e("edit", b),
        className: "w-full flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-left"
    }, o.default.createElement(Xn, {
        size: 15,
        className: "text-amber-600 shrink-0"
    }), o.default.createElement("span", {
        className: "text-sm text-amber-700 flex-1"
    }, y, " \u0219edin\u021Be a\u0219teapt\u0103 confirmare"), o.default.createElement(un, {
        size: 15,
        className: "text-amber-600 shrink-0"
    })), (() => {
        /* Cine dă teoreticul azi. Stă lângă anunțul de confirmări, ca să-l vezi
           dimineața odată cu restul, nu pierdut printre examenele viitoare. */
        let iasAzi = S.filter(x => x.kind === "teoretic" && x.date === Be());
        if (!iasAzi.length) return null;
        return o.default.createElement("button", {
            onClick: () => i(iasAzi[0].student.id),
            className: "w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left",
            style: { background: "var(--info-soft)", border: "1px solid var(--info-line)" }
        }, o.default.createElement(Xn, {
            size: 15, className: "shrink-0", style: { color: "var(--info)" }
        }), o.default.createElement("span", {
            className: "text-sm flex-1", style: { color: "var(--info)" }
        }, iasAzi.length === 1
            ? `${iasAzi[0].student.name} d\u0103 azi examenul teoretic` + (iasAzi[0].student.theoryExamOra != null && iasAzi[0].student.theoryExamOra !== "" ? `, la ${Se(Number(iasAzi[0].student.theoryExamOra))}` : "")
            : `${iasAzi.length} elevi dau azi examenul teoretic`),
        o.default.createElement(un, {
            size: 15, className: "shrink-0", style: { color: "var(--info)" }
        }))
    })(), (() => {
        /* Mâine e examen practic, deci mașina se spală azi. Anunțul rămâne
           până pui un interval indisponibil cu motivul ăsta; atingerea lui
           deschide Calendarul cu formularul gata completat pe o oră liberă. */
        let iasCine = iasExamenMaine(n, l);
        if (!iasCine.length || iasSpalatPus(n, l)) return null;
        return o.default.createElement("button", {
            "data-ias-spalat": "",
            onClick: () => { iasSpalat.cerut = !0, s() },
            className: "w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left",
            style: { background: "var(--sky-soft)", border: "1px solid var(--sky-line)" }
        }, o.default.createElement(ar, {
            size: 16, className: "shrink-0", style: { color: "var(--sky)" }
        }), o.default.createElement("span", { className: "flex-1 min-w-0" },
            o.default.createElement("span", {
                className: "block text-sm truncate", style: { color: "var(--sky)" }
            }, iasCine.length === 1 ? `M\xE2ine e examenul lui ${iasCine[0].name}` : `M\xE2ine sunt ${iasCine.length} elevi la examen`),
            o.default.createElement("span", {
                className: "block text-xs", style: { color: "var(--muted)" }
            }, "Pune azi o or\u0103 liber\u0103, s\u0103 speli ma\u0219ina")),
        o.default.createElement(un, {
            size: 15, className: "shrink-0", style: { color: "var(--sky)" }
        }))
    })(), h > 0 && o.default.createElement("button", {
        onClick: () => e("edit", _),
        className: "w-full flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-left"
    }, o.default.createElement(Xn, {
        size: 15,
        className: "text-amber-600 shrink-0"
    }), o.default.createElement("span", {
        className: "text-sm text-amber-700 flex-1"
    }, h, " \u0219edin\u021Be trecute f\u0103r\u0103 status final"), o.default.createElement(un, {
        size: 15,
        className: "text-amber-600 shrink-0"
    })), (() => {
        /* Examenele, grupate pe feluri: practicul îți ocupă ziua cu ședințe,
           teoreticul nu — n-au ce căuta amestecate într-o singură înșiruire,
           mai ales când ai zece elevi deodată. Fiecare grup se desface la
           atingere, ca să nu-ți umple ecranul.

           Cele la care trebuie să notezi rezultatul rămân la vedere oricum:
           acelea chiar cer ceva de la tine azi. */
        let iasGrup = (fel, titlu) => {
            let ale = S.filter(x => x.kind === fel);
            if (!ale.length) return null;
            let deNotat = ale.filter(x => x.due),
                restul = ale.filter(x => !x.due),
                /* La teoretic se scrie și ora, dacă a fost trecută pe fișă. */
                iasOraTeo = z => z.kind === "teoretic" && z.student.theoryExamOra != null && z.student.theoryExamOra !== "" ? `, ${Se(Number(z.student.theoryExamOra))}` : "",
                iasRand = (z, q) => o.default.createElement("button", {
                    key: `${z.student.id}_${z.kind}_${q}`,
                    onClick: () => i(z.student.id),
                    className: "w-full flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-left",
                    style: z.due ? { borderColor: "var(--violet)" } : void 0
                }, o.default.createElement(ni, {
                    size: 15, className: "shrink-0",
                    style: { color: z.due ? "var(--violet)" : "var(--muted-2)" }
                }), o.default.createElement("span", { className: "flex-1 min-w-0" },
                    o.default.createElement("span", {
                        className: "block text-sm text-slate-700 truncate"
                    }, z.student.name, " \xB7 ", qe(z.date), iasOraTeo(z)),
                    z.due && o.default.createElement("span", {
                        className: "block text-xs", style: { color: "var(--violet)" }
                    }, "noteaz\u0103 rezultatul \u2014 promovat sau respins")),
                    z.due && o.default.createElement(un, {
                        size: 15, className: "shrink-0", style: { color: "var(--violet)" }
                    }));
            return o.default.createElement("div", { key: fel, className: "space-y-1.5" },
                deNotat.map(iasRand),
                restul.length ? o.default.createElement(Jn, {
                    title: `${titlu} \xB7 ${restul.length}`,
                    summary: restul.length === 1 ? qe(restul[0].date) + iasOraTeo(restul[0]) : `p\xE2n\u0103 pe ${qe(restul[restul.length - 1].date)}`
                }, o.default.createElement("div", { className: "space-y-1.5" }, restul.map(iasRand))) : null)
        };
        return [iasGrup("practic", "Examene practice"), iasGrup("teoretic", "Examene teoretice")]
    })(), ne.map(z => o.default.createElement("button", {
        key: z.reminder.id,
        onClick: () => i(z.student.id),
        className: "w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left border",
        style: {
            borderColor: "var(--accent-line)",
            background: "var(--accent-soft)"
        }
    }, o.default.createElement(ru, {
        size: 15,
        className: "shrink-0",
        style: {
            color: "var(--accent-ink)"
        }
    }), o.default.createElement("span", {
        className: "flex-1 min-w-0"
    }, o.default.createElement("span", {
        className: "block text-sm font-medium",
        style: {
            color: "var(--accent-ink)"
        }
    }, z.reminder.text || "Memento"), o.default.createElement("span", {
        className: "block text-xs text-slate-500 truncate"
    }, z.student.name, " \xB7 \u0219edin\u021Ba ", z.reminder.atSession, " \xB7 ", qe(z.session.date))))))), o.default.createElement("div", {
        className: "px-4 mt-5"
    }, o.default.createElement("div", {
        className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
    }, "Statistici"), o.default.createElement("button", {
        /* Cardul se apasă: se desface lista celor promovați, iar de acolo
           deschizi fișa oricăruia. Până acum era doar un procent — vedeai cât,
           dar nu și cine. */
        onClick: () => iasDesfaPromovati(!iasPromovatiDesfacuti),
        className: "w-full text-left bg-white rounded-xl border border-slate-200 px-4 py-3.5 mb-2"
    }, o.default.createElement("div", {
        className: "flex items-center justify-between mb-2"
    }, o.default.createElement("div", null, o.default.createElement("div", {
        className: "text-sm font-medium text-slate-800 flex items-center gap-1.5"
    }, "Elevi promova\u021Bi", o.default.createElement(un, {
        size: 13, className: "text-slate-400",
        style: {
            transform: iasPromovatiDesfacuti ? "rotate(90deg)" : "none",
            transition: "transform .2s"
        }
    })), o.default.createElement("div", {
        className: "text-xs text-slate-400 mt-0.5"
    }, B, " din ", E, " elevi")), o.default.createElement("div", {
        className: "font-mono-time text-2xl font-semibold text-emerald-600"
    }, $, "%")), o.default.createElement(Cf, {
        value: $,
        colorCls: "bg-emerald-500"
    })),
    iasPromovatiDesfacuti ? o.default.createElement("div", { className: "space-y-1.5 mb-2" },
        (() => {
            /* În ordinea promovării, cel mai proaspăt în cap — nu alfabetic.
               Lista asta se citește ca o cronică: „cine a luat permisul de
               curând", nu „unde e Popescu". La examenele picate data se golește
               pentru reprogramare, așa că luăm ziua din istoric dacă e acolo;
               cine n-are nicio dată cade la coadă, după nume. */
            let iasCand = (x) => {
                if ((x.examDate || "").trim()) return x.examDate;
                let ale = (Array.isArray(x.examIstoric) ? x.examIstoric : [])
                    .filter(y => y && y.fel === "practic" && y.rezultat === "promovat" && y.data)
                    .map(y => y.data).sort();
                return ale.length ? ale[ale.length - 1] : ""
            };
            let iasLista = n.students.filter(x => x.examResult === "promovat" && !x.withdrawn)
                .sort((x, y) => {
                    let a2 = iasCand(x), b2 = iasCand(y);
                    if (a2 !== b2) return (b2 || "").localeCompare(a2 || "");
                    return (x.name || "").localeCompare(y.name || "", "ro")
                });
            if (!iasLista.length) return o.default.createElement("div", {
                className: "text-xs text-slate-400 px-3.5 py-2"
            }, "Niciun elev promovat \xEEnc\u0103.");
            return iasLista.map(x => o.default.createElement("button", {
                key: x.id,
                onClick: () => i(x.id),
                className: "w-full flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-left"
            },
                o.default.createElement("span", { className: "flex-1 min-w-0" },
                    o.default.createElement("span", {
                        className: "block text-sm text-slate-800 truncate"
                    }, x.name),
                    o.default.createElement("span", {
                        className: "block text-xs text-slate-400 truncate"
                    }, [x.group ? `gr. ${x.group}` : "", x.examDate ? qe(x.examDate) : ""].filter(Boolean).join(" \xB7 "))),
                o.default.createElement("span", {
                    className: "text-xs font-medium px-2 py-0.5 rounded-full shrink-0",
                    style: { background: "var(--ok-soft)", color: "var(--ok)", border: "1px solid var(--ok-line)" }
                }, "promovat"),
                o.default.createElement(un, { size: 15, className: "shrink-0 text-slate-300" })))
        })()) : null, o.default.createElement("div", {
        className: "bg-white rounded-xl border border-slate-200 px-4 py-3.5"
    }, o.default.createElement("div", {
        className: "text-sm font-medium text-slate-800 mb-2.5"
    }, "Examene dup\u0103 tip"), o.default.createElement(J, {
        label: "Teoretic",
        pass: G,
        fail: A,
        attempts: C
    }), o.default.createElement(J, {
        label: "Practic",
        pass: O,
        fail: N,
        attempts: W
    })), M.length > 0 && o.default.createElement("div", {
        className: "bg-white border border-slate-200 rounded-xl px-3.5 py-2.5"
    }, o.default.createElement("div", {
        className: "text-sm text-slate-700 mb-1.5"
    }, "Toate orele programate sau efectuate:"), o.default.createElement("div", {
        className: "flex flex-wrap gap-1.5"
    }, M.map(z => o.default.createElement("button", {
        key: z.id,
        onClick: () => i(z.id),
        className: "text-xs px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600"
    }, z.name, o.default.createElement(Lf, {
        student: z,
        size: 12,
                sesiuni: n.sessions,
                setari: n.settings
            })))))), o.default.createElement("button", {
        /* Acțiunile nu mai stau în josul paginii, după tot restul: sunt la un
           „+" care rămâne pe ecran, ca în Calendar și la Elevi. */
        onClick: () => iasCereActiuni(!0),
        "aria-label": "Ac\u021Biuni",
        "data-ias-actiuni": "",
        className: "fixed bottom-20 right-4 w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
    }, o.default.createElement(cn, {
        size: 26
    })), o.default.createElement(oi, {
        open: iasActiuni,
        onClose: () => iasCereActiuni(!1),
        title: "Ac\u021Biuni",
        layer: Wt.dialog
    }, (() => {
        let iasFa = f => () => { iasCereActiuni(!1), f() },
            iasBuc = (Icon, nume, f, plin) => o.default.createElement("button", {
                key: nume,
                onClick: iasFa(f),
                className: "flex flex-col items-center gap-1.5 bg-white rounded-xl border border-slate-200 py-3.5 px-1 active:bg-slate-50"
            }, o.default.createElement("span", {
                className: "flex items-center justify-center",
                style: {
                    width: 40, height: 40, borderRadius: 99,
                    background: plin ? "var(--accent)" : "var(--accent-soft)",
                    color: plin ? "#2a1800" : "var(--accent-ink)"
                }
            }, o.default.createElement(Icon, { size: 18 })), o.default.createElement("span", {
                className: "text-xs text-slate-600 text-center",
                style: { lineHeight: 1.2 }
            }, nume)),
            iasTitlu = t2 => o.default.createElement("div", {
                className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
            }, t2);
        return o.default.createElement("div", { "data-ias-foaie-actiuni": "" },
            iasTitlu("Programare"),
            o.default.createElement("div", { className: "grid grid-cols-3 gap-2 mb-4" },
                iasBuc(cn, "\u0218edin\u021B\u0103 nou\u0103", a, !0),
                iasBuc(Xn, "Indisponibil", () => { iasSpalat.alt = "bloc", s() }),
                iasBuc(Pa, "Planificator", r)),
            iasTitlu("Elevi"),
            o.default.createElement("div", { className: "grid grid-cols-3 gap-2 mb-4" },
                iasBuc(rr, "Elev nou", t),
                iasBuc(dn, "C\xE2nd sunt ocupat", () => { iasSpalat.alt = "ocupat", s() }),
                iasBuc(ou, "Set\u0103ri", iasLaSetari)))
    })()))
}

function Ok({
    open: n,
    ora: e,
    pas: t,
    durata: a,
    ocupat: r,
    peste: i,
    onClose: s,
    onAlege: l
}) {
    if (!n || e == null) return null;
    let u = [];
    for (let d = e; d < e + 60 && d + a <= i; d += t) u.push(d);
    return o.default.createElement("div", {
        className: "fixed inset-0 flex items-center justify-center px-6 ecran-peste",
        style: {
            zIndex: Wt.dialog
        }
    }, o.default.createElement("div", {
        className: "absolute inset-0 bg-slate-900/50 fade-anim",
        onClick: PA
    }), o.default.createElement("div", {
        className: "relative bg-white rounded-2xl shadow-2xl p-4 w-full max-w-sm fade-anim"
    }, o.default.createElement("h3", {
        className: "font-semibold text-slate-900 mb-0.5"
    }, "Ora ", Se(e)), o.default.createElement("p", {
        className: "text-xs text-slate-400 mb-3"
    }, "Alege minutul de \xEEnceput. \u0218edin\u021Ba \u021Bine ", a, " de minute."), o.default.createElement("div", {
        className: "grid grid-cols-4 gap-1.5 max-h-64 overflow-y-auto"
    }, u.map(d => {
        let f = r(d);
        return o.default.createElement("button", {
            key: d,
            disabled: f,
            onClick: () => l(d),
            className: `py-2.5 rounded-xl text-sm font-mono-time border ${f?"border-slate-200 text-slate-300":"border-slate-200 text-slate-800 active:bg-slate-50"}`,
            style: f ? {
                textDecoration: "line-through"
            } : void 0
        }, Se(d))
    })), u.length === 0 && o.default.createElement("p", {
        className: "text-sm text-slate-400 text-center py-4"
    }, "Nu mai \xEEncape nicio \u0219edin\u021B\u0103 \xEEn ora asta."), o.default.createElement("button", {
        onClick: s,
        className: "w-full py-2.5 mt-3 rounded-xl border border-slate-200 text-slate-600 text-sm"
    }, "Renun\u021B\u0103")))
}

function Hk({
    data: n,
    onOpenSession: e,
    onUpdateSettings: t,
    onRecordExam: a
}) {
    (0, o.useEffect)(() => {
        /* Venit din anunțul „mâine e examen": formularul de interval
           indisponibil se deschide singur, pe o oră liberă de azi. */
        if (iasSpalat.cerut) {
            iasSpalat.cerut = !1;
            let iasAcum = new Date;
            l(iasOraDeSpalat(n, Be(), iasAcum.getHours() * 60 + iasAcum.getMinutes()));
            return
        }
        /* Venit din „Acțiuni", de pe Acasă: aceleași două lucruri pe care le
           deschid butoanele de aici, doar că fără drumul până la ele. */
        let iasCe = iasSpalat.alt;
        iasSpalat.alt = "";
        iasCe === "bloc" && l({
            allDay: !1,
            startMin: n.settings.startMin,
            endMin: Math.min(1440, n.settings.startMin + 180),
            note: ""
        });
        iasCe === "ocupat" && iasCereOcupat(!0)
    }, []);
    let [iasVedere, iasPuneVedere] = (0, o.useState)(iasVedereZiCitita);
    let         /* Săptămâna privită și ziua aleasă sunt două lucruri deosebite.
           Comutatorul de săptămână schimbă doar banda de sus; ziua rămâne cea
           aleasă de tine, până când atingi tu alta. Altfel se putea întâmpla ce
           ai pățit: alegeai duminica, atingeai din greșeală săptămâna
           următoare, iar programările plecau pe duminica de peste o săptămână
           fără să bagi de seamă. */
        [r, i] = (0, o.useState)(Be()),
        [iasSapt, iasPuneSapt] = (0, o.useState)(() => ft(Gi(new Date))),
        [iasOcupatDeschis, iasCereOcupat] = (0, o.useState)(!1),
        [iasOcupatZileNr, iasPuneOcupatZile] = (0, o.useState)(7),
        [s, l] = (0, o.useState)(null), [u, d] = (0, o.useState)(0), [f, p] = (0, o.useState)(null), c = b0(n.settings, r), m = () => {
        let A = s;
        if (!A) return;
        let O = (A.note || "").trim(),
            N = A.allDay ? {
                id: Vt("blk"),
                date: r,
                allDay: !0,
                note: O
            } : {
                id: Vt("blk"),
                date: r,
                allDay: !1,
                startMin: Number(A.startMin),
                endMin: Number(A.endMin),
                note: O
            };
        !N.allDay && !(N.endMin > N.startMin) || (t({
            blocks: [...n.settings.blocks || [], N]
        }), l(null))
    }, g = A => t({
        blocks: (n.settings.blocks || []).filter(O => O.id !== A)
    }), v = Ue(iasSapt), w = Array.from({
        length: 7
    }, (A, O) => ft(pn(v, O))), x = n.sessions.filter(A => A.date === r && A.status !== "cancelled"), h = Fa(n.settings), y = kw(n.settings), _ = y >= 30 ? y : 60, b = (() => {
        let A = [];
        let iasPz = iasProgramZi(n.settings, r);
        for (let O = iasPz.startMin; O + h <= iasPz.endMin; O += _) A.push(O);
        /* Ședințele deja puse rămân la vedere chiar dacă ai strâns între timp
           programul de lucru. Ai programat pe cineva la 7:30 și abia apoi ai
           mutat începutul la 10 — ședința aceea există, omul o așteaptă, deci
           n-are voie să dispară din zi doar fiindcă nu mai încape în tipar. */
        x.forEach(O => { if (A.indexOf(O.startMin) < 0) A.push(O.startMin) });
        A.sort((O, N) => O - N);
        return A
    })(), M = Ue(r).getDay(), S = n.settings.workDays.includes(M), k = A => n.students.find(O => O.id === A)?.name || "Elev \u0219ters", E = (0, o.useMemo)(() => ok(n, r), [n, r]), B = -1e9, $ = r >= Be() && r <= ft(pn(new Date, RA)), G = (0, o.useMemo)(() => v0(n.students, r), [n.students, r]),
        /* Sugestiile zilei, aceleași în listă și pe axă: pe orele la care
           fiecare elev chiar poate, câte cel mult doi la aceeași oră. */
        iasSugZi = (0, o.useMemo)(() => $ && E.length && b.length
            ? iasSugestiiZi(n.settings, r, E, iasGoluriZi(n.settings, r, x, c, G), h, _) : {}, [n, r, E, G]);
    return o.default.createElement("div", {
        className: "pb-4"
    }, o.default.createElement("div", {
        className: "flex items-center justify-between px-4 pt-4 pb-3"
    }, o.default.createElement("button", {
        onClick: () => iasPuneSapt(ft(pn(Ue(iasSapt), -7))),
        "aria-label": "S\u0103pt\u0103m\xE2na trecut\u0103",
        className: "p-2 -ml-2 text-slate-400"
    }, o.default.createElement(ei, {
        size: 20
    })), o.default.createElement("div", {
        className: "font-display text-base font-semibold text-slate-900 uppercase tracking-wide"
    }, yo[Ue(iasSapt).getMonth()], " ", Ue(iasSapt).getFullYear()), o.default.createElement("button", {
        onClick: () => iasPuneSapt(ft(pn(Ue(iasSapt), 7))),
        "aria-label": "S\u0103pt\u0103m\xE2na viitoare",
        className: "p-2 -mr-2 text-slate-400"
    }, o.default.createElement(un, {
        size: 20
    }))),
    /* „Când sunt ocupat": textul de trimis elevului care te întreabă când poți.
       Pornește de la săptămâna la care te uiți, nu de la azi — dacă te-ai dus
       cu banda înainte, aia e săptămâna care te interesează. */
    iasOcupatDeschis ? (() => {
        var iasT = iasTextOcupat(n, iasSapt, iasOcupatZileNr);
        return o.default.createElement(oi, {
            open: !0,
            onClose: () => iasCereOcupat(!1),
            title: "C\xE2nd sunt ocupat",
            layer: Wt.dialog,
            footer: o.default.createElement("div", { className: "flex gap-2.5" },
                o.default.createElement("button", {
                    type: "button",
                    onClick: () => {
                        try { navigator.clipboard.writeText(iasT) } catch (x) {}
                        iasCereOcupat(!1)
                    },
                    className: "flex-1 py-3 rounded-xl font-medium text-sm border border-slate-200 text-slate-700"
                }, "Copiaz\u0103"),
                o.default.createElement("button", {
                    type: "button",
                    onClick: () => {
                        try { window.open("https://wa.me/?text=" + encodeURIComponent(iasT), "_blank") } catch (x) {}
                        iasCereOcupat(!1)
                    },
                    className: "flex-1 py-3 rounded-xl font-medium text-sm bg-slate-900 text-white"
                }, "Trimite pe WhatsApp"))
        },
            o.default.createElement(xe, { label: "Pentru c\xE2te zile" },
                o.default.createElement("select", {
                    className: ie,
                    value: iasOcupatZileNr,
                    onChange: (S) => iasPuneOcupatZile(Number(S.target.value))
                },
                    o.default.createElement("option", { value: 7 }, "o s\u0103pt\u0103m\xE2n\u0103"),
                    o.default.createElement("option", { value: 14 }, "dou\u0103 s\u0103pt\u0103m\xE2ni"),
                    o.default.createElement("option", { value: 21 }, "trei s\u0103pt\u0103m\xE2ni"),
                    o.default.createElement("option", { value: 30 }, "o lun\u0103"))),
            o.default.createElement("div", {
                className: "rounded-xl px-3.5 py-3 text-sm whitespace-pre-line",
                style: { background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink)" }
            }, iasT),
            o.default.createElement("p", {
                className: "text-xs mt-2.5", style: { color: "var(--muted-2)" }
            }, "Se spune doar c\xE2t e ocupat, nu cu cine. \xCEncepe de la s\u0103pt\u0103m\xE2na la care te ui\u021Bi."))
    })() : null,
    /* „Azi" te aduce înapoi cu totul: și banda, și ziua privită. Apare doar
       când chiar ai plecat de acolo, ca să nu stea degeaba pe ecran. */
    (r !== Be() || iasSapt !== ft(Gi(new Date)))
        ? o.default.createElement("div", { className: "px-4 -mt-1 mb-2 flex justify-center" },
            o.default.createElement("button", {
                onClick: () => { i(Be()), iasPuneSapt(ft(Gi(new Date))) },
                className: "px-4 py-1.5 rounded-full text-xs font-medium",
                style: {
                    background: "var(--accent-soft)", color: "var(--accent-ink)",
                    border: "1px solid var(--accent-line)"
                }
            }, "\u2190 Azi"))
        : null, o.default.createElement("div", {
        className: "flex px-3 gap-1.5 mb-4"
    }, w.map(A => {
        let O = Ue(A),
            N = n.sessions.filter(X => X.date === A && X.status !== "cancelled").length,
            C = A === r,
            W = A === Be(),
            // ziua cu examen practic poartă chenar mov, aceeași culoare cu
            // intervalul de examen din grila orei
            iasEx = v0(n.students, A).length > 0,
            iasTeo = iasTeoreticeZi(n.students, A).length > 0,
            // ziua în care s-a dat deja examen rămâne însemnată
            iasExTrecut = iasExameneDate(n.students, A).length > 0,
            /* Zilele pe care le-ai barat cu mâna se văd din bandă, fără să
               intri în ele: un semn de exclamare în colț și o umbră caldă peste
               căsuță. Pauzele de masă nu se socotesc aici — ele sunt în fiecare
               zi, deci n-ar deosebi nimic. Ziua barată toată e mai apăsată
               decât una cu doar un interval oprit. */
            iasBlocuri = (n.settings.blocks || []).filter(X => X.date === A),
            iasZiBarata = iasBlocuri.some(X => X.allDay),
            iasAreBlocaj = iasBlocuri.length > 0,
            /* Cât de plină e ziua, ca nivelul într-un pahar: căsuța se umple de
               jos în sus, după câte ședințe încap în programul tău. Se citește
               dintr-o privire, fără să numeri. */
            iasPzi = iasProgramZi(n.settings, A),
            iasLoc = Math.max(1, Math.floor((iasPzi.endMin - iasPzi.startMin) / Math.max(30, Fa(n.settings)))),
            iasUmplut = Math.min(1, N / iasLoc);
        return o.default.createElement("button", {
            key: A,
            onClick: () => i(A),
            className: `relative overflow-hidden flex-1 flex flex-col items-center py-2 rounded-xl border transition-colors ${C?"bg-slate-900 border-slate-900":"bg-white border-slate-200"}`,
            /* Ziua cu examen poartă chenar mov — plin la practic, punctat la
               teoretic, fiindcă teoreticul nu-ți ocupă mașina. */
            style: (iasEx || iasTeo || iasExTrecut) ? {
                borderColor: "var(--violet)",
                borderWidth: 2,
                borderStyle: (iasEx || (iasExTrecut && !iasTeo)) ? "solid" : "dashed",
                boxShadow: C ? "none" : "0 0 0 2px color-mix(in srgb, var(--violet) 18%, transparent)"
            } : void 0,
            title: [
                iasEx ? "Examen practic" : iasTeo ? "Examen teoretic" : iasExTrecut ? "S-a dat examen" : "",
                iasZiBarata ? "zi indisponibil\u0103" : iasAreBlocaj ? "interval indisponibil" : ""
            ].filter(Boolean).join(" \xB7 ") || void 0
        },
        iasAreBlocaj ? o.default.createElement("span", {
            "aria-hidden": "true",
            style: {
                position: "absolute", left: 0, right: 0, top: 0, bottom: 0,
                background: iasZiBarata
                    ? "repeating-linear-gradient(45deg, transparent, transparent 4px, color-mix(in srgb, var(--bad) 22%, transparent) 4px, color-mix(in srgb, var(--bad) 22%, transparent) 8px)"
                    : "color-mix(in srgb, var(--bad) 12%, transparent)",
                pointerEvents: "none"
            }
        }) : null,
        iasAreBlocaj ? o.default.createElement("span", {
            style: {
                position: "absolute", top: 2, right: 4, fontSize: 11, lineHeight: 1,
                fontWeight: 700, color: "var(--bad)", pointerEvents: "none"
            },
            title: iasZiBarata ? "Zi indisponibil\u0103" : "Interval indisponibil"
        }, "!") : null,
        iasUmplut > 0 ? o.default.createElement("span", {
            "aria-hidden": "true",
            style: {
                position: "absolute", left: 0, right: 0, bottom: 0,
                height: `${Math.round(iasUmplut * 100)}%`,
                background: C ? "rgba(255,255,255,.18)" : "var(--accent-soft)",
                transition: "height .25s ease", pointerEvents: "none"
            }
        }) : null, o.default.createElement("span", {
            className: `text-xs font-medium uppercase ${C?"text-white":"text-slate-400"}`
        }, xu[O.getDay()]), o.default.createElement("span", {
            className: `relative text-base font-semibold font-mono-time ${C?"text-white":W?"text-amber-600":"text-slate-800"}`
        }, O.getDate()), o.default.createElement("span", {
            className: `relative w-1.5 h-1.5 rounded-full mt-1 ${N>0?C?"bg-amber-400":"bg-amber-500":"bg-transparent"}`
        }))
    })),
    /* Dacă ziua pe care o vezi dedesubt nu e în săptămâna de pe bandă, ți-o
       spunem limpede: altfel ai crede că programezi în săptămâna afișată. */
    w.indexOf(r) < 0 ? o.default.createElement("div", {
        className: "mx-4 mb-3 px-3.5 py-2.5 rounded-xl flex items-center gap-2",
        style: { background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }
    }, o.default.createElement(Xn, {
        size: 15, className: "shrink-0", style: { color: "var(--accent)" }
    }), o.default.createElement("span", {
        className: "text-xs flex-1", style: { color: "var(--accent-ink)" }
    }, "Vezi mai jos ", fo(r), " \u2014 din alt\u0103 s\u0103pt\u0103m\xE2n\u0103. Atinge o zi din band\u0103 ca s\u0103 treci la ea."))
        : null, !S && o.default.createElement("div", {
        className: "mx-4 mb-3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500"
    }, "Zi liber\u0103 conform programului t\u0103u de lucru \u2014 po\u021Bi programa oricum dac\u0103 e nevoie."),
    /* Teoreticele zilei: nu ocup\u0103 ma\u0219ina, deci nu bar\u0103 nimic, dar apar scrise
       aici ca s\u0103 \u0219tii de ele \u0219i s\u0103-i po\u021Bi \xEEntreba cum a fost. */
    /* Ce s-a dat în ziua asta, oricare ar fi fost rezultatul. Rămâne scris și
       după ce data de examen s-a golit pentru reprogramare — altfel ziua arăta
       goală, de parcă n-ar fi fost nimic. */
    (() => {
        let iasDate = iasExameneDate(n.students, r);
        if (!iasDate.length) return null;
        return o.default.createElement("div", {
            className: "mx-4 mb-3 rounded-xl px-3.5 py-3",
            style: {
                background: "color-mix(in srgb, var(--violet) 8%, transparent)",
                border: "1px solid var(--violet)"
            }
        },
            o.default.createElement("div", {
                className: "text-xs font-semibold uppercase tracking-wide mb-1.5",
                style: { color: "var(--violet)" }
            }, iasDate.length === 1 ? "Examen dat \xEEn ziua asta" : `${iasDate.length} examene date \xEEn ziua asta`),
            iasDate.map(x => o.default.createElement("div", {
                key: x.id,
                className: "flex items-center gap-2 py-1"
            },
                o.default.createElement("span", {
                    className: "text-sm flex-1 min-w-0 truncate text-slate-900"
                }, x.elev.name),
                o.default.createElement("span", {
                    className: "text-xs shrink-0", style: { color: "var(--muted-2)" }
                }, x.fel === "teoretic" ? "teoretic" : "practic"),
                o.default.createElement("span", {
                    className: "text-xs font-medium px-2 py-0.5 rounded-full shrink-0",
                    style: x.rezultat === "promovat"
                        ? { background: "var(--ok-soft)", color: "var(--ok)", border: "1px solid var(--ok-line)" }
                        : { background: "var(--bad-soft)", color: "var(--bad)", border: "1px solid var(--bad-line)" }
                }, x.rezultat === "promovat" ? "promovat" : "respins"))))
    })(),
    (() => {
        /* Teoreticele zilei, cu aceleași butoane ca practicul: îl notezi din
           calendar, fără să mai intri pe fișa elevului. Ziua trebuie să fi
           venit — n-are rost să notezi un examen care n-a avut loc încă. */
        let iasT = iasTeoreticeZi(n.students, r).filter(x => x.theoryExamResult !== "promovat"),
            iasLuati = iasTeoreticeZi(n.students, r).filter(x => x.theoryExamResult === "promovat"),
            iasAVenit = r <= Be();
        if (!iasT.length && !iasLuati.length) return null;
        return o.default.createElement("div", { className: "mx-4 mb-3 space-y-2" },
            iasLuati.map(x => o.default.createElement("div", {
                key: x.id,
                className: "rounded-xl px-3.5 py-2.5 flex items-center gap-2",
                style: { background: "var(--ok-soft)", border: "1px solid var(--ok-line)" }
            }, o.default.createElement("span", {
                className: "text-sm font-medium truncate", style: { color: "var(--ok)" }
            }, x.name, " \xB7 teoretic promovat"))),
            iasT.length ? o.default.createElement("div", {
                className: "rounded-xl px-3.5 py-3",
                style: { border: "1px dashed var(--violet)" }
            },
                o.default.createElement("div", {
                    className: "text-xs font-semibold uppercase tracking-wide mb-1.5",
                    style: { color: "var(--violet)" }
                }, iasT.length === 1 ? "Examen teoretic azi" : `${iasT.length} examene teoretice azi`),
                iasT.map(x => o.default.createElement("div", {
                    key: x.id, className: "mb-2 last:mb-0"
                },
                    o.default.createElement("div", {
                        className: "text-sm font-medium text-slate-900 truncate"
                    }, x.name, x.theoryExamOra != null && x.theoryExamOra !== ""
                        ? o.default.createElement("span", {
                            className: "font-mono-time text-xs ml-1.5", style: { color: "var(--violet)" }
                        }, Se(Number(x.theoryExamOra))) : null),
                    Number(x.theoryExamAttempts) > 0 ? o.default.createElement("div", {
                        className: "text-xs", style: { color: "var(--muted-2)" }
                    }, x.theoryExamAttempts, Number(x.theoryExamAttempts) === 1 ? " sus\u021Binere" : " sus\u021Bineri") : null,
                    iasAVenit ? o.default.createElement("div", { className: "flex gap-2 mt-2" },
                        o.default.createElement("button", {
                            onClick: () => a(x.id, "promovat", "teoretic"),
                            className: "flex-1 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium"
                        }, "Promovat"),
                        o.default.createElement("button", {
                            onClick: () => a(x.id, "respins", "teoretic"),
                            className: "flex-1 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-medium"
                        }, "Respins")) : null)),
                o.default.createElement("p", {
                    className: "text-xs mt-1.5", style: { color: "var(--muted-2)" }
                }, iasAVenit
                    ? "Se adaug\u0103 o sus\u021Binere la contor; la respins data r\u0103m\xE2ne liber\u0103 pentru reexaminare. Nu \xEE\u021Bi ocup\u0103 ma\u0219ina \u2014 po\u021Bi programa normal."
                    : "Nu \xEE\u021Bi ocup\u0103 ma\u0219ina \u2014 po\u021Bi programa normal.")) : null)
    })(), G.length > 0 && (() => {
        let A = G.filter(X => X.student.examResult !== "promovat"),
            O = G.filter(X => X.student.examResult === "promovat"),
            N = r <= Be(),
            C = A.length ? Math.min(u, A.length - 1) : 0,
            W = A[C];
        return o.default.createElement("div", {
            className: "mx-4 mb-3 space-y-2"
        }, O.map(X => o.default.createElement("div", {
            key: X.student.id,
            className: "relative overflow-hidden rounded-xl px-3.5 py-2.5 flex items-center gap-2",
            style: {
                backgroundImage: "linear-gradient(180deg, var(--ok-soft), transparent 80%)",
                border: "1px solid var(--ok-line)"
            }
        }, o.default.createElement(T0, null), o.default.createElement("span", {
            className: "relative text-base"
        }, "\u{1F389}"), o.default.createElement("span", {
            className: "relative text-sm font-medium truncate",
            style: {
                color: "var(--ok)"
            }
        }, X.student.name, " \xB7 permis luat!"))), W && o.default.createElement("div", {
            className: "rounded-xl px-3.5 py-3",
            style: {
                border: "1px solid var(--violet)"
            }
        }, o.default.createElement("div", {
            className: "flex items-center gap-2 mb-1.5"
        }, o.default.createElement("span", {
            className: "text-xs font-semibold uppercase tracking-wide flex-1",
            style: {
                color: "var(--violet)"
            }
        }, "Examen practic \xB7 ma\u0219ina e ocupat\u0103"), A.length > 1 && o.default.createElement("span", {
            className: "flex items-center gap-1 shrink-0",
            style: {
                color: "var(--violet)"
            }
        }, o.default.createElement("button", {
            onClick: () => d((C - 1 + A.length) % A.length),
            className: "p-1"
        }, o.default.createElement(ei, {
            size: 16
        })), o.default.createElement("span", {
            className: "font-mono-time text-xs"
        }, C + 1, "/", A.length), o.default.createElement("button", {
            onClick: () => d((C + 1) % A.length),
            className: "p-1"
        }, o.default.createElement(un, {
            size: 16
        })))), o.default.createElement("div", {
            className: "text-sm font-medium text-slate-900 truncate"
        }, W.student.name, o.default.createElement(Lf, {
            student: W.student,
            size: 13,
                sesiuni: n.sessions,
                setari: n.settings
            })), o.default.createElement("div", {
            className: "text-xs text-slate-500"
        }, W.label.toLowerCase(), " \xB7 ", Se(W.start), "\u2013", Se(W.end)), N && o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
            className: "flex gap-2 mt-2.5"
        }, o.default.createElement("button", {
            onClick: () => a(W.student.id, "promovat"),
            className: "flex-1 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium"
        }, "Promovat"), o.default.createElement("button", {
            onClick: () => a(W.student.id, "respins"),
            className: "flex-1 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-medium"
        }, "Respins")), o.default.createElement("p", {
            className: "text-xs text-slate-400 mt-1.5"
        }, "Se adaug\u0103 o sus\u021Binere la contor; la respins data r\u0103m\xE2ne liber\u0103 pentru reexaminare."))))
    })(), (() => {
        /* Ziua dinaintea unui examen practic e ziua în care se spală mașina.
           Anunțul stă pe ziua aceea, oricând te uiți la ea în Calendar, și
           dispare după ce pui intervalul. Atins, deschide formularul pe o oră
           liberă a zilei. */
        if (s || r < Be()) return null;
        let iasCine = iasExamenMaine(n, r);
        if (!iasCine.length || iasSpalatPus(n, r)) return null;
        return o.default.createElement("button", {
            "data-ias-spalat-zi": "",
            onClick: () => {
                let iasAcum = new Date;
                l(iasOraDeSpalat(n, r, r === Be() ? iasAcum.getHours() * 60 + iasAcum.getMinutes() : 0))
            },
            className: "mx-4 mb-3 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left",
            style: { width: "calc(100% - 2rem)", background: "var(--sky-soft)", border: "1px solid var(--sky-line)" }
        }, o.default.createElement(ar, {
            size: 16, className: "shrink-0", style: { color: "var(--sky)" }
        }), o.default.createElement("span", { className: "flex-1 min-w-0" },
            o.default.createElement("span", {
                className: "block text-sm truncate", style: { color: "var(--sky)" }
            }, (r === Be() ? "M\xE2ine" : "A doua zi") + (iasCine.length === 1 ? ` e examenul lui ${iasCine[0].name}` : ` sunt ${iasCine.length} elevi la examen`)),
            o.default.createElement("span", {
                className: "block text-xs", style: { color: "var(--muted)" }
            }, "Pune o or\u0103 liber\u0103, s\u0103 speli ma\u0219ina")),
        o.default.createElement(un, {
            size: 15, className: "shrink-0", style: { color: "var(--sky)" }
        }))
    })(), o.default.createElement("div", {
        className: "mx-4 mb-3"
    }, c.length > 0 && o.default.createElement("div", {
        className: "space-y-1.5 mb-1.5"
    }, c.map(A => o.default.createElement("div", {
        key: A.id,
        className: "flex items-center gap-2 rounded-xl px-3.5 py-2.5 bg-slate-50 border border-slate-200"
    }, o.default.createElement("span", {
        className: "text-xs text-slate-600 flex-1 min-w-0"
    }, o.default.createElement("span", {
        className: "font-medium"
    }, "Indisponibil"), " \xB7 ", A.allDay ? "toat\u0103 ziua" : `${Se(A.start)}\u2013${Se(A.end)}`, A.note ? o.default.createElement("span", {
        className: "text-slate-400"
    }, " \xB7 ", A.note) : null), o.default.createElement("button", {
        onClick: () => g(A.id),
        className: "p-1.5 text-slate-400 shrink-0"
    }, o.default.createElement(pa, {
        size: 15
    }))))), s ? o.default.createElement("div", {
        className: "rounded-xl bg-slate-50 border border-slate-200 p-3.5"
    }, o.default.createElement("div", {
        className: "flex gap-1.5 mb-3"
    }, o.default.createElement("button", {
        onClick: () => l({
            ...s,
            allDay: !0
        }),
        className: `flex-1 py-2 rounded-xl text-xs font-medium border ${s.allDay?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200"}`
    }, "Toat\u0103 ziua"), o.default.createElement("button", {
        onClick: () => l({
            ...s,
            allDay: !1
        }),
        className: `flex-1 py-2 rounded-xl text-xs font-medium border ${s.allDay?"bg-white text-slate-500 border-slate-200":"bg-slate-900 text-white border-slate-900"}`
    }, "Interval")), !s.allDay && o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "De la"
    }, o.default.createElement("select", {
        className: ie,
        value: s.startMin,
        onChange: A => l({
            ...s,
            startMin: Number(A.target.value)
        })
    }, mu.map(A => o.default.createElement("option", {
        key: A,
        value: A
    }, Se(A))))), o.default.createElement(xe, {
        label: "P\xE2n\u0103 la"
    }, o.default.createElement("select", {
        className: ie,
        value: s.endMin,
        onChange: A => l({
            ...s,
            endMin: Number(A.target.value)
        })
    }, mu.map(A => o.default.createElement("option", {
        key: A,
        value: A
    }, Se(A)))))), o.default.createElement(xe, {
        label: "Motiv (op\u021Bional)"
    }, o.default.createElement("input", {
        className: ie,
        value: s.note || "",
        onChange: A => l({
            ...s,
            note: A.target.value
        }),
        placeholder: "Ex: revizie ma\u0219in\u0103"
    })), o.default.createElement("div", {
        className: "flex gap-2"
    }, o.default.createElement("button", {
        onClick: () => l(null),
        className: "flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600"
    }, "Renun\u021B\u0103"), o.default.createElement("button", {
        onClick: m,
        className: "flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm"
    }, "Salveaz\u0103"))) : o.default.createElement("div", {
        /* Cele două opțiuni ale zilei stau împreună, pe un rând: înainte erau
           două bare late, una deasupra săptămânii și una dedesubt. */
        className: "flex gap-2"
    }, o.default.createElement("button", {
        onClick: () => l({
            allDay: !1,
            startMin: n.settings.startMin,
            endMin: Math.min(1440, n.settings.startMin + 180),
            note: ""
        }),
        className: "flex-1 min-w-0 py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs flex items-center justify-center gap-1.5"
    }, o.default.createElement(Xn, {
        size: 14, className: "shrink-0"
    }), "Marcheaz\u0103 indisponibil"), o.default.createElement("button", {
        onClick: () => iasCereOcupat(!0),
        title: "Text pentru elevul care te \xEEntreab\u0103 c\xE2nd po\u021Bi",
        className: "flex-1 min-w-0 py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs flex items-center justify-center gap-1.5"
    }, o.default.createElement(dn, {
        size: 14, className: "shrink-0"
    }), "C\xE2nd sunt ocupat"))),
    (() => {
        let A = KA(x, n.settings),
            O = x.filter(N => (N.status === "scheduled" || N.status === "pending") && N.location).sort((N, C) => N.startMin - C.startMin)[0];
        /* Traseul zilei a fost scos: presupunea un drum de făcut între toate
           punctele, ca la un curier. Munca merge altfel — iei un elev, faci ora
           pe unde e nevoie, îl lași și te duci la următorul. Singurul drum care
           contează e cel până la următoarea întâlnire, iar butonul acela a rămas. */
        return !O ? null : o.default.createElement("div", {
            className: "px-4 mb-3 flex gap-2"
        }, O && o.default.createElement("a", {
            href: wu(xo(n.settings, O.location), O.location, "dir"),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex-1 min-w-0 py-2.5 rounded-xl text-white text-xs font-medium flex items-center justify-center gap-1.5",
            style: {
                background: "var(--invert)",
                touchAction: "manipulation"
            }
        }, o.default.createElement(ar, {
            size: 14
        }), o.default.createElement("span", {
            className: "truncate"
        }, "Urm\u0103toarea \xB7 ", Se(O.startMin))))
    })(), o.default.createElement("div", {
        /* Lista sau axa: același lucru, văzut altfel. Lista e cea de până acum. */
        className: "px-4 mb-2 flex items-center justify-end gap-2"
    }, o.default.createElement("span", {
        className: "text-xs text-slate-400"
    }, "Ziua:"), o.default.createElement("div", {
        role: "group",
        "aria-label": "Cum arată ziua",
        "data-ias-vedere": iasVedere,
        className: "inline-flex rounded-xl border border-slate-200 bg-white",
        style: { padding: 2 }
    }, [["lista", "Listă"], ["axa", "Axă"]].map(([iasV, iasT]) => o.default.createElement("button", {
        key: iasV,
        type: "button",
        "aria-pressed": iasVedere === iasV,
        "data-ias-vedere-buton": iasV,
        onClick: () => { iasVedereZiScrisa(iasV), iasPuneVedere(iasV) },
        className: `px-3.5 py-1.5 rounded-lg text-xs font-medium ${iasVedere === iasV ? "bg-slate-900 text-white" : "text-slate-500"}`
    }, iasT)))), iasVedere === "axa" ? (() => {
        /* ============ ZIUA PE O AXĂ ============
           O oră ocupă mereu aceeași înălțime, deci o ședință de o oră și
           jumătate e cât o oră și jumătate, iar golurile se văd cât sunt de
           mari. Atinsă, o ședință se deschide ca în listă; atins un gol, ședința
           nouă pornește de la ora din locul atins. Semnele de stare, examenele,
           teoreticul și intervalele barate sunt aceleași ca în listă. */
        let E2 = o.default.createElement,
            PX = 56,
            iasDur = Y => or(Y, n.settings),
            iasSes = x.slice().sort((Y, J) => Y.startMin - J.startMin),
            iasPz = iasProgramZi(n.settings, r),
            iasLucru = b.length > 0,
            iasS = Math.min(iasLucru ? iasPz.startMin : 1440, ...iasSes.map(Y => Y.startMin)),
            iasE = Math.max(iasLucru ? iasPz.endMin : 0, ...iasSes.map(Y => Y.startMin + iasDur(Y)));
        if (!(iasE > iasS)) return null;
        iasS = Math.floor(iasS / 60) * 60, iasE = Math.ceil(iasE / 60) * 60;
        let iasY = m => (m - iasS) / 60 * PX,
            iasStanga = 44,
            iasTeo = iasTeoreticeZi(n.students, r).filter(Y => Y.theoryExamOra != null && Y.theoryExamOra !== ""),
            /* Examenele practice ale zilei: o singură bandă pentru fiecare
               jumătate de zi, cu toți elevii ei. */
            iasBenzi = [];
        G.forEach(Z => {
            let iasB = iasBenzi.find(q => q.start === Z.start && q.end === Z.end);
            iasB ? iasB.nume.push(Z.student.name) : iasBenzi.push({ start: Z.start, end: Z.end, nume: [Z.student.name] })
        });
        /* Golurile: ce rămâne din programul zilei după ședințe, intervalele
           barate și examenele practice — aceleași ca în listă. Banda
           examenului nu mai e și gol: în ea nu se propune nimeni. */
        let iasGoluri = iasLucru ? iasGoluriZi(n.settings, r, iasSes, c, G).filter(q => q[1] - q[0] >= Math.min(_, h)) : [];
        /* Ședințele care se suprapun stau una lângă alta, nu una peste alta. */
        let iasLoc = {};
        for (let i0 = 0; i0 < iasSes.length;) {
            let j0 = i0, fin = iasSes[i0].startMin + iasDur(iasSes[i0]), col = [];
            while (j0 + 1 < iasSes.length && iasSes[j0 + 1].startMin < fin) j0++, fin = Math.max(fin, iasSes[j0].startMin + iasDur(iasSes[j0]));
            for (let k0 = i0; k0 <= j0; k0++) {
                let Y = iasSes[k0], q = col.findIndex(w => w <= Y.startMin);
                q < 0 && (q = col.length, col.push(0)), col[q] = Y.startMin + iasDur(Y), iasLoc[Y.id] = { c: q }
            }
            for (let k0 = i0; k0 <= j0; k0++) iasLoc[iasSes[k0].id].n = col.length;
            i0 = j0 + 1
        }
        let iasAcum = (() => { let d0 = new Date; return d0.getHours() * 60 + d0.getMinutes() })(),
            iasHasura = "repeating-linear-gradient(135deg, var(--track) 0 7px, transparent 7px 14px)",
            iasPeAxa = { left: iasStanga, right: 0 };
        return E2("div", {
            className: "px-4",
            "data-ias-axa": ""
        }, E2("div", {
            className: "relative",
            style: { height: iasY(iasE) + 8 }
        },
            /* orele */
            Array.from({ length: (iasE - iasS) / 60 + 1 }, (z0, k0) => iasS + k0 * 60).map(m => E2(o.default.Fragment, { key: "o" + m },
                E2("span", {
                    className: "absolute font-mono-time text-xs text-slate-400",
                    "aria-hidden": "true",
                    style: { left: 0, width: 34, textAlign: "right", top: iasY(m) - 8, lineHeight: "16px" }
                }, Se(m).slice(0, 2)),
                E2("span", {
                    className: "absolute",
                    "aria-hidden": "true",
                    style: { ...iasPeAxa, top: iasY(m), height: 1, background: "var(--line)" }
                }))),
            /* examenele practice */
            /* Banda are numele scris în ea. Atinsă, deschide o ședință nouă la
               ora atinsă, ca rândurile „Examen” din listă; sugestii nu are. */
            iasBenzi.map(Z => E2(o.default.Fragment, { key: "e" + Z.start },
                E2("button", {
                    type: "button",
                    "data-ias-axa-examen": "",
                    "aria-label": `Examen ${Se(Z.start)}\u2013${Se(Z.end)}: ${Z.nume.join(", ")}`,
                    onClick: q0 => {
                        let iasR = q0.currentTarget.getBoundingClientRect(),
                            m = Z.start + Math.floor(Math.max(0, q0.clientY - iasR.top) / PX * 60 / _) * _;
                        e("create", { date: r, startMin: Math.max(Z.start, Math.min(m, Z.end - _)) })
                    },
                    className: "absolute rounded-xl text-left",
                    style: {
                        ...iasPeAxa, top: iasY(Z.start) + 2, height: iasY(Z.end) - iasY(Z.start) - 4,
                        background: "color-mix(in srgb, var(--violet) 9%, transparent)",
                        border: "1.5px solid var(--violet)", color: "var(--violet)",
                        display: "flex", alignItems: "flex-start", gap: 8, padding: "7px 12px 0", fontSize: 12, overflow: "hidden"
                    }
                }, E2("span", { className: "font-mono-time shrink-0" }, Se(Z.start), "–", Se(Z.end)),
                    E2("span", { className: "truncate", style: { fontWeight: 600 } }, "Examen practic \xB7 ", Z.nume.join(", "))),
                /* Dunga de pe marginea orelor: se vede și când ședințele acoperă banda. */
                E2("span", {
                    "aria-hidden": "true",
                    className: "absolute",
                    style: { left: iasStanga - 7, width: 4, borderRadius: 2, top: iasY(Z.start), height: iasY(Z.end) - iasY(Z.start), background: "var(--violet)" }
                }))),
            /* golurile, de atins */
            iasGoluri.map(([q, w]) => {
                let iasH = iasY(w) - iasY(q) - 4,
                    /* Rândurile de sugestii ale golului, fiecare la înălțimea
                       orei lui: sub titlu, iar dacă două ore sunt prea
                       apropiate, al doilea rând coboară cât să nu se calce. */
                    iasRanduri = Object.keys(iasSugZi).map(Number).filter(t => t >= q && t + h <= w).sort((t, u) => t - u),
                    iasJos = 26,
                    iasPoz = iasRanduri.map(t => {
                        let sus = Math.max(iasJos, iasY(t) - iasY(q) + 2);
                        iasJos = sus + 28;
                        return { t, sus }
                    }).filter(x => x.sus + 26 <= iasH + 2);
                return E2("div", {
                    key: "g" + q,
                    className: "absolute",
                    style: { ...iasPeAxa, top: iasY(q) + 2, height: Math.max(20, iasH) }
                }, E2("button", {
                    type: "button",
                    "data-ias-gol": q,
                    "aria-label": `Liber ${Se(q)}–${Se(w)}: adaugă o ședință`,
                    onClick: Z => {
                        let iasR = Z.currentTarget.getBoundingClientRect(),
                            m = q + Math.floor(Math.max(0, Z.clientY - iasR.top) / PX * 60 / _) * _;
                        m = Math.max(q, Math.min(m, Math.max(q, w - h)));
                        y >= 30 ? e("create", { date: r, startMin: m }) : p(m)
                    },
                    className: "absolute inset-0 w-full rounded-xl border border-dashed border-slate-300 text-slate-400 active:border-amber-300"
                }), E2("span", {
                    className: "relative flex items-center gap-2 px-3 text-xs pointer-events-none",
                    style: { paddingTop: iasH > 36 ? 7 : 1, color: "var(--muted)" }
                }, E2("span", { className: "font-mono-time" }, Se(q), "–", Se(w)),
                    E2("span", { className: "truncate" }, "Liber",
                        iasTeo.filter(Y => Number(Y.theoryExamOra) >= q && Number(Y.theoryExamOra) < w)
                            .map(Y => ` \xB7 Teoretic ${Y.name.split(" ")[0]} ${Se(Number(Y.theoryExamOra))}`).join("")),
                    E2(cn, { size: 13, className: "ml-auto shrink-0" })),
                    iasPoz.map(({ t, sus }) => E2("div", {
                        key: "s" + t,
                        "data-ias-sugestie-axa": t,
                        className: "absolute flex items-center gap-1.5 px-3",
                        style: { left: 0, right: 0, top: sus, height: 26, overflow: "hidden" }
                    }, E2("span", {
                        className: "font-mono-time text-xs shrink-0",
                        style: { color: "var(--accent-ink)", minWidth: 38 }
                    }, Se(t)), iasSugZi[t].map(Y => E2("button", {
                        key: Y.id,
                        type: "button",
                        "aria-label": `Adaugă ${Y.name} la ${Se(t)}`,
                        onClick: () => e("create", { date: r, startMin: t, studentId: Y.id }),
                        className: "text-xs px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 truncate",
                        style: { minWidth: 0, maxWidth: "48%" }
                    }, "+ ", Y.name.split(" ").slice(0, 2).join(" "), E2(Lf, { student: Y, size: 12, sesiuni: n.sessions, setari: n.settings }))))))
            }),
            /* intervalele barate și pauzele */
            c.filter(N => N.end > iasS && N.start < iasE).map((N, k0) => {
                let q = Math.max(iasS, N.start), w = Math.min(iasE, N.end),
                    iasCuEx = !!y0(G, q, w - q) || iasTeo.some(Y => Number(Y.theoryExamOra) >= q && Number(Y.theoryExamOra) < w);
                return E2("div", {
                    key: "b" + k0,
                    "data-ias-rand": iasCuEx ? "examen-indisponibil" : "indisponibil",
                    className: "absolute rounded-xl border border-dashed flex items-start px-3 text-xs",
                    style: {
                        ...iasPeAxa, top: iasY(q) + 2, height: Math.max(18, iasY(w) - iasY(q) - 4),
                        paddingTop: iasY(w) - iasY(q) > 30 ? 6 : 1, overflow: "hidden",
                        borderColor: iasCuEx ? "var(--violet)" : "var(--line-2)",
                        color: iasCuEx ? "var(--violet)" : "var(--muted)",
                        backgroundImage: iasCuEx
                            ? iasHasura + ", repeating-linear-gradient(45deg, color-mix(in srgb, var(--violet) 20%, transparent) 0 7px, transparent 7px 14px)"
                            : iasHasura
                    }
                }, E2("span", { className: "font-mono-time shrink-0", style: { marginRight: 8 } }, Se(q), "–", Se(w)),
                    E2("span", { className: "truncate" }, iasCuEx ? "Examen \xB7 indisponibil" : "Indisponibil", N.note ? ` \xB7 ${N.note}` : ""))
            }),
            /* teoreticul: o linie la ora lui și un punct pe marginea orelor. Nu-ți
               ocupă mașina; golul în care cade îl pomenește în textul lui. */
            iasTeo.map(Y => {
                let m = Number(Y.theoryExamOra);
                return E2("div", {
                    key: "t" + Y.id,
                    "data-ias-axa-teoretic": "",
                    role: "img",
                    "aria-label": `Teoretic: ${Y.name}, la ${Se(m)}`,
                    className: "absolute pointer-events-none",
                    style: { left: iasStanga - 8, right: 0, top: iasY(m) - 1, height: 2, background: "var(--violet)", zIndex: 1 }
                }, E2("span", {
                    style: { position: "absolute", left: 0, top: -4, width: 10, height: 10, borderRadius: 99, background: "var(--violet)" }
                }))
            }),
            /* ședințele */
            iasSes.map(Y => {
                let iasD = iasDur(Y), O = y0(G, Y.startMin, iasD),
                    J = go[Y.status] || go.scheduled,
                    z = { blue: "bg-blue-500", amber: "bg-amber-500", emerald: "bg-emerald-500", red: "bg-red-500" }[J.c],
                    iasPesteBlocaj = !!bf(c, Y.startMin, iasD),
                    iasL = iasLoc[Y.id] || { c: 0, n: 1 },
                    iasH = iasY(Y.startMin + iasD) - iasY(Y.startMin) - 3,
                    iasLat = iasL.n === 1,
                    /* Notița, ca în listă: a ședinței, iar dacă n-are, cea mai
                       nouă a elevului. Pe ședințele lungi stă pe rândul ei, sub
                       nume; pe cele scurte, lângă oră. */
                    iasN = iasNotitaDeCard(Y, n.students.find(iasE3 => iasE3.id === Y.studentId)),
                    iasNStil = { color: "var(--muted-2)", fontStyle: "italic", opacity: iasN && iasN.aElevului ? .8 : 1 },
                    iasNRand = !!iasN && iasH >= 66;
                return E2("button", {
                    key: Y.id,
                    type: "button",
                    "data-ias-sedinta-axa": Y.id,
                    onClick: () => e("edit", Y),
                    className: "absolute flex items-stretch bg-white rounded-xl border overflow-hidden text-left active:bg-slate-50 ias-fara-meniu" + (iasPesteBlocaj ? " ias-peste-blocaj" : ""),
                    style: {
                        top: iasY(Y.startMin) + 1, height: Math.max(28, iasH),
                        left: `calc(${iasStanga}px + (100% - ${iasStanga}px) * ${iasL.c} / ${iasL.n})`,
                        width: `calc((100% - ${iasStanga}px) / ${iasL.n} - ${iasLat ? 0 : 3}px)`,
                        borderColor: O ? "var(--violet)" : void 0, zIndex: 2
                    }
                }, E2("div", {
                    className: `w-1.5 shrink-0 ${O ? "" : z}`,
                    style: O ? { background: "var(--violet)" } : void 0
                }), E2("div", {
                    className: "flex-1 min-w-0 px-3 flex flex-col justify-center",
                    style: { paddingTop: 4, paddingBottom: 4 }
                }, E2("div", {
                    className: "text-xs text-slate-400 flex items-baseline min-w-0"
                }, E2("span", { className: "font-mono-time shrink-0" }, Se(Y.startMin), " – ", Se(Y.startMin + iasD)),
                    iasN && !iasNRand ? E2("span", { "data-ias-notita-axa": "", className: "truncate min-w-0", style: { ...iasNStil, marginLeft: 6 } }, "\xB7 ", iasN.text) : null), E2("div", {
                    className: "font-medium text-slate-900 text-sm truncate"
                }, k(Y.studentId), E2(Lf, {
                    student: n.students.find(iasE2 => iasE2.id === Y.studentId),
                    size: 13, sesiuni: n.sessions, setari: n.settings
                }), Y.auto && E2("span", {
                    className: "ml-1.5 text-xs font-normal", style: { color: "var(--accent-ink)" }
                }, "⚙ auto")), O && iasH >= 66 && E2("div", {
                    className: "text-xs", style: { color: "var(--violet)" }
                }, "peste examen"), iasNRand ? E2("div", {
                    "data-ias-notita-axa": "", className: "text-xs truncate", style: iasNStil
                }, iasN.text) : null, Y.location && iasH >= (iasNRand ? 76 : 66) && E2("div", {
                    className: "text-xs text-slate-400 truncate flex items-center gap-1"
                }, E2(dn, { size: 10, className: "shrink-0" }), Y.location)), E2("div", {
                    className: "flex items-center shrink-0 pr-2"
                }, iasLat && iasH >= 54 ? E2(I0, { status: Y.status }) : E2(IasSemn, { fel: Y.status, size: 20 })))
            }),
            /* acum */
            r === Be() && iasAcum >= iasS && iasAcum <= iasE ? E2("div", {
                "data-ias-axa-acum": "",
                "aria-hidden": "true",
                className: "absolute pointer-events-none",
                style: { left: iasStanga - 6, right: 0, top: iasY(iasAcum) - 1, height: 2, background: "var(--accent)", zIndex: 3, boxShadow: "0 0 10px var(--glow, transparent)" }
            }, E2("span", {
                style: { position: "absolute", left: -1, top: -4, width: 10, height: 10, borderRadius: 99, background: "var(--accent)" }
            })) : null))
    })() : o.default.createElement("div", {
        className: "px-4 space-y-1.5"
    }, (B = -1e9, null), b.map(A => {
        let O = y0(G, A, _),
            /* Intervalul în care cade examenul teoretic se colorează la fel ca
               al celui practic. E doar un semn pentru ochi: teoreticul nu-ți
               ocupă mașina, deci ora rămâne liberă de programat. */
            iasTeoAici = iasTeoreticeZi(n.students, r).filter(Y =>
                Y.theoryExamOra != null && Y.theoryExamOra !== ""
                && Number(Y.theoryExamOra) >= A && Number(Y.theoryExamOra) < A + _),
            N = bf(c, A, _),
            C = x.filter(Y => Y.startMin >= A && Y.startMin < A + _).sort((Y, J) => Y.startMin - J.startMin);
        if (C.length > 0) return C.map(Y => {
            let J = go[Y.status] || go.scheduled,
                z = {
                    blue: "bg-blue-500",
                    amber: "bg-amber-500",
                    emerald: "bg-emerald-500",
                    red: "bg-red-500"
                } [J.c];
            /* Ședința programată peste un interval barat se vede normal, dar
               poartă hașura peste ea, transparentă: se citește tot, și se știe
               că e pusă într-un interval pe care l-ai marcat indisponibil. */
            let iasPesteBlocaj = !!bf(b0(n.settings, r), Y.startMin, or(Y, n.settings));
            return o.default.createElement("button", {
                key: Y.id,
                onClick: () => e("edit", Y),
                /* Fără asta, ținutul apăsat ridică meniul browserului („Back,
                   Reload, Share…") peste fereastra noastră. */
                className: "w-full flex items-stretch bg-white rounded-xl border overflow-hidden text-left active:bg-slate-50 ias-fara-meniu" + (iasPesteBlocaj ? " ias-peste-blocaj" : ""),
                style: O ? {
                    borderColor: "var(--violet)"
                } : void 0
            }, o.default.createElement("div", {
                className: `w-1.5 ${O?"":z}`,
                style: O ? {
                    background: "var(--violet)"
                } : void 0
            }), o.default.createElement("div", {
                className: "flex-1 px-3.5 py-3 flex items-center justify-between gap-2 min-w-0"
            }, o.default.createElement("div", {
                className: "min-w-0"
            }, o.default.createElement("div", {
                className: "font-mono-time text-xs text-slate-400"
            }, Se(Y.startMin), " \u2013 ", Se(Y.startMin + or(Y, n.settings))), o.default.createElement("div", {
                className: "font-medium text-slate-900 text-sm mt-0.5 truncate"
            }, k(Y.studentId), o.default.createElement(Lf, {
                student: n.students.find(iasE => iasE.id === Y.studentId),
                size: 13,
                sesiuni: n.sessions,
                setari: n.settings
            }), Y.auto && o.default.createElement("span", {
                className: "ml-1.5 text-xs font-normal",
                style: {
                    color: "var(--accent-ink)"
                }
            }, "\u2699 auto"), Y.imported && o.default.createElement("span", {
                className: "ml-1.5 text-xs font-normal text-slate-400"
            }, "\u21B7 transfer"), Y.otherInstructor && o.default.createElement("span", {
                className: "ml-1.5 text-xs font-normal text-violet-600"
            }, "\xB7 ", Y.instructorName || "alt instructor")), Y.location && o.default.createElement("div", {
                className: "text-xs text-slate-400 mt-0.5 flex items-center gap-1 truncate"
            }, o.default.createElement(dn, {
                size: 10,
                className: "shrink-0"
            }), Y.location)),
            /* Notița ședinței, în golul dintre nume și status: e locul care
               stătea gol oricum, iar ce ai scris acolo se citește fără să mai
               deschizi fișa. Doar ce ai scris tu, nimic adăugat. */
            /* O ascunsesem pe ecranele sub 640 de puncte, adică taman pe
               telefon — acolo unde te uiți la ea. Acum se vede întotdeauna: în
               golul dintre nume și status când e loc, iar dacă nu, se strânge
               la o singură linie tăiată. */
            (() => {
                let iasN = iasNotitaDeCard(Y, n.students.find(iasE => iasE.id === Y.studentId));
                return iasN ? o.default.createElement("div", {
                    className: "flex-1 min-w-0 px-2.5 self-center",
                    style: { maxWidth: 280, minWidth: 40 }
                }, o.default.createElement("span", {
                    className: "block text-xs truncate",
                    style: {
                        color: "var(--muted-2)", fontStyle: "italic",
                        opacity: iasN.aElevului ? .8 : 1
                    }
                }, iasN.text)) : null
            })(),
            o.default.createElement("div", {
                className: "flex flex-col items-end gap-1 shrink-0"
            }, o.default.createElement(I0, {
                status: Y.status
            }), Y.clash && o.default.createElement("span", {
                className: "text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap bg-amber-50 text-amber-700 border border-amber-200"
            }, "suprapus\u0103"), O && o.default.createElement("span", {
                className: "text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap",
                style: {
                    color: "var(--violet)",
                    border: "1px solid var(--violet)"
                }
            }, "peste examen"))))
        });
        if (x.some(Y => bu(A, _, Y.startMin, or(Y, n.settings)))) return null;
        if (N) {
            /* Intervalul barat care cade peste un examen le poartă pe amândouă:
               chenarul și culoarea examenului, cu hașura de „indisponibil"
               încrucișată peste ea. Înainte, bararea ștergea examenul din
               grilă — rămânea doar „Indisponibil", iar ziua părea fără examen. */
            let iasCuExamen = !!O || iasTeoAici.length > 0;
            return o.default.createElement("div", {
                key: A,
                "data-ias-rand": iasCuExamen ? "examen-indisponibil" : "indisponibil",
                className: "w-full flex items-center gap-3 px-3.5 py-2 rounded-xl border border-dashed",
                style: iasCuExamen ? {
                    borderColor: "var(--violet)",
                    color: "var(--violet)",
                    backgroundImage: "repeating-linear-gradient(135deg, var(--track) 0 7px, transparent 7px 14px), repeating-linear-gradient(45deg, color-mix(in srgb, var(--violet) 20%, transparent) 0 7px, transparent 7px 14px)"
                } : {
                    borderColor: "var(--line-2)",
                    color: "var(--muted)",
                    backgroundImage: "repeating-linear-gradient(135deg, var(--track) 0 7px, transparent 7px 14px)"
                }
            }, o.default.createElement("span", {
                className: "font-mono-time text-xs w-12 text-left shrink-0"
            }, Se(A)), o.default.createElement("span", {
                className: "text-xs truncate"
            }, O ? "Examen \xB7 indisponibil"
                : iasTeoAici.length ? `Teoretic \xB7 ${iasTeoAici.map(Y => Y.name.split(" ")[0]).join(", ")} \xB7 indisponibil`
                : "Indisponibil", N.note ? ` \xB7 ${N.note}` : ""))
        }
        if (O) return o.default.createElement("button", {
            key: A,
            onClick: () => e("create", {
                date: r,
                startMin: A
            }),
            className: "w-full flex items-center gap-3 px-3.5 py-2 rounded-xl border border-dashed",
            style: {
                borderColor: "var(--violet)",
                color: "var(--violet)",
                backgroundImage: "repeating-linear-gradient(135deg, var(--track) 0 7px, transparent 7px 14px)"
            }
        }, o.default.createElement("span", {
            className: "font-mono-time text-xs w-12 text-left shrink-0"
        }, Se(A)), o.default.createElement("span", {
            className: "text-xs truncate"
        }, "Examen"), o.default.createElement(cn, {
            size: 14,
            className: "ml-auto shrink-0"
        }));
        let X = x.some(Y => Y.startMin + or(Y, n.settings) <= A),
            R = x.some(Y => Y.startMin >= A + h),
            K = X && R,
            ne = B !== A - _;
        return B = A, o.default.createElement("div", {
            key: A
        }, o.default.createElement("button", {
            onClick: () => y >= 30 ? e("create", {
                date: r,
                startMin: A
            }) : p(A),
            className: "w-full flex items-center gap-3 px-3.5 py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 active:border-amber-300 active:text-amber-600",
            style: iasTeoAici.length ? {
                borderColor: "var(--violet)",
                background: "color-mix(in srgb, var(--violet) 7%, transparent)"
            } : void 0
        }, o.default.createElement("span", {
            className: "font-mono-time text-xs w-12 text-left"
        }, Se(A)), o.default.createElement("span", {
            className: "text-xs"
        }, iasTeoAici.length
            ? `Teoretic \xB7 ${iasTeoAici.map(Y => Y.name.split(" ")[0]).join(", ")}`
            : "Liber"), o.default.createElement(cn, {
            size: 14,
            className: "ml-auto"
        })), (iasSugZi[A] || []).length > 0 && o.default.createElement("div", {
            className: "flex flex-wrap items-center gap-1.5 pl-4 mt-1"
        }, o.default.createElement("span", {
            className: "text-xs text-slate-400"
        }, K ? "Umple golul:" : "Adaug\u0103 rapid:"), iasSugZi[A].map(Y => o.default.createElement("button", {
            key: Y.id,
            onClick: () => e("create", {
                date: r,
                startMin: A,
                studentId: Y.id
            }),
            className: "text-xs px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700"
        }, "+ ", Y.name, o.default.createElement(Lf, {
            student: Y,
            size: 12,
                sesiuni: n.sessions,
                setari: n.settings
            })))))
    })), o.default.createElement(Ok, {
        open: f != null,
        ora: f,
        pas: y,
        durata: h,
        ocupat: A => x.some(O => bu(A, h, O.startMin, or(O, n.settings))) || !!bf(c, A, h),
        peste: n.settings.endMin,
        onClose: () => p(null),
        onAlege: A => {
            p(null), e("create", {
                date: r,
                startMin: A
            })
        }
    }), o.default.createElement("button", {
        onClick: () => e("create", {
            date: r
        }),
        className: "fixed bottom-20 right-4 w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
    }, o.default.createElement(cn, {
        size: 26
    })))
}

function Uk({
    elevi: n,
    value: e,
    onChange: t,
    ascunsi: iasAscunsi = 0,
    onDeschis: iasSpune
}) {
    /* Când se deschide căutarea, dă de știre în afară: fișa ședinței își
       retrage atunci butoanele de status, ca lista de elevi să aibă tot
       ecranul. Altfel patru pătrate mari stau între tine și listă tocmai când
       ai nevoie de ea. */
    let [a, r] = (0, o.useState)(!1), [i, s] = (0, o.useState)(""), l = n.find(f => f.id === e) || null, u = pu(i).trim(), d = u ? n.filter(f => pu(`${f.name} ${f.group||""}`).includes(u) || (f.phone || "").includes(i.trim())) : n;
    return a ? o.default.createElement("div", {
        className: "mb-3.5"
    }, o.default.createElement("div", {
        className: "relative"
    }, o.default.createElement(Oi, {
        size: 16,
        className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
    }), o.default.createElement("input", {
        autoFocus: !0,
        value: i,
        onChange: f => s(f.target.value),
        placeholder: "Caut\u0103 dup\u0103 nume, grup\u0103 sau telefon",
        onFocus: iasAdu,
        /* Fără astea, telefonul crede că e un câmp de autentificare și ridică
           deasupra tastaturii bara lui cu cheia și cardul, care fură un rând
           întreg tocmai când ai nevoie de el pentru listă. */
        type: "search",
        inputMode: "search",
        name: "cauta-elev",
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: !1,
        enterKeyHint: "search",
        className: `${ie} pl-10 pr-10`
    }), o.default.createElement("button", {
        type: "button",
        onClick: () => { r(!1), s(""), iasSpune && iasSpune(!1) },
        "aria-label": "\xCEnchide lista",
        className: "absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-slate-400"
    }, o.default.createElement(ir, {
        size: 16
    }))), o.default.createElement("div", {
        className: "mt-1.5 rounded-xl border border-slate-200 bg-white overflow-y-auto",
        style: {
            /* Cu telefonul culcat și tastatura ridicată rămân vreo trei sute de
               puncte pe înălțime; o listă de 220 nu mai încăpea deloc. Acum ia
               jumătate din cât s-a văzut cu adevărat, dar nu mai mult de 220. */
            maxHeight: "min(220px, calc(var(--ias-vazut, 100vh) * 0.5))",
            minHeight: 92
        }
    }, d.length === 0 && o.default.createElement("div", {
        className: "px-3.5 py-3 text-sm text-slate-400"
    }, iasAscunsi > 0 && !u
        ? `To\u021Bi elevii disponibili au deja o \u0219edin\u021B\u0103 \xEEn ziua asta.`
        : "Niciun elev nu se potrive\u0219te."), d.map(f => o.default.createElement("button", {
        key: f.id,
        type: "button",
        onClick: () => {
            t(f.id), r(!1), s(""), iasSpune && iasSpune(!1)
        },
        className: "w-full flex items-center gap-2 px-3.5 py-2.5 text-left border-b border-slate-100 last:border-0 active:bg-slate-50"
    }, o.default.createElement("span", {
        className: "text-sm text-slate-800 truncate flex-1"
    }, f.name), o.default.createElement(Lf, {
        student: f,
        size: 13,
                sesiuni: n.sessions,
                setari: n.settings
            }), f.group ? o.default.createElement("span", {
        className: "text-xs text-slate-400 shrink-0"
    }, "gr. ", f.group) : null))), iasAscunsi > 0 ? o.default.createElement("p", {
        className: "text-xs text-slate-400 mt-1.5"
    }, iasAscunsi === 1
        ? "Un elev nu apare \xEEn list\u0103: are deja o \u0219edin\u021B\u0103 \xEEn ziua asta."
        : `${iasAscunsi} elevi nu apar \xEEn list\u0103: au deja o \u0219edin\u021B\u0103 \xEEn ziua asta.`) : null) : o.default.createElement("div", {
        className: "flex items-center gap-2 mb-3.5"
    }, o.default.createElement("button", {
        type: "button",
        onClick: () => {
            r(!0), s(""), iasSpune && iasSpune(!0)
        },
        className: `${ie} text-left flex items-center gap-2`
    }, o.default.createElement(Oi, {
        size: 15,
        className: "text-slate-400 shrink-0"
    }), o.default.createElement("span", {
        className: l ? "text-slate-900 truncate" : "text-slate-400"
    }, l ? l.name : "Alege elevul")), l && o.default.createElement(Lf, {
        student: l,
                sesiuni: n.sessions,
                setari: n.settings
            }))
}

function Rk({
    open: n,
    mode: e,
    initial: t,
    data: a,
    cycleKind: r,
    onClose: i,
    onSave: s,
    onDelete: l,
    onTrimiteConfirmare: u
}) {
    let [iasInit, iasPuneInit] = (0, o.useState)(""), [iasIntreb, iasIntreaba] = (0, o.useState)(!1),
        [iasCautaElev, iasCauta] = (0, o.useState)(!1),
        [d, f] = (0, o.useState)(null), [p, c] = (0, o.useState)(""), [m, g] = (0, o.useState)(Be()), [v, w] = (0, o.useState)(a.settings.startMin), [x, h] = (0, o.useState)("included"), [y, _] = (0, o.useState)("scheduled"), [b, M] = (0, o.useState)(""), [S, k] = (0, o.useState)(""), [E, B] = (0, o.useState)(!1), [$, G] = (0, o.useState)(""), [A, O] = (0, o.useState)(""), [N, C] = (0, o.useState)(""), [W, X] = (0, o.useState)(!1), [R, K] = (0, o.useState)(null), ne = (0, o.useMemo)(() => {
        if (e !== "edit" || !t || !t.id) return null;
        let L = Be();
        return t.status === "pending" && t.date >= L ? "pending" : (t.status === "scheduled" || t.status === "pending") && t.date < L ? "unmarked" : null
    }, [e, t]), Y = r || ne, J = (0, o.useMemo)(() => {
        if (!Y) return null;
        let L = Be(),
            T = (j, Q) => (j.date + Se(j.startMin)).localeCompare(Q.date + Se(Q.startMin));
        return Y === "pending" ? a.sessions.filter(j => j.status === "pending" && j.date >= L).sort(T) : a.sessions.filter(j => (j.status === "scheduled" || j.status === "pending") && j.date < L).sort(T)
    }, [Y, a.sessions]), z = L => {
        c(L.studentId), g(L.date), w(L.startMin), h(L.type), _(L.status), M(L.notes || ""), k(L.location || ""), B(!!L.otherInstructor), G(L.instructorName || ""), O(iasLimbaDe(L))
    };
    if ((0, o.useEffect)(() => {
            if (!n) {
                f(null);
                return
            }
            /* Căutarea de elev se închide la fiecare deschidere de fișă. Fără
               asta, dacă ai ieșit din fișă cu lista deschisă, semnul rămânea
               pus, iar la fișa următoare butoanele de status lipseau — până
               deschideai și închideai iar căutarea. */
            if (C(""), X(!1), K(null), iasCauta(!1), iasPuneInit("?"), e === "edit" && t) f(t), z(t);
            else {
                f(null);
                let L = t?.studentId || "",
                    T = a.students.find(pe => pe.id === L),
                    j = t?.date || null,
                    Q = t?.startMin;
                if (Q == null) {
                    let pe = sk(a.sessions, a.settings, j);
                    j = pe.date, Q = pe.startMin
                }
                c(L), g(j || Be()), w(Q), h(T ? gw(T, a.sessions) : "included"), _("scheduled"), M(""), k(t?.location || T?.defaultLocation || ""), B(!1), G(""), O(iasLimbaDe(T)), iasPuneInit("?")
            }
        }, [n, e, t]), (0, o.useEffect)(() => {
        /* Cum arăta fișa după ce s-a umplut. Înainte o măsuram pe un ceas pus
           la deschidere, care se declanșa înainte ca datele ședinței să apuce
           să intre în câmpuri — așa că fișa părea schimbată de la bun început
           și te întreba degeaba la închidere. Acum o măsurăm exact în clipa în
           care câmpurile s-au așezat. */
        if (!n) { iasInit && iasPuneInit(""); return }
        /* Semnul „?" înseamnă „încă n-am măsurat". Îl punem când se deschide
           fișa, iar măsurătoarea se face abia la desenarea următoare, când
           câmpurile s-au umplut cu adevărat. */
        if (iasInit === "?") iasPuneInit(JSON.stringify([p, m, v, x, y, b, S, E, $, A])), iasIntreaba(!1)
    }, [n, iasInit, p, m, v, x, y, b, S, E, $, A]), !n) return null;
    let q = e === "edit" ? d || t : null,
        de = q ? q.id : null,
        ge = a.students.find(L => L.id === p),
        ye = Fa(a.settings),
        /* Grila de ore ține și ea ora ședinței deschise, chiar dacă a rămas în
           afara programului de lucru: altfel n-ai mai vedea pe ce oră e pusă. */
        Ne = (() => {
            let iasG = Tf(a.settings, m).slice();
            if (v != null && iasG.indexOf(v) < 0) iasG.push(v), iasG.sort((L, T) => L - T);
            return iasG
        })(),
        ce = a.sessions.filter(L => L.date === m && L.status !== "cancelled" && L.id !== de && !L.otherInstructor),
        ze = L => ce.some(T => bu(L, ye, T.startMin, or(T, a.settings))),
        re = J ? J.length : 0,
        se = J && q ? J.findIndex(L => L.id === q.id) : -1,
        fe = L => {
            if (!J || J.length === 0) return;
            let T = se < 0 ? 0 : se,
                j = J[((T + L) % J.length + J.length) % J.length];
            f(j), z(j), C(""), K(null), X(!1)
        };

    function he() {
        let L = N;
        if (C(""), !p) {
            C("Alege un elev.");
            return
        }
        if (!E && w0(a.sessions, m, v, de, a.settings)) {
            C("Acest interval se suprapune cu alt\u0103 \u0219edin\u021B\u0103.");
            return
        }
        if (Nw(a.sessions, p, m, de)) {
            C("Acest elev are deja o \u0219edin\u021B\u0103 \xEEn aceast\u0103 zi.");
            return
        }
        /* Peste un interval marcat indisponibil se poate programa, dar nu din
           greșeală: te avertizează o dată, iar a doua atingere trece peste. */
        let iasBl = bf(b0(a.settings, m), v, ye);
        if (iasBl && !L.startsWith("Aten\u021Bie")) {
            C(`Aten\u021Bie: intervalul e marcat indisponibil${iasBl.reason ? ` (${iasBl.reason})` : ""}. Apas\u0103 din nou \u201ESalveaz\u0103" ca s\u0103 programezi oricum.`);
            return
        }
        let T = y0(v0(a.students, m), v, ye);
        if (T && !L.startsWith("Aten\u021Bie")) {
            C(`Aten\u021Bie: ${T.student.name} are examen practic \xEEn aceast\u0103 zi (${kA(T.period)}), deci ma\u0219ina e ocupat\u0103. Apas\u0103 din nou \u201ESalveaz\u0103" ca s\u0103 programezi oricum.`);
            return
        }
        let j = bf(b0(a.settings, m), v, ye);
        if (j && !L.startsWith("Aten\u021Bie")) {
            C(`Aten\u021Bie: ai marcat acest interval ca indisponibil${j.note?` (${j.note})`:""}. Apas\u0103 din nou \u201ESalveaz\u0103" ca s\u0103 programezi oricum.`);
            return
        }
        let Q = C0(ge, m, v, ye);
        if (Q && !L.startsWith("Aten\u021Bie")) {
            C(`Aten\u021Bie: ${ge.name} e \xEEn tur\u0103 (${E0(Q)}). Apas\u0103 din nou \u201ESalveaz\u0103" ca s\u0103 programezi oricum.`);
            return
        }
        let pe = VA(ge, a.sessions, m, de);
        if (pe && !L.startsWith("Aten\u021Bie")) {
            C(pe);
            return
        }
        let we = Pw(a.sessions, p, m, de),
            Re = Number(ge?.weeklyLimit) || a.settings.defaultWeeklyLimit;
        if (we >= Re) {
            K({
                limit: Re
            });
            return
        }
        H()
    }

    function H() {
        s({
            studentId: p,
            date: m,
            startMin: v,
            type: x,
            status: y,
            notes: b,
            location: S,
            otherInstructor: E,
            instructorName: E ? $.trim() : "",
            limba: A,
            english: A === "en"
        }, e, q || t)
    }
    /* Ca la fișa elevului: dacă ai schimbat ceva, închiderea întreabă întâi. */
    let iasAcum = JSON.stringify([p, m, v, x, y, b, S, E, $, A]),
        iasInchide = () => { iasInit && iasInit !== "?" && iasAcum !== iasInit ? iasIntreaba(!0) : i() };
    return o.default.createElement(oi, {
        open: n,
        onClose: iasInchide,
        title: e === "edit" ? "Editeaz\u0103 \u0219edin\u021Ba" : "\u0218edin\u021B\u0103 nou\u0103",
        layer: Wt.form,
        footer: o.default.createElement("div", null, N && o.default.createElement("p", {
            className: "text-xs text-red-600 mb-2"
        }, N), o.default.createElement("div", {
            className: "flex gap-2.5"
        }, o.default.createElement("button", {
            onClick: i,
            className: "flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm"
        }, "Renun\u021B\u0103"), o.default.createElement("button", {
            onClick: he,
            disabled: !p,
            className: "flex-1 py-3 rounded-xl bg-slate-900 text-white font-medium text-sm disabled:opacity-40"
        }, e === "edit" ? "Salveaz\u0103 modific\u0103rile" : "Salveaz\u0103 \u0219edin\u021Ba")))
    }, J && e === "edit" && o.default.createElement("div", {
        className: "flex items-center justify-between gap-2 mb-3.5 px-1.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200"
    }, o.default.createElement("button", {
        onClick: () => fe(-1),
        disabled: re < 2,
        className: "p-2 rounded-lg text-amber-700 disabled:opacity-30"
    }, o.default.createElement(ei, {
        size: 18
    })), o.default.createElement("span", {
        className: "text-xs font-medium text-amber-700 text-center leading-tight"
    }, Y === "pending" ? "A\u0219teapt\u0103 confirmare" : "F\u0103r\u0103 status final", o.default.createElement("span", {
        className: "block font-mono-time mt-0.5"
    }, re ? Math.max(1, se + 1) : 0, " / ", re)), o.default.createElement("button", {
        onClick: () => fe(1),
        disabled: re < 2,
        className: "p-2 rounded-lg text-amber-700 disabled:opacity-30"
    }, o.default.createElement(un, {
        size: 18
    }))),
    /* Formularul stă în trei grupuri, în ordinea în care îl completezi: cine
       (starea și elevul), când (ziua și ora) și unde (locul și tipul orei).
       Fiecare câmp își are titlul chiar deasupra lui — „Elev" nu mai stă
       deasupra stării — iar grila orelor e mai deasă, ca ziua să încapă
       dintr-o privire. */
    o.default.createElement("div", {
        className: "rounded-2xl px-3.5 pt-3.5 pb-1 mb-3",
        "data-ias-grup-sedinta": "cine",
        style: { background: "var(--surface-2)", border: "1px solid var(--line)" }
    },
    iasCautaElev ? null : o.default.createElement(IasStare, { value: y, onChange: _, edit: e === "edit" }),
    o.default.createElement("span", {
        className: "block text-xs font-medium text-slate-500 mb-1.5"
    }, "Elev", o.default.createElement("span", {
        className: "text-amber-600"
    }, " *")),
    o.default.createElement(Uk, {
        onDeschis: iasCauta,
        /* Elevii care au deja o ședință în ziua aleasă nu mai apar în listă: la
           programare nu te interesează decât cine mai poate veni. Cel deja ales
           rămâne, ca să nu dispară de sub deget când editezi o ședință. */
        elevi: [...a.students].filter(L => L.id === p || (Pf(L) && !iasLipseste(L, m) && !Nw(a.sessions, L.id, m, de))).sort((L, T) => L.name.localeCompare(T.name, "ro")),
        ascunsi: a.students.filter(L => L.id !== p && Pf(L) && (iasLipseste(L, m) || Nw(a.sessions, L.id, m, de))).length,
        value: p,
        onChange: L => {
            c(L);
            let T = a.students.find(j => j.id === L);
            h(T ? gw(T, a.sessions) : "included"), e !== "edit" && (k(T?.defaultLocation || ""), O(iasLimbaDe(T)))
        }
    })),
    o.default.createElement("div", {
        className: "rounded-2xl px-3.5 pt-3.5 mb-3",
        "data-ias-grup-sedinta": "cand",
        style: { background: "var(--surface-2)", border: "1px solid var(--line)", paddingBottom: 14 }
    },
        /* Ziua și intervalul ales, pe același rând; grila e chiar dedesubt. */
        o.default.createElement("div", { className: "flex items-stretch gap-2.5" },
            o.default.createElement("div", { className: "flex-1 min-w-0" },
                o.default.createElement(xe, {
                    label: "Dat\u0103",
                    required: !0
                }, o.default.createElement("input", {
                    type: "date",
                    className: ie,
                    value: m,
                    onChange: L => g(L.target.value)
                }))),
            o.default.createElement("div", { className: "shrink-0 flex flex-col", style: { paddingBottom: 14 } },
                o.default.createElement("span", { className: "block text-xs font-medium text-slate-500 mb-1.5" }, "Ora"),
                o.default.createElement("div", {
                    "data-ias-interval-sedinta": "",
                    className: "font-mono-time text-sm px-3 rounded-xl flex items-center justify-center",
                    style: { flex: "1 1 auto", minHeight: 42, whiteSpace: "nowrap", color: "var(--accent-ink)", background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }
                }, Se(v), " \u2013 ", Se(v + ye)))),
        o.default.createElement("div", {
            style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(48px, 1fr))", gap: 5 }
        }, Ne.map(L => {
            let T = !E && L !== v && ze(L), ales = L === v;
            return o.default.createElement("button", {
                key: L, type: "button", disabled: T,
                onClick: () => w(L),
                "data-ias-ales": ales ? "" : void 0,
                className: "font-mono-time",
                style: {
                    padding: "9px 2px", borderRadius: 11, fontSize: 12.5, minHeight: 38,
                    background: ales ? "var(--invert)" : T ? "var(--surface-2)" : "var(--surface)",
                    color: ales ? "#fff" : T ? "var(--muted-2)" : "var(--text)",
                    border: `1px solid ${ales ? "var(--invert)" : "var(--line)"}`,
                    textDecoration: T ? "line-through" : "none",
                    opacity: T ? .55 : 1
                }
            }, Se(L))
        }))),
    o.default.createElement("div", {
        className: "rounded-2xl px-3.5 pt-3.5 pb-1 mb-3",
        "data-ias-grup-sedinta": "unde",
        style: { background: "var(--surface-2)", border: "1px solid var(--line)" }
    },
    o.default.createElement(IasLoc, {
        value: S, onChange: k,
        locations: iasLocuriDesFolosite(a.settings.locations, a.sessions),
        harta: S.trim() && o.default.createElement("a", {
        href: wu(xo(a.settings, S), S),
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
            touchAction: "manipulation"
        },
        /* Marginea negativă îl trăgea peste butonul de deasupra, care venea de
           pe vremea când era lipit de câmpul de locație. Acum stă la rândul lui. */
        className: "w-full mt-2 mb-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium flex items-center justify-center gap-1.5"
    }, o.default.createElement(dn, {
        size: 14
    }), "Deschide loca\u021Bia")
    }),
    o.default.createElement("div", { className: "mb-3.5" },
        o.default.createElement("span", {
            className: "block text-xs font-medium text-slate-500 mb-1.5"
        }, "Tip or\u0103"),
        o.default.createElement("div", { className: "flex gap-1.5" },
            a.settings.rateTypes.map(L => {
                let ales = x === L.id;
                return o.default.createElement("button", {
                    key: L.id, type: "button", onClick: () => h(L.id),
                    "data-ias-ales": ales ? "" : void 0,
                    className: "flex-1 py-2.5 rounded-xl text-xs font-medium",
                    style: {
                        background: ales ? "var(--invert)" : "var(--surface)",
                        color: ales ? "#fff" : "var(--muted)",
                        border: `1px solid ${ales ? "var(--invert)" : "var(--line)"}`
                    }
                }, L.name)
            })))),
    o.default.createElement(Jn, {
        title: "Detalii avansate",
        summary: `${A ? iasNumeLimba(a.settings, A).toLowerCase() : "rom\xE2n\u0103"}${E ? " \xB7 alt instructor" : ""}${b && b.trim() ? " \xB7 noti\u021Be" : ""}`
    }, o.default.createElement(xe, {
        label: "Limba \u0219edin\u021Bei"
    }, o.default.createElement("select", {
        className: ie,
        value: A || "",
        "data-ias-limba-sedinta": "",
        onChange: L => O(L.target.value)
    }, [["", "Rom\xE2n\u0103"]].concat(iasLimbi(a.settings).map(L => [L.id, L.nume]), A && !iasLimbi(a.settings).some(L => L.id === A) ? [[A, iasNumeLimba(a.settings, A)]] : []).map(([L, Q]) => o.default.createElement("option", {
        key: L || "ro",
        value: L
    }, Q)))), A && o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3.5"
    }, `La salariu se aplic\u0103 tariful pentru ${iasNumeLimba(a.settings, A).toLowerCase()} (${iasTarifLimba(a.settings, A, !1)} / ${iasTarifLimba(a.settings, A, !0)} ${a.settings.currency || "lei"}), iar mesajele c\u0103tre elev pentru ea (programare, mutare, anulare) se scriu ${IAS_LIMBI[A] ? "\xEEn " + iasNumeLimba(a.settings, A).toLowerCase() : "\xEEn englez\u0103"}.`), o.default.createElement(xe, {
        label: "Efectuat\u0103 de"
    }, o.default.createElement("select", {
        className: ie,
        value: E ? "other" : "me",
        onChange: L => B(L.target.value === "other")
    }, o.default.createElement("option", {
        value: "me"
    }, "Eu"), o.default.createElement("option", {
        value: "other"
    }, "Alt instructor \xB7 doar eviden\u021B\u0103"))), E && o.default.createElement(o.default.Fragment, null, o.default.createElement(xe, {
        label: "Numele instructorului"
    }, o.default.createElement("input", {
        className: ie,
        value: $,
        onChange: L => G(L.target.value),
        placeholder: "Op\u021Bional"
    })), o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3.5"
    }, "Nu se calculeaz\u0103 la salariu \u0219i nici la datoria elevului, dar consum\u0103 din orele elevului. Nu \xEE\u021Bi blocheaz\u0103 calendarul.")), o.default.createElement(xe, {
        label: "Noti\u021Be"
    }, o.default.createElement("textarea", {
        rows: 2,
        className: ie,
        value: b,
        onChange: L => M(L.target.value),
        placeholder: "Op\u021Bional"
    }))),
    e === "edit" && ge && ge.phone && y !== "cancelled" && o.default.createElement("button", {
        onClick: () => u({
            studentId: p,
            date: m,
            startMin: v,
            type: x,
            status: y,
            notes: b,
            location: S,
            otherInstructor: E,
            instructorName: $,
            limba: A,
            english: A === "en",
            duration: q && q.duration
        }),
        className: "w-full py-2.5 mt-1 mb-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-medium flex items-center justify-center gap-1.5"
    }, o.default.createElement(Na, {
        size: 14
    }), "Trimite confirmarea elevului"),
    e === "edit" && o.default.createElement("button", {
        onClick: () => X(!0),
        className: "w-full text-center text-xs text-red-500 py-2"
    }, "\u0218terge definitiv \u0219edin\u021Ba"),
    o.default.createElement(IasIntrebare, {
        open: iasIntreb,
        onSalveaza: () => { iasIntreaba(!1), he() },
        onRenunta: () => { iasIntreaba(!1), i() },
        onInapoi: () => iasIntreaba(!1)
    }),
    o.default.createElement(Ri, {
        open: W,
        title: "\u0218tergi \u0219edin\u021Ba?",
        message: "Pentru o anulare obi\u0219nuit\u0103, mai bine schimb\u0103 statusul \xEEn \u201EAnulat\u0103\u201D ca s\u0103 p\u0103strezi istoricul. \u0218tergerea definitiv\u0103 elimin\u0103 \u0219edin\u021Ba complet.",
        confirmLabel: "\u0218terge definitiv",
        danger: !0,
        onConfirm: () => {
            X(!1), l(q.id)
        },
        onCancel: () => X(!1)
    }),
    o.default.createElement(Ri, {
        open: !!R,
        title: "Dep\u0103\u0219e\u0219te limita s\u0103pt\u0103m\xE2nal\u0103",
        message: ge ? `${ge.name} ar avea mai mult de ${R?.limit} \u0219edin\u021Be \xEEn aceast\u0103 s\u0103pt\u0103m\xE2n\u0103. Continui oricum?` : "",
        confirmLabel: "Programeaz\u0103 oricum",
        onConfirm: () => {
            K(null), H()
        },
        onCancel: () => K(null)
    }))
}

function Gk({
    open: n,
    data: e,
    onClose: t
}) {
    let [a, r] = (0, o.useState)(() => new Set), [i, s] = (0, o.useState)(!1), l = (0, o.useMemo)(() => {
        let g = (v, w) => v.name.localeCompare(w.name, "ro");
        return {
            curs: e.students.filter(v => !v.withdrawn && v.examResult !== "promovat").sort(g),
            promovati: e.students.filter(v => !v.withdrawn && v.examResult === "promovat").sort(g),
            retrasi: e.students.filter(v => v.withdrawn).sort(g)
        }
    }, [e.students]);
    if ((0, o.useEffect)(() => {
            n && (s(!1), r(new Set(e.students.filter(g => !g.withdrawn && g.examResult !== "promovat").map(g => g.id))))
        }, [n]), !n) return null;
    let u = g => r(v => {
            let w = new Set(v);
            return w.has(g) ? w.delete(g) : w.add(g), w
        }),
        d = e.students.filter(g => a.has(g.id)).sort((g, v) => g.name.localeCompare(v.name, "ro")).map(g => {
            let v = bo(g),
                w = S0(e.sessions, g.id),
                x = Math.max(0, Af(e.sessions, g.id) - w);
            return {
                id: g.id,
                nume: g.name,
                cat: g.licenseCategory || "B",
                total: v,
                efectuate: w,
                programate: x,
                ramase: Math.max(0, v - w),
                neprogramate: Math.max(0, v - w - x)
            }
        }),
        f = d.reduce((g, v) => ({
            total: g.total + v.total,
            efectuate: g.efectuate + v.efectuate,
            programate: g.programate + v.programate,
            ramase: g.ramase + v.ramase
        }), {
            total: 0,
            efectuate: 0,
            programate: 0,
            ramase: 0
        }),
        p = "px-2 py-2 text-right font-mono-time",
        c = "px-2 py-2 text-xs font-medium text-slate-500 border-b border-slate-200",
        m = (g, v) => v.length === 0 ? null : o.default.createElement("div", {
            className: "mb-3"
        }, o.default.createElement("div", {
            className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5"
        }, g, " \xB7 ", v.length), o.default.createElement("div", {
            className: "space-y-1"
        }, v.map(w => {
            let x = a.has(w.id);
            return o.default.createElement("button", {
                key: w.id,
                onClick: () => u(w.id),
                className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left",
                style: x ? {
                    borderColor: "var(--accent-line)",
                    background: "var(--accent-soft)"
                } : {
                    borderColor: "var(--line)",
                    background: "var(--surface)"
                }
            }, o.default.createElement("span", {
                className: "flex items-center justify-center rounded-md shrink-0",
                style: {
                    width: 18,
                    height: 18,
                    border: `1.5px solid ${x?"var(--accent)":"var(--line-2)"}`,
                    background: x ? "var(--accent)" : "transparent",
                    color: "#3a2100",
                    fontSize: 12,
                    fontWeight: 900,
                    lineHeight: 1
                }
            }, x ? "\u2713" : ""), o.default.createElement("span", {
                className: "text-sm text-slate-800 truncate"
            }, w.name, o.default.createElement(Lf, {
                student: w,
                size: 12,
                sesiuni: n.sessions,
                setari: n.settings
            })))
        })));
    return o.default.createElement("div", {
        className: "fixed inset-0 raport-overlay ecran-peste",
        style: {
            zIndex: Wt.form,
            background: "var(--bg)"
        }
    }, o.default.createElement("div", {
        className: "h-full overflow-y-auto raport-print",
        style: {
            paddingTop: "env(safe-area-inset-top)"
        }
    }, o.default.createElement("div", {
        className: "px-4 py-4"
    }, o.default.createElement("div", {
        className: "flex items-center justify-between gap-2 mb-1 fara-print"
    }, o.default.createElement("h2", {
        className: "font-display text-lg font-semibold text-slate-900 uppercase tracking-wide"
    }, "Raport elevi"), o.default.createElement("button", {
        onClick: t,
        "aria-label": "\xCEnchide",
        className: "btn-inchide p-2 rounded-full text-slate-500"
    }, o.default.createElement(ir, {
        size: 20
    }))), o.default.createElement("div", {
        className: "doar-print",
        style: {
            display: "none"
        }
    }, o.default.createElement("div", {
        style: {
            fontSize: "16pt",
            fontWeight: 700
        }
    }, fn.mark, " \xB7 Raport elevi"), o.default.createElement("div", {
        style: {
            fontSize: "10pt",
            marginBottom: "10pt"
        }
    }, "Generat la ", qe(Be()), " \xB7 ", d.length, " ", d.length === 1 ? "elev" : "elevi")), o.default.createElement("p", {
        className: "text-xs text-slate-400 mb-3 fara-print"
    }, '\u201ER\u0103mase" = total minus efectuate. \u201EProgramate" sunt deja \xEEn calendar, dar \xEEnc\u0103 neefectuate.'), o.default.createElement("button", {
        onClick: () => s(!i),
        className: "w-full py-2.5 mb-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-1.5 fara-print"
    }, o.default.createElement(rr, {
        size: 15
    }), i ? "Ascunde lista" : `Alege elevii \xB7 ${a.size} ${a.size===1?"ales":"ale\u0219i"}`), i && o.default.createElement("div", {
        className: "mb-4 fara-print"
    }, o.default.createElement("div", {
        className: "flex gap-2 mb-2.5"
    }, o.default.createElement("button", {
        onClick: () => r(new Set(l.curs.map(g => g.id))),
        className: "flex-1 py-2 rounded-lg border border-slate-200 text-xs text-slate-600"
    }, "To\u021Bi \xEEn curs"), o.default.createElement("button", {
        onClick: () => r(new Set(e.students.map(g => g.id))),
        className: "flex-1 py-2 rounded-lg border border-slate-200 text-xs text-slate-600"
    }, "Chiar to\u021Bi"), o.default.createElement("button", {
        onClick: () => r(new Set),
        className: "flex-1 py-2 rounded-lg border border-slate-200 text-xs text-slate-600"
    }, "Niciunul")), m("\xCEn curs", l.curs), m("Promova\u021Bi", l.promovati), m("Retra\u0219i", l.retrasi)), d.length === 0 ? o.default.createElement("div", {
        className: "text-center py-10 text-sm text-slate-400"
    }, "Niciun elev ales. Deschide lista de mai sus \u0219i bifeaz\u0103 pe cine vrei \xEEn raport.") : o.default.createElement("div", {
        className: "overflow-x-auto"
    }, o.default.createElement("table", {
        className: "w-full text-sm raport-tabel"
    }, o.default.createElement("thead", null, o.default.createElement("tr", null, o.default.createElement("th", {
        className: `${c} text-left`
    }, "Elev"), o.default.createElement("th", {
        className: c
    }, "Total"), o.default.createElement("th", {
        className: c
    }, "Efect."), o.default.createElement("th", {
        className: c
    }, "Progr."), o.default.createElement("th", {
        className: c
    }, "R\u0103mase"))), o.default.createElement("tbody", null, d.map(g => o.default.createElement("tr", {
        key: g.id,
        className: "border-b border-slate-100"
    }, o.default.createElement("td", {
        className: "px-2 py-2 text-slate-800"
    }, g.nume, o.default.createElement("span", {
        className: "text-slate-400"
    }, " \xB7 ", g.cat), g.neprogramate > 0 && o.default.createElement("span", {
        className: "block text-xs text-slate-400"
    }, g.neprogramate, " \xEEnc\u0103 neprogramate")), o.default.createElement("td", {
        className: `${p} text-slate-600`
    }, g.total), o.default.createElement("td", {
        className: `${p} text-slate-900 font-semibold`
    }, g.efectuate), o.default.createElement("td", {
        className: `${p} text-slate-600`
    }, g.programate), o.default.createElement("td", {
        className: `${p}`,
        style: {
            color: "var(--accent-ink)",
            fontWeight: 600
        }
    }, g.ramase)))), o.default.createElement("tfoot", null, o.default.createElement("tr", null, o.default.createElement("td", {
        className: "px-2 py-2 text-xs font-medium text-slate-500 border-t border-slate-300"
    }, "Total \xB7 ", d.length, " ", d.length === 1 ? "elev" : "elevi"), o.default.createElement("td", {
        className: `${p} border-t border-slate-300 text-slate-700`
    }, f.total), o.default.createElement("td", {
        className: `${p} border-t border-slate-300 text-slate-900 font-semibold`
    }, f.efectuate), o.default.createElement("td", {
        className: `${p} border-t border-slate-300 text-slate-700`
    }, f.programate), o.default.createElement("td", {
        className: `${p} border-t border-slate-300`,
        style: {
            color: "var(--accent-ink)",
            fontWeight: 600
        }
    }, f.ramase))))), o.default.createElement("div", {
        className: "mt-5 space-y-2 fara-print"
    }, o.default.createElement("button", {
        onClick: () => {
            try {
                window.print()
            } catch {}
        },
        disabled: d.length === 0,
        className: "w-full py-3 rounded-xl bg-slate-900 text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-40"
    }, o.default.createElement(fa, {
        size: 15
    }), "Salveaz\u0103 ca PDF"), o.default.createElement("p", {
        className: "text-xs text-slate-400"
    }, 'Se deschide fereastra de tip\u0103rire a telefonului \u2014 acolo alegi \u201ESalveaz\u0103 ca PDF" \xEEn loc de imprimant\u0103. Pe h\xE2rtie pleac\u0103 doar tabelul, cu elevii ale\u0219i acum.'), o.default.createElement("button", {
        onClick: t,
        className: "w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm"
    }, "\xCEnchide")))))
}

function Vk({
    data: n,
    onOpenStudent: e,
    onAddStudent: t,
    onOpenReport: a
}) {
    let [r, i] = (0, o.useState)(""), [s, l] = (0, o.useState)("name"), [u, d] = (0, o.useState)(1),
        [iasSortDeschis, iasSort] = (0, o.useState)(!1),
        iasPanou = (0, o.useRef)(null), iasBara = (0, o.useRef)(null), iasLista = (0, o.useRef)(null), iasCautatInainte = (0, o.useRef)(r),
        f = pu(r).trim(), /* Căutarea prinde și numărul de înregistrare — cum e scris pe dosar, cu sau
       fără spații și cratime, ca „CT 05 SEV" să iasă și dacă scrii „ct05sev". */
    p = E => {
        if (!f) return !0;
        let iasCurat = (x) => String(x || "").toUpperCase().replace(/[^A-Z0-9]/g, ""),
            iasCautat = iasCurat(r);
        return pu(`${E.name||""} ${E.firstName||""} ${E.lastName||""}`).includes(f)
            || pu(E.group).includes(f)
            || (E.phone || "").replace(/\s+/g, "").includes(r.replace(/\s+/g, ""))
            || (!!iasCautat && iasCurat(E.regNumber).includes(iasCautat))
    }, c = (E, B) => E.name.localeCompare(B.name, "ro"), m = E => (B, $) => {
        let G = E(B) || "",
            A = E($) || "";
        return !G && !A ? c(B, $) : G ? A ? u * G.localeCompare(A, "ro") || c(B, $) : -1 : 1
    }, g = E => (B, $) => u * (E($) - E(B)) || c(B, $), v = E => {
        let B = String(E.group || "").trim();
        if (!B) return {
            rang: 2,
            n: 0
        };
        let $ = B.replace(/[^0-9]/g, "");
        return {
            rang: /os/i.test(B) ? 1 : 0,
            n: $ ? Number($) : Number.MAX_SAFE_INTEGER
        }
    }, w = (E, B) => {
        let $ = v(E),
            G = v(B);
        return $.rang !== G.rang ? $.rang - G.rang : u * ($.n - G.n) || c(E, B)
    }, x = {
        name: (E, B) => u * c(E, B),
        exam: m(E => E.examDate),
        theory: m(E => E.theoryExamDate),
        /* Sortarea trebuie să se uite la aceeași cifră pe care o scrie cardul:
           ședințe totale minus cele efectuate. Se lua după cele rămase
           neprogramate — care scad și ședințele doar puse în calendar — așa că
           lista părea amestecată, deși fiecare card arăta altceva. */
        remaining: g(E => Math.max(0, iasImpartire(E, n.sessions, n.settings).total - S0(n.sessions, E.id))),
        efectuate: g(E => S0(n.sessions, E.id)),
        debt: g(E => Hw(E, n.sessions, n.settings)),
        grupa: w,
        recent: (E, B) => u * (B.enrollDate || "").localeCompare(E.enrollDate || "") || c(E, B),
        area: m(E => E.area),
        place: m(E => E.defaultLocation)
    }, h = x[s] || x.name, y = E => E.examResult === "promovat", _ = n.students.filter(E => p(E) && !E.withdrawn && !y(E) && !ho(E)).sort(h), b = n.students.filter(E => p(E) && !E.withdrawn && ho(E)).sort((E, B) => (E.asteptareDin || "").localeCompare(B.asteptareDin || "") || c(E, B)), M = n.students.filter(E => p(E) && !E.withdrawn && y(E)).sort((E, B) => (B.examDate || "").localeCompare(E.examDate || "") || c(E, B)), S = n.students.filter(E => p(E) && E.withdrawn).sort(c), k = (E, B) => {
        let $ = iasImpartire(E, n.sessions, n.settings).total,
            G = S0(n.sessions, E.id),
            A = Math.max(0, $ - G),
            O = Bw(E, n.sessions);
        return o.default.createElement("div", {
            key: E.id,
            onClick: N => {
                N.target && N.target.closest && N.target.closest("a,button") || e(E.id)
            },
            role: "button",
            tabIndex: 0,
            onKeyDown: N => {
                N.key === "Enter" && e(E.id)
            },
            className: "relative overflow-hidden w-full bg-white rounded-xl border border-slate-200 px-4 py-3 text-left active:bg-slate-50 cursor-pointer",
            style: B ? {
                opacity: .6
            } : E.examResult === "promovat" ? {
                backgroundImage: "linear-gradient(180deg, var(--ok-soft), transparent 70%)",
                borderColor: "var(--ok-line)"
            } : void 0
        }, !B && E.examResult === "promovat" && o.default.createElement(T0, null), o.default.createElement("div", {
            className: "relative"
        }, o.default.createElement("div", {
            className: "flex items-center justify-between"
        }, o.default.createElement("div", {
            className: "min-w-0"
        }, o.default.createElement("div", {
            className: "flex items-center gap-1.5 flex-wrap"
        }, o.default.createElement("span", {
            className: "font-medium text-slate-900 text-sm truncate"
        }, E.name), o.default.createElement(Lf, {
            student: E,
                sesiuni: n.sessions,
                setari: n.settings
            }),
        /* Semn pentru cei veniți la perfecționare: altfel nu-i deosebești de
           cursanți într-o listă de șaizeci de oameni. */
        E.perfectionare ? o.default.createElement("span", {
            className: "shrink-0 text-xs px-1.5 py-0.5 rounded-full font-medium",
            style: {
                background: "var(--accent-soft)", color: "var(--accent-ink)",
                border: "1px solid var(--accent-line)"
            }
        }, "perfec\u021Bionare") : null,
        o.default.createElement(Bf, {
            student: E,
            county: E.county,
            h: 20
        }), o.default.createElement("span", {
            className: "shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200"
        }, E.licenseCategory || "B"), B && o.default.createElement("span", {
            className: "shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200"
        }, "retras"), !B && O === "nou" && o.default.createElement("span", {
            className: "shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"
        }, "nou"), (() => {
            // cine lipsește o perioadă poartă semnul lui, cu ziua întoarcerii
            let iasP = iasZilePlecat(E);
            return iasP ? o.default.createElement("span", {
                className: "shrink-0 text-xs px-1.5 py-0.5 rounded-full",
                style: { background: "var(--accent-soft)", color: "var(--accent-ink)", border: "1px solid var(--accent-line)" }
            }, "revine ", qe(iasP.revine)) : null
        })(), E.examResult === "promovat" && o.default.createElement("span", {
            className: "shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
        }, "promovat"), !B && E.examResult === "respins" && o.default.createElement("span", {
            className: "shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200"
        }, "respins"), ho(E) && (() => {
            let N = Dw(E);
            return o.default.createElement("span", {
                className: "shrink-0 text-xs px-1.5 py-0.5 rounded-full",
                style: {
                    background: "var(--accent-soft)",
                    color: "var(--accent-ink)",
                    border: "1px solid var(--accent-line)"
                }
            }, N.ramase === 0 ? "gata de adeverin\u021B\u0103" : `a\u0219teptare \xB7 ${N.ramase} zile`)
        })()), o.default.createElement("div", {
            className: "mt-1"
        }, E.phone ? o.default.createElement(tS, {
            phone: E.phone,
            compact: !0
        }) : o.default.createElement("span", {
            className: "text-xs text-slate-400"
        }, "\u2014")), (E.area || E.defaultLocation) && o.default.createElement("div", {
            className: "flex items-center gap-1 text-xs text-slate-400 mt-0.5"
        }, o.default.createElement(dn, {
            size: 11,
            className: "shrink-0"
        }), o.default.createElement("span", {
            className: "truncate"
        }, [E.area, E.defaultLocation].filter(Boolean).join(" \xB7 ")))), o.default.createElement("div", {
            className: "text-right shrink-0 pl-2"
        }, o.default.createElement("div", {
            className: "font-mono-time text-sm font-semibold text-slate-900"
        }, A), o.default.createElement("div", {
            className: "text-xs text-slate-400"
        }, "r\u0103mase"))), o.default.createElement("div", {
            className: "mt-2 flex items-center gap-2"
        }, o.default.createElement(Cf, {
            value: $ > 0 ? G / $ * 100 : 0,
            heightCls: "h-1"
        }), o.default.createElement("span", {
            className: "text-xs text-slate-400 shrink-0 font-mono-time"
        }, G, "/", $))))
    };
    /* Cât scrii în căutare, lista nu mai sare. Dacă erai mai jos în listă,
       rezultatele încep chiar sub bară, care rămâne pe loc; lista își ține
       înălțimea cât cauți, ca ecranul să nu fie tras în sus când rămân puțini
       elevi; iar rezultatele noi se aprind ușor, fără mișcare. */
    (0, o.useLayoutEffect)(() => {
        if (iasCautatInainte.current === r) return;
        iasCautatInainte.current = r;
        let P = iasPanou.current, B = iasBara.current, L = iasLista.current;
        if (!P || !B || !L) return;
        try {
            L.style.minHeight = f ? Math.max(0, P.clientHeight - B.offsetHeight) + "px" : "";
            let iasSub = Math.round(L.getBoundingClientRect().top - P.getBoundingClientRect().top + P.scrollTop - B.offsetHeight);
            if (P.scrollTop > iasSub) P.scrollTop = Math.max(0, iasSub);
            let iasLinistit = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
            if (!iasLinistit && L.animate) L.animate([{ opacity: .55 }, { opacity: 1 }], { duration: 170, easing: "ease-out" })
        } catch (x) { /* fără măsurători: lista se schimbă pe loc */ }
    }, [r]);
    let iasCrit = [
        ["name", "Nume"],
        ["grupa", "Grupă"],
        ["exam", "Ex. practic"],
        ["theory", "Ex. teoretic"],
        ["area", "Zonă"],
        ["place", "Punct start"],
        ["remaining", "Ore rămase"],
        ["efectuate", "Ore efectuate"],
        ["debt", "Datorie"],
        ["recent", "Recent"]
    ], iasAles = (iasCrit.filter(x => x[0] === s)[0] || iasCrit[0])[1];
    return o.default.createElement("div", {
        className: "pb-4",
        ref: iasPanou,
        /* Browserul nu mai mută singur lista ca să țină pe loc un card care a
           dispărut din rezultate: poziția o hotărăște căutarea, mai sus. */
        style: { overflowAnchor: "none" }
    }, o.default.createElement("div", {
        className: "px-4 pt-4 pb-3 flex items-center justify-between gap-2"
    }, o.default.createElement("h1", {
        className: "font-display text-xl font-semibold text-slate-900 uppercase tracking-wide"
    }, "Elevi"), o.default.createElement("button", {
        onClick: a,
        className: "shrink-0 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-medium flex items-center gap-1.5"
    }, o.default.createElement(fa, {
        size: 14
    }), "Raport")), o.default.createElement("div", {
        /* Bara de căutare rămâne lipită de marginea de sus când derulezi lista:
           cu cincizeci de elevi, altfel trebuie să urci tot drumul înapoi ca
           să cauți pe cineva. Fundalul e plin, ca numele să nu treacă pe sub ea.
           Lipirea e scrisă aici, pe element: clasa „sticky" singură nu ajungea
           la browser, iar bara pleca odată cu lista. Sus e 0, fiindcă panoul
           începe deja sub decupajul telefonului. */
        className: "sticky z-20 px-4 pt-2 pb-3 -mt-2",
        ref: iasBara,
        "data-ias-bara-elevi": "",
        style: {
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: "var(--bg)",
            boxShadow: "0 6px 12px -10px rgba(0,0,0,.45)"
        }
    }, o.default.createElement("div", {
        className: "relative"
    }, o.default.createElement(Oi, {
        size: 16,
        className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
    }), o.default.createElement("input", {
        value: r,
        onChange: E => i(E.target.value),
        placeholder: "Caut\u0103 nume, telefon, grup\u0103 sau nr.",
        className: `${ie} pl-10 ${r?"pr-10":""}`
    }), r && o.default.createElement("button", {
        onClick: () => i(""),
        "aria-label": "\u0218terge c\u0103utarea",
        className: "absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-slate-400"
    }, o.default.createElement(ir, {
        size: 16
    }))), (() => {
        /* Criteriile de sortare stăteau ca nouă butoane înșirate, cu derulare pe
           orizontală: trebuia să le împingi ca să vezi ce ai. Acum sunt sub un
           singur buton „Sortare", cu criteriul ales scris lângă el. Atingi
           criteriul din listă ca să-l alegi, sau butonul ca să întorci ordinea.
           Fereastra cu criteriile stă în afara barei lipite, mai jos: înăuntru
           ar fi rămas prinsă sub bara de jos. */
        return o.default.createElement("div", { className: "flex items-center gap-1.5 mt-2" },
            o.default.createElement("button", {
                onClick: () => iasSort(!iasSortDeschis),
                className: "px-3 py-1.5 rounded-full text-xs font-medium border shrink-0 flex items-center gap-1.5 bg-white text-slate-500 border-slate-200"
            }, o.default.createElement(ka, { size: 13 }), "Sortare"),
            o.default.createElement("button", {
                onClick: () => d(G => -G),
                "aria-label": `${iasAles}, atinge ca s\u0103 \xEEntorci ordinea`,
                className: "px-3 py-1.5 rounded-full text-xs font-medium border shrink-0 flex items-center gap-1 bg-slate-900 text-white border-slate-900"
            }, iasAles, o.default.createElement(un, {
                size: 12,
                style: { transform: u === 1 ? "rotate(90deg)" : "rotate(-90deg)" }
            })))
    })()), o.default.createElement(oi, {
                open: iasSortDeschis, onClose: () => iasSort(!1),
                title: "Sorteaz\u0103 dup\u0103", layer: Wt.dialog
            }, iasSortDeschis ? o.default.createElement("div", { className: "space-y-1.5" },
                iasCrit.map(([E, B]) => {
                    let ales = s === E;
                    return o.default.createElement("button", {
                        key: E,
                        onClick: () => { ales ? d(G => -G) : (l(E), d(1)), iasSort(!1) },
                        className: "w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left",
                        style: {
                            minHeight: 48,
                            background: ales ? "var(--accent-soft)" : "var(--surface)",
                            border: `${ales ? 2 : 1}px solid ${ales ? "var(--accent)" : "var(--line)"}`
                        }
                    },
                        o.default.createElement("span", {
                            className: "flex-1 text-sm",
                            style: { color: ales ? "var(--accent-ink)" : "var(--text)", fontWeight: ales ? 600 : 400 }
                        }, B),
                        ales ? o.default.createElement("span", {
                            className: "shrink-0", style: { color: "var(--accent)" }
                        }, "\u2713") : null)
                })) : null), o.default.createElement("div", {
        className: "px-4",
        ref: iasLista,
        "data-ias-lista-elevi": ""
    }, _.length === 0 && M.length === 0 && S.length === 0 && b.length === 0 && o.default.createElement("div", {
        className: "text-center py-10 text-sm text-slate-400"
    }, n.students.length === 0 ? "Niciun elev \xEEnc\u0103. Adaug\u0103 primul elev." : "Niciun rezultat."), (_.length > 0 || M.length > 0 || S.length > 0 || b.length > 0) && o.default.createElement(Jn, {
        title: `\xCEn curs \xB7 ${_.length}`,
        defaultOpen: !0
    }, _.length === 0 ? o.default.createElement("div", {
        className: "text-center py-6 text-sm text-slate-400"
    }, "Niciun elev \xEEn curs.") : o.default.createElement("div", {
        className: "space-y-2"
    }, _.map(E => k(E, !1)))), b.length > 0 && o.default.createElement(Jn, {
        title: `\xCEn a\u0219teptare \xB7 ${b.length}`,
        defaultOpen: !0
    }, o.default.createElement("div", {
        className: "space-y-2"
    }, b.map(E => k(E, !1)))), M.length > 0 && o.default.createElement(Jn, {
        title: `Promova\u021Bi \xB7 ${M.length}`,
        forteaza: !!f && M.length > 0,
        faraUrcare: !0
    }, o.default.createElement("div", {
        className: "space-y-2"
    }, M.map(E => k(E, !1)))), S.length > 0 && o.default.createElement(Jn, {
        title: `Retra\u0219i \xB7 ${S.length}`,
        forteaza: !!f && S.length > 0,
        faraUrcare: !0
    }, o.default.createElement("div", {
        className: "space-y-2"
    }, S.map(E => k(E, !0))))), o.default.createElement("button", {
        onClick: t,
        className: "fixed bottom-20 right-4 w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
    }, o.default.createElement(cn, {
        size: 26
    })))
}

/* Înainte → după, rând cu rând, pentru programul spus de elev. Rândurile care
   nu se schimbă rămân estompate, ca ochiul să prindă doar ce e nou. */
function IasDiferenteProgram({ vechi: iasV, nou: iasN }) {
    let E = o.default.createElement,
        iasRanduri = po.map(z => ({ cheie: "z" + z, nume: Tw[z], a: iasDispZiText(iasV, z), b: iasDispZiText(iasN, z) }));
    /* Zilele anume, de azi încolo. */
    Array.from(new Set(Object.keys(iasV.dispDate || {}).concat(Object.keys(iasN.dispDate || {}))))
        .filter(k => k >= Be()).sort().forEach(k => iasRanduri.push({
            cheie: "d" + k, nume: iasZiScurt(k),
            a: iasFelText(iasZiuaAnume(iasV, k)) || "\u2014", b: iasFelText(iasZiuaAnume(iasN, k)) || "\u2014"
        }));
    iasRanduri.push({ cheie: "tura", nume: "Ture", a: iasDispTuraText(iasV), b: iasDispTuraText(iasN) });
    iasRanduri.push({ cheie: "par", nume: "Zilele lunii", a: iasDispParText(iasV), b: iasDispParText(iasN) });
    let iasPa = iasDispPlecatText(iasV), iasPb = iasDispPlecatText(iasN);
    if (iasPa || iasPb) iasRanduri.push({ cheie: "plecat", nume: "Lipse\u0219te", a: iasPa || "\u2014", b: iasPb || "\u2014" });
    let iasCate = iasRanduri.filter(r => r.a !== r.b).length;
    return E("div", {
        className: "rounded-xl px-3 py-2.5 mb-3",
        style: { background: "var(--surface-2)", border: "1px solid var(--line)" }
    },
        E("div", { className: "text-xs font-medium mb-1", style: { color: "var(--muted)" } },
            iasCate ? (iasCate === 1 ? "Se schimb\u0103 un r\xE2nd" : `Se schimb\u0103 ${iasCate} r\xE2nduri`) : "Nimic nou fa\u021B\u0103 de fi\u0219\u0103"),
        iasRanduri.map(r => E("div", {
            key: r.cheie,
            className: "flex gap-2 py-1.5 text-xs",
            style: { borderTop: "1px solid var(--line)" }
        },
            E("span", {
                className: "shrink-0 font-medium",
                style: { width: 74, color: r.a !== r.b ? "var(--text)" : "var(--muted-2)" }
            }, r.nume),
            r.a === r.b
                ? E("span", { className: "flex-1 min-w-0", style: { color: "var(--muted-2)" } }, r.b)
                : E("span", { className: "flex-1 min-w-0" },
                    E("span", { style: { color: "var(--muted-2)", textDecoration: "line-through" } }, r.a),
                    E("span", { style: { color: "var(--muted-2)" } }, " \u2192 "),
                    E("span", { className: "font-semibold", style: { color: "var(--accent-ink)" } }, r.b)))))
}

/* Ce a trimis elevul, cum stă pe fișă. */
function IasProgramRanduri({ program: iasP }) {
    let E = o.default.createElement;
    return E("div", { className: "rounded-xl px-3 py-1.5 mb-2.5", style: { background: "var(--surface)", border: "1px solid var(--line)" } },
        iasProgramElevRanduri(iasP).map((r, i) => E("div", {
            key: r.cheie,
            className: "flex gap-2 py-1 text-xs",
            style: i ? { borderTop: "1px solid var(--line)" } : null
        },
            E("span", { className: "shrink-0 font-medium", style: { width: 74, color: "var(--muted)" } }, r.nume),
            E("span", { className: "flex-1 min-w-0", style: { color: "var(--text)" } }, r.text))))
}

/* Căsuța „Programul trimis de elev", în fișă, la Disponibilitate. Răspunsul
   elevului stă aici deoparte: nu schimbă nimic până nu apeși „Folosește-l în
   plan", iar atunci schimbă doar ce a spus el. „Revino la ce era" anulează.
   Totul rămâne după ce apeși Salvează modificările, ca orice altă schimbare. */
function IasProgramElev({ elev: iasEl, poateCere: iasPoate, onCere: iasCere, onSchimba: iasSchimba }) {
    let E = o.default.createElement,
        [iasLipesc, iasPuneLipesc] = (0, o.useState)(!1),
        [iasText, iasPuneText] = (0, o.useState)(""),
        [iasIntreb, iasPuneIntreb] = (0, o.useState)(!1),
        iasP = iasEl.programElev,
        iasR = iasText.trim() ? iasDispCiteste(iasText) : null,
        iasAltul = !!(iasR && iasR.elev && iasEl.id && iasR.elev !== iasEl.id),
        iasBtn = (txt, fn, plin) => E("button", {
            type: "button",
            onClick: fn,
            className: "py-2.5 rounded-xl text-sm font-medium",
            style: plin
                ? { background: "var(--invert)", color: "var(--on-invert)" }
                : { background: "var(--surface)", color: "var(--text)", border: "1px solid var(--line-2)" }
        }, txt);
    return E("div", {
        className: "rounded-xl px-3.5 py-3 mb-3.5",
        style: { background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }
    },
        E("div", { className: "flex items-baseline justify-between gap-2" },
            E("div", { className: "text-sm font-medium text-slate-800" }, "Programul trimis de elev"),
            iasP ? E("span", {
                className: "text-xs font-medium shrink-0",
                style: { color: iasP.folosit ? "var(--ok)" : "var(--accent-ink)" }
            }, iasP.folosit ? "folosit \xEEn plan" : "nefolosit \xEEnc\u0103") : null),
        iasP ? E(o.default.Fragment, null,
            E("p", { className: "text-xs text-slate-500 mt-0.5 mb-2" },
                `Primit pe ${iasZiLuna(iasP.primit)}.`,
                iasP.folosit ? ` Folosit \xEEn plan pe ${iasZiLuna(iasP.folosit)}.` : " C\xE2t timp nu-l folose\u0219ti, disponibilitatea de mai jos r\u0103m\xE2ne cum ai scris-o tu."),
            E(IasProgramRanduri, { program: iasP }),
            iasP.mesaj ? E("p", { className: "text-xs text-slate-600 mb-2.5" }, "Elevul a mai scris: \u201E", iasP.mesaj, "\u201D") : null,
            iasIntreb ? E("div", null,
                E("p", { className: "text-xs text-slate-600 mb-1.5" }, "Dac\u0103 \xEEl folose\u0219ti, pe fi\u0219\u0103 se schimb\u0103 doar ce a spus elevul:"),
                E(IasDiferenteProgram, { vechi: iasEl, nou: iasFolosesteProgram(iasEl) }),
                E("div", { className: "grid grid-cols-2 gap-2" },
                    iasBtn("Renun\u021B\u0103", () => iasPuneIntreb(!1)),
                    iasBtn("Da, folose\u0219te-l", () => { iasSchimba(iasFolosesteProgram), iasPuneIntreb(!1) }, !0))) :
            E("div", { className: "grid grid-cols-2 gap-2" },
                iasP.folosit ? null : iasBtn("Folose\u0219te-l \xEEn plan", () => iasPuneIntreb(!0), !0),
                iasEl.programElevInainte ? iasBtn("Revino la ce era", () => iasSchimba(iasRevinoLaProgram)) : null)) :
        E("p", { className: "text-xs text-slate-500 mt-0.5" },
            "Elevul prime\u0219te un link, alege pentru fiecare zi cum poate \u0219i \xEE\u021Bi trimite r\u0103spunsul pe WhatsApp. R\u0103spunsul st\u0103 aici deoparte \u0219i nu schimb\u0103 nimic p\xE2n\u0103 nu hot\u0103r\u0103\u0219ti tu."),
        E("div", { className: "grid grid-cols-2 gap-2 mt-3", style: { borderTop: iasP ? "1px solid var(--accent-line)" : "0", paddingTop: iasP ? 12 : 0 } },
            E("button", {
                type: "button",
                disabled: !iasPoate,
                onClick: () => iasPoate && iasCere(),
                className: "py-2.5 rounded-xl text-sm font-medium",
                style: { background: "var(--surface)", color: "var(--text)", border: "1px solid var(--line-2)", opacity: iasPoate ? 1 : .45 }
            }, iasP ? "Cere unul nou" : "Cere-i programul"),
            iasBtn(iasLipesc ? "\xCEnchide" : "Lipe\u0219te r\u0103spunsul", () => { iasPuneLipesc(!iasLipesc), iasPuneText("") })),
        iasPoate ? null : E("p", { className: "text-xs text-slate-500 mt-2" },
            "Adaug\u0103 \xEEnt\xE2i elevul. Din fi\u0219a lui salvat\u0103 \xEEi po\u021Bi cere apoi programul."),
        iasLipesc ? E("div", { className: "mt-3" },
            E("textarea", {
                rows: 4,
                className: ie + " text-xs",
                value: iasText,
                onChange: S => iasPuneText(S.target.value),
                placeholder: "Lipe\u0219te aici tot mesajul primit de la elev"
            }),
            iasText.trim() && !iasR ? E("p", { className: "text-xs mt-1.5", style: { color: "var(--bad)" } },
                "Nu g\u0103sesc \xEEn text r\u0103spunsul de pe pagina de program. Lipe\u0219te mesajul \xEEntreg, cu tot cu linkul de la final.") : null,
            iasR ? E("div", { className: "mt-2.5" },
                iasAltul ? E("p", { className: "text-xs mb-2", style: { color: "var(--bad)" } },
                    "Aten\u021Bie: r\u0103spunsul a fost cerut din fi\u0219a altui elev.") : null,
                E(IasProgramRanduri, { program: iasProgramElevNou(iasR) }),
                E("button", {
                    type: "button",
                    onClick: () => { iasSchimba(iasF => ({ ...iasF, programElev: iasProgramElevNou(iasR) })), iasPuneLipesc(!1), iasPuneText("") },
                    className: "w-full py-2.5 rounded-xl text-sm font-medium",
                    style: { background: "var(--accent)", color: "#3a2100" }
                }, "P\u0103streaz\u0103-l pe fi\u0219\u0103"),
                E("p", { className: "text-xs text-slate-500 mt-1.5" }, "Se pune deoparte, \xEEn c\u0103su\u021Ba asta. Disponibilitatea nu se schimb\u0103.")) : null) : null)
}

/* Cererea către elev: numărul tău (pe el vine răspunsul), mesajul, linkul. */
function IasCereProgram({ elev: iasEl, setari: iasS, onClose: iasInchide, onNumar: iasNumar }) {
    let E = o.default.createElement,
        [iasNr, iasPuneNr] = (0, o.useState)(""),
        [iasTxt, iasPuneTxt] = (0, o.useState)(""),
        [iasCopiat, iasPuneCopiat] = (0, o.useState)(!1);
    (0, o.useEffect)(() => {
        if (!iasEl) return;
        let { salut: iasSalut, cand: iasCand } = _0(iasEl), iasPren = Ff(iasEl), iasL = iasLimbaDe(iasEl);
        iasPuneNr((iasS && iasS.telefonulTau) || "");
        /* Elevul pe altă limbă primește cererea în limba lui, ca și pagina. */
        iasL ? iasPuneTxt(`${iasPren ? iasSalutStrain(iasTexte(iasL), iasPren) : iasTexte(iasL).salut + "!"} ${iasTexte(iasL).cerere}`)
            : iasPuneTxt(`${iasSalut}${iasPren ? ", " + iasPren : ""}! Ca s\u0103-\u021Bi fac programul pentru \u0219edin\u021Bele de condus, spune-mi ${iasCand}: deschide linkul de mai jos, alege pentru fiecare zi \u0219i apas\u0103 \u201ETrimite \xEEndrum\u0103torului\u201D. Dureaz\u0103 un minut.`);
        iasPuneCopiat(!1)
    }, [iasEl]);
    if (!iasEl) return null;
    let iasBun = qw(iasNr).length >= 10,
        iasLink = iasLinkCerereProgram(iasEl, { ...iasS, telefonulTau: iasNr }),
        iasTot = `${iasTxt.trim()}\n\n${iasLink}`,
        iasTel = (iasEl.phone || "").trim(),
        iasTine = () => { iasBun && iasNr.trim() !== ((iasS && iasS.telefonulTau) || "") && iasNumar(iasNr.trim()) },
        iasTrimis = ev => { if (!iasBun) { ev.preventDefault(); return } iasTine(), iasInchide() };
    async function iasCopiaza() {
        if (!iasBun) return;
        try {
            await navigator.clipboard.writeText(iasTot), iasTine(), iasPuneCopiat(!0), setTimeout(() => iasPuneCopiat(!1), 1600)
        } catch (x) {}
    }
    return E(oi, { open: !0, onClose: iasInchide, title: "Cere-i programul", layer: Wt.dialog },
        E("p", { className: "text-xs text-slate-400 -mt-1 mb-3" }, "Pentru ", iasEl.name || "elev", ". Po\u021Bi schimba textul; linkul se adaug\u0103 la final.",
            iasLimbaDe(iasEl) ? ` Mesajul \u0219i pagina sunt \xEEn ${IAS_LIMBI[iasLimbaDe(iasEl)] ? iasNumeLimba(iasS, iasLimbaDe(iasEl)).toLowerCase() : "englez\u0103"}; elevul poate schimba limba paginii de sus.` : ""),
        E(xe, { label: "Num\u0103rul t\u0103u de WhatsApp", required: !0 },
            E("input", {
                className: ie, type: "tel", inputMode: "tel",
                value: iasNr,
                onChange: S => iasPuneNr(S.target.value),
                placeholder: "07xx xxx xxx"
            })),
        E("p", { className: "text-xs -mt-2 mb-3.5", style: { color: iasBun ? "var(--muted-2)" : "var(--accent-ink)" } }, iasBun
            ? "Pe el \xEE\u021Bi vine r\u0103spunsul. R\u0103m\xE2ne \u021Binut minte \xEEn Set\u0103ri."
            : "Scrie-l ca r\u0103spunsul s\u0103 vin\u0103 direct la tine."),
        E(xe, { label: "Mesajul" },
            E("textarea", { rows: 5, className: ie, value: iasTxt, onChange: S => iasPuneTxt(S.target.value) })),
        E("div", {
            className: "font-mono-time text-xs rounded-xl px-3 py-2 -mt-1 mb-3",
            style: { background: "var(--surface-2)", color: "var(--muted)", wordBreak: "break-all" }
        }, iasLink),
        E("div", { className: "grid grid-cols-2 gap-2" },
            E("a", {
                href: iasBun ? (iasTel ? ak(iasTel, iasTot) : "https://wa.me/?text=" + encodeURIComponent(iasTot)) : void 0,
                target: "_blank", rel: "noopener noreferrer",
                onClick: iasTrimis,
                style: { touchAction: "manipulation", opacity: iasBun ? 1 : .45 },
                className: "py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm flex items-center justify-center gap-1.5"
            }, E(ai, { size: 15 }), "WhatsApp"),
            iasTel ? E("a", {
                href: iasBun ? rk(iasTel, iasTot) : void 0,
                onClick: iasTrimis,
                style: { touchAction: "manipulation", opacity: iasBun ? 1 : .45 },
                className: "py-2.5 rounded-xl bg-slate-900 text-white font-medium text-sm flex items-center justify-center gap-1.5"
            }, E(Na, { size: 15 }), "SMS") : null,
            E("button", {
                type: "button",
                onClick: iasCopiaza,
                style: { opacity: iasBun ? 1 : .45 },
                className: "py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm flex items-center justify-center gap-1.5"
            }, E(ti, { size: 15 }), iasCopiat ? "Copiat \u2713" : "Copiaz\u0103")),
        iasTel ? null : E("p", { className: "text-xs text-slate-400 mt-2" },
            "Elevul n-are telefon pe fi\u0219\u0103: WhatsApp te las\u0103 s\u0103-l alegi din contacte."),
        E("p", { className: "text-xs text-slate-400 mt-3" },
            "Elevul spune c\xE2nd poate el, \xEEn toate zilele s\u0103pt\u0103m\xE2nii; planul \xEEl pune doar \xEEn programul t\u0103u de lucru. ",
            iasLimbaDe(iasEl) ? "Linkul duce doar codul fi\u0219ei, num\u0103rul t\u0103u \u0219i limba paginii \u2014 nici orele tale, nici altceva despre elev." : "Linkul duce doar codul fi\u0219ei \u0219i num\u0103rul t\u0103u \u2014 nici orele tale, nici altceva despre elev."))
}

/* Linkul din mesajul elevului a deschis aplicația. Alegi: doar îl păstrezi
   pe fișă, deoparte, sau îl și folosești în plan. Nimic nu se scrie până nu
   apeși unul din cele două butoane. */
function IasProgramPrimit({ raspuns: iasR, elevi: iasElevi, onPastreaza: iasPastreaza, onClose: iasInchide }) {
    let E = o.default.createElement,
        [iasAles, iasPuneAles] = (0, o.useState)("");
    (0, o.useEffect)(() => {
        if (!iasR) return;
        let iasGasit = iasR.elev && (iasElevi || []).find(s => s.id === iasR.elev);
        iasPuneAles(iasGasit ? iasGasit.id : "")
    }, [iasR]);
    if (!iasR) return null;
    let iasToti = iasElevi || [],
        iasLista = iasToti.filter(s => !s.withdrawn || s.id === iasR.elev).slice()
            .sort((a, b) => (a.name || "").localeCompare(b.name || "", "ro")),
        iasEl = iasLista.find(s => s.id === iasAles) || null,
        iasNou = iasProgramElevNou(iasR),
        iasCerut = iasR.elev ? iasToti.find(s => s.id === iasR.elev) : null,
        iasBtn = (txt, fn, plin) => E("button", {
            onClick: fn,
            disabled: !iasEl,
            style: { opacity: iasEl ? 1 : .45 },
            className: "flex-1 py-3 rounded-xl font-medium text-sm " + (plin ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700")
        }, txt);
    return E(oi, {
        open: !0, onClose: iasInchide, title: "Program primit", layer: Wt.dialog,
        /* Cele două butoane fac lucruri foarte diferite, iar numele lor nu
           spun destul: „Doar îl păstrez" nu schimbă nimic pe fișă, doar ține
           minte ce a trimis elevul. Cine apasă acolo crezând că salvează se
           întoarce la fișă și n-o găsește schimbată. Așa că scriem dedesubt,
           în două rânduri, ce face fiecare. */
        footer: E("div", { className: "space-y-2" },
            E("div", { className: "flex gap-2.5" },
                iasBtn("Doar \xEEl p\u0103strez", () => iasEl && iasPastreaza(iasEl, iasNou, !1)),
                iasBtn("Folose\u0219te-l \xEEn plan", () => iasEl && iasPastreaza(iasEl, iasNou, !0), !0)),
            E("div", { className: "text-xs leading-snug", style: { color: "var(--muted-2)" } },
                E("span", { style: { fontWeight: 600 } }, "Folose\u0219te-l \xEEn plan"),
                " \u2014 zilele lui intr\u0103 \xEEn Disponibilitate \u0219i planul \u021Bine cont de ele.",
                E("br", null),
                E("span", { style: { fontWeight: 600 } }, "Doar \xEEl p\u0103strez"),
                " \u2014 r\u0103m\xE2ne scris pe fi\u0219\u0103, deoparte. ",
                E("span", { style: { fontWeight: 600 } }, "Nu schimb\u0103 nimic"),
                " la disponibilitate."))
    },
        E(xe, { label: "De la elevul" },
            E("select", { className: ie, value: iasAles, onChange: S => iasPuneAles(S.target.value) },
                E("option", { value: "" }, "Alege elevul\u2026"),
                iasLista.map(s => E("option", { key: s.id, value: s.id }, s.name)))),
        iasCerut ? E("p", { className: "text-xs text-slate-400 -mt-2 mb-3" },
            "Ales singur: linkul a pornit din fi\u0219a lui.") : null,
        iasR.elev && !iasCerut ? E("p", { className: "text-xs -mt-2 mb-3", style: { color: "var(--bad)" } },
            "Fi\u0219a din care ai cerut programul nu mai exist\u0103. Alege elevul.") : null,
        !iasR.elev ? E("p", { className: "text-xs text-slate-400 -mt-2 mb-3" },
            "Linkul n-a pornit dintr-o fi\u0219\u0103, a\u0219a c\u0103 alegi tu elevul.") : null,
        E("div", { className: "text-xs font-medium mb-1", style: { color: "var(--muted)" } }, "Ce a trimis"),
        E(IasProgramRanduri, { program: iasNou }),
        iasR.mesaj ? E("p", { className: "text-xs text-slate-600 mb-3" }, "Elevul a mai scris: \u201E", iasR.mesaj, "\u201D") : null,
        iasEl ? E(o.default.Fragment, null,
            E("div", { className: "text-xs font-medium mb-1 mt-1", style: { color: "var(--muted)" } }, "Dac\u0103 \xEEl folose\u0219ti \xEEn plan"),
            E(IasDiferenteProgram, { vechi: iasEl, nou: iasFolosesteProgram({ ...iasEl, programElev: iasNou }) })) : null,
        E("p", { className: "text-xs text-slate-400" },
            "\u201EDoar \xEEl p\u0103strez\u201D \xEEl pune pe fi\u0219\u0103, deoparte, f\u0103r\u0103 s\u0103 schimbe nimic. \xCEl po\u021Bi folosi oric\xE2nd de acolo, iar \u201ERevino la ce era\u201D anuleaz\u0103."))
}

/* ============ DISPONIBILITATEA PE FIȘĂ, CA UN CALENDAR ============
   Aceeași idee ca pagina pe care o completează elevul: atingi o zi, alegi
   cum poate. Ce alegi se pune în fiecare zi la fel din săptămână, afară de
   cazul în care oprești asta — atunci rămâne doar pe data aceea.
   Schimbările se scriu pe loc în fișă și se salvează odată cu ea. */
var IAS_FELURI_FISA = [["oricand", "Oricând"], ["dupa", "De la…"], ["pana", "Până la…"],
    ["intre", "Între…"], ["afara", "Nu poate între…"], ["nu", "Indisponibil"]];

function IasDispCalendar({ elev: c, program: iasProg, onSchimba: iasSchimba }) {
    let E = o.default.createElement,
        iasAzi = Be(),
        [iasStart, iasPuneStart] = (0, o.useState)(() => ft(Gi(Ue(Be())))),
        [iasAles, iasPuneAles] = (0, o.useState)(null),
        iasOre = z => {
            let p = Array.isArray(iasProg) ? iasProg[z] : [480, 1200];
            return Array.isArray(p) ? p : null
        },
        iasPlecat = t => !!c.plecatPana && t >= (c.plecatDin || iasAzi) && t <= c.plecatPana,
        iasBuc = (z, r) => {
            let p = iasOre(z) || [480, 1200], S = p[0], T = p[1], cl = x => Math.max(S, Math.min(T, Number(x)));
            if (!r || !r.fel) return null;
            switch (r.fel) {
                case "oricand": return [[S, T]];
                case "nu": return [];
                case "dupa": return [[cl(r.lo), T]];
                case "pana": return [[S, cl(r.hi)]];
                case "intre": return [[cl(r.lo), cl(r.hi)]];
                case "afara": return [[S, cl(r.lo)], [cl(r.hi), T]].filter(a => a[1] > a[0])
            }
            return null
        },
        iasBanda = (z, r, h) => {
            let p = iasOre(z) || [480, 1200], S = p[0], T = p[1], b = iasBuc(z, r);
            return E("span", {
                "aria-hidden": "true",
                style: {
                    position: "relative", display: "block", height: h, borderRadius: h / 2, overflow: "hidden",
                    background: b ? "repeating-linear-gradient(135deg, transparent 0 3px, var(--line-2) 3px 5px)" : "transparent",
                    boxShadow: b ? "none" : "inset 0 0 0 1px var(--line-2)"
                }
            }, (b || []).map((a, i) => E("span", {
                key: i,
                style: {
                    position: "absolute", top: 0, bottom: 0, borderRadius: h / 2, background: "var(--accent)",
                    left: ((a[0] - S) / (T - S) * 100).toFixed(2) + "%", width: ((a[1] - a[0]) / (T - S) * 100).toFixed(2) + "%"
                }
            })))
        },
        /* Scrie o regulă (sau o șterge, cu null). Regula generală veche
           (interval pe toată săptămâna, zile bifate) se pune întâi pe fiecare
           zi, ca zilele neatinse să rămână exact cum erau. */
        iasScrie = (ales, regula) => iasSchimba(F => {
            let baza = iasProgramElevCampuri(F, { zile: {} }),
                zile = { ...baza.dispZile }, date = { ...(F.dispDate || {}) };
            Object.keys(date).forEach(k => { k < Be() && delete date[k] });
            if (ales.mod === "zi" || ales.laFel) {
                regula ? zile[ales.z] = regula : delete zile[ales.z];
                ales.t && delete date[ales.t]
            } else regula ? date[ales.t] = regula : delete date[ales.t];
            return { ...F, dispZile: zile, availFrom: "", availTo: "", availDays: [], dispDate: date }
        }),
        iasCurent = iasAles ? (iasAles.mod === "zi"
            ? (iasRegulaZilei({ ...c, dispDate: null }, ft(pn(Ue(iasStart), (iasAles.z + 6) % 7))) || { fel: null })
            : iasRegulaZilei(iasAles.laFel ? { ...c, dispDate: null } : c, iasAles.t)) : null,
        iasAlege = fel => {
            let p = iasOre(iasAles.z) || [480, 1200], S = p[0], T = p[1], cl = x => Math.max(S, Math.min(T, x)), r = { fel: fel };
            if (fel === "dupa") r.lo = cl(Math.min(960, T - 90));
            if (fel === "pana") r.hi = cl(Math.max(720, S + 90));
            if (fel === "intre") r.lo = cl(600), r.hi = cl(Math.max(r.lo + 90, 840));
            if (fel === "afara") r.lo = cl(840), r.hi = cl(Math.max(r.lo + 30, 1080));
            iasScrie(iasAles, r)
        },
        iasOra = (cap, v) => {
            let r = { fel: iasCurent.fel, lo: iasCurent.lo, hi: iasCurent.hi };
            r[cap] = Number(v);
            if ((r.fel === "intre" || r.fel === "afara") && cap === "lo" && Number(r.hi) <= r.lo) r.hi = Math.min(1440, r.lo + 90);
            if ((r.fel === "intre" || r.fel === "afara") && cap === "hi" && r.hi <= Number(r.lo)) r.lo = Math.max(0, r.hi - 90);
            r.lo == null && delete r.lo, r.hi == null && delete r.hi;
            iasScrie(iasAles, r)
        },
        iasZile = Array.from({ length: 28 }, (x, k) => ft(pn(Ue(iasStart), k))),
        iasEAcum = iasStart === ft(Gi(Ue(Be()))),
        iasMuta = n => { iasPuneStart(ft(pn(Ue(iasStart), n))), iasPuneAles(null) };

    let iasCelula = t => {
        let d = Ue(t), z = d.getDay(), lucru = !!iasOre(z), trecut = t < iasAzi, lip = iasPlecat(t),
            r = iasRegulaZilei(c, t), anume = !!r.anume, poate = lucru && !trecut && !lip,
            sel = iasAles && iasAles.mod === "data" && iasAles.t === t,
            text = !lucru ? "nu lucrezi" : lip ? "plecat" : r.fel ? iasFelText(r) + (anume ? ", doar atunci" : "") : "fără regulă (oricând)";
        return E("button", {
            key: t, type: "button", disabled: !poate,
            "data-ias-zi-disp": t,
            onClick: () => iasPuneAles(sel ? null : { mod: "data", t: t, z: z, laFel: !anume }),
            "aria-label": `${Tw[z]} ${d.getDate()} ${yo[d.getMonth()]}: ${text}`,
            "aria-pressed": sel,
            className: "relative flex flex-col justify-between text-left",
            style: {
                minHeight: 48, padding: "6px 5px 6px", borderRadius: 11,
                border: sel ? "2px solid var(--accent)" : "1px solid var(--line)",
                background: !poate ? "transparent" : (lip || r.fel === "nu")
                    ? "repeating-linear-gradient(135deg, transparent 0 4px, var(--line-2) 4px 6px), var(--surface)" : "var(--surface)",
                opacity: !lucru || trecut ? .4 : 1,
                borderColor: !poate && !sel ? "transparent" : void 0
            }
        }, E("span", {
            className: "font-mono-time",
            style: {
                fontSize: 14, fontWeight: 700, lineHeight: 1,
                color: lip || r.fel === "nu" ? "var(--muted)" : "var(--text)",
                textDecoration: lip || r.fel === "nu" ? "line-through" : "none"
            }
        }, d.getDate(), d.getDate() === 1 || t === iasZile[0] ? E("span", {
            style: { fontSize: 9, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--muted)", marginLeft: 2 }
        }, yo[d.getMonth()].slice(0, 3)) : null), anume && poate ? E("span", {
            "aria-hidden": "true",
            style: { position: "absolute", top: -4, left: "50%", marginLeft: -5, width: 10, height: 10, borderRadius: 99, background: "var(--accent)", border: "2px solid var(--bg)" }
        }) : null, lucru ? iasBanda(z, lip ? { fel: "nu" } : r, 5) : null)
    };

    let iasEditor = () => {
        if (!iasAles) return null;
        let z = iasAles.z, p = iasOre(z) || [480, 1200], r = iasCurent || { fel: null },
            titlu = iasAles.mod === "zi" ? `În fiecare ${Tw[z].toLowerCase()}` : `${Tw[z]}, ${iasZiLuna(iasAles.t)}`,
            areOre = r.fel === "dupa" || r.fel === "pana" || r.fel === "intre" || r.fel === "afara",
            iasSel = (cap, et) => E(xe, { label: et },
                E("select", {
                    className: `${ie} font-mono-time`,
                    value: r[cap] == null ? "" : r[cap],
                    "data-ias-ora-disp": cap,
                    onChange: S => iasOra(cap, S.target.value)
                }, mu.map(L => E("option", { key: L, value: L }, Se(L)))));
        return E("div", {
            "data-ias-editor-disp": "",
            className: "rounded-xl px-3 pt-2.5 pb-3 mt-2",
            style: { background: "var(--surface-2)", border: "1px solid var(--accent-line)" }
        },
            E("div", { className: "flex items-baseline justify-between gap-2" },
                E("span", { className: "text-sm font-semibold", style: { color: "var(--text)" } }, titlu),
                E("span", { className: "text-xs text-right", style: { color: "var(--muted)" } },
                    r.fel ? iasFelText(r) : "fără regulă")),
            E("div", { className: "text-xs mb-2", style: { color: "var(--muted-2)" } }, `Lucrezi ${Se(p[0])}–${Se(p[1])}`),
            iasBanda(z, r, 8),
            E("div", { className: "grid grid-cols-3 gap-1.5 mt-2.5" },
                IAS_FELURI_FISA.map(([f, n]) => E("button", {
                    key: f, type: "button",
                    "data-ias-fel-disp": f,
                    "aria-pressed": r.fel === f,
                    onClick: () => iasAlege(f),
                    className: `py-2 rounded-xl text-xs font-medium border ${r.fel === f ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200"}`
                }, n))),
            areOre ? E("div", { className: "grid grid-cols-2 gap-3 mt-2.5" },
                r.fel !== "pana" ? iasSel("lo", r.fel === "afara" ? "Nu poate de la" : "De la") : null,
                r.fel !== "dupa" ? iasSel("hi", "Până la") : null) : null,
            iasAles.mod === "data" ? E("button", {
                type: "button",
                "data-ias-lafel-disp": "",
                "aria-pressed": iasAles.laFel,
                onClick: () => {
                    /* Pornit: regula zilei acesteia devine a tuturor zilelor de
                       felul ei. Oprit: rămâne doar pe data aceasta. */
                    let r2 = r.fel ? { fel: r.fel, ...(r.lo != null ? { lo: r.lo } : {}), ...(r.hi != null ? { hi: r.hi } : {}) } : null,
                        nou = { ...iasAles, laFel: !iasAles.laFel };
                    if (r2) iasScrie(nou, r2);
                    iasPuneAles(nou)
                },
                className: "w-full flex items-center gap-2.5 mt-2.5 text-left"
            }, E("span", {
                className: "flex items-center justify-center rounded-md shrink-0",
                style: {
                    width: 18, height: 18, fontSize: 12, fontWeight: 900, lineHeight: 1, color: "#3a2100",
                    border: `1.5px solid ${iasAles.laFel ? "var(--accent)" : "var(--line-2)"}`,
                    background: iasAles.laFel ? "var(--accent)" : "transparent"
                }
            }, iasAles.laFel ? "✓" : ""), E("span", { className: "flex-1 min-w-0" },
                E("span", { className: "block text-sm", style: { color: "var(--text)" } }, `La fel în fiecare ${Tw[z].toLowerCase()}`),
                E("span", { className: "block text-xs", style: { color: "var(--muted)" } },
                    iasAles.laFel ? `Se aplică tuturor zilelor de ${Tw[z].toLowerCase()}.` : `Doar pe ${iasZiLuna(iasAles.t)}.`))) : null,
            E("div", { className: "flex gap-2 mt-3" },
                E("button", {
                    type: "button",
                    "data-ias-sterge-disp": "",
                    onClick: () => { iasScrie(iasAles, null), iasPuneAles(null) },
                    className: "px-3 py-2 rounded-xl text-xs font-medium border bg-white text-slate-500 border-slate-200"
                }, iasAles.mod === "data" && !iasAles.laFel ? "Scoate ziua aceasta" : "Fără regulă"),
                E("button", {
                    type: "button",
                    onClick: () => iasPuneAles(null),
                    className: "flex-1 py-2 rounded-xl text-xs font-medium bg-slate-900 text-white"
                }, "Gata")))
    };

    let iasVechi = [];
    c.tura && iasVechi.push("tură: " + iasDispTuraText(c));
    (c.availParity === "even" || c.availParity === "odd") && iasVechi.push("zilele lunii: " + iasDispParText(c));

    return E("div", { className: "mb-3", "data-ias-cal-disp": "" },
        E("div", { className: "flex items-center gap-1 mb-1.5" },
            E("button", { type: "button", "aria-label": "Săptămânile dinainte", onClick: () => iasMuta(-28), disabled: iasEAcum,
                className: "p-2 rounded-lg", style: { color: "var(--muted)", opacity: iasEAcum ? .35 : 1 } }, E(ei, { size: 16 })),
            E("span", { className: "flex-1 text-center text-xs font-medium", style: { color: "var(--text-2)" } },
                `${iasZiLuna(iasZile[0])} – ${iasZiLuna(iasZile[27])}`),
            !iasEAcum ? E("button", { type: "button", onClick: () => { iasPuneStart(ft(Gi(Ue(Be())))), iasPuneAles(null) },
                className: "px-2 py-1 rounded-lg text-xs font-medium", style: { color: "var(--accent-ink)" } }, "Azi") : null,
            E("button", { type: "button", "aria-label": "Săptămânile următoare", onClick: () => iasMuta(28),
                className: "p-2 rounded-lg", style: { color: "var(--muted)" } }, E(un, { size: 16 }))),
        E("div", { className: "grid gap-1", style: { gridTemplateColumns: "repeat(7, minmax(0, 1fr))" } },
            po.map(z => {
                let r = iasZiuaLui(c, z), are = !!(r && r.fel !== "ca") || (Array.isArray(c.availDays) && c.availDays.length && c.availDays.indexOf(z) < 0),
                    sel = iasAles && iasAles.mod === "zi" && iasAles.z === z;
                return E("button", {
                    key: "k" + z, type: "button",
                    disabled: !iasOre(z),
                    "data-ias-sapt-disp": z,
                    "aria-label": `Pentru fiecare ${Tw[z].toLowerCase()}`,
                    "aria-pressed": !!sel,
                    onClick: () => iasPuneAles(sel ? null : { mod: "zi", z: z, t: null, laFel: !0 }),
                    className: "flex flex-col items-center justify-center gap-1 rounded-lg",
                    style: { minHeight: 34, fontSize: 11, fontWeight: 700, letterSpacing: ".06em",
                        color: sel ? "var(--accent-ink)" : "var(--muted)", opacity: iasOre(z) ? 1 : .4 }
                }, xu[z].slice(0, 1).toUpperCase(), E("span", {
                    "aria-hidden": "true",
                    style: { display: "block", width: 14, height: 3, borderRadius: 2,
                        background: are ? "var(--accent)" : "transparent", border: are ? "0" : "1px solid var(--line-2)" }
                }))
            }),
            iasZile.map(iasCelula)),
        E("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs", style: { color: "var(--muted)" } },
            E("span", { className: "inline-flex items-center gap-1.5" }, E("i", { style: { display: "inline-block", width: 16, height: 5, borderRadius: 3, background: "var(--accent)" } }), "poate"),
            E("span", { className: "inline-flex items-center gap-1.5" }, E("i", { style: { display: "inline-block", width: 16, height: 5, borderRadius: 3, background: "repeating-linear-gradient(135deg, transparent 0 3px, var(--line-2) 3px 5px)" } }), "nu poate"),
            E("span", { className: "inline-flex items-center gap-1.5" }, E("i", { style: { display: "inline-block", width: 16, height: 5, borderRadius: 3, boxShadow: "inset 0 0 0 1px var(--line-2)" } }), "fără regulă"),
            E("span", { className: "inline-flex items-center gap-1.5" }, E("i", { style: { display: "inline-block", width: 8, height: 8, borderRadius: 99, background: "var(--accent)" } }), "doar ziua aceea")),
        iasEditor(),
        iasAles ? null : E("p", { className: "text-xs mt-2", style: { color: "var(--muted-2)" } },
            "Atinge o zi ca să spui cum poate, sau litera de sus pentru toate zilele de felul ei."),
        iasVechi.length ? E("div", {
            "data-ias-vechi-disp": "",
            className: "flex items-center gap-2 rounded-xl px-3 py-2 mt-2",
            style: { background: "var(--surface-2)", border: "1px dashed var(--line-2)" }
        }, E("span", { className: "flex-1 min-w-0 text-xs", style: { color: "var(--muted)" } },
            "Mai e pe fișă, de dinainte: " + iasVechi.join(" \xB7 ") + ". Planul ține cont de ele."),
            E("button", {
                type: "button",
                onClick: () => iasSchimba(F => ({ ...F, tura: "", availParity: "all" })),
                className: "shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium border bg-white text-slate-600 border-slate-200"
            }, "Scoate")) : null)
}

/* ============ ELEVUL NOU, PAS CU PAS ============
   Fișa unui elev nou se completează întrebare cu întrebare: numele, telefonul,
   nașterea (din CNP sau direct), domiciliul, dosarul, limba ședințelor,
   categoria, școlarizarea, locul de start și ritmul. La capăt vezi totul
   într-un loc, adaugi elevul și îi poți trimite pe loc mesajul de bun venit,
   în limba lui. Formularul întreg rămâne la un buton distanță, iar tot ce
   scrii aici se schimbă oricând din fișa lui. */

/* CNP-ul: cifra de control (ponderile 279146358279), data nașterii și sexul.
   CNP-ul nu se păstrează nicăieri — din el rămân doar data și adresarea. */
function iasCitesteCnp(text) {
    let c = String(text || "").replace(/\D/g, "");
    if (!c) return { ok: !1, gol: !0 };
    if (c.length < 13) return { ok: !1, motiv: `mai sunt ${13 - c.length} cifre` };
    if (c.length > 13) return { ok: !1, motiv: "are mai mult de 13 cifre" };
    let w = "279146358279", s = 0;
    for (let k = 0; k < 12; k++) s += Number(c[k]) * Number(w[k]);
    let ctrl = s % 11;
    ctrl === 10 && (ctrl = 1);
    if (ctrl !== Number(c[12])) return { ok: !1, motiv: "cifra de control nu se potrivește — verifică cifrele" };
    let S = Number(c[0]), aa = Number(c.slice(1, 3)), ll = Number(c.slice(3, 5)), zz = Number(c.slice(5, 7)),
        acum = new Date().getFullYear() % 100,
        secol = S === 1 || S === 2 ? 1900 : S === 3 || S === 4 ? 1800 : S === 5 || S === 6 ? 2000 : aa <= acum ? 2000 : 1900;
    if (!S) return { ok: !1, motiv: "prima cifră nu poate fi 0" };
    let an = secol + aa, d = new Date(an, ll - 1, zz);
    if (ll < 1 || ll > 12 || d.getMonth() !== ll - 1 || d.getDate() !== zz) return { ok: !1, motiv: "data din CNP nu există" };
    return {
        ok: !0,
        data: `${an}-${String(ll).padStart(2, "0")}-${String(zz).padStart(2, "0")}`,
        sex: S === 9 ? "" : S % 2 ? "m" : "f"
    }
}

/* „12 martie 2006" */
function iasDataLunga(iso) {
    let e = Ue(iso);
    return `${e.getDate()} ${yo[e.getMonth()]} ${e.getFullYear()}`
}

/* Felurile școlarizării, cum le alegi la elevul nou. */
var IAS_FELURI_SCOLARIZARE = [
    { id: "integral", nume: "Plătită integral", sub: "Achitată la școală. Primește ședințele incluse din plan." },
    { id: "partial", nume: "Plătită parțial", sub: "A dat o parte. Primește ședințele incluse, iar restul răm\xE2ne de plată." },
    { id: "perfectionare", nume: "\xCEn vederea perfecționării", sub: "Are permis. Nicio ședință inclusă — toate sunt suplimentare." },
    { id: "provizorie", nume: "Provizorie", sub: "Nu știi \xEEncă ce a plătit. \xCEl programezi de acum, completezi mai t\xE2rziu." },
    { id: "altfel", nume: "Altfel", sub: "Vine de la un coleg, are ședințe rămase sau face cele 3 de după un examen picat." }
];

/* Planurile de școlarizare: taxele tale care aduc ședințe incluse. */
function iasPlanuri(setari) {
    return ii(setari || {}).filter(t => ur(t) === "included" && Number(t.hours) > 0)
}

function iasScolarizareGoala(setari) {
    let p = iasPlanuri(setari);
    return { fel: "", plan: p[0] ? p[0].id : "", platit: "", unde: "school", ore: 15, altfel: "taxa", taxa: "", achitat: "", incluse: 0, suplimentare: 0 }
}

/* Ce lipsește ca școlarizarea aleasă să se poată pune. "" = e gata. */
function iasScolarizareLipsa(sc, setari) {
    if (!sc || !sc.fel) return "Alege felul școlarizării.";
    let taxe = ii(setari || {}), plan = taxe.find(t => t.id === sc.plan);
    if (sc.fel === "integral") return plan ? "" : "Alege planul sau adaugă unul nou.";
    if (sc.fel === "partial") {
        if (!plan) return "Alege planul sau adaugă unul nou.";
        let p = Number(sc.platit) || 0;
        if (p <= 0) return "Scrie c\xE2t a plătit p\xE2nă acum.";
        if (p >= (Number(plan.price) || 0)) return "A plătit tot? Atunci alege „Plătită integral”.";
        return ""
    }
    if (sc.fel === "altfel") {
        if (sc.altfel === "ore") return (Number(sc.incluse) || 0) + (Number(sc.suplimentare) || 0) > 0 ? "" : "C\xE2te ședințe mai are de făcut?";
        if (!taxe.find(t => t.id === sc.taxa)) return "Alege taxa sau adaugă una nouă.";
        return sc.achitat ? "" : "Spune dacă s-a achitat.";
    }
    return ""
}

/* Școlarizarea, spusă pe scurt: pe fișă, în rezumat, în pașii elevului nou. */
function iasDescriereScolarizare(sc, setari) {
    if (!sc || !sc.fel) return "";
    let taxe = ii(setari || {}), lei = setari && setari.currency || "lei",
        bani = x => `${(Number(x) || 0).toLocaleString("ro-RO")} ${lei}`,
        plan = taxe.find(t => t.id === sc.plan), taxa = taxe.find(t => t.id === sc.taxa);
    switch (sc.fel) {
        case "integral": return `Plătită integral${plan ? ` \xB7 ${plan.name} \xB7 ${Number(plan.hours) || 0} incluse` : ""}`;
        case "partial": return `Plătită parțial \xB7 ${bani(sc.platit)}${plan ? ` din ${bani(plan.price)}` : ""} \xB7 ${Number(sc.ore) || 0} incluse`;
        case "perfectionare": return "\xCEn vederea perfecționării \xB7 fără ședințe incluse";
        case "provizorie": return `Provizorie \xB7 ${Number(sc.ore) || 0} incluse p\xE2nă afli`;
        case "altfel": return sc.altfel === "ore"
            ? `Ședințe rămase \xB7 ${Number(sc.incluse) || 0} incluse, ${Number(sc.suplimentare) || 0} suplimentare`
            : `${taxa ? taxa.name : "Taxă"} \xB7 ${sc.achitat === "school" ? "achitată la școală" : sc.achitat === "me" ? "achitată la tine" : "intră la datorie"}`;
    }
    return ""
}

/* Pune școlarizarea pe elev: taxele, orele, plățile, perfecționarea. Ține
   minte exact ce a adăugat (adaugat), ca s-o poți schimba mai târziu fără să
   rămână nimic în plus. */
function iasAplicaScolarizare(elev, sc, setari) {
    let e = { ...elev, fees: { ...(elev.fees || {}) }, feeLog: [...(elev.feeLog || [])], payments: [...(elev.payments || [])] },
        ad = { fees: {}, plati: [], incluse: 0, suplimentare: 0, perfectionare: !1, pachet: "" },
        azi = Be(),
        taxe = ii(setari || {}),
        ore = (unde, n) => {
            n = Math.max(0, Number(n) || 0);
            if (!n) return;
            unde === "included" ? (e.includedHours = (Number(e.includedHours) || 0) + n, ad.incluse += n) : (e.extraHours = (Number(e.extraHours) || 0) + n, ad.suplimentare += n)
        },
        puneTaxa = (t, cuOre) => {
            e.fees[t.id] = (Number(e.fees[t.id]) || 0) + 1, e.feeLog.push({ feeId: t.id, date: azi }), ad.fees[t.id] = (ad.fees[t.id] || 0) + 1;
            cuOre && ore(ur(t), t.hours)
        },
        plata = (suma, unde) => {
            suma = Number(suma) || 0;
            if (suma <= 0) return;
            let p = { id: Vt("pay"), date: azi, amount: suma, collector: unde === "me" ? "me" : "school" };
            e.payments.push(p), ad.plati.push(p.id)
        },
        plan = taxe.find(t => t.id === sc.plan),
        taxa = taxe.find(t => t.id === sc.taxa);
    if (sc.fel === "integral" && plan) {
        puneTaxa(plan, !0), plata(plan.price, "school");
        /* Ca în formular: pachetul ales se vede ales. Doar cel achitat la școală,
           fiindcă schimbarea lui din formular știe să retragă plata. */
        plan.laScoala && !e.pachet && (e.pachet = plan.id, ad.pachet = plan.id)
    } else if (sc.fel === "partial" && plan) {
        puneTaxa(plan, !1), ore("included", sc.ore), plata(sc.platit, sc.unde)
    } else if (sc.fel === "perfectionare") {
        e.perfectionare || (e.perfectionare = !0, ad.perfectionare = !0)
    } else if (sc.fel === "provizorie") {
        ore("included", sc.ore)
    } else if (sc.fel === "altfel") {
        if (sc.altfel === "ore") ore("included", sc.incluse), ore("extra", sc.suplimentare);
        else if (taxa) puneTaxa(taxa, !0), sc.achitat === "school" ? plata(taxa.price, "school") : sc.achitat === "me" && plata(taxa.price, "me")
    }
    let pastrat = {};
    ["fel", "plan", "platit", "unde", "ore", "altfel", "taxa", "achitat", "incluse", "suplimentare"].forEach(k => sc[k] != null && sc[k] !== "" && (pastrat[k] = sc[k]));
    e.scolarizare = { ...pastrat, din: azi, adaugat: ad };
    return e
}

/* Scoate ce pusese școlarizarea de dinainte — numai ce adăugase ea. */
function iasScoateScolarizare(elev) {
    let s = elev && elev.scolarizare, ad = s && s.adaugat;
    if (!ad) return elev;
    let e = { ...elev, fees: { ...(elev.fees || {}) }, feeLog: [...(elev.feeLog || [])] };
    Object.keys(ad.fees || {}).forEach(id => {
        let n = Number(ad.fees[id]) || 0, rest = Math.max(0, (Number(e.fees[id]) || 0) - n);
        rest ? e.fees[id] = rest : delete e.fees[id];
        for (let k = e.feeLog.length - 1; k >= 0 && n > 0; k--) e.feeLog[k] && e.feeLog[k].feeId === id && (e.feeLog.splice(k, 1), n--)
    });
    e.payments = (elev.payments || []).filter(p => (ad.plati || []).indexOf(p.id) < 0);
    e.includedHours = Math.max(0, (Number(e.includedHours) || 0) - (Number(ad.incluse) || 0));
    e.extraHours = Math.max(0, (Number(e.extraHours) || 0) - (Number(ad.suplimentare) || 0));
    ad.perfectionare && (e.perfectionare = !1);
    ad.pachet && e.pachet === ad.pachet && (e.pachet = "");
    delete e.scolarizare;
    return e
}

/* După ce se schimbă câte ședințe incluse are, ședințele lui se potrivesc:
   primele, în ordinea zilelor, sunt incluse; cele de peste, suplimentare. */
function iasRetipeaza(sesiuni, elevId, incluse) {
    let ale = sesiuni.filter(x => x.studentId === elevId && x.status !== "cancelled")
        .sort((a, b) => (a.date + Se(a.startMin)).localeCompare(b.date + Se(b.startMin))),
        k = 0, tip = {};
    ale.forEach(x => {
        let t = k < incluse ? "included" : x.type === "included" ? "extra" : x.type;
        t === "included" && k++;
        t !== x.type && (tip[x.id] = t)
    });
    let n = Object.keys(tip).length;
    return { sesiuni: n ? sesiuni.map(x => tip[x.id] ? { ...x, type: tip[x.id] } : x) : sesiuni, schimbate: n }
}

/* Școlarizarea încă necompletată. */
function iasProvizoriu(elev) {
    return !!(elev && !elev.withdrawn && elev.scolarizare && elev.scolarizare.fel === "provizorie")
}

/* Semnul de pe numele elevului cu școlarizarea provizorie: indicatorul
   galben de lucrări — semnul de drum pentru ce e temporar. */
function IasSemnProvizoriu({ size: iasS = 14 }) {
    return o.default.createElement("svg", {
        width: iasS, height: iasS, viewBox: "0 0 24 24", "aria-hidden": "true",
        style: { display: "block" }
    }, o.default.createElement("path", {
        d: "M12 2.6 L22.4 20.6 Q22.8 21.4 21.9 21.4 L2.1 21.4 Q1.2 21.4 1.6 20.6 Z",
        fill: "#f5c400", stroke: "#d0021b", strokeWidth: 2.2, strokeLinejoin: "round"
    }), o.default.createElement("text", {
        x: 12, y: 18.6, textAnchor: "middle", fontSize: 11.5, fontWeight: 900,
        fontFamily: "system-ui, sans-serif", fill: "#111"
    }, "?"))
}

/* Un număr care se schimbă cu − și +, mare, pentru degetul mare. */
function IasPasNumar({ valoare: v, onSchimba: f, min: mn = 0, max: mx = 99, eticheta: et, mare: iasMare }) {
    let n = Number(v) || 0,
        buton = (semn, d) => o.default.createElement("button", {
            type: "button", "aria-label": semn === "+" ? "Mai mult" : "Mai puțin",
            "data-ias-pas-numar": semn,
            disabled: semn === "+" ? n >= mx : n <= mn,
            onClick: () => f(Math.min(mx, Math.max(mn, n + d))),
            className: "shrink-0 rounded-full flex items-center justify-center text-xl font-medium disabled:opacity-30",
            style: { width: iasMare ? 52 : 40, height: iasMare ? 52 : 40, border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)" }
        }, semn === "+" ? "+" : "−");
    return o.default.createElement("div", { className: "flex items-center gap-3" },
        buton("−", -1),
        o.default.createElement("div", { className: "flex-1 text-center" },
            o.default.createElement("div", { className: "font-mono-time font-semibold", style: { fontSize: iasMare ? 44 : 26, lineHeight: 1.1, color: "var(--text)" } }, n),
            et ? o.default.createElement("div", { className: "text-xs", style: { color: "var(--muted-2)" } }, et) : null),
        buton("+", 1))
}

/* Alegere dintre câteva, ca pastile. */
function IasPastile({ optiuni: op, valoare: v, onAlege: f, numeDate: nd }) {
    return o.default.createElement("div", { className: "flex flex-wrap gap-1.5", "data-ias-pastile": nd || "" }, op.map(([id, t]) => {
        let ales = v === id;
        return o.default.createElement("button", {
            key: id || "-", type: "button", "aria-pressed": ales, "data-ias-pastila": id,
            onClick: () => f(id),
            className: "text-sm px-3.5 py-2 rounded-full font-medium",
            style: { background: ales ? "var(--invert)" : "var(--surface)", color: ales ? "#fff" : "var(--text)", border: `1px solid ${ales ? "var(--invert)" : "var(--line)"}` }
        }, t)
    }))
}

/* Un card de ales: titlu, rând mic dedesubt, bifat când e ales. */
function IasCardAles({ ales, titlu, sub, dreapta, onClick: f, date: dt }) {
    return o.default.createElement("button", {
        type: "button", onClick: f, "aria-pressed": !!ales, ...(dt || {}),
        className: "w-full text-left rounded-2xl px-3.5 py-3",
        style: {
            background: ales ? "var(--accent-soft)" : "var(--surface)",
            border: `${ales ? 2 : 1}px solid ${ales ? "var(--accent)" : "var(--line)"}`,
            boxShadow: ales ? "0 2px 12px -6px var(--accent)" : "var(--shadow)"
        }
    }, o.default.createElement("div", { className: "flex items-baseline gap-2" },
        o.default.createElement("span", { className: "text-sm font-semibold flex-1 min-w-0", style: { color: ales ? "var(--accent-ink)" : "var(--text)" } }, titlu),
        dreapta ? o.default.createElement("span", { className: "font-mono-time text-sm shrink-0", style: { color: ales ? "var(--accent-ink)" : "var(--muted)" } }, dreapta) : null,
        ales ? o.default.createElement("span", { className: "text-sm shrink-0", style: { color: "var(--accent-ink)" } }, "✓") : null),
        sub ? o.default.createElement("div", { className: "text-xs mt-1", style: { color: "var(--muted-2)" } }, sub) : null)
}

/* O taxă sau un plan nou, chiar de aici. Se adaugă în Finanțe → Taxe, la fel
   ca acolo. */
function IasTaxaNoua({ setari: iasS, plan: iasPlan, onAdauga: iasAdauga, onRenunta: iasRenunta }) {
    let [d, pune] = (0, o.useState)(() => iasPlan
        ? { name: "Școlarizare", price: "", hours: "17", oreTip: "included", laScoala: !0 }
        : { name: "", price: "", hours: "3", oreTip: "included", laScoala: !1 }),
        b = (k, v) => pune(x => ({ ...x, [k]: v })),
        bun = d.name.trim() && Number(d.price) > 0;
    return o.default.createElement("div", { className: "rounded-2xl p-3.5 mt-2", "data-ias-taxa-noua": iasPlan ? "plan" : "taxa", style: { background: "var(--surface-2)", border: "1px solid var(--line)" } },
        o.default.createElement("div", { className: "text-sm font-semibold mb-3", style: { color: "var(--text)" } }, iasPlan ? "Plan de școlarizare nou" : "Taxă nouă"),
        o.default.createElement(xe, { label: "Numele" }, o.default.createElement("input", {
            className: ie, value: d.name, placeholder: iasPlan ? "ex. Școlarizare 20 ședințe" : "ex. Pachet 3 ședințe", onChange: q => b("name", q.target.value)
        })),
        o.default.createElement("div", { className: "grid grid-cols-2 gap-3" },
            o.default.createElement(xe, { label: `Preț (${iasS && iasS.currency || "lei"})` }, o.default.createElement("input", {
                type: "number", min: "0", inputMode: "numeric", className: ie, value: d.price, onChange: q => b("price", q.target.value)
            })),
            o.default.createElement(xe, { label: "Ședințe" }, o.default.createElement("input", {
                type: "number", min: "0", inputMode: "numeric", className: ie, value: d.hours, onChange: q => b("hours", q.target.value)
            }))),
        iasPlan ? null : o.default.createElement("div", { className: "mb-3" },
            o.default.createElement("span", { className: "block text-xs font-medium text-slate-500 mb-1.5" }, "Ședințele aduse sunt"),
            o.default.createElement(IasPastile, { optiuni: [["included", "incluse"], ["extra", "suplimentare"]], valoare: d.oreTip, onAlege: v => b("oreTip", v) })),
        o.default.createElement("button", {
            type: "button", onClick: () => b("laScoala", !d.laScoala),
            className: "w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 mb-3 text-left",
            style: { border: `1px solid ${d.laScoala ? "var(--accent-line)" : "var(--line)"}`, background: d.laScoala ? "var(--accent-soft)" : "var(--surface)" }
        }, o.default.createElement("span", {
            className: "flex items-center justify-center rounded-md shrink-0",
            style: { width: 18, height: 18, border: `1.5px solid ${d.laScoala ? "var(--accent)" : "var(--line-2)"}`, background: d.laScoala ? "var(--accent)" : "transparent", color: "#3a2100", fontSize: 12, fontWeight: 900, lineHeight: 1 }
        }, d.laScoala ? "✓" : ""), o.default.createElement("span", { className: "text-sm flex-1", style: { color: "var(--text)" } }, "Se achită la școală")),
        o.default.createElement("div", { className: "flex gap-2" },
            o.default.createElement("button", { type: "button", onClick: iasRenunta, className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600" }, "Renunță"),
            o.default.createElement("button", {
                type: "button", disabled: !bun, "data-ias-taxa-adauga": "",
                onClick: () => iasAdauga({ id: Vt("fee"), name: d.name.trim(), price: Number(d.price) || 0, hours: Number(d.hours) || 0, oreTip: iasPlan ? "included" : d.oreTip, laScoala: !!d.laScoala }),
                className: "flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium disabled:opacity-40"
            }, "Adaugă")),
        o.default.createElement("p", { className: "text-xs text-slate-400 mt-2" }, "Se păstrează \xEEn Finanțe → Taxe, ca s-o alegi și la alți elevi."))
}

/* Alegerea școlarizării: cele cinci feluri și, sub cel ales, ce mai trebuie
   spus despre el. Aceeași la elevul nou și pe fișă, la „Schimbă". */
function IasScolarizareAlege({ sc, setari: iasS, onSchimba: iasF, onAdaugaTaxa: iasAdaugaTaxa, faraProvizorie: iasFaraProv }) {
    let [nou, puneNou] = (0, o.useState)(""),
        b = (k, v) => iasF({ ...sc, [k]: v }),
        lei = iasS && iasS.currency || "lei",
        bani = x => `${(Number(x) || 0).toLocaleString("ro-RO")} ${lei}`,
        planuri = iasPlanuri(iasS),
        taxe = ii(iasS || {}),
        plan = taxe.find(t => t.id === sc.plan),
        adaugaTaxa = (t, cheie) => { iasAdaugaTaxa && iasAdaugaTaxa(t), puneNou(""), iasF({ ...sc, [cheie]: t.id }) },
        alegePlan = () => o.default.createElement("div", { className: "space-y-1.5", "data-ias-planuri": "" },
            planuri.map(t => o.default.createElement(IasCardAles, {
                key: t.id, ales: sc.plan === t.id, titlu: t.name, dreapta: bani(t.price),
                sub: `${Number(t.hours) || 0} ședințe incluse${t.laScoala ? " \xB7 achitat la școală" : ""}`,
                date: { "data-ias-plan": t.id },
                onClick: () => b("plan", t.id)
            })),
            nou === "plan" ? o.default.createElement(IasTaxaNoua, { setari: iasS, plan: !0, onRenunta: () => puneNou(""), onAdauga: t => adaugaTaxa(t, "plan") })
                : o.default.createElement("button", {
                    type: "button", "data-ias-plan-nou": "", onClick: () => puneNou("plan"),
                    className: "w-full py-2.5 rounded-xl text-sm font-medium",
                    style: { border: "1px dashed var(--accent-line)", color: "var(--accent-ink)", background: "var(--accent-soft)" }
                }, planuri.length ? "+ Plan nou (alt număr de ședințe)" : "+ Adaugă planul de școlarizare")),
        nota = t => o.default.createElement("p", { className: "text-xs mt-2.5 px-1", style: { color: "var(--muted-2)" } }, t),
        eticheta = t => o.default.createElement("span", { className: "block text-xs font-medium mb-1.5", style: { color: "var(--muted)", marginTop: 14 } }, t),
        detalii = null;
    if (sc.fel === "integral") detalii = o.default.createElement(o.default.Fragment, null, eticheta("Planul"), alegePlan(),
        plan ? nota(`Primește ${Number(plan.hours) || 0} ședințe incluse. Cei ${bani(plan.price)} se trec ca plată făcută la școală — nu răm\xE2ne datorie.`) : null);
    else if (sc.fel === "partial") {
        let rest = plan ? (Number(plan.price) || 0) - (Number(sc.platit) || 0) : 0;
        detalii = o.default.createElement(o.default.Fragment, null, eticheta("Planul (suma \xEEntreagă)"), alegePlan(),
            eticheta("C\xE2t a plătit p\xE2nă acum"),
            o.default.createElement("input", {
                type: "number", min: "0", inputMode: "numeric", className: ie, "data-ias-platit": "",
                style: { fontSize: 17 }, value: sc.platit, placeholder: lei, onChange: q => b("platit", q.target.value)
            }),
            eticheta("Unde a plătit"),
            o.default.createElement(IasPastile, { optiuni: [["school", "La școală"], ["me", "La mine"]], valoare: sc.unde, onAlege: v => b("unde", v) }),
            eticheta("Ședințe incluse"),
            o.default.createElement(IasPasNumar, { valoare: sc.ore, min: 0, max: 60, onSchimba: v => b("ore", v), eticheta: "incluse acum" }),
            plan && Number(sc.platit) > 0 && rest > 0 ? o.default.createElement("div", {
                className: "rounded-xl px-3.5 py-2.5 mt-3 text-sm", "data-ias-rest": rest,
                style: { background: "var(--surface-2)", border: "1px solid var(--line)", color: "var(--text)" }
            }, "Răm\xE2n de plată ", o.default.createElement("b", { className: "font-mono-time" }, bani(rest)), ". Intră la datoria lui; c\xE2nd achită, treci plata pe fișă.") : null)
    } else if (sc.fel === "perfectionare") detalii = nota("Toate ședințele lui intră ca suplimentare, după tarifele tale. Nu e socotit la sală și nici la adeverință — are deja permis.");
    else if (sc.fel === "provizorie") detalii = o.default.createElement(o.default.Fragment, null,
        eticheta("P\xE2nă afli, socotesc"),
        o.default.createElement(IasPasNumar, { valoare: sc.ore, min: 0, max: 60, onSchimba: v => b("ore", v), eticheta: "ședințe incluse" }),
        o.default.createElement("div", { className: "flex items-start gap-2.5 rounded-xl px-3.5 py-3 mt-3", style: { background: "var(--surface-2)", border: "1px solid var(--line)" } },
            o.default.createElement("span", { className: "shrink-0 mt-0.5" }, o.default.createElement(IasSemnProvizoriu, { size: 20 })),
            o.default.createElement("span", { className: "text-xs", style: { color: "var(--muted)" } }, "\xCEl poți programa și \xEEl prinde planul. P\xE2nă completezi, numele lui poartă semnul galben, iar pe Acasă \xEEți amintește. De pe fișa lui: „Completează școlarizarea”.")));
    else if (sc.fel === "altfel") detalii = o.default.createElement(o.default.Fragment, null,
        eticheta("Ce aduce"),
        o.default.createElement(IasPastile, { optiuni: [["taxa", "O taxă stabilită"], ["ore", "Doar ședințele rămase"]], valoare: sc.altfel, onAlege: v => b("altfel", v), numeDate: "altfel" }),
        sc.altfel === "ore" ? o.default.createElement(o.default.Fragment, null,
            eticheta("Ședințe incluse rămase"),
            o.default.createElement(IasPasNumar, { valoare: sc.incluse, min: 0, max: 60, onSchimba: v => b("incluse", v) }),
            eticheta("Ședințe suplimentare rămase, deja plătite"),
            o.default.createElement(IasPasNumar, { valoare: sc.suplimentare, min: 0, max: 60, onSchimba: v => b("suplimentare", v) }),
            nota("Cele incluse și cele suplimentare plătite nu intră la datorie. Ce face peste ele se socotește ca suplimentar, după tarifele tale."))
            : o.default.createElement(o.default.Fragment, null,
                eticheta("Taxa"),
                o.default.createElement("div", { className: "space-y-1.5" },
                    taxe.map(t => o.default.createElement(IasCardAles, {
                        key: t.id, ales: sc.taxa === t.id, titlu: t.name, dreapta: bani(t.price),
                        sub: Number(t.hours) > 0 ? `${Number(t.hours)} ${ur(t) === "included" ? "ședințe incluse" : "ședințe suplimentare"}` : "fără ședințe",
                        date: { "data-ias-taxa": t.id },
                        onClick: () => b("taxa", t.id)
                    })),
                    nou === "taxa" ? o.default.createElement(IasTaxaNoua, { setari: iasS, onRenunta: () => puneNou(""), onAdauga: t => adaugaTaxa(t, "taxa") })
                        : o.default.createElement("button", {
                            type: "button", "data-ias-taxa-noua-buton": "", onClick: () => puneNou("taxa"),
                            className: "w-full py-2.5 rounded-xl text-sm font-medium",
                            style: { border: "1px dashed var(--accent-line)", color: "var(--accent-ink)", background: "var(--accent-soft)" }
                        }, "+ Taxă nouă")),
                eticheta("S-a achitat?"),
                o.default.createElement(IasPastile, { optiuni: [["school", "Da, la școală"], ["me", "Da, la mine"], ["nu", "Nu \xEEncă"]], valoare: sc.achitat, onAlege: v => b("achitat", v), numeDate: "achitat" }),
                sc.achitat === "nu" ? nota("Suma intră la datoria lui, p\xE2nă treci plata pe fișă.") : null));
    return o.default.createElement("div", { "data-ias-scolarizare-alege": sc.fel || "" },
        o.default.createElement("div", { className: "space-y-1.5" }, IAS_FELURI_SCOLARIZARE.filter(x => !(iasFaraProv && x.id === "provizorie")).map(x => o.default.createElement(o.default.Fragment, { key: x.id },
            o.default.createElement(IasCardAles, {
                ales: sc.fel === x.id, titlu: x.nume, sub: x.sub,
                date: { "data-ias-fel": x.id },
                onClick: () => iasF({ ...sc, fel: x.id, ore: x.id === "partial" || x.id === "provizorie" ? (Number(sc.ore) || 15) : sc.ore })
            }),
            sc.fel === x.id && detalii ? o.default.createElement("div", { className: "px-1 pt-1 pb-3", "data-ias-fel-detalii": x.id }, detalii) : null))))
}

/* Schimbarea școlarizării de pe fișă (sau completarea celei provizorii). */
function IasScolarizareDialog({ elev: iasE, setari: iasS, onClose: iasInchide, onSalveaza: iasSalveaza, onAdaugaTaxa: iasAdaugaTaxa }) {
    let prov = iasProvizoriu(iasE),
        [sc, puneSc] = (0, o.useState)(() => {
            let g = iasScolarizareGoala(iasS), v = iasE && iasE.scolarizare || {};
            return prov ? g : { ...g, ...v, adaugat: void 0, din: void 0 }
        }),
        [err, puneErr] = (0, o.useState)("");
    if (!iasE) return null;
    let veche = iasE.scolarizare, faraUrma = veche && !veche.adaugat;
    return o.default.createElement(oi, {
        open: !0, onClose: iasInchide, layer: Wt.form,
        title: prov ? "Completează școlarizarea" : "Școlarizarea",
        footer: o.default.createElement("div", null,
            err ? o.default.createElement("p", { className: "text-xs mb-2", style: { color: "var(--bad)" } }, err) : null,
            o.default.createElement("div", { className: "flex gap-2.5" },
                o.default.createElement("button", { type: "button", onClick: iasInchide, className: "flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm" }, "Renunță"),
                o.default.createElement("button", {
                    type: "button", "data-ias-scolarizare-salveaza": "",
                    onClick: () => { let l = iasScolarizareLipsa(sc, iasS); l ? puneErr(l) : iasSalveaza(sc) },
                    className: "flex-1 py-3 rounded-xl bg-slate-900 text-white font-medium text-sm"
                }, "Salvează")))
    }, o.default.createElement("p", { className: "text-sm mb-3.5", style: { color: "var(--muted)" } },
        prov ? `Ce a plătit ${Ff(iasE)} la școală? Ce alegi aici ia locul celor ${Number(veche.ore) || 0} ședințe socotite p\xE2nă acum.`
            : veche ? `Acum: ${iasDescriereScolarizare(veche, iasS)}. Ce alegi aici ia locul ei — taxele, orele și plățile puse atunci se retrag.`
                : "Alege cum și-a plătit școlarizarea. Se adaugă peste ce are deja pe fișă."),
        faraUrma ? o.default.createElement("p", { className: "text-xs mb-3", style: { color: "var(--bad)" } }, "Pachetul a fost schimbat din formular, așa că ce s-a pus atunci nu se mai retrage singur. Verifică după aceea orele și plățile.") : null,
        o.default.createElement(IasScolarizareAlege, { sc, setari: iasS, faraProvizorie: prov, onAdaugaTaxa: iasAdaugaTaxa, onSchimba: x => { puneSc(x), puneErr("") } }))
}

/* Pașii elevului nou. */
function IasVrajitor({
    open: iasDeschis,
    setari: iasS,
    elevi: iasElevi = [],
    sesiuni: iasSes = [],
    programElevi: iasProgramPornit,
    onClose: iasInchide,
    onCreeaza: iasCreeaza,
    onFormular: iasFormular,
    onAdaugaLimba: iasAdaugaLimba,
    onAdaugaTaxa: iasAdaugaTaxa,
    onNotifica: iasNotifica,
    onBunVenitTrimis: iasBunTrimis,
    onCereProgram: iasCere,
    onDeschide: iasDeschide,
    poateInca: iasPoateInca = !0
}) {
    let gol = () => ({
            lastName: "", firstName: "", sex: "", phone: "", birthDate: "", area: "", lat: null, lng: null,
            county: iasS && iasS.defaultCounty || "B",
            regNumber: "", group: "", enrollDate: Be(),
            limba: "", english: !1,
            licenseCategory: "B", masina: iasMasinaImplicita(iasS || {}) || "",
            defaultLocation: "", weeklyLimit: Number(iasS && iasS.defaultWeeklyLimit) || 2
        }),
        [d, puneD] = (0, o.useState)(gol),
        [sc, puneSc] = (0, o.useState)(() => iasScolarizareGoala(iasS)),
        [pas, punePas] = (0, o.useState)(0),
        [err, puneErr] = (0, o.useState)(""),
        [cnp, puneCnp] = (0, o.useState)(""),
        [felNastere, puneFelNastere] = (0, o.useState)("cnp"),
        [sexDinCnp, puneSexDinCnp] = (0, o.useState)(!1),
        [loc, puneLoc] = (0, o.useState)(""),
        [facut, puneFacut] = (0, o.useState)(null),
        [trimis, puneTrimis] = (0, o.useState)(!1),
        [intreb, puneIntreb] = (0, o.useState)(!1),
        [laRecap, puneLaRecap] = (0, o.useState)(!1),
        miscare = (0, o.useRef)(null),
        directie = (0, o.useRef)(1);
    (0, o.useEffect)(() => {
        iasDeschis && (puneD(gol()), puneSc(iasScolarizareGoala(iasS)), punePas(0), puneErr(""), puneCnp(""), puneFelNastere("cnp"), puneSexDinCnp(!1), puneLoc(""), puneFacut(null), puneTrimis(!1), puneIntreb(!1), puneLaRecap(!1))
    }, [iasDeschis]);
    /* Pasul nou intră dinspre partea în care mergi. */
    (0, o.useLayoutEffect)(() => {
        let el = miscare.current;
        if (el && el.animate) try {
            el.animate([{ opacity: 0, transform: `translateX(${directie.current * 18}px)` }, { opacity: 1, transform: "none" }], { duration: 240, easing: "cubic-bezier(.2,.9,.3,1)" })
        } catch (x) {}
    }, [pas, !!facut]);
    if (!iasDeschis) return null;
    let b = (k, v) => { puneD(x => ({ ...x, [k]: v })), puneErr("") },
        lei = iasS && iasS.currency || "lei",
        planuri = iasPlanuri(iasS),
        cifre = x => String(x || "").replace(/\D/g, ""),
        acelasiNume = (d.lastName.trim() || d.firstName.trim()) && iasElevi.find(x => !x.withdrawn && `${x.lastName || ""} ${x.firstName || ""}`.trim().toLowerCase() === `${d.lastName.trim()} ${d.firstName.trim()}`.trim().toLowerCase()),
        acelasiTel = cifre(d.phone).length >= 9 && iasElevi.find(x => cifre(x.phone).slice(-9) === cifre(d.phone).slice(-9)),
        citit = iasCitesteCnp(cnp),
        varsta = d.birthDate ? vu(d.birthDate) : null,
        locuri = iasLocuriDesFolosite(iasS && iasS.locations || [], iasSes),
        masini = iasMasini(iasS || {}),
        incluseEstimat = sc.fel === "integral" ? Number((ii(iasS || {}).find(t => t.id === sc.plan) || {}).hours) || 0
            : sc.fel === "partial" || sc.fel === "provizorie" ? Number(sc.ore) || 0
            : sc.fel === "altfel" ? (sc.altfel === "ore" ? (Number(sc.incluse) || 0) + (Number(sc.suplimentare) || 0) : Number((ii(iasS || {}).find(t => t.id === sc.taxa) || {}).hours) || 0) : 0,
        mare = { fontSize: 17, paddingTop: 14, paddingBottom: 14 },
        camp = (eticheta, el) => o.default.createElement(xe, { label: eticheta }, el),
        nota = (t, stil) => o.default.createElement("p", { className: "text-xs mt-2", style: { color: "var(--muted-2)", ...(stil || {}) } }, t),
        atentie = t => o.default.createElement("p", { className: "text-xs mt-2 flex items-start gap-1.5", "data-ias-atentie": "", style: { color: "var(--accent-ink)" } }, o.default.createElement("span", { "aria-hidden": "true" }, "⚠"), t),
        laEnter = q => { q.key === "Enter" && (q.preventDefault(), inainte()) };
    /* ---- pașii ---- */
    let PASI = [{
        id: "nume", grup: "Persoana", titlu: "Cum \xEEl cheamă?",
        sub: "Numele așa cum e \xEEn dosar. \xCEn mesaje folosesc doar primul prenume.",
        lipsa: () => d.lastName.trim() || d.firstName.trim() ? "" : "Scrie măcar numele sau prenumele.",
        rezumat: () => `${d.lastName} ${d.firstName}`.trim(),
        arata: () => o.default.createElement(o.default.Fragment, null,
            camp("Nume de familie", o.default.createElement("input", { className: ie, style: mare, autoCapitalize: "words", autoFocus: !0, "data-ias-v": "lastName", value: d.lastName, placeholder: "Popescu", onChange: q => b("lastName", q.target.value), onKeyDown: laEnter })),
            camp("Prenume", o.default.createElement("input", { className: ie, style: mare, autoCapitalize: "words", "data-ias-v": "firstName", value: d.firstName, placeholder: "Ana Maria", onChange: q => b("firstName", q.target.value), onKeyDown: laEnter })),
            o.default.createElement("span", { className: "block text-xs font-medium text-slate-500 mb-1.5" }, "Adresarea \xEEn mesaje"),
            o.default.createElement(IasPastile, { optiuni: [["m", "„Salut, Andrei!”"], ["f", "„Bună, Ana!”"], ["", "Neutră"]], valoare: d.sex, onAlege: v => { b("sex", v), puneSexDinCnp(!1) }, numeDate: "sex" }),
            nota("Din CNP o pun singur, dacă \xEEl scrii la pasul cu nașterea."),
            acelasiNume ? atentie(`Ai deja un elev cu numele ăsta${acelasiNume.group ? ` (grupa ${acelasiNume.group})` : ""}. Dacă e altcineva, mergi mai departe.`) : null)
    }, {
        id: "telefon", grup: "Persoana", titlu: "Numărul lui de telefon", optional: !0,
        sub: "Pe el \xEEi trimiți mesajele, pe WhatsApp sau SMS.",
        lipsa: () => { let c = cifre(d.phone); return !c || c.length >= 9 ? "" : "Numărul pare incomplet." },
        rezumat: () => d.phone || "",
        arata: () => o.default.createElement(o.default.Fragment, null,
            camp("Telefon", o.default.createElement("input", {
                className: ie, style: { ...mare, letterSpacing: ".04em" },
                type: "text", inputMode: "tel", autoComplete: "off", autoCorrect: "off", spellCheck: !1, name: "ias-numar-elev", autoFocus: !0,
                "data-ias-v": "phone", value: d.phone, placeholder: "07xx xxx xxx", onChange: q => b("phone", q.target.value), onKeyDown: laEnter
            })),
            acelasiTel ? atentie(`Numărul e deja la ${acelasiTel.name}.`) : null,
            nota("\xCEl poți lăsa și pentru mai t\xE2rziu — fără el, doar mesajele nu au unde pleca."))
    }, {
        id: "nastere", grup: "Persoana", titlu: "C\xE2nd s-a născut?", optional: !0,
        sub: "Scrie CNP-ul și scot eu data — sau alege data direct.",
        lipsa: () => felNastere === "cnp" && cnp && !citit.ok ? "CNP-ul nu e bun: " + (citit.motiv || "verifică cifrele") + "." : "",
        rezumat: () => d.birthDate ? `${iasDataLunga(d.birthDate)}${varsta != null ? ` \xB7 ${varsta} ani` : ""}` : "",
        arata: () => o.default.createElement(o.default.Fragment, null,
            o.default.createElement(IasPastile, { optiuni: [["cnp", "Din CNP"], ["data", "Data nașterii"]], valoare: felNastere, onAlege: v => { puneFelNastere(v), puneErr("") }, numeDate: "nastere" }),
            o.default.createElement("div", { style: { marginTop: 14 } }, felNastere === "cnp" ? o.default.createElement(o.default.Fragment, null,
                camp("CNP", o.default.createElement("input", {
                    className: ie, style: { ...mare, letterSpacing: ".08em" }, type: "text", inputMode: "numeric", autoComplete: "off", autoCorrect: "off", spellCheck: !1, name: "ias-cnp-elev", maxLength: 16, autoFocus: !0,
                    "data-ias-v": "cnp", value: cnp, placeholder: "13 cifre",
                    onKeyDown: laEnter,
                    onChange: q => {
                        let t = q.target.value, r = iasCitesteCnp(t);
                        puneCnp(t), puneErr("");
                        /* Adresarea aleasă de tine rămâne; altfel o dă CNP-ul. */
                        r.ok && (puneD(x => ({ ...x, birthDate: r.data, sex: x.sex && !sexDinCnp ? x.sex : r.sex || x.sex })), (!d.sex || sexDinCnp) && puneSexDinCnp(!!r.sex))
                    }
                })),
                citit.ok ? o.default.createElement("div", { className: "rounded-xl px-3.5 py-3 flex items-center gap-2.5", "data-ias-cnp-ok": citit.data, style: { background: "var(--ok-soft)", border: "1px solid var(--ok-line)" } },
                    o.default.createElement("span", { className: "text-lg", style: { color: "var(--ok)" } }, "✓"),
                    o.default.createElement("span", { className: "text-sm", style: { color: "var(--text)" } }, `Născut${citit.sex === "f" ? "ă" : citit.sex === "m" ? "" : "(ă)"} pe ${iasDataLunga(citit.data)}`,
                        vu(citit.data) != null ? ` \xB7 ${vu(citit.data)} ani` : "", citit.sex ? ` \xB7 ${citit.sex === "f" ? "feminin" : "masculin"}` : ""))
                    : cnp && !citit.gol ? o.default.createElement("p", { className: "text-xs", "data-ias-cnp-gresit": "", style: { color: citit.motiv && /mai sunt/.test(citit.motiv) ? "var(--muted-2)" : "var(--bad)" } }, "CNP: ", citit.motiv) : null,
                nota("CNP-ul nu se păstrează \xEEn aplicație: din el răm\xE2n doar data nașterii și adresarea."))
                : camp("Data nașterii", o.default.createElement("input", { type: "date", className: ie, style: mare, "data-ias-v": "birthDate", value: d.birthDate, max: Be(), onChange: q => b("birthDate", q.target.value) }))),
            varsta != null && varsta < 16 ? atentie(`Are ${varsta} ani — verifică data.`) : null)
    }, {
        id: "domiciliu", grup: "Persoana", titlu: "Unde locuiește?", optional: !0,
        sub: "Opțional. Zona \xEEl ajută pe plan să pună unul după altul elevii care stau aproape.",
        lipsa: () => "",
        rezumat: () => [d.area, Fn(d) ? "punct pe hartă" : ""].filter(Boolean).join(" \xB7 "),
        arata: () => o.default.createElement(o.default.Fragment, null,
            camp("Zona sau adresa", o.default.createElement("input", { className: ie, style: mare, autoFocus: !0, "data-ias-v": "area", value: d.area, placeholder: "Ex: Tomis Nord, Km 5, centru", onChange: q => b("area", q.target.value), onKeyDown: laEnter })),
            o.default.createElement("div", { className: "rounded-xl px-3 py-2.5 mb-3.5", style: { border: "1px solid var(--line)", background: "var(--surface)" } },
                o.default.createElement("div", { className: "flex items-center justify-between gap-2" },
                    o.default.createElement("span", { className: "text-xs min-w-0", style: { color: Fn(d) ? "var(--ok)" : "var(--muted)" } }, Fn(d) ? `${d.lat}, ${d.lng}` : "Punct pe hartă — nesetat"),
                    Fn(d) ? o.default.createElement("button", { type: "button", onClick: () => puneD(x => ({ ...x, lat: null, lng: null })), className: "text-xs text-slate-400" }, "Șterge") : null),
                o.default.createElement("button", {
                    type: "button", disabled: loc === "caut",
                    onClick: async () => { puneLoc("caut"); try { let r = await jw(); puneD(x => ({ ...x, lat: r.lat, lng: r.lng })), puneLoc("") } catch (x) { puneLoc(x && x.code === 1 ? "refuzat" : "eroare") } },
                    className: "w-full mt-2 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
                }, o.default.createElement(dn, { size: 13 }), loc === "caut" ? "Caut…" : "Sunt acum acolo"),
                o.default.createElement("input", {
                    className: `${ie} mt-2`, placeholder: "link de hartă, coordonate sau Plus Code",
                    onChange: q => { let r = iasReper(iasS || {}), k = Xw(q.target.value, r[0], r[1]); k && (puneD(x => ({ ...x, lat: k.lat, lng: k.lng })), q.target.value = "", puneLoc("")) }
                }),
                loc === "refuzat" ? o.default.createElement("p", { className: "text-xs mt-1.5", style: { color: "var(--bad)" } }, "Telefonul nu a dat voie la locație.") : loc === "eroare" ? o.default.createElement("p", { className: "text-xs mt-1.5", style: { color: "var(--bad)" } }, "Nu am prins semnalul.") : null),
            camp("Județul (pentru plăcuța de pe fișă)", o.default.createElement("select", { className: ie, value: d.county, onChange: q => b("county", q.target.value) }, Aw.map(x => o.default.createElement("option", { key: x, value: x }, x)))))
    }, {
        id: "dosar", grup: "Dosar", titlu: "Dosarul de la școală", optional: !0,
        sub: "Numărul dosarului, grupa și ziua \xEEnscrierii. Le poți completa și mai t\xE2rziu.",
        lipsa: () => "",
        rezumat: () => [d.regNumber ? "dosar " + d.regNumber : "", d.group ? "grupa " + d.group : "", d.enrollDate ? "\xEEnscris " + qe(d.enrollDate) : ""].filter(Boolean).join(" \xB7 "),
        arata: () => o.default.createElement(o.default.Fragment, null,
            o.default.createElement("div", { className: "grid grid-cols-2 gap-3" },
                camp("Nr. dosar", o.default.createElement("input", { className: ie, style: mare, inputMode: "numeric", autoFocus: !0, "data-ias-v": "regNumber", value: d.regNumber, placeholder: "ex. 1234", onChange: q => b("regNumber", q.target.value), onKeyDown: laEnter })),
                camp("Nr. grupă", o.default.createElement("input", { className: ie, style: mare, "data-ias-v": "group", value: d.group, placeholder: "ex. 12", onChange: q => b("group", q.target.value), onKeyDown: laEnter }))),
            camp("Data \xEEnscrierii", o.default.createElement("input", { type: "date", className: ie, style: mare, value: d.enrollDate, onChange: q => b("enrollDate", q.target.value) })))
    }, {
        id: "limba", grup: "Ședințe", titlu: "\xCEn ce limbă se fac ședințele?",
        sub: "Mesajul de bun venit și cele despre ședințe pleacă \xEEn limba aleasă. Rom\xE2na are tariful obișnuit; celelalte, tariful lor.",
        lipsa: () => "",
        rezumat: () => iasNumeLimba(iasS, d.limba),
        arata: () => o.default.createElement(IasLimbaElev, { limba: d.limba, setari: iasS, onAdauga: iasAdaugaLimba, onAlege: v => puneD(x => iasCuLimba(x, v)) })
    }, {
        id: "categorie", grup: "Ședințe", titlu: "Pentru ce categorie?",
        sub: masini.length > 1 ? "Categoria de permis și mașina cu care \xEEnvață." : "Categoria de permis pentru care se pregătește.",
        lipsa: () => "",
        rezumat: () => `Categoria ${d.licenseCategory}${d.masina && iasMasina(iasS || {}, d.masina) ? ` \xB7 ${iasMasina(iasS || {}, d.masina).nume}` : ""}`,
        arata: () => o.default.createElement(o.default.Fragment, null,
            o.default.createElement("div", { className: "grid grid-cols-4 gap-1.5", "data-ias-categorii": "" }, NA.map(x => {
                let ales = d.licenseCategory === x;
                return o.default.createElement("button", {
                    key: x, type: "button", "aria-pressed": ales, "data-ias-categorie": x,
                    onClick: () => b("licenseCategory", x),
                    className: "rounded-xl py-3 font-mono-time font-semibold",
                    style: { fontSize: x === "B" ? 20 : 15, gridColumn: x === "B" ? "span 2" : void 0, background: ales ? "var(--accent-soft)" : "var(--surface)", color: ales ? "var(--accent-ink)" : "var(--text)", border: `${ales ? 2 : 1}px solid ${ales ? "var(--accent)" : "var(--line)"}` }
                }, x)
            })),
            masini.length > 1 ? o.default.createElement("div", { className: "mt-4" },
                o.default.createElement("span", { className: "block text-xs font-medium text-slate-500 mb-1.5" }, "Mașina lui"),
                o.default.createElement(IasPastile, { optiuni: [["", "Oricare"]].concat(masini.map(m => [m.id, m.nume + (m.cutie === "automata" ? " \xB7 automată" : "")])), valoare: d.masina, onAlege: v => b("masina", v), numeDate: "masina" })) : null)
    }, {
        id: "scolarizare", grup: "Școlarizare", titlu: "Cum și-a plătit școlarizarea?",
        sub: "De aici știe aplicația c\xE2te ședințe are incluse și ce răm\xE2ne de plată.",
        lipsa: () => iasScolarizareLipsa(sc, iasS),
        rezumat: () => iasDescriereScolarizare(sc, iasS),
        arata: () => o.default.createElement(IasScolarizareAlege, { sc, setari: iasS, onAdaugaTaxa: iasAdaugaTaxa, onSchimba: x => { puneSc(x), puneErr("") } })
    }, {
        id: "start", grup: "Programare", titlu: "De unde pornește de obicei?", optional: !0,
        sub: "Locul de \xEEnt\xE2lnire cu care \xEEi pornesc ședințele. \xCEl poți schimba la fiecare ședință.",
        lipsa: () => "",
        rezumat: () => d.defaultLocation || "",
        arata: () => o.default.createElement(o.default.Fragment, null,
            locuri.length ? o.default.createElement("div", { className: "space-y-1.5 mb-3.5", "data-ias-locuri": "" }, locuri.slice(0, 8).map(x => o.default.createElement(IasCardAles, {
                key: x.id, ales: d.defaultLocation === x.name, titlu: x.name, date: { "data-ias-loc": x.name },
                onClick: () => b("defaultLocation", d.defaultLocation === x.name ? "" : x.name)
            }))) : null,
            camp(locuri.length ? "Sau alt loc" : "Locul de start", o.default.createElement("input", { className: ie, style: mare, "data-ias-v": "defaultLocation", value: d.defaultLocation, placeholder: "Punct de \xEEnt\xE2lnire obișnuit", onChange: q => b("defaultLocation", q.target.value), onKeyDown: laEnter })))
    }, {
        id: "ritm", grup: "Programare", titlu: "C\xE2te ședințe pe săptăm\xE2nă?",
        sub: "Planul nu-i pune mai multe dec\xE2t at\xE2tea \xEEntr-o săptăm\xE2nă.",
        lipsa: () => "",
        rezumat: () => `${Number(d.weeklyLimit) || 1} pe săptăm\xE2nă`,
        arata: () => {
            let n = Number(d.weeklyLimit) || 1, sapt = incluseEstimat ? Math.ceil(incluseEstimat / n) : 0;
            return o.default.createElement(o.default.Fragment, null,
                o.default.createElement(IasPasNumar, { valoare: n, min: 1, max: 7, mare: !0, onSchimba: v => b("weeklyLimit", v), eticheta: n === 1 ? "ședință pe săptăm\xE2nă" : "ședințe pe săptăm\xE2nă" }),
                sapt ? o.default.createElement("p", { className: "text-sm text-center mt-4", "data-ias-estimare": sapt, style: { color: "var(--muted)" } }, `Cu ${n} pe săptăm\xE2nă, cele ${incluseEstimat} ședințe ies \xEEn cam `, o.default.createElement("b", { style: { color: "var(--text)" } }, sapt === 1 ? "o săptăm\xE2nă" : `${sapt} săptăm\xE2ni`), ".") : null)
        }
    }, {
        id: "gata", grup: "Gata", titlu: "Totul e bine?",
        sub: "Atinge un r\xE2nd ca să-l schimbi. Examenele, disponibilitatea și agenda le completezi apoi pe fișa lui.",
        lipsa: () => "",
        arata: () => o.default.createElement("div", { className: "rounded-2xl overflow-hidden", "data-ias-recap": "", style: { border: "1px solid var(--line)", background: "var(--surface)" } },
            PASI.slice(0, -1).map((p, k) => {
                let r = p.rezumat ? p.rezumat() : "";
                return o.default.createElement("button", {
                    key: p.id, type: "button", "data-ias-recap-rand": p.id,
                    onClick: () => { directie.current = -1, puneLaRecap(!0), punePas(k), puneErr("") },
                    className: "w-full flex items-center gap-3 px-3.5 py-2.5 text-left",
                    style: { borderTop: k ? "1px solid var(--line)" : "none" }
                }, o.default.createElement("span", { className: "text-xs shrink-0", style: { width: 88, color: "var(--muted-2)" } }, p.scurt || p.titlu.replace(/\?$/, "")),
                    o.default.createElement("span", { className: "text-sm flex-1 min-w-0", style: { color: r ? "var(--text)" : "var(--muted-2)" } }, r || "—"),
                    o.default.createElement(un, { size: 14, className: "shrink-0", style: { color: "var(--muted-2)" } }))
            }))
    }];
    ["Numele", "Telefon", "Nașterea", "Domiciliu", "Dosar", "Limba", "Categoria", "Școlarizare", "Start", "Ritm"].forEach((t, k) => PASI[k].scurt = t);
    let P = PASI[pas], ultim = pas === PASI.length - 1,
        elevul = () => {
            let ln = d.lastName.trim(), fn = d.firstName.trim();
            return {
                ...d, lastName: ln, firstName: fn, name: `${ln} ${fn}`.trim(), phone: d.phone.trim(),
                includedHours: 0, extraHours: 0,
                examDate: "", examAttempts: 0, examResult: "", examPeriod: "",
                theoryExamDate: "", theoryExamAttempts: 0, theoryExamResult: "",
                availFrom: "", availTo: "",
                weeklyLimit: Number(d.weeklyLimit) || 1, notes: ""
            }
        },
        mergiLa = k => { directie.current = k > pas ? 1 : -1, punePas(k), puneErr("") },
        inainte = () => {
            let l = P.lipsa();
            if (l) { puneErr(l); return }
            if (ultim) {
                let el = iasCreeaza(elevul(), sc);
                el && puneFacut(el);
                return
            }
            laRecap ? mergiLa(PASI.length - 1) : mergiLa(pas + 1)
        },
        gol0 = !(d.lastName || d.firstName || d.phone || cnp || d.area || d.regNumber || d.group || sc.fel),
        inchide = () => facut || gol0 ? iasInchide() : puneIntreb(!0);
    /* ---- după ce l-ai adăugat ---- */
    if (facut) {
        let L = iasLimbaDe(facut), mesaj = ik(facut, iasS || {});
        return o.default.createElement(oi, { open: !0, onClose: iasInchide, title: "Elev nou", layer: Wt.form },
            o.default.createElement("div", { ref: miscare, className: "text-center pt-2 pb-1", "data-ias-vrajitor-gata": facut.id },
                o.default.createElement("div", {
                    className: "mb-3 rounded-full flex items-center justify-center text-3xl",
                    style: { margin: "0 auto 12px", width: 64, height: 64, background: "var(--ok-soft)", border: "1px solid var(--ok-line)", color: "var(--ok)" }
                }, "✓"),
                o.default.createElement("div", { className: "text-lg font-semibold", style: { color: "var(--text)" } }, facut.name),
                o.default.createElement("div", { className: "text-sm mt-1", style: { color: "var(--muted)" } }, "e \xEEn lista ta",
                    iasProvizoriu(facut) || sc.fel === "provizorie" ? " — cu școlarizarea de completat" : ""),
                o.default.createElement("div", { className: "flex justify-center mt-3" }, o.default.createElement(Bf, { student: facut, county: facut.county, h: 34 }))),
            o.default.createElement("div", { className: "space-y-2 mt-5" },
                facut.phone ? o.default.createElement("button", {
                    type: "button", "data-ias-vrajitor-bun-venit": L || "ro",
                    onClick: () => { iasNotifica && iasNotifica({ name: facut.name, phone: facut.phone, title: "Trimite mesajul de bun venit", message: mesaj, onTrimis: () => { iasBunTrimis && iasBunTrimis(facut.id), puneTrimis(!0) } }) },
                    className: "w-full py-3 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-1.5",
                    style: { background: trimis ? "var(--ok)" : "var(--invert)" }
                }, o.default.createElement(ai, { size: 15 }), trimis ? "Mesajul de bun venit a plecat" : `Trimite mesajul de bun venit${L ? ` \xB7 ${iasNumeLimba(iasS, L).toLowerCase()}` : ""}`) : null,
                facut.phone && !trimis ? o.default.createElement("div", { className: "rounded-xl px-3.5 py-2.5 text-xs text-left", "data-ias-vrajitor-mesaj": "", style: { whiteSpace: "pre-line", background: "var(--surface-2)", border: "1px solid var(--line)", color: "var(--muted)" } }, mesaj) : null,
                facut.phone && iasProgramPornit && iasCere ? o.default.createElement("button", {
                    type: "button", onClick: () => iasCere(facut),
                    className: "w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium"
                }, "Cere-i disponibilitatea") : null,
                o.default.createElement("button", {
                    type: "button", "data-ias-vrajitor-fisa": "",
                    onClick: () => iasDeschide && iasDeschide(facut.id),
                    className: "w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium"
                }, "Deschide fișa — examene, disponibilitate, agendă"),
                o.default.createElement("div", { className: "flex gap-2" },
                    iasPoateInca && o.default.createElement("button", {
                        type: "button", "data-ias-vrajitor-inca": "",
                        onClick: () => { directie.current = 1, puneD(gol()), puneSc(iasScolarizareGoala(iasS)), punePas(0), puneErr(""), puneCnp(""), puneSexDinCnp(!1), puneFacut(null), puneTrimis(!1), puneLaRecap(!1) },
                        className: "flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium"
                    }, "\xCEncă un elev"),
                    o.default.createElement("button", { type: "button", onClick: iasInchide, className: "flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium" }, "Gata"))))
    }
    return o.default.createElement(oi, {
        open: !0, onClose: inchide, title: "Elev nou", layer: Wt.form,
        footer: o.default.createElement("div", null,
            err ? o.default.createElement("p", { className: "text-xs mb-2", "data-ias-vrajitor-eroare": "", style: { color: "var(--bad)" } }, err) : null,
            o.default.createElement("div", { className: "flex gap-2.5" },
                pas > 0 ? o.default.createElement("button", {
                    type: "button", "data-ias-vrajitor-inapoi": "",
                    onClick: () => mergiLa(laRecap && !ultim ? PASI.length - 1 : pas - 1),
                    className: "py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm"
                }, laRecap && !ultim ? "Rezumat" : "←") : null,
                o.default.createElement("button", {
                    type: "button", "data-ias-vrajitor-inainte": P.id,
                    onClick: inainte,
                    className: "flex-1 py-3 rounded-xl text-white font-medium text-sm",
                    style: { background: ultim ? "var(--ok)" : "var(--invert)" }
                }, ultim ? "Adaugă elevul" : laRecap ? "Gata, \xEEnapoi la rezumat" : P.optional && !(P.rezumat && P.rezumat()) ? "Sari peste" : "Mai departe")))
    },
        /* Unde ești: grupa pasului și câți au rămas. */
        o.default.createElement("div", { className: "mb-4", "data-ias-vrajitor-pas": P.id },
            o.default.createElement("div", { className: "flex items-center justify-between text-xs mb-1.5" },
                o.default.createElement("span", { className: "font-medium uppercase tracking-wide", style: { color: "var(--accent-ink)" } }, P.grup),
                o.default.createElement("span", { className: "font-mono-time", style: { color: "var(--muted-2)" } }, pas + 1, " / ", PASI.length)),
            o.default.createElement("div", { className: "flex gap-1" }, PASI.map((p, k) => o.default.createElement("button", {
                key: p.id, type: "button", "aria-label": p.scurt || p.titlu, tabIndex: -1,
                /* Înapoi poți sări oricând; înainte, doar peste pașii deja trecuți. */
                onClick: () => k < pas && mergiLa(k),
                style: { flex: 1, height: 4, borderRadius: 99, background: k <= pas ? "var(--accent)" : "var(--line)", opacity: k < pas ? .55 : 1, transition: "background .3s" }
            })))),
        o.default.createElement("div", { ref: miscare, key: P.id },
            o.default.createElement("h2", { className: "font-semibold mb-1", style: { fontSize: 22, lineHeight: 1.2, color: "var(--text)" } }, P.titlu),
            o.default.createElement("p", { className: "text-sm mb-4", style: { color: "var(--muted)" } }, P.sub),
            P.arata()),
        pas === 0 && iasFormular ? o.default.createElement("button", {
            type: "button", "data-ias-formular-intreg": "",
            onClick: () => iasFormular({ ...elevul(), pachet: sc.fel === "integral" ? sc.plan : "" }),
            className: "w-full mt-5 py-2 text-xs", style: { color: "var(--muted-2)" }
        }, "Prefer formularul \xEEntreg, pe o singură pagină") : null,
        o.default.createElement(Ri, {
            open: intreb,
            title: "Renunți la elevul nou?",
            message: "Ce ai completat p\xE2nă acum se pierde.",
            confirmLabel: "Renunț",
            danger: !0,
            onConfirm: () => { puneIntreb(!1), iasInchide() },
            onCancel: () => puneIntreb(!1)
        }))
}

function Wk({
    open: n,
    mode: e,
    initial: t,
    defaultWeeklyLimit: a,
    defaultCounty: r,
    locations: i,
    settingsPachete: s,
    currency: l,
    masini: iasLista = [],
    masinaImplicita: iasMasImp = "",
    laExamene: iasLaExamene,
    sesiuni: iasSesiuni = [],
    onCereProgram: iasOnCere,
    programElevi: iasProgramPornit,
    programLucru: iasProgramLucru,
    onAdaugaLimba: iasOnAdaugaLimba,
    onClose: u,
    onSave: d,
    onDelete: f
}) {
    let p = () => ({
            // elevul nou pornește cu mașina ta implicită; o poți schimba aici
            masina: iasMasImp || "",
            name: "",
            lastName: "",
            firstName: "",
            sex: "",
            phone: "",
            regNumber: "",
            group: "",
            licenseCategory: "B",
            county: r || "B",
            area: "",
            birthDate: "",
            includedHours: 0,
            extraHours: 0,
            enrollDate: Be(),
            examDate: "",
            examAttempts: 0,
            examResult: "",
            examPeriod: "",
            theoryExamDate: "",
            theoryExamAttempts: 0,
            theoryExamResult: "",
            weeklyLimit: a,
            availFrom: "",
            availTo: "",
            defaultLocation: "",
            notes: ""
        }),
        [c, m] = (0, o.useState)(p()),
        // cum arăta fișa la deschidere, ca să știm dacă s-a schimbat ceva
        [iasInitial, iasPuneInitial] = (0, o.useState)(""),
        [iasIntreb, iasIntreaba] = (0, o.useState)(!1),
        [g, v] = (0, o.useState)(""),
        [w, x] = (0, o.useState)(!1),
        [h, y] = (0, o.useState)("");
    async function _() {
        y("caut");
        try {
            let S = await jw();
            m(k => ({
                ...k,
                lat: S.lat,
                lng: S.lng
            })), y("")
        } catch (S) {
            y(S && S.code === 1 ? "refuzat" : "eroare")
        }
    }
    if ((0, o.useEffect)(() => {
            if (n)
                if (v(""), x(!1), y(""), e === "edit" && t) {
                    let S = {
                        ...p(),
                        ...t
                    };
                    if (!S.firstName && !S.lastName && S.name) {
                        let k = S.name.trim().split(/\s+/);
                        S.lastName = k[0] || "", S.firstName = k.slice(1).join(" ")
                    }
                    m(S), iasPuneInitial(JSON.stringify(S)), iasIntreaba(!1)
                } else {
                    /* Venit din pașii elevului nou: ce scriseseși acolo e deja aici. */
                    let iasG = { ...p(), ...(t || {}) };
                    m(iasG), iasPuneInitial(JSON.stringify(p())), iasIntreaba(!1)
                }
        }, [n, e, t]), !n) return null;
    /* Închiderea nu mai pierde ce ai scris: dacă s-a schimbat ceva, întreabă. */
    let iasSchimbat = () => iasInitial !== "" && JSON.stringify(c) !== iasInitial,
        iasInchide = () => { iasSchimbat() ? iasIntreaba(!0) : u() };
    let b = (S, k) => m(E => ({
        ...E,
        [S]: k
    }));

    function M() {
        let S = (c.lastName || "").trim(),
            k = (c.firstName || "").trim();
        if (!S && !k) {
            v("Numele \u0219i prenumele sunt obligatorii.");
            return
        }
        d({
            ...c,
            lastName: S,
            firstName: k,
            name: `${S} ${k}`.trim(),
            includedHours: Number(c.includedHours) || 0,
            extraHours: Number(c.extraHours) || 0,
            examAttempts: Number(c.examAttempts) || 0,
            theoryExamAttempts: Number(c.theoryExamAttempts) || 0,
            weeklyLimit: Number(c.weeklyLimit) || 1
        }, e, t)
    }
    return o.default.createElement(oi, {
        open: n,
        onClose: iasInchide,
        title: e === "edit" ? "Editeaz\u0103 elev" : "Adaug\u0103 elev",
        layer: Wt.form,
        footer: o.default.createElement("div", null, g && o.default.createElement("p", {
            className: "text-xs text-red-600 mb-2"
        }, g), o.default.createElement("div", {
            className: "flex gap-2.5"
        }, o.default.createElement("button", {
            onClick: u,
            className: "flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm"
        }, "Renun\u021B\u0103"), o.default.createElement("button", {
            onClick: M,
            className: "flex-1 py-3 rounded-xl bg-slate-900 text-white font-medium text-sm"
        }, e === "edit" ? "Salveaz\u0103 modific\u0103rile" : "Adaug\u0103 elev")))
    }, o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-1 mb-3 text-center"
    }, e === "edit" ? "Actualizezi fi\u0219a unui cursant" : "Creezi fi\u0219a unui nou cursant"),
    o.default.createElement("div", {
        className: "flex justify-center mb-4"
    }, o.default.createElement(Bf, {
        student: {
            ...c,
            id: t && t.id || "nou"
        },
        county: c.county,
        h: 40
    })),
    o.default.createElement(Jn, {
        title: "Persoana",
        summary: (`${(c.lastName || "") + " " + (c.firstName || "")}`.trim() || "necompletat") + (iasLimbaDe(c) ? " \xB7 " + iasNumeLimba(s, iasLimbaDe(c)) : ""),
        defaultOpen: !0
    },
    /* Numele e câmpul cel mai important din fișă, deci stă pe toată lățimea și
       scrie mai mare. Rămân două câmpuri, nu unul: aplicația folosește separat
       prenumele la mesaje („Salut, Ana!"), iar dintr-un singur câmp ar trebui
       ghicit unde se termină numele de familie — la nume compuse s-ar greși. */
    o.default.createElement(xe, {
        label: "Nume de familie",
        required: !0
    }, o.default.createElement("input", {
        className: ie,
        style: { fontSize: 16.5, paddingTop: 13, paddingBottom: 13 },
        autoCapitalize: "words",
        value: c.lastName || "",
        onChange: S => b("lastName", S.target.value),
        placeholder: "Popescu"
    })),
    o.default.createElement(xe, {
        label: "Prenume",
        required: !0
    }, o.default.createElement("input", {
        className: ie,
        style: { fontSize: 16.5, paddingTop: 13, paddingBottom: 13 },
        autoCapitalize: "words",
        value: c.firstName || "",
        onChange: S => b("firstName", S.target.value),
        placeholder: "Ana Maria"
    })),
    /* Mesajul de eroare stă lângă câmpul care lipsește, nu sus, în footer. */
    g && /nume/i.test(g) ? o.default.createElement("p", {
        className: "text-xs -mt-2 mb-3.5",
        style: { color: "var(--bad)" }
    }, g) : null,
    o.default.createElement(xe, {
        label: "Sex"
    }, o.default.createElement("select", {
        className: ie,
        value: c.sex || "",
        onChange: S => b("sex", S.target.value)
    }, o.default.createElement("option", {
        value: ""
    }, "Nespecificat"), o.default.createElement("option", {
        value: "m"
    }, "Masculin"), o.default.createElement("option", {
        value: "f"
    }, "Feminin"))),
    o.default.createElement(IasInfo, {
        text: '\xCEn mesajele c\u0103tre elev se folose\u0219te doar primul prenume, iar adresarea se acord\u0103: \u201ESalut, Andrei!" la b\u0103ie\u021Bi, \u201EBun\u0103, Ana!" la fete. F\u0103r\u0103 men\u021Biune, mesajul r\u0103m\xE2ne neutru.'
    }),
    /* Limba ține de persoană, ca adresarea: stă aici, la vedere, ca s-o alegi
       chiar când îl adaugi — mesajul de bun venit pleacă deja în limba lui. */
    o.default.createElement(xe, {
        label: "Limba \u0219edin\u021Belor"
    }, o.default.createElement(IasLimbaElev, {
        limba: iasLimbaDe(c),
        setari: s,
        onAdauga: iasOnAdaugaLimba,
        onAlege: S => m(E => iasCuLimba(E, S))
    })),
    o.default.createElement(IasInfo, {
        text: "Ședințele lui pornesc în limba asta, iar mesajele către el (bun venit, programări, mutări, anulări) se scriu în ea. Când o schimbi, trec pe ea și ședințele lui de acum înainte încă nefăcute; la o ședință anume o poți schimba din Detalii avansate. La salariu se aplică tariful limbii, din Finanțe → Salariu."
    }),
    o.default.createElement(xe, {
        label: "Telefon"
    }, o.default.createElement("input", {
        className: ie,
        /* Numărul de aici e al elevului, nu al tău. Cu type="tel" și
           autocomplete="tel", iPhone-ul credea că e câmpul tău de telefon: la
           ținut apăsat îți oferea „Completare automată" din agendă, iar
           „Lipire" era împinsă afară din meniu. inputMode ține tastatura cu
           cifre, deci nu pierzi nimic la scris. */
        type: "text",
        inputMode: "tel",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: !1,
        name: "ias-numar-elev",
        value: c.phone,
        onChange: S => b("phone", S.target.value),
        placeholder: "07xx xxx xxx"
    })),
    o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Data na\u0219terii"
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: c.birthDate || "",
        onChange: S => b("birthDate", S.target.value)
    })), o.default.createElement(xe, {
        label: "Jude\u021B (pl\u0103cu\u021B\u0103)"
    }, o.default.createElement("select", {
        className: ie,
        value: c.county || "B",
        onChange: S => b("county", S.target.value)
    }, Aw.map(S => o.default.createElement("option", {
        key: S,
        value: S
    }, S))))),
    o.default.createElement(xe, {
        label: "Zona de domiciliu"
    }, o.default.createElement("input", {
        className: ie,
        value: c.area || "",
        onChange: S => b("area", S.target.value),
        placeholder: "Ex: Tomis Nord, Km 5, centru"
    })),
    o.default.createElement("div", {
        className: "rounded-xl border border-slate-200 bg-white px-3 py-2.5 mb-3.5"
    }, o.default.createElement("div", {
        className: "flex items-center justify-between gap-2"
    }, o.default.createElement("span", {
        className: "text-xs text-slate-500 min-w-0"
    }, Fn(c) ? o.default.createElement("span", {
        className: "font-mono-time",
        style: {
            color: "var(--ok)"
        }
    }, c.lat, ", ", c.lng) : "Punct de domiciliu \u2014 nesetat"), Fn(c) && o.default.createElement("span", {
        className: "flex items-center gap-2 shrink-0"
    }, o.default.createElement("a", {
        href: wu(c, c.area, "dir"),
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
            touchAction: "manipulation"
        },
        "aria-label": "Vezi pe hart\u0103"
    }, o.default.createElement(dn, {
        size: 14,
        style: {
            color: "var(--accent-ink)"
        }
    })), o.default.createElement("button", {
        type: "button",
        onClick: () => {
            b("lat", null), b("lng", null)
        },
        className: "text-xs text-slate-400"
    }, "\u0218terge"))), o.default.createElement("div", {
        className: "flex gap-2 mt-2"
    }, o.default.createElement("button", {
        type: "button",
        onClick: _,
        disabled: h === "caut",
        className: "flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
    }, o.default.createElement(dn, {
        size: 13
    }), h === "caut" ? "Caut\u2026" : "Sunt acum acolo")), o.default.createElement("input", {
        className: `${ie} mt-2`,
        placeholder: "link de hart\u0103, coordonate sau Plus Code",
        onChange: S => {
            /* Reperul pentru codurile scurte vine din locațiile fișei — formularul de
               elev primește lista, nu setările întregi. Scrisesem aici un nume
               care nu există în componenta asta, iar câmpul se oprea la fiecare
               tastă: nu mai primea nici coordonate, nici link, nici Plus Code. */
            let iasR = iasReper({ locations: i }), k = Xw(S.target.value, iasR[0], iasR[1]);
            k && (b("lat", k.lat), b("lng", k.lng), S.target.value = "", y(""))
        }
    }), h === "refuzat" && o.default.createElement("p", {
        className: "text-xs mt-1.5",
        style: {
            color: "var(--bad)"
        }
    }, "Telefonul nu a dat voie la loca\u021Bie."), h === "eroare" && o.default.createElement("p", {
        className: "text-xs mt-1.5",
        style: {
            color: "var(--bad)"
        }
    }, "Nu am prins semnalul."), o.default.createElement("p", {
        className: "text-xs text-slate-400 mt-1.5"
    }, "Aproximativ e destul \u2014 strada lui, nu u\u0219a. \xCEl folose\u0219te planificatorul ca s\u0103 pun\u0103 unul dup\u0103 altul elevii care stau aproape, dar numai dac\u0103 \xEEi ceri asta din fila Plan.")),
    o.default.createElement(IasInfo, {
        text: "Zona te ajut\u0103 s\u0103 grupezi elevii apropia\u021Bi \xEEn aceea\u0219i zi. \xCEn lista de elevi po\u021Bi sorta dup\u0103 oricare dintre cele dou\u0103."
    })),
    o.default.createElement(Jn, {
        title: "Dosar",
        summary: `${c.regNumber ? "nr. " + c.regNumber : "f\u0103r\u0103 num\u0103r"}${c.group ? " \xB7 gr. " + c.group : ""}`
    }, o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Nr. \xEEnregistrare"
    }, o.default.createElement("input", {
        className: ie,
        inputMode: "numeric",
        value: c.regNumber,
        onChange: S => b("regNumber", S.target.value)
    })), o.default.createElement(xe, {
        label: "Grupa"
    }, o.default.createElement("input", {
        className: ie,
        inputMode: "numeric",
        value: c.group || "",
        onChange: S => b("group", S.target.value),
        placeholder: "2 cifre"
    }))),
    /* Omul care vine la perfecționare are deja permisul: nu dă examene, n-are
       școlarizare, n-are nevoie de adeverință. Tot ce-i trebuie e să-l poți
       programa. Bifa asta tace tot ce ține de școală și îl ține în plan. */
    o.default.createElement("button", {
        type: "button",
        onClick: () => b("perfectionare", !c.perfectionare),
        className: "w-full flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left",
        style: {
            background: c.perfectionare ? "var(--accent-soft)" : "var(--surface)",
            border: `${c.perfectionare ? 2 : 1}px solid ${c.perfectionare ? "var(--accent)" : "var(--line)"}`
        }
    },
        o.default.createElement("span", {
            className: "shrink-0 rounded-md flex items-center justify-center",
            style: {
                width: 20, height: 20,
                background: c.perfectionare ? "var(--accent)" : "transparent",
                border: `1.5px solid ${c.perfectionare ? "var(--accent)" : "var(--line-2)"}`,
                color: "#fff", fontSize: 13, fontWeight: 700
            }
        }, c.perfectionare ? "\u2713" : ""),
        o.default.createElement("span", { className: "flex-1 min-w-0" },
            o.default.createElement("span", {
                className: "block text-sm font-medium",
                style: { color: c.perfectionare ? "var(--accent-ink)" : "var(--ink)" }
            }, "Vine la perfec\u021Bionare"),
            o.default.createElement("span", {
                className: "block text-xs", style: { color: "var(--muted-2)" }
            }, "Are deja permisul. F\u0103r\u0103 examene, f\u0103r\u0103 adeverin\u021B\u0103, f\u0103r\u0103 \u0219edin\u021Be obligatorii \u2014 doar ore la volan."))),
    (() => {
        let S = String(c.group || "").trim().toUpperCase() === "OS";
        return o.default.createElement("button", {
            type: "button",
            onClick: () => b("group", S ? "" : "OS"),
            className: "w-full flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 mb-3.5 text-left",
            style: S ? {
                borderColor: "var(--accent-line)",
                background: "var(--accent-soft)"
            } : {
                borderColor: "var(--line)",
                background: "var(--surface)"
            }
        }, o.default.createElement("span", {
            className: "flex items-center justify-center rounded-md shrink-0",
            style: {
                width: 18,
                height: 18,
                border: `1.5px solid ${S?"var(--accent)":"var(--line-2)"}`,
                background: S ? "var(--accent)" : "transparent",
                color: "#3a2100",
                fontSize: 12,
                fontWeight: 900,
                lineHeight: 1
            }
        }, S ? "\u2713" : ""), o.default.createElement("span", {
            className: "text-sm font-medium text-slate-800 flex-1"
        }, "OS \xB7 ore suplimentare"))
    })(),
    o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Categoria de permis"
    }, o.default.createElement("select", {
        className: ie,
        value: c.licenseCategory || "B",
        onChange: S => b("licenseCategory", S.target.value)
    }, NA.map(S => o.default.createElement("option", {
        key: S,
        value: S
    }, S)))), o.default.createElement(xe, {
        label: "Data \xEEnscrierii"
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: c.enrollDate,
        onChange: S => b("enrollDate", S.target.value)
    }))),
    o.default.createElement(xe, {
        label: "Situa\u021Bie"
    }, o.default.createElement("select", {
        className: ie,
        value: c.withdrawn ? "withdrawn" : c.asteptare ? "asteptare" : "active",
        onChange: S => {
            let k = S.target.value;
            b("withdrawn", k === "withdrawn"), b("asteptare", k === "asteptare"), k === "asteptare" && !c.asteptareDin && b("asteptareDin", Be())
        }
    }, o.default.createElement("option", {
        value: "active"
    }, "\xCEn curs"), o.default.createElement("option", {
        value: "asteptare"
    }, "\xCEn a\u0219teptare dup\u0103 examen"), o.default.createElement("option", {
        value: "withdrawn"
    }, "Retras"))),
    o.default.createElement(IasInfo, {
        text: "Un elev retras trece la sf\xE2r\u0219itul listei, nu mai apare la programare \u0219i nu mai intr\u0103 \xEEn plan. Datele lui r\u0103m\xE2n neatinse."
    })),
    o.default.createElement(Jn, {
        title: "\u0218colarizare",
        summary: `${(Number(c.includedHours) || 0) + (Number(c.extraHours) || 0)} \u0219edin\u021Be`
    }, c.scolarizare && c.scolarizare.fel ? o.default.createElement("div", {
        className: "flex items-start gap-2 rounded-xl px-3.5 py-2.5 mb-3.5", "data-ias-form-scolarizare": c.scolarizare.fel,
        style: { background: "var(--surface-2)", border: "1px solid var(--line)" }
    }, iasProvizoriu(c) ? o.default.createElement("span", { className: "shrink-0 mt-0.5" }, o.default.createElement(IasSemnProvizoriu, { size: 16 })) : null,
        o.default.createElement("span", { className: "text-xs flex-1", style: { color: "var(--muted)" } },
            o.default.createElement("b", { style: { color: "var(--text)", fontWeight: 600 } }, iasDescriereScolarizare(c.scolarizare, s)), ". ",
            iasProvizoriu(c) ? "Alege mai jos pachetul pl\u0103tit \u2014 \u0219edin\u021Bele socotite p\xE2n\u0103 acum se \xEEnlocuiesc cu cele din pachet. Sau, de pe fi\u0219\u0103: \u201ECompleteaz\u0103 \u0219colarizarea\u201D." : "Felul \u0219colariz\u0103rii \xEEl schimbi de pe fi\u0219a lui, din r\xE2ndul \u201E\u0218colarizare\u201D.")) : null, (() => {
        let S = ii(s).filter(E => Number(E.hours) > 0);
        if (!S.length) return null;
        let k = S.find(E => E.id === c.pachet);
        return o.default.createElement(o.default.Fragment, null,
            o.default.createElement("span", {
                className: "block text-xs font-medium text-slate-500 mb-1.5"
            }, "Alege pachet"),
            /* Pachetele se aleg din carduri, nu dintr-o listă derulantă: se văd
               deodată prețul, câte ședințe aduc și dacă se achită la școală, așa
               că se pot cântări unul lângă altul. Datele sunt cele din Setări —
               nimic scris de mână aici. */
            o.default.createElement("div", { className: "space-y-1.5 mb-3.5" },
                S.map(E => {
                    let ales = c.pachet === E.id,
                        ore = Number(E.hours) || 0,
                        pret = Number(E.price) || 0;
                    return o.default.createElement("button", {
                        key: E.id, type: "button",
                        /* Atingi pachetul ales din nou și îl scoți; ca să-i pui
                           încă unul la fel — a doua reexaminare, de pildă — ai
                           butonul „încă unul" de dedesubt. */
                        onClick: () => b("pachet", ales ? "" : E.id),
                        className: "w-full text-left rounded-2xl px-3.5 py-3",
                        style: {
                            background: ales ? "var(--accent-soft)" : "var(--surface)",
                            border: `${ales ? 2 : 1}px solid ${ales ? "var(--accent)" : "var(--line)"}`,
                            boxShadow: ales ? "0 2px 12px -6px var(--accent)" : "var(--shadow)"
                        }
                    },
                        (Number((c.fees || {})[E.id]) || 0) > 1
                            ? o.default.createElement("span", {
                                className: "block text-xs mb-1", style: { color: "var(--accent-ink)" }
                            }, "pus de ", Number((c.fees || {})[E.id]) || 0, " ori")
                            : null,
                        o.default.createElement("div", { className: "flex items-baseline gap-2" },
                            o.default.createElement("span", {
                                className: "text-sm font-semibold flex-1 min-w-0 truncate",
                                style: { color: ales ? "var(--accent-ink)" : "var(--text)" }
                            }, E.name),
                            o.default.createElement("span", {
                                className: "font-mono-time text-sm shrink-0",
                                style: { color: ales ? "var(--accent-ink)" : "var(--muted)" }
                            }, pret.toLocaleString("ro-RO"), " ", l)),
                        o.default.createElement("div", {
                            className: "text-xs mt-1", style: { color: "var(--muted-2)" }
                        }, "+", ore, " ", hu(ur(E)),
                            E.laScoala ? " \xB7 achitat la \u0219coal\u0103" : " \xB7 intr\u0103 la datorie"),
                        ales ? o.default.createElement("div", {
                            className: "text-xs font-medium mt-1.5",
                            style: { color: "var(--accent-ink)" }
                        }, "\u2713 ales") : null)
                }),
                /* Al doilea pachet la fel — a doua reexaminare, de pildă.
                   Atingerea cardului doar alege sau scoate pachetul; ca să mai
                   pui unul identic peste cel de acum, ai butonul ăsta. Fără el,
                   reatingeai același card și nu se întâmpla nimic. */
                c.pachet && k ? o.default.createElement("button", {
                    type: "button",
                    onClick: () => b("iasIncaUnPachet", (Number(c.iasIncaUnPachet) || 0) + 1),
                    className: "w-full py-2.5 rounded-xl text-xs font-medium",
                    style: {
                        background: "var(--accent-soft)", color: "var(--accent-ink)",
                        border: "1px dashed var(--accent-line)"
                    }
                }, "+ \xCEnc\u0103 unul la fel (\u201E", k.name, "\u201D)") : null,
                Number(c.iasIncaUnPachet) > 0 ? o.default.createElement("div", {
                    className: "flex items-center gap-2 px-1 pt-1.5"
                },
                    o.default.createElement("span", {
                        className: "text-xs flex-1", style: { color: "var(--accent-ink)" }
                    }, "se mai adaug\u0103 ", Number(c.iasIncaUnPachet), " \xD7 \u201E", k ? k.name : "", "\u201D la salvare"),
                    o.default.createElement("button", {
                        type: "button", onClick: () => b("iasIncaUnPachet", 0),
                        className: "text-xs shrink-0", style: { color: "var(--muted-2)" }
                    }, "renun\u021B\u0103")) : null,
                c.pachet ? o.default.createElement("button", {
                    type: "button", onClick: () => b("pachet", ""),
                    className: "w-full py-2 text-xs", style: { color: "var(--muted-2)" }
                }, "F\u0103r\u0103 pachet acum") : null),
            o.default.createElement("p", {
                className: "text-xs text-slate-400 -mt-2 mb-3.5"
            }, k ? k.laScoala ? `Cei ${(Number(k.price)||0).toLocaleString("ro-RO")} ${l} se trec ca plat\u0103 f\u0103cut\u0103 direct la \u0219coal\u0103 \u2014 nu r\u0103m\xE2ne datorie la tine.` : `Cei ${(Number(k.price)||0).toLocaleString("ro-RO")} ${l} intr\u0103 la datoria lui. Pl\u0103\u021Bile le treci pe fi\u0219a lui, pe m\u0103sur\u0103 ce le \xEEncasezi.` : "Pachetele se stabilesc \xEEn Finan\u021Be \u2192 Taxe. Po\u021Bi alege \u0219i mai t\xE2rziu, de pe fi\u0219a lui."))
    })(),
    o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "\u0218edin\u021Be incluse"
    }, o.default.createElement("input", {
        type: "number",
        min: "0",
        className: ie,
        value: c.includedHours,
        onChange: S => b("includedHours", S.target.value)
    })), o.default.createElement(xe, {
        label: "\u0218edin\u021Be suplimentare"
    }, o.default.createElement("input", {
        type: "number",
        min: "0",
        className: ie,
        value: c.extraHours,
        onChange: S => b("extraHours", S.target.value)
    })))),
    o.default.createElement(Jn, {
        title: "Set\u0103ri programare",
        summary: `${c.defaultLocation || "f\u0103r\u0103 loc fix"} \xB7 ${Number(c.weeklyLimit) || a}/s\u0103pt.`
    }, o.default.createElement(xe, {
        label: "Loca\u021Bie de start implicit\u0103"
    }, o.default.createElement("input", {
        className: ie,
        value: c.defaultLocation || "",
        onChange: S => b("defaultLocation", S.target.value),
        placeholder: "Punct de \xEEnt\xE2lnire obi\u0219nuit (op\u021Bional)"
    })),
    o.default.createElement(nS, {
        locations: i,
        value: c.defaultLocation || "",
        onPick: S => b("defaultLocation", S)
    }),
    o.default.createElement(xe, {
        label: "Limit\u0103 \u0219edin\u021Be/s\u0103pt."
    }, o.default.createElement("input", {
        type: "number",
        min: "1",
        max: "7",
        className: ie,
        value: c.weeklyLimit,
        onChange: S => b("weeklyLimit", S.target.value)
    })),
    /* Cutia nu mai are câmp al ei: o dă mașina. Dacă îi aloci o mașină
       automată, elevul învață pe automată — n-avea rost s-o scrii de două ori,
       ca pe urmă cele două să se bată cap în cap. */
    o.default.createElement("div", {
        className: "grid grid-cols-1"
    },
        o.default.createElement(xe, {
            label: "Ma\u0219ina lui"
        }, o.default.createElement("select", {
            className: ie,
            value: c.masina || "",
            onChange: S => b("masina", S.target.value)
        }, o.default.createElement("option", { value: "" }, "Oricare"),
            iasLista.map(S => o.default.createElement("option", {
                key: S.id, value: S.id
            }, S.nume + (S.cutie ? " \xB7 " + (S.cutie === "automata" ? "automat\u0103" : "manual\u0103") : "")))))),
    o.default.createElement(IasInfo, {
        text: iasLista.length
        ? "Planul \xEEi a\u0219az\u0103 unul dup\u0103 altul pe elevii cu aceea\u0219i ma\u0219in\u0103, ca s\u0103 n-o schimbi de la o \u0219edin\u021B\u0103 la alta."
        : "Ma\u0219inile se adaug\u0103 \xEEn Set\u0103ri \u2192 Ma\u0219inile mele."
    }),
    ),
    o.default.createElement(Jn, {
        title: "Disponibilitate",
        summary: (() => {
            if (c.plecatPana) return `plecat p\xE2n\u0103 pe ${qe(c.plecatPana)}`;
            let iasN = Object.keys(c.dispZile || {}).filter(z => { let r = iasZiuaLui(c, Number(z)); return r && r.fel !== "ca" }).length,
                iasD = Object.keys(c.dispDate || {}).filter(k => k >= Be()).length,
                iasP = [];
            iasN && iasP.push(`${iasN} ${iasN === 1 ? "zi din s\u0103pt\u0103m\xE2n\u0103" : "zile din s\u0103pt\u0103m\xE2n\u0103"}`);
            iasD && iasP.push(`${iasD} ${iasD === 1 ? "dat\u0103 anume" : "date anume"}`);
            if (iasP.length) return iasP.join(" \xB7 ");
            if (c.availFrom || c.availTo) return `${c.availFrom ? Se(Number(c.availFrom)) : "oric\xE2nd"}\u2013${c.availTo ? Se(Number(c.availTo)) : "oric\xE2nd"}`;
            return "oric\xE2nd"
        })()
    },
    /* Programul trimis de elev — doar când e pornit din Setări. */
    iasProgramPornit ? o.default.createElement(IasProgramElev, {
        elev: c,
        poateCere: e === "edit" && !!(t && t.id),
        onCere: () => iasOnCere && iasOnCere({ ...c, id: t.id }),
        onSchimba: iasFn => m(iasF => iasFn(iasF))
    }) : null,
    /* Calendarul: o zi, sau toate zilele de felul ei, cu un gest. A luat
       locul regulii generale, al zilelor bifate, al zilelor care ies din
       tipar, al turei și al zilelor din lună: cele vechi, dacă există, se
       văd sub calendar și planul le respectă în continuare. */
    o.default.createElement(IasDispCalendar, {
        elev: c,
        program: iasProgramLucru,
        onSchimba: iasFn => m(iasF => iasFn(iasF))
    }),
    o.default.createElement(xe, {
        label: "Ritm minim"
    }, o.default.createElement("select", {
        className: ie,
        value: c.minGapDays || 0,
        onChange: S => b("minGapDays", Number(S.target.value))
    }, o.default.createElement("option", {
        value: 0
    }, "F\u0103r\u0103"), o.default.createElement("option", {
        value: 2
    }, "O dat\u0103 la 2 zile"), o.default.createElement("option", {
        value: 3
    }, "O dat\u0103 la 3 zile"), o.default.createElement("option", {
        value: 4
    }, "O dat\u0103 la 4 zile"), o.default.createElement("option", {
        value: 7
    }, "O dat\u0103 pe s\u0103pt\u0103m\xE2n\u0103"))),
    /* Plecat o perioadă: vacanță, deplasare, orice. Bifa deschide intervalul.
       Perioada se dă fie ca dată de întoarcere,
    fie ca număr de zile — cum îți
       spune elevul: „plec de mâine patru zile" sau „lipsesc până pe 14". */
    o.default.createElement("button", {
        type: "button",
        onClick: () => {
            if (c.plecatPana) { b("plecatDin", ""), b("plecatPana", "") }
            else { b("plecatDin", Be()), b("plecatPana", ft(pn(Ue(Be()), 6))) }
        },
        className: "w-full flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 mb-3.5 text-left",
        style: c.plecatPana
            ? { borderColor: "var(--accent-line)", background: "var(--accent-soft)" }
            : { borderColor: "var(--line)", background: "var(--surface)" }
    }, o.default.createElement("span", {
        className: "flex items-center justify-center rounded-md shrink-0",
        style: {
            width: 18, height: 18,
            border: `1.5px solid ${c.plecatPana ? "var(--accent)" : "var(--line-2)"}`,
            background: c.plecatPana ? "var(--accent)" : "transparent",
            color: "#3a2100", fontSize: 12, fontWeight: 900, lineHeight: 1
        }
    }, c.plecatPana ? "\u2713" : ""), o.default.createElement("span", {
        className: "flex-1 min-w-0"
    }, o.default.createElement("span", {
        className: "block text-sm font-medium text-slate-800"
    }, "Indisponibil o perioad\u0103"), o.default.createElement("span", {
        className: "block text-xs text-slate-400"
    }, "Nu apare la programare \u0219i nici \xEEn plan c\xE2t lipse\u0219te."))),
    c.plecatPana ? o.default.createElement(o.default.Fragment, null,
        o.default.createElement("div", { className: "grid grid-cols-2 gap-3" },
            o.default.createElement(xe, { label: "Pleac\u0103 de pe" },
                o.default.createElement("input", {
                    type: "date", className: ie,
                    value: c.plecatDin || Be(),
                    onChange: S => {
                        let k = S.target.value || Be();
                        b("plecatDin", k);
                        if ((c.plecatPana || "") < k) b("plecatPana", k)
                    }
                })),
            o.default.createElement(xe, { label: "Ultima zi lips\u0103" },
                o.default.createElement("input", {
                    type: "date", className: ie,
                    value: c.plecatPana || "",
                    min: c.plecatDin || Be(),
                    onChange: S => b("plecatPana", S.target.value)
                }))),
        o.default.createElement("span", {
            className: "block text-xs font-medium text-slate-500 mb-1.5"
        }, "sau c\xE2te zile lipse\u0219te"),
        o.default.createElement("div", { className: "flex gap-1.5 mb-2" },
            [2, 3, 4, 7, 14].map(zile => {
                let din = c.plecatDin || Be(),
                    pana = ft(pn(Ue(din), zile - 1)),
                    ales = c.plecatPana === pana;
                return o.default.createElement("button", {
                    key: zile, type: "button",
                    onClick: () => b("plecatPana", pana),
                    className: `flex-1 py-2 rounded-xl text-xs font-medium border ${ales ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200"}`
                }, zile, " zile")
            })),
        o.default.createElement("p", {
            className: "text-xs mb-3.5",
            style: { color: "var(--accent-ink)" }
        }, `Revine \u0219i reapare \xEEn liste pe ${qe(ft(pn(Ue(c.plecatPana), 1)))}.`)
    ) : null),
    o.default.createElement(Jn, {
        /* Steluța pe rândul „Examene" spune de unde vine semnul de pe nume și
           unde ai de umblat, dacă vrei s-o faci singur. */
        title: "Examene",
        /* Semnul stă în colțul din stânga sus al rândului, nu lipit de cuvânt:
           se vede ca înștiințare, nu ca parte din titlu. */
        semn: iasAsteaptaSala(t, iasSesiuni, s) ? o.default.createElement(IasSemnNou, { size: 13 }) : null,
        forteaza: !!iasLaExamene,
        summary: c.examDate ? qe(c.examDate)
            : iasAsteaptaSala(t, iasSesiuni, s) ? "gata de teoretic" : "neprogramat"
    }, o.default.createElement(IasFile, {
        etichete: ["Practic", "Teoretic"],
        dela: iasLaExamene ? 1 : 0,
        copii: [o.default.createElement("div", null, o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Data"
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: c.examDate,
        onChange: S => b("examDate", S.target.value)
    })), o.default.createElement(xe, {
        label: "Nr. sus\u021Bineri"
    }, o.default.createElement("input", {
        type: "number",
        min: "0",
        className: ie,
        value: c.examAttempts,
        onChange: S => b("examAttempts", S.target.value)
    }))), o.default.createElement(xe, {
        label: "Perioada zilei"
    }, o.default.createElement("select", {
        className: ie,
        value: c.examPeriod || "",
        onChange: S => b("examPeriod", S.target.value)
    }, o.default.createElement("option", {
        value: ""
    }, "Nespecificat\u0103"), o.default.createElement("option", {
        value: "am"
    }, "Diminea\u021B\u0103 \xB7 ", Se(ha.am.start), "\u2013", Se(ha.am.end)), o.default.createElement("option", {
        value: "pm"
    }, "Dup\u0103-amiaz\u0103 \xB7 ", Se(ha.pm.start), "\u2013", Se(ha.pm.end)))), o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3.5"
    }, "\xCEn acest interval ma\u0219ina e la examen \u2014 calendarul te avertizeaz\u0103 dac\u0103 programezi \u0219edin\u021Be peste el."), o.default.createElement(xe, {
        label: "Rezultat"
    }, o.default.createElement("select", {
        className: ie,
        value: c.examResult || "",
        onChange: S => b("examResult", S.target.value)
    }, o.default.createElement("option", {
        value: ""
    }, "Nesus\u021Binut / \xEEn a\u0219teptare"), o.default.createElement("option", {
        value: "promovat"
    }, "Promovat"), o.default.createElement("option", {
        value: "respins"
    }, "Respins"))), o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2"
    }, "Aici treci situa\u021Bia de p\xE2n\u0103 acum, exact cum e \u2014 nimic nu se calculeaz\u0103 automat. Rezultatul unui examen nou se noteaz\u0103 de pe fi\u0219a elevului.")), o.default.createElement("div", null, o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Data"
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: c.theoryExamDate || "",
        onChange: S => b("theoryExamDate", S.target.value)
    })),
    /* Ora examenului teoretic. Nu ocupă mașina și nu schimbă nimic la
       programare — doar o vezi scrisă, iar în calendar se colorează intervalul
       în care cade. */
    o.default.createElement(xe, {
        label: "Ora"
    }, o.default.createElement("select", {
        className: ie,
        value: c.theoryExamOra == null ? "" : c.theoryExamOra,
        onChange: S => b("theoryExamOra", S.target.value === "" ? "" : Number(S.target.value))
    }, o.default.createElement("option", { value: "" }, "nestabilit\u0103"),
        mu.map(L => o.default.createElement("option", { key: L, value: L }, Se(L))))),
    o.default.createElement(xe, {
        label: "Nr. sus\u021Bineri"
    }, o.default.createElement("input", {
        type: "number",
        min: "0",
        className: ie,
        value: c.theoryExamAttempts,
        onChange: S => b("theoryExamAttempts", S.target.value)
    }))), o.default.createElement(xe, {
        label: "Rezultat"
    }, o.default.createElement("select", {
        className: ie,
        value: c.theoryExamResult || "",
        onChange: S => b("theoryExamResult", S.target.value)
    }, o.default.createElement("option", {
        value: ""
    }, "Nesus\u021Binut / \xEEn a\u0219teptare"), o.default.createElement("option", {
        value: "promovat"
    }, "Promovat"), o.default.createElement("option", {
        value: "respins"
    }, "Respins"))))]
    })),
    o.default.createElement(Jn, {
        title: "Agend\u0103",
        summary: `${(c.reminders || []).length} memento \xB7 ${iasNotite(c).length} noti\u021Be`
    }, o.default.createElement("span", {
        className: "block text-xs font-medium text-slate-500 mb-1.5"
    }, "Mementouri"), o.default.createElement("div", {
        className: "space-y-2 mb-2"
    }, (c.reminders || []).map((S, k) => o.default.createElement("div", {
        key: S.id || k,
        className: "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
    }, o.default.createElement("div", {
        className: "flex items-center gap-2 mb-2"
    }, o.default.createElement("span", {
        className: "text-xs text-slate-500 shrink-0"
    }, "La \u0219edin\u021Ba nr."), o.default.createElement("input", {
        type: "number",
        min: "1",
        inputMode: "numeric",
        className: `${ie} text-center`,
        style: {
            flex: "0 0 58px",
            width: 58,
            paddingLeft: 6,
            paddingRight: 6
        },
        placeholder: "\u2014",
        value: S.atSession,
        onChange: E => b("reminders", (c.reminders || []).map((B, $) => $ === k ? {
            ...B,
            atSession: E.target.value
        } : B))
    }), o.default.createElement("button", {
        type: "button",
        onClick: () => b("reminders", (c.reminders || []).filter((E, B) => B !== k)),
        className: "ml-auto p-2 -mr-1 text-slate-400 shrink-0"
    }, o.default.createElement(pa, {
        size: 15
    }))), o.default.createElement("input", {
        className: ie,
        style: {
            minWidth: 0
        },
        placeholder: "Ex: simulare de examen",
        value: S.text,
        onChange: E => b("reminders", (c.reminders || []).map((B, $) => $ === k ? {
            ...B,
            text: E.target.value
        } : B))
    })))), o.default.createElement("button", {
        type: "button",
        onClick: () => b("reminders", [...c.reminders || [], {
            id: Vt("rem"),
            atSession: "",
            text: ""
        }]),
        className: "w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
    }, o.default.createElement(cn, {
        size: 14
    }), "Memento nou"), o.default.createElement(IasInfo, {
        text: "Alegi a c\xE2ta \u0219edin\u021B\u0103 a elevului \u0219i scrii mesajul. \xCE\u021Bi apare pe Acas\u0103 \xEEn ziua acelei \u0219edin\u021Be \u0219i r\u0103m\xE2ne p\xE2n\u0103 o marchezi ca efectuat\u0103."
    }),
    o.default.createElement("div", { className: "mt-3" }, o.default.createElement("span", {
        className: "block text-xs font-medium text-slate-500 mb-1.5"
    }, "Noti\u021Be"), o.default.createElement(IasNotite, {
        notite: iasNotite(c),
        onChange: iasL => b("notite", iasL)
    }))),
    /* Rezumatul cursului, împrospătat pe măsură ce completezi. Numerele nu sunt
       scrise de mână nicăieri: ședințele incluse și cele suplimentare vin din
       câmpurile de mai sus, iar cele din pachet se adaugă la salvare, exact cum
       face aplicația de când există — de aceea le arătăm separat, ca să se vadă
       cu ce rămâne elevul. */
    (() => {
        let iasP = ii(s).filter(x => Number(x.hours) > 0).find(x => x.id === c.pachet),
            iasInc = Number(c.includedHours) || 0,
            iasSup = Number(c.extraHours) || 0,
            /* Ședințele din pachet se adaugă o singură dată, la înscriere. La
               editare ele sunt deja în „ședințe incluse", așa că adunându-le
               iar ieșeau de două ori — 17 deveneau 34. */
            /* Ședințele din pachet se adaugă doar când pachetul e nou ales.
               La un elev care îl are deja, ele sunt în „ședințe incluse", așa
               că adunându-le iar ieșeau de două ori — 17 deveneau 34. */
            iasPachetNou = c.pachet && c.pachet !== (t && t.pachet),
            iasDin = (iasP && iasPachetNou) ? Number(iasP.hours) || 0 : 0,
            /* Provizoriu completat din formular: orele socotite până acum
               pleacă, pachetul le ia locul. */
            iasPleaca = iasPachetNou && iasProvizoriu(t) ? Math.min(iasInc, Number(t.scolarizare.ore) || 0) : 0;
        iasInc -= iasPleaca;
        let iasTotal = iasInc + iasSup + iasDin;
        if (!iasTotal && !iasP) return null;
        let iasRand = (et, val, tare) => o.default.createElement("div", {
            key: et, className: "flex items-baseline justify-between py-1"
        }, o.default.createElement("span", {
            className: "text-xs", style: { color: "var(--muted-2)" }
        }, et), o.default.createElement("span", {
            className: tare ? "font-mono-time text-base font-semibold" : "font-mono-time text-sm",
            style: { color: tare ? "var(--accent-ink)" : "var(--text)" }
        }, val));
        return o.default.createElement("div", {
            className: "rounded-2xl px-4 py-3.5 mb-3.5",
            style: { background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }
        },
            o.default.createElement("div", {
                className: "text-xs font-medium uppercase tracking-wide mb-1.5",
                style: { color: "var(--accent-ink)" }
            }, "Rezumat curs"),
            iasP ? iasRand("Pachet", iasP.name) : null,
            iasInc ? iasRand("\u0218edin\u021Be incluse", iasInc) : null,
            iasSup ? iasRand("\u0218edin\u021Be suplimentare", iasSup) : null,
            iasDin ? iasRand("Din pachet", "+" + iasDin) : null,
            o.default.createElement("div", {
                style: { borderTop: "1px solid var(--accent-line)", marginTop: 6, paddingTop: 4 }
            }, iasRand("Total", iasTotal + " \u0219edin\u021Be", !0)),
            c.enrollDate ? o.default.createElement("div", {
                className: "text-xs mt-1.5", style: { color: "var(--muted-2)" }
            }, "\xCEnscris pe ", qe(c.enrollDate)) : null)
    })(),
    e === "edit" && o.default.createElement("button", {
        onClick: () => x(!0),
        className: "w-full text-center text-xs text-red-500 py-2"
    }, "\u0218terge elevul"),
    o.default.createElement(IasIntrebare, {
        open: iasIntreb,
        onSalveaza: () => { iasIntreaba(!1), M() },
        onRenunta: () => { iasIntreaba(!1), u() },
        onInapoi: () => iasIntreaba(!1)
    }), o.default.createElement(Ri, {
        open: w,
        title: "\u0218tergi elevul?",
        message: "Se vor \u0219terge \u0219i toate \u0219edin\u021Bele acestui elev. Ac\u021Biunea nu poate fi anulat\u0103.",
        confirmLabel: "\u0218terge",
        danger: !0,
        onConfirm: () => {
            x(!1), f(t.id)
        },
        onCancel: () => x(!1)
    }))
}

/* ============== BORDUL FIȘEI DE ELEV ==============
   Fișa arăta ca un teanc de cartonașe puse unul sub altul: toate la fel de
   apăsate, deci niciunul nu ieșea în față. Am făcut-o să semene cu un bord: sus
   omul și drumul lui, apoi cadranul cu cât a parcurs, iar dedesubt restul, în
   panouri mai ușoare.

   Culorile rămân cele cu care te-ai obișnuit — chihlimbariu și verde — ca să nu
   fie nevoie să înveți nimic din nou. */

/* Cadranul de progres: un inel care se umple cât a făcut elevul din orele lui.
   E desenat din două arce, nu dintr-o imagine, deci rămâne curat la orice
   mărime de ecran. */
function IasCadran({ facute: iasF, total: iasT, size: iasS = 92 }) {
    var tot = Math.max(0, Number(iasT) || 0),
        fac = Math.max(0, Math.min(tot, Number(iasF) || 0)),
        parte = tot ? fac / tot : 0,
        raza = (iasS - 12) / 2,
        contur = 2 * Math.PI * raza,
        gata = parte >= 1;
    return o.default.createElement("div", {
        style: { position: "relative", width: iasS, height: iasS, flexShrink: 0 }
    },
        o.default.createElement("svg", {
            width: iasS, height: iasS, viewBox: `0 0 ${iasS} ${iasS}`,
            style: { transform: "rotate(-90deg)", display: "block" }
        },
            o.default.createElement("circle", {
                cx: iasS / 2, cy: iasS / 2, r: raza, fill: "none",
                stroke: "var(--line)", strokeWidth: 8
            }),
            o.default.createElement("circle", {
                cx: iasS / 2, cy: iasS / 2, r: raza, fill: "none",
                stroke: gata ? "var(--ok)" : "var(--accent)",
                strokeWidth: 8, strokeLinecap: "round",
                strokeDasharray: contur,
                strokeDashoffset: contur * (1 - parte),
                style: { transition: "stroke-dashoffset .5s cubic-bezier(.2,.9,.3,1)" }
            })),
        o.default.createElement("div", {
            style: {
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center", flexDirection: "column"
            }
        }, o.default.createElement("span", {
            className: "font-mono-time font-semibold",
            style: { fontSize: iasS * .23, color: gata ? "var(--ok)" : "var(--accent-ink)", lineHeight: 1 }
        }, Math.round(parte * 100), "%"))
    )
}

/* Fâșia de drum din capul fișei: un apus desenat din culorile aplicației, cu
   linia de mijloc care se pierde în zare. Nu e o poză — sunt câteva forme, deci
   nu adaugă nimic de descărcat și arată la fel pe orice ecran. */
function IasFasieDrum({ inaltime: iasH = 92 }) {
    return o.default.createElement("div", {
        "aria-hidden": "true",
        style: {
            position: "absolute", left: 0, right: 0, top: 0, height: iasH,
            overflow: "hidden", pointerEvents: "none", opacity: .5
        }
    }, o.default.createElement("svg", {
        viewBox: "0 0 400 92", preserveAspectRatio: "none",
        style: { width: "100%", height: "100%", display: "block" }
    },
        o.default.createElement("defs", null,
            o.default.createElement("linearGradient", { id: "iasCer", x1: "0", y1: "0", x2: "0", y2: "1" },
                o.default.createElement("stop", { offset: "0%", stopColor: "var(--accent)", stopOpacity: ".30" }),
                o.default.createElement("stop", { offset: "100%", stopColor: "var(--accent)", stopOpacity: "0" }))),
        o.default.createElement("rect", { x: 0, y: 0, width: 400, height: 92, fill: "url(#iasCer)" }),
        o.default.createElement("path", {
            d: "M0 92 L165 34 L235 34 L400 92 Z", fill: "var(--line)", opacity: ".55"
        }),
        o.default.createElement("path", {
            d: "M196 92 L199 34 L201 34 L204 92 Z", fill: "var(--accent)", opacity: ".5"
        })))
}

function qk({
    open: n,
    student: e,
    sessions: t,
    settings: a,
    onClose: r,
    onEdit: i,
    onAddSession: s,
    onOpenSession: l,
    onNotify: u,
    onAddPayment: d,
    onEditPayment: f,
    onSetReexamCount: p,
    onRecordExam: c,
    onExportStudent: m,
    poateTransfera: g,
    onElibereazaAdeverinta: v,
    onBunVenitTrimis: w,
    laExamene: iasVreaExamene,
    onExameneDeschis: iasDuLaExamene,
    onLimba: iasPuneLimba,
    onAdaugaLimba: iasAdaugaLimba,
    onCompleteaza: iasCompleteaza
}) {
    let [x, h] = (0, o.useState)(!1);
    /* Venit din înștiințarea „gata de sală": fișa nu se oprește aici, ci trece
       mai departe la formular, cu secțiunea Examene desfăcută. Acolo îi pui
       data, fără să mai umbli prin fișă. */
    (0, o.useEffect)(() => {
        if (n && e && iasVreaExamene && iasDuLaExamene) {
            let iasT = setTimeout(() => iasDuLaExamene(), 120);
            return () => clearTimeout(iasT)
        }
    }, [n, e, iasVreaExamene]);
    if (!n || !e) return null;
    let y = iasImpartire(e, t, a).total,
        _ = S0(t, e.id),
        b = Math.max(0, Af(t, e.id) - _),
        M = Math.max(0, y - _),
        S = Bw(e, t),
        k = jA(e, t, a),
        E = WA(t, e.id),
        B = Ow(e, t, a),
        $ = M0(e),
        G = B - $,
        A = [...e.payments || []].sort((R, K) => (K.date || "").localeCompare(R.date || "")),
        O = t.filter(R => R.studentId === e.id).sort((R, K) => (K.date + Se(K.startMin)).localeCompare(R.date + Se(R.startMin))),
        N = t.filter(R => R.studentId === e.id && (R.status === "scheduled" || R.status === "pending") && R.date >= Be()).sort((R, K) => (R.date + Se(R.startMin)).localeCompare(K.date + Se(K.startMin))),
        C = [...new Set(N.map(R => R.location).filter(Boolean))].map(R => ({
            n: R,
            link: $w(xo(a, R), R)
        })).filter(R => R.link),
        W = C.length === 0 ? "" : C.length === 1 ? `
Locul: ${C[0].link}` : `
${C.map(R=>`${R.n}: ${R.link}`).join(`
`)}`,
        X = iasLimbaDe(e) ? iasListaStrain(iasLimbaDe(e), e, N, a, W) : `${_0(e).salut}, ${Ff(e)}! \u0218edin\u021Bele tale de conducere programate:
${N.map(R=>`\u2022 ${fo(R.date)}, ${Se(R.startMin)}\u2013${Se(R.startMin+or(R,a))}${R.location?` \xB7 ${R.location}`:""}`).join(`
`)}${W}
Te rog confirm\u0103. Mul\u021Bumesc!`;
    return o.default.createElement(oi, {
        open: n,
        onClose: r,
        title: e.name
    }, o.default.createElement("div", {
        className: "relative -mx-5 -mt-4 px-5 pt-5 pb-3 mb-4",
        style: { overflow: "hidden" }
    }, o.default.createElement(IasFasieDrum, { inaltime: 104 }),
        o.default.createElement("div", { className: "relative" }, o.default.createElement("div", {
        className: "flex items-center gap-2 mb-4 flex-wrap"
    }, o.default.createElement(Lf, {
        student: e,
        size: 18,
                sesiuni: n.sessions,
                setari: n.settings
            }), o.default.createElement(Bf, {
        student: e,
        county: e.county,
        h: 28
    }), o.default.createElement("span", {
        className: "text-xs font-medium px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600 border-slate-200"
    }, "Cat. ", e.licenseCategory || "B"), e.group && o.default.createElement("span", {
        className: "text-xs font-medium px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600 border-slate-200"
    }, "Grupa ", e.group), o.default.createElement("span", {
        className: `text-xs font-medium px-2 py-0.5 rounded-full border ${S==="nou"?"bg-amber-50 text-amber-700 border-amber-200":"bg-blue-50 text-blue-700 border-blue-200"}`
    }, S === "nou" ? "Elev nou" : "\xCEn curs"), iasPuneLimba && o.default.createElement(IasLimbaElev, {
        limba: iasLimbaDe(e),
        setari: a,
        mic: !0,
        onAdauga: iasAdaugaLimba,
        onAlege: iasV => iasV !== iasLimbaDe(e) && iasPuneLimba(e.id, iasV)
    }), e.phone && o.default.createElement(tS, {
        phone: e.phone
    })))),
    e.examResult === "promovat" && o.default.createElement("div", {
        className: "relative overflow-hidden rounded-xl px-3.5 py-3.5 mb-4 text-center",
        style: {
            backgroundImage: "linear-gradient(180deg, var(--ok-soft), transparent 75%)",
            border: "1px solid var(--ok-line)"
        }
    }, o.default.createElement(T0, null), o.default.createElement("div", {
        className: "relative"
    }, o.default.createElement("div", {
        className: "font-display text-xl uppercase tracking-wide",
        style: {
            color: "var(--ok)"
        }
    }, "Permis luat!"), o.default.createElement("div", {
        className: "text-xs text-slate-500 mt-0.5"
    }, "Examen practic promovat", e.examDate ? ` \xB7 ${qe(e.examDate)}` : "", Number(e.examAttempts) > 0 ? ` \xB7 din ${Number(e.examAttempts)} ${Number(e.examAttempts)===1?"sus\u021Binere":"sus\u021Bineri"}` : ""))),
    ho(e) && (() => {
        let R = Dw(e),
            K = R.ramase === 0;
        return o.default.createElement("div", {
            className: "rounded-xl px-3.5 py-3 mb-4",
            style: K ? {
                background: "var(--ok-soft)",
                border: "1px solid var(--ok-line)"
            } : {
                background: "var(--accent-soft)",
                border: "1px solid var(--accent-line)"
            }
        }, o.default.createElement("div", {
            className: "text-sm font-medium",
            style: {
                color: K ? "var(--ok)" : "var(--accent-ink)"
            }
        }, K ? "Poate primi adeverin\u021Ba" : "\xCEn a\u0219teptare dup\u0103 examen"), o.default.createElement("div", {
            className: "text-xs text-slate-500 mt-0.5 mb-2.5"
        }, e.asteptareDin ? `Examen picat pe ${qe(e.asteptareDin)}. ` : "", K ? `Au trecut ${R.trecute} zile. Elibereaz\u0103 adeverin\u021Ba ca s\u0103-l po\u021Bi programa din nou.` : `Au trecut ${R.trecute} din ${wf} zile \u2014 mai sunt ${R.ramase}. P\xE2n\u0103 atunci nu apare \xEEn plan \u0219i nici la programare.`), o.default.createElement("button", {
            onClick: () => v(e.id),
            className: "w-full py-2.5 rounded-xl text-white text-sm font-medium",
            style: {
                background: K ? "var(--ok)" : "var(--invert)"
            }
        }, "Am eliberat adeverin\u021Ba"))
    })(),
    !ho(e) && e.adeverintaDin && (() => {
        let R = UA(e, t);
        /* Dacă i-ai prins deja o dată de examen care n-a trecut încă, anunțul
           n-are ce să-ți mai spună: reprogramarea s-a făcut. Rămâne doar cât
           timp elevul chiar așteaptă o dată. */
        if ((e.examDate || "") >= Be()) return null;
        return R >= vf ? null : o.default.createElement("div", {
            className: "rounded-xl px-3.5 py-3 mb-4",
            style: {
                background: "var(--surface-2)",
                border: "1px solid var(--line)"
            }
        }, o.default.createElement("div", {
            className: "text-sm font-medium text-slate-800"
        }, "\u0218edin\u021Be obligatorii dup\u0103 adeverin\u021B\u0103"), o.default.createElement("div", {
            className: "text-xs text-slate-500 mt-0.5 mb-2"
        }, R, " din ", vf, " efectuate de la ", qe(e.adeverintaDin), ". Abia dup\u0103 ele poate fi reprogramat la examen."), o.default.createElement(Cf, {
            value: R / vf * 100
        }))
    })(),
    o.default.createElement("div", {
        className: "rounded-2xl px-4 py-4 mb-3",
        style: { background: "var(--surface-2)", border: "1px solid var(--line)" }
    },
        o.default.createElement("div", { className: "flex items-center gap-4" },
            o.default.createElement(IasCadran, { facute: _, total: y, size: 92 }),
            o.default.createElement("div", { className: "flex-1 min-w-0" },
                o.default.createElement("div", { className: "flex items-baseline gap-1.5" },
                    o.default.createElement("span", {
                        className: "font-mono-time text-2xl font-semibold text-slate-900"
                    }, _),
                    o.default.createElement("span", {
                        className: "font-mono-time text-base", style: { color: "var(--muted-2)" }
                    }, "/ ", y)),
                o.default.createElement("div", {
                    className: "text-xs", style: { color: "var(--muted-2)" }
                }, "\u0219edin\u021Be efectuate"),
                o.default.createElement("div", {
                    className: "mt-2 rounded-full overflow-hidden",
                    style: { height: 5, background: "var(--line)" }
                }, o.default.createElement("div", {
                    style: {
                        height: "100%", width: `${y ? Math.round(_ / y * 100) : 0}%`,
                        background: _ >= y && y ? "var(--ok)" : "var(--accent)",
                        transition: "width .5s cubic-bezier(.2,.9,.3,1)"
                    }
                })),
                o.default.createElement("div", {
                    className: "font-mono-time text-sm mt-2",
                    style: { color: M > 0 ? "var(--accent-ink)" : "var(--ok)" }
                }, M > 0 ? `${M} r\u0103mase` : "toate f\u0103cute"))),
        /* Ședința nouă stă chiar lângă numărul de ore: e fapta care urmează
           firesc după ce te-ai uitat câte au mai rămas. */
        o.default.createElement("div", { className: "mt-3" }, o.default.createElement("div", {
        className: "flex gap-2 mb-2.5"
    }, o.default.createElement("button", {
        onClick: i,
        className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-1.5"
    }, o.default.createElement(ka, {
        size: 14
    }), "Editeaz\u0103"), o.default.createElement("button", {
        /* Plata, sus, lângă celelalte două: deschide aceeași fereastră ca
           butonul din cardul cu banii. */
        onClick: () => h(!0),
        "aria-label": "Trece o plat\u0103",
        "data-ias-plata-sus": "",
        className: "shrink-0 rounded-xl border border-slate-200 text-slate-700 flex items-center justify-center",
        style: { width: 48, minHeight: 44, borderRadius: 99 }
    }, o.default.createElement(Bi, {
        size: 17
    })), o.default.createElement("button", {
        onClick: s,
        className: "flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium flex items-center justify-center gap-1.5"
    }, o.default.createElement(cn, {
        size: 14
    }), "\u0218edin\u021B\u0103 nou\u0103")))),
    /* Școlarizarea: provizorie, cu îndemnul de completat; altfel, un rând de
       unde o schimbi. Elevii adăugați înainte de pași n-au rândul. */
    iasProvizoriu(e) ? o.default.createElement("div", {
        className: "rounded-2xl px-3.5 py-3 mb-3", "data-ias-fisa-provizorie": "",
        style: { background: "color-mix(in srgb, #f5c400 14%, var(--surface))", border: "1px solid color-mix(in srgb, #f5c400 55%, var(--line))" }
    }, o.default.createElement("div", { className: "flex items-start gap-2.5" },
        o.default.createElement("span", { className: "shrink-0 mt-0.5" }, o.default.createElement(IasSemnProvizoriu, { size: 22 })),
        o.default.createElement("div", { className: "flex-1 min-w-0" },
            o.default.createElement("div", { className: "text-sm font-medium", style: { color: "var(--text)" } }, "\u0218colarizare provizorie"),
            o.default.createElement("div", { className: "text-xs mt-0.5", style: { color: "var(--muted)" } }, "\xCEnc\u0103 nu \u0219tii ce a pl\u0103tit la \u0219coal\u0103. P\xE2n\u0103 atunci socotesc ", Number(e.scolarizare.ore) || 0, " \u0219edin\u021Be incluse."))),
        iasCompleteaza ? o.default.createElement("button", {
            type: "button", "data-ias-completeaza": "",
            onClick: () => iasCompleteaza(e.id),
            className: "w-full mt-2.5 py-2.5 rounded-xl text-white text-sm font-medium",
            style: { background: "var(--invert)" }
        }, "Completeaz\u0103 \u0219colarizarea") : null)
    : e.scolarizare && e.scolarizare.fel && iasCompleteaza ? o.default.createElement("button", {
        type: "button", "data-ias-fisa-scolarizare": e.scolarizare.fel,
        onClick: () => iasCompleteaza(e.id),
        className: "w-full flex items-center gap-2 rounded-xl px-3.5 py-2.5 mb-3 text-left",
        style: { background: "var(--surface)", border: "1px solid var(--line)" }
    }, o.default.createElement("span", { className: "text-xs shrink-0", style: { color: "var(--muted-2)" } }, "\u0218colarizare"),
        o.default.createElement("span", { className: "text-sm flex-1 min-w-0 truncate", style: { color: "var(--text)" } }, iasDescriereScolarizare(e.scolarizare, a)),
        o.default.createElement("span", { className: "text-xs shrink-0", style: { color: "var(--accent-ink)" } }, "Schimb\u0103")) : null,
    o.default.createElement("div", {
        className: "mb-4"
    }, o.default.createElement("div", {
        className: "flex items-center justify-between text-xs text-slate-400 mb-1"
    }, o.default.createElement("span", null, "Progres \u0219edin\u021Be efectuate"), o.default.createElement("span", {
        className: "font-mono-time"
    }, _, "/", y)), o.default.createElement(Cf, {
        value: y > 0 ? _ / y * 100 : 0
    }), b > 0 && o.default.createElement("div", {
        className: "text-xs text-slate-400 mt-1.5"
    }, "programate \xEEn calendar: ", b, " (nu scad r\u0103masele p\xE2n\u0103 nu sunt efectuate)"), E > 0 && o.default.createElement("div", {
        className: "text-xs text-violet-600 mt-1.5"
    }, "din care cu al\u021Bi instructori: ", E)),
    e.examDate && e.examDate <= Be() && e.examResult !== "promovat" && o.default.createElement("div", {
        className: "rounded-xl px-3.5 py-3 mb-4",
        style: {
            border: "1px solid var(--violet)"
        }
    }, o.default.createElement("div", {
        className: "text-sm font-medium",
        style: {
            color: "var(--violet)"
        }
    }, "Examen practic \xB7 ", qe(e.examDate)), o.default.createElement("div", {
        className: "text-xs text-slate-500 mt-0.5 mb-2.5"
    }, "Noteaz\u0103 rezultatul. Se adaug\u0103 o sus\u021Binere la contor (", Number(e.examAttempts) || 0, " p\xE2n\u0103 acum), iar la respins data r\u0103m\xE2ne liber\u0103 pentru reexaminare."), o.default.createElement("div", {
        className: "flex gap-2"
    }, o.default.createElement("button", {
        onClick: () => c(e.id, "promovat"),
        className: "flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium"
    }, "Promovat"), o.default.createElement("button", {
        onClick: () => c(e.id, "respins"),
        className: "flex-1 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-medium"
    }, "Respins"))),
    (() => {
        /* Teoreticul se notează la fel ca practicul, cu contorul lui de
           susțineri. Apare doar după ce a trecut ziua examenului. */
        if (!e.theoryExamDate || e.theoryExamDate > Be() || e.theoryExamResult === "promovat") return null;
        return o.default.createElement("div", {
            className: "rounded-xl px-3.5 py-3 mb-4",
            style: { border: "1px solid var(--info-line)", background: "var(--info-soft)" }
        }, o.default.createElement("div", {
            className: "text-sm font-medium", style: { color: "var(--info)" }
        }, "Examen teoretic \xB7 ", qe(e.theoryExamDate)), o.default.createElement("div", {
            className: "text-xs text-slate-500 mt-0.5 mb-2.5"
        }, "Noteaz\u0103 rezultatul. Se adaug\u0103 o sus\u021Binere la contor (",
            Number(e.theoryExamAttempts) || 0,
            " p\xE2n\u0103 acum), iar la respins data r\u0103m\xE2ne liber\u0103 pentru reexaminare."),
        o.default.createElement("div", { className: "flex gap-2" },
            o.default.createElement("button", {
                onClick: () => c(e.id, "promovat", "teoretic"),
                className: "flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium"
            }, "Promovat"),
            o.default.createElement("button", {
                onClick: () => c(e.id, "respins", "teoretic"),
                className: "flex-1 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-medium"
            }, "Respins")))
    })(),
    o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3 mb-4 text-sm"
    }, o.default.createElement("div", null, o.default.createElement("div", {
        className: "text-xs text-slate-400 mb-0.5"
    }, "Examen teoretic"), o.default.createElement("div", {
        className: "text-slate-800"
    }, e.theoryExamDate ? qe(e.theoryExamDate) : "\u2014"), o.default.createElement("div", {
        className: "mt-1 flex items-center gap-1.5 flex-wrap"
    }, o.default.createElement(Mw, {
        result: e.theoryExamResult
    }), o.default.createElement("span", {
        className: "text-xs text-slate-400"
    }, Number(e.theoryExamAttempts) || 0, " sus\u021Bineri"))), o.default.createElement("div", null, o.default.createElement("div", {
        className: "text-xs text-slate-400 mb-0.5"
    }, "Examen practic"), o.default.createElement("div", {
        className: "text-slate-800"
    }, e.examDate ? qe(e.examDate) : "\u2014"), e.examDate && ha[e.examPeriod] && o.default.createElement("div", {
        className: "text-xs mt-0.5",
        style: {
            color: "var(--violet)"
        }
    }, ha[e.examPeriod].label, " \xB7 ", Se(ha[e.examPeriod].start), "\u2013", Se(ha[e.examPeriod].end)), o.default.createElement("div", {
        className: "mt-1 flex items-center gap-1.5 flex-wrap"
    }, o.default.createElement(Mw, {
        result: e.examResult
    }), o.default.createElement("span", {
        className: "text-xs text-slate-400"
    }, Number(e.examAttempts) || 0, " sus\u021Bineri"))), o.default.createElement("div", null, o.default.createElement("div", {
        className: "text-xs text-slate-400 mb-0.5"
    }, "Na\u0219tere"), o.default.createElement("div", {
        className: "text-slate-800"
    }, e.birthDate ? qe(e.birthDate) : "\u2014"), e.birthDate && vu(e.birthDate) != null && o.default.createElement("div", {
        className: "text-xs mt-0.5",
        style: {
            color: xf(e.birthDate) ? "var(--accent-ink)" : "var(--muted-2)"
        }
    }, vu(e.birthDate), " ani", xf(e.birthDate) ? ` \xB7 18 pe ${qe(xf(e.birthDate))}` : "")), o.default.createElement("div", null, o.default.createElement("div", {
        className: "text-xs text-slate-400 mb-0.5"
    }, "\xCEnscriere"), o.default.createElement("div", {
        className: "text-slate-800"
    }, e.enrollDate ? qe(e.enrollDate) : "\u2014")), o.default.createElement("div", null, o.default.createElement("div", {
        className: "text-xs text-slate-400 mb-0.5"
    }, "Nr. \xEEnregistrare"), o.default.createElement("div", {
        className: "text-slate-800"
    }, e.regNumber || "\u2014")),
    /* Domiciliul elevului, scris ca Plus Code — cum l-ai introdus. Până acum
       punctul se salva, dar nu se vedea nicăieri, așa că nu puteai ști dacă a
       intrat sau ce ai pus. Din el se socotește și cine e aproape de casa ta. */
    /* Domiciliul, ca rând întreg pe care poți apăsa: te duce drept în hartă.
       Scris pe înțeles — „25 km sud de tine" — cu codul dedesubt, pentru cine
       vrea să-l copieze. */
    Fn(e) ? o.default.createElement("a", {
        href: `https://maps.google.com/?q=${e.lat},${e.lng}`,
        target: "_blank", rel: "noopener noreferrer",
        className: "col-span-2 flex items-center gap-2.5 rounded-xl px-3 py-2.5 -mx-0.5",
        style: { background: "var(--surface-2)", border: "1px solid var(--line)" }
    },
        o.default.createElement(dn, { size: 16, className: "shrink-0", style: { color: "var(--accent)" } }),
        o.default.createElement("span", { className: "flex-1 min-w-0" },
            o.default.createElement("span", {
                className: "block text-xs text-slate-400"
            }, "Domiciliu"),
            o.default.createElement("span", {
                className: "block text-sm", style: { color: "var(--text)" }
            }, iasCatSiIncotro(a.acasa, e) || "punct pe hart\u0103"),
            o.default.createElement("span", {
                className: "block font-mono-time text-xs", style: { color: "var(--muted-2)" }
            }, iasPlusDinPunct(e))),
        o.default.createElement(un, { size: 15, className: "shrink-0 text-slate-300" })) : null,
    e.defaultLocation && o.default.createElement("div", {
        className: "col-span-2"
    }, o.default.createElement("div", {
        className: "text-xs text-slate-400 mb-0.5"
    }, "Loca\u021Bie de start implicit\u0103",
        (() => {
            /* Distanța de aici hotărăște dacă planul îl pune la început, la
               sfârșit sau la mijlocul zilei — deci merită scrisă. */
            let iasP = iasPunctIntalnire(e, a), iasT = iasP ? iasCatSiIncotro(a.acasa, iasP) : "";
            return iasT ? o.default.createElement("span", {
                style: { color: "var(--accent-ink)" }
            }, " \xB7 ", iasT) : null
        })()), o.default.createElement("a", {
        href: wu(xo(a, e.defaultLocation), e.defaultLocation, "dir"),
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
            touchAction: "manipulation"
        },
        className: "text-slate-800 flex items-center gap-1"
    }, o.default.createElement(dn, {
        size: 12,
        className: "shrink-0",
        style: {
            color: "var(--accent-ink)"
        }
    }), e.defaultLocation)), e.area && o.default.createElement("div", {
        className: "col-span-2"
    }, o.default.createElement("div", {
        className: "text-xs text-slate-400 mb-0.5"
    }, "Zona de domiciliu"), o.default.createElement("div", {
        className: "text-slate-800"
    }, e.area))),
    o.default.createElement("div", {
        className: `rounded-xl border px-3.5 py-3 mb-4 ${G>0?"bg-amber-50 border-amber-200":"bg-emerald-50 border-emerald-200"}`
    }, o.default.createElement("div", {
        className: "flex items-center justify-between gap-2"
    }, o.default.createElement("div", {
        className: "min-w-0"
    }, o.default.createElement("div", {
        className: `text-sm font-medium ${G>0?"text-amber-800":"text-emerald-800"}`
    }, G > 0 ? "Datorie ore" : "Achitat la zi"), o.default.createElement("div", {
        className: "text-xs text-slate-500 mt-0.5"
    }, "Acumulat: ", B.toLocaleString("ro-RO"), " \xB7 Pl\u0103tit: ", $.toLocaleString("ro-RO"), " ", a.currency), (() => {
        let R = t.filter(ne => ne.studentId === e.id && ne.status !== "cancelled" && !ne.otherInstructor && ne.type !== "included").length,
            K = Math.max(0, (Number(e.extraHours) || 0) - R);
        return K > 0 ? o.default.createElement("div", {
            className: "text-xs text-slate-400 mt-0.5"
        }, "din care ", K, " ore suplimentare \xEEnc\u0103 neprogramate") : null
    })()), o.default.createElement("div", {
        className: "flex items-center gap-2 shrink-0"
    }, G > 0 && o.default.createElement("span", {
        className: "font-mono-time text-lg font-semibold text-amber-700"
    }, G.toLocaleString("ro-RO"), " ", a.currency), G < 0 && o.default.createElement("span", {
        className: "text-xs text-emerald-700"
    }, "avans ", Math.abs(G).toLocaleString("ro-RO"), " ", a.currency), o.default.createElement("button", {
        onClick: () => h(!0),
        className: "px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium flex items-center gap-1.5"
    }, o.default.createElement(Bi, {
        size: 15
    }), G > 0 ? "Achit\u0103" : "Pl\u0103te\u0219te \xEEn avans"))), o.default.createElement("div", {
        className: "mt-2 pt-2 border-t border-slate-200/60"
    }, o.default.createElement(Jn, {
        title: "Taxe",
        summary: _f(e, a) > 0 ? `${_f(e,a).toLocaleString("ro-RO")} ${a.currency}` : "niciuna"
    }, o.default.createElement(qA, {
        student: e,
        settings: a,
        onSet: p
    }))), A.length > 0 && o.default.createElement("div", {
        className: "mt-2 pt-2 border-t border-slate-200/60 space-y-0.5"
    }, A.slice(0, 3).map(R => o.default.createElement("button", {
        key: R.id,
        onClick: () => f(e.id, R),
        className: "w-full flex items-center justify-between gap-2 text-xs text-slate-500 text-left py-0.5"
    }, o.default.createElement("span", null, R.date ? qe(R.date) : "\u2014", R.collector === "school" ? o.default.createElement("span", {
        className: "text-slate-400"
    }, " \xB7 la \u0219coal\u0103") : null), o.default.createElement("span", {
        className: "flex items-center gap-1.5"
    }, o.default.createElement("span", {
        className: "font-mono-time"
    }, (Number(R.amount) || 0).toLocaleString("ro-RO"), " ", a.currency), o.default.createElement(ka, {
        size: 12,
        className: "text-slate-300"
    })))), A.length > 3 && o.default.createElement("div", {
        className: "text-xs text-slate-400"
    }, "+ \xEEnc\u0103 ", A.length - 3, " pl\u0103\u021Bi \xB7 toate \xEEn Finan\u021Be, pe luni"))),
    (() => {
        /* Notițele și mementourile, pe cardul elevului. Una singură se citește
           pe loc; mai multe se strâng într-o listă, ca să nu umple cardul. */
        let iasN = iasNotite(e),
            iasM = (e.reminders || []).filter(x => (x.text || "").trim()),
            iasTot = iasN.length + iasM.length;
        if (!iasTot) return null;
        let iasCutie = (titlu, copii) => o.default.createElement("div", {
            className: "rounded-xl px-3.5 py-3 mb-4",
            style: { background: "var(--surface-2)", border: "1px solid var(--line)" }
        }, o.default.createElement("div", {
            className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-1"
        }, titlu), copii);
        let iasRandNota = (nt) => o.default.createElement("div", {
            key: nt.id, className: "text-sm text-slate-700 mb-1 last:mb-0",
            style: { whiteSpace: "pre-wrap" }
        }, nt.text, nt.data ? o.default.createElement("span", {
            className: "block text-xs text-slate-400"
        }, qe(nt.data)) : null);
        let iasRandMem = (m) => o.default.createElement("div", {
            key: m.id, className: "text-sm mb-1 last:mb-0",
            style: { color: "var(--accent-ink)" }
        }, m.text, o.default.createElement("span", {
            className: "text-xs text-slate-400"
        }, " \xB7 la \u0219edin\u021Ba ", m.atSession || "?"));

        if (iasTot === 1) {
            return iasN.length
                ? iasCutie("Noti\u021B\u0103", iasRandNota(iasN[0]))
                : iasCutie("Memento", iasRandMem(iasM[0]));
        }
        return iasCutie("Agend\u0103 \xB7 " + iasTot,
            o.default.createElement("div", null,
                iasM.map(iasRandMem),
                iasM.length && iasN.length ? o.default.createElement("div", {
                    className: "my-2", style: { borderTop: "1px solid var(--line)" }
                }) : null,
                iasN.map(iasRandNota)));
    })(),
    o.default.createElement(Jn, {
        title: "Istoric \u0219edin\u021Be",
        summary: O.length ? `${O.length}` : "gol"
    }, o.default.createElement("div", {
        className: "space-y-1.5 pb-2"
    }, O.length === 0 && o.default.createElement("div", {
        className: "text-sm text-slate-400 text-center py-6"
    }, "Nicio \u0219edin\u021B\u0103 \xEEnc\u0103."), O.map(R => o.default.createElement("button", {
        key: R.id,
        onClick: () => l(R),
        className: "w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50 text-left"
    }, o.default.createElement("div", null, o.default.createElement("div", {
        className: "text-sm text-slate-800 font-medium"
    }, qe(R.date), R.otherInstructor && o.default.createElement("span", {
        className: "ml-1 text-xs font-normal text-violet-600"
    }, "\xB7 ", R.instructorName || "alt instr."), iasLimbaDe(R) && o.default.createElement("span", {
        className: "ml-1 text-xs font-normal text-sky-600"
    }, "\xB7 ", iasCodLimba(iasLimbaDe(R)))), o.default.createElement("div", {
        className: "font-mono-time text-xs text-slate-400"
    }, Se(R.startMin))), o.default.createElement("div", {
        className: "flex flex-col items-end gap-1 shrink-0"
    }, o.default.createElement(I0, {
        status: R.status
    }), R.type === "included" && R.status === "completed" && !R.otherInstructor && o.default.createElement("span", {
        className: "text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
    }, "inclus\u0103 \xB7 achitat"), k[R.id] === "package" && o.default.createElement("span", {
        className: "text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
    }, "din pachet"), k[R.id] === "paid" && o.default.createElement("span", {
        className: "text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
    }, "achitat\u0103"), k[R.id] === "partial" && o.default.createElement("span", {
        className: "text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"
    }, "par\u021Bial achitat\u0103"), k[R.id] === "due" && o.default.createElement("span", {
        className: "text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200"
    }, "de plat\u0103")))))),
    e.phone && N.length > 0 && o.default.createElement("button", {
        onClick: () => u({
            name: e.name,
            phone: e.phone,
            title: "Trimite programul",
            message: X
        }),
        className: "w-full py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-medium flex items-center justify-center gap-1.5 mb-5"
    }, o.default.createElement(Na, {
        size: 14
    }), "Trimite programul elevului"),
    !(e.phone && N.length > 0) && o.default.createElement("div", {
        className: "mb-2.5"
    }),
    e.phone && !e.bunVenitTrimis && o.default.createElement("button", {
        onClick: () => u({
            name: e.name,
            phone: e.phone,
            title: "Trimite mesajul de bun venit",
            message: ik(e, a),
            onTrimis: () => w(e.id)
        }),
        className: "w-full py-2.5 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-1.5 mb-2.5",
        style: {
            background: "var(--invert)"
        }
    }, o.default.createElement(ai, {
        size: 14
    }), "Trimite mesajul de bun venit"),
    g && o.default.createElement("button", {
        onClick: () => m(e),
        className: "w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium flex items-center justify-center gap-1.5 mb-2.5"
    }, o.default.createElement(fa, {
        size: 14
    }), "Trimite elevul altui instructor"),
    o.default.createElement(Pk, {
        open: x,
        studentName: e.name,
        outstanding: G,
        currency: a.currency,
        onClose: () => h(!1),
        onSave: (R, K) => {
            h(!1), d(e.id, R, K)
        }
    }))
}

function $k({
    students: n,
    allStudents: e,
    sessions: t,
    settings: a
}) {
    let r = (0, o.useMemo)(() => {
            let s = Tf(a),
                l = s.length,
                u = a.workDays && a.workDays.length ? a.workDays : [1, 2, 3, 4, 5, 6],
                d = n.map(b => ({
                    id: b.id,
                    left: Math.max(0, Number(b.remaining) || 0)
                })).filter(b => b.left > 0),
                f = [],
                p = [],
                c = pn(new Date, 1),
                m = 0;
            for (; l > 0 && d.some(b => b.left > 0) && m < 3e3;) {
                if (m++, !u.includes(c.getDay())) {
                    c = pn(c, 1);
                    continue
                }
                let b = d.filter(S => S.left > 0).sort((S, k) => k.left - S.left).slice(0, l);
                if (!b.length) break;
                let M = ft(c);
                b.forEach((S, k) => {
                    S.left--, f.push({
                        studentId: S.id,
                        date: M,
                        startMin: s[k]
                    })
                }), p.push(b.length), c = pn(c, 1)
            }
            let g = vw(f, e, t, a),
                v = p.filter(b => b >= l).length,
                w = new Date,
                x = ft(new Date(w.getFullYear(), w.getMonth() + 1, 0)),
                h = f.filter(b => b.date <= x),
                y = vw(h, e, t, a),
                _ = new Set(h.map(b => b.date)).size;
            return {
                total: f.length,
                workDaysCount: p.length,
                full: v,
                partial: p.length - v,
                lastDate: f.length ? f[f.length - 1].date : null,
                money: g.total,
                lunaSedinte: h.length,
                lunaZile: _,
                lunaBani: y.total,
                lunaPana: x,
                totIncape: h.length === f.length
            }
        }, [n, e, t, a]),
        i = s => Math.round(s).toLocaleString("ro-RO");
    return o.default.createElement("div", {
        className: "px-4 mt-5 space-y-2"
    }, o.default.createElement("div", {
        className: "rounded-2xl p-5 bg-slate-900 text-center"
    }, o.default.createElement("div", {
        className: "text-[11px] uppercase tracking-widest",
        style: {
            color: "rgba(255,255,255,.55)"
        }
    }, "Mai ai de lucru"), o.default.createElement("div", {
        className: "font-mono-time text-4xl font-semibold text-white leading-none mt-1.5"
    }, r.workDaysCount), o.default.createElement("div", {
        className: "text-sm mt-1",
        style: {
            color: "rgba(255,255,255,.75)"
        }
    }, r.workDaysCount === 1 ? "zi" : "zile"), r.workDaysCount > 0 && o.default.createElement("div", {
        className: "text-xs mt-2",
        style: {
            color: "rgba(255,255,255,.5)"
        }
    }, r.full, " ", r.full === 1 ? "plin\u0103" : "pline", " \xB7 ", r.partial, " ", r.partial === 1 ? "par\u021Bial ocupat\u0103" : "par\u021Bial ocupate"), r.lastDate && o.default.createElement("div", {
        className: "text-xs mt-1",
        style: {
            color: "rgba(255,255,255,.4)"
        }
    }, "ultima: ", qe(r.lastDate)), r.total > 0 && o.default.createElement("div", {
        className: "mt-3 pt-3",
        style: {
            borderTop: "1px solid rgba(255,255,255,.12)"
        }
    }, o.default.createElement("div", {
        className: "text-[11px] uppercase tracking-widest",
        style: {
            color: "rgba(255,255,255,.5)"
        }
    }, "p\xE2n\u0103 la ", qe(r.lunaPana)), r.totIncape ? o.default.createElement("div", {
        className: "text-sm mt-1",
        style: {
            color: "rgba(255,255,255,.75)"
        }
    }, "Termini tot p\xE2n\u0103 atunci.") : o.default.createElement("div", {
        className: "text-sm mt-1",
        style: {
            color: "rgba(255,255,255,.85)"
        }
    }, r.lunaSedinte, " din ", r.total, " \u0219edin\u021Be \xB7 ", r.lunaZile, " ", r.lunaZile === 1 ? "zi" : "zile")), o.default.createElement("div", {
        className: "text-[11px] mt-2 pt-2",
        style: {
            color: "rgba(255,255,255,.35)",
            borderTop: "1px solid rgba(255,255,255,.12)"
        }
    }, "zile \xEEndesate la maximum \xB7 o \u0219edin\u021B\u0103 pe zi de elev")), o.default.createElement("div", {
        className: "rounded-2xl p-5 text-center",
        style: {
            background: "var(--ok-soft)",
            border: "1px solid var(--ok-line)"
        }
    }, o.default.createElement("div", {
        className: "text-[11px] uppercase tracking-widest",
        style: {
            color: "var(--ok)"
        }
    }, "Poten\u021Bial financiar"), o.default.createElement("div", {
        className: "font-mono-time text-3xl font-semibold leading-none mt-1.5",
        style: {
            color: "var(--ok)"
        }
    }, i(r.money)), o.default.createElement("div", {
        className: "text-xs mt-1 text-slate-500"
    }, a.currency, " \xB7 ", r.total, " \u0219edin\u021Be, la tarifele din Finan\u021Be"), r.total > 0 && !r.totIncape && o.default.createElement("div", {
        className: "text-xs mt-2 pt-2 text-slate-500",
        style: {
            borderTop: "1px solid var(--ok-line)"
        }
    }, "p\xE2n\u0103 la ", qe(r.lunaPana), ": ", o.default.createElement("span", {
        className: "font-mono-time font-semibold",
        style: {
            color: "var(--ok)"
        }
    }, i(r.lunaBani)), " ", a.currency)))
}

function jk({
    data: n,
    onUpdateStudentLimit: e,
    onApplyPlan: t,
    onStergePropuneri: a
}) {
    let [iasRitm, iasPuneRitm] = (0, o.useState)(0);
    let r = Fa(n.settings),
        i = n.students.map(N => ({
            ...N,
            remaining: kf(N, n.sessions, n.settings)
        })).filter(N => N.remaining > 0 && Pf(N)).sort((N, C) => N.name.localeCompare(C.name, "ro")),
        [s, l] = (0, o.useState)(() => new Set(i.map(N => N.id))),
        [u, d] = (0, o.useState)(() => new Set),
        [f, p] = (0, o.useState)(null),
        [c, m] = (0, o.useState)(0),
        [g, v] = (0, o.useState)(Be()),
        [w, x] = (0, o.useState)("fara"),
        [h, y] = (0, o.useState)(!1),
        [_, b] = (0, o.useState)(() => Number(n.settings.defaultWeeklyLimit) || 2),
        M = [{
            v: 0,
            l: "C\xE2t e nevoie"
        }, {
            v: 1,
            l: "1 zi"
        }, {
            v: 2,
            l: "2 zile"
        }, {
            v: 3,
            l: "3 zile"
        }, {
            v: 4,
            l: "4 zile"
        }, {
            v: 5,
            l: "5 zile"
        }, {
            v: 6,
            l: "6 zile"
        }, {
            v: 7,
            l: "1 s\u0103pt\u0103m\xE2n\u0103"
        }, {
            v: 14,
            l: "2 s\u0103pt\u0103m\xE2ni"
        }, {
            v: 21,
            l: "3 s\u0103pt\u0103m\xE2ni"
        }, {
            v: 28,
            l: "4 s\u0103pt\u0103m\xE2ni"
        }, {
            v: 30,
            l: "1 lun\u0103"
        }, {
            v: 60,
            l: "2 luni"
        }, {
            v: 90,
            l: "3 luni"
        }];

    function S(N) {
        l(C => {
            let W = new Set(C);
            return W.has(N) ? W.delete(N) : W.add(N), W
        }), p(null)
    }

    function k(N) {
        d(C => {
            let W = new Set(C);
            return W.has(N) ? W.delete(N) : W.add(N), W
        }), p(null)
    }
    let E = i.length > 0 && i.every(N => s.has(N.id)),
        B = i.length > 0 && i.every(N => u.has(N.id));

    function $() {
        let N = i.filter(C => s.has(C.id)).map(C => ({
            id: C.id,
            name: C.name,
            remaining: C.remaining,
            weeklyLimit: Number(C.weeklyLimit) || n.settings.defaultWeeklyLimit,
            examDate: C.examDate,
            availDays: C.availDays,
            tura: C.tura,
            turaData: C.turaData,
            turaOra: C.turaOra,
            turaLucru: C.turaLucru,
            turaLiber: C.turaLiber,
            turaOdihna: C.turaOdihna,
            area: C.area,
            masina: C.masina,
            cutie: C.cutie,
            plecatDin: C.plecatDin,
            plecatPana: C.plecatPana,
            lat: C.lat,
            lng: C.lng,
            availParity: C.availParity,
            /* Disponibilitatea pe zile trebuie să ajungă la plan, altfel
               editorul din fișă n-ar schimba nimic: planul primește doar
               câmpurile scrise aici, nu elevul întreg. */
            dispZile: C.dispZile,
            dispDate: C.dispDate,
            minGapDays: C.minGapDays,
            availFrom: C.availFrom,
            availTo: C.availTo,
            defaultLocation: C.defaultLocation,
            includeRezerva: u.has(C.id),
            window: bw(n.sessions, C.id, C, r)
        }));
        N.length !== 0 && p(uk({
            students: N,
            existingSessions: n.sessions,
            settings: {
                ...n.settings,
                examStudents: n.students,
                horizonDays: c,
                grupare: w,
                ritmPlan: iasRitm
            },
            fromDateISO: g || Be()
        }))
    }

    function G() {
        f && (t(f.proposals), p(null))
    }
    let A = (0, o.useMemo)(() => {
            if (!f) return [];
            let N = new Map;
            return f.proposals.forEach(C => {
                let W = ft(Gi(Ue(C.date)));
                N.has(W) || N.set(W, []), N.get(W).push(C)
            }), [...N.entries()].sort((C, W) => C[0].localeCompare(W[0]))
        }, [f]),
        O = N => n.students.find(C => C.id === N)?.name || "?";
    return o.default.createElement("div", {
        className: "pb-4"
    }, o.default.createElement("div", {
        className: "px-4 pt-4 pb-1"
    }, o.default.createElement("h1", {
        className: "font-display text-xl font-semibold text-slate-900 uppercase tracking-wide"
    }, "Planificator"), o.default.createElement("p", {
        className: "text-xs text-slate-400 mt-1"
    }, "Primii sunt elevii cu examenul cel mai apropiat. Fiecare prime\u0219te ore \xEEn intervalul cu care e obi\u0219nuit din \u0219edin\u021Bele de p\xE2n\u0103 acum; dac\u0103 nu \xEEncap toate acolo, restul se a\u0219az\u0103 unde a mai r\u0103mas liber.")), i.length === 0 ? o.default.createElement("div", {
        className: "px-4 py-10 text-center text-sm text-slate-400"
    }, "Niciun elev cu \u0219edin\u021Be r\u0103mase.") : o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
        className: "px-4 mt-3"
    }, o.default.createElement(Jn, {
        title: `Elevi \xB7 ${s.size} din ${i.length}`
    }, o.default.createElement("div", {
        className: "space-y-1.5"
    }, o.default.createElement("div", {
        className: "flex items-center gap-3 px-3.5 py-2.5"
    }, o.default.createElement("input", {
        type: "checkbox",
        checked: E,
        onChange: () => {
            l(E ? new Set : new Set(i.map(N => N.id))), p(null)
        },
        className: "w-4 h-4 accent-amber-500 shrink-0"
    }), o.default.createElement("span", {
        className: "text-sm font-medium text-slate-700 flex-1"
    }, E ? "To\u021Bi elevii" : `Alege to\u021Bi cei ${i.length}`), o.default.createElement("span", {
        className: "text-xs text-slate-400"
    }, s.size, " ale\u0219i")), o.default.createElement("div", {
        className: "flex items-center gap-2 px-3.5 pb-2.5"
    }, o.default.createElement("span", {
        className: "text-sm text-slate-600 flex-1"
    }, "\u0218edin\u021Be pe s\u0103pt\u0103m\xE2n\u0103, la to\u021Bi"), o.default.createElement(xw, {
        value: _,
        onCommit: N => b(N)
    }), o.default.createElement("button", {
        onClick: () => {
            i.forEach(N => e(N.id, _)), p(null)
        },
        className: "shrink-0 px-3 py-1.5 rounded-lg text-white text-xs font-medium",
        style: {
            background: "var(--invert)"
        }
    }, "Pune"), o.default.createElement("button", {
        onClick: () => {
            let N = n.settings.defaultWeeklyLimit;
            b(N), i.forEach(C => e(C.id, N)), p(null)
        },
        className: "shrink-0 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs"
    }, "Implicit")),
    /* Bifa asta n-are rost dacă nu ții nicio ședință deoparte — atunci nu e
       nimic de inclus. Apare doar când rezerva e pornită din Setări. */
    iasRezerva(n.settings) > 0 && o.default.createElement("div", {
        className: "flex items-center gap-3 px-3.5 pb-2.5"
    }, o.default.createElement("input", {
        type: "checkbox",
        checked: B,
        onChange: () => {
            d(B ? new Set : new Set(i.map(N => N.id))), p(null)
        },
        className: "w-4 h-4 accent-amber-500 shrink-0"
    }), o.default.createElement("span", {
        className: "text-sm text-slate-600 flex-1"
    }, "Include \u0219i \u0219edin\u021Bele rezervate")), iasRezerva(n.settings) > 0 && o.default.createElement("p", {
        className: "text-xs text-slate-400 px-3.5 -mt-1 mb-1"
    }, "Ultimele ", iasRezerva(n.settings), " \u0219edin\u021Be ale fiec\u0103rui elev se p\u0103streaz\u0103 pentru preg\u0103tirea de dinaintea examenului. Bifeaz\u0103 dac\u0103 vrei s\u0103 intre \u0219i ele \xEEn plan."), i.map(N => {
        let C = bw(n.sessions, N.id, N, r);
        return o.default.createElement("div", {
            key: N.id,
            className: "flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3.5 py-2.5"
        }, o.default.createElement("input", {
            type: "checkbox",
            checked: s.has(N.id),
            onChange: () => S(N.id),
            className: "w-4 h-4 accent-amber-500 shrink-0"
        }), o.default.createElement("div", {
            className: "flex-1 min-w-0"
        }, o.default.createElement("div", {
            className: "text-sm font-medium text-slate-900 truncate"
        }, N.name, o.default.createElement(Lf, {
            student: N,
            size: 13,
                sesiuni: n.sessions,
                setari: n.settings
            })), o.default.createElement("div", {
            className: "text-xs text-slate-400"
        }, N.remaining, " de programat", N.examDate ? ` \xB7 examen ${qe(N.examDate)}` : ""), N.tura && L0(N) && (() => {
            let W = Jw(N, 1)[0];
            return W ? o.default.createElement("div", {
                className: "text-xs text-violet-600"
            }, "tur\u0103: ", E0(W)) : null
        })(), C && o.default.createElement("div", {
            className: "text-xs",
            style: {
                color: "var(--accent-ink)"
            }
        }, C.stated ? `disponibil ${Se(C.from)}\u2013${Se(C.to)}` : `de obicei ${Se(C.lo)}\u2013${Se(C.hi)}`), s.has(N.id) && N.remaining > 0 && o.default.createElement("button", {
            type: "button",
            onClick: () => k(N.id),
            className: "flex items-center gap-1.5 mt-1"
        }, o.default.createElement("span", {
            className: "flex items-center justify-center rounded shrink-0",
            style: {
                width: 14,
                height: 14,
                border: `1.5px solid ${u.has(N.id)?"var(--accent)":"var(--line-2)"}`,
                background: u.has(N.id) ? "var(--accent)" : "transparent",
                color: "#3a2100",
                fontSize: 10,
                fontWeight: 900,
                lineHeight: 1
            }
        }, u.has(N.id) ? "\u2713" : ""), o.default.createElement("span", {
            className: "text-xs text-slate-400"
        }, "include \u0219edin\u021Bele rezervate"))), o.default.createElement("div", {
            className: "flex items-center gap-1 shrink-0"
        }, o.default.createElement("span", {
            className: "text-xs text-slate-400"
        }, "max/s\u0103pt"), o.default.createElement(xw, {
            value: N.weeklyLimit == null ? n.settings.defaultWeeklyLimit : Number(N.weeklyLimit),
            onCommit: W => {
                e(N.id, W), W === 0 && l(X => {
                    let R = new Set(X);
                    return R.delete(N.id), R
                })
            }
        })))
    })))), o.default.createElement("div", {
        className: "px-4 mt-4"
    }, o.default.createElement(Jn, {
        title: "Op\u021Biuni de planificare",
        summary: `${g === Be() ? "de azi" : qe(g)} \xB7 ${(M.find(N => N.v === c) || {}).l || ""} \xB7 ${w === "fara" ? "f\u0103r\u0103 grupare" : w === "zona" ? "pe zone" : w === "masina" ? "pe ma\u0219ini" : "pe hart\u0103"}${iasRitm >= 2 ? ` \xB7 pauz\u0103 ${iasRitm - 1} ${iasRitm === 2 ? "zi" : "zile"}` : ""}`
    }, o.default.createElement(xe, {
        label: "\xCEncepe de la"
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: g,
        min: Be(),
        onChange: N => {
            v(N.target.value), p(null)
        }
    })), o.default.createElement(xe, {
        label: "Perioada planificat\u0103"
    }, o.default.createElement("select", {
        className: ie,
        value: c,
        onChange: N => {
            m(Number(N.target.value)), p(null)
        }
    }, M.map(N => o.default.createElement("option", {
        key: N.v,
        value: N.v
    }, N.l)))),
    /* Pauza dintre ședințele aceluiași elev, cerută pentru generarea asta. Din
       oficiu nu e niciuna — planul umple cum apucă. Elevul care are pauza lui
       scrisă pe fișă merge după a lui, oricât ai cere aici. */
    o.default.createElement(xe, {
        label: "Pauz\u0103 \xEEntre \u0219edin\u021Bele aceluia\u0219i elev"
    }, o.default.createElement("select", {
        className: ie,
        value: iasRitm,
        onChange: N => { iasPuneRitm(Number(N.target.value)), p(null) }
    },
        o.default.createElement("option", { value: 0 }, "F\u0103r\u0103 \u2014 c\xE2t de str\xE2ns se poate"),
        o.default.createElement("option", { value: 2 }, "O zi liber\u0103 \xEEntre ele"),
        o.default.createElement("option", { value: 3 }, "Dou\u0103 zile libere"),
        o.default.createElement("option", { value: 4 }, "Trei zile libere"))),
    o.default.createElement(xe, {
        label: "Cum se grupeaz\u0103"
    }, o.default.createElement("select", {
        className: ie,
        value: w,
        onChange: N => {
            x(N.target.value), p(null)
        }
    }, o.default.createElement("option", {
        value: "fara"
    }, "F\u0103r\u0103 \u2014 doar dup\u0103 priorit\u0103\u021Bi"), o.default.createElement("option", {
        value: "zona"
    }, "Dup\u0103 zona scris\u0103 pe fi\u0219\u0103"), o.default.createElement("option", {
        value: "harta"
    }, "Dup\u0103 punctele de pe hart\u0103"), o.default.createElement("option", {
        value: "masina"
    }, "Dup\u0103 ma\u0219ina fiec\u0103rui elev"))), o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3.5"
    }, w === "fara" ? "Planul merge strict pe examene, disponibilitate \u0219i ore r\u0103mase." : w === "masina" ? `Pune consecutiv elevii care \xEEnva\u021B\u0103 pe aceea\u0219i ma\u0219in\u0103, ca s\u0103 n-o schimbi \xEEntre \u0219edin\u021Be. Are ma\u0219ina scris\u0103 ${i.filter(N => N.masina).length} din ${i.length} elevi; ceilal\u021Bi se a\u0219az\u0103 normal.` : w === "zona" ? "Pune consecutiv elevii cu aceea\u0219i zon\u0103 scris\u0103 \u2014 trebuie scris\u0103 la fel la am\xE2ndoi." : `Pune consecutiv elevii care stau la mai pu\u021Bin de ${Yw} km unul de altul. Are punct de domiciliu ${i.filter(N=>Fn(N)).length} din ${i.length} elevi; ceilal\u021Bi se a\u0219az\u0103 normal.`)), o.default.createElement("button", {
        onClick: $,
        disabled: s.size === 0,
        className: "w-full py-3 rounded-xl bg-amber-500 text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-40"
    }, o.default.createElement(Pa, {
        size: 16
    }), " Genereaz\u0103 plan (", s.size, " elevi)")), o.default.createElement($k, {
        students: i.filter(N => s.has(N.id)),
        allStudents: n.students,
        sessions: n.sessions,
        settings: n.settings
    })), (() => {
        let N = n.sessions.filter(C => C.auto && C.status === "pending" && C.date >= Be());
        return f || N.length === 0 ? null : o.default.createElement("div", {
            className: "px-4 mt-5"
        }, o.default.createElement("button", {
            onClick: () => y(!0),
            className: "w-full py-2.5 rounded-xl border text-sm font-medium flex items-center justify-center gap-1.5",
            style: {
                borderColor: "var(--bad-line)",
                color: "var(--bad)"
            }
        }, o.default.createElement(pa, {
            size: 15
        }), "\u0218terge ", N.length, " propuneri neconfirmate"), o.default.createElement("p", {
            className: "text-xs text-slate-400 mt-1.5 text-center"
        }, '\u0218edin\u021Bele puse de planificator pe care elevii nu le-au confirmat \xEEnc\u0103. Cele trecute pe \u201EProgramat\u0103" r\u0103m\xE2n.'))
    })(), o.default.createElement(Ri, {
        open: h,
        title: "\u0218tergi propunerile neconfirmate?",
        message: `Se \u0219terg ${n.sessions.filter(N=>N.auto&&N.status==="pending"&&N.date>=Be()).length} \u0219edin\u021Be propuse de planificator care \xEEnc\u0103 a\u0219teapt\u0103 confirmare. Cele pe care le-ai trecut pe \u201EProgramat\u0103" r\u0103m\xE2n neatinse.`,
        confirmLabel: "\u0218terge",
        danger: !0,
        onConfirm: () => {
            y(!1), a()
        },
        onCancel: () => y(!1)
    }), o.default.createElement(oi, {
        /* Planul propus se deschide ca fereastră, nu se desface în josul paginii:
           altfel trebuia derulat ca să vezi ce ți-a ieșit. Gardul de la conținut
           e necesar — fără el se evalua și când planul e gol. */
        open: !!f,
        onClose: () => p(null),
        title: "Plan propus",
        layer: Wt.dialog
    }, f ? o.default.createElement("div", null, o.default.createElement("div", {
        className: "flex items-center justify-between mb-2"
    }, o.default.createElement("h2", {
        className: "font-display text-sm font-semibold text-slate-900 uppercase tracking-wide"
    }, "Plan propus"), o.default.createElement("span", {
        className: "text-xs text-slate-400"
    }, f.proposals.length, " \u0219edin\u021Be \xB7 ", f.horizonWeeks, " s\u0103pt.")), f.unfinished.length > 0 && o.default.createElement("div", {
        className: "mb-3 px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700 flex gap-2"
    }, o.default.createElement(Xn, {
        size: 14,
        className: "shrink-0 mt-0.5"
    }), o.default.createElement("span", null, "Nu au \xEEnc\u0103put toate \u0219edin\u021Bele pentru: ", f.unfinished.map(N => `${O(N.id)} (${N.left} r\u0103mase)`).join(", "), ".")), o.default.createElement("div", {
        className: "space-y-3 mb-4"
    }, A.map(([N, C]) => o.default.createElement("div", {
        key: N
    }, o.default.createElement("div", {
        className: "text-xs font-medium text-slate-400 mb-1.5"
    }, "S\u0103pt\u0103m\xE2na ", qe(N)), o.default.createElement("div", {
        className: "space-y-1"
    }, C.sort((W, X) => W.date + W.startMin < X.date + X.startMin ? -1 : 1).map((W, X) => o.default.createElement("div", {
        key: X,
        className: "flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 text-sm"
    }, o.default.createElement("span", {
        className: "text-slate-700"
    }, xu[Ue(W.date).getDay()], " ", Ue(W.date).getDate(), " \xB7 ", o.default.createElement("span", {
        className: "font-mono-time"
    }, Se(W.startMin))), o.default.createElement("span", {
        className: "font-medium text-slate-900"
    }, O(W.studentId)))))))), o.default.createElement("button", {
        onClick: G,
        className: "w-full py-3 rounded-xl bg-slate-900 text-white font-medium text-sm mb-2"
    }, "Aplic\u0103 planul \xEEn calendar"), o.default.createElement("button", {
        onClick: () => p(null),
        className: "w-full py-2 text-xs text-slate-400 text-center"
    }, "Renun\u021B\u0103 la propunere")) : null))
}

function aS(n, e) {
    return (n.varsaminte || []).filter(t => (t.date || "").startsWith(e)).sort((t, a) => (a.date || "").localeCompare(t.date || ""))
}
var gu = n => (n || []).reduce((e, t) => e + (Number(t.amount) || 0), 0);

function Ef(n) {
    return (n.students || []).reduce((e, t) => e + (t.payments || []).filter(a => a.collector !== "school").reduce((a, r) => a + (Number(r.amount) || 0), 0), 0)
}

function Xk({
    open: n,
    data: e,
    monthKey: t,
    monthLabel: a,
    onClose: r
}) {
    if (!n) return null;
    let i = e.settings.currency,
        s = g => `${Math.round(g||0).toLocaleString("ro-RO")} ${i}`,
        l = (e.students || []).map(g => {
            let v = (g.payments || []).filter(h => (h.date || "").startsWith(t)),
                w = v.filter(h => h.collector !== "school").reduce((h, y) => h + (Number(y.amount) || 0), 0),
                x = v.filter(h => h.collector === "school").reduce((h, y) => h + (Number(y.amount) || 0), 0);
            return {
                id: g.id,
                nume: g.name,
                laTine: w,
                laScoala: x
            }
        }).filter(g => g.laTine || g.laScoala).sort((g, v) => g.nume.localeCompare(v.nume, "ro")),
        u = l.reduce((g, v) => ({
            laTine: g.laTine + v.laTine,
            laScoala: g.laScoala + v.laScoala
        }), {
            laTine: 0,
            laScoala: 0
        }),
        d = aS(e, t),
        f = gu(d),
        p = Ef(e) - gu(e.varsaminte),
        c = "px-2 py-2 text-right font-mono-time",
        m = "px-2 py-2 text-xs font-medium text-slate-500 border-b border-slate-200";
    return o.default.createElement("div", {
        className: "fixed inset-0 raport-overlay ecran-peste",
        style: {
            zIndex: Wt.form,
            background: "var(--bg)"
        }
    }, o.default.createElement("div", {
        className: "h-full overflow-y-auto raport-print",
        style: {
            paddingTop: "env(safe-area-inset-top)"
        }
    }, o.default.createElement("div", {
        className: "px-4 py-4"
    }, o.default.createElement("div", {
        className: "flex items-center justify-between gap-2 mb-1 fara-print"
    }, o.default.createElement("h2", {
        className: "font-display text-lg font-semibold text-slate-900 uppercase tracking-wide"
    }, "Raport bani"), o.default.createElement("button", {
        onClick: r,
        "aria-label": "\xCEnchide",
        className: "btn-inchide p-2 rounded-full text-slate-500"
    }, o.default.createElement(ir, {
        size: 20
    }))), o.default.createElement("div", {
        className: "doar-print",
        style: {
            display: "none"
        }
    }, o.default.createElement("div", {
        style: {
            fontSize: "16pt",
            fontWeight: 700
        }
    }, fn.mark, " \xB7 Raport bani"), o.default.createElement("div", {
        style: {
            fontSize: "10pt",
            marginBottom: "10pt"
        }
    }, a, " \xB7 generat la ", qe(Be()))), o.default.createElement("p", {
        className: "text-xs text-slate-400 mb-3 fara-print"
    }, "Pl\u0103\u021Bile lunii, dup\u0103 cine le-a \xEEncasat, \u0219i banii du\u0219i la \u0219coal\u0103."), l.length === 0 ? o.default.createElement("div", {
        className: "text-center py-8 text-sm text-slate-400"
    }, "Nicio plat\u0103 \xEEn ", a, ".") : o.default.createElement("div", {
        className: "overflow-x-auto mb-5"
    }, o.default.createElement("table", {
        className: "w-full text-sm raport-tabel"
    }, o.default.createElement("thead", null, o.default.createElement("tr", null, o.default.createElement("th", {
        className: `${m} text-left`
    }, "Elev"), o.default.createElement("th", {
        className: m
    }, "La tine"), o.default.createElement("th", {
        className: m
    }, "La \u0219coal\u0103"), o.default.createElement("th", {
        className: m
    }, "Total"))), o.default.createElement("tbody", null, l.map(g => o.default.createElement("tr", {
        key: g.id,
        className: "border-b border-slate-100"
    }, o.default.createElement("td", {
        className: "px-2 py-2 text-slate-800"
    }, g.nume), o.default.createElement("td", {
        className: `${c} text-slate-900 font-semibold`
    }, g.laTine ? s(g.laTine) : "\u2014"), o.default.createElement("td", {
        className: `${c} text-slate-600`
    }, g.laScoala ? s(g.laScoala) : "\u2014"), o.default.createElement("td", {
        className: `${c} text-slate-600`
    }, s(g.laTine + g.laScoala))))), o.default.createElement("tfoot", null, o.default.createElement("tr", null, o.default.createElement("td", {
        className: "px-2 py-2 text-xs font-medium text-slate-500 border-t border-slate-300"
    }, "Total \xB7 ", l.length, " ", l.length === 1 ? "elev" : "elevi"), o.default.createElement("td", {
        className: `${c} border-t border-slate-300 text-slate-900 font-semibold`
    }, s(u.laTine)), o.default.createElement("td", {
        className: `${c} border-t border-slate-300 text-slate-700`
    }, s(u.laScoala)), o.default.createElement("td", {
        className: `${c} border-t border-slate-300 text-slate-700`
    }, s(u.laTine + u.laScoala)))))), o.default.createElement("div", {
        className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
    }, "Dus la \u0219coal\u0103 \xEEn ", a), d.length === 0 ? o.default.createElement("div", {
        className: "text-sm text-slate-400 py-2"
    }, "Niciun v\u0103rs\u0103m\xE2nt \xEEn aceast\u0103 lun\u0103.") : o.default.createElement("table", {
        className: "w-full text-sm raport-tabel mb-3"
    }, o.default.createElement("thead", null, o.default.createElement("tr", null, o.default.createElement("th", {
        className: `${m} text-left`
    }, "Data"), o.default.createElement("th", {
        className: `${m} text-left`
    }, "Men\u021Biune"), o.default.createElement("th", {
        className: m
    }, "Sum\u0103"))), o.default.createElement("tbody", null, d.map(g => o.default.createElement("tr", {
        key: g.id,
        className: "border-b border-slate-100"
    }, o.default.createElement("td", {
        className: "px-2 py-2 text-slate-800"
    }, g.date ? qe(g.date) : "\u2014"), o.default.createElement("td", {
        className: "px-2 py-2 text-slate-500"
    }, g.note || "\u2014"), o.default.createElement("td", {
        className: `${c} text-slate-900 font-semibold`
    }, s(g.amount))))), o.default.createElement("tfoot", null, o.default.createElement("tr", null, o.default.createElement("td", {
        className: "px-2 py-2 text-xs font-medium text-slate-500 border-t border-slate-300",
        colSpan: 2
    }, "Total dus"), o.default.createElement("td", {
        className: `${c} border-t border-slate-300 text-slate-900 font-semibold`
    }, s(f))))), o.default.createElement("div", {
        className: "rounded-xl border px-3.5 py-3 mt-3",
        style: p > 0 ? {
            background: "var(--accent-soft)",
            borderColor: "var(--accent-line)"
        } : {
            background: "var(--ok-soft)",
            borderColor: "var(--ok-line)"
        }
    }, o.default.createElement("div", {
        className: "flex items-center justify-between gap-2"
    }, o.default.createElement("div", {
        className: "min-w-0"
    }, o.default.createElement("div", {
        className: "text-sm font-medium",
        style: {
            color: p > 0 ? "var(--accent-ink)" : "var(--ok)"
        }
    }, p > 0 ? "Mai ai de dus la \u0219coal\u0103" : "Ai dus tot"), o.default.createElement("div", {
        className: "text-xs text-slate-500 mt-0.5"
    }, "De la \xEEnceput: \xEEncasat de tine ", s(Ef(e)), " \xB7 dus ", s(gu(e.varsaminte)))), o.default.createElement("span", {
        className: "font-mono-time text-lg font-semibold shrink-0",
        style: {
            color: p > 0 ? "var(--accent-ink)" : "var(--ok)"
        }
    }, s(Math.abs(p))))), o.default.createElement("div", {
        className: "mt-5 space-y-2 fara-print"
    }, o.default.createElement("button", {
        onClick: () => {
            try {
                window.print()
            } catch {}
        },
        className: "w-full py-3 rounded-xl bg-slate-900 text-white font-medium text-sm flex items-center justify-center gap-2"
    }, o.default.createElement(fa, {
        size: 15
    }), "Salveaz\u0103 ca PDF"), o.default.createElement("button", {
        onClick: r,
        className: "w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm"
    }, "\xCEnchide")))))
}

function Yk({
    data: n,
    onUpdateSettings: e,
    onUpdateRateTypes: t,
    onUpdateEmployerSettings: a,
    onUpdateWorkingDaysOverride: r,
    onEditPayment: i,
    onUpdateVarsaminte: s
}) {
    let [l, u] = (0, o.useState)(() => {
        let q = new Date;
        return `${q.getFullYear()}-${Da(q.getMonth()+1)}`
    }), [d, f] = (0, o.useState)(null), [p, c] = (0, o.useState)(null), [m, g] = (0, o.useState)(null), [v, w] = (0, o.useState)(null), [x, h] = (0, o.useState)(!1), [iasProven, iasVeziProven] = (0, o.useState)(!1), y = Ww(n.sessions, n.settings, l), _ = JA(n.sessions, l, n.settings), b = (() => {
        let [q, de] = l.split("-").map(Number);
        return Gw(q, de - 1)
    })(), M = n.settings.workingDaysOverrides && n.settings.workingDaysOverrides[l], S = M != null && M !== "", k = n.students.reduce((q, de) => q + (de.payments || []).filter(ge => (ge.date || "").startsWith(l) && ge.collector !== "school").reduce((ge, ye) => ge + (Number(ye.amount) || 0), 0), 0), E = n.students.reduce((q, de) => q + (de.payments || []).filter(ge => (ge.date || "").startsWith(l) && ge.collector === "school").reduce((ge, ye) => ge + (Number(ye.amount) || 0), 0), 0), B = n.students.flatMap(q => (q.payments || []).filter(de => (de.date || "").startsWith(l)).map(de => ({
        ...de,
        student: q.name,
        studentId: q.id
    }))).sort((q, de) => (de.date || "").localeCompare(q.date || "")), $ = n.students.reduce((q, de) => q + Math.max(0, Hw(de, n.sessions, n.settings)), 0);

    function G(q) {
        let [de, ge] = l.split("-").map(Number), ye = new Date(de, ge - 1 + q, 1);
        u(`${ye.getFullYear()}-${Da(ye.getMonth()+1)}`)
    }
    let A = () => {
        let [q, de] = l.split("-").map(Number);
        return `${yo[de-1]} ${q}`
    };

    function O() {
        let q = d?.name?.trim();
        if (!q) return;
        let de = Number(d.price) || 0;
        d.id ? t(n.settings.rateTypes.map(ge => ge.id === d.id ? {
            ...ge,
            name: q,
            price: de
        } : ge)) : t([...n.settings.rateTypes, {
            id: Vt("rate"),
            name: q,
            price: de
        }]), f(null)
    }

    function N(q) {
        t(n.settings.rateTypes.filter(de => de.id !== q))
    }

    function C() {
        a({
            baseRate: Number(p.baseRate) || 0,
            overtimeRate: Number(p.overtimeRate) || 0,
            englishBaseRate: Number(p.englishBaseRate) || 0,
            englishOvertimeRate: Number(p.englishOvertimeRate) || 0,
            hoursPerDay: Number(p.hoursPerDay) || 8,
            hoursPerSession: Number(p.hoursPerSession) || 2
        }), c(null)
    }
    let iasRandLimba = (k, peste) => {
            let lim = k === "englishBase" || k === "englishOvertime" ? "en" : (k.match(/^l:(.+):(base|overtime)$/) || [])[1];
            return {
                key: k,
                label: (peste ? "Peste program" : "\xCEn program") + " \xB7 " + iasNumeLimba(n.settings, lim).toLowerCase(),
                count: _.rows[k] || 0,
                rate: _.rates[k] || 0,
                cls: "bg-sky-50 border-sky-200 text-sky-700",
                valCls: "text-sky-700"
            }
        },
        iasChei = Object.keys(_.rows).filter(k => k !== "base" && k !== "overtime"),
        W = [{
            key: "base",
            label: "\xCEn program",
            count: _.rows.base,
            rate: _.rates.base,
            cls: "bg-white border-slate-200 text-slate-700",
            valCls: "text-slate-900"
        }].concat(iasChei.filter(k => !/[Oo]vertime$/.test(k)).map(k => iasRandLimba(k, !1)), [{
            key: "overtime",
            label: "Peste program",
            count: _.rows.overtime,
            rate: _.rates.overtime,
            cls: "bg-amber-50 border-amber-200 text-amber-700",
            valCls: "text-amber-700"
        }], iasChei.filter(k => /[Oo]vertime$/.test(k)).map(k => iasRandLimba(k, !0))),
        X = q => `${(q||0).toLocaleString("ro-RO")} ${n.settings.currency}`,
        R = aS(n, l),
        K = Ef(n) - gu(n.varsaminte);

    function ne() {
        let q = Number(v.amount) || 0;
        if (q <= 0 || !v.date) return;
        let de = n.varsaminte || [];
        v.id ? s(de.map(ge => ge.id === v.id ? {
            ...ge,
            date: v.date,
            amount: q,
            note: (v.note || "").trim()
        } : ge)) : s([...de, {
            id: Vt("vars"),
            date: v.date,
            amount: q,
            note: (v.note || "").trim()
        }]), w(null)
    }
    let Y = [{
            id: "elevi",
            nume: "Detalii de la elevi",
            Icon: rr,
            rezumat: `\xEEncasat ${X(k)}`
        }, {
            id: "plati",
            nume: "Istoric pl\u0103\u021Bi",
            Icon: Bi,
            rezumat: B.length ? `${B.length} \xEEn ${A()}` : "nicio plat\u0103"
        }, {
            id: "varsaminte",
            nume: "Bani du\u0219i la \u0219coal\u0103",
            Icon: uo,
            rezumat: K > 0 ? `de dus ${X(K)}` : "dus tot"
        }, {
            id: "salariu",
            nume: "Detalii salariu",
            Icon: co,
            rezumat: `${_.totalSessions} \u0219edin\u021Be \xB7 prag ${_.threshold}`
        }, {
            id: "taxe",
            nume: "Taxe",
            Icon: ni,
            rezumat: `${ii(n.settings).length}`
        }, {
            id: "tarife",
            nume: "Tarife elevi",
            Icon: ka,
            rezumat: `${n.settings.rateTypes.length}`
        }],
        J = (Y.find(q => q.id === m) || {}).nume || "",
        z = () => m === "elevi" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
            className: "space-y-1.5 mb-3"
        }, Object.entries(y.byType).filter(([, q]) => q.count > 0).map(([q, de]) => o.default.createElement("div", {
            key: q,
            className: "flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm"
        }, o.default.createElement("span", {
            className: "text-slate-700"
        }, de.name, " ", o.default.createElement("span", {
            className: "text-slate-400"
        }, "\xD7", de.count)), q === "included" ? o.default.createElement("span", {
            className: "text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
        }, "achitat") : o.default.createElement("span", {
            className: "font-mono-time font-medium text-slate-900"
        }, X(de.count * de.price)))), y.otherCount > 0 && o.default.createElement("div", {
            className: "flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
        }, o.default.createElement("span", {
            className: "text-slate-500"
        }, "Alt instructor ", o.default.createElement("span", {
            className: "text-slate-400"
        }, "\xD7", y.otherCount)), o.default.createElement("span", {
            className: "text-xs text-slate-400"
        }, "doar eviden\u021B\u0103")), Object.values(y.byType).every(q => q.count === 0) && y.otherCount === 0 && o.default.createElement("div", {
            className: "text-center text-sm text-slate-400 py-4"
        }, "Nicio \u0219edin\u021B\u0103 efectuat\u0103 \xEEn aceast\u0103 lun\u0103.")), o.default.createElement("div", {
            className: "space-y-1.5"
        }, o.default.createElement("div", {
            className: "flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm"
        }, o.default.createElement("span", {
            className: "text-emerald-700 flex items-center gap-1.5"
        }, o.default.createElement(Bi, {
            size: 15
        }), "\xCEncasat de tine"), o.default.createElement("span", {
            className: "font-mono-time font-medium text-emerald-700"
        }, X(k))), E > 0 && o.default.createElement("div", {
            className: "flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
        }, o.default.createElement("span", {
            className: "text-slate-500"
        }, "Achitat direct la \u0219coal\u0103"), o.default.createElement("span", {
            className: "font-mono-time text-slate-500"
        }, X(E))), o.default.createElement("div", {
            className: "flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm"
        }, o.default.createElement("span", {
            className: "text-slate-700"
        }, "De recuperat (to\u021Bi elevii, total)"), o.default.createElement("span", {
            className: "font-mono-time font-medium text-slate-900"
        }, X($))))) : m === "plati" ? B.length === 0 ? o.default.createElement("div", {
            className: "text-sm text-slate-400 text-center py-4"
        }, "Nicio plat\u0103 \xEEnregistrat\u0103 \xEEn ", A(), ".") : o.default.createElement("div", {
            className: "space-y-1.5"
        }, B.map(q => o.default.createElement("button", {
            key: q.id,
            onClick: () => {
                g(null), i(q.studentId, q)
            },
            className: "w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-left"
        }, o.default.createElement("span", {
            className: "min-w-0"
        }, o.default.createElement("span", {
            className: "block text-sm text-slate-800 truncate"
        }, q.student), o.default.createElement("span", {
            className: "block text-xs text-slate-400"
        }, q.date ? qe(q.date) : "\u2014", q.collector === "school" ? " \xB7 la \u0219coal\u0103" : "")), o.default.createElement("span", {
            className: "flex items-center gap-2 shrink-0"
        }, o.default.createElement("span", {
            className: `font-mono-time text-sm font-medium ${q.collector==="school"?"text-slate-500":"text-emerald-700"}`
        }, X(Number(q.amount) || 0)), o.default.createElement(ka, {
            size: 14,
            className: "text-slate-300"
        }))))) : m === "varsaminte" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
            className: "rounded-xl border px-3.5 py-3 mb-3",
            onClick: () => iasVeziProven(!0),
            role: "button",
            tabIndex: 0,
            style: K > 0 ? {
                background: "var(--accent-soft)",
                borderColor: "var(--accent-line)"
            } : {
                background: "var(--ok-soft)",
                borderColor: "var(--ok-line)"
            }
        }, o.default.createElement("div", {
            className: "flex items-center justify-between gap-2"
        }, o.default.createElement("div", {
            className: "min-w-0"
        }, o.default.createElement("div", {
            className: "text-sm font-medium",
            style: {
                color: K > 0 ? "var(--accent-ink)" : "var(--ok)"
            }
        }, K > 0 ? "Mai ai de dus la \u0219coal\u0103" : "Ai dus tot", o.default.createElement("span", {
            className: "ml-1.5 text-xs font-normal text-slate-400"
        }, "\u2014 vezi de unde vin")), o.default.createElement("div", {
            className: "text-xs text-slate-500 mt-0.5"
        }, "De la \xEEnceput: \xEEncasat ", X(Ef(n)), " \xB7 dus ", X(gu(n.varsaminte)))), o.default.createElement("span", {
            className: "font-mono-time text-lg font-semibold shrink-0",
            style: {
                color: K > 0 ? "var(--accent-ink)" : "var(--ok)"
            }
        }, X(Math.abs(K))))), v ? o.default.createElement("div", {
            className: "bg-slate-50 rounded-xl p-3.5 mb-3"
        }, o.default.createElement("div", {
            className: "grid grid-cols-2 gap-3"
        }, o.default.createElement(xe, {
            label: "Data",
            required: !0
        }, o.default.createElement("input", {
            type: "date",
            className: ie,
            value: v.date,
            onChange: q => w({
                ...v,
                date: q.target.value
            })
        })), o.default.createElement(xe, {
            label: "Sum\u0103",
            required: !0
        }, o.default.createElement("input", {
            type: "number",
            min: "0",
            inputMode: "decimal",
            className: ie,
            value: v.amount,
            onChange: q => w({
                ...v,
                amount: q.target.value
            })
        }))), o.default.createElement(xe, {
            label: "Men\u021Biune"
        }, o.default.createElement("input", {
            className: ie,
            value: v.note || "",
            onChange: q => w({
                ...v,
                note: q.target.value
            }),
            placeholder: "Ex: chitan\u021Ba 128, pentru grupa 12"
        })), o.default.createElement("div", {
            className: "flex gap-2"
        }, o.default.createElement("button", {
            onClick: () => w(null),
            className: "flex-1 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-600"
        }, "Renun\u021B\u0103"), o.default.createElement("button", {
            onClick: ne,
            className: "flex-1 py-2.5 rounded-lg bg-slate-900 text-white text-sm"
        }, "Salveaz\u0103")), v.id && o.default.createElement("button", {
            onClick: () => {
                s((n.varsaminte || []).filter(q => q.id !== v.id)), w(null)
            },
            className: "w-full mt-2 py-2 rounded-lg border text-xs",
            style: {
                borderColor: "var(--bad-line)",
                color: "var(--bad)"
            }
        }, "\u0218terge v\u0103rs\u0103m\xE2ntul")) : o.default.createElement("button", {
            onClick: () => w({
                date: Be(),
                amount: "",
                note: ""
            }),
            className: "w-full py-2.5 mb-3 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
        }, o.default.createElement(cn, {
            size: 14
        }), "Am dus bani la \u0219coal\u0103"), o.default.createElement("div", {
            className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
        }, "\xCEn ", A()), R.length === 0 ? o.default.createElement("div", {
            className: "text-sm text-slate-400 text-center py-3"
        }, "Niciun v\u0103rs\u0103m\xE2nt \xEEn aceast\u0103 lun\u0103.") : o.default.createElement("div", {
            className: "space-y-1.5"
        }, R.map(q => o.default.createElement("button", {
            key: q.id,
            onClick: () => w({
                ...q
            }),
            className: "w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-left"
        }, o.default.createElement("span", {
            className: "min-w-0"
        }, o.default.createElement("span", {
            className: "block text-sm text-slate-800"
        }, q.date ? qe(q.date) : "\u2014"), q.note ? o.default.createElement("span", {
            className: "block text-xs text-slate-400 truncate"
        }, q.note) : null), o.default.createElement("span", {
            className: "flex items-center gap-2 shrink-0"
        }, o.default.createElement("span", {
            className: "font-mono-time text-sm font-medium text-slate-900"
        }, X(Number(q.amount) || 0)), o.default.createElement(ka, {
            size: 14,
            className: "text-slate-300"
        }))))), o.default.createElement("p", {
            className: "text-xs text-slate-400 mt-3"
        }, '\u201EDe dus" e diferen\u021Ba dintre tot ce ai \xEEncasat tu de la elevi \u0219i tot ce ai dus la \u0219coal\u0103. Banii pe care elevii i-au achitat direct la \u0219coal\u0103 nu intr\u0103 aici \u2014 n-au trecut prin m\xE2na ta.')) : m === "salariu" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
            className: "space-y-1.5 mb-3"
        }, W.filter(q => q.count > 0).map(q => o.default.createElement("div", {
            key: q.key,
            className: `flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm ${q.cls}`
        }, o.default.createElement("span", null, q.label, " ", o.default.createElement("span", {
            className: "opacity-60"
        }, "\xD7", q.count)), o.default.createElement("span", {
            className: `font-mono-time font-medium ${q.valCls}`
        }, X(q.count * q.rate)))), _.totalSessions === 0 && o.default.createElement("div", {
            className: "text-center text-sm text-slate-400 py-2"
        }, "Nicio \u0219edin\u021B\u0103 efectuat\u0103 \xEEn aceast\u0103 lun\u0103."), y.otherCount > 0 && o.default.createElement("div", {
            className: "flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
        }, o.default.createElement("span", {
            className: "text-slate-500"
        }, "Alt instructor ", o.default.createElement("span", {
            className: "text-slate-400"
        }, "\xD7", y.otherCount)), o.default.createElement("span", {
            className: "text-xs text-slate-400"
        }, "nu intr\u0103 la salariu"))), o.default.createElement("div", {
            className: "text-xs text-slate-400 mb-3 px-1"
        }, "Prag: ", _.threshold, " \u0219edin\u021Be (", _.workingDays, " zile lucr\u0103toare \xD7 ", _.hoursPerDay, " ore \xF7 ", _.hoursPerSession, " ore/\u0219edin\u021B\u0103)"), o.default.createElement("div", {
            className: "flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 mb-3"
        }, o.default.createElement("div", {
            className: "flex-1"
        }, o.default.createElement("div", {
            className: "text-sm text-slate-800"
        }, "Zile lucr\u0103toare ", A()), o.default.createElement("div", {
            className: "text-xs text-slate-400"
        }, S ? "valoare ajustat\u0103 manual" : "calculat automat (zile L\u2013V)")), o.default.createElement("input", {
            type: "number",
            min: "0",
            max: "31",
            value: S ? M : b,
            onChange: q => r(l, q.target.value),
            className: "w-16 text-center text-sm border border-slate-200 rounded-lg py-1.5"
        })), p ? o.default.createElement("div", {
            className: "bg-slate-50 rounded-xl p-3.5"
        }, o.default.createElement("div", {
            className: "grid grid-cols-2 gap-x-3"
        }, o.default.createElement(xe, {
            label: "Tarif de baz\u0103 / \u0219edin\u021B\u0103"
        }, o.default.createElement("input", {
            type: "number",
            min: "0",
            className: ie,
            value: p.baseRate,
            onChange: q => c({
                ...p,
                baseRate: q.target.value
            })
        })), o.default.createElement(xe, {
            label: "Tarif peste program"
        }, o.default.createElement("input", {
            type: "number",
            min: "0",
            className: ie,
            value: p.overtimeRate,
            onChange: q => c({
                ...p,
                overtimeRate: q.target.value
            })
        })), o.default.createElement(xe, {
            label: "Ore lucr\u0103toare / zi"
        }, o.default.createElement("input", {
            type: "number",
            min: "1",
            max: "24",
            className: ie,
            value: p.hoursPerDay,
            onChange: q => c({
                ...p,
                hoursPerDay: q.target.value
            })
        })), o.default.createElement(xe, {
            label: "Ore / \u0219edin\u021B\u0103 (salariu)"
        }, o.default.createElement("input", {
            type: "number",
            min: "0.5",
            step: "0.5",
            className: ie,
            value: p.hoursPerSession,
            onChange: q => c({
                ...p,
                hoursPerSession: q.target.value
            })
        }))), o.default.createElement("div", {
            className: "flex gap-2"
        }, o.default.createElement("button", {
            onClick: () => c(null),
            className: "flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600"
        }, "Renun\u021B\u0103"), o.default.createElement("button", {
            onClick: C,
            className: "flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm"
        }, "Salveaz\u0103"))) : o.default.createElement("button", {
            onClick: () => c({
                ...sr.employer,
                ...n.settings.employer
            }),
            className: "w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
        }, o.default.createElement(ka, {
            size: 14
        }), "Editeaz\u0103 tarife angajator"), o.default.createElement(IasLimbiTarife, {
            setari: n.settings,
            onSchimba: q => e(iasSetariCuLimbi(n.settings, q))
        })) : m === "taxe" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("p", {
            className: "text-xs text-slate-400 mb-2"
        }, "Se adaug\u0103 la datoria elevului cu butoanele +/\u2212 de pe cardul lui."), o.default.createElement($A, {
            feeTypes: ii(n.settings),
            currency: n.settings.currency,
            onChange: q => e({
                feeTypes: q
            })
        })) : m === "tarife" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("p", {
            className: "text-xs text-slate-400 mb-2"
        }, "Orele incluse sunt achitate prin \u0219colarizare \u2014 nu se adun\u0103 la datoria elevului."), o.default.createElement("div", {
            className: "space-y-1.5 mb-3"
        }, n.settings.rateTypes.map(q => o.default.createElement("div", {
            key: q.id,
            className: "flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200"
        }, o.default.createElement("button", {
            onClick: () => f({
                id: q.id,
                name: q.name,
                price: q.price
            }),
            className: "text-left flex-1 min-w-0"
        }, o.default.createElement("div", {
            className: "text-sm text-slate-800"
        }, q.name), o.default.createElement("div", {
            className: "font-mono-time text-xs text-slate-400"
        }, q.price, " ", n.settings.currency, " / \u0219edin\u021B\u0103")), o.default.createElement("button", {
            onClick: () => N(q.id),
            className: "p-1.5 text-slate-400 shrink-0"
        }, o.default.createElement(pa, {
            size: 15
        }))))), d ? o.default.createElement("div", {
            className: "bg-slate-50 rounded-xl p-3.5"
        }, o.default.createElement("input", {
            className: `${ie} mb-2`,
            placeholder: "Denumire tarif",
            value: d.name,
            onChange: q => f({
                ...d,
                name: q.target.value
            })
        }), o.default.createElement("input", {
            type: "number",
            min: "0",
            className: `${ie} mb-3`,
            placeholder: "Pre\u021B / \u0219edin\u021B\u0103",
            value: d.price,
            onChange: q => f({
                ...d,
                price: q.target.value
            })
        }), o.default.createElement("div", {
            className: "flex gap-2"
        }, o.default.createElement("button", {
            onClick: () => f(null),
            className: "flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600"
        }, "Renun\u021B\u0103"), o.default.createElement("button", {
            onClick: O,
            className: "flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm"
        }, "Salveaz\u0103"))) : o.default.createElement("button", {
            onClick: () => f({
                name: "",
                price: ""
            }),
            className: "w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
        }, o.default.createElement(cn, {
            size: 14
        }), "Tip de or\u0103 nou")) : null;
    return o.default.createElement("div", {
        className: "pb-4"
    }, o.default.createElement("div", {
        className: "px-4 pt-4 pb-1 flex items-center justify-between gap-2"
    }, o.default.createElement("h1", {
        className: "font-display text-xl font-semibold text-slate-900 uppercase tracking-wide"
    }, "Finan\u021Be"), o.default.createElement("button", {
        onClick: () => h(!0),
        className: "shrink-0 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-medium flex items-center gap-1.5"
    }, o.default.createElement(fa, {
        size: 14
    }), "Raport")), o.default.createElement("div", {
        className: "flex items-center justify-between px-4 mt-3 mb-3"
    }, o.default.createElement("button", {
        onClick: () => G(-1),
        className: "p-2 text-slate-400"
    }, o.default.createElement(ei, {
        size: 18
    })), o.default.createElement("span", {
        className: "text-sm font-medium text-slate-800 capitalize"
    }, A()), o.default.createElement("button", {
        onClick: () => G(1),
        className: "p-2 text-slate-400"
    }, o.default.createElement(un, {
        size: 18
    }))), o.default.createElement("div", {
        className: "px-4 grid grid-cols-2 gap-2 mb-3"
    }, o.default.createElement("div", {
        className: "bg-slate-900 rounded-2xl px-3 py-4 text-center"
    }, o.default.createElement("div", {
        className: "text-xs text-slate-400 uppercase tracking-wide mb-1"
    /* Aici stătea valoarea orelor suplimentare, care nu-ți spunea nimic
       folositor: banii îi urmărești mai jos, la încasări și la ce ai de dus la
       școală. În locul ei punem munca lunii față de pragul de la care se schimbă
       salariul — singurul număr care, privit la mijlocul lunii, te poate face să
       hotărăști altfel. */
    }, "\u0218edin\u021Be luna asta"), o.default.createElement("div", {
        className: "font-mono-time text-xl font-semibold text-white"
    }, _.totalSessions, _.threshold ? o.default.createElement("span", {
        className: "text-sm font-normal text-slate-400"
    }, " / ", _.threshold) : null), o.default.createElement("div", {
        className: "text-xs text-slate-400 mt-0.5"
    }, _.threshold
        ? (_.totalSessions >= _.threshold
            ? "prag atins"
            : `\xEEnc\u0103 ${_.threshold - _.totalSessions} p\xE2n\u0103 la prag`)
        : "efectuate"),
    _.threshold ? o.default.createElement("div", {
        className: "mt-2 rounded-full overflow-hidden",
        style: { height: 4, background: "rgba(255,255,255,.14)" }
    }, o.default.createElement("div", {
        style: {
            height: "100%",
            width: `${Math.min(100, Math.round(_.totalSessions / _.threshold * 100))}%`,
            background: _.totalSessions >= _.threshold ? "var(--ok)" : "var(--accent)",
            transition: "width .3s ease"
        }
    })) : null), o.default.createElement("div", {
        className: "bg-slate-900 rounded-2xl px-3 py-4 text-center"
    }, o.default.createElement("div", {
        className: "text-xs text-slate-400 uppercase tracking-wide mb-1"
    }, "Salariu"), o.default.createElement("div", {
        className: "font-mono-time text-xl font-semibold text-white"
    }, _.totalPay.toLocaleString("ro-RO")), o.default.createElement("div", {
        className: "text-xs text-slate-400 mt-0.5"
    }, n.settings.currency, " estimat"))), o.default.createElement("div", {
        className: "px-4 space-y-1.5"
    }, Y.map(q => {
        let de = q.Icon;
        return o.default.createElement("button", {
            key: q.id,
            onClick: () => g(q.id),
            className: "w-full flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3.5 py-3 text-left active:bg-slate-50"
        }, o.default.createElement(de, {
            size: 17,
            className: "text-slate-400 shrink-0"
        }), o.default.createElement("span", {
            className: "text-sm text-slate-800 flex-1 min-w-0 truncate"
        }, q.nume), o.default.createElement("span", {
            className: "text-xs text-slate-400 shrink-0 truncate",
            style: {
                maxWidth: "45%"
            }
        }, q.rezumat), o.default.createElement(un, {
            size: 16,
            className: "text-slate-300 shrink-0"
        }))
    })), o.default.createElement(oi, {
        open: !!m,
        onClose: () => {
            g(null), f(null), c(null), w(null)
        },
        title: `${J} \xB7 ${A()}`,
        layer: Wt.form
    }, z()), o.default.createElement(Xk, {
        open: x,
        data: n,
        monthKey: l,
        monthLabel: A(),
        onClose: () => h(!1)
    }), o.default.createElement(IasProvenienta, {
        open: iasProven,
        data: n,
        onClose: () => iasVeziProven(!1)
    }))
}

function Zk() {
    let [n, e] = (0, o.useState)(null);
    return (0, o.useEffect)(() => {
        let t = !0;
        return (async () => {
            let a = [],
                r = typeof window < "u" && window.location || {
                    protocol: ""
                };
            a.push({
                ok: r.protocol === "https:",
                t: `Adres\u0103 sigur\u0103: ${r.protocol?r.protocol.replace(":",""):"\u2014"}`
            });
            let i = async (l, u) => {
                try {
                    let d = await fetch(l, {
                        cache: "no-store"
                    });
                    a.push({
                        ok: d.ok,
                        t: `${u}: ${d.ok?"g\u0103sit":`lipse\u0219te (${d.status})`}`
                    })
                } catch {
                    a.push({
                        ok: !1,
                        t: `${u}: nu poate fi citit`
                    })
                }
            };
            if (await i("./manifest.json", "Fi\u0219ier de identitate"), await i("./icon-192.png", "Iconi\u021B\u0103 mic\u0103"), await i("./icon.png", "Iconi\u021B\u0103 mare"), await i("./sw.js", "Fi\u0219ier sw.js"), typeof navigator < "u" && "serviceWorker" in navigator) try {
                let l = await navigator.serviceWorker.getRegistration(),
                    u = !!(l && l.active);
                a.push({
                    ok: u,
                    t: `Lucr\u0103tor de fundal: ${u?"activ":l?"se instaleaz\u0103":"ne\xEEnregistrat"}`
                })
            } catch {
                a.push({
                    ok: !1,
                    t: "Lucr\u0103tor de fundal: eroare la verificare"
                })
            } else a.push({
                ok: !1,
                t: "Lucr\u0103tor de fundal: nesuportat aici"
            });
            let s = typeof window < "u" && window.__iasSW && window.__iasSW.eroare;
            s && a.push({
                ok: !1,
                t: `Motiv: ${String(s).slice(0,140)}`
            }), t && e(a)
        })(), () => {
            t = !1
        }
    }, []), o.default.createElement("div", null, !n && o.default.createElement("div", {
        className: "text-xs text-slate-400 py-2"
    }, "Se verific\u0103\u2026"), n && o.default.createElement("div", {
        className: "space-y-1.5"
    }, n.map((t, a) => o.default.createElement("div", {
        key: a,
        className: "flex items-start gap-2 text-xs"
    }, o.default.createElement("span", {
        className: "shrink-0 font-semibold",
        style: {
            color: t.ok ? "var(--ok)" : "var(--bad)"
        }
    }, t.ok ? "\u2713" : "\u2715"), o.default.createElement("span", {
        className: "text-slate-600"
    }, t.t))), o.default.createElement("p", {
        className: "text-xs text-slate-400 pt-1"
    }, 'Toate bifate \xEEnseamn\u0103 c\u0103 browserul \xEE\u021Bi poate oferi \u201EInstaleaz\u0103 aplica\u021Bia". Verificarea are sens doar pe varianta g\u0103zduit\u0103 de tine.')))
}
var If = "contact.ias.auto@gmail.com";

function Jk(n) {
    let e = typeof navigator < "u" && navigator || {},
        t = typeof window < "u" && window.matchMedia ? window.matchMedia("(display-mode: standalone)").matches : !1;
    return [`Versiune: ${mo}`, `Instalat\u0103 pe telefon: ${t?"da":"nu (deschis\u0103 \xEEn browser)"}`, `Elevi: ${n.students.length} \xB7 \u0218edin\u021Be: ${n.sessions.length}`, `Ecran: ${typeof window<"u"?`${window.innerWidth}\xD7${window.innerHeight}`:"\u2014"}`, `Limb\u0103: ${e.language||"\u2014"}`, `Dispozitiv: ${String(e.userAgent||"\u2014").slice(0,160)}`, `Data: ${new Date().toLocaleString("ro-RO")}`].join(`
`)
}

function vo(n, e) {
    return `mailto:${If}?subject=${encodeURIComponent(n)}&body=${encodeURIComponent(e)}`
}
var Qk = ["Acas\u0103", "Calendar", "Fi\u0219a unei \u0219edin\u021Be", "Elevi", "Fi\u0219a unui elev", "Raport elevi", "Plan", "Finan\u021Be", "Raport bani", "Set\u0103ri", "Backup", "Mesaje c\u0103tre elevi", "La pornire / acces", "Altundeva"];

function Kk({
    data: n
}) {
    let [e, t] = (0, o.useState)(!1), [a, r] = (0, o.useState)(""), i = Jk(n), s = `Unde s-a \xEEnt\xE2mplat: ${a||"(nespecificat)"}

Scrie pe scurt ce s-a \xEEnt\xE2mplat:


Ce f\u0103ceai chiar \xEEnainte?


--- date tehnice, te rog nu le \u0219terge ---
${i}`, l = `Ce \u021Bi-ar pl\u0103cea s\u0103 fac\u0103 aplica\u021Bia:


--- date tehnice ---
${i}`;
    async function u() {
        try {
            await navigator.clipboard.writeText(If), t(!0), setTimeout(() => t(!1), 2e3)
        } catch {}
    }
    return o.default.createElement("div", {
        className: "space-y-2.5"
    }, o.default.createElement(xe, {
        label: "Unde ai \xEEnt\xE2lnit problema?"
    }, o.default.createElement("select", {
        className: ie,
        value: a,
        onChange: d => r(d.target.value)
    }, o.default.createElement("option", {
        value: ""
    }, "Alege locul din aplica\u021Bie"), Qk.map(d => o.default.createElement("option", {
        key: d,
        value: d
    }, d)))), o.default.createElement("a", {
        href: vo(`Problem\u0103 \xB7 ${a||"nespecificat"} \xB7 ${mo}`, s),
        style: {
            touchAction: "manipulation"
        },
        className: "w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-2"
    }, o.default.createElement(Xn, {
        size: 15
    }), "Raporteaz\u0103 o problem\u0103"), o.default.createElement("a", {
        href: vo(`Sugestie \xB7 ${mo}`, l),
        style: {
            touchAction: "manipulation"
        },
        className: "w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-2"
    }, o.default.createElement(Na, {
        size: 15
    }), "Trimite o sugestie"), o.default.createElement("button", {
        onClick: u,
        className: "w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center justify-center gap-2"
    }, o.default.createElement(ti, {
        size: 13
    }), e ? "Adres\u0103 copiat\u0103 \u2713" : If), o.default.createElement("p", {
        className: "text-xs text-slate-400"
    }, "Mesajul se deschide \xEEn aplica\u021Bia ta de e-mail, cu versiunea \u0219i datele telefonului completate \u2014 ele m\u0103 ajut\u0103 s\u0103 g\u0103sesc cauza. Numele elevilor t\u0103i nu pleac\u0103 nic\u0103ieri. Dac\u0103 problema e cu datele, ata\u0219eaz\u0103 \u0219i backup-ul desc\u0103rcat mai sus."))
}

function e3({
    data: n,
    onUpdateSettings: e,
    onUpdateLocations: t,
    onExport: a,
    onImport: r,
    onImportStudent: i,
    onResetAll: s,
    skin: l,
    licenta: u,
    stLic: d,
    licOcupat: f,
    onVerificaLicenta: p,
    onSchimbaCod: c,
    onDespre: m,
    onNoutati: g,
    onLicente: v,
    onTrimiteBackup: w,
    onTrimiteCalendar: x
}) {
    let [iasCauta, iasPuneCauta] = (0, o.useState)(""),
        [iasGrup, iasPuneGrup] = (0, o.useState)(iasSetariTinut.grup);
    let [h, y] = (0, o.useState)(!1), [_, b] = (0, o.useState)(null), [M, S] = (0, o.useState)(""), k = (0, o.useRef)(null), [E, B] = (0, o.useState)(""), [$, G] = (0, o.useState)(null), [A, O] = (0, o.useState)(null), [N, C] = (0, o.useState)(!1), [W, X] = (0, o.useState)(""), [R, K] = (0, o.useState)(!1), [ne, Y] = (0, o.useState)(null), J = n.settings, z = Array.from({
        length: 48
    }, (H, L) => L * 30), q = [{
        id: "system",
        label: "Sistem",
        Icon: lo
    }, {
        id: "light",
        label: "Zi",
        Icon: Hi
    }, {
        id: "dark",
        label: "Noapte",
        Icon: zi
    }];

    function de(H) {
        let L = J.workDays.includes(H);
        e({
            workDays: L ? J.workDays.filter(T => T !== H) : [...J.workDays, H].sort()
        })
    }

    function ge() {
        let H = _?.name?.trim();
        if (!H) return;
        let L = J.locations || [],
            T = Fn(_) ? {
                lat: _.lat,
                lng: _.lng
            } : {
                lat: null,
                lng: null
            };
        _.id ? t(L.map(j => j.id === _.id ? {
            ...j,
            name: H,
            ...T
        } : j)) : t([...L, {
            id: Vt("loc"),
            name: H,
            ...T
        }]), b(null), S("")
    }
    async function ye() {
        S("caut");
        try {
            let H = await jw();
            b(L => ({
                ...L,
                ...H
            })), S("")
        } catch (H) {
            S(H && H.code === 1 ? "refuzat" : "eroare")
        }
    }

    function Ne(H) {
        B("");
        try {
            let L = JSON.parse(H);
            if (L.kind === Rw && L.student) {
                O(L);
                return
            }
            if (!Array.isArray(L.students) || !Array.isArray(L.sessions)) throw new Error("structura");
            G(Uw(L))
        } catch {
            B("Acesta nu pare a fi un fi\u0219ier valid al aplica\u021Biei.")
        }
    }

    function ce(H) {
        let L = H.target.files && H.target.files[0];
        if (!L) return;
        let T = new FileReader;
        T.onload = () => Ne(String(T.result || "")), T.onerror = () => B("Nu am putut citi fi\u0219ierul."), T.readAsText(L), H.target.value = ""
    }
    let ze = po.filter(H => J.workDays.includes(H)).map(H => xu[H].slice(0, 2)).join(" ") || "niciuna",
        re = (() => {
            try {
                let H = window.localStorage.getItem(x0);
                return H ? Math.round((Ue(Be()).getTime() - Ue(H).getTime()) / 864e5) : null
            } catch {
                return null
            }
        })(),
        se = [{
            id: "vehicul",
            nume: "Vehiculul din antet",
            Icon: ar,
            rezumat: (Zn[J.vehicul] || Zn.hatchback).nume
        }, {
            id: "tema",
            nume: "Tem\u0103",
            Icon: Hi,
            rezumat: (q.find(H => H.id === (J.theme || "system")) || {}).label
        }, {
            id: "program",
            nume: "Program de lucru",
            Icon: Kr,
            rezumat: `${ze} \xB7 ${Se(J.startMin)}\u2013${Se(J.endMin)}`
        }, {
            id: "elevi",
            nume: "Elevi noi \u0219i moned\u0103",
            Icon: rr,
            rezumat: `${J.defaultWeeklyLimit}/s\u0103pt \xB7 ${J.currency}`
        }, {
            id: "euSiScoala",
            nume: "Numele t\u0103u \u0219i \u0219coala",
            Icon: ni,
            rezumat: [J.numeleTau, J.numeScoala].filter(Boolean).join(" \xB7 ") || "necompletat"
        }, {
            id: "programElevi",
            nume: "Programul trimis de elevi",
            Icon: ai,
            rezumat: J.programElevi ? "pornit" : "oprit"
        }, {
            id: "locatii",
            nume: "Loca\u021Bii de start",
            Icon: dn,
            rezumat: (J.locations || []).length ? `${(J.locations||[]).length}` : "niciuna"
        }, {
            id: "masini",
            nume: "Ma\u0219inile mele",
            Icon: ar,
            rezumat: iasMasini(J).length ? `${iasMasini(J).length}` : "niciuna"
        }, {
            id: "amintiri",
            nume: "Amintiri pe telefon",
            Icon: Kr,
            rezumat: [J.amSeara !== !1 && "seara", J.amDimineata !== !1 && "7:00", J.amDouaOre !== !1 && "2h"].filter(Boolean).join(" \xB7 ") || "niciuna"
        }, {
            id: "backup",
            nume: "Backup \u0219i date",
            Icon: fa,
            rezumat: re == null ? "niciodat\u0103" : re === 0 ? "azi" : `acum ${iS(re)}`
        }, ...d && d.rol === "proprietar" ? [{
            id: "licente",
            nume: "Licen\u021Be",
            Icon: ni,
            rezumat: `${(n.licente||[]).length}`,
            direct: v
        }] : [], {
            id: "acces",
            nume: "Acces",
            Icon: lo,
            rezumat: u && u.rol === "proprietar" ? "permanent" : d && d.blocat ? "expirat" : d && d.tipNume || "\u2014"
        }, {
            id: "ajutor",
            nume: "Ajutor \u0219i feedback",
            Icon: ai,
            rezumat: ""
        }, {
            id: "despre",
            nume: "Despre aplica\u021Bie",
            Icon: ar,
            rezumat: ri
        }],
        fe = (se.find(H => H.id === ne) || {}).nume || "",
        he = () => {
            if (ne === "vehicul") {
                let H = Zn[J.vehicul] || Zn.hatchback,
                    L = Object.entries(h0).filter(([, T]) => T.categorii.includes(H.categorie));
                return o.default.createElement(o.default.Fragment, null, o.default.createElement(xe, {
                    label: "Vehiculul"
                }, o.default.createElement("select", {
                    className: ie,
                    value: J.vehicul || "hatchback",
                    onChange: T => e({
                        vehicul: T.target.value,
                        remorca: ""
                    })
                }, Object.entries(Zn).map(([T, j]) => o.default.createElement("option", {
                    key: T,
                    value: T
                }, j.nume, " \xB7 categoria ", j.categorie)))), o.default.createElement(xe, {
                    label: "Remorc\u0103"
                }, o.default.createElement("select", {
                    className: ie,
                    value: J.remorca || "",
                    onChange: T => e({
                        remorca: T.target.value
                    })
                }, o.default.createElement("option", {
                    value: ""
                }, "F\u0103r\u0103 remorc\u0103"), L.map(([T, j]) => o.default.createElement("option", {
                    key: T,
                    value: T
                }, j.nume)))), o.default.createElement("span", {
                    className: "block text-xs font-medium text-slate-500 mb-1.5"
                }, "Culoarea ma\u0219inii"), o.default.createElement("div", {
                    className: "flex flex-wrap gap-2 mb-3.5"
                }, IAS_CULORI.map(c => {
                    let ales = (J.culoareVehicul || "argintiu") === c.id;
                    return o.default.createElement("button", {
                        key: c.id,
                        type: "button",
                        "aria-label": c.nume,
                        title: c.nume,
                        onClick: () => e({ culoareVehicul: c.id }),
                        style: {
                            width: 38, height: 38, borderRadius: 12,
                            background: "#" + c.cod.toString(16).padStart(6, "0"),
                            border: ales ? "3px solid var(--accent)" : "1px solid var(--line-2)",
                            boxShadow: ales ? "0 0 0 3px var(--accent-soft)" : "none",
                            transition: "border-color .15s ease"
                        }
                    })
                })), o.default.createElement("p", {
                    className: "text-xs text-slate-400 -mt-2"
                }, L.length ? `Se arat\u0103 doar remorcile potrivite categoriei ${H.categorie}. Caseta \u0218COALA r\u0103m\xE2ne pe orice vehicul alegi.` : `Pentru categoria ${H.categorie} nu avem \xEEnc\u0103 o remorc\u0103.`))
            }
            return ne === "tema" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
                className: "flex gap-1.5 mb-1.5"
            }, q.map(({
                id: H,
                label: L,
                Icon: T
            }) => {
                let j = (J.theme || "system") === H;
                return o.default.createElement("button", {
                    key: H,
                    onClick: () => e({
                        theme: H
                    }),
                    className: `flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border ${j?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200"}`
                }, o.default.createElement(T, {
                    size: 14
                }), L)
            })), o.default.createElement("p", {
                className: "text-xs text-slate-400"
            }, (J.theme || "system") === "system" ? `Urmeaz\u0103 setarea telefonului \u2014 acum: ${l==="dark"?"\xEEntunecat":"luminos"}.` : "Tem\u0103 fixat\u0103 manual, indiferent de setarea telefonului.")) : ne === "program" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("span", {
                className: "block text-xs font-medium text-slate-500 mb-1.5"
            }, "Zile de lucru"), o.default.createElement("div", {
                className: "flex gap-1.5 mb-4"
            }, po.map(H => o.default.createElement("button", {
                key: H,
                onClick: () => de(H),
                className: `flex-1 py-2.5 rounded-xl text-xs font-medium border ${J.workDays.includes(H)?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200"}`
            }, xu[H]))), o.default.createElement("div", {
                className: "grid grid-cols-2 gap-3"
            }, o.default.createElement(xe, {
                label: "Ora de start"
            }, o.default.createElement("select", {
                className: ie,
                value: J.startMin,
                onChange: H => e({
                    startMin: Number(H.target.value)
                })
            }, z.map(H => o.default.createElement("option", {
                key: H,
                value: H
            }, Se(H))))), o.default.createElement(xe, {
                label: "Ora de final"
            }, o.default.createElement("select", {
                className: ie,
                value: J.endMin,
                onChange: H => e({
                    endMin: Number(H.target.value)
                })
            }, z.map(H => o.default.createElement("option", {
                key: H,
                value: H
            }, Se(H)))))),
            /* Programul de bază e cel de sus. Sub el, fiecare zi poate avea
               orele ei: de luni până vineri începi mai târziu, dacă ai de dus
               copilul undeva, iar sâmbăta poți porni cu noaptea în cap. Zilele
               pe care nu le atingi merg pe programul de bază. */
            o.default.createElement(Jn, {
                title: "Ore altfel, pe zile",
                summary: (() => {
                    let iasCate = po.filter(H => ((J.programZile || {})[H])).length;
                    return iasCate ? `${iasCate} ${iasCate === 1 ? "zi" : "zile"}` : "toate la fel"
                })()
            }, o.default.createElement("p", { className: "text-xs text-slate-400 mb-3" },
                "Zilele nebifate merg pe programul de mai sus. Bifeaz\u0103 doar ce e altfel."),
                po.filter(H => J.workDays.includes(H)).map(H => {
                    let iasPe = (J.programZile || {})[H],
                        iasAre = !!iasPe,
                        iasS = iasAre ? Number(iasPe.startMin) : J.startMin,
                        iasE = iasAre ? Number(iasPe.endMin) : J.endMin,
                        iasPune = (chei) => {
                            let iasT = { ...(J.programZile || {}) };
                            if (chei === null) delete iasT[H];
                            else iasT[H] = { startMin: iasS, endMin: iasE, ...chei };
                            e({ programZile: iasT })
                        };
                    return o.default.createElement("div", {
                        key: H,
                        className: "rounded-xl px-3 py-2.5 mb-2",
                        style: {
                            background: iasAre ? "var(--accent-soft)" : "var(--surface)",
                            border: `1px solid ${iasAre ? "var(--accent-line)" : "var(--line)"}`
                        }
                    },
                        o.default.createElement("div", { className: "flex items-center gap-2" },
                            o.default.createElement("button", {
                                onClick: () => iasPune(iasAre ? null : {}),
                                className: "text-xs font-medium px-2.5 py-1.5 rounded-lg shrink-0",
                                style: {
                                    minWidth: 54,
                                    background: iasAre ? "var(--accent)" : "var(--surface-2)",
                                    color: iasAre ? "#fff" : "var(--muted-2)",
                                    border: `1px solid ${iasAre ? "var(--accent)" : "var(--line)"}`
                                }
                            }, Tw[H]),
                            iasAre
                                ? o.default.createElement("div", { className: "flex items-center gap-1.5 flex-1" },
                                    o.default.createElement("select", {
                                        className: ie + " text-xs", style: { padding: "6px 8px" },
                                        value: iasS,
                                        onChange: (ev) => iasPune({ startMin: Number(ev.target.value) })
                                    }, z.map(L => o.default.createElement("option", { key: L, value: L }, Se(L)))),
                                    o.default.createElement("span", { className: "text-xs text-slate-400" }, "\u2013"),
                                    o.default.createElement("select", {
                                        className: ie + " text-xs", style: { padding: "6px 8px" },
                                        value: iasE,
                                        onChange: (ev) => iasPune({ endMin: Number(ev.target.value) })
                                    }, z.map(L => o.default.createElement("option", { key: L, value: L }, Se(L)))))
                                : o.default.createElement("span", {
                                    className: "text-xs flex-1", style: { color: "var(--muted-2)" }
                                }, "ca programul de baz\u0103 \xB7 ", Se(J.startMin), "\u2013", Se(J.endMin))))
                })),
            /* Rezerva de examen: oprită din pornire, fiindcă nu e treaba
               aplicației să hotărască în locul instructorului. Legea cere ca
               elevul să aibă toate ședințele efectuate, iar cine vrea totuși
               să-și țină câteva ore pentru zilele dinaintea examenului o
               pornește el, cu câte îi convin. */
            o.default.createElement("div", {
                className: "rounded-xl px-3.5 py-3 mb-3.5",
                style: {
                    background: J.rezervaActiva ? "var(--accent-soft)" : "var(--surface)",
                    border: `1px solid ${J.rezervaActiva ? "var(--accent-line)" : "var(--line)"}`
                }
            },
                o.default.createElement("label", { className: "flex items-center gap-3" },
                    o.default.createElement("input", {
                        type: "checkbox",
                        checked: !!J.rezervaActiva,
                        onChange: () => e({ rezervaActiva: !J.rezervaActiva }),
                        className: "w-4 h-4 accent-amber-500 shrink-0"
                    }),
                    o.default.createElement("span", { className: "text-sm flex-1", style: { color: "var(--text)" } },
                        "P\u0103streaz\u0103 \u0219edin\u021Be pentru examen")),
                o.default.createElement("p", {
                    className: "text-xs mt-1.5", style: { color: "var(--muted-2)" }
                }, "Oprit\u0103, planul programeaz\u0103 toate orele elevului, ca p\u0103n\u0103 la examen s\u0103 le aib\u0103 pe toate efectuate. Pornit\u0103, las\u0103 ultimele c\xE2teva neprogramate, pentru zilele dinaintea examenului."),
                J.rezervaActiva ? o.default.createElement("div", { className: "mt-3" },
                    o.default.createElement(xe, {
                        label: "C\xE2te \u0219edin\u021Be p\u0103strezi"
                    }, o.default.createElement(IasNumar, {
                        value: iasRezerva(J) || Nf,
                        min: 1,
                        max: 10,
                        className: ie,
                        onCommit: H => e({ rezervaExamen: H })
                    }))) : null),
            /* După câte ședințe îți dau de știre că elevul poate merge la sală.
               Zece e pragul legal, dar unul vrea să afle mai devreme, ca să
               apuce să prindă o dată, altul abia după ce l-a mai plimbat. */
            o.default.createElement(xe, {
                label: "Gata de teoretic dup\u0103"
            }, o.default.createElement(IasNumar, {
                value: iasPragSala(J),
                min: 1,
                max: 40,
                className: ie,
                onCommit: H => e({ pragTeoretic: H })
            }), o.default.createElement(IasInfo, {
                text: "De la at\xE2tea \u0219edin\u021Be efectuate \xEEncolo, elevul prime\u0219te semnul de \xEEn\u0219tiin\u021Bare \u0219i apare pe Acas\u0103 la \u201Egata de teoretic\u201D. Legea cere zece; pune mai pu\u021Bine dac\u0103 vrei s\u0103 afli din vreme, ca s\u0103 apuci s\u0103 prinzi o dat\u0103 la sal\u0103."
            })),
            /* Pauzele de masă: le pui o dată și se repetă singure în fiecare
               zi de lucru. Câte îți trebuie — unul ia trei, altul una. */
            o.default.createElement(Jn, {
                title: "Pauze de mas\u0103",
                summary: (() => {
                    let iasP = (J.pauze || []);
                    return iasP.length
                        ? iasP.map(x => Se(Number(x.startMin) || 0)).join(" \xB7 ")
                        : "niciuna"
                })()
            }, o.default.createElement("p", { className: "text-xs text-slate-400 mb-3" },
                "Se repet\u0103 \xEEn fiecare zi de lucru \u0219i apar barate \xEEn calendar, ca orice interval indisponibil. Dac\u0103 programezi peste una, e\u0219ti avertizat \xEEnt\xE2i."),
                (J.pauze || []).map((iasPz, iasK) => {
                    let iasScrie = (chei) => {
                        let iasT = (J.pauze || []).slice();
                        iasT[iasK] = { ...iasT[iasK], ...chei };
                        e({ pauze: iasT })
                    };
                    return o.default.createElement("div", {
                        key: iasPz.id || iasK,
                        className: "rounded-xl px-3 py-2.5 mb-2",
                        style: { background: "var(--surface)", border: "1px solid var(--line)" }
                    },
                        o.default.createElement("div", { className: "flex items-center gap-1.5" },
                            o.default.createElement("input", {
                                className: ie + " text-xs", style: { padding: "6px 8px", flex: "1 1 0", minWidth: 0 },
                                placeholder: "Pauz\u0103",
                                value: iasPz.nume || "",
                                onChange: (ev) => iasScrie({ nume: ev.target.value })
                            }),
                            o.default.createElement("select", {
                                className: ie + " text-xs", style: { padding: "6px 8px", width: 92 },
                                value: Number(iasPz.startMin) || 0,
                                onChange: (ev) => iasScrie({ startMin: Number(ev.target.value) })
                            }, z.map(L => o.default.createElement("option", { key: L, value: L }, Se(L)))),
                            o.default.createElement("select", {
                                className: ie + " text-xs", style: { padding: "6px 8px", width: 86 },
                                value: Number(iasPz.durata) || 30,
                                onChange: (ev) => iasScrie({ durata: Number(ev.target.value) })
                            }, [15, 20, 30, 45, 60, 90].map(L => o.default.createElement("option", { key: L, value: L }, L, " min"))),
                            o.default.createElement("button", {
                                onClick: () => e({ pauze: (J.pauze || []).filter((x, i2) => i2 !== iasK) }),
                                "aria-label": "\u0218terge pauza",
                                className: "shrink-0 p-2 text-slate-400"
                            }, o.default.createElement(lo, { size: 15 }))))
                }),
                o.default.createElement("button", {
                    onClick: () => e({
                        pauze: (J.pauze || []).concat([{
                            id: "p" + Date.now(),
                            nume: "Pauz\u0103",
                            startMin: (J.pauze || []).length ? 780 : 720,
                            durata: 30
                        }])
                    }),
                    className: "w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
                }, o.default.createElement(cn, { size: 14 }), "Adaug\u0103 o pauz\u0103")),
            o.default.createElement("div", {
                className: "grid grid-cols-2 gap-3"
            }, o.default.createElement(xe, {
                label: "Durata unei \u0219edin\u021Be"
            }, o.default.createElement("select", {
                className: ie,
                value: J.sessionMin || si,
                onChange: H => e({
                    sessionMin: Number(H.target.value)
                })
            }, [30, 45, 50, 60, 75, 90, 100, 120, 150, 180].map(H => o.default.createElement("option", {
                key: H,
                value: H
            }, H < 60 ? `${H} min` : `${Math.floor(H/60)} h${H%60?` ${H%60} min`:""}`)))), o.default.createElement(xe, {
                label: "Pasul orelor"
            }, o.default.createElement("select", {
                className: ie,
                value: J.stepMin || 30,
                onChange: H => e({
                    stepMin: Number(H.target.value)
                })
            }, [5, 10, 15, 30, 60].map(H => o.default.createElement("option", {
                key: H,
                value: H
            }, "din ", H, " \xEEn ", H, " min"))))), o.default.createElement("p", {
                className: "text-xs text-slate-400 -mt-2"
            }, "\u0218edin\u021Bele deja programate \xEE\u0219i p\u0103streaz\u0103 durata cu care au fost create. Sub 30 de minute, calendarul arat\u0103 orele \xEEntregi, iar minutul \xEEl alegi la atingere.")) : ne === "elevi" ? o.default.createElement(o.default.Fragment, null, o.default.createElement(xe, {
                label: "Limit\u0103 implicit\u0103 \u0219edin\u021Be/s\u0103pt\u0103m\xE2n\u0103 pentru elevi noi"
            }, o.default.createElement(IasNumar, {
                value: J.defaultWeeklyLimit,
                min: 1,
                max: 7,
                className: ie,
                onCommit: H => e({ defaultWeeklyLimit: H })
            })),
            o.default.createElement(xe, {
                label: "Jude\u021B implicit pentru elevi noi"
            }, o.default.createElement("select", {
                className: ie,
                value: J.defaultCounty || "B",
                onChange: H => e({
                    defaultCounty: H.target.value
                })
            }, Aw.map(H => o.default.createElement("option", {
                key: H,
                value: H
            }, H)))), o.default.createElement("p", {
                className: "text-xs text-slate-400 -mt-2 mb-3.5"
            }, "Se aplic\u0103 elevilor ad\u0103uga\u021Bi de acum \xEEnainte. Pe fi\u0219a fiec\u0103ruia po\u021Bi alege oric\xE2nd alt jude\u021B."), o.default.createElement(xe, {
                label: "Moned\u0103"
            }, o.default.createElement("input", {
                className: ie,
                value: J.currency,
                onChange: H => e({
                    currency: H.target.value
                })
            }))) : ne === "euSiScoala" ? o.default.createElement(o.default.Fragment, null, o.default.createElement(xe, {
                label: "Numele t\u0103u"
            }, o.default.createElement("input", {
                className: ie,
                value: J.numeleTau || "",
                onChange: H => e({
                    numeleTau: H.target.value
                }),
                placeholder: "Cum te prezin\u021Bi elevilor"
            })), o.default.createElement(xe, {
                label: "\u0218coala"
            }, o.default.createElement("input", {
                className: ie,
                value: J.numeScoala || "",
                onChange: H => e({
                    numeScoala: H.target.value
                }),
                placeholder: "Ex: Auto Pontus"
            })), o.default.createElement(xe, {
                label: "Mesajul de bun venit"
            }, o.default.createElement("textarea", {
                rows: 6,
                className: ie,
                value: J.textBunVenit || p0,
                onChange: H => e({
                    textBunVenit: H.target.value
                })
            })), o.default.createElement("p", {
                className: "text-xs text-slate-400 -mt-2 mb-2"
            }, "Se completeaz\u0103 singure: ", o.default.createElement("span", {
                className: "font-mono-time"
            }, "{salut}"), " (Salut/Bun\u0103, dup\u0103 cum e trecut elevul), ", o.default.createElement("span", {
                className: "font-mono-time"
            }, "{prenume}"), ", ", o.default.createElement("span", {
                className: "font-mono-time"
            }, "{eu}"), ", ", o.default.createElement("span", {
                className: "font-mono-time"
            }, "{scoala}"), ", ", o.default.createElement("span", {
                className: "font-mono-time"
            }, "{disponibil}"), "."), o.default.createElement("button", {
                onClick: () => e({
                    textBunVenit: p0
                }),
                className: "w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm"
            }, "Revino la textul implicit"), o.default.createElement(IasBunVenitLimbi, {
                setari: J,
                onSchimba: e
            })) : ne === "programElevi" ? o.default.createElement(o.default.Fragment, null,
            /* Oprit din pornire: până nu-l pornești, aplicația e exact ca înainte. */
            o.default.createElement("div", {
                className: "rounded-xl px-3.5 py-3 mb-3.5",
                style: {
                    background: J.programElevi ? "var(--accent-soft)" : "var(--surface)",
                    border: `1px solid ${J.programElevi ? "var(--accent-line)" : "var(--line)"}`
                }
            },
                o.default.createElement("label", { className: "flex items-center gap-3" },
                    o.default.createElement("input", {
                        type: "checkbox",
                        checked: !!J.programElevi,
                        onChange: () => e({ programElevi: !J.programElevi }),
                        className: "w-4 h-4 accent-amber-500 shrink-0"
                    }),
                    o.default.createElement("span", { className: "text-sm flex-1", style: { color: "var(--text)" } },
                        "Elevii \xEE\u0219i trimit singuri programul")),
                o.default.createElement("p", {
                    className: "text-xs mt-1.5", style: { color: "var(--muted-2)" }
                }, J.programElevi
                    ? "Pornit: \xEEn fi\u0219a elevului, la Disponibilitate, apare c\u0103su\u021Ba \u201EProgramul trimis de elev\u201D. De acolo \xEEi ceri programul printr-un link, iar r\u0103spunsul lui st\u0103 deoparte p\xE2n\u0103 hot\u0103r\u0103\u0219ti tu s\u0103-l folose\u0219ti."
                    : "Oprit: aplica\u021Bia r\u0103m\xE2ne exact ca p\xE2n\u0103 acum. Pornit, \xEE\u021Bi po\u021Bi ruga elevii s\u0103-\u021Bi trimit\u0103 programul printr-un link pe WhatsApp.")),
            J.programElevi ? o.default.createElement(o.default.Fragment, null, o.default.createElement(xe, {
                label: "Num\u0103rul t\u0103u de WhatsApp"
            }, o.default.createElement("input", {
                className: ie,
                type: "tel",
                inputMode: "tel",
                value: J.telefonulTau || "",
                onChange: H => e({ telefonulTau: H.target.value }),
                placeholder: "07xx xxx xxx"
            })), o.default.createElement("p", {
                className: "text-xs text-slate-400 -mt-2 mb-3.5"
            }, "Pe el \xEE\u021Bi r\u0103spund elevii c\xE2nd le ceri programul.")) : null) : ne === "locatii" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
                className: "space-y-1.5 mb-3"
            }, (J.locations || []).map(H => o.default.createElement("div", {
                key: H.id,
                className: "flex items-center gap-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200"
            }, o.default.createElement("button", {
                onClick: () => {
                    b({
                        id: H.id,
                        name: H.name,
                        lat: H.lat,
                        lng: H.lng
                    }), S("")
                },
                className: "text-left flex-1 min-w-0"
            }, o.default.createElement("span", {
                className: "block text-sm text-slate-800 truncate"
            }, H.name), o.default.createElement("span", {
                className: "block text-xs",
                style: {
                    color: Fn(H) ? "var(--ok)" : "var(--muted-2)"
                }
            }, Fn(H) ? "punct salvat pe hart\u0103" : "f\u0103r\u0103 punct pe hart\u0103")), o.default.createElement("a", {
                href: wu(H, H.name, "dir"),
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Deschide \xEEn h\u0103r\u021Bi",
                style: {
                    touchAction: "manipulation"
                },
                className: "p-2 shrink-0"
            }, o.default.createElement(dn, {
                size: 15,
                style: {
                    color: "var(--accent-ink)"
                }
            })), o.default.createElement("button", {
                onClick: () => t((J.locations || []).filter(L => L.id !== H.id)),
                className: "p-1.5 text-slate-400 shrink-0"
            }, o.default.createElement(pa, {
                size: 15
            })))), (J.locations || []).length === 0 && !_ && o.default.createElement("div", {
                className: "text-xs text-slate-400 py-1"
            }, "Adaug\u0103 punctele de \xEEnt\xE2lnire folosite des \u2014 vor ap\u0103rea ca op\u021Biuni rapide la programare.")), _ ? o.default.createElement("div", {
                className: "bg-slate-50 rounded-xl p-3.5"
            }, o.default.createElement("input", {
                className: `${ie} mb-2`,
                placeholder: "Ex: Pia\u021Ba G\u0103rii, la f\xE2nt\xE2n\u0103",
                value: _.name,
                onChange: H => b({
                    ..._,
                    name: H.target.value
                })
            }), o.default.createElement("div", {
                className: "rounded-xl border border-slate-200 bg-white px-3 py-2.5 mb-2"
            }, o.default.createElement("div", {
                className: "flex items-center justify-between gap-2"
            }, o.default.createElement("span", {
                className: "text-xs text-slate-500 min-w-0"
            }, Fn(_) ? o.default.createElement("span", {
                className: "font-mono-time",
                style: {
                    color: "var(--ok)"
                }
            }, _.lat, ", ", _.lng) : "F\u0103r\u0103 punct pe hart\u0103 \u2014 harta va c\u0103uta dup\u0103 nume."), Fn(_) && o.default.createElement("button", {
                onClick: () => b({
                    ..._,
                    lat: null,
                    lng: null
                }),
                className: "text-xs text-slate-400 shrink-0"
            }, "\u0218terge")), o.default.createElement("button", {
                onClick: ye,
                disabled: M === "caut",
                className: "w-full mt-2 py-2.5 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-1.5 disabled:opacity-50",
                style: {
                    background: "var(--invert)"
                }
            }, o.default.createElement(dn, {
                size: 14
            }), M === "caut" ? "Caut punctul\u2026" : "Ia punctul de unde sunt acum"), M === "refuzat" && o.default.createElement("p", {
                className: "text-xs mt-1.5",
                style: {
                    color: "var(--bad)"
                }
            }, "Telefonul nu a dat voie la loca\u021Bie. Porne\u0219te-o din set\u0103rile browserului pentru acest site."), M === "eroare" && o.default.createElement("p", {
                className: "text-xs mt-1.5",
                style: {
                    color: "var(--bad)"
                }
            }, "Nu am prins semnalul. \xCEncearc\u0103 afar\u0103, sub cer liber."), o.default.createElement("input", {
                className: `${ie} mt-2`,
                placeholder: "link de hart\u0103, coordonate sau Plus Code",
                onChange: H => {
                    let iasR = iasReper(J), L = Xw(H.target.value, iasR[0], iasR[1]);
                    L && (b({
                        ..._,
                        ...L
                    }), H.target.value = "", S(""))
                }
            }), o.default.createElement("p", {
                className: "text-xs text-slate-400 mt-1.5"
            }, "Cel mai exact e s\u0103 iei punctul chiar de la fa\u021Ba locului, o singur\u0103 dat\u0103. Merge \u0219i Plus Code-ul din Google Maps (de pild\u0103 8GPC5J5M+WV, sau doar 5J5M+WV cu ora\u0219ul dup\u0103 el). Linkurile scurte (maps.app.goo.gl) nu merg \u2014 deschide-l \xEEnt\xE2i \xEEn hart\u0103 \u0219i copiaz\u0103 adresa lung\u0103.")), o.default.createElement("div", {
                className: "flex gap-2"
            }, o.default.createElement("button", {
                onClick: () => {
                    b(null), S("")
                },
                className: "flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600"
            }, "Renun\u021B\u0103"), o.default.createElement("button", {
                onClick: ge,
                className: "flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm"
            }, "Salveaz\u0103"))) : o.default.createElement("button", {
                onClick: () => {
                    b({
                        name: ""
                    }), S("")
                },
                className: "w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
            }, o.default.createElement(dn, {
                size: 14
            }), "Loca\u021Bie nou\u0103"),
            /* Casa ta. Din ea se socotește cine e aproape și cine departe, ca
               planul să-ți pună dimineața și seara elevii din vecinătate —
               altfel faci drumul lung de două ori, dus și întors. */
            o.default.createElement("div", {
                className: "mt-5 pt-4",
                style: { borderTop: "1px solid var(--line)" }
            },
                o.default.createElement("div", {
                    className: "text-xs font-medium text-slate-500 mb-1.5"
                }, "Casa ta"),
                o.default.createElement("p", { className: "text-xs text-slate-400 mb-2.5" },
                    "Pus\u0103 aici, planul \xEEncearc\u0103 s\u0103-\u021Bi dea prima \u0219i ultima \u0219edin\u021B\u0103 a zilei cu elevii care stau mai aproape de tine. Nu schimb\u0103 cine lucreaz\u0103, doar ordinea. Ajunge \u0219i cu aproxima\u021Bie."),
                Fn(J.acasa) ? o.default.createElement("div", {
                    className: "rounded-xl px-3.5 py-2.5 mb-2 flex items-center gap-2",
                    style: { background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }
                },
                    o.default.createElement(dn, { size: 14, className: "shrink-0", style: { color: "var(--accent)" } }),
                    o.default.createElement("span", {
                        className: "flex-1 min-w-0 font-mono-time text-xs truncate",
                        style: { color: "var(--accent-ink)" }
                    }, iasPlusDinPunct(J.acasa)),
                    o.default.createElement("a", {
                        href: `https://maps.google.com/?q=${J.acasa.lat},${J.acasa.lng}`,
                        target: "_blank", rel: "noopener noreferrer",
                        className: "shrink-0 text-xs px-2 py-1 rounded-lg",
                        style: { color: "var(--accent-ink)", border: "1px solid var(--accent-line)" }
                    }, "vezi"),
                    o.default.createElement("button", {
                        onClick: () => e({ acasa: null }),
                        "aria-label": "\u0218terge casa",
                        className: "shrink-0 p-1.5 text-slate-400"
                    }, o.default.createElement(lo, { size: 14 }))) : null,
                o.default.createElement("input", {
                    className: ie,
                    placeholder: "link de hart\u0103, coordonate sau Plus Code",
                    onChange: (H) => {
                        let iasR = iasReper(J), L = Xw(H.target.value, iasR[0], iasR[1]);
                        L && (e({ acasa: { lat: L.lat, lng: L.lng } }), H.target.value = "")
                    }
                }),
                (J.locations || []).filter(H => Fn(H)).length
                    ? o.default.createElement("div", { className: "flex flex-wrap gap-1.5 mt-2" },
                        o.default.createElement("span", { className: "text-xs text-slate-400 py-1" }, "sau ia-o de la:"),
                        (J.locations || []).filter(H => Fn(H)).map(H => o.default.createElement("button", {
                            key: H.id,
                            onClick: () => e({ acasa: { lat: Number(H.lat), lng: Number(H.lng) } }),
                            className: "px-2.5 py-1 rounded-lg text-xs border border-slate-200 text-slate-600"
                        }, H.name)))
                    : null,
                /* Tot aici, nu într-o secțiune a ei: de obicei pleci de acasă,
                   dar dacă începi ziua dintr-un anume loc — o benzinărie, școala
                   — planul îți dă prima ședință cu un elev chemat acolo. Seara
                   te întorci oricum acasă, deci ultima rămâne către casă. */
                o.default.createElement("div", { className: "mt-3.5" },
                    o.default.createElement("span", {
                        className: "block text-xs font-medium text-slate-500 mb-1.5"
                    }, "Ziua \xEEncepe din"),
                    o.default.createElement("select", {
                        className: ie,
                        value: J.locStart || "",
                        onChange: (H) => e({ locStart: H.target.value })
                    },
                        o.default.createElement("option", { value: "" }, "De acas\u0103"),
                        (J.locations || []).map(H => o.default.createElement("option", {
                            key: H.id, value: H.name
                        }, H.name, Fn(H) ? "" : " (f\u0103r\u0103 punct pe hart\u0103)"))),
                    (J.locStart && !Fn((J.locations || []).filter(H => H.name === J.locStart)[0]))
                        ? o.default.createElement("p", {
                            className: "text-xs mt-1.5", style: { color: "var(--bad)" }
                        }, "Locul \u0103sta n-are punct pe hart\u0103, deci nu se pot socoti distan\u021Be de la el. Pune-i unul mai sus.")
                        : o.default.createElement("p", {
                            className: "text-xs mt-1.5", style: { color: "var(--muted-2)" }
                        }, J.locStart
                            ? "Prima \u0219edin\u021B\u0103 a zilei merge c\u0103tre un elev chemat acolo; ultima, c\u0103tre cas\u0103."
                            : "Prima \u0219edin\u021B\u0103 a zilei se socote\u0219te de acas\u0103, ca \u0219i ultima.")))) : ne === "masini" ? o.default.createElement(IasMasiniEditor, {
                masini: iasMasini(J),
                onChange: (lista) => e({ masini: lista }),
                implicita: J.masinaImplicita || "",
                onImplicita: (id) => e({ masinaImplicita: id })
            }) : ne === "amintiri" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("p", {
                className: "text-xs text-slate-400 mb-3"
            }, "Aplica\u021Bia nu poate suna singur\u0103 c\xE2t timp e \xEEnchis\u0103 \u2014 asta o face doar calendarul telefonului. \xCEi pred\u0103m lui \u0219edin\u021Bele viitoare, cu amintirile bifate mai jos, iar el te anun\u021B\u0103 la timp, chiar dac\u0103 aplica\u021Bia e \xEEnchis\u0103."), [
                ["amSeara", "Seara dinainte, la 20:00", "Ai \u0219edin\u021Be programate m\xE2ine."],
                ["amDimineata", "Diminea\u021Ba, la 7:00", "Ce ai de f\u0103cut azi."],
                ["amDouaOre", "Cu 2 ore \xEEnainte", "C\xE2t s\u0103 ai timp de drum."]
            ].map(([H, L, T]) => {
                let j = J[H] !== !1;
                return o.default.createElement("button", {
                    key: H,
                    onClick: () => e({
                        [H]: !j
                    }),
                    className: "w-full flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 mb-2 text-left",
                    style: j ? {
                        borderColor: "var(--accent-line)",
                        background: "var(--accent-soft)"
                    } : {
                        borderColor: "var(--line)",
                        background: "var(--surface)"
                    }
                }, o.default.createElement("span", {
                    className: "flex items-center justify-center rounded-md shrink-0",
                    style: {
                        width: 18,
                        height: 18,
                        border: `1.5px solid ${j?"var(--accent)":"var(--line-2)"}`,
                        background: j ? "var(--accent)" : "transparent",
                        color: "#3a2100",
                        fontSize: 12,
                        fontWeight: 900,
                        lineHeight: 1
                    }
                }, j ? "\u2713" : ""), o.default.createElement("span", {
                    className: "flex-1 min-w-0"
                }, o.default.createElement("span", {
                    className: "block text-sm font-medium text-slate-800"
                }, L), o.default.createElement("span", {
                    className: "block text-xs text-slate-400"
                }, T)))
            }), o.default.createElement("button", {
                onClick: x,
                className: "w-full py-3 mt-2 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2",
                style: {
                    background: "var(--invert)"
                }
            }, o.default.createElement(Kr, {
                size: 15
            }), "Trimite \u0219edin\u021Bele \xEEn calendar"), o.default.createElement("p", {
                className: "text-xs text-slate-400 mt-2"
            }, 'Se deschide fereastra de partajare \u2014 alege aplica\u021Bia de calendar sau \u201EDeschide cu". \u0218edin\u021Bele deja trimise se actualizeaz\u0103, nu se dubleaz\u0103. Repet\u0103 dup\u0103 ce faci program\u0103ri noi.')) : ne === "backup" ? o.default.createElement("div", {
                className: "space-y-2.5"
            }, o.default.createElement("p", {
                className: "text-xs text-slate-400"
            }, "Datele stau doar \xEEn telefonul t\u0103u. Backup-ul e singurul lucru care te salveaz\u0103 dac\u0103 schimbi telefonul sau \u0219tergi aplica\u021Bia."), o.default.createElement("button", {
                onClick: a,
                className: "w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-2"
            }, o.default.createElement(fa, {
                size: 15
            }), "Descarc\u0103 backup (JSON)"), o.default.createElement("button", {
                onClick: w,
                className: "w-full py-3 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2",
                style: {
                    background: "var(--invert)"
                }
            }, o.default.createElement(Na, {
                size: 15
            }), "Trimite fi\u0219ierul (e-mail, Drive)"), o.default.createElement("p", {
                className: "text-xs text-slate-400 -mt-1"
            }, "Se deschide fereastra de partajare a telefonului, cu backup-ul ata\u0219at ca fi\u0219ier. De acolo alegi Gmail, Google Drive sau Fi\u0219iere \u2014 destinatarul \xEEl scrii tu."), o.default.createElement("div", {
                className: "border-t border-slate-100 pt-3 space-y-2.5"
            }, o.default.createElement("input", {
                ref: k,
                type: "file",
                accept: ".json,application/json",
                onChange: ce,
                className: "hidden"
            }), o.default.createElement("button", {
                onClick: () => k.current && k.current.click(),
                className: "w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-2"
            }, o.default.createElement(uo, {
                size: 15
            }), "Import\u0103 backup (JSON)"), o.default.createElement("button", {
                onClick: () => {
                    C(!N), B("")
                },
                className: "w-full text-center text-xs text-slate-400 py-1"
            }, "sau lipe\u0219te textul backup-ului"), N && o.default.createElement("div", null, o.default.createElement("textarea", {
                rows: 4,
                className: ie,
                placeholder: "Lipe\u0219te aici con\u021Binutul fi\u0219ierului de backup",
                value: W,
                onChange: H => X(H.target.value)
            }), o.default.createElement("button", {
                onClick: () => Ne(W),
                className: "w-full py-2.5 mt-2 rounded-xl bg-slate-900 text-white text-sm font-medium"
            }, "Import\u0103 textul")), E && o.default.createElement("p", {
                className: "text-xs text-red-600 text-center"
            }, E), o.default.createElement("button", {
                onClick: () => y(!0),
                className: "w-full py-3 rounded-xl border border-red-200 text-red-500 text-sm font-medium"
            }, "\u0218terge toate datele"))) : ne === "acces" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
                className: "rounded-xl border border-slate-200 bg-white px-3.5 py-3 mb-2.5"
            }, o.default.createElement("div", {
                className: "text-sm text-slate-800"
            }, u && u.nume || "Cod de acces"), o.default.createElement("div", {
                className: "font-mono-time text-xs text-slate-400 mt-0.5"
            }, u ? k0(u.cod) : "\u2014"), o.default.createElement("button", {
                onClick: async () => {
                    try {
                        await navigator.clipboard.writeText(lr()), K(!0), setTimeout(() => K(!1), 2e3)
                    } catch {}
                },
                className: "font-mono-time text-xs text-slate-400 mt-0.5 flex items-center gap-1.5"
            }, o.default.createElement(ti, {
                size: 11
            }), R ? "Copiat \u2713" : `Codul telefonului: ${lr()}`), o.default.createElement("div", {
                className: "text-xs mt-1",
                style: {
                    color: d && d.blocat ? "var(--bad)" : "var(--ok)"
                }
            }, u && u.rol === "proprietar" ? "Acces permanent \xB7 toate drepturile" : d && d.blocat ? d.motiv : `Licen\u021B\u0103 ${d&&d.tipNume?d.tipNume:"complet\u0103"} \xB7 valabil\u0103 p\xE2n\u0103 la ${d&&d.pana?qe(d.pana):"\u2014"}`)), o.default.createElement("div", {
                className: "flex gap-2"
            }, o.default.createElement("button", {
                onClick: p,
                disabled: f,
                className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm disabled:opacity-50"
            }, f ? "Se verific\u0103\u2026" : "Verific\u0103 din nou"), o.default.createElement("button", {
                onClick: c,
                className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm"
            }, "Schimb\u0103 codul"))) : ne === "ajutor" ? o.default.createElement(Kk, {
                data: n
            }) : ne === "despre" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
                className: "flex gap-2 mb-4"
            }, o.default.createElement("button", {
                onClick: () => {
                    Y(null), m()
                },
                className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm"
            }, "Ce face aplica\u021Bia"), o.default.createElement("button", {
                onClick: () => {
                    Y(null), g()
                },
                className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm"
            }, "Ce e nou")), o.default.createElement(Jn, {
                title: "Instalare pe telefon"
            }, o.default.createElement(Zk, null)), o.default.createElement("div", {
                className: "mt-4 text-center"
            }, o.default.createElement("div", {
                className: "text-xs font-semibold text-slate-500"
            }, fn.mark, "\u2122 \xB7 ", fn.expansion), o.default.createElement("div", {
                className: "text-xs text-slate-400 mt-0.5"
            }, "\xA9 ", new Date().getFullYear(), " ", fn.owner, " \xB7 Toate drepturile rezervate."), o.default.createElement("div", {
                className: "font-display text-base font-semibold text-slate-600 uppercase tracking-wide mt-2"
            }, mo), o.default.createElement("div", {
                className: "text-xs text-slate-400"
            }, "major \xB7 func\u021Bional \xB7 design"))) : null
        };
    return o.default.createElement("div", {
        className: "pb-6"
    }, o.default.createElement("div", {
        className: "px-4 pt-4 pb-1"
    }, o.default.createElement("h1", {
        className: "font-display text-xl font-semibold text-slate-900 uppercase tracking-wide"
    }, "Set\u0103ri")), o.default.createElement("div", {
        className: "px-4 mt-3 space-y-1.5"
    }, (() => {
        /* Rândul unei setări e cel dintotdeauna; s-a schimbat doar locul lui. */
        let iasRand = H => {
            let L = H.Icon;
            return o.default.createElement("button", {
                key: H.id,
                onClick: () => H.direct ? H.direct() : Y(H.id),
                className: "w-full flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3.5 py-3 text-left active:bg-slate-50"
            }, o.default.createElement(L, {
                size: 17,
                className: "text-slate-400 shrink-0"
            }), o.default.createElement("span", {
                className: "text-sm text-slate-800 flex-1 min-w-0 truncate"
            }, H.nume), H.rezumat ? o.default.createElement("span", {
                className: "text-xs text-slate-400 shrink-0 truncate",
                style: {
                    maxWidth: "45%"
                }
            }, H.rezumat) : null, o.default.createElement(un, {
                size: 16,
                className: "text-slate-300 shrink-0"
            }))
        },
            iasQ = iasFaraSemne(iasCauta).trim(),
            iasGasite = iasQ ? se.filter(H => iasFaraSemne(H.nume + " " + (IAS_CUVINTE_SETARI[H.id] || "") + " " + (H.rezumat || "")).includes(iasQ)) : [],
            iasGrupe = iasGrupeSetari(se),
            iasDeschide = id => { let iasNou = iasGrup === id ? "" : id; iasSetariTinut.grup = iasNou, iasPuneGrup(iasNou) },
            iasPictograma = { zi: Kr, elevi: rr, drum: dn, aspect: Hi, date: fa, altele: ai };
        return o.default.createElement(o.default.Fragment, null,
            o.default.createElement("div", { className: "relative" },
                o.default.createElement(Oi, {
                    size: 16,
                    className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                }), o.default.createElement("input", {
                    value: iasCauta,
                    onChange: H => iasPuneCauta(H.target.value),
                    "data-ias-cauta-setari": "",
                    "aria-label": "Caut\u0103 o setare",
                    placeholder: "Caut\u0103: pauz\u0103, backup, jude\u021B\u2026",
                    className: `${ie} pl-10 ${iasCauta?"pr-10":""}`
                }), iasCauta && o.default.createElement("button", {
                    onClick: () => iasPuneCauta(""),
                    "aria-label": "\u0218terge c\u0103utarea",
                    className: "absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-slate-400"
                }, o.default.createElement(ir, { size: 16 }))),
            /* Ce ai căutat, pe un singur rând de rezultate. */
            iasQ ? o.default.createElement("div", { className: "space-y-1.5", "data-ias-rezultate-setari": "" },
                iasGasite.length ? iasGasite.map(iasRand) : o.default.createElement("p", {
                    className: "text-sm text-slate-500 py-3 text-center"
                }, "Nu am g\u0103sit nimic. \xCEncearc\u0103 alt cuv\xE2nt, mai scurt.")) : null,
            /* Tema, la o atingere — fără să mai deschizi fereastra ei. */
            o.default.createElement("div", {
                className: "flex gap-1.5",
                "data-ias-tema-rapida": "",
                style: { display: iasQ ? "none" : void 0 }
            }, q.map(({ id: H, label: L, Icon: T }) => {
                let j = (J.theme || "system") === H;
                return o.default.createElement("button", {
                    key: H,
                    onClick: () => e({ theme: H }),
                    "aria-pressed": j,
                    className: `flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border ${j?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200"}`
                }, o.default.createElement(T, { size: 14 }), L)
            })),
            /* Grupele. Rândurile stau mereu în pagină; grupa închisă doar le ascunde. */
            iasGrupe.map(G => {
                let iasE = iasGrup === G.id,
                    iasP = iasPictograma[G.id] || ai,
                    iasPeScurt = G.randuri.map(H => H.rezumat).filter(Boolean).slice(0, 2).join(" \xB7 ");
                return o.default.createElement("div", {
                    key: G.id,
                    "data-ias-grup-setari": G.id,
                    className: "bg-white rounded-xl border border-slate-200",
                    style: { display: iasQ ? "none" : void 0, borderColor: iasE ? "var(--accent-line)" : void 0 }
                }, o.default.createElement("button", {
                    onClick: () => iasDeschide(G.id),
                    "aria-expanded": iasE,
                    className: "w-full flex items-center gap-3 px-3.5 py-3 text-left"
                }, o.default.createElement("span", {
                    className: "shrink-0 flex items-center justify-center",
                    style: {
                        width: 38, height: 38, borderRadius: 99,
                        background: iasE ? "var(--accent)" : "var(--accent-soft)",
                        color: iasE ? "#2a1800" : "var(--accent-ink)",
                        transition: "background .25s ease, color .25s ease"
                    }
                }, o.default.createElement(iasP, { size: 18 })), o.default.createElement("span", { className: "flex-1 min-w-0" },
                    o.default.createElement("span", { className: "block text-sm font-semibold text-slate-800" }, G.nume),
                    o.default.createElement("span", { className: "block text-xs text-slate-400 truncate" },
                        iasPeScurt || G.randuri.map(H => H.nume).join(" \xB7 "))),
                o.default.createElement("span", {
                    className: "text-xs text-slate-400 shrink-0 font-mono-time"
                }, G.randuri.length), o.default.createElement(un, {
                    size: 16,
                    className: "text-slate-300 shrink-0",
                    style: { transform: iasE ? "rotate(90deg)" : "none", transition: "transform .25s cubic-bezier(.34,1.56,.64,1)" }
                })), o.default.createElement("div", {
                    className: "space-y-1.5 px-2 pb-2",
                    style: { display: iasE ? void 0 : "none" }
                }, G.randuri.map(iasRand)))
            }))
    })()), o.default.createElement("p", {
        className: "px-4 mt-4 text-xs text-slate-400 text-center"
    }, fn.mark, "\u2122 \xB7 ", mo), o.default.createElement(oi, {
        open: !!ne,
        onClose: () => {
            Y(null), b(null)
        },
        title: fe,
        layer: Wt.form
    }, he()), o.default.createElement(Ri, {
        open: !!A,
        title: "Adaugi elevul primit?",
        message: A ? `${(A.student||{}).name||"Elev"} \xB7 ${(A.sessions||[]).length} \u0219edin\u021Be. Se adaug\u0103 la eviden\u021Ba ta, f\u0103r\u0103 s\u0103 \u0219tearg\u0103 nimic. \u0218edin\u021Bele care cad peste ale altor elevi vor fi marcate ca suprapuse.` : "",
        confirmLabel: "Adaug\u0103",
        onConfirm: () => {
            i(A), O(null), C(!1), X(""), Y(null)
        },
        onCancel: () => O(null)
    }), o.default.createElement(Ri, {
        open: h,
        title: "\u0218tergi toate datele?",
        message: "Se vor \u0219terge to\u021Bi elevii, toate \u0219edin\u021Bele \u0219i set\u0103rile. Descarc\u0103 mai \xEEnt\xE2i un backup dac\u0103 vrei s\u0103 p\u0103strezi datele.",
        confirmLabel: "\u0218terge tot",
        danger: !0,
        onConfirm: () => {
            y(!1), Y(null), s()
        },
        onCancel: () => y(!1)
    }), o.default.createElement(Ri, {
        open: !!$,
        title: "Impor\u021Bi backup-ul?",
        message: $ ? `Datele curente vor fi \xEEnlocuite cu: ${$.students.length} elevi, ${$.sessions.length} \u0219edin\u021Be. Descarc\u0103 un backup al datelor de acum dac\u0103 vrei s\u0103 le po\u021Bi recupera.` : "",
        confirmLabel: "Import\u0103",
        onConfirm: () => {
            r($), G(null), C(!1), X(""), Y(null)
        },
        onCancel: () => G(null)
    }))
}
var t3 = "./licente.json",
    m0 = "ias:licenta",
    n3 = 7,
    rS = "IAS-9F3K-7QX2";
var A0 = {
    vip: {
        nume: "VIP",
        drepturi: ["*"]
    },
    completa: {
        nume: "Complet\u0103",
        drepturi: ["*"]
    },
    baza: {
        nume: "Baz\u0103",
        drepturi: ["calendar", "elevi"],
        maxElevi: 5
    }
};

function g0(n, e) {
    let t = e && e[n] || A0[n] || {
        nume: n || "Complet\u0103",
        drepturi: ["*"]
    };
    return {
        nume: t.nume || n || "Complet\u0103",
        drepturi: t.drepturi || ["*"],
        maxElevi: Number(t.maxElevi) || 0
    }
}
var cu = (n, e) => {
        if (!n) return !1;
        if (n.rol === "proprietar") return !0;
        let t = n.drepturi || ["*"];
        return t.includes("*") || t.includes(e)
    },
    Dn = n => String(n || "").toUpperCase().replace(/[^A-Z0-9]/g, ""),
    _w = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
    fu = n => Array.from({
        length: n
    }, () => _w[Math.floor(Math.random() * _w.length)]).join("");

function a3(n) {
    let e = new Set((n || []).map(t => Dn(t.cod)));
    for (let t = 0; t < 50; t++) {
        let a = `IAS-${fu(4)}-${fu(4)}`;
        if (!e.has(Dn(a))) return a
    }
    return `IAS-${fu(4)}-${fu(4)}`
}

function r3(n, e, t) {
    let a = i => yu(i || "").slice(0, 1) || "X",
        r = (yu(t || "") + "XX").slice(0, 2);
    return `${a(n)}${a(e)}-${r}-${fu(4)}`
}
var Lw = "ias:dispozitiv";

function lr() {
    try {
        let n = window.localStorage.getItem(Lw);
        return n || (n = "T" + Math.random().toString(36).slice(2, 6).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase(), window.localStorage.setItem(Lw, n)), n
    } catch {
        return "T0000000"
    }
}
var k0 = n => {
    let e = Dn(n);
    return e.length > 7 ? `${e.slice(0,3)}-${e.slice(3,7)}-${e.slice(7,11)}` : e
};

function i3() {
    try {
        let n = window.localStorage.getItem(m0);
        return n ? JSON.parse(n) : null
    } catch {
        return null
    }
}

function gf(n) {
    try {
        n ? window.localStorage.setItem(m0, JSON.stringify(n)) : window.localStorage.removeItem(m0)
    } catch {}
}
async function c0(n) {
    let e = Dn(n);
    if (!e) return {
        stare: "fara"
    };
    if (e === Dn(rS)) return {
        stare: "ok",
        nume: "Proprietar",
        rol: "proprietar",
        pana: "2099-12-31",
        drepturi: ["*"],
        verificatLa: Be()
    };
    let t = await fetch(`${t3}?t=${Date.now()}`, {
        cache: "no-store"
    });
    if (!t.ok) throw new Error("licente.json " + t.status);
    let a = await t.json(),
        r = (a.licente || []).find(l => Dn(l.cod) === e);
    if (!r) return {
        stare: "necunoscut",
        verificatLa: Be()
    };
    let i = String(r.dispozitiv || "").trim().toUpperCase();
    if (i && i !== lr()) return {
        stare: "altDispozitiv",
        nume: r.nume || "",
        pana: r.pana || "",
        verificatLa: Be()
    };
    let s = g0(r.tip, a.tipuri);
    return {
        stare: "ok",
        nume: r.nume || "",
        rol: r.rol || "utilizator",
        pana: r.pana || "",
        legat: !!i,
        verificatLa: Be(),
        tip: r.tip || "",
        tipNume: s.nume,
        drepturi: s.drepturi,
        maxElevi: s.maxElevi
    }
}

function Cw(n) {
    if (!n || !n.cod) return {
        ecranCod: !0
    };
    if (n.rol === "proprietar") return {
        activ: !0,
        rol: "proprietar",
        drepturi: ["*"],
        pana: n.pana,
        nume: n.nume
    };
    if (n.stare === "necunoscut") return {
        blocat: !0,
        motiv: "Codul acesta nu mai este valabil.",
        pana: n.pana,
        nume: n.nume
    };
    if (n.stare === "altDispozitiv") return {
        blocat: !0,
        dispozitivGresit: !0,
        motiv: "Licen\u021Ba e legat\u0103 de alt telefon. Trimite-mi codul telefonului de mai jos ca s\u0103 o mut aici.",
        pana: n.pana,
        nume: n.nume
    };
    let e = Be();
    return n.pana && n.pana < e ? {
        blocat: !0,
        motiv: `Perioada de acces s-a \xEEncheiat pe ${qe(n.pana)}.`,
        pana: n.pana,
        nume: n.nume
    } : (n.verificatLa ? Math.round((Ue(e).getTime() - Ue(n.verificatLa).getTime()) / 864e5) : 999) > n3 ? {
        blocat: !0,
        motiv: "Aplica\u021Bia nu s-a mai putut verifica de peste o s\u0103pt\u0103m\xE2n\u0103. Conecteaz\u0103 telefonul la internet.",
        pana: n.pana,
        nume: n.nume
    } : {
        activ: !0,
        pana: n.pana,
        nume: n.nume,
        drepturi: n.drepturi || ["*"],
        maxElevi: n.maxElevi || 0,
        tipNume: n.tipNume
    }
}

function s3({
    eroare: n,
    ocupat: e,
    onTrimite: t
}) {
    let [a, r] = (0, o.useState)(""), [i, s] = (0, o.useState)(!1);
    async function l() {
        try {
            await navigator.clipboard.writeText(lr()), s(!0), setTimeout(() => s(!1), 2e3)
        } catch {}
    }
    return o.default.createElement("div", {
        className: "flex-1 min-h-0 overflow-y-auto"
    }, o.default.createElement("div", {
        className: "px-5 py-8",
        style: {
            maxWidth: 460,
            margin: "0 auto"
        }
    }, o.default.createElement("div", {
        className: "flex justify-center mb-5"
    }, o.default.createElement(Bf, {
        county: "B",
        digits: "9026",
        letters: "IAS",
        h: 40
    })), o.default.createElement("h1", {
        className: "font-display text-xl font-semibold text-slate-900 uppercase tracking-wide text-center"
    }, fn.expansion), o.default.createElement("p", {
        className: "text-sm text-slate-500 text-center mt-2 mb-6"
    }, "Introdu codul unic de acces primit!"), o.default.createElement("input", {
        value: a,
        onChange: u => r(u.target.value),
        placeholder: "IAS-XXXX-XXXX",
        autoCapitalize: "characters",
        autoCorrect: "off",
        spellCheck: "false",
        className: `${ie} text-center font-mono-time`,
        style: {
            letterSpacing: "0.12em"
        }
    }), n && o.default.createElement("p", {
        className: "text-xs text-red-600 mt-2 text-center"
    }, n), o.default.createElement("button", {
        onClick: () => t(a),
        disabled: e || !a.trim(),
        className: "w-full py-3 mt-4 rounded-xl bg-slate-900 text-white font-medium text-sm disabled:opacity-40"
    }, e ? "Se verific\u0103\u2026" : "Intr\u0103 \xEEn aplica\u021Bie"), o.default.createElement("div", {
        className: "mt-7 rounded-xl px-3.5 py-3.5",
        style: {
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-line)"
        }
    }, o.default.createElement("div", {
        className: "text-sm font-medium",
        style: {
            color: "var(--accent-ink)"
        }
    }, "Nu ai \xEEnc\u0103 un cod de acces?"), o.default.createElement("p", {
        className: "text-xs text-slate-500 mt-1"
    }, "Trimite codul de mai jos ca s\u0103 prime\u0219ti licen\u021Ba ta!"), o.default.createElement("button", {
        onClick: l,
        className: "w-full mt-2.5 py-3 rounded-xl bg-white border border-slate-200 font-mono-time text-base text-slate-900 flex items-center justify-center gap-2",
        style: {
            letterSpacing: "0.12em"
        }
    }, i ? "Copiat \u2713" : lr(), !i && o.default.createElement(ti, {
        size: 14,
        className: "text-slate-400"
    })), o.default.createElement("a", {
        href: vo(`Cerere cod de acces IAS \xB7 ${lr()}`, `Bun\u0103! A\u0219 vrea un cod de acces pentru IAS.

Codul telefonului meu: ${lr()}

Numele meu:
\u0218coala:
Telefon:
`),
        className: "w-full mt-2 py-3 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2",
        style: {
            background: "var(--invert)",
            touchAction: "manipulation"
        }
    }, o.default.createElement(Na, {
        size: 15
    }), "Trimite codul"), o.default.createElement("p", {
        className: "text-xs text-slate-400 mt-2 text-center"
    }, "sau scrie-mi la ", If))))
}

function o3({
    st: n,
    cod: e,
    ocupat: t,
    onVerifica: a
}) {
    let r = `Bun\u0103! A\u0219 vrea prelungirea accesului pentru luna urm\u0103toare.

Cod: ${k0(e)}
Nume: ${n.nume||"\u2014"}
Codul telefonului: ${lr()}
A fost valabil p\xE2n\u0103 la: ${n.pana?qe(n.pana):"\u2014"}
`;
    return o.default.createElement("div", {
        className: "shrink-0 px-4 py-2.5",
        style: {
            background: "var(--bad-soft)",
            borderBottom: "1px solid var(--bad-line)"
        }
    }, o.default.createElement("div", {
        className: "text-xs font-semibold",
        style: {
            color: "var(--bad)"
        }
    }, n.motiv), o.default.createElement("div", {
        className: "text-xs text-slate-500 mt-0.5"
    }, "Vezi tot \u0219i \xEE\u021Bi po\u021Bi desc\u0103rca backup-ul, dar nu po\u021Bi face modific\u0103ri."), n.dispozitivGresit && o.default.createElement("div", {
        className: "font-mono-time text-xs mt-1",
        style: {
            color: "var(--bad)"
        }
    }, "Codul telefonului: ", lr()), o.default.createElement("div", {
        className: "flex gap-2 mt-2"
    }, o.default.createElement("a", {
        href: vo("Prelungire acces IAS", r),
        style: {
            touchAction: "manipulation",
            background: "var(--bad)"
        },
        className: "flex-1 py-2 rounded-lg text-center text-xs font-medium text-white"
    }, "Cere prelungirea"), o.default.createElement("button", {
        onClick: a,
        disabled: t,
        className: "flex-1 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 disabled:opacity-50"
    }, t ? "Se verific\u0103\u2026" : "Verific\u0103 din nou")))
}
var Ew = "ias:vazut",
    x0 = "ias:backup",
    iS = n => `${n} ${n%100>=1&&n%100<=19?"":"de "}zile`,
    l3 = 14;

function sS(n, e) {
    let t = String(n || "").replace(/^v/i, "").split(".").map(r => parseInt(r, 10) || 0),
        a = String(e || "").replace(/^v/i, "").split(".").map(r => parseInt(r, 10) || 0);
    for (let r = 0; r < Math.max(t.length, a.length); r++) {
        let i = (t[r] || 0) - (a[r] || 0);
        if (i) return i > 0 ? 1 : -1
    }
    return 0
}
var u3 = [{
    v: "v2.61.3.7",
    titlu: "Elevul spune când poate, toată săptămâna",
    puncte: [
        "Pe pagina de disponibilitate elevul completează acum toate cele 7 zile, inclusiv sâmbăta și duminica, și poate alege orice oră din zi. Înainte vedea închise zilele în care nu lucrai și orele din afara programului tău, de unde părea că „nu ești disponibil în weekend”.",
        "Orele tale de lucru nu mai pleacă în link și nu mai apar nicăieri pe pagină. În foaia unei zile scrie acum: „Spune când poți tu. Îndrumătorul te programează doar în orele lui de lucru.”",
        "Planul nu se schimbă: pune ședințele doar în programul tău, așa cum e el în săptămâna respectivă, și doar acolo unde elevul a spus că poate. Când schimbi programul pe o săptămână, disponibilitatea elevilor e deja acolo, pe toată săptămâna.",
        "Linkurile trimise deja merg mai departe și se deschid și ele pe toată săptămâna."
    ],
    scurt: "Pe pagina de disponibilitate elevul completează acum toată săptămâna, la orice oră; planul îl programează doar când lucrezi."
}, {
    v: "v2.61.3.6",
    titlu: "Pagina de disponibilitate, în limba elevului",
    puncte: [
        "Pagina pe care elevul își spune programul se deschide în limba lui: engleză, ucraineană, rusă, turcă, franceză, germană, italiană sau spaniolă. Totul e tradus: calendarul, zilele și lunile, butoanele, foaia unei zile, „Pe scurt”, perioada în care lipsește și mesajul pe care ți-l trimite.",
        "Limba o duce linkul din „Cere-i programul”, după limba ședințelor de pe fișa lui. Elevii pe română văd pagina exact ca până acum.",
        "Sus, în dreapta, elevul poate schimba singur limba paginii; alegerea rămâne ținută minte în telefonul lui.",
        "Mesajul cu care îi ceri programul e scris și el în limba lui, cu numele butonului de pe pagină. Pentru o limbă din afara listei, pagina și mesajul sunt în engleză.",
        "Mesajul pe care ți-l trimite elevul e în limba lui; linkul din el se deschide în aplicație ca până acum, cu zilele în română."
    ],
    scurt: "Elevii care fac ședințele în altă limbă primesc și pagina de disponibilitate în limba lor; o pot schimba și singuri, de sus."
}, {
    v: "v2.61.3.5",
    titlu: "Elevul nou, pas cu pas",
    puncte: [
        "„+” și „Elev nou” deschid acum pașii elevului nou: numele, telefonul, nașterea, domiciliul, dosarul, limba, categoria, școlarizarea, locul de start și câte ședințe pe săptămână. O întrebare pe ecran, cu butoane mari, „Sari peste” la cele opționale și bara de pași sus. Formularul întreg rămâne la un buton distanță („Prefer formularul întreg”), cu ce ai scris deja.",
        "Nașterea din CNP: îl scrii și aplicația scoate data nașterii, vârsta și adresarea (Salut / Bună). Verifică cifra de control și data. CNP-ul nu se păstrează nicăieri.",
        "Te avertizează dacă mai ai un elev cu același nume sau cu același număr de telefon.",
        "Școlarizarea, în cinci feluri: plătită integral (alegi planul — sau adaugi pe loc unul nou, de exemplu cu 20 de ședințe), plătită parțial (cât a dat, unde, 15 incluse și restul la datorie), în vederea perfecționării (fără incluse), provizorie (15 incluse până afli) și altfel (o taxă stabilită, achitată sau nu — ca pachetul de 850 cu 3 ședințe — ori doar ședințele rămase de la alt coleg).",
        "Școlarizarea provizorie are semnul galben de lucrări lângă nume, peste tot unde apare elevul, și un rând pe Acasă. De pe fișă: „Completează școlarizarea” — orele socotite provizoriu se înlocuiesc, iar ședințele lui deja puse se potrivesc la noul număr de incluse.",
        "Pe fișă, rândul „Școlarizare” arată felul ales; „Schimbă” retrage exact ce pusese cel vechi (taxe, plăți, ore) și pune noul fel.",
        "La capăt: rezumatul, cu fiecare rând de atins ca să-l schimbi, apoi elevul e în listă și îi trimiți pe loc mesajul de bun venit, în limba lui. De acolo deschizi fișa (examene, disponibilitate, agendă) sau treci la următorul elev.",
        "Limbile ședințelor: pe lângă engleză, ucraineană, rusă, turcă, franceză, germană, italiană și spaniolă, cu mesajele scrise (bun venit, programare, mutare, anulare, lista ședințelor). Fiecare limbă are tariful ei, în program și peste program, adăugată de pe fișă, din formular sau din pașii elevului nou. O limbă din afara listei se poate adăuga cu numele ei; mesajele pentru ea pleacă în engleză.",
        "Finanțe → Detalii salariu: limbile tale cu tarifele lor, de schimbat sau de șters, iar salariul are rând pentru fiecare limbă. Setări → Numele tău și școala: mesajul de bun venit în fiecare limbă, de schimbat ca pe cel în română."
    ],
    scurt: "Elevul nou se adaugă pas cu pas: CNP-ul îi dă data nașterii, alegi școlarizarea și limba ședințelor, apoi îi trimiți bun venitul în limba lui."
}, {
    v: "v2.60.3.5",
    titlu: "Mesaje în engleză",
    puncte: ["Pe fișa elevului, sus lângă grupă, alegi RO sau EN: limba ședințelor lui și a mesajelor către el. Tot acolo e și în formular, în „Persoana”, ca s-o alegi chiar când îl adaugi.", "Când schimbi limba, trec pe ea și ședințele lui de acum înainte încă nefăcute; cele efectuate rămân cum au fost.", "Pentru elevii pe English, mesajul de bun venit și lista ședințelor programate se scriu în engleză.", "La fiecare ședință, limba din Detalii avansate hotărăște mesajul: programarea, mutarea (ziua, ora, locul) și anularea ies în engleză când ședința e în engleză. Pornește singură din fișa elevului, iar o poți schimba la o ședință anume.", "Mesajul de bun venit în engleză are textul lui în Setări → Numele tău și școala, pe care îl poți schimba la fel ca pe cel în română."],
    scurt: "Pe fișa elevului alegi RO sau EN; elevii pe English primesc în engleză mesajul de bun venit și pe cele despre ședințe."
}, {
    v: "v2.59.3.5",
    titlu: "„Ce e nou”, mai pe scurt",
    puncte: ["„Ce e nou” are două feluri: tu vezi toate amănuntele, ca până acum, iar ceilalți utilizatori văd fiecare versiune într-o frază, fără detalii tehnice. Schimbările care te privesc doar pe tine nu le apar deloc.", "Sus, în „Ce e nou”, comuți între „Detaliat” și „Pe scurt”, ca să vezi exact ce văd ceilalți.", "Pagina pe care elevul își trimite programul arată jos versiunea aplicației de acum, oricare ar fi ea, fără s-o mai urci la fiecare versiune."],
    scurt: "Schimbările fiecărei versiuni se citesc acum într-o frază, doar ce te privește."
}, {
    v: "v2.58.3.4",
    scurt: "Sugestiile din calendar propun fiecare elev la ora la care chiar poate, câte doi pe interval, și nu mai apar în timpul examenului practic.",
    titlu: "Sugestii pe ore",
    puncte: ["„Umple golul” propune elevii la ora la care chiar pot: cel liber oricând, de la începutul golului; cel care poate de la 15:00, de la 15:00. Câte doi la aceeași oră, pe mai multe intervale ale zilei.", "Fiecare elev e propus o singură dată pe zi, la cea mai devreme oră potrivită; atinsă, sugestia deschide ședința la ora ei.", "În timpul examenului practic nu se mai propune nimeni. Pe Axă, examenul e o bandă cu numele scris în ea, iar rama mov punctată de peste orele libere a dispărut."]
}, {
    v: "v2.57.3.4",
    scurt: "Pagina pe care elevul își trimite programul arată toată luna, cu numele lunii la vedere; poate vedea și doar una, două sau trei săptămâni.",
    titlu: "Pagina elevului, pe luni",
    puncte: ["Elevul vede calendarul pe toată luna, cu numele lunii mare, sus, care rămâne la vedere cât derulează.", "Luna o alege din file (luna de acum și următoarele cinci), deci nu se schimbă pe nesimțite. Lunile în care a ales zile anume au un punct.", "Poate vedea și doar 1, 2 sau 3 săptămâni, cu „Înapoi” și „Înainte” în luna aleasă; la capătul lunii se oprește și îi spune s-o aleagă pe următoarea."]
}, {
    v: "v2.57.3",
    scurt: "Notițele apar și în vederea pe axă, iar căutarea în Elevi nu mai mută lista.",
    titlu: "Notițe pe Axă, căutare fără fugă",
    puncte: ["În Calendar, pe Axă, ședințele își arată notița, ca în Listă: sub nume la cele lungi, lângă oră la cele scurte.", "La căutarea în Elevi, lista nu mai fuge singură la Promovați sau Retrași: grupurile se deschid pe loc, iar rezultatele rămân sub bară."]
}, {
    v: "v2.57.2",
    scurt: "Aplicația merge mai lin, iar ecranul nu se mai mărește din greșeală.",
    titlu: "Mai lin",
    puncte: ["La schimbarea ecranelor, cardurile apar mai repede, fiecare la rândul lui, fără ecran gol și fără legănat.", "Fundalul și cardurile de sticlă cer mult mai puțin telefonului: derularea merge mai lin, mai ales pe Acasă.", "Aplicația nu se mai mărește din greșeală, nici cu două degete, nici la atingeri repetate, inclusiv pe golurile din Calendar."]
}, {
    v: "v2.57.1",
    scurt: "Bara de căutare din Elevi rămâne sus, iar fișa ședinței e așezată pe trei grupuri: cine, când, unde.",
    titlu: "Căutare liniștită, ședința pe grupuri",
    puncte: ["În Elevi, bara de căutare rămâne sus când derulezi lista, ca să nu mai urci după ea.", "Cât scrii, lista nu mai sare: rezultatele încep chiar sub bară și apar ușor, fără mișcare.", "Fișa ședinței e așezată în trei grupuri: cine (starea, apoi elevul), când (ziua și ora pe un rând, cu orele mai strânse dedesubt) și unde (locul și tipul orei)."]
}, {
    v: "v2.57.0",
    scurt: "În Calendar poți vedea ziua și pe o axă a orelor: ședințele și golurile se văd cât sunt de lungi.",
    titlu: "Ziua pe o axă",
    puncte: ["În Calendar, deasupra zilei, alegi cum o vezi: „Listă”, ca până acum, sau „Axă”. Pe axă, fiecare ședință e cât de lungă e de fapt, iar golurile se văd cât sunt de mari.", "Atingi un gol și ședința nouă pornește de la ora din locul atins. Semnele de stare, examenele, teoreticul și intervalele indisponibile arată la fel ca în listă.", "Alegerea se ține minte pe telefon."]
}, {
    v: "v2.56.0.1",
    scurt: "Elevul își trimite programul dintr-un calendar: alege cum poate în fiecare zi.",
    titlu: "Pagina elevului, cu calendar",
    puncte: ["Pagina pe care elevul își trimite programul arată acum un calendar. Atinge o zi, alege cum poate, iar alegerea se pune singură în fiecare zi la fel din săptămână. O zi anume o poate schimba separat.", "Elevul alege câte săptămâni vede: 2, 4, 6 sau 8. Pornește cu 4.", "Răspunsul lui aduce pe fișă și zilele anume, iar planul le respectă."]
}, {
    v: "v2.56.0",
    scurt: "Pe fișa elevului, disponibilitatea se alege dintr-un calendar, pe zilele săptămânii sau pe date anume.",
    titlu: "Disponibilitatea, pe calendar",
    puncte: ["Pe fișa elevului, disponibilitatea e un calendar: atingi o zi și alegi cum poate. Cu „La fel în fiecare…” se pune în toate zilele de felul acela; fără, rămâne doar pe data aleasă.", "Litera de deasupra fiecărei coloane schimbă dintr-o dată toate zilele de felul ei.", "Ritmul și „Indisponibil o perioadă” au rămas. Tura de lucru și zilele din lună nu se mai completează; unde erau deja trecute, se văd sub calendar și le poți scoate."]
}, {
    v: "v2.55.0",
    scurt: "Anunțul de spălat mașina apare și în Calendar, Setările au grupe și căutare, iar butonul „+” de pe Acasă strânge acțiunile la un loc.",
    titlu: "Spălatul mașinii, și în Calendar",
    puncte: ["Anunțul de spălat mașina apare acum și în Calendar, pe ziua dinaintea examenului practic. Îl atingi și se deschide formularul, pe o oră liberă din ziua aceea.", "La examenul teoretic, anunțurile de pe Acasă arată și ora.", "La disponibilitate, „nu poate” se numește acum „indisponibil” — pe fișă și în pagina trimisă elevului.", "Setările sunt strânse în cinci grupe și au căutare; găsești orice rând după un cuvânt. Tema se schimbă dintr-o atingere, chiar de sus.", "Pe Acasă, butonul „+” strânge acțiunile într-un singur loc: ședință nouă, interval indisponibil, planificator, elev nou, „Când sunt ocupat” și Setări.", "În Calendar, „Marchează indisponibil” și „Când sunt ocupat” stau pe un rând. Pe fișa elevului, plata e sus, lângă creion și „Ședință nouă”.", "Antetul cu mașina e din nou exact cum era."]
}, {
    v: "v2.54.1",
    scurt: "Aplicația are o înfățișare nouă, întunecată, cu carduri de sticlă și animații.",
    titlu: "Înfățișare nouă",
    puncte: ["Aplicația arată altfel: fundal întunecat cu lumini care se mișcă încet, carduri de sticlă și o bară de jos care plutește. Antetul cu mașina a rămas cum îl știi.", "Butoanele se strâng ușor la atingere, iar cardurile urcă pe rând când deschizi aplicația sau schimbi ecranul.", "Pe telefoanele cu Android, acțiunile importante dau o vibrație scurtă. iPhone-ul nu permite asta."]
}, {
    v: "v2.54.0",
    scurt: "Cu o zi înainte de examenul practic, aplicația îți amintește să păstrezi o oră pentru spălat mașina. Setările sunt acum la rotița de pe Acasă.",
    titlu: "Mașina, spălată înainte de examen",
    puncte: ["Cu o zi înainte de un examen practic, pe Acasă apare un anunț: pune o oră liberă, să speli mașina. Îl atingi și Calendarul se deschide cu ora gata propusă — o schimbi dacă vrei și salvezi.", "Setările s-au mutat din bara de jos la rotița de pe Acasă, lângă dată. Bara rămâne cu cinci file."]
}, {
    v: "v2.53.0",
    scurt: "Mesajul de mutare către elev spune clar ce s-a schimbat: ziua, ora sau locul.",
    titlu: "Mesajul de mutare spune \u0219i ziua",
    puncte: ["C\xE2nd mu\u021Bi o \u0219edin\u021B\u0103, mesajul pentru elev nume\u0219te ce s-a schimbat: ZIUA, ORA, LOCUL sau mai multe deodat\u0103. P\xE2n\u0103 acum scria doar \u201Ese schimb\u0103 ORA\u201D, chiar \u0219i c\xE2nd o mutai \xEEn alt\u0103 zi.", "Intervalul marcat indisponibil peste un examen le arat\u0103 pe am\xE2ndou\u0103 \xEEn calendar: examenul r\u0103m\xE2ne \xEEnsemnat, cu ha\u0219ura de indisponibil peste el."]
}, {
    v: "v2.52.0",
    scurt: "Un buton din Calendar îți scrie singur orele în care ești ocupat, ca să le trimiți elevilor.",
    titlu: "C\xE2nd sunt ocupat \u2014 text pentru elev",
    puncte: ["\xCEn Calendar, sub banda s\u0103pt\u0103m\xE2nii, ai un buton care \xEE\u021Bi scrie singur ce ai ocupat: \u201ELuni 9 noiembrie \u2014 ocupat 08:30\u201310:00, 12:00\u201319:00\u201D \u0219i a\u0219a mai departe. \u0218edin\u021Bele lipite se adun\u0103 \xEEntr-un singur interval, zilele goale se spun libere, iar cele nelucr\u0103toare ca atare.", "\xCEl ceri pe o s\u0103pt\u0103m\xE2n\u0103, dou\u0103, trei sau o lun\u0103, \xEEncep\xE2nd de la s\u0103pt\u0103m\xE2na la care te ui\u021Bi. \xCEl copiezi sau \xEEl trimi\u021Bi direct pe WhatsApp. Se spune doar c\xE2t e ocupat, niciodat\u0103 cu cine."]
}, {
    v: "v2.51.1",
    scurt: "Elevul plecat o perioadă iese și din planul făcut înainte.",
    titlu: "Elevul plecat iese \u0219i din planul f\u0103cut mai devreme",
    puncte: ["C\xE2nd bifezi \u201EIndisponibil o perioad\u0103\u201D, propunerile planului care cad \xEEn zilele lui de lips\u0103 se \u0219terg pe loc. P\xE2n\u0103 acum r\u0103m\xE2neau pe ecran, dac\u0103 planul fusese f\u0103cut \xEEnainte s\u0103 te anun\u021Be. \u0218edin\u021Bele pe care le-ai pus tu r\u0103m\xE2n, ca s\u0103 le mu\u021Bi sau s\u0103 le anulezi cum socote\u0219ti."]
}, {
    v: "v2.51.0",
    scurt: "Planul împarte ședințele mai drept între elevi și le strânge în zi, fără goluri mari.",
    titlu: "Planul \xEEmparte mai drept \u0219i str\xE2nge ziua",
    puncte: ["Fiecare elev prime\u0219te \xEEnt\xE2i o \u0219edin\u021B\u0103 pe s\u0103pt\u0103m\xE2n\u0103, abia apoi se dau a doua \u0219i a treia. P\xE2n\u0103 acum, un elev liber toat\u0103 s\u0103pt\u0103m\xE2na lua trei, iar altul, potrivit mai greu, r\u0103m\xE2nea cu niciuna.", "\u0218edin\u021Bele unei zile se adun\u0103 una l\xE2ng\u0103 alta. Dac\u0103 un elev poate abia de la 14:30, cel care poate oric\xE2nd intr\u0103 la 13:00, lipit de el \u2014 nu la prima or\u0103 a zilei, cu \u0219ase ore de gol la mijloc."]
}, {
    v: "v2.50.0.1",
    scurt: "La programul primit de la elev scrie ce face fiecare buton.",
    titlu: "La \u201EProgram primit\u201D scrie ce face fiecare buton",
    puncte: ["Sub cele dou\u0103 butoane st\u0103 scris limpede: \u201EFolose\u0219te-l \xEEn plan\u201D pune zilele elevului \xEEn Disponibilitate, iar \u201EDoar \xEEl p\u0103strez\u201D \xEEl \u021Bine deoparte, f\u0103r\u0103 s\u0103 schimbe nimic pe fi\u0219\u0103."]
}, {
    v: "v2.50.0",
    scurt: "Telefonul nu mai propune contacte sau date de card în câmpurile aplicației.",
    titlu: "F\u0103r\u0103 completare automat\u0103, nic\u0103ieri",
    puncte: ["Niciun c\xE2mp din aplica\u021Bie nu mai cere completare automat\u0103: nici contacte din agend\u0103, nici date de card, nici parole salvate. Pe iPhone, \u021Binutul ap\u0103sat pe c\xE2mpul de telefon arat\u0103 iar \u201ELipire\u201D \u2014 p\xE2n\u0103 acum telefonul credea c\u0103 e num\u0103rul t\u0103u \u0219i \xEE\u021Bi oferea agenda \xEEn loc. Tastatura cu cifre a r\u0103mas la fel."]
}, {
    v: "v2.49.0.2",
    scurt: "Pagina pe care elevul își trimite programul e mai scurtă.",
    titlu: "Pagina elevului, mai scurt\u0103",
    puncte: ["Pe pagina pe care elevul \xEE\u0219i trimite programul au r\u0103mas zilele s\u0103pt\u0103m\xE2nii, perioada \xEEn care lipse\u0219te \u0219i un mesaj pentru tine. Turele \u0219i zilele pare sau impare le treci tu pe fi\u0219\u0103, ca p\xE2n\u0103 acum."]
}, {
    v: "v2.49.0.1",
    scurt: "Îi poți cere elevului, pe WhatsApp, să-ți spună când poate; răspunsul intră direct pe fișa lui.",
    titlu: "Programul trimis de elev",
    puncte: ["Din fi\u0219a elevului \xEEi po\u021Bi cere chiar lui s\u0103-\u021Bi spun\u0103 c\xE2nd poate. R\u0103spunsul vine \xEEnapoi gata de pus pe fi\u0219\u0103.",
        "Pas cu pas: 1) deschizi fi\u0219a elevului salvat \u0219i ape\u0219i \u201ECere-i programul\u201D \u2014 se deschide WhatsApp cu linkul scris. 2) Elevul \xEEl deschide, bifeaz\u0103 pentru fiecare zi cum poate \u0219i apas\u0103 trimite; \xEE\u021Bi vine \xEEnapoi un mesaj cu un link. 3) Atingi linkul primit \u2014 sau, dac\u0103 nu se deschide, copiezi mesajul \u0219i ape\u0219i \u201ELipe\u0219te r\u0103spunsul\u201D. 4) Vezi ce a spus \u0219i ce s-ar schimba pe fi\u0219\u0103, apoi alegi: \u201EFolose\u0219te-l \xEEn plan\u201D \u021Bine cont de el la programare, \u201EDoar \xEEl p\u0103strez\u201D \xEEl las\u0103 deoparte, f\u0103r\u0103 s\u0103 schimbe nimic.",
        "Nimic nu pleac\u0103 pe vreun server: totul c\u0103l\u0103tore\u0219te \xEEn link, \xEEntre telefonul t\u0103u \u0219i al lui. \u201ERevino la ce era\u201D anuleaz\u0103 oric\xE2nd."]
}, {
    v: "v2.49.0",
    scurt: "Poți nota orele în care elevul nu poate, de exemplu când are cursuri, iar planul le ocolește.",
    titlu: "Ore \xEEn care elevul nu poate, \u0219i listele de examen",
    puncte: ["La disponibilitate ai acum \u0219i \u201Enu poate \xEEntre\u2026\u201D: elevul cu cursuri de la 14 la 18 lunea e liber tot restul zilei, iar planul \xEEl programeaz\u0103 \xEEnainte sau dup\u0103.", "Elevii cu examen \xEEn aceea\u0219i zi apar \xEEn ordinea numelui \u2014 \u0219i la practic, \u0219i la teoretic, \u0219i la cei care au dat deja."]
}, {
    v: "v2.48.0",
    scurt: "Elevii care au deja permis pot fi trecuți la perfecționare, fără examene și fără adeverință.",
    titlu: "Elevi veni\u021Bi la perfec\u021Bionare",
    puncte: ["Pe fi\u0219a elevului po\u021Bi bifa \u201EVine la perfec\u021Bionare\u201D, pentru cine are deja permisul \u0219i vrea doar ore la volan. Intr\u0103 \xEEn plan ca oricare, dar f\u0103r\u0103 examene, f\u0103r\u0103 adeverin\u021B\u0103 \u0219i f\u0103r\u0103 \u0219edin\u021Be obligatorii \u2014 nu-l privesc.", "\u0218edin\u021Bele lui sunt suplimentare din start, iar \xEEn list\u0103 poart\u0103 un semn, ca s\u0103-l deosebe\u0219ti dintr-o privire."]
}, {
    v: "v2.47.0",
    scurt: "Examenul teoretic are și oră, iar ședințele vândute la bucată se numără separat de pachete.",
    titlu: "Contorul de \u0219edin\u021Be \u0219i ora la teoretic",
    puncte: ["Contorul num\u0103r\u0103 acum altfel: \u0219edin\u021Bele incluse, plus locurile din pachete, plus \u0219edin\u021Bele v\xE2ndute la bucat\u0103. Cele la bucat\u0103 nu mai m\u0103n\xE2nc\u0103 din pachete \u2014 le vinzi pe loc, nu ies din nicio pung\u0103.", "Un pachet pus dup\u0103 ce elevul a \u0219i condus acoper\u0103 \u0219edin\u021Bele nedecontate; pe cele achitate nu le mai atinge.", "Examenul teoretic are acum \u0219i or\u0103. Se vede \xEEn anun\u021Buri, iar \xEEn calendar se coloreaz\u0103 intervalul \xEEn care cade \u2014 doar ca semn, ora r\u0103m\xE2ne liber\u0103 de programat."]
}, {
    v: "v2.46.0",
    scurt: "Poți pune de mai multe ori același pachet, de exemplu la o nouă reexaminare.",
    titlu: "\xCEnc\u0103 un pachet la fel",
    puncte: ["Pe fi\u0219a elevului, la \u0218colarizare, po\u021Bi pune \xEEnc\u0103 un pachet identic cu cel de acum \u2014 a doua reexaminare, de pild\u0103. P\xE2n\u0103 acum, reatingeai acela\u0219i card \u0219i nu se \xEEnt\xE2mpla nimic: nici orele, nici taxa nu intrau.", "Cardul arat\u0103 de c\xE2te ori a fost pus pachetul."]
}, {
    v: "v2.45.1",
    scurt: "Datoria elevului se socotește corect când îi pui un pachet nou.",
    titlu: "Datoria elevului, socotit\u0103 corect",
    puncte: ["Un pachet pus ast\u0103zi nu mai \u0219terge de la plat\u0103 \u0219edin\u021Be de acum dou\u0103 luni, pe care elevul le-a achitat deja. Acoper\u0103 doar \u0219edin\u021Bele de la ziua lui \xEEncolo."]
}, {
    v: "v2.45.0",
    scurt: "În Plan poți cere o pauză de una până la trei zile între ședințele aceluiași elev.",
    titlu: "Ritmul \u0219edin\u021Belor",
    puncte: ["\xCEn Plan po\u021Bi cere o pauz\u0103 \xEEntre \u0219edin\u021Bele aceluia\u0219i elev: o zi, dou\u0103 sau trei. Dac\u0103 elevul poate doar \xEEn zile una dup\u0103 alta, le prime\u0219te oricum.", "Pauza scris\u0103 pe fi\u0219a unui elev r\u0103m\xE2ne a lui \u0219i se \u021Bine \xEEntocmai, oricare ar fi alegerea din Plan."]
}, {
    v: "v2.43.0",
    scurt: "Alegi după câte ședințe ți se spune că elevul e gata de teoretic.",
    titlu: "Pragul de \u201Egata de teoretic\u201D",
    puncte: ["\xCEn Set\u0103ri alegi dup\u0103 c\xE2te \u0219edin\u021Be efectuate \xEE\u021Bi d\u0103 de \u0219tire c\u0103 elevul poate merge la sal\u0103."]
}, {
    v: "v2.42.0",
    scurt: "Anunțurile de pe Acasă sunt mai bine grupate.",
    titlu: "Anun\u021Burile de pe Acas\u0103",
    puncte: ["Elevii gata de teoretic stau str\xE2n\u0219i sub titlul lor \u0219i se desfac la atingere.", "Examenele practice \u0219i cele teoretice au fiecare grupul lui \xEEn \u201ENecesit\u0103 aten\u021Bie\u201D.", "\xCEn Statistici, ap\u0103s\xE2nd pe \u201EElevi promova\u021Bi\u201D se desface lista lor, cea mai proasp\u0103t\u0103 promovare \xEEn cap."]
}, {
    v: "v2.41.1",
    scurt: "În antet, soarele și luna urmează ora zilei.",
    titlu: "Soarele \u0219i luna, la locul lor",
    puncte: ["Soarele r\u0103sare, urc\u0103 \u0219i apune dup\u0103 ora zilei. Seara se v\u0103d am\xE2ndoi, noaptea doar luna.", "Butonul de perioad\u0103 a cobor\xEEt la piciorul antetului."]
}, {
    v: "v2.40.3",
    scurt: "Ședința anulată are acum semnul corect, ca pe șosea.",
    titlu: "Semnul de la \u0219edin\u021Ba anulat\u0103",
    puncte: ["\u0218edin\u021Ba anulat\u0103 purta un octogon cu bar\u0103 alb\u0103 \u2014 adic\u0103 forma lui STOP cu simbolul de la \u201EAccesul interzis\u201D, dou\u0103 semne amestecate \xEEntr-unul. Acum e cerc cu bar\u0103, cum e pe \u0219osea."]
}, {
    v: "v2.40.2",
    scurt: "Planul strânge ședințele zilei, ca să poți pleca mai târziu de acasă.",
    titlu: "Ziua, str\xE2ns\u0103 mai bine",
    puncte: ["Planul \xEEnchide golurile \xEEn care oricum n-ar \xEEnc\u0103pea alt\u0103 \u0219edin\u021B\u0103: dac\u0103 ai pus deja pe cineva la 10, elevul liber diminea\u021Ba intr\u0103 la 8:30, lipit de el, nu la 8 cu o jum\u0103tate de or\u0103 pierdut\u0103 la mijloc. A\u0219a po\u021Bi pleca de acas\u0103 mai t\xE2rziu.", "Se mut\u0103 doar mai t\xE2rziu pe ceas \u0219i numai dac\u0103 elevul poate la ora aceea, dac\u0103 nu cade pe o pauz\u0103 sau pe un interval barat. Ordinea zilei r\u0103m\xE2ne \xEEntocmai.", "\xCEn fi\u0219a elevului, zilele care ies din tipar au acum felul pe un r\xE2nd \u0219i orele pe r\xE2ndul urm\u0103tor \u2014 pe telefon ie\u0219eau t\u0103iate \u0219i nu vedeai ce ai ales."]
}, {
    v: "v2.40.1",
    scurt: "Sugestiile din calendar țin cont de ora la care poate elevul și îi pun în față pe cei aproape de final.",
    titlu: "Sugestiile rapide, \xEEn ordinea potrivit\u0103",
    puncte: ["La sugestiile din calendar apar acum \xEEnt\xE2i elevii c\u0103rora le-au mai r\u0103mas pu\u021Bine ore \u2014 \xEEi \xEEnchei \u0219i r\u0103m\xE2i cu mintea liber\u0103 pentru cei noi. Cei gr\u0103bi\u021Bi \u0219i cei cu examenul aproape r\u0103m\xE2n \xEEnaintea tuturor, ca p\xE2n\u0103 acum.", "Sugestiile \u021Bin cont \u0219i de ora la care poate elevul: cine poate doar de la 18:00 nu mai apare \xEEntr-un gol de diminea\u021B\u0103.", "Reparat: sugestiile rapide \u021Bineau deoparte trei \u0219edin\u021Be chiar \u0219i cu rezerva de examen oprit\u0103 \u2014 a\u0219a c\u0103 elevul cu exact trei ore r\u0103mase nu era propus niciodat\u0103. Tocmai cel pe care vrei s\u0103-l \xEEnchei."]
}, {
    v: "v2.40.0",
    scurt: "Pe fișa elevului, fiecare zi a săptămânii poate avea orele ei, iar planul le respectă.",
    titlu: "Disponibilitatea elevului, pe fiecare zi",
    puncte: ["\xCEn fi\u0219a elevului, la Disponibilitate, fiecare zi poate avea felul ei: ca de obicei, oric\xE2nd, de la o or\u0103, p\xE2n\u0103 la o or\u0103, \xEEntre dou\u0103 ore, sau nu poate deloc. Zilele l\u0103sate pe \u201Eca de obicei\u201D merg dup\u0103 regula general\u0103 de sus, deci pentru elevii simpli n-ai nimic de completat \xEEn plus.", "Planul ascult\u0103 ce ai scris: dac\u0103 un elev poate miercuri doar de la 16:30, nu-l mai pune la 10.", "C\xE2nd elevul n-a spus nimic, r\u0103m\xE2ne ca p\xE2n\u0103 acum \u2014 planul se bizuie pe orele la care a venit de obicei."]
}, {
    v: "v2.39.5",
    scurt: "Poți alege locul din care îți începi ziua, iar planul îți dă prima ședință acolo.",
    titlu: "De unde \xEE\u021Bi \xEEncepi ziua",
    puncte: ["\xCEn Set\u0103ri \u2192 Loca\u021Bii, la \u201ECasa ta\u201D, po\u021Bi alege acum \u0219i locul din care \xEE\u021Bi \xEEncepe ziua \u2014 o benzin\u0103rie, \u0219coala, orice loc de-al t\u0103u. Planul \xEE\u021Bi d\u0103 prima \u0219edin\u021B\u0103 cu un elev chemat acolo, iar ultima c\u0103tre cas\u0103.", "Dac\u0103 nu alegi niciunul, diminea\u021Ba se socote\u0219te tot de acas\u0103, ca p\xE2n\u0103 acum.", "Reparat: dac\u0103 diminea\u021Ba lua chiar elevul de la ultima or\u0103, seara r\u0103m\xE2nea f\u0103r\u0103 ce alege \u0219i ziua se \xEEnchidea cu cine se nimerea."]
}, {
    v: "v2.39.4",
    scurt: "Ziua în care s-a dat examen rămâne însemnată în calendar, cu rezultatul.",
    titlu: "Ziua examenului r\u0103m\xE2ne \xEEnsemnat\u0103",
    puncte: ["Ziua \xEEn care s-a dat examen r\u0103m\xE2ne colorat\u0103 \xEEn calendar \u0219i dup\u0103 ce notezi rezultatul \u2014 \u0219i la practic, \u0219i la teoretic, promovat sau respins.", "\xCEn ziua aceea apare scris cine a dat examen \u0219i cu ce rezultat. P\xE2n\u0103 acum, la respins data se golea pentru reprogramare \u0219i ziua r\u0103m\xE2nea goal\u0103, de parc\u0103 n-ar fi fost nimic."]
}, {
    v: "v2.39.3",
    scurt: "Un pachet nou plătește ședințele de după el, nu pe cele vechi.",
    titlu: "Pachetul acoper\u0103 \u0219edin\u021Bele de dup\u0103 el",
    puncte: ["Un pachet cu ore suplimentare acoper\u0103 acum \u0219edin\u021Bele de la ziua \xEEn care l-ai pus \xEEncolo. \xCEnainte, toate orele se adunau \xEEntr-o oal\u0103 \u0219i se d\u0103deau celor mai vechi \u0219edin\u021Be \u2014 a\u0219a un pachet pus azi pl\u0103tea \u0219edin\u021Be de acum trei luni, iar cele pentru care l-ai pus r\u0103m\xE2neau \u201Ede plat\u0103\u201D.", "Suma datorat\u0103 era corect\u0103 \u0219i \xEEnainte; gre\u0219it\u0103 era doar \xEEmp\u0103r\u021Birea pe \u0219edin\u021Be. La elevii de dinainte nu se schimb\u0103 nimic."]
}, {
    v: "v2.39.2",
    scurt: "Îți poți trece casa, iar planul îți dă prima și ultima ședință cu elevii chemați mai aproape de tine.",
    titlu: "Drumul t\u0103u de diminea\u021B\u0103 \u0219i de sear\u0103",
    puncte: ["\xCEn Set\u0103ri \u2192 Loca\u021Bii \xEE\u021Bi pui casa, cu aproxima\u021Bie \u2014 link de hart\u0103, coordonate, Plus Code sau luat\u0103 de la o loca\u021Bie salvat\u0103.", "Cu ea pus\u0103, planul \xEE\u021Bi d\u0103 prima \u0219i ultima \u0219edin\u021B\u0103 a zilei cu elevii pe care \xEEi chemi mai aproape de tine \u2014 socoteala se face dup\u0103 locul de \xEEnt\xE2lnire de pe fi\u0219a fiec\u0103ruia, nu dup\u0103 unde locuie\u0219te, iar cei de departe r\u0103m\xE2n la mijloc, c\xE2nd e\u0219ti oricum pe drum. Nu se schimb\u0103 cine lucreaz\u0103 \u0219i nici c\xE2te ore face cineva \u2014 doar ordinea, \u0219i numai dac\u0103 am\xE2ndoi elevii pot la ora cel\u0103lalt.", "Domiciliul elevului se vede pe fi\u0219a lui, ca r\xE2nd \xEEntreg pe care ape\u0219i \u0219i te duce \xEEn hart\u0103: \u201E25 km sud de tine\u201D, cu codul dedesubt. Locul de \xEEnt\xE2lnire \xEE\u0219i arat\u0103 \u0219i el distan\u021Ba, ca s\u0103 \u0219tii de ce planul \xEEl pune unde-l pune.", "\u0218i gruparea pe hart\u0103 din Plan socote\u0219te acum dup\u0103 locul de \xEEnt\xE2lnire: doi elevi pe care \xEEi chemi am\xE2ndoi la N\u0103vodari sunt, pentru tine, \xEEn acela\u0219i loc \u2014 chiar dac\u0103 unul st\u0103 \xEEn Corbu \u0219i altul l\xE2ng\u0103 Tulcea.", "F\u0103r\u0103 casa pus\u0103, planul lucreaz\u0103 exact ca p\xE2n\u0103 acum."]
}, {
    v: "v2.38.5",
    scurt: "În Elevi, căutarea rămâne sus cât derulezi lista.",
    titlu: "Bara de c\u0103utare r\u0103m\xE2ne sus",
    puncte: ["\xCEn fila Elevi, bara de c\u0103utare \u0219i sortarea r\u0103m\xE2n lipite de marginea de sus c\xE2t derulezi lista \u2014 nu mai urci tot drumul \xEEnapoi ca s\u0103 cau\u021Bi pe cineva.", "Semnul de \xEEn\u0219tiin\u021Bare a trecut \xEEn col\u021Bul din dreapta sus, ca bulina de pe aplica\u021Biile de mail."]
}, {
    v: "v2.38.4",
    scurt: "Din anunțul de pe Acasă, fișa elevului se deschide direct la Examene.",
    titlu: "Semnul desenat \u0219i saltul drept la teoretic",
    puncte: ["Semnul de \xEEn\u0219tiin\u021Bare e acum desenat \u2014 \u0219ase bra\u021Be dintr-un punct, ca o floricic\u0103 \u2014 \u0219i st\u0103 \xEEn col\u021Bul din st\xE2nga sus, nu lipit de cuv\xE2nt.", "Din \xEEn\u0219tiin\u021Barea de pe Acas\u0103, fi\u0219a se deschide cu sec\u021Biunea Examene adus\u0103 \xEEn c\xE2mpul vizual \u0219i cu fila Teoretic deja aleas\u0103."]
}, {
    v: "v2.38.3",
    scurt: null,
    titlu: "Anun\u021Bul de dup\u0103 adeverin\u021B\u0103, doar c\xE2nd trebuie",
    puncte: ["\u201E\u0218edin\u021Be obligatorii dup\u0103 adeverin\u021B\u0103\u201D nu mai apare pe fi\u0219a elevului c\u0103ruia i-ai prins deja o dat\u0103 de examen care n-a trecut. R\u0103m\xE2ne doar c\xE2t timp chiar a\u0219teapt\u0103 reprogramarea, \u0219i revine dac\u0103 data a trecut."]
}, {
    v: "v2.38.2",
    scurt: "După a zecea ședință, elevul primește un asterisc: e gata de teoretic.",
    titlu: "Gata de sal\u0103, de la a zecea \u0219edin\u021B\u0103",
    puncte: ["Dup\u0103 a zecea \u0219edin\u021B\u0103 efectuat\u0103, elevul prime\u0219te un asterisc l\xE2ng\u0103 nume, peste tot unde apare: Acas\u0103, calendar, list\u0103, plan, fi\u0219\u0103.", "Pe Acas\u0103 apare \u0219i scris cine e gata, cu num\u0103rul de \u0219edin\u021Be la zi. Atingi r\xE2ndul \u0219i se deschide fi\u0219a lui, drept la sec\u021Biunea Examene, unde \xEEi pui data.", "R\xE2ndul \u201EExamene\u201D poart\u0103 \u0219i el asteriscul, ca s\u0103 \u0219tii de unde vine semnul dac\u0103 vrei s\u0103 ajungi acolo singur.", "Semnul se stinge de \xEEndat\u0103 ce i-ai pus o dat\u0103 de teoretic sau dac\u0103 l-a luat deja. \u0218edin\u021Bele doar programate nu se pun la socoteal\u0103."]
}, {
    v: "v2.38.1",
    scurt: "Păstrarea ultimelor ședințe pentru examen e acum la alegerea ta, din Setări.",
    titlu: "Rezerva de examen, la alegerea ta",
    puncte: ["P\u0103strarea ultimelor \u0219edin\u021Be pentru perioada examenului e acum OPRIT\u0103 din pornire. Legea cere ca elevul s\u0103 aib\u0103 toate \u0219edin\u021Bele efectuate, iar aplica\u021Bia n-are de ce s\u0103 hot\u0103rasc\u0103 asta \xEEn locul t\u0103u.", "O porne\u0219ti din Set\u0103ri \u2192 Program de lucru, dac\u0103 o vrei, \u0219i alegi c\xE2te \u0219edin\u021Be p\u0103strezi \u2014 \xEEntre una \u0219i zece.", "C\xE2t e oprit\u0103, planul programeaz\u0103 toate orele elevului, iar bifa de rezerv\u0103 din Plan nu mai apare degeaba."]
}, {
    v: "v2.38.0",
    scurt: "Mesajul de schimbare către elev arată clar ce s-a mutat, cu harta locului nou.",
    titlu: "Mesajul de schimbare spune limpede ce s-a mutat",
    puncte: ["C\xE2nd schimbi o \u0219edin\u021B\u0103, mesajul c\u0103tre elev spune exact ce s-a mutat: ora, locul sau am\xE2ndou\u0103. Ce era iese \xEEnclinat, ce e acum iese \xEEngro\u0219at, cu harta locului nou.", "C\xE2nd se schimb\u0103 am\xE2ndou\u0103, mesajul scrie \xEEngro\u0219at, pe r\xE2ndul lui: \u201EATEN\u021AIE: se schimb\u0103 \u0219i ORA, \u0219i LOCUL\u201D.", "Reparat: c\xE2nd se schimbau \u0219i ora, \u0219i locul, aplica\u021Bia \u021Binea minte doar ora veche, iar mesajul nu pomenea c\u0103 s-a mutat \u0219i locul."]
}, {
    v: "v2.37.9",
    scurt: "Planul pune fiecare elev pe lângă orele la care vine de obicei.",
    titlu: "Planul \u021Bine minte ora fiec\u0103rui elev",
    puncte: ["Planul nu mai crede c\u0103 un elev cu o \u0219edin\u021B\u0103 la 9 \u0219i una la 18 e liber toat\u0103 ziua. Se uit\u0103 unde se \xEEngr\u0103m\u0103desc \u0219edin\u021Bele lui de p\xE2n\u0103 acum \u0219i \xEEl a\u0219az\u0103 pe aproape: cu 9, 18 \u0219i 20 \xEEn spate, \xEEl pune \xEEn jurul orei 19, nu la 9.", "Nu e o regul\u0103 de fier \u2014 dac\u0103 la ora aceea nu se poate, \xEEl a\u0219az\u0103 unde \xEEncape, ca p\xE2n\u0103 acum. Elevul f\u0103r\u0103 trecut n-are nicio preferin\u021B\u0103.", "\u0218edin\u021Bele deja puse r\u0103m\xE2n la vedere chiar dac\u0103 str\xE2ngi \xEEntre timp programul de lucru: una de la 7:30 nu dispare fiindc\u0103 ai mutat \xEEnceputul la 10."]
}, {
    v: "v2.37.8",
    scurt: "Zilele marcate indisponibile se văd direct în banda săptămânii.",
    titlu: "Zilele indisponibile se v\u0103d din band\u0103",
    puncte: ["Ziua pe care ai marcat-o indisponibil\u0103 poart\u0103 un semn de exclamare \u0219i o umbr\u0103 \xEEn c\u0103su\u021Ba ei din band\u0103 \u2014 o vezi derul\xE2nd prin s\u0103pt\u0103m\xE2ni, f\u0103r\u0103 s\u0103 intri \xEEn ea. Ziua barat\u0103 toat\u0103 e ha\u0219urat\u0103, una cu doar un interval oprit are doar umbra.", "Pauzele de mas\u0103 nu marcheaz\u0103 zilele: sunt \xEEn fiecare zi, deci n-ar deosebi nimic."]
}, {
    v: "v2.37.7",
    scurt: "Elevii se pot sorta după ședințele efectuate și căuta după numărul de înregistrare.",
    titlu: "Sortare \u0219i c\u0103utare dup\u0103 num\u0103r",
    puncte: ["Sortarea dup\u0103 ore r\u0103mase se lua dup\u0103 alt\u0103 cifr\u0103 dec\xE2t cea scris\u0103 pe card \u2014 sc\u0103dea \u0219i \u0219edin\u021Bele doar programate. Acum urmeaz\u0103 exact ce vezi.", "Sortare nou\u0103, dup\u0103 ore efectuate.", "C\u0103utarea \xEEn Elevi prinde \u0219i num\u0103rul de \xEEnregistrare, cu sau f\u0103r\u0103 spa\u021Bii: \u201Ect05sev\u201D g\u0103se\u0219te \u201ECT 05 SEV\u201D."]
}, {
    v: "v2.37.6",
    scurt: "Îți poți pune pauze de masă zilnice, iar ziua cu examen teoretic se vede în calendar.",
    titlu: "Pauze de mas\u0103, teoretice \u0219i \xEEncadrare",
    puncte: ["\xCEn Set\u0103ri \u2192 Program de lucru \xEE\u021Bi pui pauzele de mas\u0103 \u2014 c\xE2te ai nevoie, cu ora \u0219i durata lor. Se repet\u0103 singure \xEEn fiecare zi de lucru, apar barate \xEEn calendar, planul le ocole\u0219te, iar dac\u0103 programezi peste una e\u0219ti avertizat.", "Ziua cu examen teoretic e marcat\u0103 \xEEn band\u0103 \u0219i anun\u021Bat\u0103 \xEEn ziua ei, ca cea cu practic \u2014 cu chenar punctat, fiindc\u0103 teoreticul nu \xEE\u021Bi ocup\u0103 ma\u0219ina.", "\u0218i teoreticul se noteaz\u0103 direct din calendar: Promovat sau Respins, ca la practic, cu contorul de sus\u021Bineri.", "Ma\u0219ina din antet \xEEncape acum \xEEntreag\u0103 pe orice ecran."]
}, {
    v: "v2.37.4",
    scurt: "Fiecare zi a săptămânii poate avea programul ei de lucru.",
    titlu: "Program pe zile \u0219i ore la volan",
    puncte: ["\xCEn Set\u0103ri \u2192 Program de lucru po\u021Bi da fiec\u0103rei zile orele ei: de luni p\xE2n\u0103 vineri de la 8:30, s\xE2mb\u0103ta de la 7 \u0219i p\xE2n\u0103 mai t\xE2rziu. Zilele pe care nu le atingi merg pe programul de baz\u0103.", "Calendarul, planul \u0219i grila de ore din fi\u0219a \u0219edin\u021Bei urmeaz\u0103 toate programul zilei.", "Pe Acas\u0103, \xEEn locul banilor pe ore suplimentare vezi c\xE2te ore stai la volan azi."]
}, {
    v: "v2.37.3",
    scurt: "Notițele se văd direct pe cardurile ședințelor.",
    titlu: "Noti\u021Bele se v\u0103d pe carduri",
    puncte: ["Pe cardul \u0219edin\u021Bei apare noti\u021Ba ei, iar dac\u0103 n-are una, cea mai nou\u0103 noti\u021B\u0103 din agenda elevului. Sunt dou\u0103 locuri deosebite \u0219i p\xE2n\u0103 acum se vedea doar primul.", "Se v\u0103d \u0219i pe Acas\u0103, \u0219i \xEEn calendar, inclusiv pe ecrane \xEEnguste.", "Ap\u0103sarea lung\u0103 nu mai cheam\u0103 meniul browserului. \xCEn c\xE2mpurile \xEEn care scrii po\u021Bi lipi ca \xEEnainte."]
}, {
    v: "v2.37.0",
    scurt: "Fișa elevului arată progresul dintr-o privire și e așezată pe grupuri.",
    titlu: "Fi\u0219a elevului, ca un bord",
    puncte: ["Sus, numele \u0219i datele lui pe o f\xE2\u0219ie de drum \xEEn apus, desenat\u0103 din culorile aplica\u021Biei.", "Progresul e acum un cadran care se umple: procentul \xEEn mijloc, \u0219edin\u021Bele f\u0103cute al\u0103turi, c\xE2te au r\u0103mas dedesubt \u0219i butonul de \u0219edin\u021B\u0103 nou\u0103 chiar l\xE2ng\u0103 ele.", "Restul fi\u0219ei s-a a\u0219ezat pe grupuri: examenele, datele, banii, agenda, istoricul.", "Trimiterea programului a cobor\xEEt l\xE2ng\u0103 istoric, iar transferul la alt instructor a r\u0103mas ultimul, ca ac\u021Biune rar\u0103.", "Nicio func\u021Bie n-a fost schimbat\u0103 \u2014 doar a\u0219ezarea lor."]
}, {
    v: "v2.36.9",
    scurt: "În Finanțe vezi câte ședințe ai făcut luna asta și cât mai ai până la pragul de salariu.",
    titlu: "Cur\u0103\u021Benie \u0219i c\xE2teva \xEEndrept\u0103ri",
    puncte: ["Rearanjarea zilei a fost scoas\u0103 cu totul.", "\u021Ainutul ap\u0103sat nu mai ridic\u0103 meniul telefonului nic\u0103ieri; \xEEn c\xE2mpurile \xEEn care scrii, selec\u021Bia r\u0103m\xE2ne.", "Butoanele de status nu mai dispar din fi\u0219a \u0219edin\u021Bei dup\u0103 ce ai umblat prin c\u0103utarea de elev.", "Cutia de viteze a ie\u0219it din fi\u0219a elevului \u2014 o d\u0103 ma\u0219ina lui.", "\xCEn Finan\u021Be, \xEEn locul banilor pe ore suplimentare vezi c\xE2te \u0219edin\u021Be ai f\u0103cut luna asta \u0219i c\xE2t mai ai p\xE2n\u0103 la pragul de salariu.", "Noti\u021Ba \u0219edin\u021Bei se vede pe card, \xEEntre nume \u0219i status."]
}, {
    v: "v2.36.8",
    scurt: null,
    titlu: "O cifr\u0103 l\u0103murit\u0103 \u0219i lini\u0219te la ap\u0103sare",
    puncte: ["\xCEn Finan\u021Be, cifra din st\xE2nga sus se numea \u201EDe la elevi\u201D, de\u0219i ar\u0103ta valoarea orelor suplimentare din luna aceea. Acum \xEE\u0219i spune numele: \u201EOre suplimentare \u2014 de \xEEncasat\u201D. \xCEncas\u0103rile lunii se v\u0103d, ca \u0219i p\xE2n\u0103 acum, la \u201EDetalii de la elevi\u201D.", "\u021Ainutul ap\u0103sat nu mai ridic\u0103 meniul telefonului cu \u201ECopy, Share, Ask Gemini\u201D. \xCEn c\xE2mpurile \xEEn care scrii, selec\u021Bia r\u0103m\xE2ne ca \xEEnainte."]
}, {
    v: "v2.36.7",
    scurt: "Locurile de întâlnire folosite des urcă singure în față.",
    titlu: "Locurile, dup\u0103 c\xE2t le folose\u0219ti",
    puncte: ["\xCEn fi\u0219a \u0219edin\u021Bei \u0219i \xEEn cea a elevului, locurile de \xEEnt\xE2lnire se a\u0219az\u0103 singure: cele la care duci elevii \xEEn fiecare zi urc\u0103 \xEEn fa\u021B\u0103, cele rare cad spre coad\u0103.", "Se num\u0103r\u0103 din \u0219edin\u021Bele tale, f\u0103r\u0103 s\u0103 reglezi nimic. La folosiri egale r\u0103m\xE2ne r\xE2ndul din Set\u0103ri, iar \u0219edin\u021Bele anulate nu se pun la socoteal\u0103."]
}, {
    v: "v2.36.6",
    scurt: null,
    titlu: "Lumina \u021Bine pasul cu ma\u0219ina",
    puncte: ["Balta de lumin\u0103 din antet se leag\u0103n\u0103 odat\u0103 cu ma\u0219ina \u0219i se rote\u0219te cu botul ei, dar r\u0103m\xE2ne lipit\u0103 de asfalt.", "P\xE2lp\xE2ie u\u0219or, \xEEn ritmul leg\u0103n\u0103rii \u2014 un fascicul viu, nu o pat\u0103 desenat\u0103 pe jos."]
}, {
    v: "v2.36.5",
    scurt: null,
    titlu: "Loc pentru lista de elevi",
    puncte: ["C\xE2nd cau\u021Bi elevul, butoanele de status se retrag, ca lista s\u0103 aib\u0103 tot ecranul. Revin dup\u0103 ce ai ales.", "C\xE2mpul de c\u0103utare urc\u0103 \xEEn capul zonei vizibile, nu la mijloc \u2014 sub el se deschide lista.", "Butonul de hart\u0103 nu se mai suprapune peste \u201EToate locurile\u201D."]
}, {
    v: "v2.36.4",
    scurt: "Locurile obișnuite se aleg dintr-o atingere, iar sortarea elevilor e sub un singur buton.",
    titlu: "Locuri, sortare \u0219i indicatoare",
    puncte: ["Locurile obi\u0219nuite stau la vedere, ca butoane: o singur\u0103 ap\u0103sare \u0219i ai ales. Restul se deschid \xEEntr-o list\u0103.", "C\xE2nd deschizi o list\u0103, capul ei urc\u0103 \xEEn susul ecranului, ca s\u0103 vezi tot ce e \xEEn\u0103untru.", "Cele nou\u0103 criterii de sortare au intrat sub un singur buton \u201ESortare\u201D, cu criteriul ales scris al\u0103turi; \xEEl atingi ca s\u0103 \xEEntorci ordinea.", "Pe cardurile de \u0219edin\u021B\u0103 apare indicatorul rutier cu numele dedesubt, cu lumina pe conturul lui, nu \xEEntr-un chenar."]
}, {
    v: "v2.36.3",
    scurt: "Starea ședinței se alege din patru indicatoare rutiere, chiar lângă elev.",
    titlu: "Fi\u0219a \u0219edin\u021Bei, mai limpede",
    puncte: ["Statusul st\u0103 sus, l\xE2ng\u0103 elev: patru p\u0103trate cu indicatoare rutiere, cel ales se aprinde \u0219i cre\u0219te, celelalte se retrag.", "Au disp\u0103rut cardul de deasupra \u0219i rezumatul de jos \u2014 nu spuneau nimic ce nu se vedea deja.", "Dac\u0103 n-ai schimbat nimic, \xEEnchiderea nu te mai \xEEntreab\u0103 nimic."]
}, {
    v: "v2.36.2",
    scurt: "În Calendar, săptămâna și ziua se schimbă separat, iar butonul „Azi” te aduce înapoi.",
    titlu: "S\u0103pt\u0103m\xE2na \u0219i ziua, desp\u0103r\u021Bite",
    puncte: ["Comutatorul de s\u0103pt\u0103m\xE2n\u0103 schimb\u0103 doar banda de sus. Ziua r\u0103m\xE2ne cea aleas\u0103 de tine, p\xE2n\u0103 c\xE2nd atingi tu alta din band\u0103.", "Dac\u0103 ziua pe care o vezi nu e \xEEn s\u0103pt\u0103m\xE2na afi\u0219at\u0103, \u021Bi se spune limpede, cu ziua scris\u0103.", "Buton \u201EAzi\u201D care te aduce \xEEnapoi \u0219i cu banda, \u0219i cu ziua.", "Fiecare c\u0103su\u021B\u0103 din band\u0103 se umple de jos \xEEn sus, dup\u0103 c\xE2t e ziua de plin\u0103."]
}, {
    v: "v2.35.8",
    scurt: "Elevul retras își eliberează singur ședințele și examenul din calendar.",
    titlu: "\u0218ase \xEEndrept\u0103ri",
    puncte: ["Pachetul nu se mai adun\u0103 de dou\u0103 ori \xEEn rezumat la editarea unui elev.", "Elevul retras \xEEi elibereaz\u0103 calendarul: examenul lui iese, iar \u0219edin\u021Bele viitoare trec \xEEn anulate pe loc.", "C\u0103utarea \xEEn Elevi deschide singur\u0103 grupurile str\xE2nse care au pe cineva potrivit.", "\u021Ainutul ap\u0103sat pe o \u0219edin\u021B\u0103 nu mai cheam\u0103 meniul telefonului peste fereastr\u0103.", "\xCEn Set\u0103ri po\u021Bi schimba c\xE2te \u0219edin\u021Be se p\u0103streaz\u0103 pentru examen \u2014 era o cifr\u0103 fix\u0103.", "Tot \xEEn Set\u0103ri alegi ma\u0219ina implicit\u0103 pentru elevii noi; dac\u0103 ai una singur\u0103, o primesc to\u021Bi."]
}, {
    v: "v2.35.5",
    scurt: null,
    titlu: "Mai mult loc c\xE2nd scrii",
    puncte: ["\u201EElev\u201D nu se mai scrie de dou\u0103 ori \xEEn fi\u0219a \u0219edin\u021Bei.", "C\xE2mpurile de c\u0103utare nu mai cheam\u0103 bara telefonului cu cheia \u0219i cardul, care fura un r\xE2nd \xEEntreg.", "Listele \u0219i marginile ferestrei se str\xE2ng dup\u0103 c\xEEt loc a r\u0103mas cu adev\u0103rat \u2014 mai ales cu telefonul culcat."]
}, {
    v: "v2.35.4",
    scurt: null,
    titlu: "Reparat: punctul de domiciliu",
    puncte: ["C\xE2mpul de punct de pe fi\u0219a elevului nu mai primea nimic \u2014 nici coordonate, nici link, nici Plus Code. A fost o gre\u0219eal\u0103 strecurat\u0103 odat\u0103 cu Plus Code-urile; acum merg toate trei."]
}, {
    v: "v2.35.3",
    scurt: "Ferestrele nu mai rămân ascunse sub tastatură.",
    titlu: "Ferestrele nu mai fug sub tastatur\u0103",
    puncte: ["C\xE2nd se ridic\u0103 tastatura, fereastra se a\u0219az\u0103 \xEEn zona r\u0103mas\u0103 vizibil\u0103 \u0219i urc\u0103 \xEEn capul ei.", "C\xE2mpurile de c\u0103utare \u2014 la locuri \u0219i la elevi \u2014 se aduc singure \xEEn dreptul ochiului c\xE2nd le atingi."]
}, {
    v: "v2.35.2",
    scurt: "Fișa elevului e mai ușor de completat: pachetele se aleg din carduri, cu un rezumat jos.",
    titlu: "Fi\u0219a elevului, ref\u0103cut\u0103",
    puncte: ["Numele \u0219i prenumele stau pe toat\u0103 l\u0103\u021Bimea \u0219i scriu mai mare \u2014 sunt primul lucru pe care \xEEl completezi.", "Pachetele se aleg din fi\u0219e, nu dintr-o list\u0103 derulant\u0103: se v\u0103d deodat\u0103 pre\u021Bul, c\xE2te \u0219edin\u021Be aduc \u0219i dac\u0103 se achit\u0103 la \u0219coal\u0103.", "Jos apare un rezumat al cursului care se \xEEmprosp\u0103teaz\u0103 pe m\u0103sur\u0103 ce completezi, cu totalul de \u0219edin\u021Be scos \xEEn fa\u021B\u0103.", "Dac\u0103 lipse\u0219te numele, ro\u0219ul apare l\xE2ng\u0103 c\xE2mp, nu jos.", "Butonul spune ce face: \u201EAdaug\u0103 elev\u201D sau \u201ESalveaz\u0103 modific\u0103rile\u201D."]
}, {
    v: "v2.35.1",
    scurt: "Locațiile acceptă și Plus Code din Google Maps.",
    titlu: "Plus Code, zile cu examen \u0219i ferestre",
    puncte: ["Loca\u021Biile accept\u0103 acum \u0219i Plus Code din Google Maps \u2014 \u0219i cel lung, \u0219i cel scurt cu ora\u0219ul dup\u0103 el.", "\xCEn calendar, ziua cu examen practic are chenar mov, aceea\u0219i culoare cu intervalul de examen.", "Ferestrele se deschid din punctul \xEEn care ai atins, nu din mijlocul ecranului."]
}, {
    v: "v2.35.0",
    scurt: "Fișa ședinței e refăcută: starea se alege din indicatoare rutiere, iar ora dintr-o grilă.",
    titlu: "Fi\u0219a \u0219edin\u021Bei, refăcut\u0103",
    puncte: ["Editorul de \u0219edin\u021B\u0103 arat\u0103 altfel: sus elevul, ziua \u0219i ora, apoi starea \u0219i locul \u2014 adic\u0103 exact ce atingi de fiecare dat\u0103.", "Starea se alege din patru indicatoare rutiere: STOP, alte pericole, drum cu prioritate, sf\xE2r\u0219itul restric\u021Biilor.", "Ora se alege dintr-o gril\u0103 de intervale, cu cele ocupate t\u0103iate.", "Locul de \xEEnt\xE2lnire st\u0103 pe un singur r\xE2nd \u0219i se alege dintr-o fereastr\u0103 cu c\u0103utare, oric\xE2te loca\u021Bii ai.", "Limba, instructorul \u0219i noti\u021Bele au trecut \xEEn \u201EDetalii avansate\u201D, iar jos apare un rezumat al \u0219edin\u021Bei.", "Nimic din felul \xEEn care func\u021Bioneaz\u0103 nu s-a schimbat."]
}, {
    v: "v2.34.50",
    scurt: "Poți programa peste un interval indisponibil, dar ești avertizat întâi.",
    titlu: "Ferestre \u0219i intervale indisponibile",
    puncte: ["\u201EPublic\u0103 acum\u201D \u0219i \u201EGenereaz\u0103 plan\u201D se deschid ca ferestre adev\u0103rate, cu acelea\u0219i reguli ca toate celelalte. Nu mai derulezi pagina dup\u0103 ele.", "Deschiderile s-au domolit: ferestrele \u0219i listele se desf\u0103\u0219oar\u0103 \xEEntr-o secund\u0103, ca s\u0103 se vad\u0103 de unde vin.", "Peste un interval marcat indisponibil po\u021Bi programa, dar e\u0219ti avertizat \xEEnt\xE2i, cu tot cu motiv. \u0218edin\u021Ba se vede apoi normal, cu ha\u0219ura peste ea.", "Lista cu elevii care au toate orele programate a trecut de la \u201ENecesit\u0103 aten\u021Bie\u201D la Statistici, unde \xEEi e locul."]
}, {
    v: "v2.34.49",
    scurt: "Sugestiile din calendar nu mai propun elevi pe care nu i-ai programa.",
    titlu: "Sugestii mai cur\u0103\u021Bite \u0219i un semnal la \xEEnchidere",
    puncte: ["C\xE2nd atingi pe l\xE2ng\u0103 o fereastr\u0103, conturul ei clipe\u0219te ro\u0219u \u0219i \u021Bi se spune s-o \xEEnchizi \u2014 la fel ca la ap\u0103sarea unei file.", "La sugestiile din calendar nu mai apar elevii pe care planul nu i-ar programa: cei pleca\u021Bi, cei din zile nepotrivite \u0219i cei care au cerut o pauz\u0103 \xEEntre \u0219edin\u021Be."]
}, {
    v: "v2.34.48",
    scurt: "Ferestrele nu se mai închid din greșeală, iar dacă ai modificări nesalvate ești întrebat.",
    titlu: "Ferestre care nu se \xEEnchid din gre\u0219eal\u0103",
    puncte: ["Ferestrele nu se mai \xEEnchid c\xE2nd atingi pe l\xE2ng\u0103 ele. Se \xEEnchid de la \u201E\xD7\u201D sau de la butoanele din josul lor.", "Dac\u0103 ai schimbat ceva \u0219i \xEEnchizi, e\u0219ti \xEEntrebat: p\u0103strezi modific\u0103rile, renun\u021Bi la ele, sau te \xEEntorci la fi\u0219\u0103.", "Listele se deruleaz\u0103 de sub titlul lor, ca s\u0103 se vad\u0103 de unde s-au deschis.", "Examenul teoretic are butoane de promovat \u0219i respins, cu contorul lui de sus\u021Bineri.", "Elevul trimis altui instructor \xEE\u021Bi p\u0103streaz\u0103 indicativul pe \u0219edin\u021Bele f\u0103cute cu tine.", "C\xE2mpul de \u0219edin\u021Be pe s\u0103pt\u0103m\xE2n\u0103 se las\u0103 golit \u0219i rescris."]
}, {
    v: "v2.34.47",
    scurt: "Fișa elevului are o agendă cu mementouri și notițe.",
    titlu: "Agenda elevului \u0219i denumiri mai limpezi",
    puncte: ["Grup nou \u201EAgend\u0103\u201D pe fi\u0219a elevului: mementouri \u0219i noti\u021Be la un loc. Noti\u021Bele pot fi mai multe, fiecare cu ziua ei, \u0219i se pot schimba sau \u0219terge.", "Pe cardul elevului apare noti\u021Ba sau mementoul; dac\u0103 sunt mai multe, se str\xE2ng \xEEntr-o list\u0103.", "Se scrie \u201E\u0219edin\u021Be\u201D, nu \u201Eore\u201D, ca s\u0103 nu se \xEEn\u021Beleag\u0103 gre\u0219it.", "Examenele nu mai deschid alte dou\u0103 liste: alegi practic sau teoretic dintr-un comutator.", "Pe Acas\u0103, examenele teoretice au cobor\xEEt la coada listei, iar cine d\u0103 teoreticul azi are anun\u021Bul lui.", "\u201ECe e nou\u201D arat\u0103 doar titlurile; am\u0103nuntele se deschid la atingere."]
}, {
    v: "v2.34.46",
    scurt: "Fișa elevului e împărțită pe grupuri care se pliază.",
    titlu: "Fi\u0219a elevului, str\xE2ns\u0103 pe grupuri",
    puncte: ["Formularul e \xEEmp\u0103r\u021Bit \xEEn \u0219apte grupuri care se pliaz\u0103: Persoana, Dosar, Ore \u0219i plat\u0103, Cum \xEEl programezi, C\xE2nd poate veni, Examene, Mementouri.", "Fiecare grup arat\u0103 pe r\xE2nd un rezumat, ca s\u0103 \u0219tii ce e \xEEn\u0103untru f\u0103r\u0103 s\u0103-l deschizi.", "Indisponibilitatea a intrat l\xE2ng\u0103 disponibilitate, unde \xEEi e locul.", "Explica\u021Biile nu mai stau la vedere: sunt \xEEntr-un \u201Ei\u201D \xEEncercuit, cu buton de \xEEnchidere."]
}, {
    v: "v2.34.45",
    scurt: "Tortul de ziua elevului apare peste tot lângă numele lui.",
    titlu: "Tortul peste tot \u0219i calendar mai curat",
    puncte: ["Tortul apare acum l\xE2ng\u0103 numele elevului oriunde \xEEl vezi: Acas\u0103, \xEEn calendar, la sugestii, \xEEn rapoarte.", "Elevii pleca\u021Bi o perioad\u0103 nu mai sunt propu\u0219i nici la ad\u0103ugarea rapid\u0103 din calendar.", "Butonul \u201ETraseul zilei\u201D a fost scos \u2014 drumul care conteaz\u0103 e cel p\xE2n\u0103 la urm\u0103toarea \u0219edin\u021B\u0103, iar butonul acela a r\u0103mas."]
}, {
    v: "v2.34.44",
    scurt: "Poți marca un elev ca plecat o perioadă; revine singur în liste.",
    titlu: "Elevi pleca\u021Bi o perioad\u0103",
    puncte: ["Pe fi\u0219a elevului bifezi \u201EIndisponibil o perioad\u0103\u201D \u0219i dai fie ziua \xEEntoarcerii, fie c\xE2te zile lipse\u0219te.", "C\xE2t lipse\u0219te nu apare la programare \u0219i nici \xEEn plan, iar \xEEn ziua \xEEn care revine intr\u0103 singur \xEEnapoi \xEEn liste.", "\xCEn lista de elevi are un semn cu ziua \xEEn care se \xEEntoarce."]
}, {
    v: "v2.34.43",
    scurt: null,
    titlu: "Pornire lini\u0219tit\u0103 dup\u0103 actualizare",
    puncte: ["Dup\u0103 o versiune nou\u0103, aplica\u021Bia se reînc\u0103rca singur\u0103 \u0219i p\u0103rea c\u0103 se \xEEnchide \u0219i se redeschide. Acum pornirea e dintr-o bucat\u0103.", "Mesajul \u201ECe e nou\u201D nu mai arat\u0103 din gre\u0219eal\u0103 schimb\u0103ri vechi."]
}, {
    v: "v2.34.41",
    scurt: null,
    titlu: "Scrisul din c\xE2mpuri, vizibil pe noapte",
    puncte: ["Num\u0103rul de \u0219edin\u021Be pe s\u0103pt\u0103m\xE2n\u0103 din Plan \u2014 \u0219i orice alt c\xE2mp scris ca text \u2014 r\u0103m\xE2nea negru pe tema \xEEntunecat\u0103. Acum toate c\xE2mpurile iau culoarea temei."]
}, {
    v: "v2.34.40",
    scurt: "La programare, elevii care au deja o ședință în ziua aceea nu mai apar în listă.",
    titlu: "Programare mai curat\u0103",
    puncte: ["La programarea unei \u0219edin\u021Be, elevii care au deja una \xEEn ziua aceea nu mai apar \xEEn list\u0103 \u2014 iar sub list\u0103 scrie c\xE2\u021Bi au r\u0103mas deoparte \u0219i de ce."]
}, {
    v: "v2.34.39",
    scurt: "Îți treci mașinile, iar planul îi grupează pe elevii cu aceeași mașină.",
    titlu: "Ma\u0219inile tale \u0219i banii \u0219colii",
    puncte: ["\xCE\u021Bi treci ma\u0219inile \xEEn Set\u0103ri \u2192 Ma\u0219inile mele, cu num\u0103rul \u0219i cutia fiec\u0103reia.", "Pe fi\u0219a elevului alegi cutia \u0219i ma\u0219ina lui, iar planul \xEEi a\u0219az\u0103 grupat pe cei cu aceea\u0219i ma\u0219in\u0103, ca s-o schimbi c\xE2t mai rar.", "Banii du\u0219i la \u0219coal\u0103 se deschid la atingere: vezi din ce \xEEncas\u0103ri s-au adunat \u0219i ce ai dus p\xE2n\u0103 acum.", "La elevul achitat la zi, butonul devine \u201EPl\u0103te\u0219te \xEEn avans\u201D.", "Op\u021Biunile din Plan sunt str\xE2nse sub un singur titlu.", "Ma\u0219inile din antet sunt modele adev\u0103rate, cu paletar de culori."]
}, {
    v: "v2.34.27",
    scurt: "Alegi vehiculul din antet: autoturism, motocicletă, camion sau autobuz.",
    titlu: "Garajul",
    puncte: ["Alegi din Set\u0103ri vehiculul din capul paginii: hatchback, sedan, break, ma\u0219inu\u021B\u0103 de 16 ani, motociclet\u0103 cu sau f\u0103r\u0103 ata\u0219, cap tractor sau autobuz.", "Fiec\u0103ruia i se poate prinde remorca potrivit\u0103 categoriei lui, iar caseta \u0218COALA r\u0103m\xE2ne pe oricare."]
}, {
    v: "v2.32.27",
    scurt: null,
    titlu: "Ma\u0219ina, mai aproape de realitate",
    puncte: ["Tabla, geamurile \u0219i cromul oglindesc acum lumina din jur, iar vopseaua are strat de lac \u2014 de aici vine diferen\u021Ba fa\u021B\u0103 de o suprafa\u021B\u0103 mat\u0103."]
}, {
    v: "v2.31.23",
    scurt: "Mașina din antet e desenată din nou.",
    titlu: "Ma\u0219ina \u0219i ferestrele",
    puncte: ["Ma\u0219ina din capul paginii e desenat\u0103 din nou, mai aproape de un Clio: faruri cu semn\u0103tura \xEEn C, stopuri asortate \u0219i lumini care se a\u0219az\u0103 pe asfalt noaptea.", "C\xE2t timp e deschis\u0103 o fereastr\u0103, taburile nu mai schimb\u0103 fila \u2014 fereastra clipe\u0219te ro\u0219u ca s\u0103 \u0219tii ce ai de \xEEnchis.", "Licen\u021Bele se deschid ca fereastr\u0103, la fel ca restul."]
}, {
    v: "v2.33.27",
    scurt: "În Plan vezi cât apuci să faci până la sfârșitul lunii și banii care ies din asta.",
    titlu: "Mai mult\u0103 lumin\u0103 \u0219i un calcul nou",
    puncte: ["Ma\u0219ina din antet are acum vopsea metalizat\u0103 care oglinde\u0219te cerul \u0219i drumul, cu redare pe curb\u0103 de film.", "\xCEn Plan vezi \u0219i c\xE2t apuci s\u0103 faci p\xE2n\u0103 \xEEn ultima zi a lunii, cu banii care ies din asta.", "Fereastra deschis\u0103 nu mai pare c\u0103 se \xEEnchide \u0219i se redeschide c\xE2nd atingi o fil\u0103."]
}, {
    v: "v2.32.26",
    scurt: null,
    titlu: "Ma\u0219ina din antet",
    puncte: ["Ma\u0219ina e desenat\u0103 din nou, cu propor\u021Biile unui hatchback real: arcade peste ro\u021Bi, plafon plutitor, gril\u0103 cu romb \u0219i l\u0103mpi verticale \xEEn spate.", "Caseta de plafon e la cotele legale \u2014 420 \xD7 380 \xD7 120 mm, cu inscrip\u021Bia de 300 \xD7 90 mm \u2014 \u0219i se aprinde noaptea.", "Noaptea, farurile \xEE\u0219i a\u0219tern lumina pe asfalt."]
}, {
    v: "v2.31.25",
    scurt: null,
    titlu: "Ferestre",
    puncte: ["C\xE2t timp e deschis\u0103 o fereastr\u0103, filele nu se mai schimb\u0103: fereastra clipe\u0219te ro\u0219u \u0219i \xEE\u021Bi spune s\u0103 o \xEEnchizi.", "Licen\u021Bele se deschid ca fereastr\u0103, ca restul."]
}, {
    v: "v2.31.22",
    scurt: "Elevul se alege căutându-l, iar confirmarea ședinței se poate trimite și mai târziu.",
    titlu: "Programare mai u\u0219oar\u0103",
    puncte: ["Elevul se alege c\u0103ut\xE2ndu-l dup\u0103 nume, grup\u0103 sau telefon.", "Po\u021Bi trimite confirmarea unei \u0219edin\u021Be \u0219i mai t\xE2rziu, direct din fi\u0219a ei.", "\xCEn Plan schimbi num\u0103rul de \u0219edin\u021Be pe s\u0103pt\u0103m\xE2n\u0103 pentru to\u021Bi elevii deodat\u0103.", "Locul de \xEEnt\xE2lnire are din nou link de hart\u0103 \xEEn mesaje, chiar dac\u0103 nu i-ai salvat punctul."]
}, {
    v: "v2.30.22",
    scurt: "Pachete de școlarizare, mesaj de bun venit și tort în ziua de naștere a elevului.",
    titlu: "\u0218colarizare, bun venit \u0219i zile de na\u0219tere",
    puncte: ["La ad\u0103ugarea unui elev alegi pachetul de \u0219colarizare: \xEEi pune singur \u0219edin\u021Bele incluse \u0219i, dup\u0103 caz, plata sau datoria.", "Buton de mesaj de bun venit pe fi\u0219a fiec\u0103rui elev nou. Numele t\u0103u, \u0219coala \u0219i textul se scriu o dat\u0103 \xEEn Set\u0103ri.", "\xCEn ziua lui de na\u0219tere, elevul are un tort l\xE2ng\u0103 nume.", "Noti\u021Bele elevului apar pe fi\u0219a lui.", "\xCEn Plan alegi data de la care \xEEncepe planul \u0219i po\u021Bi \u0219terge dintr-o dat\u0103 propunerile pe care elevii nu le-au confirmat.", "C\xE2nd raportezi o problem\u0103, spui \u0219i \xEEn ce parte a aplica\u021Biei ai \xEEnt\xE2lnit-o."]
}, {
    v: "v2.29.22",
    scurt: "Fișa elevului are data nașterii, iar căutarea merge și fără diacritice.",
    titlu: "Data na\u0219terii",
    puncte: ["Fi\u0219a elevului are data na\u0219terii \u0219i \xEE\u021Bi arat\u0103 v\xE2rsta.", "C\u0103utarea g\u0103se\u0219te numele \u0219i f\u0103r\u0103 diacritice."]
}, {
    v: "v2.28.19",
    scurt: "Locurile de întâlnire au punct pe hartă, trimis și elevului.",
    titlu: "Locuri de \xEEnt\xE2lnire",
    puncte: ["Fiecare loca\u021Bie poate \u021Bine minte punctul exact de pe hart\u0103.", "Elevul prime\u0219te locul \u0219i harta \xEEn mesaj, iar tu deschizi traseul dintr-o atingere.", "\xCEn Calendar ai traseul zilei \u0219i drumul spre urm\u0103toarea \u0219edin\u021B\u0103."]
}, {
    v: "v2.27.19",
    scurt: "Elevul picat la examen intră în așteptare până la adeverință.",
    titlu: "A\u0219teptare dup\u0103 examen",
    puncte: ["Elevul picat la examen intr\u0103 \xEEn a\u0219teptare \u0219i nu mai apare la programare p\xE2n\u0103 \xEEi eliberezi adeverin\u021Ba.", "\u0218edin\u021Bele viitoare se pot trimite \xEEn calendarul telefonului, cu alarme."]
}, {
    v: "v2.24.19",
    scurt: "Planul poate grupa elevii care stau aproape unul de altul.",
    titlu: "Planificare pe zone",
    puncte: ["Planul poate grupa elevii care stau aproape unul de altul.", "Elevii care lucreaz\u0103 \xEEn ture nu mai sunt programa\u021Bi \xEEn timpul serviciului."]
}, {
    v: "v2.21.19",
    scurt: "Evidența banilor duși la școală și rapoarte pe care le salvezi ca PDF.",
    titlu: "Bani \u0219i rapoarte",
    puncte: ["\u021Aii eviden\u021Ba banilor du\u0219i la \u0219coal\u0103 \u0219i vezi c\xE2t mai ai de dat.", "Dou\u0103 rapoarte, de elevi \u0219i de bani, pe care le po\u021Bi salva ca PDF."]
}, {
    v: "v2.18.12",
    scurt: "Setările și Finanțele sunt pe categorii.",
    titlu: "Set\u0103ri \u0219i Finan\u021Be pe grupuri",
    puncte: ["Set\u0103rile \u0219i Finan\u021Bele sunt str\xE2nse pe categorii, mai u\u0219or de parcurs."]
}, {
    v: "v2.12.6",
    scurt: "Alegi durata ședinței și pasul orelor din calendar.",
    titlu: "Programul, pe m\u0103sura ta",
    puncte: ["Alegi durata unei \u0219edin\u021Be \u0219i pasul orelor din calendar."]
}, {
    v: "v2.10.5",
    scurt: "Aplicația se deschide cu un cod de acces; datele rămân ale tale.",
    titlu: "Acces pe perioad\u0103",
    puncte: ["Aplica\u021Bia se deschide cu un cod primit o singur\u0103 dat\u0103.", "La expirare datele r\u0103m\xE2n \xEEntregi; doar modific\u0103rile se opresc."]
}, {
    v: "v2.0.0",
    scurt: "Plățile se pot corecta sau șterge.",
    titlu: "Pl\u0103\u021Bi corectabile",
    puncte: ["Orice plat\u0103 se poate corecta sau \u0219terge, iar datoria se recalculeaz\u0103 singur\u0103."]
}, {
    v: "v1.32.0",
    scurt: "Taxe, pachete și plăți, plus calculul salariului.",
    eticheta: "p\xE2n\u0103 la v1.32.9",
    titlu: "Bani, taxe \u0219i salariu",
    puncte: ["Taxe \u0219i pachete stabilite de tine, pl\u0103\u021Bi \xEEncasate de tine sau la \u0219coal\u0103.", "Salariul de la angajator se calculeaz\u0103 singur, cu prag lunar \u0219i tarife pentru englez\u0103."]
}, {
    v: "v1.31.0",
    scurt: "Planificatorul respectă zilele și orele fiecărui elev.",
    eticheta: "p\xE2n\u0103 la v1.32.9",
    titlu: "Planificare pe m\u0103sura fiec\u0103rui elev",
    puncte: ["Planificatorul respect\u0103 zilele \u0219i orele \xEEn care poate veni fiecare elev.", "Ultimele \u0219edin\u021Be se p\u0103streaz\u0103 pentru preg\u0103tirea de dinaintea examenului."]
}, {
    v: "v1.30.0",
    scurt: "Mesaje gata scrise pentru elevi, mementouri și transfer către alt instructor.",
    eticheta: "p\xE2n\u0103 la v1.32.9",
    titlu: "Elevii \u0219i leg\u0103tura cu ei",
    puncte: ["Mesaje gata scrise pentru WhatsApp \u0219i SMS, la programare, mutare sau anulare.", "Mementouri, transfer de elev c\u0103tre alt instructor \u0219i eviden\u021Ba \u0219edin\u021Belor cu al\u021Bi instructori."]
}];

function d3({
    open: n,
    onClose: e,
    onNoutati: t
}) {
    if (!n) return null;
    let a = (r, i) => o.default.createElement("div", {
        className: "mb-3"
    }, o.default.createElement("div", {
        className: "text-sm font-medium text-slate-800"
    }, r), o.default.createElement("div", {
        className: "text-xs text-slate-500 mt-0.5"
    }, i));
    return o.default.createElement(oi, {
        open: n,
        onClose: e,
        title: `Bun venit \xEEn ${fn.mark}`,
        layer: Wt.dialog,
        footer: o.default.createElement("div", {
            className: "flex gap-2.5"
        }, o.default.createElement("button", {
            onClick: t,
            className: "flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm"
        }, "Ce e nou"), o.default.createElement("button", {
            onClick: e,
            className: "flex-1 py-3 rounded-xl bg-slate-900 text-white font-medium text-sm"
        }, "Am \xEEn\u021Beles"))
    }, o.default.createElement("p", {
        className: "text-sm text-slate-600 mb-4"
    }, fn.expansion, " \xEE\u021Bi \u021Bine eviden\u021Ba de instructor \xEEntr-un singur loc, pe telefon."), a("Calendar", "Programezi \u0219edin\u021Be de c\xE2te o or\u0103 \u0219i jum\u0103tate. Te avertizeaz\u0103 la suprapuneri, la zilele de examen \u0219i la intervalele \xEEn care ai spus c\u0103 nu po\u021Bi."), a("Elevi", "Fi\u0219a fiec\u0103ruia: ore incluse \u0219i suplimentare, examene, pl\u0103\u021Bi \u0219i datorie, noti\u021Be \u0219i mementouri. \xCEl suni sau \xEEi scrii direct de pe card."), a("Plan", "Planificatorul \xEE\u021Bi umple s\u0103pt\u0103m\xE2nile singur: \xEEi ia \xEEnt\xE2i pe cei cu examenul aproape, respect\u0103 zilele \u0219i orele \xEEn care poate veni fiecare \u0219i \xEE\u021Bi spune \xEEn c\xE2te zile termini."), a("Finan\u021Be", "C\xE2t ai de \xEEncasat de la elevi \u0219i c\xE2t \u021Bi se cuvine de la \u0219coal\u0103, lun\u0103 de lun\u0103."), o.default.createElement("div", {
        className: "rounded-xl px-3.5 py-3 mt-4",
        style: {
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-line)"
        }
    }, o.default.createElement("div", {
        className: "text-sm font-medium",
        style: {
            color: "var(--accent-ink)"
        }
    }, "Datele stau doar \xEEn telefonul t\u0103u"), o.default.createElement("div", {
        className: "text-xs text-slate-500 mt-1"
    }, "Nu pleac\u0103 nic\u0103ieri \u0219i nu le vede nimeni altcineva \u2014 nici eu. Tocmai de aceea, descarc\u0103 din c\xE2nd \xEEn c\xE2nd un backup din Set\u0103ri: dac\u0103 schimbi telefonul sau \u0219tergi aplica\u021Bia, doar el te salveaz\u0103.")))
}

/* „Ce e nou”, în două feluri. Proprietarul vede amănuntele, ca până acum, și
   poate trece pe „Pe scurt” ca să vadă ce văd ceilalți. Ceilalți utilizatori
   văd doar felul scurt: o frază pentru fiecare versiune, iar cele care îl
   privesc doar pe proprietar (scurt: null) nu le apar. Fiecare intrare nouă
   din u3 are și „scurt”. */
function c3({
    open: n,
    dela: e,
    onClose: t,
    proprietar: iasProp
}) {
    let [iasDetaliat, iasPuneDetaliat] = (0, o.useState)(!0);
    if (!n) return null;
    let iasScurt = !iasProp || !iasDetaliat,
        a = u3.filter(r => (!e || sS(r.v, e) > 0) && (!iasScurt || !!r.scurt));
    return o.default.createElement(oi, {
        open: n,
        onClose: t,
        title: "Ce e nou",
        layer: Wt.dialog,
        footer: o.default.createElement("button", {
            onClick: t,
            className: "w-full py-3 rounded-xl bg-slate-900 text-white font-medium text-sm"
        }, "Am \xEEn\u021Beles")
    }, e && o.default.createElement("p", {
        className: "text-xs text-slate-400 mb-3"
    }, "Schimb\u0103rile de la versiunea ", e, " \xEEncoace."), iasProp && o.default.createElement("div", {
        className: "flex mb-3 rounded-xl border border-slate-200 p-0.5",
        role: "group",
        "aria-label": "Cum arată schimbările",
        "data-ias-noutati-fel": iasDetaliat ? "detaliat" : "scurt"
    }, [[!0, "Detaliat"], [!1, "Pe scurt \xB7 cum v\u0103d ceilal\u021Bi"]].map(([iasV, iasT]) => o.default.createElement("button", {
        key: iasT,
        type: "button",
        "aria-pressed": iasDetaliat === iasV,
        onClick: () => iasPuneDetaliat(iasV),
        className: "flex-1 py-2 rounded-lg text-xs font-medium " + (iasDetaliat === iasV ? "bg-slate-900 text-white" : "text-slate-500")
    }, iasT))), a.length === 0 && o.default.createElement("p", {
        className: "text-sm text-slate-400 py-4 text-center"
    }, "Nimic nou de la ultima deschidere."), a.map(r => o.default.createElement(IasNoutate, {
        key: r.v + (iasScurt ? "s" : ""),
        intrare: r,
        scurt: iasScurt
    })))
}
var f3 = "https://github.com/ias-auto/ias/edit/main/licente.json",
    p3 = "https://ias-auto.github.io/ias/";

function h3(n) {
    return JSON.stringify({
        actualizat: Be(),
        tipuri: A0,
        licente: [{
            cod: rS,
            nume: "Proprietar",
            rol: "proprietar",
            pana: "2099-12-31"
        }, ...(n || []).filter(e => !e.revocata).map(e => ({
            cod: e.cod,
            nume: e.eticheta,
            tip: e.tip || "vip",
            pana: e.pana || "",
            ...e.dispozitiv ? {
                dispozitiv: e.dispozitiv
            } : {}
        }))]
    }, null, 2)
}
var m3 = n => {
        let e = Ue(n || Be());
        return ft(new Date(e.getFullYear(), e.getMonth() + 1, 0))
    },
    g3 = n => {
        let e = Ue(n || Be());
        return ft(new Date(e.getFullYear(), e.getMonth() + 2, 0))
    };

function x3(n) {
    if (n.revocata) return {
        text: "revocat\u0103",
        culoare: "var(--bad)"
    };
    if (!n.dispozitiv) return {
        text: "f\u0103r\u0103 telefon legat",
        culoare: "var(--accent-ink)"
    };
    let e = Be();
    if (n.pana && n.pana < e) return {
        text: `expirat\u0103 ${qe(n.pana)}`,
        culoare: "var(--bad)"
    };
    if (!n.pana) return {
        text: "f\u0103r\u0103 termen",
        culoare: "var(--ok)"
    };
    let t = Math.round((Ue(n.pana).getTime() - Ue(e).getTime()) / 864e5);
    return t <= 3 ? {
        text: t === 0 ? "expir\u0103 azi" : `expir\u0103 \xEEn ${t} zile`,
        culoare: "var(--accent-ink)"
    } : {
        text: `p\xE2n\u0103 la ${qe(n.pana)}`,
        culoare: "var(--ok)"
    }
}

function v3({
    open: n,
    data: e,
    onClose: t,
    onSalveaza: a,
    onPublicat: r,
    showToast: i
}) {
    let [s, l] = (0, o.useState)(null), [u, d] = (0, o.useState)(!1), [f, p] = (0, o.useState)("");
    if (!n) return null;
    let c = e.licente || [],
        m = h3(c),
        g = (e.settings.licentePublicat || "") !== m,
        v = () => ({
            nume: "",
            prenume: "",
            scoala: "",
            oras: "",
            email: "",
            dispozitiv: "",
            tip: "vip",
            pana: m3(Be())
        });

    function w() {
        let b = (s.nume || "").trim(),
            M = (s.prenume || "").trim();
        if (!b && !M) {
            i("Scrie m\u0103car numele.", "error");
            return
        }
        let S = String(s.dispozitiv || "").trim().toUpperCase();
        s.id ? (a(c.map(k => k.id === s.id ? {
            ...k,
            ...s,
            nume: b,
            prenume: M,
            dispozitiv: S
        } : k)), i("Fi\u0219\u0103 actualizat\u0103.")) : (a([...c, {
            ...s,
            id: Vt("lic"),
            nume: b,
            prenume: M,
            dispozitiv: S,
            cod: a3(c),
            eticheta: r3(b, M, s.oras),
            creatLa: Yn()
        }]), i("Licen\u021B\u0103 creat\u0103. Nu uita s\u0103 publici fi\u0219ierul.")), l(null)
    }

    function x(b, M) {
        a(c.map(S => S.id === b ? {
            ...S,
            ...M
        } : S))
    }
    async function h(b, M) {
        try {
            await navigator.clipboard.writeText(b), p(M), setTimeout(() => p(""), 2e3)
        } catch {
            i("Copierea nu a mers \xEEn acest browser.", "error")
        }
    }
    let y = b => `${p3}?cod=${b.cod}`,
        _ = b => `Bun\u0103, ${b.prenume||b.nume}!

Acesta e accesul t\u0103u la IAS \u2014 Instructor Auto Sistem.

Deschide linkul de pe telefonul pe care ai instalat aplica\u021Bia:
${y(b)}

Codul se salveaz\u0103 singur. Dac\u0103 \xEE\u021Bi cere codul, \xEEl scrii de m\xE2n\u0103: ${b.cod}

Licen\u021B\u0103 ${g0(b.tip).nume}${b.pana?`, valabil\u0103 p\xE2n\u0103 la ${qe(b.pana)}`:""}.

Spor la treab\u0103!`;
    return o.default.createElement(oi, {
        open: n,
        onClose: t,
        title: "Licen\u021Be",
        layer: Wt.form
    }, o.default.createElement("div", null, o.default.createElement("div", null, g && o.default.createElement("div", {
        className: "rounded-xl px-3.5 py-2.5 mb-3",
        style: {
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-line)"
        }
    }, o.default.createElement("div", {
        className: "text-xs font-semibold",
        style: {
            color: "var(--accent-ink)"
        }
    }, "Ai modific\u0103ri nepublicate"), o.default.createElement("div", {
        className: "text-xs text-slate-500 mt-0.5"
    }, "P\xE2n\u0103 nu urci fi\u0219ierul pe GitHub, schimb\u0103rile nu ajung la nimeni."), o.default.createElement("button", {
        onClick: () => d(!0),
        className: "w-full mt-2 py-2 rounded-lg text-white text-xs font-medium",
        style: {
            background: "var(--invert)"
        }
    }, "Public\u0103 acum")), s ? o.default.createElement("div", {
        className: "rounded-xl bg-slate-50 border border-slate-200 p-3.5 mb-4"
    }, o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Nume",
        required: !0
    }, o.default.createElement("input", {
        className: ie,
        value: s.nume,
        onChange: b => l({
            ...s,
            nume: b.target.value
        })
    })), o.default.createElement(xe, {
        label: "Prenume"
    }, o.default.createElement("input", {
        className: ie,
        value: s.prenume,
        onChange: b => l({
            ...s,
            prenume: b.target.value
        })
    }))), o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "\u0218coala"
    }, o.default.createElement("input", {
        className: ie,
        value: s.scoala,
        onChange: b => l({
            ...s,
            scoala: b.target.value
        })
    })), o.default.createElement(xe, {
        label: "Ora\u0219"
    }, o.default.createElement("input", {
        className: ie,
        value: s.oras,
        onChange: b => l({
            ...s,
            oras: b.target.value
        })
    }))), o.default.createElement(xe, {
        label: "E-mail"
    }, o.default.createElement("input", {
        className: ie,
        inputMode: "email",
        autoCapitalize: "off",
        value: s.email,
        onChange: b => l({
            ...s,
            email: b.target.value
        }),
        placeholder: "ca s\u0103-i po\u021Bi trimite codul dintr-o atingere"
    })), o.default.createElement(xe, {
        label: "Codul telefonului lui"
    }, o.default.createElement("input", {
        className: `${ie} font-mono-time`,
        autoCapitalize: "characters",
        value: s.dispozitiv,
        onChange: b => l({
            ...s,
            dispozitiv: b.target.value
        }),
        placeholder: "TXXXXXXX \u2014 din mesajul primit de la el"
    })), o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Tip licen\u021B\u0103"
    }, o.default.createElement("select", {
        className: ie,
        value: s.tip,
        onChange: b => l({
            ...s,
            tip: b.target.value
        })
    }, Object.entries(A0).map(([b, M]) => o.default.createElement("option", {
        key: b,
        value: b
    }, M.nume)))), o.default.createElement(xe, {
        label: "Valabil\u0103 p\xE2n\u0103 la"
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: s.pana,
        onChange: b => l({
            ...s,
            pana: b.target.value
        })
    }))), o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3"
    }, "Las\u0103 data goal\u0103 pentru acces f\u0103r\u0103 termen. Codul \u0219i eticheta public\u0103 se genereaz\u0103 singure."), o.default.createElement("div", {
        className: "flex gap-2"
    }, o.default.createElement("button", {
        onClick: () => l(null),
        className: "flex-1 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-600"
    }, "Renun\u021B\u0103"), o.default.createElement("button", {
        onClick: w,
        className: "flex-1 py-2.5 rounded-lg bg-slate-900 text-white text-sm"
    }, "Salveaz\u0103"))) : o.default.createElement("button", {
        onClick: () => l(v()),
        className: "w-full py-3 mb-4 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
    }, o.default.createElement(cn, {
        size: 15
    }), "Licen\u021B\u0103 nou\u0103"), c.length === 0 && !s && o.default.createElement("div", {
        className: "text-center py-8 text-sm text-slate-400"
    }, "Nicio licen\u021B\u0103 \xEEnc\u0103. Prima o creezi c\xE2nd prime\u0219ti identificatorul unui coleg."), o.default.createElement("div", {
        className: "space-y-2"
    }, c.map(b => {
        let M = x3(b);
        return o.default.createElement("div", {
            key: b.id,
            className: "rounded-xl bg-white border border-slate-200 px-3.5 py-3"
        }, o.default.createElement("div", {
            className: "flex items-start justify-between gap-2"
        }, o.default.createElement("div", {
            className: "min-w-0"
        }, o.default.createElement("div", {
            className: "text-sm font-medium text-slate-900 truncate"
        }, b.nume, " ", b.prenume), o.default.createElement("div", {
            className: "text-xs text-slate-400 truncate"
        }, [b.scoala, b.oras].filter(Boolean).join(" \xB7 ") || "\u2014"), o.default.createElement("div", {
            className: "font-mono-time text-xs text-slate-500 mt-1"
        }, b.cod), o.default.createElement("div", {
            className: "font-mono-time text-xs text-slate-400"
        }, b.eticheta, b.dispozitiv ? ` \xB7 ${b.dispozitiv}` : "")), o.default.createElement("div", {
            className: "text-right shrink-0"
        }, o.default.createElement("div", {
            className: "text-xs font-medium",
            style: {
                color: M.culoare
            }
        }, M.text), o.default.createElement("div", {
            className: "text-xs text-slate-400 mt-0.5"
        }, g0(b.tip).nume))), o.default.createElement("div", {
            className: "grid grid-cols-2 gap-1.5 mt-2.5"
        }, o.default.createElement("a", {
            href: b.email ? `mailto:${b.email}?subject=${encodeURIComponent("Codul t\u0103u de acces IAS")}&body=${encodeURIComponent(_(b))}` : vo("Codul t\u0103u de acces IAS", _(b)),
            style: {
                touchAction: "manipulation",
                background: "var(--invert)"
            },
            className: "py-2 rounded-lg text-center text-xs font-medium text-white"
        }, "Trimite codul"), o.default.createElement("button", {
            onClick: () => h(y(b), b.id),
            className: "py-2 rounded-lg border border-slate-200 text-xs text-slate-600"
        }, f === b.id ? "Link copiat \u2713" : "Copiaz\u0103 linkul"), o.default.createElement("button", {
            onClick: () => x(b.id, {
                pana: g3(b.pana || Be())
            }),
            className: "py-2 rounded-lg border border-slate-200 text-xs text-slate-600"
        }, "\xCEnc\u0103 o lun\u0103"), o.default.createElement("button", {
            onClick: () => l({
                ...b
            }),
            className: "py-2 rounded-lg border border-slate-200 text-xs text-slate-600"
        }, "Modific\u0103"), o.default.createElement("button", {
            onClick: () => x(b.id, {
                revocata: !b.revocata
            }),
            className: "py-2 rounded-lg border text-xs col-span-2",
            style: b.revocata ? {
                borderColor: "var(--ok-line)",
                color: "var(--ok)"
            } : {
                borderColor: "var(--bad-line)",
                color: "var(--bad)"
            }
        }, b.revocata ? "Reactiveaz\u0103" : "Revoc\u0103 accesul")))
    })), o.default.createElement(oi, {
        /* Publicarea se deschide ca fereastră, ca tot restul: fundal propriu,
           „×" de închidere, și pe stratul de dialog ca să stea deasupra ferestrei
           de licențe. Înainte se desfăcea în josul paginii și trebuia derulat. */
        open: !!u,
        onClose: () => d(!1),
        title: "Public\u0103 fi\u0219ierul",
        layer: Wt.dialog
    }, u ? o.default.createElement("div", null, o.default.createElement("div", {
        className: "text-sm font-medium text-slate-800 mb-1"
    }, "Public\u0103 fi\u0219ierul"), o.default.createElement("p", {
        className: "text-xs text-slate-500 mb-2"
    }, "Copiaz\u0103 tot textul, deschide ", o.default.createElement("span", {
        className: "font-mono-time"
    }, "licente.json"), " pe GitHub, \u0219terge ce e acolo, lipe\u0219te \u0219i d\u0103 Commit. Codurile intr\u0103 \xEEn func\u021Biune \xEEntr-un minut."), o.default.createElement("textarea", {
        readOnly: !0,
        rows: 6,
        className: `${ie} font-mono-time`,
        style: {
            fontSize: 11
        },
        value: m,
        onFocus: b => b.target.select()
    }), o.default.createElement("div", {
        className: "flex gap-2 mt-2"
    }, o.default.createElement("button", {
        onClick: () => h(m, "fisier"),
        className: "flex-1 py-2.5 rounded-lg bg-slate-900 text-white text-sm"
    }, f === "fisier" ? "Copiat \u2713" : "Copiaz\u0103 fi\u0219ierul"), o.default.createElement("a", {
        href: f3,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm text-center"
    }, "Deschide GitHub")), o.default.createElement("button", {
        onClick: () => {
            r(m), d(!1), i("Marcat ca publicat.")
        },
        className: "w-full py-2.5 mt-2 rounded-lg border text-sm",
        style: {
            borderColor: "var(--ok-line)",
            color: "var(--ok)"
        }
    }, "Am publicat")) : null), !u && c.length > 0 && o.default.createElement("button", {
        onClick: () => d(!0),
        className: "w-full py-3 mt-4 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium"
    }, "Public\u0103 fi\u0219ierul de licen\u021Be"), o.default.createElement("button", {
        onClick: t,
        className: "w-full py-2.5 mt-2 rounded-xl border border-slate-200 text-slate-600 text-sm"
    }, "\xCEnchide"))))
}

function Iw({
    titlu: n,
    descriere: e,
    cod: t,
    tipNume: a
}) {
    let r = `Bun\u0103! A\u0219 vrea licen\u021Ba complet\u0103 pentru IAS.

Codul meu: ${k0(t||"")}
Licen\u021Ba de acum: ${a||"\u2014"}

Numele meu:
\u0218coala:
`;
    return o.default.createElement("div", {
        className: "pb-4"
    }, o.default.createElement("div", {
        className: "px-4 pt-4 pb-1"
    }, o.default.createElement("h1", {
        className: "font-display text-xl font-semibold text-slate-900 uppercase tracking-wide"
    }, n)), o.default.createElement("div", {
        className: "px-4 mt-4"
    }, o.default.createElement("div", {
        className: "rounded-2xl px-4 py-6 text-center",
        style: {
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-line)"
        }
    }, o.default.createElement("div", {
        className: "font-display text-lg uppercase tracking-wide",
        style: {
            color: "var(--accent-ink)"
        }
    }, "Se deblocheaz\u0103 cu licen\u021Ba complet\u0103"), o.default.createElement("p", {
        className: "text-sm text-slate-600 mt-2"
    }, e), o.default.createElement("a", {
        href: vo("Vreau licen\u021Ba complet\u0103 IAS", r),
        style: {
            touchAction: "manipulation",
            background: "var(--invert)"
        },
        className: "block w-full mt-4 py-3 rounded-xl text-white font-medium text-sm"
    }, "Cere licen\u021Ba complet\u0103"))))
}

function y3() {
    let [n, e] = (0, o.useState)({
        students: [],
        sessions: [],
        settings: sr
    }), [iasCerutExamene, iasCereExamene] = (0, o.useState)(!1), [t, a] = (0, o.useState)(!0), [r, i] = (0, o.useState)("dashboard"), [s, l] = (0, o.useState)(null), [u, d] = (0, o.useState)({
        open: !1,
        mode: "create",
        initial: null
    }), [f, p] = (0, o.useState)({
        open: !1,
        mode: "create",
        initial: null
    }), [c, m] = (0, o.useState)(null), [g, v] = (0, o.useState)(null), [w, x] = (0, o.useState)(null), [h, y] = (0, o.useState)(!1), [_, b] = (0, o.useState)(void 0), [M, S] = (0, o.useState)(!1), [k, E] = (0, o.useState)(""), B = (0, o.useRef)(!1), [$, G] = (0, o.useState)(!1), [A, O] = (0, o.useState)(0), [N, C] = (0, o.useState)(null), [W, X] = (0, o.useState)(null), [R, K] = (0, o.useState)(!1);

    function ne(I) {
        if (PA()) return;
        i(I)
    }
    let Y = (0, o.useCallback)((I, F) => {
        l({
            msg: I,
            type: F
        }), setTimeout(() => l(null), 2600)
    }, []);
    (0, o.useEffect)(() => {
        // când se cere închiderea unei ferestre, spunem și de ce
        let I = () => Y("\xCEnchide mai \xEEnt\xE2i fereastra deschis\u0103.", "error");
        window.addEventListener("ias-cere-inchidere", I);
        return () => window.removeEventListener("ias-cere-inchidere", I)
    }, [Y]);
    /* Programul trimis de elev. Linkul din mesajul lui deschide aplicația cu
       răspunsul în adresă (#disp=…): îl citim, curățăm adresa ca să nu se
       repete la următoarea pornire și-l arătăm spre confirmare. */
    let [iasProgramVenit, iasPuneProgramVenit] = (0, o.useState)(null),
        [iasCerereProgram, iasPuneCerereProgram] = (0, o.useState)(null),
        /* Pașii elevului nou și schimbarea școlarizării de pe fișă. */
        [iasVraj, iasPuneVraj] = (0, o.useState)(!1),
        [iasScolId, iasPuneScolId] = (0, o.useState)(null),
        iasProgramPornit = !!(n.settings || {}).programElevi;
    (0, o.useEffect)(() => {
        let iasCiteste = () => {
            let iasH = window.location.hash || "";
            if (iasH.indexOf("disp=") < 0) return;
            try { window.history.replaceState(null, "", window.location.pathname + window.location.search) } catch (x) {}
            let iasR = iasDispCiteste(iasH);
            iasR ? iasPuneProgramVenit(iasR) : Y("Linkul de program nu e \xEEntreg. Cere-i elevului s\u0103 \xEEl trimit\u0103 din nou.", "error")
        };
        iasCiteste();
        window.addEventListener("hashchange", iasCiteste);
        return () => window.removeEventListener("hashchange", iasCiteste)
    }, [Y]);
    /* Funcția oprită: răspunsul nu se pune nicăieri, doar spunem de ce. */
    (0, o.useEffect)(() => {
        iasProgramVenit && !t && !iasProgramPornit && (Y("Ai primit programul unui elev, dar func\u021Bia e oprit\u0103. Porne\u0219te-o din Set\u0103ri \u2192 Programul trimis de elevi, apoi atinge din nou linkul."), iasPuneProgramVenit(null))
    }, [iasProgramVenit, t, iasProgramPornit]);
    (0, o.useEffect)(() => {
        if (typeof window > "u" || !window.matchMedia) return;
        let I = window.matchMedia("(prefers-color-scheme: dark)");
        K(I.matches);
        let F = V => K(V.matches);
        return I.addEventListener ? I.addEventListener("change", F) : I.addListener(F), () => {
            I.removeEventListener ? I.removeEventListener("change", F) : I.removeListener(F)
        }
    }, []), (0, o.useEffect)(() => {
        /* Câmpul atins e adus la mijloc, ca tastatura să nu-l acopere. Bara de
           căutare din Elevi e scutită: stă mereu sus, la vedere, iar centrarea
           ei trăgea toată lista în jos chiar când începeai să scrii. */
        let I = F => {
            let V = F.target;
            !V || typeof V.matches != "function" || V.matches("input, select, textarea") && !(V.closest && V.closest("[data-ias-bara-elevi]")) && setTimeout(() => {
                try {
                    V.scrollIntoView({
                        block: "center",
                        behavior: "smooth"
                    })
                } catch {}
            }, 280)
        };
        return document.addEventListener("focusin", I), () => document.removeEventListener("focusin", I)
    }, []), (0, o.useEffect)(() => {
        let I = !0;
        return (async () => {
            let F = null;
            try {
                let V = await window.storage.get("app-data", !1);
                V && V.value && (F = JSON.parse(V.value))
            } catch {}
            I && (F && e(Uw(F)), a(!1))
        })(), () => {
            I = !1
        }
    }, []), (0, o.useEffect)(() => {
        let I = !0;
        return (async () => {
            let F = i3(),
                V = null;
            try {
                let te = new URLSearchParams(window.location.search).get("cod");
                te && (V = te, window.history.replaceState({}, "", window.location.pathname))
            } catch {}
            let ee = V || F && F.cod;
            if (!ee) {
                I && b(null);
                return
            }
            I && F && Dn(F.cod) === Dn(ee) && b(F);
            try {
                let ue = {
                    ...await c0(ee),
                    cod: Dn(ee)
                };
                gf(ue), I && b(ue)
            } catch {
                I && (!F || Dn(F.cod) !== Dn(ee)) && b({
                    cod: Dn(ee),
                    stare: "neverificat",
                    verificatLa: null
                })
            }
        })(), () => {
            I = !1
        }
    }, []), (0, o.useEffect)(() => {
        try {
            let I = window.localStorage.getItem(Ew);
            if (!I) {
                X(null), C("intro");
                return
            }
            let F = JSON.parse(I);
            /* Ceilalți utilizatori văd „Ce e nou” singur doar dacă s-a schimbat
               ceva care îi privește; schimbările doar pentru proprietar nu le
               mai deschid fereastra. */
            sS(ri, F.versiune) > 0 && ((_ && _.rol === "proprietar") || u3.some(r => r.scurt && sS(r.v, F.versiune) > 0)) && (X(F.versiune), C("noutati"))
        } catch {}
    }, []), (0, o.useEffect)(() => {
        try {
            let I = window.localStorage.getItem(x0);
            if (!I) {
                O(-1);
                return
            }
            O(Math.round((Ue(Be()).getTime() - Ue(I).getTime()) / 864e5))
        } catch {}
    }, []);

    function J() {
        try {
            window.localStorage.setItem(x0, Be())
        } catch {}
        O(0)
    }

    function z() {
        try {
            window.localStorage.setItem(Ew, JSON.stringify({
                versiune: ri,
                cand: Yn()
            }))
        } catch {}
    }

    function q() {
        z(), C(null)
    }

    function de(I) {
        X(I === void 0 ? null : I), C("noutati")
    }
    async function ge(I) {
        S(!0), E("");
        try {
            let F = await c0(I);
            if (F.stare !== "ok") E("Codul nu este recunoscut. Verific\u0103-l \xEEnc\u0103 o dat\u0103 sau scrie-mi.");
            else {
                let V = {
                    ...F,
                    cod: Dn(I)
                };
                gf(V), b(V)
            }
        } catch {
            E("Nu am putut verifica codul. Conecteaz\u0103-te la internet \u0219i \xEEncearc\u0103 din nou.")
        }
        S(!1)
    }
    async function ye() {
        if (!(!_ || !_.cod)) {
            S(!0);
            try {
                let F = {
                    ...await c0(_.cod),
                    cod: _.cod
                };
                gf(F), b(F);
                let V = Cw(F);
                Y(V.blocat ? "Tot expirat deocamdat\u0103." : "Acces re\xEEnnoit. Po\u021Bi lucra.")
            } catch {
                Y("Nu am putut verifica. Verific\u0103 internetul.", "error")
            }
            S(!1)
        }
    }

    function Ne() {
        gf(null), b(null), E("")
    }
    let ce = (0, o.useCallback)(I => {
        if (B.current) {
            Y("Acces expirat. Cere prelungirea ca s\u0103 po\u021Bi modifica.", "error");
            return
        }
        e(F => {
            let V = typeof I == "function" ? I(F) : I;
            try {
                Promise.resolve(window.storage.set("app-data", JSON.stringify({
                    ...V,
                    schemaVersion: f0,
                    appVersion: ri
                }), !1)).then(ee => {
                    ee || Y("Salvarea a e\u0219uat. Verific\u0103 conexiunea.", "error")
                }).catch(() => Y("Salvarea a e\u0219uat. Verific\u0103 conexiunea.", "error"))
            } catch {
                Y("Salvarea a e\u0219uat. Verific\u0103 conexiunea.", "error")
            }
            return V
        })
    }, [Y]);

    function ze(I) {
        Y(`${I.charAt(0).toUpperCase()}${I.slice(1)} vine cu licen\u021Ba complet\u0103.`, "error")
    }

    function re() {
        let I = Ct.maxElevi || 0;
        if (I && n.students.filter(F => !F.withdrawn).length >= I) {
            Y(`Licen\u021Ba ta cuprinde ${I} elevi. Pentru mai mul\u021Bi, scrie-mi.`, "error");
            return
        }
        iasPuneVraj(!0)
    }

    /* Elevul nou, din pași: fișa lui și școlarizarea aleasă. Întoarce elevul,
       ca ultimul ecran să-i poată trimite bun venitul. */
    function iasCreeazaElev(I, F) {
        if (B.current) {
            Y("Acces expirat. Cere prelungirea ca s\u0103 po\u021Bi modifica.", "error");
            return null
        }
        let iasMax = Ct.maxElevi || 0;
        if (iasMax && n.students.filter(x => !x.withdrawn).length >= iasMax) {
            Y(`Licen\u021Ba ta cuprinde ${iasMax} elevi. Pentru mai mul\u021Bi, scrie-mi.`, "error");
            return null
        }
        let V = {
            id: Vt("stu"),
            ...I,
            payments: [],
            createdAt: Yn()
        };
        F && F.fel && (V = iasAplicaScolarizare(V, F, n.settings));
        ce(te => ({
            ...te,
            students: [...te.students, V]
        }));
        Y("Elev ad\u0103ugat.");
        return V
    }

    /* Școlarizarea schimbată sau completată de pe fișă: se retrage ce pusese
       cea veche, se pune cea nouă, iar ședințele lui se potrivesc la noul
       număr de incluse. */
    function iasSalveazaScolarizare(I, F) {
        let iasCalc = (te) => {
                let V = te.students.find(x => x.id === I);
                if (!V) return null;
                let ee = iasAplicaScolarizare(iasScoateScolarizare(V), F, te.settings),
                    rt = Number(ee.includedHours) !== Number(V.includedHours) || !!ee.perfectionare !== !!V.perfectionare ? iasRetipeaza(te.sessions, I, Number(ee.includedHours) || 0) : { sesiuni: te.sessions, schimbate: 0 };
                return { elev: ee, rt: rt }
            },
            iasAcum = iasCalc(n);
        if (!iasAcum) return;
        ce(te => {
            let r = iasCalc(te);
            return r ? {
                ...te,
                students: te.students.map(x => x.id === I ? r.elev : x),
                sessions: r.rt.sesiuni
            } : te
        });
        iasPuneScolId(null);
        let iasNr = iasAcum.rt.schimbate;
        Y(iasNr ? `\u0218colarizarea e pus\u0103. ${iasNr === 1 ? "O \u0219edin\u021B\u0103 de-a lui \u0219i-a" : iasNr + " \u0219edin\u021Be de-ale lui \u0219i-au"} schimbat felul (inclus\u0103 / suplimentar\u0103) dup\u0103 noul num\u0103r.` : "\u0218colarizarea e pus\u0103.")
    }

    /* O taxă sau un plan nou, adăugat din pașii elevului nou sau de pe fișă. */
    function iasAdaugaTaxaApp(I) {
        ce(F => ({
            ...F,
            settings: {
                ...F.settings,
                feeTypes: [...ii(F.settings), I]
            }
        })), Y(`\u201E${I.name}\u201D e acum \xEEn Finan\u021Be \u2192 Taxe.`)
    }

    function se(I, F, V) {
        let ee = ii(V).find(Te => Te.id === F);
        if (!ee) return I;
        let te = Number(ee.hours) || 0,
            ue = ur(ee) === "included" ? "includedHours" : "extraHours",
            De = {
                ...I,
                fees: {
                    ...I.fees || {},
                    [F]: (Number((I.fees || {})[F]) || 0) + 1
                },
                /* Ținem minte și ziua în care ai pus taxa. Fără ea, un pachet
                   adăugat azi acoperea ședințe de acum trei luni, iar cele de
                   acum rămâneau de plată — cum ai pățit. */
                feeLog: [...I.feeLog || [], { feeId: F, date: Be() }],
                [ue]: (Number(I[ue]) || 0) + te
            };
        return ee.laScoala && (De.payments = [...I.payments || [], {
            id: Vt("pay"),
            date: Be(),
            amount: Number(ee.price) || 0,
            collector: "school"
        }]), De
    }

    /* Scoate de pe elev un pachet pus mai demult: orele lui, taxa, ziua din
       jurnal și plata făcută la școală, dacă a adus una. Fără asta, schimbarea
       pachetului aduna: puneai 15, te răzgândeai la 17 și elevul rămânea cu 32.
       Se scoate doar ce a adăugat chiar pachetul acela, nimic altceva. */
    function iasScoatePachet(elev, idPachet, setari) {
        let taxa = ii(setari).find(x => x.id === idPachet);
        if (!taxa) return elev;
        let ore = Number(taxa.hours) || 0,
            unde = ur(taxa) === "included" ? "includedHours" : "extraHours",
            cate = Number((elev.fees || {})[idPachet]) || 0,
            taxeNoi = { ...(elev.fees || {}) };
        if (cate > 1) taxeNoi[idPachet] = cate - 1;
        else delete taxeNoi[idPachet];
        // din jurnal scoatem cea mai nouă intrare a pachetului
        let jurnal = [...(elev.feeLog || [])];
        for (let k = jurnal.length - 1; k >= 0; k--)
            if (jurnal[k] && jurnal[k].feeId === idPachet) { jurnal.splice(k, 1); break }
        let iesire = {
            ...elev,
            fees: taxeNoi,
            feeLog: jurnal,
            [unde]: Math.max(0, (Number(elev[unde]) || 0) - ore)
        };
        /* Plata pusă automat la școală se retrage odată cu pachetul — dar numai
           cea pe care a adus-o el: aceeași sumă, de la școală, cea mai nouă. */
        if (taxa.laScoala) {
            let plati = [...(elev.payments || [])];
            for (let k = plati.length - 1; k >= 0; k--) {
                let pl = plati[k];
                if (pl && pl.collector === "school" && Number(pl.amount) === (Number(taxa.price) || 0)) {
                    plati.splice(k, 1);
                    break
                }
            }
            iesire.payments = plati
        }
        return iesire
    }

    function fe(I, F, V) {
        let ee = I.pachet && I.pachet !== (V && V.pachet),
            iasDeRetipat = null;
        F === "edit" ? (ce(te => ({
            ...te,
            students: te.students.map(ue => {
                if (ue.id !== V.id) return ue;
                let De = {
                    ...ue,
                    ...I
                };
                /* Schimbarea pachetului înlocuiește, nu adună: întâi scoatem
                   pachetul de dinainte, apoi îl punem pe cel nou. */
                /* Câte pachete identice ai cerut în plus, atâtea se pun acum. */
                let iasInPlus = Number(I.iasIncaUnPachet) || 0;
                delete De.iasIncaUnPachet;
                /* Școlarizarea provizorie completată din formular, alegând
                   pachetul: orele socotite până acum se retrag, ca să nu se
                   adune peste cele din pachet, iar ședințele lui se potrivesc
                   la noul număr de incluse. Altă școlarizare, cu pachetul
                   schimbat din formular, nu se mai poate retrage singură. */
                if (ee && iasProvizoriu(V)) De = iasScoateScolarizare(De);
                else if (ee && De.scolarizare && De.scolarizare.adaugat) De = { ...De, scolarizare: { ...De.scolarizare, adaugat: null } };
                if (ee) {
                    let iasFaraVechi = (V && V.pachet) ? iasScoatePachet(De, V.pachet, te.settings) : De;
                    De = se(iasFaraVechi, I.pachet, te.settings)
                }
                for (let iasK = 0; iasK < iasInPlus; iasK++) De = se(De, I.pachet, te.settings);
                ee && iasProvizoriu(V) && (iasDeRetipat = Number(De.includedHours) || 0);
                return De
            }),
            /* Elevul tocmai retras nu mai are ce căuta în calendar: ședințele
               lui de azi înainte trec în „anulată" pe loc, ca intervalele să se
               elibereze fără să le cauți una câte una. */
            /* Limba schimbată pe fișă trece și pe ședințele lui viitoare. */
            sessions: (iasS0 => iasDeRetipat != null ? iasRetipeaza(iasS0, V.id, iasDeRetipat).sesiuni : iasS0)((iasS0 => V && iasLimbaDe(I) !== iasLimbaDe(V) ? iasLimbaPeViitoare(iasS0, V.id, iasLimbaDe(I)).sesiuni : iasS0)((I.withdrawn && !(V && V.withdrawn))
                ? te.sessions.map(iasS => (iasS.studentId === V.id
                    && iasS.date >= Be()
                    && iasS.status !== "completed"
                    && iasS.status !== "cancelled")
                    ? { ...iasS, status: "cancelled" } : iasS)
                /* Elevul tocmai plecat o perioadă: propunerile planului care cad
                   în zilele lui de lipsă se duc. Planul le făcuse mai devreme,
                   când omul era acasă, și rămâneau pe ecran ca și cum nimic nu
                   s-ar fi schimbat — le vedeai programate în mijlocul vacanței.

                   Se șterg doar propunerile nefăcute încă; ședințele pe care
                   le-ai pus tu rămân, ca să le muți sau să le anulezi cum
                   socotești. */
                : iasLipseste(I, Be()) || (I.plecatPana && I.plecatPana >= Be())
                    ? te.sessions.filter(iasS => !(iasS.studentId === V.id
                        && iasS.auto && iasS.status === "pending"
                        && iasLipseste(I, iasS.date)))
                    : te.sessions))
        })), Y(I.withdrawn && !(V && V.withdrawn)
            ? "Elev retras. \u0218edin\u021Bele viitoare au fost anulate."
            : V && iasLimbaDe(I) !== iasLimbaDe(V)
                ? "Elev actualizat. Ședințele lui de acum înainte sunt în " + iasNumeLimba(n.settings, iasLimbaDe(I)).toLowerCase() + "."
                : "Elev actualizat.")) : (ce(te => {
            let ue = {
                id: Vt("stu"),
                ...I,
                payments: [],
                createdAt: Yn()
            };
            return I.pachet && (ue = se(ue, I.pachet, te.settings)), {
                ...te,
                students: [...te.students, ue]
            }
        }), Y("Elev ad\u0103ugat.")), p({
            open: !1,
            mode: "create",
            initial: null
        })
    }

    function he(I) {
        ce(F => ({
            ...F,
            students: F.students.filter(V => V.id !== I),
            sessions: F.sessions.filter(V => V.studentId !== I)
        })), Y("Elev \u0219ters."), p({
            open: !1,
            mode: "create",
            initial: null
        }), m(null)
    }

    function H(I, F) {
        ce(V => ({
            ...V,
            students: V.students.map(ee => ee.id === I ? {
                ...ee,
                weeklyLimit: F
            } : ee)
        }))
    }

    function L(I, F, V) {
        ce(ee => ({
            ...ee,
            students: ee.students.map(te => te.id === I ? {
                ...te,
                payments: [...te.payments || [], {
                    id: Vt("pay"),
                    date: Be(),
                    amount: Number(F) || 0,
                    collector: V === "school" ? "school" : "me"
                }]
            } : te)
        })), Y(V === "school" ? `Plat\u0103 la \u0219coal\u0103: ${(Number(F)||0).toLocaleString("ro-RO")} ${n.settings.currency}.` : `Plat\u0103 \xEEncasat\u0103: ${(Number(F)||0).toLocaleString("ro-RO")} ${n.settings.currency}.`)
    }

    function T(I, F, V) {
        ce(ee => ({
            ...ee,
            students: ee.students.map(te => te.id === I ? {
                ...te,
                payments: (te.payments || []).map(ue => ue.id === F ? {
                    ...ue,
                    ...V
                } : ue)
            } : te)
        })), Y("Plat\u0103 corectat\u0103.")
    }

    function j(I, F) {
        ce(V => ({
            ...V,
            students: V.students.map(ee => ee.id === I ? {
                ...ee,
                payments: (ee.payments || []).filter(te => te.id !== F)
            } : ee)
        })), Y("Plat\u0103 \u0219tears\u0103. Datoria s-a recalculat.")
    }

    function Q(I, F) {
        let V = n.students.find(ee => ee.id === I);
        x({
            studentId: I,
            payment: F,
            name: V ? V.name : ""
        })
    }

    function pe(I, F, V) {
        let ee = Math.max(0, Number(V) || 0);
        ce(te => {
            let ue = ii(te.settings).find(He => He.id === F),
                De = Number(ue && ue.hours) || 0,
                Te = ur(ue) === "included" ? "includedHours" : "extraHours";
            return {
                ...te,
                students: te.students.map(He => {
                    if (He.id !== I) return He;
                    let Ae = (ee - Df(He, F)) * De,
                        iasVechi = Df(He, F),
                        iasJurnal = [...He.feeLog || []];
                    /* Câte taxe ai adăugat, atâtea zile ținem minte; când scazi,
                       dispare cea mai nouă. */
                    if (ee > iasVechi) for (let iasK = iasVechi; iasK < ee; iasK++) iasJurnal.push({ feeId: F, date: Be() });
                    else if (ee < iasVechi) {
                        let iasDeScos = iasVechi - ee;
                        for (let iasK = iasJurnal.length - 1; iasK >= 0 && iasDeScos > 0; iasK--)
                            if (iasJurnal[iasK].feeId === F) iasJurnal.splice(iasK, 1), iasDeScos--
                    }
                    return {
                        ...He,
                        fees: {
                            ...He.fees || {},
                            [F]: ee
                        },
                        feeLog: iasJurnal,
                        [Te]: Math.max(0, (Number(He[Te]) || 0) + Ae)
                    }
                })
            }
        })
    }

    function we(I, F, iasFel) {
        // teoreticul se notează la fel ca practicul, cu contorul lui de susțineri
        if (iasFel === "teoretic") {
            ce(V => ({
                ...V,
                students: V.students.map(ee => ee.id !== I ? ee : {
                    ...ee,
                    theoryExamResult: F,
                    theoryExamAttempts: (Number(ee.theoryExamAttempts) || 0) + 1,
                    /* Ziua în care a dat examen rămâne scrisă, oricare ar fi
                       fost rezultatul. Până acum, la respins data se ștergea și
                       nu mai rămânea nicio urmă că omul a fost acolo. */
                    examIstoric: iasAdaugaLaIstoric(ee, {
                        data: ee.theoryExamDate || Be(),
                        fel: "teoretic",
                        rezultat: F
                    }),
                    theoryExamDate: F === "promovat" ? ee.theoryExamDate : ""
                })
            }));
            Y(F === "promovat" ? "Teoretic promovat \u2014 felicit\u0103ri!" : "Teoretic respins. Programeaz\u0103-l din nou c\xE2nd are dat\u0103.");
            return
        }
        ce(V => ({
            ...V,
            students: V.students.map(ee => {
                if (ee.id !== I) return ee;
                let te = (Number(ee.examAttempts) || 0) + 1;
                let iasIst = iasAdaugaLaIstoric(ee, {
                    data: ee.examDate || Be(),
                    fel: "practic",
                    perioada: ee.examPeriod || "",
                    rezultat: F
                });
                return F === "promovat" ? {
                    ...ee,
                    examResult: "promovat",
                    examAttempts: te,
                    examIstoric: iasIst
                } : {
                    ...ee,
                    examResult: "respins",
                    examAttempts: te,
                    examIstoric: iasIst,
                    examDate: "",
                    examPeriod: "",
                    asteptare: !0,
                    asteptareDin: Be(),
                    adeverintaDin: ""
                }
            })
        })), Y(F === "promovat" ? "Examen promovat \u2014 felicit\u0103ri!" : `Trecut \xEEn a\u0219teptare. Peste ${wf} zile \xEEi eliberezi adeverin\u021Ba.`)
    }

    function Re(I) {
        ce(F => ({
            ...F,
            students: F.students.map(V => V.id === I ? {
                ...V,
                bunVenitTrimis: Be()
            } : V)
        }))
    }

    function Pe(I) {
        ce(F => ({
            ...F,
            students: F.students.map(V => V.id === I ? {
                ...V,
                asteptare: !1,
                adeverintaDin: Be()
            } : V)
        })), Y(`Adeverin\u021B\u0103 eliberat\u0103. Poate fi programat \u2014 minimum ${vf} \u0219edin\u021Be p\xE2n\u0103 la examen.`)
    }

    function U(I, F, V) {
        let ee = null,
            te = null;
        if (F === "edit") {
            let ue = V.date !== I.date || V.startMin !== I.startMin,
                De = (V.location || "") !== (I.location || ""),
                Te = ue ? `Reprogramat\u0103: ${qe(V.date)} ${Se(V.startMin)} \u2192 ${qe(I.date)} ${Se(I.startMin)}` : De ? `Loc schimbat: ${V.location||"\u2014"} \u2192 ${I.location||"\u2014"}` : V.status !== I.status ? `Status schimbat \xEEn \u201E${(go[I.status]||{}).label||I.status}\u201D` : "Editat\u0103";
            ce(He => ({
                ...He,
                sessions: He.sessions.map(Ae => Ae.id === V.id ? {
                    ...Ae,
                    ...I,
                    history: [...Ae.history || [], {
                        at: Yn(),
                        action: Te
                    }]
                } : Ae)
            })), Y("\u0218edin\u021B\u0103 actualizat\u0103."), I.status === "cancelled" && V.status !== "cancelled" ? ee = "cancelled" : ue && I.status !== "cancelled" ? (ee = "rescheduled", te = {
                /* Ținem minte și locul vechi, nu doar ora. Înainte se pierdea:
                   când se schimbau amândouă, mesajul vorbea doar de oră, iar
                   elevul venea la ora nouă, dar la locul vechi. */
                date: V.date,
                startMin: V.startMin,
                location: V.location || ""
            }) : De && I.status !== "cancelled" && (ee = "location", te = {
                date: V.date,
                startMin: V.startMin,
                location: V.location || ""
            })
        } else ce(ue => ({
            ...ue,
            sessions: [...ue.sessions, {
                id: Vt("ses"),
                ...I,
                duration: Fa(ue.settings),
                createdAt: Yn(),
                history: [{
                    at: Yn(),
                    action: "Creat\u0103"
                }]
            }]
        })), Y("\u0218edin\u021B\u0103 programat\u0103."), ee = "created";
        if (d({
                open: !1,
                mode: "create",
                initial: null
            }), ee && !I.otherInstructor) {
            let ue = n.students.find(De => De.id === I.studentId);
            if (ue && ue.phone) {
                let De = {
                    created: "Anun\u021Bi elevul de programare?",
                    rescheduled: "Anun\u021Bi elevul de reprogramare?",
                    cancelled: "Anun\u021Bi elevul de anulare?",
                    location: "Anun\u021Bi elevul de schimbarea locului?"
                };
                v({
                    name: ue.name,
                    phone: ue.phone,
                    title: De[ee],
                    message: yw(ee, ue, I, te, n.settings)
                })
            }
        }
    }

    function me(I) {
        let F = n.students.find(V => V.id === I.studentId);
        if (!F || !F.phone) {
            Y("Elevul n-are num\u0103r de telefon.", "error");
            return
        }
        v({
            name: F.name,
            phone: F.phone,
            title: "Trimite confirmarea",
            message: yw("created", F, I, null, n.settings)
        })
    }

    function ve(I) {
        ce(F => ({
            ...F,
            sessions: F.sessions.filter(V => V.id !== I)
        })), Y("\u0218edin\u021B\u0103 \u0219tears\u0103."), d({
            open: !1,
            mode: "create",
            initial: null
        })
    }

    function Ee() {
        let I = Be(),
            F = 0;
        ce(V => {
            let ee = V.sessions.filter(te => !(te.auto && te.status === "pending" && te.date >= I));
            return F = V.sessions.length - ee.length, {
                ...V,
                sessions: ee
            }
        }), setTimeout(() => Y(F ? `${F} propuneri \u0219terse.` : "N-a r\u0103mas nimic de \u0219ters."), 0)
    }

    function ae(I) {
        ce(F => {
            let V = {};
            F.students.forEach(te => {
                V[te.id] = Fw(F.sessions, te.id)
            });
            let ee = [...F.sessions];
            return [...I].sort((te, ue) => te.date + te.startMin < ue.date + ue.startMin ? -1 : 1).forEach(te => {
                let ue = F.students.find(Ae => Ae.id === te.studentId),
                    De = ue && Number(ue.includedHours) || 0,
                    Te = V[te.studentId] || 0,
                    He = Te < De ? "included" : "extra";
                He === "included" && (V[te.studentId] = Te + 1), ee.push({
                    id: Vt("ses"),
                    studentId: te.studentId,
                    date: te.date,
                    startMin: te.startMin,
                    duration: Fa(F.settings),
                    type: He,
                    status: "pending",
                    auto: !0,
                    limba: iasLimbaDe(ue),
                    english: iasLimbaDe(ue) === "en",
                    notes: "",
                    location: ue?.defaultLocation || "",
                    createdAt: Yn(),
                    history: [{
                        at: Yn(),
                        action: "Creat\u0103 din planificator"
                    }]
                })
            }), {
                ...F,
                sessions: ee
            }
        }), Y(`${I.length} \u0219edin\u021Be propuse \u2014 a\u0219teapt\u0103 confirmare.`)
    }

    function Oe(I) {
        ce(F => ({
            ...F,
            licente: I
        }))
    }

    function $e(I) {
        ce(F => ({
            ...F,
            settings: {
                ...F.settings,
                licentePublicat: I
            }
        }))
    }

    function st(I) {
        ce(F => ({
            ...F,
            varsaminte: I
        }))
    }

    function hn(I) {
        ce(F => ({
            ...F,
            settings: {
                ...F.settings,
                ...I
            }
        }))
    }

    function tt(I) {
        ce(F => ({
            ...F,
            settings: {
                ...F.settings,
                rateTypes: I
            }
        }))
    }

    /* O limbă nouă, adăugată din fișă, din formular sau din pașii elevului nou. */
    function iasAdaugaLimbaApp(I) {
        ce(F => ({
            ...F,
            settings: {
                ...F.settings,
                ...iasSetariCuLimbi(F.settings, iasLimbi(F.settings).filter(x => x.id !== I.id).concat([I]))
            }
        })), Y(`${I.nume} e acum \xEEntre limbile tale, cu ${I.tarif} / ${I.tarifPeste} pe \u0219edin\u021B\u0103.`)
    }

    function ke(I) {
        ce(F => ({
            ...F,
            settings: {
                ...F.settings,
                employer: {
                    ...F.settings.employer,
                    ...I
                }
            }
        }))
    }

    function Ie(I) {
        ce(F => ({
            ...F,
            settings: {
                ...F.settings,
                locations: I
            }
        }))
    }

    function Lt(I, F) {
        ce(V => {
            let ee = {
                ...V.settings.workingDaysOverrides || {}
            };
            return F === "" || F == null ? delete ee[I] : ee[I] = F, {
                ...V,
                settings: {
                    ...V.settings,
                    workingDaysOverrides: ee
                }
            }
        })
    }

    function ut(I) {
        let F = XA(I, n.sessions, n.settings),
            V = new Blob([F], {
                type: "application/json"
            }),
            ee = URL.createObjectURL(V),
            te = document.createElement("a");
        te.href = ee;
        let ue = yu(I.name || "elev").toLowerCase() || "elev";
        te.download = `elev-${ue}-${Be()}.json`, document.body.appendChild(te), te.click(), document.body.removeChild(te), URL.revokeObjectURL(ee), Y("Fi\u0219a elevului a fost desc\u0103rcat\u0103.")
    }

    function qt(I) {
        let F = null;
        ce(V => {
            let ee = YA(V, I);
            return F = ee, ee.data
        }), setTimeout(() => {
            F && Y(F.clashes > 0 ? `${F.name}: ${F.count} \u0219edin\u021Be ad\u0103ugate, ${F.clashes} suprapuse.` : `${F.name}: ${F.count} \u0219edin\u021Be ad\u0103ugate.`)
        }, 0)
    }

    function ma() {
        return JSON.stringify({
            ...n,
            schemaVersion: f0,
            appVersion: ri,
            exportedAt: Yn()
        }, null, 2)
    }

    function wo() {
        let I = new Blob([ma()], {
                type: "application/json"
            }),
            F = URL.createObjectURL(I),
            V = document.createElement("a");
        V.href = F, V.download = `backup-scoala-auto-${ri}-${Be()}.json`, document.body.appendChild(V), V.click(), document.body.removeChild(V), URL.revokeObjectURL(F), J(), Y("Backup desc\u0103rcat.")
    }
    async function Su() {
        let I = ek(n, {
            seara: n.settings.amSeara !== !1,
            dimineata: n.settings.amDimineata !== !1,
            douaOre: n.settings.amDouaOre !== !1
        });
        if (!I) {
            Y("N-ai nicio \u0219edin\u021B\u0103 viitoare de trimis.", "error");
            return
        }
        let F = `ias-sedinte-${Be()}.ics`;
        for (let ue of ["text/calendar", "text/plain"]) try {
            let De = new File([I.text], F, {
                type: ue
            });
            if (navigator.canShare && navigator.canShare({
                    files: [De]
                })) {
                await navigator.share({
                    files: [De],
                    title: "\u0218edin\u021Be IAS"
                }), Y(`${I.cate} \u0219edin\u021Be trimise \xEEn calendar.`);
                return
            }
        } catch (De) {
            if (De && De.name === "AbortError") return
        }
        let V = new Blob([I.text], {
                type: "text/calendar"
            }),
            ee = URL.createObjectURL(V),
            te = document.createElement("a");
        te.href = ee, te.download = F, document.body.appendChild(te), te.click(), document.body.removeChild(te), URL.revokeObjectURL(ee), Y(`${I.cate} \u0219edin\u021Be desc\u0103rcate. Deschide fi\u0219ierul ca s\u0103 intre \xEEn calendar.`)
    }
    async function So() {
        let I = ma(),
            F = `backup-ias-${Be()}.json`;
        for (let V of ["application/json", "text/plain"]) try {
            let ee = new File([I], F, {
                type: V
            });
            if (navigator.canShare && navigator.canShare({
                    files: [ee]
                })) {
                await navigator.share({
                    files: [ee],
                    title: "Backup IAS",
                    text: `Backup IAS din ${qe(Be())}`
                }), J();
                return
            }
        } catch (ee) {
            if (ee && ee.name === "AbortError") return
        }
        Y("Telefonul nu accept\u0103 ata\u0219area fi\u0219ierului. L-am desc\u0103rcat.", "error"), wo()
    }

    function Mo() {
        ce(() => ({
            students: [],
            sessions: [],
            settings: sr
        })), Y("Toate datele au fost \u0219terse.")
    }

    function Mu(I) {
        ce(() => I), Y(`Backup importat: ${I.students.length} elevi, ${I.sessions.length} \u0219edin\u021Be.`)
    }
    let Ct = Cw(_);
    B.current = !!Ct.blocat;
    let Vi = n.students.find(I => I.id === c) || null,
        _u = n.settings.theme || "system",
        P = _u === "dark" ? "dark" : _u === "light" ? "light" : R ? "dark" : "light";
    (0, o.useEffect)(() => {
        let I = typeof document < "u" && document.querySelector('meta[name="theme-color"]');
        I && I.setAttribute("content", P === "dark" ? "#080d16" : "#e9eef6")
    }, [P]);
    let Z = [{
        id: "dashboard",
        label: "Acas\u0103",
        icon: iu
    }, {
        id: "calendar",
        label: "Calendar",
        icon: Kr
    }, {
        id: "students",
        label: "Elevi",
        icon: rr
    }, {
        id: "planner",
        label: "Plan",
        icon: Pa
    }, {
        id: "finance",
        label: "Finan\u021Be",
        icon: co
    }, {
        id: "settings",
        label: "Set\u0103ri",
        icon: ou
    }];
    return o.default.createElement("div", {
        "data-skin": P,
        className: "min-h-screen bg-slate-50 pb-24",
        style: {
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            colorScheme: P,
            background: "radial-gradient(1100px 420px at 50% -12%, var(--bg-tint), transparent), var(--bg)",
            transition: "background .5s ease"
        }
    }, o.default.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        /* Listele nu mai apar dintr-o dată, ci se derulează de sub titlul lor:
           altfel îți ia o clipă să înțelegi ce s-a deschis și de unde. */
        /* Hașura pentru ședințele puse peste un interval marcat indisponibil.
           Stă deasupra, dar transparentă: nu acoperă nimic din ce scrie. */
        /* Rândurile pe care se ține apăsat nu trebuie să cheme meniul
           browserului sau selecția de text — apăsarea lungă e a noastră. */
        .ias-fara-meniu {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
          touch-action: pan-y;
        }

        /* Aplicația nu e o pagină de citit: ținutul apăsat pe un buton sau pe o
           listă nu trebuie să selecteze text și să ridice meniul telefonului cu
           „Copy, Share, Ask Gemini". În câmpurile în care chiar scrii —
           inputuri, textarea — selecția rămâne, fiindcă acolo îți trebuie. */
        /* Regula stătea pe un div dinăuntru, iar telefonul tot mai găsea text de
           selectat în afara lui. O punem pe pagina întreagă, și pe fiecare
           element în parte, ca ținutul apăsat să nu mai ridice nimic. */
        html, body, [data-skin] {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
        }
        [data-skin] * {
          -webkit-touch-callout: none;
        }
        input, textarea, select,
        [contenteditable="true"],
        .ias-selectabil,
        [data-skin] input,
        [data-skin] textarea,
        [data-skin] select,
        [data-skin] [contenteditable="true"],
        [data-skin] .ias-selectabil {
          -webkit-user-select: text;
          user-select: text;
          -webkit-touch-callout: default;
        }

        .ias-peste-blocaj { position: relative }
        .ias-peste-blocaj::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          border-radius: inherit;
          background: repeating-linear-gradient(135deg,
            var(--line-2) 0 2px, transparent 2px 9px);
          opacity: .5;
        }

        @keyframes iasDerulare {
          from { opacity: 0; transform: translateY(-6px) scaleY(.96); max-height: 0 }
          to   { opacity: 1; transform: none; max-height: 1400px }
        }
        .ias-derulare {
          animation: iasDerulare 1s cubic-bezier(.16,1,.3,1);
          transform-origin: top center;
          overflow: hidden;
        }
        @media (prefers-reduced-motion: reduce) { .ias-derulare { animation: none } }

        @keyframes slideUp {
          from { transform: scale(.8) translateY(8px); opacity: 0 }
          55%  { opacity: 1 }
          to   { transform: none; opacity: 1 }
        } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .sheet-anim { animation: slideUp 1.05s cubic-bezier(.16,1,.3,1) ease-out; }
        .fade-anim { animation: fadeIn .55s ease-out ease-out; }
        .font-display { font-family: 'Oswald', sans-serif; }
        .font-mono-time { font-family: 'IBM Plex Mono', monospace; }

        /* Fereastra cere s\u0103 fie \xEEnchis\u0103: conturul devine ro\u0219u, iar \u201E\xD7"-ul cre\u0219te.
           Folosim o trecere de culoare, nu o anima\u021Bie \u2014 o anima\u021Bie ar \xEEnlocui-o
           pe cea de deschidere, iar la sf\xE2r\u0219it aceasta s-ar relua \u0219i ar p\u0103rea c\u0103
           fereastra s-a \xEEnchis \u0219i s-a redeschis. */
        [data-skin] .sheet-anim { transition: box-shadow .16s ease; }
        [data-skin] .btn-inchide { transition: transform .16s ease, color .16s ease; }
        .cere-inchidere .sheet-anim {
          box-shadow: 0 0 0 2px var(--bad), 0 0 52px -2px var(--bad), 0 26px 70px rgba(0,0,0,.5) !important;
        }
        .cere-inchidere .btn-inchide { color: var(--bad) !important; transform: scale(1.3); }
        .cere-inchidere.raport-overlay { box-shadow: inset 0 0 0 3px var(--bad); }

        .ias-star { position:absolute; width:2.5px; height:2.5px; border-radius:99px; background:#fff; animation: iasTwinkle 2.2s ease-in-out infinite; }
        @keyframes iasTwinkle { 0%,100% { opacity:.15; } 50% { opacity:1; } }
        .ias-dash { position:absolute; left:0; right:0; top:50%; height:3px; transform:translateY(-50%); background:repeating-linear-gradient(90deg,#fbbf24 0 22px, transparent 22px 44px); animation: iasDash .8s linear infinite; }
        @keyframes iasDash { from { background-position-x:0; } to { background-position-x:-44px; } }
        .ias-car { position:absolute; bottom:16px; animation: iasDrive 7s linear infinite; }
        @keyframes iasDrive { 0% { left:-14%; } 100% { left:108%; } }

        /* ================= SISTEM DE CULORI =================
           Un singur design. Ziua = jetoanele de mai jos; noaptea = ACELEA\u0218I
           jetoane, doar cobor\xE2te \xEEn luminozitate. Nimic nu se rescrie \xEEn
           interfa\u021B\u0103 \u2014 se schimb\u0103 doar valorile. */
        :root{
          --bg:#e9eef6; --bg-tint:rgba(245,158,11,.16);
          --surface:#ffffff; --surface-2:#eef3f9; --field:#eef3f9;
          --invert:#0f1d31; --on-invert:#ffffff;
          --text:#0c1a2b; --text-2:#33475e; --muted:#556a83; --muted-2:#6b8099; --faint:#8b9db4;
          --line:rgba(12,26,43,.11); --line-2:rgba(12,26,43,.20); --track:rgba(12,26,43,.10);
          --accent:#f0900b; --accent-ink:#8a4f04; --accent-soft:rgba(240,144,11,.13); --accent-line:rgba(240,144,11,.34);
          --ok:#00875a; --ok-soft:rgba(0,135,90,.11); --ok-line:rgba(0,135,90,.28);
          --info:#1f6fd0; --info-soft:rgba(31,111,208,.10); --info-line:rgba(31,111,208,.26);
          --bad:#d0342c; --bad-soft:rgba(208,52,44,.10); --bad-line:rgba(208,52,44,.26);
          --sky:#0b74a8; --sky-soft:rgba(11,116,168,.10); --sky-line:rgba(11,116,168,.26);
          --violet:#6d3fd4;
          --glow:rgba(240,144,11,.30);
          --shadow:0 1px 2px rgba(12,26,43,.05), 0 10px 26px rgba(12,26,43,.08);
          --shadow-lg:0 20px 46px rgba(12,26,43,.20);
        }
        [data-skin="dark"]{
          --bg:#080d16; --bg-tint:rgba(240,144,11,.06);
          --surface:#121c2c; --surface-2:#0e1725; --field:#182434;
          --invert:#1d2c42; --on-invert:#e8eff8;
          --text:#e6edf6; --text-2:#c3d0e0; --muted:#94a6bd; --muted-2:#8598b0; --faint:#71849c;
          --line:rgba(255,255,255,.11); --line-2:rgba(255,255,255,.20); --track:rgba(255,255,255,.11);
          --accent:#e0a13a; --accent-ink:#f0c579; --accent-soft:rgba(224,161,58,.15); --accent-line:rgba(224,161,58,.34);
          --ok:#4cc79a; --ok-soft:rgba(76,199,154,.14); --ok-line:rgba(76,199,154,.3);
          --info:#7fb0ef; --info-soft:rgba(127,176,239,.14); --info-line:rgba(127,176,239,.3);
          --bad:#ef8b84; --bad-soft:rgba(239,139,132,.14); --bad-line:rgba(239,139,132,.3);
          --sky:#6cc0e8; --sky-soft:rgba(108,192,232,.14); --sky-line:rgba(108,192,232,.3);
          --violet:#b09ae8;
          --glow:rgba(224,161,58,.32);
          --shadow:0 1px 2px rgba(0,0,0,.5); --shadow-lg:0 20px 46px rgba(0,0,0,.6);
        }

        /* --------- clasele existente, redirec\u021Bionate spre jetoane --------- */
        [data-skin] .bg-white{background-color:var(--surface)}
        [data-skin] .bg-slate-50{background-color:var(--surface-2)}
        [data-skin] .bg-slate-100{background-color:var(--track)}
        [data-skin] .bg-slate-900{background-color:var(--invert)}
        [data-skin] .bg-amber-50{background-color:var(--accent-soft)}
        [data-skin] .bg-emerald-50{background-color:var(--ok-soft)}
        [data-skin] .bg-blue-50{background-color:var(--info-soft)}
        [data-skin] .bg-red-50{background-color:var(--bad-soft)}
        [data-skin] .bg-sky-50{background-color:var(--sky-soft)}
        [data-skin] .bg-amber-400,[data-skin] .bg-amber-500{background-color:var(--accent)}
        [data-skin] .bg-emerald-500,[data-skin] .bg-emerald-600{background-color:var(--ok)}
        [data-skin] .bg-blue-500{background-color:var(--info)}
        [data-skin] .bg-red-400,[data-skin] .bg-red-500,[data-skin] .bg-red-600{background-color:var(--bad)}
        [data-skin] .text-slate-900,[data-skin] .text-slate-800{color:var(--text)}
        [data-skin] .text-slate-700,[data-skin] .text-slate-600{color:var(--text-2)}
        [data-skin] .text-slate-500{color:var(--muted)}
        [data-skin] .text-slate-400{color:var(--muted-2)}
        [data-skin] .text-slate-300{color:var(--faint)}
        [data-skin] .text-white{color:var(--on-invert)}
        [data-skin] .text-amber-600,[data-skin] .text-amber-700,[data-skin] .text-amber-800{color:var(--accent-ink)}
        [data-skin] .text-emerald-600,[data-skin] .text-emerald-700,[data-skin] .text-emerald-800{color:var(--ok)}
        [data-skin] .text-blue-700{color:var(--info)}
        [data-skin] .text-red-500,[data-skin] .text-red-600,[data-skin] .text-red-700{color:var(--bad)}
        [data-skin] .text-sky-600,[data-skin] .text-sky-700{color:var(--sky)}
        [data-skin] .text-violet-600{color:var(--violet)}
        [data-skin] .border-slate-100,[data-skin] .border-slate-200{border-color:var(--line)}
        [data-skin] .border-slate-300{border-color:var(--line-2)}
        [data-skin] .border-slate-900{border-color:var(--invert)}
        [data-skin] .border-amber-200,[data-skin] .border-amber-300{border-color:var(--accent-line)}
        [data-skin] .border-emerald-200{border-color:var(--ok-line)}
        [data-skin] .border-blue-200{border-color:var(--info-line)}
        [data-skin] .border-red-200{border-color:var(--bad-line)}
        [data-skin] .border-sky-200{border-color:var(--sky-line)}
        [data-skin] .active\\:bg-slate-50:active{background-color:var(--surface-2)}
        [data-skin] .hover\\:bg-slate-100:hover{background-color:var(--track)}

        /* ------------------------- limbaj vizual ------------------------- */
        [data-skin] .rounded-xl{border-radius:15px}
        [data-skin] .rounded-2xl{border-radius:20px}
        [data-skin] .sheet-anim{
          border-radius: 24px;
          overflow: hidden; /* altfel bara de butoane a fi\u0219ei ie\u0219ea din rotunjire */
          box-shadow: 0 0 0 1px var(--accent-line), 0 0 40px -4px var(--glow), 0 26px 70px rgba(0,0,0,.5);
        }
        [data-skin] .rounded-t-2xl{border-top-left-radius:24px;border-top-right-radius:24px}
        [data-skin] .bg-white.border{box-shadow:var(--shadow)}
        [data-skin] .bg-slate-900.rounded-2xl{background-image:linear-gradient(155deg,rgba(255,255,255,.07),rgba(0,0,0,.22));box-shadow:var(--shadow-lg)}
        [data-skin] .bg-slate-900.rounded-xl{box-shadow:0 6px 16px rgba(12,26,43,.20)}
        [data-skin] .bg-amber-500.rounded-full{background-image:linear-gradient(180deg,#fbbf24,#ef8f0a);box-shadow:0 12px 26px rgba(240,144,11,.45)}
        [data-skin] .bg-amber-500.text-white{color:#3a2100}
        [data-skin] input.bg-white,[data-skin] select.bg-white,[data-skin] textarea.bg-white{background-color:var(--field)}
        [data-skin] ::placeholder{color:var(--faint);opacity:1}
        [data-skin] option{background:var(--surface);color:var(--text)}
        /* Culoarea scrisului din câmpuri. Regula prindea doar câmpurile de tip
           număr, dată și oră; cele scrise ca text — cum e numărul de ședințe pe
           săptămână din Plan — rămâneau negre și se pierdeau pe tema de noapte.
           Acum toate câmpurile iau culoarea temei. */
        [data-skin] input,[data-skin] select,[data-skin] textarea{color:var(--text)}
        [data-skin] input[type="number"],[data-skin] input[type="date"],[data-skin] input[type="time"]{color:var(--text);background-color:var(--field)}

        /* semn\u0103tura IAS: liniu\u021B\u0103 de marcaj rutier la titluri de sec\u021Biune */
        [data-skin] .text-xs.font-medium.uppercase.tracking-wide::before{
          content:'';display:inline-block;width:15px;height:2px;border-radius:2px;
          background:var(--accent);margin-right:8px;vertical-align:middle;position:relative;top:-1px;
        }
        [data-skin] h1.font-display.text-xl::after{
          content:'';display:block;width:38px;height:3px;border-radius:3px;margin-top:7px;
          background:linear-gradient(90deg,var(--accent),transparent);
        }
        /* F\u0103r\u0103 blur pe bara de taburi: sub un fundal opac nu se vede oricum, iar
           pe iPhone efectul o desena peste ferestrele deschise. */

        /* ---------------- \xCENCADRARE PE ORICE L\u0102\u021AIME DE ECRAN ----------------
           Un <select> sau un <input> cere implicit o l\u0103\u021Bime minim\u0103 dat\u0103 de cel
           mai lung text din el. \xCEn grilele de dou\u0103 coloane asta \xEEmpingea
           formularul dincolo de marginea ecranelor \xEEnguste, iar telefonul
           compensa mic\u0219or\xE2nd toat\u0103 pagina. L\u0103\u021Bimea minim\u0103 zero le las\u0103 s\u0103 se
           str\xE2ng\u0103 \xEEn coloana lor, oric\xE2t de \xEEngust ar fi ecranul. */
        html, body { overflow-x: hidden; }
        [data-skin] { overflow-x: hidden; }
        [data-skin] input, [data-skin] select, [data-skin] textarea { min-width: 0; max-width: 100%; }
        [data-skin] .grid > * { min-width: 0; }
        [data-skin] label { min-width: 0; }
        [data-skin] .overflow-y-auto { overflow-x: hidden; }
        [data-skin] select { text-overflow: ellipsis; }
        /* Pe ecrane foarte \xEEnguste, marginile se str\xE2ng pu\u021Bin ca s\u0103 r\u0103m\xE2n\u0103
           loc c\xE2mpurilor. */
        @media (max-width: 390px) {
          [data-skin] .px-5 { padding-left: 1rem; padding-right: 1rem; }
          [data-skin] .px-4 { padding-left: 0.875rem; padding-right: 0.875rem; }
          [data-skin] .gap-3 { gap: 0.5rem; }
        }

        /* ---------------------- COAJ\u0102 DE APLICA\u021AIE ----------------------
           Pagina \xEEn sine nu deruleaz\u0103 deloc: ecranul e \xEEmp\u0103r\u021Bit \xEEntr-o zon\u0103 de
           con\u021Binut care deruleaz\u0103 pe din\u0103untru \u0219i o bar\u0103 de taburi fix\u0103 jos, la
           \xEEndem\xE2na degetului mare. Sus, coaja las\u0103 liber decupajul barei de
           stare a telefonului. */
        [data-skin].min-h-screen {
          position: fixed; inset: 0;
          display: flex; flex-direction: column;
          overflow: hidden;
          min-height: 0;
          padding: env(safe-area-inset-top) 0 0 0 !important;
        }
        [data-skin] > nav.bg-white {
          position: relative !important;
          flex: 0 0 auto;
          border-top: 1px solid var(--line);
          border-bottom: 0;
          padding-top: 0.375rem !important;
          padding-bottom: max(0.375rem, env(safe-area-inset-bottom)) !important;
        }
        /* Panoul filei active \u2014 singurul lucru care deruleaz\u0103. */
        [data-skin] > .pb-4,
        [data-skin] > .pb-6,
        [data-skin] > .min-h-screen {
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 6rem; /* loc sub ultima list\u0103 pentru butonul rotund */
        }
        /* Cadrul de lumin\u0103 al aplica\u021Biei. St\u0103 peste ferestrele deschise, la
           acela\u0219i nivel cu bara de taburi: puternic pe toat\u0103 latura de jos, cu
           dou\u0103 aripi care urc\u0103 pe st\xE2nga \u0219i pe dreapta, sting\xE2ndu-se \u0219i spre
           mijloc, \u0219i spre sus. Nu prinde ap\u0103s\u0103ri. */
        /* Cadrul de lumin\u0103 porne\u0219te de pe muchia de sus a barei de taburi \u0219i
           urc\u0103: o dung\u0103 pe toat\u0103 l\u0103\u021Bimea, chiar deasupra barei, \u0219i dou\u0103 aripi
           care se ridic\u0103 pe laturi, toate de aceea\u0219i grosime \u2014 3% din l\u0103\u021Bimea
           ecranului. Se stinge treptat pe m\u0103sur\u0103 ce urc\u0103. */
        .glow-cadru {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 100%;
          height: 62vh;
          pointer-events: none;
          transition: opacity .25s ease;
          -webkit-mask-image: linear-gradient(to top, #000 0, #000 34%, transparent 100%);
          mask-image: linear-gradient(to top, #000 0, #000 34%, transparent 100%);
          background:
            linear-gradient(to right, var(--glow), transparent) left center / clamp(10px, 3vw, 18px) 100% no-repeat,
            linear-gradient(to left, var(--glow), transparent) right center / clamp(10px, 3vw, 18px) 100% no-repeat,
            linear-gradient(to top, var(--glow), transparent) center bottom / 100% clamp(10px, 3vw, 18px) no-repeat;
        }
        /* C\xE2t timp e deschis\u0103 o fereastr\u0103, lumina de pe fundal se stinge: r\u0103m\xE2ne
           doar haloul ferestrei, ca ochiul s\u0103 aib\u0103 un singur punct de sprijin. */
        [data-skin]:has(.ecran-peste) .glow-cadru { opacity: 0; }

        [data-skin] .sheet-anim { max-height: 100% !important; }
        /* Ferestrele stau \xEEn mijlocul ecranului \u0219i las\u0103 loc jos c\xE2t \u021Bine bara de
           taburi cu glowul ei. A doua linie de padding-bottom o folosesc doar
           telefoanele care \u0219tiu de zona gestului; celelalte r\u0103m\xE2n pe prima. */
        .sheet-wrap {
          top: var(--ias-sus, 0px);
          height: var(--ias-vazut, 100%);
          bottom: auto;
          padding: 0.75rem;
          padding-top: 2.5rem;
          padding-top: calc(env(safe-area-inset-top, 0px) + 2.5rem);
          padding-bottom: 5.5rem;
          padding-bottom: calc(5.5rem + env(safe-area-inset-bottom, 0px));
        }
        /* Cu tastatura ridicată, fereastra urcă în capul zonei rămase și nu mai
           păstrează loc pentru bara de file — oricum e sub taste. */
        html.ias-tastatura .sheet-wrap {
          align-items: flex-start;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        /* Telefonul culcat, cu tastatura sus, lasă foarte puțin pe înălțime.
           Atunci strângem tot ce se poate: marginile ferestrei, antetul ei și
           spațiile dintre câmpuri, ca locul rămas să fie al listei. */
        @media (orientation: landscape) and (max-height: 520px) {
          html.ias-tastatura .sheet-wrap { padding: 0.25rem; }
          html.ias-tastatura .sheet-anim > div:first-child { padding-top: .5rem; padding-bottom: .5rem }
          html.ias-tastatura .sheet-anim h2 { font-size: 1rem }
          html.ias-tastatura .sheet-anim .mb-3\\.5 { margin-bottom: .5rem }
        }
        [data-skin] .fixed.bottom-20 { bottom: calc(5rem + env(safe-area-inset-bottom)); }
        [data-skin] .fixed.bottom-24 { bottom: calc(6.25rem + env(safe-area-inset-bottom)); }

        /* ------------------------ FIL\u0102 DE DOSAR -------------------------
           Fila activ\u0103 are col\u021Burile de jos rotunjite, culoarea proprie \u0219i se
           lipe\u0219te de panoul de deasupra ei, iar pagina prime\u0219te un contur \xEEn
           aceea\u0219i culoare, care se stinge spre interior. */
        [data-skin] > nav.bg-white {
          padding-top: 0 !important;
          border-top: 0;
        }
        [data-skin] > nav.bg-white button {
          border-radius: 0 0 13px 13px;
          padding-top: 0.45rem;
          border: 1px solid transparent;
          border-top: 0;
          transition: background .2s ease, border-color .2s ease;
        }
        [data-skin] > nav.bg-white button:has(.text-amber-600) {
          background: var(--glow);
          border-color: var(--accent-line);
        }
        [data-skin] > .pb-4,
        [data-skin] > .pb-6,
        [data-skin] > .min-h-screen {
          border-bottom: 1px solid var(--accent-line);
        }

        /* --------------------------- TIP\u0102RIRE ---------------------------
           La tip\u0103rire (\u0219i la \u201ESalveaz\u0103 ca PDF") pleac\u0103 doar raportul, curat,
           pe alb, cu capul de tabel repetat pe fiecare pagin\u0103. Restul
           aplica\u021Biei se ascunde, iar coaja fix\u0103 e desf\u0103cut\u0103 ca s\u0103 nu taie
           con\u021Binutul la o singur\u0103 pagin\u0103. */
        @media print {
          @page { margin: 14mm 12mm; }
          html, body { background: #fff !important; height: auto !important; overflow: visible !important; }
          body * { visibility: hidden !important; }
          .raport-print, .raport-print * { visibility: visible !important; }
          [data-skin].min-h-screen {
            position: static !important; display: block !important;
            overflow: visible !important; height: auto !important; padding: 0 !important;
            background: #fff !important; box-shadow: none !important;
          }
          .raport-overlay { position: absolute !important; inset: 0 auto auto 0 !important; width: 100% !important; background: #fff !important; }
          .raport-print {
            position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important;
            height: auto !important; max-height: none !important; overflow: visible !important;
            padding: 0 !important; background: #fff !important; color: #000 !important;
          }
          .raport-print .fara-print { display: none !important; }
          .raport-print .doar-print { display: block !important; }
          .raport-print * { color: #000 !important; }
          .raport-tabel { width: 100% !important; border-collapse: collapse !important; }
          .raport-tabel th, .raport-tabel td { border: 1px solid #999 !important; padding: 5pt 6pt !important; font-size: 10.5pt !important; }
          .raport-tabel thead { display: table-header-group !important; }
          /* Capul de tabel se repet\u0103 pe fiecare pagin\u0103, totalul nu: \xEEl scoatem
             din rolul de subsol repetat \u0219i \xEEl l\u0103s\u0103m s\u0103 curg\u0103 la coada listei. */
          .raport-tabel tfoot { display: table-row-group !important; }
          .raport-tabel tr { break-inside: avoid !important; page-break-inside: avoid !important; }
          .raport-tabel tfoot td { font-weight: 700 !important; }
        }

        /* ------------------- BUTOANE SELECTATE -------------------
           Zilele de lucru, tema, zilele elevului, filtrele de sortare \u0219i
           ziua din calendar foloseau negrul de fundal, care noaptea se
           confunda cu cardul. Selec\u021Bia trece pe chihlimbariu, aceea\u0219i
           culoare cu conturul filei active. Butoanele mari de ac\u021Biune
           (Salveaz\u0103, Aplic\u0103 planul) r\u0103m\xE2n \xEEnchise \u2014 ele n-au bordur\u0103. */
        [data-skin] .bg-slate-900.border-slate-900 {
          background-color: var(--accent) !important;
          border-color: var(--accent) !important;
          box-shadow: 0 6px 14px -8px var(--accent);
        }
        [data-skin] .bg-slate-900.border-slate-900,
        [data-skin] .bg-slate-900.border-slate-900 * { color: #2a1800 !important; }
        [data-skin] .bg-slate-900.border-slate-900 .bg-amber-400,
        [data-skin] .bg-slate-900.border-slate-900 .bg-amber-500 { background-color: #2a1800 !important; }

        /* >>> IAS-2027 */
        /* ============== IAS 2027 — STICLĂ, LUMINĂ, MIȘCARE ==============
           Doar înfățișare. Aceleași clase și aceleași jetoane, cu alte valori:
           întuneric adânc, carduri de sticlă cu muchie luminoasă și un fundal
           care se mișcă foarte încet. Nimic din ce face aplicația nu se schimbă,
           iar antetul cu mașina rămâne cum era. */
        [data-skin="dark"]{
          --bg:#04070d; --bg-tint:transparent;
          --surface:rgba(150,174,216,.085); --surface-2:rgba(150,174,216,.05); --field:rgba(150,174,216,.11);
          --invert:rgba(206,221,246,.21); --on-invert:#f4f7fc;
          --text:#edf2f9; --text-2:#c9d4e4; --muted:#9aabc2; --muted-2:#8a9cb5; --faint:#75889f;
          --line:rgba(190,210,245,.13); --line-2:rgba(190,210,245,.24); --track:rgba(190,210,245,.12);
          --accent:#f0ad3d; --accent-ink:#f6cd82; --accent-soft:rgba(240,173,61,.16); --accent-line:rgba(240,173,61,.42);
          --glow:rgba(240,173,61,.36);
          --shadow:inset 0 1px 0 rgba(255,255,255,.09), 0 16px 30px -20px rgba(0,0,0,.85);
          --ias-pan:rgba(12,18,31,.80); --ias-plin:#0c121f; --ias-muchie:rgba(205,222,250,.18); --ias-fir:rgba(190,212,250,.055);
          --ias-m1:rgba(240,160,50,.23); --ias-m2:rgba(64,98,255,.27); --ias-m3:rgba(148,84,255,.20); --ias-m4:rgba(16,176,200,.15);
        }
        [data-skin="light"]{
          --bg:#e6ebf4; --bg-tint:transparent;
          --surface:rgba(255,255,255,.70); --surface-2:rgba(255,255,255,.44); --field:rgba(255,255,255,.80);
          --line:rgba(12,26,43,.10); --line-2:rgba(12,26,43,.20); --track:rgba(12,26,43,.09);
          --shadow:inset 0 0 0 1px rgba(255,255,255,.70), 0 14px 28px -18px rgba(12,26,43,.30);
          --ias-pan:rgba(246,249,253,.84); --ias-plin:#f3f6fb; --ias-muchie:rgba(255,255,255,.95); --ias-fir:rgba(12,26,43,.045);
          --ias-m1:rgba(240,144,11,.17); --ias-m2:rgba(56,108,255,.15); --ias-m3:rgba(148,84,255,.11); --ias-m4:rgba(0,168,190,.11);
        }

        /* ---- fundalul: patru pete de lumină care se plimbă foarte încet ---- */
        /* Peste culoarea de fond stau linii subțiri, oblice. Ele dau sticlei
           ceva de estompat: între carduri se văd, sub carduri se topesc. */
        [data-skin].min-h-screen{
          background: repeating-linear-gradient(118deg, transparent 0 43px, var(--ias-fir) 43px 44px), var(--bg) !important;
        }
        /* Petele de lumină ies mult din ecran. Fără regula asta, pagina ar
           putea fi trasă după ele când telefonul aduce un câmp în vedere. */
        @supports (overflow: clip){ [data-skin].min-h-screen{ overflow: clip; } }
        [data-skin].min-h-screen::before{
          /* Stratul e mic și mărit de trei ori: petele sunt oricum moi, iar
             telefonul ține în memorie o imagine de nouă ori mai ușoară. */
          content:""; position:absolute; inset:20%; z-index:-1; pointer-events:none;
          background:
            radial-gradient(34% 30% at 24% 26%, var(--ias-m1), transparent 72%),
            radial-gradient(32% 30% at 78% 30%, var(--ias-m2), transparent 72%),
            radial-gradient(36% 32% at 64% 78%, var(--ias-m3), transparent 72%),
            radial-gradient(30% 28% at 18% 76%, var(--ias-m4), transparent 72%);
          /* Petele se mută în pași mărunți, de câteva ori pe secundă, nu la
             fiecare cadru: ochiul vede aceeași plutire lentă (un pas e de un
             pixel), iar telefonul nu mai redesenează sticla de deasupra lor de
             60 de ori pe secundă. */
          animation: iasPete 80s steps(120) infinite alternate;
          will-change: transform;
        }
        @keyframes iasPete{
          0%  { transform: translate3d(-12%,-9%,0) rotate(0deg) scale(2.95) }
          50% { transform: translate3d(12%,15%,0) rotate(14deg) scale(3.25) }
          100%{ transform: translate3d(18%,-9%,0) rotate(-10deg) scale(3.05) }
        }

        /* Sub bara plutitoare, conținutul se stinge treptat, ca să nu se vadă
           rânduri tăiate pe lângă ea. Stă peste liste, dar sub bară și ferestre. */
        [data-skin].min-h-screen::after{
          content:""; position:absolute; left:0; right:0; bottom:0; z-index:1; pointer-events:none;
          height:calc(104px + env(safe-area-inset-bottom, 0px));
          background:linear-gradient(to top, var(--bg) 20%, transparent);
        }

        /* ---- panoul filei: fără dunga de dosar, cu loc sub bara plutitoare ---- */
        [data-skin] > .pb-4,
        [data-skin] > .pb-6,
        [data-skin] > .min-h-screen{ border-bottom:0; padding-bottom:7.75rem; }

        /* ---- bara de jos: o capsulă de sticlă care plutește ---- */
        [data-skin] > nav.bg-white{
          position:absolute !important; left:12px; right:12px; width:auto;
          bottom:calc(10px + env(safe-area-inset-bottom, 0px));
          gap:2px; padding:6px !important; border-radius:999px;
          background-color:var(--ias-pan) !important;
          -webkit-backdrop-filter:blur(22px) saturate(1.6); backdrop-filter:blur(22px) saturate(1.6);
          border:1px solid var(--ias-muchie) !important;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.10), 0 18px 44px -10px rgba(0,0,0,.6);
        }
        [data-skin="light"] > nav.bg-white{ box-shadow:0 18px 40px -14px rgba(12,26,43,.35); }
        [data-skin] > nav.bg-white button{
          position:relative; flex:1 1 0; min-width:0; height:48px;
          flex-direction:row; justify-content:center; gap:7px;
          padding:0 !important; border:0 !important; border-radius:999px !important;
          background:transparent;
          transition:flex-grow .5s cubic-bezier(.34,1.45,.64,1), background-color .3s ease, box-shadow .3s ease, scale .5s cubic-bezier(.34,1.56,.64,1);
        }
        [data-skin] > nav.bg-white button > span:first-child{
          width:auto !important; height:auto !important; background:transparent !important;
        }
        [data-skin] > nav.bg-white button > span.text-xs{
          position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap;
        }
        [data-skin] > nav.bg-white button:has(.text-amber-600){
          flex-grow:2.3; background:var(--accent-soft);
          box-shadow:inset 0 0 0 1px var(--accent-line), 0 0 24px -8px var(--glow);
        }
        [data-skin] > nav.bg-white button:has(.text-amber-600) > span.text-xs{
          position:static; width:auto; height:auto; overflow:visible; clip-path:none;
          font-size:14px; font-weight:700;
        }
        /* Cadrul de lumină rămâne, dar pleacă de la marginea ecranului, nu de
           la capsulă, și stă sub butoane. */
        [data-skin] > nav.bg-white > .glow-cadru{
          left:-13px; right:-13px; z-index:-1;
          bottom:calc(-11px - env(safe-area-inset-bottom, 0px));
          opacity:.5;
        }

        /* ---- carduri: sticlă fără estompare ----
           Estomparea pusă pe fiecare card îl obliga pe telefon să recalculeze
           zeci de carduri la fiecare cadru: de aici sacadele și cardurile care
           apăreau cu întârziere. Sub carduri stă doar fundalul moale, așa că o
           bază ușor întunecată face aceeași treabă: liniile oblice se pierd sub
           card, iar lumina petelor trece în continuare prin el. Pe lumină,
           cardul e oricum destul de alb. */
        [data-skin="dark"] > .pb-4 .bg-white.border:not(input):not(select):not(textarea),
        [data-skin="dark"] > .pb-6 .bg-white.border:not(input):not(select):not(textarea){
          background-image:linear-gradient(var(--surface), var(--surface));
          background-color:rgba(4,7,13,.32);
        }
        @supports selector(:has(*)){
          /* Antetul lipit al listei: cardurile trec pe sub el, estompate. E un
             singur element, deci estomparea lui nu costă. */
          [data-skin] > .pb-4 .sticky:not(:has(.ecran-peste)),
          [data-skin] > .pb-6 .sticky:not(:has(.ecran-peste)){
            background:color-mix(in srgb, var(--bg) 62%, transparent) !important;
            -webkit-backdrop-filter:blur(18px) saturate(1.4); backdrop-filter:blur(18px) saturate(1.4);
          }
        }

        /* ---- forme ---- */
        [data-skin] .rounded-lg{ border-radius:13px; }
        [data-skin] .rounded-xl{ border-radius:18px; }
        [data-skin] .rounded-2xl{ border-radius:24px; }
        [data-skin] .rounded-t-2xl{ border-top-left-radius:28px; border-top-right-radius:28px; }

        /* ---- butoanele pline: sticlă luminoasă, nu bloc închis ---- */
        [data-skin="dark"] .bg-slate-900:not(.border-slate-900){
          box-shadow:inset 0 0 0 1px var(--line-2), inset 0 1px 0 rgba(255,255,255,.16);
        }
        [data-skin] .bg-slate-900.border-slate-900{ box-shadow:0 0 22px -6px var(--accent) !important; }
        /* Varianta aleasă (status, tip de oră, ora, zilele de lucru…): pe
           întuneric e chihlimbar, ca fila activă. Sticla deschisă se deosebea
           prea puțin de cea neagră. Pe lumină rămâne bleumarin plin. */
        [data-skin="dark"] .bg-slate-900.border-slate-900,
        [data-skin="dark"] [data-ias-ales]{
          background-color:var(--accent-soft) !important; border-color:var(--accent-line) !important;
          color:var(--accent-ink) !important; box-shadow:0 0 20px -6px var(--glow) !important;
        }
        [data-skin] .bg-amber-500.rounded-full{
          box-shadow:0 0 30px -2px var(--glow), 0 14px 30px -10px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.45);
        }

        /* ---- fișa elevului: „Editează" e doar creionul ----
           Numele butonului rămâne pentru cititorul de ecran; se strânge doar
           la iconiță, iar „Ședință nouă" ia locul rămas. */
        [data-skin] .flex.gap-2 > button.flex-1:has(> svg.lucide-pencil):has(~ button.bg-slate-900){
          flex:0 0 48px; min-height:44px; padding:0; gap:0; font-size:0; border-radius:999px;
        }
        [data-skin] .flex.gap-2 > button.flex-1:has(> svg.lucide-pencil):has(~ button.bg-slate-900) > svg{ width:17px; height:17px; }

        /* ---- antetul cu mașina: exact ca înainte ----
           Înăuntrul lui jetoanele au din nou valorile vechi, iar regulile noi
           de formă, lumină și atingere nu ajung la el. */
        [data-skin="dark"] [data-ias-antet]{
          --bg:#080d16; --bg-tint:rgba(240,144,11,.06);
          --surface:#121c2c; --surface-2:#0e1725; --field:#182434;
          --invert:#1d2c42; --on-invert:#e8eff8;
          --text:#e6edf6; --text-2:#c3d0e0; --muted:#94a6bd; --muted-2:#8598b0; --faint:#71849c;
          --line:rgba(255,255,255,.11); --line-2:rgba(255,255,255,.20); --track:rgba(255,255,255,.11);
          --accent:#e0a13a; --accent-ink:#f0c579; --accent-soft:rgba(224,161,58,.15); --accent-line:rgba(224,161,58,.34);
          --glow:rgba(224,161,58,.32);
          --shadow:0 1px 2px rgba(0,0,0,.5);
        }
        [data-skin="light"] [data-ias-antet]{
          --bg:#e9eef6; --bg-tint:rgba(245,158,11,.16);
          --surface:#ffffff; --surface-2:#eef3f9; --field:#eef3f9;
          --line:rgba(12,26,43,.11); --line-2:rgba(12,26,43,.20); --track:rgba(12,26,43,.10);
          --shadow:0 1px 2px rgba(12,26,43,.05), 0 10px 26px rgba(12,26,43,.08);
        }
        [data-skin] [data-ias-antet] .rounded-lg{ border-radius:.5rem; }
        [data-skin] [data-ias-antet] .rounded-xl{ border-radius:15px; }
        [data-skin] [data-ias-antet] .rounded-2xl{ border-radius:20px; }
        [data-skin] [data-ias-antet] .bg-amber-500,[data-skin] [data-ias-antet] .bg-amber-400,
        [data-skin] [data-ias-antet] .bg-slate-900{ box-shadow:none; }
        [data-skin] [data-ias-antet] .text-xs.font-medium.uppercase.tracking-wide::before{ box-shadow:none; }
        [data-skin] [data-ias-antet] button,[data-skin] [data-ias-antet] a{ transition:all 0s ease 0s; }
        [data-skin] [data-ias-antet] button:active,[data-skin] [data-ias-antet] a:active{ scale:1; }

        /* ---- câmpuri ---- */
        [data-skin] input:focus,[data-skin] select:focus,[data-skin] textarea:focus{
          outline:none; box-shadow:0 0 0 2px var(--accent-line), 0 0 20px -4px var(--glow);
        }
        [data-skin] option{ background:var(--ias-plin); color:var(--text); }

        /* ---- ferestre: sticlă groasă peste o pagină estompată ----
           Estomparea stă pe vălul din spatele ferestrei, nu pe fereastră: o
           fereastră cu estompare proprie le-ar ține captive pe cele deschise
           din ea, iar ele n-ar mai acoperi ecranul. */
        [data-skin] .sheet-anim,
        [data-skin] .ecran-peste > .relative.bg-white{
          background-color:var(--ias-pan) !important;
          border-radius:28px;
          box-shadow:0 0 0 1px var(--ias-muchie), inset 0 1px 0 rgba(255,255,255,.12), 0 0 46px -10px var(--glow), 0 30px 80px rgba(0,0,0,.6);
        }
        [data-skin] .ecran-peste > .absolute.inset-0{
          -webkit-backdrop-filter:blur(14px) saturate(1.3); backdrop-filter:blur(14px) saturate(1.3);
        }
        [data-skin="dark"] .ecran-peste > .absolute.inset-0{ background-color:rgba(2,4,9,.60); }
        /* Mesajele scurte de jos plutesc peste conținut: sticlă cu estompare. */
        [data-skin] .fixed.rounded-full.bg-slate-900{
          background-color:var(--ias-pan) !important;
          -webkit-backdrop-filter:blur(20px) saturate(1.5); backdrop-filter:blur(20px) saturate(1.5);
          box-shadow:0 0 0 1px var(--ias-muchie), 0 18px 44px -12px rgba(0,0,0,.55);
        }
        [data-skin] .raport-overlay{ background-color:var(--ias-plin) !important; }

        /* ---- semnătura IAS: liniuța de marcaj se aprinde ---- */
        [data-skin="dark"] .text-xs.font-medium.uppercase.tracking-wide::before{ box-shadow:0 0 9px var(--glow); }
        [data-skin="dark"] .bg-amber-500,[data-skin="dark"] .bg-amber-400{ box-shadow:0 0 12px -2px var(--glow); }

        /* ---- atingerea: se strânge puțin și revine elastic ---- */
        [data-skin] *{ -webkit-tap-highlight-color:transparent; }
        /* Fără mărire din greșeală: nici cu două degete, nici la atingeri
           repetate. Derularea în sus, în jos și în lateral rămâne. Merge și pe
           telefoanele la care mărirea e pornită din setările de accesibilitate,
           la fel ca pe rândurile ședințelor, unde deja nu se putea mări. */
        html, body, [data-skin]{ touch-action:pan-x pan-y; }
        [data-skin] button,[data-skin] a,[data-skin] [role="button"],[data-skin] summary,[data-skin] .cursor-pointer{
          transition:scale .5s cubic-bezier(.34,1.56,.64,1), background-color .2s ease, border-color .2s ease, box-shadow .25s ease, color .2s ease, opacity .2s ease;
        }
        [data-skin] button:active:not(:disabled),[data-skin] a:active,[data-skin] [role="button"]:active,[data-skin] summary:active,[data-skin] .cursor-pointer:active{
          scale:.95;
          transition-duration:.14s, .2s, .2s, .25s, .2s, .2s;
          transition-timing-function:cubic-bezier(.3,.7,.4,1), ease, ease, ease, ease, ease;
          transition-delay:.04s, 0s, 0s, 0s, 0s, 0s;
        }
        [data-skin] > nav.bg-white button:active{ scale:.92; }

        @media (prefers-reduced-motion: reduce){
          [data-skin].min-h-screen::before{ animation:none; }
          [data-skin] button,[data-skin] a,[data-skin] [role="button"],[data-skin] summary,[data-skin] .cursor-pointer{ transition-duration:.01s !important; }
          [data-skin] button:active,[data-skin] a:active{ scale:1 !important; }
        }
        @media print{
          [data-skin].min-h-screen{ background:#fff !important; }
          [data-skin] .bg-white.border,[data-skin] .sticky{ -webkit-backdrop-filter:none !important; backdrop-filter:none !important; }
          [data-skin="dark"] > .pb-4 .bg-white.border:not(input):not(select):not(textarea),
          [data-skin="dark"] > .pb-6 .bg-white.border:not(input):not(select):not(textarea){ background-image:none; background-color:var(--surface); }
          [data-skin].min-h-screen::before,[data-skin].min-h-screen::after{ display:none; }
        }
        /* <<< IAS-2027 */
      `), t || _ === void 0 ? o.default.createElement("div", {
        className: "min-h-screen flex items-center justify-center"
    }, o.default.createElement("div", {
        className: "text-slate-400 text-sm"
    }, "Se \xEEncarc\u0103\u2026")) : Ct.ecranCod ? o.default.createElement(s3, {
        eroare: k,
        ocupat: M,
        onTrimite: ge
    }) : o.default.createElement(o.default.Fragment, null, Ct.blocat && o.default.createElement(o3, {
        st: Ct,
        cod: _.cod,
        ocupat: M,
        onVerifica: ye
    }), (A < 0 || A >= l3) && n.students.length > 0 && o.default.createElement("div", {
        className: "shrink-0 px-4 py-2 flex items-center gap-2",
        style: {
            background: "var(--accent-soft)",
            borderBottom: "1px solid var(--accent-line)"
        }
    }, o.default.createElement("span", {
        className: "text-xs flex-1",
        style: {
            color: "var(--accent-ink)"
        }
    }, A < 0 ? "Nu \u021Bi-ai salvat niciodat\u0103 datele." : `N-ai mai salvat datele de ${iS(A)}.`), o.default.createElement("button", {
        onClick: So,
        className: "shrink-0 px-3 py-1.5 rounded-lg text-white text-xs font-medium",
        style: {
            background: "var(--invert)"
        }
    }, "Salveaz\u0103 acum")), r === "dashboard" && o.default.createElement(zk, {
        data: n,
        onOpenSession: (I, F) => d({
            open: !0,
            mode: I,
            initial: F
        }),
        onAddStudent: re,
        onOpenScolarizare: I => { m(I), iasPuneScolId(I) },
        onAddSession: () => d({
            open: !0,
            mode: "create",
            initial: null
        }),
        onGoToPlanner: () => i("planner"),
        onOpenStudent: I => m(I),
        /* Din anunțul de „gata de sală" sari drept la secțiunea Examene a
           elevului, unde îi pui data — nu te mai plimbi prin fișă. */
        onOpenExamene: I => { m(I), iasCereExamene(!0) },
        onGoToCalendar: () => i("calendar"),
        onGoToSettings: () => i("settings")
    }), r === "calendar" && o.default.createElement(Hk, {
        data: n,
        onUpdateSettings: hn,
        onRecordExam: we,
        onOpenSession: (I, F) => d({
            open: !0,
            mode: I,
            initial: F
        })
    }), r === "students" && o.default.createElement(Vk, {
        data: n,
        onOpenStudent: I => m(I),
        onAddStudent: re,
        onOpenReport: () => cu(Ct, "raport") ? y(!0) : ze("raportul de elevi")
    }), r === "planner" && (cu(Ct, "plan") ? o.default.createElement(jk, {
        data: n,
        onUpdateStudentLimit: H,
        onApplyPlan: ae,
        onStergePropuneri: Ee
    }) : o.default.createElement(Iw, {
        titlu: "Plan",
        cod: _ && _.cod,
        tipNume: Ct.tipNume,
        descriere: "Planificatorul \xEE\u021Bi umple s\u0103pt\u0103m\xE2nile singur: \xEEi ia \xEEnt\xE2i pe elevii cu examenul aproape, respect\u0103 orele \u0219i zilele \xEEn care poate veni fiecare \u0219i \xEE\u021Bi spune \xEEn c\xE2te zile termini."
    })), r === "finance" && (cu(Ct, "finante") ? o.default.createElement(Yk, {
        data: n,
        onUpdateSettings: hn,
        onUpdateRateTypes: tt,
        onUpdateEmployerSettings: ke,
        onUpdateWorkingDaysOverride: Lt,
        onEditPayment: Q,
        onUpdateVarsaminte: st
    }) : o.default.createElement(Iw, {
        titlu: "Finan\u021Be",
        cod: _ && _.cod,
        tipNume: Ct.tipNume,
        descriere: "C\xE2t ai de \xEEncasat de la fiecare elev, ce ai \xEEncasat luna asta \u0219i c\xE2t \u021Bi se cuvine de la \u0219coal\u0103, cu tarife \u0219i praguri stabilite de tine."
    })), r === "settings" && o.default.createElement(e3, {
        data: n,
        onUpdateSettings: hn,
        onUpdateLocations: Ie,
        onExport: wo,
        onImport: Mu,
        onImportStudent: qt,
        onResetAll: Mo,
        skin: P,
        licenta: _,
        stLic: Ct,
        licOcupat: M,
        onVerificaLicenta: ye,
        onSchimbaCod: Ne,
        onDespre: () => C("intro"),
        onNoutati: () => de(),
        onLicente: () => G(!0),
        onTrimiteBackup: So,
        onTrimiteCalendar: Su
    })), !Ct.ecranCod && o.default.createElement("nav", {
        className: "fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex px-2 pt-1.5",
        style: {
            zIndex: Wt.nav,
            paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))"
        }
    }, o.default.createElement("span", {
        "aria-hidden": "true",
        className: "glow-cadru"
    }), Z.filter(I => I.id !== "settings").map(I => {
        let F = I.icon,
            V = r === I.id;
        return o.default.createElement("button", {
            key: I.id,
            onClick: () => ne(I.id),
            className: "flex-1 flex flex-col items-center gap-1 py-1.5"
        }, o.default.createElement("span", {
            className: "flex items-center justify-center",
            style: {
                width: 42,
                height: 24,
                borderRadius: 99,
                background: V ? "var(--accent-soft)" : "transparent",
                transition: "background .2s ease"
            }
        }, o.default.createElement(F, {
            size: 19,
            className: V ? "text-amber-600" : "text-slate-400"
        })), o.default.createElement("span", {
            className: `text-xs font-medium ${V?"text-amber-600":"text-slate-400"}`
        }, I.label))
    })), o.default.createElement(Rk, {
        open: u.open,
        mode: u.mode,
        initial: u.initial,
        data: n,
        onClose: () => d({
            open: !1,
            mode: "create",
            initial: null
        }),
        onSave: U,
        onDelete: ve,
        onTrimiteConfirmare: me
    }), o.default.createElement(qk, {
        open: !!Vi,
        student: Vi,
        sessions: n.sessions,
        settings: n.settings,
        onClose: () => { m(null), iasCereExamene(!1) },
        onEdit: () => p({
            open: !0,
            mode: "edit",
            initial: Vi
        }),
        /* Când ai venit din anunțul de „gata de sală", fișa se deschide de la
           sine în editare, cu secțiunea Examene desfăcută. */
        laExamene: iasCerutExamene,
        onExameneDeschis: () => { iasCereExamene(!1), p({ open: !0, mode: "edit", initial: Vi, laExamene: !0 }) },
        onAddSession: () => d({
            open: !0,
            mode: "create",
            initial: {
                studentId: Vi.id
            }
        }),
        onOpenSession: I => d({
            open: !0,
            mode: "edit",
            initial: I
        }),
        onNotify: I => v(I),
        onAddPayment: L,
        onEditPayment: Q,
        onSetReexamCount: pe,
        onRecordExam: we,
        onExportStudent: ut,
        onElibereazaAdeverinta: Pe,
        onBunVenitTrimis: Re,
        /* Limba aleasă din capul fișei: elevul și ședințele lui viitoare. */
        onLimba: (iasId, iasL) => {
            ce(te => ({
                ...te,
                students: te.students.map(x => x.id === iasId ? iasCuLimba(x, iasL) : x),
                sessions: iasLimbaPeViitoare(te.sessions, iasId, iasL).sesiuni
            })), Y(iasMesajLimbaNoua(n.settings, iasL))
        },
        onAdaugaLimba: iasAdaugaLimbaApp,
        onCompleteaza: I => iasPuneScolId(I),
        poateTransfera: cu(Ct, "transfer")
    }), o.default.createElement(Dk, {
        open: !!w,
        payment: w ? w.payment : null,
        studentName: w ? w.name : "",
        currency: n.settings.currency,
        onClose: () => x(null),
        onSave: I => {
            T(w.studentId, w.payment.id, I), x(null)
        },
        onDelete: () => {
            j(w.studentId, w.payment.id), x(null)
        }
    }), o.default.createElement(Wk, {
        open: f.open,
        mode: f.mode,
        initial: f.initial,
        laExamene: !!f.laExamene,
        sesiuni: n.sessions,
        defaultWeeklyLimit: n.settings.defaultWeeklyLimit,
        defaultCounty: n.settings.defaultCounty,
        locations: iasLocuriDesFolosite(n.settings.locations, n.sessions),
        settingsPachete: n.settings,
        masini: iasMasini(n.settings),
        masinaImplicita: iasMasinaImplicita(n.settings),
        currency: n.settings.currency,
        onClose: () => p({
            open: !1,
            mode: "create",
            initial: null
        }),
        onSave: fe,
        onDelete: he,
        onCereProgram: iasPuneCerereProgram,
        programElevi: iasProgramPornit,
        programLucru: iasProgramSaptamana(n.settings),
        onAdaugaLimba: iasAdaugaLimbaApp
    }), o.default.createElement(IasVrajitor, {
        open: iasVraj,
        setari: n.settings,
        elevi: n.students,
        sesiuni: n.sessions,
        programElevi: iasProgramPornit,
        onClose: () => iasPuneVraj(!1),
        onCreeaza: iasCreeazaElev,
        /* „Prefer formularul întreg": ce ai scris până acum trece în formular. */
        onFormular: I => { iasPuneVraj(!1), p({ open: !0, mode: "create", initial: I }) },
        onAdaugaLimba: iasAdaugaLimbaApp,
        onAdaugaTaxa: iasAdaugaTaxaApp,
        onNotifica: I => v(I),
        onBunVenitTrimis: Re,
        onCereProgram: iasPuneCerereProgram,
        onDeschide: I => { iasPuneVraj(!1), m(I) },
        poateInca: !(Ct.maxElevi && n.students.filter(x => !x.withdrawn).length >= Ct.maxElevi)
    }), iasScolId && n.students.find(x => x.id === iasScolId) ? o.default.createElement(IasScolarizareDialog, {
        key: iasScolId,
        elev: n.students.find(x => x.id === iasScolId),
        setari: n.settings,
        onClose: () => iasPuneScolId(null),
        onSalveaza: I => iasSalveazaScolarizare(iasScolId, I),
        onAdaugaTaxa: iasAdaugaTaxaApp
    }) : null, o.default.createElement(Gk, {
        open: h && cu(Ct, "raport"),
        data: n,
        onClose: () => y(!1)
    }), o.default.createElement(v3, {
        open: $ && Ct.rol === "proprietar",
        data: n,
        onClose: () => G(!1),
        onSalveaza: Oe,
        onPublicat: $e,
        showToast: Y
    }), !Ct.ecranCod && o.default.createElement(o.default.Fragment, null, o.default.createElement(d3, {
        open: N === "intro",
        onClose: q,
        onNoutati: () => {
            z(), de()
        }
    }), o.default.createElement(c3, {
        open: N === "noutati",
        dela: W,
        onClose: q,
        proprietar: Ct.rol === "proprietar"
    })), o.default.createElement(Nk, {
        prompt: g,
        onClose: () => v(null)
    }), iasProgramPornit ? o.default.createElement(IasCereProgram, {
        elev: iasCerereProgram,
        setari: n.settings,
        onClose: () => iasPuneCerereProgram(null),
        onNumar: iasNr => ce(te => ({ ...te, settings: { ...te.settings, telefonulTau: iasNr } }))
    }) : null, iasProgramPornit ? o.default.createElement(IasProgramPrimit, {
        /* Așteaptă să se încarce datele și să se închidă ce e deschis — fișa
           elevului mai ales: altfel, la salvarea ei, programul primit s-ar pierde. */
        raspuns: !t && !f.open && !Ct.ecranCod && N !== "intro" && N !== "noutati" ? iasProgramVenit : null,
        elevi: n.students,
        onClose: () => iasPuneProgramVenit(null),
        onPastreaza: (iasEl, iasNou, iasFoloseste) => {
            if (B.current) {
                Y("Acces expirat. Cere prelungirea ca s\u0103 po\u021Bi modifica.", "error"), iasPuneProgramVenit(null);
                return
            }
            ce(te => ({ ...te, students: te.students.map(iasS => iasS.id !== iasEl.id ? iasS
                : iasFoloseste ? iasFolosesteProgram({ ...iasS, programElev: iasNou }) : { ...iasS, programElev: iasNou }) }));
            Y(iasFoloseste ? `Program folosit \xEEn plan: ${iasEl.name}.` : `Program p\u0103strat pe fi\u0219\u0103: ${iasEl.name}.`);
            iasPuneProgramVenit(null)
        }
    }) : null, o.default.createElement(kk, {
        toast: s
    }))
}
var oS = y3;
if (typeof window < "u" && !window.storage) {
    let n = e => `ias:${e}`;
    window.storage = {
        async get(e) {
            let t = window.localStorage.getItem(n(e));
            if (t === null) throw new Error("not found");
            return {
                key: e,
                value: t,
                shared: !1
            }
        },
        async set(e, t) {
            return window.localStorage.setItem(n(e), t), {
                key: e,
                value: t,
                shared: !1
            }
        },
        async delete(e) {
            return window.localStorage.removeItem(n(e)), {
                key: e,
                deleted: !0,
                shared: !1
            }
        },
        async list(e = "") {
            let t = [];
            for (let a = 0; a < window.localStorage.length; a++) {
                let r = window.localStorage.key(a);
                if (r && r.startsWith("ias:")) {
                    let i = r.slice(4);
                    i.startsWith(e) && t.push(i)
                }
            }
            return {
                keys: t,
                prefix: e,
                shared: !1
            }
        }
    }
}(0, uS.createRoot)(document.getElementById("root")).render(lS.default.createElement(oS, null));
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2021 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/banknote.js:
lucide-react/dist/esm/icons/cake.js:
lucide-react/dist/esm/icons/calendar-days.js:
lucide-react/dist/esm/icons/car.js:
lucide-react/dist/esm/icons/chevron-left.js:
lucide-react/dist/esm/icons/chevron-right.js:
lucide-react/dist/esm/icons/copy.js:
lucide-react/dist/esm/icons/download.js:
lucide-react/dist/esm/icons/flag.js:
lucide-react/dist/esm/icons/graduation-cap.js:
lucide-react/dist/esm/icons/home.js:
lucide-react/dist/esm/icons/map-pin.js:
lucide-react/dist/esm/icons/message-circle.js:
lucide-react/dist/esm/icons/moon.js:
lucide-react/dist/esm/icons/pencil.js:
lucide-react/dist/esm/icons/phone.js:
lucide-react/dist/esm/icons/plus.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/send.js:
lucide-react/dist/esm/icons/settings.js:
lucide-react/dist/esm/icons/smartphone.js:
lucide-react/dist/esm/icons/sun.js:
lucide-react/dist/esm/icons/sunrise.js:
lucide-react/dist/esm/icons/sunset.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/icons/triangle-alert.js:
lucide-react/dist/esm/icons/upload.js:
lucide-react/dist/esm/icons/users.js:
lucide-react/dist/esm/icons/wallet.js:
lucide-react/dist/esm/icons/wand-sparkles.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.383.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/