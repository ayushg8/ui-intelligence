# Interaction, states and feedback

**Evaluated:** 2026-09

Every number here was read off a live product with a scripted browser — computed styles, CSS
custom properties, timed probes. Re-verified 2026-09 (see *Direction pass* at the end); values that
moved were corrected, values that no longer resolve were cut rather than kept on faith.

Why this file exists: generated interfaces ship exactly one interaction state. When they ship more,
the deltas are 5–10× too large and the durations 2–3× too long. `transition: all 300ms ease-in-out`
plus `hover:opacity-90` plus `hover:scale-105` is still the fastest way to tell that no human tuned
the interface.

---

## If you only apply five things

1. **Nothing moves on hover. Ever.** Change `background-color`, `color`, `border-color`, or the
   opacity of a pseudo-element overlay. Never `transform`, `scale`, `translate`, `padding`,
   `width`, `height`, `font-size`, `margin`, or `border-width`. If you want the pointer to feel
   responsive, make the color change *faster*, not bigger.
2. **Size the hover delta to how many of the thing there are.** A row in a 200-row list gets a
   3–8% overlay (GitHub: white → `#f6f8fa`, a 1.065:1 step). A one-per-page CTA can take a 1.4:1
   step (GOV.UK `#0f7a52` → `#0b5c3e` = 1.50:1; Notion's marketing CTA `#0075de` → `#005bab` =
   1.49:1 — two different houses, same number). Using the CTA delta on list rows makes lists
   strobe; using the row delta on a CTA makes it feel dead. **Then set `:active` to 1.5–2× the
   hover overlay** (Radix `gray-a3` 5.9% → `gray-a4` 9.0%; Notion 5.1% → 10.2%). A hover with no
   `:active` is why generated buttons feel like nothing happened when you click them.
3. **Hover transitions are 0–150ms, they name their properties, and they live in the `:hover`
   block — not the base rule.** Putting them on the base rule forces one symmetric duration;
   every product measured here is asymmetric (Linear fades in at `0s` and out at `150ms`; Notion
   does the exact opposite). Atlassian ships `--ds-listitem-hovered: 50ms` and
   `--ds-button-hovered: 150ms` as separate tokens; Radix's card hover is **40ms**. 300ms is wrong
   everywhere.
4. **Focus-visible is a 2px ring with a 2px page-background gap, and it is never removed.** Three
   independent teams converged on exactly 2px/2px — Vercel Geist
   (`box-shadow: 0 0 0 2px var(--ds-background-100), 0 0 0 4px var(--ds-focus-color)`), Radix
   (`outline: 2px solid var(--focus-8); outline-offset: 2px`), and Notion
   (`--tatami-dimension-interaction-focus-ring-outline-{width,offset}: .125rem`). The gap is what
   makes the ring legible on any surface — not the ring color.
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
| GitHub (Primer) | default button | **200ms**, `transition-property: background-color, border-color` | `ease` | computed — named properties, not `all` |
| Radix Themes | solid Button hover | **0s** | — | computed on `button.rt-Button` |
| Atlassian | list item hover | **50ms** | `cubic-bezier(.4, 1, .6, 1)` | `--ds-listitem-hovered` |
| Atlassian | list item pressed / selected | **100ms** | `cubic-bezier(.4, 1, .6, 1)` | `--ds-listitem-pressed`, `--ds-listitem-selected` |
| Atlassian | button hover / pressed | **150ms** | `cubic-bezier(.4, 1, .6, 1)` | `--ds-button-hovered`, `--ds-button-pressed` |
| Linear | hover highlight **in** | **0s** | — | `--speed-highlightFadeIn: 0s` |
| Linear | hover highlight **out** | **150ms** | `--ease-out-cubic` = `cubic-bezier(.215,.61,.355,1)` | `--speed-highlightFadeOut: .15s` |
| Linear | generic quick / regular | 100ms / 250ms | `--ease-out-quad` = `cubic-bezier(.25,.46,.45,.94)` | `--speed-quickTransition`, `--speed-regularTransition` |
| Vercel (Geist) | button hover | **150ms**, `transition-property: all` | `cubic-bezier(.4, 0, .2, 1)` | computed — **Geist ships `all` too**; see anti-patterns |
| Vercel (Geist) | popover open | 200ms | `--ds-motion-timing-swift` = `cubic-bezier(.175,.885,.32,1.1)` | `--ds-motion-popover-duration` |
| Vercel (Geist) | modal/overlay open | 300ms | same swift curve (slight overshoot) | `--ds-motion-overlay-duration`; also `--ds-motion-overlay-scale: .96` |
| shadcn/ui | button, all states | 150ms, `transition-property: all` | `cubic-bezier(.4, 0, .2, 1)` | computed — **`all` is the bug**, see anti-patterns |
| Apple | global nav | 240ms | — | `--r-globalnav-duration-medium: .24s` |
| Apple | dot-nav rest → hover | — | — | `--sk-dotnav-background` `rgba(255,255,255,.36)` → `-hover` `.48` — a **+12pp alpha step**, no duration token at all |
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

The press delta decides whether a click feels like it landed, and nobody publishes it. Two systems,
resolved to real values:

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

### Switch and small-control timings (measured)

Radix Themes' Switch, read off the stylesheet. This is the most carefully-tuned small control I
measured:

The track's `::before` declares four transitions in order — `background-position`,
`background-color`, `box-shadow`, `filter` — and **only the first one is asymmetric**:

| Rule | Value | What it means |
|---|---|---|
| `[data-state="checked"]::before` | `transition-duration: .16s, .14s, .14s, .14s` | the track gradient slides **on** in 160ms; colour/shadow/filter stay 140ms |
| `[data-state="unchecked"]::before` | `transition-duration: .12s, .14s, .14s, .14s` | it slides **off** in 120ms — **25% faster**; everything else is unchanged |
| `.rt-SwitchThumb` | `transition: transform .14s cubic-bezier(.45,.05,.55,.95)` | the thumb itself is **symmetric at 140ms** in both directions |
| `:active::before` | `transition-duration: 30ms` | while held down, the whole track responds in 30ms |
| `.rt-SwitchRoot:active::before` (surface) | `background-color: var(--gray-a4)` | press = 9.0% neutral overlay |
| `[data-state="unchecked"]:active::before` (classic) | `background-color: var(--gray-a5)` | 12.2% |
| `:focus-visible::before` | `outline-offset: 2px` | ring on the **track**, not the input |
| `[data-disabled] .rt-SwitchThumb` | `transition: none` | **a disabled switch never animates** |

Three transferable ideas, none of which appear in generated switches:

1. **On is slower than off — on exactly one property.** The gradient travel is 160/120; the thumb
   and every colour stay 140ms. Committing reads as deliberate, releasing gets out of the way, and
   the control never looks like two things animating at two speeds. If you copy one number, copy
   the split, not a blanket 160/120 on everything.
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

That last row: `:active:not(:focus-visible)` stops a keyboard user's Space-press from stacking a
press overlay *under* their focus ring, which would muddy both. Radix's literal rule is
`background-image: linear-gradient(var(--gray-a4), var(--gray-a4))`.

Radix also exposes **cursors as design tokens**, which almost nobody does:

Nine of them, and every component reads from this set rather than hard-coding a keyword:

```css
--cursor-button: default;   --cursor-checkbox: default;  --cursor-radio: default;
--cursor-switch: default;   --cursor-menu-item: default; --cursor-link: pointer;
--cursor-slider-thumb: default;  --cursor-slider-thumb-active: default;  /* NOT `grabbing` */
--cursor-disabled: not-allowed;
```

Two decisions fall out of it. **`pointer` is for links, not buttons** — Radix gives every control
`default` and reserves `pointer` for navigation, which is the platform convention `cursor-pointer`
on a `<div>` breaks. And **one token means one disabled cursor** across all nine, instead of nine
components each guessing. Copy the shape: `--cursor-disabled`, `--cursor-drag`, `--cursor-dragging`.

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
| Vercel (Geist) | `--ds-focus-ring: 0 0 0 2px var(--ds-background-100), 0 0 0 4px var(--ds-focus-color)` | — | two-layer, and **shipped as one named token** so no component re-derives it |
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

**GOV.UK's hover halo is the technique to steal.** Hovering a small radio paints a 10px grey ring
*outside* it via `box-shadow: 0 0 0 10px #cecece`: the perceived target grows 10px in every
direction and **no layout moves**, because box-shadow doesn't participate in layout. That is the
answer to "this control is too small to hit" — not padding, which reflows, and not `scale()`,
which jitters. And when focus and hover are both true the shadows
stack — `0 0 0 4px #ffdd00, 0 0 0 10px #cecece` — so the yellow ring sits *inside* the grey halo
and both stay readable.

### Loading indicators

| Product | Thing | Measured |
|---|---|---|
| Radix Themes | spinner | **8 leaves**, `--spinner-animation-duration: .8s`, `--spinner-opacity: .65`; each leaf fades on a `-n/8` delay — no rotation transform at all |
| Sonner | promise/loading spinner | 12-leaf, `1.2s linear infinite`, each leaf opacity 1 → 0.15 |
| Tailwind | `animate-spin` | `spin 1s linear infinite` — the slowest spinner in this table |
| GitHub (Primer) | spinner | `1s linear infinite` rotation (`--base-duration-1000`) |
| Radix Themes | skeleton | `rt-skeleton-pulse 1s ease infinite alternate-reverse`, `background-color: gray-a3 → gray-a4` (**5.9% → 9.0%** black) |
| Vercel (Geist) | skeleton | `loading-skeleton 1.5s ease-in-out infinite reverse`, a `translateX(-50%)` sweep |
| Tailwind / shadcn | `animate-pulse` | `2s cubic-bezier(.4,0,.6,1) infinite`, `@keyframes pulse { 50% { opacity: .5 } }` — **a 50% opacity swing; too loud, too slow** |
| Vercel (Geist) | tooltip delay | **400ms** first (`fadeInTooltip .1s ease-in .4s`), **100ms** once the group is warm (`fadeInTooltipFaster`) |
| Sonner | default toast lifetime | **~4000ms** (timed: visible 4142ms including exit) |

### Behavioral probes

Email-validation probes live in *Inline validation timing* below; these are the rest.

| Product | Probe | Result |
|---|---|---|
| Radix DropdownMenu | open via click | focus lands on `[role=menu]` container, `tabindex=-1`; **all items `tabindex=-1`** |
| Radix DropdownMenu | press ArrowDown | first item becomes `tabindex=0`, others stay `-1` — roving tabindex; menu is **one tab stop** |
| Radix DropdownMenu | press Escape | menu closes, focus returns to trigger, `aria-expanded="false"` |
| Radix Dialog | open | focus moves to the **first focusable field**, not the container; 19 sibling elements get `aria-hidden="true"`; `body { pointer-events: none; overflow: hidden }` |
| Radix Dialog | press Escape | closes, focus returns to the exact trigger button |
| GitHub | drag a task-list item | source gets `opacity: 0`; cursor `grabbing`; pinned-issue drag source gets `--bgColor-accent-muted` |
| Stripe (register) | email field computed style | `transition-duration: .24s`, `transition-property: color` — **colour only**, nothing else transitions |
| GitHub | `issues?q=label:zzz-does-not-exist-99` | yellow banner names the bad token (*"Invalid value `zzz-does-not-exist-99` for `label`"*) and highlights it in the query input; the empty region below still says only *"No results / Try adjusting your search filters"* with **no clear-filter action** |

---

## The state machine, organised by decision

### Decision 1: what is this state allowed to change?

Give every state a **change budget**.

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

**The two-layer ring** is the answer:

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

**Recolor, don't fade.** Body text `#1f2328` on white is 15.80:1. Apply `opacity: 0.5` —
shadcn's default — and the composite is `#8f9194`, **3.16:1**. On a compound control the border,
the icon and the label each fade by a different perceptual amount, so one declaration produces
three different disabled treatments.

Recoloring is the right mechanism. But **nobody measured here ships a readable disabled state**,
and that is the honest finding:

| System | Disabled treatment | Measured contrast |
|---|---|---|
| shadcn/ui | `opacity: 0.5` on body text | **3.16:1** |
| GitHub (Primer), light default, 2026-09 | `--fgColor-disabled: #818b98` on `--control-bgColor-disabled: #eff2f5` | **3.07:1** — *worse than shadcn* |
| GitHub, the `#59636e` scope still in the same sheet | `#59636e` on `#eff2f5` | **5.44:1** |
| Radix Themes, text | `color: gray-a8; background: gray-a3` | **1.90:1** |
| Radix Themes, disabled **checked** checkbox | `gray-a8` glyph compositing onto the `gray-a3` box (`#b0b0b0` on `#f0f0f0`) | **1.90:1** |

Two things to take from this. **Take the number, not the vendor**: `#59636e` on `#eff2f5` is
5.44:1 and that is the target, but GitHub's own light default no longer resolves to it, so
"do what GitHub does" is not a specification. Ship ≥4.5:1 on the disabled background and verify it
rather than inheriting it.

And **give disabled-and-checked more contrast than disabled-and-unchecked.** A disabled-but-checked
checkbox is one of the densest things in a settings UI — "this is on, and you can't change it" —
and Radix renders both states at 1.90:1, so the state itself disappears. Disabled controls are
formally exempt from WCAG 1.4.3; that exemption is the reason every system in this table ships
something unreadable, not a reason for you to.

**The honest exception**, measured in full: GOV.UK ships
`.govuk-input:disabled { opacity: .5; color: inherit; background-color: transparent; cursor: not-allowed }`.
The two declarations everyone drops are the ones that make it safe — `color: inherit` and a
**transparent** background mean there is nothing under the text to fade *differently* from the
text. So the rule is not "never `opacity: .5`", it is: opacity is defensible only when the control
is text on the page's own ground with no fill, no glyph and no saturated border. Add any one of
those three and you need tokens. Radix's disabled switch is the model — it recolors
(`background-color: var(--gray-a3)`) *and* sets `transition: none` on the thumb so a disabled
control can never animate.

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
- Never signal **selection** with `font-weight` — selection is a transient pointer/keyboard state,
  and bolding a row changes its text metrics and can reflow it on a 1px boundary. Reserve the width
  if you want weight contrast at all.

  **Scope: this is a ban on weight for selection, not a ban on weight.** Bold-for-unread in a mail
  list, bold-for-modified in a file tree, bold-for-current in a nav — those are *content status*,
  they're persistent, they're the established convention, and replacing them with a tinted fill on
  200 rows produces a striped mess that reads as 200 selected items. Keep the weight; just reserve
  the advance width so nothing reflows when it changes.

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
`alternate-reverse` — a **5.9% → 9.0% black** oscillation, a 3.1pp swing. Tailwind's
`animate-pulse` is `pulse 2s cubic-bezier(.4,0,.6,1) infinite` with `@keyframes pulse { 50% { opacity: .5 } }`
— a **50pp** swing at half the tempo. Use Radix's. A skeleton must never be more contrasty than the
content it replaces; if you can read the skeleton across the room, it's wrong.


### Decision 7: error, success and read-only on a control

- **Error** on a field: border-color change + a message below + `aria-invalid="true"` +
  `aria-describedby` pointing at the message. That's three things and it's enough. Don't also
  tint the background, recolor the label, add an icon *and* shake it — a control with five error
  signals reads as a system that panicked.
- **Success** is usually the wrong state to render — *when the write is synchronous and reliable*.
  Then the value on screen is the success signal, and a green check on every valid field turns a
  form into a scoreboard that makes the remaining empty fields look like failures.

  **Note the trap, because this file recommends the thing that springs it.** Under an optimistic
  update the on-screen value is proof of nothing — you painted it before the server answered. So
  "the value is on screen" only means "saved" where the write is *not* optimistic, *not*
  offline-queued, and *not* one the user is unable to re-derive. Where any of those hold, ship an
  explicit persisted-state signal (the autosave slot, a settled row style, a version stamp).
  Exceptions besides: an async check the user can't verify themselves ("`ayush` is available"), a
  completed action with no visible result (a toast, not a field state), and a high-consequence
  single-shot entry — a wire transfer, a dose, a filing — where "probably saved" is not a state a
  user should have to infer. Rendered success decays: ~2s, then neutral.
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

These differ from buttons in one way: **the control itself is the result.** There is no separate
thing to look at, so the control carries both the feedback and the state.

**Switch vs checkbox is a semantic decision, not a style one.**

- A **switch** takes effect immediately and has no Save button. Label it as a state, not an action
  — "Email notifications", not "Enable email notifications". If your switch needs a Save button,
  it should have been a checkbox.
- A **checkbox** is a value in a form that gets submitted with everything else. It's also the only
  one of the two with a legitimate third state (`indeterminate`, for a parent whose children
  disagree). Switches have no indeterminate state; if you need one, you needed a checkbox.
- Radio vs a segmented control is a density decision, not a semantic one — same semantics, and the
  segmented control is right when there are 2–4 short options you want visible and comparable.

**Timings** — the full measured breakdown is in *Switch and small-control timings* above. Distilled:

```css
.switch::before                 { transition: background-position .12s linear, background-color .14s ease-in-out; }
.switch[data-state=on]::before  { transition-duration: .16s, .14s; }  /* only the travel is asymmetric */
.switch:active::before          { transition-duration: 30ms; }        /* press: near-instant */
.switch[data-disabled] .thumb   { transition: none; }                 /* never animates */
```

- **The travel is asymmetric (160 on / 120 off); the colour is not (140 both ways).** Weighting
  every property in the "on" direction makes the control look like two things at two speeds.
- **`:active` drops to 30ms** so the press is acknowledged before the toggle completes. This one
  line is the difference between a switch that feels mechanical and one that feels like a demo.
- **The thumb travels on `transform: translateX()`**, never `left` or `margin`. Compositor-only.
- **Disabled never animates.**

**What must never happen:**

- **The switch must not wait for the server to move.** Move the thumb on click, then reconcile. A
  switch that hangs mid-travel for 400ms is the worst-feeling control in software. If the write
  fails, snap the thumb back and show a persistent inline error naming the setting — never a toast
  (see the optimistic-rollback rules above).
- **No layout movement, ever.** The track and thumb keep their geometry; only `translateX` and
  `background-color` change. A switch that grows on hover shifts its own label.
- **The label is the hit target** — a 20px switch is below every touch-target minimum on its own.
  **Wire `htmlFor`; don't wrap**, the moment the label contains anything interactive of its own.
  "Share diagnostic data — [Privacy policy]" inside a `<label>` means every tap on that link also
  toggles the switch, which is the kind of consent bug that ends up in a screenshot. If it must stay small, use GOV.UK's trick: extend the
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
| **≤100ms** | direct manipulation — the app *is* the thing | Render no indicator. Still lock the control and set `aria-busy` at 0ms. |
| **100ms – 1s** | a noticeable but unbroken flow | Still usually nothing. If the action has no visible result of its own, put an inline state on the control that caused it. |
| **1s – 10s** | the user's attention is at risk | Skeleton or determinate progress + the ability to do something else. Keep the rest of the UI live. |
| **>10s** | the user leaves | Say what's happening, give a real estimate or a step count, and let them navigate away and be notified. Never a bare spinner. |

### Choosing between nothing / spinner / skeleton

The rule, in order:

1. **Can you avoid the wait?** Optimistic update, prefetch on hover-intent, or render from cache
   and revalidate. This beats every indicator.
2. **Is the p75 under ~300ms?** Render no *indicator*. A spinner that appears and disappears
   within 300ms reads as a glitch, not as feedback.

   **This governs the indicator, not the interaction.** Three things still happen at 0ms, and
   conflating them with the spinner is how this rule produces a worse interface:
   - **The control stops accepting input immediately** and gets `aria-busy="true"`. Otherwise a
     180ms "Send $4,200" looks identical to a dead button, the user clicks again, and you have
     double-charged them. Fast is not the same as acknowledged.
   - **If the action has no visible result, an `aria-live` message fires regardless of duration.**
     "Render nothing" for a 250ms filter means a screen-reader user gets nothing at all, because
     the visual change they were going to miss anyway was the entire feedback.
   - **Check p95, not just p75.** Bimodal latency (p75 200ms, p95 8s) still needs the delayed
     indicator wired up; it just won't usually fire.
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
skeleton that appears at 305ms and vanishes at 340ms, which is worse than either extreme.

You can buy half of `DELAY` in pure CSS by fading the indicator in over ~250ms instead of popping
it: a response that lands at 200ms then shows a barely-visible ghost rather than a hard flash.

**Spin at 0.8–1.0s and keep it small.** Measured: Radix `--spinner-animation-duration: .8s` at
`--spinner-opacity: .65`, Sonner 1.2s, Tailwind and Primer 1s. A spinner slower than ~1.2s reads as
a slow system; faster than ~0.6s reads as panic. Radix's is the one to copy structurally — **8
leaves fading on staggered `-n/8` delays, with no rotation transform at all**, so there is nothing
to judder if the main thread stalls.

### Optimistic updates, and rolling back honestly

Apply optimistically when the action is (a) user-initiated, (b) almost always succeeds, and
(c) locally computable: toggles, renames, reorder, star/like, marking read, adding a tag, sending
a message.

Do **not** apply optimistically when the server owns the truth: payments, availability/inventory,
permission changes, anything that returns a generated ID the user will see, anything another user
is concurrently editing.

Rollback rules:

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
- **Undo is only real if the side effects wait too.** This is the failure that actually bites: you
  "Remove member", the undo toast is up for 10s, and the webhook, the revocation email and the SSO
  session kill have already fired. Undoing your own row does not un-send any of that. Either
  **queue the effect for the length of the undo window** and only then commit, or drop back to a
  confirm. An undo that restores the database and nothing else is a lie with a button on it.
- **Undo assumes the user is still there.** It's the wrong pattern where the surface can vanish
  before the window closes — a warehouse scanner going into a pocket, a kiosk, a shared terminal,
  a one-handed mobile flow mid-walk. If the action can't be reviewed later from a history or a
  trash, those contexts need the confirm.
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

Three different empties, three different jobs.

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

Its constants are in *Toast internals* above. The one to copy is the **dual** dismiss threshold —
45px **or** velocity > 0.11 — because a distance-only threshold is why hand-rolled
swipe-to-dismiss feels broken: a fast flick should dismiss at any distance.

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
  icon glyph with no adjacent border or fill. It's wrong on any compound control. GOV.UK, the
  strictest system measured here, ships `.govuk-input:disabled { opacity: 0.5 }` — so treat the
  ban as "wrong on compound controls," not as an absolute.
- **"Validate on blur" is wrong for a single-field form.** Vercel's ~1000ms idle debounce is
  better there: the user gets the answer without leaving the field. It becomes wrong the moment
  the form has enough fields that people Tab through them quickly, where a 1s timer fires *after*
  focus has already moved and the error appears next to a field the user has left.
- **"Never debounce validation feedback" has no exceptions in the clearing direction** — but
  submit-only validation (Linear's contact form) is genuinely fine for 2–4 fields the user will
  submit within seconds. It scales terribly past ~6 fields.
- **The 160/120 switch asymmetry is for a switch that takes effect immediately.** A checkbox in an
  unsubmitted form should be symmetric and fast (or instant) — it isn't committing to anything
  yet, so weighting the "on" direction implies a permanence that hasn't happened.
- **"Render nothing under 300ms" is wrong if you read it as "do nothing."** It scopes the
  *indicator*. The input lock, `aria-busy`, and the `aria-live` announcement for an action with no
  visible result all fire at 0ms regardless. On a payment or any non-idempotent submit, a button
  that stays live for 180ms buys you double-charges.
- **"Undo over confirm" is wrong when the side effects don't wait.** If removing a member fires a
  webhook, an email and a session revocation immediately, undo restores your row and nothing else.
  Queue the effect for the length of the undo window, or confirm. Same for contexts where the
  surface can disappear before the window closes — kiosks, shared terminals, a scanner going into
  a pocket.
- **"Don't render success" is wrong wherever the write is optimistic or offline-queued** — which
  is exactly what this file tells you to build. The justification ("the value is on screen, that's
  the signal") assumes the on-screen value proves persistence, and under optimism it proves
  nothing. Also wrong for high-consequence single-shot entry: a transfer, a dose, a filing.
- **"Never signal selection with `font-weight`" is a ban on weight for *selection*, not for
  *status*.** Bold-for-unread and bold-for-modified are persistent content state and the
  established convention; tinting 200 rows instead reads as 200 selected rows. Reserve the advance
  width and keep the bold.
- **"Wrap the control in a `<label>`" is wrong when the label contains a link.** Use `htmlFor`, or
  every tap on your privacy-policy link also flips the consent switch.
- **`prefers-reduced-motion` does not mean "no feedback."** Keep color transitions; drop transform,
  parallax, autoplay, and anything that moves more than ~10px. Replace slide-ins with a fade at the
  same duration. Note that Radix Themes and Polaris ship **zero** reduced-motion blocks — the
  application layer is expected to handle it, so it's on you.

---

## Anti-patterns: what generated UI does, and the correction

| # | The generated default | Why it's wrong | The correction |
|---|---|---|---|
| 1 | `transition: all 300ms ease-in-out` on everything | Animates layout and paint properties you never intended (`width`, `height`, `top` mid-relayout), and 300ms is 2–6× the measured norm for a hover. **`all` is not only a shadcn habit** — Vercel's own Geist button measures `transition-property: all` at 150ms, so "a real design system does it" is not a defence for either of them. | Name the properties: `transition: background-color 100ms ease-out, color 100ms ease-out`. Then pick duration by density: 0–50ms rows, 100–150ms buttons. GitHub's default button is the model — `background-color, border-color` at 200ms, nothing else. |
| 2 | `hover:opacity-90` / `hover:bg-primary/90` | Fades the *whole element* toward the page background, which lightens text and borders too, and inverts meaning in dark mode. It is also the single most recognisable shadcn signature. | Move one step on your color scale (`accent-9 → accent-10`), or add a 6–8% overlay of a named color (Material 3's state-layer model). |
| 3 | `hover:scale-105` / `hover:-translate-y-1` on rows or buttons | Layout jitter. Sweeping a cursor down a list makes every row jump. Also blurs text mid-transition on non-integer scales. | Delete it. If you need the affordance, deepen the background or move the shadow — or put the transform on `:active` instead. |
| 4 | `focus:outline-none` with nothing replacing it | Keyboard users lose all orientation. This is a WCAG 2.4.7 failure and the most common a11y defect in generated code. | `:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }` plus `outline: 3px solid transparent` for forced-colors mode. |
| 5 | A focus ring that transitions in | 10 fields Tab-ed through = 10 fades. Feels laggy. | Focus rings are instant. Exclude `outline`/`box-shadow` from the transition property list, or scope the transition to `background-color, color`. |
| 6 | `disabled:opacity-50` | Body text drops from 15.8:1 to **3.16:1**, and the border, icon and label fade unevenly. | Recolor with disabled tokens. GitHub's disabled label measures 5.44:1 on its disabled background. Better still, don't disable — explain on activation. |
| 7 | A spinner on every request | Under ~300ms it's a flicker read as jank; over 1s a bare spinner communicates nothing. | Nothing under 300ms. Skeleton (shape known) or determinate progress (fraction known) beyond. Guard with a 300ms delay *and* a 400ms minimum visible. |
| 8 | `animate-pulse` skeletons | Tailwind's `pulse` is `2s cubic-bezier(.4,0,.6,1)` swinging opacity 100%→50% — a **50pp** swing at half the tempo of a tuned skeleton. Reads as a broken loop. | Radix's model: animate `background-color` between two neutral alpha steps (**5.9% → 9.0%**, a 3.1pp swing) over 1s `alternate-reverse`. |
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
| 26 | A hover state with no `:active` at all | The click produces no evidence it registered, so users click twice — which double-submits. This is the most common half-finished state machine in generated UI. | `:active` = the same neutral overlay at **1.5–2×** hover (Radix `a3→a4` = 1.53×; Notion 5.1%→10.2% = 2.00×). Not a new color, not a transform. |
| 27 | `transition` declared on the base rule | Forces one symmetric duration, so enter and exit can never differ. Every product measured here is asymmetric. | Put the transition inside the `:hover` block. Linear: in `0s`, out `150ms`. Notion: in `150ms`, out `0s`. Pick by density; just don't ship symmetric. |
| 28 | A switch that animates at one duration in both directions, with no `:active` | Reads as a CSS demo, not a mechanism. | Travel on `160ms` / off `120ms`; colour a flat `140ms` both ways; `:active` `30ms`; `transition: none` on the thumb when disabled. (Radix Themes, measured — only the travel is asymmetric.) |
| 29 | A switch whose thumb waits for the server before moving | The control hangs mid-travel; it is the worst-feeling control in software. | Move on click, reconcile after. On failure snap back **and** show a persistent inline error naming the setting. |
| 30 | Debouncing the *clearing* of a validation error | Measured on Vercel at **1094ms** — the user has already fixed the field and the form keeps calling them wrong. | Debounce the appearance (blur, or ~1s idle). Clear unconditionally and immediately on the first keystroke that makes the value valid. |
| 31 | Growing a small control's hit area with `padding` or `scale()` on hover | Padding reflows the row; `scale()` jitters and blurs text. | `box-shadow: 0 0 0 10px var(--hover-grey)` — GOV.UK's radio. The perceived target grows in every direction and box-shadow doesn't participate in layout. Compose with the focus ring: `0 0 0 4px #ffdd00, 0 0 0 10px #cecece`. |
| 32 | A press overlay that stacks under the focus ring | Keyboard Space-press muddies both indicators. | Scope press styling as `:active:not(:focus-visible)` (Radix's rule). |
| 33 | A disabled-but-checked checkbox rendered at low contrast | It carries real state ("this is on and locked") and disappears. Radix ships the glyph at **1.90:1** — and GitHub's own light disabled default is now **3.07:1**, so there is no vendor to copy here. | Give disabled-and-checked more contrast than disabled-and-unchecked, and verify it: **≥4.5:1** on the disabled background. |

### The 2026 additions

Items 1–33 are the durable ones. These are what changed, and the reason they need naming
separately: **the public "AI slop" lists are almost entirely about static visuals** — Inter,
purple gradients, bento grids, identical feature cards. Reddit mining across 3.2M posts puts
shadcn/Tailwind defaults and "AI purple" at the top; animation is ~1% of complaints and focus,
loading, disabled and validation states appear nowhere. Interaction tells don't get caught by the
current critique vocabulary, which is exactly why they ship unfixed.

| # | The 2026 generated default | Why it's wrong | The correction |
|---|---|---|---|
| 34 | `whileHover={{ scale: 1.05 }}` in Motion/Framer | The layout-jitter defect of `hover:scale-105`, relocated into JS props — so a diff grep for `hover:scale` now misses it entirely, and the spring makes the settle *longer* than the CSS version. | Same correction as #3: delete it, or move it to `whileTap`. Grep `whileHover`, `whileInView` and `data-aos`, not just the Tailwind classes. |
| 35 | `initial={{opacity:0, y:20}}` + `whileInView` on every section (or `data-aos="fade-up"`) | Content doesn't exist until scrolled to: Ctrl+F finds nothing, deep links land on blank space, LCP is deferred behind an observer, and with `prefers-reduced-motion` unhandled the whole page is a slideshow. | Reveal-on-scroll is for at most one deliberate moment per page. Everything else renders at rest. If you keep one, `viewport={{ once: true }}` and drop the transform under reduced-motion. |
| 36 | `<Toaster richColors />` and a `toast.success()` on every mutation | Confirms things that are already visible on screen, so the toast becomes noise and the one toast that carries an *undo* gets ignored with the rest. `richColors` also makes a green toast the loudest object on the page. | Toast only for a completed action with **no visible result**, or one carrying undo. If the row disappeared, that is the feedback (item 13). |
| 37 | A `cmdk` palette bound to ⌘K as decoration | Ships with no debounce, no roving focus, no empty state, and often no results wired up — a shortcut users now expect everywhere that does nothing when they use it. | Either wire it (debounced query, roving tabindex, real empty state, Escape returns focus to the trigger) or don't bind ⌘K. A dead ⌘K is worse than no ⌘K. |
| 38 | Shimmer / "Thinking…" streaming states on deterministic waits | The AI-native idiom applied to a 200ms database read. Shimmer implies indeterminate generative work; using it for a known-shape fetch trains users to distrust the signal, and it's a skeleton with extra amplitude (item 8). | Shimmer only where output is genuinely streaming token-by-token. A known-shape fetch is a skeleton; a known fraction is a progress bar. |
| 39 | A sparkle icon plus a glow on every AI-touched element | Multi-colour borders on every regenerated paragraph, animated glow on every suggestion. The AI reads as theatrical, and the decoration collides with the actual state indicators — selection, focus and error all now compete with a glow. | Mark AI provenance once, in one place, in one weight. Never let it use the same visual channel as focus or selection. |
| 40 | `shadow-[0_0_20px_rgba(...)]` neon glow as the hover state on dark | A coloured glow is not a state change, it's a mood. It reads at a different distance than the element it's on, it has no `:active` counterpart, and on a list it's the strobe problem from item 3 in a new channel. | Hover on dark moves *lighter* — GitHub's dark button goes `#212830 → #262c36`, a 1.06:1 step. Same 5–8% overlay logic, inverted direction. |
| 41 | `cursor-pointer` on every clickable `<div>` | `pointer` is the platform's signal for *navigation*. Putting it on buttons, rows and cards makes the one thing that actually navigates indistinguishable — and the `<div>` underneath usually isn't focusable or Enter/Space-activatable either (item 18's cousin). | Radix's token set is the reference: `--cursor-link: pointer`, everything else `default`, `--cursor-disabled: not-allowed`. And make it a real `<button>`. |
| 42 | `transition-all duration-200` | Item 1 with a tuned number. The duration got fixed; `all` did not, so `width`, `height` and `transform` are still in the transition. | The bug was never the duration. Name the properties. |

---

## Self-check

Every item is a **grep**, a **shot** (visible in a screenshot), or a **probe** (a scripted check).
Nothing here asks you to remember whether you did something.

Two artifacts make most of it mechanical. Build them once per surface:

```bash
# 1. STATE SHEET — render each component 5× with states forced, then look at one image.
#    Wrap each in .is-hover / .is-focus / .is-active / .is-disabled and mirror your
#    :hover/:focus-visible/:active rules onto those classes.
node $UI_LIBRARY/tools/shot.mjs http://localhost:3000/__states --widths 1440 --full

# 2. STATE PROBE — read computed styles for real, in the real states.
#    playwright: el.hover(); page.mouse.down(); el.focus(); getComputedStyle(el)
```

### Grep — run these against the diff

Each line is a command plus what a clean result looks like.

- [ ] **Nothing moves on hover.** `rg -n 'hover:(scale|translate|-translate|rotate|p[xytblr]?-|m[xytblr]?-|border-[0-9]|text-(xs|sm|base|lg|xl|2xl))|whileHover|data-aos'` → **no hits**. Also `rg -n ':hover[^{]*\{[^}]*(transform|padding|width|height|margin|font-size|border-width)'` → no hits.
- [ ] **No `all` in any transition.** `rg -n 'transition-all|transition:\s*all|transition-property:\s*all'` → **no hits**.
- [ ] **No opacity-fade hovers.** `rg -n 'hover:opacity-|hover:bg-[a-z-]+/[0-9]'` → **no hits**.
- [ ] **Every hover has an `:active`.** `rg -c 'hover:|:hover'` vs `rg -c 'active:|:active'` → the active count is **not less than half** the hover count. Zero actives with non-zero hovers is an automatic fail.
- [ ] **Press styling is focus-safe.** `rg -n ':active'` → every hit on an interactive control reads `:active:not(:focus-visible)` (or `active:` paired with a `focus-visible:` override).
- [ ] **Focus is never just removed.** `rg -n 'outline-none|outline:\s*none|focus:outline-none'` → every hit is in a file that also matches `rg -l 'focus-visible'`.
- [ ] **Forced-colors companion exists.** If `rg -q 'focus-visible[^{]*\{[^}]*box-shadow'` matches, then `rg -n 'outline:\s*[0-9.]+\w+\s+solid\s+transparent'` must also match.
- [ ] **Focus rings don't animate.** `rg -n 'transition[^;]*(outline|box-shadow)'` → no hits on a `:focus-visible` rule.
- [ ] **Disabled is a recolor.** `rg -n 'disabled:opacity-|:disabled[^{]*\{[^}]*opacity'` → **no hits**, unless the control is text on the page ground with no fill, glyph or saturated border.
- [ ] **Asymmetric timing is possible at all.** `rg -n 'transition-duration'` inside `:hover`/`[data-state]` blocks → **at least one hit**. Zero means every transition is on the base rule and enter/exit can never differ.
- [ ] **Switch timings.** `rg -n 'translateX|transform:\s*translate'` in the switch → present; `rg -n 'left:|margin-left:'` → absent.
- [ ] **Hover-revealed controls have a keyboard path.** For every `rg -n 'group-hover:|:hover .*(opacity-100|visible)'` hit there is a matching `focus-within` in the same rule.
- [ ] **No positive tabindex.** `rg -n 'tabIndex=\{?[1-9]|tabindex="[1-9]'` → **no hits**.
- [ ] **No `<div onClick>` without the rest.** `rg -n '<div[^>]*onClick'` → every hit also has `role=`, `tabIndex={0}` and `onKeyDown`.
- [ ] **No dead error strings.** `rg -ni 'something went wrong|an unexpected error|error: undefined|failed to fetch'` → **no hits**.
- [ ] **Undo toasts get a real window.** `rg -n 'toast\([^)]*undo|action:\s*\{' ` → each has `duration: 10000` (not Sonner's 4000 default).
- [ ] **No toast for a visible result.** `rg -n 'toast\.success|toast\('` → each call site is an action with **no** on-screen change, or carries undo.
- [ ] **Validation clear is not debounced.** `rg -n 'debounce|setTimeout'` near validation → the debounce wraps only the *set*, never the *clear*.
- [ ] **Optimistic writes have a visible rollback.** For every `rg -n 'optimistic|setOptimistic|mutate\('` hit there is an error branch that renders a persistent element — not `toast(`.
- [ ] **`cursor: pointer` is for links only.** `rg -n 'cursor-pointer|cursor:\s*pointer'` → hits are on `<a href>` only.
- [ ] **Scroll-reveal is not on everything.** `rg -c 'whileInView|data-aos|animate-in'` → **≤1 per page**.

### Shot — visible in the state-sheet screenshot

- [ ] All five states render, and **hover, focus-visible and active are three visibly different things**. If hover and focus look the same, focus is doing no work.
- [ ] Dense-surface hover is a **barely-visible** step (~5–8%). If it's obvious in isolation on the sheet, it will strobe in a 200-row list.
- [ ] `:active` is **visibly darker than hover** — the 1.5–2× step — and not a different hue.
- [ ] `selected`, `selected + hover`, and `selected + hover + focus` are all rendered on the sheet and all three are legible and distinct.
- [ ] Disabled text is readable at arm's length. Screenshot it, sample the two colors, run `node $UI_LIBRARY/tools/contrast.mjs <fg> <bg>` → **≥4.5:1**. Disabled-**and-checked** scores higher than disabled-and-unchecked.
- [ ] The skeleton's row count, column widths, heights and radii match the loaded state. Put the two screenshots side by side; nothing should shift.
- [ ] The skeleton is **lower contrast than the content it replaces**.
- [ ] The submitting button is the **same width** as the resting button. Compare the two shots.
- [ ] The error message occupies reserved space — the field below it sits at the same y in both shots.
- [ ] The selection toolbar appears without pushing the table down. Same test: y-position of row 1 is unchanged.

### Probe — scripted, ~20 lines of Playwright each

- [ ] **Hover deltas are in range.** Read `backgroundColor` at rest and on hover; compute the ratio. Dense surface **1.03–1.10:1**; button ~**1.10–1.20:1**; one-per-page CTA may go to 1.5:1.
- [ ] **Active ÷ hover is 1.5–2×** on the same overlay scale.
- [ ] **Hover duration is 0–150ms** and `transitionProperty` names properties. `getComputedStyle(el).transitionProperty !== 'all'`.
- [ ] **Focus ring survives forced colors.** `browser.newContext({ forcedColors: 'active' })`, Tab to the control, screenshot → a ring is still visible.
- [ ] **Reduced motion keeps feedback.** `newContext({ reducedMotion: 'reduce' })` → transforms gone, `backgroundColor` transition still present, focus ring still instant.
- [ ] **Nothing flashes under 300ms.** Throttle the route to a 150ms response; assert no spinner/skeleton node ever mounts. Then throttle to 2s and assert one appears after ~300ms and stays ≥400ms.
- [ ] **Fast submits still lock.** Throttle to 150ms, click the submit button twice in 50ms → the handler fires **once** and `aria-busy="true"` was set before the response.
- [ ] **Escape returns focus.** Open the dialog, press Escape, assert `document.activeElement` is the trigger — **not `<body>`**.
- [ ] **Composite widgets are one Tab stop.** Count Tab presses to cross the list/menu/table: **1**, and ArrowDown moves within.
- [ ] **The mouse-unplugged run.** Complete the primary task with `page.keyboard` only. It either finishes or it doesn't.
- [ ] **Drag has a keyboard path.** Reorder a row without `mouse.down()`, and assert an `aria-live` region announced the new position.
- [ ] **Validation timing.** Type an invalid value, wait 2s focused, blur, then fix it: error must appear no earlier than blur-or-1s-idle, and clear on the **first** keystroke that makes it valid — assert the clear latency is **<100ms**, not ~1s.
- [ ] **Autosave failure renders.** Fail the save route; assert a persistent `Not saved` element exists and `beforeunload` is registered.

---

## Direction pass (2026-09)

What this pass changed, and what it verified. Re-probed with Playwright against live products on
2026-09-10; contrast computed with the WCAG 2.x relative-luminance formula.

**Numbers corrected (5).**

| Claim | Was | Now | What happened |
|---|---|---|---|
| GitHub disabled foreground | `--fgColor-disabled: #59636e`, **5.44:1**, "fully readable" | resolves to **`#818b98`** on `--control-bgColor-disabled: #eff2f5` = **3.07:1** | GitHub's light default regressed below shadcn's `opacity: .5` (3.16:1). `#59636e` still exists in the same sheet under another scope and *would* give 5.44:1. The file now recommends the number and stops citing the vendor. |
| Radix disabled-**checked** checkbox | **1.68:1** | **1.90:1** | The old figure composited the `gray-a8` glyph and the `gray-a3` box against white *independently*. The glyph actually paints onto the box: `#b0b0b0` on `#f0f0f0`. Still unreadable — the argument survives, the arithmetic didn't. |
| Radix switch 160/120 | "turning on takes 160ms, off 120ms" | 160/120 applies **only to `background-position`**; `background-color`, `box-shadow` and `filter` are **140ms** both ways, and the thumb's `transform` is **symmetric 140ms** | The distilled CSS in Decision 9 said `transition: background-color .12s`, which was the wrong property. An agent copying it would have shipped an asymmetric colour fade and a symmetric travel — exactly backwards. |
| Radix skeleton amplitude | "≈6% → ≈10% black" | **5.9% → 9.0%** | Resolved from `--gray-a3` `#0000000f` and `--gray-a4` `#00000017`. |
| Vercel Geist button | "150ms `cubic-bezier(.4,0,.2,1)`" | confirmed — **and `transition-property: all`** | Anti-pattern #1 blamed shadcn alone for `all`. Geist ships it too; the file now says so. |

**Claims cut as unverifiable.** Stripe's docs spinner (16px, `SpinnerAnimationShow 250ms`,
`.6s` rotation) no longer appears in any stylesheet docs.stripe.com serves — it was asserted in two
places and is now replaced by values that still resolve: Radix `--spinner-animation-duration: .8s`
/ `--spinner-opacity: .65`, Tailwind `--animate-spin: 1s`. Apple's
`--sk-dotnav-hover-animation-duration` does not exist; the dot-nav row now carries what is actually
there — a `.36 → .48` alpha step with no duration token at all.

**Verified unchanged (spot-checked, all exact).** GitHub `--duration-fast: 80ms`, row hover
`#ffffff → #f6f8fa` = 1.06:1 at `0s`, `--focus-outline-offset: -.125rem`. The whole Radix alpha
ladder a2–a8 (2.4 / 5.9 / 9.0 / 12.2 / 14.9 / 19.2 / 26.7%), switch `:active` 30ms, card-classic
hover 40ms, `--segmented-control-transition-duration: .1s`, separator `0s` under
`:has(:focus-visible)`, `:active:not(:focus-visible)`, all nine `--cursor-*` tokens, indigo
`#3e63dd → #3358d4`. Every GOV.UK value — `#0f7a52 → #0b5c3e` = **1.50:1**, `#083d29` 2px shadow,
`:active { top: 2px }`, the radio's `0 0 0 4px #ffdd00, 0 0 0 10px #cecece` stack, the input's
3px outline + `inset 0 0 0 2px`, and `:disabled { opacity: .5 }`. Every Notion tatami token
(`#0075de` 4.57:1 → `#005bab` 6.81:1, a 1.49:1 step; ring 2px/2px). Vercel's motion tokens and the
400ms/100ms tooltip delay group. Apple `--r-globalnav-duration-medium: .24s` and `outline-offset: -7px`.
Every Sonner constant (4000 / 3 / 14 / 45 / 200 / velocity > 0.11, v2.0.8). Tailwind's
`animate-pulse` (2s, 50% opacity swing, v4.3.3). shadcn's `opacity: .5` → `#8f9194`, **3.16:1**.

**Rules given scope.** Five rules were stated without limits and would be followed off a cliff:
"render nothing under 300ms" (separated from the input lock, `aria-busy` and the `aria-live`
announcement, all of which fire at 0ms — otherwise a 180ms payment button invites double-charges);
"undo over confirm" (fails when webhooks/emails/revocations fire during the undo window, and in
contexts where the surface disappears first); "don't render success" (**contradicted this file's
own optimistic-update advice** — the on-screen value proves persistence only when the write isn't
optimistic or offline-queued); "never signal selection with `font-weight`" (a ban on weight for
*selection*, not for *status* — bold-for-unread stays); "wrap the control in a `<label>`" (breaks
consent switches whose label contains a link).

**Anti-patterns brought current.** Items 1–33 held up. Nine 2026 additions (34–42) cover the
transform moving from Tailwind classes into Motion props (`whileHover`, `whileInView`, `data-aos`
— which defeats a `hover:scale` grep), universal scroll-reveal, `<Toaster richColors />` on every
mutation, decorative `cmdk` palettes, shimmer/"Thinking…" applied to deterministic waits, sparkle-
and-glow AI provenance colliding with focus and selection, neon glow as a dark-mode hover state,
`cursor-pointer` on non-links, and `transition-all duration-200` — item 1 with a tuned number.

Worth noting what the research turned up: the public 2026 "AI slop" critique is almost entirely
about **static visuals**. Reddit mining across 3.2M posts ranks shadcn/Tailwind defaults and "AI
purple" first; animation is ~1% of complaints, and focus, loading, disabled and validation states
appear nowhere. Interaction tells are invisible to the current critique vocabulary, which is why
they ship unfixed — and why this file is the part of the corpus that has to catch them.

**Self-check rebuilt.** The old list mixed real checks with unverifiable self-assessment ("I
*looked* at all five"). Every item is now a `rg` command with a stated clean result, something
visible in a named screenshot, or a scripted Playwright probe with an assertion.
