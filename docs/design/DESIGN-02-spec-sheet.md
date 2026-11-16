# Design spec sheet — Direction C, Phase 02

Scope: tokens, primitives, responsive rules, and the constraints that keep the
direction from drifting.

---

## 1. Palette

| Role | Token | Value |
| --- | --- | --- |
| Page ground | `--bg` | `#060b1a` |
| Deep navy | `--bg-deep` | `#040814` |
| Surface well | `--surface` | `#0a1428` |
| Tinted band | `--surface-band` | `#0a1730` |
| Headline / values | `--text` | `#eaf1ff` |
| Paragraph | `--body` | `#c9d6ec` |
| Labels / notes | `--muted` | `#95a7c6` |
| Brand fill (never text) | `--blue` | `#2f6bff` |
| Interactive text | `--blue-text` | `#5b8dff` |
| Category / emphasis | `--aqua` | `#2fd3dd` |
| Warm accent | `--coral` | `#ff6a4d` |
| Diagram sublabel | `--coral-soft` | `#ff8f78` |
| Rule | `--line` | `rgba(234,241,255,0.14)` |
| Section divider | `--line-soft` | `rgba(234,241,255,0.08)` |

---

## 2. Type

- Family pairing: Newsreader (serif) + Archivo (sans, grotesque).
- Self-hosted from `/fonts`.
- Headline `5.9rem` at 1440, lede `1.0625rem`, case body `0.9375rem`.
- Labels `0.6875rem / 0.5625rem`, uppercase, letterspaced.
- **No gradients, no glows, no glass, no neon.**

---

## 3. Grid and spacing

- 12-column grid, max 1320 px, gutter `clamp(1.25rem, 4.5vw, 4.5rem)`.
- 24 px gap; sub-grid gap `1.5rem`.
- Body measure 68 ch; section columns do not exceed it.
- Spacing steps `0.25rem` → `6rem`.

---

## 4. Layout

- Header: wordmark left, nav right, compact `<details>` below 900 px.
- Hero: headline 1–11, lede 8–12, meta three columns, band below.
- Work: feature plate full width, then metadata and link; secondary pair
  offset.
- Approach: tinted band, bleed across the gutter.
- Footer: two-column, mail and links.

---

## 5. Components

| Component | Treatment |
| --- | --- |
| Current nav item | Blue text + 2 px electric underline. |
| Inline link | Blue text, electric underline, aqua on hover. |
| Eyebrow | Aqua, uppercase, letterspaced. |
| Selected marker | Coral dot + coral label. |
| Project metadata | Sans uppercase labels, sans values. |
| Media plate | Navy well with electric arcs/bars. |
| Approach band | Tinted surface, aqua italic emphasis. |
| Contents rail | Sticky, blue indices, muted labels. |
| Diagram | Electric connectors, aqua arrow nodes, coral system-of-record border. |
| Pull quote | 3 px coral rule, italic serif. |
| Decisions / outcomes | Blue D-indices, aqua O-indices. |
| Next project | Aqua eyebrow, serif link, aqua arrow. |
| Focus state | 2 px aqua outline, 4 px offset. |
| Selection | Electric blue fill, white text. |

---

## 6. Constraints

- **Dark only.** No light mode, no cream/ivory/beige.
- **No gradients, glows, glass, neon, or a fourth accent.**
- **No Google Fonts.** Self-hosted Newsreader and Archivo.
- **Electric blue is fill only.** Links use `--blue-text`.
- **Coral is rare.** Selected marker, quote rule, diagram node; one warm
  accent only.
- **No cards-per-section.** Editorial composition with hairlines.
- **No animations** beyond the entrance and hover states; reduced-motion
  respected.
- **No third-party scripts, no analytics, no CMS.**

---

## 7. Out of scope

- No full pages. Phase 03 builds the routes.
- No imagery. Placeholder plates are labelled and abstract.
- No content facts. All `[to confirm]` values remain placeholders.
