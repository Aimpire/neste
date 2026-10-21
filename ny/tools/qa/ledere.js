// Leder share-kit (#290 / #247): unlock → copy / WA / QR / bio / Chrome-hint. Soft-fail offline.
const path = require("path"), { chromium } = require(path.join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3] || "http://127.0.0.1:8765/neste/";
(async () => {
  const b = await chromium.launch(), feil = [];
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); await ctx.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });   /* returnerende medlem: førstegangsflyten testes i reg-gate.js */
  const p = await ctx.newPage(); p.on("pageerror", e => feil.push("pageerror " + e.message)); p.on("dialog", d => d.dismiss());
  await p.goto(BASE + "?lang=ur_rm#mazeed", { waitUntil: "networkidle" }); await p.waitForTimeout(400);
  await p.click("#l-ledere"); await p.waitForTimeout(300);
  const tom = await p.textContent("#lek .vt .tom").catch(() => null);
  await p.fill("#lek .ldkode input", "NOGUFL"); await p.click("#lek .ldkode button"); await p.waitForTimeout(2800);
  const navn = await p.textContent("#lek .ldlink .navn").catch(() => null);
  const url = await p.textContent("#lek .ldlink code").catch(() => null);
  const aapne = await p.textContent("#lek .ldaapne").catch(() => null);
  const bio = await p.textContent("#lek .ldbio b").catch(() => null);
  const knapper = await p.$$eval("#lek .ldlink .rad button", bs => bs.map(b => (b.textContent || "").trim()));
  await p.screenshot({ path: UT + "/21-ledere.png", fullPage: false });
  // QR
  const qrBtn = await p.$("#lek .ldlink .rad button >> text=/QR/i");
  if(qrBtn){ await qrBtn.click(); await p.waitForTimeout(600); }
  const qr = await p.$("#lek .ldqr:not(.skjul) svg");
  await p.screenshot({ path: UT + "/21b-ledere-qr.png" });
  // Copy (primary)
  await p.click("#lek .ldlink .rad button.hoved"); await p.waitForTimeout(300);
  const me = await p.evaluate(() => localStorage.getItem("neste.me"));
  // Member share («Dost ko bhejein») must carry Chrome/Safari line
  await p.click("#lek .hode button"); await p.click("#l-del"); await p.waitForTimeout(400);
  const toast = await p.textContent("#toast").catch(() => null);
  const delTekst = await p.evaluate(() => {
    try{
      const T = JSON.parse(sessionStorage.getItem("_") || "null");
    }catch(e){}
    return null;
  });
  // Bad code
  await p.click("#l-ledere"); await p.waitForTimeout(200);
  const det = await p.$("#lek .ldmin"); if(det) await p.evaluate(el => { el.open = true; }, det);
  await p.fill("#lek .ldkode input", "zzzzzz"); await p.click("#lek .ldkode button"); await p.waitForTimeout(2500);
  const feilkode = await p.textContent("#lek .ldfeil");
  // Soft-fail: block Sheets, unlock with saved me still shows kit
  await p.route("**/spreadsheets/**", r => r.abort());
  await p.route("**/ledere-reserve.csv", r => r.abort());
  await p.fill("#lek .ldkode input", "NOGUFL"); await p.click("#lek .ldkode button"); await p.waitForTimeout(1200);
  const offline = await p.textContent("#lek .ldfeil");
  const kitEtter = await p.$("#lek .ldlink code");
  await p.screenshot({ path: UT + "/21c-ledere-offline.png" });
  console.log(JSON.stringify({
    tom: (tom || "").trim(),
    navn: (navn || "").trim(),
    url: (url || "").trim(),
    aapne: (aapne || "").trim(),
    bio: (bio || "").trim(),
    knapper,
    qr: !!qr,
    me: !!me,
    toast,
    feilkode: (feilkode || "").trim(),
    offline: (offline || "").trim(),
    kitEtter: !!kitEtter,
    feil
  }, null, 1));
  await b.close();
})().catch(e => { console.error("FEIL", e); process.exit(1); });
