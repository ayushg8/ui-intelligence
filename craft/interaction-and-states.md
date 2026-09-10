# Interaction, states and feedback

Everything in this file was measured off a live product in September 2026 — computed styles, CSS
custom properties, and timed browser probes. Where a number is inferred rather than read, it says
"approx." Where a well-known product does the wrong thing, that's here too.

The reason this file exists: generated interfaces almost always have exactly one interaction
state, and when they have more, the deltas are 5–10× too large and the durations 2–3× too long.
A `transition: all 300ms ease-in-out` with a `hover:opacity-90` and a `hover:scale-105` is the
single most reliable tell that no human tuned the interface.

---

## If you only apply five things

1. **Nothing moves on hover. Ever.** Change `background-color`, `color`, `border-color`, or the
   opacity of a pseudo-element overlay. Never `transform`, `scale`, `translate`, `padding`,
   `width`, `height`, `font-size`, `margin`, or `border-width`. If you want the pointer to feel
   responsive, make the color change *faster*, not bigger.
2. **Size the hover delta to how many of the thing there are.** A row in a 200-row list gets a
   3–8% overlay (GitHub: white → `#f6f8fa`, a 1.065:1 step). A one-per-page CTA can take a 1.4:1
   step (GOV.UK: `#0f7a52` → `#0b5c3e`). Using the CTA delta on list rows makes lists strobe;
   using the row delta on a CTA makes it feel dead.
3. **Hover transitions are 0–150ms, and the number goes down as density goes up.** Atlassian
   ships `--ds-listitem-hovered: 50ms` and `--ds-button-hovered: 150ms` as separate tokens.
   GitHub's issue rows and Radix Themes' buttons both use **0s** — instant. 300ms is wrong
   everywhere.
4. **Focus-visible is a 2px ring with a 2px page-background gap, and it is never removed.**
   Vercel: `box-shadow: 0 0 0 2px var(--ds-background-100), 0 0 0 4px var(--ds-focus-color)`.
   Radix: `outline: 2px solid var(--focus-8); outline-offset: 2px`. The gap is what makes the ring
   legible on any surface — not the ring color.
5. **Undo beats confirm; a spinner under ~300ms is worse than nothing.** Do the action, show a
   toast with Undo (10s, not Sonner's 4s default). And if the request usually finishes in 120ms,
   render nothing — a spinner that flashes for two frames reads as a bug.

---

## Measured reference table

Read directly from live products (computed styles + stylesheet custom properties), Sept 2026.

### Transition durations and easings on state change

| Product | Element | Duration | Easing | Source |
|---|---|---|---|---|
| GitHub (Primer) | issue row hover | **0s** | — | computed `transitionDuration` on `li[class*=ListItem-module]` |
| GitHub (Primer) | issue title link hover (color) | **0s** | — | computed |
| GitHub (Primer) | IconButton | **80ms** | `cubic-bezier(.65, 0, .35, 1)` | computed; `--duration-fast: 80ms` |
| Radix Themes | solid Button hover | **0s** | — | computed on `button.rt-Button` |
| Atlassian | list item hover | **50ms** | `cubic-bezier(.4, 1, .6, 1)` | `--ds-listitem-hovered` |
| Atlassian | list item pressed / selected | **100ms** | `cubic-bezier(.4, 1, .6, 1)` | `--ds-listitem-pressed`, `--ds-listitem-selected` |
| Atlassian | button hover / pressed | **150ms** | `cubic-bezier(.4, 1, .6, 1)` | `--ds-button-hovered`, `--ds-button-pressed` |
| Linear | hover highlight **in** | **0s** | — | `--speed-highlightFadeIn: 0s` |
| Linear | hover highlight **out** | **150ms** | `--ease-out-cubic` = `cubic-bezier(.215,.61,.355,1)` | `--speed-highlightFadeOut: .15s` |
| Linear | generic quick / regular | 100ms / 250ms | `--ease-out-quad` = `cubic-bezier(.25,.46,.45,.94)` | `--speed-quickTransition`, `--speed-regularTransition` |
| Vercel (Geist) | button hover | **150ms** | `cubic-bezier(.4, 0, .2, 1)` | computed |
| Vercel (Geist) | popover open | 200ms | `--ds-motion-timing-swift` = `cubic-bezier(.175,.885,.32,1.1)` | `--ds-motion-popover-duration` |
| Vercel (Geist) | modal/overlay open | 300ms | same swift curve (slight overshoot) | `--ds-motion-overlay-duration`; also `--ds-motion-overlay-scale: .96` |
| shadcn/ui | button, all states | 150ms, `transition-property: all` | `cubic-bezier(.4, 0, .2, 1)` | computed — **`all` is the bug**, see anti-patterns |
| Apple | global nav | 240ms | — | `--r-globalnav-duration-medium: .24s` |
| Apple | dot-nav hover | 120ms | — | `--sk-dotnav-hover-animation-duration` |
| Stripe | text input | 240ms, `transition-property: color` only | — | computed on `input[type=email]` |
| Atlassian | duration scale | 0 / 50 / 100 / 150 / 200 / 250 / 400 / 600ms | — | `--ds-duration-instant…xxlong` |
| GitHub | duration scale | 80ms then 100→1000ms in 100s | `--base-easing-easeOut: cubic-bezier(.3,.8,.6,1)` | `--duration-fast`, `--base-duration-*` |

### Hover / pressed color deltas (how subtle "subtle" is)

| Product | Transition | Values | Measured delta |
|---|---|---|---|
| GitHub | list row rest → hover | `#ffffff` → `#f6f8fa` | ΔRGB (−9,−7,−5); **1.065:1** |
| GitHub | default button rest → hover → active | `#f6f8fa` → `#eff2f5` → `#e6eaef` | 1.055:1, then 1.075:1 |
| GitHub | default button, dark, rest → hover | `#212830` → `#262c36` | 1.060:1 (dark moves *lighter*) |
| Radix Themes | solid rest → hover | `--accent-9` → `--accent-10` (indigo `#3e63dd` → `#3358d4`) | ΔRGB (−11,−11,−9); 1.157:1 |
| Radix Themes | soft rest → hover → active | `--accent-a3` → `a4` → `a5` | alpha **7.1% → 11.8% → 17.6%** |
| Radix Themes | ghost rest → hover → active | transparent → `accent-a3` → `accent-a4` | 0 → 7.1% → 11.8% |
| Radix Themes | neutral overlay steps | `--gray-a3` light `#0000000f` / dark `#ffffff12` | **5.9% black / 7.1% white** |
| Material 3 | state layer opacities | hover **0.08**, focus **0.10**, pressed **0.10**, dragged **0.16** | overlay of a *named color*, not element opacity |
| Vercel (Geist) | primary rest → hover | `rgb(0,114,245)` → `rgb(11,123,254)` | ΔRGB (+11,+9,+9); 1.117:1 (brightens) |
| GOV.UK | primary rest → hover | `#0f7a52` → `#0b5c3e` | **1.502:1** — 10× a product-UI hover |
| GOV.UK | secondary rest → hover | `#f3f3f3` → `#cecece` | **1.418:1** |
| Radix Themes | pressed filter (on top of the a10 fill) | `brightness(.92) saturate(1.1)` light / `brightness(1.08)` dark | pressed = 8% darker in light, 8% brighter in dark |

**The convergent number:** neutral hover overlay on a dense surface is **5–8%** (Notion 5.1%,
Radix 5.9%, Material 3 8%, GitHub ~6.4pp relative luminance). That is your default. Not 10%.
Not `/90`.

### The rest → hover → active ladder (the ratio nobody publishes)

Hover deltas get written about; the *press* delta almost never does, and it is the number that
decides whether a click feels like it landed. Two independent systems, resolved to real values:

| System | rest | hover / focus | active (pressed) | active ÷ hover |
|---|---|---|---|---|
| Radix Themes, neutral overlay | 0 | `--gray-a3` **5.9%** | `--gray-a4` **9.0%** | **1.53×** |
| Radix Themes, switch track press | — | — | `--gray-a4` 9.0% (surface) / `--gray-a5` 12.2% (classic) | — |
| Notion tatami, neutral surface | 0 | `#0000000d` **5.1%** | `#0000001a` **10.2%** | **2.00×** |
| Notion tatami, alpha icon button | `#0000001a` 10.2% | `#0003` **20.0%** | `#0000004d` **30.2%** | **1.51×** |
| Notion tatami, selection indicator | `#0000001a` 10.2% | — | selected `#0000004d` 30.2% | 3× rest |

> **The rule: `active` overlay ≈ 1.5–2× the `hover` overlay, on the same scale.** Not a different
> color, not a transform — the same neutral, roughly doubled. Generated UI almost always ships a
> hover state and no `:active` at all, which is why clicking generated buttons feels like nothing
> happened.

Radix's full neutral alpha ladder, resolved and contrast-checked (black over white):

| Token | Alpha | Composited | vs white |
|---|---|---|---|
| `--gray-a2` | 2.4% | `rgb(249,249,249)` | 1.05:1 |
| `--gray-a3` | 5.9% | `rgb(240,240,240)` | 1.14:1 |
| `--gray-a4` | 9.0% | `rgb(232,232,232)` | 1.23:1 |
| `--gray-a5` | 12.2% | `rgb(224,224,224)` | 1.32:1 |
| `--gray-a6` | 14.9% | `rgb(217,217,217)` | 1.41:1 |
| `--gray-a7` | 19.2% | `rgb(206,206,206)` | 1.57:1 |
| `--gray-a8` | 26.7% | `rgb(187,187,187)` | 1.92:1 |

Steps a2→a8 are roughly **+3pp each**. If you build your own overlay scale, that's the spacing —
and hover/active are *adjacent-ish* steps (a3/a4), not opposite ends.

### Notion collapses hover, focus and active — deliberately

Resolved from `notion.com`'s `--tatami-*` custom properties. Note what is *identical*:

```css
--tatami-color-button-primary-background:        #0075de;
--tatami-color-button-primary-background-hover:  #005bab;
--tatami-color-button-primary-background-focus:  #005bab;   /* same as hover */
--tatami-color-button-primary-background-active: #005bab;   /* same as hover */
--tatami-color-interaction-focus-ring: #0075de;
--tatami-dimension-interaction-focus-ring-outline-width:  .125rem;  /* 2px */
--tatami-dimension-interaction-focus-ring-outline-offset: .125rem;  /* 2px */
```

For **buttons**, Notion ships one "engaged" background and lets the 2px/2px ring be the *only*
thing that distinguishes focus. For **surfaces** (rows, icon buttons) it does separate hover from
active 2:1, as the ladder above shows. That is the right split: a button is one object you commit
to, a row is something you sweep across.

Also measured: `#0075de` on white text is **4.57:1**; the hover `#005bab` is **6.81:1**. Notion's
hover step *increases* contrast. A `hover:opacity-90` would have moved it the other way.

### Notion and Linear have exactly opposite hover asymmetries

Notion attaches the transition to the **state rule**, not the base rule:

```css
.button:hover:not(:disabled), .button:focus-visible:not(:disabled) {
  transition-property: background-color, color;          /* named, never `all` */
  transition-duration: var(--tatami-motion-global-fade-in-duration);  /* .15s */
  transition-timing-function: cubic-bezier(0, 0, .58, 1); /* ease-out */
}
```

The base `.button` declares no transition, so hover **fades in over 150ms and snaps out at 0s** —
the mirror image of Linear (`--speed-highlightFadeIn: 0s` / `FadeOut: .15s`). Both are top-tier
products and they are exact opposites. The transferable part is not which direction, it's that
**the transition lives in the `:hover` block so the two directions can differ at all.** Put it on
the base rule and you get one symmetric duration, which is the generated default.

Pick by density: instant-in (Linear) for rows you sweep across, where a fade reads as lag;
fade-in/snap-out (Notion) for sparse buttons, where a lingering fade-out reads as a ghost.

### Switches, checkboxes and committed controls

Radix Themes' Switch, read off the stylesheet. This is the most carefully-tuned small control I
measured:

| Rule | Value | What it means |
|---|---|---|
| `[data-state="checked"]::before` | `transition-duration: .16s` | turning **on** takes 160ms |
| `[data-state="unchecked"]::before` | `transition-duration: .12s` | turning **off** takes 120ms — **25% faster** |
| `:active::before` | `transition-duration: 30ms` | while held down, the track recolors in 30ms |
| `.rt-SwitchRoot:active::before` (surface) | `background-color: var(--gray-a4)` | press = 9.0% neutral overlay |
| `[data-state="unchecked"]:active::before` (classic) | `background-color: var(--gray-a5)` | 12.2% |
| `:focus-visible::before` | `outline-offset: 2px` | ring on the **track**, not the input |
| `[data-disabled] .rt-SwitchThumb` | `transition-property: none; transition-duration: 0s` | **a disabled switch never animates** |

Three transferable ideas, none of which appear in generated switches:

1. **On is slower than off.** Committing takes 160ms and reads as deliberate; releasing takes
   120ms and gets out of the way. Same enter/exit asymmetry as GitHub Primer's 300/200 tokens,
   applied to a 20px control.
2. **`:active` drops the duration to 30ms.** The press responds essentially instantly; the
   *settle* takes the full 140–160ms. One extra line, and it is the entire difference between a
   switch that feels mechanical and one that feels like a CSS demo.
3. **Disabled kills the transition outright.** If a disabled switch is toggled programmatically it
   must snap, not glide — a gliding disabled control implies you can operate it.

Other measured control values from the same sheet:

| Thing | Value |
|---|---|
| `--segmented-control-transition-duration` | **100ms** |
| Segmented item hover (state `off`) | `--gray-a2` — **2.4%**, the faintest hover in this document |
| Segmented separator, when the group `:has(:focus-visible)` | `transition-duration: 0s` |
| Card hover (classic variant) | `transition-duration: **40ms**` |
| Slider thumb focus | `0 0 0 3px var(--accent-3), 0 0 0 5px var(--focus-8)` — 3px tinted gap, then the ring |
| `--spinner-animation-duration` / `--spinner-opacity` | **0.8s** / **0.65** |
| Checkbox / radio / switch `:focus-visible` | `outline-offset: 2px` on the `::before` box |
| Segmented item `:focus-visible` | `outline-offset: **-1px**` (inset — it lives in a tight group) |
| Checkbox card `:active:not(:focus-visible)` | `gray-a4` overlay — **press styling is suppressed while the focus ring shows** |

That last row is a real subtlety: `:active:not(:focus-visible)` prevents a keyboard user's
Space-press from stacking a press overlay *under* their focus ring, which would muddy both.

Radix also exposes **cursors as design tokens**, which almost nobody does:

```css
--cursor-disabled: not-allowed;
--cursor-slider-thumb-active: default;   /* NOT `grabbing` while dragging a slider */
```

Tokenising the cursor is why Radix's disabled cursor is consistent across nine components. Copy
the idea: `--cursor-disabled`, `--cursor-drag`, `--cursor-dragging`.

### Toast internals (Sonner, read from `dist/index.mjs`)

| Constant | Value |
|---|---|
| `TOAST_LIFETIME` | **4000ms** |
| `VISIBLE_TOASTS_AMOUNT` | **3** |
| `GAP` (between stacked toasts) | **14px** |
| `SWIPE_THRESHOLD` | **45px**, *or* velocity > **0.11** |
| `TIME_BEFORE_UNMOUNT` | **200ms** |

The dual swipe threshold is the detail worth stealing: a *fast* flick dismisses at any distance, a
*slow* drag needs the full 45px. Distance-only thresholds make flick-dismiss feel broken.

### Focus rings

| Product | Value | Offset | Note |
|---|---|---|---|
| Vercel (Geist) | `box-shadow: 0 0 0 2px var(--ds-background-100), 0 0 0 4px var(--ds-focus-color)` | — | two-layer: background-colored gap, then ring |
| Radix Themes | `outline: 2px solid var(--focus-8)` | **+2px** on solid/classic, **−1px** on soft/ghost | inset when the control lives in a dense list |
| Linear | `outline: 2px solid var(--color-indigo)` | +2px | plus a 1px variant token for tight surfaces |
| GitHub (Primer) | `outline: 2px solid var(--borderColor-accent-emphasis)` | **−2px** (`--focus-outline-offset: -.125rem`) | inset by default so overflow containers never clip it |
| Apple | `outline: 2px solid #0071e3` | +1px control / +3px container / **−7px** in global nav | offset is per-context, ring is constant |
| GOV.UK | `background: #ffdd00; box-shadow: 0 2px 0 #0b0c0c;` plus `outline: 3px solid transparent` | 0 | brand-independent; the transparent outline is the Windows High-Contrast fallback |
| Notion (tatami) | `outline: 2px solid #0075de` | **+2px** | `--tatami-dimension-interaction-focus-ring-outline-{width,offset}` are both `.125rem` |
| GOV.UK, text input | `outline: 3px solid #ffdd00; outline-offset: 0` **plus** `box-shadow: inset 0 0 0 2px #0b0c0c` | 0 | the inset black is what makes a *yellow* ring legible on white |
| GOV.UK, radio (focus) | `box-shadow: 0 0 0 4px #ffdd00`, border-width → 4px, `outline: 3px solid transparent; outline-offset: 1px`, and a separate `outline-color: highlight` rule | +1px | the three stacked rules are the complete forced-colors story |
| GOV.UK, radio (focus **+** hover) | `box-shadow: 0 0 0 4px #ffdd00, 0 0 0 10px #cecece` | +1px | focus and hover **compose** rather than override |
| Radix Themes, slider thumb | `0 0 0 3px var(--accent-3), 0 0 0 5px var(--focus-8)` | — | tinted gap instead of a page-background gap |
| shadcn/ui | `ring: 3px` at `--ring/50` | — | half-alpha ring; weakest of the set |

**Three independent teams converged on 2px width + 2px offset**: Vercel Geist, Radix Themes and
Notion tatami. If you need a default and have no other information, that is it.

**GOV.UK's hover halo is the technique to steal.** On a small radio, hovering paints a 10px grey
ring *outside* the control via `box-shadow: 0 0 0 10px #cecece` — the perceived target grows by
10px in every direction and **not one pixel of layout moves**, because box-shadow doesn't
participate in layout. That is the correct answer to "this control feels too small to hit" —
not padding, which reflows, and not `scale()`, which jitters. And when focus and hover are both
true, the two shadows stack (`0 0 0 4px #ffdd00, 0 0 0 10px #cecece`): the yellow focus ring sits
*inside* the grey hover halo and both remain readable. That is the state-collision problem solved
in one declaration.

### Loading indicators

| Product | Thing | Measured |
|---|---|---|
| Stripe (docs) | spinner | 16px, `--sail-color-gray-400`, `SpinnerAnimationShow 250ms ease` (fades in) + `SpinnerAnimationRotation .6s linear infinite` |
| Sonner | promise/loading spinner | 12-leaf, `1.2s linear infinite`, each leaf opacity 1 → 0.15 |
| GitHub (Primer) | spinner | `1s linear infinite` rotation (`--base-duration-1000`) |
| Radix Themes | skeleton | `rt-skeleton-pulse 1s ease infinite alternate-reverse`, `background-color: gray-a3 → gray-a4` (≈6% → ≈10% black) |
| Vercel (Geist) | skeleton | `loading-skeleton 1.5s ease-in-out infinite reverse`, a `translateX(-50%)` sweep |
| Tailwind / shadcn | `animate-pulse` | `2s cubic-bezier(.4,0,.6,1) infinite`, `@keyframes pulse { 50% { opacity: .5 } }` — **a 50% opacity swing; too loud, too slow** |
| Vercel (Geist) | tooltip delay | **400ms** first (`fadeInTooltip .1s ease-in .4s`), **100ms** once the group is warm (`fadeInTooltipFaster`) |
| Sonner | default toast lifetime | **~4000ms** (timed: visible 4142ms including exit) |

### Behavioral probes

| Product | Probe | Result |
|---|---|---|
| Stripe (register) | type `notanemail` into email, wait 1.2s | **no error while typing** |
| Stripe (register) | Tab out | error appears: *"Please enter a valid email."* |
| Stripe (register) | return, type `@x.com` (now valid), stay focused | **error clears on change, before blur** |
| Radix DropdownMenu | open via click | focus lands on `[role=menu]` container, `tabindex=-1`; **all items `tabindex=-1`** |
| Radix DropdownMenu | press ArrowDown | first item becomes `tabindex=0`, others stay `-1` — roving tabindex; menu is **one tab stop** |
| Radix DropdownMenu | press Escape | menu closes, focus returns to trigger, `aria-expanded="false"` |
| Radix Dialog | open | focus moves to the **first focusable field**, not the container; 19 sibling elements get `aria-hidden="true"`; `body { pointer-events: none; overflow: hidden }` |
| Radix Dialog | press Escape | closes, focus returns to the exact trigger button |
| GitHub | drag a task-list item | source gets `opacity: 0`; cursor `grabbing`; pinned-issue drag source gets `--bgColor-accent-muted` |
| Vercel (contact sales) | type `notanemail`, stay focused | error fires at **1005ms** of idle — debounced, not blur-triggered |
| Vercel (contact sales) | append `@company.com` (now valid) | error clears **1094ms** later — the clear is debounced too (**wrong**) |
| Notion (contact sales) | type `notanemail`, wait 1.5s focused | nothing; on Tab out → *"Email address is not valid."* + `aria-invalid="true"` |
| Notion (contact sales) | correct the value, stay focused | `aria-invalid` → `false` immediately, before blur |
| Linear (contact sales) | type invalid, idle, blur | nothing at any point — validation is submit-only |
| GitHub | `issues?q=label:zzz-does-not-exist-99` | yellow banner names the bad token (*"Invalid value `zzz-does-not-exist-99` for `label`"*) and highlights it in the query input; the empty region below still says only *"No results / Try adjusting your search filters"* with **no clear-filter action** |

---

## The state machine, organised by decision

### Decision 1: what is this state allowed to change?

Give every state a **change budget**. This is the whole game.

| State | May change | Must never change | Duration |
|---|---|---|---|
| `hover` | background, foreground, border-color, overlay opacity, `filter: brightness()` | anything affecting layout or box size; `transform` | 0–150ms |
| `focus-visible` | outline / ring only (add, never replace the hover treatment) | background (it makes focus and hover indistinguishable) | **0ms — never animate a focus ring** |
| `active` / `pressed` | everything hover may change, **plus** a 1–2px translate or a scale ≥0.97 | text content, width | 0–100ms in, ~100ms out |
| `selected` | background, border-color, a left rail/marker, an icon | position, size, font-weight (weight changes reflow the row) | 100ms |
| `disabled` | foreground, background, border, cursor | opacity of the whole element (see below) | 0ms |
| `loading` | swap label for spinner **at fixed width**, disable input | button width, page layout | fade in 150–250ms |
| `error` | border-color, an adjacent message, `aria-invalid` | layout that pushes content below it without reserving space | 0ms on appear |
| `read-only` | background (usually to the page ground), remove the border, `cursor: text` | make it look disabled | 0ms |
| `dragging` | source opacity → 0 or 0.4, `cursor: grabbing`, a lifted drag preview | the position of *other* items until a drop indicator commits | 0ms grab |
| `drop-target` | a 2px inset ring or a 2px insertion line | the size of the target (never expand a drop zone on hover) | 50–100ms |

**Active is the one place layout movement is correct.** GOV.UK's button ships
`.govuk-button { box-shadow: 0 2px 0 #083d29 }` and `.govuk-button:active { top: 2px }` — the
button visibly presses into its own 2px edge. That works because the pointer is already committed
and the mouse is not going to sweep across twelve of them. Same movement on `:hover` would make a
toolbar jitter.

### Decision 2: how big should the hover delta be?

Divide by frequency, not by taste.

- **Rows in a list, cells in a table, items in a menu, toolbar icon buttons** — 5–8% overlay,
  0–50ms. You sweep the cursor across dozens of these per minute. Any bigger and the list strobes.
  GitHub's issue row is a **1.065:1** step at **0s**, and if you screenshot it in isolation you
  can barely see it. That is correct: it's visible *because it's the only thing that changed*, not
  because it's loud.
- **Buttons and cards, a handful per screen** — one full step of your color scale (Radix
  `9 → 10`, a 1.16:1 step), 100–150ms.
- **The one CTA on a marketing page or a government service form** — go big. GOV.UK's 1.5:1
  hover step is right for a page a citizen visits once and must not misclick on. And this is not a
  government quirk: Notion's marketing primary button steps `#0075de → #005bab`, a measured
  **1.49:1** — within a rounding error of GOV.UK. Two very different houses, same number, because
  it's the same *situation*: one button, one visit, high cost of a miss.

**Then set `:active` at 1.5–2× the hover overlay.** Radix goes `gray-a3` (5.9%) → `gray-a4` (9.0%),
a 1.53× step. Notion goes 5.1% → 10.2%, exactly 2×. Same hue, same scale, roughly doubled — never
a different color and never a transform. A control with a hover state and no `:active` is the most
common half-finished state machine in generated UI: the click produces no evidence it registered,
so users click twice.

**Suppress the press styling while the focus ring is showing.** Radix writes the press rule as
`:active:not(:focus-visible)`. A keyboard user pressing Space would otherwise stack a dark overlay
underneath their focus ring and make both harder to read.

**Use an overlay, not a recolor, when the surface underneath varies.** Linear's list row hover is a
`::before` pseudo-element with `background: var(--color-bg-level-2); opacity: 0; border-radius: 6px`
that goes to `opacity: 1` on hover. Nothing about the row's own paint changes, the rounded highlight
is independent of the row's own corners, and the compositor animates a single opacity value.

**Asymmetric timing is the pro move.** Linear:

```css
--speed-highlightFadeIn: 0s;
--speed-highlightFadeOut: .15s;

.row::before        { opacity: 0; transition: opacity var(--speed-highlightFadeOut) var(--ease-out-cubic); }
.row:hover::before  { opacity: 1; transition-duration: var(--speed-highlightFadeIn); }
```

Highlight-in is instantaneous — the cursor arrives and the row is already lit, so pointing feels
like a physical property, not an animation. Highlight-out takes 150ms — so sweeping down a list
leaves a soft trail instead of a hard flicker. One base rule plus a `transition-duration` override
in the `:hover` block gets you both. Almost nobody does this and it is two lines.

### Decision 3: how do I do focus without an ugly ring?

You don't get to skip it, so make it good.

**The two-layer ring** is the answer, and two independent teams converged on it:

```css
/* Vercel Geist */
:focus-visible { box-shadow: 0 0 0 2px var(--page-bg), 0 0 0 4px var(--focus-color); outline: none; }
/* Radix Themes — same optics via outline-offset */
:focus-visible { outline: 2px solid var(--focus-8); outline-offset: 2px; }
```

The 2px gap in the page's own background color separates ring from control, which is what makes the
ring readable on a blue button, a white card, and a dark sidebar with the *same* ring color. Ring
color contrast is secondary; the gap is doing the work.

**Offset is context-dependent, ring width is not.** Keep 2px everywhere and vary only the offset:

- `+2px` for a standalone button with room around it (Radix solid, Linear, Vercel).
- `−1px to −2px` for controls in dense lists, tables, or inside `overflow: hidden` containers
  (Radix soft/ghost use `−1px`; **Primer's global default is `−2px`**). An outward ring on a
  table row gets clipped by the scroll container or collides with the row above.
- Apple goes as far as `−7px` inside global nav so the ring hugs the nav bar's own shape.

**Three rules you can't negotiate:**

1. `:focus-visible`, not `:focus`. Otherwise every mouse click leaves a ring behind. Pair it with
   `:focus:not(:focus-visible) { outline: none }` for older engines (Linear ships exactly that).
2. **Never `transition` a focus ring.** A keyboard user Tab-ing through 10 fields sees 10 rings
   fade in at 150ms each and the interface feels underwater.
3. **Always add `outline: 3px solid transparent`** alongside a `box-shadow` ring. In Windows
   High Contrast / forced-colors mode, box-shadows are dropped entirely and your focus indicator
   vanishes; the transparent outline gets forced to a system color and survives. GOV.UK does this
   on every focusable component, and it is the single most-missed a11y detail in this whole file.

**A11y floor:** WCAG 2.2 SC 2.4.11 (Focus Not Obscured) and 2.4.13 (Focus Appearance) want an
indicator at least 2px thick with ≥3:1 contrast against adjacent colors, not hidden behind sticky
headers. If you have a sticky header, add `scroll-margin-top` to focusable elements.

### Decision 4: how do I show disabled?

**Recolor, don't fade.** Measured: body text `#1f2328` on white is 15.8:1. Apply
`opacity: 0.5` — shadcn's default — and it becomes **3.16:1**. Apply it to a compound control and
the border, the icon, and the label all fade by different perceptual amounts.

GitHub instead swaps tokens: `--control-bgColor-disabled` + `--fgColor-disabled: #59636e`, which
measures **5.44:1** on the disabled background. Fully readable. Radix Themes recolors too
(`color: gray-a8; background: gray-a3; filter: none; outline: none`) but `gray-a8` is only
**1.92:1** on white — so even a good design system ships a disabled state you can't read. Worse,
Radix's disabled *checkbox* puts a `gray-a8` checkmark on a `gray-a3` background, which composites
to `rgb(187,187,187)` on `rgb(240,240,240)` — a measured **1.68:1**. A disabled-but-checked
checkbox is one of the most information-dense things in a settings UI ("this is on, and you can't
change it") and Radix renders it at the threshold of invisibility. Disabled controls are formally
exempt from WCAG 1.4.3, and that exemption is why everyone ships something unreadable. Take
GitHub's number, not Radix's — and give *disabled-and-checked* more contrast than
*disabled-and-unchecked*, because it carries actual state.

**Note the honest exception:** GOV.UK — normally the strictest system in this file — ships
`.govuk-input:disabled { opacity: 0.5; cursor: not-allowed }`. So the blanket "never `opacity:
0.5`" is too strong. The distinction that survives: opacity is defensible on a control whose
*only* content is text on a plain background (fading text and its border by the same amount is
harmless); it's wrong on a compound control where a saturated fill, a hairline border and a glyph
would each fade by different perceptual amounts. Radix's disabled switch is the model — it recolors
(`background-color: var(--gray-a3)`) *and* sets `transition-property: none` so a disabled control
can never animate.

**Better still: don't disable the button.** A disabled submit button with no explanation is the
most common dead end in generated software. Prefer:

- Leave the control enabled, and on activation show the validation errors and move focus to the
  first invalid field. The user learns *why*, which a disabled button never teaches.
- If you must disable, the reason must be adjacent and visible without hover — a line of helper
  text, not a tooltip. Disabled elements don't fire pointer events, so tooltips on them require a
  wrapper and are unreachable by keyboard anyway.
- Use `aria-disabled="true"` + ignoring the click, rather than the `disabled` attribute, when you
  want the control to stay focusable and announceable. Ship `cursor: not-allowed` either way.

**Read-only ≠ disabled.** A read-only field's value is real data the user may need to select and
copy. Give it the page background, no border or a hairline one, normal text color, and
`cursor: text`. Making it grey says "this doesn't apply to you," which is wrong.

### Decision 5: selected, and the three-state collision

`hover`, `focus-visible` and `selected` can all be true simultaneously. Test that combination
explicitly — it's the state generated UI never renders.

- **Selected must not be the same treatment as hover.** If hover is a 6% neutral overlay,
  selected should be a *tinted* fill (Radix's `accent-a3`, or a solid `--bgColor-accent-muted`),
  plus a non-color signal: a 2px left rail, a check icon, or `aria-selected="true"`. Color alone
  fails WCAG 1.4.1.
- **Selected + hover** = selected fill, one step darker. Not the hover fill, which would read as a
  deselect.
- **Selected + focus** = selected fill plus the ring. The ring wins visually and that's correct.
- Use the right ARIA: `aria-selected` for options/tabs/grid cells, `aria-checked` for
  checkbox/radio semantics, `aria-current="page"` for the active nav item. They are not
  interchangeable and screen readers announce them differently.
- Never signal selection with `font-weight`. Bolding a row changes its text metrics and can reflow
  the row on a 1px boundary. If you want weight contrast, set the unselected state to the lighter
  weight and keep both weights in the same box by reserving the width.

### Decision 6: loading, per control

Loading belongs to the thing that's loading, not to the page.

- **A button that submitted**: swap the label for a spinner *inside the button, at the button's
  existing width*. Set an explicit `min-width` or render the label at `visibility: hidden` behind
  the spinner. A button that shrinks from "Save changes" to a 16px spinner makes the whole toolbar
  jump. Add `aria-busy="true"` and block double-submit at the handler, not only with `disabled`.
- **A section that's refetching**: never replace already-rendered content with skeletons. Dim it to
  ~60% and show a 2px indeterminate bar at the section's top edge. Swapping real content for
  skeletons on refetch is a visible regression — the user watches their data disappear.
- **A page with nothing yet**: skeleton, matched to the real layout. Right row count, right column
  widths, right heights, right radii. If the skeleton's shape differs from the content it becomes,
  the load ends in a jump and you've made things worse than a spinner.

Skeleton craft, measured: Radix animates `background-color: gray-a3 → gray-a4` over 1s
`alternate-reverse` — a **6% → 10% black** oscillation. Tailwind's `animate-pulse` swings
**opacity 100% → 50% over 2s**, which is roughly five times the amplitude and half the tempo. Use
Radix's. And a skeleton must never be more contrasty than the content it stands in for; if you can
read the skeleton across the room, it's wrong.


### Decision 7: error, success and read-only on a control

- **Error** on a field: border-color change + a message below + `aria-invalid="true"` +
  `aria-describedby` pointing at the message. That's three things and it's enough. Don't also
  tint the background, recolor the label, add an icon *and* shake it — a control with five error
  signals reads as a system that panicked.
- **Success** is almost always the wrong state to render. If the value saved, the value is on
  screen — that *is* the success signal. A green check on every valid field turns a form into a
  scoreboard and makes the remaining empty fields look like failures. Two exceptions: (1) an async
  check the user can't verify themselves ("`ayush` is available"), and (2) a completed action with
  no visible result, which is a toast, not a field state. If you do render success, it decays —
  show it for ~2s and return to neutral.
- **Read-only** is not disabled. Page-colored background, hairline or no border, full-contrast
  text, `cursor: text`, still selectable and copyable, still in the tab order (`readonly` keeps
  focusability; `disabled` removes it). Greying out a read-only value tells the user it's
  irrelevant when it's often the most important number on the screen.

### Decision 8: dragging and drop targets

- **The dragged source**: GitHub sets `opacity: 0` on a dragging task-list item and lets the drag
  preview be the only visible copy (their pinned-issue drag instead tints the source with
  `--bgColor-accent-muted`). Either is fine; what's not fine is leaving the source at full opacity,
  which gives you two identical items and no sense of where the thing currently is.
- **Cursor**: `grab` at rest on the handle, `grabbing` while dragging, set on `body` during the
  drag so it doesn't flicker as you cross elements.
- **Drop target**: a 2px inset ring for a container target, or a 2px insertion line for a position
  in a list. **Never resize the target on hover** — a drop zone that expands as you approach it
  changes the geometry you were aiming at.
- **Never reflow the list under the cursor before commit.** Animate the gap open at the insertion
  point with a `transform` on the neighbours (compositor-only) rather than re-laying-out the list
  on every pointer move.
- **A drag-only interaction is inaccessible, full stop.** WCAG 2.2 SC 2.5.7 (Dragging Movements)
  requires a single-pointer alternative — every reorder needs "Move up / Move down" in a context
  menu or keyboard handler, and every drag-to-upload needs a file input button. Announce moves via
  `aria-live` ("Moved to position 3 of 12"). This is the state agents skip most reliably, because
  the happy path demos fine with a mouse.

### Decision 9: switches, checkboxes and other committed controls

These differ from buttons in one way that changes everything: **the control itself is the result.**
There is no separate thing to look at, so the control has to carry both the feedback and the state.

**Switch vs checkbox is a semantic decision, not a style one.**

- A **switch** takes effect immediately and has no Save button. Label it as a state, not an action
  — "Email notifications", not "Enable email notifications". If your switch needs a Save button,
  it should have been a checkbox.
- A **checkbox** is a value in a form that gets submitted with everything else. It's also the only
  one of the two with a legitimate third state (`indeterminate`, for a parent whose children
  disagree). Switches have no indeterminate state; if you need one, you needed a checkbox.
- Radio vs a segmented control is a density decision, not a semantic one — same semantics, and the
  segmented control is right when there are 2–4 short options you want visible and comparable.

**Timings, from the measurements above:**

```css
/* Radix Themes' switch, distilled */
.switch::before            { transition: background-color .12s; }  /* off:  120ms */
.switch[data-state=on]::before { transition-duration: .16s; }      /* on:   160ms — slower */
.switch:active::before     { transition-duration: 30ms; }          /* press: near-instant */
.switch[data-disabled] *   { transition-property: none; }          /* never animates */
```

- **Turning on is slower than turning off** (160/120). Commitment gets weight; release gets out of
  the way.
- **`:active` drops to 30ms** so the press is acknowledged before the toggle completes. This is the
  single line that separates a switch that feels mechanical from one that feels like a demo.
- **The thumb travels on `transform: translateX()`**, never on `left` or `margin`. Compositor-only.
- **Disabled never animates.**

**What must never happen:**

- **The switch must not wait for the server to move.** Move the thumb on click, then reconcile. A
  switch that hangs mid-travel for 400ms is the worst-feeling control in software. If the write
  fails, snap the thumb back and show a persistent inline error naming the setting — never a toast
  (see the optimistic-rollback rules above).
- **No layout movement, ever.** The track and thumb keep their geometry; only `translateX` and
  `background-color` change. A switch that grows on hover shifts its own label.
- **The label is the hit target.** Wrap in a `<label>` or wire `htmlFor` — a 20px switch is below
  every touch-target minimum on its own. If it must stay small, use GOV.UK's trick: extend the
  *perceived* target with `box-shadow: 0 0 0 10px <hover-grey>` on hover, which adds zero layout.
- **Focus ring goes on the track**, not the visually-hidden `<input>`, at the usual 2px/2px.
- **Never use color alone for on/off.** A green track and a grey track are the same track to a
  red-green colorblind user in a screenshot. The thumb's *position* is the real signal — which is
  why the track must be wide enough that the travel is unmistakable — and `role="switch"` +
  `aria-checked` carries it for screen readers.
- **Don't put an on/off label inside the track.** It forces the track wider, it doesn't localize,
  and it's redundant with thumb position.

---

## Latency and perceived performance

### The three thresholds, and what each one changes

| Budget | What the user perceives | What you must do |
|---|---|---|
| **≤100ms** | direct manipulation — the app *is* the thing | Render nothing. No spinner, no skeleton, no optimistic placeholder. Just apply the result. |
| **100ms – 1s** | a noticeable but unbroken flow | Still usually nothing. If the action has no visible result of its own, put an inline state on the control that caused it. |
| **1s – 10s** | the user's attention is at risk | Skeleton or determinate progress + the ability to do something else. Keep the rest of the UI live. |
| **>10s** | the user leaves | Say what's happening, give a real estimate or a step count, and let them navigate away and be notified. Never a bare spinner. |

### Choosing between nothing / spinner / skeleton

The rule, in order:

1. **Can you avoid the wait?** Optimistic update, prefetch on hover-intent, or render from cache
   and revalidate. This beats every indicator.
2. **Is the p75 under ~300ms?** Render **nothing**. A spinner that appears and disappears within
   300ms is perceived as a flicker/glitch, not as feedback — it actively lowers perceived quality.
3. **Do you know the shape of what's coming?** → skeleton. **Do you not?** → spinner.
   A list of 20 rows with known columns is a skeleton. "Processing payment" is a spinner.
4. **Do you know the fraction complete?** → determinate progress bar, always, over anything else.

**Avoiding both flashes.** Two guards, and you need both:

```js
// don't show the indicator for fast responses…
const DELAY = 300;      // ms before the skeleton/spinner is allowed to appear
// …and once shown, don't yank it away instantly
const MIN_VISIBLE = 400; // ms it must stay once it has appeared
```

Without `DELAY` you get skeleton-flash on every cached response. Without `MIN_VISIBLE` you get a
skeleton that appears at 305ms and vanishes at 340ms, which is worse than either extreme. Stripe's
docs spinner solves half of this in pure CSS: `SpinnerAnimationShow 250ms ease` fades the spinner
in, so a response that lands at 200ms shows a barely-visible ghost rather than a hard pop.

Also: Stripe's spinner rotates every **600ms**, not the customary 1s. A slow spinner reads as a
slow system. If you're going to show one, spin it at 0.6–1.0s and keep it small (Stripe: 16px).

### Optimistic updates, and rolling back honestly

Apply optimistically when the action is (a) user-initiated, (b) almost always succeeds, and
(c) locally computable: toggles, renames, reorder, star/like, marking read, adding a tag, sending
a message.

Do **not** apply optimistically when the server owns the truth: payments, availability/inventory,
permission changes, anything that returns a generated ID the user will see, anything another user
is concurrently editing.

Rollback rules — this is where almost everyone is dishonest:

- **A silent revert is worse than a slow update.** The user saw it succeed. If you quietly undo it
  and say nothing, they will believe the change stuck and discover the loss later.
- On failure: restore the previous value **and** show a persistent, dismissible inline error at
  the item — not a toast that auto-dismisses. `"Couldn't rename to 'Q3 forecast' — you don't have
  edit access. [Retry]"`
- Don't animate the rollback. Fading the value back looks like a second successful edit. Snap it.
- Keep the user's input recoverable. If a comment failed to post, the text stays in the composer.
  Never destroy user-typed content on a failed request.
- If you show a pending/dimmed state during flight, make it *low contrast, not a spinner* — 70%
  opacity on the row, and only after ~500ms.
- Reconcile by server value, not by re-applying your guess. If the server normalises the title,
  show the server's version.

---

## Undo over confirm

The default is: **do it, and offer undo.** A confirmation dialog taxes the 99% of users who meant
it to protect the 1% who didn't, and it doesn't even protect them well — people click through
modals reflexively.

Decision rule:

| Situation | Pattern |
|---|---|
| Reversible, low stakes (archive, mark read, reorder, toggle) | **Just do it.** No confirm, no toast. |
| Reversible, notable (delete a draft, remove a member, discard changes) | **Do it + undo toast, 10s.** Toast copy states the object: *"Deleted 'Q3 forecast'. [Undo]"* |
| Irreversible but recoverable elsewhere (empties a trash that's backed up) | Confirmation dialog. Title is the question; the confirm button names the action — *"Delete 3 shipments"*, never *OK* / *Yes*. |
| Irreversible, high value, hard to recreate (delete a repo, close an account, drop a table) | **Type-to-confirm** the object's name. |
| Irreversible **and affects other people** (revoke access, cancel a shared booking, send to 4,000 recipients) | Show the blast radius *before* confirming: what, how many, who. Then confirm. |
| Physically destructive on a touch device with no undo | **Hold-to-delete** (~1.2s with a visible fill). Use this sparingly; it's for pointer-free contexts where a mis-tap has no undo. |

Notes that actually change your implementation:

- **Undo needs a real window.** Sonner's default is 4000ms — measured. Four seconds is not enough
  time to read a toast, decide, and move the mouse. Set `duration: 10000` for undo toasts, and
  pause the timer on hover and on focus-within.
- **Undo must also be reachable by keyboard.** ⌘Z / Ctrl+Z should perform the same undo as the
  toast button for at least as long as the toast is up. A toast-only undo excludes keyboard and
  screen-reader users, who may never see the toast before it expires.
- **Type-to-confirm is theater unless it's rare.** GitHub asks you to type the repo name to delete
  a repo, and that's the right frequency: approximately never. Requiring it for deleting a row in a
  table trains users to copy-paste without reading, which is strictly worse than no friction.
- **Never make Delete the primary-styled button in the resting UI.** GitHub's danger button is a
  *neutral* surface (`--control-bgColor-rest`) with red text (`--fgColor-danger`) at rest, and only
  fills red (`--bgColor-danger-emphasis`, `#cf222e`) on hover. Red at rest reads as "this interface
  expects you to make mistakes." Inside a confirmation dialog — where the destructive action is now
  the intended one — a solid red confirm button is correct.
- Destructive items go **last in a menu, after a separator**, never adjacent to the common action.

---

## Inline validation timing

Four real email fields, driven by a scripted browser and timed to the millisecond. Same input
(`notanemail`), same sequence: type → idle → blur → correct while focused.

| Product | While typing | Idle, still focused | On blur | Corrected, still focused |
|---|---|---|---|---|
| **Stripe** (register) | nothing | nothing at 1.2s | error: *"Please enter a valid email."* | **clears immediately** |
| **Notion** (contact sales) | nothing | nothing at 1.5s | error: *"Email address is not valid."*, `aria-invalid=true` | **clears immediately**, `aria-invalid=false` |
| **Vercel** (contact sales) | nothing | **error at 1005ms**, `aria-invalid=true` | error persists | clears — but **1094ms later** |
| **Linear** (contact sales) | nothing | nothing | nothing | nothing — submit-only |

Stripe and Notion are the same product, built by different companies: **validate on blur, clear on
change.** That's the answer, corroborated twice.

Vercel is the instructive one, and it splits into a defensible half and a bug:

- **Defensible:** a ~1000ms idle debounce *while the field is still focused*. For a single-field
  form this arguably beats blur — the user finds out without leaving the field, and 1s is long
  enough that nobody sees an error mid-word. If you prefer this to on-blur, it's a real choice.
- **A bug:** the *clear* is debounced too. Measured at **1094ms** after the value became valid.
  The user has already fixed it and the form spends a full second continuing to call them wrong.

> **Never debounce the clear.** Whatever triggers the error — blur or a 1s idle — removing it is
> unconditional and immediate, on the first keystroke that makes the value valid. Debounce exists
> to avoid *premature blame*; there is no such thing as premature forgiveness.

Linear's submit-only behaviour is fine for a 3-field marketing form where the user will hit submit
within seconds anyway. It would be wrong for a 14-field account setup, where discovering four
errors at once after two minutes of typing is the worst possible ordering.

The whole rule, in one line:

> **Validate on blur (or ~1s idle). Clear on change, instantly. Re-validate on blur.**

Why: validating on change punishes people mid-typing (`a` is not a valid email, and telling them so
while they type `ayush@…` is hostile). Waiting for blur to *clear* an error punishes them for
fixing it. Once an error is showing, the field switches into eager mode until it's valid again.

The rest of the rules:

- **On submit**: validate everything, render every error, then **move focus to the first invalid
  field** and scroll it into view. Optionally render an error summary at the top of the form with
  in-page links to each field (GOV.UK's `.govuk-error-summary` is focusable and receives focus on
  submit — that's the accessible pattern for long forms).
- **Never validate a field the user hasn't touched.** A form that renders red before you've typed
  anything is the clearest sign nobody used it.
- **Some things can only be validated on submit** — uniqueness, server-side rules, payment
  authorisation. Say so in the error, and never blame the user for a server rule they couldn't have
  known: *"That username is taken"* not *"Invalid username."*
- **Debounce async validation to ~500ms after typing stops**, and never let an in-flight async check
  block submit. If the check hasn't returned, submit and handle the failure.
- Wire the a11y: `aria-invalid="true"` on the input, `aria-describedby` pointing at the message
  element, and the message in a `role="alert"` (or an `aria-live="polite"` region) so it's
  announced. shadcn does the styling half (`aria-invalid:border-destructive`,
  `aria-invalid:ring-destructive/20`) — you have to do the wiring half.
- **Reserve the space** for the error message, or let the error replace the helper text in a
  fixed-height slot. An error that appears and pushes every field below it down 20px is how you
  make people click the wrong button.
- Error styling: change the border-color and add the message. Don't also change the background,
  the label color, and add an icon and shake the field. One or two signals; the message carries the
  information.

---

## Autosave and its status UI

If you autosave, the user must be able to answer "is my work safe?" at a glance, without an action.

- **Debounce on typing (~500ms–1s idle), and also flush on blur, on navigation, and on a hard
  interval (~10s) during continuous typing.** Idle-only debounce loses work from someone who types
  for four minutes straight.
- **Status copy, in one small text slot that never moves:**
  `Saving…` → `Saved` → (after a few seconds) the timestamp, `Saved 2:04 PM`, or nothing at all.
  Do not toast a save. Do not animate a checkmark on every keystroke pause.
- **Show `Saving…` only after ~400ms of actually saving.** Otherwise the label flickers on every
  pause and the user learns to ignore it — at which point it can't do its one job.
- **Failure is the state that matters and the one nobody builds.** On a failed save, switch the
  slot to a persistent, high-contrast `Couldn't save — retrying…` and then
  `Not saved. [Retry]` — and *block navigation* with `beforeunload` while there are unsaved
  changes. Silent failure plus a green "Saved" from three minutes ago is data loss with a
  reassuring label on it.
- **Offline**: say `Offline — changes saved locally` and reconcile on reconnect. Don't show a
  generic error for a known-offline state.
- Announce status changes with `aria-live="polite"` on the status slot — never `assertive`, which
  would interrupt the user mid-sentence.
- If your product has autosave, it must also have version history or an undo depth that survives a
  reload. Autosave without recovery converts every mistake into a permanent one.

---

## Empty states that teach

Three different empties, three different jobs. Getting these confused is common and costly.

**First run — the highest-value onboarding surface in the product.** What this is · why it's empty ·
the one action.

```
No shipments in transit
Shipments appear here once a carrier scans the first pickup.
[Create a shipment]        Learn about tracking →
```

One primary action. A secondary *link*, not a second button. No illustration standing in for copy.

**Filtered to nothing — name the filter and offer to clear it.** Here is a measured example of a
real product getting half of it right. GitHub, on `issues?q=is:issue label:zzz-nonexistent`:

- **Right:** a warning banner directly under the query box — *"Filter contains 1 issue: Invalid
  value `zzz-nonexistent-label-12345` for `label`"* — with the offending token highlighted inline,
  in the query input itself, in orange. The user is told exactly which part of their input caused
  this.
- **Wrong:** the empty region below just says *"No results / Try adjusting your search filters."*
  No button, no "clear filters", no "remove this label". That sentence is the generated default,
  and it's a dead end even in a product that clearly knows better one element above.

Do the diagnosis *and* give the action: `[Clear label filter]` `[Clear all filters]`, and state the
count that would come back.

**Genuinely done (inbox zero, all caught up)** — this is good news. One line, no illustration, no
CTA. Get out of the way.

Rules for all three: never use first-run copy for a filtered-empty (it implies data loss). Never
center a grey inbox icon over the word "Empty." Size the empty state to the container it replaces —
a 500px-tall empty state inside a 120px card is worse than a single line of text.

---

## Error messages that say what to do

Three questions, always, in this order: **what happened · why · what to do.**

```
Couldn't load shipments
The tracking service didn't respond. Your data is safe.
[Try again]        Contact support if this continues
```

- **Put the error where the failure was.** Field error under the field. Section error replacing
  the section. Only a genuinely global failure gets a global treatment. A toast is the *worst*
  place for an error, because it disappears.
- **Distinguish retryable from terminal.** Network / timeout / 5xx get a retry button. 403 / 404 /
  validation get a different action entirely (request access, go back, fix the input). Offering
  "Try again" on a 403 wastes the user's time and teaches them your errors are noise.
- **Never ship these strings**: "Something went wrong", a bare status code, a raw stack trace,
  "Error: undefined", "An unexpected error occurred." If you truly don't know, at least say what
  the user was doing and give them an ID they can quote: *"We couldn't save your changes.
  Reference `req_8f21c`. [Try again]"*
- **Preserve the user's input** across any error. Always.
- **One failed region must not take down the page.** Error boundaries per section.
- Don't blame the user, and don't apologise at length. "Enter a date in the future" beats
  "Sorry! The date you entered is invalid."

---

## Toasts, and their overuse

A toast is the right answer for exactly one thing: **confirming a completed action that has no
visible result on screen, optionally with undo.** That's it.

Toasts are wrong for:

- **Errors that the user must act on.** They vanish; the user is left with a broken state and no
  explanation. Put it inline.
- **Anything requiring a decision.** A toast is not a dialog.
- **Confirming something already visible.** If the row disappeared from the list, don't also toast
  "Row deleted." The disappearance *is* the feedback. (Unless you're offering undo — then the toast
  earns its place.)
- **More than one at a time from one action.** Stack limit 3; collapse the rest.
- **Long text.** A toast that takes longer to read than to dismiss is a failed toast.

Craft, from Sonner (measured): title `font-weight: 500`, description `400`, `gap: 2px` between
them, `line-height: 1.5 / 1.4`. Swipe-to-dismiss expands the hit area with a
`::before { transform: scaleY(3) }` so the gesture target is three times the visible toast height.

Non-negotiables:

- **Never place a toast over a primary action** — bottom-right is safe for a sidebar app,
  disastrous for a product with a bottom-right FAB.
- **Pause the dismiss timer on hover and on focus-within**, and while the tab is backgrounded.
- **Put a toast's content in an `aria-live="polite"` region** (`assertive` only for genuine
  interruptions), and make the toast's actions keyboard-reachable — Sonner exposes a focus-visible
  ring on `[data-button]` for exactly this. If the only way to undo is to click a toast, keyboard
  users have no undo.
- Duration: **4s** for a plain confirmation (Sonner's default), **10s** when it carries Undo,
  **never auto-dismiss** when it carries an error the user must act on.

---

## Keyboard interaction

### Focus order and structure

- Focus order follows DOM order. If your visual order differs (a CSS-grid reorder, `flex-direction:
  row-reverse`), fix the DOM, don't patch it with `tabindex`.
- **Positive `tabindex` is always a bug.** Only `0` and `-1`.
- Every interactive element is a `<button>`, `<a href>`, or a real form control. A `<div onClick>`
  is not focusable, not activatable by Enter/Space, and not announced. If you must, you owe it
  `tabindex="0"`, `role`, and an `onKeyDown` for both Enter and Space.
- **Skip link** to main content as the first focusable element on any page with more than ~10
  header links.

### Roving tabindex — measured, from Radix

A composite widget (menu, tablist, toolbar, listbox, grid, tree) is **one Tab stop**. Measured on
Radix DropdownMenu:

- On open, focus goes to the `[role="menu"]` container, `tabindex="-1"`. Every
  `[role="menuitem"]` is `tabindex="-1"`.
- First ArrowDown sets the active item to `tabindex="0"` and focuses it; every other item stays
  `-1`.
- Tab leaves the whole widget rather than walking 12 menu items.

Implement it that way. The common mistake — giving every list item `tabindex="0"` — means Tab-ing
past a 50-row table takes 50 presses.

Also expected inside a composite: Home / End jump to first / last; typeahead jumps to the item
starting with the typed characters; ArrowRight/Left open and close submenus.

### Escape semantics

Escape has a strict precedence order. From innermost outward:

1. Cancel an in-progress gesture (a drag, a range selection).
2. Revert an inline edit to its previous value and exit edit mode.
3. Close the topmost overlay — popover, then menu, then dialog. **One layer per press.**
4. Clear a non-empty search/filter input.
5. Deselect / dismiss a transient selection.
6. Nothing. Escape must never navigate, never submit, never delete.

**Escape must return focus to the element that opened the thing.** Measured on Radix: closing the
dropdown returns focus to the trigger and sets `aria-expanded="false"`; closing the dialog returns
focus to the exact button that opened it. Focus landing on `<body>` after a modal closes is the
most common keyboard bug in generated UI, and it dumps the user back at the top of the page.

Modal hygiene, also measured on Radix Dialog: focus moves to the **first focusable field** inside
(not the container), all sibling top-level elements get `aria-hidden="true"` (19 of them on that
page), and `body` gets `pointer-events: none; overflow: hidden`. Focus is trapped until close.

### Shortcuts every product should have

| Keys | Action | Notes |
|---|---|---|
| `⌘K` / `Ctrl+K` | command palette / global search | The one shortcut users now expect everywhere. |
| `/` | focus the search field | Only when no text input is focused. |
| `?` | show the shortcuts sheet | Discoverability. Without it, every other shortcut is invisible. |
| `Esc` | see above | |
| `⌘Z` / `⌘⇧Z` | undo / redo | Must match the undo the toast offers. |
| `⌘Enter` | submit the focused form or composer | Especially in any multiline field. |
| `J` / `K` or `↑` / `↓` | move through a list | |
| `⌘/Ctrl + click` | open in new tab | Don't break this by hijacking clicks on real links. |

Conflicts to avoid: never override `⌘W`, `⌘T`, `⌘N`, `⌘L`, `⌘R`, `⌘F` (unless you're replacing find
with a genuinely better in-app find, and then `Esc` must restore browser find), `⌘+`/`⌘-`, or
`Ctrl+Tab`. Single-letter shortcuts must be suppressed while a text input, textarea, or
`contenteditable` has focus — the classic bug is typing "delete" into a search box and having `d`
delete something.

**Show the shortcut where the action is.** A menu item that says `Duplicate  ⌘D` teaches; a
shortcuts page nobody opens does not. Detect platform and render `⌘` vs `Ctrl` correctly — showing
`Ctrl+K` to a Mac user is a small, visible sign that nobody checked.

---

## Selection models

**Single select (navigation-style):** click selects and deselects nothing else. `aria-current` or
`aria-selected`. Arrow keys move selection when it's a listbox; arrow keys move focus only (Space
selects) when the list is a multi-select.

**Multi-select, the desktop convention** — implement all four or none:

| Input | Behavior |
|---|---|
| Click | select this, clear everything else |
| ⌘/Ctrl + click | toggle this one, preserve the rest |
| Shift + click | select the contiguous range from the **anchor** (the last plainly-clicked item) to this one |
| ⌘/Ctrl + Shift + click | add the range to the existing selection |
| ⌘A / Ctrl+A | select all *in the current view/filter*, and say so: "All 50 on this page selected. [Select all 12,480]" |

The anchor is the part everyone gets wrong: shift-click extends from the last **non-shift** click,
not from the most recently selected item, and shift-clicking repeatedly must re-extend from that
same anchor rather than growing monotonically.

**Keyboard equivalents** (these are what make a table usable, and they're always missing):
`Shift+↑/↓` extends the range, `Space` toggles the focused row, `Ctrl+Space` toggles without
moving, `Esc` clears the selection.

**Touch has no ⌘ and no Shift.** Provide a mode: either a persistent leading checkbox column, or
long-press to enter selection mode (and then plain taps toggle). Never require a modifier key on a
touch surface, and never make the only multi-select affordance a hover-revealed checkbox.

**Show the count and the escape hatch.** A selection toolbar reading `3 selected · [Archive]
[Delete] [Clear]` must appear in a **reserved** region or as an overlay bar — not by pushing the
table down 48px the moment you tick a box.

---

## Hover-dependent UI is a bug on two platforms at once

Anything that only exists on hover does not exist for: touch users (no hover), keyboard users (no
pointer), screen-reader users, and anyone with a motor impairment who can't hold a cursor steady.

- **Row actions revealed on hover** are the single most common instance. Linear's row does it, but
  correctly: `.row:hover .infoIcon, .row:focus-within .infoIcon { opacity: 1 }` — **`:focus-within`
  is doing the accessibility work.** Copy that pair. Never ship a `:hover`-only reveal.
- On touch, revealed-on-hover actions must be permanently visible, or moved into an overflow menu
  reachable by a visible `⋯` button. Detect with `@media (hover: hover) and (pointer: fine)`, not
  by user-agent sniffing.
- **A tooltip may never be the only source of information.** Not for a disabled reason, not for an
  icon-button's label, not for a truncated value. Icon-only buttons need `aria-label` *and* a
  tooltip; the tooltip is the sighted-mouse convenience, the label is the actual answer.
- Tooltip timing, measured (Geist): **400ms delay on first hover, 100ms once the group is warm.**
  Instant tooltips fire while the cursor is merely passing through; a uniform 700ms makes a toolbar
  feel unresponsive. The delay-group is the fix, and it's ~10 lines.
- WCAG 1.4.13 (Content on Hover or Focus): hover-revealed content must be **dismissible** without
  moving the pointer (Esc), **hoverable** (you can move the mouse onto it without it vanishing),
  and **persistent** until dismissed or invalid. Most hand-rolled tooltips fail all three.

---

## When this advice is wrong

- **"Nothing moves on hover" is wrong for marketing pages and card grids of media.** A portfolio
  tile that lifts 4px and scales its image to 1.03 on hover is fine — there are twelve of them, you
  hover deliberately, and the motion is the product's personality. It's wrong the moment the same
  card is a row in a work surface someone stares at for six hours.
- **"Subtle hover deltas" is wrong for a low-frequency, high-stakes CTA.** GOV.UK's 1.5:1 hover
  step would be intolerable in a Linear sidebar and is exactly right on "Apply for a passport."
  Density and frequency set the delta, not house style.
- **"Never move layout" does not apply to `:active`.** GOV.UK's 2px press is good design. So is a
  `scale(0.97)` press on a mobile button, where the finger occludes everything else.
- **"Use `transition: all`" is always wrong, but "add a transition" isn't always right.** GitHub
  ships `0s` on issue-row hover and Radix ships `0s` on button hover. For pure color changes at
  high density, instant is the *premium* choice, not the lazy one. Reserve durations for things
  that appear, disappear or move.
- **"Undo over confirm" is wrong when the action can't be undone by your system** — sending money,
  sending an email to an external recipient, publishing to a public URL, deleting a resource whose
  ID is referenced externally. A delayed-send window ("Undo send" for 10s) converts some of these
  back into undoable actions; when it can't, confirm.
- **"Optimistic updates" are wrong under contention.** Two people editing the same field, an
  inventory counter, a seat map, a rate-limited API. Optimism there produces a UI that lies and
  then jumps.
- **"Skeletons over spinners" is wrong when you don't know the shape**, and wrong for actions
  (a skeleton for "Charging your card" is nonsense). It's also wrong for a surface that loads in
  120ms, where the answer is nothing at all.
- **"Always show a focus ring" — yes, but the treatment can change.** A `role="application"` canvas
  (Figma, a spreadsheet, a code editor) legitimately draws its own selection/caret indicator
  instead of an outline. The requirement is a visible indicator, not literally `outline`.
- **`opacity: 0.5` for disabled is defensible on a single-color, non-text element** — a disabled
  icon glyph with no adjacent border or fill. It's wrong on any compound control.
- **`prefers-reduced-motion` does not mean "no feedback."** Keep color transitions; drop transform,
  parallax, autoplay, and anything that moves more than ~10px. Replace slide-ins with a fade at the
  same duration. Note that Radix Themes and Polaris ship **zero** reduced-motion blocks — the
  application layer is expected to handle it, so it's on you.

---

## Anti-patterns: what generated UI does, and the correction

| # | The generated default | Why it's wrong | The correction |
|---|---|---|---|
| 1 | `transition: all 300ms ease-in-out` on everything | Animates layout and paint properties you never intended (including `width`, `height`, `top` mid-relayout), and 300ms is 2–6× the measured norm for a hover. shadcn ships `transition-property: all` at 150ms and even that leaks. | Name the properties: `transition: background-color 100ms ease-out, color 100ms ease-out`. Then pick the duration by density: 0–50ms rows, 100–150ms buttons. |
| 2 | `hover:opacity-90` / `hover:bg-primary/90` | Fades the *whole element* toward the page background, which lightens text and borders too, and inverts meaning in dark mode. It is also the single most recognisable shadcn signature. | Move one step on your color scale (`accent-9 → accent-10`), or add a 6–8% overlay of a named color (Material 3's state-layer model). |
| 3 | `hover:scale-105` / `hover:-translate-y-1` on rows or buttons | Layout jitter. Sweeping a cursor down a list makes every row jump. Also blurs text mid-transition on non-integer scales. | Delete it. If you need the affordance, deepen the background or move the shadow — or put the transform on `:active` instead. |
| 4 | `focus:outline-none` with nothing replacing it | Keyboard users lose all orientation. This is a WCAG 2.4.7 failure and the most common a11y defect in generated code. | `:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }` plus `outline: 3px solid transparent` for forced-colors mode. |
| 5 | A focus ring that transitions in | 10 fields Tab-ed through = 10 fades. Feels laggy. | Focus rings are instant. Exclude `outline`/`box-shadow` from the transition property list, or scope the transition to `background-color, color`. |
| 6 | `disabled:opacity-50` | Body text drops from 15.8:1 to **3.16:1**, and the border, icon and label fade unevenly. | Recolor with disabled tokens. GitHub's disabled label measures 5.44:1 on its disabled background. Better still, don't disable — explain on activation. |
| 7 | A spinner on every request | Under ~300ms it's a flicker read as jank; over 1s a bare spinner communicates nothing. | Nothing under 300ms. Skeleton (shape known) or determinate progress (fraction known) beyond. Guard with a 300ms delay *and* a 400ms minimum visible. |
| 8 | `animate-pulse` skeletons | Tailwind's `pulse` swings opacity 100%→50% over 2s — ~5× the amplitude and 2× the period of a tuned skeleton. Reads as a broken loop. | Radix's model: animate `background-color` between two neutral alpha steps (≈6% → ≈10%) over ~1s `alternate-reverse`. |
| 9 | Skeletons that don't match the content | The load ends in a layout jump, which is worse than a blank space. | Right row count, right column widths, right heights, right radii. If you can't match it, show nothing. |
| 10 | Replacing loaded content with skeletons on refetch | The user watches their own data disappear. Reads as a crash. | Dim the existing content to ~60% and show a 2px indeterminate bar at the section's edge. |
| 11 | Validating on every keystroke | Marks `a` invalid while the user types `ayush@…`. Hostile. | Validate on blur; clear on change; re-validate on blur. (Measured on Stripe.) |
| 12 | "Something went wrong" | Says nothing, offers nothing, and appears in a toast that then vanishes. | What happened · why · what to do — placed where the failure was, with a retry only if it's retryable. |
| 13 | Errors in toasts | Auto-dismiss destroys the only explanation of a broken state. | Inline, at the failure site, persistent. Toast is for *completed* actions. |
| 14 | A confirm dialog on every delete, with buttons "Cancel / OK" | Taxes everyone; "OK" tells the user nothing about what they're agreeing to. | Undo toast (10s) for reversible things. When a dialog is genuinely needed, the confirm button names the action: "Delete 3 shipments". |
| 15 | A red primary Delete button sitting in the resting UI | Signals the interface expects mistakes; makes the destructive action the most visually prominent thing on screen. | Neutral surface, red text at rest; fill red only on hover (GitHub's `--button-danger-*` ramp). Solid red belongs inside the confirmation. |
| 16 | Actions revealed only on `:hover` | Invisible on touch, unreachable by keyboard. | `:hover, :focus-within` together (Linear's pattern) and permanently visible under `@media (hover: none)`. |
| 17 | A tooltip as the only label on an icon button | Screen readers get nothing; touch gets nothing. | `aria-label` on the button + tooltip as a sighted-mouse convenience. Delay 400ms, 100ms warm. |
| 18 | `tabindex="0"` on every row of a list | 50 Tab presses to cross a table. | Roving tabindex: one Tab stop, arrows within, Home/End, typeahead. |
| 19 | A modal that returns focus to `<body>` | Keyboard user is silently teleported to the top of the page. | Store the trigger, restore focus on close, trap focus while open, `aria-hidden` the rest, Escape closes one layer. |
| 20 | An empty state that says "No data" | Wastes the highest-value onboarding surface in the product. | What this is · why it's empty · the one action. And a *different* string for filtered-empty, with a "Clear filters" button. |
| 21 | A button that shrinks to a spinner on submit | The label leaves, the button collapses, the toolbar reflows. | Fix the width, render the spinner over a `visibility: hidden` label, set `aria-busy`, block double-submit in the handler. |
| 22 | Silent optimistic rollback | The user believes the change stuck. This is the most damaging item on this list. | Restore the value *and* show a persistent inline error naming the object and the reason. Keep their input. |
| 23 | One `hover` treatment doing duty for `selected` | Selection is indistinguishable from "the cursor is here." | Selected = tinted fill + a non-color marker (rail, check, `aria-selected`). Hover on a selected row = one step darker than selected. |
| 24 | Shift-click that extends from "the last selected item" | Range selection behaves unpredictably after any ⌘-click. | Track an explicit anchor = the last **plain** click. Shift extends from the anchor, every time. |
| 25 | Drag-to-reorder with no keyboard path | WCAG 2.2 SC 2.5.7 failure, and unusable on touch with assistive tech. The demo looks great with a mouse, which is why it ships. | Add "Move up / Move down" to the row menu, handle `⌘↑/⌘↓` on the focused row, announce the result with `aria-live`. |

---

## Self-check

Run this against your own output before you call the screen done.

**States**
- [ ] Every interactive element has default / hover / focus-visible / active / disabled rendered — and I *looked* at all five.
- [ ] Nothing changes size or position on `:hover`. Grep your diff for `hover:scale`, `hover:translate`, `hover:p-`, `hover:border-2`.
- [ ] Hover deltas are ~6–8% on dense surfaces and one color-scale step on buttons — not `/90`.
- [ ] Hover transitions are 0–150ms, and they name specific properties. No `transition: all`.
- [ ] Focus ring is 2px with a background-colored gap, is not animated, uses `:focus-visible`, and has a `transparent` outline companion for forced-colors mode.
- [ ] Disabled is a recolor, not `opacity: 0.5`, and the reason is visible without hover.
- [ ] `selected` is visibly different from `hover`, and selected+hover+focus together are legible.
- [ ] Every hover-revealed control also appears on `:focus-within` and is permanently visible under `@media (hover: none)`.

**Async**
- [ ] Nothing renders for responses under ~300ms.
- [ ] Any skeleton matches the real layout, and the indicator has both an appear-delay and a minimum-visible time.
- [ ] Refetch dims existing content instead of replacing it with skeletons.
- [ ] Every optimistic update has a rollback that *tells the user*, keeps their input, and doesn't animate.
- [ ] Submitting buttons hold their width and can't be double-submitted.

**Decisions**
- [ ] Destructive actions use undo (10s toast + ⌘Z) unless genuinely irreversible; confirm buttons name the action.
- [ ] Validation is on-blur, clears on-change; submit moves focus to the first invalid field.
- [ ] Autosave has a `Saving…` / `Saved` / **`Not saved [Retry]`** slot that never moves, plus `beforeunload`.
- [ ] Empty states are one of three kinds, and the filtered one names the filter and offers to clear it.
- [ ] No error string in the diff is "Something went wrong", a bare code, or an unstyled stack trace.

**Keyboard**
- [ ] I completed the primary task with the mouse unplugged.
- [ ] Composite widgets are one Tab stop with arrow-key navigation.
- [ ] Escape closes one layer and returns focus to the trigger.
- [ ] `⌘K`, `/`, `?`, `Esc`, `⌘Enter` exist; single-letter shortcuts are suppressed inside text inputs; no browser shortcut is hijacked; modifiers render `⌘` vs `Ctrl` per platform.
- [ ] Multi-select supports click / ⌘-click / shift-click from a stable anchor, plus `Shift+↑↓` and `Space`, plus a touch path with no modifier keys.
- [ ] Every drag interaction has a single-pointer / keyboard alternative and announces the result.

**Motion**
- [ ] `prefers-reduced-motion: reduce` removes transforms and keeps color transitions.
- [ ] No focus ring, no error message, and no validation state animates in.
