// #292 QA: «Jeg står fast» – knapp, WA-tekst med lek= / lang, Element-fallback, ingen telefon i svar-lenke.
const { chromium } = require(require("path").join(__dirname, "../../../hub/tools/qa/node_modules/playwright"));
const OUT = process.argv[2] || ".", BASE = process.argv[3] || "http://127.0.0.1:8771/neste/";
const feil = [];
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true }); await c.addInitScript(() => { try{ localStorage.setItem("neste.foerste", "true"); }catch(e){} });   /* returnerende medlem: førstegangsflyten testes i reg-gate.js */
  const p = await c.newPage();
  await p.goto(BASE + "index.html?lang=ur#academy", { waitUntil: "load" });
  await p.waitForTimeout(900);
  await p.evaluate(() => { try { localStorage.setItem("neste.lang", "\"ur\""); localStorage.setItem("neste.leder", JSON.stringify({ id: "2mcmat", name: "Sara", link: "https://copyxapp.com/auth/register?e=ABCDEFGHIJKLMNOPQRSTUV&a=1" })); } catch (e) {} });
  await p.reload({ waitUntil: "load" });
  await p.waitForTimeout(1000);
  await p.click(".leks").catch(() => {});
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => {
    const b = document.querySelector(".stuckb");
    if (!b) return { ok: false, why: "ingen .stuckb" };
    b.click();
    return new Promise(res => setTimeout(() => {
      const meny = document.querySelector(".stuckmeny");
      const wa = meny && meny.querySelector("a.wa");
      const el = meny && meny.querySelector("a.el");
      const href = wa ? wa.getAttribute("href") || "" : "";
      const tekst = (() => { try { return decodeURIComponent((href.split("text=")[1] || "").replace(/\+/g, " ")); } catch (e) { return ""; } })();
      const svar = (tekst.match(/https?:\/\/\S+/) || [""])[0];
      const o = {
        ok: true,
        btn: b.textContent.trim().slice(0, 40),
        wa: !!wa,
        el: !!(el && /matrix\.to/.test(el.href || "")),
        hasLek: /[?&]lek=pip\b/.test(svar) || /[?&]lek=/.test(svar),
        hasLang: /[?&]lang=ur\b/.test(svar),
        phoneInUrl: /wa\.me\/\d{8,}/.test(svar) || /phone=\d{8,}/.test(svar),
        hasId: /id=pip|id=[a-z0-9_-]+/.test(tekst),
        soft: !!(document.querySelector(".stucksoft") || document.querySelector(".stuckhint")),
      };
      if (!o.wa) o.ok = false, o.why = "ingen WA-lenke";
      if (!o.el) o.ok = false, o.why = (o.why || "") + " ingen Element";
      if (!o.hasLek) o.ok = false, o.why = (o.why || "") + " mangler lek=";
      if (o.phoneInUrl) o.ok = false, o.why = (o.why || "") + " telefon i svar-URL";
      res(o);
    }, 400));
  });
  if (!r.ok) feil.push(JSON.stringify(r));
  else console.log("stuck ok", JSON.stringify(r));
  await p.screenshot({ path: OUT + "/stuck-ur-360.png", fullPage: false });
  /* Soft-fail: uten names_csv (blokkert) skal knappen fortsatt vise Element */
  await p.route("**/pub?gid=22159740**", route => route.abort());
  await p.goto(BASE + "index.html?lang=ur_rm&lek=pip#academy", { waitUntil: "load" });
  await p.waitForTimeout(1200);
  const soft = await p.evaluate(() => {
    const lek = !document.querySelector("#lek").classList.contains("skjul");
    const b = document.querySelector(".stuckb");
    if (b) b.click();
    return new Promise(res => setTimeout(() => {
      const el = document.querySelector(".stuckmeny a.el");
      res({ lek, el: !!(el && el.href), btn: b && b.textContent.trim().slice(0, 48) });
    }, 500));
  });
  if (!soft.lek) feil.push("lek= pip åpnet ikke: " + JSON.stringify(soft));
  if (!soft.el) feil.push("Element mangler etter Sheets-blokk: " + JSON.stringify(soft));
  else console.log("soft-fail ok", JSON.stringify(soft));
  await p.screenshot({ path: OUT + "/stuck-ur_rm-lek-360.png", fullPage: false });
  await b.close();
  if (feil.length) { console.error(JSON.stringify({ feil }, null, 2)); process.exit(1); }
  console.log(JSON.stringify({ ok: true, feil: [] }));
})().catch(e => { console.error(e); process.exit(1); });
