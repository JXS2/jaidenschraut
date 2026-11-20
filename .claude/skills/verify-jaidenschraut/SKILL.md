---
name: verify-jaidenschraut
description: Launch the real jaidenschraut personal site (one static Next.js page) with the dev server, drive it at desktop and phone widths with chrome-devtools-axi, check every outbound link target, and capture full-page screenshots as proof. Use when you need to show a change to the site works in the running page rather than only in lint, or when asked to verify, demo or screenshot the site.
---

# Verify jaidenschraut

The site is one server-rendered page (`app/page.tsx`) on Next.js. There is no database, API, auth or env file, so nothing to seed or migrate.
Feature recipes live in [`features/`](features/README.md); read the matching one before driving.
One helper does launch, doctor, links and cleanup: `.claude/skills/verify-jaidenschraut/scripts/verify.sh` (run from anywhere; run it with no argument for usage).

**Never request the external links** (theslash.app, the Rent-a-Rower demo, doi.org, GitHub, LinkedIn). Check their `href`s as rendered; the demo is a production URL.

## Launch

```bash
export VERIFY_STATE=/path/outside/repo/state     # scratch: port, pgid, dev.log
export VERIFY_EVIDENCE=/path/outside/repo/evidence/$(date -u +%Y%m%dT%H%M%SZ)   # proof; cleanup never touches it
export CHROME_DEVTOOLS_AXI_SESSION=verify-jxs    # a browser of our own
.claude/skills/verify-jaidenschraut/scripts/verify.sh launch
```

`launch` runs `npm ci` only if `node_modules/next` is missing, asks the kernel for a free port (override with `VERIFY_PORT`), starts `npm run dev -- --port <port> --hostname 127.0.0.1` in its own process group, and saves the port and pgid in `$VERIFY_STATE`.
**Ready** means `GET /` contains `Personal projects`, not just that the port answers. It prints `✅ ready: http://127.0.0.1:<port>/`; the first compile takes a few seconds.
It refuses to start if a run is already recorded in `$VERIFY_STATE`; run `cleanup` first.

## Doctor

```bash
.claude/skills/verify-jaidenschraut/scripts/verify.sh doctor
```

Read-only; every line must be ✅ before you drive: the port's listener is our process group, its cwd is this worktree (a stale server from another checkout fails here), and the home page renders the name and `Personal projects`.

## Drive

Use `chrome-devtools-axi`. Set the viewport with `emulate --viewport`; `resize` fails on a real window.

```bash
U=http://127.0.0.1:$(cat $VERIFY_STATE/port)/
chrome-devtools-axi emulate --viewport "1280x800x1"                 # desktop
chrome-devtools-axi emulate --viewport "390x844x3,mobile,touch"     # phone
chrome-devtools-axi open $U        # prints the accessibility snapshot: headings, links, images
chrome-devtools-axi eval "() => ({innerWidth, scrollWidth: document.documentElement.scrollWidth, brokenImages: [...document.images].filter(i=>!i.complete||!i.naturalWidth).length})"
chrome-devtools-axi console        # expect no [error]
```

Stable handles are the three `heading level=2` (`Personal projects`, `Publications`, `Education`), the `h1`, and link names. Page sections: header, projects, publications, education, gallery, footer; one feature file each.

## Evidence

Per width, into `$VERIFY_EVIDENCE`: `chrome-devtools-axi screenshot "$VERIFY_EVIDENCE/<desktop|phone>-full.png" --full-page`, plus a `run.log` holding the `eval` results, console warnings/errors and `verify.sh links` output.
Proof standard: the real rendered page at both widths; no horizontal overflow (`scrollWidth == innerWidth`), no broken images, link targets read from the rendered DOM. Look at the screenshots, don't just save them.
The Next dev-tools "N" badge appears in dev screenshots; it is not part of the site.

## Cleanup

```bash
chrome-devtools-axi stop
.claude/skills/verify-jaidenschraut/scripts/verify.sh cleanup
```

`cleanup` sends TERM (then KILL) to the recorded process group only, never by name, then removes `$VERIFY_STATE`'s pid/port files and the worktree's `.next/` (gitignored dev cache, and a stale one serves old assets, see CLAUDE.md). Evidence lives outside `$VERIFY_STATE` and survives; `ls "$VERIFY_EVIDENCE"` after to confirm.

## Helpers

`scripts/verify.sh launch | doctor | links | cleanup`. `links` prints each rendered `<a>` href with its `target`/`rel`, without any network request.
Isolation: the port is random, so another instance can run beside it; each needs its own `VERIFY_STATE`.
