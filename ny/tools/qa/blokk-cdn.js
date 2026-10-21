// Nesté blocked-CDN suite (Pakistan / firewall soft-fail).
// Mirrors hub #275 doctrine: abort + 30 s hang on Fonts/Sheets/TV/gold.
// Pass = shell text, foyer CTA < 3 s, no pageerror, RTL for ur.
// With ledere-reserve.csv SNAP (#267-port): sponsor huskes uten Google-arket.
// Run: node blokk-cdn.js <UT> <BASE>   (via tools/qa/kjor.sh after #274 merge)
const path = require("path");
const { chromium } = require(path.join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2] || "/tmp/neste-blokk";
const BASE = process.argv[3] || "http://127.0.0.1:8771/neste/";

const CDN = /fonts\.googleapis\.com|fonts\.gstatic\.com|s3\.tradingview\.com|tradingview\.com|api\.gold-api\.com|docs\.google\.com|googleusercontent\.com/;
const EKSTERN = /^https?:\/\/(?!127\.0\.0\.1|localhost)/;

const SCEN = [
  ["normalt nett", async () => {}],
  ["cdn avvist", (p) => p.route(CDN, (r) => r.abort())],
  ["cdn henger 30 s", (p) => p.route(CDN, () => {})],
  ["alt eksternt avvist", (p) => p.route(EKSTERN, (r) => r.abort())],
];

function softState() {
  const main = document.querySelector("main") || document.body;
  const foyer = document.querySelector("section.foyer, #intro");
  const h1 = ((document.getElementById("intro-t") || {}).textContent || "").trim();
  const h2 = ((document.getElementById("intro-u") || {}).textContent || "").trim();
  const tegn = (main && main.innerText || "").replace(/\s+/g, " ").trim().length;
  const cta = document.getElementById("foyer-cta");
  const ctaSynlig = !!(cta && cta.offsetParent !== null && (cta.textContent || "").trim().length > 1);
  return {
    tegn,
    foyerSynlig: !!(foyer && foyer.offsetParent !== null && h1.length >= 4),
    heroTekst: (h1 + " " + h2).trim().slice(0, 80),
    ctaSynlig,
    rtl: getComputedStyle(document.documentElement).direction === "rtl"
      || getComputedStyle(document.body).direction === "rtl",
  };
}

function ctaHit(doClick) {
  const e = document.getElementById("foyer-cta");
  if (!e || e.offsetParent === null || (e.textContent || "").trim().length < 2) return "";
  e.scrollIntoView({ block: "center" });
  const q = e.getBoundingClientRect();
  if (q.height < 16) return "";
  const t = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2);
  if (!(t && (t === e || e.contains(t)))) return "";
  const label = "foyer-cta: " + (e.textContent || "").trim().slice(0, 40);
  if (doClick) {
    try { e.click(); } catch (err) { return ""; }
  }
  return label;
}

(async () => {
  const fs = require("fs");
  try { fs.mkdirSync(UT, { recursive: true }); } catch (e) {}
  const b = await chromium.launch();
  let feil = 0;
  const ut = [];

  for (const [navn, sett] of SCEN) {
    for (const lang of ["ur_rm", "en"]) {
      const c = await b.newContext({
        viewport: { width: 360, height: 800 },
        isMobile: true,
        hasTouch: true,
        serviceWorkers: "block",
      });
      const p = await c.newPage();
      const errs = [];
      p.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
      await sett(p);

      const t0 = Date.now();
      await p.goto(BASE + "?l=rehman-nogufl&lang=" + lang, { waitUntil: "commit", timeout: 45000 });

      let tid = null;
      let hva = "";
      while (Date.now() - t0 < 8000) {
        const r = await p.evaluate(ctaHit, false).catch(() => "");
        if (r) {
          tid = Date.now() - t0;
          hva = r;
          break;
        }
        await p.waitForTimeout(100);
      }

      await p.waitForTimeout(Math.max(0, 4000 - (Date.now() - t0)));
      const soft = await p.evaluate(softState).catch(() => null);
      const leder = await p.evaluate(() => {
        try {
          const raw = localStorage.getItem("neste.leder");
          const o = raw ? JSON.parse(raw) : null;
          const kode = localStorage.getItem("neste.leder_kode");
          const kodeVal = kode ? JSON.parse(kode) : null;
          return {
            husket: !!(o && o.id === "nogufl"),
            navn: o && o.name || null,
            kode: kodeVal || null,
          };
        } catch (e) {
          return { husket: false, navn: null, kode: null };
        }
      }).catch(() => ({ husket: false, navn: null, kode: null }));

      let klikkOk = false;
      if (tid !== null) {
        const clicked = await p.evaluate(ctaHit, true).catch(() => "");
        await p.waitForTimeout(250);
        const etter = await p.evaluate(softState).catch(() => null);
        klikkOk = !!(clicked && etter && etter.tegn >= 80);
        if (!clicked) errs.push("CTA-klikk: ingen treff");
      }

      const bad = [];
      if (tid === null) bad.push("ingen foyer-CTA innen 8 s");
      else if (tid >= 3000) bad.push("CTA for treg: " + tid + " ms");
      if (!soft) bad.push("kunne ikke lese soft-state");
      else {
        if (soft.tegn < 120) bad.push("HVIT/tynn shell: " + soft.tegn + " tegn");
        if (!soft.foyerSynlig) bad.push("blank foyer");
        if (!soft.ctaSynlig) bad.push("foyer-CTA skjult");
        if (lang === "ur" || lang === "ur_rm") { /* ur_rm is LTR Roman Urdu */ }
        if (lang === "ur" && !soft.rtl) bad.push("urdu mangler RTL");
      }
      if (errs.length) bad.push("JS:" + errs.join("|"));
      if (tid !== null && !klikkOk) bad.push("CTA-klikk ødela siden");
      /* #267-port: SNAP maa gi sponsor uten Sheets (alle scener). */
      if (!leder.husket) bad.push("leder ikke husket (SNAP/?l=) — id=" + (leder.kode || "?"));

      const ok = bad.length === 0;
      if (!ok) feil++;
      const tidTxt = tid === null ? "—" : tid + " ms – " + hva;
      ut.push(
        (ok ? "ok " : "FEIL ") + navn + " " + lang + ": CTA " + tidTxt
        + " · shell " + (soft ? soft.tegn : "?") + " tegn"
        + " · foyer " + (soft && soft.foyerSynlig ? "ok" : "BLANK")
        + " · leder " + (leder.husket ? "ja (" + (leder.navn || "") + ")" : "NEI")
        + (bad.length ? " · " + bad.join(" | ") : "")
      );
      if (navn === "cdn avvist" && lang === "ur_rm") {
        await p.screenshot({ path: path.join(UT, "blokk-cdn-avvist-ur_rm-360.png") }).catch(() => {});
      }
      await c.close();
    }
  }

  const rapport = ut.join("\n") + "\n" + (feil ? feil + " feil" : "alle ok");
  console.log(rapport);
  try { fs.writeFileSync(path.join(UT, "blokk-cdn.txt"), rapport); } catch (e) {}
  await b.close();
  process.exitCode = feil ? 1 : 0;
})().catch((e) => {
  console.error("FEIL", e);
  process.exit(1);
});
