// #334: Ny person (bekreft + clear), gjenopprettingskode/lenke (client-only), iOS Home Screen-guide.
// 360 px · ur_rm · ingen saksnummer i synlig UI · roundtrip frem+journal.
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3] || "http://127.0.0.1:8771/neste/";
(async () => {
  const b = await chromium.launch(), feil = [];
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await ctx.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });
  const p = await ctx.newPage();
  p.on("console", m => { if(m.type() === "error") feil.push(m.text()); });
  p.on("pageerror", e => feil.push("pageerror " + e.message));

  await p.goto(BASE + "?lang=ur_rm&l=abcdef#mazeed", { waitUntil: "networkidle" });
  await p.waitForTimeout(600);

  /* Seed fremdrift + journal direkte (samme form som appen skriver). */
  await p.evaluate(() => {
    localStorage.setItem("neste.lang", JSON.stringify("ur_rm"));
    localStorage.setItem("neste.foerste", JSON.stringify(true));
    localStorage.setItem("neste.leder_kode", JSON.stringify("abcdef"));
    localStorage.setItem("neste.frem", JSON.stringify({
      pip: { sett: 1, prov: 1, riktig: true, feil: 0, neste: Date.now() + 864e5 },
      lot: { sett: 1, riktig: true }
    }));
    localStorage.setItem("neste.journal", JSON.stringify([{
      ts: 1700000000000, inst: "EUR/USD", dir: "buy", lot: 0.01, stop: 20,
      why: "pullback", res: 12.5, feel: "Sukoon", closed: true
    }]));
  });
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(500);

  /* Mer-rader synlige med produktspråk (ingen #334 i UI). */
  const mer = await p.evaluate(() => {
    const g = document.querySelector("#l-gjen span"), i = document.querySelector("#l-ios span"), by = document.querySelector("#bytt");
    const txt = (document.body.innerText || "");
    return {
      gjen: (g && g.textContent || "").trim(),
      ios: (i && i.textContent || "").trim(),
      bytt: (by && by.textContent || "").trim(),
      ticket: /#\d{2,}\b/.test(txt),
      sw: document.documentElement.scrollWidth
    };
  });
  if(!mer.gjen) feil.push("l-gjen tom etikett");
  if(!mer.ios) feil.push("l-ios tom etikett");
  if(!mer.bytt) feil.push("bytt tom");
  if(mer.ticket) feil.push("saksnummer i UI");
  if(mer.sw > 360) feil.push("sidescroll " + mer.sw);

  await p.click("#l-gjen");
  await p.waitForTimeout(400);
  const kode = await p.$eval("#lek .gjen-kode", e => e.textContent.trim());
  if(!/^A1z?\./.test(kode)) feil.push("kode-prefix " + kode.slice(0, 12));
  const lenke = await p.$eval("#lek code.gjen-lenke", e => e.textContent.trim());
  if(lenke.indexOf("#r=") < 0 || /[?&]r=/.test(lenke)) feil.push("lenken skal ha koden i #r= (sendes aldri til serveren), ikke ?r=: " + lenke.slice(0, 70));
  if(UT) await p.screenshot({ path: UT + "/334-gjen-360.png" });

  /* Clear + restore via paste */
  await p.evaluate(() => { localStorage.clear(); });
  await p.fill("#lek .gjen-paste textarea", kode);
  await p.click("#lek .gjen-paste .knapp");
  await p.waitForTimeout(900);
  /* Etter restore navigerer appen – vent på hjem */
  await p.waitForSelector("#l-gjen", { timeout: 8000 }).catch(() => {});
  await p.waitForTimeout(500);
  const etter = await p.evaluate(() => {
    let frem = {}, jn = [], lang = "", kode = "";
    try{ frem = JSON.parse(localStorage.getItem("neste.frem") || "{}"); }catch(e){}
    try{ jn = JSON.parse(localStorage.getItem("neste.journal") || "[]"); }catch(e){}
    try{ lang = JSON.parse(localStorage.getItem("neste.lang") || '""'); }catch(e){}
    try{ kode = JSON.parse(localStorage.getItem("neste.leder_kode") || '""'); }catch(e){}
    return {
      pip: !!(frem.pip && frem.pip.riktig),
      lot: !!(frem.lot && frem.lot.riktig),
      jn: Array.isArray(jn) && jn.length >= 1 && jn.some(x => x.ts === 1700000000000),
      lang, kode
    };
  });
  if(!etter.pip || !etter.lot) feil.push("frem ikke restored");
  if(!etter.jn) feil.push("journal ikke restored");
  if(etter.lang !== "ur_rm") feil.push("lang " + etter.lang);
  if(etter.kode !== "abcdef") feil.push("leder_kode " + etter.kode);

  /* ?r= deep link (ukomprimert A1. for determinisme hvis deflate mangler i headless – bruk faktisk kode) */
  const deep = BASE + (BASE.indexOf("?") >= 0 ? "&" : "?") + "lang=ur_rm&r=" + encodeURIComponent(kode);
  await p.evaluate(() => localStorage.clear());
  await p.goto(deep.replace(/\?lang=ur_rm&r=/, "?r=").replace(/\/neste\/\?/, "/neste/?"), { waitUntil: "networkidle" });
  /* Bygg URL eksplisitt */
  const baseClean = BASE.replace(/\?.*$/, "");
  await p.goto(baseClean + "?r=" + encodeURIComponent(kode), { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  const deepOk = await p.evaluate(() => {
    let frem = {};
    try{ frem = JSON.parse(localStorage.getItem("neste.frem") || "{}"); }catch(e){}
    return !!(frem.pip && frem.pip.riktig);
  });
  if(!deepOk) feil.push("?r= deep link feilet");
  const urlClean = await p.evaluate(() => location.search.indexOf("r=") < 0);
  if(!urlClean) feil.push("?r= ikke fjernet fra adresselinje");

  /* Ny lenke (#r=, slik appen lager den): gjenoppretter og fjerner koden fra adresselinja */
  await p.evaluate(() => localStorage.clear());
  await p.goto("about:blank");
  await p.goto(lenke, { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  const hashOk = await p.evaluate(() => { let f = {}; try{ f = JSON.parse(localStorage.getItem("neste.frem") || "{}"); }catch(e){} return { frem: !!(f.pip && f.pip.riktig), ren: location.hash.indexOf("r=") < 0 }; });
  if(!hashOk.frem) feil.push("#r= lenke gjenopprettet ikke fremgangen");
  if(!hashOk.ren) feil.push("#r= ikke fjernet fra adresselinja");

  /* iOS-guide */
  await p.goto(baseClean + "?lang=ur_rm#mazeed", { waitUntil: "networkidle" });
  await p.evaluate(() => { try{ localStorage.setItem("neste.foerste", "true"); localStorage.setItem("neste.lang", JSON.stringify("ur_rm")); }catch(e){} });
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(400);
  await p.click("#l-ios");
  await p.waitForTimeout(300);
  const ios = await p.evaluate(() => ({
    steg: document.querySelectorAll("#lek .ios-steg").length,
    note: !!(document.querySelector("#lek .ios-note") || {}).textContent,
    sw: document.documentElement.scrollWidth,
    ticket: /#\d{2,}\b/.test(document.body.innerText || "")
  }));
  if(ios.steg !== 3) feil.push("ios steg " + ios.steg);
  if(!ios.note) feil.push("ios note mangler");
  if(ios.sw > 360) feil.push("ios sidescroll");
  if(ios.ticket) feil.push("ios saksnummer");
  if(UT) await p.screenshot({ path: UT + "/334-ios-360.png" });

  /* Ny person: egen kontekst uten init-foerste (ellers setter addInitScript foerste igjen ved reload). */
  await ctx.close();
  const ctx2 = await b.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const p2 = await ctx2.newPage();
  p2.on("console", m => { if(m.type() === "error") feil.push("ny:" + m.text()); });
  p2.on("pageerror", e => feil.push("ny pageerror " + e.message));
  await p2.goto(baseClean + "?lang=ur_rm&l=abcdef#mazeed", { waitUntil: "networkidle" });
  await p2.evaluate(() => {
    localStorage.setItem("neste.foerste", JSON.stringify(true));
    localStorage.setItem("neste.lang", JSON.stringify("ur_rm"));
    localStorage.setItem("neste.frem", JSON.stringify({ pip: { riktig: true } }));
    localStorage.setItem("neste.journal", JSON.stringify([{ ts: 1, closed: true }]));
  });
  await p2.reload({ waitUntil: "networkidle" });
  await p2.waitForTimeout(400);
  await p2.click("#bytt");
  await p2.waitForTimeout(200);
  const sheet = await p2.evaluate(() => {
    const b = document.querySelector("#bekref");
    return { open: b && !b.hidden, tekst: (document.querySelector("#bekref-t") || {}).textContent || "" };
  });
  if(!sheet.open) feil.push("bekreftelse ikke åpnet");
  if(!sheet.tekst) feil.push("bekreftelse tom");
  if(UT) await p2.screenshot({ path: UT + "/334-ny-person-360.png" });
  await p2.click("#bekref-ja");
  await p2.waitForTimeout(900);
  const cleared = await p2.evaluate(() => {
    let frem = null, jn = null;
    try{ frem = JSON.parse(localStorage.getItem("neste.frem") || "null"); }catch(e){}
    try{ jn = JSON.parse(localStorage.getItem("neste.journal") || "null"); }catch(e){}
    return {
      fremKeys: frem && typeof frem === "object" ? Object.keys(frem).length : 0,
      jnLen: Array.isArray(jn) ? jn.length : (jn ? 1 : 0),
      foerste: localStorage.getItem("neste.foerste"),
      hasL: /[?&]l=/.test(location.search),
      onboarding: document.body.classList.contains("onboarding")
    };
  });
  /* Språk kan defaultes på nytt via ?l= (#277). Frem/journal/foerste skal være borte → onboarding. */
  if(cleared.fremKeys) feil.push("ny person: frem ikke tømt");
  if(cleared.jnLen) feil.push("ny person: journal ikke tømt");
  if(cleared.foerste) feil.push("ny person: foerste ikke tømt");
  if(!cleared.hasL) feil.push("?l= mistet etter ny person");
  if(!cleared.onboarding) feil.push("ny person: onboarding ikke aktiv");
  if(UT) await p2.screenshot({ path: UT + "/334-ny-person-etter-360.png" });
  await ctx2.close();

  const ut = { mer, kode: kode.slice(0, 24) + "…", etter, deepOk, ios, sheet: { open: sheet.open }, cleared, feil };
  console.log(JSON.stringify(ut, null, 1));
  await b.close();
  process.exit(feil.length ? 1 : 0);
})().catch(e => { console.error("FEIL", e); process.exit(1); });
