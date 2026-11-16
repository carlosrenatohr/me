# Changelog

Versions are internal milestones of this portfolio, not public releases. Dates come from
`board.md`; the reasoning behind each phase lives in `docs/`.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). The project
version in `package.json` matches the newest entry.

## [0.6.0] — 2026-11-16

Sample case studies, so the Work section can be reviewed with real pages instead of an empty
index.

### Added

- `status: sample` on projects: renders Home, `/projects/` and a case-study route while keeping
  `contentStatus: placeholder`. A badge in listings and a banner on the case study mark it; no
  live URL is published for a sample.
- Four sample entries — `signal-desk`, `schema-scout` (personal) and `harbor-ledger`,
  `dispatch-board` (client) — with the full narrative, decisions and outcomes structure.
- Five 1600×900 interface mockups in `public/images/projects/`, generated in the site's own
  visual language and labelled as mockups in their alt text (23–40 KB each).
- `sample-notice` on Home and Work; single-screenshot galleries now span the reading measure.

### Fixed

- Project covers and screenshots go through `publicAsset()`: with the site built under a base
  path (`/me`), every `/images/...` reference 404'd and the pages rendered alt text only.
- `playwright-evals/responsive-audit.cjs` derives the nav selector from `BASE`, so the
  client-navigation check works when the site is not served from the domain root.

## [0.5.0] — 2026-11-15

Contact channels and availability, from the owner's answers.

### Added

- Phone `+505 8759 7244` on the profile and the Contact page, as a `tel:` link.
- `public/cv.pdf` served through `cvPath`, with both pages rendered as WebP previews that
  link to the PDF, plus a direct download. No embed library or third-party frame, and the
  preview works in browsers without an inline PDF viewer.
- Availability status line on the Home hero (coral dot, hairline pill), driven by
  `profile.availability`.

### Changed

- Availability copy is "Open to new projects": a state, not a job-board phrase.
- Contact grid is two columns so four channels sit evenly.

### Note

- GrowthOptix and Nativerse overlap in the CV on purpose: the work was parallel. Nativerse
  is the owner's own brand; its projects are authored with `kind: personal`.

## [0.4.0] — 2026-11-15

Content structure built from the owner's CV, plus the tooling fixes it exposed.

### Added

- `kind: personal | client` on projects. Personal and side projects are listed first on
  `/projects/`, in two labelled sections.
- Experience moved from JSON fixtures to Markdown (`src/content/experience/`), with
  `YYYY-MM` periods, `location`, `primary` / `additional` groups and one template.
- Six verified roles and the UNI degree, transcribed from `Carlos_Hernandez_CV (0).pdf`
  (2026-11-12).
- `yearsExperience`, `availability`, `education[]` on the profile; the Home hero strip now
  carries experience and the About page carries education.
- `screenshots[]` on projects (rendered as "Screens") next to the existing `cover`.
- Copy-ready templates: `docs/content/templates/project-case-study.md` and
  `docs/content/templates/experience-role.md`.
- `docs/design/REFERENCE-ANALYSIS.md` — what this portfolio borrows from a reference
  portfolio's information architecture, and what it refuses to borrow.
- `ExperienceCard` component; `formatMonth` / `formatPeriod` / `getExperienceGroups` in the
  content repository.

### Changed

- `PROJECT-AUTHORING.md` and `CONTENT-MODEL.md` rewritten around the template, the samples
  and the publication gates.
- Home hero strip expanded from three to four cells (location, experience, work, contact).
- The About page lists experience in two groups and education in its own section.

### Fixed

- `astro check` crashed on Astro 7.4.12 with `this.bridge.setLastError is not a function`.
  Root cause: `@astrojs/language-server` resolved `@astrojs/astro2tsx@0.1.3`, which pins
  `@napi-rs/wasm-runtime@1.2.4` against an `@emnapi/runtime@2.0.0-beta.2` that the compiler
  now installs. Pinned `@astrojs/astro2tsx@0.1.4` (declares `@emnapi/runtime@1.11.3`
  directly) through a pnpm override.
- `node_modules` was still on Astro 7.4.5 while the lockfile requested 7.4.12; reinstalled
  so the tree matches the lockfile.

## [0.3.0] — 2026-11-15

The public site, direction C, implemented end to end.

### Added

- `BaseLayout` with container, skip link, collapsing navigation (`<details>` under 900 px)
  and a footer fed by profile data.
- `ProjectFeature`, `ProjectPair`, `Plate`, `NavLinks`; the full direction C primitive
  system ported into `src/styles/primitives.css`.
- Five routes: home, projects, project case study, about, contact — plus `robots.txt` and
  `sitemap.xml` generated as endpoints from `SITE.origin`.
- Static multipage navigation with `<ClientRouter />`, prefetch on viewport and the document
  marker preserved across navigations.
- `playwright-evals/responsive-audit.cjs`: 4 routes × 3 viewports, overflow, navigation
  state, font resolution and client-side navigation.
- Project drafts, `PROJECT-AUTHORING.md` and the `withSlug()` helper for Astro 5+ ids.

### Fixed

- Every self-hosted `.woff2` was unusable (no `glyf`/`loca` tables; Chromium rejected them
  with `OTS parsing error`). Replaced with three variable latin-subset faces generated from
  the upstream Google Fonts sources.
- Case-study builds crashed with `Missing parameter: slug` as soon as a project was
  published, because `entry.slug` no longer exists in Astro 5+.
- Mobile hero joined sentences when the `<br>` elements were hidden; Contact repeated the
  location in its section rule.
- Pull-quote rule reduced from 3 px to 1 px after the design review flagged it.

## [0.2.0] — 2026-11-03

Design foundation and the approved direction.

### Added

- `PERSONAL-DESIGN-PROFILE.md`, `DESIGN.md`, the token set in `src/styles/tokens.css` and
  the direction comparison with three explored directions.
- `design-lab/` with the three directions (night ledger, systems blueprint, vibrant
  editorial) and their evidence captures.
- Contrast, focus, reduced-motion and typography checks recorded on the board.

## [0.1.0] — 2026-11-03

Repository, tooling and architecture.

### Added

- Astro 7 project with TypeScript, Prettier (`prettier-plugin-astro`), pnpm, and
  `pnpm build` running `astro check && astro build`.
- Content model, collections and the repository layer (`src/lib/content.ts`) that keeps
  presentation independent of the storage.
- Board, product vision, requirements and the ADR log (`docs/decisions/`).
