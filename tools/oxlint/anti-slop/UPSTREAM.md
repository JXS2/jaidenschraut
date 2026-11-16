# Upstream

Vendored from https://github.com/dmmulroy/anti-slop at revision `13909c9e07590f5a85d93c62712259fe14a883f7` (package version 0.1.2), MIT licence (see `LICENSE`).

Copied from upstream `src/`: `index.ts`, `rules/`, `shared/`, `vendor/`.
Left out on purpose: `effect/` (this site does not use Effect) and the `*.test.ts` files (they need `tsx`, which this repo does not install).
`vendor/eslint-stylistic/UPSTREAM.md` is upstream's own record for that nested copy.
The files are otherwise unmodified; `tsconfig.json` excludes `tools` because they import with `.ts` extensions, and Oxlint loads them directly.

Oxlint and `@oxlint/plugins` are pinned to the same exact version (1.93.0); bump them together.

## Rule measurement

Measured with every generic rule at `error` over the whole repo (`oxlint .`, 6 linted files: `app/`, `next.config.ts`, `oxlint.config.ts`).

| Rule | Status | Hits |
| --- | --- | --- |
| `oxc/no-accumulating-spread` (native) | enabled | 0 |
| `anti-slop/no-array-filter-map` | enabled | 0 |
| `anti-slop/no-reduce-accumulator-copy` | enabled | 0 |
| `anti-slop/no-chained-type-assertions` | enabled | 0 |
| `anti-slop/no-conditional-empty-object-spread` | enabled | 0 |
| `anti-slop/no-known-value-widening` | enabled | 0 |
| `anti-slop/no-module-mocking` | enabled | 0 |
| `anti-slop/no-object-parameters` | enabled | 0 |
| `anti-slop/no-reflect-apply` | enabled | 0 |
| `anti-slop/no-reflect-get` | enabled | 0 |
| `anti-slop/no-runtime-typeof` | enabled | 0 |
| `anti-slop/no-shape-in-symbol-names` | enabled | 0 |
| `anti-slop/no-unknown-parameters` | enabled | 0 |
| `anti-slop/no-unknown-returns` | enabled | 0 |
| `anti-slop/no-unknown-type-aliases` | enabled | 0 |
| `anti-slop/no-unsafe-dictionary-type` | enabled | 0 |
| `anti-slop/no-widen-then-assert` | enabled | 0 |
| `anti-slop/require-readable-spacing` | enabled | 0 |
| `anti-slop/require-safety-comment-for-type-assertion` | enabled | 0 |

Every generic rule has zero hits, so all are enabled and none are deferred.
The site is small, so zero hits is weak evidence for a rule that only matters in larger code; revisit counts when code grows.
Rules were confirmed live by a throwaway file that tripped `no-unknown-parameters`, `no-chained-type-assertions`, `require-safety-comment-for-type-assertion` and `no-array-filter-map`.
