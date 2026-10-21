// B-055: de fire stedene (Ghar · Academy · Paisa · Mazeed), verve-inngangen (?v=1), hjelpen i stegene, regneverktøyene,
// innhold per språk, 320 px – og regresjonen der en steds-hash ble lest som navnelenke og fjernet invitasjonen.
// Bruk: node b055.js <utmappe> <base-url>
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3];
const vent = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch(), feil = [], res = {};
  const ny = async (w, h, init) => { const c = await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, serviceWorkers: "block" });
    if(init) await c.addInitScript(init); const p = await c.newPage();
    p.on("pageerror", e => feil.push("JS " + String(e).slice(0, 120)));
    const hentet = []; p.on("requestfinished", r => { const u = r.url(); if(/\/paisa\//.test(u)) hentet.push(u.split("/").pop()); });
    return { c, p, hentet }; };
  const tilbake = p => p.click("#lek .hode button").catch(() => {});
  const returnerende = () => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} };

  /* 1) Regresjon: #academy i en lederlenke skal IKKE leses som navnelenke (det fjernet invitasjonen 21.10) */
  { const { c, p } = await ny(375, 740, returnerende);
    await p.goto(BASE + "?l=rehman-nogufl&lang=ur_rm#academy", { waitUntil: "networkidle" });
    /* Lederkortet ligger på Ghar (skjult når vi står på Academy) – mål det som betyr noe: at lederen er LAGRET */
    const ok = await p.waitForFunction(() => { try{ const l = JSON.parse(localStorage.getItem("neste.leder") || "null"); return !!(l && l.id === "nogufl"); }catch(e){ return false; } }, null, { timeout: 12000 }).then(() => true).catch(() => false);
    res.hashLeder = ok; if(!ok) feil.push("steds-hash fjernet invitasjonen (#academy lest som navnelenke)");
    await c.close(); }

  /* 2) Verve-inngang, fersk profil: hvem · tre sannheter · én knapp · «er dette svindel?» → kontoen */
  { const { c, p } = await ny(375, 740);
    await p.goto(BASE + "?l=rehman-nogufl&lang=ur_rm&v=1", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
    const v = await p.evaluate(() => { const bx = document.getElementById("verve"); return { vis: !!bx && !bx.hidden, h1: (bx.querySelector("h1") || {}).textContent || "", sann: bx.querySelectorAll(".sannheter li").length, knapp: bx.querySelectorAll(".knapp").length, dhoka: !!bx.querySelector("details.dhoka"), sw: document.documentElement.scrollWidth }; });
    res.verve = v;
    if(!v.vis) feil.push("verve-boksen vises ikke på ?v=1"); if(!/Rehman/.test(v.h1)) feil.push("verve-overskriften nevner ikke lederen");
    if(v.sann !== 3) feil.push("verve: " + v.sann + " sannheter (ventet 3)"); if(v.knapp !== 1) feil.push("verve: " + v.knapp + " hovedknapper (ventet 1)");
    if(!v.dhoka) feil.push("verve: «er dette svindel?» mangler"); if(v.sw > 375) feil.push("verve: sidescroll " + v.sw);
    await p.evaluate(() => { document.querySelector("#verve details.dhoka").open = true; }); await p.waitForTimeout(1800);
    const svar = await p.evaluate(() => (document.querySelector("#verve details.dhoka p") || {}).textContent || "");
    if(svar.length < 80) feil.push("verve: svindel-svaret ble ikke hentet");
    await p.screenshot({ path: UT + "/b055-verve.png" });
    await p.click("#verve .knapp"); await p.waitForTimeout(800);
    const etter = await p.evaluate(() => ({ onb: document.body.classList.contains("onboarding"), side: [...document.querySelectorAll(".side")].filter(s => !s.hidden).map(s => s.id).join(), faser: document.querySelectorAll("#lek h3.fase").length, steg: document.querySelectorAll("#lek .steg li").length }));
    res.verveEtter = etter;
    if(etter.onb) feil.push("verve-knappen avsluttet ikke førstegangsmodus"); if(etter.side !== "side-paisa") feil.push("verve-knappen landet på " + etter.side);
    if(etter.faser !== 3 || etter.steg !== 10) feil.push(`Konto: ${etter.faser} faser / ${etter.steg} steg (ventet 3/10)`);
    await c.close(); }

  /* 3) Paisa + hjelpen i stegene + verktøy, Roman Urdu, returnerende medlem */
  { const { c, p, hentet } = await ny(375, 740, returnerende);
    await p.goto(BASE + "?l=rehman-nogufl&lang=ur_rm#paisa", { waitUntil: "networkidle" }); await p.waitForTimeout(1200);
    res.paisaRader = await p.$$eval("#paisa-inn .paisa-rad", x => x.length);
    if(res.paisaRader !== 5) feil.push("Paisa: " + res.paisaRader + " rader (ventet 5)");
    await p.click("#p-sonic"); await p.waitForTimeout(1500);
    const so = await p.evaluate(() => ({ risiko: !!document.querySelector("#lek .risiko"), amplify: !!document.querySelector("#lek details.hjelp") }));
    if(!so.risiko) feil.push("Sonic: risikolinja mangler på samme skjerm"); if(!so.amplify) feil.push("Sonic: innstillingene (Amplify) mangler");
    await tilbake(p); await p.click("#p-historikk"); await p.waitForTimeout(400);
    const hi = await p.evaluate(() => ({ tall: document.querySelectorAll("#lek .tall5 .tall").length, soyler: document.querySelectorAll("#lek .soyler i").length, kilde: (document.querySelector("#lek a.kilde") || {}).href || "" }));
    if(hi.tall !== 5 || hi.soyler !== 24) feil.push(`Historikk: ${hi.tall} tall / ${hi.soyler} søyler (ventet 5/24)`); if(!/myfxbook\.com/.test(hi.kilde)) feil.push("Historikk: Myfxbook-kilden mangler");
    await tilbake(p); await p.click("#p-konto"); await p.waitForTimeout(400);
    await p.evaluate(() => { const b = [...document.querySelectorAll("#lek .steg li button")]; if(b[6]) b[6].click(); }); await p.waitForTimeout(400);
    const s7 = await p.evaluate(() => ({ t: (document.querySelector("#lek .hode b") || {}).textContent || "", p2p: document.querySelectorAll("#lek .hjelp-steg li").length, delsteg: document.querySelectorAll("#lek ol.delsteg li").length }));
    res.steg7 = s7; if(!/^7\./.test(s7.t)) feil.push("steg 7 åpnet ikke: " + s7.t);
    if(s7.p2p !== 7) feil.push("steg 7: P2P-guiden har " + s7.p2p + " steg (ventet 7)"); if(s7.delsteg < 2) feil.push("steg 7: teksten er ikke delsteg");
    await tilbake(p); await p.click("#p-kalk"); await p.waitForTimeout(900);
    const mg = await p.$$eval("#lek .vt-del .tall b", x => x.map(e => e.textContent));
    res.margin = mg; if(mg[0] !== "$43.50" || mg[1] !== "$4,350") feil.push("margin regner feil: " + JSON.stringify(mg));
    await tilbake(p);
    await p.evaluate(() => { location.hash = "#mazeed"; }); await p.waitForTimeout(300);
    const grupper = await p.$$eval("#side-mazeed h3.mgruppe", x => x.map(e => e.textContent).filter(Boolean));
    res.mazeedGrupper = grupper.length; if(grupper.length !== 4) feil.push("Mazeed: " + grupper.length + " grupper (ventet 4)");
    await p.click("#l-fib"); await p.waitForTimeout(400);
    const fib = await p.$$eval("#lek .fibrad.on span", x => x.map(e => e.textContent));
    if(fib[0] !== "4337.73") feil.push("Fibonacci 61,8 % = " + fib[0] + " (ventet 4337.73)");
    await tilbake(p); await p.click("#l-tapsrekke"); await p.waitForTimeout(1500);
    const tr = await p.evaluate(() => ({ tall: [...document.querySelectorAll("#lek .tall5 .tall b")].map(e => e.textContent), kurver: document.querySelectorAll("#lek .kurver path.kurve").length }));
    res.tapsrekke = tr; if(tr.tall.length !== 3 || tr.kurver !== 24) feil.push("tapsrekke: " + JSON.stringify(tr));
    res.hentetUr = [...new Set(hentet)]; if(res.hentetUr.join() !== "ur_rm.json") feil.push("hentet feil språkfil(er): " + res.hentetUr.join());
    await c.close(); }

  /* 4) Engelsk: P2P finnes ikke på engelsk – steg 7 skal ikke vise en tom blokk */
  { const { c, p, hentet } = await ny(375, 740, returnerende);
    await p.goto(BASE + "?lang=en#paisa", { waitUntil: "networkidle" }); await p.waitForTimeout(800);
    await p.click("#p-konto"); await p.waitForTimeout(1500);
    await p.evaluate(() => { const b = [...document.querySelectorAll("#lek .steg li button")]; if(b[6]) b[6].click(); }); await p.waitForTimeout(400);
    const p2p = await p.$$eval("#lek details.hjelp", x => x.length);
    if(p2p !== 0) feil.push("engelsk steg 7 viser en P2P-blokk uten tekst");
    if([...new Set(hentet)].join() !== "en.json") feil.push("engelsk hentet: " + [...new Set(hentet)].join());
    await c.close(); }

  /* 5) 320 px, ur og ar (RTL): ingen sidescroll på noe sted, og bunnmenyens etiketter får plass */
  for(const L of ["ur", "ar", "ur_rm"]){
    const { c, p } = await ny(320, 640, returnerende);
    await p.goto(BASE + "?lang=" + L, { waitUntil: "networkidle" }); await p.waitForTimeout(800);
    for(const s of ["ghar", "academy", "paisa", "mazeed"]){
      await p.evaluate(x => { location.hash = x === "ghar" ? "" : "#" + x; window.dispatchEvent(new HashChangeEvent("hashchange")); }, s); await p.waitForTimeout(250);
      const sw = await p.evaluate(() => document.documentElement.scrollWidth); if(sw > 320) feil.push(`${L} ${s}: sidescroll ${sw}px på 320`);
    }
    const kutt = await p.$$eval("#bar button span", x => x.filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.textContent));
    if(kutt.length) feil.push(`${L}: bunnmeny-etiketter kuttes på 320 px: ${kutt.join(", ")}`);
    if(L === "ar") await p.screenshot({ path: UT + "/b055-ar-320.png" });
    await c.close();
  }

  console.log(JSON.stringify({ res, feil }, null, 1)); await b.close(); process.exit(feil.length ? 1 : 0);
})().catch(e => { console.error("FEIL", e); process.exit(1); });
