# Gallery

A bare mosaic with one photo today and no heading or count, by design (CLAUDE.md).

## Sub-features

- `image "Two rowers in a pair, blades buried, on race day"`, contained and centred on the tile ground (`fit`), not cropped.

## How to get to it (user POV)

Scroll past Education; it is the last block above the footer.

## Driving it with chrome-devtools-axi

- `open $U`; expect the image in the snapshot and `brokenImages` 0.
- Screenshot both widths.

## Gotchas

- Do not add a label to it, and do not "fix" empty cells when more tiles arrive.
- Dev mode logs a Next LCP warning for this image (`loading="eager"` suggested). It is a dev-console warning, not a failure; note it, do not fix it during verification.
