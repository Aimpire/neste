// Verktøy: kalkulator-visning og journal (før → lagre → etter → lukk → statistikk).
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3] || "http://127.0.0.1:8765/neste/";
(async () => {
  const b = await chromium.launch(), feil = [];
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); await ctx.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });   /* returnerende medlem: førstegangsflyten testes i reg-gate.js */
  const p = await ctx.newPage();
  p.on("console", m => { if(m.type() === "error") feil.push(m.text()); }); p.on("pageerror", e => feil.push("pageerror " + e.message));
  await p.goto(BASE + "?lang=ur_rm#paisa", { waitUntil: "networkidle" }); await p.waitForTimeout(500);
  await p.click("#p-kalk"); await p.waitForTimeout(300);
  const kalk = await p.$eval("#lek .kalk .ut", e => e.textContent.replace(/\s+/g, " ").trim());
  await p.screenshot({ path: UT + "/18-kalk.png" });
  await p.click("#lek .hode button"); await p.evaluate(() => { location.hash = "#mazeed"; }); await p.waitForTimeout(200); await p.click("#l-journal"); await p.waitForTimeout(300);
  const tom = await p.textContent("#lek .jnstat");
  await p.fill("#lek .jnf input[type=text] >> nth=1", "Trend upar, pullback pe entry");
  await p.click("#lek .jnf .knapp"); await p.waitForTimeout(200);
  const apne = await p.$$eval("#lek .jnl >> nth=0 >> .jnr", r => r.length);
  await p.screenshot({ path: UT + "/19-journal-open.png" });
  await p.fill("#lek .jnr input[type=number]", "12.5");
  await p.click("#lek .jnr .hv button >> text=Sukoon"); await p.click("#lek .jnr .hv button.hoved >> nth=-1"); await p.waitForTimeout(200);
  const stat = await p.textContent("#lek .jnstat"), lukkede = await p.$$eval("#lek .jnl >> nth=1 >> .jnr", r => r.length);
  await p.screenshot({ path: UT + "/20-journal-closed.png" });
  const lagret = await p.evaluate(() => localStorage.getItem("neste.journal")), frem = await p.evaluate(() => JSON.parse(localStorage.getItem("neste.frem") || "{}").journal);
  const bred = await p.evaluate(() => document.querySelector("#lek").scrollWidth);
  console.log(JSON.stringify({ kalk, tom: (tom || "").trim(), apne, stat: (stat || "").replace(/\s+/g, " ").trim(), lukkede, lagret, frem, bred, feil }, null, 1));
  await b.close();
})().catch(e => { console.error("FEIL", e); process.exit(1); });
