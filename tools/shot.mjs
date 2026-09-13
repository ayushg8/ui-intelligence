#!/usr/bin/env node
/**
 * shot.mjs — capture screenshots of a URL (or a local dev server) so an agent
 * can LOOK at an interface instead of guessing from code or marketing copy.
 *
 * Usage:
 *   node tools/shot.mjs <url> [--out DIR] [--name NAME] [--full] [--wait MS]
 *                       [--widths 1440,390] [--dark] [--scroll N] [--click SELECTOR]
 *
 * Writes:  DIR/NAME-<width>.png   (one per width)
 * Prints:  the absolute paths, one per line, so the caller can Read them.
 *
 * Notes for agents:
 *  - Default widths are 1440 (desktop) and 390 (iPhone-class). Judge both.
 *  - --full captures the whole page (long marketing pages); omit it to judge
 *    the above-the-fold composition, which is usually what matters first.
 *  - --scroll N takes N additional viewport shots scrolling down one screen at
 *    a time; use it to sample a long page without a 20k-pixel-tall image.
 */
import { createRequire } from 'node:module';
import { execSync, spawnSync } from 'node:child_process';

// Some sandboxes (and every corporate MITM proxy) let Node reach the network but not Chromium:
// the browser's TLS ClientHello is rejected by the relay and every navigation dies with
// ERR_CONNECTION_RESET. Node's fetch honours HTTPS_PROXY once NODE_USE_ENV_PROXY is set, so
// re-exec ourselves with it and we can fulfil the browser's requests from Node instead
// (see routeViaNode below). Without this, the "render it and look at it" step silently fails.
if (process.env.HTTPS_PROXY && !process.env.NODE_USE_ENV_PROXY) {
  const r = spawnSync(process.execPath, [new URL(import.meta.url).pathname, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
  });
  process.exit(r.status ?? 0);
}
// Resolve playwright from the local project, else from the global npm root, so
// this script works from any directory without a local install.
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  const globalRoot = execSync('npm root -g').toString().trim();
  const req = createRequire(globalRoot + '/');
  ({ chromium } = req('playwright'));
}
import { mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const argv = process.argv.slice(2);
const url = argv.find((a) => !a.startsWith('--'));
if (!url) {
  console.error('usage: node tools/shot.mjs <url> [--out DIR] [--name NAME] [--full] [--widths 1440,390] [--dark] [--wait MS] [--scroll N] [--click SEL]');
  process.exit(1);
}
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);

const outDir = resolve(flag('out', '.cache/shots'));
const name = flag('name', url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, '').slice(0, 60) || 'shot');
const widths = flag('widths', '1440,390').split(',').map((n) => parseInt(n.trim(), 10));
const waitMs = parseInt(flag('wait', '2500'), 10);
const scrolls = parseInt(flag('scroll', '0'), 10);
const clickSel = flag('click', null);

mkdirSync(outDir, { recursive: true });

// Reuse the shared browser (tools/browserd.mjs) when it is running: with many
// agents screenshotting at once, one browser process beats N.
import { readFileSync as _rf, existsSync as _ex } from 'node:fs';
import { resolve as _res, join as _join } from 'node:path';
let browser, sharedConn = false;
try {
  const wsFile = _join(_res(new URL('..', import.meta.url).pathname), '.cache', 'browser-ws');
  if (_ex(wsFile)) {
    browser = await chromium.connect(_rf(wsFile, 'utf8').trim(), { timeout: 8000 });
    sharedConn = true;
  }
} catch { browser = undefined; }
if (!browser) browser = await chromium.launch();
const written = [];

// Fulfil every request from Node rather than from Chromium's own network stack. Used as a
// fallback when direct navigation fails — see the NODE_USE_ENV_PROXY note at the top.
async function routeViaNode(ctx) {
  await ctx.route('**/*', async (route) => {
    const req = route.request();
    const u = req.url();
    if (!/^https?:/.test(u)) return route.continue().catch(() => {});
    try {
      const headers = { ...req.headers() };
      delete headers['accept-encoding'];
      delete headers['host'];
      const init = { method: req.method(), headers, redirect: 'follow' };
      const body = req.postDataBuffer();
      if (body) init.body = body;
      const res = await fetch(u, init);
      const buf = Buffer.from(await res.arrayBuffer());
      const out = {};
      res.headers.forEach((v, k) => {
        // Strip hop-by-hop and CSP headers: the body is already decoded, and CSP would block
        // the very subresources we just fetched on the page's behalf.
        if (!['content-encoding', 'content-length', 'transfer-encoding',
              'content-security-policy', 'content-security-policy-report-only'].includes(k.toLowerCase())) out[k] = v;
      });
      await route.fulfill({ status: res.status, headers: out, body: buf });
    } catch {
      await route.abort().catch(() => {});
    }
  });
}

for (const width of widths) {
  const isMobile = width < 600;
  const ctx = await browser.newContext({
    viewport: { width, height: isMobile ? 844 : 900 },
    deviceScaleFactor: 2,
    isMobile,
    hasTouch: isMobile,
    colorScheme: has('dark') ? 'dark' : 'light',
    userAgent: isMobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await ctx.newPage();
  try {
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() =>
        page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
      );
    } catch (navErr) {
      // Chromium could not reach the network itself (blocked relay, MITM proxy rejecting its
      // ClientHello). Retry with every request fulfilled from Node.
      if (!/ERR_CONNECTION_RESET|ERR_FAILED|ERR_TUNNEL|ERR_PROXY|ERR_SOCKET/.test(navErr.message)) throw navErr;
      console.error(`[shot] direct navigation failed (${navErr.message.split('\n')[0]}); retrying via Node`);
      await routeViaNode(ctx);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    }
    await page.waitForTimeout(waitMs);
    // Dismiss the usual cookie/consent furniture so it does not dominate the shot.
    for (const sel of ['button:has-text("Accept")', 'button:has-text("Agree")', 'button:has-text("Got it")', '[aria-label="Close"]']) {
      await page.locator(sel).first().click({ timeout: 700 }).catch(() => {});
    }
    if (clickSel) await page.locator(clickSel).first().click({ timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(600);

    const file = join(outDir, `${name}-${width}.png`);
    await page.screenshot({ path: file, fullPage: has('full') });
    written.push(file);

    for (let i = 1; i <= scrolls; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.92));
      await page.waitForTimeout(900);
      const f = join(outDir, `${name}-${width}-s${i}.png`);
      await page.screenshot({ path: f });
      written.push(f);
    }
  } catch (err) {
    console.error(`[shot] ${url} @${width}: ${err.message}`);
  } finally {
    await ctx.close();
  }
}

await browser.close();   // on a connected browser this disconnects; the server stays up
written.forEach((f) => console.log(f));
if (!written.length) process.exit(2);
