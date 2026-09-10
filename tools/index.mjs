#!/usr/bin/env node
/**
 * index.mjs — build data/index.json from the scorecards in libraries/*.md
 *
 *   node tools/index.mjs           # write data/index.json
 *   node tools/index.mjs --check   # verify it is current (CI / pre-commit)
 *   node tools/index.mjs --stale 6 # list entries not evaluated in N months
 *
 * The markdown files are the source of truth — they are what agents read. This
 * produces the machine-readable view the monthly research routine uses to see,
 * at a glance, what is stale and what is ranked where.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const LIB = join(ROOT, 'libraries');
const OUT = join(ROOT, 'data', 'index.json');

const TIERS = ['essential', 'strong', 'situational', 'experimental', 'reference-only', 'avoid'];

function parseCategory(file) {
  const md = readFileSync(join(LIB, file), 'utf8');
  const slug = basename(file, '.md');
  const title = (md.match(/^#\s+(.+)$/m) || [, slug])[1].trim();
  const evaluated = (md.match(/\*\*Evaluated:\*\*\s*([0-9]{4}-[0-9]{2})/) || [, null])[1];

  const entries = [];
  // ### <Name> — `<tier>`   (em dash, en dash or hyphen; tier in backticks or plain)
  const re = /^###\s+(.+?)\s*[—–-]\s*`?(essential|strong|situational|experimental|reference-only|avoid)`?\s*$/gim;
  let m;
  while ((m = re.exec(md))) {
    const name = m[1].replace(/\*\*/g, '').trim();
    const body = md.slice(m.index, md.indexOf('\n### ', m.index + 1) === -1 ? undefined : md.indexOf('\n### ', m.index + 1));
    const field = (label) => {
      const f = body.match(new RegExp(`\\*\\*${label}:?\\*\\*\\s*([^\\n]+)`, 'i'));
      return f ? f[1].replace(/\s+$/, '') : null;
    };
    const scores = {};
    const sc = field('Scores /5') || field('Scores');
    if (sc) for (const s of sc.matchAll(/([a-z0-9]+)\s+(\d)/gi)) scores[s[1].toLowerCase()] = Number(s[2]);

    const ev = field('Evidence') || '';
    const num = (re2) => { const x = ev.match(re2); return x ? Number(x[1].replace(/,/g, '')) : null; };

    entries.push({
      name,
      tier: m[2],
      category: slug,
      verdict: (field('Verdict') || '').slice(0, 400) || null,
      use_when: field('Use when') ? field('Use when').split(/·\s*\*\*Don't use when/)[0].trim() : null,
      vibecode_risk: (field('Vibecode risk') || '').split('—')[0].trim().toLowerCase() || null,
      link: (field('Link') || '').replace(/[<>]/g, '').trim() || null,
      scores: Object.keys(scores).length ? scores : null,
      evidence: {
        stars: num(/★\s*([\d,]+)/),
        weekly_npm: num(/([\d,]+)\s*wk npm/i),
        license: (ev.match(/\b(MIT|Apache-2\.0|BSD-[\w.-]+|ISC|MPL-2\.0|GPL-[\w.-]+|AGPL-[\w.-]+|LGPL-[\w.-]+|Proprietary|Commercial|CC0-1\.0|OFL-1\.1|Unlicense)\b/i) || [])[1] || null,
        last_release: (ev.match(/last release[^·\n]*?(\d{4}-\d{2}-\d{2})/i) || [])[1] || null,
        last_push: (ev.match(/last push\s*(\d{4}-\d{2}-\d{2})/i) || [])[1] || null,
        raw: ev.slice(0, 300) || null,
      },
    });
  }
  return { slug, title, evaluated, file: `libraries/${file}`, entries };
}

const files = existsSync(LIB) ? readdirSync(LIB).filter((f) => f.endsWith('.md') && f !== 'README.md').sort() : [];
if (!files.length) { console.error(`no category files in ${LIB}`); process.exit(1); }

const categories = files.map(parseCategory);
const all = categories.flatMap((c) => c.entries);

const index = {
  generated_from: 'libraries/*.md (markdown is the source of truth)',
  categories: categories.length,
  entries: all.length,
  by_tier: Object.fromEntries(TIERS.map((t) => [t, all.filter((e) => e.tier === t).length])),
  catalog: categories.map(({ slug, title, evaluated, file, entries }) => ({
    slug, title, evaluated, file, count: entries.length,
  })),
  library: all.sort((a, b) => TIERS.indexOf(a.tier) - TIERS.indexOf(b.tier) || a.name.localeCompare(b.name)),
};
const json = JSON.stringify(index, null, 2) + '\n';

if (process.argv.includes('--stale')) {
  const months = Number(process.argv[process.argv.indexOf('--stale') + 1] || 6);
  const now = new Date();
  const cutoff = new Date(now.getFullYear(), now.getMonth() - months, 1);
  const stale = categories.filter((c) => !c.evaluated || new Date(c.evaluated + '-01') < cutoff);
  console.log(stale.length ? `Stale (>${months}mo):\n` + stale.map((c) => `  ${c.evaluated || '  ????  '}  ${c.slug}`).join('\n') : `Nothing older than ${months} months.`);
  process.exit(0);
}

if (process.argv.includes('--check')) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (current === json) { console.log('data/index.json is current.'); process.exit(0); }
  console.error('data/index.json is out of date — run: node tools/index.mjs');
  process.exit(1);
}

mkdirSync(join(ROOT, 'data'), { recursive: true });
writeFileSync(OUT, json);
console.log(`data/index.json — ${all.length} entries across ${categories.length} categories`);
for (const t of TIERS) console.log(`  ${String(index.by_tier[t]).padStart(4)}  ${t}`);
const missing = all.filter((e) => !e.link).length;
if (missing) console.log(`\n  note: ${missing} entr${missing === 1 ? 'y has' : 'ies have'} no Link field`);
