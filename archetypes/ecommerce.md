# ecommerce

**Evaluated:** 2026-09 · **Density:** comfortable · **Dark by default:** no — and the reason is not taste. A buyer judging "is this navy or black" against a `#0A0A0A` ground gets it wrong and returns it, and every hosted checkout you will hand off to (Shopify, Stripe, Bolt) is a light document you do not control, so a dark store becomes a different site at the exact moment trust matters. Death Wish Coffee is the legitimate exception — black packaging photographed on black — and its checkout is still white.

> A stranger who arrived from an ad has about ninety seconds and one unresolved doubt between them and a purchase, and every element on the page either answers that doubt or costs you the sale.

## When this is the right archetype

The users are first-time or lapsed visitors who landed on a product page — not the homepage — from paid social or search, on a phone, with no account, no training and no loyalty. They will see this page once, maybe twice. The stakes are their money and the hassle of a return; yours is the quarter. What they are actually doing is not browsing, it is **resolving uncertainty**: will it fit, what colour is it really, when does it arrive, what if I'm wrong, and what is this going to cost in total. Conversion is the metric, which makes this archetype different in kind from the rest of the corpus — you are not allowed to defend a decision on taste, because there is a number attached to it.

- **Choose this over `luxury`** when deleting the review stars would measurably drop revenue. Structurally: if the buy column needs a size grid, a fit note, a returns line, a review count and a delivery date, you are here. Luxury allows one CTA per band; ecommerce needs one CTA per viewport, including a sticky one.
- **Choose this over `consumer-marketplace`** on supply. A marketplace lists other people's inventory with inconsistent photography, and its design problem is elimination across 40–200 listings. You own the inventory, the photography is consistent, the catalogue is 30–500 SKUs, and the design problem is the **PDP**, not the grid. Your category page still borrows marketplace craft wholesale (→ [`../references/consumer-and-marketplace.md`](../references/consumer-and-marketplace.md)); your PDP does not.
- **Choose this over `premium-marketing`** when there is a price and a cart. Oatly's US product index ships 21 packages, product names and **no price and no add-to-cart** — because they sell through grocery. A page that cannot transact is a brand catalogue no matter how much it looks like a store.
- **Hosting note.** The checkout is *inside* this archetype but switches register (below). A PDP with an AI fit assistant is `ecommerce` hosting `ai-product` in a drawer; the assistant does not get to restyle the size grid.

## When it is the wrong one

**B2B, wholesale and quote-based selling.** Net terms, POs, tiered price breaks, reorder-from-history. The buying object is a reorder list, not a hero; the returning buyer wants CSV upload and a saved cart, not a lifestyle band. Urgency copy on a purchase order is not persuasive, it is unprofessional. That is `enterprise-dense` with a catalogue attached.

**Configurator-led, high-consideration goods** — a mattress, a bike frame, a car, a made-to-measure suit. The archetype's PDP breaks because the "variant" is an eight-step dependent configuration with price deltas at each step. You need a stepper with a persistent running total and a save-and-return, not a swatch row and a size grid.

**One-of-one inventory** — vintage, art, resale. Sold-out is permanent rather than restockable, "notify me" is meaningless, and the grid is the product. That is closer to `consumer-marketplace`.

**Software subscriptions.** A pricing page is not a PDP. → [`../patterns/billing-plans-and-checkout.md`](../patterns/billing-plans-and-checkout.md) plus `premium-marketing`.

**The transactional tail of your own site.** Address entry, payment, returns, order tracking. The moment the buyer commits, the register switches to institutional-form: 16px body, visible field borders, persistent labels, field-level errors, no brand display face. Nobody has ever admired a store for a beautiful failed payment.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Glossier** | The most disciplined PDP measured: one radius value on the entire page, one type size doing almost everything | **The price lives inside the button** — `Add to bag  $16`, one 143×40 object. At $16 the decision is "do I want it", not "is it worth it"; a separate price line invites a comparison that isn't happening. |
| **Allbirds** (Shopify) | The best-behaved commercial storefront in the corpus, PDP and grid both | The disabled add-to-cart is labelled **`SELECT A SIZE`**, not a greyed `Add to Cart`. The button names the blocker instead of the goal. |
| **Gymshark** | Steal one thing and refuse another, on the same screen | Steal: out-of-stock sizes stay in the grid, struck through, each with a restock bell. Refuse: `🔥 656 people viewed this in the last 24 hours` sitting on top of the hero image. |
| **Nike** | The variant problem solved at scale — 19 colourways on one PDP | Swatches are **product photographs**, not hex dots, and `Fits large; we recommend ordering a half size down` sits *above* the size grid. Returns data turned into the copy that reduces returns. |
| **Death Wish Coffee** (Shopify) — *the non-obvious one* | A dark-ground PDP that works, and a variant model most stores get wrong | The size variant is `1 BAG / 2 BAGS / 5 BAGS` with a price under each. The customer's real decision is reorder frequency, so the variant **is** the quantity, priced at the point of decision instead of upsold in the cart. |
| **Shopify's own checkout** | The default 2M+ stores ship; worth knowing exactly what it does and where it leaks | `Shipping — Enter shipping address` — the row is present before the value exists, the same move as Stripe's `Tax ⓘ Enter address to calculate`. |
| **Oatly** — *the other non-obvious one* | A boundary marker: a product catalogue with no price, no cart, no checkout | Packaging *is* the photograph, product name below, no card, no chrome. Proof that "looks like ecommerce" and "is ecommerce" are different questions — and that a page with nothing to buy should stop pretending. |
| **Bandcamp** | The structural inverse of scarcity, already measured in this corpus | `$10 more than the min` in green — social proof of *over*paying. It rewards generosity where "Only 3 left" punishes hesitation, and it is always true. |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **15–16px / 1.5** | Nike runs 16px/24 across the entire buy column; Glossier's PDP runs 138 leaf nodes at 14px/19.6 and reads dense even for cosmetics. A first-time buyer parsing a fit note is not a power user scanning a queue — 13px costs comprehension, and comprehension *is* the conversion lever. 16px is the floor on mobile inputs regardless (iOS zoom). |
| Dense/secondary text | **12px/16, w500, uppercase, +0.6px** | Allbirds' dominant PDP spec is 12px/16 w400 (27 nodes) and 12px/16 w500 ls 0.6px uppercase (8); Glossier sets eyebrows in Apercu Mono 12px uppercase. Reserved for *labels on things* — `COLOR:`, badge text, breadcrumbs. Never a fit note, never a shipping promise, never anything the buyer's decision depends on. |
| Page title (product name) | **20–34px, w500–700**, one line where possible | Nike h1 `20px/24 w500` Helvetica Now Display Medium; Death Wish `34px/34 w700` uppercase; Glossier ~32px. The name is not a headline — a 665px photograph already did the announcing, and the visitor read the name in the ad. Above ~40px you are paying display type for a string they already know. |
| Price | **16–18px, w500, at or one step above body** | Nike `$115` at 16px/24 w500 — *identical spec to the "Men's Shoes" subtitle*. Allbirds `$120` at 18px/28 w500. Death Wish `$13.99` at 18px/27 w400. Nothing measured enlarges the price. A price is a fact you must not hide, not a claim you are making; a 32px price is a discount-store tell. |
| Row / list-item height (cart line) | **72–88px**, built around a 64–72px square thumbnail | Shopify's checkout line is a 64px thumb with a quantity badge, name + variant on two lines, price right-aligned. The cart is read once and must be verifiable at a glance — recognition comes from the image, so the row is as tall as the image needs to be. |
| Control height | **ATC 48–60px**, full width of the buy column · secondary 40–44px · variant cells 44–48px | Nike 60px (376 wide, r30, pad `18px 24px`); Allbirds 49px pill; Death Wish 45px 0-radius; Glossier is the outlier at 143×40. 44px is the touch floor and the ATC is the one control that must never be missed or mis-tapped. |
| Sidebar width | **None on a PDP.** Buy column **376–483px** against a 530–860px gallery | Nike: buy column 376px at `x:856`, gallery image 532×665. Allbirds: 483px at `x:905`. The gallery gets 55–65% of the width; the column that closes the sale gets a fixed, scannable measure. Under ~360px the size grid wraps badly; over ~520px the fit note runs to an unreadable line length. |
| Content max-width | **1200–1440px** shell · **430–680px** for description prose · full-bleed only below the fold | Death Wish's description column measures ~430px and its paragraphs run four lines. The description is *read*, so it obeys measure like any prose. Full-bleed belongs to the lifestyle band, never to the transaction. |
| Radius (control / container) | **Two schools — pick one and never mix.** Either **0px** (Glossier ships exactly one 2px radius on the whole page; Death Wish 0) or **full pill on controls + 8–16px on containers** (Allbirds: pill ×27, 2px ×13, 8px ×10, 24px ×8, 16px ×6; Nike ATC r30). | Radius here is a brand-register decision, not a component decision. What kills a PDP is the third option — `rounded-lg` on everything — which is the single loudest generated-UI signature. |
| Border weight & colour | **1px at real contrast** on variant cells and inputs (Allbirds `1px solid oklch(0.872 0.01 258)`; Gymshark a visible grey box per cell) | The variant grid is the one place in this archetype where borders carry *state* — available, selected, unavailable. A 1px `#F3F4F6` hairline makes unselected and disabled indistinguishable, which converts a design preference into a checkout failure. |
| Elevation | **Near zero.** Allbirds ships 3 shadowed elements on a whole PDP; Glossier ships 2. Sticky bars use a 1px top border, not a shadow. | Elevation competes with the photograph, and the photograph is the expensive asset. Three things earn a shadow: the cart drawer, the size-guide modal, and the mobile sticky bar. |
| Motion (micro / standard) | **150–200ms** colour/opacity · **200–250ms** cart drawer | Allbirds: `0.2s cubic-bezier(.37,0,.63,1)` ×13 and `0.15s cubic-bezier(.4,0,.2,1)` ×6 on the PDP, matching the `opacity 0.15s cubic-bezier(.4,0,.2,1)` ×68 measured on its collection grid. Glossier is the counter-example — `0.4s ease-in-out` on 174 elements, including a transition applied to `font-size` — and the page feels slow to operate. |
| Gallery aspect ratio | **One ratio per catalogue.** 1:1 studio-on-white, 4:5 apparel-on-model | Nike 532×665 = 0.80 (4:5); Death Wish 1220×1220 = 1:1; Allbirds 1:1. Mixing ratios inside one catalogue produces the same ragged-baseline failure as ragged card metadata. |

## Colour

**Ground is white or a warm tint; the tint is the cheapest "designed" decision available.** Allbirds sits the page on `#ECE9E2` with white surfaces; Glossier is pure white with an `#E8E8E8` button; Death Wish is `#000`. Tinted ground plus white card is the move already measured across Vinted, Headspace and Bandcamp in this corpus — one line, disproportionate effect.

**The accent rule specific to this archetype: the accent is the purchase path and nothing else.** Add-to-cart, cart badge, checkout button, the ring on the selected variant. Not headings, not description links, not icons. Note the divergence in both directions: in `technical-productivity` the accent means *this is the action* at low saturation; in `luxury` it marks the brand and never touches a button; here it must be the highest-contrast object in the buy column, at full strength, exactly once per viewport.

**Most measured add-to-carts are black, not brand-coloured** — Nike `#111111`, Gymshark black, Allbirds `#212121`. Death Wish's `#AC6E39` and Glossier's `#E8E8E8` are brand decisions taken deliberately. Either is defensible; what is not defensible is two filled buttons of similar weight in one buy column, which is what happens when wishlist, size guide and share all get treated as buttons.

**Semantics, with one archetype-specific mapping.** Red is permitted on a *reduced* price and never on the struck original. Gymshark ships `$19` in black beside `$38` struck in red, which styles the old price as an alarm to manufacture relief — the same mechanism this corpus documented on Booking.com. The correct treatment is Airbnb's: demote the old price by weight and grey at the same size. Green means in-stock or threshold-met (`$18 away from free shipping`). Amber means an honest constraint (`Ships in 2–3 weeks`).

**Light/dark.** Ship light. If the brand's product photography is genuinely dark-ground (Death Wish), commit to a dark ground as a brand asset — never a `prefers-color-scheme` inversion and never a toggle — and accept that your checkout will still be white, so design the handoff deliberately: same logo, same face, same accent, no theme whiplash.

## Type

**A neutral grotesque does the work; at most one brand face touches the product name.** Nike: Helvetica Now Display Medium for the h1, Helvetica Now Text for everything else. Death Wish: Revans-Bold on the name, Fenomen Sans on all body. Glossier: Apercu throughout, Apercu Mono for eyebrows. That is the pattern — display face on the name only, text face on everything the buyer must parse to decide.

**Scale contrast is low, and this is the surprise.** Measured meta-to-display ratios: Nike 12→20px (1.7×), Allbirds 12→~28px (2.3×), Death Wish 12→34px (2.8×). Compare `premium-marketing` at 4.6× and `editorial` higher still. The reason is structural: a PDP's hierarchy is *spatial* — a 665px photograph beside a 376px column — so it does not need to be typographic. A 64px headline on a PDP is imported from a landing page.

**Weights 400 / 500 / 700, and 500 does most of the emphasis.** Nike's title, price and add-to-cart are all w500. Skip 300 entirely; it disappears against product photography.

**Numerals: proportional lining, inline, currency symbol attached, cents at full weight, never superscripted.** Tabular figures earn their place in exactly one location — the order-summary column in cart and checkout, where subtotal / shipping / tax / total must align on the decimal. A card grid never needs them, because card prices are read one at a time.

**Monospace earns its place on strings the buyer will copy, compare or read aloud to support**: order numbers, tracking numbers, discount codes, SKUs. Glossier's mono eyebrows are a brand device, not a functional one — do not generalise them into a rule.

## Layout and navigation

**The shell is an announcement bar, one header row, a two-column PDP above the fold, then a vertical stack of bands.** No sidebar on a PDP, ever. Death Wish runs 7,391px and Nike 3,156px; long is fine.

**The primary object is the buy column, not the photograph — and this is the sharpest divergence from `luxury`.** The gallery gets more pixels; the buy column gets priority, which means three concrete things: it never scrolls out of reach (sticky on desktop when the gallery is taller, sticky bar on mobile), it contains no link that navigates the buyer away, and its contents are ordered strictly by the question each answers — name → price → variant → size → fit → add-to-cart → delivery and returns. Anything that answers no question moves below the fold.

**Grouping: the fold is the transaction, everything below it is the argument.** Description, spec or ingredients, reviews, lifestyle band, related products. The fatal ordering error is putting the argument above the transaction — a buyer who arrived from an ad has already been argued into caring.

**Cards.** On the category grid, mostly no: the photograph is the container (→ marketplace §1), and Allbirds' white card earns its border only because it is doing figure/ground work against `#ECE9E2`. On the PDP, a bordered card around the buy column is a rectangle competing with the product; Allbirds ships one and it is the weaker half of that page.

## Components

**Belongs here:** variant swatches that are the actual product photograph or the actual colour · a size grid rendering **every** size including unavailable ones, struck, each with a notify affordance · add-to-cart with the price inside it or immediately adjacent · a mobile sticky ATC bar that appears once the inline one scrolls past · a cart *drawer*, not a page navigation · a free-shipping progress line where a threshold genuinely exists · express wallet buttons above an `OR` divider, rendered conditionally on availability (Apple Pay: **+22.3% conversion** on eligible checkouts) · a delivery estimate expressed as a date · a returns line stated as a fact · review summary as `4.4 (677)` with a link · a size guide as a modal that does not lose the page · a bundle upsell as a named product with a real saving (`SAVE 11%`), below the ATC.

**Does not belong here:** countdown timers on offers with no end time · "N people are viewing this" · a stock number you cannot substantiate · carousel heroes on a PDP · an FAQ accordion above the add-to-cart · a row of grey padlock trust badges — replace with `Free returns within 30 days` in body type, which is the same claim in a form the buyer can act on · a newsletter modal on first paint over a PDP · a wishlist button at the same visual weight as the ATC · an open promo-code box in the cart (**35%** of sites don't collapse it, and an empty coupon field sends buyers out of your checkout to hunt for a code) · a `Continue shopping` link heavier than `Checkout` · a `<select>` for colour.

## States in this archetype

**Empty.** The empty cart is the highest-intent zero state in the whole corpus — the buyer navigated *to* the cart. It is not an illustration with "Your cart is empty". It is three or four real products with prices and one-tap add: last viewed, then best sellers. Death Wish's 404 gets this right (search field, four category buttons, a `BEST SELLERS` row) and is a better empty state than most carts.

**Loading.** Reserve the gallery box at its known aspect ratio and fill it with a flat colour or a sampled tone — never shimmer. The PDP-specific failure is layout shift *in the buy column*: variant data hydrates, the size grid appears, and the add-to-cart jumps 200px down under a thumb that is already moving. Reserve the grid at its final row count. And the price must never render, then change.

**Out of stock.** Handle it per variant, not per product. Keep the size in the grid, strike it, attach a notify affordance (Gymshark's bell). Removing it makes a buyer conclude their size does not exist and leave; striking it says the size exists and they can be told when it returns. At product level, replace the ATC with an email capture that states exactly what happens: `We'll email you once, when it's back. Nothing else.`

**Error, in two registers.** Merchandising errors — doesn't ship to your region, max quantity, expired code — are sentences in body type beside the control that caused them, no banner. Payment errors are the institutional register: field-level, card fields **retained**, the bank's reason in human language (`Your bank declined this card. Try a different card or use Apple Pay.`). A decline is **10%** of abandonment, and a form that clears itself converts a retry into an exit.

**Too much.** 400 SKUs: the category page hands off to `consumer-marketplace` — fixed metadata line count, one image ratio, filter pills with live counts. 40 variants: Nike grids 19 colourways 5-up as photographs across four rows plus a `Design Your Own` tile, and that is correct. A `<select>` hides the fact that the thing the buyer wants exists.

**Paid but not yet confirmed.** Payment succeeded, the webhook hasn't landed. `Payment received. Setting up your order…` with a bounded poll and an email fallback — never a bare spinner, and never a second pay button.

## Motion budget

**Permitted:** cart-drawer slide 200–250ms · gallery cross-fade on variant change, 150ms opacity — the image *must* change when the swatch changes, visibly, or the buyer won't believe the selection registered · cart-count as a single 150ms number change · free-shipping progress width · skeleton-to-image opacity at 150ms, which is exactly what Allbirds ships on 68 elements.

**Forbidden:** `hover:scale-105 duration-300` on grid cards — sweep 24 cards and the grid boils · any animation on a price or a total · entrance animations on the buy column · a bouncing add-to-cart · auto-advancing hero carousels · countdown ticks · `transition: all` anywhere, which is how Glossier ends up animating `font-size` on 174 elements.

**The frequency argument is unusual here and easy to get backwards.** The *visit* is once, which tempts you toward a `luxury`-scale motion budget. But one interaction repeats five to fifteen times inside that single visit — variant selection while the buyer compares colourways — and it sits directly on the critical path. Every control on the purchase path is a high-frequency control inside a low-frequency visit, and gets 150ms and nothing else. Choreography belongs to the lifestyle band below the fold, where nothing is at stake.

## Mobile

Mobile-first in the literal sense: this is where the paid traffic lands, and the desktop PDP is the mobile one widened.

- **Order at 390:** gallery full-bleed with a position counter (`1 / 11`) and a thumbnail strip, then name, price, rating, variant, size, add-to-cart. Glossier ships exactly this — and its inline ATC falls below the first viewport with no sticky bar behind it. That is the most common conversion leak in the archetype and it is one component to fix.
- **Ship a sticky bottom ATC.** It appears once the inline control scrolls out, carries product name, price and button, and sits above `env(safe-area-inset-bottom)`. Allbirds ships a 1384×49 full-width sticky version even at 1440; on a phone it is not optional.
- **Type does not scale down.** 16px minimum on inputs. Do not take a 14px fit note to 12px — that note is the thing preventing a return.
- **Variant swatches ≥44px**, horizontally scrollable with the next swatch cropped at the edge as the affordance. Never dots alone, never a `<select>`.
- **Cart drawer becomes a full-height sheet** with the checkout button pinned; the summary starts expanded with a `Hide` control, because a collapsed summary is where the extra-costs abandonment happens.
- **Checkout:** wallet first, `inputmode="numeric"` plus `autocomplete="cc-number" / cc-exp / cc-csc / cc-name / postal-code`, and the pay button above the keyboard. → [`../patterns/billing-plans-and-checkout.md`](../patterns/billing-plans-and-checkout.md).

## Copy register

Second person, present tense, specific, and every string survives one test: **would this still be there if it were false?** If yes, it is decoration with an anxiety tax — delete it. State constraints before the buyer discovers them; a bad fact stated early costs less than the same fact found at step four.

- `SELECT A SIZE` — Allbirds' disabled add-to-cart. Beats a greyed `Add to Cart`, which tells the buyer they have failed without saying at what.
- `Fits large; we recommend ordering a half size down` — Nike, directly above the size grid. Beats `True to size ✓` and beats a bare size-chart link: it is an instruction, not a rating.
- `Due to increased demand, orders may take up to 30 days to ship.` — Allbirds' banner. Beats `Shipping delays may occur`, which names no number and admits no cause.
- `Shipping — Enter shipping address` — Shopify checkout, rendering the row before the value exists. Beats a shipping line that materialises at step three, which is the mechanism behind the largest abandonment category.
- `Customers say it fits true to size` — Gymshark. Beats `⭐ Great fit!` because it attributes the claim to someone.
- **Wrong, all measured or standard:** `🔥 656 people viewed this in the last 24 hours` (Gymshark, over the hero image) · `Only 2 left!` on a made-to-order product · `Hurry — ends soon` with no date · `Free shipping 🎉` · `Oops! Something went wrong`.

## The characteristic failure

The bad version is a Tailwind PDP: a `rounded-xl border shadow-sm` gallery, a `text-4xl font-bold` price in the brand colour, colour variants as flat hex circles, sizes in a `<select>`, a full-width gradient `Add to Cart` with `hover:scale-105`, a red `Only 3 left in stock!` pill beneath it, a row of four grey trust badges (`Secure Checkout` · `Free Shipping` · `30-Day Returns` · `24/7 Support`), five partial stars with no count, and three feature cards with outline icons below.

The diagnosis: **it optimises the appearance of persuasion instead of removing uncertainty.** Every element listed is a *claim*. None is an *answer*. The buyer's real questions — will it fit, what colour is it really, when does it arrive, what if I'm wrong, what is the total — are answered by none of them, and the two components that could answer (variant, size) have been built in the forms that answer them worst.

Self-diagnosis, in order of how loudly each gives you away:

1. **Is the price larger than the product name?** Every product measured sets it at or one step above body, and Nike sets it identical to the subtitle. A 32px price is a discount-store tell.
2. **Are colour swatches flat hex circles?** Nike ships 19 photographs. A hex dot cannot tell anyone what "Mushroom" or "Black Marl" looks like, and the return rate is where you find out.
3. **Are unavailable sizes hidden?** Then a buyer who wears that size concludes it does not exist. Render, strike, offer notify.
4. **Does the disabled ATC still say `Add to Cart`?** It names the goal instead of the blocker. Name the blocker.
5. **Is there a badge that would still be there if it were false?** Countdown, viewer count, stock count. Delete it — the same test this corpus applies to Booking.com, and the one the UK CMA and the EU CPC network have enforced against travel booking.
6. **Is there a sticky ATC at 390px?** If not, the transaction is below the fold on every mobile session you paid for.
7. **Is there more than one filled button in the buy column?** Wishlist, size guide, share and compare are text or outline. Exactly one filled button.
8. **Does the total appear only after the address?** That is the 40%-of-abandonment failure, built deliberately. Render the shipping and tax rows before you can fill them.
9. **Does the gallery mix aspect ratios?** One ratio per catalogue.
10. **Is `transition-all duration-300` in the file?** Delete it.

The second failure is subtler and increasingly common: **a PDP that is beautiful and answers nothing.** The luxury treatment applied to a $40 product — a 1200px full-bleed image, a 14px name, a price, one 0-radius button, and no fit note, no returns line, no review count, no delivery date. It photographs well and converts badly, because a first-time buyer of a $40 object is not purchasing legitimacy, they are managing risk. Restraint in this archetype means deleting decoration, never deleting answers.

## Signature decisions that fit here

- **A coffee roaster whose only variant control is `1 BAG / 2 BAGS / 5 BAGS`, with the per-bag price under each.** The customer's real decision is how often they want to reorder, so the variant *is* the quantity and the bundle discount is stated where the decision happens instead of ambushed in a cart upsell.
- **A footwear brand where every string in the buy path names the buyer's uncertainty rather than the system's state**: the disabled button reads `SELECT A SIZE`, size cells carry their numeric equivalent (`XS (2-4)`), and the sold-out cell keeps a bell. Nothing in the column describes the software.
- **A skincare PDP where the price lives inside the add-to-cart** — `Add to bag  $16` as one 143×40 object — because at that price the question is desire, not value, and typographically separating the price re-frames it as a comparison.
- **An apparel PDP that publishes its returns data as guidance above the size grid** — `Fits large; we recommend ordering a half size down` — turning the worst operational number in the business into the copy that reduces it.
- **A cart drawer whose only urgency is a free-shipping progress line** (`$18 away from free shipping`) — the one piece of pressure in ecommerce that is always true, always verifiable, and entirely in the buyer's control.

## Sources

Screenshots at `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/arch-ecom-*.png` (1440 and 390, 2026-09); probe output — computed styles and bounding boxes read from the live DOM with Playwright at 1440×1000 — in the session scratchpad.

- **glossier.com/products/balm-dotcom** — screenshotted at 1440 and 390, probed. Body Apercu 16px/18.4; dominant leaf spec `14px/19.6 w400` ×138; eyebrows `12px/16.8 uppercase Apercu Mono` ×10; **radius census: `2px` ×1 and nothing else**; add-to-bag `143×40`, `radius 0`, `bg rgb(232,232,232)`, `14px/400`, `padding 8px 16px`, label `Add to bag $16`; bundle rows `400×160` with `SAVE 11% / 17% / 38%`; transitions `font-size 0.4s ease-in-out` ×174, `opacity 0.4s` ×33+26, `all 0.2s` ×6. At 390: full-bleed gallery with a `1 / 11` counter and thumbnail strip, name below it, add-to-bag below the first viewport, no sticky bar.
- **allbirds.com/products/mens-tree-runner-go** — screenshotted at 1440 and 390, probed. Ground `#ECE9E2`, Geograph + Akkurat Mono; dominant `12px/16 w400` ×27 and `12px/16 w500` ×13; radii pill ×27 / 2px ×13 / 8px ×10 / 24px ×8 / 16px ×6; price `$120` at `18px/28 w500 ls0.9` in `rgb(156,15,15)` beside a struck `$0` in `#575757` (a live compare-at bug on their side — cited as measured, not as a pattern); buy column `483px` at `x:905`; inline add-to-cart `483×49` pill, disabled, `bg oklch(0.928 …)`, label **`SELECT A SIZE`**; full-width sticky duplicate `1384×49` on `#212121`; `FINAL FEW` badge on the gallery; all 13 size cells struck; `The Tree Runner Go fits true-to-size for most customers.` + `Fit Guide`; `Free Shipping on Orders over $100`. Collection page also viewed (`Due to increased demand, orders may take up to 30 days to ship.` banner). Grid geometry, card metadata and transition curve cited from [`../references/consumer-and-marketplace.md`](../references/consumer-and-marketplace.md) rather than re-derived.
- **nike.com/t/air-force-1-07-mens-shoes-5QFp5Z/CW2288-111** — screenshotted at 1440, probed. `h1 20px/24 w500` Helvetica Now Display Medium `#111111`; subtitle `16px/24 w400 #707072`; price `$115` at `16px/24 w500 #111111`; add-to-bag `376×60`, `radius 30px`, `bg #111111`, `16px/24 w500`, `padding 18px 24px`; buy column `376px` at `x:856`; gallery image `532×665` (0.80), `radius 0`, nine-thumbnail left rail; 19 photographic colourway swatches 5-up plus `DESIGN YOUR OWN`; `Highly Rated` pill on the image; `Fits large; we recommend ordering a half size down` above a two-column size grid with unavailable sizes struck; page 3,156px.
- **deathwishcoffee.com/products/coconut-caramel-coffee** — screenshotted at 1440 and 390, probed. Body ground `#000`; `h1 34px/34 w700` uppercase Revans-Bold in `#AC6E39`; price `$13.99` at `18px/27 w400 ls1.3` white Fenomen-Sans; add-to-cart `305×45`, `radius 0`, `bg #AC6E39`, `14px/21 uppercase ls0.5`; hero image `1220×1220` (1:1); `★ 4.7 (328)`; `SIZE` variant as `1 BAG / 2 BAGS / 5 BAGS`; page 7,391px. Its 404 (`EMPTY MUG?` + search + four category buttons + `BEST SELLERS`) was also captured and is cited as the empty-state model.
- **Shopify checkout** (Death Wish storefront, standard Shopify checkout) — screenshotted at 1440. Two columns, form left / summary right on a grey ground; `Express checkout` with Shop Pay, PayPal, Amazon Pay, Google Pay above an `OR` divider; `Contact` with a right-aligned `Sign in`; a **pre-checked** `Email me with news and offers`; `Subtotal`, **`Shipping — Enter shipping address`**, `Total  USD $19.99`; collapsed-width `Discount code or gift card` with `Apply`; a `RECOMMENDED PRODUCTS` block *inside* the summary carrying its own Quantity/Type/Size selects — noted as the leak, not the model.
- **gymshark.com** (Vital Crop Top PDP) — screenshotted at 1440. `50% Off | Save $19` chip; `$19` beside `$38` struck **in red**; `★4.4 (677)` right-aligned on the price row; four photographic colour swatches with the name `Black Marl` beneath; `Select a size` with a right-aligned `Size Guide`; size cells `XS (2-4)` and `S (4-6)` available, `M (6-8)` through `XXL (12-14)` struck with a restock bell; `✓ Customers say it fits true to size`; full-width black `Add to bag` beside a separate outlined wishlist square; and `🔥 656 people viewed this in the last 24 hours` overlaid on the gallery.
- **oatly.com/en-us/products** — screenshotted at 1440. Twenty-one packages photographed cut-out, product name below each, **no price, no add-to-cart, no cart icon**; category chips across the top; a hand-lettered `WOW NO COW!` panel occupying the first grid cell. Cited as the archetype boundary.
- **Baymard Institute** figures — 70.22% average cart abandonment; extra costs too high 40%, forced account creation 18%, card declined 10%, couldn't calculate total upfront 12%; 11.3 average US checkout fields against 8 achievable; 35.26% average available conversion uplift; 35% of sites don't collapse the coupon field. Cited from [`../patterns/billing-plans-and-checkout.md`](../patterns/billing-plans-and-checkout.md), which reconciles the two Baymard series (form *elements* vs form *fields*); not re-derived here. Apple Pay +22.3% conversion / +22.5% revenue on eligible checkouts is Stripe's April 2025 figure, from the same file.
- **Could not be measured:** `cettire.com` returned `Access is temporarily restricted` under every attempt, so no Cettire values appear in this file; the multi-brand luxury-commerce slot is unrepresented and Gymshark stands in for high-velocity fashion. `us.oatly.com` product URLs 404 (US DTC is retired), which is itself the finding.
