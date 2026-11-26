# Changelog

Versions are internal milestones of this portfolio, not public releases. Dates come from
`board.md`; the reasoning behind each phase lives in `docs/`.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). The project
version in `package.json` matches the newest entry.

## [Unreleased]

Content correction following the owner's addendum. Not committed or deployed.

### Changed

- GrowthOptix role corrected to Mid Backend Developer, with the CV mismatch recorded as an open
  owner action.
- The GrowthOptix case study now covers the Gox Analytics service, the advertising integrations
  and the 7-day post-click attribution work, grouped by service.
- HIT Cargo context now reflects the public service catalogue (USA/China/Panama imports, air and
  sea, Miami locker, customs, door-to-door) read from `hit-landing`.
- Orbit records target users, the architecture-review stance and the unresolved public reference.

### Added

- A single closed accordion for the secondary projects on the home page and the projects index;
  drafts appear as labelled, unlinked rows.
- An interactive portrait on About: illustration first, photograph on hover, tap or keyboard, with a
  pinned state and `aria-pressed`.

### Changed

- Public identity is now Product Engineer, with a first-person profile rewritten around building
  products with the people who use them. Historical job titles are unchanged.
- The display name is read from `SITE.name` and is now Carlos R. Hernandez everywhere it appears.
- Page titles and descriptions follow the new identity and name.

### Removed

- All unvalidated GrowthOptix figures from the project page, the experience entry, the home page,
  the skills proofs and the AI page.
- The three HIT Cargo screenshots from `public/`; moved to `docs/evidence/hit-cargo/` pending
  individual approval.

## [0.11.0] — 2026-11-25

Products lead the portfolio, the six fictional samples are gone, and every published project
says what backs it. Audit and truth matrix: `docs/PORTFOLIO-CONTENT-AUDIT.md`.

### Added

- Ten published projects in three shelves: Orbit Logistics, HIT Cargo and DREDD as featured
  products; Mi Lexio, Ranita Leopardo, Nalu, Agent Harness and the Webhook Attribution Pipeline
  as open-source experiments; GrowthOptix and BEON Tech Studio as professional case studies.
- `collection` and `productStatus` fields on the project schema, plus `evidenceNote`.
- An "Evidence" section on every case study, followed by its confidentiality note.
- HIT Cargo case study with the repository's own panel screenshots, converted to WebP.
- `docs/PORTFOLIO-CONTENT-AUDIT.md`: sources, truth matrix, decisions, validation and limitations.

### Changed

- Home order: featured products, open source, experience, platform context, AI, approach.
- `/projects/` is grouped by shelf and is indexable again; the sitemap now lists 17 URLs.
- Project pages show a product-status label and format periods as `Aug 2025 — Aug 2026`.
- A featured product without approved art renders as a typographic block, not a full-screen
  placeholder plate.
- Profile headline and the About approach now use the agreed positioning.
- GrowthOptix figures are labelled as platform-level and moved below the professional record.

### Removed

- The six fictional sample case studies, three internal draft placeholders and their image
  folders, plus the homepage and index sample notices.

## [0.10.0] — 2026-11-25

The site now states who it is to crawlers, and stops presenting demonstration work as delivered
work. Audit, research and results: `docs/SEO-OPTIMIZATION-REPORT.md`.

### Added

- Structured data: one JSON-LD `@graph` per page with `WebSite` and a single `Person` entity
  (`sameAs`, `address`, `knowsAbout`, `alumniOf`), plus `ProfilePage`, `CollectionPage`,
  `ContactPage`, `CreativeWork` and `BreadcrumbList` on the pages where each is accurate.
- A 1200×630 Open Graph card (`public/og/carlos-renato.jpg`) generated from the site's own faces
  and palette by `scripts/generate-og.mjs` (`pnpm og`).
- `og:image`, `twitter:image` and their dimensions/alt text; `twitter:card` upgraded to
  `summary_large_image`; `author`, `theme-color` and `max-image-preview:large`.
- The home page names the owner and the role in a masthead line beside the availability pill.
- `docs/SEO-OPTIMIZATION-REPORT.md`: the audit, external research with sources, keyword tiers,
  before/after metadata, validation evidence, limitations and a 30/60/90 roadmap.

### Changed

- Titles and descriptions rewritten around one identity — Senior Software Engineer, backend
  systems, distributed integrations and data platforms — unique per route, 47–60 and 70–164
  characters.
- The wordmark reads `Carlos Renato`, matching the title, the schema and the sitemap.
- Contact: the CV band label is a real `h2` instead of a paragraph used as a label.
- Long project summaries are clamped at a word boundary for the meta description.
- Project Stack sections link to `/skills/`; About links to the stack.
- Typography: removed the duplicated `@font-face` block and its `@import`, removed 384 KB of
  unreferenced font copies from `public/fonts/`, and preloaded the two faces used above the fold.

### Fixed

- `robots.txt` advertised `https://carlosrenatohr.github.io/sitemap.xml`, which does not exist.
  It now points at the base-aware `/me/sitemap.xml`.
- The six fictional sample case studies are `noindex` and no longer in the sitemap; the work index
  is `noindex` until it contains a real published project, and becomes indexable by itself then.
- The home meta strip says `6 sample projects` instead of counting demonstration entries as
  delivered work.

## [0.9.0] — 2026-11-25

The stack got a page of its own, drawn as a diagram instead of a logo wall, and became data.

### Added

- `/skills`: six layers from the interface down to the runtime, one vertical spine with a node
  per layer, a hero index that links into each one, and a core-tool line drawn from the CV.
- `src/content/skills/*.json`: one file per layer (`title`, `layer`, `order`, `summary`,
  `proof`, `items[]`). The core set and the counts are computed by the page.
- Navigation reads Projects / AI / Skills / Experience / About / Contact; the sitemap and the
  responsive audit include the new route.

### Changed

- AI page: the duplicated skill grid is replaced by a short pointer to `/skills`.
- The full stack is described by where each tool does its work, with CV-backed evidence per
  layer, instead of chips grouped only by category.

## [0.8.0] — 2026-11-16

Projects became data, the professional record got its own page, and the landing page states
who the owner is before it lists work.

### Added

- `/experience`: every verified role newest first, with dates, location, scope, contributions,
  technologies and education. The About page previews three roles and links to it.
- Two sample case studies in the new format: `relay-yard` (personal, with a real AI role) and
  `yard-capacity` (client, no model).
- Landing: a verified impact row and a three-role experience strip.
- AI page: DREDD as the featured system with its five-step review loop, and a section on how
  the owner reads and analyses his own projects.

### Changed

- Projects are authored as JSON (`src/content/projects/<slug>.json`) with a documented,
  build-excluded `_template.json`. The Markdown project files were converted.
- Navigation is Projects / AI / Experience / About / Contact; the index is titled "Projects,
  in detail" instead of "Selected work".
- The header is sticky, section headings carry an aqua tick, index rows respond on hover, and
  links underline on hover. Sections fade in on scroll only when JavaScript is available and
  reduced motion is not requested.
- Anchor targets and the case-study contents rail clear the sticky header.

### Removed

- `docs/content/templates/project-case-study.md`; the JSON template in the content folder is
  now the single source for a new project.

## [0.7.0] — 2026-11-16

The structure of the work and contact pages follows a reference portfolio that also states AI
work, skills and how the owner contributes to a team.

### Added

- `/ai`: what is built with AI (DREDD, MCP servers, support chatbot), tools used daily, skills
  grouped by layer, and the six stages of the delivery loop, each with an example from the CV.
  The route is in the navigation and in the sitemap.
- `solution[]`, `aiRole` and `stackGroups[]` on projects. The case study renders the problem,
  the solution capability by capability, the AI role, the grouped stack and the impact.
- `LocationPin` on Home, About and Contact wherever the location is written.
- Home: "All work" link in the Selected work rule and an AI teaser linking to `/ai`.

### Changed

- The work index is a list of minimal rows instead of a gallery: cover, screenshots and the
  full argument live on the case-study page.
- Case-study sections with no content are omitted and the contents rail follows, instead of
  showing placeholders. `context` now renders as "The problem" and `outcomes` as "Impact".
- Contact leads with the email address, with profiles and CV beside it, and a meta row for
  location, phone, availability and CV. The CV preview band is unchanged.
- The responsive audit covers `/ai/` as well.

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
