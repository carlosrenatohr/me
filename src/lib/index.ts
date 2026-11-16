// Phase 03 barrel — exposes the content repository layer.
// Pages and components import from this module, never from `astro:content`
// directly, so a future CMS/API migration replaces these function bodies
// with an adapter that returns the same types.
export type { Profile, Project, Experience } from './content';
export {
  getProfile,
  getAllProjects,
  getPublishedProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getExperience,
} from './content';
