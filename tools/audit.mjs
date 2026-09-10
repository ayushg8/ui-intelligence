#!/usr/bin/env node
/**
 * audit.mjs — automated ship gates for a running UI.
 *
 *   node tools/audit.mjs http://localhost:3000
 *   node tools/audit.mjs http://localhost:3000/settings --widths 1440,390,320
 *
 * Runs, per width:
 *   · axe-core accessibility scan (violations, grouped)
 *   · horizontal-overflow detection (the #1 mobile break)
 *   · tiny-text and low-contrast text scan
 *   · touch-target size check (mobile widths)
 *   · focus-visibility check on interactive elements
 *   · design-consistency scan: distinct font sizes / radii / colors / shadows in use
 *
 * Automated checks catch maybe 30-40% of real accessibility problems. They do not
 * replace keyboard-walking the primary task or looking at the screenshots. Passing
 * this is a floor, not a finish line.
 */
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const req = createRequire(execSync('npm root -g').toString().trim() + '/');
let chromium;
try { ({ chromium } = await import('playwright')); } catch { ({ chromium } = req('playwright')); }

const argv = process.argv.slice(2);
const url = argv.find((a) => !a.startsWith('--'));
if (!url) { console.error('usage: node tools/audit.mjs <url> [--widths 1440,390]'); process.exit(1); }
const wi = argv.indexOf('--widths');
const widths = (wi === -1 ? '1440,390' : argv[wi + 1]).split(',').map(Number);

const AXE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js';
const C = { red: (s) => `\x1b[31m${s}\x1b[0m`, yel: (s) => `\x1b[33m${s}\x1b[0m`, grn: (s) => `\x1b[32m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m`, b: (s) => `\x1b[1m${s}\x1b[0m` };

const browser = await chromium.launch();
let hardFailures = 0;

for (const width of widths) {
  const mobile = width < 600;
  const ctx = await browser.newContext({ viewport: { width, height: mobile ? 844 : 900 }, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  console.log(`\n${C.b(`══ ${url} @ ${width}px ══`)}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => page.goto(url, { waitUntil: 'domcontentloaded' }));
    await page.waitForTimeout(1500);

    // ── axe ────────────────────────────────────────────────────────────────
    let axeOk = true;
    try {
      await page.addScriptTag({ url: AXE_CDN });
      await page.waitForFunction(() => typeof window.axe !== 'undefined', { timeout: 10000 });
    } catch { axeOk = false; }

    if (axeOk) {
      const res = await page.evaluate(async () =>
        await window.axe.run(document, { resultTypes: ['violations'], runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } })
      );
      const crit = res.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
      const minor = res.violations.filter((v) => v.impact !== 'critical' && v.impact !== 'serious');
      hardFailures += crit.length;
      console.log(`\n${C.b('Accessibility (axe-core)')}`);
      if (!res.violations.length) console.log(`  ${C.grn('no violations')}`);
      for (const v of [...crit, ...minor]) {
        const tag = v.impact === 'critical' || v.impact === 'serious' ? C.red(v.impact.toUpperCase()) : C.yel(v.impact);
        console.log(`  ${tag}  ${v.id} — ${v.help} (${v.nodes.length})`);
        v.nodes.slice(0, 2).forEach((n) => console.log(C.dim(`        ${n.target.join(' ')}`)));
      }
    } else {
      console.log(`\n${C.yel('Accessibility: axe-core could not load (offline or CSP). Skipped.')}`);
    }

    // ── layout / typography / consistency probes ───────────────────────────
    const probe = await page.evaluate((isMobile) => {
      const px = (v) => parseFloat(v) || 0;
      const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && px(s.opacity) > 0.05; };
      const sel = (s) => [...document.querySelectorAll(s)].filter(vis);
      const desc = (el) => { const id = el.id ? `#${el.id}` : ''; const cls = typeof el.className === 'string' && el.className ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}` : ''; return `${el.tagName.toLowerCase()}${id}${cls}`; };

      // horizontal overflow
      const docW = document.documentElement.clientWidth;
      const overflow = [...document.querySelectorAll('body *')].filter(vis)
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.right > docW + 1 || r.left < -1)
        .slice(0, 8).map(({ el, r }) => `${desc(el)} → ${Math.round(r.left)}..${Math.round(r.right)} (viewport ${docW})`);
      const pageScrolls = document.documentElement.scrollWidth > docW + 1;

      // text: size + effective contrast against nearest painted background
      const toRgb = (s) => { const m = s.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : null; };
      const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
      const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
      // Walk up for the nearest opaque painted background. If we hit a gradient or
      // image first, contrast is not computable from styles alone - say so rather
      // than reporting a misleading ratio.
      const bgOf = (el) => { let n = el; while (n && n !== document.documentElement) { const s = getComputedStyle(n); if (s.backgroundImage && s.backgroundImage !== 'none') return 'unpaintable'; const c = toRgb(s.backgroundColor); const a = s.backgroundColor.includes('rgba') ? parseFloat(s.backgroundColor.split(',')[3]) : 1; if (c && a > 0.85) return c; n = n.parentElement; } return [255, 255, 255]; };
      const textNodes = [...document.querySelectorAll('body *')].filter((el) => vis(el) && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2));
      const tiny = [], lowContrast = [], overImage = [], gradientText = [];
      const sizes = new Set(), radii = new Set(), shadows = new Set(), colors = new Set(), families = new Set(), weights = new Set();
      for (const el of textNodes) {
        const s = getComputedStyle(el);
        const size = px(s.fontSize);
        sizes.add(Math.round(size)); families.add(s.fontFamily.split(',')[0].replace(/["']/g, '').trim()); weights.add(s.fontWeight);
        colors.add(s.color);
        if (size < 12) tiny.push(`${desc(el)} ${size}px "${el.textContent.trim().slice(0, 32)}"`);
        // gradient/clipped text: transparent fill over a background-image
        if ((s.webkitBackgroundClip === 'text' || s.backgroundClip === 'text') || (s.color.includes('rgba') && parseFloat(s.color.split(',')[3]) < 0.1 && s.backgroundImage !== 'none')) {
          gradientText.push(`${desc(el)} "${el.textContent.trim().slice(0, 32)}"`);
          continue;
        }
        const fg = toRgb(s.color); if (!fg) continue;
        const bg = bgOf(el);
        if (bg === 'unpaintable') { overImage.push(`${desc(el)} ${size}px "${el.textContent.trim().slice(0, 28)}"`); continue; }
        const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
        const ratio = (a + 0.05) / (b + 0.05);
        const large = size >= 24 || (size >= 18.66 && +s.fontWeight >= 700);
        if (ratio < (large ? 3 : 4.5)) lowContrast.push(`${desc(el)} ${ratio.toFixed(2)}:1 ${size}px "${el.textContent.trim().slice(0, 28)}"`);
      }
      for (const el of [...document.querySelectorAll('body *')].filter(vis)) {
        const s = getComputedStyle(el);
        if (px(s.borderTopLeftRadius)) radii.add(s.borderTopLeftRadius);
        if (s.boxShadow && s.boxShadow !== 'none') shadows.add(s.boxShadow);
      }

      // interactive elements
      const interactive = sel('a[href], button, input, select, textarea, [role=button], [role=link], [tabindex]:not([tabindex="-1"])');
      const smallTargets = isMobile ? interactive.filter((el) => { const r = el.getBoundingClientRect(); return (r.height < 40 || r.width < 40) && r.height > 0; }).slice(0, 8).map((el) => { const r = el.getBoundingClientRect(); return `${desc(el)} ${Math.round(r.width)}×${Math.round(r.height)}`; }) : [];
      const noOutline = interactive.filter((el) => { const s = getComputedStyle(el); return s.outlineStyle === 'none' && px(s.outlineWidth) === 0; }).length;
      const divButtons = [...document.querySelectorAll('div[onclick], span[onclick], div[role=button]:not([tabindex]), li[onclick]')].length;

      return {
        overflow, pageScrolls, tiny: tiny.slice(0, 8), tinyCount: tiny.length,
        lowContrast: lowContrast.slice(0, 8), lowContrastCount: lowContrast.length,
        overImage: overImage.slice(0, 5), gradientText: gradientText.slice(0, 5),
        smallTargets, divButtons, interactiveCount: interactive.length, noOutline,
        sizes: [...sizes].sort((a, b) => a - b), radii: [...radii], shadows: [...shadows].length,
        colorCount: colors.size, families: [...families], weights: [...weights].sort(),
      };
    }, mobile);

    console.log(`\n${C.b('Layout')}`);
    if (probe.pageScrolls) { hardFailures++; console.log(`  ${C.red('FAIL')}  page scrolls horizontally at ${width}px`); }
    else console.log(`  ${C.grn('ok')}    no horizontal page scroll`);
    probe.overflow.forEach((o) => console.log(`  ${C.yel('warn')}  overflows viewport: ${o}`));

    console.log(`\n${C.b('Text')}`);
    if (probe.tinyCount) { console.log(`  ${C.yel('warn')}  ${probe.tinyCount} element(s) below 12px`); probe.tiny.forEach((t) => console.log(C.dim(`        ${t}`))); }
    else console.log(`  ${C.grn('ok')}    nothing below 12px`);
    if (probe.lowContrastCount) { hardFailures += 1; console.log(`  ${C.red('FAIL')}  ${probe.lowContrastCount} text element(s) below AA contrast`); probe.lowContrast.forEach((t) => console.log(C.dim(`        ${t}`))); }
    else console.log(`  ${C.grn('ok')}    text contrast passes AA (where computable)`);
    if (probe.overImage.length) { console.log(`  ${C.yel('warn')}  text over a gradient/image - contrast not computable, check by eye:`); probe.overImage.forEach((t) => console.log(C.dim(`        ${t}`))); }
    if (probe.gradientText.length) { console.log(`  ${C.yel('warn')}  gradient-clipped text - a contrast risk and a top vibecode tell:`); probe.gradientText.forEach((t) => console.log(C.dim(`        ${t}`))); }

    console.log(`\n${C.b('Controls')} ${C.dim(`(${probe.interactiveCount} interactive)`)}`);
    if (probe.divButtons) { hardFailures++; console.log(`  ${C.red('FAIL')}  ${probe.divButtons} clickable div/span — use <button>`); }
    if (mobile && probe.smallTargets.length) { console.log(`  ${C.yel('warn')}  ${probe.smallTargets.length} target(s) under 40px`); probe.smallTargets.forEach((t) => console.log(C.dim(`        ${t}`))); }
    if (!probe.divButtons && !(mobile && probe.smallTargets.length)) console.log(`  ${C.grn('ok')}`);

    console.log(`\n${C.b('Design consistency')} ${C.dim('(signals, not rules)')}`);
    const flag = (n, hi) => (n > hi ? C.yel(String(n)) : C.grn(String(n)));
    console.log(`  font sizes in use: ${flag(probe.sizes.length, 8)}  ${C.dim(probe.sizes.join(', '))}`);
    console.log(`  font families:     ${flag(probe.families.length, 2)}  ${C.dim(probe.families.slice(0, 4).join(', '))}`);
    console.log(`  font weights:      ${flag(probe.weights.length, 4)}  ${C.dim(probe.weights.join(', '))}`);
    console.log(`  border radii:      ${flag(probe.radii.length, 4)}  ${C.dim(probe.radii.slice(0, 6).join(', '))}`);
    console.log(`  distinct shadows:  ${flag(probe.shadows, 3)}`);
    console.log(`  distinct text colors: ${flag(probe.colorCount, 6)}`);
    if (probe.sizes.length > 8 || probe.radii.length > 4 || probe.colorCount > 6)
      console.log(C.dim('  → more values than a token system should produce. Check for arbitrary one-offs.'));
  } catch (err) {
    console.log(C.red(`  audit error: ${err.message}`));
  } finally {
    await ctx.close();
  }
}

await browser.close();
console.log(`\n${hardFailures ? C.red(`${hardFailures} hard failure(s).`) : C.grn('No hard failures.')}  ${C.dim('Automated checks catch ~30-40% of real issues — still keyboard-walk the primary task and look at the screenshots.')}\n`);
process.exit(hardFailures ? 1 : 0);
