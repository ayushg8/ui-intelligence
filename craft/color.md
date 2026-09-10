# Color systems for interfaces

**Evaluated:** 2026-09

**Measured 2026-09.** Every hex, ratio, OKLCH triple and ΔE below was read from a live product
with Playwright (CSS Typed OM on `document.documentElement`, so runtime-injected theme variables
are captured, not just what's in the stylesheet), or computed from those values with the scripts in
the last section. Contrast is computed with WCAG 2 and with APCA 0.1.9 (validated: `#fff` on `#000`
= 21.00:1 / Lc −107.9). Forced-colors behavior was tested in Chromium 148.0.7778.96. Nothing here
is recalled from memory. Where I could not measure something, it says so.

**Re-probed 2026-09-10:** shadcn, Primer (light + dark), Geist (light + dark), Radix, Tailwind v4 and
Linear were read again from live pages. All Primer, Geist, Radix and Tailwind values below survived
unchanged. Two things moved and are corrected in place — Linear's accent (`#7070ff` → `#7170ff`) and
white-on-`blue-500` contrast (3.42 → 3.76:1). One caveat: **`linear.app` now serves dark to
logged-out visitors regardless of `prefers-color-scheme`,** so Linear's light-theme rows date from
the 2026-08 pass and could not be re-verified.

The one number that should reframe everything else. Chromatic pixel share (fraction of pixels with
OKLCH chroma > 0.04), measured at 1440px:

| Surface | C > 0.04 | C > 0.10 |
|---|---|---|
| Linear homepage — dark, includes a full in-product screenshot | **0.04%** | 0.02% |
| GitHub `vercel/next.js` issue list — dense light-mode list with user-authored label pills | **0.92%** | 0.49% |
| A typical AI-generated dashboard (built below, four stat cards, five-color bar chart) | **11.60%** | 4.38% |
| The same dashboard, same information, fixed (also below) | **0.30%** | 0.25% |

Product interfaces made by good designers are ~99% neutral. In the Linear screenshot the *only* chromatic pixels in a 1440×1250 viewport are one
yellow favorite star, one amber issue-status ring, and one violet branch icon — and the in-product
AI agent panel visible in that screenshot is a plain `#0f1011` surface with a `#ffffff14` hairline.
No gradient, no glow, no purple.

---

## If you only apply five things

1. **Build the neutral ramp first and make the screen work in grayscale.** 10–12 steps spaced by
   perceptual lightness. If the layout isn't legible and hierarchical with zero hue, color won't
   save it — it will only hide the problem.
2. **Never `#000` text, never `#fff` text.** Light mode text at L 0.24–0.29
   (measured: Radix `slate-12` `#1c2024` L 24.1 · Primer `#1f2328` L 25.4 · Mercury `#272735`
   L 27.9 · Linear `#282a2f` L 28.5). Dark mode text at L 0.94–0.97 (Linear `#f7f8f8` L 97.8 ·
   Primer `#f0f6fc` L 97.0 · Geist `#ededed` L 94.7 · Radix `slate-12` `#edeef0` L 94.9).
   Nobody ships `#000`. shadcn's default theme does — that is the tell.
   *Scope:* this is a rule about **emissive displays rendering antialiased type.** Pure black is
   correct on e-ink and any 1-bit or few-shade panel (L 0.26 gray dithers into mush on a reMarkable
   or a Kobo), in print, and under `prefers-contrast: more` / `forced-colors: active`, where
   `CanvasText` is the point. Ship the off-black as the default and let those media override it.
3. **Choose semantic colors by target lightness, not by hue name.** Every foreground status color
   in GitHub Primer's light theme lands in **L 49.5–56.5** and chroma falls wherever the sRGB gamut
   allows (0.117 for amber, 0.207 for purple). Mercury goes further: *seven* hue families share one
   lightness ladder to within 0.2 L. Naive `#f00 / #ff0 / #0f0` sit at L 62.8 / 96.8 / 86.6 — which
   is why traffic-light palettes look broken.
4. **One accent, split into at least two roles.** A *fill* value at L 0.54–0.58 (so white text
   passes on it) and a *text* value that changes per theme (plus `fill-hover` and a `wash` — four
   tokens in a finished system; see §4). Measured: Primer's fill moves +2.9 L
   from light to dark while its foreground moves +12.3 L. Allowed uses of the accent, exhaustively:
   primary action, current selection, focus ring, link, one live indicator.
   *Scope:* one accent **per context**, not per product. Identity color is a separate budget:
   per-workspace theming (which Slack is), multiplayer cursors and avatars, per-tenant white-label
   surfaces, and a paid-tier CTA that must not read as the same action as the primary button are
   all legitimate second chromatic channels. What is never legitimate is a second accent that
   encodes nothing.
5. **Dark mode is not an inversion.** Elevation is lightness (+3 to +5 L per step, roughly 2× the
   light-mode step size). Borders carry the structural load — Linear's dark borders sit +12.6 to
   +22.7 L above the page while its light borders sit only −6.8 to −10.7 L below it. Text-role
   accents gain +10 to +24 L; fill-role accents stay put. Chroma barely moves in either.

---

# The measured reference tables

## Neutral ramps, light theme

Values as shipped; `L` is OKLCH lightness ×100.

| Role | Linear | Vercel Geist | GitHub Primer | Radix `slate` | Stripe Sail | Mercury | Notion `tatami` |
|---|---|---|---|---|---|---|---|
| Page | `#ffffff` 100 | `#ffffff` 100 | `#ffffff` 100 | `1 #fcfcfd` 99.1 | `#ffffff` 100 | `#fbfcfd` 99.1 | `#ffffff` 100 |
| Subtle surface | `#f9f8f9` 98.0 | `#fafafa` 98.5 | `#f6f8fa` 97.8 | `2 #f9f9fb` 98.3 | `50 #f7fafc` 98.3 | `#f4f5f9` 97.1 | `#f6f5f4` 97.1 |
| Component bg | `#f4f2f4` 96.3 | `100 #f2f2f2` 96.2 | `#f6f8fa` 97.8 | `3 #f0f0f3` 95.6 | `100 #e3e8ee` 92.9 | `#ededf3` 94.8 | — |
| … hover | `#eeedef` 94.7 | `200 #ebebeb` 93.9 | — | `4 #e8e8ec` 93.2 | — | `#dddde5` 90.0 | `#dfdcd9` 89.6 |
| … active | `#e9e8ea` 93.2 | `300 #e6e6e6` 92.3 | — | `5 #e0e1e6` 91.0 | — | `#c3c3cc` 82.0 | — |
| Border subtle | `#e9e8ea` 93.2 | `α 8%` (−6.1) | `#d1d9e0` @70% 88.1 | `6 #d9d9e0` 88.7 | `200 #c1c9d2` 83.2 | `#c3c3cc` 82.0 | `black 10%` (−7.7) |
| Border default | `#e4e2e4` 91.5 | `α 10%` (−7.7) | `#d1d9e0` 88.1 | `7 #cdced6` 85.3 | — | `#707393` @22% | — |
| Border strong | `#dcdbdd` 89.3 | `α 21%` (−16) | `#818b98` 63.3 | `8 #b9bbc6` 79.4 | `300 #a3acb9` 74.1 | `#535461` 45.0 ¹ | — |
| Text disabled | `#86848d` 61.8 | `700 #8f8f8f` 64.9 | `#818b98` 63.3 | `9 #8b8d98` 64.5 | `400 #8792a2` 65.6 | `#70707d` 55.0 | `black 30%` |
| Text tertiary | `#6f6e77` 54.2 | `800 #7d7d7d` 59.0 | — | `10 #80838d` 61.1 | `500 #697386` 55.4 | — | `black 54%` |
| Text secondary | `#3c4149` 37.4 | `900 #4c4c4c` 41.8 | `#59636e` 49.5 | `11 #60646c` 50.2 | `700 #3c4257` 38.2 | `#535461` 45.0 | — |
| Text primary | `#282a2f` 28.5 | `1000 #171717` 20.4 | `#1f2328` 25.4 | `12 #1c2024` 24.1 | `900 #1a1f36` 24.7 | `#272735` 27.9 | `black 90%` |
| Ramp **hue** | 268–326 (pink→blue) | **none** | 244–258 (blue) | 248–286 (violet) | 236–274 (blue) | 275–286 (violet) | 62–107 (**warm**) |
| Ramp **max chroma** | 0.015 | **0.000** | 0.023 | 0.016 | **0.044** | 0.026 | 0.005 |

¹ Mercury's `--border-default` really is that dark — it is an input outline, not a card divider.
Its divider equivalent is `--border-subdued: #c3c3cc` (L 82.0). *Check what a token is used on
before copying its value;* "border" means different things in different systems.

Six of seven ramps top out under chroma 0.026 — about a tenth of a saturated
brand color. Vercel's gray is literally `hsla(0, 0%, X%)`: chroma exactly zero, no tint at all.
Stripe at 0.046 is the outlier and it is the one whose grays visibly read navy (`#3c4257`), which
works because Stripe's entire identity is blue.

## Neutral ramps, dark theme

| Role | Linear | Geist | Primer | Radix `slate` |
|---|---|---|---|---|
| Sunken | — | — | `#010409` 10.4 | — |
| Page | `#08090a` 13.9 | `200 #000000` **0.0** | `#0d1117` 17.6 | `1 #111113` 17.9 |
| Content surface | `#0f1011` 17.2 | `100 #0a0a0a` 14.6 | `#151b23` 22.0 | `2 #18191b` 21.3 |
| Component bg | `#1c1c1f` 22.8 | `100 #1a1a1a` 21.6 | `#212830` 27.4 | `3 #212225` 25.2 |
| … hover | `#232326` 25.7 | `200 #1f1f1f` 23.8 | `#262c36` 29.2 | `4 #272a2d` 28.3 |
| … active | `#28282c` 27.8 | `300 #292929` 28.0 | `#2a313c` 31.1 | `5 #2e3135` 31.2 |
| Border subtle | `#23252a` 26.4 | `α 9%` white | `#3d444d` @70% | `6 #363a3f` 34.7 |
| Border default | `#34343a` 32.7 | `α 13–15%` white | `#3d444d` 38.4 | `7 #43484e` 39.9 |
| Border strong | `#3e3e44` 36.6 | `α 24%` white | `#656c76` 52.9 | `8 #5a6169` 48.9 |
| Text disabled | `#62666d` 50.9 | `α 51%` white | `#656c76` 52.9 | `9 #696e77` 53.7 |
| Text tertiary | `#8a8f98` 64.9 | `α 51%` white | `#9198a1` 67.7 | `10` — |
| Text secondary | `#d0d6e0` 87.4 ¹ | `900 #a1a1a1` 70.8 | `#9198a1` 67.7 | `11 #b0b4ba` 76.9 |
| Text primary | `#f7f8f8` 97.8 | `1000 #ededed` 94.7 | `#f0f6fc` 97.0 | `12 #edeef0` 94.9 |

¹ Linear's own token names matter here: `--color-text-tertiary` is `#8a8f98`,
`--color-text-secondary` is `#d0d6e0` (L 87.4). Published "Linear dark palette" reproductions
routinely label `#8a8f98` as secondary; it isn't. Copy the role, not the swatch.

Vercel is the only measured product with a pure `#000` page ground — and every piece of content
sits on `--ds-background-100` = `#0a0a0a` (L 14.6) *above* that black, with body text at `#ededed`,
not white. If you use a black page, do not also use white text.

## The single most important structural finding: lightness-locked ladders

Four of the seven systems build every hue family on **one shared lightness ladder**, varying only
hue and chroma. This is the mechanism behind "fix lightness, let chroma float," implemented at
scale.

**Mercury** — seven families, measured OKLCH L per step:

```
step      0     50    100   150   200   300   400   500   600   700   800   900   950
beige   100.0  99.1  97.0  94.8  90.0  82.0   —    55.0  45.0  34.0  28.0  23.9  20.9
blue    100.0  98.8  97.0  94.8  90.0  82.0   —    55.1  45.1  33.9  27.9  24.0  21.0
green   100.0  98.9  97.1  94.9  90.1  82.1   —    55.0  45.0  33.9  28.1  23.9  20.9
orange  100.0  99.1  97.1  94.8  90.1  82.0   —    54.9  45.0  34.0  28.0  24.0  21.0
purple  100.0  98.9  97.0  94.8  90.1  82.0   —    55.0  45.0  34.0  27.8  24.1  20.9
neutral 100.0  99.1  97.1  94.8  90.0  82.0  69.9  55.0  45.0  33.9  27.9  24.1  20.9
```

Maximum deviation across all seven families at any step: **0.2 L**. Mercury also ships a second
chroma tier at the same lightnesses — `-base-` families run chroma 0.019–0.052 (chrome) and
`-magic-` families run 0.050–0.134 (emphasis). Same lightness, two loudnesses.

**Stripe Sail** does the same across 8+ hue families: `50` ≈ 98.2–98.6, `100` ≈ 92.7–93.6,
`200` ≈ 81.4–83.9, `500` ≈ 53.8–58.0, `900` ≈ 24.1–25.7.

**Radix** `gray` / `slate` / `sand` are identical to within 0.6 L at every one of the 12 steps
(99.1 / 98.2 / 95.5 / 93.1 / 90.7 / 88.5 / 85.1 / 79.2 / 64.3 / 61.0 / 50.3 / 24.4). So you can
swap your neutral's temperature with zero contrast or layout consequence.

**Tailwind v4** `gray` / `slate` / `zinc` / `neutral` / `stone` likewise share one ladder to within
1.1 L through step 900 (1.8 L at 950). What they share is the *problem* — see the next section.

The practical consequence: **your semantic colors should be indices into a ladder, not
hand-picked hexes.** `danger = red-600`, `warning = amber-600`, `success = green-600` — where all
three `600`s are the same L — is a system. Three hand-picked hexes is not.

## Semantic status colors, measured

GitHub Primer ships seven independent foreground semantic families. Look at the lightness column:

| Token | Light | L | C | Dark | L | C | ΔL | ΔC |
|---|---|---|---|---|---|---|---|---|
| `fgColor-success` | `#1a7f37` | 52.4 | 0.140 | `#3fb950` | 69.5 | 0.181 | **+17.1** | +0.041 |
| `fgColor-accent` | `#0969da` | 54.0 | 0.191 | `#4493f8` | 66.3 | 0.169 | **+12.3** | −0.021 |
| `fgColor-attention` | `#9a6700` | 55.4 | **0.117** | `#d29922` | 72.0 | 0.140 | **+16.5** | +0.023 |
| `fgColor-severe` | `#bc4c00` | 55.7 | 0.160 | `#db6d28` | 65.4 | 0.158 | +9.7 | −0.002 |
| `fgColor-danger` | `#d1242f` | 55.7 | 0.206 | `#f85149` | 66.5 | 0.205 | +10.8 | −0.001 |
| `fgColor-done` | `#8250df` | 56.3 | **0.207** | `#ab7df8` | 68.8 | 0.178 | +12.5 | −0.029 |
| `fgColor-sponsors` | `#bf3989` | 56.5 | 0.187 | `#db61a2` | 66.2 | 0.168 | +9.7 | −0.019 |
| `fgColor-muted` (neutral) | `#59636e` | 49.5 | 0.022 | `#9198a1` | 67.7 | 0.016 | +18.2 | −0.006 |

Seven hues, light lightness spread **52.4 → 56.5** (4.1 points), chroma spread 0.117 → 0.207 (a
factor of 1.8). Dark lightness spread 65.4 → 72.0. **Lightness moves +9.7 to +18.2 between themes;
chroma moves by at most 0.041, which is noise.** "Desaturate your accents in dark mode" is folk
advice that the measurements do not support. *Lighten* them.

The fill (`-emphasis`) tokens behave completely differently:

| Fill token | Light | Dark | ΔL | white-on light | white-on dark |
|---|---|---|---|---|---|
| `bgColor-accent-emphasis` | `#0969da` | `#1f6feb` | +2.9 | 5.19:1 | 4.63:1 |
| `bgColor-success-emphasis` | `#1f883d` | `#238636` | −0.6 | 4.52:1 | 4.63:1 |
| `bgColor-attention-emphasis` | `#9a6700` | `#9e6a03` | +1.1 | 4.87:1 | 4.65:1 |
| `bgColor-danger-emphasis` | `#cf222e` | `#da3633` | +3.5 | 5.36:1 | 4.61:1 |
| `bgColor-done-emphasis` | `#8250df` | `#8957e5` | +2.1 | 5.05:1 | 4.61:1 |

**In dark mode all five fills land within 0.04 of each other at 4.61–4.65:1** — every fill tuned to
sit just above the AA floor with white text.

Vercel Geist independently landed in the same place:

| Geist `-900` | Light | L | Dark | L | ΔL | ΔC |
|---|---|---|---|---|---|---|
| red | `#cb2a2f` | 55.0 | `#ff6166` | 69.8 | +14.8 | −0.004 |
| green | `#297a3a` | 51.6 | `#62c073` | 73.2 | +21.6 | +0.017 |
| amber | `#a35200` | 52.8 | `#f2a20d` | 77.2 | +24.4 | +0.030 |
| blue | `#0068d6` | 53.3 | `#52a8ff` | 71.8 | +18.5 | −0.036 |

And the naive version, for contrast:

| | OKLCH | On white |
|---|---|---|
| `#ff0000` | L 62.8 C 0.258 H 29 | 4.00:1 |
| `#ffff00` | L **96.8** C 0.211 H 110 | **1.07:1 — invisible** |
| `#00ff00` | L **86.6** C 0.295 H 143 | 1.37:1 |

## Maximum sRGB chroma at fixed lightness, by hue

Binary-searched against the sRGB gamut boundary. This is the table that explains why your green
never looks as vivid as your red.

| Hue | L 0.45 | L 0.50 | **L 0.55** | L 0.60 | L 0.65 | L 0.70 | at L 0.55: white-on / black-on |
|---|---|---|---|---|---|---|---|
| 25 red | 0.183 | 0.203 | **0.223** | 0.243 | 0.236 | 0.191 | 5.45 / 3.47 |
| 45 orange | 0.129 | 0.143 | **0.157** | 0.172 | 0.186 | 0.200 | 5.18 / 3.64 |
| 75 amber | 0.095 | 0.106 | **0.116** | 0.127 | 0.137 | 0.148 | 4.95 / 3.81 |
| 145 green | 0.142 | 0.157 | **0.173** | 0.189 | 0.205 | 0.220 | 4.52 / 4.18 |
| 165 teal-green | 0.095 | 0.105 | **0.116** | 0.126 | 0.137 | 0.147 | 4.57 / 4.13 |
| 195 cyan | 0.077 | 0.085 | **0.094** | 0.102 | 0.111 | 0.119 | 4.64 / 4.07 |
| 230 sky | 0.090 | 0.100 | **0.110** | 0.120 | 0.130 | 0.140 | 4.73 / 3.99 |
| 258 blue | 0.167 | 0.185 | **0.204** | 0.219 | 0.188 | 0.158 | 5.00 / 3.78 |
| 275 blue-violet | 0.283 | 0.284 | **0.251** | 0.219 | 0.188 | 0.158 | 5.34 / 3.54 |
| 293 violet | 0.250 | 0.278 | **0.277** | 0.241 | 0.207 | 0.174 | 5.63 / 3.36 |
| 310 purple | 0.228 | 0.253 | **0.278** | 0.296 | 0.254 | 0.213 | 5.70 / 3.31 |
| 330 magenta | 0.205 | 0.228 | **0.251** | 0.274 | 0.296 | 0.314 | 5.60 / 3.37 |

At L 0.55, blue-violet holds **2.7× the chroma of cyan**. If you want a cyan or teal brand at a
lightness that carries white text, it will look washed out and there is nothing you can do about it
in sRGB. (Display-P3 helps, unevenly — see below.)

## Which hues can carry white text at all

Radix's step 9 is the brand fill for every hue scale. I computed white-on and black-on for all 23:

**Can carry white text (WCAG ≥ 4.5):** `iris` `#5b5bd6` (5.37) · `violet` `#6e56cf` (5.39) ·
`indigo` `#3e63dd` (5.21) · `purple` `#8e4ec6` (5.18) · `plum` `#ab4aba` (4.75). All five sit at
L 54.0–57.9.

**Cannot** (needs dark text): blue `#0090ff` (3.26) · grass (3.03) · green (3.16) · teal (3.07) ·
cyan (3.00) · orange (2.97) · red `#e5484d` (3.91) · crimson (3.85) · pink (4.12) · tomato (3.87) ·
brown, bronze, gold (3.5–3.7) · amber `#ffc53d` (1.58) · yellow (1.26) · lime (1.35) · mint (1.43) ·
sky (1.48).

**Five hues out of twenty-three.** All in the 260°–320° band. This is the mechanical reason every
SaaS accent is blue-violet — it is the only place you can have a saturated brand fill *and* white
text *and* a link color from the same hue. It is not fashion; it's the gamut.

**So the real choice is:** accept blue-violet, or move your accent hue and give the fill dark text
(Radix does exactly this — `amber-9` at L 85.4 takes `#111` at 11.96:1), or push your hue down to
L 0.54 and lose chroma. All three are legitimate. Silently shipping white-on-`#3b82f6` at 3.68:1 is
not.

## WCAG 2 versus APCA on identical pairs

| Pair | WCAG 2 | APCA Lc |
|---|---|---|
| Primer light `fgColor-default` `#1f2328` on `#fff` | 15.80:1 | 102.8 |
| Primer light `fgColor-muted` `#59636e` on `#fff` | **6.11:1** | **80.5** |
| Primer **dark** `fgColor-muted` `#9198a1` on `#0d1117` | **6.50:1** | **−45.8** |
| Primer light `fgColor-disabled` on `#fff` | 3.45:1 | 62.1 |
| Primer **dark** `fgColor-disabled` on `#0d1117` | 3.57:1 | −24.9 |
| Linear light tertiary `#6f6e77` on `#fff` | 5.03:1 | 74.8 |
| Linear **dark** tertiary `#8a8f98` on `#08090a` | 6.13:1 | −41.8 |
| Radix `slate-11` on `slate-2`, light | 5.65:1 | 76.2 |
| Radix `slate-11` on `slate-2`, **dark** | **8.45:1** | **−60.3** |
| white on Tailwind v4 `blue-500` `#2b7fff` | 3.76:1 | −70.0 |
| white on Tailwind v4 `violet-500` `#8e51ff` | **4.40:1 — fails AA** | −75.3 |
| `#fff` on `#000` | 21.00:1 | −107.9 |

**Primer's muted text has *more* WCAG contrast in dark mode (6.50 vs 6.11) and reads dramatically
worse (Lc 45.8 vs 80.5).** WCAG 2 systematically over-rewards light-text-on-dark. Radix's answer,
verified across all eight scales I tested, is to hold APCA roughly constant and let WCAG float:

| Scale | light Lc | dark Lc | light WCAG | dark WCAG |
|---|---|---|---|---|
| `gray-11` on `gray-2` | 76.0 | −60.6 | 5.62 | **8.48** |
| `slate-11` | 76.2 | −60.3 | 5.65 | **8.45** |
| `sand-11` | 76.6 | −60.0 | 5.73 | **8.39** |
| `blue-11` | 68.9 | −60.1 | 4.53 | **8.38** |
| `red-11` | 70.5 | −60.3 | 4.94 | **8.56** |
| `grass-11` | 71.2 | −65.3 | 4.82 | **9.30** |
| `amber-11` | 68.8 | −77.6 | **4.43** | **11.52** |
| `iris-11` | 76.1 | −60.1 | 5.74 | **8.48** |

Dark-mode WCAG is 1.5–2.6× the light-mode value for the same perceived readability. Note also
`amber-11` at 4.43:1 — Radix ships a step that technically fails AA because at Lc 68.8 it reads
fine. Radix's documented guarantees (step 11 ≥ Lc 60, step 12 ≥ Lc 90 against step 2) hold in every
scale I checked.

**Working rule:** in dark mode, add roughly 2 points of WCAG ratio to hit the light-mode reading
experience. Light secondary at 5:1 → dark secondary at ~7:1.

## Accents, one row per product

| Product | Light | Dark | white-on light | white-on dark | Note |
|---|---|---|---|---|---|
| Linear brand fill | `#7170ff` L 62.3 C 0.207 | `#5e6ad2` L 56.7 C 0.159 | **3.84 — fails** | 4.70 | goes *darker* in dark |
| Linear link | `#7170ff` | `#828fff` | 3.84:1 on white | 6.95:1 on page | |
| Linear focus ring | `#5e69d1` | `#5e69d1` | — | — | same both themes |
| Linear accent tint | `#f1f1ff` L 96.2 C 0.019 | `#18182f` L 22.2 C 0.044 | — | — | wash flips, accent doesn't |
| Primer | `#0969da` L 54.0 | fill `#1f6feb` / text `#4493f8` | 5.19 | 4.63 | split roles |
| Geist focus | `#0072f5` L 57.9 C 0.214 | `#52a8ff` L 71.8 C 0.152 | 4.44 | — | biggest measured ΔC (−0.062) |
| Mercury | `#5266eb` L 57.0 C 0.200 | — | 4.71 | — | `--surface-magic` is the same token |
| Stripe Sail `blue-500` | `#5469d4` L 56.0 C 0.165 | — | 4.83 | — | |
| Notion | `#097fe8` L 59.7 C 0.183 | — | 4.03 | — | |
| Tailwind v4 `violet-500` | `#8e51ff` L 60.0 C 0.242 | — | **4.40 — fails** | — | the AI default |

**Linear's light-mode link and primary button both fail WCAG AA at 3.84:1.** If yours does too,
know it — and don't also make that color the only cue that something is interactive.

Note Linear's direction of travel: the brand goes *darker and less saturated* in dark mode
(L 62.3 → 56.7). That's not "desaturate for dark" — it's that in dark mode the token's job is a
fill carrying white text, and 3.85:1 → 4.70:1 is the fix.

---

# Decisions

## 1. How much color to use at all

The common failure is not a bad palette. It is a fine palette applied to too many things.
Screenshot your work and run this before arguing with anything else here:

```python
# pip install pillow ; python3 chroma.py shot.png
from PIL import Image; import sys, math
def lin(c):
    c = c/255.0
    return c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4
def chroma(r,g,b):
    R,G,B = lin(r),lin(g),lin(b)
    l = (0.4122214708*R+0.5363325363*G+0.0514459929*B)**(1/3)
    m = (0.2119034982*R+0.6806995451*G+0.1073969566*B)**(1/3)
    s = (0.0883024619*R+0.2817188376*G+0.6299787005*B)**(1/3)
    return math.hypot(1.9779984951*l-2.4285922050*m+0.4505937099*s,
                      0.0259040371*l+0.7827717662*m-0.8086757660*s)
im = Image.open(sys.argv[1]).convert('RGB'); im.thumbnail((800,800))
px = list(im.getdata()); n = len(px); cs = [chroma(*p) for p in px]
print(f"chromatic (C>0.04): {100*sum(c>0.04 for c in cs)/n:.2f}%")
print(f"strong    (C>0.10): {100*sum(c>0.10 for c in cs)/n:.2f}%")
```

Targets, from the measurements at the top: **product screen under 1%, hard ceiling 3%.** If you're
over, you colored something that should have been neutral. In order of frequency: stat-card
backgrounds, icon chips, non-status badges, chart fills, section dividers, "featured" treatments,
and the hero gradient.

**Three boundaries on this metric.** It measures *chrome*, not content. Mercury's homepage reads
6.60% because it is a full-bleed photograph — the only interface elements on it are one `#5266eb`
button and two frosted-glass pills. Exclude photography and data. And GitHub's 0.92% is *mostly*
user-authored label pills (`Turbopack` magenta, `Error Overlay` magenta, `Form (next/form)` brown,
`Image (next/image)` blue), not GitHub's own palette. GitHub built a deliberately colorless chrome
so that user-chosen label colors would be the loudest thing in the row — because the labels are the
data. **Your design system's color budget and your users' color budget are separate; spend yours so
theirs can be seen.**

**And it is invalid wherever color is the data.** A calendar where every event carries its
category's color, a Kanban board of user-colored labels, a code editor with syntax highlighting, a
map with layer fills, a spreadsheet under conditional formatting, a video timeline of clips — all
of these blow past 3% by design, and an agent that "fixes" them has deleted the primary information
channel. **Before quoting the number, mask the data region and measure only the chrome:** nav, page
ground, toolbars, panel surfaces, borders, buttons, empty states. If you cannot separate chrome
from data in the screenshot, this metric does not apply to that screen — say so instead of
desaturating.

## 2. Building the neutral ramp

### How many steps

**10–12.** Radix's 12 with explicit jobs is the best-documented mapping in the industry:

| Step | Job |
|---|---|
| 1 | App background |
| 2 | Subtle background — striped rows, code blocks, cards on a tinted page |
| 3 | Component background, rest |
| 4 | Component background, hover |
| 5 | Component background, pressed / selected |
| 6 | Border, non-interactive — separators, card outlines |
| 7 | Border, interactive component |
| 8 | Border, strong / focus ring |
| 9 | Solid fill (the brand color in a hue scale) |
| 10 | Solid fill, hover |
| 11 | Low-contrast text — guaranteed Lc ≥ 60 on step 2 |
| 12 | High-contrast text — guaranteed Lc ≥ 90 on step 2 |

One detail worth stealing: **Radix's step 9 is byte-identical in light and dark** for every hue
scale (`blue-9` is `#0090ff` in both, `red-9` is `#e5484d`, `iris-9` is `#5b5bd6`). Only the
*neutral* scales change step 9 between themes. Your brand fill is one value; your neutrals flip.

### How to space the steps

**Not evenly.** Measured Radix `slate` deltas in OKLCH L:

```
light:  1→2 0.9   2→3 2.7   3→4 2.4   4→5 2.2   5→6 2.3   6→7 3.4
        7→8 5.9   8→9 14.9  9→10 3.5  10→11 10.8  11→12 26.1
dark:   1→2 3.5   2→3 3.9   3→4 3.1   4→5 2.9   5→6 3.5   6→7 5.3
        7→8 9.0   8→9 4.8   9→10 4.6  10→11 18.6  11→12 18.0
```

Steps 1–8 (every surface and border you own) live inside **20 points of lightness in light mode
and 30 in dark**. Then a cliff, and text lives at the far end. **An interface needs many tightly
packed values near the ground and two or three far away for text. It needs almost nothing in
between.** Linear's light theme makes this brutal: it ships **zero neutral tokens between L 61.8 and L 87.1**
— a 25.3-point hole in the middle of the ramp, verified across all 33 of its opaque low-chroma
tokens — and the product is fine.

Note the light/dark asymmetry: dark steps 1→6 are **1.3–3.9× wider** than the light ones. The eye
discriminates far better near white. Inverting a light ramp gives you a dark theme where the page
and the card are two points apart and therefore identical.

### Contrarian: Tailwind's ramp is not a UI ramp

Measured OKLCH L deltas down `neutral` (chroma exactly 0, so nothing is ambiguous). `gray`,
`slate`, `zinc` and `stone` match these to within ~1 L at every step:

```
50→100  1.5   100→200 4.8   200→300  5.2   300→400 16.2   400→500 15.2
500→600 11.7  600→700 6.8   700→800 10.2  800→900  6.4   900→950  6.0
```

The two largest steps in the whole ramp — 16.2 and 15.2 — sit exactly where UI needs values: the
region between "visible border" and "muted text." Above L 86 Tailwind gives you four steps
(50/100/200/300); Radix gives you eight (1–8) in the same range. That is the concrete reason every
Tailwind interface uses `gray-200` for every border and `gray-500` for every muted label: they are
the only steps that work. **That uniformity is a fingerprint.** If you stay on Tailwind, define the
missing steps rather than reaching for `gray-400`:

```css
@theme {
  --color-n-250: oklch(0.900 0 0);  /* the border-strong that doesn't exist */
  --color-n-350: oklch(0.800 0 0);  /* the missing mid step */
}
```

Also worth knowing: **Tailwind v4's palette is louder than v3's.** `violet-600` went from
`#7c3aed` (C 0.247) to `#7f22fe` (C 0.281); `violet-500` from `#8b5cf6` (C 0.219) to `#8e51ff`
(C 0.242). v4 targets P3 and clips into sRGB. If you moved v3 → v4 and things look more saturated,
they are.

### Why `#000` and `#fff` are wrong for text

Nobody serious ships either. The measured text primaries: Radix `#1c2024` (L 24.1), Primer
`#1f2328` (25.4), Mercury `#272735` (27.9), Linear `#282a2f` (28.5), Geist `#171717` (20.4),
Notion black-at-90%-alpha (effective 17.40:1), Stripe `#1a1f36` (24.7). shadcn's default theme
ships `--foreground: #000000`, `--card-foreground: #000000`, `--popover-foreground: #000000`.

At 21:1 / Lc 108, glyph edges shimmer against a paper-white ground on an LCD. Every product that
has done real typographic work backs off to 14–17.5:1. `#fff` as a *page or card background* is
fine and near-universal; it is white *text on a dark ground* that causes trouble.

### Warm versus cool

| Ramp | Hue | Max chroma | Reads as |
|---|---|---|---|
| Vercel Geist | none (C = 0.000) | 0.000 | engineered, clinical, brand-free |
| Notion `tatami` | 62–107 | 0.005 | paper, document, calm |
| Mercury `beige` | 88–106 | 0.019 | premium, warm-institutional |
| Radix `sand` | 68–107 | 0.010 | editorial, humane |
| Radix `slate` | 248–286 | 0.016 | modern-neutral, safe default |
| Primer | 244–258 | 0.023 | technical, dense |
| Stripe Sail | 236–274 | **0.044** | corporate-serious, visibly navy |
| Tailwind `slate` | 248–266 | **0.046** | same as Stripe, and everywhere |

**Stay under chroma 0.02 unless you mean it.** At 0.005–0.016 the tint is subliminal — users can't
name it, but a warm ramp makes the same layout feel less clinical. At 0.046 it is a visible color
decision.

Two details worth copying. **Chroma should arc, not stay constant.** Radix `slate` runs
0.001 → 0.016 (peak at steps 8–9) → 0.010: chroma peaks in the middle and falls at both ends,
because near white and near black chroma reads as a cast rather than warmth. **And hue should
drift.** Radix `slate` walks 286° → 248° down the ramp; Notion's warm gray walks 106° → 68° → 95°;
Linear's *surfaces* sit at hue 308–326 (pink) while its *text* sits at 259–296 (blue-violet) —
warm paper, cool ink, at chroma 0.003 where nobody can name it. Perfectly constant hue is a tell
that a ramp was generated rather than designed.

There is a fourth option nobody mentions: **tint your neutral with your brand hue.** Wise's neutral
ramp sits at hue 122–146 — *green* — at chroma 0.004–0.006: `content-primary #0e0f0c` (19.23:1),
`content-secondary #454745` (9.37:1), `content-tertiary #6a6c6a` (5.30:1). Nobody perceives those
as green. They perceive the product as coherent, because the near-blacks share a hue with the brand.
It is the cheapest way off `slate`.

**When warm is wrong:** monitoring dashboards, code editors, anything where a warm cast fights
syntax highlighting or amber status. **When cool is wrong:** anything selling comfort, wellness,
food, or money-you-already-own — Mercury went beige for exactly this reason.

## 3. From a palette to a semantic system

A palette is `gray-100 … gray-900`. A semantic system is `--surface-raised`, `--border-subtle`,
`--text-secondary`. **Components reference only semantic names.** The moment a component says
`gray-200`, dark mode becomes a find-and-replace instead of a token swap.

Mercury's complete semantic layer — the tightest one I measured, reproduced verbatim:

```
surface-default / -hover / -active      #ededf3  #dddde5  #c3c3cc
surface-elevated / -hover / -active      #ffffff  #fbfcfd  #f4f5f9
surface-input / -hover / -disabled       #fbfcfd  #ffffff  #ededf3
surface-emphasized / -hover / -active    #5266eb at 10% / 16% / 22%
surface-frosted / -hover / -active       #707393 at 10% / 16% / 22%
surface-primary / -hover / -active       #5266eb  #4354c8  #3442a6      (L 57.0 → 50.1 → 43.1)
surface-magic / -hover / -active         #5266eb  #4354c8  #3442a6      ← identical to primary
surface-inverted                         #1e1e2a
background-default / -secondary          #fbfcfd  #f4f5f9

border-subdued / -default / -emphasized  #c3c3cc  #535461  #272735
border-input / -focus / -error           #707393@22%  #5266eb  #d03275@22%

text-emphasized / -default / -subdued / -disabled   #1e1e2a #272735 #535461 #70707d
icon-emphasized / -default / -subdued / -disabled   #1e1e2a #272735 #535461 #70707d
text-primary (= accent) / -on-primary / -error      #5266eb #ffffff #d03275
```

Three things to steal:

**The icon family duplicates the text family exactly.** Four identical values, defined twice, so
icons can be optically corrected later without touching type. The token split is free; the
migration isn't.

**States are alpha of one value, not new hexes.** `surface-emphasized` is the accent at 10/16/22%.
`surface-primary`'s three states are three *opaque* values because they carry white text and alpha
would break that.

**Error hue is chosen to match the accent's lightness and chroma.** `#d03275` is L 58.0 C 0.199
H 0.2; `#5266eb` is L 57.0 C 0.200 H 272. Only hue differs.

### How many of each you actually need

| Family | Count | Notes |
|---|---|---|
| Surfaces | **3** + states | `sunken` / `default` / `raised`. A fourth is almost always a mistake. |
| Borders | **3** | `subtle` (dividers) / `default` / `strong` (focus, hover). |
| Text | **4** | `primary` / `secondary` / `tertiary` / `disabled`. Mercury 4, Linear 4, Primer 3, Radix 2. Nobody ships 5. |
| Icon | 0 or 4 | Split from text only if you'll optically correct. |
| Accent | **4** | `fill`, `fill-hover`, `text`, `wash`. |
| Status | 3–4 × 3 | Each of `success` / `warning` / `danger` (+ `info`) needs `text`, `fill`, `wash`. |

### Three values per status, not one with opacity

Wise's rule, measured live:

| Status | `content-*` (text) | L / C / H | on white | **APCA** | `background-*` (wash) |
|---|---|---|---|---|---|
| positive | `#008026` | 52.2 / 0.160 / 146 | 5.10:1 | **74.5** | `#36c797` at 10% (H **166**) |
| negative | `#cf2929` | 55.6 / 0.201 / 27 | 5.25:1 | **74.3** | `#ff8787` at 10% (H **21**) |
| warning | `#9a6500` | 55.0 / 0.117 / 73 | 4.96:1 | **74.0** | `#ffac00` at 10% (H 74) |
| accent | `#0097c7` | 63.3 / 0.126 / 230 | 3.36:1 | 60.4 | `#38c8ff` at 10% (H 229) |

**The three status foregrounds land within 0.5 Lc of each other** — 74.5 / 74.3 / 74.0 — tuned in
APCA, not WCAG (whose spread across the same three is 0.29).

Every wash is a *brighter, different* color, not the text color faded: positive shifts 20° of hue,
negative shifts 6°, and all three jump 20–25 L. Fading `#008026` to 10% gives a muddy gray-green;
`#36c797` at 10% still reads green.

Wise is also the clean example of a brand hue outside the white-text band, handled honestly. Its
`--color-interactive-accent` is `#9fe870` — chartreuse at L 85.7, where white text scores 1.47:1.
So the fill takes `#163300` at 9.45:1, and the link color is that same dark green at 13.93:1 on
white. No blue anywhere in the product. That is what "move off 270°" actually costs and buys.

Primer does the same and switches strategy per theme. In light, washes are opaque pastels
(`bgColor-success-muted: #dafbe1`). In dark, **they become alpha over the hue**:
`bgColor-success-muted: #2ea043` at 15%, `bgColor-danger-muted: #f85149` at 10%,
`bgColor-accent-muted: #388bfd` at 10%. Opaque dark tints look like mud; alpha over a dark ground
stays chromatic.

### Alpha tokens, and when they bite

Notion's entire neutral system is alpha:

```
alpha-black:  5% 10% 20% 30% 54% 59% 75% 90% 95%
alpha-white:  5% 10% 20% 30% 50% 66% 75% 85% 95%
text-strong = black 95% (19.44:1)   text-normal = black 90% (17.40:1)
text-muted  = black 54% (4.61:1)    text-disabled = black 30% (2.12:1)
border-base = black 10%
```

Alpha composes: one `border-base` works on a white page, an `#f6f5f4` card, and a colored callout
with no new tokens. Two costs, measured:

| Over | 5% | 8% | 10% | 15% | 20% | 25% |
|---|---|---|---|---|---|---|
| white → ΔL | −3.8 | −6.1 | −7.7 | −11.5 | −15.5 | −19.5 |
| `#0a0a0a` → ΔL | +5.7 | +8.9 | **+10.9** | +15.9 | +20.8 | +25.4 |

The same alpha is **~1.4× stronger** in dark. And alpha stacks: two adjacent cards each with a 10%
black border share an edge that composites to `#cfcfcf` (L 85.3) instead of `#e6e6e6` (L 92.3) — a
visibly darker seam every time two cards touch. Use alpha for hover overlays, scrims and edges over
imagery; use opaque values for text and for any surface that stacks.

### Elevation is a border, not a shadow

Vercel says this in tokens. Their real elevation primitive is named for what it is:

```css
--ds-shadow-border-base:   0 0 0 1px #00000014;   /* light:  8% black,  ΔL −6.1 */
                           0 0 0 1px #ffffff25;   /* dark:  15% white,  ΔL +15.9 */
--ds-shadow-border-small:  0 0 0 1px #00000014, 0px 2px 2px #0000000a;
--ds-shadow-menu:          0 0 0 1px #00000014, 0px 1px 1px #00000005,
                           0px 4px 8px -4px #0000000a, 0px 16px 24px -8px #0000000f;
```

Every Geist shadow is stacked black at 2–12% alpha. **No hue, ever.** Primer goes further and makes
the shadow color the darkest ramp step rather than black: dark-mode `shadow-resting-small` is
`0 1px 1px #01040999` where `#010409` is `bgColor-inset`. And Primer's floating shadow flips
strategy between themes — light: `0 0 0 1px #d1d9e040` (border at 25% alpha) plus blur layers;
dark: `0 0 0 1px #3d444d`, a **fully opaque** border. That is the dark-mode border rule shipped in
production code.

Only things that genuinely float — menus, modals, tooltips, toasts — get a real blur shadow, and
the border is still the first layer. **Caveat, and it's fatal:** `box-shadow` is stripped entirely
under `forced-colors: active` (measured below). A card whose only outline is a shadow-border
vanishes. Use a real `border` for anything structural.

### Scrims are not black

Two independent products:

- Linear: `--color-overlay-primary` is **white at 65%** in light mode, `#000000d9` (85% black) in
  dark.
- Primer: `--overlay-backdrop-bgColor` is `#c8d1da` (L 85.6) **at 40%** in light, `#212830` at 40%
  in dark.

A black scrim over a light page reads as "the lights went out." A light scrim reads as "this is
behind frosted glass," which is what a modal actually is. Worth trying before defaulting to
`rgba(0,0,0,0.5)`.

### The small tokens nobody defines and everybody notices

From Linear's shipped dark theme:

```css
--selection-bg:        color-mix(in srgb, #9c9da1 20%, transparent);  /* NEUTRAL, not brand */
--selection-bg-active: color-mix(in srgb, #5e69d1 40%, transparent);  /* brand only when focused */
--scrollbar-color:        #ffffff1a;   /* 10% */
--scrollbar-color-hover:  #ffffff33;   /* 20% */
--scrollbar-color-active: #ffffff66;   /* 40% */
--header-bg:              #0b0b0bcc;   /* 80% — sits under a backdrop-filter */
--focus-ring-outline:     1px solid #5e69d1;
--focus-ring-offset:      2px;
```

Text selection defaults to a **neutral 20% gray** and only becomes brand-colored in the focused
region. Selection appears in bulk, and bulk brand color is noise.

## 4. The accent

**One.** The complete list of permitted uses:

- primary action button
- current selection / active nav item
- focus ring
- links in body text
- one live/loading indicator

**Not:** headings, icons generally, section borders, card backgrounds, "featured" badges, avatar
backgrounds, chart series 1, hero gradients, illustrations, hover states of neutral things.

An accent is a pointer. Used twelve times, it points nowhere.

### Split it into two roles

| Role | Constraint | Target |
|---|---|---|
| **Fill** (button bg, selected row) | white text must pass on it | L 0.54–0.58 |
| **Text** (links, active icons, focus ring on light) | must pass on the page | L 0.50–0.56 light, L 0.65–0.72 dark |

Primer keeps them as separate tokens and the numbers show why: `bgColor-accent-emphasis` moves
`#0969da` → `#1f6feb` (+2.9 L, because it still carries white text) while `fgColor-accent` moves
`#0969da` → `#4493f8` (+12.3 L, because it now sits on a dark ground). Same token in light,
different tokens in dark.

You also need a fourth value: the **wash**. Mercury derives it as the accent at 10/16/22% alpha.
Linear ships it as a separate hex per theme (`#f1f1ff` L 96.2 light, `#18182f` L 22.2 dark) because
a 10%-alpha wash over a near-black page is nearly invisible — the dark tint has to be an opaque
value about 8 L above the page ground to register.

### Choosing the hue

Everyone lands in 255°–295° (Linear 278, Stripe 272, Mercury 272, Primer 258, Geist 258,
Notion 253) and the gamut table above explains why. That also makes it the most generic choice
available.

| Hue | Max C at L 0.55 | Reads as | Watch out |
|---|---|---|---|
| 25–40 red-orange | 0.22 | urgent, retail, consumer | collides with `danger` |
| 55–80 amber | 0.12 | warm, physical, craft | collides with `warning`; can't carry white text at all above L 0.7 |
| 145–165 green | 0.17 | money, growth, health | collides with `success`; fill needs dark text |
| 190–210 teal | 0.09 | calm, medical, infra | lowest chroma ceiling in the spectrum; will look washed |
| 255–295 blue-violet | 0.25 | software, trust, default | generic |
| 300–330 magenta | 0.25 | creative, bold | reads consumer/playful |

**If your brand hue collides with a status color, move the status color, not the brand.** Mercury
did exactly that: its error is `#d03275` at hue 0.2° — red pushed into pink, at the same L and C as
the primary.

## 5. Status colors

### Why naive red/yellow/green fails

1. Pure hues have wildly different lightness — `#ff0000` L 62.8, `#00ff00` L 86.6, `#ffff00` L 96.8.
   On white: 4.00 / 1.37 / **1.07**. Yellow is invisible. Darkening yellow into brown "fixes" it and
   now the three don't look like a set.
2. Green and amber have hard chroma ceilings at usable lightness: at L 0.55 red reaches 0.223,
   green 0.173, amber 0.116. Insisting on equal saturation forces you to break lightness, which
   breaks contrast.
3. Red-versus-green is the exact axis ~6% of men cannot use. Measured under a Machado severity-1.0
   deuteranopia simulation, **Primer's own dark-mode `#3fb950` (success) and `#f85149` (danger)
   collapse to ΔE(OKLab) 2.2** — both become roughly `#ac9b4e` mustard. GitHub gets away with it
   only because every state also carries a distinct glyph.

### The algorithm

Fix lightness, let chroma float. This is what Primer, Geist, Wise, Mercury and Stripe Sail all
independently do.

```css
/* on-light: every foreground status at L ≈ 0.55 */
--status-danger-text:  oklch(0.55 0.20  25);   /* ceiling 0.223 */
--status-warning-text: oklch(0.55 0.12  75);   /* ceiling 0.116 — do not ask for more */
--status-success-text: oklch(0.55 0.15 148);   /* ceiling 0.173 */
--status-info-text:    oklch(0.55 0.19 258);

/* fills that carry white text: same lightness, no change needed */
--status-danger-fill:  oklch(0.55 0.20  25);

/* washes: a BRIGHTER sibling at ~10-15% alpha, never the text color faded */
--status-danger-wash:  oklch(0.66 0.21  25 / 0.12);

/* dark theme: raise foregrounds to L 0.66-0.72, hold fills, keep chroma */
--status-danger-text:  oklch(0.67 0.20  25);
--status-warning-text: oklch(0.72 0.14  78);   /* amber climbs furthest */
--status-success-text: oklch(0.70 0.18 146);
--status-danger-fill:  oklch(0.58 0.20  27);   /* barely moved */
```

Amber always has to climb furthest in dark mode (Primer +16.5, Geist +24.4) because it started with
the least chroma to work with.

**Scope: lightness-locking is exactly what makes these colors indistinguishable in grayscale.**
Three foregrounds at L 0.55 are, by construction, the same gray on a monochrome laser printer, a
fax, an e-ink reader or a photocopy. If your statuses appear on an artifact that gets printed —
invoices, lab results, shipping manifests, boarding passes, medical charts — either offset the
lightnesses by ≥8 L (accepting a slightly less coherent screen palette) or make the glyph, not the
color, the thing that survives the print stylesheet. Verify by desaturating the screenshot, not by
reasoning about it.

### Never encode state in hue alone

Every status needs a second channel: a glyph, a shape, a label, a position, or a weight. GitHub's
issue rows pass — open is a green *circle-dot*, closed a purple *check-in-circle*, draft a gray
*outline*. Strip the color and the icons still say it. Given the ΔE 2.2 measurement above, the
icons are not decoration; they are the actual state indicator, and the color is decoration.

**The second channel does not have to be an icon, and in dense surfaces it must not be.** A 500-row
blotter, a spreadsheet under conditional formatting, or a heatmap cell has no room for a 16px glyph
per cell, and adding one destroys the density that is the product. There the second channel is the
value itself: a sign (`−1.4%`), an arrow glyph inside the existing number, right-alignment, a
column position, or a bar length. Reach for a per-row icon only where a row is at least 32px tall
and the state is not already legible from the data.

### Contrarian: you probably need more than four, and they aren't success/warning/danger

Primer ships `accent · success · attention · severe · danger · done · sponsors · upsell · open ·
closed · draft`. `open` is green, `closed` is red, `done` is **purple** (`#8250df`), `draft` is
gray, `severe` is orange (between attention and danger). Merged-PR purple is one of the most
recognizable colors in software and it exists because "success" was already taken by "open."

**Name your semantic colors after your domain's states, not after emotions.** A deploy tool needs
`queued / building / live / rolled-back`, not `info / warning / success / danger`. Deriving from a
generic four forces you to call a rollback "a warning," which is wrong and unmemorable.

## 6. Dark mode, done properly

### Elevation via lightness

Measured ladders (OKLCH L, then deltas):

```
Linear   marketing levels  13.9 → 17.2 → 19.5 → 21.7        (+3.3 +2.3 +2.2)
Linear   app surfaces      13.9 → 22.8 → 25.7 → 27.8        (+8.9 +3.0 +2.1)
Primer                     10.4 → 17.6 → 22.0 → 27.4 → 31.1 (+7.2 +4.4 +5.4 +3.7)
Radix slate                17.9 → 21.3 → 25.2 → 28.3 → 31.2 (+3.5 +3.9 +3.1 +2.9)
Geist                       0.0 → 14.6 → 21.6 → 23.8 → 28.0 (+14.6 +7.0 +2.2 +4.2)
```

**+3 to +5 L per elevation level, tapering as you go up.** Light-mode surface steps are 0.9–2.7
apart because the eye discriminates finely near white; dark mode needs 3–5. Inverting a light ramp
gives you a page and a card two points apart, which is invisible.

**Scope: lightness elevation only works when you own every layer beneath the panel.** In a canvas
product — Figma, a map, a photo or video editor, a whiteboard, a document with user-embedded images
— the ground is whatever the user put there, so "+4 L above the surface" is meaningless: the panel
can land darker than what it floats over and disappear. Same for a bottom sheet dragged over
scrolling content, and for anything behind a `backdrop-filter`. Over user content, elevation needs
an **opaque** panel plus a real shadow (or a scrim), and the shadow is load-bearing rather than
decorative. Apply the lightness ladder to app chrome; apply shadows to things that float over
content you did not author.

### Borders carry the structure

Linear's opaque borders, measured as ΔL from the page ground:

```
light theme (page #ffffff):   border-primary −6.8   secondary  −8.5   tertiary −10.7
dark  theme (page #08090a):   border-primary +12.6  secondary +18.8   tertiary +22.7
```

**Dark-mode borders are 1.9–2.2× stronger in lightness delta than the light-mode equivalents.** The
same pattern in alpha terms:

| System | Light | Dark | Multiplier |
|---|---|---|---|
| Geist `shadow-border-base` | `#00000014` (8%) | `#ffffff25` (**15%**) | 1.9× |
| Geist `gray-alpha-500` | 21% black | 24% white | 1.1× |
| Notion `border-base` | black 10% | white 10–20% | 1–2× |
| Primer `borderColor-translucent` | `#1f2328` @15% ¹ | `#ffffff` @15% | 1× ² |

¹ Note Primer's light translucent border is the *text color* at 15%, not pure black.
² Primer holds alpha constant but also ships opaque `#3d444d` borders that do the real work; its
dark floating shadow uses an opaque border where light uses a 25%-alpha one.

**If alpha is your only edge, start at 1.5–2× the light value and check by eye.**

### Desaturate — but only the roles that need it, and less than you think

Across Primer's seven semantic pairs, chroma moves by at most 0.041 while foreground lightness
gains +9.7 to +18.2. Across Geist's four, chroma moves at most 0.036 while lightness gains +14.8 to
+24.4. **The rule is: shift lightness, hold chroma.**

The two genuine desaturations I measured are Geist's focus ring (ΔC −0.062) and Linear's brand
(ΔC −0.049), and in both cases what changed is the token's *role* — from text-on-light to
fill-carrying-white-text — not the theme.

### Why `#000` backgrounds are usually wrong

1. **Halation.** At maximum lightness contrast, light glyphs bleed optically into the black ground
   — widely reported as much worse by people with astigmatism. `#fff` on `#000` is 21:1 / Lc −107.9
   and none of the products measured here ships it: Linear runs 18.73:1, Geist 17.94, Primer 17.39,
   Radix `slate` 16.25.
2. **You lose the bottom of your ramp.** If the page is `#000` there is no sunken surface. Primer
   keeps `bgColor-inset: #010409` (L 10.4) *below* `bgColor-default: #0d1117` (L 17.6) — seven
   points of headroom for wells, code blocks and empty states.

**When `#000` is right:** OLED-first mobile (real battery savings), video and photo review where any
non-black frame contaminates perceived color, cinema and media apps. Geist is the measured
exception and it handles it by putting all content on `#0a0a0a` above the black and setting text to
`#ededed`.

### The dark-mode checklist

```
[ ] Page ground L 0.14–0.18, chroma ≤ 0.015. (Linear #08090a C 0.003, Primer #0d1117 C 0.014.)
[ ] A sunken step exists below the page.
[ ] Elevation is lightness, +3 to +5 per level. No shadow doing the work.
[ ] Every panel has a visible edge: opaque border +12 to +20 L above the surface,
    or alpha at 1.5–2x the light-mode value.
[ ] Body text L 0.94–0.97, not 1.0.
[ ] Accent/status FILL kept its lightness; accent/status TEXT gained +10 to +20 L.
[ ] Chroma essentially unchanged in both.
[ ] Status washes are alpha over the hue (#2ea04326), not opaque tints.
[ ] Shadows are near-black or your darkest ramp step, never hue-tinted.
[ ] Scrim is #000 at 80–85% (light-mode scrim can be white/light — see above).
[ ] Images and illustrations checked. A white-background PNG will detonate the page.
```

## 7. OKLCH and perceptual uniformity

### What the problem actually is

In HSL, `hsl(60 100% 50%)` and `hsl(240 100% 50%)` claim the same lightness and differ in actual
luminance by roughly 15×. A ramp built by stepping HSL lightness looks even in blue and broken in
yellow. OKLCH fixes the L axis: equal L means equal perceived lightness across all hues. Chroma is
unbounded and gamut-limited, so `oklch(0.55 0.30 148)` doesn't exist and gets silently clipped —
which is why you need the gamut ceiling table above.

### A complete ramp, authored properly

Every hex below is the browser's own conversion of the `oklch()` beside it; every contrast number
is computed from that hex. Note three things: steps get *further* apart as they get darker, chroma
arcs up and back down, and hue drifts.

```css
:root {
  --n-50:  oklch(0.990 0.002 90);  /* #fcfcfa   page ground              */
  --n-100: oklch(0.975 0.004 88);  /* #f8f7f4   subtle surface      Δ1.5 */
  --n-150: oklch(0.955 0.006 85);  /* #f2f0ec   component bg        Δ2.0 */
  --n-200: oklch(0.930 0.008 82);  /* #eae7e2   component hover     Δ2.5 */
  --n-250: oklch(0.900 0.011 80);  /* #e2ddd6   component active    Δ3.0 */
  --n-300: oklch(0.860 0.014 78);  /* #d6d0c7   border subtle       Δ4.0 */
  --n-400: oklch(0.800 0.016 76);  /* #c4bdb3   border default      Δ6.0 */
  --n-500: oklch(0.700 0.017 74);  /* #a59d93   border strong       Δ10  */
  --n-600: oklch(0.600 0.016 72);  /* #867f76    3.95:1  Lc 67      Δ10  */
  --n-700: oklch(0.480 0.014 70);  /* #635c55    6.58:1  Lc 83      Δ12  */
  --n-800: oklch(0.380 0.011 68);  /* #46413c   10.09:1  Lc 93      Δ10  */
  --n-900: oklch(0.270 0.008 66);  /* #292622   15.06:1  Lc 102     Δ11  */
  --n-950: oklch(0.175 0.005 64);  /* #12100e   18.98:1  Lc 105     Δ9.5 */
}
```

The dark counterpart is not those numbers reversed — steps near the ground are wider:

```css
:root[data-theme="dark"] {
  --bg-sunken:      oklch(0.115 0.004 64);  /* #060504                          */
  --bg:             oklch(0.155 0.005 66);  /* #0e0c0a  page             Δ+4.0  */
  --surface:        oklch(0.200 0.007 68);  /* #181513  card             Δ+4.5  */
  --surface-2:      oklch(0.245 0.009 70);  /* #23201c  raised           Δ+4.5  */
  --hover:          oklch(0.275 0.010 72);  /* #2b2722                   Δ+3.0  */
  --active:         oklch(0.305 0.011 74);  /* #322e29                   Δ+3.0  */
  --border-subtle:  oklch(0.320 0.011 74);  /* #36322d                          */
  --border:         oklch(0.375 0.012 74);  /* #45403a  ΔL +22 vs page          */
  --border-strong:  oklch(0.450 0.013 74);  /* #5a544d                          */
  --text-disabled:  oklch(0.545 0.014 72);  /* #756f67   3.93:1  Lc −27         */
  --text-tertiary:  oklch(0.660 0.014 70);  /* #989189   6.27:1  Lc −43         */
  --text-secondary: oklch(0.790 0.012 68);  /* #c0b9b3  10.07:1  Lc −65         */
  --text-primary:   oklch(0.960 0.004 66);  /* #f4f1ef  17.36:1  Lc −99         */
}
```

On the dark ramp `--text-tertiary` is 6.27:1 — comfortably AA — but Lc −43,
*below* the Lc 60 floor for even large or secondary text. That is correct and intentional: tertiary is for metadata and column
labels, never a paragraph. Linear's dark tertiary sits at Lc −41.8, Primer's at −45.8. If you need
dark-mode body text at Lc 60+, you need `--text-secondary` at 10:1.

### Wide gamut: worth it for some hues, not others

Extra chroma available at L 0.55 in Display-P3 versus sRGB:

| Hue | sRGB | P3 | Gain |
|---|---|---|---|
| 145 green | 0.173 | 0.235 | **+36%** |
| 195 cyan | 0.094 | 0.126 | **+34%** |
| 258 blue | 0.204 | 0.259 | +27% |
| 75 amber | 0.116 | 0.133 | +15% |
| 25 red | 0.223 | 0.251 | +13% |
| 293 violet | 0.277 | 0.297 | **+7%** |

P3 helps most exactly where sRGB is weakest. **If your brand is teal, green or cyan, P3 with an
sRGB fallback is worth the complexity. If it's violet, it buys you 7% and isn't.** Ship it as
`@supports (color: color(display-p3 1 1 1))` or via `oklch()` with a `@media (color-gamut: p3)`
override — never as the only definition.

### The tools

| Tool | What it does | Use it when |
|---|---|---|
| **Radix Colors** | 12-step light + dark + alpha + P3 scales, documented step semantics, APCA guarantees I verified above | You want a correct system today and don't need brand-exact hues. Best default. |
| **Tailwind v4 `@theme`** | OKLCH palette, your tokens as first-class CSS vars | You're already on Tailwind. Add the missing 250/350 steps. |
| **Leonardo** (Adobe) | Generates ramps by *target contrast ratio* against a named background | Accessibility is a hard contractual requirement and you must prove each step. |
| **Huetone** | Interactive APCA-scored editor with chroma/lightness curves and a gamut-edge view | Hand-tuning a brand ramp. |
| **`apca-w3`** | The contrast model as a package | Any dark theme. |
| **`color-mix(in oklch, …)`** | Runtime derivation of hover/wash | Deriving 2–3 states from one token. Linear uses `color-mix(in lch, …)` and `in srgb` for selection. |
| **`light-dark()`** | One declaration, both themes: `color: light-dark(#1f2328, #f0f6fc)` | You've set `color-scheme: light dark` on `:root`. Halves your token file. Requires the `color-scheme` property to be set or it won't resolve. |

**When not to reach for a generator:** a six-screen internal tool wants Radix `slate` plus one
accent plus `red/amber/green` at L 0.55, and thirty minutes. Generated ramps are for systems that
outlive the person who made them.

## 8. Contrast: which standard to actually use

**Use both. WCAG 2 AA is the compliance floor. APCA is what you tune against for readability,
especially in dark mode.** WCAG 2's formula is known to be wrong for light-on-dark — that's why
APCA exists as candidate WCAG 3 guidance — but WCAG 2 AA is what regulation, procurement and audits
reference today. The Radix table above shows the practical consequence: they hold APCA constant and
let WCAG float from 4.4 to 11.5.

**WCAG 2 thresholds:**

| | AA | AAA |
|---|---|---|
| Body text (< 18.66px regular / < 24px bold) | 4.5:1 | 7:1 |
| Large text | 3:1 | 4.5:1 |
| UI component boundaries, focus indicators, meaningful icons | 3:1 | — |
| Disabled controls | exempt | — |

**APCA targets** (sign is polarity; compare magnitudes):

| Lc | Use |
|---|---|
| 90 | Body text at minimum weight/size; the ideal for reading |
| 75 | Body text 16px+ weight 400 — practical floor for prose |
| 60 | 18px+/medium; column headers, secondary text |
| 45 | Large headings, 24px+ bold |
| 30 | Non-text: disabled states, dividers — absolute floor for anything meaningful |
| 15 | Present-but-invisible dividers |

### The five things people get wrong

1. **Contrast against the *actual* background.** A wash-tinted or hovered row is not the page.
   Check `text-secondary` on `surface-hover`.
2. **Placeholder text is text.** It needs 4.5:1. Most in the wild are ~2.5:1.
3. **Focus rings need 3:1 against both the component and the page.** A blue ring on a blue button
   fails. Geist solves it with two layers, and the inner layer is the *page background*, not white:
   `0 0 0 2px hsla(0,0%,100%,1), 0 0 0 4px hsl(212 100% 48%)` in light and
   `0 0 0 2px hsla(0,0%,4%,1), 0 0 0 4px hsl(210 100% 66%)` in dark. That inner ring guarantees
   separation regardless of what's underneath. **shadcn's default `--ring: #a1a1a1` is 2.58:1 on
   the page and 2.37:1 on `--muted` — it fails 3:1 in both.** Its `--border: #e5e5e5` is 1.26:1.
4. **Disabled text is exempt from WCAG but not from being usable.** Mercury's `text-disabled`
   `#70707d` is 4.75:1 — comfortably readable. Disabledness is communicated by the cursor and the
   missing hover, not by illegibility. (Notion's `text-disabled` at black-30% is 2.12:1 / Lc 41.6,
   which is the other side of that argument.)
5. **Shipping products fail this too, and knowing is the difference.** Notion's `text-warning`
   `#ff6d00` is **2.82:1** on white; its `text-error` `#f64932` is 3.55:1; Linear's light link is
   3.85:1. If you ship a failure, ship it knowingly and never let it be the only cue.

## 9. Color for data visualization

Chart color is a different problem and the UI rules do not transfer.

### Categorical

**shadcn's default `--chart-1` … `--chart-5` are Tailwind v4 `blue-300 / 500 / 600 / 700 / 800`** —
I resolved the computed `lab()` values and they match exactly. That is a sequential ramp being used
as a categorical palette, baked into the most-copied default in the ecosystem, and adjacent series
differ by ΔE(OKLab) **5.9 in normal vision** — two neighbouring bars in a stacked chart are nearly
the same color before any vision difference is involved.

Minimum pairwise ΔE(OKLab)×100 under Machado 2009 severity-1.0 simulation (higher is better):

| Palette | normal | deuter | protan | tritan | **worst** |
|---|---|---|---|---|---|
| shadcn default (blue 300–800) | 5.9 | 5.2 | 5.3 | 6.0 | 5.2 |
| Tailwind-500 rainbow (red/amber/green/blue/violet) | 13.9 | **1.4** | 5.4 | 10.7 | **1.4** |
| IBM CVD-safe 5 | 11.4 | 8.4 | 10.7 | 5.2 | 5.2 |
| **Okabe–Ito 7** | 15.6 | **7.6** | 9.6 | 8.5 | **7.6** |
| Tol bright 6 | 18.0 | 8.3 | 8.9 | 3.3 | 3.3 |
| Tol muted 5 | 15.9 | 5.2 | 13.1 | 13.5 | 5.2 |

**The Tailwind rainbow is the worst option and the most common one:** `blue-500` `#2b7fff` and
`violet-500` `#8e51ff` collapse to ΔE 1.4 under deuteranopia — effectively the same color for ~6% of
men. **Okabe–Ito 7 has the best worst case** (7.6, the green/pink pair). IBM's set is close behind,
limited by magenta-vs-orange under tritanopia.

Caveat: **the ranking is model-dependent.** Under the older Viénot 1999 dichromat projection
the same palettes score much lower across the board (Okabe–Ito 1.2, IBM 2.1, Tol muted 3.7) and
produce out-of-gamut artifacts. What is stable across both models is the *ordering*: mono-blue and
the Tailwind rainbow are worst; Okabe–Ito, IBM and Tol muted are best. Don't quote a single ΔE as
gospel; use it to compare.

```
Okabe-Ito 7   #e69f00  #56b4e9  #009e73  #f0e442  #0072b2  #d55e00  #cc79a7
IBM 5         #648fff  #785ef0  #dc267f  #fe6100  #ffb000
Tol muted 5   #332288  #88ccee  #44aa99  #ddcc77  #cc6677
```

**Also check grayscale survivability** — printing, photocopying, and a fully useful sanity check.
Minimum adjacent lightness gap within each palette:

| Palette | L range | min adjacent gap |
|---|---|---|
| Tol muted 5 | 35–84 | **2.9** |
| shadcn default | 42–81 | 2.9 (but only one hue) |
| Tailwind-500 rainbow | 60–77 | 1.8 |
| IBM 5 | 59–81 | 0.8 |
| Okabe–Ito 7 | 53–90 | **0.2** |

Okabe–Ito is the best CVD performer and the *worst* grayscale performer. If your charts get
printed, Tol muted wins. **"Colorblind-safe" is not one property.**

**Boundary condition on the light end:** IBM's `#FFB000` is 1.83:1 on white. Fine for filled areas,
bars and 8px+ dots; useless for 1px lines, small text or thin strokes on a light ground.

**Five is the ceiling.** Past 5–6 categories no palette separates cleanly. Group the tail into
"Other" and let people drill in. And direct-label the series or vary the mark — a legend mapping
five colors to five names is already a failure for the 6% and a nuisance for everyone.

### Sequential

One hue, walk lightness monotonically. Verify by sorting your stops by OKLCH L and confirming the
order matches the data order. Never walk chroma without walking L — a chroma-only ramp is invisible
in grayscale and to CVD viewers.

```css
--seq-1: oklch(0.96 0.03 258);  /* #e6f3ff   1.13:1 on white */
--seq-2: oklch(0.88 0.07 258);  /* #bbdaff   1.44:1 */
--seq-3: oklch(0.78 0.11 258);  /* #8bb9fd   2.01:1 */
--seq-4: oklch(0.66 0.15 258);  /* #5492ec   3.13:1 */
--seq-5: oklch(0.54 0.19 258);  /* #1069da   5.18:1 */
--seq-6: oklch(0.42 0.17 258);  /* #0046a7   8.63:1 */
```

Chroma rises to step 5 then falls — not a mistake. At L 0.42 and hue 258 the sRGB gamut ceiling is
about 0.17 (see the table); asking for 0.19 silently clips to something you didn't choose.

### Diverging

Two hues, a *neutral* midpoint (your `n-100`, not white), symmetric lightness on both arms. **Not
red↔green.** Blue↔orange (258° ↔ 42°) or purple↔gold (293° ↔ 76°) survive every CVD type and read
as "opposite" without the traffic-light baggage. In double-entry accounting neither side is "good,"
which is why ledger UIs head debits and credits in two neutrals rather than green and red.

## 10. Color blindness and forced colors

### Color blindness

Prevalence: deuteranomaly/deuteranopia ~6% of men, protan ~2%, tritan ~0.01%. Roughly 1 in 12 men,
1 in 200 women.

**The rule: color is never the only channel.** Icon, shape, label, position, or weight.

**The test: simulate.** The Machado matrices are twelve lines (script at the end). Run your
screenshot through deuteranopia and protanopia and check every pair that must be distinguished.

### Forced colors

`forced-colors: active` — Windows High Contrast, and increasingly a general OS accessibility mode.
I tested this in Chromium 148 with a real page. The results are more aggressive than most people
assume:

| Property | Under `forced-colors: active` |
|---|---|
| `background-color` | **Forced** to `Canvas`. A `#dcfce7` success badge became white-on-white. |
| `color` on HTML elements | Forced to `CanvasText`. |
| `color` on **`<svg>` elements** | **NOT forced.** My `<svg style="color:#e7000b">` kept `rgb(231,0,11)`. Icons using `fill="currentColor"` survive; the text beside them does not. |
| `border-color` | Forced to `CanvasText` — **but the width survives.** |
| `border-width` | Preserved. This is what saves you. |
| `outline-color` / `outline-width` | Color forced, **width preserved** (my 2px ring stayed 2px). |
| `box-shadow` | **Removed entirely.** Computed `boxShadow: none`. |
| `background-image` (gradient) | **Removed**, and the background became `rgba(255,255,255,0)` — fully transparent, not Canvas. |
| `forced-color-adjust: none` | Opts the element out entirely; my `#8b5cf6` background and white text survived exactly. |

Concrete consequences, in priority order:

1. **A filled button with no border becomes a bare text label.** Measured:
   `<button style="background:#2b7fff;color:#fff;border:0">` computes to white background, black
   text, 0px border. The fix costs nothing: **`border: 1px solid transparent`** computes to
   `1px solid rgb(0,0,0)` and the button survives. Notion ships exactly this — its `ghost`,
   `primary` and `secondary` button variants all define `--tatami-color-button-*-border: #ffffff00`,
   a fully transparent border that exists only so forced-colors has something to paint.
2. **Shadow-as-border evaporates.** The Geist/Vercel `0 0 0 1px` technique is elegant and it
   vanishes. Use a real `border` for anything structural.
3. **Focus rings must be `outline`, not `box-shadow`.** Outline survives at full width with a
   system color; box-shadow disappears completely. Highest-impact item here — a lost focus ring
   makes the product keyboard-unusable.
4. **Wash-background badges vanish.** Add a border or a glyph.
5. **Do not assume the system colors are the colors their names suggest.** Measured in Chromium's
   default forced-colors emulation: `GrayText` is **`rgb(96, 0, 0)`** — a dark red. `Highlight` is
   `rgba(5, 0, 73, 0.8)`. `LinkText` is `rgb(0, 0, 159)`. `AccentColor` and `AccentColorText` both
   resolved to `rgb(0,0,0)`, i.e. useless for distinguishing anything. Use the keywords for their
   *roles*, never for their appearance.

```css
@media (forced-colors: active) {
  .btn           { border: 1px solid ButtonText; }
  .badge         { border: 1px solid CanvasText; }
  :focus-visible { outline: 3px solid Highlight; outline-offset: 2px; }
  .swatch        { forced-color-adjust: none; border: 1px solid CanvasText; }
}
```

The `.swatch` line is the pattern for anything where the color *is* the content — swatches, chart
marks, image editors. Opt out, but keep a forced border so the element still has an edge.

Related and cheap: honor `prefers-contrast: more` by swapping `--border-subtle` to
`--border-strong` and raising text one level. It's a five-line block and it's the only thing many
low-vision users need.

## 11. What a palette signals

Observed correlations across the products measured here, not laws. Useful because they tell you
what you are accidentally saying.

| Signal | How it's built | Measured example |
|---|---|---|
| Institutional / serious money | warm low-chroma neutral, near-black text, one blue-violet accent used twice a screen | Mercury: beige ramp hue 88–106, text `#272735`, accent `#5266eb` |
| Technical / dense / for engineers | cool blue-tinted neutral, high density, a semantic color per *domain* state | Primer: neutrals hue 244–258, eleven semantic families |
| Brand-free / engineered | chroma exactly 0, pure grayscale plus one focus blue | Geist: `hsla(0,0%,X%)` throughout |
| Calm / document / long-session | warm neutral, alpha-based tokens, almost no saturated color | Notion: `tatami` hue 62–107, text as black-at-alpha |
| Premium / editorial | high-contrast near-black on off-white, one restrained accent | Radix `sand` |
| Consumer-friendly | brighter accent (L 0.62+), higher chroma, more of it | Linear light brand `#7170ff` L 62.3 vs dark `#5e6ad2` L 56.7 |
| AI slop (2026) | translucent `white/10` cards over a blob-gradient dark ground, an emerald→teal or violet→blue two-stop gradient, a colored 4px card edge, one `oklch()`-authored palette that is still Tailwind's | see below |

These are gradients, not categories, and **the role you put a color in changes the color** — Linear
ships the same brand identity at L 62.3 C 0.207 in light and L 56.7 C 0.159 in dark because the
token's job changed.

---

## When this advice is wrong

- **Monitoring, trading and observability.** These are *supposed* to be loud. A trading terminal
  where 15% of pixels are red or green is doing its job. What still applies: fix lightness across
  your status hues, never use hue alone, and give the surrounding chrome a boring ramp so the data
  pops.
- **Children's products, games, creative tools, consumer social.** Restraint is not universally
  virtuous. Figma, Procreate and Duolingo use far more color than anything measured here and are
  better for it. The transferable rule is *intentionality*, not scarcity.
- **Marketing pages.** A landing page is an ad. Gradients, big flat fields and saturated
  illustration are legitimate there. Mercury's homepage is 6.60% chromatic and correct; the product
  behind the login is not. **Do not let the marketing palette leak into the app.**
- **Charts, maps, image editors, color pickers, design tools.** Color *is* the content. Use
  `forced-color-adjust: none`, use P3 where it helps (green/cyan/blue — see the table), ignore the
  chromatic-pixel budget entirely.
- **Content platforms where users choose colors.** GitHub's neutrality is a *service* to
  user-authored label colors. If your users color things, your chrome must be quieter than theirs.
- **Canvas products, and anything floating over user content.** Lightness elevation assumes you
  own every layer beneath the panel. Over a Figma canvas, a map, a photo or a dragged-up sheet you
  do not, so the panel must be opaque and the shadow is structural rather than decorative.
- **Artifacts that get printed.** Lightness-locked status colors are, by construction, the same
  gray in grayscale. Offset by ≥ 8 L or put the signal in the glyph.
- **Dense grids.** "Every status needs a glyph" is right at 32px+ row heights and wrong in a
  500-row blotter. There the second channel is the sign, the column or the bar length.
- **You already have a design system.** Read it and use it. Two color languages in one product is
  worse than one imperfect language. Extend it with the missing steps rather than importing a ramp.
- **Very small surfaces.** A three-screen internal tool does not need 12 steps and a semantic layer.
  Radix `slate` + one accent + red/amber/green at L 0.55 is twenty minutes and correct.
- **`#000` and true white.** Right for OLED-first mobile, video/photo review, cinema.
- **The 0.55 lightness rule itself.** It targets *light* backgrounds. On a dark-only product,
  target L 0.66–0.72 for foregrounds and L 0.55–0.58 for fills, exactly as Primer does.
- **"Always 8-step scales" / "always Inter" / "always `slate`" / "always desaturate in dark."** All
  four are defaults, and all four are why the output is recognizable. The last one the data
  actually contradicts.

---

## The color of AI-generated UI, and what to do instead

I built the canonical version and its correction and measured both. Same information, same four
metrics, same table, same chart.

| | chromatic pixels (C>0.04) | strong (C>0.10) |
|---|---|---|
| The AI-default dashboard | **11.60%** | 4.38% |
| The corrected dashboard | **0.30%** | 0.25% |

**39× less color, and the corrected version is more readable, not less** — because in the default
version the one thing that is actually wrong ("Contoso Ltd — Past due") is the *least* salient
element on the screen, an amber pill competing with four saturated stat cards, a five-color bar
chart and a violet gradient button. In the corrected version there is exactly one red thing on the
page and you find it in under a second.

### What is still true in 2026, and what has moved

Re-checked 2026-09 against current v0 / Lovable / Bolt output and the public critique threads. The
violet gradient is no longer the *most* common tell — agents have been told about it enough that
they now dodge it, and the dodges are the new tells. Ranked by how reliably each one identifies
generated UI today:

| Rank | Tell | Status since the 2023 list |
|---|---|---|
| 1 | Translucent card (`bg-white/10` + `backdrop-blur-xl` + `border-white/20`) on a dark blob gradient | **new / dominant** — the "liquid glass" revival |
| 2 | A 4px colored top or left edge on every card | **new** |
| 3 | Emerald→teal or cyan two-stop gradient | **new** — the anti-violet dodge |
| 4 | Full-page animated mesh / blob gradient behind the content | **new** |
| 5 | Palette authored in `oklch()` but numerically identical to Tailwind | **new** |
| 6 | Violet→blue gradient, `#8b5cf6` accent, colored glow | still present, less dominant |
| 7 | shadcn defaults untouched (`#000` text, `#a1a1a1` ring) | unchanged and still the highest-yield grep |
| 8 | Four pastel stat cards with four colored icon chips | unchanged |
| 9 | Gradient-clipped heading text | fading — now rare enough to read as deliberate |

Numbers 1–5 are covered in §10–§13 below. Everything the 2023 list flagged is still worth fixing;
none of it is sufficient any more.

### 1. The violet→blue gradient

`linear-gradient(to right, #8B5CF6, #3B82F6)` on the hero, the primary button, the icon container,
the "AI" badge and the empty-state illustration.

**Why it's wrong, specifically:** white on `#8b5cf6` is **4.23:1** and white on `#3b82f6` is
**3.68:1** — a gradient between two failing colors fails everywhere along its length. Tailwind v4's
updated `violet-500` `#8e51ff` is 4.40:1: still failing. And the gradient is stripped entirely under
`forced-colors: active` (measured — `backgroundImage: none`, background `rgba(255,255,255,0)`),
leaving an unstyled box.

**Instead:** one flat accent at L 0.54–0.58 on the primary button only. If you genuinely need a
gradient, put it behind content as a very low-chroma wash (`oklch(0.97 0.02 280)` →
`oklch(0.98 0.01 250)`) where nothing sits on it, or on one decorative element carrying no text.
The rule is about **two-stop brand gradients under text**, not about violet — see §12 for the
emerald version of the same mistake.

**The counterexample, measured:** Linear ships an in-product AI agent panel. In the homepage
screenshot it is a `#0f1011` surface with a `#ffffff14` hairline and a monochrome logo. Mercury's
`--surface-magic` — the token literally named for its AI surface — resolves to `#5266eb`, which is
byte-identical to `--surface-primary`, and its hover and active states are identical too. Both
companies decided the AI feature should look like the rest of the product.

### 2. `#8B5CF6` as the accent

**Why it's wrong:** it fails at the fill role, it is the single most over-represented hue in
generated UI, and at chroma 0.219 it is louder than every accent measured here (Linear 0.207,
Geist 0.214, Mercury 0.200, Primer 0.191, Notion 0.183, Stripe 0.165).

**Instead:** if you want violet, take it to L 0.54 where white passes — Tailwind v3's `violet-600`
`#7c3aed` (L 54.1) gives 5.70:1; v4's `#7f22fe` gives 5.89:1. Better: move the hue. 25°, 45°, 145°
and 200° are all under-used and instantly less generic — accepting from the gamut table that
green/teal fills will need dark text. Best: derive the hue from something in the product's actual
domain.

### 3. Glow

`box-shadow: 0 0 40px rgba(139,92,246,0.4)` on cards, buttons and inputs.

**Why it's wrong:** it's a light-emission metaphor on flat surfaces, it makes every element compete
for the foreground, and it's removed entirely under forced-colors. **No product measured in this
file uses a colored glow anywhere.** Every Geist shadow is stacked black at 2–12% alpha; Primer's
are its own darkest ramp step; Linear's largest is black at 35%.

**Instead:** a 1px border and a near-black shadow. If something must feel active, use motion (a
200ms opacity fade) or a 2px accent border, not a halo. The one legitimate glow is a focus ring, and
it must be an `outline`.

### 4. Oversaturated dark mode

Tinted near-black page (`#0f0a1e`), accents at full chroma, secondary text at `#a78bfa`, borders at
5% white.

**Why it's wrong, with the numbers:** the tinted ground makes every hue on top read as a variant of
the tint. And 5% white over an L 14.6 ground gives ΔL **+5.7** — the same size as one elevation
step, so the edge reads as another surface rather than a boundary. 15% gives ΔL +15.9, which reads
as an edge. Measured dark grounds for comparison: Linear `#08090a` chroma 0.003, Radix `#111113`
chroma 0.004, Primer `#0d1117` chroma 0.014 — all essentially neutral.

**Instead:** near-neutral ground at L 0.14–0.18, chroma ≤ 0.015; borders at 15% white or an opaque
value +12 to +20 L above the surface; text-role accents raised to L 0.66–0.72 with chroma
essentially unchanged.

### 5. Pure black text on pure white

`--foreground: #000` / `--background: #fff`. This is shadcn's shipped default — I read
`--foreground`, `--card-foreground`, `--popover-foreground` and `--sidebar-foreground` all as
`#000000` off `ui.shadcn.com`.

**Instead:** `oklch(0.24–0.29 …)`. `#1c2024`, `#1f2328`, `#282a2f`, `#272735` — take any measured
value. One token, and the whole page loses a degree of harshness.

While you're in there: shadcn's `--ring: #a1a1a1` is **2.58:1** against the page — it fails the
3:1 non-text requirement, so the default focus ring in the most-copied component library in the
ecosystem is not compliant. Replace it with your accent at L ≤ 0.58 and give it an offset.

### 6. Every card gets a colored accent

Four stat cards, four pastel backgrounds, four colored icon chips: blue for revenue, green for
users, amber for orders, purple for "AI insights."

**Why it's wrong:** the colors are arbitrary, so they encode nothing, so they are pure decoration
that consumes the whole color budget. When something is actually wrong there is no contrast left to
signal it with — demonstrated above, where "Past due" disappears. It also drives chromatic pixel
share past 10%.

**Instead:** all four cards on the same neutral surface with the same neutral border. Color enters
only when a number is bad. Then the one red card is unmissable.

### 7. Five shades of one blue as a categorical palette

The shadcn `--chart-1..5` default. ΔE 5.9 between adjacent series in *normal* vision. Replace with
Okabe–Ito or IBM (Decision 9).

### 8. Semantic colors as decoration

Green checkmarks in a pricing feature list; a red "Popular" badge; amber icons for "fast."

**Why it's wrong:** every time success-green appears where nothing has succeeded, green means less.
Semantic color has a budget and marketing decoration spends it.

**Instead:** feature-list checkmarks in `text-tertiary`. Badges neutral or accent. Save green for a
state that changed.

### 9. The gradient text heading

`background-clip: text` on a violet→blue gradient. Its contrast is undefined (it varies along the
glyph), it is unselectable-looking, it disappears in forced-colors, and it is the single fastest
visual tell in the list. **Instead:** `--text-primary` at 20–24px, weight 600, letter-spacing
−0.01em. Hierarchy from size and weight, not from hue.

### 10. The translucent card — "liquid glass"

`bg-white/10` + `backdrop-blur-xl` + `border-white/20` + `rounded-2xl`, on every card, over a dark
gradient page. This is now the single most reliable tell in generated UI.

**Why it's wrong, with the numbers.** The card has no lightness of its own — it inherits whatever
is behind it. Measured on the canonical `slate-950 → purple-950` page: the same 10%-white card
computes to `#1b1f2e` (L 24.3) at one end of the viewport and `#432874` (L 35.4) at the other, an
**11.2-point swing**. Your dark elevation step is +3 to +5 L, so the card's ground noise is two to
four elevation steps wide: a card can read as raised on the left of the screen and sunken on the
right. Text contrast becomes a range, not a value — `slate-400` secondary text on that card runs
**6.39:1 / Lc −49.7** to **4.56:1 / Lc −44.0**, and the whole range sits under the Lc 60 floor for
secondary text. Stack two glass cards and the inner one is +8.9 L above the outer, larger than a
real elevation step, so nesting invents surfaces. In light mode over imagery it is worse: `white/30`
over a black photo region is `#4c4c4c`, where your `#1f2328` body text is **1.84:1**; over a white
region it is `#ffffff`, where white text is **1.00:1**. And `backdrop-filter` is dropped under
`forced-colors: active` and under `prefers-reduced-transparency: reduce`, so the blur that was
supposed to separate the card from the page is the first thing to go.

**Instead:** opaque surfaces from the ramp, `+3 to +5 L` per level, with a real border. Glass is
legitimate in exactly two places, both of which Linear and Primer ship: a **header or toolbar
pinned over scrolling content of your own** (Linear's `--header-bg: #0b0b0bcc` under a
`backdrop-filter`), and a **control floating over user media** — a video scrubber, a map control.
In both cases the element is small, transient and carries no body text. A card that holds a
paragraph is never glass.

### 11. The colored card edge

`border-left: 4px solid` (or `border-top`) in the accent or a per-category hue, on every card in a
list. The 2026 replacement for the pastel stat-card background, and it fails the same way: with N
cards you have used the accent N times, so it points at nothing. It also creates a second border
language — one colored edge and three neutral ones on the same rectangle — and it is the only place
chroma above 0.10 appears in your chrome, which is exactly the budget you were saving for the one
card that is actually in trouble.

**Instead:** a neutral border on all of them, and a colored edge on the one card whose state
changed. If the edge is genuinely encoding a category, it needs a label too — a 4px stripe is the
purest possible case of hue-only encoding and it collapses under deuteranopia.

### 12. The emerald→teal gradient

`linear-gradient(to right, #10b981, #14b8a6)` — the "not-violet" dodge, now the default for
anything fintech, health or sustainability shaped.

**Why it's wrong:** it is the violet mistake with worse numbers. White on `#10b981` is **2.54:1**;
white on `#14b8a6` is **2.49:1**. The violet it replaced (`#8b5cf6`) was 4.23:1 — already failing,
and this is **41% worse**. Dropping to the 600s barely helps: `#059669` is 3.77:1, `#0d9488` is
3.74:1. This is not a Tailwind defect, it is the gamut: to carry white text a fill has to reach
L ≈ 0.55, and at L 0.55 the sRGB chroma ceiling is 0.173 for green and **0.094 for teal** (see the
gamut table) — the vivid teal you picked and a teal that carries white text are not the same color
and cannot be.

**Instead:** pick the polarity deliberately. Either keep the vivid green/teal as a fill and put
**dark** text on it — Wise's `#9fe870` with `#163300` at 9.45:1 is the worked example — or take the
hue to L 0.55, accept the drop in chroma, and stop calling it a gradient.

### 13. The blob-gradient page ground

An animated `slate-950 → purple-950` mesh or two blurred radial blobs behind the whole page.

**Why it's wrong, with the numbers:** `#020617` is L 12.9 **chroma 0.041** and `#2e1065` is
L 28.3 **chroma 0.135**. The dark-mode ground rule in §6 is L 0.14–0.18 at chroma ≤ 0.015; these
stops are **2.7× and 9× that chroma ceiling**, and the ground's own lightness varies by 15.4 points
across the viewport. Every surface, border and text token you defined against "the page" is now
defined against a moving target, and every hue placed on top reads as a variant of the local tint.
Measured real dark grounds for comparison: Linear `#08090a` C 0.003, Radix `#111113` C 0.004,
Primer `#0d1117` C 0.014.

**Instead:** a flat ground at L 0.14–0.18 and chroma ≤ 0.015. If the marketing page wants
atmosphere, keep it on the marketing page, cap it at chroma 0.03, and put nothing on top of it that
has to be read.

### 14. An `oklch()` palette that is still Tailwind's

Now that the ecosystem defaults are authored in `oklch()`, generated themes are too — and the
values are unchanged. `oklch(0.601 0.242 293.9)` **is** `#8e51ff`. The syntax is not the decision.

**The grep:** convert every `oklch()` in your token file back to hex and diff it against the
Tailwind palette. If more than two or three survive the diff, you have a Tailwind theme in OKLCH
notation, not a color system. What OKLCH is actually for is the two things Tailwind's palette does
not give you — a lightness-locked ladder across hue families, and the missing 250/350 neutral steps.
If neither is present in your file, you gained nothing by switching notation.

---

## Self-check

Every item is a shell command, a script call, or a single yes/no question about one screenshot.
Nothing here says "check that it feels right." Two prerequisites:

```bash
# 1. one screenshot per theme, at the width you actually ship
node shot.mjs https://localhost:3000/app 1440 light > light.png
node shot.mjs https://localhost:3000/app 1440 dark  > dark.png
# 2. the token audit script from the last section
python3 audit.py tokens.css          # prints PASS/FAIL per check below
```

**Measure**

| # | Check | How |
|---|---|---|
| M1 | Chromatic pixel share < 1% (hard ceiling 3%; marketing < 6%) | `python3 chroma.py light.png`. **Crop out data regions first** — calendar grid, chart plot area, code pane, map, thumbnails — and say in the result which region you cropped. |
| M2 | ≤ 5 distinct hue families in the token file | `grep -oE 'oklch\([0-9.]+ [0-9.]+ ([0-9.]+)' tokens.css \| awk '{print int($3/30)}' \| sort -u \| wc -l` — bucket hues by 30°; more than 5 buckets needs a written reason in the file. |
| M3 | Zero color literals outside the token file | `grep -rnE '#[0-9a-fA-F]{3,8}\b\|rgba?\(\|hsla?\(\|oklch\(' src/ --include='*.{ts,tsx,js,jsx,css,scss,vue,svelte}' \| grep -v tokens.css` → must be empty. |

**Neutral ramp**

| # | Check | How |
|---|---|---|
| N1 | 10–12 neutral steps, authored in `oklch()` | `grep -cE '^\s*--n-[0-9]+:\s*oklch' tokens.css` → 10–12. |
| N2 | Neutral chroma ≤ 0.02 at every step | `audit.py` check `neutral-chroma`. Over 0.02 must be a stated brand decision, not a default. |
| N3 | Surface steps (ramp 1→5, everything above `border-subtle`) 0.9–3.0 L apart in light, 2.5–5.5 in dark; border steps then widen to 3–6 | `audit.py` check `surface-deltas`. Prints every delta; the dark ramp must not be the light one reversed. |
| N4 | Three distinct border values exist and all three are used | `grep -cE '^\s*--border-[a-z]+:' tokens.css` → ≥3, **and** `grep -rc 'var(--border-strong)' src/` → > 0 for each of the three. A defined-but-unused border weight is not three weights. |
| N5 | Chroma peaks mid-ramp; hue is not constant | `audit.py` check `chroma-arc` — fails if chroma is monotonic across the ramp or if all steps share one hue to within 1°. |
| N6 | Text is not `#000`; dark body text is not `#fff` | `grep -nE '\-\-(text\|foreground)[a-z-]*:\s*(#000000?\|#fff(fff)?\|oklch\(\s*[01](\.0+)?\s)' tokens.css` → must be empty. |

**Semantic layer**

| # | Check | How |
|---|---|---|
| S1 | No component references a ramp step | `grep -rnE 'var\(--(n|gray|slate|zinc|neutral)-[0-9]' src/` → empty. |
| S2 | 3 surfaces, 3 borders, 4 text levels — no fifth | `for k in surface border text; do echo -n "$k "; grep -cE "^\s*--$k-[a-z]+:" tokens.css; done` → 3 / 3 / 4. |
| S3 | Every status role has `text`, `fill` and `wash` | `for st in success warning danger info; do for r in text fill wash; do grep -q -- "--status-$st-$r:" tokens.css \|\| echo "missing $st-$r"; done; done` → prints nothing. |
| S4 | Every wash is a *brighter* sibling, not the text color faded | `audit.py` check `wash-lightness` — the wash's base hue must be ≥ 8 L above the matching `-text` token. |
| S5 | All status foregrounds within ±0.03 L of each other; all fills too | `audit.py` check `status-lightness-lock`. |
| S6 | Every state your backend can emit has a token | `comm -13 <(grep -oE -- '--status-[a-z]+-text' tokens.css \| cut -d- -f4 \| sort -u) <(your API's status enum \| sort -u)` → empty. Generic `info/warning/success/danger` against a domain enum of `queued/building/live/rolled-back` fails this. |

**Accent**

| # | Check | How |
|---|---|---|
| A1 | The accent appears on ≤ 5 element types | `grep -rlE 'var\(--accent-(fill\|text)\)' src/ \| sed 's#.*/##' \| sort -u` → list the files and name the element type each one is. More than five entries, cut. Identity color (per-workspace, multiplayer, tenant) is a separate token family and does not count — see the scope note in "If you only apply five things". |
| A2 | `fill`, `fill-hover`, `text` and `wash` are four separate tokens | `grep -cE '^\s*--accent-(fill\|fill-hover\|text\|wash):' tokens.css` → 4. |
| A3 | White on the fill ≥ 4.5:1, or you know it doesn't | `audit.py` check `accent-fill-contrast`. If it fails, `grep -rn 'var(--accent-fill)' src/` and confirm every hit has a non-color affordance too. |
| A4 | If white fails on the fill, `--accent-fill-on` is declared and passes | `audit.py` check `accent-fill-polarity`. Hue is not the test — Primer's `#0969da` at hue 258° carries white fine. Contrast is the test. |

**Dark mode** (read from `dark.png` and the audit)

| # | Check | How |
|---|---|---|
| D1 | Page L 0.14–0.18, chroma ≤ 0.015; a sunken step exists below it | `audit.py` check `dark-ground`. |
| D2 | Elevation is lightness, not shadow | Screenshot: sample the page pixel and a card pixel. If the two RGB values are equal, elevation is doing nothing but shadow. |
| D3 | Every panel has a visible edge | Screenshot: sample one pixel on each side of a card's boundary. ΔL must be ≥ 12. |
| D4 | Accent/status text +10 to +20 L vs light; fills unchanged; chroma unchanged | `audit.py` check `theme-delta` — diffs the light and dark token blocks. |
| D5 | Status washes are alpha over the hue, not opaque tints | `grep -A200 'data-theme="dark"' tokens.css \| grep -- '--status-.*-wash'` → every value carries an alpha component. |

**Contrast**

| # | Check | How |
|---|---|---|
| C1 | Body text ≥ 4.5:1 **and** ≥ Lc 75 against its *real* background | `npx axe --load-delay 2000 <url>` for WCAG, plus `audit.py` check `apca-pairs` on the pairs axe reports. Run it once with the row-hover class forced on. |
| C2 | Dark-mode body text carries ~2 more WCAG points than light | `audit.py` check `theme-delta` prints both. |
| C3 | Focus ring ≥ 3:1 against both the component and the page | `audit.py` check `focus-ring` (needs `--focus-ring`, `--accent-fill`, `--bg`). |
| C4 | Placeholders ≥ 4.5:1; disabled text still legible | `grep -- '--text-placeholder\|--text-disabled' tokens.css` then `audit.py` check `text-roles`. |

**Robustness**

| # | Check | How |
|---|---|---|
| R1 | Every must-distinguish pair survives deuteranopia and protanopia | `python3 cvd.py light.png deuteranopia > d.png` (matrices in the last section), then look at `d.png` and answer: can you still tell the success row from the danger row? |
| R2 | Nothing communicates state by hue alone | `python3 cvd.py light.png grayscale > g.png`. Every status in `g.png` must still be identifiable. In dense grids the second channel may be the sign or the column, not an icon. |
| R3 | Statuses survive print | Same `g.png`. If two statuses are the same gray and the artifact gets printed, offset by ≥ 8 L or move the signal into the glyph. |
| R4 | `forced-colors: active` — buttons keep an edge, focus rings are `outline`, nothing structural is `box-shadow` | `newContext({ forcedColors: 'active' })`, screenshot, then: `grep -rn 'box-shadow' src/ \| grep -iE 'border\|ring\|outline\|card\|panel'` → every hit needs a matching real `border` or `outline`. |
| R5 | Chart palette min pairwise ΔE ≥ 7 under the worst CVD model, and series are direct-labeled | `audit.py` check `chart-palette`; then screenshot the chart and confirm each series has a label touching it, not only a legend swatch. |

## Reproducing any of this

### `audit.py` — the token checks the Self-check table calls

Point it at your CSS custom-property file. It parses hex, `rgb()` and `oklch()`, splits light from
dark on `:root` / `[data-theme="dark"]` / `prefers-color-scheme: dark`, and exits non-zero on any
failure, so it drops into CI. Run all checks or name them: `python3 audit.py tokens.css focus-ring`.

```python
#!/usr/bin/env python3
"""audit.py tokens.css [check ...]   — PASS/FAIL for the Self-check table.
Reads --tokens from a CSS file. Understands hex, rgb(a), and oklch(). Blocks are
split on `:root` / `[data-theme="dark"]` / `prefers-color-scheme: dark`."""
import sys, re, math

def _f(u): return u/12.92 if u <= 0.04045 else ((u+0.055)/1.055)**2.4
def _g(u): return u*12.92 if u <= 0.0031308 else 1.055*u**(1/2.4)-0.055
M1=[[0.4122214708,0.5363325363,0.0514459929],[0.2119034982,0.6806995451,0.1073969566],[0.0883024619,0.2817188376,0.6299787005]]
M2=[[0.2104542553,0.7936177850,-0.0040720468],[1.9779984951,-2.4285922050,0.4505937099],[0.0259040371,0.7827717662,-0.8086757660]]
def mul(M,v): return [sum(M[i][j]*v[j] for j in range(3)) for i in range(3)]
def oklch(rgb):
    lin=[_f(c/255) for c in rgb]
    lms=[math.copysign(abs(x)**(1/3),x) for x in mul(M1,lin)]
    L,a,b=mul(M2,lms)
    return L, math.hypot(a,b), math.degrees(math.atan2(b,a)) % 360
def oklch2rgb(L,C,H):
    a,b=C*math.cos(math.radians(H)),C*math.sin(math.radians(H))
    import numpy as np
    lms=[x**3 for x in np.linalg.solve(np.array(M2),[L,a,b])]
    lin=np.linalg.solve(np.array(M1),lms)
    return [255*_g(max(0,min(1,c))) for c in lin]
def lum(rgb):
    r,g,b=[_f(c/255) for c in rgb]; return .2126*r+.7152*g+.0722*b
def wcag(a,b):
    x,y=sorted((lum(a),lum(b)),reverse=True); return (x+.05)/(y+.05)
def _Y(rgb): 
    r,g,b=[c/255 for c in rgb]; return .2126729*r**2.4+.7151522*g**2.4+.0721750*b**2.4
def apca(txt,bg):
    Yt,Yb=_Y(txt),_Y(bg)
    f=lambda Y: Y if Y>=.022 else Y+(.022-Y)**1.414
    Yt,Yb=f(Yt),f(Yb)
    if abs(Yb-Yt)<.0005: return 0.0
    S=(Yb**.56-Yt**.57)*1.14 if Yb>Yt else (Yb**.65-Yt**.62)*1.14
    C=0 if abs(S)<.1 else (S-.027 if Yb>Yt else S+.027)
    return round(C*100,1)

HEX=re.compile(r'#([0-9a-fA-F]{3,8})')
OKL=re.compile(r'oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)')
RGB=re.compile(r'rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)')
def parse(v):
    """-> (rgb, has_alpha) or None"""
    v=v.strip()
    m=OKL.search(v)
    if m:
        L=float(m.group(1).rstrip('%')); L=L/100 if '%' in m.group(1) or L>1.5 else L
        return tuple(oklch2rgb(L,float(m.group(2)),float(m.group(3)))), ('/' in v)
    m=HEX.search(v)
    if m:
        h=m.group(1)
        if len(h)==3: h=''.join(c*2 for c in h)
        return tuple(int(h[i:i+2],16) for i in (0,2,4)), len(h) in (4,8)
    m=RGB.search(v)
    if m: return tuple(float(m.group(i)) for i in (1,2,3)), 'rgba' in v
    return None

def blocks(css):
    out={'light':{}, 'dark':{}}
    cur='light'
    for line in css.splitlines():
        if re.search(r'data-theme=[\'"]dark|prefers-color-scheme:\s*dark|\.dark\b', line): cur='dark'
        elif re.match(r'\s*:root\s*\{', line) or re.match(r'\s*html\s*\{', line): cur='light'
        m=re.match(r'\s*(--[\w-]+)\s*:\s*([^;]+);', line)
        if m: out[cur][m.group(1)]=m.group(2).strip()
    return out

CHECKS={}
def check(name):
    def d(fn): CHECKS[name]=fn; return fn
    return d
def pick(t,pat): return {k:v for k,v in t.items() if re.search(pat,k)}

@check('neutral-chroma')
def c(T):
    bad=[]
    for k,v in pick(T['light'],r'^--n-\d+$|^--(gray|neutral)-\d+$').items():
        p=parse(v)
        if p and p[0] and oklch(p[0])[1]>0.02: bad.append(f"{k} C={oklch(p[0])[1]:.3f}")
    return (not bad, "; ".join(bad) or "all neutral steps ≤ 0.02")

@check('surface-deltas')
def c(T):
    # surface steps only: the first 6 rungs of the ramp, page-ward end first.
    msg=[]; ok=True
    for th,(lo,hi) in (('light',(0.9,3.0)),('dark',(2.5,5.5))):
        ks=sorted(pick(T[th],r'^--n-\d+$').items(), key=lambda kv:int(re.search(r'\d+',kv[0]).group()))
        Ls=[(k,oklch(parse(v)[0])[0]*100) for k,v in ks if parse(v)]
        if len(Ls)<3: msg.append(f"{th}: <3 steps parsed"); continue
        d=[(Ls[i][0],round(abs(Ls[i+1][1]-Ls[i][1]),1)) for i in range(min(4,len(Ls)-1))]
        msg.append(f"{th}: "+" ".join(f"{k}Δ{x}" for k,x in d))
        if any(x<lo or x>hi for _,x in d): ok=False
    return ok, " | ".join(msg)

@check('chroma-arc')
def c(T):
    ks=sorted(pick(T['light'],r'^--n-\d+$').items(), key=lambda kv:int(re.search(r'\d+',kv[0]).group()))
    v=[oklch(parse(x[1])[0]) for x in ks if parse(x[1])]
    if len(v)<5: return False,"fewer than 5 neutral steps parsed"
    C=[x[1] for x in v]; H=[x[2] for x in v]
    arcs = max(C) > C[0] and max(C) > C[-1]
    drifts = (max(H)-min(H)) > 1.0
    return (arcs and drifts), f"chroma {'arcs' if arcs else 'is monotonic'}, hue span {max(H)-min(H):.1f}°"

@check('status-lightness-lock')
def c(T):
    out=[]; ok=True
    for role in ('text','fill'):
        Ls=[(k,oklch(parse(v)[0])[0]) for k,v in pick(T['light'],rf'--status-\w+-{role}$').items() if parse(v)]
        if len(Ls)<2: continue
        sp=max(x[1] for x in Ls)-min(x[1] for x in Ls)
        out.append(f"{role} spread {sp*100:.1f} L"); ok &= sp<=0.03
    return ok, "; ".join(out) or "no status tokens found"

@check('wash-lightness')
def c(T):
    bad=[]
    for k,v in pick(T['light'],r'--status-\w+-wash$').items():
        t=T['light'].get(k.replace('-wash','-text'))
        if not (t and parse(v) and parse(t)): continue
        d=(oklch(parse(v)[0])[0]-oklch(parse(t)[0])[0])*100
        if d<8: bad.append(f"{k} only +{d:.1f} L over its -text")
    return (not bad), "; ".join(bad) or "every wash ≥ +8 L over its text sibling"

@check('accent-fill-contrast')
def c(T):
    v=T['light'].get('--accent-fill');  p=parse(v) if v else None
    if not p: return False,"no --accent-fill"
    r=wcag((255,255,255),p[0]); return r>=4.5, f"white on fill {r:.2f}:1 (Lc {apca((255,255,255),p[0])})"

@check('accent-fill-polarity')
def c(T):
    # the decision is contrast, not hue: if white fails on the fill, the dark-text
    # choice has to be explicit rather than inherited.
    v=T['light'].get('--accent-fill'); p=parse(v) if v else None
    if not p: return False,"no --accent-fill"
    L,C,H=oklch(p[0]); on=T['light'].get('--accent-fill-on')
    w=wcag((255,255,255),p[0])
    if w>=4.5: return True, f"hue {H:.0f}° L {L*100:.0f} — white passes at {w:.2f}:1"
    if not on: return False, f"hue {H:.0f}° L {L*100:.0f} — white is {w:.2f}:1 and --accent-fill-on is MISSING"
    d=parse(on)
    return (bool(d) and wcag(d[0],p[0])>=4.5), f"white {w:.2f}:1; declared --accent-fill-on {on} at {wcag(d[0],p[0]):.2f}:1" if d else "unparseable --accent-fill-on"

@check('dark-ground')
def c(T):
    v=T['dark'].get('--bg') or T['dark'].get('--n-50'); p=parse(v) if v else None
    if not p: return False,"no dark --bg"
    L,C,_=oklch(p[0]); sunken=any(k for k in T['dark'] if 'sunken' in k or 'inset' in k)
    return (0.14<=L<=0.18 and C<=0.015 and sunken), f"L {L*100:.1f} C {C:.3f} sunken={'yes' if sunken else 'NO'}"

@check('theme-delta')
def c(T):
    out=[]; ok=True
    for k in T['light']:
        if k not in T['dark']: continue
        a,b=parse(T['light'][k]),parse(T['dark'][k])
        if not (a and b): continue
        (La,Ca,_),(Lb,Cb,_)=oklch(a[0]),oklch(b[0])
        if re.search(r'-(text|fg)$',k) and 'status' in k or '--accent-text'==k:
            good=10<=(Lb-La)*100<=20 and abs(Cb-Ca)<=0.05
            out.append(f"{k} ΔL{(Lb-La)*100:+.1f} ΔC{Cb-Ca:+.3f}{'' if good else ' ←'}"); ok&=good
        if re.search(r'-fill$',k):
            good=abs(Lb-La)*100<=5
            out.append(f"{k} ΔL{(Lb-La)*100:+.1f}{'' if good else ' ←'}"); ok&=good
    return ok, " | ".join(out) or "no comparable pairs"

@check('focus-ring')
def c(T):
    ring=parse(T['light'].get('--focus-ring','')) ; bg=parse(T['light'].get('--bg','#fff'))
    fill=parse(T['light'].get('--accent-fill',''))
    if not ring: return False,"no --focus-ring"
    r1=wcag(ring[0],bg[0]); r2=wcag(ring[0],fill[0]) if fill else 99
    return (r1>=3 and r2>=3), f"vs page {r1:.2f}:1, vs accent fill {r2:.2f}:1"

@check('text-roles')
def c(T):
    out=[]; ok=True
    bg=parse(T['light'].get('--bg','#ffffff'))[0]
    for k,v in pick(T['light'],r'--text-(primary|secondary|tertiary|placeholder|disabled)$').items():
        p=parse(v)
        if not p: continue
        r,lc=wcag(p[0],bg),apca(p[0],bg)
        floor={'primary':(7,90),'secondary':(4.5,75),'tertiary':(3,60),'placeholder':(4.5,75),'disabled':(0,0)}[k.split('-')[-1]]
        good=r>=floor[0] and abs(lc)>=floor[1]
        out.append(f"{k} {r:.2f}:1/Lc{lc}{'' if good else ' ←'}"); ok&=good
    return ok," | ".join(out)

@check('apca-pairs')
def c(T):
    bgs={k:parse(v)[0] for k,v in pick(T['light'],r'--(bg|surface)').items() if parse(v)}
    out=[]; ok=True
    for tk,tv in pick(T['light'],r'--text-(primary|secondary)$').items():
        tp=parse(tv)
        if not tp: continue
        for bk,bv in bgs.items():
            lc=abs(apca(tp[0],bv)); floor=90 if 'primary' in tk else 75
            if lc<floor: out.append(f"{tk} on {bk} Lc {lc}"); ok=False
    return ok, "; ".join(out) or "every text/surface pair clears its APCA floor"

@check('chart-palette')
def c(T):
    ks=sorted(pick(T['light'],r'--chart-\d+$').items())
    cols=[parse(v)[0] for k,v in ks if parse(v)]
    if len(cols)<2: return False,"fewer than 2 chart tokens"
    if len(cols)>6: return False, f"{len(cols)} series — past 5–6 no palette separates; group the tail"
    def ok_lab(c):
        lin=[_f(x/255) for x in c]
        lms=[math.copysign(abs(x)**(1/3),x) for x in mul(M1,lin)]
        return mul(M2,lms)
    mats={'normal':None,
     'deuter':[[0.367322,0.860646,-0.227968],[0.280085,0.672501,0.047413],[-0.011820,0.042940,0.968881]],
     'protan':[[0.152286,1.052583,-0.204868],[0.114503,0.786281,0.099216],[-0.003882,-0.048116,1.051998]],
     'tritan':[[1.255528,-0.076749,-0.178779],[-0.078411,0.930809,0.147602],[0.004733,0.691367,0.303900]]}
    worst=999; where=''
    for nm,M in mats.items():
        sim=[c if M is None else [255*_g(max(0,min(1,x))) for x in mul(M,[_f(y/255) for y in c])] for c in cols]
        labs=[ok_lab(c) for c in sim]
        for i in range(len(labs)):
            for j in range(i+1,len(labs)):
                d=100*math.dist(labs[i],labs[j])
                if d<worst: worst,where=d,f"{nm} {ks[i][0]}/{ks[j][0]}"
    return worst>=7, f"worst pairwise ΔE {worst:.1f} ({where}); target ≥ 7"

if __name__=='__main__':
    T=blocks(open(sys.argv[1]).read())
    want=sys.argv[2:] or list(CHECKS)
    fail=0
    for n in want:
        try: ok,msg=CHECKS[n](T)
        except Exception as e: ok,msg=False,f"error: {e}"
        print(f"{'PASS' if ok else 'FAIL'}  {n:24s} {msg}")
        fail += not ok
    sys.exit(1 if fail else 0)
```

Expected shape of the output — this is the reference ramp from §7 plus a deliberately broken focus
ring, and the `focus-ring` failure is the point: a ring token equal to the accent fill is 1.00:1
against the button it is supposed to outline.

```
PASS  neutral-chroma           all neutral steps ≤ 0.02
PASS  surface-deltas           light: --n-50Δ1.5 --n-100Δ2.0 --n-150Δ2.5 --n-200Δ3.0 | dark: ...
PASS  chroma-arc               chroma arcs, hue span 26.0°
PASS  status-lightness-lock    text spread 0.0 L
PASS  accent-fill-contrast     white on fill 4.98:1 (Lc -79.2)
FAIL  focus-ring               vs page 4.98:1, vs accent fill 1.00:1
PASS  text-roles               --text-primary 15.80:1/Lc102.8 | --text-secondary 6.11:1/Lc80.5
PASS  chart-palette            worst pairwise ΔE 8.6 (tritan --chart-3/--chart-4); target ≥ 7
```

### `shot.mjs` — the screenshots the Self-check table reads

```js
// node shot.mjs <url> <width> <light|dark|forced> > out.png
import { execSync } from 'node:child_process'; import { createRequire } from 'node:module';
const req = createRequire(execSync('npm root -g').toString().trim() + '/');
const { chromium } = req('playwright');
const [url, w = '1440', mode = 'light'] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width: +w, height: 1250 },
  colorScheme: mode === 'dark' ? 'dark' : 'light',
  forcedColors: mode === 'forced' ? 'active' : 'none',
});
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(2000);
process.stdout.write(await p.screenshot({ fullPage: false }));
await b.close();
```

### `cvd.py` — the simulations R1–R3 read

```python
# python3 cvd.py in.png deuteranopia|protanopia|tritanopia|grayscale > out.png
from PIL import Image; import sys, numpy as np
M = {'deuteranopia':[[0.367322,0.860646,-0.227968],[0.280085,0.672501,0.047413],[-0.011820,0.042940,0.968881]],
     'protanopia':  [[0.152286,1.052583,-0.204868],[0.114503,0.786281,0.099216],[-0.003882,-0.048116,1.051998]],
     'tritanopia':  [[1.255528,-0.076749,-0.178779],[-0.078411,0.930809,0.147602],[0.004733,0.691367,0.303900]],
     'grayscale':   [[0.2126,0.7152,0.0722]]*3}
a = np.asarray(Image.open(sys.argv[1]).convert('RGB'), float) / 255
lin = np.where(a <= 0.04045, a/12.92, ((a+0.055)/1.055)**2.4)
out = np.clip(lin @ np.array(M[sys.argv[2]]).T, 0, 1)
srgb = np.where(out <= 0.0031308, out*12.92, 1.055*out**(1/2.4)-0.055)
Image.fromarray((srgb*255).round().astype('uint8')).save(sys.stdout.buffer, 'PNG')
```

### Extracting a live product's tokens

Extract a live product's real tokens (Typed OM catches runtime-injected variables that parsing the
stylesheet misses, and sidesteps the CORS error you get from `sheet.cssRules`):

```js
// node probe.mjs https://example.com [--dark]
import { execSync } from 'node:child_process'; import { createRequire } from 'node:module';
const req = createRequire(execSync('npm root -g').toString().trim() + '/');
const { chromium } = req('playwright');
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900},
  colorScheme: process.argv.includes('--dark') ? 'dark' : 'light' });
const p = await ctx.newPage();
await p.goto(process.argv[2], { waitUntil:'networkidle' });
await p.waitForTimeout(2500);
console.log(JSON.stringify(await p.evaluate(() => {
  const o = {};
  for (const [k, v] of document.documentElement.computedStyleMap())
    if (k.startsWith('--')) o[k] = String(v);
  const c = getComputedStyle(document.body);
  return { vars: o, body: { bg: c.backgroundColor, color: c.color } };
}), null, 1));
await b.close();
```

Chrome resolves `oklch()` to `lab()` in computed styles, so a `lab()` parser is required to read
Tailwind v4's palette back — CIE Lab with a **D50** white point, then chromatic adaptation to D65.
(Validation: `lab(47.7841% -0.393182 -10.0268)` must convert to `#6a7282`, Tailwind v4's
`gray-500`.)

Forced colors: `chromium.launch()` then `newContext({ forcedColors: 'active' })`, `setContent()`
your markup, and read `getComputedStyle` for `backgroundColor`, `borderTopWidth`, `boxShadow`,
`outlineWidth` and `backgroundImage`. Probe the system keywords by assigning them to
`element.style.color` and reading back.

CVD simulation (Machado 2009, severity 1.0) — convert to linear sRGB, apply the matrix, convert
back:

```
deuteranopia  [[0.367322, 0.860646,-0.227968],[ 0.280085,0.672501, 0.047413],[-0.011820, 0.042940,0.968881]]
protanopia    [[0.152286, 1.052583,-0.204868],[ 0.114503,0.786281, 0.099216],[-0.003882,-0.048116,1.051998]]
tritanopia    [[1.255528,-0.076749,-0.178779],[-0.078411,0.930809, 0.147602],[ 0.004733, 0.691367,0.303900]]
```

Gamut ceilings: binary-search chroma at fixed OKLCH L and hue until the OKLab→linear-sRGB
conversion leaves [0, 1]. Swap the matrix for Display-P3's to get the P3 column.

Products probed for this file: `linear.app` (light and dark), `vercel.com/geist/colors` (light and
dark), `github.com` (light and dark), `radix-ui.com/colors` (light and dark), `mercury.com`,
`notion.com`, `docs.stripe.com`, `tailwindcss.com/docs/colors`, `ui.shadcn.com`, `wise.com`.

---

## Direction pass (2026-09)

What changed in this revision, and why. Read this if you have the previous version cached.

**Numbers corrected (re-probed live, 2026-09-10).** Six products were read again with Playwright
and CSS Typed OM. Primer's eight semantic pairs, five emphasis fills, borders, shadows and scrims;
Geist's full gray ramp, four `-900` chromatics, focus ring and shadow-border stack; Radix's step 9 /
11 / 12 across eight scales; Tailwind v4's `neutral` and `violet`/`blue` ramps; and shadcn's
`--foreground` / `--ring` / `--chart-1..5` **all came back byte-identical to what this file already
claimed.** Two did not:

| Was | Is | Where |
|---|---|---|
| white on `blue-500` `#2b7fff` = 3.42:1 / Lc −64.8 | **3.76:1 / Lc −70.0** | WCAG-vs-APCA table |
| Linear accent `#7070ff`, 3.85:1 | **`#7170ff`, 3.84:1** | accent table, signals table, §"Accents" |

Also corrected: dark borders are **1.9–2.2×** the light-mode lightness delta, not 1.8–2.1×
(12.6/6.8, 18.8/8.5, 22.7/10.7 from the file's own Linear numbers). And the dark neutral table
mislabelled Linear's `#8a8f98` as *secondary* — Linear's own token calls it `--color-text-tertiary`;
secondary is `#d0d6e0` (L 87.4). That mislabel is inherited from several public "Linear palette"
reproductions, so it is worth knowing about.

**One measurement can no longer be reproduced.** `linear.app` now serves dark to logged-out
visitors regardless of `prefers-color-scheme`. Linear's light-theme rows — including the
"zero tokens between L 61.8 and L 87.1" finding — date from the 2026-08 pass and are now marked as
such rather than presented as re-verifiable.

**Five rules were followed off a cliff on purpose, and now carry scope.** Each of these produces a
worse interface in a realistic product if an agent applies it literally:

| Rule | The product that breaks it | Scope added |
|---|---|---|
| Chromatic pixels < 1% | A calendar, Kanban board, code editor, map or conditionally-formatted spreadsheet — color *is* the data, and every one of them is past 10% by design | Mask the data region and measure chrome only; if you can't separate them, the metric doesn't apply to that screen |
| One accent, five uses | Slack — per-workspace theming is the entire orientation cue; also multiplayer cursors, white-label tenants, a paid-tier CTA that must not read as the primary action | One accent *per context*. Identity color is a separate budget |
| Never `#000` text | An e-reader, a 1-bit panel, print, `prefers-contrast: more`, `forced-colors: active` — L 0.26 gray dithers into mush | It's a rule about emissive displays rendering antialiased type; let those media override |
| Elevation is lightness, not shadow | Figma, a map, a photo editor, a bottom sheet over scrolling content — the ground is the user's, so "+4 L above the surface" can land *darker* than what's behind it | Lightness ladder for chrome you own; opaque panel + real shadow over user content |
| Every status needs a glyph | A 500-row trading blotter or a heatmap — a 16px icon per cell destroys the density that is the product | The second channel can be the sign, the column, the alignment or the bar length; icons need 32px+ rows |

A sixth, added to §5: **lightness-locking status colors is exactly what makes them identical in
grayscale.** Anything that gets printed, faxed or read on e-ink needs ≥ 8 L of separation or a
glyph that survives the print stylesheet.

**The anti-pattern list was 2023's.** It named violet→blue gradients, `#8b5cf6`, glow, gradient
text. All still true; none still sufficient. Agents have been told about violet enough that they
now dodge it, and the dodges are the current tells. Five new entries (§10–§14), ranked in a table
at the top of that section, each with the measurement that makes it a decision:

- **Liquid glass** (`bg-white/10` + `backdrop-blur-xl` over a dark gradient) — now the single most
  reliable tell. The card has no lightness of its own: the same token computes to L 24.3 at one end
  of a `slate-950 → purple-950` page and L 35.4 at the other, an **11.2-point swing** against a
  +3-to-+5 elevation step. Secondary text on it runs 6.39:1 / Lc −49.7 down to 4.56:1 / Lc −44.0 —
  a range, and all of it under the Lc 60 floor.
- **The 4px colored card edge** — the pastel stat card in cheaper clothing; N cards means the accent
  is used N times.
- **The emerald→teal gradient** — the anti-violet dodge, and **41% worse**: white on `#10b981` is
  2.54:1 and on `#14b8a6` is 2.49:1, against violet's already-failing 4.23:1. Not a Tailwind
  defect; at L 0.55 the sRGB chroma ceiling is 0.094 for teal.
- **The blob-gradient page ground** — `#020617` is chroma 0.041 and `#2e1065` is chroma 0.135,
  **2.7× and 9×** the file's own dark-ground ceiling, with the ground's own lightness varying 15.4
  points across the viewport.
- **OKLCH-washing** — `oklch(0.601 0.242 293.9)` *is* `#8e51ff`. Notation is not a decision. Convert
  your tokens back to hex and diff against Tailwind; if fewer than three survive, nothing changed.

**The self-check is now executable.** Every item was either a shell command already or is one now.
Twenty-eight checks across seven groups, each one a command, a script call, or a single yes/no
question about one named screenshot. "Count distinct hues" became a `grep | awk | sort -u | wc -l`
that buckets hue by 30°. "Chroma arcs and hue drifts" became `audit.py chroma-arc`, which fails on a
monotonic chroma curve or a ramp whose steps share one hue to within 1°. "Semantic names describe
your domain" became a `comm -13` of your status token names against your API's status enum. Three
scripts are now in the file — `audit.py` (13 token checks, exits non-zero, drops into CI),
`shot.mjs` (light / dark / forced-colors screenshots) and `cvd.py` (the three Machado matrices plus
grayscale).

**Two of the file's own numbers failed its own checklist,** which is how the audit script earned its
keep. The reference ramp in §7 has Δ3.0 and Δ4.0 steps, above the "0.9–2.7 L" band the old
checklist demanded — because those two steps are *border* rungs, not surface rungs. The band is now
stated as surface steps 1→5 at 0.9–3.0, borders widening to 3–6, which is what Radix and the
reference ramp both actually do. And the old A4 tested accent **hue** against a 260–320° band;
Primer's `#0969da` sits at 258° and carries white text at 5.19:1. The check now tests contrast and
requires an explicit `--accent-fill-on` only when white actually fails.

**Cut for saying nothing:** "Not 'mostly neutral.' Ninety-nine percent." · "Read the last row." ·
"Read the APCA column." · "Somebody did the math." · "That is what a system looks like." · "and this
surprised me" · "one of them is a surprise" · "**The costs are real and measurable.**" · "That is
the tightest tuning in this entire file" · "It costs nothing and" · "Its whole job is 'look here.'" ·
"That is the opposite of the usual instinct, and it's right" · "Great products ship brand-colored
links that fail." Every one of them was a sentence that did not change what you would type next.
