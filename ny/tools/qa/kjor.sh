#!/bin/sh
# QA for det nye skallet (#259): grunnflyt, uke 2 + markedet nå, verktøy, vekt. Playwright fra hub/tools/qa.
# Bruk: tools/qa/kjor.sh [base-url]   (uten argument: starter en lokal server på 40-community/ og tester /neste/)
set -e
HER="$(cd "$(dirname "$0")" && pwd)"; ROT="$(cd "$HER/../../.." && pwd)"   # 40-community
UT="${TMPDIR:-/tmp}/neste-qa.$$"; mkdir -p "$UT"
BASE="$1"
if [ -z "$BASE" ]; then
  PORT=8771; (cd "$ROT" && python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &) ; sleep 1
  BASE="http://127.0.0.1:$PORT/neste/"
fi
rc=0
for t in grunn uke2-marked uke3 uke4 verktoy kalkulator ledere ledere-forhand hi-ar fagbegrep produktsprak stuck reg-gate risiko-foyer kunde-flyt spraakport-l sponsor-laas navnelenke call-oppsum lyd lyd-enheter synk gjenopprett inapp-port b055; do
  echo "== $t"; node "$HER/$t.js" "$UT" "$BASE" || rc=1
done
echo "== synk-treg (cue-tidene 4 s sene, start straks)"; SYNK_BARE=pip TREG_CUES=4000 node "$HER/synk.js" "$UT" "$BASE" ur || rc=1
echo "== vekt"; node "$HER/vekt.js" "$BASE" || rc=1
if [ -n "$PORT" ]; then P=$(lsof -ti tcp:$PORT || true); for p in $P; do kill "$p" 2>/dev/null || true; done; fi
echo "skjermbilder: $UT"; exit $rc
