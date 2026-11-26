# Product Requirements — V1

## Routes
- `/` Home
- `/projects` Projects index
- `/projects/[slug]` Project case study
- `/ai` AI, engineering automation and how I would contribute to a team
- `/experience` Full professional record and education
- `/about` Profile and approach, with a preview of the record
- `/contact` Contact

Writing/blog is optional and should only be included if approved articles exist.

## Home
- Clear professional introduction and positioning.
- Recent impact figures taken from the CV, each with the result it belongs to.
- Selected projects with meaningful summaries, plus a link to the full index.
- Short AI teaser that links to `/ai` (DREDD named).
- Three most recent roles with a link to `/experience`.
- Short about preview.
- Contact call to action.
- Links to approved professional profiles and CV.
- No fabricated availability claims.

## Projects index
- Display approved, published projects.
- One minimal card per project: category, title, summary, a short stack row, role,
  period and the link into the case study.
- No covers or galleries on the index: the media belongs to the case study.
- Consistent project metadata.
- Featured ordering controlled by content.
- Avoid excessive filter UI unless the number of projects justifies it.

## Project case study
- The problem, stated in operating terms.
- What the product does about it, capability by capability.
- Owner's verified role and contribution.
- Approach and technical decisions.
- Where AI sits in the product and where a person stays in the loop, when applicable.
- Relevant architecture or workflow visuals.
- Stack grouped by layer, in addition to the flat technology metadata.
- Verified outcomes or lessons, under "Impact".
- Confidentiality-aware content.
- Sections without content are omitted rather than filled with placeholders.

## About
- Professional biography.
- Three most recent roles, with the full record on `/experience`.
- Technical focus areas.
- Working philosophy.
- Optional subtle portrait.

## Experience
- Every verified role, newest first: organization, role, dates, location, scope and concrete
  contributions.
- Earlier roles are included in the same chronology, not hidden.
- Education from the profile.
- Nothing is summarised into a claim the CV does not make.

## AI
- How AI is used in production delivery, with the owner's stated starting year.
- DREDD as the featured system, with its review loop and the human decision at the end.
- How the owner reads and analyses his own projects with a model.
- The other systems built with it: MCP servers, support chatbot.
- Tools in daily use, listed without implying endorsement.
- Skills grouped by layer.
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
- Per-page title and description.
- Open Graph metadata.
- Canonical URL configurable independently of the final domain.
- Sitemap and robots.txt.
- Optimized images and meaningful alt text.
- Functional links and no dead navigation.
