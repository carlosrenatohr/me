# Reference analysis — cesargaray.com

Reviewed 2026-11-15 as an external reference for information architecture, not for visual
style. The site is a Spanish-language portfolio by a Nicaraguan product builder. Nothing
below is copied: each idea is either re-expressed in the Direction C system or declined
with a reason.

## What the reference does well

| Pattern | Why it works |
| --- | --- |
| One positioning sentence, then proof | The reader learns what the person sells before any project grid |
| Status line ("Abierto a nuevas oportunidades") | Removes the "is this person available?" email |
| Products shown with a name, one-line outcome and stack chips | A recruiter can scan three products in ten seconds |
| Case study per product, linked from the card | The card sells, the case study proves |
| "Cómo trabajo": the lifecycle, step by step, with a concrete example per step | Shows judgment instead of a skills list |
| Experience compressed into years, then education | Nobody reads a role-by-role history on a portfolio |
| Skills grouped by capability, not by logo | Reads as a point of view |

## What this portfolio adopts

1. **Availability + years in the hero meta.** `profile.availability` and
   `profile.yearsExperience` now feed the Home hero strip. No new section.
2. **Personal and side projects first.** `kind: personal | client` on every project; the
   Work index groups by kind and personal work leads. This is an owner requirement, and the
   reference confirms it reads better than a single chronological list.
3. **Stack chips under a project.** Already present as `technologies` in the spec strip and
   compact meta; no visual change needed.
4. **Work summarized, education listed.** `experienceSummary` + `education[]` on the profile,
   with the six roles collapsed into a compact record instead of a page of bullets.
5. **Availability line is honest.** It reads from content, so it disappears when the owner
   does not set it. No invented "open to work" badge.

## What this portfolio declines

| Pattern | Reason |
| --- | --- |
| Three equal product cards in a row | Violates the approved Direction C: feature + offset pair, never a card table |
| An 8-step illustrated lifecycle | Duplicates the Approach statement and adds decoration; the case studies already show process |
| Metric-first copy ("340 databases") in the hero | Metrics belong in case-study outcomes, where the reader has context |
| Initials-in-a-square as project imagery | Reads as a placeholder, and we already ship an approved abstract plate |
| Light-on-dark gradients and glow | Explicitly excluded by `PERSONAL-DESIGN-PROFILE.md` |
| Copying the exact section order or wording | Different person, different claims; only the information architecture is borrowed |

## Net structural changes

- `src/content.config.ts`: `kind`, `experienceSummary`, `availability`, `education[]`,
  and the experience collection moved to Markdown with `YYYY-MM` periods.
- `src/pages/projects/index.astro`: sections by kind, personal first.
- `src/pages/about.astro`: years, roles split into primary and additional, education.
- `src/lib/content.ts`: one place that formats periods and orders entries.
