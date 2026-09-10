#!/usr/bin/env node
/**
 * contrast.mjs — WCAG 2.x contrast for modern CSS colors, including oklch().
 *
 *   node tools/contrast.mjs "oklch(0.47 0.008 90)" "#fcfcfc"
 *   node tools/contrast.mjs "#6b7280" white --size 13 --weight 400
 *   node tools/contrast.mjs --pairs app/globals.css
 *
 * --pairs parses CSS custom properties out of a stylesheet, resolves var()
 * chains, and checks every text-ish token against every surface-ish token,
 * reporting which combinations you are actually allowed to use.
 *
 * Alpha is composited over the background before measuring, which is what you
 * want for overlay-style hover/border tokens.
 */
import { readFileSync, existsSync } from 'node:fs';

// ── color parsing ──────────────────────────────────────────────────────────
const NAMED = { white: '#ffffff', black: '#000000', transparent: 'rgba(0,0,0,0)' };

function srgbToLinear(c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function linearToSrgb(c) { return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; }
const clamp01 = (x) => Math.min(1, Math.max(0, x));

function oklchToRgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    clamp01(linearToSrgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    clamp01(linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    clamp01(linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
  ];
}

/** → {r,g,b,a} with channels 0..1, or null if unparseable. */
export function parseColor(input) {
  if (!input) return null;
  let s = String(input).trim().toLowerCase();
  if (NAMED[s]) s = NAMED[s];

  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255;
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) : 1 };
  }

  // oklch(L C H [/ A]) — L may be a percentage
  m = s.match(/^oklch\(\s*([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+%?)\s*)?\)$/);
  if (m) {
    const num = (v, scale = 1) => (v.endsWith('%') ? parseFloat(v) / 100 * scale : parseFloat(v));
    const L = num(m[1]), C = num(m[2], 0.4), H = parseFloat(m[3]);
    const [r, g, b] = oklchToRgb(L, C, H);
    return { r, g, b, a: m[4] == null ? 1 : num(m[4]) };
  }

  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[/,]\s*([\d.]+%?)\s*)?\)$/);
  if (m) {
    const a = m[4] == null ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { r: +m[1] / 255, g: +m[2] / 255, b: +m[3] / 255, a };
  }

  m = s.match(/^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%\s*(?:[/,]\s*([\d.]+%?)\s*)?\)$/);
  if (m) {
    const H = +m[1] / 360, S = +m[2] / 100, L = +m[3] / 100;
    const f = (n) => { const k = (n + H * 12) % 12; const a2 = S * Math.min(L, 1 - L); return L - a2 * Math.max(-1, Math.min(k - 3, 9 - k, 1)); };
    const a = m[4] == null ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { r: f(0), g: f(8), b: f(4), a };
  }
  return null;
}

const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
const luminance = (c) => 0.2126 * srgbToLinear(c.r) + 0.7152 * srgbToLinear(c.g) + 0.0722 * srgbToLinear(c.b);

export function contrast(fgIn, bgIn) {
  const bg = parseColor(bgIn), fgRaw = parseColor(fgIn);
  if (!bg || !fgRaw) return null;
  const fg = fgRaw.a < 1 ? over(fgRaw, bg) : fgRaw;
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

/** WCAG 2.2 thresholds. Large = >=24px, or >=18.66px at weight >=700. */
export function verdict(ratio, { size = 14, weight = 400 } = {}) {
  const large = size >= 24 || (size >= 18.66 && weight >= 700);
  const aa = large ? 3 : 4.5, aaa = large ? 4.5 : 7;
  return { large, aa, aaa, passAA: ratio >= aa, passAAA: ratio >= aaa, passUI: ratio >= 3 };
}

// ── CSS token extraction ───────────────────────────────────────────────────
function extractTokens(css) {
  const raw = new Map();
  for (const m of css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;{}]+);/gi)) raw.set(m[1], m[2].trim());
  const resolve = (v, depth = 0) => {
    if (depth > 12) return v;
    const m = v.match(/var\(\s*(--[a-z0-9-]+)\s*(?:,\s*([^)]+))?\)/i);
    if (!m) return v;
    const target = raw.has(m[1]) ? raw.get(m[1]) : m[2] || v;
    return resolve(v.replace(m[0], target.trim()), depth + 1);
  };
  const out = new Map();
  for (const [k, v] of raw) { const r = resolve(v); if (parseColor(r)) out.set(k, r); }
  return out;
}

// ── CLI ────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1]; };
const fmt = (r) => r.toFixed(2).padStart(6);
const mark = (ok) => (ok ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m');

if (argv.includes('--pairs')) {
  const file = argv[argv.indexOf('--pairs') + 1] && !argv[argv.indexOf('--pairs') + 1].startsWith('--')
    ? argv[argv.indexOf('--pairs') + 1]
    : ['app/globals.css', 'src/app/globals.css', 'styles/globals.css', 'app.css', 'src/index.css', 'src/styles.css'].find(existsSync);
  if (!file || !existsSync(file)) {
    console.error('usage: node tools/contrast.mjs --pairs <stylesheet.css>');
    process.exit(1);
  }
  const tokens = extractTokens(readFileSync(file, 'utf8'));
  const isText = (k) => /(^--text$|--text-|--color-text|--fg|--foreground)/.test(k) && !/disabled|placeholder/.test(k);
  const isSurface = (k) => /(--bg|--background|--surface|--page|--card|--panel|--color-n-(0|25|50|100|950|1000))/.test(k) && !/hover|selected/.test(k);
  const texts = [...tokens.keys()].filter(isText);
  const surfaces = [...tokens.keys()].filter(isSurface);
  if (!texts.length || !surfaces.length) {
    console.log(`Parsed ${tokens.size} color tokens from ${file} but found no text/surface pairs to check.`);
    console.log('Name your tokens --text*/--fg* and --bg*/--surface* , or pass two colors directly.');
    process.exit(0);
  }
  console.log(`\n${file} — ${texts.length} text × ${surfaces.length} surface tokens\n`);
  let failures = 0;
  for (const s of surfaces) {
    console.log(`\x1b[1m${s}\x1b[0m  ${tokens.get(s)}`);
    for (const t of texts) {
      const r = contrast(tokens.get(t), tokens.get(s));
      if (r == null) continue;
      const v = verdict(r);
      if (!v.passAA) failures++;
      console.log(`  ${fmt(r)}:1  ${mark(v.passAA)}  ${t}`);
    }
    console.log('');
  }
  console.log(failures ? `\x1b[31m${failures} pair(s) below 4.5:1 for body text.\x1b[0m  Either fix them or ensure nothing meaningful uses them.` : '\x1b[32mAll text/surface pairs pass AA for body text.\x1b[0m');
  process.exit(failures ? 1 : 0);
}

const [fg, bg] = argv.filter((a) => !a.startsWith('--') && argv[argv.indexOf(a) - 1]?.startsWith('--') !== true);
if (!fg || !bg) {
  console.error('usage: node tools/contrast.mjs <foreground> <background> [--size 14] [--weight 400]');
  console.error('       node tools/contrast.mjs --pairs [stylesheet.css]');
  process.exit(1);
}
const ratio = contrast(fg, bg);
if (ratio == null) { console.error(`could not parse: ${parseColor(fg) ? bg : fg}`); process.exit(1); }
const v = verdict(ratio, { size: parseFloat(flag('size', 14)), weight: parseFloat(flag('weight', 400)) });
console.log(`${fg}  on  ${bg}`);
console.log(`  ${ratio.toFixed(2)}:1`);
console.log(`  body text (AA ${v.aa}:1)      ${mark(v.passAA)}`);
console.log(`  enhanced  (AAA ${v.aaa}:1)    ${mark(v.passAAA)}`);
console.log(`  UI/borders (3:1)             ${mark(v.passUI)}`);
process.exit(v.passAA ? 0 : 1);
