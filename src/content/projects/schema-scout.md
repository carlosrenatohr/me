---
# SAMPLE — fictional product, written to demonstrate the case-study format.
title: 'Schema Scout'
summary: 'A contract check for API changes: it compares the published schema between two revisions and fails the build on the changes that break the consumers nobody remembered to ask.'
category: 'Developer tooling'
kind: personal
status: sample
contentStatus: placeholder
featured: false
featuredOrder: 2
role: 'Solo — parser, diff engine, CLI and review page.'
period:
  start: 'Feb 2025'
  end: 'Aug 2025'
technologies:
  - 'TypeScript'
  - 'Node.js'
  - 'OpenAPI'
  - 'GraphQL'
  - 'GitHub Actions'
  - 'Astro'
surfaces:
  - 'CLI'
  - 'CI check'
  - 'Review page'
context: |
  A service can keep every test green and still break its consumers: a field becomes required,
  a number becomes an integer, an enum loses a value. The API owner finds out when a client
  throws, and the client finds out in production.

  Schema Scout reads the contract from both revisions, diffs it structurally instead of
  textually, and classifies each change as safe, additive or breaking. It runs locally against
  a branch and in CI against the merge base.

contribution: |
  Solo. I wrote the OpenAPI and GraphQL parsers, the normalisation layer that lets both produce
  the same intermediate model, the diff rules, the CLI and the review page. I did not build a
  hosted service — the tool is designed to run where the code already runs.

approach: |
  Textual diffs of generated schema files are noise: one rename reorders half the document. The
  first decision was to diff the model, not the file, so formatting and ordering never reach the
  output. The second was to keep the rule set declarative — each rule declares what it matches,
  how it classifies and what it explains — so adding a rule does not mean touching the engine.

  The alternative was a single JSON-schema pass with per-format exceptions. Two formats with one
  shared model turned out to be less total code than one model with two exception paths.

technicalDecisions:
  - title: 'One intermediate model for OpenAPI and GraphQL'
    body: 'Both formats reduce to types, fields, arguments and enums. The cost is that format-specific detail is flattened; the gain is one set of rules instead of two that drift apart.'
  - title: 'Rules return a written explanation, not only a severity'
    body: 'A build failure that says "field customerId was removed" wastes the reader’s time; the finding names the field, the consumers that read it and what to do. Rule objects got heavier, which was the right trade.'
  - title: 'Exit non-zero only for breaking changes'
    body: 'Additive changes are reported but do not block. Teams that saw unrelated warnings fail their pipeline disabled the check entirely, which is worse than no check.'

outcomes:
  - 'The CI check reports the same finding a reviewer would, with the field and the affected consumer named.'
  - 'Adding a rule is a file, not a change to the diff engine.'
  - 'The review page made the check readable for people who never run the CLI.'

cover:
  src: '/images/projects/schema-scout/cover.webp'
  alt: 'Mockup of a Schema Scout run comparing two schema versions side by side, with removed and added lines highlighted and three breaking findings listed'

links: []

confidentialityNote: 'Sample entry — fictional product and mockup interface. No repository or live URL is published because neither exists.'
---
