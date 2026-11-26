import type { APIRoute } from 'astro';
import { canonicalUrl, ROUTES } from '@/config/site';

/**
 * robots.txt.
 *
 * Generated rather than static so the Sitemap line uses the same origin as the
 * canonical URLs. The sitemap is built under Astro's `base`, so its path has to
 * come from ROUTES rather than from the domain root. Nothing is disallowed:
 * the public pages are the product.
 */
export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${canonicalUrl(`${ROUTES.home}sitemap.xml`)}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
