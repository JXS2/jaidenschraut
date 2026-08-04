# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

## What this project is

A single static page (Next.js App Router, TypeScript) recreating a finished high-fidelity design.
`README.md` covers scripts, structure, and the outstanding placeholder values.

## The design handoff is the source of truth

The page is a **recreation, not a redesign**. Colors, typography, spacing, radii, and hover states
are final and were specified externally; do not "improve" copy or layout without Jaiden asking.

The handoff bundle lives outside the repo (it is deliberately not committed) at
`/Users/jxschraut/firstmate/data/jaidenschraut-handoff/`.
The binding reference is now `dense-variant.html` there: the approved **dense, index-forward**
layout that this site implements, and the file to check a spacing or type value against.
`README.md` in that bundle and `Jaiden Schraut v2.dc.html` describe the earlier airy layout that
the dense one superseded; they still define the palette and the a11y conventions, but not the
layout. The `.dc.html` files are prototypes wrapped by `support.js` / `image-slot.js`; never copy
those into production. `Jaiden Schraut.dc.html` is an earlier dark version and is not implemented.

Every token lives as a `:root` custom property in `app/globals.css`. Change values there, not
inline. **Publications** is the one section in no external spec, added at Jaiden's request; treat
it like the handed-off sections and extend it in the same language rather than inventing values.

## Sharp edges

- The global `a:focus-visible` rule sets `border-radius: 3px` so the focus ring hugs inline links.
  Any link that has its own radius (footer links) must restate it in a `:focus-visible` rule or
  the ring will square it off. See `app/page.module.css`.
- Footer links carry `min-height: 44px` purely to reach the spec's minimum touch height. This is
  the one place the render intentionally differs from the prototype (~40px there).
- A project row's title link is stretched over the whole row with `::after { inset: 0 }`, so the
  hover ground and the click target are one shape. Anything else clickable in a row needs
  `position: relative; z-index: 1` (see `.rowLink`) or the overlay swallows it.
- `--font-ibm-plex-mono` sets `adjustFontFallback: false`. The Google latin subset has no arrows
  block, so the "live →" glyph always comes from the fallback, and the metric-adjusted fallback
  stretched it. Keep the plain system-mono fallback unless that glyph goes away.
- `next.config.ts` enables `dangerouslyAllowSVG` only because the nine photo slots currently hold
  locally authored SVG placeholders. Remove it once real photos land.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
