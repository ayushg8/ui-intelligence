# Copy-paste effect & animated component collections

**Evaluated:** 2026-09 · **Challenged:** 2026-09-09 (see `## Challenge pass` at the end — one demotion, three factual corrections, five additions including the category's most-installed package) · **Researcher note:** The category split in two. The serious half (Magic UI, Origin/COSS, Kokonut, SmoothUI) rebuilt itself around agent distribution — MCP servers, `llms.txt`, namespaced shadcn registries — while the demo-candy half multiplied into near-identical clones chasing SEO. Consolidation is real: Origin UI became Cal.com's design system, 21st.dev's founders pivoted to coding-agent tooling, and Aceternity is now mostly a paid template business with a free component funnel.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Magic UI | `strong` | Best-maintained and best-documented in the category; the default look is still a tell | high |
| Origin UI (now coss.com/ui) | `strong` | 508 unstyled-ish Base UI components, zero house style — but AGPL-3.0 | low |
| Paper Shaders | `strong` | The only real npm package here — 609k weekly installs, semver, Apache-2.0 | low |
| Fancy Components | `strong` | The only collection with genuine typographic taste; thin and slowing down | low |
| Motion Primitives | `strong` | Restrained, well-built motion primitives from a real design engineer | low |
| SmoothUI | `strong` | Quietly excellent craft, actively shipped, and the one library here that tags releases | low |
| Cult UI | `strong` | Actual point of view + the best AI/agent UI patterns; loud house style | medium |
| Kokonut UI | `situational` | Sharpest agent-distribution story in the category; the components themselves are cliché candy | high |
| Inspira UI | `situational` | The Vue/Nuxt answer, genuinely active — but it ports the Aceternity look wholesale | very high |
| React Bits | `situational` | 170+ background effects, huge reach, Commons Clause license — hero surfaces only | very high |
| Aceternity UI | `situational` | Defined the AI-startup landing aesthetic; closed source, increasingly paid | very high |
| 21st.dev | `situational` | Live commercial registry; its OSS repo has been stale 15 months and the team moved on | high |
| Animata | `situational` | Active, MIT, decent micro-interactions and a more disciplined site than expected; still wins no lane | medium |
| Basecoat | `situational` | shadcn for any web stack, no React required; components not effects | low |
| Svelte Animations | `situational` | Explicit Svelte port of Magic UI / Aceternity; inherits both the look and a licensing problem | very high |
| Animate UI | `experimental` | Best idea in the category, no commits in 8 months | medium |
| Hover.dev | `reference-only` | Paid, closed, deliberately maximalist — study the motion, don't ship the look | high |
| Skiper UI | `reference-only` | Closed-source paid effects named `skiper40` — unauditable | high |
| Eldora UI | `avoid` | Verbatim copy of Magic UI's homepage copy and layout | very high |
| UI Layouts | `avoid` | Every AI tell stacked on one page, including throwaway-reply testimonials | very high |
| Float UI | `avoid` | Last push 2025-03; effectively abandoned | — |
| Velora UI | `avoid` | 28-star repo ranked "top library" by listicles run by its own publisher | — |

## Recommendations by need
- **Default choice:** Magic UI — actively maintained (commits 2026-09-08 doing real dependency hygiene), MIT, 152 contributors, and the docs ship MCP + "Copy Page" for agents. Take the components, delete the rainbow glow.
- **Best engineering:** Origin UI / coss.com/ui — built on Base UI, 508 components, now Cal.com's official design system. Check the AGPL-3.0 license before shipping into anything proprietary.
- **Best visual quality out of the box:** Fancy Components — real display typography, kinetic text, physics; no gradient, no glow, no dark-mode-cheat.
- **Best accessibility:** Origin UI / coss.com/ui, by inheritance from Base UI. Nothing else in this category has a credible a11y story; most of it is decorative `div`s.
- **Most customizable / least house-style:** Origin UI / coss.com/ui, then Motion Primitives.
- **Lightest:** Motion Primitives — small Motion-based primitives, no shader/WebGL surface area.
- **Best animated background, if you must have one:** Paper Shaders — not a copy-paste collection but a versioned Apache-2.0 npm package at 609,425 weekly downloads, which makes it the single most-installed thing in this document by two orders of magnitude. Its shaders are material and image filters over *your* content rather than free-floating decoration, so they don't announce a library the way Aurora or Meteors do.
- **Non-React:** Inspira UI (Vue/Nuxt, ★4,974, MIT, active) or Basecoat (★4,287, MIT, works in plain HTML/Django/Rails). Both were missing from the first pass. Inspira is the aesthetic risk; Basecoat is the safe one.
- **Promising newcomer:** Kokonut UI's *distribution* — "Components humans browse. Agents ship." is the correct 2026 framing and the registry is genuinely machine-readable. Adopt the install path, not the component set.
- **Premium/paid worth it:** Magic UI Pro ($199 once) if you're shipping a marketing site this week. Aceternity All-Access only if you want the templates, not the components.

## Which components to actually keep

Worth keeping (they solve a real product problem): **Bento Grid**, **Marquee** (logo walls only, not content), **Number Ticker**, **Animated List / notification stack**, **Terminal**, **Dock**, **Blur Fade** (Magic UI); **AI Prompt input** (Kokonut — and only that one; the challenge pass struck `liquid-glass-card` from this list, since it cannot be both a component worth keeping and an example of the house style that got Kokonut demoted); **Dynamic Island**, **scramble-on-hover text** (SmoothUI); **Shift Card**, the AI SDK agent patterns (Cult UI); **animated Accordion / Tabs / Checkbox** (Animate UI); **Text Shimmer**, **Animated Group**, **Disclosure** (Motion Primitives); **letter-swap hover**, kinetic type (Fancy).

The exact source of the "AI-generated" look — never ship these together, and preferably not at all: **Spotlight / card-spotlight**, **animated gradient borders**, **BorderBeam**, **Meteors**, **AnimatedBeam**, **Sparkles / sparkle text**, **Retro Grid**, **Rainbow Button**, **Shimmer Button**, **Aurora / vortex / wavy backgrounds**, **3D card tilt**, **infinite testimonial marquee**, **an italic serif word inside a sans headline**. One of these in a hero is a choice; three is a signature, and it isn't yours.

Four more tells added in this challenge pass, all observed directly on sites in this document rather than inferred: **the liquid-metal / chrome-blob dark hero** (Inspira UI's homepage, 21st.dev's "Fluid Design Excellence" card — 2026's replacement for the purple aurora and already just as saturated); **a rainbow gradient bleeding out from under a single CTA** (Magic UI, Inspira UI — same effect, same position, two unrelated libraries); **a full-width scrolling marquee announcement bar** (Inspira UI); and **fluted-glass or halftone-dither image filters**, which are excellent and are on a fast track to cliché now that Paper Shaders has made them a one-line install.

## Scorecards

### Magic UI — `strong`
- **What:** 150+ MIT animated React/Tailwind/Motion components, plus a paid Pro tier of blocks and templates.
- **Verdict:** The best-run project in the category by a wide margin — real maintenance commits (lockfile refresh clearing 69 Dependabot alerts, Next security bump, dropping dead deps), 152 contributors, and docs that anticipate agents with an MCP server, `llms.txt` and a per-page "Copy Page" control. Its problem is not engineering, it's ubiquity: the Rainbow Button, Shimmer Button, BorderBeam and Meteors are load-bearing in the visual cliché this corpus exists to warn about. Take the structural components (Bento Grid, Animated List, Dock, Terminal, Number Ticker) and leave the glow.
- **Use when:** you want a well-maintained animation layer on top of shadcn/ui and you will restyle the defaults. · **Don't use when:** you paste more than two of its effects onto one page.
- **Scores /5:** visual 4 · interaction 4 · a11y 2 · engineering 4 · maintenance 5 · docs 5 · customization 4 · perf 3 · stability 4 · originality 2
- **Evidence:** `magicuidesign/magicui` ★22,242 · 1,124 forks · 0 open issues · **0 releases, 0 tags** (re-verified via API) · last push 2026-09-08 · npm downloads n/a (copy-paste) · 152 contributors · MIT · Pro tier $199 one-time (seen on docs page, unverified against checkout)
- **Looked at:** magicui.design and /docs/components/bento-grid — white ground, very large tight-tracked black headline, a violet full-bleed announcement bar with a ✨, an emoji pill badge, and two CTAs sitting on a soft rainbow gradient glow: three tells above the fold. The Bento Grid demo itself is genuinely good — soft white cards, real content ("Save your files", a stack of plausible notification rows), no decoration for its own sake. Docs sidebar carries MCP and an "Open in v0" affordance.
- **Vibecode risk:** high — the defaults are individually recognizable, and unmodified Magic UI reads as "AI startup landing page" instantly.
- **Link:** https://magicui.design/

### Origin UI → coss.com/ui — `strong`
- **What:** 508 "particles" (their word for components) built on Base UI; the repo is now named `coss` and describes itself as the official design system of Cal.com.
- **Verdict:** The quiet winner on engineering and the lowest-risk aesthetically, because it has essentially no aesthetic — every preview is monochrome skeleton geometry, and the a11y comes free from Base UI rather than from hand-rolled `div`s. But the license is AGPL-3.0, which for a *copy-paste* library is a genuine hazard an agent must not gloss over: pasting AGPL source into a proprietary SaaS is not the same as depending on an MIT package. Verify licensing with counsel before it enters a closed product.
- **Use when:** you need accessible, unstyled building blocks you will theme yourself, and your licensing allows it. · **Don't use when:** you want motion — this is not an animation library — or you cannot accept AGPL-3.0.
- **Scores /5:** visual 3 · interaction 3 · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 4 · originality 2
- **Evidence:** `cosscom/coss` ★10,561 · 537 forks · 4 open issues · last push 2026-09-08 · 54 contributors · **AGPL-3.0** · 0 releases, 0 tags · repo renamed `origin-space/originui` → `cosscom/coss`, and `curl` on originui.com returns a literal `301 → https://coss.com/ui` · repo description reads "coss.com/ui is the official design system of Cal.com" — all five claims re-verified 2026-09-09
- **Looked at:** coss.com/ui at 1440 and 390 — "A new, modern UI component library built on top of Base UI. Built for developers and AI." Off-white ground, one black pill button, one outline. Below it a four-column grid of cards, each a plain gray wireframe of the component with a one-line description. Not a single gradient, shadow flourish or accent color on the page. Holds up perfectly at 390px: type scales down cleanly, cards stack, nothing overflows.
- **Vibecode risk:** low — there is no house style to inherit.
- **Link:** https://coss.com/ui

### Paper Shaders — `strong` (added in the 2026-09 challenge pass)

- **What:** Zero-dependency canvas/WebGL shaders from the team behind the Paper design tool, shipped as real npm packages (`@paper-design/shaders`, `@paper-design/shaders-react`) and authorable inside Paper itself.
- **Verdict:** The first draft missed the most-installed thing in its own category by two orders of magnitude. `@paper-design/shaders-react` did **609,425 downloads last week**; `@paper-design/shaders` did 671,126. Nothing else in this document ships an npm package at all, let alone 111 published versions under semver with an Apache-2.0 licence. It also quietly refutes the draft's own "nothing here ships releases / no npm packages" conclusion. On taste it earns the tier independently: the demos are material and image filters — paper texture, fluted glass, water, halftone, dithering, chromatic aberration — applied over real photography, so what ships is a treatment of *your* content rather than a free-floating decorative widget a reader can name on sight. That is the structural difference between this and Aurora/Meteors, and it's why the vibecode risk is low despite it being, literally, animated background effects.
- **Use when:** you want motion or texture in a hero and refuse to look like every other AI-startup landing page; also when you need an actual dependency with an upgrade path instead of pasted source. · **Don't use when:** you need components — this is a shader library, there is not a button in it — or you're on a strict GPU/battery budget on mobile.
- **Scores /5:** visual 5 · interaction 3 · a11y 2 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 3 · stability 4 · originality 5
- **Evidence:** `paper-design/shaders` ★3,443 · 151 forks · Apache-2.0 · last push 2026-09-04 · **npm `@paper-design/shaders-react` 609,425 weekly downloads, latest `0.0.80` published 2026-08-09, 111 versions, first published 2024-10-15** · `@paper-design/shaders` 671,126 weekly · all figures pulled from the npm registry API 2026-09-09 · note the `0.0.x` version line — semver-wise this is still pre-1.0 and the maintainers have not promised API stability
- **Looked at:** shaders.paper.design at 1440 and 390 — warm off-white ground, a lowercase "paper shaders" wordmark, one line of sub-copy ("ultra fast zero-dependency shaders for your designs"), a single copyable `npm i` string, then straight into a labelled grid of demos. Every demo is the same photograph of yellow cosmos flowers run through a different shader, which is the correct way to document this: you see the filter, not a new picture each time. No CTA stack, no badge row, no social proof, no gradient. The most confident page in this entire document.
- **Vibecode risk:** low today, with a caveat worth watching — fluted glass and halftone dithering are excellent and are now a one-line install, which is exactly how Aurora became a cliché. Being early is not the same as being safe.
- **Link:** https://shaders.paper.design/

### Fancy Components — `strong`
- **What:** Daniel Petho's collection of typographic, kinetic-text and physics micro-interaction components. MIT.
- **Verdict:** The only entry here made by someone whose primary instinct is design rather than effects. It is also the only one whose components are hard to identify as "from a library" once shipped, because they're compositional (letter swaps, text along a path, gravity/collision text) rather than decorative wrappers. The caveats are real: 7 contributors, no commits since 2026-03-14, and the surface is narrow — it will not furnish a product, only accent one.
- **Use when:** a hero, an about page, or an editorial surface needs personality that isn't a gradient. · **Don't use when:** you need coverage — there are no forms, tables, or navigation here.
- **Scores /5:** visual 5 · interaction 5 · a11y 2 · engineering 3 · maintenance 2 · docs 4 · customization 4 · perf 3 · stability 3 · originality 5
- **Evidence:** `danielpetho/fancy` ★3,125 · last push 2026-03-14 (~6 months) · 7 contributors · MIT · 114 forks · 7 open issues · 0 releases · repo path added in the challenge pass — the first draft cited no repo, and the obvious guess (`daniel-petho/fancy`) 404s
- **Looked at:** fancycomponents.dev — enormous high-contrast serif ("Make your website") on plain white, body in a grotesque, with rotated white specimen cards scattered at the corners: a "Typeface alphabets" page with highlighted passages, an album collage, letters set in a circle, blue rotated type reading "YOU CAN JUST DO THINGS". Buttons are a black pill and an electric-blue pill. Zero gradient, zero glow, no dark mode at all. It reads like a type foundry site, not a component showcase — which is the point.
- **Vibecode risk:** low — using it makes a product look more specific, not less.
- **Link:** https://www.fancycomponents.dev/

### Motion Primitives — `strong`
- **What:** ibelick's set of Motion-based primitives (text effects, disclosure, animated groups, cursors) with a paid Pro tier.
- **Verdict:** The most tasteful *restraint* in the category. The homepage hero has no effect on it at all — just a headline and a real demo card showing a photograph of an Édouard-Wilfrid Buquet EB27 lamp, which tells you more about the author's judgment than any component list. Components are small, composable and unopinionated about color. The concern is momentum: still labeled beta, last commit 2026-03-19, 35 open issues.
- **Use when:** you want motion primitives to compose with, not finished effects to paste. · **Don't use when:** you need a maintained dependency with a release cadence — there isn't one.
- **Scores /5:** visual 5 · interaction 4 · a11y 3 · engineering 4 · maintenance 3 · docs 4 · customization 5 · perf 4 · stability 3 · originality 4
- **Evidence:** `ibelick/motion-primitives` ★6,255 · last push 2026-03-19 (~6 months) · 27 contributors · MIT · 254 forks · 35 open issues · 0 releases, 0 tags · still marked "beta" on site — every figure re-verified 2026-09-09
- **Looked at:** motion-primitives.com — white, centered, headline in a plain system-ish grotesque, two small buttons ("Explore Docs", black "Star on GitHub"), then a genuine demo card with real product photography. No badge spam, no gradient, no glow. The only decoration on the page is the content itself.
- **Vibecode risk:** low.
- **Link:** https://motion-primitives.com/

### SmoothUI — `strong`
- **What:** 130 Motion-powered drop-in components distributed as an official namespaced shadcn registry (`npx shadcn add @smoothui/…`).
- **Verdict:** Underrated relative to its 952 stars. The craft signals are specific: a floating dock on the homepage that toggles theme, sound, accent color, package manager and bundle view; a component sampler using real photography rather than gray boxes; and an actively current site (Vercel OSS footer reads 2026, not a stale year). Last commit 2026-09-02. Its component set skews micro-interaction (Dynamic Island, scramble text, clip corners) rather than background effects, which is the right side of the line. **The challenge pass turned up something the first draft got wrong and that raises this entry:** SmoothUI is the only library in this document that actually ships tagged, versioned releases — `v3.7.0` and `v3.7.1` in August 2026, plus a separately versioned `cli-v1.1.2`. In a category where the universal failure mode is "you paste it and then you own it forever with no upgrade path," a maintainer who versions the registry is doing the one thing nobody else here does.
- **Use when:** you want interaction polish installed through the shadcn CLI without adopting a house style, or you want any upgrade path at all. · **Don't use when:** you need scale — 54 forks and **6 contributors**, effectively one maintainer.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 4 · originality 4
- **Evidence:** `educlopez/smoothui` ★952 · last push 2026-09-02 · MIT · 54 forks · 6 contributors · 0 open issues · **ships releases: `v3.7.1` published 2026-08-02, `cli-v1.1.2` published 2026-08-03** · Vercel Open Source Software Program (badge dated 2026 on site)
- **Looked at:** smoothui.dev — off-white with a faint diagonal hatch, big black headline with the second line dropped to gray, one hot-pink button as the sole accent, a copyable install command directly under it. Right column is a live sampler: iridescent orb, a Username input, "Hover to Scramble", a "Clip Corners" chip, a video-card row with real photography. Calm, well-spaced, hierarchy instant.
- **Vibecode risk:** low — the pink is the only inherited signature and it's one token.
- **Link:** https://smoothui.dev/

### Kokonut UI — `situational` (demoted from `strong` in the 2026-09 challenge pass)
- **What:** 100+ MIT React/Tailwind/Motion components published as a machine-readable registry with MCP, shadcn CLI and `llms.txt` entry points.
- **Verdict:** The clearest strategic thinking in the category. The homepage is literally split "For humans" (live previews) / "For agents" (`@kokonutui/particle-button ✓ installed · 1.2s`), with a copyable `npx shadcn@latest mcp init --client claude`. For a corpus that agents consume, that matters — Kokonut is the easiest of these to install correctly without a human in the loop. The components themselves are still mostly effect candy (particle-button, shimmer-text, liquid-glass-card), with `ai-prompt` the standout genuinely-useful one.
- **Demotion rationale:** the first draft scored the *distribution* and let the tier ride on it. But a corpus that exists to stop generic output cannot rank a library `strong` when its own verdict concedes the components are "mostly effect candy," and when the three components it names — `particle-button`, `shimmer-text`, `liquid-glass-card` — are literally three entries off the tells list two sections up. The registry engineering is genuinely best-in-category and the write-up keeps saying so. That is a reason to copy Kokonut's install path, not a reason to install Kokonut's components. `situational`, and the vibecode risk goes to **high**.
- **Use when:** you want a reference implementation of agent-resolvable component distribution, or you need one specific thing (`ai-prompt` is the real one). · **Don't use when:** you're picking on component substance — Magic UI and Cult UI have deeper sets, and you will pay for Kokonut's in house style.
- **Scores /5:** visual 4 · interaction 4 · a11y 2 · engineering 4 · maintenance 4 · docs 4 · customization 3 · perf 3 · stability 3 · originality 2
- **Evidence:** `kokonut-labs/kokonutui` ★2,090 · last push 2026-08-20 · 11 contributors · MIT · 132 forks · 0 open issues · 0 releases, 0 tags · no npm package under `@kokonutui/cli` (404 on the registry) · Pro tier advertised on site
- **Looked at:** kokonutui.com — pure black, white Inter-ish headline "Components humans browse." with "Agents ship." in gray beneath it, one white pill button beside a copyable terminal string. Below, a two-panel proof: human-facing component tiles on the left, an agent install log on the right, joined by a "same registry" badge. The one loud element is a hot-pink announcement bar. Restrained and confident; the dark ground is the only thing it shares with React Bits.
- **Vibecode risk:** high (raised from medium) — the site's restraint is not inherited by the components. `particle-button`, `shimmer-text` and `liquid-glass-card` are the vocabulary, not an exception to it. Judge a copy-paste library by what gets pasted.
- **Link:** https://kokonutui.com/

### Cult UI — `strong`
- **What:** 78+ animated shadcn-compatible components, repositioned in 2026 around AI/agent interface patterns (100+ "AI SDK agent patterns").
- **Verdict:** The only collection here with an actual visual identity rather than a trend: acid-lime accents, a dot-matrix display headline, monospace body — deliberate and legible as a point of view. The AI-agent pattern library is the most differentiated content in the category and the hardest thing to find elsewhere. Two honest deductions: the pixel headline face is genuinely harder to read than what it replaces, and 7 contributors on 6.1k stars is a thin bus factor.
- **Use when:** you're building agent/chat/tool-call UI and want patterns rather than effects. · **Don't use when:** you don't want the lime-and-terminal signature — it comes through in the components, not just the site.
- **Scores /5:** visual 4 · interaction 4 · a11y 2 · engineering 3 · maintenance 4 · docs 4 · customization 3 · perf 3 · stability 3 · originality 4
- **Evidence:** ★6,125 · last push 2026-07-22 · 7 contributors · MIT · 335 forks · 17 open issues · Pro tier advertised
- **Looked at:** cult-ui.com — white ground, acid-lime top banner and highlight chips, "Shadcn, expanded" set in a dot-matrix/pixel face, sub-copy in monospace, a hard-cornered black button with uppercase letterspaced label. Highlighted component "Shift Card" — a card that reveals detail on hover — demoed with real UI content rather than lorem. Committed, coherent, and nothing like the purple-glow default.
- **Vibecode risk:** medium — distinctive, but distinctive *as Cult UI*.
- **Link:** https://www.cult-ui.com/

### React Bits — `situational`
- **What:** 170+ animated React components, overwhelmingly backgrounds and text effects. 47k stars.
- **Verdict:** Technically capable and hugely popular, and visually the single largest contributor to the look this corpus warns about. Nearly every component is a full-bleed decorative background (ColorBends, Aurora, Aero Shards, particle fields); there is almost nothing here you could call product UI. Two things a well-read engineer probably doesn't know: it is **not** OSI open source — the license is MIT + Commons Clause, so you may ship it in a product but may not redistribute or resell the components — and the docs' live prop-editing panel is genuinely the best interactive documentation in the category.
- **Use when:** one hero background on a marketing page, tuned away from the defaults. · **Don't use when:** anywhere inside an application, or in anything you intend to redistribute as a template or starter kit.
- **Scores /5:** visual 3 · interaction 4 · a11y 1 · engineering 4 · maintenance 5 · docs 5 · customization 4 · perf 2 · stability 4 · originality 2
- **Evidence:** `DavidHDev/react-bits` ★46,981 · last push 2026-09-09 · 123 contributors · 2,271 forks · 8 open issues · 0 releases, 0 tags · **MIT + Commons Clause** (GitHub reports NOASSERTION) — license file read directly this pass and the restriction is verbatim: *"so long as you do not sell, sublicense, or redistribute the components themselves—whether alone, in a bundle, or as a ported version."* The "ported version" clause is the sharp edge: a Vue or Svelte port of React Bits is a licence violation, which is worth knowing given how many ports of this category exist. · #3 in JS Rising Stars 2025 (unverified secondary source — left as unverified)
- **Looked at:** reactbits.dev — near-black with a dot grid, purple (#A855F7) volumetric light streaks smeared diagonally across the entire hero, headline whose second line is purple, purple pill button with a glow halo, "170+ COMPONENTS · FREE FOREVER" in letterspaced gray small caps. Right side is a code panel with every prop rendered as an inline editable chip plus a color swatch and Nebula/Aurora/Ember/Ice presets — that panel is excellent. The rest is one color, applied everywhere.
- **Vibecode risk:** very high — this is the reference implementation of the look.
- **Link:** https://www.reactbits.dev/

### Aceternity UI — `situational`
- **What:** 200+ React/Tailwind/Motion components, blocks and paid landing-page templates. No public component repo.
- **Verdict:** The library that defined the 2024–26 developer-tool landing aesthetic, and the one whose own taste has moved furthest since. Its current site is monochrome and restrained — the neon it popularized is gone from the marketing, though not from the components. It's now substantially a commerce business: a cart icon, Pricing, "Get All-Access" one-time payment, five named paid templates. That's fine, but it means the free components are a funnel and the source isn't in a repo you can audit or fork.
- **Use when:** you need a landing page fast and will heavily edit the defaults; the 2026 shader and image components (Cloud Shader, Chromatic Image, Text Flipping Board) are the strongest new work. · **Don't use when:** you need auditable source, a license file, or anything to survive contact with a design system.
- **Scores /5:** visual 4 · interaction 4 · a11y 1 · engineering 3 · maintenance 4 · docs 4 · customization 3 · perf 2 · stability 3 · originality 2
- **Evidence:** no canonical public repo (components distributed via site + CLI) · site claims "Trusted by 120,000+ founders developers and creators" — unverified · all-access is a paid one-time purchase · no npm package
- **Looked at:** ui.aceternity.com home and /components — pure black, tight-tracked white headline, two ~8px-radius outline buttons, and a masonry wall of block previews rendered dimmed with monospace labels ("Shader contact section", "Infinite scroll hero"). The components index shows dark slate cards with generous padding and real demos; one preview card is a literal rainbow diagonal-gradient corner. At 390px the layout holds but the eight-avatar social-proof stack collapses into a crushed overlap with faces clipped. The hero also ships a copy typo: "founders developers and creators".
- **Vibecode risk:** very high — spotlight cards, animated beams and 3D tilt are its signature and are recognizable on sight.
- **Link:** https://ui.aceternity.com/

### 21st.dev — `situational`
- **What:** A commercial registry/marketplace of shadcn-compatible components ("12,000+", "2,000+ marketing blocks") plus themes and templates.
- **Verdict:** The most important finding here is what happened to the team, not the site. `serafimcloud/21st` has not been pushed since 2025-05-28 — over 15 months — while the 21st-dev org's energy went entirely into agent tooling: `magic-mcp` (5.8k stars, pushed today), `1code` (5.6k, an orchestration layer for Claude Code and Codex), `21st-sdk`, `agent-elements`. The registry is live and monetized, but as an open-source project it is dormant. Its own block taxonomy tells you what it optimizes for: Animated heroes, Shaders, Liquid & metal, Backgrounds, Gradients.
- **Use when:** you want breadth of community blocks to browse for ideas, or you want `magic-mcp` as an agent-facing component source. · **Don't use when:** you need provenance, a license per item, or quality control — it is a marketplace, and quality varies per submitter.
- **Scores /5:** visual 3 · interaction 3 · a11y 1 · engineering 3 · maintenance 2 · docs 3 · customization 3 · perf 2 · stability 2 · originality 2
- **Evidence:** ★5,447 on the registry repo · last push **2025-05-28** · 130 open issues · MIT · not archived · org's active repos are `magic-mcp` (★5,833, pushed 2026-09-09) and `1code` (★5,600) · site returns HTTP 200 with Pricing/Sign up
- **Looked at:** 21st.dev — deep blue radial-gradient dark hero, "The *living* library of interfaces" with "living" set in blue italic serif (itself a 2025-26 cliché), then category chips and three showcase cards: floating app icons, a chrome-blob "Fluid Design Excellence" page, and Midjourney/Leonardo AI marketing panels. It is a catalogue of hero decoration presented as an interface library.
- **Vibecode risk:** high — browsing it optimizes you toward decorative heroes.
- **Link:** https://21st.dev/

### Animate UI — `experimental`
- **What:** Animated replacements for the shadcn/Radix primitives you already use — Accordion, Tabs, Checkbox — plus animated icons. Vercel OSS Program.
- **Verdict:** Strategically the best idea in the whole category: instead of adding a new layer of effects, it upgrades the components already in your app, so the motion lands where users actually are. But it looks unattended — no commits since 2025-12-31 (~8.5 months) and the site footer still reads "VERCEL INC. // 2025". Great concept, currently not a dependency you should build on. Steal the approach; check the pulse before you adopt it.
- **Use when:** you want motion on primitives and are willing to vendor and own the code. · **Don't use when:** you need active upstream maintenance.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 2 · docs 3 · customization 4 · perf 4 · stability 2 · originality 4
- **Evidence:** `imskyleen/animate-ui` ★4,279 · last push 2025-12-31 · 239 forks · 16 open issues · 0 releases, 0 tags · NOASSERTION license · not archived · Vercel OSS Program badge on site · re-verified 2026-09-09, still silent at ~8.5 months
- **Looked at:** animate-ui.com — light gray-white, black rounded-pill buttons, headline in a rounded geometric sans, then four gray skeleton cards labeled "Primitives / Components / Icons / Soon…" in an italic script face. That script-against-geometric-sans pairing is the one clear taste misstep; otherwise the page is clean and mercifully free of gradients.
- **Vibecode risk:** medium — motion on primitives is subtle, but the defaults are shared by everyone who installs it.
- **Link:** https://animate-ui.com/

### Animata — `situational`
- **What:** MIT collection of interaction and micro-interaction components, actively maintained.
- **Verdict:** Solid, alive (last push 2026-09-06), and — now that someone has actually opened it — noticeably more disciplined than the first draft assumed. The tier survives, but for the right reason rather than the lazy one: it doesn't win a lane, because Magic UI covers more, SmoothUI has better craft and versioning, and Fancy has more originality. Reach for it when you're hunting a specific micro-interaction the others lack. The first draft ranked it without looking and hedged its vibecode score as "unverified"; that hedge is now retired.
- **Use when:** you need one specific interaction and want an MIT source. · **Don't use when:** you're choosing a primary animation layer.
- **Scores /5:** visual 4 · interaction 3 · a11y 2 · engineering 3 · maintenance 4 · docs 3 · customization 3 · perf 3 · stability 3 · originality 3
- **Evidence:** `codse/animata` ★2,788 · last push 2026-09-06 · 233 forks · MIT · 3 open issues · site advertises "155+ animated React components" · site's own star count reads "2,697+", trailing the API by ~90, so the homepage number is cached rather than live
- **Looked at:** animata.design at 1440 and 390 (screenshotted this pass) — plain white, a very large tight-tracked black Helvetica-ish two-line headline ("Ship faster. / Look better."), gray sub-copy, one violet pill CTA beside a plain outline "Star on GitHub". Nav carries a **Changelog** — rare here and a good sign. The one real blemish is a Carbon ad unit sitting directly under the hero where a product demo should be, which cheapens an otherwise clean page. Notably free of gradient, glow and badge spam; visual score raised 3 → 4 on the evidence of my own eyes.
- **Vibecode risk:** medium — the site is clean, but the component set is generic enough that its output won't read as yours either. Medium on substance now, not on ignorance.
- **Link:** https://animata.design/

### Inspira UI — `situational` (added in the 2026-09 challenge pass)

- **What:** Animated Vue/Nuxt components — effectively the Vue answer to Magic UI and Aceternity, with a paid Pro tier and a sibling headless project (Akaza UI).
- **Verdict:** The first draft covered thirteen React libraries and did not establish that the category has a Vue half, which is a real gap for anyone not on React. Inspira is the credible option there: ★4,974, MIT, 335 forks, pushed 2026-09-08 — more active than half the `strong` entries in this document. The problem is what it ported. It reproduces the Aceternity aesthetic wholesale, and its own homepage is the evidence: dark liquid-metal hero, a rainbow gradient bleeding from under the Pro button, a full-width blue scrolling marquee. Use it because you're on Vue and want maintained code, not because you want this look; you will be deleting the defaults exactly as you would with Magic UI. Also note the licensing hazard nobody flags: React Bits' Commons Clause forbids "a ported version," so any Vue library carrying ported React Bits components is on thin ice — I did not verify Inspira does this, and it should not be assumed.
- **Use when:** you're on Vue/Nuxt and need an actively maintained animation layer. · **Don't use when:** you're on React (better options above), or you intend to ship the defaults.
- **Scores /5:** visual 3 · interaction 4 · a11y 2 · engineering 4 · maintenance 5 · docs 4 · customization 3 · perf 2 · stability 4 · originality 1
- **Evidence:** `unovue/inspira-ui` ★4,974 · 335 forks · MIT · created 2024-08-30 · last push 2026-09-08 · no npm package under `inspira-ui` (registry 404 — it is copy-paste/CLI like the rest) · Pro tier advertised at "Save 50%"
- **Looked at:** inspira-ui.com at 1440 and 390 — near-black ground with a dark liquid-metal/oil-slick shader filling the viewport, "Beautiful Vue components for modern web apps" in a large white geometric sans, a rocket-emoji announcement pill, then three stacked CTAs: "Visit Docs", "Get Inspira UI Pro - Save 50%" sitting on a rainbow gradient glow, and "Hire the Creator". A bright blue marquee bar scrolls a second product across the bottom. The shader itself is genuinely well done and restrained in colour; everything layered on top of it is the 2026 tell reel.
- **Vibecode risk:** very high — this is the Aceternity look with a Vue install command.
- **Link:** https://inspira-ui.com/

### Hover.dev — `reference-only`
- **What:** Paid ($49 / $149 tiers) closed-source animated React + Tailwind components and templates.
- **Verdict:** Honest about being maximalist, and the motion engineering is legitimately good — but nothing here belongs in a product that wants to be taken seriously. It's a different failure mode from the AI-slop one: your SaaS ends up looking like a 2021 Gumroad page rather than an AI startup. Worth opening to study the interaction timing, then closing.
- **Use when:** studying interaction craft, or building something intentionally loud and personal. · **Don't use when:** anything B2B, enterprise, or trust-dependent.
- **Scores /5:** visual 2 · interaction 5 · a11y 1 · engineering 4 · maintenance 3 · docs 3 · customization 2 · perf 3 · stability 3 · originality 4
- **Evidence:** no public repo · paid, tiers of $49 and $149 observed on /pricing · site claims "Trusted by 30,000+ Devs, Agencies, & Startups" — unverified
- **Looked at:** hover.dev — periwinkle graph-paper ground, hard black offset shadows on every block, yellow cartoon stars, a "Wet Paint Button" with purple drips, and copy promising "an instant dope-ness increase of over 9000%". Neo-brutalist Memphis, executed competently and entirely on purpose.
- **Vibecode risk:** high, in a different direction — recognizable as Hover.dev, not as AI.
- **Link:** https://www.hover.dev/

### Skiper UI — `reference-only`
- **What:** Paid closed-source "un-common components" for shadcn/ui, installed via a namespaced registry.
- **Verdict:** The interactions are inventive, but two things disqualify it as infrastructure: there is no public repository to audit, fork or verify a license against, and the components are numbered rather than named (`npx shadcn add @skiper-ui/skiper40`), which is a straight admission that these are effect experiments, not a design system. Fine as inspiration.
- **Use when:** you're mining ideas for a one-off interaction. · **Don't use when:** you need auditability, naming, or long-term support.
- **Scores /5:** visual 3 · interaction 4 · a11y 1 · engineering 2 · maintenance 2 · docs 2 · customization 2 · perf 2 · stability 2 · originality 4
- **Evidence:** no public GitHub repo found · Pricing in nav · registry namespace `@skiper-ui` live
- **Looked at:** skiper-ui.com — black ground with an enormous electric-cyan liquid blob glow filling the lower two-thirds, "UN-COMMON COMPONENTS" in a heavy wide grotesque with a soft outer glow, small-caps serif eyebrow and footer line, and a copyable install string naming `skiper40`. The glow is the entire design.
- **Vibecode risk:** high.
- **Link:** https://skiper-ui.com/

## Also found in the challenge pass (shorter entries, verified but not screenshotted)

The first draft was React-only without saying so. These fill that gap and a few others. All figures pulled 2026-09-09.

- **Basecoat** — `hunvreus/basecoat` ★4,287, MIT, 139 forks, last push 2026-07-21. shadcn's component vocabulary rebuilt in plain Tailwind + a little vanilla JS, so it works in Django, Rails, Laravel, Astro or raw HTML with no React. `situational` and low vibecode risk: it is components, not effects, and there is no house style to inherit. The obvious pick when the constraint is "not React" and the goal is a product rather than a landing page.
- **Svelte Animations** — `SikandarJODD/svelte-animations` ★1,227, MIT, 52 forks, last push 2026-03-04. Describes itself in its own repo description as "Svelte Magic UI, Svelte Aceternity UI." Honest, useful if you're on Svelte, and carries both the aesthetic risk of its sources and an unresolved licensing question, since React Bits' Commons Clause explicitly names "a ported version" as prohibited. Six months since last push. `situational`, very high vibecode risk.
- **cnblocks** — `meschacirung/cnblocks` ★2,318, MIT, 225 forks, last push 2026-07-29. shadcn marketing blocks. Blocks rather than effects, which makes it a lower-risk source for page structure than 21st.dev's marketplace.
- **MVPBlocks** — `subhadeeproy3902/mvpblocks` ★836, BSD-3-Clause, 120 forks, last push 2026-08-28. Newer, smaller, explicitly aimed at shipping MVPs fast. Noted for completeness; nothing here beats the entries above.
- **HyperUI** — `markmead/hyperui` ★12,231, MIT, 513 forks, pushed 2026-09-10. Much larger than most of this document and entirely absent from it, though it sits just outside the category: static Tailwind v4 components with no animation layer. Worth knowing about precisely because it's the un-animated alternative — if the honest answer to "which effect library" is "none," this is where to go instead.

## Rejected / avoid
- **Eldora UI** — Its homepage reproduces Magic UI's copy verbatim: same headline ("UI library for Design Engineers"), same word-for-word subhead ("150+ free and open-source animated components and effects built with React, Typescript, Tailwind CSS, and Motion. Perfect companion for shadcn/ui."), same two-button pair, same tech-icon row, same composition — recolored black with a cyan-to-purple gradient on one word. Verified by screenshotting both. Still marked BETA. Repo is `karthikmudunuri/eldoraui` — ★1,962, MIT, 95 forks, 3 contributors, **last push 2026-04-18** (the first draft said 2026-03-18; corrected). Use the original.
- **UI Layouts** — Every tell stacked on one page: rainbow gradient bar with a 🚀, ✨ in a pill badge, diagonal hatch borders around the whole viewport, glowing blue buttons, a five-avatar "Trusted by 1000+ users" row with gold stars, a grammar error in the hero ("for Developer"), and a testimonial wall whose actual quoted content is "let's go! new blood", "Looking good" and "Great work dude". ★3,606, MIT, actively pushed — none of which fixes the taste.
- **Float UI** — `MarsX-dev/floatui`, ★3,591, last push 2025-03-23, roughly 18 months. Both figures re-verified exactly. The star count measures 2023-24 distribution, not present-day viability; floatui.com still returns 200, which is why it keeps appearing in listicles. Treat as dead.
- **Velora UI** — Repeatedly ranked among the "best" libraries by listicles; the repo is `ColorlibHQ/velora-ui`, created 2026-07-16, 28 stars, 6 forks, MIT, last push 2026-09-06 — every figure re-verified and exact. The publisher of those listicles (AdminLTE.IO) is the same organization. This is content marketing, not curation — a useful reminder that this whole category's "best of 2026" listicles are largely SEO artifacts.
- **Luxe (★930, last commit 2026-02-26)**, **Syntax UI (★984, 2026-05-18)**, **Indie UI** — small, single-maintainer, and offering nothing Magic UI, Motion Primitives or SmoothUI doesn't do better and maintain more actively. No reason for an agent to reach for them.

## What surprised me
- **Origin UI is gone as Origin UI.** `origin-space/originui` is now the `coss` repo, originui.com 301s to coss.com/ui, and its description reads "the official design system of Cal.com". It also carries **AGPL-3.0** — an unusual and consequential license for a library whose whole distribution model is pasting source into your app.
- **React Bits is not open source.** With 47k stars it reads as the default MIT choice; the license is MIT **+ Commons Clause**, which forbids selling, sublicensing or redistributing the components — including as a ported version or inside a template you sell.
- **21st.dev's founders left the registry behind.** The OSS repo hasn't been pushed since May 2025, while the same org shipped `magic-mcp` (5.8k stars) and `1code` (5.6k stars, an orchestration layer for Claude Code and Codex). The marketplace is alive; the open-source project is not.
- **Aceternity's own taste outgrew its components.** Its 2026 homepage is monochrome, typographically disciplined and effect-free — while the library it sells is still the source of the neon-spotlight look. The 2026 additions (Cloud Shader, Chromatic Image, Text Flipping Board) are noticeably better work than the 2024 catalogue.
- **Almost nothing in this category ships releases — and the two exceptions are the two best entries.** Verified by API this pass: Magic UI, coss/Origin UI, React Bits, Cult UI, Motion Primitives and Kokonut all report **0 releases and 0 tags**. Distribution is registry-and-paste, so there is no semver, no changelog contract and no upgrade path — once you paste, you own it forever. But the first draft overstated this into "nothing," and the exceptions are informative rather than trivial. **SmoothUI** tags real releases (`v3.7.1`, plus a separately versioned CLI). **Paper Shaders** is a genuine npm dependency with 111 published versions and 609k weekly installs. The correlation is not an accident: the two projects that treat their output as software rather than as content are also the two with the least generic results. Prefer libraries whose components are small enough to own — and prefer the ones that give you a version number even more.

## Open questions
- **Does AGPL-3.0 actually reach components pasted from coss.com/ui into a closed product?** The repo license is unambiguous; whether it is intended to bind copy-paste consumers is not stated on the site. Settled by an explicit per-component license note from the maintainers or Cal.com.
- **Real adoption numbers.** Every claim of the "trusted by 120,000+" / "30,000+ devs" variety on these sites is unverified marketing; none is backed by a public source. Settled by npm/registry install telemetry, which these projects do not publish because they don't ship packages.
- **Is Animate UI paused or abandoned?** Eight and a half months of silence plus a stale year in the footer point one way, but the Vercel OSS backing points the other. Settled by a commit, or by the maintainer saying so.
- **Aceternity component licensing.** With no public repo there is no LICENSE file to read; the free components' terms are asserted on the site only.

## Challenge pass (2026-09)

Adversarial re-verification on 2026-09-09. Every `essential`/`strong` entry was re-checked against `gh api repos/...`, the npm registry API, contributor pagination headers, release/tag endpoints and no-follow `curl` on each cited URL. Three interfaces were screenshotted fresh at 1440 and 390.

**What held up.** Most of it, and the numeric discipline of the first draft is genuinely good — several figures matched to the digit. Confirmed exactly: coss/Origin UI ★10,561 with 54 contributors and AGPL-3.0, and `originui.com` returning a literal `301 → https://coss.com/ui`; Motion Primitives ★6,255 / 27 contributors / 35 open issues; Cult UI ★6,125 / 7 contributors / 335 forks / 17 open issues; 21st.dev's ★5,447 frozen at 2025-05-28 with 130 open issues; Fancy ★3,125 / 7 contributors / 114 forks; Float UI ★3,591 last pushed 2025-03-23; Luxe ★930 at 2026-02-26; Syntax UI ★984 at 2026-05-18; Velora's ★28 repo created 2026-07-16. The React Bits licence claim — the draft's most consequential finding — was verified by reading `LICENSE.md` directly, and the Commons Clause restriction is verbatim as described, including a "ported version" prohibition the draft did not surface. Star counts had drifted 1–2 in four places (Magic UI, React Bits, Animate UI, Animata) and were refreshed. No manufactured disagreement: the Magic UI, coss, Fancy, Motion Primitives, Cult UI, React Bits, 21st.dev, Aceternity, Animate UI, Hover.dev and Skiper verdicts all survive scrutiny unchanged in tier.

**Corrections.**
1. **"Nothing in this category ships releases" was false.** SmoothUI tags real releases (`v3.7.0`/`v3.7.1`, 2026-08-02, plus `cli-v1.1.2`). Claim rewritten, and SmoothUI's stability score raised 3 → 4 — in a paste-and-own category, a version number is a differentiator.
2. **Eldora UI's last commit was 2026-04-18, not 2026-03-18.** Repo path and full stats added.
3. **Fancy Components had no repo path**, and the natural guess (`daniel-petho/fancy`) 404s. Correct path is `danielpetho/fancy`; added.

**Demotion.** **Kokonut UI `strong` → `situational`, vibecode risk `medium` → `high`.** This is the popularity-bias failure in the file, just aimed at a strategy narrative instead of a star count: the draft was persuaded by "Components humans browse. Agents ship." and let the tier ride on distribution engineering while its own prose conceded the components are "mostly effect candy." The three it names — `particle-button`, `shimmer-text`, `liquid-glass-card` — are three entries off this document's own tells list. A corpus that exists to prevent generic output cannot rank that `strong`. The registry work is still best-in-category and the entry still says so; copy the install path, not the components.

**Where the file was lazy.** **Animata** was tiered and scored with the admission "Not screenshotted," and its vibecode risk was recorded as "medium — unverified visually," which is a guess wearing a number. I screenshotted it. The site is markedly cleaner than the dismissal implied — big disciplined black headline, one violet CTA, a Changelog in the nav, no gradient or badge spam — so visual went 3 → 4 and the vibecode note is now grounded in something seen. The `situational` tier survives on the real reason: it wins no lane. Also caught: animata.design's homepage advertises "2,697+ stars" against a live count of 2,788, so its social proof is cached.

**Additions (5).**
- **Paper Shaders** at `strong` — the largest miss by far. `@paper-design/shaders-react` does **609,425 weekly npm downloads** against 671,126 for the core package, with 111 published versions under Apache-2.0. That makes it, by two orders of magnitude, the most-installed thing in this document, and the first draft did not mention it while concluding the category has no npm packages. It earns the tier on taste too: its shaders filter *your* photography rather than adding nameable decoration, which is the structural reason it doesn't read as AI-generated.
- **Inspira UI** at `situational` — the file was React-only without disclosing it. Inspira (★4,974, MIT, pushed 2026-09-08) is the Vue/Nuxt answer and is more active than several `strong` entries, but it ports the Aceternity look wholesale; screenshotted and rated very high vibecode risk on the evidence.
- **Basecoat** (★4,287, MIT) — shadcn's vocabulary for any web stack with no React at all. The low-risk non-React pick.
- **Svelte Animations** (★1,227, MIT) — self-described "Svelte Magic UI, Svelte Aceternity UI." Covers Svelte; inherits the aesthetic and a live licensing question.
- **cnblocks**, **MVPBlocks** and **HyperUI** noted in a new short-entries section — HyperUI (★12,231) especially, as the un-animated alternative for when the right answer is "no effect library at all."

**Vibecode column, hardened.** The column was already the strongest part of the file and was left intact where it was right — React Bits and Aceternity as `very high` are correctly called. Two changes: Kokonut raised to `high` (above), and four new tells added to the never-ship list, each observed directly on a site in this document rather than inferred — the liquid-metal/chrome-blob dark hero (Inspira, 21st.dev), a rainbow gradient bleeding from under a single CTA (Magic UI and Inspira, same effect in the same position on two unrelated libraries), the full-width scrolling marquee announcement bar (Inspira), and fluted-glass/halftone-dither image filters, which are excellent today and are on the Aurora trajectory now that Paper Shaders has made them a one-line install.

**Still unverified after this pass.** Every "trusted by N" figure (Aceternity's 120,000+, Hover.dev's 30,000+) remains marketing with no public source, as the draft said. Magic UI Pro's $199 and Hover.dev's $49/$149 are site-asserted and were not verified against checkout. The React Bits "#3 in JS Rising Stars" claim is still a secondary source and is left flagged. Web search budget was exhausted during this pass, so the X/Reddit/HN sweep for community-surfaced candidates was done through GitHub search and registry APIs instead; a social sweep may still turn up recent entrants this pass could not see.
