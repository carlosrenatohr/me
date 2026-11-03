# Portfolio V1 — Execution Board

Status values: `NOT STARTED`, `IN PROGRESS`, `BLOCKED`, `IN REVIEW`, `DONE`.

Overall status: NOT STARTED
Current phase: 00 — Repository and tooling

## Phase 00 — Repository and tooling
- [ ] P00-01 Inspect environment and confirm Node.js/pnpm versions
- [ ] P00-02 Initialize Astro + TypeScript project
- [ ] P00-03 Add Preact only where justified
- [ ] P00-04 Configure styling and content collections
- [ ] P00-05 Install and verify selected UI skills for OpenCode
- [ ] P00-06 Create baseline checks and project documentation
- [ ] P00-07 Verify clean initial build

Gate: project runs locally, skills are discoverable, and documentation is in place.

## Phase 01 — Product and visual exploration
- [ ] P01-01 Review product and personal design profile
- [ ] P01-02 Inspect user-provided Nativerse references if supplied
- [ ] P01-03 Explore dark editorial direction A
- [ ] P01-04 Explore dark editorial direction B
- [ ] P01-05 Present desktop and mobile comparisons
- [ ] P01-06 Recommend a direction with rationale

Gate: STOP for owner approval. Do not implement full pages before approval.

## Phase 02 — Design foundation
- [ ] P02-01 Finalize color tokens and accessible contrast
- [ ] P02-02 Finalize typography and type scale
- [ ] P02-03 Define grid, spacing, borders, surfaces, and motion
- [ ] P02-04 Build shared layout and UI primitives
- [ ] P02-05 Document responsive behavior

Gate: design system reviewed and consistent with personal design profile.

## Phase 03 — Public website
- [ ] P03-01 Implement global layout and navigation
- [ ] P03-02 Implement Home
- [ ] P03-03 Implement Projects listing
- [ ] P03-04 Implement Project detail template
- [ ] P03-05 Implement About and Experience
- [ ] P03-06 Implement Contact and CV download
- [ ] P03-07 Add validated structured content for approved projects

Gate: all agreed public routes work with real/approved content or clearly marked placeholders.

## Phase 04 — Quality assurance
- [ ] P04-01 Inspect desktop rendering
- [ ] P04-02 Inspect tablet and mobile rendering
- [ ] P04-03 Run accessibility checks
- [ ] P04-04 Verify SEO and social metadata
- [ ] P04-05 Verify image loading and optimization
- [ ] P04-06 Run type checks, tests, lint, and production build
- [ ] P04-07 Fix and re-check all critical/high findings

Gate: no unresolved critical/high defects; owner reviews the release candidate.

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
