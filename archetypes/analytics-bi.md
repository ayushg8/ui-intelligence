# analytics-bi

**Evaluated:** 2026-09 · **Density:** compact · **Dark by default:** no — light, unless the screen is *watched* rather than *asked*. Grafana defaults dark because it is a monitoring wall in a dim room; Rill, Plausible, Hex (white result grid) and PostHog all default light because the answer gets read in an office and then pasted into a doc or a deck. Ship dark as a real second theme, not as the default.

> Someone has a question with a number in it — "did signups drop, and if so where" — and this screen has to answer it, show what it is being compared against, and let them not believe it.

## When this is the right archetype

The users are analysts, PMs, growth and ops people. They open this two to twenty times a day, in sessions of three to thirty minutes, always with a question already in their head. Stakes are indirect but real: the output becomes a decision, a headcount request, or a slide, and a wrong number that looks confident is worse than no number. They are not browsing — they are testing a hypothesis, and the sequence is always *look → doubt → slice → confirm*. Which means the screen's job is not to display data. It is to make an argument, expose its basis, and let the user attack it.

**Choose this over…**

- **`enterprise-dense`** when the primary object is an aggregate, not a record. If the user's next action after finding the row is *doing something to that row* (approve, assign, refund), it is `enterprise-dense` and the chart is garnish. If the next action is *slicing further*, it is this.
- **`data-terminal`** when the session ends. A terminal is watched continuously, on a second monitor, by someone whose job is to notice change within seconds; it earns 11–12px, dark, no prose, and audible alarms. BI is opened, used, and closed — it can afford annotation, comparison controls, and light mode.
- **`ai-product`** when the answer must remain inspectable. A chat surface that returns a number is not this archetype unless the chart, the filters and the query stay on screen and stay editable. Question-first entry (Rill's `@`-mention box, Amplitude's "What do you want to know about your product?", Hex's natural-language prompt) is a *guest* pane inside an `analytics-bi` host — it composes the query; it does not replace the evidence.

## When it is the wrong one

- **An embedded usage tab inside a SaaS product.** "You used 41,200 of 50,000 credits this month" is one question with one answer for a non-analyst. Apply this archetype and you ship a time-range picker they will never open, a comparison toggle that has nothing to compare, and a dimension leaderboard over a dimension of cardinality 1. Use one number, one bar, one sentence.
- **An executive or board report.** Read once a quarter, often printed, no interaction. That is `editorial`: 16px body, generous measure, the chart as a figure with a caption, and the argument written out. Compact BI density on a quarterly read is hostile.
- **A live ops wall — trading, dispatch, NOC.** Continuous watching inverts the priorities: no annotation, no drill-down, no light mode, and colour reserved entirely for state. `data-terminal`.
- **A "reports" tab bolted onto a CRM.** If there are six saved charts and no ad-hoc query path, you do not need this machinery. A `enterprise-dense` page with three panels beats a half-built BI shell.
- **Anything where the numbers are legally binding** — statements, invoices, regulatory filings. Exploration UI implies the number is provisional. `fintech-institutional`.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Rill** (`ui.rilldata.com/demo`) | The clearest working answer to "what replaces the tile grid" — and a product most engineers have never opened | Each measure is one horizontal band: label, value, and its own time series, all bands sharing one x-axis. You compare *shapes down the column*, not numbers from memory. |
| **Plausible** (`plausible.io/plausible.io`, live and public) | Metric tiles that earn their space by being controls | The six metrics are **tabs**: clicking "Bounce rate" re-plots the main chart. A tile that does nothing when clicked is a label. |
| **Grafana Play** | The reference time-range cluster — and the canonical empty-state disaster | `« 🕐 Last 30 minutes ⌄ » 🔍− ↻ Refresh 30s ⌄` — window steppers flanking the picker, zoom-out, and refresh with its own interval, as one control group. |
| **Observable Framework** | A dashboard treated as a document with honest chart defaults | `--font-big: 700 32px/1` for a big value, a four-colour theme palette (`#4269d0 #3ca951 #ff725c #efb118`), and a paragraph of prose under the plot explaining what it shows. |
| **Hex** | Notebook density; the analysis and its output in one scroll | 24px result-grid rows with a left index gutter and a header band at the same 24px (measured in `references/enterprise-and-dense-b2b.md`). |
| **PostHog** | The tightest control geometry measured anywhere | `--button-height-base: 30px` with `--button-padding-x-base: 6px`; skeletons on `2s -1s` so a fresh one mounts mid-shimmer. |
| **Amplitude** | Nav depth for a product with hundreds of saved views | Three-deep collapsible left rail with per-section chevrons under a single ~32px global bar. |
| **Sigma** | Freshness stated as a product promise, in the UI | "Live query only (no extracts) — control caching and refresh so teams get speed without losing freshness." The refresh policy is a visible feature, not a footnote. |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **13px/18px** chrome, **12px/18px** data plane | Rill's whole app is 12/18 Inter — 159 of ~210 text nodes on the explore screen. Grafana runs 14px chrome against 12/18 data (5,556 of 5,798 nodes). The eye calibrates to the dominant size; dropping the data plane one step says "this is a field, scan it," and buys ~6 leaderboard rows per panel. |
| Dense/secondary text | **11–12px**, muted (`oklch(0.556)`-class gray) | Rill's `(Expand Table)` and column headers are 12/18 muted; Plausible's `Source` / `Visitors` headers are 12/16 w500. Axis tick labels live here too — they are read peripherally and must not compete with the marks. |
| Page title | **16–20px / w600**, once | The dashboard's name is furniture; the *question* lives in the panel title. Rill sets its dashboard name at 12/18 w700 in a breadcrumb and spends nothing else on it. Do not ship a 30px page heading above a 25px measure value. |
| Row / list-item height | **22–24px** for result grids and leaderboards; **32px** when the row is a filter target | Rill's leaderboard `<tr>` is 22px with `padding: 0 8px`; Hex's result grid is 24px; Grafana's table 23.8px. Plausible goes to 32px because every row is a click that adds a filter — a 22px click target with a bar behind it is a mis-tap. |
| Control height | **26–30px** | Rill's filter bar row is 26px; PostHog's default button is 30px tall with 6px horizontal padding. A 40px control row costs two leaderboard rows, twice (time bar + filter bar). |
| Sidebar width | **0 or 224–256px** | Rill and Plausible ship *no* rail — breadcrumb plus toolbars — because horizontal pixels are chart pixels. Take a rail only when saved views number in the dozens; then Amplitude's collapsible three-deep at ~240px, not Grafana's 319px. |
| Content max-width | **None on the chart pane**; 1440px page cap; **68–72ch** on any prose | Observable Framework caps at `--observablehq-max-width: 1440px`. A time series is a shape read across; letterboxing it into a 1120px column throws away resolution you paid a query for. |
| Radius (control / container) | **4px / 6px** | Plausible: 4px ×57, 6px ×23. Rill: 4px and 2px, plus `9999px` on 216 elements — all of them bars and pills, never a panel. Grafana: 6px ×421. 12px+ radii on a 22px row eat the row. |
| Border weight & colour | **One 1px hairline**, alpha over the surface. Chart gridlines one step lighter than it | Rill uses `1px oklab(0.922 0 0)` (≈#E5E5E5) 80 times; Plausible `1px oklch(0.92 0.004 286.32)`; Grafana `1px rgba(204,204,220,0.12)` 297 times on one screen. If the gridline is as strong as the panel border, the grid reads as structure and the data reads as decoration. |
| Elevation | **Borders. One shadow token, for overlays only** | Plausible's panels use `0 1px 3px rgba(0,0,0,.1), 0 1px 2px -1px` with a 0-width border — a shadow *instead of* a border, not both. Tooltips and menus genuinely float; panels do not. |
| Motion (micro / standard) | **120–150ms / 180ms**, and **0ms for data on refresh** | Plausible transitions its metric values at `0.15s cubic-bezier(0.4,0,0.2,1)`. A dashboard on Grafana's default 30s refresh redraws 2,880 times a day; a 400ms bar-grow on each is 19 minutes of animation per day per viewer. |

**Big-value sizing, measured across three products:** Plausible 19.2px/28.8 **w600**, Rill 25.6px/38.4 **w400**, Observable Framework `700 32px/1`. The rule that falls out: **20–32px, and weight goes down as size goes up.** A 48px number in w700 is not emphasis, it is a poster.

## Colour

**Neutrals: near-zero chroma, cool or none.** Rill's grays are literally `oklab(L 0 0)`; Grafana's hairline is a faintly cool `rgba(204,204,220,…)`; Plausible sits at hue 286 with chroma 0.004–0.016. This is not taste — a warm gray ground shifts perceived hue on orange and red series and makes a two-colour chart look like a three-colour one. Take the default ramp from `system/3-tokens.md` and drop chroma to ≤0.005, hue to 250–290 or 0.

**Two separate colour budgets, and they must not touch.** UI colour (one accent: primary action, active filter chip, selection, focus ring) and data colour (the series palette). The one legal overlap: when a chart plots exactly **one** series, that series may be the accent — it is the subject of the screen. Rill and Plausible both do this and it reads correctly. The moment a second series appears, the accent retreats to UI-only and the categorical palette takes over, or the user will read "the blue line" as "the selected thing."

**Series palette: use a tested set, cap it at five.** shadcn's `--chart-1..5` are Tailwind `blue-300/500/600/700/800` — a sequential ramp used as a categorical palette, ΔE 5.8 between neighbours (measured in `craft/color.md`). Use IBM's CVD-safe five (`#648FFF #785EF0 #DC267F #FE6100 #FFB000`) or Observable's four (`#4269d0 #3ca951 #ff725c #efb118`). Past five categories no palette separates; group the tail into "Other" and let the user drill in. **Direct-label the series** — a legend mapping five colours to five names already failed for 1 in 12 men.

**Semantic colour encodes valence, not direction.** Plausible renders bounce rate `43% ↘2%` in green and visit duration `7m24s ↗4%` in green — down is good for one, up is good for the other, and the product knows which. A delta chip coloured by the sign of the number is a bug that ships as a feature. Reserve red/green for *change with a known valence* and never for series identity.

**Light by default.** The test is not "is this a developer tool," it is **is the screen watched or asked?** Watched (wall display, NOC, dim room, 30s refresh) → dark. Asked (session-based, office lighting, output leaves the app as a screenshot into a deck or doc) → light. In dark, the categorical palette needs lightness raised and chroma dropped or thin 1px series lines vibrate against a near-black ground; gold `#FFB000` at 1.83:1 on white is fine as a filled area and illegible as a 1px line, so darken the light end for line charts.

## Type

**A neutral grotesque with real tabular figures.** Inter, measured, on Rill, Observable Framework, and Grafana. The face has almost nothing to do here except get out of the way and keep digits aligned; spend zero originality budget on it.

**A scale with almost no contrast — this is the sharpest difference from every other archetype.** Body 12–13px, section/panel titles 13–14px w600, page title 16–20px, and one exception: the measure value at 20–32px. Largest-routine-to-body ratio ≈1.5, against 4–5 in `editorial` and 6+ in `premium-marketing`. The reason is structural: every number on screen is a candidate answer, so type size is being used to say *which measure the user selected*, not *which text is important*. A 40px hero number in a screen full of 12px numbers is a claim you have not earned.

**Three weights: 400 / 500–600 / 700.** Values in 400 or 500 at the large end (Rill's 25.6px value is w400); labels in 600; column headers in 700 at 12px (Rill) or 500 muted (Plausible) — pick one and hold it.

**Numerals.** `font-variant-numeric: tabular-nums` on every axis label, every cell, every measure value, every delta. Measured caution: **both Rill and Plausible ship `font-variant-numeric: normal` on their big values** — which is why a value reflows by a pixel or two when a live refresh lands. Do not copy that. Add `slashed-zero` on IDs and query hashes. Leave prose alone; gappy `1`s in a sentence look broken.

**Monospace earns its place in exactly four spots:** the query editor, the schema/field list, timestamps in a log-shaped table, and IDs. It does **not** belong on axis ticks, in measure values, or on panel titles — mono digits are wider, so an axis in mono costs plot width, and a mono headline is a developer-tool costume.

## Layout and navigation

**The shell is a breadcrumb plus two thin toolbars over a two-pane body.** Bar one: time range, comparison, refresh. Bar two: filters, as removable chips. Rill runs this at 26px per bar; Grafana runs the same two bars as time-range cluster + template-variable row. Stack thin bars rather than building one 72px bar with internal dividers.

**The primary object is the question, not the dataset.** Whatever answers it gets ≥50% of the pane and never shrinks first when the window narrows. In Rill the left pane is the measures-over-time stack and the right is the dimension leaderboards; in Plausible the chart is a full-width band with breakdown panels beneath. Both give the chart the fold.

**Grouping: by question, not by data source.** Panels that answer one question sit in one titled group with a shared time domain. The failure this prevents is the Grafana wall — forty equally-sized panels in reading order with no hierarchy, where the answer is somewhere on screen and nobody can find it.

**Cards: almost never.** Use *panels* — a hairline, a 24–28px title row, edge-to-edge content, no shadow, no nested padding. Cards (radius, shadow, lift, margin) are right in exactly one place here: the dashboard **index**, where each item is a target and there are twelve of them, not two hundred. Even there Rill uses a list with a type badge, a slug and `Last refreshed 14 hours ago` per row, which is better.

### The case against the metric-tile grid

A metric tile answers "what is X?" Nobody opens a BI tool to learn what X is. They open it because they suspect X changed, and answering that needs three things a tile structurally cannot carry: **a time axis, a comparison basis, and a decomposition.** Four gradient tiles in a row is the single loudest tell of generated analytics UI.

What the reference set does instead:

- **Make the tile a control.** Plausible's six metrics are the chart's series selector. The tile earns its pixels by changing what the plot shows.
- **Fuse the number to its series.** Rill puts label, value and sparkline in one band, and stacks the bands on a shared x-axis so a month-end anomaly shows up as *misaligned shapes*, not as numbers you compare from memory.
- **Put the aggregate in the thing it aggregates.** Column footer under the column (Attio's `2,813 count` / `$83,560,165 sum` pattern), or in the chart header, so the user never has to work out which column the tile came from.

If you keep a value strip, four rules: **(1)** at most four values, all measures of the same object over the same window; **(2)** every delta names its baseline — "vs prior 28 days", not a bare `↑12%`; **(3)** the value is 20–32px with weight falling as size rises; **(4)** if clicking it does nothing, delete it and move the number into the chart title.

### Time range, comparison, drill-down

**Time range is the most important control on the screen** and gets the leftmost slot of bar one. Measured requirements, from Rill and Grafana:

- Show the **resolved absolute range next to the relative label** — Rill: `Last 7 Days  Sep 3 – 9, 2026  PDT ⌄`. "Last 7 days" alone is unciteable and un-screenshot-able.
- **Name the timezone.** Rill puts `PDT` in a chip inside the control. Half of all analytics disagreements are a UTC-vs-local boundary.
- **Prev/next steppers adjacent to the picker** (`‹ ›` in Rill, `« »` in Grafana) so stepping a window is one click, not a re-pick.
- **Anchor separately from range.** Rill's `as of latest day end` distinguishes "the last 7 days of data" from "the last 7 days including a partial today" — the partial-final-bucket drop is the most misread shape in BI.
- **Comparison is a first-class control next to the range**, not an option inside a chart menu: Rill's `◯ Comparing — no comparison period ⌄`. When on, the prior period is a muted dashed series behind the current one; deltas everywhere on screen switch to that basis at once.
- **Auto-refresh names its interval** (Grafana's `↻ Refresh 30s ⌄`) and is off by default outside monitoring.
- **The whole state lives in the URL.** Grafana ships `?var-filters=&from=now-15m&to=now`; a pasted link must reproduce the screen exactly, or every Slack thread about a number becomes an argument about which screen.

**Drill-down is filtering, not navigation.** Clicking a dimension value appends a removable chip to the filter bar, re-runs in place, and pushes a history entry — Back removes exactly one chip. The filter bar *is* the breadcrumb; do not ship both. Leaderboards show top 5–7 with an explicit `(Expand Table)` (Rill) rather than a scroll into nothing, and a `Explore | Pivot` mode toggle at the top level handles "I need the crosstab" without a new page.

## Components

**Belongs here:** time-series line and area (one shared x-axis across stacked panels); horizontal bar leaderboards with in-cell bars and the value right-aligned in tabular figures; a pivot/crosstab mode; a filter chip bar; a time-range cluster with steppers, timezone and comparison; a query/SQL surface with its result grid at 22–24px rows; a saved-view switcher; column footers with sum/count/avg; a freshness stamp; per-panel error and retry; annotations on the time axis for deploys and campaigns; CSV/PNG export and a copy-link that copies the *state*.

**Does not belong here:** gradient stat tiles with icons in tinted squares (put the number in the chart header); donut and pie charts above three slices (a horizontal bar is exactly as informative and readable at 12px); gauges and speedometers (they encode one number in the least space-efficient way available); 3D anything; a "Recent activity" feed that is not the subject of the question; carousels of charts; dual y-axes (they let you manufacture any correlation you like — use two stacked panels sharing an x-axis); smoothed curves (`type="monotone"` invents values between measurements you paid to collect); animated count-ups (they make a wrong number look intentional and are unreadable while counting); a global search that searches chart titles rather than fields and values.

## States in this archetype

**Empty is the hardest state here, and the canonical failure is measured.** A Grafana stat panel auto-fits its text to the panel, so an empty one renders **"No data" at ~90px on a full-bleed blue gradient** — the emptiest panel becomes the loudest object on the dashboard. On the same screen, its timeseries panels get it right: muted, normal-size, centred, on the panel's normal background. **An empty state must never be higher-contrast than a full one.** Keep the panel title, keep the axes drawn, and echo the constraint that produced the emptiness: `No requests in the last 30 minutes` beats `No data`, and `No rows match these 3 filters` beats both — with the filters clickable.

**Empty-because-zero and empty-because-missing are different facts.** A gap in a series renders as a *gap*, not as zero. Interpolating across a missing hour is a lie the chart tells silently.

**Loading: never blank what was there.** Keep the previous result on screen at ~50% opacity with a 2px progress bar on the panel edge, so the user can read the old answer while the new one computes. First load only gets a skeleton, and the skeleton keeps the axes and panel geometry so nothing reflows on arrival (PostHog's `--animate-skeleton: skeleton 2s -1s` — the negative delay means a freshly-mounted skeleton is already mid-shimmer). Never a centred spinner over a table; it hides the column layout, which is half the information.

**Error is per-panel, never per-page.** The failing panel shows the error, the offending query (collapsed), and a Retry; the rest of the dashboard keeps its data. A dashboard where one bad datasource blanks nineteen good panels is an availability bug dressed as an error state.

**Too much:** >5 series → group the tail into "Other" with a count; >200 rows → virtualise and show true-vs-filtered counts; more data points than plot pixels → downsample and **say so in the axis subtitle** ("hourly buckets, 2m samples"); sampled queries → say the sample rate next to the number, in the same type as the number.

**Stale is a state, not a footnote.** Three levels: fresh (a muted `Refreshed 4m ago`), stale past a per-dataset threshold (the same stamp promoted to warning colour, with the reason — "source last synced 14h ago"), and dirty (filters changed, query not re-run — dim the plot and label it `Showing previous result`). Rill puts `Last refreshed 14 hours ago` in the top bar *and* on every row of the dashboard index, which is the right ambition: staleness travels with the artifact.

## Motion budget

The frequency argument is decisive: a dashboard on 30s auto-refresh redraws 2,880 times a day per viewer. Data marks therefore **do not animate on data change** — no bar grow, no line draw-on, no stagger, no count-up. Ever.

Permitted: 120ms row and legend hover (background/colour only, as an alpha overlay — never a border or a transform, which reflows a 200-row leaderboard); 150ms crossfade on a value when the underlying number changes (Plausible's measured `0.15s cubic-bezier(0.4,0,0.2,1)`); 180ms for menus, popovers, the time-range panel and the filter editor; 0ms — pointer-locked — for brush selection, crosshair and tooltip, because those are direct manipulation and any easing reads as lag. A first-mount chart may fade in over ≤200ms; it may not draw itself. Honour `prefers-reduced-motion` by rendering the resting frame, which here is free: the chart is already correct without animation.

## Mobile

**Authoring is desktop-only, and pretending otherwise is the expensive mistake.** Measured: Rill's explore screen at 390px does not reflow at all — the desktop layout scrolls horizontally, two leaderboard columns off-screen. That is the honest ceiling for a filter-bar-plus-two-pane exploration UI, and rebuilding it responsively produces a worse desktop product.

What ships on mobile is a **reading** surface for an answer someone else (or you, earlier) already framed: one chart at a time at full width and full height, the metric strip reflowed to two columns as a tab set, breakdowns as tabbed panels at top-5, the time range as a bottom sheet with presets only, no pivot, no ad-hoc filter builder. Plausible does exactly this and it works because it is a six-metric product with one question. Add to it the thing mobile is actually for: alerts and subscriptions — the delivered answer with a deep link back to the desktop exploration that produced it.

## Copy register

Precise, sourced, and never cheerful about a number. Name measures the way the business names them and put the definition one hover away. Every number that can be qualified, is.

- `Requests — Sep 3–9, 2026 (PDT)` beats `Total Requests` — a title you can paste into Slack without a follow-up question.
- `No requests matched these 3 filters in the last 30 minutes.` beats `No data` — names the noun, the window, and the reason.
- `Down 12% vs the prior 28 days` beats `↓ 12%` — a delta without a baseline is not a delta.
- `Refreshed 14 hours ago · source synced 06:00 UTC` beats `Updated recently` — Sigma sells this as "live query only (no extracts)"; say what your policy is.
- `Sampled: 1 in 10 events above 2M/day` beats silence — the number is wrong by a known factor and the user must be able to know it.
- `Unique visitors counts one person once per day, by first-party cookie` (in the measure's tooltip) beats an undefined metric that two teams will define differently in the same meeting.

## The characteristic failure

**The Vibe Dashboard.** It is the most-generated screen in software and it has a fixed shape: a row of four-to-six tiles with a lucide icon in a tinted rounded square, a 48px number in w700, and a green `↑12%` with no stated baseline; below it a 2×2 grid of equal-weight cards at 12–16px radius with `shadow-md`, each holding a Recharts line at shadcn's default `--chart-1..5` (five shades of one blue), curve smoothed to `monotone`, dots on every point, both axes gridded at the same weight as the card border, a legend instead of direct labels, and a 600ms entrance animation; a `Last 30 days ⌄` select in the top-right bound to nothing; and a table at the bottom captioned "Recent activity" that answers no question anyone asked. It is comfortable-density (16px body, 44px rows) in an archetype that needs compact. It shows perhaps nine facts on a screen that could carry two hundred, and not one of them is comparative.

The deeper failure underneath the look: **it displays data instead of answering a question.** Nothing on screen states what is being asked, what it is compared against, or when it was true.

The opposite failures are real too. **The Grafana wall:** forty equally-sized panels in insertion order, no grouping, alert badges on every title, a stat panel screaming `No data` at 90px in white on a blue gradient — technically dense, informationally flat. And **over-restraint:** a monochrome dashboard where six series are six shades of one gray, which loses more information than the gradient tiles ever did.

Self-diagnosis, in order:

1. Can you say in one sentence what question this screen answers? If the title is "Dashboard" or "Overview", no.
2. Does clicking a metric tile change anything? If not, it is a label — move the number into the chart header.
3. Is there any baseline on any chart other than zero — prior period, target, cohort average? If not, nothing on screen is comparative.
4. Does anything say *when* the data is from, without hovering?
5. Are the digits tabular? Watch a value during a refresh; if it shifts, no.
6. Is any series curve smoothed? You are inventing measurements.
7. Are there more than five colours in one chart? Is any of them the UI accent?
8. Narrow the window to 1100px. Does the chart shrink while the tiles hold their size? Reverse it — the tiles are compressible; the plot is the payload.
9. Count the visible data points at 1440×900 with a full dataset. Under two hundred means the layout, not the data, is the constraint.

## Signature decisions that fit here

- **A finance-ops BI tool renders every measure as label + value + its own sparkline on one shared x-axis**, stacked, so a month-end anomaly appears as a shape misalignment across measures rather than as numbers compared from memory. (Rill's structure, applied where reconciliation is the job.)
- **The filter bar is the breadcrumb.** Every drill-down appends one removable chip, the URL is the complete state, and Back removes exactly one chip. No second navigation trail exists anywhere in the product.
- **Print the row count the chart is drawn from, and the count excluded by filters, directly under the x-axis.** The most common wrong answer in BI is a filter that removed 80% of the data while nobody looked.
- **The freshness watermark is set in the same size and weight as the measure value, beside it** — because a stale number and a fresh number are visually identical and the whole cost of being wrong lives in that gap.
- **A cohort tool renders retention as a triangle where cell colour is the rate and cell width is the cohort size**, so 90% retention on eleven users cannot masquerade as a result.

## Sources

- `https://ui.rilldata.com/demo/rill-openrtb-prog-ads/explore/auction_explore` — probed live: body 12px/18px Inter on white; 159/210 text nodes at 12/18; measure label 12/18 w600 `oklab(0.556 0 0)`; measure value **25.6px/38.4px w400**; leaderboard `<tr>` **22px** with `td padding 0 8px` at 12/18; filter bar row 26px; one hairline `1px oklab(0.922 0 0)` ×80; radii `9999px` ×216 (bars/pills only), 4px ×8, 2px ×6; `font-variant-numeric: normal` on the value. Screenshotted 1440 and 390 — no mobile reflow.
- `https://ui.rilldata.com/demo/rill-openrtb-prog-ads` — dashboard index with `Last refreshed 14 hours ago` per row, type badges (Canvas / Explore), and an `@`-mention question box as the entry point.
- `https://plausible.io/plausible.io` — probed live: metric value 19.2px/28.8px w600; breakdown row **32px** with `hover:bg-gray-100/60`; column headers 12/16 w500 `oklch(0.552 0.016 285.938)`; hairline `1px oklch(0.92 0.004 286.32)`; radii 4px ×57, 6px ×23; panels `shadow-sm` with a 0-width border; value transition `0.15s cubic-bezier(0.4,0,0.2,1)`; accent `oklch(0.511 0.262 276.966)`. Screenshotted 1440 and 390 — metric tabs reflow to two columns.
- `https://play.grafana.org/d/aynhtvb/agent-observability` and `/d/lAoEVhD7z/home-kubernetes-integration` — the time-range cluster (`« Last 30 minutes » 🔍− ↻ Refresh 30s`), the template-variable filter row, and both empty-state failures captured live: `No data` at ~90px on full-bleed blue and green gradient stat panels.
- `https://observablehq.com/framework/` — probed theme tokens: `--font-big: 700 32px/1`, `--font-small: 14px`, `--observablehq-max-width: 1440px`, `--observablehq-header-height: 2.2rem`, palette `--theme-blue #4269d0 / --theme-green #3ca951 / --theme-red #ff725c / --theme-yellow #efb118`, Inter + Source Serif 4 + Spline Sans Mono. Example dashboards show a KPI strip subordinate to a full-width plot, with an explanatory paragraph beneath.
- `https://hex.tech/product/magic-ai/` and `https://amplitude.com/amplitude-analytics` — question-first entry framing ("Ask questions in natural language… trusted answers grounded in your organization's context"; "What do you want to know about your product?").
- `https://www.sigmacomputing.com/product` — freshness as a stated product promise: "Live query only (no extracts)… control caching and refresh so teams get speed without losing freshness."
- Prior corpus measurements cited rather than re-derived: `references/enterprise-and-dense-b2b.md` (Grafana 23.8px rows and 12/18 data plane, Hex 24px result grid, PostHog `--button-height-base: 30px` / `--button-padding-x-base: 6px` / `--animate-skeleton: 2s -1s`, Attio's column-footer aggregation), `references/developer-platforms.md` (the Grafana time-range cluster and the oversized `No data` stat panel), `craft/color.md` (shadcn `--chart-1..5` = blue-300→800 at ΔE 5.8; IBM CVD-safe five; five-category ceiling; direct labelling), `craft/typography.md` (tabular figures on every metric, price and cell).
