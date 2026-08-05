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

The **JXS monogram** is the one element `dense-variant.html` does not carry. It is specified
inline in the airy `Jaiden Schraut v2.dc.html`, where its box and type are the binding values:
J and S in `--ink`, only the X in `--accent`. It now exists in two variants that must stay in
step — the light header tile in `app/page.module.css` (card ground, hairline, plate radius) and
the inverted tab tile in `app/icon.svg` (accent ground, cream letters, mint `#79e0c2` X, because
a hairline on cream vanishes at 16px).
The inverted tile has to carry "only the X in the accent" without the accent, which is already
its ground, so there the X takes the brightest note instead: a mint far enough from the cream in
both hue and value that at 16px it reads as the letter picked out, not the letter that faded.

## Sharp edges

- The global `a:focus-visible` rule sets `border-radius: 3px` so the focus ring hugs inline links.
  Any link that has its own radius (footer links) must restate it in a `:focus-visible` rule or
  the ring will square it off. See `app/page.module.css`.
- Footer links carry `min-height: 44px` purely to reach the spec's minimum touch height. This is
  the one place the render intentionally differs from the prototype (~40px there).
- A project row's 64px box has two treatments, picked on `thumb.kind` in `app/page.tsx`:
  `.rowThumbImage` (real art, edge to edge, no ground so an icon's own corners stay clean) and
  `.rowThumbMark` (a mark that brings no ground of its own, drawn or published on transparency,
  inset on the card ground with a hairline border). The narrow breakpoint's padding tweak belongs
  to the mark variant only.
- A project row's title link is stretched over the whole row with `::after { inset: 0 }`, so the
  hover ground and the click target are one shape. Anything else clickable in a row needs
  `position: relative; z-index: 1` (see `.rowLink`) or the overlay swallows it.
- `--font-ibm-plex-mono` sets `adjustFontFallback: false`. The Google latin subset has no arrows
  block, so the "live →" glyph always comes from the fallback, and the metric-adjusted fallback
  stretched it. Keep the plain system-mono fallback unless that glyph goes away.
- `next.config.ts` carries no `images` config, and none is needed for the SVG slots
  (`public/thumbs/michigan-m.svg`, `lovelytics.svg`, `databricks.svg`): Next 16 skips the optimizer
  for a `src` ending in `.svg`, so they are served straight from `public/` and `dangerouslyAllowSVG`
  stays off. Check the network panel: an SVG that goes through `/_next/image` is the signal that
  something re-enabled it.
- The gallery leaves cells of the bottom row empty at desktop width, and does so at whatever tile
  count it currently holds. That is the handoff's own arrangement and CSS, not a regression; do
  not "fix" the mosaic. Jaiden adds and removes tiles as photos arrive. The track list is
  `auto-fit`, so unused tracks collapse and whatever tiles remain stretch across the row: at one
  tile the mosaic is a single full-width tile, still the CSS working as written.
- A `fit` tile in the gallery (`.galleryTileFit`) is the mosaic's one exception: a wide photo whose
  subject fills its frame is contained and centred on the tile ground rather than cropped by
  `cover`, and takes the tall tile's row span so its row still runs level. It drops back to one row
  at the narrow breakpoint, where a tile is already close to the photo's own proportion.
- The header meta row's company marks (`.metaMark`, from a `HEADER_META` entry's `marks`) are the
  one place a mark on transparency goes without the index tile's ground and hairline: at 16px a
  plate reads as noise around the mark rather than as a frame for it. 16px is also the floor at
  which the Databricks mark's own hairlines still read as bricks, and it is the ceiling the 18px
  line box sets, so the header keeps its height either way. Marks are height-matched, not boxed —
  the two have different proportions, and equal heights are what make them sit level on the line.
- A publication row is one link over the whole citation, thumbnail included, rather than a row
  with a stretched link inside it the way a project row is. So its tile art is decorative
  (`alt=""`): anything else there is read out ahead of the title that names the entry.
- The education index (`.eduRow`) has the same three-column shape as the two above it, so a new
  school needs a mark for its 64px tile: an empty box reads as a thumbnail that failed to load.
  `logo.kind` picks the treatment: `image` for a mark that brings its own ground (Michigan's
  block M is drawn at `public/thumbs/michigan-m.svg`), `mark` for one published on transparency,
  which needs the tile's.
- `.rowThumbPlate` is the third tile treatment, for real art that cannot fill the square, such as
  the publication's wide figure. It keeps `.rowThumb`'s size and framing and swaps the placeholder
  ground for paper white, so a fitted (not cropped) figure still reads as one filled tile.
- Next's image optimizer caches by `url + w + q` in `.next/cache/images`, and the browser caches
  the same URL for a year. Editing a file in `public/` without renaming it keeps serving the old
  bytes locally long after the source changed — `rm -rf .next` and use a fresh browser profile
  before concluding an asset renders wrong.
- The page carries no client component and no interactive state: every file under `app/` is a
  server component. The résumé pop-up was the one exception and has been removed, so a
  `"use client"` anywhere is a deliberate addition, not the house style.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
