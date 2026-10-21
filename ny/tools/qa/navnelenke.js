// Nesté navnelenke (B-038-port): ?n= / #slug / bare ?l=slug → kode via Sheets + SNAP.
// Soft-fail: docs.google.com abort → kode fra navnelenker-reserve.csv, ærlig pending (navn = #278).
// Run: node navnelenke.js <UT> <BASE>   (via tools/qa/kjor-navnelenke.sh)
const path = require("path");
const { chromium } = require(path.join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2] || "/tmp/neste-navnelenke";
const BASE = process.argv[3] || "http://127.0.0.1:8771/neste/";

function lederState() {
  try {
    const raw = localStorage.getItem("neste.leder");
    const o = raw ? JSON.parse(raw) : null;
    const kode = JSON.parse(localStorage.getItem("neste.leder_kode") || "null");
    const pending = JSON.parse(localStorage.getItem("neste.navnelenke_pending") || "false");
    const slug = JSON.parse(localStorage.getItem("neste.navnelenke_slug") || "null");
    const tekst = ((document.getElementById("leder") || {}).innerText || "").replace(/\s+/g, " ").trim();
    return {
      id: o && o.id || null,
      navn: o && o.name || null,
      kode: kode,
      pending: !!pending,
      slug: slug,
      tekst: tekst.slice(0, 120),
      href: location.href,
    };
  } catch (e) {
    return { id: null, navn: null, kode: null, pending: false, slug: null, tekst: "", href: location.href };
  }
}

(async () => {
  const fs = require("fs");
  try { fs.mkdirSync(UT, { recursive: true }); } catch (e) {}
  const b = await chromium.launch();
  const feil = [];
  const ut = [];

  async function scene(navn, url, routeFn, expect) {
    const c = await b.newContext({
      viewport: { width: 360, height: 800 },
      isMobile: true,
      hasTouch: true,
      serviceWorkers: "block",
    });
    const p = await c.newPage();
    const errs = [];
    p.on("pageerror", (e) => errs.push(String(e.message || e).slice(0, 100)));
    if (routeFn) await routeFn(p);
    await p.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await p.waitForTimeout(4500);
    const st = await p.evaluate(lederState).catch(() => null);
    const bad = [];
    if (!st) bad.push("ingen state");
    else {
      if (expect.kode && st.kode !== expect.kode) bad.push("kode=" + st.kode + " forventet " + expect.kode);
      if (expect.id && st.id !== expect.id) bad.push("id=" + st.id + " forventet " + expect.id);
      if (expect.navn && !(st.navn || "").toLowerCase().includes(String(expect.navn).toLowerCase())) {
        bad.push("navn=" + st.navn + " forventet ~" + expect.navn);
      }
      if (expect.pending === true && !st.pending && !st.navn) bad.push("pending mangler");
      /* Med lederreserven (#278) løses navnet selv når Google er blokkert – da er navn bedre enn ventetekst. */
      if (expect.pendingTekst && !(expect.navnGodtar && st.navn) && !(st.tekst || "").match(expect.pendingTekst)) {
        bad.push("tekst mangler soft-fail: " + st.tekst);
      }
      if (expect.slug && st.slug !== expect.slug) bad.push("slug=" + st.slug);
    }
    if (errs.length) bad.push("JS:" + errs.join("|"));
    const ok = bad.length === 0;
    if (!ok) feil.push(navn + ": " + bad.join(" | "));
    ut.push((ok ? "ok " : "FEIL ") + navn + " · " + JSON.stringify(st) + (bad.length ? " · " + bad.join(" | ") : ""));
    if (navn.indexOf("snap") >= 0 || navn.indexOf("n=") === 0) {
      await p.screenshot({ path: path.join(UT, navn.replace(/[^a-z0-9_-]+/gi, "_") + "-360.png") }).catch(() => {});
    }
    await c.close();
  }

  const blockSheets = (p) => p.route(/docs\.google\.com|googleusercontent\.com/, (r) => r.abort());

  await scene("n=rehman online", BASE + "?n=rehman&lang=ur_rm", null, { kode: "nogufl", id: "nogufl", navn: "Rehman" });
  await scene("hash#asma online", BASE + "?lang=en#asma", null, { kode: "pbv4ta", id: "pbv4ta" });
  await scene("l=asma slug", BASE + "?l=asma&lang=ur_rm", null, { kode: "pbv4ta", id: "pbv4ta" });
  await scene("l=rehman-nogufl legacy", BASE + "?l=rehman-nogufl&lang=en", null, { kode: "nogufl", id: "nogufl", navn: "Rehman" });
  await scene("n=rehman sheets-snap", BASE + "?n=rehman&lang=ur", blockSheets, {
    kode: "nogufl",
    slug: "rehman",
    pending: true,
    pendingTekst: /activate|فعال|online|list|لنک|link/i,
    navnGodtar: true,   /* #278-reserven gir Rehman uten Google */
  });
  await scene("n=ukjent soft-fail", BASE + "?n=zzzznotaleader&lang=en", blockSheets, {
    slug: "zzzznotaleader",
    pending: true,
    pendingTekst: /activate|Try again|minutes/i,
  });

  console.log(ut.join("\n"));
  console.log(JSON.stringify({ feil, ok: feil.length === 0 }, null, 1));
  await b.close();
  process.exit(feil.length ? 1 : 0);
})().catch((e) => { console.error("FEIL", e); process.exit(1); });
