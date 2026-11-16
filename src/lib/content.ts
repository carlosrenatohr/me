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

/**
 * Projects allowed on public routes: either owner-verified or explicitly marked as a
 * sample. A sample renders the real layout with demonstration content and is labelled
 * everywhere it appears, so it can never be mistaken for the owner's work.
 */
export type PublicProject = ProjectWithSlug & {
  data: {
    status: 'published' | 'sample';
    contentStatus: 'verified' | 'placeholder';
    [key: string]: unknown;
  };
};
export type Experience = CollectionEntry<'experience'>;

function isPublicProject(project: Project): boolean {
  if (project.data.status === 'sample') return true;
  return project.data.status === 'published' && project.data.contentStatus === 'verified';
}

/** True when a public project is demonstration content, not the owner's work. */
export function isSampleProject(project: { data: { status: string } }): boolean {
  return project.data.status === 'sample';
}

/**
 * Astro 5+ content collections expose the entry identifier as `id` and no longer
 * carry a `slug` property, so the slug-based URL is derived here instead of being
 * assumed on the entry. Keeping it in one place means pages and components can
 * rely on `project.slug`.
 */
function withSlug(project: Project): ProjectWithSlug {
  const legacySlug = (project as Project & { slug?: unknown }).slug;
  const slug =
    typeof legacySlug === 'string' && legacySlug.length > 0
      ? legacySlug
      : project.id.replace(/\.(md|mdx)$/, '');

  return { ...project, slug };
}

/** Personal and side projects lead the work index; client work follows. */
const KIND_RANK: Record<Project['data']['kind'], number> = { personal: 0, client: 1 };

function byDisplayOrder(a: Project, b: Project): number {
  const kindRank = KIND_RANK[a.data.kind] - KIND_RANK[b.data.kind];
  if (kindRank !== 0) return kindRank;

  const orderA = a.data.featuredOrder ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.data.featuredOrder ?? Number.MAX_SAFE_INTEGER;
  return orderA - orderB || a.data.title.localeCompare(b.data.title);
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

/** `2026-03` → `Mar 2026`. Anything else is returned untouched. */
export function formatMonth(value?: string): string | undefined {
  if (!value) return undefined;

  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;

  const monthIndex = Number(match[2]) - 1;
  const label = MONTHS[monthIndex];
  return label ? `${label} ${match[1]}` : value;
}

/** Experience period in display form: `Mar 2026 — Present`. */
export function formatPeriod(period?: { start: string; end?: string }): string | undefined {
  if (!period) return undefined;

  const start = formatMonth(period.start);
  const end = period.end === 'present' ? 'Present' : formatMonth(period.end);
  return end ? `${start} — ${end}` : start;
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
  const projects = (await getCollection('project', isPublicProject)) as Project[];
  return projects.map((project) => withSlug(project) as PublicProject).sort(byDisplayOrder);
}

export async function getFeaturedProjects(): Promise<PublicProject[]> {
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

/** Experience entries that are safe to publish, newest first. */
export async function getExperience(): Promise<Experience[]> {
  const entries = await getCollection('experience');
  return entries
    .filter((entry) => entry.data.contentStatus === 'verified')
    .sort((a, b) => b.data.period.start.localeCompare(a.data.period.start));
}

/** Verified experience split into professional history and earlier work. */
export async function getExperienceGroups(): Promise<{
  primary: Experience[];
  additional: Experience[];
}> {
  const entries = await getExperience();
  return {
    primary: entries.filter((entry) => entry.data.group === 'primary'),
    additional: entries.filter((entry) => entry.data.group === 'additional'),
  };
}
