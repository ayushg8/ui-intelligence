# Data tables, grids and dense data surfaces

**Evaluated:** 2026-09 · **Researcher note:** The engine layer settled: TanStack Table v9 went stable on 2026-08-04 with tree-shakable features and a TanStack Store core, and TanStack Virtual now out-downloads Table itself (20.9M vs 13.9M/wk) — virtualization has become the more universal primitive. The *paid* layer got competitive for the first time in a decade: MUI X v9 shipped Formulas and Pivoting, RevoGrid Pro undercuts AG Grid 5x, and LyteNyte appeared out of nowhere with the best-looking grid in the category. What's still missing is taste: almost every library ships a demo that looks like a feature checklist, and the good table *design* lives in products (Plausible, Linear, Attio), not in libraries.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| TanStack Table v9 | `essential` | The table engine; ships zero pixels, which is exactly why it's correct | low (medium via shadcn recipe) |
| TanStack Virtual | `essential` | The virtualization primitive everything else is built on | low |
| AG Grid | `strong` | Best-in-class engine, mediocre API, default theme is finally good | medium |
| react-virtuoso | `strong` | Best virtualizer for unknown/variable row heights; grid-aware | low |
| RevoGrid | `strong` | Genuinely fast MIT core, web-component portable, $199 Pro; thin bus factor | medium |
| react-window v2 | `situational` | Fixed-height lists and grids, tiny; use when Virtuoso is overkill | low |
| react-data-grid (Adazzle) | `situational` | Excellent Excel-ish editing, permanently in `7.0.0-beta` | medium |
| Perspective (FINOS) | `situational` | Arrow/WASM analytics grid for quant-desk density; ugly on purpose | low |
| MUI X Data Grid | `situational` | Right only if you're already on MUI; free tier caps virtualization at 100 rows | high |
| Handsontable | `situational` | Real spreadsheet UX, $999/dev, zero free commercial tier | medium |
| Glide Data Grid | `situational` | Best canvas grid ever built; no stable release since Feb 2024 | low |
| LyteNyte Grid | `experimental` | Best-designed grid in the category, 7 contributors, one year old | low |
| @virtuoso.dev/data-table | `experimental` | Solves the Table+Virtual glue problem; v0.4.0, 2.6k/wk | low |
| Tabulator | `reference-only` | Fine vanilla-JS grid, 2010s visual language | high |
| Grid.js | `avoid` | Slowing (last push 2026-01), superseded on every axis | high |
| react-virtualized | `avoid` | Dead since 2025-01; the author wrote react-window to replace it | — |
| DataTables (jQuery) | `avoid` | 462k/wk of legacy inertia; do not start here in 2026 | high |
| SVAR (`wx-react-grid`), "Ace Grid", Simple Table | `avoid` | SEO-farm tier; see Rejected | — |

## Recommendations by need
- **Default choice:** TanStack Table v9 + TanStack Virtual, rendered with your own `<table>` markup. It has no opinion about your product's look, which is the single most important property for anything an agent generates.
- **Best engineering:** AG Grid. The server-side row model (grouping/pivoting/lazy blocks against a backend) has no free equivalent, and 36.x ships on a fortnightly cadence. Its API is the price of admission — a decade-long AG Grid user on HN called it "quite crappy as API, documentation, support and in general as a product… the problem is, what is the alternative?"
- **Best visual quality out of the box:** LyteNyte Grid. Nothing else in this category was designed by someone who thought about how a number should be typeset.
- **Best accessibility:** AG Grid, and it is not close — it publishes an ARIA-conformance page per framework and drives a real DOM. Everything canvas-rendered (Glide, Perspective) is a screen-reader dead end. Headless (TanStack) means *you* own a11y, which is honest, not free.
- **Most customizable / least house-style:** TanStack Table. Second: LyteNyte, which ships headless and styled builds separately.
- **Lightest:** TanStack Table v9 with only the features you register — around 5kb for a sort-only table. react-window v2 for pure virtualization.
- **Promising newcomer:** `@virtuoso.dev/data-table` — MIT, from the react-virtuoso author, gives you column resize/reorder/pin/group and state persistence on top of a virtualizer that already handles variable heights.
- **Premium/paid worth it:** AG Grid Enterprise ($999/dev perpetual + 1yr updates) if you need server-side row grouping or pivoting. RevoGrid Pro Lite ($199/yr) is the value pick. MUI X Pro at $299/yr is worth it *only* to lift the 100-row virtualization cap you didn't know existed.

## Scorecards

### TanStack Table v9 — `essential`
- **What:** Headless table engine — row models, sorting, filtering, grouping, pinning, selection, column sizing. Renders nothing.
- **Verdict:** v9 (stable 2026-08-04, after a two-year RFC) is a real rewrite, not a version bump: features are now registered explicitly (`columnSizingFeature`, `rowSelectionFeature`, `rowSortingFeature`) so unused code tree-shakes out, state moved onto TanStack Store, and the project reports up to 90% memory savings on large tables and 40–70% faster client row models. The only breaking change most teams hit is column pinning moving from `left/right` to logical `start/end`. It ships no CSS, no ARIA, no virtualization — you own all three. That is the correct trade for this corpus: it is the one grid that cannot make your product look like someone else's.
- **Use when:** you have a design system and want the table to obey it · **Don't use when:** you need pivoting, server-side row grouping, or an editing surface next week.
- **Scores /5:** visual — · interaction 4 · a11y 2 (you supply it) · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 4 (v9 is one month old) · originality 4
- **Evidence:** ★28,420 · last release `@tanstack/table-core@9.2.4` 2026-08-28 · last push 2026-08-31 · 13,943,411 wk npm (`@tanstack/react-table`) · ~457 contributors · MIT
- **Looked at:** https://tanstack.com/table/latest/docs/framework/react/examples/virtualized-rows — the embedded example table is unstyled browser default: 1px `border-collapse` grid, no row rhythm, no numeric alignment. That is the library telling the truth about itself. The v9 feature-registration API is visible in the sample source. (Also noted: AG Grid is a listed silver sponsor of TanStack.)
- **Vibecode risk:** low as a library. Medium in practice, because the shadcn `data-table` recipe built on it is now so common that its faceted-filter buttons (dashed border + plus-circle icon) read as a signature.
- **Link:** https://tanstack.com/table

### TanStack Virtual — `essential`
- **What:** Headless row/column/grid virtualizer.
- **Verdict:** 20.9M weekly downloads — half again more than TanStack Table — which tells you virtualization is now assumed infrastructure, not an optimization. It handles dynamic measurement, horizontal virtualization for wide grids, and sticky/pinned items without owning your DOM. Pair it with Table and you have the 100k-row case covered with roughly 40 rows in the document. The catch nobody mentions: virtualized rows break `Ctrl+F`, print, and naive screen-reader traversal, so budget for a "show all / export" escape hatch.
- **Use when:** any list or table over ~200 rows · **Don't use when:** rows are fewer than a screenful and you'd be adding measurement complexity for nothing.
- **Scores /5:** visual — · interaction 4 · a11y 2 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 5 · originality 3
- **Evidence:** ★7,102 · `@tanstack/virtual-core@3.17.9` 2026-09-07 · last push 2026-09-07 · 20,905,134 wk npm · ~149 contributors · MIT
- **Vibecode risk:** low — it emits no markup.
- **Link:** https://tanstack.com/virtual

### AG Grid — `strong`
- **What:** Framework-agnostic enterprise grid. Community (MIT) + Enterprise (commercial, $999/dev perpetual with 1 year of updates).
- **Verdict:** Still the only grid where server-side grouping, pivoting, tree data and block-lazy loading are a solved product rather than a project. The reputational problem is real and current — practitioners describe the API and docs as poor while conceding there's no substitute — and the Community/Enterprise line is drawn precisely where a real app needs it (set filters, Excel export, clipboard range ops, row grouping, tool panels are all paid). What has genuinely changed and is under-reported: the default theme in the 33/34-era Theming API is *good now*. It no longer looks like 2016 Balham.
- **Use when:** finance/ops surfaces, server-side grouping and pivoting, or you need one grid across React/Vue/Angular · **Don't use when:** you want the table to disappear into a designed product, or $999/dev × team is a real number to you.
- **Scores /5:** visual 4 · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 3 · customization 4 · perf 5 · stability 5 · originality 3
- **Evidence:** ★15,591 · last release `release-36.1.0` 2026-08-05 · last push 2026-09-10 · 2,889,569 wk npm (`ag-grid-community`) + 2,064,513 (`ag-grid-react`) · ~150 contributors · repo license NOASSERTION (MIT community + commercial enterprise) · Enterprise $999/developer
- **Looked at:** ag-grid.com serves a CloudFront 403 to headless browsers, so I rendered `ag-grid-community@34.2.0` locally with default options and shot that. Row pitch ~42px. **No zebra, no vertical body borders** — only near-invisible horizontal hairlines, which is the modern convention, not the old full-grid look. Header sits on white with a bottom rule and *regular-weight* labels, a restrained choice most vendors get wrong. `type:'rightAligned'` right-aligns the header label as well as the values, so `$40,000 / $190,461` and `0.00% / 203.93%` form a clean right rail. Booleans render as disabled checkboxes; selection checkboxes are neutral grey, not brand-blue. Each header carries a filter glyph plus a resize pip — two affordances per boundary, slightly busy at narrow widths.
- **Vibecode risk:** medium — neutral enough to disappear, but the header filter icons, 42px rhythm and the Enterprise tool panel are recognizable to anyone who has seen an AG Grid app.
- **Link:** https://www.ag-grid.com/

### react-virtuoso — `strong`
- **What:** Virtualized list/table/grid for React with automatic variable-height measurement.
- **Verdict:** The right answer whenever row height is unknown — chat logs, comment threads, tables with wrapping cells — because it measures rather than asking you to. 2.98M/wk and shipping (4.18.13, 2026-09-05). Its weakness is the same as its strength: the measurement machinery costs more than react-window when every row is 32px and you know it.
- **Use when:** variable or content-driven row heights, grouped lists, chat-style reverse scroll · **Don't use when:** uniform fixed rows at extreme scale.
- **Scores /5:** visual — · interaction 4 · a11y 3 · engineering 5 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 5 · originality 4
- **Evidence:** ★6,453 · `react-virtuoso@4.18.13` 2026-09-05 · last push 2026-09-05 · 2,978,422 wk npm · ~80 contributors · MIT (per npm; GitHub license metadata is null)
- **Vibecode risk:** low.
- **Link:** https://virtuoso.dev/

### RevoGrid — `strong`
- **What:** Stencil-based web-component grid. MIT core; Pro Lite $199/yr, Pro Advanced $499/yr per developer.
- **Verdict:** The most under-rated engine here. 3,441 stars badly understates it: it shipped v4.27.10 the day I checked, the MIT core is commercially usable, and because it's web components the same custom cell renderers work across React/Vue/Angular/vanilla — the thing AG Grid charges for portability to do. Pro at $199/yr against AG Grid Enterprise at $999/dev is not a small delta. The honest risk is bus factor: ~28 contributors is effectively one maintainer with help.
- **Use when:** you need a real grid at a startup price, or across more than one framework · **Don't use when:** procurement needs a vendor with a support SLA and a bench.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 3 · customization 4 · perf 4 · stability 4 · originality 4
- **Evidence:** ★3,441 · `v4.27.10` 2026-09-09 · last push 2026-09-09 · 28,393 wk npm · ~28 contributors · MIT core
- **Looked at:** https://rv-grid.com/demo — "Grid at Scale", 10,000 rows × 100 columns in a "Dark Compact" theme, with a live instrumentation strip (data prep 72.8ms, grid-apply-to-paint 215.1ms, JS heap 22.0MB) — publishing your own paint cost under the demo is a confident move. Two-level column groups, left row-number gutter, ~36px row pitch, no vertical body borders. Salary right-aligned with thousands separators. But the demo over-decorates: coloured initial avatars, a red/amber/green status ring on *Age*, and an "Eye color" column rendering raw hex strings (`#2563eb`) inside coloured pills — that last one is demo data masquerading as a feature. The nav now carries an "AI Prompt Library", which is a 2026 tell in itself.
- **Vibecode risk:** medium — the default dark theme has a distinct look, and the demo's decoration habits are contagious.
- **Link:** https://rv-grid.com/

### react-window v2 — `situational`
- **What:** Minimal fixed-size list and grid virtualizer, rewritten for v2.
- **Verdict:** 4.49M/wk and 2.3.1 shipped 2026-09-05, so the "bvaughn abandoned virtualization" narrative is wrong — he abandoned *react-virtualized* (last push 2025-01-20) and put the effort here. v2 is the right pick when rows are uniform and you want the smallest possible thing. It gives you less than TanStack Virtual on dynamic measurement and less than Virtuoso on grouped content; that's the deal.
- **Use when:** uniform row heights, minimal dependency budget · **Don't use when:** heights vary, or you need horizontal virtualization tied to a table engine.
- **Scores /5:** visual — · interaction 3 · a11y 2 · engineering 4 · maintenance 4 · docs 3 · customization 3 · perf 5 · stability 4 (v2 API differs from v1) · originality 3
- **Evidence:** ★17,205 · `2.3.1` 2026-09-05 · last push 2026-09-05 · 4,492,807 wk npm · ~37 contributors · MIT
- **Vibecode risk:** low.
- **Link:** https://github.com/bvaughn/react-window

### react-data-grid (Adazzle) — `situational`
- **What:** React grid with spreadsheet-style editing, cell ranges, tree/grouped rows.
- **Verdict:** Technically the best free Excel-ish editing surface in React, and it is actively maintained (pushed 2026-09-09). The problem is governance, not code: the npm `latest` dist-tag has been `7.0.0-beta.*` for years — currently `7.0.0-beta.61` from 2026-07-14, with beta.59 → beta.60 spanning seven months of silence. You are shipping a beta into production and inheriting whatever `7.0.0` final decides to change.
- **Use when:** you need range selection and inline editing without paying, and can pin an exact beta · **Don't use when:** your org forbids pre-1.0/beta dependencies, or you need pivoting.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 4 · docs 3 · customization 3 · perf 4 · stability 2 · originality 3
- **Evidence:** ★7,675 · `v7.0.0-beta.61` 2026-07-14 · last push 2026-09-09 · 497,657 wk npm · ~120 contributors · MIT (repo metadata NOASSERTION)
- **Looked at:** the GitHub Pages demo at `adazzle.github.io/react-data-grid/#/common-features` 404s — the deep link in the docs is dead, which is its own maintenance signal.
- **Vibecode risk:** medium — its default light theme is plain but distinctive enough to spot.
- **Link:** https://github.com/adazzle/react-data-grid

### Perspective (FINOS) — `situational`
- **What:** WASM + Apache Arrow analytics engine with its own virtual `regular-table` renderer, pivoting, and now DuckDB-WASM ingestion.
- **Verdict:** Different category from everything else here — you hand it columnar data and it does the aggregation in WASM rather than asking JavaScript to. Originally built inside J.P. Morgan, now Apache-2.0 under FINOS, and it ships constantly (v5.4.0 released 2026-09-09). If your "table" is really a pivot/analysis surface over millions of rows, this beats bolting grouping onto a DOM grid. It is not a UI library and will not blend into a designed product.
- **Use when:** trading blotters, telemetry explorers, notebook-adjacent analysis · **Don't use when:** you need a styled product table.
- **Scores /5:** visual 2 · interaction 4 · a11y 1 · engineering 5 · maintenance 5 · docs 3 · customization 2 · perf 5 · stability 4 · originality 5
- **Evidence:** ★11,177 · `v5.4.0` 2026-09-09 · last push 2026-09-09 · ~89 contributors · Apache-2.0 · weekly npm unverified (registry rate-limited during this session)
- **Looked at:** https://perspective.finos.org/ — a gallery of ~20 live workspaces. Deliberately Bloomberg-adjacent: monospaced numerics, negative values in red on a pale-red cell fill, extreme row density, treemaps and heatmaps sitting inside the same grid chrome. Zero decorative styling and zero apology for it. The left rail exposes `perspective-server` and `DuckDB-WASM` as first-class data sources.
- **Vibecode risk:** low — nobody will mistake it for a generated SaaS table.
- **Link:** https://perspective.finos.org/

### MUI X Data Grid — `situational`
- **What:** Material-styled grid. Community (MIT), Pro $299/dev/yr, Premium $599, Enterprise $1,399.
- **Verdict:** The trap that costs teams weeks: **the free Data Grid documents row virtualization as limited to 100 rows.** Ship 10k rows on Community and you get 10k rows of DOM. Everything you actually need — column pinning, row reordering, cell editing, tree data, master-detail — is Pro. On the credit side, v9 is moving fast and has pushed into AG Grid's lane with Formulas and Pivoting (Premium, both marked NEW in the 9.13 docs). But visually it is the most house-styled option in this file.
- **Use when:** the app is already Material UI and you'll pay for Pro · **Don't use when:** anywhere else, and never on Community above 100 rows.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 5 · customization 3 · perf 3 (community) / 4 (pro) · stability 4 · originality 2
- **Evidence:** ★5,845 (mui/mui-x monorepo) · `v9.13.0` 2026-09-04 · last push 2026-09-09 · 2,736,987 wk npm (`@mui/x-data-grid`) · ~473 contributors · MIT community / commercial Pro+Premium
- **Looked at:** https://mui.com/x/react-data-grid/demo/ — the live feature grid runs a **53px row pitch**, the tallest of anything I measured and a straight Material inheritance; you fit ~40% fewer rows on screen than Handsontable's default. Hairline row rules, no zebra, no vertical body borders (a recent improvement). Cell links are underlined MUI blue `#1976d2`, which is the single loudest tell in the whole render. Plan chips ("Community" green, Pro/Premium as emoji cubes) are docs chrome, not product.
- **Vibecode risk:** high — 52px rows plus Material blue plus Roboto-adjacent type is identifiable from a thumbnail.
- **Link:** https://mui.com/x/react-data-grid/

### Handsontable — `situational`
- **What:** Spreadsheet component with a real formula engine (HyperFormula). Commercial: from $999/developer; free "Hobby" licence explicitly forbids commercial use.
- **Verdict:** If users expect Excel — fill handles, formulas, merged cells, copy-paste of ranges — this is a shortcut worth money, and the 2026 "Main" theme is much better than the product's reputation. Two things to hold against it: the licence has no free commercial tier at all (unlike AG Grid Community), and its own "Performance at Scale" demo defaults to **100 rows** while claiming virtual scrolling handles massive datasets. Perf marketing measured on 100 rows is not perf marketing.
- **Use when:** the requirement is literally "make it work like Excel" · **Don't use when:** you want a read-mostly product table, or you can't buy per-seat licences.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 4 · maintenance 5 · docs 4 · customization 3 · perf 4 · stability 5 · originality 3
- **Evidence:** ★22,040 · `18.1.0` 2026-09-01 · last push 2026-09-10 · 291,630 wk npm · ~143 contributors · commercial (NOASSERTION); Standard from $999/dev, Priority from $1,299/dev, 45-day trial
- **Looked at:** https://handsontable.com/demo — ~29.5px row pitch, genuinely dense. Full 1px vertical *and* horizontal cell borders (spreadsheet convention, correct here), grey header with left-aligned labels and a per-column dropdown caret, left row-number gutter. `$30,042` style salaries right-aligned with separators — correct. Two design faults: Status and Priority both use pale-blue pills, so "High/Medium/Low" is encoded as *saturation of one hue* instead of distinct hues and reads as noise; and Rating uses a 5-star amber widget that eats ~90px to convey a 1–5 integer.
- **Vibecode risk:** medium — the theme is neutral, but star-ratings and pill-per-column habits from the demo travel.
- **Link:** https://handsontable.com/

### Glide Data Grid — `situational`
- **What:** Canvas-rendered React grid built as the engine of Glide's own data editor.
- **Verdict:** The best canvas grid anyone has shipped as open source, and the only realistic way to build an Airtable-class surface in React — millions of cells, custom canvas cell renderers, real spreadsheet keyboard semantics. But look at the release record before you commit: **stable `latest` is 6.0.3, published 2024-02-03**, the newest publish of any kind is `6.0.4-alpha24` from 2025-10-08, and the repo's last push was 2026-01-21 with ~55 contributors. That's a two-and-a-half-year stable-release drought on a vendor-controlled project. And because it paints to canvas, there is no DOM for a screen reader to walk.
- **Use when:** you're building a spreadsheet/Airtable-like surface, are comfortable pinning `6.0.3` or an alpha, and a11y is genuinely out of scope · **Don't use when:** it's core infrastructure you'll need patched, or the surface must be accessible.
- **Scores /5:** visual 4 · interaction 5 · a11y 1 · engineering 5 · maintenance 2 · docs 3 · customization 4 · perf 5 · stability 3 · originality 5
- **Evidence:** ★5,331 · `v6.0.3` 2024-02-03 (`6.0.4-alpha24` 2025-10-08) · last push 2026-01-21 · 292,450 wk npm · ~55 contributors · MIT
- **Looked at:** https://grid.glideapps.com/ — the marketing page is full synthwave kitsch (neon-pink outrun sun, purple gradient), but the grid under it is excellent: a two-level header where the upper row groups columns (ID / Name / Info / Employment) and the lower row carries **per-column data-type glyphs** — `A` for text, an image icon, a checkbox, a link, `123`, a relation arrow — so the schema is legible without a legend. ~34.5px rows, dimmed row-number gutter, full 4-side cell borders, active cell marked by a violet fill plus a dashed focus ring. Sparklines and avatar chips are rendered *on the canvas*, which is the whole point.
- **Vibecode risk:** low — its Airtable-lineage look is a deliberate genre, not a default.
- **Link:** https://github.com/glideapps/glide-data-grid

### LyteNyte Grid (1771 Technologies) — `experimental`
- **What:** React data grid, headless or styled, Core + Pro tiers.
- **Verdict:** Visually the best thing in this category and it isn't close — someone there thinks about typography. Independent benchmarking cited it holding 60 FPS to 1M rows where MUI fell to 33 and AG Grid to 27, but that comparison originates from 1771's own blog, so treat it as a vendor claim. The reason it is `experimental` and not `strong` is entirely non-technical: created 2025-01, ~7 contributors, 1,023 stars, 11.8k weekly npm, and **no GitHub releases cut at all**. That is a single-vendor dependency at the centre of your product.
- **Use when:** a side surface, an internal tool, or a project where you can absorb the risk and want the look · **Don't use when:** it's load-bearing infrastructure with a multi-year horizon.
- **Scores /5:** visual 5 · interaction 4 · a11y 3 (unverified) · engineering 4 · maintenance 3 · docs 4 · customization 5 · perf 5 (vendor-claimed) · stability 2 · originality 5
- **Evidence:** ★1,023 · created 2025-01-04 · last push 2026-08-15 · no GitHub releases · 11,769 wk npm (`@1771technologies/lytenyte-core`) · ~7 contributors · repo license NOASSERTION (Core/Pro split; pricing page timed out during this session — unverified)
- **Looked at:** https://www.1771technologies.com/ — a dark equities grid at ~43px rows. The move that separates it from every other grid: **units are typeset as a second, dimmer register** — `559.14` in white with `USD` in muted grey beside it, `9.16 M`, `1.13 T USD` — so magnitude reads first and the unit recedes instead of competing. Change % is bare red/green text with no fill. Analyst Rating pairs a semantic glyph (green caret for Buy, grey em-dash for Neutral) with the word. The Symbol cell stacks a brand logo, a ticker in a small grey chip, and the full company name at three clear levels of hierarchy. Above the header, row-group chips (Exchange, Change) carry 6-dot grab handles. Minor fault: each column boundary carries both a 3-dot menu and a resize pip — two affordances per edge.
- **Vibecode risk:** low — the aesthetic is specific and good; you'd be copying taste, not a default.
- **Link:** https://www.1771technologies.com/

### @virtuoso.dev/data-table — `experimental`
- **What:** MIT virtualized data table from the react-virtuoso author: row *and* column virtualization, grouped rows, sticky columns, column resize/reorder/visibility, state persistence. Ships headless and shadcn-styled builds.
- **Verdict:** This is the first library to properly close the gap everyone hand-writes — TanStack Table gives you state, TanStack Virtual gives you windowing, and you write 300 lines of glue for sticky columns and measurement. Succeeds the old `TableVirtuoso` component. It is 0.4.0, first published 2026-03-21, at 2,578 downloads/week. Watch it; don't stake a product on it yet.
- **Use when:** prototyping a dense table where you'd otherwise write the glue by hand · **Don't use when:** the API churn of a 0.x from a single author is unacceptable.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 (unverified) · engineering 4 · maintenance 4 · docs 3 · customization 4 · perf 4 · stability 1 · originality 4
- **Evidence:** `0.4.0` 2026-09-02 · first publish 2026-03-21 · 2,578 wk npm · MIT
- **Vibecode risk:** low; the shadcn-styled build inherits shadcn's tells.
- **Link:** https://virtuoso.dev/data-table/

### Tabulator — `reference-only`
- **What:** Framework-agnostic vanilla-JS table, MIT, 10 years old.
- **Verdict:** Maintained (6.5.2, 2026-06-23) and feature-broad — range selection, clipboard, a spreadsheet module, virtual DOM in both axes — and for a Rails/Django/no-build page it remains a rational choice. But 394 open issues and a visual language a decade old make it the wrong default for anything new in React, and its demo teaches habits you don't want.
- **Use when:** server-rendered pages with no build step · **Don't use when:** you're in a React/Vue app.
- **Scores /5:** visual 2 · interaction 4 · a11y 2 · engineering 3 · maintenance 4 · docs 4 · customization 3 · perf 3 · stability 4 · originality 2
- **Evidence:** ★7,757 · `6.5.2` 2026-06-23 · last push 2026-09-10 · 158,442 wk npm · ~124 contributors · MIT · 394 open issues
- **Looked at:** https://tabulator.info/examples/6.3 — ~32px rows, which is respectably dense, and numeric columns (Progress) *are* right-aligned. Everything else is 2005 enterprise grid: full 1px borders on all four sides of every cell, **centred bold header labels**, a green-filled row-number gutter, and booleans rendered as literal `true` / `false` / `1` text with no formatter discipline. The docs site's green-on-black theme reads as a long-running personal project, which is exactly what it is.
- **Vibecode risk:** high — anything copied from these demos looks a decade old.
- **Link:** https://tabulator.info/

## Table *design*: what the good ones actually do

I screenshotted production surfaces alongside the libraries. The single best reference I captured was Plausible's public dashboard (https://plausible.io/plausible.io), and it is instructive because it throws away almost every table convention:

- **No borders and no zebra. At all.** No row rules, no header rule, no cell dividers. Rows are separated by whitespace and by the bar fill. Zebra striping is a 2008 crutch for tables that are too tall and too gap-less; fix the rhythm instead.
- **Magnitude lives *in* the row.** A pale tinted bar (mint for audience tables, pink for goals, ~5% alpha) fills left-to-right in proportion to the value, behind the label. The row *is* the bar chart, so no separate chart column is needed.
- **Numerics sit on a hard right rail and are abbreviated to ≤5 glyphs** — `183k`, `81.5k`, `15.7k`, `1.7k`, `971`, `775`. Abbreviation does more for optical alignment than tabular figures do, because every value is the same width by construction. Use `font-variant-numeric: tabular-nums` as well, not instead.
- **Nulls are an em-dash, never `0` and never blank.** Blank reads as "missing data"; `0` reads as a measured zero. `–` reads as "not applicable".
- **Headers are tiny, grey, sentence-case, and only appear where a column needs naming.** Sort affordances stay hidden until hover.
- **Row pitch ~36px** with the fill occupying ~30px and ~6px of gap — dense enough to compare, loose enough to scan. Favicon-size icons at the row start replace an icon column.

Cross-checking pitch across everything I measured: Handsontable 29.5px · RevoGrid "Dark Compact" 36px · Plausible 36px · Tabulator 32px · Glide 34.5px · AG Grid default 42px · LyteNyte 43px · shadcn `tasks` example 49px · **MUI X 53px**. Anything above ~44px is a comfort default, not a dense-data default, and should be a density *toggle*, not a fixed value. If you copy one number from this file, copy 36.

Two more rules the good ones follow and the demos don't: **right-align the header label too**, not just the values (AG Grid's `rightAligned` column type does this; most hand-rolled tables forget); and **encode categorical state with hue, not with saturation of one hue** — Handsontable's demo renders High/Medium/Low as three shades of the same blue, which destroys the ranking it's trying to show.

One honest negative finding: Linear's and Attio's marketing sites no longer show their list views at all. Both now lead with an AI-chat hero (Linear: "The product development system for teams and agents"; Attio: "Welcome to agentic revenue"), and the product shots below the fold are a Kanban board and an assistant panel respectively. The famous dense tables are behind login in 2026 — cite them from memory at your own risk; I could not verify their current specifics.

## Rejected / avoid
- **Grid.js** — ★4,691 but last push 2026-01-29 and slowing; nothing it does isn't done better by TanStack Table + your own markup.
- **react-virtualized** — ★27,074 and last push 2025-01-20. Dead. Its own author wrote react-window to replace it. Stars are a distribution artifact here, nothing more.
- **DataTables (jQuery)** — 462,028 weekly npm downloads of pure legacy inertia, plus a CDN outage post-mortem in 2025. Fine to maintain, never to start.
- **SVAR React DataGrid (`wx-react-grid`)** — surfaced repeatedly in "top alternatives" listicles; npm shows `1.3.1` last published **2025-02-03** and **202 downloads/week**. The listicles are published by svar.dev.
- **"Ace Grid"** — appears in multiple 2026 "best React data grid" articles with a Core/Pro split. **There is no `ace-grid` package on npm.** The comparison articles are the product.
- **Simple Table (`simple-table-core`)** — real and actively published (4.2.7, 2026-08-30) but at 2,757 downloads/week with no discoverable public repository, while simple-table.com publishes the "Best React Table Libraries 2026" and "TanStack Table vs AG Grid" rankings that surface above the actual libraries in search. Treat that entire genre of result as advertising.
- **Any "top N data grids 2026" post hosted on a grid vendor's own domain** (svar.dev, rv-grid.com, syncfusion.com, infragistics.com, simple-table.com, ace-grid.com). Search page one for this category is now almost entirely vendor-authored comparisons that rank the host first. This is the dominant failure mode for an agent researching tables.

## What surprised me
- **Glide Data Grid's stable release is from February 2024.** `latest` on npm is still `6.0.3`; the newest publish of any kind is an alpha from 2025-10-08. It is still recommended everywhere as the go-to canvas grid, and its reputation is running about two years ahead of its release record.
- **TanStack Virtual is downloaded 50% more than TanStack Table** (20.9M vs 13.9M/wk). The virtualizer, not the table engine, is the more universal primitive now — and TanStack Table v9's tree-shakable feature registration means a sort-only table can start around 5kb.
- **MUI X Community caps row virtualization at 100 rows**, documented plainly on their own virtualization page. Most teams discover this after shipping, and the fix is a $299/dev/yr line item.
- **AG Grid's default theme is genuinely good now** — no zebra, no vertical body borders, regular-weight headers, right-aligned numeric headers — and its reputation for looking dated is roughly a decade stale. Meanwhile its *API* reputation among long-term users is worse than its marketing suggests.
- **RevoGrid Pro is $199/yr against AG Grid Enterprise's $999/dev**, with an MIT core that's free for commercial use, from a project shipping releases daily. Almost nobody in the discourse mentions it.
- **The comparison-content layer for this category has been captured by vendors.** Searching "best react data grid 2026" returns eight results, six of them written by grid vendors ranking themselves first, and at least one recommending a product that has no npm package.

## Open questions
- **LyteNyte's licence and Pro pricing.** The repo reports NOASSERTION and 1771technologies.com/pricing timed out on fetch. Settled by reading `LICENSE` in the repo and the Pro EULA before adopting.
- **LyteNyte's and Handsontable's performance claims** (60 FPS at 1M rows; "no lag on massive datasets" demoed at 100 rows) both originate from the vendors. Settled by an independent harness rendering the same 100k/1M-row dataset across AG Grid, MUI X, LyteNyte and TanStack+Virtual with a scripted scroll and a frame-timing trace.
- **Real a11y conformance, as opposed to a11y marketing.** Every vendor claims WAI-ARIA support; AG Grid is the only one publishing per-framework ARIA documentation. Settled by NVDA/VoiceOver runs against each grid's own demo testing: announcing row/column position, entering and exiting edit mode, and whether virtualized rows break traversal.
- **Perspective's npm download volume** — the registry rate-limited during this session; unverified.
- **Linear's and Attio's current table specifics** (row height, hover affordance, density toggles) are behind login and were not verifiable from their marketing sites, which now lead with AI chat surfaces. Settled by a logged-in capture.
