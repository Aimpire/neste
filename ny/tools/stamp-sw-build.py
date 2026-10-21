#!/usr/bin/env python3
"""Stamp BUILD in nesté sw.js = sha256(app.js + innhold.json + index.html)[:12].

Used by hub/tools/forhandsvisning.sh (preview) and neste/tools/qa/kjor-pwa.sh.
Runtime stays zero-build (B-048); only preview/QA rewrite the placeholder.
"""
from __future__ import annotations

import hashlib
import pathlib
import re
import sys


def stamp(root: pathlib.Path) -> str:
    parts = b""
    for name in ("app.js", "innhold.json", "index.html"):
        p = root / name
        if not p.is_file():
            raise SystemExit(f"mangler {p}")
        parts += p.read_bytes()
    build = hashlib.sha256(parts).hexdigest()[:12]
    sw = root / "sw.js"
    text = sw.read_text(encoding="utf-8")
    if "{{BUILD}}" in text:
        text = text.replace("{{BUILD}}", build, 1)
    else:
        text2, n = re.subn(
            r'const BUILD = "[^"]*";',
            f'const BUILD = "{build}";',
            text,
            count=1,
        )
        if n != 1:
            raise SystemExit(f"fant ikke BUILD-placeholder i {sw}")
        text = text2
    if build not in text:
        raise SystemExit("BUILD ble ikke skrevet inn i sw.js")
    sw.write_text(text, encoding="utf-8")
    return build


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("bruk: stamp-sw-build.py <neste-rot>")
    print(stamp(pathlib.Path(sys.argv[1])))
