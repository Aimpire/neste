// Nesté #266-port: «Åpne i Chrome» trykkbar over språkporten i Instagram/TikTok;
// alle språkvalg nås; etter porten står banneret sticky i flyten. Ingen Google Fonts.
// Kjør: node inapp-port.js <UT> [BASE]
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const fs = require("fs"), path = require("path");
const UT = process.argv[2] || path.join(__dirname, "ut-inapp");
const BASE = process.argv[3] || "http://127.0.0.1:8771/neste/";
fs.mkdirSync(UT, { recursive: true });

const AND = "Mozilla/5.0 (Linux; Android 13; SM-A145F Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.6367.179 Mobile Safari/537.36 trill_340103 JsSdk/1.0 AppName/musical_ly app_version/34.1.3 Region/PK";
const IOS = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 330.0.0.0 (iPhone14,5; iOS 17_5; en_US; en; scale=3.00; 1170x2532; 600000000)";
const CHR = "Mozilla/5.0 (Linux; Android 13; SM-A145F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";

const treff = (id) => {
  const e = document.getElementById(id);
  if (!e || e.hidden) return "mangler";
  const r = e.getBoundingClientRect();
  if (!r.height) return "mangler";
  const t = document.elementFromPoint(r.left + r.width / 2, r.top + Math.min(r.height / 2, 18));
  return e.contains(t) ? "ja" : "dekket";
};

(async () => {
  const b = await chromium.launch();
  const feil = [];
  const rader = [];

  for (const [navn, ua, maal] of [
    ["TikTok Android", AND, "inapp-go"],
    ["Instagram iPhone", IOS, "inapp-ios"],
    ["Chrome Android", CHR, null],
  ]) {
    for (const [w, h] of [
      [320, 568],
      [360, 640],
      [360, 740],
    ]) {
      const c = await b.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        userAgent: ua,
        serviceWorkers: "block",
      });
      const p = await c.newPage();
      const errs = [];
      p.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));

      /* Uten ?l= + tom LS → språkport (gate 1 + port samtidig). */
      await p.goto(BASE, { waitUntil: "commit", timeout: 45000 });
      await p.evaluate(() => {
        localStorage.clear();
        try { sessionStorage.removeItem("neste.iab"); } catch (e) {}
      });
      await p.reload({ waitUntil: "networkidle" });
      await p.waitForTimeout(700);

      const r = {};
      r.banner = maal
        ? await p.evaluate(treff, maal)
        : await p.evaluate(() => {
            const e = document.getElementById("inapp-bar");
            return e && !e.hidden ? "vist" : "skjult";
          });
      r.lukk = maal ? await p.evaluate(treff, "inapp-x") : "-";
      r.port = await p.evaluate(() => {
        const port = document.getElementById("port");
        return {
          open: !!(port && !port.classList.contains("skjul")),
          portaapen: document.documentElement.classList.contains("portaapen"),
          iabvis: document.documentElement.classList.contains("iabvis"),
          barPos: (() => {
            const e = document.getElementById("inapp-bar");
            return e && !e.hidden ? getComputedStyle(e).position : "skjult";
          })(),
          iabh: getComputedStyle(document.documentElement).getPropertyValue("--iabh").trim(),
        };
      });
      /* PK først; åpne «andre språk»; sjekk treff under IAB-banner (scroll i #port). */
      r.valg = await p.evaluate(() => {
        const det = document.querySelector("#port details.port-andre");
        if (det) det.open = true;
        const iabh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--iabh")) || 0;
        const port = document.getElementById("port");
        const bt = [...document.querySelectorAll("#port button")].filter(
          (x) => x.offsetParent !== null && x.getBoundingClientRect().height > 0
        );
        let ok = 0;
        const ikke = [];
        for (const x of bt) {
          if (port) {
            const q0 = x.getBoundingClientRect();
            const mid = q0.top + q0.height / 2;
            const visTop = iabh + 12;
            const visBot = innerHeight - 12;
            if (mid < visTop || mid > visBot) port.scrollTop += mid - (visTop + visBot) / 2;
          }
          const q = x.getBoundingClientRect();
          const t = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2);
          if (x.contains(t)) ok++;
          else ikke.push((x.textContent || "").trim().slice(0, 16));
        }
        return ok + "/" + bt.length + (ikke.length ? " ikke: " + ikke.join(",") : "");
      });
      if (navn === "TikTok Android" && w === 360 && h === 640) {
        await p.screenshot({ path: path.join(UT, "inapp-port-tiktok-360.png") });
      }
      if (navn === "Instagram iPhone" && w === 320 && h === 568) {
        await p.screenshot({ path: path.join(UT, "inapp-port-ig-320.png") });
      }

      /* Velg Roman Urdu → port lukkes; banner sticky i flyten for IAB. */
      await p.click("#port button[data-lang='ur_rm']").catch(async () => {
        await p.locator("#port button").first().click();
      });
      await p.waitForTimeout(500);

      r.etter = await p.evaluate(() => {
        const e = document.getElementById("inapp-bar");
        const port = document.getElementById("port");
        return {
          portOpen: !!(port && !port.classList.contains("skjul")),
          portaapen: document.documentElement.classList.contains("portaapen"),
          pos: e && !e.hidden ? getComputedStyle(e).position : "skjult",
          sw: document.documentElement.scrollWidth,
          iabvis: document.documentElement.classList.contains("iabvis"),
        };
      });

      const bannerOk = maal ? r.banner === "ja" && r.lukk === "ja" : r.banner === "skjult";
      const valgOk = /^(\d+)\/\1$/.test(r.valg) && !/ ikke:/.test(r.valg);
      const portUnder = !maal || (r.port.barPos === "fixed" && r.port.portaapen && r.port.iabvis && !!r.port.iabh);
      const etterOk =
        !r.etter.portOpen &&
        !r.etter.portaapen &&
        (maal ? r.etter.pos === "sticky" && r.etter.iabvis : r.etter.pos === "skjult") &&
        r.etter.sw <= w + 1;
      const ok = bannerOk && valgOk && portUnder && etterOk && !errs.length;
      if (!ok) feil.push(`${navn} ${w}x${h}`);
      rader.push({
        ok,
        navn,
        vh: w + "x" + h,
        banner: r.banner,
        lukk: r.lukk,
        port: r.port,
        valg: r.valg,
        etter: r.etter,
        errs,
      });
      await c.close();
    }
  }

  /* Gate 1 med ?l=: foyer (port hoppes) – Chrome-knapp fortsatt trykkbar. */
  {
    const c = await b.newContext({
      viewport: { width: 360, height: 640 },
      isMobile: true,
      hasTouch: true,
      userAgent: AND,
      serviceWorkers: "block",
    });
    const p = await c.newPage();
    await p.goto(BASE + "?l=rehman-nogufl", { waitUntil: "commit" });
    await p.evaluate(() => {
      localStorage.clear();
      try { sessionStorage.removeItem("neste.iab"); } catch (e) {}
    });
    await p.reload({ waitUntil: "networkidle" });
    await p.waitForTimeout(700);
    const foyer = await p.evaluate(() => {
      const treff = (id) => {
        const e = document.getElementById(id);
        if (!e || e.hidden) return "mangler";
        const r = e.getBoundingClientRect();
        const t = document.elementFromPoint(r.left + r.width / 2, r.top + Math.min(r.height / 2, 18));
        return e.contains(t) ? "ja" : "dekket";
      };
      return {
        portSkjult: !document.querySelector("#port") || document.querySelector("#port").classList.contains("skjul"),
        go: treff("inapp-go"),
        cta: !!(document.querySelector("#foyer-cta") || {}).offsetParent,
      };
    });
    await p.screenshot({ path: path.join(UT, "inapp-foyer-l-360.png") });
    if (!foyer.portSkjult) feil.push("?l= viste port");
    if (foyer.go !== "ja") feil.push("?l= Chrome ikke trykkbar: " + foyer.go);
    if (!foyer.cta) feil.push("?l= mangler foyer-CTA");
    rader.push({ ok: !feil.includes("?l= viste port") && foyer.go === "ja", navn: "TikTok ?l= foyer", foyer });
    await c.close();
  }

  /* Gate 1 inne i en leksjon: banneret er sticky z70, leksjonshodet sticky z2 – tilbake-knappen må ikke havne bak det
     (målt 21.10: dekket av bannerteksten på 360 px, der banneret blir 106 px høyt fordi teksten brytes). */
  for (const [w, h] of [[320, 568], [360, 640]]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, userAgent: AND, serviceWorkers: "block" });
    await c.addInitScript(() => { try { localStorage.setItem("neste.sprak", "ur_rm"); localStorage.setItem("neste.foerste", "true"); } catch (e) {} });
    const p2 = await c.newPage();
    await p2.goto(BASE + "?lang=ur_rm&lek=pip", { waitUntil: "networkidle" });
    await p2.waitForSelector("#lek .hode button", { timeout: 20000 });
    const lek = await p2.evaluate(async () => {
      const l = document.getElementById("lek");
      window.scrollBy(0, 600); if (l) l.scrollTop = 600;
      await new Promise(r => setTimeout(r, 400));
      const bar = document.getElementById("inapp-bar"), hode = document.querySelector("#lek .hode");
      const bt = hode && hode.querySelector("button"), rb = bt ? bt.getBoundingClientRect() : null;
      const t = rb ? document.elementFromPoint(rb.left + rb.width / 2, rb.top + Math.min(rb.height / 2, 18)) : null;
      return {
        banner: !!bar && !bar.hidden,
        bannerBunn: bar && !bar.hidden ? Math.round(bar.getBoundingClientRect().bottom) : 0,
        hodeTop: hode ? Math.round(hode.getBoundingClientRect().top) : -1,
        tilbake: bt && t && bt.contains(t) ? "ja" : "dekket av " + (t ? (t.id || t.className || t.tagName) : "null"),
        sw: document.documentElement.scrollWidth,
      };
    });
    await p2.screenshot({ path: path.join(UT, `inapp-leksjon-${w}.png`) });
    const ok = lek.banner && lek.tilbake === "ja" && lek.hodeTop >= lek.bannerBunn - 1 && lek.sw <= w + 1;
    if (!ok) feil.push(`leksjon i IAB ${w}x${h}: tilbake ${lek.tilbake}, hode ${lek.hodeTop} mot banner ${lek.bannerBunn}`);
    rader.push({ ok, navn: `TikTok leksjon ${w}x${h}`, lek });
    await c.close();
  }

  const rapport = { feil, rader };
  fs.writeFileSync(path.join(UT, "inapp-port.json"), JSON.stringify(rapport, null, 2));
  console.log(JSON.stringify({ feil, n: rader.length, ok: rader.filter((x) => x.ok).length }, null, 2));
  await b.close();
  process.exit(feil.length ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(2);
});
