# Portfolio Content Audit — Product-First Rebuild

**Date:** 2026-11-25
**Scope:** project inventory, content truth, information architecture, positioning and the SEO
changes that follow from them.
**Companions:** `docs/MASTER_PROMPT_PORTFOLIO_REBUILD.md` (brief),
`docs/PORTFOLIO_CONTENT_SOURCE_OF_TRUTH.md` (content source of truth),
`docs/SEO-OPTIMIZATION-REPORT.md` (baseline and technical SEO),
`CHANGELOG.md` (release record).

This document records what was verified, what was changed and what is still an owner decision.
It does not claim rankings, traffic or conversion results: none were measured.

---

## 1. Initial state and evidence

Before this pass the public work section contained six fictional sample case studies (Signal
Desk, Schema Scout, Relay Yard, Harbor Ledger, Dispatch Board, Yard Capacity) and three draft
entries. The samples were `noindex` after the SEO pass but still occupied the homepage, the
projects index and the case-study layout, and they were the only populated work section.

Every project claim below was checked on 2026-11-25 against:

| Source | Used for |
| --- | --- |
| `carlosrenatohr/hit-landing`, `hit-ever`, `hit-panel` READMEs and source tree | HIT Cargo architecture, stack, ingestion, access control |
| `https://hit-cargo.com` (live) | HIT Cargo is an operating business |
| `carlosrenatohr/dredd-ai-workflow` (README template, `review.sh`, `dredd-init`) | DREDD workflow, roles, metrics, provider-agnostic review |
| `carlosrenatohr/agent-harness` README | Agent Harness purpose, gate, bounded loop, evals |
| `carlosrenatohr/webhook-attribution-pipeline` README | Demonstration scope and disclosure |
| `carlosrenatohr/dreading-pwa`, `dreading-api` READMEs; `dreading-pwa.pages.dev` (live) | Mi Lexio / daily-readings PWA |
| `carlosrenatohr/rana-leopardo` README; `rana-leopardo.pages.dev` (live) | Ranita Leopardo |
| `carlosrenatohr/nalu-app` README; `nalu-api.nativerse.workers.dev` (live) | Nalu |
| `https://www.growthoptix.com/` (live) and the published CV | GrowthOptix platform context |
| Public GitHub account and repository list | Which repositories exist, their descriptions and languages |

Not verifiable in this environment: private repositories, carrier portals, employer source code,
Search Console, analytics, and the `codebase-memory` MCP (not connected).

---

## 2. Content truth matrix

| Claim | Source | Confidence | Public-safe | Action |
| --- | --- | --- | --- | --- |
| HIT Cargo moves packages between the US and Nicaragua | Repos + live site | Verified | Yes | Publish |
| HIT Cargo tracking reads InsForge/Postgres instead of scraping per request | `hit-ever` README | Verified | Yes | Publish |
| Ingestion is serialized because the upstream allows one session | `hit-ever` README | Verified | Yes | Publish |
| The panel is static and access is enforced by PostgreSQL RLS + `SECURITY DEFINER` | `hit-panel` README | Verified | Yes | Publish |
| Panel screenshots show test data, not real shipments | `hit-panel` README | Verified | Yes, labelled | Publish with caption |
| Orbit Logistics is a subscription platform for freight-forwarding operations with web apps, backend services and role-based data access | Published CV / Nativerse role | Verified at CV level | Yes | Publish as an in-development product entry |
| Orbit tenancy model, modules, billing or RLS implementation | None found | Not supported | — | Omit |
| DREDD coordinates parallel code and security reviews with severity and evidence | CV + `dredd-ai-workflow` templates | Verified | Yes | Publish |
| DREDD start/end dates | CV says "over a year", no calendar dates | Not supported | — | Omit |
| Agent Harness gate owns phase advancement and the loop is bounded | Repository README | Verified | Yes | Publish |
| Webhook Attribution Pipeline is a sanitized, from-scratch demo with synthetic data | Repository README | Verified | Yes, with disclosure | Publish with disclosure |
| Mi Lexio is a Spanish daily-readings PWA with offline reading and labelled generated reflections | `dreading-pwa` README + live deployment | Verified | Yes | Publish; naming caveat below |
| Ranita Leopardo is a dependency-free Canvas game with its own physics and six levels | Repository README + live deployment | Verified | Yes | Publish |
| Nalu is an offline-first business app using React, Express, Drizzle and D1 | Repository README + live app | Verified | Yes | Publish |
| Buko exists and has a described purpose | No repository, deployment or brief detail found | Not supported | — | Keep as draft |
| GrowthOptix platform figures (340+ databases, ~1.7M events, ~96% across 35K+ jobs) | Published CV | Verified, platform-level | Yes, attributed | Publish as platform context |
| GrowthOptix contact-profile read 18 s → 1 ms | Published CV | Reported, methodology undocumented | Yes, with caveat | Publish with caveat; not used as a homepage stat |
| BEON leadership, AWS, APIs and support chatbot | Published CV | Verified | Yes | Publish as an aggregate case study |
| Employment dates, including the Upwork/724 Media overlap | Published CV | Verified | Yes | Preserve unchanged |

---

## 3. Projects added, retired and kept in draft

Published (10):

| Shelf | Order | Project | Product status |
| --- | --- | --- | --- |
| Featured products | 1 | Orbit Logistics | In development |
| Featured products | 2 | HIT Cargo | Live |
| Featured products | 3 | DREDD | Live |
| Open source & experiments | 1 | Mi Lexio | In development (early MVP) |
| Open source & experiments | 2 | Ranita Leopardo | Live |
| Open source & experiments | 3 | Nalu | Live |
| Open source & experiments | 4 | Agent Harness | Live |
| Open source & experiments | 5 | Webhook Attribution Pipeline | Demonstration |
| Professional case studies | 1 | GrowthOptix | — |
| Professional case studies | 2 | BEON Tech Studio | — |

Retired: the six fictional samples, their internal draft placeholders and their image folders.
No sample content, mockup caption or `[DRAFT]` marker remains in the built HTML. Old sample URLs
now return the host's 404; GitHub Pages serves static files, so a redirect is not possible without
host-level configuration, and none was added.

Draft: `draft-buko.json`. The owner brief lists Buko as an open-source experiment, but the public
GitHub account, its repository list and the Nativerse subdomains contain no Buko repository or
deployment. It stays hidden until the owner supplies a link or description.

### Decisions that go beyond the brief's ordering

- **Orbit leads as the owner requires, but as a short product entry.** No public repository or
  demo exists, so a detailed architecture page would have to invent modules, tenancy or billing.
  The source of truth explicitly allows a short in-progress entry in this case. The page states
  the product shape, the role and the missing evidence.
- **DREDD is third, and is not described with Agent Harness's implementation.** They share an
  interest in gated workflows but the public evidence is different: DREDD is a review workflow
  scaffolded per repository; Agent Harness is a portable CLI with a deterministic gate.
- **Agent Harness and the Webhook demonstration stay published after the four named experiments.**
  The addendum fixes the order of Mi Lexio, Ranita Leopardo, Nalu and Buko, and that order is
  preserved. Removing two well-evidenced projects to keep the shelf at four would lose real work;
  they appear after the four and keep the same compact treatment. Buko, when evidenced, takes
  position 4 and pushes them down.
- **Mi Lexio naming.** The owner brief names the product Mi Lexio. The public deployment is
  branded "Lectura del día" and the code lives in the `dreading-*` repositories.
  `milexio.nativerse.space` did not resolve on 2026-11-25, so that URL is not published; the
  record states the naming relationship instead of implying two products.

---

## 4. Experience and CV consistency

The six experience entries already matched the published CV and were left factually unchanged:
Nativerse (Mar 2026 — present), GrowthOptix (Aug 2025 — Aug 2026), BEON Tech Studio (Jul 2017 —
Mar 2025), 724 Media (Nov 2016 — Jul 2017), Upwork (May 2015 — Jul 2017) and Spark Coders (May
2014 — Apr 2015). The Upwork/724 Media overlap is preserved deliberately.

The professional case studies now carry the same period strings and attribute platform-level
figures to the platform rather than to one engineer. The 18 s → 1 ms claim is published with an
explicit note that its measurement conditions are not documented, and it is no longer used as a
homepage statistic.

---

## 5. Positioning and information architecture

One identity across the site: **Senior Software Engineer — backend systems, distributed
integrations and data platforms**, with AI-assisted engineering as a differentiator rather than
the main identity.

Home order: hero → featured products → open source & experiments → experience → platform context
→ AI & automation → approach. Products lead; employment supports. The GrowthOptix statistics
moved below the professional record and the section now says the figures describe the platform.

Projects index: three labelled shelves instead of one list, in the owner's order. Featured
products get the wide block; experiments use compact rows; professional case studies keep the
index-row layout and an explicit confidentiality line.

Case-study pages gained a product-status label (`Live`, `In development`, `Demonstration`) and an
**Evidence** section that names what backs the page, followed by the confidentiality note. Missing
role, period, surface or stack rows are omitted instead of rendering `[to confirm]`.

About: the working-philosophy placeholder was replaced with a stated approach drawn from the
record — ownership through production, integration and data correctness, smaller bounded
systems, and AI with a non-optional review gate.

A featured product without a real screenshot now renders as a typographic block instead of a
full-screen abstract plate with an "Image placeholder" label. The pair row keeps the abstract
plate, which is part of the established visual language, without the label.

---

## 6. Technical SEO changes

Preserved from 0.10.0: the JSON-LD `@graph`, one shared `Person`, `WebSite`, unique
titles/descriptions, canonical URLs, the 1200×630 social card, Twitter metadata, font preloads
and the base-aware `/me/` paths.

Changed by this pass:

- `src/content.config.ts`: `collection` (`featured` | `open-source` | `professional`) and
  `productStatus` (`live` | `in-development` | `demo` | `archived`) added; `evidenceNote` added.
- `src/lib/content.ts`: ordering by shelf, and `getProjectGroups()` for the three-shelf index.
- `/projects/` is indexable again because it now lists ten verified projects. The sitemap went
  from 6 to 17 URLs: seven routes plus ten project pages.
- Every published project carries `CreativeWork` + `BreadcrumbList`; no sample exists to need the
  noindex branch.
- Project meta descriptions are still clamped at a word boundary; project titles now name the
  collection noun (`project` or `case study`).
- `src/lib/seo.ts`: employer case studies no longer claim `Person` authorship; personal and
  open-source work still does.
- HIT Cargo images are the repository's own panel screenshots, converted to 1600×900 WebP
  (189 KB total instead of 640 KB of PNG) and captioned as test data.
- The responsive audit now includes `/projects/hit-cargo/`.

Structured data still does not claim Orbit capabilities, DREDD dates or GrowthOptix ownership
beyond the visible copy.

---

## 7. Skills and tools used

- `commit` (house style): Conventional Commits, no attribution trailer, progressive commits.
- SEO skill set installed in the previous pass (`seo-audit`, `keyword-research`,
  `competitor-analysis`, `seo-report`, `ai-visibility-audit`, and others in `.agents/skills/`):
  their methodology informed the earlier technical audit; their MCP data source is still not
  connected, so no SERP, volume or backlink data is used here.
- `impeccable` / `frontend-design` guidance: visual hierarchy and the product-first presentation.
- Astro content collections, Zod, Prettier, Playwright.

`codebase-memory` was requested but is not available as a connected tool in this environment, so
verification used the public repositories and their READMEs instead.

---

## 8. Files changed

Content and model:

- `src/content.config.ts`, `src/lib/content.ts`, `src/content/projects/_template.json`
- `src/content/projects/*.json`: 10 published records, 1 draft (`draft-buko.json`)
- `src/content/profile/profile.json`
- deleted: six sample records, three draft placeholders and four sample image folders
- `public/images/projects/hit-cargo/{dashboard,detail,reports}.webp`

Presentation:

- `src/pages/index.astro`, `src/pages/projects/index.astro`,
  `src/pages/projects/[slug]/index.astro`, `src/pages/about.astro`
- `src/components/ProjectCompact.astro` (new), `ProjectFeature.astro`,
  `ProjectPair.astro`, `ProjectIndexItem.astro`
- `src/styles/primitives.css`
- `src/pages/sitemap.xml.ts` (comment), `playwright-evals/responsive-audit.cjs`

Documentation:

- `docs/PORTFOLIO-CONTENT-AUDIT.md` (this file)
- `docs/content/CONTENT-MODEL.md`, `docs/content/PROJECT-AUTHORING.md`,
  `docs/content/CONTENT-GAPS.md`
- `docs/SEO-OPTIMIZATION-REPORT.md` (update note), `docs/product/requirements.md`,
  `CHANGELOG.md`, `board.md`, `package.json`

---

## 9. Validation

```
pnpm check        → 30 files: 0 errors, 0 warnings, 0 hints
pnpm build        → 17 pages built
sitemap.xml       → 17 canonical URLs (7 routes + 10 projects)
robots.txt        → Sitemap: https://carlosrenatohr.github.io/me/sitemap.xml
built HTML        → no "sample case study", "to confirm", "[DRAFT]" or "Sample content"
meta robots       → index, follow, max-image-preview:large on every public page
responsive audit  → OK — all checks passed, 8 routes × 390/834/1440
SPA navigation    → title updates without a full reload
screenshots       → home desktop/mobile, projects index, HIT Cargo, GrowthOptix reviewed
```

Visual review found and fixed two issues: the oversized placeholder plate on a coverless featured
product, and raw `YYYY-MM` periods on project pages.

---

## 10. Known limitations and owner decisions

1. **Orbit has no public implementation evidence.** The page is intentionally short. Publishing
   architecture, modules or tenancy requires a demo, repository or owner-approved detail.
2. **Buko is unpublished.** It needs a repository, deployment or description.
3. **HIT Cargo dates and personal-vs-team ownership** are not established. The page states the
   role at product level and publishes no date range.
4. **DREDD dates** are omitted; the CV only says "over a year".
5. **GrowthOptix disclosure.** Employer permission for the case-study depth is assumed from the
   published CV; no employer code, customer or private schema is shown. Confirm if the 18 s → 1 ms
   claim should be dropped entirely.
6. **Screenshots** are the public repository's test-data captures. Confirm they remain approved.
7. **Mi Lexio naming** is an owner-brief name, not the deployment brand.
8. **Old sample URLs** 404. No redirect exists on GitHub Pages.
9. **Search Console, Bing Webmaster and field Core Web Vitals** were not available.
10. **Orbit leads visually with no image.** Approved product art or a safe demo screenshot would
    strengthen the first screen.

---

## 11. External steps that need owner access

1. Submit `https://carlosrenatohr.github.io/me/sitemap.xml` in Google Search Console and Bing
   Webmaster Tools; request indexing for `/projects/` and the three featured products.
2. Check the Pages/URL inspection report for the retired sample URLs and confirm they are gone
   rather than redirected.
3. Connect analytics only if the owner wants measurement; the site ships none.
4. If a custom domain is approved, update `SITE.origin` / `PUBLIC_SITE_URL` and re-submit.

---

## 12. Roadmap

**30 days**

- Get Orbit evidence: a safe demo, a repository, or owner-approved architecture notes.
- Add Buko evidence or keep it out of the portfolio.
- Submit the sitemap and inspect indexing for the ten project pages.

**60 days**

- Add project-specific Open Graph images for the three featured products (real UI, not mockups).
- Add a custom 404 that links to the six main routes.
- Measure Core Web Vitals in the field if analytics is approved.

**90 days**

- Deepen HIT Cargo with a redacted architecture diagram that matches the code.
- Decide whether professional case studies should expose more of the GrowthOptix read-path work,
  subject to employer permission.
- Re-run this audit after any new project is published; the `evidenceNote` rule is the gate.
