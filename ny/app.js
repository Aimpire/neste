/* Aimpire neste – app.js (B-048). Ingen rammeverk, ingen bygg. Alt lagres lokalt under «neste.*».
   Lederen leses fra ?l= som i huben: kode = de siste 6 tegnene, raden i arket dekrypteres med PBKDF2-nøkkel av koden
   (samme regnestykke som huben og google/send-lenke.gs, B-033). Ingen råd, ingen løfter (B-030). */
(function(){
"use strict";
const $ = (s, r) => (r || document).querySelector(s);
/* #260: i urdu/arabisk (RTL) snudde latinske biter seg («30 pips» ble «pips 30», «50 → 53 = 3» leste baklengs).
   Hver sammenhengende latinsk/tall-bit isoleres som LTR (U+2066 … U+2069); plassholdere som {N} roeres ikke. */
const ISO_RE = /\{[^}]*\}|[A-Za-z0-9$±+−-][A-Za-z0-9$.,:/%×÷±+−\-→='’ ]*[A-Za-z0-9$%]|[A-Za-z0-9$]/g;
const iso = s => typeof s === "string" && document.documentElement.dir === "rtl" && /[A-Za-z0-9]/.test(s) && !/[\u2066\u2069]/.test(s) ? s.replace(ISO_RE, m => m[0] === "{" ? m : "\u2066" + m + "\u2069") : s;
const el = (t, cls, txt) => { const e = document.createElement(t); if(cls) e.className = cls; if(txt != null) e.textContent = iso(txt); return e; };
const LS = { get(k, d){ try{ const v = localStorage.getItem("neste." + k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } },
             set(k, v){ try{ localStorage.setItem("neste." + k, JSON.stringify(v)); }catch(e){} },
             clear(){ try{ Object.keys(localStorage).filter(k => k.indexOf("neste.") === 0).forEach(k => localStorage.removeItem(k)); }catch(e){} } };
const Q = new URLSearchParams(location.search);
let C = null, L = "ur_rm", T = null;           // innhold, språk, ui-tekster
/* #260: dato/klokke per språk; arabisk med latinske sifre, som tallene i leksjonene */
const LOK = () => ({ ur: "ur-PK", no: "nb-NO", hi: "hi-IN", ar: "ar-u-nu-latn" })[L] || "en-GB";
/* #259/#260: én mekanisme for retning – iso() over (fra sky, gjelder urdu og arabisk). Leksjonskallene bruker den via elx/bidiTekst. */
const bidiTekst = s => document.createTextNode(iso(String(s == null ? "" : s)));
const elx = (t, cls, txt) => el(t, cls, txt);
const ikon = (navn, cls) => { const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("class", "ik" + (cls ? " " + cls : "")); s.innerHTML = '<use href="#' + navn + '"/>'; return s; };
const UKER = () => ["uke1", "uke2", "uke3", "uke4"].filter(k => C[k] && C[k].length), ALLE = () => UKER().reduce((a, k) => a.concat(C[k]), []);
const ukeFerdig = n => { const f = frem(); return C[UKER()[n]].every(x => f[x.id] && f[x.id].riktig); }, ukeLaast = n => n > 0 && !ukeFerdig(n - 1);
const synlige = () => UKER().filter((k, n) => !ukeLaast(n)).reduce((a, k) => a.concat(C[k]), []);
const ukeAv = i => { let s = 0; const u = UKER(); for(let n = 0; n < u.length; n++){ if(i < s + C[u[n]].length) return n; s += C[u[n]].length; } return u.length - 1; };
const DAG = 864e5, INTERVALL = [1, 7, 30];     // repetisjon etter 1, 7 og 30 dager (Cepeda 2008)
const I_PAIRS = { EURUSD: { navn: "EUR/USD", pris: 1.0850, dec: 4, steg: 0.0001, perLot: 10 }, XAUUSD: { navn: "XAU/USD", pris: 4350.00, dec: 2, steg: 1, perLot: 100 } };

/* ---------- oppstart ---------- */
fetch("innhold.json", { cache: "no-cache" }).then(r => r.json()).then(j => { C = j; start(); }).catch(() => { document.body.innerHTML = "<p style='padding:24px'>Kunne ikke laste innholdet. Prøv igjen.</p>"; });

async function start(){
  sikreDag2Css();
  const settTema = t => {
    document.documentElement.setAttribute("data-theme", t);
    const m = document.querySelector('meta[name="theme-color"]');
    if(m) m.setAttribute("content", t === "light" ? "#F3F5F9" : "#070B14");
  };
  const tema = LS.get("tema", "dark"); settTema(tema);
  $("#tema").addEventListener("click", () => { const t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"; settTema(t); LS.set("tema", t); });
  /* #334: ?r= før språkport – client-only restore (A1. / A1z.) */
  /* #r= (ny, forlater aldri telefonen) eller ?r= (eldre lenker) */
  const hashR = (location.hash.match(/^#r=([A-Za-z0-9._%-]+)$/) || [])[1] || "";
  const rParam = Q.get("r") || (hashR ? decodeURIComponent(hashR) : "");
  if(rParam){
    try{
      await anvendGjenopprettingAsync(rParam);
    }catch(e){}
    try{
      const u = new URL(location.href); u.searchParams.delete("r");
      history.replaceState(null, "", u.pathname + u.search + (hashR ? "" : u.hash));
    }catch(e){}
  }
  const q = (Q.get("lang") || "").toLowerCase();
  L = C.ui[q] ? q : LS.get("lang", "");
  /* #277 råd / backlog: ?l= uten lagret språk → ur_rm, foyer med en gang (språk-pill åpner fortsatt port). */
  if(!C.ui[L] && Q.get("l") && C.ui.ur_rm) L = /^(nb|nn|no)\b/i.test(navigator.language || "") ? "no" : "ur_rm";   /* norsk telefon → norsk; pakistanske telefoner står ofte på engelsk, så resten → ur_rm */
  document.documentElement.classList.add("forste"); setTimeout(() => document.documentElement.classList.remove("forste"), 1500);
  if(!C.ui[L]){ visPort(); } else { settSprak(L); }
  tegnInApp();
  $("#sprak").addEventListener("click", visPort);
  $("#bytt").addEventListener("click", visNyPerson);
  const lk = $("#l-kalk"); if(lk) lk.addEventListener("click", visKalk); $("#l-journal").addEventListener("click", visJournal);
  $("#l-gjen").addEventListener("click", visGjenopprett); $("#l-ios").addEventListener("click", visIosHjem);
  $("#l-del").addEventListener("click", delMedVenn); $("#l-ledere").addEventListener("click", visLedere);
  const lf = $("#l-faq"); if(lf) lf.addEventListener("click", visFaq);
  const lv = $("#l-verve"); if(lv) lv.addEventListener("click", visVerve);
  [["#l-halal", visHalal], ["#l-madad", visMadad], ["#l-juridisk", visJuridisk], ["#l-tapsrekke", visTapsrekke], ["#l-fib", visFib]].forEach(([id, f]) => { const e = $(id); if(e) e.addEventListener("click", f); });
  lederFraLenke();
  startSider(Q);
  setInterval(tegnCall, 30000); setInterval(tegnMarked, 60000);
  probeJitsi();
}
/* ---------- #334: Ny person (bekreft) · gjenoppretting (client-only) · iOS Home Screen ---------- */
function visNyPerson(){
  const box = $("#bekref"); if(!box || !T) return;
  $("#bekref-t").textContent = T.bytt_bekreft || T.bytt;
  $("#bekref-ja").textContent = T.bytt_ja || "OK";
  $("#bekref-nei").textContent = T.bytt_nei || "Back";
  box.hidden = false;
  const lukk = () => { box.hidden = true; };
  $("#bekref-nei").onclick = lukk;
  $("#bekref-ja").onclick = () => {
    lukk();
    LS.clear();
    /* Behold ?l= / ?n= så neste person fortsatt er invitert av samme leder – ikke språk/fremdrift. */
    const u = new URL(location.href);
    ["r", "lang", "lek"].forEach(k => u.searchParams.delete(k));
    location.href = u.pathname + (u.search || "") + u.hash;
  };
  box.onclick = e => { if(e.target === box) lukk(); };
}
function b64urlEncode(bytes){
  let bin = ""; const a = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for(let i = 0; i < a.length; i++) bin += String.fromCharCode(a[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(s){
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for(let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function utf8Bytes(str){ return new TextEncoder().encode(str); }
function utf8String(bytes){ return new TextDecoder().decode(bytes); }
async function deflateBytes(bytes){
  if(typeof CompressionStream !== "function") return null;
  try{
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate-raw"));
    const buf = await new Response(stream).arrayBuffer();
    return new Uint8Array(buf);
  }catch(e){ return null; }
}
async function inflateBytes(bytes){
  if(typeof DecompressionStream !== "function") return null;
  try{
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    const buf = await new Response(stream).arrayBuffer();
    return new Uint8Array(buf);
  }catch(e){ return null; }
}
function pakkFrem(f){
  const out = {};
  Object.keys(f || {}).forEach(id => {
    const s = f[id]; if(!s || typeof s !== "object") return;
    const flags = (s.sett ? 1 : 0) | (s.prov ? 2 : 0) | (s.riktig ? 4 : 0);
    /* [flags, feil, nesteMs|0, settMs|0] — fast lengde, enkel å lese tilbake */
    out[id] = [flags, Math.max(0, +s.feil || 0), +s.neste || 0, typeof s.sett === "number" ? +s.sett : 0];
  });
  return out;
}
function pakkJournal(a){
  return (Array.isArray(a) ? a : []).slice(-40).map(x => [
    +x.ts || 0,
    String(x.inst || "").slice(0, 12),
    x.dir === "sell" ? 1 : 0,
    +x.lot || 0,
    +x.stop || 0,
    String(x.why || "").slice(0, 80),
    +x.res || 0,
    String(x.feel || "").slice(0, 24),
    x.closed ? 1 : 0
  ]);
}
function byggPayload(){
  const ld = LS.get("leder", null), kode = (ld && ld.id) || LS.get("leder_kode", null) || "";
  return {
    v: 1,
    L: L || LS.get("lang", "") || "",
    k: /^[0-9a-z]{6}$/.test(kode) ? kode : "",
    f: pakkFrem(frem()),
    j: pakkJournal(jnLes())
  };
}
function harNoeASave(p){
  return !!(p && ((p.f && Object.keys(p.f).length) || (p.j && p.j.length) || p.k));
}
async function lagGjenKode(){
  const json = JSON.stringify(byggPayload());
  const raw = utf8Bytes(json);
  const z = await deflateBytes(raw);
  if(z && z.length + 4 < raw.length) return "A1z." + b64urlEncode(z);
  return "A1." + b64urlEncode(raw);
}
function gjenLenke(kode){
  const u = new URL(location.href);
  u.searchParams.delete("r"); u.searchParams.delete("lek");
  /* Koden i #-delen: den sendes aldri til serveren (GitHub) eller til lenkeforhåndsvisninger i WhatsApp – journalen kan ha fritekst. */
  const sok = u.searchParams.toString();
  return u.origin + u.pathname + (sok ? "?" + sok : "") + "#r=" + kode;
}
function trekkKode(raa){
  let s = String(raa || "").trim().replace(/\s+/g, "");
  if(!s) return "";
  try{
    if(/https?:\/\//i.test(s) || s.indexOf("?r=") >= 0 || s.indexOf("&r=") >= 0 || s.indexOf("#r=") >= 0){
      const u = new URL(s, location.origin);
      const r = u.searchParams.get("r") || ((u.hash.match(/^#r=(.+)$/) || [])[1] || "");
      if(r) return decodeURIComponent(r).trim();
    }
  }catch(e){}
  const m = s.match(/(A1z?\.[A-Za-z0-9_-]+)/);
  return m ? m[1] : s;
}
function utPakkFrem(f){
  const out = {};
  Object.keys(f || {}).forEach(id => {
    const row = f[id];
    if(Array.isArray(row)){
      const flags = +row[0] || 0, neste = +row[2] || 0, sett = +row[3] || 0;
      const st = {};
      if(flags & 1) st.sett = sett || Date.now();
      if(flags & 2) st.prov = sett || Date.now();
      if(flags & 4) st.riktig = true;
      if(+row[1]) st.feil = +row[1];
      if(neste) st.neste = neste;
      out[id] = st;
    } else if(row && typeof row === "object") out[id] = row;
  });
  return out;
}
function utPakkJournal(j){
  return (Array.isArray(j) ? j : []).map(x => {
    if(Array.isArray(x)){
      return { ts: +x[0] || Date.now(), inst: String(x[1] || "EUR/USD").slice(0, 12), dir: x[2] ? "sell" : "buy",
        lot: +x[3] || 0, stop: +x[4] || 0, why: String(x[5] || "").slice(0, 120), res: +x[6] || 0,
        feel: String(x[7] || "").slice(0, 24), closed: !!x[8] };
    }
    return x && typeof x === "object" ? x : null;
  }).filter(Boolean);
}
function parsePayloadSync(bytes){
  const obj = JSON.parse(utf8String(bytes));
  if(!obj || obj.v !== 1 || typeof obj !== "object") throw new Error("v");
  return obj;
}
async function lesGjenPayload(kode){
  const s = trekkKode(kode);
  if(!s) throw new Error("empty");
  const z = s.indexOf("A1z.") === 0, plain = s.indexOf("A1.") === 0;
  if(!z && !plain) throw new Error("pfx");
  const body = s.slice(z ? 4 : 3);
  const bytes = b64urlDecode(body);
  if(z){
    const raw = await inflateBytes(bytes);
    if(!raw) throw new Error("z");
    return parsePayloadSync(raw);
  }
  return parsePayloadSync(bytes);
}
function anvendGjenopprettingSync(obj){
  if(!obj || obj.v !== 1) return false;
  const f = utPakkFrem(obj.f || {});
  const j = utPakkJournal(obj.j || []);
  if(obj.L && C && C.ui[obj.L]) LS.set("lang", obj.L);
  if(obj.k && /^[0-9a-z]{6}$/.test(obj.k)) LS.set("leder_kode", obj.k);
  if(Object.keys(f).length) LS.set("frem", Object.assign({}, frem(), f));
  if(j.length){
    const cur = jnLes(), seen = {};
    cur.forEach(e => { seen[e.ts] = 1; });
    const merged = cur.slice();
    j.forEach(e => { if(!seen[e.ts]){ merged.push(e); seen[e.ts] = 1; } });
    jnSkriv(merged);
  }
  if(Object.keys(f).length || j.length) LS.set("foerste", true);
  return !!(Object.keys(f).length || j.length || obj.k || obj.L);
}
async function anvendGjenopprettingAsync(kode){
  const obj = await lesGjenPayload(kode);
  return anvendGjenopprettingSync(obj);
}
function visGjenopprett(){
  const G = T, v = verktoyHode(G.gjen || "Save / restore"), w = el("div", "vt"); v.append(w);
  w.append(el("p", "under", G.gjen_u || ""));
  const box = el("div", "gjen-box");
  const kodeEl = el("div", "gjen-kode", "…");
  const lenkeEl = el("code", "gjen-lenke", "");
  const foto = el("small", "", G.gjen_foto || "");
  box.append(el("b", "", G.gjen_kode || ""), foto, kodeEl, el("b", "", G.gjen_lenke || ""), lenkeEl);
  const rad = el("div", "rad");
  const kopi = el("button", "hoved", G.gjen_kopi || "Copy"); kopi.type = "button";
  const kopiL = el("button", "", G.gjen_kopi_lenke || "Copy link"); kopiL.type = "button";
  rad.append(kopi, kopiL); box.append(rad);
  const qrWrap = el("div", "gjen-qr skjul"); box.append(qrWrap);
  w.append(box);
  let kode = "", lenke = "";
  (async () => {
    const p = byggPayload();
    if(!harNoeASave(p)){ kodeEl.textContent = G.gjen_tom || ""; lenkeEl.textContent = "—"; kopi.disabled = true; kopiL.disabled = true; return; }
    kode = await lagGjenKode();
    lenke = gjenLenke(kode);
    kodeEl.textContent = kode; lenkeEl.textContent = lenke;
    kopi.onclick = async () => { try{ await navigator.clipboard.writeText(kode); toast(T.kopiert || "OK"); }catch(e){ window.prompt("", kode); } };
    kopiL.onclick = async () => { try{ await navigator.clipboard.writeText(lenke); toast(T.kopiert || "OK"); }catch(e){ window.prompt("", lenke); } };
    try{
      await qrLast();
      qrWrap.innerHTML = ""; qrWrap.append(tegnQrSvg(lenke), el("p", "", G.gjen_qr || ""));
      qrWrap.classList.remove("skjul");
    }catch(e){}
  })();
  const paste = el("div", "gjen-paste");
  paste.append(el("b", "", G.gjen_lim || ""));
  const ta = document.createElement("textarea"); ta.rows = 3; ta.setAttribute("autocomplete", "off"); ta.setAttribute("autocapitalize", "off"); ta.spellcheck = false;
  const bruk = el("button", "knapp", G.gjen_bruk || "Restore"); bruk.type = "button";
  const feil = el("p", "under", "");
  bruk.addEventListener("click", async () => {
    feil.textContent = "";
    try{
      const ok = await anvendGjenopprettingAsync(ta.value);
      if(!ok){ feil.textContent = G.gjen_feil || ""; return; }
      toast(G.gjen_ok || "OK");
      setTimeout(() => { location.href = location.pathname + (LS.get("leder_kode") ? "?l=" + encodeURIComponent(LS.get("leder_kode")) : "") + (LS.get("lang") ? (LS.get("leder_kode") ? "&" : "?") + "lang=" + encodeURIComponent(LS.get("lang")) : ""); }, 600);
    }catch(e){ feil.textContent = G.gjen_feil || ""; }
  });
  paste.append(ta, bruk, feil); w.append(paste);
}
function visIosHjem(){
  const G = T, v = verktoyHode(G.ios_hjem || "Home Screen"), w = el("div", "vt"); v.append(w);
  w.append(el("p", "under", G.ios_u || ""));
  const guide = el("div", "ios-guide");
  const steg = [
    ["ios_s1", '<path d="M12 15V4"/><path d="M8.5 7.5L12 4l3.5 3.5"/><path d="M5 12v7a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-7"/>'],
    ["ios_s2", '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M9 17h6"/>'],
    ["ios_s3", '<path d="M4 11.5L12 4l8 7.5"/><path d="M7 10.5V20h10v-9.5"/>']
  ];
  steg.forEach(([key, paths], i) => {
    const row = el("div", "ios-steg");
    const fig = el("div", "ios-fig");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24"); svg.innerHTML = paths; fig.append(svg);
    const tx = el("div", ""); tx.append(el("b", "", String(i + 1) + "."), el("span", "", G[key] || ""));
    row.append(fig, tx); guide.append(row);
  });
  guide.append(el("p", "ios-note", G.ios_note || ""));
  w.append(guide);
}
/* Dag-2 soft return (#2 gap): kal_wapis + ufull leksjon + call-chip. Ingen streak / skyld. */
function sikreDag2Css(){
  if(document.getElementById("dag2-css")) return;
  const s = document.createElement("style"); s.id = "dag2-css";
  s.textContent = [
    ".kal-wapis{margin:14px 0 0;font:600 14.5px/1.5 var(--kropp);color:var(--dempet);max-width:36ch}",
    "html[lang=ur] .kal-wapis,html[lang=ar] .kal-wapis{line-height:1.75}",
    ".foyer .kal-wapis{margin:0 0 14px}",
    ".lek .kal-wapis{margin:16px var(--gutter) 0}",
    ".lek .dag2-rad{margin:12px var(--gutter) 18px;display:flex;flex-direction:column;gap:10px}",
    ".lek .dag2-rad .call-chip{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:48px;padding:0 16px;border-radius:999px;border:1.5px solid var(--linje2);background:var(--flate);text-decoration:none;font:700 13.5px/1.2 var(--kropp);color:var(--dempet)}",
    ".lek .dag2-rad .call-chip strong{font:800 13.5px/1 var(--kropp);color:var(--aksent);font-variant-numeric:tabular-nums}",
    ".foyer.dag2 .cta .knapp{outline:0}",
  ].join("");
  document.head.append(s);
}
function ufullIndeks(){ const f = frem(), alle = ALLE(); return alle.findIndex(x => !(f[x.id] && f[x.id].riktig)); }
function harStartet(){ const f = frem(); return ALLE().some(x => { const st = f[x.id]; return st && (st.sett || st.prov || st.riktig); }); }
function callOmKort(){
  const n = new Date(), d = n.getUTCDay(), h = n.getUTCHours() + n.getUTCMinutes() / 60;
  let diff = ((C.call.ukedag - d) + 7) % 7; if(diff === 0 && h >= C.call.utc_time + 1.5) diff = 7;
  const neste = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() + diff, C.call.utc_time, 0, 0));
  const ms = neste - n, live = ms <= 0 && ms > -1.5 * 36e5;
  if(live) return T.call_naa;
  const hh = Math.floor(ms / 36e5), mm = Math.floor((ms % 36e5) / 6e4);
  const dagerMellom = Math.round((new Date(neste.getFullYear(), neste.getMonth(), neste.getDate()) - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / DAG);
  return dagerMellom <= 0 ? T.call_aaj.replace("{h}", hh).replace("{m}", mm) : dagerMellom === 1 ? T.call_kal.replace("{h}", hh) : T.call_dager.replace("{d}", dagerMellom);
}
function lagCallChip(fraLeksjon){
  const a = el("a", "call-chip"); a.href = "#call";
  const ik = el("span", "ikon"); ik.append(ikon("i-cal"));
  a.append(ik, el("span", "", T.kal_wapis_call || T.call), el("strong", "", callOmKort()), ikon("i-next", "chev"));
  a.addEventListener("click", e => {
    e.preventDefault();
    if(fraLeksjon) lukk();
    setTimeout(() => { const c = $("#call"); if(c) c.scrollIntoView({ behavior: "smooth", block: "start" }); }, fraLeksjon ? 80 : 0);
  });
  return a;
}
/* Onboarding: PK-språk først, øvrige bak «Aur zubanein» — mål: foyer → første Academy < 60 s. */
const PORT_PK = ["ur_rm", "ur"], PORT_ANDRE = ["en", "no", "hi", "ar"];
const PORT_MERKE = { ur_rm: "a b c", ur: "ا ب پ", en: "EN", no: "NO", hi: "अ आ", ar: "أ ب ت" };
function lukkPort(){
  const p = $("#port"); if(p) p.classList.add("skjul");
  document.documentElement.classList.remove("portaapen");
  maalIabHoyde();
}
function portKnapp(k){
  const b = el("button", k === "ur_rm" ? "port-anbefalt" : "", "");
  b.type = "button"; b.dataset.lang = k;
  b.append(el("span", "", C.sprak[k]), el("b", "", PORT_MERKE[k] || k.toUpperCase()));
  b.setAttribute("lang", k === "ur" ? "ur" : (k === "ur_rm" ? "ur-Latn" : k));
  b.addEventListener("click", () => {
    settSprak(k); lukkPort();
    queueMicrotask(() => { const c = $("#foyer-cta"); if(c) c.focus(); });
  });
  return b;
}
function visPort(){
  const p = $("#port"), v = $("#port-valg"); v.innerHTML = "";
  const U = (T || C.ui[L] || C.ui.ur_rm);
  $("#port-t").textContent = U.velg_sprak;
  const pk = el("div", "port-pk"); pk.append(el("p", "port-etikett", U.port_pk || "Pakistan"));
  PORT_PK.forEach(k => { if(C.sprak[k]) pk.append(portKnapp(k)); });
  v.append(pk);
  const andre = PORT_ANDRE.filter(k => C.sprak[k]);
  if(andre.length){
    const d = document.createElement("details"); d.className = "port-andre";
    const s = document.createElement("summary"); s.textContent = U.port_andre || "More languages"; d.append(s);
    andre.forEach(k => d.append(portKnapp(k)));
    v.append(d);
  }
  p.classList.remove("skjul");
  document.documentElement.classList.add("portaapen");
  /* IAB-banner må tegnes også før språk er valgt (T kan være null). */
  tegnInApp();
  requestAnimationFrame(maalIabHoyde);
}
function settSprak(k){
  if(L !== k && C){ C.paisa = null; paisaLovnad = null; }   /* Paisa-innholdet er per språk – hent på nytt for det nye */
  L = k; T = C.ui[k]; LS.set("lang", k);
  document.documentElement.lang = k === "ur_rm" ? "ur-Latn" : k; document.documentElement.dir = C.rtl.indexOf(k) >= 0 ? "rtl" : "ltr";
  $("#sprak").textContent = C.sprak[k];
  tegnInApp();
  tegnHjem();
  hentProfilSoft();   /* #292 soft: WA-nummer når Sheets svarer */
  if(!settSprak._lek){ settSprak._lek = 1; apneFraQuery(); }
}
function erFoerstegang(){ return !LS.get("foerste", false); }
function markerFoerste(){ if(!LS.get("foerste", false)) LS.set("foerste", true); document.body.classList.remove("onboarding"); }
/* Academy-først register-gate: soft-lås til 3 riktige leksjoner ELLER uke 1 ferdig. Ingen innskuddsguide. */
const REG_GATE_LEKS = 3;
function antallRiktige(){ const f = frem(); return ALLE().filter(x => f[x.id] && f[x.id].riktig).length; }
function regGateAapen(){ return ukeFerdig(0) || antallRiktige() >= REG_GATE_LEKS; }

/* ---------- leder (?l= / navnelenke) ---------- */
/* B-038-port: hub bruker /asma → 404 → slug,code. Nesté under /neste/ny/ har ikke Pages-404 per mappe,
   så durable lenke på preview er ?n=asma, #asma eller ?l=asma (slug). Path /…/asma parses hvis serveren
   serverer index (cutover/SPA). Soft-fail: navnelenker-reserve.csv når Sheets er nede.
   Approved SNAP (id,chiffer) = PR #278 — ikke duplisert her. */
const REF_HOSTS = ["copyxapp.com", "www.copyxapp.com"], REF_PATTERN = /^\/auth\/register\?e=[A-Za-z0-9_%.+\/=-]{20,}&a=1$/;
const NAVN_CSV_DEFAULT = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCUbvpu8cXdh-V-XkfvqAevZlabu876V-j8HNNd_qJGDOpPhbwVukJa--Vum5QWLuyQwEQM9Y5gMSc/pub?gid=22159740&single=true&output=csv";
const RESERVERT_STI = { neste: 1, ny: 1, leksjon: 1, lyd: 1, skrift: 1, tools: 1, assets: 1, lang: 1, data: 1, index: 1, sw: 1, manifest: 1, app: 1, google: 1, aimpire: 1,
  /* B-055: stedene og ankrene appen selv bruker i hashen. Uten dem leste slugFraHash «#academy» som en leder som heter
     «academy», og det overstyrte ?l= – en delt lenke til et sted i appen fjernet invitasjonen (målt 21.10, reg-gate). */
  ghar: 1, academy: 1, paisa: 1, mazeed: 1, learn: 1, call: 1, sawal: 1, intro: 1, dohr: 1, kart: 1, risk: 1, sonic: 1, historikk: 1,
  kalk: 1, konto: 1, uttak: 1, mer: 1, mk: 1, faq: 1, journal: 1, uke1: 1, uke2: 1, uke3: 1, uke4: 1 };
function validRef(s){ try{ const u = new URL(String(s || "").trim()); if(u.protocol !== "https:" || REF_HOSTS.indexOf(u.hostname) < 0 || !REF_PATTERN.test(u.pathname + u.search)) return null; return u; }catch(e){ return null; } }
function codeOf(u){ const s = u.hostname + "|" + (u.searchParams.get("e") || u.pathname + u.search); let h = 0x811c9dc5; for(let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return ("00000" + h.toString(36)).slice(-6); }
function cleanName(raw){ let t = String(raw || "").trim().slice(0, 48); try{ t = t.replace(new RegExp("[^\\p{L}\\p{M} '\\-]", "gu"), ""); }catch(e){ t = t.replace(/[^A-Za-zÀ-ÿ '\-]/g, ""); } return t.replace(/\s+/g, " ").trim().slice(0, 24); }
function vaskSlug(raa){
  let t = String(raa || "");
  try{ t = decodeURIComponent(t); }catch(e){}
  try{ t = t.normalize("NFKC"); }catch(e){}
  return t.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 30);
}
function slugFraSti(){
  const deler = location.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if(!deler.length) return "";
  let siste = deler[deler.length - 1];
  if(/^index\.html$/i.test(siste)){ deler.pop(); siste = deler[deler.length - 1] || ""; }
  if(!siste || /\./.test(siste) || RESERVERT_STI[siste.toLowerCase()]) return "";
  const s = vaskSlug(siste);
  return /^[a-z0-9]{1,30}$/.test(s) && !RESERVERT_STI[s] ? s : "";
}
function slugFraHash(){
  const h = String(location.hash || "").replace(/^#\/?/, "");
  if(!h || h.indexOf("=") >= 0) return "";
  const s = vaskSlug(h.split(/[/?&]/)[0] || "");
  return /^[a-z0-9]{1,30}$/.test(s) && !RESERVERT_STI[s] ? s : "";
}
function fantSlugICsv(tekst, slug){
  const treff = [];
  String(tekst || "").split(/\r?\n/).forEach(function(l){
    const f = l.split(",");
    if(f[0] && f[0].trim().toLowerCase() === slug) treff.push((f[1] || "").trim().toLowerCase());
  });
  return treff.length === 1 && /^[a-z0-9]{6}$/.test(treff[0]) ? treff[0] : null;
}
async function slugTilKode(slug){
  if(!slug || !/^[a-z0-9]{1,30}$/.test(slug)) return null;
  const url = (C && C.names_csv) || NAVN_CSV_DEFAULT;
  const ark = await hentTekst(url + (url.indexOf("?") < 0 ? "?" : "&") + "t=" + Date.now(), 3500);
  if(ark && /^slug,code/i.test(ark.trim())){
    const k = fantSlugICsv(ark, slug);
    if(k) return k;
  }
  const snap = await hentTekst("navnelenker-reserve.csv?t=" + Date.now(), 2000);
  return fantSlugICsv(snap, slug);
}
async function nokler(kode){
  const te = new TextEncoder(), km = await crypto.subtle.importKey("raw", te.encode(kode), "PBKDF2", false, ["deriveBits"]);
  const t = new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: te.encode("aimpire-v1"), iterations: 10000, hash: "SHA-256" }, km, 256));
  const id = Array.from(t.slice(0, 16)).map(x => ("0" + x.toString(16)).slice(-2)).join("");
  const kin = new Uint8Array(34); kin.set(t); kin.set(te.encode("|k"), 32);
  return { id, key: new Uint8Array(await crypto.subtle.digest("SHA-256", kin)) };
}
async function dekrypter(key, b64){
  const ct = Uint8Array.from(atob(b64), ch => ch.charCodeAt(0)), ut = new Uint8Array(ct.length);
  for(let i = 0; i < ct.length; i += 32){ const blk = new Uint8Array(33); blk.set(key); blk[32] = i / 32; const ks = new Uint8Array(await crypto.subtle.digest("SHA-256", blk)); for(let j = 0; j < 32 && i + j < ct.length; j++) ut[i + j] = ct[i + j] ^ ks[j]; }
  return new TextDecoder().decode(ut);
}
/* #267-port (cursor/pk-nett): ark med 3,5 s frist + same-origin SNAP (ledere-reserve.csv).
   Pakistan/blokkert CDN maa ikke henge foerste skjerm; SNAP yngre enn 7 dager. */
const SNAP_MAX_DAGER = 7;
function snapOk(tekst){
  if(!tekst) return null;
  const m = tekst.match(/#\s*baked:(\d{4}-\d{2}-\d{2})/);
  if(m){
    const dager = (Date.now() - Date.parse(m[1] + "T00:00:00Z")) / 864e5;
    if(!(dager >= 0 && dager <= SNAP_MAX_DAGER)) return null;
  }
  return tekst;
}
function hentTekstSoft(url, ms){ return hentTekst(url, ms); }   /* navnet #296 bruker */
async function hentTekst(url, ms){
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const t = setTimeout(() => { if(ctrl) ctrl.abort(); }, ms);
  try{
    const r = await fetch(url, { cache: "no-store", signal: ctrl ? ctrl.signal : undefined });
    if(!r.ok) return null;
    return await r.text();
  }catch(e){ return null; }
  finally{ clearTimeout(t); }
}
async function lederFraCsv(csv, kode){  if(!csv) return null;
  const n = await nokler(kode);
  const rad = csv.split(/\r?\n/).map(l => l.trim().replace(/"/g, "").match(/^([0-9a-f]{32}),([A-Za-z0-9+\/=]{20,})$/)).filter(Boolean).find(m => m[1] === n.id);
  if(!rad) return null;
  const del = (await dekrypter(n.key, rad[2])).split("\n"), navn = cleanName(del[1]), u = validRef(del[2]);
  return (del[0] === "AIM1" && navn && u && codeOf(u) === kode) ? { id: kode, name: navn, link: u.href } : null;
}
function qrLast(){
  if(window.qrcode) return Promise.resolve();
  return new Promise((ok, feil) => { const sc = document.createElement("script"); sc.src = "qrcode.min.js"; sc.onload = ok; sc.onerror = feil; document.head.appendChild(sc); });
}
function tegnQrSvg(url){
  const q = window.qrcode(0, "M"); q.addData(url); q.make();
  const n = q.getModuleCount(), cell = 4, pad = 4, side = (n + pad * 2) * cell;
  let paths = "";
  for(let r = 0; r < n; r++) for(let c = 0; c < n; c++) if(q.isDark(r, c)) paths += "M" + ((c + pad) * cell) + " " + ((r + pad) * cell) + "h" + cell + "v" + cell + "h-" + cell + "z";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 " + side + " " + side); svg.setAttribute("width", "180"); svg.setAttribute("height", "180");
  svg.setAttribute("role", "img"); svg.setAttribute("aria-label", "QR");
  const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect"); bg.setAttribute("width", side); bg.setAttribute("height", side); bg.setAttribute("fill", "#fff");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path"); path.setAttribute("d", paths); path.setAttribute("fill", "#0B1630");
  svg.append(bg, path); return svg;
}
async function finnLeder(kode){
  const arkUrl = C.approved_csv || "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCUbvpu8cXdh-V-XkfvqAevZlabu876V-j8HNNd_qJGDOpPhbwVukJa--Vum5QWLuyQwEQM9Y5gMSc/pub?gid=2115650304&single=true&output=csv";
  const ark = await hentTekst(arkUrl, 3500);
  let ld = await lederFraCsv(ark, kode);
  if(ld) return ld;
  const snap = snapOk(await hentTekst("ledere-reserve.csv?t=" + Date.now(), 2000));
  return lederFraCsv(snap, kode);
}
function navnSlug(n){ let t = String(n || "").toLowerCase().replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a"); try{ t = t.normalize("NFKD").replace(/[\u0300-\u036f]/g, ""); }catch(e){} t = t.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); return t.slice(0, 20).replace(/-+$/, ""); }
/* Delbar lenke: prefers durable ?n=slug (virker under /neste/ny/ uten Pages-path). Ellers ?l=kode. */
function appUrl(ld){
  let path = location.pathname.replace(/index\.html$/i, "");
  const deler = path.replace(/\/+$/, "").split("/").filter(Boolean);
  if(deler.length){
    const siste = deler[deler.length - 1].toLowerCase();
    if(/^[a-z0-9]{1,30}$/.test(siste) && !RESERVERT_STI[siste]){ deler.pop(); path = "/" + deler.join("/") + "/"; }
  }
  const base = location.origin + path;
  if(!ld) return base;
  const sl = navnSlug(ld.name);
  if(sl) return base + "?n=" + encodeURIComponent(sl);
  return base + "?l=" + encodeURIComponent(ld.id);
}
let toastT; function toast(txt){ let e = $("#toast"); if(!e){ e = el("div", "toast"); e.id = "toast"; e.setAttribute("role", "status"); document.body.append(e); } e.textContent = txt; e.classList.add("vis"); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove("vis"), 2200); }
/* Hub-regel: alle delte lenker får «åpne i Chrome/Safari» – in-app-nettlesere mister ofte ?l= (sponsor). */
function aapneLinje(){ const t = (T && (T.aapne || (T.ld && T.ld.aapne))) || ""; return t ? "\n" + t : ""; }
function delTekst(url){ return T.del_tekst.replace("{url}", url) + aapneLinje(); }
async function delLenke(url, tekst){
  if(navigator.share){ try{ await navigator.share({ text: tekst, url }); return; }catch(e){ if(e && e.name === "AbortError") return; } }
  try{ await navigator.clipboard.writeText(tekst); toast(T.kopiert); }catch(e){ window.prompt("", tekst); }
}
function delMedVenn(){
  /* Ledere med egen lenke deler SIN invite; ellers videresendes den som inviterte deg (samme ?l=). */
  const me = LS.get("me", null), ld = me || LS.get("leder", null), url = appUrl(ld);
  delLenke(url, delTekst(url));
}
function inAppNavn(){
  const ua = navigator.userAgent || "";
  const standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  if(standalone) return null;
  const kjente = [["TikTok", /musical_ly|Bytedance/i], ["Instagram", /\bInstagram/i], ["Threads", /\bBarcelona/i],
    ["Messenger", /\bFB[\w_]+\/(Messenger)/i], ["Facebook", /\bFB[\w_]+\/|\bFacebook|FB_IAB|FBAN/i], ["Snapchat", /Snapchat/i],
    ["WhatsApp", /\b(WAiOS|WA4A)\/|WhatsApp/i], ["X", /\bTwitter/i]];
  for(let i = 0; i < kjente.length; i++) if(kjente[i][1].test(ua)) return kjente[i][0];
  if("TelegramWebview" in window || "TelegramWebviewProxy" in window) return "Telegram";
  if(/WebView|(iPhone|iPod|iPad)(?!.*Safari\/)|Android.*wv\)/i.test(ua)) return "";
  return null;
}
function uiTekst(){ return T || (C && (C.ui[L] || C.ui.ur_rm)) || null; }
function maalIabHoyde(){
  const bar = $("#inapp-bar"), rot = document.documentElement;
  if(!bar || bar.hidden){ rot.style.removeProperty("--iabh"); return; }
  rot.style.setProperty("--iabh", Math.ceil(bar.getBoundingClientRect().height) + "px");
}
function tegnInApp(){
  const bar = $("#inapp-bar"); if(!bar) return;
  const U = uiTekst();
  let lukket = false; try{ lukket = sessionStorage.getItem("neste.iab") === "1"; }catch(e){}
  const app = inAppNavn();
  if(app === null || lukket || !U || !U.inapp_bar){
    bar.hidden = true; document.documentElement.classList.remove("iabvis");
    document.documentElement.style.removeProperty("--iabh");
    return;
  }
  $("#inapp-t").textContent = U.inapp_bar.replace("{APP}", app || U.inapp_any || "app");
  const android = /Android/.test(navigator.userAgent || ""), go = $("#inapp-go"), ios = $("#inapp-ios");
  if(android){
    go.hidden = false; ios.hidden = true; go.textContent = U.open_chrome || "Chrome";
    go.href = "intent://" + location.host + location.pathname + location.search + location.hash + "#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=" + encodeURIComponent(location.href) + ";end";
  } else { go.hidden = true; ios.hidden = false; ios.textContent = U.inapp_ios || U.aapne || ""; }
  $("#inapp-x").onclick = () => {
    try{ sessionStorage.setItem("neste.iab", "1"); }catch(e){}
    bar.hidden = true; document.documentElement.classList.remove("iabvis");
    document.documentElement.style.removeProperty("--iabh");
  };
  bar.hidden = false; document.documentElement.classList.add("iabvis");
  requestAnimationFrame(maalIabHoyde);
}
window.addEventListener("resize", () => { if(document.documentElement.classList.contains("iabvis")) maalIabHoyde(); });
function renskAdresseEtterSlug(kode){
  try{
    const u = new URL(location.href);
    u.searchParams.delete("n");
    u.searchParams.set("l", kode);
    if(u.hash && vaskSlug(u.hash.replace(/^#\/?/, "")) === LS.get("navnelenke_slug", "")) u.hash = "";
    history.replaceState(null, "", u.pathname + u.search + u.hash);
  }catch(e){}
}
async function lederFraLenke(){
  const raaL = vaskSlug(Q.get("l") || "");
  const slugEksplisitt = vaskSlug(Q.get("n") || "") || slugFraHash() || slugFraSti();
  let kode = "", slugProv = "", slugSomKode = false;
  if(slugEksplisitt){
    slugProv = slugEksplisitt;
    LS.set("navnelenke_slug", slugProv);
    LS.set("navnelenke_pending", true);
    try{ kode = (await slugTilKode(slugProv)) || ""; }catch(e){ kode = ""; }
  }else if(raaL.length > 6){
    kode = raaL.slice(-6);
  }else if(raaL.length === 6){
    kode = raaL;
    slugSomKode = true;
  }else if(raaL.length >= 1){
    slugProv = raaL;
    LS.set("navnelenke_slug", slugProv);
    LS.set("navnelenke_pending", true);
    try{ kode = (await slugTilKode(slugProv)) || ""; }catch(e){ kode = ""; }
  }
  const kjent = LS.get("leder", null);
  if(kode && /^[0-9a-z]{6}$/.test(kode)) LS.set("leder_kode", kode);
  if(kode && kjent && kjent.id === kode){ LS.set("navnelenke_pending", false); tegnLeder(); return; }
  if(!kode || !/^[0-9a-z]{6}$/.test(kode) || !(window.crypto && crypto.subtle)){
    if(slugProv) LS.set("navnelenke_pending", true);
    tegnLeder();
    return;
  }
  try{
    let ld = await finnLeder(kode);
    if(!ld && slugSomKode){
      const viaSlug = await slugTilKode(raaL);
      if(viaSlug && viaSlug !== kode){
        kode = viaSlug;
        LS.set("leder_kode", kode);
        ld = await finnLeder(kode);
      }
    }
    if(ld){
      /* B-023 (founder 16.10 21:37): er en ANNEN leder husket fra før, spør hvem som inviterte – ingen vinner i stillhet. */
      if(kjent && kjent.id && kjent.id !== ld.id) LS.set("leder_konflikt", { a: kjent, b: ld }); else LS.set("leder", ld);
      LS.set("navnelenke_pending", false);
      if(slugProv || slugSomKode) renskAdresseEtterSlug(kode);
    }else if(slugProv){
      LS.set("navnelenke_pending", true);
    }
  }catch(e){
    if(slugProv) LS.set("navnelenke_pending", true);
  }
  tegnLeder();
  tegnKundePorter();   /* B-053: kontolenken skal vises så snart lederen er kjent – også ved første besøk */
  if(!erFoerstegang()) tegnRegGate();
}
function tegnLeder(){
  if(!T) return;
  queueMicrotask(tegnVerve);   /* B-055: lederen landes ofte etter at forsiden er tegnet – verve-boksen følger lederen, ikke forsiden */
  const s = $("#leder"), ld = LS.get("leder", null), kf = LS.get("leder_konflikt", null);
  const pending = LS.get("navnelenke_pending", false) || (!ld && LS.get("leder_kode", null));
  const slug = LS.get("navnelenke_slug", "") || "";
  s.innerHTML = "";
  if(kf && kf.a && kf.b){
    /* B-023: to ledere – medlemmet velger selv. Valget låser sponsoren på denne telefonen. */
    const box = el("div", "txt konflikt"); box.append(el("b", "", T.leder_hvem || "Who invited you?"));
    const rad = el("div", "konflikt-valg");
    [kf.a, kf.b].forEach(x => { const k = el("button", "pille", x.name); k.type = "button";
      k.addEventListener("click", () => { LS.set("leder", x); LS.set("leder_konflikt", null); tegnLeder(); tegnKundePorter(); if(!erFoerstegang()) tegnRegGate(); }); rad.append(k); });
    box.append(rad); s.append(el("div", "avi tom", "?"), box); return;
  }
  const avi = el("div", "avi" + (ld ? "" : " tom"), ld ? ld.name.slice(0, 1).toUpperCase() : "?"), txt = el("div", "txt");
  if(ld){ txt.append(el("small", "", T.leder)); const b = el("b", "", ld.name); b.append(el("span", "ok", "✓")); txt.append(b); }
  else if(pending){
    /* Ærlig soft-fail: slug/kode husket, navn mangler (Sheets nede — approved SNAP = #278). */
    const pk = LS.get("leder_kode", "") || "";
    if(slug && !pk){
      txt.append(el("b", "", T.navnelenke_venter || "This link is being activated. Try again in a few minutes."));
    }else{
      txt.append(el("small", "", T.leder));
      txt.append(el("b", "", (T.leder_venter || "Link received — name when the list is online.").replace("{k}", pk)));
    }
  }
  else { txt.append(el("b", "", T.leder_ingen)); }
  s.append(avi, txt);
}
function nesteAcademyIdx(){
  const alle = ALLE(); let i = alle.findIndex(x => !(frem()[x.id] && frem()[x.id].riktig)); return i < 0 ? 0 : i;
}
function bindLaastReg(el){
  el.href = "#"; el.setAttribute("aria-disabled", "true"); el.classList.add("laast");
  el.onclick = e => { e.preventDefault(); const i = nesteAcademyIdx(); if(ALLE()[i]) apne(i); };
}
function bindAapenReg(el, link){
  el.classList.remove("laast"); el.href = link; el.removeAttribute("aria-disabled"); el.onclick = null;
}
/* #285: foyer-porter. B-053 (#335): kontolenken er alltid synlig når leder finnes – også ved første besøk – som rolig tekstlenke,
   uten lås. Hovedhandlingen etter 3 riktige ligger i reg-gate-seksjonen (tegnRegGate). Deling vises etter første leksjon. */
function tegnKundePorter(){
  if(!T) return;
  const ld = LS.get("leder", null), fr = $("#foyer-reg"), fd = $("#foyer-del");
  if(!fr || !fd) return;
  if(ld && ld.link){ fr.hidden = false; fr.textContent = T.reg; bindAapenReg(fr, ld.link); fr.removeAttribute("title"); }
  else { fr.hidden = true; fr.onclick = null; }
  if(ld && !erFoerstegang()){ fd.hidden = false; fd.textContent = T.del; fd.onclick = delMedVenn; }
  else { fd.hidden = true; fd.onclick = null; }
}
/* B-030: ærlig % nær foyer-CTA. Bold tall; bidi for ur/ar. Ingen HEAD/preflight. */
function riskLinje(el, mal){
  if(!el || !T) return;
  const n = String(C.risk_prosent || 80);
  const raw = String(mal || T.foyer_risk || T.reg_gate_risk || T.risk_b || "").replace(/\{n\}/g, n);
  el.textContent = "";
  const i = raw.indexOf(n);
  if(i < 0){ el.append(bidiTekst(raw)); return; }
  if(i > 0) el.append(bidiTekst(raw.slice(0, i)));
  const b = document.createElement("b"); b.className = "ltr"; b.textContent = n; el.append(b);
  if(i + n.length < raw.length) el.append(bidiTekst(raw.slice(i + n.length)));
}
function tegnFoyerRisk(){
  riskLinje($("#foyer-risk"), T && T.foyer_risk);
}
/* B-053: før 3 riktige = rolig knapp med lenken (ingen lås); etter 3 riktige / uke 1 = hovedhandling med 100-figur-rekka,
   tapstallet med kilde og lenke til guiden (KYC, innskudd, apper) i huben. Uten leder: knappen går til neste leksjon. */
function hubGuideUrl(ld){
  const kode = ld && (ld.kode || ld.id) ? String(ld.kode || ld.id).replace(/[^a-z0-9]/gi, "") : "";
  return "https://aimpire.github.io/" + (kode ? "?l=" + encodeURIComponent(kode) : "") + "#guide";
}
function tegnRegGate(){
  if(!T) return;
  const gate = $("#reg-gate"), r = $("#reg"), u = $("#reg-u"), ld = LS.get("leder", null), fig = $("#reg-figurer"), kilde = $("#reg-kilde"), guide = $("#reg-guide");
  if(!gate || !r) return;
  const aapen = regGateAapen(), nOk = antallRiktige();
  $("#reg-gate-t").textContent = (aapen && ld && ld.link && T.reg_gate_t_klar) || T.reg_gate_t || T.reg;
  riskLinje($("#reg-gate-risk"), T.reg_gate_risk || T.risk_b);
  if(fig && !fig.childElementCount){ for(let i = 0; i < 100; i++) fig.append(el("i", i < C.risk_prosent ? "tap" : "")); }
  if(kilde) kilde.textContent = T.risk_k || "";
  gate.classList.toggle("aapen", aapen && !!(ld && ld.link));
  r.classList.toggle("hoved", aapen && !!(ld && ld.link));
  if(ld && ld.link){
    r.textContent = T.reg;
    bindAapenReg(r, ld.link);
    u.textContent = aapen ? (T.reg_klar || T.reg_u) : (T.reg_forst || T.reg_laast || "").replace(/\{n\}/g, String(REG_GATE_LEKS)).replace(/\{a\}/g, String(nOk));
    if(guide){ guide.hidden = !aapen; guide.textContent = T.reg_guide || "Guide"; guide.href = hubGuideUrl(ld); }
  } else {
    r.textContent = T.reg;
    bindLaastReg(r);
    u.textContent = T.leder_ingen;
    if(guide) guide.hidden = true;
  }
  gate.hidden = false;
  tegnKundePorter();
}

/* ---------- B-055: fire steder – Ghar · Academy · Paisa · Mazeed ----------
   Hvert sted er ett av medlemmets spørsmål, ikke en av våre produktflater. Leksjonsrammen (#lek) og språkporten ligger
   over bunnmenyen (z-index), så de dekker den når de er åpne – ingen klasse-jonglering. Adressen bærer stedet som
   #academy/#paisa/#mazeed (Ghar = ingen hash), så en delt lenke åpner riktig sted; gamle ankere (#call, #uke2 …) og
   hubens #learn mappes til stedet sitt. */
const SIDER = ["ghar", "academy", "paisa", "mazeed"];
let side = "ghar";
function sideAv(h){
  h = String(h || "").replace(/^#\/?/, "").toLowerCase();
  if(SIDER.indexOf(h) >= 0) return h;
  if(h === "learn" || /^uke[1-4]$/.test(h) || h === "dohr" || h === "kart") return "academy";
  if(h === "call" || h === "sawal" || h === "intro") return "ghar";
  if(/^(risk|reg-gate|sonic|historikk|kalk|konto|uttak)$/.test(h)) return "paisa";
  if(/^(mer|mk|faq|journal)$/.test(h)) return "mazeed";
  return null;
}
function visSide(n, opp){
  opp = opp || {};
  if(SIDER.indexOf(n) < 0) n = "ghar";
  side = n;
  SIDER.forEach(s => { const e = $("#side-" + s); if(e) e.hidden = s !== n; });
  document.querySelectorAll("#bar button").forEach(b => { if(b.dataset.side === n) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
  if(opp.hash !== false){ try{ history.replaceState(null, "", location.pathname + location.search + (n === "ghar" ? "" : "#" + n)); }catch(e){} }
  if(!opp.behold) window.scrollTo(0, 0);
}
function tegnBar(){
  if(!T || !T.nav) return;
  document.querySelectorAll("#bar button").forEach(b => { const sp = b.querySelector("span"); if(sp) sp.textContent = T.nav[b.dataset.side] || b.dataset.side; });
}
function startSider(Q){
  document.querySelectorAll("#bar button").forEach(b => b.addEventListener("click", () => visSide(b.dataset.side)));
  window.addEventListener("hashchange", () => {
    const s = sideAv(location.hash); if(!s) return;
    visSide(s, { hash: false, behold: true });
    const h = location.hash.replace(/^#/, ""); const e = SIDER.indexOf(h) < 0 && /^[A-Za-z][\w-]*$/.test(h) ? document.getElementById(h) : null;
    if(e) e.scrollIntoView({ block: "start" }); else window.scrollTo(0, 0);
  });
  /* Første besøk (onboarding) viser bare Ghar og skjuler menyen – da må stedet også være Ghar, ellers står medlemmet på
     Academy uten forsidens ene handling (målt 21.10 med fersk profil og #academy-lenke). */
  const s0 = erFoerstegang() ? "ghar" : (sideAv(location.hash) || (Q && Q.get("lek") ? "academy" : "ghar"));   /* ?lek= åpner leksjonen over Academy, så lukk lander der */
  visSide(s0, { hash: false, behold: true });
  const h0 = location.hash.replace(/^#/, ""); const e0 = SIDER.indexOf(h0) < 0 && /^[A-Za-z][\w-]*$/.test(h0) ? document.getElementById(h0) : null;
  if(e0) setTimeout(() => e0.scrollIntoView({ block: "start" }), 60);
}

/* ---------- B-055 Paisa: forstå → sjekke → regne → gjøre → få ut ----------
   Oversikten er fem rader med ett SANT svar hver (tall fra kilden), så medlemmet ser hele pengehistorien på tre sekunder
   før noe trykkes. Detaljene åpner i samme overlay som Kalkulator/Journal (verktoyHode): én måte inn, én måte tilbake.
   Innholdet er hubens (innhold.json.paisa, portert 21.10) – utseendet er appens. Ingen råd, ingen løfter (B-030). */
/* Paisa-innholdet (300 KB rå) ligger i paisa.json og hentes første gang noen går inn i en Paisa-/Mazeed-detalj –
   første skjerm skal ikke bære det på dårlig nett. Oversikten trenger bare tallene i C.paisa_kort. */
function PA(){ return (C && C.paisa) || null; }
let paisaLovnad = null;
function hentPaisa(){
  if(C && C.paisa) return Promise.resolve(C.paisa);
  /* Én fil per språk (tools/lag_paisa.py): 20–26 KB gzip i stedet for 161 KB med alle seks språkene. */
  if(!paisaLovnad){ const sp = L; paisaLovnad = fetch("paisa/" + sp + ".json").then(r => { if(!r.ok) throw new Error("paisa " + r.status); return r.json(); }).then(j => { if(sp === L) C.paisa = j; return j; }).catch(e => { paisaLovnad = null; throw e; }); }
  return paisaLovnad;
}
/* Åpner en detalj når innholdet er der; på tregt nett vises en rolig «henter»-linje i overlayet, aldri en tom skjerm. */
function medPaisa(tittel, tegn){
  if(C && C.paisa) return tegn();
  const v = verktoyHode(tittel), w = el("div", "vt"); v.append(w); w.append(el("p", "under", T.henter || "…"));
  hentPaisa().then(tegn).catch(() => { w.innerHTML = ""; w.append(el("p", "under", T.nett_feil || T.henter || "…")); });
}
/* Teksten er alt på medlemmets språk (paisa/<språk>.json) – én streng. Eldre form {ur_rm, en …} tåles fortsatt. */
function tx(o){ return o == null ? "" : typeof o === "string" ? o : (o[L] || o.ur_rm || o.en || ""); }
/* Én linje under navnet: første setning eller setningsledd, aldri et avsnitt. */
function forste(t){ t = String(t || ""); const k = t.search(/[.;:۔]/); return (k > 0 ? t.slice(0, k) : t).trim(); }
function pRad(id, navn, linje, aapne){
  const b = el("button", "rad-lenke paisa-rad"); b.type = "button"; b.id = "p-" + id;
  const t = el("span", "p-t"); t.append(el("b", "", navn), el("small", "", linje)); b.append(t);
  const c = document.createElementNS("http://www.w3.org/2000/svg", "svg"); c.setAttribute("class", "ik"); const u = document.createElementNS("http://www.w3.org/2000/svg", "use"); u.setAttribute("href", "#i-next"); c.append(u); b.append(c);
  b.addEventListener("click", aapne); return b;
}
function tegnPaisa(){
  const w = $("#paisa-inn"), k = (C && C.paisa_kort) || {}; if(!w || !T) return;
  w.innerHTML = "";
  const m = k.maaneder || 0, st = k.stats || [];
  w.append(el("h2", "", T.paisa_t));
  w.append(
    pRad("sonic", "Sonic", T.p_sonic_linje, visSonic),
    pRad("historikk", T.p_historikk, (T.p_hist_linje || "").replace("{m}", m).replace("{total}", st[0] || "").replace("{dip}", st[2] || ""), visHistorikk),
    pRad("kalk", T.kalk, forste(T.kalk_u), visKalk),
    pRad("konto", T.p_konto, (T.p_konto_linje || "{n}/{N}").replace("{n}", kontoFerdig().length).replace("{N}", k.steg_n || 10), visKonto),
    pRad("uttak", T.p_uttak, T.p_uttak_linje || "", visUttak)
  );
}
function visSonic(){ if(!PA()) return medPaisa("Sonic", visSonic);
  const p = PA().sonic, pr = (p.produkter || [])[0] || {}, v = verktoyHode("Sonic"), w = el("div", "vt"); v.append(w);
  w.append(el("p", "lede", tx(pr.desc)));
  const ul = el("ul", "fakta"); (pr.facts || []).forEach(f => ul.append(el("li", "", tx(f)))); w.append(ul);
  w.append(el("p", "risiko", T.p_risiko));
  const b = el("button", "knapp", T.p_se_historikk); b.type = "button"; b.addEventListener("click", visHistorikk); w.append(b);
  const amp = amplifyBlokk(false); if(amp) w.append(amp);   /* hvordan Sonic faktisk settes opp – 12×/24×, avvikling */
  w.append(el("p", "under", tx(p.mer_d)));
}
function visHistorikk(){ if(!PA()) return medPaisa(T.p_historikk, visHistorikk);
  const h = PA().historikk, v = verktoyHode(T.p_historikk), w = el("div", "vt"); v.append(w);
  w.append(el("p", "lede", tx(h.lede)));
  const g = el("div", "tall5"); (h.stats || []).forEach((verdi, i) => { const c = el("div", "tall"); c.append(el("b", "", verdi), el("small", "", tx((h.stats_navn || [])[i]))); g.append(c); }); w.append(g);
  const bars = el("div", "soyler"), ms = h.months || [], maks = Math.max(0.01, ...ms.map(x => Math.abs(+x[1] || 0)));
  ms.forEach(x => { const b = el("i", +x[1] < 0 ? "tap" : ""); b.style.height = Math.round(Math.abs(+x[1]) / maks * 100) + "%"; b.title = x[0] + " " + x[1] + " %"; bars.append(b); });
  w.append(bars);
  const lg = el("p", "under"); (h.legend || []).forEach((t, i) => lg.append(el("span", "", (i ? " · " : "") + tx(t)))); w.append(lg);
  (h.notes || []).forEach(n => w.append(el("p", "note", tx(n))));
  if(h.kilde){ const a = el("a", "kilde", T.p_kilde + ": Myfxbook"); a.href = h.kilde; a.target = "_blank"; a.rel = "noopener noreferrer"; w.append(a); }
}
/* Konto: ti steg som sjekkliste. Leser hubens aimpire.done (samme origin) så ingen mister det de alt har gjort. */
function kontoFerdig(){
  let mine = LS.get("konto", []);
  if(!mine.length){ try{ const g = (localStorage.getItem("aimpire.done") || "").split(",").filter(Boolean).map(Number).filter(n => n >= 0); if(g.length){ mine = g; LS.set("konto", mine); } }catch(e){} }
  return mine;
}
/* Konto: liste med faser; hvert steg = rad som åpner detalj. Avkrysning skjer i detaljen («Yeh ho gaya»), ikke på lista. */
function visKonto(){ if(!PA()) return medPaisa(T.p_konto, visKonto);
  const p = PA(), d = p.steg_detalj, v = verktoyHode(T.p_konto), w = el("div", "vt"); v.append(w);
  w.append(el("p", "under", tx(d.lede)));
  const ferdig = kontoFerdig();
  (d.phases || []).forEach(f => {
    w.append(el("h3", "fase", tx(f.navn)));
    const ol = el("ol", "steg");
    for(let i = f.fra; i <= f.til; i++){
      const st = d.steps[i]; if(!st) continue;
      const li = el("li", ferdig.indexOf(i) >= 0 ? "ok" : ""), b = el("button", "", ""); b.type = "button";
      b.append(el("span", "nr", String(i + 1)), el("span", "", tx(st.tittel)));
      const c = document.createElementNS("http://www.w3.org/2000/svg", "svg"); c.setAttribute("class", "ik"); const u = document.createElementNS("http://www.w3.org/2000/svg", "use"); u.setAttribute("href", "#i-next"); c.append(u); b.append(c);
      b.addEventListener("click", () => visSteg(i));
      li.append(b); ol.append(li);
    }
    w.append(ol);
  });
}
/* Ett steg: tittel · hva du gjør (HVOR står først i teksten, slik huben skriver den) · merknad · «sjekk deg selv» · quiz · «Yeh ho gaya». */
function visSteg(i){ if(!PA()) return medPaisa(T.p_konto, () => visSteg(i));
  const d = PA().steg_detalj, st = d.steps[i], v = verktoyHode((i + 1) + ". " + tx(st.tittel)), w = el("div", "vt"); v.append(w);
  /* Hver linje i hubens tekst er én instruksjon. Som nummererte delsteg kan de skannes på en telefon; som ett avsnitt
     er de en vegg (founder 18:28 om huben: «rotete og vondt i hodet»). Detaljene (nettverk, gebyr) ligger bak «Tafseel». */
  const linjer = tx(st.tekst).split("\n").map(x => x.trim()).filter(Boolean);
  if(linjer.length > 1){ const ol = el("ol", "delsteg"); linjer.forEach(x => ol.append(el("li", "", x))); w.append(ol); }
  else linjer.forEach(x => w.append(el("p", "lede", x)));
  if(st.note){ const d = el("details", "faq tafseel"); d.append(el("summary", "", T.p_tafseel || "Details"), el("p", "", tx(st.note))); w.append(d); }
  if(st.check){ const c = el("div", "sjekk"); c.append(el("b", "", T.p_sjekk), el("p", "", tx(st.check))); w.append(c); }
  /* Hjelpen der medlemmet står fast: steg 6 = appene, steg 7 = kjøpe USDT (P2P), steg 8 = Sonic-innstillingene */
  const ekstra = i === 5 ? apperBlokk() : i === 6 ? p2pBlokk() : i === 7 ? amplifyBlokk(false) : i === 8 ? vekstBlokk() : null; if(ekstra) w.append(ekstra);
  /* Én primærhandling per skjerm (B-052): på stegene der lederens lenke er handlingen, blir «Yeh ho gaya» sekundær. */
  let harLenke = false;
  if(i === 2 || i === 0){ const reg = $("#reg"); if(reg && !reg.hidden && /^https?:/.test(reg.href || "")){ const a = el("a", "knapp", reg.textContent); a.href = reg.href; a.target = "_blank"; a.rel = "noopener noreferrer"; w.append(a); harLenke = true; } }
  if(st.quiz && st.quiz.q){
    const q = el("div", "quiz"); q.append(el("b", "", tx(d.quiz_t)), el("p", "", tx(st.quiz.q)));
    const valg = el("div", "valg");
    (st.quiz.a || []).forEach((alt, k) => { const b = el("button", "", tx(alt)); b.type = "button"; b.addEventListener("click", () => {
      Array.from(valg.children).forEach(x => x.classList.remove("riktig", "feil")); b.classList.add(k === st.quiz.right ? "riktig" : "feil");
      why.textContent = tx(st.quiz.why) + (k === st.quiz.right ? "" : " " + tx(d.quiz_again)); }); valg.append(b); });
    const why = el("p", "under", ""); q.append(valg, why); w.append(q);
  }
  const f = kontoFerdig(), er = f.indexOf(i) >= 0;
  const done = el("button", "knapp" + ((er || harLenke) ? " sekund" : ""), er ? T.p_ferdig_angre : T.p_ferdig); done.type = "button";
  done.addEventListener("click", () => { const g = kontoFerdig(), k = g.indexOf(i); if(k >= 0) g.splice(k, 1); else g.push(i); LS.set("konto", g); tegnPaisa(); visKonto(); });
  w.append(done);
}

/* Verve (Mazeed, sist, valgfritt): det ærlige først, så flyten i tre, så de tre stegene. Tall er hubens, uverifisert → står med kilde-merke. */
function visVerve(){ if(!PA()) return medPaisa(T.p_verve, visVerve);
  const p = PA().verve, v = verktoyHode(tx(p.title)), w = el("div", "vt"); v.append(w);
  if(p.honest) w.append(el("p", "risiko", tx(p.honest)));
  w.append(el("p", "lede", tx(p.lede)));
  const fl = el("ol", "flyt"); (p.flow || []).forEach(x => { const li = el("li", ""); li.append(el("b", "", tx(x[0])), el("span", "", tx(x[1]))); fl.append(li); }); w.append(fl);
  if(p.flow_note) w.append(el("p", "under", tx(p.flow_note)));
  w.append(el("h3", "", tx(p.steps_t)));
  (p.steps || []).forEach((x, k) => { const b = el("div", "sjekk"); b.append(el("b", "", (k + 1) + ". " + tx(x[0])), el("p", "", tx(x[1]))); w.append(b); });
  w.append(el("p", "note", T.p_uverifisert));
  const mer = el("button", "knapp sekund", T.p_ib_mer); mer.type = "button"; mer.addEventListener("click", visIb); w.append(mer);
}
function visIb(){ if(!PA()) return medPaisa(T.p_ib, visIb);
  const p = PA().ib, b = PA().bonuser, e = PA().inntekt, v = verktoyHode(T.p_ib), w = el("div", "vt"); v.append(w);
  if(e && e.warning) w.append(el("p", "risiko", tx(e.warning)));
  w.append(el("p", "lede", tx(p.lede)));
  (p.blocks || []).forEach(x => { const d = el("details", "faq"); d.append(el("summary", "", tx(x.tittel)), el("p", "", tx(x.tekst))); w.append(d); });
  if(p.unverified) w.append(el("p", "note", tx(p.unverified)));
  if(b){ w.append(el("h3", "", T.p_bonuser), el("p", "under", tx(b.lede)));
    (b.items || []).forEach(x => { const d = el("details", "faq"); d.append(el("summary", "", tx(x.navn))); const pp = el("p", ""); pp.append(el("b", "", tx(b.labels[0]) + ": "), document.createTextNode(tx(x.faar) + "\n"), el("b", "", tx(b.labels[1]) + ": "), document.createTextNode(tx(x.krever))); d.append(pp); w.append(d); });
    if(b.note) w.append(el("p", "note", tx(b.note))); }
}

function visUttak(){ if(!PA()) return medPaisa(T.p_uttak, visUttak);
  const p = PA().uttak, v = verktoyHode(T.p_uttak), w = el("div", "vt"); v.append(w);
  w.append(el("p", "lede", tx(p.lede)));
  (p.parts || []).forEach(d => { w.append(el("h3", "", tx(d.tittel)), el("p", "", tx(d.tekst))); });
  w.append(el("p", "note", tx(p.facts)));
}
function visFaq(){ if(!PA()) return medPaisa(T.p_faq, visFaq);
  const p = PA().faq, v = verktoyHode(T.p_faq), w = el("div", "vt"); v.append(w);
  w.append(el("p", "under", tx(p.lede)));
  (p.items || []).forEach(q => { const d = el("details", "faq"); d.append(el("summary", "", tx(q.q)), el("p", "", tx(q.a))); w.append(d); });
}

/* ---------- B-055: hjelpen der medlemmet står fast ----------
   P2P (kjøpe USDT) bor i steg 7, appene i steg 6, Sonic-innstillingene (Amplify) i Sonic og steg 8. Ikke egne sider tre
   trykk unna: «knapp der handlingen er». Hver av dem er en sammenleggbar blokk, så steget selv står øverst. */
function hjelpBlokk(tittel, fyll, aapen){
  const d = el("details", "faq hjelp"); if(aapen) d.open = true;
  d.append(el("summary", "", tittel)); const inn = el("div", "hjelp-inn"); fyll(inn); d.append(inn); return d;
}
function lenke(tekst, url){ const a = el("a", "kilde", tekst); a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; return a; }
function p2pBlokk(){
  const p = PA().p2p; if(!p || !p.tekst || !p.tekst.title) return null;   /* finnes på ur_rm/ur/hi – ellers ingen blokk */
  return hjelpBlokk(p.tekst.title, inn => {
    if(p.tekst.lede) inn.append(el("p", "", p.tekst.lede));
    const ol = el("ol", "hjelp-steg"); (p.tekst.steps || []).forEach(st => { if(!st || !st[0]) return; const li = el("li", ""); li.append(el("b", "", st[0]));
      (Array.isArray(st[1]) ? st[1] : [st[1]]).filter(Boolean).forEach(t => li.append(el("p", "", t))); ol.append(li); }); inn.append(ol);
    if(p.video) inn.append(lenke(p.tekst.watch || "YouTube", p.video));
  });
}
function apperBlokk(){
  const a = PA().apper; if(!a || !a.tekst) return null;
  const t = a.tekst, android = /Android/.test(navigator.userAgent || "");
  return hjelpBlokk(T.p_apper || t.lede, inn => {
    if(t.lede) inn.append(el("p", "", t.lede));
    (a.list || []).forEach(x => { const r = el("div", "app-rad"); r.append(el("b", "", x.name)); if(t[x.key]) r.append(el("p", "", t[x.key]));
      const u = android ? x.android : x.ios; if(u) r.append(lenke(android ? "Google Play" : "App Store", u)); inn.append(r); });
    if(t.warn) inn.append(el("p", "risiko", t.warn));
  });
}
function amplifyBlokk(aapen){
  const a = PA().amplify; if(!a || !a.items) return null;
  return hjelpBlokk(T.p_amplify || a.items[0].tittel, inn => {
    a.items.forEach((x, k) => {
      const d = el("details", "faq"); if(k === 0) d.open = true; d.append(el("summary", "", x.tittel), el("p", "", x.tekst)); inn.append(d);
      if(k === 1 && a.compare && a.compare.tekst){   /* hubens 12×/24×-tabell står etter punkt 2 */
        const c = a.compare, tb = el("table", "sammen"), hd = el("tr", ""); hd.append(el("th", "", ""), ...c.cols.map(h => el("th", "", h))); tb.append(hd);
        (c.tekst.rows || []).forEach(r => { const tr = el("tr", ""); r.forEach((v, i) => tr.append(el(i ? "td" : "th", "", v))); tb.append(tr); });
        const w = el("div", "tabell-rull"); w.append(el("b", "", c.tekst.title), tb, el("p", "note", c.tekst.note)); inn.append(w);
      }
    });
  }, aapen);
}
function visHalal(){ if(!PA()) return medPaisa(T.p_halal, visHalal);
  const h = PA().halal.innhold, v = verktoyHode(h.title), w = el("div", "vt"); v.append(w);
  w.append(el("p", "lede", h.lede)); (h.items || []).forEach(x => { const r = el("div", "sjekk"); r.append(el("b", "", (x[0] ? x[0] + " " : "") + x[1]), el("p", "", x[2])); w.append(r); });
}
function visJuridisk(){ if(!PA()) return medPaisa(T.p_juridisk, visJuridisk);
  const j = PA().juridisk, v = verktoyHode(j.legal_more || T.p_juridisk), w = el("div", "vt"); v.append(w);
  w.append(el("p", "risiko", j.risk)); w.append(el("p", "", j.legal));
  const vd = PA().verdier; if(vd && vd.innhold){ const g = el("div", "verdier"); vd.innhold.forEach(x => { const r = el("div", "verdi"); r.append(el("b", "", x[0]), el("span", "", x[1]), el("p", "", x[2])); g.append(r); }); w.append(g); }
}
/* Madad: når medlemmet står fast – spør sponsoren (ferdig melding), meglerens egne hjelpesider, videoer som finnes. */
function visMadad(){ if(!PA()) return medPaisa(T.p_madad, visMadad);
  const P0 = PA(), v = verktoyHode(T.p_madad), w = el("div", "vt"); v.append(w);
  [P0.hjelp, P0.dokumenter, P0.video].forEach(g => { if(!g) return; const rader = (g.lenker || []).filter(x => x.url);
    if(!rader.length) return; w.append(el("h3", "", g.tittel));
    rader.forEach(x => { const [tt, und] = x.tekst || [];
      if(x.url === "__ASK__"){ const b = el("button", "rad-lenke", ""); b.type = "button"; const sp = el("span", "p-t"); sp.append(el("b", "", tt), el("small", "", und || "")); b.append(sp);
        b.addEventListener("click", () => { const ld = LS.get("leder", null); delLenke(location.origin + location.pathname, (T.p_spor_sponsor || "") + (ld && ld.name ? " (" + ld.name + ")" : "")); }); w.append(b); return; }
      const a = el("a", "rad-lenke", ""); a.href = x.url; a.target = "_blank"; a.rel = "noopener noreferrer"; const sp = el("span", "p-t"); sp.append(el("b", "", tt), el("small", "", und || "")); a.append(sp); w.append(a); });
  });
}

/* ---------- B-055: regneverktøyene fra huben – samme formler, appens form ----------
   Tall skrives med latinske sifre og isoleres LTR. Gullprisen er ikke live (ingen ekstern henting på dårlig nett):
   feltet forhåndsutfylles med appens referansepris, og etiketten sier «se prisen i appen din». */
const tall = v => { const t = String(v == null ? "" : v).replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[$\s]/g, "").replace(/,(?=\d{3}\b)/g, "").replace(",", "."); const n = parseFloat(t); return isFinite(n) ? n : NaN; };
const kr = n => (Math.abs(n) < 100 ? n.toFixed(2) : Math.round(n).toLocaleString("en-US"));
function felt(lab, v0, attrs){ const l = el("label", "vfelt"), i = document.createElement("input"); i.inputMode = "decimal"; i.value = v0; Object.assign(i, attrs || {}); l.append(el("span", "", lab), i); return { l, i }; }
function gullPris(){ return (I_PAIRS && I_PAIRS.XAUUSD && I_PAIRS.XAUUSD.pris) || 4000; }

/* Margin: verdi = lot × 100 × pris · margin = verdi ÷ leverage · effekt per $1 = lot × 100 */
function marginBlokk(){
  const m = PA() && PA().margin; if(!m) return null;
  const t = m.tekst, w = el("section", "vt-del"); w.append(el("h3", "", t.title), el("p", "under", t.lede));
  let lot = m.standard.lots, lev = m.standard.leverage;
  const pris = felt(T.p_gull_pris || t.price, String(gullPris()));
  const lots = el("div", "prad"), levs = el("div", "prad"), ut = el("div", "tall5");
  const regn = () => { const p0 = tall(pris.i.value); ut.innerHTML = ""; if(!(p0 > 0)) return;
    const verdi = lot * 100 * p0, marg = verdi / lev, flytt = lot * 100;
    [[t.out_margin, "$" + kr(marg)], [t.out_val, "$" + kr(verdi)], [t.out_move, (t.move_v || "{X}").replace("{X}", "$" + kr(flytt))]].forEach(([a, b]) => { const c = el("div", "tall"); c.append(el("b", "", b), el("small", "", a)); ut.append(c); }); };
  const knapper = (rad, verdier, nå, sett) => verdier.forEach(([v, lab]) => { const b = el("button", v === nå() ? "on" : "", lab); b.type = "button"; b.addEventListener("click", () => { sett(v); Array.from(rad.children).forEach(c => c.classList.toggle("on", c === b)); regn(); }); rad.append(b); });
  knapper(lots, m.standard.lot_knapper.map(v => [v, String(v)]), () => lot, v => { lot = v; });
  knapper(levs, (t.levs || []).map(x => [x[0], x[1]]), () => lev, v => { lev = v; });
  pris.i.addEventListener("input", regn);
  w.append(el("small", "", t.lots), lots, el("small", "", t.lev), levs, pris.l, ut); regn(); return w;
}

/* Fibonacci: H > L > 0 · R = 0 · .236 · .382 · .5 · .618 · .786 · 1 · opp: H − (H−L)·r · ned: L + (H−L)·r */
function visFib(){ if(!PA()) return medPaisa("Fibonacci", visFib);
  const f = PA().fib, t = f.tekst, v = verktoyHode(t.title), w = el("div", "vt"); v.append(w);
  w.append(el("p", "under", t.lede));
  const g = gullPris(), hi = felt(t.hi, String(Math.round(g * 1.012))), lo = felt(t.lo, String(Math.round(g * 0.988)));
  let opp = true; const retn = el("div", "prad"); [[true, t.up], [false, t.down]].forEach(([k, lab]) => { const b = el("button", k ? "on" : "", lab); b.type = "button"; b.addEventListener("click", () => { opp = k; Array.from(retn.children).forEach(c => c.classList.toggle("on", c === b)); regn(); }); retn.append(b); });
  const liste = el("div", "fibliste");
  const regn = () => { const H = tall(hi.i.value), Lw = tall(lo.i.value); liste.innerHTML = ""; if(!(H > Lw && Lw > 0)) return;
    const dec = H - Lw < 20 ? 3 : 2;
    [0, .236, .382, .5, .618, .786, 1].forEach(r => { const pr = opp ? H - (H - Lw) * r : Lw + (H - Lw) * r, rad = el("div", "fibrad" + (r === .618 ? " on" : "")); rad.append(el("b", "", (r * 100).toFixed(1).replace(/\.0$/, "") + " %"), el("span", "", pr.toFixed(dec))); liste.append(rad); }); };
  [hi.i, lo.i].forEach(i => i.addEventListener("input", regn));
  w.append(hi.l, lo.l, el("small", "", t.dir), retn, liste, el("p", "note", t.note)); regn();
}

/* Tapsrekke: 1 000 kjøringer × 100 handler · vinn: b ·= 1 + r·rr · tap: b ·= 1 − r · mulberry32, frø 12345 · nytt frø bare ved
   «kjør igjen» eller endring. Viser median lengste tapsrekke, andel som falt til halvparten, andel som endte under start. */
function mulberry32(a){ return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function visTapsrekke(){ if(!PA()) return medPaisa(T.p_tapsrekke, visTapsrekke);
  const sr = PA().tapsrekke, t = sr.tekst, v = verktoyHode(t.title), w = el("div", "vt"); v.append(w);
  w.append(el("p", "under", t.lede));
  const fw = felt(t.win, String(sr.standard.win)), fr = felt(t.rr, String(sr.standard.rr)), fk = felt(t.risk, String(sr.standard.risk));
  let fro = 12345; const ut = el("div", "tall5"), fig = el("div", "kurver");
  const regn = () => {
    const W = Math.min(99, Math.max(1, tall(fw.i.value) || 50)) / 100, RR = Math.min(10, Math.max(0.1, tall(fr.i.value) || 1)), R = Math.min(50, Math.max(0.1, tall(fk.i.value) || 2)) / 100;
    const rnd = mulberry32(fro), rekker = [], kurver = []; let halv = 0, under = 0; const med = Array.from({ length: 101 }, () => []);
    for(let k = 0; k < 1000; k++){ let b = 1, lav = 1, r0 = 0, maks = 0; const kurve = [1];
      for(let n = 0; n < 100; n++){ if(rnd() < W){ b *= 1 + R * RR; r0 = 0; } else { b *= 1 - R; r0++; if(r0 > maks) maks = r0; } if(b < lav) lav = b; kurve.push(b); med[n + 1].push(b); }
      med[0].push(1); rekker.push(maks); if(lav <= 0.5) halv++; if(b < 1) under++; if(k < 24) kurver.push(kurve); }
    const midt = a => { const x = a.slice().sort((p, q) => p - q); return x[Math.floor(x.length / 2)]; };
    ut.innerHTML = "";
    [[String(midt(rekker)), t.streak], [(halv / 10).toFixed(1) + " %", t.dd50], [Math.round(under / 10) + " %", t.end_below]].forEach(([a, b]) => { const c = el("div", "tall"); c.append(el("b", "", a), el("small", "", b)); ut.append(c); });
    /* 24 kurver på log-skala, linjer ved 100 % og 50 %, medianen tykk */
    const Wd = 320, Hd = 150, alle = kurver.flat(), lo = Math.log(Math.max(0.02, Math.min(...alle, 0.5))), hiL = Math.log(Math.max(...alle, 1.2));
    const y = b => Hd - (Math.log(Math.max(b, 0.02)) - lo) / (hiL - lo) * Hd, x = n => n / 100 * Wd;
    const sti = k => k.map((b, n) => (n ? "L" : "M") + x(n).toFixed(1) + " " + y(b).toFixed(1)).join("");
    const NS = "http://www.w3.org/2000/svg", svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", `0 0 ${Wd} ${Hd}`); svg.setAttribute("role", "img");
    const linje = (b, kl) => { const l = document.createElementNS(NS, "line"); l.setAttribute("x1", 0); l.setAttribute("x2", Wd); l.setAttribute("y1", y(b)); l.setAttribute("y2", y(b)); l.setAttribute("class", kl); svg.append(l); };
    linje(1, "ref"); linje(0.5, "ref tap");
    kurver.forEach(k => { const pth = document.createElementNS(NS, "path"); pth.setAttribute("d", sti(k)); pth.setAttribute("class", "kurve"); svg.append(pth); });
    const m = document.createElementNS(NS, "path"); m.setAttribute("d", sti(med.map(midt))); m.setAttribute("class", "median"); svg.append(m);
    fig.innerHTML = ""; fig.append(svg);
  };
  [fw.i, fr.i, fk.i].forEach(i => i.addEventListener("input", () => { fro = (Math.random() * 4294967296) >>> 0; regn(); }));
  const igjen = el("button", "knapp sekund", t.run); igjen.type = "button"; igjen.addEventListener("click", () => { fro = (Math.random() * 4294967296) >>> 0; regn(); });
  w.append(fw.l, fr.l, fk.l, ut, fig, igjen, el("p", "note", t.note)); regn();
}

/* Vekst (steg 9): diff = nå − innskudd · pct = diff ÷ innskudd · lagres ikke */
function vekstBlokk(){
  const g = PA() && PA().vekst; if(!g) return null; const t = g.tekst;
  return hjelpBlokk(t.title, inn => {
    inn.append(el("p", "", t.lede));
    [[t.portal_t, t.portal], [t.mt5_t, t.mt5]].forEach(([tt, st]) => { if(!st) return; inn.append(el("b", "", tt)); const ol = el("ol", "hjelp-steg"); st.forEach(x => ol.append(el("li", "", x))); inn.append(ol); });
    inn.append(el("b", "", t.calc_t)); const dep = felt(t.dep, ""), bal = felt(t.bal, ""), svar = el("p", "lede", t.need || "");
    const regn = () => { const D = tall(dep.i.value), B = tall(bal.i.value); if(!(D > 0) || isNaN(B)){ svar.textContent = t.need || ""; return; }
      const diff = B - D, pct = diff / D * 100, P = Math.abs(pct) < 0.05 ? "0" : Math.abs(pct).toFixed(1);
      svar.textContent = Math.abs(diff) < 0.005 ? t.even : (diff > 0 ? t.up : t.down).replace("{D}", "$" + kr(Math.abs(diff))).replace("{P}", P); };
    [dep.i, bal.i].forEach(i => i.addEventListener("input", regn)); inn.append(dep.l, bal.l, svar);
    if(t.warn) inn.append(el("p", "risiko", t.warn)); if(t.note) inn.append(el("p", "note", t.note));
  });
}

/* ---------- B-055 verve-inngang (?l=…&v=1) og daglig bruk ----------
   Hvem inviterte deg → hva det er → tre sannheter du kan sjekke selv → ÉN knapp: kontoen, steg for steg → «er dette svindel?» besvart ærlig på stedet. Bare lenker med v=1; vanlige lenker beholder B-053 (lær først). */
function ervVerve(){ return Q.get("v") === "1" && !!LS.get("leder", null); }
function tegnVerve(){
  const boks = $("#verve"); if(!boks) return;
  const paa = ervVerve();   /* også ved første besøk – det er nettopp da en ny person kommer fra lederens lenke */
  boks.hidden = !paa; document.body.classList.toggle("verve", paa);
  if(!paa || !T) return;
  const ld = LS.get("leder", null) || {}, navn = ld.navn || ld.name || "";
  boks.innerHTML = "";
  boks.append(el("h1", "", (T.v_h1 || "{N}").replace("{N}", navn)), el("p", "lede", T.v_lede));
  const ul = el("ul", "sannheter");
  /* Tillitslinja («vi ber aldri om passord eller penger») står alt rett over – her tre ANDRE ting medlemmet kan sjekke selv. */
  [T.v_sann1.replace("{N}", navn), T.v_sann2, (T.v_sann3 || "").replace("{p}", C.risk_prosent)].forEach(t => { if(t) ul.append(el("li", "", t)); });
  boks.append(ul);
  const cta = el("button", "knapp", (T.v_cta || "").replace("{N}", navn)); cta.type = "button";
  cta.addEventListener("click", () => { markerFoerste(); tegnHjem(); visSide("paisa"); visKonto(); });   /* valget er tatt: full app + bunnmeny */
  const laer = el("button", "tekst-lenke", T.v_laer); laer.type = "button";
  laer.addEventListener("click", () => { const i = ALLE().findIndex(x => x.id === "pip"); if(i >= 0) apne(i); });
  boks.append(cta, laer);
  /* «Kya yeh dhoka hai?» – svaret er hubens FAQ #1, hentet når det åpnes */
  const d = el("details", "faq dhoka"); d.append(el("summary", "", T.v_dhoka_t));
  const svar = el("p", "", ""); d.append(svar);
  d.addEventListener("toggle", () => { if(!d.open || svar.textContent) return; svar.textContent = T.henter || "…";
    hentPaisa().then(p => { const q = (p.faq.items || [])[0]; svar.textContent = q ? tx(q.a) : ""; }).catch(() => { svar.textContent = T.nett_feil || ""; }); });
  boks.append(d);
}

function forfalteIdag(){ const f = frem(), nu = Date.now(); return ALLE().map((x, i) => ({ x, i, st: f[x.id] })).filter(o => o.st && o.st.riktig && o.st.neste && o.st.neste <= nu); }

/* ---------- hjem ---------- */
function frem(){ return LS.get("frem", {}); }
function tegnHjem(){
  document.body.classList.toggle("onboarding", erFoerstegang());
  tegnBar(); tegnPaisa();
  tegnLeder(); tegnCall();
  /* Trust foyer: brand · tillit · én overskrift · én Academy-CTA. Første besøk: kortere lede. */
  $("#intro-t").textContent = T.intro_t;
  $("#intro-u").textContent = erFoerstegang() && T.intro_u_ny ? T.intro_u_ny : T.intro_u;
  tegnKalWapisHjem();
  tegnFoyerCta();
  tegnFoyerRisk();
  tegnKundePorter();
  tegnSawal();
  $("#trygg").textContent = T.trygg; $("#uke-t").textContent = T.hafta; $("#uke-u").textContent = T.hafta_under;
  $("#dohr-t").textContent = T.dohrana; $("#dohr-u").textContent = T.dohrana_under; $("#frem-t").textContent = T.frem;
  $("#risk-t").textContent = T.risk_t; $("#risk-b").textContent = T.risk_b.replace("{n}", C.risk_prosent); $("#risk-k").textContent = T.risk_k;
  $("#mer-t").textContent = T.mer; if($("#l-kalk span")) $("#l-kalk span").textContent = T.kalk; $("#l-journal span").textContent = T.journal;
  if($("#l-faq span")) $("#l-faq span").textContent = T.p_faq || "FAQ";
  if($("#l-verve span")) $("#l-verve span").textContent = T.p_verve || "";
  [["#l-halal span", T.p_halal], ["#l-madad span", T.p_madad], ["#l-juridisk", T.p_juridisk], ["#l-tapsrekke span", T.p_tapsrekke], ["#l-fib span", "Fibonacci"], ["#mg-laer", T.mg_laer], ["#mg-madad", T.mg_madad], ["#mg-apna", T.mg_apna], ["#mg-dost", T.mg_dost]].forEach(([id, t]) => { const e = $(id); if(e && t) e.textContent = t; });
  if($("#l-gjen span")) $("#l-gjen span").textContent = T.gjen || "";
  if($("#l-ios span")) $("#l-ios span").textContent = T.ios_hjem || "";
  /* #247: unlocked leaders see toolbox label; others see entry label */
  $("#l-ledere span").textContent = (LS.get("me", null) && T.ld.kit) ? T.ld.kit : T.ld.t;
  $("#l-del span").textContent = T.del;
  const lg = $("#l-guide"); if(lg){ lg.querySelector("span").textContent = T.mer_guide || "Guide"; lg.href = hubGuideUrl(LS.get("leder", null)); }
  if(lg && !lg.dataset.bundet){ lg.dataset.bundet = "1"; lg.addEventListener("click", () => { LS.set("guide_sett", true); const e = $("#foyer-guide-tilbake"); if(e) e.hidden = true; }); }
  $("#fot").textContent = T.fot; $("#bytt").textContent = T.bytt;
  const f = frem(); let naa = ALLE().findIndex(x => !(f[x.id] && f[x.id].riktig)), offset = 0;
  UKER().forEach((k, n) => {
    const nr = n ? String(n + 1) : "", laast = ukeLaast(n), sk = $("#skinne" + nr); if(!sk) return;
    if(n){ $("#uke" + nr + "-t").textContent = T["hafta" + nr]; $("#uke" + nr + "-u").textContent = laast ? (T["laast" + nr] || T.laast) : T["hafta" + nr + "_under"]; $("#uke" + nr).classList.toggle("laast", laast); }
    tegnSkinne(sk, C[k], offset, naa, f, laast);
    const fr = $("#frem" + (n + 1)); if(fr){ const ok = C[k].filter(x => f[x.id] && f[x.id].riktig).length; fr.hidden = laast; fr.querySelector("i").style.width = Math.round(100 * ok / C[k].length) + "%"; fr.querySelector(".tall").textContent = ok + " / " + C[k].length; }
    if(!laast && ukeFerdig(n)){ const li = el("li", "node riktig"); li.append(el("div", "ferdig", T.ferdig_u)); sk.append(li); }
    offset += C[k].length;
  });
  if(erFoerstegang()) return; /* første besøk: uke 1 vises under handlingen; resten venter til første Academy-leksjon er åpnet */
  tegnMarked();
  tegnDohrana(); tegnKart(); tegnFigurer();
  tegnRegGate();
}
function tegnSkinne(sk, liste, offset, naa, f, laast){
  sk.innerHTML = "";
  liste.forEach((x, j) => {
    const i = offset + j, st = f[x.id] || {}, li = el("li", "node" + (st.riktig ? " riktig" : st.sett ? " sett" : "") + (i === naa && !laast ? " naa" : ""));
    const b = el("button", "leks"); b.type = "button"; b.disabled = laast;
    const tx = el("div", "tx"); tx.append(elx("b", "", x.t[L]));
    const sm = el("small"); sm.append(el("span", "ltr", x.min + " " + T.min)); if(st.riktig) sm.append(el("span", "", T.nivaa[2])); tx.append(sm);
    const ik = document.createElementNS("http://www.w3.org/2000/svg", "svg"); ik.setAttribute("class", "ik"); ik.innerHTML = '<use href="#' + (laast ? "i-lock" : st.riktig ? "i-check" : "i-play") + '"/>';
    b.append(el("span", "nr", String(j + 1)), tx, ik); if(!laast) b.addEventListener("click", () => apne(i)); li.append(b); sk.append(li);
  });
}
/* Markedet nå: samme timer som huben, i telefonens tid. Helg = fre 17:00 – søn 17:00 New York. */
function lokal(tz, d){ const p = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "numeric", minute: "numeric", weekday: "short", hour12: false }).formatToParts(d || new Date()); const g = k => (p.find(x => x.type === k) || {}).value || ""; return { wd: g("weekday"), h: parseInt(g("hour"), 10) % 24, m: parseInt(g("minute"), 10) }; }
function hm(mins){ mins = ((mins % 1440) + 1440) % 1440; return String(Math.floor(mins / 60)).padStart(2, "0") + ":" + String(mins % 60).padStart(2, "0"); }
function tegnMarked(){
  if(!T || !C.sesjoner) return;
  const n = new Date(), ny = lokal("America/New_York", n), helg = (ny.wd === "Fri" && ny.h >= 17) || ny.wd === "Sat" || (ny.wd === "Sun" && ny.h < 17);
  $("#mk-t").textContent = T.mk; $("#mk-u").textContent = T.mk_u;
  const g = $("#byer"); g.innerHTML = ""; const her = n.getHours() * 60 + n.getMinutes();
  const skift = tz => { const l = lokal(tz, n); return ((l.h * 60 + l.m) - her + 1440) % 1440; };
  C.sesjoner.byer.forEach(([navn, tz, a, b]) => {
    const l = lokal(tz, n), open = !helg && l.h >= a && l.h < b, d = el("div", "by" + (open ? " open" : ""));
    d.append(el("b", "", (T.byer || {})[navn] || navn), el("small", "ltr", hm(l.h * 60 + l.m)), el("i"), el("span", "st", open ? T.open : T.closed)); g.append(d);
  });
  let note;
  if(helg){
    let d = new Date(n); for(let i = 0; i < 80; i++){ const l = lokal("America/New_York", d); if(l.wd === "Sun" && l.h === 17) break; d = new Date(d.getTime() + 36e5); }
    d.setMinutes(0, 0, 0);
    note = T.weekend.replace("{T}", new Intl.DateTimeFormat(LOK(), { weekday: "long", hour: "2-digit", minute: "2-digit", hour12: false }).format(d));
  } else {
    const s = skift("Europe/London"); note = T.overlap.replace("{A}", hm(13 * 60 - s)).replace("{B}", hm(17 * 60 - s));
  }
  $("#mk-n").textContent = note;
}
function tegnKalWapisHjem(){
  if(!T) return;
  const foyer = $("#intro");
  let p = $("#kal-wapis");
  if(!p){
    p = el("p", "kal-wapis"); p.id = "kal-wapis";
    const cta = foyer && foyer.querySelector(".cta");
    if(cta) foyer.insertBefore(p, cta); else if(foyer) foyer.append(p);
  }
  /* Soft day-2: showed after first quiz answer, while a lesson is still open — never streak guilt. */
  const show = !!(harStartet() && ufullIndeks() >= 0 && LS.get("sist_svar", null) && T.kal_wapis);
  p.classList.toggle("skjul", !show);
  if(show){ p.textContent = ""; p.append(bidiTekst(T.kal_wapis)); }
  if(foyer) foyer.classList.toggle("dag2", show);
}
function tegnFoyerCta(){
  if(!T) return;
  const alle = ALLE();
  /* Daglig bruk: forfaller en repetisjon i dag, er DET den ene handlingen – repetisjon til rett tid husker bedre enn et nytt tema. */
  const due = !erFoerstegang() ? forfalteIdag() : [];
  if(due.length){
    const o = due[0], b0 = $("#foyer-cta"), h0 = $("#foyer-cta-hint");
    b0.textContent = ""; b0.append(el("span", "", (T.cta_dohr || "{t}").replace("{t}", o.x.t[L])), ikon("i-replay"));
    if(h0){ h0.textContent = (T.cta_dohr_hint || "").replace("{n}", due.length); h0.classList.remove("skjul"); }
    b0.onclick = () => apne(o.i, true); tegnGuideTilbake(); return;
  }
  let i = ufullIndeks(); if(i < 0) i = 0;
  const x = alle[i], btn = $("#foyer-cta"), hint = $("#foyer-cta-hint");
  const tittel = x ? (x.t[L] || T.hafta) : T.hafta;
  const mal = erFoerstegang() ? (T.cta_foyer || "Start Academy · {t}") : (T.cta_foyer_done || T.cta_foyer || "{t}");
  btn.textContent = ""; btn.append(el("span", "", mal.replace("{t}", tittel)), ikon("i-arrow"));
  if(hint){
    hint.textContent = x ? (T.cta_foyer_min || "{m} min").replace("{m}", String(x.min || 1)) : "";
    hint.classList.toggle("skjul", !x);
  }
  btn.onclick = () => {
    if(x){ const idx = alle.findIndex(y => y.id === x.id); if(idx >= 0){ apne(idx); return; } }
    markerFoerste(); tegnHjem();
    const uke = $("#uke1") || $("#skinne"); if(uke) uke.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  /* Call chip already in foyer HTML — refresh copy via tegnCall. */
  tegnGuideTilbake();
}
/* Cutover: hub-fremdrift («aimpire.done») uten at guiden er åpnet fra appen = medlemmet sto midt i guiden da appen kom på rot. */
function tegnGuideTilbake(){
  const e = $("#foyer-guide-tilbake"); if(!e || !T) return;
  let hadde = false;
  try{ hadde = !!(localStorage.getItem("aimpire.done") || "").trim() && !LS.get("guide_sett", false); }catch(err){}
  e.hidden = !hadde || !T.guide_tilbake;
  if(!e.hidden) e.textContent = T.guide_tilbake;
}
/* B-050 Jitsi: romnavn, join-URL, soft-fail hvis meet.jit.si er utilgjengelig (PK firewall), lokalt målespor. */
function jitsiRom(){
  const j = C.call || {};
  /* Romnavn med tilfeldig hale (founder: «må være sikkert») – et gjettbart navn slipper inn fremmede. Bindestrek er lov i Jitsi. */
  let rom = String(j.jitsi_rom || "").replace(/[^A-Za-z0-9-]/g, "");
  return rom || "AimpireCall-4bh36r";
}
function jitsiUrl(){
  const vert = String((C.call && C.call.jitsi_vert) || "meet.jit.si").replace(/[^A-Za-z0-9.-]/g, "") || "meet.jit.si";
  const rom = jitsiRom();
  const videoAv = !(C.call && C.call.jitsi_video_av === false);
  const hash = videoAv ? "#config.startWithVideoMuted=true&config.startWithAudioMuted=false" : "";
  return "https://" + vert + "/" + encodeURIComponent(rom) + hash;
}
function callMaal(){ return LS.get("callMaal", { forsok: [] }); }
function callMaalPush(ev){
  const m = callMaal(); m.forsok = (m.forsok || []).slice(-19);
  m.forsok.push(Object.assign({ ts: Date.now(), rom: jitsiRom(), lang: L }, ev));
  LS.set("callMaal", m);
  try{ console.info("[aimpire.call]", ev.kind || "event", ev); }catch(e){}
}
let jitsiProbe = { status: "pending", ms: null };   /* ok | fail | pending */
function probeJitsi(){
  const ms = (C.call && C.call.jitsi_probe_ms) || 4000;
  const t0 = Date.now();
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const to = setTimeout(() => { try{ if(ctrl) ctrl.abort(); }catch(e){} }, ms);
  const url = "https://" + String((C.call && C.call.jitsi_vert) || "meet.jit.si").replace(/[^A-Za-z0-9.-]/g, "") + "/";
  const opts = { method: "GET", mode: "no-cors", cache: "no-store" };
  if(ctrl) opts.signal = ctrl.signal;
  return fetch(url, opts).then(() => {
    clearTimeout(to); jitsiProbe = { status: "ok", ms: Date.now() - t0 };
    callMaalPush({ kind: "probe_ok", probe_ms: jitsiProbe.ms });
    tegnCallSoft();
  }).catch(() => {
    clearTimeout(to); jitsiProbe = { status: "fail", ms: Date.now() - t0 };
    callMaalPush({ kind: "probe_fail", probe_ms: jitsiProbe.ms });
    tegnCallSoft();
  });
}
function tegnCallSoft(){
  const soft = $("#call-soft"); if(!soft || !T) return;
  if(jitsiProbe.status === "fail"){
    soft.textContent = T.call_blokk || ""; soft.classList.remove("skjul"); soft.hidden = false;
  } else {
    soft.textContent = ""; soft.classList.add("skjul"); soft.hidden = true;
  }
}
function bindCallJoin(a, live){
  if(!a) return;
  a.href = jitsiUrl();
  a.setAttribute("rel", "noopener noreferrer");
  a.setAttribute("target", "_blank");
  a.onclick = e => {
    const t0 = Date.now();
    callMaalPush({ kind: "join_tap", live: !!live, probe: jitsiProbe.status, href: a.href });
    if(jitsiProbe.status === "fail"){
      /* Soft-fail: ikke blokker – vis tipset, la bruker likevel prøve (eller gå til gruppe). */
      tegnCallSoft();
      try{ toast(T.call_browser || T.call_blokk || ""); }catch(err){}
    }
    const onVis = () => {
      if(document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onVis);
      callMaalPush({ kind: "join_return", live: !!live, ms: Date.now() - t0, probe: jitsiProbe.status });
    };
    document.addEventListener("visibilitychange", onVis);
    setTimeout(() => document.removeEventListener("visibilitychange", onVis), 30 * 60 * 1000);
  };
}
function tegnCall(){
  if(!T) return;
  $("#call-t").textContent = T.call; $("#call-tid").textContent = T.call_tid; $("#call-lenke").textContent = T.call_link;
  $("#call-grp").textContent = T.grp; $("#call-grp").href = C.call.gruppe; $("#call-ics").textContent = T.ics; $("#call-ics").href = C.call.ics;
  const join = $("#call-join"); if(join){ join.textContent = T.call_join || T.call_naa; }
  const tip = $("#call-browser"); if(tip) tip.textContent = T.call_browser || "";
  const chipL = $("#foyer-call-l"); if(chipL) chipL.textContent = T.call;
  const n = new Date(), d = n.getUTCDay(), h = n.getUTCHours() + n.getUTCMinutes() / 60;
  let diff = ((C.call.ukedag - d) + 7) % 7; if(diff === 0 && h >= C.call.utc_time + 1.5) diff = 7;
  const neste = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() + diff, C.call.utc_time, 0, 0));
  const ms = neste - n, live = ms <= 0 && ms > -1.5 * 36e5;
  $("#call").classList.toggle("naa", live);
  bindCallJoin(join, live);
  /* #339: nedtellingen sto to ganger på forsiden (raden + kortet rett under). Raden vises bare i live-vinduet,
     der den faktisk gjør noe eget – én tydelig «bli med nå» øverst. Ellers bærer kortet alt. */
  const foyer = $("#foyer-call");
  if(foyer){
    foyer.hidden = !live;
    if(live){ bindCallJoin(foyer, true); }
    else { foyer.removeAttribute("target"); foyer.onclick = null; foyer.href = "#call"; foyer.setAttribute("rel", "noopener"); }
  }
  tegnCallSoft();
  tegnOppsum();
  let om;
  if(live){ om = T.call_naa; $("#call-om").textContent = om; const chip = $("#foyer-call-om"); if(chip) chip.textContent = om; return; }
  const hh = Math.floor(ms / 36e5), mm = Math.floor((ms % 36e5) / 6e4), dagerMellom = Math.round((new Date(neste.getFullYear(), neste.getMonth(), neste.getDate()) - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / DAG);
  om = dagerMellom <= 0 ? T.call_aaj.replace("{h}", hh).replace("{m}", mm) : dagerMellom === 1 ? T.call_kal.replace("{h}", hh) : T.call_dager.replace("{d}", dagerMellom);
  $("#call-om").textContent = om;
  const chip = $("#foyer-call-om"); if(chip) chip.textContent = om;
}
/* #337: forrige call på 5 minutter – nyeste i C.call.oppsummering. Lyd på appens språk (ur-sporet for ur og ur_rm); mangler lyd og tekst, vises ingenting. */
function tegnOppsum(){
  const w = $("#call-oppsum"); if(!w || !T) return;
  const o = ((C.call && C.call.oppsummering) || [])[0];
  w.innerHTML = "";
  const lydSp = (L === "ur" || L === "ur_rm") ? "ur" : L;
  const harLyd = !!(o && (o.spor || []).indexOf(lydSp) >= 0 && /^\d{4}-\d{2}-\d{2}$/.test(o.dato || ""));
  const tekst = o && o.tekst && (o.tekst[L] || "");
  if(!o || (!harLyd && !tekst)){ w.hidden = true; return; }
  w.hidden = false;
  w.append(el("h3", "", T.call_oppsum || "Last call"));
  let d = o.dato; try{ d = new Date(o.dato + "T12:00:00Z").toLocaleDateString(LOK(), { day: "numeric", month: "long" }); }catch(e){}
  w.append(el("p", "under", (T.call_oppsum_u || "{d}, {m} min").replace("{d}", d).replace("{m}", String(o.min || 5))));
  if(tekst){ const p = el("p", "oppsum-t"); p.append(bidiTekst(tekst)); w.append(p); }
  if(harLyd) w.append(lydKnapp(lydElement("lyd/call-" + o.dato + "-" + lydSp + ".mp3")));
}
function tegnSawal(){
  const f = frem(), liste = [];
  ALLE().forEach(x => { const st = f[x.id]; if(st && st.feil > 0 && !st.riktig) liste.push(T.sawal_feil.replace("{t}", x.t[L])); });
  const J = (T.jn || {}).feels || [], nu = Date.now(), jn = LS.get("journal", []).filter(e => e.closed && e.feel && e.ts > nu - 7 * DAG && J.indexOf(e.feel) > 0);
  if(jn.length){ const f0 = jn.reduce((m, e) => { m[e.feel] = (m[e.feel] || 0) + 1; return m; }, {}); const top = Object.keys(f0).sort((a, b) => f0[b] - f0[a])[0]; liste.push(T.sawal_jn.replace("{n}", f0[top]).replace("{f}", top.toLowerCase())); }
  const s = $("#sawal"); s.classList.toggle("skjul", !liste.length); if(!liste.length) return;
  $("#sawal-t").textContent = T.sawal_t; $("#sawal-u").textContent = T.sawal_u;
  const ol = $("#sawal-liste"); ol.innerHTML = ""; liste.forEach(x => ol.append(elx("li", "", x)));
  const k = $("#sawal-kopi"); k.textContent = T.sawal_kopi; k.onclick = () => { const txt = T.sawal_t + ":\n" + liste.map((x, i) => (i + 1) + ". " + x).join("\n"); navigator.clipboard.writeText(txt).then(() => toast(T.kopiert)).catch(() => window.prompt("", txt)); };
}
function tegnDohrana(){
  const f = frem(), nu = Date.now(), liste = $("#dohr-liste"); liste.innerHTML = "";
  const due = ALLE().map((x, i) => ({ x, i, st: f[x.id] })).filter(o => o.st && o.st.riktig && o.st.neste && o.st.neste <= nu);
  if(!due.length){ liste.append(el("p", "tom", T.dohrana_tom)); return; }
  const sk = el("ol", "skinne");
  due.forEach(o => { const li = el("li", "node sett"), b = el("button", "leks"); b.type = "button"; const tx = el("div", "tx"); tx.append(el("b", "", o.x.t[L]), el("small", "", T.sawal)); b.append(el("span", "nr", String(o.i + 1)), tx); b.addEventListener("click", () => apne(o.i, true)); li.append(b); sk.append(li); });
  liste.append(sk);
}
function tegnKart(){
  const f = frem(), k = $("#kart"); k.innerHTML = "";
  synlige().forEach(x => { const st = f[x.id] || {}, r = el("div", "rad"), niv = el("div", "niv"); [st.sett, st.prov, st.riktig].forEach(on => niv.append(el("i", on ? "on" : ""))); r.append(el("b", "", x.t[L]), niv); k.append(r); });
  const fk = el("div", "forkl"); T.nivaa.forEach(n => { const s = el("span"); s.append(el("i"), document.createTextNode(n)); fk.append(s); }); k.append(fk);
}
function tegnFigurer(){ const g = $("#figurer"); if(g.childElementCount) return; for(let i = 0; i < 100; i++) g.append(el("i", i < C.risk_prosent ? "tap" : "")); }

/* ---------- leksjon ---------- */
let aapen = -1;
function lagre(id, patch){ const f = frem(); f[id] = Object.assign({}, f[id] || {}, patch); LS.set("frem", f); }
function apne(i, tilSporsmal){
  markerFoerste();
  aapen = i; const x = ALLE()[i], v = $("#lek"); v.innerHTML = ""; v.classList.remove("skjul"); document.body.style.overflow = "hidden";
  lagre(x.id, { sett: Date.now() });
  const hode = el("div", "hode"), tilbake = el("button", "", ""); tilbake.type = "button"; tilbake.innerHTML = '<svg class="ik"><use href="#i-back"/></svg>'; tilbake.append(document.createTextNode(T["hafta" + (ukeAv(i) ? ukeAv(i) + 1 : "")])); tilbake.addEventListener("click", lukk);
  hode.append(tilbake, elx("b", "", x.t[L]), el("small", "ltr", x.min + " " + T.min)); v.append(hode);
  if(!tilSporsmal){
    const lydSp = (L === "ur" || L === "ur_rm") ? "ur" : L;   /* ur-sporet dekker begge urdu-måtene */
    const harLyd = !!(C.lyd && C.lyd.spor && C.lyd.spor[lydSp] && C.lyd.spor[lydSp].indexOf(x.id) >= 0), au = harLyd ? lydElement("lyd/" + x.id + "-" + lydSp + ".mp3") : null;
    if(x.anim) v.append(animasjon(x.anim, au)); else if(x.fig) v.append(figur(x.fig));
    const ln = el("div", "linjer"); x.linjer[L].forEach(s => ln.append(elx("p", "", s))); v.append(ln);
    if(au) v.append(lydKnapp(au));
    else v.append(el("p", "lydnote", T.lyd_kommer));   /* alle språk får vite at lyd kommer på deres språk */
    if(x.prov){ const p = el("section", "prov"); p.append(el("h3", "", T.prov)); p.append(x.prov === "risk" ? kalkulator(x.id) : linjal(x.id)); v.append(p); }
  }
  v.append(sporsmal(x, i));
  v.append(stuckRad(x));   /* #292 */
  v.scrollTop = 0; tilbake.focus();
}
/* Urdu-lyd (Microsoft nevral stemme, lages på forhånd): én knapp, spill/pause. Lastes først når man trykker (dårlig nett). */
/* play() kalles alltid direkte i trykket. Feiler den (lyd blokkert, dårlig nett), sier vi det i stedet for å tie. */
function spillLyd(au){
  const p = au.play(); if(!p || !p.catch) return;
  p.catch(() => { const w = au.closest(".lyd") || au.parentNode; if(w && !w.querySelector(".lydfeil")){ const n = el("p", "lydfeil", T.lyd_feil || ""); w.append(n); setTimeout(() => n.remove(), 6000); } });
}
function lydElement(src){ const au = document.createElement("audio"); au.preload = "none"; au.src = src; au.setAttribute("playsinline", ""); return au; }
function lydKnapp(au){
  const w = el("div", "lyd"), b = el("button", "lydk"); b.type = "button"; const ik = '<svg class="ik"><use href="#i-sound"/></svg>';
  const sett = (spiller) => { b.innerHTML = ik; b.append(document.createTextNode(spiller ? T.lyd_stopp : T.lyd)); b.classList.toggle("on", spiller); };
  b.addEventListener("click", () => { if(au.paused){ spillLyd(au); } else { au.pause(); } });
  au.addEventListener("play", () => sett(true)); au.addEventListener("pause", () => sett(false));
  /* Fila feilet (forsvant, blokkert nett): si det i stedet for en knapp som ikke gjør noe. Ingen forhåndssjekk – den ville forsinket leksjonen på tregt nett. */
  au.addEventListener("error", () => { sett(false); if(!w.querySelector(".lydfeil")) w.append(el("p", "lydfeil", T.lyd_feil || "")); }); au.addEventListener("ended", () => { au.currentTime = 0; sett(false); });
  sett(false); w.append(b, au); return w;
}
function lukk(){ $("#lek").querySelectorAll("audio").forEach(a => a.pause()); $("#lek").classList.add("skjul"); $("#lek").innerHTML = ""; document.body.style.overflow = ""; aapen = -1; tegnHjem(); }

/* ---------- #292 «Jeg står fast» → WhatsApp (B-040) + Element-fallback ---------- */
/* Soft-fail: names_csv/WA-nummer kan mangle eller være blokkert (PK) – knappen virker likevel via Element/kopi. */
const PROFIL = {};
function rensWa(raa){
  let t = String(raa || "").trim().toLowerCase();
  t = t.replace(/^(https?:\/\/)?(wa\.me|api\.whatsapp\.com\/send\?phone=)\/?/, "").replace(/[^0-9+]/g, "").replace(/^\+/, "").replace(/^00/, "");
  return /^[0-9]{8,15}$/.test(t) ? t : "";
}
function hentProfilSoft(){
  const url = (C.stuck && C.stuck.names_csv) || "";
  if(!url) return Promise.resolve();
  if(hentProfilSoft.p) return hentProfilSoft.p;
  const u = url + (url.indexOf("?") < 0 ? "?" : "&") + "t=" + Math.floor(Date.now() / 300000);
  return hentProfilSoft.p = fetch(u, { cache: "no-store" }).then(r => r.ok ? r.text() : "").then(t => {
    String(t || "").split(/\r?\n/).forEach((l, n) => {
      if(n === 0){ hentProfilSoft.hode = l.split(",").map(x => x.trim().toLowerCase()); return; }
      const f = l.split(","), id = (f[1] || "").trim().toLowerCase();
      if(!/^[a-z0-9]{6}$/.test(id)) return;
      const i = (hentProfilSoft.hode || []).indexOf("whatsapp");
      const v = i > 1 ? rensWa(f[i]) : "";
      if(v) PROFIL[id] = [["whatsapp", v]];
    });
  }).catch(() => { hentProfilSoft.p = null; });   /* soft-fail: neste åpning kan prøve igjen */
}
function stuckSvarLenke(x){
  const base = location.origin + location.pathname.replace(/index\.html$/, "");
  const ld = LS.get("leder", null);
  let u = base + "?lang=" + encodeURIComponent(L) + "&lek=" + encodeURIComponent(x.id);
  if(ld && ld.id) u += "&l=" + encodeURIComponent(ld.id);   /* kode, ikke telefon / navn */
  return u;
}
function stuckTekst(x){
  const ld = LS.get("leder", null), N = (ld && ld.name) || "leader";
  const t = (x.t && (x.t[L] || x.t.en)) || x.id, tEn = (x.t && x.t.en) || x.id;
  return String(T.stuck_msg || "")
    .replace(/\{N\}/g, N).replace(/\{id\}/g, x.id).replace(/\{t\}/g, t).replace(/\{t_en\}/g, tEn).replace(/\{lang\}/g, L)
    + "\n" + stuckSvarLenke(x)
    + (T.stuck_hint ? "\n\n" + T.stuck_hint : "");
}
function stuckWaNr(){
  const ld = LS.get("leder", null); if(!ld) return "";
  const P = PROFIL[ld.id] || []; const wa = P.find(p => p[0] === "whatsapp");
  return wa ? wa[1] : "";
}
function stuckElementUrl(){
  return (C.stuck && C.stuck.element) || (C.call && C.call.gruppe) || "https://matrix.to/#/%23aimpire-questions:matrix.org";
}
function stuckRad(x){
  if(!T || !T.stuck_btn) return el("div");
  const w = el("div", "stuck"), ld = LS.get("leder", null);
  const label = (ld && ld.name && T.stuck_btn_n) ? T.stuck_btn_n.replace("{N}", ld.name) : T.stuck_btn;
  const b = el("button", "stuckb", label); b.type = "button"; b.setAttribute("aria-expanded", "false");
  const soft = el("p", "stucksoft skjul"); soft.hidden = true;
  const meny = el("div", "stuckmeny skjul");
  b.addEventListener("click", () => {
    const aapenMeny = !meny.classList.contains("skjul");
    if(aapenMeny){ meny.classList.add("skjul"); meny.innerHTML = ""; soft.classList.add("skjul"); soft.hidden = true; soft.textContent = ""; b.setAttribute("aria-expanded", "false"); return; }
    hentProfilSoft().finally(() => {
      const tekst = stuckTekst(x), enc = encodeURIComponent(tekst), wa = stuckWaNr();
      const waHref = "https://wa.me/" + (wa || "") + "?text=" + enc;
      meny.innerHTML = "";
      const aWa = el("a", "wa", T.stuck_wa + (wa && ld && ld.name ? " · " + ld.name : "")); aWa.href = waHref; aWa.target = "_blank"; aWa.rel = "noopener noreferrer";
      aWa.addEventListener("click", () => {
        /* Soft-fail (telefon): hvis WA ikke tok over (visibility aldri hidden), vis Element-hint */
        let skjulte = false;
        const onVis = () => { if(document.visibilityState === "hidden") skjulte = true; };
        document.addEventListener("visibilitychange", onVis);
        setTimeout(() => {
          document.removeEventListener("visibilitychange", onVis);
          if(!skjulte && window.matchMedia && matchMedia("(pointer:coarse)").matches){
            soft.textContent = T.stuck_soft || ""; soft.classList.remove("skjul"); soft.hidden = false;
          }
        }, 1200);
      });
      const aEl = el("a", "el", T.stuck_element); aEl.href = stuckElementUrl(); aEl.target = "_blank"; aEl.rel = "noopener noreferrer";
      const k = el("button", "", T.stuck_kopi); k.type = "button";
      k.addEventListener("click", () => {
        const pr = navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(tekst) : Promise.reject();
        pr.then(() => toast(T.kopiert)).catch(() => { try{ window.prompt("", tekst); }catch(e){} });
      });
      meny.append(aWa, aEl, k);
      meny.classList.remove("skjul"); b.setAttribute("aria-expanded", "true");
    });
  });
  w.append(b, el("p", "stuckhint", T.stuck_hint || ""), soft, meny);
  return w;
}
function apneFraQuery(){
  const id = String(Q.get("lek") || "").toLowerCase().replace(/[^a-z0-9_-]/g, "");
  if(!id) return;
  const i = ALLE().findIndex(x => x.id === id);
  if(i >= 0 && !ukeLaast(ukeAv(i))) apne(i);
}
/* Animasjonen lastes stille (?app=1 = ikke autostart) og starter på ett trykk – sammen med urdu-fortellingen. Trykket er
   det som gir telefonen lov til å spille lyd (founder 12:45: «videoen funket, men hørte ikke urdu»).
   IKKE ?opptak her: det flagget starter takt.js sin egen veggklokke (for MP4-opptak uten lyd-element) og ville overstyrt
   stemmen, slik at animasjonen gikk ferdig før fortellingen på trege telefoner (målt 21.10 på «plan»). */
function animasjon(src, au){
  const w = el("div", "anim"), fr = document.createElement("iframe"); fr.title = ""; fr.setAttribute("loading", "eager"); fr.setAttribute("aria-hidden", "true"); fr.tabIndex = -1;
  const stille = () => src + (src.indexOf("?") < 0 ? "?" : "&") + "app=1&lang=" + encodeURIComponent(L) + "&r=" + Date.now();   /* teksten i animasjonen følger appens språk */
  fr.src = stille();
  const skaler = () => { const s = w.clientWidth / 1080; fr.style.transform = "scale(" + s + ")"; };
  const start = el("button", "start"); start.type = "button"; start.innerHTML = '<span class="ring"><svg class="ik"><use href="#i-play"/></svg></span>'; start.append(el("span", "", au ? T.se_hor : T.dekh));
  /* Takt (#331): cue-tider per scene fra lyd/<id>-<sp>.cues.json – animasjonen følger stemmen. Lydens tid sendes inn fortløpende. */
  let cues = null, cuesKlar = Promise.resolve(), startet = false;
  if(au){
    cuesKlar = fetch(au.getAttribute("src").replace(/\.mp3$/, ".cues.json"), { cache: "no-cache" }).then(r => r.ok ? r.json() : null).then(c => {
      cues = c;
      /* Kom tidene etter 1,5 s-fristen, kjører animasjonen allerede på reservetider: gi dem til den nå (takt.js tar dem i bruk fra neste scene). */
      if(c && startet){ try{ fr.contentWindow.Takt.sett(c); }catch(e){} }
    }).catch(() => {});
    /* «spiller» bare når lyden faktisk har data (readyState ≥ 3): under buffring står animasjonens klokke stille sammen med stemmen. */
    const tid = () => { try{ fr.contentWindow.lydTid(au.currentTime, !au.paused && !au.ended && au.readyState >= 3); }catch(e){} };
    ["timeupdate", "play", "playing", "pause", "waiting", "stalled", "seeked", "ended"].forEach(ev => au.addEventListener(ev, tid));
  }
  const startAnim = () => { startet = true; try{ fr.contentWindow.lydTid(0, false); fr.contentWindow.spill(cues); }catch(e){} };
  const spill = async () => {
    if(au){ try{ au.currentTime = 0; }catch(e){} spillLyd(au); }   /* lyd først, inne i trykket (iPhone) */
    await Promise.race([cuesKlar, new Promise(r => setTimeout(r, 1500))]);
    startAnim(); start.classList.add("skjul"); igjen.classList.remove("skjul");
  };
  start.addEventListener("click", spill);
  const igjen = el("button", "igjen skjul"); igjen.type = "button"; igjen.innerHTML = '<svg class="ik" style="width:16px;height:16px"><use href="#i-replay"/></svg>'; igjen.append(document.createTextNode(T.dobara));
  /* Lyden startes INNE i trykket (iPhone/iPad tillater ikke play() fra en load-hendelse); animasjonen starter når rammen er lastet. */
  igjen.addEventListener("click", () => { if(au){ au.pause(); try{ au.currentTime = 0; }catch(e){} spillLyd(au); } fr.addEventListener("load", startAnim, { once: true }); fr.src = stille(); });
  w.append(fr, start, igjen);
  requestAnimationFrame(skaler); window.addEventListener("resize", skaler);
  return w;
}
function figur(hvilken){
  const w = el("div", "fig"), ns = "http://www.w3.org/2000/svg", s = document.createElementNS(ns, "svg"); s.setAttribute("viewBox", "0 0 320 150"); s.setAttribute("aria-hidden", "true");
  const t = (x, y, txt, cls, anchor) => { const e = document.createElementNS(ns, "text"); e.setAttribute("x", x); e.setAttribute("y", y); e.setAttribute("font-size", "13"); e.setAttribute("font-weight", "700"); e.setAttribute("font-family", "JetBrains Mono, ui-monospace, Menlo, monospace"); e.setAttribute("fill", cls || "currentColor"); if(anchor) e.setAttribute("text-anchor", anchor); e.textContent = txt; s.append(e); };
  const ln = (x1, y1, x2, y2, col, dash, wd) => { const e = document.createElementNS(ns, "line"); e.setAttribute("x1", x1); e.setAttribute("y1", y1); e.setAttribute("x2", x2); e.setAttribute("y2", y2); e.setAttribute("stroke", col); e.setAttribute("stroke-width", wd || 2); if(dash) e.setAttribute("stroke-dasharray", "5 4"); s.append(e); };
  const pth = (d, col) => { const e = document.createElementNS(ns, "path"); e.setAttribute("d", d); e.setAttribute("fill", "none"); e.setAttribute("stroke", col); e.setAttribute("stroke-width", 2.5); e.setAttribute("stroke-linejoin", "round"); s.append(e); };
  const ak = getComputedStyle(document.documentElement), aks = ak.getPropertyValue("--aksent").trim(), tap = ak.getPropertyValue("--tap").trim(), dem = ak.getPropertyValue("--dempet").trim(), gev = ak.getPropertyValue("--gevinst").trim();
  if(hvilken === "spread"){
    ln(20, 50, 300, 50, aks); t(24, 42, "BUY  1.0852", aks); ln(20, 100, 300, 100, gev); t(24, 118, "SELL 1.0850", gev);
    ln(260, 50, 260, 100, dem, true, 1.5); t(268, 80, "2 pips", dem); t(160, 80, "SPREAD", dem, "middle");
  } else if(hvilken === "stop"){
    pth("M20 60 L70 48 L110 70 L150 58 L190 85 L230 78 L270 120", aks); ln(20, 70, 300, 70, dem, true, 1.5); t(24, 64, "ENTRY 1.0850", dem);
    ln(20, 120, 300, 120, tap, false, 2.5); t(24, 138, "STOP 1.0830  −20 pips", tap); t(278, 124, "✕", tap);
  } else if(hvilken === "candle"){
    const f = (x, y, w, h, col) => { const e = document.createElementNS(ns, "rect"); e.setAttribute("x", x); e.setAttribute("y", y); e.setAttribute("width", w); e.setAttribute("height", h); e.setAttribute("rx", 2); e.setAttribute("fill", col); s.append(e); };
    ln(110, 20, 110, 130, gev, false, 2); f(96, 50, 28, 55, gev); t(130, 26, "HIGH", dem); t(130, 56, "CLOSE", gev); t(130, 108, "OPEN", gev); t(130, 134, "LOW", dem);
    ln(220, 30, 220, 135, tap, false, 2); f(206, 45, 28, 65, tap); t(240, 50, "OPEN", tap); t(240, 112, "CLOSE", tap); t(240, 134, "LOW", dem);
    t(96, 146, "M15", dem); t(206, 146, "M15", dem);
  } else if(hvilken === "giring"){
    const f = (x, y, w, h, col) => { const e = document.createElementNS(ns, "rect"); e.setAttribute("x", x); e.setAttribute("y", y); e.setAttribute("width", w); e.setAttribute("height", h); e.setAttribute("rx", 5); e.setAttribute("fill", col); s.append(e); };
    f(20, 40, 280, 30, dem + "33"); f(20, 40, 2.8, 30, aks); t(20, 32, "$100 margin", aks); t(300, 32, "$10,000 position", dem, "end"); t(160, 60, "1:100", dem, "middle");
    t(20, 100, "+1 % move  =  +$100", gev); t(20, 124, "−1 % move  =  −$100", tap); t(20, 144, "= poora margin", tap);
  } else if(hvilken === "news"){
    pth("M20 80 L80 78 L120 82 L150 80 L158 30 L164 125 L170 60 L176 100 L185 75 L240 72 L300 74", aks);
    const r = document.createElementNS(ns, "rect"); r.setAttribute("x", 148); r.setAttribute("y", 20); r.setAttribute("width", 42); r.setAttribute("height", 115); r.setAttribute("fill", tap + "22"); s.append(r);
    t(169, 146, "NEWS", tap, "middle"); t(24, 30, "SPREAD 1 → 8 pips", tap); t(296, 30, "±15 min", dem, "end");
  } else if(hvilken === "demo"){
    const f = (x, y, w, h, col) => { const e = document.createElementNS(ns, "rect"); e.setAttribute("x", x); e.setAttribute("y", y); e.setAttribute("width", w); e.setAttribute("height", h); e.setAttribute("rx", 10); e.setAttribute("fill", "none"); e.setAttribute("stroke", col); e.setAttribute("stroke-width", 2); s.append(e); };
    f(20, 20, 130, 115, aks); f(170, 20, 130, 115, tap); t(85, 44, "DEMO", aks, "middle"); t(235, 44, "REAL", tap, "middle");
    t(85, 72, "price  ✓", dem, "middle"); t(85, 94, "money  ✗", dem, "middle"); t(85, 116, "fear  ✗", dem, "middle");
    t(235, 72, "price  ✓", dem, "middle"); t(235, 94, "money  ✓", dem, "middle"); t(235, 116, "fear  ✓", tap, "middle");
  } else if(hvilken === "journal"){
    ["kyun / why", "stop", "lot", "result", "feeling"].forEach((k, i) => { ln(20, 30 + i * 24, 300, 30 + i * 24, dem + "55", false, 1); t(24, 46 + i * 24, (i < 3 ? "1  " : "2  ") + k, i < 3 ? aks : dem); });
    t(296, 46, "PEHLE", aks, "end"); t(296, 118, "BAAD", dem, "end");
  } else if(hvilken === "sessions"){
    const f = (x, y, w, h, col) => { const e = document.createElementNS(ns, "rect"); e.setAttribute("x", x); e.setAttribute("y", y); e.setAttribute("width", w); e.setAttribute("height", h); e.setAttribute("rx", 5); e.setAttribute("fill", col); s.append(e); };
    const X = h => 70 + h * 10;   /* 0–24 UTC (vintertid, omtrent) */
    const ov = document.createElementNS(ns, "rect"); ov.setAttribute("x", X(12)); ov.setAttribute("y", 8); ov.setAttribute("width", X(16) - X(12)); ov.setAttribute("height", 116); ov.setAttribute("fill", aks + "22"); s.append(ov);
    [["Sydney", 21, 24, 0, 6], ["Tokyo", 0, 9], ["London", 7, 16], ["New York", 12, 21]].forEach(([n, a1, b1, a2, b2], i) => { const y = 16 + i * 26; t(4, y + 13, n, dem); f(X(a1), y, X(b1) - X(a1), 16, i === 2 || i === 3 ? aks : dem + "88"); if(a2 != null) f(X(a2), y, X(b2) - X(a2), 16, dem + "88"); });
    ln(X(0), 130, X(24), 130, dem + "66", false, 1); [0, 6, 12, 18, 24].forEach(h => t(X(h), 146, String(h).padStart(2, "0"), dem, "middle")); t(X(24) + 14, 146, "UTC", dem); t(X(14), 16, "overlap", aks, "middle");   /* y=6 klippet teksten øverst i figuren (sett 21.10) */
  } else if(hvilken === "trend"){
    pth("M20 120 L70 80 L100 100 L150 55 L180 75 L235 30 L265 48 L300 20", aks);
    [[70, 80, "HH"], [150, 55, "HH"], [235, 30, "HH"]].forEach(([x, y, l]) => t(x, y - 8, l, gev, "middle"));
    [[100, 100, "HL"], [180, 75, "HL"], [265, 48, "HL"]].forEach(([x, y, l]) => t(x, y + 20, l, dem, "middle"));
    t(20, 146, "UPTREND", aks);
  } else if(hvilken === "sr"){
    const zone = (y, col, l) => { const e = document.createElementNS(ns, "rect"); e.setAttribute("x", 10); e.setAttribute("y", y); e.setAttribute("width", 300); e.setAttribute("height", 16); e.setAttribute("fill", col + "2e"); s.append(e); t(14, y + 12, l, col); };
    zone(22, tap, "RESISTANCE"); zone(108, gev, "SUPPORT");
    pth("M20 112 L60 40 L95 114 L140 36 L175 110 L215 34 L250 112 L300 70", aks);
  } else if(hvilken === "rr"){
    ln(20, 75, 300, 75, dem, true, 1.5); t(24, 70, "ENTRY", dem);
    ln(20, 115, 300, 115, tap, false, 2.5); t(24, 132, "STOP −20 pips", tap);
    ln(20, 35, 300, 35, gev, false, 2.5); t(24, 28, "TARGET +40 pips", gev);
    const bar = (y, h, col) => { const e = document.createElementNS(ns, "rect"); e.setAttribute("x", 250); e.setAttribute("y", y); e.setAttribute("width", 28); e.setAttribute("height", h); e.setAttribute("rx", 4); e.setAttribute("fill", col); s.append(e); };
    bar(35, 40, gev + "cc"); bar(75, 40, tap + "cc"); t(240, 60, "2", gev, "end"); t(240, 100, "1", tap, "end"); t(160, 146, "1 : 2", aks, "middle");
  } else if(hvilken === "risk"){
    /* $100 konto, 1 % = $1 per trade: 100 like tap før kontoen er tom – ikke 10 */
    const rekt = (x, y, wd, h, col) => { const e = document.createElementNS(ns, "rect"); e.setAttribute("x", x); e.setAttribute("y", y); e.setAttribute("width", wd); e.setAttribute("height", h); e.setAttribute("rx", 4); e.setAttribute("fill", col); s.append(e); };
    rekt(20, 40, 280, 28, dem + "55"); rekt(20, 40, 2.8, 28, tap); t(24, 32, "Account $100", dem); t(300, 32, "1 % = $1", tap, "end");
    rekt(20, 92, 280, 28, dem + "55"); rekt(20, 92, 28, 28, tap); t(24, 84, "Account $100", dem); t(300, 84, "10 % = $10", tap, "end");
    t(20, 142, "1 %: 100 trades", aks); t(300, 142, "10 %: 10 trades", tap, "end");
  } else if(hvilken === "swap"){
    const box = (x, l, col, k) => { const e = document.createElementNS(ns, "rect"); e.setAttribute("x", x); e.setAttribute("y", 40); e.setAttribute("width", 48); e.setAttribute("height", 56); e.setAttribute("rx", 8); e.setAttribute("fill", "none"); e.setAttribute("stroke", col); e.setAttribute("stroke-width", 2); s.append(e); t(x + 24, 64, l, col, "middle"); t(x + 24, 86, k, col, "middle"); };
    ["1", "2", "3", "4", "5"].forEach((n, i) => box(14 + i * 60, "☾" + n, i === 2 ? tap : dem, i === 2 ? "3×" : "1×"));
    t(160, 22, "swap per night", dem, "middle"); t(160, 124, "1 night = 3× (depends on broker)", tap, "middle");
  } else if(hvilken === "fomo"){
    pth("M20 125 L70 118 L110 110 L150 95 L190 70 L225 35 L245 28 L270 60 L300 95", aks);
    const dot = (x, y, col) => { const e = document.createElementNS(ns, "circle"); e.setAttribute("cx", x); e.setAttribute("cy", y); e.setAttribute("r", 6); e.setAttribute("fill", col); s.append(e); };
    dot(70, 118, gev); t(70, 140, "PLAN ENTRY", gev, "middle"); dot(240, 29, tap); t(240, 18, "FOMO ENTRY", tap, "middle"); t(300, 112, "−", tap, "end");
  } else if(hvilken === "revenge"){
    const bar = (x, h, col, l1, l2) => { const e = document.createElementNS(ns, "rect"); e.setAttribute("x", x); e.setAttribute("y", 40); e.setAttribute("width", 60); e.setAttribute("height", h); e.setAttribute("rx", 6); e.setAttribute("fill", col); s.append(e); t(x + 30, 30, l1, col, "middle"); t(x + 30, 40 + h + 18, l2, dem, "middle"); };
    ln(10, 40, 310, 40, dem + "66", false, 1);
    bar(40, 16, tap + "aa", "−$2", "loss"); bar(130, 64, tap, "−$8", "revenge"); bar(230, 0.1, dem, "", ""); t(260, 74, "?", dem, "middle"); t(300, 146, "next: break + journal", aks, "end");
  } else if(hvilken === "overtrading"){
    for(let i = 0; i < 20; i++){ const x = 18 + i * 15; ln(x, 60, x, 60 - 8 - (i % 3) * 6, dem, false, 3); const d = document.createElementNS(ns, "circle"); d.setAttribute("cx", x); d.setAttribute("cy", 76); d.setAttribute("r", 3); d.setAttribute("fill", tap); s.append(d); }
    t(160, 104, "20 trades × spread", tap, "middle"); t(160, 128, "= cost before any profit", dem, "middle");
  } else if(hvilken === "plan"){
    ["ENTRY", "STOP", "TARGET", "LOT"].forEach((l, i) => { const y = 24 + i * 28; const e = document.createElementNS(ns, "rect"); e.setAttribute("x", 30); e.setAttribute("y", y - 14); e.setAttribute("width", 18); e.setAttribute("height", 18); e.setAttribute("rx", 4); e.setAttribute("fill", "none"); e.setAttribute("stroke", aks); e.setAttribute("stroke-width", 2); s.append(e); t(34, y + 1, "✓", aks); t(62, y, l, dem); });
    t(300, 130, "BEFORE the trade", aks, "end");
  } else if(hvilken === "rukna"){
    [["NEWS ±15m", 60], ["ANGRY / TIRED", 160], ["NO SETUP", 260]].forEach(([l, x]) => { const c2 = document.createElementNS(ns, "circle"); c2.setAttribute("cx", x); c2.setAttribute("cy", 60); c2.setAttribute("r", 30); c2.setAttribute("fill", "none"); c2.setAttribute("stroke", tap); c2.setAttribute("stroke-width", 3); s.append(c2); ln(x - 21, 81, x + 21, 39, tap, false, 3); t(x, 116, l, dem, "middle"); });
    t(160, 144, "no trade = a decision", aks, "middle");
  } else {
    const f = (x, y, w, h, col, r) => { const e = document.createElementNS(ns, "rect"); e.setAttribute("x", x); e.setAttribute("y", y); e.setAttribute("width", w); e.setAttribute("height", h); e.setAttribute("rx", r || 4); e.setAttribute("fill", col); s.append(e); };
    f(20, 40, 280, 44, dem + "33", 8); f(20, 40, 5.6, 44, tap, 3); t(24, 30, "$100", dem); t(34, 66, "2 % = $2", tap); t(296, 30, "100 %", dem, "end");
    t(20, 120, "1 trade = 2 %  →  50 trades tak", dem); t(20, 140, "100 % = 1 trade, poora account", tap);
  }
  w.append(s); return w;
}
function linjal(id){
  const P = C.prov_ui[L], w = el("div", "pipr"); let pair = "EURUSD", lot = 0.01;
  const rad1 = el("div", "prad"), rad2 = el("div", "prad"), pris = el("div", "ppris"), sl = document.createElement("input"), res = el("div", "pres"), note = el("div", "pnote");
  sl.type = "range"; sl.min = -10; sl.max = 10; sl.step = 1; sl.value = 0; sl.setAttribute("aria-label", P.drag);
  const knapp = (txt, on, fn, rad) => { const b = el("button", on ? "on" : "", txt); b.type = "button"; b.addEventListener("click", () => { fn(); Array.from(rad.children).forEach(c => c.classList.remove("on")); b.classList.add("on"); tegn(); }); rad.append(b); };
  knapp("EUR/USD", true, () => { pair = "EURUSD"; }, rad1); knapp("XAU/USD", false, () => { pair = "XAUUSD"; }, rad1);
  [0.01, 0.1, 1].forEach(l => knapp(l.toFixed(2) + " lot", l === 0.01, () => { lot = l; }, rad2));
  function tegn(){
    const p = I_PAIRS[pair], n = parseInt(sl.value, 10), ny = p.pris + n * p.steg, s = ny.toFixed(p.dec), i = s.length - (p.dec === 4 ? 1 : 3);
    pris.innerHTML = ""; pris.append(document.createTextNode(s.slice(0, i)), el("b", "", s.slice(i, i + 1)), document.createTextNode(s.slice(i + 1)));
    const usd = n * p.perLot * lot; res.className = "pres " + (usd > 0 ? "pos" : usd < 0 ? "neg" : "");
    res.textContent = (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n) + (pair === "EURUSD" ? " pips" : " $") + "  =  " + (usd > 0 ? "+" : usd < 0 ? "−" : "") + "$" + Math.abs(usd).toFixed(2);
    note.textContent = pair === "XAUUSD" ? (P.gold_note || P.gold) : "";
  }
  const brukt = () => lagre(id, { prov: Date.now() }); sl.addEventListener("input", () => { tegn(); brukt(); }); rad1.addEventListener("click", brukt); rad2.addEventListener("click", brukt);
  w.append(rad1, rad2, pris, sl, res, el("div", "pnote", P.drag), note); tegn();
  return w;
}
/* Position size / risk (#333 / #315 rebase): tool-sharp v2, B-030 — regnestykke, ikke råd. */
const KALK_INST = [
  { id: "eurusd", lab: "EUR/USD", per: 10, unit: "pip" },
  { id: "gbpusd", lab: "GBP/USD", per: 10, unit: "pip" },
  { id: "audusd", lab: "AUD/USD", per: 10, unit: "pip" },
  { id: "xauusd", lab: "XAU/USD", per: 100, unit: "usd" }
];
function kalkUsd(n){
  const lok = L === "no" ? "nb-NO" : "en-US";
  return "$" + Number(n).toLocaleString(lok, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function kalkDes(n, d){
  const lok = L === "no" ? "nb-NO" : "en-US";
  return Number(n).toLocaleString(lok, { minimumFractionDigits: d, maximumFractionDigits: d });
}
function kalkulator(id){
  const P = C.prov_ui[L] || C.prov_ui.en, w = el("div", "kalk");
  let lagret = {}; try{ lagret = LS.get("kalk", {}) || {}; }catch(e){}
  let instId = KALK_INST.some(x => x.id === lagret.i) ? lagret.i : "eurusd";
  const felt = (lab, v, step) => {
    const l = el("label", "kfelt", ""), topp = el("span", "kfelt-t"), i = document.createElement("input");
    topp.textContent = iso(lab); i.type = "number"; i.inputMode = "decimal"; i.value = v; i.min = 0; i.step = step || 1;
    i.setAttribute("autocomplete", "off"); l.append(topp, i); return { l, i, topp };
  };
  const instLab = el("span", "kfelt-t", P.inst), instRad = el("div", "kinst");
  const k = felt(P.konto, lagret.bal != null ? lagret.bal : 100, 1);
  const r = felt(P.risk, lagret.risk != null ? lagret.risk : 2, 0.5);
  const s = felt(P.stop, lagret.stop != null ? lagret.stop : 20, 1);
  const riskChips = el("div", "krisk");
  [0.5, 1, 2].forEach(v => {
    const b = el("button", "", String(v)); b.type = "button"; b.dataset.r = String(v);
    b.addEventListener("click", () => { r.i.value = v; tegn(); lagre(id, { prov: Date.now() }); });
    riskChips.append(b);
  });
  r.l.append(riskChips);
  const ut = el("div", "ut"), riskK = el("div", "riskv"), lotK = el("div", "lotv"), tapK = el("div", "tapv");
  const riskB = el("b", "tall", ""), lotB = el("b", "tall", ""), tapB = el("b", "tall", "");
  riskK.append(el("small", "", P.risk_usd), riskB); lotK.append(el("small", "", P.lot_ut), lotB); tapK.append(el("small", "", P.tap), tapB);
  ut.append(riskK, lotK, tapK);
  const floor = el("p", "kfloor"); floor.hidden = true;
  const formel = el("p", "kformel"); const check = el("p", "knote");
  function I(){ return KALK_INST.find(x => x.id === instId) || KALK_INST[0]; }
  function tegnInst(){
    instRad.innerHTML = "";
    KALK_INST.forEach(x => {
      const lab = x.unit === "usd" ? ((P.gold || "Gold") + " (" + x.lab + ")") : x.lab;
      const b = el("button", x.id === instId ? "on" : "", lab); b.type = "button"; b.dir = "ltr";
      b.addEventListener("click", () => { instId = x.id; tegnInst(); tegn(); lagre(id, { prov: Date.now() }); });
      instRad.append(b);
    });
    s.topp.textContent = iso(I().unit === "usd" ? P.stop_d : P.stop);
  }
  function tegn(){
    const I0 = I(), konto = parseFloat(String(k.i.value).replace(",", ".")) || 0;
    const pr = parseFloat(String(r.i.value).replace(",", ".")) || 0;
    const st = Math.max(0.01, parseFloat(String(s.i.value).replace(",", ".")) || 0);
    Array.from(riskChips.children).forEach(c => c.classList.toggle("on", Math.abs((+c.dataset.r) - pr) < 1e-9));
    if(!konto || !pr || pr > 100 || !st){
      riskB.textContent = "—"; lotB.textContent = "—"; tapB.textContent = "—"; floor.hidden = true;
    } else {
      const rUsd = konto * pr / 100, raa = rUsd / (st * I0.per), lot = Math.floor(raa * 100 + 1e-9) / 100;
      riskB.textContent = kalkUsd(rUsd);
      if(lot >= 0.01){
        lotB.textContent = kalkDes(lot, 2); tapB.textContent = "−" + kalkUsd(lot * st * I0.per); floor.hidden = true;
      } else {
        const minRisk = 0.01 * st * I0.per;
        lotB.textContent = "< " + kalkDes(0.01, 2); tapB.textContent = "—";
        floor.hidden = false; floor.textContent = ""; floor.append(bidiTekst((P.floor || "").replace("{X}", kalkUsd(minRisk)).replace("{P}", kalkDes(minRisk / konto * 100, 1) + " %")));
      }
    }
    formel.textContent = ""; formel.append(bidiTekst(P.formula || ""));
    check.textContent = ""; check.append(bidiTekst(P.check || ""));
    try{ LS.set("kalk", { i: instId, bal: k.i.value, risk: r.i.value, stop: s.i.value }); }catch(e){}
  }
  [k, r, s].forEach(f => f.i.addEventListener("input", () => { tegn(); lagre(id, { prov: Date.now() }); }));
  const instWrap = el("div", "kfelt"); instWrap.append(instLab, instRad);
  w.append(instWrap, k.l, r.l, s.l, ut, floor, formel, check);
  tegnInst(); tegn();
  return w;
}
function sporsmal(x, i){
  const sp = x.sp[L], w = el("section", "sporsmal"), valg = el("div", "valg"), svar = el("div", "svar"); svar.setAttribute("aria-live", "polite");
  w.append(el("h3", "", T.sawal), elx("p", "q", sp.q));
  const rekke = sp.o.map((o, j) => j).sort(() => Math.random() - 0.5);
  rekke.forEach(j => { const o = sp.o[j], b = elx("button", "", o); b.type = "button"; b.dataset.j = j; b.addEventListener("click", () => {
    Array.from(valg.children).forEach(c => { c.disabled = true; }); b.classList.add(j === sp.r ? "riktig" : "feil");
    const f = frem()[x.id] || {}, rett = j === sp.r;
    if(rett){ const niv = Math.min((f.niv || 0) + (f.riktig ? 1 : 0), 2); lagre(x.id, { riktig: Date.now(), prov: f.prov || Date.now(), niv, neste: Date.now() + INTERVALL[niv] * DAG }); }
    else { lagre(x.id, { prov: Date.now(), feil: (f.feil || 0) + 1 }); const rb = valg.querySelector('[data-j="' + sp.r + '"]'); if(rb) rb.classList.add("riktig"); }
    svar.innerHTML = ""; svar.append(el("b", "", rett ? T.sahi : T.galat), document.createTextNode(" "), bidiTekst(sp.hvorfor));
    /* #289: soft day-2 after *riktig* svar — kal_wapis + ufull leksjon + call-chip. Aldri streak/skyld. */
    if(rett){
      LS.set("sist_svar", Date.now());
      if(T.kal_wapis){ const soft = el("p", "kal-wapis"); soft.append(bidiTekst(T.kal_wapis)); w.append(soft); }
    }
    const alle = ALLE(), ufull = ufullIndeks();
    const kan = ufull >= 0 && !ukeLaast(ukeAv(ufull));
    const nk = el("div", "nesteknapp"), n = el("button", "knapp", ""); n.type = "button"; n.style.width = "100%";
    if(kan && alle[ufull]){
      const tittel = alle[ufull].t[L] || T.neste;
      n.textContent = ""; n.append(document.createTextNode(T.neste + ": "), bidiTekst(tittel));
      n.addEventListener("click", () => apne(ufull));
    } else {
      n.textContent = T.ferdig_u; n.addEventListener("click", () => lukk());
    }
    nk.append(n); w.append(nk);
    if(rett){ const rad = el("div", "dag2-rad"); rad.append(lagCallChip(true)); w.append(rad); }
  }); valg.append(b); });
  w.append(valg, svar); return w;
}
/* ---------- verktøy: kalkulator og journal ---------- */
function verktoyHode(tittel){
  const v = $("#lek"); v.innerHTML = ""; v.classList.remove("skjul"); document.body.style.overflow = "hidden"; aapen = 99;
  /* «Tilbake» sier hvor du kommer tilbake TIL – stedet du sto på (Paisa, Mazeed …), ikke alltid «Mer». */
  const hode = el("div", "hode"), tilbake = el("button", "", ""); tilbake.type = "button"; tilbake.innerHTML = '<svg class="ik"><use href="#i-back"/></svg>'; tilbake.append(document.createTextNode((T.nav && T.nav[side]) || T.mer)); tilbake.addEventListener("click", lukk);
  hode.append(tilbake, el("b", "", tittel)); v.append(hode); v.scrollTop = 0; return v;
}
function visKalk(){ const v = verktoyHode(T.kalk), w = el("div", "vt"); w.append(el("p", "under", T.kalk_u), kalkulator("verktoy")); v.append(w);
  /* B-055: margin (hvor mye en gullhandel binder) under – samme pengespørsmål, ikke en ny side */
  const m = marginBlokk(); if(m) w.append(m); else hentPaisa().then(() => { const m2 = marginBlokk(); if(m2 && w.isConnected) w.append(m2); }).catch(() => {}); }
function jnLes(){ return LS.get("journal", []); }
function jnSkriv(a){ LS.set("journal", a); }
function jnImport(){
  if(jnLes().length) return 0;
  let g = []; try{ g = JSON.parse(localStorage.getItem("aimpire.journal") || "[]"); }catch(e){}
  if(!Array.isArray(g) || !g.length) return 0;
  const ut = g.map(x => ({ ts: +new Date(x.date || x.ts || Date.now()) || Date.now(), inst: String(x.inst || x.instrument || "").slice(0, 12), dir: /sell/i.test(x.dir || "") ? "sell" : "buy", lot: +x.lots || +x.lot || 0, stop: 0, why: String(x.note || "").slice(0, 120), res: +x.res || 0, feel: "", closed: true }));
  jnSkriv(ut); return ut.length;
}
function visJournal(){
  const J = T.jn, v = verktoyHode(T.journal), w = el("div", "vt"); v.append(w);
  const n = jnImport();
  w.append(el("p", "under", T.journal_u + (n ? " " + J.importert.replace("{N}", n) : "")));
  /* Før: det man vet før man trykker – kyun, stop, lot (leksjon «Journal kyun?») */
  w.append(el("h3", "", J.pehle));
  const f = el("div", "jnf"); let dir = "buy";
  const felt = (lab, type, v0, attrs) => { const l = el("label", "", lab), i = document.createElement("input"); i.type = type; if(type === "number"){ i.inputMode = "decimal"; i.step = "0.01"; i.min = "0"; } Object.assign(i, attrs || {}); i.value = v0; l.append(i); return { l, i }; };
  const inst = felt(J.inst, "text", "EUR/USD", { maxLength: 12 }), lot = felt(J.lot, "number", "0.01"), stop = felt(J.stop, "number", "20", { step: "1" }), why = felt(J.why, "text", "", { maxLength: 120 });
  const rad = el("div", "prad"); [["buy", J.buy], ["sell", J.sell]].forEach(([k, lab]) => { const b = el("button", k === dir ? "on" : "", lab); b.type = "button"; b.addEventListener("click", () => { dir = k; Array.from(rad.children).forEach(c => c.classList.remove("on")); b.classList.add("on"); }); rad.append(b); });
  const to = el("div", "to"); to.append(lot.l, stop.l);
  const lagreKnapp = el("button", "knapp", J.lagre); lagreKnapp.type = "button";
  lagreKnapp.addEventListener("click", () => {
    const e = { ts: Date.now(), inst: inst.i.value.trim().slice(0, 12) || "EUR/USD", dir, lot: Math.max(0, +lot.i.value || 0), stop: Math.max(0, +stop.i.value || 0), why: why.i.value.trim().slice(0, 120), res: 0, feel: "", closed: false };
    const a = jnLes(); a.push(e); jnSkriv(a); why.i.value = ""; lagre("journal", { prov: Date.now() }); tegnListe();
  });
  const dirL = el("label", "", J.dir); dirL.append(rad);
  f.append(inst.l, dirL, to, why.l, lagreKnapp); w.append(f);
  const stat = el("div", "jnstat"), h3o = el("h3", "", J.open_t), lo = el("div", "jnl"), h3c = el("h3", "", J.closed_t), lc = el("div", "jnl");
  w.append(stat, h3o, lo, h3c, lc);
  function tegnListe(){
    const a = jnLes().slice().sort((x, y) => y.ts - x.ts), lukkede = a.filter(x => x.closed), apne = a.filter(x => !x.closed);
    const W = lukkede.filter(x => x.res > 0).length, Lt = lukkede.filter(x => x.res < 0).length, sum = lukkede.reduce((s, x) => s + (+x.res || 0), 0);
    const medStop = a.filter(x => x.stop > 0).length, P = a.length ? Math.round(100 * medStop / a.length) : 0;
    stat.innerHTML = "";
    if(!a.length){ stat.append(el("span", "", J.tom)); }
    else {
      stat.append(el("span", "", J.stat.replace("{N}", lukkede.length).replace("{W}", W).replace("{L}", Lt)));
      const tb = el("b", sum > 0 ? "pos" : sum < 0 ? "neg" : "", (sum > 0 ? "+" : sum < 0 ? "−" : "") + "$" + Math.abs(sum).toFixed(2)); const tl = el("span", "", J.total + " "); tl.append(tb); stat.append(tl);
      stat.append(el("span", "", J.prosess.replace("{P}", P)));
      if(lukkede.length && lukkede.length < 20) stat.append(el("span", "", J.tendens));
    }
    lo.innerHTML = ""; lc.innerHTML = ""; h3o.classList.toggle("skjul", !apne.length); h3c.classList.toggle("skjul", !lukkede.length);
    const dato = ts => new Intl.DateTimeFormat(LOK(), { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(ts));
    apne.forEach(x => {
      const r = el("div", "jnr"); r.append(el("b", "", x.inst + " · " + (x.dir === "sell" ? J.sell : J.buy) + " · " + x.lot.toFixed(2) + " lot"), el("span", "r", x.stop ? "SL " + x.stop : ""));
      r.append(el("small", "", dato(x.ts) + (x.why ? " – " + x.why : "")));
      /* Etter: resultat + følelse, så lukkes den */
      const hv = el("div", "hv"), res = document.createElement("input"); res.type = "number"; res.inputMode = "decimal"; res.step = "0.01"; res.placeholder = J.res; res.className = "jn-res";
      let feel = ""; const chips = el("div", "hv jn-feels"); J.feels.forEach(fl => { const b = el("button", "", fl); b.type = "button"; b.addEventListener("click", () => { feel = fl; Array.from(chips.children).forEach(c => c.classList.remove("hoved")); b.classList.add("hoved"); }); chips.append(b); });
      const band = el("button", "hoved", J.band); band.type = "button"; band.addEventListener("click", () => { const a2 = jnLes(); const e = a2.find(y => y.ts === x.ts); if(e){ e.res = +res.value || 0; e.feel = feel; e.closed = true; jnSkriv(a2); } tegnListe(); });
      const slett = el("button", "farlig", J.slett); slett.type = "button"; slett.addEventListener("click", () => { jnSkriv(jnLes().filter(y => y.ts !== x.ts)); tegnListe(); });
      hv.append(res, band, slett); r.append(el("small", "", J.feel), chips, hv); lo.append(r);
    });
    lukkede.forEach(x => {
      const r = el("div", "jnr"); r.append(el("b", "", x.inst + " · " + (x.dir === "sell" ? J.sell : J.buy) + " · " + (+x.lot).toFixed(2) + " lot"), el("span", "r " + (x.res > 0 ? "pos" : x.res < 0 ? "neg" : ""), (x.res > 0 ? "+" : x.res < 0 ? "−" : "") + "$" + Math.abs(+x.res || 0).toFixed(2)));
      r.append(el("small", "", dato(x.ts) + (x.feel ? " · " + x.feel : "") + (x.why ? " – " + x.why : "")));
      const hv = el("div", "hv"), slett = el("button", "farlig", J.slett); slett.type = "button"; slett.addEventListener("click", () => { jnSkriv(jnLes().filter(y => y.ts !== x.ts)); tegnListe(); }); hv.append(slett); r.append(hv); lc.append(r);
    });
  }
  tegnListe();
}
/* Leder-toolbox (#333 / #247): invite først; Min side secondary; forhåndsvis (#325 logic on v2).
   Approve/email: hub ledere.html. Soft-fail uten kode / Sheets. */
function lesMe(){
  let me = LS.get("me", null);
  if(!me){
    try{
      const h = JSON.parse(localStorage.getItem("aimpire.me") || "null");
      if(typeof h === "string" && /^[0-9a-z]{6}$/.test(h)) me = { id: h, name: "", link: "" };
      else if(h && typeof h === "object" && /^[0-9a-z]{6}$/.test(h.id || "")) me = h;
    }catch(e){}
  }
  return me;
}
function visLedere(){
  const D = T.ld, v = verktoyHode(D.kit || D.t), w = el("div", "vt ldkit"); v.append(w);
  w.append(el("p", "under", D.u));
  const kit = el("div", "ldkit-hode"); kit.append(el("h3", "", D.invite || D.meri));
  const boks = el("div", "ldkit-boks");
  w.append(kit, boks);
  /* Code unlock secondary (details) — toolbox-first, not «Min side» first */
  const min = el("details", "ldmin"), minSum = el("summary", "", D.min || D.kode);
  const kode = el("div", "ldkode"), inp = document.createElement("input"), knapp = el("button", "", D.sjekk), feil = el("div", "ldfeil");
  inp.maxLength = 12; inp.autocapitalize = "off"; inp.autocomplete = "off"; inp.spellcheck = false;
  inp.placeholder = D.kode; inp.setAttribute("aria-label", D.kode); knapp.type = "button";
  kode.append(inp, knapp);
  min.append(minSum, el("p", "under", D.min_u || ""), kode, feil);
  function lukkFoyerPrev(prevHold, prevBtn, kitEl){
    if(!prevHold || prevHold.classList.contains("skjul")) return;
    prevHold.classList.add("skjul");
    prevHold.innerHTML = "";
    if(kitEl) kitEl.classList.remove("ldprev-aapen");
    if(prevBtn){ prevBtn.textContent = D.dekhe || D.sjekk; queueMicrotask(() => prevBtn.focus()); }
  }
  function tegnFoyerPrev(me, url, lukk){
    const hold = el("div", "ldprev");
    /* Quiet chrome: sentence eyebrow + soft exit — no ALL CAPS / tracked labels (B-052) */
    const chrome = el("div", "ldprev-chrome");
    chrome.append(el("p", "ldprev-eyebrow", D.dekhe_t || D.dekhe || ""));
    const tilbake = el("button", "ldprev-tilbake", "");
    tilbake.type = "button";
    tilbake.setAttribute("aria-label", D.dekhe_tilbake || D.dekhe || "");
    tilbake.innerHTML = '<svg class="ik" aria-hidden="true"><use href="#i-back"/></svg>';
    tilbake.append(document.createTextNode(D.dekhe_tilbake || "←"));
    tilbake.addEventListener("click", lukk);
    chrome.append(tilbake);
    hold.append(chrome);
    if(D.dekhe_u) hold.append(el("p", "ldprev-hint", D.dekhe_u.replace("{N}", me.name || me.id)));
    /* Same foyer grammar as #intro (v2): brand · leader · trygg · t1 · lede · one CTA */
    const foil = el("div", "ldprev-foyer");
    const merke = el("div", "ldprev-merke ltr");
    const img = document.createElement("img"); img.src = "ap-gradient-96.png"; img.alt = ""; img.width = 40; img.height = 40;
    const word = el("b", "", ""); word.append(document.createTextNode("AIM"), el("span", "", "PIRE"));
    merke.append(img, word);
    const strip = el("div", "ldprev-strip");
    strip.append(el("div", "avi", (me.name || "?").slice(0, 1).toUpperCase()));
    const txt = el("div", "txt"); txt.append(el("small", "", T.leder), el("b", "", me.name || me.id)); strip.append(txt);
    foil.append(merke, strip);
    if(T.trygg) foil.append(el("p", "ldprev-trygg", T.trygg));
    foil.append(el("p", "ldprev-lede", T.intro_t || ""));
    if(T.intro_u) foil.append(el("p", "ldprev-lede-u", T.intro_u));
    foil.append(el("span", "ldprev-cta", T.reg || ""));
    hold.append(foil);
    const aks = el("div", "ldprev-aksjoner");
    const open = el("a", "ldprev-open", D.dekhe_open || D.dekhe || "");
    open.href = url; open.target = "_blank"; open.rel = "noopener";
    aks.append(open);
    hold.append(aks);
    return hold;
  }
  function tegn(){
    boks.innerHTML = "";
    w.classList.remove("ldprev-aapen");
    const me = lesMe();
    if(!me){
      boks.append(el("p", "tom", D.ingen));
      min.open = true;
      return;
    }
    /* B-055: to lenker. «Seekhne ka link» = lær først (B-053). «Account ka link» (&v=1) = verve-inngangen med kontoen som
       handling. Lederen velger etter samtalen; valget huskes. */
    const type = LS.get("ld_lenketype", "laer");
    const url = appUrl(me) + (type === "konto" ? "&v=1" : ""), tekst = delTekst(url);
    const b = el("div", "ldlink"), navn = el("div", "navn");
    navn.append(el("b", "", me.name || me.id), el("span", "ok", me.name ? "✓ " + D.ok : ""));
    const valg = el("div", "ldvalg"); valg.setAttribute("role", "group");
    [["laer", T.ld_lenke_laer], ["konto", T.ld_lenke_konto]].forEach(([k, lab]) => {
      const vb = el("button", "", lab || k); vb.type = "button"; vb.setAttribute("aria-pressed", String(k === type));
      vb.addEventListener("click", () => { if(k === LS.get("ld_lenketype", "laer")) return; LS.set("ld_lenketype", k); visLedere(); });
      valg.append(vb);
    });
    b.append(el("small", "", D.meri), navn, valg, el("p", "ldvalg-u", T.ld_lenke_u || ""), el("code", "", url));
    if(T.aapne || D.aapne) b.append(el("p", "ldaapne", T.aapne || D.aapne));
    const rad = el("div", "rad ldaksjoner");
    const kopi = el("button", "hoved", D.kopi); kopi.type = "button";
    kopi.addEventListener("click", () => { navigator.clipboard.writeText(url).then(() => toast(T.kopiert)).catch(() => window.prompt("", url)); });
    const wa = el("button", "", D.wa || "WhatsApp"); wa.type = "button";
    wa.addEventListener("click", () => { window.open("https://wa.me/?text=" + encodeURIComponent(tekst), "_blank", "noopener"); });
    const bhej = el("button", "", D.bhej); bhej.type = "button";
    bhej.addEventListener("click", () => delLenke(url, tekst));
    rad.append(kopi, wa, bhej); b.append(rad);
    const ekstra = el("div", "rad ldaksjoner ldaksjoner-sek");
    const qrBtn = el("button", "", D.qr || "QR"); qrBtn.type = "button";
    const qrHold = el("div", "ldqr skjul");
    qrBtn.addEventListener("click", () => {
      if(!qrHold.classList.contains("skjul") && qrHold.childNodes.length){ qrHold.classList.add("skjul"); return; }
      qrBtn.disabled = true;
      qrLast().then(() => {
        qrHold.innerHTML = ""; qrHold.append(tegnQrSvg(url));
        if(D.qr_scan) qrHold.append(el("p", "ldqr-scan", D.qr_scan));
        qrHold.classList.remove("skjul");
        qrBtn.disabled = false;
      }).catch(() => { qrBtn.disabled = false; toast(D.qr_feil || D.feil); });
    });
    /* Forhåndsvisning (#325 rebase on v2): brand foyer + soft exit. */
    const prevBtn = el("button", "lddekhe", D.dekhe || D.sjekk); prevBtn.type = "button";
    const prevHold = el("div", "ldprev-wrap skjul");
    const lukkPrev = () => lukkFoyerPrev(prevHold, prevBtn, w);
    prevBtn.addEventListener("click", () => {
      if(!prevHold.classList.contains("skjul")){ lukkPrev(); return; }
      prevHold.innerHTML = "";
      prevHold.append(tegnFoyerPrev(me, url, lukkPrev));
      prevHold.classList.remove("skjul");
      w.classList.add("ldprev-aapen");
      prevBtn.textContent = D.dekhe_tilbake || D.dekhe || "";
      queueMicrotask(() => {
        const t = prevHold.querySelector(".ldprev-tilbake");
        if(t) t.focus();
        const chrome = prevHold.querySelector(".ldprev-chrome");
        (chrome || prevHold).scrollIntoView({ block: "start", behavior: "smooth" });
      });
    });
    ekstra.append(qrBtn, prevBtn); b.append(ekstra, qrHold, prevHold);
    /* Bio (#93 hub): ren URL til Instagram/TikTok – ingen inntektsløfter. */
    if(D.bio_title){
      const bio = el("div", "ldbio");
      bio.append(el("b", "", D.bio_title), el("p", "", D.bio_body || ""));
      const bioBtn = el("button", "", D.bio_copy || D.kopi); bioBtn.type = "button";
      bioBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(url).then(() => { bioBtn.textContent = D.bio_done || T.kopiert; toast(T.kopiert); setTimeout(() => { bioBtn.textContent = D.bio_copy || D.kopi; }, 2200); }).catch(() => window.prompt("", url));
      });
      bio.append(bioBtn); b.append(bio);
    }
    if(D.khud) b.append(el("p", "ldnote", D.khud));
    boks.append(b);
  }
  knapp.addEventListener("click", async () => {
    const k = inp.value.toLowerCase().replace(/[^a-z0-9]/g, "").slice(-6); feil.textContent = "";
    if(!/^[0-9a-z]{6}$/.test(k)){ feil.textContent = D.feil; return; }
    knapp.disabled = true; knapp.textContent = D.sjekker || "…";
    try{
      const ld = await finnLeder(k);
      if(ld){
        LS.set("me", ld);
        try{ localStorage.setItem("aimpire.me", JSON.stringify(ld.id)); }catch(e){}
        tegn();
        $("#l-ledere span").textContent = D.kit || D.t;
        min.open = false;
      } else feil.textContent = D.feil;
    }catch(e){
      const husk = lesMe();
      if(husk && husk.id === k){ feil.textContent = D.offline_ok || D.offline || D.feil; tegn(); }
      else feil.textContent = D.offline || D.feil;
    }
    knapp.disabled = false; knapp.textContent = D.sjekk;
  });
  const hub = el("div", "ldhub");
  hub.append(el("p", "under", D.full_u || ""));
  /* Secondary text row — not a second gradient CTA (B-052: én primær per skjerm) */
  const full = el("a", "ldhub-link", D.full);
  full.href = C.ledere_side || "../ledere.html";
  hub.append(full);
  w.append(boks, min, hub);
  tegn();
}
document.addEventListener("keydown", e => { if(e.key === "Escape" && aapen >= 0) lukk(); });
})();
