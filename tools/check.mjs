#!/usr/bin/env node
/**
 * check.mjs — integrity check for the library itself.
 *
 *   node tools/check.mjs
 *
 * A progressive-disclosure corpus fails silently when a router points at a file
 * that does not exist: the agent reads START-HERE, follows a link, gets nothing,
 * and falls back to its defaults — which is the exact failure this library exists
 * to prevent. So the links are load-bearing and get checked.
 *
 * Checks:
 *   · every relative markdown link resolves to a real file
 *   · every file the archetype selector and craft/pattern indexes promise exists
 *   · every category/archetype/craft file carries an `Evaluated:` date
 *   · flags files that are suspiciously short (a stub that looks like content)
 *   · reports staleness against a cutoff
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const C = { red: (s) => `\x1b[31m${s}\x1b[0m`, yel: (s) => `\x1b[33m${s}\x1b[0m`, grn: (s) => `\x1b[32m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m`, b: (s) => `\x1b[1m${s}\x1b[0m` };

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
let errors = 0, warnings = 0;

// ── 1. links ───────────────────────────────────────────────────────────────
const broken = [];
for (const file of files) {
  const md = readFileSync(file, 'utf8');
  // Strip fenced AND inline code before looking for links. A regex in a table cell
  // like `[01](\.0+)?` is a character class followed by a group, not a markdown link,
  // and reporting it as a broken link trains you to ignore the checker.
  const body = md.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  for (const m of body.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|#)/.test(href)) continue;
    const target = resolve(dirname(file), href.split('#')[0]);
    if (!existsSync(target)) broken.push([relative(ROOT, file), href]);
  }
}
console.log(C.b('\nLinks'));
if (broken.length) {
  errors += broken.length;
  for (const [f, h] of broken) console.log(`  ${C.red('broken')}  ${f} → ${h}`);
} else console.log(`  ${C.grn('ok')}      every relative link resolves`);

// ── 2. promised files ──────────────────────────────────────────────────────
const promises = {
  'archetypes/README.md': /\]\((?!\.\.)([a-z0-9-]+\.md)\)/g,
  'craft/README.md': /\]\((?!\.\.)([a-z0-9-]+\.md)\)/g,
  'patterns/README.md': /\]\((?!\.\.)([a-z0-9-]+\.md)\)/g,
  'references/README.md': /\]\((?!\.\.)([a-z0-9-]+\.md)\)/g,
  'anti-patterns/README.md': /\]\((?!\.\.)([a-z0-9-]+\.md)\)/g,
};
console.log(C.b('\nIndex promises'));
for (const [idx, re] of Object.entries(promises)) {
  const p = join(ROOT, idx);
  if (!existsSync(p)) { console.log(`  ${C.yel('skip')}    ${idx} not present`); continue; }
  const md = readFileSync(p, 'utf8');
  const want = [...new Set([...md.matchAll(re)].map((m) => m[1]))].filter((f) => f !== 'README.md');
  const missing = want.filter((f) => !existsSync(join(dirname(p), f)));
  if (missing.length) { errors += missing.length; console.log(`  ${C.red('missing')} ${idx}: ${missing.join(', ')}`); }
  else console.log(`  ${C.grn('ok')}      ${idx} — ${want.length} files`);
}

// ── 3. freshness + stubs ───────────────────────────────────────────────────
const dated = files.filter((f) => /\/(libraries|archetypes|craft|references|patterns)\//.test(f) && !f.endsWith('README.md'));
const undatedList = [], stubs = [], dates = [];
for (const f of dated) {
  const md = readFileSync(f, 'utf8');
  const d = md.match(/\*\*(?:Evaluated|Measured):\*\*\s*([0-9]{4}-[0-9]{2})/);
  if (d) dates.push([relative(ROOT, f), d[1]]); else undatedList.push(relative(ROOT, f));
  const lines = md.split('\n').length;
  if (lines < 60) stubs.push([relative(ROOT, f), lines]);
}
console.log(C.b('\nFreshness'));
if (undatedList.length) { warnings += undatedList.length; console.log(`  ${C.yel('warn')}    ${undatedList.length} file(s) with no Evaluated date`); undatedList.slice(0, 6).forEach((f) => console.log(C.dim(`          ${f}`))); }
else console.log(`  ${C.grn('ok')}      all ${dates.length} content files dated`);

const now = new Date();
const cutoff = new Date(now.getFullYear(), now.getMonth() - 6, 1);
const stale = dates.filter(([, d]) => new Date(d + '-01') < cutoff);
if (stale.length) { warnings += stale.length; console.log(`  ${C.yel('stale')}   ${stale.length} file(s) older than 6 months — the monthly routine should re-check these`); stale.slice(0, 8).forEach(([f, d]) => console.log(C.dim(`          ${d}  ${f}`))); }

if (stubs.length) { warnings += stubs.length; console.log(C.b('\nSuspiciously short')); stubs.forEach(([f, n]) => console.log(`  ${C.yel('stub?')}   ${f} (${n} lines)`)); }

// ── 4. shape ───────────────────────────────────────────────────────────────
const count = (d) => (existsSync(join(ROOT, d)) ? readdirSync(join(ROOT, d)).filter((f) => f.endsWith('.md') && f !== 'README.md').length : 0);
const totalLines = files.reduce((n, f) => n + readFileSync(f, 'utf8').split('\n').length, 0);
console.log(C.b('\nShape'));
for (const d of ['system', 'archetypes', 'craft', 'references', 'libraries', 'patterns', 'anti-patterns'])
  console.log(`  ${String(count(d)).padStart(3)}  ${d}`);
console.log(C.dim(`  ${files.length} markdown files · ${totalLines.toLocaleString()} lines`));

console.log(errors ? C.red(`\n${errors} error(s), ${warnings} warning(s)\n`) : C.grn(`\nNo errors. ${warnings} warning(s).\n`));
process.exit(errors ? 1 : 0);
