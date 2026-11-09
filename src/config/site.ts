/**
 * Site configuration.
 *
 * The canonical origin is intentionally independent of the deployment target
 * until the owner approves a domain.
 */
export const SITE = {
  name: 'Carlos Renato',
  defaultTitle: 'Carlos Renato — Independent Software Engineer',
  description: 'Portfolio of Carlos Renato, an independent software engineer and product builder.',
  locale: 'en',
  origin: import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',
} as const;

/** Public routes. Only a component or page may add a nav item once its page exists. */
export const PAGE_ROUTES = ['/', '/projects', '/about', '/contact'] as const;

/** In-page section ids used by the contents rail and anchor navigation. */
export const SECTION_IDS = ['projects', 'about', 'contact'] as const;
