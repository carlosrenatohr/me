import { canonicalUrl, projectPath, ROUTES, SITE } from '@/config/site';
import type { Profile, PublicProject } from '@/lib/content';

/**
 * Structured data.
 *
 * Every value here is reproduced from visible page content or from the
 * published CV. Nothing is inferred, enriched or guessed: a wrong claim in
 * JSON-LD is just as fabricated as a wrong claim in copy, and it is harder for
 * a reader to spot.
 *
 * The graph is emitted once per page. `Person` and `WebSite` are site-wide;
 * pages append their own node (ProfilePage, CollectionPage, CreativeWork,
 * ContactPage) and reference the shared entities by `@id` instead of repeating
 * them.
 */

type Node = Record<string, unknown>;

const HOME = canonicalUrl(ROUTES.home);

export const PERSON_ID = `${HOME}#person`;
export const WEBSITE_ID = `${HOME}#website`;

/**
 * Areas the CV and the public pages support. Tool-level terms are appended
 * from the skills collection at build time, so this list stays a statement
 * about the work rather than a keyword dump.
 */
const KNOWLEDGE_AREAS = [
  'Backend engineering',
  'Distributed systems',
  'API design and integration',
  'Enterprise integrations',
  'Data pipelines',
  'Cloud architecture',
];

/**
 * Google truncates a description somewhere past 155 characters. Cutting at a
 * word boundary keeps a long project summary readable in a result snippet
 * instead of ending mid-word.
 */
export function clampDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).replace(/[,;:.\s]+$/, '')}…`;
}

function splitLocation(location?: string): { locality?: string; country?: string } {
  if (!location) return {};
  const [locality, country] = location.split(',').map((part) => part.trim());
  return { locality, country };
}

/** The person the site is about: one `@id`, referenced by every other node. */
export function personNode(profile: Profile, coreTools: string[]): Node {
  const { data } = profile;
  const { locality, country } = splitLocation(data.location);

  const sameAs = data.links.map((link) => link.url).filter((url) => /^https?:/i.test(url));

  const alumniOf = data.education.map((entry) => ({
    '@type': 'CollegeOrUniversity',
    name: entry.institution,
  }));

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: data.name,
    alternateName: SITE.name,
    url: HOME,
    jobTitle: SITE.jobTitle,
    description: data.shortIntro,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(locality
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: locality,
            ...(country ? { addressCountry: country } : {}),
          },
        }
      : {}),
    knowsAbout: [...KNOWLEDGE_AREAS, ...coreTools],
    ...(alumniOf.length > 0 ? { alumniOf } : {}),
  };
}

/** The site itself, so the name resolves to this URL as an entity. */
export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: HOME,
    name: SITE.name,
    alternateName: SITE.legalName,
    description: SITE.description,
    inLanguage: SITE.locale,
    publisher: { '@id': PERSON_ID },
  };
}

/** About: the page whose main subject is the person. */
export function profilePageNode(): Node {
  const url = canonicalUrl(ROUTES.about);

  return {
    '@type': 'ProfilePage',
    '@id': `${url}#page`,
    url,
    name: `About ${SITE.name}`,
    description:
      'Profile, professional record and education of Carlos Renato, a senior software engineer working on distributed systems and enterprise integrations.',
    inLanguage: SITE.locale,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': PERSON_ID },
  };
}

/**
 * Projects index: a collection page listing the published case studies.
 * Sample entries are left out on purpose — they are demonstration content,
 * not work that belongs in an index of published projects.
 */
export function collectionPageNode(projects: PublicProject[]): Node {
  const url = canonicalUrl(ROUTES.projects);
  const published = projects.filter((project) => project.data.status === 'published');

  return {
    '@type': 'CollectionPage',
    '@id': `${url}#page`,
    url,
    name: 'Projects',
    description:
      'Featured products, open-source experiments and professional case studies: the problem, the role, the decisions and the evidence behind each one.',
    inLanguage: SITE.locale,
    isPartOf: { '@id': WEBSITE_ID },
    ...(published.length > 0
      ? {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: published.length,
            itemListElement: published.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: canonicalUrl(projectPath(project.slug)),
              name: project.data.title,
            })),
          },
        }
      : {}),
  };
}

/** A case study, authored by the person the site is about. */
export function creativeWorkNode(project: PublicProject): Node {
  const { data } = project;
  const url = canonicalUrl(projectPath(project.slug));

  return {
    '@type': 'CreativeWork',
    '@id': `${url}#case-study`,
    url,
    name: data.title,
    headline: data.title,
    description: data.summary,
    genre: data.category,
    // An employer's platform is not authored by the person writing the case study,
    // so authorship is only claimed for personal and open-source work.
    ...(data.collection === 'professional'
      ? {}
      : { author: { '@id': PERSON_ID }, creator: { '@id': PERSON_ID } }),
    inLanguage: SITE.locale,
    isPartOf: { '@id': WEBSITE_ID },
    ...(data.technologies.length > 0 ? { keywords: data.technologies.join(', ') } : {}),
  };
}

/** Home → Projects → case study, matching the navigation a reader takes. */
export function breadcrumbNode(project: PublicProject): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: HOME },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: canonicalUrl(ROUTES.projects),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.data.title,
        item: canonicalUrl(projectPath(project.slug)),
      },
    ],
  };
}

/** Contact: the page whose purpose is reaching the person. */
export function contactPageNode(): Node {
  const url = canonicalUrl(ROUTES.contact);

  return {
    '@type': 'ContactPage',
    '@id': `${url}#page`,
    url,
    name: `Contact ${SITE.name}`,
    inLanguage: SITE.locale,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': PERSON_ID },
  };
}

/**
 * Serialise the graph for a `<script type="application/ld+json">` block.
 * `<` is escaped so a value can never close the script element early.
 */
export function serialiseGraph(nodes: Node[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(
    /</g,
    '\\u003c'
  );
}
