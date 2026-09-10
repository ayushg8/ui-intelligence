# Remedies: the correction playbook

**Measured:** 2026-09. Every number in this file was read out of a live product or a shipped
package with Playwright (computed styles, CSS custom properties, `getBoundingClientRect`) or
extracted from source: `tailwindcss@4.3.3` `theme.css` from npm, the shadcn `new-york-v4` registry
JSON, and live probes of linear.app, vercel.com, ui.shadcn.com, mui.com, docs.stripe.com,
attio.com, notion.com, raycast.com, railway.com, mercury.com, radix-ui.com/themes, github.com.
OKLCH values were computed from measured hex. Nothing here is recalled. Where a number is
approximate it says *approx*.

The [taxonomy](vibecode-taxonomy.md) names the disease. This file is the treatment: paste-able
before → after for the highest-frequency tells, ordered so that an agent that has just finished
building something can work top-down.

Default idiom is **Tailwind v4 + React**. Framework-agnostic equivalents are given per section and
summarized at the end. Tailwind v4 has no `tailwind.config.js` — tokens are CSS custom properties
inside `@theme`, so every remedy here is portable to plain CSS by deleting the `@theme` wrapper.

---

## The 10-minute polish pass

Run this in order on anything you just built. It is sorted by **perceived quality gained per
minute spent**, which is not the same as sorted by importance. Steps 1–4 are mechanical and take
seconds; they are first because they are cheap, not because they matter most. Step 10 matters
most.

| # | Change | Time | Why it is this high |
|---|---|---|---|
| 1 | Delete every `shadow-*` that is not on a floating layer (dropdown, popover, dialog, toast, drag ghost). Replace with `border`. | 30s | The resting-card drop shadow is the single most reliable AI tell. |
| 2 | Replace every `gray-*` / `slate-*` with **one** neutral family, chosen once. Delete the other two families you accidentally used. | 60s | Mixed neutral families produce a faint colour disagreement a designer sees instantly. |
| 3 | Set exactly one `--radius` and derive the rest from it. Delete every `rounded-*` that is not derived. | 60s | Four unrelated radii in one screen reads as assembled, not designed. |
| 4 | Kill every gradient that is not a scrim, a chart fill, or a deliberate hero. `bg-gradient-to-r from-blue-500 to-purple-600` → a flat brand colour. | 30s | Purple-blue gradient is the highest-recognition tell in existence. |
| 5 | Body copy 16px → 14px on any surface that is a control panel, and drop every vertical padding one step (`py-4` → `py-2.5`). | 90s | Default output runs 30–40% too airy. See §7 for per-archetype multipliers. |
| 6 | Replace all placeholder content with real, *varied*, domain-specific content: real names, real amounts with different digit counts, real timestamps at irregular intervals, one item with an ugly long name. | 3 min | Highest ratio in the list after §11. Uniform fake data is visible from across the room. |
| 7 | One filled button per view. Demote the rest to ghost/text at the **same height**. | 60s | Two primaries means no primary. |
| 8 | Add `:focus-visible` rings if you removed them, and a `disabled` + `:active` state to the primary action. | 60s | Missing states is what makes a build feel like a mockup. |
| 9 | Rewrite the three most-visible strings using §9's moves. Headline, primary button, empty state. | 2 min | Copy is 30% of perceived design quality and 0% of most build effort. |
| 10 | Give the app's **primary object** more visual weight than its chrome, and add one signature decision drawn from the domain. | rest of the budget | §11. Everything above is subtraction; this is the only addition. |

If you have 60 seconds and not 10 minutes, do 1, 2, 4, 7.

**Verify by rendering.** `node $UI_LIBRARY/tools/shot.mjs <url> --widths 1440,390` and open the
PNGs. You cannot see any of this in JSX.

---

## How to read a remedy

Each one has four parts, and the third and fourth are the load-bearing ones:

- **Before** — what the default generator produces, with the real measured values.
- **After** — the corrected code.
- **When the "before" is actually right** — every remedy has a domain where it is wrong.
- **What the generic version was optimizing for** — so you can recognize the same mistake in a
  shape this file does not cover.

---

# 1. De-carding

## 1.1 The measurement

Here is what `ui.shadcn.com/examples/dashboard` renders, measured at 1440×900:

```
KPI card       246 × 200 px   padding 24px 0   radius 14px   border 1px   shadow-sm
  ├ label      "Total Revenue"   14px/20  w400   #737373
  ├ value      "$1,250.00"       24px/32  w600   tabular-nums
  ├ badge      "+12.5%"          12px/16  w500   22px tall   radius 9999
  ├ line 1     "Trending up this month"     14px/20 w500
  └ line 2     "Visitors for the last 6 months"  14px/20 w400 #737373
× 4, in a uniform grid
```

**200 vertical pixels per number.** Four of them consume 200px of height and ~1000px of width to
carry four scalars and four percentages. That is the disease, and the card is the vector: the
`rounded-xl border shadow-sm py-6` wrapper is what makes 200px feel structurally justified.

## 1.2 The decision rule

Use a card **only** if the thing inside it is:

1. **Independently actionable** — it has its own click target, menu, or destination that is not
   the same as its neighbours'; **and**
2. **Needs a boundary to be legible** — it contains mixed content types (image + text + controls)
   that would run together without one; **or**
3. **Will be reordered, dragged, selected, or dismissed** as a unit.

If it fails all three, it is not a card. It is a row, a section, or a number.

A KPI tile fails all three: you cannot click it, it holds one number, and it never moves. Four
KPI tiles in a grid are four numbers wearing costumes.

**Never nest a card in a card.** If you have written `rounded-lg border` inside `rounded-xl
border`, you have a container that wants to be a section and children that want to be rows.

## 1.3 Three layouts for the same content

### Before — card grid (the default)

```tsx
<div className="grid grid-cols-4 gap-4">
  {stats.map(s => (
    <Card key={s.label}>
      <CardHeader>
        <CardDescription>{s.label}</CardDescription>
        <CardTitle className="text-2xl tabular-nums">{s.value}</CardTitle>
        <CardAction><Badge variant="outline">{s.delta}</Badge></CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="font-medium">{s.trendLine}</div>
        <div className="text-muted-foreground">{s.subLine}</div>
      </CardFooter>
    </Card>
  ))}
</div>
```
Renders at 200px tall per tile.

### After A — the stat strip (right when the numbers are a *set*)

Four numbers that are read together belong in one object, separated by rules, not four objects
separated by gutters. Vertical dividers, one border, no shadow.

```tsx
<div className="grid grid-cols-4 divide-x divide-[--border] rounded-lg border border-[--border]">
  {stats.map(s => (
    <div key={s.label} className="px-5 py-4">
      <div className="text-[13px] leading-5 text-[--fg-muted]">{s.label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[22px] leading-7 font-medium tabular-nums tracking-[-0.01em]">
          {s.value}
        </span>
        <span className={s.delta > 0 ? "text-[13px] text-[--pos]" : "text-[13px] text-[--neg]"}>
          {s.delta > 0 ? "+" : ""}{s.delta}%
        </span>
      </div>
    </div>
  ))}
</div>
```
**84px tall instead of 200.** Same four numbers, 58% less height, and the shared border says
"these belong together" which four separate cards actively deny.

### After B — the divided list (right when items are *many and comparable*)

```tsx
{/* before: {items.map(i => <Card>…</Card>)} in a grid */}
<ul className="divide-y divide-[--border-subtle]">
  {items.map(i => (
    <li key={i.id}>
      <a href={i.href}
         className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-3 py-2
                    hover:bg-[--overlay-hover] focus-visible:outline-2
                    focus-visible:outline-offset-[-2px] focus-visible:outline-[--ring]">
        <span className="truncate text-[13px] leading-5">{i.title}</span>
        <span className="text-[13px] leading-5 text-[--fg-muted] tabular-nums">{i.amount}</span>
        <StatusDot status={i.status} />
      </a>
    </li>
  ))}
</ul>
```
Rules:
- The divider is **subtler than the card border would have been.** A 1px line inside a list does
  the whole job at roughly half the contrast of an outer border; on white use ~`oklch(0.93 0 0)`,
  not `oklch(0.87 0 0)`.
- `py-2` + 20px line-height = **36px rows**. The card version was 200.
- Hover is a background overlay, never a border or a shift. Measured on linear.app: nav item
  hover changes `background-color: transparent → rgba(255,255,255,0.08)` and `color: #8a8f98 →
  #f7f8f8`, over `0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)`. `transform` is untouched.
- Padding is on the `<a>`, not the `<li>`, so the whole row is the hit target.

### After C — spaced sections with a single background shift

Right when the groups are *different kinds of thing* and comparison is not the point.

```tsx
<section className="space-y-10">
  <div>
    <h2 className="text-[13px] font-medium uppercase tracking-[0.06em] text-[--fg-muted]">
      Awaiting review
    </h2>
    <ul className="mt-3 divide-y divide-[--border-subtle]">{/* rows */}</ul>
  </div>

  {/* the ONE background shift in the view: a full-bleed band, not a card */}
  <div className="-mx-6 bg-[--surface-sunken] px-6 py-8">
    <h2 className="…">Blocked</h2>
    <ul className="mt-3 divide-y divide-[--border-subtle]">{/* rows */}</ul>
  </div>

  <div>
    <h2 className="…">Shipped this week</h2>
    <ul className="mt-3 divide-y divide-[--border-subtle]">{/* rows */}</ul>
  </div>
</section>
```
One background shift per view. If you use two, neither means anything. The `-mx-6 px-6` is the
whole trick: the band breaks the content column so the grouping registers at squint distance
without adding a border.

### After D — nothing

Sometimes the fix is deleting the wrapper.

```tsx
{/* before */}
<Card><CardHeader><CardTitle>Account</CardTitle></CardHeader>
  <CardContent><SettingsForm /></CardContent></Card>

{/* after */}
<section>
  <h2 className="text-[15px] font-medium">Account</h2>
  <p className="mt-0.5 text-[13px] text-[--fg-muted]">Visible to everyone in the workspace.</p>
  <div className="mt-4 max-w-[440px]"><SettingsForm /></div>
</section>
```
A settings page is a document. Documents have headings and whitespace, not boxes. The card was
adding a border, a shadow, a radius and 48px of padding to communicate "this is a section" —
which the `<h2>` already said.

## 1.4 When a card IS right

- **A pricing plan.** Independently actionable (its own CTA), needs a boundary (mixed content),
  and one of them gets a highlight treatment. Cards.
- **A file/asset thumbnail grid.** The image needs a boundary; each tile is clickable and
  selectable. Cards — though usually *borderless* cards, where the image is the boundary.
- **A kanban card.** Draggable as a unit. The definitional case.
- **A notification/inbox item that can be dismissed individually.** Actionable and removable.
- **A dashboard tile the user can reorder or drill into.** If your dashboard genuinely supports
  drag-to-rearrange, the tiles are cards. If it does not, they are numbers.

## 1.5 What the generic version was optimizing for

Cards are a *segmentation* device that the generator reaches for as a *decoration* device. The
model has learned "content in a container looks designed," so it wraps. The correct question is
always "what does this boundary tell the user that spacing would not?" — and for the KPI tile the
answer is nothing.

---

# 2. Radius discipline

## 2.1 What real systems actually ship

Measured token sets, 2026-09:

| System | Radius scale (px) | Base |
|---|---|---|
| **Linear** | `--radius-4/6/8/12/16/24/32`, `--radius-rounded: 9999`, `--radius-circle: 50%` | 6–8 for controls |
| **Radix Themes** | `--radius-1…6` = 3, 4, 6, 8, 12, 16; `--radius-thumb: 9999` | 4–6 |
| **Vercel / Geist** | `--geist-radius: 6px`, `--geist-marketing-radius: 8px`, `--ds-popover-row-radius: 6px` | **6** |
| **Stripe** | `--card-border-radius: 4px`; inline code `6px` | 4 |
| **MUI (default)** | button `4px` | 4 |
| **shadcn (default)** | `--radius: .625rem` (10px); sm `.6×`=6, md `.8×`=8, lg `1×`=10, xl `1.4×`=14, 2xl `1.8×`=18 | **10** |
| **Tailwind (raw)** | sm 4, md 6, lg 8, xl 12, 2xl 16, 3xl 24 | — |

Two things fall out. First: **shadcn's 10px base is larger than every product system measured**,
and its `rounded-xl` card lands on **14px** — which is why shadcn output reads as softer and
younger than Linear or Vercel even when everything else matches. Second: the products converge on
**4–8px for interactive controls**, and reserve 12–16px+ for large containers only.

## 2.2 Build the system

```css
/* app.css — Tailwind v4. Delete the @theme wrapper for plain CSS. */
@theme {
  --radius-base: 6px;                        /* controls: button, input, select, chip  */
  --radius-sm:   4px;                         /* small chrome: swatch, tag, checkbox    */
  --radius-lg:   10px;                        /* containers: panel, popover, card       */
  --radius-xl:   16px;                        /* large surfaces: modal, sheet, hero img */
  --radius-full: 9999px;                      /* avatar, pill, toggle thumb only        */
}
```
Five values. Anything not in this list is a bug. `rounded-[7px]` is a bug.

## 2.3 Nested radii — the measured rule, not the folklore

The advice you will find everywhere is `inner = outer − padding`. **That is not what shipped
products do.** Measured parent→child radius pairs on live pages:

```
linear.app   outer 12px  padding 8px            → inner  8px   (formula predicts 4)
linear.app   outer 16px  padding-bottom 12px    → inner  8px   (formula predicts 4)
attio.com    outer 14px  padding 2px            → inner 10px   (formula predicts 12)
attio.com    outer 12px  padding 8px            → inner  8px   (formula predicts 4)
attio.com    outer 16px  padding 6px            → inner 12px   (formula predicts 10)
attio.com    outer  6px  padding 1px 4px        → inner ~4px
```

Every one of them is **outer − 4**. shadcn's own scale does the same thing in multiplicative
clothing: 6 / 8 / 10 / 14 is a ±2 then ±4 ladder off a 10px base.

**The rule that matches practice:**

```
inner = outer − 4        (for any container whose padding is ≤ 8px)
inner = outer − padding  (only when padding ≥ 12px, i.e. a genuinely inset child)
```

```tsx
{/* outer 10, padding 4 → inner 6 */}
<div className="rounded-[10px] border border-[--border] p-1">
  <img className="rounded-[6px]" src={cover} alt="" />
</div>

{/* outer 16, padding 16 → inner 8 (not 0) — the formula overshoots at large padding too;
    stop at the next value down your scale */}
<div className="rounded-[16px] bg-[--surface-sunken] p-4">
  <div className="rounded-[8px] border border-[--border] bg-[--surface] p-3">…</div>
</div>
```

Concentric radii only matter when the gap is small. At 16px of padding nobody perceives the
relationship, so use the next step down your scale and stop computing.

## 2.4 Radius by element size — the correction that fixes "toy-like"

A 6px radius on a 32px button and a 6px radius on a 600px panel are not the same visual weight.
Radius should scale sub-linearly with the element.

```
element height ≤ 24px   →  4px      (chip, tag, small badge)
element height 28–40px  →  6px      (button, input, row, menu item)
element height 40–80px  →  8px      (large button, list card, toolbar)
container 100–400px     →  10–12px  (panel, popover, card)
container > 400px       →  16px     (modal, sheet, full-bleed image)
```

Measured against this: Linear's 32px nav item uses `9999px` — a deliberate exception, because a
pill nav is a signature decision (§11), not a default. Its 32px *buttons* also use `9999px`.
Vercel's 32px button uses 6px. Attio's 36px nav link uses 10px. Notion's 44px nav item uses 8px.
All within range except Linear, which chose the exception on purpose and applied it everywhere.

**The AI failure mode is uniformity: `rounded-lg` on everything.** An 8px radius on a 20px badge
makes it look like a lozenge; on a 500px modal it makes it look like a Windows 8 tile.

## 2.5 When 0 is right

Sharp corners are not brutalism, they are a density and precision signal.

- **Table cells, spreadsheet grids, timeline blocks, gantt bars.** Rounding a cell inside a grid
  creates visible gaps at the corners of the rule intersection. GitHub's file-list rows: no
  radius. Stripe's API reference parameter rows: no radius.
- **Full-bleed sections and edge-anchored panels.** A sidebar flush to the viewport edge with a
  radius on the outer corner is a mistake; radius the *inner* corner only, or neither.
- **Anything that tiles.** Adjacent elements with radius produce diamond-shaped negative space.
- **Dense financial/scientific/industrial tools.** The house style is orthogonal. Bloomberg,
  TradingView, most EMR and CAD chrome.
- **Code blocks nested flush inside a bordered container.** Give the container the radius, the
  code block none, and clip with `overflow-hidden`.

```tsx
{/* right: radius on the frame, none on the tiled children */}
<div className="overflow-hidden rounded-[10px] border border-[--border]">
  <table className="w-full">
    <tbody className="divide-y divide-[--border-subtle]">{/* no radius anywhere inside */}</tbody>
  </table>
</div>
```

## 2.6 When to break the whole system

One place: a **signature element**. Linear's fully-round buttons, Mercury's 40px-radius nav pills,
a hero image at 24px when everything else is 8px. One per product, and it has to be the thing you
want remembered. Two signature exceptions is an inconsistent system.

---

# 3. Escaping library defaults

The exact overrides, in leverage order. Each is "the first thing a designer would change."

## 3.1 shadcn/ui — the seven overrides, in order

The registry source (`new-york-v4`, fetched 2026-09) is the ground truth for all of these.

### Override 1 — `--radius` (10px is too big)

```css
/* before: shadcn default */
:root { --radius: 0.625rem; }   /* → sm 6, md 8, lg 10, xl 14 */

/* after */
:root { --radius: 0.375rem; }   /* → sm 3.6, md 4.8, lg 6, xl 8.4  — messy */

/* better: stop deriving multiplicatively, state the five values */
@theme {
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 10px;
  --radius-xl: 14px;
}
```
One line, and it changes the read of every component in the app. Do this first.

### Override 2 — the resting `shadow-sm` on Card and `shadow-xs` on Input

```tsx
// before — from the shadcn registry, verbatim:
"flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm"
// Input: "... rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs ..."

// after
"flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground"
// Input: "... rounded-md border border-input bg-transparent px-3 py-1 text-sm ..."
```
`--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05)` under a 1px border is invisible at 100% zoom and
muddy at 200%. It is doing nothing except making every input look slightly damp. Keep shadows for
things that float (§4).

### Override 3 — Input's `text-base` → 14px, unconditionally

```tsx
// before: "text-base ... md:text-sm"   ← 16px on mobile, 14px on desktop
// after:  "text-[16px] md:text-[14px]" is what they meant; keep it, but know why
```
This one is **correct as shipped** and you should not blindly "fix" it: 16px prevents iOS Safari
from zooming on focus. The bug is that the same trick got copied onto `<Textarea>`, `<Select>`
triggers and search boxes in dense desktop tools where there is no mobile. On a desktop-only
surface, set 14px and move on. **Contrarian note:** the widely-repeated "always 16px inputs" is a
mobile-Safari workaround, not a typographic principle.

### Override 4 — Button height 36px → 32px, and the icon size

```tsx
// before (registry):  default: "h-9 px-4 py-2"     sm: "h-8 px-3"    lg: "h-10 px-6"
// after:
const sizes = {
  sm:      "h-7  px-2.5 text-[13px] gap-1.5 [&_svg]:size-3.5",
  default: "h-8  px-3   text-[13px] gap-1.5 [&_svg]:size-4",
  lg:      "h-9  px-4   text-sm     gap-2   [&_svg]:size-4",
  icon:    "size-8",
}
```
Measured: Vercel's primary button is **32px**. Linear's is **32px**. shadcn's default is 36px.
That 4px is most of why shadcn output feels one size too big everywhere (§7).

### Override 5 — the focus ring

```tsx
// before (registry): "outline-none focus-visible:border-ring focus-visible:ring-[3px]
//                     focus-visible:ring-ring/50"
// with --ring: oklch(0.708 0 0)  → a 3px 50%-opacity GREY halo
```
A grey focus ring is a non-decision. It also fails to read as "focused" because grey is what
everything else already is.

```css
@theme { --color-ring: var(--color-accent); }
```
```tsx
// after
"outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-ring]"
```
`outline` over `ring` because `outline` follows `border-radius` in every current browser, does not
participate in layout, and cannot be clipped by an ancestor's `overflow-hidden` — which is exactly
what happens to `ring` on the first and last row of a scrollable list. Measured reference:
Linear ships a dedicated `--focus-ring-color: #5e69d1` distinct from its accent `#7170ff`.

### Override 6 — `transition-all`

```tsx
// before (registry, Button): "transition-all"
// after:
"transition-[background-color,color,border-color,box-shadow] duration-100 ease-out"
```
`transition-all` animates `width`, `height`, `transform` and every inherited property, which is
how you get a button that visibly *grows* when its label changes and a layout that lurches on
hydration. See §12.

### Override 7 — Dialog's `zoom-in-95` and `bg-black/50`

```tsx
// before (registry): overlay "bg-black/50"
//   content "... data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 duration-200"
// after:
// overlay
"bg-[--overlay-scrim]"                 // e.g. rgba(9,9,11,0.45) — tinted to your neutral, not pure black
// content
"data-[state=open]:animate-in data-[state=open]:fade-in-0
 data-[state=open]:slide-in-from-bottom-1 duration-150 ease-out"
```
`zoom-in-95` scales the whole dialog including its type, which reads as a bounce. A 4px rise plus
a fade is the move every native platform uses. `bg-black/50` over a warm or cool neutral palette
is a visible hue clash on the edges of the scrim.

### The full paste-able shadcn escape kit

```css
/* app.css */
@import "tailwindcss";

@theme {
  /* radius — five values, stated not derived */
  --radius-sm: 4px; --radius-md: 6px; --radius-lg: 10px; --radius-xl: 14px;

  /* elevation — three levels, all with a ring (see §4) */
  --shadow-e1: 0 0 0 1px var(--color-border), 0 1px 2px 0 rgb(0 0 0 / .04);
  --shadow-e2: 0 0 0 1px var(--color-border), 0 2px 4px -2px rgb(0 0 0 / .06),
               0 6px 12px -4px rgb(0 0 0 / .08);
  --shadow-e3: 0 0 0 1px var(--color-border), 0 8px 16px -4px rgb(0 0 0 / .08),
               0 24px 32px -8px rgb(0 0 0 / .10);

  /* motion */
  --ease-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94);   /* ease-out-quad, Linear's */
  --duration-fast: 100ms;
  --duration-base: 160ms;
}

:root { --color-ring: var(--color-accent); }

/* kill the two defaults that leak everywhere */
[data-slot="card"]  { box-shadow: none; }
[data-slot="input"] { box-shadow: none; font-size: 14px; }
```

## 3.2 Tailwind v4 — the defaults to override first

Measured from `tailwindcss@4.3.3` `theme.css`:

| Token | Default | Problem | Fix |
|---|---|---|---|
| `--text-sm` line-height | `calc(1.25/0.875)` = **1.4286** → 20px | Fine for UI, too tight for 3+ line paragraphs | Add `--text-body: 14px; --text-body--line-height: 1.55;` |
| `--text-base` line-height | `1.5` → 24px | Too tight for long-form; Stripe's docs use **1.625** (16/26) | `--text-prose--line-height: 1.625` |
| `--shadow-sm` | `0 1px 3px 0 rgb(0 0 0/.1), 0 1px 2px -1px rgb(0 0 0/.1)` | Two hard, un-ringed layers at 10% — the "AI shadow" | Replace with `--shadow-e1` above |
| `--shadow-lg`/`xl` | `0 10px 15px -3px` / `0 20px 25px -5px` at 10% | Too tight a blur-to-offset ratio; reads as a sticker | Real menus use blur ≈ 3–4× offset (§4) |
| `--radius-lg` | `0.5rem` (8px) | Fine, but every generator reaches for `xl`/`2xl` | Cap yourself at `lg` for containers |
| `--tracking-tight` | `-0.025em` | Applied at every size; wrong below 24px | Track by size (§6.3) |
| `--font-sans` | system stack | Fine. `font-sans` is *not* Inter in v4 | Don't "fix" this by adding Inter reflexively |
| `--animate-pulse` | `pulse 2s cubic-bezier(.4,0,.6,1) infinite` opacity 1→.5 | The default skeleton shimmer; instantly recognizable | §10.4 |
| `--ease-out` | `cubic-bezier(0,0,.2,1)` | Material's; fine but generic | `cubic-bezier(0.25,0.46,0.45,0.94)` reads snappier |
| `--spacing` | `0.25rem` | Correct. **Do not change this.** | — |

**The contrarian one:** you do not need to override the colour palette wholesale. Tailwind v4's
OKLCH ramps are perceptually even and better than most hand-rolled ones. What you need is to
*pick one family and stop* (§5.2), and to add the 2–3 semantic tokens the palette has no opinion
about.

## 3.3 MUI — the four overrides

Measured on `mui.com/material-ui/react-button`, v9:

```
contained  112×37px   14px/24.5  w500  letter-spacing +0.4px   radius 4px
           bg rgb(25,118,210)
           shadow  0 3px 1px -2px rgba(0,0,0,.2),
                   0 2px 2px  0   rgba(0,0,0,.14),
                   0 1px 5px  0   rgba(0,0,0,.12)
outlined   padding 5px 15px   border 1px rgba(25,118,210,0.5)
disabled   color rgba(0,0,0,.26)  bg rgba(0,0,0,.12)
font       Roboto
```

```ts
// theme.ts — in leverage order
const theme = createTheme({
  // 1. the Material shadow. Three overlapping layers at 20/14/12% is the loudest
  //    "I used a component library" signal in the file.
  shadows: ["none",
    "0 0 0 1px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",              // 1
    "0 0 0 1px rgba(0,0,0,.06), 0 2px 4px -2px rgba(0,0,0,.06), 0 6px 12px -4px rgba(0,0,0,.08)", // 2
    ...Array(23).fill("0 0 0 1px rgba(0,0,0,.06), 0 8px 16px -4px rgba(0,0,0,.08), 0 24px 32px -8px rgba(0,0,0,.10)"),
  ] as any,

  // 2. Roboto → anything. Roboto is the single most identifiable "default" typeface on the web.
  typography: {
    fontFamily: `"Inter var", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    button: { textTransform: "none", letterSpacing: 0, fontWeight: 500, fontSize: 14 },
  },

  // 3. ALL-CAPS buttons with +0.4px tracking. Material's signature; nobody else's.
  //    (handled above by textTransform: "none")

  // 4. the ripple. It is the second-most identifiable Material tell.
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: { styleOverrides: { root: { minHeight: 32, paddingInline: 12, borderRadius: 6 } } },
  },
  shape: { borderRadius: 6 },
});
```

Order matters: shadow, typeface, caps, ripple. Fixing the palette without fixing those four
leaves it recognizably Material.

## 3.4 Bootstrap, Chakra, Ant — the one-liners

- **Bootstrap**: `--bs-border-radius: .375rem` → `6px`; delete `.shadow-sm` from cards; override
  `--bs-primary: #0d6efd` (the most-shipped blue on the internet); kill `.btn`'s
  `transition: all .15s ease-in-out`.
- **Chakra**: default `radii.md` = `0.375rem` is fine; the tells are the `focusRing` (a 3px
  `blue.500` halo) and `Button`'s `fontWeight: semibold` — drop to `medium`.
- **Ant Design**: `borderRadius: 6` is fine; the tells are `colorPrimary: #1677ff`, the
  `motionDurationMid: 0.2s` wave animation on click (`wave: false`), and `Table`'s
  `rowSelection` checkbox column width. Change the blue first.

---

# 4. Shadow and elevation

## 4.1 The measured truth: real systems put a ring in every shadow

This is the single highest-value finding in this file, and almost no generated code does it.

**Vercel/Geist**, every elevation token measured on `vercel.com`:
```
--ds-shadow-border-small:  0 0 0 1px #00000014, 0 2px 2px #0000000a, 0 0 0 1px hsla(0,0%,98%,1)
--ds-shadow-menu:          0 0 0 1px #00000014, 0px 1px 1px #00000005,
                           0px 4px 8px -4px #0000000a, 0px 16px 24px -8px #0000000f,
                           0 0 0 1px hsla(0,0%,98%,1)
--ds-shadow-modal:         0 0 0 1px #00000014, 0px 1px 1px #00000005,
                           0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f, …
--ds-shadow-tooltip:       0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 4px 8px #0000000a, …
```
**Radix Themes**, `--shadow-2` through `--shadow-6`, all six begin with:
```
0 0 0 1px color-mix(in oklab, #0000330f, #f0f0f3 25%)
```
**Stripe**: `--card-hover-shadow: 0 0 0 1px rgba(50,50,93,.01), 0 7px 14px 0 rgba(50,50,93,.1),
0 3px 6px 0 rgba(0,0,0,.02)` — ring first, then two layers at different offsets.

Three independent design systems, same structure: **a 1px hairline ring, then 2–4 progressively
larger and softer layers, all at very low alpha (1–15%).** Compare Tailwind's default
`--shadow-lg: 0 10px 15px -3px rgb(0 0 0/.1), 0 4px 6px -4px rgb(0 0 0/.1)` — no ring, two layers,
both at 10%, blur only 1.5× the offset. It reads as a sticker peeled off the page.

## 4.2 The elevation system — three levels, no more

```css
@theme {
  /* --border is your 1px hairline colour; the ring re-states it so the shadow
     survives on surfaces that have no border of their own (popovers, menus). */

  /* e0 — resting. NO shadow. A border, or nothing. */
  --shadow-e0: none;

  /* e1 — raised but attached: sticky header, table header, selected row, drag source */
  --shadow-e1: 0 0 0 1px var(--color-border),
               0 1px 2px 0 rgb(0 0 0 / .04);

  /* e2 — floating over content: dropdown, popover, select menu, tooltip, toast */
  --shadow-e2: 0 0 0 1px var(--color-border),
               0 2px 4px -2px rgb(0 0 0 / .06),
               0 6px 12px -4px rgb(0 0 0 / .08);

  /* e3 — modal layer: dialog, sheet, command palette, drag ghost */
  --shadow-e3: 0 0 0 1px var(--color-border),
               0 8px 16px -4px rgb(0 0 0 / .08),
               0 24px 32px -8px rgb(0 0 0 / .10);
}
```

**The maths that makes a shadow look real, derived from the measured sets:**
- **Blur ≈ 2–4× the y-offset.** `0 8px 16px` and `0 24px 32px` (Vercel), `0 7px 14px` (Stripe).
  `0 1px 3px` (Tailwind `shadow-sm`) is 3×, which is why it is the least bad default.
- **Negative spread on the big layer**, `-4px` to `-12px`, so the shadow is narrower than the
  element. Without it the shadow bleeds out the sides and reads as a glow.
- **Alpha 4–15%, never 20%+.** MUI's top layer is 20%. That is the difference.
- **No shadow layer with 0 y-offset**, except the ring.
- **Two or three layers minimum.** One layer cannot be both a contact shadow and an ambient one.

Usage:
```tsx
<div className="shadow-[--shadow-e2] rounded-[10px] bg-[--surface] p-1">{/* popover */}</div>
```

## 4.3 When a border beats a shadow — the decision rule

| Situation | Use |
|---|---|
| Element sits **in** the document flow and does not float | **border** |
| Element **floats over** other content | **shadow (with ring)** |
| Element is on a **coloured/sunken background** | **neither** — the background shift is the boundary |
| You need to show **selection** | **background tint + inset ring**, never a shadow |
| **Dark mode**, anything | **lighter background** first, border second, shadow last (§4.4) |
| Element is **draggable and currently dragged** | shadow — this is the one legitimate hover-elevation |

Concretely: a settings card does not float, so it gets a border. A `<Select>` trigger does not
float, so it gets a border. The `<Select>` *menu* floats, so it gets `--shadow-e2`. A sticky
table header is attached, so `--shadow-e1` — and only once it has actually stuck:

```tsx
<thead className="sticky top-0 z-10 bg-[--surface] shadow-[--shadow-e1]">
```

## 4.4 Dark-mode elevation: lightness, not shadow

Shadows do not work in dark mode. Black-on-near-black is invisible; the industry answer is that
**higher = lighter**.

Measured on linear.app, its four background levels and the OKLCH lightness of each:

```
--color-bg-level-0  #08090a   oklch(13.9% 0.0029 246)      ← app canvas
--color-bg-level-1  #0f1011   oklch(17.2% 0.0026 248)   ΔL +3.3
--color-bg-level-2  #141516   oklch(19.5% 0.0026 248)   ΔL +2.3
--color-bg-level-3  #191a1b   oklch(21.7% 0.0025 248)   ΔL +2.2
--color-bg-secondary  #1c1c1f oklch(22.8% 0.0057 286)
--color-bg-tertiary   #232326 oklch(25.7% 0.0056 286)
--color-bg-quaternary #28282c oklch(27.8% 0.0073 286)
```

**Each elevation step is ~2–3 percentage points of OKLCH lightness.** Not 5, not 10. And note the
chroma: 0.0026 — essentially neutral, but with a hue of ~247 (blue), so the darks are *cool*, not
dead grey. See §5.3.

```css
:root {
  --surface-0: oklch(14% 0.004 250);   /* canvas    */
  --surface-1: oklch(17% 0.004 250);   /* panel     */
  --surface-2: oklch(19.5% 0.004 250); /* popover   */
  --surface-3: oklch(22% 0.005 250);   /* modal     */
  --border:    oklch(1 0 0 / 8%);      /* translucent, so it works on every level */
  --border-strong: oklch(1 0 0 / 12%);
}
```
Linear's own border tokens are exactly this shape: `--color-border-translucent: #ffffff0d` (5%)
and `--color-border-translucent-strong: #ffffff14` (8%). A translucent white hairline is the right
call because it stays correct as the surface underneath changes level.

**In dark mode, add at most one shadow, on the modal layer only**, and make it larger and softer
than its light-mode twin: `0 16px 48px -8px rgb(0 0 0 / .6)`. Its job is to darken the scrim near
the dialog, not to imply a light source.

## 4.5 When the "before" is right

- **Google/Material products** genuinely use Material elevation. If you are building a Workspace
  add-on or an Android web view, matching it is correct, not generic.
- **Skeuomorphic or playful consumer products** — a kids' app, a game UI — earn a real, chunky
  shadow. A 20% alpha shadow with a hard edge is a legitimate style; it is just not a default.
- **Print-like and editorial layouts** may want a paper drop shadow on the page itself.

## 4.6 What the generic version was optimizing for

`shadow-sm` on a card is the generator's way of saying "this is a distinct thing" without
committing to a boundary decision. It is hedging. Pick: border (attached) or shadow (floating).

---

# 5. Color correction

## 5.1 Kill the gradient

```tsx
// before — the single highest-recognition AI tell
<div className="bg-gradient-to-r from-blue-500 to-purple-600 …">
<h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
               bg-clip-text text-transparent">
<Button className="bg-gradient-to-br from-violet-600 to-indigo-600">
```
```tsx
// after
<div className="bg-[--accent]">
<h1 className="text-[--fg]">
<Button className="bg-[--accent] hover:bg-[--accent-hover]">
```

Gradients that survive:
1. **Scrims** — a gradient to transparent over an image so text is legible. Always
   `linear-gradient(to top, rgb(0 0 0 / .72), transparent 60%)`, never a two-hue gradient.
2. **Chart area fills** — `accent → transparent`, one hue, for a filled line chart.
3. **A deliberate hero surface** with a *single* hue and a large blur, where the gradient is the
   art direction and appears once. Two hues 60°+ apart on the wheel is where it turns generic.
4. **A 1px top highlight on a raised control**, which is a gradient in name only:
   `linear-gradient(rgb(255 255 255 / .08), transparent 1px)`.

Everything else: flat.

**The measured contrast.** Not one of Linear, Vercel, Stripe, Attio, Notion, Raycast or GitHub
uses a multi-hue gradient in product chrome. Linear's entire accent story is two hex values:
`--color-accent: #7170ff` and `--color-accent-hover: #828fff`.

## 5.2 Build a real neutral ramp

### The problem, measured

shadcn's default neutral theme has effectively **five** steps in the light palette:

```
background        oklch(1     0 0)     L 100
secondary/muted   oklch(0.97  0 0)     L 97      ΔL  −3
border/input      oklch(0.922 0 0)     L 92.2    ΔL  −4.8
muted-foreground  oklch(0.556 0 0)     L 55.6    ΔL  −36.6   ←── a 37-point cliff
foreground        oklch(0.145 0 0)     L 14.5    ΔL  −41.1   ←── another one
```

There is **nothing between L92 and L56**. So when you need a hover fill that is darker than the
border, or a third text level between "muted" and "foreground," or a disabled state, or a chart
gridline — you have no value and you invent one. That is why shadcn apps drift into
`text-gray-400`, `bg-slate-100`, `border-zinc-200` inside the same component.

Compare Radix's 12-step gray, measured:

```
1  #fcfcfc  L 99.1        7  #cecece  L 85.1   ΔL −3.4
2  #f9f9f9  L 98.2  −0.9  8  #bbbbbb  L 79.2   ΔL −5.9   ← last "subtle" step
3  #f0f0f0  L 95.5  −2.7  9  #8d8d8d  L 64.3   ΔL −14.9  ← the solid/UI-fill boundary
4  #e8e8e8  L 93.1  −2.4  10 #838383  L 61.0   ΔL −3.3
5  #e0e0e0  L 90.7  −2.4  11 #646464  L 50.3   ΔL −10.7  ← secondary text
6  #d9d9d9  L 88.5  −2.2  12 #202020  L 24.4   ΔL −25.9  ← primary text
```
Eight closely-spaced light steps for surfaces and borders, then a jump at 8→9, then two text
values. **Note that step 12 is `#202020`, not `#000`.** Pure black text on pure white is a
tell in itself.

### The ramp to write

```css
@theme {
  /* 10 steps. Light steps 1–5 are close together (ΔL 2–3); text steps are far apart. */
  --color-n-0:  oklch(100%  0.000 250);  /* pure white — page only            */
  --color-n-1:  oklch(98.5% 0.002 250);  /* sunken surface / zebra stripe     */
  --color-n-2:  oklch(96.5% 0.003 250);  /* raised surface / hover fill       */
  --color-n-3:  oklch(93.5% 0.004 250);  /* hairline border                   */
  --color-n-4:  oklch(89%   0.006 250);  /* strong border / divider on tint   */
  --color-n-5:  oklch(78%   0.010 250);  /* disabled text, chart gridline     */
  --color-n-6:  oklch(64%   0.016 250);  /* placeholder, icon-muted           */
  --color-n-7:  oklch(52%   0.022 250);  /* secondary text                    */
  --color-n-8:  oklch(38%   0.028 250);  /* strong secondary / heading on tint*/
  --color-n-9:  oklch(22%   0.032 250);  /* primary text                      */

  /* semantic aliases — components reference ONLY these */
  --color-bg:            var(--color-n-0);
  --color-surface-sunken:var(--color-n-1);
  --color-surface-raised:var(--color-n-2);
  --color-border-subtle: var(--color-n-3);
  --color-border:        var(--color-n-4);
  --color-fg-disabled:   var(--color-n-5);
  --color-fg-muted:      var(--color-n-7);
  --color-fg:            var(--color-n-9);
}
```

**Never let a component reference `--color-n-3` directly.** The semantic layer is what lets you
retheme, and it is what stops "border" and "divider" from drifting apart.

### The chroma rule — the non-obvious one

Look at the `0.002 → 0.032` chroma column above. That is not decoration; it is copied from
practice. Stripe's `sail` gray ramp, measured and converted:

```
#f7fafc  oklch(98.3% 0.0042 236)
#e3e8ee  oklch(92.9% 0.0097 253)
#c1c9d2  oklch(83.2% 0.0154 251)
#a3acb9  oklch(74.1% 0.0213 257)
#8792a2  oklch(65.6% 0.0270 258)
#697386  oklch(55.4% 0.0320 263)
#4f566b  oklch(45.5% 0.0355 271)
#3c4257  oklch(38.2% 0.0368 272)
#2a2f45  oklch(31.1% 0.0402 274)
#1a1f36  oklch(24.7% 0.0444 273)
```
**Chroma rises monotonically from 0.004 to 0.044 as lightness falls, and hue drifts 236 → 273.**
The darks are more saturated and bluer than the lights. GitHub does the same:
`#1f2328` = `oklch(25.4% 0.011 254)`, `#59636e` = `oklch(49.5% 0.022 251)`. Linear's dark
foregrounds: `#8a8f98` = `oklch(64.9% 0.015 262)`, `#d0d6e0` = `oklch(87.4% 0.015 261)`.

A pure `oklch(L 0 0)` ramp — which is exactly what shadcn's `neutral` theme is — renders as
*dead*. Adding 0.002–0.04 of chroma on a consistent hue is the difference between "grey" and "the
grey that belongs to this product." Pick a hue and hold it: ~250 (cool/blue, tech default),
~85 (warm/amber, editorial and fintech), ~30 (warm/rose, consumer).

**When pure neutral is right:** anything where colour carries data and any grey tint would read
as a category — chart chrome behind categorical series, image editors, colour pickers, medical
imaging. Vercel's ramp is deliberately `hsl(0, 0%, x)` for this reason.

## 5.3 Restrict accent usage

```tsx
// before — accent as decoration
<Card className="border-blue-200 bg-blue-50">
  <Icon className="text-blue-500" />
  <h3 className="text-blue-900">…</h3>
  <Badge className="bg-blue-100 text-blue-700">Active</Badge>
  <Button className="bg-blue-600">Continue</Button>
  <a className="text-blue-600">Learn more</a>
</Card>
```
Six accent applications in one card. The accent now means nothing, so the actual primary action
does not stand out.

```tsx
// after — accent appears twice: the primary action, and the link
<div className="rounded-[10px] border border-[--color-border] p-4">
  <Icon className="size-4 text-[--color-fg-muted]" />
  <h3 className="text-[15px] font-medium text-[--color-fg]">…</h3>
  <span className="inline-flex h-[22px] items-center gap-1.5 rounded-full
                   bg-[--color-n-2] px-2 text-[12px] font-medium text-[--color-fg-muted]">
    <span className="size-1.5 rounded-full bg-[--color-success]" />Active
  </span>
  <Button className="bg-[--color-accent] text-white hover:bg-[--color-accent-hover]">Continue</Button>
  <a className="text-[--color-accent] underline-offset-2 hover:underline">Learn more</a>
</div>
```
The status badge is now neutral-with-a-coloured-dot: the colour is a 6px dot carrying the semantic
meaning, and the chip stays quiet. This one substitution removes most of the "candy" read from
dashboards.

**The budget:** on any given screen, accent colour appears on **one filled element** and on
**links/selected state**. That is it. Everything else — icons, headings, borders, hovers — is
neutral. Measured on attio.com's hero: "Start for free" is filled dark, "Talk to sales" is bare
text with no border and no accent at all.

## 5.4 Semantic colour only

```css
@theme {
  /* status is a closed set. If you find yourself adding a 5th, you have a category problem. */
  --color-success: oklch(58% 0.13 155);
  --color-warning: oklch(72% 0.15  75);
  --color-danger:  oklch(58% 0.20  25);
  --color-info:    var(--color-accent);

  /* each needs a surface + a border, not just a text colour */
  --color-success-surface: oklch(96% 0.03 155);
  --color-success-border:  oklch(88% 0.06 155);
}
```
Rules:
- **Colour never carries meaning alone.** Every status colour ships with an icon or a word. 8% of
  men cannot distinguish your success green from your danger red.
- **Red is destructive or failed. Nothing else.** Not "important", not "new", not a brand accent.
  If your brand is red, your destructive colour has to be a different red — usually darker and
  more saturated — and your brand red never appears on a button that deletes.
- **Do not colour-code more than 4 categories** in chrome. Beyond that use shape, position, or
  labels. (Charts are different; see the `dataviz` skill.)
- **Green for money is a US convention** and inverted in parts of East Asia (red = up). If the
  product has a global audience, make direction available as a token.

## 5.5 The dark-mode conversion that is not a conversion

```css
/* before — the mechanical inversion */
.dark { --color-bg: #000; --color-fg: #fff; --color-border: #333; }
```
Pure black background with pure white text at 21:1 causes halation on OLED and is the fastest way
to make a dark theme look cheap.

```css
/* after — measured against Linear's actual values */
.dark {
  --color-bg:             oklch(14%   0.004 250);   /* Linear: #08090a = L 13.9 */
  --color-surface-raised: oklch(17%   0.004 250);   /* Linear: #0f1011 = L 17.2 */
  --color-surface-sunken: oklch(11%   0.004 250);
  --color-border-subtle:  oklch(1 0 0 / 6%);
  --color-border:         oklch(1 0 0 / 10%);
  --color-fg:             oklch(97%   0.001 200);   /* Linear: #f7f8f8 = L 97.8 */
  --color-fg-muted:       oklch(65%   0.015 262);   /* Linear: #8a8f98 = L 64.9 */
  --color-fg-disabled:    oklch(51%   0.012 262);   /* Linear: #62666d = L 50.9 */
  /* accents get LIGHTER and LESS saturated in dark, not the same hex */
  --color-accent:         oklch(70%   0.16  265);
}
```
Two rules that generated dark modes always miss:
1. **The accent must be re-picked, not reused.** A saturated `#5e6ad2` that works on white
   vibrates on `#08090a`. Linear ships `--color-brand-bg: #5e6ad2` for surfaces but
   `--color-accent: #7170ff` and `--color-link-primary: #828fff` for anything on dark.
2. **Foreground steps stay far apart.** Linear's four text levels are L 97.8 / 87.4 / 64.9 / 50.9
   — gaps of 10, 23 and 14 points. Generated dark modes bunch them at 90/80/70 and the hierarchy
   collapses.

---

# 6. Typographic correction

## 6.1 The scale

```css
@theme {
  /* UI scale — 6 sizes. Every one has a job. Stop at 6. */
  --text-micro: 11px;  --text-micro--line-height: 16px;  /* dense metadata, keycaps    */
  --text-mini:  12px;  --text-mini--line-height:  16px;  /* badges, table sub-labels   */
  --text-ui:    13px;  --text-ui--line-height:    20px;  /* rows, buttons, menu items  */
  --text-body:  14px;  --text-body--line-height:  20px;  /* default UI text            */
  --text-lead:  15px;  --text-lead--line-height:  22px;  /* card titles, section heads */
  --text-h:     18px;  --text-h--line-height:     24px;  /* page/panel titles          */
  /* display sizes live in a separate scale — see 6.2 */
}
```
Measured comparison — Linear's shipped scale is almost exactly this:
`micro 11 / mini 12 / small 13 / regular 15 / large 18 / title3 20 / title2 24 / title1 36`.
Radix Themes: `12 / 14 / 16 / 18 / 20 / 24 / 28 / 35 / 60`.

**Two rules the default output breaks:**
- **The gap between adjacent UI sizes is 1–2px, not 4px.** `text-sm` → `text-base` → `text-lg`
  (14 → 16 → 18) is a *prose* scale. In UI, 13 and 14 do different jobs and 16 rarely has one.
- **Line-height tightens as size grows.** 13px/20 is 1.54; 36px/40 is 1.11. Tailwind's defaults
  already do this (`text-5xl` line-height 1) but generated code overrides it with
  `leading-tight`/`leading-relaxed` applied uniformly, which flattens it back out.

## 6.2 Display type — the four things to change

```tsx
// before — the generated hero
<h1 className="text-5xl font-bold tracking-tight">Build better products faster</h1>
//              48px      w700       -0.025em
```
```tsx
// after
<h1 className="text-[64px] leading-[0.95] font-[560] tracking-[-0.022em] text-balance">
  Build better products faster
</h1>
```

Measured display type on live sites, 1440px:

| Site | Size / line-height | Ratio | Weight | Tracking |
|---|---|---|---|---|
| Notion | 96px / 100px | 1.04 | 600 | −4.6px = **−0.048em** |
| Linear | 64px / 64px | **1.00** | **510** | −1.408px = −0.022em |
| Attio | 64px / 60.8px | **0.95** | 600 | −1.28px = −0.02em |
| Raycast | 64px / 70.4px | 1.10 | 600 | 0 |
| Railway | 54px / 60.5px | 1.12 | 500 | −1.96px = −0.036em |
| Mercury | 49.3px / 54.3px | 1.10 | **480** | 0 |
| Vercel (price) | 56px / 56px | 1.00 | **450** | −3.36px = −0.06em |

1. **Line-height 0.95–1.05, not 1.2.** `leading-tight` is 1.25 and it is too loose for a
   40px+ headline. Attio runs 0.95 — the descenders of one line overlap the cap height of the
   next, which is correct at display size.
2. **Weight 450–600, not 700.** Five of the seven sites measured use a weight below 600. `font-bold`
   at 64px is a shout. Linear runs **510**.
3. **Tracking −0.02 to −0.05em, and only above ~24px.** Tailwind's `tracking-tight` is a flat
   −0.025em applied at any size; applied to 13px UI text it destroys legibility.
4. **`text-balance` or an explicit `max-w`.** A 3-word orphan on line two is the most common
   generated-hero defect.

## 6.3 Track by size — the table

```css
/* Radix Themes ships exactly this relationship; these are its measured values */
12px → +0.005em      /*  and small caps/eyebrows go further: +0.05 to +0.06em */
14px →  0em
16px →  0em
18px → −0.005em
20px → −0.010em
24px → −0.0125em
28px → −0.015em
35px → −0.020em
60px → −0.050em
```
```css
/* implement it once, apply it never again */
@theme {
  --tracking-micro: 0.01em;   --tracking-eyebrow: 0.06em;
  --tracking-ui:    0em;
  --tracking-lead:  -0.01em;
  --tracking-title: -0.02em;
  --tracking-hero:  -0.035em;
}
```
Measured confirmation from Attio: its 12px eyebrow runs **+0.72px = +0.06em** with weight 600,
while its 64px headline runs **−0.02em**. Same page, opposite directions. That inversion is the
whole rule.

## 6.4 Weight and contrast levels

**The measured finding that most changes generated output:** the best-typeset products use
**non-integer variable weights.**

```
Linear   --font-weight-medium: 510   semibold: 590   bold: 680   light: 300
Mercury  body 360   nav 420   headings 480
Stripe   pricing 425   footnote 300
Vercel   pricing display 450
```
Generated code uses `400 / 500 / 600 / 700` exclusively, because those are the Tailwind class
names. If your typeface is variable — Inter, Geist, Mona Sans, SF, most of what you will use —
`font-[510]` is available and it is the difference between "medium" and "the right medium."

```tsx
// before
<div className="font-semibold">Faster app launch</div>
<div className="text-sm text-muted-foreground">DRV-8852</div>

// after — hierarchy from weight + colour at ONE size, which is how dense UI works
<div className="text-[13px] font-[510] text-[--color-fg]">Faster app launch</div>
<div className="text-[13px] font-[400] text-[--color-fg-muted]">DRV-8852</div>
```

**Three text-contrast levels, defined once:**
```css
--color-fg:        oklch(22% .032 250);   /* primary   — the content            */
--color-fg-muted:  oklch(52% .022 250);   /* secondary — labels, metadata       */
--color-fg-subtle: oklch(64% .016 250);   /* tertiary  — placeholder, disabled  */
```
A fourth level is almost always a mistake; the gap between three and four is where "washed out"
starts. Linear runs four but the fourth (`#62666d`) is used only for genuinely inactive things.

## 6.5 Getting off default Inter, tastefully

Inter is not a bad typeface — it is the *default* typeface, which is a different problem. Four
escape routes, cheapest first:

### Route 1 — turn on Inter's features (0 bytes, biggest ratio)

```css
:root {
  font-family: "Inter var", -apple-system, system-ui, sans-serif;
  font-feature-settings: "cv01" 1, "cv02" 1, "cv11" 1, "ss03" 1;
  /* cv01: single-storey g · cv02: open 4 · cv11: single-storey a · ss03: rounded quotes */
  font-optical-sizing: auto;
}
```
Linear ships `--font-settings: "cv01", "ss03"` and `--font-variations: "opsz" auto` on top of
Inter Variable, which is most of why Linear's Inter does not read as Inter. This costs nothing.

### Route 2 — split UI and display (still one family)

Attio uses `interDisplay` for headings and `inter` for UI — same superfamily, different optical
size. Vercel uses `GeistSans` for both but with `"ss11"` on and `"calt"` **off** for numerals.

```css
--font-ui:      "Inter var", system-ui, sans-serif;
--font-display: "Inter Display", "Inter var", system-ui, sans-serif;
```

### Route 3 — swap the display face only (~30–60KB for one weight)

The highest-impact, lowest-risk change: keep Inter/system for UI, put a real face on headlines.
Railway ships **IBM Plex Serif** at 54px on a developer-infrastructure site — a serif on a
devtools product, which is exactly the kind of decision that makes a page unmistakable. Mercury
uses a custom `arcadiaDisplay` for headings and `arcadia` for body.

```css
@font-face { font-family: "Display"; src: url(/f/display-500.woff2) format("woff2");
             font-weight: 500; font-display: swap; }
h1, h2, .display { font-family: "Display", Georgia, serif; }
```
Serve **one weight** of the display face. If you need two weights of your display face on a
landing page, you have too many headline levels.

### Route 4 — the system stack, on purpose

```css
--font-ui: -apple-system, BlinkMacSystemFont, "Segoe UI Variable Text", "Segoe UI",
           system-ui, sans-serif;
```
Zero bytes, zero layout shift, and on macOS you get SF, which is better than Inter at UI sizes.
**Contrarian:** the reflex to add a webfont to every project is usually a downgrade for the ~60%
of your users on Apple hardware, and always a downgrade for CLS. Tailwind v4's `--font-sans` is
already this stack. Leaving it alone is a defensible decision, not laziness — the mistake is
leaving it alone *and* leaving everything else at default.

### The one rule for all four routes

**Never more than two families**, and the second one has a job you can name in four words
("headlines only", "numbers and code"). A third family is always a mistake.

## 6.6 Numerals — the rule that is usually stated wrong

The advice "always use `tabular-nums` for numbers" is wrong. Measured:

```
ui.shadcn.com  KPI value        24px  font-variant-numeric: tabular-nums
vercel.com     ordered list     20px  font-variant-numeric: tabular-nums
vercel.com     price "$20"      56px  font-variant-numeric: normal
stripe.com     price "$15.00"   15px  font-variant-numeric: normal
mercury.com    "$250,000"       18px  font-variant-numeric: normal
attio.com      "CRM Platform"   12px  font-variant-numeric: tabular-nums
```

**The rule that matches practice:** tabular figures when digits **stack in a column and change**
— table cells, ordered lists, live counters, timers, sequence numbers, anything that would jitter
on update. Proportional figures when the number is **read as prose or as a headline** — a price on
a marketing page, a stat in a sentence, a display figure. Proportional figures are better-spaced;
tabular figures are wider and look mechanical at display size.

```tsx
{/* table cell — tabular */}
<td className="tabular-nums text-right">{fmt(row.amount)}</td>

{/* live counter — tabular, or it dances */}
<span className="tabular-nums">{elapsed}</span>

{/* marketing price — proportional */}
<span className="text-[56px] font-[450] tracking-[-0.06em]">$20</span>
```

**Cents are the same size and weight as dollars.** Superscript cents is a retail-pricing device
and it undercuts the seriousness a financial product needs. Right-align every currency column and
never centre one.

---

# 7. Density correction

## 7.1 The multipliers

Take what the generator produced and apply these. They are derived from the gap between measured
shadcn output and measured product output.

| Property | AI default | Scan archetype (×) | Work archetype (×) | Glance archetype (×) |
|---|---|---|---|---|
| Row / item vertical padding | `py-4` (16px) | ×0.5 → 8px | ×0.4 → 6px | ×0.75 → 12px |
| Card / panel padding | `p-6` (24px) | ×0.67 → 16px | ×0.5 → 12px | ×1.0 → 24px |
| Section gap | `gap-6`/`space-y-6` | ×0.67 → 16px | ×0.5 → 12px | ×1.33 → 32px |
| Body text | 16px | ×0.875 → 14px | ×0.8125 → 13px | ×1.0 → 16px |
| Button height | 36px (`h-9`) | ×0.89 → 32px | ×0.78 → 28px | ×1.0 → 36px |
| Icon in row | 20px (`size-5`) | ×0.8 → 16px | ×0.7 → 14px | ×1.0 → 20px |
| Border radius | 10–14px | ×0.6 → 6–8px | ×0.5 → 4–6px | ×1.0 |
| Page top chrome | ~220px | ×0.4 → 88px | ×0.25 → 56px | ×1.0 |

Archetypes: **Glance** = opened seconds a day (status page, receipt, onboarding). **Scan** =
several times a day, 10–90s (repo browser, inbox, admin list). **Work** = hours a day, hundreds
of operations (issue tracker, CRM, trading, IDE).

Measured anchors: shadcn's sidebar item is **32px** and its default button **36px**; Vercel's and
Linear's primary buttons are both **32px**; Linear's nav rows are 32px with 12px horizontal
padding at 13px type. See [`craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md)
for the full calibration table and the fold test.

## 7.2 The mechanical pass

```tsx
// before — the generated list item
<div className="flex items-center gap-4 rounded-lg border p-4">
  <Avatar className="size-10" />
  <div className="flex-1 space-y-1">
    <p className="text-base font-medium">{item.name}</p>
    <p className="text-sm text-muted-foreground">{item.email}</p>
  </div>
  <Button size="sm">View</Button>
</div>
// measured height: 74px
```
```tsx
// after — Scan density
<a className="group flex items-center gap-3 px-3 py-2 hover:bg-[--overlay-hover]">
  <Avatar className="size-6" />
  <span className="min-w-0 flex-1 truncate text-[13px] font-[510]">{item.name}</span>
  <span className="hidden truncate text-[13px] text-[--color-fg-muted] sm:block sm:w-[220px]">
    {item.email}
  </span>
  <ChevronRight className="size-3.5 shrink-0 text-[--color-fg-subtle] opacity-0
                           group-hover:opacity-100" />
</a>
// height: 36px
```
Four changes did it: the card became a row, two stacked lines became two columns, the avatar
dropped 10px, and the always-visible "View" button became an affordance that appears on hover.
**74px → 36px.** At 900px of viewport that is 12 rows versus 24.

## 7.3 Where the density actually goes

Do not take density out of type. Take it out of, in order:

1. **Vertical padding.** `py-4` → `py-2`. Biggest single win.
2. **Chrome above the content.** A greeting, a breadcrumb, a page title, a description, a filter
   bar and a table header is six bands before the first datum. Merge the title into the filter
   bar. Delete the description. Delete the greeting — "Welcome back!" is never information.
3. **Redundant labels.** A column header that says "Name" above a column of names.
4. **Always-visible row actions.** Move to hover / a `⋯` menu / a keyboard shortcut.
5. **Icon size**, then finally
6. **Font size**, once, from 16 to 14 or 13. Never twice.

## 7.4 When the "before" is right

- **Under ~10 items, dense is wrong.** A 28px row list of five things looks cramped and cheap.
  Density is a function of N.
- **Touch targets stay 44×44px** regardless of archetype. On mobile, run Glance density and lean
  on `hit-slop` padding rather than shrinking the visual element.
- **Onboarding, checkout, error recovery, and anything the user does once** should be roomy. The
  cost of a misclick is high and the cost of scrolling is zero.
- **Accessibility contexts** — a tool for users with low vision or motor impairment inverts every
  number in the table above.

---

# 8. Layout de-genericization

## 8.1 The shape of the generic page

```
[centered nav]
[centered eyebrow pill]
[centered 48px headline, 2 lines]
[centered 18px subhead, 2 lines, max-w-2xl]
[two centered buttons]
[3-column feature grid, equal widths, py-24]
[3-column feature grid, equal widths, py-24]
[centered testimonial cards, 3 across]
[centered CTA, py-24]
```
Everything centred, every section the same width, every gap 96px, every group of three. The
generator produces this because a symmetric grid is the safest thing that cannot look broken.

## 8.2 Move 1 — stop centring everything

```tsx
// before
<section className="mx-auto max-w-3xl px-6 py-24 text-center">
  <h1 className="text-5xl font-bold tracking-tight">…</h1>
  <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">…</p>
  <div className="mt-8 flex justify-center gap-3">…</div>
</section>
```
```tsx
// after — measured off linear.app's homepage
<section className="mx-auto max-w-[1200px] px-8 pt-[180px] pb-24">
  <h1 className="max-w-[16ch] text-[64px] leading-[1.0] font-[510] tracking-[-0.022em]">
    The product development system for teams and agents
  </h1>
  {/* subhead LEFT, secondary link pinned RIGHT on the same baseline */}
  <div className="mt-6 flex items-baseline justify-between gap-8">
    <p className="max-w-[46ch] text-[15px] text-[--color-fg-muted]">
      Purpose-built for planning and building products.
    </p>
    <a className="shrink-0 text-[15px]">
      <span className="font-[510] text-[--color-fg]">New</span>{" "}
      <span className="text-[--color-fg-muted]">Loops →</span>
    </a>
  </div>
</section>
```
That last block is the whole move: two elements on one baseline, far apart, doing different jobs.
It is unbalanced on purpose and it reads as edited rather than generated. Centring is correct for
a login card, a confirmation, a 404, and a genuinely short marketing statement. It is wrong as the
default for eight consecutive sections.

## 8.3 Move 2 — vary section width

Give yourself three content widths and alternate them deliberately:

```css
@theme {
  --w-prose: 680px;    /* text you actually read           */
  --w-content: 1080px; /* standard section                 */
  --w-wide: 1440px;    /* tables, galleries, product shots */
  /* full-bleed = no max-width, and it must be earned (8.5) */
}
```
```tsx
<section className="mx-auto max-w-[--w-prose] px-6">   {/* narrative */}
<section className="mx-auto max-w-[--w-content] px-6"> {/* feature grid */}
<section className="mx-auto max-w-[--w-wide] px-6">    {/* screenshot */}
```
Linear ships `--page-max-width: 1024px` with `--page-inset: 32px` — one content width — and then
breaks out of it for the product screenshot. One width plus one deliberate exception beats three
widths applied at random.

## 8.4 Move 3 — break the uniform vertical rhythm

```tsx
// before: every section py-24
// after: rhythm as a function of relationship
<main>
  <Hero className="pb-20" />                        {/* 80  */}
  <ProductShot className="pt-0 pb-32" />            {/* tight to hero — it IS the hero  */}
  <Features className="py-24" />                    {/* 96  */}
  <Logos className="py-12" />                       {/* 48 — a breath, not a section    */}
  <DeepDive className="py-32" />                    {/* 128 — the argument              */}
  <CTA className="py-16" />                         {/* 64 — close fast                 */}
</main>
```
Rule: **space between two sections is proportional to how unrelated they are.** A product
screenshot immediately under its own headline should be closer to it than to the next section. The
generated version spaces everything equally, which tells the reader nothing about structure.

## 8.5 Move 4 — asymmetric grids

```tsx
// before
<div className="grid grid-cols-3 gap-6">{features.map(f => <Card key={f.id} {...f} />)}</div>
```
```tsx
// after — one feature is more important, so it is bigger. That is the entire idea.
<div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
  <article className="md:col-span-2 md:row-span-2 …">{/* the headline capability */}</article>
  <article className="…">{/* supporting */}</article>
  <article className="…">{/* supporting */}</article>
</div>
```
Or, for a content page, the sidebar that is not half the width:
```tsx
// before: grid-cols-2  ·  after:
<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
  <article className="max-w-[--w-prose]">…</article>
  <aside className="lg:sticky lg:top-20 lg:self-start">…</aside>
</div>
```
`1fr / 320px` beats `2fr / 1fr` because the sidebar has a *natural* width (a fixed set of small
things) and the article does not.

## 8.6 Move 5 — earning a full-bleed

A full-bleed section is a promise that what is inside is worth the entire viewport. It is earned
by exactly three kinds of content:

1. **An image or product screenshot** that is genuinely wide.
2. **A background shift that groups a run of content** (§1.3, After C) — and there is one per page.
3. **A data surface that needs the width**: a wide table, a timeline, a map, a canvas.

Not earned by: a testimonial, a CTA, a three-column feature grid, or a coloured band with centred
text in it. The generated pattern of alternating white and `bg-muted` full-bleed bands is
stripes, not structure.

```tsx
{/* the correct full-bleed inside a max-width parent, no wrapper needed */}
<figure className="mt-16 w-screen relative left-1/2 right-1/2 -mx-[50vw]">
  <img src={shot} alt="" className="w-full" />
</figure>
```

## 8.7 When symmetry is right

Pricing tables. Comparison grids. Anything where the user's task is to compare like with like —
asymmetry there is actively harmful, because it implies a ranking you may not intend. Also: dense
app chrome, where a predictable grid is what makes the interface learnable. **Asymmetry is a
marketing and editorial tool, not a product-chrome tool.**

---

# 9. Copy surgery

Copy is about 30% of what a designer reads as "quality" and close to 0% of what a generator spends
effort on. These are the moves, then 15 worked rewrites.

## 9.1 The eight moves

1. **Name the object.** "Item" / "Content" / "Data" → the actual noun the domain uses.
2. **Verb the button.** A button says what will happen, in the user's words, not "Submit."
3. **Cut the hedge.** "You can now…", "Feel free to…", "Simply…", "Easily…", "Seamlessly…".
4. **Delete the greeting.** "Welcome back!" is never information.
5. **State the consequence, not the mechanism.** "Sync your data" → "Changes appear in Slack."
6. **Empty states get a next action, not an apology.**
7. **Errors say what to do.** Never "Something went wrong."
8. **Numbers instead of adjectives.** "Fast" → "Deploys in 8 seconds."

## 9.2 Fifteen rewrites

The "before" strings marked ▣ are verbatim from `ui.shadcn.com/examples/dashboard`, measured
2026-09 — they are the real generated defaults, not a caricature.

| # | Before | After | Move |
|---|---|---|---|
| 1 | ▣ "Total Revenue" / "$1,250.00" | "Collected · Aug" / "$1,250.00" with "of $4,000 goal" beneath | 1, 5 |
| 2 | ▣ "Trending up this month ↗" | "+$140 vs. July" | 8 |
| 3 | ▣ "Visitors for the last 6 months" | "Since Mar 4" | 3, 8 |
| 4 | ▣ "Acquisition needs attention" | "3 of 5 trials expired without converting" | 5, 8 |
| 5 | ▣ "Meets growth projections" | delete the line | 3 |
| 6 | "Welcome back, Sarah! 👋" | delete; show the work instead | 4 |
| 7 | "No items found" | "No invoices past due. Nice." + `Create invoice` | 6 |
| 8 | "Get started by creating your first item." | "Import a CSV, or add a customer by hand." (two real actions) | 1, 6 |
| 9 | "Submit" | "Send invoice" / "Deploy to production" / "Refund $42.00" | 2 |
| 10 | "Something went wrong. Please try again." | "Couldn't reach the billing service. We retried twice. Try again, or [contact support] with code `bl-3391`." | 7 |
| 11 | "Are you sure you want to delete this item?" | "Delete **Q3 Forecast**? 14 linked records lose their reference. This can't be undone." + button `Delete forecast` | 1, 5 |
| 12 | "Manage your account settings and preferences." | delete; the `<h2>Account</h2>` said it | 3 |
| 13 | "Effortlessly streamline your workflow with our powerful platform." | "Deploys in 8 seconds. Rolls back in one." | 3, 8 |
| 14 | "Loading…" | "Fetching 1,204 rows…" (or a skeleton with no text at all) | 8 |
| 15 | "Learn more" | "See how routing works" / "Read the migration guide" | 2 |

## 9.3 Button labels, specifically

```tsx
// before
<Button>Submit</Button>  <Button variant="outline">Cancel</Button>
```
```tsx
// after — the label is the verb phrase from the confirmation sentence
<Button>Send invoice</Button>  <Button variant="ghost">Keep editing</Button>
```
- The destructive confirm button says the destructive verb: `Delete workspace`, not `Confirm`.
- The cancel button says what happens if you cancel: `Keep editing`, `Stay on this plan`.
- **Never label the cancel button "Cancel" in a dialog about cancelling a subscription.** Real
  bug, ships constantly.
- Real examples measured: attio.com pairs `Start for free` (filled) with `Talk to sales` (bare
  text). linear.app pairs `Open app` with `Log in`. raycast.com uses `Download for Mac` with a
  12px monospace spec line beneath: "macOS Tahoe and Apple Silicon". That mono line is the whole
  §11 lesson compressed into one string.

## 9.4 Sentence case, always, with two exceptions

```
before: "Create New Project"  "Delete Account"  "Learn More"
after:  "Create project"      "Delete account"  "Learn more"
```
Exceptions: proper nouns, and a genuine 11px eyebrow label in `uppercase` with `+0.06em` tracking
where the caps *are* the design (measured on attio.com: 12px, weight 600, +0.72px tracking).
Title Case on buttons is a 2014 Bootstrap habit.

## 9.5 When the generic copy is right

Legal, regulated, and safety-critical strings. "By continuing you agree to the Terms of Service"
should be boring and standard. Same for medical dosing, financial disclosures, and consent
language — a clever rewrite there is a liability. Also: standard destructive confirmations in an
enterprise tool where an admin does the same operation 40 times a day wants predictability, not
personality.

---

# 10. Adding depth

A generated interface is a **happy-path mockup**: the one state where data exists, nothing is
loading, nothing failed, no string is too long, and nobody is using a keyboard. Adding the other
states is what converts it into something that feels built.

## 10.1 The checklist

Every data surface ships all of these. Missing any one is visible.

**States**
- [ ] **Empty** — never seen data. Says what this is for + one primary action.
- [ ] **Empty-after-filter** — data exists, filter matched nothing. Different copy, and a
      `Clear filters` button. Generated code always conflates these two.
- [ ] **Loading, first paint** — skeleton matching the real layout's geometry, or nothing.
- [ ] **Loading, refetch** — do NOT swap the content for a skeleton; keep it and dim, or show a
      2px top progress bar.
- [ ] **Error** — what failed, whether it retried, what to do, an error code to quote.
- [ ] **Partial error** — the list loaded but one row's data failed.
- [ ] **Too much** — 10,000 rows. Pagination or virtualization exists.
- [ ] **Too little** — one row. Does the layout collapse?
- [ ] **Offline / stale** — last-updated timestamp, or a banner.
- [ ] **Permission-denied** — the surface exists but this user cannot see it.

**Per interactive element**
- [ ] `:hover` — background only, no movement (§12).
- [ ] `:focus-visible` — a visible ring, never removed.
- [ ] `:active` — a distinct value, even if subtle. Most generated code has none.
- [ ] `:disabled` — and a reason available on hover/title.
- [ ] **Loading/pending** — the button keeps its width; spinner replaces label, label does not
      shift.
- [ ] **Selected** vs **hovered** vs **focused** are three different appearances.

**Content edge cases**
- [ ] Longest realistic string truncates with `truncate` and has a `title`.
- [ ] Zero, one, and 999,999 all render.
- [ ] Negative numbers. Zero-state numbers (`—`, not `0` when unknown).
- [ ] A missing avatar → initials, not a broken image.
- [ ] RTL, if you claim to support it.
- [ ] Timestamps: relative under 24h, absolute after, `title` with the exact ISO time.

**Keyboard**
- [ ] Tab order matches visual order.
- [ ] `Esc` closes the topmost layer.
- [ ] `Enter` submits the focused form.
- [ ] Arrow keys move within a list/menu (roving tabindex), Tab moves out of it.
- [ ] A visible focus ring on the element that receives focus when a dialog opens.

## 10.2 The two empty states

```tsx
// before — one state doing two jobs
{rows.length === 0 && <p className="text-muted-foreground">No results found.</p>}
```
```tsx
// after
{rows.length === 0 && (
  hasActiveFilters ? (
    <div className="px-3 py-10 text-center">
      <p className="text-[13px] text-[--color-fg-muted]">
        No invoices match <span className="text-[--color-fg]">“{query}”</span> in Overdue.
      </p>
      <button onClick={clearFilters}
        className="mt-3 text-[13px] text-[--color-accent] underline-offset-2 hover:underline">
        Clear filters
      </button>
    </div>
  ) : (
    <div className="px-3 py-12 text-center">
      <p className="text-[15px] font-[510]">No invoices yet</p>
      <p className="mx-auto mt-1 max-w-[38ch] text-[13px] text-[--color-fg-muted]">
        Invoices you send appear here with their payment status.
      </p>
      <div className="mt-4 flex justify-center gap-2">
        <Button size="sm">New invoice</Button>
        <Button size="sm" variant="ghost">Import from Stripe</Button>
      </div>
    </div>
  )
)}
```
No illustration. No "Oops!". The difference between the two branches is the entire point.

## 10.3 The button that does not move when it loads

```tsx
// before — width collapses, layout jumps, double-submit possible
<Button disabled={pending}>{pending ? "Saving..." : "Save changes"}</Button>
```
```tsx
// after
<Button disabled={pending} aria-busy={pending} className="relative">
  <span className={pending ? "invisible" : undefined}>Save changes</span>
  {pending && (
    <span className="absolute inset-0 grid place-items-center">
      <Spinner className="size-3.5" />
    </span>
  )}
</Button>
```
The label stays in the DOM and keeps the width. This one pattern removes most of the "jank" read.

## 10.4 Skeletons that are not the default shimmer

Tailwind's `animate-pulse` (`pulse 2s cubic-bezier(.4,0,.6,1) infinite`, opacity 1→0.5) applied to
grey rounded rectangles is instantly recognizable.

```tsx
// before
<div className="h-4 w-full animate-pulse rounded bg-muted" />

// after — three fixes
// 1. match the real geometry: real row height, real column widths, real number of rows
// 2. vary the widths so it looks like content, not a form
// 3. slower, subtler, and no shimmer on the first 150ms (avoid flash for fast responses)
const W = ["68%", "42%", "81%", "55%", "73%"];
<ul className="divide-y divide-[--color-border-subtle]" aria-busy="true">
  {W.map((w, i) => (
    <li key={i} className="flex h-9 items-center gap-3 px-3">
      <div className="size-6 rounded-full bg-[--color-n-2]" />
      <div className="h-[9px] rounded-[3px] bg-[--color-n-2]" style={{ width: w }} />
    </li>
  ))}
</ul>
```
```css
@media (prefers-reduced-motion: no-preference) {
  [aria-busy="true"] > * { animation: skeleton 1.6s ease-in-out .15s infinite; }
}
@keyframes skeleton { 0%,100% { opacity: 1 } 50% { opacity: .55 } }
```
**Better than any skeleton:** if the response is usually under 300ms, render nothing and let it
land. A skeleton that flashes for 120ms is worse than no skeleton.

## 10.5 The four hover/focus/active/selected states, distinguished

```css
.row               { background: transparent; }
.row:hover         { background: var(--overlay-hover); }      /* rgb(0 0 0 / .04) light,
                                                                 rgb(255 255 255 / .08) dark  */
.row:active        { background: var(--overlay-active); }     /* ×1.5 the hover alpha        */
.row:focus-visible { outline: 2px solid var(--color-ring); outline-offset: -2px; }
.row[aria-selected="true"] {
  background: var(--overlay-selected);                        /* accent at 8–10%             */
  box-shadow: inset 2px 0 0 var(--color-accent);              /* a leading bar, not a border */
}
```
The 8% white overlay is measured: linear.app's nav item hover is exactly
`rgba(255, 255, 255, 0.08)`. Selection needs a second channel (the inset bar) because on a list
where several rows are hovered in sequence, background alone cannot distinguish "under the cursor"
from "chosen."

---

# 11. Product specificity

**The strongest cure in this file.** An interface built from conventional components, with this
product's real content, its vocabulary, its primary object given priority, and one signature
decision, does not read as generated. Surface fixes move the score a little; this moves it a lot.

## 11.1 The four levers

### Lever 1 — real content, varied

```tsx
// before
const rows = Array.from({ length: 5 }, (_, i) => ({
  name: `Item ${i + 1}`, status: "Active", amount: "$1,000.00", date: "2024-01-01",
}));
```
```tsx
// after — real names of realistic length, statuses in realistic proportion,
// amounts with different digit counts, dates at irregular intervals, one ugly case
const rows = [
  { name: "Northwind Traders — Q3 renewal",              status: "paid",     amount: 4820000, due: "2026-08-14" },
  { name: "Acme Rocketry",                               status: "overdue",  amount:  129900, due: "2026-07-02" },
  { name: "Blue Bottle Coffee (Oakland, Broadway St.)",  status: "draft",    amount:   45000, due: null },
  { name: "Møller & Sønn A/S",                           status: "paid",     amount: 1200000, due: "2026-08-29" },
  { name: "Zed",                                         status: "sent",     amount:    9900, due: "2026-09-11" },
];
```
Six things this gets you that `Item 1..5` cannot: column widths that are actually tested,
truncation that actually happens, a non-ASCII name, an amount that needs a thousands separator
next to one that does not, a null date, and a status distribution that is not uniform.

**Where to get it:** if the product exists, take 20 real rows from the database. If it does not,
write 10 by hand from the domain. Never generate them in a loop.

### Lever 2 — domain vocabulary

Every label, every column, every empty state uses the word the user uses, not the generic:

```
Item      → Issue / Invoice / Shipment / Patient / Deal / Track / Run
Status    → Triage state / Payment status / Cure stage / Build result
User      → Assignee / Payer / Attending / Account owner
Created   → Filed / Issued / Admitted / Committed
Delete    → Void / Archive / Discharge / Revoke
Tag       → Label / Cost centre / Ward / Branch
Amount    → Balance due / Net terms / Contract value
```
Linear says "Triage", "Cycle", "Project", "Initiative" — not "Board", "Sprint", "Folder". That
vocabulary is doing more work for its identity than any visual decision.

### Lever 3 — the primary object gets visual priority

Every product has one object it is *about*. That object must be the largest, highest-contrast,
most-repeated thing on screen, and everything else must get out of its way.

```tsx
// before — chrome and object at the same weight
<div className="flex items-center gap-4 rounded-lg border p-4">
  <Badge>Bug</Badge><Badge>P1</Badge><Avatar /><span className="text-sm">Login fails on Safari</span>
  <span className="text-sm text-muted-foreground">Created 2 days ago</span><Button size="sm">Open</Button>
</div>

// after — the title is the object; everything else recedes
<a className="grid grid-cols-[auto_64px_1fr_auto_auto] items-center gap-2 px-3 py-2
              hover:bg-[--overlay-hover]">
  <PriorityGlyph level={1} className="size-3.5" />
  <span className="text-[13px] tabular-nums text-[--color-fg-subtle]">DRV-8852</span>
  <span className="truncate text-[13px] font-[510] text-[--color-fg]">Login fails on Safari</span>
  <span className="text-[12px] text-[--color-fg-muted]">Aug 14</span>
  <Avatar className="size-5" />
</a>
```
The title is the only thing at full foreground contrast and the only thing at weight 510. Measured
on linear.app: issue ID and issue title are both **13px** — separated only by weight (400 vs 510)
and colour (`#8a8f98` vs `#f7f8f8`). Size does nothing in a dense row; weight and colour do
everything.

### Lever 4 — one signature decision

One. Drawn from the domain, applied consistently, and the thing someone would describe if asked
what the product looks like. Candidates: a typographic choice (Railway's IBM Plex Serif
headlines), a shape rule (Linear's fully-round 32px controls at
`--radius-rounded: 9999px` while everything else is 6–8px), a colour rule, a density rule, a
domain glyph set, a persistent affordance (a command bar that is always visible, not hidden
behind ⌘K).

**Not a signature:** a gradient, a glassmorphic blur, a neon glow, an animated border. Those are
effects, and every generator produces them.

## 11.2 Three worked examples

### A — A freight-brokerage load board (Work density, dense B2B)

| Lever | Decision |
|---|---|
| Primary object | **The load.** Origin → destination, pickup window, rate. |
| Vocabulary | Load, lane, deadhead, tender, RPM, MC number, detention, POD. Not "shipment", "job", "order". |
| Real content | `CHI, IL → LAR, WY · 53' dry van · 42,100 lb · $3,890 · 2.87 RPM · pickup Wed 9/10 06:00–10:00` |
| Signature | **The lane pair is one typographic unit**: origin and destination in a monospace two-column with a fixed-width arrow, so 400 rows scan as a column of lanes and not a column of sentences. |

```tsx
<a className="grid grid-cols-[168px_92px_1fr_84px_72px] items-center gap-3 px-3 py-1.5
              text-[13px] hover:bg-[--overlay-hover]">
  {/* the signature: fixed-width lane pair, tabular, monospace */}
  <span className="font-mono text-[12px] tabular-nums text-[--color-fg]">
    <span className="inline-block w-[62px]">{load.origin}</span>
    <span className="mx-1 text-[--color-fg-subtle]">→</span>
    <span className="inline-block w-[62px]">{load.dest}</span>
  </span>
  <span className="tabular-nums text-[--color-fg-muted]">{load.miles} mi</span>
  <span className="truncate text-[--color-fg-muted]">{load.equipment} · {fmtLb(load.weight)}</span>
  <span className="text-right tabular-nums font-[510]">{fmtUsd(load.rate)}</span>
  <span className="text-right tabular-nums text-[--color-fg-muted]">{load.rpm.toFixed(2)}</span>
</a>
```
28px rows. No cards, no shadows, no radius. `tabular-nums` on every numeric column because they
stack and update (§6.6). The rate is the only thing at weight 510 because it is the only thing the
broker is deciding on.

### B — A clinical-trial enrollment tracker (Scan density, institutional)

| Lever | Decision |
|---|---|
| Primary object | **The site**, not the patient — the coordinator manages sites. |
| Vocabulary | Site, screened, enrolled, screen-failed, withdrawn, protocol deviation, IRB, arm. Never "user", "record", "status". |
| Real content | `Site 104 — Cleveland Clinic · screened 41 / enrolled 22 / SF 19 (46%) · last activity 3d ago · 2 open deviations` |
| Signature | **A screening funnel rendered as a fixed 120px stacked bar in every row**, same scale across all sites, so the shape of a bad site is visible before the numbers are read. |

```tsx
<li className="grid grid-cols-[1fr_120px_auto_auto] items-center gap-4 px-3 py-2.5">
  <div className="min-w-0">
    <div className="truncate text-[14px] font-[510]">{site.id} — {site.name}</div>
    <div className="text-[12px] text-[--color-fg-muted]">{site.pi} · {site.country}</div>
  </div>

  {/* the signature: one shared scale, so rows are comparable at a glance */}
  <div className="flex h-[6px] w-[120px] overflow-hidden rounded-[2px] bg-[--color-n-2]"
       title={`${site.enrolled} enrolled · ${site.screenFailed} screen-failed · ${site.pending} pending`}>
    <span style={{ width: pct(site.enrolled) }}    className="bg-[--color-success]" />
    <span style={{ width: pct(site.screenFailed) }} className="bg-[--color-n-5]" />
  </div>

  <span className="w-[72px] text-right text-[13px] tabular-nums">{site.enrolled}/{site.target}</span>
  {site.deviations > 0 && (
    <span className="inline-flex h-[20px] items-center gap-1 rounded-[4px] bg-[--color-warning-surface]
                     px-1.5 text-[11px] font-[510] text-[--color-warning-fg]">
      <AlertGlyph className="size-3" />{site.deviations}
    </span>
  )}
</li>
```
Colour appears exactly twice: the funnel and the deviation chip. Both are semantic. Nothing else
on the page is coloured.

### C — A vinyl-record marketplace listing (Glance density, consumer)

| Lever | Decision |
|---|---|
| Primary object | **The record** — sleeve art is the content, not decoration. |
| Vocabulary | Pressing, matrix/runout, sleeve grade, media grade, Goldmine scale (M/NM/VG+/VG), first press, repress, promo. Never "condition: good". |
| Real content | `Talk Talk — Laughing Stock · Verve 847 717-1, UK 1991 first press · Media VG+ / Sleeve VG · £310` |
| Signature | **The grade pair is a fixed two-character monospace block** (`VG+ / VG`) in every listing, at the same position, because grade is the one field buyers compare across listings — and the sleeve image is never cropped: square, full bleed, no radius, no shadow. |

```tsx
<article className="group">
  {/* the art is the object: square, uncropped, no radius, no shadow */}
  <div className="aspect-square overflow-hidden bg-[--color-n-2]">
    <img src={r.cover} alt="" className="size-full object-cover" loading="lazy" />
  </div>

  <div className="mt-2.5 flex items-baseline justify-between gap-3">
    <h3 className="truncate text-[14px] font-[510]">{r.artist} — {r.title}</h3>
    <span className="shrink-0 text-[14px] font-[510] tabular-nums">{fmtGbp(r.price)}</span>
  </div>

  <p className="mt-0.5 truncate text-[12px] text-[--color-fg-muted]">
    {r.label} {r.cat} · {r.country} {r.year} {r.pressing}
  </p>

  {/* the signature: fixed-width grade pair, same slot in every card */}
  <p className="mt-1 font-mono text-[11px] tracking-[0.02em] text-[--color-fg-muted]">
    <span className="text-[--color-fg]">M:{r.mediaGrade.padEnd(3)}</span>
    <span className="mx-1">/</span>
    <span>S:{r.sleeveGrade.padEnd(3)}</span>
  </p>
</article>
```
Here a card **is** right (§1.4): it is independently actionable, the image needs a boundary, and
the grid is reorderable by sort. But it is a *borderless* card — the sleeve provides the boundary,
so there is no `border`, no `shadow`, no `radius`, and no `p-6`.

## 11.3 The test

Cover the logo. Show the screen to someone who knows the domain. If they can name the industry in
five seconds, you have specificity. If they say "some kind of dashboard," you have none, and no
amount of radius tuning will fix it.

---

# 12. Motion cleanup

## 12.1 Delete first, in this order

1. **Every `transition-all`.** Name the properties. `transition-all` on a button animates width,
   which is why generated buttons visibly stretch when their label changes.
2. **Every hover `transform`.** `hover:scale-105`, `hover:-translate-y-1`,
   `group-hover:translate-x-1` on arrows. Measured: linear.app's nav item and primary button, and
   vercel.com's primary button, change **only** `background-color` and `color` on hover.
   `transform` is `none` in both the rest and hover states. Nothing moves.
3. **Every scroll-triggered fade-up.** `animate-in fade-in slide-in-from-bottom-8` on every
   section, staggered by index, is the most-shipped generated motion pattern in existence. It
   makes the page feel slow and it breaks `Cmd+F`.
4. **`zoom-in-95` on dialogs and popovers.** Scaling type is a bounce (§3.1, override 7).
5. **Infinite ambient animation** — floating blobs, pulsing glows, gradient shifts, animated
   borders. Zero information, permanent CPU.
6. **Durations over 300ms** on anything the user triggered. Above ~250ms a UI transition stops
   reading as responsive.
7. **Spring physics on layout.** Springs are for direct manipulation (drag, swipe, sheet). A
   spring on a dropdown is a wobble.

## 12.2 What to keep, with measured values

```css
@theme {
  /* measured on linear.app: --speed-quickTransition: .1s, --speed-regularTransition: .25s,
     --speed-highlightFadeOut: .15s.  vercel.com's primary button: .15s.  */
  --duration-instant: 80ms;    /* hover/active feedback                 */
  --duration-fast:    120ms;   /* menu open, tooltip, checkbox          */
  --duration-base:    180ms;   /* dialog, sheet, drawer                 */
  --duration-slow:    280ms;   /* page/route transition — the ceiling   */

  /* Linear's --ease-out-quad. Snappier than Tailwind's cubic-bezier(0,0,.2,1). */
  --ease-out:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1.000);   /* ease-in-out-cubic */
}
```
Keep exactly four kinds of motion:
- **State feedback** — background/colour/opacity on hover, focus, active. 80–120ms.
- **Enter/exit of a layer** — fade + a 4–8px positional offset. 120–180ms. Never scale.
- **Layout change the user caused** — an item removed from a list, a panel widening. 180ms.
- **Progress** — spinners, indeterminate bars, streaming text. These are information.

```tsx
// the correct dialog entrance
"data-[state=open]:animate-in data-[state=open]:fade-in-0
 data-[state=open]:slide-in-from-bottom-1
 data-[state=closed]:animate-out data-[state=closed]:fade-out-0
 duration-150 ease-[--ease-out]"
```

## 12.3 Reduced motion, non-negotiable

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Note this kills animation *duration*, not the end state — elements still arrive where they belong.

## 12.4 When motion is right

- **Direct manipulation.** Drag, swipe, pull-to-refresh, resize. Here springs are correct and
  `transform` is the whole point.
- **Spatial navigation.** A drill-in/drill-out that maintains a mental model — push from the right
  going in, from the left coming back.
- **Onboarding or a product tour**, once, where the animation is the explanation.
- **A brand moment** on a marketing hero, one per page, that the user did not have to wait for.
- **Charts entering.** A 400ms axis-anchored grow on first paint reads the data direction. But
  never re-animate on filter change.

---

# Appendix A — Framework-agnostic equivalents

Everything above is CSS custom properties plus class strings. The translation is mechanical.

| Tailwind v4 idiom | Plain CSS | CSS-in-JS / vanilla-extract | SwiftUI / Compose analogue |
|---|---|---|---|
| `@theme { --color-x: … }` | `:root { --color-x: … }` | theme contract object | `Color` / design-token enum |
| `bg-[--color-surface]` | `background: var(--color-surface)` | `background: vars.surface` | `.background(Color.surface)` |
| `text-[13px] leading-5` | `font-size: 13px; line-height: 20px` | same | `.font(.system(size: 13))` |
| `divide-y divide-[--border]` | `& > * + * { border-top: 1px solid var(--border) }` | same | `Divider()` between rows |
| `hover:bg-[--overlay-hover]` | `:hover { background: … }` | same | `.onHover` → background only |
| `focus-visible:outline-2 …` | `:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px }` | same | platform focus ring — do not override |
| `shadow-[--shadow-e2]` | `box-shadow: var(--shadow-e2)` | same | `.shadow(radius:x:y:)`, ring → `.border` |
| `tabular-nums` | `font-variant-numeric: tabular-nums` | same | `.monospacedDigit()` |
| `truncate` | `overflow:hidden; text-overflow:ellipsis; white-space:nowrap` | same | `.lineLimit(1).truncationMode(.tail)` |
| `-mx-6 px-6` full-bleed band | `margin-inline: -24px; padding-inline: 24px` | same | full-width `ZStack` background |
| `text-balance` | `text-wrap: balance` | same | manual line break |

The three sections that are genuinely Tailwind-specific are §3.1 (shadcn overrides), §3.2
(Tailwind's own defaults) and §3.3 (MUI). Everything else is CSS.

---

# Appendix B — Measured reference values

All read from live products or shipped packages, 2026-09. Use these as targets, not as things to
copy wholesale.

## Controls

| | Height | Type | Radius | Padding | Hover |
|---|---|---|---|---|---|
| **Linear** primary button | 32px | 13px/32 w510 | 9999px | `0 12px` | bg `#e5e5e6`→`#fff`, 160ms |
| **Linear** nav link | 32px | 13px/19.5 w400 `#8a8f98` | 9999px | `0 12px` | bg → `rgba(255,255,255,.08)`, fg → `#f7f8f8`, 100ms |
| **Vercel** primary button | 32px | 14px w500 | 6px | — | bg `#171717`→`#383838`, 150ms `cubic-bezier(.4,0,.2,1)` |
| **Attio** nav link | 36px | 15px/22 w500 ls −0.16px | 10px | `0 12px` | — |
| **Notion** primary button | 38px | 16px/24 w500 | 8px | `6px 15px` | — |
| **Raycast** button | 36px | 14px/16 w500 ls +0.2px | 8px | `8px 12px` | — |
| **MUI** contained (default) | 37px | 14px/24.5 w500 ls +0.4px | 4px | `6px 16px` | 3-layer shadow |
| **shadcn** button (default) | 36px | 14px/20 w500 | 8px | `0 16px` | `bg-primary/90` |
| **shadcn** sidebar item | 32px | 14px/20 w400 | 8px | `8px` | `bg-accent` |
| **shadcn** badge | 22px | 12px/16 w500 | 9999px | `2px 8px` | — |

## Type

| | Display | Body | UI | Notes |
|---|---|---|---|---|
| **Linear** | 64px/64 w510 ls −0.022em | 15px | 13px | scale 11/12/13/15/18/20/24/36; weights 300/400/510/590/680 |
| **Notion** | 96px/100 w600 ls −0.048em | 16px/24 | 16px | — |
| **Attio** | 64px/60.8 w600 ls −0.02em | 14px/20 w500 | 14–15px | eyebrow 12px w600 ls +0.06em, tabular |
| **Stripe** guides | 32px w700 | **16px/26** (1.625) | 14px | inline code 14.4px/26, `#f4f7fa`, r6px |
| **Stripe** API ref | 24px/32 w700 | **14px/22.4** (1.6) | 14px | same product, different reader |
| **Railway** | 54px/60.5 w500 ls −0.036em, IBM Plex Serif | 20px/28 | 14px/20 w500 | serif display on devtools |
| **Mercury** | 49.3/54.3 w480 | 18px/24.3 w360 | 16px/16 w420 | custom face, non-integer weights |
| **GitHub** | — | 14px/21 w400 | 14px | Mona Sans VF |
| **Radix Themes** | 60px | 16px/24 | 14px/20 | ls +0.005em @12px → −0.05em @60px |

## Neutrals

```
Linear dark      #08090a #0f1011 #141516 #191a1b | #23252a #34343a #3e3e44
                 #f7f8f8 #d0d6e0 #8a8f98 #62666d           (ΔL 3.3 / 2.3 / 2.2 between levels)
Vercel light     hsl(0 0% 95/92/90/92/79/66/56/49/30/9)    (pure neutral, chroma 0)
Radix gray 1–12  #fcfcfc … #bbbbbb | #8d8d8d #838383 #646464 #202020
Stripe sail      #f7fafc → #1a1f36, chroma 0.004 → 0.044, hue 236 → 273
GitHub           fg #1f2328 · muted #59636e · border #d1d9e0 · canvas-subtle #f6f8fa
shadcn neutral   1.0 / 0.97 / 0.922 / 0.556 / 0.145 — five steps, two 37-point cliffs
```

## Elevation

```
Vercel  menu    0 0 0 1px #00000014, 0 1px 1px #00000005, 0 4px 8px -4px #0000000a,
                0 16px 24px -8px #0000000f
Vercel  modal   0 0 0 1px #00000014, 0 1px 1px #00000005, 0 8px 16px -4px #0000000a,
                0 24px 32px -8px #0000000f
Radix   2–6     all begin 0 0 0 1px color-mix(in oklab, #0000330f, #f0f0f3 25%)
Stripe  hover   0 0 0 1px rgba(50,50,93,.01), 0 7px 14px 0 rgba(50,50,93,.1),
                0 3px 6px 0 rgba(0,0,0,.02)
Linear  low/med/high  0 2px 4px #0000001a / 0 4px 24px #0003 / 0 7px 32px #00000059
Tailwind lg (default) 0 10px 15px -3px rgb(0 0 0/.1), 0 4px 6px -4px rgb(0 0 0/.1)  ← no ring
MUI     elevation 1   0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14),
                      0 1px 5px 0 rgba(0,0,0,.12)                                   ← 20% top layer
```

## Motion

```
Linear   --speed-quickTransition .1s · --speed-regularTransition .25s
         --speed-highlightFadeOut .15s
         --ease-out-quad cubic-bezier(.25,.46,.45,.94)
         --ease-in-out-cubic cubic-bezier(.645,.045,.355,1)
Vercel   primary button .15s cubic-bezier(.4,0,.2,1)
Tailwind --ease-out cubic-bezier(0,0,.2,1) · --animate-pulse 2s cubic-bezier(.4,0,.6,1)
shadcn   Dialog duration-200 + zoom-in-95 / zoom-out-95
```

## Scales

```
Radix space   4 8 12 16 24 32 40 48 64
Radix radius  3 4 6 8 12 16 (+ thumb 9999)
Linear radius 4 6 8 12 16 24 32 (+ rounded 9999, circle 50%)
Vercel radius --geist-radius 6 · marketing 8 · popover-row 6
shadcn radius base 10 → .6× .8× 1× 1.4× 1.8× = 6 8 10 14 18
Tailwind      sm 4 · md 6 · lg 8 · xl 12 · 2xl 16 · 3xl 24
Linear page   --page-max-width 1024 · --page-inset 32 · --header-height 72
```

---

# Where to go next

- The tell you are trying to fix is not in here → [`vibecode-taxonomy.md`](vibecode-taxonomy.md)
- You need to score the result → [`vibecode-rubric.md`](vibecode-rubric.md), target ≤2
- You are not sure what you are looking at → [`visual-critique-method.md`](visual-critique-method.md)
- Density calibration in depth → [`../craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md)
- Token system construction → [`../system/3-tokens.md`](../system/3-tokens.md)
- Per-archetype targets → [`../archetypes/`](../archetypes/)

**The order that matters:** structure → density → colour → type → surface → copy → states →
specificity. An agent that fixes the radius before the layout has spent its budget on the least
visible thing in the list.
