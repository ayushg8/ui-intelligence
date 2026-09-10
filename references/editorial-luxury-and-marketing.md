# Editorial, luxury and premium marketing sites

**Evaluated:** 2026-09

## What this archetype is for

Pages whose entire job is to make a stranger believe the thing behind them is serious — a homepage,
a product page, a launch page, a long-form editorial piece, a studio portfolio, a magazine. The
reader is not logged in, has no goal beyond "is this any good", scrolls once, and leaves. Because
there is no task to complete, every pixel is doing brand work, which is exactly why AI output is
most obviously AI here: an app screen is judged by whether it works, a marketing page is judged by
whether it has taste. This archetype covers Stripe/Vercel/Linear-class product marketing, Apple and
Rivian product pages, Aesop/Kinfolk/The Row luxury commerce, The Pudding and newsroom interactives,
and agency portfolios. It does **not** cover: signed-in application shells (see
`keyboard-first-productivity`), documentation, dashboards, checkout, settings, or anything where a
user is trying to finish a job. Applying editorial rhythm — 224px section gaps, 0.9 line-height,
17px body — to a signed-in tool makes it slow and precious. Applying app density to a homepage makes
it look like a template.

---

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Anthropic** | Publishes its whole token system to `:root` — 282 properties including per-font leading-trim | Sans display + **serif body** (`Anthropic Serif` at 20px/1.4 is the `<body>` default), headline left in cols 1–7 (`X:78, W:736`), deck in cols 9–12 — and **two words underlined** instead of a gradient |
| **Vercel** | −0.06em on a 64px h1, held as an em across both breakpoints (`-3.84px` at 64px, `-2.88px` at 48px) | Line-height exactly `1.0` at 64px desktop, relaxed to `1.167` at 48px mobile. Leading is size-conditional; tracking is not |
| **Stripe** | 715 `--hds-*` tokens on `:root` in which **every heading and text weight is 300** | Scroll reveals at **800ms–1s** with `cubic-bezier(0.165,0.84,0.44,1)` and `clip-path`, not 300ms fade-up. Note the hero itself breaks two rules in this file — see "Where the references disagree" |
| **Apple** (MacBook Pro) | 30,873px tall, 14 sections from 525px to 7,329px, most at `padding: 144px 0` | Its one gradient headline is a **4-stop desaturated sample of the product's own finish**: `linear-gradient(90deg,#E4F6F0,#9DCFCA 31%,#6B95AC 68%,#45657D)` |
| **Rivian** (R1S) | A 200px wordmark over real cinematography, with 56px CTAs in the opposite corner | Type tokens that bind tracking to size: display `-0.025em`, headline `-0.02em`, body/label `-0.01em`, and `--leading-display: 0.96` |
| **OpenAI** | The hero *is* the product's first interaction — a live composer, not a screenshot of one | Body is **17px/28px (1.647)**, not 16/24. There is no 16px anywhere in the scale |
| **Linear** | Marketing that ships the app's own design language, four sections at `128px` padding | Display weight `510` and `590` — real variable-font axis values, not 500/600 |
| **Aesop** | The lowest-contrast hero in the set: a 30px headline over a film | Headline `30px/39.9px` (lh **1.33**), weight 400, **zero negative tracking**, CTA = a 0-radius outlined rectangle with a hairline arrow. *(Cloudflare-blocked on re-probe 2026-09 — numbers are from the 2026-08 pass, unconfirmed since.)* |
| **Kinfolk** | Three optical sizes of one bespoke serif: `-Display`, `-Deck`, `-Text` | The hero CTA is two text links with a pipe: `Buy | Read`. No buttons anywhere above the fold |
| **The Row** | The whole homepage is **1,281px tall**: nav, one photograph, a two-line credit, a newsletter field | Body copy at **13px/21.45px (lh 1.65)**, and `html { font-size: 13px }` so every rem in the system is 13px. Small type + generous leading reads as expensive; large type + tight leading reads as SaaS |
| **The Pudding** | Editorial cards where the thumbnail is the actual chart, cropped | Per-story flat color mat (`#F5C33C`, `#F19EF5`, `#E88B2E`) instead of one brand color; issue number in an outline pill + `AUG 2026` in mono, above the image |
| **basement.studio** | Display leading **below 1** at both breakpoints: 87/78 (0.897) desktop, 46/39.2 (0.852) mobile | Nav counts as **superscript parentheses** — `Showcase ⁽²⁶⁾`, `Blog ⁽²⁹⁾` — an editorial footnote, not a badge bubble |
| **Locomotive** | `html { font-size: 15px }` — the whole rem scale is rebased | Nav links at 26px, body at 15px: the *navigation* is the display type. Also ships **emoji inside the h1**: `🔶 Locomotive® Digital-first Design Agency🍺🔞` |
| **Hello Monday** | `h1 { font-size: 80px; line-height: 64px }` = **0.8**, in a **serif** (ClarendonBTWXX-Light) at weight 300 | The h1 is a rotating word carousel set in near-white on white — the headline is deliberately the *quietest* thing on the fold, under a hand-drawn illustration. Nav chrome is a live counter: `4 days until Monday` |
| **teenage.engineering** *(not on the brief)* | Every dimension is a fraction of viewport width, derived from `--base-design-width: 980` | `--fs-20: calc(0.0183673 * 100vw)`, `--space-xl: calc(0.0459184 * 100vw)`. One absolute value in the system: `--btn-min-click-area: 48px` |
| **Oxide Computer** *(not on the brief)* | An engineering-drawing hero: real rack photo + real console UI joined by a leader line, captioned `FIG. 1 OXIDE CLOUD COMPUTER` | **Positive** body tracking (`+0.336px` on 16px = **+0.021em**) and a whole palette in `oklch()` |

**How I found the two off-list products.** I ran a Playwright screen over a candidate list of
non-listed marketing sites, testing three measurable tells at once: (a) does the `h1` carry a
`linear-gradient` background or `-webkit-text-fill-color: transparent`, (b) is the `h1` font family
one of the AI-default stack (Inter / Roboto / Poppins / Montserrat / DM Sans / Plus Jakarta /
system-ui), (c) is there a >400×250px `<img>` or `<video>` above the fold. Oxide came back with
`{grad:false, generic:false, heroMedia:1, bg:"oklch(0.162 0.01 260)"}` — the only infra vendor in
the batch defining color in oklch. teenage.engineering came back with `{noH1: true}`, which is what
sent me to look: it has no `<h1>` because the headline is a bespoke illustration lockup and the nav
*is* the sitemap. The same screen surfaced **cosmos.so** (`74px/74px, -3.7px = −0.05em, weight 350,
font "cosmosOracle"`) and **family.co** (`68px/74.8px, weight 500, font "Family"`) as honorable
mentions. Two products on the brief could not be measured: **NYT interactives** and **Bloomberg
graphics** both served bot-challenge pages to every request (screenshots in
`.cache/shots/elm-nyt-1440.png`, `elm-bbg-1440.png` show the block pages). **SSENSE** was
Cloudflare-blocked on four attempts across two user agents; **The Row** is substituted as the
measurable luxury-commerce reference.

---

## Measured specifics

Everything below was read out of the live sites with Playwright — computed styles at 1440×900 and
390×844, plus CSS custom properties enumerated off `:root`. Exact unless marked approx.

**The probe technique, and the one way it lies.** Enumerate tokens with
`getComputedStyle(document.documentElement)` and iterate `cs.item(i)` for names starting `--`. Do
**not** walk `document.styleSheets` → `sheet.cssRules`: that throws on any cross-origin stylesheet
and silently returns zero, which is how the previous pass of this file reported "Stripe ships no
custom properties" when it ships 715. Every token count in this file was re-taken with the computed-
style method on 2026-09; where a count moved, both numbers are given. Counts drift between deploys —
treat them as order-of-magnitude, and treat the individual token *values* as the durable part.

Two more probe cautions this pass turned up. **Query the visually largest text, not `h1`** — Apple's
`<h1>` is a 28px eyebrow, and The Pudding and teenage.engineering have no `<h1>` at all. And
**read `html`'s font-size before trusting any `rem`** — it is 10px on Rivian, 13px on The Row, 15px
on Locomotive, 17px on Apple and 22px on Hello Monday.

### Hero type, measured at 1440

| Site | h1 size / line-height | lh ratio | letter-spacing | weight | family | x / width |
|---|---|---|---|---|---|---|
| Rivian R1S | 200px / 192px | **0.96** | −5px (−0.025em) | 500 | **Liga** (display cut; `Adventure` is the body face) | 48 / 1344 |
| Resend | 96px / 96px | 1.00 | −0.96px (−0.01em) | 400 | Domaine (serif) | — |
| basement.studio | 87px / 78px | **0.897** | −3.48px (−0.04em) | 600 | Geist | 16 / 1290 |
| Apple `.typography-headline-super` | 80px / 84px | 1.05 | −1.2px (−0.015em) | 600 | SF Pro Display | — |
| Hello Monday | 80px / 64px | **0.80** | normal | 300 | **ClarendonBTWXX-Light** (serif) | 70 / 1299 |
| cosmos.so | 74px / 74px | 1.00 | −3.7px (**−0.05em**) | **350** | cosmosOracle | — |
| Locomotive | 70px / 77px | 1.10 | normal | 400 | **LocomotiveNew** (`HelveticaNowDisplay` is the body face) | 40 / 1360 |
| Family | 68px / 74.8px | 1.10 | −1.36px (−0.02em) | 500 | Family | — |
| Oxide | 65px / 65px | 1.00 | −1.625px (−0.025em) | **400** | SuisseIntl | 40 / 720 |
| Linear | 64px / 64px | 1.00 | −1.408px (−0.022em) | **510** | Inter Variable | 78 / 1282 |
| Vercel | 64px / 64px | 1.00 | −3.84px (**−0.06em**) | **400** | GeistSans | 24 / 444 |
| Anthropic | 60.87px / 66.95px | 1.10 | normal | 700 | Anthropic Sans | 78 / 736 |
| Kinfolk | 50px / 52px | 1.04 | −0.5px (−0.01em), **uppercase** | 400 | **Kinfolk-Serif-Deck** | 360 / 720 |
| Stripe | 48px / 55.2px | 1.15 | −0.96px (−0.02em) | **300** | sohne-var | 208 / 959 |
| OpenAI (h2) | 48px / 55.68px | 1.16 | −1.44px (−0.03em) | 500 | OpenAI Sans | — |
| Apple `<h1>` (the real one) | 28px / 32px | 1.14 | **+0.196px** | 600 | SF Pro Display | 90 / 630 |
| Aesop | 30px / 39.9px | **1.33** | **normal** | 400 | Suisse Intl | — |

Four things fall out of this table.

1. **Display weight is almost never bold.** Twelve of seventeen sit at 300–510. The AI default of
   `font-bold`/`font-extrabold` at hero size is the single loudest tell.
2. **Line-height at display size clusters at 0.80–1.16, never 1.25.** Tailwind's `leading-tight`
   (1.25) is loose for a 64px headline and is what an AI reaches for.
3. **The display face is usually not the body face.** Rivian sets its wordmark in `Liga` and its
   body in `Adventure`; Locomotive sets the h1 in `LocomotiveNew` and body in `HelveticaNowDisplay`;
   Hello Monday sets an 80px *serif* h1 over a grotesk page. Reading the `<body>` font-family and
   assuming it is the display font is the most common way to misread one of these sites.
4. **Six of these headlines start within 80px of the left edge** (16, 24, 40, 40, 48, 70, 78, 78).
   Two are centered (Kinfolk at x:360 in a 720px column, Aesop). None is a `max-w-4xl mx-auto` stack.

**The h1 is often not the headline.** Apple's `<h1>` is the 28px eyebrow `MacBook Pro`; the 80px
line is a `<p class="typography-headline-super">`. The Pudding and teenage.engineering ship **no
`<h1>` at all**. If you are auditing a page by querying `h1`, you will measure the wrong element on
three of these sixteen sites.

### Body copy, measured at 1440

| Site | size / line-height | ratio | tracking | weight | family |
|---|---|---|---|---|---|
| Anthropic (body default) | 20px / 28px | 1.40 | 0em | 400 | **Anthropic Serif** |
| Anthropic (hero deck) | 24px / 33.6px | 1.40 | 0em | 400 | **Anthropic Serif** |
| Kinfolk | 20px / 30px | 1.50 | normal | 400 | **Kinfolk-Serif-Text** |
| OpenAI | 17px / 27.999px | **1.647** | −0.17px (−0.01em) | 400 | OpenAI Sans |
| Apple | 17px / 25px | 1.47 | −0.374px (−0.022em) | 400 | SF Pro Text |
| Vercel | 16px / 24px | 1.50 | normal | 400 | Geist Sans |
| Oxide | 16px / 22px | 1.375 | **+0.336px (+0.021em)** | 400 | Suisse Intl |
| Stripe (small) | 16px / 22.4px | 1.40 | normal | 300 | Söhne Var |
| Linear (marketing) | 15px / 24px | 1.60 | −0.165px (−0.011em) | 400 | Inter Variable |
| The Pudding | 16px / 22.4px | 1.40 | normal | 400 | **Atlas Grotesk** (`Gooper SemiCondensed` is the headline face and the `<body>` default) |
| Locomotive | 15px / 19.5px | 1.30 | normal | 400 | HelveticaNowDisplay |
| The Row | **13px / 21.45px** | **1.65** | normal | 400 | Basic Commercial |
| Aesop (nav/meta) | 12px / 18px | 1.50 | normal | 400 | Suisse Intl |

Note the inverse relationship: the smaller the body size, the looser the leading. 13px wants 1.65;
20px wants 1.40. AI output uses `text-base leading-relaxed` (16/1.625) everywhere and it reads as
neither.

### The `html` font-size is not 16px on a quarter of these sites

`html { font-size: … }` — Rivian **10px**, The Row **13px**, Locomotive **15px**, Apple **17px**,
Hello Monday **22px**. Everyone else is 16px. Four of these deliberately rebase the root so that
`rem` becomes a house unit: Rivian's `1.6rem` is 16px, The Row's `1rem` is 13px. Two consequences
worth knowing: a `rem`-based spacing scale copied from one of these sites into a 16px document is
silently wrong by up to 1.6×, and a user who raises their browser's default text size scales the
*whole* Rivian layout, not just its type. Rebasing is a real technique with a real cost — pick it on
purpose, and if you do, keep tap targets and focus rings in `px`.

### Tracking as a function of size — Rivian's tokens, verbatim

```
--tracking-display:  -0.025em   /* 72–200px */
--tracking-headline: -0.02em    /* 24–56px  */
--tracking-label:    -0.01em
--tracking-body:     -0.01em
--leading-display:   0.96
--leading-headline:  1
```

Anthropic ships only three tracking values in the entire system: `0em`, `-0.005em`, `-0.02em`.
Rivian ships four. The AI default is a single `tracking-tight` (−0.025em) applied to h1, h2, body
and buttons alike, which makes 14px labels illegible and 64px headlines not tight enough.

### Rivian's full type scale (px, from `:root`)

`12 · 14 · 16 · 20 · 24 · 32 · 36 · 44 · 56 · 72 · 96 · 120 · 200`, with display weight fixed at
600 and fluid interpolation done by clamp:

```
--text-display-xl:   clamp(72px, 13.54vi + 26.72px, 200px)
--text-display-lg:   clamp(72px,  6.25vi + 40px,    120px)
--text-headline-xl:  clamp(44px,  1.56vi + 36px,     56px)
```
There is also a `-cq` mirror of every display token that swaps `vi` for `cqi`, so a hero can scale
to its container instead of the viewport. That is the correct answer for a headline inside a
half-width card, and almost nobody does it.

### OpenAI's type scale

Body is `--type-p1-size: 1.0625rem` = **17px**. Everything secondary — `p2`, `meta`, `cta`,
`caption`, `nav-desktop` — is **14px**. Display is `--type-xl-size: clamp(4rem, …, 7rem)` = 64→112px.
There is no 16px token in the system. The step from 14 to 17 to 24 to 32 to 48 to 64 to 112 is the
whole scale: **seven sizes, one of which is used for five different roles.**

### Stripe's `--hds-*` system — every weight token is 300

Stripe publishes **715 custom properties** on `:root` (an earlier pass of this file reported zero;
that was a probe artifact — Stripe's stylesheet is cross-origin, so `sheet.cssRules` throws and you
must enumerate `getComputedStyle(document.documentElement)` instead). The type half of it:

```
--hds-font-heading-xxl : 3.5rem / 1.03  / -0.025em / weight 300
--hds-font-heading-xl  : 3rem   / 1.03  / -0.02em  / weight 300
--hds-font-heading-lg  : 2rem   / 1.1   / -0.02em  / weight 300
--hds-font-heading-md  : 1.625rem / 1.12 / -0.01em / weight 300
--hds-font-heading-sm  : 1.375rem / 1.1  / -0.01em / weight 300
--hds-font-heading-xs  : 1rem   / 1.2   /  0em     / weight 400
--hds-font-text-xl     : 1.25rem  / 1.4  / -0.01em / weight 300
--hds-font-text-md     : 1rem     / 1.4  /  0em    / weight 300
--hds-font-text-xxs    : 0.75rem  / 1.45 /  0em    / weight 300
--hds-space-core-*     : 0,1,8 … 80,88,96,104,112,120,128,136 … 152,160px   (8px grid)
```

Read the weight column: **300 at every size from 12px to 56px**, with 400 appearing only at the two
smallest heading steps where 300 would go weak. This is the strongest single piece of evidence in
the file for the weight rule — it is not a hero-only choice, it is the default for the entire system.
Read the letter-spacing column too: tracking is bound to the step (−0.025 → −0.02 → −0.01 → 0), the
same size-conditional pattern as Rivian, arrived at independently.

Note also that Stripe's live marketing h1 (48px/55.2px, lh 1.15) does **not** use `heading-xxl`
(56px, lh 1.03). The marketing page overrides the product design system for its own hero. Do not
assume a published token is the one the page actually renders — measure the element.

### Anthropic's spacing system (all clamped mobile→desktop)

| Token | Value | Resolves to |
|---|---|---|
| `--_spacing---section-space--extra-small` | `var(--size--2rem)` | 28→32px |
| `--…--small` | `var(--size--4rem)` | 40→64px |
| `--…--medium` | `var(--size--6rem)` | 56→96px |
| `--…--main` | `var(--size--10rem)` | **88→160px** |
| `--…--large` | `var(--size--14rem)` | **112→224px** |
| `--…--page-top` | `var(--size--12rem)` | 96→192px |
| `--site--width` | `89.5rem` | 1432px |
| `--site--margin` | `clamp(2rem, …, 5rem)` | 32→80px |
| `--site--gutter` | `var(--_spacing---space--6)` | 28→32px |
| `--site--column-count` | `12` | |

Plus a leading-trim system almost nobody implements by hand:

```
--_typography---font--paragraph-trim-top:    .44em
--_typography---font--paragraph-trim-bottom: .27em
--_typography---font--display-serif-trim-top:    .48em
--_typography---font--display-serif-trim-bottom: .30em
--_typography---font--display-sans-trim-top:  .34em
--_typography---font--display-sans-trim-bottom:.40em
```
These are negative margins applied per font to cancel the half-leading, so a 224px section gap is
*optically* 224px rather than 224px + 18px of invisible font metrics. This is why Anthropic's
whitespace looks measured and a Tailwind page's doesn't, even at identical `py` values.

### Section rhythm at 1440 — the number AI gets most wrong

| Site | Between top-level sections |
|---|---|
| Apple MacBook Pro | `144px` is the dominant value, but it is **not** uniform. Measured pairs, in page order: `-96/0`, `144/144`, `144/216`, `0/144`, `0/0`, `144/144`, `144/0`, `144/144`, `144/144`, `144/0`. Where two padded sections meet you get **288px**; where a full-bleed band meets a padded one you get 144px; between two full-bleed bands, zero |
| Linear | `padding: 128px 0` on each of the four feature sections → **256px** between them; prefooter uses `margin: 224px 0` |
| Oxide | **128px** between every consecutive top-level `<section>`, re-measured 2026-09: `[128, 128, 128]` |
| Vercel | `mt-40 @md:mt-52` → **160px mobile / 208px desktop** (confirmed: computed `margin-top: 208px` at 1440); one band at `mt-53 mb-53 @md:mt-69 @md:mb-69` = 212/276px |
| Anthropic | `--section-space--main` 88→160px, `--large` 112→224px; spacing is its own empty `g_section_space` divs (measured 91px, 151px, 61px) |

**The AI default is `py-16` / `py-20` — 64 to 80px.** That is 2–4× too tight. A homepage that reads
as premium at 1440 has 128–288px between padded sections. If you take one number from this file,
take this one.

But take the Apple row with it: the rule is *not* "put 144px on everything". Apple's zero-padding
sections are the full-bleed image and video bands, which supply their own optical margin inside the
asset. A section that bleeds to the viewport edge takes **0** vertical padding; a section with type
on the page ground takes 144. Applying 144px uniformly to both is how a page ends up feeling padded
rather than composed.

### Neutral ramps, verbatim

**OpenAI** — pure neutral, thirteen steps, 0% saturation at every step:
`#fff · #f9f9f9 · #f3f3f3 · #e8e8e8 · #cdcdcd · #afafaf · #8f8f8f · #5d5d5d · #414141 · #303030 · #212121 · #181818 · #000`
Dark mode is done by remapping tokens, not duplicating a palette: `--color-brand-gray-100` points at
`--color-primitive-gray-100` in light and `--color-primitive-gray-700` in dark. Note the ends
compress — both `brand-gray-0` and `brand-gray-50` resolve to `primitive-gray-1000` in dark.

**Vercel** — light: `#fff · #fafafa · #f2f2f2 · #ebebeb · #e6e6e6 · #eaeaea · #c9c9c9 · #a8a8a8 · #8f8f8f · #7d7d7d · #4d4d4d · #171717`.
Dark: `#000 · #1a1a1a · #1f1f1f · #292929 · #2e2e2e · #454545 · #878787 · #8f8f8f · #7d7d7d · #a0a0a0 · #ededed`.
Page ground is `#fafafa`, not `#fff`. Text is `#171717`, not `#000`.

**Anthropic** — a warm, named palette, not a gray scale:
ivory `#faf9f5 / #f0eee6 / #e8e6dc` · slate `#141413 / #3d3d3a / #5e5d59` · cloud `#d1cfc5 / #b0aea5 / #87867f` · borders `#1414131a` (10%) and `#14141333` (20%).
Accents: clay `#d97757`, accent `#c6613f`, oat `#e3dacc`, cactus `#bcd1ca`, sky `#6a9bcc`, heather `#cbcadb`, fig `#c46686`, coral `#ebcece`, manilla `#ebdbbc`, kraft `#d4a27f`, olive `#788c5d`.

**Rivian** — surfaces `#fff / #fafafa / #f2f2f2 / #ececec`, inverted `#000 / #212121 / #494949`,
neutrals `#cbcbcb / #636363`, text `#000 / #494949 / #636363`. One accent: amber `#FFAA00`.

**Apple** — text `rgb(29,29,31)`, secondary `rgb(110,110,115)`, tertiary `rgb(134,134,139)`, alt
`rgb(66,66,69)`, fills `rgb(210,210,215)` / `rgb(232,232,237)`, focus `#0071e3`. Also exposed as
alpha pairs (`rgba(0,0,0,0.88)` / `0.56` / `0.48` / `0.16` / `0.08`) so the same ramp works on any
ground.

**teenage.engineering** — `#0f0e12 · #272727 · #4d4d4d · #767676 · #b2b2b2 · #ccc · #e5e5e5 · #f5f5f5`,
with five fixed accents that read as a synth panel: blue `#0071bb`, green `#006837`, orange
`#f05a24`, red `#b81d13`, yellow `#fab413`.

**Oxide** — everything in oklch: ground `oklch(0.162 0.01 260)`, body `oklch(0.79 0.0011 260)`,
headings `oklch(0.9 0.0001 260)`, secondary `oklch(0.606 0.0031 260)`, tertiary `oklch(0.717 0.0021 260)`.
Chroma is 0.0001–0.01 — a hue is declared but is essentially unused, so lightness steps are
perceptually even — the four text steps are 0.606 → 0.717 → 0.79 → 0.9 L, roughly even increments,
which an sRGB hex ramp cannot give you because equal hex steps are not equal perceived steps.
Oxide also draws a **visible 10-column grid** over the page (`w-1/10 border-l border-secondary`
overlays), so the column structure is part of the artwork rather than hidden behind it.

**Aesop** — page ground `#FFFEF2`, text `#333333`. A warm off-white, not a gray.

> **The measurable claim — and the right way to measure it.** Do **not** use HSL saturation. It is
> undefined-ish near the lightness extremes and gives nonsense for exactly the colors that matter
> here: Anthropic's ivory `#faf9f5` reads as **33.3% S**, Aesop's ground `#fffef2` reads as
> **100% S**, and Linear's near-black `#08090a` reads as 11.1% — all three are visually neutral.
>
> Use **RGB channel spread** (max − min, out of 255). It is a direct read of how far from gray a
> color is, at any lightness:
>
> | Reference neutral | Spread | Compare | Spread |
> |---|---|---|---|
> | OpenAI `#5d5d5d` | **0** | Tailwind `slate-500` `#64748b` | **39** |
> | Vercel `#8f8f8f` | **0** | Tailwind `slate-600` `#475569` | **34** |
> | The Row `#696969` | **0** | Tailwind `gray-500` `#6b7280` | **21** |
> | Linear `#08090a` (ground) | **2** | Stripe `#273951` (product-UI text) | **42** |
> | Anthropic `#5e5d59` | **5** | Linear `#8a8f98` (tertiary text) | **14** |
> | Apple `#86868b` | **5** | Linear `#d0d6e0` (secondary text) | **16** |
> | Anthropic `#faf9f5` (ivory ground) | **5** | | |
> | Aesop `#fffef2` (warm ground) | **13** | | |
>
> **The line is at roughly 14.** Every text and surface neutral in the reference set sits at spread
> 0–13; Tailwind's slate sits at 34–39. If your body copy is `text-slate-600` on `bg-slate-50`, the
> page is visibly blue and that blue is 3–8× further from gray than any reference here.
>
> Two honest exceptions. **Linear is not neutral** — its text ramp (`#d0d6e0`, `#8a8f98`) sits at
> spread 14–16, a deliberate cool cast that reads as screen-native rather than paper-native, and it
> is the correct choice for a page that has to feel continuous with a dark app. **Stripe is not
> neutral either** — `#273951` at spread 42 is a navy, used as text inside product UI. Both are
> saturated on purpose and both are dark-ground or UI-chrome cases. On a light editorial ground,
> stay under 14.
>
> Note also the asymmetry: **light grounds skew warm or pure** (`#faf9f5`, `#fffef2`, `#fafafa`),
> **dark grounds skew very slightly blue** (`#08090a`, `oklch(… 260)`). Never the reverse.

### Buttons and radii

| Site | Height | Type | Padding | Radius |
|---|---|---|---|---|
| Stripe primary | 48px | 16px / 400 | 24px | **4px** |
| Stripe nav | 40px | 14px / 400 | 20px | 4px |
| Apple | 39–44px | 17px / 400 | 8px 15px / 11px 21px | **980px** (pill) |
| Vercel hero | 40px | 16px / 500 | 12px | pill |
| Vercel nav | 32px | 14px / 500 | 6px | **6px** |
| Linear hero | 44px | 16px / **510** | 20px | pill |
| Linear nav | 32px | 13px / 510 | 12px | pill |
| OpenAI nav | 36px | 14px / 500 | 20px | 40px |
| OpenAI hero chips | 40px | 14px / 500 | 12px | pill, **transparent fill + hairline border** |
| Rivian | 32px (nav) / 56px (hero) | 14px / 600 | 16px | pill |
| Oxide | 32–40px | 12px / 400 **uppercase** | 12–16px | **2px** |
| Aesop | 48px | 14px / 400 | 13px 24px | **0px**, transparent + 1px border |
| Kinfolk | 44px | 14px / 500 | 8px | 2px |
| The Row | 30px | 11px / 400 | — | **0px** |

The radius distribution is bimodal: **0–6px or fully round.** Rivian's radius scale is
`4 / 12 / 20 / 32 / 40` (`nano/micro/macro/mega`) with no 6 and no 8. Anthropic's is
`0.25 / 0.5 / 1rem / 100vw`.

*Where this is softer than it looks:* Vercel does ship 8px. Re-measured at 1440, its nav buttons are
32px tall at **6px** radius, its in-page 40px buttons are at **8px**, and only the hero `Deploy now`
is a pill. So "8px is always the tell" is too strong — 8px on a 40px button inside a product-UI-
adjacent page is defensible. What is *not* defensible is 8px on **everything**, which is the shadcn
default and carries no decision with it. The diagnostic is variance, not the value: if every radius
on your page is the same number, you did not choose it.

Also: **button height tracks role, not a single token.** Nav buttons are 30–36px; hero buttons are
40–56px (Vercel nav 32 / hero 40; Linear nav 32 / hero 44; Oxide nav ~32 / Rivian hero 56). An AI
ships one 44px button everywhere.

### Motion — durations and easings actually in production

| Site | What | Value |
|---|---|---|
| Apple | everything | `0.32s cubic-bezier(0.4, 0, 0.6, 1)` (232 elements), plus `0.02s` for nav color feedback |
| Stripe | hover color/background | `0.3s cubic-bezier(0.25, 1, 0.5, 1)` (quint-out) |
| Stripe | **scroll reveal** | `0.8s cubic-bezier(0.165, 0.84, 0.44, 1)` on `transform` (46 elems) and `clip-path` (12 elems); one at `1s cubic-bezier(0.16, 1, 0.3, 1)` |
| Linear | hover | `0.1s` color, `0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)` for border/background/box-shadow |
| Vercel | hover | `0.1s`–`0.15s cubic-bezier(0.4, 0, 0.2, 1)` |
| Anthropic | link color | `0.2s ease` (186 elements); nav menu `400ms`, dropdown `200ms` |
| OpenAI | hover | `0.1 / 0.2 / 0.25s`, mostly `cubic-bezier(0, 0, 1, 1)` (linear) |
| Rivian | named easings | `--ease-shift-magnetic: cubic-bezier(0.83,0,0.17,1)`, `--ease-attract-emphasized: cubic-bezier(0.2,0,0,1)`, `--ease-repel-aggressive-exit: cubic-bezier(0.8,0,1,1)` |
| Kinfolk | image reveal | `0.5s cubic-bezier(0.25, 1, 0.5, 1)` on opacity (87 elements, re-probed 2026-09) |

Two rules fall out.

**Hover is 100–320ms; scroll reveal is 500ms–1s.** They are different budgets and AI collapses both
to 300ms.

**Hover animates color, not geometry.** Re-counted 2026-09 by enumerating every `<a>`, `<button>`
and `[role=button]` with a non-zero transition duration: **Vercel — 128 elements, 0 animating
`transform`** (114 of them run the Tailwind `color, background-color, border-color, outline-color,
text-decoration-color, fill, stroke` list at 0.1s/0.15s; 13 run `transition: all`).
**Anthropic — 196 elements, 2 animating `transform`.** **Oxide — every `<a>` and `<button>` has
`transition-duration: 0s`; its links snap.** So the honest version of the rule is *0–1% of
interactive elements animate transform*, not literally zero, and one reference set doesn't animate
hover at all. Nothing lifts, scales or shadows on hover anywhere in this set.

### Shadows

Vercel's are the most instructive because they are near-invisible and always paired with a hairline:

```
--ds-shadow-border-base: 0 0 0 1px #00000014;      /* 8% black, 1px, no blur */
--ds-shadow-xs:    0px 1px 2px #0000000a;          /* 4% black */
--ds-shadow-medium:0px 2px 2px #0000000a, 0px 8px 8px -8px #0000000a;
--ds-shadow-2xl:   0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f;
--ds-focus-ring:   0 0 0 2px var(--ds-background-100), 0 0 0 4px var(--ds-focus-color);
```
Peak alpha across the whole scale is `0x0f` = **6%**. Every elevation shadow composes with the 1px
border shadow, so a card reads as a defined edge with a hint of lift, never as a floating slab. The
focus ring is a **gap ring**: 2px of page background, then 2px of blue.

Anthropic ships focus as `--focus--width: .125rem` (2px), `--focus--offset-outer: .25rem` (4px),
`--focus--offset-inner: -.125rem`.

### Content widths

| Site | Max width |
|---|---|
| Vercel | `--ds-page-width: 1400px` |
| Anthropic | `--site--width: 89.5rem` = 1432px (12 cols, 32px gutter, 32–80px margin) |
| Linear | 1436px outer, 1416px inner |
| Apple | 980px content column at 1440 (230px margins), grid = 12 × 7.29157vw |
| Stripe | 1298px nav, 1266px hero; section titles at 856 / 752 / 648px (span-8 / span-7 / span-6) |
| OpenAI | 1440px container, **670–768px reading measure** |
| Oxide | 1200px content, 720/600/480px prose blocks, 2000px full-bleed |
| The Pudding | 1280px |
| Aesop | 1200px |
| Rivian / basement | 1920px (full-bleed by default) |

Stripe's is the one to copy: section headings are constrained to a **column span** (`span-8`,
`span-7`, `span-6` → 856/752/648px), so different sections have visibly different measure. An AI
gives every section `max-w-3xl mx-auto` and the page becomes a single ribbon.

### teenage.engineering's proportional system

```
--base-design-width: 980;
--client-width: 100vw;
--fs-20:   calc(0.0183673 * var(--client-width));   /* = 18/980 vw */
--fs-40:   calc(0.0367347 * var(--client-width));
--space-xl:calc(0.0459184 * var(--client-width));
--tile-border-radius: calc(0.0255102 * var(--client-width));   /* mobile: 0 */
--btn-min-click-area: 48px;                                     /* the only absolute */
```
Font weights available: **100 and 300 only.** Families: **two** (`te-20`, `te-40`). The entire site
scales like a print sheet — type, spacing, radii, borders, icon sizes all proportional to viewport
— with a separate ratio set at mobile. It is the opposite of a breakpoint system and it is why the
site looks identical on a 13" and a 32" display.

---

## The decisions that make it work

**1. The hero headline is left-aligned and sits in a column, not centered across the page.**
Anthropic's h1 measures `X: 78px, W: 736px` on a 1440 viewport — with a 12-col 1432px grid
(80px margin, 32px gutter, 76.67px columns) that is exactly a **7-column span**, and the 517px-wide
serif deck sits in cols 9–12 with its first baseline aligned to the headline's *second* line, not
its first. Vercel runs a three-part hero: headline hard left at
`X: 24px`, a giant logo mark center, three short lines of positioning right. Oxide puts the
headline at the *bottom* left with the product photo occupying the right two-thirds.
*Why it works:* an asymmetric hero forces you to decide what the second element is. A centered hero
lets you skip that decision, which is why AI always centers.
*The generic alternative:* `text-center max-w-4xl mx-auto` with the subhead directly underneath and
two buttons below that — a 5-element vertical stack with nothing to the left or right of it.
*When it does not apply:* single-purpose conversion pages (a webinar signup, an app download) where
one message and one action genuinely is the whole page. Also true for Aesop and Kinfolk, which
center — but they center a **30–50px** headline over a photograph, not a 60px gradient over nothing.

**2. Line-height at display size goes below 1.05, and relaxes as the size drops.**
Vercel: 64px/64px (1.0) at desktop, 48px/56px (**1.167**) at 390px. Rivian encodes it as tokens:
`--leading-display: 0.96`, `--leading-headline: 1`. basement.studio runs 87/78 (0.897). Hello Monday
runs 80/64 (**0.8**).
*Why it works:* at 64px the ascenders and descenders of adjacent lines have enough physical room
that 1.0 still doesn't collide, and the tighter block reads as one shape. At 40px it collides.
*The generic alternative:* `leading-tight` (1.25) at every size, which leaves a visible white band
between hero lines and makes a two-line headline read as two separate sentences.
*When it does not apply:* any headline that might wrap to 3+ lines at mobile, any language with tall
diacritics (Vietnamese, Czech), and any all-caps setting where there are no descenders to protect —
Kinfolk sets uppercase at 50/52 (1.04) and that's already tight enough.

**3. Negative tracking scales with size; body text is near zero or positive.**
Vercel −0.06em at 64px. Cosmos −0.05em at 74px. basement −0.04em at 87px. Rivian −0.025em display /
−0.01em body. Oxide runs body at **+0.021em** because Suisse Intl at 16px on a dark ground needs
opening up. Aesop uses **no** negative tracking at all — its 30px headline is set at `normal`.
*Why it works:* a typeface's default sidebearings are optimized for text size. At 64px they are
proportionally too wide; at 13px they're too narrow, especially in reverse.
*The generic alternative:* one `tracking-tight` (−0.025em) class applied to h1, h2, h3, body and
buttons. It's not tight enough for the h1 and it visibly damages 14px labels.
*When it does not apply:* serif display faces (Kinfolk, Resend's Domaine) — these are drawn with
display proportions already, and −0.05em on a Domaine 96px headline closes the counters. Kinfolk's
50px serif runs −0.01em; Resend's 96px serif runs −0.01em.

**4. Display weight is 300–510, not 700.**
Stripe sets its 48px hero at **weight 300**. Oxide at 400. Vercel at 400 (h2 at 450). cosmos.so at
**350** at 74px. Linear at **510** — a variable-axis value between Medium and Semibold that no
static weight can produce.
*Why it works:* at 64–200px the stroke is already physically thick; a 700 weight closes the counters
and the headline turns into a black brick. Weight and size do the same job, so you spend one, not
both. Stripe's token file is the proof that this is systemic rather than a hero flourish: **every
`--hds-font-heading-*` and `--hds-font-text-*` weight token is 300**, from 12px to 56px, with 400
appearing only at the two smallest heading steps.
*The generic alternative:* `text-6xl font-bold` or `font-extrabold`, sometimes with a gradient on
top, which is the most recognizable single signature of AI marketing output.
*When it does not apply:* three real limits. (a) **A headline that has to carry a page alone.**
Anthropic's 61px runs 700 because it is the only element on an otherwise empty ivory fold, and
`Anthropic Sans` is a grotesk with counters open enough to survive it. (b) **A short word set very
large.** basement.studio runs 600 at 87px and Rivian runs 500 at 200px — at wordmark scale a 400
starts to look like it was set by accident, because there is no sentence rhythm to carry it.
(c) **Light type on a dark ground.** Optical thinning means a 300 that reads correctly as black on
ivory reads as anaemic as white on `#08090a`; Linear's 510 and Oxide's 400 are both a step up from
what the same faces would take on white. The rule is 300–510 *on a light ground with a face you
have tested*; it is not "always pick the thinnest weight available".

**5. The hero asset is a real photograph, a real product screenshot, or a live product — never an
abstract gradient blob.**
Rivian: full-bleed cinematography of two kids at the back of an actual R1S on an actual beach.
Aesop: a narrative film with laundry on a line. The Row: a 35mm-grain photograph with **no text on
it whatsoever**. Stripe: a working checkout with real payment methods and a fraud table showing
`0.06% / 0.02% / 0.08%`. Oxide: a photograph of the rack joined by a hairline leader line to a
**tabbed `CLI / API / CONSOLE` panel** running a real request (`POST mazewar.dev/v1/instances`),
captioned `FIG. 1 OXIDE CLOUD COMPUTER` in mono uppercase inside a hairline box in the opposite
corner. OpenAI: a **live composer input** the visitor can type into.
teenage.engineering: a commissioned hand-drawn comic.
*Why it works:* it is the only thing on the page that cannot be reproduced by someone else in an
afternoon.
*The generic alternative:* a blurred purple-to-pink radial gradient, a floating glassmorphic card,
an isometric illustration of abstract boxes, or a fake dashboard with `Lorem` labels and
`$12,345.67`.
*When it does not apply:* **Stripe's current homepage is the honest counterexample** — as of
2026-09 the fold is a full-bleed abstract gradient ribbon in orange/pink/violet/blue occupying the
right 60% of the viewport, with the product UI moved below the fold. It works because that ribbon is
a specific, hand-rendered, decade-old brand asset with its own identity, not a CSS radial blob; a
visitor recognizes it as *Stripe's gradient*. The distinction is ownership, not medium: an abstract
hero is fine if the abstraction is yours and is recognizable off the page. It is not fine if it
could be swapped into a competitor's site without anyone noticing. Also legitimate: pre-launch pages
with nothing to photograph — do what Vercel does, render the brand mark itself at 250px with a real
soft shadow and nothing else, or what Anthropic does, show a photograph that is *about* the idea.

**6. Nothing moves on hover.**
Across nine measured sites the hover transition property list is `color, background-color,
border-color, outline-color`. Zero `transform`. Anthropic's primary button goes `#141413 → #3d3d3a`
in 200ms and that is the entire interaction. Apple's is 320ms on color, with a 20ms variant on nav
links so the pointer never feels laggy.
*Why it works:* on a page with 40 links, transform-on-hover means the layout shivers as the cursor
crosses it.
*The generic alternative:* `hover:scale-105 hover:shadow-lg transition-all duration-300` on every
card, which makes a three-card row feel like a trampoline.
*When it does not apply:* three real limits. (a) A deliberate single hero-level interaction — an
agency portfolio thumbnail that expands, a shop-grid card whose image swaps. One per page, not
forty. (b) **Touch.** Every one of these hover states is invisible on a phone, so none of them may
carry information a mobile visitor needs; if the only cue that something is a link is its hover
color, mobile users are guessing. (c) The measurement itself is not absolute — Anthropic animates
`transform` on 2 of 196 interactive elements, and Vercel leaves 13 elements on `transition: all`.
Aim for "geometry does not move", not for a literal zero in a grep.

**7. Scroll choreography is slow, uses clip-path or masks, and reveals content that is already there.**
Stripe: `0.8s cubic-bezier(0.165, 0.84, 0.44, 1)` on `transform` across 46 elements and on
`clip-path` across 12, plus a `1s cubic-bezier(0.16, 1, 0.3, 1)`. Kinfolk: `0.5s
cubic-bezier(0.25, 1, 0.5, 1)` on opacity across 87 elements. Rivian: one `h-[300vh]` sticky section
that scrubs a video against scroll position — the page still scrolls at native speed, the *content*
is time-mapped to it.
*Why it works:* an 800ms expo-out reveal reads as the page settling. A 300ms ease reads as a
component mounting.
*The generic alternative:* `opacity-0 translate-y-8` → `opacity-100 translate-y-0` at 300ms on every
section, triggered at 20% viewport, so the page pops six times on the way down and every pop is
identical.
*When it does not apply:* documentation, pricing tables, anything a visitor is scanning to find a
fact. And never scroll-jack: Rivian's `300vh` section is a *scrub*, which preserves scroll velocity
and lets you scroll back out. Hijacking `wheel` to force full-screen slides is the single most
resented pattern in this archetype.

**8. Section headings are constrained to a column span, not one global measure.**
Stripe: `section-title--span-8` = 856px, `--span-7` = 752px, `--span-6` = 648px. OpenAI holds prose
at 670–768px inside a 1440px container. Oxide runs 720 / 600 / 480px prose blocks against a 1200px
content width and a 2000px full-bleed.
*Why it works:* varying the measure section to section creates the rhythm that a single centered
column can't. It's how a magazine spread works.
*The generic alternative:* `max-w-3xl mx-auto` on every heading and every paragraph, producing a
single 768px ribbon down the middle of a 1440px page with 336px of dead space on each side.
*When it does not apply:* long-form articles, where a **consistent** measure is the whole point —
The Pudding and Kinfolk hold one measure for body text and only break it for full-bleed figures.

**9. Sections are separated by 128–288px, and the space is a token with a name.**
Apple: `144px` top and bottom on every section. Linear: `128px`. Oxide: `128px`, nine times in a
row. Anthropic names them `--section-space--{extra-small, small, medium, main, large, page-top}`
resolving to 32/64/96/160/224/192px at desktop.
*Why it works:* the gap is what tells a scanning reader that an idea has ended. At 64px the eye
carries the previous section's rhythm into the next one and the page reads as one undifferentiated
scroll; somewhere around 120px the break registers as a break. It is also the cheapest possible
edit — you can add it to a finished page in one pass.
*The generic alternative:* `py-16` (64px) or `py-20` (80px), which reads as a landing-page template
where every section is the same importance.
*When it does not apply:* three cases, all common. (a) Content-dense pages — a changelog, a pricing
page, a docs index; Linear's own changelog section on the same homepage sits at zero extra padding
because it is a list. (b) **Full-bleed bands.** Apple runs `0` top and bottom on its edge-to-edge
image and video sections, because the asset already contains its own margin; padding a full-bleed
section is how you get 288px of empty ground above a photograph. (c) **Mobile**, where 224px is
roughly a third of a 844px viewport — Vercel drops 208 → 160px, and below ~120px on a phone the same
gap that read as confident at 1440 reads as a loading bug.

**10. The luxury move is to make the type *smaller*, not bigger.**
Aesop's hero headline is 30px at 1440. The Row's body copy is 13px/21.45px. Kinfolk's hero is 50px
uppercase over an enormous field of white with the actual magazine cover at ~435px wide. Locomotive
rebases `html` to 15px so the whole rem scale shrinks.
*Why it works:* small type surrounded by a lot of nothing signals that the image, the object, or the
reader's attention is the important thing. Large type signals you need to be convinced.
*The generic alternative:* 60px+ centered on everything regardless of category, so a skincare brand
and a devtools startup ship the same hero.
*When it does not apply:* anything sold on capability rather than desire. Vercel and Linear are
right to run 64px, and a 30px hero on a devtools homepage reads as timid, not refined. The rule is:
**if the visitor already wants it, shrink the type; if you have to convince them, grow it.**

**11. Sans display over serif body is the highest-leverage single decision available.**
Anthropic pairs `Anthropic Sans` at 700 with `Anthropic Serif` body at 20px/1.4 — and the serif is
the *default* on `<body>`. Kinfolk goes further with three optical cuts of one serif
(`Kinfolk-Serif-Display` / `-Deck` / `-Text`) plus `Kinfolk-Sans` for chrome. Resend runs a Domaine
serif at 96px against sans body. The Pudding pairs Gooper (slab serif) headlines with Atlas Grotesk
chrome and Atlas Typewriter meta.
*Why it works:* a serif reading column signals that there is something to read. It is the fastest
way to make a page feel edited rather than assembled.
*The generic alternative:* Inter for everything, at 400 and 600, in two sizes.
*When it does not apply:* interface-adjacent pages where the marketing page must feel like the app —
Linear correctly uses Inter Variable everywhere, and a serif on a devtools homepage would break the
continuity into the product. Also: never a Google-Fonts serif at body size on a dark ground; the
thin strokes disappear.

**12. Chrome details come from print, not from component libraries.**
basement.studio puts nav counts in **superscript parentheses**: `Showcase ⁽²⁶⁾`. Oxide labels its
hero photo `FIG. 1 OXIDE CLOUD COMPUTER` in mono uppercase inside a hairline box, and labels its
logo row `POWERING THE BEST TEAMS` in mono at ~12px with the logos cropping off the left edge.
The Pudding puts the issue number in an outline pill and `AUG 2026` in mono uppercase on the same
baseline, **above** the image. Kinfolk's CTA is `Buy | Read` — two text links and a pipe. Anthropic
underlines two words of the headline with a real `text-decoration`.
*Why it works:* these are typographic decisions that require someone to have made them. A badge
component does not.
*The generic alternative:* a rounded pill with an emoji and an arrow, a `<Badge variant="secondary">`,
a chevron, and a `Card` with a `CardHeader`.
*When it does not apply:* if you only do one of these it looks like an accident. The device has to
recur — Oxide's `FIG. 1` works because the mono-uppercase-hairline treatment is used consistently on
every figure, nav item and button on the page.

---

## States, edges and the unglamorous parts

Marketing pages have fewer states than apps, and the ones they have are usually skipped entirely by
generated output. These are the ones that matter.

**Before the fonts load.** Every site here self-hosts a bespoke face (Söhne, Geist, SF Pro,
Anthropic Sans/Serif, OpenAI Sans, Suisse Intl, Adventure, te-20/te-40, Kinfolk-Serif). A 64px
headline reflowing from a fallback to a −0.06em custom face is a violent shift. Declare a real
fallback stack with matched metrics — Vercel ships `GeistSans, "GeistSans Fallback"`, an actual
generated metric-override face; Anthropic ships `"Anthropic Serif", Georgia, sans-serif`. Never
`font-display: swap` on a hero without an override.

**Before the hero video loads.** Rivian and Aesop both lead with autoplaying video. Both ship a
poster frame that is *the first frame*, so the transition is invisible. Aesop additionally offers a
play/pause and a mute control at 40px in the bottom-left — an accessibility requirement for
autoplaying media that generated pages omit 100% of the time.

**Reduced motion.** Stripe's 800ms `clip-path` reveals, Kinfolk's 84 opacity transitions and
Rivian's 300vh scroll-scrub all need a `prefers-reduced-motion: reduce` branch that renders the end
state immediately. The failure mode is not "less pretty", it's "content never appears" — if your
reveal starts at `opacity: 0` and the trigger is disabled, the page is blank.

**The cookie banner.** It is part of the design whether you like it or not, and it will cover your
hero CTA. Aesop's sits as a full-width bar in the page's own `#FFFEF2` with body-size type. The Row
gives it 0-radius black buttons matching the site. Kinfolk uses 2px-radius buttons matching its
system. Rivian's uses 36px pills matching its system. **Oxide's** — screenshotted 2026-09 — is a
bottom-right panel on the page's own dark ground with two 0-radius hairline-outlined buttons,
`REJECT OPTIONAL` and `ACCEPT ALL` in mono uppercase, identical to the site's nav buttons, plus an
underlined `Privacy Policy` text link. It sits over the rack photograph and does not damage the
composition because it is built from the same three elements as everything else. Generated pages
ship the vendor default and it is instantly the ugliest element on the page.

Two things to copy from Oxide's specifically: the reject option is a **peer** of accept, same size
and same treatment (a dark pattern is also a design tell), and the banner is anchored to a corner
rather than spanning the full width, so it covers the least valuable quadrant of the fold. Decide
which quadrant that is before you place your CTA.

**States that only exist under a bot wall.** Aesop, OpenAI and SSENSE all sit behind Cloudflare
interstitials that serve a challenge page to headless requests. On the 2026-09 re-probe Aesop
returned the challenge on every attempt, so **every Aesop number in this file is from the single
2026-08 request that cleared and has not been re-confirmed.** If you are auditing a competitor and
you get clean numbers on the first try, check that you did not just measure a Cloudflare page:
a `<title>` of "Just a moment…", a body under 2KB, or a `#challenge-form` in the DOM are the tells.

**Long headlines and translation.** Anthropic's hero is four lines at 390px and stays left-aligned;
it does not re-center or shrink. German and Finnish will add 30% — a 64px headline at −0.06em with
`leading: 1.0` that wraps to five lines is a solid block. Test the longest supported locale before
locking the leading.

**Empty and sparse states.** A changelog with three entries, a customer wall with four logos, a
portfolio with two projects. Linear's homepage changelog is a plain list with zero extra padding, so
three entries look intentional. Oxide crops its logo row off the left edge, so five logos read as
"a selection" rather than "all we have". A centered, evenly-spaced grid of four logos in a 1400px
container reads as a shortfall. **Crop, left-align, or use a marquee — never center a short row.**

**Too much data.** Apple's MacBook Pro page is 30,873px tall with fourteen sections ranging from
525px to 7,329px. The variance is the mechanism: a long page survives by having sections of wildly
different heights and treatments (dark/light alternation, full-bleed/contained, image-led/text-led).
Fourteen equal 800px sections is unreadable at any length.

**Offline / failed media.** Full-bleed hero images that fail leave a headline in white text on
white. Set the section's background to a color sampled from the image (Apple: `#000` behind the dark
hero) so the type stays legible when the asset doesn't arrive.

**Focus.** Anthropic ships `--focus--width: 2px`, `--focus--offset-outer: 4px`. Vercel ships a gap
ring: `0 0 0 2px var(--ds-background-100), 0 0 0 4px var(--ds-focus-color)`. Apple ships
`--sk-focus-color: #0071e3` plus `--sk-focus-color-alt: rgb(0,0,0)` so the ring inverts on dark
sections. Generated pages ship `focus:outline-none` and nothing else.

**The nav bar over a full-bleed hero.** Six of these sites put a transparent nav over a photograph
or film, which means the nav's own contrast is a function of whatever pixel is behind it. Rivian
sets white chrome over dark cinematography; Oxide sets a `#0f1114`-ish ground so its green wordmark
holds; basement puts a solid black bar above the scene rather than floating over it. There is no
generated equivalent of this decision because a generated hero has a flat background — which is
exactly why a generated page's nav is always legible and always inert. If you ship a transparent
nav, you owe it a scroll state, and the scroll state has to change at a scroll position you chose,
not at `scrollY > 0`.

**The live number.** Stripe's hero eyebrow is `Global GDP running on Stripe: 1.71305256%` — a
ticking counter carried to eight decimal places, in body-size type above the headline. Hello Monday's
nav carries `4 days until Monday`. basement's nav carries `● Online ⁽¹⁰⁾`. These are the same move:
one element on the page that is demonstrably *live*, so the page cannot have been a static export.
The failure mode is a fake one — a counter that animates from 0 to a hardcoded 10,000 on load and
then sits there is worse than no counter, because a returning visitor sees the identical number.

---

## Mobile

The archetype does adapt, and the adaptations are measurable. Measured at 390×844:

| Site | Desktop h1 | Mobile h1 | Size ratio | Desktop lh → mobile lh | Tracking (em) | Mobile side margin | Mobile page height |
|---|---|---|---|---|---|---|---|
| Rivian R1S | 200 / 192 | 96 / 92.16 | **0.48** | 0.96 → 0.96 | −0.025 → −0.025 | 16px | — |
| basement.studio | 87 / 78 | **46 / 39.2** | **0.53** | 0.897 → **0.852** | −0.04 → −0.04 | 16px | 5,257 (desktop 6,714) |
| Anthropic | 60.87 / 66.95 | 40.29 / 44.32 | 0.66 | 1.10 → 1.10 | 0 → 0 | **33px** | 6,483 (desktop 3,345) |
| Stripe | 48 / 55.2 | 34 / **35.02** | 0.71 | 1.15 → **1.03** | −0.02 → −0.01 | 16px | **20,373** (desktop 14,668) |
| Vercel | 64 / 64 | 48 / **56** | 0.75 | 1.00 → **1.167** | −0.06 → −0.06 | 24px | 4,981 (desktop 5,333) |
| Linear | 64 / 64 | 38 / 41.8 | 0.59 | 1.00 → **1.10** | −0.022 → −0.022 | 23px | 5,876 (desktop 9,960) |
| Apple | 80 (`headline-super`) | 21px eyebrow / gradient headline scales via clamp | — | — | — | 24px | — |

**Tracking is held as an em; leading is not.** Every site in this table keeps the same `em` tracking
across breakpoints (Vercel: −3.84px at 64 → −2.88px at 48, both exactly −0.06em; Linear: −1.408 →
−0.836, both −0.022em). Only Stripe changes it, and only by one step. So: put tracking in `em` and
forget it; put leading in a breakpoint.

**Mobile page height is not desktop page height.** Anthropic nearly doubles (3,345 → 6,483) because
side-by-side becomes stacked. Linear nearly halves (9,960 → 5,876) because four 1,230px feature
sections are cut down. Stripe grows 39%. There is no single relationship — which means you cannot
reason about a mobile page's shape from its desktop page's shape, and a scroll-triggered choreography
tuned at 1440 fires at completely different moments at 390.

The rules:

1. **Display type drops to 48–75% of desktop, not 90%.** A `clamp()` whose min is 80% of its max is
   not a responsive type scale, it's a rounding error. Rivian's `clamp(72px, 13.54vi + 26.72px,
   200px)` has a 2.8× range.
2. **Line-height usually goes *up* as size comes down — but not always.** Vercel 1.0 → 1.167,
   Linear 1.0 → 1.10, Anthropic holds 1.10 → 1.10. Two measured counterexamples: **Stripe goes the
   other way** (1.15 → 1.03) and **basement.studio tightens further** (0.897 → 0.852). The pattern
   underneath is not "loosen on mobile", it is *leading tracks the physical size of the type,
   independent of viewport*: Stripe's mobile hero at 34px is still large, so 1.03 holds; basement's
   46px likewise. Anthropic's hero deck stays at **24px/33.6px on both breakpoints** while the
   headline drops 60.87→40.29px, so headline-to-deck contrast compresses from **2.54× to 1.68×**.
   That is correct — a 12× contrast ratio (Rivian's 200px/16px) is unreadable on a 390px screen,
   and Rivian resolves it the same way by dropping to 96px.
3. **Left alignment survives.** Anthropic's four-line mobile headline stays left-aligned at
   `X: 33px`. Do not center on mobile because "it looks balanced" — you lose the ragged right edge
   that makes it read as editorial.
4. **Side margins are 16–33px, and they are not the desktop margin scaled.** Anthropic's is
   `clamp(2rem, …, 5rem)` = 32px mobile, 80px desktop — a 2.5× range, not proportional.
5. **Buttons go full-width or stay small; nothing in between.** Stripe's mobile CTA is `W: 358px` on
   a 390px viewport (full-bleed minus 16px margins) at 44px tall. Vercel's is 342px at 40px.
   Rivian's stays 40px tall at pill radius. A 60%-width centered button is the generic answer.
6. **Where it admits it shouldn't adapt:** Oxide's engineering-drawing hero (leader line joining a
   tabbed `CLI / API / CONSOLE` panel to a rack photo) cannot work at 390px, and Oxide doesn't try —
   mobile gets the photograph and the headline, the diagram is dropped. If your signature move is a
   two-object spatial relationship, ship a different mobile hero rather than a squashed one.
   *Correction to the previous pass of this file:* basement.studio's 3D scene **does** ship at 390px
   — verified by screenshot 2026-09. It occupies roughly the top 75% of the viewport as a rendered
   scene, with the 46px headline pushed below it and the `HUMAN / MACHINE` segmented pill floating
   over the type. So a heavy hero can survive mobile; what cannot survive is a hero whose meaning
   depends on two elements sitting side by side.
7. **Floating controls over type is a real pattern, not a bug.** basement's `HUMAN / MACHINE`
   toggle sits *on top of* the mobile headline. The Row's mobile page is nav → photograph → a
   two-line 13px credit (`William Eggleston, Untitled, c. 1983 – 1986 / © Eggleston Artistic Trust`)
   → a newsletter field with a **full-width 0-radius dark Submit bar**. That credit line is the only
   body copy on the entire homepage, and it is an attribution, not marketing.
8. **teenage.engineering's answer** is a second set of vw ratios: `--fs-20` goes from
   `0.0183673 × 100vw` to `0.00918367 × 100vw`, and `--tile-border-radius` goes from
   `0.0255102 × 100vw` to **0**. Radii and paddings that are proportional on desktop are often
   correct at zero on mobile.

---

## Where the references disagree

A file of rules that every reference obeys is a file of rules that were fitted to the references.
These are the places the set genuinely splits, which is where judgement actually lives.

**Stripe's homepage breaks two rules in this file, on purpose.** As of 2026-09 its fold is: a
full-bleed abstract gradient ribbon on the right 60% (rule 5 says no abstract hero), and **two CTAs
side by side** — a filled purple `Get started ›` next to an outlined `Sign up with Google` — plus
`Sign in` and `Contact sales ›` in the nav, so four buttons above the fold (failure mode 3). Its
headline is also not one color: the four lines run black → slate → violet word by word, animating
between them. Every one of these is a self-aware, expensive, brand-owned decision by a design team
with a decade of equity in that gradient. None of them is the same act as reaching for
`bg-gradient-to-r from-purple-500`. **The rules in this file describe the safe default; Stripe is
what it looks like to have earned an exception.** If you cannot name what you have earned, take the
default.

**Logo clouds: black vs. full color.** Vercel renders its logo row in true black at real optical
proportions. Stripe renders Ford, Coinbase, Google, Shopify, Mindbody, MetLife, Ramp and Marriott
in **full brand color**, on the fold line, with the row cropping off the right edge. Both are right;
both are refusals of `grayscale opacity-60`. Pick black when your page has one accent and the logos
would fight it; pick full color when the logos' recognizability is the whole point.

**Left-aligned vs. centered heroes.** Kinfolk centers a 50px uppercase serif in a 720px column at
x:360. Aesop centers 30px over a film. Hello Monday centers a near-invisible 80px serif under an
illustration. Left-alignment is the majority (6 of 8 measurable, all starting within 80px of the
edge) but it is not a law — what all three centered heroes share is that **the centered element is
small**. Nobody centers 64px.

**Restraint vs. density.** The Row's entire homepage is 1,281px tall. Apple's is 30,873px. Stripe's
mobile page is 20,373px. Both extremes work, and the failure is in between: a 6,000px page made of
eight 750px sections. Commit to one screen or commit to fourteen; the middle is where templates live.

---

## How this archetype fails

The generic AI landing page is a fixed nine-slot sequence. Here is each slot, what is actually wrong
with it, and the specific alternative that a measured reference uses instead.

**1. Badge pill.** `✨ Introducing v2.0 →` in a rounded-full chip with a border and a gradient
border-glow, centered above the headline.
*Wrong because:* it announces that a product person wrote a template, and the sparkle emoji dates
the page to a specific 18-month window.
*Instead:* Vercel runs a centered text-only line above the fold — `Ship 26 is coming to SF   Get
your ticket ›` — with no pill, no border, no icon, just a 16px sentence and a chevron. Anthropic
runs nothing at all: the fold is headline, deck, whitespace. Oxide runs a mono-uppercase figure
label. If you need a announcement, make it a **line of text with a link**, not a component.

**2. Centered 60px gradient headline.** `text-6xl font-bold bg-gradient-to-r from-purple-500
to-pink-500 bg-clip-text text-transparent`.
*Wrong because:* re-checked 2026-09 across **fourteen** of these sites for `linear-gradient` or
`-webkit-text-fill-color: transparent` on `h1`/`h2`/`h3` — Vercel, Anthropic, Linear, Oxide, Apple,
Stripe, The Row, Hello Monday, Rivian, Kinfolk, The Pudding, basement, Locomotive,
teenage.engineering — and got **zero hits**. Apple has exactly one
gradient headline on the MacBook Pro page and it is
`linear-gradient(90deg, #E4F6F0, #9DCFCA 31%, #6B95AC 68%, #45657D)` — four stops, all desaturated,
sampled from the actual finish of the product in the photograph behind it.
*Instead:* solid `#171717` at 64px/64px/−0.06em/weight 400 (Vercel). Or 61px weight 700 with **two
words underlined** (Anthropic). Or a 200px wordmark in white over film (Rivian). If you want a
gradient, sample it from your own product photograph and desaturate it.

**3. Two CTAs side by side.** A filled primary and an outlined secondary, both 44px, both 8px
radius, centered under the subhead.
*Wrong because:* it tells the visitor you don't know which action you want. Also, the outlined
secondary is almost always "Learn more", which is not an action.
*Instead:* Anthropic ships **zero** hero CTAs — the only button on the fold is `Try Claude` in the
nav. Kinfolk ships `Buy | Read` as two text links with a pipe. Rivian ships two 56px pills but
places them in the **opposite corner** from the headline, so the hero reads as a poster with a
caption and an action rather than a stack. OpenAI ships the product's actual input field. If you
must ship two, make them visually unequal in more than fill — Vercel's are 40px pills where the
secondary has no border at all, just a white fill on a `#fafafa` ground.

**4. Logo cloud.** Six to eight customer logos in `grayscale opacity-60`, evenly spaced, centered,
under a heading that says "Trusted by teams at".
*Wrong because:* desaturating a logo destroys the one thing that makes it recognizable at 24px, and
even spacing makes six logos look like a shortfall.
*Instead:* two measured answers, both refusals of grayscale. Vercel renders its logos in **true
black at their real proportions** (Charles Schwab's serif lockup next to DoorDash's script next to
Supreme's Futura) on the fold line, sized by optical weight rather than to a uniform box. Stripe
renders eight — Ford, Coinbase, Google, Shopify, Mindbody, MetLife, Ramp, Marriott — in **full
brand color** on the fold line, with the row running off the right edge. Oxide labels its row
`POWERING THE BEST TEAMS` in mono uppercase and **crops the leftmost logo off the left edge** (the
first mark reads as `OKE`), which says "a selection from many" in a way an evenly spaced row cannot.
The common factor is that in all three the row is *cropped or bled*, never centered with equal air
on both sides.

**5. Three feature cards.** A 3-col grid of white cards, each with an outlined 24px icon in a
rounded square, a 20px title, three lines of body, and `hover:shadow-lg`.
*Wrong because:* three equal cards assert that you have exactly three equally-important features,
which is never true, and the outlined icon is doing no work.
*Instead:* Linear gives each of four ideas its **own full section at 1220–1232px tall with 128px
padding** — one idea per screen, each illustrated by a real screenshot of the feature. Stripe's
bento cards contain a working checkout with real payment methods and a fraud panel showing
`0.06% / 0.02% / 0.08%`. Apple's fourteen sections range from 525px to 7,329px tall. **Make the
sections different sizes.**

**6. Bento grid.** A 12-col asymmetric grid of `rounded-2xl` cards with `bg-gradient-to-br
from-gray-50` and abstract 3D shapes.
*Wrong because:* bento is a layout for showing *many real artifacts at once* (Apple's spec grids,
Stripe's product surfaces). With placeholder content it's a mood board.
*Instead:* only use it when you have 5+ genuinely different real assets. Stripe's largest bento card
is `687.888px` wide with a `516px` `dom-graphic` inside it — an actual rendered DOM of the product,
not an image. If you have three real screenshots, use three full-width sections, not a bento.

**7. Testimonial trio.** Three quote cards with a circular headshot, a name, a title, and a
five-star row.
*Wrong because:* the star row is retail-review furniture and undercuts a B2B claim; three equal
quotes are three equal nothings.
*Instead:* Vercel writes one 24px/32px sentence per customer that contains a **number**: *"Zapier
serves over 100 million monthly webhook requests"*, *"Notion powers millions of agent
conversations"*, *"Mintlify powers documentation for over 2[…]"*. No headshot, no stars, no card.
Stripe's stat is a single line: *"50% of Fortune 100 companies have used Stripe"* at 18px/25.2px.

**8. FAQ accordion.** Six `<details>` above the footer.
*Wrong because:* it is a pricing-page and support-page pattern. Of the eight primary homepages I
checked programmatically, **six had no accordion and no "FAQ" string at all** — the two that did
(Rivian's spec disclosures, Oxide's product FAQ) use them for genuine reference content deep in a
product page, not as a homepage section.
*Instead:* delete it. If a question is important enough for the homepage, answer it in a section. If
it isn't, it belongs in docs.

**9. Gradient CTA band.** A full-width purple-to-blue band with centered white text and a white
button, directly above the footer.
*Wrong because:* it is the only saturated area on an otherwise restrained page, so it reads as a
bolted-on conversion widget.
*Instead:* Anthropic's prefooter is a full-bleed **photograph card** with a ~24px radius, a 68px
serif headline in `#faf9f5` on the image, and a single dark button. Apple's is a pill that contains
the price *and* the Buy button in one shape: `From $1999 or $166.58/mo. for 12 mo.` on the left,
a blue `Buy` pill on the right. Linear's prefooter carries `margin: 224px 0` and a plain headline.

### The self-diagnostic

The nine slots above describe a page's *content*. This describes its *numbers*. Run these against
the DOM of anything you just generated, before showing it to anyone. Each line is a threshold, not a
vibe, and each names the reference value it is being measured against.

| # | Measure | Fail if | Reference band | Why it's diagnostic |
|---|---|---|---|---|
| 1 | h1 `font-weight` | ≥ 600 at ≥ 56px | 300–510 (12 of 17) | Weight and size doing the same job |
| 2 | h1 `line-height ÷ font-size` | ≥ 1.20 | 0.80–1.16 | `leading-tight` was never checked against the type |
| 3 | h1 `letter-spacing ÷ font-size` | > −0.015em at ≥ 56px | −0.02 to −0.06em | Default sidebearings left in place |
| 4 | Same `letter-spacing` class on h1 and on 14px labels | any | tracking is a function of size on Rivian, Stripe, Anthropic | One `tracking-tight` for the whole page |
| 5 | Vertical gap between padded top-level sections | < 96px | 128–288px | `py-16` |
| 6 | Distinct section heights ÷ section count | < 0.5 (i.e. most sections the same height) | Apple 525→7,329px | Equal sections are a template's signature |
| 7 | Max−min RGB channel spread on any text or ground neutral | > 14 | 0–13 | `slate-*` |
| 8 | Distinct button radii on the page | 1 | 2–3 (nav ≠ hero) | A single radius token was never a decision |
| 9 | Distinct button heights on the page | 1 | 2–3 (30–36 nav, 40–56 hero) | Same |
| 10 | Peak shadow alpha | > 0x1a (10%) | ≤ 0x0f (6%), always paired with a 1px border shadow | Visible gray = 3× too strong |
| 11 | Interactive elements with `transform` in `transition-property` | > 2% | 0–1% | `hover:scale-105` |
| 12 | Hover duration vs. scroll-reveal duration | equal | hover 100–320ms, reveal 500–1000ms | Both collapsed to 300ms |
| 13 | `linear-gradient` or `-webkit-text-fill-color: transparent` on h1/h2/h3 | any | 0 hits across 14 sites re-checked 2026-09 | The single loudest tell |
| 14 | Distinct heading measures (max-width values) across sections | 1 | 3 (Stripe 856/752/648; Oxide 720/600/480) | `max-w-3xl mx-auto` on everything |
| 15 | Body font sizes in use | 1 | 2–3, by role (OpenAI 17 prose / 14 for five other roles) | `text-base` + accidental `text-sm` |
| 16 | Mobile h1 ÷ desktop h1 | > 0.85 | 0.48–0.75 | A `clamp()` whose min is 80% of its max |
| 17 | `prefers-reduced-motion` branch present when any reveal starts at `opacity: 0` | absent | required | Content never appears, not "less pretty" |
| 18 | Elements matching `focus:outline-none` with no replacement ring | any | Anthropic 2px/4px offset; Vercel gap ring | — |

**The composite tell.** Any one of these can be a defensible choice. The generated page fails
**eleven to fifteen of them at once**, which is the actual signature: not a wrong number, but the
total absence of any number that was chosen. If you fix only the top of the list — weight, leading,
tracking, section gap, neutral spread — you move a page most of the way, because those five are the
ones a reader registers before they read a word.

### What the AI version of this archetype looks like, specifically

So an agent can recognize its own output. The generated editorial/marketing page is, almost without
variation:

A 64px `font-bold` headline in Inter or Plus Jakarta, centered in `max-w-4xl mx-auto`, with a
violet-to-pink `bg-clip-text` gradient on it, a `✨`-prefixed pill above it, a 18px
`text-slate-600` subhead below it at `leading-relaxed`, and two `rounded-lg` 44px buttons under
that reading `Get Started` and `Learn More`. Below the fold: a row of six grayscale logos under
"Trusted by teams at"; three `rounded-2xl` white cards each with a `lucide-react` outline icon in a
`rounded-xl bg-slate-100` square, a 20px title, three lines of `text-slate-600`, and
`hover:shadow-lg hover:-translate-y-1 transition-all duration-300`; a bento grid of
`bg-gradient-to-br from-slate-50 to-slate-100` tiles containing nothing; three testimonial cards
with `<img src="https://i.pravatar.cc/…">` and five filled stars; a six-item `<details>` FAQ; and a
`bg-gradient-to-r from-indigo-600 to-purple-600` band with `Ready to get started?` and a white
button. Every section is `py-20`. Every section is between 700 and 900px tall. Every radius is `8px`
or `rounded-2xl`. Every animation is `duration-300`. There is no `<figure>`, no caption, no
footnote, no asterisk, no mono, no serif, no photograph, and no number that is not `10,000+`,
`99.9%`, or `$12,345.67`.

**Three deeper tells that survive a cosmetic fix**, and that a page can still exhibit after all
eighteen thresholds above are satisfied:

1. **Nothing on the page could be wrong.** Every claim is unfalsifiable. Oxide's headline invites
   an argument from anyone in the category; `The all-in-one platform for modern teams` cannot be
   disputed because it asserts nothing. If a competitor could paste your headline onto their site
   without it becoming false, you have written the generic one.
2. **The page has no second-most-important thing.** A generated page is a stack of equal blocks in
   priority order. A designed page has one element that clearly won and everything else arranged
   around it — Rivian's 200px wordmark with the CTAs pushed to the opposite corner, Oxide's
   headline at the *bottom* left because the rack owns the right. The test: cover the hero asset.
   If the remaining layout is a centered vertical stack, there was never a composition.
3. **Every recurring device appears exactly once.** Oxide's mono-uppercase-in-a-hairline-box shows
   up on the figure caption, the logo row label, the nav, and the buttons — four appearances make it
   a system. A single `FIG. 1` on an otherwise shadcn page reads as costume. When you borrow a
   device from this file, commit to using it at least three times or don't use it.

---

## Copy and tone

The register in this archetype is **declarative and specific**. Nobody good writes in the
"Empower your team to unlock" voice.

**Headlines are claims, not benefits.** Measured, verbatim:
- `Agentic Infrastructure` — Vercel. Two words. No verb.
- `On-prem that feels like the public cloud` — Oxide. A comparison anyone in the category
  immediately understands and can dispute.
- `AI research and products that put safety at the frontier` — Anthropic.
- `Financial infrastructure to grow your revenue` — Stripe.
- `Fast runs in the family.` — Apple. A pun that only works because the section is about M5, M5 Pro
  and M5 Max.
- `The product development system for teams` — Linear.
- `What can I help with?` — OpenAI. The headline is the product's own prompt.
- `Post-Poo Drops: a long-awaited homecoming` — Aesop. Genuinely funny, in a serious voice.
- `ISSUE 60 / HISTORY SPECIAL` — Kinfolk. The headline is just the fact.

**Eyebrows are labels, not teasers.** `MacBook Pro` (Apple). `FIG. 1 OXIDE CLOUD COMPUTER` (Oxide).
`POWERING THE BEST TEAMS` (Oxide). `On sight, a sigh of relief` (Aesop). `#224   AUG 2026` (The
Pudding). None of them say "Introducing" or "Now available".

**Body carries numbers and nouns.** `50% of Fortune 100 companies have used Stripe`. `Zapier serves
over 100 million monthly webhook requests`. `Leasing from $1,239/mo*` with a `* Disclosures` link
directly beneath. `8+ vendors across compute, networking and storage` (Oxide, as the *problem*
statement). `From $1999 or $166.58/mo. for 12 mo.` — Apple ships the exact monthly figure, not
"starting at $1999".

**Right:**
- `Deploy now` / `Talk to sales` (Vercel — two different funnels, named)
- `Buy | Read` (Kinfolk)
- `Design yours` / `Book a drive` (Rivian — both are things you do, neither is "Learn more")
- `Discover Fragrance` (Aesop — the noun is in the label)
- `Try ChatGPT ↗` (OpenAI — the arrow says it leaves the site)
- `Contact sales` (everyone, unglamorously)

**Wrong:**
- `Get Started` next to `Learn More` — two buttons, zero information
- `Empower your team to do their best work`
- `The all-in-one platform for modern teams`
- `Supercharge your workflow with AI-powered insights`
- `Join thousands of happy customers`
- `Trusted by teams at` above a row of gray logos
- `✨ Introducing our new AI assistant →`
- `Ready to get started? Start your free trial today.`

**Tone by sub-archetype.** Devtools (Vercel, Linear, Oxide): terse, technically checkable, slightly
dry — *"On-prem that feels like the public cloud"*. Luxury (Aesop, Kinfolk, The Row): full
sentences, subordinate clauses, no exclamation, product named plainly — *"Plant-based and
laboratory-made ingredients"*. Editorial (The Pudding): lowercase, funny, curious — *"mowing
experiment / Why some people mow a lawn better than others."* AI labs (Anthropic, OpenAI): plain,
institutional, no adjectives — *"AI will have a vast impact on the world. Anthropic is a public
benefit corporation dedicated to securing its benefits and mitigating its risks."*

**Footnotes and disclosures are part of the voice.** Rivian's `* Disclosures` under `Leasing from
$1,239/mo*`. Apple's superscript `≜`, `*` and `◊` markers with `--sk-footnote-font-size: 0.6em`
and `--sk-footnote-reduced-font-size: 0.45em` as real tokens. Showing the asterisk builds more trust
than hiding it, and a system that has a *token* for footnote size is a system that expects to be
honest.

---

## Sources

Screenshots in `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/elm-*.png`; probe JSON in the session
scratchpad under `elm/`.

- **stripe.com** — re-probed 2026-09 at 1440 + 390. Hero 48px/55.2px/−0.96px/w300 at `X:208 W:959`,
  headline colored per word (black → slate → violet, animating); mobile 34px/35.02px at `X:16`;
  page 14,668px desktop / 20,373px mobile. **715 custom properties on `:root`** — the `--hds-*`
  system, every heading and text weight token at 300, an 8px space scale to 160px. *(The previous
  pass of this file reported "zero custom properties"; that was a probe artifact — Stripe's CSS is
  cross-origin so `sheet.cssRules` throws. Enumerate `getComputedStyle(document.documentElement)`
  instead. The same artifact would have mis-read Linear as 0 rather than 419.)* Section titles
  constrained to `span-8/7/6` (856/752/648px); scroll reveals at 0.8s
  `cubic-bezier(0.165,0.84,0.44,1)` on transform and clip-path; full-bleed brand gradient ribbon on
  the right 60% of the fold; two hero CTAs plus two nav CTAs; full-color logo row.
- **linear.app** — re-probed 2026-09. 64px/64px/−1.408px at weight **510**, `X:78 W:1282`; ground
  `#08090a`; four homepage sections at `padding: 128px 0` measuring 1226/1229/1232/1220px tall;
  prefooter at `margin: 224px 0`; **419 custom properties on `:root`** including
  `--ease-out-quad: cubic-bezier(.25,.46,.45,.94)` and `--title-9-line-height: 1`. Mobile 38/41.8 at
  `X:23`, page 9,960px desktop → 5,876px mobile. Text ramp `#d0d6e0` / `#8a8f98` is the one
  measurably cool-cast neutral in the set (channel spread 16 / 14).
- **vercel.com** — re-probed 2026-09: h1 `Agentic Infrastructure` 64/64/−3.84px at weight 400,
  `X:24 W:444`; ground `#fafafa`, text `#171717`; second section at computed `margin-top: 208px`;
  page 5,333px desktop / 4,981px mobile; mobile h1 48/56 at −2.88px (the same −0.06em); 128
  transitioning `<a>`/`<button>`, **0** animating `transform`; nav buttons 32px at 6px radius,
  in-page buttons 40px at 8px radius, hero `Deploy now` a 40px pill. Token dump: full `--ds-gray-*` light and dark ramps,
  `--ds-shadow-*` (peak alpha 6%), `--ds-focus-ring` gap ring, `--ds-page-width: 1400px`, fluid type
  tokens `--text-fluid-64-128`. h1 64/64/−3.84px = −0.06em. Three-column hero, black logo cloud.
- **anthropic.com** — re-probed 2026-09: 282 tokens, ground `#faf9f5`, `<body>` default is
  **Anthropic Serif 20/28**, h1 60.87/66.95 w700 at `X:78 W:736` (mobile 40.29/44.32 at `X:33`),
  196 transitioning interactive elements of which **2** animate `transform`: complete ivory/slate/cloud palette, six named section-space steps,
  12-col 89.5rem grid, six line-height values, three letter-spacing values, per-font leading-trim
  ems, nav timings. Asymmetric hero with two underlined words; sans display + serif body.
- **openai.com** — 1,157 tokens (required a 15s wait past a Cloudflare interstitial): 13-step pure
  neutral primitive ramp, dark mode by token remap, `--type-p1-size: 1.0625rem` (17px), clamp-based
  h1/h2/xl. Hero is a live composer with five hairline pill chips.
- **apple.com/macbook-pro** — re-probed 2026-09: 132 `:root` properties reachable this pass (288
  previously, likely a same-origin-stylesheet difference), `html { font-size: 17px }`, ground `#000`.
  `.typography-headline-super` = 80px/84px/−1.2px/w600 — note this is on a `<p>`; the actual `<h1>`
  is the 28px/32px eyebrow `MacBook Pro` at `+0.196px` tracking. Section padding is **not** uniform
  144: measured in page order `-96/0, 144/144, 144/216, 0/144, 0/0, 144/144, 144/0, 144/144,
  144/144, 144/0`; 30,873px page with 14 sections from 525px to 7,329px; the
  4-stop desaturated gradient headline; 980px content column; `0.32s cubic-bezier(0.4,0,0.6,1)`.
- **rivian.com/r1s** — re-probed 2026-09: **624** tokens (was 710), `html { font-size: 10px }`, h1
  200/192/−5px at weight 500 in **`Liga`** (not `Adventure`, which is the body face), `X:48 W:1344`,
  page 18,533px. Also: full 13-step px type scale, `--leading-display: 0.96`, four
  tracking tokens bound to role, `-cq` container-query type mirror, `4/12/20/32/40` radius scale,
  physically-named easings. 200px hero wordmark over autoplay film; 96px at 390px.
- **aesop.com/us** — computed styles captured on the one request that cleared Cloudflare (15s wait);
  screenshot captured on a second attempt with an 18s wait. Ground `#FFFEF2`; hero headline
  30px/39.9px/normal/w400; 48px 0-radius outlined CTA; centered nav wordmark with two link rows at
  12px.
- **kinfolk.com** — three optical serif cuts; 50px/52px uppercase hero; body 20px/30px serif;
  `Buy | Read` text-link CTA; 0.5s `cubic-bezier(0.25,1,0.5,1)` opacity reveals across 87 elements.
- **pudding.cool** — Gooper SemiCondensed at 32px/32px/−0.8px; per-story flat color mats
  (`#F5C33C`, `#F19EF5`, `#E88B2E`); outline-pill issue numbers with mono dates above the image;
  2px button radius; 1280px container.
- **basement.studio** — re-probed and screenshotted 2026-09 at 1440 + 390. Desktop 87px/78px
  (lh 0.897) at −0.04em, `X:16 W:1290`; **mobile 46px/39.2px (lh 0.852) at −0.04em** — the same em
  tracking and still sub-1 leading. Superscript-parenthesis nav counts; live `● Online ⁽¹⁰⁾`
  indicator; HUMAN/MACHINE segmented toggle floating over the mobile headline. **The 3D scene ships
  at 390px** (the previous pass called it desktop-only; that was wrong).
- **locomotive.ca** — re-probed 2026-09. `html { font-size: 15px }`; h1 70px/77px at `X:40 W:1360`
  with no tracking adjustment, in **`LocomotiveNew`** (not `HelveticaNowDisplay`, which is the body
  face), and containing emoji: `🔶 Locomotive® Digital-first Design Agency🍺🔞`. Nav links at 26px
  against 15px body. Page 6,598px.
- **hellomonday.com** — re-probed and screenshotted 2026-09. `html { font-size: 22px }`;
  `h1 { 80px / 64px }` (lh 0.8) at weight 300 in **`ClarendonBTWXX-Light`, a serif** (the previous
  pass credited `NB International Pro`, which is the body face). The h1 is a rotating word carousel
  set in near-white on white under a hand-drawn two-figure illustration; nav carries a live
  `4 days until Monday` counter. Page 10,101px.
- **teenage.engineering** *(off-list)* — re-probed 2026-09: **101** tokens (was 129), no `<h1>`,
  page 15,233px, all proportional to `--client-width: 100vw`
  against `--base-design-width: 980`; two font families, two weights (100/300); five fixed accents;
  `--btn-min-click-area: 48px` as the sole absolute; nav-as-sitemap with a Japanese mission
  paragraph at ~10px.
- **oxide.computer** *(off-list)* — re-probed 2026-09: **169** `:root` properties (was 479), entire
  palette in `oklch()`; ground `oklch(0.162 0.01 260)`; page 9,794px; every `<a>`/`<button>` at
  `transition-duration: 0s`; visible 10-column border overlay; h1 65px/65px/−1.625px
  at weight 400; body 16px/22px with **+0.021em** tracking; 12px uppercase 2px-radius buttons;
  `FIG. 1` hero caption with a leader line to a tabbed `CLI / API / CONSOLE` panel; section gaps
  re-measured at `[128, 128, 128]` between consecutive top-level `<section>`s (the earlier
  "nine in a row" figure used a finer selector and is not reproducible at section level).
- **therow.com** *(SSENSE substitute)* — re-probed and screenshotted 2026-09 at 1440 + 390.
  `html { font-size: 13px }`; body 13px/21.45px (lh 1.65) Basic Commercial; 11px 0-radius buttons.
  **Whole homepage is 1,281px tall**: letterspaced centered `THE ROW` wordmark with hamburger left
  and search/bag right, one full-bleed William Eggleston photograph, a two-line 13px credit
  (`William Eggleston, Untitled, c. 1983 – 1986 / © Eggleston Artistic Trust`), and a newsletter
  field with a full-width 0-radius dark `Submit` bar. The credit is the only body copy on the page.
- **cosmos.so, family.co, resend.com** — surfaced by the off-list screen; measured but not fully
  torn down. Cosmos: 74px/74px at −0.05em, weight **350**, bespoke `cosmosOracle`.
- **awwwards.com/websites/sites_of_the_day** — fetched 2026-09 to confirm basement.studio and Studio
  Freight are current Site of the Day winners and to sanity-check the agency cohort (Merci Michel,
  Resn, Unseen Studio, SHIFTBRAIN, Vide Infra, Magnetism, OFF+BRAND, Hobro Digital).
- **Could not be measured:** `nytimes.com/interactive/*` and `bloomberg.com/graphics/*` both served
  bot-challenge pages to every request (`elm-nyt-1440.png`, `elm-bbg-1440.png`);
  `reuters.com/graphics/` returned "Access is temporarily restricted" (`elm-reuters-1440.png`);
  `ssense.com/en-us/men` was Cloudflare-blocked across four attempts and two user agents
  (`elm-ssense-1440.png`). The Pudding stands in for the newsroom-interactive slot; The Row stands
  in for luxury commerce. Aesop and OpenAI each required a 15–18s wait past a Cloudflare
  interstitial and are reported from the requests that cleared it.
- **Direction-pass screenshots (2026-09)**, in `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/`:
  `editorial-luxury-and-marketing-dir-1` (stripe.com), `-2` (therow.com), `-3` (oxide.computer),
  `-4` (aesop.com — returned a Cloudflare challenge page, not the site), `-5` (hellomonday.com),
  `-6` (basement.studio), each at `-1440.png` and `-390.png`.

---

## Direction pass (2026-09)

Second-reader pass over the 2026-08 teardown. Fourteen sites re-probed with Playwright, six
re-screenshotted at 1440 and 390 and looked at directly.

**Corrected — numbers that were wrong**

- **Stripe ships 715 `:root` custom properties, not zero.** The original "zero custom properties"
  was a probe artifact (cross-origin `sheet.cssRules` throws). The recovered `--hds-*` system turned
  out to be the strongest evidence in the file for the weight rule: every heading and text weight
  token is 300. Same artifact had hidden Linear's 419 tokens.
- **Four display faces were misattributed to the body face**: Rivian's h1 is `Liga` not `Adventure`;
  Hello Monday's is `ClarendonBTWXX-Light` (a serif) not `NB International Pro`; Locomotive's is
  `LocomotiveNew` not `HelveticaNowDisplay`; Kinfolk's is `-Serif-Deck` not `-Serif-Display`. The
  Pudding's body is Atlas Grotesk, not Gooper.
- **Apple's `padding: 144px 0` is not on every section** — measured `-96/0, 144/144, 144/216, 0/144,
  0/0, 144/144, 144/0, …`. Full-bleed bands take zero. Also, Apple's `<h1>` is the 28px eyebrow; the
  80px line is a `<p>`.
- **The 0–3% HSL saturation rule was measurably wrong at the lightness extremes** (Anthropic's ivory
  reads 33% S, Aesop's ground reads 100% S). Replaced with RGB channel spread, threshold 14, with
  Linear (14–16) and Stripe (42) named as the honest exceptions.
- **"Zero `transform` on hover" was an over-claim** — Anthropic animates transform on 2 of 196
  interactive elements and Vercel leaves 13 on `transition: all`. Restated as 0–1%.
- **basement.studio's 3D hero does ship at 390px.** Previous pass called it desktop-only.
- **Oxide's section gaps re-measure as `[128,128,128]`**, not nine in a row; token count 169 not 479.
  Rivian 624 not 710; teenage.engineering 101 not 129.
- **Aesop is now Cloudflare-blocked on every attempt** — all Aesop figures flagged as unconfirmed
  since 2026-08.

**Cut**

Subjective ranking claims that carried no measurement ("the cleanest hero currently shipping", "the
tightest tracking in production", "can be 30px and win", "the extreme of restraint"); "it is the
actual differentiator"; "space says this idea is finished"; "this is what a hand-tuned dark neutral
looks like" — each replaced with the number or mechanism that was doing the work.

**Added**

- `### Stripe's --hds-* system` — the full type-token block.
- `### The html font-size is not 16px on a quarter of these sites` — Rivian 10, The Row 13,
  Locomotive 15, Apple 17, Hello Monday 22, and what that costs.
- `## Where the references disagree` — Stripe's homepage breaking two rules in this file on purpose,
  black vs. full-color logo rows, centered heroes, and the 1,281px-vs-30,873px page-length split.
- `### The self-diagnostic` — 18 numeric thresholds replacing the loose "other failure modes" list,
  plus a specific description of the generated page and three tells that survive a cosmetic fix.
- Probe-technique warnings (computed-style enumeration, don't trust `h1`, read `html` font-size).
- Mobile table rebuilt with basement, Linear, leading deltas, em-tracking, and mobile page heights;
  Stripe and basement added as counterexamples to "leading loosens on mobile".
- States: Oxide's cookie banner as the model, the transparent-nav-over-media problem, the live
  number (Stripe's ticking GDP eyebrow, Hello Monday's `4 days until Monday`), and bot-wall detection.
- Real limits attached to findings 4, 5, 6 and 9, which previously had trivial or missing ones.
