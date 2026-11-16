---
# SAMPLE — fictional product, written to demonstrate the case-study format.
# `status: sample` publishes the layout while marking every surface as demo content.
# Replace this file with a real project (status: published + contentStatus: verified).
title: 'Signal Desk'
summary: 'Alert triage for teams running too many monitors: signals arrive in one queue, grouped by the service they actually affect, so on-call starts with the incident instead of the inbox.'
category: 'Incident response'
kind: personal
status: sample
contentStatus: placeholder
featured: true
featuredOrder: 1
role: 'Solo — design, frontend and the ingestion workers.'
period:
  start: 'Sep 2025'
  end: 'Present'
technologies:
  - 'TypeScript'
  - 'Astro'
  - 'Preact'
  - 'Cloudflare Workers'
  - 'Durable Objects'
  - 'D1'
surfaces:
  - 'Triage queue'
  - 'Incident timeline'
  - 'Ingestion API'
context: |
  A team with eleven monitors does not have eleven problems. It has one incident reported
  eleven times, in eleven vocabularies. The on-call engineer opens four tabs, matches
  timestamps by eye, and only then starts diagnosing. The cost is not the first minute, it is
  the ten after it.

  Signal Desk takes the opposite position: the queue is not a list of alerts, it is a list of
  incidents. Everything that fires against the same service inside a short window becomes one
  entry with its signals attached, and the entry carries the context a responder needs — the
  deploy that preceded it, the endpoints returning errors, the runbook that applies.

contribution: |
  Solo project. I designed the data model, wrote the ingestion workers that normalise webhooks
  from the monitors, built the grouping pass, the triage interface and the incident timeline,
  and run it in production. The monitor integrations are intentionally thin: each one maps a
  payload to a common signal shape and stops there.

approach: |
  The first version grouped signals in the browser, which worked until the tab stayed closed.
  Grouping had to be server-side and idempotent, because a monitor can deliver the same alert
  twice and a responder can reload. I moved the window logic into a Durable Object per service:
  one object owns the open incident for that service, so two simultaneous alerts cannot create
  two incidents.

  Shipping a filterable list was the cheaper option. I rejected it after testing with real
  alerts: filtering requires knowing the name of what you are looking for, and at 3 a.m.
  nobody does.

solution:
  - title: 'Triage queue'
    body: 'One row per incident, grouped by the service it affects, with the number of signals attached and the age of the oldest one. The queue is ordered by what is still open, not by what arrived last.'
  - title: 'Incident timeline'
    body: 'Signals, deploys and runbook steps in the order they happened, on one clock. The first question on-call asks — what changed — is answered before the first click.'
  - title: 'Signal contract'
    body: 'Every monitor integration is a thin adapter that maps a payload to a common signal shape. Adding a monitor is a file, not a change to the grouping pass.'
  - title: 'Handoff states'
    body: 'Acknowledge, assign and resolve are explicit, so the next person on shift can see who owns the incident and what has already been ruled out.'

aiRole: 'None, and that is deliberate. Grouping is a deterministic rule over service and time window: a responder needs to be able to explain why two alerts became one entry. A model would make that answer probabilistic, which is the wrong trade at 3 a.m.'

stackGroups:
  - label: 'Interface'
    items: ['Astro', 'Preact', 'TypeScript']
  - label: 'Runtime'
    items: ['Cloudflare Workers', 'Durable Objects', 'D1']
  - label: 'Ingestion'
    items: ['Webhook adapters', 'Idempotent writes']

quote: 'The queue should count incidents, not notifications.'

technicalDecisions:
  - title: 'Grouping keyed by service, not by monitor rule'
    body: 'Two teams paging for the same service produce one incident, not two. The trade-off is that unrelated rules on the same service merge; the timeline keeps every signal visible, and severity can split the queue when the mix is too broad.'
  - title: 'One Durable Object per service owns the open incident'
    body: 'Single-writer semantics removed a class of race conditions from the grouping pass without a database transaction loop. It costs latency on the first signal for a cold service, which is irrelevant next to alert delivery time.'
  - title: 'Normalised signal rows, raw payload retained'
    body: 'The common shape keeps the queue and timeline cheap to render; the raw payload stays because monitor webhooks change without notice and reprocessing is cheaper than a lost signal.'

outcomes:
  - 'Twelve alerts arriving for one service resolve to a single incident with a readable timeline.'
  - 'Ingestion stayed idempotent under duplicate delivery; reprocessing a payload does not open a second incident.'
  - 'The queue is usable on a phone in portrait, which is where it gets read at night.'

cover:
  src: '/images/projects/signal-desk/cover.webp'
  alt: 'Mockup of the Signal Desk triage queue: nine signals in a list, one grouped incident with an error-rate chart and its timeline beside it'
screenshots:
  - src: '/images/projects/signal-desk/incident.webp'
    alt: 'Mockup of an incident page: status, service, owner and duration, a six-entry timeline and the contributing signals'
    caption: 'The incident view. Grouping is visible as a timeline, not as a hidden rule.'

# No live URL: this is a sample, and inventing one would be the whole problem.
links: []

confidentialityNote: 'Sample entry — the product is fictional and every interface above is a mockup, not a screenshot. Replace this file with a real project before launch.'
---

Sample content. The structure, metadata and media pipeline are real; the product is not.
