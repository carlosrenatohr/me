# Authoring content

Every page on this site reads from typed content. Nothing is published while a field
still says `DRAFT`, and nothing reaches a public route unless `status: published` and
`contentStatus: verified` are both set.

Two starting points:

- **A new project** → `src/content/projects/_template.json`
- **A new role** → `docs/content/templates/experience-role.md`

```bash
cp src/content/projects/_template.json src/content/projects/my-project.json
cp docs/content/templates/experience-role.md src/content/experience/my-org.md
```

The project filename is the URL: `my-project.json` → `/projects/my-project/`. Renaming it
later breaks the link. The template and files starting with `_` are excluded from the
build, so the template is never published.

Projects are JSON so adding one is a single file with no frontmatter to escape, which
keeps the door open for a future CMS or API to emit the same objects. The schema in
`src/content.config.ts` validates the shape during `pnpm check`; a typo fails the build
instead of rendering an empty page.

---

## 1. What to gather first

| Needed | Goes into |
| --- | --- |
| The problem in the words of the people who had it | `context` |
| What the product does about it, module by module | `solution` |
| Where AI sits, and where a person stays in the loop | `aiRole` |
| Your exact role and the edge of your scope | `role`, `contribution` |
| Dates you can defend | `period` |
| Two to four decisions you actually made | `technicalDecisions` |
| Results you or the client can verify | `outcomes` |
| Approved screenshots, or none | `cover`, `screenshots` |

If one is missing it stays a placeholder. Never add a client name, a metric, a
testimonial or a screenshot that is not approved for publication.

---

## 2. Why `collection` matters

`collection` is the editorial shelf, and it decides where a project appears:

| `collection` | Shelf |
| --- | --- |
| `featured` | Featured products, first — the owner's product work |
| `open-source` | Open source and experiments, second — smaller and secondary |
| `professional` | Professional case studies, last — employer work |

Inside a shelf, `featuredOrder` (lower first) then title decides. `kind` still states whether
the work is personal or client-owned, and `/projects/` renders the three shelves with their
own headings. On Home the first featured product becomes the wide block, the rest share the
offset pair, and the experiments render as compact rows.

The order is the owner's decision, not a guess from `kind`, repo popularity or stack size.
Do not reorder it to make a favourite project lead.

---

## 3. Samples in the repository

These files are not filler: each one demonstrates a different authoring situation.

| File | Kind | Shows |
| --- | --- | --- |
| `signal-desk.json` | personal | The full path: solution, decisions, outcomes, cover and screenshot |
| `relay-yard.json` | personal | A real `aiRole`, with the boundary stated as a product decision |
| `schema-scout.json` | personal | Concise narrative with five stack groups and one screenshot |
| `harbor-ledger.json` | client | Client work where AI sits in one narrow job |
| `dispatch-board.json` | client | Offline-first product; no AI, and the page says so by omission |
| `yard-capacity.json` | client | A recent client system with no cover and no links |
| `dredd.json` | personal | A real tool whose narrative is still `draft` — the honest unfinished state |
| `orbit-logistics.json` | personal | A real product with real stack but unwritten copy |
| `draft-*.json` | both | Fictional scaffolding: confidentiality path, degraded case, full field surface |

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
| `kind` | Who owns the work | `personal` or `client` |
| `collection` | Which shelf of /projects/ | `featured`, `open-source` or `professional` |
| `productStatus` | Lifecycle label | `live`, `in-development`, `demo` or `archived`; omitted when unknown |
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

- `context` — the operating problem, not the technology. Rendered as "The problem".
- `solution` — `{ title, body }` per capability, rendered as a numbered list. This is
  what the product does, not how it is built.
- `contribution` — first person, bounded. Not the team.
- `approach` — the sequence of decisions and the simpler option rejected.
- `aiRole` — what a model does in the product and where the human stays in the loop.
  Omit it when there is no model: an absent section is a truer statement than a
  paragraph explaining the absence, and the contents rail follows what the page states.
- `quote` — optional, one sentence you would actually say.
- `technicalDecisions` — `title` + `body`, rendered `D1…Dn`.
- `stackGroups` — `{ label, items }` per layer (Backend, Data, Offline…), rendered as
  labelled chips under "Stack". `technologies` stays flat because the work index and the
  spec strip read it. Without groups, the flat list renders as one group.
- `outcomes` — rendered `O1…On` under "Impact". Verified results or lessons only.
- `evidenceNote` — what backs the page (repositories, deployments, READMEs, the CV), rendered
  under "Evidence" with the confidentiality note.
- `confidentialityNote` — one sentence naming what is withheld, rendered under "Evidence".

Sections with no content are not rendered and do not appear in the contents rail, so a
partially written case study never shows a column of placeholders. The problem section is
the exception: it always renders, with a marked placeholder when it is empty.

A blank line inside a JSON string (`\n\n`) starts a new paragraph in all of these. Keep the
strings in one JSON line each: the file is data, not prose formatting.

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
   - the contents rail lists every section the entry actually has;
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

`status: sample` still exists in the schema as a demonstration state, but no sample entry is
published. The six fictional case studies were retired when the verified projects landed: their
files and image folders were deleted, so nothing references them.

`draft-*.json` stays `draft` + `placeholder` and never renders. `draft-buko.json` records a
owner-listed project that has no public repository or deployment yet: keep it hidden until the
evidence exists, do not invent a description to fill the shelf.

A project is published only when every claim on the page has a source. `evidenceNote` is where
that source is named, and it is part of the page, not an internal comment.
