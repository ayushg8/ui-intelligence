# The taxonomy of AI-generated UI

**Evaluated:** 2026-09

**What makes an interface recognizable as machine-made in 2026 — every tell, why the model produces
it, why a designer clocks it in half a second, when it is actually correct, the specific move that
replaces it, and how to detect it in code and in a screenshot.**

**Measured 2026-09-10.** Every number, hex value, class name, string and count below was read out of
a live interface with Playwright — computed styles, `:root` custom property dumps, stylesheet rule
inspection — or off a 1440×900 render that I opened and looked at. Nothing here is recalled from
training data. The corpus:

| Set | n | What |
|---|---|---|
| **Generated** | 15 | v0.app community templates, opened at their live preview URLs (Optimus, COMPUTE, AGENTIC, Tasko, UXBooster, Financial Dashboard, HR Pulse, DRIPNEX, Hoodie Store, Modern SaaS Landing, and 5 more) |
| **Generated** | 10 | Published `*.lovable.app` apps built by real users, found via search, not curated by Lovable |
| **Reference** | 2 | `ui.shadcn.com/blocks` and `/examples/dashboard` — the source of the defaults |
| **Control** | 14 | linear.app, stripe.com, mercury.com, ramp.com, raycast.com, railway.com, vercel.com, notion.com, figma.com, sentry.io, posthog.com, basecamp.com, arc.net, gov.uk |

Two hard results frame everything below:

- **Gradient text appeared on 0 of 14 control products.** Not "rarely." Zero. It appeared on
  Lovable and v0 output.
- **`:focus-visible` rule counts:** Railway 97, Notion 84, Mercury 56, GOV.UK 53, Ramp 36 · versus
  **exactly 24 on seven different v0 templates by seven different authors** (the Tailwind/shadcn
  base, with nothing added) and **0** on a financial dashboard.

---

## 0 — Quick-reference index

Scan this. Jump to the section for the six fields.

### A · Surface & geometry
| # | Tell | Detect in 5 seconds |
|---|---|---|
| [A1](#a1--one-radius-scaled-seven-ways) | One radius value, scaled | All radii are multiples of one number: 6/8/10/14/18/22/26 |
| [A2](#a2--rounded-full-on-everything-that-isnt-round) | `rounded-full` on non-circular things | computed `border-radius: 3.35544e+07px` on 20–105 elements |
| [A3](#a3--the-single-flat-shadow) | `0 1px 2px rgba(0,0,0,.05)` and nothing else | One shadow value, no ring, no second layer |
| [A4](#a4--the-alpha-ramp-instead-of-an-elevation-model) | `bg-black/5 /10 /20` as the surface system | `oklab(0 0 0 / 0.04 … 0.25)` backgrounds |
| [A5](#a5--glass-applied-to-content-not-to-chrome) | `backdrop-filter: blur()` on cards | blur count > 8 with cards behind it |
| [A6](#a6--the-blurred-blob-and-the-radial-glow) | 400–800px radial gradients behind the hero | `radial-gradient(… , rgba(x,y,z,.15), transparent 60%)` |
| [A7](#a7--the-animated-gradient-border) | conic-gradient rotating on a pseudo-element | `@keyframes` named `border-beam`, `shine`, `rotate` |
| [A8](#a8--the-detached-floating-pill-navbar) | Nav inset 16–24px from the top, pill-shaped | `position: fixed; top: 16px` + `rounded-full` |

### B · Color
| # | Tell | Detect in 5 seconds |
|---|---|---|
| [B1](#b1--the-violet-blue-gradient-mostly-extinct-still-worth-knowing) | `from-blue-600 to-purple-500` hero | grep `from-.*-(500\|600) to-(purple\|violet\|fuchsia)` |
| [B2](#b2--gradient-text) | `bg-clip-text` on the headline | `background-clip: text` count > 0 |
| [B3](#b3--the-untouched-shadcn-neutral-ramp) | `240 10% 3.9%` / `240 3.8% 46.1%` / `240 5.9% 90%` | grep the literal HSL triplets |
| [B4](#b4--the-sequential-chart-ramp-used-for-categories) | `--chart-1..5` = blue-300…blue-800 | Five series, one hue, five lightnesses |
| [B5](#b5--generic-dark-mode-1-pure-black--saturated-accent) | `#000` page, `#00ff9d`-class accent | body bg `rgb(0,0,0)` or `#0a0a0a`, accent chroma > 0.15 |
| [B6](#b6--generic-dark-mode-2-a-ramp-with-no-perceptible-steps) | Four near-blacks within ΔL 15 | Surfaces at #05070b / #0c1014 / #171b1f |
| [B7](#b7--generic-dark-mode-3-inverted-or-absent-elevation) | Cards darker than the page they sit on | Compare card bg L\* to body bg L\* |
| [B8](#b8--color-used-decoratively-rather-than-semantically) | Icon chips in 4 unrelated hues | Category colors with no legend |
| [B9](#b9--the-accent-everywhere) | Primary color on > 3% of surface area | Squint: more than 2 accent-colored regions |

### C · Typography
| # | Tell | Detect in 5 seconds |
|---|---|---|
| [C1](#c1--one-tracking-value-expressed-as-one-em-constant) | Every `letter-spacing ÷ font-size` = −0.025 | Divide. If you get one number, it's a utility. |
| [C2](#c2--font-weights-that-are-all-multiples-of-100) | 300/400/500/600/700 and nothing between | grep `font-weight:` — any 450, 510, 530? |
| [C3](#c3--the-oversized-generic-headline) | 96–160px hero, 4 lines, lh 0.9–1.0 | h1 `font-size` ≥ 88px at 1440 |
| [C4](#c4--the-italic-serif-accent-word) | One word in italic serif inside a sans headline | `<em>`/`<span>` with a different `font-family` in h1 |
| [C5](#c5--the-letter-spaced-hero-word) | `s c a l e` — 0.2em+ on one display word | letter-spacing > 4px on a > 60px word |
| [C6](#c6--the-mono-eyebrow-with-an-em-rule) | `—— The platform for modern teams` in mono | mono family + `tracking-widest` above h1 |
| [C7](#c7--tracking-widest-uppercase-labels-everywhere) | `+1.98px` / `+2.2px` / `+2.64px` on 10px caps | positive letter-spacing on > 30 elements |
| [C8](#c8--inter-geist-and-the-four-substitutes) | Inter / Geist / Instrument Sans / Plus Jakarta | `font-family` first token |
| [C9](#c9--the-announcement-pill-above-the-headline) | `🎉 Introducing … →` pill, 28px, centered | A `rounded-full` sibling immediately before `h1` |

### D · Layout & composition
| # | Tell | Detect in 5 seconds |
|---|---|---|
| [D1](#d1--everything-in-cards) | Every group is a bordered rounded box | Count surfaces; > 20 on a page with 8 ideas |
| [D2](#d2--nested-cards-a-dashboard-tell-not-a-landing-page-tell) | Card in card in card, same treatment | Surface-depth histogram with equal styling |
| [D3](#d3--one-content-width-on-every-section) | `max-width: 1400px` × 11 | One inner max-width dominates |
| [D4](#d4--one-vertical-padding-on-every-section) | `padding-top: 128px` × 8 of 13 | Section padding histogram is a spike |
| [D5](#d5--centered-everything) | 35% of elements `text-align: center` | Count centered elements ÷ total |
| [D6](#d6--three-identical-feature-cards) | 3-col grid, 3 items, icon + h3 + 2 lines | `grid-template-columns` 3 × equal, 3 children |
| [D7](#d7--the-bento-grid-as-a-substitute-for-hierarchy) | 2×3 of unequal boxes, equal importance | `grid-auto-flow: dense` or `col-span-2` mosaics |
| [D8](#d8--the-landing-page-shape-applied-to-application-pages) | Settings page with a hero and a CTA | An `<h1>` over 40px inside an authed route |
| [D9](#d9--the-logo-cloud) | 5–6 grayscale logos at 40% opacity | `filter: grayscale(1)` + `opacity: .4` row |
| [D10](#d10--the-testimonial-trio) | 3 quotes, 3 avatars, 3 equal cards | Three `<blockquote>` in a 3-col grid |
| [D11](#d11--the-generic-pricing-table) | 3 tiers, middle one "Most popular", ring | `ring-2` / `scale-105` on the middle column |
| [D12](#d12--faq-accordion-as-page-filler) | 6 questions nobody asked, at the bottom | `[data-state]` accordion under the last CTA |

### E · Library fingerprints
| # | Tell | Detect in 5 seconds |
|---|---|---|
| [E1](#e1--dead-tokens-for-components-the-page-does-not-contain) | `--sidebar-ring` on a marketing page | Count `:root` props with no matching element |
| [E2](#e2--the-tailwind-transition-signature) | `.15s cubic-bezier(.4,0,.2,1)` with `all` | `transition-property: all` on > 20 elements |
| [E3](#e3--the-shadcn-keyframe-residue) | `accordion-down`, `caret-blink` with no accordion | `@keyframes` names vs. actual components |
| [E4](#e4--the-lucide-eight) | `check`, `arrow-right`, `arrow-up-right`, `menu`, `shield`, `lock`, `eye`, `file-check` | `svg.lucide-*` class names |
| [E5](#e5--the-lovable-badge-and-other-host-watermarks) | 17 elements in `CameraPlainVariable` | `font-family` outlier with n ≈ 17 |
| [E6](#e6--the-focus-visible-count-of-exactly-24) | Nobody wrote a focus style | Count `:focus-visible` rules |

### F · Motion
| # | Tell | Detect in 5 seconds |
|---|---|---|
| [F1](#f1--an-entrance-animation-on-every-section) | `fadeInUp` on 5+ blocks, 110 char-reveals | animation-name histogram |
| [F2](#f2--the-per-character-hero-reveal) | Hero unreadable for the first ~900ms | Screenshot at t=0.5s and read it |
| [F3](#f3--the-marquee) | `marquee` + `marquee-reverse` keyframes | Same content repeats inside one viewport |
| [F4](#f4--spotlight-beam-and-meteor-effects) | Named `meteor`, `border-beam`, `spotlight` | grep the keyframe names |
| [F5](#f5--one-duration-one-easing-for-the-whole-page) | Everything is 150ms or 300ms | transition-duration histogram |
| [F6](#f6--scroll-jacking) | Wheel handler that fights the scroll | `preventDefault` in a `wheel` listener |

### G · Content & copy
| # | Tell | Detect in 5 seconds |
|---|---|---|
| [G1](#g1--invented-metrics-attributed-to-real-companies) | "98% faster deployment — STRIPE" | Any number next to a logo you didn't earn |
| [G2](#g2--duplicated-rows-in-a-list-that-claims-to-be-data) | Same transaction twice, same timestamp | Read every row of every list |
| [G3](#g3--fake-dashboard-charts-with-no-referent) | Bars 0–100, no unit, no legend meaning | Can you name the unit? |
| [G4](#g4--stale-dates-from-the-training-cutoff) | "Upcoming" targets dated 2024 | Compare every date to today |
| [G5](#g5--the-ai-copy-register) | "Everything you need to ship agents." | The h2 list reads as one voice |
| [G6](#g6--the-fifteen-canned-phrases) | 7 of 15 on one page | grep the list |
| [G7](#g7--the-abstract-one-word-product-name) | Optimus · COMPUTE · AGENTIC · INTERFACE | All-caps single noun + `™` |
| [G8](#g8--emoji-as-iconography) | ⚡🌊🎨⚡🔍 as category icons | Any emoji in a UI label |
| [G9](#g9--copy-from-a-different-product-entirely) | Banking string inside a UX-audit tool | Read the small print |
| [G10](#g10--the-models-own-caveats-rendered-as-ui) | A "Current limitations" section | Section headed with a disclaimer |
| [G11](#g11--placeholder-identity) | `Acme Inc.`, `$1,250.00`, `jessin@gmail.com` | grep the fixture strings |

### H · States & depth
| # | Tell | Detect in 5 seconds |
|---|---|---|
| [H1](#h1--one-state-per-element) | No empty, loading, error, too-much | Tab through it; empty the data |
| [H2](#h2--no-focus-ring-or-a-default-one) | `outline: none` with nothing replacing it | Press Tab five times |
| [H3](#h3--12px-gray-text-below-aa) | `#a1a1a1` on `#fafafa` | Run a contrast pass |
| [H4](#h4--broken-images-that-render-alt-text) | `Acm` / `Use` where avatars should be | Look for 3-letter fragments |

### I · Second-order tells
| # | Tell |
|---|---|
| [I1](#i1--uniform-vertical-rhythm-with-no-emphasis) | Every section gets the same weight |
| [I2](#i2--hierarchy-expressed-only-through-size) | Remove size and the page is flat |
| [I3](#i3--no-asymmetry-anywhere) | Nothing is off-center on purpose |
| [I4](#i4--components-that-dont-compose) | Each block is right; together they aren't a system |
| [I5](#i5--correct-in-a-screenshot-empty-in-the-hand) | Nothing responds, nothing persists |
| [I6](#i6--the-theme-swap-that-changes-nothing) | New palette, identical geometry |
| [I7](#i7--scale-degeneracy) | Four border alphas, one gap value |
| [I8](#i8--no-real-content) | Every string is a category, not an instance |

---

## 1 — How to use this

Each entry has six fields, always in this order:

1. **The tell** — with values, precise enough to spot in a screenshot.
2. **Why AI generates it** — the mechanical cause.
3. **Why it reads as generated** — the perceptual cause.
4. **When it is actually fine** — the boundary. This field is load-bearing. An agent that reads
   "never use gradients" and applies it everywhere produces worse work than one that never opened
   this file.
5. **Instead** — the replacement move, with a product that ships it.
6. **Detect** — a grep/computed-style check and a screenshot check.

**Two failure modes, not one.** Everything here targets *generic*. The opposite failure — straining
for novelty — is worse, because a straining interface reads as amateur where a bland one reads as
neutral. A well-executed conventional interface is not a defect. The target is *intentional*, not
*unusual*.

**Ranking.** If you can only fix five things, fix G (content), then D3/D4 (rhythm), then E1 (dead
tokens), then H (states), then A (surface). Surface is the most visible and the least diagnostic.
An agent that perfects the radius scale and ships `Acme Inc.` has done nothing.

---

## 2 — The measurement baseline

Print this. It is the diff.

| Property | Generated (measured) | Excellent (measured) |
|---|---|---|
| Distinct `border-radius` values | 3–5, all multiples of one number | Linear **8** (9999, 12, 9, 8, 6, 4, 2, 50%); Raycast **8** (11, 8, 6, 12, 20, 16, 100%, 99999) |
| Dominant radius | `3.35544e+07px` (`rounded-full`) on 20–105 els | Mercury **4px** ×196; Railway **4px** ×437; Figma **2px**; GOV.UK **0px everywhere** |
| Box-shadow vocabulary | one value: `rgba(0,0,0,.05) 0 1px 2px` | Linear: `rgba(0,0,0,.2) 0 0 0 1px` (a ring) + `0 0 12px inset` + `0 2px 32px`; Ramp: `0 232px 65px rgba(0,0,0,.008), 0 35px 59px rgba(0,0,0,.03), 0 … rgba(0,0,0,.09)`; Raycast: a 4-layer keycap shadow on 159 elements |
| Gradient elements | 0–26 | Raycast **235**, Linear **62**, Stripe **26** — gradients are *not* the tell |
| **Gradient text elements** | 1–6 | **0 on all 14 controls** |
| `:focus-visible` rules | **exactly 24** (Tailwind base) on 7 v0 templates; **0** on a finance dashboard | Railway 97, Notion 84, Mercury 56, GOV.UK 53, Ramp 36, Raycast 25 |
| `letter-spacing ÷ font-size` | one constant: −0.025em at 48px, 60px, 86.4px, 96px, 160px | Linear −0.13/−0.165/−0.15/−0.039/−0.182px (5 non-proportional values); Mercury **+**0.07/+0.24/+0.42/+0.48 |
| Font weights | 300/400/500/600/700 only, no exceptions in 15 templates | Linear **510**, **590**; Mercury **420**, **480**, **360**, **530**; Figma **330**, **320**, **540**; Vercel **450** |
| Font families | Inter · Geist · Instrument Sans · `ui-sans-serif` (no choice made) | Stripe `sohne-var` (one family, 2705 elements); Mercury `arcadia`; Ramp `TWK Lausanne`; Linear `Inter Variable` + `Berkeley Mono` |
| Section vertical padding | Optimus `128px` ×8 of 13, `160px` ×2; AGENTIC `128px` ×9 of 12 | Stripe `0` on all 14 sections — padding lives on inner elements and varies |
| Content max-widths | one: `1400px` ×11 (Optimus), `1400px` ×14 (COMPUTE), `1152px` ×9 (AGENTIC) | Stripe **400px ×26, 1266px ×13, 817.778px ×8**; Linear 1436 / 250 / **541.566px**; GOV.UK 640 / 960 / 720 |
| Contrast failures (light pages) | UXBooster 5/51 (10%), MSP 45/317 (14%), IWD 20/72 (**28%**) | Railway **0/879**, GOV.UK **0/79**, Mercury 1/207, Stripe 17/420 (4%) |
| `:root` custom properties | 95–155, of which ~40 are unused | Ramp 271, Vercel 567, Notion 657 — all used; Stripe **0** |

Three of those are near-decisive on their own: **gradient text > 0**, **`:focus-visible` == 24**,
**a single `letter-spacing ÷ font-size` ratio**.

---

## A · Surface & geometry

### A1 · One radius, scaled seven ways

**The tell.** Every rounded thing on the page derives from a single number. shadcn 2026 ships
`--radius: .625rem` and computes the rest: `sm = ×0.6` (6px), `md = ×0.8` (8px), `lg = ×1` (10px),
`xl = ×1.4` (14px), `2xl = ×1.8` (18px), `3xl = ×2.2` (22px), `4xl = ×2.6` (26px). Measured on
`ui.shadcn.com/blocks`: 8px ×37, 6px ×35, 14px ×20, 10px ×10, 26px ×3 — the scale, exactly, with
nothing outside it. The visual result is that a 32px badge, a 40px input and a 400px card all
curve at proportionally similar rates, so they read as one blobby family instead of as different
kinds of object.

**Why AI generates it.** It is the framework's own arithmetic. A model that writes `rounded-lg`
never chooses a radius; it chooses a token name, and the token is derived. Changing `--radius` from
0.625 to 0.5 rescales all seven values together — which feels like customization and changes
nothing structural.

**Why it reads as generated.** A designer reads radius as a statement about material and size.
Small controls want tight corners (a 6px chip at 8px radius looks like a lozenge); large surfaces
want proportionally *smaller* radius, not larger. A derived scale gets this backwards at both ends.

**When it is actually fine.** For a product with fewer than ~15 component types and no display
surface — an internal tool, an admin console, a docs site. A derived scale is a real system and
consistency beats fiddling. It is also fine as a *starting point* you then break in two places.

**Instead.** Author the radii independently and let the vocabulary be wider than the scale. Linear
ships **eight** distinct radii on one page — 9999px (pills, ×76), 12px, 9px, 8px (×33), 6px, 4px
(×18), 2px, 50% (avatars, ×28). **9px** and **2px** are not in any generated scale; they exist
because something needed them. Raycast's dominant radius is **11px** (×159) — an odd number that
survives no derivation. Mercury runs almost everything at **4px** (×196) and reserves 12/32/40 for
three specific surfaces. GOV.UK ships **zero** radius on the entire page and looks like the
institution it is.

**Detect.** *Code:* if the set of computed radii is `{r×0.6, r×0.8, r, r×1.4, r×1.8, r×2.2, r×2.6}`
for a single r, it is untouched. Look for any radius that is not on the scale. *Screenshot:* squint
at a badge and a card together — if the corner arcs look like the same curve at two zoom levels,
that is the derivation showing.

---

### A2 · `rounded-full` on everything that isn't round

**The tell.** In Tailwind v4, `rounded-full` is `border-radius: calc(infinity * 1px)`, which
Chromium clamps to **33 554 400px** — it shows up in computed styles as `3.35544e+07px`. It is the
single most-used radius in generated output: AGENTIC **105 elements**, a Lovable community page
**353 elements**, COMPUTE 34, Tasko 26, UXBooster 25, Optimus 24. Buttons, nav items, badges,
avatars, icon chips, tags, progress bars, section eyebrows and — regularly — a 320px-wide card all
get it.

**Why AI generates it.** `rounded-full` is one word, always safe, never produces a visibly wrong
corner, and reads as "modern" in every tutorial in the training set. It is the token-cheapest way
to look finished.

**Why it reads as generated.** A pill says "this is a small, tappable, stateless thing." When
everything is a pill, that signal is gone, and the eye loses the ability to tell a filter chip from
a primary action from a status indicator. It also makes text look loosely bagged: a pill button
needs more horizontal padding than a rounded-rect one to look balanced, and generated output almost
never adds it.

**When it is actually fine.** Genuinely: avatars, status dots, tags/chips, segmented controls,
counter badges, and one — one — hero CTA where the pill is the brand's shape. Linear uses 9999px on
76 elements and it is right, because 76 of Linear's elements really are pills: nav pills, tab pills,
avatar rings, label chips. The tell is not the pill; it is the pill on a *card*.

**Instead.** Reserve full-round for things whose height is their identity. Give buttons a radius
that relates to their height: an 32px-tall button at 6–8px reads as a control; the same button at
16px reads as a toy. Raycast: 8px on buttons (×109) and 99999px only on 24 elements. Stripe: 4px
and 6px on buttons; the only 100% radii are three avatars.

**Detect.** *Code:* `grep -c 'rounded-full'` and cross-check against the count of genuinely circular
or pill-identity elements. In computed styles, `border-radius: 3.35544e+07px` on any element wider
than ~3× its height is a hit. *Screenshot:* find a rectangle wider than 200px with semicircular
ends. That's it.

---

### A3 · The single flat shadow

**The tell.** One shadow value on the whole page, almost always Tailwind's `shadow-sm`:
`rgba(0,0,0,0.05) 0px 1px 2px 0px`. Measured on the v0 Financial Dashboard: that exact string on
**10 elements**, and no other shadow anywhere. Frequently the page has no shadow at all — 21 of
Tasko's surfaces compute to `rgba(0,0,0,0) 0 0 0 0`, i.e. the shadow utility was applied and then
neutralized.

**Why AI generates it.** `shadow-sm` is the default on shadcn's `Card`. A model adds elevation by
adding a class, not by deciding how far off the page something floats.

**Why it reads as generated.** Real shadows are two things at once: a *contact* shadow (tight, dark,
close) and an *ambient* shadow (wide, faint, far). One layer gives you neither — it reads as a gray
smear, and at 5% alpha on a white page it is nearly invisible, so the card ends up defined by its
border anyway. The shadow is doing no work and you can see that it is doing no work.

**When it is actually fine.** On a dense data surface where elevation should be minimal and borders
carry the structure — a table, a settings list, a sidebar. Also fine when you are deliberately
building a flat system: GOV.UK ships **zero decorative shadows** and instead gives buttons a hard
`box-shadow: #083D29 0 2px 0 0` that reads as a physical edge.

**Instead.** Put a **ring in every shadow**. Linear's most-used shadow is
`rgba(0,0,0,0.2) 0px 0px 0px 1px` — a 1px ring with zero blur, used as a border that respects
`border-radius` — plus `rgba(0,0,0,0.2) 0 0 12px inset` for recessed wells and
`rgba(0,0,0,0.25) 0 2px 32px` for real overlays. Ramp's card shadow is three layers with
deliberately mismatched spreads: `0 232px 65px rgba(0,0,0,.008), 0 35px 59px rgba(0,0,0,.03),
0 … rgba(0,0,0,.09)`. Raycast ships a four-layer keycap shadow on **159** elements —
`rgba(0,0,0,.4) 0 1.5px .5px 2.5px, rgb(0,0,0) 0 0 .5px 1px, rgba(0,0,0,.25) 0 2px…` — which is
their signature and is instantly not-generic.

**Detect.** *Code:* histogram of computed `box-shadow`. If the top value contains exactly one
comma-free layer and appears on every card, it's the default. *Screenshot:* zoom to 400% on a card
corner — if there is no darker line at the edge, only a fade, there is no ring.

---

### A4 · The alpha ramp instead of an elevation model

**The tell.** Surfaces are not colors, they are opacities of one color. AGENTIC's card backgrounds
compute to `oklab(0 0 0 / 0.2)` ×30, `/0.12` ×30, `/0.25` ×20, `/0.04` ×12 — that is `bg-black/20`,
`/12`, `/25`, `/5` in Tailwind v4's oklab output. Its borders are `oklab(0 0 0 / 0.06)` ×18,
`/0.07` ×18, `/0.1` ×9, `/0.04` ×6 — **four near-identical border alphas on one page**, 0.06 and
0.07 being visually the same value chosen twice.

**Why AI generates it.** `bg-white/5` is the cheapest way to make a surface that works on any
background, and the model picks the number fresh each time it writes a component. Nothing forces
consistency, so the alphas drift.

**Why it reads as generated.** Alpha overlays composite — a card at `/10` inside a section at `/5`
is at 14.5%, and a third nesting is at 19%. The elevation *accumulates by accident* instead of being
assigned. And because every surface is the same hue, the page has no material variety: everything is
the background, dimmed.

**When it is actually fine.** Over imagery or video, where an opaque surface would clip the art.
Also fine as a **hover** treatment: Linear's row hover is a 4% white overlay precisely because it
must not shift layout or change the material.

**Instead.** Define three opaque surface levels and use nothing else. Ramp exposes 271 `:root`
properties and its surfaces are named colors, not alphas. Notion ships 657. Vercel 567. In dark
mode, elevate with **lightness**, not shadow (see B7).

**Detect.** *Code:* `grep -oE '(bg|border)-(black|white)/[0-9]+' | sort | uniq -c` — more than three
distinct alphas per role is drift. In computed styles, look for `oklab(0 0 0 / …)` or
`oklab(1 1 1 / …)` as the dominant background. *Screenshot:* two adjacent cards at different nesting
depths that are almost, but not quite, the same gray.

---

### A5 · Glass applied to content, not to chrome

**The tell.** `backdrop-filter: blur(12px)` on content cards, feature tiles and stat boxes — not on
navigation or overlays. Measured: IWD portfolio **11** blurred elements, AGENTIC 10, HR Pulse
inherits it from its top bar. Usually paired with `bg-white/10` and a `border-white/20`.

**Why AI generates it.** "Glassmorphism" is a named, well-documented aesthetic with thousands of
copy-paste examples. It is a two-class change that visibly transforms a page, which is exactly the
kind of edit a model optimizing for demo-legibility will make.

**Why it reads as generated.** Glass is a *statement about layering*: it says "there is content
behind me." Applied to a card sitting on a flat background, it blurs nothing, so what you get is a
translucent panel with a bright hairline and no reason to exist. A designer reads the missing
referent instantly.

**When it is actually fine.** When something genuinely overlaps something else: a sticky header over
scrolling content, a command palette over an app, a media control over video, a toast over a canvas.
PostHog has **27** backdrop-filtered elements and Raycast **17** — both are apps where floating
chrome sits over live content. It is also fine on native-feeling macOS/iOS surfaces where the OS
already sets that expectation.

**Instead.** Reserve blur for chrome that overlaps. For content cards, use an opaque surface one
step lighter/darker than the page. And if you keep glass: `backdrop-filter` costs real frame time on
mid-tier Android; measure before shipping it on 20 elements.

**Detect.** *Code:* count `backdrop-filter` in computed styles, then check whether each blurred
element has anything scrolling behind it. *Screenshot:* scroll the page 200px and re-shoot. If the
"glass" looks identical, it is not glass.

---

### A6 · The blurred blob and the radial glow

**The tell.** One to three absolutely-positioned `div`s, 400–800px, `rounded-full`,
`bg-purple-500/20`, `blur-3xl`, sitting behind the hero. In computed styles they appear as
`radial-gradient(400px, rgba(…, .03), rgba(0,0,0,0) 60%)` (AGENTIC ×12) or as a `filter: blur(64px)`
on an oversized circle. Frequently two of them in complementary hues at opposite corners.

**Why AI generates it.** It is the cheapest possible "the page has depth" move: no assets, no
imagery, no art direction, four utility classes. It also reliably fills the empty right half of a
left-aligned hero, which is otherwise the model's biggest layout problem.

**Why it reads as generated.** The blobs have no relationship to anything on the page — not to the
product, not to the logo, not to the content's shape. They are wallpaper generated to occupy
negative space, and the eye reads "something was placed here to avoid emptiness."

**When it is actually fine.** When the glow is emitted *by* something: light spilling from a product
screenshot, a bloom around a genuinely luminous UI element, the halo of an actual light source in an
illustration. Raycast has **235 gradient elements** and none of them read as blobs, because each one
is attached to a real surface — a keycap, a window edge, an app icon.

**Instead.** Fill the space with the product. Linear's hero right side is a live issue view reading
`DRV-8852 Faster app launch`. Stripe's is a real payment component. Mercury's is a commissioned
illustration with a specific point of view. If you have nothing to put there, make the hero narrower
— an asymmetric hero with real emptiness beats a symmetric one with fake depth.

**Detect.** *Code:* `grep -E 'blur-(2xl|3xl)|filter: blur\((4[0-9]|[5-9][0-9]|1[0-9]{2})px\)'`, and
look for `absolute` + `rounded-full` + a width over 300px with no children. *Screenshot:* delete the
color and see whether the composition still works. If removing the blob leaves a hole, the blob was
the layout.

---

### A7 · The animated gradient border

**The tell.** A conic gradient rotating on a pseudo-element behind a card, producing a light that
travels around the border. Keyframe names to look for: `border-beam`, `shine`, `rotate`,
`gradient-shift` (measured in COMPUTE), `background-position` animations on
`linear-gradient(90deg, …)`.

**Why AI generates it.** It is a flagship Magic UI / Aceternity component. Those two libraries exist
to be pasted, they rank highly in search and training data, and the component is self-contained —
exactly the shape of thing a model reaches for when asked to "make it look premium."

**Why it reads as generated.** It draws continuous attention to a static element. The eye tracks
motion involuntarily; a card that glimmers forever costs the reader attention and returns nothing.
And because the effect is library-identical everywhere, it is a logo for the library, not for you.

**When it is actually fine.** As a *state*, not a decoration: a border beam while a job is running,
while a stream is generating, while an upload is in flight. Then the motion is information and it
stops when the state ends.

**Instead.** If you want a card to feel special, make its *content* special. If you want motion, tie
it to state. Linear's "in progress" indicator is a small arc that only spins while something is in
progress.

**Detect.** *Code:* `grep -riE 'border-beam|conic-gradient|shine|meteor|animate-\[.*infinite'`.
*Screenshot:* take two shots 400ms apart and diff them. Anything that changed while the user did
nothing is a candidate.

---

### A8 · The detached floating pill navbar

**The tell.** The header is not at the top. It is `position: fixed; top: 16px` (or 24px), inset from
both edges, `rounded-full` or `rounded-2xl`, with a border and often a blur. Measured on AGENTIC:
an 80px-tall pill floating with the wordmark `A G E N T I C` in letter-spaced mono at the left and a
`START BUILDING` pill at the right.

**Why AI generates it.** It is the highest-frequency "modern SaaS header" in 2025–26 template data,
and it solves the model's problem of making a header look designed without designing one.

**Why it reads as generated.** It costs 16–24px of vertical space at the top of every page, it makes
the scroll-under transition awkward, and it detaches navigation from the viewport edge where users
throw the cursor. It is a decoration applied to the one element that should be pure utility.

**When it is actually fine.** On a single-screen marketing page where the nav is 3 links and the
composition is deliberately floating (a full-bleed image behind it). Also fine in an app where the
"nav" is genuinely a floating command surface.

**Instead.** Pin the header to the top edge, give it a 1px bottom border that appears on scroll, and
spend the saved pixels on the hero. Stripe, Linear, Ramp, Vercel, Railway, Notion and Figma all pin
their headers to `top: 0`. Zero of the 14 controls float a pill nav.

**Detect.** *Code:* `position: fixed` + `top` > 0 + `border-radius` ≥ 16px on the `<header>`.
*Screenshot:* is there page background visible above the nav? That's the tell.

---

## B · Color

### B1 · The violet-blue gradient (mostly extinct, still worth knowing)

**The tell.** `bg-gradient-to-r from-blue-600 to-purple-500` (or `to-violet-600`, `to-fuchsia-500`)
on a hero background or a primary button. Tailwind's `blue-600` is
`lab(44.06% 29.03 -86.04)` and `purple-500` is `lab(52.02% 66.11 -78.23)`; the ramp between them is
the single most-reproduced gradient of the 2023–24 web.

**Why AI generates it.** It is the highest-frequency gradient in the Tailwind-tutorial corpus, and
"purple = AI/tech" was reinforced by three years of AI product launches.

**Why it reads as generated.** Anyone who has looked at more than fifty landing pages has seen this
exact ramp on all of them. It carries no brand information because it belongs to everybody.

**When it is actually fine.** When violet is your actual brand color and you own it. Also fine as an
*illustration* gradient inside a product diagram, where nobody mistakes it for a brand decision.

**Instead.** If you want a gradient hero, derive it from your own hue and keep the excursion small —
a single hue at two lightnesses reads as material, two hues 120° apart reads as a template. Better:
skip it. Stripe's hero gradient is a wide, low-chroma sweep of its own brand blues, and Stripe uses
**26** gradient elements without a single one reading as decoration.

**Contrarian note.** *This tell is now rare in curated output.* Across 15 v0 templates measured in
September 2026, I found **zero** violet-blue hero gradients. It survives in two places: consumer-ish
Lovable output, and the *thumbnails* of AI-built apps (one Lovable gallery I opened showed a card
whose preview reads "Build Your Next **Landing Page**" in purple gradient text on a purple-glow dark
hero). If you are auditing 2026 output and looking for purple, you are fighting the last war. Look
at rhythm and content instead.

**Detect.** *Code:* `grep -E 'from-(blue|indigo|violet)-(500|600).*to-(purple|violet|fuchsia|pink)'`.
*Screenshot:* obvious.

---

### B2 · Gradient text

**The tell.** `bg-gradient-to-r … bg-clip-text text-transparent` on a headline or on one word of it.
In computed styles: `background-clip: text` with a `linear-gradient` background-image. Measured:
**0 of 14 control products**; present on Lovable's IWD portfolio (the word "9 Apps"), on Lovable's
own marketing page (6 elements), and on a v0 SaaS landing page.

**Why AI generates it.** Two utility classes, enormous visible change, and it is the canonical way
to make a headline "pop" in the tutorial corpus. It is also the model's answer to "make it more
exciting" that carries no layout risk.

**Why it reads as generated.** It degrades the one thing a headline must do. Letterforms are read by
their edges; a gradient reduces contrast across part of every glyph, so the word is harder to read
than the same word in one color — and it fails contrast checks in a way that is invisible to the
generator. Designers also know it is the cheapest possible "premium" signal, which makes it read as
a substitute for having something to say.

**When it is actually fine.** On a single display word at 96px+ where the gradient is between two
values of *the same hue* and both ends clear 4.5:1 against the background — and where the word is
not load-bearing for comprehension. Effectively: a wordmark, a numeral, a section divider. Almost
never on a sentence.

**Instead.** Get emphasis from weight, size and space. If you want one word to carry color, set it
in a flat accent — one hue, checked for contrast. Linear's hero is a single `Inter Variable` weight
510 at 64px in one color and it is the most confident headline in the control set.

**Detect.** *Code:* `grep -r 'bg-clip-text'` or, in computed styles,
`getComputedStyle(el).webkitBackgroundClip === 'text'`. *Screenshot:* the headline has a hue shift
across it. Also: screenshot in grayscale — gradient text turns to mush.

---

### B3 · The untouched shadcn neutral ramp

**The tell.** Verbatim shadcn defaults in `:root`. Two generations are in the wild and both are
grep-able.

*The 2024–25 zinc set* (measured verbatim on the v0 Financial Dashboard, September 2026):

```
--background: 0 0% 100%;      --foreground: 240 10% 3.9%;
--muted: 240 4.8% 95.9%;      --muted-foreground: 240 3.8% 46.1%;
--border: 240 5.9% 90%;       --input: 240 5.9% 90%;
--primary: 240 5.9% 10%;      --ring: 240 5% 64.9%;
--destructive: 0 84.2% 60.2%; --radius: .5rem;
--chart-1: 173 58% 39%; --chart-2: 12 76% 61%; --chart-3: 197 37% 24%;
--chart-4: 43 74% 66%;  --chart-5: 27 87% 67%;
--sidebar-background: 0 0% 98%; …
```

That page also shipped `--accent-foreground:` with **an empty value**.

*The 2026 neutral set* (measured live on `ui.shadcn.com`):

```
--radius: .625rem;
--background: #fff;                --foreground: #000;
--muted / --secondary / --accent:  neutral-100 (#f5f5f5)
--muted-foreground:                neutral-500 (#737373)
--border / --input:                neutral-200 (#e5e5e5)
--ring:                            neutral-400 (#a1a1a1)
--destructive:                     red-600
--chart-1..5: blue-300, blue-500, blue-600, blue-700, blue-800
```

**Why AI generates it.** They are the defaults. Nothing in the generation loop forces a decision
about them, and they never look broken.

**Why it reads as generated.** `240 10% 3.9%` is not black — it is black with a 240° hue at 10%
chroma, i.e. faintly blue-purple. When your text, your borders and your muted grays all carry the
same 240° cast, the page has a temperature nobody chose. Anyone who has built with shadcn recognizes
it on sight the way you recognize Bootstrap's `#337ab7`.

**When it is actually fine.** Prototypes, internal tools, and any surface where "shadcn" is an
accurate description of what the product is. There is no shame in a default that works; the shame is
in shipping it as a brand.

**Instead — the seven overrides, in priority order.**
1. `--radius` → `0.5rem` or lower, then break the scale in two places.
2. Replace the neutral ramp with one that has *your* hue at *low* chroma. Pick a hue, hold chroma at
   0.005–0.02 in oklch, and vary lightness. The generic version is chroma 0 (dead) or 0.05+ (tinted
   and obvious).
3. `--muted-foreground` → darken it. `neutral-500` (#737373) on `neutral-100` (#f5f5f5) is 4.6:1 —
   it passes by 0.1 and fails the moment anyone sets it at 12px on white-ish cards.
4. `--ring` → your accent, not `neutral-400`. A gray focus ring is invisible against a gray border.
5. `--destructive` → a red that is *yours*. `red-600` is the most-shipped error color on earth.
6. `--chart-1..5` → see B4.
7. Delete every `--sidebar-*` token if there is no sidebar. See E1.

**Detect.** *Code:* `grep -E '240 10% 3.9%|240 3.8% 46.1%|240 5.9% 90%|0 84.2% 60.2%|--radius: *\.?625rem'`.
*Screenshot:* pick the darkest text and the lightest border with a color picker; if both sit on a
240° hue line, it's the ramp.

---

### B4 · The sequential chart ramp used for categories

**The tell.** shadcn 2026 defines `--chart-1` through `--chart-5` as `blue-300, blue-500, blue-600,
blue-700, blue-800`. That is a **sequential** ramp — one hue, ascending lightness — assigned to
**categorical** series. Five product lines, five shades of the same blue.

**Why AI generates it.** They ship as tokens, so a model that draws a chart names `var(--chart-2)`
and never chooses a hue. The 2024 set was worse in the other direction: `173 58% 39%` (teal),
`12 76% 61%` (orange), `197 37% 24%` (dark cyan), `43 74% 66%` (yellow), `27 87% 67%` (orange) —
five hues with no shared lightness discipline, so the orange at 61% and the yellow at 66% collide.

**Why it reads as generated.** A sequential ramp on categorical data tells the reader there is an
*order* to the categories. There isn't. Adjacent shades (blue-600 vs blue-700) are indistinguishable
in a 4px sparkline and impossible in a pie. It is the single most common data-viz defect in
generated dashboards, and it is invisible to the generator because the chart "renders fine."

**When it is actually fine.** When the data really is ordinal or continuous — a heatmap, a choropleth,
a bucketed histogram, revenue by quintile. Then a single-hue ramp is *correct* and multi-hue is wrong.

**Instead.** For categories, use hues separated in perceptual space and held at similar lightness, so
no series looks more important than another. Check every pair for deuteranopia. Then order the legend
by the data, not by the token number.

**Detect.** *Code:* if `--chart-1..5` resolve to one hue, and the chart is a bar/line/pie with named
categories, it's a hit. *Screenshot:* convert the chart to grayscale — if two series become the same
gray, the palette is broken regardless of what it looks like in color.

---

### B5 · Generic dark mode (1): pure black + saturated accent

**The tell.** Page background at `#000000` or `#0a0a0a`, one high-chroma accent, and no third color.
Measured on COMPUTE: body `#000101`, foreground `#edebe7`, accent `rgb(236,168,214)`. On HR Pulse:
accent `#00ba88` at full chroma against near-black.

**Why AI generates it.** "Dark mode" in the training corpus overwhelmingly means `bg-black` +
`text-white` + one neon. It is also the safest inversion: nothing can look muddy against pure black.

**Why it reads as generated.** Pure black is not a surface, it is an absence — on OLED it is
literally the pixel being off, so any shadow disappears and every edge has to be a border.
Saturated accents on pure black also produce chromatic aberration at the edges of small text on LCDs
(the halo effect), which is why no serious dark theme does it. And a two-color dark theme has no
room for a *third* thing: no way to say "this is disabled," "this is a secondary surface,"
"this is selected."

**When it is actually fine.** Media-first surfaces where the content is the light: a video player, a
photo viewer, a code editor's canvas, a presentation tool. Also fine on OLED-targeted mobile where
battery matters and the UI is genuinely sparse.

**Instead.** Start the ramp above black. Linear, Vercel, Raycast and Railway all use a near-black
that is *not* `#000`, so shadows and rings still read. Then desaturate the accent by 15–25% for dark
mode — the same hex that looks correct on white glows on black.

**Detect.** *Code:* `getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)'`, plus the
accent's oklch chroma > 0.15. *Screenshot:* look at a 12px accent-colored label — if the edges
shimmer, the chroma is too high for the background.

---

### B6 · Generic dark mode (2): a ramp with no perceptible steps

**The tell.** Four or five surface values crammed into the bottom of the lightness range. Measured
on HR Pulse: `#05070b`, `#0c1014`, `#171b1f`, and a border at `#25292e`. Those are L\* 1.97, 4.41,
9.48 and 16.44 — four "levels" inside 15 points of lightness. At 1440×900 you cannot see three of
them; the cards are visible only because of the 1px border.

**Why AI generates it.** The model assigns `bg-background`, `bg-card`, `bg-muted` and
`border-border` from the token set without ever rendering them together and asking whether the steps
are visible. In light mode the same token distances work fine, because human lightness perception is
compressed at the dark end — the model has no way to know that.

**Why it reads as generated.** The page looks flat and slightly dirty. The reader cannot tell what
is a container and what is the page, so every boundary has to be drawn with a line, and the result
is a wireframe with a dark fill.

**When it is actually fine.** Never, as stated. But a *deliberately* two-level dark theme — page and
one surface, with generous separation — is completely fine and often better than four muddy levels.

**Instead.** Use lightness steps of 3–5 L\* at the dark end, and stop at three levels. Concretely:
page `#0e0e10`, raised `#161618`, overlay `#1e1e21`, border `#2a2a2e`. Verify by screenshotting in
grayscale at 100% and checking you can see each boundary without the border.

**Detect.** *Code:* convert every surface background to L\* and check the minimum gap between
adjacent levels. Under 3 is invisible. *Screenshot:* remove borders in devtools. If the layout
disappears, the ramp is doing no work.

---

### B7 · Generic dark mode (3): inverted or absent elevation

**The tell.** Cards are *darker* than the page they sit on, or exactly the same. Measured on HR
Pulse: surfaces at `#05070b` and `#0c1014` on a page area that includes bands at `#171b1f` — the
raised elements are the dark ones.

**Why AI generates it.** In light mode, `--card: white` on `--background: neutral-50` is correct:
the card is lighter, therefore raised. Flipping the tokens for dark mode ("card gets darker, page
gets lighter") preserves the *token relationship* and inverts the *physical* one. The model is
maintaining an invariant it doesn't understand.

**Why it reads as generated.** Elevation is the one thing the eye reads pre-attentively. When a card
recedes, the whole page feels like it is behind glass, and the reader's model of what is clickable
breaks. This is the single most reliable "something is wrong and I can't say what" dark-mode defect.

**When it is actually fine.** Genuinely inset elements: a code block, a text input well, a track
behind a progress bar, a recessed toolbar. Those *should* be darker. The rule is per-element, not
per-theme.

**Instead.** In dark mode, elevation is lightness, not shadow. Raised = lighter. Inset = darker.
Shadow still exists but only as a ring: `box-shadow: 0 0 0 1px rgba(255,255,255,0.08)` reads as an
edge where a drop shadow reads as nothing.

**Detect.** *Code:* for every card, compare its background L\* to its nearest opaque ancestor's. Any
raised surface with a lower L\* is a hit. *Screenshot:* squint. Do the cards come toward you or go
away?

---

### B8 · Color used decoratively rather than semantically

**The tell.** Icon chips, category badges and section markers in four or five unrelated hues with no
key. Measured on the v0 Financial Dashboard: five account rows with icon chips in green, blue,
purple, red and green again — the colors encode nothing (a savings account and a checking account
get different hues; two savings accounts get the same one). On Tasko, the bar chart uses three
greens assigned per-bar with no threshold logic.

**Why AI generates it.** Variety looks designed. A model generating five list items will vary the
accent per item because uniform lists look "flat" in the training corpus, and there is no cost
function on meaninglessness.

**Why it reads as generated.** Color is the most expensive channel in an interface — the eye assigns
meaning to it whether you intended one or not. When the reader tries to decode a palette and finds
no rule, they stop trusting the whole surface. On a financial dashboard this is not a style issue,
it is a credibility issue.

**When it is actually fine.** When the colors *are* the identity: file-type icons, calendar
categories the user assigned, brand logos in an integrations grid, a team's chosen label colors.
There, arbitrary-but-stable is correct.

**Instead.** One accent, used rarely, plus a semantic set (positive / negative / warning /
informational) that never varies. Mercury renders every dollar amount in one color and reserves
green and red exclusively for direction of money. Its entire homepage has **one** gradient element.

**Detect.** *Code:* count distinct hues used on non-brand elements. More than three plus semantics is
a hit. *Screenshot:* ask "what does the purple one mean?" If you can't answer in five words, it means
nothing.

---

### B9 · The accent everywhere

**The tell.** The primary color appears on the CTA, the icon chips, the active nav item, the section
eyebrow, the link underlines, the chart, the badge, and the progress bar. It occupies well over 5%
of the visible surface.

**Why AI generates it.** Applying `text-primary` is how a model expresses "this is important," and
many things are important.

**Why it reads as generated.** An accent works by scarcity. If everything is accented, nothing is,
and the CTA stops being the brightest thing on the page — which is the one job it has.

**When it is actually fine.** When the accent *is* the brand ground rather than an accent — a page
whose background is the brand color, with everything reversed out of it. That is a different system,
and it works, but then you need a second color for emphasis.

**Instead.** Budget it. One primary action per view gets the accent. Everything else gets neutral,
and hierarchy comes from weight and space. Stripe's homepage uses two font weights (400 and 300) and
one family across 2705 elements; the emphasis is entirely structural.

**Detect.** *Screenshot:* desaturate everything except the accent hue. If more than two regions
survive, cut. *Code:* count elements whose `color` or `background-color` resolves to `--primary`.

---

## C · Typography

### C1 · One tracking value, expressed as one em constant

**The tell — the sharpest single measurement in this document.** Divide `letter-spacing` by
`font-size` for every text element. Generated output returns **one number**.

| Page | Sizes | Tracking | Ratio |
|---|---|---|---|
| Optimus | 160px / 60px / 48px | −4px / −1.5px / −1.2px | **−0.025em at all three** |
| COMPUTE | 86.4px / 48px | −2.16px / −1.2px | **−0.025em** |
| AGENTIC | 96px | −2.4px | **−0.025em** |
| Modern SaaS | 64px | −1.28px | −0.02em |
| Hoodie Store | 60px | −3px | −0.05em (`tracking-tighter`) |

That is Tailwind's `--tracking-tight: -.025em`, applied identically at every size.

The controls do not do this:

| Page | Tracking values found |
|---|---|
| Linear | −0.13px ×137, −0.165px ×93, −0.15px ×23, **−0.039px** ×16, −0.182px ×14 |
| Stripe | +0.1px ×52, −0.26px ×38, −0.42px ×33, −0.96px ×21, −0.22px ×20 |
| Mercury | **+0.07px ×261**, +0.24px ×75, +0.42px ×26, +0.48px ×15 |
| Raycast | **+0.1px ×344, +0.2px ×326, +0.3px ×152**, +0.8px, +0.5px |

None of those are round em multiples. They are per-size optical corrections, or a variable font's
own optical-size axis doing the work.

**Why AI generates it.** `tracking-tight` is a token. There is no token for "−0.011em because this
is 21px and 21px needs less correction than 96px."

**Why it reads as generated.** Optical letter-spacing is size-dependent and non-linear: display type
needs negative tracking because the gaps grow with the glyphs; small text needs *positive* tracking
because the gaps close faster than the glyphs shrink. A single em value gets one size right and every
other size progressively wrong — 12px caps end up cramped and 160px display ends up loose.

**When it is actually fine.** On a page with two type sizes. And note: **tight display tracking is
not itself a tell** — Linear's h1 is −1.408px on 64px, which is −0.022em, essentially the same value.
The tell is that it is the *only* value.

**Instead.** Track by size. A workable table: ≥ 72px → −0.03em; 48–71px → −0.022em; 32–47px →
−0.015em; 20–31px → −0.008em; 15–19px → 0; 13–14px → +0.005em; ≤ 12px → +0.01em; uppercase ≤ 12px →
+0.06em. Or use a variable font with an `opsz` axis and let it do this for you — that is what
Mercury's `arcadia` and Linear's `Inter Variable` are doing.

**Detect.** *Code:*
`[...document.querySelectorAll('*')].map(e=>{const s=getComputedStyle(e);return (parseFloat(s.letterSpacing)/parseFloat(s.fontSize)).toFixed(4)})`
— then count distinct values. Fewer than four non-zero ratios, all in
{−0.05, −0.025, 0.025, 0.05, 0.1}, means untouched utilities. *Screenshot:* compare the hero and a
12px label; if the small caps look cramped while the hero looks fine, one value is being reused.

---

### C2 · Font weights that are all multiples of 100

**The tell.** Every `font-weight` on the page is 300, 400, 500, 600, 700 or 800. Measured across
**15 generated templates: zero exceptions.** Measured across the control set:

- Linear: 400, **510**, 500, 300, **590**
- Mercury: 400, **420**, **480**, **360**, 500, **530**
- Figma: 400, **330**, **320**, **540**
- Vercel: 400, 500, **450**

**Why AI generates it.** Tailwind's weight tokens are `--font-weight-light: 300` through
`--font-weight-extrabold: 800`. There is no `font-weight-510` utility, and a model writing
`font-[510]` is writing an arbitrary value, which most style guides (including this library's) tell
it not to do.

**Why it reads as generated.** Variable fonts have a continuous weight axis and typographers use it:
510 exists because 500 was too light against a particular background and 600 was too heavy. A page
where every weight lands on a round hundred was set by someone choosing from a dropdown.

**When it is actually fine.** With a static font family that only ships 400/500/700. Then round
weights are the only weights and the observation is meaningless. This tell only applies when the page
loads a variable font — which most 2026 pages do.

**Instead.** If you have a variable font, use the axis. Set body at 400, UI labels at 450–520, and
display at whatever actually looks right against your background — often 480–560 rather than 600.
Define them as tokens so they are still a system.

**Detect.** *Code:* `[...new Set([...document.querySelectorAll('*')].map(e=>getComputedStyle(e).fontWeight))]`
— all multiples of 100 on a page loading a `-Variable` or `var` font file is a hit. *Screenshot:*
not visible. This is a code-only tell, which is why it survives cleanup passes.

---

### C3 · The oversized generic headline

**The tell.** At 1440px wide, an `<h1>` at 88–160px, `line-height` 0.9–1.0, wrapping to four lines,
occupying most of the fold. Measured: Optimus **160px / lh 144px** (0.9), AGENTIC **96px / lh 96px**
(1.0), COMPUTE **86.4px / lh 79.5px** (0.92), DRIPNEX **128px** centered.

On AGENTIC, the entire 1440×900 fold contains: a floating nav, one four-line sentence, and three
numbers. That is 11 words and 3 figures in 1.3 million pixels.

**Why AI generates it.** Big type is the cheapest way to signal confidence, it fills the fold without
requiring content, and `text-7xl`/`text-8xl` are one token away. Tailwind's `--text-7xl: 4.5rem`
with `line-height: 1` makes the 0.9–1.0 leading automatic.

**Why it reads as generated.** Display type at 0.9 leading is a poster technique, and posters have
one line of text. At four lines it becomes a wall: the lines collide, the descenders of line 1 crowd
the caps of line 2, and the reader has to work. It also means the page's information density in the
fold is near zero, which is the actual problem — the size is a symptom of having nothing else to put
there.

**When it is actually fine.** A short headline. Three to six words at 96–128px on one or two lines is
a strong, legitimate move. Linear's h1 is 64px at 1440 and wraps to two lines. The rule is
**inversely proportional**: the longer the headline, the smaller it must be.

**Instead.** Cap the fold headline at two lines. If the sentence needs four lines, it is a subhead,
not a headline — cut it to six words and put the rest at 18–20px below. Then use the recovered space
for something real: Linear puts a live issue view there; Stripe puts a payment component; Mercury
puts a commissioned illustration.

**Detect.** *Code:* `h1` computed `font-size` ≥ 88px at a 1440 viewport, combined with
`getBoundingClientRect().height / lineHeight ≥ 3`. *Screenshot:* count the lines in the headline. Four
or more is a hit.

---

### C4 · The italic serif accent word

**The tell.** One word inside a sans-serif headline set in an italic serif or a script. This is a
**new 2026 tell** and it is spreading fast inside the shadcn ecosystem specifically. Measured live:

- `tweakcn.com`: "Design Your ***Perfect*** shadcn/ui Theme" — italic serif on "Perfect".
- `21st.dev`: "The ***living*** library of interfaces" — italic serif, in blue, on "living".
- Lovable IWD portfolio: "9 Apps Built with ***Lovable***" — italic script on the last word. Its
  computed families are `Lato` ×205, `Outfit` ×91 and **`Playfair Display` ×3** — three elements of
  serif on a 316-element page, which is the entire pattern in one measurement.

**Why AI generates it.** It became the highest-frequency "premium headline" pattern in 2025–26
template data, and it is a two-element change: wrap one word, swap the family. It reads as
"editorial" without requiring any editorial judgment.

**Why it reads as generated.** The emphasized word is almost never the important one. In all three
examples above the italic falls on an adjective ("Perfect", "living") or on the company's own name,
not on the noun that carries the claim. A designer reads the mismatch between the visual emphasis
and the semantic emphasis immediately.

**When it is actually fine.** When the contrast is doing work: a genuine editorial voice, a
publication, a page where the serif is part of the brand pair and appears elsewhere too. And when
the italicized word is the one you'd stress reading it aloud.

**Instead.** Read the headline out loud. Emphasize the word you actually stressed, and do it with
weight or color rather than a second family. If you want two families, earn it by using the second
one for a real purpose elsewhere — Linear pairs `Inter Variable` with `Berkeley Mono` and the mono
appears on 308 elements, all of them code or identifiers.

**Detect.** *Code:* an `<em>` or `<span>` inside `h1`/`h2` whose computed `font-family` differs from
its parent's and whose `font-style` is `italic`. *Screenshot:* one word in a different typeface.

---

### C5 · The letter-spaced hero word

**The tell.** One word in the hero rendered with huge positive tracking so it reads as
`s c a l e`. Measured on Optimus: the h1's `innerText` is literally `The platform to b u i l d`
(and, on an earlier load, `The platform to s c a l e` — the word rotates). DRIPNEX sets its 128px
wordmark at **+6.4px** (0.05em).

**Why AI generates it.** It is a "swiss/editorial" trope with strong representation in
award-site training data, and it is trivially achievable.

**Why it reads as generated.** Letter-spacing a lowercase word breaks its bouma — the shape readers
recognize — so the word must be read letter by letter. That is fine for a two-letter logo and hostile
for the operative verb in your value proposition. It also confuses screen readers and search
snippets. And because Optimus rotates the word, the tracking makes the *changing* element the hardest
one to read.

**When it is actually fine.** All-caps wordmarks and short labels, where there is no bouma to break
and the tracking is correcting the naturally tight caps fit. `A G E N T I C` in a nav is defensible;
`s c a l e` in a sentence is not.

**Instead.** If you want the word to feel special, change its weight or set it in the accent color.
If you want editorial texture, letter-space a small caps eyebrow at +0.06em, not the headline.

**Detect.** *Code:* `letter-spacing` > 0.04em on an element with `font-size` > 48px and lowercase
content. *Screenshot:* obvious — but check whether it's the h1 or a wordmark.

---

### C6 · The mono eyebrow with an em-rule

**The tell.** Above the headline: a short horizontal rule, then a line of monospace text at 12–14px,
tracking-widest, in a muted color. Measured verbatim:

- Optimus: `—— The platform for modern teams`
- COMPUTE: `—— Autonomous AI agents for distributed computing`
- MSP Summit (Lovable): `> october_14-16_2026 · virtual · free_` with a blinking `_` cursor

Two of those are different v0 templates by different authors with the same rule + mono + muted
recipe and the same 28px height.

**Why AI generates it.** It is the canonical "technical product" signifier: monospace means
developers, the rule means editorial, the muted color means restraint. Three signals for one line of
markup.

**Why it reads as generated.** Monospace is a *semantic* typeface — it means "this is code, or data,
or something where character alignment matters." Using it for marketing prose is costume. And when
the same eyebrow structure appears on two unrelated products, it stops signalling anything.

**When it is actually fine.** When the string genuinely is machine-shaped: a version number, a
timestamp, a commit hash, an ID, a terminal command. MSP Summit's `october_14-16_2026 · virtual ·
free_` is a borderline case that mostly works, because the underscores and the cursor are doing a
deliberate terminal bit and the content is a real date.

**Instead.** Set the eyebrow in your UI family at 13–14px, weight 500, in the accent or a muted
foreground, with +0.02em tracking. If you want texture, use a rule *or* the mono, not both. Reserve
the mono for actual identifiers — Linear's `Berkeley Mono` appears 308 times and every instance is an
issue key or a code fragment.

**Detect.** *Code:* a monospace `font-family` on a text element that is a sibling of `h1` and
contains no digits, brackets or slashes. *Screenshot:* a short line of typewriter text above the
headline, usually with a dash.

---

### C7 · `tracking-widest` uppercase labels everywhere

**The tell.** Every section label, every table header, every stat caption is 10–11px, uppercase, with
+0.1em tracking. Measured on a Lovable page: **+1.98px ×36, +2.2px ×19, +2.64px ×10, +2px ×7** — 72
elements carrying wide-tracked caps. On HR Pulse: `CURRENT LIMITATIONS`, `RECOMMENDED NEXT STEPS`,
and every card eyebrow.

**Why AI generates it.** `text-xs uppercase tracking-widest text-muted-foreground` is the highest-
frequency "section label" in the corpus. It is four tokens and it always looks tidy.

**Why it reads as generated.** All-caps is slow to read — no ascenders or descenders to give the word
a shape — and at 10px it is also low-contrast by construction. When every label in the interface is
in the hardest-to-read style available, the labels stop being scannable, which is the only reason
labels exist. It also produces a uniform gray texture: from three feet away, every label band on the
page looks identical.

**When it is actually fine.** As a *rare* structural marker: one or two per screen, marking major
divisions. Raycast tracks its small caps at +0.1/+0.2/+0.3px and uses them sparingly. Also fine for
genuinely abbreviated content: `USD`, `API`, `SOC 2`.

**Instead.** Sentence case at 12–13px, weight 500, muted color, +0.01em. It reads faster, it takes
less width, and it leaves uppercase available for the two places you actually want emphasis.

**Detect.** *Code:* count elements with `text-transform: uppercase` and `letter-spacing` ≥ 0.08em.
More than ~8 on a page is a hit. *Screenshot:* squint — a page of wide-tracked caps produces evenly
spaced gray dashes.

---

### C8 · Inter, Geist, and the four substitutes

**The tell.** The page loads Inter, Geist, Instrument Sans, Plus Jakarta Sans, Outfit, Poppins — or
nothing at all, computing to `ui-sans-serif` (measured on Tasko: **454 of 456 elements** in
`ui-sans-serif`, i.e. no typeface was chosen). Two v0 templates by different authors both shipped
**Instrument Sans + JetBrains Mono**.

**Why AI generates it.** These are free, self-host easily, are the defaults of `next/font`, and carry
zero licensing risk. Geist ships with every Vercel starter; Inter is the most-referenced UI face in
the corpus.

**Why it reads as generated.** Not because Inter is bad — Linear ships `Inter Variable` on 4359
elements and looks superb. It reads as generated when it is the *only* decision: default family,
default weights, default tracking, default features. Inter with `cv11`, `ss01` and `tnum` turned on
is a different typeface from Inter out of the box, and turning them on costs zero bytes.

**When it is actually fine.** Almost always. Typeface is the most expensive thing to change and the
least diagnostic thing on this list. An internal tool in Inter is correct.

**Instead — four routes, cheapest first.**
1. **Turn on the features you already have.** `font-feature-settings: "cv11", "ss01"` (Inter's
   single-storey `a` and alternate `l`) plus `"tnum"` on every number. 0 bytes.
2. **Split UI and display within one family.** Body at 400/16, display at weight 500–560 with an
   optical-size axis and tighter tracking.
3. **Swap the display face only.** One weight of a distinctive face, ~30–60KB, applied to h1/h2 only.
4. **Use the system stack on purpose,** as a stated position. Basecamp does something adjacent and it
   reads as confidence, not laziness.

The controls all did something: Stripe commissioned `sohne-var` and uses it for **all 2705
elements**. Mercury runs `arcadia` + `arcadiaDisplay`. Ramp runs `TWK Lausanne`. Raycast pairs `Inter`
with `SF Pro Text` and `GeistMono`.

**Detect.** *Code:* `getComputedStyle(document.body).fontFamily` — if the first token is
`ui-sans-serif` or `system-ui` while the page loads webfonts elsewhere, nothing was decided.
*Screenshot:* not reliably visible, and that is the point. Do not spend your first hour here.

---

### C9 · The announcement pill above the headline

**The tell.** A small centered pill directly above the `<h1>`: 28–36px tall, `rounded-full`, muted
background or a hairline border, 12–14px text, usually a leading emoji or a tiny icon and a trailing
`→` / `›`. Measured verbatim on the pages agents learn from:

| Page | The pill |
|---|---|
| `magicui.design` hero | `🎉  \|  Introducing Floating 3D Particles  ›` |
| `magicui.design` top bar | `✨ Introducing Magic UI Pro - 50+ blocks and templates to build beautiful landing pages in minutes ›` |
| `ui.shadcn.com/blocks` | `New Questionnaire component →` — 28px pill, muted fill, no border |
| `ui.aceternity.com` | `📒 Changelog \| 80+ new blocks →` |
| Lovable IWD portfolio | `🍵 MATCHA × STRAWBERRY × FOREST 🍓` |
| v0 DRIPNEX | `NEW COLLECTION` |

Its measured height on the v0 and shadcn pages is 20–28px, and it is `text-align: center` in every
instance.

**Why AI generates it.** It is the highest-frequency element immediately preceding an `<h1>` in the
training corpus, it fills the vertical gap between the nav and the headline, and it makes a page look
like a product that ships things. It is also self-contained — one `<div>`, five utility classes, no
layout risk.

**Why it reads as generated.** The pill is a *changelog* device: it exists to say "something new
happened, here is the link." On a generated page it announces the page's own subject, so it links
nowhere and reports nothing. It also front-loads the fold with the least important information on
the screen, and the trailing arrow promises a destination that in most generated output does not
exist. A designer reads a link-shaped thing that isn't a link.

**When it is actually fine.** When it is genuinely news, genuinely dated, and genuinely clickable.
Vercel's homepage carries `Ship 26 is coming to SF` — a real event with a real date and a real
destination. That is the pattern working. Changelog links on developer tools are a legitimate,
useful convention.

**Instead.** If you have news, put it in a top bar above the nav where announcements live, with a
date and a working link, and remove it when it stops being news. If you don't have news, delete the
pill and start the page with the headline — Linear, Stripe, Mercury, Ramp, Figma and Basecamp all
open directly on the h1. The 32px you recover is 32px of headline.

**Detect.** *Code:* an element immediately preceding (or preceding the wrapper of) `h1`, with
`border-radius` ≥ 999px, `height` < 40px, `text-align: center`, and either no `href` or an `href` of
`#`. *Screenshot:* a small lozenge centered above the headline with an arrow at its right end. Then
click it.

---

## D · Layout & composition

### D1 · Everything in cards

**The tell.** Every group of content is a bordered, rounded, padded box. Measured: `ui.shadcn.com`'s
own dashboard example puts four stats in four cards; the v0 Financial Dashboard has 8 surfaces on a
457-element page; Lovable's app-gallery has **30 identical cards in a 3-column grid, gap 24px**, each
with the same title, the same thumbnail aspect and the same two buttons (`Live` / `Code`).

**Why AI generates it.** `<Card>` is the safest container in every component library. It never
overflows, never collides, always looks intentional, and requires no decision about how the content
relates to its neighbours. It is the visual equivalent of wrapping every statement in a try/catch.

**Why it reads as generated.** A card is a claim: "this is a discrete, independently actionable
object." When four related numbers each get a card, you have told the reader they are four unrelated
things — so they compare them by moving their eyes across four borders instead of down one column.
Cards also cost ~32px of padding and 1px of border each; a 4-card stat row spends 260px of horizontal
space on chrome.

**When it is actually fine.** When the object really is independently actionable and independently
addressable: a message in an inbox, a repository in a list, a file, a purchasable item, a deployment.
The test: **could this thing have its own URL?** If yes, a card is right.

**Instead — four replacements, by content shape.**
- **Numbers that are a set** → a stat strip: numbers on one baseline, labels beneath, hairline
  dividers between. No borders, no padding, no shadows.
- **Items that are many and comparable** → a divided list: 1px `border-bottom`, 8–12px row padding,
  hover as a 4% overlay. Linear's issue list, Stripe's payments table.
- **Sections of a page** → a background shift, not a box. One section on `neutral-50` and the rest on
  white gives you the same separation for zero chrome.
- **A single idea** → nothing. Just the content, with space around it.

**Detect.** *Code:* count elements with `border-radius` ≥ 4px AND (a border OR a background) AND
width ≥ 80px. Compare to the number of distinct ideas on the page. *Screenshot:* count the rounded
rectangles. If there are more rectangles than ideas, de-card.

---

### D2 · Nested cards (a dashboard tell, not a landing-page tell)

**The tell.** A card inside a card inside a card, each with the same border, the same radius and the
same background. Measured surface-depth histograms (depth 0 = top-level surface):

| Page | Depth 0 | Depth 1 | Depth 2 |
|---|---|---|---|
| v0 Financial Dashboard | 3 | **5** | 0 |
| v0 UXBooster | 1 | **9** | 1 |
| v0 AGENTIC (landing) | 26 | 6 | 1 |
| v0 HR Pulse | 34 | **0** | 0 |
| Lovable app-gallery | 30 | **0** | 0 |

**Contrarian result:** in this sample the AI *landing pages* were flatter than the controls. Linear's
histogram is `{0:16, 1:18, 2:19, 3:2}` and Raycast's is `{0:228, 1:6, 2:90, 3:2}` — both nest more
deeply than any generated landing page I measured. **Nesting depth alone is not the tell.** The tell
is nesting *without differentiation*: on UXBooster, the outer app frame, the panel and the inner card
all have the same radius family, the same 1px border and the same white fill, so the boundaries
stack into a set of concentric outlines and the eye cannot find the content. Raycast nests three deep
and gives each level a different material — a ring at the outside, the keycap shadow inside.

**Why AI generates it.** Components compose, so `<Card><CardContent><Card>` is syntactically natural.
The model never renders the composition and asks whether the second border earned its pixels.

**Why it reads as generated.** Two concentric rounded rectangles with different radii produce a
visibly non-parallel gap at the corners — the "off-radius" effect that makes a UI look slightly
melted. And each nesting level costs padding twice.

**When it is actually fine.** When the inner surface is a *different material*: a code block inside a
doc card, an image inside a post, an input well inside a form panel, an embedded preview. Then the
inner element should look different — inset rather than raised, no border but a darker fill.

**Instead.** One surface per hierarchy level, and change *what kind of surface* rather than repeating
the same one. If you must nest, the correct inner radius is `outer − padding`, and if that computes
below 4px, use 0 instead. Or: drop the inner border and use a background shift.

**Detect.** *Code:* for each surface, walk ancestors and count surfaces. Any depth ≥ 1 where the
child's radius, border-color and background all match the parent's is a hit. *Screenshot:* look at a
corner. Two arcs, 12–16px apart, running not-quite-parallel.

---

### D3 · One content width on every section

**The tell.** Every section wraps its content in the same `max-width`. Measured:

| Generated | Inner max-widths |
|---|---|
| Optimus | **1400px ×11**, 576px ×3, 768px ×2 |
| COMPUTE | **1400px ×14**, 448px ×3, 512px ×2 |
| AGENTIC | **1152px ×9**, 768px ×2, 384px ×2 |
| MSP Summit (Lovable) | **1360px ×10** |

| Control | Inner max-widths |
|---|---|
| Stripe | **400px ×26**, 1266px ×13, **817.778px ×8** |
| Linear | 1436px ×9, 250px ×6, **541.566px ×4** |
| GOV.UK | **640px ×16**, 960px ×9, 720px ×1 |
| Railway | 1160px ×9, plus 20px ×28 / 16px ×20 |

Note the fractional values. `817.778px` and `541.566px` are not tokens — they are what a grid
computed. A page whose widths are all round numbers had its widths typed, not derived.

**Why AI generates it.** `max-w-7xl mx-auto` is the container idiom, repeated per section, because
each section is generated independently and the container is the safe wrapper.

**Why it reads as generated.** Reading measure is content-dependent. Prose wants 60–75 characters;
a 4-column card grid wants 1100–1300px; a stat strip wants the full bleed; a quote wants 450px. When
everything is 1400px, the prose runs to 140 characters and the quote floats in a lake. The page has
one rhythm because it has one width.

**When it is actually fine.** Documentation, where a single measure is a feature and the sidebar
provides the variation. Also fine in an app shell where the content area is fixed by the chrome.

**Instead.** Three widths minimum, chosen by content: a prose measure (~640–680px), a grid measure
(~1120–1200px), and full-bleed for at least one moment. GOV.UK's 640/960/720 is the whole system and
it is enough. Then let at least one section break the pattern entirely.

**Detect.** *Code:* histogram of computed `max-width` in px. One value with a count over ~8, and
every value round, is a hit. *Screenshot:* draw two vertical lines down the page at the content
edges. If they never move, that's it.

---

### D4 · One vertical padding on every section

**The tell.** Measured section `padding-top` histograms:

- Optimus: `128px` ×8 of 13 sections, `160px` ×2, `0` ×3
- COMPUTE: `160px` ×5, `128px` ×4, `0` ×4
- AGENTIC: `128px` ×9 of 12
- Stripe: `0` on all 14 — the padding lives on inner elements and varies per section
- GOV.UK: `0` ×3, `20px`, `15px`, `40px` — four different values on six sections

**Why AI generates it.** `py-32` is one token, it is the modal value in the corpus, and applying it
uniformly guarantees no section looks cramped.

**Why it reads as generated.** Vertical rhythm is how a page says what matters. When every section
gets 128px above and below, every section is equally important, which means the page has no argument
— just a list. Scroll it and you feel a metronome. This is the **most reliable second-order tell**
and the one that survives every surface cleanup.

**When it is actually fine.** A documentation index, a changelog, a legal page — anywhere the
sections genuinely are peers and the reader is scanning for one of them.

**Instead.** Decide which two sections matter, give them 1.5–2× the space, and compress the rest.
Then break the rhythm once: put two sections flush against each other with no gap at all, so the pair
reads as one argument. Vary top and bottom padding independently — a section that ends a thought
wants more space below than above.

**Detect.** *Code:* histogram of section `padding-top`. A single value on more than half the sections
is a hit. *Screenshot:* take a full-page capture, scale it to 200px wide, and look at the bands. Even
stripes = no rhythm.

---

### D5 · Centered everything

**The tell.** Headline centered, subhead centered, buttons centered, badges centered, section
headings centered, three feature cards each with centered icon/title/body. Measured `text-align:
center` element counts: UXBooster **99 of 283 (35%)**, Lovable app-gallery **287 of 520 (55%)**,
Lovable IWD **88 of 316**, COMPUTE 53, Optimus 54.

**Why AI generates it.** Centering is the safe default for a block whose surrounding content is
unknown. Every hero in the corpus is centered. It never produces a broken layout.

**Why it reads as generated.** Centered text has no consistent left edge, so the eye has to re-find
the start of every line — which is why body copy is never centered in anything designed to be read.
Centered *layout* also removes the possibility of asymmetry, which is where visual interest lives. A
fully centered page is a page where no decision about emphasis was made, because centering is what
you do when everything is equally important.

**When it is actually fine.** A short hero (headline + one line + one button), an empty state, a
confirmation screen, a modal, a 404, a pricing table's tier headers, a login form. All of these have
one focal object and no reading sequence.

**Instead.** Left-align everything with more than two lines. Center the hero if you like — Stripe
does not, Linear does not, Mercury does not — but the moment there is a second column, a list, or a
paragraph, go left. And use the asymmetry: a left-aligned hero with content in the right half is the
single strongest fix for the empty-fold problem (A6).

**Detect.** *Code:* `document.querySelectorAll('*')` filtered on `textAlign === 'center'`, divided by
total. Over ~20% is a hit. *Screenshot:* fold the page down the middle. If both halves are the same,
that's the tell.

---

### D6 · Three identical feature cards

**The tell.** A 3-column grid, three children, each: a 40–48px icon in a tinted rounded square, an
h3, and exactly two lines of body copy. Measured grid shapes: `3col/3items/gap32px` (Optimus, IWD),
`3col/3items/gap16px` (UXBooster ×2), `4col/4items/gap8px` ×6 (AGENTIC), `4col/4items/gap12px`
(Tasko, HR Pulse).

**Why AI generates it.** Three is the modal number of features in the corpus, a 3-column grid is
`grid-cols-3`, and generating three parallel objects is trivially easy — the model writes one and
maps it. The two-line body length is an artifact of the model writing to a shape rather than to a
point.

**Why it reads as generated.** Real products do not have three equally important features. Presenting
them as identical siblings tells the reader nothing about which one to care about, and the forced
parallel construction ("Fast · Secure · Scalable") produces copy that says nothing three times.

**When it is actually fine.** When there genuinely are three peers of equal weight — three plans,
three platforms, three integrations, three steps in a sequence. Steps are a good case: they are
ordered, equal in weight, and benefit from parallel structure.

**Instead.** Give the strongest feature a wide row with a real screenshot, and demote the other two
to a compact list beneath it. Or use a divided list with the feature name at 15/500 and the
explanation at 14/400 muted — three rows, no cards, no icons, one third the height. Then spend the
saved space on showing one of them working.

**Detect.** *Code:* a `display: grid` element with 3 equal columns and exactly 3 children, each
containing an `svg` and an `h3`. *Screenshot:* three boxes of equal width with an icon at the top of
each.

---

### D7 · The bento grid as a substitute for hierarchy

**The tell.** A mosaic of 5–7 unequal boxes — one 2×2, two 1×2, three 1×1 — with a uniform gap and a
uniform surface treatment, in which the *size* of each box does not correspond to the *importance* of
its content.

**Why AI generates it.** Bento is the highest-frequency "modern feature section" of 2024–26 and it is
mechanically easy: `col-span-2`, `row-span-2`, done. It also solves the model's ragged-content
problem — boxes of different sizes absorb copy of different lengths without looking broken.

**Why it reads as generated.** Bento works when the sizes *are* the argument: the big cell is the big
idea. Generated bentos assign spans to make the grid tessellate, so a 2×2 cell often holds a
one-sentence feature while a 1×1 holds the actual product. The reader's size-importance heuristic
fires and returns garbage, which registers as "this looks designed but says nothing."

**When it is actually fine.** When you have one dominant thing and several supporting ones, and the
grid expresses exactly that. Apple's product pages, Vercel's feature sections and Raycast's extension
showcase all use bento correctly, because the biggest cell always holds the biggest claim.

**Instead.** Decide the ranking first, then let the grid express it. If everything is equally
important, a bento is the wrong shape — use a list. And vary the *treatment*, not just the size: the
hero cell should have a different background or a real screenshot, not the same card at 2×2.

**Detect.** *Code:* `grid-column: span 2` on a cell whose text content is shorter than a sibling
1×1's. *Screenshot:* rank the cells by size, rank them by importance, compare the orders.

---

### D8 · The landing-page shape applied to application pages

**The tell.** An authenticated screen — settings, an empty project, an admin page — that opens with a
large centered headline, a subhead, and a primary CTA button, as if it were marketing. Measured on
the v0 HR Pulse "app": the page opens with a 30px h1, a marketing subhead ("Case management and
service delivery for HR outsourcing providers…"), a `Take me to Dashboard →` CTA, a feature-card
strip, and *then* the product.

**Why AI generates it.** Landing pages are overwhelmingly the most-represented page type in training
data. When asked for "a dashboard for X," the model produces the shape it knows best and attaches
the app to the bottom of it.

**Why it reads as generated.** A logged-in user does not need to be sold. Every pixel spent
explaining the product to someone already inside it is a pixel not spent on their data. It also
reveals that the artifact is a *demo of an app* rather than an app.

**When it is actually fine.** A genuine first-run experience — an onboarding screen, an empty state
for a brand-new account, a feature-announcement interstitial. Those are marketing surfaces inside a
product and they are supposed to look like it. Once.

**Instead.** An app page opens with the user's data and the primary action. Linear opens on your
issues. Mercury opens on your balance. If the page is empty, the empty state carries the explanation
— at 15–16px, in a 400px column, with the one action that fixes it.

**Detect.** *Code:* an `h1` over 40px inside a route behind auth; or a `<section>` containing an
`<h2>` and a CTA above the first data component. *Screenshot:* is the first thing on the screen the
user's content, or a description of the product?

---

### D9 · The logo cloud

**The tell.** A row of 5–6 company logos, grayscale, at 40–60% opacity, under a line reading "Trusted
by teams at" or "Trusted by 120,000+ founders developers and creators" — the last one measured
verbatim on `ui.aceternity.com`, missing its serial commas, above a stack of six stock-photo avatars
and five gold stars.

**Why AI generates it.** Social proof is a named landing-page section, and the model fills it with
the most recognizable names available — which, having no customers, means invented ones or borrowed
ones.

**Why it reads as generated.** Three failure modes, all visible: (a) the logos are invented
(`Meridian Labs · Flux Systems · Beacon AI · Prism Analytics` — measured verbatim on a v0 template);
(b) the logos are real companies you cannot possibly have as customers; (c) the avatars are
stock-photo faces. Any of the three converts the section from evidence into decoration, and readers
have learned to discount it entirely.

**When it is actually fine.** When the logos are real, you have permission, and the companies are
recognizable to *your* buyer. Vercel's homepage lists Charles Schwab, DoorDash, OpenAI and Polymarket
— verifiable, checkable, and load-bearing.

**Instead.** If you have no logos, use a number you can defend: Basecamp's homepage reads
`91,733 people are working in Basecamp right now!`. If you have no number, use one specific customer
sentence with a real name and a real company. One true thing beats six false ones.

**Detect.** *Code:* `filter: grayscale(1)` plus `opacity` between 0.3 and 0.7 on a row of `<img>` or
`<svg>`. *Screenshot:* can you name three of the companies? Do they plausibly use this product?

---

### D10 · The testimonial trio

**The tell.** Three quotes in three equal cards, each with a circular avatar, a name, a title, and a
company. The quotes are 20–30 words, all the same length, all praising a different attribute
(speed / support / ease), all in the same register.

**Why AI generates it.** "Testimonials" is a canonical section; three is the modal count; the model
generates parallel objects fluently.

**Why it reads as generated.** Real testimonials are ragged. They are different lengths, some are one
line, some are four; some name a specific problem, some ramble. Three quotes of identical length
saying three complementary things is a structure no real feedback ever produces. And the avatars —
almost always the same six stock faces that appear on every template — are the giveaway.

**When it is actually fine.** When they are real quotes from real customers with real names, and you
publish them at whatever length they came in.

**Instead.** Publish one quote, long, with the person's full name, role, company and — if you can —
their photo and a link. Or publish the raw thing: a screenshot of the actual message. Specificity is
the entire mechanism; "it saved us 10 hours a week" from a named ops lead at a named company beats
three anonymous plaudits.

**Detect.** *Code:* three `<blockquote>` or `[class*=testimonial]` in one grid, with body text
lengths within 20% of each other. *Screenshot:* reverse-image-search one avatar.

---

### D11 · The generic pricing table

**The tell.** Three columns. Left = "Starter / Free". Middle = highlighted with `ring-2` or
`scale-105`, badged "Most popular", priced at $29 or $49. Right = "Enterprise / Custom / Contact us".
Each tier lists 5–7 features with `lucide-check` icons — and the check icon is the single most-used
icon in generated output (measured: `check` ×23 on COMPUTE, ×20 on Optimus).

**Why AI generates it.** It is the single most-templated component on the web. The model has seen it
tens of thousands of times, including the psychology (decoy pricing, middle-tier highlight).

**Why it reads as generated.** The prices are invented, the feature lists are generic capability
nouns rather than limits ("Advanced analytics", "Priority support"), and the tiers do not correspond
to anything about the product. A buyer reading it cannot determine which tier they are.

**When it is actually fine.** Genuinely — this is a conventional pattern users *expect*, and
deviating from it costs conversion. A well-executed conventional pricing table scores zero on the
vibecode rubric. The tell is not the shape; it is the fake content inside it.

**Instead.** Keep the three columns. Replace every generic feature with a **limit**: "3 projects",
"10,000 events/month", "2 seats", "30-day history". Limits tell the buyer which tier they are, which
is the only job the table has. Then remove the "Most popular" badge unless it is true.

**Detect.** *Code:* `ring-2` or `scale-105` on the middle child of a 3-column grid; feature list items
that are noun phrases with no numbers. *Screenshot:* read the middle tier's features. Count the
numbers. Zero is a hit.

---

### D12 · FAQ accordion as page filler

**The tell.** Six collapsed questions at the bottom of the page, below the final CTA, answering
things nobody asked: "What is X?", "How does it work?", "Is my data secure?", "Can I cancel
anytime?". Measured on DRIPNEX: an h2 reading `FREQUENTLY ASKED QUESTIONS` with a real accordion,
sitting between `FEATURED PRODUCTS` and `JOIN THE MOVEMENT`.

**Why AI generates it.** "FAQ" is a canonical landing-page section and it is the cheapest way to add
600px of page height. The questions are generated by inverting the feature list.

**Why it reads as generated.** The questions are not questions anyone asked; they are the feature
list rephrased with a question mark. Collapsing them means the answers are invisible, so the section
adds height and no information — which is precisely what it was generated to do. It also usually sits
*after* the final CTA, so the page's last impression is a wall of chevrons.

**When it is actually fine.** When the questions come from real support tickets or sales calls, and
when the answers contain things you'd rather not put in the main copy — pricing edge cases, data
residency, migration paths, cancellation terms. Then it is a genuine objection-handling surface and
it belongs above the last CTA.

**Instead.** Answer the three real objections inline, in prose, where they arise. If you keep an
accordion, open the first item by default and make sure at least one answer contains a number or a
policy the reader could not have guessed.

**Detect.** *Code:* an accordion (`[data-state]`, `<details>`, `[class*=accordion]`) placed after the
last CTA in DOM order. *Screenshot:* read the questions. Would a real user type that sentence?

---

## E · Library fingerprints

### E1 · Dead tokens for components the page does not contain

**The tell.** `:root` declares tokens for components that do not exist on the page. Measured on the
v0 Financial Dashboard: eight `--sidebar-*` tokens and five `--chart-1..5` tokens on a page whose
only "chart" is a set of progress bars. This library's earlier sampling found seven `--sidebar-*`
tokens on a v0 *marketing* page with no sidebar, and **33** `:root` properties on the untouched
shadcn/Tailwind v4 starter — including `--sidebar-ring` and `--chart-1..5` (`vibecode-rubric.md`
§6.3).

The same page shipped `--accent-foreground:` with an **empty value** — a broken token, live.

**Why AI generates it.** The token block is copied wholesale from the scaffold. Removing unused
tokens requires knowing which components the page ended up using, which is a whole-page analysis the
generator never performs.

**Why it reads as generated.** It is scaffolding left in the frame. Nothing a user sees changes, but
it is the closest thing to a fingerprint in this entire document: a marketing page carrying
`--sidebar-accent-foreground` was generated from a dashboard template and nobody read the CSS.

**When it is actually fine.** In a shared design-token package consumed by many pages — then a page
legitimately imports tokens it doesn't use. The tell applies to tokens declared *in the page's own*
`:root`.

**Instead.** Declare what you use. The controls that ship many tokens ship many *used* tokens: Notion
657, Vercel 567, Ramp 271 — and Stripe ships **zero** custom properties across 2705 elements. Both
ends are fine. The middle — 95–155 tokens of which 40 are dead — is the generated signature.

**Detect.** *Code:*
```bash
# every declared token, minus every referenced one
grep -oE '^\s*--[a-z0-9-]+' src/**/*.css | sed 's/.*--/--/' | sort -u > /tmp/declared
grep -ohrE 'var\(--[a-z0-9-]+' src/ | sed 's/var(//' | sort -u > /tmp/used
comm -23 /tmp/declared /tmp/used
```
Anything printed is dead. *Screenshot:* not visible — which is why this survives the cleanup pass.

---

### E2 · The Tailwind transition signature

**The tell.** `transition-duration: 0.15s`, `transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)`
and — the real tell — `transition-property: all`. Tailwind v4 ships
`--default-transition-duration: 150ms` and `--default-transition-timing-function:
cubic-bezier(.4, 0, .2, 1)`. Measured on generated pages: `0.15s cubic-bezier(0.4,0,0.2,1) all` on 5,
7, 27, 47 and 60 elements; `0.3s cubic-bezier(0.4,0,0.2,1) all` on 47, 65 and 90 elements.

**Why AI generates it.** `transition-all` is one class and covers every property, so nothing is ever
missing an animation. `duration-300` is the modal duration in the corpus.

**Why it reads as generated.** `transition: all` animates properties you did not intend — including
`width`, `height` and `transform` — which produces layout jitter on hover and forces the compositor
to watch every property. And `cubic-bezier(0.4, 0, 0.2, 1)` is symmetric ease-in-out, which is wrong
for UI: things entering under user control should decelerate (ease-out), not accelerate first.

**When it is actually fine.** 150ms ease-in-out on a color-only transition is genuinely fine. Ramp
ships `0.3s cubic-bezier(0.4, 0, 0.2, 1)` on `color, background-color, border` and it is correct —
note that it names the properties.

**Instead.** Name the properties. Use ease-out for things appearing and ease-in for things leaving.
And use more than one duration: Linear runs `0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)` on color
(×216) and other curves elsewhere; Stripe runs `0.3s cubic-bezier(0.25, 1, 0.5, 1)` — an
`easeOutQuint`-family curve — on color and fill; Raycast runs `cubic-bezier(0.23, 1, 0.32, 1)` across
six chained properties with staggered durations (0.4s / 0.2s / 0.2s / 0.2s / 0.4s / 0.4s) on 159
elements.

**Detect.** *Code:* `grep -c 'transition-all'`, and in computed styles count elements with
`transitionProperty === 'all'`. *Screenshot:* not visible. Hover a card and watch for a 1px shift.

---

### E3 · The shadcn keyframe residue

**The tell.** `@keyframes` definitions for components the page does not have. Measured keyframe name
sets on generated pages: `accordion-down`, `accordion-up`, `caret-blink`, `spin`, `pulse`, `enter`,
`exit` — present on pages with no accordion and no caret. Alongside them, the authored ones:
`marquee`, `marquee-reverse`, `line-reveal`, `char-in`, `shimmer`, `fadeInUp`, `slideInUp`,
`barSlideUp`, `pulse-ring`, `float`, `statusPulse`, `rowSlideIn`, `hero-rise`, `hero-fade`,
`gradient-shift`, `orb-hue-rotate`, `orb-orbit-1..4`.

**Optimus and COMPUTE — two different templates by two different authors — ship the identical
keyframe set: `marquee, marquee-reverse, line-reveal, char-in, spin, pulse, enter, exit`.** They also
ship the same two typefaces (Instrument Sans + JetBrains Mono), the same 128/160px section padding,
the same 1400px inner width, and the same eight lucide icons. They are the same page.

**Why AI generates it.** `tw-animate-css` and the shadcn install script add the accordion and caret
keyframes unconditionally. The authored names come from whichever effect library the model reached
for.

**Why it reads as generated.** `caret-blink` on a page with no text input is a receipt.

**When it is actually fine.** In a shared stylesheet consumed by many routes.

**Instead.** Prune the keyframes to the ones you animate, and name your own after what they do
(`row-enter`, `toast-in`), not after the effect (`fadeInUp`).

**Detect.** *Code:* extract `@keyframes` names, extract `animation-name` values from computed styles,
diff. *Screenshot:* not visible.

---

### E4 · The lucide eight

**The tell.** The same eight icons, in the same roles, across unrelated products. Measured icon
inventories:

| Page | Top icons |
|---|---|
| Optimus | `check` ×20, `arrow-right` ×5, `arrow-up-right` ×3, `menu`, `shield`, `lock`, `eye`, `file-check`, `copy` |
| COMPUTE | `check` ×23, `arrow-right` ×5, `arrow-up-right` ×3, `menu`, `shield`, `lock`, `eye`, `file-check`, `zap` |
| HR Pulse | `external-link` ×5, `file-text` ×3, `users` ×3, `calendar` ×3, `book-open` ×3, `bot` ×3, `settings` ×3 |
| Financial Dashboard | `credit-card` ×7, `arrow-up-right` ×6, `wallet` ×5, `arrow-right` ×5, `calendar` ×4 |

`shield` + `lock` + `eye` + `file-check` is the security section of every AI landing page. `check` is
the feature list and the pricing table.

**Why AI generates it.** lucide-react is shadcn's icon dependency; the model picks the most literal
name for each concept (`security` → `shield`, `privacy` → `eye`, `compliance` → `file-check`), and
literal names are shared across products.

**Why it reads as generated.** Icons are a vocabulary. When "security" is always a shield, the icon
stops being information and becomes a bullet. Worse: generated pages routinely mix stroke weights and
metaphor families when the model runs out of lucide names and reaches for an emoji (G8) or an
unnamed inline SVG — measured: Tasko has 10 unnamed SVGs alongside 26 lucide ones.

**When it is actually fine.** Utility icons in an app: `search`, `settings`, `chevron-down`, `x`,
`plus`, `check`. Nobody needs a bespoke close button, and inventing one is worse.

**Instead.** One icon set, one stroke weight, one grid size, everywhere — and for the two or three
concepts that are *your* product's nouns, draw them. Linear draws its own status icons; the
backlog/todo/in-progress/done arcs are a signature no library provides. If you cannot draw, drop the
icon and use a label; a security section with no shield reads more confident, not less.

**Contrarian note on the sparkle.** Conventional wisdom says AI-generated UI is full of sparkle/star
icons. **Across 20 v0 templates I found zero `lucide-sparkles`.** It survives in two places: the
✨ *emoji* in consumer-facing Lovable output (3 `lucide-sparkles` on the IWD portfolio, plus ✨ in
running text), and in the marketing of the effect libraries themselves — `magicui.design`'s
announcement bar opens with `✨ Introducing Magic UI Pro` and its hero badge is `🎉 Introducing
Floating 3D Particles`. If you are auditing 2026 developer-facing output, the sparkle is not where
the tells are.

**Detect.** *Code:* `document.querySelectorAll('svg[class*=lucide]')` and tally the class suffixes.
Cross-check stroke-width consistency. *Screenshot:* look for a shield, a lock and an eye in one row.

---

### E5 · The Lovable badge, and other host watermarks

**The tell.** A published `*.lovable.app` page carries an "Edit with Lovable" badge in the
bottom-right. It is detectable without looking: **exactly 17 elements in `CameraPlainVariable`**, a
`border-radius` pair of `6px 0 0 6px` and `0 6px 6px 0`, and a shadow of
`rgba(0,0,0,0.88) 0 0 0 1px, rgba(0,0,0,0.04) 0 1px 0 0`. I measured that exact signature on **6 of
the 10** Lovable apps sampled — including one whose own body font is `Poppins` ×503, with the badge's
17 elements sitting alongside it. Three others were Lovable's own product surfaces, where
`Camera Plain` is the whole page's typeface (1,329 and 2,616 elements); the single page without it
was a paid summit site on a custom domain.

**Why it exists.** Host attribution on free-tier deployments.

**Why it matters.** It is a hard provenance marker, and it is the most reliable single check in this
document for that platform. Similar markers exist for other hosts — check for a fixed-position
element in a corner with the platform's typeface.

**When it is fine.** On a prototype or a free-tier demo, always. On something you are asking people
to pay for or trust, remove it.

**Instead.** Upgrade the plan or self-host before you ship.

**Detect.** *Code:* look for a font-family that appears on ~15–20 elements and nowhere else in the
design, or `position: fixed; bottom` in the corner with an external link. *Screenshot:* look at the
bottom-right corner.

---

### E6 · The `:focus-visible` count of exactly 24

**The tell.** Count `:focus-visible` rules in the page's stylesheets. Seven different v0 templates by
seven different authors returned **exactly 24** — the Tailwind/shadcn base, plus nothing. The v0
Financial Dashboard returned **0**. Controls: Railway 97, Notion 84, Mercury 56, GOV.UK 53, Ramp 36,
Raycast 25, Figma 11, Linear 7.

**Why AI generates it.** Focus styling is invisible in a screenshot, so nothing in the generation
loop — or in the human's review of the generation — ever surfaces its absence.

**Why it reads as generated.** It is the cleanest available proxy for "was this ever used by a
human?" Anyone who has actually operated the interface has hit Tab and noticed.

**When it is fine.** Never for shipped software. Fine for a throwaway visual mock.

**Instead.** Write focus styles per interactive component type — one for buttons, one for inputs, one
for rows, one for cards — using your accent as the ring color and a 2px offset so the ring reads on
both light and dark surfaces. GOV.UK's 53 rules and its yellow focus block are the reference
implementation.

**Detect.** *Code:*
```js
let n=0; for (const s of document.styleSheets) { try { for (const r of s.cssRules)
  if (r.selectorText?.includes(':focus-visible')) n++ } catch {} } ; n
```
*Screenshot:* press Tab five times and screenshot each stop.

---

## F · Motion

### F1 · An entrance animation on every section

**The tell.** Every block fades and rises into place on scroll. Measured `animation-name` tallies:
Optimus `charReveal` ×110, `devCharReveal` ×70, `lineReveal` ×8, `char-in` ×5, `devLineReveal` ×5;
AGENTIC `fadeInUp` ×5, `statusPulse` ×2, `rowSlideIn`; Tasko `slideInUp` ×12; Lovable groundfloor
`hero-rise` ×4.

**Why AI generates it.** Motion signals polish, an IntersectionObserver + `fadeInUp` is a known
recipe, and applying it to every section is the same amount of code as applying it to one.

**Why it reads as generated.** Motion is attention. If every section animates, nothing is emphasized
and the page becomes slow — the reader waits for content they have already scrolled to. It also
breaks Cmd-F, breaks the browser's find-on-page highlighting, and produces a blank page for anyone
who scrolls fast.

**When it is actually fine.** On the *first* section, once, to establish the page. And on content
that genuinely arrives — a new row in a live table, a streamed message, a toast.

**Instead.** Animate what changes, not what exists. If you want a scroll effect, pick one moment and
make it good. Always honour `prefers-reduced-motion`, and never gate content visibility on the
animation completing — the element should be readable if the JS never runs.

**Detect.** *Code:* count distinct elements with a non-`none` `animation-name` on load; anything over
~10 is a hit. *Screenshot:* capture at t = 0.4s and t = 3s and diff.

---

### F2 · The per-character hero reveal

**The tell.** The headline animates in letter by letter, so for the first several hundred
milliseconds the most important sentence on the page is a blur. **Both Optimus and COMPUTE were
caught mid-reveal in a screenshot taken 4.5 seconds after `domcontentloaded`** — Optimus's hero read
`The platform to scal▓` with the last glyphs blurred, COMPUTE's read `agents that execut▓` with the
letters in mid-hue-rotation. 110 elements on Optimus were running `charReveal` simultaneously.

**Why AI generates it.** Per-char reveal is a flagship effect in the animation libraries the model
reaches for, and it looks impressive in a demo GIF.

**Why it reads as generated.** It optimizes for the *recording* of the page rather than the *use* of
it. A user who lands and reads gets a stuttering wall. It also usually needs each character wrapped
in a `<span>`, which destroys text selection, breaks screen-reader word boundaries, and — as measured
— means an automated screenshot 4.5 seconds in still catches it running.

**When it is actually fine.** A splash/intro screen you show once, a video, a launch page whose whole
purpose is the moment.

**Instead.** Fade the whole line at once over 200–300ms, or don't animate the headline at all. If you
want the "typing" idea, apply it to something that is genuinely being generated — a streamed model
response, a live log.

**Detect.** *Code:* an `h1` whose children are single-character `<span>`s. *Screenshot:* shoot at
500ms and try to read the headline.

---

### F3 · The marquee

**The tell.** An infinite horizontal ticker. Keyframes named `marquee` + `marquee-reverse` (Optimus,
COMPUTE), `marqueeLeft` + `marqueeRight` (AGENTIC), `marquee-left` + `marquee-right` (MSP Summit) —
almost always **two**, counter-scrolling, stacked.

The failure is visible in a single frame. Optimus's stat marquee reads, within one 1440px viewport:

> `…ys saved on builds NETFLIX` · `98% faster deployment STRIPE` · `300% throughput increase LINEAR` ·
> `6x faster to ship NOTION` · `20 days saved on builds NETFLIX` · `9…`

The same item appears **twice in one viewport**, because the loop is shorter than the screen.

**Why AI generates it.** It fills horizontal space with a small amount of content and it is a
self-contained, well-documented component.

**Why it reads as generated.** Moving text cannot be read at leisure, so a marquee of claims delivers
none of them. And the duplication-in-viewport bug is nearly universal, because it only appears when
you have too few items — which is exactly the situation of a product with no customers.

**When it is actually fine.** A logo strip with 20+ genuinely real logos, moving slowly, with
`prefers-reduced-motion` respected and a pause on hover. Or a live data ticker where the motion means
"this is live."

**Instead.** A static grid. Six logos in a row, full opacity, correctly sized. If you have 30, show
30 in a static grid — it reads as more, not less.

**Detect.** *Code:* `grep -riE 'animate-marquee|@keyframes marquee'`. *Screenshot:* look for the same
string twice in one frame.

---

### F4 · Spotlight, beam and meteor effects

**The tell.** Named effects from the effect libraries: `meteors`, `spotlight`, `border-beam`,
`shine-border`, `aurora`, `background-beams`, `grid-and-dot-backgrounds`, `retro-grid`,
`animated-grid-pattern`, plus `radial-gradient` overlays that follow the cursor.

**Why AI generates it.** Aceternity UI and Magic UI are explicitly built to be pasted into
AI-generated pages — Magic UI's own homepage describes it as the "Perfect companion for shadcn/ui" —
and their components are the top search results for "animated hero section react."

**Why it reads as generated.** These effects are *identical* across every site that uses them,
down to the timing. A designer who has seen `border-beam` twice recognizes the third instance
instantly. They also have no relationship to the product; a meteor shower behind a B2B invoicing tool
is a costume.

**When it is actually fine.** Where the effect *is* the product: a creative-coding tool, a game, a
music visualizer, a launch page for something genuinely spectacular. And in small doses on a
developer-tool page where the audience reads the effect as craft rather than as decoration.

**Instead.** One signature move, drawn from your own domain, used once. Mercury's is a commissioned
surreal illustration. Raycast's is the keycap shadow. Linear's is the status arc. All three are
unownable by anyone else, which is the whole point.

**Detect.** *Code:* `grep -riE 'meteor|spotlight|border-beam|aurora|retro-grid|background-beams'`.
*Screenshot:* if you have seen it on another site this month, cut it.

---

### F5 · One duration, one easing, for the whole page

**The tell.** Every transition on the page is 150ms or 300ms, with `cubic-bezier(0.4, 0, 0.2, 1)`.
Measured across generated pages: those two durations account for essentially every non-zero
transition.

**Why AI generates it.** `duration-150` and `duration-300` are the two tokens the model reaches for;
`ease-in-out` is the Tailwind default.

**Why it reads as generated.** Duration should scale with distance and with the size of the thing
moving. A 4px hover shift and a full-screen modal cannot both be right at 300ms — the hover feels
sluggish and the modal feels abrupt. A page with one duration was never *watched*.

**When it is actually fine.** A page with three transitions.

**Instead.** Three durations: ~100–120ms for color/opacity on small controls, ~200ms for
panels/dropdowns, ~350–450ms for full-screen or long-distance movement. Ease-out for entering,
ease-in for leaving. Linear: `0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)` on color; Raycast: six
properties at 0.2s/0.4s with `cubic-bezier(0.23, 1, 0.32, 1)`.

**Detect.** *Code:* histogram of `transition-duration`. One or two values across the whole page is a
hit. *Screenshot:* not visible — a motion tell, so record instead.

---

### F6 · Scroll-jacking

**The tell.** A `wheel` listener that calls `preventDefault` and moves the page a fixed distance, or
a pinned section that consumes several screens of scroll to advance a horizontal carousel.

**Why AI generates it.** "Scroll-driven storytelling" is a well-represented award-site pattern with
copy-paste implementations.

**Why it reads as generated.** It breaks the one interaction every user has calibrated. Trackpad
momentum stops working, the scrollbar lies about position, Cmd-F jumps to invisible content, and
keyboard `Page Down` desynchronizes from the animation. Users notice within one gesture.

**When it is actually fine.** A deliberate, short, opt-in narrative — a product story that is
genuinely a sequence — where the native scrollbar still reflects true position, `prefers-reduced-
motion` disables it, and keyboard navigation works.

**Instead.** Use CSS scroll-driven animations (`animation-timeline: view()`), which never take
control away. Or use `position: sticky`, which achieves most of the effect natively.

**Detect.** *Code:* `grep -rE "addEventListener\(['\"]wheel"` and check for `preventDefault`; look for
`ScrollTrigger` with `pin: true`. *Screenshot:* not visible — scroll it with a trackpad and a
keyboard.

---

## G · Content & copy

Content is 38% of the vibecode score for a reason: it is the hardest thing to fake, it survives a
screenshot, and it is where the model's priors are least disguised.

### G1 · Invented metrics attributed to real companies

**The tell.** Measured verbatim on the v0 "Optimus" template, in a stat marquee under the hero:

> `98% faster deployment` — **STRIPE** · `300% throughput increase` — **LINEAR** ·
> `6x faster to ship` — **NOTION** · `20 days saved on builds` — **NETFLIX**

Four fabricated numbers attributed to four real companies, on a product that does not exist. AGENTIC
does the unattributed version: `50M+ TASKS · 99.9% UPTIME · 180+ COUNTRIES`. COMPUTE:
`3500+ autonomous agents active · 99.7% distributed uptime · <50ms execution latency`.

**Why AI generates it.** "Social proof" is a landing-page slot, the model fills slots, and the most
plausible-sounding filler for a metric slot is a round improbable number next to a famous logo.

**Why it reads as generated.** `99.9% uptime` is the single most-generated number on the web. `98%
faster` has no baseline. And attributing a metric to Stripe is a factual claim about a third party —
this is not a design flaw, it is a legal and reputational one.

**When it is actually fine.** When the number is real, sourced, and dated, and you have permission to
name the customer.

**Instead.** Use a number only you could know, stated precisely, and let its oddness carry the
credibility. Basecamp: `91,733 people are working in Basecamp right now!`. Vercel names Charles
Schwab, DoorDash, OpenAI and Polymarket without attaching invented percentages to them.

**Detect.** *Code:* `grep -oE '\b(9[0-9]|100)(\.[0-9])?%|[0-9]+x faster|[0-9]+M\+'`. *Screenshot:*
for every number, ask "who measured this, when, against what?"

---

### G2 · Duplicated rows in a list that claims to be data

**The tell.** Measured on the v0 Financial Dashboard's "Recent Transactions" panel, which is labelled
`Recent Activity (23 transactions)` and shows six:

```
Apple Store Purchase   Today, 2:45 PM    -$999.00
Salary Deposit         Today, 9:00 AM    +$4,500.00
Netflix Subscription   Yesterday         -$15.99
Apple Store Purchase   Today, 2:45 PM    -$999.00     ← row 1, verbatim
Supabase Subscription  Yesterday         -$15.99
Vercel Subscription    Yesterday         -$15.99
```

Row 4 is row 1 duplicated, same timestamp. Three different subscriptions cost **exactly** $15.99.

**Why AI generates it.** Generating N plausible rows is expensive and repetitive; a model producing
six rows in one pass loses track of what it already emitted, and the highest-probability continuation
after three rows is one of the first three.

**Why it reads as generated.** A human scanning any list notices a repeat instantly — it is the
strongest "this data is not real" signal available, stronger than any visual defect. On a financial
surface it destroys the credibility of everything else on the page.

**When it is actually fine.** Never in a demo you show anyone. Duplicates in *real* data are fine and
should be rendered honestly.

**Instead.** Write fixture data by hand, from the domain. Vary the amounts to non-round numbers
($15.99, $8.42, $1,204.16), vary the timestamps, vary the row length so the column ragging looks
organic, and include at least one row that is *awkward* — a refund, a failed charge, a name that
overflows. If the header says 23, either show 23 or say "6 of 23."

**Detect.** *Code:* hash each row's text content; any collision is a hit. Also flag more than two
identical amounts in one list. *Screenshot:* read every row. Every one.

---

### G3 · Fake dashboard charts with no referent

**The tell.** Measured on Tasko: a bar chart headed "Project Analytics" with a Y axis of 0/25/50/75/100
(no unit), an X axis of `S M T W T F S`, bars in three arbitrary greens, a legend reading "Weekly
Activity", and a footer reading `Average: 62%  Peak: 92%` — where no bar is at 62 and the tallest is
around 95. Measured on UXBooster: a radar chart whose axes are labelled `1`–`7`, with the key listed
*below* the chart, so reading it requires counting spokes.

**Why AI generates it.** A dashboard needs a chart; a chart needs data; the model has none, so it
emits a shape. The shape renders without error, which is the only feedback the generator gets.

**Why it reads as generated.** A chart is a claim about a quantity. When the axis has no unit, the
legend has no meaning, and the summary contradicts the bars, the reader learns that nothing on the
surface can be trusted. Numbered axis labels with a key elsewhere is the specific defect that makes
a radar chart unreadable — you cannot look at a spoke and know what it is.

**When it is actually fine.** A sparkline with no axis, where the shape is the whole message and a
label states the value. That is a legitimate, information-dense form.

**Instead.** Label the axis with a unit. Put the category name at the end of the line or on the
spoke, not in a numbered key. Make the summary statistic derivable from the visible data. And if you
have no data, show the empty state — an honest empty chart is better than a dishonest full one.

**Detect.** *Code:* a chart with numeric-only axis tick labels and a separate legend. *Screenshot:*
name the unit on the Y axis. If you can't, neither can the user.

---

### G4 · Stale dates from the training cutoff

**The tell.** Measured on the v0 Financial Dashboard, in a section headed **"Upcoming Events"**, on a
page loaded 2026-09-10:

```
Emergency Fund   65%   $15,000 target   Target: Dec 2024
Stock Portfolio  30%   $50,000 target   Target: Jun 2024
Debt Repayment   45%   $25,000 target   Target: Mar 2025
```

Three "upcoming" targets, all in the past, the most recent 18 months ago.

**Why AI generates it.** Dates in generated fixtures cluster around the model's training data. There
is no clock in the generation loop, and "Dec 2024" is a perfectly plausible-looking date.

**Why it reads as generated.** It is the closest thing to a timestamp on the artifact itself. A human
who built this would have noticed that "upcoming" was in the past — nobody read the page.

**When it is actually fine.** Historical data, changelogs, archives, "on this day."

**Instead.** Compute fixture dates relative to now: `now + 14d`, `now - 3d`. If dates are hardcoded,
put a comment with the generation date, and add a test that fails when a future-labelled date goes
past.

**Detect.** *Code:* parse every date-like string and compare to `Date.now()` in the context of its
label. `grep -oE '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) 20[0-9]{2}'` and eyeball the
years. *Screenshot:* read the dates. Are any of them today-ish?

---

### G5 · The AI copy register

**The tell.** Measured verbatim — the complete `<h2>` list of one v0 template (AGENTIC):

> "Everything you need to ship agents."
> "Plug-and-play agents ready to deploy."
> "From idea to running agent in four steps."
> "Connect any tool. Control any system."

And its `<h1>`: "Build & orchestrate AI agents while you sleep."

The register: imperative or gerund opening; abstract capability nouns; a promise with no mechanism; a
period at the end of a fragment; parallel two-clause structure ("Connect any tool. Control any
system."); and never a number, a name, a limit or a caveat.

**Why AI generates it.** It is the mean of every SaaS landing page ever written. It is also
*safe* — it makes no falsifiable claim, so nothing in it can be wrong.

**Why it reads as generated.** Real product copy contains at least one thing the writer had to find
out. "Everything you need to ship agents" could precede any product; "Render UI before
`vehicle_state` sync when minimum required state is present" could not. A reader who has read fifty
of these can identify the register in one line.

**When it is actually fine.** Nowhere on a marketing page. It is *acceptable* in UI microcopy where
genericity is correct — "Save", "Cancel", "Try again".

**Instead — six moves.**
1. Replace every capability noun with the thing it does. Not "advanced analytics" — "see which
   queries got slower this week."
2. Put a number in the first two sentences.
3. Name the object. Not "your data" — "your invoices."
4. Say one thing you *can't* do. Credibility is bought with limits.
5. Cut every sentence that would be true of a competitor.
6. Read it aloud. If you would not say it to a person, delete it.

Linear's hero screenshot contains `DRV-8852 Faster app launch` and `Triage Intelligence added the
labels Performance and iOS · 2min ago`. Mercury's homepage carries `Mercury is a fintech company,
not an FDIC-insured bank. Banking services provided through Choice Financial Group and Column N.A.,
Members FDIC.` Both are specific enough to be checkable.

**Detect.** *Code:* count nouns per headline that could apply to any product. *Screenshot:* replace
your product name with a competitor's. If the page still reads correctly, the copy says nothing.

---

### G6 · The fifteen canned phrases

**The tell.** I searched fifteen stock phrases across the corpus. **Optimus contains seven of them on
one page:** "Everything you need", "Trusted by", "How it works", "Ready to", "no credit card",
"Join thousands", "in minutes". AGENTIC contains five: "Get started", "Built for", "Loved by",
"Join thousands", "in minutes". COMPUTE: four.

The list, for grepping:

```
Everything you need        Get started in minutes      Trusted by
Simple, transparent pricing   Frequently asked questions   How it works
Ready to get started?      No credit card required     Powered by AI
Built for developers       Loved by teams              Join thousands of
Coming soon                Supercharge your            Take your X to the next level
```

Add, for 2026: "agentic", "ship faster", "while you sleep", "plug-and-play", "from idea to
production", "one platform. endless possibilities" (measured on Lovable's own site).

**Why AI generates it.** They are the highest-probability strings for their slots.

**Why it reads as generated.** In this library's earlier sampling, two unrelated v0 templates by
different authors shipped the string "Global by default." verbatim (`vibecode-rubric.md` §6.2). When
two strangers' products contain the identical sentence, neither wrote it.

**When it is actually fine.** "Frequently asked questions" as a literal section heading is fine —
clarity beats cleverness in navigation labels.

**Instead.** For each one, ask what it is standing in for and write that instead. "Get started in
minutes" → "The first deploy takes about 90 seconds."

**Detect.** *Code:* `grep -iF -f phrases.txt`. Two hits is a smell; four is a diagnosis.

---

### G7 · The abstract one-word product name

**The tell.** Measured template names from one v0 category listing: **Optimus · COMPUTE · INTERFACE ·
AGENTIC**. All-caps or title-case, one abstract noun, frequently with a superscript `™`, set in
letter-spaced mono or a geometric sans. Optimus and COMPUTE both render theirs as
`WORDMARK ᵀᴹ` at the top-left.

**Why AI generates it.** Asked to invent a product, the model produces the highest-probability
technology noun. There is no brand brief, no domain check, no trademark search.

**Why it reads as generated.** A real name is constrained by availability, pronounceability, and
somebody's taste. `COMPUTE` is what you get when nothing constrains you. The `™` makes it worse — it
is a claim of ownership over a common noun.

**When it is actually fine.** When it is your actual name, which you actually own.

**Instead.** For fixtures and demos, use a name that is obviously a placeholder *and* specific enough
to feel real — a name with a proper noun in it, or an odd compound. And drop the `™`.

**Detect.** *Code:* the wordmark is a single dictionary word in `text-transform: uppercase` with
`letter-spacing` ≥ 0.1em. *Screenshot:* is the product named after the category it is in?

---

### G8 · Emoji as iconography

**The tell.** Emoji standing in for icons in UI labels. Measured: v0 Tasko `⚡ 🌊 🎨 ⚡ 🔍` (note ⚡
twice); Lovable ai-app-gallery `🧠 💡 🎨 🗄` as category markers; Lovable IWD portfolio's hero badge
reads `🍵 MATCHA × STRAWBERRY × FOREST 🍓` and its subtitle is `✨ International Women's Day 2026 ✨`.
`magicui.design`'s own announcement bar opens with `✨` and its hero badge with `🎉`.

**Why AI generates it.** Emoji are zero-dependency, always available, universally understood by the
model, and require no icon library. In a text-first generation process they are the cheapest possible
visual.

**Why it reads as generated.** Emoji render differently on every platform (your 🧠 is a different
drawing on Windows, Android and macOS), they cannot be recolored or resized to a grid, they carry no
stroke weight, and they sit on a different baseline from the text next to them. Four emoji in a row
are four different illustration styles by four different artists.

**When it is actually fine.** In user-generated content — reactions, statuses, channel names, commit
messages, a Slack-style picker. There, emoji *are* the content. Also fine in genuinely playful
consumer products that commit to it wholesale rather than sprinkling.

**Instead.** One icon set at one stroke weight on one grid. If a category needs a marker and you have
no icon, use a colored dot plus a label — it scales, recolors, and aligns.

**Detect.** *Code:* `grep -P '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]'` over your JSX/templates, and
in the browser match `document.body.innerText` against the same range. *Screenshot:* obvious — but
check the *repeats*, which are the strongest signal.

---

### G9 · Copy from a different product entirely

**The tell.** Measured on the v0 "UXBooster" template — a UX-audit dashboard — an inline notice
reading:

> `QR code for requesting funds is valid for only 1 minute.`

There is no QR code and no funds. Elsewhere on the same page, a project is named `Cascade banking`.

**Why AI generates it.** The model composed the page from remembered fragments of multiple dashboard
templates and did not check that the fragments came from the same product.

**Why it reads as generated.** It is a seam. A human reading their own page top to bottom finds it in
five seconds; its presence proves nobody did.

**When it is actually fine.** Never.

**Instead.** Read every string on the page, out loud, in order. This is the single
highest-value-per-minute review action available and it takes about ninety seconds per screen.

**Detect.** *Code:* extract all visible strings and check each one's domain nouns against the
product's. *Screenshot:* read the small print, the tooltips, the disabled states and the placeholders
— that is where seams hide.

---

### G10 · The model's own caveats rendered as UI

**The tell — a genuinely new 2026 tell.** Measured on the v0 "HR Agent + Toolkit" template. Between
the header and the product, in red, a section headed:

> **CURRENT LIMITATIONS**
> `No Data Persistence` — "Currently running with mock data only. Database integration needed for
> production use with real client information."
> `Offline Not Supported` · `No Authentication` — "Missing user authentication and role-based access
> control." · `Customize for Your Org`

And below it, in the accent color:

> **RECOMMENDED NEXT STEPS** → cards for `Supabase`, `Neon`, `Vercel Blob`

Elsewhere: the `<h1>` carries two badges reading `Opus 4.6` and `GPT-5.4`, and a feature card
advertises "12 boilerplate HR policies ready to customize."

**Why AI generates it.** The model's chat-response conventions — "here's what I built, here are its
limitations, here's what to do next" — leak into the artifact. The generator has no boundary between
"things to tell the user in the transcript" and "things to render in the product."

**Why it reads as generated.** It is the generator's voice, in the product, addressed to the
developer rather than the user. No shipped product tells its users it has no authentication. The
model-name badges are the same class of leak.

**When it is actually fine.** In a scaffold you are handing to a developer as a starting point, where
the caveats *are* the deliverable — but then they belong in the README, not in the JSX.

**Instead.** Caveats go in the commit message, the PR description or the README. If the product
genuinely has a limitation the user must know about (beta, no offline), state it in the product's
voice, in the place where it bites, at the moment it bites.

**Detect.** *Code:* `grep -riE 'current limitations|recommended next steps|mock data|not implemented|for demonstration purposes|note: this'` over your components. *Screenshot:* is there a section that
explains the artifact rather than serving the user?

---

### G11 · Placeholder identity

**The tell.** The fixture strings, still there. Measured live on `ui.shadcn.com`'s featured dashboard
block, September 2026:

```
Acme Inc.        $1,250.00        1,234        45,678        4.5%
+12.5% (twice)   -20%             +4.5%
"Trending up this month" / "Visitors for the last 6 months"   ← under a card titled "Total Revenue"
"Engagement exceed targets"                                    ← subject–verb disagreement
```

Measured on v0 Tasko: an account menu reading `Jessin Sam · jessin@gmail.com` — a personal Gmail
address as the identity of a project-management SaaS; a calendar entry reading
`Meeting with Arc Company · Time : 02.00 pm - 04.00 pm` (space before the colon, periods in the
time); four stat cards where **three carry the identical subtitle "Increased from last month"** and
the fourth reads "On Discuss"; and `Pending Project` in the singular beside three plurals.

Measured on the v0 Financial Dashboard: the brand is `KokonutUI` in the sidebar and `kokonutUI` in
the breadcrumb, four words apart.

**Why AI generates it.** These are the scaffold's own strings, and replacing them requires knowing
what the product is.

**Why it reads as generated.** `Acme Inc.` and `$1,250.00` are recognized instantly by anyone who has
installed shadcn. The subtitle mismatch ("Visitors for the last 6 months" under "Total Revenue") is
the deeper version: the copy was assembled from a template where those two strings were adjacent for
a different reason.

**When it is actually fine.** In a component library's own documentation, which is what
`ui.shadcn.com` is. It is not fine one commit later.

**Instead.** Write fixtures from the domain, once, in a `fixtures.ts`, and make them *interesting*:
one row that is too long, one number that is negative, one name with a diacritic, one status that is
an edge case. Good fixtures are a design tool — they surface layout failures the happy path hides.

**Detect.** *Code:* `grep -rE "Acme|Olivia Martin|1,234|45,678|\\\$1,250|john@example|lorem"`.
*Screenshot:* read every number and every name.

---

## H · States & depth

### H1 · One state per element

**The tell.** Every list has data, every form is empty and valid, every avatar loads, every number
fits, nothing is loading, nothing failed, nothing is disabled, and no list is longer than fits.

**Why AI generates it.** The generator renders one snapshot. States are invisible in a screenshot,
and the prompt was "build a dashboard," not "build a dashboard that handles 0, 1, 10,000 and a 500."

**Why it reads as generated.** It is what makes a page feel like a mockup even when every pixel is
right. A real interface is *shaped* by its states — the empty state determines the container's
minimum height, the error state determines whether there is room for a message, the too-much state
determines truncation. A design that never met those is a picture of software.

**When it is fine.** In a static visual comp explicitly labeled as one.

**Instead.** Every data surface ships five states: **empty** (first-run, with the action that fixes
it), **loading** (skeleton at the real content's dimensions, not a spinner), **error** (what failed
and what to do), **partial** (some data, some failed), and **too-much** (2,000 rows, a 90-character
name, a $1,204,516.22 figure). Design the empty and too-much states *first* — they set the bounds.

**Detect.** *Code:* grep components for `isLoading`, `error`, `.length === 0`. A data component with
none of them has one state. *Screenshot:* set the fixture array to `[]` and re-render. Then set it to
2,000 items with one 200-character string.

---

### H2 · No focus ring, or a default one

**The tell.** `outline: none` with nothing replacing it, or the browser default left in place, or a
`--ring` that is `neutral-400` and therefore invisible against a `neutral-200` border. See E6 for the
counts.

**Why AI generates it.** `focus:outline-none` is in every reset the model has seen, and the
replacement ring is easy to forget because it is invisible in the artifact.

**Why it reads as generated.** Beyond being an accessibility failure, it is proof the interface was
never operated.

**When it is fine.** Never. `:focus-visible` exists precisely so that a good ring costs mouse users
nothing.

**Instead.** One ring per interactive type, using your accent, at 2px with a 2px offset so it reads
on any surface: `outline: 2px solid var(--accent); outline-offset: 2px`. GOV.UK's implementation —
53 `:focus-visible` rules and a black-on-yellow block — is the reference.

**Detect.** *Code:* `grep -rn 'outline-none\|outline: none'` and check each for a replacement.
*Screenshot:* Tab through and capture every stop.

---

### H3 · 12px gray text below AA

**The tell.** Small muted text that fails WCAG AA. Measured failure rates (light pages only, so the
comparison is fair):

| Page | Text elements below AA |
|---|---|
| Lovable IWD portfolio | **20 of 72 — 28%** |
| Lovable MSP Summit | 45 of 317 — 14% |
| v0 UXBooster | 5 of 51 — 10% |
| Stripe | 17 of 420 — 4% |
| Mercury | **1 of 207** |
| GOV.UK | **0 of 79** |
| Railway | **0 of 879** |

The mechanism is usually shadcn's `--muted-foreground: neutral-500` (#737373). On `--muted`
(#f5f5f5) that is 4.6:1 — it passes by 0.1 — and the moment it lands on a white card inside a muted
section, or gets `opacity-80`, or drops to 11px, it fails.

**Why AI generates it.** `text-muted-foreground text-xs` is the de-emphasis idiom, and the model has
no contrast checker in the loop.

**Why it reads as generated.** Not as "generated" so much as "unreviewed" — but the two co-occur, and
it is the fastest automated check available.

**When it is fine.** Genuinely decorative text with an accessible equivalent elsewhere — a watermark,
a repeated label already announced by a heading. Rare.

**Instead.** Pick a muted foreground that clears 4.5:1 against your *lightest* surface, then use it
everywhere. On white, that's about #6b6b6b, not #737373. Never combine `text-muted-foreground` with
`opacity-*`. And set a floor: no text below 12px, ever.

**Detect.** *Code:* the contrast pass in §J below, or `node tools/audit.mjs <url>`. *Screenshot:*
turn the display brightness to 40% and try to read the captions.

---

### H4 · Broken images that render alt text

**The tell.** Measured on the v0 Financial Dashboard: the sidebar brand slot renders the string `Acm`
and the top-right avatar renders `Use` — two broken `<img>` elements showing the clipped alt text of
`Acme` and `User` inside 32px boxes.

**Why AI generates it.** The scaffold references image paths that were never created, and the
generator never loads the page.

**Why it reads as generated.** Three-letter fragments in circles are unmistakable, and they appear in
exactly the spots (brand, avatar) a viewer looks first.

**When it is fine.** Never.

**Instead.** Ship a real placeholder: an initials avatar with a deterministic background derived from
the name, and an inline SVG wordmark. Both work offline and neither can 404.

**Detect.** *Code:* `document.querySelectorAll('img')` filtered on `naturalWidth === 0`.
*Screenshot:* look for truncated words in small boxes.

---

## I · Second-order tells — the ones that survive the cleanup pass

These are what remain after someone changes the radius, kills the gradient and swaps the font. They
are the difference between an interface that stops looking AI-generated and one that starts looking
designed.

### I1 · Uniform vertical rhythm with no emphasis

Covered in D4 with numbers (Optimus `128px` ×8 of 13; AGENTIC ×9 of 12; Stripe `0` ×14 with variation
on inner elements). Stated as a principle: **a page's vertical rhythm is its argument.** Equal
spacing means every section is equally important, which means the page has no thesis. Fix by
choosing the two sections that matter and giving them 1.5–2× the room, then compressing everything
else — and by breaking the rhythm exactly once, hard.

**Detect:** full-page screenshot scaled to 200px wide. Even stripes = no argument.

### I2 · Hierarchy expressed only through size

Generated pages establish importance by making things bigger — 160px headline, 60px stat, 16px body,
12px caption — and by nothing else. Excellent products use four channels at once: size, **weight**,
**color** and **space**. Linear's h1 is only 64px, but it is weight 510 against a page of 400s, at
full foreground against muted, with 128px of air above it. Remove size from Linear and the hierarchy
survives; remove size from a generated page and it goes flat.

**Detect:** screenshot, then set every `font-size` to 16px in devtools. Can you still tell what
matters?

### I3 · No asymmetry anywhere

Everything is centered or evenly split (D5: 35–55% of elements `text-align: center`). Every two-column
section is 50/50. Every grid is 3 or 4 equal columns. Nothing hangs into a margin, nothing bleeds off
an edge, nothing is deliberately off-balance.

Asymmetry is what makes a composition look authored, because symmetry is the state a layout falls
into when nobody decides anything. Fix: one 60/40 split, one element hanging into the left margin,
one full-bleed moment per page. Stripe's inner widths — 400px ×26, 1266px ×13, **817.778px** ×8 —
describe a page that is doing three different things at three different widths.

**Detect:** fold the screenshot down the vertical centerline.

### I4 · Components that don't compose

Each block is individually competent; together they are not a system. The button in the hero is a
pill; the button in the pricing table is `rounded-md`; the button in the footer is a link with an
arrow. The card in the features section has a border and no shadow; the card in the testimonials has
a shadow and no border. Each was generated in its own pass, against its own local notion of "good."

This is the deepest structural tell, because fixing it requires holding the whole page in mind at
once — the thing a component-at-a-time generator cannot do.

**Detect:** extract every button on the page into one image and put them side by side. Then every
card. Then every input. Any variation you cannot justify is drift. (Measured version: histogram
`border-radius` × `padding` for all `<button>`s. More than three combinations is drift.)

### I5 · Correct in a screenshot, empty in the hand

The page is right until you touch it. Hover does nothing or everything. Tab goes nowhere (E6: 24 or
0 focus-visible rules). The search box does not search. The filter chips do not filter. The tabs do
not switch. The sort arrows do not sort. The "View All Transactions" button has no destination. The
theme toggle is present on every generated dashboard I measured, sitting next to controls that do
nothing.

**This is the tell that no screenshot-based review can catch,** which is why so much generated output
passes visual review and fails on contact. It is also the reason this library's procedure insists on
rendering and *operating* the artifact rather than reading its JSX.

**Detect:** click every interactive element once. Count how many do nothing.

### I6 · The theme swap that changes nothing

A page reskinned with a different palette — `tweakcn` ships ready-made ones named "Amethyst Haze",
"Catppuccin", "Kodama Grove", "Quantum Rose", "Elegant Luxury", "Cosmic Night", "Doom 64",
"Perpetuity", "Tangerine", "Bold Tech", "Amber Minimal", "Solar Dusk" — still reads as the same
interface, because **color is not the fingerprint. Geometry is.** The radius scale, the 24px gap, the
128px section padding, the single content width and the `rounded-full` count are all unchanged, so
the page has a new complexion and the same skeleton.

The corollary matters for anyone remediating: **changing the palette is the least effective fix
available.** It is also the most commonly attempted one.

**Detect:** screenshot the page, desaturate it completely, and compare to a desaturated shadcn block.
If they are indistinguishable, the palette was the only change.

### I7 · Scale degeneracy

The measurable core of "spacing was never decided." Two shapes:

- **Collapse:** one value used everywhere. AGENTIC uses `gap: 24px` on **61 elements**; Optimus
  applies `padding: 128px 0` to eight of thirteen sections; COMPUTE has one inner width (`1400px`)
  on fourteen elements.
- **Drift:** several values that should be one. AGENTIC's borders are `oklab(0 0 0 / 0.06)` ×18,
  `/0.07` ×18, `/0.1` ×9, `/0.04` ×6 — 0.06 and 0.07 are the same value, chosen twice.

Compare Linear's gap distribution: `8px` ×95, `4px` ×63, `6px` ×60, `12px` ×18, `2px` ×11 — five
values with a clear ranking, including a 2px used deliberately eleven times. That is a scale in use.

**Detect:** histogram of `gap`, `padding`, `border-color` alpha and `max-width`. A spike with a count
over ~40 is collapse; two adjacent values within 15% of each other is drift.

### I8 · No real content

The deepest one, and the one that subsumes half this document. Every string on the page is a
*category* rather than an *instance*: "Total Revenue" not "MRR from annual plans"; "Recent Activity"
not "Since your last login"; "Project Analytics" not "Deploys per day, last 14 days."

**The cure that outperforms every other fix in this document:** put this product's real content in
it. Its actual domain vocabulary. Its actual primary object, given visual priority. One signature
decision drawn from the domain. An interface built from real content does not read as generated even
when every component in it is conventional — which is exactly why Linear scores a 2 on this library's
rubric while shipping pill nav, dark mode, Inter and a card grid.

**Detect:** for every visible string, ask "is this a class or an instance?" Count the instances. If
the answer is zero, nothing else you fix will matter.

---

## J · The detection kit

### J1 · Fast grep pass

```bash
# shadcn defaults, both generations
grep -rE '240 10% 3\.9%|240 3\.8% 46\.1%|240 5\.9% 90%|0 84\.2% 60\.2%|--radius: *0?\.(5|625)rem' .

# dead tokens for components that don't exist
grep -rE -- '--sidebar-|--chart-[1-5]' . | head

# geometry monoculture
grep -roE 'rounded-(full|2xl|3xl)' . | sort | uniq -c | sort -rn | head

# transition sloppiness
grep -rc 'transition-all' .

# effect-library imports
grep -rE 'meteor|spotlight|border-beam|aurora|retro-grid|background-beams|marquee' .

# placeholder identity
grep -rE 'Acme|Olivia Martin|1,234|45,678|\$1,250|john@example|lorem ipsum' .

# canned phrases
grep -riE 'everything you need|get started in minutes|no credit card|join thousands|trusted by|ready to get started|simple, transparent pricing|plug-and-play|while you sleep' .

# the generator's voice in the product
grep -riE 'current limitations|recommended next steps|mock data|for demonstration purposes|not implemented' .

# focus styles removed without replacement
grep -rn 'outline-none\|outline: none' .

# emoji in UI source
grep -rP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' --include=*.tsx --include=*.jsx .
```

### J2 · Computed-style probe

Run this in the console, or via Playwright. It returns the eight numbers that matter.

```js
(() => {
  const els = [...document.querySelectorAll('body *')];
  const tally = (f) => els.reduce((m, e) => {
    const v = f(getComputedStyle(e), e); if (v == null || v === 'none' || v === '0px') return m;
    m[v] = (m[v] || 0) + 1; return m;
  }, {});
  const top = (o, n = 8) => Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,n);

  // 1. focus-visible rules
  let fv = 0, kf = [];
  for (const s of document.styleSheets) { try { for (const r of s.cssRules) {
    if (r.selectorText?.includes(':focus-visible')) fv++;
    if (r.name && r.cssRules) kf.push(r.name);
  } } catch {} }

  // 2. tracking ÷ size ratios
  const ratios = [...new Set(els.map(e => {
    const s = getComputedStyle(e), ls = parseFloat(s.letterSpacing);
    return isNaN(ls) || !ls ? null : (ls / parseFloat(s.fontSize)).toFixed(4);
  }).filter(Boolean))];

  // 3. gradient text
  const gradText = els.filter(e => {
    const s = getComputedStyle(e);
    return (s.webkitBackgroundClip === 'text' || s.backgroundClip === 'text')
        && s.backgroundImage.includes('gradient');
  }).length;

  // 4. weights
  const weights = [...new Set(els.map(e => getComputedStyle(e).fontWeight))];

  return {
    focusVisibleRules: fv,                       // 24 or 0 → generated. >30 → operated by a human.
    gradientTextElements: gradText,              // >0 → generated. Controls: 0/14.
    trackingRatios: ratios,                      // ≤3 values, all round → untouched utilities.
    weightsAllRound: weights.every(w => +w % 100 === 0),  // true + variable font → generated.
    roundedFull: els.filter(e => parseFloat(getComputedStyle(e).borderRadius) > 1000).length,
    radii: top(tally(s => s.borderRadius)),      // one derived scale → shadcn untouched.
    gaps: top(tally(s => s.gap)),                // one spike >40 → scale collapse.
    maxWidths: top(tally(s => s.maxWidth === 'none' ? null : s.maxWidth)),
    sectionPadTop: top(tally((s, e) => e.tagName === 'SECTION' ? s.paddingTop : null)),
    transitionAll: els.filter(e => getComputedStyle(e).transitionProperty === 'all').length,
    backdropFilter: els.filter(e => getComputedStyle(e).backdropFilter !== 'none').length,
    centeredRatio: (els.filter(e => getComputedStyle(e).textAlign === 'center').length / els.length).toFixed(2),
    keyframes: [...new Set(kf)],                 // accordion-down with no accordion → residue.
    lucide: [...new Set([...document.querySelectorAll('svg[class*=lucide]')]
             .map(s => (s.getAttribute('class').match(/lucide-([a-z-]+)/) || [])[1]))],
    brokenImages: [...document.querySelectorAll('img')].filter(i => i.complete && !i.naturalWidth).length,
  };
})();
```

### J3 · The screenshot pass, in order

1. **Full page at 1440, scaled to 200px wide.** Even stripes → I1/D4.
2. **Fold down the centerline.** Symmetric → D5/I3.
3. **Desaturate completely.** Hierarchy gone → I2. Chart series merge → B4. Headline mushy → B2.
4. **Count the rounded rectangles.** More rectangles than ideas → D1.
5. **Read every string out loud.** → all of G.
6. **Read every date.** → G4.
7. **Read every row of every list.** → G2.
8. **Tab five times, screenshot each stop.** → H2/E6.
9. **Set the data to `[]`, then to 2,000 rows.** → H1.
10. **Click everything once.** → I5.

Steps 5–10 catch more than steps 1–4, and they are the ones nobody does.

---

## K · What is *not* a tell

A corpus that flags everything is useless. Each of these is commonly cited and, on the measurements
here, wrong or badly scoped.

| Commonly said | What the measurement shows |
|---|---|
| "Gradients are an AI tell" | **Raycast: 235 gradient elements. Linear: 62. Stripe: 26.** Gradients are ubiquitous in excellent products. *Gradient text* is the tell (0 of 14 controls). |
| "Dark mode is an AI tell" | Linear, Raycast, Vercel, Railway and Arc all ship dark by default. The tell is pure black + one saturated accent + no elevation (B5–B7). |
| "Inter is an AI tell" | Linear ships Inter Variable on 4,359 elements. The tell is Inter with every default untouched (C8). |
| "Tight display tracking is an AI tell" | Linear's h1 is −0.022em; the generated pages are −0.025em. Nearly identical. The tell is that it is the page's *only* tracking value (C1). |
| "Rounded corners are an AI tell" | Notion 8px ×89, Sentry 8px ×45, Arc 8px ×9. The tell is one derived scale (A1) and `rounded-full` on non-round things (A2). |
| "The sparkle icon means AI" | **Zero `lucide-sparkles` across 20 v0 templates.** It survives as the ✨ emoji in consumer output and in effect-library marketing (E4). |
| "Purple gradients mean AI" | Zero violet-blue hero gradients in 15 v0 templates measured in 2026. Largely extinct in developer-facing output (B1). |
| "Bento grids are an AI tell" | Apple, Vercel and Raycast all ship them correctly. The tell is spans that don't match importance (D7). |
| "Pricing tables with three tiers are generic" | Users expect it and deviating costs conversion. The tell is capability nouns instead of limits (D11). |
| "Cards are an AI tell" | A card is right whenever the object could have its own URL (D1). |
| "Centered heroes are an AI tell" | A short centered hero is fine. The tell is 35–55% of *all* elements centered (D5). |
| "Nested cards are an AI tell" | Linear nests 3 deep; Raycast nests 3 deep. The tell is nesting *without changing the material* (D2). |
| "Too much whitespace" | GOV.UK is extremely airy and scores 0. The tell is airiness plus zero information (C3). |
| "It uses shadcn" | shadcn is a good library. The tell is shipping its defaults as a brand (B3, E1). |

**And the meta-point:** three of the four strongest signals in this document — `:focus-visible` count,
weight granularity, tracking-ratio degeneracy — are **invisible in a screenshot**. Any review process
that only looks at pictures will keep passing generated work. Render it, measure it, and operate it.

---

## L · Provenance

**Measured 2026-09-10** with Playwright (Chromium, 1440×900, dSF 1), reading computed styles,
`:root` custom-property dumps and `CSSStyleSheet.cssRules`. Screenshots were captured at the same
viewport and opened and looked at, not inferred from markup.

- **v0 community templates** were resolved from `v0.app/templates/<id>` to their live preview
  iframes and measured at those URLs. Five of the 20 resolved to v0's sign-in wall and were
  discarded; the 15 usable ones span the dashboards, landing-pages, ai, agents, ecommerce and
  apps categories.
- **Lovable apps** were found by search for published `*.lovable.app` hosts, not from any curated
  gallery, so they represent what users actually ship. 10 measured.
- **Control products** were measured on their public marketing or product pages. Two (height.app,
  tailscale.com) failed to load and are excluded; 14 remain.
- **shadcn defaults** were read live from `ui.shadcn.com`; Tailwind v4 defaults from
  `packages/tailwindcss/theme.css` on `main`.
- Contrast figures compare only light-background pages, because the probe's background-resolution
  walk defaults to white and produces false positives on dark pages. Dark-page contrast numbers are
  deliberately omitted rather than reported wrong.
- Practitioner quotes: Hacker News discussion 48926085 (`crab_galaxy`: "ShadCN and tailwind really
  encourage design drift"; `scoot`: "What you're copying is a thin styling wrapper"), and
  prg.sh, *Why Your AI Keeps Building the Same Purple Gradient Website* ("You're getting the median
  of every Tailwind CSS tutorial scraped from GitHub between 2019 and 2024"; "LLMs are excellent at
  generating code, but they're not designers, they're statistical pattern matchers").

**Companion files.** [`vibecode-rubric.md`](vibecode-rubric.md) scores an artifact 0–10 against
weighted dimensions. [`remedies.md`](remedies.md) has before/after code for the highest-frequency
fixes. [`visual-critique-method.md`](visual-critique-method.md) is the looking procedure.

**Re-measure this file.** The tells move. The violet gradient was decisive in 2023 and is nearly
extinct in 2026; the italic serif accent word (C4) did not exist in 2024 and is now on three of the
shadcn ecosystem's flagship sites; the generator's caveats rendered as UI (G10) is brand new. Run
§J's probe against a fresh sample every six months and delete what has stopped being true.
