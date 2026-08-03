# jaidenschraut

Personal website for Jaiden Schraut. Next.js (App Router, TypeScript), deployed on Vercel.

A single static page in five sections: header, projects, currently, off the clock, footer links.
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
| `app/layout.tsx` | Document shell, metadata, and the two `next/font/google` families |
| `app/page.tsx` | The whole page, plus the copy and link constants |
| `app/globals.css` | Design tokens as `:root` custom properties, plus base and link styles |
| `app/page.module.css` | Section-by-section layout |
| `public/photos/` | Placeholder art for the six photo slots |
| `scripts/generate-placeholders.mjs` | Regenerates that placeholder art |

Fonts are Instrument Serif (400) for display and IBM Plex Sans (400/500) for body, both
self-hosted through `next/font/google` so there is no layout shift.

Layout is a single fluid column with no media queries: `clamp()` carries the type and spacing
scale, and the project and photo grids reflow via `auto-fit`.

## Still needs real values

- `GITHUB_URL` in `app/page.tsx` is the `https://github.com/` placeholder.
- `LINKEDIN_URL` in `app/page.tsx` is the `https://www.linkedin.com/` placeholder.
- `RENT_A_ROWER_URL` in `app/page.tsx` points at the GitHub placeholder; rent-a-rower has no
  live URL yet.
- All six photos in `public/photos/` are neutral placeholders on the design's placeholder ground.
  They sit in boxes fixed by CSS, so replacing a file (or pointing its `src` at a real WebP/AVIF)
  needs no layout change. Export at 2x the CSS box.

Once real photos land, the three `images` lines in `next.config.ts` that allow SVG can go.
