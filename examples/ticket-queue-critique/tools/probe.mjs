import { execSync } from 'node:child_process'; import { createRequire } from 'node:module';
const req = createRequire(execSync('npm root -g').toString().trim() + '/');
const { chromium } = req('playwright');
const [url, label, wStr='1440'] = process.argv.slice(2);
const W = parseInt(wStr,10);
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:W,height:900}, deviceScaleFactor:1 });
await p.goto(url, { waitUntil:'domcontentloaded' }).catch(()=>{});
await p.waitForTimeout(3000);
const r = await p.evaluate(() => {
  const els = [...document.querySelectorAll('body *')].filter(e => {
    const b = e.getBoundingClientRect();
    return b.width > 0 && b.height > 0 && getComputedStyle(e).visibility !== 'hidden';
  });
  const bump = (m,k)=>m.set(k,(m.get(k)||0)+1);
  const fs=new Map(), fw=new Map(), gaps=new Map(), radii=new Map(), colors=new Map(), bgs=new Map(), lefts=new Map(), pads=new Map(), shadows=new Map(), trans=new Map();
  let textEls=0;
  for (const e of els) {
    const s = getComputedStyle(e), b = e.getBoundingClientRect();
    const hasText = [...e.childNodes].some(n=>n.nodeType===3 && n.textContent.trim().length>1);
    if (hasText) { textEls++; bump(fs, s.fontSize); bump(fw, s.fontWeight); bump(colors, s.color); }
    if (s.display.includes('flex')||s.display.includes('grid')) { const g=s.rowGap; if(g&&g!=='normal'&&parseFloat(g)>0) bump(gaps,g); }
    if (parseFloat(s.borderTopLeftRadius)>0) bump(radii, s.borderTopLeftRadius);
    if (s.backgroundColor!=='rgba(0, 0, 0, 0)') bump(bgs, s.backgroundColor);
    if (s.boxShadow!=='none') bump(shadows, s.boxShadow);
    if (s.transitionDuration!=='0s') bump(trans, s.transitionDuration+' / '+s.transitionTimingFunction+' / '+s.transitionProperty);
    if (b.width>40 && b.top < 2000) bump(lefts, Math.round(b.left));
    if (s.paddingTop!=='0px') bump(pads, s.paddingTop);
  }
  const top = (m,n=14)=>[...m.entries()].sort((a,b)=>b[1]-a[1]).slice(0,n).map(([k,v])=>`${k} ×${v}`);
  const rootVars = {};
  for (const sh of document.styleSheets) { try { for (const rr of sh.cssRules) {
    if (rr.selectorText===':root'||rr.selectorText==='html') for (const n of rr.style) if (n.startsWith('--')) rootVars[n]=rr.style.getPropertyValue(n).trim();
  } } catch {} }
  const focusRules = (()=>{ let fv=0,f=0; for (const sh of document.styleSheets){ try{ for(const rr of sh.cssRules){ const t=rr.selectorText||''; if(/:focus-visible/.test(t))fv++; else if(/:focus\b/.test(t))f++; } }catch{} } return {fv,f}; })();
  return {
    elements: els.length, textEls,
    fontSizes: top(fs), fontWeights: top(fw), gaps: top(gaps), radii: top(radii),
    textColors: top(colors,10), bgColors: top(bgs,10), shadows: top(shadows,5), transitions: top(trans,5),
    leftEdges: [...lefts.entries()].sort((a,b)=>a[0]-b[0]).filter(([k,v])=>v>=1).slice(0,30).map(([k,v])=>`x=${k}(${v})`),
    paddings: top(pads,10),
    rootVarCount: Object.keys(rootVars).length, focusRules,
    fontFamily: getComputedStyle(document.body).fontFamily,
  };
});
console.log('=== '+label+' @'+W+' ===');
for (const [k,v] of Object.entries(r)) console.log(k+':', Array.isArray(v)?v.join(' | '):JSON.stringify(v));
await b.close();
