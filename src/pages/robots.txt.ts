import type { APIRoute } from 'astro';
import { canonicalUrl } from '@/config/site';

/**
 * robots.txt.
 *
 * Generated rather than static so the Sitemap line uses the same origin as the
 * canonical URLs. Nothing is disallowed: the public pages are the product.
 */
export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${canonicalUrl('/sitemap.xml')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
