# Information density and hierarchy

**Measured 2026-09, re-verified 2026-09 (see Direction pass at the end).** Every number was read
out of a live product with Playwright at 1440×900 unless stated — `getComputedStyle`,
`getBoundingClientRect`, and shipped CSS custom properties. Contrast from `tools/contrast.mjs`.
Nothing here is recalled from memory. Element *counts* drift with page state; heights, colors and
paddings do not.

Generated interfaces are usually a correct layout at the wrong size. The components are rarely the
problem — the **allocation** is.

Three real interfaces, same viewport (1440×900), same job (look at a list of records):

| Surface | Row height | Chrome above first row | Data rows visible |
|---|---|---|---|
| **Grist** spreadsheet (`templates.getgrist.com/doc/lightweight-crm`) | **23px** | 127px | **33** |
| **GitHub** repo file list (`github.com/vercel/next.js`) | **41px** | 307px | **14** |
| **shadcn/ui `dashboard-01`** (the canonical AI-generated dashboard) | **53px** | **825px** | **1.4** |

The shadcn dashboard puts its first data row at y=825 on a 900px viewport: you scroll before you
see one record. 825 of 900 pixels are chrome.

---

## If you only apply five things

1. **Compute the fold before you write CSS.** `rows_visible = (viewport_height − chrome_above_first_row) / row_height`.
   Write the target in a comment: `/* density-target: work · 32px rows · ≥15 visible @1440×900 */`.
   **Scope: this test applies when N can exceed ~20.** A surface whose N is structurally small — five
   environments, four invoices, eight team members — passes at 6 visible rows and fails if you chase
   15. Check N first, then the fold.
2. **Row height is set by the tallest control inside the row, not by the text.** Measured on
   shadcn `dashboard-01`: cells have `p-2` (8px), text is 14px/20, and the row is **53px** because
   one cell holds a 36px `<Button>` (36 + 8 + 8 + 1px border). Note the trap: the same row also
   holds **two 32px `<Input>`s and a 32px icon button**, so deleting only the 36px button gives 49px,
   not 37px. You reach 37px (20 + 16 + 1) only when *every* control is out. Enumerate all cells;
   fixing the tallest one just promotes the second-tallest.
3. **UI text is 14px. Once.** Measured: 14px/21 w400 is **434** of the text elements on a GitHub repo
   page — 4× the next bucket. Attio's product surface uses 14px/20 w500; Grafana 14px/22; Linear
   13px/19.5; Grist 13px. `text-base` (16px) is a *reading* size — Notion's document body is 16px/24
   in a 720px column, correct *for a document*. Drop to 14 once, then take every further gain from
   padding, not from shrinking type again.
4. **Hierarchy comes from position, then weight, then color. Size is fourth and decoration is not
   on the list.** Inside a GitHub file row, the filename, the commit message and the date are all
   14px/21 weight 400. The only difference is color: `#1F2328` (15.80:1) vs `#59636E` (6.11:1).
   Three ranks, one size, one weight, zero badges.
5. **One filled control per view, at the same height as its neighbors.** GitHub's green `Code`
   button is 32px, `0 12px`, radius 6px, weight **400** — identical geometry to the grey branch
   picker beside it. It wins by being the only saturated thing on screen. `Star`/`Fork`/`Notifications`
   are *smaller* (28px, 12px/20 w500). Bigger is not more primary. **Scope: one fill assumes one
   intended action.** On a surface whose whole job is a repeated binary decision, two fills are
   correct — see *Two primaries* below.

---

## The measured reference table

### Rows, and what they cost

| Product / surface | Row height | Pitch | Text | Padding | Divider | Notes |
|---|---|---|---|---|---|---|
| **Grist** grid row (light) | **23px** | 23px | 13px, `line-height: normal` | — | full 1px cell grid | Spreadsheet convention; column header 11px/13.2. First row at y=127; **33 rows visible** |
| **Linear** issue row (dark, app shell on linear.app) | **40px** | 40px | 13px/19.5, ls −0.13px | `0 28px 0 36px` | **none** | ID `#8A8F98` w400; first row 44px below panel top |
| **Linear** sidebar item | **28px** | 30px | 13px/19.5 | — | none | 2px gap between items |
| **Attio** record row (light, product mock on attio.com) | **36px** | 36px | 14px/20 **w500**, ls −0.14px | `0 4px 0 16px`, gap 8px | 1px `#EEEFF1` (**1.15:1**) | Row text is medium, not regular |
| **Grafana** dashboard list row (dark) | **36px** | 36px | 14px/22, ls +0.15px | gap 8px | none | Nav item 32px |
| **GitHub** repo file row (light) | **41px** | 41px | 14px/21 w400 | `0 0 0 16px` per cell | 1px `#D1D9E0` (**1.43:1**) on the *cell*, not the `<tr>` | 3 columns; date right-aligned. First row at y=307; **14 visible** |
| **Notion** page-link block (real renderer, notion.site) | 40px | — | 16px/20.8 w500 | — | none | 720px content column; title 40px/48 w700 |
| **shadcn `dashboard-01`** table row | **53px** | 53px | 14px/20 w400 | `8px` all sides | 1px per row | 36px `<Button>` sets the height; two 32px `<Input>`s and a 32px icon button sit under it |
| **shadcn `dashboard-01`** table header | 40px | — | 14px/20 | — | 1px | |

**Read this table as a ladder, not a menu.** 23 → 28 → 36 → 40 → 41 → 53. Everything hand-built
lands between 23 and 41. The generated one is above all of them.

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
| **shadcn `dashboard-01`** | 14px/20 w500 (58), 14px/20 w400 (36), 12px/16 w500 (27), **14px/14 w500 (24)**, 12px/16 w400 (16), 30px/36 (4), 16px ×3 variants, 14px/17.5, 12px/18 | 4 sizes but **12 combos** |

Dense products run **three or four** type sizes on a working screen.

**Count combos, not sizes.** shadcn `dashboard-01` uses only four font *sizes* — it would pass a
naive "≤5 sizes" check — but ships **12 distinct `size/line-height/weight` combinations**, including
14px at three different line-heights (20, 17.5, 14). That is the actual mess: same size, arbitrary
line box, so nothing aligns. Bucket by the full triple.

Attio ships **10px and 9px** labels in production and Linear ships 12px sidebar section headers —
both below the "never go under 12px" rule of thumb, deliberately, for non-essential metadata.

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

Real dividers are 1.1–1.45:1. Above 1.5:1 the line competes with the text; Linear ships **zero**
dividers on its 40px issue rows. Measure it, do not squint at it.

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

The primitives are fine. The sidebar rows are 32px. The toolbar buttons are 32px. **The failure is
allocation**: 204px per number, 392px for one chart, 24px between everything, and four controls
dropped into a table row.

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
| Controls nested in a cell | 36px `<Button>`, 32px `<Input>` | **plain text/link**; 24px ghost on row hover *unless* the action fires on >20% of rows | same |
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

**Scope on the whole table: it assumes a pointer, an adult-general audience, and N > ~20.** Touch,
accessibility-first audiences and small-N surfaces use the Comfortable column or larger — see
*When this advice is wrong*.

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

Apply top-down. Lever 1 is worth 100–500px; levers 3–8 are worth single-digit pixels each. Generated
code starts at lever 6.

### 1. Delete chrome above the fold (worth 100–500px)

On `dashboard-01`, 825 of 900 viewport pixels are chrome — more than levers 2–8 could recover
combined. The offenders, measured:

- A 4-card KPI grid: **204px** + 24px gap = 228px to show four numbers.
- A chart card: **392px**.
- A greeting or "Welcome back" block: 80–180px.
- A tab strip plus a right-side button cluster: ~60px.

A 56px strip of `label / value / delta` triples carries the same four numbers as the 228px grid. A
200px chart reads the same as a 392px chart for a trend. The page title belongs *inline* in a
40–48px toolbar next to the actions — shadcn gets this right (its `h1` is 16px/24 w500 in the
toolbar); generated variants usually undo it.

**Scope: do not shrink the identity of the thing being acted on.** In a multi-tenant console, an
env-switching deploy tool, or anything where the operator moves between accounts, a 14px inline
title is how you drop a production database instead of staging. When acting on the wrong object is
the expensive error, the object's name gets its own high-contrast, persistent, unmissable slot —
and it still does not need 180px. Kill the *greeting*; keep the *identity*.

### 2. Remove controls from rows (worth 15–20px per row, compounding)

The measured mechanism:

```
row_height = tallest_inline_child + padding_top + padding_bottom + border
```

`dashboard-01`: 36 + 8 + 8 + 1 = **53px**. The 36px child is a `<Button>` in the reviewer cell, and
two 32px `<Input>`s wait underneath it — remove the button alone and you land at 49px. Three fixes,
in order of preference:

1. **Render it as text.** A reviewer name is a name. 20px line box → row = 37px.
2. **Reveal it on row hover** as a 24px ghost icon button, absolutely positioned so it does not
   participate in height. Linear, GitHub and Attio all do this. **Scope: hover-reveal is wrong when
   the action is the task.** In a triage queue where the operator acts on most rows, hiding the
   control adds a move-and-wait to every single one — keep a 24px ghost control *visible at rest*
   and let contrast, not disclosure, keep it quiet. Hover-reveal also needs a tap and a keyboard
   path; if you cannot supply both, do not hide it.
3. **Move it into a right-aligned `⋯` menu**, one 24px trigger for all row actions.

Check **every** cell for: buttons, selects, inputs, badges taller than the line box, avatars over
20px, and two-line text. Fixing the tallest promotes the next one — enumerate, then cut.

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

A 1px divider on every row of a 30-row list adds 30px and 30 horizontal lines competing with the
content. Single-line rows ≤40px need **zero** dividers — alignment and row-hover already delimit
them. Reserve 1px for boundaries between *groups*, at 1.1–1.45:1.

**Scope: "zero dividers" holds up to about five columns, and only where row-hover exists.** At six
or more columns the reader tracks a value across 1000px+ of width and the eye drops a row; there,
use a 1.1–1.45:1 divider or zebra striping. Same for any view with no hover state — print, PDF and
CSV-preview surfaces, and touch. Linear can ship zero dividers because its issue row is three
fields wide with a persistent hover; a nine-column reconciliation grid cannot.

### 8. Radius and shadow (worth 0px, but they read as "big")

A 12px radius on a 32px control reads as a pill and inflates the row. Keep radius ≤ ⅓ of height.
Every product measured here ships **zero** shadow on list rows; a `shadow-sm` on each row adds a
soft 2–4px halo that reads as extra height you did not spend.

---

## Comfortable and compact modes

**Ship one mode by default and set it from the usage pattern.** Ship two only for a genuinely
bimodal audience: an admin in the tool eight hours a day *and* an occasional user who opens it
monthly. Gmail and Jira both ship a density control for that reason.

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

### Design for the column, not the F

The F-pattern result describes **unstructured prose on content pages**. In a dense grid the reader
is doing column-wise comparison, and the eye follows whatever alignment and contrast you built. Do
not lay out a table around an F.

What drives scannability in dense UI, in order:

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

In a fixed-height row, wrapping either clips or blows up the row. Truncate with
`text-overflow: ellipsis` and put the full value in a `title`. Truncate the **middle** for paths and
IDs (`app/…/route.ts`), the **end** for prose.

**Scope: truncate only what the reader can identify from its head.** Filenames, names, IDs and
subjects survive truncation. Log lines, error messages, support-ticket bodies and diff hunks do not
— the distinguishing token is usually at the end, and a 30-row list of identically-truncated strings
is unusable. There, drop the fixed row height, wrap to two lines, and virtualize.

---

## Hierarchy without decoration

Use these in order. Exhaust each before moving to the next.

**1. Position.** Reading order is hierarchy: first in the row, first row in the group, top-left of
the screen. It costs zero pixels and survives dark mode, colorblindness and print. Most "we need a
badge here" problems are "this is in the wrong place" problems.

**2. Weight.** Measured: Linear moves 400 → 510 → 590. Attio sets its entire row text at **500** and
uses 400 only for de-emphasized rows. GitHub uses 400 → 600. One weight step is a large perceptual
jump at 13–14px and costs zero pixels. Variable fonts make 510 and 590 real values, not rounding.

**3. Color (lightness, not hue).** Two or three inks: ~15:1, ~6:1, and — only for non-essential
labels — ~3.5:1. Grafana and Attio implement this as **one ink at several alphas**, which composites
correctly over any surface and costs one token instead of three.

**4. Size.** Fourth, not first. Inside a 40px row, size does almost nothing: Linear's issue ID and
issue title are both 13px. Size is for *between* levels of the page (28px page title vs 14px row),
not within a row.

**5. Space.** Grouping by proximity. A 16px gap between groups and 4px within them structures a list
with no lines at all.

**Not on the list: color hue, badges, borders, cards, shadows, icons-as-decoration, uppercase.**

### Why AI reaches for color and decoration first

Decoration is legible in a diff and hierarchy is not. `<Badge variant="success">` looks like design
work in source; `font-weight: 510` does not. So every enum gets a pill, every group gets a card,
every non-title element gets `text-muted-foreground` — six accent colors competing, nothing
emphasized. The rule: **hue encodes state that changes the user's behavior. Nothing else is hue.**

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

- **One filled control per view.** If two things are filled, neither is primary.

**Two primaries — the one real exception.** When the surface exists to make the *same binary
decision* over and over — a moderation queue, a claims-adjudication desk, an expense-approval
inbox — a single fill is worse. The reviewer's job is Approve-or-Reject 400 times an hour; demoting
Reject to a ghost button makes the operator re-find it on every item and biases the outcome toward
the filled option. Ship **two fills of equal height, separated by hue** (green/red, or accent/neutral-dark),
never by size. The test: is the second action taken on more than ~20% of items? If yes, it is a
co-primary, not a secondary. Everywhere else — a settings page, a detail view, a form — one fill.
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
3. **Never render a filled red button in a resting view.** A red fill is a loud, attractive click
   target for the action you least want misclicked. Reserve filled red for the confirm button
   *inside* the confirmation dialog. **Exception: the two-primaries case above** — on a queue whose
   job is accept/reject, Reject is not destructive-by-surprise, it is half the task, and it gets a
   fill.
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

- **Row actions** behind hover + `⋯` — **when the action fires on under ~20% of rows.** The
  highest-value hide in dense UI: it removes a whole column and 15px of row height. Above that
  threshold, keep a 24px ghost control visible at rest (see lever 2).
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
  Forcing 32px rows on wrapping content truncates the thing the user came to read. Use variable row
  heights and virtualize.
- **Surfaces with no hover and no pointer.** Print stylesheets, PDF exports, emailed reports, kiosk
  and TV displays, and touch. Every rule here that leans on row-hover — no dividers, hidden row
  actions, truncate-with-`title` — silently fails. On those, restore zebra or dividers, show the
  actions, and wrap the text.
- **High-stakes single actions.** Wire transfers, production deploys, key revocation, medical
  ordering. Density is not the goal on a confirm surface; unmissable identity and one deliberate
  target are. Comfortable spacing, 16px text, one filled control.
- **The "always use an 8px grid" rule is wrong here.** Every measured system ships sub-8 values:
  Primer has 2, 4 and 6; Attio pads rows `0 4px 0 16px`; Superhuman's mock uses a 4px gap unit;
  Linear pads its nav item `0 7px`. Icon-to-label gaps, chip padding, and border compensation all
  need 2–6px. Use a 4px base with a hand-picked ramp.
- **The "never go below 12px" rule is wrong here.** Attio ships 10px and 9px labels; Grist ships an
  11px column header and a 10px section label. Below 12px is fine for metadata that is redundant
  with position — and never fine for anything the user must read to act.
- **The "always animate on hover" instinct is wrong here.** In a 30-row list, movement on hover is
  nausea. Background-color change only.

---

## What AI-generated UI does, and the correction

Items 1–20 are the structural failures — they have been stable since 2023 and are still what
`v0` / Lovable / Bolt / Cursor emit by default. Items 21–29 are the **2026 layer**: newer tells,
all of which cost density or hierarchy specifically. (Pure color and type tells — AI purple, the
cream + `Instrument Serif` + emerald "tasteful default", emoji-as-icons — live in `color.md` and
`typography.md`; only their density consequences are listed here.)

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
| 21 | `backdrop-blur-*` + `bg-white/10` glass cards over a list | Glassmorphism is the 2026 default "premium" move | Blur destroys the 1.1–1.45:1 divider band and makes every hairline unmeasurable against a moving backdrop. Opaque surfaces in application chrome. Blur belongs on a modal scrim, nowhere else |
| 22 | A bento grid where the answer is a table | "Dashboard" now retrieves bento, not rows | Bento is a *marketing* layout for 5–9 heterogeneous tiles. Homogeneous records are rows. If every tile has the same shape, you built a bad table |
| 23 | `bg-clip-text text-transparent` gradient on the KPI number | Gradient text reads as "designed" | It breaks `tabular-nums` alignment, has no single measurable contrast ratio, and disappears in forced-colors mode. Solid ink, one weight step, `tabular-nums` |
| 24 | Neon-on-dark: `text-cyan-400` on `bg-slate-950`, `shadow-[0_0_20px]` glow on cards | The v0/Cursor dark default | Glow is unquantifiable visual weight — it inflates perceived row height with zero pixels. Near-black surface (`#08090A`-class), ink hierarchy at 18:1 / 13:1 / 6:1, zero glow. Linear ships none |
| 25 | Nested cards: `<Card>` wrapping `<Card>` wrapping a list | Every generation step adds one more container | Each nesting level costs 2 × padding + 2 × border + 1 radius, ~50px of dead frame. One container per surface. Never nest |
| 26 | `rounded-2xl` / `rounded-3xl` (16–24px) as the card default | Untouched shadcn/Tailwind default | Radius ≤ ⅓ of height. shadcn's own `dashboard-01` card measures 14px at 204px tall; 24px on an 80px strip reads as a pill |
| 27 | `initial={{opacity:0,y:20}}` + `whileInView` stagger on every block | Motion library is installed, so it gets used | A list that assembles itself on scroll cannot be scanned. Entrance animation on application data is a defect. Reserve motion for state that actually changed |
| 28 | ✨ as the only affordance for an AI feature; shimmer text as the only loading state | It is the 2026 convention and costs no design decision | The sparkle is fine as an icon and useless as hierarchy — it does not say what the feature does or whether it is running. Label the action; use a determinate or skeleton state that reserves the real row height so nothing reflows |
| 29 | Sidebar icons at 14–16px next to 14px labels, in a 44px row | Copying the Claude/Cursor/Codex chrome without its density | Those apps pair small icons with **28–32px rows**. Small icon + tall row is the worst pair: you pay the height and lose the target. Match the source: 16px icon, 28–32px row, 8px gap |

---

## Self-check list

Every item is a command or a screenshot reading with a pass threshold. No item is answerable by
opinion. Run the console block once, then the greps.

**Setup — paste this into DevTools on the running page (or `page.evaluate` it in Playwright):**

```js
const R = (sel) => [...document.querySelectorAll(sel)];
const box = (e) => e.getBoundingClientRect();
window.__d = {
  rowH: (sel) => R(sel).slice(0,5).map(e => +box(e).height.toFixed(1)),
  fold: (sel) => { const r = R(sel).find(e => box(e).top > 0);
    return r ? { firstRowTop: Math.round(box(r).top), rowH: +box(r).height.toFixed(1),
      visible: +((innerHeight - box(r).top) / box(r).height).toFixed(1) } : null; },
  tallest: (rowSel) => R(rowSel + ' *')
    .filter(e => !/^(TD|TH)$/.test(e.tagName))
    .map(e => ({ tag: e.tagName, cls: (e.className||'').toString().slice(0,32),
                 h: +box(e).height.toFixed(1) }))
    .sort((a,b) => b.h - a.h).slice(0,5),
  typeCombos: () => { const bk = {}; for (const e of R('*')) {
      if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
      const c = getComputedStyle(e); if (c.display === 'none') continue;
      const k = `${c.fontSize}/${c.lineHeight} w${c.fontWeight}`; bk[k] = (bk[k]||0)+1; }
    return Object.entries(bk).sort((x,y) => y[1]-x[1]); },
  hues: () => [...new Set(R('*').flatMap(e => { const c = getComputedStyle(e);
      return [c.color, c.backgroundColor, c.borderTopColor]; })
    .map(v => (v.match(/\d+/g)||[]).slice(0,3).map(Number))
    .filter(([r,g,b]) => r !== undefined && Math.max(r,g,b) - Math.min(r,g,b) > 24)
    .map(([r,g,b]) => Math.round(Math.atan2(1.732*(g-b), 2*r-g-b) * 57.3 / 30) * 30))],
  mutedShare: (mutedRgb) => { const t = R('*').filter(e =>
      [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
    return +(t.filter(e => getComputedStyle(e).color === mutedRgb).length / t.length).toFixed(2); },
};
```

| # | Check | How to run it | Pass |
|---|---|---|---|
| 1 | Density target is written down | `rg -n "density-target:" src/` | ≥1 hit per list surface, naming role · row height · target rows |
| 2 | Rows visible at 1440×900 | `__d.fold('tbody tr')` | Work: ≥15. Scan: ≥12. Glance/small-N: N itself. Under 5 with N>20 → fail |
| 3 | Nothing tall is inside a row | `__d.tallest('tbody tr:first-child')` | Top entry ≤ 24px, or ≤ line-height. A 32/36px `<Button>`/`<Input>` here is the failure |
| 4 | Type combinations, not sizes | `__d.typeCombos().length` | ≤6 combos on a working surface. `dashboard-01` scores 12 — and only 4 *sizes*, which is why counting sizes misses it |
| 5 | Secondary-text contrast | `node tools/contrast.mjs "<L2 hex>" "<bg hex>"` | 5.5–6.2:1. Under 4.5 fails outright; over 8 is not a second level |
| 6 | Filled controls at rest | `rg -n 'variant="default"\|bg-primary\|btn-primary' <view>` and count saturated fills in the screenshot | 1 — or exactly 2 of equal height if this is a repeated-binary-decision surface |
| 7 | Distinct hues | `__d.hues()` | ≤2 buckets (one accent + one status), excluding avatars/logos/charts |
| 8 | Hierarchy levels in one row | In the screenshot, count distinct text colors inside one row | ≤3. A 4th means a detail view is missing |
| 9 | Muted has not become the body color | `__d.mutedShare('rgb(115,115,115)')` (your muted token) | ≤0.33 |
| 10 | Dividers | `__d.rowH('tbody tr')` + `rg -n 'divide-y\|border-b' <view>` | Zero on single-line rows ≤40px with ≤5 columns and a hover state. Otherwise present at 1.1–1.45:1 |
| 11 | Nothing moves on hover | `rg -n 'hover:scale\|hover:-translate\|hover:shadow\|whileHover\|whileInView\|animate-bounce'` | 0 hits on list/row/card components |
| 12 | Destructive action placement | `rg -n 'variant="destructive"\|bg-red-\|bg-destructive' <view>` | 0 hits outside a `Dialog`/`AlertDialog` file — unless it is a co-primary on a review queue |
| 13 | Every hover-reveal has a non-hover path | `rg -n 'group-hover:opacity\|group-hover:visible\|opacity-0'` then confirm each hit has a focus-visible and a touch/tap sibling | Every hit paired, or 0 hits |
| 14 | Exactly three gap values | `rg -o 'gap-\d+\|space-[xy]-\d+\|gap-\[[^]]*\]' -N src/ \| sort \| uniq -c \| sort -rn` | ≤3 distinct values dominate; a 4th appearing <5× is a leak, fix it |
| 15 | No arbitrary pixel values | `rg -n '\[[0-9]+px\]' src/` | 0 hits, or each hit has a comment saying why |
| 16 | Radius ≤ ⅓ of control height | `rg -o 'rounded-(2xl\|3xl\|full)' src/` cross-checked against the element's measured height | No `rounded-2xl`+ on anything under 64px tall |
| 17 | No blur behind application chrome | `rg -n 'backdrop-blur\|bg-\w+/[0-9]' src/` | 0 hits outside modal scrims |
| 18 | Card nesting depth | `R('[data-slot=card]').filter(c => c.closest('[data-slot=card]') !== c).length` | 0 |
| 19 | Automated consistency scan | `node tools/audit.mjs <url> --widths 1440,390` | No horizontal overflow; distinct font-size / radius / shadow counts inside the budgets above |
| 20 | You looked at it | `node tools/shot.mjs <url> --widths 1440,390` and open both PNGs | The 825px number in this file was invisible in the source and obvious in the screenshot. Non-negotiable |

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
- **Re-verification (2026-09 direction pass)**: seven headline claims were independently re-probed
  on live pages — GitHub rows and buttons, GitHub L1/L2 inks, shadcn `dashboard-01` geometry, Grist
  rows and fold, Linear row and nav heights. All seven held exactly. Five values were corrected; see
  *Direction pass* at the end of this file. **Attio could not be re-probed** — `attio.com` no longer
  renders the product mock — so every Attio number here is single-source.
- **Not measurable**: Datadog, Retool, Airtable and Superhuman are behind authentication and their
  marketing sites are not their products. Grafana stands in for Datadog and Grist for Airtable
  throughout; Superhuman's numbers here come from the interface mock its own team ships on
  superhuman.com (14px/21 rows, 21px display lines, 4px gap unit) and should be treated as
  directional, not as the shipped client. Where a value could not be measured it is absent rather
  than guessed.

---

## Direction pass (2026-09)

### Re-probed with Playwright (Chromium, 1440×900, live pages)

| Claim in this file | Re-measured | Verdict |
|---|---|---|
| GitHub repo file row = 41px, first row at y=307, 14 visible | 41.0px; `top` 307, 348, 389, 430 … (41px pitch, exact) | **Confirmed** |
| GitHub `Code` button: 32px, 14px/21 w400, `0 12px`, radius 6px, `#1F883D` | 32.0px, `14px/21px`, `400`, `0px 12px`, `6px`, `rgb(31,136,61)` | **Confirmed** |
| GitHub `Star`/`Fork`/`Notifications` = 28px, 12px, w500 | 28.0px, `12px/20px`, `500`, `3px 12px`, radius 6px, `#F6F8FA` on `#D1D9E0` | **Confirmed** |
| GitHub L1 `#1F2328` 15.80:1 / L2 `#59636E` 6.11:1 | `rgb(31,35,40)` ×150, `rgb(89,99,110)` ×218 on `rgb(255,255,255)`; `tools/contrast.mjs` → 15.80 and 6.11 | **Confirmed** |
| shadcn `dashboard-01`: 53px row, 40px header, first row y=825, 8px cell padding, 204×262 KPI, 392px chart, 14px radius | All exact. Row border 1px, `docH` 1436 on a 900 viewport | **Confirmed** |
| Grist: 23px rows, 127px chrome, 33 visible | 33 `.record` rows at 23.0px, first `top` = 127, pitch 23 | **Confirmed** |
| Linear: 40px issue row, 28px sidebar item | `bVIB3G_row` = 40.0px ×14; nav ingredient = 28.0px; group header 36px | **Confirmed** |

### Numbers corrected

1. **GitHub 14px/21 element count: 296 → 434.** Re-counted on `github.com/vercel/next.js`; the next
   bucket is 12px/18 at 44. The *ratio* (≈10:1 over the runner-up) is the durable signal — raw
   element counts move with lazy-loaded regions, so they are now labelled as state-dependent in the
   preamble.
2. **"Replace the 36px button with a link and the row is 37px" was wrong.** The `dashboard-01` row
   also contains two 32px `<Input>`s and a 32px icon button. Removing only the tallest child yields
   **49px**, not 37px. Corrected in *If you only apply five things* #2, lever 2, and the reference
   table. This was the most dangerous error in the file: an agent following it would make the edit,
   measure 49, and conclude the model was wrong.
3. **shadcn `dashboard-01` "6 distinct sizes" → 4 sizes / 12 combos.** Measured buckets include
   14px at three different line-heights (20, 17.5, 14). The old count both understated the mess and
   made the self-check unable to catch it.
4. **Grist cell type: "13px/18" → 13px with `line-height: normal`.** The 18 was inferred from the row
   box, not read from computed style.
5. **GitHub row divider location.** The 1px `#D1D9E0` hairline is on the cell, not the `<tr>` —
   `getComputedStyle(tr).borderBottomWidth` is `0px`. The color and ratio were right; the selector
   an agent would copy was not.

### Rules stress-tested, and the scopes added

Each rule below was run against a realistic product where following it literally makes the interface
worse. The scope is now in the rule, not only in *When this advice is wrong*.

1. **"One filled control per view."** Adversarial case: a content-moderation queue. Approve and
   Reject are the same decision, made 400×/hour, and Reject fires on ~40% of items. Demoting it to a
   ghost button costs a re-find on every item and biases outcomes toward the filled option. **Scope
   added:** two equal-height fills separated by hue when a second action fires on >~20% of items.
   Propagated to the destructive-action rule, which otherwise forbids exactly this.
2. **"Single-line rows ≤40px need zero dividers."** Adversarial case: a nine-column financial
   reconciliation grid at 1440px. With no divider and no zebra, the eye drops a row while tracking a
   value across 1100px. Linear can ship zero dividers because its row is three fields wide with a
   persistent hover. **Scope added:** ≤5 columns *and* a hover state; otherwise divider or zebra at
   1.1–1.45:1. Extended to a new *no hover, no pointer* bullet covering print, PDF, email and kiosk.
3. **"Hide row actions behind hover + `⋯`."** Adversarial case: a triage inbox where the operator
   acts on most rows. Hover-reveal adds move → wait → aim to every interaction, and is dead on touch
   and keyboard. **Scope added:** keep a 24px ghost control visible at rest when the action fires on
   >20% of rows; hover-reveal requires both a tap and a focus path or it does not ship.
4. **"Compute the fold; ≥15 rows or you failed."** Adversarial case: a settings surface listing five
   environments. Chasing 15 rows produces a cramped strip in an ocean of white. **Scope added:** the
   fold test applies only when N can exceed ~20; check N first.
5. **"Delete the greeting; title goes inline in the toolbar."** Adversarial case: a multi-tenant
   deploy console where the operator switches between 40 customer accounts. A 14px inline title is
   how someone drops production instead of staging. **Scope added:** kill the greeting, keep the
   *identity* — when acting on the wrong object is the expensive error, the object's name gets a
   persistent high-contrast slot.
6. **"Truncate, do not wrap."** Adversarial case: a log viewer. The distinguishing token in a log
   line or stack frame is at the *end*; 30 identically-truncated strings are unusable. **Scope
   added:** truncate only content identifiable from its head; otherwise variable row height + wrap +
   virtualize.

### Anti-pattern section brought current

The 2023-era list (items 1–20) still describes what `v0`, Lovable, Bolt and Cursor emit — every one
was re-checked against `dashboard-01` and remains accurate. Nine 2026-specific tells were missing and
are now items 21–29: glass/`backdrop-blur` cards over lists, bento grids where a table belongs,
`bg-clip-text` gradient on KPI numbers, neon-on-dark glow (`shadow-[0_0_*]`, `text-cyan-400` on
`bg-slate-950`), nested cards, `rounded-2xl`/`3xl` defaults, `whileInView` stagger on every block,
✨-and-shimmer as the only AI affordance, and tiny sidebar icons inside tall rows. Pure color and
type tells found in the same research — AI purple/indigo, the cream + `Instrument Serif` + emerald
"tasteful default", emoji-as-icons, `text-center` hero + three feature cards — are named here only
where they cost density, and belong in `color.md` and `typography.md`.

Sources for the 2026 tells: [SmoothUI, *AI Design Slop*](https://smoothui.dev/blog/ai-design-slop);
[Jim Nielsen, *The AI Aesthetic*, summarized](https://explainx.ai/blog/ai-aesthetic-design-patterns-jim-nielsen-2026);
[*Unslop UI* banned-pattern list](https://www.claudecodehq.com/playbooks/unslop-ui);
[vibecodekit, *AI Slop Design*](https://vibecodekit.dev/ai-slop-design);
[925 Studios, *AI Slop Fonts and Gradients*](https://www.925studios.co/blog/ai-slop-design-tells).

### Self-check list rewritten

The old list had items no one could fail: "What is the density target and why?", "does the user know
it exists?", "did you render it and look at it?" — questions, not tests. All 20 items are now a
shell command, a console expression, or a specific reading off a screenshot, each with a numeric
pass threshold. A reusable `window.__d` probe block ships with the list. Item 4 in particular was
changed from *font sizes* to *size/line-height/weight combos* because the old form passed
`dashboard-01`, the file's own worked example of failure.

### Still unverified

Attio's numbers could not be re-probed: `attio.com` no longer renders the product mock this file
measured, and the row detector now returns marketing nav (26px, 16px/22). Attio rows, dividers and
alpha ramp in the tables above are **carried forward from the 2026-09 first pass, not re-measured**.
Grafana, Notion, Primer and Atlassian were not re-probed this pass. Superhuman remains directional
only. Treat every Attio value as one-source until someone re-measures it inside the product.
