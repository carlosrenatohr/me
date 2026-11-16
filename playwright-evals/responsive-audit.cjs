// Measures the rendered site in Chromium:
//   1. horizontal overflow and page geometry at 390 / 834 / 1440
//   2. navigation state at each breakpoint
//   3. self-hosted font resolution
//   4. client-side navigation (ClientRouter) without a full page load
const { chromium } = require('playwright');

const BASE = process.env.BASE || 'http://localhost:4321';
// Astro's `base` (e.g. `/me`) is part of every internal href, so nav selectors have
// to be built from it instead of assuming the site is served from the domain root.
const PREFIX = new URL(BASE).pathname.replace(/\/$/, '');
const ROUTES = ['/', '/projects/', '/about/', '/contact/'];
const SIZES = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'desktop', width: 1440, height: 900 },
];

(async () => {
  const browser = await chromium.launch();
  let failures = 0;
  const fail = (message) => {
    failures += 1;
    console.log(`FAIL ${message}`);
  };

  for (const size of SIZES) {
    const page = await browser.newPage({ viewport: { width: size.width, height: size.height } });

    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: 'networkidle' });

      const report = await page.evaluate(() => {
        const doc = document.documentElement;
        const overflow = [];
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) continue;
          if (r.right > innerWidth + 0.5 || r.left < -0.5) {
            overflow.push({
              tag: el.tagName.toLowerCase(),
              cls: el.className?.toString().slice(0, 40) || '',
              left: Math.round(r.left),
              right: Math.round(r.right),
            });
          }
        }

        const box = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { left: Math.round(r.left), width: Math.round(r.width) };
        };

        const visible = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return 'absent';
          return getComputedStyle(el).display;
        };

        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          header: box('.site-head'),
          main: box('main'),
          footer: box('.site-foot'),
          navDisplay: visible('.site-nav'),
          compactDisplay: visible('.nav-compact'),
          h1Font: getComputedStyle(document.querySelector('h1')).fontFamily,
          newsreader: document.fonts.check('16px Newsreader'),
          archivo: document.fonts.check('16px Archivo'),
          overflow,
        };
      });

      const label = `${size.name} ${size.width} ${route}`;

      if (report.scrollWidth !== report.clientWidth) {
        fail(`${label} horizontal overflow: ${report.scrollWidth} > ${report.clientWidth}`);
      }
      // The skip link is intentionally parked off-canvas.
      const realOverflow = report.overflow.filter((el) => !(el.cls === 'skip'));
      if (realOverflow.length) {
        fail(`${label} elements outside viewport: ${JSON.stringify(realOverflow.slice(0, 4))}`);
      }
      if (!report.main || !report.header || !report.footer) {
        fail(`${label} missing header, main or footer`);
      }
      if (size.width > 900 && report.compactDisplay !== 'none') {
        fail(`${label} compact menu should be hidden, got ${report.compactDisplay}`);
      }
      if (size.width <= 900 && report.navDisplay !== 'none') {
        fail(`${label} desktop nav should be hidden, got ${report.navDisplay}`);
      }
      if (size.width <= 900 && report.compactDisplay === 'none') {
        fail(`${label} compact menu should be visible`);
      }
      if (!report.newsreader || !report.archivo) {
        fail(
          `${label} self-hosted fonts not resolved (Newsreader ${report.newsreader}, Archivo ${report.archivo})`
        );
      }

      console.log(
        `${label}: scrollWidth=${report.scrollWidth} clientWidth=${report.clientWidth} ` +
          `main=${report.main.left}+${report.main.width} nav=${report.navDisplay} ` +
          `compact=${report.compactDisplay} fonts=${report.newsreader && report.archivo}`
      );
    }

    await page.close();
  }

  // Client-side navigation: clicking a nav link must not reload the document.
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const marker = await page.evaluate(() => {
    window.__spaMarker = 'kept';
    return performance.getEntriesByType('navigation').length;
  });
  await page.click(`.site-nav a[href="${PREFIX}/about/"]`);
  await page.waitForURL('**/about/');
  await page.waitForLoadState('networkidle');
  const after = await page.evaluate(() => ({
    marker: window.__spaMarker,
    navEntries: performance.getEntriesByType('navigation').length,
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.trim(),
  }));

  if (after.marker !== 'kept') fail('SPA navigation did a full document load');
  if (after.navEntries !== marker)
    fail(`navigation entries changed: ${marker} -> ${after.navEntries}`);
  if (!after.title.startsWith('About')) fail(`title after navigation: ${after.title}`);
  if (after.h1 !== 'About') fail(`h1 after navigation: ${after.h1}`);
  console.log(
    `SPA navigation: marker=${after.marker} navEntries=${after.navEntries} title="${after.title}"`
  );

  await page.close();
  await browser.close();

  console.log(failures === 0 ? '\nOK — all checks passed' : `\n${failures} check(s) failed`);
  process.exit(failures === 0 ? 0 : 1);
})();
