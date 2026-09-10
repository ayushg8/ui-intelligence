# The vibecode risk rubric

**A 0–10 instrument for "how obviously did a machine make this."** Run it against a screenshot and
the page's computed CSS. Target **≤2**. Ship gate is **≤3**.

**Evaluated:** 2026-09 · Every number and quoted string below was read out of a live interface with
Playwright (computed styles, `:root` custom properties, stylesheet rule inspection) or off a
1440×900 render at 2×. The calibration set is 14 real interfaces, listed with their scores in
§7. Nothing here is recalled.

**The instrument's job is not to detect novelty.** It detects *absence of decisions*. A boring
interface where every boring choice was made on purpose scores 0. Read §3 before you score
anything, or you will punish restraint and push yourself toward decoration.

---

## 1 — The scale, anchored

Score the whole artifact, then check it against these. A scale without anchors gets a 5 every time.

| Score | What it means | Measured anchors |
|---|---|---|
| **0** | Nothing on the surface could have come from a library default. Every value traces to a decision about *this* product or *this* institution. | **GOV.UK** `/browse/benefits`: zero `border-radius` anywhere on the page, zero decorative shadows, buttons carry a hard `box-shadow: #083D29 0 2px 0 0` depth instead, body is **19px** GDS Transport, 28 `:focus-visible` rules and 135 `:focus` rules. **Stripe API reference**: four font sizes total on a 4,000-element page (14/12/16/24), two families, zero gradients. |
| **2** | Conventional components, entirely conventional layout — and every surface carries this product's real content and vocabulary. | **Linear**: pill nav buttons, dark mode, Inter, a card grid — every "tell" — but the hero screenshot reads `DRV-8852 Faster app launch` / "Render UI before `vehicle_state` sync when minimum required state is present" / `Triage Intelligence added the labels Performance and iOS · 2min ago` / `1 / 84`. **Mercury**: an AI-looking surreal hero image, and under it `Mercury is a fintech company, not an FDIC-insured bank. Banking services provided through Choice Financial Group and Column N.A., Members FDIC.` **Basecamp**: `91,733 people are working in Basecamp right now!`, section head "Tell me if this sounds about right." |
| **4** | Shares most surface traits with generated output, but authorship is demonstrable. Abstract copy, default-adjacent aesthetic, real substance underneath. | **Vercel.com**: headline is two abstract words ("Agentic Infrastructure"), body copy is "For coding agents / To ship apps and agents / Automated by agents", pill CTAs, Geist, black-and-white — *and* 374 `:root` custom properties, a proprietary typeface, verifiable customer logos (Charles Schwab, DoorDash, OpenAI, Polymarket), a real dated event banner ("Ship 26 is coming to SF"). |
| **6** | A coherent, consistent, competently built system whose content is entirely placeholder and whose values are entirely library defaults. Not a lie, an unfinished product. | **TailAdmin demo**: internally consistent, one indigo, correct hierarchy — and three metrics in one row all read `$20K`, the subtitle "Target you've set for each month" appears under two unrelated cards, and the summary line is "You earn $3287 today, it's higher than last month. Keep up your good work!" **shadcn `dashboard-01`**: `Acme Inc.` / `$1,250.00` / `1,234` / `45,678` / `4.5%`, with `+12.5%` on two of the four tiles. |
| **8** | Ambitious surface, zero product. The page is a shape where a product should be. Fabricated evidence. Scaffold left in the CSS. | **v0 "Optimus"**: stat strip reads `98% faster deployment STRIPE · 300% throughput increase LINEAR · 6x faster to ship NOTION · 20 days saved on builds NETFLIX · 98% faster deployment STRIPE` — invented numbers, attributed to real companies, and the first pair repeats inside one viewport. Zero `:focus-visible` rules on the entire page. Its `:root` carries seven `--sidebar-*` tokens on a marketing page with no sidebar. **v0 "Compute"**: same skeleton, different image; logo wall reads `Meridian Labs · Flux Systems · Beacon AI · Prism Analytics`. |
| **10** | The scaffold, shipped. Every value is a framework default and every string is a fixture. | Measured composite of the untouched shadcn/Tailwind v4 starter: exactly **33** `:root` properties including `--sidebar-ring` and `--chart-1..5` on a page with neither; `--radius: .625rem`, `--destructive: #e40014`, `--background:#fff`, `--foreground:#0a0a0a`, `--border:#e5e5e5`, `--ring:#a1a1a1` all unchanged; every transition on the page `150ms cubic-bezier(0.4, 0, 0.2, 1)` with `transition-property: all`; `Acme Inc.` still in the sidebar. |

**Odd numbers are legal.** 1, 3, 5, 7, 9 mean "between these two, closer to the lower one."

**Note on the calibration set:** it tops out at 8. Published v0 templates are curated and
favourited; nobody features the 10. A 10 is what comes out before anyone looks at it, which is
exactly the artifact this rubric exists to catch. Do not read "nothing scored 10" as "10s are rare."

---

## 2 — Weights, and why

Score each dimension 0–10 on its own anchors (§6), then take the weighted mean.

| # | Dimension | Weight | Why this weight |
|---|---|---|---|
| 1 | **Product specificity** | **20** | The single strongest signal and the hardest to fake, because faking it requires knowing the domain. It is also the cheapest to *earn* and the one that moves a human's read the most. Linear and shadcn `dashboard-01` are near-identical as component compositions; `DRV-8852 / vehicle_state` versus `Acme Inc. / $1,250.00` is the entire difference. |
| 2 | **Copy** | **18** | Second-hardest to fake, and it survives a screenshot. Prose is where a model's priors are least disguised: three unrelated v0 templates by three authors independently produced "Everything you need…", and two of them shipped the string **"Global by default."** verbatim. You cannot restyle your way out of this. |
| 3 | **Component defaults & fingerprints** | **13** | Nearly free to check and nearly conclusive, because scaffolds leave dead artifacts — tokens for components the page does not contain. Weighted below copy only because a competent author can strip them in ten minutes without changing anything a user sees. |
| 4 | **States & depth** | **10** | The cure for "looks like a mockup." Generated pages have one state per element. All four v0 pages measured have **zero** `:focus-visible` rules; GOV.UK has 28. |
| 5 | **Layout & rhythm** | **10** | Detects "spacing was never decided." Measurable as scale degeneracy: v0 "Agentic" uses `gap: 24px` on 61 elements and applies `padding: 128px 0` to all nine sections; Linear's gaps are 8px×94, 4px×62, 6px×51, 12px×14, 2px×11. |
| 6 | **Color** | **8** | Real signal (untouched ramps, accent-everywhere) but noisy — many excellent products are also monochrome-plus-one, and the 2023 "purple-blue gradient" tell is mostly extinct. |
| 7 | **Typography** | **8** | Same: real signal in scale *vocabulary*, but the individual values converged. Tight display tracking is now standard everywhere, good and bad. |
| 8 | **Surface treatment** | **6** | Radius, shadow, border, glass. Highly visible, weakly diagnostic in 2026, and fixable in one pass — which is exactly why it should not dominate the score. An agent that optimises radius and ships `Acme Inc.` has done nothing. |
| 9 | **Motion** | **4** | Mostly invisible in a screenshot, and the tells are narrow. Kept because one check is decisive: a single duration and a single easing across the whole page. |
| 10 | **Originality** | **3**, capped | See §3. This dimension is **asymmetric**: it scores 0–6, never higher, so it can nudge a score but never drive one. It exists to credit a genuine signature move, not to demand one. |

Copy + product specificity = **38%**. That is deliberate. Everything else is surface, and surface
is what an agent optimises when it is avoiding the real work.

---

## 3 — The confound: four different diagnoses

Most bad rubrics collapse these. They have different scores and different fixes.

| Diagnosis | Looks like | Score on this rubric | Fix |
|---|---|---|---|
| **Generated** | Library defaults + placeholder content + one state per element + fabricated evidence | **7–10** | §8, top of the ladder |
| **Templated** | One coherent system applied consistently, zero domain fit, all fixture content | **5–6** | Replace content and re-derive density from the real task. The system is fine; it is about someone else's product. |
| **Merely mediocre** | 3.2:1 contrast, a heading smaller than the body, a misaligned column, an unreadable chart | **score it low here, flag it separately** | This is a craft failure, not a generation tell. Route to `visual-critique-method.md` and `system/8-gates.md`. Inflating the vibecode score for it makes the instrument useless as a signal. |
| **Good but conventional** | Every element is standard, and every element is right for this product | **0–2** | Nothing. Ship it. |

Three rules that keep the instrument honest:

**Restraint is never a deduction.** There is no penalty anywhere in §6 for "does not have a
distinctive idea." A login form that looks like a login form is correct — users arrive with
expectations built in other products, and spending them is a cost, not a virtue. GOV.UK scores 0
with no gradient, no radius, no shadow, no illustration and no personality, because every one of
those absences is a decision it can defend.

**Novelty is not a defence.** The v0 pages in §7 are visually *more* adventurous than Linear's —
chromatic-aberration text, iridescent 3D renders, a glassmorphic floating nav — and they score 8.
Ambition applied to nothing is still nothing.

**Deduct only on an observable.** Every point off cites an element, a value or a string you can
paste (§4). "Feels generic" is a zero-point finding. If your only complaint is "this resembles
other products in its category," check whether that is a finding or a preference; the answer is
usually preference.

---

## 4 — Evidence requirement

One line per deduction, in this shape:

```
<DIM> −<points>  <where>  ::  <observed value or literal string>  ::  <what it indicates>
```

Real examples from the calibration run:

```
SPEC −6  hero stat strip  ::  "98% faster deployment STRIPE" appears at x=90 and x=1780  ::  fabricated metric, real company, repeated in one viewport
COPY −4  section h2 ×2    ::  "Global by default."  ::  string is identical in v0-optimus and v0-compute, two unrelated templates
DEFAULT −5  :root         ::  33 props incl. --sidebar-ring, --chart-1..5  ::  shadcn scaffold, page has no sidebar and no chart
STATE −8  stylesheet      ::  0 rules matching /:focus-visible/, 0 matching /:focus\b/  ::  keyboard state never authored
MOTION −4  all transitions ::  duration 0.15s ×50, easing cubic-bezier(0.4,0,0.2,1) ×50, property "all" ×22  ::  Tailwind default, untouched
TYPE −3  headings         ::  30px, 48px, 60px, 160px co-occur  ::  text-3xl/5xl/6xl straight off the default scale
```

Rules:
- **No string, no deduction.** If you cannot paste it, it did not happen.
- **A deduction is per-observation, not per-instance.** Twelve cards with `rounded-lg` is one finding.
- **Deduct from the dimension the evidence belongs to.** Placeholder copy is COPY, not TYPE.
- **A screenshot alone caps you at seven dimensions.** Defaults, states and motion need the CSS.
  Say so in the output rather than guessing them.

---

## 5 — The fast path (60 seconds, 5 questions)

Use this on every UI change. It correlates with the full score to within about ±1.5 across the
calibration set, and it is cheap enough that there is no excuse for skipping it.

| # | Question | Fail if | Points |
|---|---|---|---|
| **1** | **Could this screenshot belong to any other product in this category with only the logo swapped?** | Yes | +3 |
| **2** | **Is there a number, name, ID, unit or label on screen that only this product could produce?** | No | +3 |
| **3** | **Pick the longest sentence. Would a person who works here have written it?** | No | +2 |
| **4** | `grep -c ':focus-visible'` on the page CSS, and: does any element show a second state (hover/selected/loading/empty/error)? | 0 / none | +1 |
| **5** | Does any of these appear verbatim: `Acme`, `Lorem`, `$1,250.00`, `1,234`, `45,678`, `+12.5%`, `John Doe`, `example.com`, `99.9% uptime`, `Everything you need`, `Trending up this month`, `Product Name`, `Your Company`? | Yes | +1 |

Sum = fast score, 0–10. Calibration: GOV.UK 0 · Linear 0 · Mercury 0 · Basecamp 0 · Vercel 3 ·
TailAdmin 6 · shadcn `dashboard-01` 7 · v0 Optimus 8 · v0 Agentic 9.

**Question 1 is the whole rubric compressed.** If the answer is yes, nothing you do to the radius
scale will help.

---

## 6 — The full path: ten dimensions

Each is scored 0–10. **0 = no evidence of generation; 10 = pure scaffold.** Anchors are measured
values from §7's set.

### 6.1 Product specificity · weight 20

*Does this interface contain things only this product could contain?*

| Score | Anchor |
|---|---|
| **0** | Screen contains identifiers, units, vocabulary or obligations from the domain that no generator would invent. Stripe's API reference shows `ch_3MmlLrLkdIwHu7ix0snN0B15` and "The minimum amount is $0.50 US or equivalent in charge currency"; its version selector reads `2026-08-26.dahlia`. Mercury's hero carries a superscript-1 footnote and a bank-partner disclaimer naming Choice Financial Group and Column N.A. |
| **2** | Real content, real object model, real workflow language. Linear's nav includes `Now` — an item no template ships. Mercury's product menu: `Treasury by Mercury Advisory`, `Venture Debt`, `Earn up to 3.89% yield`, verticals `LLCs / Life Science / Climate / Real Estate & Construction`. |
| **5** | Plausible domain-shaped content that is nonetheless invented and unverifiable. Cruip's "Simple": the hero mockup is a terminal running `npm login --registry=https://npm.pkg.github.com --scope=@phanatic` on a page selling a *website builder*. Decorative code that does not correspond to the product. |
| **8** | Numbers presented as evidence that were generated. v0 Optimus: `98% faster deployment / STRIPE`, `300% throughput increase / LINEAR`, `20 days saved on builds / NETFLIX`. v0 Agentic: `50M+ TASKS · 99.9% UPTIME · 180+ COUNTRIES`. v0 Compute: `3500+ autonomous agents active · 99.7% distributed uptime · <50ms execution latency`, logo wall `Meridian Labs / Flux Systems / Beacon AI / Prism Analytics`. |
| **10** | Fixture data verbatim: `Acme Inc.`, `Total Revenue $1,250.00`, `New Customers 1,234`, `Active Accounts 45,678`, `Growth Rate 4.5%` with `+12.5%` on two tiles. TailAdmin's variant: `$20K ↓`, `$20K ↑`, `$20K ↑` — three different metrics, one number. |

**How to score it fast:** cover the logo and the illustration. Read what is left. If you cannot
name the product's category from the remaining text, this dimension is ≥7.

**When a high score here is acceptable:** a component-library specimen page, a design-system doc,
or a Figma-to-code demo whose *purpose* is to show the component. shadcn's blocks page labels its
preview "A dashboard with sidebar, charts and data table" next to a Preview/Code toggle — it is a
specimen, and scores 5. The *same markup shipped as your product* scores 10, because the fixture
content is now a claim.

### 6.2 Copy · weight 18

*Would a person who works here have written this?*

| Score | Anchor |
|---|---|
| **0** | Sentences that carry a fact, a constraint or a voice. GOV.UK: "Benefits and financial support if you're temporarily unable to work." Basecamp section heads: "Tell me if this sounds about right.", "Remember when companies cared about service? We still do.", "Take a minute to meet some of our customers. They're woodworkers, music industry folks…" |
| **2** | Sentence case, concrete, verb-led, product-shaped. Linear's section heads are workflow stages, not noun phrases: `Intake and integrations`, `Planning and monitoring`, `Build, review, and ship`. Its subhead is two short declaratives: "Purpose-built for planning and building products. Designed for the AI era." |
| **5** | Grammatical, on-brief, weightless — could precede any product. Vercel: "Build agents on infrastructure that thinks like them." Cruip: "Simple is a modern website builder powered by AI that changes how companies create user interfaces together." |
| **8** | The construction set. **Antithesis**: "Your toolkit to stop configuring and start innovating.", "Everything you need. Nothing you don't.", "Autonomous, not uncontrolled." **Tricolon of one-word sentences**: "Define. Deploy. Scale.", "Three steps. Infinite possibilities." **Title Case feature nouns in a 4-grid**: `Instant Deployment · AI-Native Workflows · Real-time Collaboration · Enterprise Security` and `Visual Agent Builder · Real-time Monitoring · Memory & Context · Guardrails & Permissions`. **The aspiration headline**: "Build & orchestrate AI agents while you sleep." |
| **10** | Cross-template string collisions and chirp. `Global by default.` appears verbatim as an h2 in **both** v0-optimus and v0-compute. Both ship the identical pricing-section CTA set `Start free · Start trial · Contact sales · Compare all features`. TailAdmin: "You earn $3287 today, it's higher than last month. Keep up your good work!" |

**Two mechanical checks worth more than they cost.**
1. **Case.** Count Title Case headings that are not proper nouns. Linear, Mercury, Stripe and
   GOV.UK use sentence case throughout; all three v0 templates use Title Case for feature headings.
   Three or more Title Case noun-phrase headings is a finding.
2. **Apostrophes.** Cruip's h1 is `The website builder you're looking for` with a straight `'`
   (U+0027). Basecamp, Linear and GOV.UK all use `’` (U+2019). Straight quotes in display type
   means nobody read the headline at size.

**When a high score here is acceptable:** never, on shipped product surfaces. Placeholder copy in a
component demo is fine and should be labelled as such.

### 6.3 Component defaults & fingerprints · weight 13

*Does the CSS contain scaffolding for components the page does not have?*

This is the cheapest high-confidence check in the instrument. Dump `:root`:

```js
for (const s of document.styleSheets) { try { for (const r of s.cssRules)
  if (/(^|,)\s*(:root|html)\s*($|,)/.test(r.selectorText||'')) for (const n of r.style)
    if (n.startsWith('--')) console.log(n, r.style.getPropertyValue(n).trim()); } catch {} }
```

Measured token counts: **Vercel 374 · Resend 275 · Basecamp 91 · shadcn.com 41 · TailAdmin 32 ·
GOV.UK 24 (all `--govuk-*`) · Linear 0 and Mercury 6 (resolved at build time) · every v0 app 33.**

| Score | Anchor |
|---|---|
| **0** | A token set built for this product. GOV.UK exposes 24, all namespaced `--govuk-focus-colour`, `--govuk-focus-text-colour`; Basecamp exposes 91 including `--color-ink`, `--color-blue` used by name in `:focus-visible` rules. |
| **2** | Large, custom, mostly consumed. Vercel's 374 and Resend's 275; or none at all because the build inlined them (Linear, Mercury) — verify by checking whether the *values* form a scale. |
| **6** | A library's token set, kept, but themed. v0 Optimus rethemed all 33 to a warm stone ramp (`--background:#fafaf9`, `--muted-foreground:#5e534a`) and set `--radius:.25rem` — but left `--sidebar-primary-foreground` and `--chart-1..5` on a marketing page with neither. |
| **10** | The set untouched. v0 Agentic: `--background:#fff · --foreground:#0a0a0a · --muted:#f5f5f5 · --border:#e5e5e5 · --ring:#a1a1a1 · --radius:.625rem` (Tailwind neutral-950/100/200/400 verbatim) and `--chart-1..5: #f05100, #009588, #104e64, #fcbb00, #f99c00` — the stock chart ramp, on a page with no chart. |

**Five one-line greps, each near-conclusive:**

| Grep | Meaning |
|---|---|
| `--sidebar-` present, no sidebar rendered | shadcn scaffold, unedited |
| `--chart-1` present, no chart rendered | same |
| `--destructive: #e40014` (or `oklch(0.577 0.245 27.325)`) | default, unchanged — identical across all four v0 apps and both their light and dark themes |
| `--radius: 0.625rem` | shadcn new-york default, unchanged |
| exactly `33` `:root` custom properties | the full untouched contract |

**When this is fine:** internal tools, admin panels, anything where the component kit *is* the
design system and nobody claimed otherwise. Strip the dead tokens anyway — it costs one commit —
but do not restyle a working admin panel to satisfy this line.

### 6.4 States & depth · weight 10

*Does anything on this page have a second state?*

| Score | Anchor |
|---|---|
| **0** | States are a system. GOV.UK: **28** `:focus-visible` rules and **135** `:focus` rules, with a named focus token, and the focus style inverts text and background rather than adding a ring. |
| **2** | Focus authored deliberately and narrowly. Linear: 7 `:focus-visible` rules, 4 `outline:none` — every removal paired with a replacement. Stripe: 4 `:focus-visible`, focus ring composed from `--s--focus-ring` tokens. Resend: 8 `:focus-visible`, 0 bare `:focus`. |
| **6** | Outlines killed, partially restored. TailAdmin: **13** `outline: none` rules, **26** bare `:focus` rules, **2** `:focus-visible` — a keyboard user gets nothing on most controls. |
| **10** | Zero. All four v0 apps measured: `0` rules matching `:focus-visible`, `0` matching `:focus`. Nothing on the page has a keyboard state, an empty state, an error state or a loading state. |

Also score, from the screenshot: does any list show what it looks like with **zero** rows? Does any
number show what it looks like while **loading**? Does any destructive action show its
**confirmation**? A generated page has exactly one state — the happy one, fully populated.

### 6.5 Layout & rhythm · weight 10

*Was spacing decided, or defaulted?*

Measure the tally of `gap` values on flex/grid containers, and the `padding-top/bottom` of every
top-level section.

| Score | Anchor |
|---|---|
| **0–2** | A scale in active use across nesting levels. Linear: `8px×94, 4px×62, 6px×51, 12px×14, 2px×11, 16px×5` — fine steps at component scale, wide steps at section scale, and sidebar rows at a measured **28px**. Mercury: `4px×45` for label stacks against `40px×26 / 32px×26` for sections. |
| **5** | One coherent scale, one density, applied everywhere regardless of what is being separated. TailAdmin: `12px×125` dominant, rows 40px. |
| **8–10** | Scale degeneracy. v0 Agentic: `gap: 24px` on **61** elements with almost nothing below 6px, and `padding: 128px 0` on **all nine** sections. v0 Optimus: gaps `8/12/16/24/32/64/96` — `gap-2/3/4/6/8/16/24` straight off the default scale — and `128px/128px` on eight sections plus one `160px/160px`. |

**The tell is uniformity, not size.** Linear also uses `128px` section padding. The difference is
that Linear varies it and v0 does not: nine sections, one value, means nobody asked which sections
deserve more air.

**Do not check line length.** It used to be diagnostic; it is not any more. Measured columns:
Stripe 503px@14px (~72ch), Linear 505px@15px (~67ch), GOV.UK 630px@19px (~66ch), v0 Optimus
596px@18px (~66ch). Tailwind's `max-w-2xl` gets this right by accident. Spend the attention elsewhere.

### 6.6 Color · weight 8

| Score | Anchor |
|---|---|
| **0–2** | A ramp built for the product, used with intent. Linear runs two families and gets depth from stacked hairlines: `rgba(0,0,0,0.2) 0 0 0 1px` plus `rgba(255,255,255,0.08) 0 0 0 0.5px inset` — a half-pixel top light, not a drop shadow. GOV.UK: one blue (`#1D70B8`), one green (`#0F7A52`), black text, and nothing else. |
| **5** | One accent applied everywhere it could be. TailAdmin: a single indigo on the active nav item, the chart bars, the area fill, the gauge and the logo — correct, and doing no work. |
| **8–10** | Untouched ramp values traceable to the framework: `#0a0a0a / #fafafa / #e5e5e5 / #a1a1a1 / #737373 / #f5f5f5` (Tailwind neutral-950/50/200/400/500/100) as the entire palette, plus a chart ramp on a page with no chart. |

**Contradicting the standing advice:** "AI uses purple gradients" is a 2023 observation and is now
close to useless. Across the four v0 apps measured, gradients were: a `repeating-linear-gradient`
hairline grid, black-to-transparent image scrims in oklab, and a `radial-gradient(400px, rgba(0,0,0,0.03))`
cursor glow. No purple anywhere. Meanwhile Mercury's hero is a full-bleed dreamlike AI-looking
landscape and Resend ships 60 layered `linear-gradient(42deg, …)` panels. **Gradients no longer
separate the two populations. Stop scoring them.** What still separates: whether the palette's
values are traceable to a framework's default ramp.

### 6.7 Typography · weight 8

| Score | Anchor |
|---|---|
| **0–2** | A scale with a reason and a family with a cost. Mercury licenses `arcadia` + `arcadiaDisplay` and uses variable weights **420** and **480**. Linear runs `Inter Variable` at weight **510** with `Berkeley Mono`, and treats **13px** as a real tier (227 elements). Resend pairs `domaine` (serif) at 96px display with `inter` body and `commitMono`. GOV.UK's body is **19px**, a size no scale generator produces. |
| **4** | Restrained and default-adjacent. Stripe's API reference: `-apple-system` + `Source Code Pro`, four sizes total. shadcn.com: Geist, `14px×184 / 16px×135`. |
| **8–10** | The default scale, visible. v0 Optimus: `30px, 48px, 60px, 160px` co-occurring — `text-3xl/5xl/6xl` untouched. One sans plus the free mono of the moment, no third role: `Instrument Sans + JetBrains Mono` in both Optimus and Compute; `Geist + Geist Mono` in Agentic and the v0 dashboard. Weights are 400/500/600/700 only. |

**Two things the corpus gets wrong.**
- **"Never use Inter" is bad advice.** Linear's entire type system is Inter Variable. The tell is
  not the family, it is Inter at **400/500/600** with no weight above the browser's idea of bold
  and no second role. Inter at 510 with a mono companion is a designed system.
- **Tight display tracking is not a tell.** Measured h1 tracking: Vercel **−0.06em**, shadcn.com
  −0.05em, Cruip −0.037em, v0 Compute −0.025em, Linear −0.022em, Mercury and GOV.UK **normal**. The
  range is identical across good and generated. What *is* a tell: negative tracking below ~20px.
  Cruip sets `letter-spacing: -0.4px` on 14px buttons (−0.029em) because `tracking-tight` was put
  on a wrapper; Linear's 13px nav, Mercury's 16px nav, Stripe's 14px body and GOV.UK's 19px body
  are all `normal`.

### 6.8 Surface treatment · weight 6

| Score | Anchor |
|---|---|
| **0–2** | A radius *scale*, dominated by a small value. Linear: `9999px×72, 8px×30, 12px×19, 4px×18, 9px×18`. Stripe: `4px×148, 6px×92, 8px×53`. Mercury: `4px×110` with `40px` reserved for pill nav. Basecamp: `5.71/4.95/7.62/11.43px` — fractional, because they derive from a fluid rem scale. GOV.UK: **none**. |
| **5** | One or two radii, applied consistently. TailAdmin: `8px×37` plus pills. |
| **8–10** | Radius vocabulary of exactly one, and it is `rounded-full`. v0 Optimus: `calc(infinity * 1px)` on 22 elements and **nothing else on the page**. v0 Compute: the same, 32 elements, nothing else. |

Shadow, same logic. Linear's shadows are structural (`0 0 0 1px` rings, `0 0 12px inset`); Basecamp
layers a hairline ring with a wide soft ambient (`oklch(0 0 0/.0625) 0 0 0 1.14px, oklch(0 0 0/.04) 0 4.57px 36.57px −…`).
The generated default is `0 8px 32px rgba(0,0,0,0.08)` on everything, or — increasingly in 2026 —
no shadow at all, which is not a virtue when it is also no border and no contrast step.

### 6.9 Motion · weight 4

One check does most of the work: **tally every element's `transition-duration`, `transition-timing-function`
and `transition-property`.**

| Score | Anchor |
|---|---|
| **0–2** | Multiple durations mapped to multiple purposes, a chosen curve, named properties. Linear: `0.1s×50` and `0.16s×18`; easing `cubic-bezier(0.25, 0.46, 0.45, 0.94)` on 26 elements; properties named per element (`color`×38, `filter`×10, `color, background`×8); **zero** `transition: all`. Mercury: `0.3s` with `cubic-bezier(0, 0, 0.2, 1)` on 34, plus `0.15s` on 15. |
| **8–10** | One duration, one curve, `all`. v0 Optimus: `0.15s×33`, `cubic-bezier(0.4, 0, 0.2, 1)` on **every** transitioning element, `transition-property: all` on 22. shadcn.com/blocks: 113 transitions, all `0.15s`, all `cubic-bezier(0.4,0,0.2,1)`, 54 of them `all`. That curve is Tailwind's `ease-in-out` default. |

**Also check what hover changes.** Linear has 43 `:hover` rules; 13 change background, 9 change
opacity, 3 change border, **0 change `box-shadow`**, and the 5 that use `transform` are in a toast
component where movement is the point. Nothing moves when you sweep a cursor down a list. The
generated default — `hover:shadow-lg hover:-translate-y-1` on a card grid — is now rarer than it
was, but when present it is worth the full deduction on its own.

### 6.10 Originality · weight 3, scored 0–6 only

*Is there one decision here that a generator would not have produced?*

| Score | Anchor |
|---|---|
| **0** | A signature move drawn from the domain. Basecamp's primary navigation is a stack of underlined links with dashed one-line explanations and hand-drawn yellow highlighter marks — `Basecamp 5 is here — Major upgrade for 2026`, `91,733 people are working in Basecamp right now!` — on a page selling project management. GOV.UK's `0 2px 0` hard button depth. Linear's 0.5px inset top-light. |
| **3** | Everything is conventional and everything is correct. |
| **6** | Everything is conventional *and* every convention chosen is the current default. Maximum. |

**This dimension cannot exceed 6, and there is no route by which it alone lifts a score above 3.**
That is the guard. An agent that reads this rubric and starts inventing novel navigation patterns
to lower its score has misread it, and will produce something worse than the bland thing it
replaced.
