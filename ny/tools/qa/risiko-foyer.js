// B-030 foyer risk @360: synlig nær CTA (også onboarding), % ærlig, ingen inntektsløfter,
// ingen Google Fonts CDN, ingen HEAD-preflight. Kjør: node risiko-foyer.js <UT> [BASE]
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const fs = require("fs"), path = require("path");
const UT = process.argv[2] || path.join(__dirname, "ut-risiko-foyer");
const BASE = process.argv[3] || "http://127.0.0.1:8774/neste/";
const INN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../innhold.json"), "utf8"));
const BAN = /guaranteed|risk-?free|100%\s*profit|easy\s*money|garantiert|risikofri|inntektsgaranti|passive\s*income|get\s*rich/i;
const SPR = ["ur_rm", "ur", "en", "no", "hi", "ar"];
fs.mkdirSync(UT, { recursive: true });

(async () => {
  const b = await chromium.launch();
  const feil = [];
  const riskN = String(INN.risk_prosent || 80);
  const ctx = await b.newContext({
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: "ur-PK",
    serviceWorkers: "block",
  });
  const p = await ctx.newPage();
  const heads = [];
  p.on("pageerror", (e) => feil.push("pageerror " + e.message));
  p.on("request", (req) => {
    if (req.method() === "HEAD") heads.push(req.url());
    const u = req.url();
    if (/fonts\.googleapis|fonts\.gstatic|ajax\.googleapis/i.test(u)) feil.push("CDN-font: " + u);
  });

  // 1) Onboarding foyer: risk synlig ved CTA (reg-gate/.risk er skjult)
  await p.goto(BASE + "?l=rehman-nogufl&lang=ur_rm", { waitUntil: "commit", timeout: 45000 });
  const port = await p.$("#port:not(.skjul)");
  if (port) {
    const pk = await p.$(".port-pk button, .port button.port-anbefalt, #port button");
    if (pk) await pk.click();
    await p.waitForTimeout(400);
  }
  await p.waitForSelector("#foyer-cta", { timeout: 8000 });
  await p.waitForSelector("#foyer-risk", { timeout: 5000 });

  const spot = await p.evaluate((n) => {
    const r = document.querySelector("#foyer-risk");
    const cta = document.querySelector("#foyer-cta");
    const gate = document.querySelector("#reg-gate");
    const riskSec = document.querySelector(".risk");
    const txt = (r && r.textContent || "").trim();
    const st = r && getComputedStyle(r);
    return {
      riskTxt: txt,
      hasPct: txt.indexOf(n) >= 0,
      riskVis: !!(r && r.offsetParent !== null && txt.length > 12),
      ctaVis: !!(cta && cta.offsetParent !== null),
      gateHidden: !gate || gate.offsetParent === null || getComputedStyle(gate).display === "none",
      riskSecHidden: !riskSec || riskSec.offsetParent === null || getComputedStyle(riskSec).display === "none",
      onboarding: document.body.classList.contains("onboarding"),
      scrollW: document.documentElement.scrollWidth,
      borderTop: st ? st.borderTopWidth : "",
      bg: st ? st.backgroundColor : "",
      font: (document.querySelector("link[href*='fonts.google']") || {}).href || null,
    };
  }, riskN);

  if (!spot.riskVis) feil.push("foyer-risk skjult/tom på onboarding-foyer");
  if (!spot.hasPct) feil.push("foyer-risk mangler % (" + riskN + "): " + spot.riskTxt.slice(0, 80));
  if (!spot.ctaVis) feil.push("foyer-cta ikke synlig");
  if (!spot.onboarding) feil.push("forventet onboarding (første besøk)");
  if (!spot.gateHidden) feil.push("reg-gate synlig i onboarding (skal være skjult — foyer-risk er da eneste B-030)");
  if (spot.scrollW > 360) feil.push("scrollWidth " + spot.scrollW + " > 360");
  if (BAN.test(spot.riskTxt)) feil.push("B-030-brudd i foyer-risk: " + spot.riskTxt);
  if (spot.font) feil.push("Google Fonts link i DOM");

  await p.screenshot({ path: path.join(UT, "risiko-foyer-ur_rm-360.png") });

  // 2) Alle språk: nøkkel + % + BAN
  for (const lang of SPR) {
    const expected = (INN.ui[lang] && INN.ui[lang].foyer_risk || "").replace(/\{n\}/g, riskN);
    if (!expected || expected.length < 20) {
      feil.push("mangler foyer_risk for " + lang);
      continue;
    }
    await ctx.clearCookies();
    await p.goto("about:blank");
    await p.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await p.goto(BASE + "?l=rehman-nogufl&lang=" + lang, { waitUntil: "commit", timeout: 45000 });
    const port2 = await p.$("#port:not(.skjul)");
    if (port2) {
      const btn = await p.$(".port-pk button, .port button.port-anbefalt, #port button");
      if (btn) await btn.click();
      await p.waitForTimeout(300);
    }
    await p.waitForSelector("#foyer-risk", { timeout: 8000 }).catch(() => {});
    const t = await p.evaluate(() => {
      const r = document.querySelector("#foyer-risk");
      return {
        txt: ((r && r.textContent) || "").trim(),
        dir: document.documentElement.dir,
        langAttr: document.documentElement.lang,
        vis: !!(r && r.offsetParent !== null),
      };
    });
    if (!t.vis) feil.push(lang + ": foyer-risk skjult");
    if (t.txt.indexOf(riskN) < 0) feil.push(lang + ": mangler " + riskN + " i «" + t.txt.slice(0, 60) + "»");
    if (BAN.test(t.txt)) feil.push(lang + ": BAN i foyer-risk");
    if ((lang === "ur" || lang === "ar") && t.dir !== "rtl") feil.push(lang + ": forventet dir=rtl, fikk " + t.dir);
    if (lang === "ur") await p.screenshot({ path: path.join(UT, "risiko-foyer-ur-360.png") });
    if (lang === "en") await p.screenshot({ path: path.join(UT, "risiko-foyer-en-360.png") });
  }

  // 3) Etter første leksjon: reg-gate risk også fylt
  await p.evaluate(() => {
    try {
      localStorage.setItem("neste.foerste", JSON.stringify(true));
      localStorage.setItem("neste.lang", JSON.stringify("ur_rm"));
    } catch (e) {}
  });
  await p.goto(BASE + "?l=rehman-nogufl&lang=ur_rm", { waitUntil: "commit", timeout: 45000 });
  await p.waitForSelector("#foyer-cta", { timeout: 8000 });
  await p.click("#foyer-cta");
  await p.waitForSelector("#lek:not(.skjul)", { timeout: 8000 }).catch(() => {});
  await p.click("#lek .hode button").catch(() => {});
  await p.waitForTimeout(600);
  const etter = await p.evaluate((n) => {
    const g = document.querySelector("#reg-gate-risk");
    const f = document.querySelector("#foyer-risk");
    return {
      gate: ((g && g.textContent) || "").trim(),
      foyer: ((f && f.textContent) || "").trim(),
      gateHas: ((g && g.textContent) || "").indexOf(n) >= 0,
      foyerHas: ((f && f.textContent) || "").indexOf(n) >= 0,
    };
  }, riskN);
  if (!etter.foyerHas) feil.push("foyer-risk mistet % etter leksjon-åpning");
  if (!etter.gateHas && etter.gate.length === 0) {
    // reg-gate kan være synlig etter første åpning; hvis tegnet, må ha %
  } else if (etter.gate.length > 0 && !etter.gateHas) {
    feil.push("reg-gate-risk mangler %: " + etter.gate.slice(0, 80));
  }
  if (BAN.test(etter.gate) || BAN.test(etter.foyer)) feil.push("BAN etter leksjon");

  if (heads.length) feil.push("HEAD-preflight: " + heads.slice(0, 3).join(", "));

  const rapport = { feil, risk_prosent: riskN, spot, heads: heads.length, spraak: SPR.length };
  fs.writeFileSync(path.join(UT, "risiko-foyer.json"), JSON.stringify(rapport, null, 2));
  console.log(JSON.stringify(rapport, null, 2));
  await b.close();
  process.exit(feil.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
