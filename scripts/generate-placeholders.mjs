/**
 * Regenerates the neutral placeholder art in `public/photos`.
 *
 * These stand in for the real photos Jaiden will supply. They use the design's
 * placeholder ground (`--placeholder-ground`) and match the CSS box of each
 * slot at 2x, so dropping in real photos later needs no layout change.
 *
 * Run with: node scripts/generate-placeholders.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const GROUND = "#efebe2";
const LABEL = "#b3aa98";

/**
 * Each entry is 2x the CSS box of its slot. Only the gallery tiles Jaiden has
 * not supplied a photo for are still listed: the portrait, both project
 * thumbnails, and two of the four tiles now carry real art.
 */
const slots = [
  { file: "life-kyoto.svg", width: 360, height: 240, label: "travel — kyoto" },
  { file: "life-alps.svg", width: 360, height: 496, label: "travel — alps" },
];

/**
 * The label is centred rather than tucked into a corner. Every slot is
 * `object-fit: cover`, so a slot whose box is a different shape from its file
 * crops symmetrically from the edges; a centred label survives that, a corner
 * one gets sliced off at narrow widths.
 */
const svg = ({ width, height, label, fontSize = 20 }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="presentation">
  <rect width="${width}" height="${height}" fill="${GROUND}"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="${LABEL}" font-family="'IBM Plex Mono', ui-monospace, monospace" font-size="${fontSize}" letter-spacing="${(fontSize * 0.08).toFixed(1)}">${label.toUpperCase()}</text>
</svg>
`;

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "photos");
await mkdir(outDir, { recursive: true });
await Promise.all(slots.map((slot) => writeFile(join(outDir, slot.file), svg(slot))));
console.log(`Wrote ${slots.length} placeholders to ${outDir}`);
