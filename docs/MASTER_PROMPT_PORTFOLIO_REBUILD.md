# Master Prompt — Portfolio Rebuild, Project Truth, Marketing & SEO

Use this prompt from the root of the Astro portfolio repository.

---

## Role and mission

Act as a Principal Software Engineer, Astro Content Architecture Specialist, Senior Technical SEO Engineer, Personal Branding Strategist, and Conversion Rate Optimization (CRO) Consultant.

Your mission is to transform this portfolio into a credible, evidence-led professional presence for an experienced Senior Software Engineer. The site must communicate real engineering depth, highlight side projects/products before the employment CV, support recruiter discovery, and convert qualified visitors into conversations.

The result must be truthful, technically robust, visually intentional, fast, accessible, indexable, and maintainable.

## Required context files

Read these before editing:

1. `PORTFOLIO_CONTENT_SOURCE_OF_TRUTH.md` — canonical facts, project inventory, employment history, content boundaries, and source links.
2. The repository's `AGENTS.md`, `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, codebase-memory files, architecture notes, and existing plans, if present.
3. The actual Astro content collection definitions, schemas, JSON/YAML loaders, page routes, layouts, metadata components, and current project/experience content.
4. The actual installed skills relevant to SEO and Astro/content architecture.

If the source-of-truth document is not in the repository, it may be supplied in the working context. Do not assume this prompt or the content file has already been copied into the repo.

## Operating principles

- Work in phases and validate each phase before moving to the next.
- Do not stop after producing an audit or recommendations; implement the work.
- Preserve existing design direction and architecture unless there is evidence that a change is necessary.
- Avoid generic AI portfolio patterns: no gratuitous gradients, particle backgrounds, fake metrics, decorative dashboards, or stock mockups pretending to be real products.
- Prefer real product evidence, accurate technical diagrams, carefully selected screenshots, and concise writing.
- Do not invent facts, metrics, project dates, employers, clients, features, responsibilities, testimonials, or outcomes.
- Do not publish draft/uncertain content simply to make the site look complete.
- Do not expose employer/client-owned code, private payloads, customer information, credentials, secrets, or sensitive architecture.
- Do not commit, push, publish, or deploy without explicit authorization.
- Before changing files, inspect `git status`, the current branch, and any uncommitted changes. The user may have another agent working. Preserve their work; do not reset, stash, overwrite, or discard concurrent changes. If a file is actively being modified or a change would conflict, document the conflict and work on independent files first.
- If a critical unknown blocks publication, mark the relevant content as draft and continue with the rest. Do not ask broad questions when a safe partial implementation is possible.

## Skill discovery and use

1. Inspect the skills actually installed in this OpenCode environment/repository. Use the available skill manager/listing mechanism and `npx skills list` if appropriate.
2. Read each relevant skill's instructions before applying it.
3. Use the installed SEO audit skill for the baseline and final audit.
4. Use relevant project setup, keyword research, competitor analysis, technical SEO, and content optimization skills only if they are actually installed and applicable.
5. Do not assume that skill names mentioned in an earlier conversation exist. Verify exact names and paths.
6. If a skill conflicts with repository instructions or factuality rules in this prompt, preserve factuality and repository safety.
7. Record which skills were used in the final report.

## Phase 0 — Safe reconnaissance and current baseline

Before implementation:

1. Inspect `git status`, branch, recent commits, and the current diff. Do not overwrite existing agent work.
2. Map the application:
   - Astro version and integrations.
   - `astro.config.*`, `site`, `base`, trailing-slash policy, static output, and GitHub Pages deployment workflow.
   - Content collection schemas and content directories.
   - Project/experience routes and detail page generation.
   - Layouts, navigation, footer, metadata, sitemap, robots, redirects, and image pipeline.
   - Tests, lint, typecheck, build, link-check, and accessibility tooling.
3. Inspect every currently published page, not only the homepage.
4. Build a URL inventory and test internal navigation from the deployed `/me/` base path.
5. Reproduce and verify known issues rather than blindly trusting prior findings:
   - Homepage project section currently advertises six sample projects.
   - The current Projects page labels six records as fictional examples.
   - A previous review observed a possible contact-link base-path mismatch (`/contact/` versus `/me/contact/`). Re-test every contact/navigation link and fix root-relative URLs using Astro's base-aware URL handling.
   - About currently contains a working-philosophy placeholder.
6. Save baseline findings with severity, evidence, affected file/URL, and recommended correction.
7. Run the existing build/tests before editing where feasible; record pre-existing failures separately from regressions.

**Gate 0:** repository state understood, active changes protected, current content and routes mapped, baseline recorded.

## Phase 1 — Evidence and content audit

Use `PORTFOLIO_CONTENT_SOURCE_OF_TRUTH.md` as the initial content brief, but verify its claims against source repositories and the CV before publication.

Audit these project groups separately:

### Side projects / products — first-class portfolio content

1. HIT Cargo — Shipment Tracking & Operations Platform, combining `hit-landing`, `hit-ever`, and `hit-panel` only if the architecture and product relationship still hold in the current repositories.
2. Orbit Logistics — Freight Forwarding Operations Platform. Verify the actual repository, code, product status, technologies, and relationship to HIT Cargo before writing detailed claims.
3. Agent Harness — Model-Agnostic Engineering Automation.
4. DREDD — Multi-Agent Engineering Review Workflow. Keep distinct from Agent Harness and perform a confidentiality review.
5. Webhook Attribution Pipeline — Sanitized Technical Demonstration. Preserve the explicit disclosure that it is a from-scratch public reconstruction using synthetic data, not proprietary production source code.

### Professional case studies

6. GrowthOptix — Marketing Attribution & Analytics Platform.
7. BEON Tech Studio — Enterprise Backend & Platform Engineering (aggregate multiple engagements; do not invent one client/product).

### Employment timeline

Include the six CV roles: Nativerse, GrowthOptix, BEON Tech Studio, 724 Media, Upwork, and Spark Coders. Preserve the CV dates, including the 2015–2017 Upwork / 2016–2017 724 Media overlap. Do not silently adjust dates.

For each content item, produce an evidence matrix:

| Claim | Source | Confidence | Public-safe? | Action |
|---|---|---|---|---|

Classify each claim as:
- Verified from public source/repository/CV.
- Supported but needs owner confirmation.
- Not supported — omit.
- Confidential — do not publish.

For each project establish:
- Real problem and context.
- Product status (live, maintained, in progress, demo, archived) based on evidence.
- Carlos's role and ownership boundaries.
- Team contributions versus individual contributions.
- Architecture and verified technologies.
- Important technical decisions and trade-offs.
- Outcomes with definitions and evidence.
- Public links, screenshots, safe diagrams, and confidentiality restrictions.

Do not assume that technologies listed under Nativerse are all used in Orbit Logistics. Do not merge HIT Cargo and Orbit Logistics without evidence. Do not conflate DREDD and Agent Harness.

**Gate 1:** content inventory reconciled against sources; all uncertainties explicitly recorded; no invented claims.

## Phase 2 — Astro content model and project records

1. Inspect the existing project JSON schema and Experience Markdown/YAML schema. Do not guess enum values or required fields.
2. Keep the existing architecture where possible. Make the smallest schema changes needed.
3. Convert the verified project records into the repository's actual format. The current Projects example uses JSON-like records with fields such as `title`, `summary`, `category`, `kind`, `status`, `contentStatus`, `featured`, `featuredOrder`, `role`, `period`, `technologies`, `surfaces`, `context`, `contribution`, `approach`, `solution`, `aiRole`, `stackGroups`, `quote`, `technicalDecisions`, `outcomes`, `cover`, `screenshots`, `links`, and `confidentialityNote`. Verify the actual schema before using each field.
4. Convert Experience entries into the established Markdown/YAML format. Preserve `organization`, `role`, `contentStatus`, `group`, `location`, `period`, `summary`, `contributions`, and `technologies` only as allowed by the current schema.
5. Use meaningful statuses already supported by the schema. Do not invent new enums casually. If the schema needs a draft/unpublished state, update validation and page filtering consistently.
6. Ensure draft, placeholder, sample, or unverified content is not rendered publicly and not added to the sitemap.
7. Make side projects/products the primary showcase, followed by a clearly separated professional case-study group. Keep the chronological Experience section for employment history.
8. Avoid duplicating the full GrowthOptix case study in every section. Use a concise experience summary with a link to the detailed case study.
9. Add real repository and product links where confirmed. Verify every URL.
10. Do not invent `period.start` or `period.end`; omit unknown dates or use the schema's valid draft behavior.

### Retire the fictional sample projects

The currently published fictional cases are:

- Signal Desk
- Schema Scout
- Relay Yard
- Harbor Ledger
- Dispatch Board
- Yard Capacity

Remove them from the public project collection, homepage featured area, project listing, sitemap, related-project components, and navigation. Keep an offline/archive copy only if needed to preserve the old layout reference. Do not rename these fake projects into the real projects. Create fresh records grounded in verified content.

For old public URLs, inspect whether any are indexed or externally linked. If a genuine replacement exists, add a clean redirect only if supported by the GitHub Pages hosting setup. Otherwise remove internal references and ensure the removed route cannot render the old fictional content. Do not add broken or unsupported redirect configuration.

**Gate 2:** content collections validate, sample projects are no longer public, real/draft projects are correctly separated, and Experience data matches the CV.

## Phase 3 — Portfolio narrative, marketing, and conversion

### Positioning

Use one consistent professional identity across Home, About, Experience, Project metadata, and CV link labels:

**Senior Software Engineer — Backend Systems, Distributed Integrations & Data Platforms.**

AI-assisted engineering and agent workflows are differentiators, not the main professional identity.

### Homepage hierarchy

Within the first screen/first scroll, help a recruiter understand:
1. Who Carlos is and seniority.
2. What kinds of systems/problems he solves.
3. Which concrete products or systems demonstrate this.
4. How to inspect work, download the CV, or make contact.

Recommended information architecture:

1. Hero: concise professional positioning and specific value proposition.
2. Proof strip: a small number of verified, well-defined impact facts; do not overstate team/platform metrics.
3. Featured side projects/products.
4. Engineering strengths and selected architecture decisions.
5. Professional experience summary.
6. AI/agent engineering differentiation.
7. Clear contact/CV call to action.

### Project detail pages

Use a consistent narrative, but let the substance vary by project:

- Problem / business context.
- Constraints and why the problem was difficult.
- Architecture, with a diagram when it clarifies the system.
- Carlos's specific contribution and team boundaries.
- Technical decisions and trade-offs.
- Reliability, security, performance, and operational concerns.
- Results, only where measurable and attributable.
- Evidence: real screenshots, safe diagrams, repository links, live product links, tests, or sanitized demonstrations.

Avoid walls of text and long skill-tag clouds. Make the first screen scannable, then let a technical manager explore the depth progressively.

### Visual direction

Preserve the existing editorial, restrained, dark/navy visual identity unless testing demonstrates a meaningful reason to change it. Improve hierarchy, whitespace, typography, responsive behavior, and consistency. Avoid superficial redesign for its own sake.

No fake product screenshots. Prefer:
- Authentic screenshots with sensitive data redacted.
- Architecture diagrams that match the verified implementation.
- Code/terminal excerpts only when readable and safe.
- Clearly labelled conceptual diagrams when an actual screenshot is unavailable.

### About / approach

Replace the working-philosophy placeholder with a truthful, specific engineering approach based on the available facts: ownership, smaller maintainable systems, production support, integrations, data correctness, validation, and responsible AI-assisted workflows. Do not create personal claims or values beyond the evidence.

### Availability and CTA

The current site says “Open to new projects.” Confirm the intended market before changing it. If not confirmed, retain the existing wording or use neutral contact language. Make email, LinkedIn, GitHub, and CV links obvious and working.

**Gate 3:** the site communicates one clear identity, gives side projects prominence, provides evidence, and has a consistent conversion path.

## Phase 4 — Technical SEO and search demand

Re-run the SEO baseline with the installed skills. Do not assume previous SEO work is correct or complete.

### Keyword and intent research

Research current search intent and realistic keyword opportunities for:

- Senior Software Engineer
- Senior Backend Engineer
- Backend Systems Engineer
- TypeScript / Node.js Engineer
- Distributed Systems Engineer
- API Integration Engineer
- Data Platform / Analytics Engineer
- Cloud Backend Engineer
- AI Engineering / Agentic Developer Workflows (supporting specialization)

Use keyword research to inform headings, page titles, summaries, and project content naturally. Prioritize relevance and fit over volume. Do not keyword-stuff or broaden the professional identity artificially.

Use credible current sources for external SEO and competitor research. Record source URLs and research dates in the report. Do not fabricate keyword volume, keyword difficulty, ranking potential, search trends, competitor traffic, or recruiter behavior.

### Technical checklist

Audit and implement where appropriate:

- Unique title and meta description for each indexable page.
- Canonical URLs, respecting the deployed `/me/` base path.
- Open Graph and Twitter/X metadata.
- Valid Person structured data and WebSite structured data; add other schemas only when appropriate and accurate.
- Sitemap containing only canonical, public, indexable pages.
- Robots.txt consistent with actual deployment and indexation intent.
- Correct language declaration and meaningful semantic HTML.
- One clear H1 per page and logical heading hierarchy.
- Descriptive internal links and crawlable navigation.
- Image sizing, modern formats, dimensions, and truthful alt text.
- Accessible contrast, keyboard navigation, focus states, and reduced-motion support.
- Mobile layout and touch-target quality.
- Core Web Vitals and JavaScript cost.
- No accidental duplicate content or thin/placeholder indexable pages.
- 404 and broken-link checks.

### GitHub Pages path correctness

The site is served from `https://carlosrenatohr.github.io/me/`. Verify `site`, `base`, trailing-slash behavior, asset URLs, canonical URLs, metadata images, sitemap URLs, and all internal navigation. Use Astro's base-aware URL utilities or project conventions. Avoid hardcoded root-relative links such as `/contact/` when they escape the `/me/` project path.

Test every nav/footer/CTA link from every page, especially Contact and CV. Verify the final built HTML, not just source components.

**Gate 4:** SEO implementation is technically valid, base-path safe, and supported by testable output. Search Console/indexing claims must not be made without access to those services.

## Phase 5 — QA, validation, and release readiness

Run the repository's actual commands and tests:

- Install/dependency integrity only if required; respect the lockfile and package manager.
- Format/lint.
- Typecheck.
- Unit/integration tests.
- Astro build.
- Content collection validation.
- Generated-route inventory.
- Link validation including external URLs where network checks are appropriate.
- Sitemap/robots/canonical validation.
- JSON-LD validation.
- HTML semantic checks.
- Accessibility checks.
- Mobile/responsive visual review.
- Lighthouse or equivalent performance audit, if available.

Compare results against the Phase 0 baseline. Distinguish existing failures from regressions. Fix issues caused by this work before marking the phase complete.

Inspect representative generated pages and the built HTML directly. Verify that no fictional sample copy, placeholder text, draft content, or false metrics remain in the public output.

**Gate 5:** all available quality gates pass, or every unavailable/failed check is explicitly documented with its reason and impact.

## Phase 6 — Documentation and final report

Create or update:

- `docs/PORTFOLIO-CONTENT-AUDIT.md`
- `docs/SEO-OPTIMIZATION-REPORT.md`
- `docs/PORTFOLIO-CHANGELOG.md`

The reports must include:

1. Initial audit and evidence.
2. Content truth matrix and decisions.
3. Projects added, retired, merged, or kept in draft, with rationale.
4. Experience corrections and CV consistency.
5. Positioning and marketing changes.
6. Technical SEO changes.
7. Skills used and what each contributed.
8. Files modified.
9. Commands/tests run and exact results.
10. Known limitations, uncertain content, and owner confirmations still needed.
11. Search Console / Bing Webmaster steps that require owner access.
12. Prioritized 30/60/90-day roadmap.

Do not claim improved Google rankings, traffic, indexing, or conversions from a code change alone. Record pre-launch technical readiness, and explain how real performance will be measured later.

## Final response format

When finished, report:

- What was wrong and evidenced.
- What changed in content and information architecture.
- Which side projects now lead and why.
- Which case studies remain drafts and what evidence is missing.
- What changed technically for SEO and GitHub Pages.
- Validation results with pass/fail and command names.
- Remaining risks or owner decisions.
- Exact files changed.

Do not say “SEO is optimized” unless the technical checks actually passed. Do not commit, push, or deploy.

---

**Success definition:** A recruiter can understand Carlos's professional identity quickly; side projects demonstrate real product and engineering ownership; professional case studies show measurable contribution without exaggerating ownership; an engineering manager can inspect architecture and decisions; and search engines can crawl accurate, canonical, high-quality pages without indexing sample or placeholder content.
