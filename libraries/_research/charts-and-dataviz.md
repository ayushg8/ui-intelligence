# Charts & data visualization

**Evaluated:** 2026-09 · **Researcher note:** The category split in two. One half is *chart engines* (ECharts, Chart.js, Plotly, uPlot, D3) that are technically strong and visually stuck in 2015; the other half is *design-system chart layers* (shadcn charts, Tremor, Bklit UI, LayerChart) that own the taste and delegate the math. The interesting news of 2026 is TanStack Charts arriving in July as a typed grammar-of-graphics that explicitly targets AI authorship, and Tremor — the thing everyone still recommends — quietly not shipping an npm release since January 2025. Almost nothing in this category gives you a good chart out of the box; you are choosing which fight you'd rather have.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| shadcn/ui charts (on Recharts) | `essential` | The fastest path to a chart that looks like a 2026 product, but its defaults trade information for looks. | high |
| Observable Plot | `essential` | The only library whose untouched defaults a serious information designer would ship — but the npm package hasn't moved in 19 months. | low |
| Recharts (raw) | `strong` | v3 is a genuinely better engine than its reputation; the stock look is still 2016. | medium |
| Apache ECharts | `strong` | Unmatched chart-type coverage and big-data performance; the default palette is a rainbow and canvas locks you out of your own typography. | high |
| visx | `strong` | Not a chart library — the best React primitive kit, and what most good bespoke charts are secretly built on. | low |
| uPlot | `strong` | 100k points at 60fps in ~50KB. Spartan, honest, and you style it entirely yourself. | low |
| LayerChart | `strong` | Best-designed Svelte option; honest linear defaults, SVG *and* Canvas from one component. | low |
| TanStack Charts | `experimental` | The most thoughtful new design in the category — question-first docs, one grammar across nine frameworks. v0.17, alpha, 7 contributors. | low |
| Bklit UI | `experimental` | Swiss-monochrome design-engineered chart set on visx. Genuinely tasteful, genuinely young. | medium |
| Highcharts | `situational` | Best accessibility in the industry, and a commercial license for any for-profit app. | medium |
| Nivo | `situational` | Enormous surface area, opinionated pastel house-style you will spend a day undoing. | high |
| unovis | `situational` | Framework-agnostic and CSS-variable themed, but the defaults look like matplotlib. | low |
| Perspective (FINOS) | `situational` | A WASM analytical engine with charts attached; wrong tool for a marketing dashboard. | low |
| Plotly.js | `situational` | Scientific/3D coverage nothing else matches; 3MB+ and a modebar you'll want to hide. | high |
| AntV G2 | `situational` | Real grammar-of-graphics depth, Ant Design house-style, half-translated docs. | high |
| Lightweight Charts | `situational` | The right answer for candlesticks and nothing else. | low |
| Tremor | `reference-only` | Beautiful defaults; `@tremor/react` last published 2025-01-13. Read it, don't install it. | high |
| Mafs | `reference-only` | Interactive math, not data viz. Last push March 2025. | low |
| Victory | `reference-only` | Now at Nearform; one patch release in 20 months. | medium |
| Chart.js | `avoid` (for product UI) | Fine for a blog embed; canvas-only, no DOM styling, and its defaults are the reason people think charts are ugly. | high |
| Chartist | `avoid` | 13k stars of nostalgia; nothing it does isn't done better now. | medium |

## Recommendations by need
- **Default choice:** shadcn/ui charts — you inherit your app's tokens, fonts and dark mode for free, and Recharts v3 underneath is a much better engine than its reputation. Budget an hour to undo its two bad defaults (see scorecard).
- **Best engineering:** Apache ECharts. 67k stars, 30+ contributors, Apache-2.0, shipping 6.x, and it will render a million points without complaint. Nothing else in the free tier is close on breadth.
- **Best visual quality out of the box:** Observable Plot. It is the only library that ships zero gridlines, zero plot frame and automatic axis labels by default.
- **Best accessibility:** Highcharts. Screen-reader descriptions, keyboard navigation, sonification, tactile export, WCAG 2.2 as stated guideline — it is not close. Recharts v3 is the best free answer (`accessibilityLayer` now defaults to on).
- **Most customizable / least house-style:** visx. It has no default look because it has no defaults; you get scales, shapes and axes and compose the rest.
- **Lightest:** uPlot (~50KB, no framework). TanStack Charts claims a 16.48 KiB gzip React line chart, unverified independently.
- **Promising newcomer:** TanStack Charts.
- **Premium/paid worth it:** Highcharts, but only if accessibility is a contractual requirement. Otherwise AG Charts' MIT community tier covers most of what teams actually buy Highcharts for.

## Scorecards

### shadcn/ui charts — `essential`
- **What:** Copy-paste chart components (`ChartContainer`, `ChartTooltip`, `ChartLegend`) that wrap Recharts and bind every color to CSS custom properties (`--chart-1`…`--chart-5`).
- **Verdict:** This is the correct architecture for product charts: the chart inherits your design tokens instead of importing a house style, so dark mode, font stack and radius are already right. But it is not a neutral wrapper — it ships two opinionated defaults that hurt information quality, and because 123k-star shadcn is the most-copied UI code on earth, those defaults are now the single most recognizable chart look on the web. Use it, then fix it.
- **Use when:** You're already in shadcn/Tailwind and need dashboard charts that match the app. · **Don't use when:** You need >5 series, real-time streaming, or >2k points.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 4 · customization 5 · perf 3 · stability 4 · originality 2
- **Evidence:** ★123,459 (shadcn-ui/ui) · last push 2026-09-10 · MIT · charts render via Recharts (★27,550, 48.5M wk npm)
- **Looked at:** https://ui.shadcn.com/charts — the flagship "Area Chart - Interactive": **no y-axis at all**, dotted horizontal gridlines only, `monotone` spline smoothing on daily data, and a blue-to-transparent gradient fill. It reads beautifully and tells you nothing about magnitude. At 390px the same chart is a hairball — ~90 daily points crammed into ~300px with two near-identical translucent blues and the legend clipped off the bottom edge. There is no downsampling or aggregation fallback. The card chrome around it (title + description + range select, hairline border, no shadow) is the part worth copying verbatim.
- **Vibecode risk:** high — the gradient-fill + smoothed-curve + no-y-axis + `--chart-1` violet-blue combination is instantly identifiable. Change the curve to `linear`, put the y-axis back with 3–4 ticks, and swap `--chart-*` for your own palette, and it stops looking generated.
- **Link:** https://ui.shadcn.com/charts

### Observable Plot — `essential`
- **What:** A concise grammar-of-graphics layer over D3 from Observable (Mike Bostock's team). `Plot.line(data, {x, y}).plot()` returns an SVG element.
- **Verdict:** Its defaults are the best-designed in the category and it isn't close — this is the only library where "don't touch anything" produces a chart Tufte would sign off on. It also actively nags you toward legibility: the docs literally warn that the array shorthand "loses the automatic x- and y-axis labels, reducing legibility." The problem is maintenance optics: `@observablehq/plot` last published **0.6.17 on 2025-02-14**, nineteen months ago, even though the repo still sees commits. It is stable rather than abandoned, but you are betting on a company that has visibly pivoted its attention elsewhere.
- **Use when:** Exploratory analysis, editorial/data-journalism charts, internal tools, anything where information quality beats brand fit. · **Don't use when:** You need a React component model, animated transitions, or a stable release cadence.
- **Scores /5:** visual 5 · interaction 3 · a11y 3 · engineering 5 · maintenance 2 · docs 5 · customization 4 · perf 4 · stability 4 · originality 5
- **Evidence:** ★5,373 · last release v0.6.17 2025-02-14 · last push 2026-09-01 · 550,718 wk npm · 28 contributors · ISC
- **Looked at:** https://observablehq.com/plot/marks/line — the AAPL close-price line: no gridlines, no plot frame, no y-axis rule. Ticks are 4px dashes sitting outside the axis with the numerals left-aligned beside them; x is bare years. A 1px black stroke on white. Maximum data-ink ratio with nothing decorative anywhere. Type is ~11px system sans, small but crisp.
- **Vibecode risk:** low — a monochrome unframed line chart doesn't read as "made by a library," it reads as "made by someone who knows what they're doing."
- **Link:** https://observablehq.com/plot/

### Recharts (raw) — `strong`
- **What:** Composable React SVG chart components. The de facto React default and the engine under shadcn charts.
- **Verdict:** The v3 line deserves a reputation reset. The rewrite added ~4,000 unit/integration tests and 220 visual regression tests, moved to a real state store, added tooltip/legend portals, and — most importantly — flipped `accessibilityLayer` to **on by default**, so charts are keyboard-navigable with arrow keys without any work. That makes it the best free accessibility story in React charting. What did not improve is the aesthetic: the stock chart is still a poor advertisement for the library.
- **Use when:** React, standard business charts, <2k points, and you intend to style it yourself. · **Don't use when:** Streaming data, >5k points, or you need Canvas — it has no first-party Canvas renderer.
- **Scores /5:** visual 2 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 3 · customization 4 · perf 3 · stability 4 · originality 2
- **Evidence:** ★27,550 · 3.10.x stable, 3.11.0-canary.3 2026-09-09 · last push 2026-09-09 · 48,533,567 wk npm · 30+ contributors · MIT
- **Looked at:** https://recharts.org/en-US/examples — the hero chart on their own homepage has **dashed gridlines on both axes**, `monotone` smoothing applied to a *categorical* A–F x-axis (inventing curvature between discrete categories, which is straightforwardly wrong), a filled dot on every data point, a hard black axis rule, and a periwinkle-and-mint pair that is not a designed palette. Two of the four are chart-junk defaults and one is a data-integrity default.
- **Vibecode risk:** medium raw, high if you accept the demo styling. Kill `CartesianGrid` vertical lines, set `type="linear"`, drop the dots above ~30 points.
- **Link:** https://recharts.org

### Apache ECharts — `strong`
- **What:** Canvas/SVG charting engine from Baidu, now an Apache top-level project. ~40 chart types including Sankey, treemap, sunburst, graph, geo, candlestick, gauge.
- **Verdict:** Technically excellent, hugely popular, and visually generic without substantial customization — the sentence this corpus exists to contain. If your requirement is "we need forty chart types and a million points," nothing free competes. But because it draws to canvas, your app's font stack, `font-feature-settings: tabular-nums`, and text-rendering do not apply; you inherit ECharts' typography, and chart titles live *inside* the canvas rather than in your DOM heading system. That is a real, permanent ceiling on how well it can integrate with a design system.
- **Use when:** Chart-type breadth, geo/maps, 100k+ points, or you're already in a Vue/Chinese-ecosystem stack. · **Don't use when:** Typographic fidelity to your design system matters, or you want DOM-level styling and testing.
- **Scores /5:** visual 2 · interaction 5 · a11y 3 · engineering 5 · maintenance 5 · docs 4 · customization 4 · perf 5 · stability 5 · originality 3
- **Evidence:** ★67,287 · 6.1.0 2026-05-19 · last push 2026-09-10 · 4,606,173 wk npm (echarts-for-react ★5,005, 1,002,273 wk, last push 2026-01-21) · 30+ contributors · Apache-2.0
- **Looked at:** https://echarts.apache.org/examples/en/index.html — default palette is `#5470c6` periwinkle, `#91cc75` green, `#fac858` yellow, `#ee6666` red: a saturated qualitative rainbow with no luminance ordering, so a stacked area of five series has no reading order. Every line carries hollow circle markers by default. The "Gradient Stacked Area Chart" example is magenta/orange/cyan and genuinely garish. Legends render as a tiny 10px icon-and-text strip. Axis tick labels are ~9px.
- **Vibecode risk:** high — the `#5470c6`-and-friends palette plus in-canvas titles makes ECharts apps recognizable across the room. Always supply a custom theme.
- **Link:** https://echarts.apache.org

### visx (Airbnb) — `strong`
- **What:** ~30 unstyled React packages wrapping D3 primitives: `@visx/scale`, `@visx/shape`, `@visx/axis`, `@visx/curve`, `@visx/tooltip`.
- **Verdict:** The star count understates it badly — the meta-package `@visx/visx` does 76k/wk, but `@visx/scale` alone does **4.6M/wk** and `@visx/shape` 3.6M/wk, because everyone installs the pieces. It is the substrate under a lot of good bespoke charting (including Bklit UI's chart layer). v4.0.0 landed 2026-06-11, ending a long quiet stretch. It has no house style because it has no defaults; the cost is that a line chart with a tooltip is 150 lines of your code.
- **Use when:** You have a designer, a spec, and a chart no library ships. · **Don't use when:** You need a chart this afternoon.
- **Scores /5:** visual n/a (unstyled) · interaction 3 · a11y 2 · engineering 5 · maintenance 4 · docs 3 · customization 5 · perf 4 · stability 4 · originality 4
- **Evidence:** ★21,041 · v4.0.0 2026-06-11 · last push 2026-06-22 · @visx/scale 4,635,092 wk · @visx/shape 3,603,455 wk · 30+ contributors · MIT
- **Looked at:** https://airbnb.io/visx/gallery — the gallery is deliberately expressive rather than product-like: hot-pink gradient tiles, neon-green dot grids on black, a red logo lockup with construction guides. That's honest advertising. It says "these are primitives for making your own thing," not "here is a dashboard."
- **Vibecode risk:** low — impossible to identify a visx chart by sight, which is the point.
- **Link:** https://airbnb.io/visx

### uPlot — `strong`
- **What:** A ~50KB canvas time-series plotter built for throughput.
- **Verdict:** The narrowest scope in this file and the best execution of it. It renders hundreds of thousands of points instantly, uses linear interpolation only (so it never lies about your data), and leaves styling to you via CSS. The tradeoff is stated plainly by its own maintainer's positioning: it lacks the embellishments of full-featured libraries — no animation, manual resize handling, no built-in legend beyond a value readout. Last release 1.6.32 in March 2025, but the repo was pushed today; this is a finished tool, not a stalled one.
- **Use when:** Observability dashboards, sensor/telemetry streams, anything where the point count is the problem. · **Don't use when:** You need pies, treemaps, animation, or five minutes of setup.
- **Scores /5:** visual 3 · interaction 4 · a11y 1 · engineering 5 · maintenance 4 · docs 3 · customization 4 · perf 5 · stability 5 · originality 4
- **Evidence:** ★10,479 · 1.6.32 2025-03-14 · last push 2026-09-09 · 494,316 wk npm · 30+ contributors · MIT
- **Looked at:** https://leeoniya.github.io/uPlot/demos/line-paths.html (dark) — near-invisible gridlines on near-black, numeric axis labels in default sans at ~11px, a bare `X: -- Y: --` value readout instead of a floating tooltip. No axis titles, no frame. Spartan, but nothing is *wrong* — and the null-path demo showing genuine gaps rather than interpolating across them is exactly the honesty most libraries skip.
- **Vibecode risk:** low — nothing to recognize.
- **Link:** https://github.com/leeoniya/uPlot

### LayerChart — `strong`
- **What:** Svelte charting built on LayerCake + d3, from Sean Lynch (techniq). The chart layer behind shadcn-svelte.
- **Verdict:** The most quietly well-designed thing in this file relative to its size. Defaults are honest — straight-line interpolation, horizontal gridlines only, ticks outside the plot area, no frame — and it renders the *same component* to SVG or Canvas via a toggle, which almost nothing else does. 2.5.0 shipped today; 23 contributors; small but plainly alive. The only real knock is that it's Svelte-only, and 1.3k stars means you will occasionally be the first person to hit a bug.
- **Use when:** SvelteKit, especially with shadcn-svelte. · **Don't use when:** React or Vue — there's no port.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 4 · docs 4 · customization 5 · perf 4 · stability 3 · originality 4
- **Evidence:** ★1,313 · layerchart@2.5.0 2026-09-09 · last push 2026-09-09 · 218,717 wk npm · 23 contributors · MIT
- **Looked at:** https://www.layerchart.com/docs/components/AreaChart — default AreaChart: linear (unsmoothed) path, horizontal gridlines at ~8% gray, y ticks 0–100 outside a rule-less axis, x dates every other day. The one flaw is a **full-opacity lavender fill** — a designer would drop that to ~15% alpha and keep the stroke. Docs page itself is well-built: Svg/Canvas toggle, Copy Page, and a Data/View/Edit/Export row under every example.
- **Vibecode risk:** low — the violet fill is the only tell and it's a one-prop fix.
- **Link:** https://www.layerchart.com

### TanStack Charts — `experimental`
- **What:** A framework-neutral typed visualization grammar over granular D3 primitives, with React/Octane adapters and an experimental React Native target. Tanner Linsley's replacement for the archived `react-charts`.
- **Verdict:** The most interesting thing to happen to this category in years, and also six weeks old. The design brief is explicit about two audiences — humans and AI agents composing charts — which matters a lot for a corpus like this one: a typed grammar with no hidden series model is far easier for an agent to get right than Recharts' prop soup. It is genuinely alpha: v0.17.0, 7 contributors, APIs changing between minors, and its own docs say so. `@tanstack/charts` is already at 149k weekly downloads six weeks in, which tells you about Linsley's distribution, not about stability.
- **Use when:** A side surface, a prototype, or you want to learn the grammar now. · **Don't use when:** It's load-bearing before 1.0.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 (claimed) · engineering 4 · maintenance 4 · docs 5 · customization 5 · perf 4 · stability 1 · originality 5
- **Evidence:** ★723 · created 2026-07-28 · v0.17.0 2026-09-09 · last push 2026-09-10 · 149,204 wk npm · 7 contributors · MIT · predecessor TanStack/react-charts is archived (★3,136, last release a 2023 beta)
- **Looked at:** https://tanstack.com/charts/latest/docs/examples and /examples/lines-and-areas — the docs are the strongest signal. The gallery is "organized by analytical question, not by package export" ("How does a total divide into contributions?" → Stacked and Composed). Section headings inside the line-chart page read *"Show a derived trend honestly"*, *"Compare two boundaries at their exact crossings"*, *"Production checks"*, and one page-level heading is literally *"Use an example without inheriting accidental choices."* That is a stated anti-vibecode posture, in the docs, as an organizing principle. The live previews compile in-browser and were still spinning after 6s — the docs are heavy.
- **Vibecode risk:** low — the whole information architecture is built to stop you inheriting defaults thoughtlessly.
- **Link:** https://tanstack.com/charts

### Bklit UI — `experimental`
- **What:** "Design engineered data visualization components" — an MIT copy-paste chart set built on top of shadcn/ui, with a visx-based chart layer.
- **Verdict:** The find of this research pass. Someone with real taste made deliberate, unusual choices: the charts are **monochrome by default**, which forces you to make a conscious decision about color rather than accepting a palette. It exposes the interpolation curve as a first-class visible control (`@visx/curve`, `monotoneX` default) instead of burying it. Caveats are real: 1.6k stars, 13 contributors, created January 2026, last push 2026-07-28 (six weeks quiet), and it is not on npm as a versioned runtime — it's copy-paste, so you own the code and the bugs. Its landing page says "TRUSTED BY PEOPLE AT_" over Stripe/Vercel/Supabase logos, which is a weasel construction: individuals, not companies. Do not read that as adoption.
- **Use when:** You're in shadcn already and want charts with more restraint than shadcn's own. · **Don't use when:** You need a maintained dependency rather than vendored code.
- **Scores /5:** visual 5 · interaction 4 · a11y 3 · engineering 3 · maintenance 3 · docs 3 · customization 5 · perf 3 · stability 2 · originality 5
- **Evidence:** ★1,624 · created 2026-01-19 · last push 2026-07-28 · 13 contributors · MIT · no npm runtime package found (`bklit-ui`, `@bklit/ui` both 404) · listed under Vercel's 2026 Open Source Software Program
- **Looked at:** https://bklit.com and https://bklit.com/charts — the site is Swiss/technical-drawing: hairline blueprint grid with node dots at intersections, diagonal-hatch fill blocks, monospace subhead, an enormous tight-tracked grotesk wordmark, coordinate rulers down the left edge. The Area Chart demo is two grey areas with gradients to transparent, a dark 1.5px stroke on the primary, dashed hairline horizontal gridlines, **no y-axis**, five generous x labels (Jan 1 → Jan 30), and drag-to-select range brushing. Card is a hairline box with zero radius and zero shadow. No gradient CTA, no violet, no 16px radius anywhere on the site.
- **Vibecode risk:** medium — the blueprint-grid aesthetic is strong enough to be recognizable if you copy the whole site, but the chart components themselves are restrained enough to disappear into any design system.
- **Link:** https://bklit.com/charts

### Highcharts — `situational`
- **What:** The long-standing commercial JS charting suite.
- **Verdict:** Buy it for one reason: accessibility. The a11y module ships screen-reader chart descriptions, full keyboard navigation, sonification (data as audio), pattern fills for low vision, tactile-printer export and voice-input compatibility, with WCAG 2.2 as the stated guideline. Nothing free is within sight of that. Note it is a separate script you must load — it is included with every license but is not on by default. The license is the blocker: free for personal/non-commercial only, and commercial pricing typically lands in the $1.5k–$5k/yr band per reported figures (vendor-aggregator sourced, not a Highcharts price list — treat as indicative).
- **Use when:** Accessibility is contractual (government, healthcare, EU public sector). · **Don't use when:** You're a startup that can spend that budget elsewhere — AG Charts' MIT community tier covers most of the actual usage.
- **Scores /5:** visual 3 · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 4 · stability 5 · originality 2
- **Evidence:** ★12,490 · last push 2026-09-09 · 1,610,332 wk npm · 30+ contributors · proprietary (GitHub reports "Other")
- **Looked at:** Did not screenshot — pricing/demo content is marketing rather than default output, and the visual defaults are well-known 2010s-enterprise (title + subtitle inside the chart, drop-shadowed tooltip, credits watermark).
- **Vibecode risk:** medium — the "Highcharts.com" credits watermark and the stock tooltip are dead giveaways unless configured away.
- **Link:** https://www.highcharts.com

### Nivo — `situational`
- **What:** A large React chart collection over D3 with SVG, Canvas and HTTP/SSR rendering.
- **Verdict:** Breadth is real — bar, line, sankey, sunburst, chord, calendar, geo, swarm, bump. But it has the strongest house style in the free tier, and its defaults are actively information-hostile at density. It also has the weakest release cadence of the major React options: **v0.99.0 in May 2025**, sixteen months, and still not 1.0 after nine years. Choose it when you need a chart type nobody else ships and you're prepared to override the theme wholesale.
- **Use when:** Sankey/chord/calendar/bump charts in React, fast. · **Don't use when:** Brand fidelity matters, or you want a stable 1.0.
- **Scores /5:** visual 2 · interaction 4 · a11y 2 · engineering 4 · maintenance 3 · docs 4 · customization 3 · perf 3 · stability 3 · originality 3
- **Evidence:** ★14,092 · v0.99.0 2025-05-23 · last push 2026-07-21 · @nivo/core 1,111,361 wk (@nivo/bar 851,364) · 30+ contributors · MIT
- **Looked at:** https://nivo.rocks/bar/ — the default stacked bar prints a **numeric value label inside every single segment** (six per bar × seven bars = 42 labels competing with the bars they annotate), full axis rules with tick marks on both axes, gridlines behind, and a right-side legend of square swatches. The default `nivo` scheme is a mint/teal/amber/lemon/salmon/tan run with no luminance ordering. The docs site itself is a red-to-orange gradient chrome that looks a decade old.
- **Vibecode risk:** high — the pastel scheme plus in-bar value labels is instantly identifiable as untouched Nivo.
- **Link:** https://nivo.rocks

### unovis — `situational`
- **What:** F5's framework-agnostic viz library (core TS + React/Angular/Svelte/Vue wrappers), themed through CSS variables.
- **Verdict:** The architecture is right — separating data logic from visual logic and theming via CSS custom properties means dark-mode switching costs nothing and no re-render. The reality of the defaults does not match the "clean professional SaaS UI" reputation the SEO listicles give it. It is maintained (1.6.7 in July 2026, pushed today) and Apache-2.0, but adoption is thin at ~9k weekly downloads for the React package, so you're early-adopting a corporate side project.
- **Use when:** You need one chart layer across Angular *and* React, or you specifically want CSS-variable theming. · **Don't use when:** You want defaults you can ship.
- **Scores /5:** visual 2 · interaction 3 · a11y 2 · engineering 4 · maintenance 4 · docs 3 · customization 4 · perf 4 · stability 3 · originality 3
- **Evidence:** ★2,846 · 1.6.7 2026-07-29 · last push 2026-09-09 · @unovis/react 9,365 wk npm · 26 contributors · Apache-2.0
- **Looked at:** https://unovis.dev/gallery — every example draws a **full box frame around the plot area** plus gridlines on both axes, and puts a rotated-90° axis title down the left ("Temperature (celsius)", "National Cereal Production, tons"). That is a scientific-plotting convention, not a product-UI one. Palette is blue/red/yellow, which reads as traffic-light. One genuinely good default: the data-gaps example uses direct end-of-line labels ("China", "USA") instead of a legend. The Basic Timeline chart's row labels are ~7px and unreadable.
- **Vibecode risk:** low — nobody will recognize it, because almost nobody uses it.
- **Link:** https://unovis.dev

### Perspective (FINOS) — `situational`
- **What:** A C++/WASM streaming analytical engine (Apache Arrow) with a pivot grid and chart viewer on top. Originated at J.P. Morgan.
- **Verdict:** Categorized as a chart library and mostly isn't one — it's a client-side OLAP engine that happens to draw. If your problem is "pivot and aggregate 10M rows in the browser and let the user re-slice interactively," this is close to the only answer. If your problem is "put a line chart on a dashboard," it's absurd overkill: a WASM payload and a workspace UI you did not ask for. Very actively maintained (v5.4.0 shipped today).
- **Use when:** Financial/trading blotters, live streaming pivot analysis, huge in-browser datasets. · **Don't use when:** Anything else.
- **Scores /5:** visual 3 · interaction 5 · a11y 2 · engineering 5 · maintenance 5 · docs 3 · customization 2 · perf 5 · stability 4 · originality 5
- **Evidence:** ★11,177 · v5.4.0 2026-09-09 · last push 2026-09-09 · 11,696 wk npm · 30+ contributors · Apache-2.0
- **Looked at:** Reviewed a prior capture of https://perspective.finos.org in this corpus's shot cache (`tables-perspective-*`) — dense grid chrome, workspace-style split panes, an engine UI rather than a design-system component.
- **Vibecode risk:** low.
- **Link:** https://perspective.finos.org

### Plotly.js — `situational`
- **What:** Scientific/statistical charting with 3D, contour, ternary, polar, and geo. Big in Python/Dash.
- **Verdict:** Nobody else free does 3D surfaces, contours and statistical plots this well, and v4.1.0 shipped yesterday so it is unambiguously alive. It is also enormous (the full bundle is multi-megabyte), and it plants a floating modebar toolbar and a "Produced with Plotly" affordance over your chart by default. It is a scientific tool wearing a product-tool costume.
- **Use when:** 3D, contour, statistical or scientific plots; or you're mirroring a Python/Dash app. · **Don't use when:** It's a business dashboard — the weight and the chrome aren't worth it.
- **Scores /5:** visual 2 · interaction 4 · a11y 2 · engineering 4 · maintenance 5 · docs 4 · customization 3 · perf 3 · stability 4 · originality 3
- **Evidence:** ★18,323 · v4.1.0 2026-09-08 · last push 2026-09-10 · 669,267 wk npm (react-plotly.js 670,638) · 30+ contributors · MIT
- **Looked at:** https://plotly.com/javascript/line-charts/ — the canonical Plotly frame: light-blue-grey plot background, white gridlines, orange/blue `D3 category` defaults, and the hover modebar in the top right of every figure.
- **Vibecode risk:** high — the grey plot background plus modebar is the most recognizable chart chrome on the internet after Chart.js.
- **Link:** https://plotly.com/javascript/

### AntV G2 / S2 — `situational`
- **What:** Ant Group's grammar-of-graphics engine (G2) and its pivot-table sibling (S2).
- **Verdict:** Real depth — G2 is a genuine grammar of graphics, not a chart-type menu, and the example catalogue is vast. Two things hold it back outside China: the visual defaults are cramped Ant Design house-style, and the docs are only partially translated, with example labels and axis titles left in Chinese in places. S2 is the more distinctive product (a serious pivot table for analytics) but at 7.3k weekly downloads it is a niche bet.
- **Use when:** You're in the Ant Design ecosystem, or need pivot-table analytics (S2). · **Don't use when:** Your team can't navigate partially-translated docs.
- **Scores /5:** visual 2 · interaction 4 · a11y 2 · engineering 5 · maintenance 4 · docs 2 · customization 5 · perf 4 · stability 4 · originality 4
- **Evidence:** G2 ★12,605 · v5.4.8 2026-01-06 · last push 2026-09-03 · 239,702 wk npm · 30+ contributors · MIT. S2 ★1,691 · last push 2026-06-23 · 7,357 wk npm · MIT
- **Looked at:** https://g2.antv.antgroup.com/en/examples — default is Ant blue `#1783FF` with thin square bars; multi-series goes blue/teal/orange/violet, which is not a harmonious set. Axis tick labels render at roughly 8px and are unreadable in the gallery thumbnails at full size. Y-axis titles are rotated 90° ("frequency", "year"). Several "English" examples still carry Chinese axis labels (月份, and a Chinese-labelled y-title on the stacked column). A site-wide banner promotes "Sive, a next-gen AI-driven visual creation platform."
- **Vibecode risk:** high — `#1783FF` bars with 8px rotated axis titles is Ant Design's signature.
- **Link:** https://g2.antv.antgroup.com

### Lightweight Charts (TradingView) — `situational`
- **What:** TradingView's open-source financial chart renderer — candlesticks, OHLC, volume, time-scale.
- **Verdict:** Best-in-class for exactly one job. Candlestick and time-scale behavior (crosshair, price scale, autoscaling, logarithmic price axis) is right because it's extracted from a product that lives or dies on it. It is not a general charting library and does not pretend to be — TanStack's own comparison notes it lacks animation transitions and requires host composition for legends. 930k weekly downloads with 17.2k stars is a real, working ecosystem.
- **Use when:** Price/candlestick charts, trading UIs, crypto dashboards. · **Don't use when:** Anything that isn't financial time-series.
- **Scores /5:** visual 4 · interaction 5 · a11y 1 · engineering 5 · maintenance 5 · docs 4 · customization 3 · perf 5 · stability 5 · originality 3
- **Evidence:** ★17,223 · last push 2026-09-09 · 930,167 wk npm · 30+ contributors · Apache-2.0
- **Looked at:** Not screenshotted this pass — its output is the TradingView chart, which is the reference implementation of the form.
- **Vibecode risk:** low in context (financial charts are expected to look like this); high if used outside finance.
- **Link:** https://github.com/tradingview/lightweight-charts

### Tremor — `reference-only`
- **What:** Tailwind + Radix dashboard components with charts. Founders joined Vercel's Design Engineering team on 2025-01-22; all products were made free/MIT.
- **Verdict:** This is the reputation-versus-reality entry. Every listicle still recommends Tremor as actively maintained; the registry says **`@tremor/react` last published 3.18.7 on 2025-01-13** — the day before the Vercel acquisition — and has not shipped since. The 16.5k-star `tremor-npm` repo last saw a push the same day. The successor copy-paste repo `tremorlabs/tremor` (3.6k stars) last pushed 2025-10-10 with no tagged releases. It is not abandoned in spirit — the people went to Vercel and the ideas visibly went into v0 and shadcn-adjacent work — but installing it in 2026 means adopting a dependency frozen for twenty months. Study the defaults, don't take the dependency.
- **Use when:** As a design reference for what good dashboard chart defaults look like. · **Don't use when:** In production, in 2026.
- **Scores /5:** visual 5 · interaction 4 · a11y 3 · engineering 4 · maintenance 1 · docs 4 · customization 4 · perf 3 · stability 2 · originality 4
- **Evidence:** tremorlabs/tremor ★3,607, last push 2025-10-10, **no releases**, Apache-2.0 · tremorlabs/tremor-npm ★16,496, last push 2025-01-13 · @tremor/react 3.18.7 published 2025-01-13 · 366,237 wk npm (residual)
- **Looked at:** https://tremor.so/docs/visualizations/area-chart — and it is the best-looking default in this entire file. Y-axis formatted as currency ($0 / $1,000 / $2,000 / $3,000 / $4,000), x as "Jan 23 … Dec 23", **linear** interpolation (no false smoothing), gradient area fills to transparent, a blue/emerald pair with genuine luminance separation, horizontal gridlines only, and a compact top-right legend with line swatches. The one flaw is two overlapping semi-transparent areas that muddy where they cross. This is the target every other library should be measured against.
- **Vibecode risk:** high — Tremor's look *became* the generic SaaS dashboard look, partly via v0.
- **Link:** https://tremor.so

### Mafs — `reference-only`
- **What:** React components for interactive mathematics — coordinate planes, plotted functions, draggable points, vectors.
- **Verdict:** Beautifully made and miscategorized. This is a tool for explorable explanations and math education, not data visualization; there is no notion of a dataset, a scale from data, or a tooltip over a series. Last push 2025-03-30 (17 months) and the site footer still reads © 2024. Keep it in the corpus so an agent knows *not* to reach for it when asked for a chart.
- **Use when:** Interactive math explainers, teaching tools, geometry demos. · **Don't use when:** You have data.
- **Scores /5:** visual 4 · interaction 5 · a11y 2 · engineering 4 · maintenance 2 · docs 4 · customization 3 · perf 4 · stability 3 · originality 5
- **Evidence:** ★3,430 · v0.21.0 · last push 2025-03-30 · 20,912 wk npm · MIT
- **Looked at:** https://mafs.dev — a Riemann-sum demo: blue function curve with green rectangles above the axis and magenta below, draggable magenta endpoint handles with soft halos, a serif ⟨Mafs⟩ wordmark. Elegant, clearly a teaching artifact.
- **Vibecode risk:** low.
- **Link:** https://mafs.dev

### Victory — `reference-only`
- **What:** Composable React/React Native chart components, originally Formidable Labs, now under Nearform.
- **Verdict:** Once the answer for React Native chart parity, now coasting. **v37.3.6 shipped 2025-01-14** and the repo last saw a push 2025-12-19 — one patch in twenty months from a 30-contributor project. Nearform says it's maintained; the commit history says maintenance-only. Notably, `victory-native` (406k/wk) and the separate, more active `victory-native-xl` are where the remaining energy is; on the web, Recharts or visx now dominate the same lane.
- **Use when:** You're already on Victory and it works. On React Native, evaluate `victory-native-xl` instead. · **Don't use when:** Starting fresh on the web.
- **Scores /5:** visual 3 · interaction 3 · a11y 3 · engineering 3 · maintenance 2 · docs 3 · customization 4 · perf 2 · stability 3 · originality 2
- **Evidence:** ★11,240 · v37.3.6 2025-01-14 · last push 2025-12-19 · victory 406,199 wk / victory-native 424,807 wk · 30+ contributors · license reported as "Other"
- **Looked at:** Not screenshotted — deprioritized in favor of live options once the release gap was confirmed.
- **Vibecode risk:** medium — Victory's grey-axis, muted-palette default is dated and recognizable.
- **Link:** https://commerce.nearform.com/open-source/victory

## Rejected / avoid
- **Chart.js (for product UI)** — 67.7k stars and 11.2M weekly downloads, and still the wrong default. Canvas-only means zero DOM styling, no CSS control over typography, nothing to inspect or test in the DOM, and no tabular figures. Its stock look — heavy 3px lines, `rgba` pastel fills, a big centered legend with square swatches, gridlines everywhere — is *the* reason "charts look bad by default" is a truism. Last release v4.5.1 2025-10-13. Fine for a marketing blog embed; do not build an analytics product on it.
- **Chartist** — ★13,387 and pushed today, so not dead, but `chartist@1.5.0` last published 2025-09-30 and 98k weekly downloads against that star count is a legacy-user tail. Its differentiator (SVG + CSS-styled charts, ~2015) is now table stakes. Nothing it does isn't done better by Observable Plot or LayerChart.
- **react-vis** — Uber's old React viz kit. Effectively unmaintained for years; do not start anything on it.
- **`@tanstack/react-charts`** — explicitly **archived** (★3,136, last release a 3.0.0-beta in Nov 2023, last push 2025-03-10). Its author replaced it with TanStack Charts. Agents will find it in old blog posts; it must not be recommended.
- **`@tremor/react` in production** — see scorecard. Frozen at 3.18.7 since 2025-01-13.
- **FusionCharts / AnyChart / LightningChart** — these dominate the "best charting library 2026" search results because they buy that real estate with comparison-blog SEO. Treat any listicle that ranks them highly as marketing, not evaluation.

## What surprised me
- **Tremor — the library everyone still recommends — hasn't shipped an npm release since 2025-01-13**, the day before Vercel acquired it. Every 2026 listicle I read asserts it's actively maintained. The registry and both repos disagree. Its defaults remain the best-designed in the category, which is exactly why the gap is dangerous.
- **Observable Plot's last npm publish is 2025-02-14 — nineteen months ago** — despite commits landing as recently as 2026-09-01. The best-designed defaults in the category are on the slowest release cadence.
- **visx is roughly 50× more used than its star count implies.** `@visx/visx` shows 76k weekly downloads; `@visx/scale` alone does 4.6M and `@visx/shape` 3.6M. Anyone judging visx's adoption by the meta-package is off by two orders of magnitude.
- **Recharts v3 quietly became the best free accessibility story in React charting.** `accessibilityLayer` now defaults to **on** (it was off in 2.x), giving keyboard arrow-key navigation with zero configuration — plus ~4,000 tests and 220 visual regression tests from the rewrite. Its reputation as "the easy but sloppy one" is out of date; only its visual defaults still deserve it.
- **PostHog's own product-analytics marketing screenshot is a textbook anti-pattern**: a stacked area chart with ~50 rainbow breakdown series, an explicit "Breakdown limited to 50 — more available / Set to 100" control, and 45°-rotated full date labels ("23-Jul-2025"). The company whose product this is ships it as the hero image. Excellent evidence that nobody is immune.
- **Vercel doesn't plot raw analytics data — it plots a fitted polynomial.** Their published approach selects polynomial order adaptively using `error = max(MSE(train), MSE(test))` on an odd/even index split, and derives the delta from the fitted curve rather than the first and last points. That's a materially different technique from the `monotone` spline smoothing that shadcn/Recharts hand you, and it's why Vercel's charts read as "trend" while smoothed Recharts charts read as "wobble."
- **Bklit UI exists**: 1.6k stars, created January 2026, MIT, in Vercel's OSS program — a monochrome-by-default, visx-based chart set with a Swiss technical-drawing site. It is the only chart library I found that treats *color* as a decision you must make rather than a default you inherit.

## Open questions
- **TanStack Charts' bundle claim.** The docs cite a 16.48 KiB gzip React compact-scale line and a 40.92–46.95 KiB range; I did not build a bundle to confirm. A `vite build` + `source-map-explorer` on a minimal line chart would settle it.
- **Bklit UI's chart substrate and distribution.** The Area Chart demo exposes `@visx/curve` options, which strongly implies visx, but the docs page I fetched only says "built on top of shadcn/ui" and I could not resolve an npm runtime package (`bklit-ui` and `@bklit/ui` both 404). Reading `bklit/bklit-ui`'s `package.json` and a chart source file would confirm both the dependency and whether it's CLI-vendored like shadcn.
- **Whether Observable Plot is stable-by-design or stalled.** Nineteen months without a release is ambiguous. The signal that would settle it: an open milestone or a maintainer statement in `observablehq/plot` discussions. I did not find one.
- **Highcharts real-world pricing.** The $1.5k–$5k/yr figures come from vendor-aggregator blogs, not Highcharts' own price list — **unverified**. A quote request would settle it.
- **Actual production usage.** I verified no "used by <company>" claim for any library here. Bklit's "TRUSTED BY PEOPLE AT_ Stripe/Vercel/Supabase/Framer" is individuals, not corporate adoption, and should not be repeated as such. Public GitHub dependency graphs or engineering-blog citations would be the evidence.
- **How each library handles empty / loading / no-data states.** This was in the brief and I could not evaluate it from demo pages — every gallery shows the happy path. Determining it requires rendering each library with `data={[]}` and a `null`-heavy series. My expectation, unverified: only Highcharts and ECharts ship a real `noData` affordance; the rest render an empty axis frame or throw.
