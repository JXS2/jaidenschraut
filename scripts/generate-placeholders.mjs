/**
 * Regenerates the neutral placeholder art in `public/photos`.
 *
 * These stand in for the six real photos Jaiden will supply. They use the
 * design's placeholder ground (`#efebe2`) and match the CSS box of each slot at
 * 2x, so dropping in real photos later needs no layout change.
 *
 * Run with: node scripts/generate-placeholders.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const GROUND = "#efebe2";
const LABEL = "#a29a8b";

/** Each entry is 2x the maximum CSS box of its slot. */
const slots = [
  { file: "portrait.svg", width: 496, height: 600, label: "portrait" },
  { file: "slash.svg", width: 900, height: 344, label: "slash screenshot" },
  { file: "rent-a-rower.svg", width: 900, height: 344, label: "rent-a-rower screenshot" },
  { file: "life-rowing.svg", width: 600, height: 400, label: "rowing" },
  { file: "life-travel.svg", width: 600, height: 400, label: "travel" },
  { file: "life-tea.svg", width: 600, height: 400, label: "tea" },
];

const svg = ({ width, height, label }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="presentation">
  <rect width="${width}" height="${height}" fill="${GROUND}"/>
  <text x="50%" y="50%" fill="${LABEL}" font-family="'IBM Plex Sans', system-ui, sans-serif" font-size="22" letter-spacing="2.6" text-anchor="middle" dominant-baseline="middle">${label.toUpperCase()}</text>
</svg>
`;

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "photos");
await mkdir(outDir, { recursive: true });
await Promise.all(slots.map((slot) => writeFile(join(outDir, slot.file), svg(slot))));
console.log(`Wrote ${slots.length} placeholders to ${outDir}`);
