# Architecture — V1

## Approach
Static-first Astro application. Use Preact only for interactions that genuinely require client-side state.

## Proposed technologies
- Astro
- TypeScript
- Preact, selectively
- Tailwind CSS if justified and currently compatible
- Astro Content Collections
- Zod

The agent must check current versions and compatibility before installing.

## Content source
Use local typed content files / Astro Content Collections. Keep content independent from UI components.

## Future CMS compatibility
- Define stable content schemas and TypeScript types.
- Keep page components dependent on content interfaces, not filesystem APIs.
- Centralize content retrieval behind a small repository/service layer.
- Do not introduce a database or API in V1.
- Document how a future API adapter could implement the same interfaces.

## Deployment
Recommend a simple static hosting target after evaluating current project needs. Do not bind the code to a final domain; domain is undecided.

## Performance
Prefer static rendering, optimized responsive images, minimal client JavaScript, and no unnecessary third-party scripts.
