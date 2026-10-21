/* Takt: animasjonen følger stemmen (founder 20.10 23:34: «stemme og video må snakke i lag»).
   Appen (eller opptaket) gir cue-tider per scene fra lydfila (lyd/<id>-<sp>.cues.json, laget av lag_lyd.py)
   og oppdaterer lydens tid med window.lydTid(t, spiller). Hver scene venter til stemmen er kommet dit,
   og bevegelser inne i scenen (pip-tikk, lot-vekst) strekkes over scenens varighet.
   Uten cues (ingen lyd på språket, eller gammel app) brukes animasjonens egne faste tider. */
(function () {
  var cues = null, tid = 0, stempel = 0, spiller = false, klokke = null;
  window.lydTid = function (t, spill) { tid = +t || 0; stempel = performance.now(); spiller = !!spill; };
  /* Mellom to lydtider gjettes tiden framover – men maks 0,6 s: hakker lyden (billig Android under last, tregt nett), skal ikke
     animasjonen løpe forbi stemmen og bytte scene for tidlig (pip drev 9 s under last 21.10). */
  function naa() { return spiller ? tid + Math.min(0.6, (performance.now() - stempel) / 1000) : tid; }
  /* Venter på scene k (eller slutten). Cue-tidene kan komme ETTER at animasjonen startet (tregt nett: appen venter bare 1,5 s);
     derfor sjekkes cues ved hvert tikk – kommer de, følger animasjonen stemmen fra neste scene. Uten cues: reservetiden. */
  function ventTil(k, reserveMs, tilSlutt) {
    var t0 = performance.now();
    return new Promise(function (r) {
      var i = setInterval(function () {
        if (cues) { var t = tilSlutt ? cues.slutt : cues.scener[k]; if (t == null || naa() >= t - 0.05) { clearInterval(i); r(); } }
        else if (performance.now() - t0 >= reserveMs) { clearInterval(i); r(); }
      }, 40);
    });
  }
  window.Takt = {
    /* cues: {scener:[t0,t1,…], slutt:T}. opptak: driv tiden med egen klokke (lyden legges på etterpå). */
    sett: function (c, opptak) {
      cues = c && c.scener && c.scener.length ? c : null;
      if (cues && opptak) { var t0 = performance.now(); klokke = setInterval(function () { window.lydTid((performance.now() - t0) / 1000, false); }, 50); }
    },
    har: function () { return !!cues; },
    /* vent til scene k skal starte (reserve = animasjonens gamle ventetid) */
    scene: function (k, reserveMs) { return ventTil(k, reserveMs, false); },
    /* hvor lenge scene k varer i lyden (ms); reserve uten cues */
    varighet: function (k, reserveMs) {
      if (!cues) return reserveMs;
      var s = cues.scener, slutt = s[k + 1] != null ? s[k + 1] : cues.slutt;
      return Math.max(400, (slutt - s[k]) * 1000);
    },
    /* vent til lyden er ferdig (siste scene) */
    slutt: function (reserveMs) { return ventTil(0, reserveMs, true); },
    vent: function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); },
    stopp: function () { if (klokke) clearInterval(klokke); }
  };
})();
