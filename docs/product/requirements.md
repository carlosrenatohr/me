# Product Requirements — V1

## Routes
- `/` Home
- `/projects` Projects index
- `/projects/[slug]` Project case study
- `/ai` AI, engineering automation and how I would contribute to a team
- `/skills` The stack, grouped by system layer
- `/experience` Full professional record and education
- `/about` Profile and approach, with a preview of the record
- `/contact` Contact

Writing/blog is optional and should only be included if approved articles exist.

## Home
- Clear professional introduction and positioning.
- Featured products first: Orbit Logistics, HIT Cargo and DREDD, in that order.
- Open-source experiments second, as compact rows; they never compete with the products.
- Professional experience third: the three most recent roles, with a link to `/experience`.
- Platform figures from the CV after the record, labelled as platform context, not solo output.
- Short AI teaser that links to `/ai` (DREDD named).
- Approach statement and contact call to action.
- Links to approved professional profiles and CV.
- No fabricated availability claims.

## Projects index
- Display approved, published projects in three shelves: featured products, open source &
  experiments, professional case studies.
- The shelf and its order come from the `collection` field, never from `kind`, popularity or
  stack size.
- One minimal entry per project: category, title, summary, the fields that are published, and
  the link into the case study.
- No covers or galleries on the index: the media belongs to the case study. A featured product
  without approved art renders as a typographic block, not as an empty plate.
- Consistent project metadata; missing fields are omitted, never rendered as `[to confirm]`.
- Avoid excessive filter UI unless the number of projects justifies it.

## Project case study
- The problem, stated in operating terms.
- What the product does about it, capability by capability.
- Owner's verified role and contribution.
- Approach and technical decisions.
- Where AI sits in the product and where a person stays in the loop, when applicable.
- Relevant architecture or workflow visuals.
- Stack grouped by layer, in addition to the flat technology metadata.
- Product status (live, in development, demonstration, archived) when known.
- Verified outcomes or lessons, under "Impact".
- An "Evidence" section naming what backs the page, followed by the confidentiality note.
- Confidentiality-aware content.
- Sections without content are omitted rather than filled with placeholders.

## About
- Professional biography.
- Three most recent roles, with the full record on `/experience`.
- Technical focus areas.
- A working approach stated from verified experience, not a generic philosophy placeholder.
- Optional subtle portrait.

## Experience
- Every verified role, newest first: organization, role, dates, location, scope and concrete
  contributions.
- Earlier roles are included in the same chronology, not hidden.
- Education from the profile.
- Nothing is summarised into a claim the CV does not make.

## Skills
- Every tool and practice the published CV states, grouped by the layer where it does its
  work, from the interface down to the language.
- One line per layer explaining the point of view, plus where that layer has shipped.
- A named core set, marked in the stack and never inferred beyond the CV.
- The order of layers mirrors a running system, and the hero index links into each one.
- Content driven by `src/content/skills/*.json`; adding a layer or a tool is a data edit.
- AI tooling stays on `/ai` and is linked, not duplicated.
- No proficiency bars, percentages or invented endorsements.

## AI
- How AI is used in production delivery, with the owner's stated starting year.
- DREDD as the featured system, with its review loop and the human decision at the end.
- How the owner reads and analyses his own projects with a model.
- The other systems built with it: MCP servers, support chatbot.
- Tools in daily use, listed without implying endorsement.
- A pointer to the full stack on `/skills`; AI-specific tooling stays here.
- What the owner would own across a delivery cycle, with examples drawn from the CV.
- Every claim traceable to the published CV; no invented outcomes or client names.

## Contact
- The email address is the primary action, not one item in a list.
- Approved email and professional links.
- CV download only when a current CV is supplied.
- No fake contact forms. If a form is implemented, it must have a real delivery mechanism and spam protection; otherwise use direct contact links.

## Global requirements
- Fully dark visual experience.
- Responsive layout.
- Semantic HTML and keyboard accessibility.
- Visible focus states.
- Reduced-motion support.
- Per-page title and description, unique across routes and within 60 / 160 characters.
- Open Graph and Twitter card metadata, with an image that renders at 1200×630.
- Canonical URL configurable independently of the final domain.
- Valid `Person` and `WebSite` structured data, plus a page node only where it is accurate.
- Sitemap containing indexable routes only; robots.txt consistent with the deployed base path.
- Demonstration content never indexed as the owner's work.
- Optimized images and meaningful alt text.
- Functional links and no dead navigation.
