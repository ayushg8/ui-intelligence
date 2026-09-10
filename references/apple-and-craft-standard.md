# Apple, and the Platform-Craft Standard

**Evaluated:** 2026-09

## What this archetype is for

Products where the interface is expected to feel *made* rather than *assembled*: single-purpose tools people open dozens of times a day (task managers, readers, cameras, trackers, notes), premium hardware/product marketing, and any app whose selling proposition is "someone cared about this." The user situation is repeat and high-frequency: the app gets opened 5–50 times a day in sessions under a minute, so a 200ms hesitation is paid hundreds of times a month instead of once. This archetype does **not** fit multi-tenant B2B admin consoles, data-dense analytics, or anything with 40 configurable columns; those belong to the Linear/Retool density archetype. It also does not fit consumer growth funnels where conversion beats craft. The distinguishing test: if the product's users would notice a 1px misalignment, you're here. If they'd notice a missing bulk-export, you're not.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **apple.com** (iPhone 17 Pro, iOS, macOS pages) | 1.2 MB of CSS containing a 13-step type ladder, a 4-seam breakpoint system, one easing across 312 of the 467 `cubic-bezier` declarations, and 34 reduced-motion alternatives — all of it readable by anyone with devtools | The tracking curve: negative below 17px, **positive** from 19–32px, back to zero at 40px, negative again above. It is why Apple headlines look "set" and a single `-0.02em` looks "typed" — the latter is wrong in both directions at once. |
| **Apple HIG** (developer.apple.com/design) | Publishes its optical-size tracking table (6–96pt in 1/1000 em), per-appearance color values, and per-platform hit targets as numbers rather than prose | The increased-contrast color column. Every semantic color has four values, not two — and the increased-contrast pair is not derivable from the default pair. |
| **App Store web app** (apps.apple.com) | Apple's own product UI shipped as a web app — the honest answer to "what does macOS look like in a browser" | 30px sidebar rows · 6px radius on 37 elements, more than every other radius combined · 13px/16px body, 12px/15px dominant · every text color an alpha (`rgba(0,0,0,0.88/0.56/0.48)`), no hex grays. |
| **Things** (Cultured Code) | 15 years of a task manager with almost no visible chrome; the Magic Plus button is the most-copied interaction in the indie Mac scene | Its above-the-fold at 390px is: app icon, wordmark, one 23-word sentence, and a *video* link. **No download button above the fold at all** — the store links sit below it. |
| **Flighty** | 2023 Apple Design Award; an iOS app whose *website* borrows from the app instead of the reverse | It applies Apple's literal tracking table — 13px/−0.08px, 15px/−0.23px, 17px/−0.43px, the exact HIG point values — but **only on the ~18 nodes that imitate app surfaces**, leaving prose on untracked `system-ui`. The selectivity is the technique. |
| **Halide** (Lux Optics) | ADA winner; proves the craft scene deviates from SF *deliberately*, not ignorantly | Domain-appropriate voice: a camera app gets an instrument typeface and a black chassis, not SF on white. |
| **Mela / Reeder** (Silvio Rizzi) | Two apps, one author, two complete typographic systems | `-apple-system-ui-rounded` for chrome, `ui-serif` (New York) for recipe/article content. On the marketing page the serif is used exactly twice — the wordmark and the recipe titles inside the product screenshot — which is enough to read the split without stating it. |
| **Bear** | Ships its own typeface family (`bearsans`, `bearsansheadline`) rather than SF | Line-height 1.7 for long-form body (16px/27.2px), 1.1 for display. Two ratios, not one. |
| **Overcast** (Marco Arment) | The anti-marketing marketing page: system font, orange links, no framework | Unstyled HTML is a post-hoc signal, available only after distribution is already solved. It reads as confidence on a known product and as abandonment on an unknown one. |
| **Panic** (Nova, Blippo+) | 100% Mac-native apps behind a website that looks nothing like Apple | Craft ≠ imitation. Panic runs one custom face (`Booton`) with **weight 300 as the default, not 400**, uniform `−0.5px` tracking, section heads at 42px/45px with `−2.1px` (−0.05em), and an accent declared as **`color(display-p3 0.47 0 1)`** — a purple outside the sRGB gamut. The app is pure AppKit. |
| **Iconfactory** (Tapestry, Triode, xScope, Tot) | The custom-icon house; every app icon is hand-drawn at every size | Card design where the *artwork* is the hero band and the text sits in a solid dark strip beneath — no scrim, no gradient overlay. |
| **Ivory / Tapbots** | Rendered 3D hero art + a fully system-native app | Site and app are allowed to be different genres — but only in *decoration*. Tapbots' rendered hero is an illustration of the mascot, not a fake UI; the moment a site invents chrome the app doesn't have, the genre split becomes a lie. |
| **Sofa** | Apple-native app, deliberately non-Apple web presence (Inter + new-kansas slab) | Cream `#FFF4EE` ground, a **title-case** slab h1 at 60px/60px, and two different tracking values at the same size: `−3px` on the hero h1, `−1.5px` on the identical-size section h2s. Optical correction by role, not by size alone. |
| **Fantastical / Flexibits** | The clearest published example of Liquid Glass-era visual language on a marketing site | Translucent stacked rounded-squares as decorative furniture instead of gradient blobs. |
| **Apollo** (rip) | A single-column SF page with no nav, no footer links and no CTA — the whole page is one measure of text and one icon strip | The custom-icon grid: 8 alternate app icons as a strip. Alternate icons cost one asset each and zero runtime, and they are the cheapest signal that someone drew rather than generated the identity. |
| **Moonlitt** (Flipping Hues) — *not on the brief's list* | 2026 ADA **Interaction** winner; SwiftUI across iOS/iPadOS/macOS/visionOS/watchOS from a two-person Italian studio | One SwiftUI codebase that respects five platforms' distinct idioms rather than shipping one layout everywhere. |
| **Tide Guide** (Condor Digital) — *not on the brief's list* | 2026 ADA **Visuals and Graphics** winner | Its palette tracks the actual color of the sky through the day. Data-driven theming instead of a static dark mode. |

*How I found the two off-list products:* I pulled `developer.apple.com/design/awards/` and read the 2026 category winners. Apple's own awards page is the highest-signal discovery surface for this archetype and it's public, current, and annotated with why each app won. Reeder and Mela cross-surfaced from each other — Mela's site header links "Reeder →" because they share an author.

---

## Measured specifics

### Apple's actual web type ladder
Extracted from apple.com's shipped stylesheet (1,234,388 bytes, `.typography-*` classes). All tracking is in `em`, all line-height is a unitless ratio, weight is 600 for every display size and 400 for body. Re-verified 2026-09: all 13 rows below still match the shipped CSS byte for byte.

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

This is visible in the rendered DOM, not just the stylesheet. Probing apple.com/iphone-17-pro at **390px** returns 151 nodes at `21px / ls +0.231px`, 82 at `28px / +0.196px`, 33 at `32px / +0.128px`, and 4 at `19px / +0.228px` — every heading between 19 and 32px is **letterspaced apart**, on a phone, while the body at `17px / −0.374px` is spaced together. If your build has a single negative `letter-spacing` on headings, you have inverted this across a 13px-wide band that contains most of your section headers.

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

iOS body is 17pt. macOS body is **13pt**. Same company, same font, 24% difference, because the viewing distance and the pointer precision differ. Confirmed live 2026-09: the App Store *web app* sets `body { font-size: 13px; line-height: 16px; color: rgba(0,0,0,0.88) }` on an `#F5F5F7` ground, and its most common text style is **12px/15px** (201 nodes on the Things 3 page; ~190–205 depending on how many reviews and related-app rails render). Second most common is 13px/18px (98). apple.com marketing sets body at **17px/25px** and holds it at 390px. Apple runs two scales and picks by context, not by viewport.

### iOS 26 system colors — light, dark, **and increased-contrast**
Read from the HIG color tables (values updated 9 June 2025; page last revised 16 December 2025 for Liquid Glass). **All 48 values below re-verified against the live HIG tables 2026-09 — zero drift.** These are current, not the 2016 classics.

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

Notice the increased-contrast column is not "the same hue, darker." Yellow goes from `#FFCC00` (**1.51:1** on white — illegal as text at any size) to `#A16A00` (**4.59:1**), which is a brown. Mint goes `#00C8B3` (2.12:1) → `#008575` (4.55:1). Blue barely moves in light mode (`#0088FF` → `#1E6EF4`) but jumps hard in dark (`#0091FF` → `#5CB8FF`). So the transform is not one function applied to twelve hues; it is twelve separate decisions, and four of them change the hue family outright. You cannot generate this column with a lightness multiplier.

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

### Apple's four different blues (all shipping simultaneously)
- **`#0071E3`** — apple.com button fill (`--sk-button-background: rgb(0,113,227)`, 46 hex occurrences), hover `#0076DF`, active `#006EDB`. A second hover value `#0077ED` exists once — a stray.
- **`#0066CC`** — written as `rgb(0,102,204)`; apple.com's secondary-button **border** color. Never a fill.
- **`#007AFF`** — App Store web app links and buttons, and the classic UIKit blue. Appears **zero** times on apple.com.
- **`#0088FF`** — the current iOS 26 `systemBlue`.

Four blues, chosen by surface, none interchangeable. If you have picked "the Apple blue" you have picked one of four and probably the wrong one for your surface: `#0071E3` is a web *fill* (4.70:1 on white, passes AA for text), `#0088FF` is a native *tint* (3.52:1, passes only for large/bold text and non-text UI). Swapping them silently breaks contrast on any small blue label.

### Neutrals measured on apple.com
By frequency in the shipped CSS: `#1D1D1F` ink (21), `#6E6E73` secondary (13), `#F5F5F7` section-alt background (10), `#86868B` tertiary (7), `#D2D2D7` rules (**1** — a near-unused token; don't build a rule system on it). Plus `rgba(0,0,0,0.56)` footnotes and `rgba(0,0,0,0.8)` nav links. Dark-mode section alt: `#1D1D1F`. Nav keyline: `rgba(29,29,31,0.2)`, sticking: `rgba(29,29,31,0.1)`.

The whole neutral system is **five opaque values and two alphas**. Not a 50–950 ramp.

### Alpha-based label colors (App Store web app, measured)
`rgba(0,0,0,0.88)` primary · `rgba(0,0,0,0.56)` secondary · `rgba(0,0,0,0.48)` tertiary · `rgba(60,60,67,0.03)` faintest fill. Flighty independently ships `rgba(59,59,67,0.6)` for secondary text on its site — the same `(60,60,67)` family iOS uses for `secondaryLabel`. **Apple's grays on non-white grounds are alphas, not hexes**, which is why they survive being dropped onto a tinted card.

### Buttons — Apple's actual spec
```
--sk-button-border-radius: 980px;   /* not 9999px, not 0.5rem */
--sk-button-padding-horizontal: 22px;  --sk-button-padding-vertical: 12px;  /* default, 17px text */
.button-super    → 31px / 18px,  17px text
(small viewport) → 16px / 9px,   14px text
.button-reduced  → 11px / 4px,   12px text
--sk-button-min-width-basis: 45px | 60px | 70px | 90px   /* four values, not a range */
box-sizing: content-box   /* padding is measured from the text box, then 1px border subtracted */
```
Block (full-width) buttons **step their radius by viewport**: the `--sk-button-border-radius` token ships at `980px` (pill), `12px`, `10px`, `8px` and `5px`, narrowing as the screen does. Confirmed in the DOM: at 1440px the page's dominant card radius is 20px, at 390px it is 12px.

Hover is a ~3% luminance shift on the fill (`#0071E3 → #0076DF`), never a transform, never an opacity change, never a border appearing.

**Where Apple violates its own HIG, and you should know before you copy it:** the CTA buttons on apple.com/iphone-17-pro at 390px measure **115×42px** (14px text, 11/21 padding) and **104×36px** for the reduced variant. Both are under the HIG's 44×44pt minimum. The web team optimises for line-length, the app team for thumbs. Copy the *token structure*, not those two heights.

### Breakpoints (frequency count across apple.com's CSS, re-counted 2026-09)
`734px` (299) · `1068px` (235) · `833px` (158) · `1069px` (47) · `480px` (36) · `420px` (32) · `782px` (31) · `735px` (29) · `1023px` (28) · `1441px` (24) · `834px` (22) · `1108px` (20) · `320px` (17) · `360px` (13).

The **four load-bearing** seams are 734/735, 1068/1069, 833/834 and 1441 — that's **≤734 small · 735–1068 medium · 1069–1440 large · ≥1441 xlarge**, with 833/834 as an iPad-portrait seam. The rest (420, 782, 1023, 1108) are component-local overrides, not a global system, and the long tail is the point: a real breakpoint system has 4 global seams plus per-component exceptions, not 5 global seams that everything obeys. Grid is 12 columns, offsets in 8.3333% steps.

### Motion
Dominant easing on apple.com, by frequency: `cubic-bezier(0.4, 0, 0.6, 1)` — **312 uses** across two spellings (`0.4,0,0.6,1` ×234 and `.4,0,.6,1` ×78) — a **symmetric ease-in-out**, not the ease-out the web preaches. Then `cubic-bezier(0, 0, 0.2, 1)` (95), `cubic-bezier(0.42, 0, 0.58, 1)` (27, which is just `ease-in-out` spelled out), `cubic-bezier(0.25, 0.1, 0.3, 1)` (13), `cubic-bezier(0.28, 0.11, 0.32, 1)` (8), and a deliberate overshoot `cubic-bezier(0.4, 0, 0.3, 2)` used **5 times** — reserved, not sprinkled.

Durations are a **20ms ladder**, not a set of magic numbers: `transition-duration` ships at 260, 280, 300, **320**, 340, 360, 380 and 400ms, with 320ms the clear mode (33 declarations, more than the next three combined). Plus `.32s`, `0.25s`, `0.5s` written in seconds elsewhere — different teams, same system. The takeaway is not "use 320ms"; it is that a mature system has one dominant duration and a fixed step, so nothing is ever hand-typed.

`prefers-reduced-motion` appears **34 times**. `prefers-contrast` appears **once**. `clamp()` appears **7 times** in 1.2 MB. `font-size` in `vw`: **zero**.

### Hit targets and contrast (HIG, verbatim)
| Platform | Recommended | Minimum |
|---|---|---|
| iOS, iPadOS | **44×44 pt** | 28×28 pt |
| macOS | **28×28 pt** | 20×20 pt |
| visionOS | 60×60 pt | 28×28 pt |
| watchOS | 44×44 pt | 28×28 pt |

Contrast: **4.5:1 up to 17pt · 3:1 at 18pt+ · 3:1 for any bold text.**
Default/minimum text size: iOS 17/11 · macOS 13/10 · visionOS 17/12 · watchOS 16/12.
The macOS row is the one people get wrong: a 28pt recommended target is **36% smaller** than the iOS one, which is why a Mac app built to iOS metrics reads as a tablet app in a window.

### Focus ring
`outline: 2px solid #0071E3; outline-offset: 1px` (3px on containers, −7px on inset elements). On dark: `outline: 2px solid rgba(255,255,255,0.92)`. It's an `outline`, not a `box-shadow` ring — so it never affects layout and never gets clipped by `overflow: hidden`.

### Sidebar row spec (measured on Apple's own App Store web app)
```
height: 30px;  padding: 3px;  border-radius: 6px;
font: 15px / 20px, weight 400;  color: rgba(0,0,0,0.88);
background: transparent until selected
section header: 11px, weight 600, rgba(0,0,0,0.56)
```
Compare, on that same page: **6px** is the macOS control radius at **37 instances** — the single most common radius and more than every other value combined. The rest of the distribution is 8px (10), `25%` (6), 17px (5), 24px (4), 10px (3), `1000px` (2), 4px (1). There is **no 12px, no 16px** anywhere on Apple's own product UI. Not 16px-everything.

### Craft-scene measured values
All re-probed 2026-09 at 1440px; counts are DOM nodes on the home page.

| Product | Body | Display | Signature color | Radii in use (by count) |
|---|---|---|---|---|
| **Flighty** | 15px/22.5px (42×), secondary `rgba(0,0,0,0.55)` | h1 65px/78px w700 ls −1px; h2 56px/56px w700 ls −0.28px | accent `rgb(0,133,255)`; the `(59,59,67)` iOS label family at 0.6 alpha | 16px (35), 999px (30), 12px (27), 20px (18), 99px (9) |
| **Sofa** | 16px/24px Inter, ls −0.4px on **every** node | h1 60px/60px w600 ls **−3px**; section h2 60px/60px w600 ls **−1.5px** | ground `#FFF4EE`, accent `rgb(60,102,196)`, footer `#0F1A31`, green `rgb(111,250,163)` | 9999px (24), 8px (17), 6px (7), 16px (7) |
| **Mela** | 16px `ui-rounded`; p at 16px/19.2px (**1.2**) | h1 64px/64px w800 in **`ui-serif`** | `#FFD609` ground, ink `#3C321E`, dark `#1E1E19` | **5px (6), 7px (2)** and one `20%` icon mask. Nothing else. |
| **Bear** | 16px/**27.2px** (1.7) `bearsans`, ink **`#444444`** | 51.2px/56.32px (**1.1**) w400 `bearsansheadline` | `#DD4C4F` | 40px (4), 16px (2), 4.8px (2), 3.84px (2) |
| **Things** | **18px**/25.2px `ui-sans-serif`; nav 15px/24px w600 at `rgba(38,52,74,0.5)` | h1 36px/36px w700 | ground `#F2F5F7`, ink `#303336` | 18px (17), 3px (16), 4.5px (14), 6px (10) |
| **Panic** | 16px/20px **w300** `Booton`, ls −0.5px (w300 on 66 of 116 nodes, w600 on 38) | h2 42px/45px w300 ls **−2.1px**; game titles 80px/104px w300 | `color(display-p3 0.47 0 1)`, ink `#444444` | 10px (16), 22.5px (12), 4px (4) |

Three things worth stealing from that table that are not the obvious one:

- **Mela's 5px/7px pair.** A recipe app on a yellow ground with SF Rounded type — and the corners are almost square, because the *typeface* is already doing the softening. Rounded type + rounded corners + rounded buttons is the compounding error that makes AI output look like a toy.
- **Sofa's two tracking values at one size.** The h1 and the section h2s are both 60px/60px w600 `new-kansas`, and they are tracked differently (−3px vs −1.5px) because the h1 is 47 characters over two lines and the h2s are one word. Tracking is a function of *measure*, not only of size.
- **Panic's default weight is 300, including at 42px and 80px.** One family (`Booton`, 103 of 116 text nodes) with **w300 on 66 nodes and w600 on 38** — a two-weight system whose light end is the default, the inverse of the usual 400-body/700-heading arrangement. Section heads at 42px w300 with `−2.1px` tracking read as *thin and wide* where Apple's read as *dense and set*. Hierarchy comes from size, color and tracking, not weight. That is a legitimate alternative to Apple's 400/600 pair and it is why Panic reads as a different company.

### App icons (HIG, current)
1024×1024 px square, **layered** (background + 1–n foreground layers), authored in Icon Composer, exported with **six appearance variants**: default, dark, clear light, clear dark, tinted light, tinted dark. The system applies the mask, the specular highlight, the refraction and the shadow — you ship flat, opaque, hard-edged vector layers and let it. The web consequence: an icon baked with its own gloss, bevel or drop shadow will double up against the system's, which is why hand-drawn-looking icons (Iconfactory, Panic) hold up and rendered-3D ones age badly.

---

## The decisions that make it work

**1. Two type families, split at 19px, with tracking that changes sign.**
Apple's shipped CSS switches from SF Pro **Text** to SF Pro **Display** at exactly 19px, and the tracking goes from −0.022em (17px Text) to +0.012em (19px Display) across that one step. Then it decays through zero at 40px and back to −0.015em at 80px. Why it works: optically-sized faces are drawn tighter at display sizes and looser at text sizes; the tracking compensates in the opposite direction to what you'd guess. The generic alternative is one font-family with `letter-spacing: -0.02em` on every heading — which makes 24px headings look cramped and 72px headings look loose, simultaneously, which is why AI-generated hero sections have that mushy, slightly-wrong feel you can't name. **Doesn't apply** if you're using a single-optical-size grotesque like Inter or Helvetica; those want mild negative tracking that scales monotonically. Check whether your font has an `opsz` axis before you copy this curve.

**2. Body copy does not scale responsively. Only headlines do.**
`.typography-body` is defined exactly once in 1.2 MB of Apple CSS: `17px / 1.4706 / −0.022em`. No breakpoint override. Meanwhile `.typography-headline-super` is defined three times (80 → 64 → 48px) and `.typography-eyebrow` twice (24 → 21px). Confirmed in the DOM: probing the iPhone page at **390px** returns `body { font-size: 17px; line-height: 25px; letter-spacing: −0.374px }` — bit-identical to 1440px — while the hero h1 has dropped from 80px to **48px/52px, ls −0.144px**, exactly the 48px row of the ladder.

Reading size is a function of the eye and the viewing distance, not the viewport width; headline size is a function of the column it has to fill. The generic alternative is `clamp(1rem, 2vw + 0.5rem, 1.25rem)` on body text, which makes paragraphs subtly reflow while you resize and produces a different reading experience on every laptop. **Doesn't apply** when the *measure* is genuinely fluid and you are willing to hold characters-per-line constant instead of font-size — a single-column editorial layout that goes 45ch → 75ch is a real case for fluid type, because there the variable you are protecting is line length, not glyph size. If you cannot name which of the two you are holding constant, hold font-size.

**3. Semantic colors carry four values, not two.**
Every iOS system color publishes light, dark, increased-contrast-light, and increased-contrast-dark. Yellow's AX-light value `#A16A00` shares almost nothing with its default `#FFCC00`. This is the thing nobody ports to the web. The generic alternative is `--color-warning: #FFCC00` and a dark-mode override, which fails Increase Contrast users completely and fails WCAG AA on white at any size below 18pt bold. On the web the equivalent hook is `@media (prefers-contrast: more)` — apple.com uses it once; that's a gap, not a model. **Doesn't apply** when your palette is already ≥7:1 in its default form; then a single value is honest.

**4. Grays on tinted grounds are alphas.**
Apple's App Store web app sets primary text to `rgba(0,0,0,0.88)`, secondary `rgba(0,0,0,0.56)`, tertiary `rgba(0,0,0,0.48)` — and the iOS semantic labels use the `(60,60,67)` family at 0.60/0.30/0.18. Flighty independently ships `rgba(59,59,67,0.6)`. The reason is composability: an alpha gray laid over a white card, a `#F5F5F7` section, or a colored callout stays proportionally correct. A hex gray does not. The generic alternative is `text-gray-500` from a fixed ramp, which visibly detaches the moment it lands on a tinted surface. **Doesn't apply** where you need guaranteed contrast ratios computed at build time, or on top of images — there you need opaque values with a scrim.

**5. Hover changes the fill's luminance by ~3%. Nothing moves.**
`#0071E3 → #0076DF` on hover, `→ #006EDB` on active. Dark neutral: `#1D1D1F → #272729 → #18181A`. Light neutral: `#F5F5F7 → #FFFFFF → #EDEDF2`. No `translateY(-2px)`, no `scale(1.02)`, no shadow bloom, no border appearing. Why it works: when you sweep a cursor across a page with 30 interactive elements, movement reads as instability. The generic alternative — lift-and-shadow on hover — is the single most reliable tell of a generated interface. **Doesn't apply** to cards in a discovery grid where the lift is the affordance (a store, a gallery); it does apply to every list row, nav item, toolbar button and table cell you will ever build.

**6. The pill radius is 980px, and block buttons step their radius by viewport.**
Not `9999px`. Not `50%`. A finite, deliberate `980px` that resolves to a true pill on anything shorter than 1960px and degrades predictably if something ever gets taller. The `--sk-button-border-radius` token ships five values — `980px`, `12px`, `10px`, `8px`, `5px` — the last four for full-width block buttons as the screen narrows. The reason: radius should be roughly proportional to the element's shortest edge, and a full-width button's height doesn't change but its *visual weight relative to the screen* does. The generic alternative is `rounded-lg` everywhere, at every size, which makes small controls look bubbly and large panels look unfinished.

**Doesn't apply** when the radius is a brand device rather than an optical correction — Mela runs 5px and 7px at every size including its 64px display, Panic runs 10px and 22.5px only. The test is whether a reader could infer the brand from the corner alone. If yes, freeze it and take the optical hit; if no, step it.

**7. Two radius scales, not one — and the small one is smaller than you think.**
Apple's macOS surfaces use **6px** as the dominant control radius: 37 occurrences on the App Store page against 10 at 8px, 5 at 17px, 4 at 24px and 3 at 10px — and **zero at 12px or 16px**. Mela uses 5px and 7px, full stop. Meanwhile the *marketing* sites run large: Flighty 16px (35) / 999px (30) / 12px (27) / 20px (18), Things 18px (17) / 3px (16), Sofa 9999px (24) / 8px (17). The pattern: **product chrome is 3–8px, marketing furniture is 12–20px, pills are pills** — and the two sets barely overlap. The generic alternative is `rounded-xl` (12px) on everything from a 24px chip to a 600px panel. **Doesn't apply** to iOS content cards, which really are 12–16px because the device bezel is; and note that Things' own marketing site leads with 18px, so "small radius" is a claim about *chrome*, not about the brand.

**8. Sidebar rows are 30px with a 6px radius and no hover border.**
Measured on Apple's own App Store web app: 30px tall, 3px padding, 6px radius, 15px/20px text at weight 400, transparent until selected. Reeder's Mac sidebar and Craft's both read at the same density in their marketing screenshots. Compare a default Tailwind admin sidebar: 44px rows, 8px gap, a border-on-hover. That difference — 30 vs 44 — is 47% more rows on screen and the entire reason these apps feel like tools rather than dashboards.

**Doesn't apply** in three real cases, and they cover most products: (a) on touch — 30px rows violate the 44pt target and iOS list rows are 44pt minimum, and the same app ships both; (b) when rows carry two lines (title + subtitle), where 30px is physically impossible and the macOS answer is 38–44px with a 13/11 pair; (c) when the user's Dynamic Type or Larger Text setting is above default, at which point the row must grow with the type or clip it. A fixed 30px row is a *pointer-driven, single-line, default-type* answer. Say those three words out loud before you ship it.

**9. The tracking table gets applied literally, and you can tell.**
Flighty's site computes to `13px / letter-spacing: −0.08px`, `15px / −0.23px`, `17px / −0.43px`. Those are Apple's published point-value tracking numbers for 13pt, 15pt and 17pt, transcribed into CSS pixels. Nobody does this by accident.

**Be honest about the dose.** On a 2026-09 probe those three exact pairs cover only about 18 of ~200 text nodes; the majority of the page runs `letter-spacing: normal` on `system-ui`, and there are two off-table values (`15px / −0.15px`, `13px / −0.23px`). Flighty self-hosts `SF Pro Text` Regular/Medium/Semibold as webfonts and applies the HIG tracking **only on the surfaces that imitate the app** — flight rows, badges, chips — leaving prose on the system stack untracked. That selectivity is the technique. Applying the table globally would be the mistake.

Why it works: it makes the app-mimicking surfaces' text metrics identical to the app's, so a screenshot dropped into the page doesn't read as a foreign object. The generic alternative is `tracking-tight` on headings and default everywhere else. **Doesn't apply** if the surface isn't imitating an Apple app — copying SF's tracking onto Inter produces text that is measurably too tight at 17px, because Inter's default sidebearings are already wider than SF Text's.

**10. Content type and chrome type are different families.**
Mela: `-apple-system-ui-rounded, ui-rounded` for the interface, `ui-serif, -apple-system-ui-serif, Charter, serif` for recipe content — and the in-app screenshot shows recipe titles set in New York while every label, timer and metadata chip is SF. Reeder does the same split for articles. Bear ships `bearsans` for UI and `bearsansheadline` for note titles. The principle: the interface is a frame, the content is a picture, and frames shouldn't compete. The generic alternative is one sans for everything including the user's own long-form writing, which makes a notes app feel like a settings screen. **Doesn't apply** to apps where the content *is* interface (a task manager, a tracker, a dashboard). Things uses one family and is right to.

**11. Long-form body gets ~1.7 line-height; display gets ~1.05–1.15.**
Bear: 16px/27.2px (1.70) for body, 51.2px/56.32px (1.10) for h1. Apple: 17px/25px (1.47) for marketing body, 80px/84px (1.05) for the hero. Both keep display ratios tight enough that two lines of headline read as one shape. The generic alternative is `leading-relaxed` (1.625) applied uniformly, which leaves 48px headlines floating apart. **Rule of thumb from these measurements**: at 12–17px use 1.45–1.70; at 19–32px use 1.14–1.21; at 40px+ use 1.05–1.11.

**Doesn't apply** to short strings, and this is where the rule is most often misused. The 1.05–1.11 band assumes the display text *wraps* — it exists to bind two or three lines into one shape. A single-line 48px heading has no leading to speak of, and forcing 1.05 on it just clips descenders in some browsers; set it to 1.2 and let the margin do the work. It also inverts under 20px on mobile: Flighty's h2 goes from 56px/56px (1.00) at 1440 to 32px/41.6px (**1.30**) at 390 — the same string, looser, because at 32px on a 342px column it now wraps to four lines and needs air between them. Ratio follows line count, not just size.

**12. `prefers-reduced-motion` is not an afterthought — it's 34 separate blocks.**
And every one of them has a real alternative, not `animation: none`. Apple's scroll-driven product sequences fall back to static hero images with the same crop and the same composition, so the reduced-motion page is a *different valid design*, not a broken one. The generic alternative is a single global `* { animation: none !important }` which strips loading spinners and state transitions along with the parallax — including the spinner that is the only signal a slow request is still alive.

**Always applies**, with one honest caveat about cost: 34 blocks is roughly one per animated component, and each is a second composition someone has to art-direct and review. Budget it as a design deliverable, not a CSS afterthought. The cheap correct version — keep opacity and color transitions, drop transforms and parallax, replace any autoplaying sequence with its final frame — is three lines and covers the legal and comfort case; the Apple version is a second design.

---

## States, edges and the unglamorous parts

**Empty / zero-data.** The craft convention is a single centered SF Symbol at ~48–64pt in `systemGray3`, a Title 3 line, one Body line of explanation, and — critically — the *action* as a real button, not a text link. Things' empty Today view is a single line of text and nothing else, because the emptiness is the reward. Contrast that with a first-run empty state, which needs the action. Distinguish "you finished" (celebrate the void) from "you haven't started" (show the door).

**Selected vs. hover — two different states, and most builds collapse them.** Apple's App Store sidebar row is `background: transparent` until *selected*, then a solid fill; hover adds nothing at all, no border, no tint. So the row has three visually distinct conditions (rest / selected / focused-via-keyboard, the last being the 2px outline) and hover is deliberately not one of them. A generated sidebar typically ships rest / hover-tint / selected-tint where the last two are close enough to be ambiguous, so you cannot tell at a glance which row you are *on* and which row you are *in*.

**Disabled.** Apple's shipped token is opacity, not a gray: `--sk-button-disabled-opacity: 0.42` on dark buttons and `0.36` on light ones — two values, because the same opacity does not read the same over the two grounds. Note both fail contrast deliberately; a disabled control is not supposed to be readable at a glance, it is supposed to be identifiable as unavailable. The generic alternative is a `gray-300` fill plus `gray-500` text, which invents a new color pair per theme and usually lands closer to the enabled state than Apple's 0.36.

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
- **Body type does not shrink; it holds — and this is verifiable in seconds.** iOS Body is 17pt and stays 17pt. apple.com at 390px still computes `body { 17px / 25px / −0.374px }`, identical to 1440px. What shrinks is the *headline*: the iPhone page's h1 goes 80px → 48px/52px, landing on the 48px row of the published ladder rather than on an interpolated value. Open your own build at 390 and 1440 and diff the body's computed `font-size`. If it moved, you have fluid body type and you probably didn't decide to.
- **Headlines do not necessarily shrink either.** Flighty holds its h1 at **65px on a 390px viewport** (342px column, three lines) and only tightens the leading, 78px → 71.5px. The h2s do shrink, 56px → 32px. So "scale the hero down on mobile" is not the rule; the rule is that each display step is *re-set* for its new column, and re-setting sometimes means keeping the size and changing the ratio.
- **Buttons do not automatically get bigger — Apple's own don't.** The CTA pills on apple.com/iphone-17-pro at 390px measure **115×42px** (14px text, 11/21 padding), with a 36px reduced variant. Both are under the 44pt HIG minimum, on Apple's own marketing page. What *is* reliably true: the mobile CTA drops to a single primary, paired with a plain text link as the secondary. Two buttons of equal weight side by side is a desktop pattern. If you want 44pt on the web you have to add it yourself, usually as padding on the tap area rather than height on the pill.
- **Radii step down, they don't hold.** apple.com's dominant card radius goes 20px at 1440 → 12px at 390. Flighty's goes 16px → 12px. The pill stays a pill. A radius that survives the trip from desktop to phone unchanged is a radius nobody chose.
- **Gutters, not columns, absorb the width.** Measured at 390px: Mela's paragraph is 350px wide with **exactly 20px** each side; Flighty's h1 is 342px with **exactly 24px** each side. Neither is a percentage. Nothing rescales — the frame narrows by a fixed inset and the content holds its metrics.
- **Sheets replace modals.** iOS sheets rest at **detents**: `large` (full height) and `medium` (~half). Add `medium` when the content is progressively disclosable (a share sheet), skip it when the content needs room (a compose view). Include a **grabber** on any resizable sheet — it's both the visual affordance and the VoiceOver handle. On iPad, use page or form sheet styles instead, centered over a dimmed parent.
- **Navigation is a stack, not a router.** Push/pop with a back button labeled with the *previous screen's title*, and an interactive edge-swipe that tracks the finger. The transition is continuous: the outgoing view parallaxes at roughly a third of the incoming view's speed, so the gesture is scrubbable and cancelable at any point. This is what "transition continuity" means concretely and it is the thing web SPAs almost never reproduce.
- **Haptics carry state changes, not clicks.** HIG's three predefined families are notification (success/warning/error), impact, and selection. The rule from the guidelines: "build a clear, causal relationship between each haptic and the action that causes it," and "the best haptic experience is one that people may not be conscious of, but miss when it's turned off." A haptic on every button tap is the tell of someone who just discovered `UIImpactFeedbackGenerator`.
- **Liquid Glass floats above content, never inside it.** Tab bars, toolbars and sidebars get it; app backgrounds and content cards get standard materials (`ultraThin` / `thin` / `regular` / `thick`). Over bright media use the **clear** variant with a **35% dark dimming layer**; over already-dark media, no dimmer. Flighty's floating pill nav and Structured's translucent header are the two clearest web-side interpretations I measured.

---

## How this archetype fails

The bad imitation has a recognizable shape, and it is specific enough to test for. What follows is written so an agent can run it against its own output: each item is **the tell**, **the check** (something you can actually grep or probe, not a vibe), and **the fix**.

Run the checks against the *computed* DOM, not the source. `node tools/shot.mjs <url> --widths 1440,390` and look; then probe computed styles. Source can look disciplined and still compute to mush.

**The composite signature.** An AI-generated "Apple-like" page fails four or more of these at once, and the combination is more diagnostic than any single one: one font family, one negative letter-spacing on all headings, `rounded-xl` everywhere, a hover lift on every card, a mesh-gradient hero behind a glassmorphic panel, `clamp()` on body type, zero `prefers-reduced-motion`, and copy that opens with a verb like "Supercharge." If you count four, stop tuning and re-derive the type and radius systems; surface fixes will not rescue it.

1. **iOS chrome pasted onto a web page.**
   *Tell:* a fake status bar reading 9:41 with a battery glyph; a bottom tab bar at 1440px; a back chevron labeled "Back" in `#007AFF` at the top-left of a page that has browser history; a fake home indicator pill.
   *Check:* search the markup for `9:41`, for `svg` battery/wifi glyphs outside a device-frame image, and for any fixed-position bar at `bottom: 0` that survives a 1440px viewport.
   *Why it fails:* the browser already provides navigation, the viewport is not a phone, and the mimicry promises native gesture behavior — edge-swipe back, rubber-band scroll, sheet detents — that the page cannot honor. The user tries the gesture, it doesn't work, and the whole thing reads as a mock.
   *Fix:* take the *metrics* (44pt targets, 17px body, the tracking curve, the alpha grays, the 6px control radius) and leave the *furniture*. If you genuinely need to show the app, show a real screenshot inside a real device frame and label it.

2. **`-apple-system` as the entire design decision.**
   *Tell:* `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...` plus `letter-spacing: -0.022em`, and nothing else Apple-derived in the file.
   *Check:* count your `@font-face` blocks. Zero, with a `-apple-system` stack and SF-derived tracking values, is the failing configuration — because on Windows you are now applying SF's optical tracking to Segoe UI and on Android to Roboto, both of which have different sidebearings. Load the page in a non-Mac UA and screenshot it.
   *What Apple actually does — corrected 2026-09, and it is the opposite of what this file previously claimed:* apple.com declares **63 `@font-face` blocks** and hosts **45 `.woff2` files** — SF Pro Text ×18, SF Pro Display ×18, SF Pro Icons ×9 — under the family names `SF Pro Text` / `SF Pro Display` / `SF Pro Icons`, with a `Helvetica Neue, Helvetica, Arial` fallback tail. The iPhone 17 Pro page then downloads exactly **six** of the 45: `sf-pro-text_regular`, `sf-pro-text_semibold`, `sf-pro-text_regular-italic`, `sf-pro-display_regular`, `sf-pro-display_semibold`, `sf-pro-icons_regular`. Two optical sizes × two weights, one italic, one icon face. That is the discipline worth copying: **self-host the face your tracking table was derived from, and ship only the cuts the page actually sets.** Flighty does the same thing at smaller scale — `SF Pro Text` Regular/Medium/Semibold self-hosted for the app-mimicking surfaces, `system-ui` for prose.
   *Fix:* either self-host the optically-sized face and keep the tracking, or use a single-optical-size face (Inter, Helvetica) and throw the tracking curve away. Doing half of each is the failure.

3. **Compounding softness.**
   *Tell:* rounded typeface + rounded corners + rounded icon shapes + pill buttons + soft shadows, all at once.
   *Check:* list your softness axes and count them. Typeface roundness, corner radius, icon corner radius, button shape, shadow blur, gradient softness. More than two active is the failure.
   *Fix:* Mela is the counter-example — SF Rounded body, `#FFD609` ground, and **5px** corners. Pick one axis and let the others be crisp.

4. **A gradient blob background.**
   *Tell:* a purple-to-blue mesh gradient, radial blurred orbs, or an animated aurora behind a `backdrop-filter` card.
   *Check:* grep for `radial-gradient` + `filter: blur` in the same stacking context; grep for `backdrop-filter` on anything that is not a floating bar.
   *Why it fails:* it is decoration standing in for a subject. Real Apple pages use *product photography* as the layout element — the iPhone hero is a photographed device on black — and Fantastical's decorative squares reference the actual app icon.
   *Fix:* if you have no product to photograph, use flat color and let the type carry it. Panic's answer is a night-scene game still plus three purple sentences and a grid of hand-drawn app icons; Sofa's is a cream ground and one icon cluster. Neither invents atmosphere.

5. **Hover lift.**
   *Tell:* `transform: translateY(-2px)` or `scale(1.02)` plus a shadow bloom on cards, rows, nav items.
   *Check:* grep every `:hover` rule for `transform`, `box-shadow`, `border`, `opacity`. Apple's hover changes exactly one property: the fill's luminance, by ~3% (`#0071E3 → #0076DF`).
   *Fix:* fill-luminance only, everywhere except a discovery grid where the lift is the affordance. Sweep the cursor down a list; if anything moves, it's generated.

6. **A single letter-spacing value on all headings.**
   *Tell:* `-0.02em`, `tracking-tight`, or `-0.025em` applied from 20px to 96px.
   *Check:* grep for `letter-spacing` and count distinct values on display sizes. One value is the failure. Apple ships **eleven** across the display range and **two of them are positive**: +0.012em at 19px, +0.011em at 21px, +0.009em at 24px, +0.007em at 28px, +0.004em at 32px, 0 at 40px, then negative again.
   *Fix:* if your face has an `opsz` axis, copy the curve's *shape*. If it doesn't, use two values — a mild negative for display, zero for text — and stop.

7. **Semantic colors that only have two values.**
   *Tell:* `--color-warning: #FFCC00` with a dark-mode override and nothing else.
   *Check:* grep for `prefers-contrast`. Zero occurrences is the failure. Then run each semantic color against its ground: `#FFCC00` on white is **1.51:1** and illegal as text at any size; even `#0088FF`, the current `systemBlue`, is only 3.52:1 and fails AA for body text on white.
   *Fix:* ship a `@media (prefers-contrast: more)` block with genuinely different hues, not darker ones — Apple's increased-contrast yellow is `#A16A00`, a brown. Or admit in the token file that you didn't and that the palette is decorative-only.

8. **Marketing pages that imitate Apple's *layout* instead of its *discipline*.**
   *Tell:* full-bleed alternating sections, centered 56px headline, 17px subhead, two pills, repeat ×8, with stock illustration or a UI mock where the product photo should be.
   *Check:* count your sections and ask what physical or screenshotted object anchors each one. If the answer for more than two sections is "an icon" or "a gradient," it's a template.
   *Why it fails:* Apple can run that rhythm because each section is anchored by a real photographed object that took a studio day. Without the object, the rhythm is the only content.
   *Fix:* look at what the craft scene actually does instead. Things is one icon, one 23-word sentence and a *video* link, with no download button above the fold. Overcast is unstyled HTML. Panic is `Booton` at weight 300 with a display-P3 purple. Sofa is cream and a title-case slab. Bear ships a custom typeface. **None of them look like apple.com.** The craft is in the app; the site is allowed to have its own voice — and imitating apple.com's marketing rhythm is the one form of Apple-copying that signals *less* craft, not more.

9. **Skipping the accessibility settings.**
   *Tell:* no Dynamic Type support, no reduced-motion alternative, no Bold Text handling, no Increase Contrast.
   *Check:* three greps — `prefers-reduced-motion`, `prefers-contrast`, and any font-size that isn't `rem`/`em`. Then set the OS text size to AX5 and screenshot: iOS Body becomes **53pt/62pt**, so any row with metadata beside the label will either clip or overlap.
   *Fix:* Apple's own CSS has 34 reduced-motion blocks, each with a real alternative composition. Match the *pattern* even if you can't match the count. The AX5 fix is a stacked layout — metadata below the label, fewer columns — which the HIG states outright.

10. **`clamp()` on everything.**
    *Tell:* `clamp()` on body font-size, usually with a `vw` term.
    *Check:* grep `clamp(` and `vw` inside `font-size`. Apple uses `clamp()` **7 times in 1.2 MB** and `vw` inside `font-size` **zero** times.
    *Fix:* step the display sizes at breakpoints and hold body fixed. Fluid type is a fashion, not a standard — see decision 2 for the one case where it's the right call.

11. **A duration and easing per animation.**
    *Tell:* `0.2s ease`, `300ms ease-out`, `0.15s cubic-bezier(...)` scattered across components, each hand-typed.
    *Check:* count distinct `transition-duration` values and distinct easing functions. Apple runs a **20ms ladder** (260→400ms) with one dominant value used more than the next three combined, and **one** easing covering 312 of the 467 `cubic-bezier` declarations on the page.
    *Fix:* one easing, one default duration, a fixed step for the exceptions. Two easings if you need an overshoot — Apple's is used 5 times on the whole page.

12. **Copy that fails before the design is even looked at.**
    *Tell:* the headline opens with a verb like Supercharge / Unlock / Transform, the subhead contains "seamlessly" or "workflow," the empty state has an emoji and an exclamation mark, and the error says "Oops! Something went wrong."
    *Check:* grep the strings for `Supercharge|Seamlessly|Unlock|Effortlessly|Oops|🎉|Get Started|Learn More`. Any hit is a rewrite.
    *Fix:* the Copy and tone section below. A page can pass every metric in this file and still read as generated because of six strings.

---

## Copy and tone

**Voice:** declarative, present tense, sentence case, second person only when instructing. Specific nouns over category nouns. No exclamation marks in chrome. Periods on full sentences in body copy; none on button labels, nav items, or list rows.

**Where sentence case doesn't hold.** It is an *Apple house style*, not a craft law, and the craft scene splits on it. Sofa sets its h1 in title case — `A Quirky App That Helps You Enjoy Your Downtime` — in a 60px slab serif, because title case is part of the American-vernacular register it is going for. Panic's section heads are sentence case with a terminal period (`Panic codes Mac apps for developers.`), which is a third convention again. The rule that actually holds across all of them: **pick one case convention and apply it to every string of the same rank**, including the ones nobody proofreads — tooltips, `aria-label`s, empty states, error toasts, release notes. Mixed case within a rank is the tell, not the choice of convention.

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

- `https://www.apple.com/iphone-17-pro/` — probed at 1440 and 390 and re-fetched the full shipped stylesheet (**1,234,388 bytes**) 2026-09. Verified unchanged: the 13-row `.typography-*` ladder (all rows byte-identical), `--sk-button-*` tokens, `prefers-reduced-motion` ×34, `prefers-contrast` ×1, `clamp()` ×7, `font-size` in `vw` ×0, focus `outline: 2px solid var(--sk-focus-color, #0071e3)` with `--sk-focus-offset: 1px` / `--sk-focus-offset-container: 3px` / `−7px` inset. Corrected: breakpoint frequency list (420/782/1023/1108/320px were omitted and outrank 1441/360), `--sk-button-min-width-basis` (four discrete values 45/60/70/90px), duration ladder (260–400ms in 20ms steps, 320ms dominant at 33 declarations), overshoot easing used 5× not 1×, `#D2D2D7` used once, and the font-loading claim (see failure mode 2). At 390px: body unchanged at 17px/25px/−0.374px, h1 48px/52px, CTA pills 115×42px and 104×36px, dominant card radius 12px.
- `https://developer.apple.com/design/human-interface-guidelines/typography` — extracted all Dynamic Type tables (iOS xSmall→AX5, macOS, tvOS, watchOS) by reading every tab panel from the DOM, plus the full SF Pro tracking table (6pt–96pt, in 1/1000 em and points).
- `https://developer.apple.com/design/human-interface-guidelines/color` — extracted the 12 system colors and 6-step gray ramp in all four appearances from the live tables. **Re-verified 2026-09: all 48 system-color values match this file exactly, zero drift.** Page changelog: values updated 9 June 2025, guidance revised 16 December 2025 for Liquid Glass.
- `https://developer.apple.com/design/human-interface-guidelines/accessibility` — hit target table (44/28/60pt) and contrast minimums (4.5:1 / 3:1).
- `https://developer.apple.com/design/human-interface-guidelines/materials` — Liquid Glass regular vs. clear, the 35% dimming rule, and the four standard materials.
- `https://developer.apple.com/design/human-interface-guidelines/sheets` — detents (large / medium), grabber behavior, iPad page/form sheet guidance.
- `https://developer.apple.com/design/human-interface-guidelines/layout` — tvOS safe areas, visionOS 60pt control spacing.
- `https://developer.apple.com/design/human-interface-guidelines/app-icons` — 1024×1024 layered spec, six appearance variants, Icon Composer, per-platform masking.
- `https://developer.apple.com/design/human-interface-guidelines/playing-haptics` — notification/impact/selection families, transient vs. continuous, sharpness/intensity.
- `https://developer.apple.com/design/awards/` — the 2026 winner list; source for Moonlitt (Interaction), Tide Guide (Visuals and Graphics), grug (Delight and Fun), Blippo+ (Panic).
- `https://apps.apple.com/us/app/things-3/id904280696` and `.../halide-mark-iii-pro-camera/id885697368` — Apple's own web app; probed for the macOS type scale (12px/15px dominant, body 13px/16px), alpha label colors, radius distribution, and measured sidebar rows at 30px/3px/6px. Also the source of real in-app Halide screenshots (black chassis, instrument typeface, yellow accent, physical-dial exposure readout).
- `https://culturedcode.com/things/` — probed and screenshotted at 1440/390. Body is **18px/25.2px `ui-sans-serif`**, not 15px; nav links 15px/24px w600 at `rgba(38,52,74,0.5)`; h1 36px/36px w700; ground `#F2F5F7`, ink `#303336`; radii 18px (17) / 3px (16) / 4.5px (14) / 6px (10). Above the fold at 390px: icon, wordmark, one sentence, one *video* link — no download button.
- `https://www.flightyapp.com/` — re-probed at 1440 and 390. Self-hosts `SF Pro Text` **Regular, Medium and Semibold** as webfonts alongside `system-ui`. HIG tracking confirmed at −0.08/−0.23/−0.43px for 13/15/17px, but on ~18 of ~200 text nodes only; two off-table values (`15px/−0.15px`, `13px/−0.23px`) also ship. h1 65px/78px w700 ls −1px at 1440 and **65px/71.5px at 390** (size held, leading tightened); h2 56px/56px → 32px/41.6px. Accent `rgb(0,133,255)`; secondary `rgba(0,0,0,0.55)`; the iOS `(59,59,67)` label family at 0.6 alpha appears 4×.
- `https://halide.cam/` — screenshotted; custom wide geometric display face on black, yellow accent.
- `https://tapbots.com/ivory/` — screenshotted; rendered 3D hero, dark ground, purple/blue accents.
- `https://mela.recipes/` — re-probed and screenshotted. `-apple-system-ui-rounded` body at 16px (p at 16px/19.2px), `ui-serif` for the wordmark and, in the in-page product shot, for recipe titles while metadata chips stay sans. `#FFD609` / `#3C321E` / `#1E1E19` confirmed. Radii: 5px (6), 7px (2), plus one `20%` icon mask — nothing else on the page.
- `https://reederapp.com/` — screenshotted; real three-pane Mac window with SF sidebar, per-row cloud sync glyphs, right-aligned relative timestamps.
- `https://bear.app/` — re-probed. `bearsans` (127 nodes) and `bearsansheadline` (23) custom families; body 16px/27.2px (1.70) confirmed as the dominant style at 63 nodes; h1 51.2px/56.32px (1.10) w400; ink **`#444444`**, secondary `#888888`, accent `#DD4C4F`. Radii 40px (4) / 16px (2) / 4.8px (2) / 3.84px (2).
- `https://www.craft.do/` — screenshotted; Mac window with sidebar, fill-on-select rows, no hover borders.
- `https://www.sofahq.com/` — re-probed and screenshotted. `InterVariable` + `new-kansas` slab, `#FFF4EE` ground, `−0.4px` tracking on every Inter node, h1 60px/60px w600 at **−3px** and same-size section h2s at **−1.5px**. Accent `rgb(60,102,196)`, footer `#0F1A31`, green `rgb(111,250,163)`. Radii 9999px (24) / 8px (17) / 6px (7) / 16px (7). Headline is title case.
- `https://overcast.fm/` — screenshotted; near-unstyled HTML, system font, orange links.
- `https://panic.com/` — **re-probed 2026-09; the earlier navy/Didone/acid-green description is stale.** Current: one custom face `Booton` (103 of 116 text nodes), **default weight 300** (66 nodes w300, 38 w600), uniform `−0.5px` tracking, section heads 42px/45px w300 at `−2.1px` in `color(display-p3 0.47 0 1)`, ink `#444444`, radii 10px (16) / 22.5px (12) / 4px (4). Hero is a full-bleed night still from *Big Walk*; the body is three sentences, each followed by a grid of hand-drawn app and game icons in wildly different art styles.
- `https://iconfactoryapps.com/` — screenshotted; app cards with a full-bleed artwork band over a solid dark text strip, no scrim.
- `https://flexibits.com/fantastical` — screenshotted; translucent stacked rounded-squares as Liquid Glass-era decorative furniture.
- `https://structured.app/` — screenshotted; Liquid Glass pill nav over full-bleed video.
- `https://apolloapp.io/` — screenshotted; single-column SF memorial page with the alternate-app-icon strip.
- `https://apps.apple.com/us/app/moonlitt-moon-phase-tracker/id1602987351`, `.../tide-guide-charts-tables/id971704814` — screenshotted the store pages for the two off-list ADA winners.

---

## Direction pass (2026-09)

Second read by a design director. Every number below was re-probed against the live site with Playwright; screenshots at 1440 and 390 are in `.cache/shots/apple-and-craft-standard-dir-{1..6}-{1440,390}.png` (apple.com/iphone-17-pro, flightyapp, culturedcode/things, mela.recipes, panic.com, sofahq.com).

### Numbers corrected

| Claim as written | Verified | Action |
|---|---|---|
| "apple.com ships **zero** `.woff2` files and defines **exactly one** `@font-face` block" | **63 `@font-face` blocks, 45 self-hosted `.woff2` files** (SF Pro Text ×18, Display ×18, Icons ×9); the iPhone page downloads **6** | Rewritten in failure mode 2 — the corrected fact is a *better* lesson than the wrong one |
| App Store radii "6px (37), then 10, 8, 12, 17, 24" | 6px (37), 8px (10), 25% (6), 17px (5), 24px (4), 10px (3). **No 12px, no 16px** | Fixed in decision 7 and the sidebar spec |
| Breakpoints: 734/1068/833/1069/480/1441/360 | Same top four, but **420px (32), 782px (31), 1023px (28), 1108px (20), 320px (17)** were omitted and all outrank the listed 1441 and 360 | Full list restored; reframed as 4 global seams + component-local overrides |
| Panic: "navy + Didone + acid-green pills" | Stale. One face `Booton`, **default weight 300** (66/116 nodes w300, 38 w600), `−0.5px` uniform, heads 42/45 at `−2.1px`, accent `color(display-p3 0.47 0 1)` | Row and source rewritten |
| Things: "radii 6px", "body 15px/18px" | Body **18px/25.2px**; radii 18px (17) / 3px (16) / 4.5px (14) / 6px (10) | Table fixed |
| Mela: "5px and 7px only" | 5px (6), 7px (2), plus one `20%` icon mask | Qualified |
| App Store "12px/15px, 187 instances" | 201 on this probe; varies ~190–205 with rail content | Stated as approximate with the reason |
| `--sk-button-min-width-basis: 60–90px` | Four discrete values: **45 / 60 / 70 / 90px** | Fixed |
| "one deliberate overshoot" `cubic-bezier(0.4,0,0.3,2)` | Used **5 times** | Fixed |
| Durations "cluster at 0.25s, 240ms, 0.275s…" | A **20ms ladder**, 260→400ms, with 320ms dominant at 33 declarations | Replaced with the ladder, which is the actual finding |
| "Mobile: buttons get bigger, not smaller" | apple.com's own 390px CTAs are **115×42px** and **104×36px** — both under 44pt | Corrected, and flagged as Apple violating its own HIG |
| `#D2D2D7` listed as a primary rule color | **1** occurrence in 1.2 MB | Demoted |
| iOS 26 color table (48 values) | **All 48 exact.** No change | Marked verified |
| The 13-row `.typography-*` ladder | **All 13 rows byte-identical** to the shipped CSS | Marked verified |
| `prefers-reduced-motion` ×34, `clamp()` ×7, `vw` font-size ×0, `prefers-contrast` ×1 | All exact | Marked verified |
| Bear 1.7/1.1 ratios, `#DD4C4F`; Flighty h1 65/78 −1px, h2 56/56 −0.28px; Sofa h1 60/60 −3px, `#FFF4EE` | All exact | Kept, with ink values added |
| Contrast ratios asserted in prose | Recomputed: `#FFCC00` on white is **1.51:1** (file said 1.7), `#A16A00` 4.59:1, `#0088FF` **3.52:1** | Fixed and extended |

### Cut

Sentences true of any competent product, removed or replaced with a measurement: "every millisecond of friction is felt"; "the restraint *is* the pitch"; "zero-decoration pages read as confidence"; "one decision, whole personality"; "the website and the app are allowed to be different genres" (kept, but bounded); "that is the whole lesson"; "the cleanest single-column SF page on the web"; "scroll-driven storytelling that never becomes a scrollytelling demo"; "spec, not vibes".

### Added

- **Live mobile evidence for the two headline claims.** Apple's positive tracking is verifiable at 390px (151 nodes at 21px/+0.231px, 82 at 28px/+0.196px), and body type is bit-identical at 390 and 1440. Both were previously argued from the stylesheet alone.
- **Headlines do not always shrink.** Flighty holds its h1 at 65px on a 390px viewport and only tightens leading 78→71.5px, while its h2 drops 56→32px and *loosens* to 1.30. The file's "headline size shrinks" rule was too simple.
- **Radii step down on mobile** (apple.com 20→12px, Flighty 16→12px) and **gutters are fixed insets, not percentages** (Mela exactly 20px, Flighty exactly 24px at 390) — two mobile rules the file didn't have.
- **Two missing states:** *selected vs. hover* as distinct conditions (Apple's sidebar has no hover state at all), and *disabled* as opacity tokens `0.42` dark / `0.36` light rather than a gray pair.
- **Sofa's two tracking values at one size** (−3px h1, −1.5px h2, both 60px/60px) — tracking as a function of measure, not size.
- **Panic's single-weight system** (w300 on 103 of 116 nodes) as a legitimate alternative to Apple's 400/600.
- **Where sentence case doesn't hold** — Sofa is title case, Panic is sentence case with terminal periods; the rule that survives is consistency within a rank.
- **Boundaries where there were none.** Decision 11 (line-height ratios) had no limit; it now has two — short non-wrapping strings, and the inversion below 20px on mobile. Decision 8 (30px rows) had one trivial limit ("not on touch"); it now has three, including two-line rows and non-default Dynamic Type. Decisions 2 and 6 had soft limits; both now name the variable you are choosing to hold constant.
- **Failure section rebuilt** as *tell / check / fix*, where every check is a grep or a probe an agent can actually run, plus a **composite signature** (four or more simultaneous failures means re-derive the system rather than tune the surface) and two new modes: **a duration and easing per animation**, and **copy that fails before the design is looked at**.

### Still unverified

The HIG Dynamic Type tables (iOS/macOS/tvOS/watchOS), hit-target table, tvOS safe areas, visionOS 60pt spacing, haptics families, sheet detents and the app-icon spec were **not** re-probed this pass — they were spot-checked structurally (the color page's tables and changelog match) but the numbers are carried forward from the original extraction. The Halide, Reeder, Craft, Iconfactory, Fantastical, Structured, Apollo, Moonlitt and Tide Guide observations are also carried forward unverified. Treat the Apple-CSS, App Store, Flighty, Bear, Mela, Sofa, Things, Panic and iOS-color numbers as measured this month; treat the rest as measured once.
