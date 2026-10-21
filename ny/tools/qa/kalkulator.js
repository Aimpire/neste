// Position-size / risk calculator polish: mono tall, soft forklaringer, ingen signal/innskudd, ingen CDN/HEAD.
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const UT = process.argv[2], BASE = process.argv[3] || "http://127.0.0.1:8765/neste/";
(async () => {
  const b = await chromium.launch(), feil = [];
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await ctx.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });
  const p = await ctx.newPage();
  const net = [];
  p.on("request", r => { const u = r.url(); if(/fonts\.googleapis|fonts\.gstatic|HEAD/i.test(u) || r.method() === "HEAD") net.push(r.method() + " " + u); });
  p.on("console", m => { if(m.type() === "error") feil.push(m.text()); });
  p.on("pageerror", e => feil.push("pageerror " + e.message));

  await p.goto(BASE + "?lang=ur_rm#paisa", { waitUntil: "networkidle" });
  await p.waitForTimeout(400);
  await p.click("#p-kalk");
  await p.waitForTimeout(300);

  const m = await p.evaluate(() => {
    const kalk = document.querySelector("#lek .kalk");
    if(!kalk) return { err: "mangler .kalk" };
    const inputs = [...kalk.querySelectorAll("input[type=number]")];
    const chips = [...kalk.querySelectorAll(".kinst button")].map(b => b.textContent.trim());
    const monoIn = inputs.map(i => getComputedStyle(i).fontFamily);
    const tall = [...kalk.querySelectorAll(".ut b")].map(b => ({
      t: b.textContent.trim(),
      ff: getComputedStyle(b).fontFamily,
      dir: getComputedStyle(b).direction
    }));
    const under = (document.querySelector("#lek .vt .under") || {}).textContent || "";
    const formel = (kalk.querySelector(".kformel") || {}).textContent || "";
    const note = (kalk.querySelector(".knote") || {}).textContent || "";
    const body = (kalk.textContent || "") + under;
    const ban = ["deposit", "innskudd", "put money", "buy now", "sell now", "signal", "garanti", "guaranteed"];
    const hitBan = ban.filter(w => body.toLowerCase().includes(w));
    const cdn = [...document.styleSheets].some(s => (s.href || "").includes("fonts.google"));
    const face = [...document.styleSheets].flatMap(s => { try{ return [...s.cssRules]; }catch(e){ return []; } })
      .filter(r => r instanceof CSSFontFaceRule)
      .map(r => r.style.getPropertyValue("src") || r.cssText);
    const selfJet = face.some(s => /jetbrains-mono/i.test(s) && /skrift\//i.test(s));
    return {
      chips, monoIn, tall, under, formel, note, hitBan, cdn, selfJet,
      scrollW: document.querySelector("#lek").scrollWidth,
      nInput: inputs.length
    };
  });
  if(m.err) feil.push(m.err);
  if(m.nInput !== 3) feil.push("inputs " + m.nInput);
  if(!(m.chips || []).some(c => /EUR\/USD/.test(c))) feil.push("mangler EUR/USD-chip");
  if(!(m.chips || []).some(c => /XAU|Gold/i.test(c))) feil.push("mangler gold-chip");
  if(!(m.monoIn || []).every(f => /JetBrains Mono/i.test(f))) feil.push("input ikke JetBrains Mono: " + JSON.stringify(m.monoIn));
  if(!(m.tall || []).every(t => /JetBrains Mono/i.test(t.ff))) feil.push("resultat ikke JetBrains Mono");
  if(!(m.tall || []).every(t => t.dir === "ltr")) feil.push("tall ikke ltr");
  if(!/hisaab|mashwara|Arithmetic|advice|Regnestykke|råd|حساب|مشورہ/i.test(m.under || "")) feil.push("soft lede mangler");
  if(!/lots\s*=/i.test(m.formel || "")) feil.push("formel mangler");
  if(!/Specification|MT5|contract/i.test(m.note || "")) feil.push("check-note mangler");
  if((m.hitBan || []).length) feil.push("ban: " + m.hitBan.join(","));
  if(m.cdn) feil.push("google fonts stylesheet");
  if(!m.selfJet) feil.push("JetBrains ikke self-hosted skrift/");
  if(m.scrollW > 360) feil.push("scrollW " + m.scrollW);
  const headKalk = net.filter(x => x.startsWith("HEAD "));
  if(headKalk.length) feil.push("HEAD preflight: " + headKalk.slice(0, 3).join("; "));

  /* Gold: stop-etikett bytter til $ */
  await p.click("#lek .kalk .kinst button >> nth=-1");
  await p.waitForTimeout(150);
  const stopLab = await p.evaluate(() => {
    const labs = [...document.querySelectorAll("#lek .kalk label.kfelt .kfelt-t")];
    return labs.length ? labs[labs.length - 1].textContent : "";
  });
  if(!/\$|dollar|قیمت|qeemat|gull|gold|سعر/i.test(stopLab)) feil.push("gold stop-label: " + stopLab);

  /* Floor: tiny risk → under 0.01 */
  await p.evaluate(() => {
    const ins = [...document.querySelectorAll("#lek .kalk input[type=number]")];
    if(ins[0]){ ins[0].value = "50"; ins[0].dispatchEvent(new Event("input", { bubbles: true })); }
    if(ins[1]){ ins[1].value = "0.1"; ins[1].dispatchEvent(new Event("input", { bubbles: true })); }
    if(ins[2]){ ins[2].value = "200"; ins[2].dispatchEvent(new Event("input", { bubbles: true })); }
  });
  await p.waitForTimeout(100);
  const floorVis = await p.evaluate(() => {
    const e = document.querySelector("#lek .kalk .kfloor");
    return !!(e && !e.hidden && (e.textContent || "").trim().length > 10);
  });
  if(!floorVis) feil.push("floor-advarsel mangler");

  await p.screenshot({ path: UT + "/kalk-ur_rm-360.png" });
  await p.evaluate(() => document.documentElement.setAttribute("data-theme", "light"));
  await p.waitForTimeout(80);
  await p.screenshot({ path: UT + "/kalk-ur_rm-light-360.png" });
  await p.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));

  /* RTL ur */
  await p.goto(BASE + "?lang=ur#paisa", { waitUntil: "networkidle" });
  await p.waitForTimeout(400);
  await p.click("#p-kalk");
  await p.waitForTimeout(300);
  const rtl = await p.evaluate(() => ({
    dir: document.documentElement.dir,
    scrollW: document.querySelector("#lek").scrollWidth,
    mono: getComputedStyle(document.querySelector("#lek .kalk .ut .lotv b")).fontFamily
  }));
  if(rtl.dir !== "rtl") feil.push("ur ikke rtl");
  if(rtl.scrollW > 360) feil.push("ur scrollW " + rtl.scrollW);
  if(!/JetBrains Mono/i.test(rtl.mono || "")) feil.push("ur mono");
  await p.screenshot({ path: UT + "/kalk-ur-360.png" });

  console.log(JSON.stringify({ feil, under: (m.under || "").slice(0, 80), chips: m.chips, stopLab, floorVis, rtl, netN: net.length }, null, 1));
  await b.close();
  if(feil.length) process.exit(1);
})().catch(e => { console.error("FEIL", e); process.exit(1); });
