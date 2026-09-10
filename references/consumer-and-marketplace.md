# Consumer products and marketplaces

**Evaluated:** 2026-09

## What this archetype is for

Products where the user is *browsing*, not *working*: they arrived with a fuzzy intent ("somewhere in Lisbon", "a vintage jacket", "something to watch"), they will scan 40–200 items before choosing one, and the item's photograph carries more decision weight than any field of text next to it. Airbnb, Spotify, Pinterest, Depop, Vinted, Grailed, MUBI, Letterboxd, DoorDash, Etsy, Shopify storefronts and Instagram all live here. Tools where the user already knows the target and is executing (Linear, Stripe Dashboard, admin panels) do not — density that reads as "rich" in a browsing grid reads as "cluttered" in a workspace, and vice versa. The load-bearing question for everything below: **how much non-image information does the user need to eliminate an item without opening it?** Get that number right and the layout follows.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Airbnb** (search + filter sheet) | The most-copied card grid in the world, and almost every copy misses why it works | The card has no background, no border and no shadow — the 20px radius is on the *image*, not on a container |
| **Booking.com** | Deliberate counter-example: the same problem solved with fear | Nothing. Study it to learn the exact strings and colours to refuse |
| **Spotify** (open.spotify.com) | Dark-mode browsing at scale, and a display typeface used with discipline | Two faces from one family: `SpotifyMixUITitle` for h1/h2 only, `SpotifyMixUI` for all 827 other elements |
| **Pinterest** | Masonry that doesn't jump, and the best placeholder system measured here | Per-pin pastel placeholder at the pin's known aspect ratio — the layout is final before a byte of image arrives |
| **Duolingo** | Loud and childlike-adjacent without being childish | Exactly one border-radius (12px) across the whole marketing surface; the "3D" button is a 4px bottom *border*, not a shadow |
| **Discord** | Loud in the other direction — shouty display type over a calm grid | A separate display typeface (ABC Ginto Nord) set at 56px/48px — line-height *below* font-size |
| **Instagram** (web) | Proof that a billion-user consumer product can ship the system font stack | `-apple-system` on 674 elements; hierarchy is done with 14/12px and two greys, not with a brand face |
| **Depop / Vinted** | Peer-resale: many sellers, inconsistent photography, price is the decision | Vinted shows the *inclusive* price larger and in the accent colour, the item price smaller and grey |
| **Grailed** | Card grid with 2px radius and an 8px gutter that still reads as calm | Four metadata rows, each a strict left/right pair — the eye tracks two columns, not eight fields |
| **MUBI** *(off-list)* | Image-forward taken to its limit | Metadata is burned *into* the poster bottom-left as one uppercase line; there is no metadata block at all |
| **Letterboxd** *(off-list)* | The densest legible poster grid in consumer software | Poster radius `clamp(2px, 2.667%, 8px)` — a *percentage* radius, so corners stay proportional at every poster size |
| **Allbirds** (Shopify) | The best-behaved commercial storefront grid measured | White cards on a warm sand ground (#ECE9E2), 10px gutter, and a metadata block that is always exactly 3 lines |
| **Bandcamp** *(off-list)* | Marketplace that shows generosity instead of scarcity | `$10 more than the min` in green — social proof of *over*paying, the exact inverse of "only 3 left" |
| **Headspace / Strava** | Warm consumer brand systems with restraint | Headspace: 48px pill buttons, `letter-spacing: -0.54px` at 18px — tight, not airy |
| **Uber / DoorDash** | Utility-first consumer at national scale | Uber: a display face (`UberMove`) used on 13 elements and a text face (`UberMoveText`) on 264 |

**How the two off-list products were found.** I ran the same auto-grid probe over every product on the list and recorded `metaH` — the pixel height of the metadata block below each card's image. The on-list set clustered at 96–150px (Depop 96, Allbirds 97, Grailed 99, Airbnb 149). I then went looking for consumer catalogues where that number should be near zero because the artwork already contains the title — film and music. MUBI measured `metaH: 35` with the director/country/year line composited *inside* the still; Letterboxd measured a poster grid with no text at all. Bandcamp and Allbirds came from the same sweep. Every claim about them below is from the probe or from a screenshot I opened, not from memory.

**Etsy is missing.** `etsy.com` returned a DataDome challenge page under every user-agent I tried; there is no measured Etsy data in this file and I have not substituted recollection for it.

## Measured specifics

### Type scales (leaf-node census — count = number of visible text elements at that spec)

| Product | Dominant body spec | Count | Secondary | Display / h1 |
|---|---|---|---|---|
| Airbnb | 15px/19px w400 | 124 | 14px/18 w500 (27), 11px/15 w500 (23) | 22px/26 w500, ls −0.44px |
| Booking.com | **12px/18px w400** | **312** | 13px/20 w400 (123), 16px/24 w500 (44) | 20px/28 w700 (Blue Sans) |
| Spotify | 16px/normal w400 | 39 | 14px/normal w400 (35), 12px (12) | 48px w800 (`SpotifyMixUITitle`) |
| Pinterest | 16px/19.2 w500 | 34 | 16px/22.4 w400 (9), 12px/18 (7) | 36px/39.6 w700, ls −0.5px |
| Duolingo | 15px/20 w700 | 42 | 17px/24 w500 | 64px w700 `feather`, ls −1.28px |
| Discord | 16px/24 w400 | 26 | 20px/26 w400, ls 0.25px | 56px/**48px** w700 uppercase, ls −0.56px |
| Instagram | 12px/16 w400 | 31 | 14px/18 w600 (27) | 24px/30 w700 |
| Vinted | 12px/16 **w375** | 389 | 14px/18 w375 (109) | 22px/28 **w580** |
| Grailed | 14px/25 w400 | 375 | 12px/15.6 w700 ls −0.24px (73), 13px/23.4 w700 ls −0.52px (61) | — (no h1) |
| MUBI | 12px/normal **w100** | 36 | 14px/normal w300 (14), 14px/14 w500 (15) | 32px/33.6 w500 |
| Letterboxd | 15px/22.5 w700 | 11 | 13px/17 w700 (6), 11px/15.2 (2) | 24px/24 w400 |
| Allbirds | 12px/16 w500 | 39 | 14px/20 w500 ls 0.7px uppercase (35) | 24px/32 w400 |
| Headspace | 12px/13.8 w500 | 43 | 20px/30 w400 (25), 18px/21.6 w700 ls −0.54px | 52px/57.2 w700, ls −1.56px |

### Neutral ramps and grounds

| Product | Page ground | Card / elevated | Primary text | Secondary text | Tertiary |
|---|---|---|---|---|---|
| Airbnb | `#FFFFFF` | none (transparent cards) | `#222222` | `#6C6C6C` | `#C1C1C1` (separator dots only) |
| Booking.com | `#FFFFFF` | `#FFFFFF` + 1px `#E7E7E7` | `#1A1A1A` | `#595959` | link `#006CE4` |
| Spotify | `#121212` | `#1F1F1F` → `#292929` → `#333333` | `#FFFFFF` | `#B3B3B3` | `rgba(255,255,255,0.7)` |
| Letterboxd | `#14181C` | `#12161A` | `#FFFFFF` | `#99AABB` | `#667788`, border `#2C3440` |
| Vinted | `#EDF2F2` | `#FFFFFF` | `#15191A` | `#5A6566` | skeleton `#E1E6E6` |
| Allbirds | `#ECE9E2` | `#FFFFFF` | `#000000` | `#575757` | badge ground `#E0DACF` |
| Headspace | `#F9F4F2` | `#FFFFFF` | `#2D2C2B` | `#44423F` / `#4B4C4D` | — |
| Bandcamp | `#ECF3F4` | `#333333` / `#222222` | `#222222` | `rgba(34,34,34,0.72)` | — |
| Instagram | `#FFFFFF` | `#EFEFEF` (buttons) | `#000000` | `#737373` | skeleton `#F3F5F7`, `#F0F2F5` |
| Grailed | `#FFFFFF` | none | `#000000` | `#737373` | struck price `#979797` |

Note how few of these are pure `#FFFFFF`. Airbnb, Booking, Grailed and Instagram are; Vinted, Allbirds, Headspace and Bandcamp all sit the page on a tinted ground so that the white card is the figure and the page is the field. That single decision does more for "warm" than any accent colour.

### Accent colours (measured, not brand-guideline)

`Airbnb #DA1247` · `Booking #003B95` navy / `#006CE4` link / `#D4111E` scarcity-red / `#008234` green / `#FFB700` yellow · `Spotify #1ED760` · `Pinterest #E60023` · `Duolingo #58CC02` green / `#1CB0F6` blue · `Discord #5865F2` blurple / `#35ED7E` green · `Instagram #4A5DF9` / `#3143E3` · `Vinted #007782` teal · `Depop #E20020` · `Grailed #BE2827` sale-red · `MUBI #001489` / `#E85D3B` · `Strava #FC5200` · `DoorDash #EB1700` · `Headspace #0061EF` / `#FFCE00`

### Grid geometry

| Product | Viewport | Cols | Card w | Gutter x / y | Image w×h | Ratio | Meta block h |
|---|---|---|---|---|---|---|---|
| Airbnb | 1440 | 4 | 307 | **24 / 40** | 307×230 | 1.33 (4:3) | 149 |
| Airbnb (A/B variant) | 1440 | 4 | 318 | 24 / 40 | 318×318 | 1.00 | — |
| Airbnb | 390 | 1 | 342 | — / 41 | 342×237 | 1.44 | 127 |
| Grailed | 1440 | 4 | 220 | **8 / 8** | 220×264 | 0.833 (5:6) | 99 |
| Allbirds | 1440 | 4 | 312.5 | **10 / 11** | 313×313 | 1.00 | 97 |
| Depop | 1440 | 6 | 195 | — | 195×260 | 0.75 (3:4) | ~96 |
| Vinted | 1440 | 6 | 219 | — | 219×329 | 0.667 (2:3) | ~98 |
| Pinterest | 1440 | 5 (masonry) | 253 | ~16 / 13 | variable | variable | **0** |
| MUBI | 1440 | 3 | 372 | **4 / 45** | still, text inside | 1.83 | **35** |
| Bandcamp | 1440 | 6 | 229 | 17.6 / 0 | 229×172 | 1.33 | 0 |
| Booking.com | 1440 | 1 (list) | 815 | — | 240×240 | 1.00 | — |
| DoorDash store | 390 | 1 | 390 | — | 390×250 | 1.56 | 24 |

### Radii (census — count = number of visible elements using that value)

- **Airbnb**: `50%` ×472 (avatars, icon buttons), `4px` ×138, `20px` ×94 (card images), `40px` ×25 (search pill), `6px` ×23 (badges), `24px` (filter pills), `32px` (modal)
- **Grailed**: `2px` ×358. That is the entire system.
- **Letterboxd**: `clamp(2px, 2.66667%, 8px) / clamp(2px, 1.77778%, 8px)` ×288
- **Vinted**: `6px` ×272 (cards + skeletons), `24px` ×87, `3996px` (filter pills)
- **Pinterest**: `16px` ×100 — including 48px-tall buttons
- **Spotify**: `9999px` ×66, `4px` ×18 (track rows), `6px`/`8px` (art), `50%` ×6
- **Duolingo**: `12px` ×2. Nothing else.
- **Allbirds**: `3.35544e+07px` ×40 (full pill), `16px` ×38, `16px 16px 0 0` ×34
- **Booking.com**: `4px` ×184, `8px` ×54, `5.81818px 5.81818px 5.81818px 0px` ×21 — the asymmetric score chip
- **Strava**: `4px` ×7. **Headspace**: `24px` ×17, `32px` ×18, `16px` ×21.

### Motion (computed `transition-*`, count = elements)

| Product | Property | Duration | Curve | Count |
|---|---|---|---|---|
| Airbnb | `background` | 0.2s | `cubic-bezier(.455,.03,.515,.955)` | **399** |
| Airbnb | `transform` | 0.25s | `cubic-bezier(.2,0,0,1)` | 76 |
| Airbnb (card hover) | box-shadow / transform / border-color / background | 0.2s / 0.1s / 0.3s / 0.3s | all `cubic-bezier(.2,0,0,1)` | 6 |
| Spotify | `color, transform` | 0.15s | `cubic-bezier(.3,0,0,1)` | 39 |
| Spotify | `background-color, transform` | 0.15s | `cubic-bezier(.3,0,0,1)` | 26 |
| Allbirds | `opacity` | 0.15s | `cubic-bezier(.4,0,.2,1)` | 68 |
| Grailed | `background-color, border-color, color` | 0.25s | `ease` | 30 |

Nothing measured here exceeds 300ms on a hover or state change. Every product uses **one** curve for its ordinary interactions.

### Shadows

- Airbnb card: `rgba(0,0,0,0.08) 0 1px 2px, rgba(0,0,0,0.05) …` — and it is on *hover only*; at rest the card has `box-shadow: none`
- Airbnb filter modal: `rgba(0,0,0,0.28) 0 8px 28px`, scrim `rgba(0,0,0,0.25)`, **no `backdrop-filter`**
- Spotify: `rgba(0,0,0,0.5) 0 8px 24px` (menus), `rgba(0,0,0,0.5) 0 4px 60px` (now-playing art)
- Grailed, MUBI, Letterboxd, Allbirds card grids: no shadows at all on any element ≥60×40px

### Component sizes

- Airbnb filter pill: h34, pad `8px 12px`, r24, 1px `#DDDDDD`, 12px/16 w400
- Airbnb search segments: h48, `r 40px 4px 4px 40px` → `4px` → `4px 40px 40px 4px` (three buttons joined into one pill)
- Airbnb badge: h20, r6, 11px/15 w500, ground `rgba(230,246,233,0.75)` (green) / `rgba(242,242,242,0.75)` (neutral)
- Airbnb carousel arrow: 32×32, r50%, bg `color(srgb 1 1 1 / 0.9)`, 1px `color(srgb 0 0 0 / 0.08)`
- Airbnb filter modal: **568 × 920**, r32
- Spotify track row: **h56**, `grid-template-columns: [index] 16px [first] 730.391px [last] 182.609px`, gap 16, pad `0 16px`, r4
- Spotify search input: h48, r500px, bg `#1F1F1F`, pad `12px 96px 12px 48px`
- Vinted filter pill: h36, pad `8px 12px`, r3996px, 1px `#B6BEBF`, 13px/16.25
- Depop search: h40, r30px, 2px `#262626`, bg `#F3F3F3`
- Duolingo button: **h50**, r12, pad `0 16px`, 15px w700 uppercase ls 0.8px, `border-bottom-width: 4px`
- Discord button: **h65**, pad `19.5px 24px`, r12, 20px/26 ls 0.25px
- Headspace button: h48, r24, pad `0 24px`, 18px/21.6 w700 ls −0.54px
- Booking score chip: 32×32, bg `#003B95`, `border-radius: 5.81818px 5.81818px 5.81818px 0`
- Instagram button: h32, bg `#EFEFEF`, r8, 14px/18 w600

## The decisions that make it work

### 1. The best cards are not cards

Airbnb's listing card is 307×379 and its computed style is `background: rgba(0,0,0,0); border: 0px none; box-shadow: none; padding: 0`. The only radius is 20px, and it is applied to the image. Grailed's card is `padding: 0 0 8px` and nothing else. MUBI, Pinterest, Bandcamp and Letterboxd are the same. The photograph *is* the container.

**Why it works:** in a 4-column grid you are rendering 24 rectangles above the fold. A card background plus a border plus a shadow adds three visual edges per item — 72 edges competing with 24 photographs. Removing the container removes the competition and lets the aspect-ratio rhythm do the grouping.

**The generic alternative:** `bg-white rounded-lg border border-gray-200 shadow-sm p-4` on every item. That is the AI default and it is why AI grids read as "card soup" — every item is announced twice, once by its photo and once by its box.

**When it does NOT apply:** when the card's *background* carries meaning — a status colour, a selection state, a drag target. Allbirds keeps a white card because its ground is `#ECE9E2`; there the card is doing figure/ground work, not decoration. And on a dark ground with dark photography (Letterboxd), a 1px `#2C3440` hairline is doing real separation work.

### 2. One type size does almost the whole card; colour does the hierarchy

Airbnb's search grid contains **124 leaf elements at 15px/19px w400**. The listing title, the subtitle, the bed count, the dates, the price and the rating are all 15px. Hierarchy comes from three things and none of them is size:

- weight: `500` for the title and the price you pay, `400` for everything else
- colour: `#222222` primary, `#6C6C6C` secondary, `#C1C1C1` for the `·` separators — a third grey that exists *only* for punctuation
- position: the rating sits at `x:243, y:242` — right-aligned on the title's baseline (`y:239`), so title and rating read as one row

**The generic alternative:** `text-lg font-bold` title, `text-sm text-gray-500` subtitle, `text-xs` meta, `text-xl font-bold` price. Four sizes, four leadings, and a card whose vertical rhythm is different in every column.

**When it does NOT apply:** dense information cards where the user compares a *numeric* field across items (flight prices, spec sheets). Booking scales its price to 20px/28 w500 against 12px body precisely because the price is the comparison axis. That is legitimate; Booking's problem is elsewhere.

### 3. The metadata block must be a fixed number of lines, and you must decide which line truncates

Allbirds ships exactly three lines in a 97px block: `MEN'S TREE RUNNER NZ` (14px/20 w500, uppercase, ls 0.7px, truncated), `Mushroom` (14px/20 w400), `$100` (12px/16 w500). Every card in the grid is 410px tall. Grailed ships four rows in 99px, each a strict left/right pair: `timestamp | (aged)`, `BRAND | SIZE`, `title`, `price | ♡`. Airbnb ships five rows in 149px.

**Why it works:** a fixed metadata height means row baselines align across the grid, which means the eye can scan *down a column* for one field. Ragged metadata heights force the eye to re-find every field.

**The generic alternative:** letting the title wrap to 1–3 lines. One long title and the whole row shifts; scanning becomes impossible; the grid gets the characteristic "AI-generated" wobble.

**When it does NOT apply:** masonry (Pinterest) where variable *image* height is the point — but note Pinterest's answer is to carry **zero** metadata in search results. Variable image + variable metadata is the one combination nobody good ships.

### 4. Gutter size is a function of card chrome, not of a spacing scale

Measured: MUBI 4px · Grailed 8px · Allbirds 10px · Pinterest ~16px · Bandcamp 17.6px · Airbnb 24px.

The rule that falls out: **the less chrome a card has, the tighter the gutter can be** — and should be. Grailed's 8px gutter works because a 220×264 photograph with no border needs only enough space to not appear collaged. Airbnb needs 24px because its images have a 20px radius, and a radius eats the corner that would otherwise define the gap.

**The generic alternative:** `gap-6` (24px) everywhere because it is on the spacing scale. On a chrome-less contact-sheet grid, 24px is a canyon — it destroys the sense of abundance that is the whole point of a marketplace.

**When it does NOT apply:** touch grids. At 390px Airbnb goes to one column with 24px page margins; a 4px gutter on mobile puts two tap targets 4px apart.

### 5. Price typography: the number you pay is the heaviest thing on the card, and the strike-through is a demotion, not an alarm

Airbnb, measured on one card: `$1,390` at 15px **w400 `#6C6C6C`** (struck), then `$1,251` at 15px **w500 `#222222`**, then `for 5 nights` at 15px w400 `#6C6C6C`. The old price is demoted by *weight and grey*, at the same size. Grailed does the same with `$895` in `#979797` next to `$805` in `#BE2827`. Vinted goes further: the item price is 12px grey `#5A6566` and the **buyer-protection-inclusive** price — the number you actually pay — is 14px in the teal accent `#007782`.

Booking inverts it: `$390` struck in **12px/18 w700 `#D4111E`** — bold red, the most alarming treatment on the card — next to `$234` in 20px w500 near-black. The strike-through is styled as a *warning* to manufacture relief.

**Also measured:** nobody superscripts cents. Bandcamp explicitly declares `font-variant-numeric: proportional-nums` on body text; nothing in this set uses tabular figures in a *card grid*, because card prices are read one at a time, not compared in a column. (Tabular figures belong in the checkout summary and the fintech table, not here.)

**When it does NOT apply:** if you show a per-night rate and a total, say which is which in the same line — Airbnb's `$1,251 for 5 nights` is one sentence, not two fields.

### 6. Two schools of rating display, and they are not interchangeable

- **Airbnb**: `★ 4.98 (56)` — 15px/19 w400 `#222222`, one star glyph 12×12, right-aligned on the title baseline. Same size as everything else. It is a *tiebreaker*, not a headline.
- **Booking.com**: a 32×32 navy `#003B95` chip showing `8.6` in 16px/24 w500 white, with `Excellent` in 16px/24 w500 beside it and `3,656 reviews` in 12px `#595959` below — plus a second `Location 9.7` line in 14px w700 blue.

Airbnb's version costs 60×19px. Booking's costs roughly 120×55px and three type specs. Use the chip only when the score genuinely differentiates (a 0–10 scale where real listings span 6.0–9.5). On a 0–5 scale where 92% of listings sit between 4.6 and 5.0, the chip is a lie about how much signal is present — which is why Airbnb prints two decimals in body text and moves on.

**The generic alternative:** five star glyphs with partial fills. That is 5× the glyph budget for less precision than `4.98`.

### 7. Airbnb's filter sheet: a modal that never makes you guess what happens next

Measured: **568 × 920**, `border-radius: 32px`, `box-shadow: rgba(0,0,0,0.28) 0 8px 28px`, scrim `rgba(0,0,0,0.25)` with **no backdrop blur**. Header is a 3-column bar — 32×32 back affordance left, `Filters` 16px/20 w600 dead-centre, 16×16 close right. Inside, in order:

1. **Recommended for you** — four 1:1 tiles with an emoji-scale illustration, label below. These are the four filters that actually change results for *this* query.
2. **Type of place** — a 4-up segmented control in a single rounded container; the selected segment gets a ring, not a fill.
3. **Price range** — a **histogram of the actual result distribution** with two draggable handles over it, then two `Minimum` / `Maximum` numeric fields in pill inputs. The subhead reads `Trip price, includes all fees`.
4. **Rooms and beds** — `−` / `Any` / `+` steppers, 32px circular controls.
5. Sticky footer: `Clear all` as a plain underlined text button, and a filled black CTA reading **`Show 1,000+ places`** — the live result count, updating as you change filters.

Three things to steal, in order of value: **(a) the live count in the CTA** — the user never applies a filter and discovers zero results; **(b) the price histogram** — it converts an abstract slider into "am I above or below the market?"; **(c) `Clear all` as low-affordance text**, so destructive reset never competes with the primary action.

**The generic alternative:** a right-hand drawer of checkbox lists with an `Apply` button and no count. The user applies, gets 0 results, backs out, guesses again.

**When it does NOT apply:** catalogues where filters are cheap to preview inline. Depop and Vinted use a horizontal row of dropdown pills (`Category ▾ Brand ▾ Price ▾ Size ▾ Color ▾ Condition ▾`) plus a right-aligned `Sort`, with **applied filters on a second row as removable chips** (`coat ×`). That is better than a sheet when there are ≤7 facets and results refresh instantly. A full sheet is for ≥10 facets or an expensive re-query.

**The third pattern**, for reference: Grailed and Booking use a left rail of collapsed accordions with **result counts baked into each option** (`Menswear 1m+`, `Apartments 3688`, `Hostels 103`). Counts-before-click is the same idea as the live CTA count, applied per-option.

### 8. Skeletons should be the finished layout in one flat colour, not shimmer bars

Vinted, measured mid-load with images throttled: **56 blocks of `#E1E6E6` at `border-radius: 6px`** on a `#EDF2F2` ground — the identical radius and identical box the image will occupy. Pinterest is better still: it renders each pin as a solid pastel block sized to the pin's *known* aspect ratio, drawn from a measured palette of `#92A4FF #FBDFFF #FFD7D7 #FFE0CC #C7F0DA #83DDAD #DBE1FF`. Instagram uses `#F3F5F7` / `#F0F2F5`. Depop uses `#EAEAEA`. DoorDash uses `#C4C4C4`.

**Why it works:** the skeleton's job is to make the final paint a *fill*, not a *reflow*. If your skeleton has the right box and the right radius, nothing moves when the image lands. Pinterest's per-pin colour goes further — the pastel is close enough to the image's tone that the swap is nearly invisible.

**The generic alternative:** three animated grey pills of arbitrary width in a bordered card, none of which match the real layout. The user watches the page rearrange itself. This is the single most reliable tell of a vibe-coded grid.

**When it does NOT apply:** if you can't know the aspect ratio before the response arrives, don't guess — reserve a square. And if the request typically resolves under ~200ms, ship nothing rather than a flash of skeleton.

### 9. Expressive consumer design stays loud in exactly two channels and boring everywhere else

Duolingo and Discord are the loudest products measured here. What they *don't* vary is the tell.

**Duolingo**: two typefaces (`duolingo-sans` for UI, `feather` for display), **one border-radius in the entire measured surface: 12px**, buttons at a fixed h50, and a 4px `border-bottom` doing the "3D" chunk — not a `box-shadow`, not a gradient, not a transform. Colour is `#58CC02` and `#1CB0F6` and grey. The loudness lives in *type size* (64px `feather`, ls −1.28px) and *saturation*. Layout, spacing and radius are conservative.

**Discord**: `ABC Ginto Nord` for display, `ggsans` for everything else. The h1 is 56px with a **48px line-height** — set tighter than the type size, which is what makes a stack of uppercase display lines lock together like a poster. Radii are 12/16px, buttons are h65. One blurple, one green.

**Where the line is.** Childish is: more than two type personalities; a different radius per component; illustration used as *decoration* rather than as the subject; motion that bounces on hover; more than one saturated accent competing. Confident-loud is: a hard-working display face, one accent, a strict geometric system underneath, and restraint in the body copy. Duolingo's body text is a calm 17px/24 `#3C3C3C`; the shouting is confined to headlines and buttons.

**The other pole — warm and quiet:** Airbnb, Headspace, Allbirds and Vinted all put the page on a tinted ground (`#F9F4F2`, `#ECE9E2`, `#EDF2F2`) rather than `#FFFFFF`, use negative letter-spacing on display type (Headspace −1.56px at 52px, Airbnb −0.44px at 22px), and hold the accent to a single hue. Both poles work; the failure is the middle — a product that is neither committed to loudness nor to calm and so reads as a template.

**When Duolingo's approach does NOT apply:** anything with a serious consequence in-flow. Nobody wants a bouncy 3D button on "Transfer $4,200" or "Cancel reservation". Headspace is the proof — it is a consumer wellness brand, it is warm, and its buttons are flat pills with a 24px radius, because the product is about lowering arousal, not raising it.

### 10. Hover changes background; it does not move things

Airbnb applies `transition: background 0.2s cubic-bezier(.455,.03,.515,.955)` to **399 elements** on the search page. Spotify applies `0.15s cubic-bezier(.3,0,0,1)` to `color`/`background-color`/`transform` across its whole surface. The card-level hover on Airbnb does move — but it is a `transform` at **0.1s** paired with a `box-shadow` at 0.2s, i.e. a lift so short it reads as a press-ready state rather than an animation.

**Why it works:** you sweep a cursor across 24 cards in two seconds. If each one scales, the grid boils.

**The generic alternative:** `hover:scale-105 transition-all duration-300`. Three hundred milliseconds of `all` on a grid is visible jelly, and `all` also animates properties you didn't intend (border-width, padding) whenever a class toggles.

**When it does NOT apply:** a hero card, a single featured tile, a pricing card — one element, no neighbours, a real lift is fine. And on touch there is no hover at all; make sure the *active* state exists and is instant.

### 11. Image aspect ratio is a product decision, and it should be one ratio

Measured: Airbnb 4:3 (and a 1:1 A/B variant) · Allbirds 1:1 · Grailed 5:6 · Depop 3:4 · Vinted 2:3 · Bandcamp 4:3 · DoorDash mobile 16:10 · Pinterest variable.

The ratio encodes what the item *is*. Vinted and Depop are garments photographed flat by amateurs — a tall crop shows the whole item. Allbirds is a single product on white with a studio budget — 1:1 centres it. Airbnb is a room — landscape shows the space. **Pick one and never mix ratios within a grid**; a grid with mixed 1:1 and 4:3 images and a fixed metadata height produces ragged baselines, which is the same failure as ragged metadata.

**When to go variable:** only with true masonry and zero metadata (Pinterest). Half-measures — variable heights inside a fixed card — produce whitespace pockets and letterboxing.

### 12. Booking.com: what the dark patterns actually cost

Measured on one search-results viewport for Lisbon:

- `We have 7 left at this price` / `We have 3 left at this price` / `We have 1 left at this price` / `We have 2 left at this price` / `We have 6 left at this price` — all at **12px/18px w700 in `#D4111E`**, five different counts simultaneously visible
- Struck prices at 12px/18 **w700 in `#D4111E`** (bold red) beside the real price
- `Limited-time Deal` and `Late Escape Deal` in white on coloured grounds; `New to Booking.com` on `#FFB700`
- Green `#008234` w700 badges for `Free cancellation`, `Breakfast included`, `No prepayment needed`
- `Ad` labels on the first two organic-looking results
- A scroll-triggered interstitial: `Sign in, save money` / `Sign in to **save 10% or more** with a free Booking.com membership`
- An always-on top banner: `Earn 6% in Travel Credits on stays with the Genius Rewards Visa®`
- Body text at **12px/18px on 312 leaf elements** — the smallest dominant body size in this entire study

**The UX cost, mechanically.** Every one of those is an interrupt competing for the same attention as the property name and the price. The card is 815×274 and carries roughly 20 distinct styled text elements. Because scarcity, discount and reassurance badges all fire on nearly every card, none of them carries information — a badge that appears on 90% of results is decoration with an anxiety tax. And the 12px body size is a direct consequence: once you commit to that many simultaneous claims, the only way to fit them is to shrink the type past comfortable reading.

**The ethical cost.** "We have 3 left at this price" is a claim about inventory. If it is not tied to real, verifiable remaining inventory at that exact rate, it is a false statement made to induce a purchase — which is why the EU CPC network and the UK CMA have both forced changes to exactly these patterns across travel booking. Even where it is technically true, presenting it in bold red at the same visual weight as a genuine warning trains users to discount all warnings, including the real ones.

**What to do instead, measured from products that resist it.** Bandcamp shows `$10 more than the min` in green — social proof that other buyers chose to *overpay*, which is the exact structural inverse of scarcity: it rewards generosity instead of punishing hesitation. Vinted shows the buyer-protection-inclusive price larger and in the accent colour, so the number you see first is the number you pay. Airbnb's filter sheet subhead is `Prices include all fees`, and its only urgency-adjacent badge is `Book early to save` at **11px/15 w500 in a muted `rgba(230,246,233,0.75)` green** — a suggestion, not an alarm, and visually quieter than the price it modifies.

The test: *would this string still be there if it were false?* If the answer is yes, it is decoration and you should delete it.

## States, edges and the unglamorous parts

**Loading.** Covered in §8. The rule: the skeleton is the final layout with `background-color` and the real `border-radius`, sized to a known aspect ratio. Vinted `#E1E6E6` r6 on `#EDF2F2`; Instagram `#F3F5F7`; Pinterest per-pin pastel. Never shimmer bars in a bordered box that doesn't match the card.

**Zero data / first run.** Spotify's signed-out sidebar is the best pattern measured: two stacked cards on `#1F1F1F` at r8, each with a 16px w700 title (`Create your first playlist`), a 14px `#B3B3B3` subtitle (`It's easy, we'll help you`), and a white pill CTA — **not** a centred illustration with "Nothing here yet". Two adjacent empty states, each with a distinct action, because a first-run user has more than one possible next step.

**Zero results.** The Airbnb filter sheet prevents it structurally: the CTA reads `Show 1,000+ places` and updates live, so you cannot filter your way into an empty grid without seeing the number fall first. If you can't afford a live count, the next best thing is per-option counts in the filter list (Grailed: `Menswear 1m+`; Booking: `Hostels 103`) so a zero-result option is visibly zero before it is clicked.

**Too much data.** Depop's h1 is `"vintage jacket" (1.67M results)` at 24px/28.8 w700; Grailed prints `10,158,421 listings`. Both show the real number rather than "1M+". Depop then offers `Save your search — Get a heads-up when new items match your search` in a banner with a `Save` button — converting an unmanageable result set into a subscription instead of asking the user to paginate through it.

**Infinite scroll vs pagination.** Every browsing grid measured here uses infinite scroll or a "load more" (Airbnb, Pinterest, Depop, Vinted, Grailed, Letterboxd). Booking, which is a *comparison* task, keeps a paginated list. The rule that falls out: **infinite scroll when items are independent and the user is discovering; pagination when the user is comparing and will want to return to a specific position.** If you ship infinite scroll, you owe the user (a) a footer that is still reachable — Grailed and Depop keep the filter rail and a persistent bottom bar rather than an unreachable footer; (b) scroll-position restoration on back-navigation; (c) a URL that encodes the page, so a deep result is linkable.

**Image failure.** Because the card *is* the image, a broken image is a broken card. Every product measured reserves the box with a background colour, so a failure degrades to a coloured rectangle at the right size rather than a collapsed row. Pinterest's pastel and Vinted's `#E1E6E6` do double duty as skeleton and as error ground.

**Offline / permission-denied.** Not observable from the web surfaces. Do not invent behaviour here — the honest position is that these products handle it in native apps and the pattern is not evidenced in this study.

**Cookie and consent walls.** Depop, Duolingo, Vinted and Booking all showed consent or region interstitials during capture. Worth noting as a real UX cost: on Vinted the region modal blocked the entire result grid on first load, and on Booking a `Sign in, save money` interstitial fired on scroll. If your product must show one, size it to the content (Depop's is a bottom sheet, not a full-screen scrim) and never stack two.

## Mobile

This archetype is mobile-first in the literal sense: the desktop grid is the mobile card list widened, not the other way round.

**Airbnb at 390px, measured against its own 1440px:**
- 4 columns → **1 column**; card width 342 (i.e. `390 − 24 − 24`, so 24px page margins)
- vertical gap 40px → **41px** (unchanged)
- image aspect 1.33 → 1.44 (slightly wider, since it now has full width)
- **type is identical**: title 15px/19 w500 `#222222`, subtitle 15px/19 w400 `#6C6C6C`, price 15px/19, badge 11px/15 w500

That last line is the finding. Airbnb does not shrink type on mobile — 15px is already the smallest comfortable reading size, so the adaptation is entirely in column count and margin. **The generic mistake is scaling the whole type ramp down by a step on mobile**, which takes 14px secondary text to 12px and makes the card unreadable in sunlight.

**Touch targets, measured:** Duolingo buttons h50, Discord h65, Headspace h48, Spotify controls 48×48, Airbnb icon buttons 40×40 and carousel arrows 32×32. The 32px ones are hover-revealed desktop affordances; anything that is a primary action on touch is ≥44px in every product here.

**Filter UI on mobile:** the desktop sheet becomes a full-height bottom sheet with the same sticky footer (`Clear all` + live-count CTA). Horizontal pill rows (Depop, Vinted) survive to mobile as a scrollable row — which is why that pattern is the right choice for ≤7 facets.

**DoorDash store page at 390px:** hero image `390×250` (full-bleed, 16:10) with the store name at 20px/24 w700 ls −0.2px in white composited over the image. Full-bleed hero + text-on-image is the standard mobile treatment for a single-entity page; it does not translate to a grid, where text-on-image fails against uncontrolled photography — except at MUBI, where the artwork is curated and consistent.

## How this archetype fails

The bad imitation is recognisable in six specific ways, in rough order of how often it happens:

1. **Card soup.** Every item wrapped in `bg-white rounded-xl border shadow-md p-4` with a 24px gap. Three redundant edges per item; the photographs stop being the subject. Fix: delete the background, the border and the resting shadow, and put the radius on the image (§1).
2. **The four-size card.** `text-xl` title, `text-base` subtitle, `text-sm` meta, `text-2xl font-bold` price. Airbnb ships 124 elements at one size and does the hierarchy with weight, three greys and baseline alignment (§2).
3. **Ragged metadata.** Titles that wrap to 1–3 lines, so no two cards in a row have aligned baselines and the grid visibly wobbles. Fix: fixed line count, truncate, and decide *which* line is allowed to be long (§3).
4. **A skeleton that isn't the layout.** Grey shimmer pills of arbitrary width inside a bordered box, followed by a full reflow when content lands. Fix: flat blocks at the real radius and the real aspect ratio (§8).
5. **Hover jelly.** `hover:scale-105 duration-300` on every card. Sweep the cursor and the whole grid boils. Real products animate `background` at 150–250ms and reserve `transform` for ~100ms (§10).
6. **Borrowed urgency.** Countdown timers, "3 people are viewing", "Only 2 left" bolted onto a product with no inventory constraint. This is the one failure that is also an ethics failure, and it is trivially detectable: the badge appears on every card (§12).

A seventh, subtler one: **no ground.** Everything on `#FFFFFF` with grey cards. The products that read as "designed" put the page on a tinted ground and the cards in white (Vinted `#EDF2F2`, Allbirds `#ECE9E2`, Headspace `#F9F4F2`, Bandcamp `#ECF3F4`). It is a one-line change with a disproportionate effect.

## Copy and tone

**Voice conventions that fit.** Second person, present tense, no hedging. State the fact, not the feeling about the fact. Numbers exact, never rounded up into vagueness. In marketplaces specifically: the seller's words are the content and the platform's words are the frame — the platform should be quieter than the listing.

**Right (all observed in product):**
- `Over 1,000 homes in Lisbon` — Airbnb result count; specific, no exclamation
- `Descriptions are based on details hosts provide` — Airbnb; a disclaimer that admits a limit instead of hiding it
- `Prices include all fees` — Airbnb filter subhead; four words that pre-empt the single biggest travel-booking complaint
- `Trip price, includes all fees` — same idea on the price histogram
- `Show 1,000+ places` — the CTA is the outcome, not the verb
- `It's easy, we'll help you` — Spotify empty state; contraction, small promise
- `Get a heads-up when new items match your search` — Depop saved search; plain and mechanical
- `Shipping fees will be added at checkout` — Vinted; states the bad news up front
- `Due to increased demand, orders may take up to 30 days to ship.` — Allbirds banner; a real constraint, stated flatly
- `$10 more than the min` — Bandcamp; reports what a buyer chose, adds no adjective
- `free. fun. effective.` — Duolingo; lowercase, three words, one claim each

**Wrong:**
- `We have 3 left at this price` — a claim you probably can't substantiate, in bold red (Booking, measured)
- `Sign in, save money` — an interrupt disguised as advice (Booking, measured)
- `Discover amazing places` / `Find your perfect stay` — adjectives doing the work a photograph already does
- `Oops! Something went wrong 😢` — an error that tells the user nothing and performs an emotion on their behalf
- `No results found. Try adjusting your filters.` — the user knows. Tell them *which* filter is responsible and offer to remove it
- `Loading amazing content...` — nothing is loading amazingly
- `Only 2 left!` on a made-to-order product — the ethics test from §12: if it would still be there when false, delete it

**Numbers.** Print the real one. `1.67M results` (Depop), `10,158,421 listings` (Grailed), `4.98 (56)` (Airbnb), `3,656 reviews` (Booking) are all better than "thousands of". Two decimals on a 0–5 rating and none on a review count. Currency symbol attached, cents at full weight, never superscripted.

**Badges.** Cap the vocabulary at three or four and make each one mean something a user could verify. Airbnb ships `Guest favorite`, `Book early to save`, `Free cancellation` — and the last two are 11px in muted grounds, quieter than the price. Booking ships at least seven simultaneously and none of them survives the "would it still be there if false" test.

## Sources

All measured 2026-09 with Playwright at 1440×1000 and 390×844, `deviceScaleFactor: 2`, real Chrome/Safari user agents. Values are computed styles and bounding boxes read from the live DOM, not inspected by eye.

- `https://www.airbnb.com/s/Lisbon--Portugal/homes` (1440 + 390) — card anatomy, grid geometry, price/rating/badge specs, transition census, filter-pill row, filter modal dimensions and scrim. Also viewed: full-page screenshot with the Filters modal open (recommended-filter tiles, 4-up segmented control, price histogram with dual handles, steppers, sticky `Clear all` / `Show 1,000+ places` footer).
- `https://www.booking.com/searchresults.html?ss=Lisbon&…` — property-card anatomy (815×274), score chip, price colours, and a dedicated scarcity-string extraction that captured five simultaneous `We have N left at this price` instances with computed styles. Screenshots: results list with the scroll-triggered `Sign in, save money` interstitial, `Ad` labels, `New to Booking.com` badge, left filter rail with per-option counts.
- `https://open.spotify.com/album/4LH4d3cOWNNsVw41Gqt2kv` — dark ramp, dual-typeface split, track-row grid template, transition curve. Screenshot: album header with art-derived gradient, signed-out sidebar empty states.
- `https://www.pinterest.com/search/pins/?q=kitchen%20interior` — masonry column width and row gap, radius census, placeholder pastel palette, image-thumbnail filter chips. Screenshot viewed.
- `https://www.duolingo.com/` (1440 + 390) — two-typeface system, single radius, 4px bottom-border button. Mobile screenshot viewed.
- `https://discord.com/` — display/UI typeface split, 56px/48px uppercase h1, blurple, button dimensions.
- `https://www.instagram.com/nasa/` — system-font stack, grey ramp, skeleton colours, stat-line treatment, button sizes.
- `https://www.uber.com/us/en/` and `https://www.doordash.com/` (+ a store page at 390) — display/text face split, radius census, promo type, mobile hero ratio.
- `https://www.depop.com/search/?q=vintage%20jacket` — card ratio, price weights, horizontal filter-pill bar with `Sort`, saved-search banner. Screenshot viewed.
- `https://www.vinted.co.uk/catalog?search_text=coat` — variable-font weights 375/580, tinted ground, inclusive-price treatment, filter pills plus applied-chip row, and a throttled-image skeleton census (56 × `#E1E6E6` r6).
- `https://www.grailed.com/shop` — 4×220px grid at an 8px gutter, four-row left/right metadata block, 2px radius census, sale-price colours. Screenshot viewed.
- `https://letterboxd.com/films/popular/` — dark ramp, Graphik, and the percentage-based `clamp()` poster radius on 288 elements.
- `https://mubi.com/en/us/showing` — Riforma at weights 100–700, metadata composited into the still, 4px gutter, 3-up grid. Screenshot viewed.
- `https://bandcamp.com/?g=all&s=new&p=0` — grid geometry, `proportional-nums`, the `$N more than the min` string.
- `https://www.allbirds.com/collections/mens` (Shopify storefront) — 4×312.5px at a 10px gutter, 1:1 images, fixed 3-line metadata, warm ground, transition curve. Screenshot viewed.
- `https://www.strava.com/` and `https://www.headspace.com/` — brand type systems, radius and button dimensions, warm grounds.
- `https://www.etsy.com/search?q=ceramic+mug` and `/c/jewelry` — **blocked** by a DataDome challenge under every user-agent attempted. No Etsy measurements appear in this file.
