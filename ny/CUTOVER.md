# Cutover: det nye skallet på rot (aimpire.github.io/) – plan og sjekkliste

Ops-notat for lokal/founder. Ikke synlig for medlemmer. Nordstjernen (`10-funn/PRODUKT-nordstjerne-20261020.md`, låst med Cursor 20.10):
skallet v2 på rot, huben som **Guide** under `/guide/`. Founder 21.10 13:17: «bare bli ferdig med den nye appen». Byttet er det eneste
steget som rører alle medlemmene på én gang, så det gjøres med frist og opt-out (sagt i #197), ikke som spørsmål.

## Hva som må holde etter byttet (målt før, målt etter)
| Hva | I dag | Etter | Test |
|---|---|---|---|
| Navnelenker `aimpire.github.io/<navn>` (ledere deler dem) | hub `404.html` → `?l=<kode>` | samme `404.html` på rot, men → skallet med `?l=` | `navnelenke.js` mot rot |
| `?l=<kode>` og `#<kode>` i gamle meldinger | hub-foyer med leder | skallet med leder (B-023-lås står) | `sponsor-laas.js`, `ledere.js` |
| Guiden (10 steg, KYC/innskudd/apper) | hub rot | `/guide/` (samme hub, bare flyttet) + lenke fra skallets reg-gate (B-053) | hub-QA mot `/guide/` |
| Ledersiden `ledere.html` | rot | `/guide/ledere.html`; skallets lederverktøy (#340) er inngangen | `ledere-forhand.js` |
| Service worker | hub-SW på rot, skall-SW på `/neste/ny/` | én SW på rot (skallet), hub-SW avregistreres (`sw.js` på `/guide/` med `self.registration.unregister()` i én versjon) | `offline`-test, `lyd-enheter.js` |
| Element-meldingene (lenker + «åpne i nettleser») | peker til rot (hub) | peker til rot (skallet) – teksten holder | les gjennom `40-community/*-element*.md` |
| Data: `data/nyheter.json`, `ledere-reserve.csv`, `navnelenker-reserve.csv` | rot | må ligge både på rot (skallet leser leder-reserve) og `/guide/` | `blokk-cdn`-test |
| Forhåndsvisningen `/neste/ny/` | skallet | slås av (eller blir «neste versjon») | – |

## HOLDT 21.10 18:15 – byttet skal ikke skje ennå
Founder 18:12: «den ser ikke ut som en slutt produkt og academy messig veldig bra men hva med resten av
funksjonalitetene som verve-landingssiden … og hva med sonic og stats osv, det mangler flere sider som
hubben hadde.» Han har rett, og det er målbart: huben har visningene start · earn (Sonic · Historikk ·
Kalkulator · Uttak) · tools · learn · faq · ib · chat · guide. Appen har Academy · call · kalkulator ·
journal · markedsklokke · deling · lederverktøy · guide-lenke. Sonic, Historikk/stats, Uttak, IB/verving
og FAQ finnes ikke i appen – de ville havnet bak én «Guide»-rad, og det er en nedgradering for alle som
kommer for *det*, ikke for Academy. B-013 (founder 15.10) satte nettopp Sonic først i rekkefølgen.

Byttet gjøres når appen er et **supersett** av huben, ikke et utsnitt. Alt i denne planen står ved lag og er
testet (cutover-QA grønn); det er bare tidspunktet som flyttes. Inntil da: huben blir liggende på rot,
appen på /neste/ny/ som forhåndsvisning. Ingen risiko for medlemmene i mellomtiden.

## Rekkefølge (når appen er komplett, én kveld, etter onsdagscallen onsdag 21.10 kl. 22.00 PKT = 19.00 norsk)
1. Frys: ingen fletting til `lokal/neste` de siste timene; full QA 25/25 + hub-QA grønn.
2. Flett `lokal/neste` → `main`, kjør hub-QA og `hub/tools/cutover-qa.sh` på resultatet (begge grønne, ellers stopp).
3. `hub/deploy.sh --cutover "Ny app på rot, guiden under /guide/"` – setter sammen og publiserer; venter til kanten er byte-lik.
4. Verifiser live: navnelenke (`/rehman`), `?l=nogufl`, guide-steg, ledersiden, lyd på 9 enheter, SW-bytte (gammel SW borte etter én reload).
5. **Først når live er verifisert:** opprett `40-community/hub/CUTOVER-AKTIV` (se under) og push `main`. Rekkefølgen er
   bevisst – markøren er repoets påstand om hva som ER live, og den skal ikke stå der før det er sant.
6. Element: én melding i gruppa – `meldinger/20261022-ny-app.md` (KOPIER HERFRA/TIL HIT per språk).
7. Rull tilbake = `deploy.sh` med forrige hub-dist (ligger i Pages-repoets historikk, `git revert`) **og slett markøren**.

## Bryteren som hindrer stille tilbakerulling (`40-community/hub/CUTOVER-AKTIV`)
`.github/workflows/publiser.yml` publiserer automatisk når `main` endres (#219), og speilet før denne endringen
hardkodet `hub/dist/` til rot. Etter cutover ville altså **første push til main som rører `40-community/hub/**`
ha lagt huben tilbake på rot og fjernet appen for alle medlemmene.** Den rakk aldri å skje (PAGES_TOKEN mangler,
#220, så kjøringen stopper rød før publisering), men minen lå der til token kom.

Nå styrer markørfila hvilken utgave som bygges:
| Markør | Utgave | Hva som speiles |
|---|---|---|
| mangler | huben alene (som før cutover) | `40-community/hub/dist/` |
| finnes | `tools/cutover-bygg.sh` | appen på rot, huben i `/guide/`, navnelenker + 404 på rot |

Fire vakter kjøres før noe speiles, hver med negativ kontroll (målt 21.10 – alle fire slår ut på sin egen feil):
rot-`index.html` må inneholde språkporten (= skallet) · `/guide/index.html` må **ikke** inneholde den ·
`index.html`, `sw.js`, `404.html` og `/guide/`-paret må finnes · `ledere.txt` må ikke være duplisert i `/guide/`.
Trigger-stiene tar nå med `40-community/neste/**` (skallet *er* nettstedet etter cutover) og utelater `neste/tools/**`.

## Verktøy (laget 21.10)
- `hub/tools/cutover-kjor.sh` – **hele byttet i én kommando**, stopper ved første feil så det aldri blir halvveis utført.
  Uten argument: tørrkjøring (skall-QA + PWA + hub-QA + cutover-QA, ingenting publiseres). Med `--publiser`:
  publiserer, verifiserer live (rot er appen, `/guide/` er huben, 404, delingskortet, `ledere.txt` urørt) og setter
  markøren til slutt. Live-sjekkene er prøvd mot dagens nettsted: begge cutover-påstandene stopper, kontrollen passerer.
- `hub/tools/cutover-bygg.sh <mappe>` – setter sammen nettstedet: skallet på rot, huben i `/guide/`, navnelenker + 404 på rot,
  `ledere.html` på rot som omdirigering, reservefilene på rot, ingen `/guide/ledere.txt` (huben leser rot-fila under `/guide/`).
- `hub/tools/cutover-qa.sh` – bygger og tester overgangen lokalt med en Pages-lik server: fase A dagens nettsted med hubens SW,
  fase B det nye i samme nettleserprofil (antall navigeringer til skallet), `?l=`, `/asma/`, ukjent sti, `ledere.html`,
  gamle hub-adresser (`#faq`, `#calc`, `#earn`, `#steg-3`, `#hours`, `?l=…#guide`), `/ledere.txt` fra `/guide/`, skallets cache overlever huben.
- `hub/deploy.sh --cutover "melding"` – samme vern som vanlig publisering (bygg først, `ledere.txt` urørt, «Aimpire» som committer,
  vent til kanten serverer byte-likt – også `guide/index.html` og `guide/sw.js`).
- Service workerne er rettet for delt domene: skallets SW slipper `/guide/`, navnelenker og `ledere.html` forbi; hubens SW sletter ikke
  skallets cacher.

## Gjenstår før byttet
- ~~Skallets `index.html`: videresend gamle hub-adresser~~ – gjort 21.10 (inline-skript øverst i `<head>`, bare på `/`); «Guide» som fast rad under «Mer».
- Hub-QA på den flettede `main` (huben fra `lokal/neste` har tur-endringen 7451214 som ikke er på main ennå).
- Ikke nødvendig likevel: prefiks i `build.py` (huben bruker relative stier; delingslenker går til rot = skallet, som er riktig),
  egen 404 i skallet (hubens 404 og navnesider sender til `/?l=`, som blir skallet).
