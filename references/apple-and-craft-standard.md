# Apple, and the Platform-Craft Standard

**Evaluated:** 2026-09

## What this archetype is for

Products where the interface is expected to feel *made* rather than *assembled*: single-purpose tools people open dozens of times a day (task managers, readers, cameras, trackers, notes), premium hardware/product marketing, and any app whose selling proposition is "someone cared about this." The user situation is repeat, high-frequency, low-ceremony — the person is not being sold to, they are working, and every millisecond of friction is felt. This archetype does **not** fit multi-tenant B2B admin consoles, data-dense analytics, or anything with 40 configurable columns; those belong to the Linear/Retool density archetype. It also does not fit consumer growth funnels where conversion beats craft. The distinguishing test: if the product's users would notice a 1px misalignment, you're here. If they'd notice a missing bulk-export, you're not.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **apple.com** (iPhone 17 Pro, iOS, macOS pages) | The most disciplined type system shipping on the web; scroll-driven storytelling that never becomes a scrollytelling demo | The tracking curve: negative below 17px, **positive** from 19–32px, back to zero at 40px, negative again above. Nobody else does this and it's why Apple headlines look "set" and yours look "typed." |
| **Apple HIG** (developer.apple.com/design) | The only design system that publishes its own optical-size tracking table, per-appearance color values, and minimum hit targets as spec, not vibes | The increased-contrast color column. Every semantic color has four values, not two. |
| **App Store web app** (apps.apple.com) | Apple's own product UI shipped as a web app — the honest answer to "what does macOS look like in a browser" | 30px sidebar rows, 6px radius, 15px/20px text, alpha-based label colors. Measured, not guessed. |
| **Things** (Cultured Code) | 15 years of a task manager with almost no visible chrome; the Magic Plus button is the most-copied interaction in the indie Mac scene | Ship a marketing page that is one icon, one sentence, one link. The restraint *is* the pitch. |
| **Flighty** | 2023 Apple Design Award; the best example of an iOS app whose *website* correctly borrows from the app instead of the reverse | It applies Apple's literal tracking table on the web — 13px/-0.08px, 15px/-0.23px, 17px/-0.43px — the exact HIG point values. |
| **Halide** (Lux Optics) | ADA winner; proves the craft scene deviates from SF *deliberately*, not ignorantly | Domain-appropriate voice: a camera app gets an instrument typeface and a black chassis, not SF on white. |
| **Mela / Reeder** (Silvio Rizzi) | Two apps, one author, two complete typographic systems | `font-family: ui-rounded` for chrome, `ui-serif` (New York) for recipe/article content. Content and chrome get different type families. |
| **Bear** | Ships its own typeface family (`bearsans`, `bearsansheadline`) rather than SF | Line-height 1.7 for long-form body (16px/27.2px), 1.1 for display. Two ratios, not one. |
| **Overcast** (Marco Arment) | The anti-marketing marketing page: system font, orange links, no framework | Zero-decoration pages read as confidence when the product is famous. Don't try this on launch day. |
| **Panic** (Nova, Blippo+) | 100% Mac-native apps behind a website that looks nothing like Apple | Craft ≠ imitation. Panic's site is navy + Didone + acid-green pills; the app is pure AppKit. |
| **Iconfactory** (Tapestry, Triode, xScope, Tot) | The custom-icon house; every app icon is hand-drawn at every size | Card design where the *artwork* is the hero band and the text sits in a solid dark strip beneath — no scrim, no gradient overlay. |
| **Ivory / Tapbots** | Rendered 3D hero art + a fully system-native app | The website and the app are allowed to be different genres. |
| **Sofa** | Apple-native app, deliberately non-Apple web presence (Inter + new-kansas slab) | Cream `#FFF4EE` ground instead of white. One decision, whole personality. |
| **Fantastical / Flexibits** | The clearest published example of Liquid Glass-era visual language on a marketing site | Translucent stacked rounded-squares as decorative furniture instead of gradient blobs. |
| **Apollo** (rip) | Its memorial page is still the cleanest single-column SF page on the web | The custom-icon grid: 8 alternate app icons as a strip. Alternate icons are a craft signal costing nothing at runtime. |
| **Moonlitt** (Flipping Hues) — *not on the brief's list* | 2026 ADA **Interaction** winner; SwiftUI across iOS/iPadOS/macOS/visionOS/watchOS from a two-person Italian studio | One SwiftUI codebase that respects five platforms' distinct idioms rather than shipping one layout everywhere. |
| **Tide Guide** (Condor Digital) — *not on the brief's list* | 2026 ADA **Visuals and Graphics** winner | Its palette tracks the actual color of the sky through the day. Data-driven theming instead of a static dark mode. |

*How I found the two off-list products:* I pulled `developer.apple.com/design/awards/` and read the 2026 category winners. Apple's own awards page is the highest-signal discovery surface for this archetype and it's public, current, and annotated with why each app won. Reeder and Mela cross-surfaced from each other — Mela's site header links "Reeder →" because they share an author.

---

## Measured specifics

### Apple's actual web type ladder
Extracted from apple.com's shipped stylesheet (1.2 MB, `.typography-*` classes). All tracking is in `em`, all line-height is a unitless ratio, weight is 600 for every display size and 400 for body.

| px | line-height | ratio | weight | tracking | family |
|---|---|---|---|---|---|
| 80 | 84 | 1.05 | 600 | **−0.015em** | SF Pro Display |
| 64 | 68 | 1.0625 | 600 | −0.009em | Display |
| 56 | 60 | 1.0714 | 600 | −0.005em | Display |
| 48 | 52 | 1.0835 | 600 | −0.003em | Display |
| 40 | 44 | 1.1 | 600 | **0em** | Display |
| 32 | 36 | 1.125 | 600 | **+0.004em** | Display |
| 28 | 32 | 1.1429 | 600 | **+0.007em** | Display |
| 24 | 28 | 1.1667 | 600 | **+0.009em** | Display |
| 21 | 25 | 1.1905 | 600 | **+0.011em** | Display |
| 19 | 23 | 1.2105 | 600 | **+0.012em** | Display |
| 17 | 25 | 1.4706 (body) / 1.2354 (card copy) | 400 | **−0.022em** | SF Pro **Text** |
| 14 | 18 | 1.2858 | 400/600 | −0.016em | Text |
| 12 | 16 | 1.3334 | 400 | −0.01em | Text |

Two hard facts in that table: **the Text→Display switch happens at 19px**, and **tracking crosses zero twice**. The generic build uses one family and monotonic negative tracking ("tighter as it gets bigger"), which is wrong in the 19–32px band on every optically-sized typeface.

### Apple's published SF Pro tracking curve (HIG > Typography > Tracking values)
Apple's own table, in 1/1000 em. Excerpted at the inflection points:

| pt | 8 | 12 | 14 | 17 | **19** | **20** | 22 | **24** | 28 | 34 | 48 | 60 | **80** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| tracking | +26 | **0** | −11 | −26 | **−24** | −23 | −12 | **+3** | +14 | +12 | +8 | +4 | **0** |

Crosses zero at 12pt going negative, bottoms at 19–20pt, crosses back positive at 24pt, peaks at +14 near 28–30pt, returns to zero at 80pt+. If you're hand-setting a scale on a variable font, this is the shape.

### Apple's iOS built-in text styles (Large / default Dynamic Type)
| Style | Weight | Size | Leading | Emphasized |
|---|---|---|---|---|
| Large Title | Regular | 34 | 41 | Bold |
| Title 1 | Regular | 28 | 34 | Bold |
| Title 2 | Regular | 22 | 28 | Bold |
| Title 3 | Regular | 20 | 25 | Semibold |
| Headline | **Semibold** | 17 | 22 | Semibold |
| Body | Regular | **17** | 22 | Semibold |
| Callout | Regular | 16 | 21 | Semibold |
| Subhead | Regular | 15 | 20 | Semibold |
| Footnote | Regular | 13 | 18 | Semibold |
| Caption 1 | Regular | 12 | 16 | Semibold |
| Caption 2 | Regular | 11 | 13 | Semibold |

At AX5 (largest accessibility size) Body becomes **53pt/62pt**. Your layout must survive that. At xSmall, Body is 14/19.

### macOS built-in text styles — a *different* ladder
| Style | Weight | Size | Line height |
|---|---|---|---|
| Large Title | Regular | 26 | 32 |
| Title 1 | Regular | 22 | 26 |
| Title 2 | Regular | 17 | 22 |
| Title 3 | Regular | 15 | 20 |
| Headline | **Bold** | 13 | 16 |
| Body | Regular | **13** | 16 |
| Callout | Regular | 12 | 15 |
| Subheadline | Regular | 11 | 14 |
| Footnote / Caption 1 | Regular | 10 | 13 |
| Caption 2 | Medium | 10 | 13 |

iOS body is 17pt. macOS body is **13pt**. Same company, same font, 30% difference, because the viewing distance and the pointer precision differ. Confirmed live: the App Store *web app* sets `body { font-size: 13px; line-height: 16px }` and its most common text style is **12px/15px** (187 instances on one page). apple.com marketing sets body at **17px/25px**. Apple runs two scales and picks by context.

### iOS 26 system colors — light, dark, **and increased-contrast**
Read from the HIG color tables (values updated June 2025; these are current, not the 2016 classics).

| Name | Light | Dark | Increased-contrast light | Increased-contrast dark |
|---|---|---|---|---|
| Red | `#FF383C` | `#FF4245` | `#E9152D` | `#FF6165` |
| Orange | `#FF8D28` | `#FF9230` | `#C55300` | `#FFA056` |
| Yellow | `#FFCC00` | `#FFD600` | `#A16A00` | `#FEDF43` |
| Green | `#34C759` | `#30D158` | `#008932` | `#4AD968` |
| Mint | `#00C8B3` | `#00DAC3` | `#008575` | `#54DFCB` |
| Teal | `#00C3D0` | `#00D2E0` | `#008198` | `#3BDDEC` |
| Cyan | `#00C0E8` | `#3CD3FE` | `#007EAE` | `#6DD9FF` |
| **Blue** | `#0088FF` | `#0091FF` | `#1E6EF4` | `#5CB8FF` |
| Indigo | `#6155F5` | `#6D7CFF` | `#564ADE` | `#A7AAFF` |
| Purple | `#CB30E0` | `#DB34F2` | `#B02FC2` | `#EA8DFF` |
| Pink | `#FF2D55` | `#FF375F` | `#E7124D` | `#FF8AC4` |
| Brown | `#AC7F5E` | `#B78A66` | `#956D51` | `#DBA679` |

Notice the increased-contrast column is not "the same hue, darker." Yellow goes from `#FFCC00` to `#A16A00` — a completely different color, because yellow at 4.5:1 on white is brown. That is the whole lesson.

### iOS gray ramp (systemGray 1–6), all four appearances
| | Light | Dark | AX light | AX dark |
|---|---|---|---|---|
| systemGray | `#8E8E93` | `#8E8E93` | `#6C6C70` | `#AEAEB2` |
| systemGray2 | `#AEAEB2` | `#636366` | `#8E8E93` | `#7C7C80` |
| systemGray3 | `#C7C7CC` | `#48484A` | `#AEAEB2` | `#545456` |
| systemGray4 | `#D1D1D6` | `#3A3A3C` | `#BCBCC0` | `#444446` |
| systemGray5 | `#E5E5EA` | `#2C2C2E` | `#D8D8DC` | `#363638` |
| systemGray6 | `#F2F2F7` | `#1C1C1E` | `#EBEBF0` | `#242426` |

The dark ramp is **not** the light ramp inverted. Light 6 is `#F2F2F7` (very close to white); dark 6 is `#1C1C1E` (very close to black). But light 1 and dark 1 are the *identical* `#8E8E93` — the mid-gray is the pivot and it doesn't move.

### Apple's three different blues (all shipping simultaneously)
- **`#0071E3`** — apple.com button background (`--sk-button-background`), hover `#0076DF`, active `#006EDB`
- **`#007AFF`** — App Store web app links and buttons, and the classic UIKit blue
- **`#0088FF`** — the current iOS 26 `systemBlue`
- **`#0066CC`** — apple.com link hover color

Don't let anyone tell you there is one Apple Blue. There are four, chosen by surface.

### Neutrals measured on apple.com
`#1D1D1F` (ink), `#6E6E73` (secondary), `#F5F5F7` (section alt background), `#86868B`, `#D2D2D7` (rules), `rgba(0,0,0,0.56)` (footnotes), `rgba(0,0,0,0.8)` (nav links). Dark-mode section alt: `#1D1D1F`. Nav keyline: `rgba(29,29,31,0.2)`, sticking: `rgba(29,29,31,0.1)`.

### Alpha-based label colors (App Store web app, measured)
`rgba(0,0,0,0.88)` primary · `rgba(0,0,0,0.56)` secondary · `rgba(0,0,0,0.48)` tertiary · `rgba(60,60,67,0.03)` faintest fill. Flighty independently ships `rgba(59,59,67,0.6)` for secondary text on its site — the same `(60,60,67)` family iOS uses for `secondaryLabel`. **Apple's grays on non-white grounds are alphas, not hexes**, which is why they survive being dropped onto a tinted card.

### Buttons — Apple's actual spec
```
--sk-button-border-radius: 980px;   /* not 9999px, not 0.5rem */
--sk-button-padding-horizontal: 22px;  --sk-button-padding-vertical: 12px;  /* default, 17px text */
.button-super    → 31px / 18px,  17px text
(small viewport) → 16px / 9px,   14px text
.button-reduced  → 11px / 4px,   12px text
--sk-button-min-width-basis: 60–90px
box-sizing: content-box   /* padding is measured from the text box, then 1px border subtracted */
```
Block (full-width) buttons **step their radius by viewport**: `12px → 10px → 8px → 5px` as the screen narrows. Hover is a ~3% luminance shift on the fill (`#0071E3 → #0076DF`), never a transform, never an opacity change, never a border appearing.

### Breakpoints (frequency count across apple.com's CSS)
`734px` (298 uses) · `1068px` (235) · `833px` (157) · `1069px` (46) · `480px` (33) · `1441px` (23) · `360px` (11).
So: **≤734 small · 735–1068 medium · 1069–1440 large · ≥1441 xlarge**, with 833/834 as an iPad-portrait seam. Grid is 12 columns, offsets in 8.3333% steps.

### Motion
Dominant easing on apple.com, by frequency: `cubic-bezier(0.4, 0, 0.6, 1)` (312 uses across two spellings) — a **symmetric ease-in-out**, not the ease-out the web preaches. Then `cubic-bezier(0, 0, 0.2, 1)` (95), `cubic-bezier(0.42, 0, 0.58, 1)` (27), `cubic-bezier(0.25, 0.1, 0.3, 1)` (13), and one deliberate overshoot: `cubic-bezier(0.4, 0, 0.3, 2)`.
Durations cluster at **0.25s, 240ms, 0.275s, 0.3s, 320ms, 0.38s, 0.4s, 0.5s**. Note `320ms` and `240ms` written in ms while others are in s — different teams, same system.
`prefers-reduced-motion` appears **34 times**. `clamp()` appears **7 times** in 1.2 MB. `font-size` in `vw`: **zero**.

### Hit targets and contrast (HIG, verbatim)
| Platform | Recommended | Minimum |
|---|---|---|
| iOS, iPadOS | **44×44 pt** | 28×28 pt |
| macOS | **28×28 pt** | 20×20 pt |
| visionOS | 60×60 pt | 28×28 pt |
| watchOS | 44×44 pt | 28×28 pt |

Contrast: **4.5:1 up to 17pt · 3:1 at 18pt+ · 3:1 for any bold text.**
Default/minimum text size: iOS 17/11 · macOS 13/10 · tvOS 29/23 · visionOS 17/12 · watchOS 16/12.
tvOS safe area: inset content **60pt top/bottom, 80pt sides**; unfocused content width 860pt, horizontal spacing 40pt, minimum vertical spacing 100pt.
visionOS: place buttons so their **centers are ≥60pt apart**.

### Focus ring
`outline: 2px solid #0071E3; outline-offset: 1px` (3px on containers, −7px on inset elements). On dark: `outline: 2px solid rgba(255,255,255,0.92)`. It's an `outline`, not a `box-shadow` ring — so it never affects layout and never gets clipped by `overflow: hidden`.

### Sidebar row spec (measured on Apple's own App Store web app)
```
height: 30px;  padding: 3px;  border-radius: 6px;
font: 15px / 20px, weight 400;  color: rgba(0,0,0,0.88);
background: transparent until selected
section header: 11px, weight 600, rgba(0,0,0,0.56)
```
Compare: **6px** is the macOS control radius (37 instances on that page, the single most common radius), followed by 10, 8, 12, 17, 24. Not 16px-everything.

### Craft-scene measured values
| Product | Body | Display | Signature color | Radii in use |
|---|---|---|---|---|
| **Flighty** | 15px/22.5px, secondary `rgba(0,0,0,0.55)` | h1 65px/78px w700 ls −1px; h2 56px/56px w700 ls −0.28px | `rgb(0,133,255)`, success `rgb(8,168,91)` | 999px (30×), 16px (35×), 12px (27×), 20px (18×) |
| **Sofa** | 16px/24px Inter, ls −0.4px throughout | h1 60px/60px w600 ls **−3px** (−0.05em) | ground `#FFF4EE`, accent `rgb(60,102,196)`, footer `#0F1A31` | 9999px (24×), 8px (17×), 6px (8×) |
| **Mela** | 16px `ui-rounded` (SF Pro Rounded) | 64px/64px w800 | `#FFD609` on ink `#3C321E`, dark `#1E1E19` | **5px and 7px only** |
| **Bear** | 16px/**27.2px** (1.7) `bearsans` | 51.2px/56.32px (**1.1**) | `#DD4C4F` | 16px, 40px, ~4.8px |
| **Things** | 15px/18px w600 nav | 36px w700 | ground `#F2F5F7`, ink `#303336` | 6px |

Mela's 5px/7px radius pair is the most instructive number in that table. It's a recipe app on a yellow ground with SF Rounded type — and the corners are almost square, because the *typeface* is already doing the softening. Rounded type + rounded corners + rounded buttons is the compounding error that makes AI output look like a toy.

### App icons (HIG, current)
1024×1024 px square, **layered** (background + 1–n foreground layers), authored in Icon Composer, exported with **six appearance variants**: default, dark, clear light, clear dark, tinted light, tinted dark. The system applies the mask, the specular highlight, the refraction, and the shadow — you ship flat, opaque, hard-edged vector layers and let it. visionOS/watchOS mask to a **circle**, tvOS to a landscape 800×480 rounded rectangle.

---

## The decisions that make it work

**1. Two type families, split at 19px, with tracking that changes sign.**
Apple's shipped CSS switches from SF Pro **Text** to SF Pro **Display** at exactly 19px, and the tracking goes from −0.022em (17px Text) to +0.012em (19px Display) across that one step. Then it decays through zero at 40px and back to −0.015em at 80px. Why it works: optically-sized faces are drawn tighter at display sizes and looser at text sizes; the tracking compensates in the opposite direction to what you'd guess. The generic alternative is one font-family with `letter-spacing: -0.02em` on every heading — which makes 24px headings look cramped and 72px headings look loose, simultaneously, which is why AI-generated hero sections have that mushy, slightly-wrong feel you can't name. **Doesn't apply** if you're using a single-optical-size grotesque like Inter or Helvetica; those want mild negative tracking that scales monotonically. Check whether your font has an `opsz` axis before you copy this curve.

**2. Body copy does not scale responsively. Only headlines do.**
`.typography-body` is defined exactly once in 1.2 MB of Apple CSS: `17px / 1.4706 / −0.022em`. No breakpoint override. Meanwhile `.typography-headline-super` is defined three times (80 → 64 → 48px) and `.typography-eyebrow` twice (24 → 21px). Reading size is a function of the human eye and the viewing distance, not the viewport width; headline size is a function of the column it has to fill. The generic alternative is `clamp(1rem, 2vw + 0.5rem, 1.25rem)` on body text, which makes paragraphs subtly reflow while you resize and produces a different reading experience on every laptop. **Doesn't apply** to genuinely fluid editorial layouts where the measure is also fluid — but even then, step it, don't pour it.

**3. Semantic colors carry four values, not two.**
Every iOS system color publishes light, dark, increased-contrast-light, and increased-contrast-dark. Yellow's AX-light value `#A16A00` shares almost nothing with its default `#FFCC00`. This is the thing nobody ports to the web. The generic alternative is `--color-warning: #FFCC00` and a dark-mode override, which fails Increase Contrast users completely and fails WCAG AA on white at any size below 18pt bold. On the web the equivalent hook is `@media (prefers-contrast: more)` — apple.com uses it once; that's a gap, not a model. **Doesn't apply** when your palette is already ≥7:1 in its default form; then a single value is honest.

**4. Grays on tinted grounds are alphas.**
Apple's App Store web app sets primary text to `rgba(0,0,0,0.88)`, secondary `rgba(0,0,0,0.56)`, tertiary `rgba(0,0,0,0.48)` — and the iOS semantic labels use the `(60,60,67)` family at 0.60/0.30/0.18. Flighty independently ships `rgba(59,59,67,0.6)`. The reason is composability: an alpha gray laid over a white card, a `#F5F5F7` section, or a colored callout stays proportionally correct. A hex gray does not. The generic alternative is `text-gray-500` from a fixed ramp, which visibly detaches the moment it lands on a tinted surface. **Doesn't apply** where you need guaranteed contrast ratios computed at build time, or on top of images — there you need opaque values with a scrim.

**5. Hover changes the fill's luminance by ~3%. Nothing moves.**
`#0071E3 → #0076DF` on hover, `→ #006EDB` on active. Dark neutral: `#1D1D1F → #272729 → #18181A`. Light neutral: `#F5F5F7 → #FFFFFF → #EDEDF2`. No `translateY(-2px)`, no `scale(1.02)`, no shadow bloom, no border appearing. Why it works: when you sweep a cursor across a page with 30 interactive elements, movement reads as instability. The generic alternative — lift-and-shadow on hover — is the single most reliable tell of a generated interface. **Doesn't apply** to cards in a discovery grid where the lift is the affordance (a store, a gallery); it does apply to every list row, nav item, toolbar button and table cell you will ever build.

**6. The pill radius is 980px, and block buttons step their radius by viewport.**
Not `9999px`. Not `50%`. A finite, deliberate `980px` that resolves to a true pill on anything shorter than 1960px and degrades predictably if something ever gets taller. Full-width buttons go `12px` on desktop → `10px` → `8px` → `5px` on the smallest breakpoint. The reason: radius should be roughly proportional to the element's shortest edge, and a full-width button's height doesn't change but its *visual weight relative to the screen* does. The generic alternative is `rounded-lg` everywhere, at every size, which makes small controls look bubbly and large panels look unfinished. **Doesn't apply** if your product has committed to a single radius as a brand device (Mela's 5px, Panic's hard pills).

**7. Two radius scales, not one — and the small one is smaller than you think.**
Apple's macOS surfaces use **6px** as the dominant control radius (37 occurrences on the App Store page vs. 14 at 10px and 10 at 8px). Mela uses 5px and 7px, full stop. Things uses 6px. Meanwhile Flighty's *marketing* site uses 16px cards and 999px pills. The pattern: **product chrome is 6–8px, marketing furniture is 12–20px, pills are pills.** The generic alternative is `rounded-xl` (12px) on everything from a 24px chip to a 600px panel. **Doesn't apply** to iOS content cards, which really are 12–16px because the device bezel is.

**8. Sidebar rows are 30px with a 6px radius and no hover border.**
Measured on Apple's own App Store web app: 30px tall, 3px padding, 6px radius, 15px/20px text at weight 400, transparent until selected. Reeder's Mac sidebar and Craft's both read at the same density in their marketing screenshots. Compare a default Tailwind admin sidebar: 44px rows, 8px gap, a border-on-hover. That difference — 30 vs 44 — is 47% more rows on screen and the entire reason these apps feel like tools rather than dashboards. **Doesn't apply** on touch. 30px rows on a phone violate the 44pt target by a mile; iOS list rows are 44pt minimum for exactly this reason, and the same app ships both.

**9. The tracking table gets applied literally, and you can tell.**
Flighty's site computes to `13px / letter-spacing: -0.08px`, `15px / -0.23px`, `17px / -0.43px`. Those are Apple's published point-value tracking numbers for 13pt, 15pt and 17pt, transcribed into CSS pixels. Nobody does this by accident. Why it works: it makes the web page's text metrics identical to the app's, so a screenshot of the app dropped into the page doesn't read as a foreign object. The generic alternative is `tracking-tight` on headings and default everywhere else. **Doesn't apply** if your app isn't an Apple app — copying Apple's SF tracking onto Inter produces text that is measurably too tight at 17px.

**10. Content type and chrome type are different families.**
Mela: `-apple-system-ui-rounded, ui-rounded` for the interface, `ui-serif, -apple-system-ui-serif, Charter, serif` for recipe content — and the in-app screenshot shows recipe titles set in New York while every label, timer and metadata chip is SF. Reeder does the same split for articles. Bear ships `bearsans` for UI and `bearsansheadline` for note titles. The principle: the interface is a frame, the content is a picture, and frames shouldn't compete. The generic alternative is one sans for everything including the user's own long-form writing, which makes a notes app feel like a settings screen. **Doesn't apply** to apps where the content *is* interface (a task manager, a tracker, a dashboard). Things uses one family and is right to.

**11. Long-form body gets ~1.7 line-height; display gets ~1.05–1.15.**
Bear: 16px/27.2px (1.70) for body, 51.2px/56.32px (1.10) for h1. Apple: 17px/25px (1.47) for marketing body, 80px/84px (1.05) for the hero. Both keep display ratios tight enough that two lines of headline read as one shape. The generic alternative is `leading-relaxed` (1.625) applied uniformly, which leaves 48px headlines floating apart. **Rule of thumb from these measurements**: at 12–17px use 1.45–1.70; at 19–32px use 1.14–1.21; at 40px+ use 1.05–1.11.

**12. `prefers-reduced-motion` is not an afterthought — it's 34 separate blocks.**
And every one of them has a real alternative, not `animation: none`. Apple's scroll-driven product sequences fall back to static hero images with the same crop and the same composition, so the reduced-motion page is a *different valid design*, not a broken one. The generic alternative is a single global `* { animation: none !important }` which strips loading spinners and state transitions along with the parallax. **Always applies.** There is no product where this is optional.

---

## States, edges and the unglamorous parts

**Empty / zero-data.** The craft convention is a single centered SF Symbol at ~48–64pt in `systemGray3`, a Title 3 line, one Body line of explanation, and — critically — the *action* as a real button, not a text link. Things' empty Today view is a single line of text and nothing else, because the emptiness is the reward. Contrast that with a first-run empty state, which needs the action. Distinguish "you finished" (celebrate the void) from "you haven't started" (show the door).

**Loading.** iOS convention is: no spinner under ~1s. Show the destination's chrome — the navigation bar, the section headers, the row skeletons at the exact final row height — and fill in. Apple's own pages use a `--color-loading-placeholder-background` token so skeletons inherit the section's ground rather than being universally gray. The failure mode is a centered spinner on a blank screen, which throws away the navigation-stack continuity that makes iOS feel fast.

**Errors.** Native alerts are: a Title 3 semibold sentence-case title, one Body sentence, and 1–2 buttons where the destructive one is `systemRed` and the *cancel* one is bold. The web version people build has a red banner with an ⚠️ and 40 words. Halide's error handling (from its store screenshots) surfaces the camera state inline in the viewfinder chrome rather than modally — the instrument tells you it's not ready, it doesn't interrupt you.

**Permission denied.** Apple's model: never ask cold. Show a pre-permission screen in your own voice that explains the value, *then* trigger the system prompt. When denied, don't nag — put a persistent, quiet inline affordance where the feature would be, linking to Settings. Flighty's whole value proposition depends on notification permission and its onboarding still explains before it asks.

**Offline.** The craft answer is optimistic local writes with a sync indicator that is *ambient*, not modal. Reeder's Mac sidebar puts a small cloud glyph on the right edge of "Later" and "Favorites" rows — the sync state lives on the affected row, not in a global toast. Things, Bear and Mela all sync via iCloud and none of them show a sync modal. The generic alternative is a full-screen "You're offline" takeover, which is correct for a bank and wrong for a notes app.

**First run.** Overcast, Things and Apollo all open into a usable, populated-enough state rather than a tour. Where onboarding exists (Flighty, Structured) it is 3–4 full-bleed screens with one idea each and a persistent skip. Apple's own pattern is the "What's New" sheet: a large title, 3–4 icon+text rows, one bottom-pinned Continue button.

**Too much data.** iOS's answer is section headers that stick, a scroll indicator, and an index. The macOS answer is a sidebar plus a list plus a detail pane, where the two narrow panes are roughly equal width and the content pane takes the remainder — visible in Reeder's own product shot, where sidebar and article-list read as near-identical widths and the reading pane takes about half the window. The failure is infinite scroll with no positional anchoring.

**Increase Contrast / Bold Text / Larger Text.** These are three separate system settings and the craft apps respect all three. Larger Text at AX5 makes Body **53pt** — inline metadata (timestamps, badges) must reflow *below* the label rather than beside it. The HIG's exact instruction: "consider using a stacked layout where text appears above secondary items" and "reduce the number of columns when the font size increases."

---

## Mobile

This archetype is *native to* mobile — the constraints came from the phone. What changes going down:

- **Tap targets go to 44×44pt minimum.** The 30px sidebar row that's correct on Mac becomes a 44pt list row on iPhone. Same app, same brand, different metric. This is the single most common failure when a Mac-first team ships an iOS version.
- **Type does not shrink; it holds.** iOS Body is 17pt and stays 17pt. What shrinks is the *headline* (apple.com's hero goes 80 → 64 → 48px across its three breakpoints) and the *gutters*.
- **Buttons get bigger, not smaller.** Apple's mobile CTA on the iPhone page is a full-width-ish pill with 17px text, paired with a plain text link ("View pricing ›") as the secondary. Two buttons of equal weight side by side is a desktop pattern.
- **Sheets replace modals.** iOS sheets rest at **detents**: `large` (full height) and `medium` (~half). Add `medium` when the content is progressively disclosable (a share sheet), skip it when the content needs room (a compose view). Include a **grabber** on any resizable sheet — it's both the visual affordance and the VoiceOver handle. On iPad, use page or form sheet styles instead, centered over a dimmed parent.
- **Navigation is a stack, not a router.** Push/pop with a back button labeled with the *previous screen's title*, and an interactive edge-swipe that tracks the finger. The transition is continuous: the outgoing view parallaxes at roughly a third of the incoming view's speed, so the gesture is scrubbable and cancelable at any point. This is what "transition continuity" means concretely and it is the thing web SPAs almost never reproduce.
- **Haptics carry state changes, not clicks.** HIG's three predefined families are notification (success/warning/error), impact, and selection. The rule from the guidelines: "build a clear, causal relationship between each haptic and the action that causes it," and "the best haptic experience is one that people may not be conscious of, but miss when it's turned off." A haptic on every button tap is the tell of someone who just discovered `UIImpactFeedbackGenerator`.
- **Liquid Glass floats above content, never inside it.** Tab bars, toolbars and sidebars get it; app backgrounds and content cards get standard materials (`ultraThin` / `thin` / `regular` / `thick`). Over bright media use the **clear** variant with a **35% dark dimming layer**; over already-dark media, no dimmer. Flighty's floating pill nav and Structured's translucent header are the two clearest web-side interpretations I measured.

---

## How this archetype fails

The bad imitation has a recognizable shape. In order of how often I've seen it:

1. **iOS chrome pasted onto a web page.** A fake status bar with 9:41 and a battery icon. A bottom tab bar on a 1440px viewport. A back chevron with "Back" in `#007AFF` at the top-left of a page that has browser history. These fail because the browser already provides navigation, the viewport is not a phone, and the mimicry sets an expectation of native gesture behavior the page cannot honor. **Take instead:** the *metrics* (44pt targets, 17px body, the tracking curve, the alpha grays, the 6px control radius) and leave the *furniture*.

2. **`-apple-system` as the entire design decision.** Setting `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI"...` and calling it Apple-like. On a Mac you get SF, on Windows you get Segoe, on Android you get Roboto — and your carefully-tuned `letter-spacing: -0.022em`, which was derived from SF's optical curve, is now wrong on two of three platforms. Worth knowing what Apple itself does here, because it's counterintuitive: **apple.com ships zero `.woff2` files and defines exactly one `@font-face` block** (a legacy chevron icon font). It names `SF Pro Text` / `SF Pro Display` directly and falls back to `Helvetica Neue, Helvetica, Arial` — so on Windows you are reading apple.com in Arial, with SF's tracking values applied. Apple can afford that; you probably can't. Flighty takes the opposite route and **self-hosts SF Pro Text Regular and Semibold as webfonts** for the parts of its site that imitate the app, while leaving prose on `system-ui`. That split — webfont for app-mimicry, system stack for prose — is the honest version.

3. **Rounded type + rounded corners + rounded icons + pill buttons.** Compounding softness. Mela is the counter-example: SF Rounded body, and **5px** corners. Pick one axis of softness and let the others be crisp.

4. **A gradient blob background.** The purple-to-blue mesh gradient behind a glassmorphic card is the visual signature of this archetype's failure mode. Real Apple pages use *product photography* as the layout element — the iPhone page's hero is a photographed device on black; Fantastical's decorative elements are translucent app-icon-shaped squares that reference the actual product. If you have no product to photograph, use flat color, not a blob.

5. **Hover lift.** Covered above, but it's the fastest tell. Sweep the cursor down a list; if things move, it's generated.

6. **A single letter-spacing value on all headings.** Usually `-0.02em` or `tracking-tight`. Wrong in both directions at once.

7. **Semantic colors that only have two values.** Ship a `prefers-contrast: more` block or admit you didn't.

8. **Marketing pages that imitate Apple's *layout* instead of its *discipline*.** Full-bleed alternating sections, centered 56px headline, 17px subhead, two pills, repeat ×8. Apple can do this because each section is anchored by a real photographed object. Without the object it's a template. Look at what the craft scene actually does with marketing: Things is one icon and one sentence; Overcast is unstyled HTML; Panic is navy and Didone; Sofa is cream and a slab serif; Bear ships a custom typeface. **None of them look like apple.com.** The craft is in the app; the site is allowed to have its own voice.

9. **Skipping the accessibility settings.** No Dynamic Type support, no reduced-motion alternative, no Bold Text handling. Apple's own CSS has 34 reduced-motion blocks. If yours has zero, the difference is visible to about 1 in 5 users and invisible to you.

10. **`clamp()` on everything.** Apple uses it 7 times in 1.2 MB and never for font-size in `vw`. Fluid type is a fashion, not a standard.

---

## Copy and tone

**Voice:** declarative, present tense, sentence case, second person only when instructing. Specific nouns over category nouns. No exclamation marks in chrome. Periods on full sentences in body copy; none on button labels, nav items, or list rows.

**Right:**
- `Get the truth when you travel` (Flighty — a claim, not a category)
- `Simply Powerful` / `Things is the award-winning personal task manager that helps you plan your day, manage your projects, and make real progress toward your goals.` (Things — headline is the feeling, subhead is the definition)
- `Pick up extra speed without distortion with Smart Speed, which dynamically shortens silences in talk shows.` (Overcast — names the mechanism)
- `Zero AI, Natural Photos, RAW` (Halide's App Store subtitle — three nouns, one position)
- `Restored support for Cmd+Delete in Quick Entry's checklists.` (Things release notes — the actual change, at keystroke granularity)
- `Apollo shut down on June 30, 2023 due to Reddit making drastic and sudden increases to API pricing for developers.` (states the fact before the feeling)
- `Free, 30-day trial · 75.8 MB .zip · Requires macOS 15.6+` (Panic — the three things a Mac user actually wants to know, in one line)

**Wrong:**
- `Supercharge your productivity with AI-powered task management` — three category words, zero information
- `Seamlessly organize your workflow` — "seamlessly" and "workflow" in one sentence
- `Oops! Something went wrong.` — says nothing, apologizes for nothing specific
- `You're all caught up! 🎉` — the emoji and exclamation undo the calm the empty state is supposed to create; Things just shows an empty list
- `Unlock the full potential of your data` — potential, unlock, full
- `Bug fixes and performance improvements` — Things ships four specific lines instead

**Buttons:** verb + object, ≤3 words. `Download Nova 14.1`, `Try Craft Free`, `Download Sofa`, `Get the app`. Not `Learn More`, `Get Started`, `Click Here`.

**Empty states:** name the state, then the action. `No flights yet` + `Add a flight`. Not `Nothing here yet! Add your first item to get started.`

**Errors:** what happened, then what to do, in that order, in one sentence each. `Couldn't reach iCloud. Your changes are saved on this device and will sync when you're back online.` Not `Sync error (code 4097).`

**Release notes are part of the design.** Apple's 2026 ADA citation for *grug* explicitly calls out "its release notes." Things ships four lines describing four specific fixes at the level of `Cmd+Delete in Quick Entry's checklists`. This is the cheapest possible craft signal and almost nobody does it.

---

## Sources

- `https://www.apple.com/iphone-17-pro/` — probed computed styles (body 17px/25px SF Pro Text, ls −0.374px; h1 80px/84px w600 ls −1.2px; `.button` h44 r980px) and fetched the full shipped stylesheet (1.2 MB) to extract the `.typography-*` ladder, `--sk-button-*` tokens, breakpoint frequencies, easing/duration distribution, and the 34 `prefers-reduced-motion` blocks. Screenshotted at 1440 and 390.
- `https://developer.apple.com/design/human-interface-guidelines/typography` — extracted all Dynamic Type tables (iOS xSmall→AX5, macOS, tvOS, watchOS) by reading every tab panel from the DOM, plus the full SF Pro tracking table (6pt–96pt, in 1/1000 em and points).
- `https://developer.apple.com/design/human-interface-guidelines/color` — extracted the 12 system colors and 6-step gray ramp in all four appearances by reading the RGB values out of the swatch images' `alt` attributes and converting to hex.
- `https://developer.apple.com/design/human-interface-guidelines/accessibility` — hit target table (44/28/60pt) and contrast minimums (4.5:1 / 3:1).
- `https://developer.apple.com/design/human-interface-guidelines/materials` — Liquid Glass regular vs. clear, the 35% dimming rule, and the four standard materials.
- `https://developer.apple.com/design/human-interface-guidelines/sheets` — detents (large / medium), grabber behavior, iPad page/form sheet guidance.
- `https://developer.apple.com/design/human-interface-guidelines/layout` — tvOS safe areas, visionOS 60pt control spacing.
- `https://developer.apple.com/design/human-interface-guidelines/app-icons` — 1024×1024 layered spec, six appearance variants, Icon Composer, per-platform masking.
- `https://developer.apple.com/design/human-interface-guidelines/playing-haptics` — notification/impact/selection families, transient vs. continuous, sharpness/intensity.
- `https://developer.apple.com/design/awards/` — the 2026 winner list; source for Moonlitt (Interaction), Tide Guide (Visuals and Graphics), grug (Delight and Fun), Blippo+ (Panic).
- `https://apps.apple.com/us/app/things-3/id904280696` and `.../halide-mark-iii-pro-camera/id885697368` — Apple's own web app; probed for the macOS type scale (12px/15px dominant, body 13px/16px), alpha label colors, radius distribution, and measured sidebar rows at 30px/3px/6px. Also the source of real in-app Halide screenshots (black chassis, instrument typeface, yellow accent, physical-dial exposure readout).
- `https://culturedcode.com/things/` — screenshotted; one icon, one paragraph, one link above the fold.
- `https://www.flightyapp.com/` — probed; found `SF Pro Text Regular`/`SF Pro Text Semibold` webfonts alongside `system-ui`, and computed tracking of −0.08/−0.23/−0.43px at 13/15/17px matching Apple's published point values. Screenshotted at 1440 (×4 scroll positions) and 390.
- `https://halide.cam/` — screenshotted; custom wide geometric display face on black, yellow accent.
- `https://tapbots.com/ivory/` — screenshotted; rendered 3D hero, dark ground, purple/blue accents.
- `https://mela.recipes/` — probed; `-apple-system-ui-rounded` body, `ui-serif` content face, `#FFD609` / `#3C321E` / `#1E1E19`, radii of 5px and 7px only.
- `https://reederapp.com/` — screenshotted; real three-pane Mac window with SF sidebar, per-row cloud sync glyphs, right-aligned relative timestamps.
- `https://bear.app/` — probed; `bearsans` and `bearsansheadline` custom families, 1.7 body ratio / 1.1 display ratio, `#DD4C4F`.
- `https://www.craft.do/` — screenshotted; Mac window with sidebar, fill-on-select rows, no hover borders.
- `https://www.sofahq.com/` — probed; Inter + `new-kansas` slab, `#FFF4EE` ground, uniform −0.4px tracking, h1 at −3px (−0.05em).
- `https://overcast.fm/` — screenshotted; near-unstyled HTML, system font, orange links.
- `https://panic.com/` and `https://panic.com/nova/` — screenshotted; navy ground, Didone tagline, acid-green and cyan pills, real app window screenshot.
- `https://iconfactoryapps.com/` — screenshotted; app cards with a full-bleed artwork band over a solid dark text strip, no scrim.
- `https://flexibits.com/fantastical` — screenshotted; translucent stacked rounded-squares as Liquid Glass-era decorative furniture.
- `https://structured.app/` — screenshotted; Liquid Glass pill nav over full-bleed video.
- `https://apolloapp.io/` — screenshotted; single-column SF memorial page with the alternate-app-icon strip.
- `https://apps.apple.com/us/app/moonlitt-moon-phase-tracker/id1602987351`, `.../tide-guide-charts-tables/id971704814` — screenshotted the store pages for the two off-list ADA winners.
