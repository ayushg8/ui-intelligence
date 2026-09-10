# The vibecode risk rubric

**A 0–10 instrument for "how obviously did a machine make this."** Run it against a screenshot and
the page's computed CSS. Target **≤2**. Ship gate is **≤3**.

**Evaluated:** 2026-09-09, 2026-09-10 and an adversarial re-run on 2026-09-10 · Every number and
quoted string below was read out of a live interface with Playwright (computed styles, `:root`
custom properties, raw stylesheet text captured off the network) or off a 1440×900 render at 2×.
The calibration set is **28** real interfaces, listed with their scores in §8, covering three
generators — **v0, Lovable and Bolt**, which have **different fingerprints** (§6.3). Nothing here is
recalled.

**Before you probe anything, confirm you are looking at the human render.** Two of the ten
interfaces added in the 2026-09-10 adversarial pass served the headless browser something other
than the page: `ramp.com` returned a plain-text "Ramp — Machine Version" document (1 text leaf, 1
font size, 0 rules of any kind — it would score 0 on every dimension by accident), and
`launched.lovable.dev` returned a Cloudflare "Performing security verification" interstitial.
Sanity gate before scoring: **element count > 200, more than three distinct font sizes, and the
product's own h1 present.** If it fails, you are scoring a bot page, not an interface. This is now a
routine hazard, not an edge case.

**Nine things in this file are corrections to advice that sounds right and measures wrong.** Each
is marked ⚠, and each was falsified by a specific interface in the calibration set. The last four
came out of the 2026-09 adversarial pass recorded at the end of this file:

| Retired check | Falsified by |
|---|---|
| High `:root` token count means an authored system (§6.3) | Bolt `weight.coach`: **304** properties, 292 of them Tailwind's stock palette |
| Missing focus rings prove generation (§6.4, §2) | Lovable output ships **9–15** `:focus-visible` rules nobody designed |
| Unspaced em dashes are an AI tell (§6.2) | **Stripe: 11.** Linear, Mercury and GOV.UK: 0 |
| Straight apostrophes are an AI tell (§6.2) | **Resend: 19 straight, 0 curly** — and it scores 2.6 |
| A verbatim `Acme` floors the score (§7) | Resend renders `Weekly Acme Newsletter` in its own hero |
| Content being *invented* is itself a SPEC deduction (§6.1) | Four builds with entirely fictional companies score SPEC **0–1**; their numbers reconcile |
| A closed list of shadcn fixture strings floors a fixture page (§7) | Bootstrap's dashboard example ships `Header` ×4 and `random data placeholder text` and matched **none** of the list |
| Counting `:focus-visible` **rules** measures state design (§6.4) | Halden ships **3** rules and rings **53 of 53** interactive elements; Folio ships **1** and rings **32 of 32** |
| Title Case headings ≥3 is a finding (§6.2) | **Raycast: 3** (`AI Chat`, `Quick AI`, `AI Extensions`); Halden: **6**, all of them people's names |

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
| 4 | **States & depth** | **10** | The cure for "looks like a mockup." Generated pages have one state per element. All four v0 pages and Bolt's `weight.coach` ring **zero** interactive elements; GOV.UK `/browse/benefits` rings **56 of 56**. Held at 10 rather than raised, because ⚠ the check is one-directional: component-library output ships focus states nobody designed (Lovable measures 9–15 rules), so healthy coverage proves nothing. Score coverage, never rule count — §6.4. |
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

**Novelty is not a defence — and it is not a charge either.** The v0 pages in §8 are visually *more*
adventurous than Linear's — chromatic-aberration text, iridescent 3D renders, a glassmorphic floating
nav — and they score 8. Ambition applied to nothing is still nothing. Tested from the other side on
2026-09-10 with **Lusion** (`lusion.co`, Awwwards SOTD studio: WebGL hero, custom cursor,
scroll-driven everything). It scores **4.0**, and every point is an observable, not a reaction to its
strangeness: `0` `:focus-visible` against **4** `outline:none` (STATE 9 — removal without
replacement); a headline reading `Bold Ideas, / Brought to Life` over "digital experiences that feel
visually striking and technically seamless" (COPY 7 — construction-set plus weightless); no client,
project or number on the first screen (SPEC 3). Its genuinely authored dimensions score like the good
set: RHY **2** (9.2% centered, gaps 8.75/14.4/15.84/28.8/168/216px), DEF **2** (31 product tokens, no
framework contract), MOT **2** (durations 0.2/0.3/0.4/0.5/0.6s, four curves, properties named), ORIG
**1** — WebGL is this studio's domain, so it is credited, not deducted. **The quiet correct
interfaces beat it and are meant to:** Stripe sign-in 1.6, Halcyon 1.0, GOV.UK 0.2. An unusual
interface is not punished here; an empty one is.

⚠ **A scroll-jacked or WebGL page cannot be scored off one 1440×900 frame.** Lusion's first viewport
contains a wordmark and a render and no other text at all. Capture with `--scroll 3` and score the
sampled frames, or say which dimensions you could not reach.

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

Use this on every UI change. It is cheap enough that there is no excuse for skipping it, and
nothing in the calibration set scores low here and high on the full path — it does not clear a
generated page. It errs the other way, and **Q0 below is the fix for the worst of that error.**

| # | Question | Fail if | Points |
|---|---|---|---|
| **1** | **Could this screenshot belong to any other product in this category with only the logo swapped?** | Yes | +3 |
| **2** | **Is there a number, name, ID, unit or label on screen that only this product could produce?** | No | +3 |
| **3** | **Pick the longest sentence. Would a person who works here have written it?** | No | +2 |
| **4** | Tab once into the page — does anything show a focus ring? And does any element show a second state (hover/selected/loading/empty/**disabled**/error)? | Neither | +1 |
| **5** | Two or more filler strings in product chrome — the shadcn seed cluster as **exact** strings (`Acme Inc.`, `Lorem ipsum`, `$1,250.00`, `1,234`, `45,678`, `+12.5%`, `Total Revenue`, `Trending up this month`, `John Doe`, `Product Name`, `Your Company`), **or** any string whose job is to say *text goes here* (`Section title`, `Company name`, a column header reading `Header`, cells drawn from `random / data / placeholder / text / irrelevant / illustrative`), **or** a generator watermark (`Edit with Lovable`, `MADE IN BOLT.NEW`, `Built with v0`)? | Yes | +1 |

**Q0, the surface-class gate — ask it before Q1.** *Is this a surface where generic content is the
correct content?* Auth, settings, consent and cookie screens, 404s, permission dialogs, payment
forms, empty states. On those, **Q1 and Q2 do not apply**: score Q3–Q5 only, out of 4, and multiply
by 2.5. Skipping this gate is the fast path's worst failure and it is measured below.

Sum = fast score, 0–10. Measured against the §8 set, fast score first, full score second:

```
GOV.UK 0/0.2   GOV.UK Self-Assessment 0/0.2   Halcyon 0/1.0   Halden 0/1.2   Folio 0/1.2
Deadlines 0/1.2   Linear 0/1.4   Basecamp 0/1.4   Mercury 0/1.6   Stripe sign-in 6→0*/1.6
Stripe API ref 0/1.7   Raycast 0/2.4   Resend 0/2.6   Lovable-dir 0/2.8   Vercel 2/3.5
blueprintbuddy 1/3.9   Lusion 8/4.0   ticket-queue v1 6/4.4   liquid-log-glow 6/4.7
Bootstrap dashboard 8/4.9   shadcn dash-01 9/5.3   Cruip 9/6.1   TailAdmin 8/6.3
weight.coach 7/7.5   Compute 9/8.2   Optimus 10/8.1   Agentic 10/8.5

* 6 without the Q0 gate, 0 with it.
```

(v0 "UXBooster" is omitted from this line only: it was scored on the full path in the 2026-09-09 run
and never run through the fast path, and inventing its fast score would defeat the point of the line.)

**It is accurate at both ends and runs 2–3 points hot on templates.** That is by design: the
fast path cannot tell "generated" from "somebody else's finished product", because from the outside
they look the same and both need the same first fix. Use it as the trigger for the full path, not
as the score. Anything ≥4 on the fast path gets the full path.

**⚠ It runs 4.4 points hot on a generic-by-necessity surface, and that is not by design.** Measured
2026-09-10 on the **Stripe sign-in page** (`dashboard.stripe.com/login`), which is one of the better
executed screens in software: five font sizes total (14/16/22/13/12), `sohne-var`, **0.0%** of text
leaves centered, 16 `:focus-visible` rules, and the real auth surface on screen — `Passkey`, `SSO`,
`Or sign in with Google`, `Remember me on this device`, `New to Stripe? Create account`. It scores
**1.6** on the full path and **6 on the fast path**: Q1 fires (+3) because a sign-in card *should*
be swappable with any other sign-in card, and Q2 fires (+3) because there is nothing on a login
screen that only Stripe could produce, and there should not be. Both questions are asking a
question the surface is not allowed to answer.

That is what Q0 is for. With the gate applied, Stripe sign-in scores Q3–Q5 = 0, fast = **0**, and
the two paths agree. **Run Q0 on every auth, settings, consent, 404, permission and payment
screen**, or the instrument will send an agent to decorate the one screen in the product where
decoration is most expensive.

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
| **2** | Real content, real object model, real workflow language — **and the company may be fictional.** Linear's nav includes `Now`, an item no template ships. Mercury's product menu: `Treasury by Mercury Advisory`, `Venture Debt`, `Earn up to 3.89% yield`. The Halden build invents its company and still lands here: `HAL-441 Lumen Tutors want monthly invoicing instead of per-session charges`, `Chargeback evidence upload times out over 5 MB`, `Decide whether the legacy /v1/charges shim survives the Bexley cutover`, `Free since 09:40. Next in their queue is HAL-424.` |
| **5** | Domain-shaped content that **does not correspond to the product it is on**, or that falls apart the moment you read it twice. Cruip's "Simple": the hero mockup is a terminal running `npm login --registry=https://npm.pkg.github.com --scope=@phanatic` on a page selling a *website builder*. Decorative content, borrowed from a neighbouring domain. |
| **8** | Numbers presented as evidence that were generated. v0 Optimus: `98% faster deployment / STRIPE`, `300% throughput increase / LINEAR`, `20 days saved on builds / NETFLIX`. v0 Agentic: `50M+ TASKS · 99.9% UPTIME · 180+ COUNTRIES`. v0 Compute: `3500+ autonomous agents active · 99.7% distributed uptime · <50ms execution latency`, logo wall `Meridian Labs / Flux Systems / Beacon AI / Prism Analytics`. |
| **10** | Fixture data verbatim: `Acme Inc.`, `Total Revenue $1,250.00`, `New Customers 1,234`, `Active Accounts 45,678`, `Growth Rate 4.5%` with `+12.5%` on two tiles. TailAdmin's variant: `$20K ↓`, `$20K ↑`, `$20K ↑` — three different metrics, one number. |

**⚠ Invented is not the deduction — incoherent is.** The earlier version of this anchor read
"plausible domain-shaped content that is nonetheless invented and unverifiable," and that sentence
is wrong. Almost every artifact an agent builds is for a company that does not exist yet; if
inventing the company floors SPEC at 5, then SPEC — the heaviest dimension in the instrument —
becomes unscorable for the majority of real work, and the ladder in §9 sends every demo to rewrite
content that was already right. The four builds in `examples/evaluation-builds/` falsify it
directly: every company in them is fictional and all four score **SPEC 0–1**.

**The check that replaces "is it real": does the fiction reconcile?** Invented content that a person
built holds together under arithmetic. Invented content that a model emitted does not, because it
was generated field by field. This is mechanical, pasteable, and it is the single best SPEC check in
the instrument:

| Interface | Reconciliation test | Result |
|---|---|---|
| Halcyon renewal console | sum the ARR column, compare to the header total | **74 rows, 74 money cells, Σ = `$10,810,248`** against a header reading `74 of 412 accounts · $10.81M of $54.28M ARR`, and a footer `74 accounts · $10,810,248` |
| Halcyon risk panel | sum the seven "what is driving it" weights against the score | `+9 +10 +9 +15 +8 +9 +3` = **63**, and the panel reads `63 High … of 100` |
| Halden task queue | sum the per-person counts against the header | `4+4+2+12+2+3` = 27 people-owned `+ 4` unassigned = **31**, header reads `31 open`; the client column sums to 31 independently |
| TailAdmin | read three metric tiles in one row | `$20K ↓`, `$20K ↑`, `$20K ↑` — three different metrics, one number |
| Bootstrap dashboard example | read the row ids | `1,001 · 1,002 · 1,003 · 1,003 · 1,004` — a duplicated primary key in six visible rows |

**This check must be allowed to return n/a.** GOV.UK's Self Assessment page has nothing to
reconcile — no table, no total, no derived figure — and that is not a finding. Score it only where
the screen shows a total, a count, a percentage of a whole, or a decomposition. Where it applies it
is close to conclusive; where it does not, say `n/a` and move on.

**How to score it fast:** cover the logo and the illustration. Read what is left. If you cannot
name the product's category from the remaining text, this dimension is ≥7. Then reconcile one
number on the screen against the numbers it is made of.

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
| TailAdmin | **5 / 9** — `Monthly Sales`, `Monthly Target`, `Customers Demographic`, `Recent Orders` |
| ⚠ Raycast | **3 / 14** — `AI Chat`, `Quick AI`, `AI Extensions` |
| ⚠ Halden (`examples/evaluation-builds/task-manager`) | **6 / 11** — `Priya Raghunathan`, `Marguerite Delacroix-Bell`, `Sam Ng`, `Jonas Weber`, `Dede Ayeni`, `Ilya Petrov` |

Six designed interfaces produced **zero** between them. Note the miss: Lovable writes sentence case,
so this check catches Bolt and v0 and not Lovable. No single copy check covers all three generators
— that is why COPY is scored on the whole body of text, not on a grep.

⚠ **The "not proper nouns" clause is the whole check, and the naive version fires on good
interfaces.** Halden's six matches are the names of the six people whose work the page lists;
Raycast's three are the names of three shipped features. Both are designed. Two repairs, and the
check needs both:

1. **Paste every match before you count it.** §4 already requires this. A list of six human names
   is self-evidently not a finding; a list reading `Instant Deployment · Real-time Collaboration ·
   Enterprise Security` is. The pasting *is* the proper-noun filter — there is no regex for it, and
   an agent that reports the count without the strings has invented evidence.
2. **The threshold is ≥3 Title Case headings that are common-noun phrases**, i.e. after names of
   people, companies, products and shipped features are struck out. Raycast sits at exactly 3 before
   the strike-out and 0 after. TailAdmin sits at 5 before and 4 after (`Customers Demographic` is
   also ungrammatical, which is its own finding).

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

**⚠ Score coverage, not rule count. The rule count is a screening proxy and it is not
reproducible.** Measured 2026-09-10: Halden ships **3** `:focus-visible` rules and rings **53 of 53**
interactive elements; Folio ships **1** and rings **32 of 32**; Lovable output ships 9–15 and none of
them was designed. Rule counts reward a verbose component library and punish one correct universal
rule — `:focus-visible{outline:2px solid var(--accent);outline-offset:2px}` is a complete keyboard
system in one line. Worse, the counts do not survive a change of counting method: on `demo.tailadmin.com`
the same page in the same minute gave `:focus-visible` = **0** through `document.styleSheets`→`cssRules`
and **3** through raw stylesheet text off the network (`:focus` 0 vs 66, `outline:none` 0 vs 5,
`:root` props 0 vs 173). A DOM-computed tally on the same page reproduced its published value
exactly (`gap: 12px` on **125** elements, §6.5). **So: computed-style tallies are quotable and
CSS-rule counts are not.**

Measure coverage instead — one snippet, no ambiguity:

```js
// the exact script the numbers in this section were measured with
const sel = 'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"]),[role=button],[role=tab],[role=checkbox]';
const els = [...document.querySelectorAll(sel)].filter(e => e.getClientRects().length);
let ringed = 0; const bare = [];
for (const e of els) {
  const c = getComputedStyle(e);
  const before = [c.outline, c.outlineWidth, c.boxShadow, c.backgroundColor, c.borderColor].join('|');
  e.focus({ preventScroll: true });
  const a = getComputedStyle(e);
  const after = [a.outline, a.outlineWidth, a.boxShadow, a.backgroundColor, a.borderColor].join('|');
  if (after !== before && a.outlineStyle !== 'none' && parseFloat(a.outlineWidth) > 0) ringed++;
  else bare.push(e.tagName + ' ' + (e.textContent || '').trim().slice(0, 24));
  e.blur();
}
console.log(ringed + '/' + els.length, bare);
```

| Score | Anchor |
|---|---|
| **0** | States are a system. GOV.UK `/browse/benefits`: **56 of 56** interactive elements ringed, a named focus token, and a focus style that inverts text and background rather than adding a ring. |
| **1–3** | Full or near-full coverage however few rules it took, every `outline:none` paired with a replacement, and at least one second state rendered in the default view. Halden **53/53** from 3 rules with a state switcher covering populated / empty-first-run / empty-filtered / loading / error. Folio **32/32** from 1 rule. Vercel: **22** `:focus-visible` against **23** `outline:none` — a one-for-one trade, which is what "we removed the default and replaced it" looks like in a tally. |
| **5** | Coverage is fine and nothing else is. TailAdmin rings **42 of 44** (the two misses are both bare `<input>`), and the page shows exactly one populated happy path — no empty, no loading, no error, nothing disabled. Keyboard access alone is not a state system. |
| **6–8** | Partial coverage: some controls ringed, others stripped. The observable is the `bare` array from the snippet above being non-empty on elements a user must reach — a submit button, a table row, a filter chip. **No interface in the calibration set lands here**, which is itself informative: focus is nearly always all-or-nothing, because it is inherited from one decision. If you land here, name the controls. |
| **9–10** | Zero coverage. All four v0 apps and Cruip's "Simple" measure `0` rules matching `:focus-visible` and `0` matching `:focus`, and ring nothing. Lusion, an Awwwards-winning WebGL studio site, rings **0 of 38** — `0` `:focus-visible` against **4** `outline:none`, removal without replacement. Nothing on the page has a keyboard state, an empty state, an error state or a loading state. |

⚠ **Zero coverage is strong evidence of generation; full coverage is no evidence of design.** The
zero case catches pages a model wrote from scratch — v0 marketing pages, `weight.coach` (0
`:focus-visible`, 1 bare `:focus` in 48KB of CSS), Cruip, Lusion. It **misses everything built on a
component library**, because the library authored the focus states and they ship whether or not
anyone thought about them.

When coverage is healthy, stop measuring and go look instead. Does any list show what it looks like with
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
| **5** | One duration and one curve, properties named. Bootstrap's dashboard example: every transition `0.15s`, every easing `ease-in-out`, but the property lists are written out (`color, background-color, border-color` ×14, `…, box-shadow` ×4) and nothing is `all`. Nothing was decided; nothing was left lying around either. |
| **7** | Several durations, one curve, `all`. TailAdmin: `0.25s×22 · 0.15s×9 · 0.3s×2 · 0.1s×2`, easing `ease×31`, and `transition-property: all` on **31** elements — the duration varies because different components shipped with different defaults, not because anyone chose. |
| **8–10** | One duration, one curve, `all` — **all three, and the third is load-bearing.** v0 Optimus: `0.15s×33`, `cubic-bezier(0.4, 0, 0.2, 1)` on **every** transitioning element, `transition-property: all` on 22. shadcn.com/blocks: 113 transitions, all `0.15s`, all `cubic-bezier(0.4,0,0.2,1)`, 54 of them `all`. That curve is Tailwind's `ease-in-out` default. |

⚠ **Two of the three clauses convict nobody on their own.** Raycast ships `transition-property: all`
on **131** elements and is not generated. The Halcyon console runs exactly one duration (`0.12s`) and
exactly one curve (`ease-out`) across all 39 of its transitions, and that is the right answer for a
console where every transition is a row highlight — its properties are named (`background`,
`background, border-color`, `color`) and **zero** are `all`. A single duration is a decision when the
page has one class of motion; it is a default when the page has several. Ask what the page is
transitioning before you deduct.

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
| **3** | Everything is conventional and everything is correct. **The observable:** name this artifact's archetype, open its reference product in [`../references/`](../references/), and list three decisions where the two differ. If you cannot find three, you are at 3 or above. |
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
   **1b. Or two or more strings whose job is to say *text goes here*, in the same places.** The list
   above is the shadcn seed file, and a closed list of one framework's fixtures is a check that
   misses every other framework. Bootstrap's own dashboard example — competent, conventional,
   correct, and the reference implementation most templates start from — ships four column headers
   reading `Header`, a section head reading `Section title`, a brand reading `Company name`, and
   table cells drawn from `random · data · placeholder · text · irrelevant · illustrative · layout ·
   dashboard`, with the row id `1,003` appearing twice in six visible rows. Not one string on the
   §7 list appears on it, and the floor did not fire. It should have. Pasteable test: **a cell,
   header or tile whose text names its own role rather than its value.**
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

28 interfaces, screenshotted at 1440×900 and probed for computed styles on 2026-09-09 (rows without
a mark), 2026-09-10 (the four **★** rows, which cover Lovable and Bolt) and the 2026-09-10
adversarial re-run (the ten **▲** rows, which cover the corpus's own builds and the two failure
modes §3 exists to prevent). Dimension codes in weight order: SPEC 20 · COPY 18 · DEF 13 · STATE 10 ·
RHY 10 · COL 8 · TYPE 8 · SURF 6 · MOT 4 · ORIG 3.

| Interface | Score | SPEC | COPY | DEF | STATE | RHY | COL | TYPE | SURF | MOT | ORIG |
|---|---|---|---|---|---|---|---|---|---|---|---|
| GOV.UK `/browse/benefits` | **0.2** | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 1 |
| ▲ GOV.UK `/log-in-file-self-assessment-tax-return` | **0.2** | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 1 |
| ▲ Halcyon renewal console (`evaluation-builds/churn-dashboard`) | **1.0** | 0 | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 3 | 2 |
| ▲ Halden task queue (`evaluation-builds/task-manager`) | **1.2** | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 1 | 1 | 2 |
| ▲ Folio API landing (`evaluation-builds/api-landing`) | **1.2** | 1 | 1 | 1 | 2 | 1 | 2 | 1 | 1 | 1 | 1 |
| ▲ Deadlines (`evaluation-builds/college-deadlines`) | **1.2** | 1 | 0 | 1 | 1 | 2 | 2 | 2 | 2 | 1 | 2 |
| Linear `linear.app` | **1.4** | 0 | 2 | 2 | 2 | 1 | 2 | 1 | 2 | 1 | 2 |
| Basecamp `basecamp.com` | **1.4** | 1 | 0 | 1 | 3 | 2 | 2 | 2 | 2 | 3 | 0 |
| Mercury `mercury.com` | **1.6** | 0 | 2 | 2 | 3 | 2 | 2 | 1 | 2 | 2 | 2 |
| ▲ Stripe sign-in `dashboard.stripe.com/login` | **1.6** | 3 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 2 | 3 |
| Stripe API reference | **1.7** | 0 | 1 | 2 | 2 | 2 | 2 | 4 | 3 | 3 | 3 |
| ▲ Raycast `raycast.com` | **2.4** | 1 | 5 | 2 | 3 | 1 | 3 | 2 | 2 | 3 | 1 |
| Resend `resend.com` | **2.6** | 2 | 4 | 2 | 2 | 3 | 3 | 1 | 3 | 3 | 2 |
| ★ Lovable partner directory | **2.8** | 2 | 3 | 3 | 2 | 4 | 2 | 3 | 3 | 4 | 3 |
| Vercel `vercel.com` | **3.5** | 2 | 6 | 1 | 3 | 4 | 4 | 3 | 5 | 4 | 4 |
| ★ Lovable `blueprintbuddy-b2c` | **3.9** | 3 | 5 | 4 | 3 | 5 | 3 | 4 | 4 | 5 | 4 |
| ▲ Lusion `lusion.co` | **4.0** | 3 | 7 | 2 | 9 | 2 | 3 | 3 | 3 | 2 | 1 |
| ▲ ticket-queue `v1.html` | **4.4** | 3 | 5 | 1 | 9 | 3 | 6 | 5 | 5 | 6 | 4 |
| ★ Lovable `liquid-log-glow` | **4.7** | 2 | 6 | 9 | 3 | 3 | 5 | 6 | 4 | 5 | 4 |
| ▲ Bootstrap 5.3 dashboard example | **4.9** | 9 | 8 | 2 | 3 | 3 | 3 | 2 | 2 | 3 | 4 |
| shadcn `dashboard-01` preview | **5.3** | 5 | 7 | 4 | 5 | 5 | 6 | 4 | 4 | 9 | 5 |
| Cruip "Simple" | **6.1** | 7 | 7 | 4 | 9 | 5 | 5 | 6 | 4 | 7 | 5 |
| TailAdmin demo | **6.3** | 8 | 8 | 5 | 5 | 5 | 6 | 5 | 5 | 6 | 5 |
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

**▲ The four `examples/evaluation-builds/` — 1.0 to 1.2, and this is the instrument grading its own
students.** They were built by agents following this corpus and self-reported 1/10; scored blind
here they land 1.0, 1.2, 1.2, 1.2, so the self-report holds. What makes them worth a row is that
**every company in them is fictional** — Halcyon, Halden, Folio, and a student's college list — and
they still score at the top of the set. The evidence is coherence under load, not verifiability:
Halcyon's 74 rows sum to the `$10,810,248` its header claims, its seven risk signals sum to the 63
the panel shows, Halden's per-person counts sum to the `31 open` in its subtitle, Folio's h1 is a
falsifiable statement about the API (`Every field we return points at the pixels it came from`)
rather than a promise, and Deadlines opens with `Georgia Tech closes tomorrow night and one short
answer is still unwritten. Nothing else is due for another 17 days.` All four ring **100%** of their
interactive elements (53/53, 32/32, 140/140, 27/27) from 1–4 rules, and all four ship a state
switcher so empty, loading and error are inspectable rather than claimed. Their weakest real
dimensions are unremarkable: Folio STATE 2 because a marketing page has fewer states to show,
Halcyon MOT 3 for a single `0.12s ease-out`, Deadlines RHY 2 for 6.3% centering. **If your own
build cannot survive the reconciliation check in §6.1, it is not in this band, whatever its
surface looks like.**

**▲ Stripe sign-in — 1.6, and the reason §5 grew a Q0.** Five font sizes, `sohne-var`, 0.0% of text
leaves centered, 16 `:focus-visible` rules, a real auth surface (`Passkey`, `SSO`,
`Or sign in with Google`, `Remember me on this device`). SPEC is **3** and cannot be lower: there is
nothing on a sign-in screen that only Stripe could produce, and putting something there would be a
defect. This is the case that proves restraint is unpunished on the full path — 1.6 — and unhandled
on the fast path, which scored it **6** until Q0 existed. Note also that its hero art is a
full-bleed multi-hue orange-pink-purple gradient ribbon, which is the retired 2023 tell, on one of
the best-executed screens in software.

**▲ Bootstrap 5.3 dashboard example — 4.9, and the fixture floor missed it.** The reference
implementation half the world's admin templates start from: 5 font sizes, `system-ui`, 3.2%
centering, 12 `:focus-visible` rules, named transition properties. Every one of those is fine. SPEC
is **9** and COPY **8** because the page ships `Company name`, `Section title`, four column headers
reading `Header`, cells drawn from `random · data · placeholder · text · irrelevant · illustrative`,
and the row id `1,003` twice in six rows. **Clamp B did not fire**, because the §7 list is shadcn's
seed file and Bootstrap's placeholders are its own. That is what clause 1b fixes. The lesson
matches Cruip's: human authorship is not a defence, and neither is a good framework.

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
and an `npx shadcn add dashboard-01` command. **Ship that markup as your product and it is a 6.3 —
same pixels, different claim.**

**Cruip "Simple" — 6.1.** A paid, human-designed template, and it scores above shadcn's own block
preview. Why: `0` `:focus-visible` rules and `0` `:focus` rules on the whole page; a straight
apostrophe in the 64px h1 (`The website builder you're looking for`); `letter-spacing: -0.4px` on
14px buttons because `tracking-tight` sits on a wrapper; and a hero mockup showing
`npm login --registry=https://npm.pkg.github.com --scope=@phanatic` on a page selling a website
builder. Human authorship is not a defence either — the rubric detects absent decisions, whoever
failed to make them.

**TailAdmin — 6.3, the template anchor.** Internally consistent, one accent, correct hierarchy,
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
1440×900 render + computed CSS.  Dimensions scored: 10/10.  Human render confirmed (§11.11).
Q0: not a generic-by-necessity surface, so fast Q1-Q2 apply.

DIM    S   W    evidence
SPEC   9  20    "98% faster deployment / STRIPE" ×2 in one viewport; "20 days saved on builds / NETFLIX"
COPY   8  18    h2 "Global by default." — verbatim match with v0-compute; "Everything you need. Nothing you don't."
DEF    8  13    :root = 33 props incl. --sidebar-ring, --chart-1..5; no sidebar, no chart on page
STATE 10  10    focus ring on 0 of 38 interactive elements; no empty/loading/error state rendered
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
11. **Confirm you scored the human render.** Sites now serve agents a different page: `ramp.com`
    returns a plain-text "Machine Version" document to headless Chromium, `launched.lovable.dev`
    returns a Cloudflare interstitial. Both would score near 0 on every dimension, for the wrong
    reason. Gate on element count > 200, more than three distinct font sizes, and the product's own
    h1 being present, and say in the output which render you scored.

---

## 12 — Card

```
FAST (60s)   Q0: auth/settings/404/consent?    WEIGHTS
             → skip 1+2, score 3-5 of 4, ×2.5
1 logo-swappable?            +3                SPEC 20  COPY 18  DEF 13  STATE 10
2 no unfakeable detail?      +3                RHY  10  COL   8  TYPE  8  SURF   6
3 nobody here wrote that?    +2                MOT   4  ORIG   3 (0-6 only)
4 0 focus-visible / 1 state? +1
5 fixture string present?    +1                CLAMP A  SPEC≤2 & COPY≤2 → max 3
                                               CLAMP B  fixture string OR unsourced
TARGET ≤2       SHIP GATE ≤3                            third-party metric → min 6

CHEAPEST DECISIVE CHECKS
  focus() every interactive el, count rings    0/N → STATE 10 · N/N proves NOTHING (6.4)
                                               rule COUNTS are not reproducible — don't quote them
  resolve --primary/--success/--warning/--error  each == a stock ramp 500 → DEF ≥8
  grep -c -- '--_unused_'                      >0 → Lovable, tokens renamed not deleted
  --destructive == stock (any notation)        nobody themed the error colour
  --sidebar-* or --chart-* with neither on page → DEF ≥8
  count :root props BY SHAPE, not by count     22 hues × 11 steps = palette dumped
  % of text leaves with text-align:center      >40% → RHY ≥8   (designed: 5-9%)
  tally transition-duration + timing-function  one of each → MOT ≥8
  tally border-radius values                   one value, and it's a pill → SURF ≥8
  tally section padding-top/bottom             one value across all sections → RHY ≥8
  count Title Case h1/h2/h3, PASTE the list    ≥3 common-noun phrases → COPY finding
                                               (names of people/features don't count: Raycast 3)
  reconcile one total against its parts        Σ column ≠ header total → SPEC finding · n/a is OK
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

> **Both companion files now exist** and this note used to say they did not: `vibecode-taxonomy.md`
> (2,619 lines) and `visual-critique-method.md` (1,138 lines) are present in this directory as of
> 2026-09-10. Follow those links. §3 and §6 here remain the short form of the taxonomy.

---

## Adversarial pass (2026-09)

First hostile review of this file. Ten interfaces were scored blind and added to §8 — the four
builds in `examples/evaluation-builds/`, two known-excellent products not previously in the set
(Raycast, Stripe sign-in), a competent conventional template (Bootstrap 5.3's dashboard example),
an Awwwards-winning WebGL studio site (Lusion), a second GOV.UK page, and the corpus's own
`ticket-queue-critique/v1.html`. Every number below was measured with Playwright against the live
artifact on 2026-09-10 and is pasteable.

**What changed, and what falsified it**

| Change | Falsified by |
|---|---|
| §6.1's `5` anchor no longer reads "invented and unverifiable"; the deduction is non-correspondence and incoherence | All four evaluation builds invent their companies and score SPEC 0–1. The old wording floored the heaviest dimension at 5 for every artifact an agent will ever build. |
| §6.1 gained the **reconciliation check** — does the fiction survive arithmetic | Halcyon: 74 rows, Σ = `$10,810,248` against a header of `$10.81M`; seven risk signals `+9 +10 +9 +15 +8 +9 +3` = the `63` shown. Halden: `4+4+2+12+2+3 + 4` = the `31 open` in its subtitle. TailAdmin: `$20K ↓ / $20K ↑ / $20K ↑`. Bootstrap: `1,003` twice in six rows. |
| §6.4 scores **focus coverage**, not rule count | Halden rings 53/53 from **3** rules; Folio 32/32 from **1**. And the counts are not reproducible: `demo.tailadmin.com` in the same minute gave `:focus-visible` = 0 via `cssRules` and 3 via raw stylesheet text (`:focus` 0/66, `outline:none` 0/5, `:root` props 0/173). |
| §5 gained **Q0**, the surface-class gate | Stripe sign-in scores **6 on the fast path and 1.6 on the full path** — a 4.4-point error on one of the best-executed screens in software, because Q1 and Q2 ask a question a sign-in screen is not allowed to answer. |
| §7 Clamp B gained **clause 1b**, generic filler | Bootstrap's dashboard example ships `Company name`, `Section title`, `Header` ×4 and cells reading `random · data · placeholder · text`, and matched **zero** strings on the §7 list. A closed list of one framework's fixtures is not a check. |
| §6.2's Title Case check requires the matches to be **pasted** and struck for proper nouns | Raycast: **3 / 14** (`AI Chat`, `Quick AI`, `AI Extensions`). Halden: **6 / 11**, all six the names of the people whose work the page lists. Both designed; the naive threshold fires on both. |
| §6.9 gained anchors at 5 and 7; one duration alone no longer convicts | Raycast ships `transition-property: all` on **131** elements. Halcyon runs one duration (`0.12s`) and one curve (`ease-out`) across all 39 transitions with every property named and zero `all` — correct for a console with one class of motion. |
| §6.4 gained a 6–8 band, §6.10's `3` gained an observable | An unanchored band is scored 5 every time, which is the failure §1 opens by warning about. |
| Header and §11.11: **confirm you scored the human render** | `ramp.com` served headless Chromium a plain-text "Ramp — Machine Version" document (1 text leaf, 1 font size). `launched.lovable.dev` served a Cloudflare interstitial. Both score ~0 on every dimension for the wrong reason. |
| §3 records the novelty counter-test | Lusion scores **4.0** — every point an observable (0 focus coverage against 4 `outline:none`; `Bold Ideas, / Brought to Life`; no client or number on the first screen), and it loses to Stripe sign-in 1.6, Halcyon 1.0 and GOV.UK 0.2. An unusual interface is not punished; an empty one is. |
| The closing note claiming two companion files do not exist | Both exist. `vibecode-taxonomy.md` was written 2026-09-10 11:08. |

**What I could not shake**

- **The weighting.** SPEC 20 / COPY 18 / SURF 6 survived every attempt to break it. The two cases
  built to break it — a beautiful empty page (Lusion 4.0) and an ugly-by-2026-convention full one
  (Basecamp 1.4) — land where the weighting says they should, and moving SURF up would put Lusion
  above Basecamp on the strength of its radius scale.
- **Restraint is genuinely unpunished on the full path.** Two GOV.UK pages score 0.2 independently,
  and Stripe sign-in — five font sizes, no illustration, no radius above 6px — scores 1.6. There is
  still no deduction in §6 that fires on absence of decoration. The failure was in §5, not §6.
- **The four corpus builds are not gaming the instrument.** Their 1/10 self-report reproduces at
  1.0–1.2 under blind scoring, and it holds up under the checks that did *not* exist when they were
  built: 100% focus coverage on all four, reconciling arithmetic on the two with tables, 0.7–6.3%
  centering, zero fixture strings.
- **The two clamps.** Clamp A never fired incorrectly in this pass; Clamp B fired only where a claim
  was actually being made.

**What I could not verify**

- **GOV.UK `/browse/benefits` focus-rule counts drifted.** The file's `28 :focus-visible / 135
  :focus` measured **54 / 312** today by raw-stylesheet text and **0 / 0** by `cssRules`. Its
  `:root` token count reproduced exactly (24, all `--govuk-*`), as did TailAdmin's `gap: 12px` on
  125 elements. Computed-style tallies reproduce; CSS-rule counts do not. The §8 rows built on rule
  counts should be treated as observations from their date, not as constants — which is why §6.4 no
  longer scores on them.
- **`examples/ticket-queue-critique/README.md` calls `v1.html` a vibecode **3**; scored blind here
  it is **4.4**.** The gap is almost entirely STATE — 0 `:focus-visible`, 0 `:focus`, 1
  `outline:none`, nothing ringed — which the README's own delta table records but its headline
  number predates. I left that file alone rather than restate a worked example I was not reviewing;
  the two numbers are the same artifact scored before and after §6.4 existed, and this row is the
  current one.
- **No fresh wild generator output.** Both live AI-generated pages I reached were served bot pages
  instead (above), so the v0/Lovable/Bolt rows are unchanged from 2026-09-09/10 and the fingerprint
  table in §6.3 was not re-probed. It should be re-run against current v0 and Lovable output before
  the next refresh; generator fingerprints are the fastest-ageing content in this file.
