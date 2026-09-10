# luxury

**Evaluated:** 2026-09 · **Density:** spacious · **Dark by default:** either, and it is not a theme — the ground is whatever makes the photography look right, decided per band. Bang & Olufsen runs a black hero band and a white product band on one page. Do not ship a toggle; the ground is a brand asset, not a user preference.

> Someone who already half-wants the thing arrives once, from an image, having been sent no argument — and every decision on the page spends their attention on the object instead of asking for it.

## When this is the right archetype

The users are prospects, not operators. They arrive from a photograph — an ad, a shopfront, an Instagram post, a friend — visit two or three times over weeks before a considered purchase, never log in, and have no repeating task. Stakes are reputational rather than operational: nobody gets hurt by a mis-click, but a page that looks cheap disqualifies a €900 coat. The thing being sold is desired before it is understood, which is the load-bearing fact — a fragrance, a jacket, a speaker, a car, a magazine issue. The photograph is the argument and the copy is its caption. Price is rarely the objection; legitimacy is.

- **Choose this over `premium-marketing`** when the visitor already accepts the category and you only have to establish that *you* are the one to buy from. Vercel has to convince you agentic infrastructure matters; Aesop does not have to convince you that hand wash matters. The consequence is structural: premium-marketing needs 64px sentences plus proof — numbers, logos, product screenshots — while luxury needs a 24–50px label and a photograph. **If the page has to explain a mechanism, you are premium-marketing.**
- **Choose this over `ecommerce`** when conversion rate is not the number your team is judged on this quarter. Shopify-class ecommerce optimises AOV with badges, urgency, reviews, bundles and a sticky add-to-cart; luxury gives all of that up on purpose. Honest test: if deleting the review stars would measurably drop revenue, you are `ecommerce` and you should be.
- **Choose this over `editorial`** when reading is not the activity. Kinfolk is the boundary case and it resolves per surface: the *cover page* is luxury (50px uppercase serif, `Buy | Read`, a magazine cover in a field of white), the *article pages* are editorial (one measure, 20px/30px serif body). Same tokens, different archetype, one product.
- **Choose this over `consumer-marketplace`** when there is nothing to compare. A marketplace user's job is to filter many listings on attributes; a luxury shop shows six products in a grid with no filters and that is correct. The moment you need a filter rail as the primary affordance, you are a marketplace with nice photography.

## When it is the wrong one

**Any signed-in SaaS product.** This is the failure this file exists to prevent, and it fails in five independent ways — see the reasoning at the end of *Components* and *Motion budget*. Short version: luxury's density assumes one object per screen, its controls deliberately strip affordance signalling, its copy refuses to state what a click does, its motion budget assumes one visit, and its layout is structured around an art-directed image the product does not have. The legitimate move is two surfaces, not a blend: the marketing site is luxury, the app is whatever archetype its users' situation demands. What transfers at the token level is narrow and real — neutrals under 4% saturation, 0–4px radii, no transform on hover, real photography instead of gradient blobs.

**The transactional tail of your own site.** Checkout, address entry, returns, order tracking, account. Acne Studios runs 12px `+0.3px` caps across its entire homepage and would be committing a legibility and error-rate failure if it ran the same on a shipping form. Switch register at the cart: 16px body, visible field borders, explicit labels, plain error text. Nobody has ever admired a brand for a beautiful failed payment.

**Products whose differentiator is capability.** A developer tool, an API, an analytics product. If your best asset is a screenshot, the luxury treatment — small type, huge space, no explanation — reads as evasion. You look like you are hiding the product.

**High-frequency consumer apps.** A page seen once can afford an 800ms reveal. The same reveal on a screen opened thirty times a day costs the user half a minute a day and reads as a slow app, not a considered one.

**Anything making a regulated claim** — clinical efficacy, financial return, safety. The register cannot carry a disclosure. Rivian is the model for the mixed case: `Leasing from $1,239/mo*` with `* Disclosures` set directly beneath in the same face. Showing the asterisk builds more trust than hiding it.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Bang & Olufsen** | A full-bleed film hero whose headline is **24px** at 1440 — the clearest proof that the luxury move is smaller type, not bigger | The CTA label is the product and its finish — `Beosound A9 Sienna Brown` — not "Shop now". The visitor is choosing a material for a room, so name the material. |
| **Acne Studios** | The extreme case: **the entire site is one type size.** 12px/20px, `+0.3px`, weight 400, Helvetica Now Text — 317 of ~400 text nodes | The display type is the **logotype as an image**; the `<h1>` is a 1×1px screen-reader string. Stop confusing a wordmark with a type scale. |
| **Aesop** | Proof a luxury hero headline can be 30px and win, on a warm ground that is not white | Ground `#FFFEF2`, CTA a **0-radius transparent rectangle with a 1px border** at 48px tall. Zero negative tracking anywhere. |
| **Officine Universelle Buly** — *the non-obvious one* | Three families with an absolutely strict role split, and a period voice held through every surface including the region-picker modal | The sans (`Ari Clean`) is used **only at 8–11px**. Everything a human reads is serif; the sans exists for legal and chrome. One rule replaces a hundred judgement calls. |
| **Vitsœ** — *the other non-obvious one* | Luxury that refuses the mood entirely: plain nav, a blue `Learn more →` text link, and a hero photograph of a real customer's cluttered shelf | Product names are numbers — 606, 620, 621. A catalogue that reads as a system rather than a mood board, and photography that contradicts the styled-set cliché on purpose. |
| **Kinfolk** | Three optical cuts of one bespoke serif (`-Display` / `-Deck` / `-Text`) and a homepage with exactly two interactive elements | The hero CTA is `Buy | Read` — two text links and a pipe. No button anywhere above the fold. |
| **Teenage Engineering** | Luxury derived from engineering rather than heritage; every dimension is a fraction of viewport width | Two font families, weights **100 and 300 only**, five fixed panel accents, and firmware version numbers (`EP-133 2.5`) used as hero content. Specification as seduction. |
| **Rivian R1S** | The automotive case: a 200px wordmark over real cinematography with the CTAs in the opposite corner | Tracking bound to size as tokens (`--tracking-display: -0.025em`, `--leading-display: 0.96`) and a 300vh scroll-**scrub** that never steals scroll velocity. |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **15px / 24px** default; the honest range is 13–16px with leading **1.5–1.65** | The Row runs 13px/21.45px (1.65), Buly's Caslon paragraphs 14px/21px (1.5), Kinfolk 20px/30px. Small type with generous leading reads as expensive because it signals the *image* is the important thing; large type with tight leading reads as SaaS. The inverse relation is the rule: 13px wants 1.65, 20px wants 1.40. |
| Dense/secondary text | **11–12px, uppercase, tracking +0.3px to +2px**, weight 400 | Acne holds 12px/`+0.3px` across the whole site including mobile; B&O's eyebrow is 14px/20px at `+2px` uppercase; Buly's sans lives at 8–11px with `+1px`. These strings are *labels on images*, not sentences — letterspaced caps at 11px read as a print caption and are never mistaken for body. Never letterspace lowercase. |
| Page title | **24–50px, weight 300–500, tracking 0 to −0.5px** | B&O `24px/36px` w400; Aesop `30px/39.9px` w400 with tracking `normal`; Kinfolk `50px/52px` uppercase w400. Above ~60px you are convincing rather than presenting, which is `premium-marketing`. The one exception is a wordmark (Rivian 200px, Acne ~130px) — that is a brand asset rendered as type, not a headline. |
| Row / list-item height | **There is no row.** A product tile is image + two lines; B&O's measures **390px** tall and its height is set by the image's aspect ratio (4:5 or 3:4), not by a token | A fixed row height forces a crop that was not art-directed. The text block beneath is name and price on one or two lines at 12–16px with a 8–12px gap and no container. |
| Control height | **44–48px** for the one hero CTA · **30–36px** for inline links · nav items are text in a 44px hit area | Aesop 48px, B&O 44px, The Row 30px inline. There is normally **one** button per band; its size can be generous because nothing competes with it. |
| Sidebar width | **None on any brand surface.** A filter rail belongs only to a category page: 200–240px fixed, or a drawer on mobile | Persistent chrome contradicts the archetype's central claim that the image owns the viewport. If your homepage needs a sidebar, re-read the marketplace boundary above. |
| Content max-width | **1200px** for grids and text bands (Aesop 1200; Buly `--page-width: 120rem`) · **600–720px** for the single prose block · images **full-bleed** | The band is the layout unit. Text is constrained; media never is. Varying the text measure band to band (720 / 600 / 480) is what produces magazine rhythm — a single centred `max-w-3xl` ribbon is the template tell. |
| Radius (control / container) | **0px** default. 2–4px only if the brand's own graphic language is modern. Pill **only** for a control sitting on top of photography | Aesop 0, The Row 0, Buly `--buttons-radius: 0px` / `--card-corner-radius: 0`, Kinfolk 2px, Acne 2px. B&O's one pill CTA is 40px radius *because* it floats on a video frame and needs to read unmistakably as a control. 8px and 12px are absent from every reference measured. |
| Border weight & colour | **1px `#DDD`-class hairline** on light grounds · **2px white/ivory** over photography | Buly ships `--color-border: #DDDDDD`; B&O ships `--gle-border: 2px solid` and its hero CTA carries a 2px white border over transparent fill. A 1px white hairline vanishes against a moving video frame — the weight change is functional, not decorative. |
| Elevation | **Zero shadows.** Layering comes from full-bleed image bands and ground changes | Buly declares `--card-shadow-opacity: 0.1` alongside 0px offset and 0px blur — a shadow token that resolves to nothing. Depth in this archetype is photographic, not simulated. |
| Motion (micro / standard) | **200ms** hover (colour only) · **400ms** standard · **500–1000ms** reveal, opacity or clip-path | B&O ships one token, `--gle-transition: all 400ms cubic-bezier(.165,.84,.44,1)`, and 43 elements at `color 0.2s` on the same curve. Kinfolk runs `0.5s cubic-bezier(0.25,1,0.5,1)` opacity reveals across 84 elements. Hover and reveal are different budgets; collapsing both to 300ms is the AI default. |
| Section rhythm | **96–160px** between text-led bands · **0px** between adjacent full-bleed image bands | Buly's top spacing step is `--spacing-4xl: 12.8rem` = 128px. Luxury runs tighter than `premium-marketing`'s 128–288px because the image edge *is* the section break — you do not need whitespace to end an idea when a photograph ends it. |

## Colour

**The ground is never `#FFFFFF` and the text is never `#000000`.** Aesop `#FFFEF2`, B&O's ivory `hsl(51,70%,96%)` and near-black `hsl(30,4%,9%)`, Buly `#F6F6F6` with text `#121212`. Neutrals run **0–4% saturation and skew warm** on light grounds; dark grounds skew a hair blue. That single tint decision buys more brand than any component will.

**Two brand colours, maximum, and they are sampled from the physical object** — the label, the glass, the anodising — not chosen for contrast ratio. Buly ships exactly two: `#C1171A` (the seal) and `#0D4225` (the bottle). Teenage Engineering ships five fixed accents because they are the colours of a synth panel. Rivian ships one amber, `#FFAA00`.

**The archetype-specific rule, and the one that separates luxury from everything else in this corpus: the accent is not an interaction colour.** It marks the brand — the wordmark, one rule, one label — and nothing else. The primary CTA is black-on-white, white-on-black, or transparent-with-a-hairline. In `technical-productivity` the accent means *this is the action*; here it means *this is us*. If you find yourself painting a button in the brand colour to make it "pop", you have imported the wrong archetype's logic.

**Semantics are nearly absent, and the few that exist are words, not colours.** Sold out, low stock, final sale, waitlist — set in the body face as a sentence: `This size is no longer available.` A red pill saying `SOLD OUT` is a retail tell that costs you the register. B&O renders `New` as a plain word inline with the product name.

**Light/dark is a per-band decision, not a theme.** The band's ground is chosen to make its photograph sit correctly — a dark interior shot needs a dark ground or the frame edge cuts. Do not build a `prefers-color-scheme` inversion of a luxury site; you will invert the one thing that was art-directed.

## Type

**The face is the entire identity, and every reference licenses or commissions one.** BeoSupreme, Officine Universelle + Caslon Universelle + Ari Clean, Kinfolk-Serif-Display/-Deck/-Text, Helvetica Now Text, Suisse Intl, Adventure, te-20/te-40. Zero Google Fonts. If the budget cannot carry a licence, the honest fallback is a well-set neutral grotesque of the Helvetica Now / Suisse / Söhne class used at **one size** — not a free display serif used at seven.

**The scale is low-contrast and this is the sharpest divergence from its neighbours.** Meta-to-display ratio: Acne **1:1** (twelve to twelve), B&O 3× (12→36), Buly 3.5× (9→32). Compare `premium-marketing` at 4.6× (14→64) and `editorial` higher still. Note also what `system/3-tokens.md` says about adding a 48–80px step for this family of archetypes: luxury needs the token, but **spends it on a wordmark rather than a sentence.** A 64px sentence in this archetype is out of register.

**Weights 300–500, and both display and body usually sit at 400.** B&O's h1 and h2 are both weight 400. Teenage Engineering ships 100 and 300 and nothing else. A 600+ display weight closes counters and reads as software.

**Tracking runs positive on small caps and near-zero on display** — the exact inverse of the SaaS habit. Acne `+0.3px` at 12px, Buly `+0.6` to `+2.4px`, B&O's eyebrow `+2px` at 14px; B&O's 36px headline runs `−0.5px` and Aesop's 30px runs `normal`. The one thing that must never happen is positive tracking on lowercase text at display size.

**Three-family systems work when the roles are absolute.** Buly's rule — display serif for names, text serif for anything read, sans only below 11px — is worth copying wholesale because it removes the per-string decision. Two families is the safe version: one for names and one for everything else.

**Numerals: prices are proportional lining figures set inline with the product name, at the same size and weight.** B&O renders `Beosound A9 $5,100` as one 16px/400 string. Do not tabularise, bold, or colour a price — all three say "compare me". Tabular figures earn their place only in a genuine spec table (range, output, dimensions). **Monospace earns its place only when the object is an instrument** — Teenage Engineering's `EP-133 2.5`, a watch reference, a serial number. Never for a price or a date.

## Layout and navigation

**The shell is a vertical stack of full-bleed bands under a hairline header.** Header 56–88px: wordmark centred (B&O, Buly, Kinfolk) or hard-left (Acne, Vitsœ, Rivian), 3–5 word destinations, utility right. Both B&O and Acne put the *word* `Menu` beside the hamburger — an unlabelled icon is a tell that the nav was an afterthought. There is no sidebar, no breadcrumb, no tab bar.

**The primary object is the photograph, and it gets priority by getting the whole viewport with nothing on top of it.** Text either sits on a part of the frame that was lit for it — B&O's headline lands on the floor shadow beneath the speaker — or moves off the image entirely, which is what Kinfolk and Vitsœ do. Overlaying a scrim to force legibility is a confession that the image is stock.

**Grouping is by band, and the band edge is the divider.** No rules, no dividers, no alternating background stripes inside a band. Bands vary in height and treatment — image-led, text-led, grid, full-bleed film — and that variance is the whole mechanism for keeping a 5,500px (B&O) or 11,000px (Buly) page readable.

**Cards are almost always wrong here.** A product tile is an image with two lines under it: no border, no fill, no radius, no shadow, no hover lift. B&O's is 390px tall with `border-radius: 0` and no border. The instant you draw a container around it you have made a marketplace listing, and the photograph — the expensive part — starts competing with a rectangle you drew in five seconds. Cards are defensible only for editorial teasers, where the image is 3:2 and the text is a headline plus a deck.

## Components

**Belongs here:** full-bleed media band with a poster frame that is the film's first frame, plus a visible pause/mute control (B&O ships one bottom-right; Aesop bottom-left at 40px — this is an accessibility requirement for autoplaying media, not a nicety) · product tile as image + name + price with no chrome · a text-link pair with a pipe (`Buy | Read`) · a 0-radius outlined CTA, optionally double-ruled as Buly's is · hairline-ruled uppercase eyebrow · size and finish selectors as a row of labels rather than swatch pills · a country/currency chooser written in the brand's own voice · an announcement bar that is a full sentence · a footer that is a three-column sitemap in 11px caps.

**Does not belong here:** badge pills and `New`/`Sale` chips (render the word inline instead) · star ratings and review counts · urgency timers and "12 people are viewing" · carousels with dot indicators (use a cropped peek instead — Acne's mobile row shows the next tile bleeding off the right edge) · an FAQ accordion above the fold · testimonial trios with headshots · trust-badge rows · gradient CTA bands · `hover:scale-105` on tiles · skeleton shimmer. For social proof, one press sentence set in the body face, or nothing.

**And this is exactly why the archetype cannot host an application.** Its controls deliberately remove affordance signalling: transparent fills, zero radius, text links as primary actions, no hover transform, no shadow. That works when there is one thing to do and it occupies 300px of a photograph. A SaaS user distinguishes primary from secondary from destructive from disabled forty times per screen; strip the cues and every click becomes a guess. Aesop can afford an ambiguous button. A bulk archive cannot.

## States in this archetype

**Empty.** A collection with four products, a stockist list with three cities. Emptiness reads as *scarcity* here, which is an asset — but only if the grid still looks deliberate. Left-align the four tiles into the column widths a full grid would use and leave the remaining cells empty, or crop the row off the right edge. Never centre a short row in a 1200px container with even gaps: that reads as a shortfall in every archetype and especially in this one.

**Loading.** The image *is* the page, so the load state is the image's load state. Ship an LQIP or a solid colour sampled from the frame, and cross-fade opacity at 400–600ms. Never a grey skeleton with a shimmer sweep — shimmer is a SaaS tell, and it animates the single most expensive element on the page. Also declare a real fallback stack with matched metrics: a 50px display serif reflowing from Georgia to a licensed Didone is a violent shift on a page whose only content is that headline.

**Error.** Out of stock, region-restricted, sold out, waitlist — a sentence in the body face, no red, no banner, no icon. The one place the register must switch is payment and address validation: at the cart, be explicit and boring, put the error next to the field, and use the colour. A failed transaction is a task, not a mood.

**Too much.** Four hundred products in a category. This is where the archetype hands off: the category page keeps the type, the ground and the chrome, but takes a fixed grid and a filter rail from `consumer-marketplace`. Do not try to hold 128px band rhythm across 400 items — you will produce a forty-screen scroll with no orientation. Similarly, the long page survives on *variance*: B&O runs 5,537px and Buly 11,142px, and both work because band heights and treatments differ wildly. Fourteen equal 800px bands is unreadable at any length.

## Motion budget

**Permitted:** opacity cross-fade on image reveal, 400–600ms, `cubic-bezier(0.165,0.84,0.44,1)` or `(0.25,1,0.5,1)` · a scroll-**scrubbed** video that maps content to scroll position while preserving native scroll velocity (Rivian's `300vh` sticky band) · a hero ken-burns under 1% scale per second, pausable · nav-menu open at 300–400ms · colour-only hover at 200ms.

**Forbidden:** transform on hover — across every site measured for this corpus, the hover property list is `color, background-color, border-color, outline-color` and zero sites transform · parallax on text · letter-by-letter reveals · scroll-jacking (a `wheel` handler that forces full-screen slides is the single most resented pattern in the category) · any animation on a price.

**The frequency argument.** A visit here is one page-load and roughly forty seconds. A 600ms reveal costs 1.5% of that visit and buys the sensation of a page settling into place rather than a component mounting. The identical 600ms on a screen opened thirty times a day is theft. This is also why `prefers-reduced-motion` is not optional: if your reveal starts at `opacity: 0` and the trigger is disabled, the page is blank — the failure mode is not "less pretty", it is "no content".

## Mobile

**This archetype is mobile-first in reality** — most luxury traffic is a phone arriving from a social image — and unlike `editorial` it adapts cleanly, because a stack of full-bleed bands is already a phone layout.

- **Media goes edge-to-edge or takes a consistent inset — pick one and never mix.** Acne runs 0 margin at 390; B&O insets its hero by ~32px. The inset is the stronger brand statement and costs you immersion; edge-to-edge is the stronger image and costs you the frame.
- **Chrome type does not scale down.** Acne holds 12px/`+0.3px` caps at both breakpoints. Shrinking already-small caps to 10px on a phone crosses from restrained into unreadable.
- **Display drops to 48–60% of desktop**, not 90%. Rivian goes 200px → 96px (0.48). A `clamp()` whose minimum is 80% of its maximum is a rounding error, not a responsive scale.
- **The header collapses to labelled hamburger plus three utility icons**, often in hairline-ruled cells across the top — Acne ships four ~90px cells. Wordmark centres.
- **Grids go 1-up for hero products and 2-up for a category.** A single column of 400 items is unnavigable; two columns of small images is how every fashion site on earth resolves it, and it is correct.
- **Carousels get a cropped peek, never dots alone.** The next tile bleeding off the right edge is the affordance.

## Copy register

Full sentences with subordinate clauses. The product named plainly and completely, including finish and material. No exclamation marks except as a deliberate period device. Numbers are facts about the house — `Est. 1925`, `FONDÉE EN 1803`, `62 Officines`, `30 Years of Acne Studios` — never metrics about adoption. No second-person imperative except on the one CTA. Never explain why the thing is good; describe what it is and let the photograph argue.

- `Beosound A9 Sienna Brown` — B&O's hero CTA. Beats `Shop Now`, which assumes the visitor has finished choosing.
- `Buy | Read` — Kinfolk. Beats `Get Started` / `Learn More`, which is two buttons carrying zero information.
- `Intelligent, modular furniture designed by Dieter Rams in 1960 and made by Vitsœ ever since.` Beats `Timeless design, built to last.` — the first is checkable and the second is a mood.
- `As a token of our sincere friendship, enjoy complimentary shipping to the United States on orders over 220$.` — Buly's announcement bar, in period voice. Beats `FREE SHIPPING OVER $220 🎉`.
- `ISSUE 60 / HISTORY SPECIAL` — Kinfolk. The headline is simply the fact. Beats `Our Latest Issue Is Here`.

## The characteristic failure

The bad version is **Squarespace-luxury**: a stock photograph of a marble surface, a black gradient scrim at 40% so white text will survive on top of it, and a centred 64px Playfair Display headline with `tracking-widest` applied to its lowercase letters — sitting on top of a completely intact SaaS landing-page skeleton. Badge pill, headline, subhead, two CTAs, three feature cards, testimonial trio, FAQ accordion, gradient band, footer.

That is the actual diagnosis: **the imitation copies the symptoms of restraint — serif, big spacing, small caps, muted palette — while keeping the structure of a conversion page.** Restraint applied to a conversion skeleton reads as a cheap version of both things at once. The real move is to delete the skeleton. The page becomes five to eight image bands with a caption each, and the caption is often four words.

Self-diagnosis, in order of how loudly each one gives you away:

1. **Did I add a scrim or gradient overlay to make text legible over the image?** Then the image is wrong for this layout. Every measured site either places text where the frame was lit for it or moves the text off the image entirely. A scrim is the tell that the photo is stock.
2. **Did I letterspace lowercase text?** `tracking-[0.3em]` on a 48px lowercase serif is the single loudest signal. Positive tracking belongs on caps at 8–14px and nowhere else.
3. **Is my display face free?** Playfair, Cormorant, Cinzel, Great Vibes. The measured set is 100% licensed or bespoke. A well-set free grotesque at one size beats a free Didone at seven.
4. **Is my headline over 60px and a complete sentence?** Then it is `premium-marketing` wearing a serif. Count the type sizes above 20px used for real sentences: the answer should be zero or one.
5. **Do my product tiles have a radius, a border, a shadow, or a hover lift?** All four should be absent. If `transition-all duration-300` appears anywhere, delete it.
6. **Is there a badge, a star rating, a countdown, or a "Trusted by" row?** Then it is `ecommerce` and it should stop pretending.
7. **Is my ground `#FFFFFF` and my text `#000000`?** Every reference tints both. Pure white and pure black is what you get when nobody made the decision.
8. **Is the accent colour on a button?** In this archetype the accent marks the brand, not the action.

The second failure is subtler and worse: applying this to a product with nothing worth photographing. Luxury spends its entire budget on one asset. If that asset is a screenshot, a stock photo or an illustration of abstract boxes, the small type and the huge space stop reading as confidence and start reading as concealment.

## Signature decisions that fit here

- **A skincare line whose shop grid is ordered by scent family, with each band's ground sampled from the actual glass of that formula's bottle** — so scrolling the catalogue walks the palette. The ordering is the taxonomy; there is no filter control, because the page itself is the filter.
- **An audio brand that renders name, finish and price as a single string in one weight** — `Beosound A9 Sienna Brown $5,100` — because the customer is choosing a material for a specific room, not comparing on price. Any typographic separation of the price re-frames the decision as a comparison.
- **A furniture maker whose product names are reference numbers** (606, 620, 621) and whose photography is customers' real, cluttered rooms rather than styled sets — because the pitch is that the system adapts to a life, and a styled set would contradict the claim. The configurator opens by asking your wall height.
- **A magazine whose entire homepage is the issue number, the cover at 435px, and two verbs** — `Buy | Read`. One decision on the page; the archive lives behind the hamburger.
- **An instrument brand that publishes the current firmware version beside every product in the hero** (`EP-133 2.5`) — specification as seduction, and the strongest possible signal that the object keeps being made rather than merely sold.

## Sources

Screenshots at `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/arch-luxury-*.png`; probe output in the session scratchpad under `lux/`.

- **bang-olufsen.com/en/us** — screenshotted at 1440 and 390, probed after dismissing the consent sheet. `h1 24px/36px w400`; `h2 36px/54px w400 −0.5px`; eyebrow `14px/20px +2px uppercase`; hero CTA 44px, 16px/500, 40px radius, **2px white border on transparent fill**, `padding: 8px 32px`; product tiles 390px tall, `radius 0`, no border; tokens `--gle-black: hsl(30,4%,9%)`, `--gle-alternative-color: hsl(51,70%,96%)`, `--gle-primary-yellow: hsl(39,100%,67%)`, `--gle-border: 2px solid`, `--gle-transition: all 400ms cubic-bezier(.165,.84,.44,1)`; 43 elements at `color 0.2s` on that same curve; page 5,537px, 34 images, 1 video.
- **acnestudios.com/us/en/home** — screenshotted at 1440 and 390, probed. Body and every heading `12px/20px +0.3px w400 "Helvetica Now Text"`; 317 of ~400 leaf text nodes at that one spec; `h1` is a 1×1px visually-hidden string while the visible wordmark is an image; radii present only at 2–3px; transitions `0.5s ease-in-out` opacity, `0.2s` colour; page 5,175px; mobile keeps 12px caps and crops the next carousel tile off the right edge.
- **buly1803.com/en** — screenshotted at 1440 (before and after the region modal), probed. Three families with strict roles: `Officine Universelle` (display, uppercase, `+0.6` to `+2.4px`), `Caslon Universelle` (body, 16px/18px and 14px/21px), `Ari Clean` (sans, **only 8–11px**); brand colours `#C1171A` and `#0D4225`, text `#121212`; twelve-step type scale `0.7rem → 6rem`; `--buttons-radius: 0`, `--card-corner-radius: 0`, `--media-radius: 0`, `--color-border: #DDDDDD`, `--spacing-4xl: 12.8rem`; card and popup shadow tokens declared with 0 blur and 0 offset; page 11,142px. The hero CTA is a double-ruled 0-radius green rectangle with a white keyline.
- **teenage.engineering** — screenshotted at 1440 and 390. Nav-as-sitemap with commissioned pictograms, hand-drawn comic hero, one orange accent, firmware versions as hero data. Proportional `vw` token system and the 100/300 weight pair are cited from `references/editorial-luxury-and-marketing.md`.
- **kinfolk.com** — screenshotted at 1440. Uppercase serif hero over a field of white with the cover at ~435px and `Buy | Read` beneath. Numbers (50px/52px, 20px/30px body, `0.5s cubic-bezier(0.25,1,0.5,1)` across 84 elements) cited from the existing teardown rather than re-derived.
- **vitsoe.com/us** — screenshotted at 1440. Plain text nav, numbered products, blue `Learn more →` text link, hero photograph of a real customer's shelving with visible clutter.
- **rivian.com/r1s** — screenshotted at 1440. 200px wordmark over autoplay film, floating pill nav, `Design yours` / `Book a drive` in the opposite corner. Token values cited from the existing teardown.
- **aesop.com/us** — Cloudflare challenge on this run (`arch-luxury-1-aesop-1440.png` is the block page). All Aesop numbers are cited from `references/editorial-luxury-and-marketing.md`, which captured them on a request that cleared: ground `#FFFEF2`, hero `30px/39.9px` w400 tracking `normal`, 48px 0-radius outlined CTA, 12px/18px nav.
- **Could not be measured:** `ssense.com/en-us/men` (Cloudflare, consistent with the prior teardown's four failed attempts) and `hermes.com/us/en` ("Access is temporarily restricted"). Acne Studios stands in for the multi-brand fashion-commerce slot and The Row's previously measured numbers (13px/21.45px body, 11px 0-radius buttons, full-bleed hero with no overlaid text) stand in for the extreme-restraint slot. `loropiana.com` timed out on two attempts and is not cited.
