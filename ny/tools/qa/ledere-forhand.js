// Lederens verktøykasse (#247/#301): forhåndsvisning av det medlemmet ser + lenke til ledersiden for søknad/godkjenning.
// Utfyller ledere.js (delingssettet #295). Bruk: node ledere-forhand.js <utmappe> <base-url>
const path = require("path"), { chromium } = require(path.join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3];
(async () => {
  const b = await chromium.launch(), feil = [];
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
  await ctx.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });
  const p = await ctx.newPage(); p.on("pageerror", e => feil.push("pageerror " + e.message)); p.on("dialog", d => d.dismiss());
  for (const lang of ["ur_rm", "ur"]) {
    await p.goto(BASE + "?lang=" + lang, { waitUntil: "networkidle" }); await p.waitForTimeout(400);
    await p.evaluate(() => { localStorage.removeItem("neste.me"); localStorage.removeItem("aimpire.me"); });
    await p.reload({ waitUntil: "networkidle" }); await p.waitForTimeout(400);
    await p.evaluate(() => { location.hash = "#mazeed"; }); await p.waitForTimeout(250); await p.click("#l-ledere"); await p.waitForTimeout(300);
    const det = await p.$("#lek .ldmin"); if (det) await p.evaluate(d => { d.open = true; }, det);
    await p.fill("#lek .ldkode input", "NOGUFL"); await p.click("#lek .ldkode button"); await p.waitForTimeout(2800);
    const lenke = await p.$("#lek .ldlink code"); if (!lenke) { feil.push(lang + ": ingen invitasjonslenke etter opplåsing"); continue; }
    const knapp = await p.$("#lek .lddekhe"); if (!knapp) { feil.push(lang + ": forhåndsvisningsknapp mangler"); continue; }
    await knapp.click(); await p.waitForTimeout(300);
    const r = await p.evaluate(() => ({
      foyer: !!document.querySelector("#lek .ldprev-foyer"),
      merke: !!document.querySelector("#lek .ldprev-merke"),
      tilbake: !!document.querySelector("#lek .ldprev-tilbake"),
      aapen: document.querySelector("#lek .ldkit")?.classList.contains("ldprev-aapen"),
      navn: (document.querySelector("#lek .ldprev-strip b") || {}).textContent || "",
      aapne: (document.querySelector("#lek .ldprev-open") || {}).href || "",
      hub: (document.querySelector("#lek .ldhub-link") || {}).href || "",
      hubGrad: (() => { const a = document.querySelector("#lek .ldhub-link"); return a ? getComputedStyle(a).backgroundImage : ""; })(),
      khudGanger: [...document.querySelectorAll("#lek .ldnote")].length,
      sidescroll: document.documentElement.scrollWidth - innerWidth
    }));
    if (!r.foyer) feil.push(lang + ": forhåndsvisningen tegnes ikke");
    if (!r.merke) feil.push(lang + ": brand-mast mangler i forhåndsvisningen");
    if (!r.tilbake) feil.push(lang + ": soft exit mangler");
    if (!r.aapen) feil.push(lang + ": ldprev-aapen ikke satt");
    if (!/rehman/i.test(r.navn)) feil.push(lang + ": lederens navn mangler i forhåndsvisningen (" + r.navn + ")");
    if (!/[?&#](n|l)=|\/rehman/i.test(r.aapne)) feil.push(lang + ": «åpne hele siden» peker ikke på lederens lenke: " + r.aapne);
    if (!r.hub) feil.push(lang + ": lenke til ledersiden mangler");
    if (/linear-gradient/i.test(r.hubGrad || "")) feil.push(lang + ": hub-lenke er fortsatt gradient-CTA");
    if (r.khudGanger > 1) feil.push(lang + ": advarselen om egen lenke står " + r.khudGanger + " ganger");
    if (r.sidescroll > 1) feil.push(lang + ": sidescroll " + r.sidescroll + " px");
    /* Soft exit back to toolbox */
    await p.click("#lek .ldprev-tilbake"); await p.waitForTimeout(200);
    const etter = await p.evaluate(() => ({
      aapen: document.querySelector("#lek .ldkit")?.classList.contains("ldprev-aapen"),
      foyer: !!document.querySelector("#lek .ldprev-foyer"),
      code: !!document.querySelector("#lek .ldlink code")
    }));
    if (etter.aapen || etter.foyer) feil.push(lang + ": soft exit lukket ikke forhåndsvisningen");
    if (!etter.code) feil.push(lang + ": invite-lenke borte etter soft exit");
    await p.screenshot({ path: UT + "/22-ledere-forhand-" + lang + ".png" });
  }
  console.log(JSON.stringify({ feil }, null, 1));
  await b.close(); if (feil.length) process.exit(1);
})().catch(e => { console.error("FEIL", e); process.exit(1); });
