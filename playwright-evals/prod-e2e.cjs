// Production E2E, run against the deployed GitHub Pages site.
//
// Uses the globally installed Playwright so it exercises the real artifact
// rather than the local `dist/`:
//
//   NODE_PATH=$(npm root -g) node playwright-evals/prod-e2e.cjs
//
// Covers routing and metadata, the closed archive and its keyboard behaviour,
// the interactive portrait, sitemap integrity, retired sample URLs, responsive
// overflow, client-side navigation and reduced motion.

const { chromium } = require('playwright');

const BASE = (process.env.BASE || 'https://carlosrenatohr.github.io/me').replace(/\/$/, '');

const ROUTES = [
  { path: '/', heading: /I build software for real problems/i },
  { path: '/projects/', heading: /Projects, in detail/i },
  { path: '/projects/orbit-logistics/', heading: /Orbit Logistics/i },
  { path: '/projects/hit-cargo/', heading: /HIT Cargo/i },
  { path: '/projects/dredd/', heading: /DREDD/i },
  { path: '/projects/mi-lexio/', heading: /Mi Lexio/i },
  { path: '/projects/ranita-leopardo/', heading: /Ranita Leopardo/i },
  { path: '/projects/nalu/', heading: /Nalu/i },
  { path: '/projects/growthoptix/', heading: /GrowthOptix/i },
  { path: '/projects/beon-tech-studio/', heading: /BEON/i },
  { path: '/about/', heading: /About/i },
  { path: '/experience/', heading: /A decade of/i },
  { path: '/skills/', heading: /The whole stack/i },
  { path: '/ai/', heading: /AI/i },
  { path: '/contact/', heading: /Tell me what/i },
];

const SIZES = [390, 834, 1440];

let failures = 0;
let checks = 0;

function check(label, condition, detail = '') {
  checks += 1;
  if (condition) {
    console.log(`ok   ${label}${detail ? ` — ${detail}` : ''}`);
    return;
  }
  failures += 1;
  console.log(`FAIL ${label}${detail ? ` — ${detail}` : ''}`);
}

async function overflow(page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(`${page.url()} :: ${message.text()}`);
  });
  page.on('pageerror', (error) => consoleErrors.push(`${page.url()} :: ${error}`));

  // 1. Every route: status, single h1, canonical, name in the title.
  for (const route of ROUTES) {
    const response = await page.goto(`${BASE}${route.path}?e2e=1`, {
      waitUntil: 'domcontentloaded',
    });
    const status = response?.status();
    await page.locator('h1').first().waitFor({ state: 'visible', timeout: 15000 });

    const meta = await page.evaluate(() => ({
      h1Count: document.querySelectorAll('h1').length,
      title: document.title,
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? '',
      description: document.querySelector('meta[name="description"]')?.content ?? '',
    }));

    check(`200 ${route.path}`, status === 200, String(status));
    check(`one h1 ${route.path}`, meta.h1Count === 1, `${meta.h1Count} found`);
    check(
      `heading ${route.path}`,
      route.heading.test((await page.locator('h1').first().innerText()).replace(/\s+/g, ' '))
    );
    check(
      `metadata ${route.path}`,
      meta.title.includes('Carlos R. Hernandez') &&
        meta.canonical.startsWith('https://carlosrenatohr.github.io/me/') &&
        meta.description.length > 40
    );
  }

  // 2. No sample content survives in production.
  await page.goto(`${BASE}/?e2e=samples`, { waitUntil: 'domcontentloaded' });
  const homeText = await page.locator('body').innerText();
  check(
    'no sample copy on the home page',
    !/Sample content|Signal Desk|Schema Scout|Relay Yard/i.test(homeText)
  );

  await page.goto(`${BASE}/projects/?e2e=samples`, { waitUntil: 'domcontentloaded' });
  const indexText = await page.locator('body').innerText();
  check(
    'no sample copy on the projects index',
    !/Sample content|Signal Desk|Schema Scout|Relay Yard/i.test(indexText)
  );

  // 3. The archive starts closed, hides its rows and opens by mouse and keyboard.
  const details = page.locator('details.more-work');
  check('index archive starts closed', !(await details.evaluate((node) => node.open)));
  check('rows hidden while closed', !(await details.locator('.more-row').first().isVisible()));

  await details.locator('summary').click();
  await page.waitForTimeout(350);
  check('mouse opens the archive', await details.evaluate((node) => node.open));
  check('six rows including the draft', (await details.locator('.more-row').count()) === 6);
  check('draft row has no link', (await details.locator('.more-row-draft a').count()) === 0);
  check(
    'published rows link to case studies',
    (await details.locator('.more-row:not(.more-row-draft) a').count()) === 5
  );
  check(
    'archive count is truthful',
    /5 published · 1 in draft/i.test(await details.innerText()),
    (await details.locator('.more-summary-meta').innerText()).replace(/\s+/g, ' ')
  );

  await details.locator('summary').focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  check('Enter closes the archive', !(await details.evaluate((node) => node.open)));
  await page.keyboard.press('Space');
  await page.waitForTimeout(300);
  check('Space reopens the archive', await details.evaluate((node) => node.open));

  // 4. Portrait: illustration first, photograph pinned by click and keyboard.
  await page.goto(`${BASE}/about/?e2e=portrait`, { waitUntil: 'domcontentloaded' });
  const toggle = page.locator('.portrait-toggle');
  const photoOpacity = () =>
    page.locator('.portrait-photo').evaluate((node) => getComputedStyle(node).opacity);
  const artVisible = () =>
    page.locator('.portrait-art').evaluate((node) => getComputedStyle(node).opacity);

  check('portrait starts unpressed', (await toggle.getAttribute('aria-pressed')) === 'false');
  check(
    'illustration is the visible frame',
    (await artVisible()) === '1' && (await photoOpacity()) === '0'
  );
  check(
    'portrait has an accessible name',
    (await toggle.getAttribute('aria-label')) ===
      'Toggle between illustrated and professional portrait'
  );

  await toggle.click();
  await page.waitForTimeout(350);
  check('click reveals the photograph', (await photoOpacity()) === '1');
  check(
    'aria-pressed reports the photograph',
    (await toggle.getAttribute('aria-pressed')) === 'true'
  );
  check(
    'caption follows the state',
    /photograph/i.test(await page.locator('.portrait-caption').innerText())
  );

  await page.mouse.move(5, 5);
  await toggle.focus();
  await page.keyboard.press('Space');
  await page.waitForTimeout(350);
  check(
    'Space returns to the illustration',
    (await toggle.getAttribute('aria-pressed')) === 'false'
  );
  check('illustration is visible again', (await photoOpacity()) === '0');

  // 5. Client-side navigation keeps a single document.
  const navEntriesBefore = await page.evaluate(
    () => performance.getEntriesByType('navigation').length
  );
  await page.locator('nav.site-nav a[href$="/projects/"]').click();
  await page.waitForURL(/\/projects\/$/, { timeout: 10000 });
  await page.waitForTimeout(400);
  const navEntriesAfter = await page.evaluate(
    () => performance.getEntriesByType('navigation').length
  );
  check('ClientRouter navigation is in-page', navEntriesBefore === 1 && navEntriesAfter === 1);
  check('title updates after navigation', (await page.title()).includes('Projects'));

  // 6. Sitemap: 17 URLs, all reachable.
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  check('sitemap has 17 URLs', urls.length === 17, String(urls.length));
  const statuses = await Promise.all(
    urls.map(async (url) => (await fetch(url, { redirect: 'follow' })).status)
  );
  check(
    'every sitemap URL returns 200',
    statuses.every((status) => status === 200),
    statuses.join(',')
  );
  check('sitemap excludes the draft', !urls.some((url) => url.includes('buko')));

  // 7. Retired sample routes are gone.
  const retired = await fetch(`${BASE}/projects/signal-desk/`, { redirect: 'follow' });
  check('retired sample route is not found', retired.status === 404, String(retired.status));

  // 8. No horizontal overflow at three widths.
  for (const width of SIZES) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    for (const path of ['/', '/projects/', '/about/']) {
      await page.goto(`${BASE}${path}?e2e=w${width}`, { waitUntil: 'domcontentloaded' });
      const delta = await overflow(page);
      check(`no overflow ${width} ${path}`, delta <= 0, `${delta}px`);
    }
  }

  // 9. Reduced motion: the archive still opens, without animation errors.
  const reduced = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const reducedPage = await reduced.newPage();
  const reducedErrors = [];
  reducedPage.on('pageerror', (error) => reducedErrors.push(String(error)));
  await reducedPage.goto(`${BASE}/?e2e=reduced`, { waitUntil: 'domcontentloaded' });
  const reducedDetails = reducedPage.locator('details.more-work');
  await reducedDetails.locator('summary').click();
  await reducedPage.waitForTimeout(150);
  check('archive opens with reduced motion', await reducedDetails.evaluate((node) => node.open));
  check('no errors with reduced motion', reducedErrors.length === 0, reducedErrors.join(' | '));
  await reduced.close();

  check('no console errors', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));

  await browser.close();
  console.log(`\n${checks - failures}/${checks} checks passed`);
  process.exit(failures === 0 ? 0 : 1);
})();
