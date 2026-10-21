// Tregt nett + service worker (21.10): animasjonsrammen skal vise animasjonen, aldri appens forside.
// Feilen: SW-ens navigeringsgren ga index.html som reserve etter 0,8 s for ALLE navigeringer under skallet – også iframe-en
// i leksjon/. På pakistansk mobilnett viste en leksjon da appen inni rammen. Testen serverer leksjon/ med 2,5 s forsinkelse.
// Bruk: node pwa-treg-leksjon.js <utmappe> <rot-mappe>   (rot-mappe = samme oppsett som kjor-pwa.sh: skallet under /neste/ny/)
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const fs = require("fs"), path = require("path"), http = require("http");
const UT = process.argv[2], ROT = path.resolve(process.argv[3]);   /* resolve: TMPDIR slutter på «/» → «//» i stien ga 404 på alt og en test som hang */
const TYPER = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".woff2": "font/woff2", ".png": "image/png", ".mp3": "audio/mpeg", ".webmanifest": "application/manifest+json", ".ics": "text/calendar" };
let treg = false;
const srv = http.createServer((req, res) => {
  let sti = decodeURIComponent(req.url.split("?")[0]); if (sti.endsWith("/")) sti += "index.html";
  const fil = path.join(ROT, sti);
  if (!fil.startsWith(ROT) || !fs.existsSync(fil) || fs.statSync(fil).isDirectory()) { res.writeHead(404); return res.end("nei"); }
  const send = () => { res.writeHead(200, { "Content-Type": TYPER[path.extname(fil)] || "application/octet-stream", "Cache-Control": "no-cache" }); fs.createReadStream(fil).pipe(res); };
  if (treg && sti.indexOf("/leksjon/") >= 0) setTimeout(send, 2500); else send();
});
(async () => {
  await new Promise(r => srv.listen(0, "127.0.0.1", r));
  const BASE = "http://127.0.0.1:" + srv.address().port + "/neste/ny/";
  const INN = JSON.parse(fs.readFileSync(path.join(ROT, "neste/ny/innhold.json"), "utf8"));
  const b = await chromium.launch(), feil = [];
  const c = await b.newContext({ viewport: { width: 375, height: 740 }, isMobile: true, hasTouch: true });
  await c.addInitScript(ids => { try { localStorage.setItem("neste.foerste", "true"); const f = {}; ids.forEach(i => { f[i] = { riktig: 1 }; }); localStorage.setItem("neste.frem", JSON.stringify(f)); } catch (e) {} }, ["uke1", "uke2", "uke3"].flatMap(u => (INN[u] || []).map(x => x.id)));
  const p = await c.newPage(); p.on("pageerror", e => feil.push("JS " + String(e).slice(0, 80)));
  await p.goto(BASE + "?lang=ur_rm", { waitUntil: "networkidle" });
  const klar = await p.evaluate(() => Promise.race([navigator.serviceWorker.ready.then(() => true), new Promise(r => setTimeout(() => r(false), 15000))]));
  if (!klar) { console.log(JSON.stringify({ feil: ["service worker ble ikke klar på 15 s"] })); await b.close(); srv.close(); process.exit(1); }
  await p.reload({ waitUntil: "networkidle" });   /* nå styrer SW-en siden */
  const styrt = await p.evaluate(() => !!navigator.serviceWorker.controller);
  if (!styrt) feil.push("siden ble ikke styrt av SW etter reload");
  const precache = await p.evaluate(async () => { const k = (await caches.keys()).find(x => x.indexOf("aimpire-neste-") === 0); if (!k) return []; return (await (await caches.open(k)).keys()).map(r => r.url.split("/neste/ny/")[1]); });
  for (const f of ["leksjon/takt.js", "leksjon/sprak.js", "leksjon/spread.html", "leksjon/risk.html"]) if (precache.indexOf(f) < 0) feil.push("ikke precachet: " + f);
  treg = true;
  const rader = [];
  for (const id of ["news", "fomo"]) {   /* ikke precachet → første henting går over det trege nettet */
    await p.goto(BASE + "?lang=ur_rm&lek=" + id, { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(4500);
    const r = await p.evaluate(() => { const f = document.querySelector("#lek .anim iframe"); let d = null; try { d = f && f.contentDocument; } catch (e) {} return { iframe: !!f, harSpill: !!(f && f.contentWindow && typeof f.contentWindow.spill === "function"), viserAppen: !!(d && d.querySelector("#hjem")), tittel: d ? d.title : "" }; });
    rader.push(Object.assign({ id }, r));
    if (!r.iframe) feil.push(id + ": ingen animasjonsramme");
    if (r.viserAppen) feil.push(id + ": rammen viser appens forside (SW-reserve) på tregt nett");
    if (!r.harSpill) feil.push(id + ": animasjonen lastet ikke i rammen (" + r.tittel + ")");
  }
  /* Samme leksjon offline etter første besøk: skal komme fra cache (stale-while-revalidate har lagret den) */
  treg = false; await c.setOffline(true);
  await p.goto(BASE + "?lang=ur_rm&lek=news", { waitUntil: "domcontentloaded" }).catch(() => {});
  await p.waitForTimeout(2500);
  const off = await p.evaluate(() => { const f = document.querySelector("#lek .anim iframe"); return !!(f && f.contentWindow && typeof f.contentWindow.spill === "function"); }).catch(() => false);
  if (!off) feil.push("news offline etter første besøk: animasjonen mangler");
  await c.setOffline(false);
  await p.screenshot({ path: path.join(UT, "pwa-treg-leksjon.png") }).catch(() => {});
  console.log(JSON.stringify({ styrt, precache: precache.filter(x => /leksjon/.test(x)).length, rader, offline: off, feil }, null, 1));
  await b.close(); srv.close(); if (feil.length) process.exit(1);
})().catch(e => { console.error("FEIL", e); srv.close(); process.exit(1); });
