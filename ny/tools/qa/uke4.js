// Uke 4: låst til uke 1–3 er svart riktig; deretter åpne og figurer synlige. Riktig svar finnes via teksten (svarene stokkes).
const path = require("path"), fs = require("fs"), { chromium } = require(path.join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3] || "http://127.0.0.1:8765/neste/";
const INN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../innhold.json"), "utf8"));
(async () => {
  const b = await chromium.launch(), feil = [];
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true }); await ctx.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });   /* returnerende medlem: førstegangsflyten testes i reg-gate.js */
  const p = await ctx.newPage(); p.on("pageerror", e => feil.push("pageerror " + e.message));
  await p.goto(BASE + "?lang=ur_rm#academy", { waitUntil: "networkidle" }); await p.waitForTimeout(500);
  const laastFor = await p.$eval("#uke4", e => e.classList.contains("laast"));
  const svar = async (sel, i, x) => { await p.click(sel + " .leks >> nth=" + i); await p.waitForTimeout(300); await p.getByRole("button", { name: x.sp.ur_rm.o[x.sp.ur_rm.r], exact: true }).click(); await p.waitForTimeout(150); await p.click("#lek .hode button"); await p.waitForTimeout(250); };
  for(let i = 0; i < INN.uke1.length; i++) await svar("#skinne", i, INN.uke1[i]);
  for(let i = 0; i < INN.uke2.length; i++) await svar("#skinne2", i, INN.uke2[i]);
  const laastEtter1 = await p.$eval("#uke4", e => e.classList.contains("laast"));
  for(let i = 0; i < INN.uke3.length; i++) await svar("#skinne3", i, INN.uke3[i]);
  const laastEtter2 = await p.$eval("#uke4", e => e.classList.contains("laast"));
  await p.evaluate(() => document.querySelector("#uke4").scrollIntoView()); await p.screenshot({ path: UT + "/40-uke4.png" });
  const figurer = [];
  for(let i = 0; i < INN.uke4.length; i++){
    await p.click("#skinne4 .leks >> nth=" + i); await p.waitForTimeout(400);
    figurer.push(await p.evaluate(() => { const s = document.querySelector("#lek .fig svg"); if (s) return s.childElementCount; const f = document.querySelector("#lek .anim iframe"); return f && /leksjon\/[a-z]+\.html/.test(f.getAttribute("src") || "") ? 99 : 0; }));   /* animasjon (21.10) erstatter figuren; én av dem skal finnes */
    await p.screenshot({ path: UT + "/41-uke4-" + INN.uke4[i].id + ".png" });
    await p.click("#lek .hode button"); await p.waitForTimeout(250);
  }
  const bred = await p.evaluate(() => document.documentElement.scrollWidth);
  if(!laastFor || !laastEtter1 || laastEtter2) feil.push("låsing feil: " + JSON.stringify({ laastFor, laastEtter1, laastEtter2 }));
  if(figurer.some(n => n < 4)) feil.push("figur/animasjon mangler: " + figurer.join(","));
  console.log(JSON.stringify({ laastFor, laastEtter1, laastEtter2, figurer, bred, feil }, null, 1));
  await b.close();
})().catch(e => { console.error("FEIL", e); process.exit(1); });
