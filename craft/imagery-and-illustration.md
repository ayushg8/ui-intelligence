# Imagery, illustration and visual assets

**Evaluated:** 2026-09. Every number below was read off a live page — computed styles, `naturalWidth`, `<picture><source>` media queries, HTTP `Content-Type`/`Content-Length`, or a format A/B run by varying the `Accept` header against the real CDN. Where I could not measure, I say so.

This is the craft file for *what goes in the image slot*. Which icon library to install lives in [`libraries/_research/icons-and-typography.md`](../libraries/_research/icons-and-typography.md); this file is about how an icon behaves next to a word.

---

## If you only apply five things

1. **Pick exactly two aspect ratios for the whole product and enforce them with `aspect-ratio` on the wrapper, not on the image.** Airbnb's Paris search page renders 77 images at precisely two ratios — `1.000` (48 of them) and `1.333` (28 of them) — while the underlying host photos arrive at 720×480, 720×540 and **720×1080**. A portrait photo and a landscape photo land in the identical 307×230 box because the wrapper carries `aspect-ratio: 4/3` and the `<img>` carries `object-fit: cover`. Slack's homepage, by contrast, ships eight different ratios across 50 images (1.923, 0.868, 1.46, 1.37, 1.0, 1.438, 1.9, 2.68) and reads as a page assembled from separate briefs. Two ratios is a system; eight is an accident.

2. **A real screenshot of your own product beats every abstract graphic, and the thing that makes it real is the data in it.** Basecamp's hero is one product screenshot containing named people (Geoff Collier, Leah Bernstein, Kurt Holloway, Liza Randall), a file list reading `Hero Image.png · Jul 20 · 1.86 MB` and `FAQ Entries.md · Jul 20 · 27.9 KB`, a July 2026 calendar with real events, and three external links pointing at actual Figma/Drive/Zoom URLs. Linear's hero is issue `DRV-8852` with the body text *"Render UI before `vehicle_state` sync when minimum required state is present, instead of blocking on full refresh during iOS startup."* Neither page has a single abstract shape on the fold. Lorem, `John Doe`, `$1,234.56` and `Project Alpha` destroy this in one pass.

3. **Ship AVIF, and know what it buys you.** Same Airbnb listing photo at 720px, negotiated by `Accept` header on their live CDN: **AVIF 12,455 B · WebP 20,232 B · JPEG 29,997 B**. Same Linear hero screenshot at 1440px: **AVIF 5,345 B · WebP 9,074 B · PNG 69,561 B — AVIF is 13× smaller than the PNG.** Photographs gain ~2.4× over JPEG; flat UI screenshots gain an order of magnitude over PNG. Slack ships 96 image requests totalling **6,823 KB with zero WebP and zero AVIF** — 3,441 KB of PNG and 3,379 KB of JPEG. That is the single largest unforced asset cost I measured.

4. **`srcset` without `sizes` is worse than neither.** Slack sets `srcset` on 42 of 50 images and `sizes` on **zero**, so the browser assumes `100vw` and downloads the widest candidate for a 300px slot. Their G2 badges arrive at 868px natural for a 104px box — 4.17× oversupply even at 2× DPR. Stripe's customer photographs carry seven candidates plus `sizes="(min-width: 1298px) 1232px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"`. Mailchimp sets `sizes` on 68 of 82 images and is the most disciplined page in this sample. If you cannot write a correct `sizes`, use a fixed-width CDN param instead — Airbnb just appends `?im_w=720` and ships no `srcset` at all.

5. **Decorative images take `alt=""`; content images take a sentence.** Stripe's homepage carries 44 `<img>` elements: **40 have `alt=""`** and the four that don't are the four real photographs, each with a full descriptive sentence — *"Aerial view of a street intersection where the crosswalks form…"*, *"Street view of a traditional Parisian newspaper kiosk with y…"*. That ratio is the correct shape. Apple's MacBook Pro page: 58 empty, 31 descriptive (*"A person at an airport using their MacBook Pro"*). A page where every image has a keyword-stuffed alt is as broken as one where none do.

---

## The measured reference

### Format cost, measured by Accept negotiation (2026-09-10)

Same source asset, same CDN, same requested width; only the `Accept` header changed.

| Asset | AVIF | WebP | JPEG / PNG | AVIF advantage |
|---|---|---|---|---|
| Airbnb listing photograph, `im_w=720` | **12,455 B** | 20,232 B | 29,997 B (JPEG) | 1.62× vs WebP, **2.41× vs JPEG** |
| Linear hero screenshot, `width=1440` | **5,345 B** | 9,074 B | 69,561 B (PNG) | 1.70× vs WebP, **13.0× vs PNG** |

The second row is the one agents get wrong. A UI screenshot is flat colour and hard edges — the case PNG was designed for — and AVIF still beats it by 13×. There is no remaining reason to ship a PNG screenshot.

### What each product actually ships

| Product / surface | Images | Formats (requests / bytes) | Ratios in use | `srcset` / `sizes` | `<picture>` | `aspect-ratio` boxes | alt empty / text |
|---|---|---|---|---|---|---|---|
| **Airbnb** search (Paris) | 77 | AVIF 39 (637 KB), PNG 19 (755 KB), WebP 2 | **2** — `1.000`×48, `1.333`×28 | 2 / 2 | 48 | 62 | 76 / 1 |
| **Stripe** home | 44 | WebP 10, PNG 3, GIF 13 — 1,108 KB total | `0.768`×8, `1.000`×5, `2.321`×4, `0.930`×4 | most / 7-candidate sets | 44 | 96 | 40 / 4 |
| **Linear** home | 39 | AVIF only, via `imagedelivery` `f=auto` | `1.000` dominant, `1.778` hero | 0 / 0 (CDN width param) | 0 | 40 | ~33 / 6 |
| **Apple** MacBook Pro | 89 | **JPEG 10 (1,023 KB)** — no AVIF, no WebP | `1.000`×69, `1.853`×5, `1.547`×4, `3.2`×3 | 0 / 0 (all in `<source>`) | **109** | 1 | 58 / 31 |
| **Notion** home | 58 | SVG 43, WebP 30 (718 KB), via `/image?url=…&q=75` | `1.000`×27, `3.5`×5, `3.583`×3 | 31 / 11 | 9 | 104 | 52 / 6 |
| **Duolingo** home | 52 | **SVG 55 (335 KB)**, PNG 1, GIF 1 | `1.297`×42 (one ratio does 81%) | 0 / 0 | 1 | 8 | 50 / 2 |
| **Basecamp** home | 20 | WebP 23 (3,721 KB), SVG 5, JPEG 2 | `0.95`×11, `1.000`×6, `1.778`×3 | 0 / 0 | 17 | 8 | 13 / 7 |
| **Mailchimp** home | 82 | SVG 38, GIF 12, AVIF 10, WebP 5, **PNG 3 (464 KB)** | `1.333`×34, `1.000`×7, `3.2`×4 | 63 / **68** | 46 | 103 | 9 / 73 |
| **Slack** home | 50 | **PNG 48 (3,441 KB) + JPEG 23 (3,379 KB)**, zero WebP/AVIF | 8 distinct | 42 / **0** | 0 | 7 | 23 / 27 |
| **Vercel** home | 5 | AVIF 2, WebP 3, SVG 4 — 162 KB total | `1.785`×2, `1.898`, `3.19`, `1.151` | 3 / 3 | 0 | 28 | 0 / 5 |

Read the last column as a diagnostic. Mailchimp at 73-of-82 descriptive is over-alting (their star-rating graphic carries *"Four yellow filled stars and one yellow outlined empty star, representing a 4 ou…"*, which a screen reader will read on every page load next to the same information in text). Airbnb at 76-of-77 empty is correct, because every listing photo sits inside a link whose accessible name is the listing title.

### Aspect ratios worth standardising on

Measured in use, not derived from theory:

| Ratio | Decimal | Where I measured it | What it's for |
|---|---|---|---|
| 1:1 | 1.000 | Airbnb (48 imgs), Notion (27), Apple (69) | Avatars, app icons, product thumbnails, anything that must tile |
| 4:3 | 1.333 | Airbnb listing cards, Mailchimp (34 imgs) | Interior/room/object photography; the most forgiving crop for uncontrolled UGC |
| 16:9 | 1.778 | Linear hero, Basecamp (3 imgs) | Video, screen recordings, anything that will also exist as a thumbnail on YouTube |
| 3:2 | 1.500 | Airbnb *source* files (720×480) | Camera-native. Note Airbnb crops it to 4:3 rather than adopting it |
| ~2.32:1 | 2.321 | Stripe customer photos (1232×531, `aspect-ratio: 2460/1060`) | Editorial banner inside a text column |
| 0.95:1 | 0.950 | Basecamp (11 imgs) | Slightly-tall product screenshot — a deliberate near-square that isn't square |

Pick **one landscape and one square**, or one landscape and one portrait. Adding a third costs you a crop pipeline and buys nothing.

### Avatar geometry, measured

| Product | Size | Radius | Ring | Served at | Notes |
|---|---|---|---|---|---|
| GitHub contributor list | 40px | `50%` | `box-shadow: rgba(31,35,40,0.15) 0 0 0 1px` | `?s=60` (1.5×) | Ring is box-shadow, not border, so it costs no layout |
| GitHub discussion list | 32px | `9999.01px` | none | `?s=32` (**1× — soft on retina**) | |
| GitHub inline mention | 16px | `50%` | same 1px hairline | `?s=32` (2×) | |
| Linear marketing, team row | **36px** | **`6px`** | none | Cloudflare `f=auto` | Squircle, not circle — matches Linear's issue-avatar language |
| Linear marketing, activity feed | 14px | `50%` | none | 144×144 natural (**≈5× oversupply**) | |
| Linear app-icon chips | 16px | `999px` | none | 64×64 natural (2×) | |

The GitHub hairline is the detail worth copying: an avatar whose photo has a white background dissolves into a white page without it. Do it as `box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.08)` so it survives `object-fit: cover` and adds zero layout box.

### Icons next to text, measured

| Surface | Icon box | Adjacent font-size | Ratio | Gap | Icon colour vs label colour |
|---|---|---|---|---|---|
| Linear sidebar item | 14px | 13px | **1.08×** | 8px | `#62666D` icon vs `#D0D6E0` label — **one level dimmer** |
| Linear section label | 16px | 12px | 1.33× | 0 | identical (`#62666D` both) |
| GitHub nav / repo tabs | 16px | 14px | 1.14× | 4px | identical |
| GitHub notifications | 16px | 12px | 1.33× | 0 | `#59636E` icon vs `#25292E` label — dimmer |
| Stripe docs "Ask AI" | **12px** | 14px | **0.86×** | 6px | identical (`#50617A`) |
| Stripe docs inline link | 13px | 14px | 0.93× | 8px | identical (`#5469D4`) |

The working band is **0.85×–1.35× the adjacent font-size, gap 4–8px**. Stroke width where present was `1` or `1.5`, never `2`. Two colour policies exist and both are defensible: match the label exactly (GitHub tabs, Stripe), or demote the icon one neutral level (Linear sidebar, GitHub notifications). What nobody does is make the icon *brighter* than its label, or size it at 20–24px next to 14px text, which is the generated default.

### Logo-row conventions, measured

| Product | Eyebrow copy | Eyebrow type | How logos are monochromed | Sizing |
|---|---|---|---|---|
| **Notion** | *"Trusted by 98% of the Forbes Cloud 100"* | 14px w400 `rgba(0,0,0,0.54)` (4.6:1) | **Pre-made mono assets** — `Figma_Wordmark__Black_.svg`, `cursor-logo-mono.svg` | Widths 62–82px, per-logo, not a uniform box |
| **Linear** | *"Powering the companies building the future"* | 12px w400 **uppercase** `rgb(98,102,109)` | inline SVG at brand-neutral fill | per-logo |
| **Slack** | *"Trusted by top teams"* | 12px w400 `rgb(117,117,117)` | **`filter: grayscale(1)` at `opacity: 1`** | uniform-ish |
| **Vercel** | (none on the row I measured) | — | true black inline SVG | heights **20 / 35 / 17 / 21 / 28 / 45 px** in one 1392×44 row |

Vercel's row is the instructive one: six logos at six different rendered heights, because a wide wordmark and a tall square mark reach equal optical weight at different pixel heights. Setting a uniform `height: 32px` on a logo row is the generated move and it makes the square marks shout and the wordmarks vanish.

Notion's eyebrow is the other lesson: *"98% of the Forbes Cloud 100"* is a falsifiable claim with a named denominator. *"Trusted by top teams"* is not a claim at all.

---

## Decision 1: does this slot need an image?

Run this before choosing what the image is. The most common failure in generated UI is not a bad image — it is an image in a place that wanted none.

**An image earns the slot if it does one of these:**
- It **is** the content (a listing photo, a product photo, an uploaded file, a chart of real data).
- It shows the reader something words cannot: the actual product surface, a spatial relationship, a physical object they are buying.
- It carries identity that must be recognised at a glance (an avatar, a brand mark, a file-type icon).
- It is a deliberate, expensive, art-directed asset that is the page's whole argument (Apple's hero).

**It does not earn the slot if:**
- Its job is "this section looked empty."
- It is an abstract shape whose meaning you could not explain to the person who wrote the headline.
- It is a generic illustration of the concept in the heading (a rocket next to "Launch faster").
- It repeats, in picture form, the sentence directly beside it.

**The strongest evidence for "none at all":** Jasper's 2026 homepage ships **zero imagery above the fold** — a serif headline, a subhead, two buttons, nothing else. Vercel's homepage ships **five `<img>` elements total, 162 KB**, against Slack's 96 requests and 6.8 MB. Both read as more confident than the image-dense pages, because empty space adjacent to a strong sentence reads as certainty, and a generic graphic adjacent to a strong sentence reads as hedging.

Anthropic ships zero hero CTAs and near-zero hero imagery for the same reason (see [`references/editorial-luxury-and-marketing.md`](../references/editorial-luxury-and-marketing.md)). The corpus rule stands: **if the only justification is "the section looked bare," delete the image and reduce the section's height instead.**

---

## Decision 2: photography in product UI

### When a product genuinely needs photography

Three cases, and they are narrower than people assume.

**1. The photograph is the inventory.** Airbnb, e-commerce, real estate, food delivery, marketplaces, dating. Here the photo is not decoration, it is the row of the database the user is shopping. Everything in this file about crops, ratios, `object-fit` and placeholders exists for this case.

**2. The photograph is the argument.** Apple's MacBook Pro hero is one rim-lit product shot on pure black: no environment, no hands, no desk, the machine positioned into a V. The type sits in the empty lower-left quadrant and never crosses the object. This works because the object is the thing being sold and Apple can afford to shoot it. It fails immediately for a SaaS product, because there is no object.

**3. The photograph documents a real customer.** Stripe ships four photographs on its homepage — a Parisian newspaper kiosk, an overhead door stoop with a delivery bag, a clothing boutique exterior, an aerial crosswalk. All four are 1232×531 (`aspect-ratio: 2460/1060`), all four have descriptive alt sentences, and all four show *places where Stripe's payments happen* rather than *people using Stripe*. That is the distinction between documentary and stock: the subject is the business, not a model performing enthusiasm.

Everywhere else — a B2B dashboard, a developer tool, an internal admin — photography is decoration, and the honest version of the slot is a product screenshot or nothing.

### Art direction: the four variables that make a set cohere

A set of photographs reads as one system when four things are constant. Change one deliberately; changing three by accident is what "we bought a stock pack" looks like.

- **Subject distance.** Stripe's four homepage photographs are all shot from the same middle distance — a whole shopfront or a whole doorway fills the frame, no close-ups, no wide cityscapes. Apple's product shots are all one object at one distance.
- **Light direction and quality.** Apple: single hard key from behind-left producing a rim on the lid edge, deep black falloff, no fill. Mailchimp: warm ambient daylight through a shop window, high dynamic range, visible shadow. Both are consistent within themselves. Mixing hard studio light and window daylight in one grid is the fastest way to make a set look bought.
- **Colour temperature and grade.** Pick one and apply it. If you cannot grade, shoot in one location on one day.
- **The crop.** See below — one ratio for the set.

### Aspect ratios and why picking two matters

Airbnb is the proof. 77 images, two ratios, and the source files disagree wildly: 720×480 (3:2), 720×540 (4:3) and 720×1080 (2:3, portrait). All four listing cards render at **307×230**, ratio `1.333`, because:

```css
/* the wrapper owns the shape */
.card-media { aspect-ratio: 4 / 3; overflow: hidden; }
.card-media img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%; }
```

Three properties in the correct places. The mistakes to avoid:

- Putting `aspect-ratio` on the `<img>` and leaving `object-fit: fill` — the image squashes instead of cropping. Stripe does this on 19 of its 44 images (`fit: fill`), which is safe only because those sources already match their boxes exactly. It is not safe for anything user-supplied.
- Setting a fixed `height` and letting width vary. The row height stays honest, the crop does not.
- Using `object-fit: contain` for photographs. `contain` letterboxes, which puts your background colour inside the content area and makes a grid look like a slide deck. Airbnb uses `contain` on 22 images — all of them **icons and brand marks**, where letterboxing is correct — and `cover` on the 37 that are photographs. That split is the rule: `cover` for photos, `contain` for logos and icons, `fill` only when you control the source dimensions exactly.

### Focal points: when they matter and when they are theatre

Airbnb sets `object-position: 50% 50%` on every listing photo. No focal-point system, no ML crop. That is defensible because a 4:3 centre crop of a room is almost never wrong — rooms are wide and their subject is the middle.

Focal points earn their complexity in exactly two situations:

1. **Faces.** A centre crop of a portrait at 1:1 decapitates roughly a third of them. If you crop faces, either detect them or store a per-image `object-position` and let a human set it once at upload.
2. **Extreme ratio changes across breakpoints.** If the same source renders 21:9 on desktop and 1:1 on mobile, the centre of one is not the centre of the other. This is what `<picture>` with art-directed `<source media>` is actually for — a different *crop*, not just a different *size*. Notion uses exactly this: `<source media="(min-width: 840px)">` and `<source media="(max-width: 839px)">` pointing at differently-cropped renditions.

If neither applies, ship `50% 50%` and spend the effort elsewhere.

### Avatars and fallbacks

The order of preference, and the reasoning:

**1. The user's own photo.** Circle at ≤32px, `object-fit: cover`, `object-position: 50% 50%` (a portrait cropped square from centre is fine; the head is near the middle in a selfie). Add the GitHub hairline: `box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.08)`.

**2. Initials on a deterministic colour.** One or two characters, the background hashed from the user ID (never from the name — people rename), the text colour chosen for contrast against that background rather than always white. Initials are the correct fallback because they carry the only information you actually have, and because a wall of initials in a member list is *scannable* — you can find "KH" among thirty of them. Size the text at ~40% of the avatar diameter and set `font-weight: 500`; at 500 the two letters read as a mark, at 700 they read as shouting.

**3. Generated identicons — usually don't.** GitHub's identicon is the famous one, and it works there for a specific reason: GitHub avatars are frequently *bots and apps*, not people, and a deterministic pattern is honest about that. In a product where every avatar is a human colleague, an identicon is worse than initials on three counts: it carries zero information the viewer can use, it is unmemorable (nobody recognises "my teammate's identicon"), and the geometric-blob-on-pastel aesthetic is instantly legible as *a thing a library generated*. That last point is the one that matters for this corpus — Boring Avatars, DiceBear's `shapes`/`bottts`/`beam` sets and the various gradient-blob generators are recognisable on sight, and their presence reads as "nobody made a decision here."

The narrow case where generated is right: when the entity genuinely has no name and no face — an anonymous session, a wallet address, a server, a hash. Then a deterministic visual *is* the information.

**4. A default silhouette icon — the worst option.** Twenty identical grey person-glyphs in a member list convey nothing and make the list unscannable. If you have a name, you have initials.

**Never** let a broken image URL show a broken-image glyph. Handle `onerror` by swapping to the initials layer, or render initials *underneath* the `<img>` so a failed load reveals them:

```html
<span class="avatar" style="--bg: oklch(0.72 0.11 250)">
  <span class="avatar__initials" aria-hidden="true">KH</span>
  <img src="/u/1024.avif" alt="" onerror="this.remove()">
</span>
```

### User-generated imagery you do not control

You will receive: portrait photos in a landscape slot, 5000px JPEGs, screenshots of screenshots, images that are 95% white, images that are 95% black, animated GIFs, images with text burned in, and photos whose subject is in the corner. Design for that, not for the three good ones in your seed data.

The measures that actually hold, all of them visible in Airbnb's implementation:

- **The wrapper owns the shape.** `aspect-ratio` + `overflow: hidden` + `object-fit: cover`. Nothing the user uploads can change the layout.
- **Overlays get their own opaque chip.** Airbnb's "Guest favorite" and "Luxe" badges sit in white pills with their own background; the heart sits in a filled circle. Neither relies on a text-shadow or a scrim over the photo, because you cannot know whether the photo behind is a white ceiling or a black night shot. **Never place bare text directly on a user's image.** If you must, put a `linear-gradient(to top, rgb(0 0 0 / 0.6), transparent 50%)` scrim between them and accept that you have now darkened a third of every photo.
- **A neutral ground behind the image.** Set the wrapper's background to a mid-neutral, not white. A 95%-white upload against a white card has no edge.
- **Cap the delivered size at the CDN**, not in CSS. Airbnb appends `?im_w=720` and gets a 12 KB AVIF back. A 5000px original rendered into a 307px box with `width: 100%` still costs the user the full download.
- **Colour placeholder, not a spinner.** See the technical section — extract the dominant colour or a ThumbHash at upload time and paint it into the box.

---

## Decision 3: stock photography

### Why it reads as filler

Stock photography fails in product UI for a mechanical reason, not a taste one: **the photograph was made before your product existed, so it cannot contain your product, your customer, or your claim.** The viewer's eye clocks the mismatch before their brain names it. Everything else is downstream of that.

### The tells, specifically

- **Smiling people at a laptop.** Nobody smiles at a laptop. The give-away is eye-line: in stock, the subject looks at a colleague or at the camera while gesturing at a screen. In documentary, they look at the screen.
- **The over-lit workspace.** Two or three soft sources, no shadow anywhere, no dust, no cable, a plant, a notebook nobody wrote in, and a laptop whose screen is either off or displaying a blurred generic dashboard. Real desks have one light source and a mess.
- **The Unsplash-desk genre.** Overhead flat-lay: MacBook, coffee, moleskine, phone at a 15° angle, marble or reclaimed-wood surface. This is so pervasive it has become the visual equivalent of Lorem Ipsum. The corpus already records the 2020-era template that shipped "a centered hero over an Unsplash photo of people at laptops with a white play-button overlay" ([`libraries/_research/premium-commercial.md`](../libraries/_research/premium-commercial.md)) — that is the fossil.
- **Diverse-team-in-a-meeting.** Four to six people of visibly assorted demographics around a glass table, at least one laughing, sticky notes on a window. The composition is always the same because it is a casting brief, not an event.
- **Handshake, lightbulb, arrows-going-up.** Concept stock. If a photograph illustrates an abstraction rather than depicting a thing, it is filler.

**The 2026 update:** the models have changed but the genre has not. The current version is an AI-generated version of the same brief. Tailark's shadcn marketing registry — a component library whose entire product is marketing-page blocks — ships a hero demo with a close-up of a wrist and a smartwatch with blown highlights, plasticky skin rendering and no discernible light source. It is the Unsplash desk with a new pipeline.

### What to ship instead, in order of credibility

1. **A screenshot of your own product with real data.** Highest credibility, lowest cost, most under-used. See Decision 6.
2. **A real customer's real premises or real product.** Stripe's kiosk and boutique. Mailchimp puts a real customer's oat-milk brand ("OAT LORD") inside the campaign canvas on the screen in their hero photo, so the photograph is documenting an actual campaign rather than illustrating the idea of one.
3. **Abstract but owned.** A visual system you built and can repeat: Linear's noise-grain texture (`grain-default.png` tiled at `256px 256px`) and its radial `rgba(255,255,255,0.04)` glows; Stripe's signature `radial-gradient(circle, #7F7DFC, #F44BCC 33%, #E5EDF5 66%)` mesh. These are cheap, infinitely reusable, and unmistakably yours because you defined the palette. They are not "an abstract 3D render off a stock site."
4. **Nothing.** Jasper, 2026: no hero image at all. Vercel: 5 images, 162 KB.

Stock is defensible in exactly one place: an editorial context where the photograph is *about* something external — a blog post about a city, an industry report, a news item. There the reader understands the photo is illustrative journalism, and the alternative is a blank column.

---

## Decision 4: illustration systems

### What makes a set cohere

An illustration set is a system when a new drawing can be produced by a different person and still belong. Six variables decide that:

1. **Line weight — including zero.** Duolingo's characters have **no outline at all**: flat filled shapes, no stroke. Notion's doodles are the inverse: **outline only**, single weight, black ink, no fill. Both are systems because the answer is absolute. A set where some drawings have a 2px outline and others have none is not a set.
2. **Palette derived from the product's, not chosen fresh.** Duolingo's illustrations run on the same saturated primaries as the app's UI (the brand green is the same green as the `GET STARTED` button). If your illustration palette contains colours your interface does not, you have two brands.
3. **Perspective.** Pick one: flat/orthographic, isometric, or one-point. Duolingo is flat with no perspective at all — characters tumble in 2D. Mixing isometric objects with flat characters is the single most common incoherence.
4. **Level of detail, expressed as a budget.** "No more than X shapes per drawing," "no gradients," "no textures." Notion's doodles are ~12 strokes each. Duolingo's characters have two-dot eyes and no fingers.
5. **Character or no character.** This is the biggest fork and it is a business decision, not a style one. See below.
6. **Where the drawing sits relative to real UI.** Notion's answer is a two-register system: black ink doodles float *around* a real product screenshot, while **full-colour circular app icons** (Slack, Gmail, HubSpot, Drive) sit at the doodles' hands. The registers never mix — the doodles are never coloured, the app icons are never redrawn. That separation is what stops it reading as clip-art.

### The Corporate Memphis / Alegria problem

The style — noodle-limbed figures with disproportionate hands, no facial features, flat saturated fills, non-naturalistic skin colours — became a cliché for a structural reason worth stating precisely: **it was designed to be produced at volume by many hands with no art direction.** Facebook commissioned Alegria (Buck, 2017) specifically so an in-house team could generate endless assets in one voice. That property is what made it spread and what killed it: a style optimised for infinite cheap production ends up everywhere, and "everywhere" is the definition of a cliché.

**What replaced it is not one style — it is three moves**, and knowing which you are making matters more than the drawing:

- **The named cast.** Duolingo's answer. Duo and the recurring characters are not "an illustration style," they are *intellectual property with continuity*. You recognise Duo the way you recognise a logo. This is the most expensive option and the most durable; it only makes sense for consumer products with high session frequency where a character can accrue meaning.
- **The hand-drawn mark.** Notion's ink doodles. Deliberately imperfect line, visibly made by a person, no fills, no gradients. It reads as craft rather than production because a wobbling line is evidence of a hand. Cheap to extend, hard to fake convincingly, and it fails badly if the rest of your interface is precision-engineered — Notion gets away with it because their UI is also deliberately plain.
- **The abstract-but-owned texture.** Linear's grain and glows. No figures at all. The right answer for most B2B products, because a B2B product does not need a character and cannot afford one.

**The honest note:** as of 2026, Corporate Memphis has largely disappeared from AI output. The corpus's own control baseline recorded "no Corporate Memphis, no glassmorphism, no purple gradient blobs, no lorem" in generated landing pages ([`evaluation/results/2026-09-control-baseline.md`](../evaluation/results/2026-09-control-baseline.md)). Do not spend your review budget hunting for it. The current generated failure in this territory is different and is covered in *The generated version* below.

### When illustration earns its place

| Surface | Verdict | Why |
|---|---|---|
| **Empty states** | **Yes, small** | The one place illustration reliably beats text. But the drawing should be ≤96px and the *sentence* should do the work. See [`craft/copy-and-voice.md`](copy-and-voice.md) for the copy. |
| **Onboarding / first-run** | **Yes, if you have a cast** | Only if the character recurs later. A character introduced in onboarding and never seen again is a mascot with no job. |
| **Error pages (404/500)** | **Yes** | The one moment where a little warmth costs nothing, because the user has already failed to get what they wanted. |
| **Marketing hero** | **Rarely** | Only if illustration *is* the brand (Duolingo, Mailchimp). Otherwise a product screenshot outperforms it — see Decision 6. |
| **Feature grids / "how it works"** | **No** | This is where padding illustration lives. Three cards each with a generic drawing of the concept in its heading. Replace with three real screenshots, or with nothing. |
| **Docs, settings, dense B2B tables** | **No** | Illustration in a dense surface is a density violation. See [`craft/density-and-hierarchy.md`](density-and-hierarchy.md). |
| **Pricing pages** | **No** | A drawing next to a number reduces the credibility of the number. |

---

## Decision 5: AI-generated imagery

### The current tells

These are the ones I can still identify on sight in 2026 output. They are less about "AI" and more about "nobody art-directed it."

- **The over-rendered 3D blob.** A glossy, subsurface-scattering, softly-lit abstract form — a torus knot, a folded ribbon, a liquid-metal sphere — floating on a gradient. Zero informational content, high render cost. This was the 2023–24 default and is the one tell that has genuinely faded from funded companies' sites but persists in template marketplaces.
- **Iridescent / chromatic-aberration gradients.** A holographic sheen sampled from nothing. Distinguishable from a designed gradient by its palette: designed gradients use two or three colours from the product's own ramp (Stripe's `#7F7DFC → #F44BCC → #E5EDF5` is three brand colours); generated ones sweep the whole spectrum.
- **Plasticky lighting on skin and objects.** Tailark's smartwatch-on-wrist demo: blown highlights, no specular falloff, skin with no pores or hair, a light source that cannot be located in the scene. This is the current stock-photo tell and it is subtler than hands.
- **Symmetric "hero abstract" shapes.** Perfect bilateral symmetry, centred, with a soft glow behind. Real photography is almost never bilaterally symmetric; the symmetry is a giveaway that the composition was generated rather than framed.
- **Hands, still.** Improving fast, but a hand touching a product is still the highest-risk subject. If the composition needs a hand, it needs a photograph.
- **Wireframe topography.** The Framer Marketplace's current top-trending template ("Sentira") ships an AI-generated green wireframe-mesh landscape as its hero. This is the 2026 replacement for the 3D blob: same job, same emptiness, new texture.

### An honest position on when it is defensible

I do not think a blanket prohibition survives contact with reality. The defensible cases:

- **Texture and ground, where no subject is depicted.** Generating a noise field, a paper grain, a soft abstract wash to sit *behind* content — indistinguishable in kind from a Photoshop filter, and nobody is being told a photograph exists.
- **Internal, throwaway, or placeholder work.** Comps, pitch decks, seed data. The failure mode is forgetting to replace it.
- **Where the product itself is generative.** An AI image tool showing its own output is documentation.
- **Style-transfer and upscaling on assets you own.** Extending your own photograph's background to fit a wider crop is retouching, and retouching predates the technology.

The cases that are not defensible:

- **Anything depicting a person who is presented as a customer, employee, or user.** A generated face in a testimonial is a fabricated record. Notion's testimonial alt text reads *"Michael Truell, Co-founder and CEO of Cursor"* — a named, checkable human. Replace that with a generated portrait and the entire section becomes a lie.
- **Anything depicting your product.** A generated "screenshot" of an interface that does not exist is the same category of claim.
- **Anything in a domain where the image implies expertise** — a medical illustration, a diagram of a mechanism, a map. Generated images are confidently wrong about structure.

The practical test: **would you be comfortable if the alt text said "AI-generated"?** If not, don't ship it.

---

## Decision 6: screenshots of your own product

This is the most under-used, highest-credibility asset available to almost every product, and generated pages reach for it almost never.

Both of the strongest heroes I measured are screenshots. Linear's is issue `DRV-8852 · Faster app launch`, showing a real body paragraph, a `vehicle_state` inline code token, an activity feed with three real timestamps ("2min ago", "4 min ago"), a `1 / 84` counter, and a floating agent panel that reads "Worked for 10 sec". Basecamp's is a whole project page: a message board with five real threads, a docs list with file sizes, a July 2026 calendar, a kanban with column counts `(9) (6) (4) (2) (2)`, and external links to Figma, Drive and Zoom.

### How to shoot one

**Real data, and specifically real *bad* data.** Rows of the same length are a tell. Basecamp's file list has `Hero Image.png · Jul 20 · 1.86 MB` next to `FAQ Entries.md · Jul 20 · 27.9 KB` — four orders of magnitude apart, because real file lists are. Include one truncated string, one long name, one empty field, one number that isn't round. `118,254` beats `100,000+`.

**Correct density.** Shoot at the density a real user has, not at the density that makes the screenshot pretty. If your product's list view holds forty rows, do not screenshot six.

**Never lorem, never `John Doe`, never `Project Alpha`.** This is the single largest signal. Give your demo workspace a real domain — Basecamp's is a web-design agency, Linear's is a rideshare app with issues about iOS startup latency. The domain vocabulary is what makes the screenshot look like evidence.

**Consistent chrome.** Decide once whether screenshots include the browser bar, the OS window frame, or neither, and never mix. Basecamp includes the app's own content area only — no browser, no OS. Linear includes the app's full sidebar and header but no browser. Both are clean because they are consistent.

**Device frames: usually no.** A device frame adds 15–20% to the asset's area and communicates "this is a mockup." The exception is when the *platform* is the point — a mobile-only feature, or a comparison of desktop and mobile. Stripe uses a phone silhouette in its bento specifically because the section is about in-person and mobile payments. Apple ships bare screens in `<picture>` elements at 1728×912 and 1260×680 with no frame, because the frame is the physical product photographed elsewhere on the page.

**Shoot at 2× and deliver AVIF.** A 1440×900 screenshot shot at 2× is 2880×1800. As PNG that is the 69 KB → 5 KB gap measured above, at scale. Basecamp pays 3,721 KB of WebP for 23 assets — their single `view-chat-light.webp` is **677 KB**. In AVIF that same screenshot would land near 100 KB.

**Localise it if the claim is global.** Stripe's bento phone shows a German checkout: `Zahlungsinformationen`, `Oder mit Karte bezahlen`, `€149.00`, with Klarna selected. The section's claim is "accept payments globally"; the screenshot proves it rather than asserting it.

**Ship light and dark.** Basecamp pairs every single one: `tool-message-board-light.webp` / `tool-message-board-dark.webp`, `tool-chat-light` / `-dark`, `view-card-table-light` / `-dark`, `background-light` / `-dark`, behind `<source media="(prefers-color-scheme: light)">` and `(prefers-color-scheme: dark)`. Vercel does the same by filename (`notion-desktop-dark.webp`). See the technical section for the cost.

### Why a screenshot beats an abstract graphic

Three reasons, all mechanical:

1. **It is checkable.** A reader who has used a competitor can evaluate a screenshot in two seconds. They cannot evaluate a gradient.
2. **It answers the question the reader actually has** — "what will this look like when I'm in it?" — which no headline can.
3. **It cannot be produced by someone who does not have the product.** That is precisely why it reads as credible and why generated pages avoid it.

The boundary: a screenshot fails when the product is genuinely not visual (an API, a CLI, a background job) — in which case ship the *artefact*: a code block, a terminal session, a JSON response, a log line. Stripe's docs do this throughout. A terminal session with real output is a screenshot.

---

## Decision 7: logos and social proof

### The cliché and why it persists

"Trusted by teams at" over six grey logos at `opacity: 60%` is the corpus's canonical marketing tell (see [`references/editorial-luxury-and-marketing.md`](../references/editorial-luxury-and-marketing.md), §4). It persists because it is the cheapest possible credibility gesture. It fails because:

- **Desaturating a logo destroys the one property that made it recognisable at 24px.** Coca-Cola grey is not Coca-Cola.
- **Even spacing at a uniform height makes six logos look like a shortfall,** and makes square marks visually shout over wordmarks.
- **It is often an unfalsifiable or false claim.** The corpus has documented several: CopilotKit's "Trusted by the majority of the Fortune 500s and Global 50" with no stated basis; Tailark's "Used by **people at** Figma" (an individual-employee hedge, not corporate adoption) with the same two logos repeated to fill the row; Bklit's "TRUSTED BY PEOPLE AT_" over Stripe/Vercel/Supabase. And the template genre's terminal form: the Framer Marketplace's top-trending template ships a logo row reading **`LOGO · Logoipsum · LOGO · Lightdash`** — placeholder logos from a placeholder-logo generator, shipped as the demo.

### How to do it with substance

**Make the claim falsifiable and put the denominator in it.** Notion: *"Trusted by 98% of the Forbes Cloud 100"* at 14px w400 `rgba(0,0,0,0.54)`. There is a named list and a percentage of it. Basecamp: *"118,254 people are working in Basecamp right now!"* — a live count with six significant figures. Linear: *"Powering the companies building the future"* at 12px uppercase, which is honest about being a slogan and doesn't pretend to be data.

**Or replace the row with one named human.** Notion's testimonial alt text carries `Michael Truell, Co-founder and CEO of Cursor`, `Renee Solorzano, Sr. Director of Product Design at Faire`, `Ben Levick, Head of Operations & Internal AI at Ramp`. Name, title, company, photograph. One of those outweighs eight grey logos, because it is attributable and therefore risky to fake.

**Or use the artefact.** A quoted line from a public engineering blog, a GitHub dependents count, a G2 rating with the review count beside it. Mailchimp does the last one — *"Based on 33,000+ reviews"* with Capterra/TrustRadius/G2 marks — which is weaker than a named customer but stronger than a grey logo, because the number is checkable.

### Grayscale conventions, concretely

Three approaches, ranked:

1. **Ship a pre-monochromed asset per brand.** Notion's files are literally named `Figma_Wordmark__Black_.svg` and `cursor-logo-mono.svg`. This is best because a designer decided, per logo, what the monochrome version should be — often not a naïve desaturation, since many marks have a specific one-colour lockup the brand publishes.
2. **`filter: grayscale(1)` at full opacity.** Slack's approach — six elements at `grayscale(1)`, `opacity: 1`. Acceptable. Mechanical, but at least the marks retain their value structure.
3. **`grayscale + opacity: 0.6`.** The generated default. Avoid. You have now applied two reductions, and a light-grey mark on a white ground can drop below 3:1.

**Sizing:** never a uniform height. Vercel's row holds six marks at **20, 35, 17, 21, 28 and 45 px** rendered heights in a single 1392×44 container. Set each logo's height so its *optical mass* matches its neighbours — wordmarks taller in width and shorter in height, square marks the reverse. Do it by eye at final size, then freeze the numbers.

**Dark mode:** do not `invert()` a colour logo — you get a photographic negative. Either ship a `-white.svg` per brand, or, for logos that are already pure black, `filter: brightness(0) invert(1)`, which Notion uses on three elements. That pair collapses any colour to black then flips to white, which is correct only for marks that read fine as a solid silhouette.

---

## Decision 8: icons in composition

Choosing an icon *set* is a library decision. Placing an icon is a craft decision, and it has three parts.

### Optical sizing next to text

The measured band is **0.85×–1.35× the adjacent font-size**, and the direction depends on the icon's own density:

- A **solid, dense glyph** (a filled circle, a chevron) reads larger than its box and should sit at the low end. Stripe docs run a **12px** icon next to **14px** text.
- A **line icon at 1–1.5px stroke** reads smaller than its box and can sit at 1.0–1.15×. Linear runs 14px icons next to 13px text; GitHub runs 16px next to 14px.
- Cap-height, not font-size, is the real reference. Align the icon's optical centre to the text's **cap-height centre**, not to the line box — which in practice means `align-items: center` on a flex row plus a 1px nudge you check in a screenshot.

Gaps landed at **4px, 6px or 8px** across every product measured. Nothing wider.

### When an icon adds scan speed and when it adds noise

An icon accelerates scanning when it is the **fastest discriminator in the row**. In Linear's sidebar the icons differ from each other more than the words do at a glance, so the eye lands on shape first. In a settings list where every row is a toggle, an icon per row adds twelve decorations and zero discrimination.

Three tests before adding one:

1. **Does it repeat across rows?** If ten rows carry the same icon, delete it.
2. **Is it a metaphor a first-time user resolves in under a second?** A gear is settings. A "sparkle" is not "AI" to anyone who hasn't been trained on the convention, and the corpus flags a sparkle on anything that isn't literally generation as a tell ([`libraries/_research/ai-interfaces.md`](../libraries/_research/ai-interfaces.md)).
3. **Would the row be ambiguous without it?** If the label alone is unambiguous, the icon is decoration.

Icons genuinely earn their place in: navigation rails (where they may be the only affordance at collapsed width), status/severity (where the shape encodes a value colour alone cannot, for colour-blind users), file and content types, and destructive actions (where redundancy is a safety feature).

### Icon + label vs icon-only

**Icon-only requires all three:** an unambiguous universal metaphor (close, search, back, play), a real `aria-label`, and a tooltip. Two out of three is a bug. Toolbars in dense creative tools are the case where icon-only is right, because the user is repeating the action hundreds of times and label width is the binding constraint.

**Everywhere else, ship the label.** A 24px icon button saves ~50px of width and costs comprehension. Vercel's nav pairs a 24px icon with 22px text. GitHub's repo tabs pair 16px icons with 14px labels.

### Consistency of metaphor

One concept, one icon, everywhere, forever. The failures are always the same three:

- **The same idea drawn twice.** A trash can in one place and an ✕ in another for "delete."
- **Two ideas drawn once.** A single "download" arrow used for both *download* and *import*.
- **Mixed families.** An outline icon from one set beside a filled icon from another. Pick outline *or* filled as the base state and use the other exclusively to mean "selected" — which is a system, not an inconsistency.

Also keep **colour policy** consistent. Linear demotes sidebar icons one neutral level below their labels (`#62666D` icon, `#D0D6E0` label); Stripe matches icons to their label colour exactly. Either is right. Doing both on the same page is not.

---

## Technical

### Formats

| Format | Use for | Notes |
|---|---|---|
| **AVIF** | Everything raster, first choice | Measured 2.4× smaller than JPEG on a photograph, **13× smaller than PNG on a UI screenshot**. Supports alpha and HDR. Encodes slowly — a build-time cost, not a runtime one. |
| **WebP** | The single fallback | Measured 1.6–1.7× larger than AVIF. Universally supported. One `<source type="image/webp">` covers everything AVIF doesn't. |
| **JPEG** | Final fallback in `<img src>` | Apple still ships their entire MacBook Pro page as JPEG — 1,023 KB across 10 images. That is a deliberate compatibility choice at Apple's scale, not a template to copy. |
| **PNG** | Almost never | Only when you need exact lossless pixels *and* AVIF's lossless mode isn't available in your pipeline. Slack's 3,441 KB of PNG is the cost of not deciding. |
| **SVG** | Logos, icons, illustration | Duolingo's entire illustration system is **55 SVG requests / 335 KB**, and it scales to any density for free. Watch the tail: their largest single SVG is **121 KB**, which is a raster-traced file that should have been AVIF. Rule of thumb: an SVG over ~30 KB is a raster in disguise. |
| **Video (`.mp4`/`.webm`)** | Motion that is content | Slack ships five `autoplay muted loop` videos with `poster` frames at 641px; Airbnb ships six 72×72 `.webm` category icons with posters; Notion ships one 958×599 autoplay hero. Always `muted`, always `playsinline`, always a `poster`, and always respect `prefers-reduced-motion`. |

### Responsive images: the three correct patterns

**1. Fixed-width CDN param — simplest, and enough for most product UI.** Airbnb: `?im_w=720` for a 307px box, no `srcset`, no `sizes`. Linear: `f=auto,fit=scale-down,metadata=none,width=1440`. Note Linear's `f=auto`, which negotiates AVIF/WebP off the `Accept` header — this is why 6 of 6 Linear image responses came back AVIF.

**2. `srcset` + `sizes` — required when the box width varies with viewport.** Get `sizes` right or don't bother; Slack's 42 `srcset` attributes with zero `sizes` are a pure regression. Stripe's is the model:

```html
<img srcset="…-640.avif 640w, …-1232.avif 1232w, …-2464.avif 2464w"
     sizes="(min-width: 1298px) 1232px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
     alt="Aerial view of a street intersection where the crosswalks form a diagonal">
```

**3. `<picture>` with `<source type>` and/or `<source media>`.** Two distinct jobs, often confused:

```html
<picture>
  <!-- format negotiation -->
  <source type="image/avif" srcset="hero.avif">
  <source type="image/webp" srcset="hero.webp">
  <!-- art direction: a DIFFERENT CROP, not just a different size -->
  <source media="(max-width: 839px)" srcset="hero-square.avif">
  <img src="hero.jpg" alt="…" width="1232" height="531">
</picture>
```

Apple uses **109 `<picture>` elements** and zero `srcset` on `<img>` — everything happens in `<source>`. Notion uses `<source media="(min-width: 840px)">` / `(max-width: 839px)` for genuine re-crops. Airbnb wraps 48 images in `<picture>`.

**Oversupply is the common bug.** Measured: Slack's G2 badges at 868px natural into 104px boxes (**4.17×**), Basecamp's `walkthrough-09-26.webp` at 1600px into a 137px box (**5.8×**), a Linear activity avatar at 144px natural into a 14px box (**≈5×**), Notion's `Figma_Wordmark__Black_.svg` at 300px into 62px. Target **2× the CSS box** and stop. Above 3× you are paying for pixels no display can resolve.

### Placeholders: LQIP, BlurHash, ThumbHash

The purpose is not "a loading state." It is that a placeholder matching the image's actual colour makes a slow gallery *feel* fast in a way a spinner never does, and it eliminates the white-flash-then-image transition that reads as jank.

| Technique | Payload | Verdict |
|---|---|---|
| **Dominant colour** | 4 bytes | The floor. Extract one colour at upload, store it on the row, paint it as the wrapper's background. Costs nothing, works everywhere, and is enough for most product UI. |
| **ThumbHash** | ~25 bytes | **Preferred.** Sharper reconstruction than BlurHash, better on high-contrast subjects, and — the one that matters — it handles **alpha**. Re-verified 2026-09-10: ★4,206, 241,941 downloads/wk, last published 2023-03-22. |
| **BlurHash** | ~20–30 ASCII chars | Works fine; strictly worse on every axis. Re-verified 2026-09-10: ★17,069, **1,214,784 downloads/wk** — 5× ThumbHash's usage purely on being three years earlier. |
| **LQIP (tiny inline JPEG/AVIF)** | 300 B – 2 KB | Higher fidelity than either hash, but 10–80× the payload and it inflates your HTML. Use only for a single hero. |
| **Spinner over an empty box** | 0 | Wrong. It draws attention to the wait. |

Both hash formats are **frozen by design** — a hash format that churns breaks every stored value — so their stale npm dates are not a red flag. Corpus verdict unchanged from [`libraries/_research/maps-3d-media.md`](../libraries/_research/maps-3d-media.md): use one and stop shipping grey boxes.

### Aspect-ratio boxes and CLS

Every image must reserve its space before it loads. Three mechanisms, in order:

```html
<!-- 1. width + height attributes: the browser derives the ratio. Cheapest. -->
<img src="hero.avif" width="1232" height="531" alt="…">
```
```css
/* 2. aspect-ratio on the wrapper, for cropped/variable sources. */
.media { aspect-ratio: 4 / 3; overflow: hidden; }
.media > img { width: 100%; height: 100%; object-fit: cover; }
```
```css
/* 3. Legacy padding-top hack — only if you must support a browser without aspect-ratio.
      You almost certainly don't in 2026. */
```

The measured counts tell you who takes this seriously: **Notion 104 elements with a non-`auto` `aspect-ratio`, Mailchimp 103, Stripe 96, Airbnb 62, Linear 40, Vercel 28 — Slack 7, Apple 1.** Apple gets away with it because every one of their 109 `<picture>` blocks carries explicit `width`/`height`; Slack does not, and their page shifts.

Also set `loading="lazy"` on everything below the fold and `fetchpriority="high"` on the LCP image only. Mailchimp lazy-loads 80 of 82. Vercel marks 2 of 5 `eager` and 3 `lazy`. Never lazy-load your hero — it delays LCP by a full round trip.

### Dark-mode image handling

Four strategies, in descending quality:

1. **Ship the asset twice.** Basecamp pairs every product screenshot: `-light.webp` / `-dark.webp` behind `<source media="(prefers-color-scheme: …)">`. Vercel does it by filename (`notion-desktop-dark.webp`). This is correct and it **doubles your screenshot budget** — Basecamp already sits at 3,721 KB of WebP in light mode alone. Budget for it before committing.
2. **Use SVG with `currentColor` or a CSS-variable fill.** Free for icons, logos and line illustration. This is why Duolingo's all-SVG system and Linear's 240 inline SVGs cost nothing to theme.
3. **Filter a light asset.** Notion applies `filter: brightness(1.4) saturate(0.25)` to an image in dark mode — lift the midtones, drain the colour so it stops vibrating against a dark ground. Acceptable for incidental imagery. It looks wrong on a screenshot, because UI screenshots have large flat white areas that filters cannot convincingly darken.
4. **Do nothing, but soften the edge.** For photographs, dark mode is usually fine as-is — real photographs contain their own dark values. Reduce brightness ~8% and add a hairline border so a bright photo doesn't glare: `filter: brightness(0.92); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.06)`.

**What not to do:** `filter: invert(1)` on anything. It produces a photographic negative for colour images and destroys brand logos.

### Alt text: decorative vs meaningful

The rule is a decision, not a description:

- **`alt=""` (empty, but the attribute must be present)** when the image adds nothing a sighted user gets that a screen-reader user doesn't already have from adjacent text. Airbnb's 76 empty alts are correct — each photo sits in a link whose accessible name is the listing title, price and rating. Stripe's 40 empty alts are correct — they are decorative gradients, bento graphics and icons beside labels.
- **A sentence** when the image carries information. Apple: *"A MacBook Pro screen showing a video getting enhanced with AI in Topaz Video"* — it says what is on the screen, because that is the point of the image. Stripe: *"Overhead view of a door stoop with a grocery delivery bag containing…"*.
- **Missing `alt` entirely** is never correct. Across every page I probed, `missing` was 0 — even Slack, which fails on everything else here, sets the attribute.
- **Do not over-alt.** Mailchimp's *"Four yellow filled stars and one yellow outlined empty star, representing a 4 ou…"* sits next to text already saying "4.5 based on 33,000+ reviews." A screen-reader user hears it twice. That graphic wants `alt=""`.
- **Functional images take the function, not the picture.** An icon inside a button is `alt=""` with the button labelled; a logo that links home is `alt="Notion — home"`, not `alt="Notion logo"`.

---

## When this advice is wrong

**"Pick two aspect ratios" breaks in editorial and portfolio work.** A magazine layout's *variety* of crops is its craft — a full-bleed, then a tall column, then a small inset. The rule is for systems where images are rows of a database. If your images are individually art-directed by a human, ratio variety is intent, not accident. Test: could a new image arrive tomorrow from a user? Then two ratios. Could it only arrive from your designer? Then as many as they choose.

**"Screenshot beats illustration" breaks when the product isn't visual or isn't built.** An API, a CLI, a background service, a pre-launch product. Ship the artefact (a code block, a terminal session) or ship nothing. Do not ship an illustration of a dashboard that does not exist.

**"AVIF everywhere" breaks in three places.** Email (no AVIF support in most clients — JPEG/PNG only). Anywhere users download and re-upload the asset (an export feature). And any build pipeline where AVIF's encode time would gate deploys — measure it; a large gallery can add minutes.

**"Never use stock" breaks in editorial and news.** A blog post about Lisbon needs a photograph of Lisbon and you did not go to Lisbon. Licensed editorial photography is the correct answer there. The prohibition is on stock as a *substitute for having something to show*.

**"Identicons look cheap" breaks for non-human entities.** Wallets, servers, API keys, anonymous sessions, bots. A deterministic pattern derived from a hash is the *only* honest visual for something with no name and no face — and GitHub is right to use one.

**"Illustration is padding" breaks for products whose brand is illustration.** Duolingo's illustration budget is not decoration, it is the product's differentiator; removing it would remove the reason people tolerate a language app that nags them. Same for Mailchimp's hand-drawn heritage. If illustration is load-bearing brand, the density rules in this file do not apply to you.

**"Grayscale logos are wrong" breaks when the logos are genuinely incompatible.** Eight brand palettes side by side can be visually violent. If you must neutralise, ship pre-made mono assets (Notion's approach), not a CSS filter, and never stack grayscale with reduced opacity.

**"Real screenshots with real data" breaks under privacy and NDA.** A healthcare or fintech product cannot show real records. Build a fictional-but-plausible dataset with real *shape* — realistic name distribution, realistic value ranges, realistic messiness — and label it as sample data where a reasonable person might mistake it for real.

---

## The generated version

**What AI output does here, in 2026:**

The old tells have largely gone. Corporate Memphis is rare, the purple 3D blob is rare, glassmorphism is rare — the corpus's own control baseline confirms it. What remains is a different and more boring failure:

1. **No imagery at all, in places that needed some** — and specifically: no product screenshot. A generated landing page for a real product will ship a headline, a badge pill, two CTAs, three feature cards with 24px outline icons, and never once show the product. The single highest-value correction available.
2. **A placeholder that was never replaced.** `/placeholder.svg`, a grey box with an image glyph, `via.placeholder.com`, or — the template-marketplace terminal case — a "trusted by" row containing literal **Logoipsum** marks, shipped as the demo on the current top-trending Framer template.
3. **`<img>` with no `width`/`height` and no `aspect-ratio` wrapper**, so the page shifts on load. This is the most common technical defect and it's invisible in code review.
4. **`object-fit` left at `fill`** on a user-supplied image, so portraits squash.
5. **Icons at 20–24px next to 14px text** with `gap-3` (12px), giving an icon/text ratio of 1.4–1.7× against a measured band of 0.85–1.35× and gaps of 4–8px.
6. **An outline icon in a rounded square on every one of three feature cards**, each icon a generic metaphor for the heading beside it.
7. **`grayscale opacity-60` on a logo row** under "Trusted by teams at", with the logos at a uniform `h-8`.
8. **A PNG screenshot at 1× density**, or an AVIF-capable pipeline shipping JPEG.
9. **`alt` filled with the filename, or with a keyword-stuffed sentence, on every image including the decorative ones.**
10. **An identicon/gradient-blob avatar library** (Boring Avatars, DiceBear `beam`) used for human colleagues.

**The specific corrections, in leverage order:**

| Generated | Correction |
|---|---|
| No image, or an abstract graphic, in the hero | One screenshot of your product with real data. Name real people, use real file sizes, include one truncated string and one number that isn't round. |
| `/placeholder.svg` or Logoipsum | Delete the element. An absent logo row is more credible than a fake one. |
| `<img class="w-full rounded-lg">` | `<div style="aspect-ratio:4/3;overflow:hidden">` + `<img style="width:100%;height:100%;object-fit:cover" width=… height=…>` |
| `srcset` with no `sizes` | Either write the real `sizes`, or drop `srcset` and use a fixed CDN width param at 2× the CSS box. |
| PNG screenshot | AVIF. Measured 13× smaller on the same asset. |
| 24px icon + 14px text + `gap-3` | 14–16px icon + 14px text + `gap-1.5` (6px), icon colour equal to or one neutral level below the label. |
| Three feature cards with generic icons | Three real screenshots at full-section width, or one screenshot and two sentences. |
| "Trusted by teams at" + grey logos at uniform height | A falsifiable number with a denominator ("98% of the Forbes Cloud 100"; "118,254 people right now"), or one named customer with title and company. Per-logo optical heights, pre-made mono assets. |
| Identicon avatars for humans | Initials on a hashed background, `font-weight: 500` at ~40% of the diameter, plus a 1px inset hairline ring. |
| `alt` on everything | `alt=""` for decoration (expect this to be the *majority* — Stripe is 40 of 44), a full sentence for the few that carry information. |

---

## Self-check

Run this against your own output. Every item is verifiable by reading your code or probing your rendered page — no judgement calls.

**Ratios and layout**
- [ ] Count the distinct rendered aspect ratios on one page. Is it ≤3? (Airbnb: 2. Slack: 8.)
- [ ] Does every `<img>` have either `width`+`height` attributes or a wrapper with a non-`auto` `aspect-ratio`? Count them; the number should equal your image count.
- [ ] Is `object-fit: cover` on every photograph and `contain` on every logo/icon? Is `fill` used only where you control the source dimensions?

**Content**
- [ ] Does any image in your product contain Lorem, `John Doe`, `Jane Smith`, `Project Alpha`, `example.com`, `$1,234.56`, or `/placeholder`? Grep for them.
- [ ] Is there at least one screenshot of your actual product on your marketing page?
- [ ] In that screenshot: are there at least two values of visibly different magnitude (a 1.86 MB file next to a 27.9 KB one)? At least one truncated string? At least one non-round number?
- [ ] Is any face on the page generated? Is any face on the page presented as a customer or employee without being one?

**Technical**
- [ ] `curl -sI` your largest image. Is the `content-type` `image/avif`?
- [ ] For each image, compute `naturalWidth / (renderedWidth × 2)`. Is anything above 3?
- [ ] Does any element have `srcset` without `sizes`?
- [ ] Sum your image bytes. Is it under 1 MB for a marketing page? (Vercel: 162 KB. Slack: 6,823 KB.)
- [ ] Does every below-fold image have `loading="lazy"`, and does the LCP image have neither `lazy` nor a missing `fetchpriority="high"`?
- [ ] Do images have a colour or ThumbHash placeholder, or do they flash white?

**Dark mode**
- [ ] Load the page with `prefers-color-scheme: dark`. Does any screenshot still show a white app on a dark page?
- [ ] Is any logo being `invert(1)`-ed into a negative?

**Icons**
- [ ] For each icon+label pair, is `iconWidth / fontSize` between 0.85 and 1.35?
- [ ] Is the gap 4, 6 or 8px?
- [ ] Does any concept have two different icons anywhere in the product?
- [ ] Does any icon-only button lack an `aria-label` or a tooltip?

**Avatars**
- [ ] Does a user with no photo get initials, not a silhouette and not an identicon?
- [ ] Does a broken avatar URL show a broken-image glyph? (Break one and look.)
- [ ] Is there a hairline ring so a white-background photo has an edge?

**Alt**
- [ ] What fraction of your `alt` attributes are empty? If it is under ~50% on a marketing page, you are probably over-alting.
- [ ] Is any `alt` a filename?
- [ ] Does any `alt` duplicate text that is already visible beside it?

**Social proof**
- [ ] Is your "trusted by" claim falsifiable — does it contain a number and a denominator?
- [ ] Are any logos in the row placeholders, or repeated to fill space?
- [ ] Are all logos at the same rendered height? (They should not be.)

---

## Sources

Screenshots in `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/img-*.png`; probe scripts and raw JSON in the session scratchpad. Every value below was read from the live page on 2026-09-09/10.

- **airbnb.com/s/Paris--France/homes** — the reference implementation for uncontrolled imagery. 77 images at exactly two ratios (`1.000`×48, `1.333`×28); cards render 307×230 from wrappers carrying `aspect-ratio: 4/3`, with `object-fit: cover` and `object-position: 50% 50%`. Source naturals disagree: 720×480, 720×540, 720×480, **720×1080**. Delivery by `?im_w=720` with no `srcset`/`sizes`. 48 `<picture>`, 62 aspect-ratio boxes, 39 AVIF (637 KB) + 19 PNG (755 KB). 76 of 77 alts empty. Six 72×72 `.webm` category icons with posters. Overlay badges sit in their own opaque white pills — never bare text on a photo.
- **stripe.com** — 44 images, **40 `alt=""` and 4 descriptive sentences**, all four being real documentary photographs of businesses (Parisian kiosk, door stoop, boutique, aerial crosswalk) at 1232×531 / `aspect-ratio: 2460/1060`, 7 srcset candidates and a three-clause `sizes`. 44 `<picture>`, 96 aspect-ratio boxes, 183 inline SVG. 1,108 KB total. The bento phone shows a **German-localised** checkout (`Zahlungsinformationen`, `Oder mit Karte bezahlen`, `€149.00`, Klarna selected) beside a fraud panel reading `0.06% / 0.02% / 0.08%`.
- **linear.app** — hero is a full product screenshot: issue `DRV-8852 Faster app launch`, body copy about `vehicle_state` sync, a `1 / 84` counter, an agent panel reading "Worked for 10 sec". All imagery through Cloudflare `imagedelivery` with `f=auto` (6/6 responses AVIF). 240 inline SVG, 0 `<picture>`, 40 aspect-ratio boxes. Avatars at **36px / `border-radius: 6px`** in the team row and 14px / `50%` in the activity feed; one served 144×144 into a 14px box. Logo eyebrow *"Powering the companies building the future"* at 12px w400 uppercase `rgb(98,102,109)`.
- **apple.com/macbook-pro** — one rim-lit product photograph on black, no environment, type in the empty lower-left. **109 `<picture>` elements, 0 `srcset` on `<img>`, 1 aspect-ratio box** (they rely on explicit `width`/`height`). Entirely JPEG: 10 requests, 1,023 KB, heaviest 248 KB. 31 of 89 alts descriptive (*"A person at an airport using their MacBook Pro"*). Videos at 2880×900, 1728×912, 1260×680.
- **basecamp.com** — hero screenshot with fully real data: Geoff Collier / Leah Bernstein / Kurt Holloway / Liza Randall, `Hero Image.png · Jul 20 · 1.86 MB`, `FAQ Entries.md · Jul 20 · 27.9 KB`, a July 2026 calendar, kanban counts `(9)(6)(4)(2)(2)`, live Figma/Drive/Zoom links, and *"118,254 people are working in Basecamp right now!"* as social proof. **Every product screenshot ships as a `-light.webp` / `-dark.webp` pair behind `<source media="(prefers-color-scheme: …)">`** — verified by loading the page under both schemes. Cost: 3,721 KB of WebP across 23 requests, heaviest `view-chat-light.webp` at **677 KB**.
- **notion.com** — two-register illustration system: black ink doodle characters (outline only, no fill) around a real product screenshot, with full-colour circular app icons (Slack, Gmail, HubSpot, Drive) as the only coloured elements. Logo row under *"Trusted by 98% of the Forbes Cloud 100"* (14px w400 `rgba(0,0,0,0.54)`), logos as **pre-monochromed assets** — `Figma_Wordmark__Black_.svg`, `cursor-logo-mono.svg`, `Ramp.svg` at 300px natural rendered 62–82px wide. Dark mode uses `filter: brightness(1.4) saturate(0.25)` and `brightness(0) invert(1)`. 104 aspect-ratio boxes. Testimonial alts carry full attribution: *"Michael Truell, Co-founder and CEO of Cursor"*.
- **duolingo.com** — illustration system as **55 SVG requests / 335 KB**, one ratio (`1.297`) covering 42 of 52 images, zero `srcset`. Flat vector with **no outlines**, saturated primaries matching the UI palette, a named recurring cast rather than a style. Largest single SVG 121 KB (a traced raster that wants to be AVIF).
- **mailchimp.com** — the most responsive-image-disciplined page measured: `sizes` on 68 of 82, `srcset` on 63, 46 `<picture>`, 103 aspect-ratio boxes, 80 of 82 lazy. Hero is an art-directed photograph of a bike-shop workspace whose screen shows a real Mailchimp automation canvas for a real customer product ("OAT LORD") — but under a heavy dark scrim so white type survives, which leaves the photograph doing little work. Over-alts: 73 of 82 have text, including a five-star graphic described in full next to the same information in prose. 464 KB of PNG for 3 images.
- **slack.com** — the counter-example on almost every axis. 96 image requests, **6,823 KB, zero WebP, zero AVIF** (PNG 3,441 KB + JPEG 3,379 KB). `srcset` on 42 images, `sizes` on **0**. Eight distinct aspect ratios across 50 images. 7 aspect-ratio boxes. G2 badges at 868px natural into 104px boxes. Logo row via `filter: grayscale(1)` at `opacity: 1` under *"Trusted by top teams"* (12px w400 `rgb(117,117,117)`), alt text `GM Logo` / `OpenAI Logo` / `Target Logo` / `Paramount Logo` / `Stripe Logo`. Five `autoplay` videos with posters.
- **vercel.com** — 5 images, 162 KB total, all five with descriptive alt sentences. Logo row: six marks at rendered heights **20 / 35 / 17 / 21 / 28 / 45 px** in one 1392×44 container — optical sizing, not a uniform box. Dark assets by filename (`notion-desktop-dark.webp`, `zapier-desktop-dark.webp`). 47 inline SVG, 28 aspect-ratio boxes.
- **github.com** (contributors, discussions) — avatar convention: `border-radius: 50%` plus `box-shadow: rgba(31,35,40,0.15) 0 0 0 1px` as a hairline ring (box-shadow, not border, so no layout cost). Served `?s=60` for 40px boxes, `?s=32` for both 32px (1×, soft on retina) and 16px (2×) boxes.
- **jasper.ai** — zero imagery above the fold in 2026: serif headline, subhead, two buttons. Evidence that "no image" is a live option for a funded company.
- **framer.com/marketplace** — the template genre, current. Top-trending "Sentira" ships an AI-generated wireframe-topography hero **and a logo row reading `LOGO · Logoipsum · LOGO · Lightdash`**. "Fabrica" ships AI-generated black smoke. "MaestroClass" ships a laptop-on-a-couch mockup.
- **tailark.com** — a shadcn marketing-block registry whose own hero demo uses a stock/AI photograph of a wrist and smartwatch with blown highlights and no locatable light source. The 2026 Unsplash desk.
- **Format A/B** — `curl -H "Accept: …"` against the live CDNs, 2026-09-10. Airbnb listing photo @720w: AVIF 12,455 B / WebP 20,232 B / JPEG 29,997 B. Linear hero @1440w: AVIF 5,345 B / WebP 9,074 B / PNG 69,561 B.
- **npm/GitHub, re-verified 2026-09-10** — thumbhash 241,941 wk / ★4,206 / last push 2024-05-26; blurhash 1,214,784 wk / ★17,069 / last push 2024-07-08; sharp 69,643,139 wk; @unpic/react 1,299,485 wk. Consistent with [`libraries/_research/maps-3d-media.md`](../libraries/_research/maps-3d-media.md), whose verdict this file adopts rather than re-deriving.
