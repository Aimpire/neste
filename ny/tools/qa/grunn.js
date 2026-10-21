// Lokal sjekk av det nye skallet på 360×800: konsollfeil, lederstripe, leksjon, spørsmål, RTL, lys. Skjermbilder til UT.
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3] || "http://127.0.0.1:8765/neste/";
const INN = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../innhold.json"), "utf8"));
const riktig = (uke, i, l) => { const x = INN[uke][i]; return x.sp[l].o[x.sp[l].r]; };
const feilSvar = (uke, i, l) => { const x = INN[uke][i]; return x.sp[l].o.find((o, j) => j !== x.sp[l].r); };
(async () => {
  const b = await chromium.launch(), feil = [];
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "ur-PK" }); await ctx.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });   /* returnerende medlem: førstegangsflyten testes i reg-gate.js */
  const p = await ctx.newPage();
  p.on("console", m => { if(m.type() === "error") feil.push(m.text()); });
  p.on("pageerror", e => feil.push("pageerror " + e.message));
  await p.goto(BASE + "?l=rehman-nogufl", { waitUntil: "networkidle" });
  await p.screenshot({ path: UT + "/01-port.png" });
  if(await p.$("#port:not(.skjul) #port-valg button")) await p.click("#port-valg button >> nth=0");   // Roman Urdu (porten hoppes over ved ?l=, #299)
  await p.waitForTimeout(1500);                                       // dekryptering + skinne-animasjon
  const leder = await p.textContent("#leder"), call = await p.textContent("#call-om");
  await p.screenshot({ path: UT + "/02-hjem-topp.png" });
  await p.screenshot({ path: UT + "/03-hjem-full.png", fullPage: true });
  // blokkerte trykk på 360 px (minne: trykk-test med elementFromPoint)
  const blokkert = await p.evaluate(() => Array.from(document.querySelectorAll("button, a")).filter(e => e.offsetParent !== null).map(e => { const r = e.getBoundingClientRect(); if(r.width === 0) return null; const x = r.left + r.width / 2, y = r.top + r.height / 2; if(y < 0 || y > innerHeight) return null; const t = document.elementFromPoint(x, y); return (t && (t === e || e.contains(t))) ? null : (e.textContent || e.id).trim().slice(0, 30); }).filter(Boolean));
  const bred = await p.evaluate(() => document.documentElement.scrollWidth);
  const intro = await p.textContent("#intro-t").catch(() => null), introSkjult = await p.$eval("#intro", e => e.classList.contains("skjul"));
  /* B-055: første besøk = Ghar med ÉN handling. Den ekte flyten: knappen åpner første leksjon (onboarding over),
     lukk, så Academy – der resten av ukene og bunnmenyen er. */
  await p.click("#foyer-cta"); await p.waitForSelector("#lek:not(.skjul)", { timeout: 8000 }); await p.click("#lek .hode button"); await p.waitForTimeout(300);
  await p.evaluate(() => { location.hash = "#academy"; }); await p.waitForTimeout(300);
  await p.click("#skinne .leks >> nth=1"); await p.waitForTimeout(400); await p.click("#lek .valg button", { hasText: feilSvar("uke1", 1, "ur_rm") }).catch(async () => { await p.getByRole("button", { name: feilSvar("uke1", 1, "ur_rm"), exact: true }).click(); }); await p.waitForTimeout(200); await p.click("#lek .hode button"); await p.waitForTimeout(400);   // feil svar på lot
  const sawal = await p.evaluate(() => ({ skjult: document.querySelector("#sawal").classList.contains("skjul"), tekst: document.querySelector("#sawal-liste").textContent.trim() }));
  await p.screenshot({ path: UT + "/24-sawal.png" });
  await p.click("#skinne .leks >> nth=0");
  await p.waitForTimeout(2500);
  await p.screenshot({ path: UT + "/04-leksjon-pip.png" });
  const forStart = await p.evaluate(() => ({ knapp: !!document.querySelector("#lek .anim .start:not(.skjul)"), lyd: !!document.querySelector("#lek audio") }));
  await p.click("#lek .anim .start");
  await p.waitForFunction(() => { const au = document.querySelector("#lek audio"); return au && !au.paused && au.currentTime > 0; }, null, { timeout: 8000 }).catch(() => {});
  const etterStart = await p.evaluate(() => { const au = document.querySelector("#lek audio"); return { spiller: !!au && !au.paused && au.currentTime > 0, startSkjult: document.querySelector("#lek .anim .start").classList.contains("skjul"), igjen: !document.querySelector("#lek .anim .igjen").classList.contains("skjul") }; });
  if(!forStart.knapp || !forStart.lyd || !etterStart.spiller || !etterStart.startSkjult) feil.push("se-og-hør: " + JSON.stringify({ forStart, etterStart }));
  await p.screenshot({ path: UT + "/04b-leksjon-spiller.png" });
  await p.evaluate(() => { const au = document.querySelector("#lek audio"); if(au) au.pause(); });
  const lydk = await p.$eval(".lydk", b => b.textContent.trim()).catch(() => null);
  const lydSrc = await p.$eval(".lyd audio", a => a.getAttribute("src")).catch(() => null);
  const lydHttp = lydSrc ? await p.evaluate(async u => (await fetch(u, { method: "HEAD" })).status, lydSrc) : null;
  const kanMp3 = await p.evaluate(() => document.createElement("audio").canPlayType("audio/mpeg"));
  await p.evaluate(() => document.querySelector("#lek").scrollTo(0, 99999));
  await p.waitForTimeout(300);
  await p.screenshot({ path: UT + "/05-leksjon-bunn.png" });
  await p.getByRole("button", { name: riktig("uke1", 0, "ur_rm"), exact: true }).click();
  await p.waitForTimeout(300);
  await p.screenshot({ path: UT + "/06-svar.png" });
  const frem = await p.evaluate(() => localStorage.getItem("neste.frem"));
  await p.click("#lek .nesteknapp button");
  await p.waitForTimeout(800);
  await p.screenshot({ path: UT + "/07-leksjon-lot.png" });
  await p.click("#lek .hode button");
  await p.waitForTimeout(500);
  await p.screenshot({ path: UT + "/08-hjem-etter.png", fullPage: true });
  // urdu RTL + lys
  await p.click("#sprak"); await p.click("#port-valg button >> nth=1"); await p.waitForTimeout(600);
  await p.click("#tema"); await p.waitForTimeout(300);
  await p.screenshot({ path: UT + "/09-ur-lys.png", fullPage: true });
  await p.click("#skinne .leks >> nth=2"); await p.waitForTimeout(600);
  await p.screenshot({ path: UT + "/10-ur-spread.png" });
  const nastaliq = await p.evaluate(async () => { await document.fonts.ready; return getComputedStyle(document.body).fontFamily.indexOf("Nastaliq") >= 0 && [...document.fonts].some(f => f.family.indexOf("Nastaliq") >= 0 && f.status === "loaded"); });   // egen fil (#268), ikke Google-lenke
  const stil = await p.evaluate(() => getComputedStyle(document.querySelector(".call")).borderRadius !== "0px" && document.styleSheets.length > 0);   // stilarket er faktisk i bruk (20.10: fila ble ødelagt og siden rendret rå)
  if(!stil) feil.push("stilarket er ikke i bruk");
  console.log(JSON.stringify({ seHor: "ok", intro, introSkjult, sawal, nastaliq, lydk, lydSrc, lydHttp, kanMp3, leder: (leder || "").trim(), call: (call || "").trim(), blokkert, bred, frem, feil }, null, 1));
  await b.close();
})().catch(e => { console.error("FEIL", e); process.exit(1); });
