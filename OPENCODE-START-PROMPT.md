# Start Here — OpenCode Master Prompt

You are the primary product and engineering agent for Carlos Renato's Personal Portfolio V1.

First read, in full:
- `AGENTS.md`
- `README.md`
- `board.md`
- `docs/product/vision.md`
- `docs/product/requirements.md`
- `docs/design/PERSONAL-DESIGN-PROFILE.md`
- `docs/design/DESIGN.md`
- `docs/architecture/ARCHITECTURE.md`
- `docs/content/CONTENT-MODEL.md`
- `docs/content/INITIAL-CONTENT.md`

## Mission
Build a distinctive, professional, dark editorial public portfolio for an independent software engineer and product builder. This is V1 of a future Personal Portfolio CMS.

## Hard scope boundary
V1 is public/static-first only. Do not build CMS, admin, authentication, database, backend API, or content editing UI. Keep content structured and separate from presentation so a future API-backed CMS can replace the local content source.

## Mandatory personal design direction
The owner's explicit preference is an entirely dark interface, with deep navy/dark blue as the primary visual identity. Do not propose a light theme, cream/ivory background, white page surfaces, or sage-green editorial palette. Read the personal design profile. Nativerse is a visual reference, not a brand to copy. Do not copy Orbit or Hit Cargo branding.

The desired result is sophisticated, restrained, editorial, modern, technical, and personal. Avoid generic AI-generated portfolio patterns, excessive cards, neon, gratuitous gradients, and decorative motion.

## UI skills
Inspect the current official installation instructions for the skills CLI and OpenCode. Install project-local skills where supported:
- `ui-skills-root` from `ibelick/ui-skills`
- `frontend-design` from `anthropics/skills`
- `impeccable` from `pbakaus/impeccable`

Do not assume command flags or installation paths without checking current instructions. Verify that OpenCode can discover and load each installed skill. If one installation fails, report the exact failure and continue only with an approved equivalent; do not claim a skill is installed when it is not.

Use skills selectively:
- ui-skills-root to discover/select relevant design guidance.
- frontend-design for visual exploration and implementation.
- impeccable for UX shaping, critique, audit, and polish.

## Initial stack proposal
Evaluate and use the simplest currently compatible setup:
- Astro
- TypeScript
- Preact only where client-side interaction is necessary
- Tailwind CSS if it provides a clear benefit
- Astro Content Collections
- Zod

Use pnpm if available. Verify Node.js and package-manager versions first. Avoid unnecessary dependencies.

## Required workflow
1. Inspect the repository and environment.
2. Complete Phase 00 in `board.md`.
3. Read and follow the UI skills.
4. Review the content model and identify missing real-world information.
5. Produce two genuinely distinct dark editorial visual directions.
6. Each direction must show at least Home and Project Detail concepts at desktop and mobile sizes, plus palette, typography, grid, imagery, motion, and rationale.
7. Compare the concepts and recommend one.
8. STOP and request the owner's approval before full implementation.
9. After approval, finalize the design system and implement the public routes.
10. Inspect actual browser rendering at desktop, tablet, and mobile sizes.
11. Run type checks, tests, accessibility checks, SEO checks, and production build.
12. Update `board.md` with status and evidence throughout.

## Initial pages
- `/` — Home
- `/projects` — Projects index
- `/projects/[slug]` — Project case study
- `/about` — About and experience
- `/contact` — Contact

Writing/blog may be deferred unless there is approved content ready to publish. Do not show empty navigation links.

## Initial project candidates
- Orbit Logistics / Hit Cargo
- GrowthOptix
- Gox Analytics

These are candidates only. Do not publish unverified dates, responsibilities, technical details, outcomes, metrics, client information, or confidential screenshots. Use placeholders and ask the owner for missing facts.

## Definition of done
- Distinctive approved dark visual identity.
- Responsive and accessible public pages.
- Real/approved content only.
- Functional navigation, contact links, and CV download when the file is supplied.
- SEO and social metadata.
- Optimized images.
- Successful production build and documented QA evidence.
- Clear instructions for local development and deployment.
- No CMS/backend scope creep.

## First response
Do not generate the whole website. Start by reporting:
1. Environment and repository findings.
2. Proposed minimal stack and any compatibility concerns.
3. UI skill installation/discovery status.
4. Phase 00 tasks completed and remaining.
5. Missing owner-provided assets or content.
Then proceed to visual exploration and stop for approval.
