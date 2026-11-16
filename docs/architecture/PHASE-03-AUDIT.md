# Phase 03 — Auditoría de implementación y plan de corrección

Fecha: 2026-11-15
Alcance: `src/pages/*`, `src/styles/*`, comparación con `design-lab/c-vibrant-editorial/` y con
`docs/design/DESIGN-02-responsive.md`, `docs/product/requirements.md`, `docs/design/DESIGN.md`.
Estado: **no conforme**. El build pasa, pero el sitio no coincide con la dirección aprobada y no
cumple el requisito "sin desbordamiento horizontal".

---

## 1. Cómo se midió

`playwright-evals/responsive-audit.cjs` abre cada ruta en Chromium a 390×844, 834×1112 y
1440×900 y reporta `documentElement.scrollWidth` contra `clientWidth`, la geometría de
`.site-head` / `main` / `.site-foot` y qué elementos salen del viewport.

```bash
pnpm dev                                  # servidor en :4321
node playwright-evals/responsive-audit.cjs
```

## 2. Hallazgos

### P0-1 — El contenedor de página no existe (causa raíz del "no es responsive")

`src/styles/tokens.css` define `--max-width: 1320px` y `--gutter: clamp(1.25rem, 4.5vw, 4.5rem)`,
pero **ninguna regla los aplica**. El prototipo aprobado sí lo hacía:

```css
/* design-lab/c-vibrant-editorial/styles.css:140 */
.site-head,
main,
.site-foot {
  padding-inline: var(--gutter);
  max-width: var(--max);
  margin-inline: auto;
}
```

Esa regla no se portó a `primitives.css`. Medido:

| Ruta | 390 px | 834 px | 1440 px |
| --- | --- | --- | --- |
| `/projects/` | 410 (scroll) | 872 (scroll) | 1440 |
| `/about/` | 410 (scroll) | 872 (scroll) | 1505 (scroll) |
| `/contact/` | 410 (scroll) | 872 (scroll) | 1505 (scroll) |

Y `.site-head`, `main` y `.site-foot` reportan `left: 0` con `width` = viewport en todas las
resoluciones: el contenido está pegado a los bordes, sin gutter ni ancho máximo.

Efecto secundario: `.band`, `.grid`, `.case-inner`, `.contact-inner`, `.statement-inner` y
`.empty` usan `margin-inline: calc(var(--gutter) * -1)` porque asumen un padre con padding. Al no
haber padding, cada una se sale **2 × gutter** del viewport. Los 20–65 px de desbordamiento
medidos son exactamente eso.

### P0-2 — La Home sigue siendo la página de verificación de Phase 00

`src/pages/index.astro` renderiza "Tooling is wired up.", con `meta robots="noindex"`, estilos en
línea, sin header, sin footer y sin la composición aprobada. Medido: `navVisible: absent`,
`compactNav: absent`, `h1` a 32 px.

La Home de `design-lab/c-vibrant-editorial/index.html` (hero tipográfico, feature, par de
proyectos, statement, contacto) **nunca se portó**. `board.md` la marca `[x] P03-02 Implement
Home` — esa marca es incorrecta y hay que corregirla.

Consecuencia directa: al abrir `localhost:4321` se ve una página de diagnóstico, no el diseño.
Esto explica la percepción de que "los artes y diseños no están".

### P0-3 — La navegación móvil no existe

`DESIGN-02-responsive.md`: "≤ 900 px: Primary nav hides; native `<details>` compact menu
appears." En el código:

- `.nav-compact { display: none }` (`primitives.css:58`) y **ningún** media query la muestra.
- Ninguna página incluye el `<details class="nav-compact">` del prototipo.

Medido a 390 px: `navVisible: "flex"`, `compactNav: "absent"` — los cuatro enlaces se aprietan en
la barra en vez de colapsar.

### P0-4 — El sistema de componentes no se portó; las páginas usan clases sin definir

No existen `src/layouts/` ni `src/components/`. `<head>`, `<header>` y `<footer>` están
duplicados literalmente en las cuatro páginas. Además, las páginas usan clases que no tienen
regla alguna:

| Clase usada en páginas | Definida en CSS | Clase del prototipo que hacía ese trabajo |
| --- | --- | --- |
| `.lede` | no | `.hero-lede` |
| `.meta-note` | no | `.hero-meta` / `.media-note` |
| `.work` | no | `.work` (sí existe en el prototipo) |
| `.statement` | no | `.statement` (solo existe `.statement-inner`) |
| `.placeholder`, `.placeholder-body` | no | — |
| `.gallery`, `.gallery-figure` | no | — |
| `.case-links` | no | — |

Hitos del prototipo ausentes por completo: `.hero-grid`, `.feature`, `.feature-body`,
`.spec`, `.doc`, `.toc`, `.pair`, animaciones de entrada (`.rise` con stagger).

Es decir: el case study y el listado se maquetaron con nombres nuevos, no con el sistema
aprobado, y sin las reglas que les daban composición.

### P1-1 — Case study sin comportamiento responsive

`.case-grid { grid-template-columns: 1fr 420px }` (`primitives.css:290`) no tiene breakpoint. Por
debajo de ~860 px la columna de 420 px fuerza desbordamiento.

### P1-2 — Contact y About sin breakpoints

`.contact-grid` es `repeat(3, 1fr)` sin colapso; `.cv-row` usa `padding: var(--space-8)
var(--space-12)` (48 px) también en móvil. `.experience-grid` sí colapsa a 900 px, pero es la
única sección que lo hace.

### P1-3 — Requisitos globales pendientes

- No hay `sitemap.xml` ni `robots.txt` (`requirements.md` los exige; `public/` solo tiene
  `favicon.svg` y `fonts/`).
- Canonical de `/projects/` apunta a `/` (`projects/index.astro:21`), no a `/projects/`.
- `aria-current` de Projects se calcula con `SITE.defaultTitle.includes('Projects')`, una
  heurística que siempre da `undefined`.
- Los enlaces usan `/projects` y `/about` sin barra final; el build genera `index.html` en
  carpetas, así que cada clic paga una redirección.
- El `<script>` de `?static` se repite en las cuatro páginas y no tiene equivalente en la Home
  portada.

## 3. Sobre el SPA

Verificado en la documentación: **ningún documento pide un SPA**. `requirements.md` enumera cinco
rutas separadas y `AGENTS.md` establece "public, static-first portfolio". Lo que sí existe es la
intención de navegación continua del prototipo (Home con secciones `#projects`, `#about`,
`#contact`, coherente con `SITE.SECTION_IDS` en `src/config/site.ts`).

Dos caminos:

**Opción A — recomendada: estático multipágina + transiciones de cliente.**
Añadir `<ClientRouter />` de `astro:transitions` (existe en Astro 7.4.5, verificado en
`node_modules/.../astro/dist/transitions/router.js`) y `prefetch` en `astro.config.mjs`. Se
mantienen cinco HTML estáticos, SEO y build estático, y la navegación deja de recargar la página:
se percibe como SPA. Coste: bajo, sin dependencias nuevas.

**Opción B — SPA real de un solo documento con router de cliente.**
Contradice `requirements.md` (rutas y metadata por página) y `AGENTS.md` (static-first); implicaría
`preact` + router, perdiendo el render estático por ruta. No la recomiendo.

La auditoría mide el estado actual; la elección es del owner.

## 4. Plan de corrección

Orden pensado para que cada paso sea verificable por separado.

### Paso 1 — Cimientos de layout (P0-1, P0-3, P0-4 base)

1. Crear `src/layouts/BaseLayout.astro`: `<head>` con title/description/canonical/OG/Twitter
   parametrizados, skip link, header con nav principal **y** `<details class="nav-compact">`,
   `<slot />`, footer. Una sola fuente de verdad para las cuatro páginas.
2. Portar a `primitives.css` la regla de contenedor del prototipo
   (`.site-head, main, .site-foot { padding-inline: var(--gutter); max-width: var(--max-width);
   margin-inline: auto }`).
3. Portar el bloque `@media (max-width: 900px)` completo del prototipo: ocultar `.site-nav`,
   mostrar `.nav-compact` con su panel, `summary` sin marcador nativo.
4. Portar el sistema que falta: `.hero-grid`, `.hero-lede`, `.hero-meta` (2 col a 900, 1 col a
   640), `.feature`, `.feature-body`, `.spec`, `.pair`, `.doc`/`.toc` y las animaciones de entrada
   con `prefers-reduced-motion`.
5. Verificación: `responsive-audit.cjs` con `scrollWidth === clientWidth` en las 12 combinaciones
   (4 rutas × 3 anchos) y `navVisible: none` / `compactNav: present` a 390 y 834.

### Paso 2 — Home real (P0-2)

Portar `design-lab/c-vibrant-editorial/index.html` a `src/pages/index.astro` usando el layout:
hero con headline y `em` aqua, `hero-meta` desde `profile.json` (manteniendo los placeholders
marcados), sección de trabajo con proyectos publicados (`getPublishedProjects()`), statement y
cierre de contacto. Eliminar `noindex`. Con cero proyectos verificados, mostrar el estado vacío
marcado, no inventar contenido.

### Paso 3 — Projects index y case study con el sistema aprobado

Reescribir `projects/index.astro` con `.feature` / `.spec` del prototipo en lugar de `.grid` +
`.project-card` (o justificar la tarjeta si se prefiere; hoy la tarjeta contradice "avoid forcing
every section into rounded cards" solo en parte, pero no existe en la dirección aprobada).
Case study: breakpoint para `.case-grid`, portar `.doc` / `.toc` y `.spec` del prototipo C,
arreglar `.case-inner`. Verificar con un proyecto de prueba local (fixture temporal, no
publicado).

### Paso 4 — Contact, About y requisitos globales

Colapsos de `.contact-grid` y `.cv-row`; canonical y `aria-current` correctos; barras finales
consistentes; `@astrojs/sitemap` + `public/robots.txt`; `?static` solo si sigue siendo necesario
tras el layout.

### Paso 5 — Navegación tipo SPA (si se aprueba la opción A)

`<ClientRouter />` en el layout + `prefetch: { prefetchAll: true }` en `astro.config.mjs`.
Verificar que el foco y el anuncio de ruta siguen siendo accesibles tras la navegación.

### Paso 6 — Evidencia y cierre

Capturas 1440 / 834 / 390 de Home y case study, tabla de mediciones en `board.md`, corrección de
la marca falsa de `P03-02`, y `pnpm check` / `pnpm build` / `format:check` en verde.

## 5. Decisiones pendientes del owner

1. **SPA**: ¿opción A (estático + ClientRouter) u opción B (SPA real con router de cliente)?
2. **Home**: ¿una sola página continua con `#projects` / `#about` / `#contact`, o Home resumida
   que enlaza a las rutas separadas como hoy?
3. **Proyectos**: ¿se mantiene la cuadrícula de tarjetas actual o se vuelve al `feature` + `pair`
   del prototipo C?
