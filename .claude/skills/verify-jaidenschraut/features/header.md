# Header

The top of the page: JXS monogram (decorative), `h1` name, intro line, a meta row, and the portrait.

## Sub-features

- `h1` `Jaiden Xuan Schraut` and the intro line.
- Meta row: `Chicago`, then `Currently — Lovelytics` with the Lovelytics mark (decorative) and the Databricks mark (`image "a Databricks company"`).
- Portrait, `image "Portrait of Jaiden Xuan Schraut"`. At phone width it drops below the meta row.

## How to get to it (user POV)

Open `/`; it is the first screen.

## Driving it with chrome-devtools-axi

- `open $U`; expect `heading "Jaiden Xuan Schraut" level="1"` inside `banner`.
- Expect the two marks and the portrait to load: `brokenImages` is 0 in the `eval` from SKILL.md.
- Screenshot at both widths; the meta row must stay on one line at 390px.

## Gotchas

- Marks are height-matched at 16px on purpose (CLAUDE.md); do not judge them as boxed tiles.
