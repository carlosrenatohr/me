# Direction C — Layout and UI primitives (Phase 02)

Status: **review this week**  
Source of truth: `src/styles/primitives.css`  
Scope: shared layout and UI primitives only. No full pages.

---

## Components defined

| Component | Treatment |
| --- | --- |
| Site header | Serif wordmark left, nav right, `grid-template-columns: 1 / -1` on mobile. |
| Compact menu | Native `<details>` disclosure, no JavaScript. |
| Section rule | Label + count, top border hairline. |
| Eyebrow | Aqua, uppercase, `16.2 px` Archivo, +1.1 px tracking. |
| Selected marker | Coral dot + coral label above the lead project. |
| Text link | Blue text, electric underline, aqua on hover. |
| Metadata list | Bold sans labels, sans values, three columns on desktop. |
| Spec strip | Four columns over hairlines; one column on mobile. |
| Media plate | Navy well, electric-blue arcs/bars, aqua markers, coral ticks. |
| Tinted band | Surface-band bleed, aqua italic emphasis. |
| Footer | Two-column, mail and professional links, colophon. |
| Focus state | `2 px` aqua outline, `4 px` offset. |
| Selection | Electric-blue fill, white text. |

### Interactive states

| State | Treatment |
| --- | --- |
| Hover | Colour and border switch on `var(--duration-hover)` (180 ms). |
| Active | Same as hover; no pressed state. |
| Focus | `2 px` aqua outline, `4 px` offset. |
| Reduced motion | Entrance and hover-transforms disabled. |

---

## Responsive behaviour

| Breakpoint | Behaviour |
| --- | --- |
| ≤ 900 px | Nav hides; compact `<details>` menu opens. Hero headline spans all 12 columns. |
| ≤ 640 px | Hero meta becomes single column; pair stack becomes single column; spec becomes one column; decision/outcome rows become single column. |
| Tablet (768 px) | Handled as an intermediate step: nav is still a compact disclosure, content gutter narrows with `clamp()`. |

No horizontal overflow is introduced at any width. The `?static` query flag
pauses the entrance animation for capture.

---

## What stays out of scope

- No full pages. `/`, `/projects`, `/projects/[slug]`, `/about`, `/contact`
  appear only in Phase 03.
- No cards-per-section layout, no decorative cards, no gradients, no glows,
  no glass, no neon, no fourth accent.
- No third-party font files, no analytics, no script from a CDN.
