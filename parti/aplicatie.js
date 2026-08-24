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

function v0(n, e) {
    return !e || !n ? [] : n.filter(t => t.examDate === e && ha[t.examPeriod]).map(t => ({
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

function b0(n, e) {
    return !e || !n || !n.blocks ? [] : n.blocks.filter(t => t.date === e).map(t => t.allDay ? {
        ...t,
        start: 0,
        end: 1440
    } : {
        ...t,
        start: Number(t.startMin) || 0,
        end: Number(t.endMin) || 0
    })
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

function Tf(n) {
    let e = [],
        t = Fa(n),
        a = kw(n);
    for (let r = n.startMin; r + t <= n.endMin; r += a) e.push(r);
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

function kf(n, e) {
    return Math.max(0, bo(n) - Af(e, n.id))
}
var Nf = 3,
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

function UA(n, e) {
    return !n || !n.adeverintaDin ? 0 : e.filter(t => t.studentId === n.id && t.status === "completed" && t.date >= n.adeverintaDin).length
}
/* Elevul plecat o perioadă: vacanță, deplasare, orice. Ține două date, ambele
   inclusiv. În ziua în care se întoarce e din nou disponibil. */
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

var Pf = n => !!n && !n.withdrawn && n.examResult !== "promovat" && !ho(n),
    RA = 10,
    Sf = (n, e) => Math.round((Ue(e).getTime() - Ue(n).getTime()) / 864e5),
    Mf = (n, e) => {
        if (!n || !n.examDate) return !1;
        let t = Sf(e, n.examDate);
        return t >= 1 && t <= 5
    };

function GA(n, e, t) {
    let a = kf(n, e);
    if (a <= 0) return 0;
    let r = Math.min(Nf, bo(n));
    return n.examDate ? t >= n.examDate ? 0 : Mf(n, t) ? a : Math.max(0, a - r) : Math.max(0, a - r)
}

function VA(n, e, t, a) {
    if (!n) return null;
    let r = bo(n),
        i = e.filter(u => u.id !== a && u.studentId === n.id && u.status !== "cancelled").length,
        s = r - i,
        l = Math.min(Nf, r);
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
    let a = {};
    t.rateTypes.forEach(p => {
        a[p.id] = Number(p.price) || 0
    });
    let r = e.filter(p => p.studentId === n.id && p.status !== "cancelled" && !p.otherInstructor && p.type !== "included").sort((p, c) => (p.date + Se(p.startMin)).localeCompare(c.date + Se(c.startMin))),
        i = zw(n, t),
        s = Math.min(i, r.length),
        l = r.slice(s).reduce((p, c) => p + (a[c.type] || 0), 0),
        u = i - s,
        d = Math.max(0, (Number(n.extraHours) || 0) - r.length),
        f = Math.max(0, d - u);
    return l + f * (a.extra || 0) + _f(n, t)
}

/* Mașinile școlii. Fiecare are un nume (de obicei numărul de înmatriculare),
   cutia și, dacă vrei, combustibilul. Elevul se leagă de o mașină, iar planul
   îi așază pe cei cu aceeași mașină unul după altul. */
function iasMasini(setari) {
    return (setari && setari.masini) || [];
}
function iasMasina(setari, id) {
    return iasMasini(setari).filter(function (m) { return m.id === id })[0] || null;
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
            let i = r.target.value.replace(/[^0-9]/g, "").slice(-1);
            a(i), i !== "" && e(Number(i))
        },
        onBlur: () => {
            t === "" && (a("0"), e(0))
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

function jA(n, e, t) {
    let a = {};
    t.rateTypes.forEach(u => {
        a[u.id] = Number(u.price) || 0
    });
    let r = e.filter(u => u.studentId === n.id && u.status !== "cancelled" && !u.otherInstructor && u.type !== "included").sort((u, d) => (u.date + Se(u.startMin)).localeCompare(d.date + Se(d.startMin))),
        i = zw(n, t),
        s = Math.max(0, M0(n) - _f(n, t)),
        l = {};
    return r.forEach((u, d) => {
        if (d < i) {
            l[u.id] = "package";
            return
        }
        let f = a[u.type] || 0;
        s >= f ? (l[u.id] = "paid", s -= f) : s > 0 ? (l[u.id] = "partial", s = 0) : l[u.id] = "due"
    }), l
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

function XA(n, e) {
    return JSON.stringify({
        kind: Rw,
        schemaVersion: f0,
        appVersion: ri,
        exportedAt: Yn(),
        student: n,
        sessions: e.filter(t => t.studentId === n.id)
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

function vw(n, e, t, a) {
    let r = {
            ...sr.employer,
            ...a.employer || {}
        },
        i = {
            base: Number(r.baseRate) || 0,
            overtime: Number(r.overtimeRate) || 0,
            englishBase: Number(r.englishBaseRate) || 0,
            englishOvertime: Number(r.englishOvertimeRate) || 0
        },
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
                b = !!(_ && _.english);
            v += i[b ? y ? "englishOvertime" : "englishBase" : y ? "overtime" : "base"]
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
        f = {
            base: Number(a.baseRate) || 0,
            overtime: Number(a.overtimeRate) || 0,
            englishBase: Number(a.englishBaseRate) || 0,
            englishOvertime: Number(a.englishOvertimeRate) || 0
        },
        p = {
            base: 0,
            overtime: 0,
            englishBase: 0,
            englishOvertime: 0
        },
        c = 0;
    return r.forEach((m, g) => {
        let v = g >= d,
            w = m.english ? v ? "englishOvertime" : "englishBase" : v ? "overtime" : "base";
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

function Xw(n) {
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
    return null
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

function ik(n, e) {
    let {
        salut: t,
        cand: a
    } = _0(n);
    return (e && e.textBunVenit || p0).replace(/\{salut\}/g, t).replace(/\{prenume\}/g, Ff(n)).replace(/\{eu\}/g, e && e.numeleTau || "").replace(/\{scoala\}/g, e && e.numeScoala || "\u0219coala noastr\u0103").replace(/\{disponibil\}/g, a.replace(/^când (ești )?/, "") || "disponibil")
}

function yw(n, e, t, a, r) {
    let i = Ff(e),
        {
            salut: s,
            cand: l
        } = _0(e),
        u = `${Se(t.startMin)}\u2013${Se(t.startMin+(Number(t.duration)||si))}`,
        d = $w(xo(r, t.location), t.location),
        f = t.location ? `
Ne vedem la: *${t.location}*${d?`
${d}`:""}` : "",
        p = " Te rog s\u0103 \xEEmi confirmi \xEEn urm\u0103toarea or\u0103, ca s\u0103 pot elibera locul dac\u0103 nu po\u021Bi ajunge.";
    return n === "created" ? `${s}, ${i}! \u021Ai-am programat \u0219edin\u021Ba de conducere ${fo(t.date)}, ora ${u}.${f}
${p.trim()} Mul\u021Bumesc!` : n === "rescheduled" ? `${s}, ${i}! \u0218edin\u021Ba ta de conducere a fost mutat\u0103 de pe ${fo(a.date)}, ora ${Se(a.startMin)}, pe ${fo(t.date)}, ora ${u}.${f}
${p.trim()} Mul\u021Bumesc!` : n === "cancelled" ? `${s}, ${i}! Am anulat \u0219edin\u021Ba de conducere din ${fo(t.date)}, ora ${Se(t.startMin)}, la cererea ta. Scrie-mi ${l} ca s\u0103 g\u0103sim alt\u0103 or\u0103. Mul\u021Bumesc!` : n === "location" ? `${s}, ${i}! \u0218edin\u021Ba de ${fo(t.date)}, ora ${u}, r\u0103m\xE2ne la fel \u2014 se schimb\u0103 doar locul de \xEEnt\xE2lnire.${f}
${p.trim()} Mul\u021Bumesc!` : ""
}

function sk(n, e, t) {
    let a = new Date,
        r = ft(a),
        i = a.getHours() * 60 + a.getMinutes(),
        s = Ue(t || r);
    for (let l = 0; l < 60; l++) {
        let u = ft(s);
        if (u >= r && e.workDays.includes(s.getDay())) {
            for (let d of Tf(e))
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

function ok(n, e) {
    return n.students.map(t => ({
        s: t,
        free: GA(t, n.sessions, e)
    })).filter(({
        s: t,
        free: a
    }) => a > 0 && Pf(t) && Qw(t, e) && !Nw(n.sessions, t.id, e, null) && Pw(n.sessions, t.id, e, null) < (Number(t.weeklyLimit) || n.settings.defaultWeeklyLimit)).sort((t, a) => {
        let r = t.s.examDate ? Sf(e, t.s.examDate) : 9999,
            i = a.s.examDate ? Sf(e, a.s.examDate) : 9999,
            s = Mf(t.s, e) ? 0 : 1,
            l = Mf(a.s, e) ? 0 : 1;
        return s !== l ? s - l : r !== i ? r - i : a.free - t.free
    }).map(t => t.s)
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
    let t = Ue(e),
        a = n.availDays;
    return !(Array.isArray(a) && a.length && !a.includes(t.getDay()) || n.availParity === "even" && t.getDate() % 2 !== 0 || n.availParity === "odd" && t.getDate() % 2 !== 1)
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
        g = (C, W) => Math.abs(Math.round((Ue(C).getTime() - Ue(W).getTime()) / 864e5)),
        v = (C, W) => {
            let X = Number(C.minGapDays) || 0;
            return X < 2 ? !0 : !(c[C.id] || []).some(R => g(R, W) < X)
        };

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
        A = (C, W, X) => C.window && (C.window.stated || X) ? G(C, W) : !0;

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
                let de = Tf(t),
                    ge = v0(t.examStudents, z),
                    ye = b0(t, z);
                for (let Ne of de) {
                    if (z === B && Ne < $ || !x(z, Ne) || y0(ge, Ne, s) || bf(ye, Ne, s)) continue;
                    let ce = null,
                        ze = t.grupare || "fara",
                        re = ze !== "fara" && m[z] || null,
                        se = fe => {
                            for (let he of i) {
                                // elevul plecat o perioadă nu intră în plan cât lipsește
                                if (l[he.id] <= 0 || f[`${he.id}_${z}`] || iasLipseste(he, z) || !Qw(he, z) || !v(he, z)) continue;
                                if (fe) {
                                    if (ze === "harta") {
                                        let T = QA(re, he);
                                        if (T == null || T > Yw) continue
                                    } else if (ze === "masina") {
                                        // aceeași mașină la rând, ca să n-o schimbi între ședințe
                                        if ((he.masina || "") !== re) continue
                                    } else if ((he.area || "") !== re) continue
                                }
                                if (C0(he, z, Ne, s)) continue;
                                let H = he.includeRezerva ? 0 : Math.min(Nf, Number(he.remaining) || 0);
                                if (l[he.id] <= H) {
                                    if (!he.examDate) continue;
                                    let T = Sf(z, he.examDate);
                                    if (T < 1 || T > 5) continue
                                } else if (he.examDate && z >= he.examDate) continue;
                                if (!((p[`${he.id}_${ne}`] || 0) >= u[he.id]) && A(he, Ne, C)) return he
                            }
                            return null
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
    if (O(!0, 0, S), O(!1, 0, S), !M) {
        let C = S;
        for (; i.some(W => l[W.id] > 0) && C < r;) {
            let W = k.length,
                X = Math.min(r, C + 8);
            if (O(!1, C, X), k.length === W) break;
            C = X
        }
    }
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

function Lf({
    student: n,
    size: e = 14
}) {
    if (!BA(n)) return null;
    let t = vu(n.birthDate);
    return o.default.createElement("span", {
        className: "shrink-0 inline-flex items-center",
        title: t != null ? `Azi \xEEmpline\u0219te ${t} ani` : "Azi e ziua lui"
    }, o.default.createElement(au, {
        size: e,
        style: {
            color: "var(--accent)"
        }
    }))
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
            x.position.set(4.6 * M, 1.85 * Math.pow(M, .75), 4.2 * M), x.lookAt(-.5 * (M - 1), .82 * Math.pow(M, .55), 0), m = new Qe({
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
            Ee.rotation.z = -Math.PI / 2, ae.rotation.z = Math.PI / 2, r.current = {
                setPhase: ke => {
                    let Ie = hw[ke] || hw.day;
                    S.color.setHex(Ie.hemiSky), S.groundColor.setHex(Ie.hemiGround), S.intensity = Ie.hemiI, k.color.setHex(Ie.dir), k.intensity = Ie.dirI, E.intensity = ke === "night" ? .28 : .5, B.intensity = 0, re.emissiveIntensity = Ie.head, se.emissiveIntensity = .2 + Ie.head * .5, fe.emissiveIntensity = Ie.tail, H.emissiveIntensity = Ie.glow;
                    let Lt = Math.min(1, Ie.spot / 1.7);
                    Ee.material.opacity = Lt * .9, ae.material.opacity = Lt * .3, G.color.setHex(Ie.road), g.fog.color.setHex(Ie.fog);
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
                    we.position.y = Math.sin(Ie * 8.5) * .012, we.position.z = Math.sin(Ie * .7) * .09, we.rotation.z = Math.sin(Ie * 3.1) * .011, we.rotation.y = Math.sin(Ie * .9) * .02, U.position.z = we.position.z, m.render(g, x)
                };
            hn();
            let tt = () => {
                let ke = f.clientWidth,
                    Ie = f.clientHeight;
                !ke || !Ie || (x.aspect = ke / Ie, x.updateProjectionMatrix(), m.setSize(ke, Ie))
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
    }, s === "night" && mw.map((p, c) => o.default.createElement("span", {
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
    })), s === "night" && o.default.createElement(zi, {
        size: 26,
        color: "#dbe6f5",
        style: {
            position: "absolute",
            top: 16,
            right: 24,
            filter: "drop-shadow(0 0 10px rgba(219,230,245,0.8))"
        }
    }), s === "day" && o.default.createElement(o.default.Fragment, null, o.default.createElement("span", {
        style: {
            position: "absolute",
            width: 44,
            height: 44,
            top: 12,
            right: 22,
            borderRadius: 99,
            background: "#fff0a8",
            boxShadow: "0 0 44px rgba(255,240,168,0.95)"
        }
    }), o.default.createElement("span", {
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
    })), (s === "dawn" || s === "dusk") && o.default.createElement("span", {
        style: {
            position: "absolute",
            width: 40,
            height: 40,
            right: 28,
            bottom: 8,
            borderRadius: 99,
            background: s === "dawn" ? "#ffd0a1" : "#fb923c",
            boxShadow: "0 0 44px rgba(251,146,60,0.9)"
        }
    }), o.default.createElement("div", {
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
    }), " ", fn.expansion), o.default.createElement("button", {
        onClick: f,
        className: "flex items-center gap-1 rounded-full px-2 py-1 shrink-0",
        style: {
            fontSize: 10,
            fontWeight: 700,
            background: "rgba(3,7,18,0.4)",
            border: "1px solid rgba(255,255,255,0.26)",
            color: "#fff"
        }
    }, o.default.createElement(u, {
        size: 12
    }), r ? l.label : `${d} \xB7 ${l.label}`)), o.default.createElement("h1", {
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
function IasMasiniEditor({ masini: lista, onChange: schimba }) {
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
            }, o.default.createElement(cn, { size: 14 }), "Ma\u0219in\u0103 nou\u0103"))
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
        className: "absolute inset-0 bg-slate-900/70 fade-anim",
        onClick: e
    }), o.default.createElement("div", {
        className: "relative w-full max-w-lg bg-white rounded-2xl flex flex-col sheet-anim",
        style: {
            maxHeight: "100%"
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
        onClick: s
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
        onClick: e
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
        onClick: r
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
        onClick: r
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
    let e = go[n] || go.scheduled,
        t = {
            blue: "bg-blue-50 text-blue-700 border-blue-200",
            amber: "bg-amber-50 text-amber-700 border-amber-200",
            emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
            red: "bg-red-50 text-red-700 border-red-200"
        } [e.c];
    return o.default.createElement("span", {
        className: `inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${t}`
    }, e.label)
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

function Jn({
    title: n,
    summary: e,
    children: t,
    defaultOpen: a = !1
}) {
    let [r, i] = (0, o.useState)(a);
    return o.default.createElement("div", {
        className: "mb-3"
    }, o.default.createElement("button", {
        type: "button",
        onClick: () => i(!r),
        className: "w-full flex items-center gap-2 py-1.5"
    }, o.default.createElement("span", {
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
        className: "mt-1"
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
    onGoToCalendar: s
}) {
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
        M = n.students.filter(z => kf(z, n.sessions) === 0 && Pf(z)),
        S = [],
        k = ft(pn(Ue(l), 14));
    n.students.filter(z => !z.withdrawn).forEach(z => {
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
    }), S.sort((z, q) => z.date.localeCompare(q.date));
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
    })), o.default.createElement("p", {
        className: "px-4 pt-3.5 text-xs text-slate-400 capitalize"
    }, K), o.default.createElement("div", {
        className: "grid grid-cols-3 gap-2 px-4 mt-3"
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
    }, "s\u0103pt. asta")), o.default.createElement("div", {
        className: "bg-amber-50 rounded-xl border border-amber-200 px-2 py-3 text-center"
    }, o.default.createElement("div", {
        className: "font-mono-time text-base font-semibold text-amber-700"
    }, g.total.toLocaleString("ro-RO")), o.default.createElement("div", {
        className: "text-xs text-amber-600 mt-0.5"
    }, n.settings.currency, " elevi"))), o.default.createElement("div", {
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
    }, X(z.studentId), z.otherInstructor && o.default.createElement("span", {
        className: "ml-1.5 text-xs font-normal text-violet-600"
    }, "\xB7 ", z.instructorName || "alt instr.")), z.location && o.default.createElement("span", {
        className: "block text-xs text-slate-400 truncate"
    }, z.location))), o.default.createElement(I0, {
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
    })), h > 0 && o.default.createElement("button", {
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
    })), S.map((z, q) => o.default.createElement("button", {
        key: `${z.student.id}_${z.kind}_${q}`,
        onClick: () => i(z.student.id),
        className: "w-full flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-left",
        style: z.due ? {
            borderColor: "var(--violet)"
        } : void 0
    }, o.default.createElement(ni, {
        size: 15,
        className: "shrink-0",
        style: {
            color: z.due ? "var(--violet)" : "var(--muted-2)"
        }
    }), o.default.createElement("span", {
        className: "flex-1 min-w-0"
    }, o.default.createElement("span", {
        className: "block text-sm text-slate-700 truncate"
    }, z.student.name, " \xB7 examen ", z.kind, " ", qe(z.date)), z.due && o.default.createElement("span", {
        className: "block text-xs",
        style: {
            color: "var(--violet)"
        }
    }, "noteaz\u0103 rezultatul \u2014 promovat sau respins")), z.due && o.default.createElement(un, {
        size: 15,
        className: "shrink-0",
        style: {
            color: "var(--violet)"
        }
    }))), ne.map(z => o.default.createElement("button", {
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
    }, z.student.name, " \xB7 \u0219edin\u021Ba ", z.reminder.atSession, " \xB7 ", qe(z.session.date))))), M.length > 0 && o.default.createElement("div", {
        className: "bg-white border border-slate-200 rounded-xl px-3.5 py-2.5"
    }, o.default.createElement("div", {
        className: "text-sm text-slate-700 mb-1.5"
    }, "Toate orele programate sau efectuate:"), o.default.createElement("div", {
        className: "flex flex-wrap gap-1.5"
    }, M.map(z => o.default.createElement("button", {
        key: z.id,
        onClick: () => i(z.id),
        className: "text-xs px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600"
    }, z.name)))))), o.default.createElement("div", {
        className: "px-4 mt-5"
    }, o.default.createElement("div", {
        className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
    }, "Statistici"), o.default.createElement("div", {
        className: "bg-white rounded-xl border border-slate-200 px-4 py-3.5 mb-2"
    }, o.default.createElement("div", {
        className: "flex items-center justify-between mb-2"
    }, o.default.createElement("div", null, o.default.createElement("div", {
        className: "text-sm font-medium text-slate-800"
    }, "Elevi promova\u021Bi"), o.default.createElement("div", {
        className: "text-xs text-slate-400 mt-0.5"
    }, B, " din ", E, " elevi")), o.default.createElement("div", {
        className: "font-mono-time text-2xl font-semibold text-emerald-600"
    }, $, "%")), o.default.createElement(Cf, {
        value: $,
        colorCls: "bg-emerald-500"
    })), o.default.createElement("div", {
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
    }))), o.default.createElement("div", {
        className: "px-4 mt-5"
    }, o.default.createElement("div", {
        className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
    }, "Ac\u021Biuni rapide"), o.default.createElement("div", {
        className: "grid grid-cols-3 gap-2"
    }, o.default.createElement("button", {
        onClick: t,
        className: "flex flex-col items-center gap-1.5 bg-white rounded-xl border border-slate-200 py-3.5 active:bg-slate-50"
    }, o.default.createElement(rr, {
        size: 18,
        className: "text-slate-500"
    }), o.default.createElement("span", {
        className: "text-xs text-slate-600"
    }, "Elev nou")), o.default.createElement("button", {
        onClick: a,
        className: "flex flex-col items-center gap-1.5 bg-white rounded-xl border border-slate-200 py-3.5 active:bg-slate-50"
    }, o.default.createElement(cn, {
        size: 18,
        className: "text-slate-500"
    }), o.default.createElement("span", {
        className: "text-xs text-slate-600"
    }, "\u0218edin\u021B\u0103 nou\u0103")), o.default.createElement("button", {
        onClick: r,
        className: "flex flex-col items-center gap-1.5 bg-white rounded-xl border border-slate-200 py-3.5 active:bg-slate-50"
    }, o.default.createElement(Pa, {
        size: 18,
        className: "text-slate-500"
    }), o.default.createElement("span", {
        className: "text-xs text-slate-600"
    }, "Planificator")))))
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
        onClick: s
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
    let [r, i] = (0, o.useState)(Be()), [s, l] = (0, o.useState)(null), [u, d] = (0, o.useState)(0), [f, p] = (0, o.useState)(null), c = b0(n.settings, r), m = () => {
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
    }), v = Gi(Ue(r)), w = Array.from({
        length: 7
    }, (A, O) => ft(pn(v, O))), x = n.sessions.filter(A => A.date === r && A.status !== "cancelled"), h = Fa(n.settings), y = kw(n.settings), _ = y >= 30 ? y : 60, b = (() => {
        let A = [];
        for (let O = n.settings.startMin; O + h <= n.settings.endMin; O += _) A.push(O);
        return A
    })(), M = Ue(r).getDay(), S = n.settings.workDays.includes(M), k = A => n.students.find(O => O.id === A)?.name || "Elev \u0219ters", E = (0, o.useMemo)(() => ok(n, r), [n, r]), B = -1e9, $ = r >= Be() && r <= ft(pn(new Date, RA)), G = (0, o.useMemo)(() => v0(n.students, r), [n.students, r]);
    return o.default.createElement("div", {
        className: "pb-4"
    }, o.default.createElement("div", {
        className: "flex items-center justify-between px-4 pt-4 pb-3"
    }, o.default.createElement("button", {
        onClick: () => i(ft(pn(Ue(r), -7))),
        className: "p-2 -ml-2 text-slate-400"
    }, o.default.createElement(ei, {
        size: 20
    })), o.default.createElement("div", {
        className: "font-display text-base font-semibold text-slate-900 uppercase tracking-wide"
    }, yo[Ue(r).getMonth()], " ", Ue(r).getFullYear()), o.default.createElement("button", {
        onClick: () => i(ft(pn(Ue(r), 7))),
        className: "p-2 -mr-2 text-slate-400"
    }, o.default.createElement(un, {
        size: 20
    }))), o.default.createElement("div", {
        className: "flex px-3 gap-1.5 mb-4"
    }, w.map(A => {
        let O = Ue(A),
            N = n.sessions.filter(X => X.date === A && X.status !== "cancelled").length,
            C = A === r,
            W = A === Be();
        return o.default.createElement("button", {
            key: A,
            onClick: () => i(A),
            className: `flex-1 flex flex-col items-center py-2 rounded-xl border transition-colors ${C?"bg-slate-900 border-slate-900":"bg-white border-slate-200"}`
        }, o.default.createElement("span", {
            className: `text-xs font-medium uppercase ${C?"text-white":"text-slate-400"}`
        }, xu[O.getDay()]), o.default.createElement("span", {
            className: `text-base font-semibold font-mono-time ${C?"text-white":W?"text-amber-600":"text-slate-800"}`
        }, O.getDate()), o.default.createElement("span", {
            className: `w-1.5 h-1.5 rounded-full mt-1 ${N>0?C?"bg-amber-400":"bg-amber-500":"bg-transparent"}`
        }))
    })), !S && o.default.createElement("div", {
        className: "mx-4 mb-3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500"
    }, "Zi liber\u0103 conform programului t\u0103u de lucru \u2014 po\u021Bi programa oricum dac\u0103 e nevoie."), G.length > 0 && (() => {
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
        }, W.student.name), o.default.createElement("div", {
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
    }, "Salveaz\u0103"))) : o.default.createElement("button", {
        onClick: () => l({
            allDay: !1,
            startMin: n.settings.startMin,
            endMin: Math.min(1440, n.settings.startMin + 180),
            note: ""
        }),
        className: "w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5"
    }, o.default.createElement(Xn, {
        size: 14
    }), "Marcheaz\u0103 indisponibil")), (() => {
        let A = KA(x, n.settings),
            O = x.filter(N => (N.status === "scheduled" || N.status === "pending") && N.location).sort((N, C) => N.startMin - C.startMin)[0];
        return !A && !O ? null : o.default.createElement("div", {
            className: "px-4 mb-3 flex gap-2"
        }, A && o.default.createElement("a", {
            href: A.href,
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
                touchAction: "manipulation"
            },
            className: "flex-1 min-w-0 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5"
        }, o.default.createElement(dn, {
            size: 14,
            style: {
                color: "var(--accent-ink)"
            }
        }), o.default.createElement("span", {
            className: "truncate"
        }, "Traseul zilei \xB7 ", A.opriri)), O && o.default.createElement("a", {
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
        className: "px-4 space-y-1.5"
    }, (B = -1e9, null), b.map(A => {
        let O = y0(G, A, _),
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
            return o.default.createElement("button", {
                key: Y.id,
                onClick: () => e("edit", Y),
                className: "w-full flex items-stretch bg-white rounded-xl border overflow-hidden text-left active:bg-slate-50",
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
            }, k(Y.studentId), Y.auto && o.default.createElement("span", {
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
            }), Y.location)), o.default.createElement("div", {
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
        if (N) return o.default.createElement("div", {
            key: A,
            className: "w-full flex items-center gap-3 px-3.5 py-2 rounded-xl border border-dashed",
            style: {
                borderColor: "var(--line-2)",
                color: "var(--muted)",
                backgroundImage: "repeating-linear-gradient(135deg, var(--track) 0 7px, transparent 7px 14px)"
            }
        }, o.default.createElement("span", {
            className: "font-mono-time text-xs w-12 text-left shrink-0"
        }, Se(A)), o.default.createElement("span", {
            className: "text-xs truncate"
        }, "Indisponibil", N.note ? ` \xB7 ${N.note}` : ""));
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
            className: "w-full flex items-center gap-3 px-3.5 py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 active:border-amber-300 active:text-amber-600"
        }, o.default.createElement("span", {
            className: "font-mono-time text-xs w-12 text-left"
        }, Se(A)), o.default.createElement("span", {
            className: "text-xs"
        }, "Liber"), o.default.createElement(cn, {
            size: 14,
            className: "ml-auto"
        })), $ && ne && E.length > 0 && o.default.createElement("div", {
            className: "flex flex-wrap items-center gap-1.5 pl-4 mt-1"
        }, o.default.createElement("span", {
            className: "text-xs text-slate-400"
        }, K ? "Umple golul:" : "Adaug\u0103 rapid:"), E.filter(Y => !C0(Y, r, A, h)).slice(0, 2).map(Y => o.default.createElement("button", {
            key: Y.id,
            onClick: () => e("create", {
                date: r,
                startMin: A,
                studentId: Y.id
            }),
            className: "text-xs px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700"
        }, "+ ", Y.name))))
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
    ascunsi: iasAscunsi = 0
}) {
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
        className: `${ie} pl-10 pr-10`
    }), o.default.createElement("button", {
        type: "button",
        onClick: () => {
            r(!1), s("")
        },
        "aria-label": "\xCEnchide lista",
        className: "absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-slate-400"
    }, o.default.createElement(ir, {
        size: 16
    }))), o.default.createElement("div", {
        className: "mt-1.5 rounded-xl border border-slate-200 bg-white overflow-y-auto",
        style: {
            maxHeight: 220
        }
    }, d.length === 0 && o.default.createElement("div", {
        className: "px-3.5 py-3 text-sm text-slate-400"
    }, iasAscunsi > 0 && !u
        ? `To\u021Bi elevii disponibili au deja o \u0219edin\u021B\u0103 \xEEn ziua asta.`
        : "Niciun elev nu se potrive\u0219te."), d.map(f => o.default.createElement("button", {
        key: f.id,
        type: "button",
        onClick: () => {
            t(f.id), r(!1), s("")
        },
        className: "w-full flex items-center gap-2 px-3.5 py-2.5 text-left border-b border-slate-100 last:border-0 active:bg-slate-50"
    }, o.default.createElement("span", {
        className: "text-sm text-slate-800 truncate flex-1"
    }, f.name), o.default.createElement(Lf, {
        student: f,
        size: 13
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
            r(!0), s("")
        },
        className: `${ie} text-left flex items-center gap-2`
    }, o.default.createElement(Oi, {
        size: 15,
        className: "text-slate-400 shrink-0"
    }), o.default.createElement("span", {
        className: l ? "text-slate-900 truncate" : "text-slate-400"
    }, l ? l.name : "Alege elevul")), l && o.default.createElement(Lf, {
        student: l
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
    let [d, f] = (0, o.useState)(null), [p, c] = (0, o.useState)(""), [m, g] = (0, o.useState)(Be()), [v, w] = (0, o.useState)(a.settings.startMin), [x, h] = (0, o.useState)("included"), [y, _] = (0, o.useState)("scheduled"), [b, M] = (0, o.useState)(""), [S, k] = (0, o.useState)(""), [E, B] = (0, o.useState)(!1), [$, G] = (0, o.useState)(""), [A, O] = (0, o.useState)(!1), [N, C] = (0, o.useState)(""), [W, X] = (0, o.useState)(!1), [R, K] = (0, o.useState)(null), ne = (0, o.useMemo)(() => {
        if (e !== "edit" || !t || !t.id) return null;
        let L = Be();
        return t.status === "pending" && t.date >= L ? "pending" : (t.status === "scheduled" || t.status === "pending") && t.date < L ? "unmarked" : null
    }, [e, t]), Y = r || ne, J = (0, o.useMemo)(() => {
        if (!Y) return null;
        let L = Be(),
            T = (j, Q) => (j.date + Se(j.startMin)).localeCompare(Q.date + Se(Q.startMin));
        return Y === "pending" ? a.sessions.filter(j => j.status === "pending" && j.date >= L).sort(T) : a.sessions.filter(j => (j.status === "scheduled" || j.status === "pending") && j.date < L).sort(T)
    }, [Y, a.sessions]), z = L => {
        c(L.studentId), g(L.date), w(L.startMin), h(L.type), _(L.status), M(L.notes || ""), k(L.location || ""), B(!!L.otherInstructor), G(L.instructorName || ""), O(!!L.english)
    };
    if ((0, o.useEffect)(() => {
            if (!n) {
                f(null);
                return
            }
            if (C(""), X(!1), K(null), e === "edit" && t) f(t), z(t);
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
                c(L), g(j || Be()), w(Q), h(T ? gw(T, a.sessions) : "included"), _("scheduled"), M(""), k(t?.location || T?.defaultLocation || ""), B(!1), G(""), O(!!(T && T.english))
            }
        }, [n, e, t]), !n) return null;
    let q = e === "edit" ? d || t : null,
        de = q ? q.id : null,
        ge = a.students.find(L => L.id === p),
        ye = Fa(a.settings),
        Ne = Tf(a.settings),
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
            english: A
        }, e, q || t)
    }
    return o.default.createElement(oi, {
        open: n,
        onClose: i,
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
        }, "Salveaz\u0103")))
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
    }))), o.default.createElement("span", {
        className: "block text-xs font-medium text-slate-500 mb-1.5"
    }, "Elev", o.default.createElement("span", {
        className: "text-amber-600"
    }, " *")), o.default.createElement(Uk, {
        /* Elevii care au deja o ședință în ziua aleasă nu mai apar în listă: la
           programare nu te interesează decât cine mai poate veni. Cel deja ales
           rămâne, ca să nu dispară de sub deget când editezi o ședință. */
        elevi: [...a.students].filter(L => L.id === p || (Pf(L) && !iasLipseste(L, m) && !Nw(a.sessions, L.id, m, de))).sort((L, T) => L.name.localeCompare(T.name, "ro")),
        ascunsi: a.students.filter(L => L.id !== p && Pf(L) && (iasLipseste(L, m) || Nw(a.sessions, L.id, m, de))).length,
        value: p,
        onChange: L => {
            c(L);
            let T = a.students.find(j => j.id === L);
            h(T ? gw(T, a.sessions) : "included"), e !== "edit" && (k(T?.defaultLocation || ""), O(!!(T && T.english)))
        }
    }), o.default.createElement(xe, {
        label: "Dat\u0103",
        required: !0
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: m,
        onChange: L => g(L.target.value)
    })), o.default.createElement(xe, {
        label: "Ora de \xEEnceput",
        required: !0
    }, o.default.createElement("select", {
        className: ie,
        value: v,
        onChange: L => w(Number(L.target.value))
    }, Ne.map(L => {
        let T = !E && L !== v && ze(L);
        return o.default.createElement("option", {
            key: L,
            value: L,
            disabled: T
        }, Se(L), " \u2013 ", Se(L + ye), T ? " (ocupat)" : "")
    }))), o.default.createElement(xe, {
        label: "Loca\u021Bie de start"
    }, o.default.createElement("input", {
        className: ie,
        value: S,
        onChange: L => k(L.target.value),
        placeholder: "Punct de \xEEnt\xE2lnire (op\u021Bional)"
    })), o.default.createElement(nS, {
        locations: a.settings.locations,
        value: S,
        onPick: k
    }), S.trim() && o.default.createElement("a", {
        href: wu(xo(a.settings, S), S),
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
            touchAction: "manipulation"
        },
        className: "w-full -mt-2 mb-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium flex items-center justify-center gap-1.5"
    }, o.default.createElement(dn, {
        size: 14
    }), "Deschide loca\u021Bia"), o.default.createElement(xe, {
        label: "Tip or\u0103"
    }, o.default.createElement("select", {
        className: ie,
        value: x,
        onChange: L => h(L.target.value)
    }, a.settings.rateTypes.map(L => o.default.createElement("option", {
        key: L.id,
        value: L.id
    }, L.name, " \xB7 ", L.id === "included" ? "achitat prin \u0219colarizare" : `${L.price} ${a.settings.currency}`)))), o.default.createElement(xe, {
        label: "Limba \u0219edin\u021Bei"
    }, o.default.createElement("select", {
        className: ie,
        value: A ? "en" : "ro",
        onChange: L => O(L.target.value === "en")
    }, o.default.createElement("option", {
        value: "ro"
    }, "Rom\xE2n\u0103"), o.default.createElement("option", {
        value: "en"
    }, "Englez\u0103"))), A && o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3.5"
    }, "La salariu se aplic\u0103 tariful pentru \u0219edin\u021Be \xEEn englez\u0103."), o.default.createElement(xe, {
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
        label: "Status"
    }, o.default.createElement("select", {
        className: ie,
        value: y,
        onChange: L => _(L.target.value)
    }, o.default.createElement("option", {
        value: "scheduled"
    }, "Programat\u0103"), o.default.createElement("option", {
        value: "pending"
    }, "A\u0219teapt\u0103 confirmare"), e === "edit" && o.default.createElement("option", {
        value: "completed"
    }, "Efectuat\u0103"), e === "edit" && o.default.createElement("option", {
        value: "cancelled"
    }, "Anulat\u0103"))), o.default.createElement(xe, {
        label: "Noti\u021Be"
    }, o.default.createElement("textarea", {
        rows: 2,
        className: ie,
        value: b,
        onChange: L => M(L.target.value),
        placeholder: "Op\u021Bional"
    })), e === "edit" && ge && ge.phone && y !== "cancelled" && o.default.createElement("button", {
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
            english: A,
            duration: q && q.duration
        }),
        className: "w-full py-2.5 mt-1 mb-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-medium flex items-center justify-center gap-1.5"
    }, o.default.createElement(Na, {
        size: 14
    }), "Trimite confirmarea elevului"), e === "edit" && o.default.createElement("button", {
        onClick: () => X(!0),
        className: "w-full text-center text-xs text-red-500 py-2"
    }, "\u0218terge definitiv \u0219edin\u021Ba"), o.default.createElement(Ri, {
        open: W,
        title: "\u0218tergi \u0219edin\u021Ba?",
        message: "Pentru o anulare obi\u0219nuit\u0103, mai bine schimb\u0103 statusul \xEEn \u201EAnulat\u0103\u201D ca s\u0103 p\u0103strezi istoricul. \u0218tergerea definitiv\u0103 elimin\u0103 \u0219edin\u021Ba complet.",
        confirmLabel: "\u0218terge definitiv",
        danger: !0,
        onConfirm: () => {
            X(!1), l(q.id)
        },
        onCancel: () => X(!1)
    }), o.default.createElement(Ri, {
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
            }, w.name))
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
    let [r, i] = (0, o.useState)(""), [s, l] = (0, o.useState)("name"), [u, d] = (0, o.useState)(1), f = pu(r).trim(), p = E => !f || pu(`${E.name||""} ${E.firstName||""} ${E.lastName||""}`).includes(f) || pu(E.group).includes(f) || (E.phone || "").replace(/\s+/g, "").includes(r.replace(/\s+/g, "")), c = (E, B) => E.name.localeCompare(B.name, "ro"), m = E => (B, $) => {
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
        remaining: g(E => kf(E, n.sessions)),
        debt: g(E => Hw(E, n.sessions, n.settings)),
        grupa: w,
        recent: (E, B) => u * (B.enrollDate || "").localeCompare(E.enrollDate || "") || c(E, B),
        area: m(E => E.area),
        place: m(E => E.defaultLocation)
    }, h = x[s] || x.name, y = E => E.examResult === "promovat", _ = n.students.filter(E => p(E) && !E.withdrawn && !y(E) && !ho(E)).sort(h), b = n.students.filter(E => p(E) && !E.withdrawn && ho(E)).sort((E, B) => (E.asteptareDin || "").localeCompare(B.asteptareDin || "") || c(E, B)), M = n.students.filter(E => p(E) && !E.withdrawn && y(E)).sort((E, B) => (B.examDate || "").localeCompare(E.examDate || "") || c(E, B)), S = n.students.filter(E => p(E) && E.withdrawn).sort(c), k = (E, B) => {
        let $ = bo(E),
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
            student: E
        }), o.default.createElement(Bf, {
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
    return o.default.createElement("div", {
        className: "pb-4"
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
        className: "px-4 mb-3"
    }, o.default.createElement("div", {
        className: "relative"
    }, o.default.createElement(Oi, {
        size: 16,
        className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
    }), o.default.createElement("input", {
        value: r,
        onChange: E => i(E.target.value),
        placeholder: "Caut\u0103 nume, telefon sau grup\u0103",
        className: `${ie} pl-10 ${r?"pr-10":""}`
    }), r && o.default.createElement("button", {
        onClick: () => i(""),
        "aria-label": "\u0218terge c\u0103utarea",
        className: "absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-slate-400"
    }, o.default.createElement(ir, {
        size: 16
    }))), o.default.createElement("div", {
        className: "flex gap-1.5 mt-2 overflow-x-auto pb-1"
    }, [
        ["name", "Nume"],
        ["grupa", "Grup\u0103"],
        ["exam", "Ex. practic"],
        ["theory", "Ex. teoretic"],
        ["area", "Zon\u0103"],
        ["place", "Punct start"],
        ["remaining", "Ore r\u0103mase"],
        ["debt", "Datorie"],
        ["recent", "Recent"]
    ].map(([E, B]) => {
        let $ = s === E;
        return o.default.createElement("button", {
            key: E,
            onClick: () => {
                $ ? d(G => -G) : (l(E), d(1))
            },
            "aria-label": $ ? `${B}, atinge din nou ca s\u0103 \xEEntorci ordinea` : B,
            className: `px-3 py-1.5 rounded-full text-xs font-medium border shrink-0 flex items-center gap-1 ${$?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200"}`
        }, B, $ && o.default.createElement(un, {
            size: 12,
            style: {
                transform: u === 1 ? "rotate(90deg)" : "rotate(-90deg)"
            }
        }))
    }))), o.default.createElement("div", {
        className: "px-4"
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
        title: `Promova\u021Bi \xB7 ${M.length}`
    }, o.default.createElement("div", {
        className: "space-y-2"
    }, M.map(E => k(E, !1)))), S.length > 0 && o.default.createElement(Jn, {
        title: `Retra\u0219i \xB7 ${S.length}`
    }, o.default.createElement("div", {
        className: "space-y-2"
    }, S.map(E => k(E, !0))))), o.default.createElement("button", {
        onClick: t,
        className: "fixed bottom-20 right-4 w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
    }, o.default.createElement(cn, {
        size: 26
    })))
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
    onClose: u,
    onSave: d,
    onDelete: f
}) {
    let p = () => ({
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
                    m(S)
                } else m(p())
        }, [n, e, t]), !n) return null;
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
        onClose: u,
        title: e === "edit" ? "Editeaz\u0103 elev" : "Elev nou",
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
        }, "Salveaz\u0103")))
    }, o.default.createElement("div", {
        className: "flex justify-center mb-4"
    }, o.default.createElement(Bf, {
        student: {
            ...c,
            id: t && t.id || "nou"
        },
        county: c.county,
        h: 40
    })), o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Nume de familie",
        required: !0
    }, o.default.createElement("input", {
        className: ie,
        value: c.lastName || "",
        onChange: S => b("lastName", S.target.value),
        placeholder: "Popescu"
    })), o.default.createElement(xe, {
        label: "Prenume",
        required: !0
    }, o.default.createElement("input", {
        className: ie,
        value: c.firstName || "",
        onChange: S => b("firstName", S.target.value),
        placeholder: "Ana Maria"
    }))), o.default.createElement(xe, {
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
    }, "Feminin"))), o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3.5"
    }, '\xCEn mesajele c\u0103tre elev se folose\u0219te doar primul prenume, iar adresarea se acord\u0103: \u201ESalut, Andrei!" la b\u0103ie\u021Bi, \u201EBun\u0103, Ana!" la fete. F\u0103r\u0103 men\u021Biune, mesajul r\u0103m\xE2ne neutru.'), o.default.createElement(xe, {
        label: "Telefon"
    }, o.default.createElement("input", {
        className: ie,
        type: "tel",
        inputMode: "tel",
        autoComplete: "tel",
        value: c.phone,
        onChange: S => b("phone", S.target.value),
        placeholder: "07xx xxx xxx"
    })), o.default.createElement("div", {
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
    }))), (() => {
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
    })(), o.default.createElement("div", {
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
        label: "Jude\u021B (pl\u0103cu\u021B\u0103)"
    }, o.default.createElement("select", {
        className: ie,
        value: c.county || "B",
        onChange: S => b("county", S.target.value)
    }, Aw.map(S => o.default.createElement("option", {
        key: S,
        value: S
    }, S)))))

    , o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Cutie de viteze"
    }, o.default.createElement("select", {
        className: ie,
        value: c.cutie || "",
        onChange: S => b("cutie", S.target.value)
    }, o.default.createElement("option", { value: "" }, "Nespecificat\u0103"),
        o.default.createElement("option", { value: "manuala" }, "Manual\u0103"),
        o.default.createElement("option", { value: "automata" }, "Automat\u0103"))),
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
    o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3.5"
    }, iasLista.length
        ? "Planul \xEEi a\u0219az\u0103 unul dup\u0103 altul pe elevii cu aceea\u0219i ma\u0219in\u0103, ca s\u0103 n-o schimbi de la o \u0219edin\u021B\u0103 la alta."
        : "Ma\u0219inile se adaug\u0103 \xEEn Set\u0103ri \u2192 Ma\u0219inile mele.")

    , o.default.createElement(xe, {
        label: "Zona de domiciliu"
    }, o.default.createElement("input", {
        className: ie,
        value: c.area || "",
        onChange: S => b("area", S.target.value),
        placeholder: "Ex: Tomis Nord, Km 5, centru"
    })), o.default.createElement("div", {
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
        placeholder: "sau lipe\u0219te un link de hart\u0103 / coordonate",
        onChange: S => {
            let k = Xw(S.target.value);
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
    }, "Aproximativ e destul \u2014 strada lui, nu u\u0219a. \xCEl folose\u0219te planificatorul ca s\u0103 pun\u0103 unul dup\u0103 altul elevii care stau aproape, dar numai dac\u0103 \xEEi ceri asta din fila Plan.")), o.default.createElement(xe, {
        label: "Loca\u021Bie de start implicit\u0103"
    }, o.default.createElement("input", {
        className: ie,
        value: c.defaultLocation || "",
        onChange: S => b("defaultLocation", S.target.value),
        placeholder: "Punct de \xEEnt\xE2lnire obi\u0219nuit (op\u021Bional)"
    })), o.default.createElement(nS, {
        locations: i,
        value: c.defaultLocation || "",
        onPick: S => b("defaultLocation", S)
    }), o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3.5"
    }, "Zona te ajut\u0103 s\u0103 grupezi elevii apropia\u021Bi \xEEn aceea\u0219i zi. \xCEn lista de elevi po\u021Bi sorta dup\u0103 oricare dintre cele dou\u0103."), o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Ore incluse"
    }, o.default.createElement("input", {
        type: "number",
        min: "0",
        className: ie,
        value: c.includedHours,
        onChange: S => b("includedHours", S.target.value)
    })), o.default.createElement(xe, {
        label: "Ore suplimentare"
    }, o.default.createElement("input", {
        type: "number",
        min: "0",
        className: ie,
        value: c.extraHours,
        onChange: S => b("extraHours", S.target.value)
    }))), o.default.createElement(xe, {
        label: "Limba \u0219edin\u021Belor"
    }, o.default.createElement("select", {
        className: ie,
        value: c.english ? "en" : "ro",
        onChange: S => b("english", S.target.value === "en")
    }, o.default.createElement("option", {
        value: "ro"
    }, "Rom\xE2n\u0103"), o.default.createElement("option", {
        value: "en"
    }, "Englez\u0103"))), o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3.5"
    }, "Toate \u0219edin\u021Bele lui pornesc \xEEn limba asta. La salariu se aplic\u0103 tarifele corespunz\u0103toare, iar la fiecare \u0219edin\u021B\u0103 po\u021Bi schimba punctual."), (() => {
        let S = ii(s).filter(E => Number(E.hours) > 0);
        if (!S.length) return null;
        let k = S.find(E => E.id === c.pachet);
        return o.default.createElement(o.default.Fragment, null, o.default.createElement(xe, {
            label: "\u0218colarizare"
        }, o.default.createElement("select", {
            className: ie,
            value: c.pachet || "",
            onChange: E => b("pachet", E.target.value)
        }, o.default.createElement("option", {
            value: ""
        }, "Nu acum"), S.map(E => o.default.createElement("option", {
            key: E.id,
            value: E.id
        }, E.name, " \xB7 ", (Number(E.price) || 0).toLocaleString("ro-RO"), " \xB7 ", Number(E.hours), " ", hu(ur(E)))))), o.default.createElement("p", {
            className: "text-xs text-slate-400 -mt-2 mb-3.5"
        }, k ? k.laScoala ? `\xCEi adaug\u0103 ${Number(k.hours)} ${hu(ur(k))} \u0219i trece cei ${(Number(k.price)||0).toLocaleString("ro-RO")} ${l} ca plat\u0103 f\u0103cut\u0103 direct la \u0219coal\u0103 \u2014 nu r\u0103m\xE2ne datorie la tine.` : `\xCEi adaug\u0103 ${Number(k.hours)} ${hu(ur(k))} \u0219i ${(Number(k.price)||0).toLocaleString("ro-RO")} ${l} la datorie. Pl\u0103\u021Bile le treci pe fi\u0219a lui, pe m\u0103sur\u0103 ce le \xEEncasezi.` : "Pachetele se stabilesc \xEEn Finan\u021Be \u2192 Taxe. Po\u021Bi alege \u0219i mai t\xE2rziu, de pe fi\u0219a lui."))
    })(),

    /* Plecat o perioadă: vacanță, deplasare, orice. Bifa deschide intervalul.
       Perioada se dă fie ca dată de întoarcere, fie ca număr de zile — cum îți
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
    ) : null,

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
    }, "Retras"))), o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2 mb-3.5"
    }, "Un elev retras trece la sf\xE2r\u0219itul listei, nu mai apare la programare \u0219i nu mai intr\u0103 \xEEn plan. Datele lui r\u0103m\xE2n neatinse."), o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Data na\u0219terii"
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: c.birthDate || "",
        onChange: S => b("birthDate", S.target.value)
    })), o.default.createElement(xe, {
        label: "Data \xEEnscrierii"
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: c.enrollDate,
        onChange: S => b("enrollDate", S.target.value)
    }))), c.birthDate && (() => {
        let S = vu(c.birthDate);
        if (S == null) return null;
        let k = xf(c.birthDate);
        return o.default.createElement("p", {
            className: "text-xs -mt-2 mb-3.5",
            style: {
                color: k ? "var(--accent-ink)" : "var(--muted-2)"
            }
        }, k ? `Are ${S} ani \u2014 \xEEmpline\u0219te 18 pe ${qe(k)}.` : `Are ${S} ani.`)
    })(), o.default.createElement(xe, {
        label: "Limit\u0103 \u0219edin\u021Be/s\u0103pt."
    }, o.default.createElement("input", {
        type: "number",
        min: "1",
        max: "7",
        className: ie,
        value: c.weeklyLimit,
        onChange: S => b("weeklyLimit", S.target.value)
    })), o.default.createElement(Jn, {
        title: "Disponibilitate",
        summary: c.availFrom !== "" && c.availTo !== "" && c.availFrom != null && c.availTo != null ? `${Se(Number(c.availFrom))}\u2013${Se(Number(c.availTo))}` : "oric\xE2nd"
    }, o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Disponibil de la"
    }, o.default.createElement("select", {
        className: ie,
        value: c.availFrom || "",
        onChange: S => b("availFrom", S.target.value)
    }, o.default.createElement("option", {
        value: ""
    }, "Oric\xE2nd"), mu.map(S => o.default.createElement("option", {
        key: S,
        value: S
    }, Se(S))))), o.default.createElement(xe, {
        label: "P\xE2n\u0103 la"
    }, o.default.createElement("select", {
        className: ie,
        value: c.availTo || "",
        onChange: S => b("availTo", S.target.value)
    }, o.default.createElement("option", {
        value: ""
    }, "Oric\xE2nd"), mu.map(S => o.default.createElement("option", {
        key: S,
        value: S
    }, Se(S)))))), o.default.createElement("div", {
        className: "mb-3"
    }, o.default.createElement("span", {
        className: "block text-xs font-medium text-slate-500 mb-1.5"
    }, "Zile \xEEn care poate veni"), o.default.createElement("div", {
        className: "flex gap-1.5"
    }, po.map(S => {
        let E = (Array.isArray(c.availDays) && c.availDays.length ? c.availDays : po).includes(S);
        return o.default.createElement("button", {
            key: S,
            type: "button",
            onClick: () => {
                let B = Array.isArray(c.availDays) && c.availDays.length ? c.availDays : po.slice(),
                    $ = B.includes(S) ? B.filter(G => G !== S) : [...B, S];
                b("availDays", $.length === po.length ? [] : $)
            },
            className: `flex-1 py-2 rounded-xl text-xs font-medium border ${E?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-400 border-slate-200"}`
        }, xu[S])
    }))), o.default.createElement(xe, {
        label: "Tur\u0103 de lucru"
    }, o.default.createElement("select", {
        className: ie,
        value: c.tura || "",
        onChange: S => b("tura", S.target.value)
    }, o.default.createElement("option", {
        value: ""
    }, "F\u0103r\u0103 tur\u0103 \u2014 program obi\u0219nuit"), Object.entries(Zw).map(([S, k]) => o.default.createElement("option", {
        key: S,
        value: S
    }, k.nume)))), c.tura && o.default.createElement(o.default.Fragment, null, c.tura === "alt" && o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Ore de lucru"
    }, o.default.createElement("input", {
        type: "number",
        min: "1",
        max: "72",
        className: ie,
        value: c.turaLucru || "",
        onChange: S => b("turaLucru", S.target.value)
    })), o.default.createElement(xe, {
        label: "Ore libere"
    }, o.default.createElement("input", {
        type: "number",
        min: "0",
        max: "240",
        className: ie,
        value: c.turaLiber || "",
        onChange: S => b("turaLiber", S.target.value)
    }))), o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "A intrat \xEEn tur\u0103 pe",
        required: !0
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: c.turaData || "",
        onChange: S => b("turaData", S.target.value)
    })), o.default.createElement(xe, {
        label: "La ora"
    }, o.default.createElement("select", {
        className: ie,
        value: c.turaOra == null ? 420 : c.turaOra,
        onChange: S => b("turaOra", Number(S.target.value))
    }, mu.map(S => o.default.createElement("option", {
        key: S,
        value: S
    }, Se(S)))))), o.default.createElement(xe, {
        label: "Odihn\u0103 dup\u0103 tur\u0103 (ore)"
    }, o.default.createElement("input", {
        type: "number",
        min: "0",
        max: "24",
        className: ie,
        value: c.turaOdihna || "",
        onChange: S => b("turaOdihna", S.target.value),
        placeholder: "0"
    })), (() => {
        let S = Jw(c, 3);
        return o.default.createElement("div", {
            className: "rounded-xl px-3.5 py-2.5 mb-3.5",
            style: {
                background: "var(--surface-2)",
                border: "1px solid var(--line)"
            }
        }, o.default.createElement("div", {
            className: "text-xs font-medium text-slate-500 mb-1"
        }, "Urm\u0103toarele ture, dup\u0103 cum ai completat"), S.length === 0 ? o.default.createElement("div", {
            className: "text-xs text-slate-400"
        }, "Completeaz\u0103 ziua \xEEn care a intrat \xEEn tur\u0103.") : S.map((k, E) => o.default.createElement("div", {
            key: E,
            className: "font-mono-time text-xs text-slate-600"
        }, E0(k))), o.default.createElement("div", {
            className: "text-xs text-slate-400 mt-1"
        }, "Dac\u0103 nu seam\u0103n\u0103 cu programul lui, mut\u0103 ziua sau ora de pornire."))
    })()), o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Zile din lun\u0103"
    }, o.default.createElement("select", {
        className: ie,
        value: c.availParity || "all",
        onChange: S => b("availParity", S.target.value)
    }, o.default.createElement("option", {
        value: "all"
    }, "Toate"), o.default.createElement("option", {
        value: "even"
    }, "Doar pare"), o.default.createElement("option", {
        value: "odd"
    }, "Doar impare"))), o.default.createElement(xe, {
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
    }, "O dat\u0103 pe s\u0103pt\u0103m\xE2n\u0103")))), o.default.createElement("p", {
        className: "text-xs text-slate-400 -mt-2"
    }, 'Planificatorul respect\u0103 toate condi\u021Biile de aici. \u201ERitm minim" p\u0103streaz\u0103 distan\u021Ba dintre dou\u0103 \u0219edin\u021Be ale aceluia\u0219i elev.')), o.default.createElement(Jn, {
        title: "Examen teoretic",
        summary: c.theoryExamResult || (c.theoryExamDate ? qe(c.theoryExamDate) : "nesus\u021Binut")
    }, o.default.createElement("div", {
        className: "grid grid-cols-2 gap-3"
    }, o.default.createElement(xe, {
        label: "Data"
    }, o.default.createElement("input", {
        type: "date",
        className: ie,
        value: c.theoryExamDate || "",
        onChange: S => b("theoryExamDate", S.target.value)
    })), o.default.createElement(xe, {
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
    }, "Respins")))), o.default.createElement(Jn, {
        title: "Examen practic",
        summary: c.examResult || (c.examDate ? qe(c.examDate) : "nesus\u021Binut")
    }, o.default.createElement("div", {
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
    }, "Aici treci situa\u021Bia de p\xE2n\u0103 acum, exact cum e \u2014 nimic nu se calculeaz\u0103 automat. Rezultatul unui examen nou se noteaz\u0103 de pe fi\u0219a elevului.")), o.default.createElement(xe, {
        label: "Noti\u021Be"
    }, o.default.createElement("textarea", {
        rows: 2,
        className: ie,
        value: c.notes,
        onChange: S => b("notes", S.target.value),
        placeholder: "Op\u021Bional"
    })), o.default.createElement(Jn, {
        title: "Mementouri",
        summary: (c.reminders || []).length ? `${(c.reminders||[]).length}` : "niciunul"
    }, o.default.createElement("div", {
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
    }), "Memento nou"), o.default.createElement("p", {
        className: "text-xs text-slate-400 mt-1.5"
    }, "Alegi a c\xE2ta \u0219edin\u021B\u0103 a elevului \u0219i scrii mesajul. \xCE\u021Bi apare pe Acas\u0103 \xEEn ziua acelei \u0219edin\u021Be \u0219i r\u0103m\xE2ne p\xE2n\u0103 o marchezi ca efectuat\u0103.")), e === "edit" && o.default.createElement("button", {
        onClick: () => x(!0),
        className: "w-full text-center text-xs text-red-500 py-2"
    }, "\u0218terge elevul"), o.default.createElement(Ri, {
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
    onBunVenitTrimis: w
}) {
    let [x, h] = (0, o.useState)(!1);
    if (!n || !e) return null;
    let y = bo(e),
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
        X = `${_0(e).salut}, ${Ff(e)}! \u0218edin\u021Bele tale de conducere programate:
${N.map(R=>`\u2022 ${fo(R.date)}, ${Se(R.startMin)}\u2013${Se(R.startMin+or(R,a))}${R.location?` \xB7 ${R.location}`:""}`).join(`
`)}${W}
Te rog confirm\u0103. Mul\u021Bumesc!`;
    return o.default.createElement(oi, {
        open: n,
        onClose: r,
        title: e.name
    }, o.default.createElement("div", {
        className: "flex items-center gap-2 mb-4 flex-wrap"
    }, o.default.createElement(Lf, {
        student: e,
        size: 18
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
    }, S === "nou" ? "Elev nou" : "\xCEn curs"), e.phone && o.default.createElement(tS, {
        phone: e.phone
    })), e.examResult === "promovat" && o.default.createElement("div", {
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
    }, "Examen practic promovat", e.examDate ? ` \xB7 ${qe(e.examDate)}` : "", Number(e.examAttempts) > 0 ? ` \xB7 din ${Number(e.examAttempts)} ${Number(e.examAttempts)===1?"sus\u021Binere":"sus\u021Bineri"}` : ""))), ho(e) && (() => {
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
    })(), !ho(e) && e.adeverintaDin && (() => {
        let R = UA(e, t);
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
    })(), e.examDate && e.examDate <= Be() && e.examResult !== "promovat" && o.default.createElement("div", {
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
    }, "Respins"))), o.default.createElement("div", {
        className: "grid grid-cols-3 gap-2 mb-3"
    }, o.default.createElement("div", {
        className: "bg-slate-50 rounded-xl px-3 py-2.5 text-center"
    }, o.default.createElement("div", {
        className: "font-mono-time text-lg font-semibold text-slate-900"
    }, y), o.default.createElement("div", {
        className: "text-xs text-slate-400 mt-0.5"
    }, "total")), o.default.createElement("div", {
        className: "bg-slate-50 rounded-xl px-3 py-2.5 text-center"
    }, o.default.createElement("div", {
        className: "font-mono-time text-lg font-semibold text-slate-900"
    }, _), o.default.createElement("div", {
        className: "text-xs text-slate-400 mt-0.5"
    }, "efectuate")), o.default.createElement("div", {
        className: "bg-amber-50 rounded-xl px-3 py-2.5 text-center"
    }, o.default.createElement("div", {
        className: "font-mono-time text-lg font-semibold text-amber-700"
    }, M), o.default.createElement("div", {
        className: "text-xs text-amber-600 mt-0.5"
    }, "r\u0103mase"))), o.default.createElement("div", {
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
    }, "din care cu al\u021Bi instructori: ", E)), o.default.createElement("div", {
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
    }, "+ \xEEnc\u0103 ", A.length - 3, " pl\u0103\u021Bi \xB7 toate \xEEn Finan\u021Be, pe luni"))), o.default.createElement("div", {
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
    }, e.regNumber || "\u2014")), e.defaultLocation && o.default.createElement("div", {
        className: "col-span-2"
    }, o.default.createElement("div", {
        className: "text-xs text-slate-400 mb-0.5"
    }, "Loca\u021Bie de start implicit\u0103"), o.default.createElement("a", {
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
    }, e.area))), o.default.createElement("div", {
        className: "flex gap-2 mb-2.5"
    }, o.default.createElement("button", {
        onClick: i,
        className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-1.5"
    }, o.default.createElement(ka, {
        size: 14
    }), "Editeaz\u0103"), o.default.createElement("button", {
        onClick: s,
        className: "flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium flex items-center justify-center gap-1.5"
    }, o.default.createElement(cn, {
        size: 14
    }), "\u0218edin\u021B\u0103 nou\u0103")), g && o.default.createElement("button", {
        onClick: () => m(e),
        className: "w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium flex items-center justify-center gap-1.5 mb-2.5"
    }, o.default.createElement(fa, {
        size: 14
    }), "Trimite elevul altui instructor"), e.phone && !e.bunVenitTrimis && o.default.createElement("button", {
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
    }), "Trimite mesajul de bun venit"), e.phone && N.length > 0 && o.default.createElement("button", {
        onClick: () => u({
            name: e.name,
            phone: e.phone,
            title: "Trimite programul",
            message: X
        }),
        className: "w-full py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-medium flex items-center justify-center gap-1.5 mb-5"
    }, o.default.createElement(Na, {
        size: 14
    }), "Trimite programul elevului"), !(e.phone && N.length > 0) && o.default.createElement("div", {
        className: "mb-2.5"
    }), e.notes && e.notes.trim() && o.default.createElement("div", {
        className: "rounded-xl px-3.5 py-3 mb-4",
        style: {
            background: "var(--surface-2)",
            border: "1px solid var(--line)"
        }
    }, o.default.createElement("div", {
        className: "text-xs font-medium text-slate-400 uppercase tracking-wide mb-1"
    }, "Noti\u021Be"), o.default.createElement("div", {
        className: "text-sm text-slate-700",
        style: {
            whiteSpace: "pre-wrap"
        }
    }, e.notes)), o.default.createElement(Jn, {
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
    }, "\xB7 ", R.instructorName || "alt instr."), R.english && o.default.createElement("span", {
        className: "ml-1 text-xs font-normal text-sky-600"
    }, "\xB7 EN")), o.default.createElement("div", {
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
    }, "de plat\u0103")))))), o.default.createElement(Pk, {
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
    let r = Fa(n.settings),
        i = n.students.map(N => ({
            ...N,
            remaining: kf(N, n.sessions)
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
                grupare: w
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
    }, "Implicit")), o.default.createElement("div", {
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
    }, "Include \u0219i \u0219edin\u021Bele rezervate")), o.default.createElement("p", {
        className: "text-xs text-slate-400 px-3.5 -mt-1 mb-1"
    }, "Ultimele ", Nf, " \u0219edin\u021Be ale fiec\u0103rui elev se p\u0103streaz\u0103 pentru preg\u0103tirea de dinaintea examenului. Bifeaz\u0103 dac\u0103 vrei s\u0103 intre \u0219i ele \xEEn plan."), i.map(N => {
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
        }, N.name), o.default.createElement("div", {
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
        summary: `${g === Be() ? "de azi" : qe(g)} \xB7 ${(M.find(N => N.v === c) || {}).l || ""} \xB7 ${w === "fara" ? "f\u0103r\u0103 grupare" : w === "zona" ? "pe zone" : w === "masina" ? "pe ma\u0219ini" : "pe hart\u0103"}`
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
    }, N.l)))), o.default.createElement(xe, {
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
    }), f && o.default.createElement("div", {
        className: "px-4 mt-5"
    }, o.default.createElement("div", {
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
    }, "Renun\u021B\u0103 la propunere")))
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
    let W = [{
            key: "base",
            label: "\xCEn program",
            count: _.rows.base,
            rate: _.rates.base,
            cls: "bg-white border-slate-200 text-slate-700",
            valCls: "text-slate-900"
        }, {
            key: "englishBase",
            label: "\xCEn program \xB7 englez\u0103",
            count: _.rows.englishBase,
            rate: _.rates.englishBase,
            cls: "bg-sky-50 border-sky-200 text-sky-700",
            valCls: "text-sky-700"
        }, {
            key: "overtime",
            label: "Peste program",
            count: _.rows.overtime,
            rate: _.rates.overtime,
            cls: "bg-amber-50 border-amber-200 text-amber-700",
            valCls: "text-amber-700"
        }, {
            key: "englishOvertime",
            label: "Peste program \xB7 englez\u0103",
            count: _.rows.englishOvertime,
            rate: _.rates.englishOvertime,
            cls: "bg-sky-50 border-sky-200 text-sky-700",
            valCls: "text-sky-700"
        }],
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
            label: "Englez\u0103 \xB7 \xEEn program"
        }, o.default.createElement("input", {
            type: "number",
            min: "0",
            className: ie,
            value: p.englishBaseRate,
            onChange: q => c({
                ...p,
                englishBaseRate: q.target.value
            })
        })), o.default.createElement(xe, {
            label: "Englez\u0103 \xB7 peste program"
        }, o.default.createElement("input", {
            type: "number",
            min: "0",
            className: ie,
            value: p.englishOvertimeRate,
            onChange: q => c({
                ...p,
                englishOvertimeRate: q.target.value
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
        }), "Editeaz\u0103 tarife angajator")) : m === "taxe" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("p", {
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
    }, "De la elevi"), o.default.createElement("div", {
        className: "font-mono-time text-xl font-semibold text-white"
    }, y.total.toLocaleString("ro-RO")), o.default.createElement("div", {
        className: "text-xs text-slate-400 mt-0.5"
    }, n.settings.currency, " acumulat")), o.default.createElement("div", {
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
            }, Se(H)))))), o.default.createElement("div", {
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
            }, o.default.createElement("input", {
                type: "number",
                min: "1",
                max: "7",
                className: ie,
                value: J.defaultWeeklyLimit,
                onChange: H => e({
                    defaultWeeklyLimit: Number(H.target.value) || 1
                })
            })), o.default.createElement(xe, {
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
            }, "Revino la textul implicit")) : ne === "locatii" ? o.default.createElement(o.default.Fragment, null, o.default.createElement("div", {
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
                placeholder: "sau lipe\u0219te un link de hart\u0103 / coordonate",
                onChange: H => {
                    let L = Xw(H.target.value);
                    L && (b({
                        ..._,
                        ...L
                    }), H.target.value = "", S(""))
                }
            }), o.default.createElement("p", {
                className: "text-xs text-slate-400 mt-1.5"
            }, "Cel mai exact e s\u0103 iei punctul chiar de la fa\u021Ba locului, o singur\u0103 dat\u0103. Linkurile scurte (maps.app.goo.gl) nu merg \u2014 deschide-l \xEEnt\xE2i \xEEn hart\u0103 \u0219i copiaz\u0103 adresa lung\u0103.")), o.default.createElement("div", {
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
            }), "Loca\u021Bie nou\u0103")) : ne === "masini" ? o.default.createElement(IasMasiniEditor, {
                masini: iasMasini(J),
                onChange: (lista) => e({ masini: lista })
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
    }, se.map(H => {
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
    })), o.default.createElement("p", {
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
    v: "v2.34.44",
    titlu: "Elevi pleca\u021Bi o perioad\u0103",
    puncte: ["Pe fi\u0219a elevului bifezi \u201EIndisponibil o perioad\u0103\u201D \u0219i dai fie ziua \xEEntoarcerii, fie c\xE2te zile lipse\u0219te.", "C\xE2t lipse\u0219te nu apare la programare \u0219i nici \xEEn plan, iar \xEEn ziua \xEEn care revine intr\u0103 singur \xEEnapoi \xEEn liste.", "\xCEn lista de elevi are un semn cu ziua \xEEn care se \xEEntoarce."]
}, {
    v: "v2.34.43",
    titlu: "Pornire lini\u0219tit\u0103 dup\u0103 actualizare",
    puncte: ["Dup\u0103 o versiune nou\u0103, aplica\u021Bia se reînc\u0103rca singur\u0103 \u0219i p\u0103rea c\u0103 se \xEEnchide \u0219i se redeschide. Acum pornirea e dintr-o bucat\u0103.", "Mesajul \u201ECe e nou\u201D nu mai arat\u0103 din gre\u0219eal\u0103 schimb\u0103ri vechi."]
}, {
    v: "v2.34.41",
    titlu: "Scrisul din c\xE2mpuri, vizibil pe noapte",
    puncte: ["Num\u0103rul de \u0219edin\u021Be pe s\u0103pt\u0103m\xE2n\u0103 din Plan \u2014 \u0219i orice alt c\xE2mp scris ca text \u2014 r\u0103m\xE2nea negru pe tema \xEEntunecat\u0103. Acum toate c\xE2mpurile iau culoarea temei."]
}, {
    v: "v2.34.40",
    titlu: "Programare mai curat\u0103",
    puncte: ["La programarea unei \u0219edin\u021Be, elevii care au deja una \xEEn ziua aceea nu mai apar \xEEn list\u0103 \u2014 iar sub list\u0103 scrie c\xE2\u021Bi au r\u0103mas deoparte \u0219i de ce."]
}, {
    v: "v2.34.39",
    titlu: "Ma\u0219inile tale \u0219i banii \u0219colii",
    puncte: ["\xCE\u021Bi treci ma\u0219inile \xEEn Set\u0103ri \u2192 Ma\u0219inile mele, cu num\u0103rul \u0219i cutia fiec\u0103reia.", "Pe fi\u0219a elevului alegi cutia \u0219i ma\u0219ina lui, iar planul \xEEi a\u0219az\u0103 grupat pe cei cu aceea\u0219i ma\u0219in\u0103, ca s-o schimbi c\xE2t mai rar.", "Banii du\u0219i la \u0219coal\u0103 se deschid la atingere: vezi din ce \xEEncas\u0103ri s-au adunat \u0219i ce ai dus p\xE2n\u0103 acum.", "La elevul achitat la zi, butonul devine \u201EPl\u0103te\u0219te \xEEn avans\u201D.", "Op\u021Biunile din Plan sunt str\xE2nse sub un singur titlu.", "Ma\u0219inile din antet sunt modele adev\u0103rate, cu paletar de culori."]
}, {
    v: "v2.34.27",
    titlu: "Garajul",
    puncte: ["Alegi din Set\u0103ri vehiculul din capul paginii: hatchback, sedan, break, ma\u0219inu\u021B\u0103 de 16 ani, motociclet\u0103 cu sau f\u0103r\u0103 ata\u0219, cap tractor sau autobuz.", "Fiec\u0103ruia i se poate prinde remorca potrivit\u0103 categoriei lui, iar caseta \u0218COALA r\u0103m\xE2ne pe oricare."]
}, {
    v: "v2.32.27",
    titlu: "Ma\u0219ina, mai aproape de realitate",
    puncte: ["Tabla, geamurile \u0219i cromul oglindesc acum lumina din jur, iar vopseaua are strat de lac \u2014 de aici vine diferen\u021Ba fa\u021B\u0103 de o suprafa\u021B\u0103 mat\u0103."]
}, {
    v: "v2.31.23",
    titlu: "Ma\u0219ina \u0219i ferestrele",
    puncte: ["Ma\u0219ina din capul paginii e desenat\u0103 din nou, mai aproape de un Clio: faruri cu semn\u0103tura \xEEn C, stopuri asortate \u0219i lumini care se a\u0219az\u0103 pe asfalt noaptea.", "C\xE2t timp e deschis\u0103 o fereastr\u0103, taburile nu mai schimb\u0103 fila \u2014 fereastra clipe\u0219te ro\u0219u ca s\u0103 \u0219tii ce ai de \xEEnchis.", "Licen\u021Bele se deschid ca fereastr\u0103, la fel ca restul."]
}, {
    v: "v2.33.27",
    titlu: "Mai mult\u0103 lumin\u0103 \u0219i un calcul nou",
    puncte: ["Ma\u0219ina din antet are acum vopsea metalizat\u0103 care oglinde\u0219te cerul \u0219i drumul, cu redare pe curb\u0103 de film.", "\xCEn Plan vezi \u0219i c\xE2t apuci s\u0103 faci p\xE2n\u0103 \xEEn ultima zi a lunii, cu banii care ies din asta.", "Fereastra deschis\u0103 nu mai pare c\u0103 se \xEEnchide \u0219i se redeschide c\xE2nd atingi o fil\u0103."]
}, {
    v: "v2.32.26",
    titlu: "Ma\u0219ina din antet",
    puncte: ["Ma\u0219ina e desenat\u0103 din nou, cu propor\u021Biile unui hatchback real: arcade peste ro\u021Bi, plafon plutitor, gril\u0103 cu romb \u0219i l\u0103mpi verticale \xEEn spate.", "Caseta de plafon e la cotele legale \u2014 420 \xD7 380 \xD7 120 mm, cu inscrip\u021Bia de 300 \xD7 90 mm \u2014 \u0219i se aprinde noaptea.", "Noaptea, farurile \xEE\u0219i a\u0219tern lumina pe asfalt."]
}, {
    v: "v2.31.25",
    titlu: "Ferestre",
    puncte: ["C\xE2t timp e deschis\u0103 o fereastr\u0103, filele nu se mai schimb\u0103: fereastra clipe\u0219te ro\u0219u \u0219i \xEE\u021Bi spune s\u0103 o \xEEnchizi.", "Licen\u021Bele se deschid ca fereastr\u0103, ca restul."]
}, {
    v: "v2.31.22",
    titlu: "Programare mai u\u0219oar\u0103",
    puncte: ["Elevul se alege c\u0103ut\xE2ndu-l dup\u0103 nume, grup\u0103 sau telefon.", "Po\u021Bi trimite confirmarea unei \u0219edin\u021Be \u0219i mai t\xE2rziu, direct din fi\u0219a ei.", "\xCEn Plan schimbi num\u0103rul de \u0219edin\u021Be pe s\u0103pt\u0103m\xE2n\u0103 pentru to\u021Bi elevii deodat\u0103.", "Locul de \xEEnt\xE2lnire are din nou link de hart\u0103 \xEEn mesaje, chiar dac\u0103 nu i-ai salvat punctul."]
}, {
    v: "v2.30.22",
    titlu: "\u0218colarizare, bun venit \u0219i zile de na\u0219tere",
    puncte: ["La ad\u0103ugarea unui elev alegi pachetul de \u0219colarizare: \xEEi pune singur \u0219edin\u021Bele incluse \u0219i, dup\u0103 caz, plata sau datoria.", "Buton de mesaj de bun venit pe fi\u0219a fiec\u0103rui elev nou. Numele t\u0103u, \u0219coala \u0219i textul se scriu o dat\u0103 \xEEn Set\u0103ri.", "\xCEn ziua lui de na\u0219tere, elevul are un tort l\xE2ng\u0103 nume.", "Noti\u021Bele elevului apar pe fi\u0219a lui.", "\xCEn Plan alegi data de la care \xEEncepe planul \u0219i po\u021Bi \u0219terge dintr-o dat\u0103 propunerile pe care elevii nu le-au confirmat.", "C\xE2nd raportezi o problem\u0103, spui \u0219i \xEEn ce parte a aplica\u021Biei ai \xEEnt\xE2lnit-o."]
}, {
    v: "v2.29.22",
    titlu: "Data na\u0219terii",
    puncte: ["Fi\u0219a elevului are data na\u0219terii \u0219i \xEE\u021Bi arat\u0103 v\xE2rsta.", "C\u0103utarea g\u0103se\u0219te numele \u0219i f\u0103r\u0103 diacritice."]
}, {
    v: "v2.28.19",
    titlu: "Locuri de \xEEnt\xE2lnire",
    puncte: ["Fiecare loca\u021Bie poate \u021Bine minte punctul exact de pe hart\u0103.", "Elevul prime\u0219te locul \u0219i harta \xEEn mesaj, iar tu deschizi traseul dintr-o atingere.", "\xCEn Calendar ai traseul zilei \u0219i drumul spre urm\u0103toarea \u0219edin\u021B\u0103."]
}, {
    v: "v2.27.19",
    titlu: "A\u0219teptare dup\u0103 examen",
    puncte: ["Elevul picat la examen intr\u0103 \xEEn a\u0219teptare \u0219i nu mai apare la programare p\xE2n\u0103 \xEEi eliberezi adeverin\u021Ba.", "\u0218edin\u021Bele viitoare se pot trimite \xEEn calendarul telefonului, cu alarme."]
}, {
    v: "v2.24.19",
    titlu: "Planificare pe zone",
    puncte: ["Planul poate grupa elevii care stau aproape unul de altul.", "Elevii care lucreaz\u0103 \xEEn ture nu mai sunt programa\u021Bi \xEEn timpul serviciului."]
}, {
    v: "v2.21.19",
    titlu: "Bani \u0219i rapoarte",
    puncte: ["\u021Aii eviden\u021Ba banilor du\u0219i la \u0219coal\u0103 \u0219i vezi c\xE2t mai ai de dat.", "Dou\u0103 rapoarte, de elevi \u0219i de bani, pe care le po\u021Bi salva ca PDF."]
}, {
    v: "v2.18.12",
    titlu: "Set\u0103ri \u0219i Finan\u021Be pe grupuri",
    puncte: ["Set\u0103rile \u0219i Finan\u021Bele sunt str\xE2nse pe categorii, mai u\u0219or de parcurs."]
}, {
    v: "v2.12.6",
    titlu: "Programul, pe m\u0103sura ta",
    puncte: ["Alegi durata unei \u0219edin\u021Be \u0219i pasul orelor din calendar."]
}, {
    v: "v2.10.5",
    titlu: "Acces pe perioad\u0103",
    puncte: ["Aplica\u021Bia se deschide cu un cod primit o singur\u0103 dat\u0103.", "La expirare datele r\u0103m\xE2n \xEEntregi; doar modific\u0103rile se opresc."]
}, {
    v: "v2.0.0",
    titlu: "Pl\u0103\u021Bi corectabile",
    puncte: ["Orice plat\u0103 se poate corecta sau \u0219terge, iar datoria se recalculeaz\u0103 singur\u0103."]
}, {
    v: "v1.32.0",
    eticheta: "p\xE2n\u0103 la v1.32.9",
    titlu: "Bani, taxe \u0219i salariu",
    puncte: ["Taxe \u0219i pachete stabilite de tine, pl\u0103\u021Bi \xEEncasate de tine sau la \u0219coal\u0103.", "Salariul de la angajator se calculeaz\u0103 singur, cu prag lunar \u0219i tarife pentru englez\u0103."]
}, {
    v: "v1.31.0",
    eticheta: "p\xE2n\u0103 la v1.32.9",
    titlu: "Planificare pe m\u0103sura fiec\u0103rui elev",
    puncte: ["Planificatorul respect\u0103 zilele \u0219i orele \xEEn care poate veni fiecare elev.", "Ultimele \u0219edin\u021Be se p\u0103streaz\u0103 pentru preg\u0103tirea de dinaintea examenului."]
}, {
    v: "v1.30.0",
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

function c3({
    open: n,
    dela: e,
    onClose: t
}) {
    if (!n) return null;
    let a = u3.filter(r => !e || sS(r.v, e) > 0);
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
    }, "Schimb\u0103rile de la versiunea ", e, " \xEEncoace."), a.length === 0 && o.default.createElement("p", {
        className: "text-sm text-slate-400 py-4 text-center"
    }, "Nimic nou de la ultima deschidere."), a.map(r => o.default.createElement("div", {
        key: r.v,
        className: "mb-4"
    }, o.default.createElement("div", {
        className: "flex items-baseline gap-2"
    }, o.default.createElement("span", {
        className: "text-sm font-semibold text-slate-900"
    }, r.titlu), o.default.createElement("span", {
        className: "font-mono-time text-xs text-slate-400"
    }, r.eticheta || r.v)), o.default.createElement("ul", {
        className: "mt-1.5 space-y-1.5"
    }, r.puncte.map((i, s) => o.default.createElement("li", {
        key: s,
        className: "flex gap-2 text-xs text-slate-600"
    }, o.default.createElement("span", {
        className: "shrink-0",
        style: {
            color: "var(--accent)"
        }
    }, "\u2022"), o.default.createElement("span", null, i)))))))
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
    })), u && o.default.createElement("div", {
        className: "mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3.5"
    }, o.default.createElement("div", {
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
    }, "Am publicat")), !u && c.length > 0 && o.default.createElement("button", {
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
    }), [t, a] = (0, o.useState)(!0), [r, i] = (0, o.useState)("dashboard"), [s, l] = (0, o.useState)(null), [u, d] = (0, o.useState)({
        open: !1,
        mode: "create",
        initial: null
    }), [f, p] = (0, o.useState)({
        open: !1,
        mode: "create",
        initial: null
    }), [c, m] = (0, o.useState)(null), [g, v] = (0, o.useState)(null), [w, x] = (0, o.useState)(null), [h, y] = (0, o.useState)(!1), [_, b] = (0, o.useState)(void 0), [M, S] = (0, o.useState)(!1), [k, E] = (0, o.useState)(""), B = (0, o.useRef)(!1), [$, G] = (0, o.useState)(!1), [A, O] = (0, o.useState)(0), [N, C] = (0, o.useState)(null), [W, X] = (0, o.useState)(null), [R, K] = (0, o.useState)(!1);

    function ne(I) {
        if (PA()) {
            Y("\xCEnchide mai \xEEnt\xE2i fereastra deschis\u0103.", "error");
            return
        }
        i(I)
    }
    let Y = (0, o.useCallback)((I, F) => {
        l({
            msg: I,
            type: F
        }), setTimeout(() => l(null), 2600)
    }, []);
    (0, o.useEffect)(() => {
        if (typeof window > "u" || !window.matchMedia) return;
        let I = window.matchMedia("(prefers-color-scheme: dark)");
        K(I.matches);
        let F = V => K(V.matches);
        return I.addEventListener ? I.addEventListener("change", F) : I.addListener(F), () => {
            I.removeEventListener ? I.removeEventListener("change", F) : I.removeListener(F)
        }
    }, []), (0, o.useEffect)(() => {
        let I = F => {
            let V = F.target;
            !V || typeof V.matches != "function" || V.matches("input, select, textarea") && setTimeout(() => {
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
            sS(ri, F.versiune) > 0 && (X(F.versiune), C("noutati"))
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
        p({
            open: !0,
            mode: "create",
            initial: null
        })
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
                [ue]: (Number(I[ue]) || 0) + te
            };
        return ee.laScoala && (De.payments = [...I.payments || [], {
            id: Vt("pay"),
            date: Be(),
            amount: Number(ee.price) || 0,
            collector: "school"
        }]), De
    }

    function fe(I, F, V) {
        let ee = I.pachet && I.pachet !== (V && V.pachet);
        F === "edit" ? (ce(te => ({
            ...te,
            students: te.students.map(ue => {
                if (ue.id !== V.id) return ue;
                let De = {
                    ...ue,
                    ...I
                };
                return ee ? se(De, I.pachet, te.settings) : De
            })
        })), Y("Elev actualizat.")) : (ce(te => {
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
                    let Ae = (ee - Df(He, F)) * De;
                    return {
                        ...He,
                        fees: {
                            ...He.fees || {},
                            [F]: ee
                        },
                        [Te]: Math.max(0, (Number(He[Te]) || 0) + Ae)
                    }
                })
            }
        })
    }

    function we(I, F) {
        ce(V => ({
            ...V,
            students: V.students.map(ee => {
                if (ee.id !== I) return ee;
                let te = (Number(ee.examAttempts) || 0) + 1;
                return F === "promovat" ? {
                    ...ee,
                    examResult: "promovat",
                    examAttempts: te
                } : {
                    ...ee,
                    examResult: "respins",
                    examAttempts: te,
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
                date: V.date,
                startMin: V.startMin
            }) : De && I.status !== "cancelled" && (ee = "location")
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
                    english: !!(ue && ue.english),
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
        let F = XA(I, n.sessions),
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
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .sheet-anim { animation: slideUp 0.22s ease-out; }
        .fade-anim { animation: fadeIn 0.15s ease-out; }
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
          padding: 0.75rem;
          padding-top: 2.5rem;
          padding-top: calc(env(safe-area-inset-top, 0px) + 2.5rem);
          padding-bottom: 5.5rem;
          padding-bottom: calc(5.5rem + env(safe-area-inset-bottom, 0px));
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
        onAddStudent: () => p({
            open: !0,
            mode: "create",
            initial: null
        }),
        onAddSession: () => d({
            open: !0,
            mode: "create",
            initial: null
        }),
        onGoToPlanner: () => i("planner"),
        onOpenStudent: I => m(I),
        onGoToCalendar: () => i("calendar")
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
    }), Z.map(I => {
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
        onClose: () => m(null),
        onEdit: () => p({
            open: !0,
            mode: "edit",
            initial: Vi
        }),
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
        defaultWeeklyLimit: n.settings.defaultWeeklyLimit,
        defaultCounty: n.settings.defaultCounty,
        locations: n.settings.locations,
        settingsPachete: n.settings,
        masini: iasMasini(n.settings),
        currency: n.settings.currency,
        onClose: () => p({
            open: !1,
            mode: "create",
            initial: null
        }),
        onSave: fe,
        onDelete: he
    }), o.default.createElement(Gk, {
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
        onClose: q
    })), o.default.createElement(Nk, {
        prompt: g,
        onClose: () => v(null)
    }), o.default.createElement(kk, {
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