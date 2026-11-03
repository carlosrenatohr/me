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

- [ ] P01-01 Review product and personal design profile
- [ ] P01-02 Inspect user-provided Nativerse references if supplied
- [ ] P01-03 Explore dark editorial direction A
- [ ] P01-04 Explore dark editorial direction B
- [ ] P01-05 Present desktop and mobile comparisons
- [ ] P01-06 Recommend a direction with rationale

Notes: no Nativerse assets were supplied. The owner confirmed Phase 01 proceeds from
`PERSONAL-DESIGN-PROFILE.md` without claiming to have seen Nativerse's actual identity.

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
