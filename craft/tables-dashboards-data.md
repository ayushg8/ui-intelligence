# Tables, dashboards and data presentation

**Measured September 2026.** Every px, hex, alpha and contrast ratio below was pulled with
Playwright from a live production interface — computed styles, bounding boxes, SVG attributes — or
computed from those values. Contrast ratios are WCAG relative-luminance ratios against the page
background, computed from the measured colors. Nothing here is recalled from memory. Where a value
is inferred it says "approx."

Two numbers to anchor everything that follows.

> **Border weight.** Across nine production tables, every horizontal rule between rows measured
> between **1.19:1 and 1.36:1** against white. Vercel docs `rgba(0,0,0,0.08)` = 1.19. Radix Themes
> `rgba(0,9,50,0.12)` = 1.31. Yahoo Finance `#dde0e4` = 1.32. AG Grid `#181d1f` @15% = 1.36. Not one
> of them is as dark as `#ddd` (1.44). The rule you'd write by instinct is roughly twice too dark.
>
> **Tabular figures.** On Yahoo Finance's most-active table, **1,125 of 4,611 elements** (24.4%)
> carry `font-variant-numeric: tabular-nums`. On the shadcn/ui `tasks` example — the single most
> copied table in AI-generated UI — the count is **1 of 1,200**. That one difference is most of why
> generated tables of numbers look wrong and nobody can say why.

---

## If you only apply five things

1. **Right-align every number, set `font-variant-numeric: tabular-nums` on the table root, and left-align
   every string.** Not "usually." Always. Yahoo Finance, Vercel docs and Linear all set `tabular-nums`
   at the container, not per-cell. Dates go right if they're sortable timestamps in a fixed format,
   left if they're prose ("2 days ago"). Headers inherit their column's alignment — a right-aligned
   number column gets a right-aligned header.
2. **One horizontal 1px rule at ~8–12% black, no vertical rules, no zebra, no outer box.** Measured
   band: 1.19–1.36:1 contrast. Vertical column borders appeared in exactly **zero** of the nine tables
   measured. Zebra appeared in exactly one (MDN reference tables, at `#f7f7f8` vs `#fff` — a 1.07:1
   difference you can barely see).
3. **Pick the row height from the reading task, not from a token.** Measured: 32px (Plausible's
   scannable ranked list), 40px (Yahoo Finance, Linear issue rows), 42px (AG Grid at 100k rows), 44px
   (Radix), 48px (Vercel docs), 52px (MUI DataGrid), 63–79px (GitHub's two-line rows). The generic
   answer — 48–56px because that's the "touch target" — is wrong for anything a person reads 200 rows
   of on a laptop.
4. **A number with no comparison is decoration. Ship the delta or don't ship the tile.** Plausible's
   tiles are label / value / delta-vs-previous-period, and clicking a tile *changes the chart below
   it*. Grafana's "Running pods 92" has no baseline and teaches the viewer nothing. If you cannot
   name the comparison, the metric does not belong on the dashboard.
5. **Gridlines are the text color at 10–15% opacity, in one direction only, and the axis line is not
   darker than the gridlines.** Observable Plot ships `rgb(60,60,67)` at `stroke-opacity: 0.1`
   (1.18:1), horizontal only. Recharts ships `#d6d3d1` dashed in *both* directions plus an axis line
   and tick marks at `#52525b` — **7.73:1**, as dark as body text. That single default is the loudest
   tell in an AI-generated chart.

---

## The measured reference table

### Tables, as shipped

| Product / component | Row h | Header h | Cell padding | Body type | Separator (contrast vs white) | Header type | tnum? | Row hover | Zebra |
|---|---|---|---|---|---|---|---|---|---|
| **Plausible** ranked list | **32** | 20 | 0 (flex) | 16/24 | **none** | 12px w400 gray | no | `gray-100 @60%` → 1.06 | no |
| **Linear** issue row (home) | **40** | — | `0 28px` / `0 36px` | 16/24 Inter | **none** | — | yes¹ | — | no |
| **Yahoo Finance** most-active | **40** | **34.5** | `0 8px` | 14/21 | `#dde0e4` → 1.32 | **12px w400** | **yes (root)** | none | no |
| **AG Grid** 100k demo | **42** | 48 | `0 16px` | 14 IBM Plex | `#181d1f @15%` → 1.36 | 14px w500 | no | — | no |
| **Radix Themes** `Table` | **44** | 44 | `12px` | 14/20 | `inset 0 -1px rgba(0,9,50,.12)` → 1.31 | 14px **w700** | no | **none** | no |
| **Vercel** docs table | **48** | 48 | `8px 12px` | 14/21 Geist | `rgba(0,0,0,.08)` → 1.19 | 14px **w400 gray-600 on #fafafa** | **yes (root)** | none | no |
| **shadcn/ui** `tasks` | **49** | 40 | `8px` | 14/20 Geist | `#e5e5e5` on **every** row → 1.26 | 14px w500 **black** | **1 element** | `#fafafa` → 1.04 | no |
| **MUI** DataGrid | **52** | 56 | `0 10px` | 14/20 Roboto | (cell top border reserved for focus) | 14px w500 | no | — | no |
| **GitHub** PR list | **63.3** | — | `0` | 14/21 | border-**top** `#d1d9e0 @70%` → 1.28 | — | no | **none** | no |
| **GitHub** Actions runs | **79** | — | `16px` | 14/21 | border-top, same | — | no | none | no |
| **MDN** reference tables | ~40 | — | — | — | — | — | no | — | **`#f7f7f8` → 1.07** |

¹ Linear: `font-variant-numeric: lining-nums tabular-nums` plus `font-feature-settings: "cv01","ss03"`
on issue IDs and counters — 78 elements on the homepage.

**Read the header column.** Three of the six products that style a header at all use **weight 400**.
Yahoo drops the header to **12px while the body stays 14px**, and makes the header row **5.5px
shorter than a data row**. Vercel gets header separation from a `#fafafa` fill and gray-600 text, not
from bold. The instinct — bold, same size as body, same height as a row — is the least common
choice in the sample.

### Charts, as shipped

| Chart | Gridlines | Direction | Axis line | Tick labels | Series |
|---|---|---|---|---|---|
| **Observable Plot** (default) | `rgb(60,60,67)` @ `stroke-opacity .1` → **1.18** | horizontal only (14) | same ink, no extra weight | **10px** system-ui | 1.5px |
| **Plausible** | `#ececee` → **1.18** and `oklch(.871 .006 286)` | horizontal only (7) | — | **12px** `oklch(.552)` gray-500 | 1 series, **2px**, `oklch(.585 .233 277)` (6.29:1) + gradient area |
| **Cloudflare Radar** | `oklab(0 0 0/.15)` **dashed 3px** → **1.41** | **vertical only** (day boundaries, 14) | `oklab(0 0 0/.2)` → 1.61 | **11px** black @65% (7.0:1); y-anchor `end`, x-anchor `middle` | current **3px solid**; previous period **same hue, 1.8px dashed 4px** |
| **Recharts** (default) | `#d6d3d1` **dashed 5,5** → **1.49** | **both** (11) | **`#52525b` → 7.73**, 13 line+tick elements | **14px** | `#8884d8` (3.31:1), `#82ca9d` (**1.93:1**), dot marker on every point |
| **GitHub Status** 90-day strip | none | none | none | endpoints only, 14px `#6a737d` | 90 rects, **3px wide, 34px tall, 5px pitch**, one green `#28a745` |
| **Yahoo** in-row sparkline | none | — | none | none | 50×20px `<canvas>` |

**The y-axis label count is a decision, not a default.** Plausible prints 8 y labels (`0, 2k … 14k`)
because the reader compares absolute traffic. Cloudflare Radar prints **two** — `Max` and `0` —
because the shape is the message and the absolute byte count is not public. Recharts prints
whatever `d3-scale` returns, at 14px.

**The x-axis label count too.** Plausible shows **6 date labels for 28 days of data** (one per ~5
days). Radar shows 4 for 7 days. Neither labels every bucket.

### Dashboard chrome

| Element | Plausible | Cloudflare Radar | Grafana Play |
|---|---|---|---|
| Metric tile | 180.5 × **64.8px**, `padding 8px`, `radius 6px`, divided by a 1px left border | — | full panel |
| Tile label | **12px/16px w700 UPPERCASE**, `ls -0.12px`, gray-900 | — | 14px sentence case |
| Tile value | **19.2px/28.8px w600** gray-900 | 24px w700 | 60px+ |
| Tile delta | **12px/16px w500 gray-500** + an **8×8px** arrow glyph in `green-500` / red | — | absent |
| Tile is a control? | **yes — selecting it swaps the chart series**; selected bg `gray-100 @70%` (1.07:1) | no | no |
| Time range | "Last 28 days", top right | "Last 7 days", top right | "Last 6 hours" + zoom-out + **Refresh + 30s auto-refresh** |
| Scope / filters | site selector left of the metrics | "Worldwide" selector beside the page title | template vars (`cluster`, `instance`) **persisted in the URL** |
| Metric definition | — | **one sentence under every panel title** ("Percentage of bot vs. human HTTP requests to HTML content") + `?` icon | panel description on hover |
| Empty state | spinner centered in a card that **keeps its final height** | — | "No data" centered, **panel keeps full height** |
| Missing value | — | **`—`** (em dash), never `N/A`, never `0` | — |

Note the delta coloring, because it is the opposite of the common instinct: **the arrow carries the
color, the number stays gray.** Plausible's `+2%` is `text-gray-500 font-medium` at 12px; only the
8×8px triangle beside it is `green-500`. You get the direction at a glance without six colored
numbers fighting the six values above them.

---

## Tables, by decision

### How tall is a row?

Decide from what the reader does with 100 of them, in this order:

- **Scanning a ranked list for the top few** (traffic sources, error groups, leaderboards): **28–32px**,
  single line, no separators. Plausible = 32. This only works if each row is one short string plus one
  number.
- **Comparing values down a column** (finance, ops tables, admin lists): **36–44px**. Yahoo = 40,
  AG Grid = 42, Radix = 44. This is the default for a table of facts.
- **Reading a table inside prose** (docs, reference): **44–52px**. Vercel docs = 48. Rows may wrap;
  the extra height buys breathing room between wrapped lines.
- **Rows carrying two lines of content** (title + metadata, the "list not table" shape): **60–80px**.
  GitHub PRs = 63.3, Actions runs = 79 with 16px padding.
- **Anything touched with a finger**: 44px minimum, and reconsider whether it should be a table at all.

The generic default is 48–56px everywhere, justified by "44px touch targets." That guideline is
about fingers. Applying it to a 200-row pointer-driven table costs you half the visible rows and makes
the product feel like a phone app on a monitor. **When you do not know, use 40.**

Two follow-on rules the measurements make obvious:

- **Padding is not height.** shadcn's rows are 49px because `p-2` (8px) + 20px line-height + a 1px
  border, computed. AG Grid's are 42px because the row height is *declared* and the cell is
  `align-items: center` with `padding: 0 16px`. Declaring the height and centering is more robust:
  a row with an inline badge or an avatar will not grow.
- **The header can be shorter than the rows.** Yahoo: header 34.5px, body 40px. This reads as
  "the header is chrome, the rows are content." The opposite (MUI: header 56, rows 52) reads as
  a chunky app frame.

### Where do borders go, and how dark?

- **Horizontal only.** Zero of nine measured tables draw vertical column rules. If your columns need
  vertical rules to be legible, your column gaps are too small — fix the gaps.
- **One rule per row boundary, at 8–12% black.** Target contrast **1.2–1.35:1**. In practice:
  `rgba(0,0,0,0.08)` on white, `rgba(255,255,255,0.10)` on a dark ground.
- **Put it on the cell, not the row, if you want it to respect the table's rounded corners.** Radix
  ships `box-shadow: inset 0 -1px rgba(0,9,50,0.12)` on `td`, because `border-collapse` plus
  `border-radius: 7px` on the table root fight each other. That's a real implementation constraint,
  not a style preference.
- **Top border vs bottom border matters at the ends.** GitHub uses `border-top` on each row, so the
  first row's rule sits under the header and no stray rule hangs below the last row. shadcn uses
  `border-bottom` on every row plus `[&_tr:last-child]:border-0` to undo it. Both work; picking one
  and being consistent is the point.
- **No outer box unless the table floats on a colored ground.** A 1px box around a table sitting on
  white adds a container that carries no information. Radix uses `radius: 7px` on the table root
  because their table *is* a surface with a fill; Vercel docs and GitHub have none.

### Zebra striping: almost never

One of nine measured tables uses it, and it's MDN's reference tables — many narrow columns, wrapped
prose in cells, no other structure — at `#f7f7f8` vs `#fff`, a **1.07:1** difference.

Use zebra when **all** of these hold:
- more than ~6 columns, so the eye can lose its row on the way across;
- cells wrap, so rows have unequal heights and a rule is not enough;
- rows are not selectable or hoverable (a hover tint on top of zebra produces four states, two of
  which are indistinguishable).

Otherwise a 1px rule at 1.2:1 does the same job with less noise. And if you do stripe: **use a
1.05–1.10:1 tint, and drop the row rules.** Stripes plus rules plus a hover tint is three
row-delimiting systems doing one job.

### Alignment, and the three exceptions

- **Text left. Numbers right. Always, with `tabular-nums`.** The point of right alignment is that
  the ones column stacks, so `1,204` and `93` and `12,900` compare at a glance. Tabular figures make
  every digit the same advance width, so the decimal points actually line up rather than nearly
  lining up. Without both, the column is decorative.
- **Exception 1 — IDs and codes** (`TASK-7839`, `bom1`, `ap-south-1`, `ENG-2380`): left, monospace or
  tnum, because they're identifiers you match character by character, not magnitudes you compare.
- **Exception 2 — a single-digit-range column** (a 1–5 rating, a count that never exceeds 9): center
  or left is fine; there's nothing to align.
- **Exception 3 — dates.** Right-align a fixed-format sortable timestamp (`2026-09-09 22:48:02.629`
  — Grafana's log column does exactly this in monospace, fixed width). Left-align a humanized one
  ("2 days ago", "Oct 9"). The test is whether the strings are the same length.

And the rule everyone forgets: **the header takes its column's alignment.** A right-aligned number
column with a left-aligned header is the single most common alignment bug in generated tables.
Yahoo right-aligns `Price`, `Change`, `Change %`; left-aligns `Symbol`, `Name`.

### Column sizing and truncation

Real tables commit to a width strategy per column rather than letting the browser decide:

- **One flexible column** — the name/title — takes the remaining space and truncates. Plausible:
  the source column is `grow w-full truncate`, the value column is `w-32 min-w-32 text-right`
  (a fixed 128px). One flexible, the rest fixed, is the whole pattern.
- **Numeric columns are fixed-width, sized to the widest plausible value plus padding**, not to
  content. If they resize as data changes, the table shimmers on every refresh.
- **`white-space: nowrap` requires `text-overflow: ellipsis`.** shadcn's `tasks` cells are
  `whitespace-nowrap` with `text-overflow: clip` — the measured computed value — so long titles are
  cut mid-glyph rather than elided. Yahoo and MUI both ship `nowrap` + `ellipsis`. If you set one,
  set both, plus `overflow: hidden` and a `min-width: 0` on the flex parent, or the ellipsis never
  appears.
- **Truncate identifiers in the middle**, not at the end: `sk_live_51H…8fQz` beats
  `sk_live_51HxKq2eZv…`. The distinguishing characters in keys, paths and hashes are at both ends.
- **Anything truncated needs its full value reachable** — `title` attribute at minimum, a tooltip if
  the cell is interactive.

### Hover, selection and row actions

Measured hover states, at rest → hovered:

| Product | Hover background | Contrast | Anything move? |
|---|---|---|---|
| shadcn `tasks` | `oklab(.97 …/.5)` ≈ `#fafafa` | 1.04 | no; `transition: background-color .15s cubic-bezier(.4,0,.2,1)` |
| Plausible list row | `gray-100 @60%` ≈ `#f8f8f9` | 1.06 | no |
| GitHub PR row | **none** | — | link underline only |
| Radix Themes table | **none** | — | — |
| Vercel docs table | **none** | — | — |

Two findings worth internalizing:

1. **Three of five real tables have no row hover at all**, because their rows are not clickable as a
   whole. A hover tint is a *promise that the row is a target.* If clicking the row does nothing,
   the tint is a lie and the table feels twitchy for no reason.
2. **When there is a hover, it is a 1.04–1.06:1 background tint and nothing else.** No border
   appearing (which shifts every subsequent row by 1px unless you reserve it), no shadow, no
   translate, no scale. Sweeping the cursor down 30 rows should produce zero motion.

For selection, use a stronger version of the same tint (roughly 2–3× the hover alpha) plus a
persistent affordance — a checkbox, not just color. Plausible's *selected metric tile* uses
`gray-100 @70%` (1.07:1) versus `@60%` on hover — nearly identical, which works only because the
selected tile also drives the chart, so the state is confirmed elsewhere. In a table, do not rely on
a 0.01 contrast difference to mean "selected."

**Inline actions vs a row menu:** shadcn's `tasks` renders both the checkbox and the `⋯` menu at
`opacity: 1, visibility: visible` at rest — not hidden until hover. That is the right default.
Hidden-until-hover actions are undiscoverable, unreachable by keyboard without extra work, and
invisible on touch. Use a persistent `⋯` menu when there are 3+ actions; use up to two persistent
icon buttons when there are ≤2 and they're used constantly. Reserve the action column's width
whether or not the buttons are visible, so nothing reflows.

### Sorting

- The sortable header is a **button**, and the entire header cell is the hit area.
- **Show the indicator only on the active column**, and show direction. A neutral up/down glyph on
  every sortable header is noise on 8 columns; the affordance is the hover state plus the cursor.
- Sort indicators go **after** the label in a left-aligned column and **before** it in a
  right-aligned column, so the label stays flush with its column edge.
- **A sorted table must say so above the fold.** If the user scrolls past the header, the sort state
  vanishes — this is the main argument for sticky headers in sortable tables, stronger than "so you
  can read the labels."
- Default sort is a product decision, not "the first column ascending": most-recent-first for event
  logs, largest-first for rankings, alphabetical only when the reader knows the name they want.

### Sticky headers and pinned columns

Measured mechanics:

- Yahoo pins the **first column**: `position: sticky; left: 0`, `z-index: 1` on the `th` and `2` on
  the `td`, an **opaque `#fff` background**, and a `1px #dde0e4` right border (1.32:1) as the seam.
  **No shadow.**
- AG Grid pins **top rows and left cells**: `position: sticky`, `z-index: 2`, opaque white,
  `border-bottom: 1px #181d1f @15%`.

The rules that fall out:

1. **A sticky cell must have an opaque background.** Sticky + `background: transparent` = the
   scrolling content shows through it. This is the single most common sticky-header bug.
2. **Give it a 1px seam, not a shadow.** Both production examples use a border. A drop shadow under
   a sticky header is fine as a scroll-position cue but reads as a floating panel if it's always on;
   if you want it, fade it in only once `scrollTop > 0`.
3. **Explicit `z-index` on both header and pinned cells,** or they'll collide at the corner.
4. **Sticky headers need a scroll container with a bounded height** to be useful; `position: sticky`
   on a `thead` inside a page that scrolls the whole document works, but the header then sticks to
   the viewport top and collides with your app chrome — offset it with `top: <header height>`.
5. Pin **at most one** column, and make it the identity column (symbol, name, ID). Two pinned
   columns on a 1440px screen eat a third of the horizontal space.

### Pagination vs virtual scroll

| Rows | Use | Why |
|---|---|---|
| < 100 | render all, no pagination | Pagination controls cost more attention than the rows they hide. |
| 100 – ~5,000 | pagination **or** virtual scroll | Pagination if rows are addressable and shareable (page 3 of search results); virtual scroll if the reader is hunting. |
| > 5,000 | virtual scroll, server-side | AG Grid's demo virtualizes 100k+ rows at 42px each; the DOM holds ~30. |

Whichever you pick:
- **The total count is not optional.** "1–25 of 1,240" tells the reader whether to filter first.
  A `Next` button with no count is a maze.
- **Virtual scroll breaks Ctrl+F, deep links to a row, and print.** If any of those matter — an
  audit log a compliance reviewer needs to search, an invoice table someone prints — paginate.
- **Never mix them.** A virtualized list inside a paginated shell has two scroll positions and
  neither is restorable.
- Preserve scroll position and page number in the URL. If a user opens a row and hits back, landing
  at row 1 is the bug they'll remember.

### Empty, loading, error and too-much

Every table ships four states beyond "has data." The measured examples:

- **Loading.** Plausible's not-yet-loaded panels render a centered spinner **inside a card that already
  occupies its final height** — the dashboard does not reflow when data lands. That is the whole
  trick. If you use skeleton rows instead, render **the same number of rows at the same height** as
  a typical result, not three.
- **Empty (no data yet).** Explain the state and offer the action that ends it: "No invoices yet —
  create your first invoice." A shrug illustration and the word "Empty" is not a state, it's a
  screenshot.
- **Empty (filters exclude everything).** A *different* state, and the more common one. It must name
  the filters and offer to clear them: "No results for 'refund' in Last 7 days. Clear filters."
  Generated tables almost always ship one empty state for both, which strands the user inside a
  filter they've forgotten they set.
- **Error.** Keep the table chrome (header, filters) so the user can change what they asked for,
  and put the error in the body with a retry. Replacing the whole screen with an error card
  destroys the context needed to recover.
- **Too much.** 50,000 rows is a state. Show the count, and push the user toward filtering or export
  rather than rendering it.

Grafana's "No data" centered in a panel that keeps its full height is the right shape: **states swap
content, never layout.**

---

## Dashboards, by decision

### What is this dashboard for?

A dashboard answers a **question a named person asks on a schedule**. Write the question down before
you place a single tile:

- "Is anything on fire right now?" → status, thresholds, red/green, refreshes on a timer.
- "Are we ahead or behind plan this month?" → totals, deltas vs plan and vs last period, no live refresh.
- "What changed, and why?" → drilldown from a chart into a filtered list of the underlying rows.

Those are three different pages. A grid of tiles that serves all three serves none. Cloudflare Radar
is "what is the internet doing right now, globally," and every panel on it answers a sub-question
that is *written under the panel title in a sentence*: "Percentage of bot vs. human HTTP requests to
HTML content." If you cannot write that sentence for a panel, delete the panel.

### The metric-tile grid, and why it fails

The default generated dashboard is 4–8 cards in a grid, each with a label, a big number, and
sometimes a percentage. It fails for reasons you can name:

1. **The numbers have no comparison,** so no value is interpretable. Is 3,847 sessions good?
2. **Everything is the same size,** so nothing is more important than anything else, so the eye has
   no entry point.
3. **The tiles are inert.** They display; they don't filter, drill, or select.
4. **The tiles and the charts below them are unrelated,** so the page is two dashboards stacked.

Plausible's top row fixes all four with one move: **the six tiles are a radio group.** Clicking
`BOUNCE RATE` re-plots the chart underneath in bounce rate. The tiles are the chart's legend, the
chart's series selector, and the summary, all at once — which is why the chart needs no legend at
all. Selected state is `gray-100 @70%`; each tile carries its delta vs the previous period; total
tile height is 64.8px, so all six fit in one 80px row and never compete with the chart.

If your tiles cannot become controls, at minimum give every one of them a comparison and make the
one that matters most physically larger.

### What goes above the fold

Ranked, and this is a real ranking, not a list:

1. **The one number the page exists to report,** with its comparison.
2. **The trend behind it** — one chart, wide, so the shape is readable.
3. **The controls that change 1 and 2** — time range, scope. Radar puts the scope selector
   ("Worldwide") *beside the page title* and the time range ("Last 7 days") at the far right of the
   same row, which reads as "this whole page is about X, over Y."
4. **The breakdown** — what composes the number. Below the fold is fine.

Nothing else. A "recent activity" feed above the fold on a metrics dashboard is filler.

### Comparison and context

**A number without a comparison is nearly useless.** Pick at least one:

- **vs. previous period** — the default. Plausible: `↗ 2%` beside every tile. Cloudflare Radar draws
  the previous 7 days as a **dashed line in the same hue as the current series** — no second color, no
  second legend entry, and the legend says exactly "Previous 7 days."
- **vs. plan/target** — a reference line on the chart, labeled at the line, not in a legend.
- **vs. peers/segments** — small multiples (below).
- **vs. its own distribution** — "p95: 340ms" carries more than "avg: 120ms" for latency.

Two failure modes to avoid: comparing to a period of a different length (28 days vs "this month"),
and comparing to a period that isn't complete yet (today's partial data vs a full day). Radar solves
the second visibly: the trailing incomplete bucket is filled with a **diagonal hatch pattern**
(`fill: url(#xy-incomplete-data-…)`) so the dip at the right edge reads as "not finished" instead of
"traffic collapsed." That is a five-line fix for the most common misread on every live chart.

### Time range, filters and persistence

- **Time range lives top-right, is a single control, and shows the resolved range**, not just a
  preset name. "Last 7 days" is fine as the label; the axis and any tooltip should make the actual
  dates unambiguous.
- **Presets first, custom second.** Grafana's toolbar is `« | ⏱ Last 6 hours ▾ | » | zoom-out |
  ↻ Refresh | 30s ▾` — the arrows step the window back and forward by its own length, which is the
  most-used interaction on any time-series dashboard and is almost never implemented in generated
  ones.
- **Every filter goes in the URL.** Grafana persists `cluster`, `instance` and the data source as
  query params. If a user cannot paste a link to what they're looking at, the dashboard cannot be
  used in an incident, a standup, or a ticket. This is the highest-value, lowest-effort thing on this
  page.
- **Filters persist across navigation within the dashboard,** and reset explicitly. Show active
  filters as removable chips; never hide an active filter behind a collapsed panel.

### Drill-down

Every aggregate should have a path to its rows. Plausible's ranked list rows are links that add a
filter to the whole dashboard rather than navigating away — the page stays, the scope narrows, and
the filter appears as a removable chip. Radar's panels each carry an "open" arrow to a dedicated
page with the full breakdown. Both are better than a chart that is only a picture.

The minimum viable drill-down: clicking a bar/slice/row **applies it as a filter** and the filter is
visible and removable. Do not open a modal.

### Refresh and staleness

If the data can be stale, say when it was fetched. Options, in ascending cost:

- A timestamp: "Updated 22:48 UTC." Note that Radar labels **every** timestamp with its zone
  (`Sep 9, 2026, 03:30 UTC`). Dashboards get screenshotted and pasted into incident channels; an
  unlabeled time is a future argument.
- A relative age that ticks: "Updated 2m ago."
- An explicit refresh button, plus an optional auto-refresh interval the user picks. Grafana:
  `↻ Refresh` and a `30s ▾` dropdown, separate controls.

**Do not auto-refresh silently under a reader's cursor**, and never auto-refresh a page where the
user can be mid-selection. If new data arrives while they're reading, offer it ("New data available
— refresh") rather than swapping it in.

---

## Charts, by decision

### Which chart, from the question

| The question | The chart | Not |
|---|---|---|
| How did this change over time? | line (continuous) or bar (discrete periods) | area stack, which hides individual series |
| How do these categories compare? | horizontal bar, sorted by value | vertical bar with rotated labels; pie |
| What composes this total? | one stacked bar, direct-labeled — Radar's `Bot 57.6% / Human 42.4%` | pie or donut with a legend |
| How are these two related? | scatter | dual-axis line, which manufactures correlation |
| How is this distributed? | histogram, or a p50/p95/p99 readout | an average |
| Are these many things each trending? | small multiples | one chart with 12 series |
| What is the current level vs a limit? | a labeled bar with a threshold marker | a gauge |

**Radar's split bars are the pattern worth copying for parts-of-a-whole:** a single horizontal bar
of 2–4 segments, with the labels *above the bar* as `● Bot 57.6%` `● Human 42.4%`, name at ~13px and
value at ~24px bold. No legend, no pie, and the numbers — which are what the reader actually
came for — are the largest thing in the panel.

### Killing chart junk

Delete, in this order: 3D, drop shadows, gradients that don't encode anything, background fills
inside the plot area, borders around the plot area, vertical gridlines on a time series, tick marks,
axis lines heavier than the gridlines, data-point dots on a line with more than ~30 points, the
legend when there are ≤2 series, and decimal places nobody reads (`43%`, not `43.28%`).

Plausible's chart, measured, contains exactly: 7 horizontal gridlines, 8 y labels, 6 x labels, one
2px line, one gradient area fill. That's it. No axis lines, no tick marks, no legend, no dots, no
plot border.

### Axis and gridline treatment

- **Gridlines: the text color at 10–15% alpha.** Observable Plot's default —
  `stroke: rgb(60,60,67); stroke-opacity: 0.1` — is the correct implementation because it inherits
  the theme: at 10% of whatever the ink is, it works in light and dark without a second token.
  Measured contrast: **1.18:1**.
- **One direction.** Horizontal for a time series (you compare values). Vertical only if the vertical
  lines are *category boundaries*, which is exactly what Radar does — dashed 3px lines at day
  boundaries, no horizontal gridlines at all.
- **The axis line should not be darker than the gridlines**, and usually shouldn't exist. Radar's is
  `oklab(0 0 0/.2)` = 1.61:1. Recharts' is **7.73:1** — as dark as body text — plus 13 tick marks at
  the same weight.
- **Tick labels: 10–12px, at 55–70% of the text color.** Measured: Plot 10px, Radar 11px @65%,
  Plausible 12px gray-500. Recharts' default of **14px** makes labels compete with the data.
- **Anchor them correctly.** Radar: y labels `text-anchor: end` (right-aligned against the axis),
  x labels `text-anchor: middle`. Left-aligned y labels are a giveaway.
- **Label 4–8 ticks, not every bucket.** 28 days → 6 x labels. And abbreviate: `2k`, `10k`, `1.8M`.

### Direct labeling vs legends

Prefer direct labels. In order:

1. **≤3 series:** label the line at its right end, in the series color. No legend.
2. **The tile is the label:** Plausible's chart needs no legend because the selected metric tile
   names it.
3. **Legend only when the series are toggleable or there are >3.** Then put it **above** the plot,
   horizontal, with the same marker shape as the mark (a dashed swatch for a dashed line — Radar
   shows `▬ Total bytes`, `▬ HTTP bytes`, `▪▪▪ Previous 7 days`).
4. **Never** a right-side vertical legend that steals 20% of the plot width, and never a legend whose
   order differs from the visual order of the series.

### Tooltips

- Trigger on the **nearest x value**, not on hovering the exact 2px line. A vertical crosshair plus a
  tooltip listing every series at that x is the standard for time series, and it's what makes a
  multi-series chart readable at all.
- **Show all series at that x, sorted by value descending**, with the hovered one emphasized. Not one
  value.
- **Header = the full timestamp with units and zone.** The axis says "Sep 4"; the tooltip says
  "Sep 4, 2026 14:00 UTC."
- **Values in tabular figures**, right-aligned in a two-column layout, with the unit.
- Position it so it never covers the point it describes, and flip it near the edges.
- No animation on the tooltip. It follows the cursor; a 200ms ease makes it lag behind reality.

### Small multiples and sparklines

- **Small multiples** beat a 12-series line chart: same y scale on every panel (this is the whole
  point — a shared scale is what makes them comparable), same size, 2–4 across, sorted by something
  meaningful, one label per panel, axis labels only on the leftmost and bottom panels.
- **Sparklines** belong inside table rows. Yahoo's are **50×20px `<canvas>`** in a cell. Rules:
  no axes, no labels, no gridlines, ~40–120px wide, 16–24px tall, one color, and a shared y-scale
  across rows **or an explicit note that each is scaled to itself.** Two sparklines at different
  scales side by side, undeclared, are a lie.
- **The 90-day strip** (GitHub Status) is the third form: 90 discrete rects, 3px wide, 34px tall, 5px
  pitch, in 448×34px, one green, no axis, endpoints labeled in words ("90 days ago" / "Today").
  For "has this been healthy," it beats a line chart at any size.

### Color assignment

- **One series: one color.** Plausible uses a single indigo, `oklch(0.585 0.233 277)` — 6.29:1
  against white, so the line is legible on its own, not just as a tint.
- **Two to five: the categorical ramp**, ordered so the most important series is the most saturated.
  Radar: dark blue `#0045a6` and cyan `#30b6da`, with orange only for a genuine third category.
- **Assign colors to *meanings*, not to array indices.** If "Bot" is dark blue in one panel it must be
  dark blue in every panel on the page. Index-based assignment is why generated dashboards have a
  metric that's purple here and green there.
- **Semantic colors stay semantic.** Reserve red/green for bad/good. Yahoo's positive change is
  `rgb(3,123,102)` — 5.21:1, a dark desaturated green that passes AA as text. The naive
  `#00c853` is **2.24:1** and unreadable at 12px.
- **Never encode a value in hue alone** for accessibility; pair with position, label, or pattern —
  as Radar does with a dashed line rather than a second color for the previous period.
- Recharts' defaults `#8884d8` (3.31:1) and `#82ca9d` (**1.93:1**) are the visual signature of an
  untouched chart library. Change them.

### Y-axis truncation

- **Bar charts: always start at zero.** The bar's length *is* the value; truncating the axis makes
  it a lie.
- **Line charts: truncating is legitimate and often necessary** — a server at 99.95% vs 99.99%
  uptime is invisible on a 0–100 axis. But then you must **label the axis range clearly** and
  never fill the area under the line (an area fill from a non-zero baseline re-introduces the same
  lie the bar chart had).
- **Say what you did.** Radar prints `Max` and `0` and normalizes; the reader knows the scale is
  relative. Silence plus a truncated axis plus a dramatic slope is the classic misleading chart.
- Never truncate on a chart a non-expert will screenshot out of context.

### Sparse and missing data

- **Zero and null are different.** A gap in a line means "no data"; a point at 0 means "measured
  zero." Render a gap for null, not a plunge to the baseline.
- **Mark incomplete buckets.** Radar's hatch fill on the trailing partial period is the reference
  implementation.
- **Missing scalar values render as `—`**, an em dash, as Radar does for ASN and Scope. Not `N/A`,
  not `null`, not `0`, not blank (blank is indistinguishable from a rendering bug).
- **Fewer than ~3 points is not a chart.** Print the numbers.
- **A chart with one category is not a chart.** Print the number.

---

## The fake dashboard problem

The characteristic failure of generated dashboards is not ugliness. It's that they are **plausible
and empty**: they look like a dashboard and answer nothing.

The tells, and what's actually wrong with each:

| The tell | Why it's fake |
|---|---|
| Metrics named `Total Revenue`, `Active Users`, `Conversion Rate`, `Bounce Rate` | Generic across every product ever built. A real dashboard has a metric only this business tracks: "Trial-to-paid within 14 days", "p95 webhook delivery latency", "Unreconciled transactions". |
| Four tiles, equal size, equal weight | Nothing is more important than anything, so the page has no entry point. |
| Numbers with no comparison, or a `+12.5%` that isn't computed from anything | The delta is a decoration. Wire it to real data or delete it. |
| Smooth, sinusoidal, always-up series | Real data is jagged, has weekly seasonality, and has at least one incident-shaped notch in it. Plausible's real 28-day series has four distinct weekend troughs. |
| A pie chart of 6 categories with a legend | Nobody compares 6 angles. Radar's stacked bar with values on top is what a real product ships. |
| A "Recent Activity" feed of invented events | Filler. It's there because the layout had a gap. |
| Every chart is a different type, one of each | Chart type chosen for variety instead of question. |
| Tiles and charts don't interact | The chart doesn't respond to the tiles, the tiles don't respond to the time range, nothing filters anything. |
| No time range control, or one that doesn't work | The most-used control on any real dashboard. |
| No timestamp, no refresh, no staleness | Real dashboards are read during incidents. Undated data is unusable then. |
| No empty state, no loading state | Which proves the data is hardcoded. |

**What to build instead.** Before writing markup, answer these six in one line each:

1. **Who** opens this, and **when**? ("On-call engineer, when paged." "Finance lead, first Monday.")
2. **What decision** do they make from it?
3. **What is the single number** that decision hinges on?
4. **What does that number get compared to** — previous period, plan, threshold, peers?
5. **What is the drill-down** when the number is bad?
6. **How fresh** must the data be, and how is that shown?

Then build in this order:

- One primary number, with its comparison, largest thing on the page.
- One chart of that number over time, full width, with a previous-period comparison.
- The controls that change both: time range top-right, scope beside the title, filters in the URL.
- Two to four breakdown panels that answer "what composes it" — sorted lists with in-row bars beat
  more charts. Plausible's breakdown panels are `Sources`, `Top pages`, `Locations`, `Devices`, each
  with tabs so one panel serves three questions and the page stays short.
- A timestamp and a refresh control.
- Empty, loading and error for every panel.

If you are generating a dashboard without real data, **use real-shaped fixture data**: weekday/weekend
seasonality, a spike, a partial trailing bucket, at least one null gap, a long label that must
truncate, and one row whose value is zero. A dashboard that has never been rendered against ugly data
has never been designed.

---

## When this advice is wrong

- **Dense rows (32–40px) are wrong for consumer and low-frequency interfaces.** A billing history a
  customer visits twice a year should be 56px rows at 15–16px type. Density is a trade of comfort for
  throughput; only make it when throughput is the job.
- **"No zebra" is wrong for wide reference tables and anything printed.** MDN stripes for a reason.
  Printed tables lose hover entirely and often lose light rules to the printer, so stripes at ~1.10:1
  become the only row-tracking mechanism.
- **"Right-align numbers" is wrong when the numbers aren't comparable magnitudes** — phone numbers,
  years, version strings, zip codes, ports. Those are identifiers. Left.
- **"Tabular figures always" is wrong for a single number in prose or a hero.** Tabular digits are
  slightly wider and more evenly spaced; in a headline they look mechanical. Use them where digits
  stack or where a number updates in place (a ticking counter, a timer) — the second case is the one
  people forget, and it's the one where proportional figures visibly jitter.
- **"No vertical gridlines" is wrong when the x axis is categorical and the categories are the
  point** — and wrong for calendar/day boundaries, where Radar's dashed verticals are exactly right.
- **"Start bars at zero" is wrong for diverging data** (change from baseline, sentiment −100..+100).
  There the baseline is zero-in-the-middle, and the axis should say so.
- **"Always show a comparison" is wrong for a live gauge** — current queue depth, active connections.
  There the comparison is the threshold, not the previous period.
- **"Virtual scroll above 5,000 rows" is wrong when the table must be Ctrl+F-able, printable, or
  linkable to a specific row.** Compliance and audit surfaces paginate.
- **"Sticky headers" are wrong on short tables.** Under ~15 rows they cost a repaint and a z-index
  bug for no benefit.
- **"Hidden-until-hover actions are bad" is wrong in an expert tool with keyboard-first
  interaction** — Linear-class products hide row actions because the user uses shortcuts and the
  visual quiet is worth more. Do this only when the shortcuts genuinely exist and are discoverable.
- **All of this is wrong if the product already has a design system.** A table that matches the
  existing one imperfectly beats a better table that doesn't match.

---

## What AI-generated data UI looks like, and the corrections

**1. The default shadcn table, unmodified.**
49px rows, `p-2`, `border-b` on every row at 1.26:1, everything left-aligned, 14px black text,
`whitespace-nowrap` with `text-overflow: clip`, zero tabular figures (measured: 1 element of 1,200).
→ **Correction:** set `font-variant-numeric: tabular-nums` on the `<table>`; right-align every numeric
`<td>` *and its `<th>`*; add `text-overflow: ellipsis` wherever `nowrap` is set; drop the separator
to `rgba(0,0,0,0.08)`; move the border to `border-top` so the last row has no trailing rule.

**2. Every column is `width: auto`.**
The browser sizes columns from content, so the table reflows on every data change and the number
column is 40px wide while the description column is 800px.
→ **Correction:** one flexible truncating column, everything else fixed. Plausible: `grow truncate`
for the label, `w-32 min-w-32 text-right` for the value.

**3. Borders on all four sides of every cell.**
The spreadsheet look. Nine of nine measured production tables have zero vertical rules.
→ **Correction:** horizontal only, 1px, ~8% black. If columns feel loose, increase padding to
`8px 12px` — don't add lines.

**4. `hover:bg-muted/50` on rows that aren't clickable.**
A promise of interactivity the row doesn't keep.
→ **Correction:** hover tint only where the whole row navigates or selects. GitHub, Radix and Vercel
all ship tables with no row hover at all.

**5. Hover states that move things.**
`hover:shadow-md`, `hover:scale-[1.01]`, or a border appearing on hover (which shifts every row below
it by 1px). Measured: not one production table moves anything on hover.
→ **Correction:** background-color only, 1.04–1.06:1, `transition: background-color 150ms`.

**6. Recharts/Chart.js defaults, untouched.**
`#8884d8` + `#82ca9d` (1.93:1), dashed gridlines in both directions, a `#52525b` axis line at 7.73:1,
14px tick labels, a dot on every point, and a legend for two series.
→ **Correction:** gridlines = text color at 10% opacity, horizontal only; delete the axis line and
tick marks; tick labels 11px at ~60% ink; your own two colors, both ≥3:1; no dots above ~30 points;
direct-label instead of a legend.

**7. Four equal metric tiles with invented deltas.**
→ **Correction:** make the tiles a selector that drives the chart (Plausible), or make one tile
dominant. Every delta must come from a real previous-period query. Color the arrow, not the number.

**8. A pie chart.**
→ **Correction:** a single stacked horizontal bar with the labels and values above it, Radar-style;
or a sorted horizontal bar chart. Reach for a pie only for a true 2-way split you're not asking
anyone to measure.

**9. No time-range control, or one that doesn't filter anything.**
→ **Correction:** presets + custom, top-right, plus step-back/step-forward arrows; and put the
resolved range and every filter in the URL.

**10. The chart y-axis prints `0, 1000, 2000, 3000…` at full precision, every bucket labeled on x.**
→ **Correction:** 4–8 y ticks, abbreviated (`2k`, `1.8M`); 4–8 x ticks for any range (28 days → 6).

**11. Three states missing: loading, empty-because-no-data, empty-because-filtered.**
Generated tables ship one empty state, or none.
→ **Correction:** all four states, and loading must occupy the final height so nothing reflows when
data lands.

**12. Fabricated data that is too smooth.**
Monotonic upward sine waves, round numbers, no gaps, no partial trailing period.
→ **Correction:** fixtures with weekly seasonality, one spike, one null gap, one zero row, one label
long enough to truncate, and a partial current bucket rendered as incomplete.

**13. Timestamps without a zone, on a page people screenshot.**
→ **Correction:** `Sep 9, 2026, 03:30 UTC`. Radar labels every one.

**14. `N/A`, `null`, `undefined`, or `0` in place of a missing value.**
→ **Correction:** `—`.

---

## Self-check list

Run this against your own output before you call a data surface done.

**Table structure**
- [ ] Row height is a deliberate number tied to the reading task (32 / 40 / 48 / 64+), not a default.
- [ ] Exactly one horizontal separator system: rules **or** stripes **or** neither. Never two.
- [ ] Separator contrast against the row background is between 1.2:1 and 1.4:1. (Compute it.)
- [ ] There are no vertical column borders.
- [ ] There is no box around the table unless the table sits on a colored ground.

**Numbers**
- [ ] `font-variant-numeric: tabular-nums` is set on the table root.
- [ ] Every numeric column is right-aligned, **and so is its header**.
- [ ] Identifiers (IDs, codes, regions) are left-aligned, not right.
- [ ] Currency/percent units appear once — in the header or on each value — not both.
- [ ] Missing values render `—`.

**Columns**
- [ ] Exactly one column flexes; the rest are fixed-width.
- [ ] Every `white-space: nowrap` is paired with `text-overflow: ellipsis` and `overflow: hidden`.
- [ ] Truncated values are reachable via `title` or a tooltip; IDs truncate in the middle.

**Interaction**
- [ ] Rows have a hover tint **only** if the whole row is clickable.
- [ ] Nothing moves on hover — no shadow, no border appearing, no transform. (Sweep the cursor down
      30 rows and watch.)
- [ ] Row actions are visible at rest, and their column width is reserved either way.
- [ ] The sort indicator appears only on the active column, and shows direction.
- [ ] Sticky cells have an opaque background, an explicit `z-index`, and a 1px seam (not a shadow).
- [ ] The total row count is displayed.
- [ ] Filters, sort, page and time range are all in the URL.

**Dashboard**
- [ ] I can state the question this page answers, and who asks it, in one sentence.
- [ ] Every metric has a comparison, and I can name where the comparison number comes from.
- [ ] The largest thing on the page is the thing that matters most.
- [ ] The tiles and the chart are wired to each other, or the tiles are gone.
- [ ] There is a time-range control, and changing it changes everything on the page.
- [ ] There is a visible data timestamp with a timezone.
- [ ] Every aggregate has a drill-down that applies a visible, removable filter.

**Charts**
- [ ] Chart type was chosen from the question, and I can name the question.
- [ ] Gridlines are the text color at ~10% opacity, in one direction only.
- [ ] The axis line is not darker than the gridlines, or doesn't exist.
- [ ] Tick labels are 10–12px at 55–70% ink; 4–8 ticks per axis; values abbreviated.
- [ ] ≤3 series are direct-labeled; the legend, if any, is above the plot and uses the mark's shape.
- [ ] Bar charts start at zero. Truncated line axes are labeled as such.
- [ ] Null renders as a gap, not as zero.
- [ ] Incomplete trailing periods are visually marked.
- [ ] Series colors are assigned by meaning and consistent across every panel.
- [ ] No default library palette survives.

**States**
- [ ] Loading occupies the final height — data landing causes no reflow.
- [ ] Empty-with-no-data and empty-because-filtered are two different states, and the second names
      the filters and offers to clear them.
- [ ] The error state keeps the table chrome and offers retry.
- [ ] I rendered it at 1440 and 390, opened the PNGs, and looked at them.

---

## How these numbers were obtained

Every value came from one of two scripts run against the live site with Playwright at a 1440×1100
viewport and a real desktop UA string:

- **Computed styles and geometry** — `getComputedStyle` plus `getBoundingClientRect` on `table`,
  `thead`, `th`, `tbody tr`, `td`, `[role=grid]/[role=row]/[role=gridcell]`, and on auto-detected
  repeating-row containers (any element with ≥5 children of uniform height between 18 and 140px and
  width > 200px). Row heights are measured boxes, not declared CSS.
- **SVG chart internals** — for every `<svg>` over 200×80px: a histogram of
  `stroke | stroke-width | stroke-opacity | stroke-dasharray` across its `line`/`path`/`rect`
  children, the computed `font-size`/`fill`/`text-anchor` of its `<text>` nodes, and a fill histogram.

Hover states were measured by calling `page.hover()` on the third row and re-reading the computed
background, height and top offset. Contrast ratios were computed from the measured sRGB values
(alpha composited over the measured background first) with the standard WCAG relative-luminance
formula.

Sites measured: Plausible live demo, Cloudflare Radar, Grafana Play, GitHub (pull requests, Actions,
Status), Yahoo Finance, Vercel docs, Linear, Radix Themes docs, shadcn/ui `tasks` example,
MUI DataGrid docs, AG Grid 100k-row demo, MDN, Observable Plot docs, Recharts examples.
