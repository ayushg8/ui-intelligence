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
| **Anthropic** | The cleanest asymmetric editorial hero currently shipping, and it exposes its whole token system | Sans display + **serif body** (`Anthropic Serif` at 20px/1.4), headline left in cols 1–7, deck in cols 9–12 — and **two words underlined** instead of a gradient |
| **Vercel** | The tightest display tracking in production: `-3.84px` on a 64px h1 = **−0.06em** | Line-height exactly `1.0` at 64px on desktop, relaxed to `1.167` at 48px on mobile. Tight leading is a size-conditional decision, not a global one |
| **Stripe** | Real product UI as the hero asset — a working checkout, a fraud table with real numbers | Scroll reveals at **800ms–1s** with `cubic-bezier(0.165,0.84,0.44,1)` and `clip-path`, not 300ms fade-up |
| **Apple** (MacBook Pro) | The vertical-rhythm benchmark: `padding: 144px 0` on every section | Its one gradient headline is a **4-stop desaturated sample of the product's own finish**: `linear-gradient(90deg,#E4F6F0,#9DCFCA 31%,#6B95AC 68%,#45657D)` |
| **Rivian** (R1S) | A 200px wordmark over real cinematography, with 32px CTAs in the opposite corner | Type tokens that bind tracking to size: display `-0.025em`, headline `-0.02em`, body/label `-0.01em`, and `--leading-display: 0.96` |
| **OpenAI** | The hero *is* the product's first interaction — a live composer, not a screenshot of one | Body is **17px/28px (1.647)**, not 16/24. There is no 16px anywhere in the scale |
| **Linear** | Marketing that ships the app's own design language, four sections at `128px` padding | Display weight `510` and `590` — real variable-font axis values, not 500/600 |
| **Aesop** | Proof that a luxury hero headline can be **30px** and win | Headline `30px/39.9px` (lh **1.33**), weight 400, **zero negative tracking**, CTA = a 0-radius outlined rectangle with a hairline arrow |
| **Kinfolk** | Three optical sizes of one bespoke serif: `-Display`, `-Deck`, `-Text` | The hero CTA is two text links with a pipe: `Buy | Read`. No buttons anywhere above the fold |
| **The Row** | The extreme of restraint: a full-bleed 35mm photograph with **no text on it at all** | Body copy at **13px/21.45px (lh 1.65)**. Small type + generous leading reads as expensive; large type + tight leading reads as SaaS |
| **The Pudding** | Editorial cards where the thumbnail is the actual chart, cropped | Per-story flat color mat (`#F5C33C`, `#F19EF5`, `#E88B2E`) instead of one brand color; issue number in an outline pill + `AUG 2026` in mono, above the image |
| **basement.studio** | Display leading **below 1**: 87px/78px = 0.897 | Nav counts as **superscript parentheses** — `Showcase ⁽²⁶⁾`, `Blog ⁽²⁹⁾` — an editorial footnote, not a badge bubble |
| **Locomotive** | `html { font-size: 15px }` — the whole rem scale is rebased | Nav links at 26px, body at 15px: the *navigation* is the display type |
| **Hello Monday** | `h1 { font-size: 80px; line-height: 64px }` = **0.8** | Negative leading as a deliberate device on a single-word headline (`Products`) |
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

### Hero type, measured at 1440

| Site | h1 size / line-height | lh ratio | letter-spacing | weight | family |
|---|---|---|---|---|---|
| Rivian R1S | 200px / 192px | **0.96** | −5px (−0.025em) | 500 | Adventure |
| Resend | 96px / 96px | 1.00 | −0.96px (−0.01em) | 400 | Domaine (serif) |
| basement.studio | 87px / 78px | **0.897** | −3.48px (−0.04em) | 600 | Geist |
| Apple `headline-super` | 80px / 84px | 1.05 | −1.2px (−0.015em) | 600 | SF Pro Display |
| Hello Monday | 80px / 64px | **0.80** | normal | 300 | NB International Pro |
| cosmos.so | 74px / 74px | 1.00 | −3.7px (**−0.05em**) | **350** | cosmosOracle |
| Locomotive | 70px / 77px | 1.10 | normal | 400 | Helvetica Now Display |
| Family | 68px / 74.8px | 1.10 | −1.36px (−0.02em) | 500 | Family |
| Oxide | 65px / 65px | 1.00 | −1.625px (−0.025em) | **400** | Suisse Intl |
| Linear | 64px / 64px | 1.00 | −1.408px (−0.022em) | **510** | Inter Variable |
| Vercel | 64px / 64px | 1.00 | −3.84px (**−0.06em**) | **400** | Geist Sans |
| Anthropic | 60.87px / 66.95px | 1.10 | normal | 700 | Anthropic Sans |
| Kinfolk | 50px / 52px | 1.04 | −0.5px (−0.01em), **uppercase** | 400 | Kinfolk-Serif-Display |
| Stripe | 48px / 55.2px | 1.15 | −0.96px (−0.02em) | **300** | Söhne Var |
| OpenAI (h2) | 48px / 55.68px | 1.16 | −1.44px (−0.03em) | 500 | OpenAI Sans |
| Aesop | 30px / 39.9px | **1.33** | **normal** | 400 | Suisse Intl |

Two things fall out of this table. First: **display weight is almost never bold.** Eleven of sixteen
sit at 300–510. The AI default of `font-bold`/`font-extrabold` at hero size is the single loudest
tell. Second: **line-height at display size clusters at 0.90–1.10, never 1.25.** Tailwind's
`leading-tight` (1.25) is loose for a 64px headline and is what an AI reaches for.

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
| The Pudding | 16px / 22.4px | 1.40 | normal | 400 | Gooper SemiCondensed |
| Locomotive | 15px / 19.5px | 1.30 | normal | 400 | Helvetica Now Display |
| The Row | **13px / 21.45px** | **1.65** | normal | 400 | Basic Commercial |
| Aesop (nav/meta) | 12px / 18px | 1.50 | normal | 400 | Suisse Intl |

Note the inverse relationship: the smaller the body size, the looser the leading. 13px wants 1.65;
20px wants 1.40. AI output uses `text-base leading-relaxed` (16/1.625) everywhere and it reads as
neither.

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
| Apple MacBook Pro | `padding: 144px 0` on every section → **288px** of content-to-content space (two sections use `144px / 216px`) |
| Linear | `padding: 128px 0` per section → **256px**; prefooter uses `margin: 224px 0` |
| Oxide | uniform **128px** gaps, measured nine times in a row: `[128,128,128,129,128,128,128,128,128]` |
| Vercel | `mt-40 @md:mt-52` → **160px mobile / 208px desktop**; one band at `mt-53 mb-53 @md:mt-69 @md:mb-69` = 212/276px |
| Anthropic | `--section-space--main` 88→160px, `--large` 112→224px; spacing is its own empty `g_section_space` divs (measured 91px, 151px, 61px) |

**The AI default is `py-16` / `py-20` — 64 to 80px.** That is 2–4× too tight. A homepage that reads
as premium at 1440 has 128–288px between sections. If you take one number from this file, take this
one.

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
perceptually even. This is what a hand-tuned dark neutral looks like.

**Aesop** — page ground `#FFFEF2`, text `#333333`. A warm off-white, not a gray.

> **The measurable claim.** Premium neutrals run **0–3% HSL saturation**. OpenAI `#5d5d5d` = 0%.
> Vercel `#8f8f8f` = 0%. Anthropic `#5e5d59` = 2.7%. Apple `#86868b` = 2.1%. Tailwind `slate-500`
> `#64748b` = **16.3%**. If your body copy is `text-slate-600` on `bg-slate-50`, the page is
> visibly blue and that blue is 5–8× more saturated than any reference in this file. Note the
> asymmetry: **light grounds skew warm or pure** (`#faf9f5`, `#fffef2`, `#fafafa`), **dark grounds
> skew very slightly blue** (`#08090a`, `oklch(… 260)`). Never the reverse.

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

The radius distribution is bimodal: **0–4px or fully round.** Almost nothing in this reference set
uses 8px or 12px on a button, which is exactly what an AI produces. Rivian's radius scale is
`4 / 12 / 20 / 32 / 40` (`nano/micro/macro/mega`) with no 6 and no 8. Anthropic's is
`0.25 / 0.5 / 1rem / 100vw`.

Also: **button height tracks role, not a single token.** Nav buttons are 30–36px; hero buttons are
40–48px. An AI ships one 44px button everywhere.

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
| Kinfolk | image reveal | `0.5s cubic-bezier(0.25, 1, 0.5, 1)` on opacity (84 elements) |

Two rules fall out. **Hover is 100–320ms; scroll reveal is 500ms–1s.** They are different budgets
and AI collapses both to 300ms. And in all nine sites, the property list on button hover is
`color, background-color, border-color, outline-color` — **not `transform`**. Nothing lifts, scales
or shadows on hover in this entire reference set.

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
both.
*The generic alternative:* `text-6xl font-bold` or `font-extrabold`, sometimes with a gradient on
top, which is the most recognizable single signature of AI marketing output.
*When it does not apply:* when the headline is small (Anthropic's 61px runs 700 because it is being
asked to hold a whole ivory page on its own, and the face is a grotesk with open counters), or when
the page is dense and information-first — Rivian's 200px runs 600 because it's a wordmark, not a
sentence.

**5. The hero asset is a real photograph, a real product screenshot, or a live product — never an
abstract gradient blob.**
Rivian: full-bleed cinematography of two kids at the back of an actual R1S on an actual beach.
Aesop: a narrative film with laundry on a line. The Row: a 35mm-grain photograph with **no text on
it whatsoever**. Stripe: a working checkout with real payment methods and a fraud table showing
`0.06% / 0.02% / 0.08%`. Oxide: a photograph of the rack joined by a leader line to a real console
form (`Instance name: web`, `Image: ubuntu-24.04-noble`, `Memory: 8 GiB`, `CPUs: 2`), captioned
`FIG. 1 OXIDE CLOUD COMPUTER`. OpenAI: a **live composer input** the visitor can type into.
teenage.engineering: a commissioned hand-drawn comic.
*Why it works:* it is the only thing on the page that cannot be reproduced by someone else in an
afternoon. It is the actual differentiator.
*The generic alternative:* a blurred purple-to-pink radial gradient, a floating glassmorphic card,
an isometric illustration of abstract boxes, or a fake dashboard with `Lorem` labels and
`$12,345.67`.
*When it does not apply:* pre-launch pages with nothing to photograph. Then do what Vercel does —
render the brand mark itself at 250px with a real soft shadow and nothing else — or what Anthropic
does, which is show a photograph that is *about* the idea rather than of the product.

**6. Nothing moves on hover.**
Across nine measured sites the hover transition property list is `color, background-color,
border-color, outline-color`. Zero `transform`. Anthropic's primary button goes `#141413 → #3d3d3a`
in 200ms and that is the entire interaction. Apple's is 320ms on color, with a 20ms variant on nav
links so the pointer never feels laggy.
*Why it works:* on a page with 40 links, transform-on-hover means the layout shivers as the cursor
crosses it.
*The generic alternative:* `hover:scale-105 hover:shadow-lg transition-all duration-300` on every
card, which makes a three-card row feel like a trampoline.
*When it does not apply:* a deliberate single hero-level interaction — an agency portfolio thumbnail
that expands on hover, a product card in a shop grid where the image swaps. One per page, not forty.

**7. Scroll choreography is slow, uses clip-path or masks, and reveals content that is already there.**
Stripe: `0.8s cubic-bezier(0.165, 0.84, 0.44, 1)` on `transform` across 46 elements and on
`clip-path` across 12, plus a `1s cubic-bezier(0.16, 1, 0.3, 1)`. Kinfolk: `0.5s
cubic-bezier(0.25, 1, 0.5, 1)` on opacity across 84 elements. Rivian: one `h-[300vh]` sticky section
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
*Why it works:* it is the single cheapest signal of confidence. Space says "this idea is finished".
*The generic alternative:* `py-16` (64px) or `py-20` (80px), which reads as a landing-page template
where every section is the same importance.
*When it does not apply:* content-dense pages — a changelog, a pricing page, a docs index. Linear's
own changelog section on the same homepage sits at zero extra padding because it is a list.

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
system. Rivian's uses 36px pills matching its system. Generated pages ship the vendor default and it
is instantly the ugliest element on the page.

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

---

## Mobile

The archetype does adapt, and the adaptations are measurable. Measured at 390×844:

| Site | Desktop h1 | Mobile h1 | Ratio | Mobile side margin |
|---|---|---|---|---|
| Rivian R1S | 200px / 192px | 96px / 92.16px | 0.48 | 16px |
| Anthropic | 60.87px / 66.95px | 40.29px / 44.32px | 0.66 | **33px** |
| Stripe | 48px / 55.2px | 34px / 35.02px | 0.71 | 16px |
| Vercel | 64px / 64px | 48px / **56px** | 0.75 | 24px |
| Apple | 80px (`headline-super`) | 21px eyebrow / gradient headline scales via clamp | — | 24px |

The rules:

1. **Display type drops to 48–75% of desktop, not 90%.** A `clamp()` whose min is 80% of its max is
   not a responsive type scale, it's a rounding error. Rivian's `clamp(72px, 13.54vi + 26.72px,
   200px)` has a 2.8× range.
2. **Line-height goes *up* as size comes down.** Vercel: 1.0 → 1.167. Anthropic holds 1.10 → 1.10 but its
   hero deck stays at **24px/33.6px on both breakpoints** while the headline drops 60.87→40.29px, so
   headline-to-deck contrast compresses from **2.54× to 1.68×**. That is correct: a 12× contrast
   ratio (Rivian's 200px/16px) is unreadable on a 390px screen, and Rivian resolves it the same way
   by dropping to 96px.
3. **Left alignment survives.** Anthropic's four-line mobile headline stays left-aligned at
   `X: 33px`. Do not center on mobile because "it looks balanced" — you lose the ragged right edge
   that makes it read as editorial.
4. **Side margins are 16–33px, and they are not the desktop margin scaled.** Anthropic's is
   `clamp(2rem, …, 5rem)` = 32px mobile, 80px desktop — a 2.5× range, not proportional.
5. **Buttons go full-width or stay small; nothing in between.** Stripe's mobile CTA is `W: 358px` on
   a 390px viewport (full-bleed minus 16px margins) at 44px tall. Vercel's is 342px at 40px.
   Rivian's stays 40px tall at pill radius. A 60%-width centered button is the generic answer.
6. **Where it admits it shouldn't adapt:** Oxide's engineering-drawing hero (leader line joining a
   console form to a rack photo) cannot work at 390px, and Oxide doesn't try — mobile gets the
   photograph and the headline, the diagram is dropped. basement.studio's explorable 3D scene is
   likewise desktop-only. If your signature move is a two-object spatial relationship, ship a
   different mobile hero rather than a squashed one.
7. **teenage.engineering's answer** is a second set of vw ratios: `--fs-20` goes from
   `0.0183673 × 100vw` to `0.00918367 × 100vw`, and `--tile-border-radius` goes from
   `0.0255102 × 100vw` to **0**. Radii and paddings that are proportional on desktop are often
   correct at zero on mobile.

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
*Wrong because:* I checked all eight of the primary references for `linear-gradient` or
`-webkit-text-fill-color: transparent` on `h1`/`h2` and got **zero hits**. Apple has exactly one
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
*Instead:* Vercel renders seven logos in **true black at their real proportions** (Charles Schwab's
serif lockup next to DoorDash's script next to Supreme's Futura) on the fold line, sized by optical
weight rather than to a uniform box. Oxide labels its row `POWERING THE BEST TEAMS` in mono
uppercase and **crops the leftmost logo off the edge**, which reads as a selection from many.

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

### The other failure modes

- **Every section is the same height and the same treatment.** The single strongest structural
  signal of a template. Apple's variance is 525px → 7,329px. Yours should not be 800px × 8.
- **Every radius is 8px or 12px.** The reference set is bimodal: 0–4px (Stripe 4, Oxide 2, Aesop 0,
  The Row 0, Kinfolk 2, Vercel nav 6) or fully round. 8px on everything is the shadcn default.
- **Shadows are visible.** Vercel's heaviest shadow token peaks at 6% black. If you can see the
  shadow as a gray area rather than as an edge, it's 3× too strong.
- **`transition-all duration-300` and `hover:scale-105`.** Nine measured sites, zero `transform` on
  button hover.
- **Blue-gray neutrals.** `slate-500` is 16.3% saturated; every premium neutral measured here is
  0–3%.
- **One body size for the whole page.** OpenAI runs 17px for prose and 14px for meta, cta, caption
  and nav — five roles at one size, prose at another. AI runs `text-base` and `text-sm` by accident
  rather than by rule.
- **Copy that could belong to any company.** See below.
- **Icons doing no work.** An outlined 24px icon above every card title, chosen because the card
  needed something at the top.
- **Every heading centered with `mx-auto`.** Stripe varies its heading measure by column span
  (856 / 752 / 648px) section to section; a single `max-w-3xl` ribbon is the tell.

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

- **stripe.com** — 1440 + 390 screenshots and computed styles. Hero 48px/55.2px/−0.96px/w300;
  section titles constrained to `span-8/7/6` (856/752/648px); scroll reveals at 0.8s
  `cubic-bezier(0.165,0.84,0.44,1)` on transform and clip-path; bento cards containing a live
  checkout and a fraud table with real percentages. **Zero CSS custom properties on `:root`.**
- **linear.app** — 64px/64px/−1.408px at weight **510**; four homepage sections at `padding: 128px 0`
  measuring 1220–1232px tall; prefooter at `margin: 224px 0`; hover at 0.1–0.16s
  `cubic-bezier(0.25,0.46,0.45,0.94)`.
- **vercel.com** — 984 CSS custom properties enumerated: full `--ds-gray-*` light and dark ramps,
  `--ds-shadow-*` (peak alpha 6%), `--ds-focus-ring` gap ring, `--ds-page-width: 1400px`, fluid type
  tokens `--text-fluid-64-128`. h1 64/64/−3.84px = −0.06em. Three-column hero, black logo cloud.
- **anthropic.com** — 283 tokens: complete ivory/slate/cloud palette, six named section-space steps,
  12-col 89.5rem grid, six line-height values, three letter-spacing values, per-font leading-trim
  ems, nav timings. Asymmetric hero with two underlined words; sans display + serif body.
- **openai.com** — 1,157 tokens (required a 15s wait past a Cloudflare interstitial): 13-step pure
  neutral primitive ramp, dark mode by token remap, `--type-p1-size: 1.0625rem` (17px), clamp-based
  h1/h2/xl. Hero is a live composer with five hairline pill chips.
- **apple.com/macbook-pro** — 288 tokens (`--sk-*` glyph/fill grays with alpha pairs, footnote size
  tokens, 12-col `ric-column-*` at 7.29157vw). `.typography-headline-super` = 80px/84px/−1.2px/w600;
  every section `padding: 144px 0`; 30,873px page with 14 sections from 525px to 7,329px; the
  4-stop desaturated gradient headline; 980px content column; `0.32s cubic-bezier(0.4,0,0.6,1)`.
- **rivian.com/r1s** — 710 tokens: full 13-step px type scale, `--leading-display: 0.96`, four
  tracking tokens bound to role, `-cq` container-query type mirror, `4/12/20/32/40` radius scale,
  physically-named easings. 200px hero wordmark over autoplay film; 96px at 390px.
- **aesop.com/us** — computed styles captured on the one request that cleared Cloudflare (15s wait);
  screenshot captured on a second attempt with an 18s wait. Ground `#FFFEF2`; hero headline
  30px/39.9px/normal/w400; 48px 0-radius outlined CTA; centered nav wordmark with two link rows at
  12px.
- **kinfolk.com** — three optical serif cuts; 50px/52px uppercase hero; body 20px/30px serif;
  `Buy | Read` text-link CTA; 0.5s `cubic-bezier(0.25,1,0.5,1)` opacity reveals across 84 elements.
- **pudding.cool** — Gooper SemiCondensed at 32px/32px/−0.8px; per-story flat color mats
  (`#F5C33C`, `#F19EF5`, `#E88B2E`); outline-pill issue numbers with mono dates above the image;
  2px button radius; 1280px container.
- **basement.studio** — 87px/78px (lh 0.897) at −0.04em; superscript-parenthesis nav counts; live
  `● Online ⁽¹⁰⁾` indicator; explorable 3D scene hero; HUMAN/MACHINE segmented toggle.
- **locomotive.ca** — `html { font-size: 15px }`; h1 70px/77px with no tracking adjustment; nav
  links at 26px against 15px body.
- **hellomonday.com** — `h1 { 80px / 64px }` (lh 0.8) at weight 300; h3 23px/27.37px at weight 300.
- **teenage.engineering** *(off-list)* — 129 tokens, all proportional to `--client-width: 100vw`
  against `--base-design-width: 980`; two font families, two weights (100/300); five fixed accents;
  `--btn-min-click-area: 48px` as the sole absolute; nav-as-sitemap with a Japanese mission
  paragraph at ~10px.
- **oxide.computer** *(off-list)* — 479 tokens, entire palette in `oklch()`; h1 65px/65px/−1.625px
  at weight 400; body 16px/22px with **+0.021em** tracking; 12px uppercase 2px-radius buttons;
  `FIG. 1` hero caption with a leader line to a real console form; nine consecutive 128px section
  gaps.
- **therow.com** *(SSENSE substitute)* — body 13px/21.45px (lh 1.65) Basic Commercial; 11px 0-radius
  buttons; full-bleed 35mm hero photograph with no overlaid text.
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
