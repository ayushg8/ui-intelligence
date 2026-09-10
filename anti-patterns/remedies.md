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
