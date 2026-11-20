# Personal projects

An index of two rows with a count of `02`.

## Sub-features

- Slash: `link "Slash"` and `link "live → theslash.app"`, both to `https://theslash.app`.
- Rent-a-Rower: `link "Rent-a-Rower"` and `link "live demo →"`, both to `https://rent-a-rower-demo.vercel.app/admin`, plus the text `demo login: admin@rent-a-rower.com / password_good`.
- Each link opens in a new tab (`target=_blank`, `rel=noopener`).

## How to get to it (user POV)

Scroll to `heading "Personal projects" level="2"`.

## Driving it with chrome-devtools-axi

- `open $U`, check the snapshot shows both links with the URLs above.
- `verify.sh links` lists the four hrefs. **Do not click through**: the demo is a production URL and the demo login is for visitors, not for this run.
- Hover a row and screenshot if checking the stretched-link hover ground.

## Gotchas

- The title link is stretched over the row with `::after`; the demo-login text must stay selectable above it (`.rowLink` rule in CLAUDE.md).
- Copy here is final; do not edit it while verifying.
