# Typography for interfaces

**Evaluated:** 2026-09

**Measured 2026-09-10, Chromium 148 headless, 1440×900.** Every number came from a live page's
computed styles, a DOM measurement of a rendered string, or a canvas `TextMetrics` probe against
the font file that product serves. Claims marked *Observed* were looked at, not measured.

Values re-probed in the 2026-09 direction pass are marked **[re-probed]**; corrections are listed
at the end of the file.

---

## If you only apply five things

1. **Ship `(size, line-height, weight, role)` as one token, never a bare size.** Vercel's Geist
   uses `16px` in four roles with three different line-heights: `copy-16` is 16/24 w400,
   `label-16` is 16/20 w400, `heading-16` is 16/24 w600 at `-0.02em`, `button-16` is 16/20 w500.
   A "type scale" that is a list of sizes is not a type scale.
2. **Two body sizes, chosen by task, not one.** One for reading (15–16px, line-height 1.5–1.7),
   one for scanning (13–14px, line-height 1.4–1.45). Stripe runs 16/26 prose and a 13px dense
   layer on the same page — 1,248 elements on their quickstart compute to 13px and 128 to 16px.
3. **Never leave `line-height: normal` on anything you control.** Measured per 100px of font-size,
   the natural line box is 121 in Inter, 118 in SF Pro, 115 in Arial/Roboto/Segoe UI, 114 in
   Georgia, 122 in Verdana. Swapping the font silently changes every row height by up to 7%.
4. **`font-variant-numeric: tabular-nums` on numbers that stack in a column or update in place.**
   Measured in Inter: ten `1`s are 362.31px where ten `0`s are 613.28px — the `1` is **41%
   narrower**, so nothing in a right-aligned money column lines up until you say otherwise, and a
   counter reflows on every tick. **Not** on a lone display number with no alignment partner and no
   updates — it costs width for nothing (see the width budget under *Numerals*).
5. **Three neutral text levels, and the third lands between 4.5:1 and 8:1.** Measured today:
   Vercel 17.2 / 8.1 / 5.5, Atlassian 14.3 / 7.8 / 5.1, Primer 15.8 / 6.1, Radix 16.4 / 5.9,
   Resend 15.3 / 10.7 / 8.2 / 5.0, Linear (dark) 18.7 / 13.6 / 6.1. No product here ships a fourth
   *content* level. If you want a fourth distinction, change size or weight.

---

# The measured reference table

## 1. Real type scales, read off live products

`size/line-height` in px · `w` = computed weight · `ls` = letter-spacing converted to em ·
`ffs` = `font-feature-settings` as computed · `fvs` = `font-variation-settings`.

| Product / surface | Display / h1 | h2 | h3 | Prose body | Dense UI | Micro | Inline code | Face + features |
|---|---|---|---|---|---|---|---|---|
| **Linear** marketing **[re-probed]** | 64/64 w510 `-0.022` | 48/48 w510 `-0.022` in `#8A8F98` | 20/26.6 w590 `-0.012` | 15/24 w400 `-0.011` | **12 is the densest layer (187 els)** · 14 (180) · 13 (129) | 10 | 12/20 Berkeley Mono `-0.0152` | Inter Variable, `ffs "cv01","ss03"` |
| **Linear** docs (dark) † | 32/36 w590 `-0.022` | 24/31.9 w590 | 20/32 w590 | 15/24 w400 `-0.011` | 14/21 w510 | 13/19.5 | — | same |
| **Vercel** docs **[re-probed]** | 56/56 w600 `-0.06` balance | 24/32 w600 `-0.04` | **14/20 w500 ls 0** in `#4D4D4D` | 16/27.2 w400 pretty, 809px | 14/20 (668 els) · 13 (71) | 12, 11 | 14/20 w500 `-0.02` Geist Mono | Geist, `ffs "calt" 0,"rlig","ss11"` |
| **Stripe** quickstart **[re-probed]** | 32/**normal** w700 `0` pretty | 21/normal w700 | 16/24 w600 | 16/26 w400, 486px | **13 is the densest layer (147 els)** · 16 (126) · 14 (68) · 12 (38) | 11 | **14/20 Menlo** | `-apple-system` — no UI webfont; `text-wrap: pretty` globally |
| **Notion** help | 54/56 w700 `-0.035` balance | 32/40 w700 `-0.023` | — | 16/24 w400 pretty | 15 · 14/20 w400 | 12 | iA Writer Mono | NotionInter (static 400/500/600/700), `ffs "lnum","locl" 0` |
| **Attio** | 64/60.8 (**lh 0.95**) w600 `-0.02` Inter *Display* | 40/44 w500 `-0.01` Display | 24/27.6 w500 `-0.01` Display | 16/22 **w500** `-0.01` | 14 (256 els) · 12 | 10/15 w500 `-0.016` JetBrains Mono | 13/20 **w300** JetBrains Mono | Inter + Inter Display, `ffs "ss03"` |
| **Radix Themes** docs **[re-probed]** | 35/40 w700 `-0.02` | 24/30 w700 `-0.0125` | 18/24 w700 `-0.005` | 16/24 w400 | 14/20 (126 els) · **13.3 (287 els)** | 12.635 (35 els) | 14.44/18.05 `-0.007` Söhne Mono | Untitled Sans + Söhne Mono, smoothing `auto` |
| **Atlassian** design | 48/52 w700 | 24/28 w700 | 16/20 **w653** | 14/20 w400 (site-wide) | 14/20 (205 els) | 12/16 | 12.25/20 Atlassian Mono | Atlassian Sans VF (100–900) |
| **GitHub Primer** | 40/48 **w460** balance | 24/36 w700 | 12/18 w600 | 16/24 w400 | 14/21 w500–600 | 12 | 13.6/20.4 | Mona Sans VF; UI text falls back to `-apple-system` |
| **Supabase** docs **[re-probed]** | 34/37.8 w600 **Manrope** | 22/29.3 w600 Manrope | 18/28 w600 Manrope | 15/28 **w500** Inter, 706px (~73ch) | 13 · 14 | 12 | — | Inter body + Manrope headings; buttons **w450** |
| **Resend** docs | 36/40 w600 `-0.025` | — | 14/20 w700 | 16/24 w400 | 14/20 (45 els) | 12 | Paper Mono | Inter, `ffs "cv02","cv03","cv04","cv11"` |
| **Raycast** | 64/70.4 w600 `0`, `ffs "liga" 0,"ss02","ss08"` | 20/normal w500 **`+0.010`** | 24/38.4 w500 `+0.008` | 18 w400 **`+0.011`** balance | 14 · 13 · table 12/13.8 `+0.008` | 12/19.2 Geist Mono `+0.017` | — | Inter; body `ffs "calt","kern","liga","ss03"` — **display and body use different feature sets** |
| **Cursor** docs | 33.75/40.5 **w400** `-0.02` balance | 18/18 w700 | — | 15/24.4 w400 **`+0.005`** | 14/20 w400 | th 12/16 w400 | Berkeley Mono | cursorSans, `ffs "calt","case","kern","liga"` |
| **Zed** | 48/57.6 **w340** `-0.02` IBM Plex Serif balance | 25.6/32 w390 Serif | 16.8/18.5 w400 | 16/24 w400 `-0.025` | **12px is the densest layer (990 els)** | 10, 9 | 12/16 zedMono | custom "writer" + Plex Serif; mono fallback `size-adjust: 131.49%` |
| **Warp** | 56/58.8 w500 `-0.036` **in matterMono** | 34/56.1 w500 **`-0.059`** mono | 16/21.6 w600 mono | 13/21.45 w500 **mono** | 12 · 11 · 10.5 | 9 | 10.5/17.85 | Matter Mono for the entire site |
| **Modal** | 64/64 w500 `0` (Goga) | 54/59.4 w400 | 30/36 w400 `-0.012` | 16/24 w400 **`+0.010`** | 16/24 w500 **`-0.0225`** (nav) | 14, 12 | — | Goga display + Inter Variable `ffs "cv11"` |
| **Framer** | 54/54 w500 `-0.04` GT Walsheim `ffs "ss02"` | 44/48.4 w500 `-0.04` | 18/24.3 w400 `-0.011` | 18/24.3 `-0.011` balance | 14 (113 els) · 13 (93) · 12 (205) | 10, 9, 7 | 14/18.2 JetBrains Mono | Inter Variable, **`fvs "opsz" 18, "wght" 440`**, `ffs "cv01","cv05","cv09","cv11","ss03"` |
| **GitBook** | 45/45 `-0.02` — computed `w700` but **`fvs "wght" 500` wins** | 32/38.4 `-0.02` | 20/26 `-0.02` | 18/28.8 w500 `-0.01` | 14/14 w500 `-0.02` | 12, 11 | — | General Sans Variable |
| **Intercom** | 80/80 **w400** `-0.03` Saans | 24/24 **w400** `-0.02` | 20/24 w400 `-0.01` | 16/22.4 **w300 serif** `-0.01` balance | 14 (93 els) | 12 (33 els) | DM Mono | Saans + Ivory serif — every heading at w400 |
| **Mercury** | 49.3/54.3 **w480** balance | 42/48.3 w480 **`+0.010`** | 16/24 w400 | 16/24 | 16/16 **w420** (nav) | 12/16.8 **`+0.020`** | — | Arcadia (360–500) + Arcadia Display (320–480), `font-display: optional` |
| **Plaid** | 76/85.1 w500 `-0.045` | 20/22 w600 `-0.02` | 26/36.4 w500 `-0.019` | 16/24 w400 pretty | 14 · 13 | 10 (322 els) | Inconsolata 16/24 | Plaid Sans display + Cern text |
| **Wise** | 89.1/75.8 (**lh 0.85**) w900 Wise Sans balance | 58.5/49.7 w900 | — | 18/26 w400 `-0.006` | 16, 14 | — | — | Inter `ffs "calt"` + Wise Sans display |
| **Material 3** docs | 96/96 **w475** | 28/36 w475 | 24/32 w475 | 16/24 w400 | 14, 12 | 11 | Google Sans Mono | Google Sans, **`fvs "GRAD" 0, "opsz" 17/18`** |
| **PostHog** docs | 36/45 w700 | 14/20 w700 **`+0.025`** | 14/17.5 w700 | 16/24 **w500**, `fvn proportional-nums` | 13 (37 els) | 10 | Source Code Pro | RoundHog |
| **Shopify** dev | 32/40 w600 `0` | — | 12/16 w600 `+0.002` | 16/24 w400 (~80ch) | 14/20 (72 els) | 12 | — | Inter, no feature settings, `font-smoothing: auto` |

† carried over from the 2026-09 pass; that URL now 404s and I could not re-measure it today.

Where a product's h2 looks wrong (Resend's 16px w700 h2, Vercel's 14px w500 h3) a component reused
the tag. That is the lesson: **heading level and type style are independent in every one of these
products.** Element counts are of visible elements holding a direct text node, at 1440×900 — a
different counting rule gives different totals, so compare ranks, not absolute counts.

## 2. Published token scales, from the systems that publish them

**Geist (Vercel)** — the only public scale I found that names roles *and* their usage:

```
heading-72 72/72 −0.06   heading-64 64/64 −0.06   heading-56 56/56 −0.06
heading-48 48/56 −0.06   heading-40 40/48 −0.06   heading-32 32/40 −0.04
heading-24 24/32 −0.04   heading-20 20/26 −0.02   heading-16 16/24 −0.02
heading-14 14/20 −0.02                                         (all w600)

copy-24 24/36   copy-20 20/30   copy-18 18/28   copy-16 16/24   copy-14 14/20
copy-13 13/18   copy-13-mono 13/18                             (all w400, ls 0)

label-20 20/32  label-18 18/20  label-16 16/20  label-14 14/20  label-13 13/16
label-12 12/16  label-14-mono 14/20  label-13-mono 13/20  label-12-mono 12/16  (w400, ls 0)

button-16 16/20  button-14 14/20  button-12 12/16                (w500, ls 0)
```

Vercel's own usage notes are the useful part: `label-14` — *"most common text style of all"*;
`copy-14` — *"most commonly used"*; `label-13` — *"tabular is used when conveying numbers"*;
`button-12` — *"only used when a tiny button is placed inside an input field."* Their default UI
text is 14, not 16.

**Radix Themes** — nine steps, publishing letter-spacing per step:

| Step | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| Size | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 35 | 60 |
| Line-height | 16 | 20 | 24 | 26 | 28 | 30 | 36 | 40 | 60 |
| Tracking | **+0.0025** | 0 | 0 | −0.0025 | −0.005 | −0.00625 | −0.0075 | −0.01 | −0.025 |

Weights 300 / 400 / 500 / 700. Default stack: system fonts, no webfont.

**Atlassian** — note the separate `font.metric.*` role for numbers:

```
heading  xxl 32/36  xl 28/32  l 24/28  m 20/24  s 16/20  xs 14/20  xxs 12/16   (all Bold)
body     large 16/24 (¶ spacing 16)   default 14/20 (¶ 12)   small 12/16 (¶ 8)  (Regular)
metric   large 28/32   medium 24/28   small 16/20                                (Bold)
code     12/20
```

**GitHub Primer** —

```
text-size    xs 12   sm 14   md 16   lg 20   xl 32   2xl 40
line-height  tight 1.25   snug 1.375   normal 1.5   relaxed 1.625   loose 1.75
weight       light 300   normal 400   medium 500   semibold 600
```

Nothing at 24 or 28 in the token set, yet their rendered pages use 24 from another layer. If you
publish a scale, grep your own build for sizes it does not contain.

## 3. What each face actually costs you, at real UI size **[re-probed]**

Same string, same DOM, `400 14px`, `font-optical-sizing` at its default. This is the comparison
that matters; a 100px canvas comparison misleads because SF Pro and Inter both switch optical cuts
above ~20px.

| Face | "The quick brown fox…" @14px | vs `system-ui` | x-height @14px | Loaded from |
|---|---|---|---|---|
| Inter (rsms build and Google build both) | **297.34px** | **+3.3%** | **7.64** | linear.app, supabase.com |
| Mona Sans | 289.09 | +0.4% | 7.37 | primer.style |
| Untitled Sans | 288.63 | +0.2% | 7.18 | radix-ui.com |
| `system-ui` (SF Pro Text) | 287.97 | — | 7.37 | — |
| Geist Sans | 284.84 | **−1.1%** | 7.42 | vercel.com |
| Manrope | 282.22 | −2.0% | 7.56 | supabase.com |
| Helvetica / Arial | 277.03 | −3.8% | 7.32 / 7.26 | local |
| Saans | 273.33 | −5.1% | 7.27 | intercom.com |
| Inter **Display** | 269.48 | −6.4% | 7.22 | attio.com |
| Geist Mono · Berkeley Mono · Söhne Mono (identical 0.6em advance) | 361.20 | **+25.4%** | 7.42 / 7.25 / 7.32 | vercel.com, linear.app, radix-ui.com |
| Menlo | 362.44 | +25.9% | 7.66 | local |

**What this decides:**

- Measure faces at the size you will ship them. **Geist is 1% narrower than SF Pro at 14px**, Inter
  is 3.3% wider; a 100px comparison of the same two faces inverts the result, because SF Pro and
  Inter both switch to a display cut above ~20px.
- Inter is the widest mainstream UI grotesque *and* has the tallest x-height (7.64 at 14px, 3.7%
  taller than SF). That combination is why Inter "looks big": at a nominal 14px it occupies more
  space in both directions than the system font your mock was drawn against.
- **Every mono webfont in the sample has an identical 0.6em advance** — Geist Mono, Berkeley Mono,
  Söhne Mono and JetBrains Mono all measure exactly 60.00 units per glyph per 100px; Menlo, the
  system mono, is 60.21. Mono is not "a bit wider": it is a flat 25–26% wider than the sans at the
  same px, permanently. Budget for it before you pick a mono, not after.
- Mono's x-height matches its sans partner almost exactly (Geist Sans 7.42 / Geist Mono 7.42), so
  mono does **not** look bigger than a good grotesque at the same size — it looks *wider*. Against
  the system stack it does look slightly bigger (Menlo 7.66 vs SF 7.37, +4%).

## 4. Text colour hierarchy, computed against the real background

| Product | L1 | L2 | L3 | L4 (non-content) |
|---|---|---|---|---|
| Vercel docs (light) | `#171717` **17.2:1** | `#4D4D4D` **8.1:1** | `#666666` **5.5:1** | `#7D7D7D` 3.9:1 — placeholders only |
| Atlassian (light) | `#292A2E` **14.3:1** | `#505258` **7.8:1** | `#6B6E76` **5.1:1** | — |
| Primer / GitHub (light) | `#1F2328` **15.8:1** | `#59636E` **6.1:1** | — | link `#0969DA` 5.2:1 |
| Radix Themes (light) | `#1C2024` **16.4:1** | `rgba(0,7,20,.624)` **5.9:1** | — | code link `rgba(0,43,183,.773)` 6.0:1 |
| Resend docs (light) | `#252525` **15.3:1** | `#3E3E3E` **10.7:1** | `#4F4F4F` **8.2:1** | `#6F6F6F` 5.0:1 |
| Linear (dark, `#08090A`) | `#F7F8F8` **18.7:1** | `#D0D6E0` **13.6:1** | `#8A8F98` **6.1:1** | `#62666D` 3.3:1 — icons/chrome |
| Mercury (dark, `#171721`) | `#EDEDF3` **15.3:1** | `#C3C3CC` **10.2:1** | — | — |
| Notion (light) | `rgba(0,0,0,.95)` **19.4:1** | `rgba(0,0,0,.898)` **17.4:1** | `rgba(0,0,0,.54)` **4.6:1** † | — |

The shape holds in light and dark: **15–19 : 6–10 : 4.5–6**. Alpha ladders (Notion, Radix) exist
because those products put text on coloured callouts and cards, where a hex grey goes wrong;
hex ladders (Vercel, GitHub, Atlassian) exist because the exact contrast number is easier to
govern. Pick by whether you have coloured surfaces.

## 5. CSS behaviour, verified in Chromium today

| Feature | Supported? | Measured behaviour |
|---|---|---|
| `text-wrap: balance` **[re-probed]** | yes, ≤6 lines | Balanced every block from 2 to **6** lines (6-line case `[403,416,414,417,405,353]` → `[403,416,386,395,403,404]`). **No effect at 8+ lines.** The cliff sits between 6 and 8, so a 6-line block and an 8-line block behave differently. |
| `text-wrap: pretty` **[re-probed]** | yes | Did **not** change a 4-line paragraph (`[403,139]` both ways). It *did* fix a 3-line orphan: `[298,235,95]` → `[235,246,147]`. It suppresses orphans; it is not a balancer. |
| `text-box: trim-both cap alphabetic` **[re-probed]** | yes | 32px/1.2 Inter: **38.39px → 23.28px**. It clips the box to cap-top/baseline; ink outside that band (accents, descenders, emoji, non-Latin) now paints **7.72px above and 8px below** the element box. |
| `line-clamp: 2` (unprefixed) **[re-probed]** | **still no effect** | `CSS.supports('line-clamp','2')` false in Chromium 148; height unchanged at 80px with or without `overflow:hidden`. The `-webkit-box` version clamped to 40px. |
| `hanging-punctuation` | **not supported** | `CSS.supports` false. Safari-only; do not rely on it. |
| `font-optical-sizing: auto` | yes | On Inter Variable: 14px → `opsz 14`, 64px → `opsz 32`, verified by width. |
| `font-size-adjust` | yes | Available for fallback matching. |
| `text-spacing-trim`, `text-autospace` | parse, no effect | Report as supported; produced no width change on my CJK sample. Treat as not yet useful. |
| `font-kerning: none` vs `ffs "kern" 0` | identical | Byte-identical widths. They are the same switch. |

---

# Choosing a typeface

## "Inter by default" is the tell — and character variants are not the fix

Nine of the ~25 products I measured run Inter or an Inter fork, and **seven of the nine change its
feature settings**: Linear `cv01, ss03`; Resend `cv02, cv03, cv04, cv11`; Raycast `calt, kern,
liga, ss03` for body and a *different* set (`liga 0, ss02, ss08`) for display; Attio `ss03`; Modal
`cv11`; Framer `cv01, cv05, cv09, cv11, ss03`; Wise `calt`; Notion's fork `lnum, locl 0`. Supabase
and Shopify ship it raw.

So the folklore is right that everyone tunes Inter. But I measured what tuning buys, rendering
`1 4 6 9 3 a l g t I ß G 0` at 40px in InterVariable:

| Feature | Width | Δ vs default |
|---|---|---|
| default | 379.97px | — |
| `"cv01"` (alternate 1) | 379.92 | −0.01% |
| `"cv02"` (open 4) | 379.97 | 0 |
| `"ss03"` (round quotes/commas) | 379.97 | 0 |
| `"zero"` (slashed zero) | 379.97 | 0 |
| `"cv11"` (single-storey a) | 381.92 | **+0.5%** |
| `"ss02"` (disambiguation set) | 386.02 | **+1.6%** |

Character variants swap individual glyph shapes, and only `cv11` and `ss02` move enough metal to
change the texture of a paragraph. **Adding `"cv02","cv03","cv04"` to Inter
does not stop your product looking like every other product using Inter.** It changes four glyphs
most of your strings do not contain. If Inter's neutrality is the problem, the fix is a different
family, a Display cut for headings, or a serif partner — not a feature string.

**When Inter is genuinely right:**

- A dense tool where legibility at 12–14px beats personality.
- You need free, variable, a real `opsz` axis, and Latin + Greek + Cyrillic + Vietnamese in one
  file. Almost nothing else offers all four.
- You are pairing it *under* a display face — GitBook runs General Sans over it, Supabase runs
  Manrope over it, Modal runs Goga over it. Inter is an excellent supporting actor.

**When it is wrong:** consumer products where warmth is the job; anything that must be recognisable
in a screenshot; anywhere a Display cut matters and you cannot load two files.

## The grotesques, by what they actually do

Measured where I could load the real file from a site licensing it; observed otherwise.

**Inter** — x-height 7.64 @14px (tallest here), +3.3% wider than SF, real `opsz` axis, 13
character variants. It carries no brand signal, which is why it disappears into a dense tool and
why it dates a marketing page to whoever generated it.

**Geist** (Vercel, OFL, free) — 284.84px @14px, **narrower than SF Pro**, x-height 7.42, ships
`calt 0` from the vendor. Engineered rather than drawn: flat terminals, closed apertures. Shares
cap height and x-height *exactly* with Geist Mono, so a mono cell and a sans cell in one table sit
on the same optical line. Choose it for infrastructure; its closed apertures read cold in anything
consumer.

**Untitled Sans** (Klim, commercial) — 288.63px @14px, x-height 7.18, the lowest in the sample.
Radix Themes runs it at w700 for every heading, which works because its bold is compact. The low
x-height means it wants 15–16px where Inter is happy at 14; budget one size step up for body.

**Söhne / Söhne Mono** (Klim, commercial) — I could only load the mono (0.6em advance, x-height
7.32). Söhne is a Neue Haas Grotesk redraw with more stroke contrast than Inter; that contrast
reads as competence at 16px+ and vanishes at 12px. Do not pay for it for a 12px UI.

**Suisse Int'l** (Swiss Typefaces, commercial) — rationalist, ships an unusual 450 weight. Right
for developer infrastructure that wants to look like a design object; wrong anywhere the product
has to feel friendly. *Observed.*

**Mona Sans** (GitHub, OFL, free) — 289.09px @14px, weight **and** width axes, and the only face I
measured actually responding to optical sizing at UI size (289.09 with `auto` vs 293.36 with
`none`). GitHub uses it from 12px table rows to 96px marketing, so one file covers the whole range.

**Manrope** (free) — 282.22px @14px with a 7.56 x-height: narrow *and* tall, which is why Supabase
can set headings in it over an Inter body without the two fighting.

**Saans** (Displaay, commercial) — 273.33px @14px, **5.1% narrower than SF** at a normal x-height.
Intercom sets every heading in it at w400 up to 80px. If your headline is long and your column
fixed, this is the kind of face that solves it.

**ABC Diatype** (Dinamo, commercial) — squared curves, large apertures, mono-derived. Loud enough
to fight dense data; belongs on marketing and in low-density tools. *Observed.*

**Basis Grotesque** (Colophon, commercial) — visible hand in the `a`, `g`, `t`; editorial and
independent. Will not survive a 13px table row — the personality collapses into noise. *Observed.*

**Aeonik** (CoType, commercial) — geometric, wide, nearly circular `o`. Dominant in 2021–2024
startup branding, which now dates a product to that period. *Observed.*

**Instrument Sans** (OFL, free) — has a real width axis, so you can genuinely condense a nav label
instead of tracking it in. Under-used. *Observed.*

**General Sans** (ITF, free tier) — geometric-humanist, single-storey `g`, softer than Inter.
GitBook runs it as display over a neutral body. Reasonable free alternative when Inter's neutrality
is the problem.

**Custom and commissioned** — Notion (NotionInter), Cursor (cursorSans, 400/700 only), Mercury
(Arcadia + Arcadia Display), Intercom (Saans + Ivory), Zed ("writer" + Plex Serif), Plaid (Plaid
Sans display + Cern text), PostHog (RoundHog), Warp (Matter + Matter Mono), Atlassian (Atlassian
Sans + Mono), GitHub (Mona Sans + Hubot Sans), Google (Google Sans + Google Sans Text).

The pattern worth stealing is not "commission a font." It is that **nearly every one ships a
display cut and a text cut of the same design.** Measured: Inter Display is 6.4% narrower than
Inter Text at 14px; Mercury's Arcadia Display is 7.3% narrower than Arcadia Text. That difference —
tighter fitting, thinner joins, less ink — is exactly what you are missing when you scale one file
from 14px to 64px and hand-track it back.

## System font stacks: when they beat a webfont

Stripe's documentation still ships **no webfont for UI text**: `-apple-system, "system-ui", "Segoe UI", Roboto, …`, with Menlo and Source Code Pro for
code. Radix Themes ships the same by default. Both are right for their context.

Use the system stack when:

- **Text is dense and small.** SF Pro and Segoe are hinted and optically sized by their own OS at
  11–14px in a way no webfont is. At 13px in a table, SF beats Inter on rendering.
- **You cannot tolerate FOUT/CLS**, or you are shipping an OS-adjacent surface (Electron settings,
  a menu-bar app, an admin panel).
- **The product is a utility** and nobody chose it for the letterforms.

Do not use it when:

- The design depends on identical line breaks across platforms. SF, Segoe UI and Roboto differ in
  width; a two-line button on macOS is three lines on Windows.
- You need one recognisable look — `system-ui` is at least three different fonts.
- You need reliable tabular figures; digit metrics differ per platform.

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, "Noto Sans", sans-serif,
             "Apple Color Emoji", "Segoe UI Emoji";
```

`-apple-system` before `system-ui` because older Safari resolved bare `system-ui` to the wrong
face. Emoji families last so they only catch emoji codepoints.

---

# Variable fonts, optical sizing, and the two traps

**1. Variable weight is for the half-step, not for a rainbow.** Same string in Inter Variable at
100px: w300 1888.02 · w400 1937.17 · w450 1955.13 · **w500 1973.11** · w510 1976.69 · w550 1991.06 ·
**w590 2005.44** · w600 2009.05 · w700 2044.98 — about 0.37% of width per 50 weight units. This is
why Linear ships 510 and 590, Supabase 450, Primer 460, Material 475, and Atlassian's h3 computes
to **653**. Each is "500 was too light and 600 too heavy," which is the only good reason.

**2. `opsz` is a real redraw and it is already on.** Measured on Inter Variable, same pangram at
100px:

| `font-variation-settings` | Width |
|---|---|
| `"opsz" 14` (text cut) | 2123.89px |
| `"opsz" 20` | 2061.66 |
| `"opsz" 28` | 1978.66 |
| `"opsz" 32` (display cut) | **1937.17** |

**9.6% narrower** across the axis at the same nominal size and weight. `font-optical-sizing: auto`
is the CSS *initial* value, so this already happens: verified, `auto` at 14px measured exactly the
`opsz 14` width and `auto` at 64px exactly the `opsz 32` width.

The trap is the reverse of what people assume: **you do not need to switch it on, you need to check
the file carries the axis.** Static Inter (Google's static files, Notion's NotionInter, Cursor's
two-weight cursorSans) has no axis, so a 64px headline is the 14px drawing blown up and you *do*
have to hand-track it. Verify in one line:

```js
// If these are equal, there is no axis and font-optical-sizing is dead CSS.
measure('font-variation-settings:"opsz" 14') === measure('font-variation-settings:"opsz" 32')
```

Framer pins it explicitly — `font-variation-settings: "opsz" 18, "wght" 440` on 18px body — which
is the belt-and-braces version, and also the third trap:

**3. `font-variation-settings: "wght"` silently beats `font-weight`.** Measured on gitbook.com:
their h1 computes `font-weight: 700` *and* `font-variation-settings: "wght" 500`, and renders at
500. If you set `wght` in `fvs`, every `font-weight`, every `<strong>` and every hover weight change
in that subtree stops working. Use `font-variation-settings` for axes with no CSS property
(`opsz`, `GRAD`, `wdth`, `slnt`) and `font-weight` for weight.

---

# Type scale

## Why modular scales fail in product UI

A 1.25 scale from 16 gives 16 → 20 → 25 → 31.25 → 39.06 → 48.83, and downward 12.8 → 10.24. Two
things break immediately:

1. **You need more sizes below the base than above it.** A dense product needs 11, 12, 13 and 14 as
   four distinct, meaningful sizes. A ratio gives you two, one of them fractional.
2. **Fractional sizes multiply without adding.** Measured on real pages today: Radix's docs render
   13.3, 12.635, 14.44 and 18.88px on one page; Plaid's render **12.992, 12.906, 12.796 and 13.008
   on the same page** — four tokens spanning 0.2px. That is four tokens' worth of complexity and
   one visual result.

**What dense products actually use is an explicit list of integers with irregular gaps.** Geist's,
Atlassian's, Primer's and Radix's published lists are all like this. A good default:

```
11  12  13  14  15  16  18  20  24  32  40  48  64
```

Thirteen integers: tight below 20 where you make most decisions, wide above it where you make few.
If you need something between 24 and 32, you don't.

**A scale is a tuple, not a number.** Ship `copy-14: 14/20/400`, `label-14: 14/20/400`,
`heading-14: 14/20/600/−0.02em`, `button-14: 14/20/500` as four tokens that happen to share a size.
Geist does exactly this and it is the most copyable idea in their system.

**When a modular scale is right:** a marketing page with four sizes total, where the ratio produces
audible rhythm. Wise's 89px w900 headline over 20px body, Intercom's 80px w400 over a 16px serif,
Plaid's 76px over 16px — those are typographic compositions, not UIs.

**Tailwind's defaults are not the problem.** `--text-sm: .875rem` with line-height `calc(1.25/.875)`
is 14/20 and `--text-base` is 16/24 — both good pairs, and the reason so much generated UI lands on
14/20, which is correct. The failure is downstream: `text-lg` (18/28) used as a heading, `text-3xl`
(30/36) picked because it was next in the list, `leading-relaxed` applied globally.

---

# Line-height

## By size **and** by task

| Context | Size | Line-height | Ratio | Measured today at |
|---|---|---|---|---|
| Display | 48–96 | 48–96 | **0.85–1.10** | Wise 89.1/75.8 (0.85), Attio 64/60.8 (0.95), Linear 64/64, Intercom 80/80, Modal 64/64, Mercury 49.3/54.3 (1.10) |
| Page heading | 30–56 | 36–58 | **1.05–1.25** | Vercel 56/56, Notion 54/56, Zed 48/57.6, Primer 40/48, Resend 36/40, Supabase 34/37.8, Cursor 33.75/40.5 |
| Section heading | 20–28 | 22–32 | **1.10–1.35** | Geist 24/32, Radix 24/30, Atlassian 24/28, Intercom 24/24, Plaid 20/22 |
| Prose | 15–18 | 24–28.8 | **1.5–1.9** | Vercel 16/27.2, Supabase 15/28 (1.87), Stripe 16/26, Cursor 15/24.4, GitBook 18/28.8, Wise 18/26 |
| Dense UI row | 13–14 | 18–21.45 | **1.4–1.65** | Geist 14/20, Atlassian 14/20, Radix 14/20, Warp 13/21.45, Geist copy-13 13/18 |
| Scannable data | 14 | 18.2 | **1.30** | Stripe API parameter rows, Framer code 14/18.2 |
| Micro | 10–12 | 13.8–16.8 | **1.15–1.40** | Raycast table 12/13.8, Mercury 12/16.8, Attio 10/15 |
| Single-line control | 14–16 | 14–16 | **1.00** | Mercury nav 16/16, GitBook button 14/14 — height comes from padding |

**Three decisions this makes:**

1. **Above ~40px, go to 1.0 or below — for a bounded Latin string of one or two lines.** A 64px
   headline at 1.5 has 32px between lines and reads as two unrelated sentences. Attio at 0.95 and
   Wise at 0.85 work because their headlines are fixed marketing copy in Latin, at two lines.
   **Three scopes where sub-1.0 is wrong and an agent will apply it anyway:** a headline slot fed
   by a CMS, user content or translation, where line count is unknown; any locale with stacked
   marks — measured, a 48px line at `line-height: 1` gives a 48px box for 59px of ink, so Devanagari
   matras, Thai upper vowels and Vietnamese double diacritics land outside it and clip against
   anything above; and any headline that reaches three lines, where descenders of line 1 meet
   ascenders of line 2. Bounded Latin, ≤2 lines → 0.85–1.0. Anything else → 1.15 floor, 1.25 if
   the locale set includes Devanagari, Thai or Vietnamese.
2. **The same 14px gets 18, 20 or 21.45 depending on whether the user reads or scans.** If your
   table rows and your paragraphs share a line-height, one of them is wrong.
3. **Never `em`, and never `normal`.** Unitless inherits as a ratio, which is what you want; `em`
   inherits as a computed length and breaks the moment a child changes size. `normal` is
   font-dependent — measured per 100px: Inter 121, Verdana 122, Tahoma 121, SF Pro 118, Menlo 117,
   Helvetica/Arial/Segoe UI/Roboto/Times 115, Georgia 114. Stripe leaves `normal` on their h1, h2
   and body, so their heading leading changes with the platform's system font. Defensible for a
   system-stack product; a bug in a webfont product.

## Measure

| Product | Body | Column | Characters |
|---|---|---|---|
| Supabase docs | 15/28 | 706px | **~73ch** |
| Cursor docs | 15/24.4 | 704px | ~74ch |
| Vercel docs | 16/27.2 | 809px | ~76ch |
| Shopify dev | 16/24 | 810px | ~80ch |
| Geist docs | 16/24 | 862px | ~81ch |
| Atlassian | 14/20 | 756px | ~86ch |
| Mercury | 16/24 | 683px | ~88ch |

The textbook 45–75ch is not what shipping documentation does; the real cluster is **73–88ch**, and
the most comfortable sit at the bottom of it. `max-width: 68ch` at 15–16px is a good default, and
`ch` self-adjusts when you swap faces.

**Put the cap on the text elements, not the article container.** `article { max-width: 68ch }`
squeezes every code block, table, image and embed on the page into a reading column they were never
sized for, and they horizontal-scroll or shrink to illegibility. The measure belongs on `p`, `li`,
`blockquote` and headings; `pre`, `table`, `figure` and `.full-bleed` stay at the container width.
On a viewport under ~600px the cap never binds anyway — the viewport is the measure.

**One caveat I measured:** the `ch` unit is the advance of `0` and **ignores letter-spacing**. A
60ch box measured 603.75px; the same 60 characters at `-0.011em` measured 593.2px (1.7% short of
the box) and at `+0.02em` measured 622.95px (3.2% overflowing it). If you track body text, your
`ch` measure is off by that much.

**When measure does not apply:** table cells, form labels, toasts, sidebar items. Those are
recognition, not reading — constrain by column width and truncate.

---

# Letter-spacing

The "-0.02em on headlines" rule is a midpoint between two defensible systems that sit **2.4× apart**
at display size:

| Size | Geist | Radix Themes | Notion | Attio | Linear | Cursor | Stripe / Primer | Mercury | Raycast |
|---|---|---|---|---|---|---|---|---|---|
| 60–96 | −0.060 | −0.025 | — | −0.020 | −0.022 | — | 0 | 0 | 0 |
| 40–56 | −0.060 | — | −0.035 | −0.010 | −0.022 | — | 0 | **+0.010** | — |
| 30–35 | −0.040 | −0.010 | — | — | — | −0.020 | 0 | **+0.015** | — |
| 24–28 | −0.040 | −0.0075 / −0.00625 | −0.023 | −0.010 | −0.012 | — | 0 | — | +0.008 |
| 18–20 | −0.020 | −0.005 / −0.0025 | — | −0.010 | −0.012 | — | 0 | — | **+0.010** |
| 16 | −0.020 | 0 | 0 | −0.010 | 0 | 0 | 0 | 0 | 0 |
| 14 | −0.020 headings / 0 copy | 0 | 0 | −0.010 | −0.011 | 0 | 0 | 0 | +0.008 |
| 12 | 0 | **+0.0025** | +0.010 | **+0.060** (caps) | −0.014 | **+0.050** (caps) | 0 | **+0.020** | +0.008 |

**Tighten** as size increases, on a curve, if your face was not drawn tight. Geist's ramp — `−0.06`
at 40px+, `−0.04` at 24–32, `−0.02` at 14–20, `0` on copy — is a good aggressive default; Radix's
is a good gentle one. Do not invent a third.

**Do not tighten when:**

- **You are on the system stack.** Stripe and Primer set `letter-spacing: normal` on every heading
  and are right: SF Pro is already optically tracked, and `-0.02em` on top produces collisions in
  `Ti`, `rn`, `fi`.
- **You are already using a Display cut.** Attio uses `-0.02em` at 64px in Inter Display where
  Geist uses `-0.06em`, because the tightening is drawn in.
- **The brand is warm, institutional or financial.** Mercury tracks *out* at every size: `+0.010`
  at 42px, `+0.015` at 32px, `+0.020` at 12px. Raycast tracks out across its entire site. Positive
  tracking reads calm and considered; in a bank that is the point.

**Always track out:** all-caps labels and eyebrows, `+0.04` to `+0.10em`. Measured: Attio `+0.06`,
Cursor `+0.05`, PostHog `+0.025`. My own measurement — `OVERVIEW` at 12px w600 is 63.94px untracked
and 68.73px at `+0.05em`, a 7.5% difference. Uppercase sidebearings are drawn for mixed-case
rhythm; caps without tracking read cramped.

**Scope:** this is how to set caps you have already decided to use. It is not a reason to add an
eyebrow. "Every section opens with an uppercase letter-spaced micro-label" is now one of the named
tells of generated UI (see the anti-patterns section) — the tracking makes each one look correct
and the repetition makes the page look machine-written. Two or three per page, or none.

**Sometimes track out at reading size.** Raycast runs `+0.011em` on 18px body, Cursor `+0.005em` on
15px, Mercury `+0.020em` on 12px legal text. Each is a fraction of a pixel and each was deliberate.

**Never** track body prose beyond ±0.01em — **except** that "never track mono" is wrong: Linear
sets `-0.015em` on 12px Berkeley Mono inline code, and Warp sets `-0.036em` and `-0.059em` on
Matter Mono headlines. What is actually true: never track mono *inside a code block*, where column
alignment with pasted code matters. A mono headline is type, not code.

---

# Font weight

## Why 400 / 500 / 600 beats 300 / 400 / 700

**300 fails below 16px.** It loses stroke to antialiasing and reads as low-contrast rather than
light. It is a display choice: Zed's 48px h1 at **w340** and Intercom's w300 serif body are both
excellent and would both be unreadable at 14px. Primer defines `--base-text-weight-light: 300` and
does not use it for content.

**700 next to 400 gives you two states and nothing between**, so every intermediate distinction has
to be made with colour or size instead.

| Product | Weights rendered | Heading | Body | UI |
|---|---|---|---|---|
| Linear | 400, 510, 590 | 590 (510 on marketing) | 400 | **510** |
| Vercel / Geist | 400, 500, 600 | 600 | 400 | 400–500 |
| Primer / GitHub | 400, **460**, 500, 600, 700 | 460 display, 600–700 UI | 400 | 500–600 |
| Atlassian | 400, 500, **653**, 700 | 700 | 400 | 400–500 |
| Attio | 400, 500, 600 | 500–600 | **500** | **500** |
| Supabase | 400, **450**, 500, 600 | 600 | **500** | 450–500 |
| Radix Themes | 300, 400, 500, 700 | 700 | 400 | 400–700 |
| Material 3 | 400, **475**, 500 | 475 | 400 | 400–500 |
| Cursor | **400, 700 only** | **400** | 400 | 400 |
| Intercom | 300, 400, 500 | **400** | **300** | 400 |
| Mercury | 360, 400, 420, 480, 500 | 480 | 360–400 | 420 |
| Zed | **340**, 390, 400 | 340–390 | 400 | 400 |

Three things this changes:

1. **Two weights can run a whole product.** Cursor's docs are 400 and 700, and the active nav item
   changes *colour only* — no weight change, no background, no movement.
2. **Body at 500 is legitimate and increasingly common** (Attio 16/22 w500, Supabase 15/28 w500,
   PostHog 16/24 w500, GitBook 18/28.8 w500). It lets 14–16px hold up on light backgrounds without
   going a size up. It is wrong on dark backgrounds, where 500 on near-black blooms.
3. **Weight changes shift layout.** Measured: "Assigned to me" at 14px is 102.56px at w400, 103.66
   at w500, 104.75 at w600, 105.83 at w700. Bolding a sidebar item on selection moves everything
   after it by 1–3px. Either don't, or reserve the space.

**Dark mode.** Light text on dark optically gains weight; products that ship both either drop a
step or rely on the face being drawn for it. Related: `-webkit-font-smoothing: antialiased` — which
thins strokes on macOS — is set by **20 of the 25 sites I probed** (Linear, Vercel, Stripe, Notion,
Attio, Mercury, Raycast, Zed, Warp, Modal, Framer, GitBook, Cursor, PostHog, Resend, Supabase,
Intercom, Wise, Plaid, Material). The five leaving it `auto`: Shopify dev, Atlassian, Primer, Radix,
Sentry. It is a real fork; pick one and set it globally, never per component.

---

# Optical vs metric alignment

Four different things hide under this heading. All four are measurable and three are probably wrong
in your build right now.

## Kerning: on by default, worth 5–9% of width

Same caps-heavy string at 100px, kerning on vs off:

| Face | Kerned | Unkerned | Δ |
|---|---|---|---|
| SF Pro (`system-ui`) | 1015.4 | 1121.3 | **−9.4%** |
| Saans | 1057.4 | 1162.5 | −9.0% |
| Mona Sans | 1056.2 | 1153.3 | −8.4% |
| Plaid Sans | 1074.8 | 1170.1 | −8.1% |
| Inter Variable | 1087.1 | 1178.1 | −7.7% |
| Geist Sans | 1094.0 | 1181.6 | −7.4% |
| Untitled Sans | 1202.4 | 1271.9 | −5.5% |
| Every monospace | identical | identical | **0%** |

Kerning is on by default; leave it on. Two ways to destroy it accidentally: `font-kerning: none`
and `font-feature-settings: "kern" 0` — measured byte-identical, they are the same switch. Note the
second one: if you write a `font-feature-settings` string by hand and forget that it *replaces* the
whole list rather than adding to it, you can drop kerning without noticing. Monospace faces have no
kern pairs at all, so a mono-set UI never sees this.

## Half-leading: your heading is not where you think it is

A line box is `(ascent + descent)` plus half the leading above and half below. For Inter at 32px/1.2
I measured a box of **38.39px** where the cap-to-baseline ink is **23.28px** — **7.56px of invisible
space on each end of every heading.**

So a heading with `margin-bottom: 16px` above a paragraph has a *visual* gap of ~23px, 47% more than
the number in your CSS, and the gap above it is bigger still. Correct spacing tokens plus untrimmed
line boxes is how a page reads loose while every number in the CSS is right.

Chromium supports the fix today:

```css
h1, h2, h3 { text-box: trim-both cap alphabetic; }   /* 38.39px → 23.28px, measured */
```

Then your margins are the gaps you see. Do this on headings and tightly-boxed UI text (badges,
chips, table headers). Without support the page keeps its old leading, so no `@supports` gate is
needed.

**Three places it makes things worse, measured:**

1. **Body paragraphs.** You want half-leading between lines. Trim headings and boxed text only.
2. **Any trimmed box with `overflow: hidden`, on any surface that is not Latin-only.** `cap
   alphabetic` clips the box to cap-top and baseline; everything outside that band still paints.
   Measured at 32/1.2: after trimming, ink extends **7.72px above and 8px below** the element box.
   Latin caps have nothing up there, so it looks clean. Vietnamese stacked diacritics (`Ệ`, `Ổ`),
   Devanagari matras, Thai upper marks, emoji and every descender do — and an ancestor with
   `overflow: hidden`, which is what a chip or badge has, will cut them off. Scope the trim to
   Latin surfaces, or use `text-box-edge: text alphabetic` where content is multi-script.
3. **Retrofitting an existing product.** Every heading gap tightens by ~15px at 32px, all at once.
   That is a deliberate one-pass re-tune of your spacing scale, not a drop-in fix. Ship it with the
   margin change in the same commit, or the page reads cramped instead of tight.

## Cap-centring: text sits low in a box, and the offset does not scale **[re-probed]**

Measured gaps inside the line box — cap-top to box-top vs baseline to box-bottom. *Gap difference*
is what you see; *nudge* is half of it, because centring splits the difference:

| Face | Size / lh | Above cap | Below baseline | Gap difference | Nudge to centre |
|---|---|---|---|---|---|
| Inter Variable | 14/20 | 5.31px | 4.50px | **0.81px low** | 0.41px up |
| SF Pro | 14/20 | 5.64px | 4.50px | **1.14px low** | 0.57px up |
| Menlo | 13/20 | 5.02px | 5.50px | 0.48px high | 0.24px down |
| Georgia | 16/24 | 6.41px | 6.50px | 0.09px high — balanced | — |

**The offset does not grow with font-size in a variable face, and it changes sign.** Measured on
Inter Variable, cap-to-ascent minus descent: **14px → 0.81px low, 20px → 0.55px _high_, 32px →
0.28px high, 64px → 0.44px low.** The `opsz` axis redraws the metrics, so a nudge tuned at 14px is
wrong at 20px and backwards at 32px. SF Pro, which has no CSS-visible `opsz`, does scale: 1.14px
low at 14px, 2.91px low at 64px.

**So: never write a size-independent nudge.** At 14px the offset is invisible — leave it. Fix it
only in tight controls where you can see it (a 20px badge, a 24px chip, an icon beside a label),
per size, in this order: `text-box: trim-both cap alphabetic` on the control, then flex centring,
then padding. Never `position: relative; top: -1px`; it is wrong at the next font size and, in a
variable face, at the next `opsz` step.

## Metric-compatible fallbacks

Every serious product I probed ships an override face so the swap does not move the layout:

```
Geist  → Arial:  size-adjust 106.28%  ascent-override 94.56%  descent 27.76%  line-gap 0%
Inter  → Arial:  size-adjust 107.12%  ascent-override 90.44%
Mona Sans      : size-adjust 104.50%  ascent-override 71%
Untitled Sans  : size-adjust 105.03%  ascent-override 95.40%
Arcadia        : size-adjust 101.91%  ascent-override 93.24%
Arcadia Display: size-adjust  92.89%  ascent-override 102.29%
Zed "writer"   : size-adjust 120.02%  ascent-override 85.40%
Every mono → Menlo: size-adjust ≈131.49%   (Söhne Mono, zedMono, DM Mono all identical)
```

`next/font`, Fontaine and capsize generate these. Without them, `font-display: swap` costs a visible
CLS on every cold load. Mercury goes further with `font-display: optional` — the font either arrives
in ~100ms or the page keeps the fallback for that visit. That is the right call when the brand face
is not load-bearing for first paint. (`optional` gives the font one short block period and then
gives up for that page view — no swap, no shift.)

---

# Numerals

## Tabular vs proportional

Measured in Inter Variable at 100px: `1111111111` is **362.31px**, `0000000000` is **613.28px** —
the `1` is 41% narrower. With `font-variant-numeric: tabular-nums`, both are **644.53px**.

Two consequences people miss:

- A right-aligned money column jitters, decimals do not stack, and updating values shimmer. This is
  the most common typographic defect in generated dashboards.
- **Tabular figures are wider than proportional ones** — 64.45 vs 61.33 per glyph, +5% in Inter as
  an average over all ten digits. The column penalty is worse than that average and depends on your
  digit mix. Measured at 13px Inter: `$1,234,567.89` goes 85.92 → 94.69px (**+10%**), and
  `$11,111.11` goes 50.61 → 74.34px (**+47%**), because tabular pads every `1` out to zero-width.

**Where it is the wrong call.** Tabular buys two things: vertical alignment down a column, and no
reflow when a value changes in place. A number with neither — a lone stat in a hero, a count inside
a sentence, a static invoice total, a badge — pays the width and gets nothing, and at display size
the padded `1`s read as gaps. On a 390px row where a price sits beside a delta and a sparkline,
+47% is the difference between fitting and truncating; there, right-align and set the column to a
fixed `ch` width instead.

```css
/* columns and live values only */
td.num, .metric-cell, .price-column, .timer, .diff { font-variant-numeric: tabular-nums; }
```

**The `font-feature-settings` conflict is narrower than folklore says.** All four combinations:

| Declaration | Result |
|---|---|
| `font-variant-numeric: tabular-nums` | tabular (644.53) |
| `font-feature-settings: "tnum" 1` | tabular (644.53) |
| `font-variant-numeric: tabular-nums` **+** `font-feature-settings: "cv01"` | **still tabular** (644.53) |
| `font-variant-numeric: tabular-nums` **+** `font-feature-settings: "tnum" 0` | **proportional** (362.31) |

So `font-feature-settings` only overrides `font-variant-*` **for the same feature tag**. A global
`ffs: "cv02","cv11"` does not silently kill `tabular-nums` on a table cell. Still, use
`font-variant-numeric` for numerals and reserve `font-feature-settings` for stylistic and character
variants.

**Use proportional in prose.** "In 2024 we processed 1,847 payments" should not have gappy `1`s.
PostHog explicitly sets `font-variant-numeric: proportional-nums` on body copy; Notion forces
`lining-nums` globally.

## Slashed zero

`font-variant-numeric: slashed-zero` (identical in effect to `ffs: "zero"`, measured). On where a
`0`/`O` confusion costs something: API keys, transaction and charge IDs, serials, MAC addresses,
one-time codes, licence keys. **Off** in money and metrics — a slashed zero in `$1,000.00` reads as
machine output and undercuts the seriousness a financial number needs.

## Cents, alignment, one decimal policy

Do not superscript cents. Raised, shrunk cents are retail price signage — it says `$19⁹⁹`. When the
number is the user's actual balance, set cents at the same size and weight as the dollars, in
tabular figures.

Lining figures (the default in every face here) are drawn to cap height, so `2024` aligns with `FY`.
Old-style figures (`onum`) have ascenders and descenders and belong in serif prose, never a UI.

Pick one decimal policy per surface and hold it. "Aggregates whole-dollar, line items to the cent"
is defensible; mixing within one column is not.

**Atlassian's `font.metric.*` tokens** (28/32, 24/28, 16/20, all bold) are worth stealing as an
idea: a big number in a stat tile is neither a heading nor body. Give it its own role with tabular
figures baked in.

---

# Text colour hierarchy

**Three neutral levels, one link colour, one danger colour.** That is the system (table 4 above).
The failure mode is inventing a fourth and fifth to express distinctions that are not about
importance:

| You want to say | Wrong tool | Right tool |
|---|---|---|
| This label is secondary to its value | a 4th grey | size step (14 → 12) or weight step (500 → 400) |
| This row is disabled | a 5th grey | `opacity` on the row + `aria-disabled` |
| This is placeholder text | a 6th grey | a genuinely separate token — Vercel's `#7D7D7D` at 3.9:1 exists only for this |
| This is a different *kind* of thing | a new grey | a different hue — Radix's code links at `rgba(0,43,183,.773)`, 6.0:1 |

**Alpha or hex.** Notion and Radix define the ladder as alpha over one base so it
composites correctly on coloured callouts and cards. Vercel, GitHub and Atlassian use hex so the
contrast number is exact and governable. Choose by whether you have coloured surfaces.

**The floor.** Every tertiary level I measured today sits between 4.6 and 8.2:1 — nobody puts real
content below 4.5. If your tertiary is at 3.5:1 because it looks nicer, you have made content
inaccessible to buy a mood.

---

# Truncation, wrapping and overflow

## `balance` and `pretty`, measured rather than assumed

| Product | Headings | Paragraphs |
|---|---|---|
| Notion, Mercury, Attio, Vercel, Cursor, Zed, Warp, Framer, Wise | `balance` | Notion / Mercury / Vercel `pretty` |
| Stripe | — | **`pretty` on everything, globally** |
| Linear, Radix, Atlassian, Primer | neither | neither |

What I measured in Chromium 148, 420px column, 16/24 Inter:

- `balance` works at every line count from 2 through **6**. The 6-line case went
  `[403,416,414,417,405,353]` → `[403,416,386,395,403,404]`.
- At **8 lines and above it does nothing at all** — identical line widths with and without. The
  cliff is between 6 and 8, so a 6-line block and an 8-line block behave differently with the same
  declaration. Never put it on copy whose length you do not control.
- On an already-even 2-line heading it changes nothing, which is the common case.
- `pretty` did **not** change a 4-line paragraph (`[403,139]` both ways). It *did* fix a 3-line
  orphan: `[298,235,95]` → `[235,246,147]`. It suppresses orphans, it is not a balancer, and it is
  cheap, which is why Stripe applies it globally.

Rule: `balance` on headings and short blocks you control (card titles, empty-state copy, toasts),
never on anything that can exceed 6 lines; `pretty` everywhere else.

## Clamping and ellipsis

| Situation | Use |
|---|---|
| Single line that must not wrap (table cell, sidebar item, chip) | `overflow:hidden; text-overflow:ellipsis; white-space:nowrap` |
| Multi-line with a hard cap (card body, list preview) | `display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden` |
| Content that continues on expand, where hiding the cut is the point | `mask-image: linear-gradient(to bottom, #000 60%, transparent)` |

**Do not switch to the unprefixed `line-clamp` yet.** Measured today: `line-clamp: 2` left the block
at its full 60px; the `-webkit-box` version clamped it to 40px, and `CSS.supports('line-clamp')`
returns false.

Two rules that get broken constantly:

1. **Truncated text must carry its full value** — `title={fullText}` at minimum. A truncated file
   path or email that cannot be recovered is a bug, not a style.
2. **Truncate identifiers in the middle.** `ch_3MmlLrLkdIwHu…snN0B15` keeps both discriminating
   ends; `ch_3MmlLrLkdIwHu…` keeps neither. Anything the user compares by eye — IDs, hashes,
   addresses, paths — truncates in the middle.

## The overflow you will actually ship **[re-probed]**

A 72-character hyphen-free email in a 180px column, `font: 14px/20px Inter`. Its natural width is
**559.2px**:

| Declaration | Result |
|---|---|
| default (`overflow-wrap: normal`) | **1 line, 379px outside the container** — 211% of the column width, no scrollbar, no warning |
| `overflow-wrap: break-word` | 4 lines, 0 overflow |
| `overflow-wrap: anywhere` | 4 lines, 0 overflow |
| `word-break: break-all` | 4 lines, 0 overflow (also breaks ordinary words — avoid) |

Break opportunities change this completely: the same address with hyphens in the local part wraps
to 2 lines and overflows by ~1px under the default. The failure depends on the *data*, not the CSS,
which is why it survives review — the test fixture had a hyphen and production did not. Any surface
that can receive user-supplied identifiers, emails, URLs or file paths needs an explicit break rule.

**`anywhere` and `break-word` are not interchangeable, and the difference is a layout bug.**
`overflow-wrap: anywhere` counts break opportunities when computing intrinsic size; `break-word`
does not. Measured on `Monthly recurring revenue` at 14px in a `width: min-content` box: normal
60.63px, `break-word` 60.63px, **`anywhere` 12.66px — a 79% collapse to one character.** Any flex
item, grid track or box sized by `min-content` / `fit-content` collapses the moment you set
`anywhere` on it. Use `break-word` as the default base style; reserve `anywhere` for boxes that
already have an explicit width.

---

# Labels, captions, helper text, code

These are five things and generated UI collapses them into one 14px grey.

**Field label** — above the input, 12–14px, weight 500–600, primary or secondary colour. A label is
the *name* of the thing, not de-emphasised content; never lighter than the value it labels.
Measured: Stripe 14/20 w600, Primer 14/21 w600, Radix table headers 14/20 w700.

**Helper text** — below the input, before typing. 12–13px, tertiary colour, weight 400. Genuinely
lower priority. Reserve its vertical space always, or the layout jumps when the error appears.

**Error text** — same size as helper text, danger colour, weight 400–500. It *replaces* helper text
in the same slot; it does not stack below it.

**Caption / meta** — 12px, tertiary, weight 400. Linear runs 13/19.5.

**Eyebrow / section label** — all-caps, 11–12px, weight 500–600, **`+0.05` to `+0.10em`**, tertiary.
Attio `+0.06`, Cursor `+0.05`, PostHog `+0.025`.

## Inline code and code blocks

Every product sets inline code smaller than its surrounding text:

| Product | Prose | Inline code | Ratio |
|---|---|---|---|
| Radix Themes | 16 | **14.44** | 0.9025 |
| Vercel docs / Geist | 16 | 14.4 / 13.71 | 0.90 / 0.857 |
| Stripe guides | 16 | 14.4 | 0.90 |
| Atlassian | 14 | 12.25 | 0.875 |
| Primer | 16 | 13.6 | 0.85 |

The cluster is **0.85–0.9em**, and this is the one place `em` is the right unit
(`font-size: 0.875em` tracks its parent). But know what you are paying: mono at the same px has the
*same x-height* as its sans partner (Geist Sans 7.42 / Geist Mono 7.42 at 14px), so dropping to
0.875em makes code's x-height 12.5% smaller than the prose around it. You are shrinking it to
compensate for **width** — mono is a flat 25–26% wider — and for its heavier texture, not because it
looks bigger. If your code strings are short (`useState`, `--flag`), 0.9em holds up better.

**Code blocks** are set at an absolute size — 12 or 13px, line-height 1.4–1.55 (Vercel 13/20, Zed
12/16, Radix 13.3/22, Stripe 13/19) — never relative. Turn ligatures off unless you decided
otherwise: Vercel ships `font-feature-settings: "liga" 0` on `pre code`, because `!=` rendering as
`≠` breaks comprehension for a reader who does not have that font.

**Choosing a mono.** If your sans has a matching mono, use it — Geist Sans and Geist Mono share
x-height and cap height exactly, so a mono cell and a sans cell in one table sit on the same optical
line. Otherwise `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace`.

**Never write `font-family: monospace` bare.** Measured: an element with `font-family: monospace;
font-size: 1em` whose inherited size is the document default computes to **13px, not 16px** —
Chrome's legacy monospace default silently wins. Inside an explicitly sized parent it behaves
normally, which is why this bug survives review: it only shows up in some places.

**Mono as the whole identity** is a real strategy — Warp sets its entire marketing site in Matter
Mono, headings included, at `-0.036em` and `-0.059em`. It reads "terminal-native" instantly and
costs 26% width everywhere. Only for products where that association is the point.

---

# Non-Latin and i18n

## The line box you designed does not fit

Measured: `line-height: normal` at 14px, Inter with macOS system fallbacks, one line of real text.

| Script | Natural line box | Width vs Latin |
|---|---|---|
| Latin, Greek, Cyrillic, Hebrew | **17px** | Greek +27%, Cyrillic +3%, Hebrew ±0 |
| Korean | 18px | −44% |
| Thai | **19px** | −1% |
| Arabic | **20px** | −40% |
| Chinese | **20px** | −38% |
| Devanagari | **21px** | −10% |
| Japanese | **21px** | −28% |

The near-universal dense-UI row is 14/20 (Geist `label-14`, Atlassian `font.body`, Radix step 2,
Tailwind `text-sm`). **That row clips Devanagari and Japanese**, and leaves Arabic and Chinese with
exactly zero slack. If you ship those locales, set `line-height: 1.6` (22.4px) on any surface that
can hold them, or scope it:

```css
:lang(hi), :lang(ja), :lang(th), :lang(ar), :lang(zh) { line-height: 1.6; }
```

And never put `overflow: hidden` on a fixed 20px row that can hold Hindi.

## Everything else that breaks

**Your buttons.** Measured in Inter at 14px w500:

| English | German | Growth |
|---|---|---|
| Save | Speichern | **+108%** |
| Settings | Einstellungen | +64% |
| Cancel | Abbrechen | +59% |
| Notifications | Benachrichtigungen | +59% |
| Add member | Mitglied hinzufügen | +54% |
| Delete | Löschen | +33% |
| Sign out | Abmelden | +24% |
| Search | Suchen | +8% |

A fixed-width control that fits "Save" with 8px to spare is broken in German by 34px. **Short labels
grow most** — the opposite of the intuition. Size controls by their longest translated string, not
the English one.

**Your tracking.** Measured: `-0.02em` pulled a Japanese string 1.9px tighter and a Korean one
2.0px; on Arabic it changed nothing (the shaper ignores it between joined forms — which is exactly
why it should not be applied at all). Reset it:

```css
:lang(ja), :lang(zh), :lang(ko), :lang(ar), :lang(th) { letter-spacing: normal; }
```

**Your font file.** Scope non-Latin faces by `unicode-range` or you ship 400KB that never renders.
Notion does this properly — Noto Sans Arabic and Noto Sans Hebrew declared with explicit ranges,
`font-weight: 100 900`, `font-stretch: 100%` (required for variable Noto), `font-display: swap` —
so Latin never touches those files.

**Localised forms.** Notion sets `font-feature-settings: "locl" 0`, deliberately turning off
locale-specific glyph shapes (Romanian `ș`, Bulgarian Cyrillic, Serbian italics) to keep one visual
identity. Defensible for a single-identity product; wrong when reading correctly in your own script
matters more.

**Do not count on `text-spacing-trim` / `text-autospace` yet.** Both report as supported in
Chromium and neither changed the width of my CJK sample.

---

# When this advice is wrong

**Dense-UI advice is wrong for consumer onboarding.** Linear's 14px/w510 rows are right for a tool
someone lives in six hours a day. In a signup flow used once, on a phone, in a hurry, 14px is
hostile. Consumer first-run wants 16–17px, 1.5 line-height and big targets.

**"Tighten headlines" is wrong for the system stack, for Display cuts, and for warm brands.**
Stripe and Primer ship large headings at `letter-spacing: normal`; Mercury and Raycast track *out*.
Copying Geist's `-0.06em` onto SF Pro produces collisions.

**"Never use light weights" is wrong at display size.** Zed's 48px w340 and Intercom's w300 serif
body are both better than the w600 versions would be. The rule is about reading sizes.

**"Use a modular scale" is wrong past about six sizes**, and right for a marketing page with four.

**"Body text is 16px" is wrong for internal tools and API references.** Stripe's densest layer is
13px and correct. It is right for anything a stranger reads once.

**"tabular-nums everywhere" is wrong in prose** — gappy `1`s inside a sentence look broken — and
wrong when column width is scarce, since tabular figures are 5% *wider*.

**"Three text colours" is wrong for data visualisation**, where axis labels, gridline labels and
annotations legitimately need more. That is a chart system; scope it separately.

**`text-wrap: balance` is wrong on anything that can exceed 6 lines** — measured, it works through
6 and does nothing at 8+, so two blocks with the same declaration behave differently.

**`text-box: trim-both` is wrong on body paragraphs**, on multi-script surfaces inside
`overflow: hidden`, and as a retrofit without re-tuning the spacing scale in the same commit.

**`overflow-wrap: anywhere` is wrong on anything sized by its content** — measured, it collapses a
`min-content` box from 60.63px to 12.66px. Use `break-word` unless the box has an explicit width.

**Sub-1.0 display leading is wrong for unbounded or non-Latin headlines.** A 48px line at
`line-height: 1` gives a 48px box for 59px of ink.

**`max-width: 68ch` is wrong on the article container** — it squeezes code blocks, tables and
figures into a reading column. Cap the text elements.

**Tracking out all-caps is right; adding an all-caps eyebrow to every section is a 2026 AI tell.**

**`font-optical-sizing: auto` is wrong when the file has no `opsz` axis** — most static Inter
deployments. It is dead CSS that makes you think a problem is solved.

**All of it is wrong for accessibility-first and low-vision surfaces**, where 18px minimum, 1.6
line-height, one weight and a 7:1 floor beat every aesthetic argument here.

---

# What AI-generated typography looks like, and the corrections

## 1. Compounding relative units produce fractional sizes

**The tell:** computed sizes like `12.8`, `12.75`, `12.25`, `13.71`, `16.875`, `18.88` on one page.
Measured today on real sites: Plaid renders `12.992`, `12.906`, `12.796` and `13.008` on the same
page — four tokens spanning 0.2px. `text-sm` inside a container that set `text-lg`, `em`-based prose
styles, and `0.9rem` of `0.95rem` all cause this.

**Correction:** define the scale in `rem` against a fixed 16px root, emit integers only, never nest
a relative size inside another relative size. The one legitimate exception is inline `<code>` at
`0.875em`, which is supposed to track its parent.

## 2. One line-height for the whole product

**The tell:** `leading-relaxed` or `line-height: 1.5` applied globally, so the 32px heading gets
48px of leading and the 12px caption gets 18px. Headings float apart; the page reads as a document,
not an interface.

**Correction:** ship `(size, line-height)` as a single token — `copy-16: 16/24`, `label-16: 16/20`,
`heading-32: 32/40`. If a size appears in two roles it gets two tokens. Take anything over 40px to
1.0–1.15. And add `text-box: trim-both cap alphabetic` to headings so your margins mean what they
say — measured, that is 7.56px of phantom space per end at 32px.

## 3. Bold everything, grey everything

**The tell:** every heading `font-bold`, every label `font-semibold`, every non-heading in
`text-muted-foreground`. Two states — loud and dim — and no middle, so nothing reads as important
because nothing is quiet.

**Correction:** headings 600 (or 500 with a Display cut, or 400 if you have Cursor's or Intercom's
confidence), labels 500, body 400. Hierarchy from size and space first, weight second, colour third.
And remember weight changes cost layout: 1–3px per label at 14px.

## 4. Proportional figures in every number column

**The tell:** metric tiles and a transactions table where decimals do not line up and digits shimmer
on update.

**Correction:** `font-variant-numeric: tabular-nums` on every table cell containing a number, and on
every counter, timer, diff stat and live price — anything that stacks in a column or changes in
place. Not on a lone hero stat or a number inside a sentence. `slashed-zero` on IDs and keys, not on
money. Budget +5% average column width, up to +47% on 1-heavy values.

## 5. The unchosen face — and in 2026 that is no longer only Inter

**The tell, 2023 edition:** `font-family: Inter` with `font-feature-settings: normal`, or Inter body
under a decorative display face that shares no design DNA with it — the pairing collapses at the
h3/body boundary. Still true, still common.

**The tell, 2026 edition:** the escape hatch became its own default. Current audits of generated
frontends name a "tasteful free font" cluster — **Space Grotesk, Sora, Syne, Instrument Serif,
Fraunces, Geist** — reached for as the single gesture toward design intent, plus **`GeistSans` /
`GeistMono` pulled from `next/font` and left untouched**, which is now the Next.js signature the way
raw Inter was the Tailwind one. Note that this file recommends several faces sitting one step from
that cluster. The test is not the name of the font; it is whether you can say in one sentence what
this face does for this product that the previous three faces did not.

**Correction:**

- **Do not** expect `"cv02","cv03","cv04"` to fix it. Measured, those change advance width by
  ≤0.01% — they alter four glyphs your strings mostly do not contain.
- **Do** use a Display cut for anything over ~28px: Inter Display is 6.4% narrower at the same size,
  with the tightening drawn in rather than tracked in. Attio, Mercury and Google all do this with
  two cuts of one design.
- **Do** pair with a serif rather than another sans: Notion + Lyon, Intercom + Ivory, Zed + Plex
  Serif — three of the four measured today. A serif gives contrast a second grotesque cannot.
- **Do** consider a different free face if personality is the problem: Mona Sans (weight + width
  axes), Manrope (narrow and tall), Instrument Sans (real width axis), General Sans.

## 6. Gradient headline text

**The tell:** `bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500` on an
`h1`. Named a P0 tell in current AI-slop audits, and the typographic equivalent of the em dash in
AI prose. Variants: an animated gradient sweep, and a gradient applied to one word.

**Correction:** headings render in solid ink or one brand colour. If a word needs emphasis, use
weight, size or a single accent colour. Gradient fill also destroys the contrast guarantee — you
cannot compute a ratio against a moving foreground, so the accessibility answer is "unknown."

## 7. The serif-italic accent word

**The tell:** a sans headline with exactly one word in italic serif — "The *modern* way to ship."
One of the most reliable 2026 tells because it is a decoration borrowed from an editorial system
the rest of the page does not use.

**Correction:** earn the emphasis inside your own type system — weight, size or colour. Mix serif
and sans only where the whole design commits to both, the way Notion, Intercom and Zed do.

## 8. shadcn defaults, unedited

**The tell:** `text-muted-foreground` on every non-heading, `tracking-tight` (or `tracking-tighter`)
on every heading regardless of size, `text-balance` applied globally, and the hero at `text-7xl`
because that is what the block came with. shadcn is designed to be copy-pasted by agents, so its
defaults are now the single most common typographic fingerprint on a generated page.

**Correction:** `tracking-tight` is `-0.025em` — correct at 36px, wrong at 14px and actively wrong
at 12px, where the ramp should be `0` or positive. Ship a tracking ramp keyed to size, not one
class. Replace the blanket `text-muted-foreground` with the three-level ladder in section 4. And
`text-balance` past 6 lines is dead CSS (measured above).

## 9. The reflexive all-caps eyebrow

**The tell:** every section opens with a tracked-out uppercase micro-label — `FEATURES`,
`HOW IT WORKS`, `WHY US`. Individually correct typography; at six per page it is the rhythm of a
generated template.

**Correction:** two or three per page, or none. Vary the opener: a numeral, a lowercase kicker, a
short question, or nothing.

## Bonus tells worth naming

- **`letter-spacing: -0.02em` applied globally**, including to 12px labels. Tracking is a curve.
- **`text-transform: uppercase` with no tracking.** `+0.05em` minimum, always — measured, the
  difference between 63.94px and 68.73px for `OVERVIEW` at 12px.
- **`line-height: normal` left on headings** — font-dependent, 114 to 122 per 100px across common
  faces.
- **The unprefixed `line-clamp`** — measured, it does nothing in Chromium today.
- **No `overflow-wrap` anywhere** — a 72-char email pushes 379px outside a 180px column, silently.
- **`font-family: monospace` bare** — computes to 13px under the document default.
- **`font-variation-settings: "wght"` alongside `font-weight`** — the `fvs` wins and every
  `<strong>` in that subtree stops bolding.
- **A 1200px-wide paragraph.** Nothing caps the measure, so at 1440px body copy runs 150ch.
- **Truncation with no `title`.** The information is simply gone.
- **`overflow-wrap: anywhere` on a flex item** — collapses its `min-content` width by 79%.
- **Every heading at the same tracking**, because one utility class was applied at every size.
- **A number set in a hero at `tabular-nums`** — padded `1`s read as gaps at display size.

---

# Self-check list

Every item is either a **grep** over source, a **console** one-liner pasted into DevTools on the
rendered page, or an **eye** check against a screenshot. Nothing here needs judgement about whether
something "feels" right. Run the console block first; it answers eleven items at once.

```js
// Paste into DevTools on the rendered page. Returns everything the console checks below need.
const els = [...document.querySelectorAll('*')].filter(e =>
  e.offsetParent && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
const cs = els.map(e => ({ e, s: getComputedStyle(e) }));
const tally = f => cs.reduce((m, x) => (m[f(x)] = (m[f(x)] || 0) + 1, m), {});
window.T = {
  sizes:        tally(x => x.s.fontSize),
  weights:      tally(x => x.s.fontWeight),
  lineHeights:  tally(x => x.s.fontSize + '/' + x.s.lineHeight),
  tracking:     tally(x => x.s.fontSize + ' ' + x.s.letterSpacing),
  colors:       tally(x => x.s.color),
  families:     tally(x => x.s.fontFamily.split(',')[0]),
  fractional:   cs.filter(x => parseFloat(x.s.fontSize) % 1 !== 0).map(x => x.s.fontSize + ' ' + x.e.tagName),
  lhNormal:     cs.filter(x => x.s.lineHeight === 'normal').map(x => x.e.tagName + '.' + x.e.className),
  emLineHeight: cs.filter(x => /em$/.test(x.e.style.lineHeight)).map(x => x.e.tagName),
  fvsWght:      cs.filter(x => /wght/.test(x.s.fontVariationSettings)).map(x => x.e.tagName),
  capsUntracked: cs.filter(x => x.s.textTransform === 'uppercase'
                   && (x.s.letterSpacing === 'normal'
                       || parseFloat(x.s.letterSpacing) / parseFloat(x.s.fontSize) < 0.04))
                   .map(x => x.e.textContent.trim().slice(0, 20)),
  overflowing:  cs.filter(x => x.e.scrollWidth > x.e.clientWidth + 1)
                   .map(x => [x.e.tagName, x.e.scrollWidth - x.e.clientWidth, x.e.textContent.trim().slice(0, 30)]),
  truncNoTitle: [...document.querySelectorAll('*')].filter(e =>
                   getComputedStyle(e).textOverflow === 'ellipsis' && !e.title
                   && !e.getAttribute('aria-label')).map(e => e.textContent.trim().slice(0, 30)),
  numbersProportional: [...document.querySelectorAll('td, th, .metric, .price, [class*=num]')]
                   .filter(e => /\d/.test(e.textContent)
                     && !/tabular/.test(getComputedStyle(e).fontVariantNumeric))
                   .map(e => e.textContent.trim().slice(0, 20)),
};
console.table(T.sizes); T
```

**Scale**
- [ ] `T.fractional` is empty. Any entry means a relative unit compounded — except inline `<code>`
      at `0.875em`, which is allowed.
- [ ] `Object.keys(T.sizes).length <= 8` on any one screen.
- [ ] **grep** `rg -o 'text-(xs|sm|base|lg|xl|[0-9]xl)' src/ | sort | uniq -c | sort -rn` — the top
      two body-size classes account for most hits, and I can name the surface each one serves.
- [ ] **grep** each type token in the token file matches `\d+\s*/\s*\d+.*\b[3-7]\d0\b` (size,
      line-height and weight present). A token that is only a size fails.

**Line-height and vertical rhythm**
- [ ] `T.lhNormal` is empty, or contains only elements whose font is the system stack.
- [ ] `Object.entries(T.lineHeights).filter(([k]) => parseFloat(k) > 40)` — every one computes to a
      ratio ≤ 1.15, **and** the string in it is bounded Latin at ≤ 2 lines. If the slot takes CMS,
      user or translated copy, it is ≥ 1.15 instead.
- [ ] `T.emLineHeight` is empty. **grep** `rg 'line-height:\s*[\d.]+em' src/` returns nothing.
- [ ] **eye** Screenshot a heading followed by a paragraph, measure the gap in pixels, compare to
      the margin in CSS. Equal → trimmed or already tuned. ~15px larger at 32px → not trimmed.
- [ ] **grep** if `text-box` is set anywhere, `rg 'overflow:\s*hidden' ` over the same components
      returns nothing that holds non-Latin, emoji or accented text.

**Weight**
- [ ] `Object.keys(T.weights).length <= 3`.
- [ ] `cs.filter(x => +x.s.fontWeight <= 300 && parseFloat(x.s.fontSize) < 16)` is empty.
- [ ] **eye** Screenshot the sidebar with item A selected, then item B. Diff the two PNGs — nothing
      below the selected item moves. (Or: the selected item changes colour only.)
- [ ] `T.fvsWght` is empty wherever `font-weight` is also used.

**Tracking**
- [ ] `Object.entries(T.tracking).filter(([k]) => parseFloat(k) <= 14 && !/normal|0px/.test(k))` is
      empty, except all-caps runs.
- [ ] `T.capsUntracked` is empty.
- [ ] **eye** Count all-caps eyebrows in the full-page screenshot: ≤ 3.
- [ ] **grep** `rg 'letter-spacing' src/**/code*,src/**/*pre*` returns nothing.
- [ ] **grep** if the stack starts `-apple-system` or the face is a Display cut, `rg
      'letter-spacing:\s*-' ` over heading styles returns nothing.

**Numerals**
- [ ] `T.numbersProportional` contains only numbers that neither stack in a column nor update in
      place. Everything else fails.
- [ ] **eye** Screenshot the widest numeric column and draw a vertical line down the decimal points.
- [ ] **eye** Cents in the screenshot are the same height as the dollars — no raised, shrunk cents.
- [ ] **grep** `rg 'slashed-zero'` hits ID/key components and misses money components.

**Colour**
- [ ] `Object.keys(T.colors).length` — exactly 3 neutral values, plus link and danger.
- [ ] `node tools/contrast.mjs` (or any WCAG calc) on the tertiary token against its **actual**
      background returns ≥ 4.5.
- [ ] **eye** For each grey in the screenshot, name the importance difference it expresses. Any that
      encodes kind, state or disabledness instead is wrong.

**Wrapping and overflow**
- [ ] **grep** `rg 'text-wrap:\s*balance|text-balance'` hits only headings and blocks capped under
      6 lines. Everything else is `pretty`.
- [ ] **console** `[...document.querySelectorAll('p')].map(p => p.getBoundingClientRect().width /
      parseFloat(getComputedStyle(p).fontSize))` — every value under ~40 (≈ 68ch).
- [ ] **grep** `rg 'max-width.*ch'` is on `p`/`li`/heading rules, not on `article`, `main` or a
      layout container.
- [ ] **grep** `rg '(?<!-webkit-)line-clamp'` returns nothing (unprefixed does not work).
- [ ] **grep** `rg 'overflow-wrap:\s*anywhere'` — every hit is on a box with an explicit width, not
      a flex item, grid track or `min-content` box.
- [ ] `T.overflowing` is empty. Then paste a 72-character hyphen-free email into every free-text
      field and re-run it.
- [ ] `T.truncNoTitle` is empty.
- [ ] **eye** Screenshot a truncated identifier: the ellipsis is in the middle, both ends visible.

**Face and loading**
- [ ] **grep** every `@font-face` with a real `src` has a sibling `@font-face` carrying
      `size-adjust`/`ascent-override`, or the page sets `font-display: optional`.
- [ ] **console** `measure('font-variation-settings:"opsz" 14') !==
      measure('font-variation-settings:"opsz" 32')` — if equal, delete `font-optical-sizing` and
      hand-track the display sizes.
- [ ] **grep** `rg 'font-family:\s*monospace|,\s*monospace\s*;'` — bare `monospace` never appears
      without an explicit `font-size` in px on the same rule.
- [ ] **grep** every non-Latin `@font-face` has a `unicode-range`; `rg ':lang\('` sets ≥ 1.6
      line-height for `hi`, `ja`, `th`, `ar` and resets `letter-spacing` for CJK and Arabic.
- [ ] **eye** Render at 1440 and 390, open both PNGs, look at them. Then render one screen in German
      and one in Hindi and look at those.

**The 2026 tells, as greps**
- [ ] `rg 'bg-clip-text|background-clip:\s*text'` returns nothing on headings.
- [ ] `rg 'italic' ` returns no single-word serif italic inside a sans headline.
- [ ] `rg 'tracking-tight'` — not applied at 14px or below.
- [ ] `rg 'text-muted-foreground' | wc -l` is smaller than the number of components, not larger.
- [ ] `rg 'GeistSans|Space_Grotesk|Instrument_Serif|Sora|Syne|Fraunces'` — if it hits, I can state
      in one sentence why this face and not the previous three.
---

## Direction pass (2026-09)

Re-probed with Playwright against Chromium 148 headless at 1440×900, real font files loaded from
the sites that license them. Live sites re-measured: **vercel.com/docs/functions**,
**docs.stripe.com/payments/quickstart**, **linear.app**, **www.radix-ui.com/themes/docs**,
**supabase.com/docs**. Font metrics re-measured against Inter Variable and Berkeley Mono as served
by linear.app, and against the local system stack.

### Held exactly

Inter digits 362.31 / 613.28 / 644.53 and all four `tabular-nums` × `font-feature-settings`
combinations. `opsz` widths 2123.89 / 2061.66 / 1978.66 / 1937.17. Widths at 14px: Inter 297.34,
`system-ui` 287.97, Berkeley Mono 361.20, Menlo 362.44. x-heights 7.64 / 7.37 / 7.66. Weight ramp
1888.02 → 2044.98. `line-height: normal` per 100px: Inter 121, SF Pro 118, Verdana 122, Tahoma 121,
Menlo 117, Georgia 114, Arial/Helvetica/Roboto/Segoe 115. `text-box: trim-both` 38.39 → 23.28.
`OVERVIEW` 63.94 → 68.73. Label weights 102.56 / 103.66 / 104.75 / 105.83. German growth +108% /
+64% / +59% / +33% / +24% / +8%. 60ch box 603.75px and the letter-spacing deltas. Bare `monospace`
computing to 13px. Unprefixed `line-clamp` still inert; `hanging-punctuation` still unsupported.
Linear, Radix and Supabase type scales matched their table rows glyph for glyph.

### Corrected

| Was | Now | Why |
|---|---|---|
| Vercel docs h3 `14/20 w600 -0.02` | `14/20 w500 ls 0`, `#4D4D4D` | re-probed |
| Vercel dense counts 676 / 171 | 668 / 71 | re-probed |
| Stripe "13px densest (1,248 els)" | 147 els at 13, 126 at 16 | 1,248 was not a text-element count |
| Stripe inline code `14.4/26 Menlo` | `14/20 Menlo` | re-probed |
| Cap-centring "0.41px low / 0.57px low / 0.24px high" | 0.81 / 1.14 / 0.48 | the file reported the *nudge* (half the gap) in a column labelled as the gap |
| "a 64px Inter headline sits ~1.9px low" | 0.44px low at 64px, and 0.55px **high** at 20px | `opsz` redraws the metrics, so the offset is non-monotonic and changes sign |
| overflow "2 lines, 218px, 121%" | 1 line, 379px, 211% (72-char hyphen-free email) | the old string had a break opportunity; result depends on the data |
| "`overflow-wrap: anywhere` (or `break-word`)" | not interchangeable | `anywhere` collapses a `min-content` box 60.63 → 12.66px |
| "balance: zero effect on 12 lines, bails past ~6" | works through 6, dead at 8+ | cliff located |
| "every monospace measures exactly 60 units" | webfonts 60.00, Menlo 60.21 | re-probed |
| Linear marketing dense layer "14 · 13" | 12 is densest (187 els) | re-probed |

### Scopes added

Six rules were stated without limits and would have been followed off a cliff:

1. **tabular-nums** — was "every number above or below another number", enforced in the self-check
   as "every metric tile, counter and price". Now scoped to columns and in-place updates. The width
   cost is worse than the +5% average: `$11,111.11` at 13px Inter goes 50.61 → 74.34px, **+47%**. On
   a 390px trading row that truncates the price.
2. **`text-box: trim-both cap alphabetic`** — now excluded from multi-script surfaces inside
   `overflow: hidden` (trimming leaves 7.72px of ink above and 8px below the box, which is fine for
   Latin caps and clips `Ệ`, Devanagari matras and emoji), and flagged as a one-pass spacing re-tune
   rather than a drop-in.
3. **Display leading 0.85–1.10** — now scoped to bounded Latin strings of ≤ 2 lines. A 48px line at
   `line-height: 1` gives a 48px box for 59px of ink; a CMS-fed or Hindi headline clips.
4. **`max-width: 68ch`** — now explicitly on text elements, never the article container, which
   otherwise squeezes every code block and table on the page.
5. **`overflow-wrap: anywhere`** — now `break-word` by default, `anywhere` only on explicitly-sized
   boxes.
6. **All-caps tracking** — still the right way to set caps, now marked as not a licence to open
   every section with an eyebrow, which is itself a current tell.

### Anti-patterns refreshed

The five corrections were 2023-era and all still true, but the file named none of the 2026 tells.
Added as sections 6–9: **gradient headline text** (`bg-clip-text text-transparent
bg-gradient-to-r`, the loudest current tell and a hard stop for contrast measurement), the
**serif-italic accent word**, **unedited shadcn defaults** (`text-muted-foreground` on every
non-heading, one `tracking-tight` at every size, global `text-balance`, `text-7xl` hero), and the
**reflexive all-caps eyebrow**. Section 5 was rewritten: the unchosen face is no longer only Inter —
current audits name a "tasteful free font" cluster (Space Grotesk, Sora, Syne, Instrument Serif,
Fraunces, Geist) and untouched `next/font` Geist, and this file recommends faces one step from it,
which is now noted in place.

Sources for the current tells: [Developers Digest — AI Design Slop: 16 Patterns That Out Your App
as Vibe-Coded](https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it),
[avoid-ai-design tells catalog](https://github.com/funboy322/avoid-ai-design),
[925 Studios — AI Slop Fonts and Gradients](https://www.925studios.co/blog/ai-slop-design-tells).

### Cut

The changelog paragraph about the previous revision's two wrong numbers; "even good systems leak";
"Invisible in the good sense and the bad sense"; "the joke is that adopting it is a strong
statement"; "Underrated and free"; "No warmth to give"; "the most-imitated developer UI in the
world"; "Nobody names it; everybody feels it as cheap"; "Highest-return single rule here"; "Read
that honestly"; "and note the order changed based on measurement". Each was a sentence that changed
no decision.

### Self-check rewritten

Every item is now a grep, a DevTools console expression, or a named screenshot check. The list opens
with one console block that answers eleven items at once and leaves its result on `window.T`. Items
that previously required judgement — "nothing reads as important because nothing is quiet", "I can
name which surfaces use which" — are now counts, filters and diffs. A final section greps for the
2026 tells directly.

### Known gap

attio.com timed out during this pass; its table row is carried from the 2026-09 measurement and is
unverified. The Linear docs row was already carried from a dead URL and remains so.
