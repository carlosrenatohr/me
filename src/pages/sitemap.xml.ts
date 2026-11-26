import type { APIRoute } from 'astro';
import { getPublishedProjects } from '@/lib/content';
import { canonicalUrl, projectPath, ROUTES } from '@/config/site';

/**
 * Generated sitemap.
 *
 * Only routes that exist and are safe to index are listed: the static pages plus
 * the published, owner-verified case studies. Drafts and samples never appear —
 * a sample renders the layout but is not the owner's work, and it is noindex on
 * the page itself, so listing it here would be a contradiction.
 * The origin comes from SITE.origin, so the sitemap follows PUBLIC_SITE_URL
 * without edits.
 */
export const GET: APIRoute = async () => {
  const projects = (await getPublishedProjects()).filter(
    (project) => project.data.status === 'published'
  );

  const paths = [
    ROUTES.home,
    // The work index is only listed once it can show real, published work.
    ...(projects.length > 0 ? [ROUTES.projects] : []),
    ROUTES.ai,
    ROUTES.skills,
    ROUTES.experience,
    ROUTES.about,
    ROUTES.contact,
    ...projects.map((project) => projectPath(project.slug)),
  ];

  const entries = paths
    .map(
      (path) => `  <url>
    <loc>${canonicalUrl(path)}</loc>
  </url>`
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
