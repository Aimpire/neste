#!/usr/bin/env python3
"""Egne skriftfiler for skallet (#268, etter #269 i huben): ingen kall til fonts.googleapis.com / fonts.gstatic.com.

Bruk:  uv run --python 3.13 --with fonttools --with brotli python tools/lag_skrift.py   (fra 40-community/neste;
       system-python3 mangler fontTools – målt 21.10 etter diskrydding)

Hva skriptet gjør:
  1. Kopierer hubens filer for familiene som er like (Montserrat, Noto Nastaliq Urdu, Noto Sans Devanagari,
     Noto Naskh Arabic) – samme bytes som huben, så en medlem som har vært innom huben har dem i cache.
  2. Henter de to familiene huben ikke har i riktig variant: Archivo smalt (overskrifter) og JetBrains Mono (tall).
     Google sender hele den variable skriften uansett område (Archivo 90 kB), så aksene kuttes her (målt 20.10):
     forsiden får en statisk fil med den ene bredden/vekten den bruker (Archivo 80 %/800 = 13 kB), leksjonene en
     variabel fil med bare spennet animasjonene bruker (72–80 %, 800–900 = 36 kB). Bare latin, kuttet til KJERNE-latin.
  3. Skriver @font-face-blokken mellom /* SKRIFT-START */ og /* SKRIFT-SLUTT */ i index.html.
  4. Lager leksjon/<navn>.html fra ../grafikk/<navn>/animasjon.html: logoen peker på ../ap-gradient-96.png og
     Google-lenken byttes med samme blokk (stier med ../). Da kan kopiene ikke gli fra kilden.

Urdu-skriften dekker bare arabisk-blokken her. Latinske ord i urdu-tekst (fagtermer som «stop loss») faller da
til Montserrat, slik flyeren gjør det.
Kjør:  uv run --python 3.13 --with fonttools --with brotli python 40-community/neste/tools/lag_skrift.py
Lisens: alle familiene er SIL Open Font License 1.1, som tillater egen hosting.
"""
import io, re, shutil, subprocess, sys
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

NESTE = Path(__file__).resolve().parents[1]
HUB = NESTE.parent / "hub"
GRAFIKK = NESTE.parent / "grafikk"
UT = NESTE / "skrift"
UA = "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36"
LEKSJONER = ["pip", "lot", "spread", "stop", "risk", "candle", "leverage", "news", "demo", "journal", "sessions", "trend", "sr", "rr", "swap", "fomo", "revenge", "overtrading", "plan", "rukna"]

# Samme blokker som hubens tools/skrift/lag_skrift.py (KJERNE). Endres de der, endres de her.
LATIN = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
LATIN_EXT = "U+0100-017F,U+02BF,U+1E24-1E25,U+1E6C-1E6D,U+2190-2199,U+21BB,U+2212,U+221E,U+2248,U+2260,U+22EE-22EF"
ARABISK = "U+0600-06FF,U+200C-200F,U+2010-2011,U+204F,U+25CC"
DEVANAGARI = "U+0900-097F,U+1CD0-1CF9,U+200C-200D,U+20A8,U+20B9,U+25CC,U+A830-A839,U+A8E0-A8FF"

# (familie, filnavn i huben, vekter, unicode-range)
FRA_HUB = [
    ("Montserrat", "montserrat-latin.woff2", "400 900", LATIN),
    ("Montserrat", "montserrat-latin-ext.woff2", "400 900", LATIN_EXT),
    ("Noto Nastaliq Urdu", "noto-nastaliq-urdu-arabic.woff2", "400 700", ARABISK),
    ("Noto Sans Devanagari", "noto-sans-devanagari-devanagari.woff2", "400 800", DEVANAGARI),
    ("Noto Naskh Arabic", "noto-naskh-arabic-arabic.woff2", "400 700", ARABISK),
]
# (familie, Google-familie, [(filnavn, akse-grenser, font-weight, font-stretch, hvor)]); hvor = "index" | "leksjon"
FRA_GOOGLE = [
    ("Archivo", "Archivo:wdth,wght@72..80,800..900", [
        ("archivo-80-800-latin.woff2", {"wdth": 80, "wght": 800}, "800", "80%", "index"),
        ("archivo-smal-latin.woff2", {"wdth": (72, 80), "wght": (800, 900)}, "800 900", "72% 80%", "leksjon"),
    ]),
    ("JetBrains Mono", "JetBrains+Mono:wght@700..800", [
        ("jetbrains-mono-700-latin.woff2", {"wght": 700}, "700", None, "index"),
        ("jetbrains-mono-latin.woff2", {"wght": (700, 800)}, "700 800", None, "leksjon"),
    ]),
]


def curl(url):
    """curl, ikke urllib (Python 3.14 på denne maskinen finner ikke sertifikatene)."""
    return subprocess.run(["curl", "-sSfL", "--max-time", "60", "-A", UA, url], check=True, capture_output=True).stdout


def kutt(data, rng, grenser=None):
    font = TTFont(io.BytesIO(data))
    opt = subset.Options()
    opt.layout_features = ["*"]
    opt.flavor = "woff2"
    opt.notdef_outline = True
    opt.name_IDs = ["*"]
    s = subset.Subsetter(opt)
    koder = []
    for del_ in rng.split(","):
        a, _, b = del_.strip()[2:].partition("-")
        koder.extend(range(int(a, 16), int(b or a, 16) + 1))
    s.populate(unicodes=koder)
    s.subset(font)
    if grenser:   # aksene kuttes ETTER tegnsettet: motsatt rekkefølge krasjer i fontTools (KeyError i gvar, målt 20.10)
        font = instancer.instantiateVariableFont(font, grenser, updateFontNames=False)
    ut = io.BytesIO()
    font.flavor = "woff2"
    font.save(ut)
    return ut.getvalue()


def regel(fam, fil, vekt, rng, stretch, prefiks):
    st = f"font-stretch:{stretch};" if stretch else ""
    return (f"@font-face{{font-family:'{fam}';font-style:normal;font-weight:{vekt};{st}font-display:swap;"
            f"src:url({prefiks}{fil}) format('woff2');unicode-range:{rng}}}")


def blokk(prefiks, hvor):
    linjer = [regel(f, fil, v, r, None, prefiks) for f, fil, v, r in FRA_HUB]
    linjer += [regel(f, fil, v, LATIN, st, prefiks) for f, _, varianter in FRA_GOOGLE for fil, _, v, st, h in varianter if h == hvor]
    return "/* SKRIFT-START (tools/lag_skrift.py – ikke rediger for hånd) */\n" + "\n".join(linjer) + "\n/* SKRIFT-SLUTT */"


def main():
    UT.mkdir(exist_ok=True)
    for gammel in UT.glob("*.woff2"):
        gammel.unlink()
    for _, fil, _, _ in FRA_HUB:
        kilde = HUB / "assets" / "fonts" / fil
        if not kilde.is_file() or kilde.stat().st_size == 0:
            sys.exit(f"mangler i huben: {kilde} – kjør hubens lag_skrift.py først")
        shutil.copyfile(kilde, UT / fil)
        print(f"kopi   {fil:42} {kilde.stat().st_size:>7} B")
    for fam, gfam, varianter in FRA_GOOGLE:
        css = curl(f"https://fonts.googleapis.com/css2?family={gfam}&display=swap").decode()
        m = re.search(r"/\* latin \*/\s*@font-face \{.*?url\((\S+?)\)", css, re.S)
        if not m:
            sys.exit(f"fant ikke latin-fil for {fam}")
        raa = curl(m.group(1))
        for fil, grenser, _, _, hvor in varianter:
            ferdig = kutt(raa, LATIN, grenser)
            (UT / fil).write_bytes(ferdig)
            print(f"hentet {fil:42} {len(raa):>7} B -> {len(ferdig):>7} B ({hvor})")

    idx = NESTE / "index.html"
    html = idx.read_text("utf-8")
    google = re.compile(r'<link rel="preconnect" href="https://fonts\.gstatic\.com" crossorigin>\n<link rel="stylesheet" href="https://fonts\.googleapis\.com/[^"]+">\n')
    html = google.sub("", html)
    merke = re.compile(r"/\* SKRIFT-START.*?/\* SKRIFT-SLUTT \*/", re.S)
    if merke.search(html):
        html = merke.sub(lambda _: blokk("skrift/", "index"), html)
    else:
        html = html.replace("<style>\n", "<style>\n" + blokk("skrift/", "index") + "\n", 1)
    idx.write_text(html, "utf-8")

    for n in LEKSJONER:
        kilde = (GRAFIKK / n / "animasjon.html").read_text("utf-8")
        ut = kilde.replace('src="../../flyer/onsdag/ap-gradient.png"', 'src="../ap-gradient-96.png"').replace('src="../felles/sprak.js"', 'src="sprak.js"').replace('src="../felles/takt.js"', 'src="takt.js"')
        ut, antall = re.subn(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/[^"]+">\n',
                             "<style>\n" + blokk("../skrift/", "leksjon") + "\n</style>\n", ut)
        if antall != 1 or "ap-gradient-96.png" not in ut:
            sys.exit(f"{n}: forventet én Google-lenke og logo i kilden (fant {antall})")
        (NESTE / "leksjon" / f"{n}.html").write_text(ut, "utf-8")
    shutil.copyfile(GRAFIKK / "felles" / "sprak.js", NESTE / "leksjon" / "sprak.js")   # språk i animasjonene (#282)
    shutil.copyfile(GRAFIKK / "felles" / "takt.js", NESTE / "leksjon" / "takt.js")     # scener i takt med stemmen (#331)
    rest = [p.name for p in [idx, *(NESTE / "leksjon").glob("*.html")] if "fonts.g" in p.read_text("utf-8")]
    if rest:
        sys.exit(f"Google-skrift står igjen i: {rest}")
    print("index.html og", len(LEKSJONER), "leksjoner skrevet, 0 Google-referanser")


if __name__ == "__main__":
    main()
