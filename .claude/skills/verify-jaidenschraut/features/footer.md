# Footer links

Three pill links under the page.

## Sub-features

- `link "GitHub"` to `https://github.com/JXS2`, `link "LinkedIn"` to `https://www.linkedin.com/in/jxschraut/`; both `target=_blank` `rel=noopener`.
- `link "x.schraut@gmail.com"` to `mailto:x.schraut@gmail.com`.
- Each is at least 44px tall.

## How to get to it (user POV)

Scroll to the bottom.

## Driving it with chrome-devtools-axi

- `open $U`; expect the three links under `contentinfo`.
- `eval "() => [...document.querySelectorAll('footer a')].map(a=>Math.round(a.getBoundingClientRect().height))"` returns `[44,44,44]` at both widths.
- `verify.sh links` for the hrefs. Do not click the mailto.

## Gotchas

- At phone width the email wraps to its own line; that is expected.
- A footer link's own radius must be restated in `:focus-visible` (CLAUDE.md).
