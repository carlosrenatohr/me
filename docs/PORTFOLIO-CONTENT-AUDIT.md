# Portfolio Content Audit — evidence, hierarchy and experience pass

**Date:** 2026-11-25 (content addendum + copy/experience pass)
**Scope:** production state, evidence per project, editorial hierarchy, the secondary-projects
accordion and the interactive portrait.
**Companions:** `docs/MASTER_PROMPT_PORTFOLIO_REBUILD.md`,
`docs/PORTFOLIO_CONTENT_SOURCE_OF_TRUTH.md`, `docs/SEO-OPTIMIZATION-REPORT.md`,
`docs/evidence/hit-cargo/README.md`, `CHANGELOG.md`.

Every claim in the audit carries one of these states:

| State | Meaning |
| --- | --- |
| `REPO_CONFIRMED` | Read in code, README, configuration or a migration |
| `OWNER_CONTEXT` | Provided by the owner; true for the owner, not independently verified |
| `PUBLICLY_VERIFIED` | Checked on a live public surface during this pass |
| `NEEDS_EVIDENCE` | No source found; not publishable |
| `NEEDS_OWNER_APPROVAL` | Publishable only after an explicit decision |
| `PRIVATE_DO_NOT_PUBLISH` | Must stay out of public content |

`OWNER_CONTEXT` never becomes a public verified fact by repetition.

---

## 1. Technical state and production state

- Branch deployed: `master`, commit `d4a12fd` — the rebuild plus its verification note.
- The working tree is **dirty on purpose**: this pass is uncommitted, unpushed and undeployed, per the
  execution constraints. Nothing here modified `master`, the Pages workflow or the production build.
- `pnpm check`, `pnpm build`, `pnpm format:check` and the responsive audit pass locally (section 15).
- The local build has 17 pages and 17 sitemap URLs. `/projects/draft-buko/` is not generated.

### Production verification (independent methods)

| Method | Result |
| --- | --- |
| `gh api repos/carlosrenatohr/me/commits/master` | `d4a12fd822e318e0cb9d8f6130b8a1cc3832b6e8`, 2026-11-26T03:55:10Z |
| `curl` with `Cache-Control: no-cache, no-store` and a unique query string, home | 200, 18 820 bytes, no `Sample content`, no Signal Desk / Schema Scout / Relay Yard |
| Same request, `/projects/` | 200, 10 real entries: Orbit Logistics, HIT Cargo, DREDD, Mi Lexio, Ranita Leopardo, Nalu, Agent Harness, Webhook Attribution Pipeline, GrowthOptix, BEON Tech Studio |
| Same request, `/sitemap.xml` | 200, 17 `<loc>` entries |
| Response headers | `last-modified: Thu, 26 Nov 2026 03:55:44 GMT` (the successful Pages build of `d4a12fd`), `cache-control: max-age=600`, `age: 1` |

The deployed artifact was built from the same commit above, so the repository state and the served
pages agree. GitHub Pages has no deployment history API exposed to this account, but the artifact
timestamp and the commit timestamp are 34 seconds apart, which is consistent with one build.

## 2. Discrepancy with the external reading

The external reading reported six projects and `Sample content` entries (Signal Desk, Schema Scout,
Relay Yard). That content was **removed in the rebuild** and does not appear in the current artifact.

Diagnosis: a stale read, not a failed deploy.

- The response advertises `cache-control: max-age=600`, so a reader or a third-party fetcher can hold
  a ten-minute-old copy; a cached copy taken before the rebuild can survive much longer on the
  reader's side.
- A cold request (no-cache headers plus a new query string) returns the 10-entry page and a 17-URL
  sitemap.
- No sample route exists in `dist/`, and no sample string exists in the generated HTML.

No further deploy was made to "fix" this. Action if it reappears: re-check with a cache-busting URL
and compare the `last-modified` header against `master` before touching the workflow.

**Important caveat:** production still serves the **0.11.0 content** (HIT screenshots, GrowthOptix
figures, "Platform context"). Those were withdrawn in this local pass but cannot disappear from
production without an approved deploy.

## 3. Editorial hierarchy

| Shelf | Order | Entry |
| --- | --- | --- |
| Featured products | 1 | Orbit Logistics |
| Featured products | 2 | HIT Cargo |
| Featured products | 3 | DREDD |
| Open source & experiments | 1 | Mi Lexio |
| Open source & experiments | 2 | Ranita Leopardo |
| Open source & experiments | 3 | Nalu |
| Open source & experiments | 4 | Buko (draft, unlisted) |
| Open source & experiments | 5–6 | Agent Harness, Webhook Attribution Pipeline |
| Professional experience | 1 | Nativerse |
| Professional experience | 2 | GrowthOptix |
| Professional experience | 3 | BEON Tech Studio |
| Professional experience | 4+ | Remaining CV roles, newest first |

Rules applied:

- Orbit, HIT Cargo and DREDD keep the full editorial treatment; they are the first impression.
- GrowthOptix stays a professional case study. It is **not** promoted to a featured product.
- Orbit is not duplicated inside the Nativerse experience entry: Nativerse is the organisation, Orbit
  is the product.
- DREDD and Agent Harness remain separate projects with separate evidence.
- Agent Harness and the Webhook demonstration stay published after the four owner-named experiments;
  removing well-evidenced work to keep a four-item list would lose real evidence.
- Buko keeps its slot in the owner's order but renders as a labelled draft row, with no route, no
  link and no description.

## 4. Recovered context and what it changed

### Positioning and name

- The public identity is now **Product Engineer**, with the historical job titles left untouched in
  the experience entries. Backend depth is described as the strongest area, not as the whole profile.
- The visible name is **Carlos R. Hernandez**, read once from `SITE.name` in `src/config/site.ts` and
  reused by the wordmark, titles, descriptions, alt text and structured data. The legal/full name
  stays `Carlos Renato Hernandez` in `SITE.legalName` and the `Person` node.
- Copy changes are owner-directed (`OWNER_CONTEXT`). No new employer, date, metric or client is
  introduced.

### Orbit Logistics — featured #1

- Product of the Nativerse ecosystem and the owner's priority project (`OWNER_CONTEXT`).
- Subscription platform for freight-forwarding operations, with web applications, backend services
  and role-based data access (`PUBLICLY_VERIFIED` against the published CV / Nativerse entry).
- Architecture review favours comprehensibility, maintainability and predictable operating cost;
  Hono, Drizzle and Cloudflare were discussed as candidates, never confirmed as stack
  (`OWNER_CONTEXT`).
- `https://orbit.nativerse.space` did not resolve on 2026-11-25, and no repository exists in the
  account, public or private (`NEEDS_EVIDENCE`). The site publishes no link.

### HIT Cargo — featured #2

- Transport, consolidation and import agency for Nicaragua; carrier and logistics manager, not the
  seller of the goods (`PUBLICLY_VERIFIED` through `hit-landing`).
- Services: purchases/transport from the USA, Panama and China; air and sea; Miami locker; customs
  nationalisation; door-to-door (`PUBLICLY_VERIFIED`).
- Commercial context: digital presence, web and commercial communication, marketing, social media,
  promotional material and customer procedures (`OWNER_CONTEXT`).
- Repositories: `hit-landing` (public site), `hit-ever` (tracking API and ingestion), `hit-panel`
  (operations panel). They are three surfaces, not one monolith (`REPO_CONFIRMED`).
- Panel reads from InsForge/PostgreSQL rather than scraping on each request; ingestion is serialised
  because upstream allows one session; writes go through RLS and `SECURITY DEFINER`
  (`REPO_CONFIRMED`).
- Start date, current production status per surface and individual-vs-team ownership remain
  `NEEDS_EVIDENCE`.

### GrowthOptix — professional #1

- Marketing analytics and attribution platform; Gox Analytics is the behaviour/tracking service
  inside the ecosystem (`OWNER_CONTEXT` + `PUBLICLY_VERIFIED` repository).
- Areas: backend APIs, event tracking, session/user analytics, data processing, advertising
  integrations, synchronisation, BigQuery analytics, dashboards (`OWNER_CONTEXT`).
- Event model: `userId`, `sessionId`, `event`, `timestamp`, `metadata` (URL, referrer, device,
  browser) (`OWNER_CONTEXT`); endpoints and aggregations over referrer, landing pages, device,
  geography and sessions (`OWNER_CONTEXT`). Not published as an API contract.
- Integrations: Google Ads (OAuth, GAQL, MCC), Meta Insights, Microsoft Advertising, LinkedIn Ads
  (`OWNER_CONTEXT` + CV).
- Meta `7d_click`: parallel BigQuery fields, separate processing, a feature flag for display and an
  explicit split between platform-reported data and first-party events (`OWNER_CONTEXT`).
- Confirmed stack for the Gox repository: Node.js, TypeScript, Express 5, MongoDB/Mongoose, Upstash
  Redis, Docker, AWS Fargate/ECS, pnpm, JWT, Zod (`REPO_CONFIRMED`). NestJS, PostgreSQL, RabbitMQ,
  SQS, GraphQL, BigQuery and the ad platforms are described per component, not as one stack.
- **Role conflict:** the owner addendum states **Mid Backend Developer**; the published CV and the
  copy brief refer to Senior Software Engineer. The site keeps Mid because it is the latest explicit
  owner decision. `needs_owner_approval`.

### DREDD — featured #3

- Multi-agent review: independent code and security reviewers, automated checks, reconciliation of
  duplicated or contradictory findings, human acceptance (`REPO_CONFIRMED` + CV).
- Kept independent from Agent Harness (`REPO_CONFIRMED`). No prompts, internal instructions or
  confidential workflows are published.

### Mi Lexio, Ranita Leopardo, Nalu

- Mi Lexio: Spanish daily-readings PWA, offline shell, own API; repositories `dreading-pwa` and
  `dreading-api`, live at `dreading-pwa.pages.dev` (`PUBLICLY_VERIFIED`). The deployment is branded
  "Lectura del día"; `milexio.nativerse.space` did not resolve.
- Ranita Leopardo: Canvas game with a custom physics engine, six levels, no dependencies
  (`REPO_CONFIRMED`; live at `rana-leopardo.pages.dev`).
- Nalu: offline-first business tool (React, Express, Drizzle, D1, IndexedDB) for a real artisan
  paleta business (`REPO_CONFIRMED`; live app).
- Nalu was already published and verified before this pass; its position is preserved.

### Buko

Covered in section 10.

## 5. Repository evidence found

| Repository | Used for | State |
| --- | --- | --- |
| `hit-landing` | Service catalogue, public copy, SEO config | `REPO_CONFIRMED` / `PUBLICLY_VERIFIED` |
| `hit-ever` | Tracking API, ingestion model | `REPO_CONFIRMED` |
| `hit-panel` | Operations panel, RLS, screenshots (test data) | `REPO_CONFIRMED` |
| `gox-analytics` | Gox stack and event service | `REPO_CONFIRMED` |
| `gox-ads-api-demo`, `mix-marketing-modeling` | Archived; not used as evidence | — |
| `dredd-ai-workflow`, `agent-harness` | Review workflow and phase gate | `REPO_CONFIRMED` |
| `webhook-attribution-pipeline` | Sanitised demonstration with synthetic data | `REPO_CONFIRMED` |
| `dreading-pwa`, `dreading-api` | Mi Lexio client and API | `REPO_CONFIRMED` |
| `rana-leopardo` | Game | `REPO_CONFIRMED` |
| `nalu-app` | Business tool | `REPO_CONFIRMED` |
| `orbit` (any) | — | Not found, including private |
| `buko` (any) | — | Not found, including private |

`gh repo list` included private repositories. DNS probes for `orbit.nativerse.space`,
`milexio.nativerse.space` and `nativerse.space` returned no resolution from this environment.

## 6. Claims matrix

| Claim | Source | State | Confidentiality risk | Approval |
| --- | --- | --- | --- | --- |
| HIT Cargo is a transport/import agency, not the seller | `hit-landing` | `PUBLICLY_VERIFIED` | None | Not required |
| HIT services: USA/China/Panama, air/sea, locker, customs, door-to-door | `hit-landing` pages | `PUBLICLY_VERIFIED` | None | Not required |
| HIT tracking reads InsForge/Postgres; ingestion serialised | `hit-ever` README | `REPO_CONFIRMED` | Low (architecture only) | Not required |
| Panel access enforced by RLS + `SECURITY DEFINER` | `hit-panel` README | `REPO_CONFIRMED` | Low | Not required |
| HIT panel screenshots | `hit-panel/docs/screenshots` | `NEEDS_OWNER_APPROVAL` | Medium (possible customer data) | Required, per file |
| HIT start date, ownership boundaries | none | `NEEDS_EVIDENCE` | — | — |
| Orbit is a subscription logistics platform with web apps and RBAC | published CV / Nativerse entry | `PUBLICLY_VERIFIED` | Low | Not required |
| Orbit architecture values comprehensibility and predictable cost | owner addendum | `OWNER_CONTEXT` | Low | Not required |
| Orbit modules, users, tenancy, billing, stack | none | `NEEDS_EVIDENCE` | — | — |
| `orbit.nativerse.space` | owner addendum + DNS probe | `NEEDS_EVIDENCE` (did not resolve) | — | — |
| GrowthOptix role = Mid Backend Developer | owner addendum | `OWNER_CONTEXT`, conflicts with CV | Low | Required (role decision) |
| Gox Analytics exists with the documented stack | `gox-analytics` | `REPO_CONFIRMED` | Low | Not required |
| Advertising integrations and `7d_click` fields | owner addendum + CV | `OWNER_CONTEXT` | Low | Not required |
| 340+ databases, 30M+ documents, ~1.7M events, 300+ organizations, 35K+ jobs, ~96%, 18 s → 1 ms | CV and earlier public copy | `NEEDS_EVIDENCE` | Medium (platform performance) | Required before any use |
| DREDD reviewers, reconciliation, human gate | repo + CV | `REPO_CONFIRMED` | Low | Not required |
| DREDD prompts, internal instructions | private context | `PRIVATE_DO_NOT_PUBLISH` | High | Never |
| Mi Lexio readings PWA and API | repositories + live site | `PUBLICLY_VERIFIED` | Low | Not required |
| Ranita Leopardo game and physics engine | repository + live site | `PUBLICLY_VERIFIED` | Low | Not required |
| Nalu offline-first business tool | repository + live app | `PUBLICLY_VERIFIED` | Low | Not required |
| Buko purpose, stack, contribution | owner list only | `NEEDS_EVIDENCE` | — | Required |
| Name "Carlos R. Hernandez" | owner instruction | `OWNER_CONTEXT` | None | Applied |

## 7. Missing evidence by project

| Project | Missing | Minimum to unblock |
| --- | --- | --- |
| Orbit Logistics | Working URL or demo, repository access, 2–3 identifiable flows, real stack, production status, personal commits | One reachable surface or approved architecture notes with file references |
| HIT Cargo | Start date, production status per surface, personal-vs-team ownership, screenshot authenticity | Owner review of each capture; a per-component ownership statement |
| GrowthOptix | Definition and measurement of every figure, component ownership, role reconciliation | A metrics sheet with source, period and method; a decision on the title |
| DREDD | Dates, runnable example, reconciliation evidence | A sanitised run with demonstration data |
| Mi Lexio | Definitive brand, milestone dates | Owner confirmation of the name |
| Ranita Leopardo | Dates, current status | Repository history is enough for most claims |
| Nalu | Dates, current status, owner's permission to name the business | Confirmation that the business can be referenced |
| Buko | Everything | Repository, deployment or a written description |

## 8. HIT Cargo screenshots — pending approval

Files live in `docs/evidence/hit-cargo/`, 1600×900 WebP, downloaded from `hit-panel`. They are not
in `public/` and no page references them.

| Capture | What it shows | State | Risk |
| --- | --- | --- | --- |
| `dashboard.webp` | Shipments list: guide numbers, provider, status, service type, date received, navigation | Pending approval | Guide numbers, provider names |
| `detail.webp` | Shipment detail: four-stage progress, event history, provider notes, status override | Pending approval | Notes, real shipment identifiers |
| `reports.webp` | Reports: totals by status, status by provider, service split, monthly volume, CSV/PDF export | Pending approval | Aggregate volumes, provider mix |

Before any approval: confirm the data is synthetic (not merely redacted), confirm the screens match
the current production panel, and approve each file individually. The case page currently renders an
abstract plate with an explicit "approved screenshot pending" caption.

## 9. GrowthOptix metrics — pending validation

None of these is published. They remain `NEEDS_EVIDENCE` until the owner supplies definition,
period, source and measurement method.

| Metric | Candidate | What must be confirmed |
| --- | --- | --- |
| Isolated databases | 340+ | What counts as one database, and the architecture that isolates them |
| Documents | 30M+ | What the documents represent and the collection scope |
| Events | ~1.7M | Period, event types, deduplication |
| Organizations | 300+ | What an organization is and whether the count is current |
| Sync jobs | 35K+ | Period, job definition, retry accounting |
| Success rate | ~96% | Denominator, failure classes, period |
| Contact-profile read | 18 s → 1 ms | Operation, dataset size, environment, whether it is a single query or a cache |
| Advertising platforms | 4 | Confirmed by the integration list |

Additional constraint: platform-level capacity must not be presented as an individual achievement.
If figures return, they need explicit attribution ("platform-wide" vs "measured on the path I
worked on").

## 10. Buko state

`draft-buko.json` stays a draft. Evidence checks performed on 2026-11-25:

- Owner's full repository list, including private repositories: no Buko repository.
- Public GitHub search: no matching project.
- Nativerse subdomains: no Buko deployment.
- No README, manifest, screenshot or commit referencing the name.

The build does not generate a route, the sitemap does not list it, and no page links to it. The home
and projects index show a single non-linked draft row at the end of the archive so the owner's order
is preserved without publishing a description that does not exist.

## 11. Secondary projects accordion

One native `<details>` per page, closed by default, on both the home page and `/projects/`.

- **Home and index:** Orbit, HIT Cargo and DREDD stay fully visible. Below them, "More work & open
  source" is a single control with the real count ("3 published · 1 in draft").
- **Closed state:** no thumbnails, no cards, no summaries — only the control, the count and the
  one-line framing inside the panel once opened.
- **Open state:** an ordered list of Mi Lexio, Ranita Leopardo, Nalu and the Buko draft row, each with
  category, verified summary and its case-study link where one exists.
- **Keyboard:** native `<summary>` responds to Enter and Space; no custom key handler, no
  `aria-expanded` to maintain by hand.
- **Screen readers:** `<details>`/`<summary>` expose the expanded state and the control role natively.
- **Motion:** the panel fades and lifts 4 px on open; `prefers-reduced-motion` collapses all
  durations to 0.01 ms.
- **Indexability:** the accordion is a disclosure, not a router. Every published case study keeps its
  URL, its internal links and its sitemap entry; closing the panel hides nothing from crawlers except
  the visual list.
- **No nested accordions.**

## 12. Interactive portrait

- Assets: `public/images/profile/carlos-renato-caricature.webp` (first frame) and
  `carlos-renato-real.jpg` (photograph), same 3:4 crop, served through `publicAsset()` so the `/me/`
  base path is preserved.
- Placement: About → Profile, beside the biography. It does not compete with the featured products.
- Default: illustration. A single native `<button>` carries `aria-label="Toggle between illustrated
  and professional portrait"` and `aria-pressed`.
- Hover (pointer devices only): previews the photograph; leaving the frame returns to the
  illustration unless the state is pinned.
- Click/tap: pins the photograph; a second activation returns to the illustration. Pinned state
  survives hover-out.
- Keyboard: the button receives focus, shows a 2 px aqua focus ring, and Enter/Space toggle it.
- Both images carry distinct, descriptive `alt` text; the photograph is loaded eagerly (opacity
  transition only) so the reveal does not flash.
- The caption names the current state and the hint, and updates on toggle.
- Container keeps a fixed 3:4 aspect ratio; no layout shift.
- No JavaScript: the illustration renders and the button does nothing visually. The photograph is
  hidden until activated; the illustration is the fallback.
- The OG card still shows the older name text baked into the image; it needs regeneration before a
  deploy if the name change must be reflected there.

## 13. Approvals required

1. **HIT screenshots** — approve or reject each of the three files.
2. **GrowthOptix role** — Mid Backend Developer (site) vs Senior Software Engineer (CV). Decide and
   make the CV match.
3. **GrowthOptix metrics** — validate each figure with definition and method, or keep them withdrawn.
4. **Orbit** — supply evidence or approve the short entry as final.
5. **Buko** — supply evidence or leave it as a draft.
6. **HIT dates and ownership boundaries** — needed before the case study can claim a period or
   individual authorship of each surface.
7. **Deploy** — this pass is local only; publishing it (and therefore removing the screenshots and
   figures from production) needs explicit approval.
8. **OG image** — regenerating `og/carlos-renato.jpg` with the new name requires image generation
   approval.

## 14. Search Console and Bing — pending

Sitemap: `https://carlosrenatohr.github.io/me/sitemap.xml`, 17 canonical URLs.

1. Add the URL-prefix property in Google Search Console.
2. Verify with the HTML file or meta tag, rebuild and deploy (needs approval).
3. Submit the sitemap; inspect `/projects/`, `/projects/orbit-logistics/`, `/projects/hit-cargo/` and
   `/projects/dredd/`.
4. Import the property into Bing Webmaster Tools and submit the same sitemap.
5. Confirm the retired sample URLs return 404, not a redirect.

None of this was executed: it requires owner access and a deploy.

## 15. Files changed in this pass

- `src/config/site.ts` — display name `Carlos R. Hernandez`, Product Engineer title, description, OG
  alt, job title.
- `src/content/profile/profile.json` — headline, short intro and biography rewritten for the
  Product Engineer positioning.
- `src/pages/index.astro` — new hero copy, secondary projects accordion, metric-free approach note.
- `src/pages/about.astro` — new profile copy, paragraph rendering, portrait beside the biography.
- `src/pages/projects/index.astro` — accordion replaces the compact shelf.
- `src/pages/experience.astro`, `skills.astro`, `ai.astro`, `contact.astro`, `src/lib/seo.ts` —
  titles and descriptions read the config name and the new role.
- `src/components/ProjectAccordion.astro`, `src/components/Portrait.astro` — new.
- `src/lib/content.ts` — `getDraftProjects()` for the labelled draft row.
- `src/styles/primitives.css` — accordion and portrait styles, reduced-motion inherited from the
  global rule.
- `src/content/projects/draft-buko.json` — title without the `[DRAFT]` prefix (status still draft).
- `docs/PORTFOLIO-CONTENT-AUDIT.md`, `CHANGELOG.md`, `board.md`,
  `docs/content/CONTENT-GAPS.md` — this record.

Earlier addendum changes still in the working tree: HIT context without images, GrowthOptix without
figures, Orbit context, the three captures under `docs/evidence/hit-cargo/`, and the deleted
`public/images/projects/` folder.

## 16. Validation

```
pnpm check        → 32 files: 0 errors, 0 warnings, 0 hints
pnpm build        → 17 pages
format:check      → Prettier clean
built HTML        → name "Carlos R. Hernandez", role "Product Engineer"
built HTML        → one closed <details class="more-work">, Buko listed as draft
built HTML        → portrait: caricature first, real photo behind the toggle
built HTML        → no 340+/30M+/1.7M/300+/35K/96%/18 s/1 ms strings
built HTML        → no HIT screenshot references
Buko              → no route generated
sitemap.xml       → 17 canonical URLs
responsive audit  → run against the local build (section below)
```

Responsive audit: 8 routes × 390 / 834 / 1440, plus SPA navigation marker. The accordion is closed in
the audited state; it was opened manually in the browser check for layout and keyboard behaviour.

**Not committed, pushed or deployed.** Production remains the 0.11.0 artifact described in section 1.
