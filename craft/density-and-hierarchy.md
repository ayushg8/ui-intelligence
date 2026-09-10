# Information density and hierarchy

**Measured 2026-09.** Every number in this file was read out of a live product with Playwright —
computed styles, `getBoundingClientRect`, and the CSS custom properties the product ships — at a
1440×900 viewport unless stated. Contrast ratios were computed with `tools/contrast.mjs` from the
measured colors. Values are exact unless marked *approx*. Nothing here is recalled from memory.

This is the single most-botched dimension in AI-generated UI. Not color, not typography, not
motion — **scale**. Generated interfaces are usually a correct layout at the wrong size: roughly
30–40% too large and too airy for what the user is actually doing. The components are rarely the
problem. The **allocation** is.

Here is the finding that should reframe the whole topic. Three real interfaces, same viewport
(1440×900), same job (look at a list of records):

| Surface | Row height | Chrome above first row | Data rows visible |
|---|---|---|---|
| **Grist** spreadsheet (`templates.getgrist.com/doc/lightweight-crm`) | **23px** | 127px | **33** |
| **GitHub** repo file list (`github.com/vercel/next.js`) | **41px** | 307px | **14** |
| **shadcn/ui `dashboard-01`** (the canonical AI-generated dashboard) | **53px** | **825px** | **1.4** |

All three measured, not estimated. The shadcn dashboard puts its first data row at y=825 on a
900px-tall viewport. You scroll before you see one record. That is not a styling problem you fix
with a color token; it is 800 pixels spent on chrome before the product starts.

---

## If you only apply five things

1. **Compute the fold before you write CSS.** `rows_visible = (viewport_height − chrome_above_first_row) / row_height`.
   Write the target number in a comment. If a work-all-day surface shows fewer than 15 rows at
   1440×900, you have already failed and no amount of polish recovers it.
2. **Row height is set by the tallest control inside the row, not by the text.** Measured on
   shadcn `dashboard-01`: cells have `p-2` (8px), the text is 14px/20 — but one cell contains a
   36px `<Button>`, so the row is 36 + 8 + 8 + 1px border = **53px**. Replace that button with a
   plain link and the same row is 20 + 16 + 1 = **37px**. Audit rows for nested controls before you
   touch padding.
3. **UI text is 14px. Once.** Measured: GitHub uses 14px/21 for **296** of the text elements on a
   repo page; Attio's product surface uses 14px/20 w500 for **141**; Grafana 14px/22 for 35;
   Linear drops to 13px/19.5; Grist to 13px/18. `text-base` (16px) is a *reading* size — Notion's
   document body is 16px/24 in a 720px column, and that is correct *for a document*. Drop to 14 once
   and take every further gain from padding, not from shrinking type again.
4. **Hierarchy comes from position, then weight, then color. Size is fourth and decoration is not
   on the list.** Inside a GitHub file row, the filename, the commit message and the date are all
   14px/21 weight 400. The only difference is color: `#1F2328` (15.80:1) vs `#59636E` (6.11:1).
   Three ranks, one size, one weight, zero badges.
5. **One filled control per view, at the same height as its neighbors.** GitHub's green `Code`
   button is 32px, `padding: 0 12px`, `border-radius: 6px`, `font-weight: 400` — byte-for-byte the
   same geometry as the grey branch picker beside it. It wins by being the only saturated thing on
   screen. Meanwhile `Star`/`Fork`/`Notifications` are *smaller* (28px, 12px text). Bigger is not
   more primary.

---

## The measured reference table

### Rows, and what they cost

| Product / surface | Row height | Pitch | Text | Padding | Divider | Notes |
|---|---|---|---|---|---|---|
| **Grist** grid row (light) | **23px** | 23px | 13px/18 | — | full 1px cell grid | Spreadsheet convention; column header 11px/13.2 |
| **Linear** issue row (dark, app shell on linear.app) | **40px** | 40px | 13px/19.5, ls −0.13px | `0 28px 0 36px` | **none** | ID `#8A8F98` w400; first row 44px below panel top |
| **Linear** sidebar item | **28px** | 30px | 13px/19.5 | — | none | 2px gap between items |
| **Attio** record row (light, product mock on attio.com) | **36px** | 36px | 14px/20 **w500**, ls −0.14px | `0 4px 0 16px`, gap 8px | 1px `#EEEFF1` (**1.15:1**) | Row text is medium, not regular |
| **Grafana** dashboard list row (dark) | **36px** | 36px | 14px/22, ls +0.15px | gap 8px | none | Nav item 32px |
| **GitHub** repo file row (light) | **41px** | 41px | 14px/21 w400 | `0 0 0 16px` per cell | 1px `#D1D9E0` (**1.43:1**) | 3 columns; date right-aligned |
| **Notion** page-link block (real renderer, notion.site) | 40px | — | 16px/20.8 w500 | — | none | 720px content column; title 40px/48 w700 |
| **shadcn `dashboard-01`** table row | **53px** | 53px | 14px/20 w400 | `8px` all sides | 1px per row | 36px `<Button>` inside a cell sets the height |
| **shadcn `dashboard-01`** table header | 40px | — | 14px/20 | — | 1px | |

**Read this table as a ladder, not a menu.** 23 → 28 → 36 → 40 → 41 → 53. Everything a professional
built lands between 23 and 41. The generated one is above all of them.

### Type scale actually in use, per screen

Counted by walking every element with a direct text node and bucketing by
`fontSize/lineHeight weight`:

| Surface | Sizes in use (by frequency) | Distinct sizes |
|---|---|---|
| **Grist** | 13px (57+25+11+6), 11px (11+3), 10px (1), 22px (1) | **4**, and two do the work |
| **Grafana** | 14px/22 (35), 12px/18 (4), 16px/22 (1), 28px/32 (1) | **4** |
| **GitHub** repo page | 14px/21 (296), 16px/24 (66+20+16), 12px/18 (37+14+7), 32px, 24px | **5** |
| **Attio** product mock | 14px/20 (141+42+36), 12px/16 (61), 10px/15 (25), 15px (20), 9px (9) | **5** in-product |
| **Linear** in-product | 13px/19.5 (rows, nav), 12px/14 (labels, meta), 14px/32 (panel titles) | **3** |
| **shadcn `dashboard-01`** | 14px/20 (34+32), 12px/16 (25+16), 30px/36 (4), 16px (3), 14px/17.5, 12px/18 | **6** |

Dense products run **three or four** type sizes on a working screen. Note that Attio ships **10px
and 9px** labels in production and Linear ships 12px sidebar section headers — both below the "never
go under 12px" rule of thumb, deliberately, for non-essential metadata.

### Text hierarchy: what the levels actually are

| Product | L1 (primary) | L2 (secondary) | L3 (tertiary / label) | Mechanism |
|---|---|---|---|---|
| **GitHub** (on `#FFFFFF`) | `#1F2328` — **15.80:1** | `#59636E` — **6.11:1** | (none; weight 500/600 instead) | Two inks, one size |
| **Linear** (on `#08090A`) | `#F7F8F8` — 18.73:1 | `#D0D6E0` — 13.64:1 | `#8A8F98` — **6.13:1**; sidebar group label `#62666D` — **3.45:1** | Four inks, one size, weights 400/510/590 |
| **Grafana** (on `#111217`) | `#CCCCDC` — 11.79:1 | *same color at 0.65 alpha* — **5.54:1** | 12px/18 | One ink, two alphas |
| **Attio** (light) | `#242629` — 15.17:1 | `rgba(0,0,0,0.55)` | `rgba(0,0,0,0.4)` | One ink, three alphas |
| **shadcn** default | near-black | `--muted-foreground` ≈ `#767676` — **4.54:1** | same token reused everywhere | One muted token, over-applied |

**The convergence is exact and worth memorizing: secondary text lands at 5.5–6.2:1.** GitHub 6.11,
Linear 6.13, Grafana 5.54. Not 3:1 (illegible), not 10:1 (no hierarchy). shadcn's 4.54:1 is the
low end of acceptable; `text-gray-400` (`#9CA3AF`) is **2.54:1** and is simply broken.

Note also that Linear's *lowest* level — the "Workspace" / "Favorites" sidebar group headings at
12px/14 w510 `#62666D`, **3.45:1** — fails AA on purpose. That is defensible only because the label
is redundant with position and carries no data. Never do it to content.

### Controls: the 32px consensus

| Source | Control | Height | Text | Padding | Radius | Gap |
|---|---|---|---|---|---|---|
| **GitHub** `Code` (primary) | button | **32px** | 14px/21 **w400** | `0 12px` | 6px | — |
| **GitHub** branch picker (secondary) | button | **32px** | 14px/21 w400 | `0 12px` | 6px | — |
| **GitHub** `Star` / `Fork` / `Notifications` | button | **28px** | **12px**/20 w500 | `3px 12px` | 6px | — |
| **Primer** default button | button | 32px | 14px/21 w500 | `0 12px` | 6px | 8px |
| **Atlassian** default button | button | 32px | 14px/20 w500 | `6px 12px` | 6px | 6px |
| **Grafana** toolbar button | button | 32px | 14px/30 w500 | `0 8px` | 6px | — |
| **Grafana** input | input | 32px | 14px/22 | `0 24px 0 28px` | 6px | — |
| **shadcn** default button | button | 32px | 14px/20 w500 | `0 10px` | 8px | 6px |
| **shadcn** sidebar menu button | button | 32px | 14px/20 | `8px` | 8px | 8px |
| **Attio** button | button | 36px | 14px/20 w500 | `0 12px` | 10px | 6px |
| **Attio** input | input | 40px | 14px/20 w500 | `10px 13px` | 10px | — |
| **Linear** nav item | button | 28px | 13px w510 | `0 7px` | 8px | 8px |
| **Grist** menu item | li | 32px | 13px | `8px 24px` | 0 | — |

Five independent teams landed on **32px** for a desktop control. `h-10` (40px) and `h-11` (44px)
are touch sizes that leaked into pointer UI. Radius tracks height: 6px at 28–32px, 8px at 32px,
10px at 36–40px. Nobody puts a 12px radius on a 32px control.

### Borders and dividers: measured contrast against their own background

| Token | Value | Contrast on white | Verdict |
|---|---|---|---|
| Attio row divider | `#EEEFF1` | **1.15:1** | Barely visible; that is the point |
| shadcn `--border` | `#E5E5E5` | 1.26:1 | Fine as a hairline, wrong as structure |
| GitHub row divider | `#D1D9E0` | 1.43:1 | The heaviest divider measured |
| GitHub button surface | `#F6F8FA` | 1.06:1 | A tint, not a border |

Real dividers are 1.1–1.45:1. A border you can clearly *see* at arm's length is already too heavy
for a dense list, and Linear ships **zero** dividers on its 40px issue rows.

### The AI default, measured in full

`ui.shadcn.com/view/new-york-v4/dashboard-01` — shadcn's own reference dashboard, and the shape that
generated dashboards converge on. Not a strawman; the actual reference implementation:

| Element | Measured |
|---|---|
| KPI card | **204px** tall × 262px wide, `padding: 24px 0`, internal `gap: 24px`, `border-radius: 14px`, 1px border |
| KPI card label | 14px/20, muted |
| KPI card value | 30px/36 w600, `tabular-nums` |
| KPI card badge | 22px tall, 12px/16 w500, `padding: 2px 8px` |
| KPI card footer | two lines, 14px/20 + 14px/20 muted |
| Chart card | **392px** tall |
| Table header row | 40px |
| Table data row | **53px** (36px button + 8px + 8px + 1px) |
| Cell padding | 8px all sides |
| Grid gap between cards | 24px |
| Page container padding | `24px 0` |
| First data row `top` | **825px** |
| Data rows visible at 900px | **1.4** |

The primitives are fine. The sidebar rows are 32px. The buttons are 32px. **The failure is
allocation**: 204px per number, 392px for one chart, 24px between everything, and a 36px control
dropped into a table cell.

---

## The correction table

Apply directly. "AI default" is what generated code produces when nobody sets a target; the two
target columns are the measured ranges above.

| Element | AI default | → Comfortable (scan) | → Compact (work) |
|---|---|---|---|
| Table / list row height | 48–56px | **40px** | **32px** |
| Row text | 16px/24 | **14px/20** | **13px/18–19.5** |
| Cell padding (vertical) | 16px (`py-4`) | **10px** | **6–8px** |
| Cell padding (horizontal) | 24px | **16px** | **12px** |
| Controls nested in a cell | 36px `<Button>` | **plain text/link**, or 24px ghost on row hover | same |
| Sidebar / nav item | 44–48px | **32px** | **28px** |
| Button height | 40–44px (`h-10`/`h-11`) | **32px** | **28px** |
| Input height | 40–44px | **32px** | **28px** |
| Toolbar / page header | 64–80px | **48px** | **40px** |
| Card / panel padding | 24px (`p-6`) | **16px** | **12px** |
| Gap *within* a group | 16–24px (`gap-4`/`gap-6`) | **8px** | **6px** |
| Gap *between* groups | 32px | **16px** | **12px** |
| Gap between page sections | 48–64px | **32px** | **24px** |
| Page gutter | 32–48px | **24px** | **16px** |
| Border radius on a ≤40px control | 12px (`rounded-xl`) | **8px** | **6px** |
| Row dividers | 1px on every row | 1px between **groups** | **none** |
| Secondary text | `text-gray-400` (2.54:1) | **5.5–6.2:1** (`#59636E` / `#8A8F98`) | same |
| Section label | 20–24px semibold | 12–13px w500–600, muted | 12px w510, muted, **no uppercase needed** |
| KPI block | 4 × 204px cards in a grid | **56px strip** of label/value pairs | **40px strip** |
| Chart height | 392px | 200–240px | 140–180px |
| Page greeting ("Welcome back!") | 80–180px block | **delete**; title goes inline in the toolbar | delete |

Applying the Compact column to `dashboard-01` — 32px rows, a 56px KPI strip, a 200px chart, no
greeting — puts the first data row at roughly y=425 (48 toolbar + 56 KPI strip + 200 chart + 40 tabs
+ 32 table header + three 16px gaps) and takes visible rows from 1.4 to about 15. Same components,
same data, ten times the information.

---

## Choosing the density target

Do not start from a component library's defaults. Start from one sentence:

> A **[role]** opens this **[frequency]** to **[task]**, and works through **[N]** items.

| Usage pattern | Session | Row height | UI text | Rows at 900px | Measured examples |
|---|---|---|---|---|---|
| **Glance** | <10s, ≤1×/day | 48–64px | 15–16px | 6–12 | status pages, receipts, notification lists, onboarding |
| **Scan** | 10–90s, several ×/day | 36–44px | 14px | 14–20 | GitHub file list (41px, 14 visible), Grafana list (36px), Attio records (36px) |
| **Work** | hours, hundreds of ops | 23–40px | 13–14px | 20–33 | Linear issues (40px), Grist grid (23px, 33 visible) |

Two corollaries people get backwards:

- **Density is a function of N, not of taste.** Five items in 28px rows look cramped and cheap.
  Below ~10 items, use comfortable density. Above ~50, every pixel of row height costs a scroll.
- **Density is per-surface, not per-product.** Notion runs 16px/24 body text in a 720px column
  because the task on that surface is reading. The same product is dense elsewhere. Picking one body
  size for a whole product is the mistake; the inconsistency is not.

**Run the fold test instead of guessing:**

```
usable  = viewport_height − (top chrome + toolbar + table header)
visible = usable / row_height
```

Then compare against the measured column above. If you are at 1.4, you have a chrome problem, not
a row problem.

---

## The levers, in order of impact

Apply top-down. Each lever is roughly an order of magnitude less powerful than the one above it, and
people almost always reach for lever 6 first.

### 1. Delete chrome above the fold (worth 100–500px)

This is the whole ballgame and nothing else comes close. On `dashboard-01`, 825px of the 900px
viewport is chrome. The specific offenders, measured:

- A 4-card KPI grid: **204px** + 24px gap = 228px to show four numbers.
- A chart card: **392px**.
- A greeting or "Welcome back" block: 80–180px.
- A tab strip plus a right-side button cluster: ~60px.

A 56px horizontal strip of `label / value / delta` triples carries the same four numbers as the
228px grid. A 200px chart reads the same as a 392px chart for a trend. The page title belongs
*inline* in a 40–48px toolbar next to the actions — which shadcn actually gets right (its `h1` is
16px/24 w500 in the toolbar), and which generated variants usually undo.

### 2. Remove controls from rows (worth 15–20px per row, compounding)

The measured mechanism:

```
row_height = tallest_inline_child + padding_top + padding_bottom + border
```

`dashboard-01`: 36 + 8 + 8 + 1 = **53px**. The 36px child is a `<Button>` in the "reviewer" cell.
Nothing about the data needs it. Three fixes, in order of preference:

1. **Render it as text.** A reviewer name is a name. 20px line box → row = 37px.
2. **Reveal it on row hover** as a 24px ghost icon button, absolutely positioned so it does not
   participate in height. This is what Linear, GitHub and Attio all do.
3. **Move it into a right-aligned `⋯` menu**, one 24px trigger for all row actions.

Check every cell for: buttons, selects, badges taller than the line box, avatars over 20px, and
two-line text. Any one of them silently sets your row height.

### 3. Vertical padding (worth 8–16px per row)

Once nothing tall is inside, padding is the dial. Measured dense products run **6–10px** vertical.
`py-4` (16px) is the single most common cause of a 52px row that should be 36px. Horizontal padding
is nearly free — it costs no rows — so spend there instead: Linear's issue row is 40px tall with
**36px** of left padding.

### 4. Line-height (worth 3–6px per row)

Multi-line content only. Prose wants 1.5–1.6. UI rows want 1.4–1.5: GitHub 14/21 = 1.50, Attio
14/20 = 1.43, Linear 13/19.5 = 1.50, Grist 13/18 = 1.38. Below ~1.35 on wrapping text you lose
scannability; on a single-line row the line-height barely matters because the row height is set by
padding.

### 5. Font size (worth 2–4px per row — and use it exactly once)

16 → 14 is the one drop that is always right for UI text. 14 → 13 is a real option for work-all-day
surfaces (Linear, Grist). 13 → 12 for body content is where it stops being density and starts being
a legibility bug — 12px survives only for metadata, labels and chips, which is exactly how Linear
and Attio use it.

### 6. Gap (worth 8–16px per group)

The mistake is one uniform gap. Ship exactly three: **8 / 16 / 32** (comfortable) or **6 / 12 / 24**
(compact). `space-y-6` everywhere is what makes generated pages feel like a stack of unrelated
slabs — with equal gaps, nothing groups.

### 7. Borders and chrome (worth 1–2px each, but large perceptually)

A 1px divider on every row of a 30-row list adds 30px and, more importantly, adds 30 horizontal
lines competing with your content. Single-line rows ≤40px need **zero** dividers — alignment and
row-hover already delimit them. Reserve 1px for boundaries between *groups*, and keep it at
1.1–1.45:1 contrast.

### 8. Radius and shadow (worth 0px, but they read as "big")

A 12px radius on a 32px control makes it read as a pill and visually inflates the row. Keep radius
≤ ⅓ of height. Shadows on list items are the single fastest way to make a dense surface feel like a
consumer app; the measured products use zero shadow on rows.

---

## Comfortable and compact modes

**Ship one mode by default and set it from the usage pattern.** Ship two only when you have a real
bimodal audience: an admin who lives in the tool eight hours a day *and* an occasional user who
opens it monthly. Gmail (Default/Comfortable/Compact) and Jira both ship a density control for exactly this reason.

If you ship two, implement it as **one variable, three consumers**:

```css
:root { --row-h: 40px; --row-px: 16px; --ui-text: 14px; --ui-lh: 20px; }
[data-density="compact"] { --row-h: 32px; --row-px: 12px; --ui-text: 13px; --ui-lh: 18px; }
```

Rules that keep it from becoming a mess:

- **Compact changes row height, padding and text size. It never changes the layout, the column set,
  or which controls exist.** If compact hides a column, it is not a density mode, it is a different
  view, and users will lose track of what they are looking at.
- **Do not scale everything.** Icon sizes stay fixed (16px), radius stays fixed, borders stay 1px.
  Proportional scaling looks like a browser zoom, not a density mode.
- **Persist per-user, not per-device.** Someone who chose compact chose it about their eyes and their
  job, not about that laptop.
- **Two modes, never three.** A third option is a support burden that nobody picks.

---

## Scannability

### The F-pattern is real but almost always misapplied

The eye-tracking result is about **unstructured prose on content pages** — users scan the first
lines, then the left edge. It says almost nothing about a structured table, where the eye follows
whatever alignment and contrast you built. In a dense grid the reader is doing **column-wise
comparison**, not F-shaped reading. Design for the column, not the F.

What actually drives scannability in dense UI, in order:

1. **A hard left edge.** Every row's first character starts at the same x. This is the strongest
   scanning aid that exists and it is free. GitHub's file list: filename, message and date each have
   their own left edge, all consistent down 70 rows.
2. **Right-aligned numerics with tabular figures.** Ones under ones. `font-variant-numeric:
   tabular-nums`, always, for anything a reader compares. shadcn applies it to its KPI value, which
   is the one place it matters most and the one place generated code usually skips it.
3. **A short, high-contrast first column.** The eye anchors on the leftmost dark thing. Linear puts
   a 13px `#8A8F98` issue ID there — deliberately *quiet*, so the title beside it wins.
4. **Nothing moving.** If hover shifts, grows, or shadows a row, sweeping down 30 rows becomes
   twitchy. Background change only.

### Left-aligned labels beat centered in dense UI

Centered labels give each row a different left edge, so the reader re-acquires the start of the text
on every line. In a 30-row list that is 30 extra micro-fixations. Left-align labels; right-align
numbers; center only single-glyph things (a status dot, an icon-only column) where there is no text
edge to lose.

The exception you will actually meet: **spreadsheets center column headers** — Grist does — because
a header labels a whole column rather than starting a line of text, and the column body may be
right-aligned numbers. That is a convention, not a contradiction.

### Truncate, do not wrap

In a fixed-height row, wrapping is not an option — it either clips or blows up the row. Truncate
with `text-overflow: ellipsis` and give the full value in a `title`. Truncate the **middle** for
paths and IDs (`app/…/route.ts`), the **end** for prose.

---

## Hierarchy without decoration

Use these in order. Exhaust each before moving to the next.

**1. Position.** Reading order is hierarchy. The first thing in the row, the first row in the group,
the top-left of the screen. Position is free, it survives dark mode, colorblindness, and print, and
it is the only signal that works before the reader has parsed anything. Most "we need a badge here"
problems are actually "this is in the wrong place" problems.

**2. Weight.** Measured: Linear moves 400 → 510 → 590. Attio sets its entire row text at **500** and
uses 400 only for de-emphasized rows. GitHub uses 400 → 600. One weight step is a large perceptual
jump at 13–14px and costs zero pixels. Variable fonts make 510 and 590 real values, not rounding.

**3. Color (lightness, not hue).** Two or three inks: ~15:1, ~6:1, and — if you truly need a third —
~3.5:1 for non-essential labels. Grafana and Attio implement this as **one ink at several alphas**,
which is the most maintainable version and automatically composites correctly over any surface.

**4. Size.** Fourth, not first. Inside a 40px row, size does almost nothing: Linear's issue ID and
issue title are both 13px. Size is for *between* levels of the page (28px page title vs 14px row),
not within a row.

**5. Space.** Grouping by proximity. A 16px gap between groups and 4px within them structures a list
with no lines at all.

**Not on the list: color hue, badges, borders, cards, shadows, icons-as-decoration, uppercase.**

### Why AI reaches for color and decoration first

Because decoration is *legible in source code* and hierarchy is not. `<Badge variant="success">` is
visibly "doing design work" in a diff; `font-weight: 510` is not. Every enum value gets its own
colored pill, every group gets its own card, every non-title element gets `text-muted-foreground`,
and the result is a screen where six accent colors compete and nothing is emphasized because
everything is. The fix is a rule: **hue encodes state that changes the user's behavior. Nothing
else.** Everything else is lightness.

### The 3-level rule

**Three levels of hierarchy per surface. Not four.**

- L1 — what this is (page title, row title)
- L2 — what it is about (supporting text, secondary column)
- L3 — metadata (timestamp, ID, count, label)

Real products obey this. Linear's issue row: title (L1, `#D0D6E0`), ID (L2/L3, `#8A8F98`), status
icon (L3). GitHub's file row: name (L1, `#1F2328`), commit message (L2, `#59636E`), date (L2,
`#59636E` — deliberately the *same* level, because the date is not more important than the message).

When you need a fourth level, you actually need a different screen: push the detail into a hover
card, a side panel, or a drill-down. Four visual ranks in one view is indistinguishable from zero.

Corollary: **if everything is `text-muted-foreground`, nothing is secondary.** shadcn's default
palette makes this easy to do accidentally — one muted token, applied to every non-title element.
Count your L2s. If more than about a third of the text on screen is muted, the muted level has
become the body level and your L1 is doing no work.

---

## Making the primary action obvious without shouting

The measured pattern on GitHub's repo page:

| Control | Height | Text | Fill | Border |
|---|---|---|---|---|
| `Code` (primary) | 32px | 14px/21 **w400** | `#1F883D` (4.52:1 vs white) | `rgba(31,35,40,0.15)` |
| `canary` branch picker | 32px | 14px/21 w400 | `#F6F8FA` (1.06:1) | `#D1D9E0` |
| `Star` / `Fork` | **28px** | **12px**/20 w500 | `#F6F8FA` | `#D1D9E0` |

Three facts fall out:

1. **Same height as its neighbor.** Primary and secondary are both 32px. A control that is taller
   than the row it sits in breaks the toolbar's baseline and reads as a mistake, not as importance.
2. **Not bolder.** The primary is weight 400. Fill is the entire signal.
3. **Repo-level actions are smaller than page-level actions.** Star and Fork are 28px with 12px
   text, because they are ambient, not the thing you came to do.

Rules:

- **One filled control per view.** If two things are filled, neither is primary. If you genuinely
  have two equally-weighted actions, that is a decision the user has to make, and it belongs in a
  dialog with its own primary.
- **Everything else is outline, ghost, or plain text**, in that order of decreasing prominence.
- **Position beats treatment.** Bottom-right of a dialog, right end of a toolbar, end of a form. A
  correctly placed ghost button beats a badly placed filled one.
- **Never signal primary with size, radius, shadow, gradient, or animation.** All five read as a
  marketing CTA dropped into an app.

---

## The quiet-action problem

Destructive actions must be **findable and not prominent**. These are not in tension; they are
solved by *placement*, not by *color*.

The measured case: Grist's row context menu. `Delete row ⌘Backspace` is a **32px** item, **13px**
text, **`rgb(0,0,0)`** — the same size, same weight and the same color as `Insert row above`.
No red, no icon, no separator drama. It is discoverable because it is where every other row action
is, and it is quiet because it looks like every other row action.

The pattern the best products converge on:

1. **Put it in the overflow menu (`⋯`), last, below a separator.** Not in the toolbar. Not in the
   row. The `⋯` trigger is a 24px ghost icon button revealed on row hover.
2. **Color the menu item red only at the last level, if at all.** Many products (Grist, Linear,
   Notion) don't, because a red item in a grey menu is a target that attracts the cursor — the
   opposite of what you want. If you do use red, use it on the *label text*, never as a fill.
3. **Never render a filled red button in a resting view.** A red fill is a very loud, very
   attractive click target for the action you least want misclicked. Reserve filled red for the
   confirm button *inside* the confirmation dialog, where it is the intended target.
4. **Show the keyboard shortcut next to it** (Grist shows `⌘Backspace`). Power users learn the
   shortcut and stop opening the menu; everyone else never sees it.
5. **Guard proportionally to reversibility, not to scariness.** Undo-able? No dialog at all — do it
   and show a 5-second undo toast. Irreversible and cheap to redo? One dialog. Irreversible and
   catastrophic (delete a workspace, revoke a key)? Type-the-name confirmation, and put the whole
   block in a bordered "danger zone" section at the *bottom* of a settings page — bottom because it
   is the part of the page nobody lands on by accident.

The anti-pattern to name: a red `Delete` button sitting in the row, at the same weight as `Edit`,
visible on all 30 rows at rest. It is 30 loud targets for the one action you want to be hard to hit,
and it costs you a column.

---

## Progressive disclosure

Hiding is not free. Every hidden thing costs a **click plus a memory** — the user must know it
exists. Budget it.

**Hide, safely:**

- **Row actions** behind hover + `⋯`. The single highest-value hide in dense UI: it removes a whole
  column and 15px of row height.
- **Rarely-changed settings** behind an "Advanced" disclosure. If under ~10% of users touch it, it
  should not cost 100% of users vertical space.
- **Detail behind the row itself.** A side panel or a drill-down is better than a second line in
  every row. Linear's issue row is one line; everything else is in the detail view.
- **Long enumerations** behind "Show all 47". Show the first 5.
- **Chart detail** behind a tooltip rather than in permanent labels.

**Never hide:**

- **State that changes what the user should do next.** An error, an expiry, a failed payment, a
  blocked deploy. If it changes behavior, it is content, not detail.
- **The count of what is hidden.** "Show all" is a worse label than "Show all 47" — the number is
  the information that lets the user decide.
- **Anything the user needs to compare across rows.** Comparison requires simultaneity. If two rows'
  values must be weighed against each other, both must be visible at once; that is what a column is
  for.
- **The primary action.** It is never in an overflow menu.

**Prefer the cheaper mechanism.** In order of cost to the user: (1) truncate with the full value in
a tooltip — near-zero cost; (2) hover reveal — cheap on pointer, **unusable on touch**, so always
provide a tap path; (3) expand-in-place — cheap but shifts layout; (4) side panel — moderate,
preserves list context; (5) new page — expensive, loses context. Do not jump to (5) when (1) works.

**A hidden thing needs an affordance with nonzero contrast.** A disclosure triangle at 1.2:1 against
its background is not progressive disclosure, it is a secret.

---

## When this advice is wrong

- **Consumer onboarding, marketing, pricing, checkout.** Density is hostile there. A signup form
  wants 44px inputs, 16px text, and a lot of air. Linear's 28px sidebar row is correct for an issue
  tracker used six hours a day and would be wrong on a subscription upgrade screen.
- **Touch.** 44px is a real minimum for a primary tap target on a phone, and it is not negotiable.
  Compact modes are pointer-only. A dense table on mobile becomes a card list or a horizontally
  scrolling grid — it does not become a 28px-row table.
- **Small N.** Fewer than ~10 rows: comfortable density. A 5-row list at 28px looks like an
  afterthought regardless of how correct the number is.
- **Documents.** Notion's 16px/24 body in a 720px column is right because the task is *reading*.
  Applying 13px/18 to a document editor is not density, it is an eye test. The same product can be
  dense in its nav and airy in its canvas — Notion is.
- **Accessibility requirements above the default.** Public sector, healthcare, education, or any
  audience skewing older: 16px minimum body, 4.5:1 minimum for all text including labels, 44px
  targets. Linear's 3.45:1 sidebar label would be a defect in that context. Support browser zoom to
  200% without horizontal scroll — which dense layouts break unless columns can drop.
- **Data with genuinely long text.** Log lines, support tickets, transcripts, code review comments.
  Forcing 32px rows on wrapping content just truncates the thing the user came to read. Use variable
  row heights and virtualize.
- **The "always use an 8px grid" rule is wrong here.** Every measured system ships sub-8 values:
  Primer has 2, 4 and 6; Attio pads rows `0 4px 0 16px`; Superhuman's mock uses a 4px gap unit;
  Linear pads its nav item `0 7px`. Icon-to-label gaps, chip padding, and border compensation all
  need 2–6px. Use a 4px base with a hand-picked ramp.
- **The "never go below 12px" rule is wrong here.** Attio ships 10px and 9px labels; Grist ships an
  11px column header and a 10px section label. Below 12px is fine for metadata that is redundant
  with position — and never fine for anything the user must read to act.
- **The "always animate on hover" instinct is wrong here, full stop.** In a 30-row list, movement on
  hover is nausea. Background-color change only.

---

## What AI-generated UI does, and the correction

| # | What generated UI does | Why it happens | Correction |
|---|---|---|---|
| 1 | First data row at y≈825 on a 900px viewport | KPI cards + a 392px chart + a greeting, each individually defensible | Run the fold test. Target 15+ rows for a work surface. Kill the greeting, strip the KPIs to 56px, halve the chart |
| 2 | 53px table rows | A 36px `<Button>` inside an 8px-padded cell | Row height = tallest child + 2×padding + border. Take controls out of cells; reveal on hover |
| 3 | Every list item is a `<Card>` with `p-6` | "Card" is the most-represented container in training data | Homogeneous lists are **rows**. Cards are for 3–9 heterogeneous objects. Never nest a card |
| 4 | 204px KPI cards, four across | "Dashboard" implies stat cards | A 40–56px strip of label/value/delta. Four numbers do not need 228px of vertical space |
| 5 | `text-base` (16px) for row and label text | It sounds like "the default" | 14px for UI text; 13px for work-all-day. 16px is a prose size |
| 6 | `gap-6` / `space-y-6` between everything | One value is easier to write than three | Exactly three gaps: 8/16/32 or 6/12/24. Uniform gaps destroy grouping |
| 7 | A 1px border on every row, the table, and the wrapping card | Borders make structure legible in a diff | One border total. Single-line rows ≤40px need zero (Linear ships none) |
| 8 | A colored pill for every enum value | Badges read as "polished" | An 8px status dot plus plain text. Reserve the filled pill for the one status that changes behavior |
| 9 | `h-11` / `h-12` controls (44–48px) | Touch guidance applied to pointer UI | 32px on desktop — the measured consensus across shadcn, Primer, Atlassian, Grafana and GitHub |
| 10 | `rounded-xl` (12px) on a 32px control | Large radii read as "modern" | Radius ≤ ⅓ of height: 6px at 28–32, 8px at 32–40, 12px at ≥64, or fully round |
| 11 | `text-gray-400` for secondary text | Looks appropriately "muted" | 2.54:1 is broken. Target 5.5–6.2:1 — `#59636E` on white, `#8A8F98` on near-black |
| 12 | Everything non-title is `text-muted-foreground` | One muted token, applied everywhere | Three levels, assigned deliberately. If a third of the screen is muted, muted is now your body color |
| 13 | `hover:shadow-lg hover:-translate-y-0.5` on rows | Motion signals interactivity | Background change only. Nothing moves |
| 14 | Two-line rows where line 2 is boilerplate | More information looks more useful | One line. Move the second field to a right-aligned column and drop it to L2 |
| 15 | A red filled `Delete` button in every row | Destructive actions "should be obvious" | `⋯` on hover → menu → last item, body color, with the shortcut. Filled red only inside the confirm dialog |
| 16 | `size="lg"` on the primary, `size="default"` on the secondary | Bigger = more primary | Same height. Fill vs ghost is the entire signal. GitHub's primary is even weight 400 |
| 17 | Six accent colors on one screen | Each state got a color independently | One accent, used rarely. Hue for behavior-changing state; hierarchy from lightness |
| 18 | Icon + label + description on every sidebar item | Nav items look "explained" | Label only, 28–32px rows. If a nav label needs a description, the label is wrong |
| 19 | `min-h-screen flex items-center justify-center` on an app page | Centering is the landing-page reflex | Application content starts top-left. Centering is for empty states and single-message dialogs |
| 20 | Uppercase + letterspaced section labels everywhere | "Eyebrow" styling from marketing pages | Linear's sidebar group labels are 12px/14 w510, sentence case, `#62666D`. No uppercase, no tracking |

---

## Self-check list

Run against your own output before calling it done. Anything you cannot answer with a number is not
yet a decision.

1. **What is the density target and why?** One sentence naming role, frequency and N. Written in the
   file as a comment.
2. **What is `rows_visible` at 1440×900?** Compute it. Work surface: ≥15. Scan: ≥12. If it is under
   5, find the chrome and delete it.
3. **What is the tallest child of a table cell?** If it is a control, that control is setting your
   row height. Justify it or remove it.
4. **How many distinct font sizes are on the screen?** More than five on a working surface means you
   are using size where you should be using weight or color.
5. **What is the contrast of your secondary text?** It should be 5.5–6.2:1. Check it; do not eyeball
   it.
6. **How many filled controls are visible at rest?** One. Is your primary the same height as its
   neighbors?
7. **How many distinct hues are on the screen?** Excluding content (avatars, logos, charts): one
   accent. Does each hue encode state that changes the user's behavior?
8. **How many hierarchy levels are in one row?** Three. If four, move one into a detail view.
9. **Do your rows have dividers?** If they are single-line and ≤40px, delete them and use hover
   instead. If you keep them, is the contrast 1.1–1.45:1?
10. **Does anything move on hover?** It should not. Background-color change only.
11. **Where does the destructive action live?** In an overflow menu, last, in body color, with a
    shortcut. Not filled, not red, not in the row at rest.
12. **What is hidden, and does the user know it exists?** Every hidden thing needs a visible
    affordance with real contrast and, where it is a count, the number.
13. **Do you have exactly three gap values?** Grep for `gap-` and `space-y-`. If you find five, the
    grouping is accidental.
14. **Is every number a token?** No arbitrary px. Radius ≤ ⅓ of the control's height.
15. **Did you render it and look at it?** `node tools/shot.mjs <url> --widths 1440,390` and open the
    PNGs. You cannot judge density by reading JSX — the 825px number in this file was invisible in
    the source and obvious in the screenshot.

---

## How these numbers were obtained

- **Computed styles and geometry**: Playwright (Chromium), 1440×900, `colorScheme` set per product,
  reading `getComputedStyle` and `getBoundingClientRect` on live pages. Repeated-sibling detection
  was used to find real row structures rather than guessing selectors, and the vertical *pitch*
  between consecutive siblings was measured alongside height so that margins are accounted for.
- **Type inventories** were produced by walking every element with a direct text node and bucketing
  by `fontSize/lineHeight/weight/letterSpacing`, then ranking by occurrence count.
- **Contrast** was computed with `tools/contrast.mjs` from the measured colors, compositing alpha
  over the measured background.
- **Screenshots** were captured with `tools/shot.mjs` at 1440 and read visually to confirm the DOM
  numbers described what a person actually sees.
- **Products measured live**: Linear (app shell rendered in the DOM of linear.app), GitHub
  (`vercel/next.js`), Attio (product surface on attio.com), Grist (`templates.getgrist.com`),
  Grafana (`play.grafana.org`), Notion (real page renderer on `notion.site`), shadcn/ui blocks and
  `dashboard-01`, Primer, Atlassian Design System, Shopify Polaris.
- **Not measurable**: Datadog, Retool, Airtable and Superhuman are behind authentication and their
  marketing sites are not their products. Grafana stands in for Datadog and Grist for Airtable
  throughout; Superhuman's numbers here come from the interface mock its own team ships on
  superhuman.com (14px/21 rows, 21px display lines, 4px gap unit) and should be treated as
  directional, not as the shipped client. Where a value could not be measured it is absent rather
  than guessed.
