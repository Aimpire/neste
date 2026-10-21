#!/bin/sh
# QA for #249 Nesté call-flyer (shareable card). Bruk: tools/qa/kjor-flyer.sh [base-url]
set -e
HER="$(cd "$(dirname "$0")" && pwd)"; ROT="$(cd "$HER/../../.." && pwd)"
UT="${TMPDIR:-/tmp}/neste-flyer-qa.$$"; mkdir -p "$UT"
BASE="$1"
if [ -z "$BASE" ]; then
  PORT=8772; (cd "$ROT" && python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &) ; sleep 1
  BASE="http://127.0.0.1:$PORT/neste/"
fi
echo "== call-flyer"; node "$HER/call-flyer.js" "$UT" "$BASE"
rc=$?
if [ -n "$PORT" ]; then P=$(lsof -ti tcp:$PORT || true); for p in $P; do kill "$p" 2>/dev/null || true; done; fi
echo "skjermbilder: $UT"; exit $rc
