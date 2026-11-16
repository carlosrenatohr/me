---
# SAMPLE — fictional engagement, written to demonstrate the case-study format.
title: 'Dispatch Board'
summary: 'A dispatch board for a regional carrier: loads, drivers and exceptions on one timeline, with a driver app that keeps working when the connection does not.'
category: 'Logistics operations'
kind: client
status: sample
contentStatus: placeholder
featured: false
featuredOrder: 2
role: 'Frontend architecture and the offline sync layer for the driver app.'
period:
  start: 'Mar 2023'
  end: 'Jan 2024'
technologies:
  - 'Preact'
  - 'TypeScript'
  - 'IndexedDB'
  - 'Service Worker'
  - 'Node.js'
  - 'PostgreSQL'
surfaces:
  - 'Dispatch board'
  - 'Driver app (mobile web)'
  - 'Sync API'
context: |
  Dispatchers worked from a whiteboard and a phone tree. Drivers confirmed pickups over
  WhatsApp, and the board was accurate only when someone remembered to update it. The gap
  between the board and the road was the real problem, not the paperwork.

  Coverage included rural routes with no signal for twenty-minute stretches, so an app that
  assumed connectivity would have made the board less accurate, not more.

contribution: |
  I designed the client architecture and wrote the sync layer: the local queue, the conflict
  rules and the board's timeline. A second engineer built the dispatch interface and a third
  owned the scheduling service. I did not own pricing or route optimisation.

approach: |
  Offline-first was a requirement from the first conversation, not a later addition. Every write
  goes to IndexedDB first and to the server when possible; the interface never waits for the
  network. That forced the harder question early: what happens when the same load is edited on
  the board and in the truck.

  The answer was field-level ownership. Status, location and notes belong to the driver while a
  load is in transit; assignment and timing belong to dispatch. Conflicts resolve by field, not
  by whole record, so a driver's status update never overwrites a dispatcher's reassignment.

technicalDecisions:
  - title: 'Field-level conflict resolution'
    body: 'Whole-record last-write-wins lost real information: a status change could erase an assignment. Per-field ownership is more rules to state, and it makes the two edits compose instead of destroying each other.'
  - title: 'IndexedDB as the source of truth on the device'
    body: 'The board reads from the local store and syncs in the background, so a dropped connection slows the sync, not the screen. The cost is a migration path for the local schema, which was versioned from the start.'
  - title: 'Explicit sync state in the interface'
    body: 'A small, honest indicator — queued, synced, retrying — replaced silent failure. Drivers trust an app that tells them when it has not sent something.'

outcomes:
  - 'Drivers confirm pickups from the truck; the board reflects it when the signal returns.'
  - 'Status updates and dispatch reassignments no longer overwrite each other.'
  - 'The local queue survives restarts and a dead battery without losing writes.'

cover:
  src: '/images/projects/dispatch-board/cover.webp'
  alt: 'Mockup of a dispatch timeline: five trucks as rows, their loads as blocks across the working day, and one delayed load marked in coral'

links: []

confidentialityNote: 'Sample entry — fictional engagement and mockup interface. A real version would state what is withheld under NDA.'
---
