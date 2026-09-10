# luxury

**Evaluated:** 2026-09 · **Density:** spacious · **Dark by default:** either — and it is not a theme. The ground is chosen per band to make that band's photograph sit correctly. Bang & Olufsen runs a near-black film hero and an ivory product band on the same page. Never ship a toggle: the ground is an art-directed asset, not a user preference.

> Someone who already half-wants the thing arrives once, from an image, having been sent no argument — and every decision on the page spends their attention on the object instead of asking for it.

## When this is the right archetype

The users are prospects, not operators. They arrive from a photograph — an ad, a shopfront, an Instagram post, a friend — visit two or three times over weeks before a considered purchase, never log in, and have no repeating task. Stakes are reputational, not operational: nobody is harmed by a mis-click, but a page that looks cheap disqualifies a €900 coat. The load-bearing fact is that **the thing is desired before it is understood** — a fragrance, a jacket, a speaker, a watch, a car, a magazine issue. The photograph is the argument; the copy is its caption. Price is rarely the objection. Legitimacy is.

- **Choose this over `premium-marketing`** when the visitor already accepts the category and you only have to establish that *you* are who to buy it from. Vercel must convince you agentic infrastructure matters; Aesop need not convince you that hand wash matters. That difference is structural, not tonal: premium-marketing needs a 64px sentence plus proof (numbers, logos, product screenshots); luxury needs a 24–50px label and a photograph. **If the page has to explain a mechanism, you are premium-marketing.**
- **Choose this over `ecommerce`** when conversion rate is not the number the team is judged on this quarter. Shopify-class ecommerce optimises AOV with badges, urgency, reviews, bundles and a sticky add-to-cart; luxury forfeits all of it deliberately. Honest test: if deleting the review stars would measurably drop revenue, you are `ecommerce` and should be.
- **Choose this over `editorial`** when reading is not the activity. Kinfolk is the boundary case and it resolves per surface — the *cover page* is luxury (50px/52px uppercase serif, `Buy | Read`, a cover in a field of white); the *article pages* are editorial (one measure, 20px/30px serif body). Same tokens, different archetype, one product.
- **Choose this over `consumer-marketplace`** when there is nothing to compare. A marketplace user's job is filtering many listings on attributes; a luxury shop shows five products in a row with no filters and that is correct. The moment a filter rail becomes the primary affordance, you are a marketplace with nice photography.

## When it is the wrong one

**Any signed-in SaaS product — and it fails in five independent ways, all of them mechanical.** (1) *Density*: the layout unit is a full-bleed band holding one object; a SaaS screen holds forty objects and a 128px band rhythm turns one settings page into six screens of scrolling. (2) *Affordance*: this archetype's controls deliberately strip signalling — transparent fills, 0–1px radius, text links as primary actions, no hover transform, no shadow. That is safe when there is one thing to do and it occupies 270px of a photograph (B&O's hero CTA); it is not safe when a user distinguishes primary from secondary from destructive from disabled forty times a screen. Strip the cues and every click is a guess. (3) *Copy*: the register refuses to state what a click does — `Beosound A9 Sienna Brown` is a correct luxury CTA and a catastrophic one on a bulk-archive button. (4) *Motion*: a 500–1,000ms reveal is budgeted against one forty-second visit; the same reveal on a screen opened thirty times a day is theft. (5) *Content*: the whole system is structured around an art-directed image that a SaaS product does not have, and the small-type-plus-huge-space treatment, applied to a screenshot, reads as concealment rather than confidence.

The legitimate move is **two surfaces, never a blend**: the marketing site is luxury; the app is whatever archetype its users' situation demands. What transfers at the token level is narrow and real — neutrals under 4% saturation, 0–4px radii, no transform on hover, real photography instead of gradient blobs. Nothing else.

**The transactional tail of your own site.** Checkout, address entry, returns, order tracking, account. Acne Studios runs 12px `+0.3px` caps across its entire homepage and would be shipping a legibility and error-rate failure if it ran the same on a shipping form. Switch register at the cart: 16px body, visible field borders, explicit labels, plain error text next to the field. Nobody has ever admired a brand for a beautiful failed payment.

**Products whose differentiator is capability.** A developer tool, an API, an analytics product. If your best asset is a screenshot, restraint reads as evasion.

**Anything making a regulated claim** — clinical efficacy, financial return, safety. The register cannot carry a disclosure. Rivian is the model for the mixed case: `Leasing from $1,239/mo*` with `* Disclosures` set immediately beneath in the same face. Showing the asterisk builds more trust than hiding it.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Bang & Olufsen** | A full-bleed film hero whose headline is **24px** at 1440 — the clearest proof that the luxury move is smaller type, not bigger | The CTA label is the product *and its finish* — `Beosound A9 Sienna Brown` — not "Shop now". The visitor is choosing a material for a room, so name the material. |
| **NOMOS Glashütte** — *the non-obvious one* | An entire site set at **weight 300 and 200**, with a radius scale that tops out at `3px` and a `--btn-radius: 1px` | Every band headline is one grammatical construction: `<claim>: <object>` — `The very definition of a dress watch: Orion gold neomatik new black`. One sentence pattern replaces a hundred headline decisions. |
| **Aesop** | Proof a luxury hero headline can be 30px and win, on a warm ground that is not white | Ground `#FFFEF2`; CTA is a **0-radius transparent rectangle with a 1px border** at 48px. Zero negative tracking anywhere on the site. |
| **Acne Studios** | The extreme case: **the entire site is one type size** — 12px/20px, `+0.3px`, weight 400 (317 of ~400 text nodes) | The display type is the **logotype as an image**; the `<h1>` is a 1×1px screen-reader string. Stop confusing a wordmark with a type scale. |
| **Vitsœ** — *the other non-obvious one* | Luxury that refuses the mood entirely: plain nav, **weight-700** 32px headlines, a blue `Learn more →` text link, and a hero photo of a real customer's cluttered shelf | Product names are numbers — 606, 620, 621. A catalogue that reads as a system rather than a mood board, with photography that contradicts the styled-set cliché on purpose. |
| **Kinfolk** | Three optical cuts of one bespoke serif (`-Display` / `-Deck` / `-Text`) and a homepage with exactly two interactive elements | The hero CTA is `Buy | Read` — two text links and a pipe. No button anywhere above the fold. |
| **Teenage Engineering** | Luxury derived from engineering rather than heritage; every dimension is a fraction of viewport width | Weights **100 and 300 only**, two families, and firmware version numbers (`EP-133 2.5`) as hero content. Specification as seduction. |
| **Rivian R1S** | The automotive case: a 200px wordmark over real cinematography with the CTAs in the opposite corner | Tracking bound to size as tokens (`--tracking-display: -0.025em`, `--leading-display: 0.96`) and a 300vh scroll-**scrub** that never steals scroll velocity. |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **15–17px / 1.40–1.65** leading; the honest range is 13–20px | NOMOS 16.8/23.52 (1.40), Vitsœ 17/24 (1.41), B&O 16/18.4 in chrome and 16/26 in prose, Kinfolk 20/30 (1.50), The Row 13/21.45 (1.65). The inverse relation is the rule: 13px wants 1.65, 20px wants 1.40. Small type with generous leading reads as expensive because it signals the *image* is the important thing; large type with tight leading reads as SaaS. |
| Dense/secondary text | **11–14px, uppercase, tracking +0.3px to +2px**, weight 300–400 | Kinfolk's sans chrome is 13/17 at `+0.39px` (+0.03em) uppercase; NOMOS labels 12.6px at `+0.378px`; B&O's eyebrow 14/20 at `+2px`; Acne holds 12px/`+0.3px` sitewide. These strings are *captions on images*, not sentences — letterspaced caps at 11–13px read as print and are never mistaken for body. |
| Page title | **24–50px, weight 200–400, tracking 0 to −0.5px** | B&O `24px/36px` w400, tracking normal; NOMOS `43.68px/61.15px` **w300**, tracking normal, with one 60.48px at **w200**; Kinfolk `50px/52px` uppercase w400 at `−0.5px`; Aesop `30px/39.9px` w400. Above ~60px you are convincing rather than presenting, which is `premium-marketing`. The exception is a wordmark (Rivian 200px, Acne ~130px) — a brand asset rendered as type, not a headline. |
| Row / list-item height | **There is no row.** A product tile is image + two lines; its height is set by the image's aspect ratio (4:5 or 3:4), not by a token — B&O's measures ~390px | A fixed row height forces a crop nobody art-directed. The text block beneath is name and price on one or two lines at 12–16px, 8–12px gap, no container. NOMOS's family tiles carry name + count (`TANGENTE` / `37 watches`) and **no price at all**, because at the collection level the question is which family, not how much. |
| Control height | **44–48px** for the one hero CTA · **24–32px** for inline text links · nav items are text inside a 44px hit area | B&O's hero CTA measures **47px tall × 270px wide**; Aesop 48px; NOMOS's `Discover now ›` is a 24px text link with no box at all; The Row 30px. There is normally **one** button per band, and it can be generous because nothing competes with it. |
| Sidebar width | **None on any brand surface.** A filter rail belongs only to a category page: 200–240px fixed, or a drawer on mobile | Persistent chrome contradicts the archetype's central claim that the image owns the viewport. If the homepage needs a sidebar, re-read the marketplace boundary above. |
| Content max-width | **1200px** for grids and text bands (Aesop 1200; Buly `--page-width: 120rem`) · **600–720px** for a single prose block · images **full-bleed** | The band is the layout unit. Text is constrained; media never is. Varying the measure band to band (720 / 600 / 480) is what produces magazine rhythm — one centred `max-w-3xl` ribbon down the page is the template tell. |
| Radius (control / container) | **0–3px.** Pill **only** for a control sitting on top of photography | NOMOS ships a whole scale of `--radius-sm: 1px`, `--btn-radius: 1px`, `--radius-md: 3px`; Aesop 0; Buly `--buttons-radius: 0`; Kinfolk 2px; Acne 2px. B&O's one pill CTA is a 40px radius *because* it floats on a moving video frame and must read unmistakably as a control. Teenage Engineering's pill radius equals its own display size (52.898px) — the radius is derived, not chosen. 8px and 12px are absent from every reference measured. |
| Border weight & colour | **1px `#DDD`-class hairline** on light grounds · **2px white/ivory** over photography | Buly ships `--color-border: #DDDDDD`; B&O ships `--gle-border: 2px solid` and its hero CTA is a 2px white keyline on transparent fill. A 1px white hairline vanishes against a moving frame — the weight change is functional. |
| Elevation | **Zero shadows on brand surfaces.** Layering comes from full-bleed bands and ground changes | Teenage Engineering ships **no box-shadow anywhere on the page**. Buly declares `--card-shadow-opacity: 0.1` next to 0px offset and 0px blur — a shadow token that resolves to nothing. Depth here is photographic, not simulated. |
| Motion (micro / standard) | **200–250ms** hover, colour only · **400ms** standard · **500–1200ms** reveal, opacity or clip-path | B&O: `--gle-transition: all 400ms cubic-bezier(.165,.84,.44,1)`, with 43 elements at `color 0.2s` on that same curve. NOMOS hovers with `0.25s text-decoration-color` across 42 elements and reveals at `1s`. Kinfolk reveals at `0.5s cubic-bezier(0.25,1,0.5,1)` across 87 elements plus `1.2s opacity` across 49. Hover and reveal are different budgets; collapsing both to 300ms is the AI default. |
| Section rhythm | **96–160px** between text-led bands · **0px** between adjacent full-bleed image bands | Buly's top spacing step is `--spacing-4xl: 12.8rem` = 128px. Luxury runs tighter than `premium-marketing`'s 128–288px because the image edge *is* the section break — you do not need whitespace to end an idea when a photograph ends it. |

## Colour

**The ground is never `#FFFFFF` and the text is never `#000000`.** Aesop `#FFFEF2`; B&O's ivory `hsl(51,70%,96%)` against near-black `hsl(30,4%,9%)`; NOMOS text `#111`; Buly `#F6F6F6` on `#121212`. Neutrals run **0–4% saturation and skew warm** on light grounds; dark grounds skew a hair blue. That one tint decision buys more brand than any component will.

**Two brand colours maximum, and they are sampled from the physical object** — the label, the glass, the anodising — not chosen for contrast ratio. Buly ships exactly two: `#C1171A` (the wax seal) and `#0D4225` (the bottle). Teenage Engineering ships five because they are the colours of a synth panel. Rivian ships one amber, `#FFAA00`.

**The archetype-specific rule, and the one that separates luxury from everything else in this corpus: the accent is not an interaction colour.** It marks the brand — the wordmark, one rule, one label — and nothing else. The primary CTA is black-on-white, white-on-black, or transparent-with-a-hairline. In `technical-productivity` the accent means *this is the action*; here it means *this is us*. If you are painting a button in the brand colour to make it pop, you have imported another archetype's logic.

**Semantics are nearly absent, and the ones that exist are words, not colours.** Sold out, low stock, final sale, waitlist — set in the body face as a sentence: `This size is no longer available.` A red `SOLD OUT` pill is a retail tell that costs you the register. B&O renders `New` on a tile as a single italic word set inline beside the product name — a typographic mark, not a chip.

**Light/dark is a per-band decision, not a theme.** Do not build a `prefers-color-scheme` inversion of a luxury site; you will invert the one thing that was art-directed.

**Focus is the one place a visible non-brand colour is mandatory**, and it is the detail this archetype skips most often, because the whole system is built around removing outlines. NOMOS ships `--focus-color: #0041ccb3` — a real blue, translucent, at a 1px radius matching its controls. Ship a focus ring that survives on both ivory and photography: 2px of ground, then 2px of ring. `focus:outline-none` with nothing after it is a legal exposure, not a style choice.

## Type

**The face is the entire identity, and every reference licenses or commissions one.** BeoSupreme, Gotham A / Gotham Narrow A, Kinfolk-Serif-Display/-Deck/-Text, Helvetica Now Text, Linotype Univers, Suisse Intl, Adventure, te-20/te-40. Zero Google Fonts across the measured set. If the budget cannot carry a licence, the honest fallback is a well-set neutral grotesque of the Helvetica Now / Suisse / Söhne class used at **one size** — not a free display serif used at seven.

**The scale is low-contrast, and this is the sharpest divergence from its neighbours.** Meta-to-display ratio: Acne **1:1** (twelve to twelve), NOMOS 3.5× (12.6→43.7), B&O 3× (12→36), Kinfolk 3.8× (13→50). Compare `premium-marketing` at 4.6× (14→64) and `editorial` higher still. `system/3-tokens.md` tells this family to add a 48–80px step — luxury needs the token but **spends it on a wordmark rather than a sentence.** A 64px sentence here is out of register.

**Weights run 200–500 and display is usually lighter than body-weight instinct expects.** NOMOS sets a 43.68px hero at **300** and one band at **200**; Teenage Engineering ships 100 and 300 and nothing else; B&O's h1 and h2 are both 400. A 600+ display weight closes counters and reads as software. The exception is deliberate and legible as such: Vitsœ sets 32px headlines at **700** because it is presenting an engineering system, not a mood — but it pairs that with plain 17px body and a blue link, so the whole register moves together.

**Tracking runs positive on small text and near-zero on display — the exact inverse of the SaaS habit.** NOMOS runs `+1.344px` on **16.8px lowercase running text** (+0.08em), Kinfolk `+0.39px` on 13px caps, B&O `+2px` on a 14px eyebrow — while their 43.68px and 24px headlines run `normal`. So the rule is not "never letterspace lowercase"; it is **positive tracking is a small-size device**. At ≤17px it reads as a caption set with care. At 48px on lowercase it is the single loudest tell in the category.

**Three-family systems work when the roles are absolute** — Buly's rule (display serif for names, text serif for anything read, sans only below 11px) is worth copying wholesale because it removes the per-string decision. Two families is the safe version: one for names, one for everything else.

**Numerals: prices are proportional lining figures set inline with the product name, at the same size and weight.** B&O renders `Beosound A9` / `$5,100` as one 16px/400 pair with no typographic separation. Do not tabularise, bold, or colour a price — all three say "compare me". Tabular figures earn their place only in a genuine spec table. **Monospace earns its place only when the object is an instrument** — Teenage Engineering's `EP-133 2.5`, a watch reference, a serial number. Never for a price or a date.

## Layout and navigation

**The shell is a vertical stack of full-bleed bands under a hairline header.** Header 56–88px: wordmark centred (B&O, NOMOS, Kinfolk) or hard-left (Acne, Vitsœ, Rivian), 3–5 word destinations, utility right. B&O puts the *word* `Menu` beside the hamburger at both breakpoints — an unlabelled icon is a tell that nav was an afterthought. No sidebar, no breadcrumb, no tab bar.

**The primary object is the photograph, and it gets priority by getting the whole viewport with nothing on top of it.** Text either sits where the frame was lit for it — B&O's headline lands on the floor shadow beneath the speaker; Rivian's wordmark on open sky — or moves off the image entirely, which is what Kinfolk, NOMOS and Vitsœ do. Overlaying a scrim to force legibility is a confession that the image is stock.

**Grouping is by band, and the band edge is the divider.** No rules, no dividers, no alternating stripes inside a band. Bands vary in height and treatment — image-led, text-led, split-screen, grid, full-bleed film — and that variance is the whole mechanism keeping a 5,537px (B&O), 15,233px (Teenage Engineering) or 18,533px (Rivian) page navigable.

**The header does not change on scroll, and it does not hide.** Both B&O and NOMOS keep the same wordmark and the same three destinations at every scroll position; the header sits over the hero on a transparent ground and gains a solid ground only when the band beneath it changes. A header that shrinks, condenses its logo, or slides away on scroll-down is app chrome behaviour applied to a poster, and it makes the wordmark — the asset the whole page exists to establish — look negotiable.

**Cards are almost always wrong here.** A product tile is an image with two lines under it: no border, no fill, no radius, no shadow, no hover lift. Draw a container around it and you have made a marketplace listing — the photograph, which is the expensive part, starts competing with a rectangle you drew in five seconds. Cards are defensible only for editorial teasers, where the image is 3:2 and the text is a headline plus a deck.

## Components

**Belongs here:** full-bleed media band with a poster frame that is the film's first frame, plus a visible pause/mute control (B&O ships a 45px one bottom-right; Aesop 40px bottom-left — an accessibility requirement for autoplaying media, not a nicety) · product tile as image + name + price with no chrome · a text-link pair with a pipe (`Buy | Read`) · a 0-radius outlined CTA · a text link with a chevron and no box (`Discover now ›`) · hairline-ruled uppercase eyebrow · size and finish selectors as a row of labels rather than swatch pills · a carousel whose position indicator is a thin progress rule, not dots · a country/currency chooser written in the brand's own voice · an announcement bar that is a full sentence · a footer that is a three-column sitemap in 11–13px caps.

**The one form that belongs on a brand surface is the newsletter capture, and it is a single field with an underline and no label chrome** — placeholder gone on focus, a submit that is a chevron or the word, an inline confirmation sentence rather than a toast. Every other form in the product (checkout, address, account) leaves this archetype at the door; see the cart handoff above.

**Does not belong here:** badge pills and `New`/`Sale` chips (set the word inline instead) · star ratings and review counts · urgency timers and "12 people are viewing" · carousels with dot indicators (crop the next tile off the right edge instead) · an FAQ accordion above the fold · testimonial trios with headshots · trust-badge rows · gradient CTA bands · `hover:scale-105` on tiles · skeleton shimmer. For social proof: one press sentence in the body face, or nothing.

## States in this archetype

**Empty.** A collection with four products, a stockist list with three cities. Emptiness reads as *scarcity* here, which is an asset — but only if the grid still looks deliberate. Left-align the four tiles into the column widths a full grid would use and leave the remaining cells empty, or crop the row off the right edge. Never centre a short row in a 1200px container with even gaps: that reads as a shortfall everywhere, and worst here.

**Loading.** The image *is* the page, so the load state is the image's load state. Ship an LQIP or a flat colour sampled from the frame and cross-fade opacity at 400–600ms. Never a grey skeleton with a shimmer sweep — shimmer is a SaaS tell and it animates the most expensive element on the page. Declare a metric-matched fallback stack too: a 50px display serif reflowing from Georgia to a licensed Didone is a violent shift on a page whose only content is that headline.

**Error.** Out of stock, region-restricted, waitlist — a sentence in the body face, no red, no banner, no icon. The one place the register must switch is payment and address validation: at the cart, be explicit and boring, put the error beside the field, and use the colour. A failed transaction is a task, not a mood.

**Too much.** Four hundred products in a category. This is where the archetype hands off: the category page keeps the type, the ground and the chrome but takes a fixed grid and a filter rail from `consumer-marketplace`. Do not try to hold 128px band rhythm across 400 items. Equally, the long page survives on *variance* — B&O at 5,537px and Rivian at 18,533px both work because band heights and treatments differ wildly. Fourteen equal 800px bands is unreadable at any length.

## Motion budget

**Permitted:** opacity cross-fade on image reveal at 500–1200ms, `cubic-bezier(0.165,0.84,0.44,1)` or `(0.25,1,0.5,1)` · a scroll-**scrubbed** video mapping content to scroll position while preserving native scroll velocity (Rivian's 300vh sticky band) · a hero ken-burns under 1% scale per second, pausable · nav-menu open at 300–400ms · colour-only hover at 200–250ms.

**Forbidden:** transform on hover — across every site measured for this corpus the hover property list is `color, background-color, border-color, text-decoration-color` and zero sites transform · parallax on text · letter-by-letter reveals · scroll-jacking (a `wheel` handler forcing full-screen slides is the most resented pattern in the category) · any animation on a price.

**One caution about the token shape.** B&O's `--gle-transition: all 400ms …` is an `all` transition, and it is safe there only because nothing on those elements changes but colour and opacity. Copy the duration and the curve, not the `all` — the moment a layout property lands on that element you get a 400ms reflow you did not ask for. Name the properties.

**The frequency argument.** A visit is one page-load and roughly forty seconds. A 600ms reveal costs 1.5% of that and buys the sensation of a page settling rather than a component mounting. The same 600ms on a screen opened thirty times a day is theft. The ceiling is real, too: Teenage Engineering ships **three** transitioning elements on a 15,233px page and is not the least considered site in this set. `prefers-reduced-motion` is not optional — if a reveal starts at `opacity: 0` and the trigger is disabled, the failure mode is not "less pretty", it is "no content".

## Mobile

**This archetype is mobile-first in reality** — most luxury traffic is a phone arriving from a social image — and unlike `editorial` it adapts cleanly, because a stack of full-bleed bands is already a phone layout.

- **Media goes edge-to-edge or takes a consistent inset — pick one and never mix.** Acne runs 0 margin at 390; B&O insets its hero by ~32px. The inset is the stronger brand statement and costs immersion; edge-to-edge is the stronger image and costs the frame.
- **Chrome type does not scale down.** Acne holds 12px/`+0.3px` caps at both breakpoints; B&O keeps its labelled `Menu` and centred wordmark. Shrinking already-small caps to 10px crosses from restrained into unreadable.
- **Display drops to 48–60% of desktop**, not 90%. Rivian goes 200px → 96px (0.48). A `clamp()` whose minimum is 80% of its maximum is a rounding error, not a scale.
- **Grids go 1-up for hero products, 2-up for a category.** A single column of 400 items is unnavigable; two columns of small images is how every fashion site resolves it and it is correct.
- **Carousels get a cropped peek, never dots alone.** The next tile bleeding off the right edge is the affordance.
- **Radii that are proportional on desktop are often correct at zero on mobile** — Teenage Engineering sets `--tile-border-radius` to `0.0255 × 100vw` on desktop and literally `0` at phone width.

## Copy register

Full sentences with subordinate clauses. The product named plainly and completely, including finish and material. No exclamation marks. Numbers are facts about the house — `Est. 1925`, `FONDÉE EN 1803`, `37 watches` — never metrics about adoption. No second-person imperative except on the one CTA. Never explain why the thing is good; describe what it is and let the photograph argue.

- `Beosound A9 Sienna Brown` — B&O's hero CTA. Beats `Shop Now`, which assumes the visitor has finished choosing.
- `The very definition of a dress watch: Orion gold neomatik new black` — NOMOS, and every other headline on that page takes the same `<claim>: <object>` shape. Beats `Timeless elegance, redefined.`
- `Buy | Read` — Kinfolk. Beats `Get Started` / `Learn More`, two buttons carrying zero information.
- `Intelligent, modular furniture designed by Dieter Rams in 1960 and made by Vitsœ ever since.` Beats `Timeless design, built to last.` — the first is checkable, the second is a mood.
- `Leasing from $1,239/mo*` with `* Disclosures` directly beneath — Rivian. Beats a rounded "from $1,200/mo" with the terms hidden behind a tooltip.

## The characteristic failure

The bad version is **Squarespace-luxury**: a stock photograph of a marble surface, a black gradient scrim at 40% so white text survives on top of it, and a centred 64px Playfair Display headline with `tracking-widest` on its lowercase letters — sitting on a completely intact SaaS landing-page skeleton. Badge pill, headline, subhead, two CTAs, three feature cards, testimonial trio, FAQ accordion, gradient band, footer.

That is the diagnosis: **the imitation copies the symptoms of restraint — serif, big spacing, small caps, muted palette — while keeping the structure of a conversion page.** Restraint on a conversion skeleton reads as a cheap version of both things at once. The real move is to delete the skeleton. The page becomes five to eight image bands with a caption each, and the caption is often four words.

Self-diagnosis, in order of how loudly each gives you away:

1. **Did I add a scrim or gradient overlay to make text legible over the image?** Then the image is wrong for this layout. Every measured site either places text where the frame was lit for it or moves the text off the image. A scrim is the tell that the photo is stock.
2. **Did I letterspace lowercase text above ~20px?** `tracking-[0.3em]` on a 48px lowercase serif is the loudest single signal. NOMOS proves positive tracking on lowercase is legitimate — at 16.8px, as a caption device. Never at display size.
3. **Is my display face free?** Playfair, Cormorant, Cinzel, Great Vibes. The measured set is 100% licensed or bespoke. A well-set free grotesque at one size beats a free Didone at seven.
4. **Is my headline over 60px and a complete sentence?** Then it is `premium-marketing` wearing a serif. Count the sizes above 20px used for real sentences: the answer should be zero or one.
5. **Do my product tiles have a radius, a border, a shadow, or a hover lift?** All four should be absent. If `transition-all duration-300` appears anywhere, delete it.
6. **Is there a badge, a star rating, a countdown, or a "Trusted by" row?** Then it is `ecommerce` and it should stop pretending.
7. **Is my ground `#FFFFFF` and my text `#000000`?** Every reference tints both. Pure white and pure black is what you get when nobody made the decision.
8. **Is the accent colour on a button?** In this archetype the accent marks the brand, not the action.

The second failure is subtler and worse: **applying this to a product with nothing worth photographing.** Luxury spends its entire budget on one asset. If that asset is a screenshot, a stock photo, or an illustration of abstract boxes, the small type and huge space stop reading as confidence and start reading as concealment.

## Signature decisions that fit here

- **A skincare line whose shop grid is ordered by scent family, each band's ground sampled from the actual glass of that formula's bottle** — so scrolling the catalogue walks the palette. The ordering is the taxonomy; there is no filter control, because the page itself is the filter.
- **An audio brand that renders name, finish and price as one string in one weight** — `Beosound A9 Sienna Brown $5,100` — because the customer is choosing a material for a specific room, not comparing on price. Any typographic separation of the price re-frames the decision as a comparison.
- **A watchmaker whose collection tiles carry a count instead of a price** (`TANGENTE` / `37 watches`) and whose every headline is `<claim>: <object>` — because at the collection level the question is which family you are, and the grammar itself becomes the house voice.
- **A furniture maker whose product names are reference numbers** (606, 620, 621) and whose photography is customers' real, cluttered rooms rather than styled sets — because the pitch is that the system adapts to a life, and a styled set would contradict the claim. The configurator opens by asking your wall height.
- **An instrument brand that publishes the current firmware version beside every product in the hero** (`EP-133 2.5`) — specification as seduction, and the strongest possible signal that the object keeps being made rather than merely sold.

## Sources

Screenshots at `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/arch-lux-*.png` (1440, 390, plus two scroll positions each); probe JSON in the session scratchpad under `lux/`.

- **bang-olufsen.com/en/us** — screenshotted at 1440 and 390 and probed after dismissing the consent sheet. `h1 24px/36px w400` tracking normal on `hsl(51,70%,96%)`; band headline `25px w400 −0.5px`; nav/meta `12px/20px +0.1px`; hero CTA **47px × 270px**, transparent fill, 2px white keyline, pill radius; pause control 45px circle bottom-right; product tiles image + `Beosound A9` / `$5,100` at 16px/400, `New` as an inline italic word; tokens `--gle-alternative-color: hsl(51,70%,96%)`, `--gle-border: 2px solid`, `--gle-transition: all 400ms cubic-bezier(.165,.84,.44,1)`; 43 elements at `color 0.2s` on that curve, 20 at `opacity 0.4s`; page 5,537px, 39 images, 1 video.
- **nomos-glashuette.com/en** — screenshotted at 1440 (three scroll positions) and probed. Root rebased so body is `16.8px/23.52px` (1.40) **weight 300** with `+1.344px` tracking; `h1 43.68px/61.15px w300` tracking normal; one band at `60.48px w200`; uppercase labels `12.6–16.8px` at `+0.378/+0.504px`; `--radius-sm: 1px`, `--btn-radius: 1px`, `--radius-md: 3px`, `--form-input-radius: 1px`; hover is `0.25s text-decoration-color cubic-bezier(0.1,0.6,0.4,1)` on 42 elements; reveals `1s transform` (18) and `1s opacity` (13); collection tiles are name + watch count, no price; page 6,486px, 21 images, 3 videos.
- **kinfolk.com** — screenshotted at 1440 and probed. Body `20px/30px` Kinfolk-Serif-Text; `h1`/`h2` `50px/52px −0.5px` uppercase Kinfolk-Serif-Deck; section heads `32px/38px −0.16px`; one `60px/60px −0.3px`; sans chrome `15px/20px +0.15px` and `13px/17px +0.39px` uppercase; reveals `0.5s cubic-bezier(0.25,1,0.5,1)` × 87 and `1.2s opacity` × 49; hero is the issue number, the cover at ~314px, and `Buy | Read`; page 15,883px, 67 images.
- **teenage.engineering** — screenshotted at 1440 and probed. Two families (te-20, te-40), weights **100/300/400**; body `16px/24px`; display sizes `13.22 / 19.10 / 26.45 / 52.90px`, all viewport-derived; radius `52.898px` — identical to the display size; **zero box-shadows**; exactly **three** transitioning elements (`0.2s background-color`, `0.15s opacity`, `0.2s transform`); nav-as-sitemap with commissioned pictograms; firmware list `EP-133 2.5 / EP-40 2.5 / EP-1320 1.5` as hero data; page 15,233px, 39 images, 0 video.
- **vitsoe.com/us** — screenshotted at 1440 and probed. Body `17px/24px` Linotype Univers; `h1 32px/40px` **weight 700**; link blue `rgb(0,115,177)` on a `Learn more →` text link; radii cluster at 2px; hero is a real customer's cluttered 606 shelving; page 3,187px, 10 images.
- **rivian.com/r1s** — screenshotted at 1440 and probed. `h1 200px/192px −5px w500`; tokens `--leading-display: 0.96`, `--tracking-display/-headline/-label/-body = −0.025/−0.02/−0.01/−0.01em`, radius scale `4/12/20/40` (measured usage 40px × 83, 4px × 39, 12px × 24), named physical easings (`--ease-shift-magnetic: cubic-bezier(0.83,0,0.17,1)`); `Leasing from $1,239/mo*` + `* Disclosures` bottom-left with `Design yours` / `Book a drive` in the opposite corner; page 18,533px, 113 images, 8 videos.
- **Cited, not re-measured this run** — Aesop (`#FFFEF2` ground, `30px/39.9px` w400 hero, 48px 0-radius outlined CTA), Acne Studios (12px/20px `+0.3px` across 317 of ~400 text nodes; `h1` a 1×1px hidden string), Officine Universelle Buly (three families with a strict role split, `--color-border: #DDDDDD`, `--spacing-4xl: 12.8rem`, 0-radius tokens, shadow tokens with 0 blur), The Row (13px/21.45px body, 11px 0-radius buttons). Numbers taken verbatim from `references/editorial-luxury-and-marketing.md` and the prior teardown rather than re-derived, so the corpus stays consistent.
- **Could not be measured:** `aesop.com/us`, `ssense.com/en-us/men` and `hermes.com/us/en` all served bot-challenge pages on every attempt (`arch-lux-aesop-1440.png`, `arch-lux-ssense-1440.png`, `arch-lux-hermes-1440.png` are the block pages); `loropiana.com/en/us` returned an empty document with no stylesheets. NOMOS Glashütte and Vitsœ stand in for the heritage-house and quiet-catalogue slots; B&O and Kinfolk carry the multi-band commerce slot. NOMOS additionally holds a persistent country-selector modal that could not be dismissed headlessly, so its screenshots show the page dimmed behind it; all computed values were read from the live DOM underneath.
