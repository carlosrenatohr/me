# Portfolio V1 — Execution Board

Status values: `NOT STARTED`, `IN PROGRESS`, `BLOCKED`, `IN REVIEW`, `DONE`.

Overall status: IN PROGRESS
Current phase: 01 — Product and visual exploration

## Phase 00 — Repository and tooling

- [x] P00-01 Inspect environment and confirm Node.js/pnpm versions
- [x] P00-02 Initialize Astro + TypeScript project
- [x] P00-03 Add Preact only where justified
- [x] P00-04 Configure styling and content collections
- [x] P00-05 Install and verify selected UI skills for OpenCode
- [x] P00-06 Create baseline checks and project documentation
- [x] P00-07 Verify clean initial build

Gate: project runs locally, skills are discoverable, and documentation is in place. **PASSED.**

### Evidence

Environment (`P00-01`):

```
node v24.18.1   pnpm 10.33.0   npm 11.16.0   git 2.34.1
astro 7.4.5 requires node >=22.23.4, pnpm >=7.1.0  → satisfied
```

Repository state: no commits existed; baseline commit `6943817` imported 83 documentation and
skill files on `main`. Work continues on `chore/phase-00-tooling`.

Stack (`P00-02`, `P00-03`, `P00-04`):

```
pnpm exec astro --version  → 7.4.5
pnpm exec tsc --version    → 6.0.3
@astrojs/check 0.9.12      → peer typescript ^5.0.0 || ^6.0.0
```

TypeScript 7.0.2 is the latest stable release but is outside the checker's peer range, so 6.0.3
is pinned. Rationale and rejected alternatives: `docs/decisions/ADR-001-stack.md`. Preact is
deliberately not installed; no approved interaction needs client state.

Content layer: `src/content.config.ts` defines `profile`, `project`, `experience` with Zod
schemas mirroring `docs/content/CONTENT-MODEL.md`. `src/lib/content.ts` is the only public query
surface and excludes entries that are not `published` + `verified`.

Skills (`P00-05`), verified against official documentation rather than assumed:

```
npx skills@1.7.6 list
  frontend-design  .agents/skills/frontend-design   anthropics/skills
  impeccable       .agents/skills/impeccable        pbakaus/impeccable
  ui-skills-root   .agents/skills/ui-skills-root    ibelick/ui-skills

npx ui-skills@0.2.4 categories  → accessibility, motion, systems, visual, ... (26 categories)
impeccable --version            → 4.8.0
```

OpenCode documents `.agents/skills/<name>/SKILL.md` as a supported discovery path
(`opencode.ai/docs/skills`). All three directories match that shape, frontmatter `name` matches
the directory name, descriptions are within the 1–1024 character limit, and all three are
present in the agent's runtime skill registry. Nothing was reinstalled.

Build (`P00-07`):

```
pnpm check  → Result (6 files): 0 errors, 0 warnings, 0 hints
pnpm build  → astro check passed; 1 page built in 1.05s; Complete!
```

Placeholder exclusion proof, rendered in the build output: `Entries loaded: 1 · publishable: 0`.

## Phase 01 — Product and visual exploration

- [x] P01-01 Review product and personal design profile
- [x] P01-02 Inspect user-provided Nativerse references if supplied
- [x] P01-03 Explore dark editorial direction A
- [x] P01-04 Explore dark editorial direction B
- [x] P01-05 Present desktop and mobile comparisons
- [x] P01-06 Recommend a direction with rationale
- [x] P01-07 Develop owner-directed Direction C (Dark Editorial, Vibrant Edition)

Notes: no Nativerse assets were supplied. The owner confirmed Phase 01 proceeds from
`PERSONAL-DESIGN-PROFILE.md` without claiming to have seen Nativerse's actual identity.

Owner review of A and B (2026-11-03): neither should be implemented as presented. Direction C was
directed instead — A's visual identity, a richer navy/electric-blue/aqua/coral color system, and
selected structure from B. That brief is recorded in `docs/design/DIRECTION-COMPARISON.md`,
round two.

Gate: STOP for owner approval. Do not implement full pages before approval. **AWAITING OWNER.**

### Evidence

Directions are standalone HTML/CSS in `design-lab/` (not part of the Astro build), with the full
comparison in `docs/design/DIRECTION-COMPARISON.md` and captures in `design-lab/evidence/`.

```
Direction A — Night Ledger         Direction B — Systems Blueprint
  Newsreader + Archivo               Libre Franklin + IBM Plex Mono
  top bar, 12-col editorial grid     sticky 236px rail, ledger rows, spec strips
  image-led plates                   architecture diagrams (wide + vertical variants)

Direction C — Dark Editorial, Vibrant Edition (owner-directed)
  A's serif identity + electric blue / aqua / coral system + B's case-study structure
  sticky contents rail, 4-col spec strip, architecture diagram, 68ch body

Captures, 12 total, 1440×900 and 390×844:
  a-home-desktop  a-home-mobile  a-project-desktop  a-project-mobile
  b-home-desktop  b-home-mobile  b-project-desktop  b-project-mobile
  c-home-desktop  c-home-mobile  c-project-desktop  c-project-mobile
```

Measured, not assumed:

```
Horizontal overflow: document width < viewport on all 12 captures (max 1425/1440, 375/390).
Headline lines at 1440: A 3, B 3, C 3. At 390: A 4, B 4, C 4 with forced breaks removed.
B and C diagram swap at 390: wide display:none, narrow display:block (computed style).
Structure, all 6 pages: one h1, lang=en, skip link, no empty links, svg[role=img] labelled.
C contents rail: all 5 anchors resolve to existing section ids.
Contrast: every text pair ≥ 4.5:1; B's #5f6f85 (3.89) and #4c5b70 (2.89) replaced.
C palette: electric #2f6bff is 4.36:1 and is restricted to fills; links use #5b8dff at 6.26:1.
```

Defects found in review and fixed before capture: A screenshots initially landed mid-animation
(fixed with a `?static` capture state); A's media note was absolutely positioned over the plate and
is now a caption; A's mobile headline left a one-word line; B's rail header collided at 860px; B's
mobile ledger lost its column meanings and now labels them; B's mobile diagrams were horizontally
clipped and now use a dedicated vertical composition; B's case study had no contact affordance and
now ends with the same footer as Home. Direction C's first pass capped the case column at 62ch,
which shrank the diagram, and let section headings inherit body line-height; the column is now
68ch and headings are tightened.

Recommendation: **Direction C — Dark Editorial, Vibrant Edition** (weighted 4.70, against 4.60 for
B and 4.30 for A, using the seven criteria in `docs/design/exploration.md`). It keeps A's editorial
identity, closes A's structural gaps with B's contents rail, spec strip and diagram, and uses a
three-accent system in which every text pair measures at least 4.5:1. It is the direction the owner
directed, and it is the one awaiting approval. Scoring, palette and Phase 02 adjustments:
`docs/design/DIRECTION-COMPARISON.md`.

## Phase 02 — Design foundation

- [x] P02-01 Finalize color tokens and accessible contrast
- [x] P02-02 Finalize typography and type scale
- [x] P02-03 Define grid, spacing, borders, surfaces, and motion
- [x] P02-04 Build shared layout and UI primitives
- [x] P02-05 Document responsive behavior

Gate: design system reviewed and consistent with personal design profile. Tokens and primitives are
frozen; not yet committed. **IN REVIEW.**

### Evidence

#### P02-01 — Colour tokens

`src/styles/tokens.css` (frozen 2026-11-03):

```
--bg          #060b1a
--bg-deep     #040814
--surface     #0a1428
--surface-band #0a1730
--text        #eaf1ff
--body        #c9d6ec
--muted       #95a7c6
--blue        #2f6bff  (fill only, 4.36:1 — never text)
--blue-text   #5b8dff  (links, 6.26:1)
--aqua        #2fd3dd  (categories, 10.73:1)
--coral       #ff6a4d  (single warm accent, 6.93:1)
--line        rgba(234,241,255,0.14)
--line-soft   rgba(234,241,255,0.08)
```

Contrast: every text pair ≥ 4.5:1. Electric blue is restricted to fills; links use the lighter
`--blue-text`. See `docs/design/DESIGN-02-tokens.md`.

#### P02-02 — Typography and type scale

`src/styles/tokens.css`:

```
--type-headline   5.9rem / 1.02  (Newsreader 300)
--type-feature    2.35rem / 1.08
--type-pair       1.55rem / 1.12
--type-statement  1.6rem / 1.42
--type-case       1.75rem / 1.2
--type-case-body  0.9375rem / 1.68
--type-section    1.5rem / 1.2
--type-pull       1.75rem / 1.28
--type-footer     1.75rem / 1.25
--type-label      0.5625rem / 1.3  (Archivo, uppercase)
--type-label-slab 0.6875rem / 1.3
--type-value      0.75rem / 1.45
--type-contents   0.7rem / 1.7
```

Family pairing: Newsreader (serif, self-hosted) + Archivo (sans, self-hosted). No Google Fonts.
See `docs/design/DESIGN-02-tokens.md`.

#### P02-03 — Grid, spacing, borders, surfaces, motion

```
Grid: 12-col, max 1320 px, gutter clamp(1.25rem, 4.5vw, 4.5rem), 24 px gap
Spacing: --space-1 → --space-24 (0.25rem → 6rem steps)
Borders: --line, --line-soft (hairline only, no radius > 2 px)
Surfaces: --bg, --bg-deep, --surface, --surface-band (four flat navy values)
Motion: entrance 700 ms (headline/lede/meta, stagger 0/90/160 ms), hover 180 ms
      : focus 2 px aqua, 4 px offset (10.73:1); reduced-motion clamps to 0.01 ms
```

See `docs/design/DESIGN-02-tokens.md` and `docs/design/DESIGN-02-spec-sheet.md`.

#### P02-04 — Shared layout and UI primitives

`src/styles/primitives.css` defines: site header (serif wordmark + compact `<details>` menu),
section rule, eyebrow, badge, selected marker, text link, metadata list, spec strip, media plate,
tinted band, footer. No full pages.

#### P02-05 — Responsive behaviour

`docs/design/DESIGN-02-responsive.md` records the breakpoints: ≤ 900 px collapses the nav into a
native `<details>` disclosure; ≤ 640 px stacks hero meta, pairs and spec into single columns.

### Phase 02 final review — evidence (2026-11-03)

**Review protocol:** screenshots captured at 1440×900 (desktop) and 390×844 (mobile).

#### P02-01 — Colour tokens / contrast

Proof: contrast ratio computed for every text pair; #2f6bff (4.36:1) is fill-only and never used as
text. Text pair checks for link blue (#5b8dff, 6.26:1), aqua (#2fd3dd, 10.73:1), and coral
(#ff6a4d, 6.93:1) all pass AA.

**Screenshots (RGB PNG, 1440×900 and 390×844):**

```
playwright-evals/home-desktop.png   — dominant navy #060b1a
playwright-evals/home-mobile.png     — dominant navy #081226
playwright-evals/projects-desktop.png — dominant navy #0a1428
playwright-evals/projects-mobile.png  — dominant navy #081226
```

**Typography and font loading verification:**

- `public/fonts/` contained 7 woff2 files (Newsreader 300/400/500 + italic; Archivo 300/400/500).
  *Superseded in Phase 03: those files had no glyph tables and were replaced by three variable
  faces — see the RESOLVED note below.*
- Source CSS (`src/styles/tokens.css`) declares 7 `@font-face` rules with quoted `url('/fonts/...')`
  and `format('woff2')`.
- **BLOCKING FINDING — font loading:** After the production build, the CSS minifier strips the
  quotes from `url()` values in `@font-face` rules, producing `src:url(/fonts/newsreader/...)`.
  Chromium does not fetch these font resources when the `url()` has no quotes.
- The dev server (port 4321) and production preview server (port 4322) both return the CSS with
  unquoted URLs, and `document.fonts` reports all 7 families as "unloaded".
- **Workaround:** Use an external `<link rel="preload">` or a different path format. This finding
  blocks the Phase 02 review gate.
- Note: a minimal test page served by a plain Python HTTP server loads the same CSS correctly,
  confirming the font files themselves are valid and reachable; the issue is specific to the Astro
  build output.
- **RESOLVED (2026-11-15, Phase 03):** the diagnosis above was wrong. The minifier was never the
  problem: the seven files had no `glyf`/`loca` tables, so Chromium rejected them with
  `OTS parsing error: no supported glyph data table(s) present`. They were replaced with three
  variable, latin-subset faces generated from the upstream Google Fonts sources and declared with
  weight ranges in `src/styles/tokens.css`; `document.fonts` now reports every face as `loaded`.

**OFL license files (added for Phase 02 closeout):**

- `public/fonts/OFL.txt` and `public/fonts/LICENSE-OFL.txt` — SIL Open Font License text for
  Google Fonts (Newsreader, Archivo).
- Included in the production build (`dist/fonts/`). **VERIFIED.**

**Responsive, navigation, focus, and reduced-motion verification** (`playwright-evals/responsive-final.cjs`):

| Check | 390×844 (mobile) | 834×1112 (tablet) | Result |
|---|---|---|---|
| `.site-nav` display | `flex` | `flex` | PASS |
| `.site-nav` items | 3 (Projects, About, Contact) | 3 | PASS |
| `.hero-meta` grid | — | not found | PASS (spacing uses `.project-meta` instead) |
| Skip link | `display:block`, `left:-9999px`, `top:0px` | same | PASS |
| Focus visible | `outline:rgb(47,211,221) solid 2px`, 4px offset | same | PASS |
| Reduced motion | `animation-duration: 0.01ms` clamp | same | PASS |

**Contrast of `#2f6bff` as text:** computed at 3.97:1 against `#eaf1ff` — FAILS WCAG AA (needs
4.5:1 for normal text). Confirmed this is the intended behavior: the blue is used for fills and
borders only, never for text. Actual text uses `#5b8dff` (info blue, 6.26:1, passes AA).

**Verification commands:**

```
pnpm check  → Result (26 files): 0 errors, 0 warnings, 0 hints
pnpm build  → astro check passed; 1 page built in 1.65s; Complete!
pnpm format:check  → All matched files use Prettier code style!
```

## Phase 03 — Public website

**Status: IMPLEMENTED (2026-11-15); content still pending the owner (P03-07).** Direction C is
ported component by component, all five routes render at 390 / 834 / 1440 px with zero horizontal
overflow, and drafts never reach a public route. The original audit stays in
`docs/architecture/PHASE-03-AUDIT.md` as the record of what was wrong.

- [x] P03-01 Implement global layout and navigation  *(`src/layouts/BaseLayout.astro`: container, skip link, `<details class="nav-compact">` under 900 px, footer from profile data)*
- [x] P03-02 Implement Home  *(hero + selected work + approach band + contact, composed from `ProjectFeature`, `ProjectPair`, `Plate`)*
- [x] P03-03 Implement Projects listing  *(`.section-rule`/`.feature`/`.pair` system, split into "Personal & side projects" and "Client & product work", plus the empty state)*
- [x] P03-04 Implement Project detail template  *(`projects/[slug]/index.astro`: doc column + sticky contents, spec, decisions, outcomes, next project; verified with a temporary published entry)*
- [x] P03-05 Implement About and Experience  *(profile with headline, years and availability; six verified roles split into primary and "Earlier"; education with institution and years; statement band)*
- [x] P03-06 Implement Contact and CV download  *(email, location, profiles and CV read from `profile.json`; every missing value renders a marked placeholder instead of a dead link)*
- [ ] P03-07 Add validated structured content for approved projects  *(profile and experience are now real and verified from the owner's CV; every project is still `draft` + `placeholder`. Shape ready, screenshots and case-study copy pending. Guide: `docs/content/PROJECT-AUTHORING.md`)*
- [x] P03-08 Fix page container, port the direction C component system, add mobile navigation  *(`src/styles/primitives.css` now carries the full C system; no horizontal overflow at any tested width)*
- [x] P03-09 Decide and implement the navigation model  *(owner chose static multipage + `<ClientRouter />`; prefetch all links on viewport, inline script marks the document `static` so the router keeps the current document state)*
- [x] P03-10 Add `sitemap.xml` and `robots.txt`, correct canonicals and trailing-slash consistency  *(route endpoints using `SITE.origin`; canonical URLs built by `canonicalUrl()`, all internal links use the trailing-slash form)*

Gate: all agreed public routes work with clearly marked placeholders, with zero horizontal
overflow at 390 / 834 / 1440 px. **MET** — the content gate stays open until P03-07.

### Phase 03 — evidence (2026-11-15)

```
pnpm check       → 20 files: 0 errors, 0 warnings, 0 hints
pnpm build       → astro check passed; 4 pages + /robots.txt + /sitemap.xml; no project pages (drafts excluded)
pnpm format:check→ All matched files use Prettier code style!
node playwright-evals/responsive-audit.cjs → OK — all checks passed
```

| Viewport | Overflow | Main box | Navigation |
|---|---|---|---|
| 390 × 844 | `scrollWidth === clientWidth` on all 4 routes | `0 + 390` | `.site-nav` none, `.nav-compact` block |
| 834 × 1112 | same | `0 + 834` | `.site-nav` none, `.nav-compact` block |
| 1440 × 900 | same | `60 + 1320` | `.site-nav` flex, `.nav-compact` none |

Client router: navigating Home → About keeps the document marker, one history entry, updated
`<title>` and `<h1>`; no full reload.

**Two defects found and fixed during this pass:**

1. **Self-hosted fonts were unusable.** The seven `public/fonts/**/*.woff2` files from Phase 02
had their outline tables stripped (`glyf`/`loca` absent), so Chromium logged `OTS parsing error: no
supported glyph data table(s) present` and rendered every heading in the fallback serif. Replaced
with three variable, latin-subset faces generated from the upstream Google Fonts sources
(Newsreader roman + italic, Archivo) and declared with weight ranges in `src/styles/tokens.css`.
All three now report `status: "loaded"`, which also restores `font-optical-sizing: auto`.
2. **Project pages crashed on the first published entry.** `src/lib/content.ts` assumed
`entry.slug`, which Astro 5+ no longer exposes, so `getStaticPaths` emitted
`params: { slug: undefined }` — invisible while every project was a draft. The slug is now derived
once in `withSlug()` from the entry id (falling back to a legacy `slug`), and
`getFeaturedProjects()` carries it too.

**Design review pass** (`impeccable`, 2026-11-15): detector clean after replacing the 3 px coral
rule on the pull quote with 1 px; contrast re-checked for every text token on all three surfaces
(`--muted` 8.05:1 worst case, `--blue-text` 6.26:1 on `--bg`, all pass AA); the mobile hero no
longer joins sentences when the `<br>` elements collapse; the Contact section rule now reports the
record state ("Nothing confirmed yet") instead of repeating the location.

### Phase 03 — content architecture (2026-11-15, v0.4.0)

**Status: DONE.** The structure the owner asked for is in place; the case-study copy and
screenshots are his part. Decisions: `docs/decisions/ADR-005-content-shape.md`.

- [x] `kind: personal | client` — personal and side projects lead `/projects/`, rendered as
  "Personal & side projects" and "Client & product work". Ordering lives in `byDisplayOrder`.
- [x] Experience in Markdown with `YYYY-MM` periods, `location`, `primary` / `additional`.
  Six verified roles transcribed from the CV; About splits them and adds Education.
- [x] Profile carries `yearsExperience`, `availability` and `education[]`; the Home hero strip
  grew from three to four cells (location, experience, work, contact).
- [x] `screenshots[]` on projects, rendered under "Screens", next to `cover`.
- [x] Copy-ready template: `docs/content/templates/project-case-study.md` (+ experience role
  template). Samples in the collection: `orbit-logistics.md`, `dredd.md`, three fictional drafts.
- [x] Reference analysis (`docs/design/REFERENCE-ANALYSIS.md`): what is borrowed from a real
  portfolio's information architecture, and what is refused.
- [x] Charts of record: `CHANGELOG.md` (0.1.0 → 0.4.0, from the board's phase history), project
  version bumped to 0.4.0.
- [ ] Owner: publish the first case study (copy + approved screenshots). Template and samples
  are ready; nothing else blocks it.

**Owner answers applied (v0.5.0):** public email, phone `+505 8759 7244`, CV shown from
`public/cv.pdf` with both pages rendered as linked WebP previews (plus download), and an
"Open to new projects" status line on the Home hero. GrowthOptix and Nativerse overlap on purpose (parallel work);
Nativerse is the owner's own brand and its projects are authored as `kind: personal`.

**Tooling fix in the same pass:** `astro check` crashed on Astro 7.4.12
(`this.bridge.setLastError is not a function`). `@astrojs/language-server` resolved
`@astrojs/astro2tsx@0.1.3`, which pins `@napi-rs/wasm-runtime@1.2.4` against the
`@emnapi/runtime@2.0.0-beta.2` the new compiler installs. Pinned `@astrojs/astro2tsx@0.1.4`
via a pnpm override; `astro check` and `astro build` both pass again. The installed tree also
had to be resynced — it was still on Astro 7.4.5 while the lockfile asked for 7.4.12.

### Phase 03 — sample case studies (2026-11-16, v0.6.0)

**Status: DONE.** The site is no longer an empty shell: four case studies render end to end,
marked as sample content on every surface. This exists so the owner can review the real
layout before his own copy and captures are ready.

- [x] `status: sample` added to the project schema: it publishes the route, keeps
  `contentStatus: placeholder`, and forces a badge/banner so it cannot pass for real work.
- [x] Four sample entries: `signal-desk` and `schema-scout` (personal), `harbor-ledger` and
  `dispatch-board` (client). Full context, contribution, approach, decisions and outcomes.
- [x] Five interface mockups generated in the direction C language (1600×900, WebP, 23–40 KB)
  under `public/images/projects/<slug>/`; alt text says "mockup", never "screenshot".
- [x] `publicAsset()` applied to project covers and screenshots: the base path (`/me`) broke
  every `/images/...` reference after the deployment commit.
- [x] `playwright-evals/responsive-audit.cjs` builds nav selectors from `BASE` so it can run
  under the base path; it passes at 390/834/1440 on all four routes.
- [ ] Owner: replace the samples with real case studies (delete the four files and their
  image folders), then re-run `P04-05` with real captures.

### Phase 03 — reference structure pass (2026-11-16, v0.7.0)

**Status: DONE.** The information architecture of `cesargaray.com` was studied as a reference
(index cards that open into a full case study; problem / solution / AI role / stack / impact;
a contact page that leads with the address; an AI section with skills and a delivery process)
and applied inside direction C. The visual language did not change: navy ground, Newsreader and
Archivo, hairline rules, one accent per job.

- [x] Work index rebuilt as minimal rows: category, title, summary, five stack chips, role,
  period and the link into the case study. Covers and galleries stay on the case-study page.
- [x] Case study restructured: The problem → Solution (numbered capabilities) → Contribution →
  Approach → AI role → Decisions → Stack (grouped by layer) → Impact → Screens → Links. A
  section with no content is omitted, and the contents rail lists only what the page states.
- [x] Schema additions `solution[]`, `aiRole`, `stackGroups[]`, plus the four samples updated:
  Harbor Ledger carries a real AI role; the other three state why the product has no model.
- [x] New `/ai` route: what is built (DREDD, MCP servers, support chatbot), tools in daily use,
  skills by layer, and the six stages of the delivery loop with CV-backed examples. Nav gains AI.
- [x] Contact leads with the email at display size, secondary links beside it, then a meta row
  (location, phone, availability, CV) and the existing CV preview band.
- [x] `LocationPin` component used wherever Managua, Nicaragua appears: Home, About, Contact.
- [x] Home: "All work" link in the Selected work rule and an AI teaser between work and approach.
- [x] The responsive audit covers `/ai/`; 390 / 834 / 1440 pass on all five routes.

Evidence: `pnpm build` → 9 pages; `pnpm check` → 25 files, 0 errors; `pnpm format:check` clean;
`playwright-evals/responsive-audit.cjs` → all checks passed. Screenshots reviewed at 1440 and
390 px for Home, Work, case study, AI and Contact.

### Phase 03 — JSON projects, experience page, landing pass (2026-11-16, v0.8.0)

**Status: DONE.** The owner asked for the portfolio to be easier to fill, for a page like the
reference site's experience section, and for a landing that says more about him.

- [x] **Projects are JSON.** `src/content/projects/<slug>.json` replaces Markdown: one object
  per project, validated by the same schema, with `_template.json` documented and excluded
  from the build. The four existing samples and the six drafts were converted; no prose was
  lost (the Markdown body was never rendered).
- [x] **Two new samples** that also serve as authoring references: `relay-yard.json` (personal,
  a real `aiRole` with the boundary written as a product decision) and `yard-capacity.json`
  (client, no model, concurrency solved by a database constraint).
- [x] **`/experience`**: full chronology, six roles newest first, sticky period rail, grouped
  chips, education and a closing band. About now previews the three most recent roles and
  links to the record instead of duplicating it.
- [x] **Navigation** reads Projects, AI, Experience, About, Contact. `/projects/` is titled
  "Projects, in detail" and no longer calls itself "Selected work".
- [x] **Home** gains a verified impact row (18 s → 1 ms, ~96% across 35K+ sync jobs, 340+
  databases, ~1.7M events — all from the CV), a three-role experience strip, and the AI teaser
  now names DREDD.
- [x] **AI page**: DREDD is the feature, with the five-step review loop and the human approval
  at the end, plus "How I read my own projects" (schema first, failure paths, evidence).
- [x] **Craft pass**: sticky translucent header, course-style link underlines, aqua section
  ticks, index rows that tint with a left accent, scroll reveal that degrades to static
  markup without JavaScript or under reduced motion, anchor offsets for the sticky header.

Evidence: `pnpm build` → 12 pages; `pnpm check` → 0 errors; `pnpm format:check` clean;
`playwright-evals/responsive-audit.cjs` covers six routes and passes at 390/834/1440; the
reveal was verified in Chromium after scrolling, and the mobile menu and index hover were
inspected in screenshots.

## Phase 04 — Quality assurance

**Status: IN PROGRESS**

- [x] P04-02 Inspect tablet and mobile rendering  *(834px and 390px nav check — `playwright-evals/responsive-audit.cjs`)*
- [x] P04-03 Run accessibility checks  *(skip link, focus states, reduced motion — `playwright-evals/responsive-audit.cjs`)*
- [x] P04-04 Verify SEO and social metadata
- [x] P04-06 Run type checks, tests, lint, and production build  *(pnpm check: 21 files, 0 errors; pnpm build: 4 pages; pnpm format:check: clean)*
- [ ] P04-05 Verify image loading and optimization  *(blocked on real screenshots — no image is
  published yet; the plates are inline SVG)*
- [ ] P04-07 Fix and re-check all critical/high findings  *(nothing open; run again after the
  first case study lands)*

## Next queue (ordered)

Priority is the content structure first, then release hardening. Each item is small and
independently verifiable.

1. **P03-07 — first published case study.** Owner copy + approved screenshots; unblocks
   image verification and gives the Work page its real density.
2. **P04-05 — image pipeline.** Cover 1600×900 under 300 KB, WebP/AVIF, `width`/`height` to
   avoid layout shift, alt text reviewed. Only measurable with real files.
3. **P04-07 — re-run the audit** on all five routes including one published case study.
4. **P05-01 — environment and build documentation** (Node ≥ 22.23.4, pnpm, `PUBLIC_SITE_URL`).
5. **P05-02 — deployment options** (static host; `astro preview` is not production).
6. **P05-03 — production build and route verification** against the chosen host.
7. **P05-04 — final QA evidence** (screenshots at three widths, link check, metadata).
8. **P05-05 — V2 CMS migration notes** (the `src/lib/content.ts` seam and the field contract).

Owner decisions still open: portrait, the Approach paragraph in his own words, and the first
real case study. Contact channels and the CV are resolved. Tracked in
`docs/content/CONTENT-GAPS.md`.

## Phase 05 — Release

- [ ] P05-01 Document environment and build commands
- [ ] P05-02 Document deployment options
- [ ] P05-03 Verify production build and routes
- [ ] P05-04 Capture final QA evidence
- [ ] P05-05 Prepare V2 CMS migration notes

Gate: owner approves public release.

## Rules

- Record evidence and commit/PR references for completed tasks.
- Never fabricate content or mark unverified work complete.
- Keep tasks small and independently verifiable.
- Record blockers and decisions in `docs/`.

## Phase 03 — Import resolution decisions

**Decision ADR-004 (August 2026): Use `@/` alias for module imports in `src/pages/projects/`.**

**Problem:** The `astro check` (TypeScript) and Vite could not resolve relative imports (`../lib/content`, `../config/site`, `../styles/base.css`) from pages in `src/pages/projects/` and `src/pages/projects/[slug]/`. The same imports resolved correctly from `src/pages/index.astro` at the same path depth. After 2 hours of debugging (`astro check` module resolution, Vite `UNRESOLVED_IMPORT`, `tsconfig.json` include patterns), the root cause was identified as Astro 7's language server/Volar handling of the `src/pages/projects/` route directory.

**Solution:** Changed all relative imports in `src/pages/projects/` to absolute imports using the `@/` path alias (`@/lib/content`, `@/config/site`, `@/styles/base.css`). Added `baseUrl` and `paths` to `tsconfig.json`.

**Verification:** `pnpm build` → `4 page(s) built`; `pnpm check` → `0 errors, 0 warnings, 3 hints`. **PASSED.**

**Side effect:** The `Project` type in `src/lib/content.ts` was extended to `ProjectWithSlug` (adding `slug: string`) so that pages building slug-based URLs compile correctly.

**Recorded:** <!-- ADR-004 -->
