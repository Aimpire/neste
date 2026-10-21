// #288 Lær-først register-gate @360: soft-lås til 3 riktige / uke 1; CTA+risiko; validRef; ingen innskudd.
// Align #285 (#foyer-reg / #foyer-del). Kjør: node reg-gate.js <UT> [BASE]
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const fs = require("fs"), path = require("path");
const UT = process.argv[2] || path.join(__dirname, "ut-reg-gate");
const BASE = process.argv[3] || "http://127.0.0.1:8773/neste/";
const INN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../innhold.json"), "utf8"));
const REF_HOSTS = ["copyxapp.com", "www.copyxapp.com"];
const BAN = /guaranteed|risk-?free|100%\s*profit|easy\s*money|innskudd|deposit\s*guide|p2p/i;
const GATE = 3;
fs.mkdirSync(UT, { recursive: true });
const riktig = (uke, i, l) => INN[uke][i].sp[l].o[INN[uke][i].sp[l].r];

async function aapneLeksjonHvisLukket(p, lekIdx) {
  const open = await p.$("#lek:not(.skjul)");
  if (open) return;
  await p.evaluate(() => { location.hash = "#academy"; }); await p.waitForTimeout(150); await p.click("#uke1 .leks >> nth=" + lekIdx);
  await p.waitForSelector("#lek:not(.skjul)", { timeout: 5000 });
  await p.waitForTimeout(400);
}
async function svarRiktig(p, lekIdx, { neste } = { neste: true }) {
  await aapneLeksjonHvisLukket(p, lekIdx);
  const svar = riktig("uke1", lekIdx, "ur_rm");
  await p.getByRole("button", { name: svar, exact: true }).click().catch(async () => {
    await p.locator("#lek .valg button").filter({ hasText: svar }).first().click();
  });
  await p.waitForTimeout(350);
  if (neste) await p.click("#lek .nesteknapp button");
  else await p.click("#lek .hode button");
  await p.waitForTimeout(500);
}

(async () => {
  const b = await chromium.launch();
  const feil = [];
  const ctx = await b.newContext({
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: "ur-PK",
    serviceWorkers: "block",
  });
  const p = await ctx.newPage();
  p.on("pageerror", (e) => feil.push("pageerror " + e.message));

  const t0 = Date.now();
  await p.goto(BASE + "?l=rehman-nogufl&lang=ur_rm#academy", { waitUntil: "commit", timeout: 45000 });
  // Port kan vise selv med lang= hvis LS tom — bruk anbefalt PK-knapp
  const port = await p.$("#port:not(.skjul)");
  if (port) {
    await p.click("#port-valg .port-anbefalt, #port-valg button").catch(() => {});
    await p.waitForTimeout(400);
  }
  const tidPort = Date.now() - t0;

  await p.evaluate(() => { location.hash = "#ghar"; }); await p.waitForSelector("#foyer-cta", { timeout: 8000 });
  const tidCta = Date.now() - t0;
  await p.click("#foyer-cta");
  await p.waitForSelector("#lek:not(.skjul)", { timeout: 5000 });
  const tidLeksjon = Date.now() - t0;
  if (tidLeksjon > 60000) feil.push("foyer→leksjon > 60s: " + tidLeksjon + " ms");

  await p.click("#lek .hode button"); // lukk uten svar — onboarding over
  await p.waitForFunction(() => {
    try { return !!JSON.parse(localStorage.getItem("neste.leder") || "null"); } catch (e) { return false; }
  }, null, { timeout: 8000 }).catch(() => {});
  // Last tegnKundePorter på nytt (leder kan ha landet etter lukk)
  await p.reload({ waitUntil: "commit" });
  await p.waitForTimeout(600);
  if (await p.$("#port:not(.skjul)")) {
    await p.click("#port-valg .port-anbefalt, #port-valg button").catch(() => {});
    await p.waitForTimeout(400);
  }
  await p.waitForSelector("#foyer-reg:not([hidden])", { timeout: 5000 }).catch(() => {});

  const foer = await p.evaluate(() => {
    const fr = document.querySelector("#foyer-reg");
    const gate = document.querySelector("#reg-gate");
    const r = document.querySelector("#reg");
    return {
      harFoyerReg: !!fr,
      harGate: !!gate,
      foyerHidden: fr ? fr.hidden : true,
      foyerLaast: fr ? fr.classList.contains("laast") : false,
      foyerHref: fr ? fr.getAttribute("href") : "",
      gateLaast: r ? r.classList.contains("laast") : false,
      gateHoved: r ? r.classList.contains("hoved") : false,
      risk: ((document.querySelector("#reg-gate-risk") || {}).textContent || "").trim(),
      delHidden: (() => { const d = document.querySelector("#foyer-del"); return !d || d.hidden; })(),
      tekst: ((document.querySelector(".foyer") || {}).innerText || "") + " " + ((gate && gate.innerText) || ""),
    };
  });
  if (!foer.harFoyerReg) feil.push("mangler #foyer-reg (#285)");
  if (!foer.harGate) feil.push("mangler #reg-gate (#288)");
  if (foer.foyerHidden) feil.push("foyer-reg skjult etter første leksjon-åpning (skal soft-låses synlig)");
  if (foer.foyerLaast || foer.foyerHref === "#") feil.push("foyer-reg låst før 3 leksjoner (B-053: ingen lås)");
  if (foer.gateLaast) feil.push("#reg låst før gate (B-053: ingen lås)");
  if (foer.gateHoved) feil.push("#reg er hovedhandling før 3 riktige (B-053: først etter)");
  if (!foer.risk || foer.risk.length < 20) feil.push("mangler risiko-linje i gate");
  if (foer.delHidden) feil.push("foyer-del skjult med leder");
  if (BAN.test(foer.tekst)) feil.push("B-030/innskudd-strenger i synlig tekst");

  // 3 riktige i uke 1 → gate åpner (neste-knapp holder dialogen åpen mellom leksjoner)
  for (let i = 0; i < GATE; i++) await svarRiktig(p, i, { neste: i < GATE - 1 });
  // siste: lukk til hjem så #reg-gate / foyer tegnes med ny frem()
  if (await p.$("#lek:not(.skjul)")) {
    await p.click("#lek .hode button").catch(() => {});
    await p.waitForTimeout(500);
  }

  const etter = await p.evaluate((hosts) => {
    const fr = document.querySelector("#foyer-reg");
    const r = document.querySelector("#reg");
    let host = "";
    try { host = new URL(fr.href).hostname; } catch (e) {}
    let host2 = "";
    try { host2 = new URL(r.href).hostname; } catch (e) {}
    return {
      foyerLaast: fr.classList.contains("laast"),
      foyerHost: host,
      foyerOk: hosts.indexOf(host) >= 0,
      regLaast: r.classList.contains("laast"),
      regHoved: r.classList.contains("hoved"),
      figurer: document.querySelectorAll("#reg-figurer i").length,
      figurerVis: (() => { const f = document.querySelector("#reg-figurer"); return !!f && getComputedStyle(f).display !== "none"; })(),
      guideHref: (() => { const g = document.querySelector("#reg-guide"); return g ? (g.getAttribute("href") || "") : ""; })(),
      regHost: host2,
      regOk: hosts.indexOf(host2) >= 0,
    };
  }, REF_HOSTS);
  if (etter.foyerLaast) feil.push("foyer-reg fortsatt låst etter " + GATE + " riktige");
  if (!etter.foyerOk) feil.push("foyer-reg host ikke REF_HOSTS: " + etter.foyerHost);
  if (etter.regLaast) feil.push("#reg fortsatt låst etter " + GATE + " riktige");
  if (!etter.regHoved) feil.push("#reg ikke hovedhandling etter " + GATE + " riktige (B-053)");
  if (etter.figurer !== 100 || !etter.figurerVis) feil.push("100-figur-rekka mangler/skjult i gate etter " + GATE + " riktige (B-053): " + etter.figurer);
  if (!/aimpire\.github\.io\/.*#guide$/.test(etter.guideHref)) feil.push("guide-lenke mangler etter " + GATE + " riktige: " + etter.guideHref);
  if (!etter.regOk) feil.push("#reg host ikke REF_HOSTS: " + etter.regHost);

  // Uten leder (ingen ?l=, tom LS): disabled — #288 QA
  await p.goto(BASE + "?lang=ur_rm#academy", { waitUntil: "commit" });
  await p.evaluate(() => {
    Object.keys(localStorage).filter((k) => k.indexOf("neste.") === 0).forEach((k) => localStorage.removeItem(k));
    localStorage.setItem("neste.foerste", JSON.stringify(true));
    localStorage.setItem("neste.lang", JSON.stringify("ur_rm"));
    /* 3 riktige så gate er «åpen» men uten leder → fortsatt disabled */
    localStorage.setItem("neste.frem", JSON.stringify({
      pip: { riktig: 1 }, lot: { riktig: 1 }, spread: { riktig: 1 }
    }));
  });
  await p.reload({ waitUntil: "commit" });
  await p.waitForTimeout(800);
  await p.waitForSelector("#reg", { timeout: 5000 }).catch(() => {});
  const uten = await p.evaluate(() => {
    const r = document.querySelector("#reg");
    const fr = document.querySelector("#foyer-reg");
    const hrefOk = (el) => !el || el.classList.contains("laast") || el.getAttribute("aria-disabled") === "true" || (el.getAttribute("href") || "#") === "#";
    return {
      regDisabled: hrefOk(r),
      foyerDisabled: !fr || fr.hidden || hrefOk(fr),
      regHref: r && r.getAttribute("href"),
      foyerHref: fr && fr.getAttribute("href"),
    };
  });
  if (!uten.regDisabled) feil.push("uten leder: #reg skal være disabled (" + uten.regHref + ")");
  if (!uten.foyerDisabled) feil.push("uten leder: #foyer-reg skal være disabled/låst (" + uten.foyerHref + ")");

  await p.screenshot({ path: path.join(UT, "reg-gate-ur-360.png") });
  const rapport = {
    feil,
    tider_ms: { port: tidPort, cta: tidCta, leksjon: tidLeksjon },
    foer: { foyerLaast: foer.foyerLaast, gateLaast: foer.gateLaast },
    etter,
    uten,
  };
  console.log(JSON.stringify(rapport, null, 2));
  fs.writeFileSync(path.join(UT, "reg-gate.json"), JSON.stringify(rapport, null, 2));
  await b.close();
  process.exit(feil.length ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(2);
});
