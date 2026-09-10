# Outside the bubble: obscure, non-React, and non-Anglosphere excellence

**Evaluated:** 2026-09 · **Researcher note:** The interesting work has moved off React and off English. Shoelace is archived and reborn as commercial Web Awesome; Melt UI — the Svelte headless darling — has not been pushed in ~11 months while Bits UI quietly shipped v2.19 and 900k weekly installs. Meanwhile Japanese, Korean and Chinese teams are shipping design systems with better a11y documentation and denser information design than anything in the Anglosphere React discourse, and a handful of one-file libraries solve problems (CJK line-breaking, parameter panes, markdown editing) that the React ecosystem has never even framed as problems.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| BudouX | `essential` | The only correct way to wrap Japanese/Chinese/Thai text on the web; 15KB, no runtime deps. | low |
| Nord Design System | `strong` | The most disciplined anti-vibecode component set I looked at: zero shadows, zero gradients, 4px radii, framework-agnostic. Source is closed. | low |
| Bits UI | `strong` | The real Svelte 5 headless answer now that Melt has stalled. Documents architecture, not looks. | low |
| Naive UI | `strong` | 18.5k stars, theme-as-a-TypeScript-object, honest "Caveat" callouts in docs. Docs are ugly; components are not. | low |
| Web Awesome | `strong` | Shoelace's commercial successor. 1.3M wk installs, MIT core, genuinely framework-free. Docs site looks dated. | low |
| Semi Design | `strong` | ByteDance's system. Density and CJK typography Western libraries can't do. Design-to-code pipeline is the real feature. | medium |
| Tweakpane | `strong` | The best-designed micro-UI on the web. No release in 22 months. | low |
| Toss Frontend Fundamentals + overlay-kit | `strong` | Korea's best frontend writing, in 4 languages, plus the cleanest declarative-overlay API anywhere. | n/a |
| Oat | `experimental` | 10KB, zero deps, styles semantic HTML with no classes. 5.5k stars in 8 months. Pre-1.0. | low |
| OverType | `experimental` | A markdown editor that is literally a transparent textarea over a preview div. 91KB total. | low |
| Konsta UI | `situational` | Real iOS/Material fidelity — correct inset separators, correct grouped lists — for React/Vue/Svelte. | high |
| Basecoat | `situational` | shadcn/ui rendered as plain HTML + Tailwind for Django/Rails/Laravel/HTMX. Also inherits shadcn's face. | high |
| SmartHR UI | `situational` | Japan's best-documented accessible design system. Docs are Japanese-only; styling is house brand. | high |
| interfaces.dev | `reference-only` | A design-engineering magazine whose masthead annotates its own construction. Paywalled. | n/a |
| Slint | `reference-only` | Declarative GUI DSL for embedded/desktop worth studying. Its own marketing site is full of tells. | n/a |
| Shoelace | `avoid` | Archived 2026. Migrate to Web Awesome. | — |
| Melt UI (v1) | `avoid` | No push since 2025-09-30. The successor has 330 stars and stalled too. | — |

## Recommendations by need
- **Default choice (framework-agnostic components):** Web Awesome — 1.3M weekly installs, MIT core, works in any stack, and it is where Shoelace's users actually went.
- **Best engineering:** Naive UI — 347 contributors, complete TypeScript theme objects instead of CSS-variable soup, and documentation that publishes its own footguns.
- **Best visual quality out of the box:** Nord Design System — the only set I looked at with literally no drop shadows anywhere.
- **Best accessibility:** SmartHR UI — v99.6.1, 114 contributors, and a11y guidance written in Japanese for Japanese screen-reader behaviour, which nobody else does.
- **Most customizable / least house-style:** Bits UI — headless, and its docs sidebar is Ref / Transitions / State Management rather than a component gallery.
- **Lightest:** Oat — 7KB CSS + 2.9KB JS gzipped, zero dependencies.
- **Promising newcomer:** Oat — 5,484 stars in eight months, v0.8.0 shipped 2026-09-08.
- **Premium/paid worth it:** none verified. Web Awesome gates a Figma kit and "Patterns" behind Pro; I could not verify the price or contents.

## Scorecards

### BudouX — `essential`
- **What:** A machine-learning phrase-segmenter that inserts zero-width spaces so CJK and Thai text breaks at meaning boundaries instead of arbitrary characters.
- **Verdict:** This is the single highest-leverage thing on this list and almost nobody outside Japan knows it exists. Japanese has no spaces, so a browser wraps mid-word by default and native readers see something equivalent to breaking "understanding" as "understan / ding" on every line. BudouX fixes it client-side with a shipped model, no server, no runtime dependency, and — the hard part — it preserves inline markup across the break. If an agent renders any CJK or Thai copy without this, the typography is wrong regardless of how good the layout is.
- **Use when:** any interface that renders Japanese, Chinese or Thai prose, especially headlines and short blocks. · **Don't use when:** Latin-script-only products; `text-wrap: balance`/`pretty` covers you there.
- **Scores /5:** visual 4 · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 3 · customization 4 · perf 5 · stability 5 · originality 5
- **Evidence:** ★1,778 · last release v0.9.1 @ 2026-08-28 · last push 2026-09-09 · 46,990 wk npm · 15 contributors · Apache-2.0 · maintained under the `google` GitHub org
- **Looked at:** https://google.github.io/budoux/ — the demo page itself is an unstyled Google-Labs artifact (flat purple #5b2ea6 band, native `<select>`, native range slider, no design at all). The output is the point: "Google の使命は、世界中の情報を整理し、/ 世界中の人がアクセスできて使えるように / することです。" breaks at 文節 boundaries, and the `<strong>` and `<em>` runs survive intact across the wrap.
- **Vibecode risk:** low — it produces no visual style of its own, only correct line breaks.
- **Link:** https://github.com/google/budoux

### Nord Design System — `strong`
- **What:** Nordhealth's healthcare design system, shipped as framework-agnostic web components plus a separate themes package.
- **Verdict:** This is the clearest counter-example to the entire vibecoded aesthetic and agents should study it before they reach for another violet gradient. Every card is a 1px hairline with a ~4px radius and no shadow whatsoever; the primary button is a flat royal blue with no gloss; the preview wells sit on a barely-there #f7f8fa tint. It is restrained to the point of plainness, which is the correct trade for clinical software where a misread number matters. The catch is real: the source is not on GitHub (the `nordhealth` org has example projects but no component repo), and npm reports the license as "SEE LICENSE IN LICENSE.md" — terms unverified.
- **Use when:** dense form-heavy or regulated products, or as a visual reference for "serious" restraint. · **Don't use when:** you need to fork, audit, or patch the source, or you need a consumer-marketing look.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 4 · docs 5 · customization 3 · perf 4 · stability 4 · originality 3
- **Evidence:** ★n/a (source closed) · @nordhealth/components 5.3.0 @ 2026-08-13 · @nordhealth/themes 10.0.4 @ 2026-07-29 · 5,892 wk npm · license unverified · first published 2021-02-08
- **Looked at:** https://nordhealth.design/components/ — 60+ components with mint "New" badges on Accordion, Autocomplete, Collapsible, Combobox and Date Range Picker, so it is actively growing. Headings are a heavy near-black navy; the Segmented Control preview (Day/Week/Month) uses a 1px-bordered track with a white active pill and no shadow, where almost every React library would add `0 1px 2px`.
- **Vibecode risk:** low — its default look reads as enterprise healthcare, not as "a template". Nothing about it is fashionable enough to become a tell.
- **Link:** https://nordhealth.design

### Bits UI — `strong`
- **What:** Headless, unstyled component primitives for Svelte 5, built on runes.
- **Verdict:** With Melt UI's last push 11 months back, this is now the Svelte headless answer and the download numbers agree — 901k weekly against Melt's 5k. What earns the tier is the docs' framing: the sidebar leads with Child Snippet, Ref, Transitions, Styling, State Management before it lists a single component, which is a library documenting its architecture rather than selling a look. It also ships an `LLMs` doc page and per-page "Copy Page" — the first library in this file to treat coding agents as a first-class reader.
- **Use when:** any Svelte 5 app where you own the styling. · **Don't use when:** you want components that look finished on install — this gives you behaviour and nothing else.
- **Scores /5:** visual 3 · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 4 · stability 4 · originality 3
- **Evidence:** ★3,543 · last release bits-ui@2.19.2 @ 2026-09-09 · last push 2026-09-09 · 901,314 wk npm · 117 contributors · MIT · 73 open issues
- **Looked at:** https://bits-ui.com/docs/components/combobox (dark) — near-black #0a0a0a ground, and the Combobox demo is one small control alone in a very large empty well. That emptiness is a deliberate signal: there is no house style to show off. Right rail lists 20 sub-topics for a single component (Scroll Lock, Custom Anchor, Native Scrolling/Overflow, onHighlight) — this is unusually thorough primitive documentation.
- **Vibecode risk:** low — headless, so any recognizable look is yours.
- **Link:** https://bits-ui.com

### Naive UI — `strong`
- **What:** A complete Vue 3 component library from the TuSimple frontend team, themed entirely through TypeScript objects.
- **Verdict:** Technically the strongest Vue library I examined and criminally under-discussed in English-language frontend writing. Theming is a typed object rather than a pile of CSS variables, which means an agent can generate a coherent theme programmatically and have the type checker catch it. The docs are visually plain — system fonts, no craft — but the components are honest, and the amber "Caveat" blocks that explain exactly when `page-count` will be ignored are the kind of candour most libraries bury in a GitHub issue. The 703 open issues are the real caveat.
- **Use when:** Vue 3 admin tools, internal dashboards, anything needing a real DataTable. · **Don't use when:** you need a marketing-grade look without heavy theming work, or you need a small bundle.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 5 · maintenance 4 · docs 4 · customization 5 · perf 3 · stability 4 · originality 3
- **Evidence:** ★18,539 · v2.45.3 @ 2026-08-27 (no GitHub releases; versions via npm) · last push 2026-08-27 · 107,422 wk npm · 347 contributors · MIT · 703 open issues
- **Looked at:** https://www.naiveui.com/en-US/os-theme/components/data-table — table header on a light #fafafa fill, 1px hairline row rules, no zebra striping, ~40px rows, and row actions rendered as soft-gray chips with ~3px radii rather than blue links. Signature green #18a058 accent. The sidebar carries Gradient Text, Watermark and Float Button — a component vocabulary that only exists in the Chinese ecosystem.
- **Vibecode risk:** low — the green-accent default is distinctive enough to notice but rare enough in the West that it won't read as a template.
- **Link:** https://www.naiveui.com

### Web Awesome — `strong`
- **What:** Shoelace 3, rebuilt and rebranded by the Font Awesome team as a freemium web-component library.
- **Verdict:** The most consequential fact in this file: `shoelace-style/shoelace` is **archived**, last released v2.20.1 in March 2025, and Web Awesome is where the ecosystem went — 1.3M weekly npm installs and 5.0M in the last month against a package first published only in June 2025. The core is MIT, works in any framework or none, and the default button is a dark neutral rather than a blue, which is the correct default. Deduct for the docs site, which looks like 2019 — grey chrome bar, cartoon crown, emoji nav glyphs — and for the growing "Pro" gates.
- **Use when:** any non-React or multi-framework stack, design systems that must outlive a framework choice. · **Don't use when:** you need the whole feature surface free forever, or you are already all-in on React with a headless kit.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 5 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 4 · originality 3
- **Evidence:** ★13,843 on the archived Shoelace repo · @awesome.me/webawesome 3.12.0 @ 2026-08-21 · 1,304,381 wk npm (5,035,846 last month) · MIT · first published 2025-06-30 · predecessor archived
- **Looked at:** https://webawesome.com/docs/components/button/ — variant row renders Neutral (#21242c), Brand blue, Success green, Warning amber and Danger red as flat ~4px-radius fills with no gradient or shadow. Every example has an inline "Edit" affordance and a resize grip. Nav confirms the story: "Migrating from Shoelace", plus "Using with AI", plus Pro badges on Figma Design Kit and Patterns.
- **Vibecode risk:** low — deliberately neutral defaults; the tell would be leaving them unthemed, not the theme itself.
- **Link:** https://webawesome.com

### Semi Design — `strong`
- **What:** ByteDance's design system (maintained by the Douyin frontend and UED teams), React components plus a Figma design-to-code pipeline.
- **Verdict:** Worth studying less for the components than for the information density, which Western libraries systematically cannot reach. Their own hero screenshot is a real internal ops console: ~13px type, 4px radii, thin gray dividers, no shadows anywhere in the table, and roughly three times the data per square inch of an equivalent US SaaS dashboard. The design-to-code path (Figma plugin → tokens → components) is the actual differentiator and is more mature than most. The risk is drift: last GitHub release was 2025-11-18 even though the repo is pushed weekly, and the license reads NOASSERTION.
- **Use when:** dense internal tools, data consoles, anything CJK-first. · **Don't use when:** you need a Western marketing aesthetic, or you need an unambiguous OSS license.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 3 · docs 4 · customization 4 · perf 3 · stability 3 · originality 4
- **Evidence:** ★10,356 · last release v2.88.2 @ 2025-11-18 · last push 2026-09-01 · 26,888 wk npm · 143 contributors · NOASSERTION · site states maintenance by Douyin's frontend + UED teams
- **Looked at:** https://semi.design/en-US/ — hero is CJK-typography-led: a ~64px ultra-bold Chinese headline at tight tracking against a pale lavender→mint wash. Product shot shows an internal console with per-app cards for 抖音极速版 and 头条搜索 carrying AppIDs and pending/resolved counts. Top nav includes 设计转代码 (design-to-code) and a 数据可视化 section marked NEW.
- **Vibecode risk:** medium — the blue #0064fa + dense-table default is recognizable once you have seen three ByteDance-derived apps.
- **Link:** https://semi.design

### Tweakpane — `strong`
- **What:** A compact pane for binding and monitoring parameters, from Japanese developer cocopon. Standalone, no framework.
- **Verdict:** The best-designed micro-interface on this list, and the reason to study it is density without noise: six labelled controls in about 300px of height, ~13px monospace labels, 2px radii, square slider handles, right-aligned numeric fields with a subtle inset. Nothing decorative survives. Compare it to any React "settings panel" component and the difference is instructive. The maintenance picture is the problem — v4.0.5 shipped 2024-11-03, no release in 22 months, and 5 contributors total against 249k weekly installs. It works and it is stable, but it is a one-person project with a bus factor of one.
- **Use when:** creative-coding tools, debug panels, generative or 3D parameter tuning, any dense control surface. · **Don't use when:** it is on your product's critical path and you need responsive upstream fixes.
- **Scores /5:** visual 5 · interaction 5 · a11y 2 · engineering 4 · maintenance 2 · docs 4 · customization 4 · perf 5 · stability 4 · originality 5
- **Evidence:** ★4,591 · last release 4.0.5 @ 2024-11-03 · last push 2026-03-15 · 249,542 wk npm · 5 contributors · MIT · created 2016-05
- **Looked at:** https://tweakpane.github.io/docs/ — the pane sits in a halftone-dot hero as a dark #28282f panel with a "Parameters" title bar, a Layout/Presets tab pair, and rows for spacing/range/maxSize/freq/amp. Docs body is a bold geometric sans over hairline-bordered, shadowless cards. Sidebar taxonomy (Bindings → Monitor bindings → Blades) is unusually well-modelled for a control library.
- **Vibecode risk:** low — its look is specific to debug/creative tooling and reads as intentional there.
- **Link:** https://tweakpane.github.io/docs/

### Toss Frontend Fundamentals + overlay-kit — `strong`
- **What:** Toss (Korean fintech) publishes a code-quality guidebook in Korean/English/Japanese/Chinese, plus a small suite of libraries; `overlay-kit` makes modals and sheets declarative and promise-based rather than boolean-state-based.
- **Verdict:** Korea's frontend engineering culture publishes better than the Anglosphere does and almost none of it reaches English-language discourse. Frontend Fundamentals is a rare artifact: a guidebook organized around *changeability* with side-by-side before/after refactors, translated into four languages, plus a discussion space. `overlay-kit` is the single best fix for the ugliest pattern in React UI — the `const [isOpen, setIsOpen]` that leaks modal state into every parent. 54,651 weekly installs and 38 contributors say it is real, not a demo. `es-toolkit`, from the same org, is at 43.6M weekly.
- **Use when:** you want a genuinely better overlay API, or team-level code-review standards worth adopting. · **Don't use when:** overlay-kit's React coupling doesn't fit your stack.
- **Scores /5:** visual n/a · interaction 5 · a11y 3 · engineering 5 · maintenance 4 · docs 5 · customization 4 · perf 5 · stability 4 · originality 5
- **Evidence:** frontend-fundamentals ★1,995 · last push 2026-03-08 · overlay-kit ★731 · v1.9.0 @ 2026-02-25 · 54,651 wk npm · 38 contributors · MIT · es-toolkit ★11,340, 43,670,673 wk npm
- **Looked at:** https://frontend-fundamentals.com — read, not screenshotted: three sections (code-quality principles for changeability, review examples, community), navigation in ko/en/ja/zh-Hans. `overlay-kit` has no visual surface to screenshot; it is an imperative API that renders whatever component you hand it.
- **Vibecode risk:** n/a — no visual output.
- **Link:** https://frontend-fundamentals.com · https://github.com/toss/overlay-kit

### Oat — `experimental`
- **What:** A ~10KB HTML + CSS UI library from Kailash Nadh (Zerodha, India) that styles semantic tags contextually with no classes; a few dynamic pieces are web components.
- **Verdict:** The most interesting new thing outside the React bubble this year — 5,484 stars in eight months on a library whose pitch is "no framework, no build, no dev complexity". It styles `<button>`, `<input>`, `<dialog>` directly so your markup stays clean, which is exactly the property that makes an LLM-generated page degrade gracefully. Aesthetically it is warm and unfashionable: an oat/tan palette, brown-not-black buttons, hairline cards, no shadows, no gradients anywhere. It is v0.8.0 with 5 open issues and 26 contributors, so treat it as a bet, not a foundation.
- **Use when:** server-rendered apps, HTMX/Go/Python stacks, internal tools, prototypes where a build step is a tax. · **Don't use when:** you need a stable 1.0 API or deep component coverage.
- **Scores /5:** visual 4 · interaction 3 · a11y 4 · engineering 4 · maintenance 4 · docs 4 · customization 4 · perf 5 · stability 2 · originality 5
- **Evidence:** ★5,484 · last release v0.8.0 @ 2026-09-08 · last push 2026-09-08 · created 2026-01 · 26 contributors · MIT · 5 open issues · states 7KB CSS + 2.9KB JS min+gzip
- **Looked at:** https://oat.ink at 1440 and 390 — desktop is a two-column doc shell with a warm brown #4a3a33 primary button and hairline shadowless cards; the sidebar marks which components are web components with a small "WC" superscript, and includes an "Other tiny libs" page that points at competitors. At 390px it collapses to hamburger + logo, single column, ~17px body at generous leading, buttons still 44px tall. It holds up.
- **Vibecode risk:** low — the warm palette and class-free markup produce pages that look like documents, not templates.
- **Link:** https://oat.ink · https://github.com/knadh/oat

### OverType — `experimental`
- **What:** A markdown editor that is a transparent `<textarea>` positioned over a rendered preview div. One script tag, 91KB total.
- **Verdict:** The best idea-per-byte on this list. Every WYSIWYG markdown editor reimplements text editing and inherits every bug that comes with it; OverType keeps the browser's native textarea — real undo, real IME, real mobile keyboards, real accessibility — and paints the formatting underneath. That is a genuinely novel structural choice, not a styling one. The landing page is a taste statement in itself and it earns the tier as much on positioning as on code. No tagged releases and 9 contributors means it is a young project.
- **Use when:** comment boxes, note fields, any markdown input where a 500KB editor is absurd. · **Don't use when:** you need tables, collaborative cursors, or block-based editing.
- **Scores /5:** visual 4 · interaction 4 · a11y 5 · engineering 5 · maintenance 3 · docs 3 · customization 3 · perf 5 · stability 2 · originality 5
- **Evidence:** ★3,700 · no tagged releases · last push 2026-09-05 · created 2025-08 · 8,334 wk npm · 9 contributors · MIT · 6 open issues
- **Looked at:** https://overtype.dev — pure black ground, everything set in monospace, all-caps letterspaced section rules, one yellow #ffd700 accent in a script logotype over a pixel-font "Over". No cards, no shadows, no gradients. Section heading reads "AN UNDER-ENGINEERED SOLUTION" and the stat line is "91KB TOTAL · ONE SCRIPT TAG · UNDERSTAND YOUR EDITOR". The design argues the thesis.
- **Vibecode risk:** low — it renders into your styles, and its own aesthetic is too idiosyncratic to copy accidentally.
- **Link:** https://overtype.dev

### Konsta UI — `situational`
- **What:** Pixel-accurate iOS and Material components for React, Vue and Svelte, built on Tailwind, from the Framework7 author.
- **Verdict:** If you are building a web app that must pass as native on iOS, this is the one that actually gets the details right, and the details are where every competitor fails. Its grouped-list demo shows separators inset to the label's left edge rather than full-bleed, ~10px inner corner radii on the group card, 17px row labels with a 13px gray section header, and the correct #007aff accent. Almost every "iOS-like" library gets the separator inset wrong. v5.4.0 explicitly tracks iOS 26 and Material 2025. Deduct for its marketing site, which is loud orange with an emoji-confetti banner and a cross-promo bar — the site is much worse than the product.
- **Use when:** PWAs and hybrid apps that need to read as native on iOS or Android. · **Don't use when:** you want a distinctive brand — this deliberately looks like someone else's OS.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 4 · docs 3 · customization 3 · perf 4 · stability 4 · originality 3
- **Evidence:** ★4,246 · last release v5.4.0 @ 2026-08-25 · last push 2026-09-02 · 17,989 wk npm · MIT · created 2021-01 · sibling project Framework7 ★18,753, pushed 2026-09-08
- **Looked at:** https://konstaui.com — in-frame demo renders the iOS grouped-inset list correctly (see above). The page chrome around it is the weak part: a black cross-promo bar for an unrelated product and a 🎉 announcement box.
- **Vibecode risk:** high — by design. Anything built with it is instantly identifiable as "iOS-styled web app", which is either the goal or a disaster.
- **Link:** https://konstaui.com

### Basecoat — `situational`
- **What:** shadcn/ui's components rebuilt as plain HTML + Tailwind CSS with small vanilla-JS behaviours, so they work in Django, Rails, Laravel, HTMX or nothing at all.
- **Verdict:** Solves a real problem — every server-rendered stack has watched React monopolize the good component patterns — and it does it well, with a theme switcher and 12 contributors behind it. But be clear-eyed about what it propagates: this reproduces the single most recognizable default look on the web, in HTML, which means it also reproduces the recognizability. Its own landing bento is monochrome shadcn down to the ~8px radii, the hairline #e4e4e7 inputs and the near-black #18181b primary. One inconsistency I noticed: the "View Full Report" button carries a subtle gradient that shadcn itself does not use.
- **Use when:** Django/Rails/Laravel/HTMX apps that need decent components today and where "looks like everything else" is acceptable. · **Don't use when:** the product needs a distinct visual identity — re-theme heavily or pick something else.
- **Scores /5:** visual 3 · interaction 3 · a11y 3 · engineering 4 · maintenance 4 · docs 4 · customization 4 · perf 4 · stability 3 · originality 2
- **Evidence:** ★4,287 · last release 1.0.1 @ 2026-06-28 (basecoat-css 1.0.2 @ 2026-07-06 on npm) · last push 2026-07-21 · 12 contributors · MIT · created 2025-01
- **Looked at:** https://basecoatui.com — headline "All of the shadcn/ui magic, none of the React" in a tight heavy grotesk at roughly -0.03em; below it a four-column bento of live components (button variants, inputs, a flat-gray bar chart, toggle, badges, a QR card) rendered in a theme labelled "Vega" in the top-right switcher.
- **Vibecode risk:** high — it is the shadcn face by construction.
- **Link:** https://basecoatui.com

### SmartHR UI — `situational`
- **What:** The open-source React component library behind SmartHR, a Japanese HR SaaS, published alongside a full public design system.
- **Verdict:** Include it for the documentation, not the components. SmartHR publishes accessibility guidance written for Japanese screen readers and Japanese form conventions — a body of knowledge that essentially does not exist in English — and their component index openly marks deprecated pieces (BottomFixedArea is labelled 非推奨 right in the nav) rather than quietly hiding them. Release cadence is extraordinary: v99.6.1 shipped the day I checked, 114 contributors. The components themselves carry an unmistakable teal #00c4cc house brand and the docs are Japanese-only, which caps how usable it is outside SmartHR.
- **Use when:** you need a reference for CJK-aware accessible form design, or you are shipping a Japanese-market product. · **Don't use when:** your team cannot read Japanese docs, or you need a neutral visual base.
- **Scores /5:** visual 3 · interaction 3 · a11y 5 · engineering 4 · maintenance 5 · docs 4 · customization 2 · perf 3 · stability 4 · originality 3
- **Evidence:** ★973 · last release smarthr-ui-v99.6.1 @ 2026-09-10 · last push 2026-09-10 · 19,855 wk npm · 114 contributors · MIT · created 2018-05
- **Looked at:** https://smarthr.design/products/components/ — a ~64px bold Japanese heading over a plain white grid; component thumbnails are raw un-styled previews in 1px gray boxes, with the teal AppHeader the only branded element. Left nav runs デザイン原則 / ユーザビリティ / 情報設計 / デザイントークン before components — the system is documented as principles first, parts second.
- **Vibecode risk:** high — the teal is strong and the components are visibly SmartHR's.
- **Link:** https://smarthr.design

### interfaces.dev — `reference-only`
- **What:** "Interfaces — The Design Engineering Magazine", written by Jakub Krehel. Subscription publication.
- **Verdict:** The best example on this list of an indie design engineer whose own work outclasses most libraries, and it demonstrates its thesis in the masthead rather than asserting it. Worth reading for the reason most design writing is not: it is about the small accumulating details that separate a good product from a great one, written by someone who evidently ships them. Reference-only because it is paywalled and is writing, not a dependency.
- **Use when:** you want a model for annotated, self-explaining editorial design, or you want a design-engineering publication worth paying for. · **Don't use when:** you need free, citable reference material.
- **Scores /5:** visual 5 · interaction 4 · a11y 3 · engineering 4 · maintenance n/a · docs n/a · customization n/a · perf 4 · stability n/a · originality 5
- **Evidence:** reached 100 points on Hacker News · subscription-gated (Log in / Subscribe) · no repo, no package · authorship verified on-page
- **Looked at:** https://interfaces.dev — the three-line masthead is annotated like a live Figma canvas: a swatch chip reading `oklch(0.991 0 0)`, an `x-height` leader to the cap line of "Interfaces", a selection box around "Engineering" labelled `294 × 58`, a `font-libre-baskerville` callout on the italic serif "Magazine", a 32px pink spacing bar above the CTA and a dashed `Call to action` tag on the button itself. Grotesk paired with Libre Baskerville italic across three lines, and real italic serif used for emphasis inside sans body copy. One tell: the CTA is a fully-rounded #00b0ff pill, the most generic element on the page.
- **Vibecode risk:** n/a — it is a publication.
- **Link:** https://interfaces.dev

### Slint — `reference-only`
- **What:** A declarative GUI DSL compiling to Rust/C++/Python/JS for embedded, desktop and mobile.
- **Verdict:** Worth studying for the idea, not for the taste. The DSL treats layout and property bindings as a first-class language with a live preview and a Figma import path, which is a genuinely better authoring model than React's and is the kind of thing web tooling keeps almost-inventing. But do not treat its own presentation as a design reference: the marketing site is tell-heavy, and the license is NOASSERTION on GitHub (dual-licensed, terms unverified) which is a real adoption question for commercial work. 274 contributors and 856 open issues.
- **Use when:** embedded/desktop GUI work in Rust, or as a study in declarative UI language design. · **Don't use when:** you are building for the web, or you need an unambiguous permissive license.
- **Scores /5:** visual 2 · interaction 4 · a11y 3 · engineering 5 · maintenance 5 · docs 4 · customization 4 · perf 5 · stability 4 · originality 5
- **Evidence:** ★23,773 · last release v1.17.1 @ 2026-07-07 · last push 2026-09-09 · 274 contributors · NOASSERTION (dual-licensed; terms unverified) · 856 open issues · created 2020-05
- **Looked at:** https://slint.dev — hero sets "Design to Deploy" in a blue→purple gradient wordmark flanked by a clip-art mouse cursor with purple sparkle strokes and a bezier-handle doodle, over a lavender band and a generic blue CTA. A site-wide banner reads "Getting Good Vibes from Slint". Three tells above the fold.
- **Vibecode risk:** n/a for web; do not copy the site.
- **Link:** https://slint.dev

## Rejected / avoid
- **Shoelace** — the repository is **archived**; last release v2.20.1 on 2025-03-11. Still 119,791 weekly npm installs, which means a lot of projects are on a dead dependency without knowing it. Migrate to Web Awesome.
- **Melt UI (v1)** — last push 2025-09-30, 122 open issues, 5,007 weekly installs. The successor `melt-ui/next-gen` has 330 stars and has not been pushed since 2026-03-04. Do not start new Svelte work here; use Bits UI.
- **OgBlocks** — appeared on Hacker News under at least eight near-identical Show HN titles ("for CSS Haters", "for React Lovers", "in Minutes"), all scoring 1–3 points. Repeated self-promotion under rotating framings is a reliable negative signal about what is underneath. Skip.
- **Vant** — I looked at https://vant.pro/vant/mobile.html: full-width white pill rows with large radii and chevrons on a #f7f8fa ground. That is the WeChat/Alipay mini-program idiom done well, and it is exactly wrong outside Chinese mobile commerce. `situational` at best, and only for that market.
- **Ark UI / Zag.js** — genuinely excellent and genuinely framework-agnostic (903k and 1M weekly), but with 5.4k/5.2k stars and Chakra's team behind it, it is squarely inside the mainstream discourse. It belongs in the headless-primitives file, not this one.
- **componentlibraries.com** — a directory of component libraries "for any framework". Directories are the opposite of curation; they optimize for coverage and launder quality signals. Do not cite it.

## What surprised me
- **Shoelace is archived and most people have not noticed.** 13.8k stars, 119k weekly installs, and the repo is read-only. The successor package `@awesome.me/webawesome` was first published 2025-06-30 and is already at 1.3M weekly — the migration happened fast and almost entirely outside English-language frontend discourse.
- **Melt UI is effectively dead and Bits UI won by 180×.** Melt was the Svelte headless project everyone cited in 2024. It is at 5,007 weekly installs against Bits UI's 901,314, and its rewrite stalled six months ago. Reputation has not caught up with the numbers.
- **Tweakpane has not had a release since November 2024.** 249k weekly downloads, 4,591 stars, and five contributors total. One of the most-loved micro-UIs on the web is a single-maintainer project that has been quiet for 22 months.
- **CJK line-breaking is a solved problem nobody in the West applies.** BudouX is a Google project, Apache-2.0, 47k weekly downloads, and it fixes typography that is visibly broken to a billion readers. If your product renders Japanese and you have not shipped it, your Japanese typography is wrong.
- **The best accessibility documentation I found this pass is in Japanese.** SmartHR publishes screen-reader and form guidance for Japanese assistive tech at a depth no English-language design system matches, and ships v99.x releases daily. It is essentially invisible outside Japan.
- **A 10KB class-free CSS library from Zerodha's CTO got 5,484 stars in eight months.** Oat has no framework, no build step, and a warm brown palette, and it is growing faster than most React libraries — evidence that the appetite for un-fashionable, server-rendered UI is much larger than the React discourse represents.

## Open questions
- **Nord's actual license terms.** npm reports "SEE LICENSE IN LICENSE.md", the component source is not on GitHub, and https://nordhealth.design/licensing/ returns 404. Settled by reading LICENSE.md inside the published tarball or asking Nordhealth directly.
- **Web Awesome Pro's price and contents.** I confirmed Pro badges on the Figma Design Kit and Patterns pages but could not verify pricing or what else is gated. Settled by the pricing page or a Font Awesome invoice.
- **Semi Design's release drift.** Repo pushed 2026-09-01 but last tagged release 2025-11-18. Are they publishing to npm without GitHub releases, or has the public cadence genuinely slowed? Settled by comparing npm publish timestamps for @douyinfe/semi-ui against the tag history.
- **Slint's dual-license terms for commercial desktop work.** GitHub reports NOASSERTION. Settled by reading the LICENSE files in-tree and their commercial FAQ.
- **Whether Konsta's "iOS 26" claim holds against a real device.** I judged its inset separators and grouped-list radii from the site's own in-frame demo, not from a side-by-side with iOS 26 Settings. Settled by a device screenshot comparison.
- **Chinese/Korean community sentiment.** Reddit blocked my requests (HTTP 403) and my web-search budget was exhausted early, so I could not sample Juejin, Zhihu or V2EX discussion of Semi vs Arco vs TDesign. Settled by running those queries with a working search backend.
