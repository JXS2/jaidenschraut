# Education

Two rows, count `02`: University of Michigan (2026) and Crystal Lake Central (2022).

## Sub-features

- `heading "University of Michigan" level="3"`, Bachelor of Science, Data Science, Ann Arbor, MI; the block M tile has its own ground.
- `heading "Crystal Lake Central" level="3"`, High school, Crystal Lake, IL; the Tigers mark sits on the tile's ground.
- No links; the marks carry no alt text because the heading names the school.

## How to get to it (user POV)

Scroll to `heading "Education" level="2"`.

## Driving it with chrome-devtools-axi

- `open $U`; expect both h3s in order, then their credential, location and year text.
- Screenshot both widths; neither tile may look empty.

## Gotchas

- A new school needs a mark for its 64px tile (CLAUDE.md).
