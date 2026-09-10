# Published design systems worth studying

**Evaluated:** 2026-09 · **Researcher note:** The public-design-system era is contracting. Shopify deleted its design guidance from the open web (polaris.shopify.com now 302s to an API reference), Pinterest put new Gestalt docs behind `/auth/signin`, Skyscanner archived Backpack Web while keeping iOS/Android open, and Kiwi's orbit.kiwi no longer resolves in DNS. What's left splits cleanly: government systems (GOV.UK, USWDS) still publish the *reasoning*, big-tech systems publish the *tokens*, and the best small system (Nord) publishes both plus an `llms.txt` and agent skills. If an agent needs a defensible answer about a UI decision, three sites carry almost all of the citable rationale: GOV.UK, USWDS design tokens, and Nord foundations.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| GOV.UK Design System | `essential` | The only system that publishes user research behind each component; cite it when you need to win an argument. | low |
| Nord (Nordhealth) | `essential` | Best-documented token naming and a11y rationale of any system, and the only one shipping first-class agent docs. | low |
| USWDS | `strong` | The color-grade "magic number" rule is the single most copyable decision in this whole category. | low |
| Primer (GitHub) | `strong` | Steal its meta-documentation — component status, degraded experiences, product/brand split — not its look. | medium |
| React Spectrum / Spectrum 2 | `strong` | Best engineering and a11y in the field; the two-scale token model is the right way to do touch targets. | medium |
| IBM Carbon | `strong` | Relentlessly maintained and the 2x grid is genuinely rigorous; the house style is loud and hard to escape. | high |
| Helios (HashiCorp) | `strong` | Small, quiet, disciplined, with Content as a top-level section. Underrated. | low |
| Apple HIG | `reference-only` | The best prose about interaction in existence. Read it; never port its chrome to the web. | n/a |
| Material 3 / M3 Expressive | `situational` | The most-researched design update ever made, wrapped in the most recognizable house style ever made. | very high |
| Fluent 2 | `situational` | Real depth on tokens and content engineering, but parts of the site are behind employee sign-in. | medium |
| Atlassian Design System | `situational` | Solid token layer; the front door is now a brand ad, and the good stuff is two clicks in. | medium |
| Skyscanner Backpack | `reference-only` | Docs site is excellent (Localisation as a first-class section) — but the web repo was archived 2026-08-05. | low |
| Shopify Polaris | `reference-only` | React deprecated 2025-10-01; the celebrated content guidelines are gone from the public web. | medium |
| Vercel Geist | `reference-only` | Beautiful, coherent, and the direct source of the default AI-generated look. Study the grid, avoid the palette. | very high |
| Gestalt (Pinterest) | `reference-only` | New docs require login; only the frozen `/v1/` tree is public. No npm release since 2025-12. | medium |
| Linear / Stripe | `reference-only` | No published system. Observable only, and Linear's surface is the most-cloned in software. | very high |
| Base Web (Uber) | `reference-only` | Still shipping, but the docs banner advertises v16 while the selector says v18.2.0. Nothing to learn design-wise. | medium |
| Cedar (REI) | `situational` | Charming, actively evolving, 72 weekly npm downloads. Vue-only. Study, don't adopt. | low |
| Orbit (Kiwi.com) | `avoid` | Documentation site does not resolve; last stable release 2025-10-31. | — |
| Ant Design guidelines | `avoid` | Excellent component library, thin design guidance, and the most instantly-recognizable house style in B2B. | very high |
| Salesforce Lightning | `avoid` | `salesforce-ux/design-system` archived; SLDS2 transition unfinished in public. | high |
| Clarity (VMware) | `avoid` | `vmware-clarity/core` archived 2026-02-02. | — |
| Wise Design | `avoid` | wise.design is now a brand inspiration gallery, not a design system. | — |
| Mailchimp pattern library | `avoid` | ux.mailchimp.com returns 503. | — |

## Recommendations by need
- **Default choice for a defensible answer:** GOV.UK Design System — every component page states the rule as a *must*, links the research, and names the failure mode it prevents.
- **Best engineering:** Adobe React Spectrum — 409 contributors, `react-aria-components@1.21.0` shipped 2026-09-04, and the accessibility work under it is the industry's actual floor.
- **Best visual quality out of the box:** Nord — the docs hero is rendered live with its own web components, and it holds up as a real product surface, not a component gallery.
- **Best accessibility:** GOV.UK for *documented reasoning*, React Spectrum for *implemented behavior*. Use both; they answer different questions.
- **Most customizable / least house-style:** USWDS — its tokens are defined by measured lightness grades rather than brand hexes, so the system survives a full palette swap.
- **Lightest to learn from:** Helios — four sections, no ceremony, and it treats Content as a peer of Components.
- **Promising newcomer:** none. This category has no newcomers; it has survivors.
- **Premium/paid worth it:** none. Everything worth reading here is free.

## Scorecards

### GOV.UK Design System — `essential`
- **What:** The UK government's design system: styles, components and patterns, published with the user research that produced each one.
- **Verdict:** Nothing else in this category writes down *why*. The type scale sets body text at 19px/25px on desktop — not the 16px everyone else defaults to — because larger text tested better with the actual population, and they say so. Its aesthetic is deliberately unfashionable (0px radius everywhere, no shadows, GDS Transport, a 960px content cap), which is exactly why it's safe to cite: you are borrowing the reasoning, not the look. The single most valuable page is the error-summary component, which states as a rule that you *must* show both a summary at the top and a message beside each field.
- **Use when:** you need a defensible answer about forms, errors, focus, question flow, or accessible defaults · **Don't use when:** you need a visual language, dark mode, or anything data-dense.
- **Scores /5:** visual 3 · interaction 4 · a11y 5 · engineering 4 · maintenance 5 · docs 5 · customization 3 · perf 5 · stability 5 · originality 5
- **Evidence:** ★1,450 · v6.5.0 released 2026-08-27 · last push 2026-09-09 · 169,447 wk npm (`govuk-frontend`) · ~77 contributors · MIT · used by UK government services (verified: it is the published GDS standard)
- **Looked at:** design-system.service.gov.uk (home, question-pages pattern, error-summary component) — blue #1d70b8 masthead block, zero border-radius on every element including the search field and the green Continue button, radios rendered at ~40px with a 2px black ring (roughly double the size of any commercial system's), and each component page embeds a live iframe example with HTML/Nunjucks tabs directly under it. The error summary is a 5px red #ca3535 box with an H2 and bold underlined red links to each failing field. Content column caps out well before the 1440px viewport; the right third is simply empty and it doesn't matter.
- **Verified numbers worth copying:** responsive spacing scale 0/5/10/15/20/25/30/40/50/60px where points 0–3 stay fixed across breakpoints and only 4–9 shrink on mobile; `$govuk-page-width: 960px`; `$govuk-gutter: 30px`; `$govuk-focus-width: 3px`; `$govuk-border-width-form-element: 2px`; `$govuk-hover-width: 10px`. The focus state is yellow #ffdd00 with a black #0b0c0c bottom bar, chosen so the pair clears WCAG 2.2 SC 1.4.11 against *any* background — yellow carries dark grounds, the black bar carries light ones.
- **Vibecode risk:** low — nobody accidentally ships GOV.UK's look; you have to choose it.
- **Link:** https://design-system.service.gov.uk/

### Nord — `essential`
- **What:** Nordhealth's design system for clinical software: web components, tokens, CSS framework, Tailwind layer, and unusually explicit written rationale.
- **Verdict:** This is the best-documented small system on the web and it is not close. It publishes the *reason* for the naming convention (`{n}-{category}-{subcategory}-{name}`, t-shirt sizes over numeric steps "so anyone, technical or non-technical" can read a token, `m` always the base), a practical accessibility checklist, and an argument for choosing web components over a framework binding. It is also the only system here that ships `llms.txt`, `llms-full.txt`, and installable agent skills — it treats coding agents as a documented consumer. The caveat that matters: there is no public source repository, so you are reading a free, closed-source artifact.
- **Use when:** you want a model for how to *write* a design system, or you need a dense-but-humane token vocabulary for clinical/admin software · **Don't use when:** you need to fork, audit, or vendor the source.
- **Scores /5:** visual 5 · interaction 4 · a11y 5 · engineering 4 · maintenance 4 · docs 5 · customization 4 · perf 4 · stability 4 · originality 5
- **Evidence:** no public GitHub repo (searched; `nordhealth/nord` 404s) · `@nordhealth/components` 5.3.0 published 2026-08-13 · 5,892 wk npm · license/contributors unverified · used by Nordhealth's clinical products (self-reported)
- **Looked at:** nordhealth.design — the hero is a working "New appointment" form built from real Nord components with the line "Rendered live with Nord web components — inspect away" underneath, which is a better trust signal than any screenshot. Navy #0e1b3d ink on #f6f7fb, blue accent, ~6px radius on inputs and buttons, ~10px on the card, one hairline border plus a barely-there shadow — restrained enough that it reads as software rather than a marketing page. Left rail groups Docs / Core / Updates with Design Tokens, Tailwind CSS, Blocks, Templates and Playground as peers. Says it covers 57 components and 300 icons.
- **Vibecode risk:** low — its palette and density are specific to clinical work; it does not leak into generic SaaS.
- **Link:** https://nordhealth.design/ · foundations: `/design/foundations/naming`, `/design/foundations/accessibility-checklist`, `/docs/developer/working-with-ai`

### U.S. Web Design System (USWDS) — `strong`
- **What:** The design system for US federal government websites.
- **Verdict:** Read one page and leave: the color token overview. USWDS defines color by *grade* on a 0–100 lightness scale regularized across every hue, then documents the "magic number" rule — a grade difference of 40 gets you AA Large, 50 gets you AA (or AAA Large), 70 gets you AAA, and any grade-50 color clears Section 508 AA against both white and black. That converts contrast from a per-pair check into arithmetic you can do while choosing a palette. It is the most useful transferable idea in this entire survey. The rest of the system is competent, dated, and heavily federal.
- **Use when:** you are designing a color system and want contrast to be structural rather than checked afterward · **Don't use when:** you want its components or its visual language.
- **Scores /5:** visual 2 · interaction 3 · a11y 5 · engineering 3 · maintenance 3 · docs 4 · customization 5 · perf 4 · stability 4 · originality 5
- **Evidence:** ★7,179 · v3.14.0 released 2026-08-18 (previous release v3.13.0, 2025-05-23 — a 15-month gap) · last push 2026-09-09 · 48,858 wk npm · ~194 contributors · public-domain/NOASSERTION
- **Looked at:** designsystem.digital.gov — Public Sans, 0px radius on everything except perfectly circular red #d83933 icon medallions, navy masthead. The homepage has two side-by-side CTAs of identical weight ("Introducing USWDS 3.0" red, "Migrating to USWDS 3.0" blue) with no hierarchy between them, and it is still framing 3.0 as news while shipping 3.14.0. The token system is far better than the site that presents it.
- **Vibecode risk:** low — nobody copies this by accident either.
- **Link:** https://designsystem.digital.gov/design-tokens/color/overview/

### Primer (GitHub) — `strong`
- **What:** GitHub's design system, split into Primer Product UI and Primer Brand UI, with React and Rails implementations.
- **Verdict:** Primer's components are ordinary; its *meta-documentation* is the best in the category. The Product UI sidebar carries sections almost nobody else writes: **Component status** (a maturity/lifecycle table so consumers know what's safe), **Degraded experiences** (what the UI does when things break — genuinely rare), **Empty states**, **Loading**, **Feature onboarding**, **Token Names**, and **Migrating to CSS Variables**. The product/brand split is also the honest admission most systems avoid: marketing and product need different rules, so give them different libraries. GitHub also now ships `@primer/mcp` (1.1.0, 2026-09-03), an MCP server pointing agents at the system.
- **Use when:** you are structuring your own design system's documentation, or you need prior art for component lifecycle and failure-state docs · **Don't use when:** you want a component library for a non-GitHub product — `primer/design` (the guidelines repo) was archived in July 2025.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 5 · customization 3 · perf 3 · stability 4 · originality 4
- **Evidence:** ★3,898 (`primer/react`) · `@primer/react@38.38.0` 2026-09-03 · last push 2026-09-10 · 37,155 wk npm · ~221 contributors · MIT · used by GitHub (verified)
- **Looked at:** primer.style and primer.style/product — the marketing home leans on Mona Sans display type, ~16px-radius soft cards and gradient blobs; the Product UI docs behind it are much plainer and better: white cards at ~6px radius, 1px #d1d9e0 borders, no shadows, #0969da links. The nav has "Accessibility" as a top-level item, which is the right place for it.
- **Vibecode risk:** medium — GitHub's grey-blue surfaces and Octicons are recognizable, but the token layer is neutral enough to repaint.
- **Link:** https://primer.style/product/

### Adobe Spectrum 2 / React Spectrum — `strong`
- **What:** Adobe's design system (Spectrum 2, v1.0 shipped 2025-12-16) and its React implementation, sitting on top of React Aria.
- **Verdict:** The strongest engineering and accessibility work in the category, and the layer underneath it — React Aria / React Stately — is what half the modern headless ecosystem is built on. The decision worth stealing is the **two platform scales**: every token has a `medium` (pointer) and `large` (touch) value, and `Provider` picks between them based on the device's pointer type, so touch targets grow as a system property rather than as per-component media queries. Separately, the docs use an annotated screenshot of a real app (SearchField, Popover, SegmentedControl, CardView called out with leader lines) to teach the component vocabulary — a far better front door than a grid of chips. The honest caveat: S2's visual language is unmistakably Adobe creative-tool chrome.
- **Use when:** you need rigorous a11y behavior, or a defensible model for responsive sizing tokens · **Don't use when:** you need a neutral house style — fully pill-shaped buttons and Adobe Clean read as Adobe.
- **Scores /5:** visual 4 · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 3 · perf 4 · stability 4 · originality 4
- **Evidence:** ★15,860 · `react-aria-components@1.21.0` and `@react-spectrum/s2@1.7.0` both 2026-09-04 · last push 2026-09-10 · 1,027,291 wk npm (`@adobe/react-spectrum`) · ~409 contributors · Apache-2.0 · used by Adobe products (verified)
- **Looked at:** react-spectrum.adobe.com and s2.spectrum.adobe.com — the docs hero is a purple→magenta→orange gradient with pill buttons and Adobe Clean; the S2 marketing microsite is a full-bleed gradient scrollytelling page whose top-right control is a **"Reduce motion" toggle**, exposed as a first-class page affordance rather than left to `prefers-reduced-motion`. That is a small decision worth copying on any motion-heavy page.
- **Vibecode risk:** medium — the pill geometry and saturated blue are an Adobe signature.
- **Link:** https://react-spectrum.adobe.com/

### IBM Carbon — `strong`
- **What:** IBM's open-source design system, built on the IBM Design Language.
- **Verdict:** The most consistently maintained system in this list — v11.116.0 shipped the day I checked, and there is no v12 despite the version number implying a long v11 tail. The 2x Grid is genuinely rigorous and its type/spacing relationships are worth studying if you build dense enterprise UI. But Carbon is house style all the way down: IBM Plex, 0px radius as doctrine, #0f62fe blue, and a token vocabulary that assumes IBM's information architecture. It also carries 1,037 open issues, which is what a 376-contributor system at IBM scale looks like.
- **Use when:** you are building information-dense enterprise software and want a battle-tested grid and token model · **Don't use when:** you want a product that doesn't look like IBM — escaping Plex and the zero-radius doctrine means rebuilding most of the visual layer.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 4 · customization 2 · perf 3 · stability 4 · originality 3
- **Evidence:** ★9,440 · v11.116.0 released 2026-09-09 · last push 2026-09-09 · 129,359 wk npm (`@carbon/react`) · ~376 contributors · Apache-2.0 · 1,037 open issues · used by IBM products (verified)
- **Looked at:** carbondesignsystem.com — a site-wide banner says "The Carbon site has been redesigned. Explore the preview site," so the current docs are already legacy. The hero illustration literally renders the 2x grid as its background, which is the most on-brand thing in the survey. IBM Plex Sans at every size, zero radius on every surface, pale blue #d0e2ff bands, and a 13-group accordion left nav that is dense to the point of being hard to scan.
- **Vibecode risk:** high — Plex plus zero radius plus #0f62fe is identifiable across a room.
- **Link:** https://carbondesignsystem.com/

### Helios (HashiCorp) — `strong`
- **What:** HashiCorp's design system: foundations, content, components, patterns.
- **Verdict:** The most underrated system here. Four top-level sections, one of which is **Content** — tone, voice, and user communication treated as a peer of Components rather than an appendix. 47 contributors and 512 stars means it is small enough to actually read end to end, and it ships on a steady cadence. The visual language is disciplined dark UI done without theatrics: no shadows anywhere on the entire site, ~4px radii, hairline borders. If you want a template for a design system your own team could realistically maintain, this is the one to copy the *shape* of.
- **Use when:** you are scoping a system for a small team, or you need prior art for documenting voice alongside components · **Don't use when:** you need breadth — it's Ember-first (`@hashicorp/design-system-components`) and its component count is modest.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 4 · docs 4 · customization 4 · perf 4 · stability 4 · originality 4
- **Evidence:** ★512 · `@hashicorp/design-system-components@6.5.0` 2026-08-14 · last push 2026-09-09 · 20,678 wk npm · ~47 contributors · MPL-2.0 · used by HashiCorp Cloud Platform (verified)
- **Looked at:** helios.hashicorp.design — pure black canvas, cards that are flat black with 1px ~#1f1f1f borders and no elevation at all, a blue-to-violet gradient only on the word "Helios," and an abstract token/component grid on the right that shows swatches, a toggle and a slider without pretending to be a product screenshot. Restraint is the whole visual argument and it works.
- **Vibecode risk:** low — quiet enough that its DNA doesn't announce itself.
- **Link:** https://helios.hashicorp.design/

### Material 3 / Material 3 Expressive — `situational`
- **What:** Google's open-source design system, plus the 2025–26 Expressive update.
- **Verdict:** M3 Expressive is the most heavily researched design change ever published — 46 studies, hundreds of design variants, more than 18,000 participants over roughly three years, with the headline finding that participants recognized key UI elements up to four times faster, and that older users spotted key elements as fast as young users across the ten apps tested. Read the research; that is a real, citable argument for larger shapes, stronger color contrast between roles, and expressive motion. Then do not use the components off-Android. M3's tonal palettes, fully-pill buttons and lavender surfaces are the single most recognizable house style in software, and a web product built on M3 defaults reads as a port of an Android app.
- **Use when:** building for Android, or citing evidence that expressive shape/color improves scan speed · **Don't use when:** building a web product with its own brand — M3 defaults will overwrite it.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 3 · maintenance 4 · docs 4 · customization 2 · perf 3 · stability 3 · originality 4
- **Evidence:** m3.material.io live and current (front page dated to Google I/O 2026, 2026-05-19) · research figures published by Google Design · npm/star metrics not meaningful (spec + multiple platform implementations)
- **Looked at:** m3.material.io — buttons at full pill radius, #6750A4 primary on #EADDFF-family surfaces, and a showcase strip of mobile mocks in saturated yellow/violet/cyan with very large shape language. An icon rail down the left with a pause control and a dark-mode toggle pinned bottom-left. Beautiful, and completely committed to being Android.
- **Vibecode risk:** very high.
- **Link:** https://m3.material.io/ · research: https://design.google/library/expressive-material-design-google-research

### Fluent 2 (Microsoft) — `situational`
- **What:** Microsoft's cross-platform design system and its `@fluentui/react-components` implementation.
- **Verdict:** Real depth in the token layer and two nav sections worth noticing — **Working with AI** and **Content engineering** — but the public site is partly a shell. "Employee sign-in" appears twice on the homepage and a meaningful amount of the system is gated. The library itself is enormous and healthy on distribution (329k weekly), though the GitHub releases stream has been quiet on tagged releases since May 2026 even as npm publishes continue. Visually it is incoherent: an iridescent 3D glass render sitting above flat 8px-radius cards with soft shadows, two design languages in one viewport.
- **Use when:** you're building inside the Microsoft ecosystem or need Windows/Office visual parity · **Don't use when:** you need a fully public, auditable set of guidelines.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 4 · docs 3 · customization 3 · perf 3 · stability 3 · originality 3
- **Evidence:** ★20,261 (`microsoft/fluentui`) · `@fluentui/react-components@9.74.7` published 2026-08-24 · last push 2026-09-09 · 329,189 wk npm · ~385 contributors · 801 open issues · used by Microsoft 365 (verified)
- **Looked at:** fluent2.microsoft.design — Segoe UI Variable, "Let the 'imagination' flow" with a single word in orange, a photoreal iridescent glass sculpture, and beneath it two plain cards with pixel-art-ish icons. The gap between the hero's rendering budget and the cards' visual quality is the tell.
- **Vibecode risk:** medium.
- **Link:** https://fluent2.microsoft.design/

### Atlassian Design System — `situational`
- **What:** Atlassian's design system, token layer, and brand site.
- **Verdict:** The token architecture is solid and the accessibility guidance is decent, but the front door at atlassian.design is now a brand advertisement — a 130px Atlassian Sans headline with multiplayer cursor labels floating over a dot grid — and the documentation is a click away behind "Design system". That reordering tells you what the site is now for. Worth reading for its token naming (semantic-first, `color.text.subtlest` style) and its ADS design-token migration story, which is one of the few public write-ups of moving a large product suite onto tokens.
- **Use when:** you need prior art on a large-scale hardcoded-value → token migration · **Don't use when:** you want components; they're tuned tightly to Jira/Confluence density.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 4 · docs 3 · customization 3 · perf 3 · stability 4 · originality 3
- **Evidence:** atlassian.design live 2026-09-09 · npm distributed as many `@atlaskit/*` packages, so a single download figure would be misleading · used by Jira/Confluence (verified)
- **Looked at:** atlassian.design — enormous black-and-#0055FF split headline "Better teamwork by design.", pastel cursor chips labelled Tony / Rovo / Kyah, faint dot grid, and a product screenshot beginning below the fold. Handsome as marketing; it is not a documentation home page.
- **Vibecode risk:** medium.
- **Link:** https://atlassian.design/

### Skyscanner Backpack — `reference-only`
- **What:** Skyscanner's design system for web, iOS and Android.
- **Verdict:** The docs are among the best-organized in this survey — eleven top-level sections including first-class **Content**, **Accessibility** and, uniquely, **Localisation**. For any product that ships in more than one language or currency, Backpack's localisation guidance is prior art almost nobody else publishes. But `Skyscanner/backpack` was archived on 2026-08-05, one day after the final `@skyscanner/backpack-web@43.19.0` publish, while `backpack-ios`, `backpack-android` and `backpack-foundations` remain active. Read the site; do not add the web package to a project.
- **Use when:** you need a model for documenting localisation and content in a design system · **Don't use when:** you need a maintained web component library — 1,390 weekly downloads and an archived repo is a closing door.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 3 · maintenance 1 · docs 5 · customization 3 · perf 3 · stability 2 · originality 4
- **Evidence:** ★543, repo archived 2026-08-05 · `@skyscanner/backpack-web@43.19.0` 2026-08-04 · 1,390 wk npm · Apache-2.0 · native repos pushed 2026-09-09
- **Looked at:** skyscanner.design — Skyscanner Relative type, Sky Blue #0062E3 on navy #05203C, 12px-radius cards, a specimen tile that sets Book/Medium/Bold/Black weights at display size, and emoji suffixed onto every nav label. Confident and legible; the type specimen as a "shortcut" card is a nice touch.
- **Vibecode risk:** low.
- **Link:** https://www.skyscanner.design/latest

### Shopify Polaris — `reference-only`
- **What:** Shopify's design system for the admin and third-party apps.
- **Verdict:** This is the biggest change in the category. Polaris React was deprecated on 2025-10-01, `Shopify/polaris` is archived and renamed `polaris-react-archive`, and every legacy documentation URL — `/foundations`, `/design/colors`, `/content/product-content` — now 302s to `shopify.dev/docs/api/polaris`. The content guidelines that made Polaris the reference for product writing are simply not on the public web any more. What replaced it is a Preact/web-component framework (`s-*` elements served from Shopify's CDN) motivated by a 64KB extension bundle ceiling, with legacy extension deploys cut off 2026-10-01. The 236k weekly downloads of `@shopify/polaris` are inertia, not health.
- **Use when:** you are building a Shopify app and must target the new web components · **Don't use when:** you are looking for the Polaris content guidelines — cite an archived copy or find another source.
- **Scores /5:** visual 3 · interaction 3 · a11y 3 · engineering 3 · maintenance 1 · docs 2 · customization 2 · perf 4 · stability 2 · originality 2
- **Evidence:** `Shopify/polaris` archived, description reads "React implementation (Deprecated)" · 236,030 wk npm (`@shopify/polaris`, legacy) · all design-doc URLs redirect to shopify.dev
- **Looked at:** polaris.shopify.com — lands on the shopify.dev "Polaris references" page: a developer-docs shell with a filter sidebar, pixel-emoji card icons, and surface cards for App Home / Admin / Checkout / Customer account / POS extensions. Its LLM affordances are notable — "Install AI Toolkit", "Ask about this page", "Copy MD" all sit in the page header. It is an API reference wearing a design system's URL.
- **Vibecode risk:** medium.
- **Link:** https://shopify.dev/docs/api/polaris

### Vercel Geist — `reference-only`
- **What:** Vercel's design system, covering Vercel, Next.js, Turbo, v0, eve and the AI SDK as separate brands.
- **Verdict:** Geist is genuinely excellent and genuinely dangerous. The layout idea worth stealing is that the hairline grid *is* the layout: content sits in cells divided by 1px ~#262626 rules with no cards, no radii and no shadows, so hierarchy comes entirely from position and type. It is also the direct ancestor of the default AI-generated aesthetic — pure black ground, Geist Sans, small radii, low-contrast borders — which means anything you build with its palette will read as generated. Study its structure, refuse its colors. The multi-brand sidebar (six brands, one token core) is also a good model for a company with several products.
- **Use when:** you need a model for grid-as-layout, or a multi-brand token architecture · **Don't use when:** you want the product to look like yours rather than like a v0 output.
- **Scores /5:** visual 5 · interaction 4 · a11y 3 · engineering 4 · maintenance 4 · docs 4 · customization 3 · perf 5 · stability 4 · originality 3
- **Evidence:** vercel.com/geist live 2026-09-09 · `@geist-ui/core` (29,501 wk npm) is a **community package, not Vercel's** — do not conflate them · Vercel's own components ship inside the Vercel/Next.js ecosystem
- **Looked at:** vercel.com/geist/introduction — #000 canvas divided into a bento of cells by hairline rules, sidebar grouped Foundations / Brands (Vercel, Next.js, Turbo, v0, eve, AI SDK) / Components, colors presented as vertical capsules across a nine-hue ramp, and the Geist Sans / Geist Mono specimen set in a dashed-outline box. Zero decoration; every pixel is doing structural work.
- **Vibecode risk:** very high — this is the look an agent produces when it isn't told what to do.
- **Link:** https://vercel.com/geist/introduction

### Gestalt (Pinterest) — `reference-only`
- **What:** Pinterest's design system.
- **Verdict:** Gestalt's public reputation no longer matches its public availability. The current documentation homepage shows a padlock on Get Started, Foundations and Components, with a Login button top-right; `/foundations/color/palette` redirects to `/auth/signin`. Only the frozen `/v1/` tree is still open. That, plus no npm publish since 2025-12-09 despite repo activity, reads as a system moving inward. The v1 docs are still worth reading for its visual-density and image-heavy layout guidance, which is unusually good because Pinterest's product is images.
- **Use when:** you want prior art on image-dense grid layouts (read `/v1/`) · **Don't use when:** you need current guidance — you can't see it.
- **Scores /5:** visual 4 · interaction 3 · a11y 4 · engineering 3 · maintenance 2 · docs 2 · customization 3 · perf 3 · stability 2 · originality 3
- **Evidence:** ★4,370 · last push 2026-09-03 but `gestalt@177.0.12` last published 2025-12-09 · 13,075 wk npm · ~139 contributors · Apache-2.0 · `/foundations/*` → `/auth/signin` (verified)
- **Looked at:** gestalt.pinterest.systems — very heavy tight-tracked display type reading "Pinterest's Design System" centered between scattered ~24px-radius photo tiles, a red #E60023 Login button, and three section cards each prefixed with a lock glyph. It is a beautiful brand page that has stopped being documentation.
- **Vibecode risk:** medium.
- **Link:** https://gestalt.pinterest.systems/v1/web/overview

### Apple Human Interface Guidelines — `reference-only`
- **What:** Apple's platform design guidance across iOS, iPadOS, macOS, visionOS, watchOS and tvOS.
- **Verdict:** The best-written prose about interaction design that exists, and the only guidance in this list organized around *platform conventions and user expectations* rather than components and tokens. Its sections on navigation, modality, feedback and inputs are worth reading end to end regardless of what you build. It is also the most misused: porting Apple's chrome — its sheet behavior, its blur materials, its control geometry — to the web produces something that feels borrowed rather than native. Read it for principles; implement in your own platform's idiom.
- **Use when:** you need to reason about modality, navigation depth, gesture affordances, or platform expectations · **Don't use when:** you want tokens, components, or anything you can install.
- **Scores /5:** visual 5 · interaction 5 · a11y 4 · engineering n/a · maintenance 5 · docs 5 · customization n/a · perf n/a · stability 5 · originality 5
- **Evidence:** proprietary, no repo, no package · updated annually alongside OS releases
- **Vibecode risk:** n/a for the guidance itself; high if you port its visual language to the web.
- **Link:** https://developer.apple.com/design/human-interface-guidelines

### Linear and Stripe — `reference-only`
- **What:** Two systems that are observable but unpublished.
- **Verdict:** Neither company ships a public design system, and both are studied constantly anyway. Stripe's contribution is documentation craft and form design — its checkout and its API docs are the reference for progressive disclosure and error recovery in payments. Linear's contribution is density and restraint, and it is now the most-copied surface in software: near-black #08090a, Inter-family display at large sizes with roughly -0.03em tracking, low-contrast grey body text, ~28px sidebar rows with 13px labels, and ambient glow instead of drop shadows. An agent asked for "a modern app UI" will produce a worse version of this by default, which is exactly why it should be a deliberate choice, not a fallback.
- **Use when:** you want a target for density and typographic restraint (Linear) or for forms and docs (Stripe) · **Don't use when:** you need something citable — there is no spec to cite.
- **Evidence:** no published system, no repo, no package (verified: neither publishes design-system documentation)
- **Looked at:** linear.app — #08090a ground, ~72px headline "The product development system for teams and agents", #8a8f98 supporting copy, and a product screenshot in a ~12px-radius frame with a 1px #1f2023 border and a soft ambient bloom rather than a shadow. Every element is one or two steps quieter than a typical marketing page, and the restraint is the entire effect.
- **Vibecode risk:** very high.
- **Link:** https://linear.app/

### Base Web (Uber) — `reference-only`
- **What:** Uber's React UI framework.
- **Verdict:** Technically serviceable and still shipping, but there is nothing to learn from it as a *design system*. Its own docs advertise "What's new in Base Web 16?" while the version selector reads v18.2.0 — the site's own news is two majors stale — and the component list contains both `Checkbox` and `Checkbox-v2`, which is what accumulated API drift looks like when nobody is empowered to remove things. Base Web has no published foundations, principles, or content guidance; it is a component library that inherited a design system's reputation.
- **Use when:** you already have it in a codebase · **Don't use when:** starting anything new, or looking for design guidance.
- **Scores /5:** visual 2 · interaction 3 · a11y 4 · engineering 3 · maintenance 2 · docs 2 · customization 4 · perf 2 · stability 3 · originality 2
- **Evidence:** ★9,006 · `baseui@18.2.0` 2026-07-02 · last push 2026-09-04 · 41,489 wk npm · ~239 contributors · MIT · CSS-in-JS (Styletron) runtime
- **Looked at:** baseweb.design — plain docs shell, black 0-radius buttons, hairline card borders, and a left rail whose duplicated `Checkbox`/`Checkbox-v2` entries are visible without scrolling.
- **Vibecode risk:** medium.
- **Link:** https://baseweb.design/

### Cedar (REI) — `situational`
- **What:** REI Co-op's open-source design system (Vue).
- **Verdict:** Genuinely charming and genuinely tiny. It is the only system in this survey that uses a serif for display type, and it earns it — "Cooperative by design" set in a high-contrast serif on charcoal #33322E does more brand work than most systems' entire color pages. Cedar 17 shipped "package modernization, first-class types, and token-aligned APIs" and there's a "new fluid foundation" write-up, so it is actively evolving. But 72 weekly npm downloads and 51 stars means you are adopting a single company's internal system. Study the brand-expression decisions; don't depend on the package.
- **Use when:** you want proof that a design system can have a voice, or you're on Vue and want a small readable codebase · **Don't use when:** you need ecosystem, community, or React.
- **Scores /5:** visual 4 · interaction 3 · a11y 4 · engineering 3 · maintenance 4 · docs 3 · customization 3 · perf 3 · stability 3 · originality 5
- **Evidence:** ★51 (`rei/rei-cedar`) · `@rei/cedar@17.1.0` 2026-07-31 · last push 2026-09-08 · 72 wk npm · MIT · used by rei.com (verified)
- **Looked at:** cedar.rei.com — charcoal hero with white serif display, sidebar split About / Tools & resources / Contributing above Guidelines / Tokens / Components / Patterns, and light 8px-radius news cards overlapping the hero's lower edge. The hero image itself was broken at capture time (a missing-image glyph in the top-left), which is a small honest signal about team size.
- **Vibecode risk:** low.
- **Link:** https://cedar.rei.com/

## Rejected / avoid
- **Orbit (Kiwi.com)** — `orbit.kiwi` does not resolve in DNS as of 2026-09-09, so the documentation an agent would cite is unreachable. The last stable npm release was `@kiwicom/orbit-components@27.7.0` on 2025-10-31 and the newest published version is an alpha from 2025-11-25. The repo is unarchived and 30k weekly downloads persist, but a design system whose docs are offline cannot be a reference. Do not recommend it for new work.
- **Ant Design (as a design reference)** — the library is fine and enormously popular (99,457★, 3.2M weekly), but its *design guidance* is thin next to everything above, much of it is translated and dated, and its house style is the most instantly identifiable in B2B software. An agent reaching for antd defaults produces a product that looks like every other antd product. Use it as a component library if the team already has it; never cite it as design rationale.
- **Salesforce Lightning Design System** — `salesforce-ux/design-system` is archived; the SLDS2 transition is not coherently documented in public. `@salesforce-ux/design-system` still pulls 44k weekly, which is Salesforce-ecosystem inertia. Nothing to learn from here that isn't better documented elsewhere.
- **Clarity (VMware)** — `vmware-clarity/core` archived 2026-02-02 at 184 stars. The site is still up. Post-Broadcom, treat it as historical.
- **Wise Design** — wise.design is now an auto-scrolling brand inspiration gallery with an Inspiration/Direction toggle and no component or token documentation. Excellent brand craft, zero engineering value. It also served a Bulgarian-localised footer to a US-region headless browser, which suggests geo-detection with no locale fallback.
- **Mailchimp pattern library** — `ux.mailchimp.com` returns 503. The origin of the modern voice-and-tone guide is no longer online; only `styleguide.mailchimp.com` responds. Cite an archived copy or move on.
- **Audi and BMW design systems** — `bmw.design` does not resolve; Audi's corporate identity URL 404s. No verifiable public system. Skip.
- **Canvas (Workday)** — `canvas.workday.com` returned 403 to automated fetches, so nothing could be verified. Unverified rather than rejected, but not citable.
- **`@geist-ui/core`** — a community React library that borrowed the Geist name; 29,501 weekly downloads make it look official. It is not Vercel's design system. Agents conflate these constantly.

## What the best design systems have in common
1. **They document the failure mode, not the component.** GOV.UK's error-summary page opens with a rule ("you must show both an error summary and an error message next to each answer"), not a prop table. Primer has an entire **Degraded experiences** section. Almost nobody else writes down what happens when things break.
2. **They make contrast and sizing structural, not checked afterward.** USWDS grades and Spectrum's two scales both convert a per-instance judgment into a system property.
3. **They separate brand from product.** Primer split into Product UI and Brand UI; Geist has one token core across six brands. Systems that refuse the split end up with marketing pressure deforming product components.
4. **They publish a maturity signal.** Primer's Component status page tells consumers what's safe to depend on. Systems without one accumulate `Checkbox` and `Checkbox-v2`.
5. **The ones aging worst are the ones that were never a system, only a component library.** Base Web and Orbit both had strong components and no published principles; both are drifting. GOV.UK and Nord have modest component counts and enormous written rationale; both are healthy.

## The specific documented decisions most worth copying (with numbers)
- **USWDS color grades.** Define every hue on a regularized 0–100 lightness scale. Grade difference ≥40 → AA Large; ≥50 → AA (or AAA Large); ≥70 → AAA. Any grade-50 color clears Section 508 AA against both white and black. This is the highest-leverage idea in the survey.
- **GOV.UK responsive spacing.** 0 / 5 / 10 / 15 / 20 / 25 / 30 / 40 / 50 / 60px, where points 0–3 are identical at every breakpoint and only 4–9 compress on mobile. Small gaps shouldn't change with viewport; large ones should.
- **GOV.UK body type at 19px/25px on desktop, 16px/20px on mobile**, with the 48px display size dropping to 32px below 640px. Larger body text than the 16px default, defended by research.
- **GOV.UK focus state.** Yellow #ffdd00 fill plus a black #0b0c0c bottom bar, `$govuk-focus-width: 3px`, chosen so the pair passes WCAG 2.2 SC 1.4.11 on *any* background rather than only on the one you tested.
- **GOV.UK layout constants.** 960px max content width, 30px gutter, 2px form-element borders, 10px hover width. A 1440px viewport is mostly empty and that is the correct answer.
- **Spectrum's two platform scales.** Every token carries a `medium` and a `large` value; the Provider picks based on pointer type. Touch targets grow as a system property, not as scattered media queries.
- **Nord's token grammar.** `n-{category}-{subcategory}-{name}`, t-shirt sizes rather than numeric steps so non-engineers can read them, `m` always the base, and color tokens named by role (accent / border / text / surface / status) with modifiers (weak / strong / hover / active).
- **Adobe S2's page-level "Reduce motion" toggle.** On a motion-heavy page, expose the control; don't only honor `prefers-reduced-motion` and assume everyone has set it.
- **Material 3 Expressive's evidence.** 46 studies, 18,000+ participants, ~3 years, key UI elements recognized up to 4× faster, and older users matching young users' scan speed across 10 apps. When someone argues that bigger shapes and stronger color roles are "unserious", this is the citation.

## Open questions
- **Nord's license and team size are unverified.** There is no public source repository (`nordhealth/nord` 404s; a GitHub org search returns only unrelated forks). Settled by finding a LICENSE in the published npm tarball of `@nordhealth/components`.
- **Where the Polaris content guidelines went.** Every legacy URL redirects to the API reference. Settled by checking the Wayback Machine for `polaris.shopify.com/content/*` and confirming whether Shopify republished them anywhere.
- **Whether Skyscanner Backpack Web went private or is being retired.** The repo archived one day after its final publish while native repos stay active. Settled by a Skyscanner engineering post or by watching whether `@skyscanner/backpack-web` publishes again after 43.19.0.
- **Whether Gestalt's gating is permanent.** `/v1/` is public, current docs are not. Settled by a Pinterest statement or by the next npm publish after the 9-month gap.
- **Adobe's `spectrum-tokens` repo now contains only `site/` and has 0 stars**, which does not match a system that shipped S2 v1.0 in December 2025. The real token source may have moved. Settled by finding the package that `@react-spectrum/s2` consumes for its token values.
- **Workday Canvas** returns 403 to automated fetches and could not be evaluated at all.
