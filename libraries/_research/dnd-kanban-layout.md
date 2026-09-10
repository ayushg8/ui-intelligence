# Drag & drop, kanban, resizable and spatial layout

**Evaluated:** 2026-09 · **Researcher note:** The category's centre of gravity moved. `@dnd-kit/core@6.3.1` — the package with 22.4M weekly downloads that every tutorial and every LLM still recommends — has not been published since **2024-12-05**; all maintainer effort went into an unfinished ground-up rewrite (`@dnd-kit/react@0.5.0`, ~1.15M wk, still 0.x after two years). Meanwhile Atlassian shipped Pragmatic drag-and-drop to 3.1.0 and its docs are now the best-specified drag design system on the public web. The honest state: nothing in this category ships accessible reordering by default except React Aria, and the single most useful design decision an agent can make is *not to build a drag interaction at all*.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Pragmatic drag-and-drop | `essential` | Best-engineered pointer DnD on the web, with published pixel-level design specs — but you build the a11y alternative yourself | low |
| React Aria `useDragAndDrop` | `essential` | The only library that actually ships keyboard + screen-reader + touch-SR parity for reordering | low |
| react-resizable-panels | `essential` | Split panes, done. Real `role="separator"` + keyboard resize. v4 renamed everything — check your imports | low |
| dnd-kit | `strong` | Still the most ergonomic React API; stable line frozen 21 months, successor still 0.x. Pick a lane deliberately | medium |
| Dockview | `strong` | Best-looking demo in the category and the only serious modern IDE-docking manager; open-core | low |
| gridstack.js | `situational` | 12 years of correct grid math, zero design. Bring your own CSS or it looks like 2014 | medium |
| react-grid-layout | `situational` | The dashboard-grid default; ships a literal red placeholder and a 5px invisible resize grip | high |
| SortableJS | `situational` | Moves the real DOM node; no floating preview, no insertion line. Fine for small lists, weak feedback model | medium |
| react-mosaic | `situational` | Tiling window manager, Apache-2.0, freshly revived at v7 — narrow but well-made | low |
| @formkit/drag-and-drop | `experimental` | Data-first, 4kB, React/Vue/Solid/vanilla. Genuinely underrated; a11y story is absent | low |
| hello-pangea/dnd | `reference-only` | The rbd fork everyone recommends. Last release Feb 2025; nearly dormant | medium |
| Swapy | `experimental` | Prettiest defaults here, but GPL-3.0 + paid commercial licence and zero commits since Jan 2025 | medium |
| Muuri | `avoid` | Last release 2021, last push 2024. Dead | — |
| react-beautiful-dnd | `avoid` | Archived by Atlassian. Do not start here | high |
| Native HTML5 DnD | `reference-only` | The substrate, not the API. Cursor is not yours; touch is a coin flip | — |

## Recommendations by need
- **Default choice:** **Pragmatic drag-and-drop** for any product-grade board/list/tree in a React app you control, *paired with* an explicit non-drag alternative (a "Move to…" menu). It's the only option where the drag feedback design is specified rather than improvised.
- **Best engineering:** **Pragmatic drag-and-drop.** Framework-agnostic core, no re-render storm (it manipulates the DOM, not React state, during a drag), and it ships the pieces most libraries make you write: `hitbox`, `auto-scroll`, `live-region`, `flourish` (the drop flash), `react-drop-indicator`.
- **Best visual quality out of the box:** **Swapy** — and it's not close. Everything else ships either nothing or something ugly. Which is why the licence matters so much.
- **Best accessibility:** **React Aria `useDragAndDrop`.** Enter to lift, Tab between drop targets, arrow keys to pick an insertion point, Enter to drop; touch screen-reader users double-tap → swipe → double-tap. Everyone else's "a11y" is an `aria-live` announcement bolted onto a mouse interaction.
- **Most customizable / least house-style:** **gridstack.js** and **Pragmatic drag-and-drop**, for the same reason — they render essentially no chrome, so nothing to un-brand.
- **Lightest:** **@formkit/drag-and-drop** (~4kB gzip claimed) for sortable lists; Pragmatic's core adapter for everything else.
- **Promising newcomer:** **@formkit/drag-and-drop** — the data-first model ("your array is the source of truth") is the right abstraction and almost nobody knows it exists.
- **Premium/paid worth it:** none. `dockview-enterprise` exists as a proprietary tier; the MIT packages cover the real work. Swapy's $20 commercial licence is cheap but you're buying a project with no commits in 20 months.

## What the good ones actually do — studied interactions

Atlassian publishes the exact specs behind Trello and Jira's board drags. These are quoted from their design guidelines, not inferred:

- **Drag preview.** "Do not rotate the drag preview" — with one documented exception: **Trello uses `4deg`**. Standard preview offset is `8px` vertical / `16px` horizontal from the cursor; **cards use no offset and are dragged from the exact point grabbed**. Preview is capped at `280 × 280px` because Windows drops the opacity of anything larger.
- **The source item.** Dims to `opacity: 0.4` and stays in place. It does not disappear — the gap is the *destination*, not the origin.
- **Drop indicator (lists, trees).** A `2px` line in `color.border.selected` with an **`8px` circular terminal** on the leading edge, bleeding `4px` outward on the left, square-cornered on the right. That terminal dot is the detail nobody copies and it's what makes the line read as an insertion caret instead of a border.
- **Drop target highlight (columns, cards).** Background moves to `color.background.selected.hovered` over **`350ms`** with `cubic-bezier(0.15, 1.0, 0.3, 1.0)` — a fast-out ease that lands early, so the highlight feels like it snapped rather than faded.
- **On drop.** A `700ms` flash of `color.background.selected` with `cubic-bezier(0.25, 0.1, 0.25, 1.0)`. Confirmation, not decoration: it tells you *which* item just moved when several shifted.
- **Cursor.** During a native drag the web platform gives you no control — "the cursor is **exclusively** controlled by the `dropEffect`." Atlassian's workaround for secondary drag handles is to delay `cursor: grab` by **`800ms`** via CSS animation so a passing pointer doesn't flicker the whole row.

**Linear** (changelog-verified): dropping an issue into a different group "will move that issue to the new group and update its status automatically." The design point is that Linear's board drag is a **field mutation**, not a reordering — the board's grouping key is the thing you're editing, and the drag is just a spatial way to set it. That reframing is why Linear can offer a keyboard equivalent for free: every drag has an equivalent property-set command. A widely-cited reverse-engineering write-up says Linear uses dnd-kit internally — *reported, not verified by me*.

**Figma** (help-docs-verified): canvas dragging is snap-driven, not free — snap to geometry, snap to objects (centres and outermost points), snap to pixel grid, with a **red guide** drawn on canvas as the indicator and dimensions shown in a blue label under the bounding box. Hold `Control` to temporarily suspend snapping. The lesson for product UI: Figma's drag is precise because the *system*, not the user's hand, decides the final position.

**Notion**: exposes a drag handle on hover in list and document views but **not** in the kanban view, where the card itself is the handle — reported in third-party analysis, *not first-party verified*.

**Height**: I could not verify its drag internals at this depth. Marked unverified rather than guessed.

**The design question the brief asks — when is drag the wrong interaction?** Whenever the list is longer than a screen, whenever the two endpoints can't be on screen at once, whenever the user is on a phone, and whenever the action is semantically a *field change* (Linear's case). WCAG 2.2 SC **2.5.7 Dragging Movements (AA)** now makes this a compliance issue, not a preference: any dragging operation must also be achievable with a single pointer, no dragging, unless dragging is essential. A "Move to…" menu is not a fallback you add later; it is the primary interface, and drag is the accelerator on top.

## Scorecards

### Pragmatic drag-and-drop — `essential`
- **What:** Atlassian's framework-agnostic drag-and-drop core, built on native HTML5 DnD events, split into tiny opt-in packages (`core`, `hitbox`, `auto-scroll`, `live-region`, `flourish`, `react-drop-indicator`, `react-accessibility`, `react-beautiful-dnd-migration`).
- **Verdict:** The best-engineered thing in this file, and the only one whose *design* is specified to the pixel. Because it drives the DOM directly rather than React state, it doesn't suffer dnd-kit's re-render collapse at scale — which is precisely the problem it was built to solve after react-beautiful-dnd. The catch is stated plainly in their own docs: "the core package does not enable accessible controls automatically… **always provide alternatives to dragging**." It is a drag *engine*, not an accessible-reordering *component*, and treating it as the latter ships an inaccessible board.
- **Use when:** you're building a real kanban/list/tree at scale, you control the whole surface, and you're willing to build the "Move to…" affordance. · **Don't use when:** mobile-web is a primary surface (native HTML5 DnD on touch remains unreliable — Atlassian's own discussions carry reports of drops failing most of the time on touch), or when you need working reordering in a week with no a11y budget.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 5 · stability 5 · originality 4
- **Evidence:** ★12,755 · latest npm 3.1.0 (2026-08-29) · last push 2026-09-10 · 1.28M wk npm core, 787k `hitbox`, 346k `auto-scroll`, 230k `react-drop-indicator` · repo shows 2 GitHub contributors (monorepo mirror — real headcount is Atlassian's team, unverified) · Apache-2.0 · used by Jira, Trello and Confluence per Atlassian's own docs
- **Looked at:** https://atlassian.design/components/pragmatic-drag-and-drop/examples — the example gallery is a dense left-nav docs site with a real board, tree, table, grid, file and *virtual* example each rendered live. The list demo uses a 6-dot grip at 16px, a single-line title, a count chip, a 20px avatar and a "Todo" lozenge — 44px rows, no card shadow, no radius above 3px. It looks like Jira because it *is* Jira, which is the honest trade: adopting the examples verbatim gives you Atlassian's visual language.
- **Vibecode risk:** low — the library renders nothing. The risk is copying the example CSS, which is unmistakably Atlassian.
- **Link:** https://atlassian.design/components/pragmatic-drag-and-drop/about

### React Aria — `useDragAndDrop` — `essential`
- **What:** Adobe's headless hook + `react-aria-components` collection integration (`ListBox`, `GridList`, `Tree`, `Table`) with drag-and-drop that has genuine input parity.
- **Verdict:** Everyone else in this category treats keyboard support as an announcement layer over a mouse interaction. Adobe re-implemented drag as a first-class keyboard modality — Enter lifts, Tab cycles drop targets, arrows choose the insertion point, Escape cancels — and again for touch screen readers via double-tap/swipe/double-tap. That is the correct architecture and nobody else has it. Two real costs: it only works *inside the browser window* (their docs say so explicitly — no OS-level drops for keyboard users), and you must adopt React Aria's collection model, which is a bigger commitment than adding a sortable hook.
- **Use when:** reordering is a core, must-be-accessible workflow, or you're already on React Aria Components. · **Don't use when:** you need free-form spatial dragging, canvas work, or resizable grids — this is a collection-reordering API.
- **Scores /5:** visual 3 · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 4 · stability 5 · originality 5
- **Evidence:** ★15,860 (adobe/react-spectrum) · last push 2026-09-10 · 3.52M wk npm (`react-aria-components`) · Apache-2.0 · contributor count not separately verified
- **Looked at:** https://react-aria.adobe.com/dnd — the page opens with the clearest explanatory diagram in the whole category: source rows ghosted to ~40% opacity, a stacked drag preview under the cursor carrying a **"2" count badge**, a 2px blue focus ring on the target, and three hand-lettered labels (drag source / drag preview / drop target) tied by thin leader lines. Type is a heavy grotesk at ~44px for h1 against 17px body with generous measure. There's a **"Copy for LLM"** control in the right rail and a "Working with AI" guide in the sidebar — the docs are explicitly agent-aware.
- **Vibecode risk:** low — unstyled by default; the drop indicator is a component you render.
- **Link:** https://react-aria.adobe.com/dnd

### react-resizable-panels — `essential`
- **What:** Brian Vaughn's resizable split-pane primitives for React; the thing under shadcn's `<Resizable>`.
- **Verdict:** Does one job correctly and has the accessibility nobody else bothers with — I read the built output and confirmed `role="separator"` with `aria-valuenow` / `aria-valuemin` / `aria-valuemax` / `aria-controls` / `aria-orientation`, `tabIndex`, and keydown handling, so panes are genuinely keyboard-resizable. Two warnings. First, **the API was renamed in v4**: `PanelGroup` → `Group`, `PanelResizeHandle` → `Separator`. shadcn's current registry is already on `react-resizable-panels@^4` using `ResizablePrimitive.Group` / `.Separator`, so any model or blog post reproducing the v2-era names produces code that won't compile. Second, the churn is real: 63 published versions on the v4 line alone since 2025-12-16.
- **Use when:** any split-pane, IDE-ish, or inspector layout in React. · **Don't use when:** you need tabbed docking or floating panels — that's Dockview or react-mosaic.
- **Scores /5:** visual 3 · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 3 · originality 3
- **Evidence:** ★5,359 · latest 4.12.4 (2026-09-06) · last push 2026-09-06 · **22.8M wk npm** · 57 contributors · MIT
- **Looked at:** https://react-resizable-panels.vercel.app/ — the docs site is a full-bleed saturated magenta gradient behind a near-black rounded content slab; the contrast is loud and the colour choice is genuinely bad, but the *demo* is honest: two flat dark slabs separated by a 1px divider with a small grip. That's the library's entire visual output. Left nav is a clean 15-item list at ~14px; the API surface fits on one screen.
- **Vibecode risk:** low — it renders a `div` and a separator. All look is yours.
- **Link:** https://react-resizable-panels.vercel.app/

### dnd-kit — `strong`
- **What:** Two libraries under one name. `@dnd-kit/core@6.3.1` + `@dnd-kit/sortable` (the React-only line everyone uses) and `@dnd-kit/react` / `/dom` / `/vue` / `/svelte` @ `0.5.0` (the framework-agnostic rewrite).
- **Verdict:** The most pleasant API in the category and, on evidence, the riskiest dependency. **`@dnd-kit/core` has not been published since 2024-12-05** — 21 months — yet still pulls 22.4M weekly downloads, so the ecosystem is standing on a frozen package. The maintainer is active (commits through 2026-09-05, fixing layout thrashing in the scroll loop), but every commit lands on the 0.x rewrite, which has been 0.x since 2024 and whose docs now own the canonical `dndkit.com` domain — `docs.dndkit.com` and `next.dndkit.com` both 301 to it. Separately, v6's performance ceiling is documented in its own issue tracker: sortable grids/trees past a few hundred non-virtualised items go visibly laggy because every item re-renders and `getBoundingClientRect` saturates the main thread. It is still the right pick for a 50-item board in a React app. It is the wrong pick for a 2,000-row reorderable table.
- **Use when:** a React board or sortable list of moderate size, and you want to be productive today. · **Don't use when:** you need hundreds+ of items, non-React frameworks on the stable line, or a dependency you can point at a maintenance policy.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 2 · docs 4 · customization 5 · perf 2 · stability 2 · originality 4
- **Evidence:** ★17,617 · `@dnd-kit/core` 6.3.1 (2024-12-05) / `@dnd-kit/react` 0.5.0 (2026-06-11, beta 2026-09-05) · last push 2026-09-06 · 22.4M wk `core`, 21.8M `sortable`, 1.15M `react`, 6k `vue`, 14k `svelte` · 64 contributors · MIT · 126 open issues
- **Looked at:** https://dndkit.com — the new docs are a clean Mintlify-style site: framework switcher (TypeScript/React/Vue/Svelte/Solid) as icon rows in the left rail, a soft indigo-to-lavender hero panel with a 3D robot illustration holding a "draggable" card, ~15px body on white, ⌘K search, an "Ask a question" LLM bar pinned bottom-centre. Well-made and clearly recent — which makes the 0.x version number and the 5% adoption ratio the story rather than the polish.
- **Vibecode risk:** medium — it renders nothing, but the near-universal tutorial pattern (a white card, `rounded-lg`, `shadow-lg`, `scale(1.05)` on lift, `opacity-50` source) is now a recognisable look. If your board looks like the top Medium tutorial, everyone can tell.
- **Link:** https://dndkit.com

### Dockview — `strong`
- **What:** Zero-dependency docking layout manager — tabs, groups, splits, floating panels, popout windows, serialisable layouts — for React, Vue, Angular and vanilla TS.
- **Verdict:** Unambiguously the best-looking demo in this research and one of the few libraries here where the maintainer clearly has taste. It's the only credible modern answer to "I need a VS Code / Bloomberg-terminal layout" now that golden-layout has faded. Two caveats worth stating: no accessibility or keyboard-navigation claims appear anywhere in the docs (for a tab-and-panel manager that's a real gap, not a nitpick), and the repo is now **open-core** — MIT for `dockview-core`/`-react`/`-vue`/`-angular`, with a separate proprietary `dockview-enterprise` package. Nothing wrong with that; just read the licence file before you assume MIT covers what you're using.
- **Use when:** IDE, trading terminal, observability console, anything with user-arrangeable panels that must persist. · **Don't use when:** it's a normal app layout — this is a heavy abstraction for a sidebar and a content pane. Use react-resizable-panels.
- **Scores /5:** visual 5 · interaction 5 · a11y 2 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 4 · originality 5
- **Evidence:** ★3,411 · v8.3.0 (2026-09-09), v8.2.0 2026-08-19, v8.1.0 2026-08-12 · last push 2026-09-09 · 303k wk `dockview-core`, 216k `dockview`, 157k `dockview-react`, 6k `dockview-vue` · 50 contributors · MIT (OSS packages; `dockview-enterprise` proprietary) · 115 open issues
- **Looked at:** https://dockview.dev/demo — a full trading-terminal mock: five docked groups plus collapsed vertical rails ("Explorer", "Outline") reading bottom-up on the edges, a bottom tab strip (Logs / Terminal / Output / Problems) with a violet active underline, per-group tab bars carrying close ✕, `+`, popout and maximise icons at ~14px. Type is ~12–13px with tabular numerals in the order blotter; row height is VS Code–tight. A correlation heatmap, an FX ladder, an order book and a vol surface all render inside panels without the chrome fighting them. This reads as a product, not a component showcase — the rarest thing in this file.
- **Vibecode risk:** low — the theme system is CSS variables and the default is neutral; the demo's colour is the demo's, not the library's.
- **Link:** https://dockview.dev

### gridstack.js — `situational`
- **What:** Vanilla-JS responsive draggable/resizable widget grid, with React/Vue/Angular wrappers, zero runtime dependencies.
- **Verdict:** Twelve years of grid-packing maths that actually works — collision, float mode, nested grids, responsive column counts, serialisation — maintained at a genuinely healthy cadence (v13.2.0 in Aug 2026, pushed the day I looked). And it has had essentially no design investment ever, which is fine because it renders almost nothing. The trap is that its demos are unstyled, so an agent that copies a gridstack example verbatim ships something that looks like a 2014 admin template.
- **Use when:** a user-arrangeable dashboard where the packing behaviour matters more than the framework, or you're not on React. · **Don't use when:** you want the grid to look designed without writing all the CSS yourself.
- **Scores /5:** visual 1 · interaction 4 · a11y 2 · engineering 4 · maintenance 5 · docs 3 · customization 5 · perf 4 · stability 4 · originality 3
- **Evidence:** ★9,108 · v13.2.0 (2026-08-20) · last push 2026-09-10 · 499k wk npm · 132 contributors · MIT · zero dependencies (verified in the published manifest)
- **Looked at:** https://gridstackjs.com/demo/float.html — Times New Roman `<h1>` "Float grid demo", three unstyled blue browser-default buttons, a pale-yellow `#f5f5dc`-ish grid container and a single flat teal square labelled "0". No radius, no shadow, no type scale. That is the honest baseline and it's the correct thing to know before adopting it.
- **Vibecode risk:** medium — not because of a house style, but because the demo CSS *is* the vibecode look, and it's the nearest thing to copy.
- **Link:** https://gridstackjs.com

### react-grid-layout — `situational`
- **What:** The React dashboard grid: draggable, resizable, responsive-per-breakpoint widgets with vertical compaction.
- **Verdict:** The default answer for "Grafana-style dashboard in React", and it earns that on behaviour, not looks. Two specifics an agent must know, both read directly from `css/styles.css`: the drop placeholder is literally **`background: red; opacity: 0.2`**, and the resize grip is a 20px corner box holding a 5px chevron at `opacity: 0` until hover. Ship it unstyled and users get a red ghost block and a handle they can't find. Also note the fork in the road — a v2 line (v2.2.4, 2026-07-29) now runs alongside a maintained 1.5.4; pin deliberately.
- **Use when:** React dashboard grids with per-breakpoint layouts and persistence. · **Don't use when:** you have not budgeted time to restyle `.react-grid-placeholder` and `.react-resizable-handle`.
- **Scores /5:** visual 2 · interaction 4 · a11y 1 · engineering 4 · maintenance 4 · docs 3 · customization 4 · perf 3 · stability 3 · originality 3
- **Evidence:** ★22,415 · v2.2.4 (2026-07-29), 1.5.4 (2026-07-29) · last push 2026-08-31 · 3.42M wk npm · 118 contributors · MIT · 59 open issues
- **Looked at:** https://react-grid-layout.github.io/react-grid-layout/examples/00-showcase.html plus a **live mid-drag capture** I took with Playwright (mouse down, move, screenshot before release). The docs got a full cyberpunk restyle — neon-cyan glow on near-black, monospace, magenta accents, a `GRID_MATRIX` readout of `[x, y, w, h]` tuples. Mid-drag: the lifted tile gains a magenta glow ring and follows the cursor by transform while the target slot shows a dark-red translucent block; neighbouring tiles do not animate out of the way, so the only reflow signal is the placeholder itself. That neon theming is the demo site's, not the library's — the library ships the red block.
- **Vibecode risk:** high — the unstyled default is instantly recognisable, and the showcase's neon theme is so distinctive that copying it is equally identifying.
- **Link:** https://github.com/react-grid-layout/react-grid-layout

### SortableJS — `situational`
- **What:** The 2013-vintage vanilla sortable-list library, with wrappers for every framework, using HTML5 DnD plus a fallback mode.
- **Verdict:** Still maintained (1.15.7, Feb 2026), still the pragmatic answer outside React, and its interaction model is the weakest here for a reason people rarely articulate. I captured a real mid-drag frame: SortableJS **moves the actual DOM node** into its new slot and marks it with a `ghostClass` — in the official demo, a flat pale-blue fill. There is no floating preview under the cursor and no insertion line. For a 50px row that reads fine; for a tall card, the pointer and the thing you're dragging visibly decouple and the interaction feels broken. Add to that 526 open issues and a maintenance rhythm of roughly one release every 15 months.
- **Use when:** plain JS/jQuery/Rails/Vue, simple list reordering, and you want zero build-system opinions. · **Don't use when:** cards are large, feedback quality matters, or you need keyboard reordering (it has none).
- **Scores /5:** visual 2 · interaction 3 · a11y 1 · engineering 3 · maintenance 3 · docs 2 · customization 3 · perf 4 · stability 4 · originality 3
- **Evidence:** ★31,181 · 1.15.7 (2026-02-11), previous 1.15.6 (2024-11-28) · last push 2026-03-24 · 2.85M wk npm · 140 contributors · MIT · 526 open issues
- **Looked at:** https://sortablejs.github.io/Sortable/ — a 2015 artefact: peach `#f5ddd0` page, "Fork me on GitHub" corner ribbon, a Carbon ad block, and a centred stack of blue links inside a hairline-bordered box. No responsive layout, no type scale. Plus my mid-drag frame described above.
- **Vibecode risk:** medium — no default look, but its ghost-class pattern (a flat tinted row, no lift) is a tell that the drag was added rather than designed.
- **Link:** https://github.com/SortableJS/Sortable

### react-mosaic — `situational`
- **What:** React tiling window manager originally out of Palantir: split/tab tree, drag title bars to rearrange, JSON-serialisable layout.
- **Verdict:** Narrow scope, executed cleanly, and just came back to life — v7.0.0 shipped July 2026 after a beta, ending a 19-month gap from v6.1.1 (Dec 2024). The layout being a plain JSON tree you can `JSON.stringify` is the right primitive, and Apache-2.0 with React 16–19 support makes it easy to justify. Choose it over Dockview when you want tiling without the full docking/floating/popout surface area; choose Dockview when you want the terminal.
- **Use when:** analyst tools and internal consoles that need tiling and persisted layouts, especially if you're already in a Blueprint codebase. · **Don't use when:** you need floating windows, popouts, or a large ecosystem — 17 contributors and 69k wk downloads is a small project.
- **Scores /5:** visual 3 · interaction 4 · a11y 2 · engineering 4 · maintenance 4 · docs 4 · customization 4 · perf 4 · stability 4 · originality 3
- **Evidence:** ★4,798 · v7.0.0 (2026-07-13) · last push 2026-08-06 · 69k wk npm · 17 contributors · Apache-2.0 (LICENSE header: "Copyright 2019 Kevin Verdieck, originally developed at Palantir Technologies")
- **Looked at:** https://nomcopter.github.io/react-mosaic/ — a freshly rebuilt docs site: flat mid-blue hero band, white "Get started" pill, a plain 3×2 feature grid in a neutral grotesk with real prose ("Any split can hold any number of children, and tab groups are a first-class node type — not a workaround layered on top of splits"). Unfashionable, zero gradient, and the copy is specific rather than promotional. It reads as documentation written by someone who knows the product.
- **Vibecode risk:** low — ships a neutral default plus an optional Blueprint theme; theming is one className.
- **Link:** https://github.com/nomcopter/react-mosaic

### @formkit/drag-and-drop — `experimental`
- **What:** ~4kB data-first sorting and list-transfer library from the FormKit team, with first-class React / Vue / Solid / vanilla wrappers.
- **Verdict:** The most interesting under-known thing in this category. The premise — "your array is the source of truth: drag an item and your data reorders with it" — inverts the usual model where you get an `onDragEnd(from, to)` event and reimplement array splicing every time. It ships multi-drag, insert indicators, drop zones, handles and animations in that footprint. Two honest limits: no accessibility claims anywhere in its docs, and 1.9k stars / 95k weekly downloads means you're an early adopter with a thin issue history to lean on.
- **Use when:** sortable lists and simple multi-list boards where bundle size matters, or you're on Vue/Solid and don't want SortableJS's feedback model. · **Don't use when:** the reordering must be accessible, or it's core infrastructure you can't afford to replace.
- **Scores /5:** visual 3 · interaction 4 · a11y 1 · engineering 4 · maintenance 4 · docs 4 · customization 4 · perf 4 · stability 3 · originality 5
- **Evidence:** ★1,949 · last push 2026-07-01 · 95k wk npm · 11 contributors · MIT
- **Looked at:** not screenshotted — evaluated from repo and docs only. Marked `experimental` partly for that reason.
- **Vibecode risk:** low — headless.
- **Link:** https://github.com/formkit/drag-and-drop

### Swapy — `experimental`
- **What:** Framework-agnostic "convert any layout into a drag-to-swap one" library — slot/item swapping rather than list reordering.
- **Verdict:** The best-designed defaults in this entire file, and I'd still hesitate. My mid-drag capture: the lifted tile takes a white fill, ~16px radius and a wide soft shadow, follows the cursor with **no rotation**, while the vacated slot fills with a muted violet-grey wash and the other tiles spring into their new positions. It's the only library here whose out-of-the-box drag looks like a designed product. But: **GPL-3.0** with a paid commercial licence ($20 dev / $100 team / $200 org) — meaning any publicly distributed proprietary product needs the purchase — and **zero commits since 2025-01-19**, 20 months, on 51 open issues. Great taste, unclear future.
- **Use when:** a dashboard-tile swap surface where the aesthetic is the point and you'll buy the licence. · **Don't use when:** you need list *reordering* (swap ≠ reorder), GPL is a problem, or you need a maintained dependency.
- **Scores /5:** visual 5 · interaction 4 · a11y 1 · engineering 3 · maintenance 1 · docs 4 · customization 3 · perf 4 · stability 2 · originality 4
- **Evidence:** ★8,510 · v1.0.5 (2025-01-19) · last push 2025-01-19 · 17k wk npm · 4 contributors · **GPL-3.0 + paid commercial** · 51 open issues
- **Looked at:** https://swapy.tahazsh.com/ plus a live mid-drag frame. Landing is a centred heavy-grotesk wordmark on white with a faint violet ambient bloom behind a four-tile dashboard (a date tile, a checklist, a sales sparkline, a metric). Radii ~14–16px, shadows soft and wide rather than dark, one blue accent, a hand-lettered "try dragging" annotation with a curled arrow. Restrained and confident — one accent colour, no gradient CTA, no glassmorphism.
- **Vibecode risk:** medium — the default tile look is distinctive enough that Swapy dashboards recognise each other.
- **Link:** https://swapy.tahazsh.com

### hello-pangea/dnd — `reference-only`
- **What:** The community fork of react-beautiful-dnd, kept alive after Atlassian archived the original.
- **Verdict:** Universally recommended as "the maintained rbd" and that reputation no longer matches reality. Latest npm release is **18.0.1 from 2025-02-09** — 19 months — and the only commit since is a `.gitignore` chore in Feb 2026. It still works, still has rbd's genuinely good keyboard support (space to lift, arrows to move, space to drop — rbd's best feature and the reason people miss it), and 2.2M weekly downloads say plenty of production apps run on it. But it is a maintenance-mode artefact, and Atlassian ships `@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration` specifically so you can leave.
- **Use when:** an existing rbd codebase you're stabilising, as the last stop before migrating. · **Don't use when:** starting anything new.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 3 · maintenance 1 · docs 3 · customization 3 · perf 2 · stability 3 · originality 2
- **Evidence:** ★4,020 · v18.0.1 (2025-02-09) · last meaningful commit 2025-02-09 (chore commit 2026-02-13) · 2.21M wk npm · 106 contributors · Apache-2.0
- **Looked at:** not screenshotted — evaluated from registry and commit history.
- **Vibecode risk:** medium — its default lift-and-shadow card is the classic 2019 Trello-clone look, and boards built on it are recognisable.
- **Link:** https://github.com/hello-pangea/dnd

### Native HTML5 drag and drop — `reference-only`
- **What:** The platform's `dragstart`/`dragover`/`drop` API.
- **Verdict:** Study it, because Pragmatic drag-and-drop is built on it and its constraints become yours. Three that bite, all documented by Atlassian: **you cannot set the cursor** during a drag ("exclusively controlled by the `dropEffect`"); browsers impose their own preview styling (opacity reduction, drop shadow) that varies by engine; and on Windows any preview over `280px` in either dimension is rendered at drastically reduced opacity. Touch support remains the unresolved problem — the existence and continued maintenance of multiple touch shim projects is the evidence. Use it directly only for file drops from the OS, which is the one thing no JS library can replace.
- **Use when:** accepting files dropped from the desktop. · **Don't use when:** reordering anything.
- **Scores /5:** visual 1 · interaction 2 · a11y 1 · engineering 3 · maintenance 5 · docs 3 · customization 1 · perf 5 · stability 5 · originality —
- **Evidence:** web platform; constraints verified from Atlassian's published "Web platform design constraints" page
- **Vibecode risk:** low
- **Link:** https://atlassian.design/components/pragmatic-drag-and-drop/web-platform-design-constraints

## Rejected / avoid
- **react-beautiful-dnd** — **Archived by Atlassian** (repo flag verified), last push 2025-08-18, 642 open issues, 33.9k stars and still 1.47M weekly downloads. It is the single most misleading recommendation in this category: every metric that makes it look safe is a fossil. Its own author's replacement is Pragmatic drag-and-drop.
- **Muuri** — last **release 0.9.5 in July 2021**, last push May 2024, 33k weekly downloads. Ten thousand stars for a project that stopped five years ago. The landing page (hot-pink brush-script wordmark, mint dotted rules, "infinite layouts with batteries included") is a period piece. Dead.
- **Shopify/Draggable** — 18.5k stars, MIT, but last push 2025-12-01 and effectively feature-frozen for years. Its demo microsite is still the prettiest marketing in the category, which is exactly why it keeps getting recommended. Don't.
- **react-split-pane** — 3.4k stars but superseded; `react-resizable-panels` does the same job with real ARIA and 80× the download volume. If you want something lighter, **allotment** (★1,259, pushed 2026-09-09, 197k wk) is a maintained VS Code–style split view worth knowing about.
- **golden-layout** — ★6,711 but only 15k weekly downloads and a shrinking footprint; Dockview is the live successor for docking layouts.
- **moveable** — ★10,758 and genuinely impressive for free-transform (rotate/scale/warp), but **last push 2024-06-03**. Reference-only for spatial editors; don't build on it.
- **Any drag interaction with no non-drag alternative** — not a library, but the most common failure in this category, and since WCAG 2.2 SC 2.5.7 it is an AA conformance failure, not a nice-to-have.

## What surprised me
- **The most-downloaded drag library on npm is unmaintained-in-place.** `@dnd-kit/core@6.3.1` last published **2024-12-05**, 22.4M weekly downloads. The author is active — just entirely on a rewrite that is still `0.5.0` after two years and has ~5% of the old line's adoption. Both facts are true at once and every "dnd-kit is actively maintained" recommendation is quietly citing the wrong package.
- **Atlassian publishes the Trello drag spec, including that Trello is the exception.** "Do not rotate the drag preview" — except Trello, at `4deg`. Plus a `2px` drop indicator with an `8px` circular terminal bleeding `4px` past the edge, `opacity: 0.4` on the source, a `350ms` `cubic-bezier(0.15,1,0.3,1)` target highlight and a `700ms` drop flash. This is the most reusable design artefact in the whole category and it's buried in a design-system subpage.
- **Pragmatic drag-and-drop explicitly refuses to do accessibility for you.** In their own words: "the core package does not enable accessible controls automatically, as there is no one pattern that works well for all situations… always provide alternatives to dragging." The most engineering-credible library in the category tells you outright that keyboard dragging is the wrong answer and a "Move to…" menu is the right one.
- **Atlassian ships an rbd escape hatch as a package.** `@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration` lets an existing react-beautiful-dnd codebase swap imports rather than rewrite. Almost nobody stuck on rbd seems to know it exists.
- **`react-grid-layout`'s default drop placeholder is `background: red; opacity: 0.2`** and its resize grip is a 5px chevron at `opacity: 0` until hover. Read straight out of `css/styles.css`. Every unstyled RGL dashboard on the internet has the same red ghost block.
- **react-resizable-panels renamed its whole public API in v4** (`PanelGroup` → `Group`, `PanelResizeHandle` → `Separator`) and shadcn has already migrated — so the v2-era snippets that dominate training data and blog posts no longer compile against the current registry component.
- **Dockview quietly went open-core.** The repo's `LICENCE.md` now carries a per-package table: MIT for core/react/vue/angular, proprietary for `dockview-enterprise`. GitHub's licence API just reports "Other".

## Open questions
- **Does Linear actually use dnd-kit?** A widely-cited reverse-engineering post says so; I found no first-party confirmation. A bundle inspection of Linear's web client would settle it.
- **Pragmatic drag-and-drop on touch.** Atlassian's "web platform design constraints" page never mentions mobile, and community reports of unreliable touch drops exist but I could not reproduce them or find an official position. A statement in their docs, or a device-lab matrix, would settle it.
- **Real minzipped sizes.** I compared unpacked tarballs (pdnd 505kB across 434 files vs `@dnd-kit/core` 1.07MB) but never measured per-entrypoint gzip, so the widely-repeated "<4kB vs 6kB" comparison stays **unverified** here. A bundle-analysis run against a realistic board would settle it.
- **Whether `@dnd-kit/react` reaches 1.0.** The docs domain has already moved to the new line, which reads like commitment; the version number reads like it isn't finished. A published stability policy or a 1.0 tag would settle it.
- **Dockview keyboard accessibility.** No a11y claims appear in its docs at all. An axe/keyboard audit of the panel and tab system would settle whether that's an omission in the docs or in the code.
- **@formkit/drag-and-drop's a11y behaviour.** Its docs make no claims; I did not test it with a screen reader. A VoiceOver/NVDA pass on its sortable example would settle it.
