# Authoring content

Every page on this site reads from typed content. Nothing is published while a field
still says `DRAFT`, and nothing reaches a public route unless `status: published` and
`contentStatus: verified` are both set.

Two starting points:

- **A new case study** → `docs/content/templates/project-case-study.md`
- **A new role** → `docs/content/templates/experience-role.md`

```bash
cp docs/content/templates/project-case-study.md src/content/projects/my-project.md
cp docs/content/templates/experience-role.md    src/content/experience/my-org.md
```

The project filename is the URL: `my-project.md` → `/projects/my-project/`. Renaming it
later breaks the link.

---

## 1. What to gather first

| Needed | Goes into |
| --- | --- |
| The problem in the words of the people who had it | `context` |
| Your exact role and the edge of your scope | `role`, `contribution` |
| Dates you can defend | `period` |
| Two to four decisions you actually made | `technicalDecisions` |
| Results you or the client can verify | `outcomes` |
| Approved screenshots, or none | `cover`, `screenshots` |

If one is missing it stays a placeholder. Never add a client name, a metric, a
testimonial or a screenshot that is not approved for publication.

---

## 2. Why `kind` matters

`kind` is not metadata decoration: it decides where a project appears.

| `kind` | Listed under | Order |
| --- | --- | --- |
| `personal` | "Personal & side projects" | First, always |
| `client` | "Client & product work" | After personal work |

Inside a group, `featuredOrder` (lower first) then title decides. On Home the first
project with `featured: true` becomes the wide feature (falling back to the first
published project) and the next two are the offset pair. Keep `featured` on exactly one
project; on /projects/ every group leads with its own first entry.

---

## 3. Samples in the repository

These files are not filler: each one demonstrates a different authoring situation.

| File | Kind | Shows |
| --- | --- | --- |
| `src/content/projects/orbit-logistics.md` | personal | A real product with real stack but unwritten narrative — every fact still needs the owner's words |
| `src/content/projects/dredd.md` | personal | A personal tool where outcomes are qualitative, not metrics |
| `src/content/projects/draft-operations-platform.md` | personal | The full field surface: quote, decisions, outcomes, confidentiality note |
| `src/content/projects/draft-analytics-console.md` | client | Client work with no cover and no links |
| `src/content/projects/draft-confidential-client.md` | client | How to publish a case study without naming the client |

Copy the closest sample rather than starting from an empty file — the template explains
the fields, a sample shows how they read together.

`src/content/experience/` holds the owner's real record (six roles). The About page
splits them into "primary" and "Earlier" and lists education from
`src/content/profile/profile.json`.

---

## 4. Field reference

### Identity

| Field | Appears as | Rule |
| --- | --- | --- |
| `title` | Case-study headline, project title in lists | The product name |
| `summary` | Lede and card text | Problem, then what the product does |
| `category` | Eyebrow, "Next project" label | The domain |
| `kind` | Which section of /projects/ | `personal` or `client` |
| `status` | Publication gate | `draft` until the copy is final |
| `contentStatus` | Publication gate | `placeholder` until every fact is verified |

### Spec strip

| Field | Notes |
| --- | --- |
| `role` | Only what you owned |
| `period.start` / `period.end` | Free-form; `end` can be omitted for ongoing work |
| `surfaces` | What the work touched |
| `technologies` | Short names, joined with commas |

### Document body

- `context` — the operating problem, not the technology.
- `contribution` — first person, bounded. Not the team.
- `approach` — the sequence of decisions and the simpler option rejected.
- `quote` — optional, one sentence you would actually say.
- `technicalDecisions` — `title` + `body`, rendered `D1…Dn`. Without them the section
  shows a marked placeholder.
- `outcomes` — rendered `O1…On`. Verified results or lessons only.
- `confidentialityNote` — one sentence naming what is withheld, shown under outcomes.

A blank line between paragraphs starts a new paragraph in all of these.

### Screenshots

Files live in `public/images/projects/<slug>/`.

- `cover` — `{ src, alt }`, 1600×900, under 300 KB, WebP or AVIF. Without one, the page
  renders the approved abstract plate instead of a fake screenshot.
- `screenshots` — `{ src, alt, caption? }`, rendered under "Screens": two per row on
  desktop, one per row below 640 px.
- `alt` describes what the screen shows. "Dashboard" is not alt text.

Capture at 1440 px wide, no browser chrome, no personal data in the frame. If the client
has not approved an image, ship the case study without images rather than with a
reconstruction.

### Links

`links` is `{ label, url, kind }` with `kind` = `live`, `repository`, `case-study` or
`reference`. External URLs open in a new tab automatically. Do not link anything that
requires a login the reader does not have.

---

## 5. Publishing checklist

1. Delete every `DRAFT` marker and every `[to confirm]`.
2. Set `status: published` and `contentStatus: verified`.
3. Run:

```bash
pnpm check          # schema + types
pnpm build          # the case study must appear in dist/projects/<slug>/
pnpm format:check
```

4. Open `/projects/<slug>/` and confirm:
   - the contents rail links to all five sections;
   - no section shows a placeholder;
   - the spec strip has no `[to confirm]`;
   - screenshots render, with alt text that describes them;
   - the "Next project" link points at a page that exists;
   - no horizontal scrollbar at 390, 834 and 1440 px.
5. Record any remaining gap in `docs/content/CONTENT-GAPS.md`.

---

## 6. Adding a field later

The schema is the contract: `src/content.config.ts` → `project`. To add a field:

1. Add it to the schema with a default, so existing entries stay valid.
2. Render it in `src/pages/projects/[slug]/index.astro` (or the component that owns the
   block) behind an `&&` or a fallback, so an empty field degrades to a marked placeholder.
3. Style it in `src/styles/primitives.css` with existing tokens. Do not add a second
   spacing or type scale.
4. Update this document, the template and `docs/content/CONTENT-MODEL.md` together.

A future CMS adapter replaces `src/lib/content.ts` and must return the same types;
nothing outside that module imports `astro:content` directly.

## 7. Drafts and samples

`draft-*.md` are fictional scaffolding and stay `draft` + `placeholder` forever: they
exist to show the field structure, the confidentiality path and the degraded case.
`orbit-logistics.md` and `dredd.md` are real products with unfinished copy. Delete the
fictional drafts once three real case studies are published.

`status: sample` is the third state, and the only one that publishes content the owner did
not write. It exists so the visual direction can be reviewed with real pages instead of an
empty index. A sample entry:

- renders on Home, `/projects/` and its own case-study route;
- carries a sample badge in every listing and a banner on the case study;
- publishes no live URL, because there is no product behind it;
- uses `contentStatus: placeholder`, which is what keeps the distinction honest: nothing
  about it claims to be verified.

Current samples: `signal-desk.md`, `schema-scout.md` (personal) and `harbor-ledger.md`,
`dispatch-board.md` (client). Their images live in `public/images/projects/<slug>/` and are
interface mockups, not screenshots. To remove them once real work lands, delete the four
Markdown files and their image folders; nothing else references them.
