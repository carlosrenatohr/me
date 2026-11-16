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
  origin: import.meta.env.PUBLIC_SITE_URL ?? 'https://carlosrenatohr.github.io',
} as const;

/**
 * Public routes.
 *
 * Canonical form keeps the trailing slash: the static build writes
 * `/projects/index.html`, so `/projects` would cost a redirect on every
 * navigation. Pages, navigation and the sitemap all read from here.
 */

const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const ROUTES = {
  home: BASE,
  projects: `${BASE}projects/`,
  about: `${BASE}about/`,
  contact: `${BASE}contact/`,
} as const;

export type NavKey = 'projects' | 'about' | 'contact';

export interface NavItem {
  label: string;
  href: string;
  key: NavKey;
}

/** Primary navigation. The wordmark is the link home, so it is not listed. */
export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: 'Work', href: ROUTES.projects, key: 'projects' },
  { label: 'About', href: ROUTES.about, key: 'about' },
  { label: 'Contact', href: ROUTES.contact, key: 'contact' },
];

/** In-page section ids used by the home page and the contents rails. */
export const SECTION_IDS = ['work', 'about', 'contact'] as const;

/** Case-study route for a project slug. */
export function projectPath(slug: string): string {
  return `${ROUTES.projects}${slug}/`;
}

/** Absolute canonical URL for a site-relative path. */
export function canonicalUrl(path: string): string {
  return new URL(path, SITE.origin).toString();
}
