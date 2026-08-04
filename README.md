# jaidenschraut

Personal website for Jaiden Schraut. Next.js (App Router, TypeScript), deployed on Vercel.

A single static page in a dense, index-forward layout: header, the personal-projects index, the
publications index, the education index, an "Off the clock" photo mosaic, footer links.
No backend, no CMS, no client state.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (prerenders / as static content)
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Structure

| Path | What it holds |
| --- | --- |
| `app/layout.tsx` | Document shell, metadata, and the three `next/font/google` families |
| `app/page.tsx` | The whole page, plus the copy, link, and index constants |
| `app/globals.css` | Design tokens as `:root` custom properties, plus base and link styles |
| `app/icon.svg` | The JXS monogram as the favicon, picked up by App Router convention |
| `app/page.module.css` | Section-by-section layout |
| `app/resume-dialog.tsx` | The résumé pop-up — the page's only client component |
| `app/oar-mark.tsx` | A drawn oar, kept as the inset-mark thumbnail variant; no row uses it |
| `public/` | `portrait.jpg`, `resume.pdf`, `gallery/`, `thumbs/`, `publications/` — the real assets |

Fonts are Instrument Serif (400) for display, IBM Plex Sans (400/500) for body, and IBM Plex Mono
(400/500) for the small meta lines (section counts, years, artifact links), all self-hosted
through `next/font/google` so there is no layout shift.

The layout is one 1040px column at fixed type sizes, with a single `@media (max-width: 680px)`
breakpoint that tightens the page padding, stacks the header, and drops the row year beneath the
row body. Density comes from one shared `--section-gap`; change it there, not per section.

Content lives in constants at the top of `app/page.tsx`: `PROJECTS`, `PUBLICATIONS`, `EDUCATION`,
`GALLERY`, and `HEADER_META`. Adding an entry to any of them needs no layout change, and the
section counts follow automatically.

The education index carries only what `public/resume.pdf` states — institution, credential,
place, and a date where the résumé gives one. It is the one index with no 64px tile: a school has
no artwork, and an empty box would read as a thumbnail that failed to load.

## The résumé pop-up

The footer's "Résumé" button opens `public/resume.pdf` in a modal rather than downloading it or
leaving the page. `app/resume-dialog.tsx` is the page's only client component and its only
interactive state.

It is built on the native `<dialog>` in modal mode, which supplies the focus trap, the Escape
key, the inert page behind it, and focus restored to the trigger. What the component adds is the
rest: closing on a backdrop click (guarded so a drag that starts inside the panel doesn't count),
a body scroll lock, and mounting the `<iframe>` only while the modal is open so a visitor who
never asks for the résumé never fetches it. A plain "Download PDF" link sits in the modal's
footer for browsers that won't preview a PDF inline.

Replacing the résumé is a matter of overwriting `public/resume.pdf`.

## The photo slots

Every slot now holds a real photo: the portrait, both project thumbnails, the publication figure,
and all three gallery tiles. Each sits in a box fixed by CSS, so a new photo needs no layout
change — add it under `public/gallery/`, export at roughly 2x the CSS box, and point a `GALLERY`
entry at it. Jaiden adds and removes tiles as photos arrive.

Both project thumbnails are the projects' own logos rather than screenshots — neither site says
anything legible at 64px. Slash uses its app icon from `theslash.app`; rent-a-rower uses the oar
mark it serves at `rent-a-rower.com/logo.png`. A `thumb` of `kind: "image"` fills its box edge to
edge; `app/oar-mark.tsx` is the drawn fallback that the inset treatment still exists for, and no
row uses it now.

The publications entry carries Fig. 1 of the paper itself, at
`public/publications/unet-architecture.png`, in the same 64px tile the project rows use. The
paper is Jaiden's own and open access under CC BY 4.0, so reusing its artwork is fine. A figure
is wide rather than square, so it is fitted into the tile rather than cropped to fill it.

Both projects link only to their live site (`theslash.app`, `rent-a-rower.com`); both repositories
are private, so neither row carries a repository link.
