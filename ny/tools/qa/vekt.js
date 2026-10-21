// Hvor tungt er skallet? Alle svar (bytes over nett) ved første lasting, gruppert.
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
(async () => {
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 360, height: 800 }, isMobile: true });
  const p = await ctx.newPage(), rader = [];
  p.on("response", async r => { try{ const h = r.headers(); const u = r.url(); let n = +h["content-length"] || 0; if(!n){ const body = await r.body().catch(() => null); n = body ? body.length : 0; } rader.push({ u: u.replace(/^https?:\/\/[^/]+/, ""), host: new URL(u).host, n, type: h["content-type"] || "" }); }catch(e){} });
  await p.goto(process.argv[2] + "?lang=ur_rm", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  const grp = {}; rader.forEach(r => { const k = /fonts\.gstatic/.test(r.host) ? "fontfiler" : /fonts\.googleapis/.test(r.host) ? "font-css" : /docs\.google/.test(r.host) ? "ark" : r.u.replace(/\?.*/, ""); grp[k] = (grp[k] || 0) + r.n; });
  const sum = rader.reduce((s, r) => s + r.n, 0);
  console.log(JSON.stringify({ total_kB: Math.round(sum / 1024), deler_kB: Object.fromEntries(Object.entries(grp).map(([k, v]) => [k, Math.round(v / 1024)])), fontfiler: rader.filter(r => /gstatic/.test(r.host)).length }, null, 1));
  await b.close();
})();
