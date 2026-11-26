# Content Gaps — V1

Status: open
Purpose: track every fact the owner must supply or approve before it can be published.

Rules: nothing in this list may be filled with plausible-sounding guesses. Entries marked
`contentStatus: placeholder` are excluded from public queries by `src/lib/content.ts`.

## Resolved — 2026-11-25 (0.11.0)

The six fictional samples are retired and ten projects are published from public repositories,
live deployments and the CV. Truth matrix and remaining limitations:
`docs/PORTFOLIO-CONTENT-AUDIT.md`.

- [x] Working approach for the About/Home statement band — replaced with the stated approach.
- [x] Orbit / HIT Cargo at product level — HIT Cargo is fully evidenced (three repositories and a
  live site); Orbit is published as an in-development entry with its role and product shape only.
- [x] DREDD — published from the public workflow repository and the CV; dates omitted.

Still open: Orbit architecture or demo, Buko, HIT Cargo dates and ownership boundaries,
GrowthOptix disclosure depth, HIT screenshot approval, portrait.

## Addendum pass — 2026-11-25 (deployed in 0dccae6)

- [ ] Approve or reject each HIT Cargo screenshot in `docs/evidence/hit-cargo/`.
- [ ] Reconcile the GrowthOptix role: the owner says Mid Backend Developer, `public/cv.pdf`
  still says Senior Software Engineer. Regenerate the CV or correct one of the two.
- [ ] Validate the GrowthOptix figures (databases, documents, events, organizations, sync jobs,
  latency) or keep them unpublished. The site no longer publishes any of them.
- [ ] Supply Orbit evidence: reachable URL, repository or approved architecture notes.
  `orbit.nativerse.space` did not resolve on 2026-11-25.
- [ ] Supply Buko evidence or leave it as a draft.
- [ ] Regenerate `public/og/carlos-renato.jpg`; the social card still shows the previous name.
- [ ] Confirm the public name form “Carlos R. Hernandez” is also the one used on LinkedIn and the CV
  header, or say which surface should differ.

## Phase 02 — Design foundation (this checklist)

- [ ] Direction C approved as the foundation for the public site (owner-directed 2026-11-03).
- [ ] Tokens frozen in `src/styles/tokens.css` after the owner confirms the palette volumes.
- [ ] Type scale, grid, spacing, borders and motion frozen after the owner confirms the proportions.
- [ ] Shared layout and UI primitives reviewed.
- [ ] Responsive behaviour documented.

## Profile

Supplied 2026-11-15 from `Carlos_Hernandez_CV (0).pdf` (dated 2026-11-12) and published:
headline, short intro, biography, location (Managua, Nicaragua), `10+ years`, education
(UNI, 2011—2016) and six roles.

Resolved by the owner (2026-11-15):

- [x] Public email `carlosrenatohr@gmail.com`.
- [x] Phone `+505 8759 7244` published, as a `tel:` link on Contact.
- [x] CV published as `public/cv.pdf` and previewed inline with the browser's PDF viewer
  (`cvPath: /cv.pdf`). Replace that file when a newer CV is approved.
- [x] GrowthOptix (Aug 2025—Aug 2026) and Nativerse (Mar 2026—present) overlap on purpose:
  the work was parallel. GrowthOptix is the last employer; Nativerse is the owner's own
  brand for independent work, and its projects are authored as `kind: personal`.
- [x] Availability copy changed from "Open to new work" to "Open to new projects" and is
  rendered as a status line on the Home hero.

Still open:

- [ ] Optional portrait: image file, alt text, and permission to publish.
- [ ] Approved working philosophy for the About/Home statement band (still a marked placeholder).

## Project 1 — Orbit Logistics / Hit Cargo

Superseded by 0.11.0: HIT Cargo is published, Orbit is a short in-development entry. The list
below is kept as the record of what was missing before the rebuild.

Seed: `src/content/projects/orbit-logistics.json` (`kind: personal`, everything marked DRAFT).

- [ ] Exact public project name.
- [ ] Role held and what Carlos personally designed and built.
- [ ] Verifiable period (start and end).
- [ ] Publishable screenshots or diagrams, with permission.
- [ ] Verifiable outcomes; no metrics may be invented.
- [ ] Architectural details that are safe to disclose.
- [ ] Whether the live product can be linked, and under which name.

## Project 4 — DREDD

Resolved in 0.11.0 from the public workflow repository; dates remain omitted.

Seed: `src/content/projects/dredd.json` (`kind: personal`). Real tool, unwritten case study.

- [ ] Period and tooling used.
- [ ] What a review run actually does, in the owner's words.
- [ ] Approved screenshots of a review report.
- [ ] Whether the workflow can be shown publicly at all.

## Project 2 — GrowthOptix

- [ ] Exact role and verifiable period.
- [ ] Specific contributions that can be disclosed.
- [ ] Approved screenshots or public references.
- [ ] Verifiable outcomes.
- [ ] Confidentiality restrictions.
- [ ] Whether the product name can be used publicly.

## Project 3 — Gox Analytics

- [ ] Which implementation stage the case study describes.
- [ ] Exact role.
- [ ] Architecture and endpoints that are safe to describe.
- [ ] Real usage or outcome data, if any exists.
- [ ] Approved screenshots or diagrams.

## Site-wide

- [ ] Final domain, or confirmation that canonical URLs stay configurable via `PUBLIC_SITE_URL`.
- [ ] Deployment target decision (Phase 05).
- [ ] Confirmation that project ordering is editorial, not chronological.
- [ ] Any legal or confidentiality constraints on naming employers or clients.

## Assets

No product screenshots or portraits exist in the repository. Every visual in the design
lab and the site is a placeholder plate composed for layout testing, never presented as a
real product screenshot. Cover and `screenshots` are documented in
`docs/content/PROJECT-AUTHORING.md` §4.

## Open questions

- [ ] Should the footer email use coral?
- [ ] Is the aqua italic emphasis in the hero headline right, or should it stay in the Approach statement?
- [ ] Do approved project screenshots exist, or should the site plan for diagrams and abstract plates only?
