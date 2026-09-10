#!/usr/bin/env node
/**
 * browserd.mjs — one shared Chromium for every agent, instead of one each.
 *
 *   node tools/browserd.mjs start     # launch, print endpoint
 *   node tools/browserd.mjs status
 *   node tools/browserd.mjs stop
 *
 * Fan-out research is memory-bound, not CPU-bound: twenty agents each calling
 * chromium.launch() is twenty browser processes plus their renderers, which on a
 * 16GB machine means swap. A single launchServer() with many connected clients
 * costs one browser process and one renderer per open page, and pages close as
 * soon as a shot is taken.
 *
 * shot.mjs and audit.mjs pick this up automatically via .cache/browser-ws when it
 * is live, and fall back to their own launch when it is not. Nothing breaks if the
 * server is down.
 */
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { writeFileSync, readFileSync, existsSync, unlinkSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const CACHE = join(ROOT, '.cache');
const WS_FILE = join(CACHE, 'browser-ws');
const PID_FILE = join(CACHE, 'browser-pid');

let chromium;
try { ({ chromium } = await import('playwright')); }
catch { ({ chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright')); }

const cmd = process.argv[2] || 'start';

const alive = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };

if (cmd === 'status') {
  const pid = existsSync(PID_FILE) ? Number(readFileSync(PID_FILE, 'utf8')) : null;
  if (pid && alive(pid)) console.log(`running · pid ${pid} · ${readFileSync(WS_FILE, 'utf8')}`);
  else console.log('not running');
  process.exit(0);
}

if (cmd === 'stop') {
  const pid = existsSync(PID_FILE) ? Number(readFileSync(PID_FILE, 'utf8')) : null;
  if (pid && alive(pid)) { process.kill(pid); console.log(`stopped pid ${pid}`); }
  else console.log('not running');
  for (const f of [WS_FILE, PID_FILE]) if (existsSync(f)) unlinkSync(f);
  process.exit(0);
}

mkdirSync(CACHE, { recursive: true });

const server = await chromium.launchServer({
  args: [
    '--disable-dev-shm-usage',
    '--no-sandbox',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-renderer-backgrounding',
  ],
});

writeFileSync(WS_FILE, server.wsEndpoint());
writeFileSync(PID_FILE, String(process.pid));
console.log(server.wsEndpoint());
console.error(`[browserd] shared chromium up · pid ${process.pid}`);

const shutdown = async () => {
  for (const f of [WS_FILE, PID_FILE]) { try { unlinkSync(f); } catch {} }
  await server.close().catch(() => {});
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
