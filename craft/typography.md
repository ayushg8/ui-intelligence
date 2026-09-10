# Typography for interfaces

**Measured:** 2026-09. Every number below was read from a live page's computed styles or from a canvas `TextMetrics` probe at 1440×900, not recalled. Where I could not measure, I say so.

---

## If you only apply five things

1. **Pick two body sizes, not one.** One for prose the user reads (15–16px, line-height 1.5–1.7) and one for dense UI the user scans (13–14px, line-height 1.4–1.5). Stripe ships 16/26 in guides and 14/18.2 in the API parameter list on the same domain. Products that use one body size for both end up with airy tables or cramped documentation.
2. **Use three weights and stop.** 400 / 500 / 600 is the working set. Reserve 700 for one thing (Notion uses it for every heading and nothing else; Cursor's font only *has* 400 and 700). Never use 300 for body text at any size below 20px. Never use two adjacent weights (500 and 600) on the same line — you get muddle, not hierarchy.
3. **Tighten by size, not by rule.** Letter-spacing scales with size: roughly `0` at ≤14px, `-0.01em` at 16–20px, `-0.02em` at 24–32px, `-0.03 to -0.06em` above 40px. Geist ships exactly this: `-0.06em` at 40–72px, `-0.04em` at 24–32px, `-0.02em` at 16–20px, `0` at 14px. Apply nothing globally.
4. **Set `font-variant-numeric: tabular-nums` on every column of numbers.** Inter's `1` is 41% narrower than its `0`; SF Pro's is 27% narrower; Geist's 42%. Modern UI grotesques all ship proportional figures by default — Helvetica and Arial are the exceptions. A right-aligned money column in Inter jitters unless you say otherwise.
5. **Three levels of neutral text color. No more.** Measured across nine products: primary lands at 15–19:1 contrast, secondary at 6–10:1, tertiary at 4.5–6:1. Nobody ships a fourth. If you need a fourth distinction, change size or weight, not color.

---

## The measured reference table

### Real type scales, extracted from live products

Sizes in px. `lh` is computed line-height in px. `ls` is the em-equivalent of the computed letter-spacing. Weights are the computed values actually used, not what the token file claims.

| Product / surface | h1 | h2 | h3 | Body prose | Dense UI | Micro | Mono | Face |
|---|---|---|---|---|---|---|---|---|
| **Linear** docs (dark) | 32/36 w590 `-0.022em` | 24/31.9 w590 `-0.012em` | 20/32 w590 `0` | 15/24 w400 `-0.011em` | 14/21 w510 `-0.013em` | 13/19.5 w400, kbd 12 w510 | — | Inter Variable, `ffs: "cv01","ss03"` |
| **Linear** marketing | 48/48 w510 `-0.022em` | — | — | 16/24 w400 | — | — | — | same |
| **Stripe** API reference | 24/32 w700 `0` | — | 16/— w600 | 14/22 w400 (~69ch) | **14/18.2 w400** (param rows) | 12/16 w600 label | inline 11.9/20 w500, block 14/18.2 | `-apple-system` (no webfont) + Source Code Pro |
| **Stripe** guides | 32/40 w700 `0` | **24/32 w400** `0` | 16/24 w600 | 16/26 w400 | 14/20 w400 | 12/16 w600 | 13/19 w500 Menlo | same |
| **GitHub** repo page | 32/40 w600 `0` | 24/30 w600 | 20/25 w600 | 16/24 w400 | 14/21 w400 | 12/18 w400 | 12/18 `ui-monospace` | Mona Sans VF |
| **Vercel** Geist system | 72/72 w600 `-0.06em` | 48/56 `-0.06em` · 32/40 `-0.04em` | 24/32 `-0.04em` · 20/26 `-0.02em` | copy-16: 16/24 w400 `0` | copy-14: 14/20 · copy-13: 13/18 | label-12: 12/16 | Geist Mono, `ffs:"liga" 0` | Geist, `ffs: "calt" 0,"rlig","ss11"` |
| **Vercel** docs | — | 24/32 w600 `-0.04em` | 16/24 w600 `-0.01em` | 16/27.2 w400 | 14/20 w400/500 `-0.02em` | 11/20 w500 `+0.018em` (badge) | 14.4/24.5 | Geist |
| **Notion** help | 42/48 w700 `-0.036em` | 26/32 w700 `-0.024em` | 22/28 w700 `-0.011em` | 16/24 w400 `0`; lede 20/28 w400 `-0.006em` | 15/20 · 14/20 w400/500 | 12/16 w500 `+0.010em` | iA Writer Mono | **NotionInter** (custom Inter fork, static 400/500/600/700) + Lyon Text |
| **Notion** marketing | 96/100 w600 `-0.048em` | — | — | 16/24 w400 | 14/20 w500 | 12/16 w500 | — | same |
| **Attio** | 64/60.8 (**0.95**) w600 `-0.02em` Inter *Display* | 40/44 w500 `-0.01em` Display | 24/27.6 w500 `-0.01em` Display | 16/22 w500 `-0.01em` | **14/20 w500** `-0.01em` | 12/16 w500 `-0.013em`; eyebrow 12 w600 **`+0.06em`** caps + tnum | 13/20 w300 JetBrains Mono | Inter (text) **+ Inter Display** (headings), `ffs:"ss03"` |
| **Mercury** | 49.3/54.3 **w480** `0` | 42/48.3 w480 **`+0.01em`** | 32/36.8 w480 **`+0.015em`** | 18/24.3 **w360** | 16/16 **w420** (nav) | 12/16.8 w400–480 **`+0.02em`** | — | **Arcadia** (wght 360–500) + **Arcadia Display** (wght 320–480) + Tiempos Headline |
| **Cursor** docs | 33.75/40.5 **w400** `-0.02em` | eyebrow 12/18 w400 **`+0.05em`** caps | — | 15/24.4 w400 **`+0.005em`** | 14/20 w400 | th 12/16 w400 | Berkeley Mono | **cursorSans (400 and 700 only)**, `ffs:"calt","case","kern","liga"` |
| **Tailwind** docs | 30/36 w500 `-0.025em` | **12/24 w500 `+0.1em` IBM Plex Mono caps** | same | 14/24 w400 (600px ≈ 80ch) | 14/20 w400 | 12/16 w500 | 12/24 w500 Plex Mono `ffs:"ss02","zero"` | Inter, `ffs: "cv02","cv03","cv04","cv11"` |
| **Grafana** (live dashboard) | — | — | — | — | **14/22 w400 `+0.011em`** | 12/18 w400 `+0.0125em` | Roboto Mono | Inter — **only 400 and 500 loaded** |
| **Ramp** | 64/64 w400 **`-0.0002em`** (≈0) | — | — | 16/24 w400 | — | — | IBM Plex Mono | Lausanne, `ffs:"ss01"` |
| **Sanity** | 112/112 w400 `-0.04em` | — | — | 16/24 w400 | — | — | IBM Plex Mono | Waldenburg, `ffs:"calt" 0` |
| **Retool** | 72/75.6 **w300** `-0.022em` | — | — | 16/24 w400 | — | — | — | Saans + PX Grotesk |
| **Loom** | 63.3/65.1 w700 **`0`** | — | — | 16/24 w400 | — | — | — | **Charlie Display + Charlie Text** (optical pair) |
| **Neon** | 68/76.5 w400 `-0.04em` | — | — | 16/24 w400 | — | — | Geist Mono | Inter |
| **Liveblocks** | 64/70.4 w500 `-0.02em` | — | — | 16/24 w400 | — | — | JetBrains Mono | Suisse Int'l |
| **Clerk** docs | — | — | — | 16/24 w400 | — | — | Geist Mono | **`geistNumbers, suisse`** — see below |
| **Anthropic** | 60.9/67 w700 `0` | — | — | **20/28 serif** | — | — | JetBrains Mono | Anthropic Sans / Serif / Mono |
| **OpenAI** | — | — | — | 16/24 w400 | — | — | — | OpenAI Sans (static 300/400/500/600/700) + LF Serif |
| **Brex** | 72/72 w500 `-0.02em` | — | — | 16/— w400 | — | — | Space Mono | Inter (heavily configured) + Flecha serif |
| **Robinhood** | 64/72 **w400** `-0.005em` Martina Plantijn | — | — | 16/— w400 Capsule Sans Text | — | — | Capsule Sans Text Mono | Capsule Sans Text/Display + Martina Plantijn |
| **shadcn/ui** docs | 30/36 w600 `-0.025em` | 18.75/26.25 w600 | — | 15/26.25 w400 | **12.8/18.29 w500** | 12.75/22.31, 12.25/21.44 | Geist Mono | Geist |

### Text-color hierarchy, with computed contrast

| Product | Level 1 | Level 2 | Level 3 | Notes |
|---|---|---|---|---|
| Linear (dark, bg `#08090A`) | `#F7F8F8` **18.7:1** | `#D0D6E0` **13.6:1** | `#8A8F98` **6.1:1** | Tertiary carries the sidebar's inactive items |
| Stripe (light) | `#1A1F36` **16.2:1** | `#3C4257` **10.0:1** | `#50617A` **6.3:1** | Fourth level `#667691` **4.6:1** for timestamps only |
| GitHub (light) | `#1F2328` **15.8:1** | `#59636E` **6.1:1** | — | Two levels + link `#0969DA` 5.2:1 |
| Vercel / Geist (light) | `#171717` **17.9:1** | `#4D4D4D` **8.5:1** | `#666666` **5.7:1** | `#8F8F8F` **3.2:1** exists but only as placeholder/disabled |
| Notion (light) | `rgba(0,0,0,.95)` **19.4:1** | `rgba(0,0,0,.898)` **17.4:1** | `rgba(0,0,0,.54)` **4.6:1** | Alpha, not hex — so it composites over colored page backgrounds |
| Cursor (dark) | `--text-primary #e4e4e4` **15.1:1** | `--text-secondary #b0b0b0` **8.8:1** | `--text-tertiary #888` **5.4:1** | Named tokens; exactly three |
| Attio (light) | `#242629` **15.2:1** | `#75777C` **4.5:1** | — | Two levels only |
| Grafana (dark) | `#CCCCDC` **11.8:1** | `rgba(#CCCCDC, .65)` **5.6:1** | — | One base color, alpha-derived |
| Mercury (dark) | `#EDEDF3` **14.6:1** | `#C3C3CC` **9.7:1** | — | — |

The shape is consistent: **~15–19:1 / ~6–10:1 / ~4.5–6:1**, and the tertiary level sits deliberately just above the 4.5:1 AA floor (Attio 4.48, Notion 4.61, Stripe 4.60). Nobody drops a real content level below 4.5.

### Typeface metrics I measured directly

Canvas `TextMetrics` at `400 100px`, so every number is per 100px of font-size. Fonts read off the live sites that license them.

| Face | x-height | Cap height | Avg lowercase width | Digits `0`/`1`/`8` | Pangram width |
|---|---|---|---|---|---|
| **SF Pro** (`system-ui`, macOS) | 50.8 | 70.5 | 47.10 | 60.6 / **44.3** / 60.0 | **1835.7** |
| **Inter Variable** | 51.6 | 72.8 | 48.97 | 61.3 / **36.2** / 58.2 | 1937.2 (+5.5% vs SF) |
| **Geist Sans** | 53.0 | 71.0 | 51.50 | 66.3 / **38.4** / 60.4 | 2034.5 (**+10.8% vs SF**) |
| **Söhne** (via Vanta) | 52.3 | 71.8 | 50.57 | 62.3 / 37.6 / 59.8 | 1965.1 |
| **Suisse Int'l** (via Clerk) | 53.8 | 72.5 | 51.33 | 66.1 / **36.8** / 62.6 | 2016.0 |
| **Arcadia** text (Mercury) | 50.4 | 70.4 | 51.57 | 64.4 / 40.7 / 62.4 | 2027.7 |
| **Arcadia Display** (Mercury) | 50.5 | 70.4 | 47.64 | 59.2 / 35.1 / 57.2 | 1878.9 (**−7.3% vs its text cut**) |
| Helvetica | 52.3 | 71.7 | 48.95 | **55.6 / 55.6 / 55.6** | 1978.8 |
| Arial | 51.9 | 71.6 | 48.95 | **55.6 / 55.6 / 55.6** | 1978.8 |
| Georgia | 48.1 | 69.3 | 49.91 | 61.4 / 43.0 / 59.6 | 1967.7 |
| Geist Mono | 53.0 | 71.0 | 60.00 | 60 / 60 / 60 | 2580.0 |
| Menlo | 54.7 | 72.9 | 60.21 | 60.2 / 60.2 / 60.2 | 2588.8 |

**What this table decides for you:**

- Swapping `system-ui` → Inter at a fixed 14px makes every string **5.5%** wider. Swapping to Geist makes it **10.8%** wider. Sidebar widths, truncation points, and "does the label fit in the button" all move. This is why a design that looked right in the mock overflows after you add the webfont.
- Vercel's own metric-override for Geist's Arial fallback is `size-adjust: 106.28%; ascent-override: 94.56%; descent-override: 27.76%; line-gap-override: 0%`. That is the width difference stated as a number, by the people who made the font.
- **Every modern UI grotesque ships proportional figures.** The `1` is 27–44% narrower than the `0`. Helvetica, Arial and all monospaces are the exception. Assume proportional and opt in.
- Geist and Suisse have larger x-heights and wider lowercase than SF; they can carry 13px where SF wants 14px. Georgia has the smallest x-height in the set — a serif body at 16px reads smaller than a grotesque at 16px.

### Inter's `opsz` axis, measured

Rendering `Handgloves 0123` at 64px in Inter Variable:

| Setting | Rendered width |
|---|---|
| `font-variation-settings: "opsz" 14` (text cut) | **521.16px** |
| `font-variation-settings: "opsz" 32` (display cut) | **481.72px** |

The display cut is **7.6% narrower** at the same nominal size and weight — tighter spacing, thinner joins, less ink. That is not a subtlety; it is the difference between a headline that looks set and one that looks blown up.

Continuous weight, same string at 64px: **w400 = 521.16px, w450 = 524.27px, w500 = 527.36px** — about 0.6% width per 50 weight units. Intermediate stops like Linear's **510** and **590**, or Suisse's **450** cut, are real, not decorative.

---

## Choosing a typeface

### "Inter by default" is the tell — and the fix is one line, not a new font

Inter is the most-deployed UI face on earth for good reasons: it was drawn for screens, its x-height is tall, its variable file has a real `opsz` axis, and it is free. The problem is not quality, it is that unmodified Inter at `font-feature-settings: normal` is the visual signature of "someone shipped the default."

Every serious Inter deployment I measured changes it:

| Product | `font-feature-settings` | What it changes |
|---|---|---|
| Linear | `"cv01","ss03"` | Alternate `1` (no base serif) + round quotes and commas |
| Tailwind, Resend | `"cv02","cv03","cv04","cv11"` | Open `4`, open `6`, open `9`, **single-storey `a`** |
| Attio, Raycast | `"ss03"` | Round quotes and commas |
| Notion | `"lnum","locl" 0` + `font-variant-numeric: lining-nums` | Lining figures forced on; **localized glyph forms turned off** |
| Geist (Vercel) | `"calt" 0,"rlig","ss11"` | Contextual alternates **off**, required ligatures on |
| Sanity (Waldenburg) | `"calt" 0` | Contextual alternates off |
| Ramp (Lausanne) | `"ss01"` | Stylistic set 1 |
| Cursor | `"calt","case","kern","liga"` | **`case`** raises brackets/punctuation to cap height — matters for `(BETA)` and `[1]` in all-caps labels |
| **Brex** | `"calt" 0,"cv01","cv05" 0,"cv10","liga" 0,"ss01" 0,"ss03","zero" 0` | The most configured Inter I measured: contextual alternates **off**, standard ligatures **off**, slashed zero **explicitly off**, alternate `1` on, spurred capital `G` on, tailed `l` off |

`cv11` (single-storey `a`) is the single biggest change to Inter's face; combined with `cv02/03/04` it stops reading as Inter and starts reading as a geometric-leaning grotesque. That's four characters of CSS, not a font license.

The verified Inter feature list (from rsms.me/inter): `cv01` alternate one · `cv02` open four · `cv03` open six · `cv04` open nine · `cv05` lowercase L with tail · `cv06` simplified u · `cv07` alternate ß · `cv08` uppercase I with serif · `cv09` flat-top three · `cv10` capital G with spur · `cv11` single-storey a · `cv12` compact f · `cv13` compact t · `ss01` alternate digits · `ss02` disambiguation · `ss03` round quotes and commas · `ss05` circled characters · `ss06` squared characters · `ss07` square punctuation · `ss08` square quotes · `tnum` tabular · `zero` slashed zero.

**When Inter is genuinely right:** dense, information-dense, keyboard-driven tools where the font must disappear (Linear, Grafana, Discourse, Neon). Products with an eight-language string catalog — Inter's Latin/Greek/Cyrillic coverage is complete and consistent. Any product where you cannot afford a type budget and a bad free font would be worse. And any product where the *content* is the personality — a data tool's personality comes from its density and its keyboard model, not its letterforms.

### The grotesques, by what they actually do

I measured or observed each of these in production. Where I could not license-load a face, I say what I observed rather than inventing metrics.

**Inter** — tall x-height (51.6), proportional figures, real `opsz` axis, 13 character variants. Neutral to the point of invisibility. Best when you want zero typographic opinion. Worst when the product needs to feel like *something*: it will read as generic no matter how good the layout is.

**Geist** (Vercel, free, OFL) — the widest face in my sample (**+10.8% vs SF, +5% vs Inter**), largest x-height (53.0), ships `calt 0` from the vendor. Geist is *engineered* rather than drawn — flat terminals, closed apertures, near-monolinear. It pairs with Geist Mono, which shares the same x-height and cap height exactly, so mono and sans sit on the same optical line. Choose it when you want "infrastructure": deploys, logs, builds, runtimes. Avoid it in anything warm or consumer — the closed apertures read cold at small sizes, and its extra width costs you real column space in a table.

**Söhne** (Klim, commercial) — x-height 52.3, a Neue Haas Grotesk redraw with the corners taken off. Söhne is what a company picks when it wants to look established without looking corporate: Vanta, Arc (as Söhne Breit for display). It has *slightly* more contrast in the stroke than Inter, which reads as competence at 16px+ and disappears at 12px. Not the right choice for a dense 12–13px UI where its refinement is invisible and you paid for nothing.

**Suisse Int'l** (Swiss Typefaces, commercial) — the widest lowercase in my measured set after Geist (51.33), tallest x-height (53.8). Ships an unusual **450** weight, which Clerk uses. Suisse reads *Swiss* in the literal sense: rationalist, slightly severe, high-design. Right for developer infrastructure that wants to look like a design object (Clerk, Liveblocks). Wrong for anything that needs to feel approachable — it has no warmth to give.

**ABC Diatype** (Dinamo, commercial) — a mono-derived grotesque with distinctly squared curves and an unusually large aperture. Signals "we hired a designer." Its personality is loud enough that it fights dense data; it belongs on marketing surfaces and in tools with few, large elements.

**Untitled Sans** (Klim, commercial) — deliberately drawn to look like an unbranded default (its whole concept is "the font in the browser's font menu"). The joke is that using it as your brand font is a strong statement. Genuinely good UI face; its neutrality is *designed* neutrality rather than Inter's accidental neutrality, which means it holds together better at display sizes.

**Basis Grotesque** (Colophon, commercial) — quirkier: the `a`, `g` and `t` have visible hand. Reads as editorial/independent. It will not survive a 13px table row; the personality collapses into noise.

**Aeonik** (CoType, commercial) — geometric, wide, round. The `o` is nearly circular. Very common in 2021–2024 startup branding, which now means it reads as *of that period*. GitBook still runs it alongside General Sans. Choose it for optimistic-consumer; avoid it if you don't want to be dated by it.

**Instrument Sans** (free, OFL) — a wide-ish neo-grotesque with a variable width axis. The width axis is the reason to pick it: you can genuinely condense a nav label rather than tracking it in. Under-used and free.

**General Sans** (Indian Type Foundry, free tier) — geometric-humanist blend, single-storey `g`. Slightly softer than Inter. A reasonable free alternative when Inter's neutrality is the problem and there is no budget. GitBook uses it for display with Inter underneath for text — a good pattern.

**Mona Sans** (GitHub, free, OFL) — has both weight *and* width axes and is the only face in this list drawn specifically to survive at both 12px table rows and 96px marketing. GitHub uses it at both. Underrated.

**Custom faces** — Notion (NotionInter, a fork of Inter), Cursor (cursorSans, two weights), OpenAI (OpenAI Sans), Mercury (Arcadia + Arcadia Display), PostHog (RoundHog), Anthropic (Anthropic Sans/Serif/Mono), Loom (Charlie Display + Charlie Text), Sanity (Waldenburg), Ramp (Lausanne), Retool (Saans), Warp (Matter + Matter Mono). The pattern worth stealing is not "commission a font." It is that **each of them ships a display cut and a text cut** — the same design at two optical sizes. Mercury's Arcadia Display is **7.3% narrower** than Arcadia Text at the same size. That is the difference you are missing when you scale one font from 14px to 64px.

### System font stacks: when they beat a webfont

Stripe's documentation — the single most-imitated developer UI in the world — uses **no webfont for UI text**. The stack is `-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif`, with Source Code Pro and Menlo for code only.

Use the system stack when:
- **Text is dense and small.** SF Pro and Segoe are hinted and optically sized for their own OS at 11–14px in a way no webfont is. At 13px in a table, SF beats Inter on rendering, full stop.
- **You cannot tolerate FOUT/CLS.** No download, no swap, no metric override, no layout shift.
- **The product is a utility.** Nobody chose Stripe's docs because of the letterforms.
- **You are on an OS-native surface** — an Electron app that should feel like the OS, a settings panel, a system-adjacent tool.

Do *not* use the system stack when:
- The design depends on consistent line breaks across platforms. SF, Segoe UI and Roboto have different widths; a two-line button on macOS is three lines on Windows.
- You need one specific look. `system-ui` is three different fonts.
- You need `tabular-nums` reliability across platforms — the digit metrics differ (SF's `1` is 44.3 units, Roboto's differs again).

**The correct stack, if you go this way:**

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, "Noto Sans", sans-serif,
             "Apple Color Emoji", "Segoe UI Emoji";
```

`-apple-system` before `system-ui` matters: on older Safari, bare `system-ui` resolved to the wrong face. Emoji families go last so they only catch emoji codepoints.

### Variable fonts and optical sizing

Three separate things get conflated. They are not the same.

**1. Variable weight.** One file, continuous weight. This is why Linear ships **510** and **590** rather than 500 and 600 — a 510 sidebar item is fractionally heavier than 500 without stepping to 600's density. Measured: about 0.6% width per 50 weight units. Use it for exactly this: nudging a weight that is *almost* right, not for a 100–900 rainbow.

**2. Optical sizing (`opsz`).** A real axis that redraws the glyphs, not scales them. Inter v4 has it. Measured above: 7.6% narrower at opsz 32 vs opsz 14 at the same 64px. **The gotcha:** `font-optical-sizing: auto` only does anything if the loaded font file actually carries the axis. rsms.me's official `inter.css` declares `InterVariable` with no `opsz` descriptor at all, and static Inter files have no axis. So:

```css
/* Does nothing on static Inter or on most CDN-served Inter. */
h1 { font-optical-sizing: auto; }

/* Does something — but only if you loaded a file with the axis. */
h1 { font-variation-settings: "opsz" 32; }
```

Verify before you rely on it: render the same string at `"opsz" 14` and `"opsz" 32` and compare widths. If they match, the axis is not there.

**3. Two separate cuts.** Attio loads `inter` and `interDisplay` as different families and switches at h4→h3. Mercury loads Arcadia and Arcadia Display. Loom loads Charlie Text and Charlie Display. This is the low-tech version of `opsz` and it works everywhere. If your face has a Display cut, use it above ~28px and stop hand-tracking headlines.

---

## Type scales

### Why modular scales fail in product UI

A modular scale (1.25× or 1.333× from a 16px base) generates 16 → 20 → 25 → 31.25 → 39 → 48.8. Two problems appear immediately in a real product:

1. **You need more sizes below the base than above it.** A dense UI needs 11, 12, 13 and 14 as distinct, meaningful sizes — labels, meta, table rows, body. A 1.25 scale going down gives you 16 → 12.8 → 10.24. That is two usable sizes where you needed four, and one of them is fractional.
2. **Fractional sizes render inconsistently.** Look at shadcn/ui's own documentation, measured: `12.8px`, `12.75px`, `12.25px`, `16.875px`, `18.75px`, `13.7143px`. Those come from `em`-relative Tailwind classes compounding inside sized containers. At 12.75px vs 12.8px there is no visual difference — you have paid the cost of two sizes and received one, and neither hints cleanly.

**What dense products actually use**: an explicit list of integers, chosen by role, with irregular gaps.

Geist, published by Vercel and measured on their own page:

```
headings:  72/72  64/64  56/56  48/56  40/48  32/40  24/32  20/26  16/24  (weight 600)
copy:      20/30  16/24  14/20  13/18                                   (weight 400)
labels:    20/26  18/24  16/20  14/20  13/18  12/16                     (weight 400–500)
buttons:   16/20  14/20  12/16                                          (weight 500)
```

Note that `16` appears in four different roles with three different line-heights (24 for copy, 20 for label, 20 for button). **The scale is `(size, line-height, weight, role)`, not `size`.** That is the actual lesson.

GitHub's tokens, read from `:root`:

```
--base-text-size-xs: .75rem   (12)
--base-text-size-sm: .875rem  (14)
--base-text-size-md: 1rem     (16)
--base-text-size-lg: 1.25rem  (20)
--base-text-size-xl: 2rem     (32)
--base-text-size-2xl: 2.5rem  (40)
--base-text-lineHeight-tight: 1.25   snug: 1.375   normal: 1.5   relaxed: 1.625   loose: 1.75
--base-text-weight-light: 300  normal: 400  medium: 500  semibold: 600
```

The gap between `lg` (20) and `xl` (32) is deliberate — there is nothing at 24 or 28 in the token set, because GitHub does not want anyone reaching for a heading that is "sort of" between h2 and h3. (Their rendered page uses 24px for h2 anyway, from a different layer. Even good systems leak.)

**A scale that works for a dense product:**

```
11  12  13  14  15  16  18  20  24  32  40  48  64
```

Thirteen integers. Tight below 20 where you make most decisions; wide above it where you make few. Never fractional. If you need something between 24 and 32, the answer is that you don't.

**When a modular scale is right:** editorial and marketing surfaces where you use four sizes total and the ratio produces visible rhythm. Anthropic's site sets 20px serif body. Sanity sets a 112px display. Those are typographic compositions, not UIs, and a ratio serves them.

---

## Line-height

Line-height is a function of **size** and **task**, not of size alone. The measured data separates cleanly:

| Context | Size | Line-height | Ratio | Measured at |
|---|---|---|---|---|
| Display heading | 48–112 | 48–112 | **0.95–1.10** | Attio 64/60.8 (0.95), Vercel 72/72 (1.0), Sanity 112/112 (1.0), Linear 48/48 (1.0), Mercury 49.3/54.3 (1.10) |
| Page heading | 30–42 | 36–48 | **1.12–1.25** | Linear 32/36, Notion 42/48, Tailwind 30/36, GitHub 32/40 (1.25) |
| Section heading | 20–26 | 26–32 | **1.25–1.35** | Geist 24/32, Linear 24/31.9, Notion 22/28, Geist 20/26 |
| Prose | 15–16 | 24–27 | **1.5–1.7** | Stripe 16/26 (1.63), Vercel docs 16/27.2 (1.70), Cursor 15/24.4 (1.63), Notion 16/24 (1.50), Linear 15/24 (1.60) |
| Dense UI rows | 14 | 20–22 | **1.43–1.57** | Geist 14/20, Linear 14/21, GitHub 14/21, Grafana 14/22 |
| Scannable data rows | 14 | 18.2 | **1.30** | Stripe API parameter list |
| Micro / meta | 12–13 | 16–19.5 | **1.33–1.50** | 12/16 nearly universal; Linear 13/19.5 |
| Nav item, single-line | 16 | 16 | **1.00** | Mercury 16/16 (box height comes from padding) |

**The three decisions this makes for you:**

1. **Above ~40px, line-height goes below 1.15 and often to exactly 1.0.** A 64px headline at 1.5 has 32px of air between lines and reads as two unrelated sentences. Attio goes to 0.95 — line-height *below* font size — which works because at 64px the ascenders and descenders still don't collide in a two-line headline.
2. **The same 14px gets 18px, 20px or 22px depending on whether the user reads or scans.** Stripe's API parameter list is 1.3 because you're pattern-matching a name against a list; their prose paragraphs on the same page are 1.57 because you're reading sentences. If your table rows and your paragraphs share a line-height, one of them is wrong.
3. **Set line-height in px or unitless, never in `em`.** Unitless (`1.5`) inherits as a ratio, which is what you want. `em` inherits as a computed length and breaks the moment a child changes size.

### Measure (characters per line)

Measured line widths at 1440px:

| Product | Body | Column | Characters |
|---|---|---|---|
| Stripe API reference (prose) | 14/22 | 503px | **~69ch** |
| Stripe guides | 16/26 | 799px | ~98ch |
| Linear docs | 15/24 | 650px | ~81ch |
| Tailwind docs | 14/24 | 600px | **~80ch** |
| Cursor docs | 15/24.4 | 704px | ~91ch |
| Notion help | 16/24 | 800px | ~94ch |
| GitHub README | 16/24 | 838px | ~103ch |

The 45–75ch textbook rule is not what shipping documentation does. **The real cluster is 69–95ch**, and the ones with the best reading experience (Stripe API 69, Tailwind 80, Linear 81) sit at the bottom of it. GitHub's 103ch README is genuinely harder to read and everyone knows it.

Practical rule: `max-width: 68ch` for prose at 15–16px. Use the `ch` unit — it self-adjusts when you swap typefaces, which a `720px` does not (remember Geist is 10.8% wider than SF).

**When measure doesn't apply:** a table cell, a form label, a toast, a sidebar item. Those are not reading; they are recognition. Constrain those by column width, not by measure, and truncate.

---

## Letter-spacing

The "-0.02em on headlines" rule is real but it is a *midpoint*, not a constant, and about a third of excellent products don't do it at all.

### Tracking by size, measured across products (converted to em)

| Size | Geist | Notion | Attio | Linear | Cursor | Stripe | GitHub | Mercury |
|---|---|---|---|---|---|---|---|---|
| 64–112 | **−0.060** | −0.048 | −0.020 | — | — | — | — | 0 |
| 40–48 | **−0.060** | −0.036 | −0.010 | −0.022 | — | — | — | **+0.010** |
| 30–34 | −0.040 | — | — | −0.022 | −0.020 | 0 | 0 | **+0.015** |
| 24–26 | −0.040 | −0.024 | −0.010 | −0.012 | — | 0 | 0 | — |
| 20–22 | −0.020 | −0.011 | — | 0 | — | 0 | 0 | — |
| 16 | −0.020 | −0.006 | −0.010 | 0 | 0 | 0 | 0 | 0 |
| 14 | 0 | 0 | −0.010 | −0.013 | 0 | 0 | **+0.015** | 0 |
| 12 (caps) | 0 | +0.010 | **+0.060** | −0.014 | **+0.050** | 0 | 0 | **+0.020** |

**What to actually do:**

**Tighten** as size increases, on a curve, and only if your face was not drawn tight. Geist's own ramp — `−0.06em` at 40px+, `−0.04em` at 24–32px, `−0.02em` at 16–20px, `0` at 14px — is a good default for any neutral grotesque.

**Don't tighten** if:
- You are using the **system stack**. SF Pro is already optically sized; Stripe sets `letter-spacing: normal` on every heading up to 32px and it is correct. Adding `-0.02em` on top of SF's own optical tracking produces collisions in `Ti`, `rn`, `fi`.
- Your face has a **Display cut you're already using** (Attio at Inter Display, Mercury at Arcadia Display, Loom at Charlie Display). The tightening is drawn in. Loom sets `letter-spacing: normal` on a 63px w700 headline; Ramp sets `−0.0002em` on a 64px one. Both look right.
- Your brand is **warm or institutional**. Mercury tracks *out* at every size: `+0.01em` at 42px, `+0.015em` at 32px, `+0.02em` at 12px. Positive tracking reads as calm, spacious, considered — the opposite of the tight-tech-headline look. In a banking product that is the point.

**Track out**, always, for:
- **All-caps labels and eyebrows.** Uppercase letterforms are drawn with sidebearings tuned for mixed case; caps need +0.04 to +0.10em. Measured: Attio's eyebrow +0.06em, Cursor's +0.05em, Tailwind's mono section heads +0.10em.
- **Small text under ~12px**, sometimes. Grafana runs `+0.011em` on its entire 14px UI; Cursor runs `+0.005em` on 15px body; GitHub runs `+0.015em` on 16px nav. Each is a fractional pixel and each was a deliberate choice to open up crowded lowercase at reading size. This is the single most-ignored move in the list.

**Never track:** body prose at 15–16px in either direction beyond ±0.01em, and never a monospace face (it is already spaced; tracking it breaks column alignment with code you paste in).

---

## Font weight

### Why 400 / 500 / 600 beats 300 / 400 / 700

**300 fails at small sizes.** Below 16px on a light background, a 300 weight loses stroke to antialiasing and reads as low-contrast rather than as light. It only works as a *display* choice: Retool sets a 72px h1 at w300 and it is beautiful; the same weight at 14px would be unreadable. GitHub defines `--base-text-weight-light: 300` and does not use it for content.

**700 next to 400 is too big a jump.** You get "normal" and "SHOUTING" and nothing in between, so every intermediate distinction has to be made with color or size instead. Meanwhile 500 vs 400 is a legible step in every modern grotesque, and 600 vs 500 is another.

**The measured practice:**

| Product | Weights in use | Heading weight | Body weight | UI weight |
|---|---|---|---|---|
| Linear | 400, 510, 590 | **590** (510 on marketing) | 400 | **510** |
| Vercel / Geist | 400, 500, 550, 600 | 600 | 400 | 400–500 |
| GitHub | 400, 500, 600 | 600 | 400 | 400–500 |
| Attio | 400, 500, 600 | 500–600 | **500** | **500** |
| Notion | 400, 500, 600, 700 | **700** | 400 | 400–500 |
| Cursor | **400, 700 only** | **400** | 400 | 400 |
| Mercury | 360, 400, 420, 480, 500 | **480** | 360–400 | 420 |
| Grafana | **400, 500 only** | — | 400 | 400 |
| Stripe | 400, 500, 600, 700 | 700 | 400 | 400–600 |
| Supabase docs | — | — | **500** | 500 |

Three observations that will change what you write:

1. **Two weights is enough for a whole product.** Grafana runs an entire observability platform on 400 and 500. Cursor's docs run on 400 and 700, and use *color*, not weight, to mark the active nav item — nothing bolds on selection. If you find yourself needing four weights, you are probably substituting weight for spacing.
2. **Body weight 500 is a legitimate choice** and increasingly common (Attio, Supabase docs). It works on light backgrounds with a slightly larger x-height face, and it makes 14px UI text hold up without going to 15px. It is *wrong* on dark backgrounds, where 500 on a near-black ground blooms.
3. **Variable intermediate weights are for exactly one thing:** when 500 is too light and 600 is too heavy. Linear's 510 and 590 are that. Do not build a 100–900 palette.

**Dark mode adjustment.** Light text on dark backgrounds optically gains weight. Every product I measured that ships dark mode either drops one step (600 → 500) or relies on the face being drawn for it. If you use the same weight token in both themes, your dark mode is heavier than your light mode. Linear's 510/590 in dark mode is the equivalent of ~450/540 in light.

Also: `-webkit-font-smoothing: antialiased` is set on Linear, Stripe, Notion, Attio, Vercel, Raycast, Cursor, shadcn — nearly everyone. It thins strokes on macOS, which is the correction for dark mode's optical weight gain. GitHub and Grafana leave it at `auto`. It is a real fork in the road; pick one and apply it globally, never per-component.

---

## Numerals

Everything in this section is a decision you are currently making by accident.

### Tabular vs proportional

**Measured fact:** in Inter, `1` is 36.2 units against `0` at 61.3 — **41% narrower**. SF Pro: 27% narrower. Geist: 42%. Suisse: 44%. Helvetica and Arial ship monospaced digits; every modern UI grotesque does not.

So in a right-aligned column of currency, `$1,111.11` and `$8,888.88` are visibly different widths, decimal points don't stack, and the eye can't scan down. This is the most common typographic defect in AI-generated dashboards.

```css
/* Any column, table, timer, counter, price list, metric tile, diff stat. */
.numeric { font-variant-numeric: tabular-nums; }
```

`font-variant-numeric` is the modern property; `font-feature-settings: "tnum"` is the fallback for old Safari. Do not use both — `font-feature-settings` overrides `font-variant-numeric` entirely and silently.

**Use proportional (the default) for:** numbers inside running prose. "In 2024 we processed 1,847 payments" should not have gappy `1`s. Stripe applies `tabular-nums` selectively; Attio applies it to its metric labels; Notion forces `lining-nums` globally on a face whose default figures are already lining, which is belt-and-braces.

### Slashed zero

`font-variant-numeric: slashed-zero` (or `"zero" 1`). Turn it on where a `0`/`O` confusion has a cost: API keys, transaction IDs, serials, MAC addresses, one-time codes, license keys. Tailwind runs `"ss02","zero"` on its code face for exactly this.

Turn it **off** in money and metrics. Brex explicitly ships Inter with `"zero" 0` (measured on brex.com) — a slashed zero in `$1,000.00` reads as technical/machine and undercuts the seriousness. Also off in anything the user will read aloud or transcribe visually.

### Superscript cents, and the money rule

Do not superscript cents. `$1,847`⁠`.00` with the cents raised and shrunk is retail pricing signage; it says "$19⁹⁹". In a product where the number is the user's actual balance, render cents at the same size and weight as the dollars, in tabular figures. Mercury, Wise and Mercury's partner banks all do this.

Related: choose one decimal policy per surface and hold it. Aggregates whole-dollar, line items to the cent is a defensible split. Mixing within one column is not.

### Vertical alignment of digits with caps

Lining figures (the default in every face here) are drawn to cap height, so `2024` next to `FY` aligns. Old-style figures (`onum`) have ascenders and descenders and belong in serif prose, never in a UI. If a face gives you old-style by default — some text serifs do — force `lining-nums`, which is precisely why Notion sets `font-variant-numeric: lining-nums` globally.

---

## Text color hierarchy

**Three levels of neutral, one link color, one danger color.** That is the whole system. See the measured table above; nobody in my sample ships more.

The failure mode is inventing a fourth and fifth level to express distinctions that aren't about importance:

| You want to say | Wrong tool | Right tool |
|---|---|---|
| This label is secondary to its value | 4th gray | Size step (14 → 12) or weight step (500 → 400) |
| This row is disabled | 5th gray | `opacity` on the whole row, plus `aria-disabled` |
| This text is a placeholder | 6th gray | Genuinely a separate token; Vercel's `#8F8F8F` at 3.2:1 exists only for this |
| This is a different kind of thing | new gray | A different *hue* — Stripe's `#5469D4` links, `#B13600` warnings |

**Alpha vs hex.** Notion (`rgba(0,0,0,.95/.898/.54)`) and Grafana (`rgba(#CCCCDC, .65)`) define their hierarchy as alpha over a single base. That composites correctly over colored cards and callouts, which is why both do it — Notion has yellow/blue/red callout blocks and the text has to still look right in all of them. Hex levels (Stripe, GitHub, Vercel, Cursor) are simpler to reason about and give exact contrast numbers. If your product has colored surfaces, use alpha. If it doesn't, use hex.

**The floor.** Tertiary text landed at 4.48 (Attio), 4.60 (Stripe), 4.61 (Notion), 5.4 (Cursor), 5.6 (Grafana), 6.1 (Linear, GitHub). Everyone is hugging 4.5:1 from above. If your tertiary is at 3.5:1 because it "looks nicer," you have made real content inaccessible to buy a mood.

---

## Truncation, wrapping and overflow

### `text-wrap: balance` and `pretty`, measured in the wild

| Product | Headings | Paragraphs |
|---|---|---|
| Notion | `balance` on h1, h2, h3 | `pretty` on p |
| Mercury | `balance` on h1, h2, h3 | `pretty` on p |
| Attio | `balance` on h1–h3 | — |
| Cursor | `balance` on h1, h2 | — |
| GitHub | `balance` on h3 | `balance` on p |
| Stripe | — | **`pretty` on everything** |
| Linear | neither | neither |

The consensus is real: **`balance` on headings, `pretty` on paragraphs.**

- `balance` equalizes line lengths across a short block. It is capped at ~6 lines in browsers for performance, so it is a heading tool. It stops the "five words then one orphan word" headline.
- `pretty` only prevents the last-line orphan and is cheap enough to apply broadly, which is what Stripe does — a single global rule.

Do not put `balance` on a paragraph of body copy: on a 68ch measure it will make every line the same length, which removes the ragged right edge the eye uses to track lines.

### `line-clamp` vs ellipsis vs fade

| Situation | Use |
|---|---|
| Single-line label that must not wrap (table cell, sidebar item, chip) | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` |
| Multi-line description with a hard cap (card body, list item preview) | `display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden` |
| Content that continues on click/expand and where hiding the cut is the point | fade mask: `mask-image: linear-gradient(to bottom, #000 60%, transparent)` |

Two rules that get broken constantly:

1. **Truncated text must carry its full value.** `title={fullText}` at minimum; a tooltip if it's important. A truncated file path or email that cannot be recovered is a bug, not a style.
2. **Truncate the middle for identifiers.** `ch_3MmlLrLkdIwHu…snN0B15` is useless; `ch_3MmlLrL…snN0B15` keeps both discriminating ends. Anything the user compares by eye — IDs, hashes, wallet addresses, file paths — truncates in the middle.

Never fade-mask a single line of text where the cut is meaningful. The fade says "there's more, scroll"; if there is nothing to scroll to, it lies.

---

## Labels, captions, helper text and inline code

These are four different things and AI output collapses them into one 14px gray.

**Field label.** Above the input. Same size as the input's text or one step down (12–14px), weight 500–600, **primary or secondary color** — a label is not de-emphasized content, it is the name of the thing. Stripe: 12/16 w600. Notion: 16/24 w400. Never lighter than the value it labels.

**Helper text.** Below the input, before the user types. 12–13px, tertiary color, weight 400. It is genuinely lower priority. Reserve vertical space for it always, or the layout jumps when the error appears.

**Error text.** Same size as helper text, danger color, weight 400–500. It replaces the helper text in the same slot, does not stack below it.

**Caption / meta.** Under images, in table footers, next to timestamps. 12px, tertiary, weight 400. Linear runs 13/19.5 w400 here.

**Eyebrow / section label.** All-caps, 11–12px, weight 500–600, **positive tracking +0.05 to +0.10em**, tertiary color. Measured: Attio 12 w600 `+0.06em`, Cursor 12 w400 `+0.05em`, Tailwind 12 w500 `+0.10em` in IBM Plex Mono. If you write an all-caps label without adding tracking, it reads as cramped and cheap; this is the highest-return single rule in this section.

**Inline code in prose.** Every product I measured sets inline code *smaller* than the surrounding text, because monospace faces have a larger apparent size at the same nominal px (Menlo's lowercase averages 60.2 units to Inter's 49.0 — **23% wider**, and its x-height is 54.7 to Inter's 51.6).

| Product | Prose | Inline code | Ratio |
|---|---|---|---|
| Stripe API ref | 14px | **11.9px** | 0.85 |
| Stripe guides | 16px | 14.4px | 0.90 |
| Vercel docs | 16px | 14.4px | 0.90 |
| Vercel Geist | 16px | 13.71px | 0.857 |
| Tailwind docs | 14px | 12px | 0.857 |
| shadcn docs | 15px | 12.75px | 0.85 |

The cluster is **0.85–0.90em**, and the canonical implementation is `font-size: 0.875em` (relative, so it tracks the parent). This is the one place where `em` is the right unit.

Code *blocks*, by contrast, are set at an absolute size — 13 or 14px — with line-height 1.4–1.5 (Stripe 14/18.2 = 1.3, Vercel 13/20 = 1.54, Attio 13/20). And turn ligatures off in code blocks unless you have decided otherwise: Vercel ships `ffs: "liga" 0` on `pre code`, because `!=` rendering as `≠` breaks copy-paste comprehension for a reader who doesn't have that font.

**Choosing a mono.** If your sans has a matching mono (Geist/Geist Mono share x-height 53.0 and cap 71.0 *exactly*; IBM Plex Sans/Mono; JetBrains Mono against most grotesques), use it — the baseline and weight match. Otherwise `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace` is fine, which is what GitHub ships. Do **not** use `monospace` bare: browsers apply a legacy 13px default to it that overrides your `font-size`.

---

## Non-Latin and i18n

The mechanism, as shipped by Notion and by shadcn/ui (measured from raw CSS):

```css
@font-face{
  font-family: "Noto Sans Arabic";
  font-weight: 100 900;
  font-stretch: 100%;                    /* required for variable-width Noto */
  font-display: swap;
  src: url(...) format("woff2");
  unicode-range: U+6??, U+750-77F, U+870-88E, U+FB50-FDFF, U+FE70-FEFC, ...;
}
```

Then `font-family: Geist, "Noto Sans Arabic", "Noto Sans Hebrew", sans-serif`. Arabic codepoints pull the Noto file; Latin never does. Notion ships Noto Sans Arabic and Noto Sans Hebrew this way; shadcn/ui adds Vazirmatn for Persian.

**Decisions this forces:**

1. **Scope your webfont by `unicode-range` or you will ship a 400KB file that has no Arabic in it anyway** and the browser will fall back mid-sentence, mixing two faces on one line.
2. **Non-Latin scripts need more line-height, not less.** Arabic, Devanagari and Thai have taller ascender/descender zones. A 14/20 row that is comfortable in Latin clips diacritics in Vietnamese and vowel marks in Thai. Set `line-height: 1.6` minimum on any surface that will hold those scripts, or set it per-locale.
3. **CJK ignores your letter-spacing and your measure.** Han characters are full-width; `-0.02em` on a Japanese heading pulls glyphs into each other. Reset `letter-spacing: normal` under `:lang(ja), :lang(zh), :lang(ko)`. And CJK needs *less* line-height ratio than Latin at the same nominal size but *more* absolute space — 1.7–1.8 is normal for Japanese body text.
4. **German and Finnish break your button widths.** "Einstellungen" is 14 characters where "Settings" is 8. Any fixed-width control that fits English by 2px is broken in German. Test with the longest string in your catalog, not with English.
5. **Notion sets `"locl" 0`** — localized forms off. That is a deliberate choice to keep glyph shapes stable across locales (Romanian `ș`, Bulgarian Cyrillic, Serbian italic forms) at the cost of local correctness. It is defensible for a product with one visual identity and wrong for a product where reading in your own script correctly matters more.

**Font loading, since it's the same file:** `font-display: swap` is what everyone ships. Pair it with a metric-matched fallback so swap doesn't shift layout. Vercel's, for Geist over Arial:

```css
@font-face{
  font-family: "GeistSans Fallback";
  src: local(Arial);
  ascent-override: 94.56%;
  descent-override: 27.76%;
  line-gap-override: 0%;
  size-adjust: 106.28%;
}
```

Generate these with `next/font`, Fontaine, or capsize. Without them, `swap` costs you a visible CLS on every cold load.

---

## When this advice is wrong

**Dense-UI advice is wrong for consumer onboarding.** Linear's 14px/510-weight rows are correct for an issue tracker someone lives in for six hours a day and builds muscle memory against. In a signup flow used once, by someone on a phone, in a hurry, possibly at 55 years old, 14px is hostile. Consumer first-run surfaces want 16–17px body, 1.5 line-height, and generous tap targets. Mercury's marketing body is 18/24.3 for exactly this reason.

**"Tighten headlines" is wrong for the system stack, for Display cuts, and for warm brands.** Stripe, GitHub, Loom and Ramp all ship large headings at `letter-spacing: normal` and are right to. Mercury tracks *out*. Copy Geist's `-0.06em` onto SF Pro and you get glyph collisions.

**"Never use light weights" is wrong at display sizes.** Retool's 72px w300 headline is excellent. The rule is about *reading sizes*, not about the weight existing.

**"Use a modular scale" is wrong for products with more than ~6 sizes.** It is right for a marketing page with four.

**"Body text is 16px" is wrong for internal tools and wrong for API references.** Stripe's API reference is 14px prose and 14/18.2 tables and that is the correct density for the task. It is *right* for anything a stranger reads once.

**"tabular-nums everywhere" is wrong in prose.** Gappy `1`s inside a sentence look broken.

**"Three text colors" is wrong for data visualization**, where you legitimately need a fourth and fifth for axis labels, gridline labels and annotations. That is a chart system, not a text hierarchy; scope it.

**`text-wrap: balance` is wrong on body paragraphs** and wrong on anything over ~6 lines (browsers bail out anyway, so you get inconsistent behavior between a 5-line and a 7-line block).

**`font-optical-sizing: auto` is wrong when your font file has no `opsz` axis** — which is most Inter deployments. It is dead CSS that makes you think a problem is solved.

**All of this is wrong if you're building an accessibility-first or low-vision surface**, where 18px minimum, 1.6 line-height, 400 weight only, and a 7:1 contrast floor beat every aesthetic argument here.

---

## What AI-generated typography looks like, and the five corrections

Measured against shadcn/ui's own documentation and against the general shape of generated output, these are the specific tells.

### 1. Fractional font sizes from compounding relative units

**The tell:** computed sizes of `12.8px`, `12.75px`, `12.25px`, `13.7143px`, `16.875px`, `18.75px` on the same page. These come from `text-sm` inside a container that already set `text-lg`, `em`-based `prose` styles compounding, or `0.875rem` of `0.9rem`. You end up with three sizes that differ by 0.05px — three tokens' worth of complexity for one visual result, and none of them hint cleanly at 1× DPR.

**Correction:** define the type scale in `rem` against a fixed `html { font-size: 16px }` root, produce integer px values only, and never nest a relative size inside another relative size. The single exception is inline `<code>` at `0.875em`, which is *supposed* to track its parent.

### 2. One line-height for the whole product

**The tell:** `leading-relaxed` or `line-height: 1.5` applied globally, so the 32px heading has 48px of leading and the 12px caption has 18px. The headings float apart, the page feels like a document rather than an interface, and vertical rhythm never resolves.

**Correction:** line-height is bound to the size *and the task*. Ship `(size, line-height)` pairs as single tokens, the way Geist does — `copy-16: 16/24`, `label-16: 16/20`, `heading-32: 32/40`. If a size appears in two roles, it gets two tokens. And take large headings to 1.0–1.15.

### 3. Bold everything, gray everything

**The tell:** every heading at `font-bold` (700), every label at `font-semibold`, every non-heading in `text-muted-foreground`. The result is a page with two states — loud and dim — and no middle. Because nothing is *quiet*, nothing reads as important.

**Correction:** headings at 600 (or 500 with a Display cut, or 400 if you have Cursor's confidence). Labels at 500. Body at 400. Establish hierarchy with **size and space first**, weight second, color third. Look at what Cursor does: the active sidebar item changes color and nothing else — no weight change, no background, no movement.

### 4. Proportional figures in every number column

**The tell:** a dashboard of metric tiles and a transactions table where the decimal points don't line up and the digits shimmer as values update. Nobody notices consciously; everybody feels it as "cheap."

**Correction:** `font-variant-numeric: tabular-nums` on every table cell containing a number, every metric tile, every counter, every timer, every diff stat, every price. Add `slashed-zero` on IDs and keys. Leave prose alone.

### 5. Untouched Inter, or Inter plus a Google Fonts display face

**The tell:** `font-family: Inter` with `font-feature-settings: normal`, or Inter body paired with a decorative display font from the Google Fonts front page. The first reads as "no decision was made." The second reads as "a decision was made badly," because the display face and Inter share no design DNA and the pairing collapses at the h3/body boundary.

**Correction, cheapest first:**
- Add character variants. `font-feature-settings: "cv02","cv03","cv04","cv11"` (Tailwind's set) changes Inter's `a`, `4`, `6` and `9` and materially changes the page's face for four tokens of CSS.
- Add `"ss03"` for round quotes and commas if you have any punctuation-heavy copy.
- If you need a display face, use **the same family's Display cut** (Inter Display, Arcadia Display, Charlie Display) rather than a different family. Attio, Mercury and Loom all do this.
- Pair a grotesque with a **serif**, not with another sans. Notion + Lyon Text, Vanta + Reckless, Anthropic Sans + Anthropic Serif, Runway + Times Now, Brex + Flecha. Robinhood runs Capsule Sans Text for body and sets its h1 in **Martina Plantijn at 64/72 w400, `letter-spacing: -0.005em`** — a serif headline at regular weight, in a product once accused of gamification. A serif gives you contrast that another grotesque cannot.

### Bonus tells worth naming

- **`letter-spacing: -0.02em` applied globally**, including to 12px labels and to monospace. Tracking is a curve, and mono is never tracked.
- **Placeholder text as the label.** The label disappears the moment the user types.
- **`text-transform: uppercase` with no tracking.** +0.05em minimum, always.
- **Four or five grays.** See above.
- **`font-family: monospace` bare**, which triggers the browser's legacy 13px default and silently ignores your `font-size`.
- **Truncation with no title attribute.** The information is simply gone.
- **A 1200px-wide paragraph.** Nothing caps the measure, so at 1440px the body copy runs 150 characters.

---

## Self-check list

Run this against your own output before you call it done.

**Scale and sizing**
- [ ] Every computed `font-size` on the page is an integer px. (Check in DevTools; `12.8px` means a relative unit compounded.)
- [ ] There are ≤ 8 distinct font sizes on any one screen.
- [ ] There are exactly two body sizes in the product: one for prose, one for dense UI, and I can name which surfaces use which.

**Line-height**
- [ ] Headings over 40px have line-height ≤ 1.15.
- [ ] Prose has line-height 1.5–1.7; dense rows have 1.3–1.5. They are not the same number.
- [ ] Every `line-height` is unitless or px, never `em`.

**Weight**
- [ ] Three weights or fewer are actually rendered.
- [ ] No text below 16px is at weight 300.
- [ ] No two adjacent weights (500/600) appear on the same line.
- [ ] Selection/active state changes color, not weight — or if it changes weight, the layout does not shift.

**Tracking**
- [ ] Letter-spacing is `0` at 14px and below, unless the text is all-caps.
- [ ] Every all-caps label has `letter-spacing` between `+0.04em` and `+0.10em`.
- [ ] No monospace element has letter-spacing applied.
- [ ] If I'm using the system stack or a Display cut, headings are at `letter-spacing: normal`.

**Numerals**
- [ ] Every table column of numbers, metric tile, counter and price has `font-variant-numeric: tabular-nums`.
- [ ] Decimal points visually align down every numeric column. (Screenshot it and look.)
- [ ] Cents are the same size and weight as dollars.
- [ ] IDs and keys use `slashed-zero`; money does not.

**Color**
- [ ] Exactly three neutral text levels exist as tokens.
- [ ] The tertiary level measures ≥ 4.5:1 against its actual background. (Run `tools/contrast.mjs`.)
- [ ] No color is used to express a distinction that size or weight should express.

**Wrapping**
- [ ] Headings have `text-wrap: balance`; paragraphs have `text-wrap: pretty`.
- [ ] Prose has a `max-width` in `ch` (≈ 68ch), not px.
- [ ] Every truncated element has its full value in `title` or a tooltip.
- [ ] IDs and paths truncate in the middle, not at the end.

**Face**
- [ ] If the product uses Inter, `font-feature-settings` is not `normal`.
- [ ] Inline `<code>` is `0.875em`, not a fixed px.
- [ ] `monospace` never appears bare in a font stack.
- [ ] A metric-matched fallback `@font-face` exists for every webfont, or `font-display` is `optional`.
- [ ] I rendered it at 1440 and 390, opened the PNGs, and looked at them.
