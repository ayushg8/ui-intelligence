# Headless / Unstyled Component Primitives

**Evaluated:** 2026-09 · **Researcher note:** The React lane flipped this year. Base UI — written largely by the people who wrote Radix, plus the Floating UI author — hit 1.0 in Dec 2025, is on 1.8.0, and became shadcn/ui's default primitive layer in July 2026; Radix has not landed a commit since 2026-07-31 and closed zero issues in the last 30 days against 347 open. Everything else has settled into per-framework monopolies (Reka for Vue, Bits for Svelte, Kobalte for Solid), and no meaningful new entrant appeared in 2026. The gap left open: nothing good exists for HTML-first stacks (Astro/Rails/Django) except one 61-star experiment.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Base UI | `essential` | The Radix authors' second attempt, now the default React primitive layer; ships zero CSS and zero opinions. | low |
| React Aria Components | `essential` | The only library where a11y and i18n are the product, not a feature list; heaviest API, deepest correctness. | low |
| Reka UI | `essential` | Settled default for Vue, and Nuxt UI's foundation — no real competitor left. | low |
| Bits UI | `essential` | Svelte's answer, and the best-documented escape hatches of anything here. | low |
| Radix Primitives | `strong` | Still fine code with a huge install base, but the work has moved elsewhere. Safe to keep, wrong to start on. | medium |
| Ark UI | `strong` | Widest component surface and the only real cross-framework story; docs are built for agents. | low |
| Ariakit | `strong` | The most composable model in the category; nine years old and still 0.x. | low |
| Kobalte | `strong` | Solid's default, with per-component APG citations most libraries don't bother with. | low |
| Angular Primitives | `situational` | Angular finally has a real headless layer; directive-based, small but serious. | low |
| Zag.js | `situational` | The state machines under Ark UI. Use directly only if you're building a library. | low |
| Corvu | `situational` | Solid drawer/resizable that Kobalte lacks; six contributors. | low |
| data-slot | `experimental` | Radix-shaped primitives driven by HTML attributes, for stacks with no framework. | low |
| Headless UI | `reference-only` | 28.7k stars, sixteen components, no release since April 2026. | medium |
| Melt UI | `avoid` | Dead. Legacy package unreleased since March 2025; the rewrite has 5k weekly downloads. | — |
| @mui/base | `avoid` | Superseded by Base UI; 3.4M weekly downloads is inertia, not endorsement. | — |

## Recommendations by need
- **Default choice:** Base UI, for any new React project. It is the maintained one, it is what shadcn/ui installs by default now, and the API is Radix's lessons applied a second time.
- **Best engineering:** React Aria / React Aria Components. 530 contributors, Apache-2.0, a separate `@internationalized/*` layer for dates and numbers, and behaviour split cleanly across `react-aria` (interactions) / `react-stately` (state) / `react-aria-components` (assembled).
- **Best accessibility:** React Aria Components, not close. Kobalte is the runner-up and the only other library that cites the specific WAI-ARIA pattern per component on the page.
- **Most customizable / least house-style:** Base UI and Ariakit. Base UI ships no CSS at all; Ariakit lets you re-render any part as any element and compose state stores across components.
- **Lightest:** Corvu and data-slot, both per-primitive packages. Radix publishes a per-component size in its docs (26.34 kB for `dropdown-menu`) — useful, and no one else does it.
- **Promising newcomer:** data-slot — attribute-driven headless primitives with zero dependencies, for Astro/11ty/server-rendered templates. 19 primitives, ~700 weekly downloads. Too young to depend on.
- **Premium/paid worth it:** none. Ariakit Plus and Ark UI Plus exist; neither gates behaviour or a11y you need.

## Scorecards

### Base UI — `essential`
- **What:** Unstyled React primitives from the creators of Radix, Floating UI and Material UI, published as `@base-ui/react`.
- **Verdict:** This is the rare case where the successor genuinely supersedes. The people who learned Radix's API mistakes got a second run at it with full-time MUI funding, and the result covers more ground (Autocomplete, Combobox, Drawer, Meter, Navigation Menu, Number Field, OTP Field, Preview Card, Scroll Area, Toolbar) with tighter part naming. It closed 45 issues in the last 30 days while Radix closed zero. The one honest caveat is age: 1.0 shipped Dec 2025, so the long tail of weird-browser bugs is still being found, and 435 open issues reflects both scrutiny and youth.
- **Use when:** Any new React app or design system in 2026. · **Don't use when:** You need a framework other than React, or you have a large existing Radix surface where a partial migration would leave two focus-management systems fighting.
- **Scores /5:** visual 3 · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 4 · stability 4 · originality 4
- **Evidence:** ★10,869 · last release v1.8.0 2026-09-04 · last push 2026-09-09 · 10,994,876 wk npm (`@base-ui/react`) · 319 contributors · MIT · 435 open issues · used by shadcn/ui (default since July 2026, verified in their changelog)
- **Looked at:** https://base-ui.com/react/components/select — the Select demo renders as a near-native control: 1px border, ~4px radius, a tiny stacked-chevron pair, no shadow, no accent colour. That restraint is the point; the library has no look to inherit. Docs are three-column with a "View as Markdown" affordance next to "View source", and the Usage guidelines are prescriptive in a way most primitive docs aren't ("Prefer Combobox for large lists", "Form controls must have an accessible name"). At 390px the docs collapse cleanly but the demo's code-tab strip clips its "CSS Modules" dropdown off the right edge — a docs bug, not a library one.
- **Vibecode risk:** low — it ships literally no styles, so nothing about a Base UI app is visually identifiable. The risk lives one layer up in whatever shadcn theme gets pasted over it.
- **Link:** https://base-ui.com

### React Aria Components — `essential`
- **What:** Adobe's accessibility and interaction layer. `react-aria` (hooks), `react-stately` (state), `react-aria-components` (pre-assembled components), `@internationalized/*` (dates, numbers, strings).
- **Verdict:** Nothing else in this category is in the same conversation on rigour. Adobe ships it into their own products, tests against real screen readers, handles 40+ calendar systems and RTL properly, and has adaptive pointer/touch/keyboard interaction handling that the others approximate. The cost is real: RAC is the ergonomic wrapper, and the moment you step outside it you are back in prop-collection-spreading land, which is the most verbose API here. It is also the heaviest — `react-aria` alone is 7.6M weekly downloads' worth of interaction code, and you feel it.
- **Use when:** Enterprise, government, regulated, or genuinely international products; anything where a WCAG audit is a gate. · **Don't use when:** You want a small bundle, a small API surface, or you're shipping a marketing site.
- **Scores /5:** visual 3 · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 3 · stability 5 · originality 5
- **Evidence:** ★15,860 · last release react-aria-components@1.21.0 2026-09-04 · last push 2026-09-10 · 3,520,784 wk npm (`react-aria-components`), 7,614,682 (`react-aria`), 7,645,711 (`react-stately`) · 530 contributors · Apache-2.0 · 594 open issues · 40 issues closed in the last 30 days · used by Adobe (React Spectrum ships on it)
- **Looked at:** https://react-spectrum.adobe.com/react-aria/components.html — pale lavender-to-peach gradient wash, large humanist type, and below the fold an annotated macOS-window mock with leader lines labelling SearchField / Table / Popover / Tooltip / Modal / Menu on a plant-catalogue UI. That diagram is the single best explanatory device on any site in this category: it teaches the mental model before you read a word of API. Secondary CTA is a flat grey pill, no faux-depth. The mismatch is that it markets like a product site for what is fundamentally a hooks library.
- **Vibecode risk:** low — no default styling, and Adobe's own Spectrum look ships separately.
- **Link:** https://react-spectrum.adobe.com/react-aria/

### Reka UI — `essential`
- **What:** Vue headless primitives, formerly Radix Vue, renamed in 2025.
- **Verdict:** The Vue lane is settled and this is what settled it — Nuxt UI is built on top of it, which means most Vue teams already depend on it transitively. Coverage has grown past Radix parity into colour pickers, tags input, pin input and a Virtualizer part on Combobox, which matters for large lists. The caveat visible right in the sidebar is how much of the new surface carries Alpha badges (Autocomplete, Rating, the entire Color group) — the mature core is solid, the frontier is not. 320 open issues on 260 contributors is a lot of surface to hold.
- **Use when:** Any Vue or Nuxt project needing unstyled primitives. · **Don't use when:** You need the Alpha-badged components in production.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 4 · originality 3
- **Evidence:** ★6,783 · last release v2.10.4 2026-08-25 · last push 2026-09-09 · 1,642,696 wk npm (plus 1,174,827 still on the old `radix-vue` name) · 260 contributors · MIT · 320 open issues · used by Nuxt UI (verified: Nuxt UI is built on Reka UI)
- **Looked at:** https://reka-ui.com/docs/components/combobox — near-black docs with an emerald radial wash bleeding down from the top nav. The Combobox demo is the weakest of the ten I looked at: a small white rounded input floating dead-centre in a ~550px-tall empty dark panel, so the one thing you came to see reads as an unstyled afterthought in a sea of negative space. Docs themselves are good — "Copy as Markdown" and "Download as Markdown" buttons, and the API reference exposes `Virtualizer` as a first-class part.
- **Vibecode risk:** low — unstyled. Reka apps that look alike look alike because of Nuxt UI's theme, not Reka.
- **Link:** https://reka-ui.com

### Bits UI — `essential`
- **What:** Svelte 5 headless primitives by huntabyte, the base layer under shadcn-svelte.
- **Verdict:** Svelte's best option and it is not close, given Melt UI stopped. What raises it above "the only one left" is the documentation: the Select page's table of contents covers "Opt-out of Floating UI", "Custom Anchor", "Native Scrolling/Overflow", "Scroll Lock", "Custom Scroll Delay" and "Styling Highlighted Items". Documented escape hatches at that granularity are a direct signal that the maintainer has hit these walls in real products. The risk is concentration — 3.5k stars and one dominant maintainer against Reka's 260-contributor spread.
- **Use when:** Any Svelte 5 project. · **Don't use when:** You're still on Svelte 4 (that's the `1.0.0-next` line, and it's a dead end).
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 5 · customization 5 · perf 4 · stability 4 · originality 3
- **Evidence:** ★3,542 · last release bits-ui@2.19.2 2026-09-09 · last push 2026-09-09 · 901,314 wk npm · 117 contributors · MIT · 73 open issues
- **Looked at:** https://bits-ui.com/docs/components/select — light grey demo panel, a "Select a theme" trigger with a palette glyph and stacked chevrons, ~8px radius, a soft 1px border and no drop shadow. Reads like a real product control rather than a showcase piece. The left nav is the tell: before any component you get Child Snippet, Ref, Transitions, Styling, Dates, State Management, Figma, Migration Guide and a dedicated LLMs page. That's a conceptual curriculum, not an API dump.
- **Vibecode risk:** low — unstyled.
- **Link:** https://bits-ui.com

### Radix Primitives — `strong`
- **What:** The React primitives that defined the category, now maintained by WorkOS after Modulz wound down.
- **Verdict:** Separate the code from the project. The code is still excellent and battle-hardened across five years and tens of millions of installs. The project is not where the work is: 217 commits landed in 2026, all of them between April and July, and the last one was 2026-07-31 — nothing in the six weeks since, zero issues closed in 30 days, 347 open. WorkOS did fund a real revival, several original maintainers left, and the cadence reflects that. Keeping an existing Radix app on Radix is fine and shadcn still ships every component for both. Starting a new one on Radix in September 2026 is choosing the library that stopped.
- **Use when:** You already have a large Radix surface, or a dependency pins it. · **Don't use when:** Greenfield React. Pick Base UI.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 5 · maintenance 2 · docs 4 · customization 5 · perf 4 · stability 5 · originality 5
- **Evidence:** ★19,253 · `radix-ui` 1.6.7 published 2026-07-24 · last push 2026-08-08, last substantive commit 2026-07-31 · 11,829,305 wk npm (`radix-ui`), 48,282,651 (`@radix-ui/react-dialog`, mostly transitive) · 107 contributors · MIT · 347 open issues, 0 closed in the last 30 days
- **Looked at:** https://www.radix-ui.com/primitives/docs/components/dropdown-menu — "Made by WorkOS" sits in the masthead lock-up, confirming the ownership story. The component demo is that indigo-to-violet gradient panel with a single white circular trigger floating in it: the most-imitated visual cliché this ecosystem produced, and you still see its descendants in every AI-generated landing page. To Radix's credit, each component page prints "Version: 2.1.21 / Size: 26.34 kB" — nobody else publishes per-component weight, and it's genuinely useful.
- **Vibecode risk:** medium — the library itself ships no styles, but an agent told "use Radix" reaches for the shadcn default theme by reflex, and that theme is now the single most recognisable look on the web.
- **Link:** https://www.radix-ui.com/primitives

### Ark UI — `strong`
- **What:** Chakra team's headless component library, built on Zag.js state machines, shipping for React, Vue, Solid and Svelte from one core.
- **Verdict:** The widest component surface in the category by a distance — Angle Slider, Carousel, Clipboard, Color Picker, Date Input, Editable, Tree Collection, Async List, plus collection primitives none of the others attempt. If you need a colour picker or a tree view and don't want to hand-build it, this is the answer. Two caveats. First, framework parity is nominal: React is 903k weekly downloads, Solid 30k, Vue 22k, Svelte 6.7k — the non-React targets are real but thinly exercised. Second, the state-machine architecture is a genuine trade: predictable and testable, but debugging a machine transition is a different skill from reading React state.
- **Use when:** You need exotic components, or you genuinely ship the same design system to two frameworks. · **Don't use when:** You're React-only and only need the common twenty components — Base UI is lighter and more idiomatic.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 3 · stability 4 · originality 4
- **Evidence:** ★5,382 · last release @ark-ui/react 5.39.1 2026-08-28 · last push 2026-09-09 · 903,004 wk npm (React) · 96 contributors · MIT · only 11 open issues, which is the lowest ratio here by far
- **Looked at:** https://ark-ui.com/react/docs/components/date-picker — the left nav opens with an "AI For Agents" section containing MCP Server and LLMs.txt, placed *above* the component list, plus a "Copy Page" button in the header. No other library in this set treats agent consumption as a first-class docs surface. The Date Picker demo is almost aggressively plain (bare mm/dd/yyyy input, bordered icon button, no shadow); the anatomy diagram below it is a dark maroon panel with dashed part callouts, which is unusual-looking but reads instantly. Support-chat bubble bottom-right — they sell Ark UI Plus.
- **Vibecode risk:** low — unstyled.
- **Link:** https://ark-ui.com

### Ariakit — `strong`
- **What:** Diego Haz's composable React primitives, in development since 2017 (as Reakit).
- **Verdict:** The most intellectually serious composition model in the category. Ariakit exposes state stores you can create, share and cross-wire between components, and every part re-renders as any element you hand it — you can build things here that Radix and Base UI's fixed part hierarchies won't let you express. The example library is the real asset: not "here's a dialog" but "Checkbox as a button element while staying accessible", "Combobox filtering using React.startTransition", "CustomCheckbox via VisuallyHidden". That's teaching composition and edge cases. The mark against it is that after nine years it is still `0.4.39`, semver-wise pre-1.0, which is a genuine consideration for a foundational dependency even though it has been stable in practice.
- **Use when:** You're building a design system with unusual composition requirements, or you need a component shape the part-based libraries can't express. · **Don't use when:** The team wants a conventional Root/Trigger/Content API they already know.
- **Scores /5:** visual 3 · interaction 5 · a11y 5 · engineering 5 · maintenance 4 · docs 5 · customization 5 · perf 4 · stability 3 · originality 5
- **Evidence:** ★8,608 · last release @ariakit/react 0.4.39 2026-09-02 · last push 2026-09-10 · 1,102,021 wk npm · 126 contributors · MIT (per package manifest; GitHub's license API returns null for the repo) · 43 open issues
- **Looked at:** https://ariakit.org/examples — the plainest site of the ten: heavy near-black grotesque headings on white, no gradient, no card shadows, thumbnails that are literal cropped screenshots of the widget on a flat grey square. It looks like documentation from someone who does not care about marketing, and the granularity of the example titles is the substance. Version pill reads v0.4.39; "Unlock Ariakit Plus" sits top-right.
- **Vibecode risk:** low — unstyled, and its default focus-ring blue is the only visual fingerprint.
- **Link:** https://ariakit.org

### Kobalte — `strong`
- **What:** SolidJS headless primitives, `@kobalte/core`.
- **Verdict:** Solid's default and a well-built one. It is the only library besides React Aria that cites the specific WAI-ARIA pattern per component in the page header, and its feature lists name things the others leave implicit — "browser autofill integration via a hidden native `<select>` element", "typeahead even without opening the listbox", "tab stop focus management". That is a maintainer who read the APG rather than copying an implementation. Two flags: still `0.13.14` with a `2.0.0-alpha` in flight, and 126 open issues against 51 contributors is a thin ratio.
- **Use when:** Any SolidJS project. · **Don't use when:** You need a drawer or resizable panel — pair Corvu for those.
- **Scores /5:** visual 3 · interaction 4 · a11y 5 · engineering 4 · maintenance 4 · docs 4 · customization 5 · perf 5 · stability 3 · originality 3
- **Evidence:** ★1,851 · last release @kobalte/core 0.13.14 2026-09-07 (2.0.0-alpha.2 same week) · last push 2026-09-07 · 445,551 wk npm · 51 contributors · MIT · 126 open issues
- **Looked at:** https://kobalte.dev/docs/core/components/select — sober light docs that put no demo above the fold at all; you get metadata pills ("Since v0.1.0", package name, Source, and a W3C badge linking the WAI-ARIA Listbox pattern), then straight into Import and a long explicit Features list. Un-showy to a fault, but the W3C badge per component is a rigour signal I saw nowhere else outside Adobe. Sidebar carries a full colour suite (Color Area, Color Channel Field, Color Field, Color Slider, Color Swatch) that outstrips Radix.
- **Vibecode risk:** low — unstyled.
- **Link:** https://kobalte.dev

### Angular Primitives (ng-primitives) — `situational`
- **What:** Headless, signals-first primitives for Angular, published as `ng-primitives`.
- **Verdict:** Angular spent the whole headless era with nothing credible, and this is the first project that closes the gap properly. Crucially it is not a React port with Angular syntax bolted on — the API is directive composition (`NgpSelect`, `NgpSelectDropdown`, `NgpSelectPortal`, `NgpSelectOption`) and it ships CLI schematics, which is how Angular teams actually expect to consume things. The reason it's situational rather than strong is scale: 595 stars and 24.6k weekly downloads means you will be an early adopter with few Stack Overflow answers behind you. The competing `@radix-ng/primitives` is a tenth the size at 1.2k weekly downloads and should not be preferred.
- **Use when:** Angular, and you want to own your CSS. · **Don't use when:** You need a large ecosystem of prior art around the library.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 3 · originality 4
- **Evidence:** ★595 · last push 2026-09-09 · 24,581 wk npm · Apache-2.0 · repo created 2022-09
- **Looked at:** https://angularprimitives.com/primitives/select — docs quality is genuinely level with the React leaders, which surprised me: Preview/Source toggle, an "Example CSS" dropdown so you can see the styling separately, and a TOC covering Schematics, Virtualized Large Lists and Custom Option Behavior. `llms.txt` and `MCP` sit in the Getting Started nav. The Select demo is a plain rounded trigger with a single chevron, Angular-red accent on the section eyebrow.
- **Vibecode risk:** low — unstyled.
- **Link:** https://angularprimitives.com

### Zag.js — `situational`
- **What:** Framework-agnostic finite state machines for UI components; the engine under Ark UI.
- **Verdict:** Correct choice only if you are building a component library yourself, or shipping the same behaviour into React, Vue and Solid from one codebase and want to own the render layer entirely. For product work it is a layer too low — you write all the prop spreading Ark UI already wrote for you. Actively developed (2.0 is in `next`), but the docs carry a maintenance smell: the introduction page still pins a "The Future of Chakra UI — LIVE — February 26th at 6am PT" event card long after the fact.
- **Use when:** Building a design system's own primitive layer across frameworks. · **Don't use when:** You're building an app — use Ark UI instead.
- **Scores /5:** visual 2 · interaction 4 · a11y 4 · engineering 5 · maintenance 4 · docs 4 · customization 5 · perf 3 · stability 4 · originality 5
- **Evidence:** ★5,204 · last release @zag-js/dialog 1.43.3 2026-08-20 (2.0.0-next.2 2026-08-31) · last push 2026-09-10 · 1,057,604 wk npm (`@zag-js/dialog`) · 128 contributors · MIT · 26 open issues
- **Looked at:** https://zagjs.com/overview/introduction — light docs with a framework switcher (React/Solid/Vue) pinned at the top of the sidebar and an LLMs.txt entry in the overview. Guides are titled "Building Machines" and "Framework Adapters", which is an honest signal about what this actually is. Sidebar shows Angle Slider, Carousel, Cascade Select (Beta).
- **Vibecode risk:** low.
- **Link:** https://zagjs.com

### Corvu — `situational`
- **What:** SolidJS primitives, per-component packages under `@corvu/*`.
- **Verdict:** Worth knowing specifically because it has Drawer and Resizable, which Kobalte does not, and its dialog handles the thing most implementations get wrong ("waits for pending animations before removing the dialog from the DOM"). But this is a six-contributor project and the release picture is uneven — the core primitives last shipped in early-to-mid 2025 while only the standalone utility packages have moved in 2026. Treat it as a targeted supplement to Kobalte, not a foundation.
- **Use when:** Solid, and you need a drawer, resizable panel or OTP field. · **Don't use when:** It would be your only primitive dependency.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 3 · docs 4 · customization 5 · perf 5 · stability 3 · originality 3
- **Evidence:** ★722 · last push 2026-08-24 · last tagged release solid-prevent-scroll@0.1.11 2026-07-31; `@corvu/resizable` last tagged 2025-05-04 · 93,898 wk npm (`@corvu/dialog`) · 6 contributors · MIT · 14 open issues
- **Looked at:** https://corvu.dev/docs/primitives/dialog/ — lavender dot-grid background, chunky rounded geometric sans, a solid-purple demo panel with a single white "Open Dialog" button. Feature bullets use a purple flame emoji as the list marker, which is twee, but the bullets themselves are substantive (modal and non-modal modes, customizable focus management, nested dialogs). Per-primitive version pills (0.2.4) are an honest touch.
- **Vibecode risk:** low.
- **Link:** https://corvu.dev

### data-slot — `experimental`
- **What:** Headless primitives for vanilla JavaScript, driven by `data-slot` HTML attributes. Zero dependencies. From Bejamas.
- **Verdict:** This is the only project addressing a real, unserved hole: Astro, 11ty, Rails, Django and plain-HTML stacks have had nothing that isn't "install React for a dropdown". You write `<div data-slot="tabs">` in markup and call `create()`; it auto-discovers and binds, returning controllers for programmatic use. Nineteen primitives, Radix-shaped naming, tree-shakeable per-package. It is also 61 stars and ~700 weekly downloads at v0.2.x, so the a11y claims are unaudited by anyone but the authors. Use it on a side surface; do not put a checkout flow on it.
- **Use when:** Server-rendered or static HTML with no framework, and you'd otherwise hand-roll a menu. · **Don't use when:** Anything load-bearing, or where you need a11y you can point an auditor at.
- **Scores /5:** visual 2 · interaction 3 · a11y 3 · engineering 4 · maintenance 4 · docs 3 · customization 5 · perf 5 · stability 2 · originality 5
- **Evidence:** ★61 · created 2026-01-07 · last push 2026-09-09 · last tagged release v0.2.166 2026-04-02 · 745 wk npm (`@data-slot/dialog`) · MIT · 19 primitive packages (accordion, alert-dialog, collapsible, combobox, command, dialog, dropdown-menu, hover-card, navigation-menu, popover, radio-group, select, slider, switch, tabs, toggle, toggle-group, tooltip, core)
- **Looked at:** README and package layout only — not screenshotted; no hosted demo site found.
- **Vibecode risk:** low.
- **Link:** https://github.com/bejamas/data-slot

### Headless UI — `reference-only`
- **What:** Tailwind Labs' unstyled React and Vue components.
- **Verdict:** Reputation and reality have separated. 28.7k stars makes it the most-starred project in this category and it is the one an under-informed agent reaches for, but it shipped four commits in all of 2026 (all in April), has released nothing since 2.2.10 on 2026-04-07, and closed zero issues in the last 30 days against 110 open. The component set was always the narrow part: sixteen components, no date picker, no slider, no tooltip, no accordion beyond Disclosure, no toast, no context menu, no navigation menu. Anything real needs a second library alongside it, which defeats the purpose. Study its API — it is genuinely the most approachable in the category — but do not start on it.
- **Use when:** Maintaining something that already uses it. · **Don't use when:** New work of any kind.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 1 · docs 4 · customization 4 · perf 4 · stability 4 · originality 2
- **Evidence:** ★28,742 · last release @headlessui/react 2.2.10 2026-04-07 · last push 2026-04-13 · 6,413,010 wk npm (React), 1,175,284 (Vue) · 75 contributors · MIT · 110 open issues, 0 closed in the last 30 days
- **Looked at:** https://headlessui.com/react/combobox — near-black docs with a blue/violet aurora glow bleeding in from the top corners, a dark combobox trigger with an open menu and a checkmark on the selected row. Well-crafted page. Two staleness tells visible on it: the header version selector reads "v2.1" while npm is on 2.2.10, and the examples TOC still says "Animating with Framer Motion" — a product name retired in 2024.
- **Vibecode risk:** medium — not from the library, which is unstyled, but because it is glued to Tailwind UI's paid component look, and code copied from that source is instantly recognisable.
- **Link:** https://headlessui.com

## Rejected / avoid
- **Melt UI** — Dead. `@melt-ui/svelte` last released 2025-03-28 and the repo has one commit since June 2025 (2025-09-30); it still pulls 127k weekly downloads purely on inertia. The Svelte 5 rewrite (`melt`, 0.44.0, last published 2026-01-04) has 5,007 weekly downloads against Bits UI's 901,314 — the ecosystem voted. Do not start anything on either.
- **@mui/base** — Superseded by Base UI and frozen at `5.0.0-beta.70` since 2025-03-17, yet still doing 3.4M weekly downloads through legacy MUI installs. If an agent sees this in a dependency tree, that's a migration signal, not an endorsement.
- **@radix-ng/primitives** — A Radix port for Angular at 1,236 weekly downloads. Angular Primitives is a better-built project at 20x the usage; there is no reason to pick this one.
- **`radix-vue`** — The pre-rename package name, still pulling 1.17M weekly downloads. It is Reka UI. Install `reka-ui`; anything writing `radix-vue` in 2026 is copying stale material.
- **Starting new React work on Radix Primitives** — not a rejection of the library, a rejection of the decision. See its scorecard.

## What surprised me
- **Radix has closed zero issues in the last 30 days**, against 347 open, and its last substantive commit was 2026-07-31. The WorkOS revival was real — 217 commits landed between April and July 2026 — and then it stopped again. Meanwhile Base UI closed 45 and React Spectrum closed 40 in the same window. The maintenance gap is not a vibe, it's a countable difference.
- **Base UI is now essentially the same size as Radix by installs.** `@base-ui/react` does 10,994,876 weekly downloads against `radix-ui`'s 11,829,305 — from a 1.0 that shipped in December 2025. The 48M on `@radix-ui/react-dialog` is transitive dependency weight, not new adoption, and it obscures how fast the flip happened.
- **Ark UI and Angular Primitives put agent tooling in their primary navigation** — MCP server endpoints and `llms.txt` listed above the component list, not buried in a footer. Base UI, Reka and Bits all ship "copy as Markdown". Docs are being written for us now, and that is a legitimate tiebreaker when two libraries are otherwise close.
- **Melt UI died and almost nobody noticed** — 4.2k stars, 127k weekly downloads still flowing to a package unreleased since March 2025, while its own Svelte 5 successor sits at 5k. It is the clearest example in this category of downloads measuring inertia rather than health.
- **Ariakit has been in development since 2017 and is still on 0.4.x.** Nine years, 1.1M weekly downloads, MIT, arguably the best composition model here — and semantically still pre-release. The version number is a poor proxy for maturity in both directions in this category.
- **Angular got a serious headless library and it's good.** ng-primitives' docs are on par with the React leaders, ship CLI schematics, and the API is directive composition rather than a React port. It just has almost no users yet (24.6k weekly).

## Open questions
- **Radix's intent.** Is the six-week silence a summer lull, a maintainer transition, or the start of maintenance-only? WorkOS has made no public statement I could find. What would settle it: a commit or release in the next 60 days, or an explicit roadmap post from WorkOS.
- **Base UI's non-React future.** The repo describes itself framework-agnostically but only `@base-ui/react` ships. Unverified whether Vue/Svelte targets are planned — an official statement or a package in the monorepo would settle it.
- **Ark UI's non-React parity in practice.** React is 903k weekly, Svelte 6.7k. Whether the Svelte and Vue adapters are equally bug-free is not something download counts or issue counts can answer; it would take building the same component set on two adapters and comparing.
- **Real-world usage claims.** I verified shadcn/ui defaults to Base UI (their own changelog) and that Nuxt UI is built on Reka UI. Every other "used by <company>" claim circulating about these libraries I could not verify from a primary source and have deliberately left out.
- **Screen-reader behaviour.** Every library here claims APG conformance; only React Aria and Kobalte cite the specific pattern per component. Actually ranking them would require NVDA/JAWS/VoiceOver testing of matched components, which I did not do — the a11y scores above reflect documented rigour and architecture, not measured screen-reader output.
