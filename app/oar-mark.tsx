/**
 * An oar, drawn rather than photographed: rent-a-rower has no screenshot worth
 * a 64px box, so its row carries a mark instead.
 *
 * One oar and not the heraldic crossed pair: at this size two crossing shafts
 * with blades near the crossing point read as a pair of scissors, and no
 * amount of blade shaping fixed it. Strokes only, in `currentColor`, so the
 * thumbnail's CSS sets the colour and the mark scales to whatever box it is
 * given. Swapping it for real art later means changing that row's `thumb` to
 * `{ kind: "image", ... }` in `page.tsx`; nothing else references this file.
 */
const TILT = 32;

export default function OarMark({ className, label }: { className?: string; label: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={label}>
      <g
        transform={`rotate(${TILT} 24 24)`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* A hatchet blade: long and barely rounded. A stadium shape here reads
            as a spoon. */}
        <rect x="19" y="3.5" width="10" height="14" rx="2.5" />
        <path d="M24 17.5v27" />
        {/* The collar, where the oar meets the rigger — the one detail that
            separates an oar from a spatula. */}
        <path d="M21 24h6" />
      </g>
    </svg>
  );
}
