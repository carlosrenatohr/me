# Phase 01 — Visual direction exploration

Status: **awaiting owner approval of Direction C**
Date: 2026-11-03
Input brief: `docs/design/exploration.md`
Artifacts: `design-lab/a-night-ledger/`, `design-lab/b-systems-blueprint/`,
`design-lab/c-vibrant-editorial/`, `design-lab/evidence/`

## Purpose

Three dark editorial directions for the same content, so the owner can choose a foundation before
any Astro route is written. Each covers Home and Project Detail at desktop and mobile. They are
static HTML/CSS prototypes, not production code.

Round one presented A and B. The owner rejected both as final and directed a third direction:
A's visual identity with a richer color system and selected structure borrowed from B. That is
Direction C, documented in round two below.

## Constraints applied

From `docs/design/PERSONAL-DESIGN-PROFILE.md` and `PRODUCT.md`:

- Dark only. Deep navy family. No light, cream, ivory, beige or sage-green palette.
- No purple gradients, neon, oversaturated blue, or sage-green accent.
- Editorial composition: deliberate grid, generous negative space, restrained borders, no
  card-per-section layout, no decorative motion.
- Nativerse is a taste reference only. No Nativerse, Orbit or Hit Cargo branding is used, and
  no claim is made about Nativerse's actual visual identity.
- No invented facts. Placeholder facts are marked and every image is a labelled abstraction.

## Method

All three directions were rendered in Chrome for Testing 157 at 1440×900 and 390×844, captured
full-page, and reviewed. Rather than guess, layout properties were measured in the DOM:
headline line counts, text widths, horizontal overflow, computed type sizes, and WCAG contrast
ratios. Defects found in review were fixed and recaptured; the screenshots in `evidence/` are
the corrected set.

---

## Direction A — Night Ledger

**Thesis:** a printed ledger read at night. Serif voice, oversized headline, asymmetric columns,
hairline rules. The interface stays quiet so the writing and the work carry the page.

### Palette

Measured against the page background `#070c17`.

| Token | Hex | Role | Contrast |
| --- | --- | --- | --- |
| Background | `#070c17` | page | — |
| Surface | `#0a1120` | image plate, menu | — |
| Text | `#e9eef6` | headline | 16.78:1 |
| Body | `#c8d3e3` | paragraphs, summaries | 12.93:1 |
| Meta | `#dbe3ef` | meta values | 15.13:1 |
| Muted | `#9aa9bf` | labels, captions | 8.20:1 |
| Accent | `#7fa9d9` | links, focus, underline | 7.99:1 |
| Quiet | `#6c7c93` | colophon | 4.60:1 |
| Notice | `#7f8ea5` on `#050912` | prototype banner | 5.99:1 |

All text pairs clear WCAG AA for normal text (4.5:1). No measured value relies on large-text
exceptions.

### Typography (measured at 1440px)

| Role | Family | Size / line-height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Home headline | Newsreader | 94.4 / 92.5 px | 300 | −2.64 px |
| Hero lede | Newsreader | 20 / 32 px | 400 | normal |
| Feature title | Newsreader | 46.1 / 48.4 px | 400 | −0.69 px |
| Pair title | Newsreader | 30.4 / 33.4 px | 400 | −0.30 px |
| Statement | Newsreader | 32 / 46.4 px | 400 | −0.26 px |
| Case headline | Newsreader | 88 / 86.2 px | 300 | −2.64 px |
| Case body | Newsreader | 17 / 28.9 px | 400 | normal |
| Pull quote | Newsreader | 36 / 46.8 px | 300 | −0.43 px |
| Labels | Archivo | 10–12 px | 400 | +0.06 em |

One serif for voice, one grotesque for labels. The serif is doing the identity work; Archivo is
only infrastructure.

### Grid and layout

- Content max 1320 px, gutter `clamp(20px, 4.5vw, 72px)`, 12 columns, 24 px gap.
- Home hero: headline spans columns 1–11; the lede sits in 8–12, dropped below the headline so
  the two blocks share the page without touching.
- Facts strip: three equal columns over a top rule.
- Feature project: image full width, then title in 1–5 and summary/meta/link in 7–12.
- Secondary projects: two columns with the second dropped about 5.5 rem, breaking the row.
- Statement: label in 1–2, text in 4–10, so the argument hangs off a margin.
- Case study: section label in 1–2, body in 4–10 (max 62 ch); pull quote indented 25 % with a
  left rule; "Next" project in 4–10.

### Imagery

Inline SVG plates: concentric arcs, an offset grid, a stepped line. Each plate carries a static
caption ("Image placeholder"), never a fake screenshot. Hover scales the plate 1.012 over 900 ms.

### Navigation

Top bar: serif wordmark left, three text links right, current page marked by an underline and a
rule. Below 900 px the links collapse into a native `<details>` menu, so no JavaScript.

### Motion

One orchestrated entrance: headline, lede and facts rise 14 px over 700 ms with 0/90/160 ms
stagger. Image hover is a 1.2 % scale. Everything is disabled under `prefers-reduced-motion`, and
`?static` pins the final state for screenshots.

### Strengths

- Strong editorial character; the headline and the prose are the design.
- Case study reads like a long-form document, which suits narrative write-ups.
- The grid creates deliberate imbalance without decoration.

### Risks

- The large image plate is the centre of gravity on Home. With no approved screenshots, that
  space is currently an empty panel — the direction is weakest exactly where content is missing.
- Serif-led dark portfolios are a crowded look in design circles; distinctiveness depends on
  typography and spacing craft rather than structure.
- 94 px headlines are unforgiving: any future headline that does not break cleanly will look
  careless.

---

## Direction B — Systems Blueprint

**Thesis:** a technical document, not a brochure. A persistent rail, monospaced labels, ledger
rows and architecture diagrams. The portfolio presents the work the way an engineer would
document it.

### Palette

Measured against the page background `#05090f`.

| Token | Hex | Role | Contrast |
| --- | --- | --- | --- |
| Background | `#05090f` | page | — |
| Panel | `#0a1119` | figure wells | — |
| Text | `#dce6f2` | headline, headings | 15.81:1 |
| Body | `#b8c6d8` | paragraphs | 11.50:1 |
| Muted | `#8494a8` | secondary copy | 6.44:1 |
| Faint | `#7b8ba1` | labels, indices, footnote | 5.75:1 |
| Accent | `#4e8fd6` | diagram nodes, focus | 5.91:1 |
| Accent soft | `#9fc4e8` | links | 10.96:1 |
| Caption | `#6c7c93` | figure captions | 4.70:1 |

Text on panel: `#dce6f2` 15.03:1, muted 6.13:1. Review caught two labels below AA — `#5f6f85`
at 3.89:1 and `#4c5b70` at 2.89:1 — both replaced by `--faint` (`#7b8ba1`, 5.75:1). The palette
is slightly cooler and less blue than A: it reads as instrument panel rather than night sky.

### Typography (measured at 1440px)

| Role | Family | Size / line-height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Home headline | Libre Franklin | 63.4 / 64.6 px | 500 | −1.90 px |
| Feature title | Libre Franklin | 37.4 / 39.3 px | 500 | −0.82 px |
| Ledger title | Libre Franklin | 25.6 px | 500 | −0.38 px |
| Statement | Libre Franklin | 24 / 36 px | 300 | −0.12 px |
| Case headline | Libre Franklin | 59.2 / 61 px | 500 | −1.78 px |
| Case body | Libre Franklin | 15 / 25.5 px | 400 | normal |
| Labels and indices | IBM Plex Mono | 9–12 px | 400 | +0.04–0.07 em |

The mono face is not decoration: it marks every label, index, unit and table head, which is what
makes the page legible as a system rather than a poster.

### Grid and layout

- Fixed 236 px rail, sticky, with wordmark, role line, nav rows, elsewhere links, prototype note.
- Page content offset from the rail, padding `clamp(24px, 4vw, 72px)`.
- Hero: full-width headline, then a four-column spec strip with hairline cells.
- Feature: 1.35 / 1 split, diagram left, title and spec table right.
- Ledger: four columns (4 / 2.5 / 3 / 1.5 fr) with a mono header row — projects scan as records,
  not as cards.
- Case study: 168 px sticky contents list plus a 68 ch body, numbered sections 01–05, decisions
  and outcomes as indexed rows (D1–D3, O1–O2).

The hero was originally a two-column headline/spec split. Measurement showed the third headline
line needed 781 px in a 609 px column, producing a one-word last line, and no viewport-proportional
font size kept the composition stable across widths. The spec strip below the headline fixes it at
every width with a 3-line headline at 1440 px.

### Imagery

Architecture diagrams rather than screenshots: labelled nodes, hairline connectors, grid field,
one accent node marking the system of record. Each diagram ships in two compositions — wide
900×560 and vertical 320×470 — swapped at 640 px so nothing is clipped or horizontally scrolled.
Diagrams are explicitly captioned as illustrative.

### Navigation

Persistent rail. Below 860 px it becomes a static header: wordmark and role stack, nav becomes an
inline row, the count drops, and the prototype note stays visible instead of being hidden.

### Motion

No entrance choreography. Only state transitions: colour and border at 160 ms, a 2.5 % white row
tint on ledger hover. `prefers-reduced-motion` clamps transitions to 0.01 ms.

### Strengths

- Turns the missing-screenshot problem into an honest asset: diagrams communicate architecture
  and judgement without inventing product UI.
- Scannable: a recruiter can read three projects as rows in a few seconds, then open one.
- The rail and ledger create an identity that is harder to mistake for a template than another
  centred dark hero.
- Structurally robust: sparse and dense content both fit the same skeleton.

### Risks

- Reads cooler and more technical; it will not flatter a non-technical reader the way A might.
- The rail costs 236 px of width on laptop screens and is a strong commitment for a five-route
  site.
- Small mono labels at 9–12 px need discipline; two already failed contrast before review.
- Without a serif, warmth has to come from spacing and copy, not type.

---

## Side-by-side (first round, A vs B)

| Criterion | A — Night Ledger | B — Systems Blueprint |
| --- | --- | --- |
| Primary voice | Serif editorial | Technical document |
| Accent | Pale blue link underline | Steel blue nodes and links |
| Density | Low, airy | Medium, tabular |
| Project listing | Image-led feature + pair | Diagram feature + ledger rows |
| Case study | Narrative sections, pull quote | Numbered sections, sticky contents |
| Nav | Top bar, disclosure menu | Persistent rail, static header on mobile |
| Motion | One entrance, image hover | State transitions only |
| Depends on imagery | Heavily | Lightly |
| Fails gracefully with placeholders | No — plate reads empty | Yes — diagrams are labelled abstractions |
| Smallest viewport | Comfortable | Comfortable, denser |

### Weighted evaluation (first round)

Scored 1–5 (5 best) against the seven criteria in `docs/design/exploration.md`, weighted by how
much each determines whether this portfolio works.

| Criterion (from the brief) | Weight | A | B | Note |
| --- | --- | --- | --- | --- |
| 1. Personal and distinctive | 20 % | 4 | 5 | A is well executed but a known serif-editorial pattern; B's rail and ledger are more specific to this person. |
| 2. Communicates independent product engineering | 20 % | 3 | 5 | B states systems, surface and contribution explicitly; A relies on the reader inferring it from prose. |
| 3. Projects are the primary proof of experience | 20 % | 5 | 4 | A devotes most of Home to three projects; B interleaves a substantial approach section, though its ledger keeps all three visible. |
| 4. Dark navy identity, strong but restrained | 10 % | 5 | 4 | A's `#070c17` reads navy; B drifts to near-black steel and needs the Phase 02 shift noted below. |
| 5. Typography readable and memorable | 10 % | 5 | 4 | Newsreader at 94 px is the more memorable voice; Libre Franklin is the safer, plainer read. |
| 6. Avoids generic AI portfolio patterns | 10 % | 4 | 5 | Both avoid cards and gradients; B avoids the oversized-dark-hero convention as well. |
| 7. Works at mobile sizes | 10 % | 5 | 5 | Both measured clean: no overflow, no clipped diagrams, legible labels. |
| **Weighted total** | | **4.30** | **4.60** | |

The margin is 0.30 and comes mostly from criteria 1, 2 and 6. A wins clearly on project
emphasis and typographic memorability.

## First-round recommendation (superseded)

**Direction B — Systems Blueprint.** The owner reviewed both and directed a third direction, so
this recommendation no longer governs. It is kept as the decision trail.

Reasons, in order of weight:

1. **It fits the content that exists.** Three projects, no approved screenshots, text-heavy case
   studies. B's diagrams are honest artifacts that can be produced now; A's hero is a large empty
   plate until real product imagery is approved, and the owner may never be able to publish it.
   This is the deciding factor even though the brief does not score it directly.
2. **It matches the audience and the positioning.** Technical recruiters, engineering managers and
   CTOs read structure. Ledger rows, indexed decisions and a contents rail show how the work was
   reasoned about, not only how it looked.
3. **It is the less generic option.** A serif dark portfolio with a giant headline is a known
   pattern. A rail plus ledger plus spec strips is more specific to this person and less likely to
   read as a template.
4. **It survives mobile without redesign.** The rail collapses cleanly, the ledger becomes labelled
   rows, and the diagrams swap composition rather than scroll sideways.

A is not discarded as a visual language — its restraint and its long-form case study rhythm are
the better read for the writing itself, and it scores higher on project emphasis and typography.
If the owner's priority is the essay-like case study over project scannability, A is the defensible
alternative, and the recommendation changes.

### First-round adjustments if B had been approved

- Shift the background a step further into navy (`#060c16`-range) and re-measure, so the identity
  reads navy rather than near-black.
- Raise case-study body copy from 15 px to 16–17 px; 15 px is defensible but tight for long reading.
- Self-host Libre Franklin and IBM Plex Mono; remove the Google Fonts request.
- Keep the image-plate pattern available for the day real screenshots are approved, so a project
  with imagery is not forced into a diagram.
- Add the tablet breakpoint to the comparison set during QA; this phase only claims desktop and
  mobile.

---

## Round two — Direction C: Dark Editorial, Vibrant Edition

### Brief

After reviewing A and B, the owner asked for a third direction rather than a choice between them:

- Use Direction A as the primary visual identity — editorial serif, large type, asymmetric
  composition, generous negative space, strong project imagery.
- Borrow selected structure from Direction B — case-study sections, technical metadata,
  architecture diagrams, contents navigation, consistent project presentation — without adopting
  B's visual language or turning the site into technical documentation.
- Build a richer color system on deep navy: expressive blues including electric blue, aqua or
  cyan, and one controlled warm accent.
- Avoid neon, purple gradients, glassmorphism, rainbow usage, desaturated palettes, and generic
  AI-portfolio aesthetics.
- Show the palette, typography, spacing, grid and components in real interface elements, not
  swatches.

### Thesis

Direction A's bones, with a color system that has a job for every hue. Navy stays the ground;
electric blue is the brand fill; aqua marks categories and technical facts; coral is the single
warm accent and is deliberately rare. The serif voice and asymmetric grid are untouched.

### Palette

Measured against the base background `#060b1a`; the tinted band `#0a1730` is noted where a token
is used on it.

| Token | Hex | Role | Contrast |
| --- | --- | --- | --- |
| `--bg` | `#060b1a` | page ground | — |
| `--bg-deep` | `#040814` | prototype bar | — |
| `--surface` | `#0a1428` | image wells, menu, diagram nodes | — |
| `--surface-band` | `#0a1730` | Approach band | — |
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

Electric blue fails AA as normal text (4.36:1), so it is never used for type; the lighter
`--blue-text` carries every blue link and label. That split is the reason the palette can be
brighter without breaking contrast.

### Color rules

1. **One job per hue.** Electric blue = brand fill and state. Blue-text = interactive text.
   Aqua = categories, indices and technical facts. Coral = the single warm accent.
2. **Never color alone.** Every coral or aqua mark sits next to a text label; the categories are
   words, not just colors.
3. **Coral stays rare.** Home uses it four times: the prototype bar dot, the "Selected project"
   marker, the Orbit plate's baseline ticks, and the Gox plate's end point. The case page uses it
   twice: the quote rule and the system-of-record node. A fifth appearance on Home would tip it
   from accent into decoration.
4. **No gradients, glows or glass.** Depth comes from four flat navy values and hairlines, not
   from effects. There is no backdrop blur anywhere in the direction.
5. **Aqua emphasis is capped.** One italic aqua phrase per section, and only in two sections: the
   hero headline ("useful.") and the Approach statement ("solves it."). A third section using the
   device would turn a signature into a tic.

### Typography (measured at 1440px)

Same pairing as A, with one new device: Newsreader italic in aqua for emphasis.

| Role | Family | Size / line-height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Home headline | Newsreader | 94.4 / 92.5 px | 300 | −2.64 px |
| Headline emphasis | Newsreader italic | 94.4 px, aqua | 300 | −2.64 px |
| Hero lede | Newsreader | 20 / 32 px | 400 | normal |
| Feature title | Newsreader | 46.1 / 48.4 px | 400 | −0.69 px |
| Pair title | Newsreader | 30.4 / 33.4 px | 400 | −0.30 px |
| Statement | Newsreader | 32 / 46.4 px | 400 | −0.26 px |
| Case headline | Newsreader | 88 / 86.2 px | 300 | −2.64 px |
| Case body | Newsreader | 17 / 28.9 px | 400 | normal |
| Section heading | Newsreader | 28 / 33.6 px | 400 | −0.42 px |
| Pull quote | Newsreader italic | 33.6 / 44.4 px | 300 | −0.34 px |
| Footer email | Newsreader | 36 px | 400 | −0.36 px |
| Category eyebrow | Archivo | 11 px, uppercase, aqua | 500 | +1.1 px |
| Spec labels | Archivo | 9 px, uppercase | 400 | +0.81 px |
| Spec values | Archivo | 14 / 20.3 px | 400 | normal |
| Contents links | Archivo | 12 / 20.4 px | 400 | normal |

### Surfaces, spacing and grid

- Same 12-column grid as A: 1320 px max, gutter `clamp(20px, 4.5vw, 72px)`, 24 px gap.
- Four flat surfaces create rhythm without decoration: base (`#060b1a`), band (`#0a1730`),
  wells (`#0a1428`), deep bar (`#040814`).
- The Approach section is a band that bleeds through the page gutter, so the page has one tonal
  break instead of a uniform navy field.
- Home: headline 1–11, lede 8–12, meta three columns; feature title 1–5, summary and metadata
  7–12; secondary projects as an offset pair.
- Case study: sticky contents 1–2, body 4–11 capped at 68 ch, so the diagram and prose share one
  measure. Spec strip is four columns over hairlines; on mobile it becomes one.
- Spacing keeps A's scale (`0.25` to `6rem` steps, section rhythm `clamp`), no new spacing system.

### Components and where color lands

| Component | Treatment |
| --- | --- |
| Current nav item | Blue text with a 2 px electric underline |
| Inline links | Blue text, electric underline, aqua on hover |
| Category eyebrow | Aqua, uppercase, letterspaced |
| Selected marker | Coral dot + coral label above the lead project |
| Project metadata | Uppercase sans labels, sans values — B's clarity in A's grid |
| Image plates | Navy wells with electric arcs/bars, aqua markers, coral ticks |
| Approach band | Tinted surface, aqua italic emphasis |
| Contents rail | Sticky, blue indices, muted labels, aqua on hover |
| Diagram | Electric connectors, aqua arrow nodes, coral system-of-record border |
| Pull quote | 3 px coral rule, italic serif |
| Decisions / outcomes | Blue D-indices, aqua O-indices |
| Next project | Aqua eyebrow, serif link, aqua arrow |
| Focus state | 2 px aqua outline, 4 px offset (10.73:1 against the base) |

### What comes from A and what comes from B

| From A | From B |
| --- | --- |
| Newsreader + Archivo pairing | Numbered case-study sections |
| 94 px asymmetric hero | Sticky contents navigation |
| 12-column editorial grid | Four-column technical spec strip |
| Image-led feature + offset pair | Architecture diagram, wide and vertical |
| Serif body copy and pull quote | Indexed decisions and outcomes |
| Generous negative space | Consistent metadata across projects |
| Restrained motion | Strong, scannable information hierarchy |

B's rail navigation, monospaced label system and ledger table are deliberately **not** used; those
are what made B read as documentation.

### Tradeoffs and risks

- **More color means more upkeep.** Each hue has one job today. Adding a fourth accent, or using
  coral for a second kind of state, collapses the system into decoration.
- **Coral is the fragile token.** It is the most attractive color in the set and the easiest to
  overuse; the current count is deliberate and should be treated as a budget.
- **Aqua italic emphasis is a signature, not a pattern.** It appears twice per page today, in two
  different sections, deliberately echoing each other. That is the ceiling.
- **Vibrancy can drift consumer-startup.** What keeps it editorial is the serif, the hairlines and
  the amount of empty space — not the saturation. If it starts to feel like a SaaS landing page,
  cut color before cutting type.
- **Brighter palettes are harder to keep accessible.** Electric blue already fails as text; the
  split between fill and text tokens must survive into production, and any token change requires
  re-measuring.
- **Imagery is still missing.** C makes the placeholder plates more convincing than A's, and the
  case page can rely on a diagram, but real project imagery remains the biggest open content risk.
- **Contrast at small sizes.** The 9 px spec labels pass at 8.05:1, but they are small; production
  should consider 10 px if the owner is comfortable with a slightly denser strip.

### Three-way comparison

Scored 1–5 against the seven criteria in `docs/design/exploration.md`.

| Criterion | Weight | A | B | C |
| --- | --- | --- | --- | --- |
| 1. Personal and distinctive | 20 % | 4 | 5 | 5 |
| 2. Communicates product engineering | 20 % | 3 | 5 | 4 |
| 3. Projects are primary proof | 20 % | 5 | 4 | 5 |
| 4. Navy identity, strong but restrained | 10 % | 5 | 4 | 4 |
| 5. Typography readable and memorable | 10 % | 5 | 4 | 5 |
| 6. Avoids generic AI portfolio patterns | 10 % | 4 | 5 | 5 |
| 7. Works at mobile sizes | 10 % | 5 | 5 | 5 |
| **Weighted total** | | **4.30** | **4.60** | **4.70** |

C edges B by 0.10 and A by 0.40. It inherits A's strongest criteria (3 and 5) and closes A's
weakest (2) by borrowing B's spec strip, contents rail and diagram. It gives up one point on
criterion 4 relative to A: a vibrant palette is by definition less restrained than a muted one,
and that is the owner's explicit trade.

### Final recommendation

**Direction C — Dark Editorial, Vibrant Edition.**

1. **It is the direction the owner actually asked for**, and it does not require choosing between
   A's identity and B's information architecture.
2. **It fixes A's structural weakness** — no contents rail, thin metadata, no technical
   illustration — without importing B's documentation voice.
3. **The color system is purposeful and measured.** Three accents, one job each, every text pair
   at or above 4.5:1, and electric blue explicitly restricted to fills.
4. **It keeps the portfolio honest.** The plates are clearly placeholders, the diagram is labelled
   as illustrative, and no project fact is invented.

If approved, Phase 02 should freeze these tokens (with the surface values re-checked on a real
display), self-host Newsreader and Archivo, define hover/active/focus states for every interactive
element, and verify the tablet breakpoint that this phase did not claim.

### Verification evidence — Direction C

Measured in Chrome for Testing 157, 2026-11-03.

```
Horizontal overflow (document width must not exceed viewport):
  c-home-desktop    1425 / 1440      c-home-mobile    375 / 390
  c-project-desktop 1425 / 1440      c-project-mobile 375 / 390

Headline composition: 3 lines at 1440, 4 lines at 390 with forced breaks removed.
Diagram composition: 1440 wide visible / narrow none; 390 wide none / narrow visible.

Structure, both pages: one h1, lang=en, skip link, no empty links,
every svg[role=img] labelled, all 5 contents anchors resolve, one main.
Contrast: every text pair in the palette table ≥ 4.5:1; electric blue used as fill only.
```

## Verification evidence — Directions A and B

Measured in Chrome for Testing 157, 2026-11-03.

```
Horizontal overflow (document width must not exceed viewport):
  a-home-desktop  1425 / 1440      a-home-mobile   375 / 390
  a-project-desktop 1425 / 1440    a-project-mobile 375 / 390
  b-home-desktop  1425 / 1440      b-home-mobile   375 / 390
  b-project-desktop 1425 / 1440    b-project-mobile 375 / 390

Headline composition:
  A home 1440 → 3 lines      B home 1440 → 3 lines
  A home 390  → 4 lines      B home 390  → 4 lines (forced breaks removed)

Diagram composition:
  B 1440 → wide visible, narrow none
  B 390  → wide none, narrow visible
```

Structural audit on all four pages: exactly one `<h1>`, `lang="en"`, skip link present, no empty
links, every `<svg role="img">` carries an `aria-label`, no `<img>` without `alt`, one `<main>`.

Contrast: every text pair listed above measured 4.5:1 or better after review. Two Direction B
labels below AA were found and replaced rather than documented as acceptable.

## Open questions for the owner

1. Approve Direction C as the foundation for Phase 02, or request specific changes first.
2. Is the coral budget right — the selected marker, the quote rule and one diagram node — or should
   the warm accent appear in one more place (for example the footer email)?
3. Should the aqua italic emphasis stay in the hero headline, or is it too strong for a first
   impression?
4. Will approved project screenshots exist, or should the site plan for diagrams and abstract
   plates only? This decides how much of the image-led composition survives.
5. Is the copy tone right — first person, plain, no sales language?
6. Any constraint on typefaces (licensing, self-hosting, brand preference) before tokens are
   finalised.
