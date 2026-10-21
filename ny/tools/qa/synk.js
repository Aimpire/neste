// Stemme og animasjon i takt (#331, founder 20.10 23:34). For hver leksjon med animasjon: start «se og hør»,
// mål hvert 300 ms at scenen som vises er den stemmen er i (cue-tider), og at animasjonen ikke blir ferdig før lyden.
// Bruk: node synk.js <utmappe> <base-url> [lang]
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const fs = require("fs"), path = require("path");
const UT = process.argv[2], BASE = process.argv[3], LANG = process.argv[4] || "ur";
const INN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../innhold.json"), "utf8"));
const alle = ["uke1", "uke2", "uke3", "uke4"].flatMap(u => INN[u] || []);
const SP = (LANG === "ur" || LANG === "ur_rm") ? "ur" : LANG;
(async () => {
  const b = await chromium.launch(), feil = [], rader = [];
  /* SYNK_BARE=pip,lot: bare disse · TREG_CUES=ms: cue-filene kommer så sent (tregt nett – appen venter bare 1,5 s, takt.js må ta dem i bruk etterpå) */
  const BARE = (process.env.SYNK_BARE || "").split(",").filter(Boolean), TREG = +process.env.TREG_CUES || 0;
  for (const x of alle.filter(x => x.anim && (!BARE.length || BARE.indexOf(x.id) >= 0))) {
    const cf = path.join(__dirname, "../../lyd", `${x.id}-${SP}.cues.json`);
    if (!fs.existsSync(cf)) { feil.push(`${x.id}: mangler cues (${path.basename(cf)})`); continue; }
    const cues = JSON.parse(fs.readFileSync(cf, "utf8"));
    const c = await b.newContext({ viewport: { width: 375, height: 740 }, isMobile: true, hasTouch: true, serviceWorkers: "block" });
    await c.addInitScript(ids => { try { localStorage.setItem("neste.foerste", "true"); const f = {}; ids.forEach(i => { f[i] = { riktig: true }; }); localStorage.setItem("neste.frem", JSON.stringify(f)); } catch (e) {} }, ["uke1", "uke2", "uke3"].flatMap(u => (INN[u] || []).map(y => y.id)));   /* uke 1–3 ferdig → alle fire uker er åpne (ukelåsen) */
    const p = await c.newPage(); p.on("pageerror", e => feil.push(`${x.id}: JS ${String(e).slice(0, 80)}`));
    if (TREG) await p.route("**/*.cues.json*", r => setTimeout(() => r.continue(), TREG));
    if (TREG){   /* utålmodig medlem: trykker start straks leksjonen vises – cue-tidene er ikke kommet ennå */
      await p.goto(BASE + "?lang=" + LANG + "&lek=" + x.id, { waitUntil: "domcontentloaded" });
      await p.waitForSelector("#lek .anim .start", { timeout: 15000 }); await p.click("#lek .anim .start"); await p.waitForTimeout(300);
    } else {
      await p.goto(BASE + "?lang=" + LANG + "&lek=" + x.id, { waitUntil: "networkidle" }); await p.waitForTimeout(800);   /* ?lek= åpner leksjonen direkte (også låste uker) */
      await p.click("#lek .anim .start"); await p.waitForTimeout(300);
    }
    const start = Date.now(); let avvik = 0, prover = 0, sisteScene = -1, forTidlig = false, maxT = 0;
    while (Date.now() - start < (cues.slutt + 4) * 1000) {
      const r = await p.evaluate(() => { const a = document.querySelector("#lek audio"), f = document.querySelector("#lek .anim iframe"); let s = -1, ferdig = false;
        try { s = f.contentWindow.sceneNaa; ferdig = !!f.contentWindow.ferdig; } catch (e) {}
        return { t: a ? a.currentTime : -1, paused: a ? a.paused : true, ended: a ? a.ended : false, s, ferdig }; });
      if (r.t > 0.5) {
        prover++; maxT = Math.max(maxT, r.t);
        let ventet = 0; for (let k = 0; k < cues.scener.length; k++) if (r.t >= cues.scener[k]) ventet = k;
        const naerGrense = cues.scener.some(t => Math.abs(t - r.t) < 1.2);
        if (r.s !== ventet && !naerGrense) avvik++;
        if (r.ferdig && !r.ended && r.t < cues.slutt - 1.5) forTidlig = true;
        sisteScene = r.s;
      }
      if (r.ended || (r.ferdig && r.t >= cues.slutt - 1.5)) break;
      await p.waitForTimeout(300);
    }
    const rad = { id: x.id, scener: cues.scener.length, slutt: cues.slutt, prover, avvik, sisteScene, forTidlig, maxT: +maxT.toFixed(1) };
    rader.push(rad);
    const foer = feil.length;
    if (prover < 5) feil.push(`${x.id}: lyden spilte ikke (${prover} prøver)`);
    if (avvik > Math.max(2, prover * 0.1)) feil.push(`${x.id}: scene ute av takt i ${avvik} av ${prover} prøver`);
    if (sisteScene !== cues.scener.length - 1) feil.push(`${x.id}: endte på scene ${sisteScene}, ventet ${cues.scener.length - 1}`);
    if (forTidlig) feil.push(`${x.id}: animasjonen ble ferdig før stemmen`);
    /* Symbolet følger dommen: noen få avvik rundt et scenebytte er innenfor grensen og er ikke en feil (~ = godkjent med avvik). */
    const merke = feil.length > foer ? "✗" : (rad.avvik ? "~" : "✓");
    console.log(` ${merke} ${x.id.padEnd(8)} ${rad.scener} scener, ${rad.slutt}s, ${rad.prover} prøver, avvik ${rad.avvik}, siste scene ${rad.sisteScene}`);
    await c.close();
  }
  console.log(JSON.stringify({ lang: LANG, feil }, null, 1));
  await b.close(); if (feil.length) process.exit(1);
})().catch(e => { console.error("FEIL", e); process.exit(1); });
