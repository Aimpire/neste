// #259/#285 kunde-flyt @360: foyer-porter + soft-lås. Gate-terskel = #296 (3 riktige) —
// reg-gate.js er kilde til sannhet for REG_GATE_LEKS / uten-leder / risiko-linje.
// Kjør: node kunde-flyt.js <UT-dir> [BASE]
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const fs = require("fs"), path = require("path");
const UT = process.argv[2] || path.join(__dirname, "ut-kunde");
const BASE = process.argv[3] || "http://127.0.0.1:8765/";
const INN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../innhold.json"), "utf8"));
const REF_HOSTS = ["copyxapp.com", "www.copyxapp.com"];
const BAN = /guaranteed|risk-?free|100%\s*profit|easy\s*money|garantiert|risikofri/i;
/* Samme terskel som app.js REG_GATE_LEKS / reg-gate.js GATE — ikke lag en annen regel her. */
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
  p.on("pageerror", e => feil.push("pageerror " + e.message));
  p.on("console", m => { if (m.type() === "error") feil.push("console " + m.text().slice(0, 120)); });

  await p.goto(BASE + "?l=rehman-nogufl&lang=ur_rm#academy", { waitUntil: "commit", timeout: 45000 });
  const port = await p.$("#port:not(.skjul)");
  if (port) {
    await p.click("#port-valg .port-anbefalt, #port-valg button").catch(() => {});
    await p.waitForTimeout(400);
  }

  await p.evaluate(() => { location.hash = "#ghar"; }); await p.waitForSelector("#foyer-cta", { timeout: 8000 });
  const harFoyerReg = await p.$("#foyer-reg");
  const harFoyerDel = await p.$("#foyer-del");
  if (!harFoyerReg || !harFoyerDel) {
    feil.push("mangler #foyer-reg / #foyer-del");
    console.log(JSON.stringify({ feil }, null, 2));
    await b.close();
    process.exit(1);
  }

  /* Første besøk (B-053): kontolenken vises så snart lederen er bekreftet (asynkront fra arket); deling venter til første leksjon. */
  await p.waitForSelector("#leder .ok", { timeout: 10000 }).catch(() => feil.push("leder ble ikke bekreftet innen 10 s"));
  const foer = await p.evaluate(() => ({
    regHidden: document.querySelector("#foyer-reg").hidden,
    delHidden: document.querySelector("#foyer-del").hidden,
    onboarding: document.body.classList.contains("onboarding"),
    tekst: (document.querySelector(".foyer") || {}).innerText || "",
    ovf: document.documentElement.scrollWidth - innerWidth,
  }));
  if (foer.regHidden) feil.push("foyer-reg skjult under onboarding (B-053: alltid synlig når leder finnes)");
  if (!foer.delHidden) feil.push("foyer-del synlig under onboarding");
  if (foer.ovf > 0) feil.push("sidescroll " + foer.ovf);
  if (BAN.test(foer.tekst)) feil.push("B-030-brudd i foyer-tekst");

  /* Åpne Academy → lukk uten svar: onboarding over, soft-låst register. */
  await p.click("#foyer-cta");
  await p.waitForSelector("#lek:not(.skjul)", { timeout: 5000 });
  await p.click("#lek .hode button");
  await p.waitForFunction(() => {
    try { return !!JSON.parse(localStorage.getItem("neste.leder") || "null"); } catch (e) { return false; }
  }, null, { timeout: 8000 }).catch(() => {});
  await p.reload({ waitUntil: "commit" });
  await p.waitForTimeout(600);
  if (await p.$("#port:not(.skjul)")) {
    await p.click("#port-valg .port-anbefalt, #port-valg button").catch(() => {});
    await p.waitForTimeout(400);
  }
  await p.waitForSelector("#foyer-reg:not([hidden])", { timeout: 5000 }).catch(() => {});

  const soft = await p.evaluate(() => {
    const fr = document.querySelector("#foyer-reg");
    const fd = document.querySelector("#foyer-del");
    return {
      regHidden: !fr || fr.hidden,
      delHidden: !fd || fd.hidden,
      foyerLaast: fr ? (fr.classList.contains("laast") || (fr.getAttribute("href") || "#") === "#") : true,
      tekst: (document.querySelector(".foyer") || {}).innerText || "",
    };
  });
  if (soft.regHidden) feil.push("foyer-reg skjult etter onboarding (skal soft-låses synlig)");
  if (soft.delHidden) feil.push("foyer-del skal være synlig når leder finnes");
  if (soft.foyerLaast) feil.push("foyer-reg låst (B-053: ingen lås – lenken virker før " + GATE + " riktige)");
  if (BAN.test(soft.tekst)) feil.push("B-030-brudd etter onboarding");

  /* Én riktig må IKKE åpne register (#296, ikke gammel 1-riktig-regel). */
  await svarRiktig(p, 0, { neste: false });
  if (await p.$("#lek:not(.skjul)")) {
    await p.click("#lek .hode button").catch(() => {});
    await p.waitForTimeout(400);
  }
  const etterEn = await p.evaluate(() => {
    const fr = document.querySelector("#foyer-reg");
    return {
      laast: fr.classList.contains("laast") || (fr.getAttribute("href") || "#") === "#",
      hidden: fr.hidden,
    };
  });
  if (etterEn.hidden) feil.push("foyer-reg skjult etter 1 riktig");
  if (etterEn.laast) feil.push("foyer-reg låst etter 1 riktig (B-053: ingen lås)");

  /* Resten til GATE riktige → partner-URL (samme terskel som reg-gate.js). */
  for (let i = 1; i < GATE; i++) await svarRiktig(p, i, { neste: i < GATE - 1 });
  if (await p.$("#lek:not(.skjul)")) {
    await p.click("#lek .hode button").catch(() => {});
    await p.waitForTimeout(500);
  }

  const etter = await p.evaluate((hosts) => {
    const fr = document.querySelector("#foyer-reg");
    let host = "";
    try { host = new URL(fr.href).hostname; } catch (e) {}
    return {
      laast: fr.classList.contains("laast"),
      href: fr.getAttribute("href") || "",
      host,
      hostOk: hosts.indexOf(host) >= 0,
      tekst: fr.textContent || "",
    };
  }, REF_HOSTS);
  if (etter.laast) feil.push("foyer-reg fortsatt låst etter " + GATE + " riktige");
  if (!etter.hostOk) feil.push("foyer-reg host ikke i REF_HOSTS: " + etter.host + " href=" + etter.href);

  await p.screenshot({ path: path.join(UT, "kunde-flyt-360.png"), fullPage: false });
  console.log(JSON.stringify({
    feil,
    foer: { regHidden: foer.regHidden, delHidden: foer.delHidden, onboarding: foer.onboarding },
    soft: { foyerLaast: soft.foyerLaast, delHidden: soft.delHidden },
    etterEn,
    etter,
    gate: GATE,
  }, null, 2));
  await b.close();
  process.exit(feil.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
