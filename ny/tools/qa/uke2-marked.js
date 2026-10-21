// Uke 2 + markedet nå: svar riktig på alle fem i uke 1, sjekk at uke 2 låses opp, figurer i uke 2, sesjonsstripa.
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3] || "http://127.0.0.1:8765/neste/";
const INN = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../innhold.json"), "utf8"));
(async () => {
  const b = await chromium.launch(), feil = [];
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, timezoneId: "Asia/Karachi" }); await ctx.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });   /* returnerende medlem: førstegangsflyten testes i reg-gate.js */
  const p = await ctx.newPage();
  p.on("console", m => { if(m.type() === "error") feil.push(m.text()); }); p.on("pageerror", e => feil.push("pageerror " + e.message));
  await p.goto(BASE + "?l=rehman-nogufl&lang=ur_rm#academy", { waitUntil: "networkidle" }); await p.waitForTimeout(800);
  const laastFor = await p.$eval("#uke2", e => e.className + " | " + e.querySelector("#uke2-u").textContent + " | knapper deaktivert: " + e.querySelectorAll("button:disabled").length);
  const byer = await p.$$eval("#byer .by", xs => xs.map(x => x.textContent.replace(/\s+/g, " ").trim())), note = await p.textContent("#mk-n");
  await p.evaluate(() => document.querySelector("#mk").scrollIntoView()); await p.screenshot({ path: UT + "/11-marked.png" });
  // svar riktig på alle fem i uke 1 (riktig svar = indeks r i innhold.json; her 0 for alle)
  for(let i = 0; i < 5; i++){
    await p.click("#skinne .leks >> nth=" + i); await p.waitForTimeout(400);
    const x = INN.uke1[i]; await p.getByRole("button", { name: x.sp.ur_rm.o[x.sp.ur_rm.r], exact: true }).click(); await p.waitForTimeout(200);
    await p.click("#lek .hode button"); await p.waitForTimeout(300);
  }
  const laastEtter = await p.$eval("#uke2", e => e.className + " | " + e.querySelector("#uke2-u").textContent + " | knapper deaktivert: " + e.querySelectorAll("button:disabled").length);
  await p.evaluate(() => document.querySelector("#uke2").scrollIntoView()); await p.screenshot({ path: UT + "/12-uke2-opp.png" });
  const kart = await p.$$eval("#kart .rad", r => r.length);
  await p.click("#skinne2 .leks >> nth=0"); await p.waitForTimeout(500); await p.screenshot({ path: UT + "/13-candle.png" });
  await p.click("#lek .hode button"); await p.click("#skinne2 .leks >> nth=1"); await p.waitForTimeout(500); await p.screenshot({ path: UT + "/14-giring.png" });
  await p.click("#lek .hode button"); await p.click("#skinne2 .leks >> nth=2"); await p.waitForTimeout(500); await p.screenshot({ path: UT + "/15-news.png" });
  await p.click("#lek .hode button"); await p.click("#skinne2 .leks >> nth=3"); await p.waitForTimeout(500); await p.screenshot({ path: UT + "/16-demo.png" });
  await p.click("#lek .hode button"); await p.click("#skinne2 .leks >> nth=4"); await p.waitForTimeout(500); await p.screenshot({ path: UT + "/17-journal.png" });
  const lydUke2 = await p.$eval(".lydk", b => b.textContent.trim()).catch(() => null);
  const bred = await p.evaluate(() => document.documentElement.scrollWidth);
  console.log(JSON.stringify({ laastFor, laastEtter, kart, byer, note: (note || "").trim(), lydUke2, bred, feil }, null, 1));
  await b.close();
})().catch(e => { console.error("FEIL", e); process.exit(1); });
