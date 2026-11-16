# Content Model — V1

All content is typed and validated in `src/content.config.ts`. Presentation never reads
raw files: pages go through `src/lib/content.ts`, which is the seam a future CMS adapter
replaces.

Every collection carries `contentStatus` (`placeholder` | `verified`). Placeholder entries
are excluded from public queries. Projects additionally require `status: published`, with one
exception: `status: sample` publishes a demonstration entry that every surface labels as
sample, so the case-study layout can be reviewed before real work exists.

## Profile — `src/content/profile/profile.json`

| Field | Notes |
| --- | --- |
| `name` | Full name; the wordmark stays `Carlos Renato` (see `src/config/site.ts`) |
| `headline` | One line of positioning |
| `shortIntro` | Hero lede on Home |
| `biography` | Prose on Home (Approach) and About |
| `contentStatus` | Gate for every profile field |
| `location` | City, country |
| `email` | Rendered in the footer and on Contact |
| `cvPath` | Optional `/cv.pdf` once an approved file exists |
| `yearsExperience` | "10+ years" — stated by the owner, never inferred |
| `availability` | "Open to new work"; omitted when not true |
| `education[]` | `credential`, `institution`, `period`, optional `location` |
| `portrait` | Optional `{ src, alt }` |
| `links[]` | `label`, `url`, `kind` |

## Project — `src/content/projects/<slug>.md`

Filename = slug = URL. Template: `docs/content/templates/project-case-study.md`.

| Field | Notes |
| --- | --- |
| `title`, `summary`, `category` | Identity and lede |
| `kind` | `personal` (listed first) or `client` |
| `status` | `draft` \| `published` \| `sample` (renders, always labelled) |
| `contentStatus` | `placeholder` \| `verified` |
| `featured`, `featuredOrder` | Home feature slot and ordering |
| `role`, `period`, `surfaces`, `technologies` | Spec strip |
| `cover` | Optional `{ src, alt }` — otherwise the abstract plate |
| `screenshots[]` | `{ src, alt, caption? }`, rendered under "Screens" |
| `context`, `contribution`, `approach` | Narrative, paragraph-separated |
| `quote` | Optional pull quote |
| `technicalDecisions[]` | `{ title, body }` → `D1…Dn` |
| `outcomes[]` | → `O1…On`; verified only |
| `links[]` | `live` \| `repository` \| `case-study` \| `reference` |
| `confidentialityNote` | What is withheld and why |

## Experience — `src/content/experience/<org>.md`

Template: `docs/content/templates/experience-role.md`.

| Field | Notes |
| --- | --- |
| `organization`, `role` | Identity |
| `contentStatus` | Only `verified` entries are rendered |
| `group` | `primary` (professional history) or `additional` ("Earlier") |
| `location` | City, country (Remote) |
| `period` | `YYYY-MM` start, `YYYY-MM` or `present` end; sorts chronologically |
| `summary` | One sentence of scope |
| `contributions[]` | Concrete, verifiable bullets |
| `technologies[]` | Short names |

Period formatting (`2026-03` → `Mar 2026`, `present` → `Present`) lives in
`src/lib/content.ts`, not in the content files.

## Ordering

1. `kind: personal` before `kind: client`.
2. `featuredOrder` ascending, then title.
3. Experience: newest `period.start` first; the page splits `primary` from `additional`.

## Content integrity

Do not invent values. Missing information is a marked placeholder, never a plausible
guess. Client names, dates, metrics and screenshots require owner approval; the register
of open items is `docs/content/CONTENT-GAPS.md`.
