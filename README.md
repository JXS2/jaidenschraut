# jaidenschraut

Personal website for Jaiden Schraut. Next.js (App Router, TypeScript), deployed on Vercel.

A single static page in a dense, index-forward layout: header, the work index, the publications
index, a compact "Currently" plate, an "Off the clock" photo mosaic, footer links.
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
| `app/page.module.css` | Section-by-section layout |
| `public/photos/` | Placeholder art for the nine photo slots |
| `scripts/generate-placeholders.mjs` | Regenerates that placeholder art |

Fonts are Instrument Serif (400) for display, IBM Plex Sans (400/500) for body, and IBM Plex Mono
(400/500) for the small meta lines (section counts, years, artifact links), all self-hosted
through `next/font/google` so there is no layout shift.

The layout is one 1040px column at fixed type sizes, with a single `@media (max-width: 680px)`
breakpoint that tightens the page padding, stacks the header, and drops the row year beneath the
row body. Density comes from one shared `--section-gap`; change it there, not per section.

Content lives in constants at the top of `app/page.tsx`: `PROJECTS`, `PUBLICATIONS`, `GALLERY`,
and `HEADER_META`. Adding an entry to any of them needs no layout change, and the section counts
follow automatically.

## Still needs real values

- **Every photo.** All nine files in `public/photos/` are neutral placeholders on the design's
  placeholder ground: the portrait, the two project thumbnails, and the six gallery tiles. They
  sit in boxes fixed by CSS, so replacing a file (or pointing its `src` at a real WebP/AVIF)
  needs no layout change. Export at 2x the CSS box; `scripts/generate-placeholders.mjs` lists
  every slot's size.
- **The one publication.** The single entry in `PUBLICATIONS` is a placeholder and needs a real
  `title`, `venue`, `year`, and `url`. An entry whose `url` is `""` renders as plain text rather
  than a link, so a publication without a public link still reads correctly.
- **`HEADER_META`.** "SF / remote" and "Open to roles" came over from the approved mockup and are
  not yet confirmed. They are claims about Jaiden, so they need a yes before they go live.

Once real photos land, the three `images` lines in `next.config.ts` that allow SVG can go.

Both projects link only to their live site (`theslash.app`, `rent-a-rower.com`); both repositories
are private, so neither row carries a repository link.
