# Imagery, illustration and visual assets

**Evaluated:** 2026-09, re-probed 2026-09-10 — see [Review pass](#review-pass-2026-09) for what changed. Every number was read off a live page: computed styles, `naturalWidth`, `<picture><source>` media queries, HTTP `Content-Type`/`Content-Length`, or a format A/B run by varying the `Accept` header against the real CDN. **Per-page image *counts* drift** with lazy-load depth, A/B bucket and search results; ratios, byte sizes and per-element geometry do not. Where I could not measure, I say so.

This is the craft file for *what goes in the image slot*. Which icon library to install lives in [`libraries/icons-and-typography.md`](../libraries/icons-and-typography.md); this file is about how an icon behaves next to a word.

---

## If you only apply five things

1. **Pick two aspect ratios for the whole product and enforce them with `aspect-ratio` on the wrapper, not on the image.** Airbnb's Paris search page renders every photograph at `1.000` or `1.333` while the host uploads arrive at 720×480, 720×540 and **720×1080**. A portrait and a landscape land in the identical 307×230 box because the wrapper carries `aspect-ratio: 4/3` and the `<img>` carries `object-fit: cover`. Slack ships eight ratios with more than one instance each, 24 distinct in total. Two ratios is a system; eight is an accident. **Scope:** a centre `cover` crop is safe when the subject is an environment and destructive when it is a framed human or a vertical video — see *When this advice is wrong*.

2. **A real screenshot of your own product beats every abstract graphic, and the thing that makes it real is the data in it.** Basecamp's hero is one product screenshot containing named people (Geoff Collier, Leah Bernstein, Kurt Holloway, Liza Randall), a file list reading `Hero Image.png · Jul 20 · 1.86 MB` and `FAQ Entries.md · Jul 20 · 27.9 KB`, a July 2026 calendar with real events, and three external links pointing at actual Figma/Drive/Zoom URLs. Linear's hero is issue `DRV-8852` with the body text *"Render UI before `vehicle_state` sync when minimum required state is present, instead of blocking on full refresh during iOS startup."* Neither page has a single abstract shape on the fold. Lorem, `John Doe`, `$1,234.56` and `Project Alpha` destroy this in one pass.

3. **Ship AVIF, and know what it buys you.** Same Airbnb listing photo at 720px, negotiated by `Accept` on their live CDN: **AVIF 12,455 B · WebP 20,232 B · JPEG 29,997 B**. Same Linear hero screenshot at 1440px: **AVIF 5,345 B · WebP 9,074 B · PNG 69,561 B — 13× smaller than the PNG.** Photographs gain ~2.4× over JPEG; flat UI screenshots gain an order of magnitude over PNG. Slack still ships **6,823 KB of images with zero WebP and zero AVIF** (PNG 3,441 KB + JPEG 3,379 KB, re-confirmed 2026-09-10). It is not their biggest asset problem: the same page pulls **20 distinct autoplay videos, 44 MB unique** — 6.5× the image payload. On any page that autoplays, audit video before images.

4. **`srcset` without `sizes` is worse than neither.** Slack sets `srcset` on **71 images and `sizes` on zero**, so the browser assumes `100vw` and downloads the widest candidate for a 300px slot. Their G2 badges arrive at 868px natural for a 104px box — 4.17× oversupply even at 2× DPR. Stripe's four customer photographs each carry **seven candidates** plus `sizes="(min-width: 1298px) 1232px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"` — re-counted 2026-09-10. Mailchimp sets `sizes` on 68 of 82 images and is the most disciplined page in this sample. If you cannot write a correct `sizes`, use a fixed-width CDN param instead — Airbnb just appends `?im_w=720` and ships no `srcset` at all.

5. **Decorative images take `alt=""`; content images take a sentence.** Stripe's homepage carries 52 `<img>`: **47 are `alt=""`**, and the five that aren't are the four documentary photographs plus a book cover, each with a full sentence — *"Aerial view of a street intersection where the crosswalks form a slanted parallelogram…"*. Apple: 73 empty, 37 descriptive. **This majority-empty shape is a *marketing-page* shape.** On a catalogue, a photo gallery, a docs page whose screenshots carry the instruction, or any clinical or scientific surface the ratio inverts and near-100% descriptive is correct. The test is never the ratio; it is whether the image carries information the adjacent text does not.

---

## The measured reference

### Format cost, measured by Accept negotiation (2026-09-10)

Same source asset, same CDN, same requested width; only the `Accept` header changed.

| Asset | AVIF | WebP | JPEG / PNG | AVIF advantage |
|---|---|---|---|---|
| Airbnb listing photograph, `im_w=720` | **12,455 B** | 20,232 B | 29,997 B (JPEG) | 1.62× vs WebP, **2.41× vs JPEG** |
| Linear hero screenshot, `width=1440` | **5,345 B** | 9,074 B | 69,561 B (PNG) | 1.70× vs WebP, **13.0× vs PNG** |

The second row is the one agents get wrong. A UI screenshot is flat colour and hard edges — the case PNG was designed for — and AVIF still beats it by 13×. There is no remaining reason to ship a PNG screenshot.

**But `f=auto` is not the same as "AVIF."** Two traps, both measured on Linear's own Cloudflare endpoint, both silent:

| Same asset, same `f=auto` transform | Returns |
|---|---|
| `…/f=auto,fit=scale-down,metadata=none` (no width) | **PNG, 1,057,126 B** — for every `Accept`, including one advertising AVIF |
| `…,width=1440` | **AVIF 33,672 B** / WebP 42,054 B / PNG 383,655 B |

One missing URL parameter costs 31×, and Linear ships that exact URL: a **1,032 KB PNG** is the single heaviest asset on their homepage. Separately, their hero requests `width=2560`, and at that width the same endpoint returns **WebP (25,958 B) even when the client advertises AVIF** — the converter declines above a size threshold. Assert the response `Content-Type`; do not assume the transform did what its name says.

### What each product actually ships

Rows marked † were re-probed 2026-09-10 with a full lazy-scroll, which pulls in more images than the first pass; where the two disagree the re-probe wins.

| Product / surface | Images | Formats (requests / bytes) | Ratios in use | `srcset` / `sizes` | `<picture>` | `aspect-ratio` boxes | alt empty / text / **missing** |
|---|---|---|---|---|---|---|---|
| **Airbnb** search (Paris) † | 73 | AVIF 38 (717 KB), PNG 14 (579 KB), WebP 1 | **2** photo ratios — `1.000`, `1.333` | 2 / 2 | 46 | 115 | 52 / 1 / **20** |
| **Stripe** home † | 52 | **WebP 38 (3,786 KB)**, PNG 3, GIF 29 — **zero AVIF** | `1.000`×8, `0.768`×8, `0.930`×4, `2.321`×4 | 50 / 13 | 52 | 115 | 47 / 5 / 0 |
| **Linear** home † | 39 | AVIF 29 (256 KB) **+ PNG 1 (1,032 KB) + JPEG 1 (338 KB)** — 1,652 KB | `1.000`×34, `1.791` hero | 0 / 0 (CDN width param) | 0 | 40 | 27 / 12 / 0 |
| **Apple** MacBook Pro † | 111 | **JPEG 36 (12,699 KB) + PNG 14** — no AVIF, no WebP; plus **mp4 12 (20,314 KB)** | `1.000`×46, `1.642`×6, `1.853`×5 | 0 / 0 (all in `<source>`) | **109** | 1 | 73 / 37 / 1 |
| **Notion** home | 58 | SVG 43, WebP 30 (718 KB), via `/image?url=…&q=75` | `1.000`×27, `3.5`×5, `3.583`×3 | 31 / 11 | 9 | 104 | 52 / 6 / 0 |
| **Duolingo** home | 52 | **SVG 55 (335 KB)**, PNG 1, GIF 1 | `1.297`×42 (one ratio does 81%) | 0 / 0 | 1 | 8 | 50 / 2 / 0 |
| **Basecamp** home | 20 | WebP 23 (3,721 KB), SVG 5, JPEG 2 | `0.95`×11, `1.000`×6, `1.778`×3 | 0 / 0 | 17 | 8 | 13 / 7 / 0 |
| **Mailchimp** home | 82 | SVG 38, GIF 12, AVIF 10, WebP 5, **PNG 3 (464 KB)** | `1.333`×34, `1.000`×7, `3.2`×4 | 63 / **68** | 46 | 103 | 9 / 73 / 0 |
| **Slack** home † | 89 | **PNG 48 (3,441 KB) + JPEG 23 (3,379 KB)**, zero WebP/AVIF; plus **20 videos, 44 MB** | 8 recurring, 24 distinct | 71 / **0** | 0 | 7 | 33 / 56 / 0 |
| **Vercel** home † | 19 | AVIF + WebP + SVG, 162 KB in the first pass | `1.785`×2, `1.898`, `3.19`, `1.151` | 14 / 12 | 0 | 28 | 3 / 16 / 0 |

Read the last column as a diagnostic. Mailchimp at 73-of-82 descriptive is over-alting on a *marketing* page — their star-rating graphic carries *"Four yellow filled stars and one yellow outlined empty star, representing a 4 ou…"* next to text already saying the same thing. Airbnb's empty alts are correct, because every listing photo sits inside a link whose accessible name is the listing title.

**The correction the first pass got wrong:** missing `alt` is not zero in the wild. Airbnb ships **20 `<img>` with no `alt` attribute at all** — every one a 16px amenity or badge icon, exactly the class that should carry `alt=""`. A screen reader falls back to announcing the filename, so a `4d090f93-f9a5-4f0…jpeg` is read aloud twenty times. Grep your own output for `<img` without `alt`; a linter catches this and a code review does not.

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

**Scope:** every measurement here is a pointer-driven, arm's-length surface running 12–16px body text. The band does not transfer to 10-foot UI (TV, kiosk), automotive HMI, or an accessibility mode where the icon must also be a glance or touch target — there the icon is sized by viewing distance and hit area, and 4–8px gaps disappear entirely.

### Logo-row conventions, measured

| Product | Eyebrow copy | Eyebrow type | How logos are monochromed | Sizing |
|---|---|---|---|---|
| **Notion** | *"Trusted by 98% of the Forbes Cloud 100"* | 14px w400 `rgba(0,0,0,0.54)` (4.6:1) | **Pre-made mono assets** — `Figma_Wordmark__Black_.svg`, `cursor-logo-mono.svg` | Widths 62–82px, per-logo, not a uniform box |
| **Linear** | *"Powering the companies building the future"* | 12px w400 **uppercase** `rgb(98,102,109)` | inline SVG at brand-neutral fill | per-logo |
| **Slack** | *"Trusted by top teams"* | 12px w400 `rgb(117,117,117)` | **`filter: grayscale(1)` at `opacity: 1`** | uniform-ish |
| **Vercel** | (none on the row I measured) | — | true black inline SVG, `filter: none`, `opacity: 1` | **seven** marks at heights **20 / 35 / 17 / 21 / 28 / 45 / 30 px** — widths 127 / 69 / 147 / 78 / 98 / 58 / 130 — in one 1392×44 row |

Vercel's row is the instructive one: seven logos at seven different rendered heights (re-measured 2026-09-10), because a wide wordmark and a tall square mark reach equal optical weight at different pixel heights. Setting a uniform `height: 32px` on a logo row is the generated move; it makes square marks shout and wordmarks vanish.

Notion's eyebrow is the other lesson: *"98% of the Forbes Cloud 100"* is a falsifiable claim with a named denominator. *"Trusted by top teams"* is not a claim at all.

---

## Decision 1: does this slot need an image?

The most common failure in generated UI is not a bad image — it is an image in a place that wanted none.

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

**The evidence for "none at all," corrected.** The first pass cited Jasper as shipping zero hero imagery. That is **no longer true, and the way it fails is instructive**: as of 2026-09-10 Jasper's fold carries a `1440×420` **`<canvas>`** at `top: 546px` compositing a cut-out photograph of a person, a pink grid, a `+35%` stat card and floating UI chips out of AVIF assets (`Grid Illo.avif`, `Home - BV (Plain).avif`) — plus a thirteen-logo row under *"World-class marketing teams trust Jasper"*, which is the unfalsifiable claim §7 warns about. **A `document.querySelectorAll('img')` audit returns nothing for that fold.** Canvas, WebGL and CSS `background-image` heroes are invisible to every `<img>`-counting audit in this file, including the self-check. Screenshot the page; do not trust the element count.

Vercel still holds the line: **162 KB of imagery** against Slack's 6.8 MB of images plus 44 MB of video. That is the real comparison. Empty space next to a strong sentence reads as certainty; a generic graphic next to a strong sentence reads as hedging.

Anthropic ships zero hero CTAs and near-zero hero imagery for the same reason (see [`references/editorial-luxury-and-marketing.md`](../references/editorial-luxury-and-marketing.md)). The rule stands: **if the only justification is "the section looked bare," delete the image and reduce the section's height instead** — unless your audience does not read your language fluently, in which case see *When this advice is wrong*.

---

## Decision 2: photography in product UI

### When a product genuinely needs photography

Three cases, and they are narrower than people assume.

**1. The photograph is the inventory.** Airbnb, e-commerce, real estate, food delivery, marketplaces, dating. The photo is not decoration, it is the row of the database the user is shopping. Everything in this file about crops, ratios, `object-fit` and placeholders exists for this case.

**2. The photograph is the argument.** Apple's MacBook Pro hero is one rim-lit product shot on pure black: no environment, no hands, no desk. The type sits in the empty lower-left quadrant and never crosses the object. It works because the object is the thing being sold; it fails immediately for a SaaS product, because there is no object.

**3. The photograph documents a real customer.** Stripe ships four photographs on its homepage — a Parisian newspaper kiosk, an overhead door stoop with a delivery bag, a clothing boutique exterior, an aerial crosswalk. All four are 1232×531 (`aspect-ratio: 2460/1060`), all four have descriptive alt sentences, and all four show *places where Stripe's payments happen* rather than *people using Stripe*. That is the distinction between documentary and stock: the subject is the business, not a model performing enthusiasm.

Everywhere else — a B2B dashboard, a developer tool, an internal admin — photography is decoration, and the honest version of the slot is a product screenshot or nothing.

### Art direction: the four variables that make a set cohere

A set of photographs reads as one system when four things are constant. Change one deliberately; changing three by accident is what "we bought a stock pack" looks like.

- **Subject distance.** Stripe's four homepage photographs are all one middle distance — a whole shopfront or doorway fills the frame, no close-ups, no cityscapes.
- **Light direction and quality.** Apple: single hard key from behind-left, rim on the lid edge, deep black falloff, no fill. Mailchimp: warm window daylight, visible shadow. Mixing hard studio light and window daylight in one grid is the fastest way to make a set look bought.
- **Colour temperature and grade.** Pick one and apply it. If you cannot grade, shoot in one location on one day.
- **The crop.** See below — one ratio for the set.

### Aspect ratios and why picking two matters

Airbnb is the proof. Two photograph ratios against source files that disagree wildly — 720×480 (3:2), 720×540 (4:3), 720×960 and 720×1080 (2:3, portrait). Every listing card renders at **307×230**, ratio `1.333`, because:

```css
/* the wrapper owns the shape */
.card-media { aspect-ratio: 4 / 3; overflow: hidden; }
.card-media img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%; }
```

Three properties in the correct places. The mistakes to avoid:

- Putting `aspect-ratio` on the `<img>` and leaving `object-fit: fill` — the image squashes instead of cropping. Stripe does this on 27 of its 52 images, which is safe only because those sources already match their boxes exactly. It is not safe for anything user-supplied.
- Setting a fixed `height` and letting width vary. The row height stays honest, the crop does not.
- Using `object-fit: contain` for photographs. `contain` letterboxes, which puts your background colour inside the content area and makes a grid look like a slide deck. Airbnb uses `contain` on 20 images — all of them **icons and brand marks**, where letterboxing is correct — and `cover` on the 35 that are photographs. That split is the rule: `cover` for photos, `contain` for logos and icons, `fill` only when you control the source dimensions exactly.

### Focal points: when they matter and when they are theatre

Airbnb sets `object-position: 50% 50%` on every listing photo. No focal-point system, no ML crop. That is defensible because a 4:3 centre crop of a room is almost never wrong — rooms are wide and their subject is the middle.

Focal points earn their complexity in exactly two situations:

1. **Faces and vertical compositions.** A centre crop of a portrait at 1:1 decapitates roughly a third of them. Detect the face, or store a per-image `object-position` set once by a human at upload.
2. **Extreme ratio changes across breakpoints.** If the same source renders 21:9 on desktop and 1:1 on mobile, the centre of one is not the centre of the other. This is what `<picture>` with `<source media>` is for — a different *crop*, not a different *size*. Notion ships exactly that: `(min-width: 840px)` and `(max-width: 839px)` pointing at differently-cropped renditions.

If neither applies, ship `50% 50%` and spend the effort elsewhere.

### Avatars and fallbacks

**1. The user's own photo.** Circle at ≤32px, `object-fit: cover`, `object-position: 50% 50%` (a portrait cropped square from centre is fine; the head is near the middle in a selfie). Add the GitHub hairline: `box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.08)`.

**2. Initials on a deterministic colour.** One or two characters, the background hashed from the user ID (never from the name — people rename), the text colour chosen for contrast against that background rather than always white. A wall of initials is *scannable*: you can find "KH" among thirty. Size the text at ~40% of the avatar diameter at `font-weight: 500` — at 700 two letters read as shouting.

**Where initials fail, and what to do instead.** "If you have a name, you have initials" is a Latin-script assumption. It breaks on:
- **CJK names.** 张伟 and 张三 both initialise to 张. In a Chinese, Japanese or Korean product the *last* one or two characters of the given name discriminate; the family name does not. Take the trailing character(s), not the leading one.
- **Mononyms and single-token handles** — one letter on a coloured disc is a colour swatch, not a mark.
- **RTL and Indic scripts**, where a "first letter" may be a joined or combining form that does not render standalone.
- **Bulk enterprise directories** with forty J. Smiths.

In those cases the honest ordering flips: photo → **a short display-name chip or the full given name at 11px** → deterministic pattern. See [`craft/i18n-rtl-and-global.md`](i18n-rtl-and-global.md) before shipping an initials component into a non-Latin market.

**3. Generated identicons — usually don't.** GitHub's works because GitHub avatars are frequently *bots and apps*, and a deterministic pattern is honest about that. Where every avatar is a human colleague an identicon carries zero usable information, is unmemorable, and — the part that matters here — is legible on sight as a library default. Boring Avatars, DiceBear's `shapes`/`bottts`/`beam` and the gradient-blob generators all read as "nobody made a decision."

Generated is right when the entity has no name and no face — an anonymous session, a wallet address, a server, a hash. Then a deterministic visual *is* the information.

**4. A default silhouette icon — the worst option.** Twenty identical grey person-glyphs in a member list convey nothing and make the list unscannable. If you have a name, you have initials.

**Never** show a broken-image glyph. Render the initials *underneath* the `<img>` so a failed load reveals them:

```html
<span class="avatar" style="--bg: oklch(0.72 0.11 250)">
  <span class="avatar__initials" aria-hidden="true">KH</span>
  <img src="/u/1024.avif" alt="" onerror="this.remove()">
</span>
```

### User-generated imagery you do not control

You will receive portrait photos in a landscape slot, 5000px JPEGs, screenshots of screenshots, images that are 95% white, images that are 95% black, animated GIFs, images with text burned in, and photos whose subject is in the corner. Design for those, not the three good ones in your seed data. The measures that hold, all visible in Airbnb's implementation:

- **The wrapper owns the shape.** `aspect-ratio` + `overflow: hidden` + `object-fit: cover`. Nothing the user uploads can change the layout.
- **Overlays get their own opaque chip.** Airbnb's "Guest favorite" and "Luxe" badges sit in white pills with their own background; the heart sits in a filled circle. Neither relies on a text-shadow or a scrim over the photo, because you cannot know whether the photo behind is a white ceiling or a black night shot. **Never place bare text directly on a user's image.** If you must, put a `linear-gradient(to top, rgb(0 0 0 / 0.6), transparent 50%)` scrim between them and accept that you have now darkened a third of every photo.
- **A neutral ground behind the image.** Set the wrapper's background to a mid-neutral, not white. A 95%-white upload against a white card has no edge. Measured, and consistent with [`references/consumer-and-marketplace.md`](../references/consumer-and-marketplace.md): Airbnb's frame is one `307×230` div carrying `border-radius: 20px`, `overflow: clip` and `background-color: #DDDDDD` — the same element is the reserved box, the clip, the loading ground and the broken-image ground. Vinted uses `#E1E6E6` at `r6`. **One element, one colour, one radius, three states** — if your skeleton, your placeholder and your error box are three code paths, two of them are wrong.
- **Cap the delivered size at the CDN**, not in CSS. Airbnb appends `?im_w=720` and gets a 12 KB AVIF back. A 5000px original rendered into a 307px box with `width: 100%` still costs the user the full download.
- **Colour placeholder, not a spinner.** See the technical section — extract the dominant colour or a ThumbHash at upload time and paint it into the box.

---

## Decision 3: stock photography

### Why it reads as filler

Stock photography fails in product UI for a mechanical reason, not a taste one: **the photograph was made before your product existed, so it cannot contain your product, your customer, or your claim.** Everything else is downstream of that.

### The tells, specifically

- **Smiling people at a laptop.** Nobody smiles at a laptop. The give-away is eye-line: in stock, the subject looks at a colleague or at the camera while gesturing at a screen. In documentary, they look at the screen.
- **The over-lit workspace.** Two or three soft sources, no shadow anywhere, no dust, no cable, a plant, a notebook nobody wrote in, and a laptop whose screen is either off or displaying a blurred generic dashboard. Real desks have one light source and a mess.
- **The Unsplash-desk genre.** Overhead flat-lay: MacBook, coffee, moleskine, phone at a 15° angle, marble or reclaimed wood. The visual equivalent of Lorem Ipsum; the corpus records the 2020-era template that shipped "a centered hero over an Unsplash photo of people at laptops with a white play-button overlay" ([`libraries/premium-commercial.md`](../libraries/premium-commercial.md)).
- **Diverse-team-in-a-meeting.** Four to six people of assorted demographics around a glass table, at least one laughing, sticky notes on a window. The composition is always the same because it is a casting brief, not an event.
- **Handshake, lightbulb, arrows-going-up.** Concept stock. If a photograph illustrates an abstraction rather than depicting a thing, it is filler.

**The 2026 update:** the models changed, the brief did not. Tailark's shadcn marketing registry — a component library whose entire product is marketing-page blocks — ships a hero demo with a close-up wrist and smartwatch, blown highlights, plasticky skin, no locatable light source. The Unsplash desk with a new pipeline.

### What to ship instead, in order of credibility

1. **A screenshot of your own product with real data.** Highest credibility, lowest cost, most under-used. See Decision 6.
2. **A real customer's real premises or real product.** Stripe's kiosk and boutique. Mailchimp puts a real customer's oat-milk brand ("OAT LORD") inside the campaign canvas on the screen in their hero photo, so the photograph is documenting an actual campaign rather than illustrating the idea of one.
3. **Abstract but owned.** A visual system you built and can repeat: Linear's noise-grain texture (`grain-default.png` tiled at `256px 256px`) and its radial `rgba(255,255,255,0.04)` glows; Stripe's signature `radial-gradient(circle, #7F7DFC, #F44BCC 33%, #E5EDF5 66%)` mesh. These are cheap, infinitely reusable, and unmistakably yours because you defined the palette. They are not "an abstract 3D render off a stock site."
4. **Nothing.** Vercel: 162 KB of imagery on the whole homepage. (Jasper held this position in early 2026 and has since added a canvas photo-collage hero — the position is defensible but it is not sticky.)

Stock is defensible in one place: editorial, where the photograph is *about* something external — a post about a city, an industry report, a news item. The reader understands it as illustrative journalism and the alternative is a blank column.

---

## Decision 4: illustration systems

### What makes a set cohere

An illustration set is a system when a new drawing can be produced by a different person and still belong. Six variables decide that:

1. **Line weight — including zero.** Duolingo's characters have **no outline at all**: filled shapes, no stroke. Notion's doodles are the inverse: **outline only**, single weight, black ink, no fill. Both are systems because the answer is absolute. A set where some drawings have a 2px outline and others have none is not a set.
2. **Palette derived from the product's, not chosen fresh.** Duolingo's illustrations run on the same saturated primaries as the app's UI (the brand green is the same green as the `GET STARTED` button). If your illustration palette contains colours your interface does not, you have two brands.
3. **Perspective.** Pick one: flat/orthographic, isometric, or one-point. Mixing isometric objects with flat characters is the most common incoherence.
4. **Level of detail, expressed as a budget.** "No more than X shapes per drawing," "no gradients," "no textures." Notion's doodles are ~12 strokes each and hold to it.

**A correction from looking at the Duolingo hero rather than reading about it.** The first pass called that system "flat, no perspective, no gradients, two-dot eyes, no fingers." Screenshot at 1440 and none of that survives: the characters carry **soft gradient shading** (highlights on the bald character's head, a graded green on Duo's body), **cast ellipse shadows** under every tumbling figure, **articulated hands with fingers**, and the coin tray is drawn in **three-quarter perspective with visible depth**. The real invariants are narrower and more useful: **no outlines, one saturated palette shared with the UI, one light direction, faces built from a fixed part-kit.** Copy those. A budget that forbids gradients is a legitimate choice — it is just not the choice Duolingo made, and a rule attributed to the wrong exemplar is a rule nobody will trust twice.
5. **Character or no character.** This is the biggest fork and it is a business decision, not a style one. See below.
6. **Where the drawing sits relative to real UI.** Notion's answer is a two-register system: black ink doodles float *around* a real product screenshot (and a 958×599 autoplay hero video), while **full-colour circular app icons** (Slack, Gmail, GitHub, Drive) sit at the doodles' hands. Precisely stated after looking: **the ink is always black; colour is only ever the container.** The doodle faces sit inside coloured rings and on red, blue and yellow filled discs — the line itself is never coloured, and the app icons are never redrawn. Colour-as-container is what lets the two registers touch without becoming clip-art.

### The Corporate Memphis / Alegria problem

The style — noodle-limbed figures with disproportionate hands, no facial features, flat saturated fills, non-naturalistic skin colours — became a cliché for a structural reason: **it was designed to be produced at volume by many hands with no art direction.** Facebook commissioned Alegria (Buck, 2017) so an in-house team could generate endless assets in one voice. A style optimised for infinite cheap production ends up everywhere, and "everywhere" is the definition of a cliché.

**What replaced it is not one style — it is three moves**, and knowing which you are making matters more than the drawing:

- **The named cast.** Duolingo's answer. Duo and the recurring characters are not "an illustration style," they are *intellectual property with continuity*. You recognise Duo the way you recognise a logo. This is the most expensive option and the most durable; it only makes sense for consumer products with high session frequency where a character can accrue meaning.
- **The hand-drawn mark.** Notion's ink doodles. Deliberately imperfect line, visibly made by a person, no fills, no gradients. It reads as craft rather than production because a wobbling line is evidence of a hand. Cheap to extend, hard to fake convincingly, and it fails badly if the rest of your interface is precision-engineered — Notion gets away with it because their UI is also deliberately plain.
- **The abstract-but-owned texture.** Linear's grain and glows. No figures at all. The right answer for most B2B products, because a B2B product does not need a character and cannot afford one.

**The honest note:** as of 2026 Corporate Memphis has largely disappeared from AI output — the corpus's own control baseline recorded "no Corporate Memphis, no glassmorphism, no purple gradient blobs, no lorem" in generated landing pages ([`evaluation/results/2026-09-control-baseline.md`](../evaluation/results/2026-09-control-baseline.md)). Do not spend review budget hunting for it; see *The generated version* below for what replaced it.

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

Less about "AI" than about "nobody art-directed it."

- **The over-rendered 3D blob.** A glossy, subsurface-scattering, softly-lit abstract form — a torus knot, a folded ribbon, a liquid-metal sphere — floating on a gradient. Zero informational content, high render cost. This was the 2023–24 default and is the one tell that has genuinely faded from funded companies' sites but persists in template marketplaces.
- **Iridescent / chromatic-aberration gradients.** A holographic sheen sampled from nothing. Distinguishable from a designed gradient by its palette: designed gradients use two or three colours from the product's own ramp (Stripe's `#7F7DFC → #F44BCC → #E5EDF5` is three brand colours); generated ones sweep the whole spectrum.
- **Plasticky lighting on skin and objects.** Tailark's smartwatch-on-wrist demo: blown highlights, no specular falloff, skin with no pores or hair, a light source that cannot be located in the scene. This is the current stock-photo tell and it is subtler than hands.
- **Symmetric "hero abstract" shapes.** Perfect bilateral symmetry, centred, with a soft glow behind. Real photography is almost never bilaterally symmetric; the symmetry is a giveaway that the composition was generated rather than framed.
- **Hands, still.** Improving fast, but a hand touching a product is still the highest-risk subject. If the composition needs a hand, it needs a photograph.
- **Wireframe topography.** The Framer Marketplace's current top-trending template ("Sentira") ships an AI-generated green wireframe-mesh landscape as its hero. This is the 2026 replacement for the 3D blob: same job, same emptiness, new texture.

### An honest position on when it is defensible

A blanket prohibition does not survive contact with reality. The defensible cases:

- **Texture and ground, where no subject is depicted.** A noise field, a paper grain, a soft wash sitting *behind* content — indistinguishable in kind from a Photoshop filter, and nobody is being told a photograph exists.
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

Both of the strongest heroes I measured are screenshots. Linear's is issue `DRV-8852 · Faster app launch`, with a real body paragraph, a `vehicle_state` inline code token, an activity feed with three real timestamps, a `1 / 84` counter and an agent panel reading "Worked for 10 sec". Basecamp's is a whole project page: five real message threads, a docs list with per-file sizes and owners, folder counts (`Photography 12 items`, `Proofs 3 items`), a July 2026 calendar, a kanban with column counts `(9) (6) (4) (2) (2)`, and external links to real Figma, Drive and Zoom URLs. Note also that Basecamp draws a **fake cursor arrow** into the screenshot over the message board — a one-element trick that says "this is a thing you operate" without a device frame or a play button.

### How to shoot one

**Real data, and specifically real *bad* data.** Rows of the same length are a tell. Basecamp's file list has `Hero Image.png · Leah Bernstein · Jul 20 · 1.86 MB` next to `FAQ Entries.md · Kurt Holloway · Jul 20 · 27.9 KB` — two orders of magnitude apart, because real file lists are. Include one truncated string, one long name, one empty field, one number that isn't round. `117,231` beats `100,000+`.

**Correct density.** Shoot at the density a real user has, not at the density that makes the screenshot pretty. If your product's list view holds forty rows, do not screenshot six.

**Never lorem, never `John Doe`, never `Project Alpha`.** This is the single largest signal. Give your demo workspace a real domain — Basecamp's is a web-design agency, Linear's is a rideshare app with issues about iOS startup latency. The domain vocabulary is what makes the screenshot look like evidence.

**Consistent chrome.** Decide once whether screenshots include the browser bar, the OS window frame, or neither, and never mix. Basecamp includes the app's own content area only — no browser, no OS. Linear includes the app's full sidebar and header but no browser. Both are clean because they are consistent.

**Device frames: usually no.** A frame adds 15–20% to the asset's area and says "this is a mockup." The exception is when the *platform* is the point — Stripe uses a phone silhouette because that section is about in-person and mobile payments. Apple ships bare screens with no frame, because the frame is the physical product photographed elsewhere on the page.

**Shoot at 2× and deliver AVIF.** A 1440×900 screenshot shot at 2× is 2880×1800. As PNG that is the 69 KB → 5 KB gap measured above, at scale. Basecamp pays 3,721 KB of WebP for 23 assets — their single `view-chat-light.webp` is **677 KB**. In AVIF that same screenshot would land near 100 KB.

**Localise it if the claim is global.** Stripe's bento phone shows a German checkout: `Zahlungsinformationen`, `Oder mit Karte bezahlen`, `€149.00`, with Klarna selected. The section's claim is "accept payments globally"; the screenshot proves it rather than asserting it.

**Ship light and dark.** Basecamp pairs every single one: `tool-message-board-light.webp` / `tool-message-board-dark.webp`, `tool-chat-light` / `-dark`, `view-card-table-light` / `-dark`, `background-light` / `-dark`, behind `<source media="(prefers-color-scheme: light)">` and `(prefers-color-scheme: dark)`. Vercel does the same by filename (`notion-desktop-dark.webp`). See the technical section for the cost.

### Why a screenshot beats an abstract graphic

Three reasons, all mechanical:

1. **It is checkable.** A reader who has used a competitor evaluates a screenshot in two seconds. They cannot evaluate a gradient.
2. **It answers the reader's actual question** — "what will this look like when I'm in it?" — which no headline can.
3. **It cannot be produced by someone who does not have the product.** Which is exactly why it reads as credible and why generated pages avoid it.

The boundary: a screenshot fails when the product is genuinely not visual (an API, a CLI, a background job) — in which case ship the *artefact*: a code block, a terminal session, a JSON response, a log line. Stripe's docs do this throughout. A terminal session with real output is a screenshot.

---

## Decision 7: logos and social proof

### The cliché and why it persists

"Trusted by teams at" over six grey logos at `opacity: 60%` is the corpus's canonical marketing tell (see [`references/editorial-luxury-and-marketing.md`](../references/editorial-luxury-and-marketing.md), §4) — the cheapest possible credibility gesture. It fails because:

- **Desaturating a logo destroys the one property that made it recognisable at 24px.** Coca-Cola grey is not Coca-Cola.
- **Even spacing at a uniform height makes six logos look like a shortfall,** and makes square marks visually shout over wordmarks.
- **It is often an unfalsifiable or false claim.** The corpus has documented several: CopilotKit's "Trusted by the majority of the Fortune 500s and Global 50" with no stated basis; Tailark's "Used by **people at** Figma" (an individual-employee hedge, not corporate adoption) with the same two logos repeated to fill the row; Bklit's "TRUSTED BY PEOPLE AT_" over Stripe/Vercel/Supabase. And the template genre's terminal form: the Framer Marketplace's top-trending template ships a logo row reading **`LOGO · Logoipsum · LOGO · Lightdash`** — placeholder logos from a placeholder-logo generator, shipped as the demo.

### How to do it with substance

**Make the claim falsifiable and put the denominator in it.** Notion: *"Trusted by 98% of the Forbes Cloud 100"* at 14px w400 `rgba(0,0,0,0.54)` — a named list and a percentage of it, still live on 2026-09-10. Basecamp: *"117,231 people are working in Basecamp right now!"* — and the number is **injected at runtime**, not baked into the markup, which is why it read 118,254 on the first pass and 117,231 on the re-probe. That is the strongest form of the genre: a claim that can go *down*. Linear: *"Powering the companies building the future"* at 12px uppercase, honest about being a slogan and not pretending to be data.

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

An icon accelerates scanning when it is the **fastest discriminator in the row**. In Linear's sidebar the icons differ from each other more than the words do at a glance, so the eye lands on shape first. In a settings list where every row is a toggle, an icon per row adds decoration and zero discrimination.

Three tests before adding one:

1. **Does it repeat across rows?** If ten rows carry the same icon, delete it.
2. **Is it a metaphor a first-time user resolves in under a second?** A gear is settings. A "sparkle" is not "AI" to anyone who hasn't been trained on the convention, and the corpus flags a sparkle on anything that isn't literally generation as a tell ([`libraries/ai-interfaces.md`](../libraries/ai-interfaces.md)).
3. **Would the row be ambiguous without it?** If the label alone is unambiguous, the icon is decoration.

Icons earn their place in: navigation rails (the only affordance at collapsed width), status and severity (shape encodes what colour alone cannot, for colour-blind users), file and content types, and destructive actions (redundancy as a safety feature).

### Icon + label vs icon-only

**Icon-only requires all three:** an unambiguous universal metaphor (close, search, back, play), a real `aria-label`, and a tooltip. Two out of three is a bug. Toolbars in dense creative tools are the case where icon-only is right, because the user is repeating the action hundreds of times and label width is the binding constraint.

**Everywhere else, ship the label.** A 24px icon button saves ~50px of width and costs comprehension.

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
| **JPEG** | Final fallback in `<img src>` | Apple still ships their entire MacBook Pro page as JPEG — re-probed 2026-09-10 at **36 requests / 12,699 KB**, plus 12 mp4 at 20,314 KB. A deliberate compatibility choice at Apple's scale, not a template to copy, and larger than it looks above the fold. |
| **PNG** | Almost never | Only when you need exact lossless pixels *and* AVIF's lossless mode isn't available in your pipeline. Slack's 3,441 KB of PNG is the cost of not deciding. |
| **SVG** | Logos, icons, illustration | Duolingo's entire illustration system is **55 SVG requests / 335 KB**, and it scales to any density for free. Watch the tail: their largest single SVG is **121 KB**, which is a raster-traced file that should have been AVIF. Rule of thumb: an SVG over ~30 KB is a raster in disguise. |
| **Video (`.mp4`/`.webm`)** | Motion that is content | **The line item nobody audits.** Slack ships **30 `<video>` elements over 20 distinct files, 44 MB unique** (`rivian-web-trailer@2x.webm` 12.8 MB, `mr-beast-slackbot-teaser@2x.webm` 14.4 MB) — 6.5× their whole image payload — and Chrome refetches several, so the wire cost is higher still. Apple: 12 mp4 / 20,314 KB. Airbnb: six 72×72 `.webm` category icons with posters. Notion: one 958×599 autoplay hero. Always `muted`, always `playsinline`, always a `poster`, always respect `prefers-reduced-motion`, and put a byte budget on video before you put one on images. |

### Responsive images: the three correct patterns

**1. Fixed-width CDN param — simplest, and enough for most product UI.** Airbnb: `?im_w=720` for a 307px box, no `srcset`, no `sizes`. Linear: `f=auto,fit=scale-down,metadata=none,width=1440`. **The `width` is not optional.** Drop it and Cloudflare's `f=auto` returns the original PNG at every `Accept` — that is how Linear ends up serving a 1,032 KB PNG on a page that is otherwise AVIF, and how the same asset drops to 33,672 B once `width=1440` is present. Add a CI assertion on the response `Content-Type` of your ten largest assets.

**2. `srcset` + `sizes` — required when the box width varies with viewport.** Get `sizes` right or don't bother; Slack's 71 `srcset` attributes with zero `sizes` are a pure regression. Stripe's is the model — note that the `<img>` fallback candidates are the **original PNGs** and the modern format arrives through a sibling `<source type>`, which is why Stripe ships zero AVIF and a 3,786 KB WebP payload:

```html
<picture>
  <source type="image/webp"
          srcset="…/enterprise-accordion-hertz.png?w=296&fm=webp&q=90 296w, … 2460w">
  <img srcset="…/enterprise-accordion-hertz.png?w=296&q=90 296w, … 2460w"
       sizes="(min-width: 1298px) 1232px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
       alt="Aerial view of a street intersection where the crosswalks form a slanted parallelogram">
</picture>
```

Copy the `sizes` clause; do not copy the format ladder. Adding one `<source type="image/avif">` above the WebP would take ~2.4× off Stripe's largest page cost.

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

Apple uses **109 `<picture>` elements** and zero `srcset` on `<img>` — everything happens in `<source>`. Notion uses `<source media="(min-width: 840px)">` / `(max-width: 839px)` for genuine re-crops (re-verified 2026-09-10). Airbnb wraps 46 images in `<picture>`.

**Oversupply is the common bug.** Re-measured 2026-09-10: Slack's six G2 badges at 868px natural into 104px boxes (**4.17×**), Basecamp's `walkthrough-09-26.webp` at 1600px into a 123px box (**6.5×**), Linear's activity avatars at 144px into 14px boxes (**5.14×**) and its team-row avatars at **512px into 36px (7.11×)**, Notion's `Figma_Wordmark__Black_.svg` at 300px into 62px. Target **2× the CSS box** and stop. Above 3× you are paying for pixels no display can resolve — **except** where the user can pinch, zoom or open a detail view (maps, product zoom, document viewers, artwork). There the oversupply is the feature; exempt those elements explicitly rather than letting a lint rule delete them.

### Placeholders: LQIP, BlurHash, ThumbHash

Not a loading state. A placeholder matching the image's actual colour makes a slow gallery *feel* fast in a way a spinner never does, and it removes the white-flash-then-image transition that reads as jank.

| Technique | Payload | Verdict |
|---|---|---|
| **Dominant colour** | 4 bytes | The floor. Extract one colour at upload, store it on the row, paint it as the wrapper's background. Costs nothing, works everywhere, and is enough for most product UI. |
| **ThumbHash** | ~25 bytes | **Preferred.** Sharper reconstruction than BlurHash, better on high-contrast subjects, and — the one that matters — it handles **alpha**. Re-verified 2026-09-10: ★4,206, 241,941 downloads/wk, last published 2023-03-22. |
| **BlurHash** | ~20–30 ASCII chars | Works fine; strictly worse on every axis. Re-verified 2026-09-10: ★17,069, **1,214,784 downloads/wk** — 5× ThumbHash's usage purely on being three years earlier. |
| **LQIP (tiny inline JPEG/AVIF)** | 300 B – 2 KB | Higher fidelity than either hash, but 10–80× the payload and it inflates your HTML. Use only for a single hero. |
| **Spinner over an empty box** | 0 | Wrong. It draws attention to the wait. |

Both hash formats are **frozen by design** — a hash format that churns breaks every stored value — so their stale npm dates are not a red flag. Corpus verdict unchanged from [`libraries/maps-3d-media.md`](../libraries/maps-3d-media.md): use one and stop shipping grey boxes.

### Aspect-ratio boxes and CLS

Every image must reserve its space before it loads. Two mechanisms; use the first unless the source varies. (The `padding-top` hack is dead in 2026.)

```html
<!-- 1. width + height attributes: the browser derives the ratio. Cheapest. -->
<img src="hero.avif" width="1232" height="531" alt="…">
```
```css
/* 2. aspect-ratio on the wrapper, for cropped/variable sources. */
.media { aspect-ratio: 4 / 3; overflow: hidden; }
.media > img { width: 100%; height: 100%; object-fit: cover; }
```

The measured counts tell you who takes this seriously: **Airbnb 115, Stripe 115, Notion 104, Mailchimp 103, Linear 40, Vercel 28 — Slack 7, Apple 1** (re-probed 2026-09-10).

**The first pass got Apple's escape wrong.** It claimed Apple relies on explicit `width`/`height` attributes. Re-probed: **0 of Apple's 111 `<img>` elements carry `width` or `height`**, and only one element on the page has a non-`auto` `aspect-ratio`. Apple reserves space a third way — every `<picture>` sits in a CSS-sized container with the image at `object-fit: fill` (105 of 111), so the box is fixed by the layout and the image is told to fit it. That works when you control every source dimension and ship no user content; it is the least portable of the three and you should not copy it. Slack does none of the three, and their page shifts.

Also set `loading="lazy"` on everything below the fold and `fetchpriority="high"` on the LCP image only. Mailchimp lazy-loads 80 of 82; Linear 32 of 39; Slack 68 of 89. Never lazy-load your hero — it delays LCP by a full round trip.

### Dark-mode image handling

Four strategies, in descending quality:

1. **Ship the asset twice.** Basecamp pairs every product screenshot: `-light.webp` / `-dark.webp` behind `<source media="(prefers-color-scheme: …)">`. Vercel does it by filename (`notion-desktop-dark.webp`). This is correct and it **doubles your screenshot budget** — Basecamp already sits at 3,721 KB of WebP in light mode alone. Budget for it before committing.
2. **Use SVG with `currentColor` or a CSS-variable fill.** Free for icons, logos and line illustration. This is why Duolingo's all-SVG system and Linear's 243 inline SVGs cost nothing to theme.
3. **Filter a light asset.** Notion applies `filter: brightness(1.4) saturate(0.25)` to an image in dark mode — lift the midtones, drain the colour so it stops vibrating against a dark ground. Acceptable for incidental imagery. It looks wrong on a screenshot, because UI screenshots have large flat white areas that filters cannot convincingly darken.
4. **Do nothing, but soften the edge.** For photographs, dark mode is usually fine as-is — real photographs contain their own dark values. Reduce brightness ~8% and add a hairline border so a bright photo doesn't glare: `filter: brightness(0.92); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.06)`.

**What not to do:** `filter: invert(1)` on anything. It produces a photographic negative for colour images and destroys brand logos.

### Alt text: decorative vs meaningful

The rule is a decision, not a description:

- **`alt=""` (empty, but the attribute must be present)** when the image adds nothing a sighted user gets that a screen-reader user doesn't already have from adjacent text. Airbnb's 76 empty alts are correct — each photo sits in a link whose accessible name is the listing title, price and rating. Stripe's 40 empty alts are correct — they are decorative gradients, bento graphics and icons beside labels.
- **A sentence** when the image carries information. Apple: *"A MacBook Pro screen showing a video getting enhanced with AI in Topaz Video"* — it says what is on the screen, because that is the point of the image. Stripe: *"Overhead view of a door stoop with a grocery delivery bag containing…"*.
- **Missing `alt` entirely** is never correct, and it is not rare. Slack, Stripe, Linear, Notion and Vercel are all at zero missing. **Airbnb is at 20** — every one a 16px amenity or badge icon, where the screen reader falls back to reading a UUID filename aloud. Lint for it; review does not catch it.
- **Do not over-alt.** Mailchimp's *"Four yellow filled stars and one yellow outlined empty star, representing a 4 ou…"* sits next to text already saying "4.5 based on 33,000+ reviews." A screen-reader user hears it twice. That graphic wants `alt=""`.
- **Functional images take the function, not the picture.** An icon inside a button is `alt=""` with the button labelled; a logo that links home is `alt="Notion — home"`, not `alt="Notion logo"`.

---

## When this advice is wrong

Three of these were constructed adversarially in this review pass — a realistic product where following the rule as written produces a *worse* interface. They are marked **[adversarial]** and the rule above now carries the scope.

**"Pick two aspect ratios" breaks in editorial and portfolio work.** A magazine layout's *variety* of crops is its craft — a full-bleed, then a tall column, then a small inset. The rule is for systems where images are rows of a database. Test: could a new image arrive tomorrow from a user? Then two ratios. Could it only arrive from your designer? Then as many as they choose.

**[adversarial] "Two ratios + `object-fit: cover`" is destructive on a short-form vertical video feed.** Build a creator app: user uploads are 9:16 phone video, the discovery grid renders 4:3 cards. Follow the rule and every thumbnail is a centre crop of a 1080×1920 frame — which removes the creator's head, their caption, and the product they are holding, because a vertical composition puts its subject in the upper third, not the middle. Airbnb can centre-crop safely *because a room is an environment and its subject is the middle*. **The real rule: `cover` is safe when the subject is an environment; when the subject is a framed human or a deliberately vertical composition, either match the source ratio (one portrait ratio for the whole grid) or store a per-item `object-position` set at upload.** A vertical-video product should pick 9:16 and 1:1 and never own a landscape card.

**[adversarial] "Initials, never a generated pattern" breaks outside Latin script.** Build a Chinese team-chat product. Every member list is now a wall of 张 / 李 / 王 — three characters covering most of the room, so the fallback is *less* discriminating than a hashed pattern would be, and the "scannable wall of initials" argument inverts. Same failure for mononyms, for handle-only communities, and for a 40,000-seat directory of J. Smiths. **Scope: initials beat identicons only where the script yields two discriminating characters.** In CJK take the trailing character(s) of the given name; where nothing discriminates, a deterministic pattern keyed to the user ID is the honest fallback and the file's identicon prohibition does not apply.

**[adversarial] "AVIF everywhere" is the wrong call on a long feed of low-end Android devices.** Build a classifieds app for a market where the median device is a sub-$120 Android. AVIF wins the byte comparison — and loses the experience, because AVIF decode is materially more CPU-expensive than JPEG or WebP, and a fling through 200 listing thumbnails decodes dozens of images per second. On a weak CPU that turns a bytes win into dropped frames and a hot phone. **Scope: pick AVIF for hero and above-the-fold assets, and for anything where bytes dominate; measure decode time on your actual p90 device before making it the default for a long scroll. WebP is the safe floor — 1.6–1.7× larger and decoded by everything cheaply.**

**"Screenshot beats illustration" breaks when the product isn't visual or isn't built.** An API, a CLI, a background service, a pre-launch product. Ship the artefact (a code block, a terminal session) or ship nothing. Do not ship an illustration of a dashboard that does not exist.

**"AVIF everywhere" breaks in four more places.** Email (no AVIF support in most clients — JPEG/PNG only). Anywhere users download and re-upload the asset (an export feature). Any build pipeline where AVIF's encode time would gate deploys — measure it; a large gallery can add minutes. And any asset going through a transform that silently declines to convert: verify the response `Content-Type`, because `f=auto` returned the original PNG for Linear's heaviest asset.

**"Never use stock" breaks in editorial and news.** A blog post about Lisbon needs a photograph of Lisbon and you did not go to Lisbon. Licensed editorial photography is the correct answer there. The prohibition is on stock as a *substitute for having something to show*.

**"Identicons look cheap" breaks for non-human entities.** Wallets, servers, API keys, anonymous sessions, bots. A deterministic pattern derived from a hash is the *only* honest visual for something with no name and no face — and GitHub is right to use one. It also breaks for scripts where initials do not discriminate; see the adversarial case above.

**"Illustration is padding" breaks for products whose brand is illustration.** Duolingo's illustration budget is not decoration, it is the product's differentiator; removing it would remove the reason people tolerate a language app that nags them. Same for Mailchimp's hand-drawn heritage. If illustration is load-bearing brand, the density rules in this file do not apply to you.

**"Grayscale logos are wrong" breaks when the logos are genuinely incompatible.** Eight brand palettes side by side can be visually violent. If you must neutralise, ship pre-made mono assets (Notion's approach), not a CSS filter, and never stack grayscale with reduced opacity.

**"Real screenshots with real data" breaks under privacy and NDA.** A healthcare or fintech product cannot show real records. Build a fictional-but-plausible dataset with real *shape* — realistic name distribution, realistic value ranges, realistic messiness — and label it as sample data where a reasonable person might mistake it for real.

**"Delete the image if the section looked bare" breaks for low-literacy and multilingual audiences.** "Empty space next to a strong sentence reads as certainty" assumes a reader who parses your language at speed. A civic benefits service, a health screening flow, or a consumer app in a market you do not write for gets *worse* when you strip the illustration that was carrying the step. There the drawing is not decoration, it is a second channel for the same instruction — see [`references/institutional-health-civic.md`](../references/institutional-health-civic.md).

---

## The generated version

**What AI output does here, in 2026.** The old tells have largely gone — Corporate Memphis, the purple 3D blob, glassmorphism are all rare, and the corpus's control baseline confirms it. What remains is more boring:

1. **No imagery at all, in places that needed some** — and specifically: no product screenshot. A generated landing page for a real product will ship a headline, a badge pill, two CTAs, three feature cards with 24px outline icons, and never once show the product. The single highest-value correction available.
2. **A placeholder that was never replaced.** `/placeholder.svg`, a grey box with an image glyph, `via.placeholder.com`, `i.pravatar.cc` for testimonial faces (the corpus flags this one in [`references/editorial-luxury-and-marketing.md`](../references/editorial-luxury-and-marketing.md)), or — the template-marketplace terminal case — a "trusted by" row containing literal **Logoipsum** marks. Re-verified 2026-09-10: the #1 trending Framer template ("Sentira" by Nasir Nawaz) still ships a logo row reading `LOGO · Logoipsum · LOGO · Lightdash` as its demo.
3. **`<img>` with no `width`/`height` and no `aspect-ratio` wrapper**, so the page shifts on load. This is the most common technical defect and it's invisible in code review.
4. **`object-fit` left at `fill`** on a user-supplied image, so portraits squash.
5. **Icons at 20–24px next to 14px text** with `gap-3` (12px), giving an icon/text ratio of 1.4–1.7× against a measured band of 0.85–1.35× and gaps of 4–8px.
6. **An outline icon in a rounded square on every one of three feature cards**, each icon a generic metaphor for the heading beside it.
7. **`grayscale opacity-60` on a logo row** under "Trusted by teams at", with the logos at a uniform `h-8`.
8. **A PNG screenshot at 1× density**, or an AVIF-capable pipeline shipping JPEG.
9. **`alt` filled with the filename, or with a keyword-stuffed sentence, on every image including the decorative ones.**
10. **An identicon/gradient-blob avatar library** (Boring Avatars, DiceBear `beam`) used for human colleagues in a Latin-script product.
11. **A hero that no `<img>` audit can see** — a `<canvas>`, a WebGL scene, or a CSS `background-image`. Jasper's fold is a 1440×420 canvas; `querySelectorAll('img')` returns nothing for it. If your check is an element count, screenshot the page too.

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
| "Trusted by teams at" + grey logos at uniform height | A falsifiable number with a denominator ("98% of the Forbes Cloud 100"; a live count that can go down), or one named customer with title and company. Per-logo optical heights, pre-made mono assets. |
| Identicon avatars for humans | Initials on a hashed background, `font-weight: 500` at ~40% of the diameter, plus a 1px inset hairline ring. |
| `alt` on everything | `alt=""` for decoration (expect this to be the *majority* — Stripe is 40 of 44), a full sentence for the few that carry information. |

---

## Self-check

Every item is verifiable by reading your code or probing your rendered page — no judgement calls.

**Ratios and layout**
- [ ] Count the distinct rendered aspect ratios on one page. Is it ≤3? (Airbnb: 2. Slack: 8.)
- [ ] Does every `<img>` have either `width`+`height` attributes or a wrapper with a non-`auto` `aspect-ratio`? Count them; the number should equal your image count.
- [ ] Is `object-fit: cover` on every photograph and `contain` on every logo/icon? Is `fill` used only where you control the source dimensions?

**Content**
- [ ] Does any image in your product contain Lorem, `John Doe`, `Jane Smith`, `Project Alpha`, `example.com`, `$1,234.56`, `/placeholder`, `pravatar`, or `logoipsum`? Grep for them.
- [ ] Screenshot the fold at 1440 and 390 and **look**. A canvas, WebGL or CSS-background hero is invisible to every element-count check above it.
- [ ] Is there at least one screenshot of your actual product on your marketing page?
- [ ] In that screenshot: are there at least two values of visibly different magnitude (a 1.86 MB file next to a 27.9 KB one)? At least one truncated string? At least one non-round number?
- [ ] Is any face on the page generated? Is any face on the page presented as a customer or employee without being one?

**Technical**
- [ ] `curl -sI` your largest image. Is the `content-type` `image/avif`?
- [ ] For each image, compute `naturalWidth / (renderedWidth × 2)`. Is anything above 3? Exempt anything the user can pinch or zoom, and nothing else. (Linear team-row avatars: 512px into 36px, 7.11×.)
- [ ] Does any element have `srcset` without `sizes`?
- [ ] Sum your image bytes. Is it under 1 MB for a marketing page? (Vercel: 162 KB. Slack: 6,823 KB.)
- [ ] Sum your **video** bytes separately. Slack's are 44 MB — 6.5× their images. Video is usually the larger number and never the audited one.
- [ ] For your ten largest assets, assert the response `Content-Type` in CI. A CDN transform can silently decline to convert (Linear's `f=auto` without `width` returns a 1,032 KB PNG).
- [ ] Does every below-fold image have `loading="lazy"`, and does the LCP image have neither `lazy` nor a missing `fetchpriority="high"`?
- [ ] Do images have a colour or ThumbHash placeholder, or do they flash white?

**Dark mode**
- [ ] Load the page with `prefers-color-scheme: dark`. Does any screenshot still show a white app on a dark page?
- [ ] Is any logo being `invert(1)`-ed into a negative?

**Icons**
- [ ] For each icon+label pair, is `iconWidth / fontSize` between 0.85 and 1.35? (Pointer surfaces at 12–16px body text only; not TV, kiosk, automotive or large-text modes.)
- [ ] Is the gap 4, 6 or 8px?
- [ ] Does any concept have two different icons anywhere in the product?
- [ ] Does any icon-only button lack an `aria-label` or a tooltip?

**Avatars**
- [ ] Does a user with no photo get initials, not a silhouette and not an identicon? (Latin script only — check what your initials logic does to 张伟, to a mononym, and to an Arabic name.)
- [ ] Does a broken avatar URL show a broken-image glyph? (Break one and look.)
- [ ] Is there a hairline ring so a white-background photo has an edge?

**Alt**
- [ ] What fraction of your `alt` attributes are empty? Under ~50% on a *marketing* page means you are probably over-alting. On a catalogue, gallery, docs or clinical surface the opposite is true — do not apply this ratio there.
- [ ] Does any `<img>` have **no `alt` attribute at all**? (Airbnb ships 20. Lint for it.)
- [ ] Is any `alt` a filename?
- [ ] Does any `alt` duplicate text that is already visible beside it?

**Social proof**
- [ ] Is your "trusted by" claim falsifiable — does it contain a number and a denominator?
- [ ] Are any logos in the row placeholders, or repeated to fill space?
- [ ] Are all logos at the same rendered height? (They should not be.)

---

## Sources

Screenshots in `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/img-*.png` and `imagery-and-illustration-v-{1..5}-{1440,390}.png`; probe scripts and raw JSON in the session scratchpad. Every value below was read from the live page on 2026-09-09/10; entries marked **†re-probed** were re-measured on 2026-09-10.

- **airbnb.com/s/Paris--France/homes** — †re-probed; still the reference implementation for uncontrolled imagery. Photographs at exactly two ratios (`1.000`, `1.333`); cards render 307×230 from wrappers carrying `aspect-ratio: 4/3`, with `object-fit: cover` and `object-position: 50% 50%`. Source naturals disagree: 720×480, 720×540, 720×960, **720×1080**. Delivery by `?im_w=720` with no `srcset`/`sizes` — Accept-negotiated AVIF 12,455 B / WebP 20,232 B / JPEG 29,997 B on the same URL. 46 `<picture>`, **115** aspect-ratio boxes, 38 AVIF (717 KB) + 14 PNG (579 KB), six 72×72 `.webm` category icons. **20 `<img>` carry no `alt` attribute at all** — all 16px badge and amenity icons, the one real defect on the page. Six 72×72 `.webm` category icons with posters. Overlay badges sit in their own opaque white pills — never bare text on a photo.
- **stripe.com** — †re-probed. 52 images, **47 `alt=""` and 5 descriptive sentences**, four of them real documentary photographs of businesses (Parisian kiosk, door stoop, boutique, aerial crosswalk) at 1232×531 / `aspect-ratio: 2460/1060`, with the exact `sizes` quoted above. 52 `<picture>`, 115 aspect-ratio boxes, 266 inline SVG. **Formats corrected: WebP 38 requests / 3,786 KB, PNG 3, GIF 29 — zero AVIF.** The photographs are Contentful PNGs re-encoded by `?fm=webp`; the first pass's `.avif` srcset example was wrong. The bento phone shows a **German-localised** checkout (`Zahlungsinformationen`, `Oder mit Karte bezahlen`, `€149.00`, Klarna selected) beside a fraud panel reading `0.06% / 0.02% / 0.08%`.
- **linear.app** — †re-probed, and the first pass's headline claim was wrong. Hero is a full product screenshot: issue `DRV-8852 Faster app launch`, body copy about `vehicle_state` sync, a `1 / 84` counter, an agent panel reading "Worked for 10 sec". **Not AVIF-only:** 29 AVIF (256 KB) *plus a 1,032 KB PNG and a 338 KB JPEG* — 1,652 KB total, of which 83% is those two assets. The PNG comes back as PNG for every `Accept` because its `f=auto` transform carries **no `width` param**; adding `width=1440` returns 33,672 B of AVIF from the identical source. The hero requests `width=2560` and gets **WebP** even when AVIF is advertised. 243 inline SVG, 0 `<picture>`, 40 aspect-ratio boxes. Avatars at **36px / `border-radius: 6px`** in the team row (served 512×512 — 7.11× oversupply) and 14px / `50%` in the activity feed (served 144×144). Logo eyebrow *"Powering the companies building the future"* at 12px w400 uppercase `rgb(98,102,109)`.
- **apple.com/macbook-pro** — †re-probed. One rim-lit product photograph on black, no environment, type in the empty lower-left. **109 `<picture>` elements, 0 `srcset` on `<img>`, 1 aspect-ratio box — and 0 of 111 `<img>` carry `width`/`height`.** The first pass's explanation was wrong: space is reserved by CSS-sized containers with `object-fit: fill` (105 of 111), not by intrinsic attributes. Entirely JPEG/PNG, no AVIF, no WebP: **36 JPEG / 12,699 KB + 14 PNG / 89 KB, plus 12 mp4 / 20,314 KB.** Hero is a `hero_startframe` / `hero_endframe` JPEG pair at 2880×900. 37 of 111 alts descriptive; 1 missing.
- **basecamp.com** — †re-probed. Hero screenshot with fully real data: Geoff Collier / Leah Bernstein / Kurt Holloway / Liza Randall, `Hero Image.png · Jul 20 · 1.86 MB`, `FAQ Entries.md · Jul 20 · 27.9 KB`, folder counts (`Photography 12 items`), a July 2026 calendar, kanban counts `(9)(6)(4)(2)(2)`, live Figma/Drive/Zoom links, a drawn-in cursor arrow, and a **runtime-injected** live counter reading *"117,231 people are working in Basecamp right now!"* on 2026-09-10 (118,254 on the first pass — it is a counter, not a constant). **Every product screenshot ships as a `-light.webp` / `-dark.webp` pair behind `<source media="(prefers-color-scheme: …)">`** — verified by loading the page under both schemes. Cost: 3,721 KB of WebP across 23 requests, heaviest `view-chat-light.webp` at **677 KB**.
- **notion.com** — two-register illustration system: black ink doodle characters (outline only, no fill) around a real product screenshot, with full-colour circular app icons (Slack, Gmail, HubSpot, Drive) as the only coloured elements. Logo row under *"Trusted by 98% of the Forbes Cloud 100"* (14px w400 `rgba(0,0,0,0.54)`), logos as **pre-monochromed assets** — `Figma_Wordmark__Black_.svg`, `cursor-logo-mono.svg`, `Ramp.svg` at 300px natural rendered 62–82px wide. Dark mode uses `filter: brightness(1.4) saturate(0.25)` and `brightness(0) invert(1)`. 104 aspect-ratio boxes. Testimonial alts carry full attribution: *"Michael Truell, Co-founder and CEO of Cursor"*.
- **duolingo.com** — illustration system as **55 SVG requests / 335 KB**, one ratio (`1.297`) covering 42 of 52 images, zero `srcset`. Vector with **no outlines** and one saturated palette shared with the app UI, a single light direction, and a named recurring cast rather than a style. †re-looked 2026-09-10: the drawings *do* carry gradient shading, cast ellipse shadows, fingers and a three-quarter-perspective prop — "flat, no gradients" was inherited, not observed. Largest single SVG 121 KB (a traced raster that wants to be AVIF).
- **mailchimp.com** — the most responsive-image-disciplined page measured: `sizes` on 68 of 82, `srcset` on 63, 46 `<picture>`, 103 aspect-ratio boxes, 80 of 82 lazy. Hero is an art-directed photograph of a bike-shop workspace whose screen shows a real Mailchimp automation canvas for a real customer product ("OAT LORD") — but under a heavy dark scrim so white type survives, which leaves the photograph doing little work. Over-alts: 73 of 82 have text, including a five-star graphic described in full next to the same information in prose. 464 KB of PNG for 3 images.
- **slack.com** — †re-probed; the counter-example on almost every axis, and worse than the first pass recorded. Images: **6,823 KB, zero WebP, zero AVIF** (PNG 48 req / 3,441 KB + JPEG 23 req / 3,379 KB) — exact to the byte on re-measure. `srcset` on 71 images, `sizes` on **0**. Eight recurring aspect ratios, 24 distinct. 7 aspect-ratio boxes; 7 of 89 `<img>` carry `width`/`height`. Six G2 badges at 868px natural into 104×120 boxes (4.167×). Logo row via `filter: grayscale(1)` at `opacity: 1` under *"Trusted by top teams"*. **The number the first pass missed: 30 `<video>` elements over 20 distinct files, 44.2 MB unique** — `mr-beast-slackbot-teaser@2x.webm` 14.4 MB, `rivian-web-trailer@2x.webm` 12.8 MB, `caraway-web-trailer@2x.webm` 8.8 MB — all `autoplay muted` with posters.
- **vercel.com** — †re-probed. 162 KB of imagery, almost all with descriptive alt sentences. Logo row re-measured: **seven** marks at rendered heights **20 / 35 / 17 / 21 / 28 / 45 / 30 px** and widths 127 / 69 / 147 / 78 / 98 / 58 / 130 in one 1392×44 container, `filter: none`, `opacity: 1` — optical sizing, not a uniform box. Dark assets by filename (`notion-desktop-dark.webp`, `zapier-desktop-dark.webp`). 47 inline SVG, 28 aspect-ratio boxes.
- **github.com** (contributors, discussions) — avatar convention: `border-radius: 50%` plus `box-shadow: rgba(31,35,40,0.15) 0 0 0 1px` as a hairline ring (box-shadow, not border, so no layout cost). Served `?s=60` for 40px boxes, `?s=32` for both 32px (1×, soft on retina) and 16px (2×) boxes.
- **jasper.ai** — †re-probed 2026-09-10 and **the claim has expired**. The fold now carries a `1440×420` `<canvas>` at `top: 546px` compositing a cut-out photograph of a person, a pink grid, a `+35%` card and floating UI chips from AVIF assets (`Grid Illo.avif`, `Home - BV (Plain).avif`, `Peter So.avif`), plus a 13-logo mono WebP row under *"World-class marketing teams trust Jasper"* — an unfalsifiable claim of exactly the kind §7 rejects. `querySelectorAll('img')` returns **zero** elements in the first 900px, which is the transferable lesson: element-count audits cannot see a canvas hero.
- **framer.com/marketplace** — †re-verified by screenshot 2026-09-10. Trending order unchanged: **#1 "Sentira" (Nasir Nawaz, free)** — AI-generated green wireframe-topography hero and a logo row reading `LOGO · Logoipsum · LOGO · Lightdash`; **#2 "Fabrica"** ($129) AI-generated black smoke; **#4 "MaestroClass"** ($58) laptop-on-a-couch mockup. Nine months on, the placeholder-logo demo is still the top trending template.
- **tailark.com** — a shadcn marketing-block registry whose own hero demo uses a stock/AI photograph of a wrist and smartwatch with blown highlights and no locatable light source. The 2026 Unsplash desk.
- **Format A/B** — `curl -H "Accept: …"` against the live CDNs, 2026-09-10. Airbnb listing photo @720w: AVIF 12,455 B / WebP 20,232 B / JPEG 29,997 B. Linear hero @1440w: AVIF 5,345 B / WebP 9,074 B / PNG 69,561 B.
- **npm/GitHub, re-verified 2026-09-10** (week of 2026-08-31 → 09-06) — thumbhash 241,941 wk / ★4,206 / npm 0.1.1 published 2023-03-22 / last GitHub push 2024-05-26; blurhash 1,214,784 wk / ★17,069 / npm 2.0.5 published 2023-02-17 / last push 2024-07-08; sharp 69,643,139 wk; @unpic/react 1,299,485 wk. Every figure matches [`libraries/maps-3d-media.md`](../libraries/maps-3d-media.md) exactly; this file adopts that verdict rather than re-deriving it. Neither repo is archived.

---

## Review pass (2026-09)

Adversarial re-read on 2026-09-10. Every page in the reference table was re-fetched with a full
lazy-scroll, five interfaces were screenshotted at 1440 and 390 and looked at, the two format A/B
runs were repeated against the live CDNs, and the library evidence was re-pulled from npm and the
GitHub API.

### Verified unchanged (exact to the byte)

| Claim | Method | Result |
|---|---|---|
| Airbnb photo @720w: AVIF 12,455 / WebP 20,232 / JPEG 29,997 B | `curl -H "Accept: …"` on `a0.muscache.com` | **exact** |
| Linear hero @1440w: AVIF 5,345 / WebP 9,074 / PNG 69,561 B | `curl -H "Accept: …"` on `imagedelivery` | **exact** |
| Slack PNG 3,441 KB + JPEG 3,379 KB, zero WebP/AVIF, `sizes` on 0 | Playwright response capture | **exact** |
| Slack G2 badges 868px natural into 104px boxes = 4.167× | computed `naturalWidth / rect.width` | **exact** |
| thumbhash 241,941 wk / ★4,206 · blurhash 1,214,784 wk / ★17,069 | npm downloads API + `gh api` | **exact**, and consistent with `libraries/maps-3d-media.md` |
| Vercel logo row, non-uniform optical heights in a 1392×44 box | computed geometry | **verified**, seven marks not six |
| Notion *"Trusted by 98% of the Forbes Cloud 100"* + `<source media>` re-crops | live DOM | **verified** |
| Basecamp `-light.webp` / `-dark.webp` behind `prefers-color-scheme` | live `<source>` list | **verified** on every tool and view asset |
| Apple 109 `<picture>`, 0 `srcset`, 1 aspect-ratio box | live DOM | **verified** |
| Framer #1 trending template ships a `Logoipsum` logo row | screenshot | **verified**, still #1 |

### Corrected

1. **Jasper no longer ships an imageless fold.** It now has a 1440×420 `<canvas>` photo-collage hero
   and a 13-logo *"World-class marketing teams trust Jasper"* row. The file cited it twice as the
   proof that "no image" is a live option; both places are rewritten, and the more durable lesson —
   **canvas/WebGL/CSS-background heroes are invisible to `<img>` audits** — is now in Decision 1, the
   generated-version list and the self-check.
2. **Linear is not AVIF-only.** 29 AVIF plus a **1,032 KB PNG** and a 338 KB JPEG. The PNG's
   `f=auto` transform carries no `width`, and Cloudflare then declines to convert at any `Accept`;
   adding `width=1440` returns 33,672 B of AVIF from the same source — **31×** for one URL parameter.
   At `width=2560` the same endpoint returns WebP even when AVIF is advertised. New table in
   *Format cost*, new CI advice in *Responsive images*.
3. **Stripe ships zero AVIF.** Its photographs are Contentful PNGs re-encoded by `?fm=webp` through a
   sibling `<source type="image/webp">`. The first pass's example markup showed `.avif` candidates on
   the `<img>`; the real markup is now quoted, with a note that the `sizes` clause is the part to copy.
4. **Apple does not reserve space with `width`/`height`.** 0 of 111 `<img>` carry either. It reserves
   with CSS-sized containers and `object-fit: fill` (105 of 111) — the least portable of the three
   mechanisms. The CLS paragraph said the opposite.
5. **Slack's real asset problem is video, not images.** 30 `<video>` elements over 20 files,
   **44.2 MB unique** — 6.5× the 6.8 MB of images. "The single largest unforced asset cost I
   measured" was wrong by an order of magnitude. Byte budgets and the self-check now cover video.
6. **`alt` missing is not zero in the wild.** Airbnb ships **20 `<img>` with no `alt` attribute**, all
   16px badge and amenity icons, so a screen reader announces UUID filenames. The file previously
   asserted `missing` was 0 on every page probed.
7. **Duolingo's illustration system is not flat-and-ungraded.** The hero has gradient shading, cast
   shadows, articulated fingers and a three-quarter-perspective object. The real invariants — no
   outlines, one shared saturated palette, one light direction, a fixed face part-kit — replace the
   inherited description. A rule attributed to the wrong exemplar is a rule nobody trusts twice.
8. **Notion's two registers, stated precisely.** The ink is always black; **colour is only ever the
   container.** The doodle faces sit inside coloured rings and on red, blue and yellow filled discs.
   "The doodles are never coloured" was imprecise about the mechanism that makes it work.
9. **Basecamp's social-proof number is injected at runtime** — 117,231 on this pass, 118,254 on the
   last. Reframed as the strongest form of the genre: a claim that can go down.
10. **Page-level image counts drift** with lazy-scroll depth and A/B bucket (Stripe 44→52, Slack
    50→89, Apple 89→111, Vercel 5→19). The reference table now says so, marks re-probed rows †, and
    the surviving invariants are ratios, bytes and per-element geometry.

### Scoped after adversarial testing

Three realistic products were constructed where the file's advice as written produces a worse
interface. Each is now scoped in *When this advice is wrong*, and the corresponding rule up-page
carries a pointer.

- **Short-form vertical video feed** → "two ratios + `object-fit: cover`" decapitates every creator
  thumbnail. `cover` is safe for environments, destructive for framed humans and vertical compositions.
- **Chinese team chat** → "initials, never a generated pattern" produces a wall of 张 / 李 / 王. The
  initials rule is a Latin-script rule; CJK takes trailing characters, and where nothing discriminates
  a hashed pattern is the honest fallback.
- **Classifieds feed on sub-$120 Android** → "AVIF everywhere" wins bytes and loses frames, because
  AVIF decode is CPU-expensive and a fling decodes dozens of images per second. AVIF for heroes;
  measure decode on the p90 device before defaulting a long scroll to it.

Two smaller scopes were added the same way: the **icon 0.85×–1.35× band** is a pointer-and-arm's-length
band and does not transfer to TV, kiosk, automotive or large-text modes; the **oversupply ≤2× rule**
must exempt anything the user can pinch or zoom. The **majority-empty `alt` ratio** is a marketing-page
shape and inverts on catalogues, galleries, docs and clinical surfaces.

### Corpus consistency

- **`libraries/maps-3d-media.md`** — ThumbHash/BlurHash stars, downloads and frozen-by-design
  publish dates match to the digit. No divergence; this file continues to adopt that verdict.
- **`references/consumer-and-marketplace.md`** — Airbnb 307×230 at 1.33 agrees. Its measured frame
  (`border-radius: 20px`, `overflow: clip`, `background: #DDDDDD`, plus Vinted's `#E1E6E6` at r6) was
  pulled into *User-generated imagery* to replace this file's unmeasured "set a mid-neutral".
- **`references/editorial-luxury-and-marketing.md`** — the true-black-vs-grayscale logo-row verdict
  agrees; its `i.pravatar.cc` tell was added to the generated-placeholder list.
- **`evaluation/results/2026-09-control-baseline.md`** — Corporate Memphis absence agrees.

No conflicting numbers for the same measurement were left in the corpus.
