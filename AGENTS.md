# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

## What this project is

A single static page (Next.js App Router, TypeScript) recreating a finished high-fidelity design.
`README.md` covers scripts, structure, and the outstanding placeholder values.

## The design handoff is the source of truth

The page is a **recreation, not a redesign**. Colors, typography, spacing, radii, and hover states
are final and were specified externally; do not "improve" copy or layout without Jaiden asking.

The handoff bundle lives outside the repo (it is deliberately not committed) at
`/Users/jxschraut/firstmate/data/jaidenschraut-handoff/` — `README.md` there is the binding spec
and `Jaiden Schraut v2.dc.html` is the light-theme visual reference. The `.dc.html` files are
prototypes wrapped by `support.js` / `image-slot.js`; never copy those into production.
`Jaiden Schraut.dc.html` is an earlier dark version and is not implemented.

Every token from that spec lives as a `:root` custom property in `app/globals.css`. Change values
there, not inline.

One section is not in that spec: **Publications**, added later at Jaiden's request and built only
from existing tokens. Treat it like the handed-off sections and extend it in the same language
rather than inventing new values.

## Sharp edges

- The global `a:focus-visible` rule sets `border-radius: 3px` so the focus ring hugs inline links.
  Any link that has its own radius (project cards, footer links) must restate it in a
  `:focus-visible` rule or the ring will square it off. See `app/page.module.css`.
- Footer links use `line-height: 1.6` with `display: inline-flex` purely to reach the spec's
  44px minimum touch height. This is the one place the render intentionally differs from the
  prototype (39px there).
- `next.config.ts` enables `dangerouslyAllowSVG` only because the six photo slots currently hold
  locally authored SVG placeholders. Remove it once real photos land.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
