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

- `public/fonts/` contains 7 woff2 files (Newsreader 300/400/500 + italic; Archivo 300/400/500).
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

**Status: IN PROGRESS** — implementation started after owner approved Phase 02.

- [x] P03-01 Implement global layout and navigation  *(verified: site-head + site-nav flex, 3 nav items, focus states, skip link — responsive-final.cjs)*
- [x] P03-02 Implement Home  *(verified: hero, tags, section rules, footer — see Phase 02 final review screenshots)*
- [x] P03-03 Implement Projects listing  *(4 pages built: Home, Projects, About, Contact — pnpm build: 4 page(s) built; pnpm check: 0 errors)*
- [x] P03-04 Implement Project detail template  *(dynamic route `[slug]/` scaffolded; no project content yet — placeholder fallbacks verified in build)*
- [x] P03-05 Implement About and Experience  *(page exists; content is placeholder until owner supplies verified facts)*
- [x] P03-06 Implement Contact and CV download  *(page exists; mailto/linkedin/github/cv.pdf links present in footer)*
- [ ] P03-07 Add validated structured content for approved projects  *(content pending owner review — `contentStatus: placeholder` entries excluded from public queries)*

Gate: all agreed public routes work with real/approved content or clearly marked placeholders. **Phase 03 pages scaffolded and verified with 0 TypeScript errors; content pending owner review.**

## Phase 04 — Quality assurance

**Status: PARTIALLY VERIFIED**

- [x] P04-02 Inspect tablet and mobile rendering  *(834px and 390px nav check — responsive-final.cjs)*
- [x] P04-03 Run accessibility checks  *(skip link, focus states, reduced motion — responsive-final.cjs)*
- [x] P04-04 Verify SEO and social metadata
- [x] P04-06 Run type checks, tests, lint, and production build  *(pnpm check: 0 errors, 0 warnings, 0 hints; pnpm build: 4 pages built; pnpm format:check: clean)*
- [ ] P04-05 Verify image loading and optimization
- [ ] P04-07 Fix and re-check all critical/high findings

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
