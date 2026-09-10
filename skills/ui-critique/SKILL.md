---
name: ui-critique
description: Use after building or changing UI, or when asked to review, critique, audit, score, polish or de-genericize an interface — including "does this look good", "make this look less AI-generated", "why does this look off", "review my UI", "is this accessible", or before shipping any UI work. Renders the running interface, looks at the screenshots, scores it against an anti-vibecode rubric, and produces a ranked fix list. Also use when the user is unhappy with how something looks but can't say why.
---

# UI Critique

**Judge the pixels, not the code.** Hierarchy, rhythm, density and "does this look right" are
perceptual judgments. Reviewing JSX and concluding the interface is good evaluates the wrong
artifact.

**Library root:** `$UI_LIBRARY` if set, else `~/Ayush/UI_Library`.

## 1. Capture

The interface must be running. Start the dev server if it isn't.

```bash
node tools/shot.mjs http://localhost:3000/the-page --widths 1440,390 --out .cache/shots --name page
```

Then **open the PNGs with Read.** Listing the file paths is not looking.

Capture states, not just the happy path: populated, empty, loading, one error, keyboard focus
visible, dark mode if it exists. Drive interactions with Playwright to capture hover, focus and
open-menu states — `system/7-critique.md` has the script.

## 2. Look

Run these in order; the early ones catch bigger problems.

1. **Five-second test** — what do you remember? It should be the primary object and the primary
   action, not the sidebar or a gradient.
2. **Squint test** — blur it. Whatever survives is the real hierarchy. An even gray field means
   there is none.
3. **Grayscale test** — desaturate. If structure collapses, color was doing structural work.
4. **Left edge** — how many distinct x-positions? More than three or four in one column region is
   sloppy alignment.
5. **Space audit** — is spacing inside groups smaller than between groups? Are the values from the
   scale?
6. **Count the boxes** — every bordered/shadowed container must be justified. None inside another.
7. **Count the hues** — neutrals + one accent + semantics that happen to be present. More means
   color has stopped meaning anything.
8. **Comparison test** — screenshot an excellent product in the same archetype from
   `references/`, put it beside yours, name three differences. This single test is worth more than
   the other seven; it turns an unanswerable question ("is this good?") into an answerable one.

## 3. Measure

```bash
node tools/audit.mjs http://localhost:3000 --widths 1440,390,320
node tools/contrast.mjs --pairs app/globals.css
```

axe violations, horizontal overflow, contrast failures, tiny text, touch targets, `<div onClick>`,
plus a design-consistency scan — how many distinct font sizes, radii, shadows and text colors the
page actually renders. Fifteen font sizes means the token system didn't survive the build.

Automated checks catch ~30–40% of accessibility problems. Also keyboard-walk the primary task.

## 4. Score

Run the rubric in `anti-patterns/vibecode-rubric.md`. **Target 0–2.**

Every deduction must cite a specific observable — an element, a value, a string. "Feels generic" is
not a finding. "All six sections are bordered cards with 24px padding and 12px radius" is.

Score visual quality too: hierarchy, typography, spacing, color, density, consistency, states,
responsiveness, accessibility, copy, product fit —
`anti-patterns/visual-critique-method.md`.

## 5. Fix, in this order

Agents fix backwards — adjusting color and radius on a structurally wrong layout, where the change
is invisible and the problem is permanent.

1. Structure and hierarchy
2. Density and sizing
3. Typography
4. Content and copy
5. Missing states
6. Color
7. Surface (radius, borders, shadows)
8. Motion — last, and less than you think

`anti-patterns/remedies.md` has before/after code for the common fixes, and a "10-minute polish
pass" ordered by perceived-quality-per-unit-effort.

## 6. Re-render and compare

Against the previous screenshot *and* the reference product. Did it help, or just change?

**Stop when** the score is ≤2, every non-minor finding is resolved, the four data states exist, and
the comparison test's three differences are defended choices.

**Go back to step 5 level 1** if three consecutive changes haven't clearly improved anything — the
remaining problem is structural and no amount of surface adjustment will reach it.

## Traps

- Judging the code instead of the pixels.
- Only the populated desktop view.
- Comparing to your own last version instead of to something good. Improvement is not quality.
- "It matches the design system" — consistently mediocre is still mediocre.
- Accepting your own copy without reading it as a stranger.
- Declaring done without having viewed an image this session.

## Report

> Rendered 1440/390 plus empty and error (`.cache/shots/`). Vibecode 2 — the three metric tiles
> are equal-weight cards but only the queue count matters; I'd merge two. axe clean; contrast
> pairs pass. Keyboard path verified. Not checked: dark mode, 200% zoom.
