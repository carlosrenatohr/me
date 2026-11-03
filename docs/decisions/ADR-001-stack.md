# ADR-001 — V1 stack and tooling baseline

Status: Accepted
Date: 2026-11-03
Phase: 00

## Context

V1 is a static-first public portfolio. `docs/architecture/ARCHITECTURE.md` proposes Astro,
TypeScript, selective Preact, Tailwind "if justified", Content Collections and Zod, and
requires version and compatibility checks before installing.

Two environment facts changed the default setup:

1. The repository lives inside a parent pnpm workspace at `/home/renato/pnpm-workspace.yaml`.
   Running `pnpm install` walked up to that root, installed nothing locally, and produced no
   project lockfile.
2. The latest stable TypeScript (7.0.2) is outside the peer range of the current `astro check`
   implementation.

## Decisions

### Astro 7.4.5, static output

Installed as the only runtime dependency. `pnpm build` runs `astro check && astro build`, so a
type error fails the build instead of being silently transpiled away.

### TypeScript 6.0.3 pinned, strict template

`@astrojs/check@0.9.12` declares `typescript: ^5.0.0 || ^6.0.0`. TypeScript 7.0.2 is the latest
stable release but is not compatible with the type-check toolchain, so the project pins
**6.0.3**, the newest stable release inside the supported range. `tsconfig.json` extends
`astro/tsconfigs/strict`, which enables `strict`, `noUncheckedIndexedAccess` and
`verbatimModuleSyntax`. No beta, RC or nightly release is used.

Revisit when `@astrojs/check` widens its peer range to TypeScript 7.

### No Tailwind

Editorial design depends on precise control over measure, optical alignment, type scale and
grid placement. A token layer plus component-scoped CSS keeps those decisions explicit and
adds no build-time dependency. `docs/architecture/ARCHITECTURE.md` allows Tailwind only "if it
provides a clear benefit"; it does not, here.

Revisit only if repeated layout patterns become measurably expensive to maintain by hand.

### No Preact yet

No approved interaction requires client state. Mobile navigation can be implemented with
native HTML and CSS. Preact and `@astrojs/preact` are installed only when a real requirement
appears, and that requirement must be recorded in a new ADR.

### Local pnpm workspace root

`pnpm-workspace.yaml` with `packages: []` makes this repository its own workspace root, so
`pnpm-lock.yaml` and `node_modules/` stay inside the repository and the lockfile can be
committed. Without it, dependencies resolve against `/home/renato` and reproducibility is lost.

### Content Collections behind a repository layer

`src/content.config.ts` defines `profile`, `project` and `experience` with Zod schemas that
mirror `docs/content/CONTENT-MODEL.md`. Every entry carries `contentStatus: 'placeholder' |
'verified'`, and `src/lib/content.ts` exposes the only public query surface. Pages never import
`astro:content` directly, so a future CMS adapter replaces function bodies without touching
presentation.

Public queries return only projects with `status: 'published'` **and**
`contentStatus: 'verified'`. Evidence: the Phase 00 build-check page renders
`Entries loaded: 1 · publishable: 0` with one placeholder fixture present.

### Styling baseline

`src/styles/tokens.css` holds provisional values taken from
`docs/design/PERSONAL-DESIGN-PROFILE.md`. They are marked provisional and must not be treated
as approved tokens; Phase 02 replaces them after the owner selects a direction.

## Consequences

- Reproducible installs through the committed `pnpm-lock.yaml`, scoped to this repository.
- One less framework and one less CSS toolchain to maintain.
- Type checking is part of the build, so CI and local builds fail on type errors.
- TypeScript is one major behind latest until the checker catches up.
