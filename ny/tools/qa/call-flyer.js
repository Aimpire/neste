// #249 Nesté call-flyer: 360 px, langs, no Google Fonts, ICS, soft-fail surface, join href.
const path = require("path");
const { chromium } = require(path.join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));

(async () => {
  const ut = process.argv[2] || "/tmp/neste-flyer-qa";
  const base = (process.argv[3] || "http://127.0.0.1:8771/neste/").replace(/\/?$/, "/");
  const feil = [];
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 360, height: 800 }, isMobile: true });
  const p = await ctx.newPage();
  const net = [];
  p.on("response", (r) => {
    try { net.push(r.url()); } catch (e) {}
  });

  async function sjekk(lang, expectDir) {
    net.length = 0;
    await p.goto(base + "call-flyer.html?lang=" + lang, { waitUntil: "networkidle" });
    await p.waitForTimeout(800);
    const htmlLang = await p.locator("html").getAttribute("lang");
    const dir = await p.locator("html").getAttribute("dir");
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    const merke = await p.locator(".merke").innerText();
    const tid = await p.locator("#tid").innerText();
    const join = await p.locator("#join").getAttribute("href");
    const ics = await p.locator("#ics").getAttribute("href");
    const softHidden = await p.locator("#soft").evaluate((el) => el.hidden || !el.classList.contains("on") || !el.textContent.trim());
    const google = net.filter((u) => /fonts\.googleapis|fonts\.gstatic/i.test(u));
    if (google.length) feil.push({ lang, hva: "google_fonts", google });
    if (sw > 360) feil.push({ lang, hva: "scrollWidth", sw });
    if (dir !== expectDir) feil.push({ lang, hva: "dir", dir, expectDir });
    if (!/AIM\s*PIRE/i.test(merke.replace(/\s+/g, ""))) feil.push({ lang, hva: "brand", merke });
    if (!/10\s*PM/i.test(tid)) feil.push({ lang, hva: "tid", tid });
    if (!join || !/meet\.jit\.si\/AimpireBudhLive/i.test(join)) feil.push({ lang, hva: "join", join });
    if (!ics || !/call\.ics/.test(ics)) feil.push({ lang, hva: "ics", ics });
    // Soft-fail: when probe fails, banner shows; when ok, stays hidden. Either state is valid.
    await p.screenshot({ path: path.join(ut, `call-flyer-${lang}-360.png`), fullPage: true });
    return { lang, htmlLang, dir, sw, join, softHidden, googleFonts: google.length };
  }

  const resultat = [];
  try {
    resultat.push(await sjekk("ur_rm", "ltr"));
    resultat.push(await sjekk("ur", "rtl"));
    resultat.push(await sjekk("en", "ltr"));
  } catch (e) {
    feil.push({ hva: "exception", melding: String(e && e.message || e) });
  }
  await b.close();
  console.log(JSON.stringify({ resultat, feil }, null, 1));
  process.exit(feil.length ? 1 : 0);
})();
