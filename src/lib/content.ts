import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

/**
 * Content repository.
 *
 * Pages and components must import from this module, never from `astro:content`
 * directly. A future CMS/API migration replaces these function bodies with an
 * adapter that returns the same types.
 */

export type Profile = CollectionEntry<'profile'>;
export type Project = CollectionEntry<'project'>;

/** A project with the `slug` property added, useful for pages that build slug-based URLs. */
export type ProjectWithSlug = Project & { slug: string };

/** Projects allowed on public routes: published and owner-verified. */
export type PublicProject = ProjectWithSlug & {
  data: {
    status: 'published';
    contentStatus: 'verified';
    [key: string]: unknown;
  };
};
export type Experience = CollectionEntry<'experience'>;

function isPublicProject(project: Project): boolean {
  return project.data.status === 'published' && project.data.contentStatus === 'verified';
}

function byDisplayOrder(a: Project, b: Project): number {
  const orderA = a.data.featuredOrder ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.data.featuredOrder ?? Number.MAX_SAFE_INTEGER;
  return orderA - orderB || a.data.title.localeCompare(b.data.title);
}

export async function getProfile(): Promise<Profile> {
  const entries = await getCollection('profile');
  const profile = entries[0];

  if (!profile) {
    throw new Error('Content error: the profile collection is empty.');
  }

  return profile;
}

/** Every project, including drafts. For tooling and editorial checks only. */
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('project');
  return projects.sort(byDisplayOrder);
}

/** Projects allowed on public routes: published and owner-verified. */
export async function getPublishedProjects(): Promise<PublicProject[]> {
  const projects = (await getCollection('project', isPublicProject)) as PublicProject[];
  return projects.sort(byDisplayOrder);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getPublishedProjects();
  return projects.filter((project) => project.data.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const project = await getEntry('project', slug);

  if (!project || !isPublicProject(project)) {
    return undefined;
  }

  return project;
}

/** Experience entries that are safe to publish. */
export async function getExperience(): Promise<Experience[]> {
  const entries = await getCollection('experience');
  return entries
    .filter((entry) => entry.data.contentStatus === 'verified')
    .sort((a, b) => b.data.period.start.localeCompare(a.data.period.start));
}
