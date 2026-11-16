# Direction C — Responsive behaviour (Phase 02)

Status: **documented for review**  
Source of truth: `src/styles/tokens.css` + `src/styles/primitives.css`

---

## Target viewports

| Viewport | Use |
| --- | --- |
| Desktop | 1440 × 900 |
| Laptop | 1280 × 800 |
| Tablet | 768 × 1024 |
| Mobile | 390 × 844 |
| Small mobile | 360 × 800 |

---

## Breakpoints

| Breakpoint | Change |
| --- | --- |
| ≤ 900 px | Primary nav hides; native `<details>` compact menu appears. Hero headline spans all 12 columns. |
| ≤ 640 px | Hero meta becomes single column; pair stack becomes single column; spec becomes one column; decision/outcome rows become single column. |

---

## Rules

1. **No horizontal overflow** at any width — measured, not assumed.
2. **The 68-ch body measure** is preserved at every viewport; section columns
   do not exceed it.
3. **The tinted band bleeds through the page gutter**, so there is exactly one
   tonal break on the page.
4. **Lede and metadata keep their copies** on mobile; nothing essential is
   hidden.
5. **`?static` pins the final state** for screenshots, and the entrance
   animation is disabled under `prefers-reduced-motion`.

---

## Evidence placeholder

Capture the homepage at 1440, 834 and 390 px before the Phase 03 gate. Fills
`layout-desktop.png`, `layout-tablet.png`, `layout-mobile.png` under
`design-lab/c-vibrant-editorial/evidence/` once captured.
