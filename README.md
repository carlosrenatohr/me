# Carlos Renato — Personal Portfolio V1

A dark editorial portfolio for an independent software engineer and product builder.

## V1 scope

Public website only. No CMS, admin, database, authentication, or backend API.

## Stack

- Astro 7 (static output)
- TypeScript 6.0.3, `strict` template
- Hand-authored CSS with a token layer
- Astro Content Collections + Zod, behind `src/lib/content.ts`
- pnpm 10.33, lockfile committed

Rationale and rejected alternatives: `docs/decisions/ADR-001-stack.md`.

## Commands

```bash
pnpm install      # install dependencies
pnpm dev          # local dev server
pnpm check        # astro check (types + content schemas)
pnpm build        # astro check && astro build
pnpm preview      # preview the production build
pnpm format       # prettier
```

Requires Node.js >= 22.23.4. The repository has its own `pnpm-workspace.yaml` so dependencies
and the lockfile stay inside the project.

## Before implementation

1. Read `OPENCODE-START-PROMPT.md`.
2. Review the product, design, architecture, and content documents.
3. Complete Phase 00 and visual exploration.
4. Stop for owner approval before full implementation.

## Content policy

Initial project candidates: Orbit Logistics / Hit Cargo, GrowthOptix, and Gox Analytics. These
are candidates, not permission to publish unverified details. Confirm dates, role,
contributions, outcomes, public assets, and confidentiality with the owner. Open questions live
in `docs/content/CONTENT-GAPS.md`.
