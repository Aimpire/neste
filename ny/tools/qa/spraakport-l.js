// #277 / backlog: ?l= uten lagret språk → ur_rm + foyer (ingen port). Pill åpner port.
// Kjør: node spraakport-l.js <UT> [BASE]
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const fs = require("fs"), path = require("path");
const UT = process.argv[2] || path.join(__dirname, "ut-spraak");
const BASE = process.argv[3] || "http://127.0.0.1:8775/neste/";
fs.mkdirSync(UT, { recursive: true });

(async () => {
  const b = await chromium.launch();
  const feil = [];
  const ctx = await b.newContext({
    viewport: { width: 360, height: 800 },
    isMobile: true,
    hasTouch: true,
    serviceWorkers: "block",
  });
  const p = await ctx.newPage();
  p.on("pageerror", (e) => feil.push("pageerror " + e.message));

  // 1) ?l= + tom LS → foyer, ikke port, lang ur_rm
  await p.goto(BASE + "?l=rehman-nogufl", { waitUntil: "commit" });
  await p.evaluate(() => localStorage.clear());
  await p.reload({ waitUntil: "commit" });
  await p.waitForTimeout(700);
  const a = await p.evaluate(() => ({
    portSkjult: !document.querySelector("#port") || document.querySelector("#port").classList.contains("skjul"),
    foyer: !!(document.querySelector("#intro-t") || {}).textContent,
    lang: localStorage.getItem("neste.lang"),
    htmlLang: document.documentElement.lang,
    cta: !!(document.querySelector("#foyer-cta") || {}).offsetParent,
  }));
  if (!a.portSkjult) feil.push("port synlig med ?l= og tom LS (skal hoppes)");
  if (!a.foyer) feil.push("foyer uten tekst");
  if (a.lang !== JSON.stringify("ur_rm") && a.lang !== '"ur_rm"') feil.push("neste.lang ikke ur_rm: " + a.lang);
  if (!a.cta) feil.push("foyer-CTA ikke synlig");
  await p.screenshot({ path: path.join(UT, "spraak-l-foyer-360.png") });

  // 2) språk-pill åpner port
  await p.click("#sprak");
  await p.waitForTimeout(300);
  const bPort = await p.evaluate(() => !document.querySelector("#port").classList.contains("skjul"));
  if (!bPort) feil.push("språk-pill åpnet ikke port");
  await p.screenshot({ path: path.join(UT, "spraak-pill-port-360.png") });

  // 3) uten ?l= + tom LS → port (uendret)
  await p.goto(BASE, { waitUntil: "commit" });
  await p.evaluate(() => localStorage.clear());
  await p.reload({ waitUntil: "commit" });
  await p.waitForTimeout(500);
  const c = await p.evaluate(() => !document.querySelector("#port").classList.contains("skjul"));
  if (!c) feil.push("uten ?l= skal porten vises ved første besøk");
  await p.screenshot({ path: path.join(UT, "spraak-uten-l-port-360.png") });

  // 4) lagret en + ?l= → beholder en (ikke overstyr)
  await p.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("neste.lang", JSON.stringify("en"));
  });
  await p.goto(BASE + "?l=rehman-nogufl", { waitUntil: "commit" });
  await p.waitForTimeout(600);
  const d = await p.evaluate(() => ({
    lang: localStorage.getItem("neste.lang"),
    portSkjult: document.querySelector("#port").classList.contains("skjul"),
    intro: (document.querySelector("#intro-t") || {}).textContent || "",
  }));
  if (d.lang !== JSON.stringify("en")) feil.push("lagret en ble overskrevet: " + d.lang);
  if (!d.portSkjult) feil.push("lagret en skal ikke vise port");
  if (!/learn|together/i.test(d.intro) && d.intro.indexOf("learn") < 0 && d.intro.indexOf("Learn") < 0 && d.intro.indexOf("We learn") < 0) {
    /* en intro_t: "We learn trading together." */
    if (d.intro.indexOf("We learn") < 0) feil.push("forventet engelsk foyer: " + d.intro.slice(0, 60));
  }

  console.log(JSON.stringify({ feil, a, pillOpensPort: bPort, utenL_port: c, lagretEn: d }, null, 2));
  fs.writeFileSync(path.join(UT, "spraakport-l.json"), JSON.stringify({ feil }, null, 2));
  await b.close();
  process.exit(feil.length ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(2);
});
