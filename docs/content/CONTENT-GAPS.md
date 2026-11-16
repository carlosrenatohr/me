# Content Gaps — V1

Status: open
Purpose: track every fact the owner must supply or approve before it can be published.

Rules: nothing in this list may be filled with plausible-sounding guesses. Entries marked
`contentStatus: placeholder` are excluded from public queries by `src/lib/content.ts`.

## Phase 02 — Design foundation (this checklist)

- [ ] Direction C approved as the foundation for the public site (owner-directed 2026-11-03).
- [ ] Tokens frozen in `src/styles/tokens.css` after the owner confirms the palette volumes.
- [ ] Type scale, grid, spacing, borders and motion frozen after the owner confirms the proportions.
- [ ] Shared layout and UI primitives reviewed.
- [ ] Responsive behaviour documented.

## Profile

Supplied 2026-11-15 from `Carlos_Hernandez_CV (0).pdf` (dated 2026-11-12) and published:
headline, short intro, biography, location (Managua, Nicaragua), email, LinkedIn, GitHub,
`10+ years`, education (UNI, 2011—2016) and six roles.

Still open:

- [ ] Confirm the public email is `carlosrenatohr@gmail.com` and stays published.
- [ ] Confirm whether the phone number on the CV may be published (currently omitted on purpose).
- [ ] CV file (PDF) and whether it may be downloaded publicly — `cvPath` is empty, so Contact
  shows the marked placeholder instead of a dead link.
- [ ] Optional portrait: image file, alt text, and permission to publish.
- [ ] Approved working philosophy for the About/Home statement band (still a marked placeholder).
- [ ] `availability: "Open to new work"` — confirm it is current, or remove it.
- [ ] CV lists GrowthOptix as Aug 2025—Aug 2026 and Nativerse as Mar 2026—present (two months
  overlap). Confirm both dates before they are published as-is.

## Project 1 — Orbit Logistics / Hit Cargo

Seed: `src/content/projects/orbit-logistics.md` (`kind: personal`, everything marked DRAFT).

- [ ] Exact public project name.
- [ ] Role held and what Carlos personally designed and built.
- [ ] Verifiable period (start and end).
- [ ] Publishable screenshots or diagrams, with permission.
- [ ] Verifiable outcomes; no metrics may be invented.
- [ ] Architectural details that are safe to disclose.
- [ ] Whether the live product can be linked, and under which name.

## Project 4 — DREDD

Seed: `src/content/projects/dredd.md` (`kind: personal`). Real tool, unwritten case study.

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
