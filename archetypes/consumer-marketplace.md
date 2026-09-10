# consumer-marketplace

**Evaluated:** 2026-09 · **Density:** comfortable — dense in the grid, quiet in the chrome · **Dark by default:** no. The listing photograph is uncontrolled and colour-critical (a buyer returns a coat because the green was wrong), and a dark ground shifts perceived colour and lightness of every uploaded image. Dark is correct only where the artwork is curated, consistent and dark-native — film posters, album art (Letterboxd `#14181C`, MUBI, Spotify) — never where sellers supply the photography.

> Someone with a fuzzy intent — "a coat", "somewhere in Lisbon", "a used Strat under $1,200" — has to eliminate 190 of 200 listings they did not choose, photographed by strangers, before they can compare the last ten.

## When this is the right archetype

Supply is abundant, heterogeneous and not yours. Sellers write the titles and take the photographs; you own the frame around them and nothing inside it. The user arrives mid-search, scans 40–200 items in a session, eliminates almost all of them on the photograph alone, and comes back three times a week until they buy — then goes dormant for a year. The stakes per glance are near zero and the stakes at the end are real: an object arrives in the post, or someone gets your deposit. So the interface has two jobs that pull against each other — make elimination fast, and make the last three comparisons honest. **The load-bearing question: how much non-image information does the user need to eliminate an item without opening it?** Answer that number and the card, the gutter and the grid fall out. (This archetype shares its evidence base with [`../references/consumer-and-marketplace.md`](../references/consumer-and-marketplace.md); numbers below are cited from there or re-measured in 2026-09.)

- **Choose this over `ecommerce`** when you do not own the inventory or the photography. Ecommerce optimises one funnel from a controlled catalogue — Allbirds can ship 1:1 studio shots on white and a fixed three-line metadata block because it shot every product. A marketplace grid has to stay legible when one seller shoots on a hanger against a bathroom door and the next uses the brand's press image. That means: no text over images, no assumption of a consistent crop, and elimination-first metadata rather than persuasion-first.
- **Choose this over `editorial` / `luxury`** when abundance is the pitch. Luxury withholds and speaks in its own voice; a marketplace's platform voice must be *quieter than the listing*, because the listing is the content and the platform is furniture.
- **Choose this over `enterprise-dense`** when the comparison axis is a picture. If the user needs eight numeric fields across twelve items simultaneously, they need a table with aligned columns and tabular figures, not a grid — and no amount of card design fixes that.
- **Choose this over `social-community`** when the primary object is a listing with a price and a terminal state. A feed has no end; a search does. The seller's avatar is a trust cue on the card, not the subject of it.

**Mixing.** Marketplace *hosts*; it rarely guests. Checkout is a `fintech-consumer` pane inside it (the money moment gets that archetype's 440px measure and its copy discipline, not the grid's). Natural-language search is an `ai-product` guest that must return the same grid — an assistant that answers in prose about listings the user cannot then filter is a demo, not a product.

## When it is the wrong one

**Small inventories.** Under roughly forty items a grid is a lie about abundance: four columns of eight, endless whitespace below the fold, and filters that each cut the set to two. Build an editorial collection page with real sequencing.

**Services and labour.** Upwork, Thumbtack, care.com, tutoring, trades. The decision object is a person's credibility — history, reviews, response time, price *range*, availability — and none of it is visual. A photo grid there reduces hiring to face-picking, which is both a worse decision and an EEO problem. Use a comparison list with the trust evidence in the row.

**Scheduled inventory.** Flights, trains, appointments, tickets with seat maps. The axes are time and total price and they are strictly ordinal; a picture of an aeroplane is stock photography, which is the tell. Google Flights is a table for the right reason. **Diagnostic: if you have to source stock imagery to fill the grid, the archetype is wrong.**

**B2B and wholesale.** Buyers compare SKUs, MOQs, lead times and tiered pricing across a saved shortlist and re-order quarterly. That is `enterprise-dense` with a catalogue skin.

**The exact-match case, inside an otherwise-correct product.** When a user types a model number or a listing ID, they are not browsing; they are executing. Put the exact match above the grid as a single resolved answer. Making someone scan a grid for the thing they just named is the archetype misapplied by one screen.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Airbnb** search | The most-copied grid in software, and most copies miss the mechanism | The card has no background, border, shadow or padding — computed `background: rgba(0,0,0,0)`, `border: 0px none`, `box-shadow: none`. The 20px radius is on the *image* |
| **Poshmark** category grid | Peer resale at scale with amateur photography and a two-line caption | **One type size does the entire card.** Title, price, struck price and size are all 15px; hierarchy is w600 / w500 / w400 and `#121212` / `#999999` |
| **Vinted** | The only measured product whose headline price is the price you actually pay | Item price 12px grey `#5A6566`, buyer-protection-inclusive price 14px in the teal accent `#007782` — the accent marks the honest number, not the discount |
| **Reverb** (used music gear) | *The one a well-read engineer won't name.* Condition, not price, is the eliminating axis | Condition gets its own line above the price in a closed vocabulary (`Used – Excellent`, `Brand New`), and paid placement is labelled inline: `Reverb Bump` 12px/16 w700 `#BF4802` |
| **Redfin / Zillow** | Property: the one marketplace where price legitimately outranks the photo | Price 18px/22.5 w700 above a single spec row — `5 beds · 5 baths · 4,552 sq ft` at 16px/24 w400. Two levels, not five |
| **Grailed** | A 4×220px grid at an **8px** gutter that still reads calm | Four metadata rows, each a strict left/right pair, so the eye tracks two columns instead of eight fields. Radius census: `2px` ×358, and that is the whole system |
| **Chairish** | How a good grid gets destroyed by its own growth loops | Per-option counts in the left rail (`Seating (117,433)`) — and, as a warning, three simultaneous overlays hiding the results on first load |
| **Booking.com** | Deliberate counter-example: the same problem solved with fear | Nothing. Study it for the exact strings and colours to refuse (§ Colour, § Copy register) |

**Etsy is absent on purpose.** `etsy.com` returned a DataDome challenge on every attempt in this session and in the prior teardown. There are no Etsy numbers in this corpus and none have been substituted from memory.

## The numbers

| | Value | Because |
|---|---|---|
| Body | **15px / 19–20px** for anything on a card; 14px for chrome | Airbnb ships **124 leaf elements at 15px/19 w400**; Poshmark's card runs three specs, all 15px. 15px is the floor for text scanned at speed while the eye's real target is the photo next to it. Booking's dominant body is 12px/18 across **312 elements** — a direct consequence of making room for seven simultaneous badges |
| Dense/secondary text | **13px/16** for chrome, counts and facet labels; **11–12px only for badges** | Measured Poshmark `13px/16 w400 #717171` ×97 (nav, breadcrumb, counts); Airbnb badge `11px/15 w500`. A price, a size or a condition at 12px is not "compact", it is a card you cannot skim |
| Page title | **22–24px, w500–700, and it contains the result count** | Airbnb `Over 1,000 homes in Lisbon` 22/26 w500 ls −0.44px; Depop `"vintage jacket" (1.67M results)` 24/28.8 w700; Reverb `182,844 Results`. The h1 is data. A decorative h1 above a result set wastes the one line that tells the user whether to filter or widen |
| Row / list-item height | **The unit is a card, and its height is fixed: image + a fixed metadata block.** Measured meta blocks: Poshmark **75px** (2 lines), Grailed 99, Reverb **144px** (5 lines), Airbnb 149, Redfin 158 | Fixed metadata height is what lets the eye scan *down a column* for one field. Ragged heights — titles wrapping to 1–3 lines — are the visible wobble that reads as generated. Decide which single line is allowed to truncate. A true 815×274 comparison **row** (Booking, Hemnet's 489px 16:9 list) is right only when the user compares rather than eliminates |
| Control height | Filter pill **34–36px**; search **40–48px**; primary CTA **48px**; touch minimum 44px | Airbnb filter pill h34 r24 1px `#DDDDDD` 12px/16; Vinted pill h36 r3996px; Depop search h40 r30px 2px `#262626`; Airbnb search segments h48. Pills are small because there are eight of them in a row and they are not the primary action |
| Sidebar width | **None for browse-first.** A 220–260px left facet rail only when facets carry counts and the user refines repeatedly. Map split: grid 55–60% / map 40–45% | Airbnb, Poshmark and Vinted put facets in a horizontal pill row because ≤7 facets refresh instantly. Chairish and Grailed earn a rail by printing counts per option (`Beds (5,067)`, `Menswear 1m+`) — counts-before-click is the rail's entire justification. Airbnb's Lisbon results at 1440 run 2 grid columns beside a sticky map, because location is a filter no facet can express |
| Content max-width | **None.** Full-bleed to a 24px page margin; cap the *card width* at 200–320px and add columns | Measured card widths: Grailed 220, Reverb 253, Poshmark 266, Rightmove 269, Airbnb 307, Redfin 418. Below ~200px a garment is unidentifiable; above ~320px you are showing fewer items per screen without adding decision information. At 1920 add a column; never stretch the card |
| Radius (control / container) | **Image 0–8px** (20px only if you also pay for a 24px gutter); **containers have no radius because they have no container**; pills `9999px` | Grailed `2px` ×358 · Poshmark `3px` ×108 · Vinted `6px` ×272 · Letterboxd `clamp(2px, 2.667%, 8px)` — a *percentage* radius so corners stay proportional at every poster size. Airbnb's 20px image radius is why it needs 24px gutters: a radius eats the corner that defines the gap |
| Border weight & colour | **None on cards.** Separate figure from ground instead: page `#FBFBFB` (Poshmark), `#EDF2F2` (Vinted), `#ECE9E2` (Allbirds); card stays white or transparent | A 1px border per item at 4 columns adds 96 competing edges above the fold. A hairline is legitimate only on a dark ground with dark photography (Letterboxd `#2C3440`) |
| Elevation | **Zero at rest.** Hover shadow only; one modal shadow | Airbnb card at rest: `box-shadow: none`; on hover `rgba(0,0,0,0.08) 0 1px 2px` at 0.2s. Filter modal `rgba(0,0,0,0.28) 0 8px 28px`, scrim `rgba(0,0,0,0.25)`, **no backdrop blur** — blur costs a compositor pass on a page that is still decoding 60 images |
| Motion (micro / standard) | **`background` 150–250ms · `transform` ≤100ms · sheets 200–260ms.** One curve for the whole product | Airbnb applies `background 0.2s cubic-bezier(.455,.03,.515,.955)` to **399 elements**; its card lift is `transform` at **0.1s**. You sweep a cursor across 24 cards in two seconds — at 300ms each, the grid boils |

## Colour

**Neutral character: a warm-to-neutral near-white ground with the card as the only true white.** Poshmark's page is `#FBFBFB` with text `#121212`, secondary `#717171`, tertiary `#999999` — three greys, and the third exists for separators and de-emphasised metadata, not for anything a user must read. Vinted `#EDF2F2`, Allbirds `#ECE9E2`, Headspace `#F9F4F2` do the same with more tint. Eight to ten steps is enough; you are not building a data table. **Putting the page on a tinted ground and the cards on white is a one-line change with a disproportionate effect** — it is the difference between "designed" and "unstyled" in this archetype more reliably than any accent choice.

**The accent gets exactly three jobs here, and they are archetype-specific:** (1) the search/primary CTA, (2) the saved/favourited state, (3) **the number the buyer actually pays, when it differs from the sticker price.** Measured accents: Airbnb `#DA1247`, Vinted `#007782`, Depop `#E20020`, Poshmark `#610722`, Reverb `#BF4802`. Vinted is the exemplar of job (3): the item price is 12px grey and the buyer-protection-inclusive total is 14px teal. The accent is not allowed on: card borders, badge systems, rating displays, category chips, or the discount.

**Semantic colour is where this archetype is most often corrupted.** Green may state a verifiable fact (`Free cancellation`, `Free Shipping`, `Book early to save` — Airbnb sets that last one at 11px/15 w500 on `rgba(230,246,233,0.75)`, quieter than the price it modifies). Red is reserved for a *computed factual delta*: Reverb prints `$3,370.20 price drop` in `#D80B03` beside a struck `$7,466.40` — an arithmetic result, not a claim about inventory. Everything else red in this archetype is a dark pattern with a colour token. Booking's struck price is **12px/18 w700 `#D4111E`** and its `We have 3 left at this price` is the same spec — bold red styled as a warning, in order to manufacture relief. **A strike-through is a demotion, not an alarm:** Airbnb struck `$1,390` at 15px w400 `#6C6C6C` next to `$1,251` at 15px w500 `#222222`; Poshmark struck `$30` at 15px w500 `#999999` next to `$26` at w600 `#121212`. Same size, less weight, greyer.

**Light by default, and the reason is colour fidelity, not taste.** Uploaded photography is inconsistently white-balanced already; a dark chrome makes buyers misjudge colour and drives returns. Ship a dark theme if your users browse in bed, but re-map rather than invert and check that the images still read at their real lightness.

## Type

**One neutral grotesque does everything.** Measured: Poshmark Graphik, Reverb Inter, Airbnb Cereal, Instagram the system stack on 674 elements. A second face is only justified when you have two genuine roles — a display face for the browse-entry page and a text face for the grid (Uber ships `UberMove` on 13 elements and `UberMoveText` on 264). Inside a result grid, the display face has no job.

**The scale's shape is unusually flat, and this is the single strongest differentiator from `ecommerce` and `editorial`.** The card is one size. Poshmark: title 15/19 w400, price 15/20 w600, struck price 15/20 w500, size 15/20 w400 — four fields, one size, three weights, two greys. Airbnb: 124 elements at 15px/19. Hierarchy comes from weight, colour and **baseline alignment** — Airbnb right-aligns the rating on the title's baseline so title and rating read as one row, not two fields. Three weights, 400/500/600, and no more.

**The exception, stated precisely so it is not abused: scale the price up only when price is the axis the user eliminates on, against a known market value.** Reverb sets the price at 22/26 w600 against a 16/20 w600 title, because a used-gear buyer knows what a 2021 Dean ML is worth. Redfin sets `$1,700,000` at 18/22.5 w700 above a 16/24 spec row, because property has a market rate per postcode. Poshmark and Airbnb do not, because a stranger's dress and a stranger's flat have no reference price. If you cannot name the reference price your user carries in their head, do not scale the number.

**Numerals: proportional in the grid, tabular everywhere they stack.** Nothing measured uses tabular figures in a card grid — card prices are read one at a time. Turn `tabular-nums` on for the checkout summary, the price-history table, the per-unit column and any list where prices sit in a vertical column. Two decimals on a 0–5 rating (`4.98 (56)`), none on a count.

**Monospace has no place on a listing card.** It earns its place on serial numbers, SKUs, order references and coupon codes — strings a user copies or reads aloud.

## Layout and navigation

**The shell is: search field as the primary control, a facet row under it, the result count in the h1, and then the grid to the page edges.** Search is navigation here; a category tree is a browse-entry surface, not a way to find a known item. Applied filters get their own row of removable chips below the facet row (`coat ×`) — Vinted and Depop both do this, and it is the only affordance that makes a five-facet state reversible without opening a sheet.

**The primary object is the photograph.** Everything else is a caption. It gets priority by being the largest element, by having no competing edges, and by owning a single aspect ratio the whole grid obeys — Airbnb 4:3 (307×230), Poshmark and Depop 3:4, Reverb and Allbirds 1:1, Vinted 2:3, Redfin 3:2, Rightmove 4:3 (269×201). **The ratio encodes what the item is**: flat-lay garments need tall crops, rooms need landscape, single objects on white centre in a square. Never mix ratios inside one grid; a fixed metadata block under variable image heights produces the ragged baselines that make a grid unscannable.

**Gutter is a function of card chrome, not of the spacing scale.** Measured: MUBI 4 · Rightmove 2 · Grailed 8 · Allbirds 10 · Poshmark **16 / 12** · Reverb 24 · Airbnb 24. Less chrome permits — and wants — a tighter gutter, because contact-sheet density is the sensation of abundance that makes a marketplace feel like a marketplace. `gap-6` everywhere because 24 is on the scale is how you turn 5,000 listings into a sparse showroom.

**Cards are almost never cards.** Verified again in 2026-09: Poshmark's tile computes `background: rgba(0,0,0,0); border: 0px none; box-shadow: none; padding: 0px; border-radius: 0px`, as do Reverb's and Redfin's. A real card — white on a tinted ground — is right in exactly two cases: the ground is tinted and the card is doing figure/ground work, or the card's background carries state (selected, sold, drag target).

**Filter UX: three patterns, and the count of facets picks between them.**

| Facets | Pattern | Measured | Why it fits |
|---|---|---|---|
| ≤7, instant re-query | **Horizontal pill row + applied chips on a second row** | Vinted (`Category · Size · Brand · Condition` at h36 r3996px) and Depop, with `Sort` right-aligned and separate | Every facet is visible without opening anything, and one applied filter is one visible chip you can dismiss. Survives to mobile as a scrollable row |
| ≥10, or an expensive re-query | **Sheet / modal with a sticky footer** | Airbnb 568×920, r32, `rgba(0,0,0,0.28) 0 8px 28px`, scrim 0.25, no blur | Batch the changes, pay for one re-query. Non-negotiable: the CTA carries the **live result count** (`Show 1,000+ places`), and `Clear all` is low-affordance underlined text so the destructive reset never competes with the primary action |
| Many, but each option's size matters | **Left rail of collapsed accordions with per-option counts** | Chairish (`Seating (117,433)`), Grailed (`Menswear 1m+`), Booking (`Hostels 103`) | Counts-before-click is the same protection as the live CTA, applied per option: a zero-result facet is visibly zero before it is chosen. Without counts, a rail is just a checkbox list that costs 240px |

Two more rules that come out of the measurements. **Sort is never inside the filter sheet** — it does not change the result set, it changes the reading order, and burying it makes users filter when they meant to re-rank. And **a range filter over a distribution should show the distribution**: Airbnb draws a histogram of the actual result prices behind the two slider handles, subheaded `Trip price, includes all fees`, which converts an abstract number into "am I above or below this market?" — the only version of a price slider a first-time user can set correctly.

## Components

**Belongs here:** horizontal filter-pill row with a `Sort` control kept separate from `Filters`; applied-filter chips on their own row; a filter sheet whose sticky footer is `Clear all` as low-affordance text plus a filled CTA carrying the **live result count**; per-option counts in a facet rail; a price histogram over the price slider; save-this-search / follow-this-search with an alert promise; the heart on the image, top-right; hover-revealed carousel dots on the image; a one-line seller-or-rating tiebreaker at body size; a price-drop line stating the computed delta; the skeleton-at-real-aspect-ratio; map pins labelled with price.

**Does not belong here:** countdown timers; "N people are viewing"; stock-scarcity badges not tied to verifiable inventory; auto-rotating carousels (they move the target while the user is deciding); a full-screen email modal over first-load results (Chairish stacks one over a cookie bar over a support widget — three overlays and zero visible listings); five star-glyphs with partial fills (`4.98 (56)` is more precise in a third of the space); a 0–10 score chip on a 0–5 scale where 92% of listings sit between 4.6 and 5.0; four type sizes in one card; `hover:scale-105`; pagination for discovery (use it only when the user is comparing and will want to return to position); breadcrumb-only navigation on a search-first product.

## States in this archetype

**Empty (filtered to zero) is a design failure upstream, not a screen.** Prevent it structurally: Airbnb's filter CTA reads `Show 1,000+ places` and updates as you drag, so the number falls before the grid empties. Where a live count is too expensive, print per-option counts (`Hostels 103`). If you still land on zero, the screen must name the *specific facet* responsible and offer to drop it — "No coats under £15 in size S. Remove the price filter (48 results) or the size filter (312)." `No results found. Try adjusting your filters.` tells the user only what they already know.

**First run / no query** is a browse-entry page made of real inventory — categories rendered as actual listing photography with counts — not a hero image and a search box. The user has a fuzzy intent; show them the shape of the supply.

**Loading is the layout, in one flat colour.** Vinted mid-load: **56 blocks of `#E1E6E6` at `border-radius: 6px`** on `#EDF2F2` — the exact box and radius the image will occupy. Pinterest goes further, filling each pin with a pastel sized to that pin's known aspect ratio. The skeleton's job is to make the final paint a *fill*, not a *reflow*. Shimmer pills of arbitrary width inside a bordered box are the most reliable single tell of a vibe-coded grid. Under ~200ms, ship nothing.

**Error, specifically image failure.** Because the card *is* the image, a broken image is a broken card. Reserve the box with the skeleton colour so a failure degrades to a correctly-sized rectangle instead of collapsing the row and re-flowing everything below it.

**Too much** is normal and you print the real number: `182,844 Results` (Reverb), `1.67M results` (Depop), `10,158,421 listings` (Grailed), `10,000+ items` (Chairish). Then convert the unmanageable set into a subscription rather than pagination — Reverb's `Save Category`, Chairish's `+ FOLLOW THIS SEARCH` with `Never miss new arrivals matching exactly what you're looking for`.

**The state everyone forgets: sold, delisted, or booked.** A marketplace listing is a unique object that vanishes, often while it is in the user's open tab. Keep the card in place, desaturate the image, replace the price with the sale price and the word `Sold`, and offer `Find similar`. A 404 where a listing was is the difference between a product that respects a returning buyer and one that punishes them.

## Motion budget

The frequency argument decides everything: a user sweeps a cursor across two dozen cards in a couple of seconds and scrolls past several hundred in a session. So: `background` and `color` at **150–250ms on one curve** (Airbnb 0.2s on 399 elements; Spotify 0.15s on 39); `transform` capped at **100ms** and used only for the card's press-ready lift; the filter sheet at 200–260ms; skeleton-to-image as a ≤150ms opacity fade or an instant swap. **Nothing enters.** No staggered grid reveals, no scroll-triggered fades on listing cards, no auto-advancing carousels, no animated result counts. `transition: all` is banned outright — it animates padding and border-width whenever a class toggles. Honour `prefers-reduced-motion` by dropping the transform and keeping the colour change.

## Mobile

Mobile is the product; the desktop grid is the mobile list widened. Two measured rules:

**Column count is a function of item identifiability, not viewport width.** Airbnb goes to **1 column at 390** (card 342 = 390 − 24 − 24) because a room needs width to read. Poshmark stays at **2 columns at 390** (~186px cards) because a dress on a hanger is identifiable at 186px and halving the columns would halve the elimination rate. Measure your own object: if a user can reject it at 186px, ship two.

**Type does not shrink.** Airbnb's mobile card is byte-identical in spec to its desktop card — title 15px/19 w500 `#222222`, subtitle 15px/19 w400 `#6C6C6C`, badge 11px/15 w500. Scaling the whole ramp down one step on mobile takes 14px metadata to 12px and makes the card unreadable in daylight, which is where phones are used.

Filters become a full-height bottom sheet with the same sticky footer, and the filter control carries an **applied-count badge** — Poshmark shows a `3` on the filter icon and keeps `Sort` as a separate adjacent control, so the user knows they are looking at a filtered world without opening anything. Where location is the query, mobile inverts to map-first with price-labelled pins over a bottom tab bar (Airbnb at 390). Everything primary is ≥44px; the 32×32 carousel arrows are hover-revealed desktop affordances and must not be the touch target.

## Copy register

Second person, present tense, exact numbers, no adjectives doing a photograph's job. **The platform's voice is quieter than the listing's** — the seller wrote the title, you wrote the frame.

- `Over 1,000 homes in Lisbon` — not `Discover amazing stays`. The count is the useful part; the adjective is filler over a photograph that already sells.
- `Prices include all fees` — not `Best price guarantee`. Four words that pre-empt the single largest complaint in travel booking, stated as a fact about your pricing rather than a promise about the market.
- `182,844 results, including Reverb Bump` — not an unlabelled sponsored row. Paid placement disclosed in the same line as the count, at 12px, before the user forms a theory about the ranking.
- `Used – Excellent` — not `Great condition!`. A closed vocabulary of five grades a buyer can learn beats an enthusiastic adjective a seller chose.
- `Shipping fees will be added at checkout` — not `Low shipping!`. State the bad news at the top of the funnel; it costs you a click and saves an abandoned cart and a support ticket.

**Refuse:** `We have 3 left at this price` · `Only 2 left!` · `12 people are viewing this` · `Sign in, save money` · `Loading amazing content...` · `Oops! Something went wrong 😢`. The test that settles every one of them: **would this string still be on the page if it were false?** If yes, it is decoration with an anxiety tax — and a claim about inventory that isn't tied to real inventory is a false statement made to induce a purchase, which the UK CMA and the EU CPC network have both forced off travel sites. There is a second cost that survives even where the claim is true: a badge that fires on 90% of results carries no information, and training users to discount urgency trains them to discount your genuine warnings too. The inverse pattern exists and works — Bandcamp prints `$10 more than the min` in green, social proof of *over*paying.

## The characteristic failure

**Card soup with a scarcity layer.** The recognisable artefact, in order of how it is built: every item wrapped in `bg-white rounded-xl border border-gray-200 shadow-sm p-4`, `gap-6` between them, four type sizes inside (`text-xl font-bold` title, `text-base` subtitle, `text-sm text-gray-500` meta, `text-2xl font-bold` price), titles wrapping to one-to-three lines so no two cards in a row share a baseline, five star glyphs, a red `Only 3 left` badge on every card, `hover:scale-105 transition-all duration-300`, a filter drawer of checkbox lists with an `Apply` button and no counts, and grey shimmer pills that reflow the page when images land. Every item is announced twice — once by its photograph and once by its box — and the photographs, which are the only thing the user is actually looking at, become the least prominent element in a field of 96 borders.

Self-diagnose with six checks, all of which take under a minute:

1. **Blur the grid screenshot.** If the boxes are more visible than the photographs, delete the background, the border and the resting shadow, and move the radius onto the image.
2. **Count type sizes in one card.** More than two, and you have not decided what the eliminating field is. Rebuild with one size and three weights.
3. **Count lines in the metadata block across a row.** If they differ, the grid wobbles. Fix the line count and pick the one line allowed to truncate.
4. **Compute the badge hit rate.** Any badge on more than ~30% of cards is decoration. Two or three badge types, each verifiable, is the cap.
5. **Apply the falsity test to every string.** Anything that would still be there if it were false gets deleted, not softened.
6. **Kill the images.** If the layout collapses rather than showing correctly-sized coloured rectangles, your skeleton and your error state are both wrong.

The subtler sibling: **a comparison product wearing a grid.** Stock photography in the cards, a "featured" tile that is an ad, and filters that are all numeric ranges. The user needed aligned columns and got a mood board.

## Signature decisions that fit here

- **A peer-resale app where the buyer-protection-inclusive total is the large accent-coloured number on every surface — card, listing, checkout — and the seller's asking price is the small grey one.** The single most common complaint in peer resale is the fee discovered at checkout; making the honest number the visually dominant one everywhere is a structural answer, not a disclosure.
- **A used-gear marketplace whose condition grade is a sortable first-class axis with its own line above the price, in a five-term closed vocabulary the platform assigns from photographs — never seller free text.** Condition, not price, is what eliminates listings for a musician, and a grade the seller cannot phrase creatively is the only kind worth sorting on.
- **A property site whose third card line is price per square metre, computed by the platform from the two fields the agent must supply.** A derived number no seller can inflate, in the one marketplace where every other number on the card is marketing.
- **A stays marketplace that shows the total for the user's actual dates as one sentence — `$1,251 for 5 nights` — and, when no dates are set, shows a range rather than a "from" price.** "From $89" is the mechanism by which travel pricing became untrustworthy; a range is the honest shape of the same information.
- **A vintage-furniture marketplace that keeps sold listings in the index for 90 days with their sale price visible, and links each live listing to comparable sold ones.** The buyer's real question about a one-of-a-kind object is "is this a fair price", and only the platform can answer it.

## Sources

Screenshots at `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/arch-cm-*.png`; probe scripts and JSON in the session scratchpad. All values are computed styles and bounding boxes read from the live DOM at 1440×1000 and 390×844 in Chrome, 2026-09.

- **poshmark.com/category/Women-Dresses** — screenshotted at 1440 and 390, fully probed. Ground `#FBFBFB`, body 14px/20 Graphik, text `#121212` / `#717171` (×97) / `#999999`. Grid 4×250px images at 3:4 (250×333), gutters **16 / 12**, card 266×408, metadata block **75px**, card computed `background rgba(0,0,0,0); border 0px none; box-shadow none; padding 0px`. Card type census: title 15/19 w400 `#121212`, price 15/20 **w600**, struck price 15/20 w500 `#999999`, size 15/20 w400 `#999999`. Radius census `3px` ×108, `50%` ×74. Mobile holds **2 columns** at 390 with a filter icon carrying an applied count of `3` beside a separate sort control.
- **reverb.com/marketplace/electric-guitars** — probed at 1440, screenshotted at 390 (the 1440 capture hit an "Are you human?" interstitial on the second request; the probe on the first request returned live listings). Body 16px Inter on `#FFFFFF`. Grid 5×253px, images 1:1, card 253×397, metadata **144px**, no card chrome. Meta order and specs: `Reverb Bump` 12/16 w700 `#BF4802` → title 16/20 w600 `#212121` → condition 14/15.96 w500 → struck `$7,466.40` 14/16 w400 `#616161` + `$3,370.20 price drop` 14/16 w500 `#D80B03` → price **22/26 w600** → `Free Shipping` 14/19.6 w500. Mobile: `182,844 Results` / `including Reverb Bump ⓘ`, `Save Category` pill, combined `Filter & Sort` control.
- **redfin.com/city/30818/TX/Austin** — probed at 1440 (the parallel screenshot request was served a bot-check page; the probe returned live cards). Card 418×437, image 418×279 at 3:2, metadata **158px**, no background/border/shadow. `NEW 10 HRS AGO` 11/13.75 w700 white composited on the image; `$1,700,000` 18/22.5 w700 `#131313`; `5 beds · 5 baths · 4,552 sq ft` 16/24 w400; address 14/21 w400; key-fact row 12/18 w400 with `•` separators.
- **airbnb.com/s/Lisbon--Portugal/homes** — screenshotted at 1440 and 390, grid probed. Images 307×230 (4:3), 24px gutter, confirming the prior teardown; this run served the **split map variant** — 2 grid columns beside a sticky map with price-labelled pins, and mobile inverted to map-first over a 3-item bottom tab bar. Strings captured: `Over 1,000 homes in Lisbon`, `Descriptions are based on details hosts provide`, `Prices include all fees`, `Guest favorite`, `$1,390 $1,251 for 5 nights`, `Book early to save`, `Free cancellation`.
- **rightmove.co.uk** (4×269 at 4:3, **2px** gutter) and **hemnet.se** (single-column 489px rows at 16:9) — probed at 1440 as the counter-samples for grid-vs-list in property.
- **chairish.com/collection/furniture** — screenshotted at 1440. Left rail with per-option counts (`Beds (5,067)`, `Casegoods & Storage (72,272)`, `Seating (117,433)`, `Tables (98,589)`), `10,000+ items`, `+ FOLLOW THIS SEARCH` / `Never miss new arrivals matching exactly what you're looking for` — and a full-screen email modal, a cookie bar and a support widget simultaneously covering the result grid on first load.
- **vinted.co.uk/catalog?search_text=coat** — screenshotted at 1440; the region interstitial again blocked the entire grid on first load, reproducing the prior teardown's finding. Facet pills (`Category`, `Size`, `Brand`, `Condition`) and the applied chip `coat ×` were visible behind the scrim. All Vinted numbers (`#EDF2F2` ground, `#E1E6E6` r6 skeleton ×56, `#007782` inclusive price, 6px radius ×272, 12px/16 w375 body ×389) are cited from [`../references/consumer-and-marketplace.md`](../references/consumer-and-marketplace.md).
- **Blocked, with nothing substituted from memory:** `etsy.com/search` ("Access is temporarily restricted", DataDome — also blocked in the prior teardown), `zillow.com/austin-tx` (PerimeterX press-and-hold), `depop.com/search` (403 Forbidden). Depop's measured numbers (195×260 cards at 3:4, `#E20020`, h40 r30 search, saved-search banner) and Booking.com's (12px/18 w400 body ×312, struck price 12/18 w700 `#D4111E`, five simultaneous `We have N left at this price`, 32×32 `#003B95` score chip, 815×274 comparison rows) are cited from the reference teardown; this session's Booking request redirected to the homepage and captured no results page.
- Airbnb's filter sheet (568×920, r32, price histogram over the real result distribution, `Clear all` as text, `Show 1,000+ places` live-count CTA), Grailed, Allbirds, Pinterest, Letterboxd, MUBI, Bandcamp and Spotify values are cited from [`../references/consumer-and-marketplace.md`](../references/consumer-and-marketplace.md) rather than re-derived, to keep the corpus consistent.
