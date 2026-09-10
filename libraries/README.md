# Libraries — ranked verdicts

**Evaluated:** 2026-09 · Three things actually moved this year. **(1) The React primitive layer changed
hands.** Base UI — the Radix authors' second attempt — hit 1.0 in Dec 2025, is on 1.8.0 at 11.0M wk npm,
and became shadcn/ui's default primitive in July 2026; Radix has closed exactly one issue since
2026-07-31 while taking nine. **(2) shadcn stopped being a component library and became a package index
for design languages** — 294 third-party registries with health scores, 26 `style` values across three
primitive families (Base UI / React Aria / Radix) — and its visual fingerprint went cross-framework, into
Svelte, plain HTML, Angular, Vue and React Native. **(3) The platform absorbed the cheap half of the job.**
`<dialog>`, the Popover API, `@starting-style`, `linear()`, same-document View Transitions,
`field-sizing: content`, `:has()`, container queries and subgrid are all Baseline; anchor positioning is
not, which is why `@floating-ui/dom` still does 66.8M wk. What an agent should take from this: **install
fewer things and spend the time on tokens instead.** The libraries are not the problem. The defaults are.

---

## How to read this

| Tier | Means |
|---|---|
| `essential` | The category's correct default. Install it, or decide against it deliberately and say why. |
| `strong` | Right answer for a named situation, with no reservations about its health. |
| `situational` | Correct only under a stated condition — a framework, a licence, an existing stack. |
| `experimental` | Real and promising; too young or too thin to be load-bearing. |
| `reference-only` | Read it, don't install it. The thinking is worth stealing; the dependency is dead, gated or legally unusable. |
| `avoid` | Don't start here. Sometimes because it's dead, sometimes because it's alive and wrong. |

**The vibecode-risk column** does *not* mean "does this ship CSS" — that makes every headless library `low` by
definition and makes the column useless. It answers one question: **what does an agent actually emit when told
"use X"?** That tracks which copy-paste kit has colonised the library, not the library's own output. `low`
usually means *nothing has colonised it yet* — often because the library is small — not that it protects you.
Read it against the distribution model: `high` on a copy-in system (shadcn, Untitled UI, Basecoat) is a to-do
list, because every token is in a file you own; `high` on an npm-installed system (HeroUI, Ant, MUI, Vuetify) is
a permanent property of the product you ship.

**Engineering quality and design quality are independent axes, and this file keeps them apart on purpose.** React
Aria Components is the most rigorous code in this document and produces nothing at all until you draw it. HeroUI
v3 has the best out-of-box polish here and it is one finished aesthetic you cannot escape. *"Technically
excellent, visually generic without heavy customization"* is a complete verdict, not a hedge — and so is
*"beautiful, and you will be wearing someone else's brand."*

**How to choose** is not in this file. The decision procedure — platform-first, headless vs styled, the health
checks, and the seven default overrides to make in the first five minutes — is
[`../system/4-stack.md`](../system/4-stack.md). Read that; use this for the verdicts.

---

## Start here: the default stack

Twenty options is not an answer. These are.

**A new React product, 2026.** **Base UI** (`@base-ui/react`) for primitives — maintained, zero CSS, and what
shadcn installs now. **Tailwind v4** for styling, with `@theme` replaced on day one, never the stock ramp.
**shadcn/ui** for component vocabulary, with radius, neutral ramp, density and card usage changed before the
first feature. **TanStack Table v9 + TanStack Virtual** rendered into your own `<table>` markup — it ships zero
pixels, which is the point. **shadcn charts on Recharts v3**, with `monotone` swapped for linear and the y-axis
restored; **Observable Plot** when the chart *is* the product. **React Hook Form + Zod 4 + Base UI `Field`** for
forms — three libraries, no house style, every piece swappable via Standard Schema. **Native CSS motion** first,
`Element.animate()` second, **Motion** (`motion/react`, not `framer-motion`) only for shared layout, exit
animation or an interruptible spring. **Lucide** at stroke 1.5 and size 18 so it isn't the stock look —
**Phosphor** if the icon set has to carry brand. A **self-hosted OFL variable face** via `next/font/local`, with
`tabular-nums` on every number in a table — and not Inter or Geist by reflex, because both now read as a stack
choice rather than a type choice.

**A Vue product.** **Reka UI** for primitives (1.64M wk — the largest non-React component library in this
corpus). **Nuxt UI v4** if you want the kit: Pro merged into the free MIT package after NuxtLabs joined Vercel,
125+ components and a Figma kit for $0 — but retheme it; its defaults are the Vue dialect of the same generic
look. **`motion-v`**, not `@vueuse/motion` (unpushed since 2025-03). **VeeValidate** for form state. **`virtua`**
for virtualization. **ECharts** for charts — `vue-chrts`/Nuxt Charts is prettier and inherits Tremor's tell.

**A Svelte product.** **Bits UI** for primitives (901k wk, weekly releases) with your own tokens — take
shadcn-svelte only if you want the CLI vocabulary and accept that you are buying the fingerprint. **LayerChart**
for charts, the best-designed chart layer outside React. **`svelte/motion`**'s `Spring`/`Tween` — the framework
already ships interruptible springs, so install nothing. **Superforms + Zod**. **`svelte-dnd-action`**, one of
only three things in this corpus with a real keyboard drag modality. Svelte's compiler emits a11y warnings with
no plugin at all; leave them on.

**An Angular product.** **`@spartan-ng/brain`** for headless (49k wk, stable 1.4.1 — it out-downloads
ng-primitives 2:1, and ng-primitives is still on 0.130.2 after four years), with spartan/ui for the shadcn idiom;
**Angular Material** (2.1M wk) only if you have decided to accept Material. **Angular CDK `cdkDrag`** for drag —
and ship a "Move to…" menu beside it, because CDK drag has had no keyboard support since the request was filed
in August 2022, and under WCAG 2.2 SC 2.5.7 that is an AA failure. **ECharts** for charts; there is still no good
Angular-native answer. **`virtua`** for virtualization. **`@angular-eslint/eslint-plugin-template`**'s
`templateAccessibility` config (2.91M wk, 13 rules) for linting.

**A React Native app.** **Expo SDK 57 with Expo Router** — the platform now, not a framework choice. **Reanimated
4 + Gesture Handler**, because nothing else makes an RN app feel native. **`react-native-keyboard-controller`**,
because keyboard handling is the biggest native-feel gap and `KeyboardAvoidingView` has never worked on Android.
**FlashList v2**, or **Legend List v3** if the list is a chat feed. **Nativewind**, with Uniwind as the live
challenger. **`@expo/ui`** when platform-correct controls *are* the point — real SwiftUI and real Compose, which
also gets you Dynamic Type, VoiceOver and Reduce Motion for free. **Skia** for anything drawn. Expo installs
`react-native-screens` and `react-native-edge-to-edge` for you, which is most of the native feel you didn't
choose. Not React Native Paper: Material Design on an iPhone is the loudest "cheap cross-platform app" signal
there is.

---

## Every `essential` in the corpus

Sixty libraries, ordered the way you'd build a product. Duplicates across categories are merged.

| Library | Category | Why it's essential | Vibecode risk |
|---|---|---|---|
| Base UI (`@base-ui/react`) | headless · forms · overlays · styled | The Radix authors' second attempt and the whole category's substrate; 11.0M wk, shadcn's default since July 2026, zero CSS and zero opinions | low bare / **high** via shadcn |
| React Aria Components | headless · forms · tables · dnd | The only library where a11y and i18n are the product; also ships the reference ARIA `Table` (3.52M wk) and the only drag-and-drop with keyboard, screen-reader *and* touch-screen-reader parity | low |
| Reka UI | headless · outside-the-bubble | Vue's settled default and Nuxt UI's foundation; 1.64M wk, the largest non-React library here | medium |
| Bits UI | headless | Svelte's answer, weekly releases, the best-documented escape hatches of anything in the category | medium |
| Floating UI | overlays | Not a component library — the positioning engine under Base UI, Radix, Reka, Bits and Kobalte, at 66.8M wk | low |
| Modern platform CSS (no library) | css | 2026 CSS removes most of the reason libraries existed; check Baseline before adding a dependency | low |
| Tailwind CSS v4 | css | The correct greenfield default — `@theme` finally makes it a token system — and the single biggest source of same-looking products on the web | **high** |
| shadcn/ui | styled | The correct default and the largest single source of generic product UI; both are true and you must plan for the second | **high** as shipped / low after 4 token changes |
| Mantine | styled | Best engineering in the category — 460 contributors, 58 open issues on 31.7k stars, real hooks, its own MCP server | medium |
| Hand-authored CSS custom properties | tokens | The correct default for ~95% of teams and the only option where a compiler enforces the source of truth | low |
| Figma Variables (with `codeSyntax`) | tokens | Use it as the mirror, never the origin — four value types and no unit awareness | low |
| TanStack Table v9 | tables | The table engine; ships zero pixels, which is exactly why it's correct | low (medium via the shadcn recipe) |
| TanStack Virtual | tables | The virtualization primitive everything else sits on; 20.9M wk, 50% more than Table itself | low |
| shadcn/ui charts (Recharts v3) | charts | Fastest path to a chart that inherits your tokens, fonts and dark mode — budget an hour to undo its two dishonest defaults | high |
| Observable Plot | charts | The only defaults a serious information designer would ship untouched; no npm publish since 2025-02-14 | low |
| React Hook Form | forms | The default form-state layer; 38.2M wk, boring, still shipping monthly | low |
| Zod 4 | forms | The schema default; ecosystem gravity is overwhelming and v4 fixed the perf story | n/a |
| input-otp | forms | One person solved OTP inputs completely; nobody needs to write another | medium |
| Sonner | overlays | The only toast library where the motion was designed rather than bolted on — and its default look is now a tell | high |
| Pragmatic drag-and-drop | dnd | Best-engineered pointer DnD on the web, and the only one that publishes pixel-level drag specs; you still build the non-drag alternative | low |
| react-resizable-panels | dnd | Split panes, done: real `role="separator"` and keyboard resize. v4 renamed the whole API — check your imports | low |
| Motion (motion.dev) | motion | The one JS motion library a product app should install; springs, layout, presence and reduced-motion in one MIT package | low as an engine, high via copy-paste kits |
| Native CSS motion | motion | `transition` + `@starting-style` + `linear()` covers 80% of product motion at 0kb, on the compositor | low |
| Lucide | icons | Best-maintained and best-covered stroke set — and the most recognizable icon default in the world | high |
| Phosphor | icons | Six real weights and flat terminals; the only free set that can carry a brand alone, and it measures better at 16px | low |
| Iconify | icons | Infrastructure, not a set: 361,898 icons across 238 collections behind one tree-shakeable API | n/a |
| Fontsource + `next/font` | type | The correct way to ship OFL type — self-hosted, subset, preloaded, no third-party request | n/a |
| Inter | type | Still the most engineered free UI face; right when it should be invisible, a tell when reached for by reflex | high |
| ProseMirror | editors | The correctness substrate almost every good editor sits on; you rarely touch it directly | low |
| Tiptap v3 | editors | Best default for a doc surface in a product, and the paywall objection died in June 2026 when ten Pro extensions went MIT | medium |
| CodeMirror 6 | editors | The only serious code editor that works on phones and with screen readers | low |
| tldraw | editors | Best-designed canvas UI shipped as a component — read LICENSE.md before you build a business on it | high |
| Shiki | editors | Zero-runtime highlighting that looks exactly like the editor; no real competitor left | medium |
| Media Chrome | media | Web-component player parts with no house style at all; the correct base for a branded player | low |
| hls.js | media | 7.7M wk — the engine under nearly every non-Safari video on the web | n/a |
| Embla Carousel | media | 29M wk and the only carousel that behaves like a primitive; first check whether you need a carousel | low (library) / medium (the pattern) |
| MapLibre GL JS | maps | The default map engine. BSD-3, no key, no basemap. **v6 is ESM-only and WebGL2-only** — the `<script src>` snippet in every tutorial is broken | low engine / high demo style |
| Protomaps + PMTiles | maps | One file on object storage is the whole planet; kills the tile server and the vendor | low |
| three.js | 3d | 115k stars, r186, 363 contributors, a 7–10 week cadence. The substrate, not a design decision | n/a |
| React Three Fiber + drei | 3d | The best 3D DX on the web — and drei is where the 2026 landing-page cliché is manufactured | high (via drei) |
| next/image + unpic | media | Correct `srcset`/`sizes`/CLS handling is not optional, and neither makes you think about it | low |
| Expo + Expo Router | mobile | Not a framework choice any more; it's the platform. SDK 57 is current | low |
| Reanimated 4 + Gesture Handler | mobile | The reason RN apps can feel native at all; 7.3M wk each, no alternative exists | low |
| react-native-keyboard-controller | mobile | Closes the single biggest native-feel gap on both platforms | low |
| React Native Skia | mobile | The only real answer for custom 2D, shaders and drawn UI in RN | medium |
| Vercel AI SDK | ai | Not UI, but the message-parts model every good AI interface is built on; 21.6M wk | n/a |
| assistant-ui | ai | The only real *runtime* — branching, threads, tool approval, eight backend adapters. LangChain and Mastra both ship it | low |
| Streamdown | ai | Solves the unglamorous problem: markdown that doesn't flicker or break on a half-token. 4.38M wk at thirteen months old | low |
| axe-core | a11y | The engine under nearly everything; low false positives and honest about its own ~53% ceiling | medium |
| `@axe-core/playwright` + ARIA snapshots | a11y | The only a11y test that runs against your real app in CI and doesn't rot | low |
| Accessibility Insights for Web | a11y | Free, Microsoft-maintained, and the Tab Stops visualiser is the fastest keyboard audit that exists | low |
| WCAG 2.2 + Understanding docs | a11y | The legal benchmark in every jurisdiction that has one. Read Understanding, not the SC text | low |
| Playwright `toHaveScreenshot` + trace viewer | qa | Zero services, zero accounts, deterministic — measured at zero differing pixels across eight repeats. Start and often stop here | — |
| Playwright ARIA snapshots | qa | Structure regression without pixels, reviewable as YAML in a PR diff. The most underused thing in this corpus | — |
| Storybook 10 + `@storybook/addon-vitest` | qa | Not a component browser any more — a test runner where every story is a render test for free | high |
| BudouX | outside | The only correct way to wrap Japanese/Chinese/Thai text on the web; 15KB, no runtime deps | low |
| GOV.UK Design System | ds-reference | The only system that publishes the user research behind each component; cite it when you need to win an argument | low |
| Mobbin | reference-sites | Largest archive of real shipped screens and flows, and its MCP is what an agent should actually call — iOS and web only now | low |
| Refero | reference-sites | Same job for $10/mo: 142k screens, MCP, Figma plugin and a published agent skill | low |
| Untitled UI React | premium | Best paid-grade kit you can still buy, and the free MIT core is most of it — React Aria underneath | high |

---

## Category index

| Category | File | The default choice | The notable dissent |
|---|---|---|---|
| Headless primitives | [`headless-primitives.md`](headless-primitives.md) | Base UI | **Radix Primitives** — 11.8M wk of still-correct code with one issue closed since 2026-07-31. Safe to keep, wrong to start on |
| Styled component systems | [`styled-component-systems.md`](styled-component-systems.md) | shadcn/ui | **HeroUI v3** — best out-of-box polish in the file and the most inescapable house style; pill radius + `#006FEE` *is* the look |
| Tables and grids | [`tables-and-grids.md`](tables-and-grids.md) | TanStack Table v9 + Virtual | **shadcn `data-table`** — not a library, a copy-paste recipe, *the* 2026 generated-table look, and it leaves no lockfile trace |
| Charts and dataviz | [`charts-and-dataviz.md`](charts-and-dataviz.md) | shadcn charts (Recharts v3) | **Observable Plot** — the only untouched defaults worth shipping, on the slowest release cadence in the category |
| Forms and inputs | [`forms-and-inputs.md`](forms-and-inputs.md) | RHF + Zod 4 + Base UI `Field` | **react-select** — 6.08M wk on a 14-month-old publish, and its 2018 silhouette is a fingerprint on sight |
| Overlays, command, nav | [`overlays-command-nav.md`](overlays-command-nav.md) | Base UI + Floating UI + cmdk | **Sonner** — the best-designed motion in the category and, at one release in thirteen months, a default that now reads as generated |
| Editors, canvas, nodes | [`editors-canvas-nodes.md`](editors-canvas-nodes.md) | Tiptap · React Flow · tldraw · CodeMirror 6 | **tldraw** — the best-designed canvas UI here, and the one with a watermark clause and a licence key |
| Motion | [`motion.md`](motion.md) | Native CSS → WAAPI → Motion | **GSAP** — peerless timeline engine, free-but-not-open-source, and its culture is scroll-jacked marketing sites |
| Icons and typography | [`icons-and-typography.md`](icons-and-typography.md) | Lucide, changed | **Lucide itself** — best-maintained set in the world and the loudest single "AI built this" signal in a UI |
| AI interfaces | [`ai-interfaces.md`](ai-interfaces.md) | AI SDK + AI Elements | **AI Elements** — the best published taxonomy of AI UI, frozen at two commits since 2026-05-27. You copy in a reference, not a dependency |
| Mobile and native | [`mobile-and-native.md`](mobile-and-native.md) | Expo SDK 57 + Reanimated 4 | **Liquid Glass (`expo-glass-effect`)** — Apple's own material at 3.90M wk, and the fastest route to an app that looks prompted |
| DnD, kanban, layout | [`dnd-kanban-layout.md`](dnd-kanban-layout.md) | Pragmatic drag-and-drop | **React Flow** — the only library here shipping *appearance* CSS, which is why every generated flow builder is identical |
| Maps, 3D, media | [`maps-3d-media.md`](maps-3d-media.md) | MapLibre + react-map-gl + Protomaps | **R3F + drei** — best DX in web 3D and the factory for the iridescent-blob hero; `@react-three/postprocessing`'s `<Bloom>` is half the signature |
| CSS and styling infra | [`css-and-styling-infra.md`](css-and-styling-infra.md) | Tailwind v4 with a replaced theme | **Tailwind v4 itself** — 2,041 State-of-CSS respondents and the highest vibecode risk in the corpus; the ubiquity is the problem, not the scale |
| Accessibility tooling | [`accessibility-tooling.md`](accessibility-tooling.md) | axe-core, run at three layers | **Lighthouse (a11y)** — 1.12M wk, last commit June 2025, and a score of 100 means roughly nothing |
| Effect collections | [`effect-collections.md`](effect-collections.md) | Magic UI, restyled | **Aceternity** — its 2026 homepage is monochrome and typographically disciplined while the library it sells is the source of the neon-spotlight look |
| Premium / commercial | [`premium-commercial.md`](premium-commercial.md) | Untitled UI React | **Shadcnblocks** — 2,104 components, the most current changelog in the file, and it ships lorem ipsum |
| Design systems to study | [`design-systems-reference.md`](design-systems-reference.md) | GOV.UK Design System | **Vercel Geist** — beautiful, coherent, and the direct source of the default AI-generated look. Study the grid, refuse the palette |
| Inspiration and reference | [`inspiration-and-reference-sites.md`](inspiration-and-reference-sites.md) | Mobbin, then Refero | **Awwwards / Dribbble** — the highest design reputation in the category and the worst possible input for product work |
| Outside the bubble | [`outside-the-bubble.md`](outside-the-bubble.md) | Web Awesome (18 of 87 components are Pro) | **Nord** — visually the most disciplined set in the corpus, and its LICENSE.md restricts use to Nordhealth's own staff |
| Design tokens and handoff | [`design-tokens-and-handoff.md`](design-tokens-and-handoff.md) | One hand-authored `tokens.css` | **Figma Dev Mode MCP** — genuinely good at reading a frame, and 200–600 tool calls/day disqualifies it as a pipeline |
| Visual QA and testing | [`visual-qa-and-testing.md`](visual-qa-and-testing.md) | Playwright screenshots + ARIA snapshots | **Lighthouse CI** — still 1.12M wk, last commit June 2025; a perf budget, never a design or a11y gate |

---

## Cross-cutting findings

Ten things only visible from above all 22 files.

**1. The fingerprint is a *composition*, not a theme — and it now crosses every framework.** shadcn ships 26
`style` values across three primitive families; they change radius and control shape, not identity.
`shadcn-svelte.com` and `basecoatui.com`, screenshotted in one session, render the same demo page card-for-card:
the same greyscale "Contribution History" chart labelled Dec–May, the same "Scan to connect your mobile device"
QR panel, the same "Distribute Track / Spotify, Apple Music" card, the same "418.2K Visitors · +10%" tile. One in
`Rhea`, one in `Vega`; that is the whole difference. The same composition travels through Basecoat (plain HTML),
Franken UI (UIkit), shadcn-svelte (Bits UI), spartan-ng (Angular CDK) and React Native Reusables. So **choosing a
headless library is not a defence**: in every framework with a settled winner, that winner is the substrate of a
shadcn-shaped copy-paste kit, and an agent told "use the headless library" lands in the kit. What protects you is
the styling layer you write — the one thing none of these libraries ship.

**2. The placeholder roster survives into production further than any component does.** shadcn ships "Acme Inc."
and $1,250.00 / 1,234 / 45,678 / 4.5%. Tailwind Catalyst ships Leslie Alexander, Michael Foster, Dries Vincent,
Lindsay Walton, Tom Cook. Untitled UI ships Olivia Rhye. Shadcnblocks ships lorem ipsum. Nobody treats copy as a
design decision, so nobody deletes it — which makes placeholder names a more reliable tell than any stylesheet,
and the cheapest fix in the corpus. Grep for them before you ship.

**3. The largest single source of the generated look is invisible to every instrument used here.** Magic UI
(★22,242), Aceternity, React Bits (★47k), motion-primitives and Cult UI are copy-paste registries: no npm
package, no download signal, no upgrade path. Verified by API, Magic UI, coss/Origin UI, React Bits, Cult UI,
Motion Primitives and Kokonut all report **0 releases and 0 tags**. shadcn's own `data-table` recipe is *the*
2026 generated-table look and leaves no lockfile trace. This corpus reasons from npm figures, so its cameras
point away from the thing it exists to stop. One correlation is worth acting on: the three entries in that
category that *do* version their output — SmoothUI, Paper Shaders (111 versions, ~664k wk) and NumberFlow (1.59M
wk) — are also the three least generic.

**4. Liveness signals lie in both directions, and this corpus was fooled by both.** *Renames:*
`@base-ui-components/react` is frozen at `1.0.0-rc.0` and still pulls 429,187 wk while `@base-ui/react` does
10,994,876 — a 25× understatement that appeared in three separate files. `radix-vue` pulls 1.17M wk and is Reka
UI. `react-day-picker` carries 28.8M wk against `@daypicker/react`'s 324k. `@finos/perspective` is npm-deprecated
and still gets half its live successor's traffic. `@udecode/plate` is frozen while `platejs` does 4× the volume.
`wx-react-grid` is dead; `@svar-ui/react-grid` does 106,500 wk. `framer-motion` still out-downloads `motion`
2.2:1. A rename makes a healthy project look dead, and it is the easiest way for a research pass — or a model
trained before it — to be confidently wrong. *Release feeds:* Semi Design was written off for a ten-month gap
that never happened (npm shipped 2.100.0 → 2.103.0 monthly; only the Releases feed stopped at v2.88.2). PrimeVue
was faulted for a cadence problem while shipping v5.0.0. ProseMirror and CodeMirror archived *every* GitHub repo
in April 2026 and moved to code.haverbeke.berlin — both still publish weekly, and every staleness scanner will
call your most reliable dependencies abandoned. Inverted: BackstopJS shows a Sep-2026 push that was a README edit
over a Sep-2024 last commit, and GitHub's `open_issues_count` includes PRs (Emotion is 309 issues + 85 PRs, not
394). **Check npm `dist-tags` and git tags. Never the Releases tab, never `pushed_at`, never the issue badge.**

**5. Roughly 77M weekly installs of unmaintained software, in the motion category alone.**
`react-transition-group` 35.5M wk (last publish 2022-08-01), `tw-animate-css` 25.3M (no release in 12 months),
`lottie-web` 6.5M (16 months), `@use-gesture/react` 5.8M (26 months), `popmotion` 2.0M, `@motionone/dom` 1.9M.
The pattern repeats: `@dnd-kit/core` 22.4M wk frozen since 2024-12-05; Popper.js 21.2M superseded by its own
author; cmdk 36M with no publish since 2025-03-14; Vaul 24.4M declared unmaintained by its author;
`react-textarea-autosize` 7.85M replaced by one CSS line; `react-dnd` 4.8M last released April 2022 with no
archive banner to warn you. Download volume is a record of what was popular in 2019 — and because it is what
training data was built on, it is exactly what an unprompted model reaches for.

**6. MIT is a funnel, and four licences changed without an announcement.** Untitled UI React's component package
is `"private": true` at `0.0.0` — never published; the free library funnels a $349 kit, and its icon set
out-ships its CLI 62:1 (304,138 vs 4,913 wk). React Bits reads as the 47k-star MIT default and is MIT **+ Commons
Clause**. Origin UI became Cal.com's coss.com/ui and is now **AGPL-3.0** by default — the most-copied input
catalogue in the shadcn world, relicensed under the one licence that reaches copy-paste. tldraw requires a
production licence key and watermarks the free tier; React Flow Pro, at a near-identical star count, gates zero
code. Remotion is free to three employees, $100/mo above. Web Awesome gates 18 of 87 components including all ten
chart types. Hugeicons' "60,000+ icons" is ~6,700 concepts × 9 styles with 8 of 9 paywalled. And two silent
relicences: **ApexCharts left MIT at v5.2.0 on 2025-07-09** (free only under $2M revenue, ~2.4M wk exposed) and
**Remix Icon left Apache-2.0 for a bespoke non-OSI licence in January 2026** — while Iconify's metadata still
reports it as Apache 2.0, so every tool reading licences from Iconify reports the wrong answer.

**7. Every category's most-installed package is infrastructure nobody names.** `@floating-ui/dom` does 66.8M wk,
an order of magnitude past every component library it sits under. `react-remove-scroll` does 64.2M wk on a
941-star repo nobody chooses on purpose. `tailwind-merge` (71.8M) + `class-variance-authority` (54.3M) is 126M wk
of patch libraries that exist purely because atomic CSS has no cascade and no variant concept — a cost nobody
prices when comparing Tailwind to CSS Modules. `react-native-screens` at 7.54M wk is the most-installed thing in
the mobile file and went two passes unnamed. `hls.js` at 7.7M wk was absent from a media file. D3 does 18.6M wk
and has not shipped since 2024-03-12. `react-draggable` (6.59M) + `react-resizable` (4.05M) out-download
Pragmatic, React Flow and `@dnd-kit/react` combined. **Everything transitive is invisible, and everything
invisible is unaudited.**

**8. The discourse is React-first and English-first, and the corpus can price what that hid.** antd Table (3.2M
wk), Vaadin Grid (253k) and PrimeReact DataTable (227k) were all absent from a tables file — Ant Design alone
probably renders more table cells per day than everything else here combined. `virtua` (884k wk, five frameworks,
~3kB) was missing from a virtualization file that evaluated only React virtualizers. Vue Flow does 476k wk, more
than tldraw. `vuedraggable` pulls 1.28M wk on a 2020-10-25 publish — the exact shape of the `react-dnd` trap —
missed by a pass written specifically to fix React bias. `@angular-eslint/eslint-plugin-template` does 2.91M wk
with 13 a11y rules and was missed by an a11y file whose *previous* pass existed to correct React default bias.
Ant Design X (85.3k wk) and Markstream (five frameworks, 312 issues closed, 0 open) have near-zero English
coverage. Gradio (★43,505, daily pushes) was skipped while Chainlit at a third the size was named "the Python
answer." Reka UI at 1.64M wk went two passes unnamed in a file explicitly about non-React excellence. The best
accessibility documentation found anywhere was SmartHR's, in Japanese. The bias is not "React vs the rest"; it is
"whatever the English-language JS conversation is about this month." Related and unfixed: **nobody covers Android
product precedent any more** — Mobbin dropped it, Refero never had it, ScreensDesign is iOS-only — so an agent
asked for an Android surface has nothing to retrieve and will invent one.

**9. MCP became table stakes in a single cycle, and libraries are now optimising to be generated.** Mobbin,
Refero, Nicelydone, ScreensDesign, Savee, Built for Mars and One Page Love all shipped MCP servers in the same
window — and so did Landingfolio, a template store. Ark UI and Angular Primitives put MCP endpoints and
`llms.txt` *above* the component list in primary navigation. Mantine ships `@mantine/mcp-server`; daisyUI leads
its homepage with one; HeroUI Native has a "UI for Agents" docs section with LLMs.txt, MCP, Agent Skills,
AGENTS.md and a `Copy Prompt` button on every page. Every design-token vendor repositioned to "context for AI
agents" inside twelve months — Supernova, zeroheight, Knapsack (now a waitlist) — while Specify simply died. Two
load-bearing conclusions: **an MCP predicts a business model, not quality**, and **a library optimising to be
emitted by a model is a homogeneity engine** — the same mechanism as findings 1 and 2, one layer up.

**10. The platform took back the cheap half of the job — and accessibility got worse anyway.** `<dialog>` is
Baseline Widely (2024-09-14), the Popover API Baseline Newly (2025-01-27), `@starting-style` since 2024-08-06,
`linear()` Widely since 2026-06-11, same-document View Transitions since 2025-10-14, `field-sizing: content`
since 2026-06-16 — that last one deletes a 7.85M wk dependency in one CSS line. What the platform did *not* take
is anchored positioning, which is why Base UI — written by people who would love to drop it — still ships
`@floating-ui/react-dom`. Against all that, WebAIM's 2026 Million found **95.9% of home pages with detected WCAG
2 failures** (94.8% in 2025) and 56.1 errors per page, up 10.1% year over year, with page complexity up 22.5% and
ARIA attributes up 27% — and pages using ARIA averaging 59.1 errors against 42.0 for pages without. For the first
time in eight years the flagship dataset names the cause in print: *"automated or AI-assisted coding practices
('vibe coding')."* Automation will not save you either: the famous 57%-automatable figure is WCAG-2.1-era and
inflated by SC 4.1.1 Parsing, which 2.2 deleted; recomputed from Deque's own table it is **53.0%**, and falling
as the standard adds manual criteria. The tooling is fine. The output is the problem.

---

## Everything ranked `avoid`

101 entries. Grouped by *why*, because the reason changes what you do about it.

### Dead, and still installed at scale — the traps

| Library | Category | The number |
|---|---|---|
| `react-transition-group` | motion | 35.5M wk; last publish 2022-08-01, 258 open issues |
| cmdk (as a *form combobox*) | forms | 36M wk; last publish 2025-03-14. Still fine as a ⌘K palette |
| Vaul | mobile | 24.4M wk; author declared it unmaintained, shadcn replaced it with Base UI |
| `@dnd-kit/core` | dnd | 22.4M wk; last publish 2024-12-05, all effort on a rewrite still at 0.5.0 |
| Popper.js (`@popperjs/core`) | overlays | 21.2M wk; superseded by Floating UI, same author |
| Emotion | css | 18M wk; `@emotion/react` last published 2024-12-09, Next.js still lists it under "working on support" |
| `react-textarea-autosize` | forms | 7.85M wk; `textarea { field-sizing: content }` went Baseline 2026-06-16 |
| `react-select` | forms | 6.08M wk; 14 months since publish, 489 open issues, a 2018 silhouette |
| Tippy.js | overlays | 5.75M wk; archived by its author 2024-05-27 |
| Bootstrap 5 | styled | 5.6M wk; last release 2025-08-26 and **no v6 anywhere** — no branch, no tag, no npm channel |
| `react-dnd` | dnd | 4.8M wk; last release 2022-04-19, and no archive banner, which makes it worse than rbd |
| Formik | forms | 3.9M wk; 840 open issues, controlled-by-default re-renders the whole form per keystroke |
| `@mui/base` | headless | 3.4M wk; superseded by Base UI. Inertia, not endorsement |
| `react-toastify` | overlays | 3.6M wk; not dead — rejected on taste. Colored full-bleed toasts you'll spend a day deleting |
| `popmotion` | motion | 2.0M wk; folded into the Motion codebase years ago. Transitive archaeology |
| `react-virtualized` | tables | 1.61M wk; dead since 2025-01, and its own author wrote react-window to replace it |
| `react-beautiful-dnd` | dnd | 1.47M wk; **archived by Atlassian**, 642 open issues |
| `imask` / `react-imask` | forms | 1.4M + 875k wk; last publish 2024-05-21 |
| `react-final-form` / `final-form` | forms | 1.1M wk combined; the other fossil next to Formik |
| `react-slick` | media | 1.06M wk; a jQuery-era slider with its own stylesheets, arrows and dots to override |
| Stitches | css | 894k wk; **archived** 2025-02. The dead dependency an agent is most likely to copy from a 2022 post |
| `vitest-axe` | a11y | 752k wk; `latest` is 0.1.0 published 2022-10-21. Use jest-axe |
| `react-input-mask` | forms | 613k wk; **archived repo**. The single most dangerous stat in the forms file |
| `react-motion` | motion | 504k wk; last published **2017-10-02** |
| DataTables (jQuery) | tables | 462k wk of legacy inertia, plus a 2025 CDN outage post-mortem |
| `animate.css` | motion | 416k wk; last published 2020-09-07. `animate__bounce` in markup is a dating stamp |
| Tremor | styled | 366k wk; last publish 2025-01-13, repo last pushed 2025-10-10 |
| `material-react-table` | tables | 302k wk; no release since 2025-03-01, and *the* default AI-generated React table |
| `@react-input/mask` | forms | 166k wk; recommended everywhere as the maintained successor, last published 2024-12-05 |
| `keen-slider` | media | 152k wk; last publish 2023-07-05, 149 open issues |
| Melt UI | headless · outside | 127k wk on v1 (unreleased since 2025-03-28); the rewrite has 5,007 |
| Shoelace | outside | 120k wk on an **archived** repo. Migrate to Web Awesome |
| Joy UI | styled | 102k wk; still `5.0.0-beta.52` from 2025-03-18 after three-plus years in beta |
| Chartist | charts | 98k wk; its differentiator (SVG + CSS charts) became table stakes a decade ago |
| `plaiceholder` | media | 81k wk from stale tutorials; repo **archived by its owner**. Use ThumbHash |
| BackstopJS | qa | 74.6k wk; last *code* commit 2024-09-07 — the 2026 push was a README edit |
| `storycap` | qa | 66.6k wk; v5.0.1 Sep 2024, superseded by Storybook's own test runner |
| Histoire | qa | 64k wk decaying; `1.0.0-beta.1` after four years |
| `token-transformer` | tokens | 45,193 wk; last published 2023-05-25, replaced by `@tokens-studio/sd-transforms` |
| chatscope `chat-ui-kit-react` | ai | 44.9k wk; no push since 2025-05-15 and still listicled as "the" React chat kit |
| Grid.js | tables | 42k wk; slowing since 2026-01, superseded on every axis |
| Theo (Salesforce) | tokens | 11,565 wk; **archived** 2025-06-09. The tool that coined "design token" |
| Diez | tokens | 1,318 wk; last push 2022-12-10 |
| Master CSS | css | 1,157 wk; npm `latest` is 1.37.8 from 2022-12-01 while v2 sits on `rc.88` |
| Kuma UI | styled | **433 wk**; zero-runtime CSS-in-JS lost to Tailwind v4 |

### Dead, gone, or never real

| Library | Category | Why |
|---|---|---|
| Muuri | dnd | Last release July 2021 |
| Motion Canvas | editors | Last stable 2024-12-14 — and motioncanvas.io still serves, which makes it look alive. Use Revideo |
| Vanta.js | 3d | npm 0.5.24 from 2022-09-16, pinned to three.js r134, and its own demo reads 5.1fps |
| Splide | media | Last publish 2022-11-09; the unscoped name is a security placeholder |
| `@lottiefiles/lottie-react` | motion | Archived on GitHub |
| `lottie-web` | motion | 6.5M wk of inertia, 857 open issues, no publish since 2025-05. Use dotLottie |
| `react-useanimations` | icons | Last push 2024-06-12 |
| Pigment CSS | css | MUI's own repo description reads "Alpha phase, currently, on hold" |
| Water.css | css | Last pushed 2024-02-11; superseded by `light-dark()` and 30 lines of CSS |
| Tokenami | css | Docs site returns a Vercel `DEPLOYMENT_NOT_FOUND` — a live 404 is a stronger signal than a stale commit |
| Specify | tokens | Sunset 2024-11-15; specifyapp.com is still up, still has a "Pricing" nav, and still ranks |
| Lost Pixel | qa | Repo archived; their own banner reads "We are sunsetting the product" |
| Arco Design | styled | Their own English components-overview route returns 404, with the sidebar intact |
| Chatbot UI (mckaywrigley) | ai | 33k stars, last commit 2024-08-03, still the top result for "chatbot ui github" |
| LlamaIndex chat-ui | ai | 3.1k wk, no push since 2025-12-16 |
| nlux | ai | 4.7k wk, dead since 2025-11-25 |
| llm-ui / CedarOS / Kibo UI | ai | Two dead, one unshipped since May. Checked because they keep getting cited |
| Loquix | ai | 40 stars, 22 wk downloads. Right premise, no adoption |
| Float UI | effects | Last push 2025-03; floatui.com still returns 200, which is why it keeps getting listicled |
| Orbit (Kiwi.com) | ds-reference | orbit.kiwi does not resolve in DNS |
| Clarity (VMware) | ds-reference | `vmware-clarity/core` archived 2026-02-02 |
| Twilio Paste | ds-reference | Docs site 301s to the repo; `@twilio-paste/core` hasn't published since 2025-08-25 |
| Salesforce Lightning | ds-reference | `salesforce-ux/design-system` archived; SLDS2 unfinished in public |
| Mailchimp pattern library | ds-reference | ux.mailchimp.com returns 503. The origin of the modern voice-and-tone guide is offline |
| Wise Design | ds-reference | wise.design is now an auto-scrolling brand gallery with no tokens or components |
| UXArchive | reference-sites | Cloudflare Error 1000, DNS misconfigured — and still #1 in 2026 "Mobbin alternative" listicles |
| UI Sources / Design Vault / Scrnshts | reference-sites | All three 301 to screensdesign.com; screenlane.com 301s to Page Flows |
| Interfaces.pro | reference-sites | Serves an anti-adblock redirect script instead of content |
| Mobile Patterns | reference-sites | Resolves, then 404s on every path |
| Pttrns | reference-sites | "Now completely free" and repurposed as an SEO content property |
| Design Systems Repo | reference-sites | Newest front-page article: August 23, 2020 |
| Appshots / Uiland / UIDatabase | reference-sites | Broken count-up stats rendering `0+`, a co-founder's own testimonial in the customer wall, and one that sells you prompts to regenerate someone else's layout |
| Eldora UI | effects | Reproduces Magic UI's headline, subhead, button pair and composition verbatim, recolored |
| UI Layouts | effects | Every tell on one page, plus testimonials whose text is "let's go! new blood" and "Great work dude" |
| Velora UI | effects | 28 stars, ranked "top library" by listicles run by its own publisher (AdminLTE.IO) |
| "Ace Grid" / Simple Table | tables | Ace Grid **has no npm package**; Simple Table does 2,757 wk with no public repo and publishes the rankings |
| `modern-cmdk` / `better-cmdk` | overlays | AI-generated READMEs with fabricated benchmark tables, ranking above every real option |
| `ninja-keys` / `react-cmdk` | overlays | Both dead since mid-2024; the latter is named close enough to `cmdk` that agents pick it by mistake |

### Alive, and rejected on taste, architecture or licence

| Library | Category | Why |
|---|---|---|
| Chart.js (for product UI) | charts | 11.2M wk, canvas-only: no DOM styling, no CSS typography control, no tabular figures, nothing to test |
| ApexCharts (new work) | charts | **Not MIT since v5.2.0 (2025-07-09)** — free only under $2M revenue. Its gradient-fill smoothed curve is a primary source of the generic dashboard look |
| Ant Design (as design guidance) | ds-reference | Fine library, thin and dated guidance, and the most instantly identifiable house style in B2B |
| React Native Paper | mobile | Material Design on iOS — ripple, FAB, floating-label fields — reads instantly as a cheap cross-platform app |
| Ionic React / Framework7 / Konsta UI | mobile | Web imitating native chrome lands in the uncanny valley and breaks the moment the OS updates its look. (Capacitor is *not* in this rejection — it ships no visual opinions at all) |
| Font Awesome | icons | Free SVGs are **CC BY 4.0** — attribution legally required, essentially nobody complies — and the drawing is 2014 |
| Hugeicons | icons | "60,000+ icons" is ~6,700 × 9 styles with 8 of 9 paywalled; an agent hits the wall mid-build |
| Magic UI / Aceternity / motion-primitives *in product UI* | motion | Fine on a page people visit once. In an application surface this is where the AI look is manufactured |
| Scroll-jacked storytelling pages | motion | NN/g measured statistically significant drops in both task accuracy *and* satisfaction |
| Accessibility overlays (accessiBe, UserWay, AudioEye) | a11y | Repeatedly litigated, opposed by practitioners, actively worse for screen-reader users, and they give an org a reason not to fix anything |
| axe MCP Server (Deque) | a11y | Docker + a paid axe DevTools subscription + an API key, to do what `npx @axe-core/cli` does free |
| Awwwards / FWA | reference-sites | Award submissions optimised for a 20-second jury scroll. Not one card in the visible grid contained a form, a table, a list or an empty state |
| Dribbble / Behance | reference-sites | A hiring marketplace ranked by likes on a JPEG. Nothing on it was built, so nothing has an error state, a loading state or a real dataset |
| Uiverse | reference-sites | A catalogue of glows, gradient borders and neumorphism — the vibecode look, distilled. Also hard-blocks headless browsers |
| Collect UI / Layers.to | reference-sites | Re-index Dribbble by category, which launders bad reference into a plausible-looking pattern library |
| Landingfolio / Bento Grids | reference-sites | A template store with a gallery bolted on, and an entire site devoted to the era's most recognisable layout tell. Useful as a diagnostic, never as reference |
| Shipixen | premium | Sells the exact vocabulary an agent should be trained against: mesh gradient + gradient text + glow CTA + laurels + avatar stack, all above the fold |
| Style Dictionary v3 / v4 (staying on) | tokens | v5 aligned reference syntax to DTCG and dropped Node <22; migrating later costs strictly more |

---

## What we could not settle

Ten questions that span files, with what would close each.

1. **Anchor positioning's real status — three files disagree.** `headless-primitives` reports Baseline *Limited*
   with no Firefox and no Safari; `overlays-command-nav` reports 84.12% full support with a 0% partial tier
   (Chrome 125+, Firefox 147+, Safari 26+) and `baseline: false` only because sub-features diverge;
   `css-and-styling-infra` says it crossed Baseline on 2026-01-13. All three cannot be right. **Settled by** one
   `web-features` + BCD query per sub-feature, recorded with the feature ID and the date.
2. **Whether shadcn's 294 registries diversify output or add 294 smaller monocultures** — and what v0, Lovable
   and Cursor actually emit at `shadcn init`. The most decision-relevant open question in the corpus. **Settled
   by** sampling generated projects and diffing registry entries per primitive.
3. **How much copy-paste registry code is actually in production.** These projects leave no npm trace. **Settled
   by** an HTTP Archive / Wappalyzer-style crawl for signature class names — the only instrument that sees them.
4. **Radix's intent under WorkOS.** Six weeks of silence, one issue closed since 2026-07-31, backlog growing, no
   public statement. **Settled by** a commit or release within 60 days, or a roadmap post. Same shape for
   `@dnd-kit/core` (22.4M wk, frozen 21 months) and cmdk (36M wk, 18 months).
5. **Screen-reader behaviour versus accessibility marketing.** Every library claims APG conformance; only React
   Aria and Kobalte cite the pattern per component; AG Grid publishes ARIA *documentation* while React Aria
   publishes the *behaviour* others implement against. Every a11y score in these files reflects documented rigour
   and architecture, **not measured output**. **Settled by** NVDA/JAWS/VoiceOver runs on matched components.
6. **Empty, loading, error and too-much states across chart and table libraries.** In the brief for both files
   and evaluated in neither, because every gallery shows the happy path. **Settled by** rendering each with
   `data={[]}` and a null-heavy series. Unverified expectation: only Highcharts and ECharts ship a real no-data
   affordance.
7. **"Used by <company>" claims — not one is verified anywhere in this corpus** beyond the self-evident (shadcn
   defaults to Base UI; Nuxt UI is built on Reka UI; LangChain and Mastra ship assistant-ui). PrimeReact's
   Volkswagen/Lufthansa, CopilotKit's "majority of the Fortune 500", Konva's Meta/Microsoft, Unicorn Studio's
   Shopify/Supabase, Tiptap's Figma/Lovable — all vendor logo strips. **Settled by** the served bundle on those
   companies' live sites, never a showcase.
8. **Two categories have no coverage anywhere.** *Graph/network visualization* — Cytoscape.js (14.7M wk),
   Sigma.js (241k), AntV G6 (228k), all MIT, all maintained, and none of the ranked chart entries draws a real
   graph. *Image and video generation UI* — ComfyUI (★132,311) is the reference implementation and is
   un-adoptable (GPL, monolithic). Category gaps, not verdicts. **Settled by** a research pass each.
9. **Whether DTCG 2025.10 is implementable in practice.** Measured, not asserted: one conformant file, two
   conformant-claiming tools — Style Dictionary emits `#2563eb` where Terrazzo emits `rgb(14.51% 38.82% 92.16%)`,
   and Style Dictionary silently writes `[object Object]` for a spec-form `duration` token with exit code 0.
   **There is no file both accept and render the same.** **Settled by** a published conformance suite.
10. **How many provisional visual scores are wrong.** One of three blind scores that got re-checked moved
    materially (React Spectrum 3 → 4, scored on reputation without looking). At that rate treat every
    unlooked-at score as a coin flip: Angular Material, Carbon, Web Awesome, Quasar, Naive UI, Blueprint, Ionic,
    Polaris, Reshaped, AG Charts (gallery 403s to headless capture), Carbon Charts, Charts.css, AntV X6/G6 and
    ECharts. **Settled by** a screenshot pass from a real browser, not another agent run.
