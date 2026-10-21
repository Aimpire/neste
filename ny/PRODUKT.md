# Aimpire-appen – hva den er (21.10.2026)

Dette er beskrivelsen av det ferdige produktet, slik det står før byttet til rot (`CUTOVER.md`). Nordstjernen og
begrunnelsene ligger i `10-funn/PRODUKT-nordstjerne-20261020.md`; beslutningene i `00-beslutninger/BESLUTNINGSLOGG.md`.

## Hvem den er for
Nye medlemmer i Pakistan på billige Android-telefoner og tregt, ustabilt nett, ofte om kvelden, ofte delt telefon.
Dernest Norge og engelsktalende. Seks språk i grensesnittet: Roman Urdu (hoved), urdu (Nastaliq), engelsk, norsk, hindi, arabisk.
Fagtermene står på engelsk i alle språk; forklaringen er på morsmålet.

## Hva medlemmet møter (B-055, 21.10: fire steder i fast bunnmeny)
Medlemmets spørsmål kommer i fast rekkefølge: *hvem sendte meg og er dette ekte → hva er det → hva risikerer jeg →
hva gjør jeg nå.* De kommer tilbake for tre ting: onsdagscallen, å lære noe, pengespørsmål. Appen har derfor fire
steder – hvert av dem ett spørsmål, ikke en av våre produktflater. Fire korte ord som får plass på 320 px i alle seks språk.

0. **Språkport** – Roman Urdu først, resten bak «flere språk». Valget huskes. Første besøk viser bare Ghar med én handling.
1. **Ghar** – hvem som inviterte deg (lederen, verifisert), én setning om trygghet, én overskrift, **én handling** (neste
   Academy-leksjon), ærlig risikolinje (80 av 100 taper), kontolenken som rolig tekst, onsdagscallen som kort med
   nedtelling (raden over vises bare i live-vinduet, #339).
2. **Academy** – 20 leksjoner i fire uker, urørt: animasjon med stemme i takt, ett spørsmål, repetisjon 1/7/30 dager,
   «Aap kahan hain»-kartet. Uke 2–4 åpner når uka før er svart riktig.
3. **Paisa** – alt om penger i den rekkefølgen et menneske trenger det: forstå → sjekke → regne → gjøre → få ut.
   Oversikten er fem rader med ett sant svar hver (tall fra kilden). **Sonic** (hva det er · tre fakta · risikoen på samme
   skjerm · én handling) → **Historikk** (fem tall · 24 søyler · de ærlige notene · Myfxbook) → **Kalkulator** →
   **Konto** (ti steg i tre faser, hvert steg med HVOR først, «sjekk deg selv», lederens lenke der den er handlingen,
   quiz der huben har det, «Yeh ho gaya») → **Uttak** (synlig FØR noen setter inn). Risikoen (100-figurene) ligger her,
   der beslutningen tas. Innholdet hentes først når noen går inn (paisa.json).
4. **Mazeed** – resten, når medlemmet leter: markedsklokke, journal, sawal-jawab (25 spørsmål slik de stilles), lagre
   fremdrift, Home Screen, del med venn, for ledere (lenke, QR, forhåndsvisning, egen side), og sist og valgfritt:
   verving (den ærlige linja først, flyten i tre, tallene merket som meglerens og uverifiserte) med IB/bonuser bak én knapp.
5. **Konto** – lenken er alltid synlig når lederen er kjent, uten lås; hovedhandling etter 3 riktige leksjoner (B-053).
6. **Deling og gjenoppretting** – delt telefon: «Ny person» tømmer alt lokalt men beholder invitasjonen. Safari sletter
   data etter 7 dager: «Lagre fremgang» gir kode/lenke/QR (koden i `#`-delen, aldri til serveren), og en iOS-guide.

Huben ligger live på rot mens dette bygges, så de to kan måles mot hverandre. Cutover først når appen er målt bedre.

## Hvordan den er bygget
- **Ingen server.** Statiske filer på GitHub Pages. All tilstand i medlemmets nettleser (`neste.*`).
  Lederlisten hentes fra et publisert Google-ark med lokal reservekopi når arket er nede.
- **Tåler tregt nett:** egne skrifter (ingen Google Fonts), service worker som cacher skallet og uke 1,
  lyd aldri precachet, animasjoner som revalideres, ingen reserve som kan vise appen inni en animasjonsramme.
- **Animasjonene** er HTML i `40-community/grafikk/<tema>/animasjon.html`, kopiert inn i appen av `tools/lag_skrift.py`.
  Stemmen lages av `tools/lag_lyd.py` fra manus i `tools/lydmanus.json` og gir cue-tider per scene; `felles/takt.js`
  holder animasjonen i takt med stemmen. Samme kilder gir MP4-ene vi deler i WhatsApp/Element (`felles/ta_opp.js`).
- **Design (B-052):** marine grunn, tone i stedet for glass, radius 12/8, skillelinjer i lister, gradient bare som
  semantikk (én primærhandling, fremdrift), gull bare når noe er oppnådd, ikoner i tekstfarge.
- **Ærlighet (B-030):** ingen råd, ingen løfter, ingen inntektstall. Tapet er like synlig som gevinsten i hver animasjon,
  eksemplene bruker beløp medlemmene faktisk har ($100-konto, 0,01 lot), og hver leksjon ender i «dette er en misaal, ikke mashwara».

## Hva som måles før noe kalles ferdig
`tools/qa/kjor.sh` (23 tester: grunnflyt, uker, verktøy, kalkulator, ledere, språk, produktspråk, registrering,
sponsorlås, navnelenker, call-oppsummering, lyd, 9 enheter, synk for alle 20 leksjoner, synk på tregt nett, vekt),
`tools/qa/kjor-pwa.sh` (service worker, offline, animasjon på tregt nett) og `hub/tools/cutover-qa.sh` (overgangen til rot).

## Hva som ikke er der ennå
Hindi og arabisk stemme (#282) · egen hjemmeserver eller innlogging (bevisst: statisk, se `statisk-side-backend`) ·
flere uker enn fire · lederregister med sporing (krever server og persondata-avklaring).
