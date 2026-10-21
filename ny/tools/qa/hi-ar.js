// #260: hindi og arabisk i skallet på 360×800 – språkvalg, RTL bare for arabisk, ingen sidescroll, alle 15 leksjoner har
// tittel, 4 linjer og et spørsmål med riktig svar på språket, dato/klokke uten arabisk-indiske sifre, 0 konsollfeil.
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3] || "http://127.0.0.1:8771/neste/";
const INN = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../innhold.json"), "utf8"));
(async () => {
  const b = await chromium.launch(), res = {}; let rc = 0;
  for(const L of ["hi", "ar"]){
    const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); await ctx.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });   /* returnerende medlem: førstegangsflyten testes i reg-gate.js */
    const p = await ctx.newPage(), feil = [];
    p.on("console", m => { if(m.type() === "error") feil.push(m.text()); }); p.on("pageerror", e => feil.push("pageerror " + e.message));
    await p.goto(BASE + "?lang=" + L + "&l=rehman-nogufl", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);   /* ?l= hopper over porten (#299): språket gis direkte */
    const forside = await p.evaluate(() => ({ lang: document.documentElement.lang, dir: document.documentElement.dir, sw: document.documentElement.scrollWidth, tekst: document.body.innerText.replace(/[\u2066-\u2069]/g, "") }));
    // alle leksjoner gjennom appens egen data: tittel synlig på forsiden for uke 1, og alle tekster finnes på språket
    const mangler = [];
    for(const u of ["uke1", "uke2", "uke3", "uke4"]) for(const x of INN[u]){
      if(!x.t[L] || !x.linjer[L] || x.linjer[L].length !== 4 || !x.sp[L] || x.sp[L].o.length !== 3) mangler.push(x.id);
    }
    // B-055: uke-titlene bor på Academy (forsiden har én handling). Mål at de tegnes på språket DER.
    await p.evaluate(() => { location.hash = "#academy"; }); await p.waitForTimeout(250);
    const academyTekst = await p.evaluate(() => document.body.innerText.replace(/[\u2066-\u2069]/g, ""));
    const synlig = INN.uke1.filter(x => academyTekst.indexOf(x.t[L]) < 0).map(x => x.id);
    // åpne første leksjon, svar riktig
    await p.click("#skinne .leks >> nth=0"); await p.waitForTimeout(1500);
    const lek = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, linjer: [...document.querySelectorAll("#lek .linjer p")].map(e => e.textContent) }));
    await p.evaluate(fasit => [...document.querySelectorAll("#lek .valg button")].find(b => b.textContent.replace(/[\u2066-\u2069]/g, "") === fasit).click(), INN.uke1[0].sp[L].o[INN.uke1[0].sp[L].r]); await p.waitForTimeout(500);
    const svar = await p.evaluate(() => (document.querySelector("#lek .svar") || {}).textContent || "");
    // RTL: «3 pips» skal staa isolert som LTR (ellers vises «pips 3»)
    const isolert = await p.evaluate(() => [...document.querySelectorAll("#lek .valg button")].every(b => b.textContent.indexOf("\u2066") >= 0));
    if(UT) await p.screenshot({ path: `${UT}/hi-ar-${L}.png` });
    const arSifre = /[٠-٩۰-۹]/.test(forside.tekst);
    const r = res[L] = { lang: forside.lang, dir: forside.dir, sw: forside.sw, lekSw: lek.sw, linjer: lek.linjer.length,
      svarRiktig: svar.indexOf(INN.ui[L].sahi) >= 0, isolert, mangler, ikkeSynlig: synlig, arabiskIndiskeSifre: arSifre, feil };
    const ok = r.lang === L && r.dir === (L === "ar" ? "rtl" : "ltr") && r.sw <= 360 && r.lekSw <= 360 && r.linjer === 4 && r.svarRiktig && (L !== "ar" || r.isolert) && (L === "ar" || !r.isolert) && !mangler.length && !synlig.length && !arSifre && !feil.length;
    r.ok = ok; if(!ok) rc = 1; await ctx.close();
  }
  console.log(JSON.stringify(res, null, 1)); await b.close(); process.exit(rc);
})();
