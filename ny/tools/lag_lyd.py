#!/usr/bin/env python3
"""Leksjonslyd for det nye skallet (#259, #282, #331): én MP3 per leksjon PER SPRÅK, fra manus i tools/lydmanus.json.

Founder 20.10 20:02: lyden skal matche appens språk, høres menneskelig ut, og «si mer enn det som står der».
Founder 20.10 20:28: «samme rolige og komfortable stemme som på norsk i urdu også».
  Målt (pip): norsk 34 % ro, snittpause 0,75 s · urdu i ett stykke bare 26 % ro – setningene kom tett.
  Derfor syntetiseres urdu setning for setning med adaptiv ro mellom (0,18–0,6 s, regnet ut per spor mot 33 % ro)
  og litt dypere tone (−2 Hz): samme rytme som den norske. Norsk og engelsk lages i ett stykke per scene.
  Alle spor normaliseres til −19 LUFS så det ikke hopper i lydstyrke mellom språk.
Founder 20.10 23:34: «stemmene må matche video … de må snakke i lag». Leksjoner med animasjon har manus som
  LISTE av scener; generatoren kjenner varigheten av hver bit og skriver cue-tider per scene til lyd/<id>-<sp>.cues.json
  ({"scener":[t0,t1,…],"slutt":T}). Animasjonen (grafikk/felles/takt.js) starter hver scene når stemmen er der.
Stemmer: Microsofts nevrale via edge-tts (gratis, ingen konto).

Kjør fra 40-community/neste:
    python3 tools/lag_lyd.py                    # alle leksjoner, alle språk i manuset
    python3 tools/lag_lyd.py pip lot            # bare noen leksjoner
    python3 tools/lag_lyd.py --sprak ur         # bare noen språk
    python3 tools/lag_lyd.py --normaliser       # bare lydstyrke på filene som ligger der (ingen ny tale)
    python3 tools/lag_lyd.py --uten-innhold     # ikke rør innhold.json
Skriptet oppdaterer lyd-blokka i innhold.json (spor per språk = filene som faktisk ligger i lyd/).
Founder er morsmålssjekken for urdu før medlemmer får lyden. Appen laster lyd først ved trykk (preload=none)."""
import json, pathlib, re, subprocess, sys, tempfile, time

ROT = pathlib.Path(__file__).resolve().parent.parent
# språk: (stemme, tempo, tone, setningsvis)
STEMMER = {
    "ur": ("ur-PK-AsadNeural", "-8%", "-2Hz", True),
    "no": ("nb-NO-FinnNeural", "-4%", "+0Hz", False),
    "en": ("en-US-AndrewNeural", "-4%", "+0Hz", False),
}
LUFS = "-19"
RO_MAAL = 0.33            # andel ro i sporet; norsk referanse målt til 34 % (pip, 20.10)
PAUSE_MIN, PAUSE_MAKS = 0.18, 0.6
SCENEPAUSE = 0.45         # ekstra ro mellom scener (bildet skifter)
SETNING = re.compile(r"(?<=[۔؟:.!?])\s+")

def tts(tekst, ut, stemme, rate, pitch):
    r = None
    for forsok in range(3):
        r = subprocess.run(["uvx", "--python", "3.13", "edge-tts", "--voice", stemme, f"--rate={rate}", f"--pitch={pitch}",
                            "--text", tekst, "--write-media", str(ut)], capture_output=True, text=True, timeout=180)
        if r.returncode == 0 and ut.exists() and ut.stat().st_size > 2_000:
            return
        time.sleep(15)
    raise RuntimeError((r.stderr.strip()[-120:] if r else "") or "tom fil")

def ffmpeg(*a):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *a], check=True)

def varighet(fil):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(fil)],
                       capture_output=True, text=True)
    return float(r.stdout.strip())

def maal_ro(fil):
    """(varighet, sekunder ro) – samme mål som referansen: silencedetect −35 dB, ≥0,15 s."""
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(fil), "-af", "silencedetect=noise=-35dB:d=0.15", "-f", "null", "-"],
                       capture_output=True, text=True)
    D = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r.stderr); D = int(D.group(1)) * 3600 + int(D.group(2)) * 60 + float(D.group(3))
    S = sum(float(x) for x in re.findall(r"silence_duration: ([\d.]+)", r.stderr))
    return D, S

def normaliser(inn, ut):
    ffmpeg("-i", str(inn), "-af", f"loudnorm=I={LUFS}:TP=-2:LRA=7", "-ar", "24000", "-ac", "1", "-b:a", "48k", str(ut))

def stille(d, sek):
    f = d / f"stille-{sek:.2f}.mp3"
    if not f.exists():
        ffmpeg("-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", f"{sek:.2f}", "-q:a", "9", str(f))
    return f

def lag(manus, ut, stemme, rate, pitch, setningsvis):
    """manus: streng (ett spor uten cues) eller liste av scener (cues per scene). Returnerer cues eller None."""
    scener = manus if isinstance(manus, list) else [manus]
    with tempfile.TemporaryDirectory() as d:
        d = pathlib.Path(d)
        biter = []   # (fil, sceneindeks)
        for k, scene in enumerate(scener):
            deler = [s.strip() for s in SETNING.split(scene) if s.strip()] if setningsvis else [scene.strip()]
            for j, tekst in enumerate(deler):
                f = d / f"b{k:02}-{j:02}.mp3"; tts(tekst, f, stemme, rate, pitch); biter.append((f, k))
        # Adaptiv pause (bare når setningsvis): mål ro uten ekstra pause, regn ut pausen som gir RO_MAAL.
        pause = PAUSE_MIN
        if setningsvis and len(biter) > 1:
            liste = d / "proeve.txt"; liste.write_text("".join(f"file '{f}'\nfile '{stille(d, 0.01)}'\n" for f, _ in biter))
            proeve = d / "proeve.mp3"; ffmpeg("-f", "concat", "-safe", "0", "-i", str(liste), "-c", "copy", str(proeve))
            D, S = maal_ro(proeve); n = len(biter)
            pause = max(PAUSE_MIN, min(PAUSE_MAKS, (RO_MAAL * D - S) / (n * (1 - RO_MAAL))))
        # Sett sammen og regn cue-tider fra de målte varighetene (ro mellom scener alltid, mellom setninger når setningsvis).
        linjer, t, cues = [], 0.0, []
        for i, (f, k) in enumerate(biter):
            if i == 0 or biter[i - 1][1] != k:
                cues.append(round(t, 2))
            linjer.append(f"file '{f}'"); t += varighet(f)
            siste = i + 1 == len(biter)
            sceneskifte = not siste and biter[i + 1][1] != k
            if sceneskifte:
                linjer.append(f"file '{stille(d, SCENEPAUSE)}'"); t += SCENEPAUSE
            elif setningsvis and not siste:
                linjer.append(f"file '{stille(d, pause)}'"); t += pause
        (d / "liste.txt").write_text("\n".join(linjer) + "\n")
        raa = d / "raa.mp3"; ffmpeg("-f", "concat", "-safe", "0", "-i", str(d / "liste.txt"), "-c", "copy", str(raa))
        normaliser(raa, ut)
        print(f"    pause {pause:.2f}s, {len(biter)} biter, {len(scener)} scener", end="")
        return {"scener": cues, "slutt": round(varighet(ut), 2)} if isinstance(manus, list) else None

def oppdater_innhold(ids):
    innhold = json.loads((ROT / "innhold.json").read_text())
    spor = {sp: [i for i in ids if (ROT / "lyd" / f"{i}-{sp}.mp3").is_file()] for sp in STEMMER}
    innhold["lyd"] = {
        "_om": "Leksjonslyd per språk: lyd/<id>-<sp>.mp3, manus i tools/lydmanus.json (mer kontekst enn skjermteksten), bygges av tools/lag_lyd.py. ur-sporet brukes for både ur og ur_rm. Urdu setningsvis med ro mellom (samme rytme som norsk), alle spor −19 LUFS. Leksjoner med animasjon har cue-tider per scene i lyd/<id>-<sp>.cues.json. Founder er morsmålssjekken for urdu.",
        "stemmer": {sp: v[0] for sp, v in STEMMER.items()},
        "spor": {k: v for k, v in spor.items() if v},
    }
    (ROT / "innhold.json").write_text(json.dumps(innhold, ensure_ascii=False, indent=2) + "\n")
    print("innhold.json: spor =", {k: len(v) for k, v in innhold["lyd"]["spor"].items()})

def main():
    argv = sys.argv[1:]
    bare_norm = "--normaliser" in argv
    uten_innhold = "--uten-innhold" in argv
    argv = [a for a in argv if a not in ("--normaliser", "--uten-innhold")]
    sprak_valg = None
    if "--sprak" in argv:
        i = argv.index("--sprak"); sprak_valg = set(argv[i + 1:]); argv = argv[:i]
    bare = set(argv)
    manus = json.loads((ROT / "tools" / "lydmanus.json").read_text())
    innhold = json.loads((ROT / "innhold.json").read_text())
    ids = [x["id"] for u in ("uke1", "uke2", "uke3", "uke4") for x in innhold.get(u, [])]
    ids += [k for k in sorted(bare) if k not in ids and k in manus]   # spor utenfor leksjonene, f.eks. call-<dato> (#337)
    (ROT / "lyd").mkdir(exist_ok=True)

    for lid in ids:
        if bare and lid not in bare:
            continue
        for sp, (stemme, rate, pitch, setningsvis) in STEMMER.items():
            if sprak_valg and sp not in sprak_valg:
                continue
            ut = ROT / "lyd" / f"{lid}-{sp}.mp3"
            t0 = time.time()
            if bare_norm:
                if not ut.is_file():
                    continue
                with tempfile.TemporaryDirectory() as d:
                    kopi = pathlib.Path(d) / "inn.mp3"; kopi.write_bytes(ut.read_bytes()); normaliser(kopi, ut)
            else:
                tekst = (manus.get(lid) or {}).get(sp)
                if not tekst:
                    continue
                cues = lag(tekst, ut, stemme, rate, pitch, setningsvis)
                cf = ROT / "lyd" / f"{lid}-{sp}.cues.json"
                if cues:
                    cf.write_text(json.dumps(cues) + "\n")
                elif cf.exists():
                    cf.unlink()
            print(f"  {lid:12} {sp} ok {ut.stat().st_size:7} B {time.time()-t0:4.1f}s")
    if not uten_innhold:
        oppdater_innhold(ids)

if __name__ == "__main__":
    main()
