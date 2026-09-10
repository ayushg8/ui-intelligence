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
| react-data-grid (now Comcast) | `situational` | Excellent Excel-ish editing, permanently in `7.0.0-beta` | medium |
| Perspective (`@perspective-dev`) | `situational` | Arrow/WASM analytics grid for quant-desk density; ugly on purpose. **Left FINOS; `@finos/perspective` is deprecated** | low |
| Vaadin Grid | `situational` | The best-behaved non-React option; web component, Java+TS, restrained default | low |
| SVAR React DataGrid | `situational` | Real MIT grid at 106k/wk — this file previously dismissed it on a dead package name | medium |
| Ant Design Table | `situational` | Enormous reach, deep features, and the loudest house style after MUI | high |
| PrimeReact DataTable | `situational` | Feature-complete and free, but wears its theme on its sleeve | high |
| Univer | `situational` | Apache-2.0 spreadsheet suite; the free answer to Handsontable's $999 | medium |
| Material React Table | `avoid` | 302k/wk, no release since 2025-03; *the* default AI-generated React table | **very high** |
| MUI X Data Grid | `situational` | Right only if you're already on MUI; free tier caps virtualization at 100 rows | high |
| Handsontable | `situational` | Real spreadsheet UX, $999/dev, zero free commercial tier | medium |
| Glide Data Grid | `situational` | Best canvas grid ever built; no stable release since Feb 2024 | low |
| LyteNyte Grid | `experimental` | Best-designed grid in the category, 7 contributors, one year old | low (grid) / high (its site chrome) |
| @virtuoso.dev/data-table | `experimental` | Solves the Table+Virtual glue problem; v0.4.0, 2.6k/wk | low |
| Tabulator | `reference-only` | Fine vanilla-JS grid, 2010s visual language | high |
| Grid.js | `avoid` | Slowing (last push 2026-01), superseded on every axis | high |
| react-virtualized | `avoid` | Dead since 2025-01; the author wrote react-window to replace it | — |
| DataTables (jQuery) | `avoid` | 462k/wk of legacy inertia; do not start here in 2026 | high |
| "Ace Grid", Simple Table | `avoid` | SEO-farm tier; see Rejected | — |

## Recommendations by need
- **Default choice:** TanStack Table v9 + TanStack Virtual, rendered with your own `<table>` markup. It has no opinion about your product's look, which is the single most important property for anything an agent generates.
- **Best engineering:** AG Grid. The server-side row model (grouping/pivoting/lazy blocks against a backend) has no free equivalent, and 36.x ships on a fortnightly cadence. Its API is the price of admission — a decade-long AG Grid user on HN called it "quite crappy as API, documentation, support and in general as a product… the problem is, what is the alternative?"
- **Best visual quality out of the box:** LyteNyte Grid. Nothing else in this category was designed by someone who thought about how a number should be typeset.
- **Best accessibility:** AG Grid, and it is not close — it publishes an ARIA-conformance page per framework and drives a real DOM. Everything canvas-rendered (Glide, Perspective) is a screen-reader dead end. Headless (TanStack) means *you* own a11y, which is honest, not free.
- **Most customizable / least house-style:** TanStack Table. Second: LyteNyte, which ships headless and styled builds separately.
- **Lightest:** TanStack Table v9 with only the features you register — around 5kb for a sort-only table. react-window v2 for pure virtualization.
- **Promising newcomer:** `@virtuoso.dev/data-table` — MIT, from the react-virtuoso author, gives you column resize/reorder/pin/group and state persistence on top of a virtualizer that already handles variable heights.
- **Premium/paid worth it:** AG Grid Enterprise ($999/dev perpetual + 1yr updates, verified on the pricing page) if you need server-side row grouping or pivoting. RevoGrid Pro Lite ($199/yr) is the value pick. LyteNyte Developer PRO is **$399/seat/yr** (list $799). MUI X Pro at $299/yr is worth it *only* to lift the 100-row virtualization cap you didn't know existed.
- **Best non-React option:** Vaadin Grid — 253k/wk, a real web component, restrained by default. The previous revision framed RevoGrid as *the* web-component play; Vaadin Grid out-downloads it 9:1 and behaves better out of the box. Tabulator remains the no-build-step answer; `vxe-table` is the dense Vue answer.
- **Free Excel-class editing:** Univer (Apache-2.0) before Handsontable ($999/dev, no free commercial tier).
- **What to actively avoid:** `material-react-table` — 302k/wk, no release since 2025-03-01, and the strongest AI-generated-table fingerprint in the ecosystem. See its scorecard.

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
- **Evidence:** ★7,675 · `v7.0.0-beta.61` 2026-07-14 · last push 2026-09-09 · 497,657 wk npm · ~120 contributors · MIT (repo metadata NOASSERTION) · **the repo now lives at `Comcast/react-data-grid`** — `adazzle/react-data-grid` 301-redirects. Worth knowing before you file the "unmaintained hobby project" verdict: it has a corporate owner. Beta timeline verified: beta.58 2025-10-07 → beta.59 2025-12-04 → **beta.60 2026-07-09** (a seven-month gap) → beta.61 2026-07-14.
- **Looked at:** the GitHub Pages demo at `adazzle.github.io/react-data-grid/#/common-features` 404s — the deep link in the docs is dead, which is its own maintenance signal.
- **Vibecode risk:** medium — its default light theme is plain but distinctive enough to spot.
- **Link:** https://github.com/adazzle/react-data-grid

### Perspective (`@perspective-dev`) — `situational`
- **What:** WASM + Apache Arrow analytics engine with its own virtual `regular-table` renderer, pivoting, and now DuckDB-WASM ingestion.
- **Verdict:** Different category from everything else here — you hand it columnar data and it does the aggregation in WASM rather than asking JavaScript to. Originally built inside J.P. Morgan, Apache-2.0, and it ships constantly (v5.4.0 released 2026-09-09). If your "table" is really a pivot/analysis surface over millions of rows, this beats bolting grouping onto a DOM grid. It is not a UI library and will not blend into a designed product.
- **⚠️ Install the right package.** The project has **left the FINOS org**: the repo is now `perspective-dev/perspective` (github.com/finos/perspective 301-redirects), and **`@finos/perspective` is formally deprecated on npm** — frozen at `3.8.0` (2025-09-03) with the deprecation notice *"This package is no longer maintained. Please upgrade to @perspective-dev/client."* Current packages are `@perspective-dev/client`, `/viewer`, `/react`, `/viewer-datagrid` at 5.4.0. Any agent or listicle citing `@finos/perspective` — including the previous revision of this file — installs a year-stale, unmaintained package.
- **Honest scale:** this is a *small* project by downloads — ~11.9k/wk (`client`) + ~9.0k/wk (`viewer`). It is excellent and it is niche; do not read its 11k stars as adoption.
- **Use when:** trading blotters, telemetry explorers, notebook-adjacent analysis · **Don't use when:** you need a styled product table.
- **Scores /5:** visual 2 · interaction 4 · a11y 1 · engineering 5 · maintenance 5 · docs 3 · customization 2 · perf 5 · stability 4 · originality 5
- **Evidence:** ★11,177 (`perspective-dev/perspective`) · `v5.4.0` 2026-09-09 · last push 2026-09-09 · ~89 contributors · Apache-2.0 · **11,921 wk npm** (`@perspective-dev/client`) + 8,952 (`@perspective-dev/viewer`) + 1,273 (`@perspective-dev/react`); legacy `@finos/perspective` deprecated at 3.8.0 (2025-09-03)
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

### Vaadin Grid — `situational`
- **What:** Web-component data grid with parallel TypeScript and Java (Flow) APIs. Part of `vaadin/web-components`; Grid Pro (inline editing) is the paid tier.
- **Verdict:** The most under-represented option in every React-centric roundup, this file's previous revision included. 253k weekly downloads — **9× RevoGrid** — with lazy loading, cell focus, tooltips, context menus, programmatic scrolling, drag-and-drop and an explicit empty state, all documented per-API. Because it is a custom element it drops into React/Vue/Svelte/plain HTML, which is the portability argument the file previously credited only to RevoGrid. The catch: it is happiest inside the Vaadin/Lumo world, the Java-side features (including "AI-Powered Grid") are Flow-only, and adopting it tends to pull in the design system rather than just the component.
- **Use when:** Java/Spring backends, multi-framework front ends, or you want a grid that behaves well by default · **Don't use when:** you want a headless engine, or you'd fight the Lumo theme.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 5 · customization 3 · perf 4 · stability 5 · originality 2
- **Evidence:** `@vaadin/grid@25.2.10` 2026-09-03 · 253,644 wk npm · monorepo `vaadin/web-components` last push 2026-09-09 (★581 — the component monorepo is not where the stars live; don't read it as adoption) · Apache-2.0 core, Grid Pro commercial
- **Looked at:** the v25 docs Grid demo — restrained and correct: horizontal hairlines only, **no zebra, no vertical body borders**, grey regular-weight header labels, generous row pitch (a comfort default, not a dense one). Ships two themes (Lumo / Aura) with a live switcher. Nothing here is trying to impress you, which is the compliment.
- **Vibecode risk:** low — the default is quiet enough to disappear, and Lumo is not a look agents reach for unprompted.
- **Link:** https://vaadin.com/docs/latest/components/grid

### SVAR React DataGrid — `situational`
- **What:** MIT data grid with virtual scrolling, tree data, filtering and inline editing. Same codebase shipped for React, Vue and Svelte.
- **Verdict:** **This entry is a correction.** The previous revision filed SVAR under "SEO-farm tier" on the strength of `wx-react-grid` — `1.3.1`, 2025-02-03, 202 downloads/week. That is a dead package name. The live one is `@svar-ui/react-grid`, and the vendor's own hero prints `npm install @svar-ui/react-grid`. It does **106,500 downloads/week**, shipped 2.7.4 on 2026-09-02, is genuinely MIT, and the repo was pushed 2026-09-01. Checking a stale package name and concluding a library is fake is exactly the failure this corpus is supposed to catch.
- **The meta-critique still stands:** svar.dev publishes "best React data grid" comparisons that rank SVAR first. A vendor writing its own listicles can *also* ship a real product; those are independent facts, and the previous revision collapsed them.
- **Honest ranking:** mid-tier. It is competent, not exceptional — no server-side row model, no pivoting, and the demo's row pitch is loose enough that it is not a dense-data default. `situational`, not `strong`.
- **Use when:** you want a free MIT grid with tree data and editing across React/Vue/Svelte · **Don't use when:** you need server-side grouping/pivoting, or a large contributor bench.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 (unverified) · engineering 3 · maintenance 4 · docs 3 · customization 3 · perf 4 · stability 4 · originality 2
- **Evidence:** `@svar-ui/react-grid@2.7.4` 2026-09-02 · **106,500 wk npm** · repo `svar-widgets/grid` ★225, last push 2026-09-01 · MIT · Vue (`@svar-ui/vue-grid`) and Svelte (`@svar-ui/svelte-grid`) builds from the same core
- **Looked at:** https://svar.dev/react/datagrid/ — a task grid with tree disclosure carets, checkbox selection with a left accent bar on selected rows, and multi-assignee avatar stacks. One thing it gets *right* that Handsontable's demo gets wrong: status is encoded as **distinct hues** (blue In progress / green Done / grey Not started) with a leading dot, not as shades of one hue. Faults: cartoon avatar illustrations, generous wrapping rows, and a cyan-gradient marketing hero that is itself fairly generic.
- **Vibecode risk:** medium — the pill-plus-avatar-stack task-table look is very close to what an agent emits by default.
- **Link:** https://svar.dev/react/datagrid/

### Ant Design Table — `situational`
- **What:** The `Table` component inside antd. Not a separate package — you take the whole design system.
- **Verdict:** By deployed volume this is plausibly the most-used table in the world outside jQuery, and the file's previous revision did not mention it once. antd is at **3.2M downloads/week** and ★99,458, and `Table` is a first-class component with ~35 documented examples covering tree data, fixed headers, fixed and stacked columns, editable cells and rows, nested tables, drag sorting, grouping, multi-sorter and Ajax loading. Feature-for-feature it is closer to AG Grid Community than most people assume, and it is free.
- **The cost is total aesthetic capture.** You cannot take the Table without the design system, and antd's is one of the two most recognizable house styles in software (the other being Material). Its signature — `#1677ff` primary blue, grey filled bold headers, and the blue-bordered pagination pills parked bottom-right — is identifiable from a thumbnail at any size.
- **Use when:** the app is already antd, or it's an internal tool where speed beats identity · **Don't use when:** the product has a visual identity of its own.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 5 · customization 2 · perf 3 · stability 5 · originality 1
- **Evidence:** `antd@6.6.3` 2026-09-07 · 3,199,837 wk npm · ★99,458 · last push 2026-09-10 · MIT · 115 open issues on `components/table` alone
- **Vibecode risk:** **high.** Alongside MUI and shadcn, antd is one of the three looks an LLM produces when asked for "a data table" with no further direction. If the goal is output that doesn't read as generated, this is a deliberate choice you make with reasons, not a default you accept.
- **Link:** https://ant.design/components/table

### PrimeReact DataTable — `situational`
- **What:** The DataTable in PrimeReact — virtual scrolling, lazy loading, row/cell editing, grouping, frozen columns, filters, CSV/Excel export, all free and MIT.
- **Verdict:** The most feature-complete *free* React table nobody in the React-Twitter discourse mentions, and another total omission from the previous revision. 226k/wk, actively shipped (11.1.0, 2026-08-05). It gives away several things AG Grid charges for — export, frozen columns, row grouping. The trade is that PrimeReact's theming is heavy and the component API is large and configuration-driven rather than composable.
- **Use when:** you need a lot of grid features for zero budget and can live inside PrimeReact's theming · **Don't use when:** you want a headless engine or a light dependency.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 3 · maintenance 5 · docs 4 · customization 3 · perf 3 · stability 4 · originality 2
- **Evidence:** `primereact@11.1.0` 2026-08-05 · 226,763 wk npm · ★8,317 · last push 2026-09-05 · MIT
- **Vibecode risk:** **high** — themed PrimeReact is instantly identifiable, and its stock striped-and-bordered DataTable is a stronger "generated admin panel" signal than anything else in this file except Material React Table.
- **Link:** https://primereact.org/datatable/

### Univer — `situational`
- **What:** Apache-2.0 spreadsheet/document suite (the successor lineage to Luckysheet) with formulas, formatting and collaborative editing.
- **Verdict:** Belongs here because the previous revision recommended Handsontable at **$999/dev with no free commercial tier** without noting that a genuinely large, genuinely Apache-2.0 spreadsheet exists. Univer is at 327k weekly downloads on `@univerjs/core`, ★14,336, and was pushed the day I checked. If the requirement is "make it work like Excel" and the budget is zero, this is the first thing to evaluate, not a footnote. Caveats: it is a *suite*, not a grid component — heavier and more opinionated than Handsontable — and the docs and community skew Chinese-language.
- **Use when:** Excel-class editing on an open-source licence · **Don't use when:** you want a read-mostly product table, or a small dependency.
- **Scores /5:** visual 3 · interaction 4 · a11y 2 · engineering 4 · maintenance 5 · docs 3 · customization 3 · perf 4 · stability 3 · originality 4
- **Evidence:** `@univerjs/core@0.25.1` 2026-06-27 · 327,241 wk npm · ★14,336 · last push 2026-09-10 · Apache-2.0 · still 0.x
- **Vibecode risk:** medium — it looks like Excel, which is a genre rather than a generated default.
- **Link:** https://github.com/dream-num/univer

### Material React Table — `avoid` (and the most important entry in this file)
- **What:** TanStack Table v8 wrapped in MUI components. Not maintained by either project.
- **Verdict:** **This is what an agent builds when you ask for a React data table and don't stop it**, which makes its absence from the previous revision the single biggest gap in the file. It does **302,649 downloads/week** — more than Handsontable, Glide and RevoGrid combined — on ★1,802. And it is **stale**: `3.2.1` shipped **2025-03-01**, eighteen months ago, with the repo last pushed 2026-06-05. It pins TanStack Table v8 while v9 is stable, and it inherits MUI's licensing and bundle weight on top of TanStack's.
- **What its own flagship demo looks like** (I shot the "Advanced Example" myself): salaries rendered as **saturated orange filled pills** — `$52,729`, `$71,964` — left-aligned inside the chip, so a currency column has *no right rail at all*. Currency is not categorical data and must never be a pill; this is the exact habit that makes generated tables unreadable, being taught by the most-downloaded example in the ecosystem. Every header stacks **four affordances** (label, sort arrows, drag grip, 3-dot menu) above a filter input and a `Filter Mode: Fuzzy` caption, giving a ~150px-tall header block before one row of data. The avatar images are **broken** — literal missing-image icons in every row of the flagship demo.
- **Use when:** essentially never for new work. If you're already on MUI and want this shape, use MUI X Data Grid (supported, and the same aesthetic) or TanStack Table v9 with your own markup.
- **Scores /5:** visual 2 · interaction 4 · a11y 3 · engineering 3 · maintenance 1 · docs 4 · customization 3 · perf 3 · stability 2 · originality 1
- **Evidence:** `material-react-table@3.2.1` **2025-03-01** · 302,649 wk npm · ★1,802 · last push 2026-06-05 · MIT · pins TanStack Table v8
- **Vibecode risk:** **very high — the highest in this file.** Orange money-pills, four-glyph headers and MUI blue is the composite fingerprint of a generated table. If you are auditing a product for AI-generated feel, grep the lockfile for `material-react-table` first.
- **Link:** https://www.material-react-table.com/
- **Related, same failure mode:** `mantine-react-table` — the same wrapper idea against Mantine, last published `1.3.4` on **2023-11-06**. Nearly three years stale. Do not adopt.

### LyteNyte Grid (1771 Technologies) — `experimental`
- **What:** React data grid, headless or styled, Core + Pro tiers.
- **Verdict:** Visually the best thing in this category and it isn't close — someone there thinks about typography. Independent benchmarking cited it holding 60 FPS to 1M rows where MUI fell to 33 and AG Grid to 27, but that comparison originates from 1771's own blog, so treat it as a vendor claim. The reason it is `experimental` and not `strong` is entirely non-technical: created 2025-01, ~7 contributors, 1,023 stars, 11.8k weekly npm, and **no GitHub releases cut at all**. That is a single-vendor dependency at the centre of your product.
- **Use when:** a side surface, an internal tool, or a project where you can absorb the risk and want the look · **Don't use when:** it's load-bearing infrastructure with a multi-year horizon.
- **Scores /5:** visual 5 · interaction 4 · a11y 3 (unverified) · engineering 4 · maintenance 3 · docs 4 · customization 5 · perf 5 (vendor-claimed) · stability 2 · originality 5
- **Evidence:** ★1,023 · created 2025-01-04 · last push 2026-08-15 · **0 GitHub releases** (git tags exist — latest `v2.1.2` — but nothing is cut as a release, so there is no changelog surface) · npm `@1771technologies/lytenyte-core@2.2.1` 2026-07-09 · 11,769 wk npm · ~7 contributors
- **Licence & pricing — now verified** (both were open questions in the previous revision): the repo `LICENSE` states a dual structure — **Core packages are Apache-2.0**, free for personal *and* commercial use; **PRO packages are proprietary** under 1771 Technologies' EULA. Pricing page: **Developer PRO $399/seat/yr** (list $799, currently half-off) for teams of 1–50, 1 year of updates/support, 24-hour response; **Organization PRO** is POA above 50 devs. That is materially cheaper than AG Grid Enterprise and roughly LyteNyte's only structural advantage over it besides the typography.
- **Looked at:** https://www.1771technologies.com/ — a dark equities grid at ~43px rows. The move that separates it from every other grid: **units are typeset as a second, dimmer register** — `559.14` in white with `USD` in muted grey beside it, `9.16 M`, `1.13 T USD` — so magnitude reads first and the unit recedes instead of competing. Change % is bare red/green text with no fill. Analyst Rating pairs a semantic glyph (green caret for Buy, grey em-dash for Neutral) with the word. The Symbol cell stacks a brand logo, a ticker in a small grey chip, and the full company name at three clear levels of hierarchy. Above the header, row-group chips (Exchange, Change) carry 6-dot grab handles. Minor fault: each column boundary carries both a 3-dot menu and a resize pip — two affordances per edge.
- **Vibecode risk:** low **for the grid**, high for everything around it — and the previous revision was too soft here. I re-shot the site myself. The grid's typography holds up exactly as described. The *page* it sits on is the 2026 AI-startup template in its purest form: near-black background, dotted-grid backdrop, mint-on-black accent, and a headline that ends `…Into Your App **In Seconds**` with the last two words in the accent colour. Copy the cell rendering; copy none of the chrome. Mint-on-near-black is now itself a generated-site tell.
- **Demo-data smell (mine, not reported elsewhere):** in the hero grid, META, TSLA, BRK.A and BRK.B are shown with market caps of `1.13 T` / `1.03 T` / `1.03 T` / `1.03 T` — three different companies at an identical figure — and BRK.A (`714,280.00`) and BRK.B (`476.57`) both post `+6%`. The library that wins this category on typographic care is shipping placeholder data that a finance reader spots in two seconds. Cosmetic, but it undercuts the "designed by someone who thinks about numbers" claim it trades on.
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
- ~~**SVAR React DataGrid (`wx-react-grid`)**~~ — **retracted 2026-09; this was a research error.** `wx-react-grid` is the *old, abandoned* package name; the shipping package is **`@svar-ui/react-grid`** at 2.7.4 (2026-09-02) with **106,500 downloads/week**. Promoted to `situational` with a scorecard above. The meta-point stands — svar.dev does publish listicles that rank SVAR first — but the product is real and the dismissal was based on a dead package.
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
- **Perspective quietly left FINOS, and `@finos/perspective` is deprecated on npm** — frozen at 3.8.0 since 2025-09-03, with an explicit "upgrade to `@perspective-dev/client`" notice, while the GitHub repo ships 5.4.0 from `perspective-dev/perspective`. Every roundup still says "Perspective (FINOS)". So did the previous revision of this file.
- **The most-downloaded React table nobody maintains is `material-react-table`** — 302,649/wk against a last release of 2025-03-01. Download volume measures yesterday's decisions, not today's health, and this is the cleanest example in the file: 302k/wk of a library that has shipped nothing in eighteen months and whose flagship demo has broken images.
- **Checking a stale package name nearly buried a real library.** SVAR was written off here as "SEO-farm tier, 202 downloads/week" — that was `wx-react-grid`, abandoned in Feb 2025. The live `@svar-ui/react-grid` does 106,500/wk. Vendor-authored listicles are a real problem in this category; treating "vendor writes listicles" as proof the product is fake is a different error, and this file made it.
- **Three of the highest-reach tables in the world were missing entirely** — antd Table (3.2M/wk), Vaadin Grid (253k/wk) and PrimeReact DataTable (227k/wk). All three were absent because the discourse this file sampled is React-and-English-speaking. Ant Design alone probably renders more table cells per day than everything else in this document combined.

## Open questions
- ~~**LyteNyte's licence and Pro pricing.**~~ **Resolved 2026-09.** Repo `LICENSE` states Core = Apache-2.0 (free commercial use), PRO = proprietary 1771 EULA. Pricing page: Developer PRO $399/seat/yr (list $799, 1–50 devs, 1yr updates, 24h response), Organization PRO POA. Remaining sub-question: the PRO EULA text itself is not published at a stable URL — read it at purchase.
- ~~**Perspective's npm download volume.**~~ **Resolved 2026-09** — and the question was aimed at the wrong package. `@perspective-dev/client` 11,921/wk, `/viewer` 8,952/wk, `/react` 1,273/wk. The `@finos/perspective` scope is deprecated.
- **LyteNyte's and Handsontable's performance claims** (60 FPS at 1M rows; "no lag on massive datasets" demoed at 100 rows) both originate from the vendors. Settled by an independent harness rendering the same 100k/1M-row dataset across AG Grid, MUI X, LyteNyte and TanStack+Virtual with a scripted scroll and a frame-timing trace.
- **Real a11y conformance, as opposed to a11y marketing.** Every vendor claims WAI-ARIA support; AG Grid is the only one publishing per-framework ARIA documentation. Settled by NVDA/VoiceOver runs against each grid's own demo testing: announcing row/column position, entering and exiting edit mode, and whether virtualized rows break traversal.
- **Whether Vaadin Grid's 253k/wk is real front-end adoption or Java-toolchain transitive installs.** `@vaadin/grid` is pulled in by Vaadin's own bundles, so the number may overstate deliberate choice. Settled by checking dependent counts and the `vaadin/flow` release cadence.
- **Ant Design Table's virtualization story.** antd `Table` has no first-party virtual scrolling; the documented path is a `components.body` override wired to a virtualizer. Settled by benchmarking 100k rows through antd Table + TanStack Virtual against AG Grid.
- **Linear's and Attio's current table specifics** (row height, hover affordance, density toggles) are behind login and were not verifiable from their marketing sites, which now lead with AI chat surfaces. Settled by a logged-in capture.

## Challenge pass (2026-09)

An adversarial re-verification of the 2026-09 draft. Every `essential`/`strong` claim was re-checked against `gh api`, the npm registry and the downloads API on 2026-09-09, and five interfaces were re-shot independently.

**What survived.** All GitHub and npm figures in the original draft reproduced *exactly* — stars, push dates, contributor counts and weekly downloads for TanStack Table (13,943,411), TanStack Virtual (20,905,134), AG Grid (2,889,569 + 2,064,513), react-virtuoso (2,978,422), RevoGrid (28,393), react-window (4,492,807), react-data-grid (497,657), MUI X (2,736,987), Handsontable (291,630), Glide (292,450), LyteNyte (11,769), Tabulator (158,442) and DataTables (462,028). TanStack Table `9.0.0` did publish 2026-08-04. Glide's `latest` really is `6.0.3` from 2024-02-03. The react-data-grid seven-month beta gap is real (beta.59 2025-12-04 → beta.60 2026-07-09). AG Grid $999, RevoGrid $199/$499 and MUI X $299/$599/$1,399 all confirmed on the vendors' pricing pages. **The MUI X 100-row claim — the file's most consequential — is verbatim in MUI's own docs:** *"Row virtualization is limited to 100 rows in the Data Grid component."* The evidence discipline in this file was good; the errors were all errors of *scope*, not of arithmetic.

**Corrections made.**
1. **Perspective was materially wrong.** The project left the FINOS org (repo is `perspective-dev/perspective`) and **`@finos/perspective` carries an npm deprecation notice**, frozen at 3.8.0 since 2025-09-03. Entry retitled, install warning added, and the "unverified downloads" open question closed with real numbers (~12k/wk — small, and now stated honestly).
2. **SVAR was wrongly in `avoid`.** The draft checked `wx-react-grid` (dead, 202/wk) instead of `@svar-ui/react-grid` (live, **106,500/wk**, MIT, shipped 2026-09-02). Promoted to `situational` with a scorecard, and the retraction left visible in Rejected. The vendor-listicle critique was kept but decoupled from the product judgement.
3. **LyteNyte's two open questions resolved.** `LICENSE` gives Core = Apache-2.0, PRO = proprietary EULA; pricing is $399/seat/yr (list $799). "NOASSERTION / unverified" removed.
4. **react-data-grid's repo is `Comcast/react-data-grid`**, not Adazzle's — relevant to a verdict built on governance risk.

**Where my eyes disagreed with the file.** The draft rated LyteNyte's vibecode risk `low` with no qualification. Re-shooting it myself: the *grid* deserves the praise — the dim-unit register, the em-dash Neutral glyph, the three-level Symbol cell are all exactly as described — but the *site* is the stock 2026 AI-startup template (near-black, dotted grid, mint accent, "…In Seconds" in the accent colour), and the hero grid ships duplicated market-cap data (three companies at `1.03 T`, BRK.A and BRK.B both `+6%`). Split the verdict: low risk for the cell rendering, high for the chrome. This is the one place the file was reading a reputation rather than a screen.

**Additions.** Seven, chosen because they change a recommendation rather than lengthen a list: **Material React Table** (302,649/wk, no release since 2025-03-01 — the highest-vibecode-risk entry in the file, and its omission was the biggest gap given this corpus's purpose), **Ant Design Table** (3.2M/wk), **Vaadin Grid** (253,644/wk, and the real answer to "non-React"), **PrimeReact DataTable** (226,763/wk), **Univer** (327,241/wk, Apache-2.0 — the free counterweight to Handsontable's $999), plus `mantine-react-table` and `vxe-table` as noted cases. Also verified but not promoted to scorecards: DevExtreme (273,088/wk), Kendo React Grid (92,317/wk), `@table-library/react-table-library` (76,362/wk), jspreadsheet-ce (67,019/wk), SlickGrid (10,999/wk) + slickgrid-universal (15,258/wk), `@rowsncolumns/spreadsheet` (8,881/wk), `@silevis/reactgrid` (stale, 2025-04-16), mantine-datatable.

**Vibecode column, hardened.** The draft's honesty problem was omission, not softness: the three libraries an LLM actually reaches for unprompted — Material React Table, antd Table, PrimeReact DataTable — were all missing, so the file rated the vibecode risk of things agents rarely generate while saying nothing about the things they generate constantly. All three are now in at `high`/`very high` with the specific tells named. The most transferable finding, from Material React Table's own flagship demo: **currency rendered as a saturated filled pill, left-aligned inside the chip, so the money column has no right rail.** Money is not categorical data. That single habit — taught by the most-downloaded table example in React — does more to make a product look generated than any colour choice.

**Bias check.** The draft's praise for AG Grid, TanStack and Glide is earned and survives. Its dismissals were where the laziness lived: one library written off on a dead package name, three of the world's highest-reach tables never considered because the sample was React-and-English-speaking, and one project's org change missed entirely. The pattern is that this file researched *the discourse* thoroughly and *the registry* selectively.
