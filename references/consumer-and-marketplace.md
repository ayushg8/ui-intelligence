# Consumer products and marketplaces

**Evaluated:** 2026-09 · **Direction pass:** 2026-09 (numbers re-probed, see bottom)

**How to read the counts.** Every `count` in this file is a leaf-node census of one page load. On live marketplaces those counts move with the result set — a re-probe of Airbnb four weeks later returned 346 elements at 15px/19 w400 where the first pass returned 124, and Vinted returned 770 where the first returned 389. **The ratio is the finding, not the integer**: on Airbnb the dominant spec outnumbers the next one 346:90, and it did so at both censuses. Geometry (card widths, gutters, radii, aspect ratios) is stable and is quoted exactly.

## What this archetype is for

Products where the user is *browsing*, not *working*: they arrived with a fuzzy intent ("somewhere in Lisbon", "a vintage jacket", "something to watch"), they will scan 40–200 items before choosing one, and the item's photograph carries more decision weight than any field of text next to it. Airbnb, Spotify, Pinterest, Depop, Vinted, Grailed, MUBI, Letterboxd, DoorDash, Etsy, Shopify storefronts and Instagram all live here. Tools where the user already knows the target and is executing (Linear, Stripe Dashboard, admin panels) do not — density that reads as "rich" in a browsing grid reads as "cluttered" in a workspace, and vice versa. The load-bearing question for everything below: **how much non-image information does the user need to eliminate an item without opening it?** Get that number right and the layout follows.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Airbnb** (search + filter sheet) | The most-copied card grid in the world, and almost every copy misses why it works | The card has no background, no border and no shadow; the 20px radius lives on a `#DDDDDD` clipping frame that doubles as the image placeholder |
| **Booking.com** | Deliberate counter-example: the same problem solved with fear | Nothing. Study it to learn the exact strings and colours to refuse |
| **Spotify** (open.spotify.com) | Dark-mode browsing at scale, and a display typeface used with discipline | Two faces from one family: `SpotifyMixUITitle` for h1/h2 only, `SpotifyMixUI` for all 827 other elements |
| **Pinterest** | Masonry that doesn't jump, and the best placeholder system measured here | Per-pin pastel placeholder at the pin's known aspect ratio — the layout is final before a byte of image arrives |
| **Duolingo** | Loud and childlike-adjacent without being childish | Two border-radii in the whole marketing surface (`12px` ×7, `2px` ×3); the "3D" button is a 4px bottom *border*, not a shadow |
| **Discord** | Loud in the other direction — shouty display type over a calm grid | A separate display typeface (ABC Ginto Nord) set at 56px/48px — line-height *below* font-size |
| **Instagram** (web) | Proof that a billion-user consumer product can ship the system font stack | `-apple-system` on 674 elements; hierarchy is done with 14/12px and two greys, not with a brand face |
| **Depop / Vinted** | Peer-resale: many sellers, inconsistent photography, price is the decision | Vinted shows the *inclusive* price larger and in the accent colour, the item price smaller and grey |
| **Grailed** | Card grid with a 2px radius (×358, the entire system) and an 8px column gutter that still reads as calm | Four metadata rows, each a strict left/right pair — the eye tracks two columns, not eight fields; 40/40 cards at exactly 363.2px |
| **MUBI** *(off-list)* | Image-forward taken to its limit | Metadata is burned *into* the poster bottom-left as one uppercase line; there is no metadata block at all |
| **Letterboxd** *(off-list)* | The densest legible poster grid in consumer software | Poster radius `clamp(2px, 2.667%, 8px)` — a *percentage* radius, so corners stay proportional at every poster size |
| **Allbirds** (Shopify) | The best-behaved commercial storefront grid measured | White cards on a warm sand ground (#ECE9E2), 10px gutter, and a metadata block that is always exactly 3 lines |
| **Bandcamp** *(off-list)* | Marketplace that shows generosity instead of scarcity | `€3 more than the min` at 11px/20 w700 in `#008000` — social proof of *over*paying, the exact inverse of "only 3 left" |
| **Headspace / Strava** | Warm consumer brand systems with restraint | Headspace: 48px pill buttons, `letter-spacing: -0.54px` at 18px — tight, not airy |
| **Uber / DoorDash** | Utility-first consumer at national scale | Uber: a display face (`UberMove`) used on 13 elements and a text face (`UberMoveText`) on 264 |

**How the two off-list products were found.** I ran the same auto-grid probe over every product on the list and recorded `metaH` — the pixel height of the metadata block below each card's image. The on-list set clustered at 96–150px (Depop 96, Allbirds 97, Vinted 98, Grailed 99.2, Airbnb 107–149 — Airbnb's is a range, see §3). I then went looking for consumer catalogues where that number should be near zero because the artwork already contains the title — film and music. MUBI measured `metaH: 35` with the director/country/year line composited *inside* the still; Letterboxd measured a poster grid with no text at all. Bandcamp and Allbirds came from the same sweep. Every claim about them below is from the probe or from a screenshot I opened, not from memory.

**Etsy is missing.** `etsy.com` returned a DataDome challenge page under every user-agent I tried; there is no measured Etsy data in this file and I have not substituted recollection for it.

## Measured specifics

### Type scales (leaf-node census — count = number of visible text elements at that spec)

| Product | Dominant body spec | Count | Secondary | Display / h1 |
|---|---|---|---|---|
| Airbnb | 15px/19px w400 | 124 → **346** | 14px/18 w500 (90), 15px/normal w500 (56), 11px/15 w500 (29) | 22px/26 w500, ls −0.44px |
| Booking.com | **12px/18px w400** | **312 → 304** | 13px/20 w400 (125), 14px/20 w400 (117), 16px/24 w500 (55) | 20px/28 w700 (Blue Sans) |
| Spotify | 16px/normal w400 | 39 | 14px/normal w400 (35), 12px (12) | 48px w800 (`SpotifyMixUITitle`) |
| Pinterest | 16px/19.2 w500 | 34 | 16px/22.4 w400 (9), 12px/18 (7) | 36px/39.6 w700, ls −0.5px |
| Duolingo | 15px/20 w700 ls 0.8px | 42 → **42** | 15px/22 w700 (36), 13px/16 w700 (30), 17px/24 w500 (5) | 48px w700 `feather` (re-probe; the 64px in the first pass was a wider-viewport hero) |
| Discord | 16px/24 w400 | 26 | 20px/26 w400, ls 0.25px | 56px/**48px** w700 uppercase, ls −0.56px |
| Instagram | 12px/16 w400 | 31 | 14px/18 w600 (27) | 24px/30 w700 |
| Vinted | 12px/16 **w375** | 389 → **770** | 14px/18 w375 (181), 16px/22 w500 (35) | 22px/28 **w580** (5) |
| Grailed | 14px/25 w400 | 375 → **388** | 10px/25 w400 (357), 12px/15.6 w700 ls −0.24px (80), 13px/23.4 w700 ls −0.52px (66) | — (no h1) |
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
| Letterboxd | `#14181C` | `#12161A` | `#FFFFFF` | `#99AABB` (19) | `#667788` (15), `#556677` (7), border `#2C3440` |
| Vinted | `#EDF2F2` | **none in the catalog grid** — cards are transparent; `#FFFFFF` is reserved for nav, modals and sheets | `#15191A` | `#5A6566` | skeleton `#E1E6E6`, accent `#007782` |
| Allbirds | `#ECE9E2` | `#FFFFFF` | `#000000` | `#575757` | badge ground `#E0DACF` |
| Headspace | `#F9F4F2` | `#FFFFFF` | `#2D2C2B` | `#44423F` / `#4B4C4D` | — |
| Bandcamp | `#ECF3F4` | `#333333` / `#222222` | `#222222` | `rgba(34,34,34,0.72)` | — |
| Instagram | `#FFFFFF` | `#EFEFEF` (buttons) | `#000000` | `#737373` | skeleton `#F3F5F7`, `#F0F2F5` |
| Grailed | `#FFFFFF` | none | `#000000` | `#737373` | struck price `#979797` |

Note how few of these are pure `#FFFFFF`. Airbnb, Booking, Grailed and Instagram are; Vinted, Allbirds, Headspace and Bandcamp all sit the page on a tinted ground. Two different jobs hide behind that one move and they are worth separating: **Allbirds** uses the ground for figure/ground (`#ECE9E2` behind `#FFFFFF` cards at r16, so the card is an object), while **Vinted** uses the ground alone (`#EDF2F2` with *transparent* cards, so nothing is an object and only the photograph reads). Copying "tinted ground" without deciding which of the two you are doing is how you end up with a tinted page and white cards that have nothing to separate.

### Accent colours (measured, not brand-guideline)

`Airbnb #DA1247` · `Booking #003B95` navy / `#006CE4` link / `#D4111E` scarcity-red / `#008234` green / `#FFB700` yellow · `Spotify #1ED760` · `Pinterest #E60023` · `Duolingo #A5ED6E` (65 text elements — the dominant green as of this pass) / `#58CC02` (6) / `#1CB0F6` blue · `Discord #5865F2` blurple / `#35ED7E` green · `Instagram #4A5DF9` / `#3143E3` · `Vinted #007782` teal · `Depop #E20020` · `Grailed #BE2827` sale-red · `MUBI #001489` / `#E85D3B` · `Strava #FC5200` · `DoorDash #EB1700` · `Headspace #0061EF` / `#FFCE00`

### Grid geometry

| Product | Viewport | Cols | Card w | Gutter x / y | Image w×h | Ratio | Meta block h |
|---|---|---|---|---|---|---|---|
| Airbnb (default: **split view**, map takes the right ~1085px) | 1440 | **2** | 307.2 | **24 / 40** | 307×230 | 1.33 (4:3) | 107–149 (varies) |
| Airbnb (map hidden) | 1440 | 4 | 307 | 24 / 40 | 307×230 | 1.33 | 107–149 |
| Airbnb (A/B variant) | 1440 | 4 | 318 | 24 / 40 | 318×318 | 1.00 | — |
| Airbnb | 390 | 1 (in a sheet over the map) | 342 | — / 40 | 342×256.5 | **1.33** (same as desktop) | varies |
| Grailed | 1440 | 4 | 220 | **8 / 24** | 220×264 | 0.833 (5:6) | 99.2 |
| Allbirds | 1440 | 4 | 312.5 | **10 / 10** | 312.5×312.5 | 1.00 | 97 |
| Depop | 1440 | 6 | 195 | — | 195×260 | 0.75 (3:4) | ~96 |
| Vinted | 1440 | 6 | 219.3 | **16 / 8** | 219×329 | 0.667 (2:3) | 98 |
| Pinterest | 1440 | 5 (masonry) | 253 | ~16 / 13 | variable | variable | **0** |
| MUBI | 1440 | 3 | 372 | **4 / 45** | still, text inside | 1.83 | **35** |
| Bandcamp *(unconfirmed — the 2026-09 re-probe found an editorial hero in that slot and could not reproduce the 6-up row)* | 1440 | 6 | 229 | 17.6 / 0 | 229×172 | 1.33 | 0 |
| Booking.com | 1440 | 1 (list) | 815 | — | 240×240 | 1.00 | — |
| DoorDash store | 390 | 1 | 390 | — | 390×250 | 1.56 | 24 |

### Radii (census — count = number of visible elements using that value)

- **Airbnb** (re-probe in brackets): `50%` ×472 [626] (avatars, icon buttons), `4px` ×138 [58], `20px` ×94 [88] (the image clip frame), `40px` ×25 [32] (search pill), `6px` ×23 [29] (badges), `24px` ×[10] (filter pills), `28px` ×[20], `32px` (filter modal, only when open)
- **Grailed**: `2px` ×358. That is the entire system.
- **Letterboxd**: `clamp(2px, 2.66667%, 8px) / clamp(2px, 1.77778%, 8px)` ×288
- **Vinted**: `6px` ×272 [488] (image frames + skeletons — same value for both, which is the whole trick), `24px` ×87 [156], `3996px` ×[17] (filter pills)
- **Pinterest**: `16px` ×100 — including 48px-tall buttons
- **Spotify**: `9999px` ×66, `4px` ×18 (track rows), `6px`/`8px` (art), `50%` ×6
- **Duolingo**: `12px` ×7 and `2px` ×3. Two values in the whole marketing surface. (The first pass said "12px ×2, nothing else" — the `2px` was missed; the point survives, the absolute is wrong.)
- **Allbirds**: `3.35544e+07px` ×40 (full pill), `16px` ×38, `16px 16px 0 0` ×34
- **Booking.com**: `4px` ×184, `8px` ×54, `5.81818px 5.81818px 5.81818px 0px` ×21 — the asymmetric score chip
- **Strava**: `4px` ×7. **Headspace**: `24px` ×17, `32px` ×18, `16px` ×21.

### Motion (computed `transition-*`, count = elements)

| Product | Property | Duration | Curve | Count |
|---|---|---|---|---|
| Airbnb | `background` | 0.2s | `cubic-bezier(.455,.03,.515,.955)` | **399 → 526** |
| Airbnb | `transform` | 0.25s | `cubic-bezier(.2,0,0,1)` | 76 → 108 |
| Airbnb (card hover) | box-shadow / transform / border-color / background | 0.2s / 0.1s / 0.3s / 0.3s | all `cubic-bezier(.2,0,0,1)` | 6 |
| Spotify | `color, transform` | 0.15s | `cubic-bezier(.3,0,0,1)` | 39 |
| Spotify | `background-color, transform` | 0.15s | `cubic-bezier(.3,0,0,1)` | 26 |
| Allbirds | `opacity` | 0.15s | `cubic-bezier(.4,0,.2,1)` | 68 |
| Grailed | `background-color, border-color, color` | 0.25s | `ease` | 30 |

Nothing measured here **exceeds** 300ms on a hover or state change, and only one spec reaches it: Airbnb's `text-decoration-thickness, box-shadow, background-color` at 0.3s on 29 elements — link and card affordances, not grid items. Every product uses **one** curve for its ordinary interactions. If your grid has more than one easing function in it, one of them is decoration.

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

Airbnb's listing card measures 307.2 wide and its computed style is `background: rgba(0,0,0,0); border: 0px none; box-shadow: none; padding: 0`. Grailed's card is `padding: 0 0 8px`, `background: rgba(0,0,0,0)`, `box-shadow: none` — nothing else. Vinted's catalog card is transparent too. MUBI, Pinterest and Letterboxd are the same. The photograph *is* the container.

**Where the radius actually lives — the detail every copy gets wrong.** Airbnb's `<img>` has `border-radius: 0px`. So does its `<picture>`, and so does every wrapper up the chain except one: a `307×230` `<div>` with `border-radius: 20px`, `overflow: clip`, and **`background-color: rgb(221,221,221)`**. That single element does three jobs at once — it rounds the corners, it clips the carousel that slides behind it, and its `#DDDDDD` fill is the reserved box the photo paints into. This is why an Airbnb grid never reflows on image load and why a dead image degrades to a grey rounded rectangle at the right size instead of a collapsed row. If you take one thing from §1, take the frame, not the `rounded-xl`.

**Why it works:** in a 4-column grid you are rendering 24 rectangles above the fold. A card background plus a border plus a shadow adds three visual edges per item — 72 edges competing with 24 photographs. Removing the container removes the competition and lets the aspect-ratio rhythm do the grouping.

**The generic alternative:** `bg-white rounded-lg border border-gray-200 shadow-sm p-4` on every item. That is the AI default and it is why AI grids read as "card soup" — every item is announced twice, once by its photo and once by its box.

**When it does NOT apply — four honest cases:**
1. **The background carries state.** A status colour, a selected item, a drag target. A transparent card has nowhere to put that.
2. **The photograph does not reach the card edge.** Allbirds shoots product-on-white; a white-cutout shoe on a `#ECE9E2` page would float with no boundary, so Allbirds keeps a `#FFFFFF` card at r16. The rule is *the image must be able to define its own edge* — amateur photography against a plain wall (Vinted, Depop) can; studio cutouts cannot.
3. **Dark ground, dark photography.** Letterboxd's 1px `#2C3440` hairline is separation, not decoration.
4. **Fewer than about six items on screen.** The container tax in §1 is a *per-item* tax: 24 items × 3 edges is 72 competing edges, but 4 items × 3 is 12 and nobody notices. A three-card "featured" row can be carded.

### 2. One type size does almost the whole card; colour does the hierarchy

Airbnb's search grid is dominated by one spec: **346 leaf elements at 15px/19px w400**, against 90 at the next-most-common size. Inside a single card, re-measured element by element, the split is `15px/19 w400 #6C6C6C` ×13, `15px/19 w500 #222222` ×1 (title), `15px/19 w400 #C1C1C1` ×2 (the `·` separators), `15px/normal w500 #222222` ×1 (the price you pay), `11px/15 w500` ×2 (badges). Title, subtitle, bed count, dates, price and rating are all 15px. Hierarchy comes from three things and none of them is size:

- weight: `500` for the title and the price you pay, `400` for everything else
- colour: `#222222` primary, `#6C6C6C` secondary, `#C1C1C1` for the `·` separators — a third grey that exists *only* for punctuation
- position: the rating (`4.98 (56)`, 60×19px) sits at `x:243, y:242` inside a 307-wide card — right-aligned on the title's row (`y:239`), so title and rating read as one line, not two fields

**The generic alternative:** `text-lg font-bold` title, `text-sm text-gray-500` subtitle, `text-xs` meta, `text-xl font-bold` price. Four sizes, four leadings, and a card whose vertical rhythm is different in every column.

**When it does NOT apply:** dense information cards where the user compares a *numeric* field across items (flight prices, spec sheets). Booking scales its price to 20px/28 w500 against 12px body precisely because the price is the comparison axis. That is legitimate; Booking's problem is elsewhere.

### 3. The metadata block must be a fixed number of lines, and you must decide which line truncates

Allbirds ships exactly three lines in a 97px block: `MEN'S DASHER NZ` (14px/20 w500, uppercase, ls 0.7px, truncated), `Anthracite` (14px/20 w400 ls 0.7px), `$140` (12px/16 w500 ls 0.6px). Grailed ships four rows in 99.2px, each a strict left/right pair: `4 minutes ago | (7 days)` (10px/15 w400 `#737373`), `LOUIS VUITTON | M` (12px/15.6 w700 ls −0.24px), `title` (12px/18 w400), `$500 | ♡` (13px/23.4 w700 ls −0.52px).

**The measurement that settles it.** I measured every card's height in each grid at 1440 and took the spread:

| Product | Cards measured | Distinct heights | Spread |
|---|---|---|---|
| Allbirds | 34 | 1 (409.5) | **0px** |
| Grailed | 40 | 1 (363.2) | **0px** |
| Vinted | 96 | 1 (418.9) | **0px** |
| **Airbnb** | 28 | 2 (353.4 / 283.8) | **69.6px** |

**Airbnb fails its own grid** — and it is worth being honest that the most-copied card in consumer software is the one exception here. Airbnb's card grows or shrinks by up to 70px depending on whether a listing carries a dates row, a struck price, or badges; at 390px the spread is 104px across three heights. It gets away with it because the default desktop layout is only two columns wide (see §13) and because a ragged bottom edge on two columns is much less legible as a defect than on six. **Do not copy Airbnb here. Copy Allbirds, Grailed or Vinted, all of which hold their card height to the pixel across 34–96 items.**

**Why it works:** a fixed card height means row baselines align across the grid, so the eye can scan *down a column* for one field. Ragged heights force the eye to re-find every field.

**How to add a badge without breaking it.** Allbirds' `NEW` pill (12px/12 w500 ls 0.6px on `#E0DACF`) sits inside the *image* area, top-left. Badges that live in the image zone cost zero metadata height; badges that live in the text zone cost a line on the cards that have them and nothing on the cards that don't — which is exactly how Airbnb ends up with a 70px spread.

**The generic alternative:** letting the title wrap to 1–3 lines. One long title and the whole row shifts; scanning becomes impossible; the grid gets the characteristic "AI-generated" wobble.

**When it does NOT apply:** masonry (Pinterest) where variable *image* height is the point — Pinterest's answer is to carry **zero** metadata in search results. It also does not apply to a single-column mobile list, where there is no neighbour to align to and truncating a title costs you a real word for no scanning benefit; Airbnb's 390px cards run to three different heights and it does not read as a defect. Variable image + variable metadata inside a multi-column grid is the one combination nobody good ships.

### 4. Gutter size is a function of card chrome, not of a spacing scale

Measured, column gutters: MUBI 4px · Grailed 8px · Allbirds 10px · Pinterest ~16px · Vinted 16px · Bandcamp 17.6px · Airbnb 24px. Row gutters diverge and are worth stating separately: Allbirds 10px (square), Vinted 8px, Grailed 24px, Airbnb 40px, MUBI 45px — **the taller the image, the larger the row gap needs to be**, because a tall image plus a tight row gap makes columns read as continuous strips.

The rule that falls out: **the less chrome a card has, the tighter the gutter can be** — and should be. Grailed's 8px gutter works because a 220×264 photograph with no border needs only enough space to not appear collaged. Airbnb needs 24px because its images have a 20px radius, and a radius eats the corner that would otherwise define the gap.

**The generic alternative:** `gap-6` (24px) everywhere because it is on the spacing scale. On a six-column chrome-less grid, 24px eats 120px of horizontal space — roughly half a card — and the grid stops reading as a contact sheet and starts reading as a list of framed objects.

**When it does NOT apply — three cases:**
1. **Touch grids.** At 390px Airbnb goes to one column with 24px page margins (measured: `pageLeft 24`, `pageRight 24`). A 4px gutter on mobile puts two tap targets 4px apart.
2. **Uncontrolled photography with busy backgrounds.** Vinted and Depop survive 8–16px gutters only because almost every seller shoots a single garment against a plain wall or door. Run the same gutter over user photos with cluttered backgrounds and adjacent cards bleed into one another; the collage failure the gutter exists to prevent is a property of the *photos*, not of the layout.
3. **Two-column layouts.** Airbnb's 24px is not generosity, it is arithmetic: in the default split view the grid gets ~638px for two 307px cards, so the gutter is what is left over. Tight gutters buy you density, and density only pays when there is something to be dense with — at two or three columns there is not.

### 5. Price typography: the number you pay is the heaviest thing on the card, and the strike-through is a demotion, not an alarm

Airbnb, re-measured element by element on one card: `$1,390` at `x:4` in 15px/19 **w400 `#6C6C6C`** with `text-decoration: line-through`, then `$1,251` at `x:52` in 15px/normal **w500 `#222222`**, then `for 5 nights` at `x:98` in 15px/19 w400 `#6C6C6C`. Three specs, one size, one baseline, 172px wide in total. The old price is demoted by *weight and grey*, never by size. Grailed does the same with `$895` in `#979797` next to `$805` in `#BE2827`. Vinted goes further and I verified it on a live card: `£33.62` at 12px/16 w375 `#5A6566`, then `£36.00` at **14px/18 w375 in the teal accent `#007782`**, then `incl.` at 12px/16 w375 teal with a small shield glyph. The **larger, coloured, lower** number is the one you actually pay. Every other marketplace in this set does the opposite.

Booking inverts it: `$390` struck in **12px/18 w700 `#D4111E`** — bold red, the most alarming treatment on the card — next to `$234` in 20px w500 near-black. The strike-through is styled as a *warning* to manufacture relief.

**Also measured:** nobody superscripts cents. Bandcamp explicitly declares `font-variant-numeric: proportional-nums` on body text; nothing in this set uses tabular figures in a *card grid*, because card prices are read one at a time, not compared in a column. (Tabular figures belong in the checkout summary and the fintech table, not here.)

**When it does NOT apply:** when price is the *sort key* and the user is scanning a single column of numbers to find the cheapest — a flight list, a hotel comparison, a parts catalogue. There the price should break the size rule and take tabular figures, because you are asking for a column comparison rather than a card read. Booking is right to set its price at 20px/28 w500; Booking is wrong about almost everything else on the card. The tell for which case you are in: if the user can only compare by scrolling, one size is correct; if three prices are visible in one vertical glance, give the price its own size.

### 6. Two schools of rating display, and they are not interchangeable

- **Airbnb**: `★ 4.98 (56)` — 15px/19 w400 `#222222`, one star glyph 12×12, right-aligned on the title baseline. Same size as everything else. It is a *tiebreaker*, not a headline.
- **Booking.com**: a 32×32 navy `#003B95` chip showing `8.6` in 16px/24 w500 white, with `Excellent` in 16px/24 w500 beside it and `3,656 reviews` in 12px `#595959` below — plus a second `Location 9.7` line in 14px w700 blue.

Airbnb's version costs 60×19px. Booking's costs roughly 120×55px and three type specs.

**The measured reason.** I pulled the rating off all 28 Airbnb cards in one Lisbon result set: min **4.53**, median **4.98**, max **5.00** — 27 of 28 sit at or above 4.6, and **10 of 28 are exactly 5.0**. The whole usable range is 0.47 of a point. A 32px chip, a colour ramp and an adjective (`Excellent`) spent on 0.47 points of variance overstate how much signal is there. Airbnb prints two decimals in body text and moves on, because the second decimal is the only part still carrying information.

**The rule that falls out:** measure the actual spread of the score across one page of real results before choosing a treatment. Spread under ~1 point on a 0–5 scale → inline text at body size. Spread over ~2 points on a 0–10 scale → a chip is doing work.

**The generic alternative:** five star glyphs with partial fills. That is 5× the glyph budget to encode less precision than `4.98`, and the partial fill is illegible below about 16px.

**When it does NOT apply:** when the rating *is* the product — Letterboxd, Goodreads, Metacritic — the score is the reason the user came and can carry a chip, a histogram or its own column. And when a low score is a safety signal rather than a taste signal (a contractor, a clinic, a driver), the compressed distribution is precisely why you must surface the tail: a `4.1` in a field of `4.9`s should be loud, not quiet.

### 7. Airbnb's filter sheet: a modal that never makes you guess what happens next

Measured: **568 × 920**, `border-radius: 32px`, `box-shadow: rgba(0,0,0,0.28) 0 8px 28px`, scrim `rgba(0,0,0,0.25)` with **no backdrop blur**. Header is a 3-column bar — 32×32 back affordance left, `Filters` 16px/20 w600 dead-centre, 16×16 close right. Inside, in order:

1. **Recommended for you** — four 1:1 tiles with an emoji-scale illustration, label below. These are the four filters that actually change results for *this* query.
2. **Type of place** — a 4-up segmented control in a single rounded container; the selected segment gets a ring, not a fill.
3. **Price range** — a **histogram of the actual result distribution** with two draggable handles over it, then two `Minimum` / `Maximum` numeric fields in pill inputs. The subhead reads `Trip price, includes all fees`.
4. **Rooms and beds** — `−` / `Any` / `+` steppers, 32px circular controls.
5. Sticky footer: `Clear all` as a plain underlined text button, and a filled black CTA reading **`Show 1,000+ places`** — the live result count, updating as you change filters.

Three things to steal, in order of value: **(a) the live count in the CTA** — the user never applies a filter and discovers zero results; **(b) the price histogram** — it converts an abstract slider into "am I above or below the market?"; **(c) `Clear all` as low-affordance text**, so destructive reset never competes with the primary action.

**The generic alternative:** a right-hand drawer of checkbox lists with an `Apply` button and no count. The user applies, gets 0 results, backs out, guesses again.

**When it does NOT apply — and Airbnb itself is the evidence.** Airbnb does not ship the sheet *instead of* the pill row; it ships both. Above the results sits a `Filters` button followed by five quick-filter pills (`Washer`, `Wifi`, `Instant Book`, `Free parking`, `Air conditioning`) at h34, r24, 1px `#DDDDDD`, 12px/16 w400. The sheet answers the ten-facet case; the pill row answers the one-tap case. Shipping only the sheet makes every common filter cost two clicks and a modal.

Depop and Vinted run the pill row alone (`Category ▾ Brand ▾ Price ▾ Size ▾ Color ▾ Condition ▾` plus a right-aligned `Sort`), with **applied filters on a second row as removable chips** (`coat ×`). Right when there are ≤7 facets and results refresh instantly. A full sheet earns its modal at ≥10 facets or an expensive re-query.

**The third pattern:** Grailed and Booking use a left rail of collapsed accordions with **result counts baked into each option** (`Menswear 1m+`, `Apartments 3688`, `Hostels 103`). Counts-before-click is the live CTA count applied per-option.

**The fourth, cheapest pattern:** Allbirds puts the count in the filter control itself — `FILTER (34 products)` — beside a `MEN | WOMEN` segmented pill and a `FEATURED ▾` sort. One line, no modal, no rail. For a 34-item catalogue that is the entire filter design and it still never lets you filter blind.

**The real limit on the live count:** it is only honest if it is cheap. A count that needs a full re-query on every keystroke either lags behind the controls (so the number briefly lies) or costs real money at scale. If you cannot compute it in roughly 150ms, ship per-option counts computed once per page instead — a stale count on a checkbox is a far smaller lie than a stale count on the button the user is about to press.

### 8. Skeletons should be the finished layout in one flat colour, not shimmer bars

Vinted, measured mid-load with images throttled: **56 blocks of `#E1E6E6` at `border-radius: 6px`** on a `#EDF2F2` ground — the identical radius and identical box the image will occupy. Pinterest is better still: it renders each pin as a solid pastel block sized to the pin's *known* aspect ratio, drawn from a measured palette of `#92A4FF #FBDFFF #FFD7D7 #FFE0CC #C7F0DA #83DDAD #DBE1FF`. Instagram uses `#F3F5F7` / `#F0F2F5`. Depop uses `#EAEAEA`. DoorDash uses `#C4C4C4`.

**Why it works:** the skeleton's job is to make the final paint a *fill*, not a *reflow*. If your skeleton has the right box and the right radius, nothing moves when the image lands. Pinterest's per-pin colour goes further — the pastel is close enough to the image's tone that the swap is nearly invisible.

**The generic alternative:** three animated grey pills of arbitrary width in a bordered card, none of which match the real layout. The user watches the page rearrange itself. This is the single most reliable tell of a vibe-coded grid.

**When it does NOT apply:** if you can't know the aspect ratio before the response arrives, don't guess — reserve a square. And if the request typically resolves under ~200ms, ship nothing rather than a flash of skeleton.

### 9. Expressive consumer design stays loud in exactly two channels and boring everywhere else

Duolingo and Discord are the loudest products measured here. What they *don't* vary is the tell.

**Duolingo**: two typefaces used in a 135:7 ratio — `duolingo-sans` on 135 text elements, `feather` on 7. **Two border-radii in the whole measured surface: `12px` ×7 and `2px` ×3.** Buttons at a fixed h50 with a 4px `border-bottom` doing the "3D" chunk — not a `box-shadow`, not a gradient, not a transform. The loudness lives in *type size* (48px w700 display over 15px body) and *saturation* (`#A5ED6E` on 65 text elements, `#58CC02` on 6). Layout, spacing and radius are conservative.

**Discord**: `ABC Ginto Nord` for display, `ggsans` for everything else. The h1 is 56px with a **48px line-height** — set tighter than the type size, which is what makes a stack of uppercase display lines lock together like a poster. Radii are 12/16px, buttons are h65. One blurple, one green.

**Where the line is.** Childish is: more than two type personalities; a different radius per component; illustration used as *decoration* rather than as the subject; motion that bounces on hover; more than one saturated accent competing. Confident-loud is: a hard-working display face, one accent, a strict geometric system underneath, and restraint in the body copy. Duolingo's body text is a calm 17px/24 `#3C3C3C`; the shouting is confined to headlines and buttons.

**The other pole — warm and quiet:** Headspace, Allbirds and Vinted put the page on a tinted ground (`#F9F4F2`, `#ECE9E2`, `#EDF2F2`) rather than `#FFFFFF`, use negative letter-spacing on display type (Headspace −1.56px at 52px, Airbnb −0.44px at 22px), and hold the accent to a single hue. Airbnb is *not* in this group on ground — its body is `#FFFFFF`; its warmth comes from `#222222` instead of black and from a 4:3 photograph filling 61% of the card's height.

**Both poles work; the failure is the middle, and the middle has a signature you can test for:** three or more accent hues each used on fewer than ten elements, three or more radius values, and a display size less than 2× the body size. Duolingo's display is 3.2× its body; Discord's is 3.5×; Headspace's is 4.3×. A 24px heading over 16px body is not a voice, it is a default.

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

**When one ratio does NOT apply:** when the grid is genuinely heterogeneous by category and the ratio is *information*. A food-delivery home mixes 16:10 restaurant heroes with 1:1 dish tiles because they are different objects and the user needs to know which is which before reading. The test is whether a user could name the ratio's meaning out loud. "Landscape means a place, square means a thing" is a system; "some are square because that's what the CMS had" is not. And note the cost you take on: the moment ratios vary, fixed metadata height (§3) stops aligning anything, so you must give up one or the other.

### 12. Booking.com: what the dark patterns actually cost

Measured on one search-results viewport for Lisbon:

- `We have N left at this price` on **13 of 25 property cards (52%)** in one viewport-plus-scroll — re-verified 2026-09 — all at **12px/18px w700 in `rgb(212,17,30)` = `#D4111E`**, with N ranging 1, 1, 1, 2, 5, 6, 7 simultaneously visible
- Struck prices at 12px/18 **w700 in `#D4111E`** (bold red) beside the real price
- `Limited-time Deal` and `Late Escape Deal` in white on coloured grounds; `New to Booking.com` on `#FFB700`
- Green `#008234` w700 badges for `Free cancellation`, `Breakfast included`, `No prepayment needed`
- `Ad` labels on the first two organic-looking results
- A scroll-triggered interstitial: `Sign in, save money` / `Sign in to **save 10% or more** with a free Booking.com membership`
- An always-on top banner: `Earn 6% in Travel Credits on stays with the Genius Rewards Visa®`
- Body text at **12px/18px on 312 leaf elements** — the smallest dominant body size in this entire study

**The UX cost, mechanically.** Every one of those is an interrupt competing for the same attention as the property name and the price. The card measures exactly **815×274** and carries **22 distinct styled text elements** (counted, not estimated). And the 12px body size is a direct consequence: once you commit to that many simultaneous claims, the only way to fit them is to shrink the type past comfortable reading — 304 leaf elements at 12px/18 is the smallest dominant body size in this entire study.

**The badge-frequency test, run on both products.** A badge carries information in proportion to how often it is *absent*. Measured in one result set each:

| Badge | Fires on | Signal |
|---|---|---|
| Booking `We have N left at this price` | 13 / 25 (52%) | half the market is "scarce" — near zero |
| Airbnb `Guest favorite` | 18 / 28 (64%) | **also near zero** — Airbnb's own worst badge |
| Airbnb `Free cancellation` | 12 / 28 (43%) | weak, but it is a fact about the booking, not a mood |
| Airbnb `Book early to save` | **2 / 28 (7%)** | this one actually discriminates |

The honest reading is not "Booking bad, Airbnb good". Airbnb's most prominent badge fires on nearly two thirds of results and is decoration by the same test. The difference is that Airbnb's *urgency-adjacent* badge is the rare one, and Booking's is the common one — they inverted which badge got to be scarce.

**The ethical cost.** "We have 3 left at this price" is a claim about inventory. If it is not tied to real, verifiable remaining inventory at that exact rate, it is a false statement made to induce a purchase — which is why the EU CPC network and the UK CMA have both forced changes to exactly these patterns across travel booking. Even where it is technically true, presenting it in bold red at the same visual weight as a genuine warning trains users to discount all warnings, including the real ones.

**What to do instead, measured from products that resist it.** Bandcamp shows `€3 more than the min` at **11px/20 w700 in `rgb(0,128,0)`** on every sale in the feed — social proof that another buyer chose to *overpay*, the exact structural inverse of scarcity: it rewards generosity instead of punishing hesitation. Note that it passes the frequency test in the other direction — it appears on nearly every item and is still fine, because it reports a fact about a completed transaction rather than making a prediction about yours. Vinted shows the buyer-protection-inclusive price larger and in the accent colour, so the number you see first is the number you pay. Airbnb's filter sheet subhead is `Prices include all fees`, and its only urgency-adjacent badge is `Book early to save` at **11px/15 w500 in `rgb(3,128,38)` on a muted `rgba(230,246,233,0.75)` ground** — a suggestion, not an alarm, four pixels smaller than the price it sits beneath, and measured on 2 of 28 cards rather than 13 of 25.

**Two tests, and you need both.**
1. *Would this string still be there if it were false?* If yes, it is decoration with an anxiety tax — delete it.
2. *What fraction of results carry it?* Count. Above roughly 50% it has stopped discriminating no matter how true it is, and the only honest fixes are to raise the threshold until it is rare or to stop rendering it as an alert.

**When urgency IS legitimate.** Real, checkable constraints exist and hiding them is its own dishonesty: a flight seat that is genuinely the last in that fare bucket, a ticket release with a published cap, a session that expires at a stated time, a made-to-order lead time. The distinguishing marks are that the number is falsifiable, that it goes *away* when the constraint does, and that its visual weight matches its consequence — Allbirds' announcement bar and Airbnb's `Book early to save` are both quieter than the price they modify. Urgency that is styled louder than the number it is trying to influence has stopped being information.

### 13. Airbnb's default search is a split view, not a grid — and the grid's numbers only make sense once you know that

Measured at 1440: the results column starts at `x:48` and ends at `x:355.2`; the **map occupies the remaining ~1085px**, roughly 75% of the viewport width. The "4-column Airbnb grid" that everyone copies is what you get after hiding the map. The default is **two 307.2px cards side by side in a 638px column**, with the map as the persistent right-hand pane. At 390 the two swap: the map becomes the full-bleed background and the cards live in a draggable bottom sheet over it.

**Why this changes the numbers.** A 24px gutter on a 4-up grid is a canyon (§4); a 24px gutter between two cards in a 638px column is the leftover. A 70px card-height spread (§3) reads as a defect across six columns and as ordinary raggedness across two. A 15px type scale is generous at 307px of card width and would be cramped at 195px (Depop). **Airbnb's card is tuned for a two-column split view, and lifting its specs into a six-column catalogue grid imports numbers that were solving a different problem.**

**When a split view is right:** when the item has a *location* that is part of the decision and the user's real query is spatial ("near the water", "walking distance from the old town") — a filter cannot express that and a map can. Booking, Zillow and Google Maps' own listings all reach the same conclusion.

**When it does NOT apply:** when position is not a decision input. A garment, a record, a film has no map, and a split view spends 75% of the viewport on nothing. It also does not apply when the catalogue is large and undifferentiated — 200 pins in one neighbourhood is a cluster, not a comparison — or on any surface where the map's tile cost is the largest asset on the page and the user only wanted to browse.

## States, edges and the unglamorous parts

**Loading.** Covered in §8. The rule: the skeleton is the final layout with `background-color` and the real `border-radius`, sized to a known aspect ratio. Vinted `#E1E6E6` r6 on `#EDF2F2`; Instagram `#F3F5F7`; Pinterest per-pin pastel. Never shimmer bars in a bordered box that doesn't match the card.

**Zero data / first run.** Spotify's signed-out sidebar is the best pattern measured: two stacked cards on `#1F1F1F` at r8, each with a 16px w700 title (`Create your first playlist`), a 14px `#B3B3B3` subtitle (`It's easy, we'll help you`), and a white pill CTA — **not** a centred illustration with "Nothing here yet". Two adjacent empty states, each with a distinct action, because a first-run user has more than one possible next step.

**Zero results.** The Airbnb filter sheet prevents it structurally: the CTA reads `Show 1,000+ places` and updates live, so you cannot filter your way into an empty grid without seeing the number fall first. If you can't afford a live count, the next best thing is per-option counts in the filter list (Grailed: `Menswear 1m+`; Booking: `Hostels 103`) so a zero-result option is visibly zero before it is clicked.

**Too much data.** Depop's h1 is `"vintage jacket" (1.67M results)` at 24px/28.8 w700; Grailed prints `10,158,421 listings`. Both show the real number rather than "1M+". Depop then offers `Save your search — Get a heads-up when new items match your search` in a banner with a `Save` button — converting an unmanageable result set into a subscription instead of asking the user to paginate through it.

**Infinite scroll vs pagination.** Every browsing grid measured here uses infinite scroll or a "load more" (Airbnb, Pinterest, Depop, Vinted, Grailed, Letterboxd). Booking, which is a *comparison* task, keeps a paginated list. The rule that falls out: **infinite scroll when items are independent and the user is discovering; pagination when the user is comparing and will want to return to a specific position.** If you ship infinite scroll, you owe the user (a) a footer that is still reachable — Grailed and Depop keep the filter rail and a persistent bottom bar rather than an unreachable footer; (b) scroll-position restoration on back-navigation; (c) a URL that encodes the page, so a deep result is linkable.

**Image failure.** Because the card *is* the image, a broken image is a broken card. Every product measured reserves the box with a background colour, so a failure degrades to a coloured rectangle at the right size rather than a collapsed row. Named values, all verified: **Airbnb `#DDDDDD`** on the same `307×230` r20 clip frame that rounds the photo; Vinted **`#E1E6E6` at r6**, the identical radius the photo will take; Pinterest a per-pin pastel. The pattern to copy is that **the placeholder, the skeleton and the error ground are one element with one colour and one radius** — not three code paths. If your loading state and your error state use different boxes, one of them is wrong.

**Advertising and promotion disclosure.** Two treatments measured. Booking prints `Ad` on the first two organic-looking results — a 2-character label doing legally-required work at the smallest size on the card. Vinted prints `Bumped` in the metadata row of promoted listings, in the same grey as the size and condition, i.e. deliberately indistinguishable from ordinary metadata. Neither is good; Booking's is at least at the top of the card. If you take paid placement, the disclosure belongs adjacent to the thing that was paid for and at the weight of a label, not of a footnote.

**Offline / permission-denied.** Not observable from the web surfaces. Do not invent behaviour here — the honest position is that these products handle it in native apps and the pattern is not evidenced in this study.

**Cookie and consent walls — the worst thing measured in this study.** A cold load of `vinted.co.uk/catalog?search_text=coat` at 1440 puts **four** simultaneous interrupts over the results: a centred `Where do you live?` region modal with a full-page scrim, a bottom-anchored consent bar (`We may allow third-party partners… I Accept` / `Do Not Sell My Personal Information`), and **two stacked copies of Vinted's own `Shipping fees will be added at checkout` banner**, each with its own dismiss `×`. The search results are visible only as a dimmed background. Four dismissals stand between a user and the thing they searched for, and one of the four is a bug — the product is shipping its own banner twice.

This is the failure mode of consent UI generally: each interrupt is owned by a different team, each is individually defensible, and nobody owns the stack. The rules that follow: **one interrupt on screen at a time**, sequenced not stacked; size it to its content (Depop's is a bottom sheet, not a full-screen scrim); and put a render-time assertion in the app that fails loudly when two modal-role elements are visible at once, because no design review catches this — only a cold load in a fresh profile does.

## Mobile

**The first pass claimed the desktop grid is the mobile list widened. Screenshots at 390 say otherwise, at least for Airbnb, and the correction is the most useful thing in this section.**

**Airbnb at 390px is not a list — it is a map with a sheet over it.** Above the fold: a collapsed search pill, a horizontally scrolling filter-pill row, then the **map occupying roughly 60% of the viewport**, then a draggable bottom sheet with a grab handle that carries the results. The desktop's persistent right-hand map has become the *background*, and the card list is the overlay. So the honest statement of the archetype is: **the map and the grid trade places, they do not disappear.** A product that ships a 4-up grid on desktop and a 1-up list on mobile has not adapted; it has just reflowed.

**Airbnb at 390px, re-measured against its own 1440px:**
- 2 columns (default split view) → **1 column in a sheet**; card width **342** (i.e. `390 − 24 − 24`, so 24px page margins — verified `pageLeft 24 / pageRight 24`)
- vertical gap **40px** at both widths (unchanged)
- image **342×256.5, ratio 1.333** — the first pass said 1.44; **it is the same 4:3 as desktop.** The ratio does not change, only the width does
- **type is identical**: `15px/19 w400 #6C6C6C` appears 241 times at 390 and 243 times at 1440. Title 15px/19 w500 `#222222`, price 15px, badge 11px/15 w500 — every spec matches
- card heights are *less* uniform on mobile, not more: three distinct heights, 104px spread

That type line is the finding. Airbnb does not shrink type on mobile — 15px is already the smallest comfortable reading size, so the adaptation is entirely in column count, margin and surface. **The generic mistake is scaling the whole type ramp down a step on mobile**, which takes 14px secondary text to 12px and makes the card unreadable in sunlight.

**The collapsed search control.** At 1440 Airbnb's search is three joined segments in one h48 pill (`Homes in Lisbon | Any week | Add guests` + a `#DA1247` circular submit). At 390 all three collapse into a **single two-line pill** — the primary term at ~17px w600 on line one, the two secondary terms joined by a `·` in grey on line two — flanked by a back arrow and a filter icon. This is the pattern worth stealing for any multi-field search on mobile: do not stack the fields and do not drop them, **summarise them into one tappable line that reads as a sentence** and expands to the full form on tap.

**Bottom navigation.** Three tabs (`Explore` / `Wishlists` / `Log in`), icon above an ~11px label, active tab in `#DA1247`. Three tabs, not five: on a browsing product the tab bar is not the information architecture, the search is.

**Touch targets, measured:** Duolingo buttons h50, Discord h65, Headspace h48, Spotify controls 48×48, Airbnb icon buttons 40×40 and carousel arrows 32×32. The 32px ones are hover-revealed desktop affordances that do not render on touch; every primary touch action in this set is ≥44px. Note the two Airbnb affordances that *do* survive to touch and are overlaid on the photograph — the save heart top-right and the carousel dots bottom-centre — sit in the image's corners, where they cannot collide with metadata.

**Filter UI on mobile:** the desktop sheet becomes a full-height bottom sheet with the same sticky footer (`Clear all` + live-count CTA). The horizontal pill row survives unchanged as a scrollable row and Airbnb ships it at 390 too (`Washer`, `Hot tub`, `Free parking`, `Self check-in`, running off the right edge — a deliberately clipped last pill is how you signal scrollability without a chevron).

**DoorDash store page at 390px:** hero image `390×250` (full-bleed, 16:10) with the store name at 20px/24 w700 ls −0.2px in white composited over the image. Full-bleed hero + text-on-image is the standard mobile treatment for a single-entity page. It does not translate to a grid, where text-on-image fails against uncontrolled photography — except at MUBI, where the artwork is curated: its mobile hero composites `DIRECTED BY PETE OHS` / `UNITED STATES 2025` in uppercase white over the still, and it holds because MUBI controls every frame in the catalogue.

## How this archetype fails

This section is written for an agent grading its own output. Every item below has a **check** you can run against the rendered DOM and a **threshold** that decides it. Do not reason about whether the grid "feels" right; measure it.

Paste this into the console of your own build first — it answers items 1–7 at once:

```js
const cards = [...document.querySelectorAll(YOUR_CARD_SELECTOR)];
const gs = getComputedStyle, r = e => e.getBoundingClientRect();
const hs = cards.map(c => +r(c).height.toFixed(1));
const sizes = new Set(), radii = new Set(), colors = new Set();
for (const el of cards[0].querySelectorAll('*')) {
  const t = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
  const s = gs(el);
  if (t) { sizes.add(s.fontSize); colors.add(s.color); }
  if (s.borderRadius !== '0px') radii.add(s.borderRadius);
}
console.table({
  heightSpread: Math.max(...hs) - Math.min(...hs),   // target 0
  fontSizesInCard: sizes.size,                        // target 1–2
  textColorsInCard: colors.size,                      // target 3
  radiiInCard: radii.size,                            // target 1–2
  cardHasBg: gs(cards[0]).backgroundColor,            // target rgba(0,0,0,0) unless §1 case 2/3
  cardHasShadow: gs(cards[0]).boxShadow,              // target none at rest
  transitionProp: gs(cards[0]).transitionProperty,    // target NOT 'all'
  transitionMs: gs(cards[0]).transitionDuration,      // target ≤ 0.25s
});
```

**1. Card soup.** Every item wrapped in `bg-white rounded-xl border shadow-md p-4` with `gap-6`. Three redundant edges per item; the photographs stop being the subject.
*Check:* `cardHasBg !== 'rgba(0, 0, 0, 0)' && cardHasShadow !== 'none' && border !== '0px none'` — all three true at rest is the diagnosis. *Fix:* §1. Airbnb, Grailed and Vinted all report transparent, none, 0px.

**2. The four-size card.** `text-xl` title, `text-base` subtitle, `text-sm` meta, `text-2xl font-bold` price.
*Check:* `fontSizesInCard`. **Threshold: more than 2 distinct font sizes inside one card is the failure.** Airbnb's card runs 15px and 11px; Allbirds runs 14px and 12px; Grailed is the outlier at four sizes and pays for it with a busier card. *Fix:* §2 — hierarchy by weight and three greys.

**3. Ragged card heights.** Titles wrapping to 1–3 lines, badges that only some items have, an optional price row.
*Check:* `heightSpread`. **Threshold: anything above 0 in a grid of ≥3 columns.** Measured: Allbirds 0px/34 cards, Grailed 0px/40, Vinted 0px/96, Airbnb 69.6px/28. *Fix:* §3 — fix the line count, truncate, move badges into the image zone.

**4. A skeleton that isn't the layout.** Grey shimmer pills of arbitrary width in a bordered box, then a full reflow when content lands.
*Check:* compare the skeleton element's `borderRadius` and `getBoundingClientRect()` to the loaded image's. **Threshold: any difference at all.** Also check `document.querySelectorAll('img:not([width]):not([style*=aspect])')` — an image with no reserved box is a guaranteed reflow. *Fix:* §8 — one element, one colour, one radius, doing placeholder, skeleton and error ground.

**5. Hover jelly.** `hover:scale-105 transition-all duration-300` on every card.
*Check:* `transitionProp === 'all'` or `transitionMs > 0.25s` on a grid item. `all` is never correct on a card — it animates padding and border-width whenever a class toggles. *Fix:* §10 — `background` at 150–250ms, `transform` reserved for ~100ms.

**6. Borrowed urgency.** Countdown timers, "3 people are viewing", "Only 2 left" on a product with no inventory constraint.
*Check:* count the cards carrying the badge and divide. **Threshold: above 50% it has stopped discriminating; above 80% it is pure decoration.** Booking's scarcity string measures 52%, Airbnb's `Guest favorite` 64%, Airbnb's `Book early to save` 7%. *Fix:* §12, and the falsifiability test.

**7. No ground.** Everything on `#FFFFFF` with grey-bordered cards.
*Check:* `getComputedStyle(document.body).backgroundColor === 'rgb(255, 255, 255)'` **and** cards carry a background. That combination means nothing is doing figure/ground. *Fix:* §1's boundary — pick one: tinted ground with white cards (Allbirds `#ECE9E2`), or tinted ground with transparent cards (Vinted `#EDF2F2`). Do not do white ground with white cards and a border.

### The specifically AI-generated version of this archetype

The six above are generic bad design. These are the tells of a *generated* consumer grid, and they cluster — if you find one you will find four:

- **Emoji as the icon system.** 🏠 🔥 ⭐ ✨ in category chips, empty states and badges. No product in this reference set uses emoji in its UI; Airbnb's `Guest favorite` badge carries a drawn trophy glyph, not 🏆.
- **The gradient hero.** A `bg-gradient-to-r from-purple-500 to-pink-500` band above a grid whose page ground is white. Nine of the ten grounds measured here are a single flat colour; the only gradient in the set is Spotify's, derived from the album art it sits under.
- **Glassmorphism where there is nothing to see through.** `backdrop-blur` on a card that sits on a flat ground. Airbnb's own filter-modal scrim is `rgba(0,0,0,0.25)` with **no `backdrop-filter`** — the most-copied modal in consumer software declines the effect.
- **Three accent colours, none load-bearing.** A purple CTA, a green badge, an amber "featured" ribbon, each on fewer than ten elements. Every product here holds one hue and lets grey do the rest.
- **A lucide icon on every metadata row.** `<MapPin> Lisbon`, `<Bed> 3 beds`, `<Star> 4.98`. Airbnb's bed count is text; the only glyph on the card is one 12×12 star. Icons at 12–14px next to 15px text add a column of grey noise and cost a line of metadata height each.
- **`aspect-video` on product photography.** 16:9 is a video ratio. Nothing in this set uses it for a product: garments run 2:3 and 3:4, products-on-white run 1:1, rooms run 4:3, posters run 2:3.
- **Invented social proof.** "★★★★★ (127 reviews)", "2.4k views", "Trending now" on a product that has no reviews, no view counter and no trend calculation. This is the failure that is also a lie, and it is the one an agent is most likely to produce because the template slot exists and the data does not.
- **The count that is not a count.** `Showing 1-12 of many results`, `1M+ listings`, `Thousands of homes`. Every product here prints the real integer: `1.67M results` (Depop), `10,158,421 listings` (Grailed), `Over 1,000 homes in Lisbon` (Airbnb), `34 products` (Allbirds). If you cannot compute the number, remove the element rather than fill it.
- **Placeholder photography that is all the same photograph.** Six identical Unsplash stock images at six aspect ratios. The grid's entire argument (§1) is that the photograph is the content; a grid of one repeated photo cannot be evaluated and should never be shown for review.

**The self-diagnosis that catches all of them at once:** render your grid with the images replaced by flat grey rectangles. If it still looks designed, the layout is real. If it collapses into an undifferentiated stack of boxes and icons, the photographs were carrying a layout that does not exist.

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
- `Free ground shipping on orders over $100` — Allbirds announcement bar, live 2026-09; a threshold you can check, no adjective. (The first pass quoted `Due to increased demand, orders may take up to 30 days to ship.` from an earlier capture; that banner is no longer live, which is itself the point — a constraint banner should disappear when the constraint does.)
- `€3 more than the min` — Bandcamp; reports what a buyer chose, adds no adjective. 11px/20 w700 `#008000`
- `free. fun. effective.` — Duolingo; lowercase, three words, one claim each

**Wrong:**
- `We have 3 left at this price` — a claim you probably can't substantiate, in bold red (Booking, measured)
- `Sign in, save money` — an interrupt disguised as advice (Booking, measured)
- `Discover amazing places` / `Find your perfect stay` — adjectives doing the work a photograph already does
- `Oops! Something went wrong 😢` — an error that tells the user nothing and performs an emotion on their behalf
- `No results found. Try adjusting your filters.` — the user knows. Tell them *which* filter is responsible and offer to remove it
- `Loading amazing content...` — nothing is loading amazingly
- `Only 2 left!` on a made-to-order product — the ethics test from §12: if it would still be there when false, delete it

**Numbers.** Print the real one. `1.67M results` (Depop), `10,158,421 listings` (Grailed), `4.98 (56)` (Airbnb), `3,656 reviews` (Booking), `(34 products)` (Allbirds) all beat "thousands of". Two decimals on a 0–5 rating and none on a review count. Currency symbol attached, cents at full weight, never superscripted; Bandcamp declares `font-variant-numeric: proportional-nums` on body text and nothing in this set uses tabular figures inside a card grid.

**Badges.** Cap the vocabulary at three or four, make each one verifiable, and **measure how often each fires before you ship it** (§12). Airbnb ships `Guest favorite` (18/28 cards), `Free cancellation` (12/28) and `Book early to save` (2/28); the last two are 11px w500 sitting *below* the price and visually quieter than it. Booking shows at least seven badge types simultaneously and its scarcity string fires on 52% of cards. The vocabulary cap is the easy half; the frequency cap is the half everyone skips.

## Sources

All measured 2026-09 with Playwright at 1440×1000 and 390×844, `deviceScaleFactor: 2`, real Chrome/Safari user agents. Values are computed styles and bounding boxes read from the live DOM, not inspected by eye.

**Re-probed in the 2026-09 direction pass** (independent runs, fresh browser contexts): Airbnb 1440 and 390 (card anatomy element-by-element, card-height spread across 28 cards, rating distribution across 28 cards, badge frequency, the image clip-frame chain, radius and transition censuses), Booking.com search results (scarcity-string frequency across 25 property cards, card box, body-size census), Grailed `/shop`, Allbirds `/collections/mens`, Vinted `/catalog?search_text=coat`, Letterboxd `/films/popular/`, Duolingo, Bandcamp (`more than the min` string spec, `proportional-nums`). Screenshots taken and read at 1440 and 390 for Airbnb, Vinted, Allbirds and MUBI. Grailed's screenshot was refused by Cloudflare under the screenshot tool's user agent, though the DOM probe under a desktop Chrome UA succeeded — Grailed's numbers are measured, its composition was not re-viewed in this pass.

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

## Direction pass (2026-09)

An independent re-probe of the live sites plus a screenshot review at 1440 and 390. Every number below was re-measured from the DOM in a fresh browser context, not carried over.

### Numbers corrected

| Was | Now | Where |
|---|---|---|
| "the 20px radius is on the *image*, not a container" | the `<img>` is `border-radius: 0`; the radius lives on a `307×230` div at r20 with `overflow: clip` and `background: #DDDDDD` | §1, reference table |
| Airbnb 1440 = 4 columns | **2 columns** by default; the map takes ~1085px of a 1440 viewport. 4-up only with the map hidden | grid table, §13 |
| Airbnb 390 image `342×237`, ratio 1.44 | `342×256.5`, ratio **1.333** — identical to desktop | grid table, Mobile |
| Airbnb metadata "five rows in 149px", implied fixed | **not fixed**: 28 cards, 2 heights, **69.6px spread** at 1440; 3 heights, 104px spread at 390 | §3, Mobile |
| Grailed gutter `8 / 8` | `8 / 24` | grid table |
| Allbirds gutter `10 / 11` | `10 / 10`; 34/34 cards at exactly 409.5px | grid table, §3 |
| Vinted gutter unrecorded | `16 / 8`; 96/96 cards at exactly 418.9px | grid table, §3 |
| Vinted card `#FFFFFF` | catalog cards are **transparent** on `#EDF2F2`; white is nav/modals only | neutral table, §1 |
| "92% of listings sit between 4.6 and 5.0" (unsourced) | measured across 28: min **4.53**, median **4.98**, max **5.00**; 27/28 ≥ 4.6; **10/28 exactly 5.0** | §6 |
| "a badge that appears on 90% of results" | Booking scarcity string on **13/25 (52%)**; Airbnb `Guest favorite` **18/28**, `Free cancellation` **12/28**, `Book early to save` **2/28** | §12, Copy |
| Duolingo "`12px` ×2. Nothing else." | `12px` ×7 **and** `2px` ×3 | radii census, §9 |
| Duolingo display 64px `feather` | 48px w700 in this pass; `feather` on 7 elements vs `duolingo-sans` on 135 | type table, §9 |
| Duolingo accent `#58CC02` | `#A5ED6E` on 65 text elements is dominant; `#58CC02` on 6 | accents, §9 |
| Bandcamp `$10 more than the min` | `€3 more than the min`, **11px/20 w700 `#008000`** | reference table, §12, Copy |
| Allbirds banner "orders may take up to 30 days to ship" | no longer live; current bar reads `Free ground shipping on orders over $100` | Copy |
| Airbnb transitions 399 / 76 | 526 / 108 — census counts scale with result count | motion table, header note |
| Booking body `312` elements at 12px/18 | 304; card confirmed at exactly **815×274** with **22** styled text elements | type table, §12 |
| Bandcamp 6×229 grid at 17.6/0 | not reproducible in this pass; marked unconfirmed | grid table |

Confirmed unchanged and worth trusting: Grailed `2px` ×358 and `220×264` at ratio 0.833; Letterboxd `clamp(2px, 2.66667%, 8px)` ×288 on `#14181C`; Allbirds ground `#ECE9E2`; Vinted's `£33.62` grey → `£36.00` teal inclusive-price treatment; Airbnb's `$1,390` struck grey → `$1,251` w500 `#222222` → `for 5 nights`; Airbnb's rating at `x:243, y:242`, 60×19px, on the title's row; Booking's `#D4111E` 12px/18 w700 scarcity string.

### Cut

- The claim that this archetype's mobile is "the desktop grid widened" — Airbnb's 390px surface is a map with a results sheet over it, which is the opposite arrangement.
- "That single decision does more for 'warm' than any accent colour" — replaced with the two distinct jobs a tinted ground can do and the test for which one you are doing.
- "Both poles work; the failure is the middle… reads as a template" — replaced with a testable signature (accent count, radius count, display-to-body ratio).
- "It is a one-line change with a disproportionate effect" — replaced with the two concrete ground/card pairings.
- "the whole point of a marketplace" — replaced with the arithmetic (24px × 5 gutters eats half a card).
- Airbnb from the "warm tinted ground" group; its body is `#FFFFFF`.
- Bare census integers presented as stable facts; the header now states the ratio is the finding.

### Added

- **§1**: the `#DDDDDD` clip frame that does rounding, clipping and placeholder in one element; four boundary cases instead of one, including the "image must define its own edge" rule that explains why Allbirds keeps a card and Vinted does not.
- **§3**: a card-height-spread table across 34/40/96/28 cards, the finding that Airbnb is the exception, and the badge-in-the-image-zone rule that lets you add badges without breaking a fixed height.
- **§6**: the measured rating distribution, and a rule ("compute the spread before choosing a treatment") plus a boundary for rating-is-the-product and rating-is-a-safety-signal.
- **§7**: Airbnb ships the pill row *and* the sheet — which undercuts the original boundary; Allbirds' `FILTER (34 products)` as a fourth, cheapest pattern; the cost limit on live counts.
- **§11**: a boundary for when varying ratio is information, and the note that varying ratio forfeits §3.
- **§12**: a badge-frequency table covering both products, the second test (what fraction carries it), and a "when urgency IS legitimate" boundary.
- **§13** (new): the split-view finding, and why Airbnb's specs do not transfer to a six-column catalogue.
- **States**: named placeholder/error values, the one-element rule, and ad-disclosure treatments (Booking `Ad`, Vinted `Bumped`).
- **States**: Vinted's cold load puts **four** interrupts over the results, including its own banner rendered twice — with the render-time assertion that catches it.
- **Mobile**: the map/sheet inversion, the collapsed two-line search pill, the 3-tab bottom bar, the clipped-last-pill scroll affordance, image affordances living in the photo's corners, and confirmation that type specs are byte-identical across widths (241 vs 243 occurrences).
- **How this archetype fails**: a runnable console probe with numeric thresholds for all seven generic failures, plus a new subsection on the *AI-generated* version — emoji icon systems, gradient heroes on flat grounds, `backdrop-filter` where there is nothing behind, three non-load-bearing accents, a lucide icon per metadata row, `aspect-video` product photos, invented social proof, fake counts, one repeated stock photo — and the grey-rectangle test that catches all of them.

### Still open

- Etsy remains unmeasured (DataDome). Unchanged from the first pass.
- Grailed's composition was not re-viewed; Cloudflare refused the screenshot tool's user agent while the DOM probe under a desktop Chrome UA succeeded. Its numbers are verified; its layout is not re-seen.
- Bandcamp's card-grid geometry could not be reproduced and should be re-probed on a discover URL rather than the homepage.
- Offline and permission-denied states are still not observable from web surfaces, and are still not invented here.
