# 7 — Render, look, critique, fix

**You cannot evaluate visual design by reading code.** Hierarchy, rhythm, balance, density and
"does this look right" are perceptual judgments about pixels. An agent that reviews its own JSX and
concludes the interface is good has evaluated the wrong artifact.

This step is not optional and it is not a formality. It is where most of the quality comes from.

---

## Capture

```bash
# app running locally
node tools/shot.mjs http://localhost:3000/shipments \
  --out .cache/shots --name shipments --widths 1440,390 --wait 3000

# a long marketing page, sampled down the scroll
node tools/shot.mjs http://localhost:3000 --name home --widths 1440,390 --scroll 3

# dark mode, or a state behind an interaction
node tools/shot.mjs http://localhost:3000 --dark --name home-dark
node tools/shot.mjs http://localhost:3000 --click "button[data-testid=filters]" --name filters-open
```

Then **open the PNGs and look at them.** Reading the file paths is not looking.

**Capture the states, not just the happy path.** A single desktop screenshot of a populated list
tells you almost nothing about the product's quality. At minimum:

- The primary screen, populated with realistic data, at 1440 and 390
- The same screen empty (first-run)
- The same screen loading
- One error state
- Keyboard focus visible on the primary control
- Dark mode if you ship one

For interactive states, drive the page with Playwright and capture:

```js
// /tmp/states.mjs — capture hover/focus/open states
import { execSync } from 'node:child_process'; import { createRequire } from 'node:module';
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:3000/shipments', { waitUntil: 'networkidle' });
await p.hover('tbody tr:nth-child(3)');            await p.screenshot({ path: '.cache/shots/row-hover.png' });
await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); await p.screenshot({ path: '.cache/shots/focus.png' });
await p.click('[data-testid=row-menu]');           await p.screenshot({ path: '.cache/shots/menu-open.png' });
await b.close();
```

---

## Look

Run these in order. Each diagnoses something different, and the early ones catch bigger problems.

**1. The five-second test.** Look at the screenshot for five seconds, then look away. What do you
remember? That should be the primary object and the primary action. If you remember the sidebar,
the header, the filter bar, or a gradient, the hierarchy is inverted.

**2. The squint test.** Blur the image (squint, or step back from the screen). The shapes that
survive are your real hierarchy. If everything blurs into one even gray field, there is no
hierarchy — no amount of color will add it, only size, weight and space will.

**3. The grayscale test.** Desaturate it. Does it still work? If removing color destroys the
structure, color was doing structural work it shouldn't be doing.

**4. Scan the left edge.** Run your eye down the left edge of the content. How many distinct
x-positions are there? More than three or four in a single column region means alignment is
sloppy. This is the fastest way to spot the small misalignments that read as "unfinished".

**5. Measure the space.** Look at the vertical gaps. Are they from your scale, or are there
seventeen different values? Is the spacing *inside* groups smaller than the spacing *between*
groups? If not, grouping is broken regardless of what borders you added.

**6. Count the boxes.** How many bordered/shadowed/backgrounded containers are on screen? How many
of them are inside another one? Every one should be justified. Most generated pages fail here.

**7. Count the colors.** How many distinct hues? Should be roughly: neutrals + one accent + maybe
one semantic color that happens to be present. More than that and color has stopped meaning
anything.

**8. The comparison test — calibration, not discovery.** Screenshot an excellent product in the same
archetype (from [`../references/`](../references/)) and put it next to yours. Name three specific
differences. They will almost always be:
   - theirs is denser
   - theirs has fewer boxes
   - theirs has stronger size contrast between levels

   Run it **after** tests 1–7, not instead of them. Measured across two full runs in
   [`../anti-patterns/visual-critique-method.md`](../anti-patterns/visual-critique-method.md) §5.0,
   the comparison produced no finding the squint, grayscale and count tests had not already produced.
   What it does produce is permission: it is the only test that tells you where your page is
   *correctly* different from the reference, and the only one that stops you shipping something that
   got better five times and is still bad.

**9. What would a designer's first comment be?** Ask it honestly. You usually already know.

---

## Score

Run the vibecode rubric: [`../anti-patterns/vibecode-rubric.md`](../anti-patterns/vibecode-rubric.md)

**Target: 0–2.** Above 4, stop adding features and fix the interface.

The fast version, on the screenshot:

1. Could I tell which product this is without reading the logo?
2. Is there anything in a card that shouldn't be?
3. Is there a gradient, a glow, or a blurred blob?
4. Is the copy specific to this domain, or could it appear in any product?
5. Are there real states, or only the happy path?

Also score visual quality across hierarchy, typography, spacing, color, density, consistency,
states, responsiveness, accessibility, copy, and product fit —
[`../anti-patterns/visual-critique-method.md`](../anti-patterns/visual-critique-method.md) has the
anchored rubric. **Every deduction must cite a specific observable**: an element, a value, a
string. "Feels a bit generic" is not a finding; "every one of the six sections is a bordered card
with 24px padding and 12px radius" is.

---

## Fix, in the right order

Agents habitually fix this backwards — adjusting colors and radii on a layout whose structure is
wrong. Structural problems are invisible under surface changes and reappear forever.

1. **Structure** — hierarchy, layout, what's on the page, what's prominent
2. **Density** — sizes, row heights, spacing scale
3. **Typography** — scale, weights, contrast levels
4. **Content and copy** — real strings, specific labels, error and empty text
5. **States** — the things that are missing entirely
6. **Color** — palette, accent discipline
7. **Surface** — radius, borders, shadows
8. **Motion** — last, and less than you think

Within each level, fix the highest-leverage item first. If you have ten findings, fixing the top
three usually moves perceived quality more than fixing the other seven.

---

## Iterate

Re-render. Compare to the *previous* screenshot as well as to the reference product. Did the change
help, or did it just change?

**Stop when:** the vibecode score is ≤2, every finding above "minor" is resolved, all four data
states exist, and the comparison test's three differences are now defensible choices rather than
oversights.

**Don't stop because you're tired of looking at it.** Do stop rather than fiddle: if you've made
three consecutive changes that didn't clearly improve anything, the remaining problem is structural
and you should go back to level 1 rather than keep adjusting the surface.

---

## How agents fool themselves

Recognize these in yourself:

- **Judging the code.** "The component structure is clean" is not a statement about the interface.
- **Only looking at the happy path.** The populated desktop view is the easiest view to make look
  fine.
- **Only looking at desktop.** Most of the breakage is at 390px.
- **Comparing to your last version instead of to something good.** Improvement is not quality. A
  page can get better five times and still be bad.
- **"It matches the design system."** Consistency is necessary and not sufficient. Consistently
  mediocre is still mediocre.
- **Accepting your own copy.** You wrote "Streamline your workflow" and moved on. Read the strings
  as a stranger would.
- **Declaring done without rendering.** If you have not viewed an image in this session, you do not
  know what you built.

---

## The honest report

When you hand the work back, say what you actually checked:

> Rendered at 1440 and 390, plus empty and error states (`.cache/shots/`). Vibecode score 2 —
> deducted for the metric row, which is still three equal cards; the data doesn't justify equal
> weight and I'd merge two of them. Keyboard path through create-shipment verified. Not checked:
> dark mode (not implemented), 200% zoom.

Not: "I've created a modern, polished interface with a clean design."

---

**Next:** [`8-gates.md`](8-gates.md) — accessibility, responsive and ship checks.
