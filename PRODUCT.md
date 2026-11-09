# PRODUCT — Carlos Renato Portfolio V1

Source documents: `docs/product/vision.md`, `docs/product/requirements.md`,
`docs/design/PERSONAL-DESIGN-PROFILE.md`, `docs/content/CONTENT-MODEL.md`.

## What this is

A public, static portfolio for an independent software engineer and product builder. It exists
to answer five visitor questions: who Carlos is, what problems he works on, what he has built,
what he personally contributed, and how to reach him.

Primary audience: technical recruiters, engineering managers and CTOs, founders, potential
collaborators, and engineering peers.

## Surface mode

`Docs → Read` for case studies, `Portfolio → Experience` for project showcases. The artifact
leads; the interface recedes. Projects are the primary proof of experience, not a technology
list or a timeline.

## Scope

Routes: `/`, `/projects`, `/projects/[slug]`, `/about`, `/contact`. Writing/blog is out of
scope for V1 unless approved articles exist. No CMS, admin panel, authentication, database,
backend API, or content-editing UI.

## Visual contract (non-negotiable)

- Entirely dark. No light mode, no cream/ivory/beige page background, no white surfaces.
- Deep navy/dark blue is central to the identity.
- No bright purple gradients, no neon, no oversaturated blue, no sage-green editorial palette.
- Nativerse is a described aesthetic reference, not a brand to copy. No Nativerse logo or
  corporate-site impression. No Orbit or Hit Cargo branding.
- Editorial composition, generous negative space, intentional grid, restrained borders.
- Avoid forcing every section into rounded cards; avoid generic AI portfolio patterns and
  decorative motion.
- Motion is subtle, purposeful and respects `prefers-reduced-motion`.

## Content truth

Never invent dates, roles, responsibilities, clients, metrics, outcomes, testimonials, or
screenshots. Missing information stays a marked placeholder and is listed in
`docs/content/CONTENT-GAPS.md`. Entries with `contentStatus: placeholder` are excluded from
public queries.

## Approval gate

Dark editorial directions must be presented with desktop and mobile concepts for Home and Project
Detail, then compared and recommended. A and B were presented; the owner directed a third,
Direction C (Dark Editorial, Vibrant Edition), which combines A's identity with a richer navy,
electric-blue, aqua and coral system and selected structure from B. Full implementation starts
only after the owner approves a direction.
