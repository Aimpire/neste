#!/bin/sh
# #291: lokal server som speiler Pages-layout: hub i rot, nesté under /neste/ny/
set -e
QA="$(cd "$(dirname "$0")" && pwd)"
NESTE="$(cd "$QA/../.." && pwd)"
ROOT="${TMPDIR:-/tmp}/aimpire-pwa-qa.$$"
PORT="${PORT:-8791}"
UT="$QA/ut-pwa"
mkdir -p "$ROOT/neste/ny" "$ROOT/asma" "$UT"
# Fake hub-forside (skal ALDRI erstattes av nesté-SW)
printf '%s\n' '<!doctype html><title>hub</title><body>HUB-ROOT</body>' > "$ROOT/index.html"
printf '%s\n' '<!doctype html><title>asma</title><body>NAMELINK-ASMA</body>' > "$ROOT/asma/index.html"
cp -R "$NESTE/." "$ROOT/neste/ny/"
rm -rf "$ROOT/neste/ny/tools/qa/node_modules" 2>/dev/null || true
# Samme BUILD-stempling som forhandsvisning (#291/#258) — placeholder må bli innholdshash før SW installeres.
python3 "$NESTE/tools/stamp-sw-build.py" "$ROOT/neste/ny"

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "STOPP: port $PORT opptatt"; exit 1
fi
( cd "$ROOT" && exec python3 -m http.server "$PORT" >/dev/null 2>&1 ) & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -rf "$ROOT"' EXIT
sleep 1
echo "== pwa-offline (BASE=http://127.0.0.1:$PORT)"
( cd "$QA" && node pwa-offline.js "$UT" "http://127.0.0.1:$PORT" )
echo "== pwa-treg-leksjon (iframe på tregt nett med SW aktiv)"
( cd "$QA" && node pwa-treg-leksjon.js "$UT" "$ROOT" )
echo "skjermbilder: $UT"
