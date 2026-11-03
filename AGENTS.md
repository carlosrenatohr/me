# Agent Instructions — Carlos Renato Portfolio V1

## Source of truth
Before planning or changing user-facing UI, read:
- `docs/product/vision.md`
- `docs/product/requirements.md`
- `docs/design/PERSONAL-DESIGN-PROFILE.md`
- `docs/design/DESIGN.md`
- `docs/content/CONTENT-MODEL.md`
- `board.md`

If documents conflict, the explicit latest owner decision wins. Ask before changing a non-negotiable preference.

## Product scope
V1 is a public, static-first portfolio. Do not implement a CMS, admin panel, authentication, database, backend API, or content-management UI.

The architecture must make a future CMS/API migration possible without rebuilding the public presentation layer.

## Personal visual constraints
- Dark mode is mandatory.
- Deep navy/dark blue is the primary visual direction.
- Do not use light mode, white/cream/ivory page backgrounds, beige editorial palettes, or sage-green as the main accent.
- Do not copy Nativerse, Orbit, or Hit Cargo branding. Nativerse is a visual reference only.
- Avoid generic AI portfolio patterns, excessive cards, neon, gratuitous gradients, and decorative animation.
- Read `PERSONAL-DESIGN-PROFILE.md` before design work.

## Content integrity
Never invent employment history, dates, responsibilities, client names, metrics, business outcomes, testimonials, or project screenshots.
Use clearly marked placeholders for missing information. Keep confidential or client-sensitive information out of public content unless the owner approves it.

## Workflow
- Work in small, verifiable tasks.
- Update `board.md` as tasks move through status.
- Record assumptions, blockers, and decisions.
- Do not mark a task complete without evidence.
- Do not implement the full website before the owner approves one of the visual directions.
- Use read-only specialist agents for design and quality reviews where useful; the primary agent owns implementation and integration.
- Do not create unnecessary agents or parallelize conflicting edits.

## Quality
Inspect the rendered site in a real browser at desktop, tablet, and mobile sizes.
Check accessibility, keyboard navigation, focus states, reduced motion, responsive overflow, links, metadata, image optimization, and production build.
Fix critical/high-severity issues before release.
