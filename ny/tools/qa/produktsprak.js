// Produktspråk-vakt (Academy, ingen saksnummer i medlems-UI).
// Feiler hvis innhold.json / leksjon-titler har #\d\d+ eller «Lær → …» / «Learn → …».
// _om-felt skannes også (JSON lastes i nettleseren). K-nummer (research) er OK.
"use strict";

const fs = require("fs");
const path = require("path");

const ROT = path.join(__dirname, "../..");
const INN = path.join(ROT, "innhold.json");
const LEK = path.join(ROT, "leksjon");

const TICKET = /#\d{2,}\b/;
const LAER_PIL = /Lær\s*→|Learn\s*→|«Lær»\s*→|"Lær"\s*→/;
const FANEN_LAER = /(?:^|[^\wÀ-ÿ])Lær(?:[^\wÀ-ÿ]|$)/; // norsk produktnavn alene — ikke verbet «lærer»

const feil = [];

function skannStreng(sti, tekst) {
  if (typeof tekst !== "string" || !tekst) return;
  if (TICKET.test(tekst)) {
    const m = tekst.match(TICKET);
    feil.push(`${sti}: saksnummer «${m[0]}» i medlemsinnhold`);
  }
  if (LAER_PIL.test(tekst)) {
    feil.push(`${sti}: utviklerlapp «Lær/Learn → …» — bruk Academy`);
  }
}

function skann(obj, sti) {
  if (obj == null) return;
  if (typeof obj === "string") {
    skannStreng(sti, obj);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => skann(v, `${sti}[${i}]`));
    return;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) skann(v, `${sti}.${k}`);
  }
}

const data = JSON.parse(fs.readFileSync(INN, "utf8"));
skann(data, "$");

/* UI-fanen/seksjonen skal hete Academy, ikke Lær (sjekk cta + steg, ikke hele JSON for verbet). */
for (const lang of Object.keys(data.ui || {})) {
  const ui = data.ui[lang];
  for (const k of ["cta_foyer", "cta_foyer_done", "reg_laast_cta", "steg_sabaq"]) {
    const v = ui[k];
    if (typeof v === "string" && FANEN_LAER.test(v) && !/Academy/i.test(v)) {
      feil.push(`ui.${lang}.${k}: inneholder «Lær» uten Academy`);
    }
    if (typeof v === "string" && /Academy/i.test(v) === false && k.startsWith("cta_")) {
      feil.push(`ui.${lang}.${k}: mangler Academy`);
    }
  }
}

for (const f of fs.readdirSync(LEK)) {
  if (!f.endsWith(".html")) continue;
  const raw = fs.readFileSync(path.join(LEK, f), "utf8");
  const tm = raw.match(/<title>([^<]*)<\/title>/i);
  if (tm) skannStreng(`leksjon/${f}<title>`, tm[1]);
}

const unik = [...new Set(feil)];
const ut = { ok: unik.length === 0, antall: unik.length, feil: unik };
console.log(JSON.stringify(ut, null, 1));
process.exit(unik.length ? 1 : 0);
