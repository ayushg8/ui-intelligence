# Published design systems worth studying

**Evaluated:** 2026-09 · **Researcher note:** The public-design-system era is contracting. Shopify deleted its design guidance from the open web (polaris.shopify.com now 302s to an API reference), Pinterest put new Gestalt docs behind `/auth/signin`, Skyscanner archived Backpack Web while keeping iOS/Android open, and Kiwi's orbit.kiwi no longer resolves in DNS. What's left splits cleanly: government systems (GOV.UK, USWDS) still publish the *reasoning*, big-tech systems publish the *tokens*, and the best small system (Nord) publishes both plus an `llms.txt` and agent skills. Twilio Paste joined the retreat during this pass: `paste.twilio.design` now 301s straight to the GitHub repo, so one of the best-documented public systems has no documentation site left. If an agent needs a defensible answer about a UI decision, three sites carry almost all of the citable rationale: GOV.UK, USWDS design tokens, and Cloudscape's gen-AI foundation. Nord's foundations are still the best-written prose in the category, but its license makes it read-only — see its scorecard.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| GOV.UK Design System | `essential` | The only system that publishes user research behind each component; cite it when you need to win an argument. | low |
| Nord (Nordhealth) | `strong` | Best-documented token naming and a11y rationale of any system — but its license forbids anyone outside Nordhealth from using it. Read only. | low |
| Cloudscape (AWS) | `strong` | The only system publishing real guidance on generative-AI interfaces — 28 gen-AI pages including Thinking, Response regeneration and User authorized actions. | medium |
| Braid (SEEK) | `strong` | Constraint-based API plus Playroom: the best published answer to "designers and developers iterating in the same medium." | low |
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
| Base Web (Uber) | `reference-only` | Still shipping, but the docs banner advertises v16 while the selector says v18.2.0. Nothing to learn design-wise. | low |
| Web Awesome (ex-Shoelace) | `situational` | The default non-React answer, 1.3M weekly — but a component library with no published foundations, by this file's own test. | high |
| Elastic EUI | `situational` | 317k weekly and genuinely maintained; the guidance is thinner than the distribution implies. | medium |
| GC Design System (Canada) | `situational` | Tiny, but the only system publishing bilingual/official-languages guidance as a first-class concern. | low |
| Cedar (REI) | `situational` | Charming, actively evolving, 72 weekly npm downloads. Vue-only. Study, don't adopt. | low |
| Orbit (Kiwi.com) | `avoid` | Documentation site does not resolve; last stable release 2025-10-31. | — |
| Ant Design guidelines | `avoid` | Excellent component library, thin design guidance, and the most instantly-recognizable house style in B2B. | very high |
| Salesforce Lightning | `avoid` | `salesforce-ux/design-system` archived; SLDS2 transition unfinished in public. | high |
| Clarity (VMware) | `avoid` | `vmware-clarity/core` archived 2026-02-02. | — |
| Wise Design | `avoid` | wise.design is now a brand inspiration gallery, not a design system. | — |
| Twilio Paste | `avoid` | paste.twilio.design now 301s to the GitHub repo. The docs site is gone. | — |
| Mailchimp pattern library | `avoid` | ux.mailchimp.com returns 503. | — |

## Recommendations by need
- **Default choice for a defensible answer:** GOV.UK Design System — every component page states the rule as a *must*, links the research, and names the failure mode it prevents.
- **Best engineering:** Adobe React Spectrum — 409 contributors (verified), `react-aria-components@1.21.1` shipped 2026-09-04, and at 3,520,784 weekly downloads React Aria is measurably the floor the rest of the ecosystem builds on.
- **Best visual quality out of the box:** Nord to *look at* — the docs hero is rendered live with its own web components and holds up as a real product surface, not a component gallery. You cannot legally ship it (see license). If you need something you can actually install that looks good unmodified: Braid or Cloudscape.
- **Best accessibility:** GOV.UK for *documented reasoning*, React Spectrum for *implemented behavior*. Use both; they answer different questions.
- **Most customizable / least house-style:** USWDS — its tokens are defined by measured lightness grades rather than brand hexes, so the system survives a full palette swap.
- **Lightest to learn from:** Helios — four sections, no ceremony, and it treats Content as a peer of Components.
- **Best guidance for AI interfaces:** Cloudscape — 28 pages under `/gen-ai/` covering Thinking, Response regeneration, In-chat context, Artifact previews and User authorized actions. Nothing else in this category has published anything comparable.
- **Best non-React option:** Web Awesome for breadth (framework-agnostic web components, 1.3M weekly), Nord for quality of thinking, Vanilla Framework if you want plain CSS. All three are worse-documented than the React field.
- **Promising newcomer:** none as a *system*. Cloudscape's gen-AI section is the only genuinely new body of design guidance published in this category since 2025; everything else here is a survivor.
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

### Nord — `strong` (was `essential`)
- **What:** Nordhealth's design system for clinical software: web components, tokens, CSS framework, Tailwind layer, and unusually explicit written rationale.
- **Verdict:** This is the best-documented small system on the web and it is not close. It publishes the *reason* for the naming convention (`{n}-{category}-{subcategory}-{name}`, t-shirt sizes over numeric steps "so anyone, technical or non-technical" can read a token, `m` always the base), a practical accessibility checklist, and an argument for choosing web components over a framework binding. It is also one of only two systems here shipping `llms.txt` and agent-facing docs (Cloudscape is the other) — it treats coding agents as a documented consumer. **The caveat that changes the verdict:** I pulled `LICENSE.md` out of the published npm tarball, and it is neither permissive nor free. It grants "a limited, non-exclusive, revocable license to access and use the Package solely for the purpose of performing your duties for and on behalf of Nordhealth," and adds "You may not access or use the Package or reproduce, retransmit, disseminate, sell, publish, broadcast or use it for any other reason." Nordhealth's own `llms.txt` says the same in softer words: "start building for Nordhealth products." So Nord is a public artifact you are licensed to read and not to use. That is why it is `strong` rather than `essential` — an `essential` verdict implies you can act on it.
- **Use when:** you want a model for how to *write* a design system, or a token vocabulary to imitate in your own naming · **Don't use when:** you intend to install it. Reading the docs is fine; `npm i @nordhealth/components` in a product that is not Nordhealth's is outside the license you are granted.
- **Scores /5:** visual 5 · interaction 4 · a11y 5 · engineering 4 · maintenance 4 · docs 5 · customization 4 · perf 4 · stability 4 · originality 5
- **Evidence:** no public source repo — the site's own sidebar links to `github.com/nordhealth/design-system`, which **404s** (the `nordhealth` org has 17 public repos and none is the design system) · `@nordhealth/components@5.3.0` published 2026-08-13 · 5,892 wk npm · **license verified: proprietary, `SEE LICENSE IN LICENSE.md`, use restricted to work performed for Nordhealth** · contributors unknowable without a repo · used by Nordhealth's clinical products (self-reported)
- **Looked at:** nordhealth.design — the hero is a working "New appointment" form built from real Nord components with the line "Rendered live with Nord web components — inspect away" underneath, which is a better trust signal than any screenshot. Navy #0e1b3d ink on #f6f7fb, blue accent, ~6px radius on inputs and buttons, ~10px on the card, one hairline border plus a barely-there shadow — restrained enough that it reads as software rather than a marketing page. Left rail groups Docs / Core / Updates with Design Tokens, Tailwind CSS, Blocks, Templates and Playground as peers. Says it covers 57 components and 300 icons.
- **Vibecode risk:** low — its palette and density are specific to clinical work; it does not leak into generic SaaS. The licensing risk is the real one here, not the aesthetic one.
- **Link:** https://nordhealth.design/ · foundations: `/design/foundations/naming`, `/design/foundations/accessibility-checklist`, `/docs/developer/working-with-ai`

### U.S. Web Design System (USWDS) — `strong`
- **What:** The design system for US federal government websites.
- **Verdict:** Read one page and leave: the color token overview. USWDS defines color by *grade* on a 0–100 lightness scale regularized across every hue, then documents the "magic number" rule — a grade difference of 40 gets you AA Large, 50 gets you AA (or AAA Large), 70 gets you AAA, and any grade-50 color clears Section 508 AA against both white and black. That converts contrast from a per-pair check into arithmetic you can do while choosing a palette. It is the most useful transferable idea in this entire survey. The rest of the system is competent, dated, and heavily federal.
- **Use when:** you are designing a color system and want contrast to be structural rather than checked afterward · **Don't use when:** you want its components or its visual language.
- **Scores /5:** visual 2 · interaction 3 · a11y 5 · engineering 3 · maintenance 3 · docs 4 · customization 5 · perf 4 · stability 4 · originality 5
- **Evidence:** ★7,179 · v3.14.0 released 2026-08-18 (previous release v3.13.0, 2025-05-23 — a 15-month gap) · last push 2026-09-09 · 48,858 wk npm (`@uswds/uswds`; the unscoped legacy `uswds` package is a separate 10,549 — don't add them) · 194 contributors (verified) · public-domain/NOASSERTION
- **Looked at:** designsystem.digital.gov — Public Sans, 0px radius on everything except perfectly circular red #d83933 icon medallions, navy masthead. The homepage has two side-by-side CTAs of identical weight ("Introducing USWDS 3.0" red, "Migrating to USWDS 3.0" blue) with no hierarchy between them, and it is still framing 3.0 as news while shipping 3.14.0. The token system is far better than the site that presents it.
- **Vibecode risk:** low — nobody copies this by accident either.
- **Link:** https://designsystem.digital.gov/design-tokens/color/overview/

### Primer (GitHub) — `strong`
- **What:** GitHub's design system, split into Primer Product UI and Primer Brand UI, with React and Rails implementations.
- **Verdict:** Primer's components are ordinary; its *meta-documentation* is the best in the category. The Product UI sidebar carries sections almost nobody else writes: **Component status** (a maturity/lifecycle table so consumers know what's safe), **Degraded experiences** (what the UI does when things break — genuinely rare), **Empty states**, **Loading**, **Feature onboarding**, **Token Names**, and **Migrating to CSS Variables**. The product/brand split is also the honest admission most systems avoid: marketing and product need different rules, so give them different libraries. GitHub also now ships `@primer/mcp` (1.1.0, 2026-09-03), an MCP server pointing agents at the system.
- **Use when:** you are structuring your own design system's documentation, or you need prior art for component lifecycle and failure-state docs · **Don't use when:** you want a component library for a non-GitHub product — `primer/design` (the guidelines repo) was archived in July 2025.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 5 · customization 3 · perf 3 · stability 4 · originality 4
- **Evidence:** ★3,898 (`primer/react`) · `@primer/react@38.38.0` 2026-09-03, with `38.39.0-rc.*` publishing daily · last push 2026-09-10 · 37,155 wk npm · 221 contributors (verified) · MIT · `primer/design` archived 2025-07-02 at 761★ (verified) · `@primer/mcp` pulls 8,343 wk · used by GitHub (verified)
- **Looked at:** primer.style and primer.style/product — the marketing home leans on Mona Sans display type, ~16px-radius soft cards and gradient blobs; the Product UI docs behind it are much plainer and better: white cards at ~6px radius, 1px #d1d9e0 borders, no shadows, #0969da links. The nav has "Accessibility" as a top-level item, which is the right place for it.
- **Vibecode risk:** medium — GitHub's grey-blue surfaces and Octicons are recognizable, but the token layer is neutral enough to repaint.
- **Link:** https://primer.style/product/

### Adobe Spectrum 2 / React Spectrum — `strong`
- **What:** Adobe's design system (Spectrum 2, v1.0 shipped 2025-12-16) and its React implementation, sitting on top of React Aria.
- **Verdict:** The strongest engineering and accessibility work in the category, and the layer underneath it — React Aria / React Stately — is what half the modern headless ecosystem is built on. The decision worth stealing is the **two platform scales**: every token has a `medium` (pointer) and `large` (touch) value, and `Provider` picks between them based on the device's pointer type, so touch targets grow as a system property rather than as per-component media queries. Separately, the docs use an annotated screenshot of a real app (SearchField, Popover, SegmentedControl, CardView called out with leader lines) to teach the component vocabulary — a far better front door than a grid of chips. The honest caveat: S2's visual language is unmistakably Adobe creative-tool chrome.
- **Use when:** you need rigorous a11y behavior, or a defensible model for responsive sizing tokens · **Don't use when:** you need a neutral house style — fully pill-shaped buttons and Adobe Clean read as Adobe.
- **Scores /5:** visual 4 · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 3 · perf 4 · stability 4 · originality 4
- **Evidence:** ★15,860 · `react-aria-components@1.21.1` and `@react-spectrum/s2@1.7.1`, both 2026-09-04 (an earlier pass recorded 1.21.0/1.7.0 — corrected) · last push 2026-09-10 · **3,520,784 wk npm (`react-aria-components`)** vs 1,027,291 (`@adobe/react-spectrum`) — the headless layer outsells the styled one 3.4:1, which is the real evidence for the "everyone builds on React Aria" claim · 409 contributors (verified) · Apache-2.0 · token source is `adobe/spectrum-design-data` (152★, Apache-2.0, pushed 2026-09-10) · used by Adobe products (verified)
- **Looked at:** react-spectrum.adobe.com and s2.spectrum.adobe.com — the docs hero is a purple→magenta→orange gradient with pill buttons and Adobe Clean; the S2 marketing microsite is a full-bleed gradient scrollytelling page whose top-right control is a **"Reduce motion" toggle**, exposed as a first-class page affordance rather than left to `prefers-reduced-motion`. That is a small decision worth copying on any motion-heavy page.
- **Vibecode risk:** medium — the pill geometry and saturated blue are an Adobe signature.
- **Link:** https://react-spectrum.adobe.com/

### IBM Carbon — `strong`
- **What:** IBM's open-source design system, built on the IBM Design Language.
- **Verdict:** The most consistently maintained system in this list — v11.116.0 shipped the day I checked, and there is no v12 despite the version number implying a long v11 tail. The 2x Grid is genuinely rigorous and its type/spacing relationships are worth studying if you build dense enterprise UI. But Carbon is house style all the way down: IBM Plex, 0px radius as doctrine, #0f62fe blue, and a token vocabulary that assumes IBM's information architecture. It also carries 1,037 open issues, which is what a 376-contributor system at IBM scale looks like.
- **Use when:** you are building information-dense enterprise software and want a battle-tested grid and token model · **Don't use when:** you want a product that doesn't look like IBM — escaping Plex and the zero-radius doctrine means rebuilding most of the visual layer.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 4 · customization 2 · perf 3 · stability 4 · originality 3
- **Evidence:** ★9,441 · repo tag v11.116.0 and `@carbon/react@1.116.0` both 2026-09-09 · last push 2026-09-09 · 129,359 wk npm · 376 contributors (verified) · Apache-2.0 · 1,038 open issues · used by IBM products (verified)
- **Looked at:** carbondesignsystem.com — a site-wide banner says "The Carbon site has been redesigned. Explore the preview site," so the current docs are already legacy. The hero illustration literally renders the 2x grid as its background, which is the most on-brand thing in the survey. IBM Plex Sans at every size, zero radius on every surface, pale blue #d0e2ff bands, and a 13-group accordion left nav that is dense to the point of being hard to scan.
- **Vibecode risk:** high — Plex plus zero radius plus #0f62fe is identifiable across a room.
- **Link:** https://carbondesignsystem.com/

### Helios (HashiCorp) — `strong`
- **What:** HashiCorp's design system: foundations, content, components, patterns.
- **Verdict:** The most underrated system here. Four top-level sections, one of which is **Content** — tone, voice, and user communication treated as a peer of Components rather than an appendix. 47 contributors and 512 stars means it is small enough to actually read end to end, and it ships on a steady cadence. The visual language is disciplined dark UI done without theatrics: no shadows anywhere on the entire site, ~4px radii, hairline borders. If you want a template for a design system your own team could realistically maintain, this is the one to copy the *shape* of.
- **Use when:** you are scoping a system for a small team, or you need prior art for documenting voice alongside components · **Don't use when:** you need breadth — it's Ember-first (`@hashicorp/design-system-components`) and its component count is modest.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 4 · docs 4 · customization 4 · perf 4 · stability 4 · originality 4
- **Evidence:** ★512 · `@hashicorp/design-system-components@6.5.0` 2026-08-14, with a `7.0.0-rc` line publishing since 2026-08-19 (a major is in flight — check before pinning) · last push 2026-09-09 · 20,678 wk npm · 47 contributors (verified) · MPL-2.0 · used by HashiCorp Cloud Platform (verified)
- **Looked at:** helios.hashicorp.design — pure black canvas, cards that are flat black with 1px ~#1f1f1f borders and no elevation at all, a blue-to-violet gradient only on the word "Helios," and an abstract token/component grid on the right that shows swatches, a toggle and a slider without pretending to be a product screenshot. Restraint is the whole visual argument and it works.
- **Vibecode risk:** low — quiet enough that its DNA doesn't announce itself.
- **Link:** https://helios.hashicorp.design/

### Cloudscape (AWS) — `strong` *(added 2026-09 challenge pass)*
- **What:** Amazon's open-source design system for cloud consoles — foundation, components, patterns, demos, and a full generative-AI section.
- **Verdict:** The largest omission in the original file, and it is not close. Cloudscape publishes **28 pages under `/gen-ai/`** — Thinking, Generative AI loading states, Response regeneration, Follow-up questions, In-chat context, In-flow user input, Conversational history, Artifact previews, Progressive steps, Support prompts, Shortcut menus, Agent management, User authorized actions, Visual affordance, plus its own LLMs.txt guidance. Nothing else in this survey has published *any* comparable body of guidance on designing AI interfaces, and a corpus whose purpose is to stop products looking AI-generated needs the one system that has thought about it in public. Separately, Cloudscape is the only entry here built for genuinely dense console UI that is not IBM-locked: Carbon is the file's only other dense-enterprise option and Carbon costs you Plex, zero radius and #0f62fe. The visual language is unremarkable AWS-console (blue links, 8px radius, generic grotesque) — that is a fair trade for guidance nobody else writes.
- **Use when:** you are building a console, an admin surface, or any generative-AI interface and want documented prior art rather than vibes · **Don't use when:** you want a distinctive look — this system does not have one and does not claim one.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 5 · customization 3 · perf 3 · stability 4 · originality 4
- **Evidence:** ★2,642 (`cloudscape-design/components`) · last push 2026-09-09 · 92,036 wk npm (`@cloudscape-design/components`) · Apache-2.0 · cloudscape.design 200 · used by the AWS Console (verified)
- **Looked at:** cloudscape.design (screenshotted at 1440 and 390 during this pass) — dark hero over an angled collage of *real* dense product surfaces: dashboards with 14/126/116/28 stat rows, stacked bar charts, filter tables, and a literal `<AppLayout contentHeader=` code fragment floating in the montage. It is showing what the system is for instead of showing chips in a grid, which is a better front door than Atlassian's brand ad or USWDS's two identical CTAs. Below it, a single bordered card splits Foundation / Components / Patterns / Demos into four plain columns with one sentence each. Top nav puts **Gen AI** as a peer of Foundation and Components, which is the tell that the section is maintained rather than bolted on.
- **Vibecode risk:** medium — and specifically about the gen-AI patterns, not the chrome. Copy its chat layout literally and you ship the generic assistant UI everyone else ships. Read it for *what decisions exist* (does the model expose its thinking? can the user authorize an action? what does a regenerate affordance imply?), then answer those questions in your own visual language.
- **Link:** https://cloudscape.design/gen-ai/

### Braid (SEEK) — `strong` *(added 2026-09 challenge pass)*
- **What:** SEEK Group's themeable, cross-brand design system: React components, vanilla-extract CSS-variable themes, and Playroom.
- **Verdict:** Braid takes a position almost nobody else states out loud: **the component API should be legible to non-developers**, and the design artifact should be the running code rather than a mock. Its site says it plainly — "we want Braid code to make sense to non-developers… reducing the need for high fidelity mock ups before development starts." Playroom, the in-browser multi-viewport prototyping tool it ships to make that true, escaped SEEK and is now used by teams with no connection to Braid; that is a rare thing for a single company's system to produce. Two other decisions worth stealing: **Tones** as a foundation-level primitive instead of a color palette (you pick `critical` / `positive` / `caution`, never a hex, so a theme swap cannot break meaning), and a layout API composed only from scale steps, so arbitrary values are not expressible. That constraint is the structural version of what USWDS does for contrast — the file already praises that idea and then omits the system that applies it to spacing.
- **Use when:** you need prior art for constraint-based component APIs, multi-brand theming, or design-in-code prototyping · **Don't use when:** you need breadth or a large ecosystem — it is React-only and scoped to SEEK's job-marketplace surfaces.
- **Scores /5:** visual 3 · interaction 4 · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 4 · originality 5
- **Evidence:** ★1,571 · last push 2026-09-10 · 6,775 wk npm (`braid-design-system`) · MIT · docs live at seek-oss.github.io 200
- **Looked at:** seek-oss.github.io/braid-design-system (screenshotted at 1440 and 390) — no marketing layer at all: a left rail and a prose column. The rail is the argument: Releases / Gallery / **Playroom** / GitHub, then GUIDES (Design Workflow, Development Workflow, Playroom Prototyping, Contribution, Testing Guide), then FOUNDATIONS (Layout, **Tones**, Iconography), then TEMPLATES (Layouts, Sections — both badged "New"). A brand switcher labelled "SEEK Jobs" sits at the very top, which is the honest placement for a multi-brand system. Plain blue links, generous line height, zero decoration. It looks like documentation because that is all it is trying to be.
- **Vibecode risk:** low — it has no signature look to leak; the theme is the point.
- **Link:** https://seek-oss.github.io/braid-design-system/

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
- **Evidence:** ★4,370 · last push 2026-09-03 but `gestalt@177.0.12` last published 2025-12-09 — a 9-month publish gap · 13,075 wk npm · 139 contributors (verified) · only 9 open issues, which on a 4.4k-star repo reads as triage-by-closure rather than health · Apache-2.0 · `/foundations/color/palette` → `/auth/signin?callbackUrl=…` (re-verified 2026-09-09)
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
- **Vibecode risk:** low — corrected down from medium. This file's own verdict is that Base Web is a forgettable docs shell, and nothing forgettable leaks into generated output. No agent reaches for Styletron unprompted.
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


### Web Awesome (formerly Shoelace) — `situational` *(added 2026-09 challenge pass)*
- **What:** Font Awesome's framework-agnostic web-component library, the renamed successor to Shoelace.
- **Verdict:** The original file listed exactly two non-React options (Cedar on Vue, Helios on Ember) and missed the one most teams actually reach for. `shoelace-style/shoelace` is now **archived** with the description "Shoelace is now Web Awesome," and the successor pulls **1,304,381 weekly downloads** — more than any styled system in this file except antd. It works in any framework or none. But apply this file's own Base Web test — "a component library that inherited a design system's reputation" — and Web Awesome fails it too: there are no published foundations, no content guidance, no principles, no research. It is 50+ components, 20+ utilities and 10+ themes, which is a product, not a system. It is also freemium (a Pro tier and a Login sit in the nav), so the docs are partly a funnel.
- **Use when:** you need real components outside React and cannot use Nord (license) or Helios (Ember) · **Don't use when:** you want design rationale — there is none to cite.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 4 · docs 3 · customization 4 · perf 4 · stability 4 · originality 2
- **Evidence:** `@awesome.me/webawesome` 1,304,381 wk npm · v3.12.0 live on site · `shoelace-style/shoelace` ★13,843 **archived**, last push 2026-05-14, MIT · webawesome.com 200
- **Looked at:** webawesome.com (screenshotted at 1440 and 390) — cream ground, faint outline-icon wallpaper, a rounded geometric display face, "The Web's Open Source Design System" centered, and one orange CTA against one near-black. Directly under the fold it drops a real `<link>`/`<script>` install snippet, which is a genuinely good decision: the first thing you see is how to use it. The nav is the honest tell — Start / Components / Docs / Help / **Pro**, with **Login** at the right.
- **Vibecode risk:** high — its default theme (soft radii, cream/orange, that rounded display face) is unmodified on a large number of sites, and an agent given "web components" reaches straight for it. If you use it, retheme it before you ship.
- **Link:** https://webawesome.com/

### Elastic EUI — `situational` *(added 2026-09 challenge pass)*
- **What:** Elastic's UI framework, the system behind Kibana.
- **Verdict:** Included for completeness and honesty rather than enthusiasm. At 317,355 weekly downloads and 6,364 stars it is one of the most-installed systems in this category — bigger than Carbon, bigger than Primer — and it was absent from the file entirely, which is the shape of a listicle-shaped blind spot: EUI does not get written about, so it does not get surveyed. Having looked, the omission was only half a mistake. EUI is well maintained and genuinely strong on data-dense components (its tables, charts and query bars are better than Carbon's), but its published *guidance* is thin next to its distribution, and the visual language is Kibana's, which does not travel.
- **Use when:** you are building observability or data-exploration UI and want mature dense components · **Don't use when:** you want rationale, or a look that is not Kibana's.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 3 · customization 3 · perf 3 · stability 4 · originality 2
- **Evidence:** ★6,364 · last push 2026-09-10 · 317,355 wk npm (`@elastic/eui`) · NOASSERTION (Elastic dual-license — check before vendoring) · eui.elastic.co 200
- **Vibecode risk:** medium — recognizably Kibana in dashboards, invisible elsewhere.
- **Link:** https://eui.elastic.co/

### GC Design System (Canada) — `situational` *(added 2026-09 challenge pass)*
- **What:** The Government of Canada's design system: web components, bilingual by construction.
- **Verdict:** Added as a deliberate correction for a second bias in the original file — its government coverage was UK and US only, which is where the English-language design writing is. GC Design System is tiny (★92, 288 weekly) and you should not adopt it, but it publishes something neither GOV.UK nor USWDS does: guidance built around a **statutory bilingual requirement**, where every component ships English and French as a first-class obligation rather than an i18n afterthought. The file already praises Skyscanner Backpack for having a Localisation section and calls it "prior art almost nobody else publishes" — and Backpack's web repo is archived. GCDS is the maintained version of that idea, and the whole docs site exists in both languages as proof it works.
- **Use when:** you need prior art for a genuinely bilingual product, or for localisation as a design constraint rather than a string-swap · **Don't use when:** you need scale, ecosystem, or components — 288 weekly downloads is a public-sector team, not a community.
- **Scores /5:** visual 3 · interaction 3 · a11y 5 · engineering 3 · maintenance 4 · docs 4 · customization 2 · perf 4 · stability 3 · originality 4
- **Evidence:** ★92 (`cds-snc/gcds-components`) · last push 2026-09-09 · 288 wk npm (`@cdssnc/gcds-components`) · MIT · design-system.canada.ca 200 (the `.alpha.` host now redirects to the stable one)
- **Vibecode risk:** low.
- **Link:** https://design-system.canada.ca/

## Rejected / avoid
- **Orbit (Kiwi.com)** — `orbit.kiwi` does not resolve in DNS as of 2026-09-09, so the documentation an agent would cite is unreachable. The last stable npm release was `@kiwicom/orbit-components@27.7.0` on 2025-10-31 and the newest published version is an alpha from 2025-11-25. The repo is unarchived and 30k weekly downloads persist, but a design system whose docs are offline cannot be a reference. Do not recommend it for new work.
- **Ant Design (as a design reference)** — the library is fine and enormously popular (99,457★, 3.2M weekly), but its *design guidance* is thin next to everything above, much of it is translated and dated, and its house style is the most instantly identifiable in B2B software. An agent reaching for antd defaults produces a product that looks like every other antd product. Use it as a component library if the team already has it; never cite it as design rationale.
- **Salesforce Lightning Design System** — `salesforce-ux/design-system` is archived; the SLDS2 transition is not coherently documented in public. `@salesforce-ux/design-system` still pulls 44k weekly, which is Salesforce-ecosystem inertia. Nothing to learn from here that isn't better documented elsewhere.
- **Clarity (VMware)** — `vmware-clarity/core` archived 2026-02-02 at 184 stars. The site is still up. Post-Broadcom, treat it as historical.
- **Wise Design** — wise.design is now an auto-scrolling brand inspiration gallery with an Inspiration/Direction toggle and no component or token documentation. Excellent brand craft, zero engineering value. It also served a Bulgarian-localised footer to a US-region headless browser, which suggests geo-detection with no locale fallback.
- **Twilio Paste** — the newest casualty, found during this pass and not in the original file. `paste.twilio.design` now returns **HTTP 301 → `https://github.com/twilio-labs/paste`**: the documentation site has been replaced by a redirect to the repo. Paste was one of the three or four best-documented public systems in the category — its accessibility and content guidance were genuinely first-rate — and the guidance is simply not on the web any more. The repo is alive (★478, MIT, pushed 2026-09-05) and `@twilio-paste/core` still pulls 19,192 weekly, so this is documentation withdrawal, not abandonment. Same pattern as Shopify and Pinterest. Cite an archived copy; do not send an agent to the live URL.
- **Porsche Design System** — `@porsche-design-system/components-js` pulls a healthy 29,449 weekly, but `design.porsche.com` failed to connect entirely (curl exit, no HTTP status) from this machine on 2026-09-09. Possibly geo-gated, possibly down. Unverified rather than rejected.
- **Ark UI (Chakra)** — 903,004 weekly and framework-agnostic across React/Vue/Solid/Svelte, so it is a serious non-React answer. Excluded on category grounds, not quality: it is deliberately headless and unstyled, so it publishes no design guidance at all. It belongs in a headless-primitives file, not this one.
- **Zendesk Garden** — docs live and the repo is active (★1,110, pushed 2026-09-09), but `@zendeskgarden/react-components` returns **4 weekly downloads**, which means the meta-package is deprecated in favour of per-component packages. Not evaluated further; the distribution signal is unreadable.
- **Mailchimp pattern library** — `ux.mailchimp.com` returns 503. The origin of the modern voice-and-tone guide is no longer online; only `styleguide.mailchimp.com` responds. Cite an archived copy or move on.
- **Audi and BMW design systems** — `bmw.design` does not resolve; Audi's corporate identity URL 404s. No verifiable public system. Skip.
- **Canvas (Workday)** — `canvas.workday.com` returned 403 to automated fetches, so nothing could be verified. Unverified rather than rejected, but not citable.
- **`@geist-ui/core`** — a community React library that borrowed the Geist name; 29,501 weekly downloads make it look official. It is not Vercel's design system. Agents conflate these constantly.

## Vibecode risk: what actually makes output look AI-generated

The original file scored this column but never said what it was measuring, which let a few ratings drift. The scale used here, stated so it can be argued with:

- **very high** — an agent produces this look *unprompted*, when told nothing. Geist, Linear, Material 3, antd.
- **high** — an agent produces it the moment you name the domain ("dashboard", "web components", "enterprise app"). Carbon, Web Awesome, Salesforce.
- **medium** — recognizable if you keep the defaults, repaintable if you don't.
- **low** — you have to choose this look on purpose. GOV.UK, Helios, Braid, Cedar.

Three honesty corrections this pass:

1. **The file names Geist as "the direct ancestor of the default AI-generated look" and stops there.** Geist supplies the *palette and texture* — pure black, Geist Sans, hairline borders, small radii. It does not supply the *structure*. The structure comes from **shadcn/ui + Radix + Tailwind**, which is what every major code-generation model emits by default and which appears nowhere in this file, not even as a cross-reference. That combination is the single largest source of generic output in 2026, and any judgment about whether a product "looks AI-made" is mostly a judgment about that stack, not about Vercel's docs site. It is out of scope as a *design system* — it publishes no foundations, no research, no content guidance — but a file whose purpose is preventing generic output cannot omit the name.
2. **Base Web was rated medium and is low.** The file's own verdict calls it a forgettable docs shell. Forgettable things do not leak into generated output; nothing reaches for Styletron unprompted.
3. **Web Awesome is high, and this is the one the field consistently underrates.** Its default theme is unmodified on a very large number of sites, and "make me some web components" routes straight to it. Adopt it if you need it; retheme it before you ship it.

One thing the column cannot capture: **Cloudscape's risk is behavioral, not visual.** Its chrome is forgettable, but copying its generative-AI chat patterns literally produces the same assistant interface as everyone else's. The right use is to take its *list of decisions* — does the model show its thinking, can the user authorize an action, what does a regenerate control imply — and answer them in your own idiom.

## What the best design systems have in common
1. **They document the failure mode, not the component.** GOV.UK's error-summary page opens with a rule ("you must show both an error summary and an error message next to each answer"), not a prop table. Primer has an entire **Degraded experiences** section. Almost nobody else writes down what happens when things break.
2. **They make contrast and sizing structural, not checked afterward.** USWDS grades and Spectrum's two scales both convert a per-instance judgment into a system property.
3. **They separate brand from product.** Primer split into Product UI and Brand UI; Geist has one token core across six brands. Systems that refuse the split end up with marketing pressure deforming product components.
4. **They publish a maturity signal.** Primer's Component status page tells consumers what's safe to depend on. Systems without one accumulate `Checkbox` and `Checkbox-v2`.
5. **The ones aging worst are the ones that were never a system, only a component library.** Base Web and Orbit both had strong components and no published principles; both are drifting. GOV.UK and Braid have modest component counts and enormous written rationale; both are healthy. Web Awesome is the live test of this rule: 1.3M weekly downloads and no foundations at all.
6. **The healthy ones write down the new problem before anyone asks.** Cloudscape shipped 28 pages of generative-AI interface guidance while the rest of the category was closing its docs sites. That is the difference between a maintained system and a maintained repo.
7. **Documentation withdrawal is now the dominant failure mode, and it is invisible in repo metrics.** Shopify, Pinterest, Twilio and Skyscanner all have live repos and live npm publishes; all four have removed or gated the guidance that made them worth citing. Stars and downloads will tell you none of this. Fetch the docs URL.

## The specific documented decisions most worth copying (with numbers)
- **USWDS color grades.** Define every hue on a regularized 0–100 lightness scale. Grade difference ≥40 → AA Large; ≥50 → AA (or AAA Large); ≥70 → AAA. Any grade-50 color clears Section 508 AA against both white and black. This is the highest-leverage idea in the survey.
- **GOV.UK responsive spacing.** 0 / 5 / 10 / 15 / 20 / 25 / 30 / 40 / 50 / 60px, where points 0–3 are identical at every breakpoint and only 4–9 compress on mobile. Small gaps shouldn't change with viewport; large ones should.
- **GOV.UK body type at 19px/25px on desktop, 16px/20px on mobile**, with the 48px display size dropping to 32px below 640px. Larger body text than the 16px default, defended by research.
- **GOV.UK focus state.** Yellow #ffdd00 fill plus a black #0b0c0c bottom bar, `$govuk-focus-width: 3px`, chosen so the pair passes WCAG 2.2 SC 1.4.11 on *any* background rather than only on the one you tested.
- **GOV.UK layout constants.** 960px max content width, 30px gutter, 2px form-element borders, 10px hover width. A 1440px viewport is mostly empty and that is the correct answer.
- **Spectrum's two platform scales.** Every token carries a `medium` and a `large` value; the Provider picks based on pointer type. Touch targets grow as a system property, not as scattered media queries.
- **Nord's token grammar.** `n-{category}-{subcategory}-{name}`, t-shirt sizes rather than numeric steps so non-engineers can read them, `m` always the base, and color tokens named by role (accent / border / text / surface / status) with modifiers (weak / strong / hover / active).
- **Adobe S2's page-level "Reduce motion" toggle.** On a motion-heavy page, expose the control; don't only honor `prefers-reduced-motion` and assume everyone has set it.
- **Braid's Tones.** Foundations expose `critical` / `positive` / `caution` / `info`, never a hex, so a theme swap cannot silently break meaning. Same structural move as USWDS grades, applied to semantics instead of contrast.
- **Braid's inexpressible arbitrary value.** Layout props accept only scale steps, so "just this once, 13px" is not typeable. Constraints enforced by the API beat constraints enforced by review.
- **Cloudscape's generative-AI decision list.** Thinking, loading states, output labelling, response regeneration, follow-up questions, in-chat context, in-flow user input, conversational history, artifact previews, progressive steps, support prompts, shortcut menus, agent management, user-authorized actions, visual affordance. Treat it as the checklist of decisions an AI interface has to make — then answer them in your own language rather than copying the layout.
- **Material 3 Expressive's evidence.** 46 studies, 18,000+ participants, ~3 years, key UI elements recognized up to 4× faster, and older users matching young users' scan speed across 10 apps. When someone argues that bigger shapes and stronger color roles are "unserious", this is the citation.

## Open questions
- ~~**Nord's license and team size are unverified.**~~ **RESOLVED 2026-09 challenge pass.** `npm pack @nordhealth/components@5.3.0` and reading `package/LICENSE.md` settles it: proprietary, revocable, and limited to "performing your duties for and on behalf of Nordhealth." Team size remains unknowable — there is no repo, and the site's own GitHub link (`github.com/nordhealth/design-system`) 404s. Nord demoted `essential` → `strong` on this finding.
- **Where the Polaris content guidelines went.** Still open — the Wayback availability API returned HTTP 429 on this pass, so it could not be checked. Settled by a rate-limited retry against `web.archive.org/web/2024/polaris.shopify.com/content/product-content`.
- **Whether Twilio Paste's guidance survives anywhere.** `paste.twilio.design` 301s to GitHub as of 2026-09-09. Settled by checking whether the docs site content was moved into the repo's `packages/paste-website` or only taken down.
- **Porsche Design System could not be reached at all** — `design.porsche.com` returned no HTTP status from this machine while its npm package pulls 29,449 weekly. Settled by a fetch from a European egress.
- **Whether Skyscanner Backpack Web went private or is being retired.** The repo archived one day after its final publish while native repos stay active. Settled by a Skyscanner engineering post or by watching whether `@skyscanner/backpack-web` publishes again after 43.19.0.
- **Whether Gestalt's gating is permanent.** `/v1/` is public, current docs are not. Settled by a Pinterest statement or by the next npm publish after the 9-month gap.
- ~~**Adobe's `spectrum-tokens` repo now contains only `site/` and has 0 stars.**~~ **RESOLVED 2026-09 challenge pass.** The repo was renamed; its description now reads "Redirects from old repo name to new repo name. Use https://github.com/adobe/spectrum-design-data." The live source is **`adobe/spectrum-design-data`** (152★, Apache-2.0, pushed 2026-09-10, "Design data, including design tokens, component schemas, and tooling for Spectrum"), and `@adobe/spectrum-tokens` still publishes at 12,177 weekly. Nothing was lost; the original entry was reading a tombstone.
- **Workday Canvas** returns 403 to automated fetches and could not be evaluated at all.

## Challenge pass (2026-09)

Adversarial re-verification on 2026-09-09. Every `essential` and `strong` entry was re-checked against `gh api repos/…`, the npm registry API, and live HTTP fetches; four sites were re-screenshotted at 1440 and 390 and read independently.

**What survived.** Most of it. All eight contributor counts the file gave with a `~` are exact and correct (GOV.UK 77, USWDS 194, Primer 221, Spectrum 409, Carbon 376, Helios 47, Gestalt 139, Base Web 239) — the tildes were unearned modesty. Every archive claim held: `Skyscanner/backpack` archived 2026-08-05, `primer/design` 2025-07-02 (761★), `Shopify/polaris` renamed to `polaris-react-archive`, `salesforce-ux/design-system` archived (3,701★, last push 2026-06-02), `vmware-clarity/core` archived at 184★. `orbit.kiwi` and `bmw.design` genuinely have no DNS record. Gestalt's `/foundations/color/palette` really does redirect to `/auth/signin`. `canvas.workday.com` really does 403. Fluent's tagged releases really did stop on 2026-05-26. USWDS's 15-month v3.13→v3.14 gap is real. GOV.UK, Carbon, Helios and Nord's "Looked at" descriptions all matched what I saw on screen — the previous pass looked at these sites rather than describing them from memory.

**Corrections made.**
- **Nord demoted `essential` → `strong`.** The file called it "a free, closed-source artifact." It is not free. `LICENSE.md` in the published tarball grants use "solely for the purpose of performing your duties for and on behalf of Nordhealth" and forbids use "for any other reason." An `essential` verdict implies you can act on the thing; you cannot. Also corrected: the file said there is no public repo — true, but the site's own sidebar links to `github.com/nordhealth/design-system`, which 404s, which is worth recording. The "Best visual quality out of the box" recommendation was rewritten, since "out of the box" implied an install nobody outside Nordhealth is licensed to perform.
- **Spectrum versions were stale by one patch.** `react-aria-components` is 1.21.1 and `@react-spectrum/s2` is 1.7.1, not 1.21.0/1.7.0. More importantly, the file cited `@adobe/react-spectrum` at 1,027,291 weekly to support "half the modern headless ecosystem is built on React Aria" — the number that actually supports that claim is `react-aria-components` at **3,520,784 weekly**, 3.4× the styled package. Added.
- **USWDS's 48,858 weekly is for `@uswds/uswds`.** The unscoped `uswds` package is a separate 10,549. Noted so nobody sums them.
- **Base Web's vibecode risk lowered medium → low**, for consistency with the file's own verdict that it is forgettable.
- Minor drift: Carbon ★9,440→9,441 and 1,037→1,038 open issues; Helios has a `7.0.0-rc` line publishing since 2026-08-19 that the file did not mention; Gestalt's 9 open issues on 4,370 stars added as a health signal.
- **Two open questions resolved** (Nord's license; `adobe/spectrum-tokens` renamed to `adobe/spectrum-design-data`, 152★, active). Three new ones opened (Paste's guidance, Porsche unreachable, Polaris Wayback still unchecked — the availability API 429'd).

**Popularity bias found, and where.** The file's failures were not over-praising the famous; the famous entries were mostly harsh and fair. The failures were *absence*, in exactly the places a listicle would leave a hole:
- **Cloudscape** — 92k weekly, ★2,642, and the only system in the entire category publishing guidance on generative-AI interfaces (28 pages). AWS console tooling does not get blogged about, so it did not get surveyed. This is the biggest miss in the file, and it is the one most on-mission for a corpus that exists to prevent generic AI output.
- **Braid** — the file praises USWDS for making contrast structural, then omits the system that does the same thing for spacing and semantics, ships Playroom, and states a real philosophical position. Australian, so under-covered in US/UK design writing.
- **Elastic EUI** — 317k weekly, more installed than Carbon or Primer, absent entirely. Having looked, the omission was half-deserved: strong dense components, thin guidance. Added at `situational` with that said plainly.
- **Web Awesome** — the file's non-React coverage was Cedar (72 weekly) and Helios (Ember). It missed the actual non-React default at **1.3M weekly**, and missed that `shoelace-style/shoelace` is now archived and renamed. Added — but held to the file's own Base Web test, which it fails: no foundations, no principles, freemium docs.
- **GC Design System (Canada)** — government coverage was UK+US only. GCDS publishes bilingual-by-statute guidance, which is the maintained version of the localisation prior art the file praises Backpack for and then notes is archived.

**New finding, not in the original file: Twilio Paste's docs site is gone.** `paste.twilio.design` returns HTTP 301 to `github.com/twilio-labs/paste`. The repo is healthy (★478, pushed 2026-09-05, 19,192 weekly) — this is documentation withdrawal, not abandonment, and it is the fourth instance of the same pattern in one file. That is now stated as its own structural finding rather than left as a list of coincidences, and the researcher note was updated to include it.

**Vibecode column hardened.** It was scored but never defined, and it omitted the actual cause. A new section states the scale explicitly and names **shadcn/ui + Radix + Tailwind** as the real source of generated-looking output — Geist supplies the palette, that stack supplies the structure, and the file previously named only the palette. Also distinguishes Cloudscape's risk as *behavioral* (copying its AI chat patterns) rather than visual.

**Verdicts that survived scrutiny unchanged:** GOV.UK `essential`, USWDS `strong`, Primer `strong`, Spectrum `strong`, Carbon `strong`, Helios `strong`, and every entry in Rejected / avoid. Independent visual passes on Nord and Cloudscape matched or exceeded the file's descriptions; no verdict was reversed on aesthetic grounds.
