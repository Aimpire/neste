# Onsdagscall – Jitsi (B-050 / #261)

Ops-notat for lokal/founder. Ikke synlig for medlemmer.

## Tidsgrense (nytt 9.10.2026 – gjelder callen i morgen)
meet.jit.si kutter **hvert møte etter 95 minutter** («This meeting has ended because it reached its time limit»), og Jitsi varsler
at flere endringer kommer (K-186). Agendaen er 45 min, så det treffer oss normalt ikke – men:
- Hvis callen nærmer seg 85 minutter: del **del 2-rommet** i gruppa og i callen: https://meet.jit.si/AimpireCall-4bh36r-2
- Alle kommer inn igjen med samme regler (ingen konto for deltakere; founder må være den som åpner rommet).
- Blir dette et problem flere uker på rad, ligger alternativene i `10-funn/RESEARCH-matrix-call-20261021.md`.

## Romnavn

| Bruk | Navn | URL |
|---|---|---|
| **Fast (anbefalt)** | `AimpireCall-4bh36r` | https://meet.jit.si/AimpireCall-4bh36r |
| Ukentlig (valgfritt) | `AimpireBudhYYYYMMDD` | f.eks. `AimpireBudh20261021` = PKT-onsdag |

Regler: bokstaver, tall og bindestrek, ingen mellomrom. Romnavnet har tilfeldig hale så ingen utenforstående gjetter seg inn (founder: «må være sikkert»). Founder **oppretter** rommet én gang (konto på meet.jit.si, K-170). Deltakere uten konto. Bytt fast rom i `innhold.json` → `call.jitsi_rom` hvis dere må rotere.

## Skalls wiring (Cursor)

- Primærknapp `#call-join` → Jitsi (video muted i URL-hash).
- `#call-grp` = Element-gruppe som **backup**.
- Soft-fail: HEAD-probe mot `meet.jit.si` (4 s). Ved feil vises `call_blokk`; join er fortsatt mulig.
- Måling lokalt: `localStorage["neste.callMaal"]` med `join_tap` / `join_return` (ms) / `probe_*`. Les i DevTools etter test.

## Melding til gruppa (founder poster)

**Roman Urdu**

```
Assalam o alaikum – aaj raat 10 baje Pakistan time live call.

Link (browser mein kholein – Chrome ya Safari):
https://meet.jit.si/AimpireCall-4bh36r

Important:
• Element / WhatsApp ke andar mat kholein – browser mein open karein
• Video band rakhein (sirf host ka camera on)
• Mic on jab aap bolna chahte hain

Hum mil kar seekhte hain – yeh maali mashwara nahi hai.
```

**Urdu (Nastaliq)**

```
السلام علیکم – آج رات 10 بجے پاکستان ٹائم لائیو کال۔

لنک (براؤزر میں کھولیں – Chrome یا Safari):
https://meet.jit.si/AimpireCall-4bh36r

اہم:
• Element / WhatsApp کے اندر نہ کھولیں – براؤزر میں کھولیں
• ویڈیو بند رکھیں (صرف میزبان کا کیمرہ آن)
• جب بولنا ہو تب مائک آن

ہم مل کر سیکھتے ہیں – یہ مالی مشورہ نہیں ہے۔
```

## Måleprotokoll (første call)

1. 3–5 pakistanske medlemmer, gjerne dårlig nett.
2. Noter: antall som fikk lyd · sekunder fra trykk til lyd · frafall midtveis · soft-fail-banner sett?
3. Tall i sak #261 → lukk med bevis.

## Hub

`hub/template.html` er låst (#271/#276). Nesté er wired; hub-call-chip etter merge av foyer.

## Etter callen: forrige call på 5 minutter (#337)

Den ukentlige samlingen er den sterkeste grunnen til å komme tilbake (nordstjernen §2). Dytt varer ikke;
et kort sammendrag gjør at den som ikke kom, likevel får uka – og den som kom, får repetisjon.

**Rutine, samme kveld eller morgenen etter (founder eller leder, 20 min):**
1. Skriv 8–12 setninger på Roman Urdu i `tools/lydmanus.json` under id `call-<dato>` (f.eks. `call-2026-10-21`):
   hva vi gikk gjennom, ett eksempel med små beløp, ett vanlig spørsmål fra callen med svar, hva som skjer neste onsdag.
   Ingen råd, ingen tall om inntjening (B-030). Legg norsk og engelsk ved siden av (samme struktur, egne setninger).
2. Lag lyden: `python3 tools/lag_lyd.py call-<dato> --uten-innhold` → `lyd/call-<dato>-{ur,no,en}.mp3` (samme rolige stemmer som leksjonene).
   Founder kan i stedet lese inn selv (telefon, stille rom, 3–5 min) – legg fila på samme navn, kjør `--normaliser` så nivået blir −19 LUFS.
3. Legg inn i `innhold.json` → `call.oppsummering`, nyeste først:
   `{"dato": "2026-10-21", "min": 5, "spor": ["ur", "no", "en"], "tekst": {"ur_rm": "Aaj: pip, lot aur stop loss. Sawal group mein.", "ur": "…", "en": "…", "no": "…"}}`
   `tekst` er én–to setninger (vises under overskriften); hi/ar uten lyd og tekst får ingen blokk.
4. `sh tools/qa/kjor.sh` (testen `call-oppsum` sjekker lydfil per språk og at hi/ar ikke får tom blokk), så forhåndsvisning/publisering som vanlig.
5. Post samme sammendrag som tekst i gruppa med lenke til appen («åpne i Chrome/Safari, ikke i appen»).

**Måling av første call (B-050, founder teller i Jitsi – appen har ingen server):**
| Hva | Hvordan | Skriv her |
|---|---|---|
| Antall inn | deltakerlista i Jitsi ved 22:05 og 22:30 PKT | |
| Sekunder til lyd | spør de tre første som kommer inn: «hørte du meg med en gang?» | |
| Frafall | deltakere ved 22:05 minus ved 22:30 | |
| Kom ikke inn | de som skriver i gruppa at lenken ikke åpnet (Element-innebygd nettleser = vanligste årsak) | |
Resultatet føres i saken (#337) og i `10-funn/` som måling, ikke som påstand.
