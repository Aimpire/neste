// #265: Fagbegrep-vakt for skallet. Feil hvis no/ur/ar/hi-tekst bruker oversatte fagord
// (ordliste i LAERDOM «Fagbegreper»). Leser innhold.json. Positiv kontroll: plantet «lys».
"use strict";

const fs = require("fs");
const path = require("path");
const { skann, positivKontroll } = require(
  path.join(__dirname, "../../../hub/tools/qa/fagbegrep-kjerne")
);

const INN = path.join(__dirname, "../../innhold.json");

const pk = positivKontroll();
if (!pk.ok) {
  console.log(JSON.stringify({ ok: false, feil: [pk.melding] }, null, 1));
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(INN, "utf8"));
/* Tekniske felt medlemmer aldri ser: lyd-metadata (leksjons-ID-er som «candle», stemmenavn), _om-notater. */
const synlig = JSON.parse(JSON.stringify(data, (k, v) => (k === "lyd" || k === "_om") ? undefined : v));
const feil = skann(synlig, "$");

const sett = new Set();
const unik = [];
for (const f of feil) {
  const k = `${f.sti}|${f.id}`;
  if (sett.has(k)) continue;
  sett.add(k);
  unik.push(f);
}

const ut = {
  ok: unik.length === 0,
  fil: "innhold.json",
  positiv: pk.melding,
  antall: unik.length,
  feil: unik.map((f) => `${f.lang} ${f.sti}: «${f.utdrag}» → bruk «${f.engelsk}»`),
};
console.log(JSON.stringify(ut, null, 1));
process.exit(unik.length ? 1 : 0);
