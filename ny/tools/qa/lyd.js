// Lyd per språk (#259, founder 20.10: lyden må matche appens språk): knappen finnes bare når språket
// har eget spor, og src peker på riktig fil. hi/ar uten spor: note «kommer», ingen knapp.
const path = require("path");
const { chromium } = require(path.join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3];
const VENT = { ur_rm: "-ur.mp3", ur: "-ur.mp3", no: "-no.mp3", en: "-en.mp3", hi: null, ar: null };
(async () => {
  const b = await chromium.launch(); const feil = [];
  for (const [lang, slutt] of Object.entries(VENT)) {
    const c = await b.newContext({ viewport: { width: 375, height: 740 }, isMobile: true, hasTouch: true }); await c.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });   /* returnerende medlem: førstegangsflyten testes i reg-gate.js */
    const p = await c.newPage();
    await p.goto(BASE + "?lang=" + lang, { waitUntil: "networkidle" }); await p.waitForTimeout(800);
    await p.evaluate(() => { location.hash = "#academy"; }); await p.waitForTimeout(250); await p.click(".skinne .leks >> nth=0"); await p.waitForTimeout(700);
    const r = await p.evaluate(() => {
      const k = document.querySelector("#lek .lydk"), au = document.querySelector("#lek audio"), n = document.querySelector("#lek .lydnote");
      return { knapp: !!k, etikett: k ? k.textContent.trim() : null, src: au ? au.getAttribute("src") : null, note: n ? n.textContent.trim() : null };
    });
    if (slutt) {
      if (!r.knapp) feil.push(`${lang}: lydknapp mangler`);
      else if (!r.src || r.src.indexOf(slutt) < 0) feil.push(`${lang}: src=${r.src}, ventet *${slutt}`);
      else {
        const svar = await p.request.get(BASE + r.src).catch(() => null);
        if (!svar || !svar.ok()) feil.push(`${lang}: ${r.src} svarer ikke`);
      }
    } else {
      if (r.knapp) feil.push(`${lang}: lydknapp vises uten spor (src=${r.src})`);
      if (!r.note) feil.push(`${lang}: «lyd kommer»-note mangler`);
    }
    console.log(` ${lang}: knapp=${r.knapp} src=${r.src || "-"} note=${r.note ? "ja" : "-"}`);
    await c.close();
  }
  console.log(JSON.stringify({ feil }));
  await b.close(); if (feil.length) process.exit(1);
})().catch(e => { console.error("FEIL", e); process.exit(1); });
