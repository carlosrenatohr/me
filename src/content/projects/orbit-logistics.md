---
# SEED — real project, unfinished case study.
# Facts below come from the owner's CV; everything marked DRAFT still needs his words,
# dates, screenshots and approved outcomes. Draft + placeholder keeps it off public routes.
title: 'Orbit Logistics'
summary: 'DRAFT — Subscription platform for freight-forwarding operations: web applications, backend services and role-based access for the people who move cargo.'
category: 'Logistics operations'
kind: personal
status: draft
contentStatus: placeholder
featured: true
featuredOrder: 1
role: 'Founder and engineer — product direction, architecture, implementation and production operations.'
period:
  start: 'DRAFT — confirm launch month'
technologies:
  - TypeScript
  - NestJS
  - Astro
  - Preact
  - Cloudflare Workers
  - PostgreSQL
  - Row-level security
surfaces:
  - Operations panel
  - Customer-facing web app
  - Backend services and API
context: |
  DRAFT — The freight-forwarding operation that existed before the platform: who tracked
  shipments, in what (spreadsheet, chat, paper), where the handoffs lost state, and what a
  missed update cost the customer.

  Keep the scale you can defend (accounts, shipments per month, people per account).

contribution: |
  DRAFT — First person, bounded: the data model, the subscription and access model, the
  operational interface, the production setup. Say plainly what you did not build.

approach: |
  DRAFT — The first constraint, then the sequence. For example why role-based access had to
  exist before the first paying account, and which simpler version was rejected.

technicalDecisions:
  - title: 'DRAFT decision — tenancy and access'
    body: 'DRAFT — Why row-level security instead of filtering in application code, and what it cost.'
  - title: 'DRAFT decision — where state lives'
    body: 'DRAFT — What made the operational read path correct under concurrent updates.'
  - title: 'DRAFT decision — deployment surface'
    body: 'DRAFT — Why the app runs where it runs, and what that removed from operations.'

outcomes:
  - 'DRAFT — verified result: accounts, volume handled, time saved, or what stopped breaking. Owner-supplied numbers only.'

# Captures go here once approved. Files live in public/images/projects/orbit-logistics/.
# screenshots:
#   - src: '/images/projects/orbit-logistics/operations.png'
#     alt: 'Operations board listing today shipments with their status and assigned driver'
#     caption: 'Daily board — status changes are reflected without a refresh.'

links: []

confidentialityNote: 'DRAFT — state exactly what is withheld (customer names, volumes, internal process detail) and why.'
---

Seed entry. The product is real and named in the owner's CV; the case study is not written yet.
`status: draft` + `contentStatus: placeholder` keeps it out of every public query until it is.
