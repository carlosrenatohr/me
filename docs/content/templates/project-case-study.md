---
# ── PROJECT TEMPLATE ───────────────────────────────────────────────────────────
# How to use it:
#   1. cp docs/content/templates/project-case-study.md src/content/projects/<slug>.md
#   2. Replace the values below. Delete the fields you do not need yet; the schema
#      fills the rest with empty defaults.
#   3. Keep `status: draft` + `contentStatus: placeholder` while any field is unfinished.
#   4. Publish only when every DRAFT marker is gone (see PROJECT-AUTHORING.md §6).
#
# The filename is the URL: src/content/projects/orbit-logistics.md → /projects/orbit-logistics/
# Everything below the second `---` is optional prose and is not rendered; use it for notes.
# ───────────────────────────────────────────────────────────────────────────────

# The product name. Not a description, not a slogan.
title: 'Project name'

# One or two sentences: the problem, then what the product does. This is the lede on the
# case study and the card text everywhere else.
summary: 'What hurts today, and what this does about it.'

# Domain eyebrow, e.g. Logistics operations / Marketing analytics / Developer tooling.
category: 'Category'

# personal = your own product or side project (listed first on /projects/)
# client   = client or employer work
kind: personal

# Publication gates. Both must change together:
#   draft + placeholder → hidden everywhere
#   published + verified → rendered and indexed
status: draft
contentStatus: placeholder

# Wide feature slot on Home and Work. Only one project should be `featured` at a time.
featured: false
featuredOrder: 1

# Only what you personally owned. "Founder and sole engineer" or "Backend, API design".
role: 'Role — the part you owned'

# Free-form strings. `end` may be omitted or set to `present`.
period:
  start: 'Mar 2026'
  end: present

# Short names, joined with commas in the spec strip. Six to eight reads best.
technologies:
  - 'TypeScript'
  - 'PostgreSQL'

# What the work touched, e.g. Internal panel / Customer portal / Public API.
surfaces:
  - 'Surface one'

# ── Narrative ──────────────────────────────────────────────────────────────────
# Each field takes plain text. A blank line starts a new paragraph.

context: |
  The operating problem, in the words of the people who had it: who does the work today,
  where the handoffs break, and what inconsistency costs.

  Second paragraph: the scale you can defend and the constraint that shaped the solution.

# What the product does about it, capability by capability. Rendered as "Solution".
solution:
  - title: 'Capability or module'
    body: 'What it does for the person using it, in one paragraph.'

contribution: |
  First person and bounded: what you designed, built and decided — and what someone else owned.

approach: |
  The sequence of decisions, starting from the first constraint. Name the simpler option you
  rejected and why.

# Where a model sits in the product and where a person stays in the loop. Delete the field
# when there is no AI: the section is omitted rather than explained away.
# aiRole: |
#   What the model does, what it is never allowed to decide, and who confirms the result.

# Optional. One sentence you would actually say about the work.
quote: ''

# The stack by layer for the case study. `technologies` above stays flat for cards.
stackGroups:
  - label: 'Backend'
    items: ['TypeScript', 'PostgreSQL']

technicalDecisions:
  - title: 'Decision title'
    body: 'What it solved, what it cost, and what would have broken without it.'

outcomes:
  - 'Verified result or lesson. Owner-supplied numbers only; qualitative is fine.'

confidentialityNote: 'What is withheld and why. Delete if nothing is withheld.'

# ── Media ──────────────────────────────────────────────────────────────────────
# Files live in public/images/projects/<slug>/.
# Cover: 1600×900, under 300 KB, WebP or AVIF. Without a cover the page renders the
# approved abstract plate — never a fake screenshot.
# cover:
#   src: '/images/projects/project-name/cover.webp'
#   alt: 'What the image actually shows'

# Screens: two per row on desktop, one per row under 640 px. Approved assets only.
screenshots:
  - src: '/images/projects/project-name/screen-01.webp'
    alt: 'Describe the screen and the state it shows, not "dashboard"'
    caption: 'Optional: what the reader should notice.'

links: []
#  - label: 'Live product'
#    url: 'https://example.com'
#    kind: live          # live | repository | case-study | reference
---

Notes for the owner (not rendered): what is still missing, who approved the screenshots,
which numbers came from where.
