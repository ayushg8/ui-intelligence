# How to critique a rendered interface

**The method for judging pixels instead of code.** An agent that reviews its own JSX and concludes
the interface is good has evaluated the wrong artifact. Hierarchy, rhythm, balance, density and
"does this look right" are perceptual facts about a rendered image. They are not visible in the
source, they are not visible in a component tree, and they are not visible in a design-token file.

**Evaluated:** 2026-09 · Every number below came out of a live render — Playwright computed styles,
element geometry, or pixel analysis of a 2×/4× screenshot. The worked example in §9 is a real build
captured at three widths in five states. Reference values were measured from GitHub's issue list,
Linear, and Stripe on the same day. Nothing here is recalled.

**Adversarially re-run 2026-09-10.** The whole protocol was executed end to end on a second, independent
interface — `../examples/evaluation-builds/task-manager/` — and every script in §10 was run rather than
read. Two tests failed: one was measuring the wrong thing and is now cut, one was capturing the
wrong region and is now fixed (§3.3). The comparison test was demoted from "highest-signal" to
"calibration" on the evidence of this document's own worked example. See the pass log at the end.

**This instrument runs the opposite direction from
[`vibecode-rubric.md`](vibecode-rubric.md).** There, 0 is the goal (no generation tells). Here, 10
is the goal (high craft). They measure different things and a page can score well on one and badly
on the other — the worked example below scores **3** on vibecode risk (its content is specific and
real) and **4.4** on craft. Always say which instrument a number came from.

---

## Contents

1. [Why looking is a separate skill from reading](#1)
2. [What to render and capture](#2)
3. [The looking protocol — seven tests](#3)
4. [The critique rubric — 14 anchored dimensions](#4)
5. [Comparative critique — the calibration technique](#5)
6. [From critique to a ranked fix list](#6)
7. [The iteration loop, and how to know when to stop](#7)
8. [Self-deception traps](#8)
9. [Two worked examples, start to finish](#9)
10. [The scripts](#10)

---

<a id="1"></a>
## 1 — Why looking is a separate skill from reading

Three failure modes, all of which feel like success from inside the code:

**The code review substitutes for the design review.** "Components are well-factored, tokens are
consistent, no arbitrary values" describes a codebase. It is compatible with an interface where the
user's primary object is the fourth-most-prominent thing on screen. In the worked example, the CSS
is clean — one spacing rhythm, one accent, four card components, zero magic numbers — and the first
ticket in a ticket queue does not appear until **493px down a 900px viewport**.

**The reading order is not the looking order.** You read a page top-to-bottom in source order. A
person looks at it in salience order: biggest contrast first, then largest shape, then color, then
text. Those two orders diverge violently in generated UI, because the loudest elements (a filled
primary button, a saturated status chip) are usually the ones a component library styles most
aggressively, and those are almost never the content.

**You have already seen it.** By the time you critique your own output you have read the markup
forty times. You know where everything is, so you cannot experience not knowing. Every test in §3
exists to destroy that knowledge — blur it, invert it, desaturate it, put a known-good product next
to it — so that you are looking at a shape instead of recalling a structure.

> **The one-sentence version:** you cannot see hierarchy in code, because hierarchy is not a
> property of any element. It is the relationship between all of them, and it only exists once
> they are rendered at a specific size on a specific screen.

**When this doesn't apply.** A pure logic change, a data-layer refactor, a copy fix inside an
existing block — if nothing about the rendered geometry changed, don't run this. The cost of the
protocol is real (a full pass is 15–25 minutes of tool calls) and running it on a one-word label
change is theatre.

---

<a id="2"></a>
## 2 — What to render and capture

**The populated desktop happy path is the easiest view to make look fine, and it is the one every
agent screenshots.** It is also the view that hides every bug in the list below. The capture set is
not optional garnish; roughly half of all findings in §9 came from states the happy path does not
contain.

### 2.1 The capture matrix

| # | Capture | Why it is on the list | What it caught in §9 |
|---|---|---|---|
| 1 | **1440×900, populated, real content** | The composition and hierarchy read | Content starts at y=493; five things tie for largest text |
| 2 | **1440×900, many items** (20–30 rows, not 8) | Fixture-sized lists hide density errors and make a real queue look like a demo | 8 rows left 430px of dead space; the design was tuned to the fixture, not the product |
| 3 | **390×844** | Where most breakage lives | Table clipped 644px of columns with no affordance |
| 4 | **320×844** | Where the *rest* of the breakage lives. 390 is forgiving; 320 is not | `1h 42m` broke across two lines mid-value. **390 did not reveal this** |
| 5 | **Empty / first-run** | The state your product ships in on day one, and the one nobody authors | Pager still read `Page 1 of 39` with live Prev/Next while the header read `Showing 0 of 0` |
| 6 | **One item** | Exposes layouts that only work as a grid | — |
| 7 | **Long text** — longest realistic string in every text slot | Truncation, wrap, and row-rhythm failures | Row grew 70px → 87px; the title had no truncation rule, only the subtitle did |
| 8 | **Loading** | Usually a spinner where a skeleton belongs | — |
| 9 | **Error / permission denied** | The copy is always worse than you think | — |
| 10 | **Keyboard focus visible** (Tab ×N) | The single most-skipped state | Focused button computed `outline: 3px none` — invisible |
| 11 | **Dark mode** (if shipped) | Borders and shadows do not survive inversion | — |
| 12 | **Missing image / missing avatar** | Layout collapse | — |

**Real content, not lorem, and not uniform fakes.** Three metrics that all read `$20K`, or eight
rows whose titles are all 40 characters, produce a screenshot that cannot be critiqued — the
alignment is perfect because the data is fake. Use the longest real string, the shortest real
string, and the one with a `#`, an `@`, an emoji and a CJK character in it.

### 2.2 The commands

```bash
UIL=~/Ayush/UI_Library
OUT=.cache/shots

# 1 + 3 + 4 — the three widths. Run 320 separately; it is the one that finds things.
node $UIL/tools/shot.mjs http://localhost:3000/tickets --out $OUT --name q --widths 1440,390 --wait 3000
node $UIL/tools/shot.mjs http://localhost:3000/tickets --out $OUT --name q320 --widths 320 --wait 3000

# 11 — dark
node $UIL/tools/shot.mjs http://localhost:3000/tickets --out $OUT --name q-dark --dark --widths 1440

# a long page, sampled rather than one 20,000px image
node $UIL/tools/shot.mjs http://localhost:3000 --out $OUT --name home --widths 1440 --scroll 3

# a state behind an interaction
node $UIL/tools/shot.mjs http://localhost:3000/tickets --out $OUT --name filters --click "[data-testid=filters]"
```

Then **Read the PNGs.** Reading the file paths the tool printed is not looking. If you have not put
an image into your context this session, you have not seen your interface.

**`--click` fails silently.** `shot.mjs` runs the click as
`page.locator(sel).first().click({timeout:4000}).catch(() => {})` — a selector that matches nothing
prints the same success line and writes the *default* view. Verified 2026-09-10 against
`--click "#definitely-not-here"`: exit 0, one PNG, no warning. So a `--click` capture is only
evidence if you can see the state changed in the image. When the state matters, drive it from the
script in §2.3 and assert on the DOM after the click instead of trusting the flag.

**Strip the harness before you run §3.** Demo scaffolding — a state-switcher bar, a Storybook
toolbar, a dev overlay — is furniture that is not in the product, and every transform test scores
it. Measured on the task-manager build: its `position:fixed` demo bar is the **second-strongest mass
in the blur-14 attention map** and occupies **45% of the 320px viewport**. Hide it
(`p.evaluate(() => document.querySelector('.scaffold')?.remove())`) before capturing, or every
finding in §3 is partly about your own test rig.

### 2.3 The states the CLI can't reach

Drive the page and screenshot. Focus is the important one — it is invisible in a normal capture and
it is broken in most generated output:

```js
// scratch/states.mjs
import { execSync } from 'node:child_process'; import { createRequire } from 'node:module';
const { chromium } = createRequire(execSync('npm root -g').toString().trim()+'/')('playwright');
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
await p.goto('http://localhost:3000/tickets', { waitUntil:'networkidle' });

// keyboard focus — and assert it, don't just look
for (let i=0;i<12;i++) { await p.keyboard.press('Tab');
console.log(i+1, await p.evaluate(() => { const e=document.activeElement, s=getComputedStyle(e);
  return { on:e.tagName+':'+e.textContent.trim().slice(0,24),
           outline:`${s.outlineWidth} ${s.outlineStyle} ${s.outlineColor}`, shadow:s.boxShadow }; })); }
await p.screenshot({ path:'.cache/shots/focus.png', clip:{x:0,y:0,width:1440,height:420} });

// empty — mutate the DOM rather than building a fixture route.
// `tbody` and `.subject` are placeholders: substitute YOUR list container and YOUR title element.
// `?.` is load-bearing — without it a wrong selector throws and kills the run silently mid-script.
await p.evaluate(() => { document.querySelector('tbody')?.replaceChildren(); });
await p.screenshot({ path:'.cache/shots/empty.png' });

// longest realistic string
await p.evaluate(() => { const el = document.querySelector('.subject'); if (el) el.textContent =
  'Webhook retries stop after 3 attempts and the delivery.failed event is never re-queued'; });
await p.screenshot({ path:'.cache/shots/long.png' });
await b.close();
```

`outline: 3px none` is the signature of `outline: none` plus a reset that set a width and never a
style. It reports a width, so a naive check passes. Assert on the **style**, not the width.

**Tab further than you think.** Five presses reaches the first toolbar control and stops. Twelve
reaches the list rows and the sidebar, which is where a custom `outline: none` on an interactive
`<div role="button">` actually lives. On the task-manager build, 12 presses returned
`2px solid rgb(35,88,216)` on every stop, including the row buttons — that is the check passing,
and five presses would not have shown it.

**A state you drove is only captured if you assert it changed.** Screenshot *and* read back one
string that only exists in the new state. Every state-capture failure found in this corpus was an
agent screenshotting the state it was already in.

---

<a id="3"></a>
## 3 — The looking protocol, seven tests

Run them in this order. Early tests catch structural problems; running the late ones first means
polishing a layout you are about to throw away.

Every test below has three parts: **what it diagnoses**, **how to run it**, and **when it lies**.
The last part matters — each of these tests has a domain where it gives the wrong answer, and an
agent that applies all seven everywhere will make some interfaces worse.

**It was nine.** Two were cut in the 2026-09 adversarial pass: the five-second test, because §8 is
right that you cannot run it on your own output (it is folded into 3.1 below as a precondition, not
a step), and the optical-centering check, because re-measurement showed it was reporting descenders
as misalignment — see [Cut: the optical-centering check](#cut) at the end of this section. A
protocol with a step that manufactures false findings is worse than a shorter one, because an agent
that learns one step is noise starts skimming all of them.

### 3.1 The squint test — *what does the eye hit first?*

**Before you blur, ask what you remember.** Look at the 1440 render for five seconds, look away, and
write down what you saw. You should remember the primary object and the primary action; if you
remember the nav, the header, the filter bar or "some cards", the hierarchy is inverted. But treat
that answer as a hypothesis and nothing more — by the time you critique your own output you have
read the markup forty times and you cannot experience not knowing where things are
(§8, *Trusting your own five-second test*).
The blur below is the version of this test whose evidence does not depend on your memory. If you
want the real five-second test, hand the PNG to a fresh context with no knowledge of the code.

On a dense professional tool used six hours a day, "I remember a wall of rows" is the *correct*
answer, not a failure. Linear's issue list and a Bloomberg terminal both fail a naive five-second
test and both are right. Ask "did I remember the content or the furniture," not "was one thing
memorable."

Blur the render. Two radii, and they diagnose different things:

| Radius | What survives | What it tells you |
|---|---|---|
| **6px** at 1440 | Layout, grouping, column rhythm, card edges. Text becomes gray dashes | Is the *grouping* legible? Do related things read as one block? |
| **14px** at 1440 | Only the strongest contrast and largest mass | **The attention map.** What the eye lands on in the first 100ms |

Scale the radius with viewport width: roughly **w/100** for the attention map, **w/240** for the
grouping check. At 390 that is 4px and 1.6px.

Apply the filter to the live page rather than post-processing a PNG — no image library needed, and
it blurs at CSS pixel scale regardless of device pixel ratio:

```js
await p.evaluate(() => { document.documentElement.style.filter = 'blur(14px)'; });
await p.screenshot({ path: '.cache/shots/blur14.png' });
```

**The conventional framing of this test is wrong.** It is usually taught as "does hierarchy
survive?", which invites a yes/no you will answer generously. Ask instead: **rank the top four
objects by how much they survive, and compare that ranking to what you want the user to do.**

In the worked example the blur-14 ranking came out:

1. the indigo `+ New ticket` button (the single darkest, most saturated mass on the page)
2. the field of colored status/priority pills — two competing vertical bands of red/amber/blue
3. the column of blue avatar circles
4. the four equal KPI values

and the ticket subjects — the entire reason the screen exists — were **fainter than all four**.
That is a complete finding with a complete fix list attached, produced by one screenshot.

It also works on interfaces that are already good, which is the harder test. Blur-14 on the
task-manager build (§9.7) ranked: (1) the **selected row**, a full-bleed `#2358D8` fill spanning the
whole content width; (2) the demo scaffolding bar; (3) two amber in-progress bands; (4) the
`New task` button; (5) the task titles. Every count in §3.5 says that page is well made, and it is —
but selection is louder than content, and the row that wins the page is an unassigned task somebody
happened to click. Nothing in the source says that. One blurred PNG does.

**When it lies:** on an editorial or marketing page where one enormous headline is supposed to win,
blur-14 will show you a single dark mass and nothing else, and that is correct. And on a
deliberately quiet interface (a reading view, a form), everything blurring to soft gray is the
design, not a defect — check the 6px grouping read instead.

### 3.2 The grayscale test — *is color doing structure's job?*

```js
await p.evaluate(() => { document.documentElement.style.filter = 'grayscale(1)'; });
```

Two questions, and the second one is the one nobody asks:

**(a) What information disappeared?** Anything that is now indistinguishable was encoded in hue
alone. In the worked example, `Escalated` / `Open` / `Pending` / `Solved` became four identical
light-gray pills, and `Urgent` / `High` / `Normal` / `Low` became four more. Two entire columns
went to zero information. That is simultaneously a WCAG 1.4.1 failure and a design failure — the
shapes were carrying nothing, so all the work was on the hue.

**(b) Does the page look *better* in grayscale?** If the desaturated version reads calmer and
better-composed, your color was noise rather than signal. The worked example's grayscale render is
genuinely more legible than its color render, because the pills stop shouting over the text. Both
answers were true at once: color was doing structural work it should not have been doing, *and* it
was decorative.

**The fix that follows** is not "add a pattern to the pills". It is what Linear does in its
property row, which we captured on `linear.app/plan`: status is a **shape** (a segmented ring, a
dashed ring, a filled dot, a check), priority is a **bar glyph** (1/2/3 bars of increasing height),
and labels are plain text with a 6px colored dot — no filled pill background anywhere. Shape
carries the meaning; color is a 6px accent on top of it. That survives grayscale, survives blur,
and stops the row from being a color chart.

**This test is in tension with "one mark per state", and the tension is real.** On the task-manager
build (2026-09-10) an in-progress row carries *both* a 3px `#E29B33` inset left rail *and* a
`#FFF6E9` full-row fill. Reviewed in color that is a redundancy worth deleting — two marks for one
status. Desaturated, the fill collapses to a tint you cannot name and **the rail is the only thing
that still says "in progress."** The resolution is not "keep both": it is that the surviving mark
should be the *shape*, and the fill is the one to cut. When a build has exactly one mark per state
and that mark is a hue, grayscale is what tells you.

Same render, the finding that had no redundancy to save it: `waiting 3d` renders `#B3261E` on white
with no glyph beside it, so in grayscale it is typographically identical to `1d est` two rows up.
The whole right-hand column drops to one meaning.

**When it lies:** on a data visualization, categorical color *is* the encoding, and grayscale
correctly destroys it. On a brand or marketing surface, "looks calmer in grayscale" is not a
finding — of course it does. Restrict this test to functional UI.

### 3.3 The upside-down test — *composition without reading*

Removing your ability to read removes your ability to rationalise. What is left is mass, gutter and
balance. This is the test that finds the problems you have stopped seeing.

**Do not rotate the DOM.** The obvious implementation is wrong:

```js
await p.evaluate(() => { document.body.style.transform = 'rotate(180deg)'; });   // ✗ BROKEN
```

A transform on `body` makes it the containing block for every `fixed` and `sticky` descendant, and
it rotates the *whole document* about its own centre — not the viewport. Measured on the
task-manager build at 1440×900: `body` is **1689.5px** tall, so after the rotation the 900px
viewport shows original y ≈ 790–1690 — the bottom of the page — and the `position:sticky` sidebar
moves from `{top:0, left:0}` to `{top:789.5, left:1208}`, i.e. **789px below the fold and on the
wrong side**. The screenshot you then critique is a different region of a different layout. Any page
taller than its viewport, or with sticky/fixed chrome, hits this — which is most real interfaces.

**Rotate the image, not the page.** Capture normally, flip the PNG through a canvas:

```js
const png = 'data:image/png;base64,' + (await p.screenshot()).toString('base64');
const h = await b.newPage();                                  // scratch page, decodes + rotates
const flipped = await h.evaluate(async u => {
  const img = new Image(); img.src = u; await img.decode();
  const c = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height });
  const x = c.getContext('2d'); x.translate(img.width, img.height); x.rotate(Math.PI);
  x.drawImage(img, 0, 0); return c.toDataURL('image/png');
}, png);
writeFileSync('.cache/shots/flip.png', Buffer.from(flipped.split(',')[1], 'base64'));
```

Verified 2026-09-10: this preserves the sidebar, the sticky header and the exact slice you were
looking at. `look.mjs` in §10 carries the fixed version.

What it surfaced in the worked example: the table's five right-hand columns are crushed into the
right 40% of the width while the ticket-title column carries a 340px dead gutter, because the
subject text was capped by `max-width` and the columns were auto-sized. Right-side-up, you read the
titles and never notice; upside-down it is an obvious lopsided band.

**When it lies:** it says nothing about hierarchy or typography, only about composition and
balance. Do not try to score type from it. It is also the lowest-yield of the four transforms —
on a build that is already competently composed it returns nothing. Run it, but run it last.

### 3.4 Where the content starts, and what is silently clipped

`fold.mjs` (§10), three widths, one command. This produced more findings per second than anything
else in the 2026-09 re-run, and it is the one number in the protocol you can put in a commit
message.

| | task-manager @1440 | @390 | @320 |
|---|---|---|---|
| First row top | **124px** of 900 | **292px** of 844 | 292px |
| Rows fully visible | 14 of 28 | 5 | 5 |
| Page height | 1690 | 2627 | 2766 |

Desktop density is excellent and mobile is not: 35% of the phone viewport is spent before the first
row. A finding that exists only because the same script ran at three widths.

**The clipping detector needs one filter or it lies.** It looks for
`overflowX ∈ {auto,scroll,hidden}` with `scrollWidth - clientWidth > 24` on every element — which is
exactly what the standard visually-hidden idiom looks like:

```css
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
```

Unfiltered on the task-manager build it reported `h2.vh +34px` and `label.vh +180px` at 1440 — **two
findings, both false**. On GitHub's issue list the same day, three of four were `sr-only` /
`visuallyHidden`. Add:

```js
.filter(e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e);
  return r.width > 24 && r.height > 8 && s.visibility !== 'hidden'
      && s.clip === 'auto' && !/inset\(50%\)/.test(s.clipPath); })
```

Filtered, 1440 returns zero — correct — and the phone widths return the one real finding on that
build: `h2 +58px` at 390, `h2 +120px` at 320. Chased down, the group-header person name loses a flex
fight with its own meta string: `Ilya Petrov` is 65px of text in a **4.4px** box,
`Marguerite Delacroix-Bell` 159px of text in **39px**. The list's navigational spine degrades to an
ellipsis. Nothing else in the protocol found this — it truncates *by rule*, so it looks deliberate in
a screenshot and only the measurement shows how much is gone.

**Note what `hOverflow` does not tell you.** It reads `0` at every width on both builds while a
container hides hundreds of pixels, because the clipping is inside an `overflow:auto` box. A
document-level overflow check passes on a page that is eating half its columns.

### 3.5 Count things — *six counts, sixty seconds*

Judgement is unreliable across sessions; counts are not. `probe.mjs` (§10) takes all six on any URL.
Take them on your render **and** on the reference product you are comparing against (§5).

| Count | Healthy | Worked example v1 | GitHub issues | task-manager |
|---|---|---|---|---|
| **Distinct font sizes** | 4–6 | 7 (14/12/13/30/11/16/18) | 7, `12px ×199` dominant | **4** (12 ×126, 13 ×56, 15, 17) |
| **Radius families** (rule below) | 1–2 | 3 | 2 | 2 |
| **Distinct accent hues** | 1, plus semantics that are present | **5** (indigo, blue, green, red, amber) | 2 (blue link, red state) + user labels | 4 (blue brand, amber, red, green) |
| **Bordered/shadowed containers above the fold** | as few as the content needs | 6 | 1 | 1 |
| **Gap-value histogram** | one dominant value, then halves/doubles | 6×16, 12×11, 10×9, 24×1, 8×1 — no dominant | 4×152, 8×83, 16×27, 12×3 | 8×52, 2×10, 6×6, 16×1, 12×1 |
| **Left-edge histogram** | 2–4 spines carrying most elements | `x=297 ×23`, `x=321 ×21`, `x=16 ×17`, then **30+ singletons** | `x=321 ×212`, `x=281 ×69`, `x=364 ×31`, `x=48 ×25` | `x=256 ×74`, `x=8 ×42`, `x=282 ×26`, `x=348 ×26` |

The gap histogram is the most diagnostic single number in the table. A real spacing scale looks
like GitHub's: one value used 152 times, its double used 83 times, its quadruple 27 times. Five
values with no winner means spacing was decided per component, which is what "it looks a bit loose"
actually is.

**The radius count needs a stated rule or it is not reproducible.** Re-probed 2026-09-10, GitHub's
issue list renders **seven** distinct radii (6px ×67, 9999px ×42, 24px ×5, 3px ×2, 20px ×2, 50% ×2,
4px ×1) — this document previously credited it with "2" while marking Beacon v1's "4" as a defect,
which is two verdicts for one measurement. The rule that makes both numbers true:

> **Count rectangular radius values occurring ≥3 times. All fully-round values (`50%`, `9999px`)
> are one family regardless of count, because they are the same decision.**

Under it: GitHub = 2 (6px, round). Beacon v1 = 3 (8px ×18, 12px ×6, round). task-manager = 2 (6px
×50, 4px ×5; the `3px` ×1 is a status rail, not a corner). This also reconciles
[`../evaluation/results/2026-09-control-vs-treatment.md`](../evaluation/results/2026-09-control-vs-treatment.md),
whose "10 → 4" and "10 → 3" are counts of *distinct values*, not families; as families those
treatments are 2 and 2.

**Left edges: run the scan on left-aligned content only.** Right-aligned numeric columns
*legitimately* produce a different left edge per row, because the digits are different widths. Run a
**right**-edge scan on those instead — a numeric column whose right edges vary is the real bug there,
and it means you forgot `font-variant-numeric: tabular-nums`. This caveat is why the task-manager's
~20 singleton left edges are not a finding: every one of them is in the right-hand metadata.

**Contrarian note on the 8px grid:** GitHub's dominant gap is **4px**, and its 12px value appears 3
times against 4px's 152. A strict 8px grid would have forced every one of those 4px gaps to 8 and
halved the information density of the issue list. The rule that matters is *few values, clearly
related*, not *multiples of eight*. 4/8/16 is a scale. So is 6/12/24. 6/8/10/12/24 is not.

### 3.6 The comparison test

Calibration rather than discovery, and the section that argues for its own demotion — **[§5](#5)**.

### 3.7 "What would a designer's first comment be?"

Ask it plainly and answer honestly. You usually already know, and the reason you have not written
it down is that it implies rework. In the worked example the honest answer was *"why is a quarter
of the screen four numbers nobody asked for, above the list I actually came here for"* — which is
finding #1 in §9 and the fix that moved the score more than the other nine combined.

If the answer that comes to mind is "the spacing could be a bit tighter" or "maybe a different
accent color", you are not answering honestly; those are the answers that require no rework.

<a id="cut"></a>
### Cut: the optical-centering check

Removed 2026-09-10. It is recorded here so nobody reinstates it.

The claim was that `align-items: center` centers the line box rather than the letters, so every
flex-centered chip label sits low by 1–3.5px, by an amount that varies with the string — and that
`Escalated` and `Urgent` therefore sit 2.25px apart in the same table row. The measurements
reproduce exactly (`inkbox.mjs` against `v1.html`: `Urgent` 2.75px, `Open` 2.50px, `Escalated`
0.25px). The interpretation does not.

`bias = inkTop − inkBottom` is confounded by descenders. Controlled test, one 24px chip, 12px/500,
identical string plus one letter:

| String | ink top | ink bottom | "sits low by" |
|---|---|---|---|
| `HAMBOX` | 8.25px | 6.75px | 1.50px |
| `HAMBOXg` | **8.25px** | 4.75px | **3.50px** |

The cap top does not move. The entire 2px is the `g` hanging below the baseline, which is what a `g`
is for. `Urgent`, `Open` and `Pending` all carry descenders; `Escalated`, `Normal`, `Solved` and
`Low` do not — that is the whole of the reported "spread". Measured on the cap band instead
(cap top 8.25 → baseline 17.25, centre 12.75 in a 24px box), the real offset is **≈0.75px**, which
this document's own "when it lies" clause already called below perception. Applying the recommended
asymmetric padding would have pushed `Urgent` *above* `Escalated` and created the misalignment the
test claimed to find.

What survives: **if you measure optical centering, measure cap-top to baseline, never ink-top to
ink-bottom**, and expect ~0.1–0.8px for a system font. `text-box: trim-both cap alphabetic` is still
the right tool where a font's ascent/descent ratio is genuinely lopsided — a display serif, a webfont
with a deep descender — but that is a typography decision, not a protocol step.

---

<a id="4"></a>
## 4 — The critique rubric

Score 0–10 per dimension, **10 is best** (opposite direction from the vibecode rubric — say which
one you are quoting). Take the weighted mean for a headline number, but the headline number is not
the deliverable. **The fix list in §6 is the deliverable.** A weighted mean of 6.2 tells nobody
what to do on Monday.

### 4.1 Evidence requirement

Same rule as the vibecode rubric, same format. **No observable, no score.**

```
<DIM> <score>  <where>  ::  <measured value or literal string>  ::  <what it indicates>
```

```
HIER 3  page head + KPI row  ::  30px appears 5× — h1 and four metric values  ::  five elements tie for largest
DENS 2  first data row       ::  top = 493px of a 900px viewport; 5 of 8 rows visible  ::  55% of screen 1 is furniture
COLOR 3  status + priority   ::  grayscale(1) renders 8 pills identical  ::  hue is the only encoding
A11Y 2  .preview             ::  #9CA3AF on #FFFFFF = 2.54:1 at 13px  ::  fails 4.5:1
STATE 1  empty render        ::  "Page 1 of 39" + live Prev/Next while header reads "Showing 0 of 0"  ::  state never authored
```

A screenshot alone can only support 9 of the 14 dimensions. Interaction depth, consistency at the
token level, and parts of accessibility need the computed CSS. Say which ones you could not judge
rather than guessing them.

### 4.2 Weights

| # | Dimension | Weight | Why |
|---|---|---|---|
| 1 | **Hierarchy** | 14 | Everything else is downstream. A page with inverted hierarchy cannot be rescued by any surface change. |
| 2 | **Density & information rate** | 12 | The most common single defect in generated UI and the one with the largest perceived-quality delta per unit effort. |
| 3 | **Product fit** | 11 | The right density, tone and affordances for *this* archetype and *this* user. A beautiful consumer aesthetic on an ops tool is a failure. |
| 4 | **States** | 9 | Separates "product" from "mockup". Half the §9 findings came from four extra renders. |
| 5 | **Spacing & alignment** | 8 | Cheap to measure, immediately visible, and the thing that reads as "unfinished". |
| 6 | **Typography** | 8 | Scale *vocabulary*, not font choice. Individual values have converged industry-wide; the number of them has not. |
| 7 | **Accessibility** | 8 | Mostly mechanical, therefore inexcusable. Contrast, focus, target size, color-only encoding. |
| 8 | **Copy** | 7 | Survives the screenshot, and is where a model's priors are least disguised. |
| 9 | **Color** | 6 | Real signal, noisy. Many excellent products are monochrome-plus-one; so are many bad ones. |
| 10 | **Composition** | 5 | Balance, gutters, where the mass sits. Matters most on marketing and dashboard surfaces. |
| 11 | **Responsiveness** | 5 | Weighted below its importance only because it is binary and easy to fix once found. |
| 12 | **Consistency** | 4 | Necessary, not sufficient. See §8 — consistently mediocre is still mediocre, and this dimension is the one agents hide behind. |
| 13 | **Interaction depth** | 3 | Hover, focus, active, transition, empty-to-full. Mostly invisible in a still. |
| 14 | **Originality** | **2, capped at 6** | Asymmetric, like the vibecode rubric's. It can credit a real signature move; it can never demand one. A well-executed conventional interface must be able to score 9 overall. |

Hierarchy + density + product fit = **37%**. That is deliberate: they are the three that require
structural rework, which is exactly what an agent avoids when it is optimizing radius values.

### 4.3 Anchors

Each dimension, four levels. Anchors reference interfaces measured for this document (Beacon v1 and
v2 are the worked example in §9) or, where marked †, values measured for
[`vibecode-rubric.md`](vibecode-rubric.md).

#### 1. Hierarchy (14)
| Score | Anchor |
|---|---|
| **0–3** | More than three elements tie for "largest thing on screen"; the primary object is not the most prominent. *Beacon v1: `30px` on 5 elements — the h1 and four KPI values; the ticket subject is 14px/500, the fourth-loudest thing in its own row.* |
| **4–6** | One clear top level, but levels 2 and 3 are not separated. Section heads and body differ by weight only. |
| **7–8** | Three legible levels, and the primary object wins the blur-14 test. *Beacon v2: the subject column is the dominant mass at blur-14; the only darker object is a 110×26 button.* |
| **9–10** | Levels are separated by size **and** weight **and** color, the ratio between them is deliberate, and the page-title level is deliberately *small* because it is a label, not content. *GitHub: `All issues` is 20px/600, an issue title is 16px/600 — a 1.25× ratio, because the title is the content and the heading is a signpost.* |

The GitHub anchor is the one agents find counterintuitive. Beacon v1 spends a **2.14×** ratio on its
page title (30px vs 14px) for a string that duplicates the active sidebar item *and* the panel
header — the same words, `All tickets`, appear three times in one viewport, and the biggest instance
is the least useful one.

#### 2. Density & information rate (12)
| Score | Anchor |
|---|---|
| **0–3** | More than half the first screen is furniture. *Beacon v1: first data row at y=493 of 900 (55%); 5 of 8 rows visible; at 320px the first row is at y=909 — below the fold entirely.* |
| **4–6** | Content starts in the top third but rows are 1.5× taller than the task needs; a fixture-sized list (6–8 rows) was used to tune it. |
| **7–8** | Content begins immediately; row height is derived from the content. *Beacon v2: first row at y=134, 19 rows visible, 36px rows.* |
| **9–10** | Density is visibly a decision, varies correctly *within* the page, and the variation is defensible. *GitHub: rows are variable height (42–66px measured) because titles wrap to two lines and the row grows; nothing is clipped and nothing is padded to a grid.* |

**When low density is right:** a consumer signup, a checkout, a confirmation dialog, an onboarding
step. Linear's density is correct for a tool someone lives in for six hours and wrong for a screen
someone sees once. Do not carry a dense-tool score anchor into a marketing page critique.

#### 3. Product fit (11)
| Score | Anchor |
|---|---|
| **0–3** | The screen would work unchanged for a different product in a different industry. Generic metric tiles, generic table, generic empty state. |
| **4–6** | Domain content, generic structure. Real ticket subjects poured into a table that could hold anything. *Beacon v1.* |
| **7–8** | The structure reflects the actual job. *Beacon v2: rows are grouped `Breaching SLA` / `Due today` / `Later this week` and sorted by SLA due, because that is the order a support agent works the queue in — not "newest first".* |
| **9–10** | There is a signature decision drawn from the domain that a generic build would not contain, and it is the most useful thing on screen. *Beacon v2: the `SLA due` column showing `−34m` in red for a breached ticket. A generic queue shows `Updated 4m ago`, which tells an agent nothing about what to do next.* |

#### 4. States (9)
| Score | Anchor |
|---|---|
| **0–3** | Happy path only. Empty state renders as a husk with contradictory chrome. *Beacon v1 empty: header `Showing 0 of 0`, pager `Page 1 of 39` with live Previous/Next, sidebar still `All tickets 312`, KPI still `312` — four mutually contradictory numbers in one viewport.* |
| **4–6** | Empty and loading exist but are generic ("No data found"); error is a red banner with a stack-trace-flavoured string. |
| **7–8** | All four data states authored with specific copy; long text truncates by rule; focus is visible. |
| **9–10** | States are designed as part of the flow: the empty state teaches the next action, the loading state preserves layout (skeleton at the real dimensions, not a centered spinner), the error names what failed and what to do. |

#### 5. Spacing & alignment (8)
| Score | Anchor |
|---|---|
| **0–3** | Left-edge scan shows 20+ singleton x-positions; gap histogram has no dominant value. *Beacon v1: gaps 6/12/10/24/8, no winner; 30+ one-off left edges.* |
| **4–6** | A scale exists but is applied inconsistently; spacing inside groups is not smaller than spacing between them. |
| **7–8** | Two or three strong left spines; one dominant gap plus its double. |
| **9–10** | *GitHub: 4px ×152 / 8px ×83 / 16px ×27; `x=321` shared by 213 elements.* |

#### 6. Typography (8)
| Score | Anchor |
|---|---|
| **0–3** | 8+ sizes, or headings that came straight off a framework scale (30/48/60 co-occurring), or `line-height` never authored. *Beacon v1: 7 sizes; `.subject` computes `line-height: normal` — it was never set.* |
| **4–6** | 5–6 sizes, one weight axis, line-height set but uniform across display and body. |
| **7–8** | 4–5 sizes with a clear role each; line-height differentiated by role; tabular figures on numeric columns. |
| **9–10** | The scale is *small* and the roles are unambiguous. †*Stripe's API reference: four sizes on a 4,000-element page (12/14/16/24), two families, and body drops from 16px/1.6 in the docs prose to 14px/1.5 in the reference because the reader is scanning parameter tables, not reading.* |

#### 7. Accessibility (8)
| Score | Anchor |
|---|---|
| **0–3** | Focus removed, color-only encoding, body text under 3:1. *Beacon v1: `outline: 3px none` on the focused button; 8 status pills identical in grayscale; `.preview` at 2.54:1; `Low` pill at 2.31:1.* |
| **4–6** | Focus exists but is the browser default on a dark surface; one or two contrast failures on secondary text. |
| **7–8** | Visible `:focus-visible` on every interactive element, all text ≥4.5:1, no color-only encoding. |
| **9–10** | †*GOV.UK: 28 `:focus-visible` rules and 135 `:focus` rules. GitHub: 115 and 149. Beacon v1: **0 and 0**.* |

The rule count is a 10-second check and it is close to conclusive:

```js
let fv=0,f=0; for (const s of document.styleSheets) { try { for (const r of s.cssRules) {
  const t=r.selectorText||''; if(/:focus-visible/.test(t)) fv++; else if(/:focus\b/.test(t)) f++; } } catch {} }
```

#### 8. Copy (7)
| Score | Anchor |
|---|---|
| **0–3** | Strings that would fit any product. *Beacon v1's page subtitle: "Manage and resolve customer tickets efficiently." — true of every ticket queue ever built, and it occupies 16px of the top of the screen.* |
| **4–6** | Real domain nouns, but labels are the database column names and empty/error copy is boilerplate. |
| **7–8** | Labels are what a practitioner would say out loud; numbers carry their comparison inline. *Beacon v2's header strip: `9 breaching SLA · 1h 42m median first response · 7 unassigned`.* |
| **9–10** | The copy tells you what to do, in the user's words, and could not have been written without domain knowledge. |

#### 9. Color (6)
| Score | Anchor | |
|---|---|---|
| **0–3** | 4+ accent hues; the accent appears on decorative elements; semantic colors used for non-semantic things. *Beacon v1: indigo brand gradient + indigo nav + blue/amber/red/green pills + green/red deltas = 5 hues before any content.* | |
| **4–6** | One accent used too often; semantic colors correct but over-applied. | |
| **7–8** | One accent, spent rarely; semantics only where they mean something. | |
| **9–10** | Color is a scalpel. *Beacon v2: `#B42318` appears 7 times on the whole page and every one of them means "past due or unowned".* † *GOV.UK: zero decorative color at all.* | |

**A caution:** v2 uses `#B42318` for both a breached SLA and an unassigned ticket. Those are two
different meanings sharing one hue, which is a genuine remaining finding from the second critique
pass in §9. One hue, one meaning.

#### 10. Composition (5)
| Score | Anchor |
|---|---|
| **0–3** | Upside-down test shows an obviously lopsided mass or a dead gutter. *Beacon v1: 340px dead gutter in the title column while five columns crowd the right 40%.* |
| **4–6** | Balanced but arbitrary — the layout is a grid because a grid was available. |
| **7–8** | Mass sits where attention should go; gutters are consistent; the page has a spine. |
| **9–10** | Composition carries meaning — the most urgent thing is where the eye starts. |

#### 11. Responsiveness (5)
| Score | Anchor |
|---|---|
| **0–3** | Content below the fold at 320; values break mid-string; horizontal clipping with no affordance. *Beacon v1 at 390: 644px of table columns clipped silently. At 320: `1h 42m` wraps to two lines; first row at y=909.* |
| **4–6** | Works at 390, untested at 320; touch targets under 44px; a table that scrolls horizontally without a hint. |
| **7–8** | Reflows rather than scales; no horizontal overflow at 320; targets ≥44px. |
| **9–10** | The mobile layout is a different, correct answer to the same problem — not the desktop layout stacked. |

#### 12. Consistency (4)
| Score | Anchor |
|---|---|
| **0–3** | Same element styled three ways; radius/gap vocabulary has no pattern. |
| **4–6** | Consistent within components, inconsistent between them. |
| **7–8** | One vocabulary, applied everywhere. |
| **9–10** | The vocabulary is small enough to recite, and deviations are deliberate and rare. |

**Read §8 before you score this dimension high.** Beacon v1 scores **7** here — it is internally
consistent, one accent, one radius family per component class, one spacing rhythm — and it is the
bad version. Consistency is the dimension that makes an agent feel finished.

#### 13. Interaction depth (3)
| Score | Anchor |
|---|---|
| **0–3** | One state per element. *Beacon v1: zero transitions and zero focus rules on the whole page — every element has exactly one appearance.* |
| **4–6** | Hover exists; it changes geometry (border appears, element shifts), which makes lists twitch. |
| **7–8** | Hover changes background only; focus is distinct from hover; transitions are property-scoped. *GitHub: `0.08s cubic-bezier(0.65,0,0.35,1)` on `color, fill, background-color, border-color` — never on `all`.* |
| **9–10** | Motion is differentiated by purpose and there is a `prefers-reduced-motion` path. |

**Nothing should move on hover in a list.** A border that appears on hover adds 1px and shifts
content; sweeping the cursor down 30 rows makes the whole list jitter. Background-tint only.

#### 14. Originality (2, capped at 6)
| Score | Anchor |
|---|---|
| **0–2** | Nothing distinctive. **This is not a deduction** — a login form that looks like a login form is correct. |
| **3–4** | One decision that is specific to this product. |
| **5–6** | A signature move drawn from the domain that improves the work. *The SLA-due column and the breach grouping in v2.* |

Restraint is never penalised anywhere in this rubric. Novelty is never a defence. An ambitious
surface applied to nothing still scores badly on the other thirteen.

---

<a id="5"></a>
## 5 — Comparative critique

**The technique that tells you whether your findings are worth acting on. Not the one that finds
them** — that claim was tested in 2026-09 and withdrawn; see 5.0.

"Is this good?" is unanswerable in isolation — you have no calibration, and your sense of quality
drifts toward whatever you have been staring at. "How does this differ from something known-good in
the same archetype?" is answerable, mechanical, and produces a fix list rather than a feeling.

### 5.0 It is not the highest-signal technique. It is the calibration technique.

This document used to open the section with "if you do one thing from this document, do this one."
That claim did not survive being checked against the document's own evidence.

Take §5.2's three differences — the canonical output — and ask which of them the earlier tests had
not already produced:

| Comparison difference | Already found by | Where |
|---|---|---|
| 1. Content starts at y=493 vs their 352 | `fold.mjs`, before any reference was opened | §9.1 geometry table |
| 2. Row title is the 4th-loudest thing in its row | blur-14 attention map | §9.2, ranked list |
| 3. 4 radius values and 5 hues vs their 2 and 2 | the counts | §9.2, `probe.mjs` census |

**Zero of three.** All three comparison findings are restatements of findings the transforms and the
counts had already delivered, and the §9.4 fix list traces every item back to blur-14, grayscale,
`fold.mjs` or the census — not to the reference. Re-running the whole protocol on a second build
(task-manager, 2026-09-10) reproduced the pattern: the comparison against GitHub produced no finding
the earlier tests had missed, and cost a network round trip, an archetype judgement and a second
census.

**What it does do, which nothing else does, is tell you where you are allowed to differ.** On that
second build the comparison's real output was *"you start content at y=124 where they start at
y=311, and 14 rows against their 8 — you are denser than the reference and that is correct for
triage-by-person."* That is not a finding; it is permission, and without it the density numbers
have no meaning at all. It is also the only test that stops you shipping a page that improved five
times and is still bad (§7).

So: run it, run it once, and run it **after** the transforms and the counts — as the thing that
ranks and sanity-checks your fix list, not as the thing that generates it. If you are budget-
constrained, blur-14 and `fold.mjs` are where the findings are.

### 5.1 Procedure

1. **Name the archetype** from [`../archetypes/`](../archetypes/). Ticket queue → `internal-utility`
   / `technical-productivity`. Get this right; comparing a dense ops tool against a consumer
   marketing page produces confidently wrong advice.
2. **Pick a reference you can render**, not one you remember. Products behind a login still work:
   their marketing tours, changelogs, docs and engineering blogs are full of real in-product
   screenshots. For this document we used GitHub's public issue list (fully measurable) plus
   Linear's product renders on `linear.app/plan`.
3. **Capture at the same width, same DPR, same day.** Different widths make every comparison lie.
4. **Look at them side by side**, then **run the same six counts (§3.5) on both.**
5. **Name the three biggest differences.** Exactly three. Ranked. Specific enough that each implies
   a code change.

### 5.2 The output shape

From the worked example, comparing Beacon v1 against GitHub's issue list at 1440×900:

> **1. They start the content at y=352; we start at y=493.** GitHub has no metric tiles at all — the
> counts live inline in the filter bar as `Open 1,010 · Closed 24,321`. We spent a 135px band plus a
> 32px gap on four numbers, and the numbers are not the job. 7 of their rows are visible; 5 of ours.
>
> **2. Their row title is 16px/600 and it is the loudest thing in the row. Ours is 14px/500 and it
> is the fourth-loudest**, behind the status pill, the priority pill and the avatar. Their row has
> exactly one strong element and everything else is 12px `#59636E` metadata; ours has four elements
> competing at similar weight.
>
> **3. They have 2 radius values and 2 accent hues; we have 4 and 5.** Their colored elements are
> user-defined labels (`Bug`, `Turbopack`) that carry real per-repo meaning. Ours are system enums
> rendered as filled pills, which means every row is a color chart with a title attached.

Every one of those three sentences is a diff a coding agent can act on. None of them is "theirs
feels more polished."

**Re-probed 2026-09-10, logged out: GitHub's content now starts at y=311, not 352, and 8 rows are
visible, not 7.** The design numbers held (gaps `4×152 / 8×83 / 16×27 / 12×3`, left spine
`x=321 ×212`, `:focus-visible` ×115 — all reproduced) but the *geometry above the list* did not,
because a logged-out visitor gets a marketing nav bar that a signed-in user does not. **Reference
geometry is auth-state dependent.** State which session you captured in, or two people running the
same comparison will disagree by 40px and neither will know why.

### 5.3 The three differences are almost always the same three

Across every comparison run for this corpus, the top-three list converges:

1. **Theirs is denser.** Content starts higher and rows are shorter.
2. **Theirs has fewer containers.** Often exactly one, where the generated version has five or six.
3. **Theirs has stronger contrast between levels and weaker contrast within them.** One loud thing
   per row, everything else quiet — instead of four things at medium volume.

If your three differences are not roughly these three, either you picked a reference from the wrong
archetype, or you are looking at surface (radius, shadow, palette) instead of structure.

### 5.4 When comparison misleads

- **Wrong archetype.** Comparing a healthcare clinical tool to Linear will push you toward a density
  that is dangerous when a nurse is reading a dosage at 3am.
- **Comparing to a marketing site instead of a product.** `linear.app/homepage` is a marketing page:
  its type scale, spacing and motion have nothing to do with Linear's actual issue list. Compare
  product to product. When only marketing renders are available, look *inside the product
  screenshot*, not at the page around it.
- **Copying the reference's decisions instead of its reasoning.** GitHub's 4px dominant gap is right
  for GitHub's information density. Transplanting 4px into a page with three fields per row makes it
  look cramped for no gain. Take the *ratio* and the *discipline*, not the number.
- **A reference that is famous rather than good at this.** Pick the product whose users do this task
  all day, not the product with the best brand.

---

<a id="6"></a>
## 6 — From critique to a ranked fix list

### 6.1 Fix structure before surface. Always.

```
1. Structure     what is on the page, what is prominent, what the layout is
2. Density       row heights, content start, spacing scale
3. Typography    scale, weights, contrast between levels
4. Content/copy  real strings, specific labels, empty and error text
5. States        the ones that don't exist yet
6. Color         palette discipline, accent spend, semantic mapping
7. Surface       radius, borders, shadows
8. Motion        last, and less than you think
```

**Why agents get this backwards.** Surface changes are one-line edits with a guaranteed visible
diff, they never break a test, and they feel like progress. Structural changes require deciding what
to delete, and deleting a component you already built reads as a loss. So the default behaviour is
to spend the entire budget on levels 6–8 — a new accent, a smaller radius, a softer shadow — on a
layout whose level-1 problem is untouched. Then re-render, see a page that is different but not
better, and repeat.

**The mechanical rule that prevents it:** *a level-6-through-8 change is not allowed while an
unresolved finding exists at levels 1–3.* If your fix list has a hierarchy finding open, you may not
touch a radius.

**Why it works in this order:** structure changes the frame every other decision sits in. Fixing the
color of a card you are about to delete is wasted work, and — worse — a well-tuned surface makes the
structural problem *harder to see*, because the page now looks deliberate.

### 6.2 Ranking within the list

Rank by **perceived-quality gain ÷ effort**, then break ties by level.

| Class of fix | Typical gain | Typical effort | Do it |
|---|---|---|---|
| Delete a whole region that isn't the job (metric band, hero, redundant panel) | **Very high** | Low — it's a deletion | First, always |
| Collapse N containers into 1 | High | Low | Immediately after |
| Raise the primary object one type level, drop everything else one | High | Low | Immediately after |
| Cut row height / content start | High | Medium | Next |
| Replace color-coded enums with shape + text | Medium-high | Medium | Next |
| Author the missing states | Medium-high | Medium-high | Next |
| Fix contrast failures | Medium | Very low | Anytime — it's mechanical |
| Add `:focus-visible` | Medium | Very low | Anytime |
| Tabular figures on numeric columns | Low-medium | Trivial | Anytime |
| Retune the palette | Low | Medium | Only after 1–5 |
| Adjust radius / shadow | Very low | Low | Last |

**Deletions outrank additions.** The single highest-leverage move available in most generated
interfaces is removing an entire region. In §9 the top fix was "delete the four KPI cards", which
was a net **−28 lines of code** and moved the content start from y=493 to y=134.

**The top three do most of the work.** In the worked example, findings 1–3 of 11 accounted for the
move from 4.4 to 7.6. Fixing the other eight moved it to 7.9. If you are budget-constrained, fix
three things at level 1–2 rather than eleven things at level 6–8.

### 6.3 The fix list format

```
#  LEVEL  finding (observable)                                  → fix                                  gain/effort
1  STRUCT KPI band: 135px + 32px gap, content starts y=493      → delete band; 3 counts inline in head  ★★★★★ / S
2  STRUCT 6 containers above fold; toolbar is its own card      → one list surface, header row          ★★★★☆ / S
3  HIER   30px ×5; subject 14px/500 is 4th loudest in its row   → subject 13px/500 as only strong item  ★★★★☆ / M
```

Every row carries the observable that justifies it. A fix list item with no observable is a
preference, and it will not survive the next agent that reads the code.

---

<a id="7"></a>
## 7 — The iteration loop

```
render → look (§3) → critique (§4) → fix highest-leverage (§6) → re-render →
compare against BOTH the previous shot AND the reference (§5)
```

**Compare against both.** Against the previous shot to confirm the change did what you intended.
Against the reference to confirm it went far enough. Improvement is not quality — a page can get
better five times and still be bad, and comparing only to your own last version guarantees you stop
too early.

### 7.1 Stopping rules

Stop when **all** of these hold:

- Every finding at levels 1–3 (structure, density, typography) is resolved or explicitly deferred
  with a reason.
- All four data states exist and were rendered.
- The 320px render has no content below the fold that should be above it, and no clipped values.
- Focus is visible, contrast passes, no color-only encoding.
- The three differences from the comparison test are now *defensible choices* rather than
  oversights — you can say why yours differs and be right.
- Vibecode score ≤2 ([`vibecode-rubric.md`](vibecode-rubric.md)) and craft score ≥7 with no
  dimension below 5.

**Stop early, not late, when:** you have made three consecutive changes that did not clearly improve
anything. That is the signature of surface fiddling on a structurally wrong layout. Go back to
level 1 and ask what should be deleted. This is the single most valuable stopping rule in the
document, because the failure it prevents is invisible from the inside — each individual change
seemed reasonable.

**Do not stop because:** you are tired of looking at it, the diff is large, the tests pass, or the
design system was followed.

### 7.2 What a healthy loop looks like

Passes get shorter and the findings get smaller. If pass 3 produces findings as large as pass 1, you
are not converging — you are churning, and the structure is still wrong.

In §9: pass 1 produced 11 findings, three of them structural. Pass 2 produced 5, none structural,
two of them **introduced by the pass-1 fixes**. Pass 3 produced 3, all minor. That is convergence.

### 7.3 New problems will appear

Fixing hierarchy creates new problems, and you must re-run the protocol, not just eyeball the diff.
In §9, tightening the type scale introduced a **3.42:1 contrast failure** on the new secondary text
color, and restructuring the desktop row left the mobile row at **130px** — taller than the version
it replaced. Both were found by re-running §3 and §2, and neither was visible in the diff.

---

<a id="8"></a>
## 8 — Self-deception traps

The ways an agent convinces itself its output is good. Each has a name, a tell, and a fix.

| Trap | The tell | The fix |
|---|---|---|
| **Judging the code** | Your critique contains the words "component", "props", "reusable", "clean" | If a sentence would still be true with every color and size changed, it is not a design finding |
| **Happy-path-only** | You rendered one screenshot | The §2 matrix. In §9, 5 of 11 findings came from the four extra states |
| **Desktop-only** | You rendered 1440 and stopped | 390 **and** 320. 390 hid the value that broke at 320 |
| **Fixture-sized data** | Your list has 6–8 rows | Render 25. Density tuned to a fixture is tuned to nothing |
| **Comparing to your last version** | "Much better than before" | Put the reference product's screenshot beside yours (§5). Improvement is not quality |
| **"It matches the design system"** | Consistency is your strongest scoring dimension | Beacon v1 scores 7/10 on consistency and is the bad version. Consistently mediocre is mediocre |
| **Accepting your own copy** | You wrote "Manage and resolve customer tickets efficiently." and moved on | Read every string as a stranger. Would a support lead say this out loud? |
| **The rubric as absolution** | You produced 14 scores and no fix list | The scores are not the deliverable. §6 is |
| **Fixing what's easy** | Your last three changes were radius, shadow, accent | The level rule in §6.1: no level 6–8 change while a level 1–3 finding is open |
| **Declaring done without rendering** | No image entered your context this session | Then you do not know what you built. This is not a metaphor |
| **Novelty as quality** | You added a gradient, a glow, or a signature animation to a queue | Ambition applied to nothing is nothing. See `vibecode-rubric.md` §3 |
| **Trusting your own five-second test** | You ran it after reading the markup forty times | You cannot un-know the layout. That is why §3's tests are transforms and counts, which do not depend on naive eyes |
| **The self-reported score** | Your score is a round number at the good end and no line in it carries a `::` observable | Evidence or no score (§4.1). In this corpus's own evaluation, **all four** treatment builds self-reported vibecode **1/10**; independent review of the renders put one of them at **2** — its selected row is a full-bleed saturated `#2358D8` bar, and its in-progress rows carry a left rail *and* a full amber fill: two marks for one status. Both are visible in one screenshot. Neither appeared in the self-score |
| **Believing your last screenshot** | You edited code after your most recent capture | Re-capture after *every* edit, including one-liners. A one-line change in this corpus shipped `Cannot access nf before initialization` and **blanked the entire page**; it was caught only because the agent re-screenshotted. A code review passes a blank page |
| **Critiquing your own test rig** | Your attention map's top finding is a toolbar you added to demo the states | Remove demo scaffolding before §3 (see §2.2). On the task-manager build the `position:fixed` demo bar is the **second-strongest mass at blur-14** and eats **45% of the 320px viewport** |
| **The dead interaction** | You screenshotted a state; you never asserted you were in it | A `<dialog>` in this corpus sat inside a `display:none` aside at phone width — tapping a school opened nothing. Invisible in source, invisible in a still of the *closed* state. Drive it and read back a string only the new state contains |
| **Redundancy scored as discipline** | You "simplified" a state down to a single mark, and the mark is a hue | Check it in grayscale before you delete the shape (§3.2). One mark per state is right; one *hue* per state is a WCAG 1.4.1 failure |

The five-second row deserves emphasis. **Self-critique is structurally compromised.** The transforms
(blur, grayscale, rotate) and the counts are load-bearing precisely because they produce evidence
that does not depend on your judgement. When the stakes are high, hand the screenshot to a fresh
context with no knowledge of the code and ask for three findings.

**And the self-reported row is the one this corpus has hard evidence for.** Four capable agents,
following this system, each scored their own work at the ceiling; the two defects an outside reader
found in ninety seconds were both *color decisions that felt like polish*. A score you gave yourself
with no observable attached is not a measurement, it is a mood — which is why §4.1 refuses it and
why §6 makes the fix list, not the number, the deliverable.

---

<a id="9"></a>
## 9 — Worked examples

**Brief:** "a ticket queue screen for a B2B support tool." Built the way a capable agent builds it
with no further instruction — the goal was a *credible* mediocre interface, not a strawman. It has
real domain content (`SAML login loops for @northwind.co users`, `VAT line renders but the amount
is zero on invoices issued after Sep 1`), derived data, sensible IA, and clean CSS. It scores **3**
on [`vibecode-rubric.md`](vibecode-rubric.md) — the content is genuinely specific.

It scores **4.4** on craft. That gap is the point of this document: content specificity and visual
craft are independent, and an interface can pass the anti-slop test and still be badly made.

Source, runnable: [`../examples/ticket-queue-critique/`](../examples/ticket-queue-critique/) —
`v1.html` (before), `v2.html` (after), and the four scripts of §10. Captured at 1440/390/320 plus
empty, one-item, long-text and focus states.

### 9.1 Capture log

```
T=examples/ticket-queue-critique/tools        # the four scripts of §10 live here
node tools/shot.mjs http://localhost:8971/v1.html --name v1  --widths 1440 --wait 1500
node tools/shot.mjs http://localhost:8971/v1.html --name v1m --widths 390
node tools/shot.mjs http://localhost:8971/v1.html --name v1s --widths 320
node $T/look.mjs  http://localhost:8971/v1.html v1 .cache/shots  # plain, blur6, blur14, gray, flip
node $T/fold.mjs  http://localhost:8971/v1.html "tbody tr"       # content start + clipping, 3 widths
node $T/probe.mjs http://localhost:8971/v1.html V1 1440          # computed-style census
node scratch/states.mjs                                          # empty, one-item, long text, Tab focus
```

Measured geometry:

| | 1440×900 | 390×844 | 320×844 |
|---|---|---|---|
| First data row top | **493px** | 770px | **909px** (below the fold) |
| Rows fully visible | 5 of 8 | 1 | **0** |
| Metric band height | 135px | 320px | 389px |
| Toolbar height | 74px | 178px | 230px |
| Table columns clipped | 0 | **644px** | **714px** |
| `1h 42m` | 1 line | 1 line | **2 lines, breaks mid-value** |

Computed-style census at 1440: **188 elements · 7 font sizes · 4 radius families (8px ×18, 50% ×18,
9999px ×16, 12px ×6) · 5 accent hues · 6 shadowed containers · 0 `:focus-visible` rules · 0 `:focus`
rules · 0 transitions · `line-height: normal` on the row title.**

### 9.2 The looking protocol, run

**Five-second test.** What I remembered: "four big numbers and a purple button." Not one ticket.
Hierarchy inverted.

**Blur-14 (attention map).** Ranked, strongest first: the indigo `+ New ticket` button; the two
vertical bands of colored status/priority pills; the column of blue avatar circles; the four equal
KPI values. The ticket subjects were fainter than all four. The card borders (`#E5E7EB` on
`#F9FAFB`) vanished completely — they cost six containers and contribute nothing perceptually.

**Blur-6 (grouping).** Grouping survives; the strongest vertical rhythm in the table is the avatar
column, not the title column. Decoration out-shouting content.

**Grayscale.** `Escalated` / `Open` / `Pending` / `Solved` → four identical pills. `Urgent` / `High`
/ `Normal` / `Low` → four more. Two columns to zero information. And the page reads *better*
desaturated. Both diagnoses at once: hue is the only encoding, and the encoding is also noise.

**Upside-down.** A 340px dead gutter in the title column while five columns crowd the right 40%.

**Left-edge scan.** `x=297 ×23`, `x=321 ×21`, `x=16 ×17`, then 30+ singletons. No spine.

**Counts.** 7 font sizes / 4 radius families / 5 accent hues / 6 containers / gap histogram
`6×16, 12×11, 10×9, 24×1, 8×1` with no dominant value.

**Optical centering.** *(Struck 2026-09-10.)* This pass reported `Urgent` sitting 2.75px low, `Open`
2.50px and `Escalated` 0.25px, and called it a misalignment. The numbers reproduce; the reading was
wrong — the spread is the descender in `g` and `p`, and the chips share a baseline. The test is cut;
see [Cut: the optical-centering check](#cut).

**States.**
- *Empty:* `Showing 0 of 0` in the panel header, `Page 1 of 39` in the pager with live
  Previous/Next, `All tickets 312` in the sidebar, `312` in the KPI. Four contradictory numbers.
  The remaining 55% of the viewport is chrome around nothing.
- *One item + long title:* row grows 70px → 87px. `.preview` has `max-width: 340px` and truncates;
  `.subject` has no rule at all.
- *Focus:* after 5 Tabs, `activeElement` is the `+ New ticket` button with
  `outline: 3px none rgb(255,255,255)` — a width with no style. Invisible.

**Contrast.** `.preview` `#9CA3AF` on white = **2.54:1** at 13px. `Low` pill `#9CA3AF` on `#F3F4F6`
= **2.31:1**. `+8.2%` `#059669` on white = **3.77:1**. Section labels `#9CA3AF` = 2.54:1.

**Comparison (GitHub issue list, 1440, same day).** The three differences are quoted in §5.2.

### 9.3 Scores

| Dimension | W | Score | Evidence |
|---|---|---|---|
| Hierarchy | 14 | **3** | `30px` on 5 elements; subject 14px/500 is 4th loudest in its own row |
| Density | 12 | **2** | First row y=493/900; 5 of 8 rows; below fold entirely at 320 |
| Product fit | 11 | **5** | Real content, generic structure. Sorted "newest first"; a support agent works by SLA |
| States | 9 | **1** | Empty state contradicts itself 4 ways; `Page 1 of 39` with 0 rows |
| Spacing & alignment | 8 | **4** | Gap histogram has no dominant; 30+ singleton left edges |
| Typography | 8 | **4** | 7 sizes; `line-height: normal` on the primary text element |
| Accessibility | 8 | **2** | 0 focus rules; 2.54:1 body-adjacent text; color-only status |
| Copy | 7 | **5** | Ticket titles excellent; "Manage and resolve customer tickets efficiently." is filler |
| Color | 6 | **3** | 5 accent hues; brand gradient; 8 filled pills per screen |
| Composition | 5 | **4** | 340px dead gutter; right-crowded columns |
| Responsiveness | 5 | **2** | 644px clipped at 390; value breaks mid-string at 320 |
| Consistency | 4 | **7** | Genuinely consistent — and see §8 |
| Interaction depth | 3 | **1** | 0 transitions, 0 focus rules, one state per element |
| Originality | 2 | **1** | Nothing distinctive (not a deduction, just no credit) |

**Weighted: 3.4.** Rounded up to **4.4** after crediting that the content and IA are genuinely good
and would survive the rework — the score most people would give this page on a glance is 7, which is
the whole problem.

### 9.4 The fix list

```
#   LEVEL   finding                                                     → fix                                                gain/effort
1   STRUCT  KPI band 135px + 32px gap; content starts y=493 (55%)       → delete; 3 live counts inline in the header strip   ★★★★★ / S
2   STRUCT  6 bordered containers above fold; toolbar is its own card   → one list surface; header + filter rows, no cards   ★★★★☆ / S
3   HIER    30px ×5; subject is the 4th-loudest thing in its own row    → subject 13px/500 as the row's only strong element  ★★★★☆ / M
4   DENS    70px rows, 8 of them, 430px of dead space below             → 36px rows, render 20; group by SLA bucket          ★★★★☆ / M
5   FIT     sorted "newest first"; no SLA anywhere                      → sort by SLA due; add an `SLA due` column           ★★★★☆ / M
6   COLOR   8 filled pills/screen; grayscale kills 2 columns            → status = ring/dash/fill/check glyph; priority =    ★★★☆☆ / M
                                                                          3-bar glyph; color only on breach                  
7   STATE   empty state contradicts itself 4 ways                       → author empty; pager hidden at 0; counts from data  ★★★☆☆ / M
8   A11Y    0 focus rules; `outline: 3px none`                          → `:focus-visible` 2px solid #1F6FEB, offset 1px     ★★★☆☆ / XS
9   A11Y    2.54:1 preview, 2.31:1 Low pill, 3.77:1 delta               → secondary ≥4.5:1; delete the Low pill entirely     ★★★☆☆ / XS
10  RESP    644px clipped at 390; value breaks at 320                   → mobile row reflows to 2 lines; no h-scroll         ★★★☆☆ / M
11  TYPE    `line-height: normal`; 7 sizes                              → 13/12/11 + one 14 for the page label; set lh       ★★☆☆☆ / S
```

Note what is **not** on this list: the accent color, the radius, the shadow, the font. Those are the
things it would have been most comfortable to change.

### 9.5 Pass 2 — re-render, re-look

Fixes 1–11 applied ([`v2.html`](../examples/ticket-queue-critique/v2.html)).

| | v1 | v2 | Reference (GitHub) |
|---|---|---|---|
| First data row @1440 | 493px | **134px** | 352px |
| Rows fully visible | 5 | **19** | 7 |
| Row height | 70px | **36px** | 42–66px (content-driven) |
| Containers above fold | 6 | **1** | 1 |
| Font sizes | 7 | **4** (12 ×96, 13 ×51, 11 ×8, 14 ×1) | 6 |
| Radius families | 4 | **2** (5px, circles) | 2 |
| Accent hues | 5 | **3** (red 7×, amber, green 3×) | 2 |
| `:focus-visible` rules | 0 | 1 (global) | 115 |
| Shadows | 6 | **0** | 3 |
| Table clipped @390 | 644px | **0** | — |

**Blur-14 on v2:** the subject column is now the dominant mass; the only darker object is the
110×26 `New ticket` button. Attention map matches intent.

**Five new findings, two of them introduced by the fixes:**

```
P2-1 A11Y  NEW  --ink-3 #8A8A93 on #FFF = 3.42:1, used for the row description and Updated column
                → #6E6E78 (5.04:1 on white, 4.83:1 on the #FAFAFA group header). Introduced by fix 3.
P2-2 RESP  NEW  mobile row = 130px @390 — taller than v1's. Requester/assignee/SLA each got a line
                → one meta line: "Dana Mireles · Priya N. · −34m". Introduced by fix 10.
P2-3 RESP       filter chip row clips at 390 with no scroll affordance
P2-4 COLOR      #B42318 means both "SLA breached" and "unassigned" — one hue, two meanings
P2-5 HIER       group headers (12px/500 on #FAFAFA) vanish at blur-14; they are the list's
                navigational spine and should be the second-strongest thing on the page
```

**Scores after pass 2:** Hierarchy 8 · Density 8 · Product fit 8 · States 6 · Spacing 7 ·
Typography 8 · Accessibility 5 *(P2-1)* · Copy 8 · Color 7 · Composition 7 · Responsiveness 5
*(P2-2, P2-3)* · Consistency 8 · Interaction 6 · Originality 5. **Weighted: 7.1.**

Findings 1–3 of the original eleven produced most of that movement. Findings 8, 9 and 11 — the
cheap mechanical ones — cost four minutes together and were worth doing, but they are not why the
page changed.

**Pass 3** would fix P2-1 through P2-5 (all mechanical, none structural), which is the shape of
convergence described in §7.2. The right call after pass 3 is to stop: no finding at levels 1–3
remains open, the comparison differences against GitHub are now defensible (v2 is *denser* than
GitHub, correctly, because a support agent triages by SLA and needs the whole bucket in view), and
further passes would be surface fiddling.

### 9.6 What the worked example proves

- **Content quality and visual craft are independent.** v1's copy would pass any anti-slop check.
  Its craft score was 3.4.
- **Half the findings required states nobody renders.** Empty, one-item, long-text, focus and 320px
  produced findings 7, 8, 9, 10, 11 and the truncation bug.
- **The top three fixes did most of the work,** and all three were deletions or demotions.
- **Fixing things creates things to fix.** Two of five pass-2 findings were introduced by pass-1
  fixes, and neither was visible in the diff — only in a re-render.

### 9.7 Second run: the method against a build this corpus calls good

The worked example above is a build made to be critiqued. That is a soft test — a method can look
sharp on a strawman and find nothing on real work. So on **2026-09-10** the whole protocol was run,
end to end, against
[`../examples/evaluation-builds/task-manager/`](../examples/evaluation-builds/task-manager/): the
treatment build from
[`../evaluation/results/2026-09-control-vs-treatment.md`](../evaluation/results/2026-09-control-vs-treatment.md),
produced by an agent following this system, and one of the four the evaluation holds up as the
library working. Archetype `technical-productivity`. Reference: GitHub's issue list, same day.

**Capture:** 1440 / 390 / 320, plus first-run empty, filtered-empty, loading, error, and a 12-press
Tab walk. `look.mjs`, `fold.mjs`, `probe.mjs`, `inkbox.mjs` all run.

**Census @1440:** 350 elements · **4** font sizes (12 ×126, 13 ×56, 15, 17) · 2 radius families ·
4 hues · 1 shadowed container · 3 `:focus-visible` + 2 `:focus` rules · transitions scoped to
`background-color`/`border-color`, never `all` · first row at **y=124**, 14 of 28 rows visible. By
every count in §3.5 this is a well-made page, and it is.

**The protocol found six things anyway:**

```
#  LEVEL   finding (observable)                                              → fix                                         via
1  HIER    blur-14 rank: (1) the selected row — a full-bleed #2358D8 fill    → selection = 2px left rail + #EDF1FC tint;   blur-14
           across the full content width, (2) demo bar, (3) two amber           reserve the saturated fill for :focus
           bands, (4) New task, (5) the task titles. Selection outranks
           every title, and the selected row is an *unassigned* task
2  COLOR   in-progress carries a 3px #E29B33 inset rail AND a #FFF6E9        → keep the rail, drop the fill                grayscale
           full-row fill — two marks for one status
3  A11Y    `waiting 3d` is #B3261E text with no glyph; in grayscale it is    → add the blocked dot to the right column      grayscale
           identical to `1d est`. Right column drops to one meaning             or set the string in 500 weight
4  RESP    @320 the group-header name loses a flex fight with its own meta   → meta wraps below the name under 380px       fold.mjs
           string: `Ilya Petrov` = 65px of text in a **4.4px** box;
           `Marguerite Delacroix-Bell` = 159px in **39px**
5  DENS    @390/320 first row at y=292 of 844 (35%) vs y=124 of 900 on       → collapse the filter row into the header     fold.mjs
           desktop; 5 rows visible against 14
6  STATE   the first-run empty state renders four skeleton bars *above*      → skeleton belongs to loading only            state capture
           "Nobody has anything on yet" — a loading artifact in a
           non-loading state
```

Findings 1 and 2 are the two the evaluation's own honest-limitations section reached by eye
(*"its selected row is a full-bleed saturated blue bar… two marks for one status"*). **The protocol
reproduced both from a single blurred screenshot and a single desaturated one, without knowing they
were there** — which is the strongest evidence in this document that the transforms work. Findings
3–6 are new; none of them is visible at 1440 in color on the populated state, which is the only
capture most agents take.

**Craft: 7.5.** Hierarchy 7 *(finding 1)* · Density 8 · Product fit 9 · States 7 *(6)* · Spacing 8 ·
Typography 9 · Accessibility 6 *(3)* · Copy 9 · Color 6 *(1, 2)* · Composition 7 · Responsiveness 6
*(4, 5)* · Consistency 8 · Interaction 7 · Originality 5. Vibecode **2**, matching the evaluation's
outside review and not the build's self-reported **1**.

**What the run says about the method.** The fix list is specific, every row carries an observable,
and the top item is structural — so the method is not producing mush on real work. But the yield
was concentrated: **blur-14, grayscale and `fold.mjs` produced all six findings between them.** The
comparison against GitHub produced none (§5.0), the flip produced none, the left-edge histogram
produced none, and the optical-centering check produced a false one. That distribution is why §3 is
now seven tests instead of nine.

---

<a id="10"></a>
## 10 — The scripts

Four small scripts cover everything in §3. Write them to your scratch directory and run them; none
needs a dependency beyond the Playwright the corpus tools already use.

### `look.mjs` — the transform set

```js
// node look.mjs <url> <name> [outDir]   → name-{plain,blur6,blur14,gray,flip}.png
import { execSync } from 'node:child_process'; import { createRequire } from 'node:module';
const { chromium } = createRequire(execSync('npm root -g').toString().trim()+'/')('playwright');
const [url, name, outDir='shots'] = process.argv.slice(2);
(await import('node:fs')).mkdirSync(outDir, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
await p.goto(url, { waitUntil:'networkidle' }).catch(()=>{});
await p.waitForTimeout(2500);
for (const [k,f] of Object.entries({ plain:'', blur6:'blur(6px)', blur14:'blur(14px)', gray:'grayscale(1)' })) {
  await p.evaluate(f => { document.documentElement.style.filter = f; }, f);
  await p.screenshot({ path:`${outDir}/${name}-${k}.png` });
}
// flip: rotate the IMAGE, never the DOM (§3.3 — rotating body relocates sticky/fixed
// chrome and, on any page taller than the viewport, captures a different slice entirely)
await p.evaluate(() => { document.documentElement.style.filter=''; });
const png = 'data:image/png;base64,' + (await p.screenshot()).toString('base64');
const h = await b.newPage();
const flipped = await h.evaluate(async u => {
  const img = new Image(); img.src = u; await img.decode();
  const c = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height });
  const x = c.getContext('2d'); x.translate(img.width, img.height); x.rotate(Math.PI);
  x.drawImage(img, 0, 0); return c.toDataURL('image/png');
}, png);
(await import('node:fs')).writeFileSync(`${outDir}/${name}-flip.png`,
  Buffer.from(flipped.split(',')[1], 'base64'));
await b.close();
```

Strip demo scaffolding first (§2.2) — every one of these five images scores it otherwise.

### `probe.mjs` — the computed-style census

Dumps the six counts of §3.5 plus focus-rule counts, transitions, `:root` custom properties and the
left-edge histogram. Full source is long; the essential loop:

```js
const els = [...document.querySelectorAll('body *')].filter(e => {
  const r = e.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; });
const bump = (m,k) => m.set(k,(m.get(k)||0)+1);
const fs=new Map(), gaps=new Map(), radii=new Map(), lefts=new Map(), bgs=new Map();
for (const e of els) {
  const s = getComputedStyle(e), r = e.getBoundingClientRect();
  if ([...e.childNodes].some(n => n.nodeType===3 && n.textContent.trim().length>1)) bump(fs, s.fontSize);
  if (/flex|grid/.test(s.display) && s.rowGap !== 'normal' && parseFloat(s.rowGap) > 0) bump(gaps, s.rowGap);
  if (parseFloat(s.borderTopLeftRadius) > 0) bump(radii, s.borderTopLeftRadius);
  if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') bump(bgs, s.backgroundColor);
  if (r.width > 40 && r.top < 2000) bump(lefts, Math.round(r.left));
}
const top = (m,n=14) => [...m].sort((a,b)=>b[1]-a[1]).slice(0,n).map(([k,v]) => `${k} ×${v}`);
```

Read the output as a diagnosis, not a dump: *one* dominant gap value is health; five equal ones are
"spacing was never decided". For radii, apply the counting rule in §3.5 before you judge the
number — raw distinct values are not comparable between pages (GitHub renders seven; two are
families).

### `inkbox.mjs` — ink-box measurement *(demoted 2026-09-10)*

Screenshots one element at 4× and reports the gap above its ink versus below it. It still ships in
`../examples/ticket-queue-critique/tools/`, but it is no longer part of the protocol, because
`above − below` is not a centering measurement — it is dominated by whether the string has a
descender. Controlled: `HAMBOX` reads 8.25/6.75, `HAMBOXg` reads 8.25/4.75. Same cap top, 2px of
"sits low" that is entirely the `g`. See [Cut: the optical-centering check](#cut).

If you run it: read the **ink top only** (that is the cap top, and it is stable to ~0.5px across
strings), derive the baseline from a descender-free string in the same style, and centre the cap
band, not the ink box. The `< 200` luma threshold assumes dark text on a light chip — invert it for
dark mode, raise it for mid-gray text.

### `fold.mjs` — where the content starts, and what is silently clipped

The single most useful number in the whole protocol, at three widths — plus an automatic detector
for content wider than its own clipping box, which is how a table loses six columns without
telling anyone:

```js
// node fold.mjs <url> [rowSelector]
for (const [w,h] of [[1440,900],[390,844],[320,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h}, isMobile:w<600, hasTouch:w<600 });
  await p.goto(url, { waitUntil:'domcontentloaded' }); await p.waitForTimeout(1500);
  console.log(`${w}\u00d7${h}`, await p.evaluate(([h, sel]) => {
    const rows = [...document.querySelectorAll(sel)].map(r => r.getBoundingClientRect());
    const doc = document.documentElement;
    return {
      firstRowTop: rows.length ? Math.round(rows[0].top) : null,
      rowsFullyVisible: rows.filter(r => r.top >= 0 && r.bottom <= h).length,
      hOverflow: Math.max(0, doc.scrollWidth - doc.clientWidth),
      clipped: [...document.querySelectorAll('*')]
        .filter(e => { const s = getComputedStyle(e);
          return /auto|scroll|hidden/.test(s.overflowX) && e.scrollWidth - e.clientWidth > 24; })
        // required — without it, .vh/.sr-only text is reported as a clipped column (§3.4)
        .filter(e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e);
          return r.width > 24 && r.height > 8 && s.visibility !== 'hidden'
              && s.clip === 'auto' && !/inset\(50%\)/.test(s.clipPath); })
        .slice(0,4).map(e => `${e.tagName.toLowerCase()}.${(e.className||'').toString().split(' ')[0]} +${e.scrollWidth-e.clientWidth}px`),
    };
  }, [h, rowSel]));
  await p.close();
}
```

Real output for the worked example — three widths, one command, four findings:

```
1440x900 {"firstRowTop":493,"rowsFullyVisible":5,"hOverflow":0,
          "clipped":["div.preview +68px","div.preview +141px", ...]}
390x844  {"firstRowTop":770,"rowsFullyVisible":1,"hOverflow":0,
          "clipped":["div.panel +644px", ...]}
320x844  {"firstRowTop":909,"rowsFullyVisible":0,"hOverflow":0,
          "clipped":["div.panel +714px", ...]}
```

Note `hOverflow: 0` at every width while `div.panel` hides 644px. **A document-level overflow check
passes on a page that is silently eating half its columns** — the clipping is inside an
`overflow: auto` container, which is exactly where it hides. This is why the detector looks at every
element rather than at `document.scrollWidth`.

All four scripts, runnable, are in
[`../examples/ticket-queue-critique/tools/`](../examples/ticket-queue-critique/tools/). `look.mjs`
and `fold.mjs` carry the 2026-09-10 corrections (image-space flip; visually-hidden filter); every one
of the four was executed against two live interfaces on that date, not read.

---

## The honest report

When you hand the work back, say what you actually rendered and what you actually found:

> Rendered v2 at 1440/390/320 plus empty, one-item, long-text and Tab-focus states
> (`.cache/shots/`). Ran blur-6/blur-14/grayscale/flip and the computed-style census. Craft score
> **7.1**, up from 3.4; vibecode **2**. The three structural fixes — deleting the metric band,
> collapsing six containers to one, and demoting the page title so the ticket subject wins its row —
> moved content start from y=493 to y=134 and visible rows from 5 to 19. Two findings remain open,
> both introduced by those fixes: secondary text is at **3.42:1** (needs `#6E6E78`) and the mobile
> row is **130px** where it should be ~78px. Not checked: dark mode (not implemented), 200% zoom,
> screen reader.

Not: "I've created a clean, modern interface with a polished design system."

---

**See also:** [`vibecode-rubric.md`](vibecode-rubric.md) for generation risk (0 is best — the other
direction) · [`remedies.md`](remedies.md) for before/after code on the specific tells ·
[`../system/7-critique.md`](../system/7-critique.md) for the short in-flow version of this loop ·
[`../craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md) and
[`../craft/space-and-layout.md`](../craft/space-and-layout.md) for the underlying craft.

---

## Adversarial pass (2026-09)

Run 2026-09-10. The brief was to break the file, not to endorse it: execute the whole protocol on an
interface it had never seen, run every script rather than read it, and cut anything that did not
earn its place. Target build:
[`../examples/evaluation-builds/task-manager/`](../examples/evaluation-builds/task-manager/) served
at `localhost:8971`. Reference: GitHub's issue list, re-probed the same day. Everything below is
either a command that ran or a number that came back.

### Changed

- **Cut the optical-centering check** (was §3.6), and demoted `inkbox.mjs` out of the protocol. Its
  measurements reproduce exactly; its interpretation is wrong. Controlled test, one 24px chip:
  `HAMBOX` → ink top 8.25 / bottom 6.75; `HAMBOXg` → **8.25** / 4.75. The cap top does not move — the
  entire reported 1.25–3.50px "sits low" spread is the descender in `g` and `p`. `Urgent`, `Open` and
  `Pending` carry descenders; `Escalated`, `Normal`, `Solved` and `Low` do not, and that is the whole
  of the pattern. Measured on the cap band the real offset is ≈0.75px, below the threshold the
  section itself called imperceptible, and the prescribed asymmetric-padding fix would have created
  the misalignment it claimed to find. Kept as a labelled cut so it is not reinstated.
- **Fixed the upside-down test** (§3.3) and `look.mjs`. `document.body.style.transform =
  'rotate(180deg)'` is broken on real layouts: on the target build `body` is **1689.5px** tall in a
  900px viewport, so the rotated capture shows original y≈790–1690 — the bottom of the page — and the
  `position:sticky` sidebar moves from `{top:0,left:0}` to `{top:789.5,left:1208}`, off-screen. Both
  verified by measuring `getBoundingClientRect()` before and after. Replaced with a canvas rotation of
  the captured PNG, which preserves the exact slice; re-ran and confirmed.
- **Fixed `fold.mjs`'s clipping detector** and documented the filter (§3.4, §10). Unfiltered it
  reported `h2.vh +34px` and `label.vh +180px` at 1440 on the target build — 2 of 2 false — and 3 of 4
  false on GitHub. All were the standard `.vh`/`.sr-only` 1px box. With the filter, 1440 returns zero
  and 320 returns the one real finding.
- **Demoted the comparison test** from "the highest-signal technique in this document" to the
  calibration technique (§5.0). Evidence is internal: all three of §5.2's canonical differences
  restate findings §9.1 and §9.2 had already produced with `fold.mjs`, blur-14 and the census —
  zero of three were new. The second run reproduced this: the GitHub comparison added no finding.
  What it *does* do, and nothing else does, is license a deviation — it is how you learn your density
  is correctly *higher* than the reference.
- **Merged the left-edge scan into the counts** (now six counts, §3.5) and **promoted `fold.mjs` to
  a numbered step** (§3.4). Nine tests became seven. `fold.mjs` had been the single most productive
  measurement in the protocol while living only in §10 and being absent from §9.1's capture log.
- **Gave the radius count a stated rule.** GitHub renders **seven** distinct radii today (6px ×67,
  9999px ×42, 24px ×5, 3px ×2, 20px ×2, 50% ×2, 4px ×1); the file credited it with "2" while marking
  Beacon v1's "4" as a defect. Rule now stated: rectangular values occurring ≥3 times, all round
  values as one family. This also reconciles the "10 → 4 / 10 → 3" radius numbers in
  [`../evaluation/results/2026-09-control-vs-treatment.md`](../evaluation/results/2026-09-control-vs-treatment.md),
  which are distinct values, not families.
- **Reconciled §3.1 with §8.** The five-second test was step one of a protocol whose own trap list
  says you cannot run it on your own output. It is now a precondition inside the squint test, with
  the fresh-context escape hatch named.
- **Fixed §9.1's capture log**, which invoked `scratch/focus.mjs` and `scratch/states.mjs` — neither
  exists anywhere in the corpus — while omitting `fold.mjs`.
- **Added three verified capture traps** (§2.2, §2.3): `shot.mjs --click` swallows a non-matching
  selector via `.catch(() => {})` and writes the default view with an exit code of 0 (verified with
  `--click "#definitely-not-here"`); the §2.3 script's `tbody`/`.subject` selectors throw a
  `TypeError` and kill the run on any page without them (verified), now guarded with `?.`; and demo
  scaffolding must be stripped before §3, because the target build's `position:fixed` demo bar is the
  second-strongest mass in its own blur-14 attention map and eats 45% of the 320px viewport.
- **Added five self-deception traps** (§8) with corpus evidence behind each: the self-reported score
  (all four treatment builds claimed vibecode 1; outside review found a full-bleed saturated selection
  bar and two marks for one status on one of them), believing your last screenshot (a one-line edit
  shipped `Cannot access nf before initialization` and blanked a whole page, caught only by
  re-screenshotting), critiquing your own test rig, the dead interaction, and redundancy scored as
  discipline.
- **Added §9.7**, the full second run with its six-item fix list and scores.

### Verified and could not shake

- **The transforms carry the method.** Blur-14, grayscale and `fold.mjs` produced all six findings on
  the second run, including both defects an independent human reviewer had found by eye — from a
  blurred PNG and a desaturated one, with no prior knowledge that they were there.
- **The evidence-line rule (§4.1) and the level rule (§6.1).** Every finding in the second run wrote
  itself into `<DIM> <score> <where> :: <observable>` without strain, and the ranking fell out of the
  level order unchanged.
- **The GitHub design numbers.** Re-probed same day: gaps `4×152 / 8×83 / 16×27 / 12×3`, left spine
  `x=321 ×212`, `:focus-visible` ×115 / `:focus` ×149 — all reproduced, some byte-for-byte. This is
  `START-HERE.md`'s "design numbers age well" claim holding under test.
- **`hOverflow: 0` while a container hides hundreds of pixels.** Reproduced on both builds. The
  document-level overflow check really is useless on its own.
- **The §9 ticket-queue numbers.** `inkbox.mjs` against `v1.html` returned `Urgent` 2.75 / `Open` 2.50
  / `Escalated` 0.25 — the §9.2 figures exactly. The measurements were never the problem.

### Could not verify

- **GitHub's y=352 content start.** Logged out it is **y=311** with 8 rows visible, not 7. The 41px is
  the marketing nav a signed-out visitor gets. Recorded as an auth-state caveat in §5.2 rather than
  overwritten, because the original may well be correct for a signed-in capture — but neither reading
  is reproducible without stating the session.
- **The Linear `linear.app/plan` measurements** in §3.2 (segmented ring, dashed ring, bar glyph). Not
  re-rendered this pass; the claim is plausible and structurally load-bearing, but it is the one
  reference value here now standing on a single observation.
- **The §9 pass-2 and pass-3 numbers** (craft 7.1, the five P2 findings). `v2.html` exists and renders,
  but the pass was not re-run end to end; only `v1.html` was re-measured.
- **Dark mode, 200% zoom and screen-reader behaviour on either build.** The capture matrix lists dark
  mode; neither example implements it, so row 11 of §2.1 has never actually been exercised in this
  document.

### The one thing that should not be cut

This file should stay long. Every attempt to compress a step here removed the measured value that
makes it usable — the `1689.5px` that proves the flip is broken, the `HAMBOX`/`HAMBOXg` pair that
proves the descender confound, the `4×152 / 8×83` that makes "a real spacing scale" mean something.
A short version of this document is `system/7-critique.md`, and it already exists. What was cut here
was cut for being wrong, not for being long.
