#!/usr/bin/env node
/**
 * digest.mjs — build the fast path.
 *
 *   node tools/digest.mjs          # write the per-directory DIGEST.md files
 *   node tools/digest.mjs --check  # verify they are current (CI / monthly routine)
 *
 * The corpus is correct and enormous: the taxonomy alone is ~44k tokens, and a
 * realistic single task that opens START-HERE + three system files + one archetype
 * + one craft file costs ~30k. That is not progressive disclosure, it is a wall.
 *
 * Every content file already carries the right two sections — an "if you only
 * apply five things" head and a self-check — but the unit of loading is the whole
 * file, so neither is reachable without the other 25k tokens. This extracts them
 * into one digest per directory, so an agent loads the fast path for a couple of
 * thousand tokens and opens the full file only when a decision actually needs the
 * depth.
 *
 * The digests are GENERATED. Edit the source files, not these.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const C = { grn: (s) => `\x1b[32m${s}\x1b[0m`, yel: (s) => `\x1b[33m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m`, b: (s) => `\x1b[1m${s}\x1b[0m` };
const tok = (s) => Math.round(s.split(/\s+/).filter(Boolean).length * 4 / 3);

/** The adversarial passes append their own changelog sections, and those contain
 *  headings like "Self-check rewritten" that would shadow the real one. Cut the
 *  document at the first pass appendix before looking for anything. */
const PASS = /^#{1,4}\s+.*(Adversarial|Direction|Review|Differentiation|Challenge) pass/im;

/** Pull one `## …` section (heading matched by `re`) without the rest of the file. */
function section(mdRaw, re, { withHeading = false } = {}) {
  const cut = mdRaw.search(PASS);
  const md = cut > 0 ? mdRaw.slice(0, cut) : mdRaw;
  const lines = md.split('\n');
  let start = -1, depth = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,4})\s+(.*)$/);
    if (!m) continue;
    if (start === -1 && re.test(m[2])) { start = i; depth = m[1].length; continue; }
    if (start !== -1 && m[1].length <= depth) {
      return (withHeading ? lines.slice(start, i) : lines.slice(start + 1, i)).join('\n').trim();
    }
  }
  if (start === -1) return null;
  return (withHeading ? lines.slice(start) : lines.slice(start + 1)).join('\n').trim();
}

const FIVE = /only (apply|get|do|remember) (five|5)|if you only/i;
const CHECK = /self[- ]check|before you (ship|move on)|runnable check|ship checklist/i;
const FAST = /fast path|60[- ]second|sixty[- ]second/i;

function head(md) {
  const t = (md.match(/^#\s+(.+)$/m) || [, '?'])[1].trim();
  const d = (md.match(/\*\*(?:Evaluated|Measured):\*\*\s*([0-9]{4}-[0-9]{2})/) || [, ''])[1];
  return { title: t, date: d };
}

// On-demand extraction: pull one section out of one file without loading the file.
const arg = (n) => { const i = process.argv.indexOf(n); return i === -1 ? null : process.argv[i + 1]; };
const one = arg('--check-list') || arg('--five');
if (one) {
  const path = join(ROOT, one);
  if (!existsSync(path)) { console.error(`no such file: ${one}`); process.exit(1); }
  const md = readFileSync(path, 'utf8');
  const want = arg('--check-list') ? CHECK : FIVE;
  const out = section(md, want, { withHeading: true });
  if (!out) { console.error(`${one}: no ${arg('--check-list') ? 'self-check' : 'five-things'} section`); process.exit(1); }
  console.log(out);
  process.exit(0);
}

const GROUPS = [
  { dir: 'craft', title: 'Craft — fast path',
    blurb: 'The highest-leverage rule from each craft file, plus its self-check. Open the full file only when a decision needs the measured detail behind a rule.' },
  { dir: 'patterns', title: 'UX patterns — fast path',
    blurb: 'The five things that matter most per flow family. The full files carry the reference implementations, the failure states and the decision forks.' },
  { dir: 'archetypes', title: 'Archetypes — numbers at a glance',
    blurb: 'Density, the key measurements and the characteristic failure per archetype. Read the full file before designing in one; this table is for choosing and for sanity-checking.' },
  { dir: 'anti-patterns', title: 'Anti-vibecode — fast path',
    blurb: 'The 60-second score and the highest-frequency corrections. The taxonomy and remedies files are reference works — open them at a specific entry, not end to end.' },
];

let changed = 0, checked = 0;

for (const g of GROUPS) {
  const dir = join(ROOT, g.dir);
  if (!existsSync(dir)) continue;
  const files = readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md' && f !== 'DIGEST.md').sort();

  const parts = [
    `# ${g.title}`, '',
    `**Generated** by \`tools/digest.mjs\` from the files in \`${g.dir}/\` — do not edit; edit the source.`, '',
    g.blurb, '',
  ];

  if (g.dir === 'archetypes') {
    parts.push('| Archetype | Density | Key numbers | The characteristic failure |', '|---|---|---|---|');
    for (const f of files) {
      const md = readFileSync(join(dir, f), 'utf8');
      const slug = basename(f, '.md');
      const meta = (md.match(/^\*\*Evaluated:.*$/m) || [''])[0];
      const dens = (meta.match(/Density:\*\*\s*([^·|]+)/) || [, '—'])[1].trim();
      const rows = [...md.matchAll(/^\|\s*(Body|Row \/ list-item height|Row height|Radius[^|]*)\s*\|\s*([^|]+)\|/gim)]
        .map((m) => `${m[1].split('/')[0].trim().toLowerCase()} ${m[2].replace(/\*\*/g, '').trim()}`)
        .slice(0, 2).join(' · ') || '—';
      const fail = section(md, /characteristic failure/i) || '';
      const first = (fail.split('\n').find((l) => l.trim() && !l.startsWith('#')) || '—').replace(/\|/g, '/').trim();
      parts.push(`| [\`${slug}\`](${f}) | ${dens} | ${rows.slice(0, 120)} | ${first.slice(0, 190)} |`);
    }
  } else {
    for (const f of files) {
      const md = readFileSync(join(dir, f), 'utf8');
      const { title, date } = head(md);
      const five = section(md, g.dir === 'anti-patterns' ? FAST : FIVE) || section(md, FIVE);
      const chk = section(md, CHECK);
      if (!five && !chk) continue;
      parts.push(`## ${title}`, '', `\`${g.dir}/${f}\`${date ? ` · ${date}` : ''} · full file ~${tok(md).toLocaleString()} tok${chk ? ` · self-check: \`node tools/digest.mjs --check-list ${g.dir}/${f}\`` : ''}`, '');
      if (five) parts.push(five, '');
      parts.push('---', '');
    }
  }

  const out = parts.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  const path = join(dir, 'DIGEST.md');
  const cur = existsSync(path) ? readFileSync(path, 'utf8') : '';
  checked++;
  if (cur !== out) {
    changed++;
    if (!process.argv.includes('--check')) writeFileSync(path, out);
  }
  const full = files.reduce((n, f) => n + tok(readFileSync(join(dir, f), 'utf8')), 0);
  console.log(`  ${g.dir}/DIGEST.md  ${C.grn(tok(out).toLocaleString().padStart(6) + ' tok')}  ${C.dim(`vs ${full.toLocaleString()} tok for all ${files.length} files — ${(100 - (tok(out) / full) * 100).toFixed(1)}% smaller`)}`);
}

if (process.argv.includes('--check')) {
  if (changed) { console.error(C.red(`\n${changed} digest(s) out of date — run: node tools/digest.mjs\n`)); process.exit(1); }
  console.log(C.grn('\nDigests are current.\n')); process.exit(0);
}
console.log(`\n${changed ? C.yel(`${changed} of ${checked} digest(s) rewritten.`) : C.grn('Digests already current.')}\n`);
