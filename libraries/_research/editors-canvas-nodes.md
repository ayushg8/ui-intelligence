# Rich text, code, node and canvas editors

**Evaluated:** 2026-09 · **Researcher note:** Two structural shifts since 2024. Marijn Haverbeke archived every ProseMirror and CodeMirror repo on GitHub (April 2026) and moved development to his own forge at code.haverbeke.berlin — both are still shipping on npm, so "archived" here means "left GitHub," not "dead," and every staleness scanner will lie to you about it. Meanwhile Tiptap open-sourced ten formerly-Pro extensions under MIT (June 2026), which invalidates most comparison posts still in circulation. The crowded lane is Notion-clone block editors; the missing lane is anything that handles mobile text selection well.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| ProseMirror | `essential` | The correctness substrate almost every good editor sits on; you rarely use it directly. | low |
| Tiptap v3 | `essential` | Best default for a doc surface inside a product, and the licensing objection is now obsolete. | medium |
| CodeMirror 6 | `essential` | The only serious code editor that works on phones and with screen readers. | low |
| tldraw | `essential` | Best-designed canvas UI shipped as a component — but read the license before you build a business on it. | high |
| Shiki | `essential` | Zero-runtime highlighting that looks exactly like the editor; no real competitor left. | low |
| React Flow / xyflow | `strong` | The node-graph default. Override the pink and the dot grid or everyone will know. | high |
| BlockNote | `strong` | Fastest route to a Notion-grade block editor with defaults you don't have to fix. | high |
| Excalidraw | `strong` | Genuinely MIT all the way down; the honest choice when tldraw's license is a problem. | high |
| Lexical | `strong` | Excellent engineering, zero visual opinion, still 0.x after five years. | low |
| Yjs | `strong` | The collaboration substrate; boring, correct, and everything integrates with it. | low |
| D2 | `strong` | Default diagram output that a designer would actually accept. | low |
| Konva | `situational` | Scene graph + transformer for canvas object editors; not a whiteboard. | medium |
| ProseKit | `experimental` | Best default typography of any headless editor demo I looked at, at 1.2k stars. | low |
| Monaco | `situational` | Right only when you need VS Code semantics on desktop. It says outright it doesn't do mobile. | low |
| Slate | `situational` | 0.126 and counting. Only if you inherited it or Plate is the reason. | low |
| Plate | `situational` | Enormous surface area, shadcn house style, Word-style ribbon by default. | high |
| Fabric.js | `situational` | The design-canvas workhorse; old API, still maintained. | medium |
| Milkdown | `situational` | Markdown-truth editing done well; the docs site undersells the product. | medium |
| Mermaid | `situational` | Ubiquitous because it's embedded everywhere, not because the output is good. | high |
| Rete.js | `reference-only` | Thoughtful architecture, 20 contributors, no release in 14 months. | low |
| Novel | `reference-only` | Dead since Jan 2025. Read it, don't install it. | high |
| LiteGraph.js | `reference-only` | Untouched since Aug 2024; survives only as ComfyUI's vendored fork. | medium |
| Motion Canvas | `avoid` | Abandoned. Last stable release Dec 2024, domain gone. | — |

## Recommendations by need
- **Default choice:** Tiptap v3 for prose, React Flow for node graphs, tldraw for canvas, CodeMirror 6 for code. Those four cover ~90% of real briefs.
- **Best engineering:** ProseMirror. Twenty years of one person refusing to ship a wrong abstraction, and the transform/step model is still the only one that makes collaborative undo tractable.
- **Best visual quality out of the box:** tldraw. Nothing else in this category ships UI a product designer would leave alone.
- **Best accessibility:** CodeMirror 6 — its own feature list leads with screen readers, mobile and bidi text before it mentions syntax highlighting, and that ordering is real.
- **Most customizable / least house-style:** Lexical, or ProseMirror directly. Both give you literally nothing, which is the point.
- **Lightest:** Shiki for highlighting (zero runtime — it renders to HTML ahead of time). For editing, ProseKit is the smallest thing with a real feature set.
- **Promising newcomer:** Wordgard — Haverbeke's from-scratch successor to ProseMirror, 0.1 in July 2026. Not for production yet. Read its collaborative-editing post regardless.
- **Premium/paid worth it:** Tiptap Cloud if you need comments + version history + DOCX export and don't want to build three backends. BlockNote Business ($195/mo) if you specifically need PDF/DOCX export and multi-column. Otherwise none — React Flow Pro gates no code at all.

## Scorecards

### ProseMirror — `essential`
- **What:** Schema-driven document model, transform/step system, and view layer for contenteditable. The substrate under Tiptap, Milkdown, ProseKit, BlockNote, Atlassian, Notion-adjacent editors, and the New York Times.
- **Verdict:** The document model is the whole reason this category works at all: a strict schema means invalid documents are unrepresentable, and steps mean an edit can be rebased over a concurrent one, which is what makes collaborative undo behave like a human expects rather than clobbering your collaborator's paragraph. You will almost never write against it directly — you'll use Tiptap or ProseKit — but if your editor does anything structurally unusual, you will end up reading its source, and it rewards that. The GitHub archive is a migration, not an abandonment: `prosemirror-view` shipped 1.42.3 on 2026-08-24, four months after the repo was frozen.
- **Use when:** you need exact control over document structure, or you're debugging a Tiptap problem. · **Don't use when:** you want to ship a toolbar this week.
- **Scores /5:** visual 2 · interaction 4 · a11y 4 · engineering 5 · maintenance 4 · docs 4 · customization 5 · perf 4 · stability 5 · originality 5
- **Evidence:** ★8,701 (frozen GitHub mirror) · npm `prosemirror-view` 1.42.3 on 2026-08-24 · 13.9M wk npm · MIT · development now at code.haverbeke.berlin/prosemirror
- **Looked at:** https://codemirror.net/ (the sibling site, same house style) — serif headings, ~65ch measure, zero cards or shadows, and a demo field that's just a 1px grey border, a grey line-number gutter and a pale-blue active line. The visual restraint is the philosophy: the library ships no styling and the site refuses to pretend otherwise.
- **Vibecode risk:** low — it ships no CSS, so nothing to recognize.
- **Link:** https://prosemirror.net/

### Tiptap v3 — `essential`
- **What:** Headless editor framework over ProseMirror, plus a paid cloud platform for collaboration, comments, versioning and export.
- **Verdict:** The reputation hit Tiptap took for paywalling drag handles and table-of-contents no longer matches reality — as of June 2026 those ten extensions are MIT on public npm (`@tiptap/extension-drag-handle` 3.31.3, `@tiptap/extension-unique-id`, `@tiptap/extension-table-of-contents`, all MIT, all verified). What remains paid is genuinely backend work: hosted Yjs, comment threads, version history, DOCX/PDF conversion, starting at $59/mo and reaching $1,199/mo for Business. That's the right line to draw, and it makes Tiptap the sane default for a doc surface inside a normal SaaS app. The cost is that "headless" means you own every menu, and Tiptap's own demos will teach you a house style if you let them.
- **Use when:** you want ProseMirror's correctness with a sane extension API and don't want to write node views by hand. · **Don't use when:** your document is fundamentally block-structured with drag-reorder and nesting — start from BlockNote instead of rebuilding it.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 5 · customization 5 · perf 4 · stability 4 · originality 3
- **Evidence:** ★38,330 · v3.31.3 released 2026-09-04 · last push 2026-09-08 · 10.6M wk npm (`@tiptap/react`) · ~429 contributors · MIT (editor) · pricing $49–$999/mo annual + $39/dev/mo extra seats
- **Looked at:** https://tiptap.dev/product/editor at 390px — mint-to-peach mesh gradient behind very tight-tracked geometric sans, "AI-native" set in a black rounded pill. The customer logo marquee is clipped at both edges on mobile (I could only read "…nma", Lovable, "PagerDu…"), and the four segmented editor tabs wrap to two lines. Below that is a real live editor with a compact toolbar. Marketing polish outruns mobile QA.
- **Vibecode risk:** medium — headless means no forced look, but the official templates (gradient hero, pill CTA, bubble menu with 8px radius and a soft drop shadow) are copied verbatim constantly.
- **Link:** https://tiptap.dev/

### CodeMirror 6 — `essential`
- **What:** Modular code editor: state, view, language packages, all separately versioned, all tree-shakable.
- **Verdict:** Monaco's own homepage says it is "not supported in mobile browsers or mobile web frameworks." CodeMirror 6's feature list opens with Accessibility, Mobile Support and Bidirectional Text — in that order, before syntax highlighting. That single difference decides most web briefs. The v6 rewrite is also the architectural blueprint Haverbeke then carried back into Wordgard: immutable state, extensions as data, no inheritance. Bundle it yourself rather than pulling `codemirror` meta-package and you'll ship a fraction of Monaco's weight.
- **Use when:** any code input on the web, especially anything a phone will touch. · **Don't use when:** you need real TypeScript IntelliSense, multi-file navigation, or a diff editor — that's Monaco's lane.
- **Scores /5:** visual 3 · interaction 5 · a11y 5 · engineering 5 · maintenance 4 · docs 5 · customization 5 · perf 5 · stability 5 · originality 5
- **Evidence:** ★7,818 (frozen GitHub mirror, archived 2026-04-15) · npm `@codemirror/view` 6.43.11 published 2026-09-03 · 13.3M wk npm · MIT · development at code.haverbeke.berlin
- **Looked at:** https://codemirror.net/ — the inline demo field is deliberately plain: 1px #ddd border, grey gutter with a fold chevron, active line washed pale blue, blue keywords, dark-red strings. It is not trying to be pretty; it is trying to be the thing you restyle. Pair it with a Shiki-derived theme and it looks like whatever you want.
- **Vibecode risk:** low.
- **Link:** https://codemirror.net/

### tldraw — `essential`
- **What:** Infinite-canvas React SDK: shapes, tools, selection, snapping, camera, collaboration, plus a full default UI.
- **Verdict:** This is the best-designed interface in the entire category and it isn't close. The trap is the license: tldraw's LICENSE.md is a proprietary source-available license, not MIT. You may use it in development freely, but any Production Environment needs a license key — a hobby key keeps a visible "made with tldraw" watermark, and removing it requires a quote-based commercial license. `tldraw@5.4.1` on npm literally declares `"license": "SEE LICENSE IN LICENSE.md"`. Treat that as a commercial decision made up front, not something to discover at launch. If it's a problem, Excalidraw is the MIT answer and it is meaningfully less refined.
- **Use when:** whiteboard, diagram tool, or spatial canvas where UI quality is the product and you can pay. · **Don't use when:** you need permissive licensing, or you only need node graphs (React Flow is lighter and free).
- **Scores /5:** visual 5 · interaction 5 · a11y 3 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 5 · stability 4 · originality 5
- **Evidence:** ★50,229 · v5.4.1 published 2026-09-09 · last push 2026-09-09 · 340k wk npm · ~216 contributors · proprietary source-available (LICENSE.md), commercial key required in production
- **Looked at:** https://www.tldraw.com/ — the whole chrome is maybe 6% of the viewport. The style panel is a single rounded card top-right holding a 4×3 colour grid, an opacity slider, then fill styles, dash styles and S/M/L/XL sizes stacked as three four-across rows: no nesting, no submenus, everything one click deep. Bottom-centre there are two separate floating bars — undo/redo/delete/duplicate/more sits *above* the tool bar with a gap, so contextual actions never displace the tools. 8–10px radii, hairline borders, near-invisible shadows, one blue for the active tool. That separation of "tools" from "actions on selection" is the thing to steal.
- **Vibecode risk:** high — the default UI is so distinctive that an unstyled tldraw app is identifiable in one glance, watermark or not.
- **Link:** https://tldraw.dev/

### Shiki — `essential`
- **What:** Syntax highlighter using VS Code's TextMate grammars and themes, rendering to HTML ahead of time.
- **Verdict:** It won by being correct rather than fast: the same grammars and themes VS Code uses, so a code block on your site matches the editor a reader has open on the other monitor. Zero runtime JS in the output is the second win — highlight.js and Prism both ship a parser to the browser to do a worse job. 21M weekly downloads with no meaningful competitor left. The one caveat is build-time cost: loading every grammar is heavy, so import only the languages you actually render.
- **Use when:** any code block anywhere. · **Don't use when:** you need to highlight text that only exists at runtime and can't afford the WASM/grammar load — then use a two-theme precompiled subset.
- **Scores /5:** visual 5 · interaction n/a(3) · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 5 · stability 5 · originality 4
- **Evidence:** ★13,789 · v4.4.3 published 2026-08-10 · 21.2M wk npm · ~266 contributors · MIT
- **Looked at:** https://shiki.style/ — antfu's VitePress house style (big geometric wordmark, emoji-in-grey-rounded-square feature cards, teal accent). The payoff is the code panel at the bottom: near-black #121212 surface with a language pill and a theme pill ("typescript", "Vitesse Dark ♥") in the header bar, and token colours identical to VS Code. Shipping that panel style directly is the fastest way to make docs look considered.
- **Vibecode risk:** low.
- **Link:** https://shiki.style/

### React Flow / xyflow — `strong`
- **What:** Node-and-edge graph component for React (and Svelte), with handles, custom nodes, minimap, controls, background patterns.
- **Verdict:** Honest business model and genuinely good engineering: the library is MIT and stays MIT, and React Flow Pro ($169–$289/mo) buys advanced examples, templates and prioritised support — no code is gated. That's the opposite of tldraw's arrangement and worth saying out loud. The design problem is that its defaults are extremely legible: dot-grid background, white 8px-radius node cards with a hairline border, dashed bezier edges, and hot pink `#ff0071` on handles and selection. Every AI-workflow-builder startup of the last two years ships that exact look. Override `--xy-theme-*`, replace the handles, and pick your own edge style before you launch.
- **Use when:** workflow builders, pipeline editors, dependency graphs, anything node-based. · **Don't use when:** you need free-form drawing, text on canvas, or shape tools — that's tldraw/Excalidraw.
- **Scores /5:** visual 3 · interaction 5 · a11y 3 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 4 · stability 5 · originality 3
- **Evidence:** ★38,317 · `@xyflow/react` 12.11.6 published 2026-09-01 · last push 2026-09-09 · 7.9M wk npm (plus 2.0M on legacy `reactflow`) · ~138 contributors · MIT
- **Looked at:** https://reactflow.dev/ — the hero graph is the default styling: white cards with tiny soft shadows, 12–13px medium-grey labels, 8px filled circular handles on the card edges, dashed grey bezier edges, dot-grid ground. Pink is used for the accent, the CTA, and the stat numbers, so it reads as brand rather than as a neutral default — which is precisely why unmodified React Flow apps look like React Flow apps.
- **Vibecode risk:** high — the dot grid plus pink handles is the single most recognisable default in this whole document.
- **Link:** https://reactflow.dev/

### BlockNote — `strong`
- **What:** Block-based Notion-style editor for React with UI included: slash menu, drag handles, side menu, formatting toolbar, comments, Yjs collaboration.
- **Verdict:** The best-value licensing in the category as of 2026: core is MPL-2.0 (usable in closed-source commercial products), and real-time collaboration *and* comments are in the free core — those used to be the paid line. Only the `xl-*` packages (AI, multi-column layouts, PDF/DOCX/ODT/email export) are GPL-3.0-or-commercial at $195/mo. MPL's file-level copyleft means if you patch BlockNote's own files you must publish those patches; your application code is unaffected. Practically: this is how you ship a Notion-grade block editor in a week instead of a quarter, at the cost of inheriting a recognisable Notion-ish surface.
- **Use when:** the brief is "like Notion" and you want block drag-reorder, nesting and slash menus to already work. · **Don't use when:** your document isn't block-shaped, or you need a house style that isn't Notion's.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 4 · maintenance 5 · docs 4 · customization 3 · perf 4 · stability 3 · originality 3
- **Evidence:** ★10,168 · v0.54.2 published 2026-09-09 · last push 2026-09-09 · 511k wk npm · ~127 contributors · MPL-2.0 core + GPL-3.0/commercial `xl-*`
- **Looked at:** https://www.blocknotejs.org/ — transitional serif display headings ("Local-first collaboration.") against a plain near-white ground with a muted violet accent, which is a more deliberate typographic choice than most infra sites make. The product mock shows the version-history rail beside the doc with green-added / red-struck diff marks inline — the standard suggestion convention, executed cleanly. Still 0.x after 54 minors, so pin exact versions.
- **Vibecode risk:** high — its defaults are good, which is exactly why everything built on it looks the same.
- **Link:** https://www.blocknotejs.org/

### Excalidraw — `strong`
- **What:** Hand-drawn-style whiteboard, and `@excalidraw/excalidraw` as an embeddable React component.
- **Verdict:** Fully MIT, root LICENSE and npm package alike, including the app directory — verified, not assumed. That makes it the honest choice whenever tldraw's production license key is a blocker, and the difference matters more than the star counts suggest. The catch isn't legal, it's cadence: the repo is very active (30 commits since June 2026) but the *embeddable package* shipped 0.18.0 in March 2025 and 0.18.1 in April 2026 — roughly one release a year. The app and the SDK are not the same product, and if you embed you're on the slow track. The hand-drawn Rough.js aesthetic is also non-negotiable and will fight any serious brand.
- **Use when:** you need a whiteboard, need MIT, and the sketchy look is acceptable or desirable. · **Don't use when:** you need a neutral canvas that inherits your design language, or you need frequent SDK updates.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 3 · docs 3 · customization 2 · perf 4 · stability 3 · originality 5
- **Evidence:** ★131,525 · repo last push 2026-09-09 · npm `@excalidraw/excalidraw` 0.18.1 published 2026-04-20 (previous 0.18.0 was 2025-03-11) · 470k wk npm · ~357 contributors · MIT
- **Looked at:** https://excalidraw.com/ — one floating pill toolbar with the keyboard shortcut subscripted onto each icon (1–0), zoom and undo bottom-left, help bottom-right, and nothing else. The empty state is hand-lettered in the product's own Excalifont with hand-drawn arrows pointing at the menu and the toolbar — onboarding that costs zero chrome because it lives inside the aesthetic. One purple, used only for the active tool and Share. The lesson is chrome-to-canvas ratio, same as tldraw, reached by a different route.
- **Vibecode risk:** high — the sketchy stroke and Excalifont are unmistakable.
- **Link:** https://excalidraw.com/

### Lexical — `strong`
- **What:** Meta's editor framework. Its own reconciler over contenteditable, node-based document model, plugin architecture.
- **Verdict:** Technically excellent and battle-tested at Facebook/Messenger scale, with better React-render behaviour than ProseMirror-based stacks on very large documents. It also gives you nothing visually, and after five years it is still `0.50.0` — every minor has broken something for someone. Its Android IME handling has had real bugs (content consolidating at node boundaries during composition), though ProseMirror has its own Android contenteditable scars, so this is a category-wide tax rather than a Lexical-specific indictment. Choose it when the editor *is* the product and you have the team to own the surface.
- **Use when:** you're building an editor product, need deep control, and have editor-specialist engineers. · **Don't use when:** you need a doc surface inside a normal app next quarter.
- **Scores /5:** visual 1 · interaction 4 · a11y 4 · engineering 5 · maintenance 5 · docs 3 · customization 5 · perf 5 · stability 2 · originality 4
- **Evidence:** ★23,842 · v0.50.0 published 2026-09-02 · last push 2026-09-10 · 4.7M wk npm · ~450 contributors · MIT · used in Meta products (per project's own docs; not independently verified)
- **Looked at:** https://lexical.dev/ — the embedded demo editor is a rounded box with a light-grey toolbar strip holding "Normal ▾", undo/redo, B/I/U and four alignment buttons, over a "Enter some text…" placeholder in pale grey. It looks like a 2015 WYSIWYG widget, and that's the accurate advertisement: Lexical's defaults are a starting point, not a design.
- **Vibecode risk:** low — nothing to inherit.
- **Link:** https://lexical.dev/

### Yjs — `strong`
- **What:** CRDT library for shared data types, with providers for WebSocket, WebRTC, IndexedDB, and bindings for every editor here.
- **Verdict:** The de facto collaboration substrate — Tiptap, BlockNote, Plate, Lexical, Milkdown and tldraw all speak it, so choosing Yjs keeps every editor door open. It's boring in the good way: `y-prosemirror` gives you remote cursors with names and colours, offline edits that merge on reconnect, and undo that is scoped to the local user rather than global, which is the single most important collaborative-UX property and the one naive implementations get wrong. The real decision isn't Yjs vs alternatives, it's whether you run the server (Hocuspocus, MIT, 491k wk downloads) or buy it (Liveblocks, Tiptap Cloud). Loro is the credible newer CRDT (120k wk downloads, ★6,128, MIT) if you need rich history/time-travel semantics Yjs doesn't offer.
- **Use when:** anything multiplayer, or anything needing offline-first merge. · **Don't use when:** a single writer with server-authoritative saves would do — CRDT state adds real memory and payload cost for nothing.
- **Scores /5:** visual n/a · interaction 4 · a11y n/a · engineering 5 · maintenance 4 · docs 3 · customization 4 · perf 5 · stability 5 · originality 5
- **Evidence:** ★22,773 · v13.6.32 published 2026-08-04 · last push 2026-09-07 · 7.6M wk npm · ~119 contributors · MIT · Hocuspocus ★2,576, MIT, last push 2026-09-09; Liveblocks ★4,717, Apache-2.0 with AGPL-3.0 server package
- **Looked at:** BlockNote's collaboration section (https://www.blocknotejs.org/) shows the standard treatment — a coloured caret with a small name flag at the cursor, and a version rail listing "Current Draft / Version 2 / Version 1" with timestamps. Note the flag appears on the caret, not floating near it; that's the detail that stops collaborative cursors feeling laggy.
- **Vibecode risk:** low.
- **Link:** https://yjs.dev/

### D2 — `strong`
- **What:** Declarative diagram language with real layout engines (dagre, ELK, and its own TALA), compiling text to SVG/PNG.
- **Verdict:** The default output is the argument. Where Mermaid gives you inconsistent stroke weights and cramped labels, D2 produces containers with proper padding, shape semantics that mean something (cylinder for storage, hexagon for UI), solid-vs-dashed edges carrying different meanings, and small-caps italic edge labels. Under active development (v0.9.0 on 2026-09-07, MPL-2.0). The cost: it isn't embedded in GitHub, Notion or Slack the way Mermaid is, so if the diagram needs to render inside someone else's markdown you don't get to choose it.
- **Use when:** you control the rendering pipeline and diagram quality matters. · **Don't use when:** the diagram must render in GitHub/Notion/Slack markdown.
- **Scores /5:** visual 5 · interaction 3 · a11y 3 · engineering 4 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 4 · originality 5
- **Evidence:** ★25,353 · v0.9.0 released 2026-09-07 · last push 2026-09-09 · ~65 contributors · MPL-2.0
- **Looked at:** https://d2lang.com/ — the sample network diagram uses nested grey containers with 1px borders, a stacked "multiple" shape for satellites, a cylinder for storage, a hexagon for UI, dashed blue vs solid black edges, and ELK's orthogonal routing. Label type is condensed uppercase inside nodes and small italic on edges, so node names and relationship names never compete. That's a designed default; Mermaid's isn't.
- **Vibecode risk:** low.
- **Link:** https://d2lang.com/

### Konva — `situational`
- **What:** 2D canvas scene graph: nodes, layers, events, tweens, and a Transformer widget for select/resize/rotate.
- **Verdict:** The right tool when you're building an *object editor* on canvas — image compositor, label designer, floor-plan tool — and want hit-testing, drag, and a resize/rotate handle without writing canvas boilerplate. It is not a whiteboard SDK and not a node-graph library, and people reach for it wrongly in both directions. MIT, no dependencies, and the maintainer has shipped continuously since 2015 (10.5.0 on 2026-09-08), which is rarer than it should be. React bindings (`react-konva`) are first-party.
- **Use when:** canvas object manipulation with selection handles. · **Don't use when:** you want a whiteboard (tldraw/Excalidraw) or a graph (React Flow).
- **Scores /5:** visual 3 · interaction 4 · a11y 1 · engineering 4 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 5 · originality 3
- **Evidence:** ★14,776 · 10.5.0 released 2026-09-08 · last push 2026-09-08 · 2.3M wk npm · ~186 contributors · MIT
- **Looked at:** https://konvajs.org/ — navy gradient hero with a live Konva stage embedded. The Transformer is visible on a selected blue rectangle: 1px dashed selection rect with eight small circular handles and a rotate handle above. Functional and plain; you'd restyle the handles for anything shipped. The page claims production use at Meta, Microsoft, Polotno, Labelbox and Zazzle — that's the vendor's own logo strip, unverified.
- **Vibecode risk:** medium — the default Transformer look is recognisable if left alone.
- **Link:** https://konvajs.org/

### Fabric.js — `situational`
- **What:** Canvas object model with serialization, free drawing, filters, and interactive object manipulation. Sixteen years old.
- **Verdict:** Still the workhorse behind a lot of design-editor products because it handles the boring parts nobody wants to rewrite: object serialization to/from JSON, SVG import/export, image filters, and text objects that are actually editable on canvas. The API shows its age (v6 modernised it to ESM/TypeScript but the mental model is still 2011), and it's heavier than Konva. Choose it over Konva specifically when you need SVG round-tripping or on-canvas text editing.
- **Use when:** design-tool-shaped products needing SVG/JSON round-trip and canvas text editing. · **Don't use when:** Konva's lighter scene graph suffices.
- **Scores /5:** visual 3 · interaction 4 · a11y 1 · engineering 3 · maintenance 4 · docs 3 · customization 5 · perf 3 · stability 4 · originality 3
- **Evidence:** ★31,434 · release v740 on 2026-05-18 · last push 2026-09-09 · 858k wk npm · ~295 contributors · MIT
- **Looked at:** not screenshotted — fabricjs.com did not capture in this run. Judged on repo evidence and API surface only; treat the visual scores as provisional.
- **Vibecode risk:** medium.
- **Link:** https://fabricjs.com/

### Milkdown — `situational`
- **What:** Plugin-driven WYSIWYG markdown editor over ProseMirror + remark, with the "Crepe" batteries-included theme.
- **Verdict:** The strongest option when markdown must be the source of truth rather than an export format — remark round-tripping means what you save is what a human wrote, which matters for docs sites, static-site CMSes and anything git-backed. Actively maintained (7.22.1, ~317k wk downloads, ★11,904, MIT). The problem is presentation: the marketing site sells it badly, and the plugin-composition API has a learning curve that Tiptap's doesn't.
- **Use when:** markdown-as-source-of-truth editing. · **Don't use when:** your storage format is JSON/HTML anyway — then Tiptap is simpler.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 3 · customization 4 · perf 4 · stability 3 · originality 4
- **Evidence:** ★11,904 · v7.22.1 released 2026-08-12 · last push 2026-09-10 · 317k wk npm · ~72 contributors · MIT
- **Looked at:** https://milkdown.dev/ — above the fold is a wordmark in a rounded geometric sans (Quicksand-ish), a one-line tagline, two pill buttons, and a giant pale milk-splash blob. No product shown at all. The softness reads unserious for infrastructure and undersells a genuinely capable library; judge Crepe's playground, not this page.
- **Vibecode risk:** medium — Crepe's default theme is distinctive.
- **Link:** https://milkdown.dev/

### Monaco — `situational`
- **What:** The editor component extracted from VS Code. IntelliSense, multi-model, diff editor, Monarch tokenizer.
- **Verdict:** Unbeatable when you need VS Code semantics — real language-server completion, go-to-definition, a proper side-by-side diff — and unusable when you don't. Its own homepage states it "is not supported in mobile browsers or mobile web frameworks," which is unusually honest and should end most arguments. It's also large, awkward to bundle (workers, AMD legacy), and the docs site has not been designed since 2016. Use it for desktop IDE-shaped surfaces; use CodeMirror for everything else.
- **Use when:** browser IDE, playground with real type checking, or a diff view on desktop. · **Don't use when:** mobile matters, or bundle size does.
- **Scores /5:** visual 3 · interaction 5 · a11y 3 · engineering 4 · maintenance 4 · docs 2 · customization 3 · perf 2 · stability 4 · originality 3
- **Evidence:** ★46,702 · v0.56.0 released 2026-07-20 (site advertises 0.55.1) · last push 2026-09-10 · 7.6M wk npm · ~285 contributors · MIT
- **Looked at:** https://microsoft.github.io/monaco-editor/ — a purple 2016-era Microsoft header bar, default Segoe, blue underlined links, a grey rounded intro panel, and two-column feature text with no visual system. Zero design investment, and it says the mobile limitation in the second sentence of body copy.
- **Vibecode risk:** low.
- **Link:** https://microsoft.github.io/monaco-editor/

### Plate — `situational`
- **What:** Large plugin framework over Slate, plus a shadcn-distributed component library of editor UI.
- **Verdict:** The most complete pile of pre-built editor components in React, installed via `npx shadcn add`, which is genuinely convenient and also the problem — you inherit shadcn's exact look and, in the default "editor" preset, a Word-style ribbon toolbar. It also inherits Slate's foundations, which is the least battle-tested of the three engines here. Root license is MIT but individual package directories may carry their own license files, so audit before shipping commercially. Right answer if the brief is "Notion clone with every feature, this month, and shadcn is already our design system."
- **Use when:** shadcn is your design system and you need maximum features fastest. · **Don't use when:** you have your own design language, or you need the most robust engine.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 3 · maintenance 5 · docs 4 · customization 4 · perf 3 · stability 3 · originality 2
- **Evidence:** ★16,569 · v53.3.12 released 2026-09-06 · last push 2026-09-09 · 95k wk npm (`@udecode/plate`) · ~236 contributors · MIT at root, per-package licenses possible
- **Looked at:** https://platejs.org/ — the playground ships a dense single-row ribbon of ~30 icons with chevron dropdowns on most groups (font size stepper, colour, fill, alignment, three list types, indent/outdent, link, table, emoji, image, video, audio, file, line-height, comment). That's a Word ribbon, not a Notion surface. In the document body, suggestions render as green-added / red-struck and comments as yellow highlight — the Google Docs convention, executed correctly. The hero above it is pure shadcn: black-on-white, one black pill CTA, nothing else.
- **Vibecode risk:** high — shadcn defaults plus that ribbon are instantly identifiable.
- **Link:** https://platejs.org/

### Slate — `situational`
- **What:** Customizable framework for building editors, rendering through React.
- **Verdict:** Historically important and still shipping (`slate-react` 0.126.4, Aug 2026, ★31,752), but a decade in it has never reached 1.0, and its known weak spots — Android/IME handling, void and inline node edge cases, normalization surprises — are the exact areas where ProseMirror is strongest. Its real role in 2026 is as Plate's engine. Choosing Slate directly is choosing to own those edge cases yourself.
- **Use when:** you already have a Slate codebase, or you're adopting Plate. · **Don't use when:** starting fresh with a free choice — Tiptap or Lexical are better bets.
- **Scores /5:** visual 1 · interaction 3 · a11y 2 · engineering 3 · maintenance 3 · docs 3 · customization 5 · perf 3 · stability 2 · originality 3
- **Evidence:** ★31,752 · `slate` 0.126.2 published 2026-08-08 · last push 2026-09-03 · 2.65M wk npm · ~449 contributors · MIT
- **Looked at:** not screenshotted directly; observed through Plate's playground, which is Slate's most polished public surface.
- **Vibecode risk:** low.
- **Link:** https://docs.slatejs.org/

### ProseKit — `experimental`
- **What:** Headless editor framework over ProseMirror by ocavue (also a Milkdown maintainer), with framework adapters for React, Vue, Svelte, Preact and vanilla.
- **Verdict:** The best-looking default of any headless editor demo I looked at, which is a strange thing to say about a headless library and is exactly why it's worth knowing. The API is leaner than Tiptap's and its typing is stronger. At ★1,184 and ~12k weekly downloads it is nowhere near Tiptap's ecosystem, so you'll write extensions Tiptap already has. Fine for a side surface; not yet the thing to build a company's core editor on.
- **Use when:** you want a modern, typed, small ProseMirror wrapper and can absorb a thin ecosystem. · **Don't use when:** you need an existing extension for every feature.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 4 · docs 3 · customization 4 · perf 4 · stability 2 · originality 4
- **Evidence:** ★1,184 · last push 2026-09-07 · 11.7k wk npm · MIT · created 2023-07
- **Looked at:** https://prosekit.dev/ — the demo toolbar is one flat monochrome row with no chevrons at all; H1/H2/H3 are labelled text buttons with a subtle grey active pill rather than an icon-plus-dropdown. The document below has a real type ramp (heavy ~30px H1, ~24px H2, 16/1.6 body), inline code in monospace at a slightly reduced size, mentions in blue and hashtags in purple. It reads as a designed document rather than a feature showcase — the opposite of Plate's ribbon.
- **Vibecode risk:** low.
- **Link:** https://prosekit.dev/

### Wordgard — `experimental`
- **What:** Haverbeke's from-scratch rich-text editor library, released 0.1 on 2026-07-02, applying the CodeMirror 6 architecture to rich text.
- **Verdict:** Explicitly *not* ProseMirror 2.0 — ProseMirror maintenance continues — but it is the same author redoing the design with nine more years of scars, and the collaborative-editing model is OT with a central ordering server rather than ProseMirror's rebase-on-authority scheme. At 0.1 it is a research read, not a dependency. Read the two blog posts before you design any collaborative editor, whatever library you pick.
- **Use when:** you're designing an editor architecture and want the best current thinking. · **Don't use when:** production, at all, yet.
- **Scores /5:** visual 2 · interaction 3 · a11y 3 · engineering 5 · maintenance 2 · docs 3 · customization 5 · perf 3 · stability 1 · originality 5
- **Evidence:** 0.1 released 2026-07-02 · MIT · hosted at code.haverbeke.berlin/wordgard/wordgard, not GitHub, so no star/contributor metrics exist · npm adoption not verified
- **Looked at:** https://wordgard.net/ — a hand-painted watercolour floral banner with the wordmark in a serif, then plain system-serif/sans body at full width with no cards, containers or shadows. The live demo is a 1px-bordered box with a grey Google-Docs-ish toolbar: "Heading 2 ▾", undo/redo, B, I, code, link, kebab, then align, ¶, bullet/ordered lists, quote, image. Notably it *does* ship a working menu module, unlike Lexical's naked framework. Zero visual ambition, total substance — same posture as prosemirror.net and codemirror.net.
- **Vibecode risk:** low.
- **Link:** https://wordgard.net/

### Mermaid — `situational`
- **What:** Text-to-diagram renderer embedded in GitHub, GitLab, Notion, Obsidian and most markdown pipelines.
- **Verdict:** Recommend it for exactly one reason: distribution. If the diagram must render inside someone else's markdown, Mermaid is the only answer and the discussion is over. On quality it loses to D2 clearly — inconsistent stroke weights, cramped node padding, label text that collides at density, and layouts that reflow unpredictably when you add a node. Enormously maintained (★90,180, 11.3M wk npm, 11.17.2 in Aug 2026); popularity here reflects embedding, not craft.
- **Use when:** the target renderer already supports Mermaid. · **Don't use when:** you control rendering — use D2.
- **Scores /5:** visual 2 · interaction 3 · a11y 2 · engineering 3 · maintenance 5 · docs 4 · customization 3 · perf 3 · stability 4 · originality 3
- **Evidence:** ★90,180 · mermaid@11.17.2 released 2026-08-25 · last push 2026-09-09 · 11.3M wk npm · ~367 contributors · MIT
- **Looked at:** not screenshotted this run; judged against D2's rendered output on d2lang.com, where the difference in default stroke consistency and container padding is visible side by side.
- **Vibecode risk:** high — default Mermaid output is instantly recognisable and reads as "we didn't make a diagram, we generated one."
- **Link:** https://mermaid.js.org/

### Rete.js — `reference-only`
- **What:** Modular visual-programming framework: dataflow/control-flow engine plus renderers for React, Vue, Angular, Svelte.
- **Verdict:** The architecture is more thoughtful than React Flow's for actual *execution* graphs — it separates the graph, the engine that runs it, and the renderer, which React Flow deliberately doesn't do. But v2.0.6 shipped in June 2025 and nothing has released in fourteen months, with roughly twenty contributors behind it. Study the engine/renderer split; build on React Flow.
- **Use when:** studying dataflow-engine design. · **Don't use when:** shipping — the bus factor is too low.
- **Scores /5:** visual 3 · interaction 3 · a11y 2 · engineering 4 · maintenance 2 · docs 3 · customization 4 · perf 3 · stability 3 · originality 4
- **Evidence:** ★12,241 · v2.0.6 released 2025-06-30 (14 months ago) · last push 2026-07-24 · 67k wk npm · ~20 contributors · MIT
- **Looked at:** not screenshotted.
- **Vibecode risk:** low.
- **Link:** https://retejs.org/

### Novel — `reference-only`
- **What:** Notion-style WYSIWYG with AI autocomplete, built on Tiptap. Was the reference implementation everyone cloned in 2023–24.
- **Verdict:** Dead. Last commit 2025-01-18, last release Feb 2025 — nineteen months. It still gets recommended constantly in AI-generated listicles and Twitter threads, which is how a stale dependency ends up in new codebases. The source is still a good read for how to wire a slash menu and a bubble menu onto Tiptap; copy the patterns, then build against current Tiptap directly.
- **Use when:** reading it. · **Don't use when:** installing it.
- **Scores /5:** visual 4 · interaction 4 · a11y 2 · engineering 3 · maintenance 1 · docs 2 · customization 3 · perf 3 · stability 1 · originality 3
- **Evidence:** ★16,437 · novel@1.0.2 released 2025-02-11 · last push 2025-01-18 · 65k wk npm (still!) · Apache-2.0
- **Looked at:** not screenshotted — excluded from the shot list once maintenance status disqualified it.
- **Vibecode risk:** high — its bubble-menu-plus-slash-menu look is one of the most-cloned surfaces of the last three years.
- **Link:** https://novel.sh/

### LiteGraph.js — `reference-only`
- **What:** Canvas2D node-graph engine and editor, Blueprints/Pure Data style.
- **Verdict:** The upstream repo has not been pushed since 2024-08-01 — over two years. It survives because ComfyUI vendored and forked it (Comfy-Org/litegraph.js, last push 2026-01-14, ★253), so in practice "LiteGraph" today means Comfy's fork, not jagenjo's. If you're not inside the Comfy ecosystem there is no reason to start here.
- **Use when:** working inside ComfyUI. · **Don't use when:** anything else — React Flow.
- **Scores /5:** visual 2 · interaction 3 · a11y 1 · engineering 3 · maintenance 1 · docs 2 · customization 3 · perf 3 · stability 2 · originality 4
- **Evidence:** ★8,132 · last push 2024-08-01 (25 months) · MIT · Comfy-Org fork ★253, last push 2026-01-14
- **Looked at:** not screenshotted.
- **Vibecode risk:** medium.
- **Link:** https://github.com/jagenjo/litegraph.js

## Rejected / avoid
- **Motion Canvas** — Abandoned. Last stable release v3.17.2 in December 2024, one alpha in February 2025, exactly one commit to the repo since June 2026, ~2.4k weekly npm downloads against 19k stars, and motioncanvas.io reported returning NXDOMAIN. A community fork has been discussed but I could not verify an active successor repo. Do not start a project on it.
- **Novel** — see scorecard. Stale since January 2025 and still widely recommended; that gap is the danger.
- **Quill** — Its own document model (Delta) is flat, which makes tables, nesting and structured blocks fight the architecture rather than fit it. Anything Quill can do, Tiptap does with a model that survives contact with real requirements.
- **Draft.js** — Meta deprecated it in favour of Lexical. Any tutorial recommending it is pre-2022.
- **TinyMCE / CKEditor** — Still the top hits for "best rich text editor" and still the wrong answer for a modern product: iframe-based or heavily-chromed surfaces, GPL-or-commercial licensing, and a toolbar-first design language that will never match your app. They exist to make a `<textarea>` into Microsoft Word, which is not the brief.
- **Rolling your own on raw `contenteditable`** — Every library here exists because of Android IME composition, Safari selection quirks, and paste sanitisation. You will rediscover all three.

## What surprised me
- **ProseMirror and CodeMirror left GitHub entirely.** Every repo in both orgs was archived on 2026-04-01 and 2026-04-15 respectively, with development moved to code.haverbeke.berlin. Both are still publishing (`prosemirror-view` 1.42.3 in Aug 2026; `@codemirror/view` 6.43.11 in Sept 2026). Any dependency-health tool reading GitHub will flag your most reliable dependencies as abandoned. They are not.
- **The Tiptap paywall complaint is out of date.** Ten formerly-Pro extensions — drag handle, table of contents, unique ID, file handler, emoji, mathematics, invisible characters and more — are MIT on public npm as of June 2026. I verified each one's license field directly. Half the comparison content still online is arguing against a pricing model that no longer exists.
- **Haverbeke shipped a new editor from scratch in July 2026.** Wordgard 0.1 — not ProseMirror 2.0, deliberately — applies the CodeMirror 6 architecture to rich text and uses central-server OT rather than ProseMirror's collab scheme. Almost nobody has noticed, and it isn't on GitHub so it won't show up in any trending list.
- **BlockNote quietly moved collaboration and comments into the free MPL core.** The paid GPL/commercial line is now only AI, multi-column layout and PDF/DOCX/ODT export at $195/mo. That is a better free tier than Tiptap's for a collaborative block editor, which is not what its relative star counts would suggest.
- **Excalidraw's npm package and Excalidraw's repo move at completely different speeds.** 30 commits since June 2026, but the embeddable `@excalidraw/excalidraw` shipped 0.18.0 in March 2025 and 0.18.1 in April 2026 — one release a year. Repo activity is a bad proxy for SDK health when the app and the SDK live in the same monorepo.
- **React Flow Pro gates zero code.** $169–$289/mo buys examples, templates and support on a library that is MIT and stated to stay MIT. tldraw's LICENSE.md, by contrast, requires a production license key and watermarks the free tier. Two libraries with near-identical star counts and opposite commercial models — and the one that looks like the polished "free" open-source choice is the one that will invoice you.

## Open questions
- **Tiptap's named customers.** The homepage logo strip appeared to show Figma, Lovable and PagerDuty, but it was clipped at 390px and I could not read it fully. Would be settled by a desktop capture of that section or a published case study page.
- **tldraw commercial pricing.** Quote-only; no public number. Settled by requesting a quote, which I could not do.
- **Konva's production users.** The site claims Meta, Microsoft, Polotno, Labelbox and Zazzle. Unverified — that's a vendor logo strip, and only a public engineering post or a visible bundle would confirm any of them.
- **Whether a Motion Canvas successor is actually maintained.** "Canvas Commons" is referenced in community discussion but GitHub search surfaced only a 49-star personal repo last pushed in 2024. Settled by an official announcement or an active fork with real release cadence.
- **Lexical's path to 1.0.** Five years and 0.50.0. No public roadmap commitment found. Settled by a Meta statement or a 1.0 RC.
- **Fabric.js and Mermaid visual scores.** Both were scored from repo evidence and secondhand comparison rather than a screenshot I viewed; fabricjs.com failed to capture in this run. Their visual/interaction numbers should be treated as provisional.
