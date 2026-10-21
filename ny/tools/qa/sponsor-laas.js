// B-023 sponsor-lås i skallet (founder 16.10 21:37: «ingen vinner stille»). Negativ kontroll:
// telefon med husket leder A åpner lenke fra leder B → A står urørt til medlemmet velger; valget låser.
// Også: ark blokkert → lagret leder røres ikke (koden huskes bare som ventende).
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3];
const A = { id: "2mcmat", name: "Testleder A", link: "https://copyxapp.com/auth/register?e=AAAAAAAAAAAAAAAAAAAAAAAA&a=1" };
(async () => {
  const b = await chromium.launch(), feil = [];
  const ny = async (blokker) => {
    const c = await b.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
    await c.addInitScript((a) => { try { localStorage.setItem("neste.foerste", "true"); localStorage.setItem("neste.lang", "\"ur_rm\""); localStorage.setItem("neste.leder", JSON.stringify(a)); } catch (e) {} }, A);
    if (blokker) await c.route(/docs\.google\.com|ledere-reserve\.csv/, r => r.abort());
    return c.newPage();
  };
  // 1. B fra lenke, lista tilgjengelig → spørsmål, A ikke overskrevet
  let p = await ny(false);
  await p.goto(BASE + "?l=rehman-nogufl", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  let r = await p.evaluate(() => ({ leder: JSON.parse(localStorage.getItem("neste.leder") || "null"), konflikt: JSON.parse(localStorage.getItem("neste.leder_konflikt") || "null"), knapper: [...document.querySelectorAll("#leder .konflikt-valg button")].map(x => x.textContent.trim()) }));
  if (!r.leder || r.leder.id !== A.id) feil.push("A ble overskrevet uten spørsmål: " + JSON.stringify(r.leder));
  if (!r.konflikt || r.knapper.length !== 2) feil.push("spørsmålet vises ikke: " + JSON.stringify(r.knapper));
  await p.screenshot({ path: UT + "/sponsor-konflikt.png" });
  // 2. medlemmet velger B → B låst, spørsmålet borte
  if (r.knapper.length === 2) {
    await p.click("#leder .konflikt-valg button >> nth=1"); await p.waitForTimeout(500);
    const r2 = await p.evaluate(() => ({ leder: JSON.parse(localStorage.getItem("neste.leder") || "null"), konflikt: localStorage.getItem("neste.leder_konflikt") }));
    if (!r2.leder || r2.leder.id === A.id) feil.push("valget ble ikke lagret");
    if (r2.konflikt && r2.konflikt !== "null") feil.push("spørsmålet sto igjen etter valg");
  }
  await p.context().close();
  // 3. lista blokkert (Pakistan/Google nede) → A urørt, ingen stille overskriving
  p = await ny(true);
  await p.goto(BASE + "?l=rehman-nogufl", { waitUntil: "load" }); await p.waitForTimeout(6000);
  r = await p.evaluate(() => JSON.parse(localStorage.getItem("neste.leder") || "null"));
  if (!r || r.id !== A.id) feil.push("ark blokkert: A ble overskrevet: " + JSON.stringify(r));
  await p.context().close();
  console.log(JSON.stringify({ feil }, null, 1));
  await b.close(); if (feil.length) process.exit(1);
})().catch(e => { console.error("FEIL", e); process.exit(1); });
