# Publications

One citation, count `01`.

## Sub-features

- A single link over the whole citation (thumbnail, title, authors, venue, year) to `https://doi.org/10.1007/s44163-022-00045-1`.
- The thumbnail is decorative (`alt=""`), so the link name starts at the title.

## How to get to it (user POV)

Scroll to `heading "Publications" level="2"`.

## Driving it with chrome-devtools-axi

- `open $U`; expect one `link` whose name begins `A multi-output network with U-net` and ends `2023`.
- `verify.sh links` shows the doi.org href with `target=_blank`. Do not click through.

## Gotchas

- The wide figure is fitted on a white plate, not cropped (`.rowThumbPlate`).
