// Forrige call på 5 minutter (#337): blokken under callen vises bare når innhold.json har en oppsummering
// med lyd eller tekst på appens språk, med riktig lydfil per språk. Innholdet simuleres ved å svare på innhold.json.
// Bruk: node call-oppsum.js <utmappe> <base-url>
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const fs = require("fs"), path = require("path");
const UT = process.argv[2], BASE = process.argv[3];
const INN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../innhold.json"), "utf8"));
const MED = JSON.parse(JSON.stringify(INN));
MED.call.oppsummering = [{ dato: "2026-10-22", min: 5, spor: ["ur", "no", "en"], tekst: { ur_rm: "Aaj: pip, lot aur stop loss. Sawal group mein." } }];
(async () => {
  const b = await chromium.launch(), feil = [], rader = [];
  const sjekk = async (lang, innhold, vent) => {
    const c = await b.newContext({ viewport: { width: 375, height: 740 }, isMobile: true, hasTouch: true, serviceWorkers: "block" });
    await c.addInitScript(() => { try { localStorage.setItem("neste.foerste", "true"); } catch (e) {} });
    const p = await c.newPage(); p.on("pageerror", e => feil.push(lang + ": JS " + String(e).slice(0, 80)));
    if (innhold) await p.route("**/innhold.json*", r => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(innhold) }));
    await p.goto(BASE + "?lang=" + lang, { waitUntil: "networkidle" }); await p.waitForTimeout(400);
    const r = await p.evaluate(() => { const w = document.getElementById("call-oppsum"); const a = w && w.querySelector("audio"); const h = w && w.querySelector("h3");
      return { finnes: !!w, skjult: !w || w.hidden || getComputedStyle(w).display === "none", h3: h ? h.textContent : "", lyd: a ? a.getAttribute("src") : "", knapp: !!(w && w.querySelector(".lydk")), tekst: (w && w.querySelector(".oppsum-t") || {}).textContent || "" }; });
    rader.push(Object.assign({ lang, med: !!innhold }, r));
    if (!r.finnes) feil.push(lang + ": #call-oppsum mangler i DOM");
    if (vent.skjult !== r.skjult) feil.push(lang + (innhold ? " med" : " uten") + " oppsummering: skjult=" + r.skjult + ", ventet " + vent.skjult);
    if (vent.lyd !== undefined && r.lyd !== vent.lyd) feil.push(lang + ": lydfil «" + r.lyd + "», ventet «" + vent.lyd + "»");
    if (vent.h3 && r.h3 !== vent.h3) feil.push(lang + ": overskrift «" + r.h3 + "», ventet «" + vent.h3 + "»");
    if (vent.tekst !== undefined && (r.tekst.length > 0) !== vent.tekst) feil.push(lang + ": tekst vist=" + (r.tekst.length > 0) + ", ventet " + vent.tekst);
    await p.screenshot({ path: path.join(UT, `call-oppsum-${lang}-${innhold ? "med" : "uten"}.png`), fullPage: true }).catch(() => {});
    await c.close();
  };
  /* Negativ kontroll: dagens innhold (tom liste) → ingenting vises */
  await sjekk("ur_rm", null, { skjult: true });
  /* Med oppsummering: lyd per språk, tekst bare der den finnes, hi/ar uten lyd og tekst → skjult */
  await sjekk("ur_rm", MED, { skjult: false, lyd: "lyd/call-2026-10-22-ur.mp3", h3: INN.ui.ur_rm.call_oppsum, tekst: true });
  await sjekk("ur", MED, { skjult: false, lyd: "lyd/call-2026-10-22-ur.mp3", h3: INN.ui.ur.call_oppsum, tekst: false });
  await sjekk("en", MED, { skjult: false, lyd: "lyd/call-2026-10-22-en.mp3", h3: INN.ui.en.call_oppsum, tekst: false });
  await sjekk("no", MED, { skjult: false, lyd: "lyd/call-2026-10-22-no.mp3", h3: INN.ui.no.call_oppsum });
  await sjekk("hi", MED, { skjult: true });
  await sjekk("ar", MED, { skjult: true });
  console.log(JSON.stringify({ rader, feil }, null, 1));
  await b.close(); if (feil.length) process.exit(1);
})().catch(e => { console.error("FEIL", e); process.exit(1); });
