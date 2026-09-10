# Keyboard-first productivity tools

**Evaluated:** 2026-09 · **Direction pass:** 2026-09 (numbers re-probed, see end)

## What this archetype is for

Tools someone lives inside for four to eight hours a day, where the same handful of operations
(triage, assign, schedule, navigate, snooze, review) are performed hundreds of times per session by
a user who already knows what they want. The interface's job is to remove the distance between
intent and effect: one keystroke, no confirmation, no spinner, no cursor travel. That constraint
produces a very particular visual language — small type, short rows, near-zero chrome, selection
treated as a caret rather than a highlight, and motion budgeted in the 100–150ms range. It is the
right archetype for issue trackers, mail clients, CRMs, calendars, code review, terminals and
launchers. It is the **wrong** archetype for anything with a low-frequency, high-stakes, or
first-time user: signup flows, checkout, tax filing, healthcare intake, consumer onboarding. In
those, the density that makes Linear fast makes your product illegible. This file is the most
imitated and most botched archetype in the corpus, so it also carries the longest failure section.

**It is not a dark-mode archetype.** Of the five reference pages re-shot in this pass, three render
light (Attio, Zed, Raycast's manual) and two dark (Linear, Raycast's marketing). The density, the
caret-selection discipline and the motion budget are the archetype; the ground color is not. Copying
Linear's `#08090a` because "this is what fast looks like" is the first wrong turn.

---

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Linear** | The canonical implementation, and the only one that ships its whole design system in the marketing bundle so you can read it | Hover is `#ffffff05` (2%) and selected is `#ffffff0a` (4%) — a 2× step between two states that are otherwise identical |
| **Raycast** | Palette-as-the-entire-product; the hardest version of the problem | The palette's persistent footer bar, showing the two keys live for the currently selected row |
| **Zed** | Rejects the Inter/8px-grid orthodoxy: three licensed faces, none of them Inter | Heading weights get *lighter* as they get larger (`--h0-weight: 340` vs `--h4-weight: 410`), and the h1 really renders at 340 |
| **Superhuman** | Split-inbox as top-level tabs with live counts | Counts belong in the tab label (`Important 12  Calendar 13`), not in a badge bubble |
| **Missive** | Dense light-mode three-pane mail: selection has to survive focus leaving the pane | Selected row is a **solid blue fill with white text**, not a tint |
| **Notion Calendar** (ex-Cron) | Single-letter accelerators surfaced inline in the right rail | A command row can carry its own key chip; you don't need a separate cheat sheet |
| **Cursor** | Agent-queue list under real load: many rows, each with status + diff + age | Right-align relative age (`now`, `10m`, `45m`) in tertiary gray; never a timestamp |
| **Amie** | Relative-time bucketing instead of dates | Group headers read `Yesterday / Last week / Previous 30 days / Past` |
| **Attio** *(not on the brief)* | Linear-grade density executed in light mode for a CRM | The entire `--text-*` scale defaults to weight **500**; only headings go to 600 |
| **Graphite** *(not on the brief)* | Keyboard-first code review; ships accelerators on the marketing site | A single-key chip (`G`) inside the primary nav button — the promise is made before signup |

**How I found the two off-list products.** Attio surfaced while measuring dense-table products for a
different archetype — its hero renders a real DOM app shell, and the density profile (14px body at
weight 500, `-0.005em` tracking) reads as an explicit Linear response built for light mode. Graphite
surfaced from its own marketing nav: the `Log in` button carries a `G` key chip, which is a reliable
tell that keyboard navigation is a product-level commitment rather than a feature-list item.

**Dead or repositioned, do not cite as live references:** **height.app** does not resolve. **Fey**
has shut down and redirects to a farewell page after joining Wealthsimple. **Warp** and **Shortwave**
have repositioned their marketing to AI framing and no longer show keyboard UI above the fold —
Warp's all-monospace type system was in the original brief but is no longer verifiable on the live
site, so the monospace argument below rests on Zed instead. **Arc** redirects to Dia; the
sidebar-as-app-switcher pattern is retained from the earlier evaluation and was **not** re-verified
in this pass — treat it as a lead, not a measurement.

---

## Measured specifics

Everything below was read out of the live products with Playwright — CSS custom properties resolved
against `document.documentElement`, plus computed styles and bounding boxes off rendered DOM. Every
number in this section was re-probed in the 2026-09 direction pass unless marked otherwise.

### Linear — neutral ramp (dark), read from `:root` on linear.app

| Token | Value | Role |
|---|---|---|
| `--color-bg-primary` / `--color-bg-level-0` | `#08090a` | app ground |
| `--color-bg-panel` / `--color-bg-level-1` | `#0f1011` | sidebar / panel |
| `--color-bg-level-2` / `--color-bg-tint` | `#141516` | hovered surface |
| `--color-bg-level-3` | `#191a1b` | raised |
| `--color-bg-secondary` | `#1c1c1f` | popovers |
| `--color-bg-tertiary` | `#232326` | inputs |
| `--color-bg-quaternary` | `#28282c` | pressed |
| `--color-bg-translucent` | `#ffffff0d` (5%) | the universal overlay |
| `--color-text-primary` | `#f7f8f8` | |
| `--color-text-secondary` | `#d0d6e0` | **sidebar labels live here, not in primary** |
| `--color-text-tertiary` | `#8a8f98` | metadata, timestamps |
| `--color-text-quaternary` | `#62666d` | placeholders **and sidebar group headers** |
| `--color-line-*` | tint `#141516` · quaternary `#141515` · tertiary `#18191a` · secondary `#202122` · primary `#37393a` | **five**-step divider ramp; tint and quaternary differ by one point of blue |
| `--color-border-primary/secondary/tertiary` | `#23252a` / `#34343a` / `#3e3e44` | |
| `--color-border-translucent` / `-strong` | `#ffffff0d` / `#ffffff14` | 5% and 8% white |
| `--color-brand-bg` | `#5e6ad2` | |
| `--color-accent` / `-hover` / `-tint` | `#7170ff` / `#828fff` / `#18182f` | |
| `--focus-ring-color` | `#5e69d1` | |
| `--focus-ring-width` / `-offset` | resolves to `1px` / `2px` on linear.app | but see the note below — the bundle declares both 1px and 2px |
| `--selection-bg` | `color-mix(in srgb, #9c9da1 20%, transparent)` | unfocused text selection is *gray* |
| `--selection-bg-active` | `color-mix(in srgb, #5e69d1 40%, transparent)` | focused selection is brand at 40% |
| `--border-hairline` | `1px`, and **`0.5px` at ≥2× device-pixel-ratio** | |

**The hairline halves on retina.** `--border-hairline: 1px` is overridden to `.5px` inside
`@media (min-device-pixel-ratio: 2) or (min-resolution: 192dpi)`. This is the most portable single
line in the file for anyone shipping light-mode density: a 1px rule that is correct on a 1× display
is twice as heavy as intended on every laptop your users actually own. Linear pays for it with one
media query.

**On the focus ring, be honest:** the bundle declares `--focus-ring-width: 2px` in its base `:root`
and again under `[data-theme=light]`, and `1px` in a later `:root` block from the editor stylesheet,
which is what wins on linear.app. So "Linear uses a 1px ring" is what *resolves*, not a stated
principle — the same product ships a 2px ring in another scope. Do not quote the 1px as doctrine.

Note the ramp is not a tinted gray scale. `#08090a → #0f1011 → #141516 → #1c1c1f → #232326` is
almost neutral with a one-to-three point blue lean, and the steps are *small* (7, 5, 8, 7 points of
luminance). Nothing in this palette is `#0a0a0a` / `#171717` / `#262626` — the Tailwind neutral ramp
has ~2× the step size and reads as banded by comparison.

### Linear — type scale (root 16px)

| Token | Size / line-height / tracking |
|---|---|
| `--text-tiny` | 10px / 1.5 / `-0.015em` |
| `--text-micro` | 12px / 1.4 / `0` |
| `--text-mini` | **13px / 1.5 / `-0.01em`** ← the app's workhorse |
| `--text-small` | 14px / `calc(21/14)` = 21px / `-0.013em` |
| `--text-regular` | 15px / 1.6 / `-0.011em` |
| `--text-large` | 17px / 1.6 / `0` |
| `--title-1` | 590 · 17px / 1.4 / `-0.012em` |
| `--title-2` | 590 · 20px / 1.33 / `-0.012em` |
| `--title-3` | 590 · 24px / 1.33 / `-0.012em` |
| `--title-4…9` | 590 · 32 / 40 / 48 / 56 / 64 / 72px, all at `-0.022em` |

Display line-heights are **not** a smooth ramp: title-4 through title-9 run `1.125, 1.1, 1.0, 1.1,
1.06, 1.0`. They are hand-set per size, not generated. If your display scale interpolates
line-height linearly, you are doing something Linear deliberately does not.

Weights are **not** the standard 400/500/600/700: `--font-weight-normal: 400`,
`--font-weight-medium: 510`, `--font-weight-semibold: 590`, `--font-weight-bold: 680` (plus
`--font-weight-light: 300`). This is a variable-font product taking the interpolated weights that
optically match at 13px, and 590 vs 600 is a visible difference at small sizes. Font stack is
`"Inter Variable"` with `--font-settings: "cv01","ss03"` and `--font-variations: "opsz" auto`; mono
is `"Berkeley Mono"` and there is a third face, `--font-serif-display: "Tiempos Headline"`. All
three are licensed, none is a Google font.

Tracking is negative everywhere except at 10px and 12px, where it goes to `-0.015em` and `0` — small
text gets *looser*, large text gets *tighter*, the opposite of what a naive scale does.

**Two overlapping scales ship in the same bundle.** Alongside `--text-*` there is an older
`--font-size-*` scale (`micro 11px · mini 12px · small 13px · regular 15px · large 18px`) with a
parallel `*Plus` variant of each. The app-shell replica in the hero **rescopes the whole
`--font-size-*` family one step up** on its own wrapper — `micro` becomes 12px, `mini` becomes 13px,
`small` becomes 14px — which is how `--font-size-miniPlus` on a nav row renders at 13px rather than
the marketing site's 12px. The transferable idea: a dense app shell can carry its own type scale as
a scoped override rather than forking the token file.

### Linear — measured geometry (rendered DOM at 1440px)

| Thing | Measured |
|---|---|
| Sidebar container width | **232px** (padding `8px 16px 16px 8px`) |
| Sidebar content column | **208px** |
| Nav row height | **28px** |
| Nav row padding | `padding-inline: 7px` |
| Nav row radius | **8px** |
| Gap between nav rows | **2px** (`.navItems { gap: 2px }`) |
| Nav label | 13px, weight **510**, `#d0d6e0` |
| Icon → label gap | **8px** |
| Nav row icon color | `--color-text-quaternary` (`#62666d`) — two steps below the label |
| Group header (`Workspace`, `Favorites`) | 24px tall, 12px, weight 510, **`#62666d` quaternary**, padding `4px 0 4px 6px` |
| Gap above a group header | **16px** (vs 2px between rows) |
| Sidebar right border | **none** — separation is background level only |
| **Rest → hover** | `transparent` → **`#ffffff05`** (1.96%). Height, color, border, shadow, transform all unchanged. |
| **Rest → selected** | `transparent` → **`#ffffff0a`** (3.9%), via `[data-active=true]` |
| Nav row transition | **none declared.** The row has no `transition` property at all. |
| Workspace switcher (the row above nav) | 28px, radius 8px, hover `#ffffff08`, `transition: background .16s var(--ease-out-quad)` |
| Menu item (popover rows) | 32px tall, 13px, weight 510; highlight is an `::after` at `inset: 0 4px`, `#ffffff08`, radius 6px, toggled by `opacity` |
| Inline message bubble | 13px / 20px, padding 10px, radius 8px, bg `#161718`, `box-shadow: 0 0 0 1px rgba(0,0,0,.2)` |

**Three numbers, not one.** The often-quoted "2% hover" is real — `#ffffff05` is 5/255 = 1.96% — but
it is one of a set. Hover is 2%, selected is 4%, and the popover highlight is 3% (`#ffffff08`). The
system is a **2× step between hover and selected**, which is what makes the keyboard caret readable
while the mouse is on screen. Quoting the 2% alone and reusing it for both states reproduces exactly
the defect the number is famous for preventing.

**The nav row does not animate.** The earlier version of this file reported a measured
`color .1s, background .1s` transition on the nav row. That was wrong: `.navItem` declares no
transition. The `.16s` figure belongs to the workspace switcher one row above it. So the strongest
statement is stronger than previously written — Linear's most-traversed row changes state on frame 0
in both directions, and only larger, less-traversed controls get a duration.

**The highlight is inset from the row.** Linear's popover rows draw their highlight as a pseudo
element at `inset: 0 4px` — 4px in from each side — so the fill never touches the popover's own
padding edge. A full-bleed highlight in a padded container reads as a rendering bug; this is the fix,
and it costs one pseudo element.

### Linear — motion, elevation, chrome

| Token | Value |
|---|---|
| `--speed-quickTransition` | `0.1s` |
| `--speed-regularTransition` | `0.25s` |
| `--speed-highlightFadeIn` | **`0s`** |
| `--speed-highlightFadeOut` | `0.15s` |
| `--ease-out-quad` | `cubic-bezier(.25,.46,.45,.94)` |
| `--shadow-low` | `0 2px 4px #0000001a` |
| `--shadow-medium` | `0 4px 24px #0003` |
| `--shadow-high` | `0 7px 32px #00000059` |
| `--shadow-stack-low` | `0 8px 2px #0000, 0 5px 2px #00000003, 0 3px 2px #0000000a, 0 1px 1px #00000012, 0 0 1px #00000014` |
| `--scrollbar-size` / `-active` | `6px` / `10px` |
| `--scrollbar-width` (gutter reserved) | `12px`, `--scrollbar-gap: 4px` |
| `--scrollbar-color` / hover / active | `#ffffff1a` / `#fff3` / `#fff6` |
| `--radius-*` | `4, 6, 8, 12, 16, 24, 32`, `--radius-rounded: 9999px`, `--radius-circle: 50%` |
| `--layer-command-menu` | **`650`** — between `--layer-popover: 600` and `--layer-dialog-overlay: 699` |
| `--min-tap-size` | `44px` (exists in the same file as the 28px desktop row) |
| `--header-height` / `-bg` / `-blur` / `-border` | `72px` / `#0b0b0bcc` / `20px` / `#ffffff14` |
| `--mask-ease` | `#0003` — the scroll-edge fade color |
| `--prose-max-width` | `624px` |

### Raycast — palette product, dark ramp

`--color-bg #07080a` · `--color-bg-100 #101111` · `--color-bg-200 #18191a` ·
`--color-bg-300 #313133` · `--color-bg-400 #494b4d` · `--color-border #242728`
`--color-fg #f4f4f6` · `-200 #c2c7ca` · `-300 #78787c` · `-400 #5e6366`

Ten-step gray: `#e6e6e6 #cdcece #9c9c9d #6a6b6c #434345 #2f3031 #1b1c1e #111214 #0c0d0f #07080a`.

Accents each ship with a paired alpha suffix `26` = **14.9%**: `--color-blue #57c1ff` /
`--color-blue-transparent #57c1ff26`; same for red `#ff6161`, green `#59d499`, yellow `#ffc533`.
That pairing is how you get colored status pills that survive both a dark panel and a dark popover
without a second token.

Rounding: `none 0 · xs 4 · sm 6 · normal 8 · md 12 · lg 16 · xl 20 · xxl 24 · full 100%`.
Spacing (base 8): `4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 168, 224` — note it
*breaks* the doubling at the top (`--spacing-12: 168px`, not 128). Section rhythm is tuned by hand;
only the small end of the scale is mechanical. Two mono faces ship side by side: `--font-geist-mono`
(GeistMono, used for keycaps) and `--monospace-font` (JetBrains Mono, used for code).

**Keycap recipe** (measured on manual.raycast.com — note raycast.com/manual redirects there):
`12.6px` GeistMono, color `rgba(0,0,0,0.4)`, background `rgba(0,0,0,0.05)`, radius `4px`, padding
`2.52px 5.04px`, and a **three-layer inset shadow**:

```
inset 0  0    0 1px rgba(0,0,0,0.2)     /* the ring */
inset 0  1px  0 0   rgba(255,255,255,0.6) /* top highlight */
inset 0 -1.5px 0 0  rgba(0,0,0,0.2)     /* bottom shade — the part everyone omits */
```

There is **no `border` property** — every edge is an inset shadow, so the cap adds no layout width.
Separately, `--key-bg-start-color: rgb(18,18,18)` and `--key-bg-end-color: rgb(13,13,13)` define the
dark keycap's vertical gradient: a 5-point gradient, not a 40-point one.

Raycast also ships `--spring-1` as a CSS `linear()` easing with **101 stops**, peaking at
**1.04283 at 40%**, above 1.0 from 30% to 69%, settled by ~70%. A 4.3% overshoot — that is what a
spring should feel like in a productivity tool, not the 15–20% bounce a default `spring()` gives you.

### Zed — the anti-orthodoxy numbers

- Heading weights **decrease** with size: `--h0-weight: 340`, `--h1: 390`, `--h2: 390`, `--h3: 380`,
  `--h4: 410`. Verified live: the homepage `h1` computes to `font-weight: 340` at 48px/57.6px with
  `-0.96px` tracking. Large text at 400 looks heavy; small text at 400 looks thin. Zed compensates
  optically instead of using one weight ramp.
- **Three licensed faces, zero Inter, zero system stack.** Body, nav and all UI text render in
  `writer` (the iA Writer duospaced family) at 16px/24px. The hero headline is `plexSerif` (IBM Plex
  Serif), italic, in blue. Keycaps are `Lilex`, Zed's own mono. The earlier version of this file
  called the body "a monospace-adjacent system stack" — the monospace-adjacent part is right, the
  system-stack part is wrong; `--font-sans` is a plain Tailwind default that nothing on the page uses.
- Body text color is `oklch(0.359 0.0155 262.9)` — a near-black with a slight blue cast, on an
  off-white paper ground. Not `#000` on `#fff`.
- `--default-transition-duration: .15s`, `--ease-out: cubic-bezier(0,0,.2,1)`.
- Radii: `.125 / .25 / .375 / .5 / .75 / 1rem` (2 / 4 / 6 / 8 / 12 / 16px).
- `--blog-content-width: 740px`, `--markdown-layout-width: 45rem`.
- Keycap: `12.25px` Lilex, bg `#f0f0f0`, `1px solid #ccc`, radius `4px`, padding **`4px 4px 6px`**,
  inset shadow `0 -1px 0 #e6e6e6`. Inline notation caps in prose are larger, at `14px`.
- **Shortcut notation is lowercase and hyphenated**: `cmd-,`, `⌥-c`, chords as `⌘-k then ⌘-s`.
  Not `⌘K` glyph clusters. Deliberate: Zed is cross-platform, and `cmd-` degrades to `ctrl-` in text
  without re-rendering a glyph.
- Marketing site ships app accelerators: `Download now [D]`, `Clone source [C]`, `Sign up [S]`, and
  a `⌘⇧P` chip inside the header search field. **The chip restyles per button** — a translucent
  white box inside the blue primary, a gray box inside the secondary — rather than one static chip
  component dropped on both.

### Attio — the light-mode density answer

- **The entire text scale defaults to weight 500.** `--text-xs`, `-sm`, `-base`, `-lg`, `-xl` and
  `-2xl` all ship `--font-weight: 500`; only the `--text-heading-*` ramp goes to 600. This is the
  single most useful trick for light-mode density: at 13–14px on white, weight 400 goes gray-mushy
  and 500 stays crisp without looking bold. The earlier version of this file reported it as a
  small-text-only rule — it is systemic.
- **Line-height steps by exactly 2px across the body scale**, as fixed rem values, never multipliers:
  `xs 12px/18px · sm 14px/20px · base 16px/22px · lg 18px/24px`. The *multiplier* therefore falls as
  size rises (1.5 → 1.43 → 1.375 → 1.33) without anyone having to reason about multipliers.
- **Tracking tightens monotonically with size**, which is the exact inverse of Linear's small-text
  exception: `xs 0 · sm -0.005em · base/lg -0.01em · heading-lg -0.015em · heading-xl -0.02em`.
  Two competent products, opposite rules. Pick one and be consistent; do not average them.
- Heading scale: `xs 1.75/2.125rem` · `sm 2/2.25rem` · `md 2.5/2.75rem` · `lg 3.5/3.75rem` ·
  `xl 4/4rem`, all weight 600.
- Radii, seven steps: `.125 / .25 / .375 / .5 / .75 / 1 / 1.25rem`. `--default-transition-duration: .15s`.
- Easing set: `--ease-out: cubic-bezier(0,0,0,1)` (immediate departure, long settle),
  `--ease-in: cubic-bezier(.3,0,1,1)`, `--ease-in-out-cubic: cubic-bezier(.65,0,.35,1)`.
- Layering is **per-surface, in consecutive triples**, not a global ramp:
  `dialog-overlay 100 / dialog-content 101`; `context-menu-portal 200 / positioner 201 / popup 202`;
  `mobile-nav-overlay 90 / content 91`; `site-header 92`; `navigation-menu 93`.
- Fonts: `inter` for UI, `interDisplay` for headings, `JetBrains Mono` for data, plus a
  `tiemposText` serif.

### The generic baseline, measured — shadcn/ui `command`

This is what you get if you install the default and ship it. Measured live:

| Thing | shadcn default | Linear equivalent |
|---|---|---|
| Item height | **32px** | 28px |
| Item text | 14px / 20px, weight 400 | 13px / 16px, weight 510 |
| Item padding | `6px 8px` | `padding-inline: 7px` |
| Item radius | 6px | 8px |
| Selected state | `--accent` = `lab(96.52%)` on `lab(100%)` → **~3.5% L\* shift** | 4% white, with hover at 2% — two distinct states |
| Hover state | **same `--accent` token as selected** | different token, half the value |
| Group heading | 12px / 16px, weight 500, 28px tall, `--muted-foreground` | 12px, weight 510, quaternary |
| Palette width | **384px**, fixed | wide enough to show trailing shortcut + context |
| Palette radius / border / padding | 14px (`--radius-xl`) / `1px solid` / 4px | — |
| Radius scale | `--radius: .625rem` → `sm 6 · md 8 · lg 10 · xl 14` | `4 · 6 · 8 · 12 · 16 · 24 · 32` |

Two of these are outright bugs when the palette is keyboard-driven. **384px fixed** leaves ~366px of
usable row width, which is enough for `Profile ⌘P` and not enough for a real command carrying both a
breadcrumb and a chord — long items ellipsis and the trailing chip is the first thing to go. And the
hover and selected states **share one token**, so the keyboard caret becomes invisible the moment the
mouse is on screen. Fix both before you ship it: widen to 560–640px, and split `[data-selected]` off
`hover:` with roughly a 2× value difference between them.

---

## The decisions that make it work

**1. Hover and selected are the same property at a 2× ratio, and nothing else changes.**
Linear's sidebar row goes `transparent → #ffffff05` on hover and `transparent → #ffffff0a` when
active. Height stays 28px. No border appears. No shadow. No transform. No transition is declared at
all, so both apply on frame 0. *Why it works:* in a 30-row list the cursor crosses many rows per
second; any property that affects layout or draws an edge produces a visible strobe, and any
transition on the entry produces smear. *The generic alternative:*
`hover:bg-accent hover:border hover:shadow-sm hover:-translate-y-0.5`, four simultaneous changes,
twitchy in exactly the situation the component exists for. *When it does not apply:* (a) marketing
card grids and pricing tables — few large targets, low traverse rate, where a lift and a shadow are
correct and a 2% tint is invisible; (b) **light mode**, where 2% black on white is below the
perceptual floor — Attio and Missive both need 4–6% or a real gray fill to get the same read; (c) any
list where rows are taller than ~56px, at which point a background-only change is too diffuse to
localize and you need a left rule or a fill.

**2. Selection is the caret, so it must outweigh hover and survive focus leaving the pane.**
In a keyboard product the highlighted row is not "the row you're pointing at", it is "the row the
next keystroke will act on". Missive, in light mode, fills the selected mail row with **solid blue
and white text** — not a tint — because focus regularly leaves that pane for the reading pane and the
selection must still read. Linear's 2× step (2% → 4%) is the minimum viable version of the same idea.
*The generic alternative:* one `--accent` for both `:hover` and `[data-selected]`, the shadcn
default. *When it does not apply:* (a) single-select mouse-driven lists where nothing acts on
selection; (b) **multi-select surfaces**, where a strong per-row fill and a checkbox column fight
each other — there the caret needs a different channel entirely, usually a left border or a ring,
because the fill is already spoken for by "checked"; (c) lists where the selected row expands into a
detail view, which is its own unmistakable signal.

**3. 28px rows, 13px text, weight 510 — density comes from line-height, not from cramming.**
Linear's 13px `--text-mini` sits on a 16px line box inside a 28px row: 6px of breathing room above
and below. At a 900px viewport that is ~32 visible rows versus ~28 for the shadcn 32px default and
~20 for the 44px "accessible minimum" row. *Why it doesn't feel cramped:* the vertical padding is
proportionally generous (43% of the row is padding), the horizontal padding is tiny (7px), and the
label color is `--color-text-secondary` (`#d0d6e0`), not primary — so a long list reads as an even
gray field with no high-contrast noise. *The generic alternative:* 44px rows with 14px/400 text and a
divider between each, a mobile settings screen wearing a desktop costume. *When it does not apply:*
(a) touch — Linear itself ships `--min-tap-size: 44px` in the same token file; (b) any row that can
wrap to two lines, where 28px is a clipping bug waiting to happen and 2-line rows want 44–52px with
the same 13px type (Cursor and Zed both do exactly this); (c) users you know are over ~50 or on a
27" display at arm's length, where 13px at weight 510 is a support ticket — this density assumes a
laptop at 60cm.

**4. The sidebar has no border. Separation is a background level.**
Measured: `border-right: 0px none`. The sidebar is `--color-bg-panel` (`#0f1011`) against
`--color-bg-primary` (`#08090a`) — a 7-point luminance step. *Why it works:* a 1px line at any
contrast is a hard edge your eye lands on repeatedly; a 7-point step reads as depth and disappears.
*The generic alternative:* `border-r border-neutral-800`, which at `#262626` against `#0a0a0a` is a
24-point edge that cuts the app in half. *When it does not apply:* (a) light mode, where 7 points of
luminance is usually not enough separation — Attio and Missive both use a real hairline, and that is
correct; (b) any panel that can be resized or dragged, where the border *is* the affordance and
removing it removes the handle; (c) high-contrast or forced-colors mode, where background-level
separation vanishes entirely — you need a `@media (forced-colors: active)` branch that puts the
border back.

**5. State applies on frame 0; only *removal* is animated.**
`--speed-highlightFadeIn: 0s` and `--speed-highlightFadeOut: 0.15s`, and the nav row goes further by
declaring no transition in either direction. *Why it works:* perceived latency is dominated by the
gap between keypress and first visible change. Animating the appearance of a highlight adds that gap
for free; animating its disappearance costs nothing because the user has already moved on. *The
generic alternative:* `transition: all 200ms` symmetrically on everything, which makes a
200ms-slower product out of an identical one. *When it does not apply:* (a) destructive or
irreversible state, where a deliberate ramp is a feature; (b) anything that moves rather than
recolors — an entering panel or popover at 0s reads as a glitch, not as speed, so the rule is about
*state on existing elements*, not about layout; (c) `prefers-reduced-motion`, which this rule already
satisfies in the fade-in direction and should be respected in the fade-out.

**6. The scrollbar gutter is reserved, and the scrollbar is 6px.**
`--scrollbar-size: 6px`, `--scrollbar-width: 12px`, `--scrollbar-gap: 4px`. The visible track is half
the reserved width. *Why it works:* content never reflows when a list crosses the overflow threshold
— the single most common cause of "the app jumped" in web productivity tools. *The generic
alternative:* `overflow-y: auto` with no gutter reservation, which shifts every row by ~15px the
moment one item is added. *When it does not apply:* (a) macOS overlay scrollbars already do this, so
on a Mac-only internal tool the reservation is 12px of wasted column; it matters on Windows and under
any always-visible-scrollbar setting, which is why it belongs in the token file rather than in an
assumption; (b) full-width content areas where 12px of reserved gutter visibly breaks a centered
measure — there, `scrollbar-gutter: stable both-edges` is the better trade.

**7. The command palette gets its own z-layer, above popovers and below dialogs.**
`--layer-popover: 600` → `--layer-command-menu: 650` → `--layer-dialog-overlay: 699` →
`--layer-dialog: 700` → `--layer-toasts: 800` → `--layer-tooltip: 1100` →
`--layer-context-menu: 1200`. *Why it works:* `⌘K` must be pressable while a popover is open (it
covers it) but must not cover a confirm dialog. If the palette shares a layer with dialogs you get
the bug where the palette opens *behind* an open menu, and the fix is always a scattering of magic
z-index numbers. Note tooltips at 1100 sit above dialogs — correct and counterintuitive.
*When it does not apply:* (a) a global ramp is the wrong shape once surfaces can nest — Attio instead
assigns **consecutive triples per surface** (`context-menu-portal 200 / positioner 201 / popup 202`),
which is what you want when a library renders portal, positioner and content as three separate nodes
and you need to interleave them; (b) anything rendered into the top layer (`<dialog>`, popover API),
where z-index stops applying and the stacking order is invocation order — a token ramp there is
inert and misleading.

**8. Show the shortcut where the command is, not in a cheat sheet.**
Attio puts `Quick Actions ⌘K` in the sidebar as a bordered button with the chord as a trailing chip,
and a *second* control next to it pairing a magnifier icon with a `/` chip. Notion Calendar puts
single letters (`S` for "Share availability", `F` for "Meet with") at the right edge of right-rail
rows. Zed and Graphite ship key chips on their marketing CTAs. *Why it works:* this is the entire
answer to the keyboard-power-vs-discoverability tension. You do not teach shortcuts with a modal
tour; you print them on the thing they operate, right-aligned, in tertiary color, so they are
ignorable until the day someone notices them. *The generic alternative:* a `?` overlay listing 60
shortcuts, read once and never again. *When it does not apply:* (a) if a command has no shortcut,
show nothing — an empty chip slot is worse than an unaligned row; (b) **on touch**, where every chip
is a lie: Zed drops all three of its CTA chips at 390px, verified in this pass; (c) when the same
command appears in five places, five chips is noise — chip the two canonical entry points (the
sidebar button and the menu row) and leave the rest bare.

**9. Keycaps are drawn with inset shadows and a bottom shade line, in a mono face.**
Both reference implementations use the same structural trick, which is easy to miss because their
surface treatments differ. Raycast: no `border` at all, three stacked insets — a 1px ring, a
`rgba(255,255,255,0.6)` top highlight, and a **`-1.5px` bottom shade**. Zed: `1px solid #ccc` plus
`padding: 4px 4px 6px` and `inset 0 -1px 0 #e6e6e6`. In both, the physical-key read comes from *one
dark line along the bottom edge* plus asymmetric bottom padding or an offsetting top highlight.
That is the whole illusion. *Why the rest matters:* an inset ring adds no layout width, so a chip can
sit in a fixed-width right column without pushing the label; mono keeps `⌘` `⇧` `K` on a shared
advance width so `⌘K` and `⌘⇧P` align vertically down a list; and Raycast's 40% text opacity means a
shortcut hint never out-contrasts the command it annotates. *The generic alternative:* a bordered
`<kbd>` in the body font at full contrast, which makes every row look like it has a button in it.
*When it does not apply:* (a) a **one-cap-per-glyph** convention (Raycast renders `⌘` and `K` as two
separate caps) doubles the chip's width and stops working past three modifiers — Linear and Attio
render `⌘K` as a single chip for exactly that reason, and you must pick one convention per product;
(b) cross-platform text where the glyph does not exist — Zed's lowercase `cmd-,` degrades to `ctrl-,`
with no re-rendering, which a `⌘` glyph cannot do; (c) inside a dark popover, where the
`rgba(0,0,0,0.05)` fill disappears and you need the inverted `--key-bg-*` gradient instead.

**10. Weight, not size, carries hierarchy at small sizes — and the weights aren't round numbers.**
`--font-weight-medium: 510` and `--font-weight-semibold: 590`. At 13px the difference between 500 and
510, and between 590 and 600, is visible as evenness of stroke. Zed goes further and *lowers* weight
as size increases (`--h0-weight: 340`, and its h1 genuinely computes to 340). Attio takes the third
road: the whole body scale sits at 500 and hierarchy comes from size and color alone. *Why it works:*
variable fonts let you pick the weight that optically matches; 500/600 are just the two masters you
inherited from static font files. *The generic alternative:* `font-medium` / `font-semibold`
everywhere plus size jumps to compensate, which costs vertical space you don't have. *When it does
not apply:* (a) static fonts and any face without a real `wght` axis — snapping to 500 there is fine;
(b) faces whose variable axis is coarse or badly interpolated, where 510 and 500 rasterize
identically at 13px and you have added a token for nothing; (c) when a fallback face is likely to
render (slow network, blocked font CDN) — the fallback will snap to 400/700 anyway, so hierarchy that
rests *only* on 510-vs-590 collapses; back it with color.

**11. Relative time in lists, absolute time on commit.**
Cursor's agent list right-aligns `now`, `10m`, `30m`, `45m`, `2h` in tertiary gray; Zed's thread list
does the same with `4m`, `12m`, `48m`, `2h`, `5h`, `1d`, `2d`, `4d` after a `·` separator. Amie
buckets under `Yesterday / Last week / Previous 30 days / Past`. But Missive's snooze menu shows
`Later today → 2:37 PM`, `Tomorrow → Wed Feb 19, 8:00 AM`, `Next week → Mon Feb 24, 8:00 AM` — the
relative label on the left, the **resolved absolute value on the right of the same row**. *Why it
works:* scanning wants relative (cheap to compare); committing wants absolute (you are about to lose
sight of this thing for a week). *A second axis nobody names:* compact forms (`45m`) are for lists
you scan many times a day; word forms (`4 days ago`, which is what Attio's run history uses) are for
lists you visit occasionally. Mixing them in one column is the tell that two people built it.
*The generic alternative:* absolute timestamps in the list (every row is 16 characters of digits) or
relative labels in the commit menu (the user picks "next week" and finds out later it meant Monday
8am). *When it does not apply:* (a) audit logs, financial records, anything where the exact timestamp
is the content; (b) anything spanning time zones or shared between users — "yesterday" is
viewer-relative and two people reading the same row disagree; (c) values older than about a week,
where `47d` is worse than `Jul 12` and every one of these products silently switches over.

**12. Section headers are labels, not dividers, and lists end in a fade.**
Linear's sidebar groups (`Workspace`, `Favorites`) are 12px quaternary text (`#62666d`) with a
disclosure caret and no rule above or below; the separation is pure spacing — 2px between rows,
**16px above a header**, an 8× ratio. Raycast's palette does the same with `Suggestions` and
`Commands`. And Linear's docs sidebar masks its bottom scroll edge with `--mask-ease: #0003` so the
last item fades rather than being clipped by a hard edge or shadowed by an inner box-shadow.
*Why it works:* a horizontal rule in a 208px column is a full-width line every six rows, a lot of ink
for information that spacing already conveys; the fade signals "more below" without reserving a
scrollbar or drawing a border. *The generic alternative:* `<Separator />` between every group plus
`uppercase tracking-widest text-xs`, which turns a sidebar into a form. *When it does not apply:*
(a) once a group can be reordered or dropped into, the rule is the drop target and spacing alone
leaves the user guessing where the row will land; (b) sticky headers over a scrolling list, where a
label with no background and no rule smears into the content passing under it — a sticky header needs
an opaque fill, which is a different component; (c) the fade specifically is wrong on any list whose
last row is actionable, because a 30%-opacity black scrim over a live button reads as disabled.

---

## States, edges and the unglamorous parts

**Zero data.** Raycast's empty extension list: a monochrome line-art illustration in the panel's own
background family (barely lighter than the card, no color), one sentence that names the actor and the
object — *"@Core hasn't published any extensions yet."* — and exactly one button, `Explore
Extensions`, which sends you somewhere that *does* have data. The illustration is the largest element
and the lowest contrast element. That inversion is the pattern: the picture occupies space so the
panel isn't a void, but it must not compete with the sentence.

**Not found / error.** Linear's docs 404: line-art device icon (~110px), `Not found` at 17px
semibold, `The page you're trying to access does not exist.` at 15px tertiary wrapped to two lines,
**no button at all**, and the entire sidebar nav remains live. No red. No error code. No "Oops!". The
recovery path is the navigation that was already on screen, which is a better button than any button.

**Loading.** The strongest tell of a real keyboard-first product is what *doesn't* appear. There is
no spinner on a mutation — status change, assignment, snooze, archive render immediately and
reconcile behind the scenes. *Honesty note:* this is inferred from Linear's published sync-engine
architecture and from the absence of any pending state in the app-shell replica, not measured against
a live authenticated session; treat it as a well-supported design claim, not a token reading. Reserve
spinners for operations that genuinely block: first sync, a search that hits the network, an agent
run. For those, Cursor shows `Thought 6s` and `Read about-acme.md`, and Zed shows
`Read crates/gpui/src/element.rs` / `Search "accessibility" in crates/gpui/` — a growing log of
completed steps in past tense, each with a leading glyph and a monospace path. Progress as a
transcript, not a percentage.

**Too much data.** Cursor's list is the honest version: two-line rows (title + one muted detail
line), a right-aligned age, inline diff counts (`+52 -0`, `+135 -21`) in green/red at body size, and
a section header carrying the count (`READY FOR REVIEW 5`). Zed's thread list is the same shape —
title, then a meta line of `branch-icon · branch-name · +23 -2 · 48m` — which is the strongest signal
in the set that the two-line-plus-meta row is the archetype's answer to overflow, not an accident.
Nothing truncates at the *start* of a string; everything truncates at the end, so the first six words
are always readable. Counts go in labels, not badges: Superhuman in tab labels
(`Important 12  Calendar 13`), Attio in a tab (`Runs 13`) under an active-tab underline.

**The palette needs a footer, and this is the most-missed component in the archetype.** Raycast's
palette carries a persistent bottom strip, inside the palette's own bounds, showing the two live keys
for the currently selected row: `Open Command ⏎` on the left of the group, `Actions ⌘K` on the right.
It updates as the selection moves. This is what makes a palette teachable without a cheat sheet — the
primary action and the escape hatch to *more* actions are always visible and always correct for the
row under the caret. Note also what Raycast puts in the right column of each row: not a shortcut but
a **type label** (`Command`, `Command`, `Command`) in tertiary gray, with each row's name and its
provenance sharing the left side at two different weights (`Created Issues` in near-white,
`Linear` in gray). Name, source and kind on one 32px line.

**Offline / permission-denied.** This archetype gets this wrong most often by blocking. The correct
behavior is to keep local state authoritative and surface the failure as a persistent, non-modal,
dismissible strip — never a dialog that steals the keyboard, because the whole product is
keyboard-driven and a modal makes every shortcut dead. If a mutation can't be reconciled, revert the
row *visibly*, using the 250ms `--speed-regularTransition` rather than the 100ms one. This is the one
case where the slow animation is correct, because the user must notice.

**First run.** None of these products ship a coach-mark tour. Linear seeds a workspace with real
example issues; Notion Calendar shows key chips in the rail from minute one; Attio labels the palette
button `Quick Actions ⌘K` so the chord is learned by reading rather than by being told. The pattern
is: *put a keyboard hint next to every command that has one, and let the product teach itself over
weeks.* A tour is what you build when the interface doesn't self-document.

---

## Mobile

**What the references actually do at 390px, verified by screenshot in this pass:** none of them
reflow the dense shell. Linear, Attio and Zed all render the desktop app shell at phone width as a
**picture** — clipped at the right edge (Linear, Attio) or scaled down until the text is ~6px (Zed).
Not one attempts a responsive three-pane. That is the honest state of the art, and it is the answer
to "how should my dense app behave on a phone": it should not be the same app.

**Zed drops every key chip below the breakpoint.** At 1440px its CTAs read `Download now [D]` and
`Clone source [C]`, and the header carries a `⌘⇧P` search chip. At 390px the chips are gone, the
buttons are full-width and stacked, and the search field has collapsed into the hamburger. The type
system does *not* degrade — the serif italic headline stays serif, the `writer` body stays
mono-adjacent. Only density and the keyboard affordances go. That is the correct split.

**Raycast's iOS build shows what the phone version of a launcher is:** a search field, a 4-up grid of
app icon tiles, and a short `Favorites` list of touch-height rows with leading icons. It is a capture
and launch tool, not a palette. Heavy triage stays on desktop. If you are building the phone app for
a keyboard-first product, this is the shape — the same objects and the same relative-time bucketing,
a fraction of the operations.

What survives the transition: the *information architecture* (same objects, same statuses, same
relative-time bucketing) and the neutral ramp. What does not: the 28px row, the 13px type, the 2%
hover (there is no hover), the keyboard chips, and the three-pane layout.

Three concrete rules:

1. **When you drop the shortcut chips, keep the right column** — fill it with the metadata that was
   competing with the chip on desktop (count, age, assignee), so the row shape stays recognizable
   across platforms.
2. **Mobile is the one place a bigger radius is correct.** 8px rows in a 232px sidebar look right;
   44px rows edge-to-edge on a 390px screen want 10–12px.
3. **Re-derive the state hierarchy, don't scale it.** Hover does not exist, so the 2%/4% pair
   collapses to one state. Selected has to carry the whole load, and it now has to survive a thumb
   covering the bottom third of the screen — which usually means it moves from a background tint to a
   fill plus a left rule, the Missive treatment rather than the Linear one.

---

## How this archetype fails

The bad imitation is instantly recognizable. It is worth naming its parts precisely, because each one
is a separately fixable defect — and because this particular failure mode is now overwhelmingly
*generated*, not hand-made, which means it has a fingerprint.

### The generated version, specifically

An agent asked for "a Linear-style dashboard" reaches for the same artifacts every time, because they
are the highest-frequency tokens in its training data, not because they were chosen:

- **The palette is `#0a0a0a` / `#171717` / `#262626` / `#404040`** — Tailwind `neutral-950/900/800/700`
  verbatim. Nothing in Linear, Raycast or Zed is any of these values. If your ground is `#0a0a0a`,
  you did not pick a color, you accepted a default.
- **The accent is `violet-500` (`#8b5cf6`) or `indigo-600` (`#4f46e5`)** at full saturation, used as a
  card border, a gradient, a button fill and a badge simultaneously. Linear's `#5e6ad2` is a
  desaturated indigo used almost exclusively for focus rings, links and selection — never as a fill
  behind a large area.
- **`rounded-xl` (12px) is applied to everything**, including 32px list rows, where it reads as a
  stadium. Real scales are per-element: 6–8px on rows, 8px on inline bubbles, 12–16px on panels.
- **Inter at 14px/400 for all body text**, with hierarchy from size jumps rather than weight, which
  eats the vertical space that density needs.
- **`transition-all duration-200`, globally**, on both directions of every state.
- **`shadow-lg` on cards that are not floating.** In the references, shadow is reserved for surfaces
  that actually overlap something else — in the Linear hero shot exactly one element (the floating
  agent panel) has a shadow.
- **A gradient somewhere**, usually on the hero or a "premium" card, with no functional role.
- **Every group wrapped in a bordered card.** The reference sidebars have zero borders; the generated
  one has a border around the nav, around each group, and around each row on hover.

### The twelve defects, in priority order

1. **No distinction between hover and selected.** Both are `bg-accent`. The keyboard caret is
   invisible whenever the mouse is on screen. This is the single most disqualifying defect and it is
   inherited directly from the shadcn default.
2. **Borders instead of background levels.** Every card, sidebar and row group gets a
   `1px solid #262626` edge. Real products use 5–8% white overlays and 5–8 point luminance steps.
   Count the visible edges in a Linear screenshot: the sidebar has none.
3. **The ramp is too coarse.** `#0a0a0a → #171717 → #262626 → #404040` is roughly 2× Linear's step
   size, so surfaces read as separate slabs rather than as depth.
4. **Rows are 40–44px with 14px/400 text.** You get 20 rows where the reference gets 32. The fix is
   not just shrinking the row — it is 13px at weight 510 in secondary text color, so the denser list
   is also *quieter*.
5. **Everything animates, symmetrically, at 200ms.** No `--speed-highlightFadeIn: 0s`. The product is
   measurably as fast and perceptibly slower.
6. **Shortcuts exist but are never shown**, or are all dumped into a `?` modal. No chips in the
   sidebar, no `⌘K` label on the search button, no single-letter accelerators on menu rows.
7. **The palette is the shadcn default at 384px** with a 3.5% selection tint, so items truncate and
   the keyboard position is invisible. Nobody widened it or restyled `[data-selected]`.
8. **The palette has no footer bar.** No `⏎` for the primary action, no `⌘K` for more actions, so the
   only way to learn the second action is to already know it.
9. **Keycaps are bordered `<kbd>` in the body font at full contrast.** They out-shout the commands
   they annotate, and `⌘K` doesn't align with `⌘⇧P` down the list because the font is proportional.
10. **Spinners on mutations.** A status dropdown that shows a loading state for 180ms is the loudest
    possible signal that the app is not local-first. If you cannot do optimistic updates, at minimum
    do not *advertise* the round trip.
11. **Layout shift from scrollbars.** No reserved gutter, so adding one item shifts the column.
12. **Empty states with a big colored illustration and two buttons.** The reference version is a
    low-contrast picture, one sentence naming actor and object, and zero-or-one action.

### Self-diagnosis: seven checks an agent can run on its own output

Run these against the code you just wrote, before rendering anything. Each is mechanical.

1. **Grep for the tell-tale palette.** `grep -E "#0a0a0a|#171717|#262626|neutral-9|violet-5|purple-6"`.
   Any hit means the color decision was inherited, not made.
2. **Diff the hover and selected rules.** Find the row component's `:hover` and its
   `[data-selected]` / `[aria-selected]` / `.active` rule. If they resolve to the same value, the
   product has no keyboard caret. They should differ by roughly 2×.
3. **Count row height × text size.** If row height ≥ 40px while font-size ≤ 14px, the row is padded
   like a settings screen. Target 28–32px at 13px, or 44–52px if the row wraps to two lines.
4. **Search for `transition-all` and for any `duration` on an entering highlight.** State-in should
   be 0ms. If a single `transition` declaration covers both directions of a background change on a
   high-traverse row, delete it.
5. **Count borders in the sidebar.** Should be zero. `border`, `border-r`, `divide-y`, `<Separator>`
   inside the nav column are all the same defect.
6. **Check the palette's width and whether any item can ellipsis.** Take your longest command string
   plus its chord, measure it, and compare with the palette's content width. If the default 384px
   survived, it will truncate.
7. **Count distinct radii and distinct shadows in use.** More than ~4 radii or more than ~3 shadows
   means the scale is decorative. Zero shadows on non-overlapping surfaces.

### The one-line diagnostic

Open the app, put the mouse down, and drive it with arrow keys alone for sixty seconds. If you cannot
see where you are at all times, or if anything moves when you pass over it, or if a status change
makes you wait, it is not this archetype no matter what it looks like.

---

## Copy and tone

The voice is a competent colleague who assumes you know what you're doing. Short, literal, no
exclamation marks, no "Oops", no personality in error states, and — importantly — **no
encouragement**. Nobody wants to be congratulated for archiving an email for the 400th time.

Conventions worth copying, all observed in the reference set:

- **Name the actor and the object in empty states, and use "yet".**
  Right: `@Core hasn't published any extensions yet.`
  Wrong: `Nothing here! 🎉 Get started by creating your first extension.`
- **Errors state the fact, not the feeling, and offer no button when navigation is already present.**
  Right: `Not found` / `The page you're trying to access does not exist.`
  Wrong: `Oops! Something went wrong. Please try again later.`
- **Relative labels get their resolution attached.**
  Right: `Next week            Mon Feb 24, 8:00 AM`
  Wrong: `Next week` (alone, in a commit menu)
- **Group headers are time buckets or object names in sentence case, not shouted labels.**
  Right: `Yesterday`, `Last week`, `Previous 30 days`, `Past`, `Workspace`, `Favorites`,
  `Suggestions`, `Commands`
  Wrong: `RECENT ITEMS`, `— YOUR WORKSPACE —`
- **Counts sit inside the label.**
  Right: `Important 12`, `Runs 13`, `READY FOR REVIEW 5`
  Wrong: `Important` with a red pill badge
- **A row can carry name, source and kind on one line, at three weights.**
  Right: `Created Issues  Linear` … `Command` (name near-white, source gray, kind tertiary, right-aligned)
- **Commands in a palette are verb-first and match the menu wording exactly.**
  Right: `Assign to…`, `Change status…`, `Snooze until…`
  Wrong: `Assignment`, `Status change`, `Snoozing options`
  The trailing `…` means "this opens a second step" and must be used consistently, because a keyboard
  user is deciding whether to keep typing.
- **Shortcut hints are never sentences.** A chip says `⌘K` or `S`. It does not say `Press ⌘K`.
- **A palette footer names the action, then the key.** `Open Command ⏎`, `Actions ⌘K` — verb phrase
  first, chip last, so the strip scans as a sentence fragment rather than a legend.
- **Agent/async work reports completed steps in past tense, not progress in percent.**
  Right: `Read brand-guidelines.pdf` / `Thought 6s` / `Search "accessibility" in crates/gpui/`
  Wrong: `Processing… 43%`

---

## Sources

All URLs visited 2026-09 and re-probed in the direction pass unless noted. Measurements taken with
Playwright against the live pages. Property counts are approximate and drift between deploys — do
not treat them as identifiers.

- **https://linear.app** — `:root` custom-property dump (~700 declared, ~400 resolving on the
  document element: neutral ramp, both type scales, weights 300/400/510/590/680, radii, shadows,
  `--speed-*`, `--layer-*`, `--scrollbar-*`, `--border-hairline` and its retina override,
  `--min-tap-size`, `--mask-ease`). The hero renders a real DOM replica of the app, which is where
  the 232px sidebar / 208px content / 28px row / 2px gap / 8px radius / `padding-inline: 7px` /
  13px-weight-510 label measurements come from, including the confirmed absence of a sidebar right
  border. Hover (`#ffffff05`), active (`#ffffff0a`), the absent nav-row transition, the workspace
  switcher's `.16s`, and the `::after inset: 0 4px` menu highlight were read from the stylesheet
  source, because the replica is static and does not respond to a real hover.
- **https://linear.app/docs/keyboard-shortcuts** — 404 in the original evaluation, which captured
  Linear's not-found state and the docs sidebar's bottom scroll-edge mask fade. Not re-probed.
- **https://www.raycast.com** — token dump (~145 declared, ~87 resolved: bg/fg ramps, ten-step gray,
  accent + `26` alpha pairs, rounding scale, 8-based spacing that breaks at the top, `--key-bg-*`
  gradient, `--spring-1` `linear()` easing — 101 stops, 1.04283 peak at 40%, above 1.0 from 30–69%).
- **https://manual.raycast.com** (raycast.com/manual redirects here) — measured keycap: 12.6px
  GeistMono, 40% text, 5% background, 4px radius, `2.52px 5.04px` padding, three-layer inset shadow
  (ring + top highlight + `-1.5px` bottom shade), no border. Screenshotted at 1440 and 390: light
  ground, dark product shot, palette footer bar (`Open Command ⏎`, `Actions ⌘K`), type labels in the
  row's right column, `Suggestions`/`Commands` group headers, and the iOS build (search field + 4-up
  icon tile grid + short Favorites list).
- **https://www.raycast.com/core** — a zero-data user profile; the empty-state pattern. Not re-probed.
- **https://zed.dev** — token dump (~590 declared, ~265 resolved) including `--h0-weight: 340` →
  `--h4-weight: 410`, transition defaults, radii, content widths. Computed-style probe confirmed the
  h1 renders at weight 340 in `plexSerif` and that body/nav render in `writer`, not a system stack.
  Screenshotted at 1440 and 390: the `[D] [C] [S]` accelerators and `⌘⇧P` header chip at desktop,
  **all chips absent at 390**, and the in-hero app shot (thread list with branch + `·` + relative age
  + `+23 -2` diff counts, and a completed-step agent transcript).
- **https://zed.dev/docs/key-bindings** — measured keycap (12.25px Lilex, `#f0f0f0`,
  `1px solid #ccc`, `padding: 4px 4px 6px`, `inset 0 -1px 0 #e6e6e6`; inline prose caps at 14px) and
  the lowercase-hyphenated notation (`cmd-,`, `⌥-c`, `⌘-k then ⌘-s`).
- **https://attio.com** — token dump (~445 declared, ~315 resolved): the whole `--text-*` scale at
  weight 500, fixed-rem line-heights stepping 18/20/22/24px, the monotonic tracking ramp, seven
  radii, easings, per-surface z-index triples. Screenshotted at 1440 and 390: hero renders a real app
  shell in macOS window chrome showing `Quick Actions ⌘K` beside a separate `/` search control,
  `Runs 13` count-in-tab, and a run-history list with word-form relative ages (`yesterday`,
  `4 days ago`). At 390 the shell is clipped, not reflowed, and the CTA pair is replaced by an email
  capture field.
- **https://ui.shadcn.com/docs/components/command** — measured the generic baseline live: 384px root
  at 14px radius (`--radius-xl`) with 4px padding, 32px items at 14px/20px weight 400, `6px 8px`
  padding, 6px radius, and hover and selected both resolving to `--accent` = `lab(96.52%)` on
  `lab(100%)`. Radius scale is `--radius: .625rem` → `sm 6 · md 8 · lg 10 · xl 14`.
- **https://missiveapp.com** — real in-product screenshot: snooze menu with relative label + resolved
  absolute datetime per row, solid-blue selected mail row with white text, left color rules for
  account identity, inline `0/1` `0/3` task counters. Not re-probed.
- **https://superhuman.com** — split-inbox tabs with inline counts. Marketing has repositioned to AI
  and no longer foregrounds the keyboard UI.
- **https://www.notion.com/product/calendar** — real app screenshot; right rail with single-letter key
  chips (`S`, `F`). Not re-probed.
- **https://cursor.com** — real app screenshot: agent queue with two-line rows, right-aligned relative
  age, inline `+52 -0` diff counts, `READY FOR REVIEW 5` section header, completed-step transcript.
  Not re-probed.
- **https://amie.so** — real app screenshot: icon rail + list column, relative-time group headers,
  right-aligned count badges in tertiary gray. Not re-probed.
- **https://graphite.dev** — `G` key chip inside the `Log in` nav button. Not re-probed.
- **https://www.warp.dev** — repositioned; terminal UI no longer above the fold. The all-monospace
  claim from the original brief is **not currently verifiable** and has been removed from the
  reference table.
- **https://arc.net** — redirects to Dia. Sidebar app-tile grid retained from the earlier evaluation,
  **not re-verified**.
- **https://www.shortwave.com** — marketing is now an AI prompt box, no keyboard UI visible.
- **https://height.app** — **does not resolve.** Height is dead; do not use it as a reference.
- **https://www.fey.com** — shut down, redirects to a farewell notice after joining Wealthsimple.

---

## Direction pass (2026-09)

Re-probed the live sites with Playwright (token dumps resolved against `document.documentElement`,
stylesheet-source reads for pseudo-class rules, bounding-box measurement of the rendered hero) and
screenshotted Linear, Raycast, Raycast's manual, Attio and Zed at 1440 and 390.

**Numbers corrected (9).**

1. **Hover/selected.** The file claimed hover was `rgba(255,255,255,0.02)` and that "selection gets
   its own opaque fill." Source reads `#ffffff05` for hover and `#ffffff0a` for `[data-active]` —
   2% and 4%, a 2× step, both translucent. The whole finding was rewritten around the ratio.
2. **Nav row transition.** The file reported a measured `color .1s, background .1s` on the nav row.
   `.navItem` declares **no transition at all**; the `.16s` belongs to the workspace switcher above
   it. Corrected, and the finding got stronger as a result.
3. **Divider ramp.** Four steps claimed, five exist (`tint / quaternary / tertiary / secondary /
   primary`), and tint vs quaternary differ by one point of blue.
4. **Display line-heights.** Claimed a smooth `1.1 → 1.0` ramp across title-5…9. Actual sequence is
   `1.125, 1.1, 1.0, 1.1, 1.06, 1.0` — hand-set, not interpolated. Also added the `-0.012em` tracking
   on title-2/3 that was omitted.
5. **Raycast spring.** "~200 stops" → **101 stops**. Peak (1.04283 at 40%) confirmed exactly; added
   the 30–69% overshoot span.
6. **Raycast keycap shadow.** Two inset layers documented, **three** exist. The missing
   `inset 0 -1.5px 0 rgba(0,0,0,0.2)` bottom shade is the layer that actually creates the physical-key
   read, and it unified finding #9 with Zed's `inset 0 -1px 0`.
7. **shadcn radius scale.** The palette's 14px radius is `--radius-xl`, not arbitrary. *(Corrected
   2026-09-10: an earlier version of this note said "`2xl 18` does not exist." It does. Re-fetched
   from shadcn's `globals.css`, the scale is multiplicative off `--radius: .625rem` —
   `sm ×.6 = 6 · md ×.8 = 8 · lg ×1 = 10 · xl ×1.4 = 14 · 2xl ×1.8 = 18 · 3xl ×2.2 = 22 ·
   4xl ×2.6 = 26`. The palette uses `xl`; the steps above it exist and are simply unused there.
   `anti-patterns/remedies.md` §2.1 and Appendix B state the full scale correctly.)*
8. **Zed's body font.** "A monospace-adjacent system stack" is wrong: it is `writer` (iA Writer), a
   licensed duospaced face, with `plexSerif` for the hero and `Lilex` for keycaps. `--font-sans` is a
   Tailwind default nothing uses. Also verified the h1 genuinely computes to weight 340.
9. **Attio radii and weights.** Four radii claimed, seven exist. And weight 500 is not a small-text
   rule — the entire `--text-*` scale ships at 500.

Two further honesty fixes: the `--focus-ring-width: 1px` claim now notes that the same bundle
declares 2px in two other scopes, and the "no spinner on mutations" claim is now explicitly labelled
as inferred from published architecture rather than measured. Property counts in Sources were
softened to approximations, since all four drifted from the originals.

**Cut.** "Best-in-class", "and is better for it", "an all-monospace type system that is not a
costume", "which almost nobody attempts" and the Warp row (its claim is no longer verifiable on the
live site — Warp now appears only in Sources as a dead end). Arc/Dia was demoted to an explicitly
unverified lead. The Amie-mobile "right instinct" sentence was replaced with the three products whose
mobile behavior I actually screenshotted.

**Added.** `--border-hairline`'s retina halving to `0.5px`. The app-shell replica's scoped type-scale
override, and Linear's second (`--font-size-*`) scale and `Tiempos Headline` serif. The `::after
inset: 0 4px` popover highlight. The sidebar group-header spec (quaternary, not tertiary, with a
16px-vs-2px spacing ratio). **The palette footer bar** — the single largest omission, now its own
subsection under States, plus a copy rule and failure item #8. Raycast's name/source/kind row
structure. Attio's 2px line-height stepping, its monotonic tracking ramp (the exact inverse of
Linear's), and its per-surface z-index triples. The compact-vs-word-form relative time axis. The
opening note that this is not a dark-mode archetype, since three of five reference pages render
light.

**Boundaries.** Every one of the twelve findings now carries two or three specific non-trivial
limits. Finding #7's "when it does not apply: never, really" — a non-answer — was replaced with the
top-layer and nested-portal cases. Finding #12 had no limits at all and now has three, including that
the bottom-edge fade is wrong over an actionable last row.

**Mobile.** Rewritten around evidence rather than assertion: all three dense shells present as
clipped or scaled pictures at 390px, Zed's key chips verifiably disappear below the breakpoint, and
Raycast's iOS build is documented as the shape a keyboard-first phone app should take. Added a third
rule about re-deriving the state hierarchy when hover ceases to exist.

**Failure section.** Split into a named fingerprint of the *generated* version (specific hex values,
specific Tailwind class names, specific misapplied primitives), the twelve defects re-ordered by
severity, and a new seven-check mechanical self-diagnosis an agent can run against its own source
before it renders anything.
