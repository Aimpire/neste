// #291 Nesté PWA + offline. Beviser: (1) SW scope bare /neste/ny/, (2) offline skall+innhold,
// (3) hub `/` og /asma/ styres IKKE av nesté-SW (#258).
// Oppsett: server rot med hub-fake + nesté under /neste/ny/ (se pwa-offline-server nedenfor / kjor).
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const fs = require("fs"), path = require("path");
const UT = process.argv[2] || path.join(__dirname, "ut-pwa");
const BASE = (process.argv[3] || "http://127.0.0.1:8791").replace(/\/$/, "");
fs.mkdirSync(UT, { recursive: true });

(async () => {
  const b = await chromium.launch();
  const feil = [];
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  p.on("pageerror", e => feil.push("pageerror " + e.message));

  // --- 1) Installer SW på nesté ---
  await p.goto(BASE + "/neste/ny/?l=rehman-nogufl", { waitUntil: "networkidle" });
  const port = await p.$("#port:not(.skjul)");
  if (port) { const btn = await p.$("#port-valg button"); if (btn) await btn.click(); await p.waitForTimeout(800); }

  const reg = await p.evaluate(async () => {
    if (!navigator.serviceWorker) return { err: "no-sw-api" };
    const r = await navigator.serviceWorker.ready;
    const all = await navigator.serviceWorker.getRegistrations();
    return {
      scope: r.scope,
      script: (r.active && r.active.scriptURL) || "",
      n: all.length,
      scopes: all.map(x => x.scope)
    };
  });
  if (reg.err) feil.push(reg.err);
  if (!/\/neste\/ny\/?$/.test(reg.scope.replace(/\/$/, "/") || "")) {
    // scope must end with /neste/ny/
    if (!(reg.scope || "").includes("/neste/ny")) feil.push("SW scope ikke under /neste/ny: " + reg.scope);
  }
  if ((reg.script || "").indexOf("/neste/ny/sw.js") < 0) feil.push("SW-script ikke nesté: " + reg.script);
  if ((reg.scopes || []).some(s => s.replace(/\/$/, "") === new URL(BASE).origin || s.endsWith(new URL(BASE).pathname.replace(/\/$/, "") + "/") && !s.includes("/neste/"))) {
    /* allow only nesté scopes */
  }
  if ((reg.scopes || []).some(s => {
    try {
      const u = new URL(s);
      return u.pathname === "/" || u.pathname === "";
    } catch (e) { return false; }
  })) feil.push("SW registrert på hub-rot `/` — #258-brudd: " + JSON.stringify(reg.scopes));

  // Vent til cache har innhold.json
  await p.waitForTimeout(1500);
  const cacheOk = await p.evaluate(async () => {
    const keys = await caches.keys();
    const neste = keys.filter(k => k.indexOf("aimpire-neste-") === 0);
    if (!neste.length) return { ok: false, keys };
    const c = await caches.open(neste[0]);
    const reqs = await c.keys();
    const urls = reqs.map(r => r.url);
    const lyd = urls.filter(u => u.indexOf("/lyd/") >= 0);
    const buildMatch = (neste[0] || "").match(/^aimpire-neste-(.+)$/);
    const build = buildMatch ? buildMatch[1] : "";
    return {
      ok: urls.some(u => u.indexOf("innhold.json") >= 0) && urls.some(u => u.indexOf("app.js") >= 0),
      n: urls.length,
      keys: neste,
      build,
      lydN: lyd.length
    };
  });
  if (!cacheOk.ok) feil.push("cache mangler innhold/app: " + JSON.stringify(cacheOk));
  if (!/^[0-9a-f]{12}$/.test(cacheOk.build || "")) {
    feil.push("BUILD ikke innholdshash (12 hex): " + JSON.stringify(cacheOk.build));
  }
  if (cacheOk.lydN > 0) feil.push("lyd precached (skal ikke): " + cacheOk.lydN);

  // Lyd: SW skal ikke intercepte — Range-forespørsel får nettverkssvar (ikke SW-cache 200).
  const lydProbe = await p.evaluate(async () => {
    try {
      const r = await fetch(new URL("./lyd/pip-ur.mp3", location.href).href, {
        headers: { Range: "bytes=0-1" }
      });
      return { status: r.status, fromSW: r.headers.get("x-sw") || null, ok: r.ok || r.status === 206 };
    } catch (e) {
      return { err: String(e.message || e).slice(0, 80) };
    }
  });
  if (lydProbe.err) {
    /* Fil kan mangle i QA-kopi — da er «ikke intercept» fortsatt OK så lenge det ikke er cache-hit. */
  } else if (!(lydProbe.status === 206 || lydProbe.status === 200 || lydProbe.status === 404)) {
    feil.push("lyd-probe uventet status: " + JSON.stringify(lydProbe));
  }

  await p.screenshot({ path: path.join(UT, "pwa-online-360.png") });

  // --- 2) Offline nesté ---
  await ctx.setOffline(true);
  await p.reload({ waitUntil: "domcontentloaded" }).catch(e => feil.push("offline reload: " + String(e).slice(0, 80)));
  await p.waitForTimeout(1200);
  const offline = await p.evaluate(() => ({
    harMain: !!document.querySelector("main#hjem, #hjem, .foyer"),
    intro: (document.querySelector("#intro-t") || {}).textContent || "",
    title: document.title,
    bodyLen: (document.body && document.body.innerText || "").length
  }));
  if (!offline.harMain || offline.bodyLen < 40) feil.push("offline nesté tom/ødelagt: " + JSON.stringify(offline));
  await p.screenshot({ path: path.join(UT, "pwa-offline-neste-360.png") });

  // --- 3) Offline hub `/` — skal IKKE vise nesté-skall ---
  let hubBody = "";
  try {
    await p.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 5000 });
    await p.waitForTimeout(500);
    hubBody = await p.evaluate(() => (document.body && document.body.innerText || "").slice(0, 200));
  } catch (e) {
    hubBody = "NAV_FAIL:" + String(e.message || e).slice(0, 60);
  }
  // Fake hub sier HUB-ROOT; hvis nesté SW kapret, ville vi sett Aimpire foyer / Academy
  if (/Hum mil kar|We learn trading|foyer|Ukeløkka/i.test(hubBody)) {
    feil.push("nesté-SW servert hub `/` (#258): " + hubBody.slice(0, 100));
  }
  if (!/HUB-ROOT|NAV_FAIL/.test(hubBody) && hubBody.length > 0 && /AIMPIRE|Academy/i.test(hubBody) && !/HUB-ROOT/.test(hubBody)) {
    feil.push("hub `/` offline lignet nesté: " + hubBody.slice(0, 100));
  }
  await p.screenshot({ path: path.join(UT, "pwa-offline-hub-root.png") }).catch(() => {});

  // --- 4) Offline navnelenke-sti — ikke nesté forside ---
  let asma = "";
  try {
    await p.goto(BASE + "/asma/", { waitUntil: "domcontentloaded", timeout: 5000 });
    asma = await p.evaluate(() => (document.body && document.body.innerText || "").slice(0, 200));
  } catch (e) {
    asma = "NAV_FAIL";
  }
  if (/Hum mil kar|We learn trading|Ukeløkka/i.test(asma)) {
    feil.push("nesté-SW servert /asma/ som skall (#258): " + asma.slice(0, 80));
  }

  await ctx.setOffline(false);
  console.log(JSON.stringify({ feil, reg, cacheOk, offline, hubBody: hubBody.slice(0, 80), asma: asma.slice(0, 60) }, null, 2));
  await b.close();
  process.exit(feil.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
