# Color systems for interfaces

**Measured:** 2026-09. Every hex, ratio and OKLCH triple below was read from a live product with
Playwright (computed styles or the shipped stylesheet), or computed from those values with the
scripts described at the end. Nothing here is recalled from memory.

The single most useful fact in this file, and the one that should reframe everything else:

> On Linear's homepage at 1440px — dark theme, including a full in-product screenshot —
> **0.04% of pixels have OKLCH chroma above 0.04.** On GitHub's issue list at 1440px, a dense
> light-mode list with user-authored label pills, it is **0.86%**. For comparison, Vercel's Geist
> *color documentation page* — a page whose entire content is color swatches — is 6.45%.

Product interfaces made by good designers are 99% neutral. Not "mostly neutral." Ninety-nine
percent. And note what the 6.45% figure means: a documentation page consisting of nine ten-step
color ramps, rendered as ~90 filled swatches, is still 93.5% grayscale. If you take one thing from
this file, take the number.

---

## If you only apply five things

1. **Build the neutral ramp first, and make the interface work in grayscale before you add any hue.**
   10–12 steps, spaced by perceptual lightness, not by hex arithmetic. If the screen is not legible
   and hierarchical with zero color, color will not save it.
2. **Never use `#000` or `#fff` for text.** Light mode: text at `oklch(0.24–0.29 …)`, page at
   `#fff` or `oklch(0.99 …)`. Dark mode: page at `oklch(0.14–0.18 …)`, text at
   `oklch(0.95–0.98 …)`. Measured: Linear `#282a30` on `#fff`; Radix `#1c2024`; Primer `#1f2328`;
   Notion black-at-90%-alpha. Nobody ships `#000`.
3. **One accent. Allowed uses: primary action, current selection, focus ring, active nav item, link.
   That is the whole list.** Not headings, not icons, not borders, not card backgrounds, not
   "featured" badges. If you catch yourself needing a second accent, you need a neutral instead.
4. **Semantic colors are chosen by target lightness, not by hue name.** Pick L ≈ 0.55 for
   on-light and L ≈ 0.66–0.72 for on-dark, then take whatever chroma the gamut allows at that
   lightness. Measured across Primer, Wise and Geist, every success/warning/danger triple lands at
   L 0.51–0.58 with chroma ranging 0.117 (yellow) to 0.206 (red). `#ff0000 / #ffff00 / #00ff00` are
   at L 0.63 / 0.97 / 0.87 — which is why naive traffic-light palettes look broken.
5. **Dark mode is not an inversion. Elevation goes up in lightness (+3 to +5 L per level), borders
   carry the structural load, and text-role accents get lighter by ΔL +0.11 to +0.17 while
   fill-role accents stay put.** Measured: Geist's border alpha goes `#00000014` (8%) →
   `#ffffff25` (15%); Primer's `fgColor-accent` goes `#0969da` (L 0.540) → `#4493f8` (L 0.663)
   while `bgColor-accent-emphasis` moves only `#0969da` → `#1f6feb` (L 0.540 → 0.569).

---

## The measured reference table

### Neutral ramps, side by side (OKLCH, light theme)

| Role | Linear | Vercel Geist | Stripe Sail | GitHub Primer | Radix `slate` | Notion `tatami` | Mercury (beige) |
|---|---|---|---|---|---|---|---|
| Page ground | `#fff` L 100 | `#fff` L 100 | `#f7fafc` L 98.3 | `#fff` L 100 | `1 #fcfcfd` L 99.1 | `#fff` | `#fbfcfd` L 99.1 |
| Subtle surface | `#f9f8f9` L 98.0 | `#fafafa` L 98.5 | — | `#f6f8fa` L 97.8 | `2 #f9f9fb` L 98.3 | `#f9f9f8` L 98.2 | `#f4f5f9` L 97.1 |
| Component bg | `#f4f2f4` L 96.3 | `#f2f2f2` L 96.1 | `#e3e8ee` L 92.9 | `#f6f8fa` L 97.8 | `3 #f0f0f3` L 95.6 | `#f6f5f4` L 97.1 | `#ededf3` L 94.8 |
| … hover | `#eeedef` L 94.7 | `#ebebeb` L 94.0 | — | `#eff2f5` L 96.0 | `4 #e8e8ec` L 93.2 | — | `#dddde5` L 90.0 |
| … active | `#e9e8ea` L 93.2 | `#e6e6e6` L 92.5 | — | `#e6eaef` L 93.5 | `5 #e0e1e6` L 91.0 | — | `#c3c3cc` L 82.0 |
| Border subtle | `#e9e8ea` L 93.2 | `#00000014` α8% | — | `#d1d9e0b3` L 88.1 | `6 #d9d9e0` L 88.7 | `#00000014` α8% | `#c3c3cc` L 82.0 |
| Border default | `#e4e2e4` L 91.5 | `#0000001a` α10% | `#c0c8d2` L 83.0 | `#d1d9e0` L 88.1 | `7 #cdced6` L 85.3 | `#0000001a` α10% | `#535461` L 45.0 ¹ |
| Border strong | `#dcdbdd` L 89.3 | `#00000036` α21% | — | `#818b98` L 63.3 | `8 #b9bbc6` L 79.4 | — | `#272735` L 27.9 ¹ |
| Text disabled | `#86848d` L 61.8 | `#00000057` α34% | `#a3acb9` L 74.1 | `#818b98` L 63.3 | `9 #8b8d98` L 64.5 | `#0000004d` α30% | `#70707d` L 55.0 |
| Text tertiary | `#6f6e77` L 54.2 | `#8f8f8f` L 65.0 | `#687385` L 55.3 | — | `10 #80838d` L 61.1 | — | — |
| Text secondary | `#3c4149` L 37.4 | `#4c4c4c` L 41.7 | `#4f566b` L 45.5 | `#59636e` L 49.5 | `11 #60646c` L 50.2 | `#0000008a` α54% | `#535461` L 45.0 |
| Text primary | `#282a30` L 28.5 | `#171717` L 20.5 | `#3c4257` L 38.2 | `#1f2328` L 25.4 | `12 #1c2024` L 24.1 | `#000000e5` α90% | `#272735` L 27.9 |
| Ramp **hue** | 291–325 (pink→violet) | 0, chroma **0.000** | 237–274 (blue) | 244–255 (blue) | 264–286 (violet) | 61–106 (**warm**) | 88–106 (**warm**) |
| Ramp **max chroma** | 0.015 | **0.000** | 0.044 | 0.023 | 0.016 | 0.010 | 0.021 |

¹ Mercury's `--border-default` and `--border-emphasized` really are that dark — they are input
outlines and focus-adjacent edges on a near-white page, not card dividers. Its card-divider
equivalent is `--border-subdued: #c3c3cc` (L 82.0). Worth noting because "border" means different
things in different systems: check what a token is *used on* before copying its value.

**Read that last row.** The largest chroma anywhere in six of these seven neutral ramps is under
0.02 — about 1/12th of a saturated brand color. Stripe is the outlier at 0.044, and it is the one
whose grays visibly read as "blue." Vercel's gray is literally `hsla(0, 0%, X%)` — chroma exactly
zero, no tint at all.

### The same ramps, dark theme

| Role | Linear dark | Geist dark | Primer dark | Radix `slate` dark |
|---|---|---|---|---|
| Page ground | `#08090a` L 13.9 | `#000` L 0 **(!)** | `#0d1117` L 17.6 | `1 #111113` L 17.9 |
| Content surface | `#0f1011` L 17.2 | `#0a0a0a` L 14.5 ² | `#151b23` L 22.0 | `2 #18191b` L 21.3 |
| Component bg | `#1c1c1f` L 22.8 | `#1a1a1a` L 21.8 | `#212830` L 27.4 | `3 #212225` L 25.2 |
| … hover | `#232326` L 25.7 | `#1f1f1f` L 23.9 | `#262c36` L 29.2 | `4 #272a2d` L 28.3 |
| … active | `#28282c` L 27.8 | `#292929` L 28.1 | `#2a313c` L 31.1 | `5 #2e3135` L 31.2 |
| Border subtle | `#23252a` L 26.4 | `#ffffff17` α9% | `#3d444db3` L 38.4 @70% | `6 #363a3f` L 34.7 |
| Border default | `#34343a` L 32.7 | `#ffffff25` α**15%** | `#3d444d` L 38.4 | `7 #43484e` L 39.9 |
| Border strong | `#3e3e44` L 36.6 | `#ffffff3d` α24% | `#656c76` L 52.9 | `8 #5a6169` L 48.9 |
| Text disabled | `#62666d` L 50.9 | `#ffffff8a` α54% | `#656c76` L 52.9 | `9 #696e77` L 53.7 |
| Text secondary | `#8a8f98` L 64.9 | `#a1a1a1` L 70.9 | `#9198a1` L 67.7 | `11 #b0b4ba` L 76.9 |
| Text primary | `#f7f8f8` L 97.8 | `#ededed` L 94.6 | `#f0f6fc` L 97.0 | `12 #edeef0` L 94.9 |

² Vercel is the only measured product whose dark page ground is pure `#000` (`--ds-background-200`). Every piece of content sits on `--ds-background-100` = `#0a0a0a` above it, and body text is `#ededed`, not white. Read that as: if you use a black page, do not also use white text.

### Accents, one row per product

| Product | Light accent | Dark accent | White-on-accent (WCAG 2) | Note |
|---|---|---|---|---|
| Linear | `#7070ff` oklch(0.622 0.207 278) | `#5e6ad2` oklch(0.567 0.159 275) | 3.85 → **4.70** | goes *darker* + desaturates in dark, because dark is the fill role |
| Stripe | `#635bff` oklch(0.578 0.235 278) | — | 4.70 | |
| Mercury | `#5266eb` oklch(0.570 0.200 272) | — | 4.71 | `--surface-magic` (the AI surface) is **the same token** |
| Primer fill | `#0969da` oklch(0.540 0.191 258) | `#1f6feb` oklch(0.569 0.202 260) | 5.19 / 4.63 | fill lightness barely moves |
| Primer text | `#0969da` L 0.540 | `#4493f8` L 0.663 | — | text role gains **ΔL +0.123** |
| Geist focus | `#0072f5` oklch(0.579 0.215 258) | `#52a8ff` oklch(0.717 0.152 251) | 4.44 | the biggest measured desaturation: ΔC −0.062 |
| Tailwind `violet-500` | `#8b5cf6` oklch(0.606 0.219 293) | — | **4.23 — fails AA** | the AI default |

### Semantic status colors: measured, versus the naive version

| | OKLCH | Contrast on white |
|---|---|---|
| naive `#ff0000` | L 0.628 C 0.258 H 29 | 4.00 |
| naive `#ffff00` | L **0.968** C 0.211 H 110 | **1.07 — invisible** |
| naive `#00ff00` | L **0.866** C 0.295 H 143 | 1.37 |
| Primer danger `#d1242f` | L 0.557 C 0.206 H 25 | 5.24 |
| Primer attention `#9a6700` | L 0.554 C **0.117** H 75 | 4.87 |
| Primer success `#1a7f37` | L 0.552 C 0.145 H 148 | 5.08 |
| Wise negative `#cf2929` | L 0.556 C 0.201 H 27 | 5.25 |
| Wise warning `#9a6500` | L 0.550 C 0.117 H 73 | 4.96 |
| Wise positive `#008026` | L 0.522 C 0.160 H 146 | 5.10 |
| Geist red-900 | L 0.550 C 0.197 H 24 | 5.38 |
| Geist amber-900 | L 0.520 C 0.135 H 52 | 5.80 |
| Geist green-900 | L 0.515 C 0.119 H 150 | 5.32 |

Three independent design systems, built by different teams, converged on **L 0.51–0.56 for all
three status colors** and let chroma fall where the gamut allows. That's the algorithm.

### WCAG 2 vs APCA on identical pairs

| Pair | WCAG 2 | APCA Lc |
|---|---|---|
| Linear light `#282a30` on `#fff` | 14.34:1 | 101 |
| Linear light `#6f6e77` on `#fff` | 5.03:1 | **75** |
| Linear light `#86848d` on `#fff` | 3.68:1 | 65 |
| Linear dark `#f7f8f8` on `#08090a` | 18.73:1 | −103 |
| Linear dark `#8a8f98` on `#08090a` | **6.13:1** | **−42** |
| Linear dark `#62666d` on `#08090a` | 3.45:1 | −23 |
| Radix `slate-11` on `slate-2`, light | 5.65:1 | 76 |
| Radix `slate-11` on `slate-2`, **dark** | **8.45:1** | **−60** |
| white on `#3b82f6` (Tailwind blue-500) | 3.68:1 | −69 |
| white on `#8b5cf6` (violet-500) | 4.23:1 | −74 |
| `#fff` on `#000` | 21.00:1 | −108 |

Look at Linear's tertiary text: **5.03:1 in light mode reads better (APCA 75) than 6.13:1 in dark
mode (APCA 42).** WCAG 2 systematically over-rewards light-text-on-dark. Radix compensates by
holding APCA roughly constant across themes and letting WCAG float from 5.65 to 8.45 — a 50%
increase in "official" contrast to buy the same perceived readability.

---

## Decision 1 — how much color to use at all

The default failure is not choosing a bad palette. It is applying a fine palette to too many
things. Run this against your own screenshot before you argue with anything else in this file:

```python
# pip install pillow ; then: python3 chroma.py shot.png
from PIL import Image; import sys, math
def lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
def chroma(r, g, b):
    R, G, B = lin(r), lin(g), lin(b)
    l = (0.4122214708*R + 0.5363325363*G + 0.0514459929*B) ** (1/3)
    m = (0.2119034982*R + 0.6806995451*G + 0.1073969566*B) ** (1/3)
    s = (0.0883024619*R + 0.2817188376*G + 0.6299787005*B) ** (1/3)
    return math.hypot(1.9779984951*l - 2.4285922050*m + 0.4505937099*s,
                      0.0259040371*l + 0.7827717662*m - 0.8086757660*s)
im = Image.open(sys.argv[1]).convert('RGB'); im.thumbnail((700, 700))
px = list(im.getdata()); n = len(px)
print(f"chromatic (C>0.04): {100*sum(chroma(*p) > 0.04 for p in px)/n:.2f}%")
print(f"strong    (C>0.10): {100*sum(chroma(*p) > 0.10 for p in px)/n:.2f}%")
```

**Targets, measured from real products at 1440px:**

| Surface | Chromatic pixel share |
|---|---|
| Dense product UI (Linear app view, dark) | 0.04% |
| Dense product UI with user-generated color (GitHub issues) | 0.86% |
| Product marketing page | 1–3% |
| A page whose *subject* is color (Geist color docs) | 6.45% |
| **Typical AI-generated dashboard** | 8–20% |

If you are over 3% on a product screen, you have colored something that should have been neutral.
The usual culprits, in order of frequency: card headers, icons, badges that aren't status,
"featured" treatments, chart fills, section dividers, and the gradient behind the hero.

**The generic alternative this replaces:** picking a 5-color palette and then finding a place to
use all five. Real systems have one accent and a status set that only appears when something is
actually wrong.

---

## Decision 2 — building the neutral ramp

### How many steps

**10–12.** Fewer and you can't distinguish page/surface/hover/active/border-subtle/border in light
mode. More and you're inventing distinctions nobody perceives.

Radix uses 12 and assigns each an explicit job — this is the best-documented mapping in the
industry and worth copying wholesale:

| Step | Job |
|---|---|
| 1 | App background |
| 2 | Subtle background (striped rows, code blocks, cards on a tinted page) |
| 3 | Component background, rest |
| 4 | Component background, hover |
| 5 | Component background, pressed/selected |
| 6 | Border, non-interactive (separators, card outlines, headers) |
| 7 | Border, interactive component |
| 8 | Border, strong / focus ring |
| 9 | Solid fill (this is the accent's brand color in a hue scale) |
| 10 | Solid fill, hover |
| 11 | Low-contrast text — Radix guarantees APCA Lc ≥ 60 on step 2 |
| 12 | High-contrast text — Radix guarantees APCA Lc ≥ 90 on step 2 |

I verified both guarantees: `slate-11` on `slate-2` is Lc 76.2 light / 60.3 dark; `slate-12` is
99.8 / 95.5.

### How to space the steps

**Not evenly.** Measured `slate` light deltas in OKLCH lightness ×100:

```
1→2  0.9    2→3  2.7    3→4  2.4    4→5  2.2    5→6  2.3    6→7  3.4
7→8  5.9    8→9 14.9    9→10 3.5   10→11 10.8  11→12 26.1
```

Surfaces and borders (1–8) are packed into ~20 points of lightness. Then a cliff to the solid
fill, and text lives at the far end. This shape is correct and deliberate: **an interface needs
many closely-spaced values near the background and two or three far away for text. It needs almost
nothing in the middle.**

Linear's light theme makes this brutally explicit — it has *zero* tokens between L 61.8 and L 89.3.
A 27-point hole in the middle of the ramp, and the product is fine.

Contrast with Tailwind v4's neutral ramp deltas:

```
50→100 1.5   100→200 4.8   200→300 5.2   300→400 16.2   400→500 15.2
500→600 11.7  600→700 6.8   700→800 10.2  800→900 6.4   900→950 6.0
```

**Contrarian point: Tailwind's ramp is not a UI ramp, and using it as one is why so much output
looks the same.** The 16.2-point hole between `300` and `400` means there is no value between
"visible border" and "clearly a mid-gray" — so every Tailwind interface uses `gray-200` for every
border and `gray-500` for every muted text, because those are the only two steps that work. That
uniformity is a fingerprint. Radix's 6/7/8 (88.7 / 85.3 / 79.4) gives you three distinguishable
border weights; Tailwind gives you one.

If you stay on Tailwind, define your own extra steps rather than reaching for `gray-400`:

```css
@theme {
  --color-n-250: oklch(0.900 0 0);  /* border-strong: between 200 and 300 */
  --color-n-350: oklch(0.800 0 0);  /* the missing step */
}
```

### Why `#000` and `#fff` are usually wrong

Nobody serious ships either as *text*:

- Linear light text: `#282a30` (L 0.285)
- Radix `slate-12`: `#1c2024` (L 0.241)
- Primer `fgColor-default`: `#1f2328` (L 0.258)
- Mercury `text-default`: `#272735` (L 0.279)
- Notion `text-normal`: black at **90% alpha** = `#1a1a1a` effective (L 0.209)
- shadcn's default theme: `--foreground: lab(0% 0 0)` — **pure `#000`.** This is the tell.

Pure black text on pure white is 21:1 / APCA 108. It's not "too much contrast" in an abstract
sense; it's that at 21:1 the edges of glyphs shimmer against the paper-white ground on an LCD,
and every product that has done real typographic work backs off to 14–17:1.

The white end is more forgiving: `#fff` as a *page or card background* is fine and universal
(Linear, Primer, Mercury elevated surfaces all use it). It's white *text on a dark ground* that
causes trouble — see Decision 6.

### Warm vs cool neutrals, and what each reads as

Measured OKLCH hue of the neutral ramp:

| Ramp | Hue | Max chroma | Reads as |
|---|---|---|---|
| Vercel Geist | none (chroma **0**) | 0.000 | engineered, clinical, brand-free |
| Notion `tatami` | 61–106 (yellow-green) | 0.010 | paper, document, calm |
| Mercury `beige` | 88–106 (yellow) | 0.021 | premium, warm-institutional |
| Radix `sand` | 68–107 | 0.010 | editorial, humane |
| Radix `slate` | 264–286 (violet) | 0.016 | modern-neutral, default-safe |
| Primer | 247–258 (blue) | ~0.018 | technical, dense |
| Stripe Sail | 253–274 (blue) | **0.044** | corporate-serious, distinctly "blue gray" |
| Linear light | 291–325 (pink-violet) | 0.015 | — subliminal at this chroma |

**The rule:** stay under chroma 0.02 unless you mean it. Stripe at 0.044 is a deliberate,
recognizable choice — `#3c4257` is visibly navy — and it works because Stripe's whole identity is
blue. At 0.005–0.015 the tint is subliminal: users won't name it, but a warm ramp makes the same
layout feel less clinical and a cool ramp makes it feel more technical.

Curious detail worth noticing: Linear's *surfaces* are hue 308–325 (pink) while its *text* is
259–296 (blue-violet). Warm paper, cool ink. At chroma 0.003 vs 0.014 nobody can name it, but it's
there.

**When warm is wrong:** monitoring dashboards, code editors, anything where a warm cast will fight
with syntax highlighting or with amber/red status colors. **When cool is wrong:** anything selling
comfort, wellness, food, or money-you-own (Mercury went beige for exactly this reason).

---

## Decision 3 — from a palette to a semantic system

A palette is `gray-100 … gray-900`. A semantic system is `--surface-raised`, `--border-subtle`,
`--text-secondary`. **Components must only ever reference semantic names.** The moment a component
says `gray-200`, the dark theme becomes a find-and-replace job instead of a token swap.

### The role set that actually shows up in shipped systems

Here is Mercury's complete semantic layer, which is the tightest one I measured:

```
surface-default / -hover / -active     #ededf3 #dddde5 #c3c3cc
surface-elevated / -hover / -active    #ffffff #fbfcfd #f4f5f9
surface-input / -hover / -disabled     #fbfcfd #ffffff #ededf3
surface-emphasized / -hover / -active  #5266eb1a #5266eb29 #5266eb38   ← accent at 10/16/22% alpha
surface-inverted                       #1e1e2a
surface-primary / -hover / -active     #5266eb #4354c8 #3442a6
background-default / -secondary        #fbfcfd #f4f5f9

border-subdued / -default / -emphasized  #c3c3cc #535461 #272735
border-input / -focus / -error           #70739338 #5266eb #d0327538

text-emphasized / -default / -subdued / -disabled   #1e1e2a #272735 #535461 #70707d
text-primary (= accent) / -on-primary / -error       #5266eb #ffffff #d03275

icon-emphasized / -default / -subdued / -disabled   #1e1e2a #272735 #535461 #70707d
```

Note that the icon family ships the *same four values* as the text family. Mercury defines them
separately anyway, so that icons can be optically corrected later without touching type — the token
split is cheap and the migration isn't.

**How many of each you actually need:**

| Role family | Count | Notes |
|---|---|---|
| Surfaces | **3** + states | `sunken` / `default` / `raised`. A fourth is almost always a mistake. |
| Borders | **3** | `subtle` (dividers, non-interactive) / `default` / `strong` (focus, hover). |
| Text | **4** | `primary` / `secondary` / `tertiary` / `disabled`. Mercury ships 4. Linear ships 4. Notion ships 4. |
| Icon | 0 or 4 | Only split from text if your icons are optically lighter than your text (they usually are at small sizes). |
| Accent roles | **4** | `fill`, `fill-hover`, `text` (the link/foreground version), `wash` (10% alpha selection tint). |
| Status | 3–4 × 3 | `success` / `warning` / `danger` (+ `info`), each with `text` / `fill` / `wash`. |

**Two structural things worth stealing:**

**1. Wise's three-values-per-status rule.** Every status role has *three separate colors*, not one
with opacity: a text value dark enough to pass AA, a brighter interactive/fill value, and a wash.
Measured from `wise.com`:

```css
--color-content-positive:     #008026;                   /* text: 5.10:1 on white */
--color-interactive-positive: #2EAD4B;                   /* dots, bars, fills */
--color-background-positive:  rgba(54,199,151,0.10196);  /* wash — a THIRD hue */
```

Note the wash is a *different, brighter* hue than either. Deriving the wash by fading the text
color gives you a muddy, gray-green tint; deriving it from a brighter sibling gives you a wash that
still reads as green at 10%.

**2. Notion's alpha ramp.** Notion's entire `tatami` neutral system is alpha-black and alpha-white,
not opaque grays:

```
alpha-black:  5% 10% 20% 30% 54% 59% 75% 90% 95%
alpha-white:  5% 10% 20% 30% 50% 66% 75% 85% 95%
text-strong = black 95%   text-normal = black 90%
text-muted  = black 54%   text-disabled = black 30%
border-base = black 10%  (dark: white 10–20%)
```

Alpha tokens compose: the same `border-base` works on a white page, on a `#f6f5f4` card, and on a
colored callout, with no new tokens. **The cost is that they're unstable over images and video, and
they can't be color-picked against a spec.** Use alpha for borders, dividers, hover overlays and
scrim; use opaque values for text and for any surface that stacks.

### Elevation

**Most elevation should be a border, not a shadow.** Vercel says this in tokens: in dark mode
every legacy `--shadow-*` token collapses to a border. Literally — `--shadow-smallest`,
`--shadow-small`, `--shadow-medium`, `--shadow-large`, `--shadow-sticky` are all
`0 0 0 1px #333` in dark theme, and `--shadow-hover` is `0 0 0 1px #fff`. Their real elevation
token is named for what it is:

```css
--ds-shadow-border-base:  0 0 0 1px #00000014;   /* light: 8% black */
                          0 0 0 1px #ffffff25;   /* dark:  15% white */
--ds-shadow-border-small: 0 0 0 1px …, 0px 2px 2px #0000000a;
--ds-shadow-menu:         0 0 0 1px …, 0px 1px 1px …, 0px 4px 8px -4px …, 0px 16px 24px -8px …;
```

Only overlays that genuinely float — menus, modals, tooltips, toasts — get a real shadow, and even
then the border is the first layer. **Caveat, and it's a real one:** `box-shadow` is stripped
entirely under `forced-colors: active` (I tested this — see Decision 10). A card whose only outline
is a shadow-border disappears in Windows High Contrast. Use a real `border` on anything structural.

---

## Decision 4 — the accent

**One.** The allowed uses, exhaustively:

- primary action button
- current selection / active nav item
- focus ring
- links in body text
- the one live/loading indicator

**Not allowed:** headings, icons in general, section borders, card backgrounds, "featured" badges,
avatar backgrounds, chart series 1, hero gradients, illustrations, hover states of neutral things.

The reason to be this strict: an accent is a *pointer*. Its entire job is "look here." Used
twelve times on a screen it points nowhere, and you've spent your one loud instrument on
decoration. Ramp's page uses chartreuse `#E1FC53` exactly twice — one secondary CTA and one count
badge — and the primary CTA is black (measured in `references/fintech-and-trust.md`).

### Splitting the accent into two roles

This is the mistake most systems make and the fix is small. Your accent needs **two** values,
because it does two structurally different jobs:

| Role | Constraint | Target |
|---|---|---|
| **Fill** (button background, selected row) | white text must pass on it | L 0.54–0.58 |
| **Text** (links, active icons, focus ring on light) | must pass on the page | L 0.50–0.56 light, L 0.65–0.72 dark |

Primer separates them explicitly and the measured values prove why:

```
bgColor-accent-emphasis   light #0969da (L 0.540)  →  dark #1f6feb (L 0.569)   ΔL +0.03
fgColor-accent            light #0969da (L 0.540)  →  dark #4493f8 (L 0.663)   ΔL +0.12
```

Same token in light, different tokens in dark. The fill barely moves because it still carries white
text; the foreground jumps because it now sits on a dark ground.

Honest caveat: **Linear's own link color fails WCAG AA.** `#7070ff` on white is 3.85:1 (needs 4.5).
Great products ship brand-colored links that fail. If your accent's light-mode text version lands
below 4.5:1, either darken it for the text role only, or accept the failure knowingly and don't
also use it for the only cue that a control is interactive.

### Choosing the hue

Blue-violet 255°–285° is where almost everyone lands (Linear 275–278, Stripe 278, Mercury 272,
Primer 258, Geist 258). That is not a coincidence — at L 0.55 blue holds high chroma, reads as
"interactive" from decades of hyperlink convention, and is the safest hue under deuteranopia and
protanopia.

**It is also, therefore, the most generic possible choice.** If you want the interface not to look
like everything else, moving off 270° is the single cheapest differentiator:

| Hue | At L 0.55 | Reads as | Watch out |
|---|---|---|---|
| 25–40 (red-orange) | C up to 0.20 | urgent, retail, consumer | collides with `danger` |
| 55–80 (amber) | C max ~0.13 | warm, physical, craft | collides with `warning`; can't go light |
| 145–165 (green) | C max ~0.15 | money, growth, health | collides with `success` |
| 190–210 (teal) | C ~0.13 | calm, medical, infra | low chroma ceiling; can look washed |
| 255–285 (blue-violet) | C up to 0.24 | software, trust, default | generic |
| 300–330 (magenta) | C up to 0.24 | creative, bold | reads consumer/playful |

If you pick a hue that collides with a status color, the fix is to move the status color, not the
brand. Mercury did exactly this: its error color is `#d03275` at OKLCH hue **0.2°** — the very
edge of red into pink — and it sits at L 0.580 C 0.199, which is *the same lightness and chroma as
its primary* `#5266eb` (L 0.570 C 0.200). Only hue differs. That is a system where somebody
actually did the math.

---

## Decision 5 — semantic status colors

### Why the naive red/yellow/green is a trap

Three reasons, all measurable:

1. **Pure hues have wildly different lightness.** `#ff0000` L 0.628, `#00ff00` L 0.866,
   `#ffff00` L 0.968. On white, contrast is 4.00 / 1.37 / **1.07**. Yellow is functionally
   invisible. So people "fix" it by darkening yellow into brown and now the three don't look like
   a set.
2. **Green and yellow have a hard chroma ceiling at usable lightness.** At L 0.55 you can get red
   to chroma 0.21 but green only to ~0.15 and yellow only to ~0.12. If you insist on equal
   saturation you must break lightness, and then contrast breaks.
3. **Red/green is the exact axis that ~6% of men cannot distinguish.** A status system whose only
   cue is red-vs-green is unusable for them.

### The algorithm that works

**Fix lightness, let chroma float.**

```css
/* on-light surfaces: all three at L ≈ 0.55 */
--status-danger-text:  oklch(0.55 0.20  25);   /* red   — chroma ceiling ~0.21 */
--status-warning-text: oklch(0.55 0.12  75);   /* amber — chroma ceiling ~0.13 */
--status-success-text: oklch(0.55 0.15 148);   /* green — chroma ceiling ~0.15 */
--status-info-text:    oklch(0.55 0.19 258);

/* fills that carry white text: same L, no change needed */
--status-danger-fill:  oklch(0.55 0.20  25);

/* washes: brighter sibling at ~10% alpha, NOT the text color faded */
--status-danger-wash:  oklch(0.65 0.22  25 / 0.12);
```

Verify: this is exactly where Primer (0.557/0.554/0.552), Wise (0.556 / 0.550 / 0.522) and Geist
(0.550/0.520/0.515) independently landed.

**In dark mode, raise all three to L 0.66–0.72 and keep chroma.** Primer measured:
`fgColor-danger` 0.557 → 0.665; `fgColor-attention` 0.554 → **0.720** (and chroma actually *rises*
0.117 → 0.140). Amber has to climb furthest because it started with the least chroma to work with.

### Never encode state in hue alone

Every status needs a second channel. GitHub gets this right at scale and it's visible in the
screenshot: open issues carry a *green circle-dot glyph*, closed carry a *purple check-in-circle*,
draft a *gray outline*. Strip the color and the icons still say it.

### Contrarian: you probably need more than four semantic colors, and they are not success/warning/danger

Primer ships these semantic families, all with `emphasis` + `muted` variants:

```
accent  success  attention  severe  danger  done  sponsors  upsell
open    closed   draft      neutral
```

`open` is green, `closed` is red, `done` is **purple**, `draft` is gray, `severe` is orange
(between attention and danger). Merged-PR purple is one of the most recognizable UI colors in
software, and it exists because "success" was already taken by "open."

**The lesson: name your semantic colors after your domain's states, not after emotions.** A
deployment tool needs `queued / building / live / rolled-back`, not `info / warning / success /
danger`. Deriving them from a generic four forces you to say a rollback is "a warning," which is
both wrong and unmemorable.

---

## Decision 6 — dark mode, done properly

### Elevation via lightness, not shadow

In light mode, raised things get *lighter* and cast a shadow. In dark mode a shadow does nothing —
you cannot cast a darker shadow on an already-dark ground and see it. **So raised surfaces get
lighter.** Measured Linear dark:

```
page      #08090a  L 13.9
panel     #0f1011  L 17.2   (+3.3)
card      #1c1c1f  L 22.8   (+5.6)
control   #232326  L 25.7   (+2.9)
hovered   #28282c  L 27.8   (+2.1)
```

Roughly **+3 to +5 points of OKLCH lightness per elevation level**, tapering as you go up. Primer
does the same: 17.6 → 22.0 → 27.4 → 29.2 → 31.1.

Do not simply invert your light ramp. Inverting Linear's light theme would give you a page at
L 0 and a card at L 2.0 — a 2-point difference that is invisible. Light-mode surface steps are
~1.5–2.0 points apart because the eye discriminates finely near white; dark mode needs 3–5.

### Borders carry the structure

With shadows unavailable and surface deltas small, the border is doing most of the structural work.
How much alpha it needs is the one place the measured systems genuinely disagree:

| System | Light | Dark | Multiplier |
|---|---|---|---|
| Vercel Geist `shadow-border-base` | `#00000014` (8%) | `#ffffff25` (**15%**) | 1.9× |
| Notion `tatami` border-base | `#0000001a` (10%) | `#ffffff1a`–`#fff3` (10–20%) | 1–2× |
| Linear `border-translucent-strong` | `#00000014` (8%) | `#ffffff14` (8%) | 1× (Linear leans on opaque borders instead) |
| Primer `borderColor-translucent` | `#1f232826` (15%) | `#ffffff26` (15%) | 1× |

**The split is about what else is carrying the edge.** Geist and Notion use alpha borders as the
*only* structural edge, so they raise the alpha. Linear and Primer keep the same alpha but also
ship opaque border tokens (`#34343a`, `#3d444d`) that do the real work, with the translucent ones
reserved for edges over imagery.

The reason a straight 1:1 alpha swap often *looks* thin: the two directions are not symmetric in
perceptual lightness. 8% white over a `#0a0a0a` ground gives `#1e1e1e` — a **+9.0** OKLCH lightness
step. 8% black over white gives `#ebebeb` — only a **−6.0** step. So the dark border is
mathematically the *stronger* one and still often reads weaker, because the eye discriminates far
better near white. If your only edge is alpha, start at 1.5–2× and check by eye.

### Desaturate — but only the roles that need it, and less than you think

The folk advice is "desaturate accents in dark mode." The measured reality is more specific:

| Token | Light → Dark | ΔL | ΔC |
|---|---|---|---|
| Primer `fgColor-accent` | `#0969da` → `#4493f8` | **+0.123** | −0.021 |
| Primer `fgColor-danger` | `#d1242f` → `#f85149` | **+0.108** | −0.001 |
| Primer `fgColor-attention` | `#9a6700` → `#d29922` | **+0.165** | **+0.023** |
| Primer `bgColor-accent-emphasis` | `#0969da` → `#1f6feb` | +0.029 | +0.012 |
| Primer `bgColor-success-emphasis` | `#1f883d` → `#238636` | −0.006 | +0.002 |
| Geist `focus-color` | `hsl(212 100% 48%)` → `hsl(210 100% 66%)` | **+0.139** | **−0.062** |
| Linear brand | `#7070ff` → `#5e6ad2` | −0.054 | −0.049 |

**The real rule: shift lightness, not chroma.** Across Primer's five semantic pairs, chroma moves
by at most ±0.023 — noise — while foreground lightness gains +0.108 to +0.165. Only two tokens in
the table genuinely desaturate, Geist's focus ring (−0.062) and Linear's brand (−0.049), and in
both cases what changed is the token's *role*, not the theme.

Linear is the exception and it's instructive: it goes *darker*, because its dark-mode brand color
is a **fill** carrying white text. `#7070ff` with white is 3.85:1; `#5e6ad2` is 4.70:1. The roles
determine the direction, not the theme.

### Why `#000` backgrounds are usually wrong

Two mechanisms:

1. **Halation.** At maximum lightness contrast, light glyphs bleed optically into the black ground
   — an effect commonly reported as much worse by people with astigmatism. White `#fff` on `#000`
   is 21:1 / APCA −108, and none of the seven products measured here ships it: Linear runs 18.7:1,
   Vercel 17.9, Primer 17.4, Radix 16.3.
2. **You lose the bottom of your ramp.** If the page is `#000` you cannot make a *sunken* surface.
   Primer keeps `bgColor-inset: #010409` (L 10.4) below `bgColor-default: #0d1117` (L 17.6) —
   seven points of headroom for wells, code blocks and empty states.

**When `#000` is right:** OLED-first mobile (real battery savings), video/photo review tools where
any non-black frame contaminates perceived color, and cinema/media apps. Vercel is the measured
exception — its `--ds-background-200` is `hsla(0,0%,0%,1)` and body background is `rgb(0,0,0)` —
but it puts every piece of content on `--ds-background-100` at L 14.5 above that black, and its
body text is `#ededed` (L 94.6), not white. **If you use a black page, do not also use white text.**

### The dark-mode checklist

```
[ ] Page ground L 0.14–0.18, not 0.
[ ] A sunken step exists below the page ground.
[ ] Elevation steps are +3 to +5 L apart, and go UP.
[ ] Every card/panel has a visible 1px border, not just a background delta.
[ ] Borders are visible: either an opaque token (L +12 to +20 above the surface) or alpha at 1.5–2× the light value.
[ ] Body text L 0.94–0.98, not 1.0.
[ ] Accent fill kept its lightness; accent text/icon gained +0.11 to +0.17 L.
[ ] Status washes are alpha over the accent hue (#2ea04326), not opaque tints.
[ ] Images and illustrations checked — a white-background PNG will detonate the page.
```

That eighth item is Primer's dark-mode signature and it's worth calling out: in light mode
`bgColor-success-muted` is opaque `#dafbe1`; in dark it is `#2ea04326` — the success green at 15%
alpha over whatever is behind it. Opaque dark tints look like mud; alpha over a dark ground stays
chromatic.

---

## Decision 7 — OKLCH and perceptual uniformity

### What the problem actually is

In HSL, `hsl(60 100% 50%)` (yellow) and `hsl(240 100% 50%)` (blue) have the same stated
"lightness" and differ in actual luminance by roughly 15×. So a ramp built by stepping HSL
lightness produces steps that look even in some hues and wildly uneven in others — which is
precisely why a hand-built HSL palette looks fine in blue and broken in yellow.

OKLCH fixes the L axis: equal L means equal perceived lightness across all hues. Chroma is
unbounded and gamut-limited, so `oklch(0.55 0.30 148)` simply doesn't exist and gets clipped.

### What to actually do

**Author in OKLCH.** Baseline browser support has been there since 2023; it is the default in
Tailwind v4, which ships its entire palette as `oklch()`.

```css
/* A complete warm neutral ramp. Every hex below is the browser's own conversion of the
   oklch() to its left, and every contrast number was computed from that hex. Note three
   things: the steps get FURTHER apart as they get darker, chroma arcs up and back down,
   and hue drifts 90° → 64°. */
:root {
  --n-50:  oklch(0.990 0.002 90);  /* #fcfcfa   page ground              */
  --n-100: oklch(0.975 0.004 88);  /* #f8f7f4   subtle surface      Δ1.5 */
  --n-150: oklch(0.955 0.006 85);  /* #f2f0ec   component bg        Δ2.0 */
  --n-200: oklch(0.930 0.008 82);  /* #eae7e2   component hover     Δ2.5 */
  --n-250: oklch(0.900 0.011 80);  /* #e2ddd6   component active    Δ3.0 */
  --n-300: oklch(0.860 0.014 78);  /* #d6d0c7   border subtle       Δ4.0 */
  --n-400: oklch(0.800 0.016 76);  /* #c4bdb3   border default      Δ6.0 */
  --n-500: oklch(0.700 0.017 74);  /* #a59d93   border strong       Δ10  */
  --n-600: oklch(0.600 0.016 72);  /* #867f76   3.95:1  APCA 67     Δ10  */
  --n-700: oklch(0.480 0.014 70);  /* #635c55   6.58:1  APCA 83     Δ12  */
  --n-800: oklch(0.380 0.011 68);  /* #46413c  10.09:1  APCA 93     Δ10  */
  --n-900: oklch(0.270 0.008 66);  /* #292622  15.06:1  APCA 102    Δ11  */
  --n-950: oklch(0.175 0.005 64);  /* #12100e  18.98:1  APCA 105    Δ9.5 */
}
```

The dark counterpart is not the same numbers reversed. Steps near the ground are *wider*
(+3 to +4.5 instead of +1.5 to +2.5) and steps near the text end are much wider still:

```css
:root[data-theme="dark"] {
  --bg-sunken:      oklch(0.115 0.004 64);  /* #060504                            */
  --bg:             oklch(0.155 0.005 66);  /* #0e0c0a  page               Δ+4.0  */
  --surface:        oklch(0.200 0.007 68);  /* #181513  card               Δ+4.5  */
  --surface-2:      oklch(0.245 0.009 70);  /* #23201c  raised             Δ+4.5  */
  --hover:          oklch(0.275 0.010 72);  /* #2b2722                     Δ+3.0  */
  --active:         oklch(0.305 0.011 74);  /* #322e29                     Δ+3.0  */
  --border-subtle:  oklch(0.320 0.011 74);  /* #36322d                            */
  --border:         oklch(0.375 0.012 74);  /* #45403a  1.90:1 on page            */
  --border-strong:  oklch(0.450 0.013 74);  /* #5a544d  2.61:1                    */
  --text-disabled:  oklch(0.545 0.014 72);  /* #756f67  3.93:1  APCA −27          */
  --text-tertiary:  oklch(0.660 0.014 70);  /* #989189  6.27:1  APCA −43          */
  --text-secondary: oklch(0.790 0.012 68);  /* #c0b9b3 10.07:1  APCA −65          */
  --text-primary:   oklch(0.960 0.004 66);  /* #f4f1ef 17.36:1  APCA −99          */
}
```

Read the APCA column on that dark ramp: `--text-tertiary` is 6.27:1 by WCAG 2 — comfortably AA —
but Lc −43, which is *below* the Lc 60 prose floor. That is correct and intentional: tertiary is
for metadata and column labels, never for a paragraph. Linear's own dark tertiary sits at Lc −42.
If you need dark-mode body text at Lc 60+, you need `--text-secondary` at 10:1.

**Two things that are not obvious:**

**Chroma should not be constant down a ramp.** Radix `slate` runs 0.001 → 0.016 → 0.010: chroma
peaks in the middle and falls at both ends. That is correct — near white and near black, chroma
reads as a color cast; in the middle it reads as warmth. Copy the arc.

**Hue drifts on purpose.** Radix `slate` walks 286° → 248° across the ramp. Notion's warm gray
walks 106° → 62° → 106°. Perfectly constant hue is a tell that a ramp was generated, not designed.

### The tools, and when each is worth it

| Tool | What it does | Use it when |
|---|---|---|
| **Radix Colors** | 12-step scales, light + dark + alpha + P3, with documented step semantics and APCA guarantees | You want a correct system today and don't need brand-exact hues. Best default. |
| **Tailwind v4 `@theme`** | OKLCH palette + your own tokens as first-class CSS vars | You're already on Tailwind. Add the missing steps. |
| **Leonardo** (Adobe) | Generates ramps by *target contrast ratio* against a named background | Accessibility is a hard requirement and you must prove each step's ratio. |
| **Huetone** | Interactive APCA-scored palette editor with a chroma/lightness curve view | You're hand-tuning a brand ramp and need to see the gamut edge. |
| **APCA / `apca-w3`** | The contrast model | Any dark theme. See Decision 8. |
| **`color-mix(in oklch, …)`** | Runtime derivation of hover/wash values | Deriving 2–3 states from one token. Linear uses `color-mix(in lch, …)` for selection. |

**When *not* to reach for a generator:** if you're building a 6-screen internal tool, `slate` +
one accent from Radix and thirty minutes is the right answer. Generated ramps are for design
systems that will outlive the person who made them.

---

## Decision 8 — contrast: WCAG 2 vs APCA

### The honest summary

**WCAG 2's contrast formula is known to be wrong**, particularly for light-on-dark, and this is not
a fringe opinion — it is why APCA was developed as candidate guidance for WCAG 3. But WCAG 2 AA is
what regulation, procurement and audits reference today.

**So: use both. WCAG 2 AA is the floor you must clear for compliance. APCA is the number you tune
against for actual readability, especially in dark mode.**

The measured proof, again, because it's the crux:

```
Linear light  #6f6e77 on #fff       WCAG 5.03:1  APCA  75   ← reads fine
Linear dark   #8a8f98 on #08090a    WCAG 6.13:1  APCA  42   ← reads worse, despite MORE WCAG contrast
Radix slate-11 on slate-2, light    WCAG 5.65:1  APCA  76
Radix slate-11 on slate-2, dark     WCAG 8.45:1  APCA  60   ← Radix spent +50% WCAG to hold APCA
```

### Thresholds

**WCAG 2 (the compliance floor):**

| | AA | AAA |
|---|---|---|
| Body text (< 18.66px regular / < 24px bold) | 4.5:1 | 7:1 |
| Large text | 3:1 | 4.5:1 |
| UI component boundaries, focus indicators, icons carrying meaning | 3:1 | — |
| Disabled controls | exempt | — |

**APCA (the readability target):**

| Lc | Use |
|---|---|
| 90 | Body text at minimum weight/size; the "ideal" for reading |
| 75 | Body text 16px+ at weight 400 — the practical floor for prose |
| 60 | Larger text, 18px+ / medium weight; column headers, secondary text |
| 45 | Large headings, 24px+ bold |
| 30 | Non-text: disabled states, dividers, decorative rules — **the absolute floor for anything meaningful** |
| 15 | Invisible-but-present dividers |

Sign is polarity: positive = dark text on light, negative = light text on dark. Compare magnitudes.

**Practical rule of thumb**, derived from the measurements above: **in dark mode, add ~2 points of
WCAG 2 ratio to hit the same perceived readability as light mode.** If your light-mode secondary
text is 5.0:1, your dark-mode secondary text wants ~7:1, not 5:1.

### Things people get wrong

- **Contrast against the *actual* background.** A wash-tinted row is not white. Check
  `text-secondary` on `surface-hover`, not just on the page.
- **Placeholder text is text.** It needs 4.5:1. Most placeholders in the wild are ~2.5:1.
- **Focus rings need 3:1 against *both* the component and the page** — a blue ring on a blue button
  fails. This is why Geist's focus ring is two layers: `0 0 0 2px <page bg>, 0 0 0 4px <accent>`.
  The inner ring in the page color guarantees separation regardless of what's underneath.
- **Disabled text is exempt from WCAG but is not exempt from being usable.** Mercury's
  `text-disabled` is `#70707d` = 4.75:1 — comfortably readable. Ship disabled text people can read;
  the disabled-ness is communicated by the cursor and the missing hover, not by illegibility.

---

## Decision 9 — color for data visualization

Chart color is a different problem from UI color and the rules do not transfer.

### Categorical

**shadcn's default `--chart-1` through `--chart-5` are Tailwind `blue-300 / 500 / 600 / 700 / 800`
— five steps of the same hue.** I verified this by resolving the computed `lab()` values against
Tailwind's palette; they match exactly. This is a sequential ramp being used as a categorical
palette, and it's baked into the most-copied default in the ecosystem. Measured: adjacent series
differ by ΔE(OKLab) of **5.8** in normal vision — two neighbouring bars in a stacked chart are
nearly the same color.

**Use a tested set.** IBM's Design Language CVD-safe five is the best performer I measured:

```
#648FFF  oklch(0.673 0.172 266)   blue
#785EF0  oklch(0.587 0.210 286)   purple
#DC267F  oklch(0.595 0.222 358)   magenta
#FE6100  oklch(0.688 0.207  42)   orange
#FFB000  oklch(0.812 0.170  76)   gold
```

Minimum pairwise OKLab distance under simulation, higher is better:

| Palette | normal | deuteranopia | protanopia | tritanopia |
|---|---|---|---|---|
| shadcn default (blue 300–800) | 5.8 | 5.7 | 6.3 | 4.5 |
| Tailwind-500 rainbow (red/amber/green/blue/purple) | 16.3 | **0.6** | 6.5 | 8.4 |
| Okabe–Ito 7 | 15.6 | 8.0 | 9.1 | **0.6** |
| **IBM CVD-safe 5** | 11.4 | **8.9** | **12.3** | **7.3** |

Two contrarian findings in that table:

- **The Tailwind rainbow is the worst possible choice**, and it's the most common one. `blue-500`
  and `purple-500` collapse to ΔE 0.6 under deuteranopia — literally the same color for ~6% of men.
- **Okabe–Ito, the palette every accessibility guide recommends, fails tritanopia** (`#D55E00` vs
  `#CC79A7` at ΔE 0.6). It's still the right recommendation, because tritanopia affects ~0.01% of
  people versus ~6% for deuteranomaly — but "colorblind-safe" is not one property, and if you say
  a palette is safe you should say safe *for which*.

**Boundary condition on IBM's set:** `#FFB000` is 1.83:1 on white. It works for filled areas, bars
and 8px+ dots. It does *not* work for 1px lines, small text, or thin strokes on a light ground.
For line charts on white, darken the light end or add a stroke.

**Never rely on color alone in a chart.** Direct-label the series, or vary the mark (dashed vs
solid, square vs circle vs triangle). A legend that maps five colors to five names is already a
failure for the 6%, and a nuisance for everyone.

**Five is the ceiling.** Past 5–6 categories, no palette separates cleanly. Group the tail into
"Other" and let the user drill in.

### Sequential

One hue, walk lightness monotonically. Verify: sort your stops by OKLCH L and confirm the order
matches the data order. Do not walk chroma without walking L — a chroma-only ramp is invisible in
grayscale and to CVD viewers.

```css
--seq-1: oklch(0.96 0.03 258);  /* #e6f3ff   1.13:1 on white */
--seq-2: oklch(0.88 0.07 258);  /* #bbdaff   1.44:1 */
--seq-3: oklch(0.78 0.11 258);  /* #8bb9fd   2.01:1 */
--seq-4: oklch(0.66 0.15 258);  /* #5492ec   3.13:1 */
--seq-5: oklch(0.54 0.19 258);  /* #1069da   5.18:1 */
--seq-6: oklch(0.42 0.17 258);  /* #0046a7   8.63:1 */
```

Chroma rises to step 5 and then falls — not a mistake. At L 0.42 the sRGB gamut simply does not
contain chroma 0.19 at this hue, and asking for it silently clips to something you did not choose.
Walk L; let C follow the gamut.

### Diverging

Two hues, a *neutral* midpoint (not white — use your `n-100`), symmetric lightness on both arms.
**Do not use red↔green.** Blue↔orange (258° ↔ 42°) or purple↔gold (286° ↔ 76°) survive every CVD
type and both read as "opposite" without the political/traffic-light baggage.

Modern Treasury's ledger UI is the reference here: debits and credits are headed in **slate and
clay**, not green and red — because in double-entry accounting neither side is "good."

---

## Decision 10 — color blindness and forced colors

### Color blindness

Prevalence: deuteranomaly/deuteranopia ~6% of men, protan ~2%, tritan ~0.01%. Roughly 1 in 12 men
and 1 in 200 women.

**The one rule: color is never the only channel.** Add an icon, a shape, a label, a position, a
weight. GitHub's issue rows pass this test — the state is a distinct glyph, not just a hue.

**The one test:** simulate. Run your screenshot through a deuteranopia and protanopia filter and
check that every pair of things that must be distinguished still is. If you don't have a tool
handy, the Viénot/Brettel LMS matrices are twelve lines of code (the script I used is described at
the end of this file).

### Forced colors

`forced-colors: active` — Windows High Contrast, and increasingly a general OS accessibility mode.
**I tested this in Chromium 128 and the results are more aggressive than most people assume:**

| Property | Under `forced-colors: active` |
|---|---|
| `background-color` | **Forced** to `Canvas`. A `#dcfce7` success badge became white-on-white. |
| `color` | Forced to `CanvasText`. |
| `border-color` | Forced to `CanvasText` — **but the border width survives.** |
| `border-width` | Preserved. This is what saves you. |
| `outline-color` / `outline-width` | Color forced, **width preserved** (my 2px ring stayed 2px). |
| `box-shadow` | **Removed entirely.** `computed boxShadow` was empty. |
| `background-image` (gradient) | **Removed** in my test — `computed backgroundImage: none`. |

Concrete consequences, in priority order:

1. **A filled button with no border becomes a bare text label.** `<button style="background:#3b82f6;color:#fff;border:0">`
   computed to white background, black text, 0px border — indistinguishable from body text. **Give
   every button a border, even a transparent one:** `border: 1px solid transparent`.
2. **Shadow-as-border fails.** The Geist/Vercel `0 0 0 1px` technique is elegant and it evaporates.
   Use a real `border` for anything structural; keep shadows for the soft-blur layer only.
3. **Focus rings must be `outline`, not `box-shadow`.** An outline ring survives at full width with
   a system color. A box-shadow ring disappears completely. This is the single highest-impact item
   here, because a lost focus ring makes the product keyboard-unusable.
4. **Status badges need a border or a glyph.** Wash-background-only badges vanish.
5. Use the system color keywords when you need to opt in deliberately: `Canvas`, `CanvasText`,
   `LinkText`, `ButtonFace`, `ButtonText`, `Highlight`, `HighlightText`, `GrayText`, `Field`,
   `FieldText`, `AccentColor`, `AccentColorText`. `forced-color-adjust: none` opts an element out
   entirely — reserve it for things like color swatches and charts where the color *is* the
   content, and pair it with a visible border so the swatch still has an edge.

```css
@media (forced-colors: active) {
  .btn        { border: 1px solid ButtonText; }
  .badge      { border: 1px solid CanvasText; }
  :focus-visible { outline: 3px solid Highlight; outline-offset: 2px; }
  .swatch     { forced-color-adjust: none; border: 1px solid CanvasText; }
}
```

---

## Decision 11 — what a palette signals

These are observed correlations across the products I measured, not laws. They're useful because
they tell you what you're accidentally saying.

| Signal | How it's built | Measured example |
|---|---|---|
| **Institutional / serious money** | warm low-chroma neutral, near-black text, one blue-violet accent used ~twice per screen | Mercury: beige ramp (hue 88–106), `text-default #272735`, accent `#5266eb` |
| **Technical / dense / for engineers** | cool blue-tinted neutral, high information density, semantic color per domain state | Primer: neutrals hue 244–255, eleven semantic families |
| **Brand-free / engineered** | chroma exactly 0, pure grayscale + one focus blue | Geist: `hsla(0, 0%, X%)` throughout |
| **Calm / document / long-session** | warm neutral, alpha-based tokens, almost no saturated color anywhere | Notion: `tatami` hue 61–106, text as black-at-alpha |
| **Premium / editorial** | high-contrast near-black on off-white, one restrained accent, generous neutral range | Radix `sand`, Aesop-style |
| **Consumer-friendly** | brighter accent (L 0.62+), higher chroma, more of it | Linear light-theme brand `#7070ff` L 0.622 C 0.207 vs dark-theme `#5e6ad2` L 0.567 C 0.159 |
| **AI slop** | violet→blue gradient, `#8b5cf6`, glow, oversaturated dark | see below |

Note that these are gradients, not categories. Linear's light theme brand is L 0.622 C 0.207 and
its dark theme brand is L 0.567 C 0.159 — the same brand, dimmed by a fifth of its chroma, because
in dark mode it is a fill carrying white text rather than a link on paper. **The role you put a
color in changes the color.** And the general budget still holds: a marketing page can afford 2–3%
chromatic pixels; the product behind the login cannot.

---

## When this advice is wrong

- **Data-dense monitoring, trading and observability.** These interfaces are *supposed* to be
  loud. A trading terminal where 15% of pixels are red or green is doing its job. The "0.5%
  chromatic" target is for interfaces where color means *look here*; when color means *this is the
  data*, it's a different medium. The rules that still apply: fix lightness across your status
  hues, never use hue alone, and give the neutral chrome a boring ramp so the data pops.
- **Children's products, games, creative tools, consumer social.** Restraint is not universally
  virtuous. Figma, Procreate and Duolingo all use far more color than anything measured here and
  are better for it. The transferable rule is *intentionality*, not scarcity.
- **Brand-driven marketing pages.** A landing page is an ad. Gradients, big flat color fields and
  saturated illustration are legitimate there and out of place in the product behind the login.
  Do not let the marketing palette leak into the app — Cash App is the reference: brand green is a
  marketing surface only; inside the app the chrome is white/black with neutral gray pills
  (measured in `references/fintech-and-trust.md`).
- **Charts, maps, image editors, color pickers, design tools.** Color *is* the content. Use
  `forced-color-adjust: none`, use full-gamut P3 where available, and ignore the chromatic-pixel
  budget entirely.
- **You already have a design system.** Read it and use it. A second color language inside one
  product is worse than an imperfect but consistent one. Extend it with the missing steps rather
  than importing a new ramp.
- **Extremely small surfaces.** A three-screen internal tool does not need 12 neutral steps and a
  semantic layer. Radix `slate` + one accent + `red/amber/green` at L 0.55 is twenty minutes and
  it's correct.
- **`#000` and true white.** Right for OLED-first mobile, video/photo review, and cinema. See
  Decision 6.
- **"Always use an 8-step scale" / "always use Inter" / "always use `slate`."** All three are
  fine defaults and all three are why the output is recognizable. Deviate deliberately and
  document why.

---

## The color of AI-generated UI, and what to do instead

Each of these has a specific measurable signature and a specific fix.

### 1. The violet→blue gradient

**What it looks like:** `linear-gradient(to right, #8B5CF6, #3B82F6)` on the hero, on the primary
button, on the icon container, on the "AI" badge, and on the empty-state illustration.
`#8B5CF6` is Tailwind `violet-500`, `oklch(0.606 0.219 293)`.

**Why it's wrong, specifically:** white text on `#8b5cf6` is **4.23:1 — it fails WCAG AA for body
text.** So does white on `#3b82f6` (3.68:1). A gradient between two failing colors fails everywhere
along its length. And the gradient is stripped entirely under `forced-colors: active` (measured),
leaving a white box.

**What to do instead:** one flat accent at L 0.54–0.58, used on the primary button only. If you
genuinely need a gradient, put it behind content as a very low-chroma wash
(`oklch(0.97 0.02 280)` → `oklch(0.98 0.01 250)`) where nothing sits on it, or use it on a single
decorative element with no text.

**The best counterexample I have:** Linear ships an in-product AI agent panel. In the homepage
screenshot it is a neutral `#0f1011` panel with a 1px `#ffffff14` border and a small monochrome
logo. No gradient, no glow, no purple. Mercury's `--surface-magic` — the token literally named for
its AI surface — resolves to `#5266eb`, which is *the same value as* `--surface-primary`.
Both companies decided the AI feature should look like the rest of the product.

### 2. `#8B5CF6` as the accent

**What it looks like:** violet-500 or purple-500 as the brand color because it "feels like AI."

**Why it's wrong:** it fails contrast at the fill role (4.23:1 white-on), it's the single most
over-represented hue in generated UI, and at chroma 0.219 it's louder than every accent measured
here except Stripe's (Linear 0.159–0.207, Mercury 0.200, Primer 0.191).

**What to do instead:** if you want violet, take it to L 0.54 where white passes —
`oklch(0.54 0.20 293)`, whose nearest shipped value is Tailwind `violet-600` `#7c3aed` (L 0.541),
white-on = **5.70:1**. Better: move the hue. 25°, 75°, 148° and 200° are all under-used and
instantly less generic. Best: pick the hue from something in the product's actual domain.

### 3. Glow

**What it looks like:** `box-shadow: 0 0 40px rgba(139,92,246,0.4)` on cards, buttons and inputs;
sometimes an animated pulse.

**Why it's wrong:** it's a light-emission metaphor applied to flat surfaces, it makes every element
compete for foreground, and it's removed entirely in forced-colors mode. No product measured in
this file uses a colored glow anywhere. Linear's largest shadow is
`0px 7px 32px #00000059` — black at 35%, no hue. Geist's largest is four stacked black layers at
6–12% alpha (`#00000014`, `#0000000f`, `#00000014`, `#0000001f`).

**What to do instead:** a 1px border and a black-alpha shadow. If something must feel "active," use
motion (a 200ms opacity fade) or a 2px accent border, not a halo. The one legitimate glow is a
focus ring, and it should be an `outline`, not a shadow.

### 4. Oversaturated dark mode

**What it looks like:** dark page at `#0f0a1e` or similar (a *tinted* near-black), accents at full
chroma, `text-secondary` at `#a78bfa`, borders at 5% white.

**Why it's wrong:** the tinted ground makes every hue on top of it read as a variant of that tint;
full-chroma accents on near-black are where blue and violet genuinely halate; and 5% borders are
too weak to separate anything. Computed over an L 0.156 ground: 5% white gives L 0.211
(**Δ +5.5**), which is the same size as one elevation step, so the edge reads as another surface
rather than a boundary. 15% gives L 0.311 (**Δ +15.5**), which reads as an edge. Measured dark
grounds for comparison: Linear `#08090a` chroma 0.003, Primer `#0d1117` chroma 0.014, Radix
`#111113` chroma 0.004 — all essentially neutral.

**What to do instead:** neutral or near-neutral ground at L 0.14–0.18 with chroma ≤ 0.015, borders
at 15% white, text-role accents raised to L 0.66–0.72 with chroma roughly unchanged. See the
dark-mode checklist in Decision 6.

### 5. Pure black text on pure white

**What it looks like:** `--foreground: #000` / `--background: #fff`. This is shadcn's shipped
default — I read it off `ui.shadcn.com`: `--foreground: lab(0% 0 0)`, `--card-foreground: lab(0% 0 0)`.

**What to do instead:** `oklch(0.24–0.29 …)`. `#1c2024`, `#1f2328`, `#282a30`, `#272735` — pick any
of the measured values. Change the one token and the whole page loses a degree of harshness.

### 6. Every card gets a colored accent

**What it looks like:** the four stat cards on a dashboard, each with a different pastel background
and a matching colored icon chip. Blue for revenue, green for users, amber for orders, purple for
"AI insights."

**Why it's wrong:** the colors are arbitrary — they encode nothing — so they're pure decoration
that consumes the reader's whole color budget. When something is actually wrong, there's no
contrast left to signal it with. It also drives chromatic pixel share past 10%.

**What to do instead:** all four cards on the same neutral surface with the same neutral border.
Color enters only when a number is bad. Then the one red card is unmissable.

### 7. Five shades of the same blue as a categorical chart palette

Covered in Decision 9 — it's the shadcn default and it should be replaced with the IBM CVD-safe
five.

### 8. Semantic colors used as decoration

**What it looks like:** green checkmarks in a feature list on a pricing page; a red "Popular"
badge; amber icons for "fast."

**Why it's wrong:** every time success-green appears where nothing has succeeded, the green means
less. Semantic color has a budget and marketing decoration spends it.

**What to do instead:** feature-list checkmarks in `text-tertiary`. Badges in neutral or in the
accent. Save green for a state that changed.

---

## Self-check

Run this against your own output before calling it done.

**Measure**

- [ ] Screenshot at 1440 and run the chroma script. Product screen **< 3%**, ideally < 1%. Marketing < 5%.
- [ ] Count distinct hues in the palette. Neutral + one accent + three status = **five**. More needs a reason.
- [ ] Grep the codebase for hex literals outside the token file. There should be zero.

**Neutral ramp**

- [ ] 10–12 steps, authored in OKLCH, chroma ≤ 0.02 (unless the tint is deliberate, like Stripe).
- [ ] Surface steps 1.5–2.0 L apart in light, 3–5 L apart in dark.
- [ ] Three usable border weights exist, not one.
- [ ] Text is not `#000`. Body text on a dark ground is not `#fff`.

**Semantic layer**

- [ ] No component references a ramp step directly. Only semantic names.
- [ ] Exactly 3 surfaces, 3 borders, 4 text levels. If there's a fifth of anything, delete it.
- [ ] Every status role has three values (text / fill / wash), and the wash is a brighter sibling at ~10% alpha, not the text color faded.
- [ ] Status colors all sit within ±0.03 of each other in OKLCH lightness.
- [ ] Semantic names describe your domain's states, not generic emotions, where the domain has real states.

**Accent**

- [ ] One accent. List every place it appears; if the list exceeds five kinds of element, cut.
- [ ] Fill role and text role are separate tokens.
- [ ] White text on the fill passes 4.5:1 (or you know it doesn't and have decided).

**Dark mode**

- [ ] Page ground L 0.14–0.18, and a sunken step exists below it.
- [ ] Elevation is lightness, not shadow.
- [ ] Every panel has a visible edge: an opaque border L +12 to +20 above the surface, or alpha at 1.5–2× the light-mode value.
- [ ] Accent text/icon lightness raised by +0.11 to +0.17; fill lightness unchanged.
- [ ] Status washes are alpha over hue, not opaque tints.

**Contrast**

- [ ] Body text ≥ 4.5:1 (WCAG 2) **and** ≥ APCA 75 against its real background, not against white.
- [ ] Dark-mode text carries ~2 more points of WCAG ratio than the light-mode equivalent.
- [ ] Focus ring ≥ 3:1 against both the component and the page. Two-layer ring if in doubt.
- [ ] Placeholders ≥ 4.5:1. Disabled text still readable.

**Robustness**

- [ ] Simulate deuteranopia and protanopia. Every must-distinguish pair still distinguishes.
- [ ] Nothing communicates state by hue alone — icon, label, shape or position backs it up.
- [ ] `forced-colors: active`: every button has a border, every focus ring is an `outline` not a `box-shadow`, every structural card has a real `border`.
- [ ] Turn the whole page grayscale. It should still be fully usable. If it isn't, color is carrying meaning it shouldn't.

**AI tells**

- [ ] No violet→blue gradient anywhere.
- [ ] No `#8B5CF6`, `#a855f7`, `#6366f1` as the accent.
- [ ] No colored glow.
- [ ] Not one dashboard card per pastel.
- [ ] Chart categories are not five shades of one hue.
- [ ] The AI feature, if there is one, looks like the rest of the product.

---

## How the numbers in this file were produced

```bash
# 1. Resolve every custom property a site defines, light and dark.
#    Collect names from all reachable cssRules, then read the resolved value off
#    documentElement — this survives minified/hashed variable names and @layer.
node probe.mjs https://linear.app linear          # colorScheme: 'light'
node probe.mjs https://linear.app linear --dark

# 2. When stylesheets are cross-origin (cssRules throws), capture the raw CSS
#    off the network instead and parse the [data-theme] blocks directly.
node css.mjs https://linear.app linear   # page.on('response') → collect text/css

# 3. Convert to OKLCH and compute WCAG 2 + APCA in Python (no deps).
python3 oklch.py '#282a30' '#ffffff'

# 4. Chromatic pixel share, from a real screenshot.
node tools/shot.mjs https://linear.app --widths 1440 --wait 4000 --dark
python3 chroma.py .cache/shots/linear-1440.png

# 5. Color-blindness audit — Viénot/Brettel/Mollon LMS simulation, then minimum
#    pairwise OKLab distance across the palette under each CVD type.
python3 cvd.py

# 6. Forced-colors behavior — Playwright context with forcedColors: 'active',
#    then read computed styles for background/border/outline/box-shadow.
node fc.mjs
```

**Related files in this library:** [`system/3-tokens.md`](../system/3-tokens.md) for where the
color tokens sit in the wider token system; [`references/fintech-and-trust.md`](../references/fintech-and-trust.md)
for Wise's, Mercury's and Column's full measured palettes;
[`craft/tables-dashboards-data.md`](tables-dashboards-data.md) for chart layout once the palette is
settled; [`anti-patterns/vibecode-rubric.md`](../anti-patterns/vibecode-rubric.md) for scoring the
result.

Where a value came from a stylesheet rather than a computed style I said so. Where I did not
measure something, it isn't in this file.
