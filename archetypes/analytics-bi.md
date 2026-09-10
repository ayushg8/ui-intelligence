# analytics-bi

**Evaluated:** 2026-09 · **Density:** compact · **Dark by default:** no — light, unless the screen is *watched* rather than *asked*. Grafana defaults dark because it is a monitoring wall in a dim room; Rill, Plausible, Hex (white result grid) and PostHog all default light because the answer gets read in an office and then pasted into a doc or a deck. Ship dark as a real second theme, not as the default.

> Someone has a question with a number in it — "did signups drop, and if so where" — and this screen has to answer it, show what it is being compared against, and let them not believe it.

## When this is the right archetype

The users are analysts, PMs, growth and ops people. They open this two to twenty times a day, in sessions of three to thirty minutes, always with a question already in their head. Stakes are indirect but real: the output becomes a decision, a headcount request, or a slide, and a wrong number that looks confident is worse than no number. They are not browsing — they are testing a hypothesis, and the sequence is always *look → doubt → slice → confirm*. Which means the screen's job is not to display data. It is to make an argument, expose its basis, and let the user attack it.

**Choose this over…**

- **`enterprise-dense`** when the primary object is an aggregate, not a record. If the user's next action after finding the row is *doing something to that row* (approve, assign, refund), it is `enterprise-dense` and the chart is garnish. If the next action is *slicing further*, it is this.
- **`data-terminal`** when the session ends. A terminal is watched continuously, on a second monitor, by someone whose job is to notice change within seconds; it earns 11–12px, dark, no prose, and audible alarms. BI is opened, used, and closed — it can afford annotation, comparison controls, and light mode. (`data-terminal.md` is not written yet; the selector row is Bloomberg, Grafana-as-NOC-wall and trading UIs at 11–12px with 20–24px rows.)
- **`ai-product`** when the answer must remain inspectable. A chat surface that returns a number is not this archetype unless the chart, the filters and the query stay on screen and stay editable. Question-first entry (Rill's `@`-mention box, Amplitude's "What do you want to know about your product?", Hex's natural-language prompt) is a *guest* pane inside an `analytics-bi` host — it composes the query; it does not replace the evidence.

## When it is the wrong one

Every screen below ships a chart, a date picker and a CSV export, which is exactly why it gets mis-typed. Each one breaks under this archetype's machinery for a different reason.

- **Stripe's Balance and payouts reports** — and any statement, invoice or regulatory filing. Breaks because an accountant cites the number: a drill-down that changes the total is a liability, and exploration UI implies the figure is provisional. → `fintech-institutional`.
- **Vercel's Usage page, Linear's Insights tab, an in-app "credits used this month" panel.** One question, one non-analyst, one owner, no ad-hoc path. Apply this archetype and you ship a time-range picker nobody opens, a comparison toggle with nothing to compare, and a dimension leaderboard over a dimension of cardinality 1. One number, one bar, one sentence, inside whatever archetype hosts the product.
- **Datadog's host map and monitor list** — the closest miss in the corpus. Dark, dense, charts everywhere, and still not this: the user is on call, the screen changes without anyone touching it, and colour carries state rather than series identity. The monitor *list*, where monitors get edited and muted, is `enterprise-dense`; the wall is `data-terminal`.
- **Salesforce and HubSpot "Reports".** Six saved charts, no ad-hoc query path, no drill-down that survives a refresh. Three panels on an `enterprise-dense` page beats a half-built BI shell, and nobody will ask you for the pivot.
- **Strava, Oura and Whoop trend tabs.** Time series, deltas, period comparison — and none of the logic transfers: one person, one body, no dimensions to slice, and a register where `Down 12% vs the prior 28 days` reads as an accusation. → `expressive-consumer`.
- **A quarterly board readout exported from Looker or Tableau.** Read once, often printed, zero interaction. → `editorial`: 16px body, generous measure, the chart as a captioned figure, the argument written out. Compact BI density on a quarterly read is hostile.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Rill** (`ui.rilldata.com/demo`) | The clearest working answer to "what replaces the tile grid" — and a product most engineers have never opened | Each measure is one **85px band at 4px radius**: 12/18 label, 25.6/38.4 value, and its own time series, all bands sharing one x-axis. You compare *shapes down the column*, not numbers from memory. |
| **Plausible** (`plausible.io/plausible.io`, live and public) | Metric tiles that earn their space by being controls | The six metrics are **tabs**: clicking "Bounce rate" re-plots the main chart. A tile that does nothing when clicked is a label. |
| **Grafana Play** | The reference time-range cluster — and the canonical empty-state disaster | `« 🕐 Last 30 minutes ⌄ » 🔍− ↻ Refresh 30s ⌄` — window steppers flanking the picker, zoom-out, and refresh with its own interval, as one control group. |
| **Observable Framework** | A dashboard treated as a document with honest chart defaults | `--font-big: 700 32px/1` for a big value, a four-colour theme palette (`#4269d0 #3ca951 #ff725c #efb118`), and a paragraph of prose under the plot explaining what it shows. |
| **Hex** | Notebook density; the analysis and its output in one scroll | 24px result-grid rows with a left index gutter and a header band at the same 24px (`references/enterprise-and-dense-b2b.md`). |
| **PostHog** | The tightest control geometry measured anywhere | `--button-height-base: 30px` / `--button-padding-x-base: 6px`, with scoped overrides pulling the base down to `--button-height-xs` (24px) — 30px is the ceiling, not the floor. Skeletons on `2s -1s` so a fresh one mounts mid-shimmer. |
| **Amplitude** | Nav depth for a product with hundreds of saved views | Three-deep collapsible left rail with per-section chevrons under a single ~32px global bar. |
| **Sigma** | Freshness stated as a product promise, in the UI | "Live query only (no extracts) — control caching and refresh so teams get speed without losing freshness." The refresh policy is a visible feature, not a footnote. |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **13px/18px** chrome, **12px/18px** data plane — and the data plane is the *majority* | Re-probed 2026-09-10: **185 of 213** visible text nodes on Rill's explore screen are 12/18 Inter. Grafana runs 14px chrome against a 12px data plane at the same ratio (5,080 of 5,332, `references/enterprise-and-dense-b2b.md`). This inverts `enterprise-dense`, where 13px is the body and 12px a minority machine plane. Here the chrome is the exception. Dropping the data plane one step says "field, scan it" and buys ~6 leaderboard rows per panel. |
| Dense/secondary text | **11–12px**, muted (`oklch(0.556)`-class gray) | Rill's `(Expand Table)` and column headers are 12/18 muted; Plausible's `Source` / `Visitors` headers are 12/16 w500. Axis tick labels live here too — they are read peripherally and must not compete with the marks. |
| Page title | **16–20px / w600**, once | The dashboard's name is furniture; the *question* lives in the panel title. Rill sets its dashboard name at 12/18 w700 in a breadcrumb and spends nothing else on it. Do not ship a 30px page heading above a 25px measure value. |
| Row / list-item height | **22–24px** for result grids and leaderboards; **32px** when the row is a filter target | Set by *what the click does*, not by what the cell contains. Rill's leaderboard `<tr>` is 22px, `td padding: 5px 4px`, 12/18 — and every row is a `<button>` (114 of them on one screen). Hex's result grid is 24px; Grafana's table 23.84px. Plausible goes to 32px with a **14/20** label because its row is a filter click with a bar behind it, and 22px there is a mis-tap. |
| Control height | **26–28px**, 30px ceiling | Lower than `enterprise-dense`'s 28/32 for a structural reason: this shell stacks **two** control bars, so every pixel of control height is paid twice. Measured on Rill today — time-range button 26px inside a 28px bar at y=58, filter bar 26px at y=94, `Explore \| Pivot` toggle 26px at y=118; 181px of chrome before the first measure band. PostHog's 30px is the outer bound. A 40px control row costs four leaderboard rows. |
| Sidebar width | **0**, or 224–256px | Zero is legal here and nowhere else in the compact family — measured on Rill at 1440: no element over 500px tall anywhere in the left 60px. Breadcrumb plus toolbars, because horizontal pixels are chart pixels. `enterprise-dense` cannot do this (many object types need a rail) and `developer-platform` cannot (docs nav is a product surface). Take a rail only when saved views number in the dozens; then Amplitude's collapsible three-deep at ~240px, not Grafana's 319px. |
| Content max-width | **None on the chart pane**; 1440px page cap; **68–72ch** on any prose | Observable Framework caps at `--observablehq-max-width: 1440px`. A time series is a shape read across; letterboxing it into a 1120px column throws away resolution you paid a query for. |
| Radius (control / container) | **4px / 6px** | Re-probed: Plausible 4px ×57, 6px ×23. Rill 4px ×8 and 2px ×6, plus `9999px` ×146 — all of them bars and pills, never a panel. Grafana 6px ×424. 12px+ radii on a 22px row eat the row. |
| Border weight & colour | **One 1px hairline**, alpha over the surface. Chart gridlines one step lighter than it | Rill uses `1px oklab(0.922 0 0)` (≈#E5E5E5) ×44; Plausible `1px oklch(0.92 0.004 286.32)` ×10; Grafana runs one hue `rgba(204,204,220,·)` at four alphas, 0.12 dominant. If the gridline is as strong as the panel border, the grid reads as structure and the data reads as decoration. |
| Elevation | **Borders. One shadow token, for overlays only** | Plausible's panels use `0 1px 3px rgba(0,0,0,.1), 0 1px 2px -1px` with a 0-width border — a shadow *instead of* a border, not both. Tooltips and menus genuinely float; panels do not. |
| Motion (micro / standard) | **120–150ms / 180ms**, and **0ms for data on refresh** | Plausible transitions its metric values at `0.15s cubic-bezier(0.4,0,0.2,1)`. A dashboard on Grafana's default 30s refresh redraws 2,880 times a day per viewer; a 400ms bar-grow on each is 19 minutes of animation a day. |

**Big-value sizing, measured across three products:** Plausible 19.2px/28.8 **w600**, Rill 25.6px/38.4 **w400**, Observable Framework `700 32px/1`. The rule that falls out: **20–32px, and weight goes down as size goes up.** A 48px number in w700 is not emphasis, it is a poster.

## Distance from the neighbours

Put the tables side by side and most of the surface values are the same, which is the honest starting point:

| | `analytics-bi` | `enterprise-dense` | `developer-platform` | `technical-productivity` |
|---|---|---|---|---|
| Body | 13px chrome / **12px data, dominant** | 13px body / 12px minority | app 13–14 · docs 15–16 | 13px w510 |
| Data row | **22–24** (32 when the row is a filter) | 28–32 text · 22–24 machine | 40 | 36–40 |
| Control | **26–28**, 30 ceiling | 28 / 32 / 36–40 | 32 / 28 dense | 28 / 32 |
| Sidebar | **0**, or 224–256 | 232–256, mandatory | 220–300, docs nav is a surface | 232 |
| Radius | 4 / 6 | 4 / 6 | 4 / 6 / 8 | 6–8 row, 12–16 panel |
| Hairline | 1px, one value | 1px alpha, one value | 1px, three dark steps | dark: none · light: 1px |
| Motion | 120–150 / 180 **+ 0ms on data** | 120 / 160 | 150 / 200 / 300 | 0 in / 150 out |
| Dark default | **no** — light unless watched | no | either | either |

**This archetype shares its 13px chrome, its 4/6 radius pair, its single 1px hairline and its 120–180ms transitions with `enterprise-dense`.** Those are settled questions for any compact tool; re-deriving them per archetype would be theatre. Four things are genuinely different, and each is structural rather than decorative — remove any one and the file collapses into its neighbour.

**1. The type ratio inverts.** In `enterprise-dense`, 13px is the body and 12px is a minority machine plane (logs, IDs, timestamps). Here 12/18 *is* the body — 185 of 213 visible text nodes on Rill's explore screen — and 13px chrome is the exception. Consequence you can act on: the largest routine text is 1.5× the body (a 20–32px measure value against a 12–13px everything), against 4–5× in `editorial` and 6+ in `premium-marketing`. Type size is being spent to say *which measure is selected*, not *which text is important*.

**2. The row is a filter target, never a write target.** `enterprise-dense` rows carry a 16px checkbox, a hover action set, sometimes a second line and an avatar — that is what forces 28–32px, and it exists because the user's next action is *doing something to that row*. A BI leaderboard row carries a label, a value and a bar, and its click adds a chip to the filter bar. So 22px is reachable, and Rill reaches it: `tr` 22px, `td padding 5px 4px`, 114 rows-as-buttons on one screen. Plausible's 32px is the exception that proves the rule — its row is a fat click target with a 14/20 label, not a 12px scan line.

**3. A second colour budget exists that no neighbour has.** `enterprise-dense` spends colour on row status, `developer-platform` on build state, `technical-productivity` on almost nothing. Only here does a *categorical series palette* live on the same screen as the UI accent, which is where the whole "two budgets, they must not touch" rule comes from. **If your screen has no series palette, you are not in this archetype** — you are in `enterprise-dense` with a chart in it.

**4. Motion has a hard zero the neighbours do not need.** `enterprise-dense`'s 120ms is about a cursor sweeping thirty rows. Here it is about a screen that redraws itself 2,880 times a day with nobody touching it. This is the only archetype in the corpus where **the data changes while no one is interacting**, which is why data marks animate at 0ms and why staleness gets a three-level state machine that no neighbour file contains.

And one structural tell that is faster to check than any of them: **the time-range cluster.** No neighbour has a comparison basis, a timezone chip, or a separate anchor. `enterprise-dense` filters rows; this filters a window, and every number on screen re-bases at once. Delete the time cluster and this becomes `enterprise-dense` within an hour.

**Grafana is not one product, and citing "Grafana" proves nothing.** Its 23.84px table rows and 12px data plane are `analytics-bi`/`enterprise-dense`; its dark-by-default NOC posture is `data-terminal`; its docs and plugin surfaces are `developer-platform`. Cite the surface and the URL, not the brand.

## Colour

**Neutrals: near-zero chroma, cool or none.** Rill's grays are literally `oklab(L 0 0)`; Grafana's hairline is a faintly cool `rgba(204,204,220,…)`; Plausible sits at hue 286 with chroma 0.004–0.016. This is not taste — a warm gray ground shifts perceived hue on orange and red series and makes a two-colour chart look like a three-colour one. Take the default ramp from `system/3-tokens.md` and drop chroma to ≤0.005, hue to 250–290 or 0.

**Two separate colour budgets, and they must not touch.** UI colour (one accent: primary action, active filter chip, selection, focus ring) and data colour (the series palette). The one legal overlap: when a chart plots exactly **one** series, that series may be the accent — it is the subject of the screen. Rill and Plausible both do this and it reads correctly. The moment a second series appears, the accent retreats to UI-only and the categorical palette takes over, or the user will read "the blue line" as "the selected thing."

**Series palette: use a tested set, cap it at five.** shadcn's `--chart-1..5` are Tailwind `blue-300/500/600/700/800` — a sequential ramp used as a categorical palette, ΔE 5.8 between neighbours (measured in `craft/color.md`). Use IBM's CVD-safe five (`#648FFF #785EF0 #DC267F #FE6100 #FFB000`) or Observable's four (`#4269d0 #3ca951 #ff725c #efb118`). Past five categories no palette separates; group the tail into "Other" and let the user drill in. **Direct-label the series** — a legend mapping five colours to five names already failed for 1 in 12 men.

**Semantic colour encodes valence, not direction.** Plausible renders bounce rate `43% ↘2%` in green and visit duration `7m24s ↗4%` in green — down is good for one, up is good for the other, and the product knows which. A delta chip coloured by the sign of the number is a bug that ships as a feature. Reserve red/green for *change with a known valence* and never for series identity.

**Light by default.** The test is not "is this a developer tool," it is **is the screen watched or asked?** Watched (wall display, NOC, dim room, 30s refresh) → dark. Asked (session-based, office lighting, output leaves the app as a screenshot into a deck or doc) → light. In dark, the categorical palette needs lightness raised and chroma dropped or thin 1px series lines vibrate against a near-black ground; gold `#FFB000` at 1.83:1 on white is fine as a filled area and illegible as a 1px line, so darken the light end for line charts.

## Type

**A neutral grotesque with real tabular figures.** Inter, measured, on Rill, Observable Framework, and Grafana. The face has almost nothing to do here except get out of the way and keep digits aligned; spend zero originality budget on it.

**A scale with almost no contrast.** Body 12–13px, section/panel titles 13–14px w600, page title 16–20px, and one exception: the measure value at 20–32px. That ≈1.5 ratio is argued above; the operational form of it is that **every number on screen is a candidate answer**, so a 40px hero number among 12px numbers is a claim you have not earned.

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

**Empty is the hardest state here, and the canonical failure is measured.** A Grafana stat panel auto-fits its text to the panel, so an empty one renders `No data` at **96.7px w500 in `rgb(247,248,250)`** on a full-bleed gradient — re-probed 2026-09-10, alongside siblings at 24.6px and a green 20.2px. The emptiest panel becomes the loudest object on the dashboard. On the same screen, the timeseries panels get it right: `No data` at **18px w400 `rgba(204,204,220,0.65)`**, centred, on the panel's normal ground. Same string, 5.4× the size, purely because the panel had nothing to constrain it. **An empty state must never be higher-contrast than a full one.** Keep the panel title, keep the axes drawn, and echo the constraint that produced the emptiness: `No requests in the last 30 minutes` beats `No data`, and `No rows match these 3 filters` beats both — with the filters clickable.

**Empty-because-zero and empty-because-missing are different facts.** A gap in a series renders as a *gap*, not as zero. Interpolating across a missing hour is a lie the chart tells silently.

**Loading: never blank what was there.** Keep the previous result on screen at ~50% opacity with a 2px progress bar on the panel edge, so the user can read the old answer while the new one computes. First load only gets a skeleton, and the skeleton keeps the axes and panel geometry so nothing reflows on arrival (PostHog's `--animate-skeleton: skeleton 2s -1s` — the negative delay means a freshly-mounted skeleton is already mid-shimmer). Never a centred spinner over a table; it hides the column layout, which is half the information.

**Error is per-panel, never per-page.** The failing panel shows the error, the offending query (collapsed), and a Retry; the rest of the dashboard keeps its data. A dashboard where one bad datasource blanks nineteen good panels is an availability bug dressed as an error state.

**Too much:** >5 series → group the tail into "Other" with a count; >200 rows → virtualise and show true-vs-filtered counts; more data points than plot pixels → downsample and **say so in the axis subtitle** ("hourly buckets, 2m samples"); sampled queries → say the sample rate next to the number, in the same type as the number.

**Stale is a state, not a footnote.** Three levels: fresh (a muted `Refreshed 4m ago`), stale past a per-dataset threshold (the same stamp promoted to warning colour, with the reason — "source last synced 14h ago"), and dirty (filters changed, query not re-run — dim the plot and label it `Showing previous result`). Rill puts `Last refreshed 14 hours ago` in the top bar *and* on every row of the dashboard index, which is the right ambition: staleness travels with the artifact.

## Motion budget

The frequency argument above is decisive. Data marks **do not animate on data change** — no bar grow, no line draw-on, no stagger, no count-up. Ever.

Permitted: 120ms row and legend hover (background/colour only, as an alpha overlay — never a border or a transform, which reflows a 200-row leaderboard); 150ms crossfade on a value when the underlying number changes (Plausible's measured `0.15s cubic-bezier(0.4,0,0.2,1)`); 180ms for menus, popovers, the time-range panel and the filter editor; 0ms — pointer-locked — for brush selection, crosshair and tooltip, because those are direct manipulation and any easing reads as lag. A first-mount chart may fade in over ≤200ms; it may not draw itself. Honour `prefers-reduced-motion` by rendering the resting frame, which here is free: the chart is already correct without animation.

## Mobile

**Authoring is desktop-only, and pretending otherwise is the expensive mistake.** Measured: Rill's explore screen at 390px does not reflow at all — the desktop layout scrolls horizontally, two leaderboard columns off-screen. That is the honest ceiling for a filter-bar-plus-two-pane exploration UI, and rebuilding it responsively produces a worse desktop product.

What ships on mobile is a **reading** surface for an answer someone already framed: one chart at full width, the metric strip reflowed to two columns as a tab set, breakdowns as tabbed panels at top-5, the time range as a bottom sheet with presets only, no pivot, no filter builder. Plausible does exactly this, and it works because it is a six-metric product with one question. Then add the thing mobile is actually for: alerts and subscriptions — the delivered answer with a deep link back to the desktop exploration that produced it.

## Copy register

Precise, sourced, and never cheerful about a number. Name measures the way the business names them and put the definition one hover away. Every number that can be qualified, is.

- `Requests — Sep 3–9, 2026 (PDT)` beats `Total Requests` — a title you can paste into Slack without a follow-up question.
- `No requests matched these 3 filters in the last 30 minutes.` beats `No data` — names the noun, the window, and the reason.
- `Down 12% vs the prior 28 days` beats `↓ 12%` — a delta without a baseline is not a delta.
- `Refreshed 14 hours ago · source synced 06:00 UTC` beats `Updated recently`.
- `Sampled: 1 in 10 events above 2M/day` beats silence — the number is wrong by a known factor and the user must be able to know it.
- `Unique visitors counts one person once per day, by first-party cookie` (in the measure's tooltip) beats an undefined metric that two teams will define differently in the same meeting.

## The characteristic failure

**The Vibe Dashboard.** The most-generated screen in software, and it has a fixed shape: a tile strip, a 2×2 grid of equal-weight shadowed cards holding smoothed Recharts lines in five shades of one blue, a dead `Last 30 days ⌄` select, and a "Recent activity" table nobody asked for. It is comfortable-density (16px body, 44px rows) in an archetype that needs compact. It shows perhaps nine facts on a screen that could carry two hundred, and not one of them is comparative.

The deeper failure underneath the look: **it displays data instead of answering a question.** Nothing on screen states what is being asked, what it is compared against, or when it was true.

**Recognising it in your own screenshot.** These are the literal tells, in the order they are visible. Four or more means you built it.

| Tell | The value to look for |
|---|---|
| Tile row above the fold | 4 or 6 equal cells, `grid-cols-4`, each ~120px tall |
| Icon in a tinted square | a lucide glyph in `size-8 rounded-lg bg-primary/10`, top-right of each tile |
| The number | ≥30px at w700 (`text-3xl font-bold`) — and `font-variant-numeric: normal`, so it twitches on refresh |
| The delta | a green `↑12.5%` whose baseline is either "from last month" or absent |
| The card | `rounded-xl` (12px) + `shadow-md` + `p-6`, on a screen whose rows are 22px |
| Density | body 14–16px, table rows ≥44px, **under 18 rows visible at 1440×900** |
| The chart call | `<Line type="monotone" dot={{r:4}} />` with `<CartesianGrid strokeDasharray="3 3" />` |
| The palette | five series that are five blues — shadcn `--chart-1..5` = Tailwind `blue-300/500/600/700/800`, ΔE 5.8 |
| The legend | a `<Legend />` under the plot instead of direct labels |
| The dead control | `Last 30 days ⌄` as a `<Select>` with no `onValueChange` |
| The filler panel | a table headed "Recent activity", or a page headed "Overview" / "Dashboard" |
| Motion | a 600ms entrance on marks that will redraw on the next poll |

The single fastest check, and the one that catches the version that got the pixels right: **search the rendered text for a timezone abbreviation, the substring `vs `, a resolved date range, and the word `Refreshed`. Zero hits across all four means nothing on the screen is dated, based or sourced** — it is a Vibe Dashboard regardless of how good the type is.

The opposite failures are real too. **The Grafana wall:** forty equally-sized panels in insertion order, no grouping, alert badges on every title, a stat panel screaming `No data` at 96.7px in near-white on a gradient — technically dense, informationally flat. And **over-restraint:** a monochrome dashboard where six series are six shades of one gray, which loses more information than the gradient tiles ever did.

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

- `https://ui.rilldata.com/demo/rill-openrtb-prog-ads/explore/auction_explore` — **re-probed live 2026-09-10 at 1440×900**: body 12px/18px Inter on `oklab(1 0 0)`; **185 of 213** visible text nodes at 12/18, 15 at 11/16.5; measure value **25.6px/38.4px w400, `font-variant-numeric: normal`** ×3; each measure band is an `a` at **85px, radius 4px**; leaderboard `<tr>` **22px**, `td.dimension-cell padding 5px 4px` at 12/18, **114 rows rendered as `<button>`**; time-range button 26px in a 28px bar at y=58, filter bar 26px at y=94, `Explore | Pivot` 26px at y=118, first measure band at y=181; **no left rail** (no element >500px tall in the left 60px); hairline `1px oklab(0.922 0 0)` ×44; radii `9999px` ×146 (bars/pills only), 4px ×8, 2px ×6; transitions only `0.15s transform` ×10 and `0.4s padding-left` ×2. Bar-one string verbatim: `Last 7 Days · Sep 3 – 9, 2026 · PDT · as of latest day end · Comparing / no comparison period`. Prior probe read 159/210 nodes and `td padding 0 8px`; both **corrected** here.
- `https://ui.rilldata.com/demo/rill-openrtb-prog-ads` — dashboard index with a live `Last refreshed N hours ago` per row (read 19 hours on 2026-09-10; the copy examples in this file use 14 as a fixed illustration), type badges (Canvas / Explore), and an `@`-mention question box as the entry point.
- `https://plausible.io/plausible.io` — **re-probed live 2026-09-10**, all values held: metric value **19.2px/28.8px w600 ×6, `font-variant-numeric: normal`**; breakdown row **32px** with `hover:bg-gray-100/60` and a **14px/20px** label inside it; metric-tab labels 12/16 (selected w700 `oklch(0.21 0.006 285.885)`, rest w600 muted); column headers `Source` / `Visitors` / `Page` **12/16 w500 `oklch(0.552 0.016 285.938)`**; hairline `1px oklch(0.92 0.004 286.32)` ×10; radii 4px ×57, 6px ×23; value transition `0.15s cubic-bezier(0.4,0,0.2,1)`.
- `https://play.grafana.org/d/aynhtvb/agent-observability` — **re-probed 2026-09-10**: the empty-state failure measured exactly, `No data` at **96.7px w500 `rgb(247,248,250)`** on a gradient stat panel, siblings at 24.6px and green 20.2px, against correctly-behaving timeseries panels at **18px w400 `rgba(204,204,220,0.65)`** on the same screen. Ground `rgb(17,18,23)`; borders one hue `rgba(204,204,220,·)` at 0.12 / 0.2 / 0.08; time-range cluster `« Last 30 minutes » 🔍− ↻ Refresh`. Node-count and radius tallies are taken from the fully-loaded probe in `references/enterprise-and-dense-b2b.md` (5,080 of 5,332 text nodes at 12px, `tr` 23.84px, `td padding 2px 8px`, 6px ×424) rather than re-derived here, so the corpus agrees.
- `https://observablehq.com/framework/` — **re-probed 2026-09-10, every token unchanged**: `--font-big: 700 32px/1`, `--font-small: 14px`, `--observablehq-max-width: 1440px`, `--observablehq-header-height: 2.2rem`, palette `--theme-blue #4269d0 / --theme-green #3ca951 / --theme-red #ff725c / --theme-yellow #efb118`, `--theme-foreground #1b1e23`, Inter + Source Serif 4 + Spline Sans Mono. Example dashboards show a KPI strip subordinate to a full-width plot, with an explanatory paragraph beneath.
- `https://hex.tech/product/magic-ai/` and `https://amplitude.com/amplitude-analytics` — question-first entry framing ("Ask questions in natural language… trusted answers grounded in your organization's context"; "What do you want to know about your product?").
- `https://www.sigmacomputing.com/product` — freshness as a stated product promise: "Live query only (no extracts)… control caching and refresh so teams get speed without losing freshness."
- `https://app-static-prod.posthog.com/static/index-7EGTHLBT.css` — **re-fetched 2026-09-10**: `--button-height-base: 30px`, `--button-height-sm: 28px`, `--button-height-xs: 24px`, `--button-padding-x-base: 6px`, `--animate-skeleton: skeleton 2s -1s infinite linear`. A scoped rule now sets `--button-height-base: var(--button-height-xs)`, so 30px is the ceiling. `references/enterprise-and-dense-b2b.md` recorded that override as `--button-height-sm` (28px); **corrected there** to match this fetch.
- Prior corpus measurements cited rather than re-derived: `references/enterprise-and-dense-b2b.md` (Grafana 23.84px rows and 12/18 data plane, Hex 24px result grid, PostHog `--button-height-base: 30px` / `--button-padding-x-base: 6px` / `--animate-skeleton: 2s -1s`, Attio's column-footer aggregation), `references/developer-platforms.md` (the Grafana time-range cluster and the oversized `No data` stat panel), `craft/color.md` (shadcn `--chart-1..5` = blue-300→800 at ΔE 5.8; IBM CVD-safe five; five-category ceiling; direct labelling), `craft/typography.md` (tabular figures on every metric, price and cell).

## Differentiation pass (2026-09)

**Compared against:** `enterprise-dense.md` (the real neighbour — same 13px body, same 4/6 radius, same hairline, same 120–180ms), `developer-platform.md` (shares Grafana as a reference product), `technical-productivity.md` (the other compact-family file). `data-terminal.md` does not exist yet, so its selector row in `archetypes/README.md` was used for the boundary claims.

**Differentiation.** Added `## Distance from the neighbours` with the four archetypes' numbers in one table, then said plainly which values are shared and where the difference actually lives: the **type ratio inverts** (12/18 is the body here, 185 of 213 nodes, versus a minority machine plane in `enterprise-dense`); the **row is a filter target, never a write target**, which is what buys 22px against 28–32px; a **second colour budget** (categorical series palette) exists that no neighbour has, with the falsifiable form "no series palette → not this archetype"; and **motion has a hard zero** because this is the only archetype where the data changes while nobody is interacting. Added the time-range cluster as the fastest structural check, and a note that "Grafana" is three archetypes' worth of surfaces and citing the brand proves nothing.

**Numbers re-probed live (Playwright computed styles, 2026-09-10, 1440×900), five sources:**
- *Rill explore* — value 25.6/38.4 w400 ✅, `tr` 22px ✅, body 12/18 ✅, no left rail ✅, 26px bar controls ✅. **Corrected:** `td padding 0 8px` → **`5px 4px`**; text-node share 159/210 → **185/213**; hairline count ×80 → **×44**; `9999px` count ×216 → **×146**. **Added:** the measure band is 85px at 4px radius; 114 leaderboard rows are `<button>`s; 181px of chrome above the first band.
- *Plausible* — 19.2/28.8 w600 ✅, 32px breakdown row ✅, 12/16 w500 headers ✅, `1px oklch(0.92 0.004 286.32)` ✅, radii 4×57 / 6×23 ✅, `0.15s cubic-bezier(0.4,0,0.2,1)` ✅. **Added:** the 32px row's label is 14/20, which is the evidence for "row height follows the click, not the cell".
- *Grafana Play* — **corrected** `No data` at "~90px" → **96.7px w500 `rgb(247,248,250)`**, and captured the well-behaved sibling at 18px w400 `rgba(204,204,220,0.65)` on the same screen: same string, 5.4× the size.
- *Observable Framework* — all six theme tokens unchanged ✅.
- *PostHog CSS* — `--button-height-base: 30px` and `--button-padding-x-base: 6px` ✅, but a scoped override now aliases the base to `--button-height-xs` (24px), so **30px is restated as a ceiling**. Control height narrowed from 26–30px to **26–28px with a 30px ceiling**, justified by this shell paying control height twice across two stacked bars.

**Wrong-archetype section** replaced wholesale: five category descriptions became six named products that superficially fit and specifically break — Stripe Balance/payouts, Vercel Usage and Linear Insights, Datadog's host map and monitor list (called out as the closest miss), Salesforce/HubSpot Reports, Strava/Oura/Whoop trends, and a Looker board readout.

**Characteristic failure** gained a twelve-row tell table with literal values (`grid-cols-4`, `bg-primary/10`, `text-3xl font-bold`, `rounded-xl` + `shadow-md` + `p-6`, `type="monotone"` with `dot={{r:4}}`, `strokeDasharray="3 3"`, `--chart-1..5` at ΔE 5.8, a `<Select>` with no `onValueChange`, "Recent activity") plus a single grep-shaped check an agent can run on its own render: search the rendered text for a timezone, `vs `, a resolved date range and `Refreshed` — zero hits across all four is the diagnosis regardless of how good the pixels are.

**Cut:** the duplicated ratio argument in `## Type` (now stated once, in the differentiation section), the third Sigma quotation in `## Copy register`, and padding in `## Mobile`.

**Corpus consistency.** Grafana's node count and radius tally now defer to the fully-loaded probe in `references/enterprise-and-dense-b2b.md` (5,080/5,332 at 12px; `tr` 23.84px; 6px ×424) instead of a second, conflicting set; `23.8px` → `23.84px`. One fix pushed the other way: `references/enterprise-and-dense-b2b.md` claimed newer PostHog branches alias `--button-height-base` to `--button-height-sm` (28px); the live stylesheet aliases it to `--button-height-xs` (24px), and that line was corrected there.
