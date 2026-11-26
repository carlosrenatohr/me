// Regenerates public/og/carlos-renato.jpg (1200×630).
//
// The card is rendered from HTML so it uses the same self-hosted faces and the
// same navy palette as the site. Run with `pnpm og` after changing the name,
// role, location or accent colours.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const font = (path) => pathToFileURL(resolve(root, path)).href;
const output = resolve(root, 'public/og/carlos-renato.jpg');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: 'Newsreader';
        font-style: normal;
        font-weight: 200 800;
        src: url('${font('src/assets/fonts/newsreader/newsreader.woff2')}') format('woff2');
      }
      @font-face {
        font-family: 'Archivo';
        font-style: normal;
        font-weight: 100 900;
        src: url('${font('src/assets/fonts/archivo/archivo.woff2')}') format('woff2');
      }

      * { margin: 0; box-sizing: border-box; }

      body {
        width: 1200px;
        height: 630px;
        padding: 64px 72px 56px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #060b1a;
        color: #eaf1ff;
        font-family: 'Newsreader', Georgia, serif;
      }

      .top { display: flex; align-items: center; gap: 12px; }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ff6a4d;
      }

      .role {
        font-family: 'Archivo', system-ui, sans-serif;
        font-size: 19px;
        font-weight: 500;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #2fd3dd;
      }

      .name {
        font-size: 132px;
        font-weight: 300;
        line-height: 0.94;
        letter-spacing: -0.035em;
      }

      .rule {
        height: 1px;
        background: rgba(234, 241, 255, 0.16);
        margin: 26px 0 22px;
      }

      .bottom {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 40px;
      }

      .stack {
        font-size: 30px;
        font-weight: 300;
        color: #c9d6ec;
      }

      .place {
        font-family: 'Archivo', system-ui, sans-serif;
        font-size: 17px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #95a7c6;
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <p class="top"><span class="dot"></span><span class="role">Senior software engineer</span></p>
    <p class="name">Carlos Renato</p>
    <div>
      <div class="rule"></div>
      <div class="bottom">
        <p class="stack">Backend systems · APIs · Enterprise integrations</p>
        <p class="place">Managua, Nicaragua</p>
      </div>
    </div>
  </body>
</html>`;

await mkdir(resolve(root, 'public/og'), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: output, type: 'jpeg', quality: 92 });
await browser.close();

console.log(`Wrote ${output}`);
