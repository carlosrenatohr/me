# Design Lab — Phase 01 visual exploration

Three standalone, hand-authored HTML concepts for the portfolio, built to be compared before any
Astro route is written. Direction C is the owner-directed refinement of A and is the one awaiting
approval. Nothing here is part of the production build; `design-lab/` is excluded
from the Astro output and is a review artifact.

## Viewing

```bash
python3 -m http.server 4322 --bind 127.0.0.1
# then open http://127.0.0.1:4322/design-lab/
```

Opening the files with `file://` also works in a normal browser; the local server exists because
the screenshot tooling blocks the `file:` protocol.

## Files

| Path | What it is |
| --- | --- |
| `a-night-ledger/index.html` | Direction A, home |
| `a-night-ledger/project.html` | Direction A, project detail |
| `a-night-ledger/styles.css` | Direction A stylesheet |
| `b-systems-blueprint/index.html` | Direction B, home |
| `b-systems-blueprint/project.html` | Direction B, project detail |
| `b-systems-blueprint/styles.css` | Direction B stylesheet |
| `c-vibrant-editorial/index.html` | Direction C, home |
| `c-vibrant-editorial/project.html` | Direction C, project detail |
| `c-vibrant-editorial/styles.css` | Direction C stylesheet |
| `evidence/*.png` | Full-page captures at 1440×900 and 390×844 |

Screenshots: `a-home`, `a-project`, `b-home`, `b-project`, `c-home`, `c-project`, each in
`-desktop` and `-mobile`.

Appending `?static` to a Direction A or C page disables its entrance animation so captures do not
land mid-transition. Direction B has no entrance animation, so it needs no flag.

## Ground rules these concepts follow

- Dark only, deep navy family, no light surfaces.
- No purple gradients, neon, sage-green palette, rounded-card grids, or decorative motion.
- The same copy in both directions, so the comparison is structural rather than editorial.
- Placeholder facts are marked inline (`[to confirm]`, `[PLACEHOLDER]`) and never written as
  plausible-sounding fiction.
- Every image is an abstract inline SVG labelled as a placeholder. No fake product screenshots.
- Both pages carry a visible "Concept prototype" notice, removed only when real content lands.

## Fonts

Both directions load Google Fonts over the network for review convenience. Production should
self-host the chosen family instead: no third-party request on a portfolio, no layout shift, no
dependency on a CDN.
