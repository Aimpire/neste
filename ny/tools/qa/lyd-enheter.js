// Lyd + animasjon på alle enheter (#282, founder 20.10 20:40: «husk de må funke på alle mobiler, pc-er og iPads»).
// Ekte motorer: WebKit (iPhone, iPad, Safari på Mac), Chromium (Android, Chrome/Edge på PC), Firefox (PC).
// Per enhet: leksjon med animasjon → «se og hør» starter lyd OG animasjon på ett trykk → «igjen» starter lyden på nytt
// (lyden må startes inne i trykket, ellers stopper iPhone/iPad den) → pause/spill på lydknappen → leksjon uten animasjon.
// Bruk: node lyd-enheter.js <utmappe> <base-url>
const path = require("path");
const pw = require(path.join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3];
const D = pw.devices;
const ENHETER = [
  ["webkit", "iPhone SE", D["iPhone SE"], "ur"],
  ["webkit", "iPhone 14", D["iPhone 14"], "ur_rm"],
  ["webkit", "iPad (gen 7)", D["iPad (gen 7)"], "ur"],
  ["webkit", "iPad Pro 11 liggende", D["iPad Pro 11 landscape"], "no"],
  ["webkit", "Safari Mac", { viewport: { width: 1440, height: 900 } }, "en"],
  ["chromium", "Galaxy S9+ (Android)", D["Galaxy S9+"], "ur"],
  ["chromium", "Pixel 7 (Android)", D["Pixel 7"], "ur_rm"],
  ["chromium", "Chrome PC", { viewport: { width: 1366, height: 768 } }, "no"],
  ["firefox", "Firefox PC", { viewport: { width: 1280, height: 800 } }, "ur"],
];
const lydStatus = p => p.evaluate(() => { const a = document.querySelector("#lek audio"); return a ? { paused: a.paused, t: +a.currentTime.toFixed(2), src: a.getAttribute("src"), rs: a.readyState, err: a.error ? a.error.code : 0 } : null; });
const trykkbar = (p, sel) => p.evaluate(s => { const e = document.querySelector(s); if (!e) return "mangler"; const r = e.getBoundingClientRect(); if (!r.width) return "usynlig";
  const x = r.left + r.width / 2, y = r.top + r.height / 2; if (y < 0 || y > innerHeight) { e.scrollIntoView({ block: "center" }); return "ok"; }
  const t = document.elementFromPoint(x, y); return t && (t === e || e.contains(t)) ? "ok" : "dekket av " + (t ? (t.className || t.tagName) : "-"); }, sel);

(async () => {
  const resultat = [], feil = [];
  for (const [motor, navn, enhet, lang] of ENHETER) {
    const b = await pw[motor].launch();
    const opts = { ...enhet }; if (motor === "firefox") { delete opts.isMobile; delete opts.hasTouch; }
    const c = await b.newContext(opts); await c.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });   /* returnerende medlem: førstegangsflyten testes i reg-gate.js */ const p = await c.newPage(); const f = [];
    p.on("pageerror", e => f.push("JS: " + String(e).slice(0, 90)));
    try {
      await p.goto(BASE + "?lang=" + lang + "#academy", { waitUntil: "networkidle" }); await p.waitForTimeout(600);
      await p.click(".skinne .leks >> nth=0"); await p.waitForTimeout(1200);
      // 1. se og hør: ett trykk starter begge
      const s1 = await trykkbar(p, "#lek .anim .start"); if (s1 !== "ok") f.push("start-knapp " + s1);
      await p.click("#lek .anim .start");
      /* Vent til lyden faktisk går fram (opptil 8 s) – fast pause ga falske feil ved kald start under last (20.10). */
      await p.waitForFunction(() => { const a = document.querySelector("#lek audio"); return a && !a.paused && a.currentTime > 0.5; }, null, { timeout: 8000 }).catch(() => {});
      const a1 = await lydStatus(p);
      const anim = await p.evaluate(() => { try { return !!document.querySelector("#lek .anim iframe").contentDocument.querySelector(".scene.vis, .vis"); } catch (e) { return "kryss-origin"; } });
      if (!a1) f.push("ingen audio i leksjonen");
      else { if (a1.paused || a1.t < 0.5) f.push(`se-og-hør: lyd spiller ikke (paused=${a1.paused}, t=${a1.t}, readyState=${a1.rs}, err=${a1.err})`);
             const vent = (lang === "ur" || lang === "ur_rm") ? "-ur.mp3" : `-${lang}.mp3`; if (!a1.src.endsWith(vent)) f.push(`feil spor ${a1.src} (ventet *${vent})`); }
      if (anim !== true) f.push("animasjonen startet ikke (" + anim + ")");
      // 2. igjen: lyden starter på nytt inne i trykket
      await p.waitForTimeout(1500);
      const s2 = await trykkbar(p, "#lek .anim .igjen"); if (s2 !== "ok") f.push("igjen-knapp " + s2);
      await p.click("#lek .anim .igjen");
      await p.waitForFunction(() => { const a = document.querySelector("#lek audio"); return a && !a.paused && a.currentTime > 0.3; }, null, { timeout: 8000 }).catch(() => {});
      const a2 = await lydStatus(p);
      if (!a2 || a2.paused || a2.t > 3.5 || a2.t < 0.3) f.push(`igjen: lyd startet ikke på nytt (paused=${a2 && a2.paused}, t=${a2 && a2.t})`);
      // 3. pause og spill på lydknappen
      await p.click("#lek .lydk"); await p.waitForTimeout(400);
      const a3 = await lydStatus(p); if (!a3 || !a3.paused) f.push("pause virket ikke");
      await p.click("#lek .lydk"); await p.waitForTimeout(1200);
      const a4 = await lydStatus(p); if (!a4 || a4.paused) f.push("spill etter pause virket ikke");
      const feilTekst = await p.$("#lek .lydfeil"); if (feilTekst) f.push("feilmelding vist: " + (await feilTekst.textContent()));
      const bred = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (bred > 1) f.push("sidescroll " + bred + " px");
      await p.screenshot({ path: `${UT}/lyd-${navn.replace(/[^a-z0-9]+/gi, "-")}.png` });
      // 4. leksjon uten animasjon (spread): bare lydknappen
      await p.click("#lek .hode button"); await p.waitForTimeout(600);
      await p.click(".skinne .leks >> nth=2"); await p.waitForTimeout(900);
      await p.click("#lek .lydk");
      await p.waitForFunction(() => { const a = document.querySelector("#lek audio"); return a && !a.paused && a.currentTime > 0.5; }, null, { timeout: 8000 }).catch(() => {});
      const a5 = await lydStatus(p); if (!a5 || a5.paused || a5.t < 0.5) f.push(`spread: lyd spiller ikke (t=${a5 && a5.t})`);
    } catch (e) { f.push("krasj: " + String(e).split("\n")[0].slice(0, 120)); }
    console.log(`${f.length ? "✗" : "✓"} ${motor.padEnd(8)} ${navn.padEnd(24)} [${lang}] ${f.join(" · ")}`);
    resultat.push({ navn, motor, lang, feil: f }); f.forEach(x => feil.push(`${navn}: ${x}`));
    await b.close();
  }
  console.log(JSON.stringify({ enheter: resultat.length, ok: resultat.filter(r => !r.feil.length).length, feil }));
  if (feil.length) process.exit(1);
})().catch(e => { console.error("FEIL", e); process.exit(1); });
