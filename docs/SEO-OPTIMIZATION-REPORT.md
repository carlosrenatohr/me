# SEO, Positioning and Discoverability Report

**Site:** <https://carlosrenatohr.github.io/me/>
**Scope:** technical SEO, external search research, positioning, conversion, implementation and QA.
**Date:** 2026-11-25
**Baseline:** built output in `dist/` after `pnpm build` (13 HTML pages), not the live deployment. Nothing was pushed.

---

## 0. Summary

The site was technically well built but almost invisible to search: no structured data, no social image, generic brand-only titles, and a homepage whose body copy never stated the owner's name. Two crawl-level defects also existed: `robots.txt` advertised a sitemap URL that does not exist, and six fictional sample case studies were published as indexable work.

This pass fixed the crawl defects, added a `Person` + `WebSite` graph with page-level schema, added a 1200×630 social card, rewrote every title and description around one identity, and put samples and the placeholder work index out of the index until real work exists. No ranking, traffic or Core Web Vitals claim is made here: there is no Search Console access and no field data in this environment.

**What was indexable after this pass:** 6 routes (home, AI, skills, experience, about, contact). **Noindexed:** 6 sample case studies and the work index while it contained no real project. **Indexable before:** all 13.

> **Update — 2026-11-25 (0.11.0).** This report is the record of the 0.10.0 technical pass and
> stays as written. The product-first rebuild that followed deleted the six samples, published
> ten verified projects and replaced the indexability rules described below: the sitemap now
> lists 17 URLs, `/projects/` is indexable, and every published project carries `CreativeWork`.
> The content decisions, truth matrix and remaining limitations are in
> `docs/PORTFOLIO-CONTENT-AUDIT.md`.

---

## 1. Initial audit

### 1.1 How the audit was performed

- Source inspection of `src/pages`, `src/layouts/BaseLayout.astro`, `src/config/site.ts`, `src/lib/content.ts`, `src/content.config.ts` and the content collections.
- Inspection of the generated output, not just source: every `<head>`, heading tree, `robots.txt` and `sitemap.xml` in `dist/`.
- Browser checks in Chromium via Playwright: rendered DOM, loaded fonts, console errors, horizontal overflow, client-side navigation.
- A rendered-output checker over all 13 pages (titles, descriptions, canonicals, robots, OG image existence, JSON-LD parsing, internal link resolution).
- External research through web search (sources in §2).

**Tool limitation.** The repository has the OpenSEO skill set installed (`seo-audit`, `keyword-research`, `keyword-clustering`, `seo-report`, `ai-visibility-audit`, `competitor-analysis`, …). Those skills depend on an OpenSEO MCP server. No MCP tools are connected in this environment, so their workflows could not be executed and no paid keyword, SERP, backlink or competitor data was used. Their methodology was followed manually and their report format was adapted to the Markdown deliverable requested. **No keyword volume, difficulty, ranking position or traffic figure in this report is measured.** They are hypotheses, labelled as such.

### 1.2 What was already correct

| Area | Evidence |
|---|---|
| Rendering | All routes prerendered to static HTML; content is in the initial response, so indexability does not depend on JavaScript. |
| Canonicals | Self-referencing, absolute, base-aware (`/me/…`), trailing slash matching the build output. |
| Sitemap | Well-formed XML, correct origin and base path for every entry it listed. |
| Internal links | Trailing-slash form everywhere; no dead navigation links found. |
| Semantic HTML | `lang="en"`, skip link, one `<main>`, `<article>`/`<section>` with `aria-labelledby`, one `<h1>` per page. |
| Images | WebP, explicit `width`/`height`, descriptive alt text, `loading="lazy"` below the fold, `fetchpriority="high"` on the featured cover. |
| Accessibility | Focus states, reduced-motion handling, AA contrast previously verified; no overflow at 390/834/1440 px. |
| Page weight | 40 KB CSS, 24 KB JS total, 23–44 KB covers, self-hosted subset fonts. |

### 1.3 Findings

#### Critical

None. The site was crawlable; nothing blocked indexation of the whole site.

#### High

| # | Finding | Evidence | Impact |
|---|---|---|---|
| H1 | Six fictional case studies were published and indexable as the owner's work (Signal Desk, Schema Scout, Relay Yard, Harbor Ledger, Dispatch Board, Yard Capacity) | All six were in `sitemap.xml` and returned `index, follow`; `/projects/` listed them | A recruiter or a search result could attribute invented projects to the owner. Direct credibility risk for a portfolio whose only job is trust. |
| H2 | No structured data anywhere | No `application/ld+json` in any built page | Search engines had no machine-readable statement of who the person is, what he does, where he is, or which profiles are his. Weak entity resolution for a name query. |
| H3 | No social image; `twitter:card` was `summary` | `og:image` absent; Twitter used the small card | Every share on LinkedIn/X/Slack was a bare text link. Recruiters share links; this is lost click-through. |
| H4 | Homepage metadata was generic and the homepage body never named the owner | Title `Carlos Renato — Independent Software Engineer`; body text contained "Carlos Renato" only in the footer's "Nativerse"; the H1 is a slogan | The strongest page for a name or role query carried no role, location or stack, and the visible copy named nobody. |
| H5 | `robots.txt` pointed at a sitemap that does not exist | `Sitemap: https://carlosrenatohr.github.io/sitemap.xml` while the file is served at `/me/sitemap.xml` | Broken crawl directive. See §8 for the GitHub Pages caveat that makes this worse than it looks. |

#### Medium

| # | Finding | Evidence |
|---|---|---|
| M1 | Titles were brand-only and repeated one pattern | `About — Carlos Renato`, `Projects — Carlos Renato`, `Skills — Carlos Renato`, … No role, stack, location or specialization. |
| M2 | Project descriptions ran long | `data.summary` used verbatim: 174–251 characters, truncated in SERPs. |
| M3 | Name inconsistency across the same page | Title and profile: "Carlos Renato" / "Carlos Renato Hernandez"; wordmark: "Carlos R. Hernandez"; footer: "Nativerse". |
| M4 | Contact had no second-level heading | Only an `<h1>`; the CV band was labelled by a `<p>` used as `aria-labelledby`. |
| M5 | Duplicate typography declarations and 384 KB of unused font binaries | `@font-face` block duplicated in `tokens.css` and `fonts.css`; identical `.woff2` copies shipped in `public/fonts/` but referenced by nothing. |
| M6 | No font preload | Faces were only discovered after the stylesheet parsed, so text swapped late under `font-display: swap`. |

#### Low

| # | Finding | Evidence |
|---|---|---|
| L1 | No `author`, `theme-color` or `max-image-preview:large` | Absent from `<head>`. |
| L2 | Sitemap carried no `lastmod` | Not added deliberately: the content model has no verified modification date, and inventing one is worse than omitting it. |
| L3 | No custom 404 | GitHub Pages serves its own page for unknown paths under `/me/`. |
| L4 | Root-level crawl files cannot be authoritative on a project site | `robots.txt` lives at `/me/robots.txt`; crawlers only read the origin root. |

---

## 2. External research findings

Research date: **2026-11-25**. Sources are public pages, quoted for direction, not for measurements.

### 2.1 How recruiters actually find engineers

| Source | Finding | Consequence for this site |
|---|---|---|
| [Boolean search strings for software engineers](https://interviewersignal.com/blog/boolean-search-strings-for-software-engineers) (2026-09-25) | Backend searches combine title variants — `("backend engineer" OR "backend developer" OR "server-side engineer")` — with a language/domain group such as distributed systems. | The site should use the title vocabulary recruiters type, in the words the owner can defend: backend, software engineer, distributed systems, integrations. |
| [Boolean Search for Recruiters: What Still Works in 2026](https://hrmony.ai/blog/boolean-search-for-recruiters) (2026-10-10) | Recruiters use Google for what LinkedIn cannot show: portfolios, talks, papers and personal sites, including `site:` and `filetype:pdf` operators. | The portfolio and the CV PDF are the assets that appear in a Google-based search; both need to be indexable and clearly about the same person. |
| [How to Find Software Engineer Candidates](https://fullstackrecruiter.net/how-to-find/software-engineer) (2020-06-29) | Google `site:github.com` searches are described as the strongest available filter because they surface code and a location field. | GitHub already ranks for this profile; the portfolio should link to it with `sameAs` rather than compete with it. |
| [How Recruiters Find You](https://algomaster.io/learn/job-search/how-recruiters-find-you) (2026-06-21) | Matching is mostly about the words in the headline, About, experience and skills fields; the profile must first appear in the search, then look credible. | Consistency between LinkedIn headline, GitHub, CV and site matters more than any on-page trick. |
| [LinkedIn Recruiter for Tech Recruiting 2026](https://www.knowlee.ai/blog/linkedin-recruiter-for-tech-recruiting-2026) (2026-04-30) | Senior engineers under-describe their stack on LinkedIn; the signal lives in GitHub, writing and commit history. Skills fields are noisy. | A portfolio that states the stack and links to evidence is a genuine differentiator, not a vanity page. |

**Implication.** For this profile the realistic discovery path is: recruiter searches LinkedIn/ATS → checks the name → lands on the portfolio or GitHub to verify. The portfolio's job in search is therefore **(a)** to own the name, **(b)** to be a credible verifier for a specific specialization, and **(c)** to be legible to the other platforms. Competing for "senior backend engineer" as a head term is not a realistic objective for a new `github.io` subpath with no backlink profile.

### 2.2 Structured data for a personal site

| Source | Finding |
|---|---|
| [Google Search Central — ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page) | `ProfilePage` requires `mainEntity` (a `Person` or `Organization`); recommended properties include `name`, `alternateName`, `description`, `image` and `sameAs`. Explicitly intended for pages about a person, including About pages. |
| [Schema.org — ProfilePage](https://schema.org/ProfilePage) | `mainEntity` is the page's subject; the entity carries its own identifiers. |
| [Google — Intro to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) | JSON-LD is the recommended format; markup must describe content visible on the page. |
| [Web portfolio SEO and indexing](https://vitaecontext.github.io/playbooks/web-portfolio) | Suggested mapping: homepage `WebSite`, About `ProfilePage` + `Person`, project page `SoftwareApplication`/`SourceCode`, listing `CollectionPage`, nested pages `BreadcrumbList`. |
| [Structured data for a personal website](https://parsa-inet.vercel.app/blog/structured-data-personal-website) (2026-09-19) | `sameAs` should list profiles the person controls (GitHub, LinkedIn), not pages about them. |

**Implication.** The correct model is one `Person` node with a stable `@id`, referenced by every other node, plus `WebSite`, and one page node per page type. That is what was implemented.

### 2.3 Positioning against typical engineer portfolios

No competitor was crawled, ranked or measured in this pass. The comparison below is qualitative and
comes from the public guidance above plus the reference study already recorded in
`docs/design/REFERENCE-ANALYSIS.md` (cesargaray.com, reviewed 2026-11-15 for information
architecture, not style).

| What most portfolios do | What this site does | Why it is a differentiator |
|---|---|---|
| A skills grid of logos, often unverifiable | Layers of the stack with a CV-backed `proof` line per layer | A reader can check the claim instead of trusting a percentage bar |
| A project card with a title and a hero image | Problem → solution → contribution → decisions → stack → impact, per case study | It answers what a hiring manager actually asks; it is also the content that can earn long-tail queries |
| AI listed as a tool in the skill cloud | AI described with the review loop and the human approval that bounds it | It matches the brief's rule that AI is a differentiator, not the identity |
| Generic positioning ("passionate developer") | One identity: senior software engineer, backend systems, distributed integrations, data platforms | Consistent across title, hero, LinkedIn-bound schema and CV |
| No evidence of production | Verified figures from the CV (18 s → 1 ms, 35K+ sync jobs, 340+ databases, ~1.7M events) | Specific, attributable numbers are the scarcest thing on an engineer's site |
| Spanish-only or English-only local framing | English site, Nicaraguan location stated, remote-shaped work described | Matches how international recruiters search, without overstating availability |

The honest gap: without a real published case study, the "evidence" column is carried by the
impact strip and the CV, not by the work index. That is the next content move (§10).

### 2.4 Portfolio SEO practice

[Technical SEO Checklist for Developer Portfolio Websites](https://www.boopathi.tech/developer-portfolio-seo-checklist.html) (2026-08-07) recommends: one consistent host/path form with self-referencing canonicals; a homepage title naming the person and role in under ~60 characters; unique titles per route; a description written for a human; and `Person` schema. It also warns that duplicate titles across a portfolio tell search engines the pages are interchangeable — which was exactly finding M1.

---

## 3. Keyword strategy

### 3.1 Honest constraints

- No keyword volume, difficulty or SERP data was available (§1.1). The tiers below are ordered by **relevance and realistic winnability**, not by measured demand.
- The site is a new `username.github.io/project` URL with no backlink profile. Head terms such as "senior backend engineer" are dominated by job boards and are not a sensible V1 target.
- Nothing was added that the CV does not support. "Data platforms" and "distributed integrations" come from the owner's content brief and the verified record (BigQuery read path, 340+ databases, 35K+ sync jobs, multi-platform ingestion).

### 3.2 Tiers and page mapping

| Tier | Intent | Terms | Landing page | Why it is realistic |
|---|---|---|---|---|
| 1 — Brand / identity | Someone who already has the name from a CV, LinkedIn, GitHub or a referral | Carlos Renato; Carlos Renato Hernandez; carlosrenatohr; Carlos Renato software engineer; Carlos Renato Nicaragua | `/` and `/about/` | A distinctive name, one canonical site, `Person.sameAs` to the two profiles, and a consistent wordmark. This is the highest-converting query type: the visitor is already interested. |
| 2 — Role + specialization | A recruiter or engineer searching for this profile, not a generic job | senior software engineer backend systems; backend engineer Node.js TypeScript; API integration engineer; distributed systems engineer; cloud backend engineer AWS; data platform engineer | `/`, `/experience/`, `/skills/` | Long-tail, capability-shaped queries where a single-person site can be genuinely relevant. The pages already hold the evidence. |
| 3 — Technical / differentiation | Someone looking for the specific capability | MCP server development; agentic code review workflow; Cloudflare Workers backend; enterprise integration engineer | `/ai/`, `/skills/`, future case studies | The AI work is a differentiator, not the identity. These queries have low volume but very high intent and little credible competition at individual level. |
| 4 — Off-site infrastructure | Recruiters using Google operators | CV in PDF; GitHub; LinkedIn | `public/cv.pdf`, GitHub, LinkedIn | Research (§2.1) says this is where discovery actually happens. The site's job is to corroborate, not to replace it. |

### 3.3 Deliberately not targeted

Job-board head terms ("backend developer jobs", "software engineer salary"), country-level generic terms ("software engineer Nicaragua") and unrelated stacks. They would either never rank or would misrepresent the profile — both explicitly out of bounds.

### 3.4 Where the terms now live

- **Title tags:** role and specialization, under 65 characters, unique per route.
- **Home description:** role + location + three capability areas + stack.
- **Hero:** visible name and role line (`Carlos Renato · Senior Software Engineer`).
- **`knowsAbout`:** six capability areas from the brief/CV plus the tools the skills page marks as core — computed at build time from `items[].core`, never hand-listed.
- **Body copy:** unchanged where it was already specific. No paragraph was rewritten to insert keywords.

---

## 4. Positioning and conversion changes

The owner's brief (`docs/MASTER_PROMPT_PORTFOLIO_REBUILD.md`) fixes one identity: **Senior Software Engineer — Backend Systems, Distributed Integrations & Data Platforms**, with AI-assisted engineering as a differentiator rather than the identity. Page copy already followed that; the metadata did not.

| Item | Before | After |
|---|---|---|
| Home title (45 → 57 chars) | `Carlos Renato — Independent Software Engineer` | `Carlos Renato — Senior Software Engineer, Backend Systems` |
| Home description (81 → 140 chars) | `Portfolio of Carlos Renato, an independent software engineer and product builder.` | `Senior software engineer in Managua, Nicaragua. Backend systems, distributed integrations and data platforms in Node.js, TypeScript and AWS.` |
| Wordmark | `Carlos R. Hernandez` | `Carlos Renato` (matches title, schema and sitemap naming) |
| Hero identity | none — the page never named the owner | `Carlos Renato · Senior Software Engineer`, opposite the availability pill |
| Work count | `6 projects` (all fictional) | `6 sample projects`, and the published count once real work exists |
| Page titles | `About — Carlos Renato` | `About — Carlos Renato, Senior Software Engineer` |
| Contact headings | one `H1` | `H1` + `H2` for the CV band |

The hero headline itself was **not** changed. It is the owner's approved voice, and rewriting it is a design decision rather than an SEO fix. The audit finding is recorded (H4): the role signal now comes from the masthead line, the title and the schema. A role-led headline is a candidate for a later test, not a silent change.

**Conversion.** Email, LinkedIn, GitHub and the CV were already one click from every page via the footer; the Contact page already leads with the email at display size. Two contextual internal links were added so a reader arrives at the next relevant page instead of a dead end: About → `/skills/`, and case-study Stack → `/skills/`. No form, no modal and no new CTA were introduced.

---

## 5. Technical changes implemented

### 5.1 Metadata and social

All in `src/layouts/BaseLayout.astro`, driven by `src/config/site.ts`:

- `og:image`, `og:image:type|width|height|alt` and `twitter:image|alt`.
- `twitter:card` upgraded from `summary` to `summary_large_image`.
- `robots` always emitted: `index, follow, max-image-preview:large` by default, `noindex, follow` when a page opts out.
- `author`, `theme-color` (`#060b1a`, the page background).
- Font preloads for Newsreader roman and Archivo, emitted with the content-hashed URL from the same Vite import the stylesheet uses — no hand-written `/fonts/` path that could drift.
- **Social card:** `public/og/carlos-renato.jpg`, 1200×630, 44 KB, generated by `scripts/generate-og.mjs` (`pnpm og`) from the site's own faces and palette, so it can be regenerated rather than redrawn. Reviewed visually.

### 5.2 Structured data

`src/lib/seo.ts` builds one `@graph`, serialised once per page:

```
WebSite  ──publisher──▶  Person  ◀──mainEntity──  ProfilePage    (about)
                                   ◀──mainEntity──  ContactPage    (contact)
                                   ◀──author──────  CreativeWork   (published case studies)
Projects index  ──mainEntity──▶  ItemList  ──▶  ListItem …
Case study      +  BreadcrumbList (Home → Projects → title)
```

- `Person`: legal name, `alternateName`, `jobTitle`, the visible short intro as `description`, `address` (locality/country), `sameAs` (LinkedIn, GitHub, read from the profile), `alumniOf` (UNI), `knowsAbout` (capability areas + core tools computed from the skills collection).
- `WebSite`: name, alternate name, URL, description, language, publisher → `Person`.
- Page nodes reference shared entities by `@id` instead of duplicating them, and the whole graph is escaped for `<` before being written into the script element.
- **Sample case studies carry no case-study schema and are `noindex`.** Describing fictional work in structured data would be worse than not describing it at all.

### 5.3 Indexation

| Change | File |
|---|---|
| `robots.txt` sitemap URL corrected from the domain root to `${ROUTES.home}sitemap.xml` (base-aware) | `src/pages/robots.txt.ts` |
| Sitemap excludes samples; lists `/projects/` only when a real project exists | `src/pages/sitemap.xml.ts` |
| Sample case studies `noindex, follow` and schema-free | `src/pages/projects/[slug]/index.astro` |
| Work index `noindex` while every entry is a sample; self-corrects when one real project is published | `src/pages/projects/index.astro` |

Result: 6 indexable URLs (down from 13), all swappable to 7+ by publishing one real case study.

### 5.4 Headings, copy and descriptions

- Contact: the CV band label became a real `H2` (`src/pages/contact.astro`).
- Long project summaries are clamped at a word boundary to ≤155 characters by `clampDescription()` (`src/lib/seo.ts`), used by the case-study route.
- Every page description was checked at 124–164 characters.
- `Work` replaced the `Projects` label in the home meta strip, because the cell now reports samples honestly.

### 5.5 Base-path correctness

All new absolute URLs go through `canonicalUrl()` / `absoluteAsset()` in `src/config/site.ts`, which compose `SITE.origin + BASE + path`. `og:image`, canonical, sitemap, screen-reader links and the schema `@id`s therefore all resolve under `/me/`. `BASE` was moved above `SITE` in that module so the helper can read it.

### 5.6 Performance and maintenance hygiene

- Removed the duplicated `@font-face` block (`src/styles/fonts.css` and its `@import`). The three faces were declared twice in one bundle.
- Removed 384 KB of identical, unreferenced font binaries from `public/fonts/`; the OFL licences stay published. `ASSETS.fonts` was dropped with them.
- Two font preloads added (see 5.1).

No claim of a measured Core Web Vitals improvement is made — see §8.

---

## 6. Files modified

**New**

- `src/lib/seo.ts` — structured-data graph, description clamp.
- `scripts/generate-og.mjs` — social card renderer.
- `public/og/carlos-renato.jpg` — 1200×630 card.
- `docs/SEO-OPTIMIZATION-REPORT.md` — this document.

**Changed**

- `src/config/site.ts` — identity-bearing defaults, `legalName`, `jobTitle`, OG image metadata, `BASE` hoisted, `absoluteAsset()`.
- `src/layouts/BaseLayout.astro` — head, robots, social, preloads, JSON-LD, `schema` prop, wordmark.
- `src/pages/index.astro` — masthead row, honest work count, label.
- `src/pages/about.astro`, `ai.astro`, `skills.astro`, `experience.astro`, `contact.astro` — titles/descriptions, schema, heading fix.
- `src/pages/projects/index.astro` — conditional noindex, `CollectionPage` schema.
- `src/pages/projects/[slug]/index.astro` — noindex and schema gating, clamped description, Stack → skills link.
- `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts` — crawl corrections.
- `src/styles/primitives.css` — `.hero-top` / `.hero-role`.
- `src/styles/base.css` — dropped the duplicate font import.
- `src/config/assets.ts` — dropped unused font paths.
- `package.json`, `CHANGELOG.md`, `board.md` — version and records.

**Deleted**

- `src/styles/fonts.css`, `public/fonts/{newsreader,archivo}/*.woff2`.

---

## 7. Validation results

Commands run against the changed tree:

| Check | Command | Result |
|---|---|---|
| Type check + build | `pnpm build` | 13 pages built; `astro check` 29 files, 0 errors, 0 warnings, 0 hints |
| Standalone type check | `pnpm check` | 29 files, 0 errors, 0 warnings, 0 hints |
| Formatting | `pnpm format:check` | All matched files use Prettier code style |
| Rendered SEO checks (13 pages) | purpose-built script over `dist/` | 0 failures |
| Responsive / a11y / router | `BASE=http://localhost:4325/me node playwright-evals/responsive-audit.cjs` | OK — all checks passed, 7 routes × 390/834/1440 |
| Browser runtime | Chromium via Playwright | 3 font faces `loaded`, 0 console errors, 0 horizontal overflow at 1440 and 390 |

The rendered SEO script asserts, per page: a title of 20–65 characters; a description of 70–165 characters; exactly one `<h1>`; a canonical that ends with the page's own route; a `robots` meta; an `og:image` that **exists on disk**; `summary_large_image`; parseable JSON-LD containing `Person` and `WebSite`; sequential breadcrumb positions with URLs; no duplicate title or description across routes; and every internal `/me/…` href resolving to a file in `dist/`.

Structured data was validated structurally against the property requirements in Google's ProfilePage documentation (`mainEntity` present, `Person.name` present, shared `@id`s resolvable). **It was not submitted to Google's Rich Results Test or the Schema.org validator**: both need a public URL or an interactive browser session, and the site has not been pushed. That step remains for the owner (§9).

Not run: Lighthouse (not installed, and no field data to compare against), a full axe sweep, Google Search Console, live SERP checks.

---

## 8. Remaining risks and limitations

1. **`github.io/me` is a subpath, and root crawl files cannot be controlled.** A project site's `robots.txt` is served at `/me/robots.txt`, but crawlers only read `https://carlosrenatohr.github.io/robots.txt`. The corrected file is still worth shipping (it is correct and will be correct after a domain move), but it is not authoritative today. The sitemap at `/me/sitemap.xml` is valid and can be submitted directly in Search Console.
2. **Fictional samples are still visible on the homepage and the work index.** They are now `noindex` at page level and labelled "Sample content", and the work index itself is `noindex` while only samples exist. The owner's rebuild brief goes further and asks for them to be retired entirely. That deletion was not performed here because this pass was scoped to SEO and removing the only populated work section is a content decision.
3. **No Search Console property was available.** Indexing status, impressions, queries, CTR and any Core Web Vitals field data are unknown. Nothing in this report should be read as evidence that the site is indexed or ranking.
4. **No keyword or competitor data.** No volumes, difficulty, ranking positions or competitor traffic were measured; §3 is a hypothesis set. The OpenSEO MCP connection would supply these.
5. **No portrait.** `Person.image` was intentionally omitted: the only available image is a branded card, not a photograph, and using it as a person image would be inaccurate. A portrait would strengthen both the About page and the entity.
6. **`Person` is emitted on every page.** This is a deliberate, common pattern for a personal site and keeps one `@id` consistent. It is one script block per page, not duplicated entities.
7. **The homepage still features sample work**, and its primary image is a mockup. That is honest and labelled, but it is not the credibility signal a real case study would be.
8. **The ClientRouter adds 16 KB of JS.** Navigation is faster and every route is still static HTML, so indexability is unaffected; the cost is real but small and was already an owner decision.
9. **`lastmod` is absent from the sitemap.** The content model has no verified modification date, so none was invented.
10. **No custom 404.** GitHub Pages serves its own page for unknown `/me/` paths. Old sample URLs will keep returning 404 once retired; no redirect is possible without host-level configuration.

---

## 9. Recommendations for future improvements

1. **Publish one real case study.** It is the single highest-impact change: it makes `/projects/` indexable again, adds a `CreativeWork` + `BreadcrumbList`, and gives the homepage real evidence. The `docs/PORTFOLIO_CONTENT_SOURCE_OF_TRUTH.md` brief already contains verified material (HIT Cargo, DREDD, GrowthOptix).
2. **Retire the six samples** per the rebuild brief once a real replacement exists. Do not rename them into real projects.
3. **Verify Search Console and submit `https://carlosrenatohr.github.io/me/sitemap.xml`.** Then request indexing for the six routes. This is the only way to replace guesswork with data. Confirm the sitemap is read and that the `noindex` pages are excluded as intended.
4. **Add a portrait** and set `Person.image`; use it on About and in the OG card.
5. **Align LinkedIn and GitHub with the site.** Same primary title, same location, the same three capability areas, and a link to the portfolio from both profiles. Per §2.1 this is where recruiter discovery actually happens; the site corroborates.
6. **Improve the CV PDF.** PDFs are indexed and are a `filetype:pdf` target. Set the document title, author and subject metadata to the same identity, and keep the download link labelled.
7. **Per-case-study social images** derived from a real cover, once real covers exist.
8. **One technical write-up per quarter.** A decision note ("why ingestion is serialized against a single-session portal") earns long-tail queries and gives other sites something to link to; project pages alone rarely attract links.
9. **Acquire a small number of real links**: GitHub profile README, LinkedIn featured section, a dev.to or personal cross-post that links the canonical page.
10. **Consider a custom domain.** It removes the `/me/` subpath, makes root `robots.txt` possible, and consolidates the brand entity. It requires a 301 plan from the current URLs; not implemented here because it is an owner/hosting decision with a cost.
11. **A custom 404** with links to the six routes, once the sample URLs are retired.

---

## 10. Prioritised roadmap

### Next 30 days

1. Verify Search Console, submit the sitemap, request indexing of the six routes (owner action; requires account access).
2. Publish the first verified case study (HIT Cargo or a sanitized GrowthOptix write-up) — flips `/projects/` and one detail page into the index.
3. Decide the sample policy: retire the six entries or replace them one by one.
4. Align LinkedIn headline/About and the GitHub profile README with the site's identity and link back.
5. Set the CV PDF's document metadata.

### 31–60 days

1. Second case study; bring the total indexable set to 9–10 URLs.
2. Portrait + `Person.image`; refresh the OG card with it.
3. Per-case-study OG images from real covers.
4. Read the first Search Console query report and adjust titles/descriptions for CTR — using actual query data, not assumptions.
5. Fix any crawl or canonical anomaly GSC reports (primarily around the `/me/` base path).

### 61–90 days

1. Two technical write-ups targeting Tier 3 capability queries (MCP, agentic review, Cloudflare Workers), each linking to the relevant case study.
2. Three to five genuine inbound links (GitHub, LinkedIn, a dev.to cross-post, any former colleague or community page).
3. Re-run this audit with Search Console and live SERP data; measure movement in impressions and clicks rather than asserting rankings.
4. Decide on a custom domain with a redirect plan, if the owner wants to invest in the brand entity.
5. Review the homepage headline against a role-led variant with real traffic data, if there is enough of it to test.

---

## Appendix — the emitted graph (homepage)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://carlosrenatohr.github.io/me/#website",
      "url": "https://carlosrenatohr.github.io/me/",
      "name": "Carlos Renato",
      "alternateName": "Carlos Renato Hernandez",
      "description": "Senior software engineer in Managua, Nicaragua. Backend systems, distributed integrations and data platforms in Node.js, TypeScript and AWS.",
      "inLanguage": "en",
      "publisher": { "@id": "https://carlosrenatohr.github.io/me/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://carlosrenatohr.github.io/me/#person",
      "name": "Carlos Renato Hernandez",
      "alternateName": "Carlos Renato",
      "url": "https://carlosrenatohr.github.io/me/",
      "jobTitle": "Senior Software Engineer",
      "description": "I build, integrate and operate the systems that hold a product together: the APIs, the data pipelines, and the operational interfaces on top of them.",
      "sameAs": [
        "https://www.linkedin.com/in/carlosrhr/",
        "https://github.com/carlosrenatohr"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Managua",
        "addressCountry": "Nicaragua"
      },
      "knowsAbout": [
        "Backend engineering",
        "Distributed systems",
        "API design and integration",
        "Enterprise integrations",
        "Data pipelines",
        "Cloud architecture",
        "…core tools from src/content/skills/*.json"
      ],
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Universidad Nacional de Ingeniería (UNI)" }
      ]
    }
  ]
}
```
