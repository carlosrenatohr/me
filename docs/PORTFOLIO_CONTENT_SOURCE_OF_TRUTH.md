# Portfolio Content Source of Truth

**Prepared:** 2026-11-25  
**Owner:** Carlos R. Hernandez  
**Purpose:** Ground truth and content brief for rebuilding the Projects and Experience sections of the Astro portfolio.

> This document is a content brief, not a replacement for the repository's schema. The implementation agent must inspect the actual Astro content collections, JSON/YAML schemas, frontmatter validation, routes, and components before creating or modifying content files.

## 1. Editorial rules — non-negotiable

1. Use the public CV, public GitHub repositories, current portfolio, and owner-provided context as evidence. When sources disagree, flag the conflict instead of silently choosing a convenient version.
2. Never invent clients, customers, employers, metrics, dates, features, architecture, team size, production usage, outcomes, or personal responsibilities.
3. Distinguish these content types clearly:
   - **Real product / side project:** a product or system Carlos actually built or operates.
   - **Professional case study:** work completed as part of an employer or team. State Carlos's contribution, not ownership of the entire platform.
   - **Sanitized technical demonstration:** a public reconstruction that demonstrates a production pattern but is not the production source code.
   - **Internal workflow:** a tool or process used in engineering work that may need redaction before public disclosure.
4. If a fact is unknown, mark it `NEEDS_OWNER_CONFIRMATION` in this source document. Do not publish that marker. Omit the fact or keep the content in draft until it is verified.
5. Do not assign the whole Nativerse technology list to Orbit Logistics unless the source code or the owner confirms that each technology belongs to that product.
6. Do not conflate **Agent Harness** and **DREDD**. They are separate stories and have different evidence.
7. Do not present the public `webhook-attribution-pipeline` repository as the actual proprietary GrowthOptix production code. Its README says it is a sanitized reimplementation using synthetic data and in-memory stores.
8. For professional work, separate individual contribution from team/platform scale. For example, say “worked on a platform serving…” where appropriate; do not imply Carlos personally created every system represented by the platform metrics.
9. No fabricated UI mockups or fake product screenshots. Use genuine, permission-safe screenshots, code/architecture diagrams, or clearly labelled conceptual diagrams. A diagram must not imply a capability that has not been verified.
10. Preserve confidentiality. Never publish client payloads, secrets, internal URLs, customer identifiers, private schemas, or employer-owned source code.

## 2. Canonical professional positioning

**Primary title:** Senior Software Engineer  
**Technical focus:** Backend Systems · Distributed Systems · Enterprise Integrations · Data Platforms  
**Differentiator:** AI-assisted engineering workflows with deterministic checks, independent review, and human approval.

Suggested headline:

> Senior Software Engineer building reliable backend systems, distributed integrations, and data platforms.

Suggested supporting statement:

> I design, integrate, and operate production software — from APIs and event-driven pipelines to the data systems and operational interfaces behind real business workflows.

Keep AI and agentic engineering as a meaningful differentiator, not a replacement for the core backend/software engineering identity.

**Availability wording:** the current portfolio says “Open to new projects.” Confirm the owner's current objective before changing this to “Open to remote opportunities,” “Available for consulting,” or similar. Do not imply job-seeking or consulting availability without confirmation.

## 3. Featured side projects and products

These should appear before the employment timeline in the portfolio's Selected Work / Projects area. Recommended order is editorial, not a claim about business size.

### SIDE-01 — HIT Cargo: Shipment Tracking & Operations Platform

**Recommended display title:** HIT Cargo — Shipment Tracking & Operations Platform  
**Kind:** Personal / founder-led product (verify schema enum)  
**Evidence:** public repositories `hit-landing`, `hit-ever`, `hit-panel`; public business site `https://hit-cargo.com`.  
**Recommended priority:** Featured #1.  
**Content confidence:** High for the architecture described below; exact personal role, project dates, and quantified outcomes need owner confirmation.

**Repositories and responsibilities represented**

- `https://github.com/carlosrenatohr/hit-landing` — public marketing/product website.
- `https://github.com/carlosrenatohr/hit-ever` — edge tracking API and background ingestion.
- `https://github.com/carlosrenatohr/hit-panel` — internal operations dashboard.
- Live business website: `https://hit-cargo.com`.

**Verified product context**

HIT Cargo moves packages between the United States and Nicaragua. The software surface includes a public site, package tracking, background ingestion from upstream carrier portals, and an internal operations panel.

**Verified architecture facts**

- The public website uses Astro island architecture. Most content is static HTML; only interaction-heavy surfaces load JavaScript. The project README explains that this is intentional for users on 3G/LTE connections in Nicaragua.
- The tracking API runs on Cloudflare Workers with Hono and TypeScript.
- Public tracking is served as a database read rather than logging in to carrier portals during each customer request.
- A background ingestion process refreshes tracking data from two upstream carrier systems. The documented ingestion paths include scheduled jobs, provider email hooks, and manual ingestion.
- The internal panel is a separate Astro/Preact application that talks to InsForge/PostgreSQL directly.
- Access control is enforced with PostgreSQL Row-Level Security. Writes use `SECURITY DEFINER` database functions instead of trusting client-side checks.
- The upstream carrier portal has a single-active-session constraint. Ingestion is therefore serialized/throttled rather than parallelized.
- The panel supports shipment search, manual status overrides, team tags/notes, reporting, and CSV/PDF export, according to its README.

**Draft summary**

> A logistics operations and tracking system for a freight-forwarding business moving packages between the United States and Nicaragua. It combines a lightweight public website, an edge-based tracking API, background carrier-data ingestion, and an internal operations dashboard with database-enforced access control.

**Draft context**

> Package tracking depends on upstream carrier systems that are not designed to serve as a fast public API. Calling those portals during every customer lookup would couple the customer experience to external login sessions, portal availability, and rate/interaction constraints. The system separates ingestion from lookup: background jobs refresh normalized tracking data, while the public site reads the latest available state from the database.

**Draft contribution — publish only after owner confirmation**

> Product and engineering work across the public site, tracking API, ingestion workflow, and internal operations panel. Responsibilities include architecture and implementation across the Astro/Preact frontend, Cloudflare Worker API, database integration, and PostgreSQL access-control model.

`NEEDS_OWNER_CONFIRMATION`: whether this was entirely solo work, whether any collaborators contributed, exact personal ownership per component, start date, and which product surfaces are currently live in production.

**Useful technical decisions to explain**

1. Static-first Astro site and selective Preact islands for slow-network users.
2. Database-backed tracking reads instead of live upstream portal calls.
3. Background ingestion separated from the public read path.
4. Serialized ingestion to respect the upstream single-session constraint.
5. PostgreSQL RLS and controlled database functions as the authorization boundary for the internal panel.

**Safe outcomes to state without invented metrics**

- Customer tracking reads do not need to initiate a live carrier-portal session.
- A constrained upstream integration is isolated behind a background ingestion process.
- Internal data access is enforced by PostgreSQL policies rather than only by frontend logic.
- Public content remains largely static, reducing unnecessary client-side JavaScript.

Do not add response-time, conversion, traffic, shipment-volume, or uptime metrics unless the owner supplies measured values.

**Technologies supported by repository documentation**

Astro, Preact, TypeScript, Tailwind CSS, Cloudflare Pages, Cloudflare Workers, Hono, InsForge, PostgreSQL, Row-Level Security, `SECURITY DEFINER`, Vitest, Wrangler.

**Potential surfaces**

Public website · Package tracking · Background ingestion · Internal operations dashboard · Reports and exports.

**Confidentiality note**

Use generic names for upstream providers unless the owner approves disclosure. Never publish credentials, account identifiers, private customer data, or unredacted shipment details.

### SIDE-02 — Orbit Logistics

**Recommended display title:** Orbit Logistics — Freight Forwarding Operations Platform  
**Kind:** Personal / Nativerse product (verify schema enum)  
**Evidence:** Nativerse entry in public CV and portfolio About page.  
**Recommended priority:** Featured #2.  
**Content confidence:** Partial; product scope is supported, detailed architecture and outcomes need repository/owner verification.

**Verified context**

Orbit Logistics is described as a subscription platform for freight-forwarding operations, with web applications, backend services, and role-based data access. It is part of the technology products developed under Nativerse.

**Draft summary**

> A subscription software platform for freight-forwarding operations, designed to give logistics businesses web-based workflows backed by dedicated backend services and role-aware access to operational data.

**Draft context**

> Freight-forwarding operations span customers, shipments, internal staff, status updates, and business data. Orbit Logistics is intended to bring those workflows into a subscription product rather than leaving them distributed across disconnected tools and manual processes.

**Draft contribution — supported at the Nativerse level**

> Founder and software engineer at Nativerse, responsible for product direction, architecture, implementation, and production operations. The Nativerse role includes building Orbit Logistics as a subscription platform for freight-forwarding operations.

**Verified technologies at the Nativerse role level — do not automatically attribute all to Orbit**

TypeScript, Hono, Cloudflare Workers, Astro, Preact, NestJS, PostgreSQL, Row-Level Security, Go, C#.

`NEEDS_OWNER_CONFIRMATION` before publishing a detailed Orbit case study:

- Which technologies and services are actually used by Orbit.
- Which modules are implemented and which remain planned.
- Current deployment/production status.
- Whether HIT Cargo is a customer, implementation, sister product, test tenant, or separate business context in relation to Orbit.
- Project start date and current status.
- Authentication/authorization model, tenancy model, billing/subscription implementation, and data isolation approach.
- Real screenshots, demo access, and any metrics that can be disclosed.

**Important editorial distinction**

Do not merge Orbit Logistics and the HIT Cargo platform into one project just because both are in logistics. Determine whether they are separate products, whether one is a customer implementation of the other, or whether there is an architectural/product relationship. Explain that relationship accurately.

### SIDE-03 — Agent Harness: Model-Agnostic Engineering Automation

**Recommended display title:** Agent Harness — Model-Agnostic Engineering Harness  
**Kind:** Personal / open-source developer tooling  
**Evidence:** public repository `https://github.com/carlosrenatohr/agent-harness`.  
**Recommended priority:** Featured #3.  
**Content confidence:** High for the published README; no quantified outcomes supplied.

**Verified product context**

A portable, model-agnostic development harness over OpenCode. It codifies an engineering methodology using rules, skills, task specifications, deterministic gates, a bounded autonomous loop, role-isolated subagents, evaluations, and observability.

**Draft summary**

> A model-agnostic harness for running AI-assisted engineering workflows with explicit constraints, bounded autonomy, role-isolated subagents, evaluations, and deterministic validation gates.

**Draft context**

> AI coding agents can accelerate implementation, but the authority to advance work should not depend on an agent declaring its own output correct. Agent Harness moves workflow control into deterministic code: tasks are scoped, phases are bounded, validation gates decide whether work can advance, and execution is observable.

**Draft contribution**

> Designed and implemented a portable engineering harness around OpenCode, including workflow configuration, deterministic phase gates, bounded execution, role-based subagents, evaluation workflows, and run observability.

**Verified engineering decisions**

1. A deterministic gate, not an LLM, owns phase advancement.
2. Autonomous execution is bounded rather than open-ended.
3. Subagents have separated roles and scopes.
4. Evals and execution logs make model/provider behavior observable.
5. The harness is designed to be model-agnostic.

**Technologies / concepts supported by the repository**

TypeScript, OpenCode, Node.js, pnpm, CLI tooling, LLM providers, agent orchestration, subagents, deterministic gates, evaluation workflows, JSONL observability. Confirm package-level implementation before listing every item as a technology badge.

**Evidence link**

`https://github.com/carlosrenatohr/agent-harness`

**Safe outcomes**

Describe workflow guarantees and design decisions. Do not claim percentage productivity gains, defect reduction, or a specific number of successful autonomous runs without measurement.

### SIDE-04 — DREDD: Multi-Agent Code Review Workflow

**Recommended display title:** DREDD — Multi-Agent Engineering Review Workflow  
**Kind:** Personal/internal engineering workflow; confirm whether it should be public as a project.  
**Evidence:** public CV statement. No public repository link established in this inventory.  
**Recommended priority:** Featured #4, subject to confidentiality review.  
**Content confidence:** High for the high-level description; implementation details and public-disclosure boundaries need owner confirmation.

**Verified CV facts**

- Designed and maintained DREDD for over a year.
- It is a custom multi-agent code-review workflow.
- It coordinates parallel code and security reviews.
- It includes automated checks and evidence-based validation against project requirements.

**Draft summary**

> A multi-agent code-review workflow that coordinates independent code and security reviews, runs automated checks, and validates findings against explicit project requirements before changes are accepted.

**Draft context**

> AI-assisted implementation creates a review problem: a single agent should not be the only authority judging the code it generated. DREDD introduces independent review paths and deterministic checks so implementation, security, and requirement conformance can be evaluated separately.

**Draft contribution**

> Designed and maintained the workflow, coordinating parallel review agents, automated validation steps, and evidence-based reconciliation against task requirements.

**Confirmed boundary**

DREDD is not the same project as Agent Harness. Do not describe DREDD using Agent Harness's CLI, config, deterministic phase-gate implementation, or public repository architecture unless the owner confirms that a specific component is shared.

`NEEDS_OWNER_CONFIRMATION`:

- Whether DREDD is a standalone tool, a workflow configuration, or a combination of scripts and agent definitions.
- Exact start/end dates (CV says “over a year”; do not invent calendar dates).
- Which agents/models/tools can be named publicly.
- Whether it is safe to show prompts, workflow diagrams, code, or screenshots.
- Whether it includes a final human approval step and what its exact policy is.
- Any measured results or evaluation data.

**Safe presentation**

Use a high-level workflow diagram with stages only after verifying the actual execution path. Redact proprietary prompts, client-specific rules, secrets, private repositories, and project details.

### SIDE-05 — Webhook Attribution Pipeline

**Recommended display title:** Webhook Attribution Pipeline — Identity Resolution & Revenue Attribution  
**Kind:** Personal technical demonstration / sanitized reconstruction  
**Evidence:** public repository `https://github.com/carlosrenatohr/webhook-attribution-pipeline`.  
**Recommended priority:** Featured #5.  
**Content confidence:** High, with a strict distinction from production code.

**Critical source qualification**

The repository README explicitly states that this is a public, sanitized reimplementation of a pattern used in production. The code is written from scratch against providers' public webhook documentation and uses synthetic data, in-memory stores, and no client payloads, proprietary business logic, or real schemas.

**Draft summary**

> A runnable NestJS demonstration of multi-source webhook ingestion, event normalization, queue-based processing, identity resolution, and revenue attribution across Stripe, Calendly, and ThriveCart-style events.

**Draft context**

> Marketing and commerce platforms emit events with different payload shapes and identity signals. A reliable attribution workflow needs a common event contract, asynchronous routing, identity resolution across devices, and a safe way to retain events that cannot be matched.

**Draft contribution**

> Built a sanitized, from-scratch demonstration of the architecture: provider adapters normalize raw webhook payloads into a shared event envelope; BullMQ routes work to processors; identity resolution connects devices using known identifiers; attribution links revenue events to resolved contacts while preserving unmatched events.

**Verified technical details**

- NestJS and Redis/BullMQ.
- `ExternalEventEnvelope` as the normalized event contract.
- Adapters for Stripe, Calendly, and ThriveCart.
- `POST /webhooks/:source` ingestion surface.
- Queue separation for revenue matching and lifecycle events.
- Identity matching using `deviceId` and known `email` to bridge a new device to an existing contact.
- Unmatched events are retained rather than breaking processing.
- Synthetic seed sequence and tests demonstrate the flow.

**Technologies**

NestJS, TypeScript, Redis, BullMQ, Docker Compose, webhook adapters, event normalization, identity resolution, revenue attribution, automated tests.

**Safe outcomes**

Describe the reproducible demo behavior only: normalized ingestion, routing, identity bridging, attributed events, and explicit unmatched-event handling. Do not claim real customer scale or production performance for this public repository.

**Mandatory visible disclosure**

> Public technical demonstration. This repository is a sanitized reimplementation of an architecture pattern used in production; it is not the original production code and uses synthetic data.

## 4. Professional case studies

These should appear after featured side projects or in a clearly separated “Professional Experience / Selected Engineering Work” group. They must never imply that Carlos owned the entire employer platform.

### WORK-01 — GrowthOptix: Marketing Attribution & Analytics Platform

**Role:** Senior Software Engineer  
**Period:** Aug 2025 – Aug 2026  
**Kind:** Professional / employer work  
**Evidence:** public CV and current portfolio About page.  
**Recommended priority:** First professional case study.  
**Content confidence:** High for CV-level facts; confirm employer permission and disclosure boundaries before publishing deep architecture.

**Draft summary**

> Engineering work on a cookieless marketing-attribution platform, focusing on advertising and payment integrations, event-driven ingestion, identity resolution, and analytics APIs across a multi-tenant environment.

**Draft context**

> The platform unified data from advertising, payment, and lifecycle systems into analytics workflows. The engineering challenges included inconsistent provider schemas, OAuth token lifecycles, asynchronous event delivery, identity resolution, cross-platform reconciliation, and reliable reporting across organizations.

**Draft contribution**

> As a Senior Software Engineer, contributed to backend integrations, event-driven pipelines, analytics APIs, identity-resolution workflows, webhook ingestion, and cross-platform reconciliation. Describe each individual component only to the extent that the owner's direct implementation/design responsibility is confirmed.

**CV-backed scale and impact facts**

- Platform context: 340+ isolated databases and 30M+ documents.
- Approximately 1.7M tracking events processed across six attribution models and 300+ organizations.
- Advertising integrations: Google Ads, Meta Ads, Microsoft Ads, and LinkedIn Ads.
- More than 35K synchronization jobs with approximately 96% success rate, as stated in the CV.
- Webhook sources included Calendly, Stripe, PayPal, Typeform, and ThriveCart.
- Contact-profile read latency was reduced from approximately 18 seconds to approximately 1 millisecond by optimizing queries and moving the read path from MongoDB to BigQuery.
- Identity-resolution engine used confidence scoring across approximately 1.1M touchpoints.
- Reporting and data reconciliation addressed double-counting across sources.

**Important metric wording**

State that these are platform/team-level figures or results from the relevant engineering work, not necessarily individually generated by Carlos. Preserve “approximately” where used. The 18s → 1ms claim needs a precise explanation of the measured operation, test conditions, cache state, and before/after query path before it is featured prominently.

**Technologies from CV**

NestJS, TypeScript, BigQuery, MongoDB, PostgreSQL, BullMQ, RabbitMQ, GraphQL, AWS, MCP, OAuth, REST APIs.

**Confidentiality**

No employer-owned source code, real customer payloads, private data models, internal dashboards, customer names, or sensitive platform topology. Use an original high-level diagram with generic labels and synthetic data only.

### WORK-02 — BEON Tech Studio: Enterprise Backend & Platform Engineering

**Role:** Software Engineer / Backend Specialist  
**Period:** Jul 2017 – Mar 2025  
**Kind:** Professional / employer and client engagements  
**Evidence:** public CV and current portfolio About page.  
**Recommended priority:** Second professional case study.

**Draft summary**

> Backend architecture and API engineering across enterprise CMS, e-commerce, and custom software platforms for large U.S. clients in a remote delivery environment.

**Draft context**

> Multiple client engagements required maintainable backend services, production infrastructure, third-party integrations, and reliable delivery across concurrent projects.

**CV-backed contributions**

- Designed and built backend architectures for enterprise CMS, e-commerce, and custom platforms.
- Built REST APIs across multiple products.
- Architected and managed AWS infrastructure using EC2 and RDS.
- Led a team of four developers, mentored on engineering practices, and supported on-time delivery across concurrent client projects.
- Improved security and reliability by addressing vulnerabilities and operational issues.
- Built an early AI-driven support chatbot to improve client-support efficiency.

**Technologies from CV**

Laravel, MySQL, React, TypeScript, AWS, Python, C#, ASP.NET Core, PayPal, Klaviyo, Twilio, Celigo, Shopify.

**Editorial treatment**

This is an aggregate case study covering several engagements, not one invented product. Keep client identities anonymous unless permission exists. Do not fabricate a single unified architecture or one set of results across all clients.

## 5. Full employment history — canonical Experience data

Use the existing Experience content model and preserve its schema. The following facts are taken from the public CV. Each entry can be represented as a separate Markdown/YAML experience file if that is how the repository is structured.

### EXPERIENCE-01 — Nativerse

```yaml
organization: Nativerse — Technology Products & Solutions
role: Founder & Software Engineer
contentStatus: verified
group: primary
location: Nicaragua
period:
  start: '2026-03'
  end: present
summary: Founded and lead technology products for the local market, owning product direction, architecture, implementation and production operations.
contributions:
  - Design and operate distributed systems and APIs connecting business workflows, data ingestion, authentication and customer-facing applications.
  - Build logistics software for local businesses, including Orbit Logistics, a subscription platform for freight-forwarding operations with web applications, backend services and role-based data access.
technologies:
  - TypeScript
  - Hono
  - Cloudflare Workers
  - Astro
  - Preact
  - NestJS
  - PostgreSQL
  - Row-Level Security
  - Go
  - C#
```

**Note:** this is a content illustration; the implementation agent must preserve the actual schema and frontmatter conventions.

### EXPERIENCE-02 — GrowthOptix

```yaml
organization: GrowthOptix — Marketing Analytics Platform
role: Senior Software Engineer
contentStatus: verified
group: primary
location: Remote
period:
  start: '2025-08'
  end: '2026-08'
summary: Built integrations, pipelines and APIs behind a cookieless marketing-attribution platform.
contributions:
  - Worked on a platform with 340+ isolated databases and 30M+ documents, unifying advertising and payment platforms behind a BigQuery-backed analytics API.
  - Engineered event-driven pipelines using BullMQ, RabbitMQ and Amazon SQS, processing approximately 1.7M tracking events across six attribution models and 300+ organizations.
  - Designed end-to-end integrations for Google Ads, Meta Ads, Microsoft Ads and LinkedIn Ads, exposing REST and GraphQL APIs with OAuth token lifecycle management and approximately 96% success across 35K+ synchronization jobs.
  - Built webhook ingestion for Calendly, Stripe, PayPal, Typeform and ThriveCart, feeding external events into a unified attribution pipeline.
  - Designed reporting and cross-platform data reconciliation to eliminate double-counting and reporting errors across data sources.
  - Reduced contact-profile read latency from approximately 18 seconds to approximately 1 millisecond by optimizing queries and moving the read path from MongoDB to BigQuery.
  - Built an identity-resolution engine with confidence scoring over approximately 1.1M touchpoints, improving attribution accuracy while preventing false identity merges.
technologies:
  - NestJS
  - TypeScript
  - BigQuery
  - MongoDB
  - PostgreSQL
  - BullMQ
  - RabbitMQ
  - GraphQL
  - AWS
  - MCP
```

### EXPERIENCE-03 — BEON Tech Studio

```yaml
organization: BEON Tech Studio
role: Software Engineer / Backend Specialist
contentStatus: verified
group: primary
location: Buenos Aires, Argentina (Remote)
period:
  start: '2017-07'
  end: '2025-03'
summary: Designed backend architectures for enterprise CMS, e-commerce and custom platforms serving large U.S. clients.
contributions:
  - Built REST APIs across multiple products and owned backend architecture for individual engagements.
  - Architected and managed AWS infrastructure using EC2 and RDS for production deployments.
  - Led a team of four developers, mentoring on engineering practices and coordinating delivery across concurrent client projects.
  - Improved security and reliability of production systems by addressing vulnerabilities and operational gaps.
  - Built an early AI-driven support chatbot to improve client-support efficiency.
technologies:
  - Laravel
  - MySQL
  - React
  - TypeScript
  - AWS
  - Python
  - C#
  - ASP.NET Core
  - PayPal
  - Klaviyo
  - Twilio
  - Celigo
  - Shopify
```

### EXPERIENCE-04 — 724 Media

```yaml
organization: 724 Media
role: Web Application Engineer
contentStatus: verified
group: secondary
location: Bogotá, Colombia (Remote)
period:
  start: '2016-11'
  end: '2017-07'
summary: Developed and maintained web systems and API-driven functionality across three projects.
contributions:
  - Implemented and maintained backend features for client-specific application requirements and business workflows.
  - Troubleshot application issues and updated functionality in collaboration with product and design teams.
technologies:
  - Laravel
  - Angular
  - MongoDB
  - Node.js
```

### EXPERIENCE-05 — Upwork

```yaml
organization: Upwork
role: Full Stack Web Developer
contentStatus: verified
group: secondary
location: Remote
period:
  start: '2015-05'
  end: '2017-07'
summary: Built backend-heavy applications and database-driven solutions for international clients through freelance engagements.
contributions:
  - Built and maintained backend-heavy applications using large PostgreSQL databases, full-stack interfaces and C#/.NET.
  - Developed and customized application features for international clients, translating requirements into working software.
  - Implemented C# components and backend functionality as part of freelance software projects.
technologies:
  - C#
  - .NET
  - Laravel
  - CodeIgniter
  - PostgreSQL
  - Vue.js
  - Bootstrap
```

### EXPERIENCE-06 — Spark Coders

```yaml
organization: Spark Coders
role: Web Developer
contentStatus: verified
group: secondary
location: Managua, Nicaragua
period:
  start: '2014-05'
  end: '2015-04'
summary: Maintained e-commerce and CMS platforms and developed database-driven features and third-party integrations.
contributions:
  - Maintained e-commerce and CMS platforms and integrated payment gateways and third-party APIs.
  - Developed database-driven features and application workflows for e-commerce and content-management platforms.
  - Maintained external integrations and resolved issues affecting payment and service connectivity.
technologies:
  - CodeIgniter
  - WordPress
  - Shopify
  - MySQL
  - JavaScript
```

**Timeline note:** the Upwork and 724 Media periods overlap in the CV. Preserve the dates as stated; do not “fix” the overlap. If the portfolio supports employment types, describe Upwork as freelance/contract work only if the existing schema supports it or the owner confirms the classification.

## 6. Other CV-backed engineering capabilities

These belong in About / Skills / AI pages where they add context, not as invented projects:

- AI-assisted development tools used in engineering workflows since 2023: Claude Code, Codex, OpenCode, Cursor, and GitHub Copilot.
- AI-assisted implementation with human review and validation before delivery.
- MCP servers connecting AI clients with application capabilities and existing services, including a production integration consumed by an internal fine-tuned AI model.
- Backend and API engineering: TypeScript, Node.js, PHP, Python, C#, Laravel, NestJS, Express, ASP.NET Core, GraphQL, microservices, OAuth 2.0, JWT, webhooks.
- Data and analytics: BigQuery, MongoDB, PostgreSQL, MySQL, SQL Server, Redis/Valkey, analytics APIs, Drizzle, Entity Framework.
- Pipelines and messaging: BullMQ, RabbitMQ, Amazon SQS, event-driven architectures, webhook ingestion.
- Cloud and infrastructure: AWS (EC2, RDS, SQS, ECS), GCP, Cloudflare Workers, Docker, CI/CD.
- Frontend/product: React, Astro, Preact, TypeScript.
- Engineering practice: production troubleshooting, performance optimization, data reconciliation, version control.

Do not list every technology on every project. Use project-specific stacks only.

## 7. Existing sample projects to retire

The currently published portfolio contains six fictional sample case studies:

- Signal Desk
- Schema Scout
- Relay Yard
- Harbor Ledger
- Dispatch Board
- Yard Capacity

The public site labels them as sample content and explicitly says they are not real projects. Remove them from public navigation, project lists, detail routes, homepage featured content, internal links, and sitemap. Keep an offline archive only if useful for preserving the old layout/content model; do not leave sample case studies indexable or accidentally reachable as real work.

Do not simply rename these fictional products to real projects. Write new case studies from the verified facts in this document and source repositories.

## 8. Content and project ordering recommendation

Recommended project showcase order:

1. HIT Cargo — Shipment Tracking & Operations Platform.
2. Orbit Logistics — Freight Forwarding Operations Platform (draft until implementation details are confirmed).
3. Agent Harness — Model-Agnostic Engineering Automation.
4. DREDD — Multi-Agent Engineering Review Workflow (only after disclosure review).
5. Webhook Attribution Pipeline — Sanitized Technical Demonstration.
6. GrowthOptix — Marketing Attribution & Analytics Platform (professional case study).
7. BEON Tech Studio — Enterprise Backend & Platform Engineering (aggregate professional case study).

If Orbit cannot be evidenced in code or a safe demo, keep it as a short in-progress product entry rather than a detailed technical case study. Do not let an evidence-light entry outrank a well-documented one simply to fill a slot.

## 9. Source links

- Portfolio home: `https://carlosrenatohr.github.io/me/`
- Portfolio About: `https://carlosrenatohr.github.io/me/about/`
- Portfolio Projects: `https://carlosrenatohr.github.io/me/projects/`
- Public CV: `https://carlosrenatohr.github.io/me/cv.pdf`
- GitHub profile: `https://github.com/carlosrenatohr`
- HIT Landing: `https://github.com/carlosrenatohr/hit-landing`
- HIT Ever: `https://github.com/carlosrenatohr/hit-ever`
- HIT Panel: `https://github.com/carlosrenatohr/hit-panel`
- Agent Harness: `https://github.com/carlosrenatohr/agent-harness`
- Webhook Attribution Pipeline: `https://github.com/carlosrenatohr/webhook-attribution-pipeline`
- HIT Cargo: `https://hit-cargo.com`

## 10. Final content acceptance checklist

- [ ] Every published project has a truthful classification: personal/product, professional, demo/reconstruction, or internal workflow.
- [ ] No sample/fictional project remains publicly presented as real work.
- [ ] Every project distinguishes context, Carlos's contribution, team contribution, technical decisions, and outcomes.
- [ ] Every numerical result has a source and a defensible definition.
- [ ] Unknown dates, technologies, roles, and metrics are omitted or held in draft.
- [ ] Orbit Logistics and HIT Cargo are not conflated.
- [ ] Agent Harness and DREDD are not conflated.
- [ ] The Webhook Attribution Pipeline is labelled as a sanitized reconstruction with synthetic data.
- [ ] GrowthOptix and BEON case studies respect confidentiality and do not imply sole ownership of employer platforms.
- [ ] The Experience timeline matches the CV dates and roles, including earlier roles and the Upwork/724 overlap.
