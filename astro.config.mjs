// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // <ClientRouter /> in src/layouts/BaseLayout.astro upgrades navigation to
  // in-place swaps. Prefetching keeps those swaps instant without turning the
  // site into a single-document app: every route is still prerendered HTML.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
