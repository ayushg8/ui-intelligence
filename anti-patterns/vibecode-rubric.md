# The vibecode risk rubric

**A 0–10 instrument for "how obviously did a machine make this."** Run it against a screenshot and
the page's computed CSS. Target **≤2**. Ship gate is **≤3**.

**Evaluated:** 2026-09-09 and 2026-09-10 · Every number and quoted string below was read out of a
live interface with Playwright (computed styles, `:root` custom properties, raw stylesheet text
captured off the network) or off a 1440×900 render at 2×. The calibration set is **18** real
interfaces, listed with their scores in §8, covering three generators — **v0, Lovable and Bolt**,
which have **different fingerprints** (§6.3). Nothing here is recalled.

**Five things in this file are corrections to advice that sounds right and measures wrong.** Each
is marked ⚠, and each was falsified by a specific interface in the calibration set:

| Retired check | Falsified by |
|---|---|
| High `:root` token count means an authored system (§6.3) | Bolt `weight.coach`: **304** properties, 292 of them Tailwind's stock palette |
| Missing focus rings prove generation (§6.4, §2) | Lovable output ships **9–15** `:focus-visible` rules nobody designed |
| Unspaced em dashes are an AI tell (§6.2) | **Stripe: 11.** Linear, Mercury and GOV.UK: 0 |
| Straight apostrophes are an AI tell (§6.2) | **Resend: 19 straight, 0 curly** — and it scores 2.6 |
| A verbatim `Acme` floors the score (§7) | Resend renders `Weekly Acme Newsletter` in its own hero |

Retired means *stop running them*, not *weigh them less*. A check that fires on GOV.UK is not a
weak check, it is a broken one (§11.9).

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
| **8** | Ambitious surface, zero product. The page is a shape where a product should be. Fabricated evidence. Scaffold left in the CSS. | **v0 "Optimus"**: stat strip reads `98% faster deployment STRIPE · 300% throughput increase LINEAR · 6x faster to ship NOTION · 20 days saved on builds NETFLIX · 98% faster deployment STRIPE` — invented numbers, attributed to real companies, and the first pair repeats inside one viewport. Zero `:focus-visible` rules on the entire page. Its `:root` carries seven `--sidebar-*` tokens on a marketing page with no sidebar. **v0 "Compute"**: same skeleton, different image; logo wall reads `Meridian Labs · Flux Systems · Beacon AI · Prism Analytics`. **Bolt `weight.coach`** (hackathon grand-prize winner, 7.5): h1 is `Your Personal Chef. / Your Smart Kitchen. / Your Better Life.`, 27 of 44 headings are Title Case, and the `:root` carries the **entire Tailwind default palette** — 292 ramp tokens across 22 hues — with every semantic alias pointing at a stock 500 step. |
| **10** | The scaffold, shipped. Every value is a framework default and every string is a fixture. | Measured composite of the untouched shadcn/Tailwind v4 starter: exactly **33** `:root` properties including `--sidebar-ring` and `--chart-1..5` on a page with neither; `--radius: .625rem`, `--destructive: #e40014`, `--background:#fff`, `--foreground:#0a0a0a`, `--border:#e5e5e5`, `--ring:#a1a1a1` all unchanged; every transition on the page `150ms cubic-bezier(0.4, 0, 0.2, 1)` with `transition-property: all`; `Acme Inc.` still in the sidebar. |

**Odd numbers are legal.** 1, 3, 5, 7, 9 mean "between these two, closer to the lower one."

**Note on the calibration set:** it tops out at 8. Published v0 templates are curated and
favourited; nobody features the 10. A 10 is what comes out before anyone looks at it, which is
exactly the artifact this rubric exists to catch. Do not read "nothing scored 10" as "10s are rare."

**The tool is not the score.** The set contains a page built with Lovable that scores **2.8** —
below Vercel — and a page that won the grand prize at Bolt's hackathon that scores **7.5**. Both
were generated. The instrument reads the artifact, never the toolchain, and there is no version of
"built with X, therefore N" anywhere in it. If you find yourself scoring the provenance, stop.

---

## 2 — Weights, and why

Score each dimension 0–10 on its own anchors (§6), then take the weighted mean.

| # | Dimension | Weight | Why this weight |
|---|---|---|---|
| 1 | **Product specificity** | **20** | The single strongest signal and the hardest to fake, because faking it requires knowing the domain. It is also the cheapest to *earn* and the one that moves a human's read the most. Linear and shadcn `dashboard-01` are near-identical as component compositions; `DRV-8852 / vehicle_state` versus `Acme Inc. / $1,250.00` is the entire difference. |
| 2 | **Copy** | **18** | Second-hardest to fake, and it survives a screenshot. Prose is where a model's priors are least disguised: three unrelated v0 templates by three authors independently produced "Everything you need…", and two of them shipped the string **"Global by default."** verbatim. You cannot restyle your way out of this. |
| 3 | **Component defaults & fingerprints** | **13** | Nearly free to check and nearly conclusive, because scaffolds leave dead artifacts — tokens for components the page does not contain. Weighted below copy only because a competent author can strip them in ten minutes without changing anything a user sees. |
| 4 | **States & depth** | **10** | The cure for "looks like a mockup." Generated pages have one state per element. All four v0 pages and Bolt's `weight.coach` measure **zero** `:focus-visible` rules; GOV.UK has 28. Held at 10 rather than raised, because ⚠ the check is one-directional: component-library output ships focus states nobody designed (Lovable measures 9–15), so a healthy count proves nothing. See §6.4. |
| 5 | **Layout & rhythm** | **10** | Detects "spacing was never decided." Measurable as scale degeneracy: v0 "Agentic" uses `gap: 24px` on 61 elements and applies `padding: 128px 0` to all nine sections; Linear's gaps are 8px×94, 4px×62, 6px×51, 12px×14, 2px×11. |
| 6 | **Color** | **8** | Real signal (untouched ramps, accent-everywhere) but noisy — many excellent products are also monochrome-plus-one, and the 2023 "purple-blue gradient" tell is mostly extinct. |
| 7 | **Typography** | **8** | Same: real signal in scale *vocabulary*, but the individual values converged. Tight display tracking is now standard everywhere, good and bad. |
| 8 | **Surface treatment** | **6** | Radius, shadow, border, glass. Highly visible, weakly diagnostic in 2026, and fixable in one pass — which is exactly why it should not dominate the score. An agent that optimises radius and ships `Acme Inc.` has done nothing. |
| 9 | **Motion** | **4** | Mostly invisible in a screenshot, and the tells are narrow. Kept because one check is decisive: a single duration and a single easing across the whole page. |
| 10 | **Originality** | **3**, capped | See §3. This dimension is **asymmetric**: it scores 0–6, never higher, so it can nudge a score but never drive one. It exists to credit a genuine signature move, not to demand one. |

Copy + product specificity = **38%**. That is deliberate. Everything else is surface, and surface
is what an agent optimises when it is avoiding the real work.

---

## 3 — The confound: five different diagnoses

Most bad rubrics collapse these. They have different scores and different fixes.

| Diagnosis | Looks like | Score on this rubric | Fix |
|---|---|---|---|
| **Generated** | Library defaults + placeholder content + one state per element + fabricated evidence | **7–10** | §9, top of the ladder |
| **Templated** | One coherent system applied consistently, zero domain fit, all fixture content | **5–6** | Replace content and re-derive density from the real task. The system is fine; it is about someone else's product. |
| **Merely mediocre** | 3.2:1 contrast, a heading smaller than the body, a misaligned column, an unreadable chart | **score it low here, flag it separately** | This is a craft failure, not a generation tell. Route to `visual-critique-method.md` and `system/8-gates.md`. Inflating the vibecode score for it makes the instrument useless as a signal. |
| **Good but conventional** | Every element is standard, and every element is right for this product | **0–2** | Nothing. Ship it. |

Three rules that keep the instrument honest:

**Restraint is never a deduction.** There is no penalty anywhere in §6 for "does not have a
distinctive idea." A login form that looks like a login form is correct — users arrive with
expectations built in other products, and spending them is a cost, not a virtue. GOV.UK scores 0
with no gradient, no radius, no shadow, no illustration and no personality, because every one of
those absences is a decision it can defend.

**Novelty is not a defence.** The v0 pages in §8 are visually *more* adventurous than Linear's —
chromatic-aberration text, iridescent 3D renders, a glassmorphic floating nav — and they score 8.
Ambition applied to nothing is still nothing.

**Deduct only on an observable.** Every point off cites an element, a value or a string you can
paste (§4). "Feels generic" is a zero-point finding. If your only complaint is "this resembles
other products in its category," check whether that is a finding or a preference; the answer is
usually preference.

**The fifth diagnosis, which the four-way table above cannot express: generated, and correct
anyway.** `liquid-log-glow`
scores 4.7 almost entirely on one dimension — DEF 9, for scaffold nobody can see. Every dimension a
user experiences is 2–4. It renders its own empty state, uses real units, and does the one job it
has. Its honest prescription is "delete some dead tokens and rewrite one button label," not "this is
a 4.7, redesign it." **A score is not a verdict on whether an interface should exist.** Before you
act on a number, look at which dimensions produced it: a score concentrated in DEF, MOT and SURF is
a cleanup; a score concentrated in SPEC and COPY is a rebuild. Report the shape, not just the total.

The mirror of this is the trap: **an artifact can be generated end to end and still be the right
thing to ship.** The Lovable partner directory scores 2.8. Nothing in this instrument says to stop
using a generator; it says to finish the work the generator left undone.

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

Use this on every UI change. It is cheap enough that there is no excuse for skipping it, and it
never misses in the direction that matters — nothing in the calibration set scores low here and
high on the full path.

| # | Question | Fail if | Points |
|---|---|---|---|
| **1** | **Could this screenshot belong to any other product in this category with only the logo swapped?** | Yes | +3 |
| **2** | **Is there a number, name, ID, unit or label on screen that only this product could produce?** | No | +3 |
| **3** | **Pick the longest sentence. Would a person who works here have written it?** | No | +2 |
| **4** | `grep -c ':focus-visible'` on the page CSS, and: does any element show a second state (hover/selected/loading/empty/**disabled**/error)? | 0 **and** none | +1 |
| **5** | Two or more of these as **exact** strings in product chrome — `Acme Inc.`, `Lorem ipsum`, `$1,250.00`, `1,234`, `45,678`, `+12.5%`, `Total Revenue`, `Trending up this month`, `John Doe`, `Product Name`, `Your Company` — **or** a generator watermark still on the page (`Edit with Lovable`, `MADE IN BOLT.NEW`, `Built with v0`)? | Yes | +1 |

Sum = fast score, 0–10. Measured against the §8 set, fast score first, full score second:

```
GOV.UK 0/0.2   Linear 0/1.4   Basecamp 0/1.4   Mercury 0/1.6   Stripe 0/1.7   Resend 0/2.6
Lovable-dir 0/2.8   Vercel 2/3.5   blueprintbuddy 1/3.9   liquid-log-glow 6/4.7
shadcn dash-01 9/5.3   Cruip 9/6.1   TailAdmin 8/6.4   weight.coach 7/7.5
Compute 9/8.2   Optimus 10/8.1   Agentic 10/8.5
```

(v0 "UXBooster" is omitted from this line only: it was scored on the full path in the 2026-09-09 run
and never run through the fast path, and inventing its fast score would defeat the point of the line.)

**It is accurate at both ends and runs about 2–3 points hot on templates.** That is by design: the
fast path cannot tell "generated" from "somebody else's finished product", because from the outside
they look the same and both need the same first fix. Use it as the trigger for the full path, not
as the score. Anything ≥4 on the fast path gets the full path.

**Two new failure modes, from the Lovable and Bolt rows.** `liquid-log-glow` runs **hot** (6 fast vs
4.7 full) because a single-purpose utility trips Q1 — any water tracker looks like any other water
tracker, and that is not a defect. `blueprintbuddy` runs **cold** (1 fast vs 3.9 full): the fast path
sees real domain nouns and working focus states and clears it, while the full path finds the
unconverted `--destructive`, the accent-coloured headline and the leftover `--sidebar-*`. So the
trigger rule needs a second clause: **run the full path when the fast path scores ≥4, *or* whenever
the artifact is something you are about to ship.** The fast path is a smoke alarm, and a cold reading
from it is not a clearance.

**Question 1 is the whole rubric compressed.** If the answer is yes, nothing you do to the radius
scale will help.

---

## 6 — The full path: ten dimensions

Each is scored 0–10. **0 = no evidence of generation; 10 = pure scaffold.** Anchors are measured
values from §8's set.

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

**Three mechanical checks, measured across 11 interfaces.** Each is one line of JS against
`document.body.innerText`. The tables below are the actual counts, so you can see where each check
separates and where it does not.

**1. Title Case headings.** Count `h1,h2,h3` whose words are >80% capitalised and which are not
proper nouns.

| | Title Case / total headings |
|---|---|
| Bolt `weight.coach` | **27 / 44** |
| Linear · Basecamp · Mercury · Stripe · GOV.UK · Resend | **0** / 15, 7, 20, 33, 22, 27 |
| Lovable `blueprintbuddy` | **0 / 20** |

Six designed interfaces produced **zero** between them. Three or more is a finding. Note the miss:
Lovable writes sentence case, so this check catches Bolt and v0 and not Lovable. No single copy
check covers all three generators — that is why COPY is scored on the whole body of text, not on a
grep.

**2. Apostrophe direction — an exculpatory check, not an accusatory one.** ⚠ The obvious version of
this check is wrong. Counts of `’` (U+2019) versus `'` (U+0027) between letters:

| Interface | curly | straight |
|---|---|---|
| Basecamp | **33** | 0 |
| Stripe | **15** | 1 |
| Mercury | **8** | 1 |
| Linear | **6** | 1 |
| GOV.UK | 4 | 7 |
| **Resend** | **0** | **19** |
| Lovable `blueprintbuddy` | 0 | 6 |
| Bolt `weight.coach` | 0 | 20 |

**Resend is a designed product with zero curly apostrophes**, and GOV.UK is mixed because its copy
is authored by hundreds of civil servants in a CMS. So straight quotes prove nothing. The
*inverse* is clean and useful: **≥5 curly apostrophes with ~0 straight ones was typed by a person in
an editor with smart quotes** — true of 4 of 4 designed products, 0 of 3 generated ones. Use it to
clear an interface, never to convict one.

**3. ⚠ Do not check em dashes.** The famous tell measures backwards. Unspaced em dashes
(`word—word`) per page: **Stripe 11**, Resend 3, Bolt `weight.coach` 2, Lovable `blueprintbuddy` 0,
Linear 0, Mercury 0, GOV.UK 0. Stripe leads the field because American typographic convention sets
the em dash closed, and Stripe employs editors who know that. Spend the attention on Title Case.

**4. The accent-coloured phrase inside the headline.** Count distinct computed `color` values among
the h1's text nodes. Two or more means part of the headline is painted in the accent:

- Bolt `weight.coach` — 2 colors: `Chef.` and `Kitchen.` in `rgb(167,139,250)`, `Personal`,
  `Smart`, `Better` and `Life.` in white. **The coloured words are not the words that carry the
  sentence.**
- Lovable `blueprintbuddy` — 2 colors: `in under a minute` in `oklch(0.74 0.13 219)`.
- Linear, Mercury, Vercel, Basecamp, GOV.UK, Resend, shadcn.com — **1 color each.**

The nuance that keeps this honest: **Stripe also measures 2** (`rgb(129,184,26)` on part of its h1).
The difference is which words get the color. Stripe colors the noun the sentence is about; the
generated version colors whichever phrase ends a line. Do not deduct for a two-colour headline —
deduct when you cannot explain why *those* words are the coloured ones.

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

Note that a cross-origin stylesheet throws on `cssRules`, and you will silently read zero. When the
count comes back 0 with a visibly themed page, capture the raw CSS off the network instead —
`page.on('response', …)` filtered to `text/css` — and regex `:root` blocks out of the text.

Measured token counts: **Vercel 374 · Bolt `weight.coach` 304 · Resend 275 · Basecamp 91 ·
shadcn.com 41 · Lovable `blueprintbuddy` 39 · Lovable `liquid-log-glow` 39 · TailAdmin 32 · Lovable
partner directory 31 · GOV.UK 24 (all `--govuk-*`) · Linear 0 and Mercury 6 (resolved at build
time) · every v0 app 33.**

⚠ **Count is not the signal, and the earlier version of this file was wrong to imply it was.**
`weight.coach` exposes 304 custom properties and 292 of them are the **Tailwind default color
palette dumped verbatim** — `--amber-50…950`, `--blue-50…950`, `--cyan-50…950`, across 22 hues, on a
page that uses three. Vercel's 374 and `weight.coach`'s 304 are the same number and opposite facts.
What separates them is **shape**:

| Shape | Reading |
|---|---|
| Namespaced to the product (`--govuk-focus-colour`, `--s--focus-ring`) | authored |
| Semantic and *consumed* (`--ink`, `--ink-2`, `--hairline`, `--recess`, `--paper`) | authored |
| An 11-step ramp for every hue the framework ships | the framework's palette, exported |
| A semantic name aliasing a stock ramp step | **the giveaway — see below** |

**The single best check in this dimension: resolve the semantic tokens and see if they equal ramp
steps.** `weight.coach`, self-verified from its own `:root`:

```
--primary    #6366F1  ==  --indigo-500
--success    #10B981  ==  --emerald-500
--warning    #F59E0B  ==  --amber-500
--error      #EF4444  ==  --red-500
--background #F8FAFC  ==  --slate-50
--coral      #FF6B6B  ==  --coral-500
```

Six for six. A semantic layer whose every value is a stock 500 step is a rename, not a decision — the
model produced the *vocabulary* of a design system without making any of the choices a design system
consists of. This is the most common failure in 2026 output and it is invisible in a screenshot.
Contrast Basecamp's `--color-ink` and `--color-blue`, which are consumed by name inside
`:focus-visible` rules, or Lovable's partner directory, which rethemes `--destructive` off the stock
value entirely (below).

### The three generator fingerprints

They are different, and an agent that only knows the shadcn/v0 one will clear Bolt and Lovable
output by mistake.

| | **v0** | **Lovable** | **Bolt** |
|---|---|---|---|
| Token base | shadcn contract, **exactly 33** `:root` props | shadcn contract, rethemed, **31–39** props | **Tailwind palette dumped**, 300+ props |
| Dead scaffold | `--sidebar-*` ×7, `--chart-1..5` on pages with neither | `--sidebar-*` retained (16–54 occurrences) | no `--sidebar-*`, no `--chart-*` |
| Semantic layer | none — the contract is the whole system | **a second vocabulary added beside the first** (`--ink`, `--surface`, `--widget`, `--signal`) | present, but every value aliases a stock ramp step |
| `:focus-visible` rules | **0** | **9–15** (inherited from shadcn's components) | **0** |
| Radius | `calc(infinity*1px)` and nothing else | `.5rem` base + pills | 16px + pills + 24/12/48/40 |
| Watermark | — | `Edit with ✱ Lovable` badge, font `CameraPlainVariable` | `MADE IN BOLT.NEW` roundel |

**The Lovable-specific tell: the parallel vocabulary.** When the model cannot bring itself to
rewrite the contract it inherited, it leaves the contract in place and invents a second one next to
it. `liquid-log-glow` is the pure case — a dark page (`--background: 222 18% 7%`,
`--foreground: 30 20% 96%`) in which shadcn's **light-theme defaults survive untouched**:

```
--card             : 0 0% 100%          /* white card on a 7%-lightness page */
--card-foreground  : 222.2 84% 4.9%     /* near-black text on it */
--popover          : 0 0% 100%
--border           : 214.3 31.8% 91.4%
--muted            : 210 40% 96.1%
--secondary        : 210 40% 96.1%
--primary          : 222.2 47.4% 11.2%
--_unused_bg       : 0 0% 100%          /* renamed rather than deleted */
--_unused_fg       : 222.2 84% 4.9%
```

…and beside them a private set — `--widget`, `--widget-border`, `--widget-foreground`, `--track`,
`--accent-orange` — doing all the actual work, because the inherited names no longer describe
anything on the page. **Two token systems for one surface means the model was editing, not
designing.** `--_unused_` as a literal prefix is the highest-confidence single string in this whole
file: no human types that.

**`--destructive` is the last token anyone themes.** Across three generators and two shadcn
generations, every one kept the stock value in whatever notation its generation used:

| Interface | `--destructive` | resolves to |
|---|---|---|
| all four v0 apps | `oklch(0.577 0.245 27.325)` | shadcn v4 default |
| Lovable `blueprintbuddy` | `oklch(57.7% .245 27.325)` | same value, reformatted |
| Lovable `liquid-log-glow` | `hsl(0 84.2% 60.2%)` / dark `hsl(0 62.8% 30.6%)` | `#ef4444` / `#7f1d1d` — shadcn v3 default |
| **Lovable partner directory** | **`#ff003b`** | **rethemed — the exception** |

An error colour nobody chose is an error state nobody designed. It is also two seconds to check and
it survives every reformat, minifier and notation change.

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
| **2–3** | Focus authored deliberately, every removal paired with a replacement. Linear: 7 `:focus-visible`, 4 `outline:none`. Stripe: 4 `:focus-visible`, ring composed from `--s--focus-ring` tokens. Resend: 8 `:focus-visible`, 0 bare `:focus`. Vercel: **22** `:focus-visible` against **23** `outline:none` — a one-for-one trade, which is what "we removed the default and replaced it" looks like in a tally. |
| **6** | Outlines killed, partially restored. TailAdmin: **13** `outline: none` rules, **26** bare `:focus` rules, **2** `:focus-visible` — a keyboard user gets nothing on most controls. |
| **9–10** | Zero. All four v0 apps measured `0` rules matching `:focus-visible` and `0` matching `:focus`; so does Cruip's "Simple" template. Nothing on the page has a keyboard state, an empty state, an error state or a loading state. |

⚠ **The zero-focus check has a large blind spot, and it is worth knowing before you rely on it.** It
catches pages a model wrote from scratch — v0 marketing pages, `weight.coach` (0 `:focus-visible`, 1
bare `:focus` in 48KB of CSS), Cruip. It **misses everything built on a component library**, because
the library authored the focus states and they ship whether or not anyone thought about them.
Lovable output measures **9, 14 and 15** `:focus-visible` rules across the three apps in the set —
better than Linear's 7 — and none of that is evidence that anyone designed a state.

So: **zero focus rules is strong evidence of generation; nonzero is no evidence of design.** When the
count is healthy, stop counting and go look instead. Does any list show what it looks like with
**zero** rows? Does any number show what it looks like while **loading**? Does any destructive action
show its **confirmation**? Is any control rendered **disabled** in the default view?

Two interfaces in the set pass that look and they are both generated. `liquid-log-glow` renders its
genuine empty state on load — `0 ml`, `0%`, `2000 ml left`, an unfilled bar — and the Lovable partner
directory renders `Find my partners` **disabled** until you pick a chip. Meanwhile most of the
designed set shows one populated happy path. A generated page usually has exactly one state; when it
has two, credit it, and do not let the rest of the score claw the credit back.

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
deserve more air. Confirmed on a second generator: `weight.coach` runs `96px/96px` on **9 of its 11**
sections, while Linear splits `128px/128px ×4` against `0/0 ×4`.

**The centering ratio — the cheapest layout measure in the instrument.** Count text-bearing leaf
elements, count how many compute to `text-align: center`, take the percentage:

| Interface | centered |
|---|---|
| Bolt `weight.coach` | **66.2%** (137 / 207) |
| Lovable `blueprintbuddy` | 21.6% (19 / 88) |
| GOV.UK | 9.1% (12 / 132) |
| Linear | 9.0% (75 / 831) |
| Mercury | 5.5% (23 / 416) |

Designed interfaces cluster at **5–9%**. This is not an aesthetic preference, it is a decision count:
a left edge is a commitment about where the eye starts and what aligns to what, and centering is what
you get when nobody made that commitment. Above ~40% is a finding on its own.

**When centering is right, and it often is.** A single search affordance, an auth screen, an empty
state, a confirmation dialog, a marketing hero with one CTA and nothing to align to — all correctly
centered. The Lovable partner directory centers its entire hero and scores 2.8, because the page is
one search box and there is nothing for a left edge to organise. Deduct for *sustained* centering
through content that has structure — a feature grid, a pricing table, a stats row, body copy — not
for a centered hero.

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

---

## 7 — Combining, and the two clamps

```
raw = Σ(dimension_score × weight) / 100
```

Then apply, in this order:

**Clamp A — the specificity ceiling.** If `SPEC ≤ 2` **and** `COPY ≤ 2`, the final score is
**capped at 3**, whatever the surface dimensions say.

> An interface full of real domain content is not vibecode, even when every component in it is
> conventional. Linear uses Inter, dark mode, pill buttons, a card grid and 128px section padding —
> the whole tell list — and reads as designed, because the cards contain `DRV-8852` and
> `vehicle_state`. This clamp stops an agent from "fixing" a specific interface into a
> distinctive-looking generic one.

**Clamp B — the fixture floor.** If either is true, the final score is **at least 6**:

1. **Two or more** framework fixture strings appear verbatim **in product chrome or as product
   data** — a workspace name, an account name, a metric tile, a table cell, a chart label. The list:
   `Acme Inc.`, `Lorem ipsum`, `$1,250.00`, `1,234`, `45,678`, `+12.5%`, `Total Revenue`,
   `Trending up this month`, `Visitors for the last 6 months`, `John Doe`, `jane@example.com`,
   `Product Name`, `Your Company`.
2. A quantitative claim is attributed to a third party you did not verify — `98% faster
   deployment / STRIPE`, `99.9% uptime`, `50M+ tasks`, a logo wall of companies that are not
   customers.

⚠ **Both qualifiers on clause 1 are corrections, and the calibration set forced them.**

*Why "two or more":* a single hit is noise. `weight.coach` contains the substring
`Everything you need` — inside `Everything you need to know about Weight Coach`, an ordinary English
FAQ subtitle, not the shadcn fixture. **Match exact strings, anchored, never substrings**, and
require the cluster. Fixtures travel in packs because they come from one seed file: shadcn's
`dashboard-01` ships `$1,250.00`, `1,234`, `45,678` and `+12.5%` in a single row.

*Why "in product chrome or as product data":* **Resend renders `Weekly Acme Newsletter`** in its hero
mockup, and the old rule floored a 2.6 interface at 6. It should not have. Resend sells email
infrastructure; the mockup depicts *a customer's* newsletter, and `Acme` is the correct placeholder
for someone else's content that your product carries. Compare shadcn `dashboard-01`, where
`Acme Inc.` sits in the **workspace switcher** — the app naming itself. The test is whether the
fixture is the product's own identity or data, versus a depiction of the third-party content the
product operates on. Placeholder domains and companies inside code samples, API references and email
previews are correct content and never trigger this clamp.

> The second is not only a design failure. Publishing an invented metric under a real company's
> name is a claim about someone else's business.

The only exemption from Clamp B is an artifact whose visible purpose is to demonstrate the
component itself — a labelled block preview, a Storybook page, a design-system doc. "It's just a
demo" is not that exemption; the label has to be on the screen.

**Report the raw score, the clamped score, and which clamp fired.**

---

## 8 — Calibration set

18 interfaces, screenshotted at 1440×900 and probed for computed styles on 2026-09-09 (rows 1–14)
and 2026-09-10 (the four **★** rows, which cover Lovable and Bolt). Dimension codes in weight order:
SPEC 20 · COPY 18 · DEF 13 · STATE 10 · RHY 10 · COL 8 · TYPE 8 · SURF 6 · MOT 4 · ORIG 3.

| Interface | Score | SPEC | COPY | DEF | STATE | RHY | COL | TYPE | SURF | MOT | ORIG |
|---|---|---|---|---|---|---|---|---|---|---|---|
| GOV.UK `/browse/benefits` | **0.2** | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 1 |
| Linear `linear.app` | **1.4** | 0 | 2 | 2 | 2 | 1 | 2 | 1 | 2 | 1 | 2 |
| Basecamp `basecamp.com` | **1.4** | 1 | 0 | 1 | 3 | 2 | 2 | 2 | 2 | 3 | 0 |
| Mercury `mercury.com` | **1.6** | 0 | 2 | 2 | 3 | 2 | 2 | 1 | 2 | 2 | 2 |
| Stripe API reference | **1.7** | 0 | 1 | 2 | 2 | 2 | 2 | 4 | 3 | 3 | 3 |
| Resend `resend.com` | **2.6** | 2 | 4 | 2 | 2 | 3 | 3 | 1 | 3 | 3 | 2 |
| ★ Lovable partner directory | **2.8** | 2 | 3 | 3 | 2 | 4 | 2 | 3 | 3 | 4 | 3 |
| Vercel `vercel.com` | **3.5** | 2 | 6 | 1 | 3 | 4 | 4 | 3 | 5 | 4 | 4 |
| ★ Lovable `blueprintbuddy-b2c` | **3.9** | 3 | 5 | 4 | 3 | 5 | 3 | 4 | 4 | 5 | 4 |
| ★ Lovable `liquid-log-glow` | **4.7** | 2 | 6 | 9 | 3 | 3 | 5 | 6 | 4 | 5 | 4 |
| shadcn `dashboard-01` preview | **5.3** | 5 | 7 | 4 | 5 | 5 | 6 | 4 | 4 | 9 | 5 |
| Cruip "Simple" | **6.1** | 7 | 7 | 4 | 9 | 5 | 5 | 6 | 4 | 7 | 5 |
| TailAdmin demo | **6.4** | 8 | 8 | 5 | 6 | 5 | 6 | 5 | 5 | 6 | 5 |
| v0 "UXBooster" dashboard | **7.2** | 7 | 7 | 9 | 10 | 6 | 5 | 6 | 7 | 8 | 4 |
| ★ Bolt `weight.coach` | **7.5** | 6 | 7 | 9 | 10 | 8 | 8 | 8 | 6 | 8 | 4 |
| v0 "Optimus" | **8.1** | 9 | 8 | 8 | 10 | 8 | 6 | 7 | 8 | 9 | 4 |
| v0 "Compute" | **8.2** | 9 | 9 | 8 | 10 | 8 | 5 | 7 | 8 | 9 | 4 |
| v0 "Agentic" | **8.5** | 9 | 9 | 10 | 10 | 9 | 7 | 6 | 7 | 8 | 4 |

### The reasoning, where it is not obvious

**GOV.UK — 0.2.** The hardest case for a careless rubric. It has no radius, no shadow, no
illustration, no gradient, no accent beyond one blue and one green, and a 1970s transport typeface.
A rubric that scores "polish" would fail it. It scores 0 because nothing on the page is a default:
19px body, `box-shadow: #083D29 0 2px 0 0` as button depth, 28 `:focus-visible` rules with an
inverting focus style, and headings that are full conditional sentences — "Benefits and financial
support if you're temporarily unable to work." Every absence is defended.

**Basecamp — 1.4, ORIG 0.** Underlined text links as primary navigation, hand-drawn highlighter
marks, a live counter reading `91,733 people are working in Basecamp right now!`, a first-person
section head ("Tell me if this sounds about right."), emoji star ratings. By 2026 SaaS convention it
is the least fashionable page in the set. It is also the one no generator could produce. Note that
its **STATE is 3, worse than Linear's 2** — 3 `:focus-visible` rules against 8 bare `:focus` — and
it still scores 1.4, because the dimensions that matter are elsewhere. This is the rubric working.

**Vercel — 3.5, the deliberate hard case.** Vercel's aesthetic *is* the aesthetic v0 imitates. Its
headline is two abstract words. Its body copy — "For coding agents / To ship apps and agents /
Automated by agents" — is indistinguishable from generated copy, which is why COPY scores 6, the
worst dimension of any interface above the line. It still lands at 3.5 because SPEC is 2: real
customer logos you can verify, a dated real event, a proprietary typeface, 374 authored tokens.
**The lesson is that surface similarity to generated output is not evidence.** Score the substance.

**shadcn `dashboard-01` — 5.3, and why not higher.** Every fixture string is present (`Acme Inc.`,
`$1,250.00`, `1,234`, `45,678`, `+12.5%` twice) and MOT is 9 — the page serving it runs 113 transitions, every one `0.15s`, every one
`cubic-bezier(0.4,0,0.2,1)`, 54 of them `transition-property: all`. It escapes Clamp B only because the page around it
is visibly labelled "A dashboard with sidebar, charts and data table" beside a Preview/Code toggle
and an `npx shadcn add dashboard-01` command. **Ship that markup as your product and it is a 6.4 —
same pixels, different claim.**

**Cruip "Simple" — 6.1.** A paid, human-designed template, and it scores above shadcn's own block
preview. Why: `0` `:focus-visible` rules and `0` `:focus` rules on the whole page; a straight
apostrophe in the 64px h1 (`The website builder you're looking for`); `letter-spacing: -0.4px` on
14px buttons because `tracking-tight` sits on a wrapper; and a hero mockup showing
`npm login --registry=https://npm.pkg.github.com --scope=@phanatic` on a page selling a website
builder. Human authorship is not a defence either — the rubric detects absent decisions, whoever
failed to make them.

**TailAdmin — 6.4, the template anchor.** Internally consistent, one accent, correct hierarchy,
correct contrast, nothing broken. It is not vibecode; it is somebody else's finished product with
your logo on it. The evidence is in the data, not the styling: `$20K ↓ / $20K ↑ / $20K ↑` across
three different metrics in one row, and "Target you've set for each month" as the subtitle of both
"Monthly Target" and "Statistics". Real dashboards never show three identical numbers.

**v0 Optimus and v0 Compute — 8.1 and 8.2, and the skeleton finding.** These are different
templates by different authors, and above the fold they are the *same page*: wordmark plus `™`
upper-left, five or six single-word nav items centred, `Sign in` plus a filled pill CTA upper-right,
a monospace eyebrow preceded by a short horizontal rule, an 86–160px sans headline lower-left, a
full-bleed decorative render on the right, and a three-to-five-item fabricated stat strip pinned to
the bottom edge. Both ship the h2 `Global by default.` verbatim and the pricing CTA set
`Start free · Start trial · Contact sales · Compare all features` verbatim. **If your landing page
matches that skeleton, the score is ≥7 before you look at anything else.**

**v0 Agentic — 8.5, the highest.** DEF is a 10: the `:root` is shadcn's default set completely
untouched — `--background:#fff`, `--foreground:#0a0a0a`, `--border:#e5e5e5`, `--ring:#a1a1a1`,
`--radius:.625rem`, plus `--chart-1..5: #f05100, #009588, #104e64, #fcbb00, #f99c00` and seven
`--sidebar-*` properties on a marketing page with neither chart nor sidebar. The visible surface is
the most ambitious in the set (iridescent 3D render, glassmorphic floating nav). Ambition and
scaffolding are independent.

**★ Lovable partner directory — 2.8, the most important row in the table.** A page built with a
vibecode tool, by the vibecode company, scoring below Vercel. `Browse all 83 partners` is a live
count off a real database — the class of number no generator invents. The search box offers
`Guided / Describe / Voice`, three input modes that are a product decision rather than a pattern,
and the chip taxonomy is what people actually build on Lovable: `Website · Internal tool · AI
product · Agents · Mobile app · Ecommerce · Migration · Dashboard`. `Find my partners` renders
**disabled** until you pick one — a second state, on the default view. In the CSS,
`--destructive: #ff003b` is the only rethemed destructive in the entire set, and the semantic layer
(`--ink`, `--ink-2`, `--ink-3`, `--hairline`, `--hairline-strong`, `--paper`, `--recess`) *replaces*
the shadcn contract instead of sitting beside it. It still carries generated traits — 183 elements
at `calc(infinity*1px)`, a fully centered hero, 16 leftover `--sidebar-*` occurrences, and a
straight apostrophe in `What's it for?`. Those are worth about 2.8 and no more.

**★ Lovable `liquid-log-glow` — 4.7, and the render is not the problem.** Score it from the
screenshot alone and you land near 3: a hydration tracker showing `0 ml`, `of 2000 ml goal`,
`2000 ml left`, `GLASS 250 ml`, a live `Thursday, September 10 / 03:21`, and a genuine empty state on
first load. Real units, real domain, one honest card. Then read the CSS and DEF is a **9** — the
page is dark and shadcn's *light* defaults are still in it (`--card: 0 0% 100%`,
`--card-foreground: 222.2 84% 4.9%`, `--border: 214.3 31.8% 91.4%`), nine `--sidebar-*` tokens at
light values on a page with no sidebar, `--_unused_bg` and `--_unused_fg` renamed rather than
deleted, and a whole parallel vocabulary (`--widget`, `--track`, `--accent-orange`) invented to do
the work the abandoned names used to do. **This row exists to show the two passes disagreeing.** It
is also the row where the remediation ladder says *do almost nothing*: it is a one-card utility that
works, its worst dimension is invisible to every user, and the correct fix is twenty minutes of
token deletion, not a redesign. The copy is the only thing a user sees that is wrong —
`+ Drunk 250 ml` is a label no human ships, and `Tap Drunk to fill the orange line` explains the
mechanism instead of naming the action.

**★ Lovable `blueprintbuddy-b2c` — 3.9.** Sentence case throughout (0 of 20 headings Title Case —
Lovable writes markedly better copy than Bolt), a real three-role type system (DM Sans + Space
Grotesk + `ui-monospace`), a two-stop shadow hue-matched to the palette
(`oklch(0.12 0.02 251/.4) 0 1px 2px, oklch(0.1 0.02 251/.7) 0 18px 40px -20px`), and a fully
converted dark ramp in a single oklch hue family. Real domain nouns: `Google Analytics 4`,
`Adobe Analytics`, `Mixpanel`, `Segment`, `PNG or JPG, up to 6MB`. What holds it at 3.9 rather than
2: nav reading `How it works / What it does / Who it's for`, an eyebrow pill above the h1, the
accent-coloured `in under a minute` closing the headline, zero curly apostrophes against six
straight, and `--destructive` left at the stock oklch.

**★ Bolt `weight.coach` — 7.5, and it won the grand prize.** The most useful hard case in the set,
because judges scoring "impact, creativity, technical build, and design polish" gave it first place
and this instrument gives it a 7.5. Both are right about different things. DEF is a 9 on the
Tailwind palette dump and the six semantic aliases; STATE is a 10 on **zero** `:focus-visible` rules
in 48KB of CSS; RHY is an 8 on `96px/96px` across 9 of 11 sections and **66.2%** of text leaves
centered; COL is an 8 on `--primary` = `--indigo-500` and `--coral: #FF6B6B`; TYPE is an 8 on Inter
alone at weights 400/500/600/700 across the stock size scale.

Two things stop it going higher, and both deserve credit. **Its stat strip is honest.** In the exact
slot where v0 fabricates — `98% faster deployment / STRIPE` — this page has `Growing / Community of
beta testers`, `100% / Feedback response rate`, `Daily / We use our own app`. Somebody refused to
invent a number. **Clamp B does not fire**, and that is the difference between a 7.5 and a 9. And
its SPEC is a 6 rather than a 9 because the phone mockup contains real nutrition data — `675 cal of
2000 cal`, `Protein 42g / 150g`, `Carbs 28g / 200g`, `Fat 42g / 70g`,
`Honey Garlic Chicken Stir-Fry with Jasmine Rice`, `645 calories · 38g protein`, `LUNCH · 12:30`.
The give-away is that it is frozen: `Hello, Sergiy! / Monday, June 30, 2025`, a date fourteen months
stale at time of scoring.

**The copy on this page is bimodal, and that is itself a fingerprint.** The body prose contains
observed sensory detail no model volunteers unprompted — "Your hands are covered in flour. The
timer's going off. The sauce needs stirring." — while every heading above it is construction-set:
`Your Personal Chef. / Your Smart Kitchen. / Your Better Life.`, `Powered by intelligence. Designed
for humans.`, `Stop guessing. Start saving.`, `Every ingredient. Every expiration date. Every
possibility.`, `Never Waste Again`. A human wrote the paragraphs and accepted the headings. When you
see that split — good sentences, generated headings — the fix is small and specific: rewrite the
headings, keep the prose. It scores COPY 7 rather than 8 for exactly this reason.

### What the calibration set proves about 2023-era advice

Three tells that were reliable and are now noise. Do not spend deductions on them:

- **Purple/blue gradients.** Zero purple gradients across four v0 apps. What they actually use:
  hairline `repeating-linear-gradient` grids, oklab image scrims, and a 3%-black radial cursor glow.
- **`shadow-md` on every card.** v0 Optimus and v0 Compute have **no** non-reset shadows at all.
  Meanwhile Basecamp layers two-stop ambient shadows on nine elements.
- **Reading measure.** Every interface in the set, generated and designed, lands between 66 and 72
  characters. Tailwind's defaults got there.

And one that inverted: **decorative full-bleed hero imagery**. Mercury's hero is a surreal
AI-rendered landscape and it scores 1.6. v0 Compute's hero is a surreal AI-rendered landscape and
it scores 8.2. The image is not the variable.

---

## 9 — The remediation ladder

Ordered by **points per hour**, computed from the weights. Do not start at the bottom; the bottom is
where it feels like design.

### What each fix is actually worth

Moving one dimension from its generated anchor to its designed anchor changes the total by:

| Fix | Dimension move | Δ score |
|---|---|---|
| Replace fixture content with real domain content | SPEC 9 → 2 | **−1.4** |
| Rewrite every string in the product's voice | COPY 8 → 2 | **−1.1** |
| Delete dead scaffold tokens, theme the rest | DEF 8 → 1 | **−0.9** |
| Author focus, hover, empty, loading, error | STATE 10 → 2 | **−0.8** |
| Give sections and components different spacing | RHY 8 → 3 | **−0.5** |
| Build a radius and shadow scale | SURF 8 → 2 | **−0.4** |
| Two durations and a chosen easing | MOT 9 → 2 | **−0.3** |
| Invent a novel navigation pattern | ORIG 4 → 0 | **−0.1** |

The last line is the point of the table.

### By score band

**8–10 — the scaffold is showing. Three moves, in this order.**

1. **Replace every string and every number with the real thing.** Not "better placeholders" — the
   actual issue titles, the actual account names, the actual SKUs, the actual error text your API
   returns. If you do not have real data, get five real rows and lay out for those. This is the
   move that changes what the layout *should* be, which is why it is first: everything you build on
   fixture data is laid out for the wrong content. *(−1.4, and it drags COPY down with it)*
2. **Delete every fabricated claim.** Every invented percentage, every uptime figure, every logo of
   a company that is not a customer, every "50M+". If you cannot source it, it does not go on the
   page. Replace the stat strip with something true and smaller, or with nothing. *(releases Clamp B)*
3. **Strip the scaffold and author one state.** `grep -c ':focus-visible'` — if it is 0, add the
   focus ring and never remove an outline without replacing it. Delete `--sidebar-*` and
   `--chart-*` if the page has neither. Add the empty state for the main list. *(−0.9 and −0.8)*

Those three take 8.1 to roughly **3.4**. Nothing on the surface has changed yet.

**5–7 — competent, someone else's product.**

1. **Re-derive density from your task**, not from the template's. A template ships one density; your
   users have one. Row height comes from usage frequency — see `craft/density-and-hierarchy.md`.
   TailAdmin's 40px rows are right for a glance dashboard and wrong for an operations console.
2. **Break the uniform section rhythm.** Nine sections at `128px/128px` means nobody asked which
   section deserves air. Give the hero and the last section more; give dense sections less.
3. **Find your one signature decision** and make it in the domain, not in the styling. GOV.UK's
   is a 2px hard button shadow. Linear's is a 0.5px inset top-light on surfaces. Mercury's is
   tabular figures with full-weight cents. One is enough; two is a theme; three is a costume.

**3–4 — good but conventional. Usually: stop.**

You are at the score where further work has negative expected value. Before touching anything,
check that the remaining points are real findings and not preferences (§3). If COPY is your worst
dimension — as it is for Vercel at 6 — fix the copy and ship. Do not add a distinctive interaction
to lower a number.

**0–2 — done.** Re-score after the next content change, not the next style change.

### When one dimension carries the whole score

Before working the band, check the **shape**. Sum the user-visible dimensions (SPEC, COPY, RHY, COL,
TYPE, SURF) against the invisible ones (DEF, STATE-as-CSS, MOT). Three shapes, three prescriptions:

| Shape | Example | Do this |
|---|---|---|
| Invisible dimensions carry it | `liquid-log-glow` 4.7 — DEF 9, everything a user sees 2–4 | **Deletion only.** Strip the unconverted tokens, the `--sidebar-*`, the `--_unused_*`. Twenty minutes. Do not touch the layout. |
| SPEC and COPY carry it | v0 "Agentic" 8.5 | **Rebuild the content.** The surface is downstream of it and will have to move anyway. |
| Flat across all ten | `weight.coach` 7.5 — nothing below 4, six dimensions at 8+ | **Content first, then one pass per band.** A flat profile means no single fix moves it; work §9's order and re-score after each. |

The failure this prevents: an agent reads "4.7" and redesigns a working interface, or reads "7.5" and
spends the day on the token file because that dimension scored highest.

### The ordering rule, stated plainly

**Structure before surface. Content before structure.** An agent that scores 8, spends an hour on a
radius scale and a custom easing curve, and re-scores at 7.4 has done an hour of work for 0.7
points and has not touched the reason a human clocked it in two seconds.

---

## 10 — Output format

Emit this. Not prose.

```
VIBECODE  raw 8.1  →  clamped 8.1   (Clamp B fired: fabricated third-party metric)
1440×900 render + computed CSS.  Dimensions scored: 10/10.

DIM    S   W    evidence
SPEC   9  20    "98% faster deployment / STRIPE" ×2 in one viewport; "20 days saved on builds / NETFLIX"
COPY   8  18    h2 "Global by default." — verbatim match with v0-compute; "Everything you need. Nothing you don't."
DEF    8  13    :root = 33 props incl. --sidebar-ring, --chart-1..5; no sidebar, no chart on page
STATE 10  10    0 rules matching /:focus-visible/; 0 matching /:focus\b/; no empty/loading/error state rendered
RHY    8  10    padding 128px/128px on 8 of 9 sections; gaps 8/12/16/24/32/64/96 (default scale, untouched)
COL    6   8    neutral ramp = #fafaf9/#080503/#dad7d0 themed, but --destructive #e40014 unchanged
TYPE   7   8    30px, 48px, 60px, 160px co-occur; Instrument Sans + JetBrains Mono, weights 400/500 only
SURF   8   6    border-radius vocabulary = calc(infinity*1px) on 22 elements and nothing else
MOT    9   4    0.15s ×33, cubic-bezier(0.4,0,0.2,1) ×50, transition-property:all ×22
ORIG   4   3    no decision present that a generator would not produce

DIAGNOSIS  generated (not template, not mediocre)
NEXT       1. replace stat strip with sourced numbers or delete it
           2. real content in the feature grid — product nouns, not "Enterprise Security"
           3. focus ring + empty state; delete --sidebar-*/--chart-*
PROJECTED  3.4
```

If you scored from a screenshot alone, write `Dimensions scored: 7/10` and list DEF, STATE and MOT
as `n/a — CSS not inspected`. Do not guess them, and do not average around them.

---

## 11 — Anti-gaming clauses

The instrument is being run by the thing it grades. These are the loopholes to close.

1. **You cannot lower a score by adding.** Every fix in §9 that is worth more than 0.4 points is a
   *replacement* or a *deletion*. If your remediation plan is mostly additive — an animation, a
   texture, a custom cursor, a bespoke scrollbar — you are decorating, and the score should not move.
2. **Novelty is capped at 0.18 points** (ORIG, weight 3, range 0–6). There is no strategy in which
   inventing an unusual pattern is the efficient move.
3. **Restraint has no penalty.** Search §6 for a deduction that fires on absence of decoration.
   There is none. GOV.UK proves the ceiling case: maximal restraint, minimum score.
4. **Scoring from a screenshot caps at 7 dimensions.** An agent that "scores" DEF, STATE and MOT
   without reading the CSS is inventing evidence, which is the thing the rubric penalises hardest.
5. **A deduction with no pasteable observable is worth zero points.** Rewrite it as an observable or
   drop it.
6. **The same interface scores differently as a specimen and as a product.** The variable is whether
   the content is a claim. Do not use "it's a demo" to escape Clamp B — the label must be visible on
   the screen.
7. **Do not score your own work in the same pass that you defend it.** The score and the
   justification are different jobs. Score first, from the render, before re-reading your code.
8. **Never score the toolchain.** "Built with v0/Lovable/Bolt/Claude" is not evidence and does not
   appear in any dimension. The set contains a Lovable page at 2.8 and a hand-tuned paid template at
   6.1. Provenance predicts nothing; observables predict everything. The inverse is equally banned —
   you may not lower your own score because you know how carefully you worked.
9. **A check that fails on a known-good interface is retired, not weakened.** Four are retired in
   this file (⚠). If you invent a new check, run it against GOV.UK, Linear, Basecamp, Mercury,
   Stripe and Resend first. If it fires on any of them, it is not a check. This is the discipline
   that keeps the instrument from drifting into a list of things a model finds distasteful.
10. **Report the shape with the score.** A bare number invites the wrong fix (§9). Always emit the
    per-dimension line, so the reader can see whether they are looking at a cleanup or a rebuild.

---

## 12 — Card

```
FAST (60s)                                    WEIGHTS
1 logo-swappable?            +3                SPEC 20  COPY 18  DEF 13  STATE 10
2 no unfakeable detail?      +3                RHY  10  COL   8  TYPE  8  SURF   6
3 nobody here wrote that?    +2                MOT   4  ORIG   3 (0-6 only)
4 0 focus-visible / 1 state? +1
5 fixture string present?    +1                CLAMP A  SPEC≤2 & COPY≤2 → max 3
                                               CLAMP B  fixture string OR unsourced
TARGET ≤2       SHIP GATE ≤3                            third-party metric → min 6

CHEAPEST DECISIVE CHECKS
  grep -c ':focus-visible'                     0 on a page with buttons → STATE 10
                                               (nonzero proves NOTHING — see 6.4)
  resolve --primary/--success/--warning/--error  each == a stock ramp 500 → DEF ≥8
  grep -c -- '--_unused_'                      >0 → Lovable, tokens renamed not deleted
  --destructive == stock (any notation)        nobody themed the error colour
  --sidebar-* or --chart-* with neither on page → DEF ≥8
  count :root props BY SHAPE, not by count     22 hues × 11 steps = palette dumped
  % of text leaves with text-align:center      >40% → RHY ≥8   (designed: 5-9%)
  tally transition-duration + timing-function  one of each → MOT ≥8
  tally border-radius values                   one value, and it's a pill → SURF ≥8
  tally section padding-top/bottom             one value across all sections → RHY ≥8
  count Title Case h1/h2/h3                    ≥3 → COPY finding (designed set: 0)
  count curly ’ vs straight '                  many curly, ~0 straight → CLEARS copy
  distinct colors among h1 text nodes          ≥2 → ask which words, then judge
  visible watermark                            'Edit with Lovable' / 'MADE IN BOLT.NEW'

DO NOT SPEND DEDUCTIONS ON   purple gradients · shadow-md · reading measure ·
  unspaced em dashes (Stripe: 11) · straight quotes alone (Resend: 19) ·
  token COUNT (weight.coach 304 = Tailwind's palette; Vercel 374 = authored) ·
  a single 'Acme' inside a code sample or an email preview

ORDER OF WORK   content → evidence → states → rhythm → surface → motion
```

---

**Related:** [`remedies.md`](remedies.md) for the before/after code ·
[`../craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md) for the density targets
referenced in §9 · [`../craft/interaction-and-states.md`](../craft/interaction-and-states.md) for
the states §6.4 asks for · [`../system/8-gates.md`](../system/8-gates.md) for the craft failures §3
routes away from this instrument.

> **Two files this corpus links to do not exist yet:** `vibecode-taxonomy.md` (referenced from
> `anti-patterns/README.md` and `remedies.md`) and `visual-critique-method.md` (referenced from
> `anti-patterns/README.md`, `remedies.md` and `system/7-critique.md`). Until they are written, §3
> and §6 of this file carry the taxonomy, and "render it and look at it" is the whole method. Do not
> follow those links expecting content.
