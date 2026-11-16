# Direction C — Token freeze (Phase 02)

Status: **frozen** (owner-directed 2026-11-03)  
Source of truth: `src/styles/tokens.css`  
Scope: colour, type, grid, spacing, borders, surfaces, focus/selection, motion

The file is the only token source; every `.css` file in `src/styles/` imports it
first. Values are measured at 1440 px. Re-measure before changing any value.

---

## Colour

| Token | Hex | Role | Contrast |
| --- | --- | --- | --- |
| `--bg` | `#060b1a` | page ground | — |
| `--bg-deep` | `#040814` | deep navy, prototype bar | — |
| `--surface` | `#0a1428` | wells, menu, diagram nodes | — |
| `--surface-band` | `#0a1730` | tinted approach band | — |
| `--text` | `#eaf1ff` | headline, headings, values | 17.30:1 (15.72 on band) |
| `--body` | `#c9d6ec` | paragraphs, summaries | 13.37:1 (12.15 on band) |
| `--muted` | `#95a7c6` | labels, captions, notes | 8.05:1 (7.32 on band) |
| `--blue` | `#2f6bff` | fills, rules, current-page underline | 4.36:1 — **fill only, never text** |
| `--blue-text` | `#5b8dff` | links, TOC numbers, decision indices | 6.26:1 (5.69 on band) |
| `--aqua` | `#2fd3dd` | categories, technical marks, emphasis | 10.73:1 (9.75 on band) |
| `--coral` | `#ff6a4d` | selected marker, quote rule, one diagram node | 6.93:1 (6.30 on band) |
| `--coral-soft` | `#ff8f78` | diagram sublabel | 8.27:1 on surface |
| `--line` | `rgba(234,241,255,0.14)` | structural rules | non-text |
| `--line-soft` | `rgba(234,241,255,0.08)` | section dividers | non-text |

### Colour rules

1. **One job per hue.** Electric blue = brand fill and state. Blue-text =
   interactive text. Aqua = categories, indices, technical facts. Coral =
   the single warm accent.
2. **Never colour alone.** Every coral or aqua mark sits next to a text label.
3. **Coral is rare.** The current budget is deliberate: selected marker, quote
   rule, one diagram node on Home; quote rule and system-of-record node on the
   case page.
4. **No gradients, glows or glass.** Depth comes from four flat navy values and
   hairlines. No `backdrop-filter` anywhere.
5. **Aqua emphasis is capped.** One italic aqua phrase per section, only in the
   hero headline (`useful.`) and the Approach statement (`solves it.`).

### Why the split between `--blue` and `--blue-text`

Electric blue fails AA as normal text (4.36:1). The lighter `--blue-text`
(#5b8dff, 6.26:1) carries every blue link and label. Switch any electric-blue
type to `--blue-text` before landing.

---

## Type scale (measured at 1440 px)

| Role | Family | Size / line-height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Home headline | Newsreader | `5.9rem` / `1.02` | 300 | −2.64 px |
| Headline emphasis | Newsreader italic | 5.9rem | 300 | −2.64 px |
| Hero lede | Newsreader | `1.0625rem` / `1.6` | 400 | normal |
| Feature title | Newsreader | `2.35rem` / `1.08` | 400 | −0.69 px |
| Pair title | Newsreader | `1.55rem` / `1.12` | 400 | −0.30 px |
| Statement | Newsreader | `1.6rem` / `1.42` | 400 | −0.26 px |
| Case headline | Newsreader | `1.75rem` / `1.2` | 300 | −0.42 px |
| Case body | Newsreader | `0.9375rem` / `1.68` | 400 | normal |
| Section heading | Newsreader | `1.5rem` / `1.2` | 400 | −0.42 px |
| Pull quote | Newsreader italic | `1.75rem` / `1.28` | 300 | −0.34 px |
| Footer email | Newsreader | `1.75rem` / `1.25` | 400 | −0.36 px |
| Category eyebrow | Archivo | `0.6875rem` / `1.3` | 500 | +1.1 px |
| Spec labels | Archivo | `0.5625rem` / `1.3` | 400 | +0.81 px |
| Spec values | Archivo | `0.75rem` / `1.45` | 400 | normal |
| Contents links | Archivo | `0.7rem` / `1.7` | 400 | normal |

The serif is the voice; Archivo is infrastructure. Both are self-hosted from
`/fonts`. Falling back to Georgia / system-ui keeps the site legible before the
files resolve.

---

## Spacing

`--space-1` to `--space-24` in `0.25rem` steps, matching Direction C. Section
rhythm uses the same `clamp()` scale as Direction C (`clamp(1.25rem, 4.5vw,
4.5rem)` for the gutter). No new spacing system.

---

## Grid

- 12-column editorial grid, `max-width: 1320px`, gutter
  `clamp(1.25rem, 4.5vw, 4.5rem)`, 24 px gap.
- Content maxes at 1320 px; nothing bleeds past the gutter at 1440 px.
- Sub-grids use `repeat(12, minmax(0, 1fr))` with `gap: 1.5rem`.

---

## Borders

- `--line` (`rgba(234,241,255,0.14)`) for structural hairlines.
- `--line-soft` (`rgba(234,241,255,0.08)`) for section dividers and the band.
- No borders thicker than 3 px; no border radius beyond 2 px on controls.

---

## Surfaces

- `--bg` `#060b1a` — page ground.
- `--bg-deep` `#040814` — prototype bar only.
- `--surface` `#0a1428` — image wells, menu, diagram nodes.
- `--surface-band` `#0a1730` — tinted approach band.

---

## Focus and selection

- Focus: `2 px` aqua outline, `4 px` offset. Measured 10.73:1 against the base
  at every interactive element.
- Selection: electric blue fill, white text. Never colour alone.

---

## Motion

- Entrance: headline, lede and meta rise `14 px` over `700 ms`, staggered 0 /
  90 / 160 ms.
- Hover: image plates scale `1.012` over `180 ms`.
- Focus, link and metadata transitions use `180 ms`.
- `prefers-reduced-motion` clamps to `0.01 ms` and disables entrance and
  hover-transforms. The `?static` flag pins final state for screenshots.
- No parallax, cursor tricks, animated gradients or backdrop blur anywhere.
