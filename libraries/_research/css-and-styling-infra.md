# CSS architecture, styling infrastructure and modern platform CSS

**Evaluated:** 2026-09 · **Researcher note:** The runtime CSS-in-JS era is over — Emotion has not shipped `@emotion/react` since 2024-12-09, MUI's Pigment CSS repo description literally reads "Alpha phase, currently, on hold", and Next.js 16 docs still list *every* CSS-in-JS library as Client-Components-only. What replaced it is a two-layer stack: a compile-time layer (Tailwind v4, CSS Modules, vanilla-extract, Panda) plus a platform layer that got dramatically better — nesting, `:has()`, container queries and subgrid are all Baseline **widely** available as of 2026, and anchor positioning went Baseline newly-available on 2026-01-13. The crowded part is build-time CSS-in-JS (six credible options, one clear winner per runtime). The missing part is a good token layer that isn't Tailwind's — Open Props is the only serious contender and it's a one-maintainer project.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Modern platform CSS (no library) | `essential` | 2026 CSS removes most of the reason libraries existed; every agent should check Baseline before reaching for a dep. | low |
| Tailwind CSS v4 | `essential` | The correct default in 2026 — `@theme` finally makes it a real token system — but its defaults plus the shadcn/Tailwind-UI ecosystem are the single biggest source of same-looking products on the web. | **high** |
| CSS Modules | `strong` | Zero-dependency, RSC-native, refactors beautifully, and every bundler ships it. The boring right answer for app UI. | low |
| vanilla-extract | `strong` | Best type-safe token/theming engineering in the category; the `.css.ts` boundary is a real cost. | low |
| Panda CSS | `strong` | The most thoughtful token + recipe model shipped; 2.0 is in beta and stable 1.x is healthy. Small ecosystem. | low |
| Open Props | `strong` | The best free design-token set that isn't Tailwind's — genuinely tasteful ramps. One maintainer, GitHub releases stale. | medium |
| StyleX | `situational` | Meta-grade atomic engineering, deliberately constrained CSS subset. Right for a huge multi-team app, overkill otherwise. | low |
| UnoCSS | `situational` | Faster, more extensible Tailwind engine; correct in Vue/Nuxt/Astro, hard to justify against Tailwind v4 in React. | high |
| Linaria | `situational` | Mature, boring, still shipping; the zero-runtime tagged-template option outside Next. | low |
| styled-components v6/v7 | `situational` | Was in maintenance mode in 2025, is demonstrably back in 2026 with a v7 native rewrite — but still runtime, still `"use client"`. | medium |
| Griffel | `situational` | Correct only if you are already in Fluent UI v9. | low |
| next-yak | `experimental` | The only credible "styled-components syntax, real RSC support" path; Rust/SWC, production-backed, 582 stars. | low |
| css-hooks | `experimental` | Genuinely novel: inline styles + pseudo-classes, no build step, no runtime. Tiny adoption. | low |
| Pico CSS | `situational` | Excellent for docs/admin/prototypes where nobody will design anything. Immediately recognizable. | **high** |
| Emotion | `avoid` | No release of the main package in ~21 months; Next.js still lists it under "working on support". | — |
| Pigment CSS | `avoid` | MUI's own repo says on hold. Do not build on it. | — |
| Master CSS | `avoid` | `latest` on npm is 1.37.8 from 2022-12-01. Version story is a mess. | — |
| Water.css | `avoid` | Last pushed 2024-02-11. Superseded by ~30 lines of modern CSS. | — |
| Sakura | `reference-only` | A 2016 3kB stylesheet. Read it, do not depend on it. | — |
| Tokenami | `avoid` | Interesting idea, docs site returns a Vercel `DEPLOYMENT_NOT_FOUND` 404 as of 2026-09-09. | — |

## Recommendations by need
- **Default choice:** Tailwind CSS v4 for greenfield React/Next work — because `@theme` turns it into a CSS-variable token system, container queries and P3 color are built in, and the Oxide engine makes rebuilds effectively free. Pair it with a *replaced* theme, not the stock one.
- **Best engineering:** vanilla-extract. Typed themes, `createTheme`/`createThemeContract`, sprinkles for atomic output, static `.css` files, no runtime, works in RSC. StyleX is the close second and wins at Meta scale.
- **Best visual quality out of the box:** Open Props. Its shadow, easing and color ramps are hand-tuned by a designer (Adam Argyle) rather than generated, and they read as designed rather than as "a scale."
- **Best accessibility:** Pico CSS — it styles `[aria-invalid]`, native form validation and focus states correctly with zero classes, which is more than most component libraries manage. (Nothing in this category is an a11y solution; this is the least-bad default.)
- **Most customizable / least house-style:** CSS Modules + your own tokens, or Panda CSS if you want types. Neither ships an opinion about what anything looks like.
- **Lightest:** css-hooks — no build step, no runtime, output is native inline styles plus one small static stylesheet.
- **Promising newcomer:** next-yak. styled-components syntax compiled away by a Rust SWC plugin, full RSC support, and real production usage behind it.
- **Premium/paid worth it:** Tailwind Plus (formerly Tailwind UI) — but as a *reference for spacing and state coverage*, not as shipped markup. Paste it verbatim and you have built the same site as ten thousand other people.

## Scorecards

### Modern platform CSS (no library) — `essential`
- **What:** Native CSS in 2026: nesting, `:has()`, container queries, cascade layers, `@scope`, `@property`, `oklch()`/`color-mix()`, `light-dark()`, subgrid, anchor positioning, `popover`, view transitions, `dvh/svh/lvh`, `text-wrap: balance`, `field-sizing`.
- **Verdict:** This is the largest change in the category and most codebases have not absorbed it. Nesting reached Baseline **widely available** on 2026-06-11 and `:has()` on 2026-06-19, which means Sass's two biggest remaining jobs are now browser features. Cascade layers (widely available since 2024-09-14) solve the specificity problem that atomic CSS was partly invented to route around. An agent that writes a `useFloating` hook in 2026 instead of `anchor-name`/`position-area` is adding 12kB to reimplement a browser feature. The honest caveat: "Baseline newly available" is not "safe" — it means the feature landed in all three engines but old installs persist, so `@supports` still earns its place for anything shipped in the last 18 months.
- **Use when:** always — check Baseline first, then decide whether you still need the dependency. · **Don't use when:** you must support Safari < 16.4 or an embedded WebView; then you are on a 2022 CSS budget and most of this table is unavailable.
- **Scores /5:** visual 5 · interaction 4 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 5 · stability 4 · originality 5
- **Evidence:** Baseline dates verified against the `web-features` dataset v3.37.0 (2026-09), not from memory. Current stable browsers at time of check: Chrome/Edge 152, Firefox 155, Safari 26.6. See the support table below.
- **Looked at:** N/A — verified from `web-features` v3.37.0 `data.json` rather than a marketing page.
- **Vibecode risk:** low — the platform has no house style.
- **Link:** https://web.dev/baseline · https://developer.mozilla.org/en-US/docs/Web/CSS

### Tailwind CSS v4 — `essential`
- **What:** Utility-first CSS framework. v4 replaced the JS config with CSS-first `@theme`, rewrote the engine in Rust (Oxide, on Lightning CSS), moved the default palette to `oklch`, and built container queries in.
- **Verdict:** Technically excellent, hugely popular, and the honest answer on design is uncomfortable: **Tailwind does not impose a look, but Tailwind's defaults plus its copy-paste ecosystem absolutely do.** I scrolled tailwindcss.com/showcase and the top of the market refutes the strong claim — Gumroad is magenta neo-brutalist with hard black borders, Greptile is a cream editorial page with an engraved-iguana illustration, Supabase is black-and-neon-green, Clerk is warm off-white. These do not look alike. But the median Tailwind output does, because `rounded-lg border bg-white p-6 shadow-sm` with `slate-*` neutrals is the path of least resistance and shadcn/ui made it a convention. The second honest problem is architectural: atomic CSS has no cascade story, so the ecosystem needs `tailwind-merge` (71.8M weekly) and `class-variance-authority` (54.3M weekly) just to build a component library — two dependencies whose entire job is patching a hole the approach created. Refactorability at scale is the weakest axis: a class string is the design decision, so there is no single place to change one. v4's `@theme` fixes half of this by making tokens real CSS variables; the *usage* is still literal.
- **Use when:** React/Next greenfield, an agent-generated codebase, or any team that needs to move fast with consistent spacing. · **Don't use when:** you must support Safari < 16.4 / Chrome < 111 / Firefox < 128; or when the product's whole value is a distinctive visual identity and the team has no design capacity to override the theme.
- **Scores /5:** visual 3 · interaction 3 · a11y 3 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 5 · stability 5 · originality 3
- **Evidence:** ★97,486 · last release v4.3.3 2026-07-16 · last push 2026-09-08 · 110,850,620 wk npm · 344 contributors · MIT · 65 open issues. Min browsers per official compatibility docs: Chrome 111, Safari 16.4, Firefox 128. v4 build numbers from the v4.0 announcement: full build 378ms → 100ms, incremental with no new CSS 35ms → 192µs.
- **Looked at:** https://tailwindcss.com/docs/theme (1440 + 390) and https://tailwindcss.com/showcase. Docs are a three-column editorial layout with diagonal-hatch gutter rules flanking the content column, letterspaced mono eyebrows ("CORE CONCEPTS"), and dark slate code blocks with a cyan left-border marking changed lines — hierarchy from weight and size alone, no shadows anywhere in the chrome. At 390px it collapses to a brand bar plus a breadcrumb bar, body text at ~17px/1.75 on a ~34ch measure; nothing is a shrunken desktop. `tailwindcss.com/plus` sits behind a sign-in whose form is the house style distilled: 1px `#d1d5db` inputs at ~8px radius, near-black fully-rounded primary, label-above-field, faint hatched grid rules. Restrained and completely generic — which is the point and the problem.
- **Vibecode risk:** **high** — the stock `slate`/`zinc` neutrals, the 4px spacing base, `rounded-xl`, `shadow-lg` and gradient CTAs are a recognizable fingerprint. Mitigation is mechanical: overwrite `--color-*`, `--radius-*` and `--shadow-*` in `@theme` before writing a single component.
- **Link:** https://tailwindcss.com

### CSS Modules — `strong`
- **What:** Locally-scoped class names compiled from plain `.module.css`. Native in Vite, Next.js, Parcel and Rspack; `css-loader` for webpack.
- **Verdict:** The most underrated option in 2026 precisely because it is not a product. It is real CSS, so every platform feature above works immediately with no plugin, no escape hatch and no `@apply`. It emits static stylesheets, so it works in Server Components without a registry. It refactors better than anything else here because the styles live in a file you can delete. The cost is honest: no type safety on class names without `typed-css-modules`, no token layer (bring Open Props or your own `@theme`-less variables), and composition across files is clumsy. Pair it with cascade layers and you have an architecture that will still compile in 2031.
- **Use when:** app UI, design systems, anything you expect to still be editing in three years. · **Don't use when:** you want type-checked tokens (use vanilla-extract) or utility velocity (use Tailwind).
- **Scores /5:** visual 5 · interaction 5 · a11y 5 · engineering 4 · maintenance 5 · docs 3 · customization 5 · perf 5 · stability 5 · originality 2
- **Evidence:** No single upstream package — bundler-native. `css-loader` 25,667,204 wk npm as a proxy for the webpack path. Lightning CSS (the transformer Vite and Tailwind Oxide both use) at 128,637,814 wk npm.
- **Looked at:** N/A — no canonical site to judge; the approach has no house style by construction.
- **Vibecode risk:** low — it renders whatever you write.
- **Link:** https://github.com/css-modules/css-modules

### vanilla-extract — `strong`
- **What:** "Zero-runtime stylesheets in TypeScript." Write `.css.ts`, get static `.css` at build time, with typed themes and a typed token contract.
- **Verdict:** The best *engineering* in the build-time CSS-in-JS lane. `createThemeContract` gives you a token interface that a second theme must satisfy or the build fails — nothing else here catches a missing dark-mode token at compile time. `sprinkles` (809k wk npm on its own) gives you atomic output with typed props if you want Tailwind's compression without Tailwind's strings. The real cost is the `.css.ts` file boundary: styles cannot read component state, so every dynamic value goes through a CSS variable, and the mental model is a step further from CSS than CSS Modules. Adoption is solid and stable rather than growing.
- **Use when:** a design system with multiple themes/brands, TypeScript-heavy teams, Remix/Vite/Next. · **Don't use when:** the team resents indirection, or you need styles that vary continuously with JS state.
- **Scores /5:** visual 5 · interaction 4 · a11y 5 · engineering 5 · maintenance 4 · docs 4 · customization 5 · perf 5 · stability 5 · originality 4
- **Evidence:** ★10,423 · `@vanilla-extract/css` 1.21.2 published 2026-07-27 · last push 2026-08-27 · 2,434,980 wk npm · 137 contributors · MIT · 74 open issues. Listed by Next.js as App Router-supported.
- **Looked at:** https://vanilla-extract.style — flat mint `#ccf7e5` ground, a cupcake emoji as the mark, and an italic slab-serif display face that is a genuinely distinctive typographic choice in a category of grotesks. The hero code panel deliberately renders a TypeScript *error* — `vars.color.brandd` and `vars.space.large` under red squiggles — which is the smartest thing on any site in this research: the whole pitch is "your typo is a compile error," demonstrated rather than claimed. Black pill CTA, white outline secondary, a diagonal white wedge cutting the bottom edge. Confident.
- **Vibecode risk:** low — no defaults, no look.
- **Link:** https://vanilla-extract.style

### Panda CSS — `strong`
- **What:** Build-time CSS-in-JS from the Chakra team. Typed style props, recipes/slot recipes, design tokens with semantic layers, cascade-layer output, atomic CSS.
- **Verdict:** The best *token and variant model* anyone has shipped — semantic tokens that resolve per-condition, recipes that produce real variant APIs, and multi-brand theming that is documented rather than improvised (their June 2026 "Building a Multi-Brand Design System" post is the reference I'd hand a team). Repo health is the quiet standout: 7 open issues against 6,187 stars is exceptional triage discipline. Two caveats. First, it needs a codegen step, so the DX is "run `panda codegen` and commit the output," which teams find annoying. Second, 404k weekly downloads is small — you will be the first person to hit some integration bugs. 2.0 has been in beta since at least 2026-09-08 with no announced stable date.
- **Use when:** you want typed variants and multi-brand tokens without leaving CSS-in-JS ergonomics. · **Don't use when:** you need a large ecosystem, or the codegen step is a dealbreaker for your CI.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 5 · maintenance 4 · docs 5 · customization 5 · perf 5 · stability 4 · originality 4
- **Evidence:** ★6,187 · `@pandacss/dev` 1.12.1 published 2026-09-04; `2.0.0-beta.16` 2026-09-08 · last push 2026-09-10 · 404,438 wk npm · 177 contributors · MIT · **7 open issues**. Listed by Next.js as App Router-supported.
- **Looked at:** https://panda-css.com — flat `#ffe14d` yellow ground, neo-brutalist black-outlined buttons with no shadow, a huge black "panda" wordmark set in a tight geometric grotesk, an illustrated mascot, and a feature-word marquee along the bottom edge. It's a brand site, not a UI demo, and that's consistent: Panda ships no look at all, so it has nothing to show you.
- **Vibecode risk:** low — no default aesthetic ships.
- **Link:** https://panda-css.com

### Open Props — `strong`
- **What:** A set of ~350 CSS custom properties — colors, sizes, fluid sizes, shadows, easings, animations, gradients, borders, aspect ratios — importable as plain CSS or as PostCSS-inlined values.
- **Verdict:** The only free token set here that was clearly *designed* rather than generated. The shadow ramp is layered (multiple stacked shadows per step) instead of one flat blur, the easings include spring and squish curves that most teams never write, and the `--motionOK` media query custom-property idiom is a genuinely useful pattern. It composes with anything, including Tailwind. The maintenance picture is the honest caveat: GitHub releases stopped at v1.6.0 (2023-09-29) while npm is on 1.7.23 (2026-01-31), the repo has 62 contributors but is effectively one person's project, and the site advertises deprecations "in v2" for a v2 that has no announced timeline.
- **Use when:** you want a credible token floor under CSS Modules or plain CSS without inheriting a framework's look. · **Don't use when:** you need vendor-scale maintenance guarantees.
- **Scores /5:** visual 5 · interaction 4 · a11y 4 · engineering 4 · maintenance 3 · docs 4 · customization 5 · perf 5 · stability 4 · originality 5
- **Evidence:** ★5,512 · npm `open-props` 1.7.23 published 2026-01-31 · last GitHub release v1.6.0 2023-09-29 · last push 2026-08-11 · 23,452 wk npm · 62 contributors · MIT · 77 open issues.
- **Looked at:** https://open-props.style — light `#f7f8fa` ground; a heavy grotesk display headline with a magenta→purple gradient fill; three checkbox glyphs in three different accent colors (purple, pink, orange) which is the one careless moment on the page. The code panels are white cards with soft ambient shadows and glowing token colors, and they demo the library's own values (`--radius-2`, `--size-fluid-3`, `--shadow-2`, `--animation-fade-in`, `@media (--motionOK)`) rather than generic snippets. Namespace strip along the bottom: Colors, Gradients, Shadows, Aspect Ratios, Typography, Easing, Animations, Sizes, Borders, Z-Index, Media Queries, Masks, Durations.
- **Vibecode risk:** medium — the gradient set and the `--shadow-*` ramp are distinctive enough to spot in the wild if used unaltered.
- **Link:** https://open-props.style

### StyleX — `situational`
- **What:** Meta's atomic, compile-time styling system. Typed style objects, deterministic last-wins merging, atomic class output, an explicitly constrained CSS subset (no complex selectors).
- **Verdict:** Best-in-class for the problem it was built for: thousands of engineers editing one app where style collisions and specificity wars are the actual bottleneck. "The last style applied always wins" with no specificity to reason about is a genuinely strong guarantee, and per Meta's own announcement it runs Facebook, WhatsApp, Instagram, Workplace and Threads. The constraints are the point and also the trap — the deliberately restricted CSS subset means some things you'd write in one line of CSS need a workaround, and 242 open issues against 130 contributors suggests the long tail is wide. At 0.19.0 after nearly four years it is still pre-1.0, and the last release was 2026-06-16, which is a slower cadence than the repo activity implies.
- **Use when:** a very large React app with many teams and a real specificity problem; or you want atomic CSS with types and no class strings. · **Don't use when:** a small team, a marketing site, or anything needing expressive selectors.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 5 · maintenance 4 · docs 4 · customization 4 · perf 5 · stability 3 · originality 4
- **Evidence:** ★10,248 · `@stylexjs/stylex` 0.19.0 published 2026-06-16 · last push 2026-09-10 · 1,461,987 wk npm · 130 contributors · MIT · 242 open issues. Used at Facebook, WhatsApp, Instagram, Workplace, Threads per Meta's own launch post.
- **Looked at:** https://stylexjs.com — near-black `#0b0b0d` ground on Docusaurus bones (the search field and theme toggle give it away). A chrome-orbit logo lockup that reads as 2010s enterprise, a rotating-word headline, and two CTAs — lavender and periwinkle, same size, same weight, black label text — so neither is primary and the contrast is weak for a dark page. Enormous dead space above and below the hero; the fold is two-thirds empty. Functional, not designed. Evidence and taste disagree here and the engineering wins.
- **Vibecode risk:** low — no visual defaults.
- **Link:** https://stylexjs.com

### UnoCSS — `situational`
- **What:** An atomic CSS *engine* with no built-in utilities — everything comes from presets, including `preset-wind3` (Tailwind 3 / Windi compatible) and `preset-wind4` (Tailwind 4 compatible).
- **Verdict:** Faster and far more extensible than Tailwind — custom rules are regex-plus-function, variants are composable, and it runs in the browser at runtime if you want that. It is the right default in the Vue/Nuxt/Astro world where it is genuinely idiomatic. In React in 2026 it is harder to justify: Tailwind v4's Oxide engine erased most of the speed argument, and UnoCSS explicitly does not support Tailwind's plugin system or config, so you gain extensibility and lose the ecosystem. Note also that its own "why" page still frames compatibility around Wind3; `preset-wind4` exists and ships in the same 66.10.1 release but is documented as "compact," so treat v4 parity as partial until you test your utility set.
- **Use when:** Vue/Nuxt/Astro, or you need custom atomic rules Tailwind can't express, or you want CDN-runtime atomic CSS. · **Don't use when:** React/Next with an existing Tailwind ecosystem dependency (shadcn, Tailwind Plus, plugins).
- **Scores /5:** visual 3 · interaction 3 · a11y 3 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 4 · originality 4
- **Evidence:** ★18,950 · `unocss` 66.10.1 published 2026-09-09 · last push 2026-09-09 · 346,494 wk npm · 408 contributors · MIT (npm manifest; GitHub reports NOASSERTION because the VSCode extension carries a separate LICENSE) · 141 open issues. Their own claims on the homepage: "5x faster than Windi CSS or Tailwind CSS JIT", "~6kb min+brotli".
- **Looked at:** https://unocss.dev — VitePress default theme, unmodified: the Guide/Integrations/Config/Presets/Resources nav, version dropdown, and the soft brand-gradient blob behind the logo are all stock. One cyan `#06b6d4` pill CTA against three grey pills of identical size and weight, so hierarchy is carried by fill color alone. Feature grid in `#f6f6f7` tiles at ~12px radius, borderless, icon-in-rounded-square. Competent and entirely Vue-ecosystem generic.
- **Vibecode risk:** high — using `preset-wind*` means you inherit Tailwind's scale and therefore Tailwind's fingerprint, one layer removed.
- **Link:** https://unocss.dev

### Linaria — `situational`
- **What:** Zero-runtime CSS-in-JS with tagged templates, now built on `wyw-in-js`. Sponsored by Callstack.
- **Verdict:** The boring, mature option: familiar CSS syntax with Sass-like nesting, dynamic prop styles compiled down to CSS variables, real stylelint support, and an `@linaria/atomic` mode. It shipped 8.2.0 in 2026-08 and remains actively maintained by a company with a commercial interest, which puts it ahead of Emotion and Pigment on the only axis that matters for infrastructure. Airbnb published a migration writeup that the README still links to (not independently re-verified in 2026). Where it loses is discoverability and bundler setup — you configure `wyw-in-js` per bundler, and Next.js does not list Linaria in its App Router guidance, so RSC support is something you validate yourself.
- **Use when:** you like tagged-template CSS, are on Vite/webpack/Rollup, and want zero runtime. · **Don't use when:** Next.js App Router is your target — use next-yak or CSS Modules instead.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 4 · docs 3 · customization 5 · perf 5 · stability 4 · originality 3
- **Evidence:** ★12,349 · `linaria` 8.2.0 published 2026-08-10 · last push 2026-08-10 · `@linaria/core` 395,193 wk npm · 144 contributors · MIT · 72 open issues.
- **Looked at:** N/A — did not screenshot; the project has no marketing site distinct from the GitHub README, which is a badge wall.
- **Vibecode risk:** low.
- **Link:** https://github.com/callstack/linaria

### styled-components (v6, v7 prerelease) — `situational`
- **What:** The original tagged-template CSS-in-JS library for React and React Native.
- **Verdict:** **The reputation is out of date and this is the correction that matters most in this file.** It was declared to be in maintenance mode in early 2025 (via an Open Collective update; two GitHub issues in April and October 2025 asked for it to be stated in the README). As of 2026-09 that is no longer true: 6.5.3 shipped 2026-08-15, there are v7 prereleases dated 2026-09-08, and the merged PR titles describe a "native engine rewrite, modern CSS polyfills, React 19 + RN 0.85 floors." 27 open issues against 41k stars is an unusually clean tracker. What has *not* changed is the architecture: it is a runtime library, it needs `"use client"` and a `useServerInsertedHTML` registry in the App Router, and it will never be free in a Server Component. Excellent for React Native, where the RSC objection does not exist and v7's `env(safe-area-inset-*)` work is real progress.
- **Use when:** React Native, or an existing large styled-components codebase you should not rewrite. · **Don't use when:** greenfield React web in 2026 — next-yak gives you the same syntax with build-time extraction.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 3 · maintenance 4 · docs 4 · customization 5 · perf 2 · stability 4 · originality 3
- **Evidence:** ★41,101 · 6.5.3 published 2026-08-15; `7.0.0-prerelease-20260908195050` 2026-09-08 · last push 2026-09-08 · 9,526,586 wk npm · 344 contributors · MIT · 27 open issues. Maintenance-mode issues: #5573 (2025-04-03), #5614 (2025-10-23). Blog: "Celebrating a Decade of styled-components — We're so back!", Evan Jacobs, 2026-04-10.
- **Looked at:** https://styled-components.com — fetched, no maintenance banner present; the only 2026-dated post is the decade retrospective.
- **Vibecode risk:** medium — no visual defaults, but its ergonomics encourage per-component ad-hoc values instead of a token layer, which produces drift rather than sameness.
- **Link:** https://styled-components.com

### Griffel — `situational`
- **What:** Microsoft's atomic CSS-in-JS engine; the styling layer under Fluent UI v9.
- **Verdict:** Well-engineered atomic output with build-time extraction available, and the 422k weekly downloads are almost entirely Fluent UI's traffic rather than independent adoption. That is the whole verdict: it is a good engine with no reason to be chosen on its own merits over vanilla-extract or Panda unless you are already inside the Fluent ecosystem, where it is obviously correct. 45 contributors and no GitHub releases published (versions ship via npm only) makes it hard to track from the outside.
- **Use when:** you are building on Fluent UI v9 / Microsoft 365 surfaces. · **Don't use when:** anywhere else.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 4 · docs 3 · customization 4 · perf 5 · stability 4 · originality 3
- **Evidence:** ★1,281 · `@griffel/react` 1.7.7 published 2026-08-03 · last push 2026-09-09 · 422,758 wk npm · 45 contributors · MIT · 52 open issues · no GitHub releases published. `@fluentui/react-components` is listed in the Next.js App Router CSS-in-JS guide.
- **Looked at:** N/A — did not screenshot; Griffel has no visual surface of its own, only Fluent UI's.
- **Vibecode risk:** low on its own; high in practice, because choosing it usually means shipping Fluent's very recognizable Microsoft look.
- **Link:** https://griffel.js.org

### next-yak — `experimental`
- **What:** Build-time CSS-in-JS via a Rust SWC plugin. You write styled-components syntax; it emits static CSS with a minimal class-swapping runtime.
- **Verdict:** The most interesting thing I found in this category. It is the only credible answer to "we have 4,000 styled-components and we need Server Components" that does not require rewriting every file. It supports Next.js on both Webpack and Turbopack, Vite 7+ (including Vite 8 with OXC), Rsbuild 2+ and Storybook, claims 8 total dependencies including transitives, and is sponsored and used in production by Digitec Galaxus, Switzerland's largest e-commerce platform, "across thousands of styled components" (their claim). The risks are real: 582 stars, 15.8k weekly downloads, 27 contributors, and a hard version-lock table tying each major to a specific `swc_core` and Next.js floor — an SWC bump can strand you. Treat it as a strategic bet with a documented exit (the syntax is styled-components, so falling back is not a rewrite).
- **Use when:** migrating a styled-components codebase to RSC, or you want that authoring model with zero runtime. · **Don't use when:** you need a large community, or you cannot tolerate coupling to an SWC plugin version.
- **Scores /5:** visual 2 · interaction 4 · a11y 4 · engineering 5 · maintenance 4 · docs 3 · customization 5 · perf 5 · stability 3 · originality 5
- **Evidence:** ★582 · `next-yak` 9.9.0 published 2026-09-02 · last push 2026-09-08 · 15,819 wk npm · 27 contributors · MIT · 27 open issues · repo lives in the `DigitecGalaxus` org.
- **Looked at:** https://yak.js.org — and the design is the weak part. The "Next-Yak" headline is set as hollow outline type in pale coral on a `#f5f5f5` ground and is genuinely hard to read; the mascot is a sticker-style illustration that reads as generated; the intro paragraph turns every proper noun (Rust, RSC, Next.js, Vite, Storybook) into a coral link so the copy becomes a field of hotspots; and the two CTAs are identical outline pills with no primary. The code sample is clear and the "Performance" section follows immediately. Evidence and taste disagree, and here I'd trust the engineering — it just needs a designer.
- **Vibecode risk:** low — no visual defaults.
- **Link:** https://yak.js.org

### css-hooks — `experimental`
- **What:** Native inline styles extended with pseudo-classes, media/container queries and selector logic, via a small static stylesheet of CSS-variable "hooks." No build step, no runtime.
- **Verdict:** The most original idea in the category. Because the output is a real `style` attribute, it works in Server Components, in email-adjacent contexts, and in any framework with no bundler configuration whatsoever — the docs demo `style={pipe({ background: "oklch(45.76% 0.18 265)", ... })}`. The trade-off is the one inline styles always had: no cascade, no `!important` escape, and every element carries its own declarations, so payload grows with markup rather than with your design system. At 608 stars, 2,251 weekly downloads and 7 contributors it is a side-surface bet, not infrastructure — and v4 has been in `next.29` prereleases, so the API is not settled.
- **Use when:** a small app, a widget, or an RSC-heavy surface where you want conditional styling with zero tooling. · **Don't use when:** a large design system, or anywhere HTML size matters.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 3 · docs 4 · customization 4 · perf 3 · stability 2 · originality 5
- **Evidence:** ★608 · `@css-hooks/react` 3.1.2 published 2026-05-13; `v4.0.0-next.29` 2026-09-08 · last push 2026-09-08 · 2,251 wk npm · 7 contributors · MIT · 2 open issues.
- **Looked at:** https://css-hooks.com — white-to-lavender vertical wash, a two-weight purple `#5b2a86` display headline ("CSS power." bold / "Inline style simplicity." light) that sets hierarchy well, a solid purple primary and a white hairline-bordered ghost of identical width so the pairing reads slightly flat. Below the fold, a labeled "Pseudo-classes" demo card pairs live code with a rendered result. Plain, honest, well-proportioned; no effects doing work that structure should do.
- **Vibecode risk:** low.
- **Link:** https://css-hooks.com

### Pico CSS — `situational`
- **What:** Classless/minimal CSS framework that styles semantic HTML elements directly. ~10 conditional themes, native form-state styling.
- **Verdict:** The best classless framework, and the only one still meaningfully maintained. It earns its place on accessibility: it styles `[aria-invalid]`, native validation states and focus rings correctly out of the box, which is more than most component libraries manage. But its default aesthetic is competent-generic — the site is its own demo, and what you get is a system-ui stack, a `#0172ad` primary, ~4px radii and Bootstrap-adjacent proportions. It is instantly recognizable to anyone who has seen it, so use it where nobody will design anything. Maintenance is the caveat: v2.1.1 shipped 2025-03-15 and the last push was 2026-05-09 — sixteen months without a release.
- **Use when:** internal tools, docs sites, prototypes, an HTMX or server-rendered app with no design budget. · **Don't use when:** a product with any visual identity ambition.
- **Scores /5:** visual 3 · interaction 3 · a11y 5 · engineering 4 · maintenance 3 · docs 4 · customization 3 · perf 5 · stability 4 · originality 3
- **Evidence:** ★16,847 · `@picocss/pico` 2.1.1 published 2025-03-15 · last push 2026-05-09 · 35,057 wk npm · 61 contributors · MIT · 126 open issues.
- **Looked at:** https://picocss.com — the site is styled by Pico, so it is the honest demo. A magenta→navy gradient headline is the one non-default flourish; below it a `#0172ad` blue primary and a near-black secondary at ~4px radius, then a live form-validation card showing a red-bordered input with a `!` glyph and red helper text. The form states are the good part. Everything else is 2020-vintage default.
- **Vibecode risk:** **high** — a Pico site announces itself in one glance.
- **Link:** https://picocss.com

## Platform CSS support — Baseline as of 2026-09
Verified against the `web-features` dataset v3.37.0 (2026-09). Current stable: Chrome/Edge 152, Firefox 155, Safari 26.6.

**Baseline widely available** (30+ months in all engines — ship without `@supports`):
| Feature | Widely since | Floor |
|---|---|---|
| Container queries (size) | 2025-08-14 | Chrome 105 · FF 110 · Safari 16 |
| Cascade layers (`@layer`) | 2024-09-14 | Chrome 99 · FF 97 · Safari 15.4 |
| `oklch()` / `oklab()` | 2025-11-09 | Chrome 111 · FF 113 · Safari 15.4 |
| `color-mix()` | 2025-11-09 | Chrome 111 · FF 113 · Safari 16.2 |
| `dvh` / `svh` / `lvh` | 2025-06-05 | Chrome 108 · FF 101 · Safari 15.4 |
| Subgrid | 2026-03-15 | Chrome 117 · FF 71 · Safari 16 |
| CSS Nesting | 2026-06-11 | Chrome 120 · FF 117 · Safari 17.2 |
| `:has()` | 2026-06-19 | Chrome 105 · FF 121 · Safari 15.4 |

**Baseline newly available** (all three engines, but old installs persist — `@supports` or a fallback still earns its place):
| Feature | Newly since | Floor |
|---|---|---|
| `text-wrap: balance` | 2024-05-13 | Chrome 114 · FF 121 · Safari 17.5 |
| `light-dark()` | 2024-05-13 | Chrome 123 · FF 120 · Safari 17.5 |
| `@property` (registered custom props) | 2024-07-09 | Chrome 85 · FF 128 · Safari 16.4 |
| `@starting-style` / `transition-behavior` | 2024-08-06 | Chrome 117 · FF 129 · Safari 17.4–17.5 |
| `backdrop-filter` | 2024-09-16 | Chrome 76 · FF 103 · Safari 18 |
| Relative color syntax | 2024-09-16 | Chrome 125 · FF 128 · Safari 18 |
| `scrollbar-gutter` | 2024-12-11 | Chrome 94 · FF 97 · Safari 18.2 |
| `popover` attribute | 2025-01-27 | Chrome 116 · FF 125 · Safari 17 (iOS 18.3) |
| View transitions (same-document) | 2025-10-14 | Chrome 111 · FF 144 · Safari 18 |
| **Anchor positioning** (core) | **2026-01-13** | Chrome 125 · FF 147 · Safari 26 |
| `@scope` | 2026-03-24 | Chrome 143 · FF 146 · Safari 26.4 |
| `contrast-color()` | 2026-04-10 | Chrome 147 · FF 146 · Safari 26 |
| Container **style** queries | 2026-05-19 | Chrome 111 · FF 151 · Safari 18 |
| `field-sizing` | 2026-06-16 | Chrome 123 · FF 152 · Safari 26.2 |

**Not Baseline — do not rely on these:**
- **Scroll-driven animations** — Chrome 115, Safari 26; **no Firefox**. Progressive enhancement only.
- **`text-wrap: pretty`** — Chrome 130, Safari 26; **no Firefox**. (`text-wrap: balance` is the safe one.)
- **`line-clamp` (unprefixed)** — supported nowhere; keep using `-webkit-line-clamp` with `-webkit-box-orient: vertical`.
- **Masonry / `display: grid-lanes`** — shipped in no engine. Still unsettled in CSS Grid 3.
- **`if()`** — Chrome 137 only. **Customizable `<select>`** — Chrome 135 only. **Scroll markers / CSS carousel** — Chrome 135 only. **`corner-shape`** — Chrome 139 only. **`reading-flow`** — Chrome 137 only. **`interpolate-size`** — Chrome only. All Chrome-exclusive; treat any agent that emits these as unsupported-by-default as a bug.
- **`accent-color`** — not Baseline: Safari only shipped it in 26.2.
- Caveat on anchor positioning: `web-features` marks the *aggregate* feature not-Baseline because of one lagging sub-key (`position-anchor` shows Chrome/FF 151 and no Safari in current BCD), while `anchor-name`, `anchor()`, `position-area`, `position-try-fallbacks` and `@position-try` are all Baseline newly available since 2026-01-13. In practice the core pattern is shippable with a fallback; verify the exact sub-feature you use.

## Rejected / avoid
- **Emotion** — `avoid` for new work. `@emotion/react` 11.14.0 was published **2024-12-09**; the last commit on the default branch is **2025-11-04**; there are 394 open issues and 85 open PRs. Next.js's CSS-in-JS guide (Next 16.3.4, updated 2026-03-24) still lists Emotion under "currently working on support," pointing at issue #2928. 18M weekly downloads is inertia from MUI v5 and old apps, not health. Migrate off it; do not start on it.
- **Pigment CSS** — `avoid`. The repo's own GitHub description reads "⚠️ Alpha phase, currently, on hold." Latest is 0.0.31 (2026-05-22) after ~2.5 years, with 148 open issues. MUI's zero-runtime plan is stalled; building on it is building on an announcement.
- **Master CSS** — `avoid`. npm `latest` is **1.37.8 published 2022-12-01** while the repo was pushed 2026-09-07, meaning the v2 line ships under a non-default tag. 1,157 weekly downloads. Whatever the merits of the markup-driven syntax, an agent cannot reason about a project whose `latest` tag is four years stale.
- **Water.css** — `avoid`. Last push **2024-02-11** (19 months). Superseded by `light-dark()`, `color-scheme` and ~30 lines of your own CSS.
- **Sakura** — `reference-only`. Pushed 2026-04-07 but it is a ~3kB stylesheet from 2016; read it to learn how little CSS a readable page needs, don't depend on it.
- **Tokenami** — `avoid` for now, despite a genuinely clever idea (CSS-variable-based atomic styling with typed values, no build step). **tokenami.dev returned a Vercel `404: DEPLOYMENT_NOT_FOUND` when I loaded it on 2026-09-09**, even though the repo was pushed 2026-09-06. 517 weekly downloads, 4 contributors, still on 0.0.x after three years. Watch it; don't ship it.
- **restyle** — `reference-only`. 450 stars, 1,031 weekly downloads, 4 contributors, last publish 2026-05-19. A neat CSS-in-JS-for-RSC experiment from a strong author, but too thin to depend on.
- **Sass as an *architecture*** — `reference-only`. `sass` still does 27.4M weekly and `sass-embedded` 5.2M, and it remains fine as a build tool. But nesting, `@layer`, custom properties and `color-mix()` are all Baseline now, so choosing Sass *for those features* in 2026 is adding a compiler to reimplement the platform. Modules/partials remain the only genuinely non-native reason left.
- **`@apply` (Tailwind)** — `avoid` as a pattern. It reintroduces the indirection Tailwind exists to remove while keeping atomic CSS's lack of a cascade. If you find yourself writing `@apply`, you wanted CSS Modules.

## What surprised me
- **styled-components is not dead — it got un-dead.** It went into maintenance mode in early 2025 (two GitHub issues asked for the README to say so), then shipped 6.5.0→6.5.3 across August 2026 and started publishing v7 prereleases on 2026-09-08 with a "native engine rewrite, modern CSS polyfills, React 19 + RN 0.85 floors." Meanwhile **Emotion**, which everyone still treats as the healthier of the two, has not published its main package since December 2024. The reputations are exactly inverted from reality.
- **The Tailwind ecosystem needs ~126M weekly downloads of patch libraries to function.** `tailwind-merge` (71.8M/wk) and `class-variance-authority` (54.3M/wk) exist purely because atomic CSS has no cascade and no variant concept. That is an architectural cost nobody prices in when comparing Tailwind to CSS Modules.
- **Tailwind's showcase actually refutes the "everything looks the same" claim — at the top of the market.** I scrolled it: Gumroad, Greptile, Supabase, Shopify and Clerk look nothing alike. The sameness is real but it comes from shadcn/ui defaults and Tailwind Plus copy-paste, not from the tool. This is a fixable agent-behavior problem, not a framework property.
- **next-yak is the best-kept secret here.** A Swiss e-commerce company (Digitec Galaxus) quietly built and open-sourced the thing everyone said was impossible — styled-components syntax with full RSC support via a Rust SWC plugin — and it has 582 stars. Its website is genuinely badly designed, which is probably part of why.
- **Anchor positioning crossed the Baseline line on 2026-01-13** (Chrome 125, Firefox 147, Safari 26). Most tooltip/popover/dropdown code shipping today still bundles a JS positioning engine to do what three CSS properties now do natively in all three engines.
- **Tokenami's docs site is a dead Vercel deployment** while its repo was pushed three days before I checked. A live 404 is a stronger maintenance signal than a stale commit date, and it is not something a stars-and-commits scraper would ever catch.

## Open questions
- **Panda CSS 2.0 timeline.** `2.0.0-beta.16` shipped 2026-09-08 with no announced stable date and no blog post about it. Would be settled by a Panda release note or a maintainer statement.
- **UnoCSS `preset-wind4` parity.** The preset exists at 66.10.1 and is described as "Tailwind 4 compact preset," but the official "why UnoCSS" page still frames compatibility around Wind3. Would be settled by a documented utility-coverage diff against Tailwind v4.
- **StyleX's road to 1.0.** Nearly four years in at 0.19.0 with 242 open issues. Would be settled by a public roadmap or a Meta statement on API stability guarantees.
- **Whether MUI still intends Pigment CSS to become the default.** The repo says "on hold"; MUI has not (that I could find) published a replacement plan. Would be settled by an MUI roadmap post.
- **Real-world Open Props adoption.** 23,452 weekly npm downloads understates it badly, because the primary install path is `@import` from a CDN, which npm cannot see. Would be settled by CDN request stats from unpkg/jsDelivr.
- **State of CSS 2025/2026 survey numbers.** I could not retrieve the results pages (404s on the tools sections), so no survey-based usage or retention figures appear in this file. Would be settled by the published results dataset.
