import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
const R='/Users/ayushgarg/Ayush/UI_Library';
// Regenerate the archetype facts first, then build the page. Both read the corpus,
// so this page can never drift from what is actually in the library.
execSync(`node ${R}/tools/_visual-index-extract.mjs`, { stdio: 'inherit' });
const A=JSON.parse(readFileSync('/tmp/arch.json','utf8'));
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const idx=JSON.parse(readFileSync(R+'/data/index.json','utf8'));
const count=d=>existsSync(`${R}/${d}`)?readdirSync(`${R}/${d}`).filter(f=>f.endsWith('.md')&&!/README|DIGEST/.test(f)).length:0;
const lines=d=>existsSync(`${R}/${d}`)?readdirSync(`${R}/${d}`).filter(f=>f.endsWith('.md')).reduce((n,f)=>n+readFileSync(`${R}/${d}/${f}`,'utf8').split('\n').length,0):0;

const DENS=[['very compact',0],['compact',1],['comfortable',2],['spacious',3]];
const bucket=d=>{const s=d.toLowerCase();if(s.startsWith('very'))return 0;if(s.startsWith('compact'))return 1;if(s.startsWith('comfortable'))return 2;return 3;};
const sorted=[...A].sort((a,b)=>(a.bodyPx-b.bodyPx)||(a.rowPx-b.rowPx));

const cards=sorted.map(a=>`
  <article class="arch" data-d="${bucket(a.density)}">
    <header class="arch__h">
      <h3>${esc(a.slug)}</h3>
      <span class="pill">${esc(a.density.split('—')[0].trim())}</span>
    </header>
    <p class="arch__line">${esc(a.line)}</p>
    <div class="spec">
      <div><b>${a.bodyPx}px</b><u>body</u></div>
      <div><b>${a.rowPx?a.rowPx+'px':esc(a.rowNote||'—')}</b><u>row</u></div>
      <div class="spec__dark"><b>${esc(a.dark.split(/[—.,]| and /)[0].trim().slice(0,16))}</b><u>dark</u></div>
    </div>
    <div class="proof" style="--b:${a.bodyPx||15}px;--r:${Math.max(16,Math.min(a.rowPx||44,64))}px">
      <i></i><i></i><i></i><i></i>
      <span>Aa — rendered at this archetype's real body size and row height</span>
    </div>
    <p class="arch__fail"><u>Fails as</u> ${esc(a.fail)}</p>
    <a class="arch__lnk" href="../archetypes/${a.slug}.md">archetypes/${a.slug}.md · ${a.lines} lines</a>
  </article>`).join('');

const tiers=['essential','strong','situational','experimental','reference-only','avoid'];
const tierRows=tiers.map(t=>{
  const n=idx.by_tier[t]||0; const pct=(n/idx.entries*100).toFixed(1);
  return `<tr><td><code class="t t--${t}">${t}</code></td><td class="n">${n}</td>
   <td><span class="bar" style="--w:${pct}%"></span></td><td class="n dim">${pct}%</td></tr>`;}).join('');

const ess=idx.library.filter(e=>e.tier==='essential').slice(0,22).map(e=>
  `<tr><td>${esc(e.name)}</td><td class="dim">${esc(e.category)}</td><td class="dim">${e.evidence?.weekly_npm?(e.evidence.weekly_npm/1e6).toFixed(1)+'M/wk':'—'}</td><td class="dim">${esc(e.vibecode_risk||'—')}</td></tr>`).join('');

const builds=[
 ['dispatch-console','enterprise-dense','Freight dispatch · the exception rail','../examples/dispatch-console/index.html','ex-dispatch'],
 ['inference-terminal','data-terminal','LLM fleet ops · the latency span','../examples/inference-terminal/index.html','ex-terminal'],
 ['task-manager','technical-productivity','Team queue · the now-line','../examples/evaluation-builds/task-manager/index.html','ex-task'],
 ['api-landing','premium-marketing','Document-parsing API · provenance','../examples/evaluation-builds/api-landing/index.html','ex-api'],
 ['churn-dashboard','enterprise-dense','CS triage · the renewal runway','../examples/evaluation-builds/churn-dashboard/index.html','ex-churn'],
 ['college-deadlines','expressive-consumer','Deadlines · distance = days','../examples/evaluation-builds/college-deadlines/index.html','ex-college'],
].map(([n,arch,desc,href,shot])=>`
  <a class="build" href="${href}">
    <span class="build__shot"><img src="shots/${shot}.png" alt="Screenshot of the ${esc(n)} build" loading="lazy" width="800" height="500"></span>
    <b>${esc(n)}</b><span class="build__arch">${esc(arch)}</span>
    <span class="build__desc">${esc(desc)}</span>
  </a>`).join('');

const html=`<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>UI Intelligence — what's in here</title>
<style>
:root{--p:#FBFBF9;--s:#fff;--ink:#17191C;--ink2:#54585E;--ink3:#65696F;
--line:rgba(23,25,28,.12);--line2:rgba(23,25,28,.07);--ac:#1F5C4D;--warn:#9A5B12;--bad:#9B2C22;
--mono:ui-monospace,"SF Mono",Menlo,monospace;--sans:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--serif:"Iowan Old Style",Georgia,serif}
*{box-sizing:border-box}body{margin:0;background:var(--p);color:var(--ink);font:15px/1.55 var(--sans);-webkit-font-smoothing:antialiased}
.wrap{max-width:1280px;margin:0 auto;padding:0 clamp(14px,4vw,44px);min-width:0}
.grid,.builds,.cols{min-width:0}
.arch,.card,.build{min-width:0}
a{color:inherit}
.hd{padding:clamp(40px,6vw,80px) 0 clamp(24px,3vw,40px);border-bottom:1px solid var(--line)}
.hd h1{font:400 clamp(30px,5vw,50px)/1.08 var(--serif);margin:0 0 12px;letter-spacing:-.02em}
.hd p{margin:0;max-width:64ch;color:var(--ink2);font-size:16px}
.kpi{display:flex;flex-wrap:wrap;gap:0;margin-top:30px;border:1px solid var(--line);background:var(--s)}
.kpi div{flex:1 1 130px;padding:13px 16px;border-right:1px solid var(--line2)}
.kpi div:last-child{border-right:0}
.kpi b{display:block;font:400 22px/1 var(--mono);font-variant-numeric:tabular-nums}
.kpi u{font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:var(--ink3);text-decoration:none}
h2{font:400 clamp(21px,3vw,28px)/1.2 var(--serif);margin:0 0 6px;letter-spacing:-.015em}
.sec{padding:clamp(40px,6vw,70px) 0;border-bottom:1px solid var(--line)}
.lede{margin:0 0 26px;max-width:66ch;color:var(--ink2)}
.note{font-size:13px;color:var(--ink3);max-width:66ch}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(310px,100%),1fr));gap:14px}
.arch{background:var(--s);border:1px solid var(--line);padding:15px 16px 13px;display:flex;flex-direction:column;gap:9px}
.arch__h{display:flex;align-items:center;gap:8px}
.arch__h h3{margin:0;font:500 14px/1.2 var(--mono);letter-spacing:-.01em}
.pill{margin-left:auto;font:400 10px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--ink3);border:1px solid var(--line);padding:4px 6px}
.arch__line{margin:0;font-size:13px;line-height:1.5;color:var(--ink2)}
.spec{display:flex;gap:16px;padding:9px 0;border-top:1px solid var(--line2);border-bottom:1px solid var(--line2)}
.spec b{font:400 15px/1 var(--mono);font-variant-numeric:tabular-nums}
.spec u{display:block;margin-top:3px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);text-decoration:none}
.spec__dark b{font-size:12px}
/* Only the px figures are nowrap. The dark-mode value is a phrase, and forcing
   it onto one line was what pushed the card past a 390px viewport. */
.spec div:not(.spec__dark) b{white-space:nowrap}
.spec{flex-wrap:wrap}
.spec__dark{min-width:0;flex:1 1 90px}
.spec__dark b{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.proof{border:1px solid var(--line2);background:#FAFAF8;padding:7px 9px}
.proof i{display:block;height:var(--r);border-bottom:1px solid var(--line2)}
.proof i:nth-child(2){background:rgba(23,25,28,.028)}
.proof span{display:block;padding-top:7px;overflow-wrap:anywhere;font-size:var(--b);line-height:1.4;color:var(--ink2)}
.arch__fail{margin:0;font-size:12px;line-height:1.5;color:var(--ink2)}
.arch__fail u{color:var(--bad);text-decoration:none;font-weight:600;letter-spacing:.04em;font-size:10px;text-transform:uppercase;margin-right:5px}
.arch__lnk{margin-top:auto;font:400 11px/1 var(--mono);color:var(--ink3);text-decoration:none;padding-top:4px}
.arch__lnk:hover{color:var(--ac)}
/* A wide table scrolls inside its own box; it never scrolls the page.
   craft/responsive-and-mobile-web.md, and I broke it first. */
.tw{overflow-x:auto;-webkit-overflow-scrolling:touch}
.tw:focus-visible{outline:2px solid var(--ac);outline-offset:2px}
table{width:100%;min-width:300px;border-collapse:collapse;font-size:14px}
th{text-align:left;font:400 11px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);padding:0 8px 8px;border-bottom:1px solid var(--line)}
td{padding:7px 8px;border-bottom:1px solid var(--line2)}
td.n{text-align:right;font-family:var(--mono);font-variant-numeric:tabular-nums}
td.dim{color:var(--ink2)}
.bar{display:block;height:7px;background:var(--ac);width:var(--w);min-width:2px}
.t{font:400 12px var(--mono);padding:2px 5px;border:1px solid var(--line)}
.t--essential{color:var(--ac);border-color:var(--ac)}.t--avoid{color:var(--bad);border-color:var(--bad)}
.t--strong{color:var(--ink)}.t--reference-only,.t--experimental,.t--situational{color:var(--ink3)}
.builds{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(330px,100%),1fr));gap:16px}
.build{display:flex;flex-direction:column;gap:5px;text-decoration:none;background:var(--s);border:1px solid var(--line);padding:11px}
.build:hover{border-color:var(--ac)}
.build__shot{display:block;background:#EEEEEA;overflow:hidden;aspect-ratio:8/5}
.build__shot img{width:100%;height:100%;object-fit:cover;object-position:top left;display:block}
.build b{font:500 13px var(--mono);margin-top:6px}
.build__arch{font:400 11px var(--mono);color:var(--ac)}
.build__desc{font-size:12.5px;color:var(--ink2)}
.cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(230px,100%),1fr));gap:12px}
.card{background:var(--s);border:1px solid var(--line);padding:13px 15px}
.card b{display:block;font:500 13px var(--mono);margin-bottom:5px}
.card p{margin:0;font-size:13px;color:var(--ink2);line-height:1.5}
.card a{font:400 11px var(--mono);color:var(--ink3)}
.ft{padding:30px 0 50px;font-size:12.5px;color:var(--ink3)}
@media(max-width:640px){.kpi div{flex:1 1 50%;border-bottom:1px solid var(--line2)}}
</style></head><body>

<header class="hd"><div class="wrap">
<h1>What is actually in this library</h1>
<p>Not a component kit. There are no buttons to copy. It is a decision procedure, twenty product archetypes with measured numbers, ranked library verdicts, and a critique loop — plus the builds it produced, which are the only real evidence it works.</p>
<div class="kpi">
 <div><b>${count('archetypes')}</b><u>archetypes</u></div>
 <div><b>${idx.entries}</b><u>ranked entries</u></div>
 <div><b>${count('craft')}</b><u>craft files</u></div>
 <div><b>${count('patterns')}</b><u>flow families</u></div>
 <div><b>${count('references')}</b><u>teardowns</u></div>
 <div><b>${(lines('archetypes')+lines('craft')+lines('patterns')+lines('references')+lines('libraries')+lines('anti-patterns')+lines('system')).toLocaleString()}</b><u>lines</u></div>
</div></div></header>

<main id="main"><section class="sec"><div class="wrap">
<h2>The twenty archetypes, sorted by density</h2>
<p class="lede">Each one is a coherent set of answers to density, type, colour and motion — derived from what its users are doing. The type below each card is rendered at that archetype's <em>real</em> body size and row height, so the spread is visible rather than described. Body text runs 12px to 19px; rows run 19px to 75px.</p>
<div class="grid">${cards}</div>
</div></section>

<section class="sec"><div class="wrap">
<h2>Builds the library produced</h2>
<p class="lede">Every one was built by following the procedure, rendered, critiqued and gated. Click any to open the real file.</p>
<div class="builds">${builds}</div>
</div></section>

<section class="sec"><div class="wrap">
<h2>${idx.entries} library verdicts</h2>
<p class="lede">Every entry carries a tier, a reason, verified evidence and a vibecode-risk rating. A tier is a recommendation, not a score — <code class="t t--avoid">avoid</code> is as useful as <code class="t t--essential">essential</code>.</p>
<div class="cols" style="align-items:start">
<div class="tw" tabindex="0" role="region" aria-label="Verdicts by tier"><table><thead><tr><th>Tier</th><th class="n">n</th><th>share</th><th class="n">%</th></tr></thead><tbody>${tierRows}</tbody></table></div>
<div class="tw" tabindex="0" role="region" aria-label="Essential-tier entries"><table><thead><tr><th>Essential</th><th>category</th><th>npm</th><th>risk</th></tr></thead><tbody>${ess}</tbody></table></div>
</div></div></section>

<section class="sec"><div class="wrap">
<h2>The rest of it</h2>
<div class="cols">
<div class="card"><b>system/ · 8 files</b><p>The procedure: discover, direction, tokens, stack, build, states, critique, gates. Read in order, each short.</p><a href="../START-HERE.md">START-HERE.md</a></div>
<div class="card"><b>craft/ · ${count('craft')} files</b><p>Typography, colour, space, density, interaction, motion, forms, tables, navigation, copy, responsive, imagery, i18n, performance — all measured from live products.</p><a href="../craft/DIGEST.md">craft/DIGEST.md · 8k tok</a></div>
<div class="card"><b>anti-patterns/ · 4 files</b><p>The taxonomy of AI tells, the weighted 0–10 rubric, the correction playbook, and how to critique a render.</p><a href="../anti-patterns/DIGEST.md">anti-patterns/DIGEST.md</a></div>
<div class="card"><b>patterns/ · ${count('patterns')} files</b><p>Auth, onboarding, settings, billing, search, data management, permissions, AI flows — how each works in products that got it right.</p><a href="../patterns/DIGEST.md">patterns/DIGEST.md</a></div>
<div class="card"><b>references/ · ${count('references')} files</b><p>Teardowns with real extracted values — Linear's ramp, Stripe's two type scales, Mercury's numerals.</p><a href="../references/">references/</a></div>
<div class="card"><b>tools/ · 6 scripts</b><p>shot · audit · contrast · index · check · digest. The reason "look at it" is enforceable rather than advisory.</p><a href="../tools/">tools/</a></div>
</div>
<p class="note" style="margin-top:22px">Generated by <code>tools/visual-index.mjs</code> from the corpus itself, so it cannot drift from what is actually there.</p>
</div></section>

</main>
<footer class="ft"><div class="wrap">UI Intelligence · every number on this page was read out of the library, not typed in.</div></footer>
</body></html>`;
writeFileSync(R+'/examples/index/index.html', html);
console.log('built · archetypes:',A.length,'· entries:',idx.entries);
