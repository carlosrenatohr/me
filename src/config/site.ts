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

/** Public routes. Only add a nav item once its page exists. */
export const NAV_ITEMS = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;
