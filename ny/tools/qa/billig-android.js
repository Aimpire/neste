// Billig Android (#259, founder: «høy standard hele veien»): 4× CPU-struping + treg 3G (400 kbps, 400 ms).
// Måler tid til forsiden og hovedknappen er synlige og trykkbare, og tid til første leksjon er åpen.
// Grense: knapp innen 5 s, leksjon innen 2 s etter trykk. Bruk: node billig-android.js <utmappe> <base-url>
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3];
(async () => {
  const b = await chromium.launch(), feil = [], rader = [];
  for (const [navn, lang, l] of [["ny via lederlenke", "", "rehman-nogufl"], ["returnerende urdu", "ur", ""]]) {
    const c = await b.newContext({ viewport: { width: 360, height: 760 }, isMobile: true, hasTouch: true, serviceWorkers: "block" });
    if (navn.startsWith("returnerende")) await c.addInitScript(() => { try { localStorage.setItem("neste.foerste", "true"); } catch (e) {} });
    const p = await c.newPage(); const cdp = await c.newCDPSession(p);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 400, downloadThroughput: 400 * 1024 / 8, uploadThroughput: 200 * 1024 / 8 });
    const t0 = Date.now();
    await p.goto(BASE + "?" + (lang ? "lang=" + lang : "") + (l ? "&l=" + l : ""), { waitUntil: "commit" });
    await p.waitForFunction(() => { const k = document.querySelector("#foyer-cta"); if (!k || !k.textContent.trim()) return false; const r = k.getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return r.width > 0 && e && (e === k || k.contains(e)); }, null, { timeout: 30000, polling: 100 }).catch(() => feil.push(navn + ": hovedknappen ble aldri trykkbar"));
    const knapp = Date.now() - t0;
    const t1 = Date.now();
    await p.click("#foyer-cta").catch(() => {});
    await p.waitForFunction(() => { const l = document.querySelector("#lek:not(.skjul)"); return l && l.querySelector(".linjer p, .anim, .figur"); }, null, { timeout: 15000, polling: 100 }).catch(() => feil.push(navn + ": leksjonen åpnet ikke"));
    const leksjon = Date.now() - t1;
    rader.push({ navn, knapp_ms: knapp, leksjon_ms: leksjon });
    if (knapp > 5000) feil.push(`${navn}: hovedknapp etter ${knapp} ms (> 5000)`);
    if (leksjon > 2000) feil.push(`${navn}: leksjon etter ${leksjon} ms (> 2000)`);
    await p.screenshot({ path: `${UT}/billig-${navn.replace(/\s+/g, "-")}.png` });
    await c.close();
  }
  console.log(JSON.stringify({ rader, feil }, null, 1));
  await b.close(); if (feil.length) process.exit(1);
})().catch(e => { console.error("FEIL", e); process.exit(1); });
