#!/usr/bin/env bash
# Launch, check and stop the jaidenschraut dev server for verification.
# Usage: verify.sh launch | doctor | links | cleanup   (run from anywhere)
set -euo pipefail

REPO="$(git -C "$(dirname "${BASH_SOURCE[0]}")" rev-parse --show-toplevel)"
STATE="${VERIFY_STATE:-${TMPDIR:-/tmp}/verify-jaidenschraut-state}"   # scratch: port, pgid, dev log
mkdir -p "$STATE"
PORT_FILE="$STATE/port"
PGID_FILE="$STATE/dev.pgid"

port() { cat "$PORT_FILE" 2>/dev/null || { echo "no run recorded in $STATE; run launch" >&2; exit 1; }; }
home() { curl -fsS --max-time 10 "http://127.0.0.1:$(port)/"; }
ok()   { echo "✅ $*"; }
bad()  { echo "❌ $*"; FAILED=1; }

case "${1:-}" in
launch)
  [ -e "$PGID_FILE" ] && { echo "a run is already recorded in $STATE (pgid $(cat "$PGID_FILE")); run cleanup first" >&2; exit 1; }
  [ -d "$REPO/node_modules/next" ] || (cd "$REPO" && npm ci --no-audit --no-fund)
  # Ask the kernel for a free port rather than guessing one.
  PORT="${VERIFY_PORT:-$(node -e 'const s=require("net").createServer().listen(0,"127.0.0.1",()=>{console.log(s.address().port);s.close()})')}"
  echo "$PORT" > "$PORT_FILE"
  set -m   # job control gives the dev server its own process group, so cleanup can stop the whole tree
  (cd "$REPO" && exec npm run dev -- --port "$PORT" --hostname 127.0.0.1) > "$STATE/dev.log" 2>&1 &
  echo $! > "$PGID_FILE"
  set +m
  # Ready means the page renders its content, not just that the port answers.
  for _ in $(seq 1 60); do
    if home 2>/dev/null | grep -q 'Personal projects'; then ok "ready: http://127.0.0.1:$PORT/ (pgid $(cat "$PGID_FILE"))"; exit 0; fi
    sleep 1
  done
  echo "not ready after 60s; tail of $STATE/dev.log:" >&2; tail -20 "$STATE/dev.log" >&2; exit 1 ;;

doctor)
  FAILED=0; P="$(port)"
  PID="$(lsof -nP -iTCP:"$P" -sTCP:LISTEN -t 2>/dev/null | head -1 || true)"
  if [ -z "$PID" ]; then bad "nothing listens on $P"
  else
    PG="$(ps -o pgid= -p "$PID" | tr -d ' ')"
    [ "$PG" = "$(cat "$PGID_FILE" 2>/dev/null)" ] && ok "port $P is owned by our process group $PG" || bad "port $P is owned by pgid $PG, not ours"
    CWD="$(lsof -a -p "$PID" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')"
    [ "$CWD" = "$REPO" ] && ok "server cwd is this repo ($REPO)" || bad "server cwd is $CWD, not $REPO"
  fi
  HTML="$(home 2>/dev/null || true)"
  grep -q 'Jaiden Xuan Schraut' <<<"$HTML" && grep -q 'Personal projects' <<<"$HTML" && ok "home page renders its content" || bad "home page missing its name or the Personal projects section"
  exit "$FAILED" ;;

links)
  # Reads every href out of the rendered page; never requests an external site.
  home | grep -oE '<a [^>]*href="[^"]+"[^>]*>' | sed -E 's/^<a //; s/>$//; s/class="[^"]*" ?//' | sort -u ;;

cleanup)
  # Stops only the process group launch recorded; never by name. Evidence is not under $STATE.
  if [ -e "$PGID_FILE" ]; then
    PG="$(cat "$PGID_FILE")"
    kill -TERM -- "-$PG" 2>/dev/null || true
    for _ in $(seq 1 10); do kill -0 -- "-$PG" 2>/dev/null || break; sleep 1; done
    kill -0 -- "-$PG" 2>/dev/null && { kill -KILL -- "-$PG" 2>/dev/null || true; }
    ok "stopped process group $PG"
  else
    echo "nothing recorded to stop"
  fi
  rm -f "$PGID_FILE" "$PORT_FILE"
  rm -rf "$REPO/.next" ;;

*) sed -n '2,3p' "$0"; exit 2 ;;
esac
