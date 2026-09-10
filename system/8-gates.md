# 8 — Ship gates

Four gates. Run them against the running interface, not against the source. Each has an automated
part that is fast and incomplete, and a manual part that is slow and where the real problems are.

```bash
node tools/audit.mjs http://localhost:3000 --widths 1440,390,320
node tools/contrast.mjs --pairs app/globals.css
```

`audit.mjs` runs axe-core, horizontal-overflow detection, contrast and tiny-text scanning, touch
targets, `<div onClick>` detection, and a design-consistency scan (how many distinct font sizes,
radii, shadows and text colors the page actually renders — a good proxy for whether the token
system survived contact with the build).

**Automated accessibility testing catches roughly 30–40% of real issues.** Passing is a floor.

---

## Gate 1 — Accessibility

**Automated:** zero critical or serious axe violations. Contrast passes AA for all text
(`--pairs` and the audit's own scan). No `<div onClick>`.

**Manual — do these, they find what axe can't:**

- [ ] **Complete the primary task with the keyboard only.** Unplug the mouse. Tab to it, operate
      it, and get back. If you can't, nothing else on this list matters.
- [ ] **Focus is always visible** and never lost — especially after closing a modal (focus returns
      to the trigger), after a route change (focus moves to the new heading or main), and after a
      list item is deleted (focus moves to a sibling, not to `<body>`).
- [ ] **Tab order follows visual order.** A positive `tabindex` anywhere is a bug.
- [ ] **Escape closes the topmost overlay** and nothing else.
- [ ] **Nothing is conveyed by color alone** — status, validity, required fields, chart series.
      Check by desaturating a screenshot.
- [ ] **Every input has a real `<label>`** (a placeholder is not a label; `aria-label` on a visible
      field is a smell).
- [ ] **Icon-only controls have accessible names.**
- [ ] **Async changes are announced** — `aria-live="polite"` for save/load, `role="alert"` for
      errors. A silent save is invisible to a screen-reader user.
- [ ] **Zoom to 200%** — nothing clipped, nothing overlapping, no horizontal scroll.
- [ ] **`prefers-reduced-motion`** actually suppresses or substitutes motion.
- [ ] **Screen-reader spot check** on the primary flow (VoiceOver: ⌘F5). Ten minutes, and it will
      surprise you.

→ [`../libraries/accessibility-tooling.md`](../libraries/accessibility-tooling.md)

---

## Gate 2 — Responsive

- [ ] **390px and 320px.** Both. 320 is still a real device and it is where things break.
- [ ] **No horizontal page scroll at any width.** (audit.mjs fails on this.)
- [ ] **Tables were transformed, not shrunk.** A dense table at 390px needs a card layout, priority
      columns, or horizontal scroll with a sticky first column — never eight columns squeezed to
      illegibility.
- [ ] **Touch targets ≥ 44px** in the mobile layout, with spacing between adjacent ones.
- [ ] **No hover-only affordances.** If a row action only appears on hover, it does not exist on
      touch.
- [ ] **Inputs are ≥16px on mobile** or iOS zooms the page on focus.
- [ ] **`dvh` not `vh`** for full-height layouts, or the mobile toolbar clips your content.
- [ ] **Safe-area insets** honored on notched devices (`env(safe-area-inset-*)`) if you have fixed
      bottom UI.
- [ ] **Text never drops below 12px** to make something fit. If it doesn't fit, the layout is wrong.
- [ ] **Tablet/landscape isn't broken** — check ~820px, the width nobody designs for.
- [ ] **The mobile layout is a design, not a squeeze.** Look at it as its own thing.

→ [`../craft/responsive-and-mobile-web.md`](../craft/responsive-and-mobile-web.md)

---

## Gate 3 — States and depth

The [`6-states.md`](6-states.md) checklist, condensed:

- [ ] Empty (first-run, filtered-to-nothing, and all-done are three different states)
- [ ] Loading (matched skeletons; nothing for sub-300ms; no skeleton over already-loaded content)
- [ ] Error (what/why/what-to-do, placed at the failure, with a retry)
- [ ] Too much (long strings, huge lists, big numbers, missing fields, `null`, `0`)
- [ ] Every control: hover, focus-visible, active, disabled, loading
- [ ] Destructive actions have friction proportionate to consequence
- [ ] Optimistic updates revert visibly on failure
- [ ] Unsaved-changes handling on navigation

---

## Gate 4 — Design

- [ ] **Vibecode score ≤ 2.** → [`../anti-patterns/vibecode-rubric.md`](../anti-patterns/vibecode-rubric.md)
- [ ] **Comparison test done.** Side by side with a reference product in the same archetype, three
      differences named, each either fixed or a defended choice.
- [ ] **The direction spec was followed** — and where it wasn't, that was deliberate.
- [ ] **The signature decision is present and legible.**
- [ ] **Token discipline survived the build.** The audit's design-consistency numbers should be
      close to your scale sizes. Fifteen distinct font sizes means arbitrary values leaked in.
- [ ] **Copy is specific.** No "Get started", no "Something went wrong", no "Revolutionize", no
      "Everything you need to". Read every string as a stranger.
      → [`../craft/copy-and-voice.md`](../craft/copy-and-voice.md)
- [ ] **Grayscale test passes** — hierarchy survives without color.
- [ ] **The primary object is the most prominent thing on screen.**

---

## Performance, briefly

Not the focus of this system, but these directly affect perceived quality:

- [ ] No layout shift on load (CLS) — reserve space for images, fonts and async content. A jumping
      page reads as broken regardless of how it looks once settled.
- [ ] Fonts: `font-display: swap`, self-hosted, metric-matched fallback, preloaded if above the
      fold.
- [ ] Images: correct dimensions, modern format, `loading="lazy"` below the fold, explicit
      width/height or aspect-ratio.
- [ ] Interaction latency: a control that responds in >100ms feels broken. Optimistic updates and
      local state fix most of this. → [`../craft/interaction-and-states.md`](../craft/interaction-and-states.md)
- [ ] Heavy libraries (charts, editors, maps, 3D) are code-split.
- [ ] Test on throttled network at least once — most loading states are never seen by their author.

---

## Report honestly

State what you checked, what failed, and what you skipped:

> **Checked:** 1440/390/320, keyboard path through create-and-assign, axe clean, contrast pairs
> pass, empty + error states, reduced motion.
> **Known gaps:** no dark mode; the bulk-select bar overlaps the last row at 320px; screen-reader
> pass not run.
> **Vibecode: 2** — the three status tiles are still equal-weight cards; the queue count is the
> only one that matters and should lead.

"Skipped" is a legitimate answer. "Done" when you didn't look is not.
