---
# SAMPLE — fictional engagement, written to demonstrate the case-study format.
title: 'Harbor Ledger'
summary: 'Invoice reconciliation for a freight forwarder: carrier invoices, quoted rates and shipment events in one queue, with the disagreement surfaced before anyone pays.'
category: 'Freight finance'
kind: client
status: sample
contentStatus: placeholder
featured: false
featuredOrder: 1
role: 'Backend and data model, plus the reconciliation queue the finance team works in.'
period:
  start: 'Apr 2024'
  end: 'Jun 2025'
technologies:
  - 'NestJS'
  - 'PostgreSQL'
  - 'TypeScript'
  - 'Redis'
  - 'Docker'
  - 'Astro'
surfaces:
  - 'Reconciliation queue'
  - 'Rate import'
  - 'Internal API'
context: |
  A forwarder bills from quoted rates and pays from carrier invoices. Between the two sits a
  spreadsheet that someone reconciles by hand at the end of the month, matching shipment
  references and catching the differences that are small enough to ignore and large enough to
  matter over a year.

  The operation handled a few hundred shipments a month across a handful of carriers, each with
  its own invoice format. The work was not technically hard. It was easy to get subtly wrong,
  and the errors surfaced only after payment.

contribution: |
  I owned the data model and the reconciliation service: rate import, invoice ingestion, the
  matching rules and the queue. A colleague owned carrier onboarding and the accounting export.
  I did not touch payroll or the general ledger.

approach: |
  The goal was not to automate the decision, it was to make the disagreement explicit. Every
  invoice line resolves to exactly one state — matched, mismatched with a delta, or missing a
  rate — and the queue shows the delta in currency beside the amount. Finance approves or
  disputes; the system never silently adjusts.

  Matching by reference alone failed on partial shipments, so invoice lines link to shipment
  events rather than to shipments. That is more data to keep correct, and it is why a split
  shipment no longer produces two phantom discrepancies.

solution:
  - title: 'Invoice ingestion'
    body: 'Carrier invoices arrive as PDFs and spreadsheets. Every line becomes a row with its reference, amount and currency, and the source file stays attached so a reviewer can go back to the document.'
  - title: 'Rate import with a validity window'
    body: 'Quoted rates are imported per carrier, lane and date range, so an invoice for a shipment from March is compared against the rate that applied in March — not against the newest file.'
  - title: 'Reconciliation queue'
    body: 'Each invoice line resolves to matched, mismatched with a delta, or missing a rate. Disagreements surface with the difference in currency beside the amount, and finance approves or disputes.'
  - title: 'Carrier-scoped access'
    body: 'Carrier contacts see their own invoices and nothing else, enforced in the database rather than by a filter the API has to remember.'

aiRole: 'One model does one job: reading line items out of carrier invoices whose layout changes every few months. It proposes the extraction, and the queue only treats a line as matched when a person has confirmed it or the amount agrees with the quoted rate. Matching itself stays a rule, because “why is this line flagged” has to have an answer finance can read.'

stackGroups:
  - label: 'Backend'
    items: ['NestJS', 'TypeScript', 'REST API']
  - label: 'Data'
    items: ['PostgreSQL', 'Row-level security', 'Redis']
  - label: 'Interface'
    items: ['Astro', 'Review queue']
  - label: 'Operations'
    items: ['Docker', 'Scheduled imports']

technicalDecisions:
  - title: 'Explicit states instead of confidence scores'
    body: 'A probability invites people to trust it. Three states force a human decision at the small number of lines that actually disagree, and the queue stays honest about what is unknown.'
  - title: 'Rates imported with their validity window'
    body: 'A carrier rate applies to a date range, not to a file. Storing the window let retroactive invoices resolve against the rate that was in force, instead of against the newest import.'
  - title: 'Row-level security for carrier-scoped access'
    body: 'A carrier contact sees their own invoices and nothing else. Enforcing it in the database meant the API could not leak by forgetting a filter.'

outcomes:
  - 'Discrepancies appear in the queue the day the invoice arrives, not at month end.'
  - 'Partial and split shipments resolve to the events they belong to, without manual adjustments.'
  - 'The finance team works from one queue instead of one spreadsheet per carrier.'

cover:
  src: '/images/projects/harbor-ledger/cover.webp'
  alt: 'Mockup of a reconciliation sheet: nine carrier invoices with amounts, matched or review status and the delta against the quoted rate'

links: []

confidentialityNote: 'Sample entry — fictional engagement. No client, carrier, invoice or figure above is real. A real version would state what is withheld under NDA.'
---
