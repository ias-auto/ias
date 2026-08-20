/* ==========================================================================
   IAS — Instructor Auto Sistem
   Aplicație de evidență pentru instructori auto: calendar, elevi, planificare,
   bani. Totul stă în telefonul instructorului; nimic nu pleacă pe vreun server.

   Fișierul e împărțit în secțiuni, în ordinea în care se sprijină una pe alta:
     1. Constante și unelte      — date, ore, formate, mărci
     2. Datele                   — forma lor, curățarea, socotelile
     3. Planificatorul           — motorul care umple săptămânile
     4. Antetul 3D               — garajul de vehicule
     5. Piese de interfață       — cărămizile din care sunt făcute filele
     6. Filele                   — Acasă, Calendar, Elevi, Plan, Finanțe, Setări
     7. Aplicația                — starea, salvarea, legăturile dintre file
   ========================================================================== */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import * as THREE from 'three';
import {
  Home, CalendarDays, Users, Wallet, Settings, Plus, Search, Phone, Trash2,
  Pencil, X, Check, ChevronLeft, ChevronRight, MessageCircle, Download,
  MapPin, Copy, Send, Upload, Banknote, Car, Sun, Moon, Sunrise, Sunset,
  Smartphone, Flag, Cake, GraduationCap, WandSparkles,
} from 'lucide-react';

/* ======================= 1. CONSTANTE ȘI UNELTE ========================== */

const RO_MONTHS = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
const RO_DAYS_SHORT = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'];
const RO_DAYS_FULL = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
// Săptămâna începe luni, cum se citește la noi, nu duminică.
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

const SESSION_DURATION = 90;          // minute; se poate schimba din Setări
const APP_NAME = 'IAS';
const APP_VERSION = 'v2.35.1';
const VERSION_LABEL = `${APP_NAME} ${APP_VERSION}`;
const SCHEMA_VERSION = 1;

const BRAND = {
  mark: 'IAS',
  expansion: 'Instructor Auto Sistem',
  tagline: 'Asistentul instructorului de succes!',
  by: 'by Ioan-Adrian Stancu',
  owner: 'Ioan-Adrian Stancu',
};

const LICENSE_CATEGORIES = ['AM', 'A1', 'A2', 'A', 'B1', 'B', 'BE', 'C1', 'C1E',
  'C', 'CE', 'D1', 'D1E', 'D', 'DE', 'Tr', 'Tb', 'Tv'];

const COUNTIES = ('B AB AR AG BC BH BN BT BV BR BZ CJ CL CS CT CV DB DJ GJ GL GR '
  + 'HD HR IF IL IS MH MM MS NT OT PH SB SJ SM SV TL TM TR VL VN VS').split(' ');

/* Ordinea straturilor pe ecran. Bara de taburi stă deasupra ferestrelor, ca
   lumina ei să rămână la vedere; de aceea, când e o fereastră deschisă, filele
   nu se mai schimbă (vezi „cereInchiderea"). */
const LAYER = { sheet: 50, form: 60, nav: 65, notify: 70, dialog: 80, toast: 90 };

/* ------------------------------ data și ora ------------------------------ */

const pad2 = (n) => String(n).padStart(2, '0');
const toISO = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const fromISO = (s) => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, m - 1, d); };
const todayISO = () => toISO(new Date());
const nowISO = () => new Date().toISOString();
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

const minToTime = (m) => `${pad2(Math.floor(m / 60))}:${pad2(m % 60)}`;
const fmtHuman = (iso) => { const d = fromISO(iso); return `${d.getDate()} ${RO_MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
const fmtShort = (iso) => { const d = fromISO(iso); return `${RO_DAYS_FULL[d.getDay()]}, ${d.getDate()} ${RO_MONTHS[d.getMonth()]}`; };
const luna = (iso) => { const d = fromISO(`${iso}-01`); return `${RO_MONTHS[d.getMonth()]} ${d.getFullYear()}`; };

// „5 zile", dar „34 de zile" — acordul cerut de numeralele mari.
const deZile = (n) => `${n} ${(n % 100) >= 1 && (n % 100) <= 19 ? '' : 'de '}zile`;

const ultimaZiDin = (iso) => {
  const d = fromISO(iso || todayISO());
  return toISO(new Date(d.getFullYear(), d.getMonth() + 1, 0));
};

let contorId = 0;
const genId = (prefix) => `${prefix}_${Date.now().toString(36)}_${contorId++}_${Math.random().toString(36).slice(2, 6)}`;

/* Pentru căutare: scoatem semnele diacritice și coborâm la litere mici,
   păstrând spațiile și cifrele. Așa „ram" îl găsește pe „Râmbu", iar numele
   scris cu ș-virguliță îl găsește pe cel scris cu ș-sedilă. */
const faraDia = (t) => String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const stripDia = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z]/g, '').toUpperCase();

/* ------------------------- ziua de examen -------------------------------- */

// Examenul ocupă o jumătate de zi; în intervalul lui elevul nu poate fi programat.
const EXAM_PERIODS = {
  am: { label: 'Dimineață', short: 'dimineața', start: 510, end: 750 },
  pm: { label: 'După-amiază', short: 'după-amiaza', start: 780, end: 1020 },
};
const examPeriodText = (p) => {
  const e = EXAM_PERIODS[p];
  return e ? `${e.label.toLowerCase()}, ${minToTime(e.start)}–${minToTime(e.end)}` : '';
};

function examBlocksForDate(students, dateISO) {
  if (!dateISO || !students) return [];
  return students
    .filter(s => s.examDate === dateISO && EXAM_PERIODS[s.examPeriod])
    .map(s => ({ student: s, period: s.examPeriod, ...EXAM_PERIODS[s.examPeriod] }));
}

// Intervalele în care nu lucrezi (concediu, revizie), trecute în Setări.
function blocksForDate(settings, dateISO) {
  if (!dateISO || !settings || !settings.blocks) return [];
  return settings.blocks
    .filter(b => b.date === dateISO)
    .map(b => (b.allDay
      ? { ...b, start: 0, end: 1440 }
      : { ...b, start: Number(b.startMin) || 0, end: Number(b.endMin) || 0 }));
}

const seSuprapun = (aStart, aDur, bStart, bDur) => aStart < bStart + bDur && bStart < aStart + aDur;

function examConflict(blocks, startMin, dur) {
  if (!blocks || !blocks.length) return null;
  const end = startMin + (dur || SESSION_DURATION);
  return blocks.find(b => startMin < b.end && end > b.start) || null;
}
function blockConflict(blocks, startMin, dur) {
  if (!blocks || !blocks.length) return null;
  const end = startMin + (dur || SESSION_DURATION);
  return blocks.find(b => startMin < b.end && end > b.start) || null;
}

/* ----------------------------- starea ședinței --------------------------- */

const STATUS_META = {
  scheduled: { label: 'Programată', c: 'blue' },
  pending: { label: 'Așteaptă confirmare', c: 'amber' },
  completed: { label: 'Efectuată', c: 'emerald' },
  cancelled: { label: 'Anulată', c: 'red' },
};

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 '
  + 'text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white';

/* --------------------------- setările implicite -------------------------- */

const DEFAULT_SETTINGS = {
  workDays: [1, 2, 3, 4, 5, 6],
  startMin: 8 * 60,
  endMin: 20 * 60,
  sessionMin: SESSION_DURATION,
  stepMin: 30,
  defaultWeeklyLimit: 2,
  currency: 'lei',
  reexamFee: 250,
  theme: 'system',
  rateTypes: [
    { id: 'included', name: 'Ore incluse', price: 100 },
    { id: 'extra', name: 'Ore suplimentare', price: 120 },
  ],
  employer: {
    baseRate: 60, overtimeRate: 70,
    englishBaseRate: 80, englishOvertimeRate: 90,
    hoursPerDay: 8, hoursPerSession: 2,
  },
  workingDaysOverrides: {},
  locations: [],
};

/* ------------------------------ momentul zilei --------------------------- */

// Antetul își schimbă cerul după ceas; scena 3D primește aceleași denumiri.
const PHASES = {
  dawn: { icon: Sunrise, label: 'Zori', sky: 'linear-gradient(180deg,#3b1d6e 0%,#c026a6 34%,#f4713b 70%,#fbc56a 100%)' },
  day: { icon: Sun, label: 'Zi', sky: 'linear-gradient(180deg,#1e6fd9 0%,#4aa3ef 45%,#9fd4f7 100%)' },
  dusk: { icon: Sunset, label: 'Amurg', sky: 'linear-gradient(180deg,#221046 0%,#7b2d8e 30%,#e0632c 68%,#f8b25c 100%)' },
  night: { icon: Moon, label: 'Noapte', sky: 'linear-gradient(180deg,#050914 0%,#0d1a33 45%,#16294a 100%)' },
};

function phaseForHour(h) {
  if (h >= 5 && h < 8) return 'dawn';
  if (h >= 8 && h < 18) return 'day';
  if (h >= 18 && h < 21) return 'dusk';
  return 'night';
}

/* Luminile scenei 3D pentru fiecare moment al zilei. Aceleași chei peste tot,
   ca schimbarea momentului să fie doar o înlocuire de valori. */
const L3D = {
  dawn: { hemiSky: 0xffd9c2, hemiGround: 0x3b2a5c, hemiI: 0.9, dir: 0xffc08a, dirI: 1.0, spot: 0.5, head: 0.6, tail: 0.5, glow: 0.28, road: 0x2f2b45, fog: 0xf0b25e },
  day: { hemiSky: 0xdff1ff, hemiGround: 0x64748b, hemiI: 1.05, dir: 0xffffff, dirI: 1.55, spot: 0, head: 0.55, tail: 0.5, glow: 0.12, road: 0x3d4b5d, fog: 0x6fc7f2 },
  dusk: { hemiSky: 0xffc09a, hemiGround: 0x2a1e3f, hemiI: 0.75, dir: 0xff9448, dirI: 1.1, spot: 0.9, head: 0.8, tail: 0.7, glow: 0.42, road: 0x2a2337, fog: 0xda8a2c },
  night: { hemiSky: 0x2b3a55, hemiGround: 0x080f1e, hemiI: 0.5, dir: 0x8296b4, dirI: 0.3, spot: 1.7, head: 1.0, tail: 0.9, glow: 0.68, road: 0x161f2e, fog: 0x16233a },
};

/* ==================== 2. DATELE: FORMA ȘI CURĂȚAREA ====================== */

const STORAGE_KEY = 'ias:app-data';
const SEEN_KEY = 'ias:vazut';
const BACKUP_KEY = 'ias:backup';
const LICENSE_KEY = 'ias:licenta';
const DEVICE_KEY = 'ias:dispozitiv';
const STUDENT_FILE_KIND = 'ias-student';
const ZILE_BACKUP = 14;

/* Orice intră în aplicație — de la salvare, dintr-un backup, de la un coleg —
   trece pe aici. Câmpurile lipsă capătă valori, ca restul codului să nu mai
   verifice la fiecare pas dacă există. */
function normalizeData(raw) {
  const s = (raw && raw.settings) || {};
  return {
    students: (Array.isArray(raw && raw.students) ? raw.students : []).map(st => ({
      ...st,
      payments: (Array.isArray(st.payments) ? st.payments : [])
        .map(p => (p && p.id ? p : { ...(p || {}), id: genId('pay') })),
    })),
    sessions: Array.isArray(raw && raw.sessions) ? raw.sessions : [],
    licente: Array.isArray(raw && raw.licente) ? raw.licente : [],
    varsaminte: Array.isArray(raw && raw.varsaminte) ? raw.varsaminte : [],
    settings: {
      ...DEFAULT_SETTINGS,
      ...s,
      theme: s.theme || DEFAULT_SETTINGS.theme,
      rateTypes: s.rateTypes || DEFAULT_SETTINGS.rateTypes,
      employer: { ...DEFAULT_SETTINGS.employer, ...(s.employer || {}) },
      workingDaysOverrides: s.workingDaysOverrides || {},
      locations: s.locations || [],
    },
  };
}

function loadData() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return normalizeData(raw ? JSON.parse(raw) : null);
  } catch (e) {
    return normalizeData(null);
  }
}
function saveData(data) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* memoria e plină sau blocată */ }
}

/* ===================== SOCOTELILE UNUI ELEV ============================== */

const durataDin = (settings) => Number(settings && settings.sessionMin) || SESSION_DURATION;
const pasDin = (settings) => Number(settings && settings.stepMin) || 30;
// Fiecare ședință își păstrează durata cu care a fost creată: o schimbare de azi
// nu rescrie istoricul.
const durataSed = (s, settings) => Number(s && s.duration) || durataDin(settings);

function daySlots(settings) {
  const out = [];
  const dur = durataDin(settings);
  const pas = pasDin(settings);
  for (let m = settings.startMin; m + dur <= settings.endMin; m += pas) out.push(m);
  return out;
}

// Două ședințe se ciocnesc dacă intervalele lor se ating.
function isOverlapping(sessions, date, startMin, excludeId, settings) {
  const dur = durataDin(settings);
  return sessions.some(s => s.id !== excludeId && s.date === date && s.status !== 'cancelled'
    && !s.otherInstructor && seSuprapun(startMin, dur, s.startMin, durataSed(s, settings)));
}
function hasSessionSameDay(sessions, studentId, date, excludeId) {
  return sessions.some(s => s.id !== excludeId && s.studentId === studentId && s.date === date && s.status !== 'cancelled');
}

const startOfWeek = (d) => { const x = new Date(d); const zi = (x.getDay() + 6) % 7; x.setDate(x.getDate() - zi); x.setHours(0, 0, 0, 0); return x; };
function sessionsInWeek(sessions, studentId, dateISO, excludeId) {
  const cheie = toISO(startOfWeek(fromISO(dateISO)));
  return sessions.filter(s => s.id !== excludeId && s.studentId === studentId
    && s.status !== 'cancelled' && toISO(startOfWeek(fromISO(s.date))) === cheie).length;
}

const studentUsedCount = (sessions, id) => sessions.filter(s => s.studentId === id && s.status !== 'cancelled').length;
const studentCompletedCount = (sessions, id) => sessions.filter(s => s.studentId === id && s.status === 'completed').length;
const studentIncludedUsed = (sessions, id) => sessions.filter(s => s.studentId === id && s.status !== 'cancelled' && s.type === 'included').length;
const studentOtherInstructorCount = (sessions, id) => sessions.filter(s => s.studentId === id && s.status !== 'cancelled' && s.otherInstructor).length;

const studentTotalHours = (s) => (Number(s.includedHours) || 0) + (Number(s.extraHours) || 0);
const studentBookedRemaining = (s, sessions) => Math.max(0, studentTotalHours(s) - studentUsedCount(sessions, s.id));

// Cât timp mai are ore incluse, ședința nouă e „inclusă"; după aceea, „suplimentară".
const suggestType = (s, sessions) => (studentIncludedUsed(sessions, s.id) < (Number(s.includedHours) || 0) ? 'included' : 'extra');
const studentStage = (s, sessions) => (studentUsedCount(sessions, s.id) === 0 ? 'nou' : 'in_curs');

/* --------------------- așteptarea după un examen picat ------------------- */

const EXAM_RESERVE = 3;              // ședințe păstrate pentru pregătirea finală
const ZILE_ASTEPTARE = 14;
const SEDINTE_DUPA_ADEVERINTA = 3;

const eInAsteptare = (s) => !!(s && s.asteptare);

function zileDeAsteptare(s) {
  if (!s || !s.asteptareDin) return { trecute: 0, ramase: ZILE_ASTEPTARE };
  const trecute = Math.max(0, Math.round((fromISO(todayISO()).getTime() - fromISO(s.asteptareDin).getTime()) / 86400000));
  return { trecute, ramase: Math.max(0, ZILE_ASTEPTARE - trecute) };
}
function sedinteDupaAdeverinta(s, sessions) {
  if (!s || !s.adeverintaDin) return 0;
  return sessions.filter(x => x.studentId === s.id && x.status === 'completed' && x.date >= s.adeverintaDin).length;
}
// Elevul e disponibil pentru programare?
const eDisponibil = (s) => !!s && !s.withdrawn && s.examResult !== 'promovat' && !eInAsteptare(s);

/* ------------------------- rezerva de dinaintea examenului --------------- */

const ORIZONT_SUGESTII = 10;
const zileIntre = (a, b) => Math.round((fromISO(b).getTime() - fromISO(a).getTime()) / 86400000);
// Ultimele ședințe se dau cu 1–5 zile înainte de examen, ca elevul să vină „cald".
const eInFereastraExamen = (s, dateISO) => {
  if (!s || !s.examDate) return false;
  const d = zileIntre(dateISO, s.examDate);
  return d >= 1 && d <= 5;
};

function studentPlannableRemaining(s, sessions, dateISO) {
  const ramase = studentBookedRemaining(s, sessions);
  if (ramase <= 0) return 0;
  const rezerva = Math.min(EXAM_RESERVE, studentTotalHours(s));
  if (!s.examDate) return Math.max(0, ramase - rezerva);
  if (dateISO >= s.examDate) return 0;
  return eInFereastraExamen(s, dateISO) ? ramase : Math.max(0, ramase - rezerva);
}

// Avertismentul dat când programezi una dintre ultimele ședințe prea devreme.
function reserveWarning(student, sessions, dateISO, excludeId) {
  if (!student) return null;
  const total = studentTotalHours(student);
  const folosite = sessions.filter(s => s.id !== excludeId && s.studentId === student.id && s.status !== 'cancelled').length;
  const ramase = total - folosite;
  const rezerva = Math.min(EXAM_RESERVE, total);
  if (ramase > rezerva) return null;
  if (student.examDate) {
    if (eInFereastraExamen(student, dateISO)) return null;
    return `Atenție: e una dintre ultimele ${rezerva} ședințe. Ar trebui programată cu 1–5 zile înainte de examen (${fmtHuman(student.examDate)}). Apasă din nou „Salvează" ca să o programezi oricum.`;
  }
  return `Atenție: e una dintre ultimele ${rezerva} ședințe, păstrate pentru pregătirea de dinaintea examenului. ${student.name} nu are încă dată de examen. Apasă din nou „Salvează" ca să o programezi oricum.`;
}

/* ------------------------------ taxe și bani ----------------------------- */

// Fără taxe stabilite de utilizator, rămâne singura care există peste tot.
const feeTypesOf = (settings) => (settings.feeTypes
  ? settings.feeTypes
  : [{ id: 'reexam', name: 'Taxă reexaminare', price: Number(settings.reexamFee) || 250 }]);

function feeCountOf(student, feeId) {
  const f = student.fees || {};
  if (f[feeId] != null) return Number(f[feeId]) || 0;
  return (feeId === 'reexam' && Number(student.reexamCount)) || 0;
}

// O taxă poate aduce ore incluse (ca școlarizarea) sau suplimentare (ca un pachet).
const oreTipul = (f) => ((f && f.oreTip) === 'included' ? 'included' : 'extra');
const numeOre = (tip) => (tip === 'included' ? 'ore incluse' : 'ore suplimentare');

// Doar orele venite din pachete plătite acoperă ședințe de la plată; cele incluse
// nu se taxează oricum, deci n-au ce acoperi.
const studentPackageHours = (student, settings) => feeTypesOf(settings)
  .reduce((sum, f) => (oreTipul(f) === 'extra' ? sum + feeCountOf(student, f.id) * (Number(f.hours) || 0) : sum), 0);

const studentFeesDebt = (student, settings) => feeTypesOf(settings)
  .reduce((sum, f) => sum + feeCountOf(student, f.id) * (Number(f.price) || 0), 0);

const studentPaidTotal = (student) => (student.payments || [])
  .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

/* Datoria acumulată: ședințele de plată făcute, minus cele acoperite de pachete,
   plus orele suplimentare cumpărate dar neprogramate încă, plus taxele. */
function studentAccruedDebt(student, sessions, settings) {
  const pret = {};
  settings.rateTypes.forEach(rt => { pret[rt.id] = Number(rt.price) || 0; });
  const platibile = sessions
    .filter(s => s.studentId === student.id && s.status !== 'cancelled' && !s.otherInstructor && s.type !== 'included')
    .sort((a, b) => (a.date + minToTime(a.startMin)).localeCompare(b.date + minToTime(b.startMin)));
  const dinPachet = studentPackageHours(student, settings);
  const acoperite = Math.min(dinPachet, platibile.length);
  const deSedinte = platibile.slice(acoperite).reduce((sum, s) => sum + (pret[s.type] || 0), 0);
  const pachetRamas = dinPachet - acoperite;
  const neprogramate = Math.max(0, (Number(student.extraHours) || 0) - platibile.length);
  const deNeprogramate = Math.max(0, neprogramate - pachetRamas);
  return deSedinte + deNeprogramate * (pret.extra || 0) + studentFeesDebt(student, settings);
}

const studentOutstanding = (student, sessions, settings) =>
  studentAccruedDebt(student, sessions, settings) - studentPaidTotal(student);

/* Eticheta fiecărei ședințe de plată: din pachet, achitată, parțial sau de plată.
   Plățile se așază pe ședințe în ordinea în care au fost făcute. */
function sessionPaymentMap(student, sessions, settings) {
  const pret = {};
  settings.rateTypes.forEach(rt => { pret[rt.id] = Number(rt.price) || 0; });
  const platibile = sessions
    .filter(s => s.studentId === student.id && s.status !== 'cancelled' && !s.otherInstructor && s.type !== 'included')
    .sort((a, b) => (a.date + minToTime(a.startMin)).localeCompare(b.date + minToTime(b.startMin)));
  const dinPachet = studentPackageHours(student, settings);
  let credit = Math.max(0, studentPaidTotal(student) - studentFeesDebt(student, settings));
  const map = {};
  platibile.forEach((s, i) => {
    if (i < dinPachet) { map[s.id] = 'package'; return; }
    const p = pret[s.type] || 0;
    if (credit >= p) { map[s.id] = 'paid'; credit -= p; }
    else if (credit > 0) { map[s.id] = 'partial'; credit = 0; }
    else map[s.id] = 'due';
  });
  return map;
}

/* ========================= TURELE DE LUCRU ALE ELEVULUI =================== */
/* Mulți elevi lucrează în ture care se repetă după un tipar, nu după zilele
   săptămânii. Ținem pe fișa lor doar tiparul și un punct de pornire — ziua și
   ora la care au intrat într-o tură. Restul se calculează, oricât de departe,
   fiindcă ciclul se repetă la nesfârșit. */

const TURE = {
  '12-24': { nume: '12 cu 24', ciclu: 36, blocuri: [[0, 12]] },
  '12-36': { nume: '12 cu 36', ciclu: 48, blocuri: [[0, 12]] },
  '12-24-12-48': { nume: '12 zi / 24 liber / 12 noapte / 48 liber', ciclu: 96, blocuri: [[0, 12], [36, 48]] },
  '24-24': { nume: '24 cu 24', ciclu: 48, blocuri: [[0, 24]] },
  '24-48': { nume: '24 cu 48', ciclu: 72, blocuri: [[0, 24]] },
  '24-72': { nume: '24 cu 72', ciclu: 96, blocuri: [[0, 24]] },
  alt: { nume: 'Alt tipar (îl scriu eu)' },
};

// Tiparul elevului, adus la minute. Fără tipar sau fără zi de pornire nu avem ce
// calcula, iar elevul e socotit liber mereu.
function configTura(st) {
  if (!st || !st.tura || !st.turaData) return null;
  let ciclu; let blocuri;
  if (st.tura === 'alt') {
    const lucru = Number(st.turaLucru) || 0;
    const liber = Number(st.turaLiber) || 0;
    if (lucru <= 0 || lucru + liber <= 0) return null;
    ciclu = (lucru + liber) * 60;
    blocuri = [[0, lucru * 60]];
  } else {
    const t = TURE[st.tura];
    if (!t || !t.ciclu) return null;
    ciclu = t.ciclu * 60;
    blocuri = t.blocuri.map(([a, b]) => [a * 60, b * 60]);
  }
  const odihna = (Number(st.turaOdihna) || 0) * 60;
  return {
    ciclu,
    blocuri: blocuri.map(([a, b]) => [a, b + odihna]),
    ancora: fromISO(st.turaData).getTime() + (Number(st.turaOra) || 0) * 60000,
  };
}

// Se ciocnește ședința propusă cu o tură? Întoarce intervalul, ca să-l putem arăta.
function inTura(st, dateISO, startMin, durata) {
  const t = configTura(st);
  if (!t || !dateISO) return null;
  const inceput = fromISO(dateISO).getTime() + startMin * 60000;
  const sfarsit = inceput + (durata || SESSION_DURATION) * 60000;
  const a = (inceput - t.ancora) / 60000;
  const b = (sfarsit - t.ancora) / 60000;
  for (let k = Math.floor(a / t.ciclu) - 1; k <= Math.floor(b / t.ciclu) + 1; k++) {
    for (const [bs, be] of t.blocuri) {
      const s0 = bs + k * t.ciclu;
      const s1 = be + k * t.ciclu;
      if (a < s1 && s0 < b) {
        return { de: new Date(t.ancora + s0 * 60000), pana: new Date(t.ancora + s1 * 60000) };
      }
    }
  }
  return null;
}

// Următoarele ture, ca să verifici dintr-o privire că ai nimerit ziua de pornire.
function urmatoareleTure(st, cate = 3, dinISO) {
  const t = configTura(st);
  if (!t) return [];
  const acum = fromISO(dinISO || todayISO()).getTime();
  const out = [];
  let k = Math.floor((acum - t.ancora) / 60000 / t.ciclu) - 1;
  for (let pas = 0; pas < 12 && out.length < cate; pas++, k++) {
    t.blocuri.forEach(([bs, be]) => {
      const de = new Date(t.ancora + (bs + k * t.ciclu) * 60000);
      const pana = new Date(t.ancora + (be + k * t.ciclu) * 60000);
      if (pana.getTime() >= acum && out.length < cate) out.push({ de, pana });
    });
  }
  return out.sort((x, y) => x.de - y.de).slice(0, cate);
}

const oraDin = (d) => `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
const ziScurt = (d) => `${d.getDate()} ${RO_MONTHS[d.getMonth()].slice(0, 3)}`;
function textTura(t) {
  if (!t) return '';
  return t.de.toDateString() === t.pana.toDateString()
    ? `${ziScurt(t.de)}, ${oraDin(t.de)}–${oraDin(t.pana)}`
    : `${ziScurt(t.de)} ${oraDin(t.de)} – ${ziScurt(t.pana)} ${oraDin(t.pana)}`;
}

/* ======================== LOCURILE DE ÎNTÂLNIRE ========================== */
/* O locație poate ține minte și coordonatele, luate o dată chiar de la fața
   locului. Cu ele, harta deschide exact punctul; fără ele, caută după nume.
   Nu folosim niciun serviciu plătit: doar linkuri către aplicația de hărți. */

const areCoord = (l) => !!(l && l.lat != null && l.lng != null && l.lat !== '' && l.lng !== '');

function locatiaDupaNume(settings, nume) {
  const n = String(nume || '').trim();
  if (!n) return null;
  return ((settings && settings.locations) || []).find(l => l.name === n) || null;
}

// Linkul folosit în aplicație: „dir" cere traseu, altfel doar arată locul.
function hartaHref(loc, nume, mod) {
  const baza = mod === 'dir'
    ? 'https://www.google.com/maps/dir/?api=1&destination='
    : 'https://www.google.com/maps/search/?api=1&query=';
  if (areCoord(loc)) return `${baza}${loc.lat},${loc.lng}`;
  return `${baza}${encodeURIComponent(String(nume || (loc && loc.name) || ''))}`;
}

/* Forma scurtă, pentru mesajele către elevi: jumătate din lungime și la fel de
   exactă — cinci zecimale înseamnă un metru. Fără punct salvat, căutăm după
   nume, cu diacriticele scoase, ca linkul să rămână citibil. */
function hartaScurt(loc, nume) {
  if (areCoord(loc)) {
    return `https://maps.google.com/?q=${Number(Number(loc.lat).toFixed(5))},${Number(Number(loc.lng).toFixed(5))}`;
  }
  const t = String(nume || (loc && loc.name) || '').trim();
  if (!t) return '';
  const curat = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9 ,.-]/g, '').trim().replace(/\s+/g, '+');
  return curat ? `https://maps.google.com/?q=${curat}` : '';
}

// Coordonatele telefonului, cerute o singură dată, când ești la fața locului.
function iaPozitia() {
  return new Promise((res, rej) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) { rej(new Error('fara')); return; }
    navigator.geolocation.getCurrentPosition(
      p => res({ lat: Number(p.coords.latitude.toFixed(6)), lng: Number(p.coords.longitude.toFixed(6)) }),
      e => rej(e),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  });
}

// Coordonate lipite de mână sau scoase dintr-un link de hartă.
function extrageCoord(text) {
  const t = String(text || '');
  const tipare = [
    /@(-?\d{1,3}\.\d+),(-?\d{1,3}\.\d+)/,
    /[?&]q=(-?\d{1,3}\.\d+),\s*(-?\d{1,3}\.\d+)/,
    /!3d(-?\d{1,3}\.\d+)!4d(-?\d{1,3}\.\d+)/,
    /^\s*(-?\d{1,3}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)\s*$/,
  ];
  for (const re of tipare) {
    const m = t.match(re);
    if (m) {
      const lat = Number(m[1]); const lng = Number(m[2]);
      if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return { lat, lng };
    }
  }
  return null;
}

/* Distanța în linie dreaptă, în kilometri. Nu e distanța cu mașina — un râu sau
   o cale ferată schimbă socoteala — dar e destul de bună ca să știi cine stă
   lângă cine. */
function distKm(a, b) {
  if (!areCoord(a) || !areCoord(b)) return null;
  const rad = (x) => (Number(x) * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat); const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}
const PRAG_APROPIERE_KM = 5;

/* Traseul unei zile, ca un singur link: nu punem punct de plecare, ca harta să
   pornească de unde ești, iar ședințele devin opriri pe drum, în ordinea orelor. */
function traseulZilei(sesiuni, settings) {
  const opriri = (sesiuni || [])
    .filter(s => s.status !== 'cancelled' && s.location)
    .sort((a, b) => a.startMin - b.startMin)
    .map(s => {
      const l = locatiaDupaNume(settings, s.location);
      return areCoord(l) ? `${l.lat},${l.lng}` : s.location;
    })
    .filter((x, i, v) => i === 0 || x !== v[i - 1]);
  if (opriri.length === 0) return null;
  const e = (x) => encodeURIComponent(x);
  const taiate = opriri.slice(0, 10);
  const mijloc = taiate.slice(0, -1);
  const href = `https://www.google.com/maps/dir/?api=1&destination=${e(taiate[taiate.length - 1])}`
    + (mijloc.length ? `&waypoints=${mijloc.map(e).join('%7C')}` : '')
    + '&travelmode=driving';
  return { href, opriri: taiate.length };
}

/* ==================== 3. PLANIFICATORUL ================================== */
/* Motorul care umple săptămânile. Regulile, în ordinea în care se aplică:
     – primii sunt elevii cu examenul cel mai apropiat;
     – fiecare are limita lui de ședințe pe săptămână și cel mult una pe zi;
     – zilele și orele în care nu poate veni sunt ocolite (zile bifate, date
       pare/impare, fereastra lui de disponibilitate, tura de serviciu);
     – ultimele ședințe rămân pentru pregătirea de dinaintea examenului, dacă
       nu ceri altfel;
     – la cerere, elevii care stau aproape unul de altul se pun consecutiv. */

// Ziua în care poate veni: zilele bifate pe cardul lui și, dacă e cazul, doar
// datele pare sau impare ale lunii.
function studentAllowsDay(student, dateISO) {
  if (!student || !dateISO) return true;
  const d = fromISO(dateISO);
  const zile = student.availDays;
  if (Array.isArray(zile) && zile.length && !zile.includes(d.getDay())) return false;
  if (student.availParity === 'even' && d.getDate() % 2 !== 0) return false;
  if (student.availParity === 'odd' && d.getDate() % 2 !== 1) return false;
  return true;
}

/* Intervalul orar al elevului: cel scris pe fișă, dacă există, altfel cel
   dedus din ședințele de până acum — cine a venit mereu după-amiaza probabil
   lucrează dimineața. La cel dedus tăiem capetele, ca o singură excepție să nu
   lărgească fereastra. */
function studentTimeWindow(sessions, studentId, student, dur) {
  const d = dur || SESSION_DURATION;
  const de = student && student.availFrom;
  const pana = student && student.availTo;
  if (de != null && de !== '' && pana != null && pana !== '' && Number(pana) - Number(de) >= d) {
    return { lo: Number(de), hi: Number(pana) - d, stated: true, from: Number(de), to: Number(pana) };
  }
  const ore = sessions
    .filter(s => s.studentId === studentId && s.status !== 'cancelled')
    .map(s => s.startMin)
    .sort((a, b) => a - b);
  if (ore.length < 2) return null;
  const taie = ore.length >= 5 ? 1 : 0;
  return { lo: ore[taie], hi: ore[ore.length - 1 - taie], count: ore.length };
}

function generatePlan({ students, existingSessions, settings, fromDateISO, maxWeeksCap = 16 }) {
  // Întâi cei cu examenul aproape; la aceeași dată, cei cu mai multe ore rămase.
  const sorted = [...students].sort((a, b) => {
    const ea = a.examDate || '9999-12-31';
    const eb = b.examDate || '9999-12-31';
    if (ea !== eb) return ea < eb ? -1 : 1;
    return b.remaining - a.remaining;
  });
  const durata = durataDin(settings);

  const ramase = {};
  const limita = {};
  sorted.forEach(s => { ramase[s.id] = s.remaining; limita[s.id] = s.weeklyLimit || 2; });

  const ocupat = {};        // intervalele ocupate ale fiecărei zile
  const areZiua = {};       // elev + zi: are deja ședință?
  const peSaptamana = {};   // elev + săptămână: câte are
  const zileleLui = {};     // toate zilele în care are ședințe (pentru pauza minimă)
  const ultimulDin = {};    // ultimul elev programat în ziua aceea (pentru grupare)

  const distantaZile = (a, b) => Math.abs(Math.round((fromISO(a).getTime() - fromISO(b).getTime()) / 86400000));
  const respectaPauza = (s, dateISO) => {
    const gap = Number(s.minGapDays) || 0;
    if (gap < 2) return true;
    return !(zileleLui[s.id] || []).some(z => distantaZile(z, dateISO) < gap);
  };

  const ocupa = (dateISO, startMin, dur) => {
    if (!ocupat[dateISO]) ocupat[dateISO] = [];
    ocupat[dateISO].push([startMin, startMin + (dur || durata)]);
  };
  const eLiber = (dateISO, startMin) => {
    const list = ocupat[dateISO];
    if (!list) return true;
    return !list.some(([a, b]) => seSuprapun(startMin, durata, a, b - a));
  };

  // Ce e deja în calendar rămâne neatins; planul se strecoară printre.
  existingSessions.filter(s => s.status !== 'cancelled').forEach(s => {
    if (!s.otherInstructor) ocupa(s.date, s.startMin, durataSed(s, settings));
    areZiua[`${s.studentId}_${s.date}`] = true;
    (zileleLui[s.studentId] = zileleLui[s.studentId] || []).push(s.date);
    const sapt = toISO(startOfWeek(fromISO(s.date)));
    peSaptamana[`${s.studentId}_${sapt}`] = (peSaptamana[`${s.studentId}_${sapt}`] || 0) + 1;
  });

  const celMaiMult = Math.max(0, ...sorted.map(s => s.remaining));
  const limiteVii = sorted.map(s => s.weeklyLimit || 2).filter(x => x > 0);
  const ceaMaiMica = limiteVii.length ? Math.min(...limiteVii) : 1;
  const orizontZile = Number(settings.horizonDays) || 0;
  const ultimaZi = orizontZile ? toISO(addDays(fromISO(fromDateISO), orizontZile - 1)) : null;
  const saptamani = orizontZile
    ? Math.ceil((orizontZile + 7) / 7)
    : Math.min(maxWeeksCap, Math.max(4, Math.ceil(celMaiMult / Math.max(1, ceaMaiMica)) + 2));

  const propuneri = [];
  const acum = new Date();
  const aziISO = toISO(acum);
  const acumMin = acum.getHours() * 60 + acum.getMinutes() + 60;   // o oră de răgaz

  const inFereastra = (s, min) => !s.window || (min >= s.window.lo && min <= s.window.hi);
  // La prima trecere ținem cont de fereastra fiecăruia; la a doua o cerem doar
  // celor care și-au scris-o singuri pe fișă.
  const potrivit = (s, min, strict) => (s.window && (s.window.stated || strict) ? inFereastra(s, min) : true);

  function treceSaptamanile(strict, dela, pana) {
    let cursor = addDays(startOfWeek(fromISO(fromDateISO)), dela * 7);
    for (let w = dela; w < pana; w++) {
      const cheiaSapt = toISO(cursor);
      for (let i = 0; i < 7; i++) {
        const zi = addDays(cursor, i);
        const iso = toISO(zi);
        if (iso < fromDateISO || (ultimaZi && iso > ultimaZi)) continue;
        if (!settings.workDays.includes(zi.getDay())) continue;

        const sloturi = daySlots(settings);
        const examene = examBlocksForDate(settings.examStudents, iso);
        const blocuri = blocksForDate(settings, iso);

        for (const slot of sloturi) {
          if (iso === aziISO && slot < acumMin) continue;
          if (!eLiber(iso, slot)) continue;
          if (examConflict(examene, slot, durata)) continue;
          if (blockConflict(blocuri, slot, durata)) continue;

          const mod = settings.grupare || 'fara';
          const precedent = (mod !== 'fara' && ultimulDin[iso]) || null;

          const alege = (ceruAproape) => {
            for (const s of sorted) {
              if (ramase[s.id] <= 0) continue;
              if (areZiua[`${s.id}_${iso}`]) continue;
              if (!studentAllowsDay(s, iso)) continue;
              if (!respectaPauza(s, iso)) continue;
              if (ceruAproape) {
                if (mod === 'harta') {
                  const d = distKm(precedent, s);
                  if (d == null || d > PRAG_APROPIERE_KM) continue;
                } else if ((s.area || '') !== precedent) continue;
              }
              if (inTura(s, iso, slot, durata)) continue;   // e la serviciu

              // Rezerva de dinaintea examenului: sub ea, doar în ultimele zile.
              const rezerva = s.includeRezerva ? 0 : Math.min(EXAM_RESERVE, Number(s.remaining) || 0);
              if (ramase[s.id] <= rezerva) {
                if (!s.examDate) continue;
                const d = zileIntre(iso, s.examDate);
                if (d < 1 || d > 5) continue;
              } else if (s.examDate && iso >= s.examDate) continue;

              if ((peSaptamana[`${s.id}_${cheiaSapt}`] || 0) >= limita[s.id]) continue;
              if (!potrivit(s, slot, strict)) continue;
              return s;
            }
            return null;
          };

          const ales = (precedent ? alege(true) : null) || alege(false);
          if (!ales) continue;

          propuneri.push({ studentId: ales.id, date: iso, startMin: slot, offWindow: !inFereastra(ales, slot) });
          ocupa(iso, slot, durata);
          areZiua[`${ales.id}_${iso}`] = true;
          (zileleLui[ales.id] = zileleLui[ales.id] || []).push(iso);
          ultimulDin[iso] = mod === 'harta' ? ales : (ales.area || '');
          peSaptamana[`${ales.id}_${cheiaSapt}`] = (peSaptamana[`${ales.id}_${cheiaSapt}`] || 0) + 1;
          ramase[ales.id]--;
        }
      }
      cursor = addDays(cursor, 7);
    }
  }

  // Prima trecere respectă ferestrele tuturor; a doua ridică cererea pentru cei
  // la care fereastra e doar dedusă din istoric.
  treceSaptamanile(true, 0, saptamani);
  treceSaptamanile(false, 0, saptamani);

  // Fără orizont fixat, mergem mai departe până se termină orele sau răbdarea.
  if (!ultimaZi) {
    let de = saptamani;
    while (sorted.some(s => ramase[s.id] > 0) && de < maxWeeksCap) {
      const inainte = propuneri.length;
      const pana = Math.min(maxWeeksCap, de + 8);
      treceSaptamanile(false, de, pana);
      if (propuneri.length === inainte) break;
      de = pana;
    }
  }

  const neterminati = sorted.filter(s => ramase[s.id] > 0)
    .map(s => ({ id: s.id, name: s.name, left: ramase[s.id] }));

  return { proposals: propuneri, unfinished: neterminati, horizonWeeks: saptamani };
}

/* ==================== MESAJELE CĂTRE ELEVI =============================== */

const doarCifre = (tel) => String(tel || '').replace(/\D/g, '').replace(/^0/, '40');
const telHref = (tel) => `tel:${String(tel || '').replace(/\s+/g, '')}`;
const waHref = (tel) => `https://wa.me/${doarCifre(tel)}`;
const waMsgHref = (tel, text) => `https://wa.me/${doarCifre(tel)}?text=${encodeURIComponent(text)}`;
const smsHref = (tel, text) => `sms:${String(tel || '').replace(/\s+/g, '')}?&body=${encodeURIComponent(text)}`;
const mailHref = (subiect, corp) => `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subiect)}&body=${encodeURIComponent(corp)}`;

const SUPPORT_EMAIL = 'contact.ias.auto@gmail.com';

// În mesaje folosim doar primul prenume — așa i se adresează omul, nu cu numele întreg.
function greetName(st) {
  if (!st) return '';
  const pren = (st.firstName || '').trim();
  if (pren) return pren.split(/\s+/)[0];
  const n = (st.name || '').trim();
  if (!n) return '';
  const parti = n.split(/\s+/);
  return parti[parti.length - 1];
}

/* Adresarea se acordă după cum e trecut elevul pe fișă: „Salut" la băieți,
   „Bună" la fete. Fără mențiune, ocolim acordul cu o formulare care merge la
   amândoi — mai bine neutru decât greșit. */
function adresare(st) {
  const sex = st && st.sex;
  if (sex === 'm') return { salut: 'Salut', cand: 'când ești disponibil' };
  if (sex === 'f') return { salut: 'Bună', cand: 'când ești disponibilă' };
  return { salut: 'Bună', cand: 'când poți' };
}

/* Mesajul de bun venit, scris o singură dată în Setări și trimis o singură dată
   fiecărui elev nou. Locurile marcate se completează singure. */
const BUN_VENIT_IMPLICIT = '{salut}, {prenume}! Numele meu este {eu} și te contactez din '
  + 'partea școlii {scoala}. Eu voi fi îndrumătorul tău pentru ședințele de conducere pe '
  + 'care le vei face la noi. Spune-mi, te rog, când ai fi {disponibil} pentru o primă întâlnire!';

function mesajBunVenit(student, settings) {
  const { salut, cand } = adresare(student);
  const sablon = (settings && settings.textBunVenit) || BUN_VENIT_IMPLICIT;
  return sablon
    .replace(/\{salut\}/g, salut)
    .replace(/\{prenume\}/g, greetName(student))
    .replace(/\{eu\}/g, (settings && settings.numeleTau) || '')
    .replace(/\{scoala\}/g, (settings && settings.numeScoala) || 'școala noastră')
    .replace(/\{disponibil\}/g, cand.replace(/^când (ești )?/, '') || 'disponibil');
}

/* Mesajele despre o ședință. Rămân editabile înainte de trimitere; locul apare
   îngroșat (WhatsApp îl scoate în evidență), cu harta pe rândul de dedesubt. */
function buildSessionMessage(kind, student, s, prev, settings) {
  const nume = greetName(student);
  const { salut, cand } = adresare(student);
  const ora = `${minToTime(s.startMin)}–${minToTime(s.startMin + (Number(s.duration) || SESSION_DURATION))}`;
  const pin = hartaScurt(locatiaDupaNume(settings, s.location), s.location);
  const loc = s.location ? `\nNe vedem la: *${s.location}*${pin ? `\n${pin}` : ''}` : '';
  const cere = 'Te rog să îmi confirmi în următoarea oră, ca să pot elibera locul dacă nu poți ajunge.';

  if (kind === 'created') {
    return `${salut}, ${nume}! Ți-am programat ședința de conducere ${fmtShort(s.date)}, ora ${ora}.${loc}\n${cere} Mulțumesc!`;
  }
  if (kind === 'rescheduled') {
    return `${salut}, ${nume}! Ședința ta de conducere a fost mutată de pe ${fmtShort(prev.date)}, ora ${minToTime(prev.startMin)}, pe ${fmtShort(s.date)}, ora ${ora}.${loc}\n${cere} Mulțumesc!`;
  }
  if (kind === 'cancelled') {
    return `${salut}, ${nume}! Am anulat ședința de conducere din ${fmtShort(s.date)}, ora ${minToTime(s.startMin)}, la cererea ta. Scrie-mi ${cand} ca să găsim altă oră. Mulțumesc!`;
  }
  if (kind === 'location') {
    return `${salut}, ${nume}! Ședința de ${fmtShort(s.date)}, ora ${ora}, rămâne la fel — se schimbă doar locul de întâlnire.${loc}\n${cere} Mulțumesc!`;
  }
  return '';
}

/* ==================== BANII DUȘI LA ȘCOALĂ =============================== */
/* Elevii plătesc, o parte din bani trec prin mâna instructorului, iar el îi duce
   mai departe la școală. Ce a fost achitat direct la casieria școlii nu intră
   aici — n-a trecut niciodată prin mâna lui. */

const totalVarsat = (lista) => (lista || []).reduce((s, v) => s + (Number(v.amount) || 0), 0);

const varsamintePeLuna = (data, monthKey) => (data.varsaminte || [])
  .filter(v => (v.date || '').startsWith(monthKey))
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

const incasatDeTineTotal = (data) => (data.students || []).reduce((sum, st) =>
  sum + (st.payments || []).filter(p => p.collector !== 'school')
    .reduce((s2, p) => s2 + (Number(p.amount) || 0), 0), 0);

const incasatDeTinePeLuna = (data, monthKey) => (data.students || []).reduce((sum, st) =>
  sum + (st.payments || []).filter(p => p.collector !== 'school' && (p.date || '').startsWith(monthKey))
    .reduce((s2, p) => s2 + (Number(p.amount) || 0), 0), 0);

const laScoalaPeLuna = (data, monthKey) => (data.students || []).reduce((sum, st) =>
  sum + (st.payments || []).filter(p => p.collector === 'school' && (p.date || '').startsWith(monthKey))
    .reduce((s2, p) => s2 + (Number(p.amount) || 0), 0), 0);

/* ==================== PRIMUL INTERVAL LIBER ============================== */

// Fișa unei ședințe noi se deschide direct pe prima oră liberă, ca să nu cauți.
function firstFreeSlot(sessions, settings, dinISO) {
  const acum = new Date();
  const aziISO = toISO(acum);
  const acumMin = acum.getHours() * 60 + acum.getMinutes();
  let zi = fromISO(dinISO || aziISO);
  for (let i = 0; i < 60; i++) {
    const iso = toISO(zi);
    if (iso >= aziISO && settings.workDays.includes(zi.getDay())) {
      for (const slot of daySlots(settings)) {
        if (iso === aziISO && slot <= acumMin) continue;
        if (!isOverlapping(sessions, iso, slot, null, settings)) return { date: iso, startMin: slot };
      }
    }
    zi = addDays(zi, 1);
  }
  return { date: dinISO || aziISO, startMin: settings.startMin };
}

// Elevii potriviți pentru un gol din calendar: cei care mai au ore de făcut și
// pot veni în ziua aceea, în ordinea priorității din planificator.
function eligibleStudentsForDay(data, dateISO) {
  return data.students
    .map(s => ({ s, free: studentPlannableRemaining(s, data.sessions, dateISO) }))
    .filter(({ s, free }) => free > 0 && eDisponibil(s)
      && studentAllowsDay(s, dateISO)
      && !hasSessionSameDay(data.sessions, s.id, dateISO, null))
    .sort((a, b) => {
      const ea = a.s.examDate || '9999-12-31';
      const eb = b.s.examDate || '9999-12-31';
      if (ea !== eb) return ea < eb ? -1 : 1;
      return b.free - a.free;
    })
    .map(({ s }) => s);
}

/* ==================== 4. ANTETUL 3D: GARAJUL ============================= */
/* Vehiculul din capul paginii se alege din Setări. Toate se construiesc din
   aceleași materiale și aceleași unelte, ca să pară ieșite din aceeași fabrică,
   și toate întorc același lucru: grupul de piese, roțile care se învârt și
   categoria de permis — după care se potrivesc remorcile și camera. */

/* Caseta de plafon, la cotele legale: 420 mm transversal, 380 mm față-spate,
   120 mm înălțime, cu inscripția de 300 × 90 mm. Pânza păstrează același raport
   (420:120), iar textul ocupă exact 71,4% din lățime și 75% din înălțime. */
const SEMN_MM = { lung: 420, lat: 380, inalt: 120, textLung: 300, textInalt: 90 };
const SCARA_MODEL = 0.9286;               // unități de model pentru un metru real
const mmModel = (v) => (v / 1000) * SCARA_MODEL;

const texSign = () => {
  const c = document.createElement('canvas');
  c.width = SEMN_MM.lung; c.height = SEMN_MM.inalt;
  const g = c.getContext('2d');
  g.fillStyle = '#f0a01c'; g.fillRect(0, 0, c.width, c.height);
  g.strokeStyle = '#7a4a05'; g.lineWidth = 6; g.strokeRect(3, 3, c.width - 6, c.height - 6);
  const lat = SEMN_MM.textLung; const inalt = SEMN_MM.textInalt;
  const y0 = (c.height - inalt) / 2;
  g.fillStyle = '#12161d'; g.textAlign = 'center'; g.textBaseline = 'middle';
  // literele se micșorează până încap fix în dreptunghiul de 300 × 90 mm
  let dim = inalt;
  do {
    g.font = `900 ${dim}px system-ui, -apple-system, sans-serif`;
    if (g.measureText('ȘCOALĂ').width <= lat) break;
    dim -= 2;
  } while (dim > 20);
  g.fillText('ȘCOALĂ', c.width / 2, y0 + inalt / 2 + inalt * 0.04);
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  return t;
};

const texPlate = () => {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 112;
  const g = c.getContext('2d');
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, 512, 112);
  g.fillStyle = '#00308f'; g.fillRect(0, 0, 76, 112);
  g.fillStyle = '#ffcc00';
  for (let i = 0; i < 12; i++) {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    g.beginPath(); g.arc(38 + 21 * Math.cos(a), 40 + 21 * Math.sin(a), 3.4, 0, Math.PI * 2); g.fill();
  }
  g.fillStyle = '#ffffff'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '800 26px system-ui, sans-serif'; g.fillText('RO', 38, 92);
  g.fillStyle = '#0b1220'; g.font = "800 74px 'Arial Narrow', system-ui, sans-serif";
  g.fillText('B 01 IAS', 300, 58);
  g.strokeStyle = '#0b1220'; g.lineWidth = 9; g.strokeRect(4, 4, 504, 104);
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  return t;
};

const texShadow = () => {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  grd.addColorStop(0, 'rgba(0,0,0,0.78)');
  grd.addColorStop(0.55, 'rgba(0,0,0,0.34)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
};

/* Fără reflexii, orice vopsea arată ca lemnul vopsit. Construim un mediu simplu
   — cer luminos sus, asfalt jos, o dungă de lumină la orizont — și îl dăm scenei
   ca hartă de reflexie. E singurul lucru care face tabla să pară tablă. */
function texMediu(sus, mijloc, jos) {
  const fete = [];
  for (let i = 0; i < 6; i++) {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 128;
    const g = c.getContext('2d');
    if (i === 2) { g.fillStyle = sus; g.fillRect(0, 0, 128, 128); }        // cerul
    else if (i === 3) { g.fillStyle = jos; g.fillRect(0, 0, 128, 128); }   // asfaltul
    else {
      const grd = g.createLinearGradient(0, 0, 0, 128);
      grd.addColorStop(0, sus);
      grd.addColorStop(0.46, mijloc);
      grd.addColorStop(0.5, '#ffffff');      // dunga de lumină de la orizont
      grd.addColorStop(0.56, mijloc);
      grd.addColorStop(1, jos);
      g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    }
    fete.push(c);
  }
  const t = new THREE.CubeTexture(fete);
  t.needsUpdate = true;
  t.encoding = THREE.sRGBEncoding;
  return t;
}

// Fasciculul așternut pe asfalt: plin lângă far, stins în depărtare.
const texFascicul = () => {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createLinearGradient(0, 0, 256, 0);
  grd.addColorStop(0, 'rgba(255,255,255,0.95)');
  grd.addColorStop(0.4, 'rgba(255,255,255,0.42)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 256, 128);
  // marginile laterale se sting, ca fasciculul să nu aibă muchii tăiate
  g.globalCompositeOperation = 'destination-out';
  [[0, 26, 0, 1], [102, 128, 1, 0]].forEach(([y0, y1, a0, a1]) => {
    const v = g.createLinearGradient(0, y0, 0, y1);
    v.addColorStop(0, `rgba(0,0,0,${a0})`);
    v.addColorStop(1, `rgba(0,0,0,${a1})`);
    g.fillStyle = v; g.fillRect(0, y0, 256, y1 - y0);
  });
  g.globalCompositeOperation = 'source-over';
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  return t;
};

/* Trapezul de lumină, construit direct culcat pe asfalt: vârful lipit de far,
   baza departe. Nicio rotație de ghicit, deci nu poate ieși invers. */
function geoFascicul(lung, latMic, latMare) {
  const sh = new THREE.Shape();
  sh.moveTo(0, -latMic / 2);
  sh.lineTo(lung, -latMare / 2);
  sh.lineTo(lung, latMare / 2);
  sh.lineTo(0, latMic / 2);
  sh.lineTo(0, -latMic / 2);
  const g = new THREE.ShapeGeometry(sh, 1);
  const pos = g.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = pos.getX(i) / lung;                       // 0 la vehicul, 1 departe
    uv[i * 2 + 1] = (pos.getY(i) + latMare / 2) / latMare;
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.rotateX(-Math.PI / 2);
  return g;
}

/* Silueta unui vehicul, desenată din câteva puncte și trasă în adâncime.
   Perechile de patru numere sunt curbe, cele de două sunt linii drepte. */
function profil(puncte, adancime, tesitura) {
  const sh = new THREE.Shape();
  sh.moveTo(puncte[0][0], puncte[0][1]);
  for (let i = 1; i < puncte.length; i++) {
    const p = puncte[i];
    if (p.length === 4) sh.quadraticCurveTo(p[0], p[1], p[2], p[3]);
    else sh.lineTo(p[0], p[1]);
  }
  const t = tesitura == null ? 0.05 : tesitura;
  const g = new THREE.ExtrudeGeometry(sh, {
    depth: adancime, bevelEnabled: t > 0, bevelThickness: t, bevelSize: t,
    bevelSegments: 4, curveSegments: 20, steps: 1,
  });
  g.translate(0, 0, -adancime / 2);
  return g;
}

// Rombul de pe grilă și de pe hayon.
function rombGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.115); s.lineTo(0.075, 0); s.lineTo(0, -0.115); s.lineTo(-0.075, 0); s.lineTo(0, 0.115);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: false, steps: 1 });
  g.rotateY(Math.PI / 2);
  return g;
}

/* Unelte comune tuturor vehiculelor: roata, caseta, plăcuța, o cutie. */
function atelier(m) {
  const roataGeo = (r, lat) => new THREE.CylinderGeometry(r, r, lat, 24);
  return {
    // roată completă: anvelopă, jantă și cinci goluri între spițe
    roata(grup, roti, x, y, z, r, lat) {
      const g = new THREE.Group();
      const anv = new THREE.Mesh(roataGeo(r, lat), m.tyreM); anv.rotation.x = Math.PI / 2;
      const janta = new THREE.Mesh(roataGeo(r * 0.58, lat * 1.04), m.hubM); janta.rotation.x = Math.PI / 2;
      g.add(anv); g.add(janta);
      const golGeo = new THREE.BoxGeometry(r * 0.31, r * 0.15, lat * 1.1);
      for (let k = 0; k < 5; k++) {
        const gol = new THREE.Mesh(golGeo, m.tyreM);
        const a = (k / 5) * Math.PI * 2;
        gol.position.set(Math.cos(a) * r * 0.31, Math.sin(a) * r * 0.31, 0);
        gol.rotation.z = a; gol.rotation.x = Math.PI / 2;
        g.add(gol); roti.push(gol);
      }
      g.position.set(x, y, z);
      grup.add(g);
      roti.push(anv, janta);
      return g;
    },
    caseta(grup, x, y, z) {
      [0.13, -0.13].forEach((dz) => {
        const pic = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.04, 0.05), m.darkM);
        pic.position.set(x, y - 0.02, z + dz); grup.add(pic);
      });
      const c = new THREE.Mesh(
        new THREE.BoxGeometry(mmModel(SEMN_MM.lat), mmModel(SEMN_MM.inalt), mmModel(SEMN_MM.lung)),
        [m.signM, m.signM, m.amberM, m.amberM, m.amberM, m.amberM],
      );
      c.position.set(x, y + mmModel(SEMN_MM.inalt) / 2 + 0.02, z);
      grup.add(c);
      return c;
    },
    placuta(grup, x, y, z, spate) {
      const g = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 0.115, 0.52),
        spate
          ? [m.darkM, m.plateM, m.darkM, m.darkM, m.darkM, m.darkM]
          : [m.plateM, m.darkM, m.darkM, m.darkM, m.darkM, m.darkM],
      );
      g.position.set(x, y, z); grup.add(g);
      return g;
    },
    cutie(grup, w, h, d, mat, x, y, z) {
      const g = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      g.position.set(x, y, z); grup.add(g);
      return g;
    },
    arcada(grup, x, sz, raza) {
      const a = new THREE.Mesh(new THREE.TorusGeometry(raza || 0.45, 0.055, 8, 20, Math.PI), m.darkM);
      a.position.set(x, 0.37, sz); grup.add(a);
      return a;
    },
  };
}

/* ------------------------------ VEHICULELE ------------------------------- */

// Hatchback — mașina de școală obișnuită, categoria B. Proporțiile unui Clio:
// 3,8 m lungime, 1,55 m lățime, 1,66 m înălțime.
function vehiculHatchback(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);

  g.add(new THREE.Mesh(profil([
    [-1.76, 0.28], [1.56, 0.28], [1.78, 0.30, 1.82, 0.48], [1.84, 0.68, 1.62, 0.78],
    [1.26, 0.82], [0.98, 0.84, 0.72, 0.92], [-0.98, 1.02],
    [-1.42, 1.02, -1.67, 0.86], [-1.82, 0.72, -1.84, 0.48], [-1.84, 0.34, -1.76, 0.28],
  ], 1.42, 0.055), m.paint));                                   // tabla, până la brâu

  g.add(new THREE.Mesh(profil([
    [-1.18, 0.91], [-0.94, 1.13], [-0.66, 1.55, -0.20, 1.62], [0.42, 1.58],
    [0.76, 1.53, 1.03, 1.18], [1.22, 0.91], [-1.18, 0.91],
  ], 1.20, 0.035), m.glassM));                                  // parbriz, plafon, lunetă

  // geamurile laterale, lipite pe fețele habitaclului: de aici plafonul plutitor
  const geam = profil([
    [-1.03, 0], [-0.76, 0.38], [-0.58, 0.58, -0.28, 0.62], [0.27, 0.59],
    [0.56, 0.55, 0.79, 0.30], [1.02, 0], [-1.03, 0],
  ], 0.028, 0.012);
  [0.648, -0.676].forEach((z) => { const x = new THREE.Mesh(geam, m.sideGlassM); x.position.set(-0.02, 0.99, z); g.add(x); });
  [0.664, -0.664].forEach((z) => a.cutie(g, 1.84, 0.026, 0.016, m.chromeM, -0.04, 1.05, z));

  const plafon = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.05, 1.00), m.paint);
  plafon.position.set(0.06, 1.632, 0); g.add(plafon);

  [[1.04, 0.772], [1.04, -0.772], [-1.06, 0.772], [-1.06, -0.772]].forEach(([x, z]) => a.arcada(g, x, z));
  a.cutie(g, 2.60, 0.05, 1.50, m.amberM, -0.06, 0.79, 0);       // dunga de caroserie
  a.cutie(g, 2.86, 0.12, 1.47, m.darkM, -0.05, 0.335, 0);       // pragul

  // fața: grilă cu romb, faruri cu lentilă mare și semnătura luminoasă
  a.cutie(g, 0.05, 0.15, 0.80, m.darkM, 1.808, 0.88, 0);
  a.cutie(g, 0.05, 0.10, 0.62, m.darkM, 1.845, 0.62, 0);
  a.cutie(g, 0.06, 0.045, 0.80, m.darkM, 1.862, 0.50, 0);
  const romb = rombGeometry();
  const r1 = new THREE.Mesh(romb, m.chromeM); r1.position.set(1.842, 0.88, 0); g.add(r1);
  [0.44, -0.44].forEach((z) => {
    a.cutie(g, 0.07, 0.15, 0.38, m.darkM, 1.798, 0.97, z);
    a.cutie(g, 0.05, 0.115, 0.33, m.headM, 1.836, 0.97, z);
    a.cutie(g, 0.03, 0.022, 0.30, m.ledM, 1.856, 1.028, z);
    a.cutie(g, 0.03, 0.075, 0.024, m.ledM, 1.856, 0.985, z + (z > 0 ? 0.146 : -0.146));
    a.cutie(g, 0.035, 0.05, 0.14, m.darkM, 1.858, 0.60, z + (z > 0 ? 0.06 : -0.06));
  });

  // spatele: lămpi verticale în colțuri, a treia lampă de frână, eleron
  [0.60, -0.60].forEach((z) => {
    a.cutie(g, 0.07, 0.30, 0.13, m.darkM, -1.775, 0.86, z);
    a.cutie(g, 0.045, 0.26, 0.10, m.tailM, -1.805, 0.86, z);
  });
  a.cutie(g, 0.05, 0.05, 0.34, m.tailM, -1.80, 1.04, 0);
  a.cutie(g, 0.09, 0.05, 0.90, m.darkM, -1.70, 1.10, 0);
  const r2 = new THREE.Mesh(romb, m.chromeM); r2.position.set(-1.812, 0.72, 0); g.add(r2);

  // oglinzi și mânere
  [0.66, -0.66].forEach((z) => {
    const brat = a.cutie(g, 0.17, 0.06, 0.11, m.darkM, 0.53, 1.17, z);
    brat.rotation.x = z > 0 ? 0.12 : -0.12;
    a.cutie(g, 0.05, 0.032, 0.17, m.chromeM, 0.39, 1.11, z);
  });
  [0.795, -0.795].forEach((z) => a.cutie(g, 0.14, 0.035, 0.03, m.chromeM, 0.58, 0.90, z));
  [0.672, -0.672].forEach((z) => a.cutie(g, 0.05, 0.10, 0.03, m.chromeM, -0.88, 1.22, z));

  a.caseta(g, 0.06, 1.752, 0);
  a.placuta(g, 1.878, 0.44, 0, false);
  a.placuta(g, -1.872, 0.50, 0, true);
  [[1.04, 0.70], [1.04, -0.70], [-1.06, 0.70], [-1.06, -0.70]].forEach(([x, z]) => a.roata(g, roti, x, 0.37, z, 0.37, 0.26));

  return { grup: g, roti, categorie: 'B' };
}

// Sedan — trei volume, portbagajul desprins de habitaclu.
function vehiculSedan(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  g.add(new THREE.Mesh(profil([
    [-2.10, 0.28], [1.70, 0.28], [1.94, 0.30, 1.96, 0.54], [1.96, 0.74, 1.80, 0.82],
    [1.40, 0.90, 1.02, 0.96], [-1.30, 1.00], [-1.92, 1.00, -2.10, 0.88],
    [-2.20, 0.74, -2.20, 0.50], [-2.18, 0.30, -2.10, 0.28],
  ], 1.44, 0.06), m.paint));
  g.add(new THREE.Mesh(profil([
    [-1.12, 0.94], [-0.92, 1.20, -0.52, 1.30], [0.28, 1.30], [0.72, 1.26, 0.98, 0.94], [-1.12, 0.94],
  ], 1.24, 0.03), m.glassM));
  const plafon = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.05, 1.06), m.paint);
  plafon.position.set(-0.10, 1.315, 0); g.add(plafon);
  [[1.14, 0.75], [1.14, -0.75], [-1.14, 0.75], [-1.14, -0.75]].forEach(([x, z]) => a.arcada(g, x, z));
  a.cutie(g, 2.7, 0.05, 1.42, m.amberM, -0.06, 0.79, 0);
  a.cutie(g, 2.9, 0.12, 1.40, m.darkM, -0.05, 0.335, 0);
  a.cutie(g, 0.05, 0.15, 0.82, m.darkM, 1.94, 0.86, 0);
  const romb = rombGeometry();
  const r1 = new THREE.Mesh(romb, m.chromeM); r1.position.set(1.955, 0.86, 0); g.add(r1);
  [0.44, -0.44].forEach((z) => {
    a.cutie(g, 0.06, 0.13, 0.36, m.darkM, 1.93, 0.94, z);
    a.cutie(g, 0.045, 0.10, 0.31, m.headM, 1.962, 0.94, z);
    a.cutie(g, 0.03, 0.02, 0.28, m.ledM, 1.975, 0.995, z);
  });
  [0.55, -0.55].forEach((z) => {
    a.cutie(g, 0.06, 0.14, 0.34, m.darkM, -2.14, 0.86, z);
    a.cutie(g, 0.04, 0.11, 0.30, m.tailM, -2.17, 0.86, z);
  });
  [0.72, -0.72].forEach((z) => {
    const brat = a.cutie(g, 0.16, 0.06, 0.10, m.darkM, 0.52, 1.10, z);
    brat.rotation.x = z > 0 ? 0.12 : -0.12;
  });
  [0.80, -0.80].forEach((z) => a.cutie(g, 0.14, 0.035, 0.03, m.chromeM, 0.30, 0.90, z));
  a.placuta(g, 1.985, 0.44, 0, false);
  a.placuta(g, -2.19, 0.50, 0, true);
  a.caseta(g, -0.10, 1.40, 0);
  [[1.14, 0.72], [1.14, -0.72], [-1.14, 0.72], [-1.14, -0.72]].forEach(([x, z]) => a.roata(g, roti, x, 0.37, z, 0.37, 0.26));
  return { grup: g, roti, categorie: 'B' };
}

// Break — același bot, dar acoperișul merge până în capătul din spate.
function vehiculBreak(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  g.add(new THREE.Mesh(profil([
    [-2.16, 0.28], [1.70, 0.28], [1.94, 0.30, 1.96, 0.54], [1.96, 0.74, 1.80, 0.82],
    [1.40, 0.90, 1.02, 0.96], [-1.60, 1.02], [-2.10, 1.02, -2.22, 0.90],
    [-2.30, 0.76, -2.28, 0.50], [-2.26, 0.30, -2.16, 0.28],
  ], 1.46, 0.06), m.paint));
  g.add(new THREE.Mesh(profil([
    [-2.14, 0.96], [-2.16, 1.34, -2.04, 1.40], [-0.30, 1.44], [0.34, 1.40, 0.98, 0.96], [-2.14, 0.96],
  ], 1.26, 0.03), m.glassM));
  const plafon = new THREE.Mesh(new THREE.BoxGeometry(2.10, 0.06, 1.08), m.paint);
  plafon.position.set(-0.90, 1.455, 0); g.add(plafon);
  [0.50, -0.50].forEach((z) => a.cutie(g, 1.90, 0.05, 0.06, m.darkM, -0.90, 1.51, z));  // barele de plafon
  [[1.16, 0.76], [1.16, -0.76], [-1.24, 0.76], [-1.24, -0.76]].forEach(([x, z]) => a.arcada(g, x, z));
  a.cutie(g, 2.9, 0.05, 1.44, m.amberM, -0.10, 0.79, 0);
  a.cutie(g, 3.1, 0.12, 1.42, m.darkM, -0.10, 0.335, 0);
  a.cutie(g, 0.05, 0.15, 0.82, m.darkM, 1.94, 0.86, 0);
  const r1 = new THREE.Mesh(rombGeometry(), m.chromeM); r1.position.set(1.955, 0.86, 0); g.add(r1);
  [0.44, -0.44].forEach((z) => {
    a.cutie(g, 0.06, 0.13, 0.36, m.darkM, 1.93, 0.94, z);
    a.cutie(g, 0.045, 0.10, 0.31, m.headM, 1.962, 0.94, z);
    a.cutie(g, 0.03, 0.02, 0.28, m.ledM, 1.975, 0.995, z);
  });
  [0.58, -0.58].forEach((z) => {
    a.cutie(g, 0.07, 0.32, 0.13, m.darkM, -2.24, 0.90, z);
    a.cutie(g, 0.045, 0.28, 0.10, m.tailM, -2.27, 0.90, z);
  });
  [0.72, -0.72].forEach((z) => {
    const brat = a.cutie(g, 0.16, 0.06, 0.10, m.darkM, 0.52, 1.14, z);
    brat.rotation.x = z > 0 ? 0.12 : -0.12;
  });
  a.placuta(g, 1.985, 0.44, 0, false);
  a.placuta(g, -2.28, 0.52, 0, true);
  a.caseta(g, -0.30, 1.49, 0);
  [[1.16, 0.73], [1.16, -0.73], [-1.24, 0.73], [-1.24, -0.73]].forEach(([x, z]) => a.roata(g, roti, x, 0.37, z, 0.37, 0.26));
  return { grup: g, roti, categorie: 'B' };
}

// SUV — mai înalt, cu gardă la sol mare, praguri late și roți de 45 cm.
function vehiculSUV(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  g.add(new THREE.Mesh(profil([
    [-2.00, 0.42], [1.72, 0.42], [1.96, 0.44, 1.99, 0.68], [2.00, 0.92, 1.82, 1.02],
    [1.42, 1.08, 1.06, 1.14], [-1.10, 1.20], [-1.70, 1.20, -1.94, 1.06],
    [-2.08, 0.92, -2.08, 0.62], [-2.06, 0.44, -2.00, 0.42],
  ], 1.56, 0.06), m.paint));
  g.add(new THREE.Mesh(profil([
    [-1.36, 1.12], [-1.20, 1.42, -0.86, 1.56], [-0.10, 1.60], [0.52, 1.56, 1.00, 1.16], [1.18, 1.12], [-1.36, 1.12],
  ], 1.34, 0.035), m.glassM));
  const plafon = new THREE.Mesh(new THREE.BoxGeometry(1.30, 0.06, 1.14), m.paint);
  plafon.position.set(-0.24, 1.60, 0); g.add(plafon);
  [0.50, -0.50].forEach((z) => a.cutie(g, 1.10, 0.05, 0.07, m.darkM, -0.24, 1.66, z));   // barele de plafon
  [[1.16, 1], [1.16, -1], [-1.20, 1], [-1.20, -1]].forEach(([x, sz]) => {
    const arc = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.07, 8, 20, Math.PI), m.darkM);
    arc.position.set(x, 0.45, sz * 0.84); g.add(arc);
  });
  a.cutie(g, 2.9, 0.16, 1.54, m.darkM, -0.06, 0.40, 0);        // pragul lat
  a.cutie(g, 2.7, 0.05, 1.58, m.amberM, -0.06, 0.98, 0);
  a.cutie(g, 0.06, 0.22, 0.92, m.darkM, 1.97, 1.02, 0);        // grila înaltă
  a.cutie(g, 0.06, 0.14, 0.70, m.darkM, 1.99, 0.66, 0);
  a.cutie(g, 0.08, 0.06, 1.10, m.chromeM, 2.00, 0.52, 0);      // scutul de sub bară
  const r1 = new THREE.Mesh(rombGeometry(), m.chromeM); r1.position.set(2.01, 1.02, 0); g.add(r1);
  [0.50, -0.50].forEach((z) => {
    a.cutie(g, 0.07, 0.16, 0.40, m.darkM, 1.96, 1.10, z);
    a.cutie(g, 0.05, 0.12, 0.34, m.headM, 1.995, 1.10, z);
    a.cutie(g, 0.03, 0.024, 0.32, m.ledM, 2.01, 1.17, z);
    a.cutie(g, 0.04, 0.06, 0.16, m.ledM, 2.00, 0.70, z + (z > 0 ? 0.10 : -0.10));
  });
  [0.62, -0.62].forEach((z) => {
    a.cutie(g, 0.08, 0.30, 0.16, m.darkM, -2.04, 1.04, z);
    a.cutie(g, 0.05, 0.26, 0.13, m.tailM, -2.07, 1.04, z);
  });
  a.cutie(g, 0.08, 0.06, 1.20, m.chromeM, -2.06, 0.52, 0);     // scutul din spate
  [0.78, -0.78].forEach((z) => {
    const brat = a.cutie(g, 0.18, 0.07, 0.12, m.darkM, 0.60, 1.34, z);
    brat.rotation.x = z > 0 ? 0.12 : -0.12;
  });
  [0.86, -0.86].forEach((z) => a.cutie(g, 0.15, 0.04, 0.03, m.chromeM, 0.50, 1.08, z));
  a.placuta(g, 2.02, 0.62, 0, false);
  a.placuta(g, -2.09, 0.68, 0, true);
  a.caseta(g, -0.24, 1.66, 0);
  [[1.16, 0.80], [1.16, -0.80], [-1.20, 0.80], [-1.20, -0.80]].forEach(([x, z]) => a.roata(g, roti, x, 0.45, z, 0.45, 0.30));
  return { grup: g, roti, categorie: 'B' };
}

// Mașinuță ușoară — cvadriciclul de la 16 ani, categoria B1.
function vehiculMica(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  g.add(new THREE.Mesh(profil([
    [-1.20, 0.26], [1.06, 0.26], [1.24, 0.28, 1.26, 0.48], [1.26, 0.64, 1.10, 0.72],
    [0.72, 0.78, 0.44, 0.82], [-0.86, 0.86], [-1.20, 0.86, -1.30, 0.72],
    [-1.36, 0.58, -1.34, 0.38], [-1.32, 0.27, -1.20, 0.26],
  ], 1.16, 0.05), m.paint));
  g.add(new THREE.Mesh(profil([
    [-1.02, 0.80], [-0.92, 1.16, -0.60, 1.24], [0.10, 1.24], [0.42, 1.18, 0.62, 0.80], [-1.02, 0.80],
  ], 1.02, 0.03), m.glassM));
  const plafon = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.05, 0.88), m.paint);
  plafon.position.set(-0.28, 1.255, 0); g.add(plafon);
  [[0.74, 1], [0.74, -1], [-0.78, 1], [-0.78, -1]].forEach(([x, sz]) => {
    const arc = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 8, 18, Math.PI), m.darkM);
    arc.position.set(x, 0.28, sz * 0.62); g.add(arc);
  });
  a.cutie(g, 1.7, 0.04, 1.14, m.amberM, -0.10, 0.66, 0);
  a.cutie(g, 1.9, 0.10, 1.12, m.darkM, -0.10, 0.30, 0);
  a.cutie(g, 0.05, 0.12, 0.60, m.darkM, 1.24, 0.60, 0);
  [0.32, -0.32].forEach((z) => {
    a.cutie(g, 0.05, 0.11, 0.24, m.darkM, 1.22, 0.66, z);
    a.cutie(g, 0.04, 0.085, 0.20, m.headM, 1.25, 0.66, z);
  });
  [0.40, -0.40].forEach((z) => a.cutie(g, 0.045, 0.16, 0.10, m.tailM, -1.34, 0.72, z));
  [0.58, -0.58].forEach((z) => a.cutie(g, 0.12, 0.05, 0.09, m.darkM, 0.38, 0.98, z));
  a.placuta(g, 1.27, 0.36, 0, false);
  a.placuta(g, -1.35, 0.42, 0, true);
  a.caseta(g, -0.28, 1.29, 0);
  [[0.74, 0.58], [0.74, -0.58], [-0.78, 0.58], [-0.78, -0.58]].forEach(([x, z]) => a.roata(g, roti, x, 0.28, z, 0.28, 0.20));
  return { grup: g, roti, categorie: 'B1' };
}

// Motocicletă — categoria A. Atașul se adaugă la cerere, pentru cei care învață cu el.
function construiesteMoto(m, cuAtas) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  g.add(new THREE.Mesh(profil([
    [-0.62, 0.62], [-0.10, 0.70], [0.34, 0.86, 0.62, 0.88], [0.74, 0.86, 0.78, 0.74],
    [0.72, 0.62, 0.40, 0.58], [-0.20, 0.54], [-0.62, 0.56], [-0.62, 0.62],
  ], 0.30, 0.04), m.paint));                                   // cadrul și rezervorul
  a.cutie(g, 0.50, 0.10, 0.26, m.darkM, -0.46, 0.74, 0);       // șaua
  a.cutie(g, 0.18, 0.30, 0.22, m.darkM, 0.12, 0.42, 0);        // motorul
  a.cutie(g, 0.30, 0.06, 0.10, m.chromeM, -0.30, 0.34, 0.12);  // toba
  a.cutie(g, 0.06, 0.44, 0.06, m.darkM, 0.74, 0.44, 0);        // furca
  a.cutie(g, 0.05, 0.34, 0.06, m.darkM, -0.70, 0.44, 0);       // amortizorul spate
  a.cutie(g, 0.07, 0.05, 0.60, m.darkM, 0.70, 1.00, 0);        // ghidonul
  [0.26, -0.26].forEach((z) => a.cutie(g, 0.05, 0.05, 0.09, m.darkM, 0.70, 1.00, z));  // manetele
  a.cutie(g, 0.10, 0.16, 0.18, m.headM, 0.82, 0.86, 0);        // farul
  a.cutie(g, 0.06, 0.09, 0.14, m.tailM, -0.86, 0.78, 0);       // stopul
  a.cutie(g, 0.30, 0.05, 0.34, m.darkM, -0.78, 0.90, 0);       // portbagajul
  // caseta stă pe portbagaj, mai mică decât la mașini
  const cas = new THREE.Mesh(
    new THREE.BoxGeometry(mmModel(300), mmModel(100), mmModel(340)),
    [m.signM, m.signM, m.amberM, m.amberM, m.amberM, m.amberM],
  );
  cas.position.set(-0.78, 0.98, 0); g.add(cas);
  a.placuta(g, -0.90, 0.62, 0, true);
  a.roata(g, roti, 0.76, 0.34, 0, 0.34, 0.14);
  a.roata(g, roti, -0.72, 0.34, 0, 0.34, 0.16);

  if (cuAtas) {
    const at = new THREE.Group();
    at.add(new THREE.Mesh(profil([
      [-0.60, 0.30], [0.44, 0.30], [0.62, 0.34, 0.62, 0.52], [0.60, 0.66, 0.36, 0.70],
      [-0.30, 0.72], [-0.60, 0.70, -0.66, 0.56], [-0.68, 0.42, -0.60, 0.30],
    ], 0.56, 0.05), m.paint));
    a.cutie(at, 0.50, 0.06, 0.50, m.darkM, -0.14, 0.72, 0);    // locul pasagerului
    a.cutie(at, 0.05, 0.08, 0.12, m.tailM, -0.70, 0.58, 0);
    a.cutie(at, 0.08, 0.10, 0.12, m.headM, 0.62, 0.56, 0);
    a.roata(at, roti, -0.10, 0.28, 0.34, 0.28, 0.14);
    [0.34, -0.30].forEach((x) => a.cutie(at, 0.06, 0.05, 0.44, m.darkM, x, 0.50, -0.42));  // brațele
    at.position.set(0.02, 0, -0.66);
    g.add(at);
  }
  return { grup: g, roti, categorie: 'A' };
}

// Cap tractor — categoria C, cu șaua de cuplare pentru semiremorcă.
function vehiculCamion(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  g.add(new THREE.Mesh(profil([
    [-1.00, 0.55], [1.42, 0.55], [1.56, 0.58, 1.58, 0.78], [1.58, 1.20], [1.52, 2.28],
    [1.40, 2.46, 1.10, 2.50], [-0.90, 2.50], [-1.00, 2.44], [-1.00, 0.55],
  ], 2.30, 0.07), m.paint));                                   // cabina
  a.cutie(g, 0.06, 0.82, 2.06, m.glassM, 1.53, 1.92, 0);       // parbrizul
  [1.14, -1.14].forEach((z) => a.cutie(g, 1.10, 0.66, 0.05, m.glassM, 0.80, 1.86, z));
  a.cutie(g, 0.30, 1.30, 2.36, m.darkM, -1.05, 1.60, 0);       // spatele cabinei
  a.cutie(g, 1.10, 0.16, 2.20, m.darkM, 0.30, 0.50, 0);        // șasiul
  a.cutie(g, 0.60, 0.10, 1.00, m.darkM, -1.30, 1.05, 0);       // șaua de cuplare
  a.cutie(g, 0.12, 0.30, 2.30, m.darkM, 1.60, 0.80, 0);        // bara față
  a.cutie(g, 0.08, 0.34, 1.30, m.darkM, 1.58, 1.30, 0);        // grila
  a.cutie(g, 0.06, 0.10, 1.60, m.chromeM, 1.62, 1.52, 0);      // bagheta de sub parbriz
  [0.78, -0.78].forEach((z) => {
    a.cutie(g, 0.09, 0.26, 0.46, m.darkM, 1.575, 0.92, z);
    a.cutie(g, 0.05, 0.20, 0.40, m.headM, 1.62, 0.92, z);
  });
  [0.86, -0.86].forEach((z) => a.cutie(g, 0.07, 0.16, 0.24, m.tailM, -1.06, 0.80, z));
  [1.02, -1.02].forEach((z) => {
    a.cutie(g, 0.16, 0.60, 0.10, m.darkM, 1.28, 2.00, z);      // oglinzile înalte
    a.cutie(g, 0.06, 0.50, 0.06, m.darkM, 1.34, 2.00, z);
  });
  a.cutie(g, 0.24, 0.90, 0.24, m.chromeM, -0.90, 1.05, 1.14);  // toba verticală
  [0.90, -0.90].forEach((z) => a.cutie(g, 0.40, 0.12, 0.16, m.darkM, 1.20, 0.66, z));  // treptele
  a.placuta(g, 1.66, 0.66, 0, false);
  a.caseta(g, 0.20, 2.52, 0);
  [[1.10, 1.02], [1.10, -1.02], [-0.70, 1.02], [-0.70, -1.02], [-1.20, 1.02], [-1.20, -1.02]]
    .forEach(([x, z]) => a.roata(g, roti, x, 0.55, z, 0.55, 0.34));
  return { grup: g, roti, categorie: 'C' };
}

// Autobuz — categoria D.
function vehiculAutobuz(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  g.add(new THREE.Mesh(profil([
    [-4.20, 0.50], [4.10, 0.50], [4.32, 0.54, 4.34, 0.78], [4.34, 2.70],
    [4.20, 2.92, 3.90, 2.94], [-3.90, 2.94], [-4.24, 2.90, -4.32, 2.66],
    [-4.34, 0.80, -4.30, 0.60], [-4.28, 0.50, -4.20, 0.50],
  ], 2.44, 0.08), m.paint));
  a.cutie(g, 0.07, 1.20, 2.24, m.glassM, 4.33, 2.10, 0);        // parbrizul
  a.cutie(g, 0.07, 1.00, 2.24, m.glassM, -4.33, 2.10, 0);       // luneta
  [1.22, -1.22].forEach((z) => a.cutie(g, 7.4, 0.94, 0.05, m.glassM, -0.10, 2.14, z));
  [1.24, -1.24].forEach((z) => a.cutie(g, 7.6, 0.05, 0.05, m.chromeM, -0.10, 1.62, z));  // bagheta
  a.cutie(g, 8.6, 0.10, 2.40, m.amberM, -0.05, 1.42, 0);
  a.cutie(g, 8.7, 0.24, 2.36, m.darkM, -0.05, 0.60, 0);
  [2.60, -1.20].forEach((x) => a.cutie(g, 1.00, 1.60, 0.06, m.glassM, x, 1.60, 1.23));   // ușile
  [0.80, -0.80].forEach((z) => {
    a.cutie(g, 0.09, 0.26, 0.44, m.darkM, 4.34, 1.00, z);
    a.cutie(g, 0.05, 0.20, 0.38, m.headM, 4.38, 1.00, z);
  });
  [0.86, -0.86].forEach((z) => a.cutie(g, 0.06, 0.30, 0.24, m.tailM, -4.36, 1.10, z));
  [1.28, -1.28].forEach((z) => a.cutie(g, 0.18, 0.50, 0.10, m.darkM, 3.90, 2.40, z));    // oglinzile
  a.placuta(g, 4.40, 0.74, 0, false);
  a.caseta(g, 0.20, 2.96, 0);
  [[2.90, 1.10], [2.90, -1.10], [-2.40, 1.10], [-2.40, -1.10]]
    .forEach(([x, z]) => a.roata(g, roti, x, 0.52, z, 0.52, 0.30));
  return { grup: g, roti, categorie: 'D' };
}

/* ------------------------------- REMORCILE ------------------------------- */

// Remorcă ușoară, cu obloane — cea de sub 750 kg, pentru categoria B.
function remorcaUsoara(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  a.cutie(g, 1.70, 0.10, 1.30, m.darkM, 0, 0.52, 0);                        // podeaua
  [0.86, -0.86].forEach((x) => a.cutie(g, 0.06, 0.34, 1.30, m.paint, x, 0.72, 0));
  [0.65, -0.65].forEach((z) => a.cutie(g, 1.72, 0.34, 0.06, m.paint, 0, 0.72, z));
  [0.55, -0.55].forEach((z) => a.cutie(g, 0.06, 0.10, 0.14, m.tailM, -0.90, 0.62, z));
  a.placuta(g, -0.92, 0.42, 0, true);
  [0.72, -0.72].forEach((z) => a.roata(g, roti, 0, 0.30, z, 0.30, 0.20));
  return { grup: g, roti, lungime: 1.9 };
}

// Platformă deschisă, cu prelata strânsă — pentru categoria BE.
function remorcaPlatforma(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  a.cutie(g, 2.90, 0.12, 1.60, m.darkM, 0, 0.58, 0);
  [0.80, -0.80].forEach((z) => a.cutie(g, 2.92, 0.22, 0.07, m.paint, 0, 0.74, z));
  a.cutie(g, 0.07, 0.22, 1.60, m.paint, -1.46, 0.74, 0);
  a.cutie(g, 2.60, 0.16, 1.30, m.amberM, 0, 0.94, 0);                       // prelata strânsă
  [0.68, -0.68].forEach((z) => a.cutie(g, 0.07, 0.12, 0.16, m.tailM, -1.50, 0.66, z));
  a.placuta(g, -1.52, 0.46, 0, true);
  [[0.36, 0.86], [0.36, -0.86], [-0.42, 0.86], [-0.42, -0.86]].forEach(([x, z]) => a.roata(g, roti, x, 0.32, z, 0.32, 0.22));
  return { grup: g, roti, lungime: 3.1 };
}

// Semiremorcă — cutia lungă de la categoria CE.
function semiremorca(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  a.cutie(g, 7.60, 2.20, 2.44, m.paint, 0, 1.90, 0);                        // cutia
  a.cutie(g, 7.64, 0.10, 2.46, m.amberM, 0, 1.34, 0);                       // dunga de jos
  a.cutie(g, 0.10, 2.10, 2.40, m.darkM, -3.82, 1.90, 0);                    // ușile din spate
  a.cutie(g, 6.60, 0.20, 2.00, m.darkM, 0.30, 0.72, 0);                     // șasiul
  a.cutie(g, 0.90, 0.34, 1.00, m.darkM, 3.30, 0.72, 0);                     // placa de cuplare
  [0.90, -0.90].forEach((z) => a.cutie(g, 0.08, 0.30, 0.26, m.tailM, -3.88, 0.95, z));
  a.placuta(g, -3.90, 0.66, 0, true);
  [[-2.10, 1.06], [-2.10, -1.06], [-2.90, 1.06], [-2.90, -1.06]]
    .forEach(([x, z]) => a.roata(g, roti, x, 0.52, z, 0.52, 0.32));
  return { grup: g, roti, lungime: 8.0 };
}

// Remorcă mică de motocicletă.
function remorcaMoto(m) {
  const roti = []; const g = new THREE.Group(); const a = atelier(m);
  a.cutie(g, 0.70, 0.08, 0.56, m.darkM, 0, 0.42, 0);
  [0.28, -0.28].forEach((z) => a.cutie(g, 0.72, 0.20, 0.05, m.paint, 0, 0.55, z));
  a.cutie(g, 0.05, 0.20, 0.56, m.paint, -0.36, 0.55, 0);
  a.cutie(g, 0.05, 0.07, 0.10, m.tailM, -0.38, 0.50, 0);
  [0.36, -0.36].forEach((z) => a.roata(g, roti, 0, 0.22, z, 0.22, 0.12));
  return { grup: g, roti, lungime: 0.9 };
}

/* Registrul garajului. „categorie" leagă vehiculul de remorcile care i se
   potrivesc, ca să nu ajungi cu o semiremorcă în spatele unei motociclete. */
const GARAJ = {
  hatchback: { nume: 'Hatchback', categorie: 'B', build: vehiculHatchback },
  sedan: { nume: 'Sedan', categorie: 'B', build: vehiculSedan },
  break: { nume: 'Break', categorie: 'B', build: vehiculBreak },
  suv: { nume: 'SUV', categorie: 'B', build: vehiculSUV },
  mica: { nume: 'Mașinuță (16 ani)', categorie: 'B1', build: vehiculMica },
  moto: { nume: 'Motocicletă', categorie: 'A', build: (m) => construiesteMoto(m, false) },
  motoAtas: { nume: 'Motocicletă cu ataș', categorie: 'A', build: (m) => construiesteMoto(m, true) },
  camion: { nume: 'Cap tractor', categorie: 'C', build: vehiculCamion },
  autobuz: { nume: 'Autobuz', categorie: 'D', build: vehiculAutobuz },
};

const REMORCI = {
  usoara: { nume: 'Remorcă ușoară', categorii: ['B', 'B1'], build: remorcaUsoara },
  platforma: { nume: 'Platformă', categorii: ['B'], build: remorcaPlatforma },
  semi: { nume: 'Semiremorcă', categorii: ['C'], build: semiremorca },
  moto: { nume: 'Remorcă de motocicletă', categorii: ['A'], build: remorcaMoto },
};

/* ---------------------- SCENA: DRUMUL ȘI VEHICULUL ----------------------- */

function Car3D({ phase, vehicul, remorca }) {
  const mountRef = useRef(null);
  const apiRef = useRef(null);
  const phaseRef = useRef(phase);
  const [failed, setFailed] = useState(false);
  phaseRef.current = phase;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    let raf = 0; let ro = null; let renderer = null; let scene = null;

    try {
      scene = new THREE.Scene();
      const W = mount.clientWidth || 340; const H = mount.clientHeight || 140;

      // Camera se dă înapoi cât e nevoie: un autobuz nu încape la aceeași
      // distanță ca o motocicletă.
      const info = GARAJ[vehicul] || GARAJ.hatchback;
      const rem = REMORCI[remorca];
      const cuRemorca = !!(rem && rem.categorii.includes(info.categorie));
      const intindere = (vehicul === 'autobuz' ? 9.5 : 4.6) + (cuRemorca ? (rem.lungime || 3) : 0);
      const dist = Math.max(1, intindere / 4.6);

      const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 140);
      camera.position.set(4.6 * dist, 1.85 * Math.pow(dist, 0.75), 4.2 * dist);
      camera.lookAt(-0.5 * (dist - 1), 0.82 * Math.pow(dist, 0.55), 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.style.display = 'block';
      mount.appendChild(renderer.domElement);

      scene.fog = new THREE.Fog(0x6fc7f2, 10 * dist, 28 * dist);

      const hemi = new THREE.HemisphereLight(0xffffff, 0x334155, 1);
      scene.add(hemi);
      const dir = new THREE.DirectionalLight(0xffffff, 1.5);
      dir.position.set(5, 7, 4); scene.add(dir);
      const rim = new THREE.DirectionalLight(0xbfd8ff, 0.5);
      rim.position.set(-6, 3, -4); scene.add(rim);
      const spot = new THREE.SpotLight(0xfff2c0, 0, 26, 0.55, 0.75, 1.1);
      spot.position.set(1.7, 0.72, 0);
      const tinta = new THREE.Object3D(); tinta.position.set(16, -0.6, 0);
      scene.add(tinta); spot.target = tinta;

      /* ---- drumul ---- */
      const roadMat = new THREE.MeshStandardMaterial({ color: 0x3d4b5d, roughness: 0.82, metalness: 0.12, envMapIntensity: 0.35 });
      const road = new THREE.Mesh(new THREE.PlaneGeometry(120, 14), roadMat);
      road.rotation.x = -Math.PI / 2; scene.add(road);

      const lineMat = new THREE.MeshStandardMaterial({ color: 0xe8eef6, roughness: 0.85 });
      [-3.1 * dist, 2.4 * dist].forEach((z) => {
        const e = new THREE.Mesh(new THREE.BoxGeometry(120, 0.02, 0.11), lineMat);
        e.position.set(0, 0.012, z); scene.add(e);
      });

      // Dungile și conurile fug spre spate; mașina rămâne pe loc, ca la filmări.
      const fugare = [];
      const dashGeo = new THREE.BoxGeometry(1.25, 0.02, 0.13);
      const dashMat = new THREE.MeshStandardMaterial({ color: 0xf5b324, roughness: 0.75 });
      for (let i = 0; i < 22; i++) {
        const d = new THREE.Mesh(dashGeo, dashMat);
        d.position.set(-30 + i * 2.8, 0.013, -1.65 * dist);
        scene.add(d); fugare.push(d);
      }
      const coneMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.6 });
      const bandMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 });
      const coneGeo = new THREE.CylinderGeometry(0.05, 0.19, 0.42, 14);
      const bandGeo = new THREE.CylinderGeometry(0.125, 0.145, 0.09, 14);
      for (let i = 0; i < 6; i++) {
        const grp = new THREE.Group();
        const corp = new THREE.Mesh(coneGeo, coneMat); corp.position.y = 0.21;
        const banda = new THREE.Mesh(bandGeo, bandMat); banda.position.y = 0.24;
        const baza = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.04, 0.34), coneMat); baza.position.y = 0.02;
        grp.add(corp); grp.add(banda); grp.add(baza);
        grp.position.set(-30 + i * 10, 0, 3.1 * dist);
        scene.add(grp); fugare.push(grp);
      }

      /* ---- materialele ---- */
      /* Reflexiile trec prin filtrul de mediu: fără el, cubul desenat de noi se
         oglindește tăios, ca în tinichea. Dacă filtrul nu merge pe un telefon,
         rămânem pe reflexia brută — nu pierdem vehiculul. */
      const mediuBrut = texMediu('#cfe4f7', '#8fb4d6', '#3b4553');
      let mediu = mediuBrut;
      try {
        const pmrem = new THREE.PMREMGenerator(renderer);
        mediu = pmrem.fromCubemap(mediuBrut).texture;
        pmrem.dispose();
      } catch (e) { /* rămâne reflexia brută */ }
      scene.environment = mediu;

      // vopsea metalizată cu strat de lac: reflexia dublă deosebește tabla de mat
      const paint = new THREE.MeshPhysicalMaterial({
        color: 0xbcc5d1, roughness: 0.30, metalness: 0.78,
        clearcoat: 0.92, clearcoatRoughness: 0.05, envMap: mediu, envMapIntensity: 1.25,
      });
      const amberM = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.35, metalness: 0.3 });
      const darkM = new THREE.MeshStandardMaterial({ color: 0x1e242e, roughness: 0.62, envMapIntensity: 0.8 });
      const glassM = new THREE.MeshStandardMaterial({ color: 0x1f2c40, roughness: 0.06, metalness: 0.65, envMap: mediu, envMapIntensity: 2.2 });
      const sideGlassM = new THREE.MeshStandardMaterial({ color: 0x223049, roughness: 0.1, metalness: 0.4, transparent: true, opacity: 0.94, envMap: mediu });
      const tyreM = new THREE.MeshStandardMaterial({ color: 0x0f1218, roughness: 0.92, envMapIntensity: 0.35 });
      const hubM = new THREE.MeshStandardMaterial({ color: 0xc9d2dd, roughness: 0.18, metalness: 0.95, envMap: mediu, envMapIntensity: 2 });
      const chromeM = new THREE.MeshStandardMaterial({ color: 0xeef3f8, roughness: 0.08, metalness: 1, envMap: mediu, envMapIntensity: 2.4 });
      const headM = new THREE.MeshStandardMaterial({ color: 0xfff8dd, emissive: 0xfff3b0, emissiveIntensity: 0.2, roughness: 0.18 });
      const ledM = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfdf6d8, emissiveIntensity: 0.9, roughness: 0.08 });
      const tailM = new THREE.MeshStandardMaterial({ color: 0x8f1a1a, emissive: 0xef4444, emissiveIntensity: 0.3, roughness: 0.28 });

      const signTex = texSign();
      try { signTex.anisotropy = renderer.capabilities.getMaxAnisotropy(); } catch (e) { /* nu contează */ }
      const signM = new THREE.MeshStandardMaterial({ map: signTex, emissiveMap: signTex, emissive: 0xffffff, emissiveIntensity: 0, roughness: 0.5 });
      const plateM = new THREE.MeshStandardMaterial({ map: texPlate(), roughness: 0.5 });

      const mats = { paint, amberM, darkM, glassM, sideGlassM, tyreM, hubM, chromeM, headM, ledM, tailM, signM, plateM };

      /* ---- vehiculul ales, cu remorca lui ---- */
      const vehiculConstruit = (GARAJ[vehicul] || GARAJ.hatchback).build(mats);
      const car = vehiculConstruit.grup;
      const roti = vehiculConstruit.roti;

      if (cuRemorca) {
        const r = rem.build(mats);
        const cutieV = new THREE.Box3().setFromObject(car);
        r.grup.position.x = cutieV.min.x - (r.lungime / 2) - 0.55;
        car.add(r.grup);
        r.roti.forEach(x => roti.push(x));
        const protap = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.08), darkM);
        protap.position.set(cutieV.min.x - 0.28, 0.42, 0);
        car.add(protap);
      }

      car.add(spot);
      scene.add(car);

      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(4.6 * dist, 2.4 * Math.min(dist, 1.6)),
        new THREE.MeshBasicMaterial({ map: texShadow(), transparent: true, opacity: 0.55, depthWrite: false }),
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.016;
      scene.add(shadow);

      /* Luminile pe asfalt, așezate după conturul real al ansamblului: cu o
         remorcă prinsă, spatele e mult mai departe, iar fasciculele trebuie să
         se mute odată cu el. Altfel farurile bat în gol, lângă vehicul. */
      const cutie = new THREE.Box3().setFromObject(car);
      const fasciculTex = texFascicul();
      const faceLumina = (geo, culoare, x, intoarsa) => {
        const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
          map: fasciculTex, color: culoare, transparent: true, opacity: 0,
          depthWrite: false, blending: THREE.AdditiveBlending,
        }));
        if (intoarsa) mesh.rotation.y = Math.PI;
        mesh.position.set(x, 0.02, 0);
        scene.add(mesh);
        return mesh;
      };
      const luminaFata = faceLumina(geoFascicul(4.2, 1.0, 2.6), 0xfff0c0, cutie.max.x - 0.05, false);
      const luminaSpate = faceLumina(geoFascicul(1.8, 0.9, 1.7), 0xff3b30, cutie.min.x + 0.05, true);

      apiRef.current = {
        setPhase: (p) => {
          const c = L3D[p] || L3D.day;
          hemi.color.setHex(c.hemiSky); hemi.groundColor.setHex(c.hemiGround); hemi.intensity = c.hemiI;
          dir.color.setHex(c.dir); dir.intensity = c.dirI;
          rim.intensity = p === 'night' ? 0.22 : 0.5;
          spot.intensity = c.spot;
          headM.emissiveIntensity = c.head;
          ledM.emissiveIntensity = 0.2 + c.head * 0.5;
          tailM.emissiveIntensity = c.tail;
          signM.emissiveIntensity = c.glow;
          roadMat.color.setHex(c.road);
          scene.fog.color.setHex(c.fog);
          // fasciculele se sting complet ziua și cresc odată cu farurile
          const noapte = Math.min(1, c.spot / 1.7);
          luminaFata.material.opacity = noapte * 0.62;
          luminaSpate.material.opacity = noapte * 0.42;
        },
      };
      apiRef.current.setPhase(phaseRef.current);

      const axa = new THREE.Vector3(0, 1, 0);
      const ceas = new THREE.Clock();
      const viteza = 7.5;

      const tick = () => {
        raf = requestAnimationFrame(tick);
        const dt = Math.min(ceas.getDelta(), 0.05);
        if (document.hidden) return;
        const t = ceas.getElapsedTime();
        for (let i = 0; i < fugare.length; i++) {
          const o = fugare[i];
          o.position.x -= viteza * dt;
          if (o.position.x < -30) o.position.x += 60;
        }
        const rot = (viteza / 0.37) * dt;
        for (let i = 0; i < roti.length; i++) roti[i].rotateOnAxis(axa, rot);
        car.position.y = Math.sin(t * 8.5) * 0.012;      // trepidația motorului
        car.position.z = Math.sin(t * 0.7) * 0.09;       // legănarea pe bandă
        car.rotation.z = Math.sin(t * 3.1) * 0.011;
        car.rotation.y = Math.sin(t * 0.9) * 0.02;
        shadow.position.z = car.position.z;
        luminaFata.position.z = car.position.z;
        luminaSpate.position.z = car.position.z;
        renderer.render(scene, camera);
      };
      tick();

      const resize = () => {
        const w2 = mount.clientWidth; const h2 = mount.clientHeight;
        if (!w2 || !h2) return;
        camera.aspect = w2 / h2;
        camera.updateProjectionMatrix();
        renderer.setSize(w2, h2);
      };
      if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(resize); ro.observe(mount); }
      else window.addEventListener('resize', resize);

      return () => {
        cancelAnimationFrame(raf);
        if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            const ms = Array.isArray(o.material) ? o.material : [o.material];
            ms.forEach((x) => { if (x.map) x.map.dispose(); x.dispose(); });
          }
        });
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    } catch (e) {
      // Fără placă video sau la orice eroare, antetul cade pe varianta plată.
      setFailed(true);
      if (raf) cancelAnimationFrame(raf);
      return undefined;
    }
  }, [vehicul, remorca]);

  useEffect(() => {
    if (apiRef.current && apiRef.current.setPhase) apiRef.current.setPhase(phase);
  }, [phase]);

  if (failed) {
    return (
      <div className="relative w-full h-full overflow-hidden" style={{ background: '#111827' }}>
        <div className="ias-dash" />
        <div className="ias-car flex flex-col items-center">
          <span style={{ fontSize: 7.5, fontWeight: 900, background: '#fbbf24', color: '#111827', padding: '1px 4px', borderRadius: 2, letterSpacing: 0.6, marginBottom: 1 }}>ȘCOALĂ</span>
          <Car size={26} color="#fde68a" />
        </div>
      </div>
    );
  }
  return <div ref={mountRef} className="w-full h-full" />;
}

/* ==================== 5. PIESE DE INTERFAȚĂ ============================== */

function Field({ label, required, children }) {
  return (
    <label className="block mb-3.5">
      <span className="block text-xs font-medium text-slate-500 mb-1.5">
        {label}{required && <span className="text-amber-600"> *</span>}
      </span>
      {children}
    </label>
  );
}

function Section({ title, summary, defaultOpen, children }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="mb-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-2 py-2 text-left">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide flex-1">{title}</span>
        {summary ? <span className="text-xs text-slate-400">{summary}</span> : null}
        <ChevronRight size={15} className="text-slate-300 transition-transform"
          style={{ transform: open ? 'rotate(90deg)' : 'none' }} />
      </button>
      {open && children}
    </div>
  );
}

function ProgressBar({ value, tone }) {
  const v = Math.max(0, Math.min(100, value || 0));
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
      <div style={{ width: `${v}%`, height: '100%', background: tone || 'var(--accent)', transition: 'width .3s ease' }} />
    </div>
  );
}

/* Fereastra în care se deschide orice formular. Stă în mijlocul ecranului, cu
   loc dedesubt pentru bara de taburi, și poartă clasa „ecran-peste" — semnul
   după care aplicația știe că e ceva deschis. */
function BottomSheet({ open, onClose, title, children, footer, layer = LAYER.sheet }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center sheet-wrap ecran-peste" style={{ zIndex: layer }}>
      <div className="absolute inset-0 bg-slate-900/70 fade-anim" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl flex flex-col sheet-anim" style={{ maxHeight: '100%' }}>
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 shrink-0">
          <h3 className="font-display text-base font-semibold text-slate-900 uppercase tracking-wide">{title}</h3>
          <button onClick={onClose} aria-label="Închide" className="btn-inchide p-1.5 rounded-full hover:bg-slate-100 text-slate-500">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-5 pt-4"
          style={{ paddingBottom: footer ? '1rem' : 'max(1.25rem, env(safe-area-inset-bottom))' }}>{children}</div>
        {footer ? <div className="px-5 py-3 border-t border-slate-100 shrink-0">{footer}</div> : null}
      </div>
    </div>
  );
}

function ConfirmDialog({ open, title, message, confirmLabel, danger, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center px-6 ecran-peste" style={{ zIndex: LAYER.dialog }}>
      <div className="absolute inset-0 bg-slate-900/50 fade-anim" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm fade-anim">
        <h3 className="font-semibold text-slate-900 mb-1.5">{title}</h3>
        {message ? <p className="text-sm text-slate-500 mb-4">{message}</p> : null}
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm">Renunță</button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium"
            style={{ background: danger ? 'var(--bad)' : 'var(--invert)' }}>
            {confirmLabel || 'Confirmă'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Mesajul către elev: se poate citi și schimba înainte de trimitere, apoi pleacă
   pe WhatsApp sau prin SMS. „onTrimis" ne spune că a fost chiar trimis, ca să
   putem ascunde butonul de bun venit după prima folosire. */
function NotifyDialog({ prompt, onClose }) {
  const [text, setText] = useState('');
  const [copiat, setCopiat] = useState(false);
  useEffect(() => { if (prompt) { setText(prompt.message || ''); setCopiat(false); } }, [prompt]);
  if (!prompt) return null;

  const trimis = () => { if (prompt.onTrimis) prompt.onTrimis(); onClose(); };
  async function copiaza() {
    try {
      await navigator.clipboard.writeText(text);
      setCopiat(true);
      if (prompt.onTrimis) prompt.onTrimis();
      setTimeout(() => setCopiat(false), 1500);
    } catch (e) { /* browserul nu permite copierea */ }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center px-5 ecran-peste" style={{ zIndex: LAYER.notify }}>
      <div className="absolute inset-0 bg-slate-900/50 fade-anim" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-5 w-full max-w-md fade-anim">
        <h3 className="font-semibold text-slate-900 mb-0.5">{prompt.title || 'Anunți elevul?'}</h3>
        <p className="text-xs text-slate-400 mb-3">Mesaj pentru {prompt.name}</p>
        <textarea rows={6} className={inputCls} value={text} onChange={e => setText(e.target.value)} />
        <div className="grid grid-cols-2 gap-2 mt-3">
          <a href={waMsgHref(prompt.phone, text)} target="_blank" rel="noopener noreferrer" onClick={trimis}
            style={{ touchAction: 'manipulation', background: '#25D366' }}
            className="py-2.5 rounded-xl text-white text-sm font-medium text-center">WhatsApp</a>
          <a href={smsHref(prompt.phone, text)} onClick={trimis}
            style={{ touchAction: 'manipulation' }}
            className="py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium text-center">SMS</a>
        </div>
        <button onClick={copiaza} className="w-full py-2.5 mt-2 rounded-xl border border-slate-200 text-slate-600 text-sm">
          {copiat ? 'Copiat ✓' : 'Copiază mesajul'}
        </button>
        <button onClick={onClose} className="w-full py-2 mt-1 text-xs text-slate-400">Mai târziu</button>
      </div>
    </div>
  );
}

/* --------------------------- plăcuța de înmatriculare -------------------- */
/* Județul, numărul grupei și primele trei litere din primul prenume — cum se
   citește elevul, nu un cod inventat. Fără grupă nu inventăm un număr: ar arăta
   ca o grupă care nu există. */

function plateLetters(st) {
  if (!st) return 'IAS';
  const pren = stripDia(greetName(st));
  const fam = stripDia(String(st.lastName || st.name || '').trim().split(/\s+/)[0] || '');
  return ((pren + fam) || 'IAS').padEnd(3, 'A').slice(0, 3);
}
function plateDigits(st) {
  const t = String((st && st.group) || '').trim();
  const cifre = t.replace(/[^0-9]/g, '');
  if (cifre) return cifre.length === 1 ? `0${cifre}` : cifre.slice(0, 3);
  if (/os/i.test(t)) return 'OS';
  return '00';
}

function StelutaUE({ s }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={{ display: 'block' }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        return <circle key={i} cx={12 + 7.5 * Math.cos(a)} cy={12 + 7.5 * Math.sin(a)} r={1.1} fill="#ffcc00" />;
      })}
    </svg>
  );
}

function Plate({ student, county, h = 22, digits, letters }) {
  const c = county || (student && student.county) || 'B';
  return (
    <span className="inline-flex items-stretch overflow-hidden align-middle shrink-0"
      style={{
        height: h, borderRadius: h * 0.17,
        background: 'linear-gradient(180deg,#ffffff 0%,#f1f5f9 65%,#e2e8f0 100%)',
        border: `${Math.max(1.2, h * 0.05)}px solid #0b1220`,
        boxShadow: '0 1px 4px rgba(2,6,23,0.28)',
      }}>
      <span className="flex flex-col items-center justify-center"
        style={{ width: h * 0.4, background: 'linear-gradient(180deg,#0b3fb0 0%,#00308f 100%)' }}>
        <StelutaUE s={h * 0.32} />
        <span style={{ color: '#fff', fontSize: h * 0.24, fontWeight: 800, lineHeight: 1 }}>RO</span>
      </span>
      <span className="flex items-center justify-center"
        style={{
          padding: `0 ${h * 0.24}px`, gap: h * 0.2, color: '#0b1220',
          fontFamily: "'Arial Narrow','Helvetica Neue Condensed',Impact,sans-serif",
          fontWeight: 800, fontSize: h * 0.56, letterSpacing: h * 0.02, lineHeight: 1,
        }}>
        <span>{c}</span>
        <span>{digits || plateDigits(student)}</span>
        <span>{letters || plateLetters(student)}</span>
      </span>
    </span>
  );
}

// Tortul apare lângă numele elevului în ziua lui, oriunde ar fi el.
function eZiuaLui(st) {
  const b = st && st.birthDate;
  if (!b) return false;
  const n = fromISO(b); const azi = new Date();
  return n.getDate() === azi.getDate() && n.getMonth() === azi.getMonth();
}
function varsta(iso) {
  if (!iso) return null;
  const n = fromISO(iso); const azi = new Date();
  let a = azi.getFullYear() - n.getFullYear();
  const m = azi.getMonth() - n.getMonth();
  if (m < 0 || (m === 0 && azi.getDate() < n.getDate())) a--;
  return a >= 0 && a < 130 ? a : null;
}
// Până la 18 ani nu poate fi programat la examen; arătăm ziua în care îi împlinește.
function implineste18(iso) {
  const v = varsta(iso);
  if (v == null || v >= 18) return null;
  const n = fromISO(iso);
  return toISO(new Date(n.getFullYear() + 18, n.getMonth(), n.getDate()));
}
function Tort({ student, size = 14 }) {
  if (!eZiuaLui(student)) return null;
  const ani = varsta(student.birthDate);
  return (
    <span className="shrink-0 inline-flex items-center" title={ani != null ? `Azi împlinește ${ani} ani` : 'Azi e ziua lui'}>
      <Cake size={size} style={{ color: 'var(--accent)' }} />
    </span>
  );
}

/* Bara de taburi stă deasupra ferestrelor, ca lumina ei să rămână la vedere. Ca
   să nu pară că aplicația s-a blocat când apeși o filă cu o fereastră deschisă,
   fila nu se schimbă: fereastra clipește roșu și „×"-ul ei pulsează. */
function cereInchiderea() {
  if (typeof document === 'undefined') return false;
  const toate = document.querySelectorAll('.ecran-peste');
  const f = toate.length ? toate[toate.length - 1] : null;
  if (!f) return false;
  f.classList.remove('cere-inchidere');
  void f.offsetWidth;                       // repornim efectul la apăsări repetate
  f.classList.add('cere-inchidere');
  setTimeout(() => f.classList.remove('cere-inchidere'), 1100);
  return true;
}

function Toast({ toast }) {
  if (!toast) return null;
  const rau = toast.type === 'error';
  return (
    <div className="fixed left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl text-white text-sm shadow-lg fade-anim"
      style={{ bottom: 96, zIndex: LAYER.toast, background: rau ? 'var(--bad)' : 'var(--invert)', maxWidth: '90vw' }}>
      {toast.msg}
    </div>
  );
}

/* ==================== 6. FILELE ========================================== */

/* ------------------------------- ANTETUL --------------------------------- */
/* Cerul se schimbă după ceas, iar vehiculul rulează dedesubt. Apăsând pe eticheta
   cu ora, poți vedea cum arată la celelalte momente ale zilei, fără să aștepți. */

function BrandHero({ vehicul, remorca }) {
  const [acum, setAcum] = useState(new Date());
  const [previzualizare, setPreviz] = useState(null);
  useEffect(() => {
    const id = setInterval(() => setAcum(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const real = phaseForHour(acum.getHours());
  const faza = previzualizare || real;
  const info = PHASES[faza];
  const Icon = info.icon;
  const ora = `${pad2(acum.getHours())}:${pad2(acum.getMinutes())}`;
  const ordine = ['dawn', 'day', 'dusk', 'night'];

  return (
    <div className="relative overflow-hidden" style={{ borderRadius: 22, background: info.sky }}>
      {/* stelele nopții și soarele/luna, după moment */}
      {faza === 'night' && Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="ias-star" style={{
          left: `${(i * 37) % 96}%`, top: `${(i * 23) % 42}%`,
          width: i % 3 === 0 ? 2.5 : 1.6, height: i % 3 === 0 ? 2.5 : 1.6,
          animationDelay: `${(i % 5) * 0.6}s`,
        }} />
      ))}
      {(faza === 'dawn' || faza === 'dusk') && (
        <span className="absolute" style={{
          right: '12%', top: '18%', width: 56, height: 56, borderRadius: 99,
          background: faza === 'dawn' ? '#ffd0a1' : '#fb923c',
          boxShadow: '0 0 44px rgba(251,146,60,0.9)',
        }} />
      )}
      <span className="absolute inset-0" style={{
        background: 'linear-gradient(102deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.2) 52%, transparent 88%)',
      }} />

      <div className="relative px-4 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 font-semibold uppercase"
            style={{ fontSize: 10, letterSpacing: '0.17em', color: 'rgba(255,255,255,0.96)' }}>
            <Car size={13} /> {BRAND.expansion}
          </div>
          <button
            onClick={() => setPreviz(previzualizare
              ? null
              : ordine[(ordine.indexOf(faza) + 1) % ordine.length])}
            className="flex items-center gap-1 rounded-full px-2 py-1 shrink-0"
            style={{
              fontSize: 10, fontWeight: 700, background: 'rgba(3,7,18,0.4)',
              border: '1px solid rgba(255,255,255,0.26)', color: '#fff',
            }}>
            <Icon size={12} />{previzualizare ? info.label : `${ora} · ${info.label}`}
          </button>
        </div>

        <h1 className="relative font-display uppercase" style={{
          marginTop: 12, fontSize: 25, fontWeight: 700, letterSpacing: '0.02em',
          color: '#fff', textShadow: '0 2px 14px rgba(3,7,18,0.5)',
        }}>
          Bun venit în <span style={{ color: '#ffd84d' }}>{BRAND.mark}</span>
          <span style={{ fontSize: 11, verticalAlign: 'super', color: 'rgba(255,255,255,0.7)' }}>™</span>
        </h1>
        <p className="relative" style={{
          fontSize: 13, marginTop: 3, color: 'rgba(255,255,255,0.94)', textShadow: '0 1px 8px rgba(3,7,18,0.5)',
        }}>{BRAND.tagline}</p>

        <div className="relative flex items-center gap-2 mt-2.5 mb-1">
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)' }}>{BRAND.by}</span>
          <span className="font-mono-time px-2 py-0.5 rounded-full"
            style={{ fontSize: 11, color: '#ffd84d', border: '1px solid rgba(255,216,77,0.4)' }}>
            {VERSION_LABEL}
          </span>
        </div>
      </div>

      <div className="relative mt-1" style={{ height: 142 }}>
        <Car3D phase={faza} vehicul={vehicul} remorca={remorca} />
      </div>
    </div>
  );
}

/* -------------------------------- ACASĂ ---------------------------------- */

function DashboardTab({ data, onOpenSession, onOpenStudent, onAddStudent, onAddSession,
  onGoToPlanner, vehicul, remorca }) {
  const azi = todayISO();
  const cur = data.settings.currency;

  const aziSesiuni = data.sessions
    .filter(s => s.date === azi && s.status !== 'cancelled')
    .sort((a, b) => a.startMin - b.startMin);

  const inceputSapt = toISO(startOfWeek(new Date()));
  const sfarsitSapt = toISO(addDays(startOfWeek(new Date()), 6));
  const peSaptamana = data.sessions
    .filter(s => s.date >= inceputSapt && s.date <= sfarsitSapt && s.status !== 'cancelled').length;

  const elevi = data.students.filter(s => !s.withdrawn && s.examResult !== 'promovat').length;
  const deIncasat = data.students.reduce((sum, s) =>
    sum + Math.max(0, studentOutstanding(s, data.sessions, data.settings)), 0);

  /* Ce cere atenție. Rândurile cu ședințe deschid prima ședință din șir: pe
     măsură ce le rezolvi, numărul scade și următoarea atingere o deschide pe
     următoarea — așa treci prin toate fără să le cauți în calendar. */
  const dupaTimp = (a, b) => (a.date + minToTime(a.startMin)).localeCompare(b.date + minToTime(b.startMin));
  const trecuteFaraStare = data.sessions
    .filter(s => (s.status === 'scheduled' || s.status === 'pending') && s.date < azi).sort(dupaTimp);
  const neconfirmate = data.sessions
    .filter(s => s.status === 'pending' && s.date >= azi).sort(dupaTimp);
  const totProgramat = data.students.filter(s => studentBookedRemaining(s, data.sessions) === 0 && eDisponibil(s));

  // Examenele: cele trecute cer rezultatul, cele din următoarele două săptămâni
  // sunt doar un semn că se apropie.
  const panaLa = toISO(addDays(fromISO(azi), 14));
  const examene = [];
  data.students.filter(s => !s.withdrawn).forEach(s => {
    if (s.examResult !== 'promovat' && s.examDate) {
      if (s.examDate <= azi) examene.push({ student: s, date: s.examDate, kind: 'practic', due: true });
      else if (s.examDate <= panaLa) examene.push({ student: s, date: s.examDate, kind: 'practic' });
    }
    if (s.theoryExamResult !== 'promovat' && s.theoryExamDate && s.theoryExamDate >= azi && s.theoryExamDate <= panaLa) {
      examene.push({ student: s, date: s.theoryExamDate, kind: 'teoretic' });
    }
  });
  examene.sort((a, b) => a.date.localeCompare(b.date));

  const gataDeAdeverinta = data.students.filter(s => eInAsteptare(s) && zileDeAsteptare(s).ramase === 0);
  const zileDeNastere = data.students.filter(s => eZiuaLui(s) && !s.withdrawn);

  const areAtentie = trecuteFaraStare.length > 0 || neconfirmate.length > 0 || totProgramat.length > 0
    || examene.length > 0 || gataDeAdeverinta.length > 0 || zileDeNastere.length > 0;

  /* Statistici: cât la sută dintre elevi au luat examenul și cum stau
     susținerile, pe teoretic și pe practic. */
  const totalElevi = data.students.length;
  const promovati = data.students.filter(s => s.examResult === 'promovat').length;
  const procentPromovati = totalElevi ? Math.round((promovati / totalElevi) * 100) : 0;
  const teorPromovat = data.students.filter(s => s.theoryExamResult === 'promovat').length;
  const teorRespins = data.students.filter(s => s.theoryExamResult === 'respins').length;
  const pracRespins = data.students.filter(s => s.examResult === 'respins').length;
  const teorSustineri = data.students.reduce((n, s) => n + (Number(s.theoryExamAttempts) || 0), 0);
  const pracSustineri = data.students.reduce((n, s) => n + (Number(s.examAttempts) || 0), 0);

  // Bara cu două culori: cât s-a promovat și cât s-a respins din susțineri.
  const BaraExamene = ({ label, pass, fail, attempts }) => {
    const tot = pass + fail;
    return (
      <div className="mb-2.5 last:mb-0">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-slate-500">{label}</span>
          <span className="text-slate-400">
            {attempts} {attempts === 1 ? 'susținere' : 'susțineri'} · <span className="text-emerald-600">{pass} promovate</span> · <span className="text-red-500">{fail} respinse</span>
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden flex">
          {tot > 0 && <div className="h-full bg-emerald-500" style={{ width: `${(pass / tot) * 100}%` }} />}
          {tot > 0 && <div className="h-full bg-red-400" style={{ width: `${(fail / tot) * 100}%` }} />}
        </div>
      </div>
    );
  };

  const randAtentie = (cheie, icoana, text, sub, onClick, tonal) => (
    <button key={cheie} onClick={onClick}
      className="w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left border"
      style={tonal
        ? { background: 'var(--accent-soft)', borderColor: 'var(--accent-line)' }
        : { background: 'var(--surface)', borderColor: 'var(--line)' }}>
      {icoana}
      <span className="flex-1 min-w-0">
        <span className="block text-sm" style={{ color: tonal ? 'var(--accent-ink)' : 'var(--muted)' }}>{text}</span>
        {sub ? <span className="block text-xs text-slate-400 truncate">{sub}</span> : null}
      </span>
      <ChevronRight size={15} className="shrink-0" style={{ color: tonal ? 'var(--accent)' : 'var(--muted-2)' }} />
    </button>
  );

  return (
    <div className="pb-4">
      <div className="px-4 pt-3">
        <BrandHero vehicul={vehicul} remorca={remorca} />
      </div>

      <div className="px-4 mt-3 text-sm text-slate-500 capitalize">{fmtShort(azi)} {fromISO(azi).getFullYear()}</div>

      <div className="grid grid-cols-3 gap-2 px-4 mt-3">
        <div className="rounded-2xl px-3 py-4 text-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <div className="font-mono-time text-xl font-semibold text-slate-900">{elevi}</div>
          <div className="text-xs text-slate-400 mt-0.5">elevi</div>
        </div>
        <div className="rounded-2xl px-3 py-4 text-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <div className="font-mono-time text-xl font-semibold text-slate-900">{peSaptamana}</div>
          <div className="text-xs text-slate-400 mt-0.5">săpt. asta</div>
        </div>
        <div className="rounded-2xl px-3 py-4 text-center" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}>
          <div className="font-mono-time text-xl font-semibold" style={{ color: 'var(--accent-ink)' }}>
            {Math.round(deIncasat).toLocaleString('ro-RO')}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--accent-ink)' }}>{cur} elevi</div>
        </div>
      </div>

      <div className="px-4 mt-5">
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Astăzi</div>
        {aziSesiuni.length === 0 ? (
          <div className="text-center py-8 text-sm text-slate-400">Nicio ședință programată astăzi.</div>
        ) : (
          <div className="space-y-1.5">
            {aziSesiuni.map(s => {
              const el = data.students.find(x => x.id === s.studentId);
              const meta = STATUS_META[s.status] || STATUS_META.scheduled;
              return (
                <button key={s.id} onClick={() => onOpenSession('edit', s)}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-left">
                  <span className="font-mono-time text-xs text-slate-500 shrink-0">{minToTime(s.startMin)}</span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-slate-900 truncate">{el ? el.name : 'Elev șters'}</span>
                      <Tort student={el} size={13} />
                    </span>
                    <span className="block text-xs text-slate-400 truncate">
                      {s.location || '—'}{s.otherInstructor ? ' · alt instr.' : ''}
                    </span>
                  </span>
                  <span className={`shrink-0 text-xs px-2 py-1 rounded-full bg-${meta.c}-50 text-${meta.c}-700 border border-${meta.c}-200`}>
                    {meta.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {areAtentie && (
        <div className="px-4 mt-5">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Necesită atenție</div>
          <div className="space-y-1.5">
            {neconfirmate.length > 0 && randAtentie('conf',
              <Flag size={15} className="shrink-0" style={{ color: 'var(--accent)' }} />,
              `${neconfirmate.length} ${neconfirmate.length === 1 ? 'ședință așteaptă' : 'ședințe așteaptă'} confirmare`,
              null, () => onOpenSession('edit', neconfirmate[0]), true)}

            {trecuteFaraStare.length > 0 && randAtentie('trecute',
              <Flag size={15} className="shrink-0" style={{ color: 'var(--accent)' }} />,
              `${trecuteFaraStare.length} ${trecuteFaraStare.length === 1 ? 'ședință trecută' : 'ședințe trecute'} fără status final`,
              null, () => onOpenSession('edit', trecuteFaraStare[0]), true)}

            {examene.map((x, i) => randAtentie(`ex_${x.student.id}_${x.kind}_${i}`,
              <CalendarDays size={15} className="shrink-0" style={{ color: x.due ? 'var(--accent)' : 'var(--muted-2)' }} />,
              `${x.student.name} · examen ${x.kind} ${fmtHuman(x.date)}`,
              x.due ? 'notează rezultatul — promovat sau respins' : null,
              () => onOpenStudent(x.student.id), !!x.due))}

            {gataDeAdeverinta.map(s => randAtentie(`adev_${s.id}`,
              <Flag size={15} className="shrink-0" style={{ color: 'var(--ok)' }} />,
              `${s.name} poate primi adeverința`,
              'Au trecut cele două săptămâni de la examen.',
              () => onOpenStudent(s.id), false))}

            {zileDeNastere.map(s => randAtentie(`zi_${s.id}`,
              <Cake size={15} className="shrink-0" style={{ color: 'var(--accent)' }} />,
              `Azi e ziua lui ${greetName(s)}`,
              varsta(s.birthDate) != null ? `Împlinește ${varsta(s.birthDate)} ani.` : null,
              () => onOpenStudent(s.id), true))}

            {totProgramat.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5">
                <div className="text-sm text-slate-700 mb-1.5">Toate orele programate sau efectuate:</div>
                <div className="flex flex-wrap gap-1.5">
                  {totProgramat.map(s => (
                    <button key={s.id} onClick={() => onOpenStudent(s.id)}
                      className="text-xs px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600">
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="px-4 mt-5">
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Statistici</div>
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3.5 mb-2">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm font-medium text-slate-800">Elevi promovați</div>
              <div className="text-xs text-slate-400 mt-0.5">{promovati} din {totalElevi} elevi</div>
            </div>
            <div className="font-mono-time text-2xl font-semibold text-emerald-600">{procentPromovati}%</div>
          </div>
          <ProgressBar value={procentPromovati} tone="#10b981" />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3.5">
          <div className="text-sm font-medium text-slate-800 mb-2.5">Examene după tip</div>
          <BaraExamene label="Teoretic" pass={teorPromovat} fail={teorRespins} attempts={teorSustineri} />
          <BaraExamene label="Practic" pass={promovati} fail={pracRespins} attempts={pracSustineri} />
        </div>
      </div>

      <div className="px-4 mt-5">
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Acțiuni rapide</div>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={onAddStudent}
            className="flex flex-col items-center gap-1.5 bg-white rounded-xl border border-slate-200 py-3.5 active:bg-slate-50">
            <Users size={18} className="text-slate-500" />
            <span className="text-xs text-slate-600">Elev nou</span>
          </button>
          <button onClick={onAddSession}
            className="flex flex-col items-center gap-1.5 bg-white rounded-xl border border-slate-200 py-3.5 active:bg-slate-50">
            <CalendarDays size={18} className="text-slate-500" />
            <span className="text-xs text-slate-600">Ședință nouă</span>
          </button>
          <button onClick={onGoToPlanner}
            className="flex flex-col items-center gap-1.5 bg-white rounded-xl border border-slate-200 py-3.5 active:bg-slate-50">
            <WandSparkles size={18} className="text-slate-500" />
            <span className="text-xs text-slate-600">Planificator</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- CALENDAR -------------------------------- */

function CalendarTab({ data, onOpenSession, onUpdateBlocks }) {
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [saptCursor, setSaptCursor] = useState(() => startOfWeek(new Date()));
  const [oraAleasa, setOraAleasa] = useState(null);

  const durata = durataDin(data.settings);
  const pas = pasDin(data.settings);
  /* Sub o jumătate de oră, rândurile rămân ore întregi și minutul se alege la
     atingere — altfel ziua ar avea 144 de rânduri și n-ai mai găsi nimic. */
  const rand = pas >= 30 ? pas : 60;
  const sloturi = (() => {
    const out = [];
    for (let m = data.settings.startMin; m + durata <= data.settings.endMin; m += rand) out.push(m);
    return out;
  })();

  const zileleSapt = Array.from({ length: 7 }, (_, i) => addDays(saptCursor, i));
  const daySessions = data.sessions.filter(s => s.date === selectedDate && s.status !== 'cancelled');
  const examene = examBlocksForDate(data.students, selectedDate);
  const blocuri = blocksForDate(data.settings, selectedDate);
  const sugestii = useMemo(() => eligibleStudentsForDay(data, selectedDate), [data, selectedDate]);
  const inOrizont = selectedDate >= todayISO() && selectedDate <= toISO(addDays(new Date(), ORIZONT_SUGESTII));

  // Sugestiile apar o dată la începutul fiecărui șir de intervale libere, nu sub
  // fiecare rând: pe o zi goală ar fi ieșit douăzeci de rânduri cu aceleași nume.
  let ultimulLiber = -1e9;

  const traseu = traseulZilei(daySessions, data.settings);
  const urmatoarea = daySessions
    .filter(x => (x.status === 'scheduled' || x.status === 'pending') && x.location)
    .sort((a, b) => a.startMin - b.startMin)[0];

  return (
    <div className="pb-4">
      <div className="px-4 pt-4 pb-1">
        <h1 className="font-display text-xl font-semibold text-slate-900 uppercase tracking-wide">Calendar</h1>
      </div>

      {/* săptămâna, cu săgeți și ziua aleasă */}
      <div className="flex items-center justify-between px-4 mt-3">
        <button onClick={() => setSaptCursor(addDays(saptCursor, -7))} className="p-2 text-slate-400"><ChevronLeft size={18} /></button>
        <span className="text-sm font-medium text-slate-800 capitalize">
          {RO_MONTHS[saptCursor.getMonth()]} {saptCursor.getFullYear()}
        </span>
        <button onClick={() => setSaptCursor(addDays(saptCursor, 7))} className="p-2 text-slate-400"><ChevronRight size={18} /></button>
      </div>

      <div className="flex gap-1.5 px-4 mt-2">
        {zileleSapt.map(zi => {
          const iso = toISO(zi);
          const aleasa = iso === selectedDate;
          const azi = iso === todayISO();
          const cate = data.sessions.filter(s => s.date === iso && s.status !== 'cancelled').length;
          const lucratoare = data.settings.workDays.includes(zi.getDay());
          return (
            <button key={iso} onClick={() => setSelectedDate(iso)}
              className="flex-1 flex flex-col items-center py-2 rounded-xl border"
              style={aleasa
                ? { background: 'var(--invert)', borderColor: 'var(--invert)', color: '#fff' }
                : { background: lucratoare ? 'var(--surface)' : 'var(--surface-2)', borderColor: 'var(--line)' }}>
              <span className="text-xs" style={{ opacity: aleasa ? 0.8 : 0.55 }}>{RO_DAYS_SHORT[zi.getDay()]}</span>
              <span className={`font-mono-time text-sm ${aleasa ? '' : azi ? 'text-amber-600 font-semibold' : 'text-slate-700'}`}>
                {zi.getDate()}
              </span>
              <span className="flex gap-0.5 mt-1" style={{ height: 4 }}>
                {Array.from({ length: Math.min(cate, 4) }).map((_, i) => (
                  <span key={i} style={{
                    width: 4, height: 4, borderRadius: 99,
                    background: aleasa ? 'rgba(255,255,255,.75)' : 'var(--accent)',
                  }} />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      {/* examenele zilei, scrise o dată sus */}
      {examene.length > 0 && (
        <div className="px-4 mt-3">
          {examene.map((e, i) => (
            <div key={i} className="rounded-xl px-3.5 py-2.5 mb-1.5"
              style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}>
              <div className="text-sm font-medium" style={{ color: 'var(--accent-ink)' }}>
                Examen · {e.student.name}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Mașina e ocupată {examPeriodText(e.period)}.
              </div>
            </div>
          ))}
        </div>
      )}

      {(traseu || urmatoarea) && (
        <div className="px-4 mt-3 flex gap-2">
          {traseu && (
            <a href={traseu.href} target="_blank" rel="noopener noreferrer" style={{ touchAction: 'manipulation' }}
              className="flex-1 min-w-0 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5">
              <MapPin size={14} style={{ color: 'var(--accent-ink)' }} />
              <span className="truncate">Traseul zilei · {traseu.opriri}</span>
            </a>
          )}
          {urmatoarea && (
            <a href={hartaHref(locatiaDupaNume(data.settings, urmatoarea.location), urmatoarea.location, 'dir')}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 min-w-0 py-2.5 rounded-xl text-white text-xs font-medium flex items-center justify-center gap-1.5"
              style={{ background: 'var(--invert)', touchAction: 'manipulation' }}>
              <Car size={14} />
              <span className="truncate">Următoarea · {minToTime(urmatoarea.startMin)}</span>
            </a>
          )}
        </div>
      )}

      <div className="px-4 mt-3 space-y-1.5">
        {sloturi.map(slotMin => {
          const aici = daySessions
            .filter(s => s.startMin >= slotMin && s.startMin < slotMin + rand)
            .sort((a, b) => a.startMin - b.startMin);
          const acoperit = daySessions.some(s => seSuprapun(slotMin, rand, s.startMin, durataSed(s, data.settings)));
          const examHit = examConflict(examene, slotMin, rand);
          const blockHit = blockConflict(blocuri, slotMin, rand);

          if (aici.length) {
            return (
              <div key={slotMin}>
                {aici.map(sess => {
                  const el = data.students.find(x => x.id === sess.studentId);
                  const meta = STATUS_META[sess.status] || STATUS_META.scheduled;
                  const peste = examConflict(examene, sess.startMin, durataSed(sess, data.settings));
                  return (
                    <button key={sess.id} onClick={() => onOpenSession('edit', sess)}
                      className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white border text-left mb-1.5"
                      style={{ borderColor: peste ? 'var(--bad-line)' : 'var(--line)' }}>
                      <span className="min-w-0 flex-1">
                        <span className="font-mono-time text-xs text-slate-400">
                          {minToTime(sess.startMin)} – {minToTime(sess.startMin + durataSed(sess, data.settings))}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-slate-900 truncate">{el ? el.name : 'Elev șters'}</span>
                          <Tort student={el} size={13} />
                        </span>
                        {sess.location ? <span className="block text-xs text-slate-400 truncate">{sess.location}</span> : null}
                        {peste ? <span className="block text-xs" style={{ color: 'var(--bad)' }}>Cade peste examen</span> : null}
                      </span>
                      <span className={`shrink-0 text-xs px-2 py-1 rounded-full bg-${meta.c}-50 text-${meta.c}-700 border border-${meta.c}-200`}>
                        {meta.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          }

          if (acoperit) return null;   // rândul e mâncat de o ședință mai lungă

          if (examHit || blockHit) {
            return (
              <div key={slotMin} className="flex items-center gap-3 px-3.5 py-2 rounded-xl"
                style={{ background: 'var(--surface-2)', border: '1px dashed var(--line-2)' }}>
                <span className="font-mono-time text-xs w-12 text-slate-400">{minToTime(slotMin)}</span>
                <span className="text-xs text-slate-400">
                  {examHit ? `Examen · ${examHit.student.name}` : (blockHit.reason || 'Indisponibil')}
                </span>
              </div>
            );
          }

          const primulLiberDinSir = ultimulLiber !== slotMin - rand;
          ultimulLiber = slotMin;

          return (
            <div key={slotMin}>
              <button onClick={() => (pas >= 30 ? onOpenSession('create', { date: selectedDate, startMin: slotMin }) : setOraAleasa(slotMin))}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 active:border-amber-300 active:text-amber-600">
                <span className="font-mono-time text-xs w-12 text-left">{minToTime(slotMin)}</span>
                <span className="text-xs">Liber</span>
                <Plus size={14} className="ml-auto" />
              </button>
              {inOrizont && primulLiberDinSir && sugestii.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pl-4 mt-1">
                  <span className="text-xs text-slate-400">
                    {daySessions.some(s => s.startMin < slotMin) && daySessions.some(s => s.startMin > slotMin)
                      ? 'Umple golul:' : 'Adaugă rapid:'}
                  </span>
                  {sugestii.filter(st => !inTura(st, selectedDate, slotMin, durata)).slice(0, 2).map(st => (
                    <button key={st.id}
                      onClick={() => onOpenSession('create', { date: selectedDate, startMin: slotMin, studentId: st.id })}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)', border: '1px solid var(--accent-line)' }}>
                      + {greetName(st)} {(st.lastName || '').slice(0, 1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <MinutePicker open={oraAleasa != null} ora={oraAleasa} pas={pas} durata={durata}
        ocupat={(m) => daySessions.some(x => seSuprapun(m, durata, x.startMin, durataSed(x, data.settings)))
          || !!blockConflict(blocuri, m, durata) || !!examConflict(examene, m, durata)}
        peste={data.settings.endMin}
        onClose={() => setOraAleasa(null)}
        onAlege={(m) => { setOraAleasa(null); onOpenSession('create', { date: selectedDate, startMin: m }); }} />

      <button onClick={() => onOpenSession('create', { date: selectedDate })}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        style={{ zIndex: LAYER.sheet - 1 }}>
        <Plus size={26} />
      </button>
    </div>
  );
}

/* La pas de 5, 10 sau 15 minute, ora din calendar se desface la atingere în
   minutele ei. Cele ocupate rămân vizibile, dar nu se pot alege. */
function MinutePicker({ open, ora, pas, durata, ocupat, peste, onClose, onAlege }) {
  if (!open || ora == null) return null;
  const minute = [];
  for (let m = ora; m < ora + 60 && m + durata <= peste; m += pas) minute.push(m);
  return (
    <div className="fixed inset-0 flex items-center justify-center px-6 ecran-peste" style={{ zIndex: LAYER.dialog }}>
      <div className="absolute inset-0 bg-slate-900/50 fade-anim" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-4 w-full max-w-sm fade-anim">
        <h3 className="font-semibold text-slate-900 mb-0.5">Ora {minToTime(ora)}</h3>
        <p className="text-xs text-slate-400 mb-3">Alege minutul de început. Ședința ține {durata} de minute.</p>
        <div className="grid grid-cols-4 gap-1.5 max-h-64 overflow-y-auto">
          {minute.map(m => {
            const nu = ocupat(m);
            return (
              <button key={m} disabled={nu} onClick={() => onAlege(m)}
                className={`py-2.5 rounded-xl text-sm font-mono-time border ${nu ? 'border-slate-200 text-slate-300' : 'border-slate-200 text-slate-800 active:bg-slate-50'}`}
                style={nu ? { textDecoration: 'line-through' } : undefined}>
                {minToTime(m)}
              </button>
            );
          })}
        </div>
        {minute.length === 0 && <p className="text-sm text-slate-400 text-center py-4">Nu mai încape nicio ședință în ora asta.</p>}
        <button onClick={onClose} className="w-full py-2.5 mt-3 rounded-xl border border-slate-200 text-slate-600 text-sm">Renunță</button>
      </div>
    </div>
  );
}

/* --------------------------- FIȘA UNEI ȘEDINȚE --------------------------- */

// Alegerea elevului: lista se deschide la atingere, iar pe măsură ce scrii rămân
// doar cei care se potrivesc. Căutarea nu ține cont de diacritice.
function AlegeElev({ elevi, value, onChange }) {
  const [deschis, setDeschis] = useState(false);
  const [q, setQ] = useState('');
  const ales = elevi.find(e => e.id === value) || null;
  const cauta = faraDia(q).trim();
  const lista = cauta
    ? elevi.filter(e => faraDia(`${e.name} ${e.group || ''}`).includes(cauta) || (e.phone || '').includes(q.trim()))
    : elevi;

  if (!deschis) {
    return (
      <div className="flex items-center gap-2 mb-3.5">
        <button type="button" onClick={() => { setDeschis(true); setQ(''); }}
          className={`${inputCls} text-left flex items-center gap-2`}>
          <Search size={15} className="text-slate-400 shrink-0" />
          <span className={ales ? 'text-slate-900 truncate' : 'text-slate-400'}>{ales ? ales.name : 'Alege elevul'}</span>
        </button>
        {ales && <Tort student={ales} />}
      </div>
    );
  }
  return (
    <div className="mb-3.5">
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input autoFocus value={q} onChange={e => setQ(e.target.value)}
          placeholder="Caută după nume, grupă sau telefon" className={`${inputCls} pl-10 pr-10`} />
        <button type="button" onClick={() => { setDeschis(false); setQ(''); }} aria-label="Închide lista"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-slate-400"><X size={16} /></button>
      </div>
      <div className="mt-1.5 rounded-xl border border-slate-200 bg-white overflow-y-auto" style={{ maxHeight: 220 }}>
        {lista.length === 0 && <div className="px-3.5 py-3 text-sm text-slate-400">Niciun elev nu se potrivește.</div>}
        {lista.map(e => (
          <button key={e.id} type="button" onClick={() => { onChange(e.id); setDeschis(false); setQ(''); }}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 text-left border-b border-slate-100 last:border-0 active:bg-slate-50">
            <span className="text-sm text-slate-800 truncate flex-1">{e.name}</span>
            <Tort student={e} size={13} />
            {e.group ? <span className="text-xs text-slate-400 shrink-0">gr. {e.group}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}

// Locațiile folosite des, ca butoane rapide sub câmpul de locație.
function LocationChips({ locations, value, onPick }) {
  if (!locations || !locations.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 -mt-2 mb-3.5">
      {locations.map(l => (
        <button key={l.id} type="button" onClick={() => onPick(l.name)}
          className="text-xs px-2.5 py-1 rounded-full border"
          style={value === l.name
            ? { background: 'var(--accent-soft)', borderColor: 'var(--accent-line)', color: 'var(--accent-ink)' }
            : { background: 'var(--surface)', borderColor: 'var(--line)', color: 'var(--muted)' }}>
          {l.name}
        </button>
      ))}
    </div>
  );
}

function SessionModal({ open, mode, initial, data, onClose, onSave, onDelete, onTrimiteConfirmare }) {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState(todayISO());
  const [startMin, setStartMin] = useState(data.settings.startMin);
  const [type, setType] = useState('included');
  const [status, setStatus] = useState('scheduled');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [otherInstructor, setOther] = useState(false);
  const [instructorName, setInstructorName] = useState('');
  const [english, setEnglish] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const durata = durataDin(data.settings);
  const student = data.students.find(s => s.id === studentId);
  const editing = mode === 'edit' ? initial : null;

  useEffect(() => {
    if (!open) return;
    setError(''); setConfirmDelete(false);
    if (mode === 'edit' && initial) {
      setStudentId(initial.studentId); setDate(initial.date); setStartMin(initial.startMin);
      setType(initial.type || 'included'); setStatus(initial.status || 'scheduled');
      setNotes(initial.notes || ''); setLocation(initial.location || '');
      setOther(!!initial.otherInstructor); setInstructorName(initial.instructorName || '');
      setEnglish(!!initial.english);
    } else {
      const start = initial && initial.startMin != null
        ? { date: initial.date || todayISO(), startMin: initial.startMin }
        : firstFreeSlot(data.sessions, data.settings, initial && initial.date);
      const st = initial && initial.studentId ? data.students.find(s => s.id === initial.studentId) : null;
      setStudentId(st ? st.id : '');
      setDate(start.date); setStartMin(start.startMin);
      setType(st ? suggestType(st, data.sessions) : 'included');
      setStatus('scheduled'); setNotes('');
      setLocation((st && st.defaultLocation) || '');
      setOther(false); setInstructorName(''); setEnglish(!!(st && st.english));
    }
  }, [open, mode, initial]);

  if (!open) return null;

  const sloturi = daySlots(data.settings);
  const alteSedinte = data.sessions.filter(s => s.date === date && s.status !== 'cancelled'
    && s.id !== (editing && editing.id) && !s.otherInstructor);
  const oraOcupata = (m) => alteSedinte.some(s => seSuprapun(m, durata, s.startMin, durataSed(s, data.settings)));

  function salveaza() {
    const prevError = error;
    if (!studentId) { setError('Alege elevul.'); return; }
    const excludeId = editing ? editing.id : null;

    if (!otherInstructor && isOverlapping(data.sessions, date, startMin, excludeId, data.settings)) {
      setError('Acest interval se suprapune cu altă ședință.'); return;
    }
    const examHit = examConflict(examBlocksForDate(data.students, date), startMin, durata);
    if (examHit && !prevError.startsWith('Atenție')) {
      setError(`Atenție: ${examHit.student.name} are examen ${examPeriodText(examHit.period)}. Apasă din nou „Salvează" ca să programezi oricum.`);
      return;
    }
    const blockHit = blockConflict(blocksForDate(data.settings, date), startMin, durata);
    if (blockHit && !prevError.startsWith('Atenție')) {
      setError(`Atenție: ai marcat intervalul ca indisponibil${blockHit.reason ? ` (${blockHit.reason})` : ''}. Apasă din nou „Salvează" ca să programezi oricum.`);
      return;
    }
    const turaHit = inTura(student, date, startMin, durata);
    if (turaHit && !prevError.startsWith('Atenție')) {
      setError(`Atenție: ${student.name} e în tură (${textTura(turaHit)}). Apasă din nou „Salvează" ca să programezi oricum.`);
      return;
    }
    if (hasSessionSameDay(data.sessions, studentId, date, excludeId) && !prevError.startsWith('Atenție')) {
      setError('Atenție: elevul are deja o ședință în ziua asta. Apasă din nou „Salvează" ca să o adaugi oricum.');
      return;
    }
    const limita = Number(student.weeklyLimit) || data.settings.defaultWeeklyLimit;
    if (sessionsInWeek(data.sessions, studentId, date, excludeId) >= limita && !prevError.startsWith('Atenție')) {
      setError(`Atenție: ${student.name} are deja ${limita} ședințe în săptămâna asta. Apasă din nou „Salvează" ca să o adaugi oricum.`);
      return;
    }
    const rezerva = reserveWarning(student, data.sessions, date, excludeId);
    if (rezerva && !prevError.startsWith('Atenție')) { setError(rezerva); return; }

    onSave({ studentId, date, startMin, type, status, notes, location, otherInstructor, instructorName, english }, mode, editing);
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={mode === 'edit' ? 'Ședință' : 'Ședință nouă'} layer={LAYER.form}
      footer={(
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm">Renunță</button>
          <button onClick={salveaza} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium">Salvează</button>
        </div>
      )}>
      {error ? (
        <div className="mb-3 px-3.5 py-2.5 rounded-xl text-sm"
          style={error.startsWith('Atenție')
            ? { background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', color: 'var(--accent-ink)' }
            : { background: 'var(--bad-soft)', border: '1px solid var(--bad-line)', color: 'var(--bad)' }}>
          {error}
        </div>
      ) : null}

      <span className="block text-xs font-medium text-slate-500 mb-1.5">Elev<span className="text-amber-600"> *</span></span>
      <AlegeElev
        elevi={[...data.students].filter(s => s.id === studentId || eDisponibil(s)).sort((a, b) => a.name.localeCompare(b.name, 'ro'))}
        value={studentId}
        onChange={(id) => {
          setStudentId(id);
          const st = data.students.find(s => s.id === id);
          setType(st ? suggestType(st, data.sessions) : 'included');
          if (mode !== 'edit') { setLocation((st && st.defaultLocation) || ''); setEnglish(!!(st && st.english)); }
        }} />

      <div className="grid grid-cols-2 gap-3">
        <Field label="Data" required>
          <input type="date" className={inputCls} value={date} onChange={e => setDate(e.target.value)} />
        </Field>
        <Field label="Ora" required>
          <select className={inputCls} value={startMin} onChange={e => setStartMin(Number(e.target.value))}>
            {sloturi.map(m => {
              const ocupat = !otherInstructor && m !== startMin && oraOcupata(m);
              return <option key={m} value={m} disabled={ocupat}>{minToTime(m)} – {minToTime(m + durata)}{ocupat ? ' (ocupat)' : ''}</option>;
            })}
          </select>
        </Field>
      </div>

      <Field label="Locație de start">
        <input className={inputCls} value={location} onChange={e => setLocation(e.target.value)} placeholder="Ex: Piața Gării, la fântână" />
      </Field>
      <LocationChips locations={data.settings.locations} value={location} onPick={setLocation} />
      {location.trim() && (
        <a href={hartaHref(locatiaDupaNume(data.settings, location), location)} target="_blank" rel="noopener noreferrer"
          style={{ touchAction: 'manipulation' }}
          className="w-full -mt-2 mb-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium flex items-center justify-center gap-1.5">
          <MapPin size={14} />Deschide locația
        </a>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Tip oră">
          <select className={inputCls} value={type} onChange={e => setType(e.target.value)}>
            {data.settings.rateTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={inputCls} value={status} onChange={e => setStatus(e.target.value)}>
            {Object.entries(STATUS_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Notițe">
        <textarea rows={2} className={inputCls} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ce ați lucrat, ce mai are de exersat" />
      </Field>

      {/* Ședința ținută de alt instructor se trece în evidență, dar nu ocupă
          intervalul tău și nu intră la salariu. */}
      <button type="button" onClick={() => setOther(!otherInstructor)}
        className="w-full flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 mb-3.5 text-left"
        style={otherInstructor
          ? { borderColor: 'var(--accent-line)', background: 'var(--accent-soft)' }
          : { borderColor: 'var(--line)', background: 'var(--surface)' }}>
        <span className="flex items-center justify-center rounded-md shrink-0"
          style={{
            width: 18, height: 18, border: `1.5px solid ${otherInstructor ? 'var(--accent)' : 'var(--line-2)'}`,
            background: otherInstructor ? 'var(--accent)' : 'transparent', color: '#3a2100',
            fontSize: 12, fontWeight: 900, lineHeight: 1,
          }}>{otherInstructor ? '✓' : ''}</span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-medium text-slate-800">Ținută de alt instructor</span>
          <span className="block text-xs text-slate-400">Se scade din orele elevului, dar nu-ți ocupă intervalul.</span>
        </span>
      </button>
      {otherInstructor && (
        <Field label="Numele instructorului">
          <input className={inputCls} value={instructorName} onChange={e => setInstructorName(e.target.value)} />
        </Field>
      )}

      <button type="button" onClick={() => setEnglish(!english)}
        className="w-full flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 mb-3.5 text-left"
        style={english
          ? { borderColor: 'var(--accent-line)', background: 'var(--accent-soft)' }
          : { borderColor: 'var(--line)', background: 'var(--surface)' }}>
        <span className="flex items-center justify-center rounded-md shrink-0"
          style={{
            width: 18, height: 18, border: `1.5px solid ${english ? 'var(--accent)' : 'var(--line-2)'}`,
            background: english ? 'var(--accent)' : 'transparent', color: '#3a2100',
            fontSize: 12, fontWeight: 900, lineHeight: 1,
          }}>{english ? '✓' : ''}</span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-medium text-slate-800">Ședință în engleză</span>
          <span className="block text-xs text-slate-400">La salariu se aplică tariful pentru ședințe în engleză.</span>
        </span>
      </button>

      {mode === 'edit' && student && student.phone && status !== 'cancelled' && (
        <button onClick={() => onTrimiteConfirmare({
          studentId, date, startMin, type, status, notes, location, otherInstructor, instructorName, english,
          duration: editing && editing.duration,
        })}
          className="w-full py-2.5 mt-1 mb-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-medium flex items-center justify-center gap-1.5">
          <Send size={14} />Trimite confirmarea elevului
        </button>
      )}

      {mode === 'edit' && (
        <button onClick={() => setConfirmDelete(true)} className="w-full text-center text-xs text-red-500 py-2">Șterge definitiv ședința</button>
      )}

      <ConfirmDialog open={confirmDelete} title="Ștergi ședința?"
        message={'Dispare din calendar și din istoricul elevului. Dacă vrei doar să o oprești, folosește statusul „Anulată".'}
        confirmLabel="Șterge" danger
        onConfirm={() => { setConfirmDelete(false); onDelete(editing.id); }}
        onCancel={() => setConfirmDelete(false)} />
    </BottomSheet>
  );
}

/* --------------------------------- ELEVI --------------------------------- */

function StudentsTab({ data, onOpenStudent, onAddStudent, onOpenReport }) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState(1);

  const cauta = faraDia(query).trim();
  const seePotrivesc = (s) => !cauta
    || faraDia(`${s.name || ''} ${s.firstName || ''} ${s.lastName || ''}`).includes(cauta)
    || faraDia(s.group).includes(cauta)
    || (s.phone || '').replace(/\s+/g, '').includes(query.replace(/\s+/g, ''));

  const byName = (a, b) => (a.name || '').localeCompare(b.name || '', 'ro');

  /* Fiecare criteriu merge în ambele sensuri: a doua atingere pe același buton
     îl întoarce. Elevii cărora le lipsește valoarea rămân la coadă în ambele
     sensuri — n-au ce compara. */
  const dupaText = (val) => (a, b) => {
    const x = val(a) || ''; const y = val(b) || '';
    if (!x && !y) return byName(a, b);
    if (!x) return 1;
    if (!y) return -1;
    return sortDir * x.localeCompare(y, 'ro') || byName(a, b);
  };
  const dupaNumar = (val) => (a, b) => (sortDir * (val(b) - val(a))) || byName(a, b);

  // Grupa se compară ca număr: altfel „10" ar veni înaintea lui „9".
  const grupaVal = (st) => {
    const t = String(st.group || '').trim();
    if (!t) return { rang: 2, n: 0 };
    const cifre = t.replace(/[^0-9]/g, '');
    return { rang: /os/i.test(t) ? 1 : 0, n: cifre ? Number(cifre) : Number.MAX_SAFE_INTEGER };
  };
  const dupaGrupa = (a, b) => {
    const x = grupaVal(a); const y = grupaVal(b);
    if (x.rang !== y.rang) return x.rang - y.rang;
    return (sortDir * (x.n - y.n)) || byName(a, b);
  };

  const sorters = {
    name: (a, b) => sortDir * byName(a, b),
    grupa: dupaGrupa,
    exam: dupaText(s => s.examDate),
    theory: dupaText(s => s.theoryExamDate),
    remaining: dupaNumar(s => studentBookedRemaining(s, data.sessions)),
    debt: dupaNumar(s => studentOutstanding(s, data.sessions, data.settings)),
    recent: (a, b) => (sortDir * (b.enrollDate || '').localeCompare(a.enrollDate || '')) || byName(a, b),
    area: dupaText(s => s.area),
    place: dupaText(s => s.defaultLocation),
  };
  const sorter = sorters[sortBy] || sorters.name;

  const promovat = (s) => s.examResult === 'promovat';
  const list = data.students.filter(s => seePotrivesc(s) && !s.withdrawn && !promovat(s) && !eInAsteptare(s)).sort(sorter);
  const asteptare = data.students.filter(s => seePotrivesc(s) && !s.withdrawn && eInAsteptare(s))
    .sort((a, b) => (a.asteptareDin || '').localeCompare(b.asteptareDin || '') || byName(a, b));
  const passed = data.students.filter(s => seePotrivesc(s) && !s.withdrawn && promovat(s))
    .sort((a, b) => (b.examDate || '').localeCompare(a.examDate || '') || byName(a, b));
  const gone = data.students.filter(s => seePotrivesc(s) && s.withdrawn).sort(byName);

  const rand = (s, sters) => {
    const total = studentTotalHours(s);
    const facute = studentCompletedCount(data.sessions, s.id);
    const ramase = studentBookedRemaining(s, data.sessions);
    const datorie = studentOutstanding(s, data.sessions, data.settings);
    const z = eInAsteptare(s) ? zileDeAsteptare(s) : null;
    return (
      <div key={s.id} role="button" tabIndex={0} onClick={() => onOpenStudent(s.id)}
        className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-left"
        style={sters ? { opacity: 0.55 } : undefined}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-medium text-slate-900 text-sm truncate">{s.name}</span>
          <Tort student={s} />
          <Plate student={s} county={s.county} h={20} />
          <span className="flex-1" />
          {!sters && promovat(s) && <span className="shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">promovat</span>}
          {!sters && s.examResult === 'respins' && <span className="shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">respins</span>}
          {z && (
            <span className="shrink-0 text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)', border: '1px solid var(--accent-line)' }}>
              {z.ramase === 0 ? 'gata de adeverință' : `așteptare · ${z.ramase} zile`}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{facute}/{total} ore</span>
          {ramase > 0 ? <span>· {ramase} rămase</span> : <span>· terminate</span>}
          {datorie > 0.5 ? <span style={{ color: 'var(--bad)' }}>· {Math.round(datorie).toLocaleString('ro-RO')} {data.settings.currency}</span> : null}
          {s.examDate ? <span>· examen {fmtHuman(s.examDate)}</span> : null}
        </div>
        <div className="mt-2"><ProgressBar value={total ? (facute / total) * 100 : 0} /></div>
      </div>
    );
  };

  return (
    <div className="pb-4">
      <div className="px-4 pt-4 pb-1 flex items-center justify-between gap-2">
        <h1 className="font-display text-xl font-semibold text-slate-900 uppercase tracking-wide">Elevi</h1>
        <button onClick={onOpenReport}
          className="shrink-0 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-medium flex items-center gap-1.5">
          <Download size={14} />Raport
        </button>
      </div>

      <div className="px-4 mt-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Caută nume, telefon sau grupă" className={`${inputCls} pl-10 ${query ? 'pr-10' : ''}`} />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Șterge căutarea"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-slate-400"><X size={16} /></button>
          )}
        </div>
      </div>

      <div className="px-4 mt-2.5 overflow-x-auto">
        <div className="flex gap-1.5" style={{ minWidth: 'min-content' }}>
          {[['name', 'Nume'], ['grupa', 'Grupă'], ['exam', 'Ex. practic'], ['theory', 'Ex. teoretic'],
            ['area', 'Zonă'], ['place', 'Punct start'], ['remaining', 'Ore rămase'], ['debt', 'Datorie'], ['recent', 'Recent']]
            .map(([id, label]) => {
              const activ = sortBy === id;
              return (
                <button key={id}
                  onClick={() => { if (activ) setSortDir(d => -d); else { setSortBy(id); setSortDir(1); } }}
                  aria-label={activ ? `${label}, atinge din nou ca să întorci ordinea` : label}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border shrink-0 flex items-center gap-1 ${activ ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}>
                  {label}
                  {activ && <ChevronRight size={12} style={{ transform: sortDir === 1 ? 'rotate(90deg)' : 'rotate(-90deg)' }} />}
                </button>
              );
            })}
        </div>
      </div>

      <div className="px-4 mt-3">
        {list.length === 0 && passed.length === 0 && gone.length === 0 && asteptare.length === 0 && (
          <div className="text-center py-10 text-sm text-slate-400">
            {data.students.length === 0 ? 'Niciun elev încă. Adaugă primul elev.' : 'Niciun rezultat.'}
          </div>
        )}
        {(list.length > 0 || passed.length > 0 || gone.length > 0 || asteptare.length > 0) && (
          <Section title={`În curs · ${list.length}`} defaultOpen>
            {list.length === 0
              ? <div className="text-center py-6 text-sm text-slate-400">Niciun elev în curs.</div>
              : <div className="space-y-2">{list.map(s => rand(s, false))}</div>}
          </Section>
        )}
        {asteptare.length > 0 && (
          <Section title={`În așteptare · ${asteptare.length}`} defaultOpen>
            <div className="space-y-2">{asteptare.map(s => rand(s, false))}</div>
          </Section>
        )}
        {passed.length > 0 && (
          <Section title={`Promovați · ${passed.length}`}>
            <div className="space-y-2">{passed.map(s => rand(s, false))}</div>
          </Section>
        )}
        {gone.length > 0 && (
          <Section title={`Retrași · ${gone.length}`}>
            <div className="space-y-2">{gone.map(s => rand(s, true))}</div>
          </Section>
        )}
      </div>

      <button onClick={onAddStudent}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        style={{ zIndex: LAYER.sheet - 1 }}>
        <Plus size={26} />
      </button>
    </div>
  );
}

/* ---------------------------- FIȘA UNUI ELEV ----------------------------- */

function StudentProfile({ open, student, sessions, settings, onClose, onEdit, onAddSession, onOpenSession,
  onNotify, onAddPayment, onEditPayment, onSetFeeCount, onRecordExam, onExportStudent,
  poateTransfera, onElibereazaAdeverinta, onBunVenitTrimis }) {
  const [payOpen, setPayOpen] = useState(false);
  if (!open || !student) return null;

  const total = studentTotalHours(student);
  const facute = studentCompletedCount(sessions, student.id);
  const rezervate = Math.max(0, studentUsedCount(sessions, student.id) - facute);
  const ramase = studentBookedRemaining(student, sessions);
  const datorie = studentOutstanding(student, sessions, settings);
  const acumulat = studentAccruedDebt(student, sessions, settings);
  const platit = studentPaidTotal(student);
  const cur = settings.currency;

  const istoric = sessions.filter(s => s.studentId === student.id)
    .sort((a, b) => (b.date + minToTime(b.startMin)).localeCompare(a.date + minToTime(a.startMin)));
  const viitoare = istoric.filter(s => s.date >= todayISO() && s.status !== 'cancelled')
    .sort((a, b) => (a.date + minToTime(a.startMin)).localeCompare(b.date + minToTime(b.startMin)));
  const platiMap = sessionPaymentMap(student, sessions, settings);

  // Locurile apar o singură dată, la coada listei: dacă toate ședințele pornesc
  // din același punct, e un singur link, nu unul sub fiecare rând.
  const locuri = [...new Set(viitoare.map(x => x.location).filter(Boolean))]
    .map(n => ({ n, link: hartaScurt(locatiaDupaNume(settings, n), n) }))
    .filter(x => x.link);
  const linkuriLocuri = locuri.length === 0 ? ''
    : locuri.length === 1 ? `\nLocul: ${locuri[0].link}`
      : `\n${locuri.map(x => `${x.n}: ${x.link}`).join('\n')}`;
  const mesajProgram = `${adresare(student).salut}, ${greetName(student)}! Ședințele tale de conducere programate:\n`
    + `${viitoare.map(s => `• ${fmtShort(s.date)}, ${minToTime(s.startMin)}–${minToTime(s.startMin + durataSed(s, settings))}${s.location ? ` · ${s.location}` : ''}`).join('\n')}`
    + `${linkuriLocuri}\nTe rog confirmă. Mulțumesc!`;

  return (
    <BottomSheet open={open} onClose={onClose} title={student.name} layer={LAYER.form}>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Tort student={student} size={18} />
        <Plate student={student} county={student.county} h={28} />
        {student.group ? <span className="text-xs text-slate-400">grupa {student.group}</span> : null}
        <span className="flex-1" />
        <button onClick={() => onEdit(student)} className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs flex items-center gap-1.5">
          <Pencil size={13} />Editează
        </button>
      </div>

      {/* așteptarea după examenul picat */}
      {eInAsteptare(student) && (() => {
        const z = zileDeAsteptare(student);
        const gata = z.ramase === 0;
        return (
          <div className="rounded-xl px-3.5 py-3 mb-4"
            style={gata ? { background: 'var(--ok-soft)', border: '1px solid var(--ok-line)' }
              : { background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}>
            <div className="text-sm font-medium" style={{ color: gata ? 'var(--ok)' : 'var(--accent-ink)' }}>
              {gata ? 'Poate primi adeverința' : 'În așteptare după examen'}
            </div>
            <div className="text-xs text-slate-500 mt-0.5 mb-2.5">
              {student.asteptareDin ? `Examen picat pe ${fmtHuman(student.asteptareDin)}. ` : ''}
              {gata ? `Au trecut ${deZile(z.trecute)}. Eliberează adeverința ca să-l poți programa din nou.`
                : `Au trecut ${z.trecute} din ${ZILE_ASTEPTARE} zile — mai sunt ${z.ramase}. Până atunci nu apare în plan și nici la programare.`}
            </div>
            <button onClick={() => onElibereazaAdeverinta(student.id)}
              className="w-full py-2.5 rounded-xl text-white text-sm font-medium"
              style={{ background: gata ? 'var(--ok)' : 'var(--invert)' }}>
              Am eliberat adeverința
            </button>
          </div>
        );
      })()}

      {/* ședințele obligatorii de după adeverință */}
      {!eInAsteptare(student) && student.adeverintaDin && (() => {
        const f = sedinteDupaAdeverinta(student, sessions);
        if (f >= SEDINTE_DUPA_ADEVERINTA) return null;
        return (
          <div className="rounded-xl px-3.5 py-3 mb-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
            <div className="text-sm font-medium text-slate-800">Ședințe obligatorii după adeverință</div>
            <div className="text-xs text-slate-500 mt-0.5 mb-2">
              {f} din {SEDINTE_DUPA_ADEVERINTA} efectuate de la {fmtHuman(student.adeverintaDin)}. Abia după ele poate fi reprogramat la examen.
            </div>
            <ProgressBar value={(f / SEDINTE_DUPA_ADEVERINTA) * 100} />
          </div>
        );
      })()}

      {/* rezultatul examenului, cerut după ce a trecut ziua */}
      {student.examDate && student.examDate <= todayISO() && student.examResult !== 'promovat' && (
        <div className="rounded-xl px-3.5 py-3 mb-4" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}>
          <div className="text-sm font-medium mb-2" style={{ color: 'var(--accent-ink)' }}>
            Cum a fost examenul din {fmtHuman(student.examDate)}?
          </div>
          <div className="flex gap-2">
            <button onClick={() => onRecordExam(student.id, 'promovat')}
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: 'var(--ok)' }}>Promovat</button>
            <button onClick={() => onRecordExam(student.id, 'respins')}
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: 'var(--bad)' }}>Respins</button>
          </div>
        </div>
      )}

      {/* progresul orelor */}
      <div className="rounded-xl bg-white border border-slate-200 px-3.5 py-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-700">{facute} din {total} ore efectuate</span>
          <span className="text-xs text-slate-400">{ramase} rămase</span>
        </div>
        <ProgressBar value={total ? (facute / total) * 100 : 0} />
        <div className="mt-2 space-y-0.5 text-xs text-slate-400">
          <div>{student.includedHours || 0} incluse · {student.extraHours || 0} suplimentare</div>
          {rezervate > 0 ? <div>{rezervate} programate în calendar: nu scad rămasele până nu sunt efectuate</div> : null}
          {studentOtherInstructorCount(sessions, student.id) > 0
            ? <div>din care cu alți instructori: {studentOtherInstructorCount(sessions, student.id)}</div> : null}
          {(() => {
            const neprog = Math.max(0, (Number(student.extraHours) || 0)
              - sessions.filter(x => x.studentId === student.id && x.status !== 'cancelled' && x.type !== 'included').length);
            return neprog > 0 ? <div>{neprog} ore suplimentare încă neprogramate</div> : null;
          })()}
        </div>
      </div>

      {/* datele de contact și situația */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm mb-4">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Telefon</div>
          {student.phone
            ? <a href={telHref(student.phone)} className="text-slate-800 flex items-center gap-1"><Phone size={12} className="text-slate-400" />{student.phone}</a>
            : <div className="text-slate-400">—</div>}
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Categorie</div>
          <div className="text-slate-800">{student.licenseCategory || 'B'}</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Naștere</div>
          <div className="text-slate-800">{student.birthDate ? fmtHuman(student.birthDate) : '—'}</div>
          {student.birthDate && varsta(student.birthDate) != null && (
            <div className="text-xs mt-0.5" style={{ color: implineste18(student.birthDate) ? 'var(--accent-ink)' : 'var(--muted-2)' }}>
              {varsta(student.birthDate)} ani{implineste18(student.birthDate) ? ` · 18 pe ${fmtHuman(implineste18(student.birthDate))}` : ''}
            </div>
          )}
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Înscriere</div>
          <div className="text-slate-800">{student.enrollDate ? fmtHuman(student.enrollDate) : '—'}</div>
        </div>
        {student.examDate ? (
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Examen practic</div>
            <div className="text-slate-800">{fmtHuman(student.examDate)}</div>
            {student.examPeriod ? <div className="text-xs text-slate-400">{examPeriodText(student.examPeriod)}</div> : null}
          </div>
        ) : null}
        {student.theoryExamDate ? (
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Examen teoretic</div>
            <div className="text-slate-800">{fmtHuman(student.theoryExamDate)}</div>
            {student.theoryExamResult ? (
              <div className="text-xs mt-0.5" style={{ color: student.theoryExamResult === 'promovat' ? 'var(--ok)' : 'var(--bad)' }}>
                {student.theoryExamResult === 'promovat' ? 'promovat' : 'respins'}
              </div>
            ) : null}
          </div>
        ) : null}
        {student.area ? (
          <div><div className="text-xs text-slate-400 mb-0.5">Zona</div><div className="text-slate-800">{student.area}</div></div>
        ) : null}
        {student.defaultLocation ? (
          <div className="col-span-2">
            <div className="text-xs text-slate-400 mb-0.5">Locație de start implicită</div>
            <a href={hartaHref(locatiaDupaNume(settings, student.defaultLocation), student.defaultLocation, 'dir')}
              target="_blank" rel="noopener noreferrer" style={{ touchAction: 'manipulation' }}
              className="text-slate-800 flex items-center gap-1">
              <MapPin size={12} className="shrink-0" style={{ color: 'var(--accent-ink)' }} />{student.defaultLocation}
            </a>
          </div>
        ) : null}
      </div>

      {student.notes && student.notes.trim() ? (
        <div className="rounded-xl px-3.5 py-3 mb-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Notițe</div>
          <div className="text-sm text-slate-700" style={{ whiteSpace: 'pre-wrap' }}>{student.notes}</div>
        </div>
      ) : null}

      {/* banii */}
      <div className="rounded-xl bg-white border border-slate-200 px-3.5 py-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-700">{datorie > 0.5 ? 'Datorie ore' : 'Achitat la zi'}</span>
          <span className="font-mono-time text-sm font-semibold" style={{ color: datorie > 0.5 ? 'var(--bad)' : 'var(--ok)' }}>
            {Math.round(Math.max(0, datorie)).toLocaleString('ro-RO')} {cur}
          </span>
        </div>
        <div className="text-xs text-slate-400 mt-0.5">
          Acumulat: {Math.round(acumulat).toLocaleString('ro-RO')} · Plătit: {Math.round(platit).toLocaleString('ro-RO')} {cur}
        </div>
        <button onClick={() => setPayOpen(true)} className="w-full py-2.5 mt-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-1.5">
          <Banknote size={14} />Adaugă plată
        </button>
      </div>

      <StudentFees student={student} settings={settings} onSet={onSetFeeCount} />

      {(student.payments || []).length > 0 && (
        <Section title="Istoric plăți" summary={`${student.payments.length}`}>
          <div className="space-y-1.5">
            {[...student.payments].sort((a, b) => (b.date || '').localeCompare(a.date || '')).map(p => (
              <button key={p.id} onClick={() => onEditPayment(student.id, p)}
                className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-left">
                <span className="min-w-0">
                  <span className="block text-sm text-slate-800">{p.date ? fmtHuman(p.date) : '—'}</span>
                  {p.collector === 'school' ? <span className="block text-xs text-slate-400">achitat la școală</span> : null}
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className={`font-mono-time text-sm font-medium ${p.collector === 'school' ? 'text-slate-500' : 'text-emerald-700'}`}>
                    {Math.round(Number(p.amount) || 0).toLocaleString('ro-RO')} {cur}
                  </span>
                  <Pencil size={14} className="text-slate-300" />
                </span>
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* butoane de legătură cu elevul */}
      {student.phone && !student.bunVenitTrimis && (
        <button onClick={() => onNotify({
          name: student.name, phone: student.phone, title: 'Trimite mesajul de bun venit',
          message: mesajBunVenit(student, settings), onTrimis: () => onBunVenitTrimis(student.id),
        })}
          className="w-full py-2.5 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-1.5 mb-2.5"
          style={{ background: 'var(--invert)' }}>
          <MessageCircle size={14} />Trimite mesajul de bun venit
        </button>
      )}

      {student.phone && viitoare.length > 0 && (
        <button onClick={() => onNotify({ name: student.name, phone: student.phone, title: 'Trimite programul', message: mesajProgram })}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium flex items-center justify-center gap-1.5 mb-2.5">
          <MessageCircle size={14} />Trimite programul elevului
        </button>
      )}

      <button onClick={() => onAddSession(student)}
        className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium flex items-center justify-center gap-1.5 mb-2.5">
        <Plus size={14} />Programează o ședință
      </button>

      {poateTransfera && (
        <button onClick={() => onExportStudent(student)}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium flex items-center justify-center gap-1.5 mb-2.5">
          <Download size={14} />Trimite elevul altui instructor
        </button>
      )}

      <Section title="Istoric ședințe" summary={istoric.length ? `${istoric.length}` : 'gol'}>
        {istoric.length === 0 ? (
          <div className="text-sm text-slate-400 py-2">Nicio ședință încă.</div>
        ) : (
          <div className="space-y-1.5">
            {istoric.map(s => {
              const meta = STATUS_META[s.status] || STATUS_META.scheduled;
              const plata = platiMap[s.id];
              return (
                <button key={s.id} onClick={() => onOpenSession(s)}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-left">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-slate-800">{fmtShort(s.date)}, {minToTime(s.startMin)}</span>
                    <span className="block text-xs text-slate-400 truncate">
                      {(settings.rateTypes.find(rt => rt.id === s.type) || {}).name || s.type}
                      {s.otherInstructor ? ` · ${s.instructorName || 'alt instructor'}` : ''}
                      {plata === 'package' ? ' · din pachet' : plata === 'due' ? ' · de plată' : plata === 'partial' ? ' · parțial' : ''}
                    </span>
                  </span>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full bg-${meta.c}-50 text-${meta.c}-700 border border-${meta.c}-200`}>
                    {meta.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </Section>

      <PayDialog open={payOpen} currency={cur} datorie={datorie}
        onClose={() => setPayOpen(false)}
        onSave={(suma, colector, data2) => { setPayOpen(false); onAddPayment(student.id, suma, colector, data2); }} />
    </BottomSheet>
  );
}

// Taxele bifate pe cardul elevului, cu +/− pentru fiecare.
function StudentFees({ student, settings, onSet }) {
  const tipuri = feeTypesOf(settings);
  if (!tipuri.length) return null;
  return (
    <Section title="Taxe" summary={`${tipuri.reduce((s, f) => s + feeCountOf(student, f.id), 0)}`}>
      <div className="space-y-2">
        {tipuri.map(f => {
          const n = feeCountOf(student, f.id);
          const pret = Number(f.price) || 0;
          const ore = Number(f.hours) || 0;
          return (
            <div key={f.id} className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200">
              <span className="flex-1 min-w-0 text-sm text-slate-800">
                {f.name} <span className="text-slate-400">· {pret.toLocaleString('ro-RO')} {settings.currency}{ore > 0 ? ` · +${ore} ${numeOre(oreTipul(f))}` : ''}</span>
              </span>
              <button onClick={() => onSet(student.id, f.id, Math.max(0, n - 1))}
                className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 shrink-0">−</button>
              <span className="font-mono-time text-sm w-5 text-center">{n}</span>
              <button onClick={() => onSet(student.id, f.id, n + 1)}
                className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 shrink-0">+</button>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-slate-400 mt-2">Se adaugă la datoria elevului cu butoanele +/−.</p>
    </Section>
  );
}

function PayDialog({ open, currency, datorie, onClose, onSave }) {
  const [suma, setSuma] = useState('');
  const [colector, setColector] = useState('me');
  const [data2, setData2] = useState(todayISO());
  useEffect(() => { if (open) { setSuma(''); setColector('me'); setData2(todayISO()); } }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center px-6 ecran-peste" style={{ zIndex: LAYER.dialog }}>
      <div className="absolute inset-0 bg-slate-900/50 fade-anim" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm fade-anim">
        <h3 className="font-semibold text-slate-900 mb-0.5">Adaugă plată</h3>
        <p className="text-xs text-slate-400 mb-3">
          {datorie > 0.5 ? `Are de achitat ${Math.round(datorie).toLocaleString('ro-RO')} ${currency}.` : 'Nu are datorie.'}
        </p>
        <Field label="Sumă" required>
          <input type="number" min="0" inputMode="decimal" className={inputCls} value={suma} onChange={e => setSuma(e.target.value)} />
        </Field>
        <Field label="Data"><input type="date" className={inputCls} value={data2} onChange={e => setData2(e.target.value)} /></Field>
        <Field label="Cine a încasat">
          <select className={inputCls} value={colector} onChange={e => setColector(e.target.value)}>
            <option value="me">Eu</option>
            <option value="school">Școala</option>
          </select>
        </Field>
        <div className="flex gap-2 mt-1">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm">Renunță</button>
          <button onClick={() => { const n = Number(suma) || 0; if (n > 0) onSave(n, colector, data2); }}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm">Salvează</button>
        </div>
      </div>
    </div>
  );
}

function PaymentEditDialog({ open, payment, currency, onClose, onSave, onDelete }) {
  const [suma, setSuma] = useState('');
  const [colector, setColector] = useState('me');
  const [data2, setData2] = useState(todayISO());
  useEffect(() => {
    if (open && payment) {
      setSuma(String(payment.amount || ''));
      setColector(payment.collector || 'me');
      setData2(payment.date || todayISO());
    }
  }, [open, payment]);
  if (!open || !payment) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center px-6 ecran-peste" style={{ zIndex: LAYER.dialog }}>
      <div className="absolute inset-0 bg-slate-900/50 fade-anim" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm fade-anim">
        <h3 className="font-semibold text-slate-900 mb-3">Corectează plata</h3>
        <Field label="Sumă" required>
          <input type="number" min="0" inputMode="decimal" className={inputCls} value={suma} onChange={e => setSuma(e.target.value)} />
        </Field>
        <Field label="Data"><input type="date" className={inputCls} value={data2} onChange={e => setData2(e.target.value)} /></Field>
        <Field label="Cine a încasat">
          <select className={inputCls} value={colector} onChange={e => setColector(e.target.value)}>
            <option value="me">Eu</option>
            <option value="school">Școala</option>
          </select>
        </Field>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm">Renunță</button>
          <button onClick={() => onSave({ ...payment, amount: Number(suma) || 0, collector: colector, date: data2 })}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm">Salvează</button>
        </div>
        <button onClick={() => onDelete(payment.id)} className="w-full py-2 mt-2 text-xs" style={{ color: 'var(--bad)' }}>
          Șterge plata
        </button>
      </div>
    </div>
  );
}

/* ------------------------ FORMULARUL DE ELEV ----------------------------- */

function StudentModal({ open, mode, initial, settings, sessions, onClose, onSave, onDelete }) {
  const gol = () => ({
    lastName: '', firstName: '', sex: '', phone: '', regNumber: '', group: '',
    licenseCategory: 'B', county: settings.defaultCounty || 'B', area: '', birthDate: '',
    includedHours: 0, extraHours: 0, enrollDate: todayISO(), weeklyLimit: settings.defaultWeeklyLimit,
    examDate: '', examPeriod: '', theoryExamDate: '', defaultLocation: '', notes: '',
    availDays: [], availParity: '', availFrom: '', availTo: '', minGapDays: 0,
    tura: '', turaData: '', turaOra: 420, turaLucru: '', turaLiber: '', turaOdihna: '',
    theoryExamResult: '', theoryExamAttempts: 0, examAttempts: 0,
    english: false, withdrawn: false, asteptare: false, pachet: '',
  });
  const [form, setForm] = useState(gol());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [gpsElev, setGpsElev] = useState('');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Punctul de domiciliu, prins de la fața locului. E o singură dată per elev.
  async function prindeCasa() {
    setGpsElev('caut');
    try {
      const c = await iaPozitia();
      setForm(f => ({ ...f, lat: c.lat, lng: c.lng }));
      setGpsElev('');
    } catch (e) {
      setGpsElev(e && e.code === 1 ? 'refuzat' : 'eroare');
    }
  }

  useEffect(() => {
    if (!open) return;
    setConfirmDelete(false); setGpsElev('');
    if (mode === 'edit' && initial) {
      setForm({ ...gol(), ...initial });
    } else {
      setForm(gol());
    }
  }, [open, mode, initial]);

  if (!open) return null;

  const pachete = feeTypesOf(settings).filter(f => Number(f.hours) > 0);
  const alesPachet = pachete.find(f => f.id === form.pachet);
  const esteOS = String(form.group || '').trim().toUpperCase() === 'OS';

  function salveaza() {
    const nume = `${(form.lastName || '').trim()} ${(form.firstName || '').trim()}`.trim();
    if (!nume) return;
    onSave({
      ...form,
      name: nume,
      includedHours: Number(form.includedHours) || 0,
      extraHours: Number(form.extraHours) || 0,
      weeklyLimit: Number(form.weeklyLimit) || settings.defaultWeeklyLimit,
      minGapDays: Number(form.minGapDays) || 0,
      theoryExamAttempts: Number(form.theoryExamAttempts) || 0,
      examAttempts: Number(form.examAttempts) || 0,
    }, mode, initial);
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={mode === 'edit' ? 'Editează elevul' : 'Elev nou'} layer={LAYER.form}
      footer={(
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm">Renunță</button>
          <button onClick={salveaza} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium">Salvează</button>
        </div>
      )}>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nume de familie" required>
          <input className={inputCls} value={form.lastName} onChange={e => set('lastName', e.target.value)} />
        </Field>
        <Field label="Prenume" required>
          <input className={inputCls} value={form.firstName} onChange={e => set('firstName', e.target.value)} />
        </Field>
      </div>
      <Field label="Sex">
        <select className={inputCls} value={form.sex || ''} onChange={e => set('sex', e.target.value)}>
          <option value="">Nespecificat</option>
          <option value="m">Masculin</option>
          <option value="f">Feminin</option>
        </select>
      </Field>
      <p className="text-xs text-slate-400 -mt-2 mb-3.5">
        În mesaje se folosește doar primul prenume, iar adresarea se acordă: „Salut, Andrei!" la băieți, „Bună, Ana!" la fete. Fără mențiune, mesajul rămâne neutru.
      </p>

      <Field label="Telefon">
        <input className={inputCls} type="tel" inputMode="tel" autoComplete="tel" value={form.phone}
          onChange={e => set('phone', e.target.value)} placeholder="07xx xxx xxx" />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Nr. înregistrare">
          <input className={inputCls} inputMode="numeric" value={form.regNumber} onChange={e => set('regNumber', e.target.value)} />
        </Field>
        <Field label="Grupa">
          <input className={inputCls} inputMode="numeric" value={form.group || ''} onChange={e => set('group', e.target.value)} placeholder="2 cifre" />
        </Field>
      </div>
      {/* Tastatura de cifre n-are litere, așa că „OS" se pune de aici. */}
      <button type="button" onClick={() => set('group', esteOS ? '' : 'OS')}
        className="w-full flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 mb-3.5 text-left"
        style={esteOS ? { borderColor: 'var(--accent-line)', background: 'var(--accent-soft)' } : { borderColor: 'var(--line)', background: 'var(--surface)' }}>
        <span className="flex items-center justify-center rounded-md shrink-0"
          style={{
            width: 18, height: 18, border: `1.5px solid ${esteOS ? 'var(--accent)' : 'var(--line-2)'}`,
            background: esteOS ? 'var(--accent)' : 'transparent', color: '#3a2100', fontSize: 12, fontWeight: 900, lineHeight: 1,
          }}>{esteOS ? '✓' : ''}</span>
        <span className="text-sm font-medium text-slate-800 flex-1">OS · ore suplimentare</span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Categoria">
          <select className={inputCls} value={form.licenseCategory} onChange={e => set('licenseCategory', e.target.value)}>
            {LICENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Județ">
          <select className={inputCls} value={form.county} onChange={e => set('county', e.target.value)}>
            {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      {pachete.length > 0 && (
        <>
          <Field label="Școlarizare">
            <select className={inputCls} value={form.pachet || ''} onChange={e => set('pachet', e.target.value)}>
              <option value="">Nu acum</option>
              {pachete.map(f => (
                <option key={f.id} value={f.id}>
                  {f.name} · {(Number(f.price) || 0).toLocaleString('ro-RO')} · {Number(f.hours)} {numeOre(oreTipul(f))}
                </option>
              ))}
            </select>
          </Field>
          <p className="text-xs text-slate-400 -mt-2 mb-3.5">
            {alesPachet
              ? (alesPachet.laScoala
                ? `Îi adaugă ${Number(alesPachet.hours)} ${numeOre(oreTipul(alesPachet))} și trece cei ${(Number(alesPachet.price) || 0).toLocaleString('ro-RO')} ${settings.currency} ca plată făcută direct la școală — nu rămâne datorie la tine.`
                : `Îi adaugă ${Number(alesPachet.hours)} ${numeOre(oreTipul(alesPachet))} și ${(Number(alesPachet.price) || 0).toLocaleString('ro-RO')} ${settings.currency} la datorie. Plățile le treci pe fișa lui, pe măsură ce le încasezi.`)
              : 'Pachetele se stabilesc în Finanțe → Taxe. Poți alege și mai târziu, de pe fișa lui.'}
          </p>
        </>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Ore incluse">
          <input type="number" min="0" className={inputCls} value={form.includedHours} onChange={e => set('includedHours', e.target.value)} />
        </Field>
        <Field label="Ore suplimentare">
          <input type="number" min="0" className={inputCls} value={form.extraHours} onChange={e => set('extraHours', e.target.value)} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Data nașterii">
          <input type="date" className={inputCls} value={form.birthDate || ''} onChange={e => set('birthDate', e.target.value)} />
        </Field>
        <Field label="Data înscrierii">
          <input type="date" className={inputCls} value={form.enrollDate} onChange={e => set('enrollDate', e.target.value)} />
        </Field>
      </div>
      {form.birthDate && varsta(form.birthDate) != null && (
        <p className="text-xs -mt-2 mb-3.5" style={{ color: implineste18(form.birthDate) ? 'var(--accent-ink)' : 'var(--muted-2)' }}>
          {implineste18(form.birthDate)
            ? `Are ${varsta(form.birthDate)} ani — împlinește 18 pe ${fmtHuman(implineste18(form.birthDate))}.`
            : `Are ${varsta(form.birthDate)} ani.`}
        </p>
      )}

      <Field label="Limită ședințe/săpt.">
        <input type="number" min="1" max="7" className={inputCls} value={form.weeklyLimit} onChange={e => set('weeklyLimit', e.target.value)} />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Examen practic">
          <input type="date" className={inputCls} value={form.examDate || ''} onChange={e => set('examDate', e.target.value)} />
        </Field>
        <Field label="Jumătatea de zi">
          <select className={inputCls} value={form.examPeriod || ''} onChange={e => set('examPeriod', e.target.value)}>
            <option value="">—</option>
            {Object.entries(EXAM_PERIODS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Examen teoretic">
          <input type="date" className={inputCls} value={form.theoryExamDate || ''} onChange={e => set('theoryExamDate', e.target.value)} />
        </Field>
        <Field label="Rezultat teoretic">
          <select className={inputCls} value={form.theoryExamResult || ''} onChange={e => set('theoryExamResult', e.target.value)}>
            <option value="">Nesusținut / în așteptare</option>
            <option value="promovat">Promovat</option>
            <option value="respins">Respins</option>
          </select>
        </Field>
      </div>
      {/* Contoarele hrănesc statisticile de pe Acasă: câte susțineri au fost, nu
          doar câte s-au încheiat cu bine. */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nr. susțineri teoretic">
          <input type="number" min="0" max="20" className={inputCls} value={form.theoryExamAttempts || 0}
            onChange={e => set('theoryExamAttempts', e.target.value)} />
        </Field>
        <Field label="Nr. susțineri practic">
          <input type="number" min="0" max="20" className={inputCls} value={form.examAttempts || 0}
            onChange={e => set('examAttempts', e.target.value)} />
        </Field>
      </div>

      <Field label="Locație de start implicită">
        <input className={inputCls} value={form.defaultLocation || ''} onChange={e => set('defaultLocation', e.target.value)} />
      </Field>
      <LocationChips locations={settings.locations} value={form.defaultLocation} onPick={(n) => set('defaultLocation', n)} />

      <Field label="Zona de domiciliu">
        <input className={inputCls} value={form.area || ''} onChange={e => set('area', e.target.value)} placeholder="Ex: Tomis Nord, Km 5, centru" />
      </Field>

      {/* punctul de domiciliu, folosit doar dacă ceri gruparea pe hartă */}
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 mb-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-slate-500 min-w-0">
            {areCoord(form)
              ? <span className="font-mono-time" style={{ color: 'var(--ok)' }}>{form.lat}, {form.lng}</span>
              : 'Punct de domiciliu — nesetat'}
          </span>
          {areCoord(form) && (
            <span className="flex items-center gap-2 shrink-0">
              <a href={hartaHref(form, form.area, 'dir')} target="_blank" rel="noopener noreferrer"
                style={{ touchAction: 'manipulation' }} aria-label="Vezi pe hartă">
                <MapPin size={14} style={{ color: 'var(--accent-ink)' }} />
              </a>
              <button type="button" onClick={() => { set('lat', null); set('lng', null); }} className="text-xs text-slate-400">Șterge</button>
            </span>
          )}
        </div>
        <button type="button" onClick={prindeCasa} disabled={gpsElev === 'caut'}
          className="w-full mt-2 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs flex items-center justify-center gap-1.5 disabled:opacity-50">
          <MapPin size={13} />{gpsElev === 'caut' ? 'Caut…' : 'Sunt acum acolo'}
        </button>
        <input className={`${inputCls} mt-2`} placeholder="sau lipește un link de hartă / coordonate"
          onChange={e => { const c = extrageCoord(e.target.value); if (c) { set('lat', c.lat); set('lng', c.lng); e.target.value = ''; setGpsElev(''); } }} />
        {gpsElev === 'refuzat' && <p className="text-xs mt-1.5" style={{ color: 'var(--bad)' }}>Telefonul nu a dat voie la locație.</p>}
        {gpsElev === 'eroare' && <p className="text-xs mt-1.5" style={{ color: 'var(--bad)' }}>Nu am prins semnalul.</p>}
        <p className="text-xs text-slate-400 mt-1.5">
          Aproximativ e destul — strada lui, nu ușa. Îl folosește planificatorul ca să pună unul după altul elevii care stau aproape, dar numai dacă îi ceri asta din fila Plan.
        </p>
      </div>

      {/* disponibilitatea */}
      <span className="block text-xs font-medium text-slate-500 mb-1.5">Zile în care poate veni</span>
      <div className="flex gap-1.5 mb-3.5">
        {DISPLAY_ORDER.map(i => {
          const activ = (form.availDays || []).includes(i);
          return (
            <button key={i} type="button"
              onClick={() => set('availDays', activ ? form.availDays.filter(x => x !== i) : [...(form.availDays || []), i])}
              className={`flex-1 py-2.5 rounded-xl text-xs font-medium border ${activ ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}>
              {RO_DAYS_SHORT[i]}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-slate-400 -mt-2 mb-3.5">Nicio zi bifată înseamnă „oricând".</p>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Zile din lună">
          <select className={inputCls} value={form.availParity || ''} onChange={e => set('availParity', e.target.value)}>
            <option value="">Toate</option>
            <option value="even">Doar pare</option>
            <option value="odd">Doar impare</option>
          </select>
        </Field>
        <Field label="Pauză minimă (zile)">
          <input type="number" min="0" max="14" className={inputCls} value={form.minGapDays || 0} onChange={e => set('minGapDays', e.target.value)} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Poate de la ora">
          <select className={inputCls} value={form.availFrom || ''} onChange={e => set('availFrom', e.target.value)}>
            <option value="">—</option>
            {daySlots({ startMin: 0, endMin: 1440, sessionMin: 30, stepMin: 30 }).map(m => <option key={m} value={m}>{minToTime(m)}</option>)}
          </select>
        </Field>
        <Field label="Până la ora">
          <select className={inputCls} value={form.availTo || ''} onChange={e => set('availTo', e.target.value)}>
            <option value="">—</option>
            {daySlots({ startMin: 0, endMin: 1440, sessionMin: 30, stepMin: 30 }).map(m => <option key={m} value={m}>{minToTime(m)}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Tură de lucru">
        <select className={inputCls} value={form.tura || ''} onChange={e => set('tura', e.target.value)}>
          <option value="">Fără tură — program obișnuit</option>
          {Object.entries(TURE).map(([id, t]) => <option key={id} value={id}>{t.nume}</option>)}
        </select>
      </Field>
      {form.tura && (
        <>
          {form.tura === 'alt' && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Ore de lucru"><input type="number" min="1" max="72" className={inputCls} value={form.turaLucru || ''} onChange={e => set('turaLucru', e.target.value)} /></Field>
              <Field label="Ore libere"><input type="number" min="0" max="240" className={inputCls} value={form.turaLiber || ''} onChange={e => set('turaLiber', e.target.value)} /></Field>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <Field label="A intrat în tură pe" required>
              <input type="date" className={inputCls} value={form.turaData || ''} onChange={e => set('turaData', e.target.value)} />
            </Field>
            <Field label="La ora">
              <select className={inputCls} value={form.turaOra == null ? 420 : form.turaOra} onChange={e => set('turaOra', Number(e.target.value))}>
                {daySlots({ startMin: 0, endMin: 1440, sessionMin: 30, stepMin: 30 }).map(m => <option key={m} value={m}>{minToTime(m)}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Odihnă după tură (ore)">
            <input type="number" min="0" max="24" className={inputCls} value={form.turaOdihna || ''} onChange={e => set('turaOdihna', e.target.value)} placeholder="0" />
          </Field>
          {(() => {
            const ture = urmatoareleTure(form, 3);
            return (
              <div className="rounded-xl px-3.5 py-2.5 mb-3.5" style={{ background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                <div className="text-xs font-medium text-slate-500 mb-1">Următoarele ture, după cum ai completat</div>
                {ture.length === 0
                  ? <div className="text-xs text-slate-400">Completează ziua în care a intrat în tură.</div>
                  : ture.map((t, i) => <div key={i} className="font-mono-time text-xs text-slate-600">{textTura(t)}</div>)}
                <div className="text-xs text-slate-400 mt-1">Dacă nu seamănă cu programul lui, mută ziua sau ora de pornire.</div>
              </div>
            );
          })()}
        </>
      )}

      <Field label="Situație">
        <select className={inputCls}
          value={form.withdrawn ? 'withdrawn' : (form.asteptare ? 'asteptare' : 'active')}
          onChange={e => {
            const v = e.target.value;
            set('withdrawn', v === 'withdrawn');
            set('asteptare', v === 'asteptare');
            if (v === 'asteptare' && !form.asteptareDin) set('asteptareDin', todayISO());
          }}>
          <option value="active">În curs</option>
          <option value="asteptare">În așteptare după examen</option>
          <option value="withdrawn">Retras</option>
        </select>
      </Field>

      <Field label="Notițe">
        <textarea rows={3} className={inputCls} value={form.notes || ''} onChange={e => set('notes', e.target.value)} />
      </Field>

      {mode === 'edit' && (
        <button onClick={() => setConfirmDelete(true)} className="w-full text-center text-xs text-red-500 py-2">Șterge definitiv elevul</button>
      )}

      <ConfirmDialog open={confirmDelete} title="Ștergi elevul?"
        message={'Se șterg și ședințele lui din calendar. Dacă vrei doar să-l scoți din listă, pune-l pe „Retras".'}
        confirmLabel="Șterge" danger
        onConfirm={() => { setConfirmDelete(false); onDelete(initial.id); }}
        onCancel={() => setConfirmDelete(false)} />
    </BottomSheet>
  );
}

/* --------------------------------- PLAN ---------------------------------- */

function WeeklyLimitInput({ value, onCommit }) {
  const [text, setText] = useState(String(value));
  useEffect(() => { setText(String(value)); }, [value]);
  return (
    <input type="text" inputMode="numeric" value={text}
      onChange={e => setText(e.target.value.replace(/[^0-9]/g, ''))}
      onBlur={() => { const n = Math.max(1, Math.min(7, Number(text) || 1)); setText(String(n)); onCommit(n); }}
      className="w-12 text-center text-sm border border-slate-200 rounded-lg py-1.5 shrink-0" />
  );
}

function PlannerTab({ data, onUpdateStudentLimit, onApplyPlan, onStergePropuneri }) {
  const durata = durataDin(data.settings);
  const eligible = data.students
    .map(s => ({ ...s, remaining: studentBookedRemaining(s, data.sessions) }))
    .filter(s => s.remaining > 0 && eDisponibil(s))
    .sort((a, b) => a.name.localeCompare(b.name, 'ro'));

  const [selected, setSelected] = useState(() => new Set(eligible.map(s => s.id)));
  const [cuRezerva, setCuRezerva] = useState(() => new Set());
  const [plan, setPlan] = useState(null);
  const [horizon, setHorizon] = useState(0);
  const [dinZiua, setDinZiua] = useState(todayISO());
  const [grupare, setGrupare] = useState('fara');
  const [stergeProp, setStergeProp] = useState(false);
  const [limitaToti, setLimitaToti] = useState(() => Number(data.settings.defaultWeeklyLimit) || 2);

  const totiAlesi = eligible.length > 0 && eligible.every(s => selected.has(s.id));
  const totiCuRezerva = eligible.length > 0 && eligible.every(s => cuRezerva.has(s.id));

  function toggle(id) {
    setSelected(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
    setPlan(null);
  }
  function toggleRezerva(id) {
    setCuRezerva(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
    setPlan(null);
  }

  function genereaza() {
    const pentruPlan = eligible.filter(s => selected.has(s.id)).map(s => ({
      id: s.id, name: s.name, remaining: s.remaining,
      weeklyLimit: Number(s.weeklyLimit) || data.settings.defaultWeeklyLimit,
      examDate: s.examDate, availDays: s.availDays, availParity: s.availParity,
      minGapDays: s.minGapDays, area: s.area, lat: s.lat, lng: s.lng,
      tura: s.tura, turaData: s.turaData, turaOra: s.turaOra,
      turaLucru: s.turaLucru, turaLiber: s.turaLiber, turaOdihna: s.turaOdihna,
      includeRezerva: cuRezerva.has(s.id),
      window: studentTimeWindow(data.sessions, s.id, s, durata),
    }));
    setPlan(generatePlan({
      students: pentruPlan,
      existingSessions: data.sessions,
      settings: { ...data.settings, examStudents: data.students, horizonDays: horizon, grupare },
      fromDateISO: dinZiua || todayISO(),
    }));
  }

  const neconfirmate = data.sessions.filter(x => x.auto && x.status === 'pending' && x.date >= todayISO());

  return (
    <div className="pb-4">
      <div className="px-4 pt-4 pb-1">
        <h1 className="font-display text-xl font-semibold text-slate-900 uppercase tracking-wide">Plan</h1>
      </div>
      <p className="px-4 text-xs text-slate-400 mt-1">
        Primii sunt elevii cu examenul cel mai apropiat. Fiecare primește ore în intervalul cu care e obișnuit din
        ședințele de până acum; dacă nu îi ajung, planul lărgește căutarea.
      </p>

      {eligible.length === 0 ? (
        <div className="text-center py-10 text-sm text-slate-400 px-4">
          Niciun elev cu ore rămase. Adaugă ore pe fișele lor și revino.
        </div>
      ) : (
        <>
          <div className="px-4 mt-3">
            <Section title={`Elevi · ${selected.size} din ${eligible.length}`}>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 px-3.5 py-2.5">
                  <input type="checkbox" checked={totiAlesi}
                    onChange={() => { setSelected(totiAlesi ? new Set() : new Set(eligible.map(x => x.id))); setPlan(null); }}
                    className="w-4 h-4 accent-amber-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 flex-1">
                    {totiAlesi ? 'Toți elevii' : `Alege toți cei ${eligible.length}`}
                  </span>
                  <span className="text-xs text-slate-400">{selected.size} aleși</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 pb-2.5">
                  <span className="text-sm text-slate-600 flex-1">Ședințe pe săptămână, la toți</span>
                  <WeeklyLimitInput value={limitaToti} onCommit={(n) => setLimitaToti(n)} />
                  <button onClick={() => { eligible.forEach(x => onUpdateStudentLimit(x.id, limitaToti)); setPlan(null); }}
                    className="shrink-0 px-3 py-1.5 rounded-lg text-white text-xs font-medium" style={{ background: 'var(--invert)' }}>
                    Pune
                  </button>
                  <button onClick={() => { const d = data.settings.defaultWeeklyLimit; setLimitaToti(d); eligible.forEach(x => onUpdateStudentLimit(x.id, d)); setPlan(null); }}
                    className="shrink-0 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs">
                    Implicit
                  </button>
                </div>

                <div className="flex items-center gap-3 px-3.5 pb-2.5">
                  <input type="checkbox" checked={totiCuRezerva}
                    onChange={() => { setCuRezerva(totiCuRezerva ? new Set() : new Set(eligible.map(x => x.id))); setPlan(null); }}
                    className="w-4 h-4 accent-amber-500 shrink-0" />
                  <span className="text-sm text-slate-600 flex-1">Include și ședințele rezervate</span>
                </div>
                <p className="text-xs text-slate-400 px-3.5 -mt-1 mb-1">
                  Ultimele {EXAM_RESERVE} ședințe ale fiecărui elev se păstrează pentru pregătirea de dinaintea examenului.
                </p>

                {eligible.map(s => {
                  const ales = selected.has(s.id);
                  const w = studentTimeWindow(data.sessions, s.id, s, durata);
                  const t = s.tura && configTura(s) ? urmatoareleTure(s, 1)[0] : null;
                  return (
                    <div key={s.id} className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200">
                      <input type="checkbox" checked={ales} onChange={() => toggle(s.id)} className="w-4 h-4 accent-amber-500 shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-slate-800 truncate">{s.name}</div>
                        <div className="text-xs text-slate-400">
                          {s.remaining} de programat{s.examDate ? ` · examen ${fmtHuman(s.examDate)}` : ''}
                        </div>
                        {t ? <div className="text-xs" style={{ color: 'var(--accent-ink)' }}>tură: {textTura(t)}</div> : null}
                        {w ? (
                          <div className="text-xs" style={{ color: 'var(--muted-2)' }}>
                            {w.stated ? `disponibil ${minToTime(w.from)}–${minToTime(w.to)}` : `de obicei ${minToTime(w.lo)}–${minToTime(w.hi)}`}
                          </div>
                        ) : null}
                        {ales && s.remaining > 0 && (
                          <button type="button" onClick={() => toggleRezerva(s.id)} className="flex items-center gap-1.5 mt-1">
                            <span className="flex items-center justify-center rounded shrink-0"
                              style={{
                                width: 14, height: 14,
                                border: `1.5px solid ${cuRezerva.has(s.id) ? 'var(--accent)' : 'var(--line-2)'}`,
                                background: cuRezerva.has(s.id) ? 'var(--accent)' : 'transparent',
                                color: '#3a2100', fontSize: 10, fontWeight: 900, lineHeight: 1,
                              }}>{cuRezerva.has(s.id) ? '✓' : ''}</span>
                            <span className="text-xs text-slate-400">include ședințele rezervate</span>
                          </button>
                        )}
                      </div>
                      <WeeklyLimitInput value={Number(s.weeklyLimit) || data.settings.defaultWeeklyLimit}
                        onCommit={(n) => { onUpdateStudentLimit(s.id, n); setPlan(null); }} />
                    </div>
                  );
                })}
              </div>
            </Section>
          </div>

          <div className="px-4 mt-4">
            <Field label="Începe de la">
              <input type="date" className={inputCls} value={dinZiua} min={todayISO()}
                onChange={e => { setDinZiua(e.target.value); setPlan(null); }} />
            </Field>
            <Field label="Perioada planificată">
              <select className={inputCls} value={horizon} onChange={e => { setHorizon(Number(e.target.value)); setPlan(null); }}>
                <option value={0}>Până se termină orele</option>
                <option value={7}>O săptămână</option>
                <option value={14}>Două săptămâni</option>
                <option value={30}>O lună</option>
              </select>
            </Field>
            <Field label="Grupare geografică">
              <select className={inputCls} value={grupare} onChange={e => { setGrupare(e.target.value); setPlan(null); }}>
                <option value="fara">Fără — doar după priorități</option>
                <option value="zona">După zona scrisă pe fișă</option>
                <option value="harta">După punctele de pe hartă</option>
              </select>
            </Field>
            <p className="text-xs text-slate-400 -mt-2 mb-3.5">
              {grupare === 'fara'
                ? 'Planul merge strict pe examene, disponibilitate și ore rămase.'
                : grupare === 'zona'
                  ? 'Pune consecutiv elevii cu aceeași zonă scrisă — trebuie scrisă la fel la amândoi.'
                  : `Pune consecutiv elevii care stau la mai puțin de ${PRAG_APROPIERE_KM} km unul de altul. Are punct de domiciliu ${eligible.filter(x => areCoord(x)).length} din ${eligible.length} elevi; ceilalți se așază normal.`}
            </p>
            <button onClick={genereaza} disabled={selected.size === 0}
              className="w-full py-3 rounded-xl text-white font-medium text-sm disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: 'var(--invert)' }}>
              <WandSparkles size={16} />Generează plan
            </button>
          </div>
        </>
      )}

      {!plan && neconfirmate.length > 0 && (
        <div className="px-4 mt-5">
          <button onClick={() => setStergeProp(true)}
            className="w-full py-2.5 rounded-xl border text-sm font-medium flex items-center justify-center gap-1.5"
            style={{ borderColor: 'var(--bad-line)', color: 'var(--bad)' }}>
            <Trash2 size={15} />Șterge {neconfirmate.length} propuneri neconfirmate
          </button>
          <p className="text-xs text-slate-400 mt-1.5 text-center">
            Ședințele puse de planificator pe care elevii nu le-au confirmat încă. Cele trecute pe „Programată" rămân.
          </p>
        </div>
      )}

      <ConfirmDialog open={stergeProp} title="Ștergi propunerile neconfirmate?"
        message={`Se șterg ${neconfirmate.length} ședințe propuse care încă așteaptă confirmare. Cele programate rămân neatinse.`}
        confirmLabel="Șterge" danger
        onConfirm={() => { setStergeProp(false); onStergePropuneri(); }}
        onCancel={() => setStergeProp(false)} />

      {plan && (
        <div className="px-4 mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Plan propus · {plan.proposals.length} ședințe
            </span>
            <button onClick={() => setPlan(null)} className="text-xs text-slate-400">Renunță la propunere</button>
          </div>
          {plan.proposals.length === 0 ? (
            <div className="text-sm text-slate-400 py-3">Nu s-a putut propune nimic. Lărgește perioada sau zilele de lucru.</div>
          ) : (
            <>
              <div className="space-y-1.5 mb-3">
                {plan.proposals.slice(0, 40).map((p, i) => {
                  const el = data.students.find(s => s.id === p.studentId);
                  return (
                    <div key={i} className="flex items-center gap-3 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-sm">
                      <span className="font-mono-time text-xs text-slate-500 shrink-0">
                        {RO_DAYS_SHORT[fromISO(p.date).getDay()]} {fromISO(p.date).getDate()} · {minToTime(p.startMin)}
                      </span>
                      <span className="flex-1 min-w-0 truncate text-slate-800">{el ? el.name : ''}</span>
                      {p.offWindow ? <span className="text-xs shrink-0" style={{ color: 'var(--accent-ink)' }}>în afara orei obișnuite</span> : null}
                    </div>
                  );
                })}
                {plan.proposals.length > 40 ? (
                  <div className="text-xs text-slate-400 text-center py-1">și încă {plan.proposals.length - 40}…</div>
                ) : null}
              </div>
              {plan.unfinished.length > 0 && (
                <div className="rounded-xl px-3.5 py-2.5 mb-3" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: 'var(--accent-ink)' }}>Nu au încăput toate orele</div>
                  {plan.unfinished.slice(0, 6).map(u => (
                    <div key={u.id} className="text-xs text-slate-500">{u.name} · {u.left} rămase</div>
                  ))}
                </div>
              )}
              <button onClick={() => { onApplyPlan(plan.proposals); setPlan(null); }}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium text-sm mb-2">
                Aplică planul în calendar
              </button>
            </>
          )}
        </div>
      )}

      {eligible.length > 0 && (
        <PlanCalculator students={eligible.filter(s => selected.has(s.id))} allStudents={data.students}
          sessions={data.sessions} settings={data.settings} />
      )}
    </div>
  );
}

/* Cât mai ai de lucru: câte zile îți ia tot ce a rămas și cât ai putea face
   până la ultima zi din luna asta. */
function PlanCalculator({ students, allStudents, sessions, settings }) {
  const r = useMemo(() => {
    const totalOre = students.reduce((s, x) => s + x.remaining, 0);
    if (!totalOre) return null;
    const durata = durataDin(settings);
    const pas = pasDin(settings);
    const peZi = Math.max(1, Math.floor((settings.endMin - settings.startMin) / Math.max(pas, durata)));
    const zileLucratoare = settings.workDays.length || 6;

    // câte încap până la finalul lunii, cu zilele lucrătoare rămase
    const azi = fromISO(todayISO());
    const ultima = fromISO(ultimaZiDin(todayISO()));
    let zileRamase = 0;
    for (let d = new Date(azi); d <= ultima; d = addDays(d, 1)) {
      if (settings.workDays.includes(d.getDay())) zileRamase++;
    }
    const incapPanaLaFinal = zileRamase * peZi;

    // câte zile ar dura tot volumul
    const zilePline = Math.floor(totalOre / peZi);
    const rest = totalOre % peZi;
    const zileTotal = zilePline + (rest ? 1 : 0);
    const saptamani = Math.ceil(zileTotal / zileLucratoare);
    const ultimaZi = toISO(addDays(azi, Math.max(0, saptamani * 7 - 1)));

    const pret = {};
    settings.rateTypes.forEach(rt => { pret[rt.id] = Number(rt.price) || 0; });
    const bani = students.reduce((sum, s) => {
      const platibile = Math.max(0, s.remaining - Math.max(0, (Number(s.includedHours) || 0) - studentIncludedUsed(sessions, s.id)));
      return sum + platibile * (pret.extra || 0);
    }, 0);
    const baniPanaLaFinal = totalOre ? Math.round(bani * Math.min(1, incapPanaLaFinal / totalOre)) : 0;

    return { totalOre, peZi, zilePline, rest, zileTotal, ultimaZi, bani, incapPanaLaFinal, zileRamase, baniPanaLaFinal, totIncape: incapPanaLaFinal >= totalOre };
  }, [students, sessions, settings]);

  if (!r) return null;
  const cur = settings.currency;
  return (
    <div className="px-4 mt-5">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl px-3.5 py-3" style={{ background: 'var(--invert)' }}>
          <div className="text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,.55)' }}>Mai ai de lucru</div>
          <div className="font-mono-time text-2xl font-semibold text-white mt-0.5">{r.zileTotal}</div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,.6)' }}>
            {r.zilePline} pline · {r.rest ? `${r.rest} parțial ocupate` : 'fără rest'}
          </div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,.75)' }}>ultima: {fmtHuman(r.ultimaZi)}</div>
          <div className="text-xs mt-2 pt-2" style={{ color: 'rgba(255,255,255,.75)', borderTop: '1px solid rgba(255,255,255,.14)' }}>
            {r.totIncape
              ? `Până la ${fmtHuman(ultimaZiDin(todayISO()))} termini tot.`
              : `până la ${fmtHuman(ultimaZiDin(todayISO()))}: ${r.incapPanaLaFinal} din ${r.totalOre} ședințe · ${r.zileRamase} zile`}
          </div>
        </div>
        <div className="rounded-2xl px-3.5 py-3" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}>
          <div className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--accent-ink)' }}>Potențial financiar</div>
          <div className="font-mono-time text-2xl font-semibold mt-0.5" style={{ color: 'var(--accent-ink)' }}>
            {Math.round(r.bani).toLocaleString('ro-RO')}
          </div>
          <div className="text-xs" style={{ color: 'var(--accent-ink)' }}>{cur}</div>
          <div className="text-xs mt-2 pt-2" style={{ color: 'var(--accent-ink)', borderTop: '1px solid var(--accent-line)' }}>
            până la {fmtHuman(ultimaZiDin(todayISO()))}: {r.baniPanaLaFinal.toLocaleString('ro-RO')} {cur}
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-2">
        Socotit cu {r.peZi} ședințe pe zi, zile îndesate la maximum. Planul de mai sus respectă limitele fiecărui elev, deci va ieși mai lung.
      </p>
    </div>
  );
}

/* -------------------------------- FINANȚE -------------------------------- */

function FinanceTab({ data, onUpdateSettings, onUpdateRateTypes, onUpdateEmployerSettings,
  onUpdateWorkingDaysOverride, onEditPayment, onUpdateVarsaminte }) {
  const [monthCursor, setMonthCursor] = useState(() => todayISO().slice(0, 7));
  const [grup, setGrup] = useState(null);
  const [rtDraft, setRtDraft] = useState(null);
  const [empDraft, setEmpDraft] = useState(null);
  const [vDraft, setVDraft] = useState(null);
  const [raportBani, setRaportBani] = useState(false);

  const cur = data.settings.currency;
  const lei = (n) => `${Math.round(n || 0).toLocaleString('ro-RO')} ${cur}`;
  const numeLuna = () => luna(monthCursor);

  const shiftMonth = (d) => {
    const [y, m] = monthCursor.split('-').map(Number);
    const x = new Date(y, m - 1 + d, 1);
    setMonthCursor(`${x.getFullYear()}-${pad2(x.getMonth() + 1)}`);
  };

  const sesLuna = data.sessions.filter(s => s.date.startsWith(monthCursor) && s.status === 'completed');

  // ce a produs luna, pe tipuri de oră
  const venit = useMemo(() => {
    const peTip = {};
    data.settings.rateTypes.forEach(rt => { peTip[rt.id] = { name: rt.name, price: Number(rt.price) || 0, count: 0 }; });
    let altul = 0;
    sesLuna.forEach(s => {
      if (s.otherInstructor) { altul++; return; }
      if (!peTip[s.type]) peTip[s.type] = { name: '(tip șters)', price: 0, count: 0 };
      peTip[s.type].count++;
    });
    const total = Object.entries(peTip).reduce((sum, [id, t]) => sum + (id === 'included' ? 0 : t.count * t.price), 0);
    return { byType: peTip, otherCount: altul, total };
  }, [sesLuna, data.settings.rateTypes]);

  const incasatLuna = incasatDeTinePeLuna(data, monthCursor);
  const laScoala = laScoalaPeLuna(data, monthCursor);
  const deRecuperat = data.students.reduce((s, x) => s + Math.max(0, studentOutstanding(x, data.sessions, data.settings)), 0);

  const platiLuna = useMemo(() => {
    const out = [];
    data.students.forEach(st => (st.payments || []).forEach(p => {
      if ((p.date || '').startsWith(monthCursor)) out.push({ ...p, student: st.name, studentId: st.id });
    }));
    return out.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [data.students, monthCursor]);

  // salariul de la angajator: prag lunar, tarife normale și pentru engleză
  const emp = { ...DEFAULT_SETTINGS.employer, ...(data.settings.employer || {}) };
  const [an, ln] = monthCursor.split('-').map(Number);
  const zileAuto = (() => {
    let n = 0;
    const ultima = new Date(an, ln, 0).getDate();
    for (let d = 1; d <= ultima; d++) {
      const zi = new Date(an, ln - 1, d).getDay();
      if (zi >= 1 && zi <= 5) n++;
    }
    return n;
  })();
  const overrideVal = (data.settings.workingDaysOverrides || {})[monthCursor];
  const areOverride = overrideVal != null && overrideVal !== '';
  const zileLucr = areOverride ? Number(overrideVal) || 0 : zileAuto;
  const prag = Math.round((zileLucr * (Number(emp.hoursPerDay) || 8)) / (Number(emp.hoursPerSession) || 2));

  const salariu = useMemo(() => {
    const ale = sesLuna.filter(s => !s.otherInstructor);
    const inProgram = ale.slice(0, prag);
    const peste = ale.slice(prag);
    const nr = (lista, eng) => lista.filter(s => !!s.english === eng).length;
    const r = {
      normal: nr(inProgram, false), normalEng: nr(inProgram, true),
      over: nr(peste, false), overEng: nr(peste, true),
      totalSessions: ale.length, threshold: prag, workingDays: zileLucr,
      hoursPerDay: Number(emp.hoursPerDay) || 8, hoursPerSession: Number(emp.hoursPerSession) || 2,
    };
    r.totalPay = r.normal * (Number(emp.baseRate) || 0)
      + r.normalEng * (Number(emp.englishBaseRate) || 0)
      + r.over * (Number(emp.overtimeRate) || 0)
      + r.overEng * (Number(emp.englishOvertimeRate) || 0);
    return r;
  }, [sesLuna, prag, zileLucr, data.settings.employer]);

  const randuriSalariu = [
    { key: 'normal', label: 'În program', count: salariu.normal, rate: Number(emp.baseRate) || 0, cls: 'bg-white border-slate-200', valCls: 'text-slate-900' },
    { key: 'normalEng', label: 'În program · engleză', count: salariu.normalEng, rate: Number(emp.englishBaseRate) || 0, cls: 'bg-white border-slate-200', valCls: 'text-slate-900' },
    { key: 'over', label: 'Peste program', count: salariu.over, rate: Number(emp.overtimeRate) || 0, cls: 'bg-amber-50 border-amber-200', valCls: 'text-amber-700' },
    { key: 'overEng', label: 'Peste program · engleză', count: salariu.overEng, rate: Number(emp.englishOvertimeRate) || 0, cls: 'bg-amber-50 border-amber-200', valCls: 'text-amber-700' },
  ];

  const varsLuna = varsamintePeLuna(data, monthCursor);
  const restDeDus = incasatDeTineTotal(data) - totalVarsat(data.varsaminte);

  function salveazaVarsamant() {
    const suma = Number(vDraft.amount) || 0;
    if (suma <= 0 || !vDraft.date) return;
    const lista = data.varsaminte || [];
    if (vDraft.id) onUpdateVarsaminte(lista.map(v => (v.id === vDraft.id ? { ...v, date: vDraft.date, amount: suma, note: (vDraft.note || '').trim() } : v)));
    else onUpdateVarsaminte([...lista, { id: genId('vars'), date: vDraft.date, amount: suma, note: (vDraft.note || '').trim() }]);
    setVDraft(null);
  }
  function salveazaTarif() {
    const nume = (rtDraft.name || '').trim();
    const pret = Number(rtDraft.price) || 0;
    if (!nume) return;
    const lista = data.settings.rateTypes;
    if (rtDraft.id) onUpdateRateTypes(lista.map(rt => (rt.id === rtDraft.id ? { ...rt, name: nume, price: pret } : rt)));
    else onUpdateRateTypes([...lista, { id: genId('rate'), name: nume, price: pret }]);
    setRtDraft(null);
  }

  const grupuri = [
    { id: 'elevi', nume: 'Detalii de la elevi', Icon: Users, rezumat: `încasat ${lei(incasatLuna)}` },
    { id: 'plati', nume: 'Istoric plăți', Icon: Banknote, rezumat: platiLuna.length ? `${platiLuna.length} în ${numeLuna()}` : 'nicio plată' },
    { id: 'varsaminte', nume: 'Bani duși la școală', Icon: Upload, rezumat: restDeDus > 0 ? `de dus ${lei(restDeDus)}` : 'dus tot' },
    { id: 'salariu', nume: 'Detalii salariu', Icon: Wallet, rezumat: `${salariu.totalSessions} ședințe · prag ${prag}` },
    { id: 'taxe', nume: 'Taxe', Icon: GraduationCap, rezumat: `${feeTypesOf(data.settings).length}` },
    { id: 'tarife', nume: 'Tarife elevi', Icon: Pencil, rezumat: `${data.settings.rateTypes.length}` },
  ];
  const titluGrup = (grupuri.find(g => g.id === grup) || {}).nume || '';

  const continutGrup = () => {
    if (grup === 'elevi') {
      return (
        <>
          <div className="space-y-1.5 mb-3">
            {Object.entries(venit.byType).filter(([, t]) => t.count > 0).map(([id, t]) => (
              <div key={id} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm">
                <span className="text-slate-700">{t.name} <span className="text-slate-400">×{t.count}</span></span>
                {id === 'included'
                  ? <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">achitat</span>
                  : <span className="font-mono-time font-medium text-slate-900">{lei(t.count * t.price)}</span>}
              </div>
            ))}
            {venit.otherCount > 0 && (
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                <span className="text-slate-500">Alt instructor <span className="text-slate-400">×{venit.otherCount}</span></span>
                <span className="text-xs text-slate-400">doar evidență</span>
              </div>
            )}
            {Object.values(venit.byType).every(t => t.count === 0) && venit.otherCount === 0 && (
              <div className="text-center text-sm text-slate-400 py-4">Nicio ședință efectuată în această lună.</div>
            )}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm">
              <span className="text-emerald-700 flex items-center gap-1.5"><Banknote size={15} />Încasat de tine</span>
              <span className="font-mono-time font-medium text-emerald-700">{lei(incasatLuna)}</span>
            </div>
            {laScoala > 0 && (
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                <span className="text-slate-500">Achitat direct la școală</span>
                <span className="font-mono-time text-slate-500">{lei(laScoala)}</span>
              </div>
            )}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm">
              <span className="text-slate-700">De recuperat (toți elevii)</span>
              <span className="font-mono-time font-medium text-slate-900">{lei(deRecuperat)}</span>
            </div>
          </div>
        </>
      );
    }

    if (grup === 'plati') {
      return platiLuna.length === 0 ? (
        <div className="text-sm text-slate-400 text-center py-4">Nicio plată înregistrată în {numeLuna()}.</div>
      ) : (
        <div className="space-y-1.5">
          {platiLuna.map(p => (
            <button key={p.id} onClick={() => { setGrup(null); onEditPayment(p.studentId, p); }}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-left">
              <span className="min-w-0">
                <span className="block text-sm text-slate-800 truncate">{p.student}</span>
                <span className="block text-xs text-slate-400">
                  {p.date ? fmtHuman(p.date) : '—'}{p.collector === 'school' ? ' · la școală' : ''}
                </span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <span className={`font-mono-time text-sm font-medium ${p.collector === 'school' ? 'text-slate-500' : 'text-emerald-700'}`}>
                  {lei(Number(p.amount) || 0)}
                </span>
                <Pencil size={14} className="text-slate-300" />
              </span>
            </button>
          ))}
        </div>
      );
    }

    if (grup === 'varsaminte') {
      return (
        <>
          <div className="rounded-xl border px-3.5 py-3 mb-3"
            style={restDeDus > 0
              ? { background: 'var(--accent-soft)', borderColor: 'var(--accent-line)' }
              : { background: 'var(--ok-soft)', borderColor: 'var(--ok-line)' }}>
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-sm font-medium" style={{ color: restDeDus > 0 ? 'var(--accent-ink)' : 'var(--ok)' }}>
                  {restDeDus > 0 ? 'Mai ai de dus la școală' : 'Ai dus tot'}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  De la început: încasat {lei(incasatDeTineTotal(data))} · dus {lei(totalVarsat(data.varsaminte))}
                </div>
              </div>
              <span className="font-mono-time text-lg font-semibold shrink-0" style={{ color: restDeDus > 0 ? 'var(--accent-ink)' : 'var(--ok)' }}>
                {lei(Math.abs(restDeDus))}
              </span>
            </div>
          </div>

          {vDraft ? (
            <div className="bg-slate-50 rounded-xl p-3.5 mb-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Data" required><input type="date" className={inputCls} value={vDraft.date} onChange={e => setVDraft({ ...vDraft, date: e.target.value })} /></Field>
                <Field label="Sumă" required><input type="number" min="0" inputMode="decimal" className={inputCls} value={vDraft.amount} onChange={e => setVDraft({ ...vDraft, amount: e.target.value })} /></Field>
              </div>
              <Field label="Mențiune"><input className={inputCls} value={vDraft.note || ''} onChange={e => setVDraft({ ...vDraft, note: e.target.value })} placeholder="Ex: chitanța 128" /></Field>
              <div className="flex gap-2">
                <button onClick={() => setVDraft(null)} className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-600">Renunță</button>
                <button onClick={salveazaVarsamant} className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white text-sm">Salvează</button>
              </div>
              {vDraft.id && (
                <button onClick={() => { onUpdateVarsaminte((data.varsaminte || []).filter(v => v.id !== vDraft.id)); setVDraft(null); }}
                  className="w-full mt-2 py-2 rounded-lg border text-xs" style={{ borderColor: 'var(--bad-line)', color: 'var(--bad)' }}>
                  Șterge vărsământul
                </button>
              )}
            </div>
          ) : (
            <button onClick={() => setVDraft({ date: todayISO(), amount: '', note: '' })}
              className="w-full py-2.5 mb-3 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5">
              <Plus size={14} />Am dus bani la școală
            </button>
          )}

          <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">În {numeLuna()}</div>
          {varsLuna.length === 0 ? (
            <div className="text-sm text-slate-400 text-center py-3">Niciun vărsământ în această lună.</div>
          ) : (
            <div className="space-y-1.5">
              {varsLuna.map(v => (
                <button key={v.id} onClick={() => setVDraft({ ...v })}
                  className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-left">
                  <span className="min-w-0">
                    <span className="block text-sm text-slate-800">{v.date ? fmtHuman(v.date) : '—'}</span>
                    {v.note ? <span className="block text-xs text-slate-400 truncate">{v.note}</span> : null}
                  </span>
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="font-mono-time text-sm font-medium text-slate-900">{lei(Number(v.amount) || 0)}</span>
                    <Pencil size={14} className="text-slate-300" />
                  </span>
                </button>
              ))}
            </div>
          )}
          <p className="text-xs text-slate-400 mt-3">
            „De dus" e diferența dintre tot ce ai încasat tu de la elevi și tot ce ai dus la școală. Banii achitați direct la casieria școlii nu intră aici — n-au trecut prin mâna ta.
          </p>
        </>
      );
    }

    if (grup === 'salariu') {
      return (
        <>
          <div className="space-y-1.5 mb-3">
            {randuriSalariu.filter(r => r.count > 0).map(r => (
              <div key={r.key} className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm ${r.cls}`}>
                <span>{r.label} <span className="opacity-60">×{r.count}</span></span>
                <span className={`font-mono-time font-medium ${r.valCls}`}>{lei(r.count * r.rate)}</span>
              </div>
            ))}
            {salariu.totalSessions === 0 && <div className="text-center text-sm text-slate-400 py-2">Nicio ședință efectuată în această lună.</div>}
          </div>
          <div className="text-xs text-slate-400 mb-3 px-1">
            Prag: {prag} ședințe ({zileLucr} zile lucrătoare × {salariu.hoursPerDay} ore ÷ {salariu.hoursPerSession} ore/ședință)
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 mb-3">
            <div className="flex-1">
              <div className="text-sm text-slate-800">Zile lucrătoare {numeLuna()}</div>
              <div className="text-xs text-slate-400">{areOverride ? 'valoare ajustată manual' : 'calculat automat (zile L–V)'}</div>
            </div>
            <input type="number" min="0" max="31" value={areOverride ? overrideVal : zileAuto}
              onChange={e => onUpdateWorkingDaysOverride(monthCursor, e.target.value)}
              className="w-16 text-center text-sm border border-slate-200 rounded-lg py-1.5" />
          </div>
          {empDraft ? (
            <div className="bg-slate-50 rounded-xl p-3.5">
              <div className="grid grid-cols-2 gap-x-3">
                <Field label="Tarif de bază / ședință"><input type="number" min="0" className={inputCls} value={empDraft.baseRate} onChange={e => setEmpDraft({ ...empDraft, baseRate: e.target.value })} /></Field>
                <Field label="Tarif peste program"><input type="number" min="0" className={inputCls} value={empDraft.overtimeRate} onChange={e => setEmpDraft({ ...empDraft, overtimeRate: e.target.value })} /></Field>
                <Field label="Engleză · în program"><input type="number" min="0" className={inputCls} value={empDraft.englishBaseRate} onChange={e => setEmpDraft({ ...empDraft, englishBaseRate: e.target.value })} /></Field>
                <Field label="Engleză · peste program"><input type="number" min="0" className={inputCls} value={empDraft.englishOvertimeRate} onChange={e => setEmpDraft({ ...empDraft, englishOvertimeRate: e.target.value })} /></Field>
                <Field label="Ore lucrătoare / zi"><input type="number" min="1" max="24" className={inputCls} value={empDraft.hoursPerDay} onChange={e => setEmpDraft({ ...empDraft, hoursPerDay: e.target.value })} /></Field>
                <Field label="Ore / ședință (salariu)"><input type="number" min="0.5" step="0.5" className={inputCls} value={empDraft.hoursPerSession} onChange={e => setEmpDraft({ ...empDraft, hoursPerSession: e.target.value })} /></Field>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEmpDraft(null)} className="flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600">Renunță</button>
                <button onClick={() => { onUpdateEmployerSettings(empDraft); setEmpDraft(null); }} className="flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm">Salvează</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setEmpDraft({ ...DEFAULT_SETTINGS.employer, ...data.settings.employer })}
              className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5">
              <Pencil size={14} />Editează tarife angajator
            </button>
          )}
        </>
      );
    }

    if (grup === 'taxe') {
      return (
        <>
          <p className="text-xs text-slate-400 mb-2">Se adaugă la datoria elevului cu butoanele +/− de pe cardul lui.</p>
          <FeeTypesEditor feeTypes={feeTypesOf(data.settings)} currency={cur}
            onChange={lista => onUpdateSettings({ feeTypes: lista })} />
        </>
      );
    }

    if (grup === 'tarife') {
      return (
        <>
          <p className="text-xs text-slate-400 mb-2">Orele incluse sunt achitate prin școlarizare — nu se adună la datoria elevului.</p>
          <div className="space-y-1.5 mb-3">
            {data.settings.rateTypes.map(rt => (
              <div key={rt.id} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200">
                <button onClick={() => setRtDraft({ id: rt.id, name: rt.name, price: rt.price })} className="text-left flex-1 min-w-0">
                  <div className="text-sm text-slate-800">{rt.name}</div>
                  <div className="font-mono-time text-xs text-slate-400">{rt.price} {cur} / ședință</div>
                </button>
                {rt.id !== 'included' && rt.id !== 'extra' && (
                  <button onClick={() => onUpdateRateTypes(data.settings.rateTypes.filter(x => x.id !== rt.id))}
                    className="p-1.5 text-slate-400 shrink-0"><Trash2 size={15} /></button>
                )}
              </div>
            ))}
          </div>
          {rtDraft ? (
            <div className="bg-slate-50 rounded-xl p-3.5">
              <input className={`${inputCls} mb-2`} placeholder="Denumire tarif" value={rtDraft.name} onChange={e => setRtDraft({ ...rtDraft, name: e.target.value })} />
              <input type="number" min="0" className={`${inputCls} mb-3`} placeholder="Preț / ședință" value={rtDraft.price} onChange={e => setRtDraft({ ...rtDraft, price: e.target.value })} />
              <div className="flex gap-2">
                <button onClick={() => setRtDraft(null)} className="flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600">Renunță</button>
                <button onClick={salveazaTarif} className="flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm">Salvează</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setRtDraft({ name: '', price: '' })}
              className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5">
              <Plus size={14} />Tip de oră nou
            </button>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div className="pb-4">
      <div className="px-4 pt-4 pb-1 flex items-center justify-between gap-2">
        <h1 className="font-display text-xl font-semibold text-slate-900 uppercase tracking-wide">Finanțe</h1>
        <button onClick={() => setRaportBani(true)}
          className="shrink-0 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-medium flex items-center gap-1.5">
          <Download size={14} />Raport
        </button>
      </div>

      <div className="flex items-center justify-between px-4 mt-3 mb-3">
        <button onClick={() => shiftMonth(-1)} className="p-2 text-slate-400"><ChevronLeft size={18} /></button>
        <span className="text-sm font-medium text-slate-800 capitalize">{numeLuna()}</span>
        <button onClick={() => shiftMonth(1)} className="p-2 text-slate-400"><ChevronRight size={18} /></button>
      </div>

      <div className="px-4 grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-900 rounded-2xl px-3 py-4 text-center">
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">De la elevi</div>
          <div className="font-mono-time text-xl font-semibold text-white">{Math.round(venit.total).toLocaleString('ro-RO')}</div>
          <div className="text-xs text-slate-400 mt-0.5">{cur} acumulat</div>
        </div>
        <div className="bg-slate-900 rounded-2xl px-3 py-4 text-center">
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Salariu</div>
          <div className="font-mono-time text-xl font-semibold text-white">{Math.round(salariu.totalPay).toLocaleString('ro-RO')}</div>
          <div className="text-xs text-slate-400 mt-0.5">{cur} estimat</div>
        </div>
      </div>

      <div className="px-4 space-y-1.5">
        {grupuri.map(g => {
          const Icon = g.Icon;
          return (
            <button key={g.id} onClick={() => setGrup(g.id)}
              className="w-full flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3.5 py-3 text-left active:bg-slate-50">
              <Icon size={17} className="text-slate-400 shrink-0" />
              <span className="text-sm text-slate-800 flex-1 min-w-0 truncate">{g.nume}</span>
              <span className="text-xs text-slate-400 shrink-0 truncate" style={{ maxWidth: '45%' }}>{g.rezumat}</span>
              <ChevronRight size={16} className="text-slate-300 shrink-0" />
            </button>
          );
        })}
      </div>

      <BottomSheet open={!!grup} onClose={() => { setGrup(null); setRtDraft(null); setEmpDraft(null); setVDraft(null); }}
        title={`${titluGrup} · ${numeLuna()}`} layer={LAYER.form}>
        {continutGrup()}
      </BottomSheet>

      <RaportBani open={raportBani} data={data} monthKey={monthCursor} monthLabel={numeLuna()} onClose={() => setRaportBani(false)} />
    </div>
  );
}

// Editorul de taxe: nume, preț, ore aduse și dacă se achită direct la școală.
function FeeTypesEditor({ feeTypes, currency, onChange }) {
  const [draft, setDraft] = useState(null);
  function salveaza() {
    const nume = (draft.name || '').trim();
    if (!nume) return;
    const pret = Number(draft.price) || 0;
    const ore = Number(draft.hours) || 0;
    const oreTip = draft.oreTip === 'included' ? 'included' : 'extra';
    const laScoala = !!draft.laScoala;
    if (draft.id) onChange(feeTypes.map(f => (f.id === draft.id ? { ...f, name: nume, price: pret, hours: ore, oreTip, laScoala } : f)));
    else onChange([...feeTypes, { id: genId('fee'), name: nume, price: pret, hours: ore, oreTip, laScoala }]);
    setDraft(null);
  }
  return (
    <>
      <div className="space-y-1.5 mb-3">
        {feeTypes.map(f => (
          <div key={f.id} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200">
            <button onClick={() => setDraft({ id: f.id, name: f.name, price: f.price, hours: f.hours || '', oreTip: oreTipul(f), laScoala: !!f.laScoala })}
              className="text-left flex-1 min-w-0">
              <div className="text-sm text-slate-800 truncate">{f.name}</div>
              <div className="font-mono-time text-xs text-slate-400">
                {(Number(f.price) || 0).toLocaleString('ro-RO')} {currency}
                {Number(f.hours) > 0 ? ` · +${Number(f.hours)} ${numeOre(oreTipul(f))}` : ' / bucată'}
                {f.laScoala ? ' · la școală' : ''}
              </div>
            </button>
            <button onClick={() => onChange(feeTypes.filter(x => x.id !== f.id))} className="p-1.5 text-slate-400 shrink-0"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
      {draft ? (
        <div className="bg-slate-50 rounded-xl p-3.5">
          <input className={`${inputCls} mb-2`} placeholder="Denumire (ex: Pachet 5 ședințe)" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
          <input type="number" min="0" className={`${inputCls} mb-2`} placeholder="Sumă" value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value })} />
          <input type="number" min="0" className={`${inputCls} mb-2`} placeholder="Ore adăugate elevului (opțional)" value={draft.hours} onChange={e => setDraft({ ...draft, hours: e.target.value })} />
          {Number(draft.hours) > 0 && (
            <select className={`${inputCls} mb-1.5`} value={draft.oreTip || 'extra'} onChange={e => setDraft({ ...draft, oreTip: e.target.value })}>
              <option value="extra">Ore suplimentare · plătite prin această taxă</option>
              <option value="included">Ore incluse · achitate prin școlarizare</option>
            </select>
          )}
          <button type="button" onClick={() => setDraft({ ...draft, laScoala: !draft.laScoala })}
            className="w-full flex items-center gap-2.5 rounded-xl border px-3 py-2 mb-2 text-left"
            style={draft.laScoala ? { borderColor: 'var(--accent-line)', background: 'var(--accent-soft)' } : { borderColor: 'var(--line)', background: 'var(--surface)' }}>
            <span className="flex items-center justify-center rounded shrink-0"
              style={{
                width: 16, height: 16, border: `1.5px solid ${draft.laScoala ? 'var(--accent)' : 'var(--line-2)'}`,
                background: draft.laScoala ? 'var(--accent)' : 'transparent', color: '#3a2100', fontSize: 11, fontWeight: 900, lineHeight: 1,
              }}>{draft.laScoala ? '✓' : ''}</span>
            <span className="text-xs text-slate-600 flex-1">Se achită direct la școală</span>
          </button>
          <p className="text-xs text-slate-400 mb-3">
            {draft.laScoala ? 'Suma se trece singură ca plată la școală, deci nu rămâne datorie la tine. ' : ''}
            {Number(draft.hours) > 0
              ? (draft.oreTip === 'included'
                ? 'Orele intră la „incluse" pe cardul elevului: nu se mai adună la datoria lui.'
                : 'Orele intră la „suplimentare" și sunt deja plătite prin prețul taxei.')
              : 'Completează orele doar dacă e un pachet sau o școlarizare.'}
          </p>
          <div className="flex gap-2">
            <button onClick={() => setDraft(null)} className="flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600">Renunță</button>
            <button onClick={salveaza} className="flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm">Salvează</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setDraft({ name: '', price: '', hours: '', oreTip: 'extra', laScoala: false })}
          className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5">
          <Plus size={14} />Taxă nouă
        </button>
      )}
    </>
  );
}

/* ------------------------------- RAPOARTE -------------------------------- */

// Raportul de elevi: cine, câte ore are, câte a făcut, câte i-au rămas.
function ReportView({ open, data, onClose }) {
  const [alesi, setAlesi] = useState(null);      // null = toți cei în curs
  const [alegeOpen, setAlegeOpen] = useState(false);

  const inCurs = data.students.filter(s => !s.withdrawn && s.examResult !== 'promovat');
  const promovati = data.students.filter(s => !s.withdrawn && s.examResult === 'promovat');
  const retrasi = data.students.filter(s => s.withdrawn);
  const set = alesi || new Set(inCurs.map(s => s.id));

  const randuri = data.students
    .filter(s => set.has(s.id))
    .map(s => {
      const total = studentTotalHours(s);
      const facute = studentCompletedCount(data.sessions, s.id);
      const rezervate = Math.max(0, studentUsedCount(data.sessions, s.id) - facute);
      return { id: s.id, nume: s.name, total, facute, rezervate, ramase: Math.max(0, total - facute - rezervate) };
    })
    .sort((a, b) => a.nume.localeCompare(b.nume, 'ro'));

  const t = randuri.reduce((a, r) => ({
    total: a.total + r.total, facute: a.facute + r.facute,
    rezervate: a.rezervate + r.rezervate, ramase: a.ramase + r.ramase,
  }), { total: 0, facute: 0, rezervate: 0, ramase: 0 });

  if (!open) return null;
  const cel = 'px-2 py-2 text-right font-mono-time';
  const cap = 'px-2 py-2 text-xs font-medium text-slate-500 border-b border-slate-200';

  const grupSelectie = (titlu, lista) => (
    lista.length === 0 ? null : (
      <div className="mb-3">
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">{titlu} · {lista.length}</div>
        <div className="space-y-1">
          {lista.map(s => {
            const bifat = set.has(s.id);
            return (
              <button key={s.id}
                onClick={() => {
                  const n = new Set(set);
                  if (n.has(s.id)) n.delete(s.id); else n.add(s.id);
                  setAlesi(n);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border text-left"
                style={bifat ? { borderColor: 'var(--accent-line)', background: 'var(--accent-soft)' } : { borderColor: 'var(--line)', background: 'var(--surface)' }}>
                <span className="flex items-center justify-center rounded shrink-0"
                  style={{
                    width: 16, height: 16, border: `1.5px solid ${bifat ? 'var(--accent)' : 'var(--line-2)'}`,
                    background: bifat ? 'var(--accent)' : 'transparent', color: '#3a2100', fontSize: 11, fontWeight: 900, lineHeight: 1,
                  }}>{bifat ? '✓' : ''}</span>
                <span className="text-sm text-slate-800 truncate">{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    )
  );

  return (
    <div className="fixed inset-0 raport-overlay ecran-peste" style={{ zIndex: LAYER.form, background: 'var(--bg)' }}>
      <div className="h-full overflow-y-auto raport-print" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-2 mb-1 fara-print">
            <h2 className="font-display text-lg font-semibold text-slate-900 uppercase tracking-wide">Raport elevi</h2>
            <button onClick={onClose} aria-label="Închide" className="btn-inchide p-2 rounded-full text-slate-500"><X size={20} /></button>
          </div>

          <div className="doar-print" style={{ display: 'none' }}>
            <div style={{ fontSize: '16pt', fontWeight: 700 }}>{BRAND.mark} · Raport elevi</div>
            <div style={{ fontSize: '10pt', marginBottom: '10pt' }}>
              Generat la {fmtHuman(todayISO())} · {randuri.length} {randuri.length === 1 ? 'elev' : 'elevi'}
            </div>
          </div>

          <button onClick={() => setAlegeOpen(true)}
            className="w-full py-2.5 mb-3 rounded-xl border border-slate-200 text-slate-600 text-sm fara-print">
            Alege elevii · {randuri.length} aleși
          </button>

          {randuri.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-400">Niciun elev ales.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm raport-tabel">
                <thead>
                  <tr>
                    <th className={`${cap} text-left`}>Elev</th>
                    <th className={cap}>Total</th>
                    <th className={cap}>Efectuate</th>
                    <th className={cap}>Programate</th>
                    <th className={cap}>Rămase</th>
                  </tr>
                </thead>
                <tbody>
                  {randuri.map(r => (
                    <tr key={r.id} className="border-b border-slate-100">
                      <td className="px-2 py-2 text-slate-800">
                        {r.nume}
                        {r.ramase > 0 ? <span className="block text-xs text-slate-400">{r.ramase} încă neprogramate</span> : null}
                      </td>
                      <td className={`${cel} text-slate-600`}>{r.total}</td>
                      <td className={`${cel} text-slate-900 font-semibold`}>{r.facute}</td>
                      <td className={`${cel} text-slate-600`}>{r.rezervate}</td>
                      <td className={`${cel} text-slate-600`}>{r.ramase}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="px-2 py-2 text-xs font-medium text-slate-500 border-t border-slate-300">
                      Total · {randuri.length} {randuri.length === 1 ? 'elev' : 'elevi'}
                    </td>
                    <td className={`${cel} border-t border-slate-300 text-slate-700`}>{t.total}</td>
                    <td className={`${cel} border-t border-slate-300 text-slate-900 font-semibold`}>{t.facute}</td>
                    <td className={`${cel} border-t border-slate-300 text-slate-700`}>{t.rezervate}</td>
                    <td className={`${cel} border-t border-slate-300 text-slate-700`}>{t.ramase}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          <div className="mt-5 space-y-2 fara-print">
            <button onClick={() => { try { window.print(); } catch (e) { /* tiparul nu e disponibil */ } }}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium text-sm flex items-center justify-center gap-2">
              <Download size={15} />Salvează ca PDF
            </button>
            <button onClick={onClose} className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm">Închide</button>
          </div>
        </div>
      </div>

      <BottomSheet open={alegeOpen} onClose={() => setAlegeOpen(false)} title="Alege elevii" layer={LAYER.dialog}>
        <div className="flex gap-2 mb-3">
          <button onClick={() => setAlesi(new Set(inCurs.map(s => s.id)))} className="flex-1 py-2 rounded-lg border border-slate-200 text-xs text-slate-600">Toți în curs</button>
          <button onClick={() => setAlesi(new Set(data.students.map(s => s.id)))} className="flex-1 py-2 rounded-lg border border-slate-200 text-xs text-slate-600">Chiar toți</button>
          <button onClick={() => setAlesi(new Set())} className="flex-1 py-2 rounded-lg border border-slate-200 text-xs text-slate-600">Niciunul</button>
        </div>
        {grupSelectie('În curs', inCurs)}
        {grupSelectie('Promovați', promovati)}
        {grupSelectie('Retrași', retrasi)}
      </BottomSheet>
    </div>
  );
}

// Raportul de bani: cine cât a plătit, prin cine, cât ai dus la școală.
function RaportBani({ open, data, monthKey, monthLabel, onClose }) {
  if (!open) return null;
  const cur = data.settings.currency;
  const lei = (n) => `${Math.round(n || 0).toLocaleString('ro-RO')} ${cur}`;

  const randuri = (data.students || []).map(st => {
    const ale = (st.payments || []).filter(p => (p.date || '').startsWith(monthKey));
    const laTine = ale.filter(p => p.collector !== 'school').reduce((s, p) => s + (Number(p.amount) || 0), 0);
    const laScoala = ale.filter(p => p.collector === 'school').reduce((s, p) => s + (Number(p.amount) || 0), 0);
    return { id: st.id, nume: st.name, laTine, laScoala };
  }).filter(r => r.laTine || r.laScoala).sort((a, b) => a.nume.localeCompare(b.nume, 'ro'));

  const t = randuri.reduce((a, r) => ({ laTine: a.laTine + r.laTine, laScoala: a.laScoala + r.laScoala }), { laTine: 0, laScoala: 0 });
  const varsLuna = varsamintePeLuna(data, monthKey);
  const varsatLuna = totalVarsat(varsLuna);
  const restTotal = incasatDeTineTotal(data) - totalVarsat(data.varsaminte);

  const cel = 'px-2 py-2 text-right font-mono-time';
  const cap = 'px-2 py-2 text-xs font-medium text-slate-500 border-b border-slate-200';

  return (
    <div className="fixed inset-0 raport-overlay ecran-peste" style={{ zIndex: LAYER.form, background: 'var(--bg)' }}>
      <div className="h-full overflow-y-auto raport-print" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-2 mb-1 fara-print">
            <h2 className="font-display text-lg font-semibold text-slate-900 uppercase tracking-wide">Raport bani</h2>
            <button onClick={onClose} aria-label="Închide" className="btn-inchide p-2 rounded-full text-slate-500"><X size={20} /></button>
          </div>

          <div className="doar-print" style={{ display: 'none' }}>
            <div style={{ fontSize: '16pt', fontWeight: 700 }}>{BRAND.mark} · Raport bani</div>
            <div style={{ fontSize: '10pt', marginBottom: '10pt' }}>{monthLabel} · generat la {fmtHuman(todayISO())}</div>
          </div>

          <p className="text-xs text-slate-400 mb-3 fara-print">Plățile lunii, după cine le-a încasat, și banii duși la școală.</p>

          {randuri.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-400">Nicio plată în {monthLabel}.</div>
          ) : (
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm raport-tabel">
                <thead>
                  <tr>
                    <th className={`${cap} text-left`}>Elev</th>
                    <th className={cap}>La tine</th>
                    <th className={cap}>La școală</th>
                    <th className={cap}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {randuri.map(r => (
                    <tr key={r.id} className="border-b border-slate-100">
                      <td className="px-2 py-2 text-slate-800">{r.nume}</td>
                      <td className={`${cel} text-slate-900 font-semibold`}>{r.laTine ? lei(r.laTine) : '—'}</td>
                      <td className={`${cel} text-slate-600`}>{r.laScoala ? lei(r.laScoala) : '—'}</td>
                      <td className={`${cel} text-slate-600`}>{lei(r.laTine + r.laScoala)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="px-2 py-2 text-xs font-medium text-slate-500 border-t border-slate-300">
                      Total · {randuri.length} {randuri.length === 1 ? 'elev' : 'elevi'}
                    </td>
                    <td className={`${cel} border-t border-slate-300 text-slate-900 font-semibold`}>{lei(t.laTine)}</td>
                    <td className={`${cel} border-t border-slate-300 text-slate-700`}>{lei(t.laScoala)}</td>
                    <td className={`${cel} border-t border-slate-300 text-slate-700`}>{lei(t.laTine + t.laScoala)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Dus la școală în {monthLabel}</div>
          {varsLuna.length === 0 ? (
            <div className="text-sm text-slate-400 py-2">Niciun vărsământ în această lună.</div>
          ) : (
            <table className="w-full text-sm raport-tabel mb-3">
              <thead>
                <tr>
                  <th className={`${cap} text-left`}>Data</th>
                  <th className={`${cap} text-left`}>Mențiune</th>
                  <th className={cap}>Sumă</th>
                </tr>
              </thead>
              <tbody>
                {varsLuna.map(v => (
                  <tr key={v.id} className="border-b border-slate-100">
                    <td className="px-2 py-2 text-slate-800">{v.date ? fmtHuman(v.date) : '—'}</td>
                    <td className="px-2 py-2 text-slate-500">{v.note || '—'}</td>
                    <td className={`${cel} text-slate-900 font-semibold`}>{lei(v.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="px-2 py-2 text-xs font-medium text-slate-500 border-t border-slate-300" colSpan={2}>Total dus</td>
                  <td className={`${cel} border-t border-slate-300 text-slate-900 font-semibold`}>{lei(varsatLuna)}</td>
                </tr>
              </tfoot>
            </table>
          )}

          <div className="rounded-xl border px-3.5 py-3 mt-3"
            style={restTotal > 0
              ? { background: 'var(--accent-soft)', borderColor: 'var(--accent-line)' }
              : { background: 'var(--ok-soft)', borderColor: 'var(--ok-line)' }}>
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-sm font-medium" style={{ color: restTotal > 0 ? 'var(--accent-ink)' : 'var(--ok)' }}>
                  {restTotal > 0 ? 'Mai ai de dus la școală' : 'Ai dus tot'}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  De la început: încasat de tine {lei(incasatDeTineTotal(data))} · dus {lei(totalVarsat(data.varsaminte))}
                </div>
              </div>
              <span className="font-mono-time text-lg font-semibold shrink-0" style={{ color: restTotal > 0 ? 'var(--accent-ink)' : 'var(--ok)' }}>
                {lei(Math.abs(restTotal))}
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-2 fara-print">
            <button onClick={() => { try { window.print(); } catch (e) { /* tiparul nu e disponibil */ } }}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium text-sm flex items-center justify-center gap-2">
              <Download size={15} />Salvează ca PDF
            </button>
            <button onClick={onClose} className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm">Închide</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================== LICENȚIEREA ============================= */
/* Accesul se dă pe cod, cerut o singură dată. Aplicația verifică apoi la fiecare
   pornire un fișier ținut de proprietar (licente.json): acolo scrie până când e
   valabil fiecare cod. Prelungirea se face de la distanță, schimbând data — omul
   nu trebuie să facă nimic. Fără internet, merge o săptămână pe ultima verificare. */

const OWNER_CODE = 'IAS-9F3K-7QX2';
const LICENSE_URL = 'licente.json';
const GRACE_ZILE = 7;

const normCod = (x) => String(x || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
const formatCod = (c) => {
  const n = normCod(c);
  return n.length === 11 ? `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7)}` : n;
};

/* Fiecare telefon primește o dată un identificator scurt. Proprietarul îl trece
   în dreptul codului, iar de atunci codul merge doar acolo. Cât timp nu e trecut
   niciun telefon, codul funcționează oriunde. */
function idDispozitiv() {
  try {
    let v = window.localStorage.getItem(DEVICE_KEY);
    if (!v) {
      v = 'T' + Math.random().toString(36).slice(2, 6).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
      window.localStorage.setItem(DEVICE_KEY, v);
    }
    return v;
  } catch (e) { return 'T0000000'; }
}

// Drepturile mărunte pe care le poate avea o licență. Tipurile („VIP", „Bază")
// sunt liste de drepturi ținute în fișier, ca să se poată inventa altele fără
// o versiune nouă a aplicației.
const TIPURI_IMPLICITE = {
  vip: { nume: 'VIP', drepturi: ['*'] },
  completa: { nume: 'Completă', drepturi: ['*'] },
  baza: { nume: 'Bază', drepturi: ['calendar', 'elevi'], maxElevi: 5 },
};
// Un tip necunoscut nu taie nimănui accesul: mai bine dai o funcție în plus
// decât să blochezi un om care a plătit, dintr-o literă greșită în fișier.
function drepturileTipului(tip, tipuri) {
  const t = (tipuri && tipuri[tip]) || TIPURI_IMPLICITE[tip] || { nume: tip || 'Completă', drepturi: ['*'] };
  return { nume: t.nume || tip || 'Completă', drepturi: t.drepturi || ['*'], maxElevi: Number(t.maxElevi) || 0 };
}
const are = (st, drept) => {
  if (!st) return false;
  if (st.rol === 'proprietar') return true;
  const d = st.drepturi || ['*'];
  return d.includes('*') || d.includes(drept);
};

function citesteLicenta() {
  try {
    const raw = window.localStorage.getItem(LICENSE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}
function scrieLicenta(l) {
  try {
    if (l) window.localStorage.setItem(LICENSE_KEY, JSON.stringify(l));
    else window.localStorage.removeItem(LICENSE_KEY);
  } catch (e) { /* memoria e blocată */ }
}

async function verificaCod(cod) {
  const c = normCod(cod);
  // Codul proprietarului merge și fără fișier: altfel n-ar putea repara nimic.
  if (c === normCod(OWNER_CODE)) {
    return { stare: 'ok', nume: 'Proprietar', rol: 'proprietar', pana: '2099-12-31', drepturi: ['*'], verificatLa: todayISO() };
  }
  let j = null;
  try {
    const r = await fetch(`${LICENSE_URL}?t=${Date.now()}`, { cache: 'no-store' });
    if (r.ok) j = await r.json();
  } catch (e) { /* fără internet */ }
  if (!j) return { stare: 'offline', verificatLa: null };

  const gasit = (j.licente || []).find(l => normCod(l.cod) === c);
  if (!gasit) return { stare: 'necunoscut', verificatLa: todayISO() };

  const legat = String(gasit.dispozitiv || '').trim().toUpperCase();
  if (legat && legat !== idDispozitiv()) {
    return { stare: 'altDispozitiv', nume: gasit.nume || '', pana: gasit.pana || '', verificatLa: todayISO() };
  }
  const t = drepturileTipului(gasit.tip, j.tipuri);
  return {
    stare: 'ok', nume: gasit.nume || '', rol: gasit.rol || 'utilizator',
    pana: gasit.pana || '', legat: !!legat, verificatLa: todayISO(),
    tip: gasit.tip || '', tipNume: t.nume, drepturi: t.drepturi, maxElevi: t.maxElevi,
  };
}

/* Ce poate face aplicația în starea curentă. La expirare rămâne totul vizibil și
   backup-ul disponibil — se opresc doar modificările. */
function stareLicenta(l) {
  if (!l) return { faraCod: true };
  if (l.rol === 'proprietar') return { activ: true, rol: 'proprietar', drepturi: ['*'], pana: l.pana, nume: l.nume };
  if (l.stare === 'necunoscut') return { blocat: true, motiv: 'Codul acesta nu mai este valabil.', pana: l.pana, nume: l.nume };
  if (l.stare === 'altDispozitiv') {
    return { blocat: true, dispozitivGresit: true, motiv: 'Licența e legată de alt telefon. Trimite-mi codul telefonului de mai jos ca să o mut aici.', pana: l.pana, nume: l.nume };
  }
  if (l.pana && l.pana < todayISO()) {
    return { blocat: true, motiv: `Accesul a expirat pe ${fmtHuman(l.pana)}.`, pana: l.pana, nume: l.nume };
  }
  if (!l.verificatLa) return { blocat: true, motiv: 'Nu am putut verifica accesul. Conectează-te la internet o dată.', nume: l.nume };
  const zile = zileIntre(l.verificatLa, todayISO());
  if (zile > GRACE_ZILE) {
    return { blocat: true, motiv: `N-am mai putut verifica accesul de ${deZile(zile)}. Conectează-te la internet.`, pana: l.pana, nume: l.nume };
  }
  return { activ: true, pana: l.pana, nume: l.nume, drepturi: l.drepturi || ['*'], maxElevi: l.maxElevi || 0, tipNume: l.tipNume };
}

// Ecranul de la prima pornire: cere codul primit și arată codul telefonului.
function CodeScreen({ eroare, ocupat, onTrimite }) {
  const [cod, setCod] = useState('');
  const [copiat, setCopiat] = useState(false);
  async function copiaza() {
    try {
      await navigator.clipboard.writeText(idDispozitiv());
      setCopiat(true);
      setTimeout(() => setCopiat(false), 2000);
    } catch (e) { /* browserul nu permite copierea */ }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-5"><Plate county="B" digits="9026" letters="IAS" h={40} /></div>
        <h1 className="font-display text-xl font-semibold text-center uppercase tracking-wide" style={{ color: 'var(--ink)' }}>
          {BRAND.expansion}
        </h1>
        <p className="text-sm text-slate-500 text-center mt-2 mb-6">Introdu codul unic de acces primit!</p>

        <input value={cod} onChange={e => setCod(e.target.value)} placeholder="IAS-XXXX-XXXX"
          autoCapitalize="characters" autoCorrect="off"
          className={`${inputCls} text-center font-mono-time`} style={{ letterSpacing: '0.12em' }} />
        {eroare ? <p className="text-xs mt-2 text-center" style={{ color: 'var(--bad)' }}>{eroare}</p> : null}

        <button onClick={() => onTrimite(cod)} disabled={ocupat || !cod.trim()}
          className="w-full py-3 mt-3 rounded-xl text-white font-medium text-sm disabled:opacity-40"
          style={{ background: 'var(--invert)' }}>
          {ocupat ? 'Verific…' : 'Intră în aplicație'}
        </button>

        <div className="mt-7 rounded-xl px-3.5 py-3.5" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}>
          <div className="text-sm font-medium" style={{ color: 'var(--accent-ink)' }}>Nu ai încă un cod de acces?</div>
          <p className="text-xs text-slate-500 mt-1">Trimite codul de mai jos ca să primești licența ta!</p>
          <button onClick={copiaza}
            className="w-full mt-2.5 py-3 rounded-xl bg-white border border-slate-200 font-mono-time text-base text-slate-900 flex items-center justify-center gap-2"
            style={{ letterSpacing: '0.12em' }}>
            {copiat ? 'Copiat ✓' : idDispozitiv()}
            {!copiat && <Copy size={14} className="text-slate-400" />}
          </button>
          <a href={mailHref(`Cerere cod de acces IAS · ${idDispozitiv()}`,
            `Bună! Aș vrea un cod de acces pentru IAS.\n\nCodul telefonului meu: ${idDispozitiv()}\n\nNumele meu:\nȘcoala:\nTelefon:\n`)}
            style={{ touchAction: 'manipulation', background: 'var(--invert)' }}
            className="w-full mt-2 py-3 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2">
            <Send size={15} />Trimite codul
          </a>
          <p className="text-xs text-slate-400 mt-2 text-center">sau scrie-mi la {SUPPORT_EMAIL}</p>
        </div>
      </div>
    </div>
  );
}

// Bara roșie de sus, când accesul e blocat: datele rămân vizibile.
function LockBar({ st, cod, ocupat, onVerifica }) {
  const corp = `Bună! Aș vrea prelungirea accesului pentru luna următoare.\n\nCod: ${formatCod(cod)}\nNume: ${st.nume || '—'}\nCodul telefonului: ${idDispozitiv()}\nA fost valabil până la: ${st.pana ? fmtHuman(st.pana) : '—'}\n`;
  return (
    <div className="shrink-0 px-4 py-2.5" style={{ background: 'var(--bad-soft)', borderBottom: '1px solid var(--bad-line)' }}>
      <div className="text-sm font-medium" style={{ color: 'var(--bad)' }}>{st.motiv}</div>
      <div className="text-xs text-slate-500 mt-0.5">Vezi tot și îți poți descărca backup-ul, dar nu poți face modificări.</div>
      {st.dispozitivGresit && (
        <div className="font-mono-time text-xs mt-1" style={{ color: 'var(--bad)' }}>Codul telefonului: {idDispozitiv()}</div>
      )}
      <div className="flex gap-2 mt-2">
        <button onClick={onVerifica} disabled={ocupat}
          className="flex-1 py-2 rounded-lg border text-xs disabled:opacity-50" style={{ borderColor: 'var(--bad-line)', color: 'var(--bad)' }}>
          {ocupat ? 'Verific…' : 'Verifică din nou'}
        </button>
        <a href={mailHref('Prelungire acces IAS', corp)}
          className="flex-1 py-2 rounded-lg text-white text-xs text-center"
          style={{ background: 'var(--bad)', touchAction: 'manipulation' }}>
          Cere prelungirea
        </a>
      </div>
    </div>
  );
}

// Fila pe care licența nu o cuprinde: rămâne la vedere, dar se deschide într-o
// invitație, nu într-un zid.
function FilaBlocata({ titlu, descriere, cod, tipNume }) {
  const corp = `Bună! Aș vrea licența completă pentru IAS.\n\nCodul meu: ${formatCod(cod || '')}\nLicența de acum: ${tipNume || '—'}\n\nNumele meu:\nȘcoala:\n`;
  return (
    <div className="pb-4">
      <div className="px-4 pt-4 pb-1">
        <h1 className="font-display text-xl font-semibold text-slate-900 uppercase tracking-wide">{titlu}</h1>
      </div>
      <div className="px-4 mt-4">
        <div className="rounded-2xl px-4 py-6 text-center" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}>
          <div className="font-display text-lg uppercase tracking-wide" style={{ color: 'var(--accent-ink)' }}>
            Se deblochează cu licența completă
          </div>
          <p className="text-sm text-slate-600 mt-2">{descriere}</p>
          <a href={mailHref('Vreau licența completă IAS', corp)}
            style={{ touchAction: 'manipulation', background: 'var(--invert)' }}
            className="block w-full mt-4 py-3 rounded-xl text-white font-medium text-sm">
            Cere licența completă
          </a>
        </div>
      </div>
    </div>
  );
}

/* ======================= EVIDENȚA LICENȚELOR ============================= */
/* Numai pentru proprietar. Fișa completă a fiecărui client — nume, școală, oraș,
   e-mail — rămâne în telefonul lui și intră în backup. În fișierul public de pe
   GitHub pleacă doar codul, o etichetă neutră, tipul, data și telefonul legat:
   depozitul e public, iar numele clienților n-au ce căuta acolo. */

const URL_EDITARE_LICENTE = 'https://github.com/ias-auto/ias/edit/main/licente.json';
const URL_APLICATIE = 'https://ias-auto.github.io/ias/';

const ALFABET_COD = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   // fără O/0 și I/1
const aleator = (n) => Array.from({ length: n }, () => ALFABET_COD[Math.floor(Math.random() * ALFABET_COD.length)]).join('');

function codNou(existente) {
  const luate = new Set((existente || []).map(l => normCod(l.cod)));
  for (let i = 0; i < 50; i++) {
    const c = `IAS-${aleator(4)}-${aleator(4)}`;
    if (!luate.has(normCod(c))) return c;
  }
  return `IAS-${aleator(4)}-${aleator(4)}`;
}
// Eticheta publică: inițiala numelui, a prenumelui, două litere din oraș și
// patru caractere la întâmplare.
function etichetaNoua(nume, prenume, oras) {
  const ini = (x) => (stripDia(x || '').slice(0, 1) || 'X');
  const or = (stripDia(oras || '') + 'XX').slice(0, 2);
  return `${ini(nume)}${ini(prenume)}-${or}-${aleator(4)}`;
}

function fisierLicente(lista) {
  return JSON.stringify({
    actualizat: todayISO(),
    tipuri: TIPURI_IMPLICITE,
    licente: [
      { cod: OWNER_CODE, nume: 'Proprietar', rol: 'proprietar', pana: '2099-12-31' },
      ...(lista || []).filter(l => !l.revocata).map(l => ({
        cod: l.cod, nume: l.eticheta, tip: l.tip || 'vip', pana: l.pana || '',
        ...(l.dispozitiv ? { dispozitiv: l.dispozitiv } : {}),
      })),
    ],
  }, null, 2);
}

const lunaUrmatoare = (iso) => {
  const d = fromISO(iso || todayISO());
  return toISO(new Date(d.getFullYear(), d.getMonth() + 2, 0));
};

function stareaFisei(l) {
  if (l.revocata) return { text: 'revocată', culoare: 'var(--bad)' };
  if (!l.dispozitiv) return { text: 'fără telefon legat', culoare: 'var(--accent-ink)' };
  const azi = todayISO();
  if (l.pana && l.pana < azi) return { text: `expirată ${fmtHuman(l.pana)}`, culoare: 'var(--bad)' };
  if (!l.pana) return { text: 'fără termen', culoare: 'var(--ok)' };
  const zile = zileIntre(azi, l.pana);
  if (zile <= 3) return { text: zile === 0 ? 'expiră azi' : `expiră în ${deZile(zile)}`, culoare: 'var(--accent-ink)' };
  return { text: `până la ${fmtHuman(l.pana)}`, culoare: 'var(--ok)' };
}

function LicenteView({ open, data, onClose, onSalveaza, onPublicat, showToast }) {
  const [form, setForm] = useState(null);
  const [publicare, setPublicare] = useState(false);
  const [copiat, setCopiat] = useState('');
  if (!open) return null;

  const lista = data.licente || [];
  const continut = fisierLicente(lista);
  const nepublicat = (data.settings.licentePublicat || '') !== continut;
  const gol = () => ({ nume: '', prenume: '', scoala: '', oras: '', email: '', dispozitiv: '', tip: 'vip', pana: ultimaZiDin(todayISO()) });

  function salveazaFisa() {
    const nume = (form.nume || '').trim();
    const prenume = (form.prenume || '').trim();
    if (!nume && !prenume) { showToast('Scrie măcar numele.', 'error'); return; }
    const disp = String(form.dispozitiv || '').trim().toUpperCase();
    if (form.id) {
      onSalveaza(lista.map(l => (l.id === form.id ? { ...l, ...form, nume, prenume, dispozitiv: disp } : l)));
      showToast('Fișă actualizată.');
    } else {
      onSalveaza([...lista, {
        ...form, id: genId('lic'), nume, prenume, dispozitiv: disp,
        cod: codNou(lista), eticheta: etichetaNoua(nume, prenume, form.oras), creatLa: nowISO(),
      }]);
      showToast('Licență creată. Nu uita să publici fișierul.');
    }
    setForm(null);
  }
  const schimba = (id, patch) => onSalveaza(lista.map(l => (l.id === id ? { ...l, ...patch } : l)));
  async function copiaza(text, ce) {
    try { await navigator.clipboard.writeText(text); setCopiat(ce); setTimeout(() => setCopiat(''), 2000); }
    catch (e) { showToast('Copierea nu a mers în acest browser.', 'error'); }
  }
  const linkul = (l) => `${URL_APLICATIE}?cod=${l.cod}`;
  const mesajul = (l) => `Bună, ${l.prenume || l.nume}!\n\nAcesta e accesul tău la IAS — Instructor Auto Sistem.\n\nDeschide linkul de pe telefonul pe care ai instalat aplicația:\n${linkul(l)}\n\nCodul se salvează singur. Dacă îți cere codul, îl scrii de mână: ${l.cod}\n\nLicență ${drepturileTipului(l.tip).nume}${l.pana ? `, valabilă până la ${fmtHuman(l.pana)}` : ''}.\n\nSpor la treabă!`;

  return (
    <BottomSheet open={open} onClose={onClose} title="Licențe" layer={LAYER.form}>
      {nepublicat && (
        <div className="rounded-xl px-3.5 py-2.5 mb-3" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}>
          <div className="text-xs font-semibold" style={{ color: 'var(--accent-ink)' }}>Ai modificări nepublicate</div>
          <div className="text-xs text-slate-500 mt-0.5">Până nu urci fișierul pe GitHub, schimbările nu ajung la nimeni.</div>
          <button onClick={() => setPublicare(true)} className="w-full mt-2 py-2 rounded-lg text-white text-xs font-medium" style={{ background: 'var(--invert)' }}>
            Publică acum
          </button>
        </div>
      )}

      {form ? (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nume" required><input className={inputCls} value={form.nume} onChange={e => setForm({ ...form, nume: e.target.value })} /></Field>
            <Field label="Prenume"><input className={inputCls} value={form.prenume} onChange={e => setForm({ ...form, prenume: e.target.value })} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Școala"><input className={inputCls} value={form.scoala} onChange={e => setForm({ ...form, scoala: e.target.value })} /></Field>
            <Field label="Oraș"><input className={inputCls} value={form.oras} onChange={e => setForm({ ...form, oras: e.target.value })} /></Field>
          </div>
          <Field label="E-mail"><input className={inputCls} inputMode="email" autoCapitalize="off" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="ca să-i poți trimite codul dintr-o atingere" /></Field>
          <Field label="Codul telefonului lui"><input className={`${inputCls} font-mono-time`} autoCapitalize="characters" value={form.dispozitiv} onChange={e => setForm({ ...form, dispozitiv: e.target.value })} placeholder="TXXXXXXX — din mesajul primit de la el" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tip licență">
              <select className={inputCls} value={form.tip} onChange={e => setForm({ ...form, tip: e.target.value })}>
                {Object.entries(TIPURI_IMPLICITE).map(([id, t]) => <option key={id} value={id}>{t.nume}</option>)}
              </select>
            </Field>
            <Field label="Valabilă până la"><input type="date" className={inputCls} value={form.pana} onChange={e => setForm({ ...form, pana: e.target.value })} /></Field>
          </div>
          <p className="text-xs text-slate-400 -mt-2 mb-3">Lasă data goală pentru acces fără termen. Codul și eticheta publică se generează singure.</p>
          <div className="flex gap-2">
            <button onClick={() => setForm(null)} className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-600">Renunță</button>
            <button onClick={salveazaFisa} className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white text-sm">Salvează</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setForm(gol())} className="w-full py-3 mb-4 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5">
          <Plus size={15} />Licență nouă
        </button>
      )}

      {lista.length === 0 && !form && (
        <div className="text-center py-8 text-sm text-slate-400">Nicio licență încă. Prima o creezi când primești codul telefonului unui coleg.</div>
      )}

      <div className="space-y-2">
        {lista.map(l => {
          const st = stareaFisei(l);
          return (
            <div key={l.id} className="rounded-xl bg-white border border-slate-200 px-3.5 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-900 truncate">{l.nume} {l.prenume}</div>
                  <div className="text-xs text-slate-400 truncate">{[l.scoala, l.oras].filter(Boolean).join(' · ') || '—'}</div>
                  <div className="font-mono-time text-xs text-slate-500 mt-1">{l.cod}</div>
                  <div className="font-mono-time text-xs text-slate-400">{l.eticheta}{l.dispozitiv ? ` · ${l.dispozitiv}` : ''}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-medium" style={{ color: st.culoare }}>{st.text}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{drepturileTipului(l.tip).nume}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-2.5">
                <a href={l.email
                  ? `mailto:${l.email}?subject=${encodeURIComponent('Codul tău de acces IAS')}&body=${encodeURIComponent(mesajul(l))}`
                  : mailHref('Codul tău de acces IAS', mesajul(l))}
                  className="py-2 rounded-lg text-center text-xs font-medium text-white"
                  style={{ background: 'var(--invert)', touchAction: 'manipulation' }}>
                  Trimite codul
                </a>
                <button onClick={() => copiaza(linkul(l), l.id)} className="py-2 rounded-lg border border-slate-200 text-xs text-slate-600">
                  {copiat === l.id ? 'Link copiat ✓' : 'Copiază linkul'}
                </button>
                <button onClick={() => schimba(l.id, { pana: lunaUrmatoare(l.pana || todayISO()) })} className="py-2 rounded-lg border border-slate-200 text-xs text-slate-600">
                  Încă o lună
                </button>
                <button onClick={() => setForm({ ...l })} className="py-2 rounded-lg border border-slate-200 text-xs text-slate-600">Modifică</button>
                <button onClick={() => schimba(l.id, { revocata: !l.revocata })}
                  className="py-2 rounded-lg border text-xs col-span-2"
                  style={l.revocata ? { borderColor: 'var(--ok-line)', color: 'var(--ok)' } : { borderColor: 'var(--bad-line)', color: 'var(--bad)' }}>
                  {l.revocata ? 'Reactivează' : 'Revocă accesul'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {publicare && (
        <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3.5">
          <div className="text-sm font-medium text-slate-800 mb-1">Publică fișierul</div>
          <p className="text-xs text-slate-500 mb-2">
            Copiază tot textul, deschide <span className="font-mono-time">licente.json</span> pe GitHub, șterge ce e acolo, lipește și dă Commit. Codurile intră în funcțiune într-un minut.
          </p>
          <textarea readOnly rows={6} className={`${inputCls} font-mono-time`} style={{ fontSize: 11 }} value={continut} onFocus={e => e.target.select()} />
          <div className="flex gap-2 mt-2">
            <button onClick={() => copiaza(continut, 'fisier')} className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white text-sm">
              {copiat === 'fisier' ? 'Copiat ✓' : 'Copiază fișierul'}
            </button>
            <a href={URL_EDITARE_LICENTE} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm text-center">Deschide GitHub</a>
          </div>
          <button onClick={() => { onPublicat(continut); setPublicare(false); showToast('Marcat ca publicat.'); }}
            className="w-full py-2.5 mt-2 rounded-lg border text-sm" style={{ borderColor: 'var(--ok-line)', color: 'var(--ok)' }}>
            Am publicat
          </button>
        </div>
      )}

      {!publicare && lista.length > 0 && (
        <button onClick={() => setPublicare(true)} className="w-full py-3 mt-4 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium">
          Publică fișierul de licențe
        </button>
      )}
    </BottomSheet>
  );
}

/* ------------------------- AJUTOR ȘI FEEDBACK ---------------------------- */

const LOCURI_PROBLEMA = ['Acasă', 'Calendar', 'Fișa unei ședințe', 'Elevi', 'Fișa unui elev', 'Raport elevi',
  'Plan', 'Finanțe', 'Raport bani', 'Setări', 'Backup', 'Mesaje către elevi', 'La pornire / acces', 'Altundeva'];

function dateTehnice(data) {
  const p = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    && window.matchMedia('(display-mode: standalone)').matches;
  return [
    `Versiune: ${VERSION_LABEL}`,
    `Instalată pe telefon: ${p ? 'da' : 'nu (deschisă în browser)'}`,
    `Elevi: ${data.students.length} · Ședințe: ${data.sessions.length}`,
    `Ecran: ${typeof window !== 'undefined' ? `${window.innerWidth}×${window.innerHeight}` : '—'}`,
    `Data: ${new Date().toLocaleString('ro-RO')}`,
  ].join('\n');
}

function SupportBox({ data }) {
  const [copiat, setCopiat] = useState(false);
  const [unde, setUnde] = useState('');
  const info = dateTehnice(data);
  const problema = `Unde s-a întâmplat: ${unde || '(nespecificat)'}\n\nScrie pe scurt ce s-a întâmplat:\n\n\nCe făceai chiar înainte?\n\n\n--- date tehnice, te rog nu le șterge ---\n${info}`;
  const sugestie = `Ce ți-ar plăcea să facă aplicația?\n\n\nCum te-ar ajuta?\n\n\n--- ${VERSION_LABEL} ---`;

  return (
    <div className="space-y-2.5">
      <Field label="Unde ai întâlnit problema?">
        <select className={inputCls} value={unde} onChange={e => setUnde(e.target.value)}>
          <option value="">Alege locul din aplicație</option>
          {LOCURI_PROBLEMA.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </Field>
      <a href={mailHref(`Problemă · ${unde || 'nespecificat'} · ${VERSION_LABEL}`, problema)}
        style={{ touchAction: 'manipulation' }}
        className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-2">
        <Flag size={15} />Raportează o problemă
      </a>
      <a href={mailHref(`Sugestie · ${VERSION_LABEL}`, sugestie)}
        style={{ touchAction: 'manipulation' }}
        className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-2">
        <MessageCircle size={15} />Trimite o sugestie
      </a>
      <button onClick={async () => {
        try { await navigator.clipboard.writeText(SUPPORT_EMAIL); setCopiat(true); setTimeout(() => setCopiat(false), 2000); }
        catch (e) { /* fără clipboard */ }
      }}
        className="w-full py-2.5 rounded-xl text-xs text-slate-500 flex items-center justify-center gap-1.5">
        <Copy size={13} />{copiat ? 'Adresă copiată ✓' : SUPPORT_EMAIL}
      </button>
    </div>
  );
}

/* -------------------------------- SETĂRI --------------------------------- */
/* Fila e o listă scurtă; fiecare grup se deschide în fereastra lui, ca să se
   citească dintr-o privire cum stai. */

const CHANGELOG = [
  {
    v: 'v2.35.1', titlu: 'Reparații după rescriere',
    puncte: [
      'Bara de taburi stă din nou lipită de marginea de jos.',
      'Pe Acasă s-au întors statisticile — procentul de promovați și examenele după tip — acțiunile rapide și lista completă de lucruri care cer atenție.',
    ],
  },
  {
    v: 'v2.35.0', titlu: 'Aplicația, rescrisă pe curat',
    puncte: [
      'Tot codul a fost scris din nou, mai limpede și mai ușor de dus mai departe. Datele, elevii și ședințele rămân neatinse.',
      'Garajul are un model nou: SUV. Fasciculele farurilor se așază corect pe asfalt, la orice vehicul și cu orice remorcă.',
    ],
  },
  {
    v: 'v2.34.0', titlu: 'Garajul',
    puncte: [
      'Alegi din Setări vehiculul din capul paginii: hatchback, sedan, break, SUV, mașinuță de 16 ani, motocicletă cu sau fără ataș, cap tractor sau autobuz.',
      'Fiecăruia i se poate prinde remorca potrivită categoriei lui.',
    ],
  },
  {
    v: 'v2.30.0', titlu: 'Școlarizare, bun venit și zile de naștere',
    puncte: [
      'La adăugarea unui elev alegi pachetul de școlarizare: îi pune singur ședințele incluse și, după caz, plata sau datoria.',
      'Buton de mesaj de bun venit pe fișa fiecărui elev nou.',
      'În ziua lui de naștere, elevul are un tort lângă nume.',
    ],
  },
  {
    v: 'v2.27.0', titlu: 'Așteptare după examen',
    puncte: [
      'Elevul picat la examen intră în așteptare și nu mai apare la programare până îi eliberezi adeverința.',
      'Ședințele viitoare se pot trimite în calendarul telefonului, cu alarme.',
    ],
  },
  {
    v: 'v2.24.0', titlu: 'Planificare pe zone și pe ture',
    puncte: [
      'Planul poate grupa elevii care stau aproape unul de altul.',
      'Elevii care lucrează în ture nu mai sunt programați în timpul serviciului.',
    ],
  },
  {
    v: 'v2.21.0', titlu: 'Bani și rapoarte',
    puncte: [
      'Ții evidența banilor duși la școală și vezi cât mai ai de dat.',
      'Două rapoarte, de elevi și de bani, pe care le poți salva ca PDF.',
    ],
  },
  {
    v: 'v2.10.0', titlu: 'Acces pe perioadă',
    puncte: [
      'Aplicația se deschide cu un cod primit o singură dată.',
      'La expirare datele rămân întregi; doar modificările se opresc.',
    ],
  },
  {
    v: 'v2.0.0', titlu: 'Bani, taxe și salariu',
    puncte: [
      'Taxe și pachete stabilite de tine, plăți încasate de tine sau la școală.',
      'Salariul de la angajator se calculează singur, cu prag lunar.',
      'Orice plată se poate corecta sau șterge, iar datoria se recalculează.',
    ],
  },
];

function SettingsTab({ data, onUpdateSettings, onUpdateLocations, onExport, onImport, onImportStudent,
  onResetAll, skin, licenta, stLic, licOcupat, onVerificaLicenta, onSchimbaCod,
  onDespre, onNoutati, onLicente, onTrimiteBackup, onTrimiteCalendar }) {
  const [grup, setGrup] = useState(null);
  const [locDraft, setLocDraft] = useState(null);
  const [gps, setGps] = useState('');
  const [copiatId, setCopiatId] = useState(false);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [importErr, setImportErr] = useState('');
  const [pendingImport, setPendingImport] = useState(null);
  const [pendingStudent, setPendingStudent] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef(null);
  const s = data.settings;

  const themeOptions = [
    { id: 'system', label: 'Sistem', Icon: Smartphone },
    { id: 'light', label: 'Luminos', Icon: Sun },
    { id: 'dark', label: 'Întunecat', Icon: Moon },
  ];

  const zileScurt = DISPLAY_ORDER.filter(i => s.workDays.includes(i)).map(i => RO_DAYS_SHORT[i].slice(0, 2)).join(' ') || 'niciuna';
  const zileBackup = (() => {
    try {
      const v = window.localStorage.getItem(BACKUP_KEY);
      if (!v) return null;
      return zileIntre(v, todayISO());
    } catch (e) { return null; }
  })();

  function toggleDay(i) {
    const are2 = s.workDays.includes(i);
    onUpdateSettings({ workDays: are2 ? s.workDays.filter(x => x !== i) : [...s.workDays, i] });
  }
  function saveLocation() {
    const nume = locDraft && (locDraft.name || '').trim();
    if (!nume) return;
    const lista = s.locations || [];
    const coord = areCoord(locDraft) ? { lat: locDraft.lat, lng: locDraft.lng } : { lat: null, lng: null };
    if (locDraft.id) onUpdateLocations(lista.map(l => (l.id === locDraft.id ? { ...l, name: nume, ...coord } : l)));
    else onUpdateLocations([...lista, { id: genId('loc'), name: nume, ...coord }]);
    setLocDraft(null); setGps('');
  }
  async function prindeLocul() {
    setGps('caut');
    try {
      const c = await iaPozitia();
      setLocDraft(dr => ({ ...dr, ...c }));
      setGps('');
    } catch (e) { setGps(e && e.code === 1 ? 'refuzat' : 'eroare'); }
  }
  function proceseazaImport(text) {
    try {
      const j = JSON.parse(text);
      if (j && j.kind === STUDENT_FILE_KIND) { setPendingStudent(j); setImportErr(''); return; }
      const n = normalizeData(j);
      if (!n.students.length && !n.sessions.length) { setImportErr('Fișierul nu pare un backup IAS.'); return; }
      setPendingImport(n); setImportErr('');
    } catch (e) { setImportErr('Nu am putut citi fișierul. Verifică dacă e cel bun.'); }
  }
  function onFileChosen(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => proceseazaImport(String(r.result || ''));
    r.readAsText(f);
    e.target.value = '';
  }

  const grupuri = [
    { id: 'vehicul', nume: 'Vehiculul din antet', Icon: Car, rezumat: (GARAJ[s.vehicul] || GARAJ.hatchback).nume },
    { id: 'tema', nume: 'Temă', Icon: Sun, rezumat: (themeOptions.find(t => t.id === (s.theme || 'system')) || {}).label },
    { id: 'program', nume: 'Program de lucru', Icon: CalendarDays, rezumat: `${zileScurt} · ${minToTime(s.startMin)}–${minToTime(s.endMin)}` },
    { id: 'elevi', nume: 'Elevi noi și monedă', Icon: Users, rezumat: `${s.defaultWeeklyLimit}/săpt · ${s.currency}` },
    { id: 'euSiScoala', nume: 'Numele tău și școala', Icon: GraduationCap, rezumat: [s.numeleTau, s.numeScoala].filter(Boolean).join(' · ') || 'necompletat' },
    { id: 'locatii', nume: 'Locații de start', Icon: MapPin, rezumat: (s.locations || []).length ? `${(s.locations || []).length}` : 'niciuna' },
    { id: 'amintiri', nume: 'Amintiri pe telefon', Icon: CalendarDays, rezumat: [s.amSeara !== false && 'seara', s.amDimineata !== false && '7:00', s.amDouaOre !== false && '2h'].filter(Boolean).join(' · ') || 'niciuna' },
    { id: 'backup', nume: 'Backup și date', Icon: Download, rezumat: zileBackup == null ? 'niciodată' : zileBackup === 0 ? 'azi' : `acum ${deZile(zileBackup)}` },
    ...(stLic && stLic.rol === 'proprietar' ? [{ id: 'licente', nume: 'Licențe', Icon: GraduationCap, rezumat: `${(data.licente || []).length}`, direct: onLicente }] : []),
    { id: 'acces', nume: 'Acces', Icon: Smartphone, rezumat: licenta && licenta.rol === 'proprietar' ? 'permanent' : (stLic && stLic.blocat ? 'expirat' : (stLic && stLic.tipNume) || '—') },
    { id: 'ajutor', nume: 'Ajutor și feedback', Icon: MessageCircle, rezumat: '' },
    { id: 'despre', nume: 'Despre aplicație', Icon: Car, rezumat: APP_VERSION },
  ];
  const titluGrup = (grupuri.find(g => g.id === grup) || {}).nume || '';

  const continutGrup = () => {
    if (grup === 'vehicul') {
      const ales = GARAJ[s.vehicul] || GARAJ.hatchback;
      const potrivite = Object.entries(REMORCI).filter(([, r]) => r.categorii.includes(ales.categorie));
      return (
        <>
          <Field label="Vehiculul">
            <select className={inputCls} value={s.vehicul || 'hatchback'} onChange={e => onUpdateSettings({ vehicul: e.target.value, remorca: '' })}>
              {Object.entries(GARAJ).map(([id, v]) => <option key={id} value={id}>{v.nume} · categoria {v.categorie}</option>)}
            </select>
          </Field>
          <Field label="Remorcă">
            <select className={inputCls} value={s.remorca || ''} onChange={e => onUpdateSettings({ remorca: e.target.value })}>
              <option value="">Fără remorcă</option>
              {potrivite.map(([id, r]) => <option key={id} value={id}>{r.nume}</option>)}
            </select>
          </Field>
          <p className="text-xs text-slate-400 -mt-2">
            {potrivite.length
              ? `Se arată doar remorcile potrivite categoriei ${ales.categorie}. Caseta ȘCOALĂ rămâne pe orice vehicul.`
              : `Pentru categoria ${ales.categorie} nu avem încă o remorcă.`}
          </p>
        </>
      );
    }

    if (grup === 'tema') {
      return (
        <>
          <div className="flex gap-1.5 mb-1.5">
            {themeOptions.map(({ id, label, Icon }) => {
              const activ = (s.theme || 'system') === id;
              return (
                <button key={id} onClick={() => onUpdateSettings({ theme: id })}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border ${activ ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}>
                  <Icon size={14} />{label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-400">
            {(s.theme || 'system') === 'system'
              ? `Urmează setarea telefonului — acum: ${skin === 'dark' ? 'întunecat' : 'luminos'}.`
              : 'Temă fixată manual, indiferent de setarea telefonului.'}
          </p>
        </>
      );
    }

    if (grup === 'program') {
      return (
        <>
          <span className="block text-xs font-medium text-slate-500 mb-1.5">Zile de lucru</span>
          <div className="flex gap-1.5 mb-4">
            {DISPLAY_ORDER.map(i => (
              <button key={i} onClick={() => toggleDay(i)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-medium border ${s.workDays.includes(i) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}>
                {RO_DAYS_SHORT[i]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Ora de start">
              <select className={inputCls} value={s.startMin} onChange={e => onUpdateSettings({ startMin: Number(e.target.value) })}>
                {daySlots({ startMin: 0, endMin: 1440, sessionMin: 30, stepMin: 30 }).map(m => <option key={m} value={m}>{minToTime(m)}</option>)}
              </select>
            </Field>
            <Field label="Ora de final">
              <select className={inputCls} value={s.endMin} onChange={e => onUpdateSettings({ endMin: Number(e.target.value) })}>
                {daySlots({ startMin: 0, endMin: 1440, sessionMin: 30, stepMin: 30 }).map(m => <option key={m} value={m}>{minToTime(m)}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Durata unei ședințe">
              <select className={inputCls} value={s.sessionMin || SESSION_DURATION} onChange={e => onUpdateSettings({ sessionMin: Number(e.target.value) })}>
                {[30, 45, 50, 60, 75, 90, 100, 120, 150, 180].map(m => (
                  <option key={m} value={m}>{m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ''}`}</option>
                ))}
              </select>
            </Field>
            <Field label="Pasul orelor">
              <select className={inputCls} value={s.stepMin || 30} onChange={e => onUpdateSettings({ stepMin: Number(e.target.value) })}>
                {[5, 10, 15, 30, 60].map(m => <option key={m} value={m}>din {m} în {m} min</option>)}
              </select>
            </Field>
          </div>
          <p className="text-xs text-slate-400 -mt-2">
            Ședințele deja programate își păstrează durata cu care au fost create. Sub 30 de minute, calendarul arată orele întregi, iar minutul îl alegi la atingere.
          </p>
        </>
      );
    }

    if (grup === 'elevi') {
      return (
        <>
          <Field label="Limită implicită ședințe/săptămână pentru elevi noi">
            <input type="number" min="1" max="7" className={inputCls} value={s.defaultWeeklyLimit}
              onChange={e => onUpdateSettings({ defaultWeeklyLimit: Number(e.target.value) || 1 })} />
          </Field>
          <Field label="Județ implicit pentru elevi noi">
            <select className={inputCls} value={s.defaultCounty || 'B'} onChange={e => onUpdateSettings({ defaultCounty: e.target.value })}>
              {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <p className="text-xs text-slate-400 -mt-2 mb-3.5">Se aplică elevilor adăugați de acum înainte.</p>
          <Field label="Monedă">
            <input className={inputCls} value={s.currency} onChange={e => onUpdateSettings({ currency: e.target.value })} />
          </Field>
        </>
      );
    }

    if (grup === 'euSiScoala') {
      return (
        <>
          <Field label="Numele tău"><input className={inputCls} value={s.numeleTau || ''} onChange={e => onUpdateSettings({ numeleTau: e.target.value })} placeholder="Cum te prezinți elevilor" /></Field>
          <Field label="Școala"><input className={inputCls} value={s.numeScoala || ''} onChange={e => onUpdateSettings({ numeScoala: e.target.value })} placeholder="Ex: Auto Pontus" /></Field>
          <Field label="Mesajul de bun venit">
            <textarea rows={6} className={inputCls} value={s.textBunVenit || BUN_VENIT_IMPLICIT} onChange={e => onUpdateSettings({ textBunVenit: e.target.value })} />
          </Field>
          <p className="text-xs text-slate-400 -mt-2 mb-2">
            Se completează singure: <span className="font-mono-time">{'{salut}'}</span>, <span className="font-mono-time">{'{prenume}'}</span>, <span className="font-mono-time">{'{eu}'}</span>, <span className="font-mono-time">{'{scoala}'}</span>, <span className="font-mono-time">{'{disponibil}'}</span>.
          </p>
          <button onClick={() => onUpdateSettings({ textBunVenit: BUN_VENIT_IMPLICIT })}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm">Revino la textul implicit</button>
        </>
      );
    }

    if (grup === 'locatii') {
      return (
        <>
          <div className="space-y-1.5 mb-3">
            {(s.locations || []).map(l => (
              <div key={l.id} className="flex items-center gap-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200">
                <button onClick={() => { setLocDraft({ id: l.id, name: l.name, lat: l.lat, lng: l.lng }); setGps(''); }} className="text-left flex-1 min-w-0">
                  <span className="block text-sm text-slate-800 truncate">{l.name}</span>
                  <span className="block text-xs" style={{ color: areCoord(l) ? 'var(--ok)' : 'var(--muted-2)' }}>
                    {areCoord(l) ? 'punct salvat pe hartă' : 'fără punct pe hartă'}
                  </span>
                </button>
                <a href={hartaHref(l, l.name, 'dir')} target="_blank" rel="noopener noreferrer" aria-label="Deschide în hărți"
                  style={{ touchAction: 'manipulation' }} className="p-2 shrink-0"><MapPin size={15} style={{ color: 'var(--accent-ink)' }} /></a>
                <button onClick={() => onUpdateLocations((s.locations || []).filter(x => x.id !== l.id))} className="p-1.5 text-slate-400 shrink-0"><Trash2 size={15} /></button>
              </div>
            ))}
            {(s.locations || []).length === 0 && !locDraft && (
              <div className="text-xs text-slate-400 py-1">Adaugă punctele de întâlnire folosite des — vor apărea ca opțiuni rapide la programare.</div>
            )}
          </div>
          {locDraft ? (
            <div className="bg-slate-50 rounded-xl p-3.5">
              <input className={`${inputCls} mb-2`} placeholder="Ex: Piața Gării, la fântână" value={locDraft.name} onChange={e => setLocDraft({ ...locDraft, name: e.target.value })} />
              <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 mb-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 min-w-0">
                    {areCoord(locDraft)
                      ? <span className="font-mono-time" style={{ color: 'var(--ok)' }}>{locDraft.lat}, {locDraft.lng}</span>
                      : 'Fără punct pe hartă — harta va căuta după nume.'}
                  </span>
                  {areCoord(locDraft) && (
                    <button onClick={() => setLocDraft({ ...locDraft, lat: null, lng: null })} className="text-xs text-slate-400 shrink-0">Șterge</button>
                  )}
                </div>
                <button onClick={prindeLocul} disabled={gps === 'caut'}
                  className="w-full mt-2 py-2.5 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-1.5 disabled:opacity-50"
                  style={{ background: 'var(--invert)' }}>
                  <MapPin size={14} />{gps === 'caut' ? 'Caut punctul…' : 'Ia punctul de unde sunt acum'}
                </button>
                {gps === 'refuzat' && <p className="text-xs mt-1.5" style={{ color: 'var(--bad)' }}>Telefonul nu a dat voie la locație.</p>}
                {gps === 'eroare' && <p className="text-xs mt-1.5" style={{ color: 'var(--bad)' }}>Nu am prins semnalul. Încearcă afară, sub cer liber.</p>}
                <input className={`${inputCls} mt-2`} placeholder="sau lipește un link de hartă / coordonate"
                  onChange={e => { const c = extrageCoord(e.target.value); if (c) { setLocDraft({ ...locDraft, ...c }); e.target.value = ''; setGps(''); } }} />
                <p className="text-xs text-slate-400 mt-1.5">
                  Cel mai exact e să iei punctul chiar de la fața locului. Linkurile scurte (maps.app.goo.gl) nu merg — deschide-l întâi în hartă și copiază adresa lungă.
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setLocDraft(null); setGps(''); }} className="flex-1 py-2 rounded-lg border border-slate-200 text-sm text-slate-600">Renunță</button>
                <button onClick={saveLocation} className="flex-1 py-2 rounded-lg bg-slate-900 text-white text-sm">Salvează</button>
              </div>
            </div>
          ) : (
            <button onClick={() => { setLocDraft({ name: '' }); setGps(''); }}
              className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm flex items-center justify-center gap-1.5">
              <MapPin size={14} />Locație nouă
            </button>
          )}
        </>
      );
    }

    if (grup === 'amintiri') {
      return (
        <>
          <p className="text-xs text-slate-400 mb-3">
            Aplicația nu poate suna singură cât timp e închisă — asta o face doar calendarul telefonului. Îi predăm lui ședințele viitoare, cu amintirile bifate mai jos.
          </p>
          {[['amSeara', 'Seara dinainte, la 20:00', 'Ai ședințe programate mâine.'],
            ['amDimineata', 'Dimineața, la 7:00', 'Ce ai de făcut azi.'],
            ['amDouaOre', 'Cu 2 ore înainte', 'Cât să ai timp de drum.']].map(([cheie, titlu, sub]) => {
            const pornit = s[cheie] !== false;
            return (
              <button key={cheie} onClick={() => onUpdateSettings({ [cheie]: !pornit })}
                className="w-full flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 mb-2 text-left"
                style={pornit ? { borderColor: 'var(--accent-line)', background: 'var(--accent-soft)' } : { borderColor: 'var(--line)', background: 'var(--surface)' }}>
                <span className="flex items-center justify-center rounded-md shrink-0"
                  style={{
                    width: 18, height: 18, border: `1.5px solid ${pornit ? 'var(--accent)' : 'var(--line-2)'}`,
                    background: pornit ? 'var(--accent)' : 'transparent', color: '#3a2100', fontSize: 12, fontWeight: 900, lineHeight: 1,
                  }}>{pornit ? '✓' : ''}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-slate-800">{titlu}</span>
                  <span className="block text-xs text-slate-400">{sub}</span>
                </span>
              </button>
            );
          })}
          <button onClick={onTrimiteCalendar}
            className="w-full py-3 mt-2 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2"
            style={{ background: 'var(--invert)' }}>
            <CalendarDays size={15} />Trimite ședințele în calendar
          </button>
          <p className="text-xs text-slate-400 mt-2">
            Se deschide fereastra de partajare — alege aplicația de calendar. Ședințele deja trimise se actualizează, nu se dublează.
          </p>
        </>
      );
    }

    if (grup === 'backup') {
      return (
        <div className="space-y-2.5">
          <p className="text-xs text-slate-400">
            Datele stau doar în telefonul tău. Backup-ul e singurul lucru care te salvează dacă schimbi telefonul sau ștergi aplicația.
          </p>
          <button onClick={onExport} className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-2">
            <Download size={15} />Descarcă backup (JSON)
          </button>
          <button onClick={onTrimiteBackup} className="w-full py-3 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2" style={{ background: 'var(--invert)' }}>
            <Send size={15} />Trimite fișierul (e-mail, Drive)
          </button>
          <p className="text-xs text-slate-400 -mt-1">
            Se deschide fereastra de partajare a telefonului, cu backup-ul atașat ca fișier. De acolo alegi Gmail, Google Drive sau Fișiere.
          </p>
          <div className="border-t border-slate-100 pt-3 space-y-2.5">
            <input ref={fileRef} type="file" accept=".json,application/json" onChange={onFileChosen} className="hidden" />
            <button onClick={() => fileRef.current && fileRef.current.click()} className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium flex items-center justify-center gap-2">
              <Upload size={15} />Importă backup (JSON)
            </button>
            <button onClick={() => { setPasteMode(!pasteMode); setImportErr(''); }} className="w-full text-center text-xs text-slate-400 py-1">sau lipește textul backup-ului</button>
            {pasteMode && (
              <div>
                <textarea rows={4} className={inputCls} placeholder="Lipește aici conținutul fișierului de backup" value={pasteText} onChange={e => setPasteText(e.target.value)} />
                <button onClick={() => proceseazaImport(pasteText)} className="w-full py-2.5 mt-2 rounded-xl bg-slate-900 text-white text-sm font-medium">Importă textul</button>
              </div>
            )}
            {importErr && <p className="text-xs text-center" style={{ color: 'var(--bad)' }}>{importErr}</p>}
            <button onClick={() => setConfirmReset(true)} className="w-full py-3 rounded-xl border border-red-200 text-red-500 text-sm font-medium">Șterge toate datele</button>
          </div>
        </div>
      );
    }

    if (grup === 'acces') {
      return (
        <>
          <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 mb-2.5">
            <div className="text-sm text-slate-800">{(licenta && licenta.nume) || 'Cod de acces'}</div>
            <div className="font-mono-time text-xs text-slate-400 mt-0.5">{licenta ? formatCod(licenta.cod) : '—'}</div>
            <button onClick={async () => { try { await navigator.clipboard.writeText(idDispozitiv()); setCopiatId(true); setTimeout(() => setCopiatId(false), 2000); } catch (e) { /* fără clipboard */ } }}
              className="font-mono-time text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              <Copy size={11} />{copiatId ? 'Copiat ✓' : `Codul telefonului: ${idDispozitiv()}`}
            </button>
            <div className="text-xs mt-1" style={{ color: stLic && stLic.blocat ? 'var(--bad)' : 'var(--ok)' }}>
              {licenta && licenta.rol === 'proprietar'
                ? 'Acces permanent · toate drepturile'
                : stLic && stLic.blocat
                  ? stLic.motiv
                  : `Licență ${stLic && stLic.tipNume ? stLic.tipNume : 'completă'} · valabilă până la ${stLic && stLic.pana ? fmtHuman(stLic.pana) : '—'}`}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={onVerificaLicenta} disabled={licOcupat} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm disabled:opacity-50">
              {licOcupat ? 'Se verifică…' : 'Verifică din nou'}
            </button>
            <button onClick={onSchimbaCod} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm">Schimbă codul</button>
          </div>
        </>
      );
    }

    if (grup === 'ajutor') return <SupportBox data={data} />;

    if (grup === 'despre') {
      return (
        <>
          <div className="flex gap-2 mb-4">
            <button onClick={() => { setGrup(null); onDespre(); }} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm">Ce face aplicația</button>
            <button onClick={() => { setGrup(null); onNoutati(); }} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm">Ce e nou</button>
          </div>
          <div className="mt-4 text-center">
            <div className="text-xs font-semibold text-slate-500">{BRAND.mark}™ · {BRAND.expansion}</div>
            <div className="text-xs text-slate-400 mt-0.5">© {new Date().getFullYear()} {BRAND.owner} · Toate drepturile rezervate.</div>
            <div className="font-display text-base font-semibold text-slate-600 uppercase tracking-wide mt-2">{VERSION_LABEL}</div>
            <div className="text-xs text-slate-400">major · funcțional · design</div>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="pb-6">
      <div className="px-4 pt-4 pb-1">
        <h1 className="font-display text-xl font-semibold text-slate-900 uppercase tracking-wide">Setări</h1>
      </div>

      <div className="px-4 mt-3 space-y-1.5">
        {grupuri.map(g => {
          const Icon = g.Icon;
          return (
            <button key={g.id} onClick={() => (g.direct ? g.direct() : setGrup(g.id))}
              className="w-full flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3.5 py-3 text-left active:bg-slate-50">
              <Icon size={17} className="text-slate-400 shrink-0" />
              <span className="text-sm text-slate-800 flex-1 min-w-0 truncate">{g.nume}</span>
              {g.rezumat ? <span className="text-xs text-slate-400 shrink-0 truncate" style={{ maxWidth: '45%' }}>{g.rezumat}</span> : null}
              <ChevronRight size={16} className="text-slate-300 shrink-0" />
            </button>
          );
        })}
      </div>

      <p className="px-4 mt-4 text-xs text-slate-400 text-center">{BRAND.mark}™ · {VERSION_LABEL}</p>

      <BottomSheet open={!!grup} onClose={() => { setGrup(null); setLocDraft(null); }} title={titluGrup} layer={LAYER.form}>
        {continutGrup()}
      </BottomSheet>

      <ConfirmDialog open={!!pendingStudent} title="Adaugi elevul primit?"
        message={pendingStudent ? `${(pendingStudent.student || {}).name || 'Elev'} · ${(pendingStudent.sessions || []).length} ședințe. Se adaugă la evidența ta, fără să șteargă nimic.` : ''}
        confirmLabel="Adaugă"
        onConfirm={() => { onImportStudent(pendingStudent); setPendingStudent(null); setPasteMode(false); setPasteText(''); setGrup(null); }}
        onCancel={() => setPendingStudent(null)} />

      <ConfirmDialog open={confirmReset} title="Ștergi toate datele?"
        message="Se vor șterge toți elevii, toate ședințele și setările. Descarcă mai întâi un backup dacă vrei să păstrezi datele."
        confirmLabel="Șterge tot" danger
        onConfirm={() => { setConfirmReset(false); setGrup(null); onResetAll(); }}
        onCancel={() => setConfirmReset(false)} />

      <ConfirmDialog open={!!pendingImport} title="Imporți backup-ul?"
        message={pendingImport ? `Datele curente vor fi înlocuite cu: ${pendingImport.students.length} elevi, ${pendingImport.sessions.length} ședințe.` : ''}
        confirmLabel="Importă"
        onConfirm={() => { onImport(pendingImport); setPendingImport(null); setPasteMode(false); setPasteText(''); setGrup(null); }}
        onCancel={() => setPendingImport(null)} />
    </div>
  );
}

/* ---------------------- PREZENTARE ȘI NOUTĂȚI ---------------------------- */

function DespreView({ open, onClose }) {
  if (!open) return null;
  const capitole = [
    { t: 'Calendar', d: 'Programezi ședințe pe zile și ore, cu avertisment când ceva se suprapune. Traseul zilei se deschide într-un singur link.' },
    { t: 'Elevi', d: 'Fișa fiecăruia: ore, plăți, examene, notițe. Îl cauți după nume, grupă sau telefon.' },
    { t: 'Plan', d: 'Umple săptămânile singur, după examene, disponibilitate și ture. Îl vezi înainte să-l aplici.' },
    { t: 'Finanțe', d: 'Ce ai încasat, ce mai ai de recuperat, cât ai dus la școală și cât iese salariul.' },
    { t: 'Mesaje', d: 'Mesajele către elevi sunt gata scrise, cu locul și harta, și pleacă pe WhatsApp sau SMS.' },
    { t: 'Datele tale', d: 'Totul stă în telefonul tău. Nimic nu pleacă pe vreun server. Backup-ul e al tău.' },
  ];
  return (
    <BottomSheet open={open} onClose={onClose} title={`Ce face ${BRAND.mark}`} layer={LAYER.dialog}>
      <p className="text-sm text-slate-600 mb-4">{BRAND.tagline}</p>
      <div className="space-y-2.5">
        {capitole.map(c => (
          <div key={c.t} className="rounded-xl bg-white border border-slate-200 px-3.5 py-3">
            <div className="text-sm font-medium text-slate-900">{c.t}</div>
            <div className="text-xs text-slate-500 mt-0.5">{c.d}</div>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="w-full py-2.5 mt-4 rounded-xl border border-slate-200 text-slate-600 text-sm">Închide</button>
    </BottomSheet>
  );
}

function NoutatiView({ open, onClose }) {
  if (!open) return null;
  return (
    <BottomSheet open={open} onClose={onClose} title="Ce e nou" layer={LAYER.dialog}>
      <div className="space-y-3">
        {CHANGELOG.map(c => (
          <div key={c.v} className="rounded-xl bg-white border border-slate-200 px-3.5 py-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono-time text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)', border: '1px solid var(--accent-line)' }}>
                {c.v}
              </span>
              <span className="text-sm font-medium text-slate-900">{c.titlu}</span>
            </div>
            <ul className="space-y-1">
              {c.puncte.map((p, i) => (
                <li key={i} className="text-xs text-slate-500 flex gap-1.5">
                  <span style={{ color: 'var(--accent)' }}>•</span><span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="w-full py-2.5 mt-4 rounded-xl border border-slate-200 text-slate-600 text-sm">Închide</button>
    </BottomSheet>
  );
}

/* ==================== 7. APLICAȚIA ====================================== */

const TABS = [
  { id: 'home', label: 'Acasă', icon: Home },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, drept: 'calendar' },
  { id: 'students', label: 'Elevi', icon: Users, drept: 'elevi' },
  { id: 'planner', label: 'Plan', icon: WandSparkles, drept: 'plan' },
  { id: 'finance', label: 'Finanțe', icon: Wallet, drept: 'finante' },
  { id: 'settings', label: 'Setări', icon: Settings },
];

/* Fișierele se trimit prin fereastra de partajare a telefonului, cu fișier
   atașat. Dacă telefonul nu știe să atașeze fișiere, cade pe descărcare —
   niciodată pe „nu merge". */
async function trimiteFisier(nume, continut, tip) {
  const blob = new Blob([continut], { type: tip });
  try {
    const f = new File([blob], nume, { type: tip });
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      await navigator.share({ files: [f], title: nume });
      return 'trimis';
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return 'anulat';
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = nume;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'descarcat';
}

/* Ședințele viitoare, împachetate pentru calendarul telefonului. Fiecare are un
   identificator stabil, ca la a doua trimitere să se actualizeze, nu să se
   dubleze. */
function fisierCalendar(data) {
  const p2 = (n) => String(n).padStart(2, '0');
  const stamp = (d) => `${d.getUTCFullYear()}${p2(d.getUTCMonth() + 1)}${p2(d.getUTCDate())}T${p2(d.getUTCHours())}${p2(d.getUTCMinutes())}00Z`;
  const local = (iso, min) => {
    const d = fromISO(iso);
    d.setHours(Math.floor(min / 60), min % 60, 0, 0);
    return d;
  };
  const esc = (t) => String(t || '').replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
  const s = data.settings;
  const alarme = [];
  if (s.amSeara !== false) alarme.push({ trig: '-P1DT4H', txt: 'Ședințe mâine' });
  if (s.amDimineata !== false) alarme.push({ trig: '-PT1H', txt: 'Ședință în curând' });
  if (s.amDouaOre !== false) alarme.push({ trig: '-PT2H', txt: 'Ședință peste 2 ore' });

  const viitoare = data.sessions
    .filter(x => x.date >= todayISO() && x.status !== 'cancelled')
    .sort((a, b) => (a.date + a.startMin).localeCompare(b.date + b.startMin));

  const linii = ['BEGIN:VCALENDAR', 'VERSION:2.0', `PRODID:-//${BRAND.mark}//RO`, 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
  viitoare.forEach(x => {
    const el = data.students.find(y => y.id === x.studentId);
    const inc = local(x.date, x.startMin);
    const sf = local(x.date, x.startMin + durataSed(x, s));
    linii.push('BEGIN:VEVENT');
    linii.push(`UID:${x.id}@ias-auto`);
    linii.push(`DTSTAMP:${stamp(new Date())}`);
    linii.push(`DTSTART:${stamp(inc)}`);
    linii.push(`DTEND:${stamp(sf)}`);
    linii.push(`SUMMARY:${esc(`${el ? el.name : 'Elev'} · conducere`)}`);
    if (x.location) linii.push(`LOCATION:${esc(x.location)}`);
    if (x.notes) linii.push(`DESCRIPTION:${esc(x.notes)}`);
    alarme.forEach(a => {
      linii.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(a.txt)}`, `TRIGGER:${a.trig}`, 'END:VALARM');
    });
    linii.push('END:VEVENT');
  });
  linii.push('END:VCALENDAR');
  return linii.join('\r\n');
}

export default function App() {
  const [data, setData] = useState(loadData);
  const [tab, setTab] = useState('home');
  const [toast, setToast] = useState(null);

  const [sessionModal, setSessionModal] = useState({ open: false, mode: 'create', initial: null });
  const [studentModal, setStudentModal] = useState({ open: false, mode: 'create', initial: null });
  const [profileId, setProfileId] = useState(null);
  const [notify, setNotify] = useState(null);
  const [payEdit, setPayEdit] = useState(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [licenteOpen, setLicenteOpen] = useState(false);
  const [despreOpen, setDespreOpen] = useState(false);
  const [noutatiOpen, setNoutatiOpen] = useState(false);

  const [licenta, setLicenta] = useState(citesteLicenta);
  const [licOcupat, setLicOcupat] = useState(false);
  const [licEroare, setLicEroare] = useState('');

  const showToast = useCallback((msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2600);
  }, []);

  // Orice modificare trece pe aici: se salvează imediat, ca nimic să nu se piardă
  // dacă telefonul închide aplicația.
  const update = useCallback((fn) => {
    setData(prev => {
      const next = fn(prev);
      saveData(next);
      return next;
    });
  }, []);

  const stLic = useMemo(() => stareLicenta(licenta), [licenta]);
  const blocat = !!(stLic && stLic.blocat);

  // Modificările se opresc când accesul e blocat, dar restul rămâne la vedere.
  const paznic = useCallback((fn) => (...args) => {
    if (blocat) { showToast('Accesul a expirat. Nu poți face modificări.', 'error'); return; }
    fn(...args);
  }, [blocat, showToast]);

  /* ---- tema ---- */
  const [skin, setSkin] = useState('light');
  useEffect(() => {
    const ales = data.settings.theme || 'system';
    if (ales !== 'system') { setSkin(ales); return undefined; }
    // Browserele vechi n-au matchMedia; atunci rămânem pe tema luminoasă în loc
    // să oprim aplicația.
    if (typeof window.matchMedia !== 'function') { setSkin('light'); return undefined; }
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const aplica = () => setSkin(mq.matches ? 'dark' : 'light');
    aplica();
    if (mq.addEventListener) mq.addEventListener('change', aplica);
    else if (mq.addListener) mq.addListener(aplica);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', aplica);
      else if (mq.removeListener) mq.removeListener(aplica);
    };
  }, [data.settings.theme]);

  /* ---- licența: la pornire și când revii în aplicație ---- */
  const verifica = useCallback(async (cod) => {
    setLicOcupat(true);
    const r = await verificaCod(cod);
    setLicOcupat(false);
    if (r.stare === 'offline') {
      // Fără internet păstrăm ce știam; verificarea se reia mai târziu.
      const vechi = citesteLicenta();
      if (vechi && normCod(vechi.cod) === normCod(cod)) return vechi;
      return null;
    }
    const l = { ...r, cod: normCod(cod) };
    scrieLicenta(l);
    setLicenta(l);
    return l;
  }, []);

  useEffect(() => {
    // Codul poate veni și din linkul trimis de proprietar.
    const din = new URLSearchParams(window.location.search).get('cod');
    if (din && !citesteLicenta()) {
      verifica(din).then(l => {
        if (l) window.history.replaceState({}, '', window.location.pathname);
      });
      return;
    }
    const l = citesteLicenta();
    if (l && l.cod) verifica(l.cod);
  }, [verifica]);

  useEffect(() => {
    const laRevenire = () => {
      if (document.hidden) return;
      const l = citesteLicenta();
      if (l && l.cod && l.verificatLa !== todayISO()) verifica(l.cod);
    };
    document.addEventListener('visibilitychange', laRevenire);
    return () => document.removeEventListener('visibilitychange', laRevenire);
  }, [verifica]);

  /* ---- ședințe ---- */
  function saveSession(form, mode, editing) {
    const durata = durataDin(data.settings);
    if (mode === 'edit') {
      const prev = editing;
      update(p => ({
        ...p,
        sessions: p.sessions.map(s => (s.id === editing.id ? { ...s, ...form, duration: s.duration || durata } : s)),
      }));
      const el = data.students.find(s => s.id === form.studentId);
      const mutata = prev.date !== form.date || prev.startMin !== form.startMin;
      const anulata = prev.status !== 'cancelled' && form.status === 'cancelled';
      const altLoc = !mutata && !anulata && (prev.location || '') !== (form.location || '');
      if (el && el.phone) {
        if (anulata) setNotify({ name: el.name, phone: el.phone, title: 'Anunți elevul de anulare?', message: buildSessionMessage('cancelled', el, form, prev, data.settings) });
        else if (mutata) setNotify({ name: el.name, phone: el.phone, title: 'Anunți elevul de reprogramare?', message: buildSessionMessage('rescheduled', el, form, prev, data.settings) });
        else if (altLoc) setNotify({ name: el.name, phone: el.phone, title: 'Anunți elevul de schimbarea locului?', message: buildSessionMessage('location', el, form, prev, data.settings) });
      }
      showToast('Ședință actualizată.');
    } else {
      const noua = { id: genId('ses'), ...form, duration: durata, createdAt: nowISO() };
      update(p => ({ ...p, sessions: [...p.sessions, noua] }));
      const el = data.students.find(s => s.id === form.studentId);
      if (el && el.phone) {
        setNotify({ name: el.name, phone: el.phone, title: 'Anunți elevul?', message: buildSessionMessage('created', el, noua, null, data.settings) });
      }
      showToast('Ședință adăugată.');
    }
    setSessionModal({ open: false, mode: 'create', initial: null });
  }

  function deleteSession(id) {
    update(p => ({ ...p, sessions: p.sessions.filter(s => s.id !== id) }));
    setSessionModal({ open: false, mode: 'create', initial: null });
    showToast('Ședință ștearsă.');
  }

  function trimiteConfirmare(form) {
    const el = data.students.find(s => s.id === form.studentId);
    if (!el || !el.phone) { showToast('Elevul n-are număr de telefon.', 'error'); return; }
    setNotify({ name: el.name, phone: el.phone, title: 'Trimite confirmarea', message: buildSessionMessage('created', el, form, null, data.settings) });
  }

  function applyPlan(propuneri) {
    const durata = durataDin(data.settings);
    update(p => ({
      ...p,
      sessions: [...p.sessions, ...propuneri.map(x => {
        const el = p.students.find(s => s.id === x.studentId);
        return {
          id: genId('ses'), studentId: x.studentId, date: x.date, startMin: x.startMin,
          duration: durata, type: el ? suggestType(el, p.sessions) : 'included',
          status: 'pending', auto: true, notes: '',
          location: (el && el.defaultLocation) || '', english: !!(el && el.english),
          createdAt: nowISO(),
        };
      })],
    }));
    setTab('calendar');
    showToast(`${propuneri.length} ședințe adăugate. Confirmă-le cu elevii.`);
  }

  // Curăță ce a rămas neconfirmat din planurile aplicate.
  function stergePropuneri() {
    const azi = todayISO();
    let cate = 0;
    update(p => {
      const ramase = p.sessions.filter(x => !(x.auto && x.status === 'pending' && x.date >= azi));
      cate = p.sessions.length - ramase.length;
      return { ...p, sessions: ramase };
    });
    setTimeout(() => showToast(cate ? `${cate} propuneri șterse.` : 'N-a rămas nimic de șters.'), 0);
  }

  /* ---- elevi ---- */

  /* Pachetul de școlarizare ales pe fișă: adaugă orele, trece taxa la datorie și,
     dacă e achitat direct școlii, scrie și plata — ca datoria să iasă zero. */
  function aplicaPachet(el, feeId, settings) {
    const fee = feeTypesOf(settings).find(f => f.id === feeId);
    if (!fee) return el;
    const ore = Number(fee.hours) || 0;
    const camp = oreTipul(fee) === 'included' ? 'includedHours' : 'extraHours';
    const cu = {
      ...el,
      fees: { ...(el.fees || {}), [feeId]: (Number((el.fees || {})[feeId]) || 0) + 1 },
      [camp]: (Number(el[camp]) || 0) + ore,
    };
    if (fee.laScoala) {
      cu.payments = [...(el.payments || []),
        { id: genId('pay'), date: todayISO(), amount: Number(fee.price) || 0, collector: 'school' }];
    }
    return cu;
  }

  function saveStudent(form, mode, initial) {
    const pachetNou = form.pachet && form.pachet !== (initial && initial.pachet);
    if (mode === 'edit') {
      update(p => ({
        ...p,
        students: p.students.map(s => {
          if (s.id !== initial.id) return s;
          const cu = { ...s, ...form };
          return pachetNou ? aplicaPachet(cu, form.pachet, p.settings) : cu;
        }),
      }));
      showToast('Elev actualizat.');
    } else {
      update(p => {
        let el = { id: genId('stu'), ...form, payments: [], createdAt: nowISO() };
        if (form.pachet) el = aplicaPachet(el, form.pachet, p.settings);
        return { ...p, students: [...p.students, el] };
      });
      showToast('Elev adăugat.');
    }
    setStudentModal({ open: false, mode: 'create', initial: null });
  }

  function deleteStudent(id) {
    update(p => ({ ...p, students: p.students.filter(s => s.id !== id), sessions: p.sessions.filter(s => s.studentId !== id) }));
    setStudentModal({ open: false, mode: 'create', initial: null });
    setProfileId(null);
    showToast('Elev șters.');
  }

  const setStudent = (id, patch) => update(p => ({
    ...p, students: p.students.map(s => (s.id === id ? { ...s, ...(typeof patch === 'function' ? patch(s) : patch) } : s)),
  }));

  function addPayment(id, suma, colector, data2) {
    setStudent(id, s => ({ ...s, payments: [...(s.payments || []), { id: genId('pay'), date: data2 || todayISO(), amount: suma, collector: colector }] }));
    showToast('Plată adăugată.');
  }
  function savePayment(studentId, plata) {
    setStudent(studentId, s => ({ ...s, payments: (s.payments || []).map(p => (p.id === plata.id ? plata : p)) }));
    setPayEdit(null);
    showToast('Plată actualizată.');
  }
  function deletePayment(studentId, platăId) {
    setStudent(studentId, s => ({ ...s, payments: (s.payments || []).filter(p => p.id !== platăId) }));
    setPayEdit(null);
    showToast('Plată ștearsă.');
  }

  /* Examenul picat îl trimite singur în așteptare: două săptămâni, apoi adeverință.
     Așa nu-l mai programezi din greșeală în perioada în care oricum n-are voie. */
  function recordExam(id, rezultat) {
    // Fiecare rezultat notat adaugă o susținere la contor — de acolo se scot
    // procentele de pe Acasă.
    setStudent(id, s => {
      const sust = (Number(s.examAttempts) || 0) + 1;
      return rezultat === 'respins'
        ? { ...s, examResult: 'respins', examAttempts: sust, asteptare: true, asteptareDin: todayISO(), adeverintaDin: '' }
        : { ...s, examResult: 'promovat', examAttempts: sust, asteptare: false };
    });
    showToast(rezultat === 'promovat' ? 'Felicitări! Elev promovat.' : 'Marcat respins. Intră în așteptare.');
  }
  function elibereazaAdeverinta(id) {
    setStudent(id, { asteptare: false, adeverintaDin: todayISO() });
    showToast('Adeverință eliberată. Poate fi programat din nou.');
  }
  function marcheazaBunVenit(id) { setStudent(id, { bunVenitTrimis: todayISO() }); }

  /* ---- transferul unui elev către alt instructor ---- */
  async function exportStudent(st) {
    const pachet = {
      kind: STUDENT_FILE_KIND, version: SCHEMA_VERSION, exportedAt: nowISO(),
      student: st, sessions: data.sessions.filter(s => s.studentId === st.id),
    };
    const r = await trimiteFisier(`${BRAND.mark}-${stripDia(st.name).slice(0, 12)}.json`, JSON.stringify(pachet, null, 2), 'application/json');
    showToast(r === 'descarcat' ? 'Fișier descărcat.' : r === 'anulat' ? 'Trimitere anulată.' : 'Trimis.');
  }
  function importStudent(pachet) {
    const st = pachet.student || {};
    const idNou = genId('stu');
    update(p => ({
      ...p,
      students: [...p.students, { ...st, id: idNou, transferatDe: pachet.exportedAt || nowISO() }],
      sessions: [...p.sessions, ...(pachet.sessions || []).map(s => ({ ...s, id: genId('ses'), studentId: idNou }))],
    }));
    showToast('Elev adăugat din transfer.');
  }

  /* ---- backup ---- */
  function noteazaBackup() {
    try { window.localStorage.setItem(BACKUP_KEY, todayISO()); } catch (e) { /* memoria e blocată */ }
  }
  const numeBackup = () => `${BRAND.mark}-backup-${todayISO()}.json`;

  async function exportData() {
    const r = await trimiteFisier(numeBackup(), JSON.stringify(data, null, 2), 'application/json');
    if (r !== 'anulat') noteazaBackup();
    showToast(r === 'descarcat' ? 'Backup descărcat.' : r === 'anulat' ? 'Anulat.' : 'Backup trimis.');
  }
  async function trimiteBackup() {
    const r = await trimiteFisier(numeBackup(), JSON.stringify(data, null, 2), 'application/json');
    if (r !== 'anulat') noteazaBackup();
    showToast(r === 'descarcat' ? 'Telefonul nu a putut atașa fișierul, așa că l-am descărcat.' : r === 'anulat' ? 'Anulat.' : 'Backup trimis.');
  }
  async function trimiteCalendar() {
    const viitoare = data.sessions.filter(x => x.date >= todayISO() && x.status !== 'cancelled');
    if (!viitoare.length) { showToast('Nu ai ședințe viitoare de trimis.', 'error'); return; }
    const r = await trimiteFisier(`${BRAND.mark}-sedinte.ics`, fisierCalendar(data), 'text/calendar');
    showToast(r === 'descarcat' ? 'Fișier descărcat — deschide-l ca să intre în calendar.' : r === 'anulat' ? 'Anulat.' : `${viitoare.length} ședințe trimise.`);
  }
  function importData(nou) {
    setData(nou); saveData(nou);
    showToast('Backup importat.');
  }
  function resetAll() {
    const gol = normalizeData(null);
    setData(gol); saveData(gol);
    setTab('home');
    showToast('Toate datele au fost șterse.');
  }

  /* ---- bara de taburi ---- */
  function incearcaTab(id) {
    if (cereInchiderea()) { showToast('Închide mai întâi fereastra deschisă.', 'error'); return; }
    setTab(id);
  }

  const student = data.students.find(s => s.id === profileId) || null;
  const deschideSesiune = (mode, initial) => {
    if (typeof mode === 'object') setSessionModal({ open: true, mode: 'edit', initial: mode });
    else setSessionModal({ open: true, mode, initial });
  };

  if (!licenta) {
    return (
      <div data-skin={skin}>
        <EstiluriGlobale />
        <CodeScreen eroare={licEroare} ocupat={licOcupat}
          onTrimite={async (cod) => {
            setLicEroare('');
            const l = await verifica(cod);
            if (!l) { setLicEroare('Nu am putut verifica codul. Ai internet?'); return; }
            if (l.stare === 'necunoscut') { setLicEroare('Codul nu e valabil. Verifică literele și cifrele.'); scrieLicenta(null); setLicenta(null); return; }
            if (l.stare === 'altDispozitiv') { setLicEroare('Codul e legat de alt telefon. Trimite-mi codul telefonului de mai jos.'); scrieLicenta(null); setLicenta(null); return; }
          }} />
        <Toast toast={toast} />
      </div>
    );
  }

  const filaBlocata = (t) => t.drept && !are(stLic, t.drept);

  return (
    <div data-skin={skin} className="min-h-screen bg-slate-50 pb-24" style={{ background: 'var(--bg)' }}>
      <EstiluriGlobale />

      {blocat && <LockBar st={stLic} cod={licenta.cod} ocupat={licOcupat} onVerifica={() => verifica(licenta.cod)} />}

      {tab === 'home' && (
        <DashboardTab data={data}
          vehicul={data.settings.vehicul || 'hatchback'} remorca={data.settings.remorca || ''}
          onOpenSession={deschideSesiune}
          onOpenStudent={(id) => setProfileId(id)}
          onAddStudent={paznic(() => setStudentModal({ open: true, mode: 'create', initial: null }))}
          onAddSession={paznic(() => deschideSesiune('create', null))}
          onGoToPlanner={() => setTab('planner')} />
      )}
      {tab === 'calendar' && (filaBlocata(TABS[1])
        ? <FilaBlocata titlu="Calendar" descriere="Programarea ședințelor face parte din licența completă." cod={licenta.cod} tipNume={stLic.tipNume} />
        : <CalendarTab data={data} onOpenSession={deschideSesiune} />)}
      {tab === 'students' && (filaBlocata(TABS[2])
        ? <FilaBlocata titlu="Elevi" descriere="Evidența elevilor face parte din licența completă." cod={licenta.cod} tipNume={stLic.tipNume} />
        : <StudentsTab data={data} onOpenStudent={(id) => setProfileId(id)}
          onAddStudent={paznic(() => setStudentModal({ open: true, mode: 'create', initial: null }))}
          onOpenReport={() => setReportOpen(true)} />)}
      {tab === 'planner' && (filaBlocata(TABS[3])
        ? <FilaBlocata titlu="Plan" descriere="Planificatorul îți umple săptămânile singur. Face parte din licența completă." cod={licenta.cod} tipNume={stLic.tipNume} />
        : <PlannerTab data={data}
          onUpdateStudentLimit={paznic((id, n) => setStudent(id, { weeklyLimit: n }))}
          onApplyPlan={paznic(applyPlan)}
          onStergePropuneri={paznic(stergePropuneri)} />)}
      {tab === 'finance' && (filaBlocata(TABS[4])
        ? <FilaBlocata titlu="Finanțe" descriere="Evidența banilor și salariul fac parte din licența completă." cod={licenta.cod} tipNume={stLic.tipNume} />
        : <FinanceTab data={data}
          onUpdateSettings={paznic(patch => update(p => ({ ...p, settings: { ...p.settings, ...patch } })))}
          onUpdateRateTypes={paznic(lista => update(p => ({ ...p, settings: { ...p.settings, rateTypes: lista } })))}
          onUpdateEmployerSettings={paznic(emp => update(p => ({ ...p, settings: { ...p.settings, employer: { ...p.settings.employer, ...emp } } })))}
          onUpdateWorkingDaysOverride={paznic((luna2, val) => update(p => ({ ...p, settings: { ...p.settings, workingDaysOverrides: { ...p.settings.workingDaysOverrides, [luna2]: val } } })))}
          onEditPayment={(sid, p) => setPayEdit({ studentId: sid, payment: p })}
          onUpdateVarsaminte={paznic(lista => update(p => ({ ...p, varsaminte: lista })))} />)}
      {tab === 'settings' && (
        <SettingsTab data={data} skin={skin}
          onUpdateSettings={paznic(patch => update(p => ({ ...p, settings: { ...p.settings, ...patch } })))}
          onUpdateLocations={paznic(lista => update(p => ({ ...p, settings: { ...p.settings, locations: lista } })))}
          onExport={exportData} onTrimiteBackup={trimiteBackup} onTrimiteCalendar={trimiteCalendar}
          onImport={paznic(importData)} onImportStudent={paznic(importStudent)} onResetAll={paznic(resetAll)}
          licenta={licenta} stLic={stLic} licOcupat={licOcupat}
          onVerificaLicenta={() => verifica(licenta.cod)}
          onSchimbaCod={() => { scrieLicenta(null); setLicenta(null); setLicEroare(''); }}
          onDespre={() => setDespreOpen(true)} onNoutati={() => setNoutatiOpen(true)}
          onLicente={() => setLicenteOpen(true)} />
      )}

      {/* bara de taburi: stă deasupra ferestrelor, ca lumina ei să rămână la vedere */}
      <nav className="fixed bottom-0 left-0 right-0 flex bara-taburi" style={{ zIndex: LAYER.nav }}>
        <span className="glow-cadru" />
        {TABS.map(t => {
          const Icon = t.icon;
          const activ = tab === t.id;
          return (
            <button key={t.id} onClick={() => incearcaTab(t.id)} className="flex-1 flex flex-col items-center gap-1 py-1.5">
              <span className="flex items-center justify-center"
                style={{ width: 42, height: 24, borderRadius: 99, background: activ ? 'var(--accent-soft)' : 'transparent', transition: 'background .2s ease' }}>
                <Icon size={19} className={activ ? 'text-amber-600' : 'text-slate-400'} />
              </span>
              <span className={`text-xs font-medium ${activ ? 'text-amber-600' : 'text-slate-400'}`}>{t.label}</span>
            </button>
          );
        })}
      </nav>

      <SessionModal open={sessionModal.open} mode={sessionModal.mode} initial={sessionModal.initial} data={data}
        onClose={() => setSessionModal({ open: false, mode: 'create', initial: null })}
        onSave={paznic(saveSession)} onDelete={paznic(deleteSession)} onTrimiteConfirmare={trimiteConfirmare} />

      <StudentModal open={studentModal.open} mode={studentModal.mode} initial={studentModal.initial}
        settings={data.settings} sessions={data.sessions}
        onClose={() => setStudentModal({ open: false, mode: 'create', initial: null })}
        onSave={paznic(saveStudent)} onDelete={paznic(deleteStudent)} />

      <StudentProfile open={!!student} student={student} sessions={data.sessions} settings={data.settings}
        onClose={() => setProfileId(null)}
        onEdit={paznic(st => { setProfileId(null); setStudentModal({ open: true, mode: 'edit', initial: st }); })}
        onAddSession={paznic(st => { setProfileId(null); deschideSesiune('create', { studentId: st.id }); })}
        onOpenSession={(s) => { setProfileId(null); deschideSesiune(s); }}
        onNotify={setNotify}
        onAddPayment={paznic(addPayment)}
        onEditPayment={(sid, p) => setPayEdit({ studentId: sid, payment: p })}
        onSetFeeCount={paznic((id, feeId, n) => setStudent(id, s => ({ ...s, fees: { ...(s.fees || {}), [feeId]: n } })))}
        onRecordExam={paznic(recordExam)}
        onElibereazaAdeverinta={paznic(elibereazaAdeverinta)}
        onBunVenitTrimis={marcheazaBunVenit}
        onExportStudent={exportStudent}
        poateTransfera={are(stLic, 'transfer')} />

      <ReportView open={reportOpen} data={data} onClose={() => setReportOpen(false)} />
      <LicenteView open={licenteOpen} data={data} onClose={() => setLicenteOpen(false)}
        onSalveaza={paznic(lista => update(p => ({ ...p, licente: lista })))}
        onPublicat={paznic(continut => update(p => ({ ...p, settings: { ...p.settings, licentePublicat: continut } })))}
        showToast={showToast} />
      <DespreView open={despreOpen} onClose={() => setDespreOpen(false)} />
      <NoutatiView open={noutatiOpen} onClose={() => setNoutatiOpen(false)} />

      <NotifyDialog prompt={notify} onClose={() => setNotify(null)} />
      <PaymentEditDialog open={!!payEdit} payment={payEdit && payEdit.payment} currency={data.settings.currency}
        onClose={() => setPayEdit(null)}
        onSave={paznic(p => savePayment(payEdit.studentId, p))}
        onDelete={paznic(id => deletePayment(payEdit.studentId, id))} />

      <Toast toast={toast} />
    </div>
  );
}

/* ------------------------------ STILURILE -------------------------------- */
/* Culorile stau în variabile, iar tema le schimbă dintr-un loc. Așa nu trebuie
   scrisă fiecare componentă de două ori, pentru zi și pentru noapte. */

function EstiluriGlobale() {
  return (
    <style>{`
      :root {
        --bg: #f1f5f9;
        --surface: #ffffff;
        --surface-2: #f8fafc;
        --ink: #0f172a;
        --muted: #475569;
        --muted-2: #94a3b8;
        --line: #e2e8f0;
        --line-2: #cbd5e1;
        --invert: #0f172a;
        --accent: #f0900b;
        --accent-ink: #b45309;
        --accent-soft: #fff7ed;
        --accent-line: #fed7aa;
        --ok: #059669;
        --ok-soft: #ecfdf5;
        --ok-line: #a7f3d0;
        --bad: #dc2626;
        --bad-soft: #fef2f2;
        --bad-line: #fecaca;
        --glow: rgba(240,144,11,.30);
      }
      [data-skin="dark"] {
        --bg: #0b1220;
        --surface: #131c2e;
        --surface-2: #0f1829;
        --ink: #e2e8f0;
        --muted: #cbd5e1;
        --muted-2: #7c8da8;
        --line: #23304a;
        --line-2: #33425f;
        --invert: #1e293b;
        --accent: #e0a13a;
        --accent-ink: #f5c977;
        --accent-soft: rgba(224,161,58,.14);
        --accent-line: rgba(224,161,58,.34);
        --ok: #34d399;
        --ok-soft: rgba(52,211,153,.13);
        --ok-line: rgba(52,211,153,.32);
        --bad: #f87171;
        --bad-soft: rgba(248,113,113,.13);
        --bad-line: rgba(248,113,113,.32);
        --glow: rgba(224,161,58,.32);
      }

      body { background: var(--bg); }
      .font-display { font-family: 'Barlow Condensed', system-ui, sans-serif; }
      .font-mono-time { font-family: 'JetBrains Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; }

      /* Tailwind scrie culori fixe; le legăm de variabile, ca tema să le prindă. */
      [data-skin] .bg-white { background: var(--surface) !important; }
      [data-skin] .bg-slate-50 { background: var(--surface-2) !important; }
      [data-skin] .bg-slate-900 { background: var(--invert) !important; }
      [data-skin] .text-slate-900 { color: var(--ink) !important; }
      [data-skin] .text-slate-800 { color: var(--ink) !important; }
      [data-skin] .text-slate-700 { color: var(--muted) !important; }
      [data-skin] .text-slate-600 { color: var(--muted) !important; }
      [data-skin] .text-slate-500 { color: var(--muted-2) !important; }
      [data-skin] .text-slate-400 { color: var(--muted-2) !important; }
      [data-skin] .text-slate-300 { color: var(--line-2) !important; }
      [data-skin] .border-slate-200 { border-color: var(--line) !important; }
      [data-skin] .border-slate-300 { border-color: var(--line-2) !important; }
      [data-skin] .border-slate-100 { border-color: var(--line) !important; }
      [data-skin="dark"] .bg-slate-900 { color: var(--ink); }
      [data-skin="dark"] input, [data-skin="dark"] select, [data-skin="dark"] textarea {
        background: var(--surface) !important; color: var(--ink) !important; border-color: var(--line) !important;
      }
      [data-skin="dark"] .text-white { color: #f8fafc !important; }

      @keyframes slideUp { from { transform: translateY(14px); opacity: 0 } to { transform: none; opacity: 1 } }
      @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      .fade-anim { animation: fadeIn .16s ease-out; }
      .sheet-anim { animation: slideUp .22s ease-out; }

      /* Fereastra din față: halou chihlimbariu, cu loc dedesubt pentru bara de taburi. */
      .sheet-wrap { padding: 1rem; padding-bottom: calc(5.5rem + env(safe-area-inset-bottom)); }
      [data-skin] .sheet-anim {
        overflow: hidden;
        transition: box-shadow .16s ease;
        box-shadow: 0 0 0 1px var(--accent-line), 0 0 40px -4px var(--glow), 0 26px 70px rgba(0,0,0,.5);
      }
      /* Când apeși un tab cu fereastra deschisă: conturul devine roșu și „×"-ul
         pulsează. Nu atingem animația de deschidere, ca fereastra să nu pară că
         se închide și se redeschide. */
      .cere-inchidere .sheet-anim {
        box-shadow: 0 0 0 2px var(--bad), 0 0 52px -2px var(--bad), 0 26px 70px rgba(0,0,0,.5);
      }
      @keyframes iasPulsX { 0%, 100% { transform: scale(1) } 25%, 75% { transform: scale(1.35) } }
      .cere-inchidere .btn-inchide { animation: iasPulsX 1s ease; color: var(--bad) !important; }
      .cere-inchidere.raport-overlay { box-shadow: inset 0 0 0 3px var(--bad); }

      /* Fundalul se stinge cât timp e o fereastră deschisă. */
      body:has(.ecran-peste) [data-skin] > *:not(.ecran-peste):not(nav) { filter: brightness(.72); transition: filter .2s ease; }

      /* Bara stă lipită de marginea de jos. Poziția e scrisă aici, nu lăsată pe
         seama claselor utilitare: regula asta vine după ele în pagină și le-ar
         anula, iar bara ar porni la plimbare odată cu pagina. */
      .bara-taburi {
        position: fixed;
        left: 0; right: 0; bottom: 0;
        display: flex;
        background: var(--surface);
        border-top: 1px solid var(--line);
        padding-bottom: env(safe-area-inset-bottom);
      }
      /* Cadrul de lumină care urcă din bara de taburi. */
      .glow-cadru {
        position: absolute; left: 0; right: 0; bottom: 100%; height: 62vh;
        pointer-events: none;
        background:
          linear-gradient(to right, var(--glow), transparent 3%),
          linear-gradient(to left, var(--glow), transparent 3%);
        -webkit-mask-image: linear-gradient(to top, #000 40%, transparent 70%);
        mask-image: linear-gradient(to top, #000 40%, transparent 70%);
      }

      /* stelele de pe cerul de noapte din antet */
      .ias-star { position: absolute; border-radius: 99px; background: #fff; opacity: .85; animation: fadeIn 2s ease-in-out infinite alternate; }

      /* plasa de siguranță a antetului, când scena 3D nu poate porni */
      .ias-dash { position: absolute; left: 0; right: 0; bottom: 34%; height: 3px;
        background: repeating-linear-gradient(to right, #f5b324 0 26px, transparent 26px 52px);
        animation: iasDash .6s linear infinite; }
      @keyframes iasDash { to { transform: translateX(-52px) } }
      .ias-car { position: absolute; left: 50%; top: 46%; transform: translate(-50%,-50%); }

      /* La tipărire rămâne doar tabelul, pe A4, cu capul de tabel pe fiecare pagină. */
      @media print {
        @page { size: A4; margin: 12mm; }
        body { background: #fff !important; }
        body > *:not(.raport-overlay) { display: none !important; }
        .raport-overlay { position: static !important; background: #fff !important; }
        .raport-print { height: auto !important; overflow: visible !important; }
        .fara-print { display: none !important; }
        .doar-print { display: block !important; }
        .raport-tabel { width: 100%; border-collapse: collapse; font-size: 10pt; }
        .raport-tabel thead { display: table-header-group; }
        .raport-tabel tfoot { display: table-row-group; }
        .raport-tabel tr { break-inside: avoid; }
        .raport-tabel td, .raport-tabel th { border-bottom: 1px solid #cbd5e1 !important; color: #0f172a !important; }
      }
    `}</style>
  );
}
