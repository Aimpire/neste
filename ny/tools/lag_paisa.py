#!/usr/bin/env python3
"""Lager én innholdsfil per språk for Paisa/Mazeed-detaljene (B-055).

Kilden (alle seks språk, portert fra huben) ligger i tools/innhold/paisa-alle.json og publiseres ikke.
Et medlem leser ett språk, så hver tekst {ur_rm, ur, en, no, hi, ar} blir til én streng i paisa/<språk>.json.
Mangler et språk en tekst (P2P finnes bare på urdu og hindi), blir verdien null og appen skjuler blokken.
Felt som starter med «_» (merknader) tas ikke med. «kilde» tas med bare når den er en https-lenke medlemmet kan sjekke.

Bruk: python3 tools/lag_paisa.py        (fra 40-community/neste)
"""
import gzip, json, pathlib, sys

HER = pathlib.Path(__file__).resolve().parent
NESTE = HER.parent
KILDE = HER / "innhold" / "paisa-alle.json"
UT = NESTE / "paisa"
SPRAK = ["ur_rm", "ur", "en", "no", "hi", "ar"]


def er_tekst(v):
    return isinstance(v, dict) and {"ur_rm", "ur", "en"} <= set(v)


def flat(v, sp):
    if er_tekst(v):
        return v.get(sp)                       # null når språket mangler – aldri en annen språks tekst i stedet
    if isinstance(v, dict):
        # «kilde» følger med når den er en lenke medlemmet kan sjekke selv (Myfxbook); notater og «UVERIFISERT» er for oss.
        return {k: flat(x, sp) for k, x in v.items()
                if not k.startswith("_") and (k != "kilde" or (isinstance(x, str) and x.startswith("https://")))}
    if isinstance(v, list):
        return [flat(x, sp) for x in v]
    return v


def main():
    data = json.loads(KILDE.read_text("utf-8"))
    UT.mkdir(exist_ok=True)
    for sp in SPRAK:
        ut = flat(data, sp)
        b = json.dumps(ut, ensure_ascii=False, separators=(",", ":")).encode()
        (UT / f"{sp}.json").write_bytes(b)
        print(f"paisa/{sp}.json  {len(b) // 1024:>4} KB rå · {len(gzip.compress(b)) // 1024:>3} KB gzip")
    # Vakt: ingen synlig tekst skal være null på hovedspråket, unntatt blokker som bevisst mangler språk
    mangler = []
    def finn(v, sti):
        if isinstance(v, dict):
            for k, x in v.items(): finn(x, f"{sti}.{k}")
        elif isinstance(v, list):
            for i, x in enumerate(v): finn(x, f"{sti}[{i}]")
        elif v is None and not sti.startswith("$.p2p"):
            mangler.append(sti)
    finn(flat(data, "ur_rm"), "$")
    if mangler:
        sys.exit("STOPP: ur_rm mangler tekst i " + ", ".join(mangler[:8]))


if __name__ == "__main__":
    main()
