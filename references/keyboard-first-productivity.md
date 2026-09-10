# Keyboard-first productivity tools

**Evaluated:** 2026-09

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

---

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Linear** | The canonical implementation, and the only one that ships its whole design system in the marketing bundle so you can read it | Hover = `rgba(255,255,255,0.02)` background change and *nothing else*. No border, no shadow, no transform, no height change. |
| **Raycast** | Palette-as-the-entire-product; the hardest version of the problem | Keycaps drawn with an inset ring + top white highlight instead of a `border`, in mono, at 40% text opacity |
| **Zed** | Rejects the Inter/8px-grid orthodoxy on purpose and is better for it | Heading weights get *lighter* as they get larger (`--h0-weight: 340` vs `--h4-weight: 410`) |
| **Superhuman** | Split-inbox as top-level tabs with live counts; the "shortcut for everything" progenitor | Counts belong in the tab label (`Important 12  Calendar 13  Docs 8  Other 19`), not in a badge bubble |
| **Missive** | Best-in-class dense *light-mode* three-pane mail, which is much harder than dark | Every relative time option shows its resolved absolute value on the same row |
| **Notion Calendar** (ex-Cron) | Single-letter accelerators surfaced inline in the right rail | A command row can carry its own key chip; you don't need a separate cheat sheet |
| **Cursor** | Agent-queue list under real load: many rows, each with status + diff + age | Right-align relative age (`now`, `10m`, `45m`) in tertiary gray; never a timestamp |
| **Amie** | Relative-time bucketing instead of dates | Group headers read `Yesterday / Last week / Previous 30 days / Past` |
| **Warp** | An all-monospace type system that is not a costume | Monospace as the *entire* UI font, including headings, or not at all |
| **Arc / Dia** | Sidebar-as-app-switcher, keyboard-driven space switching | Icon-tile grid above the list for pinned targets |
| **Attio** *(not on the brief)* | Linear-grade density executed in light mode for a CRM | The palette is a **visible button** in the sidebar labelled `Quick Actions ⌘K`, next to a second button showing `/` |
| **Graphite** *(not on the brief)* | Keyboard-first code review; ships accelerators on the marketing site | A single-key chip (`G`) inside the primary nav button — the promise is made before signup |

**How I found the two off-list products.** Attio surfaced while measuring dense-table products for a
different archetype — its hero renders a real DOM app shell, and the density profile (14px body at
weight 500, `-0.005em` tracking) reads as an explicit Linear response built for light mode, which
almost nobody attempts. Graphite surfaced from its own marketing nav: the `Log in` button carries a
`G` key chip, which is a reliable tell that keyboard navigation is a product-level commitment rather
than a feature list item. Two products on the brief are no longer usable references: **height.app
does not resolve** (dead as of this evaluation), and **Fey** has shut down and redirected to a
farewell page after joining Wealthsimple. **Shortwave** and **Warp** have both repositioned their
marketing to AI framing and no longer show their keyboard UI above the fold.

---

## Measured specifics

Everything below was read out of the live products with Playwright (computed styles and CSS custom
properties) or measured off rendered DOM. Values are exact unless marked approx.

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
| `--color-text-quaternary` | `#62666d` | placeholders |
| `--color-line-tint` → `--color-line-primary` | `#141516` → `#18191a` → `#202122` → `#37393a` | four-step divider ramp |
| `--color-border-primary/secondary/tertiary` | `#23252a` / `#34343a` / `#3e3e44` | |
| `--color-border-translucent` / `-strong` | `#ffffff0d` / `#ffffff14` | 5% and 8% white |
| `--color-brand-bg` | `#5e6ad2` | |
| `--color-accent` / `-hover` / `-tint` | `#7170ff` / `#828fff` / `#18182f` | |
| `--focus-ring-color` / `-width` / `-offset` | `#5e69d1` / `1px` / `2px` | outline is `1px solid`, **not** a 2–3px ring |
| `--selection-bg` | `color-mix(in srgb, #9c9da1 20%, transparent)` | unfocused text selection is *gray* |
| `--selection-bg-active` | `color-mix(in srgb, #5e69d1 40%, transparent)` | focused selection is brand at 40% |

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
| `--title-2` | 590 · 20px / 1.33 |
| `--title-3` | 590 · 24px / 1.33 |
| `--title-4` | 590 · 32px / 1.125 / `-0.022em` |
| `--title-5…9` | 590 · 40 / 48 / 56 / 64 / 72px, line-height 1.1 → 1.0 |

Weights are **not** the standard 400/500/600/700: `--font-weight-normal: 400`,
`--font-weight-medium: 510`, `--font-weight-semibold: 590`, `--font-weight-bold: 680`. This is a
variable-font product taking the interpolated weights that actually optically match at 13px, and
590 vs 600 is a visible difference at small sizes. Font stack is `"Inter Variable"` with
`--font-settings: "cv01","ss03"` and `--font-variations: "opsz" auto`; mono is `"Berkeley Mono"`
(licensed, not a Google font). Tracking is negative everywhere except at 10px and 12px, where it
goes to `-0.015em` and `0` respectively — small text gets *looser*, large text gets *tighter*, which
is the opposite of what a naive scale does.

### Linear — measured geometry (rendered DOM, not tokens)

| Thing | Measured |
|---|---|
| Sidebar container width | **232px** (padding `8px 16px 16px 8px`) |
| Sidebar content column | **208px** |
| Nav row height | **28px** |
| Nav row padding | `0 7px` |
| Nav row radius | **8px** |
| Gap between nav rows | **2px** |
| Nav label | 13px, weight **510**, `#d0d6e0` |
| Icon → label gap | **8px** |
| Sidebar right border | **none** — separation is background level only |
| Rest → hover delta | background `transparent` → `rgba(255,255,255,0.02)`. Height, color, border, shadow, transform all unchanged. |
| Inline message bubble | 13px / 20px, tracking `-0.039px`, padding 10px, radius 8px, bg `#161718`, `box-shadow: 0 0 0 1px rgba(0,0,0,.2)` |
| Secondary/meta line | 14px / 21px, `#8a8f98` |

**2% white.** That is the number. Not 5%, not `border: 1px solid`, not a `translateX`. Sweep a
cursor down thirty rows and nothing moves, nothing flashes, nothing draws a box.

### Linear — motion, elevation, chrome

| Token | Value |
|---|---|
| `--speed-quickTransition` | `0.1s` |
| `--speed-regularTransition` | `0.25s` |
| `--speed-highlightFadeIn` | **`0s`** |
| `--speed-highlightFadeOut` | `0.15s` |
| `--ease-out-quad` (used on nav) | `cubic-bezier(.25,.46,.45,.94)` |
| measured nav transition | `color .1s <ease-out-quad>, background .1s <ease-out-quad>` |
| `--shadow-low` | `0 2px 4px #0000001a` |
| `--shadow-medium` | `0 4px 24px #0003` |
| `--shadow-high` | `0 7px 32px #00000059` |
| `--shadow-stack-low` | `0 8px 2px #0000, 0 5px 2px #00000003, 0 3px 2px #0000000a, 0 1px 1px #00000012, 0 0 1px #00000014` |
| `--scrollbar-size` / `-active` | `6px` / `10px` |
| `--scrollbar-width` (gutter reserved) | `12px`, `--scrollbar-gap: 4px` |
| `--scrollbar-color` / hover / active | `#ffffff1a` / `#fff3` / `#fff6` |
| `--radius-*` | `4, 6, 8, 12, 16, 24, 32`, `--radius-rounded: 9999px` |
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

Accents each ship with a paired 15% alpha: `--color-blue #57c1ff` / `--color-blue-transparent
#57c1ff26`; same for red `#ff6161`, green `#59d499`, yellow `#ffc533`. That alpha pairing is how you
get colored status pills that survive both a dark panel and a dark popover without a second token.

Rounding: `none 0 · xs 4 · sm 6 · normal 8 · md 12 · lg 16 · xl 20 · xxl 24 · full 100%`.
Spacing (base 8): `4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 168, 224` — note it
*breaks* the doubling at the top (`--spacing-12: 168px`, not 128). Section rhythm is tuned by hand;
only the small end of the scale is mechanical.

**Keycap recipe** (measured on raycast.com/manual): `12.6px` GeistMono, color `rgba(0,0,0,0.4)`,
background `rgba(0,0,0,0.05)`, radius `4px`, padding `2.52px 5.04px`,
`box-shadow: inset 0 0 0 1px rgba(0,0,0,0.2), inset <white 0.6 top highlight>`. There is **no
`border` property** — the ring is an inset shadow so the cap doesn't add layout width. Separately,
`--key-bg-start-color: rgb(18,18,18)` and `--key-bg-end-color: rgb(13,13,13)` define a 5-point
vertical gradient for the dark keycap: a 5-point gradient, not a 40-point one.

Raycast also ships `--spring-1` as a CSS `linear()` easing with ~200 stops, peaking at **1.04283 at
40%** and settled by ~70%. A 4.3% overshoot. That is what a spring should feel like in a productivity
tool — not the 15–20% bounce a default `spring()` config gives you.

### Zed — the anti-orthodoxy numbers

- Heading weights **decrease** with size: `--h0-weight: 340`, `--h1: 390`, `--h2: 390`, `--h3: 380`,
  `--h4: 410`. Large text at 400 looks heavy; small text at 400 looks thin. Zed compensates
  optically instead of using one weight ramp.
- `--default-transition-duration: .15s`, `--ease-out: cubic-bezier(0,0,.2,1)`.
- Radii: `.125 / .25 / .375 / .5 / .75 / 1rem` (2 / 4 / 6 / 8 / 12 / 16px).
- `--blog-content-width: 740px`, `--markdown-layout-width: 45rem`.
- Body font is a **monospace-adjacent** system stack with a serif display face for the hero — Zed's
  homepage headline is set in an italic serif, not Inter. Its keycaps use `Lilex` (their own mono).
- Keycap: `12.25px`, bg `#f0f0f0`, `1px solid #ccc`, radius `4px`, padding **`4px 4px 6px`**, inset
  shadow `0 -1px 0 #e6e6e6`. The extra 2px of bottom padding plus the bottom inset line is the whole
  "physical key" illusion. Nothing else is needed.
- **Shortcut notation is lowercase and hyphenated**: `cmd-,`, `⌥-c`, and chords as `⌘-k then ⌘-s`.
  Not `⌘K` glyph clusters. This is deliberate: Zed is cross-platform, and `cmd-` degrades to `ctrl-`
  in text without re-rendering a glyph.
- Marketing site ships app accelerators: `Download now [D]`, `Clone source [C]`, `Sign up [S]`, and
  a `⌘⇧P` chip inside the header search field.

### Attio — the light-mode density answer

- `--text-sm--font-weight: **500**` and `--text-sm--letter-spacing: -0.005em`. Small body text
  defaults to *medium*, not regular. This is the single most useful trick for light-mode density:
  at 13–14px on white, weight 400 goes gray-mushy and weight 500 stays crisp without looking bold.
- `--text-base--line-height: 1.375rem` (22px on 16px = 1.375, vs the 1.5–1.6 default).
- Heading scale: `xs 1.75rem/2.125rem` · `sm 2rem/2.25rem w600` · `md 2.5rem/2.75rem w600 ls -.01em`
  · `lg 3.5rem/3.75rem w600` · `xl 4rem w600`. Line-height is a *fixed rem value*, not a multiplier.
- Radii `.25 / .375 / .5 / 1rem`. `--default-transition-duration: .15s`.
- Easing set: `--ease-out: cubic-bezier(0,0,0,1)` (immediate departure, long settle),
  `--ease-in: cubic-bezier(.3,0,1,1)`, `--ease-in-out-cubic: cubic-bezier(.65,0,.35,1)`.
- Layering: `--dialog-overlay-z-index: 100`, `--context-menu-portal-z-index: 200`.
- Fonts: `inter` for UI, `interDisplay` for headings, `JetBrains Mono` for data.

### The generic baseline, measured — shadcn/ui `command`

This is what you get if you install the default and ship it. Measured live:

| Thing | shadcn default | Linear equivalent |
|---|---|---|
| Item height | **32px** | 28px |
| Item text | 14px / 20px, weight 400 | 13px / 16px, weight 510 |
| Item padding | `6px 8px` | `0 7px` |
| Item radius | 6px | 8px |
| Selected state | `--accent` = `lab(96.52%)` ≈ `#f5f5f5` on `#fff` → **~3.5% luminance shift** | dedicated selected fill + 2% hover, distinct from each other |
| Group heading | 12px / 16px, weight 500, 28px tall | — |
| Palette width | **384px** | wide enough to show trailing shortcut + context |
| Palette radius / border | 14px / `1px solid` / padding 4px | — |
| Radius scale | `sm 6 · md 8 · lg 10 · 2xl 18` | `4 · 6 · 8 · 12 · 16 · 24 · 32` |

Two of those are outright bugs when the palette is keyboard-driven. **384px** truncates any item
that carries a trailing shortcut or a breadcrumb. And a **3.5% selection shift** is fine for a mouse
(where the cursor tells you where you are) and unusable for a keyboard (where the highlight *is* the
cursor). Fix both before you ship it.

---

## The decisions that make it work

**1. Hover is a background change of 2%, and nothing else.**
Linear's sidebar row goes from `transparent` to `rgba(255,255,255,0.02)` over 100ms with
`cubic-bezier(.25,.46,.45,.94)`. Height stays 28px. No border appears. No shadow. No transform. The
row does not move. *Why it works:* in a 30-row list the cursor crosses many rows per second; any
property that affects layout or draws an edge produces a visible strobe. *The generic alternative:*
`hover:bg-accent hover:border hover:shadow-sm hover:-translate-y-0.5`, which is four simultaneous
changes and reads as twitchy in exactly the situation the component exists for. *When it does not
apply:* a marketing card grid or a pricing table — few, large targets, low traverse rate, where a
lift and a shadow are correct and a 2% tint would be invisible.

**2. Selection and hover are different states with different weights, because selection is the caret.**
In a keyboard product the highlighted row is not "the row you're pointing at", it is "the row the
next keystroke will act on". Missive, in light mode, fills the selected mail row with **solid blue
and white text** — not a tint — because focus regularly leaves that pane for the reading pane and
the selection must survive. Linear keeps hover at 2% and gives selection its own opaque fill.
*The generic alternative:* using the same `--accent` for `:hover` and `[data-selected]`, which is the
shadcn default and makes it impossible to tell where the keyboard is while the mouse is on screen.
*When it does not apply:* single-select mouse-driven lists where nothing acts on selection.

**3. 28px rows, 13px text, weight 510 — density comes from line-height, not from cramming.**
Linear's 13px `--text-mini` sits on a 16px line box inside a 28px row: 6px of breathing room above
and below. At a 900px viewport that is ~32 visible rows versus ~28 for the shadcn 32px default and
~20 for the 44px "accessible minimum" row. *Why it doesn't feel cramped:* the vertical padding is
proportionally generous (43% of the row is padding), the horizontal padding is tiny (7px), and the
label color is `--color-text-secondary` (`#d0d6e0`), not primary — so a long list reads as an even
gray field with no high-contrast noise. *The generic alternative:* 44px rows with 14px text and a
divider between each, which is a mobile settings screen wearing a desktop costume. *When it does not
apply:* touch. Linear itself ships `--min-tap-size: 44px` in the same token file.

**4. The sidebar has no border. Separation is a background level.**
Measured: `border-right: 0px none`. The sidebar is `--color-bg-panel` (`#0f1011`) against
`--color-bg-primary` (`#08090a`) — a 7-point luminance step. *Why it works:* a 1px line at any
contrast is a hard edge your eye lands on repeatedly; a 7-point step reads as depth and disappears.
*The generic alternative:* `border-r border-neutral-800`, which at `#262626` against `#0a0a0a` is a
24-point edge that cuts the app in half. *When it does not apply:* light mode, where 7 points of
luminance is often not enough separation — Attio and Missive both use a real hairline there, and
that is correct.

**5. State applies on frame 0; only *removal* is animated.**
`--speed-highlightFadeIn: 0s` and `--speed-highlightFadeOut: 0.15s`. This is the most transferable
single line in Linear's token file. *Why it works:* perceived latency is dominated by the gap between
keypress and first visible change. Animating the appearance of a highlight adds that gap for free;
animating its disappearance costs nothing because the user has already moved on. *The generic
alternative:* `transition: all 200ms` symmetrically on everything, which makes a 200ms-slower product
out of an identical one. *When it does not apply:* destructive or irreversible state, where a
deliberate ramp is a feature.

**6. The scrollbar gutter is reserved, and the scrollbar is 6px.**
`--scrollbar-size: 6px`, `--scrollbar-width: 12px`, `--scrollbar-gap: 4px`. The visible track is
half the reserved width. *Why it works:* content never reflows when a list crosses the overflow
threshold — the single most common cause of "the app jumped" in web productivity tools. *The generic
alternative:* default browser scrollbars, or `overflow-y: auto` with no gutter reservation, which
shifts every row by 15px the moment one item is added. *When it does not apply:* macOS overlay
scrollbars already do this; the reservation matters on Windows and on any always-visible-scrollbar
setting, which is why it has to be in the token file rather than assumed.

**7. The command palette gets its own z-layer, above popovers and below dialogs.**
`--layer-popover: 600` → `--layer-command-menu: 650` → `--layer-dialog-overlay: 699` →
`--layer-dialog: 700` → `--layer-toasts: 800` → `--layer-tooltip: 1100` →
`--layer-context-menu: 1200`. *Why it works:* `⌘K` must be pressable while a popover is open (it
covers it) but must not cover a confirm dialog. If the palette shares a layer with dialogs you get
the bug where the palette opens *behind* an open menu, and the fix is always a scattering of magic
z-index numbers. *When it does not apply:* never, really — but note tooltips at 1100 sit above
dialogs, which is correct and counterintuitive.

**8. Show the shortcut where the command is, not in a cheat sheet.**
Attio puts `Quick Actions ⌘K` in the sidebar as a bordered button with the chord as a trailing chip,
and a *second* button next to it showing `/` for search. Notion Calendar puts single letters (`S`
for "Share availability", `F` for "Meet with") as chips at the right edge of right-rail rows. Zed and
Graphite ship key chips on their marketing CTAs. *Why it works:* this is the entire answer to the
keyboard-power-vs-discoverability tension. You do not teach shortcuts with a modal tour; you print
them on the thing they operate, right-aligned, in tertiary color, so they are ignorable until the
day someone notices them. *The generic alternative:* a `?` overlay listing 60 shortcuts, which is
read once and never again. *When it does not apply:* if a command has no shortcut, show nothing —
an empty chip slot is worse than an unaligned row.

**9. Keycaps are drawn with inset shadows, not borders, and use a mono face.**
Raycast: no `border`, `box-shadow: inset 0 0 0 1px rgba(0,0,0,.2)` plus a white top highlight,
`4px` radius, text at **40% opacity**. Zed: `1px solid #ccc` plus `padding: 4px 4px 6px` and
`inset 0 -1px 0` for depth. Both use mono. *Why it works:* an inset ring adds no layout width, so a
chip can sit in a fixed-width right column without pushing the label; mono keeps `⌘` `⇧` `K` on a
shared advance width so `⌘K` and `⌘⇧P` align vertically down a list. 40% opacity is deliberate — a
shortcut hint must never out-contrast the command name. *The generic alternative:* a bordered `<kbd>`
in the body font at full contrast, which makes every row look like it has a button in it.

**10. Weight, not size, carries hierarchy at small sizes — and Linear's weights aren't round numbers.**
`--font-weight-medium: 510` and `--font-weight-semibold: 590`. At 13px the difference between 500
and 510, and between 590 and 600, is visible as evenness of stroke. *Why it works:* variable fonts
let you pick the weight that optically matches, and 500/600 are just the two masters you happened to
inherit from static font files. Zed goes further and *lowers* weight as size increases
(`--h0-weight: 340`). *The generic alternative:* `font-medium` / `font-semibold` everywhere, plus
size jumps to compensate — which costs vertical space you don't have. *When it does not apply:*
static fonts, obviously, and any face without a real variable axis; snapping to 500 there is fine.

**11. Relative time in lists, absolute time on commit.**
Cursor's agent list right-aligns `now`, `10m`, `30m`, `45m`, `2h` in tertiary gray. Amie buckets its
list under `Yesterday / Last week / Previous 30 days / Past`. But Missive's snooze menu shows
`Later today → 2:37 PM`, `Tomorrow → Wed Feb 19, 8:00 AM`, `Next week → Mon Feb 24, 8:00 AM` — the
relative label on the left, the **resolved absolute value on the right of the same row**. *Why it
works:* scanning wants relative (cheap to compare); committing wants absolute (you are about to lose
sight of this thing for a week). *The generic alternative:* absolute timestamps in the list (noise:
every row is 16 characters of digits) or relative labels in the commit menu (the user picks "next
week" and finds out later it meant Monday 8am). *When it does not apply:* audit logs, financial
records, anything where the exact timestamp is the content.

**12. Section headers are labels, not dividers, and lists end in a fade.**
Linear's sidebar groups (`Workspace`, `Favorites`) are small tertiary-colored text with a disclosure
caret and no rule above or below; the 2px inter-row gap plus a slightly larger gap before the header
does the separating. And Linear's docs sidebar masks its bottom scroll edge with `--mask-ease:
#0003` — the last item fades out rather than being clipped by a hard edge or shadowed by an inner
box-shadow. *Why it works:* a horizontal rule in a 208px column is a full-width line every six rows,
which is a lot of ink for information that spacing already conveys; the fade signals "more below"
without reserving a scrollbar or drawing a border. *The generic alternative:* `<Separator />` between
every group plus `uppercase tracking-widest text-xs`, which turns a sidebar into a form.

---

## States, edges and the unglamorous parts

**Zero data.** Raycast's empty extension list: a monochrome line-art illustration in the panel's own
background family (barely lighter than the card, no color), one sentence that names the actor and
the object — *"@Core hasn't published any extensions yet."* — and exactly one button, `Explore
Extensions`, which sends you somewhere that *does* have data. The illustration is the largest
element and the lowest contrast element. That inversion is the pattern: the picture occupies space
so the panel isn't a void, but it must not compete with the sentence.

**Not found / error.** Linear's docs 404: line-art device icon (~110px), `Not found` at 17px
semibold, `The page you're trying to access does not exist.` at 15px tertiary wrapped to two lines,
**no button at all**, and the entire sidebar nav remains live. No red. No error code. No "Oops!". The
recovery path is the navigation that was already on screen, which is a better button than any button.

**Loading.** The strongest tell of a real keyboard-first product is what *doesn't* appear. There is
no spinner on a mutation — status change, assignment, snooze, archive all render immediately and
reconcile behind the scenes (Linear publishes its sync-engine architecture; what is visible in the
UI is that mutations have no pending state). Reserve spinners for operations that genuinely block:
first sync, a search that hits the network, an agent run. For those, Cursor shows `Thought 6s` and
`Read about-acme.md` as a growing log of completed steps rather than an indeterminate bar — progress
as a transcript, not a percentage.

**Too much data.** Cursor's list is the honest version: two-line rows (title + one muted line of
detail), a right-aligned age, inline diff counts (`+52 -0`, `+135 -21`) in green/red at the same
size as the body, and a section header that carries the count (`READY FOR REVIEW 5`). Nothing
truncates to an ellipsis at the *start* of a string; everything truncates at the end, so the first
six words are always readable. Superhuman puts counts in the tab labels themselves (`Important 12
Calendar 13 Docs 8 Other 19`) rather than in badge bubbles, which keeps the tab row one line tall.

**Offline / permission-denied.** These archetypes get this wrong most often by blocking. The correct
behavior is to keep the local state authoritative and surface the failure as a persistent,
non-modal, dismissible strip — never a dialog that steals the keyboard, because the whole product is
keyboard-driven and a modal makes every shortcut dead. If a mutation can't be reconciled, revert the
row *visibly* (it should animate back, using the 250ms `--speed-regularTransition`, not the 100ms
one — this is the case where a slow animation is correct because the user must notice).

**First run.** None of these products ship a coach-mark tour. Linear seeds a workspace with real
example issues; Notion Calendar shows the key chips in the rail from minute one; Attio labels the
palette button `Quick Actions ⌘K` so the chord is learned by reading rather than by being told.
The pattern is: *put a keyboard hint next to every command that has one, and let the product teach
itself over weeks.* A tour is what you build when the interface doesn't self-document.

---

## Mobile

The honest answer is that most of this archetype should not have a phone app that tries to be the
desktop app. Linear ships `--min-tap-size: 44px` in the same token file as its 28px desktop row,
which is the correct admission: the density is a desktop affordance and the mobile build uses a
different floor. What survives the transition is the *information architecture* (same objects, same
statuses, same relative-time bucketing) and the neutral ramp. What does not survive is the row
height, the 13px type, the 2% hover (there is no hover), the keyboard chips (delete them entirely —
a `⌘K` chip on a phone is a lie), and the three-pane layout (collapse to a stack with a back
gesture). Amie's mobile approach visible in its own screenshots is the right instinct: the phone app
is a *reader and a capture tool*, and the heavy triage stays on desktop.

Two concrete rules. First, when you drop the shortcut chips, keep the right column — fill it with
the metadata that was competing with the chip on desktop (count, age, assignee), so the row shape
stays recognizable. Second, mobile is the one place a bigger radius is correct: 8px rows in a 232px
sidebar look right; 44px rows edge-to-edge on a 390px screen want 10–12px.

---

## How this archetype fails

The bad imitation is instantly recognizable and it is worth naming its parts precisely, because each
one is a separately fixable defect.

**The look:** `#0a0a0a` background, `#171717` cards with `border: 1px solid #262626`, a purple or
indigo accent at full saturation, `rounded-xl` (12px) on everything including 32px list rows, Inter
at 14px/400 for all body text, `shadow-lg` on cards that are not floating, a gradient somewhere,
and `transition-all duration-200` globally.

**What is actually missing:**

1. **No distinction between hover and selected.** Both are `bg-accent`. The keyboard caret is
   invisible whenever the mouse is on screen. This is the single most disqualifying defect.
2. **Borders instead of background levels.** Every card, every sidebar, every row group gets a
   `1px solid #262626` edge. Real products in this space use 5–8% white overlays and 5–8 point
   luminance steps. Count the visible edges in a Linear screenshot: the sidebar has none.
3. **The ramp is too coarse.** Tailwind neutral steps `#0a0a0a → #171717 → #262626 → #404040` are
   roughly 2× Linear's step size, so surfaces read as separate slabs rather than as depth.
4. **Radius applied uniformly.** 12px on a 28–32px row is a stadium; 12px on a 400px panel is
   correct. Linear uses 6–8px on rows, 8px on inline bubbles, 12–16px on panels, from a scale that
   goes `4/6/8/12/16/24/32`.
5. **Rows are 40–44px with 14px/400 text.** You get 20 rows where the reference gets 32, and the
   product feels like a settings screen. The fix is not just shrinking the row — it is 13px at
   weight 510 in `--color-text-secondary`, so the denser list is also *quieter*.
6. **Everything animates, symmetrically, at 200ms.** No `--speed-highlightFadeIn: 0s`. The product
   is measurably as fast and perceptibly slower.
7. **Shortcuts exist but are never shown.** Or they're all dumped into a `?` modal. No chips in the
   sidebar, no `⌘K` label on the search button, no single-letter accelerators on menu rows.
8. **The palette is the shadcn default at 384px** with a 3.5% selection tint, so items truncate and
   the keyboard position is invisible. Nobody widened it or restyled `[data-selected]`.
9. **Keycaps are bordered `<kbd>` in the body font at full contrast.** They out-shout the commands
   they annotate, and `⌘K` doesn't align with `⌘⇧P` down the list because the font is proportional.
10. **Spinners on mutations.** A status dropdown that shows a loading state for 180ms is the loudest
    possible signal that the app is not local-first. If you cannot do optimistic updates, at minimum
    do not *advertise* the round trip.
11. **Layout shift from scrollbars.** No reserved gutter, so adding one item shifts the column.
12. **Empty states with a big colored illustration and two buttons.** The reference version is a low
    contrast picture, one sentence naming actor and object, and zero-or-one action.
13. **Purple.** Linear's brand is `#5e6ad2` — a desaturated indigo used almost exclusively for focus
    rings, links, and selection, never as a fill behind large areas. The imitation uses
    `violet-500`/`purple-600` as a card accent, a gradient, and a button, all at once.

**The one-line diagnostic:** open the app, put the mouse down, and drive it with arrow keys alone for
sixty seconds. If you cannot see where you are at all times, or if anything moves when you pass over
it, or if a status change makes you wait, it is not this archetype no matter what it looks like.

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
  Right: `Yesterday`, `Last week`, `Previous 30 days`, `Past`, `Workspace`, `Favorites`
  Wrong: `RECENT ITEMS`, `— YOUR WORKSPACE —`
- **Counts sit inside the label.**
  Right: `Important 12`, `READY FOR REVIEW 5`
  Wrong: `Important` with a red pill badge
- **Commands in a palette are verb-first and match the menu wording exactly.**
  Right: `Assign to…`, `Change status…`, `Snooze until…`
  Wrong: `Assignment`, `Status change`, `Snoozing options`
  The trailing `…` means "this opens a second step" and must be used consistently, because a
  keyboard user is deciding whether to keep typing.
- **Shortcut hints are never sentences.** A chip says `⌘K` or `S`. It does not say `Press ⌘K`.
- **Agent/async work reports completed steps in past tense, not progress in percent.**
  Right: `Read brand-guidelines.pdf` / `Thought 6s` / `Done. Fonts preload in the head, critical CSS
  is inlined.`
  Wrong: `Processing… 43%`

---

## Sources

All URLs visited 2026-09; measurements taken with Playwright against the live pages.

- **https://linear.app** — full `:root` custom-property dump (419 properties: neutral ramp, type
  scale, weights 300/400/510/590/680, radii, shadows, `--speed-*`, `--layer-*`, `--scrollbar-*`,
  `--editor-*`, `--min-tap-size`, `--mask-ease`). The hero renders a real DOM replica of the app,
  which is where the 232px sidebar / 208px content / 28px row / 2px gap / 8px radius / `0 7px`
  padding / 13px-weight-510 label / `rgba(255,255,255,0.02)` hover measurements come from, including
  the confirmed absence of a sidebar right border.
- **https://linear.app/docs/keyboard-shortcuts** — 404 in this evaluation, which captured Linear's
  not-found state (line-art icon, `Not found`, one tertiary sentence, no button, nav intact) and the
  docs sidebar's bottom scroll-edge mask fade.
- **https://www.raycast.com** — token dump (89 properties: bg/fg ramps, ten-step gray, accent + 15%
  alpha pairs, rounding scale, 8-based spacing that breaks at the top, `--key-bg-*` gradient,
  `--spring-1` `linear()` easing with 1.04283 peak).
- **https://www.raycast.com/manual** — measured keycap: 12.6px GeistMono, 40% text, 5% background,
  4px radius, `2.52px 5.04px` padding, inset ring + white top highlight, no border.
- **https://www.raycast.com/core** — a zero-data user profile; the empty-state pattern (low-contrast
  line art, one actor-and-object sentence, single secondary action).
- **https://zed.dev** — token dump (271 properties) including `--h0-weight: 340` → `--h4-weight: 410`,
  transition defaults, radii, content widths; plus the marketing accelerators `[D] [C] [S]` and the
  `⌘⇧P` header search chip, and the in-hero app shot (agent thread list, branch + relative age +
  diff counts).
- **https://zed.dev/docs/key-bindings** — measured keycap (12.25px Lilex, `#f0f0f0`, `1px solid #ccc`,
  `padding: 4px 4px 6px`, `inset 0 -1px 0 #e6e6e6`) and the lowercase-hyphenated notation
  (`cmd-,`, `⌥-c`, `⌘-k then ⌘-s`).
- **https://attio.com** — token dump (315 properties): `--text-sm--font-weight: 500`,
  `--text-base--line-height: 1.375rem`, fixed-rem heading line-heights, radii, easings, z-index
  scale. Hero renders a real app shell showing `Quick Actions ⌘K` as a bordered sidebar button
  beside a separate `/` search button.
- **https://ui.shadcn.com/docs/components/command** — measured the generic baseline live: 32px items,
  14px/20px weight 400, `6px 8px` padding, 6px radius, 384px root at 14px radius, selection at
  `--accent` = `lab(96.52%)`.
- **https://missiveapp.com** — real in-product screenshot: snooze menu with relative label + resolved
  absolute datetime per row, solid-blue selected mail row with white text, left color rules for
  account identity, inline `0/1` `0/3` task counters, inline numeric stepper inside the menu.
- **https://superhuman.com** — split-inbox tabs with inline counts (`Important 12  Calendar 13
  Docs 8  Other 19`); note the marketing has repositioned to AI and no longer foregrounds the
  keyboard UI.
- **https://www.notion.com/product/calendar** — real app screenshot; right rail with single-letter
  key chips (`S` on "Share availability", `F` on "Meet with…").
- **https://cursor.com** — real app screenshot: agent queue with two-line rows, right-aligned
  relative age, inline `+52 -0` diff counts, `READY FOR REVIEW 5` section header, and completed-step
  transcript (`Read about-acme.md`, `Thought 6s`).
- **https://amie.so** — real app screenshot: icon rail + list column, relative-time group headers
  (`Yesterday`, `Last week`, `Previous 30 days`, `Past`), right-aligned count badges in tertiary gray.
- **https://www.warp.dev** — all-monospace marketing type system; the terminal UI itself is no longer
  shown above the fold after the "cloud software factories" repositioning.
- **https://graphite.dev** — `G` key chip inside the `Log in` nav button on the marketing site.
- **https://arc.net** — now redirects to Dia; sidebar app-tile grid and list, keyboard-driven space
  switching.
- **https://www.shortwave.com** — checked; marketing is now an AI prompt box, no keyboard UI visible.
- **https://height.app** — **does not resolve.** Height is dead; do not use it as a reference.
- **https://www.fey.com** — shut down, redirects to a farewell notice after joining Wealthsimple.
