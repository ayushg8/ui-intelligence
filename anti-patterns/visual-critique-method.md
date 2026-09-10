# How to critique a rendered interface

**The method for judging pixels instead of code.** An agent that reviews its own JSX and concludes
the interface is good has evaluated the wrong artifact. Hierarchy, rhythm, balance, density and
"does this look right" are perceptual facts about a rendered image. They are not visible in the
source, they are not visible in a component tree, and they are not visible in a design-token file.

**Evaluated:** 2026-09 · Every number below came out of a live render — Playwright computed styles,
element geometry, or pixel analysis of a 2×/4× screenshot. The worked example in §9 is a real build
captured at three widths in five states. Reference values were measured from GitHub's issue list,
Linear, and Stripe on the same day. Nothing here is recalled.

**This instrument runs the opposite direction from
[`vibecode-rubric.md`](vibecode-rubric.md).** There, 0 is the goal (no generation tells). Here, 10
is the goal (high craft). They measure different things and a page can score well on one and badly
on the other — the worked example below scores **3** on vibecode risk (its content is specific and
real) and **4.4** on craft. Always say which instrument a number came from.

---

## Contents

1. [Why looking is a separate skill from reading](#1)
2. [What to render and capture](#2)
3. [The looking protocol — nine tests](#3)
4. [The critique rubric — 14 anchored dimensions](#4)
5. [Comparative critique — the highest-signal technique](#5)
6. [From critique to a ranked fix list](#6)
7. [The iteration loop, and how to know when to stop](#7)
8. [Self-deception traps](#8)
9. [Worked example: a support ticket queue, start to finish](#9)
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
for (let i=0;i<5;i++) await p.keyboard.press('Tab');
console.log(await p.evaluate(() => { const e=document.activeElement, s=getComputedStyle(e);
  return { on:e.tagName+':'+e.textContent.trim().slice(0,24),
           outline:`${s.outlineWidth} ${s.outlineStyle} ${s.outlineColor}`, shadow:s.boxShadow }; }));
await p.screenshot({ path:'.cache/shots/focus.png', clip:{x:0,y:0,width:1440,height:420} });

// empty — mutate the DOM rather than building a fixture route
await p.evaluate(() => { document.querySelector('tbody').innerHTML=''; });
await p.screenshot({ path:'.cache/shots/empty.png' });

// longest realistic string
await p.evaluate(() => { document.querySelector('.subject').textContent =
  'Webhook retries stop after 3 attempts and the delivery.failed event is never re-queued'; });
await p.screenshot({ path:'.cache/shots/long.png' });
await b.close();
```

`outline: 3px none` is the signature of `outline: none` plus a reset that set a width and never a
style. It reports a width, so a naive check passes. Assert on the **style**, not the width.

---

<a id="3"></a>
## 3 — The looking protocol, nine tests

Run them in this order. Early tests catch structural problems; running the late ones first means
polishing a layout you are about to throw away.

Every test below has three parts: **what it diagnoses**, **how to run it**, and **when it lies**.
The last part matters — each of these tests has a domain where it gives the wrong answer, and an
agent that applies all nine everywhere will make some interfaces worse.

### 3.1 The five-second test — *is the hierarchy inverted?*

Look at the 1440 render for five seconds. Look away. Write down what you remember, before looking
again.

You should remember the primary object and the primary action. If you remember the nav, the header,
the filter bar, a gradient, or "there were some cards", the hierarchy is inverted and no amount of
color will fix it.

**When it lies:** on a dense professional tool used six hours a day, "I remember a wall of rows"
is the *correct* answer, not a failure. Linear's issue list and a Bloomberg terminal both fail a
naive five-second test and both are right. Ask "did I remember the content or the furniture," not
"was one thing memorable."

### 3.2 The squint test — *what does the eye hit first?*

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

**When it lies:** on an editorial or marketing page where one enormous headline is supposed to win,
blur-14 will show you a single dark mass and nothing else, and that is correct. And on a
deliberately quiet interface (a reading view, a form), everything blurring to soft gray is the
design, not a defect — check the 6px grouping read instead.

### 3.3 The grayscale test — *is color doing structure's job?*

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

**When it lies:** on a data visualization, categorical color *is* the encoding, and grayscale
correctly destroys it. On a brand or marketing surface, "looks calmer in grayscale" is not a
finding — of course it does. Restrict this test to functional UI.

### 3.4 The upside-down test — *composition without reading*

```js
await p.evaluate(() => { document.body.style.transform = 'rotate(180deg)'; });
```

Rotating removes your ability to read, which removes your ability to rationalise. What is left is
mass, gutter and balance. This is the test that finds the problems you have stopped seeing.

What it surfaced in the worked example: the table's five right-hand columns are crushed into the
right 40% of the width while the ticket-title column carries a 340px dead gutter, because the
subject text was capped by `max-width` and the columns were auto-sized. Right-side-up, you read the
titles and never notice; upside-down it is an obvious lopsided band.

**When it lies:** it says nothing about hierarchy or typography, only about composition and
balance. Do not try to score type from it.

### 3.5 The left-edge scan — *is alignment sloppy?*

Run your eye down the left edge of a column region and count distinct x-positions. More than three
or four in one column means alignment was never decided. This is the fastest way to find the small
misalignments that read as "unfinished" without ever being individually noticeable.

Do it numerically rather than by eye — the script in §10 dumps a histogram of `getBoundingClientRect().left`:

| Page | Dominant left edges | Reading |
|---|---|---|
| **GitHub issues, 1440** | `x=321 ×213`, `x=281 ×72`, `x=364 ×37`, `x=48 ×25` | Three strong spines. 213 elements share one x. |
| **Beacon v1, 1440** | `x=297 ×23`, `x=321 ×21`, `x=16 ×17`, then **30+ singletons** | No spine. Every table cell invented its own edge. |

**The caveat everyone omits:** right-aligned numeric columns *legitimately* produce a different
left edge per row, because the digits are different widths. Run the left-edge scan on left-aligned
content only, and run a **right**-edge scan on numeric columns. A numeric column whose right edges
vary is the real bug there, and it means you forgot `font-variant-numeric: tabular-nums`.

### 3.6 The optical-centering check — *do the labels sit on the line?*

`align-items: center` centers the **line box**, not the letters. The line box includes the font's
full ascent and descent, which is taller than the visible glyphs and asymmetric around them. So
every flex-centered label in a fixed-height chip sits slightly low — and by an amount that
**changes with the string**, which is what makes it visible.

Measured on an isolated 24px chip, 12px/500 system font on white, by screenshotting each chip at 4×
and finding the bounding box of its ink (script in §10):

| String | gap above ink | gap below ink | sits low by |
|---|---|---|---|
| `Urgent` | 8.25px | 4.75px | **3.50px** |
| `Open` | 8.25px | 4.75px | **3.50px** |
| `Pending` | 7.75px | 4.75px | 3.00px |
| `Escalated` | 8.00px | 6.75px | 1.25px |
| `Normal` | 8.00px | 6.75px | 1.25px |
| `Solved` | 8.00px | 6.75px | 1.25px |
| `Low` | 8.25px | 6.75px | 1.50px |

The cap-top gap is stable at 7.75–8.25px across all seven. The bottom gap is what moves: strings
with a descender (`g`, `p`) push the ink 2px lower. **Consequence: two chips in the same table row
are never on the same optical line — `Escalated` and `Urgent` sit 2.25px apart vertically.** At
32px/14px the same effect measured 2.00px (`Save`) to 4.25px (`Apply`) — a 2.25px spread again.

Fixes, in order of preference:
1. `text-box: trim-both cap alphabetic` (Chrome 133+) — trims to cap-height and baseline, which is
   what the eye actually centers on. Needs a fallback.
2. `line-height: 1` on the label plus an explicit 1px asymmetric padding (`padding: 0 10px 1px`).
3. Give the chip a fixed height and set `padding-bottom` 1px less than `padding-top`. Crude, works.

**Contradicting the usual advice:** most writing on optical centering is about *horizontal* padding
around icons. We measured 40 buttons across GitHub, Stripe and Linear at 1440: horizontal padding
asymmetry was **0px on every one of them** except two Linear sidebar section headers. Nobody is
nudging button padding by 2px any more. The vertical line-box problem is the one that is still
everywhere, still visible, and almost never mentioned.

**When it lies:** at 16px and above in a generously-sized container the 1–2px offset is below
perception. This matters at chip, badge, small-button and table-cell scale, not on a hero.

### 3.7 Count things — *five counts, sixty seconds*

Judgement is unreliable across sessions; counts are not. Take these five numbers on every render
and on the reference product you are comparing against (§5):

| Count | Healthy | Worked example v1 | GitHub issues |
|---|---|---|---|
| **Distinct font sizes** | 4–6 | 7 (14/12/13/30/11/16/18) | 6, with `12px ×200` dominant |
| **Distinct border-radius values** | 1–2 families | **4** (8px ×18, 50% ×18, 9999px ×16, 12px ×6) | 2 (6px ×68, pill ×43) |
| **Distinct accent hues** | 1, plus semantics that are present | **5** (indigo, blue, green, red, amber) | 2 (blue link, red state) + user-defined labels |
| **Bordered/shadowed containers above the fold** | as few as the content needs | 6 | 1 |
| **Gap-value histogram** | one dominant value, then halves/doubles | 6×16, 12×11, 10×9, 24×1, 8×1 — no dominant | 4×152, 8×83, 16×27, 12×3 |

The gap histogram is the most diagnostic single number in the table. A real spacing scale looks
like GitHub's: one value used 152 times, its double used 83 times, its quadruple 27 times. Five
values with no winner means spacing was decided per component, which is what "it looks a bit loose"
actually is.

**Contrarian note on the 8px grid:** GitHub's dominant gap is **4px**, and its 12px value appears 3
times against 4px's 152. A strict 8px grid would have forced every one of those 4px gaps to 8 and
halved the information density of the issue list. The rule that matters is *few values, clearly
related*, not *multiples of eight*. 4/8/16 is a scale. So is 6/12/24. 6/8/10/12/24 is not.

### 3.8 The comparison test

The highest-signal single technique in this document. It gets its own section — **[§5](#5)**.

### 3.9 "What would a designer's first comment be?"

Ask it plainly and answer honestly. You usually already know, and the reason you have not written
it down is that it implies rework. In the worked example the honest answer was *"why is a quarter
of the screen four numbers nobody asked for, above the list I actually came here for"* — which is
finding #1 in §9 and the fix that moved the score more than the other nine combined.

If the answer that comes to mind is "the spacing could be a bit tighter" or "maybe a different
accent color", you are not answering honestly; those are the answers that require no rework.

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

**This is the technique. If you do one thing from this document, do this one.**

"Is this good?" is unanswerable in isolation — you have no calibration, and your sense of quality
drifts toward whatever you have been staring at. "How does this differ from something known-good in
the same archetype?" is answerable, mechanical, and produces a fix list rather than a feeling.

### 5.1 Procedure

1. **Name the archetype** from [`../archetypes/`](../archetypes/). Ticket queue → `internal-utility`
   / `technical-productivity`. Get this right; comparing a dense ops tool against a consumer
   marketing page produces confidently wrong advice.
2. **Pick a reference you can render**, not one you remember. Products behind a login still work:
   their marketing tours, changelogs, docs and engineering blogs are full of real in-product
   screenshots. For this document we used GitHub's public issue list (fully measurable) plus
   Linear's product renders on `linear.app/plan`.
3. **Capture at the same width, same DPR, same day.** Different widths make every comparison lie.
4. **Look at them side by side**, then **run the same five counts (§3.7) on both.**
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
| **Trusting your own five-second test** | You ran it after reading the markup forty times | You cannot un-know the layout. That is why §3 has eight other tests that do not depend on naive eyes |

The last one deserves emphasis. **Self-critique is structurally compromised.** The transforms
(blur, grayscale, rotate) and the comparison are load-bearing precisely because they produce
evidence that does not depend on your judgement. When the stakes are high, hand the screenshot to a
fresh context with no knowledge of the code and ask for three findings.

---

<a id="9"></a>
## 9 — Worked example

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
node tools/shot.mjs http://localhost:8971/v1.html --name v1 --widths 1440 --wait 1500
node tools/shot.mjs http://localhost:8971/v1.html --name v1m --widths 390
node tools/shot.mjs http://localhost:8971/v1.html --name v1s --widths 320
node scratch/look.mjs   http://localhost:8971/v1.html v1     # plain, blur6, blur14, gray, flip
node scratch/states.mjs                                       # empty, one-item + long text
node scratch/focus.mjs  http://localhost:8971/v1.html focus-v1 5
node scratch/probe.mjs  http://localhost:8971/v1.html V1 1440 # computed-style census
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

**Optical centering.** Run against the real chips in `v1.html`: `Urgent` sits **2.75px** low in its
24px pill, `Open` 2.50px, `Escalated` 0.25px. Two chips in the same table row are **2.5px apart on
the vertical** — `Escalated` and `Urgent` sit side by side in row 1.

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
await p.evaluate(() => { document.documentElement.style.filter='';
  document.body.style.transform='rotate(180deg)'; });
await p.screenshot({ path:`${outDir}/${name}-flip.png` });
await b.close();
```

### `probe.mjs` — the computed-style census

Dumps the five counts of §3.7 plus focus-rule counts, transitions, `:root` custom properties and the
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
"spacing was never decided". *Two* radius values is health; four is "each component chose its own".

### `inkbox.mjs` — optical centering

Screenshots one element at 4×, finds the bounding box of its non-background pixels, and reports the
gap above the ink versus below it. This is the only way to measure optical centering from outside
the font metrics.

```js
// node inkbox.mjs <url> <selector>
import { execSync } from 'node:child_process'; import { createRequire } from 'node:module';
const { chromium } = createRequire(execSync('npm root -g').toString().trim()+'/')('playwright');
const [url, sel] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:4 });
await p.goto(url, { waitUntil:'domcontentloaded' }); await p.waitForTimeout(1500);
const helper = await b.newPage();                        // decodes PNGs via canvas
for (const el of await p.$$(sel)) {
  const box = await el.boundingBox(); const txt = (await el.textContent()).trim();
  const png = 'data:image/png;base64,' + (await el.screenshot()).toString('base64');
  const m = await helper.evaluate(async u => {
    const img = new Image(); img.src = u; await img.decode();
    const c = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height });
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    let top = null, bot = null;
    for (let j = 0; j < c.height; j++) {
      let hit = false;
      for (let i = 0; i < c.width; i++) if (d[(j*c.width+i)*4] < 200) { hit = true; break; }
      if (hit) { if (top === null) top = j; bot = j; }
    }
    return { h: c.height, top, bot };
  }, png);
  const above = m.top/4, below = (m.h-1-m.bot)/4;
  console.log(`"${txt}" box=${box.height}px above=${above.toFixed(2)} below=${below.toFixed(2)} bias=${(above-below).toFixed(2)}px low`);
}
await b.close();
```

The `< 200` luma threshold assumes dark text on a light chip. Invert it for dark mode, and raise it
if your text color is a mid gray.

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
[`../examples/ticket-queue-critique/tools/`](../examples/ticket-queue-critique/tools/).

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
