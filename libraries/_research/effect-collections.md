# Copy-paste effect & animated component collections

**Evaluated:** 2026-09 · **Researcher note:** The category split in two. The serious half (Magic UI, Origin/COSS, Kokonut, SmoothUI) rebuilt itself around agent distribution — MCP servers, `llms.txt`, namespaced shadcn registries — while the demo-candy half multiplied into near-identical clones chasing SEO. Consolidation is real: Origin UI became Cal.com's design system, 21st.dev's founders pivoted to coding-agent tooling, and Aceternity is now mostly a paid template business with a free component funnel.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Magic UI | `strong` | Best-maintained and best-documented in the category; the default look is still a tell | high |
| Origin UI (now coss.com/ui) | `strong` | 508 unstyled-ish Base UI components, zero house style — but AGPL-3.0 | low |
| Fancy Components | `strong` | The only collection with genuine typographic taste; thin and slowing down | low |
| Motion Primitives | `strong` | Restrained, well-built motion primitives from a real design engineer | low |
| SmoothUI | `strong` | Quietly excellent craft, actively shipped, official shadcn registry | low |
| Kokonut UI | `strong` | Sharpest agent-distribution story in the category; components still effect-heavy | medium |
| Cult UI | `strong` | Actual point of view + the best AI/agent UI patterns; loud house style | medium |
| React Bits | `situational` | 170+ background effects, huge reach, Commons Clause license — hero surfaces only | very high |
| Aceternity UI | `situational` | Defined the AI-startup landing aesthetic; closed source, increasingly paid | very high |
| 21st.dev | `situational` | Live commercial registry; its OSS repo has been stale 15 months and the team moved on | high |
| Animata | `situational` | Active, MIT, decent micro-interactions; nothing here is a category winner | medium |
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
- **Promising newcomer:** Kokonut UI — "Components humans browse. Agents ship." is the correct 2026 framing, and the registry is genuinely machine-readable.
- **Premium/paid worth it:** Magic UI Pro ($199 once) if you're shipping a marketing site this week. Aceternity All-Access only if you want the templates, not the components.

## Which components to actually keep

Worth keeping (they solve a real product problem): **Bento Grid**, **Marquee** (logo walls only, not content), **Number Ticker**, **Animated List / notification stack**, **Terminal**, **Dock**, **Blur Fade** (Magic UI); **AI Prompt input**, **liquid-glass card** used sparingly (Kokonut); **Dynamic Island**, **scramble-on-hover text** (SmoothUI); **Shift Card**, the AI SDK agent patterns (Cult UI); **animated Accordion / Tabs / Checkbox** (Animate UI); **Text Shimmer**, **Animated Group**, **Disclosure** (Motion Primitives); **letter-swap hover**, kinetic type (Fancy).

The exact source of the "AI-generated" look — never ship these together, and preferably not at all: **Spotlight / card-spotlight**, **animated gradient borders**, **BorderBeam**, **Meteors**, **AnimatedBeam**, **Sparkles / sparkle text**, **Retro Grid**, **Rainbow Button**, **Shimmer Button**, **Aurora / vortex / wavy backgrounds**, **3D card tilt**, **infinite testimonial marquee**, **an italic serif word inside a sans headline**. One of these in a hero is a choice; three is a signature, and it isn't yours.

## Scorecards

### Magic UI — `strong`
- **What:** 150+ MIT animated React/Tailwind/Motion components, plus a paid Pro tier of blocks and templates.
- **Verdict:** The best-run project in the category by a wide margin — real maintenance commits (lockfile refresh clearing 69 Dependabot alerts, Next security bump, dropping dead deps), 152 contributors, and docs that anticipate agents with an MCP server, `llms.txt` and a per-page "Copy Page" control. Its problem is not engineering, it's ubiquity: the Rainbow Button, Shimmer Button, BorderBeam and Meteors are load-bearing in the visual cliché this corpus exists to warn about. Take the structural components (Bento Grid, Animated List, Dock, Terminal, Number Ticker) and leave the glow.
- **Use when:** you want a well-maintained animation layer on top of shadcn/ui and you will restyle the defaults. · **Don't use when:** you paste more than two of its effects onto one page.
- **Scores /5:** visual 4 · interaction 4 · a11y 2 · engineering 4 · maintenance 5 · docs 5 · customization 4 · perf 3 · stability 4 · originality 2
- **Evidence:** ★22,241 · no tagged releases (registry-distributed) · last push 2026-09-08 · npm downloads n/a (copy-paste) · 152 contributors · MIT · Pro tier $199 one-time (seen on docs page)
- **Looked at:** magicui.design and /docs/components/bento-grid — white ground, very large tight-tracked black headline, a violet full-bleed announcement bar with a ✨, an emoji pill badge, and two CTAs sitting on a soft rainbow gradient glow: three tells above the fold. The Bento Grid demo itself is genuinely good — soft white cards, real content ("Save your files", a stack of plausible notification rows), no decoration for its own sake. Docs sidebar carries MCP and an "Open in v0" affordance.
- **Vibecode risk:** high — the defaults are individually recognizable, and unmodified Magic UI reads as "AI startup landing page" instantly.
- **Link:** https://magicui.design/

### Origin UI → coss.com/ui — `strong`
- **What:** 508 "particles" (their word for components) built on Base UI; the repo is now named `coss` and describes itself as the official design system of Cal.com.
- **Verdict:** The quiet winner on engineering and the lowest-risk aesthetically, because it has essentially no aesthetic — every preview is monochrome skeleton geometry, and the a11y comes free from Base UI rather than from hand-rolled `div`s. But the license is AGPL-3.0, which for a *copy-paste* library is a genuine hazard an agent must not gloss over: pasting AGPL source into a proprietary SaaS is not the same as depending on an MIT package. Verify licensing with counsel before it enters a closed product.
- **Use when:** you need accessible, unstyled building blocks you will theme yourself, and your licensing allows it. · **Don't use when:** you want motion — this is not an animation library — or you cannot accept AGPL-3.0.
- **Scores /5:** visual 3 · interaction 3 · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 4 · originality 2
- **Evidence:** ★10,561 · last push 2026-09-08 · 54 contributors · **AGPL-3.0** · repo renamed `origin-space/originui` → `coss`, originui.com now 301s to coss.com/ui · description states it is Cal.com's design system
- **Looked at:** coss.com/ui at 1440 and 390 — "A new, modern UI component library built on top of Base UI. Built for developers and AI." Off-white ground, one black pill button, one outline. Below it a four-column grid of cards, each a plain gray wireframe of the component with a one-line description. Not a single gradient, shadow flourish or accent color on the page. Holds up perfectly at 390px: type scales down cleanly, cards stack, nothing overflows.
- **Vibecode risk:** low — there is no house style to inherit.
- **Link:** https://coss.com/ui

### Fancy Components — `strong`
- **What:** Daniel Petho's collection of typographic, kinetic-text and physics micro-interaction components. MIT.
- **Verdict:** The only entry here made by someone whose primary instinct is design rather than effects. It is also the only one whose components are hard to identify as "from a library" once shipped, because they're compositional (letter swaps, text along a path, gravity/collision text) rather than decorative wrappers. The caveats are real: 7 contributors, no commits since 2026-03-14, and the surface is narrow — it will not furnish a product, only accent one.
- **Use when:** a hero, an about page, or an editorial surface needs personality that isn't a gradient. · **Don't use when:** you need coverage — there are no forms, tables, or navigation here.
- **Scores /5:** visual 5 · interaction 5 · a11y 2 · engineering 3 · maintenance 2 · docs 4 · customization 4 · perf 3 · stability 3 · originality 5
- **Evidence:** ★3,125 · last push 2026-03-14 (~6 months) · 7 contributors · MIT · 114 forks
- **Looked at:** fancycomponents.dev — enormous high-contrast serif ("Make your website") on plain white, body in a grotesque, with rotated white specimen cards scattered at the corners: a "Typeface alphabets" page with highlighted passages, an album collage, letters set in a circle, blue rotated type reading "YOU CAN JUST DO THINGS". Buttons are a black pill and an electric-blue pill. Zero gradient, zero glow, no dark mode at all. It reads like a type foundry site, not a component showcase — which is the point.
- **Vibecode risk:** low — using it makes a product look more specific, not less.
- **Link:** https://www.fancycomponents.dev/

### Motion Primitives — `strong`
- **What:** ibelick's set of Motion-based primitives (text effects, disclosure, animated groups, cursors) with a paid Pro tier.
- **Verdict:** The most tasteful *restraint* in the category. The homepage hero has no effect on it at all — just a headline and a real demo card showing a photograph of an Édouard-Wilfrid Buquet EB27 lamp, which tells you more about the author's judgment than any component list. Components are small, composable and unopinionated about color. The concern is momentum: still labeled beta, last commit 2026-03-19, 35 open issues.
- **Use when:** you want motion primitives to compose with, not finished effects to paste. · **Don't use when:** you need a maintained dependency with a release cadence — there isn't one.
- **Scores /5:** visual 5 · interaction 4 · a11y 3 · engineering 4 · maintenance 3 · docs 4 · customization 5 · perf 4 · stability 3 · originality 4
- **Evidence:** ★6,255 · last push 2026-03-19 (~6 months) · 27 contributors · MIT · 35 open issues · still marked "beta" on site
- **Looked at:** motion-primitives.com — white, centered, headline in a plain system-ish grotesque, two small buttons ("Explore Docs", black "Star on GitHub"), then a genuine demo card with real product photography. No badge spam, no gradient, no glow. The only decoration on the page is the content itself.
- **Vibecode risk:** low.
- **Link:** https://motion-primitives.com/

### SmoothUI — `strong`
- **What:** 130 Motion-powered drop-in components distributed as an official namespaced shadcn registry (`npx shadcn add @smoothui/…`).
- **Verdict:** Underrated relative to its 952 stars. The craft signals are specific: a floating dock on the homepage that toggles theme, sound, accent color, package manager and bundle view; a component sampler using real photography rather than gray boxes; and an actively current site (Vercel OSS footer reads 2026, not a stale year). Last commit 2026-09-02. Its component set skews micro-interaction (Dynamic Island, scramble text, clip corners) rather than background effects, which is the right side of the line.
- **Use when:** you want interaction polish installed through the shadcn CLI without adopting a house style. · **Don't use when:** you need scale — 54 forks and one primary maintainer.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 3 · originality 4
- **Evidence:** ★952 · last push 2026-09-02 · MIT · 54 forks · Vercel Open Source Software Program (badge dated 2026 on site)
- **Looked at:** smoothui.dev — off-white with a faint diagonal hatch, big black headline with the second line dropped to gray, one hot-pink button as the sole accent, a copyable install command directly under it. Right column is a live sampler: iridescent orb, a Username input, "Hover to Scramble", a "Clip Corners" chip, a video-card row with real photography. Calm, well-spaced, hierarchy instant.
- **Vibecode risk:** low — the pink is the only inherited signature and it's one token.
- **Link:** https://smoothui.dev/

### Kokonut UI — `strong`
- **What:** 100+ MIT React/Tailwind/Motion components published as a machine-readable registry with MCP, shadcn CLI and `llms.txt` entry points.
- **Verdict:** The clearest strategic thinking in the category. The homepage is literally split "For humans" (live previews) / "For agents" (`@kokonutui/particle-button ✓ installed · 1.2s`), with a copyable `npx shadcn@latest mcp init --client claude`. For a corpus that agents consume, that matters — Kokonut is the easiest of these to install correctly without a human in the loop. The components themselves are still mostly effect candy (particle-button, shimmer-text, liquid-glass-card), with `ai-prompt` the standout genuinely-useful one.
- **Use when:** an agent is assembling UI and you want a registry it can resolve unambiguously. · **Don't use when:** you're picking on component substance alone — Magic UI and Cult UI have deeper sets.
- **Scores /5:** visual 4 · interaction 4 · a11y 2 · engineering 4 · maintenance 4 · docs 4 · customization 3 · perf 3 · stability 3 · originality 3
- **Evidence:** ★2,090 · last push 2026-08-20 · 11 contributors · MIT · 132 forks · Pro tier advertised on site
- **Looked at:** kokonutui.com — pure black, white Inter-ish headline "Components humans browse." with "Agents ship." in gray beneath it, one white pill button beside a copyable terminal string. Below, a two-panel proof: human-facing component tiles on the left, an agent install log on the right, joined by a "same registry" badge. The one loud element is a hot-pink announcement bar. Restrained and confident; the dark ground is the only thing it shares with React Bits.
- **Vibecode risk:** medium — the components carry the usual glow vocabulary even though the site doesn't.
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
- **Evidence:** ★46,980 · last push 2026-09-09 · 123 contributors · **MIT + Commons Clause** (GitHub reports NOASSERTION) · 2,270 forks · #3 in JS Rising Stars 2025 (unverified secondary source)
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
- **Evidence:** ★4,278 · last push 2025-12-31 · 239 forks · 16 open issues · NOASSERTION license · Vercel OSS Program badge on site
- **Looked at:** animate-ui.com — light gray-white, black rounded-pill buttons, headline in a rounded geometric sans, then four gray skeleton cards labeled "Primitives / Components / Icons / Soon…" in an italic script face. That script-against-geometric-sans pairing is the one clear taste misstep; otherwise the page is clean and mercifully free of gradients.
- **Vibecode risk:** medium — motion on primitives is subtle, but the defaults are shared by everyone who installs it.
- **Link:** https://animate-ui.com/

### Animata — `situational`
- **What:** MIT collection of interaction and micro-interaction components, actively maintained.
- **Verdict:** Solid, alive (last push 2026-09-06), and reasonably free of the worst clichés, but it doesn't win any lane — Magic UI covers more, SmoothUI has better craft, Fancy has more originality. Reach for it when you're hunting a specific micro-interaction the others lack. Not screenshotted; ranked on evidence and set overlap only.
- **Use when:** you need one specific interaction and want an MIT source. · **Don't use when:** you're choosing a primary animation layer.
- **Scores /5:** visual 3 · interaction 3 · a11y 2 · engineering 3 · maintenance 4 · docs 3 · customization 3 · perf 3 · stability 3 · originality 3
- **Evidence:** ★2,787 · last push 2026-09-06 · 233 forks · MIT · 3 open issues
- **Looked at:** not screenshotted — tier reflects that, and the scores are evidence-based rather than seen.
- **Vibecode risk:** medium — unverified visually.
- **Link:** https://animata.design/

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

## Rejected / avoid
- **Eldora UI** — Its homepage reproduces Magic UI's copy verbatim: same headline ("UI library for Design Engineers"), same word-for-word subhead ("150+ free and open-source animated components and effects built with React, Typescript, Tailwind CSS, and Motion. Perfect companion for shadcn/ui."), same two-button pair, same tech-icon row, same composition — recolored black with a cyan-to-purple gradient on one word. Verified by screenshotting both. Still marked BETA, 3 contributors, last commit 2026-03-18. Use the original.
- **UI Layouts** — Every tell stacked on one page: rainbow gradient bar with a 🚀, ✨ in a pill badge, diagonal hatch borders around the whole viewport, glowing blue buttons, a five-avatar "Trusted by 1000+ users" row with gold stars, a grammar error in the hero ("for Developer"), and a testimonial wall whose actual quoted content is "let's go! new blood", "Looking good" and "Great work dude". ★3,606, MIT, actively pushed — none of which fixes the taste.
- **Float UI** — Last push 2025-03-23, roughly 18 months. ★3,591 measures 2023-24 distribution, not present-day viability. Treat as dead.
- **Velora UI** — Repeatedly ranked among the "best" libraries by listicles; the repo is `ColorlibHQ/velora-ui`, created 2026-07-16, 28 stars. The publisher of those listicles (AdminLTE.IO) is the same organization. This is content marketing, not curation — a useful reminder that this whole category's "best of 2026" listicles are largely SEO artifacts.
- **Luxe (★930, last commit 2026-02-26)**, **Syntax UI (★984, 2026-05-18)**, **Indie UI** — small, single-maintainer, and offering nothing Magic UI, Motion Primitives or SmoothUI doesn't do better and maintain more actively. No reason for an agent to reach for them.

## What surprised me
- **Origin UI is gone as Origin UI.** `origin-space/originui` is now the `coss` repo, originui.com 301s to coss.com/ui, and its description reads "the official design system of Cal.com". It also carries **AGPL-3.0** — an unusual and consequential license for a library whose whole distribution model is pasting source into your app.
- **React Bits is not open source.** With 47k stars it reads as the default MIT choice; the license is MIT **+ Commons Clause**, which forbids selling, sublicensing or redistributing the components — including as a ported version or inside a template you sell.
- **21st.dev's founders left the registry behind.** The OSS repo hasn't been pushed since May 2025, while the same org shipped `magic-mcp` (5.8k stars) and `1code` (5.6k stars, an orchestration layer for Claude Code and Codex). The marketplace is alive; the open-source project is not.
- **Aceternity's own taste outgrew its components.** Its 2026 homepage is monochrome, typographically disciplined and effect-free — while the library it sells is still the source of the neon-spotlight look. The 2026 additions (Cloud Shader, Chromatic Image, Text Flipping Board) are noticeably better work than the 2024 catalogue.
- **Nothing in this category ships releases.** Not one of Magic UI, React Bits, Origin UI, Cult UI or Motion Primitives publishes tagged releases or npm versions — distribution is registry-and-paste. There is no semver, no changelog contract, and no upgrade path: once you paste, you own it forever. Budget for that, and prefer libraries whose components are small enough to own.

## Open questions
- **Does AGPL-3.0 actually reach components pasted from coss.com/ui into a closed product?** The repo license is unambiguous; whether it is intended to bind copy-paste consumers is not stated on the site. Settled by an explicit per-component license note from the maintainers or Cal.com.
- **Real adoption numbers.** Every claim of the "trusted by 120,000+" / "30,000+ devs" variety on these sites is unverified marketing; none is backed by a public source. Settled by npm/registry install telemetry, which these projects do not publish because they don't ship packages.
- **Is Animate UI paused or abandoned?** Eight and a half months of silence plus a stale year in the footer point one way, but the Vercel OSS backing points the other. Settled by a commit, or by the maintainer saying so.
- **Aceternity component licensing.** With no public repo there is no LICENSE file to read; the free components' terms are asserted on the site only.
