# ADR-005 — Project kind, Markdown experience, and periods as data

Date: 2026-11-15
Status: Accepted
Owner decision behind it: personal and side projects must lead the portfolio; experience
must be summarized rather than a role-by-role wall.

## Context

The first content model treated every project the same and stored experience as JSON with
free-form date strings. Three problems followed:

1. Client work and personal products have different weight in this portfolio, and the Work
   index had no way to express that.
2. `period.start` values such as `Aug 2025` sort lexicographically, so "newest first" was
   wrong the moment two roles crossed a year boundary.
3. Writing a role or a case study meant editing JSON or a heavily commented file, with no
   template to copy.

## Decision

- Add `kind: personal | client` to projects. Ordering is `kind` first, then
  `featuredOrder`, then title; `/projects/` renders one section per kind.
- Store experience as Markdown frontmatter with `period: { start: YYYY-MM, end: YYYY-MM |
  present }`. Formatting for display is a presentation concern in `src/lib/content.ts`.
- Keep long-form project narrative in frontmatter fields, which the case-study template
  documents field by field.
- Ship copy-ready templates under `docs/content/templates/` instead of an underscore file
  inside the collection: the glob loader does not ignore `_`-prefixed files, so a template
  stored there would be a real content entry.

## Consequences

- Ordering and grouping live in one function (`byDisplayOrder`, `getExperienceGroups`),
  not in pages.
- Dates are validated at build time; a malformed month fails `pnpm check`.
- The content model now has three shapes to document (profile JSON, project MD, experience
  MD), each with a template.
- A future CMS adapter must return the same field names; nothing outside
  `src/lib/content.ts` reads collections directly.
