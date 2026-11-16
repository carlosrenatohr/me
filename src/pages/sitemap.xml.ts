import type { APIRoute } from 'astro';
import { getPublishedProjects } from '@/lib/content';
import { canonicalUrl, projectPath, ROUTES } from '@/config/site';

/**
 * Generated sitemap.
 *
 * Only routes that exist and are safe to index are listed: the four static
 * pages plus the published, owner-verified case studies. Drafts never appear.
 * The origin comes from SITE.origin, so the sitemap follows PUBLIC_SITE_URL
 * without edits.
 */
export const GET: APIRoute = async () => {
  const projects = await getPublishedProjects();

  const paths = [
    ROUTES.home,
    ROUTES.projects,
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
