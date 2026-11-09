---
status: accepted
date: 2026-08-20
---

# ADR-004: Use `@/` alias for module imports in `src/pages/projects/`

## Context

During Phase 03 implementation of the public portfolio, pages in `src/pages/projects/`
and `src/pages/projects/[slug]/` failed both `astro check` (TypeScript) and the Vite build
with `Cannot find module '../lib/content'` and `Could not resolve '../styles/base.css'`.
The same relative imports resolved correctly from `src/pages/index.astro` at the same path
depth.

This was the first meaningful `astro check` failure after the initial project scaffold.
Root cause investigation traced the failure to Astro 7's language server (Volar) handling
of the `src/pages/projects/` route directory in the TypeScript program.

## Decision

Adopted absolute imports using the `@/` path alias for all module imports in
`src/pages/projects/` and `src/pages/projects/[slug]/`:

```ts
import { getPublishedProjects } from '@/lib/content';
import { SITE } from '@/config/site';
import '@/styles/base.css';
```

Added `baseUrl` and `paths` to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Also extended the `Project` type in `src/lib/content.ts` to include `slug`:

```ts
export type ProjectWithSlug = Project & { slug: string };
export type PublicProject = ProjectWithSlug & {
  data: { status: 'published'; contentStatus: 'verified'; [key: string]: unknown };
};
```

## Consequences

- **Positive:** `pnpm build` → `4 page(s) built`; `pnpm check` → `0 errors, 0 warnings, 3 hints`.
- **Positive:** Unified import style across all pages and components.
- **Negative:** Pages that use `project.slug` must cast to `ProjectWithSlug[]` (or use a
  computed property on the content collection) instead of the raw `CollectionEntry<'project'>`.

## Status

Accepted. The working tree reflects the full implementation of all Phase 03 pages.

Co-Authored-By: Codebuff <noreply@codebuff.com>
