#!/bin/sh
# Standalone navnelenke-QA (rører ikke kjor.sh — låst i åpne QA-PR-er).
# Bruk: tools/qa/kjor-navnelenke.sh [base-url]
set -e
HER="$(cd "$(dirname "$0")" && pwd)"; ROT="$(cd "$HER/../../.." && pwd)"
UT="${TMPDIR:-/tmp}/neste-navnelenke-qa.$$"; mkdir -p "$UT"
BASE="$1"
if [ -z "$BASE" ]; then
  PORT=8773; (cd "$ROT" && python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &) ; sleep 1
  BASE="http://127.0.0.1:$PORT/neste/"
fi
rc=0
echo "== navnelenke"; node "$HER/navnelenke.js" "$UT" "$BASE" || rc=1
if [ -n "$PORT" ]; then P=$(lsof -ti tcp:$PORT || true); for p in $P; do kill "$p" 2>/dev/null || true; done; fi
echo "skjermbilder: $UT"; exit $rc
