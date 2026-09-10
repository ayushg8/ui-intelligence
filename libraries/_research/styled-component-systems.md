# Styled component systems & full design-system kits

**Evaluated:** 2026-09 · **Researcher note:** The category split into three unrelated markets: (1) copy-in registries where you own the code — shadcn/ui now on Base UI by default since July 2026, plus Untitled UI React and Park UI; (2) npm-installed opinionated systems — Mantine, Chakra v3, HeroUI, Nuxt UI, Ant Design; (3) legacy enterprise sets running on inertia — MUI (still Material Design 2 in 2026), Bootstrap 5.3.8 (last release Aug 2025), Vuetify, Fluent. The interesting fact for an anti-vibecode corpus: shadcn's `dashboard-01` block — "Acme Inc." sidebar, four KPI cards reading $1,250.00 / 1,234 / 45,678 / 4.5% — is now a literal visual fingerprint appearing verbatim in thousands of AI-built apps. Escaping it is a four-token job, and I verified two real products that did exactly that.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| shadcn/ui | `essential` | The correct default and the single biggest source of generic-looking product UI; both facts are true and you must plan for the second. | **high** (as shipped) / low (after 4 token changes) |
| Mantine | `essential` | Best engineering in the category — 100+ components, real hooks, ships its own MCP server; visually competent but plainly a component library until you retheme. | medium |
| Base UI | `strong` | The unstyled substrate under the whole category now; zero house style by construction. Not a "kit" — pair it with your own tokens. | none |
| Untitled UI React | `strong` | The most designer-authored option here; MIT core over React Aria + Tailwind. Its violet-600 house style is strong and very recognizable. | medium-high |
| Chakra UI v3 | `strong` | Genuine rewrite onto Ark UI + Panda; excellent recipe/token architecture, the deepest theming story of any npm-installed system. | medium |
| Nuxt UI v4 | `strong` | Vue's best answer. Pro merged into the free package after NuxtLabs joined Vercel — 110+ components, Figma kit, MIT. | medium |
| HeroUI v3 | `strong` | Best out-of-box visual polish of the npm-installed systems, and the most inescapable house style. Pill radius + #006FEE is the whole look. | **high** |
| Ant Design v6 | `situational` | Unbeatable for dense CRUD/enterprise console work in the CN-influenced idiom. Wrong for anything consumer-facing. | **high** |
| daisyUI | `situational` | Semantic class names over Tailwind, 68 components, no JS. Great for Rails/Laravel/HTMX; its themes are its tell. | **high** |
| Park UI | `situational` | Ark UI + Panda recipes with the best neutral typographic defaults in the category — but now folded into the Chakra org and its preset hasn't shipped since Nov 2024. | low |
| PrimeReact / PrimeVue | `situational` | Widest component surface on earth (data tables, org charts, gantt). Design is competent-corporate; PrimeVue's 852 open issues are a warning. | medium |
| Fluent UI React v9 | `situational` | Correct only when you are building inside the Microsoft 365 surface. Excellent token architecture, Storybook-grade docs. | **high** |
| MUI (Material UI) v9 | `situational` | Enormous, well-engineered, and still implementing Material Design 2 — a 2018 spec — in 2026. Choose deliberately, not by default. | **high** |
| Once UI | `experimental` | A real authored aesthetic and an agent-friendly prop DSL, but ~6.8k weekly npm downloads. Side surfaces only. | **high** |
| Semi Design | `experimental` | ByteDance-grade engineering, but no release since Nov 2025 and the docs are Chinese-first. | medium |
| Skeleton v5 | `experimental` | Multi-framework Tailwind system; functional components only exist for React and Svelte. Docs design is weak. | medium |
| Vuetify v4 | `reference-only` | Material for Vue; v3 is now LTS-through-2027 and the new `@vuetify/v0` headless layer is the interesting part. | **high** |
| Flowbite | `reference-only` | A Figma-kit-and-templates business with a component library attached. 92 contributors, 257 open issues, last push June 2026. | **high** |
| Arco Design | `avoid` | English docs 404 on their own components-overview route. 374 open issues, 35k wk npm. Pick Semi or Ant instead. | high |
| Joy UI | `avoid` | Still `v5.0.0-beta.49`. MUI's attention went to Base UI and MUI v9. Do not start here. | high |
| Bootstrap 5 | `avoid` | Last release v5.3.8, August 2025 — 12+ months. v6 is alpha on a branch with no npm publish and no date. | **high** |
| Kuma UI | `avoid` | 1,859★ but **433** weekly npm downloads. Zero-runtime CSS-in-JS lost to Tailwind v4. | n/a |

## Recommendations by need
- **Default choice:** shadcn/ui — you own the code, it now defaults to Base UI, and every escape hatch is a file you already have. But treat `npx shadcn init` defaults as a starting sketch, not a design.
- **Best engineering:** Mantine — 460 contributors, 58 open issues on 31.7k stars (a genuinely low ratio), a real hooks library, `@mantine/schedule`, and `@mantine/mcp-server` shipped in v9.
- **Best visual quality out of the box:** HeroUI v3 — and that is exactly the problem; you are adopting someone else's finished aesthetic.
- **Best accessibility:** Untitled UI React (React Aria under everything) and Fluent UI React v9 (shipped by a team with legal a11y obligations). Base UI is the best a11y substrate if you are building your own.
- **Most customizable / least house-style:** Base UI, then Park UI's Panda recipes, then Chakra v3's recipe/slot-recipe system.
- **Lightest:** daisyUI — CSS-only, no JS runtime, no React dependency at all.
- **Promising newcomer:** Untitled UI React — created July 2025, 1,911★, MIT, built on Tailwind v4 + React Aria.
- **Premium/paid worth it:** Untitled UI PRO ($349 lifetime, per their pricing page) if your team already lives in the Untitled UI Figma kit — design/code parity is the actual product. Nuxt UI Pro is no longer a purchase; it merged into the free package at v4.

## Scorecards

### shadcn/ui — `essential`
- **What:** A CLI + registry that copies component source into your repo. Since July 2026 `npx shadcn init` scaffolds on **Base UI** rather than Radix; Radix remains fully supported and both get new components.
- **Verdict:** Correct architecture, and the reason it wins is that there is no upgrade treadmill — the code is yours. It is also, unambiguously, the visual signature of AI-generated UI in 2026, and pretending otherwise helps nobody. The failure mode is not the components; it is that agents accept `--radius: 0.625rem`, a zinc/neutral ramp, `Card` as the answer to every container, and `dashboard-01` verbatim. The fix is small and specific (below), and two products I inspected prove it works.
- **Use when:** Any greenfield React product where you intend to own your design language. · **Don't use when:** You need a data grid, a scheduler, or 60 form controls tomorrow and have no design capacity — Mantine or PrimeReact will finish faster.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 5 · stability 4 · originality 5
- **Evidence:** ★123,459 · last release `shadcn@4.21.0` 2026-09-04 · last push 2026-09-10 · 8,742,877 wk npm (`shadcn` CLI) · 469 contributors · MIT · 1,963 open issues. Used by **midday.ai** — verified: `packages/ui` carries the exact shadcn component roster and three shadcn references in code.
- **Looked at:** `ui.shadcn.com`, `/blocks`, `/docs/components/card`, plus `midday.ai` and `dub.co` as production comparisons. The docs site has quietly moved *off* its own default — buttons and inputs there are near-pill, the palette is pure greyscale, and there is a new `Typeset` section. Meanwhile `/blocks` still leads with `dashboard-01`: "Acme Inc." with a circle-outline logo, a black pill "Quick Create", and four KPI cards reading Total Revenue **$1,250.00** / New Customers **1,234** / Active Accounts **45,678** / Growth Rate **4.5%** with `+12.5%` trend chips. Those four numbers are the fingerprint. On `midday.ai` the same component library renders as a transitional **serif** display face, **zero** border-radius on the primary CTA, a warm off-white ground and a monochrome grain hero — nothing reads as shadcn. On `dub.co`, `@dub/ui` is Radix + `class-variance-authority` with **zero** shadcn references: a bespoke grotesk, ~8px radius, a faint architectural grid ground, and colored icon chips (violet/green/orange) as the only saturation.
- **The four changes that break the tell** (in impact order): **1. Radius.** `0.625rem` on everything is the loudest signal — go to `0` or `0.25rem` or `9999px`, just not the default. **2. Typeface.** Ship a real display face; the Geist/Inter default is half the fingerprint. **3. Ground.** `oklch(1 0 0)` pure white plus zinc borders is the AI look; move to a warm or cool off-white and drop border contrast. **4. Stop reaching for `Card`.** Default shadcn wraps every region in a bordered rounded box; strong products use rules, spacing and background shifts instead. A fifth, optional: add one token shadcn does not have (a grain, a signature easing, a named elevation) and use it everywhere.
- **Vibecode risk:** **high** as shipped — the default theme and blocks are the reference image for "AI-generated". Drops to low once radius, type, ground and card usage are authored. Never let an agent run `shadcn add` and ship without a `DESIGN.md`-style token contract.
- **Link:** https://ui.shadcn.com

### Mantine — `essential`
- **What:** A complete npm-installed React system: 100+ components, a large standalone hooks library, forms, charts, dates, notifications, rich text, and now scheduling.
- **Verdict:** The best-engineered thing in this category and it is not close. 58 open issues against 31.7k stars and 460 contributors is a maintenance signature you almost never see at this scale, and v9 (March 2026) shipped `@mantine/schedule` plus an official `@mantine/mcp-server`. Visually it is competent rather than opinionated — which is the good failure mode: Mantine looks like a well-made component library, not like a brand you have to fight. The Styles API (per-element class targeting on every component) makes retheming tractable in a way MUI's `sx` never quite is.
- **Use when:** Internal tools, dashboards, admin, data-heavy B2B, or any React app where component breadth beats visual signature. · **Don't use when:** You want the design language to be the product's differentiator — you will end up overriding a lot.
- **Scores /5:** visual 3 · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 4 · stability 5 · originality 3
- **Evidence:** ★31,692 · last release 9.6.1 2026-09-09 · last push 2026-09-09 · 2,233,927 wk npm (`@mantine/core`) · 460 contributors · MIT · 58 open issues
- **Looked at:** `mantine.dev/core/button` — every component page carries a live variant/color/size/radius playground plus an explicit **"LLM documentation"** link and a floating LLM-copy panel, which is a real DX advantage for agent workflows. The default filled button is Open Color `blue.6` (#228be6) at ~4px radius with a 10-swatch palette grid; that blue and that radius are the Mantine tell. Typography is a clean geometric sans with genuinely good vertical rhythm in the docs. Nothing decorative anywhere.
- **Vibecode risk:** medium — a default Mantine app is identifiable by the blue and the small radius, but it does not carry the cultural "AI slop" association shadcn does, and `theme.primaryColor` + `defaultRadius` + `fontFamily` neutralises most of it in three lines.
- **Link:** https://mantine.dev

### Base UI — `strong`
- **What:** Unstyled, accessible React primitives from the MUI team. Now the default primitive layer for new shadcn/ui projects.
- **Verdict:** This is the substrate the whole category is converging on, and its component list already exceeds what Radix shipped — Autocomplete, Combobox, Drawer, Context Menu, Fieldset, Field. Single package, tree-shakable, explicit portal/isolation guidance, and first-class llms.txt. It is not a design system and should never be tiered against one; include it because "which styled kit" is increasingly answered by "none, Base UI plus our tokens."
- **Use when:** You have a designer or a real token system and want zero inherited aesthetic. · **Don't use when:** Nobody on the team will write the CSS — you will end up with worse defaults than any kit here.
- **Scores /5:** visual n/a · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 5 · stability 4 · originality 4
- **Evidence:** ★10,869 · last push 2026-09-09 · 429,187 wk npm (`@base-ui-components/react`) · MIT · created 2024-02-23
- **Looked at:** `base-ui.com/react/overview/quick-start` — the most restrained docs page in this whole set: no hero, no gradient, one accent, generous measure, a "View as Markdown" affordance and an llms.txt entry in the sidebar. Code blocks use a light-grey chrome with tab-style package-manager switching. It reads like documentation written by people who did not want to sell anything.
- **Vibecode risk:** none — it ships no visual opinion at all.
- **Link:** https://base-ui.com

### Untitled UI React — `strong`
- **What:** MIT open-source React components built on Tailwind CSS v4 + React Aria, from the team behind the Untitled UI Figma kit. Paid PRO tier adds hundreds of application/marketing components and 250+ page examples.
- **Verdict:** The most designer-authored option in this file — the spacing, the icon set, the focus rings and the form-field anatomy are all considered in a way that MUI's and Bootstrap's are not, because they were designed in Figma first by people who do this for a living. React Aria underneath means the a11y is genuinely good rather than claimed. The catch: the Untitled UI look (violet-600 primary, grey-scale surfaces, that specific 8px-radius soft-shadow card) is *itself* one of the most-cloned SaaS aesthetics of the last five years, so "not shadcn" does not mean "not generic."
- **Use when:** Your team already designs in the Untitled UI Figma kit, or you want React Aria ergonomics with real design taste on top. · **Don't use when:** You need a distinctive brand voice — you will be adopting a widely-recognised template look.
- **Scores /5:** visual 4 · interaction 4 · a11y 5 · engineering 4 · maintenance 4 · docs 4 · customization 4 · perf 4 · stability 3 · originality 3
- **Evidence:** ★1,911 · created 2025-07-15 · last push 2026-09-02 · MIT (open core) · PRO $349 lifetime per their pricing page · npm package name not resolvable under `@untitledui/react` — distribution appears to be CLI/copy-in, **unverified**
- **Looked at:** `untitledui.com/react` — a #7F56D9 violet "Buy now" CTA against otherwise pure greyscale, a faint dotted-grid ground, and tilted screenshot stacks with a fake collaborator cursor labeled "Olivia Rhye". That violet and that grey ramp are the entire fingerprint; every Untitled-UI-derived product I have seen carries them. Typography and button anatomy are visibly better resolved than shadcn's defaults — the secondary button's border, shadow and label weight are all deliberately balanced.
- **Vibecode risk:** medium-high — swap the violet and the shadow scale or your product will read as "Untitled UI kit", which is a template look with a five-year head start on recognisability.
- **Link:** https://www.untitledui.com/react

### Chakra UI v3 — `strong`
- **What:** A ground-up rewrite: component logic moved to Ark UI (state machines via Zag), styling to a Panda-derived engine, with recipes and slot recipes as the theming unit.
- **Verdict:** The best *architecture* for theming of any npm-installed system here — recipes give you a real variant contract rather than a pile of style overrides, and the v3 token/semantic-token split is genuinely well designed. 16 open issues on 40.6k stars is remarkable, and Q1 2026 shipped a rich-text-editor composition plus automated v2→v3 migration. The cost is that v3 broke a lot of v2 code and the ecosystem's collective memory is still v2, so LLM-generated Chakra is frequently wrong-version.
- **Use when:** You want an installed system but intend to build a real design language on top of it. · **Don't use when:** You are leaning on an agent to write most of the UI — it will produce v2 syntax.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 4 · originality 3
- **Evidence:** ★40,638 · last release `@chakra-ui/react@3.37.0` 2026-08-28 · last push 2026-09-09 · 1,537,398 wk npm · 413 contributors · MIT · 16 open issues
- **Looked at:** `chakra-ui.com` — a teal-600 primary against near-black text, a large translucent lightning-bolt watermark, and a component showcase row of thin-bordered near-square cards. The site itself makes the architecture legible with a "Chakra / Ark / Zag" tab demo, which is an honest bit of docs design. The default component look is flatter and squarer than v2's; the teal is the tell.
- **Vibecode risk:** medium — recognizable by the teal and the flat 1px-border card, but the recipe system means a serious team escapes it completely.
- **Link:** https://chakra-ui.com

### Nuxt UI v4 — `strong`
- **What:** Vue/Nuxt component library on Reka UI + Tailwind. As of v4, Nuxt UI Pro was merged into the free package: 110+ components, 12 templates, and the full Figma kit, all MIT.
- **Verdict:** The clear default for Vue and Nuxt in 2026, and the Pro merge (enabled by NuxtLabs joining Vercel) removed the only real objection. Reka UI underneath gives it a genuine headless a11y foundation — the same architectural bet shadcn made with Radix/Base UI, three years later and better executed for Vue. 257 open issues is higher than I'd like for a 6.9k-star repo but the release cadence (v4.11.1 two days before I checked) is healthy.
- **Use when:** Any Vue or Nuxt app. · **Don't use when:** You are on React — it is Vue-only despite the "Nuxt optional" framing.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 5 · customization 4 · perf 4 · stability 4 · originality 3
- **Evidence:** ★6,905 · last release v4.11.1 2026-09-07 · last push 2026-09-09 · 489,856 wk npm · 367 contributors · MIT · 257 open issues. `reka-ui` itself does 1,642,696 wk npm.
- **Looked at:** `ui.nuxt.com` — Nuxt green (#00DC82) as the headline accent and the primary button fill, set against near-black display type, with a two-column marquee of component thumbnails on the right. That green is the single loudest tell; a Nuxt UI app that ships with `primary: green` is instantly identifiable. The docs pages themselves are among the best-organised in this file.
- **Vibecode risk:** medium — change `ui.colors.primary` off green and most of it evaporates.
- **Link:** https://ui.nuxt.com

### HeroUI v3 (ex-NextUI) — `strong`
- **What:** React system on React Aria + Tailwind, now branded "hero", with a paid Pro tier and a React Native line.
- **Verdict:** The prettiest defaults in the category, and the hardest house style to escape. React Aria underneath is the right engineering call, the motion is well-tuned, and the `flat`/`bordered`/`shadow` variant set is thoughtfully designed. But the entire look is carried by two decisions — `radius: full` on buttons and `#006FEE` primary — and both are so distinctive that a HeroUI app announces itself from across the room. The tagline is literally "Beautiful by default. Customizable by design," and the first half is much truer than the second.
- **Use when:** Consumer-facing apps, marketing-adjacent product surfaces, or when you have no design resource and want something that looks finished today. · **Don't use when:** The product needs its own visual identity, or you need a dense data table.
- **Scores /5:** visual 5 · interaction 5 · a11y 4 · engineering 4 · maintenance 4 · docs 4 · customization 3 · perf 3 · stability 4 · originality 3
- **Evidence:** ★30,621 · last release v3.2.4 2026-08-07 · last push 2026-09-09 · 497,047 wk npm (`@heroui/react`) · 234 contributors · Apache-2.0 · 31 open issues
- **Looked at:** `heroui.com` — fully-rounded pill buttons in #006FEE, `flat` variants as tinted pastel pills, gradient-mesh avatar circles, and a 20px-radius soft card with a very light `0 x y rgba` shadow. The component playground row (Components / Dashboard / Mail / Chat / Finances) is polished, and the whole page reads more Apple-adjacent than Material. A Pro upsell modal covered a third of the demo on load, which tells you where the business is.
- **Vibecode risk:** **high** — pill radius plus that blue plus the pastel `flat` variants is a three-tell combination, and unlike shadcn you cannot fix it by editing files you own.
- **Link:** https://www.heroui.com

### Ant Design v6 — `situational`
- **What:** Alibaba's enterprise React system; v6 shipped in 2026 with a new masonry component and continued token/CSS-in-JS theming.
- **Verdict:** For dense back-office software — tables with 20 columns, tree-selects, transfer lists, cascaders, form arrays — nothing in the West matches its coverage or its behavioural correctness. It is also one of the most recognisable design languages ever shipped: #1677ff, 6px radius, 32px control height, that specific form-label alignment. Products built with it are identifiable at a glance, and it carries a strong CN-enterprise cultural register that reads wrong in most Western consumer contexts. The v5 CSS-in-JS runtime remains a real SSR and bundle cost.
- **Use when:** Internal admin, data consoles, anything CRUD-dense, or products with a CN user base. · **Don't use when:** Consumer-facing, marketing-adjacent, or brand-led.
- **Scores /5:** visual 3 · interaction 5 · a11y 3 · engineering 4 · maintenance 5 · docs 5 · customization 3 · perf 3 · stability 5 · originality 2
- **Evidence:** ★99,457 · last release 6.6.3 2026-09-07 · last push 2026-09-10 · 3,199,837 wk npm · 374 contributors · MIT · 1,104 open issues
- **Looked at:** `ant.design/components/overview` — a components grid where every card is a 1px #f0f0f0 border at ~8px radius with an abstract blue-tinted illustration. The docs are among the most complete in existence (design guidance, dev guidance, changelog, i18n, RTL). The primary button is the unmistakable #1677ff at 6px radius; the danger button is a red-outlined variant of the same shape. Everything is tight, dense, and deliberately unglamorous.
- **Vibecode risk:** **high** — the palette and metrics are so distinctive that even heavy token overrides usually leave the silhouette intact.
- **Link:** https://ant.design

### daisyUI — `situational`
- **What:** A Tailwind plugin providing semantic component class names (`btn`, `card`, `modal`) with a themeable CSS-variable palette. 68 components, no JavaScript.
- **Verdict:** The right answer whenever you are not in a JS component framework — Rails, Laravel, Django, Phoenix, HTMX, plain HTML. It collapses Tailwind's utility soup into readable markup at essentially zero runtime cost, and the release cadence is relentless. Two honest caveats: because it is CSS-only there is no focus management, no portal, no roving tabindex — accessibility is entirely on you for anything interactive; and its bundled themes ("cupcake", "synthwave", "retro") are so distinctive that a daisyUI site with a stock theme is trivially identifiable. It now ships an MCP server whose pitch is explicitly "generate unique UIs", which is at least an honest acknowledgement of the problem.
- **Use when:** Server-rendered stacks, HTMX, static sites, or any place a React dependency is unwelcome. · **Don't use when:** You need accessible interactive widgets, or you plan to ship a stock theme.
- **Scores /5:** visual 3 · interaction 2 · a11y 2 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 5 · stability 4 · originality 3
- **Evidence:** ★42,344 · last release v5.7.32 2026-09-08 · last push 2026-09-08 · 891,728 wk npm · 306 contributors · MIT · 45 open issues
- **Looked at:** `daisyui.com/components` — a 3-across grid of flat grey-blue preview tiles with white component silhouettes, plus Carbon ads in the right rail. The docs are functional but visually thin: the previews are abstractions rather than real components, which makes the grid hard to scan. New components ("Aura", "Hover 3D card", "Hover Gallery") suggest drift toward effect-library territory.
- **Vibecode risk:** **high** with a stock theme; low if you author your own CSS-variable theme, which takes about twenty minutes.
- **Link:** https://daisyui.com

### Park UI — `situational`
- **What:** Ark UI + Panda CSS recipes with a strong neutral design opinion, available for React and Solid. Created by a Chakra core member; the project has since joined the Chakra UI GitHub organisation.
- **Verdict:** The best *typographic* defaults in this entire file — its demo cards show tight 1px borders, restrained ~6px radius, black CTAs and a geometric display face, which is what a good product designer would actually build. But the evidence is mixed: `@park-ui/panda-preset` last published 0.43.1 in **November 2024**, the repo's last push was April 2026, and it has 31 contributors and 15,430 weekly downloads. Now that it sits under the Chakra org, its distinct identity is likely to be absorbed into Chakra v3 rather than developed separately.
- **Use when:** You are already on Panda CSS and want a well-designed recipe set to start from. · **Don't use when:** You need a maintained, independently-versioned dependency — treat it as a design reference you vendor.
- **Scores /5:** visual 5 · interaction 4 · a11y 4 · engineering 4 · maintenance 2 · docs 3 · customization 5 · perf 4 · stability 2 · originality 4
- **Evidence:** ★2,363 · last preset release 0.43.1 2024-11-22 · last push 2026-04-10 · 15,430 wk npm · 31 contributors · MIT · footer reads "© 2025 Chakra Systems"
- **Looked at:** `park-ui.com` — a Swiss-neutral hero ("Build your own Design System") in a heavy geometric grotesk, next to floating Sign Up / Payment Method / Notifications cards. Those cards are the argument: full-width black CTAs, 1px hairline field borders, ~6px radius, no shadow theatre, honest label/field spacing. It looks like a real product's settings screen, not a component showcase — which is exactly the bar shadcn's blocks fail.
- **Vibecode risk:** low — the neutral-black-CTA look is broadly generic-modern but carries no library-specific fingerprint.
- **Link:** https://park-ui.com

### PrimeReact / PrimeVue — `situational`
- **What:** The widest component surface available: DataTable with virtual scroll and frozen columns, TreeTable, OrganizationChart, Galleria, Terminal, plus four styling modes (Styled / Tailwind / Primitive / Headless).
- **Verdict:** When the requirement is "an Excel-grade table with row grouping, column resize, lazy load and CSV export by Friday", PrimeReact ships it and almost nothing else does. The design has improved markedly — the current site is a competent dark-pill-CTA affair, not the 2016 look it used to have — but it is still corporate-competent rather than distinctive. Two evidence flags: PrimeReact's npm `latest` is 11.1.0 while the GitHub releases feed's newest tag is 10.9.9, which means release hygiene is split across channels; and **PrimeVue has 852 open issues** on 14.5k stars, with its last release 4.5.5 in April 2026 — five months, which is a cadence problem for a library that size.
- **Use when:** Enterprise data tooling with hard component requirements and a real deadline. · **Don't use when:** Design quality is a differentiator, or you only need 15 components.
- **Scores /5:** visual 3 · interaction 5 · a11y 3 · engineering 4 · maintenance 3 · docs 4 · customization 4 · perf 3 · stability 3 · originality 2
- **Evidence:** PrimeReact ★8,317 · npm latest 11.1.0 · newest GitHub release tag 10.9.9 2026-08-27 · last push 2026-09-05 · 226,763 wk npm · 347 contributors · MIT · 340 open issues. PrimeVue ★14,460 · 4.5.5 2026-04-08 · 762,547 wk npm · 852 open issues.
- **Looked at:** `primereact.org` — dark near-black pill "Get Started", a `.p-title` CSS-inspector annotation floating over the headline (a nice bit of docs wit), and a logo row of Volkswagen / Intel / UniCredit / Lufthansa. Those logos are **their marketing claim and I could not verify any of them.** The dashboard demo below the fold is dense, tidy and unremarkable.
- **Vibecode risk:** medium — the Aura theme has a recognisable look but the four styling modes give you a genuine escape route.
- **Link:** https://primereact.org

### Fluent UI React v9 — `situational`
- **What:** Microsoft's design system implementation for React, with a token architecture covering border radii, stroke widths, shadows, spacing and typography as first-class docs sections.
- **Verdict:** The token model is genuinely one of the best here — separating stroke widths and border radii as named scales is a discipline most of this category skips — and it is maintained by a team with statutory accessibility obligations, which shows. But it exists to make things look like Microsoft 365, and it does that job perfectly. Outside that context it imports an aesthetic nobody asked for. 801 open issues on a monorepo of this size is normal, not alarming.
- **Use when:** Building inside Teams, Office add-ins, Azure portals, or an enterprise that has standardised on Fluent. · **Don't use when:** Anywhere else.
- **Scores /5:** visual 3 · interaction 4 · a11y 5 · engineering 4 · maintenance 4 · docs 3 · customization 3 · perf 3 · stability 4 · originality 2
- **Evidence:** ★20,261 · v9.74.7 · last push 2026-09-09 · 329,189 wk npm (`@fluentui/react-components`) · 385 contributors · license NOASSERTION (MIT per repo) · 801 open issues
- **Looked at:** `react.fluentui.dev` — a Storybook shell with a left rail of Concepts / Theme / Components. The Theme section (Border Radii, Colors, Fonts, Shadows, Spacing, Stroke Widths, Typography, Theme Designer) is the strongest part; the landing page itself is a purple-pink 3D "9" render that communicates nothing. Docs are functional, not designed.
- **Vibecode risk:** **high** in the sense that everything built with it looks like Microsoft software — which is the point, and a liability outside that context.
- **Link:** https://react.fluentui.dev

### MUI (Material UI) v9 — `situational`
- **What:** The oldest and most-installed React component library, implementing Google's Material Design.
- **Verdict:** Technically excellent, enormously popular, and visually the most dated default in this file — because as of v9 in 2026 the docs still state that Material UI implements **Material Design 2**, with MD3 tracked in a GitHub issue rather than shipped. That is a 2018 specification. The engineering is real (416 contributors, 8.9M weekly downloads, MCP server and llms.txt now shipping), the `sx` prop and theme system are powerful, and MUI X's data grid is best-in-class. But choosing MUI in 2026 means either shipping a look that reads as "2019 Google", or spending serious effort overriding a theme system that was designed to express Material, not to escape it. This is the clearest case in this file where popularity and design quality point in opposite directions.
- **Use when:** You are already on MUI, you need MUI X's data grid or pickers, or you have a team that will do the theming work properly. · **Don't use when:** Greenfield and design-led. Reach for shadcn, Mantine or Base UI instead.
- **Scores /5:** visual 2 · interaction 4 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 3 · perf 3 · stability 5 · originality 1
- **Evidence:** ★99,025 · last release v9.4.0 2026-08-28 · last push 2026-09-09 · 8,924,416 wk npm (`@mui/material`) · 416 contributors · MIT · 1,466 open issues · docs claim "over 2,500 open-source contributors" all-time
- **Looked at:** `mui.com/material-ui/getting-started` — the docs are excellent (MCP and llms.txt both marked NEW in the sidebar, comprehensive Customization / Integrations / Migration trees), and immediately below the intro sits an info callout reading "Material UI supports Material Design 2. You can follow this GitHub issue for future design-related updates." That callout is the whole verdict. A cookie banner and a Diamond-sponsor slot compete for the right rail.
- **Vibecode risk:** **high** — ripple effects, the 4px radius, the elevation shadow scale and Roboto metrics are recognisable even under a custom palette.
- **Link:** https://mui.com/material-ui/

### Once UI — `experimental`
- **What:** A React system with its own layout DSL (`Row`, `Column`, `Grid`, with props like `radius="l"` and `paddingX="20"`), explicitly positioned as "human-readable, machine-writable syntax" for AI agents. Free core plus a Pro tier.
- **Verdict:** One of very few systems here with an actual authored aesthetic rather than a defaulted one, and the agent-oriented prop DSL is a legitimately interesting bet — it compresses layout into tokens an LLM can emit correctly. But the adoption numbers are brutal: **6,837 weekly npm downloads** for `@once-ui-system/core` and 833 stars on the starter repo (the site claims 2.5k+ across the org). And its house style — near-black pill CTAs, emerald glow, heavy Helvetica-adjacent display type — is *very* strong. That is a virtue for a portfolio and a liability for a product you intend to brand yourself.
- **Use when:** Portfolios, personal sites, agency microsites, or a deliberately agent-authored side surface. · **Don't use when:** Core product infrastructure — the bus factor and adoption are both too thin.
- **Scores /5:** visual 4 · interaction 3 · a11y 3 · engineering 3 · maintenance 3 · docs 3 · customization 3 · perf 3 · stability 2 · originality 5
- **Evidence:** `@once-ui-system/core` v1.8.4 · **6,837 wk npm** · `once-ui-system/nextjs-starter` ★833, last push 2026-05-19, MIT · site shows a live "$991/mo · 90 people" open-collective ticker
- **Looked at:** `once-ui.com` — an enormous tight-tracked Helvetica-ish headline, a black pill "View docs", and a mint/emerald glow bleeding out from behind a code panel. The code sample (`<TiltFx><Card fillWidth direction="column" padding="4" radius="l" border...>`) is the product pitch and it is legible. Handsome page; also unmistakably one designer's taste, and everything built with it will inherit that taste.
- **Vibecode risk:** **high** — a distinctive house style is still a house style. The emerald glow plus pill CTA plus the `Row/Column` DSL make Once UI products identifiable to anyone who has seen two of them.
- **Link:** https://once-ui.com

### Semi Design — `experimental`
- **What:** ByteDance/Douyin's enterprise React design system, with a Figma design-to-code pipeline and a theming service.
- **Verdict:** The engineering quality is real — this powers a large internal product estate and it shows in the component behaviour and the dark-mode support. It now ships an "AI Agent MCP/Skills" surface. But the evidence says it is coasting on the open-source side: **no release since v2.88.2 in November 2025** (ten months), 26,888 weekly npm downloads, 143 contributors, and documentation that is Chinese-first with an English toggle that leaves most body content in Chinese. Its own docs claim it supports "nearly a thousand platform products and 100k+ internal and external users" — a marketing claim I could not verify.
- **Use when:** You have Chinese-reading engineers and want an Ant alternative with better dark mode and a stronger Figma pipeline. · **Don't use when:** Your team reads only English, or you need an active release cadence.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 2 · docs 2 (in English) · customization 4 · perf 3 · stability 3 · originality 3
- **Evidence:** ★10,356 · last release v2.88.2 **2025-11-18** · last push 2026-09-01 · 26,888 wk npm · 143 contributors · license NOASSERTION · 40 open issues
- **Looked at:** `semi.design/en-US/start/introduction` — with `en-US` in the URL, the nav (组件 / 主题 / 设计转代码 / 模板), the page title (介绍) and all body copy render in Chinese; only sidebar labels are bilingual. A rainbow-gradient promo bar tops the page. The sidebar is well-organised (Customized Themes, Design to Code, Dark Mode, Accessibility, Content Guidelines) and the information architecture is better than Ant's — if you can read it.
- **Vibecode risk:** medium — a competent, slightly softer take on the Ant idiom.
- **Link:** https://semi.design

### Skeleton v5 — `experimental`
- **What:** A Tailwind-based adaptive design system spanning React, Svelte, Vue, Solid and Astro, originally a Svelte project.
- **Verdict:** The multi-framework positioning is honest to a fault — their own homepage footnotes that "functional components [are] limited to React and Svelte", meaning Vue/Solid/Astro users get CSS only. The theming system (design tokens plus a theme generator) is decent and v5 shipped August 2026, but 64,660 weekly downloads across five frameworks is thin, and the project's own visual presentation does not inspire confidence in its design judgement.
- **Use when:** SvelteKit projects specifically, where its heritage and component coverage are strongest. · **Don't use when:** React (shadcn or Mantine dominate), or Vue (Nuxt UI dominates).
- **Scores /5:** visual 2 · interaction 3 · a11y 3 · engineering 3 · maintenance 4 · docs 3 · customization 4 · perf 4 · stability 3 · originality 2
- **Evidence:** ★6,056 · last release 5.0.1 2026-08-19 · last push 2026-09-10 · 64,660 wk npm · 156 contributors · MIT · 40 open issues
- **Looked at:** `skeleton.dev` — a large cartoon skull mascot wearing a crown sits beside the headline, over a pastel blue/pink/lavender gradient blob wash. Below it, a flat grey panel holds six saturated framework logo circles at uniform size. Three unrelated visual languages (mascot illustration, gradient mesh, flat grey utility panel) on one screen, with no type hierarchy doing work. A strong product designer would not respect this page, and that matters when the product is a design system.
- **Vibecode risk:** medium — generic Tailwind-plus-themes look.
- **Link:** https://www.skeleton.dev

### Vuetify v4 — `reference-only`
- **What:** The long-running Material Design implementation for Vue. v4.2.1 is current; v3.13.0 was declared the final v3 minor and moved into LTS through July 2027.
- **Verdict:** Deeply mature and genuinely well maintained (431 contributors, 905k weekly downloads, releases on the day I checked), but it is Material Design for Vue, which means the same dated-by-default problem as MUI plus a Vue ecosystem that has largely moved to Nuxt UI / Reka UI. The interesting development is **`@vuetify/v0`, which reached 1.0 in July 2026** — an unstyled primitive layer, i.e. Vuetify conceding that the styled Material layer is the part people want to escape. If you are starting fresh in Vue, that concession is the tell: use Nuxt UI, or Reka UI directly.
- **Use when:** Maintaining an existing Vuetify app, or you specifically want Material in Vue. · **Don't use when:** Greenfield Vue — Nuxt UI v4 is now free, better-designed and more actively used in new projects.
- **Scores /5:** visual 2 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 3 · customization 3 · perf 3 · stability 5 · originality 1
- **Evidence:** ★41,036 · v4.2.1 2026-09-09 · last push 2026-09-09 · 905,416 wk npm · 431 contributors · MIT (NOASSERTION) · 390 open issues
- **Looked at:** `vuetifyjs.com/en/components/all` — the components index still uses flat blue illustration tiles ("BUTTON" pills on a pale blue field, a Card Title mock with a lorem block and a glossy blue sphere) that look like they were drawn for Vuetify 2. A Carbon ad, a sponsor stack (deepcloud, ABACUS, HOOP) and a docs-wide blue wash. It reads as a well-maintained project with a 2019 visual identity it has not revisited.
- **Vibecode risk:** **high** — Material metrics, ripple, and the default indigo/blue are all instantly readable.
- **Link:** https://vuetifyjs.com

### Flowbite — `reference-only`
- **What:** A Tailwind component library plus a large Figma kit, blocks marketplace, icon set, illustrations and a paid Pro tier.
- **Verdict:** The library is the lead magnet for a template and Figma-kit business, and the incentives show: the homepage's dominant visual element is a YouTube crash-course thumbnail. The evidence backs the read — 92 contributors on 9.3k stars, **257 open issues**, and last push 2026-06-27, over two months stale in a category where the leaders push daily. The components are serviceable Tailwind patterns you could write yourself; the value is the blocks, and the blocks are the paid product.
- **Use when:** You want a cheap marketing-site block library and are buying the Pro tier anyway. · **Don't use when:** Building product UI you will maintain.
- **Scores /5:** visual 2 · interaction 2 · a11y 2 · engineering 2 · maintenance 2 · docs 3 · customization 3 · perf 4 · stability 3 · originality 1
- **Evidence:** ★9,336 · last release v4.0.2 2026-05-13 · last push 2026-06-27 · 548,431 wk npm · 92 contributors · MIT · 257 open issues
- **Looked at:** `flowbite.com` — a #1C64F2 "Get started" button, dark-navy (#111928) headline, and a "New" pill announcing 100+ e-commerce blocks, above a full-width YouTube "Flowbite Crash Course in 20 mins" embed with a presenter thumbnail and star-rating overlay. The typography is fine; the page's job is conversion, not demonstrating design capability.
- **Vibecode risk:** **high** — stock Flowbite blocks are among the most-recycled Tailwind marketing patterns on the web.
- **Link:** https://flowbite.com

## Rejected / avoid
- **Arco Design** — Requesting their own English components-overview route returned a **404 Not Found** page (with the sidebar intact, so the shell renders and the route is broken). 5,698★, 374 open issues, 35,798 wk npm, 116 contributors. ByteDance maintains two competing systems and Semi gets the attention. If you want a CN-lineage enterprise system, use Ant Design; if you want Semi's aesthetics, accept Semi's Chinese-first docs. Arco is the worst of both.
- **Joy UI** — Still `v5.0.0-beta.49` with 101,857 weekly downloads. MUI's engineering went to Base UI and Material UI v9; Joy's templates page still credits "Designed by Untitled UI" and links a 2026 developer survey rather than a roadmap. Never start a project on a system that has been in beta for three-plus years while its parent org ships two other products.
- **Bootstrap 5** — Last release **v5.3.8, 2025-08-26**: over twelve months with no release, which is this corpus's own maintenance red-flag threshold. v6 lives as `6.0.0-alpha1` on a `v6-dev` branch with no npm publish and no announced date. I rendered their canonical dashboard example: #0d6efd links on every nav item, 4px radius, a sharp-cornered outline button group, and a zebra-striped table — a 2013 layout with a 2021 colour. An agent that reaches for Bootstrap in 2026 is producing dated UI on purpose. (The exception: server-rendered legacy apps already on it. That is maintenance, not selection.)
- **Kuma UI** — 1,859★ and last push 2026-05-29, so it is not abandoned, but **433 weekly npm downloads** is a dead ecosystem by any measure. Zero-runtime CSS-in-JS was a smart idea that Tailwind v4 and Panda made unnecessary. Do not build on it.
- **"Just use MUI because it's popular"** — Not a library, but the most common wrong decision in this category. 8.9M weekly downloads measure 2018–2022 distribution, not 2026 design quality. MUI's own docs confirm it implements Material Design 2. Weigh distribution and taste separately.

## What surprised me
- **shadcn/ui switched its default primitive from Radix to Base UI in July 2026**, and the migration path is an AI skill rather than a codemod — explicitly because a codemod would clobber user customisations. Both primitives stay supported. Most engineers still think of shadcn as "Radix + Tailwind"; for new projects that is now wrong.
- **Two of the best-looking shadcn products contain no shadcn branding, and one contains no shadcn at all.** Midday's `packages/ui` is the exact shadcn component roster (verified: accordion, alert-dialog, avatar, button, calendar, card, carousel, checkbox, collapsible, combobox, command, context-menu, dialog…) plus three shadcn references — yet it reads as a serif-display, zero-radius, warm-neutral editorial product. Dub built `@dub/ui` on Radix + `class-variance-authority` directly with **zero** shadcn references. The lesson: type + radius + ground colour + not-everything-in-a-Card is the entire escape, and it is worth more than switching libraries.
- **shadcn's base-colour list quietly grew beyond zinc.** `components.json` now accepts neutral, stone, zinc, **mauve, olive, mist, taupe** — tinted neutrals that did not exist in the 2024 palette — and the `default` style is deprecated in favour of `new-york`. Anyone still writing "shadcn means zinc" is describing a 2024 default.
- **Nuxt UI Pro stopped being a paid product.** After NuxtLabs joined Vercel, v4 merged Pro into the free MIT `@nuxt/ui`: 110+ components, 12 templates, and a 2,000-variant Figma kit, all free. Any recommendation that still says "Nuxt UI Pro costs money" is stale.
- **Park UI is now inside the Chakra UI GitHub org**, its site footer reads "© 2025 Chakra Systems", and `@park-ui/panda-preset` has not published since November 2024. It has the best neutral defaults in this file and is effectively a design reference now, not a dependency.
- **Vuetify shipped an unstyled primitive layer.** `@vuetify/v0` hit 1.0 in July 2026 and v3 went LTS through July 2027. The Material-for-Vue flagship building a headless escape hatch is the clearest signal in this file that the styled-kit era is ending in favour of primitives-plus-your-tokens.
- **`react-aria-components` does 3.5M weekly npm downloads** — more than `antd`, more than every Vue system combined, and roughly 40% of `@mui/material`. The unstyled layer is now a mass-market dependency, and nobody talks about it as a "design system" because it deliberately isn't one.

## Open questions
- **PrimeReact's release channels disagree**: npm `latest` is 11.1.0 while the newest GitHub release tag is 10.9.9 (2026-08-27). Settled by checking whether the v11 line has GitHub releases under a different tag prefix or ships npm-only — worth knowing before depending on their changelog.
- **PrimeReact's enterprise logos** (Volkswagen, Intel, UniCredit, Lufthansa) are their marketing claim; I found no independent confirmation. Same for Semi Design's "nearly a thousand platform products / 100k+ users" and the "Trusted by OpenAI, Sonos, Adobe" line in Vercel's shadcn deploy card (which describes Vercel's customers, not shadcn's). All **unverified**.
- **Untitled UI React's distribution model**: `@untitledui/react` does not resolve on the npm registry, so it appears to be CLI/copy-in only. If so its adoption cannot be measured by downloads and the 1,911 stars understate or overstate usage in unknown ways. Settled by reading their CLI source or install docs.
- **Whether Ant Design v6 finally moved off runtime CSS-in-JS.** v5's `@ant-design/cssinjs` was a measurable SSR and hydration cost; I did not verify what v6 changed. Settled by reading the v6 migration guide and measuring a cold SSR render.
- **Whether Semi Design's ten-month release gap is a pause or an exit.** Last release 2025-11-18 but pushes continue through 2026-09-01. Settled by checking whether the `main` branch has unreleased component work or only docs/CI commits.
