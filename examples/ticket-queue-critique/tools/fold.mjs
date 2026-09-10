// node fold.mjs <url> [rowSelector]
// The single most useful number in the critique protocol: where the content starts,
// how many rows are actually visible, and whether anything overflows — at three widths.
import { execSync } from 'node:child_process'; import { createRequire } from 'node:module';
const { chromium } = createRequire(execSync('npm root -g').toString().trim()+'/')('playwright');
const [url, rowSel = '[data-row], tbody tr, .row'] = process.argv.slice(2);
const b = await chromium.launch();
for (const [w,h] of [[1440,900],[390,844],[320,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h}, isMobile:w<600, hasTouch:w<600 });
  await p.goto(url, { waitUntil:'domcontentloaded' }); await p.waitForTimeout(1500);
  const r = await p.evaluate(([h, sel]) => {
    const rows = [...document.querySelectorAll(sel)].map(r => r.getBoundingClientRect());
    const doc = document.documentElement;
    return {
      firstRowTop: rows.length ? Math.round(rows[0].top) : null,
      rowsFullyVisible: rows.filter(r => r.top >= 0 && r.bottom <= h).length,
      totalRows: rows.length,
      rowHeights: [...new Set(rows.slice(0,8).map(r => Math.round(r.height)))],
      pageHeight: doc.scrollHeight,
      hOverflow: Math.max(0, doc.scrollWidth - doc.clientWidth),
      // any element whose content is wider than its clipping box — silent clipping
      clipped: [...document.querySelectorAll('*')]
        .filter(e => { const s = getComputedStyle(e);
          return /auto|scroll|hidden/.test(s.overflowX) && e.scrollWidth - e.clientWidth > 24; })
        // drop visually-hidden text (.vh/.sr-only): a 1px box with overflow:hidden looks
        // identical to a silently clipped column and is 100% of the noise in this check
        .filter(e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e);
          return r.width > 24 && r.height > 8 && s.visibility !== 'hidden'
              && s.clip === 'auto' && !/inset\(50%\)/.test(s.clipPath); })
        .slice(0,4).map(e => `${e.tagName.toLowerCase()}.${(e.className||'').toString().split(' ')[0]} +${e.scrollWidth-e.clientWidth}px`),
    };
  }, [h, rowSel]);
  console.log(`${w}×${h}`, JSON.stringify(r));
  await p.close();
}
await b.close();
